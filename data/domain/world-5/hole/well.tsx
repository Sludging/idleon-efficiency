import { lavaLog } from "../../../utility";

import type { ImageData } from "../../imageData";
import { SedimentModel } from "../../model/sedimentModel";
import { initSedimentRepo } from "../../data/SedimentRepo";
import { Hole } from "./hole";

export type WellFullInTiming =
    | { status: "estimate"; hours: number }
    | { status: "no-production" | "unknown"; hours: null };


export interface WellBucket {
    index: number;
    sedimentIndex: number | null;
    unlocked: boolean | null;
    unlockSchematicIndex: number | null;
    rate: number | null;
    goldBucket: boolean | null;
}

export class WellSediment {
    current: number | null = null;
    unavailable: boolean | null = null;
    expansions: number | null = null;
    currentMax: number | null = null;
    bucketRate: number | null = null;

    constructor(public index: number, public data: SedimentModel) { }

    get spendableStock(): number | null {
        return this.current === null || this.unavailable ? null : this.current;
    }
}

export class Well {
    sediments: WellSediment[] = [];
    resourceValues: number[] = [];
    buckets: WellBucket[] = [];
    ownedBucketCount: number | null = null;
    bucketImageData: ImageData = { location: "HoleWellBucket0", width: 62, height: 128 };
    goldBucketImageData: ImageData = { location: "HoleWellBucket1", width: 62, height: 128 };
    goldBucketCount: number | null = null;
    goldBucketMultiplier: number | null = null;
    opalCost: number | null = null;
    opalAffordable: boolean | null = null;
    expansionLevel: number | null = null;
    expansionUpgradeOwned: boolean | null = null;

    constructor() {
        this.sediments = initSedimentRepo().map(sediment => new WellSediment(sediment.index, sediment.data));
        this.buckets = Array.from({ length: 10 }, (_, index) => ({
            index,
            sedimentIndex: null,
            unlocked: index === 0,
            unlockSchematicIndex: index === 0 ? null : index + 2,
            rate: null,
            goldBucket: null,
        }));
    }

    parse(hole: Hole, holeData: number[][]): void {
        const stocks = holeData[9];
        const expansionLevels = holeData[8];
        const assignments = holeData[10];
        const expansionLevel = holeData[11]?.[9];
        const opalStock = holeData[9]?.[0];
        const expansionUpgrade = hole.schematics.find(schematic => schematic.index === 13)!;

        this.resourceValues = stocks?.map(Number) ?? [];

        this.sediments.forEach((sediment, index) => {
            const stock = stocks?.[index];
            const level = expansionLevels?.[index];
            sediment.current = stock == null ? null : Number(stock);
            sediment.unavailable = sediment.current === null ? null : sediment.current < 0;
            sediment.expansions = level == null ? null : Number(level);
            sediment.currentMax = sediment.expansions === null ? null
                : 100 * Math.pow(1.5, sediment.expansions) * (1 + sediment.data.unlockRequirement / 100);
            sediment.bucketRate = null;
        });

        this.expansionLevel = expansionLevel == null ? null : Number(expansionLevel);
        this.expansionUpgradeOwned = expansionUpgrade.saveAvailable ? expansionUpgrade.unlocked : null;
        this.opalCost = this.expansionLevel === null ? null : Well.getOpalCost(this.expansionLevel);
        this.opalAffordable = this.opalCost === null || opalStock == null ? null : Number(opalStock) >= this.opalCost;

        const bucketSchematics = [3, 4, 5, 6, 7, 8, 9, 10, 11]
            .map(index => hole.schematics.find(schematic => schematic.index === index)!);
        const bucketCount = hole.sourceSaveAvailable.schematics
            ? 1 + bucketSchematics.filter(schematic => schematic.unlocked).length
            : null;
        this.ownedBucketCount = bucketCount === null ? null : Math.min(this.buckets.length, bucketCount);
        const fountainInputsAvailable = hole.sourceSaveAvailable.fountainUpgrades &&
            hole.sourceSaveAvailable.fountainMarbleization;
        const goldBucketUpgrade = hole.schematics.find(schematic => schematic.index === 104)!;
        this.goldBucketCount = fountainInputsAvailable && goldBucketUpgrade.saveAvailable
            ? Math.round(Math.max(0, Math.min(1, hole.getFountainBonus(0, 15))) +
                Math.min(goldBucketUpgrade.getBonus(1), 1))
            : null;
        this.goldBucketMultiplier = fountainInputsAvailable
            ? 1 + hole.getFountainBonus(0, 15) / 100
            : null;

        this.buckets.forEach((bucket, index) => {
            const assignment = assignments?.[index];
            bucket.sedimentIndex = assignment == null ? null : Number(assignment);
            bucket.unlocked = index === 0 ? true
                : bucketCount === null ? null
                : index < bucketCount;
            bucket.goldBucket = this.goldBucketCount === null ? null : index < this.goldBucketCount;
            bucket.rate = null;
        });
    }

