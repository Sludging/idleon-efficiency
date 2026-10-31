import { Domain, RawData } from "../base/domain";
import { Companion, getCompanionActiveBonus } from "../companions";
import { initLegendTalentMetadataRepo } from "../data/LegendTalentMetadataRepo";
import { initLegendTalentsRepo, LegendTalentBase } from "../data/LegendTalentsRepo";
import { EventShop } from "../eventShop";
import { GemStore } from "../gemPurchases";
import { Item } from "../items";
import { Menagerie, MenagerieUnlock } from "../menagerie";
import { LegendTalentActivationModel } from "../model/legendTalentActivationModel";
import { LegendTalentMenagerieCapSourceModel } from "../model/legendTalentMenagerieCapSourceModel";
import { LegendTalentMetadataModel } from "../model/legendTalentMetadataModel";
import { LegendTalentModel } from "../model/legendTalentModel";
import { LegendTalentResearchCapSourceModel } from "../model/legendTalentResearchCapSourceModel";
import { Player } from "../player";
import { Sailing } from "../world-5/sailing/sailing";
import { Clamworks } from "./clamworks";
import { ResearchGrid } from "./research";
import { SushiStation } from "./sushi";
import { ZenithMarket } from "./zenithShop";

export const BASE_SUPER_TALENT_LEVELS = 50;

export class LegendTalent {
    level: number = 0;

    private researchMaximumLevelBonus: number = 0;
    private menagerieCapOwned: boolean = false;
    private activationOwned: boolean = false;

    constructor(
        public index: number,
        public data: LegendTalentModel,
        public displayOrder: number = 0,
        private readonly researchCapSource?: LegendTalentResearchCapSourceModel,
        private readonly menagerieCapSource?: LegendTalentMenagerieCapSourceModel,
        private readonly activation?: LegendTalentActivationModel,
    ) {}

    static fromBase(data: LegendTalentBase[], metadata: LegendTalentMetadataModel) {
        return data.map(talent => new LegendTalent(
            talent.index,
            talent.data,
            legendTalentsDisplayOrder.indexOf(talent.index),
            metadata.researchCapSources.find(source => source.talentIndices.includes(talent.index)),
            metadata.menagerieCapSources.find(source => source.talentIndices.includes(talent.index)),
            metadata.activations.find(activation => activation.talentIndex === talent.index),
        ));
    }

    parse(savedLevel: number | undefined): void {
        this.level = savedLevel ?? 0;
        this.researchMaximumLevelBonus = 0;
        this.menagerieCapOwned = false;
        this.activationOwned = false;
    }

    update(research: ResearchGrid, menagerieUnlocks: MenagerieUnlock[]): void {
        this.researchMaximumLevelBonus = this.researchCapSource === undefined
            ? 0
            : research.getBonusForId(this.researchCapSource.researchGridIndex, 1);
        this.menagerieCapOwned = this.menagerieCapSource !== undefined
            && menagerieUnlocks[this.menagerieCapSource.menagerieUnlockIndex].owned;
        this.activationOwned = this.activation !== undefined
            && menagerieUnlocks[this.activation.menagerieUnlockIndex].owned;
    }

    getName(): string {
        return this.activation?.canonicalName ?? this.data.name;
    }

    isAvailable(): boolean {
        return this.data.bonus !== "filler" && (this.activation === undefined || this.activationOwned);
    }

    getMaxLevel(): number {
        let maximumLevel = this.data.maxLevel;
        if (this.researchCapSource !== undefined) {
            maximumLevel = Math.floor(maximumLevel + this.researchMaximumLevelBonus);
        }

        // The Menagerie increase applies after the Research maximum is floored.
        if (this.menagerieCapSource !== undefined && this.menagerieCapOwned) {
            maximumLevel = Math.floor(this.menagerieCapSource.capIncrement + maximumLevel);
        }

        return maximumLevel;
    }

    getBonus = (level: number = this.level): number => {
        // Saved levels grant their raw bonus independently of talent activation.
        return Math.round(level * this.data.bonusValue);
    }

