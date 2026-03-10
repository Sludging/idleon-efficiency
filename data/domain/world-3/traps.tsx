import { range } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { initItemDetailRepo } from "../data/ItemDetailRepo";
import { TypeGenEnum } from "../enum/typeGenEnum";
import { initTrapBoxRepo } from "../data/TrapBoxRepo";
import { TrapBoxTimeModel } from "../model/trapBoxTimeModel";

export enum TrapSet {
    Cardboard = 0,
    Silkskin = 1,
    Wooden = 2,
    Natural = 3,
    Steel = 4,
    Meaty = 5,
    Royal = 6,
}

const trapIdByName = Object.fromEntries(
    initItemDetailRepo()
    .filter(item => item.data.typeGen === TypeGenEnum.aTrap)
    .map(item => [item.id, item.data.ID ?? 0])
) as Record<string, number>;

const trapBoxBySetIndex = Object.fromEntries(
    initTrapBoxRepo()
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
    getRawKeys(): RawData[] {
        return [
            { key: "PldTraps_", default: [], perPlayer: true }
        ]
    }

    init(_: Item[], charCount: number) {
        // Empty init for now.
        return Array(charCount) as Trap[][];
    }

    parse(data: Map<string, any>): void {
        const traps = data.get(this.getDataKey()) as Trap[][];
        const charCount = data.get("charCount") as number;
        range(0, charCount).forEach((_, playerIndex) => {
            // If this is the first time handling this player, init.
            if (traps.length <= playerIndex) {
                traps.push([]);
            }
            const playerTraps = data.get(`PldTraps_${playerIndex}`) as any[];
            traps[playerIndex] = playerTraps.map(trapData => {
                return new Trap(playerIndex, trapData)
            });
        })
    }
}