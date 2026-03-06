import { range } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { ImageData } from "../imageData";
import { Item } from "../items";

export enum TrapSet {
    Cardboard = 0,
    Silkskin = 1,
    Wooden = 2,
    Natural = 3,
    Steel = 4,
    Meaty = 5,
    Royal = 6,
}

type TrapBoxInfo = 
    | { duration: number; qty: number; exp: number}
    | { duration: number; qty: number; shiny: number}

const trapBoxInfo: TrapBoxInfo[][] = [
    [
        {duration: 1200, qty: 1, exp: 1},
        {duration: 3600, qty: 2, exp: 2},
        {duration: 28800, qty: 10, exp: 8},
        {duration: 72e3, qty: 20, exp: 15}
    ],
    [
        {duration: 1200, qty: 1, shiny: 2},
        {duration: 3600, qty: 2, shiny: 4},
        {duration: 28800, qty: 10, shiny: 16},
        {duration: 72e3, qty: 20, shiny: 30},
        {duration: 144e3, qty: 35, shiny: 50}
    ],
    [
        {duration: 10800, qty: 5, exp: 5},
        {duration: 216e3, qty: 50, exp: 40},
        {duration: 432e3, qty: 100, exp: 80},
        {duration: 432e3, qty: 200, exp: 0},
        {duration: 432e3, qty: 0, exp: 200}
    ],
    [
        {duration: 28800, qty: 0, exp: 40},
        {duration: 72e3, qty: 0, exp: 75},
        {duration: 158e3, qty: 0, exp: 120},
        {duration: 518e3, qty: 0, exp: 350}
    ],
    [
        {duration: 10800, qty: 5, shiny: 10},
        {duration: 216e3, qty: 50, shiny: 80},
        {duration: 432e3, qty: 100, shiny: 160},
        {duration: 72e3, qty: 1, shiny: 60}
    ],
    [
        {duration: 3600, qty: 3, exp: 3},
        {duration: 36e3, qty: 15, exp: 12},
        {duration: 108e3, qty: 40, exp: 30},
        {duration: 72e4, qty: 220, exp: 200}
    ],
    [
        {duration: 1200, qty: 2, shiny: 4},
        {duration: 3600, qty: 4, shiny: 8},
        {duration: 36e3, qty: 21, shiny: 38},
        {duration: 144e3, qty: 70, shiny: 125},
        {duration: 576e3, qty: 250, shiny: 375},
        {duration: 2419e3, qty: 550, shiny: 1150}
    ],
];

export class Trap {
    playerID: number;
    critterName: string;
    timeSincePut: number;
    trapDuration: number;
    trapType: TrapSet;
    placed: boolean;

    constructor(playerID: number, trapArray: Array<any>) {
        this.playerID = playerID;
        this.placed = trapArray[0] != -1;
        this.critterName = trapArray[3];
        this.timeSincePut = trapArray[2];
        this.trapDuration = trapArray[6];
        this.trapType = trapArray[5];
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
        const baseTraps = (() => {
            if (trap == undefined) {
                return 0;
            }
            switch (trap.internalName) {
                case "TrapBoxSet1": return 1;
                case "TrapBoxSet2": return 2;
                case "TrapBoxSet3": return 3;
                case "TrapBoxSet4": return 4;
                case "TrapBoxSet5": return 5;
                case "TrapBoxSet6": return 6;
                case "TrapBoxSet7": return 7;
                case "TrapBoxSet8": return 7;
                default: return 1;
            }
        })();
        return baseTraps + (hasAlchemyExtraTrap ? 1 : 0);
    }

    getBenefits = () => {
        const boxData = trapBoxInfo[this.trapType].find(trap => trap.duration == this.trapDuration);
        if (!boxData) return [];

        const benefits = [`x${boxData.qty} Qty`]
        if ("exp" in boxData) {
            benefits.push(`x${boxData.exp} Exp`)
        }
        if ("shiny" in boxData) {
            benefits.push(`x${boxData.shiny} Shiny`)
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