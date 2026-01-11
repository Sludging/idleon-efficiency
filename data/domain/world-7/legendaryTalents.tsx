import { LegendaryTalentBase } from "../data/LegendaryTalentsRepo";
import { LegendaryTalentModel } from "../model/legendaryTalentModel";

export class LegendaryTalent {
    level: number = 0;

    constructor(public index: number, public data: LegendaryTalentModel, public displayOrder: number = 0) {}

    static fromBase(data : LegendaryTalentBase[]) {
        return data.map(d => new LegendaryTalent(d.index, d.data, legendaryTalentsDisplayOrder.indexOf(d.index)));
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

// CustomLists.Spelunky[26]
export const legendaryTalentsDisplayOrder = [
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