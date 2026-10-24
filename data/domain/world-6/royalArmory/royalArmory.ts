import { Domain, RawData } from "../../base/domain";
import { initRoyalArmoryUpgradeRepo } from "../../data/RoyalArmoryUpgradeRepo";
import { initOrbletMarketBonusRepo } from "../../data/OrbletMarketBonusRepo";
import { initRoyalResourceRepo } from "../../data/RoyalResourceRepo";
import { initRoyalStatueRepo } from "../../data/RoyalStatueRepo";
import { MapInfo } from "../../maps";
import type { Item } from "../../items";
import type { Player } from "../../player";
import { ClassIndex } from "../../talents";
import type { BigFish } from "../../world-7/bigFish";
import type { JellyOperator } from "../../world-7/jellyOperator";
import type { Spelunking } from "../../world-7/spelunking";
import { lavaLog } from "../../../utility";
import type { Arcade } from "../../world-2/arcade";
import type { Alchemy } from "../../world-2/alchemy/alchemy";
import { getCompanionActiveBonus, type Companion } from "../../companions";
import type { Storage } from "../../storage";
import type { MasterClasses } from "../../masterClasses";
import { RoyalArmoryUpgrade } from "./upgrades";
import { RoyalArmoryOrbletMarketBonus } from "./orblets";
import { RoyalStatue } from "./statues";
import { RoyalResource, RoyalResourceNode, RoyalResourceNodes, royalArmoryAsNumber } from "./resourceNodes";
import { RoyalUnits, RoyalUnitRole } from "./units";
import { OUTPOST_RANKS, Outpost, OutpostRank, RankExperienceBonuses, RoyalMapSource, ResourceCollectionBonuses, RoyalGuardianContribution } from "./outposts";

export type RoyalOutpostWorldUnlock = Readonly<{
    unlocked: boolean;
    upgrade: RoyalArmoryUpgrade | undefined;
}>;

const emptyCollectionBonuses: ResourceCollectionBonuses = {
    orbletCollectionBonus: 0, sushiCollectionBonus: 0, zenithCollectionBonus: 0,
    purificationBonus: 0, supportCollectionBonus: 0, resourceGradeBonus: 0,
    outpostUpgradeBonus: 0, purifiedOutpostBonus: 0, guardianLevelBonus: 0,
    stockpileBonus: 0, armoryCollectionBonus: 0, commandRankBonus: 0,
    totalResourceGrade: 0, totalOutpostUpgradeLevels: 0, purifiedOutpostCount: 0,
    resourceQuantityLogTotal: 0, workerCollectionBonus: 0,
};

const emptyRankExperienceBonuses: RankExperienceBonuses = {
    orbletExperienceBonus: 0, purityExperienceBonus: 0, selectedRankExperienceBonus: 0,
    selectedRank: OutpostRank.Trading,
    rankEffects: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    purifiedRanks: { 0: false, 1: false, 2: false, 3: false, 4: false },
    intelRankBonus: 0, supportExperienceBonus: 0, jellyExperienceBonus: 0,
    militiaExperienceEnabled: false,
};

export const getRoyalGuardianContribution = (player: Player, alchemy: Alchemy): RoyalGuardianContribution => ({
    playerID: player.playerID,
    level: player.level,
    w14Bonus: alchemy.getBubbleBonusForKey("W14", player),
});

