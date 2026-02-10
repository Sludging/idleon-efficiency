import { range } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { Item, ItemStat, StoneProps } from "../items";


export const obolExtraData: number[][][] = [
    [
        [264, 134, 1, 32],
        [330, 154, 0, 0],
        [398, 134, 2, 105],
        [466, 154, 0, 40],
        [532, 134, 1, 60],
        [286, 196, 0, 25],
        [346, 212, 0, 130],
        [450, 212, 0, 152],
        [512, 196, 0, 48],
        [274, 260, 1, 190],
        [398, 260, 3, 250],
        [522, 260, 1, 140],
        [346, 308, 0, 210],
        [450, 308, 0, 170],
        [286, 324, 0, 112],
        [330, 366, 0, 98],
        [466, 366, 0, 70],
        [512, 324, 0, 80],
        [264, 386, 1, 120],
        [398, 386, 2, 180],
        [532, 386, 1, 90],
    ],
    [
        [262, 132, 0, 60],
        [332, 128, 0, 250],
        [398, 134, 1, 200],
        [464, 128, 0, 350],
        [534, 132, 0, 100],
        [260, 200, 0, 1250],
        [324, 192, 2, 400],
        [398, 204, 3, 650],
        [472, 192, 2, 900],
        [536, 200, 0, 1500],
        [284, 262, 1, 1150],
        [356, 262, 3, 1200],
        [440, 262, 3, 2500],
        [512, 262, 1, 2000],
        [260, 324, 0, 2100],
        [324, 330, 2, 3000],
        [398, 322, 3, 5000],
        [472, 330, 2, 1750],
        [536, 324, 0, 400],
        [262, 388, 0, 160],
        [332, 394, 0, 875],
        [398, 392, 1, 700],
        [464, 394, 0, 470],
        [534, 388, 0, 80],
    ]
];

export enum ObolType {
    Circle = 0,
    Square = 1,
    Hexagon = 2,
    Sparkle = 3
}

export class Obol {
    type: ObolType
    lvlReq: number
    locked: boolean
    constructor(public item: Item, public position: number, isPlayer: boolean, type?: ObolType) {
        // If we don't already know the type in advance, figure it out from game data.
        if (type == undefined) {
            if (isPlayer) {
                this.type = obolExtraData[0][position][2]
                this.lvlReq = obolExtraData[0][position][3]
            }
            else {
                this.type = obolExtraData[1][position][2]
                this.lvlReq = obolExtraData[1][position][3]
            }
        }
        else {
            this.lvlReq = -1;
            this.type = type;
        }
        this.locked = item.internalName.includes("Locked")
    }

    getRarity = () => {
        switch (true) {
            case this.item.internalName.includes("Bronze"): return 0;
            case this.item.internalName.includes("Silver"): return 1;
            case this.item.internalName.includes("Gold"): return 2;
            case this.item.internalName.includes("Platinum"): return 3;
            case this.item.internalName.includes("Pink"): return 4;
            case this.item.internalName.includes("Void"): return 5;
            case this.item.internalName.includes("Granite"): return 6;
            case this.item.internalName.includes("Skeletal"): return 7;
            case this.item.internalName.includes("Frozen"): return 8;
            case this.item.internalName.includes("Slushy"): return 9;
            default: return -1;
        }
    }
}

export class ObolStats {
    stats: ItemStat[] = [];

    addStat = (newStat: ItemStat) => {
        // ignore negative values.
        if (newStat.getValue() < 0) {
            return;
        }
        const existing = this.stats.find(stat => newStat.extra == '' ? newStat.displayName == stat.displayName : newStat.extra.toLowerCase() == stat.extra.toLowerCase());
        if (existing) {
            existing.value += newStat.getValue();
        }
        else {
            this.stats.push(newStat.duplicate());
        }
    }
}

export class ObolsData extends Domain {
    playerObols: Obol[][] = [];
    playerStats: ObolStats[] = [];
    familyObols: Obol[] = [];
    familyStats: ObolStats = new ObolStats();
    upgradeTab: Obol[] = [];
    inventory: Map<ObolType, Obol[]> = new Map();

    getRawKeys(): RawData[] {
        return [
            {key: "ObolEqO0_", perPlayer: true, default: []},
            {key: "ObolEqMAP_", perPlayer: true, default: []},
            {key: "ObolEqO1", perPlayer: false, default: []},
            {key: "ObolEqMAPz1", perPlayer: false, default: {}},
            {key: "ObolInvOr", perPlayer: false, default: {}},
            {key: "ObolInvMAP_", perPlayer: true, default: {}},
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const obols = data.get(this.getDataKey()) as ObolsData;
        const charCount = data.get("charCount") as number;
        const allItems = data.get("itemsData") as Item[];

        // Some obol data has no "persistence", so we reset the previous data.
        obols.playerObols = [];
        obols.playerStats = [];
        obols.familyObols = [];
        obols.familyStats = new ObolStats();

        range(0, charCount).forEach((_, playerIndex) => {
            const playerObols = data.get(`ObolEqO0_${playerIndex}`) as string[];
            const playerObolsMods = data.get(`ObolEqMAP_${playerIndex}`) as Record<number, StoneProps>;
            const playerObolArray: Obol[] = [];
            const playerStats = new ObolStats();
            playerObols.forEach((obol, obolIndex) => {
                const itemInfo = allItems.find(item => item.internalName == obol)?.duplicate() ?? Item.emptyItem(obol);
                if (!obol.includes("Locked") && obol != "Blank" && Object.keys(playerObolsMods).includes(obolIndex.toString())) {
                    itemInfo.addStone(playerObolsMods[obolIndex]);
                }
                playerObolArray.push(new Obol(itemInfo, obolIndex, true));
                itemInfo.itemStats.forEach(stat => {
                    playerStats.addStat(stat);
                })

            });
            obols.playerObols.push(playerObolArray);
            obols.playerStats.push(playerStats);
        })

        const familyObols = data.get(`ObolEqO1`) as string[];
        const familyObolsMods = data.get('ObolEqMAPz1') as Record<number, StoneProps>;
        familyObols.forEach((obol, obolIndex) => {
            const itemInfo = allItems.find(item => item.internalName == obol)?.duplicate() ?? Item.emptyItem(obol);
            if (!obol.includes("Locked") && obol != "Blank" && Object.keys(familyObolsMods).includes(obolIndex.toString())) {
                itemInfo.addStone(familyObolsMods[obolIndex]);
            }
            obols.familyObols.push(new Obol(itemInfo, obolIndex, false))
            itemInfo.itemStats.forEach(stat => {
                obols.familyStats.addStat(stat);
            })
        });

        const inventory = data.get(`ObolInvOr`) as Record<string, string>[];
        inventory.forEach((typeInventory, index) => {
            const tabModifications = data.get(`ObolInvMAP_${index}`) as Record<string, string>[];
            obols.inventory.set(index as ObolType, []);
            [...Object.entries(typeInventory)].forEach(([key, obol], obolIndex) => {
                if (key == "length") {  // ignore the length key, we don't care.
                    return;
                }
                const itemInfo = allItems.find(item => item.internalName == obol)?.duplicate() ?? Item.emptyItem(obol);
                if (!obol.includes("Locked") && obol != "Blank" && (tabModifications && Object.keys(tabModifications).includes(obolIndex.toString()))) {
                    itemInfo.addStone(tabModifications[obolIndex]);
                }
                obols.inventory.get(index)?.push(new Obol(itemInfo, -1, false, index as ObolType));
            })
        });
    }
}
