import { royalArmoryAsNumber } from "./resourceNodes";
import { OutpostUnits, RoyalUnitRole } from "./units";

export enum OutpostRank {
    Trading = 0,
    Intel = 1,
    Command = 2,
    Military = 3,
    Purity = 4,
}

export const OUTPOST_RANKS = [
    OutpostRank.Trading, OutpostRank.Intel, OutpostRank.Command, OutpostRank.Military, OutpostRank.Purity,
] as const;

export class OutpostRankProgress {
    totalXP = 0;
    level = 0;
    currentXP = 0;
    requiredXP = 0;
    previousThreshold = 0;
    nextThreshold = 0;

    constructor(readonly rankType: OutpostRank) {}

    parse(totalXP: unknown): void {
        this.totalXP = royalArmoryAsNumber(totalXP);
        this.level = this.currentXP = this.requiredXP = this.previousThreshold = this.nextThreshold = 0;
    }

    static getExperienceThreshold(level: number, rank: OutpostRank): number {
        if (rank === OutpostRank.Purity) return 100000 * Math.pow(10, level);
        if (rank === OutpostRank.Command) return (50 + 50 * level) * Math.pow(1.8, level);
        return (10 + 5 * level) * Math.pow(1.3, level);
    }

    update(): void {
        this.level = 0;
        while (this.totalXP >= OutpostRankProgress.getExperienceThreshold(this.level, this.rankType)) this.level++;
        this.previousThreshold = this.level === 0 ? 0
            : OutpostRankProgress.getExperienceThreshold(this.level - 1, this.rankType);
        this.nextThreshold = OutpostRankProgress.getExperienceThreshold(this.level, this.rankType);
        this.currentXP = this.totalXP - this.previousThreshold;
        this.requiredXP = this.nextThreshold - this.previousThreshold;
    }
}

export type RoyalGuardianContribution = Readonly<{ playerID: number; level: number; w14Bonus: number }>;
export type RoyalGuardianAccountBonuses = Readonly<{
    companionCollectionBonus: number;
    arcadeCollectionBonus: number;
    collectionTalentBonus: number;
    guardianTalentBonus: number;
    collectionTalentMultiplier: number;
}>;
export type ResourceCollectionBonuses = Readonly<{
    orbletCollectionBonus: number;
    sushiCollectionBonus: number;
    zenithCollectionBonus: number;
    purificationBonus: number;
    supportCollectionBonus: number;
    resourceGradeBonus: number;
    outpostUpgradeBonus: number;
    purifiedOutpostBonus: number;
    guardianLevelBonus: number;
    stockpileBonus: number;
    armoryCollectionBonus: number;
    commandRankBonus: number;
    totalResourceGrade: number;
    totalOutpostUpgradeLevels: number;
    purifiedOutpostCount: number;
    resourceQuantityLogTotal: number;
    workerCollectionBonus: number;
    guardianBonuses?: RoyalGuardianAccountBonuses;
}>;

export class RoyalMapSource {
    private readonly ranks: Record<OutpostRank, OutpostRankProgress> = {
        [OutpostRank.Trading]: new OutpostRankProgress(OutpostRank.Trading),
        [OutpostRank.Intel]: new OutpostRankProgress(OutpostRank.Intel),
        [OutpostRank.Command]: new OutpostRankProgress(OutpostRank.Command),
        [OutpostRank.Military]: new OutpostRankProgress(OutpostRank.Military),
        [OutpostRank.Purity]: new OutpostRankProgress(OutpostRank.Purity),
    };
    readonly units = new OutpostUnits();
    protected mapLevel = 0;
    protected outpostLevel = 0;
    private hasPurityProgress = false;
    purified = false;
    totalSupports = 0;

    constructor(readonly mapId: number) {}

    get clearedMonsters(): number {
        return this.isOutpost() ? 0 : this.mapLevel;
    }

    parse(savedRow: readonly unknown[]): void {
        this.mapLevel = royalArmoryAsNumber(savedRow[0]);
        this.outpostLevel = royalArmoryAsNumber(savedRow[1]);
        // A one-field clearing row does not yet have outpost progress.
        this.hasPurityProgress = savedRow.length >= 2;
        this.purified = false;
        this.totalSupports = 0;
        for (const rank of OUTPOST_RANKS) this.ranks[rank].parse(savedRow[3 + rank]);
        this.units.parse(savedRow);
    }

    isOutpost(): this is Outpost {
        return this instanceof Outpost;
    }

    getRankProgress(rank: OutpostRank): OutpostRankProgress {
        return this.ranks[rank];
    }

    updateRanks(): void {
        for (const rank of OUTPOST_RANKS) this.ranks[rank].update();
    }

    updatePurification(): void {
        this.purified = this.hasPurityProgress && Math.min(this.ranks[OutpostRank.Purity].level, 1) === 1;
    }

