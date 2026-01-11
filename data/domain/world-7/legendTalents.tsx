import { Domain, RawData } from "../base/domain";
import { Companion } from "../companions";
import { initLegendTalentsRepo, LegendTalentBase } from "../data/LegendTalentsRepo";
import { GemStore } from "../gemPurchases";
import { Item } from "../items";
import { LegendTalentModel } from "../model/legendTalentModel";
import { Player } from "../player";

export class LegendTalent {
    level: number = 0;

    constructor(public index: number, public data: LegendTalentModel, public displayOrder: number = 0) {}

    static fromBase(data : LegendTalentBase[]) {
        return data.map(d => new LegendTalent(d.index, d.data, legendTalentsDisplayOrder.indexOf(d.index)));
    }

    getBonus = (level: number = this.level): number => {
        return level * this.data.bonusValue;
    }

    getNextLevelDesc = (): string => {
        if (this.level >= this.data.maxLevel) {
            return "";
        }

        const value = this.getBonus(this.level + 1);

        return this.data.nextLevelPreview.replace("}", `${(1 + value / 100).toString()}`).replace("{", value.toString());
    }

    getDesc = (): string => {
        const value = this.getBonus();

        return this.data.desc.replace("}", `${(1 + value / 100).toString()}`).replace("{", value.toString());
    }
}

export class LegendTalents extends Domain {
    legendTalents: LegendTalent[] = [];
    pointsOwned: number = 0;
    pointsSpent: number = 0;
    pointsAvaible: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: 0 }
        ]
    }

    init(_allItems: Item[]) {
        this.legendTalents = LegendTalent.fromBase(initLegendTalentsRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const legendTalents = data.get(this.getDataKey()) as LegendTalents;
        const spelunkingData = data.get("Spelunk") as any[][];

        // Safe guard for old accounts / missing data.
        if (!spelunkingData || spelunkingData.length == 0) {
            return;
        }

        const legendTalentsLevels = spelunkingData[18] as number[];
        legendTalents.legendTalents.forEach(talent => {
            if (talent.index < legendTalentsLevels.length) {
                talent.level = legendTalentsLevels[talent.index];
            }
        });
    }
}

export const updateLegendTalents = (data: Map<string, any>) => {
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const players = data.get("players") as Player[];
    const companions = data.get("companions") as Companion[];
    const gemStore = data.get("gems") as GemStore;

    let pointsOwned = 0;

    players.forEach(player => {
        pointsOwned += Math.max(0, Math.floor((player.level - 400) / 100));
    });

    // TODO : add ClamBonus 1 and 4 once implemented
    
    const companion37 = companions.find(c => c.id === 37);
    pointsOwned += (companion37 && companion37.owned) ? 10 : 0;

    pointsOwned += gemStore.purchases.find(purchase => purchase.index == 42)?.pucrhased ?? 0;

    // event shop 32

    //sailing artifact

    legendTalents.pointsOwned = pointsOwned;
    legendTalents.pointsSpent = legendTalents.legendTalents.reduce((sum, talent) => sum += talent.level, 0);
    legendTalents.pointsAvaible = legendTalents.pointsOwned - legendTalents.pointsSpent;

    return legendTalents;
}

// CustomLists.Spelunky[26]
export const legendTalentsDisplayOrder = [
    39,
    7,
    38,
    14,
    35,
    2,
    13,
    3,
    18,
    5,
    4,
    9,
    23,
    33,
    37,
    1,
    16,
    25,
    36,
    0,
    20,
    31,
    19,
    17,
    15,
    32,
    11,
    12,
    27,
    8,
    6,
    34,
    30,
    26,
    21,
    10,
    28,
    29,
    22,
    24,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49
]