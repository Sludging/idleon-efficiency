import { lavaLog } from "../../../utility";

import type { ImageData } from "../../imageData";
import { SedimentModel } from "../../model/sedimentModel";
import { initSedimentRepo } from "../../data/SedimentRepo";
import { Hole } from "./hole";


export type WellFullInTiming =
    | { status: "estimate"; hours: number }
    | { status: "blocked" | "no-production" | "unknown"; hours: null };


export interface WellBucket {
    index: number;
    sedimentIndex: number | null;
    unlocked: boolean;
    unlockSchematicIndex: number | null;
    rate: number | null;
    goldBucket: boolean;
}

export class WellSediment {
    current: number = 0;
    expansions: number = 0;
    currentMax: number = 0;
    bucketRate: number | null = null;

    constructor(public index: number, public data: SedimentModel) { }
}

export class Well {
    sediments: WellSediment[] = [];
    resourceValues: number[] = [];
    buckets: WellBucket[] = [];
    ownedBucketCount: number = 0;
    bucketImageData: ImageData = { location: "HoleWellBucket0", width: 62, height: 128 };
    goldBucketImageData: ImageData = { location: "HoleWellBucket1", width: 62, height: 128 };
    goldBucketCount: number = 0;
    goldBucketMultiplier: number = 1;
    opalCost: number = 0;
    opalAffordable: boolean = false;
    expansionLevel: number = 0;
    expansionUpgradeOwned: boolean = false;

    constructor() {
        this.sediments = initSedimentRepo().map(sediment => new WellSediment(sediment.index, sediment.data));
        this.buckets = Array.from({ length: 10 }, (_, index) => ({
            index,
            sedimentIndex: null,
            unlocked: index === 0,
            unlockSchematicIndex: index === 0 ? null : index + 2,
            rate: null,
            goldBucket: false,
        }));
    }

    parse(hole: Hole, holeData: number[][]): void {
        const stocks = holeData[9] ?? [];
        const expansionLevels = holeData[8] ?? [];
        const assignments = holeData[10] ?? [];
        const expansionLevel = holeData[11]?.[9] ?? 0;
        const opalStock = stocks[0] ?? 0;
        const expansionUpgrade = hole.schematics[13];

        this.resourceValues = stocks.map(Number);

        this.sediments.forEach((sediment, index) => {
            sediment.current = Number(stocks[index] ?? 0);
            sediment.expansions = Number(expansionLevels[index] ?? 0);
            sediment.currentMax = 100 * Math.pow(1.5, sediment.expansions) *
                (1 + sediment.data.unlockRequirement / 100);
            sediment.bucketRate = null;
        });

        this.expansionLevel = Number(expansionLevel);
        this.expansionUpgradeOwned = expansionUpgrade.unlocked;
        this.opalCost = Well.getOpalCost(this.expansionLevel);
        this.opalAffordable = Number(opalStock) >= this.opalCost;

        const bucketSchematics = [3, 4, 5, 6, 7, 8, 9, 10, 11]
            .map(index => hole.schematics[index]);
        const bucketCount = 1 + bucketSchematics.filter(schematic => schematic.unlocked).length;
        this.ownedBucketCount = Math.min(this.buckets.length, bucketCount);
        const goldBucketUpgrade = hole.schematics[104];
        const goldBucketBonus = hole.fountain.getBonus(0, 15);
        this.goldBucketCount = Math.round(Math.max(0, Math.min(1, goldBucketBonus)) +
            Math.min(goldBucketUpgrade.getBonus(1), 1));
        this.goldBucketMultiplier = 1 + goldBucketBonus / 100;

        this.buckets.forEach((bucket, index) => {
            const assignment = assignments[index];
            bucket.sedimentIndex = assignment == null ? null : Number(assignment);
            bucket.unlocked = index === 0 ? true : index < bucketCount;
            bucket.goldBucket = index < this.goldBucketCount;
            bucket.rate = null;
        });
    }

    prepare(hole: Hole, gemShopPurchase: number, stampBonus: number, gamingBonus: number | null): void {
        const monumentBonus = hole.getMonumentBonus("Bravery", 1);
        const measurementBonus = hole.measurements[5].effectiveBenefit;
        const bellBonus = hole.bell.bonuses[0].getBonus();
        const lampBonus = hole.lamp.getBonus(true);
        const gambitBonus = hole.gambit.getBonus(3);
        const jarBonus = hole.jar.jarBonuses[8].getBonus();
        const upgrade1 = hole.schematics[1].getBonus(5);
        const upgrade14 = hole.schematics[14].getBonus();
        const upgrade15 = hole.schematics[15].getBonus();
        const upgrade26 = hole.schematics[26].getBonus(5);
        const upgrade58 = hole.schematics[58].getBonus();
        const upgrade59 = hole.schematics[59].getBonus();
        if (gamingBonus === null) {
            this.buckets.forEach(bucket => bucket.rate = null);
            this.sediments.forEach(sediment => sediment.bucketRate = null);
            return;
        }

        this.buckets.forEach(bucket => {
            if (!bucket.unlocked) {
                bucket.rate = 0;
                return;
            }
            const goldMultiplier = bucket.goldBucket ? Math.max(1, this.goldBucketMultiplier) : 1;
            bucket.rate = goldMultiplier * (upgrade58 + upgrade59 +
                (10 + upgrade1 + upgrade26) * (1 + upgrade14 / 100) *
                (1 + gemShopPurchase / 2) * (1 + monumentBonus / 100) *
                (1 + lampBonus / 100) * (1 + gambitBonus / 100) *
                Math.max(1, upgrade15 * Math.pow(1.1, hole.wellExpansionLevel)) *
                (1 + measurementBonus / 100) * (1 + bellBonus / 100) * (1 + jarBonus / 100) *
                (1 + stampBonus / 100) * (1 + gamingBonus / 100));
        });
        const missingAssignment = this.buckets.some(bucket => bucket.unlocked && bucket.sedimentIndex === null);
        this.sediments.forEach(sediment => {
            if (missingAssignment) {
                sediment.bucketRate = null;
                return;
            }
            const group = this.buckets.filter(bucket => bucket.sedimentIndex === sediment.index && bucket.unlocked);
            let bucketRate: number | null = 0;
            for (const bucket of group) {
                if (bucket.rate === null) {
                    bucketRate = null;
                    break;
                }
                bucketRate += bucket.rate;
            }
            sediment.bucketRate = bucketRate;
        });
    }

    getFullInTime(sediment: WellSediment): WellFullInTiming {
        const current = sediment.current;
        const capacity = sediment.currentMax;
        if (current < 0) return { status: "blocked", hours: null };
        if (current >= capacity) return { status: "estimate", hours: 0 };
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
        return this.resourceValues.reduce((sum, value) => sum + Math.ceil(lavaLog(value)), 0);
    }

    static getOpalCost(level: number): number {
        const rawCost = (1 + 3 * level + Math.pow(level, 2)) * Math.pow(3.5 + level / 10, level);
        return rawCost < 1e9 ? level === 1 ? 6 : level === 2 ? 60 : Math.floor(rawCost) : rawCost;
    }
}