    getResourceCollectionRate(bonuses: ResourceCollectionBonuses, guardian: RoyalGuardianContribution): number {
        const late = bonuses.guardianBonuses;
        // Collection depends on the late account talent and character inputs.
        if (!late) return 0;
        return (
            125 *
            (1 + late.companionCollectionBonus) *
            (1 +
                (bonuses.orbletCollectionBonus +
                    (bonuses.sushiCollectionBonus +
                        (Math.min(50, guardian.w14Bonus) + (late.arcadeCollectionBonus + bonuses.armoryCollectionBonus)))) /
                100) *
            (1 + (bonuses.purificationBonus * Number(this.purified)) / 100) *
            (1 + (bonuses.supportCollectionBonus * this.totalSupports) / 100) *
            (1 + (5 * this.outpostLevel) / 100) *
            (1 + (this.ranks[OutpostRank.Command].level * bonuses.commandRankBonus) / 100) *
            (1 + (bonuses.totalResourceGrade * bonuses.resourceGradeBonus) / 100) *
            (1 + (bonuses.totalOutpostUpgradeLevels * bonuses.outpostUpgradeBonus) / 100) *
            (1 + (bonuses.purifiedOutpostCount * bonuses.purifiedOutpostBonus) / 100) *
            (1 +
                (Math.floor(Math.max(0, guardian.level - 1000) / 100) * bonuses.guardianLevelBonus) / 100) *
            (1 + (bonuses.workerCollectionBonus * this.units.getTotalCount(RoyalUnitRole.Worker)) / 100) *
            (1 + (late.collectionTalentBonus + late.guardianTalentBonus) / 100) *
            Math.max(1, late.collectionTalentMultiplier) *
            (1 + (bonuses.resourceQuantityLogTotal * bonuses.stockpileBonus) / 100) *
            (1 + bonuses.zenithCollectionBonus / 100) *
            Math.min(5, 1 + (10 * Math.max(0, Math.round(this.mapLevel - 5))) / 100)
        );
    }
}

export enum OutpostKind {
    ResourceDepot = 0,
    SupportCamp = 1,
    SavageStronghold = 2,
}

export type OutpostConnection = Readonly<
    { kind: "resource"; resourceId: number } | { kind: "support"; mapId: number }
>;

export class Outpost extends RoyalMapSource {
    get expandedBarracksLevel(): number { return this.mapLevel; }
    get advancedLogisticsLevel(): number { return this.outpostLevel; }
    greaterEducationLevel = 0;
    kind = OutpostKind.ResourceDepot;
    glorified = false;
    glorificationLevel = 0;
    connectionRange = 0;
    connections: readonly [OutpostConnection | undefined, OutpostConnection | undefined] = [undefined, undefined];
    private hasTradingProgress = false;
    private unusedPoints = 0;

    parse(savedRow: readonly unknown[]): void {
        super.parse(savedRow);
        this.greaterEducationLevel = royalArmoryAsNumber(savedRow[2]);
        this.glorificationLevel = royalArmoryAsNumber(savedRow[12]);
        this.glorified = this.glorificationLevel >= 1;
        this.hasTradingProgress = savedRow.length > 3;
        this.unusedPoints = 0;
        this.connectionRange = 0;
        this.kind = royalArmoryAsNumber(savedRow[10]);
        const connections: [OutpostConnection | undefined, OutpostConnection | undefined] = [undefined, undefined];
        for (let slot = 0; slot < 2; slot++) {
            const target = royalArmoryAsNumber(savedRow[8 + slot]);
            // Empty slots are -1; support links store 1000 + map ID.
            if (target === -1 || savedRow[8 + slot] === undefined || savedRow[8 + slot] === null) continue;
            connections[slot] = this.kind === OutpostKind.SupportCamp
                ? { kind: "support", mapId: Math.round(target - 1000) }
                : { kind: "resource", resourceId: Math.round(target) };
        }
        this.connections = connections;
    }

    updateConnectionRange(orbletRangeBonus: number, guardRangeBonus: number, militaryRankRangeBonus: number): void {
        // Logistics adds diminishing range; Guards and Military ranks extend that same reach.
        this.connectionRange = Math.floor(Math.min(999,
            80 + orbletRangeBonus +
            (250 * (this.advancedLogisticsLevel / (this.advancedLogisticsLevel + 100)) +
                (guardRangeBonus * this.units.getTotalCount(RoyalUnitRole.Guard) +
                    this.getRankProgress(OutpostRank.Military).level * militaryRankRangeBonus)),
        ));
    }

    updateUnusedPoints(jellyBonus: number, worldUpgradeBonus: number, tradingUpgradeBonus: number): void {
        if (!this.hasTradingProgress) {
            this.unusedPoints = 0;
            return;
        }
        const tradingRank = this.getRankProgress(OutpostRank.Trading).level;
        let points = 2 + jellyBonus + (worldUpgradeBonus + tradingRank);
        if (tradingUpgradeBonus >= 1) points += Math.floor(tradingRank / (11 - tradingUpgradeBonus));
        if (this.glorified) points += 10;
        // Round after each purchase subtraction, not only the final total.
        points = Math.round(points - this.expandedBarracksLevel * 12);
        points = Math.round(points - this.advancedLogisticsLevel * 2);
        this.unusedPoints = Math.round(points - this.greaterEducationLevel);
    }

    getUnusedPoints(): number {
        return this.unusedPoints;
    }
}