export class RoyalArmory extends Domain {
    upgrades: RoyalArmoryUpgrade[] = [];
    orbletMarketBonuses: RoyalArmoryOrbletMarketBonus[] = [];
    readonly units = new RoyalUnits();
    readonly resourceNodes = RoyalResourceNodes.fromBase(initRoyalResourceRepo());
    mapStates = new Map<number, RoyalMapSource>();
    resources = new Map<number, RoyalResource>();
    statues: RoyalStatue[] = [];
    additionalRoyalStatueLevels: number[] = [];
    totalResourceGrade = 0;
    totalOutpostUpgradeLevels = 0;
    purifiedOutpostCount = 0;
    resourceQuantityLogTotal = 0;
    builtOutpostCount = 0;
    resourceCollectionBonuses = emptyCollectionBonuses;
    rankExperienceBonuses = emptyRankExperienceBonuses;
    readonly productionBonuses = { savageCollectionMultiplier: 0 };
    readonly totalResourceProduction = new Map<number, number>();
    private selectedExperienceRank = OutpostRank.Trading;
    selectedRoyalGuardian: RoyalGuardianContribution | undefined;
    // The saved Outpost category weights cost reduction for the first three Master Classes.
    private selectedOutpostBonusIndex = 0;
    private totalUpgradeLevels = 0;
    private unlockedUpgradeCount = 0;
    private orbletsOwned = 0;
    private extraClearKills = 1;
    private companionParchmentBonus = 0;
    private jellyParchmentBonus = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "RoyalG", perPlayer: false, default: [] },
            { key: "RoyalMaps", perPlayer: false, default: [] },
        ];
    }

    private resetResources(): void {
        this.resources = new Map();
        for (const upgrade of this.upgrades) {
            const resourceType = upgrade.getPurchaseResourceType();
            if (resourceType !== undefined && !this.resources.has(resourceType)) {
                this.resources.set(resourceType, new RoyalResource(resourceType, 0));
            }
        }
    }

    private resetCalculatedState(): void {
        this.totalResourceGrade = this.totalOutpostUpgradeLevels = this.purifiedOutpostCount = 0;
        this.resourceQuantityLogTotal = this.builtOutpostCount = 0;
        this.resourceCollectionBonuses = emptyCollectionBonuses;
        this.rankExperienceBonuses = emptyRankExperienceBonuses;
        this.productionBonuses.savageCollectionMultiplier = 0;
        this.totalResourceProduction.clear();
        this.selectedExperienceRank = OutpostRank.Trading;
        this.selectedRoyalGuardian = undefined;
        this.selectedOutpostBonusIndex = 0;
        this.totalUpgradeLevels = this.unlockedUpgradeCount = this.orbletsOwned = 0;
        this.extraClearKills = 1;
        this.companionParchmentBonus = this.jellyParchmentBonus = 0;
    }

    private appendMissingEligibleMapSources(): void {
        // Static map metadata keeps the eligible catalogue available without saved RoyalMaps rows.
        for (let mapId = 0; mapId < MapInfo.length; mapId++) {
            if (this.mapStates.has(mapId) || !RoyalMapSource.isOutpostEligible(mapId)) continue;

            const map = new RoyalMapSource(mapId);
            map.updateRanks();
            this.mapStates.set(mapId, map);
        }
    }

    init(allItems: Item[], _charCount: number) {
        this.resetCalculatedState();
        this.mapStates = new Map();
        this.appendMissingEligibleMapSources();
        this.units.reset();
        this.resourceNodes.parse([]);
        this.additionalRoyalStatueLevels = [];
        const statueDefinitions = initRoyalStatueRepo();
        const statueMaterials = new Map<string, Item>();
        for (const definition of statueDefinitions) {
            for (const name of [definition.data.unlockItem, definition.data.upgradeItem]) {
                if (!statueMaterials.has(name)) {
                    statueMaterials.set(name, allItems.find(item => item.internalName === name)!);
                }
            }
        }
        this.statues = RoyalStatue.fromBase(statueDefinitions, statueMaterials);
        this.upgrades = RoyalArmoryUpgrade.fromBase(initRoyalArmoryUpgradeRepo());
        this.resetResources();
        this.orbletMarketBonuses = RoyalArmoryOrbletMarketBonus.fromBase(initOrbletMarketBonusRepo());
        return this;
    }

    parse(data: Map<string, unknown>): void {
        const armory = data.get(this.getDataKey()) as RoyalArmory;
        const royalG = data.get("RoyalG") as readonly (readonly unknown[])[];
        const royalMaps = data.get("RoyalMaps") as readonly (readonly unknown[] | null | undefined)[];
        armory.resetCalculatedState();
        const statueLevels = royalG[0] ?? [];
        armory.statues.forEach(statue => statue.parse(statueLevels[statue.index]));
        // Retain extra saved levels without inventing catalog definitions for them.
        armory.additionalRoyalStatueLevels = statueLevels.slice(armory.statues.length).map(level => Number(level) || 0);
        armory.mapStates = new Map();
        royalMaps.forEach((row, mapId) => {
            if (row === undefined || row === null) return;
            const map = row.length < 3 ? new RoyalMapSource(mapId) : new Outpost(mapId);
            map.parse(row);
            armory.mapStates.set(mapId, map);
        });
        armory.appendMissingEligibleMapSources();
        armory.units.parse(royalG);
        armory.selectedExperienceRank = royalArmoryAsNumber(royalG[3]?.[7]);
        armory.selectedOutpostBonusIndex = Number(royalG[3]?.[2] ?? 0);
        armory.resetResources();
        royalG[1]?.forEach((quantity, resourceType) => {
            const resource = armory.resources.get(resourceType) ?? new RoyalResource(resourceType, 0);
            resource.parse(quantity);
            armory.resources.set(resourceType, resource);
        });
        armory.resourceNodes.parse(royalG[5] ?? [], royalG[4] ?? []);
        armory.upgrades.forEach(upgrade => upgrade.parse(royalG[2]?.[upgrade.index]));
        armory.orbletMarketBonuses.forEach(bonus => bonus.parse((royalG[23]?.[bonus.index] ?? 0) as number));
    }

    updateMapPurificationStates(): void {
        for (const map of this.mapStates.values()) map.updatePurification();
    }

    updateOutpostExperienceRanks(): void {
        for (const map of this.mapStates.values()) map.updateRanks();
    }

    updateOutpostUnits(): void {
        for (const map of this.mapStates.values()) {
            map.units.prepare(map.getRankProgress(OutpostRank.Command).level, map.isOutpost() ? map.glorificationLevel : 0);
        }
        for (const unit of this.units.roster) this.mapStates.get(unit.stationedMapId)?.units.addMovableUnit(unit.role);
    }

    getSelectedOutpostBonusIndex(): number { return this.selectedOutpostBonusIndex; }

    getMineheadCurrencyOutpostMultiplier(): number {
        if (this.selectedOutpostBonusIndex !== 3) return 1;
        const outpostCount = Math.max(1, this.builtOutpostCount - 6);
        return 1 + 4 * outpostCount / (40 + outpostCount);
    }

    getResearchExpOutpostReward(): {
        multiplier: number; available: boolean; selected: boolean; builtOutpostCount: number; selectorName: string;
    } {
        const selector = this.upgrades.find(upgrade => upgrade.index === 79)!;
        return {
            multiplier: this.getResearchExpOutpostPreviewMultiplier(),
            available: selector.isUnlocked(),
            selected: this.selectedOutpostBonusIndex === 1,
            builtOutpostCount: this.builtOutpostCount,
            selectorName: selector.data.name,
        };
    }

    private getResearchExpOutpostPreviewMultiplier(): number {
        const additionalOutposts = Math.max(1, this.builtOutpostCount - 6);
        return 1 + (additionalOutposts / (40 + additionalOutposts)) * 2;
    }

    getResearchExpOutpostMultiplier(): number {
        if (this.selectedOutpostBonusIndex !== 1) return 1;

        return this.getResearchExpOutpostPreviewMultiplier();
    }

    getSpelunkingRechargeOutpostMultiplier(): number {
        if (this.selectedOutpostBonusIndex !== 2) return 1;

        // The selected recharge Outpost uses the built-count scale without Research's doubled effect.
        const additionalOutposts = Math.max(1, this.builtOutpostCount - 6);
        return 1 + additionalOutposts / (40 + additionalOutposts);
    }
    getTotalUpgradeLevels(): number { return this.totalUpgradeLevels; }
    getUnlockedUpgradeCount(): number { return this.unlockedUpgradeCount; }

    updateUpgradeUnlocks(): void {
        this.totalUpgradeLevels = 0;
        // Hidden catalog upgrades also count toward account progression.
        for (const upgrade of this.upgrades) this.totalUpgradeLevels += upgrade.level;
        this.unlockedUpgradeCount = 0;
        // Display requirements form the capped unlock ladder, not catalog IDs.
        for (const upgrade of this.upgrades) {
            if (upgrade.displayIndex !== undefined && upgrade.data.requiredUpgrades !== undefined
                && this.totalUpgradeLevels >= upgrade.data.requiredUpgrades) this.unlockedUpgradeCount++;
        }
        for (const upgrade of this.upgrades) upgrade.updateUnlock(this.unlockedUpgradeCount);
    }

    getUpgradeByIndex(catalogIndex: number): RoyalArmoryUpgrade | undefined {
        return this.upgrades.find(upgrade => upgrade.index === catalogIndex);
    }

    getResource(type: number): RoyalResource | undefined { return this.resources.get(type); }

    canPurchaseUpgrade(upgrade: RoyalArmoryUpgrade): boolean {
        const resourceType = upgrade.getPurchaseResourceType();
        return resourceType !== undefined && upgrade.isUnlocked() && !upgrade.isMaxLevel()
            && (this.getResource(resourceType)?.quantity ?? 0) >= upgrade.getCost();
    }

    getUpgradeBonus(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index === index)?.getBonus() ?? 0;
    }

    getUnlockedOutpostWorldCount(): number {
        // RoyalG / MapWorldsUnlocked: preserve the game's nested addition order.
        return Math.round(1 + (this.getUpgradeBonus(2) +
            (this.getUpgradeBonus(3) +
                (this.getUpgradeBonus(4) +
                    (this.getUpgradeBonus(5) +
                        (this.getUpgradeBonus(6) + (this.getUpgradeBonus(7) + this.getUpgradeBonus(8))))))));
    }

    getOutpostWorldUnlock(worldIndex: number): RoyalOutpostWorldUnlock {
        return {
            unlocked: worldIndex < this.getUnlockedOutpostWorldCount(),
            upgrade: worldIndex === 0 ? undefined : this.getUpgradeByIndex(worldIndex + 1),
        };
    }

    getOrbletMarketBonus(index: number): number {
        return this.orbletMarketBonuses.find(bonus => bonus.index === index)!.getBonus();
    }

    getOrbletsOwned(): number { return this.orbletsOwned; }
    updateOrbletsOwned(orbletsOwned: number): void { this.orbletsOwned = orbletsOwned; }

    updateParchmentDropInputs(companionBonus: number, jellyBonus: number): void {
        this.companionParchmentBonus = companionBonus;
        this.jellyParchmentBonus = jellyBonus;
    }

    getParchmentDropChance(): number {
        // The game keeps the base probability before the parchment upgrade.
        if (this.getUpgradeBonus(37) < 1) return 0.001;

        return 0.001 * (1 + (this.getUpgradeBonus(38) +
            (this.getOrbletMarketBonus(9) + (this.companionParchmentBonus + this.jellyParchmentBonus))) / 100);
    }

    getRoyalCastleMaximumDamage(): number {
        return (10 + this.getUpgradeBonus(35)) * (1 + this.getUpgradeBonus(36) / 100);
    }

    updateExtraClearKills(players: Player[], bigFish: BigFish, jellyOperator: JellyOperator): void {
        const maxTalent231 = players.reduce((maximum, player) => Math.max(maximum, player.getTalentBonus(231)), 0);
        this.extraClearKills =
            Math.max(1, maxTalent231) *
            (1 + (this.getOrbletMarketBonus(3) + bigFish.getBonusFromIndex(6)) / 100) *
            (1 + jellyOperator.obstructions.find(obstruction => obstruction.index === 2)!.getBonus() / 100);
    }

    getExtraClearKills(): number { return this.extraClearKills; }

    getTotalRoyalStatueLevels(): number {
        const catalogTotal = this.statues.reduce((total, statue) => total + Math.max(0, statue.level), 0);
        return this.additionalRoyalStatueLevels.reduce((total, level) => total + Math.max(0, level), catalogTotal);
    }

    updateStatueBonusInputs(): void {
        const reverenceBonus = this.getUpgradeByIndex(45)!.getBonus();
        for (const statue of this.statues) statue.updateBonusInput(reverenceBonus);
    }

    updateStatueMaterialInputs(storage: Storage): void {
        const parchmentOwned = storage.amountInStorage(this.statues[0].enchantmentMaterial.internalName);
        for (const statue of this.statues) {
            statue.updateMaterialInputs(storage.amountInStorage(statue.restorationMaterial.internalName), parchmentOwned);
        }
    }

    updateTotals(): void {
        this.resourceNodes.prepareTotalResourceGrade();
        this.totalResourceGrade = this.resourceNodes.totalResourceGrade;
        this.totalOutpostUpgradeLevels = this.purifiedOutpostCount = this.builtOutpostCount = 0;
        for (const map of this.mapStates.values()) {
            if (!map.isOutpost()) continue;
            this.totalOutpostUpgradeLevels += map.expandedBarracksLevel
                + (map.advancedLogisticsLevel + map.greaterEducationLevel);
            if (map.getRankProgress(OutpostRank.Purity).level >= 1) this.purifiedOutpostCount++;
            this.builtOutpostCount++;
        }
        this.resourceQuantityLogTotal = 0;
        for (let index = 0; index < 8; index++) this.resourceQuantityLogTotal += lavaLog(this.getResource(10 * index)?.quantity ?? 0);
    }

    updateOutpostResourceRateEarlyInputs(sushiCollectionBonus: number, zenithCollectionBonus: number, supportJellyBonus: number): void {
        for (const map of this.mapStates.values()) map.totalSupports = this.getTotalSupports(map.mapId);
        this.selectedRoyalGuardian = undefined;
        this.resourceCollectionBonuses = {
            orbletCollectionBonus: this.getOrbletMarketBonus(1), sushiCollectionBonus, zenithCollectionBonus,
            purificationBonus: 200 + this.getUpgradeBonus(1),
            supportCollectionBonus: 200 * (1 + this.getUpgradeBonus(43) / 100) + supportJellyBonus,
            resourceGradeBonus: this.getUpgradeBonus(18), outpostUpgradeBonus: this.getUpgradeBonus(50),
            purifiedOutpostBonus: this.getUpgradeBonus(51), guardianLevelBonus: this.getUpgradeBonus(52),
            stockpileBonus: this.getUpgradeBonus(53), armoryCollectionBonus: this.getUpgradeBonus(70),
            commandRankBonus: this.getUpgradeBonus(73), totalResourceGrade: this.totalResourceGrade,
            totalOutpostUpgradeLevels: this.totalOutpostUpgradeLevels, purifiedOutpostCount: this.purifiedOutpostCount,
            resourceQuantityLogTotal: this.resourceQuantityLogTotal, workerCollectionBonus: this.units.getRole(RoyalUnitRole.Worker).effect,
        };
    }

    updateOutpostResourceRateLateInputs(players: Player[], companionCollectionBonus: number, arcadeCollectionBonus: number, alchemy: Alchemy): void {
        let collectionTalentBonus = players[0]?.getTalentBonus(225) ?? 0;
        let guardianTalentBonus = players[0]?.getTalentBonus(226) ?? 0;
        let collectionTalentMultiplier = players[0]?.getTalentBonus(230) ?? 0;
        for (let index = 1; index < players.length; index++) {
            collectionTalentBonus = Math.max(collectionTalentBonus, players[index].getTalentBonus(225));
            guardianTalentBonus = Math.max(guardianTalentBonus, players[index].getTalentBonus(226));
            collectionTalentMultiplier = Math.max(collectionTalentMultiplier, players[index].getTalentBonus(230));
        }
        // The three talents use independent account maxima, not just the selected Guardian.
        this.resourceCollectionBonuses = { ...this.resourceCollectionBonuses, guardianBonuses: {
            companionCollectionBonus, arcadeCollectionBonus, collectionTalentBonus, guardianTalentBonus, collectionTalentMultiplier,
        } };
        this.selectedRoyalGuardian = undefined;
        let bestRate = -Infinity;
        const comparisonMap = this.mapStates.values().next().value as RoyalMapSource | undefined;
        if (!comparisonMap) return;
        // Map multipliers are shared, so the same map compares each Guardian's actual contribution.
        for (const player of players) {
            if (player.classId !== ClassIndex.Royal_Guardian) continue;
            const contribution = getRoyalGuardianContribution(player, alchemy);
            const rate = comparisonMap.getResourceCollectionRate(this.resourceCollectionBonuses, contribution);
            if (rate > bestRate) {
                bestRate = rate;
                this.selectedRoyalGuardian = contribution;
            }
        }
    }

    getOutpostResourceRate(mapIndex: number): number {
        const map = this.mapStates.get(mapIndex | 0);
        return map && this.selectedRoyalGuardian
            ? map.getResourceCollectionRate(this.resourceCollectionBonuses, this.selectedRoyalGuardian) : 0;
    }

    updateOutpostRankExperience(spelunking: Spelunking, jellyExperienceBonus: number): void {
        const purityUpgrade = spelunking.upgrades.find(upgrade => upgrade.index === 65);
        this.rankExperienceBonuses = {
            orbletExperienceBonus: this.getOrbletMarketBonus(6),
            purityExperienceBonus: purityUpgrade?.unlocked ? spelunking.getUpgradeBonus(65) : 0,
            selectedRankExperienceBonus: spelunking.getUpgradeBonus(77),
            selectedRank: this.selectedExperienceRank,
            rankEffects: {
                [OutpostRank.Trading]: this.units.getRole(RoyalUnitRole.Trader).effect,
                [OutpostRank.Intel]: this.units.getRole(RoyalUnitRole.Surveyor).effect,
                [OutpostRank.Command]: this.units.getRole(RoyalUnitRole.Commander).effect,
                [OutpostRank.Military]: this.units.getRole(RoyalUnitRole.Knight).effect,
                [OutpostRank.Purity]: this.units.getRole(RoyalUnitRole.Priest).effect,
            },
            // The game looks up purification using the rank type, not the receiving map.
            purifiedRanks: {
                [OutpostRank.Trading]: this.mapStates.get(OutpostRank.Trading)?.purified ?? false,
                [OutpostRank.Intel]: this.mapStates.get(OutpostRank.Intel)?.purified ?? false,
                [OutpostRank.Command]: this.mapStates.get(OutpostRank.Command)?.purified ?? false,
                [OutpostRank.Military]: this.mapStates.get(OutpostRank.Military)?.purified ?? false,
                [OutpostRank.Purity]: this.mapStates.get(OutpostRank.Purity)?.purified ?? false,
            },
            intelRankBonus: this.getUpgradeBonus(72),
            supportExperienceBonus: this.resourceCollectionBonuses.supportCollectionBonus,
            jellyExperienceBonus,
            militiaExperienceEnabled: this.getUpgradeBonus(17) >= 1,
        };
        for (const map of this.mapStates.values()) {
            map.updateRankExperienceMultipliers(this.rankExperienceBonuses);
            for (const rank of OUTPOST_RANKS) map.getRankProgress(rank).experiencePerHour = 0;
            if (map.outpostEligible && map.isOutpost()) {
                map.getRankProgress(OutpostRank.Trading).experiencePerHour =
                    map.getRankExperienceMultiplier(OutpostRank.Trading) * map.units.getTotalCount(RoyalUnitRole.Trader);
                map.getRankProgress(OutpostRank.Intel).experiencePerHour =
                    map.getRankExperienceMultiplier(OutpostRank.Intel) * map.units.getTotalCount(RoyalUnitRole.Surveyor);
            }
        }
        for (const unit of this.units.roster) {
            const map = this.mapStates.get(unit.stationedMapId);
            if (!map) continue;
            // Movable roles add XP per placement without the stationary outpost eligibility guard.
            if (unit.role >= RoyalUnitRole.Commander) {
                const rank = (unit.role - 3) as OutpostRank;
                map.getRankProgress(rank).experiencePerHour += map.getRankExperienceMultiplier(rank);
            } else if (this.rankExperienceBonuses.militiaExperienceEnabled && map.isOutpost()) {
                let selectedRank = OutpostRank.Trading;
                let highestLevel = -1;
                for (const rank of OUTPOST_RANKS) {
                    const level = map.getRankProgress(rank).level;
                    if (level > highestLevel) {
                        highestLevel = level;
                        selectedRank = rank;
                    }
                }
                map.getRankProgress(selectedRank).experiencePerHour += map.getRankExperienceMultiplier(OutpostRank.Military) / 2;
            }
        }
    }

    updateOutpostProduction(): void {
        this.totalResourceProduction.clear();
        for (const map of this.mapStates.values()) {
            if (!map.isOutpost()) continue;
            map.updateLinks(this.resourceNodes, this.mapStates, this.getOutpostResourceRate(map.mapId),
                this.productionBonuses.savageCollectionMultiplier);
            for (const details of map.linkDetails) {
                if (!(details.target instanceof RoyalResourceNode) || details.productionPerHour === 0) continue;
                const materialId = details.target.resourceType;
                this.totalResourceProduction.set(materialId,
                    (this.totalResourceProduction.get(materialId) ?? 0) + details.productionPerHour);
            }
        }
    }

    getTotalSupports(mapIndex: number): number {
        let supports = 0;
        const mapKey = String(mapIndex);
        for (const map of this.mapStates.values()) {
            if (!map.isOutpost()) continue;
            // Each link counts, including two slots supporting the same map.
            for (const connection of map.connections) {
                if (connection?.kind === "support" && String(connection.mapId) === mapKey) supports++;
            }
        }
        return supports;
    }

    updateOutpostUnusedPoints(jellyOperator: JellyOperator): void {
        // Worlds 7 and 8 share Jelly 61; the Armory point upgrade remains world-specific.
        const jellyByWorld = [3, 15, 32, 43, 48, 52, 61, 61];
        const tradingUpgradeBonus = this.getUpgradeBonus(71);
        for (const map of this.mapStates.values()) {
            if (!map.isOutpost()) continue;
            const world = Math.floor(map.mapId / 50);
            const jellyBonus = jellyOperator.obstructions.find(obstruction => obstruction.index === jellyByWorld[Math.min(7, world)])!.getBonus();
            map.updateUnusedPoints(jellyBonus, this.getUpgradeBonus(9 + world), tradingUpgradeBonus);
        }
    }
}