    prepare(hole: Hole, gemShopPurchase: number | null, stampBonus: number | null, gamingBonus: number | null): void {
        const schematicBonus = (index: number, baseMultiplier: number = 1): number | null => {
            const schematic = hole.schematics.find(candidate => candidate.index === index);
            return schematic?.saveAvailable ? schematic.getBonus(baseMultiplier) : null;
        };
        const monumentBonus = hole.getMonumentBonus("Bravery", 1);
        const measurementBonus = hole.measurements[5].effectiveBenefit;
        const bellBonus = hole.bell.bonuses[0]?.getBonus() ?? null;
        const lampBonus = hole.lamp.getBonus(true);
        const gambitBonus = hole.gambit.getBonus(3);
        const jarBonus = hole.jar.getBonus(8);
        const upgrade1 = schematicBonus(1, 5);
        const upgrade14 = schematicBonus(14);
        const upgrade15 = schematicBonus(15);
        const upgrade26 = schematicBonus(26, 5);
        const upgrade58 = schematicBonus(58);
        const upgrade59 = schematicBonus(59);
        if (monumentBonus === null || measurementBonus === null || bellBonus === null || lampBonus === null ||
            gambitBonus === null || upgrade1 === null || upgrade14 === null || upgrade15 === null || upgrade26 === null ||
            upgrade58 === null || upgrade59 === null || gemShopPurchase === null || stampBonus === null ||
            gamingBonus === null) {
            this.buckets.forEach(bucket => bucket.rate = null);
            this.sediments.forEach(sediment => sediment.bucketRate = null);
            return;
        }

        this.buckets.forEach(bucket => {
            if (bucket.unlocked === null) {
                bucket.rate = null;
                return;
            }
            if (!bucket.unlocked) {
                bucket.rate = 0;
                return;
            }
            if (bucket.goldBucket === null) {
                bucket.rate = null;
                return;
            }
            const goldMultiplierValue = this.goldBucketMultiplier;
            if (bucket.goldBucket && goldMultiplierValue === null) {
                bucket.rate = null;
                return;
            }
            const goldMultiplier = bucket.goldBucket ? Math.max(1, goldMultiplierValue!) : 1;
            if (hole.wellExpansionLevel === null || jarBonus === null) {
                bucket.rate = null;
                return;
            }
            bucket.rate = goldMultiplier * (upgrade58 + upgrade59 +
                (10 + upgrade1 + upgrade26) * (1 + upgrade14 / 100) *
                (1 + gemShopPurchase / 2) * (1 + monumentBonus / 100) *
                (1 + lampBonus / 100) * (1 + gambitBonus / 100) *
                Math.max(1, upgrade15 * Math.pow(1.1, hole.wellExpansionLevel)) *
                (1 + measurementBonus / 100) * (1 + bellBonus / 100) * (1 + jarBonus / 100) *
                (1 + stampBonus / 100) * (1 + gamingBonus / 100));
        });
        const missingAssignment = this.buckets.some(bucket => bucket.unlocked === true && bucket.sedimentIndex === null);
        this.sediments.forEach(sediment => {
            const group = this.buckets.filter(bucket => bucket.sedimentIndex === sediment.index && bucket.unlocked === true);
            sediment.bucketRate = missingAssignment || group.some(bucket => bucket.rate === null) ? null
                : group.reduce((sum, bucket) => sum + (bucket.rate ?? 0), 0);
        });
    }

    getFullInTime(sediment: WellSediment): WellFullInTiming {
        const current = sediment.current;
        const capacity = sediment.currentMax;
        if (current === null || capacity === null || current < 0 || sediment.unavailable === true) {
            return { status: "unknown", hours: null };
        }
        if (current >= capacity) return { status: "estimate", hours: 0 };
        if (this.ownedBucketCount === null || this.buckets.some(bucket => bucket.unlocked === null)) {
            return { status: "unknown", hours: null };
        }

        let totalRate = 0;
        for (const bucket of this.buckets) {
            if (!bucket.unlocked) continue;
            if (bucket.rate === null) return { status: "unknown", hours: null };
            totalRate += bucket.rate;
        }
        if (totalRate <= 0) return { status: "no-production", hours: null };
        return { status: "estimate", hours: (capacity - current) / totalRate };
    }


    getTotalResourceDigits(): number {
        return this.resourceValues.reduce((sum, value) => sum + Math.ceil(lavaLog(value ?? 0)), 0);
    }

    static getOpalCost(level: number): number {
        const rawCost = (1 + 3 * level + Math.pow(level, 2)) * Math.pow(3.5 + level / 10, level);
        return rawCost < 1e9 ? level === 1 ? 6 : level === 2 ? 60 : Math.floor(rawCost) : rawCost;
    }
}
