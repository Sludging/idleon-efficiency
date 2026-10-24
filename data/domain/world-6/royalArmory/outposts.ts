import { initMapMetadataRepo } from "../../data/MapMetadataRepo";
import { initRoyalGuardianMetadataRepo } from "../../data/RoyalGuardianMetadataRepo";
import { MapInfo } from "../../maps";
import { RoyalResourceNode, RoyalResourceNodes, royalArmoryAsNumber } from "./resourceNodes";
import { OutpostUnits, RoyalUnitRole } from "./units";

const nonAfkScreenDestinations = initMapMetadataRepo()[0].data.nonAfkScreenDestinations;
const outpostKillRequirementOverrides = initRoyalGuardianMetadataRepo()[0].data.outpostKillRequirementOverrides;
const emptyLinkAlternatives: readonly RoyalResourceNode[] = [];

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
    experiencePerHour = 0;

    constructor(readonly rankType: OutpostRank) {}

    parse(totalXP: unknown): void {
        this.totalXP = royalArmoryAsNumber(totalXP);
        this.level = this.currentXP = this.requiredXP = this.previousThreshold = this.nextThreshold = 0;
        this.experiencePerHour = 0;
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

    getHoursToNextRank(): number {
        return this.experiencePerHour > 0 ? (this.nextThreshold - this.totalXP) / this.experiencePerHour : Infinity;
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

export type RankExperienceBonuses = Readonly<{
    orbletExperienceBonus: number;
    purityExperienceBonus: number;
    selectedRankExperienceBonus: number;
    selectedRank: OutpostRank;
    rankEffects: Readonly<Record<OutpostRank, number>>;
    purifiedRanks: Readonly<Record<OutpostRank, boolean>>;
    intelRankBonus: number;
    supportExperienceBonus: number;
    jellyExperienceBonus: number;
    militiaExperienceEnabled: boolean;
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
    protected hasTradingProgress = false;
    private readonly rankExperienceMultipliers: Record<OutpostRank, number> = {
        [OutpostRank.Trading]: 0, [OutpostRank.Intel]: 0, [OutpostRank.Command]: 0,
        [OutpostRank.Military]: 0, [OutpostRank.Purity]: 0,
    };
    purified = false;
    totalSupports = 0;

    constructor(readonly mapId: number) {}

    get worldIndex(): number { return Math.floor(this.mapId / 50); }

    get requiredOutpostKills(): number | undefined {
        const mapKey = String(this.mapId);
        if (Object.prototype.hasOwnProperty.call(outpostKillRequirementOverrides, mapKey)) {
            return outpostKillRequirementOverrides[mapKey];
        }
        // MapDetails[map][0][0] is the first portal requirement, not monster count.
        const portalRequirement = MapInfo[this.mapId]?.data.portalRequirements[0];
        if (portalRequirement === undefined) return undefined;
        const world = this.worldIndex;
        return 3 * (25 + 5 * this.mapId +
            portalRequirement *
                Math.pow(1.3 - 0.01 * world, 0.2 * (this.mapId - 50 * world)) *
                Math.pow(4, world) *
                (1 + 29 * Math.min(1, world)));
    }

    get clearedMonsters(): number {
        return this.isOutpost() ? 0 : this.mapLevel;
    }

    static isOutpostEligible(mapId: number): boolean {
        const metadata = MapInfo[mapId]?.data;
        return metadata !== undefined && mapId % 50 !== 0
            && mapId !== 120 && mapId !== 216 && mapId !== 306
            && mapId !== 41 && mapId !== 39 && mapId !== 43
            && mapId !== 8 && mapId !== 9
            && !Object.prototype.hasOwnProperty.call(nonAfkScreenDestinations, String(mapId))
            && metadata.x !== 9999;
    }

    get outpostEligible(): boolean {
        return RoyalMapSource.isOutpostEligible(this.mapId);
    }

    parse(savedRow: readonly unknown[]): void {
        this.mapLevel = royalArmoryAsNumber(savedRow[0]);
        this.outpostLevel = royalArmoryAsNumber(savedRow[1]);
        // A one-field clearing row does not yet have outpost progress.
        this.hasPurityProgress = savedRow.length >= 2;
        this.hasTradingProgress = savedRow.length > 3;
        this.purified = false;
        this.totalSupports = 0;
        for (const rank of OUTPOST_RANKS) {
            this.ranks[rank].parse(savedRow[3 + rank]);
            this.rankExperienceMultipliers[rank] = 0;
        }
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

    getRankExperienceMultiplier(rank: OutpostRank): number {
        return this.rankExperienceMultipliers[rank];
    }

    updateRankExperienceMultipliers(bonuses: RankExperienceBonuses): void {
        let educationMultiplier = 1;
        if (this.isOutpost() && this.hasTradingProgress) {
            educationMultiplier += 10 * this.greaterEducationLevel / 100;
            if (this.glorified) educationMultiplier *= 2;
        }
        for (const rank of OUTPOST_RANKS) {
            let baseMultiplier = 1 + bonuses.orbletExperienceBonus / 100;
            if (rank === OutpostRank.Purity) baseMultiplier *= 1 + bonuses.purityExperienceBonus / 100;
            if (bonuses.selectedRankExperienceBonus >= 1 && rank === bonuses.selectedRank) {
                baseMultiplier *= 1 + bonuses.selectedRankExperienceBonus / 100;
            }
            this.rankExperienceMultipliers[rank] =
                (1 + bonuses.rankEffects[rank] / 100) * baseMultiplier *
                educationMultiplier *
                (1 + 200 * Number(bonuses.purifiedRanks[rank]) / 100) *
                (1 + this.ranks[OutpostRank.Intel].level * bonuses.intelRankBonus / 100) *
                (1 + bonuses.supportExperienceBonus * this.totalSupports / 100) *
                (1 + bonuses.jellyExperienceBonus / 100);
        }
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

export type OutpostLinkReason = "empty" | "available" | "source-ineligible" | "wrong-kind"
    | "unknown-target" | "wrong-world" | "hidden-target" | "out-of-range" | "exhausted";

export type OutpostLinkDetails = {
    connection: OutpostConnection | undefined;
    target: RoyalResourceNode | RoyalMapSource | undefined;
    eligible: boolean;
    reason: OutpostLinkReason;
    exhausted: boolean;
    productionPerHour: number;
    nodeRemovalPerHour: number;
    alternatives: readonly RoyalResourceNode[];
};

export class Outpost extends RoyalMapSource {
    get expandedBarracksLevel(): number { return this.mapLevel; }
    get advancedLogisticsLevel(): number { return this.outpostLevel; }
    greaterEducationLevel = 0;
    kind = OutpostKind.ResourceDepot;
    glorified = false;
    glorificationLevel = 0;
    connectionRange = 0;
    connections: readonly [OutpostConnection | undefined, OutpostConnection | undefined] = [undefined, undefined];
    productionPerHour = 0;
    readonly linkDetails: readonly [OutpostLinkDetails, OutpostLinkDetails] = [
        { connection: undefined, target: undefined, eligible: false, reason: "empty", exhausted: false,
            productionPerHour: 0, nodeRemovalPerHour: 0, alternatives: emptyLinkAlternatives },
        { connection: undefined, target: undefined, eligible: false, reason: "empty", exhausted: false,
            productionPerHour: 0, nodeRemovalPerHour: 0, alternatives: emptyLinkAlternatives },
    ];
    private resourceNodes: RoyalResourceNodes | undefined;
    private unusedPoints = 0;

    parse(savedRow: readonly unknown[]): void {
        super.parse(savedRow);
        this.greaterEducationLevel = royalArmoryAsNumber(savedRow[2]);
        this.glorificationLevel = royalArmoryAsNumber(savedRow[12]);
        this.glorified = this.glorificationLevel >= 1;
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
        this.productionPerHour = 0;
        this.resourceNodes = undefined;
        for (let slot = 0; slot < 2; slot++) {
            const details = this.linkDetails[slot];
            details.connection = connections[slot];
            details.target = undefined;
            details.eligible = details.exhausted = false;
            details.reason = connections[slot] ? "unknown-target" : "empty";
            details.productionPerHour = details.nodeRemovalPerHour = 0;
            details.alternatives = emptyLinkAlternatives;
        }
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

    // Saved support links use maintenance range; resource alternatives use static node selection constraints.
    getConnectionEligibility(connection: OutpostConnection): OutpostLinkReason {
        const source = MapInfo[this.mapId]?.data;
        if (!source) return "source-ineligible";
        if (connection.kind === "support") {
            if (this.kind !== OutpostKind.SupportCamp) return "wrong-kind";
            const target = MapInfo[connection.mapId]?.data;
            if (!target) return "unknown-target";
            const dx = source.x - target.x;
            const dy = source.y - target.y;
            return Math.sqrt(dx * dx + dy * dy) <= Math.floor(this.connectionRange) + 8
                ? "available" : "out-of-range";
        }
        if (this.kind !== OutpostKind.ResourceDepot && this.kind !== OutpostKind.SavageStronghold) return "wrong-kind";
        const node = this.resourceNodes?.getNode(connection.resourceId);
        if (!node) return "unknown-target";
        return this.getResourceConnectionEligibility(node, source.x, source.y);
    }

    private getResourceConnectionEligibility(node: RoyalResourceNode, sourceX: number, sourceY: number): OutpostLinkReason {
        if (node.world !== Math.floor(this.mapId / 50)) return "wrong-world";
        if (node.y + 26 >= 800) return "hidden-target";
        const dx = sourceX + 15 - (node.x + 28);
        const dy = sourceY + 13 - (node.y + 26);
        return Math.sqrt(dx * dx + dy * dy) <= Math.floor(this.connectionRange) + 15
            ? "available" : "out-of-range";
    }

    updateLinks(resourceNodes: RoyalResourceNodes, mapStates: ReadonlyMap<number, RoyalMapSource>,
        collectionRate: number, savageCollectionMultiplier: number): void {
        this.resourceNodes = resourceNodes;
        this.productionPerHour = 0;
        const collectorEligible = this.outpostEligible;
        let alternatives: readonly RoyalResourceNode[] | undefined;
        for (let slot = 0; slot < 2; slot++) {
            const details = this.linkDetails[slot];
            const connection = this.connections[slot];
            details.connection = connection;
            details.target = connection?.kind === "resource" ? resourceNodes.getNode(connection.resourceId)
                : connection?.kind === "support" ? mapStates.get(connection.mapId) : undefined;
            details.reason = connection ? this.getConnectionEligibility(connection) : "empty";
            details.eligible = details.reason === "available";
            details.exhausted = details.target instanceof RoyalResourceNode && details.target.depleted;
            if (details.eligible && details.exhausted) details.reason = "exhausted";
            details.productionPerHour = details.nodeRemovalPerHour = 0;
            details.alternatives = emptyLinkAlternatives;
            if (details.exhausted) {
                if (!alternatives) {
                    const source = MapInfo[this.mapId]?.data;
                    const availableNodes: RoyalResourceNode[] = [];
                    if (source) {
                        for (const node of resourceNodes.nodes) {
                            if (!node.depleted && node.removedQuantity > -1
                                && this.getResourceConnectionEligibility(node, source.x, source.y) === "available") {
                                availableNodes.push(node);
                            }
                        }
                    }
                    alternatives = availableNodes;
                }
                details.alternatives = alternatives;
            }
            const node = details.target;
            // Collection uses saved links, not the current picker or maintenance constraints.
            if (!collectorEligible || connection?.kind !== "resource" || connection.resourceId < 0
                || !(node instanceof RoyalResourceNode) || node.depleted || !(node.removedQuantity > -1)) continue;
            const rate = collectionRate * (1 + 25 * node.grade / 100);
            if (this.kind === OutpostKind.ResourceDepot) {
                details.productionPerHour = details.nodeRemovalPerHour = rate;
                this.productionPerHour += rate;
            } else if (this.kind === OutpostKind.SavageStronghold) {
                details.nodeRemovalPerHour = savageCollectionMultiplier * rate;
            }
        }
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
