import { Domain, RawData } from "../base/domain";
import { RoyalArmoryUpgradeBase, initRoyalArmoryUpgradeRepo } from "../data/RoyalArmoryUpgradeRepo";
import { OrbletMarketBonusBase, initOrbletMarketBonusRepo } from "../data/OrbletMarketBonusRepo";
import { Item } from "../items";
import { RoyalArmoryUpgradeModel } from "../model/royalArmoryUpgradeModel";
import { OrbletMarketBonusModel } from "../model/orbletMarketBonusModel";
import type { Player } from "../player";
import type { BigFish } from "../world-7/bigFish";
import type { JellyOperator } from "../world-7/jellyOperator";
import { lavaLog } from "../../utility";
import { Arcade } from "../world-2/arcade";
import { Alchemy } from "../world-2/alchemy/alchemy";
import { getCompanionActiveBonus } from "../companions";

// Match game number conversion for missing, boolean, and saved string values.
const royalArmoryAsNumber = (value: unknown): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") return value;
    if (typeof value === "boolean") return Number(value);
    return parseFloat(typeof value === "string" ? value : String(value));
};
type RoyalArmoryResourceRateRow = {
    mapLevel: number;
    outpostLevel: number;
    purified: number;
    totalSupports: number;
    experienceRank2: number;
    totalUnits0: number;
};

type RoyalArmoryResourceRateEarlyInputs = {
    orbletMarketBonus1: number;
    sushiQuantityBonus60: number;
    zenithMarketBonus10: number;
    outpostPurifyBonus: number;
    supportCollectionBonus: number;
    outpostLevelBonus: number;
    armoryUpgradeBonus18: number;
    armoryUpgradeBonus50: number;
    armoryUpgradeBonus51: number;
    armoryUpgradeBonus52: number;
    armoryUpgradeBonus53: number;
    armoryUpgradeBonus70: number;
    armoryUpgradeBonus73: number;
    totalStat0: number;
    totalStat1: number;
    totalStat2: number;
    totalStat3: number;
    unitSpecEffect0: number;
};

type RoyalArmoryResourceRateLateInputs = {
    companionActiveBonus141: number;
    arcadeBonus70: number;
    accountBestTalent225: number;
    accountBestTalent226: number;
    accountBestTalent230: number;
    w14ByPlayerID: ReadonlyMap<number, number>;
};


export class RoyalArmoryUpgrade {
    level: number = 0;

    constructor(
        public index: number,
        public data: RoyalArmoryUpgradeModel,
    ) { }

    static fromBase(data: RoyalArmoryUpgradeBase[]): RoyalArmoryUpgrade[] {
        return data.map((upgrade) => new RoyalArmoryUpgrade(upgrade.index, upgrade.data));
    }

    getBonus(): number {
        return this.level * this.data.bonusPerLevel;
    }
}

export class RoyalArmoryOrbletMarketBonus {
    level: number = 0;
    private bonus: number = 0;

    constructor(
        public index: number,
        public data: OrbletMarketBonusModel,
    ) { }
    static fromBase(data: OrbletMarketBonusBase[]): RoyalArmoryOrbletMarketBonus[] {
        return data.map((bonus) => new RoyalArmoryOrbletMarketBonus(bonus.index, bonus.data));
    }

    updateBonus(): void {
        // Each Orblet market level adds its listed bonus; the game rounds down the total.
        this.bonus = Math.floor(Number(this.data.bonusPerLevel) * Number(this.level));
        this.level = 0;
    }

    getBonus(): number {
        return this.bonus;
    }
}

export class RoyalArmory extends Domain {
    upgrades: RoyalArmoryUpgrade[] = [];
    orbletMarketBonuses: RoyalArmoryOrbletMarketBonus[] = [];
    private unitSpecEffects: [number, number, number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0, 0, 0];
    private extraClearKills: number = 1;
    // TODO: Make proper models from wiki data for these.
    royalStatueLevels: number[] = [];
    outposts: number[][] = [];
    resourceGrades: number[] = [];
    private royalGLogValues: unknown[] = [];
    private totalStats: [number, number, number, number, number] = [0, 0, 0, 0, 0];
    private mapPurificationStates: boolean[] = [];
    // Totals are calculated once after parsing so downstream callers only read settled account-wide results.
    private totalOutpostUnitsByRow: ([number, number, number, number] | undefined)[] = [];
    private outpostExperienceRanksByRow: ([number, number, number, number, number] | undefined)[] = [];
    private passiveOutpostUnitsByRow: ([number, number, number, number] | undefined)[] = [];
    private outpostResourceRateRowsByMap: (RoyalArmoryResourceRateRow | undefined)[] = [];
    private outpostResourceRateEarlyInputs: RoyalArmoryResourceRateEarlyInputs | undefined;
    private outpostResourceRateLateInputs: RoyalArmoryResourceRateLateInputs | undefined;