export const updateRoyalArmory = (accountData: Map<string, unknown>) => {
    const armory = accountData.get("royalArmory") as RoyalArmory;
    armory.updateUpgradeUnlocks();
    armory.updateStatueBonusInputs();
    armory.updateOutpostExperienceRanks();
    armory.updateMapPurificationStates();
    armory.updateOutpostUnits();
    armory.orbletMarketBonuses.forEach(bonus => bonus.updateBonus());
    armory.units.prepareEffects(index => armory.getUpgradeBonus(index));
    const orbletRangeBonus = armory.getOrbletMarketBonus(8);
    const guardRangeBonus = armory.units.getRole(RoyalUnitRole.Guard).effect;
    const militaryRankRangeBonus = armory.getUpgradeBonus(74);
    for (const map of armory.mapStates.values()) {
        if (map.isOutpost()) map.updateConnectionRange(orbletRangeBonus, guardRangeBonus, militaryRankRangeBonus);
    }
    armory.updateTotals();
    const jellyOperator = accountData.get("jellyOperator") as JellyOperator;
    const sushi = accountData.get("sushi") as { getBonusFromIndex(index: number): number };
    const zenithMarket = accountData.get("zenithMarket") as { getBonusForId(index: number): number };
    armory.updateOutpostResourceRateEarlyInputs(sushi.getBonusFromIndex(60), zenithMarket.getBonusForId(10),
        jellyOperator.obstructions.find(obstruction => obstruction.index === 41)!.getBonus());
    armory.updateOutpostRankExperience(accountData.get("spelunking") as Spelunking,
        jellyOperator.obstructions.find(obstruction => obstruction.index === 1)!.getBonus());
    armory.productionBonuses.savageCollectionMultiplier = 5 * (1 + armory.getUpgradeBonus(69) / 100);
    armory.updateOutpostProduction();
};