    getSecondaryValue = (level: number = this.level): string => {
        switch(this.index) {
            case 2:
                return (2 + this.getBonus(level)).toString();
            default:
                return "$";
        }
    }

    getNextLevelDesc = (): string => {
        if (this.level >= this.getMaxLevel()) {
            return "";
        }

        const value = this.getBonus(this.level + 1);

        return this.data.description.replace("}", `${(1 + value / 100).toString()}`).replace("{", value.toString()).replace("$", this.getSecondaryValue(this.level + 1));
    }

    getDesc = (): string => {
        const value = this.getBonus();

        return this.data.bonus.replace("}", `${(1 + value / 100).toString()}`).replace("{", value.toString()).replace("$", this.getSecondaryValue());
    }
}

export class LegendTalents extends Domain {
    talents: LegendTalent[] = [];
    pointsOwned: number = 0;
    pointsSpent: number = 0;
    pointsAvaible: number = 0;

    superTalentUnlocked: boolean = false;
    superTalentBonusLevels: number = BASE_SUPER_TALENT_LEVELS;

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: [] }
        ]
    }


    init(_allItems: Item[]) {
        const metadata = initLegendTalentMetadataRepo()[0].data;
        this.talents = LegendTalent.fromBase(initLegendTalentsRepo(), metadata);
        return this;
    }

    parse(data: Map<string, any>): void {
        const legendTalents = data.get(this.getDataKey()) as LegendTalents;
        const spelunkingData = data.get("Spelunk") as number[][];

        const legendTalentsLevels = spelunkingData[18] ?? [];
        legendTalents.talents.forEach(talent => {
            talent.parse(legendTalentsLevels[talent.index]);
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
    const zenithMarket = data.get("zenithMarket") as ZenithMarket;
    const sushiStation = data.get("sushi") as SushiStation;
    const research = data.get("research") as ResearchGrid;
    const menagerie = data.get("menagerie") as Menagerie;

    const menagerieUnlocks = menagerie.getUnlocks();
    legendTalents.talents.forEach(talent => talent.update(research, menagerieUnlocks));

    // Legend Talents Points
    let pointsOwned = 0;

    players.forEach(player => {
        pointsOwned += Math.max(0, Math.floor((player.level - 400) / 100));
    });

    const clamBonus1 = clamworks.isBonusUnlocked(1) ? 1 : 0;
    const clamBonus4 = clamworks.isBonusUnlocked(4) ? 1 : 0;
    const companionBonus37 = getCompanionActiveBonus(companions, 37) * 10;
    const gemBonus42 = gemStore.purchases.find(purchase => purchase.no == 42)?.pucrhased ?? 0;
    const artifactBonus34 = Math.min(6, sailing.artifacts.find(artifact => artifact.index == 34)?.getBonus() ?? 0);
    const evenShopBonus32 = eventShop.isBonusOwned(32) ? 2 : 0;
    const sushiBonus = sushiStation.getUniqueSushi() > 19 ? 1 : 0;
    
    pointsOwned += clamBonus1 + clamBonus4 + companionBonus37 + gemBonus42 + artifactBonus34 + evenShopBonus32 + sushiBonus;

    legendTalents.pointsOwned = pointsOwned;
    legendTalents.pointsSpent = legendTalents.talents.reduce((sum, talent) => sum += talent.level, 0);
    legendTalents.pointsAvaible = legendTalents.pointsOwned - legendTalents.pointsSpent;

    // Super Talents
    legendTalents.superTalentUnlocked = legendTalents.getBonusFromIndex(39) >= 1;
    const legendTalentBonus7 = legendTalents.getBonusFromIndex(7);
    const zenithMarketBonus5 = zenithMarket.getBonusForId(5);
    legendTalents.superTalentBonusLevels = Math.round(BASE_SUPER_TALENT_LEVELS + legendTalentBonus7 + zenithMarketBonus5);

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