    getRawKeys(): RawData[] {
        return [
            { key: "RoyalG", perPlayer: false, default: [] },
            { key: "RoyalMaps", perPlayer: false, default: [] },
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        this.upgrades = RoyalArmoryUpgrade.fromBase(initRoyalArmoryUpgradeRepo());
        this.orbletMarketBonuses = RoyalArmoryOrbletMarketBonus.fromBase(initOrbletMarketBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const royalArmory = data.get(this.getDataKey()) as RoyalArmory;
        const royalG = data.get("RoyalG") as number[][] | undefined;
        const royalMaps = data.get("RoyalMaps") as number[][] | undefined;
        const upgradeLevels = royalG?.[2] ?? [];
        const orbletMarketLevels = royalG?.[23] ?? [];
        royalArmory.royalStatueLevels = royalG?.[0] ?? [];
        royalArmory.outposts = royalMaps ?? [];
        royalArmory.resourceGrades = royalG?.[5] ?? [];
        royalArmory.royalGLogValues = royalG?.[1] ?? [];
        royalArmory.totalStats = [0, 0, 0, 0, 0];
        royalArmory.outpostResourceRateRowsByMap = [];
        royalArmory.outpostResourceRateEarlyInputs = undefined;
        royalArmory.outpostResourceRateLateInputs = undefined;



        royalArmory.upgrades.forEach((upgrade) => {
            upgrade.level = Number(upgradeLevels[upgrade.index]) || 0;
        });
        royalArmory.orbletMarketBonuses.forEach((bonus) => {
            bonus.level = orbletMarketLevels[bonus.index] ?? 0;
        });
    }

    updateMapPurificationStates(): void {
        this.mapPurificationStates = this.outposts.map((outpost, mapIndex) => {
            // An outpost without level fields is unpurified; reaching the first purification rank is enough.
            if (outpost.length < 2) {
                return false;
            }

            const rank = this.getOutpostExperienceRank(mapIndex, 4);
            return Math.min(rank ?? 0, 1) === 1;
        });
    }

    getUpgradeBonus(index: number): number {
        return this.upgrades.find((upgrade) => upgrade.index === index)?.getBonus() ?? 0;
    }

    getUnitSpecEffect(index: number): number {
        return this.unitSpecEffects[index] ?? 0;
    }

    updateUnitSpecEffects(): void {
        // The first and third unit bonuses include a base; the others come from Armory upgrades.
        this.unitSpecEffects[0] = 50 + this.getUpgradeBonus(19);
        this.unitSpecEffects[1] = this.getUpgradeBonus(20);
        this.unitSpecEffects[2] = 25 + this.getUpgradeBonus(21);
        this.unitSpecEffects[3] = this.getUpgradeBonus(22);
        this.unitSpecEffects[5] = this.getUpgradeBonus(24);
        this.unitSpecEffects[6] = this.getUpgradeBonus(25);
        this.unitSpecEffects[7] = this.getUpgradeBonus(26);
    }

    updateUnitSpecEffectExtraClearKills(): void {
        // The extra-clear unit bonus scales with its upgrade and the account-wide clear-kill multiplier.
        this.unitSpecEffects[4] = 4000 * (1 + this.getUpgradeBonus(23) / 100) * this.extraClearKills;
    }

    getOrbletMarketBonus(index: number): number {
        return this.orbletMarketBonuses.find((bonus) => bonus.index === index)!.getBonus();
    }

    updateExtraClearKills(players: Player[], bigFish: BigFish, jellyOperator: JellyOperator): void {
        const maxTalent231 = players.reduce((maximum, player) => Math.max(maximum, player.getTalentBonus(231)), 0);
        const orbletMarketBonus3 = this.getOrbletMarketBonus(3);
        const bigFishBonus6 = bigFish.getBonusFromIndex(6);
        const jellyQuantity2 = jellyOperator.obstructions.find((obstruction) => obstruction.index === 2)!.getBonus();

        // Use the strongest character's clear-kill talent, then combine Orblet and Big Fish before Jelly.
        this.extraClearKills =
            Math.max(1, maxTalent231) *
            (1 + (orbletMarketBonus3 + bigFishBonus6) / 100) *
            (1 + jellyQuantity2 / 100);
    }

    getExtraClearKills(): number {
        return this.extraClearKills;
    }

    getOutpostLevelBonus(index: number, variant: number): number {
        switch (index) {
            case 0:
                return 1;
            case 1:
                // The nonzero variant feeds connection range; zero adds resource-collection percentage points.
                return variant === 0 ? 5 : 250;
            case 2:
                return 10;
            default:
                return 1;
        }
    }


    // Perfect Purification adds percentage points to purified-map collection.
    getOutpostPurifyBonus(): number {
        return 200 + this.getUpgradeBonus(1);
    }

    // Upgrade 43 scales the base Support Collection percentage; Jelly quantity is added afterward.
    getSupportCollectionBonus(jellyOperationBonusQuantity: number): number {
        return 200 * (1 + this.getUpgradeBonus(43) / 100) + jellyOperationBonusQuantity;
    }


    getTotalRoyalStatueLevels(): number {
        return this.royalStatueLevels.reduce(
            (total, level) => total + Math.max(0, Number(level) || 0),
            0,
        );
    }

    getTotalStat(index: number): number {
        return this.totalStats[index] ?? 0;
    }

    updateTotalStats(): void {
        const totalStats: [number, number, number, number, number] = [0, 0, 0, 0, 0];

        for (const grade of this.resourceGrades) {
            totalStats[0] += royalArmoryAsNumber(grade);
        }

        for (let mapIndex = 0; mapIndex < this.outposts.length; mapIndex += 1) {
            const outpost = this.outposts[mapIndex];
            if (outpost.length < 3) continue;

            // Preserve the game's grouping when adding each built outpost's three progression values.
            totalStats[1] +=
                royalArmoryAsNumber(outpost[0]) +
                (royalArmoryAsNumber(outpost[1]) + royalArmoryAsNumber(outpost[2]));

            // Count built outposts that reach the first rank-4 experience threshold, not the rank total.
            if ((this.getOutpostExperienceRank(mapIndex, 4) ?? 0) >= 1) {
                totalStats[2] += 1;
            }
            totalStats[4] += 1;
        }

        // Each of eight saved resource totals contributes its own logarithm, including fractional progress.
        for (let index = 0; index < 8; index += 1) {
            totalStats[3] += lavaLog(royalArmoryAsNumber(this.royalGLogValues[10 * index]));
        }

        this.totalStats = totalStats;
    }

    updateOutpostResourceRateEarlyInputs(
        sushiQuantityBonus60: number | undefined,
        zenithMarketBonus10: number | undefined,
        supportCollectionJellyBonus: number | undefined,
    ): void {
        if (
            sushiQuantityBonus60 === undefined
            || zenithMarketBonus10 === undefined
            || supportCollectionJellyBonus === undefined
        ) {
            this.outpostResourceRateRowsByMap = [];
            this.outpostResourceRateEarlyInputs = undefined;
            return;
        }

        const rowsByMap: (RoyalArmoryResourceRateRow | undefined)[] = [];
        this.outposts.forEach((outpost, mapIndex) => {
            if (outpost === undefined || outpost === null) return;

            const experienceRank2 = this.getOutpostExperienceRank(mapIndex, 2);
            const totalUnits = this.totalOutpostUnitsByRow[mapIndex];
            if (experienceRank2 === undefined || totalUnits === undefined) return;

            // Even an empty outpost row has an hourly resource rate; snapshot its zero-valued inputs.
            rowsByMap[mapIndex] = {
                mapLevel: royalArmoryAsNumber(outpost[0]),
                outpostLevel: royalArmoryAsNumber(outpost[1]),
                purified: Number(this.isMapPurified(mapIndex)),
                totalSupports: this.getTotalSupports(mapIndex),
                experienceRank2,
                totalUnits0: totalUnits[0],
            };
        });

        this.outpostResourceRateRowsByMap = rowsByMap;
        this.outpostResourceRateEarlyInputs = {
            orbletMarketBonus1: this.getOrbletMarketBonus(1),
            sushiQuantityBonus60,
            zenithMarketBonus10,
            outpostPurifyBonus: this.getOutpostPurifyBonus(),
            supportCollectionBonus: this.getSupportCollectionBonus(supportCollectionJellyBonus),
            outpostLevelBonus: this.getOutpostLevelBonus(1, 0),
            armoryUpgradeBonus18: this.getUpgradeBonus(18),
            armoryUpgradeBonus50: this.getUpgradeBonus(50),
            armoryUpgradeBonus51: this.getUpgradeBonus(51),
            armoryUpgradeBonus52: this.getUpgradeBonus(52),
            armoryUpgradeBonus53: this.getUpgradeBonus(53),
            armoryUpgradeBonus70: this.getUpgradeBonus(70),
            armoryUpgradeBonus73: this.getUpgradeBonus(73),
            totalStat0: this.getTotalStat(0),
            totalStat1: this.getTotalStat(1),
            totalStat2: this.getTotalStat(2),
            totalStat3: this.getTotalStat(3),
            unitSpecEffect0: this.getUnitSpecEffect(0),
        };
    }

    updateOutpostResourceRateLateInputs(
        players: Player[],
        companionActiveBonus141: number | undefined,
        arcadeBonus70: number | undefined,
        w14ByPlayerID: ReadonlyMap<number, number>,
    ): void {
        if (players.length === 0 || companionActiveBonus141 === undefined || arcadeBonus70 === undefined) {
            this.outpostResourceRateLateInputs = undefined;
            return;
        }

        let accountBestTalent225 = players[0].getTalentBonus(225);
        let accountBestTalent226 = players[0].getTalentBonus(226);
        let accountBestTalent230 = players[0].getTalentBonus(230);
        for (let index = 1; index < players.length; index += 1) {
            accountBestTalent225 = Math.max(accountBestTalent225, players[index].getTalentBonus(225));
            accountBestTalent226 = Math.max(accountBestTalent226, players[index].getTalentBonus(226));
            accountBestTalent230 = Math.max(accountBestTalent230, players[index].getTalentBonus(230));
        }

        // Each talent uses the roster's best value, while the W14 bubble stays character-specific.
        this.outpostResourceRateLateInputs = {
            companionActiveBonus141,
            arcadeBonus70,
            accountBestTalent225,
            accountBestTalent226,
            accountBestTalent230,
            w14ByPlayerID,
        };
    }

    getOutpostResourceRate(mapIndex: number, player: Player): number | undefined {
        const early = this.outpostResourceRateEarlyInputs;
        const late = this.outpostResourceRateLateInputs;
        const row = this.outpostResourceRateRowsByMap[mapIndex | 0];
        const playerW14 = late?.w14ByPlayerID.get(player.playerID);
        if (early === undefined || late === undefined || row === undefined || playerW14 === undefined) {
            return undefined;
        }

        // Combine account bonuses with this outpost's progress and the selected player's bonuses in game order.
        return (
            125 *
            (1 + late.companionActiveBonus141) *
            (1 +
                (early.orbletMarketBonus1 +
                    (early.sushiQuantityBonus60 +
                        (Math.min(50, playerW14) + (late.arcadeBonus70 + early.armoryUpgradeBonus70)))) /
                100) *
            (1 + (early.outpostPurifyBonus * row.purified) / 100) *
            (1 + (early.supportCollectionBonus * row.totalSupports) / 100) *
            (1 + (early.outpostLevelBonus * row.outpostLevel) / 100) *
            (1 + (row.experienceRank2 * early.armoryUpgradeBonus73) / 100) *
            (1 + (early.totalStat0 * early.armoryUpgradeBonus18) / 100) *
            (1 + (early.totalStat1 * early.armoryUpgradeBonus50) / 100) *
            (1 + (early.totalStat2 * early.armoryUpgradeBonus51) / 100) *
            (1 +
                (Math.floor(Math.max(0, player.level - 1000) / 100) * early.armoryUpgradeBonus52) / 100) *
            (1 + (early.unitSpecEffect0 * row.totalUnits0) / 100) *
            (1 + (late.accountBestTalent225 + late.accountBestTalent226) / 100) *
            Math.max(1, late.accountBestTalent230) *
            (1 + (early.totalStat3 * early.armoryUpgradeBonus53) / 100) *
            (1 + early.zenithMarketBonus10 / 100) *
            Math.min(5, 1 + (10 * Math.max(0, Math.round(row.mapLevel - 5))) / 100)
        );
    }


    isMapPurified(mapIndex: number): boolean {
        return this.mapPurificationStates[mapIndex] ?? false;
    }

    getOutpostExperienceFormula(rank: number, rankType: 0 | 1 | 2 | 3 | 4): number {
        // Outpost EXP types 2 and 4 have dedicated curves; types 0, 1, and 3 share the fallback.
        if (rankType === 4) {
            return 100000 * Math.pow(10, rank);
        }

        if (rankType === 2) {
            return (50 + 50 * rank) * Math.pow(1.8, rank);
        }

        return (10 + 5 * rank) * Math.pow(1.3, rank);
    }

    updateOutpostExperienceRanks(): void {
        const ranksByRow: ([number, number, number, number, number] | undefined)[] = [];
        this.outposts.forEach((outpost, mapIndex) => {
            if (outpost === undefined || outpost === null) return;

            const ranks: [number, number, number, number, number] = [0, 0, 0, 0, 0];
            for (let rankIndex = 0; rankIndex < ranks.length; rankIndex += 1) {
                const rankType = rankIndex as 0 | 1 | 2 | 3 | 4;
                // Missing saved experience counts as zero, below every first-rank requirement.
                const experience = royalArmoryAsNumber(outpost[3 + rankType]);
                let rank = 0;
                while (experience >= this.getOutpostExperienceFormula(rank, rankType)) {
                    rank += 1;
                }
                ranks[rankType] = rank;
            }

            ranksByRow[mapIndex] = ranks;
        });
        this.outpostExperienceRanksByRow = ranksByRow;
    }

    getOutpostExperienceRank(row: number, rankType: 0 | 1 | 2 | 3 | 4): number | undefined {
        return this.outpostExperienceRanksByRow[row | 0]?.[rankType];
    }

    updatePassiveOutpostUnits(): void {
        const passiveUnitsByRow: ([number, number, number, number] | undefined)[] = [];
        this.outposts.forEach((outpost, mapIndex) => {
            if (outpost === undefined || outpost === null) return;

            const rank = this.getOutpostExperienceRank(mapIndex, 2)!;
            const glorify = royalArmoryAsNumber(outpost[12]);
            const passiveUnits: [number, number, number, number] = [0, 0, 0, 0];

            // Higher ranks grant passive workers in four-rank steps; Glorify can add one to the first type.
            for (let selector = 0; selector < passiveUnits.length; selector += 1) {
                const typedSelector = selector as 0 | 1 | 2 | 3;
                passiveUnits[typedSelector] =
                    Math.ceil(Math.max(0, rank - typedSelector) / 4)
                    + (typedSelector === 0 ? Math.min(1, glorify) : 0);
            }

            passiveUnitsByRow[mapIndex] = passiveUnits;
        });
        this.passiveOutpostUnitsByRow = passiveUnitsByRow;
    }

    getPassiveOutpostUnits(mapIndex: number, selector: 0 | 1 | 2 | 3): number {
        const passiveUnits = this.passiveOutpostUnitsByRow[mapIndex | 0];
        if (passiveUnits === undefined) {
            throw new RangeError(`Royal Armory row ${mapIndex} has no supported passive-unit data`);
        }

        return passiveUnits[selector];
    }

    getTotalOutpostUnits(mapIndex: number, unitType: 0 | 1 | 2 | 3): number {
        const totals = this.totalOutpostUnitsByRow[mapIndex | 0];
        if (totals === undefined) {
            throw new RangeError(`Royal Armory row ${mapIndex} has no supported total-unit data`);
        }

        return totals[unitType];
    }

    updateTotalOutpostUnits(): void {
        this.totalOutpostUnitsByRow = [];
        this.outposts.forEach((outpost, mapIndex) => {
            if (outpost === undefined || outpost === null) return;

            // An empty RoyalMaps row has no assignment encoding but still receives its passive-unit totals.
            const encodedAssignments = String(outpost[11] ?? "");
            const totals: [number, number, number, number] = [0, 0, 0, 0];

            // RoyalG counts exactly nine encoded positions; each rounded bucket maps to one unit selector.
            for (let slotIndex = 0; slotIndex < 9; slotIndex += 1) {
                const selector = Math.round(Number(encodedAssignments.charAt(slotIndex)) - 2);
                if (selector >= 0 && selector < totals.length) {
                    totals[selector as 0 | 1 | 2 | 3] += 1;
                }
            }

            // TotalUnitsz adds PassiveUnitsz for each selector before rounding the combined count.
            for (let selector = 0; selector < totals.length; selector += 1) {
                const typedSelector = selector as 0 | 1 | 2 | 3;
                totals[typedSelector] = Math.round(
                    totals[typedSelector] + this.getPassiveOutpostUnits(mapIndex, typedSelector),
                );
            }

            this.totalOutpostUnitsByRow[mapIndex] = totals;
        });
    }

    getTotalSupports(mapIndex: number): number {
        const supportCounts = new Map<string, number>();

        for (const outpost of this.outposts) {
            if (outpost.length < 3 || Number(outpost[10]) !== 1) continue;

            // RoyalG applies asNumber before removing the 1000 map-index offset; each slot counts independently.
            for (let slotIndex = 8; slotIndex <= 9; slotIndex++) {
                const rawSlot: unknown = outpost[slotIndex];
                const slot = rawSlot === null || rawSlot === undefined
                    ? 0
                    : typeof rawSlot === "number"
                        ? rawSlot
                        : typeof rawSlot === "boolean"
                            ? Number(rawSlot)
                            : parseFloat(String(rawSlot));
                const supportKey = String(Math.round(slot - 1000));
                supportCounts.set(supportKey, (supportCounts.get(supportKey) ?? 0) + 1);
            }
        }

        return supportCounts.get(String(mapIndex)) ?? 0;
    }

}

export const updateRoyalArmory = (accountData: Map<string, any>) => {
    const royalArmory = accountData.get("royalArmory") as RoyalArmory;
    royalArmory.updateOutpostExperienceRanks();
    royalArmory.updateMapPurificationStates();
    royalArmory.updatePassiveOutpostUnits();
    royalArmory.updateTotalOutpostUnits();
    royalArmory.orbletMarketBonuses.forEach((bonus) => bonus.updateBonus());
    royalArmory.updateUnitSpecEffects();
    royalArmory.updateTotalStats();
    const jellyOperator = accountData.get("jellyOperator") as JellyOperator;
    const supportCollectionObstruction = jellyOperator.obstructions.find((obstruction) => obstruction.index === 41);
    const sushi = accountData.get("sushi");
    const zenithMarket = accountData.get("zenithMarket");
    royalArmory.updateOutpostResourceRateEarlyInputs(
        sushi?.getBonusFromIndex(60),
        zenithMarket?.getBonusForId(10),
        supportCollectionObstruction?.getBonus(),
    );
};

export const updateRoyalArmoryLateInputs = (accountData: Map<string,any>) => {
    const royalArmory = accountData.get("royalArmory") as RoyalArmory;
    const players = accountData.get("players") as Player[];
    const alchemy = accountData.get("alchemy") as Alchemy;
    const arcade = accountData.get("arcade") as Arcade;
    const companions = accountData.get("companions")

    royalArmory.updateExtraClearKills(
        accountData.get("players") as Player[],
        accountData.get("bigFish") as BigFish,
        accountData.get("jellyOperator") as JellyOperator,
    );

    royalArmory.updateUnitSpecEffectExtraClearKills();

    const w14ByPlayerID = new Map<number, number>();
    for (const player of players) {
        w14ByPlayerID.set(player.playerID, alchemy.getBubbleBonusForKey("W14", player));
    }

    // Cache each character's Alchemy bonus and the account bonuses for hourly outpost production.
    royalArmory.updateOutpostResourceRateLateInputs(
        players,
        getCompanionActiveBonus(companions, 141),
        arcade.bonuses.find((bonus) => bonus.index === 70)?.getBonus(),
        w14ByPlayerID,
    );
    return royalArmory;
}