export const updateRoyalArmoryLateInputs = (accountData: Map<string, unknown>) => {
    const armory = accountData.get("royalArmory") as RoyalArmory;
    const players = accountData.get("players") as Player[];
    const alchemy = accountData.get("alchemy") as Alchemy;
    const arcade = accountData.get("arcade") as Arcade;
    const storage = accountData.get("storage") as Storage;
    const jellyOperator = accountData.get("jellyOperator") as JellyOperator;
    armory.updateOrbletsOwned(storage.amountInStorage("Orblet"));
    armory.updateStatueMaterialInputs(storage);
    armory.updateParchmentDropInputs(getCompanionActiveBonus(accountData.get("companions") as Companion[], 172),
        jellyOperator.obstructions.find(obstruction => obstruction.index === 40)!.getBonus());
    armory.updateExtraClearKills(players, accountData.get("bigFish") as BigFish, jellyOperator);
    armory.units.prepareMilitiaEffect(armory.getUpgradeBonus(23), armory.getExtraClearKills());
    armory.updateOutpostResourceRateLateInputs(players, getCompanionActiveBonus(accountData.get("companions") as Companion[], 141),
        arcade.bonuses.find(bonus => bonus.index === 70)!.getBonus(), alchemy);
    armory.updateOutpostProduction();
    armory.updateOutpostUnusedPoints(jellyOperator);
    const masterClasses = accountData.get("masterClasses") as MasterClasses;
    const masterClassCostMultiplier = masterClasses.getUpgradeCostMultiplier();
    const jellyObstruction11Bonus = jellyOperator.obstructions.find(obstruction => obstruction.index === 11)!.getBonus();
    const jellyObstruction26Bonus = jellyOperator.obstructions.find(obstruction => obstruction.index === 26)!.getBonus();
    for (const upgrade of armory.upgrades) upgrade.updateCostInputs(masterClassCostMultiplier, jellyObstruction11Bonus, jellyObstruction26Bonus);
    return armory;
};
