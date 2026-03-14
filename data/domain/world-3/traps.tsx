import { range } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { initItemDetailRepo } from "../data/ItemDetailRepo";
import { TypeGenEnum } from "../enum/typeGenEnum";
import { initTrapBoxRepo } from "../data/TrapBoxRepo";
import { TrapBoxTimeModel } from "../model/trapBoxTimeModel";
import { initCritterRepo } from "../data/CritterRepo";
import { Storage } from "../storage";


export interface OwnedCritters {
    id: string;
    count: number;
    location: string;
}

export interface TrapRewards {
    name: string;
    count: number;
}

export enum TrapSet {
    Cardboard = 0,
    Silkskin = 1,
    Wooden = 2,
    Natural = 3,
    Steel = 4,
    Meaty = 5,
    Royal = 6,
}

const critterRepo = initCritterRepo();
const itemDetailRepo = initItemDetailRepo()
const trapBoxRepo = initTrapBoxRepo()

const trapIdByName = Object.fromEntries(
    itemDetailRepo
    .filter(item => item.data.typeGen === TypeGenEnum.aTrap)
    .map(item => [item.id, item.data.ID ?? 0])
) as Record<string, number>;

const trapBoxBySetIndex = Object.fromEntries(
    trapBoxRepo
    .map(trapBox => [trapBox.index, trapBox.data.times])
) as Record<number, TrapBoxTimeModel[]>;

export class Trap {
    playerID: number;
    critterName: string;
    timeSincePut: number;
    trapDuration: number;
    trapType: TrapSet;
    placed: boolean;
    critters: number

    constructor(playerID: number, trapArray: Array<any>) {
        this.playerID = playerID;
        this.placed = trapArray[0] != -1;
        this.critterName = trapArray[3];
        this.timeSincePut = trapArray[2];
        this.trapDuration = trapArray[6];
        this.trapType = trapArray[5];
        this.critters = trapArray[4]
    }
    
    isReady = () => {
        return this.timeSincePut >= this.trapDuration;
    }

    getCritterImageData = (): ImageData => {
        return {
            location: `${this.critterName}_x1`,
            height: 36,
            width: 36,
        }
    }

    static getMaxTraps = (trap: Item | undefined, hasAlchemyExtraTrap: boolean) => {
        const alchemyExtraTrap = hasAlchemyExtraTrap ? 1 : 0;
        if (trap == undefined) return alchemyExtraTrap;
        const baseTraps = trapIdByName[trap.internalName] ?? 1;
        return baseTraps + alchemyExtraTrap;
    }

    getBenefits = () => {
        const boxData = trapBoxBySetIndex[this.trapType]?.find(trap => trap.time == this.trapDuration);
        if (!boxData) return [];

        const benefits: string[] = [];
        if (boxData.qtyX > 0) {
            benefits.push(`x${boxData.qtyX} Qty`)
        }
        if (boxData.expX > 0) {
            benefits.push(`x${boxData.expX} Exp`)
        }
        if (boxData.shinyX > 0) {
            benefits.push(`x${boxData.shinyX} Shiny`)
        }
        return benefits;
    }
}

export class Traps extends Domain {
    playerTraps: Trap[][] = [];
    regularCritterCounts: OwnedCritters[] = [];
    shinyCritterCounts: OwnedCritters[] = [];
    trapRewards: TrapRewards[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "PldTraps_", default: [], perPlayer: true }
        ]
    }

    init(_: Item[], charCount: number) {
        this.playerTraps = [];
        this.regularCritterCounts = [];
        this.shinyCritterCounts = [];
        this.trapRewards = [];
        return this;
    }

    parse(data: Map<string, any>): void {
        const traps = data.get(this.getDataKey()) as Traps;
        const charCount = data.get("charCount") as number;

        traps.playerTraps = [];
        range(0, charCount).forEach((_, playerIndex) => {
            const playerTraps = data.get(`PldTraps_${playerIndex}`) as any[];
            traps.playerTraps.push(playerTraps.map(trapData => new Trap(playerIndex, trapData)));
        })
    }
}

export const updateTrapDisplayData = (data: Map<string, any>): Traps => {
    const traps = data.get("traps") as Traps;
    const storage = data.get("storage") as Storage;

    traps.regularCritterCounts = critterRepo.map(critter => ({
        id: critter.id,
        count: storage?.amountInStorage(critter.id) ?? 0,
        location: critter.data.location,
    }));

    traps.shinyCritterCounts = critterRepo.map(critter => ({
        id: critter.data.shiny,
        count: storage?.amountInStorage(critter.data.shiny) ?? 0,
        location: critter.data.location,
    }));

    const rewardsByCritterName = new Map<string, number>();
    traps.playerTraps
        .flat()
        .filter(trap => trap?.placed)
        .forEach(trap => {
            const current = rewardsByCritterName.get(trap.critterName) ?? 0;
            rewardsByCritterName.set(trap.critterName, current + (trap.critters ?? 0));
        });

    traps.trapRewards = Array.from(rewardsByCritterName.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));

    return traps;
};