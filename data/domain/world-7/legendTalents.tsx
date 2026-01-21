import { Domain, RawData } from "../base/domain";
import { Companion } from "../companions";
import { initLegendTalentsRepo, LegendTalentBase } from "../data/LegendTalentsRepo";
import { EventShop } from "../eventShop";
import { GemStore } from "../gemPurchases";
import { Item } from "../items";
import { LegendTalentModel } from "../model/legendTalentModel";
import { Player } from "../player";
import { Sailing } from "../sailing";
import { Clamworks } from "./clamworks";

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
    talents: LegendTalent[] = [];
    pointsOwned: number = 0;
    pointsSpent: number = 0;
    pointsAvaible: number = 0;

    superTalentUnlocked: boolean = false;
    superTalentBonusLevels: number = 50;

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: 0 }
        ]
    }

    init(_allItems: Item[]) {
        this.talents = LegendTalent.fromBase(initLegendTalentsRepo());
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
        legendTalents.talents.forEach(talent => {
            if (talent.index < legendTalentsLevels.length) {
                talent.level = legendTalentsLevels[talent.index];
            }
        });
    }

    getBonusFromIndex = (index: number): number => {
        const bonus = this.talents.find(talent => talent.index == index);

        if (bonus) {
            return bonus.getBonus();
        }

        return 0;
    }
}

export const updateLegendTalents = (data: Map<string, any>) => {
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const players = data.get("players") as Player[];
    const companions = data.get("companions") as Companion[];
    const gemStore = data.get("gems") as GemStore;
    const sailing = data.get("sailing") as Sailing;
    const clamworks = data.get("clamworks") as Clamworks;
    const eventShop = data.get("eventShop") as EventShop;

    // Legend Talents Points
    let pointsOwned = 0;

    players.forEach(player => {
        pointsOwned += Math.max(0, Math.floor((player.level - 400) / 100));
    });

    const clamBonus1 = clamworks.isBonusUnlocked(1) ? 1 : 0;
    const clamBonus4 = clamworks.isBonusUnlocked(4) ? 1 : 0;
    const companionBonus37 = companions.find(c => c.id === 37)?.owned || false ? 10 : 0;
    const gemBonus42 = gemStore.purchases.find(purchase => purchase.no == 42)?.pucrhased ?? 0;
    const artifactBonus34 = Math.min(5, sailing.artifacts.find(artifact => artifact.index == 34)?.getBonus() ?? 0);
    const evenShopBonus32 = eventShop.isBonusOwned(32) ? 2 : 0;
    
    pointsOwned += clamBonus1 + clamBonus4 + companionBonus37 + gemBonus42 + artifactBonus34 + evenShopBonus32;

    legendTalents.pointsOwned = pointsOwned;
    legendTalents.pointsSpent = legendTalents.talents.reduce((sum, talent) => sum += talent.level, 0);
    legendTalents.pointsAvaible = legendTalents.pointsOwned - legendTalents.pointsSpent;

    // Super Talents
    legendTalents.superTalentUnlocked = legendTalents.getBonusFromIndex(39) >= 1;
    const legendTalentBonus7 = legendTalents.getBonusFromIndex(7);
    // TODO : add zenith market bonus 5 here once implemented
    const zenithMarketBonus5 = 0;
    legendTalents.superTalentBonusLevels = Math.round(50 + legendTalentBonus7 + zenithMarketBonus5);

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