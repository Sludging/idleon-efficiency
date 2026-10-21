import { Domain, RawData } from "../base/domain";
import { Item } from "../items";
import { initShimmerBonusRepo, ShimmerBonusBase } from "../data/ShimmerBonusRepo";
import { ShimmerBonusModel } from "../model/shimmerBonusModel";
import { Sailing } from "../world-5/sailing/sailing";

export const FractIslandBonusesThresholds = [
    24,
    200,
    750,
    2500,
    1E4,
    2E4,
    4E4,
    6E4,
]

export class ShimmerBonus {
    baseBonus: number = 0;
    bonusMultiplier: number = 1;

    constructor(public index: number, public data: ShimmerBonusModel) { }

    static fromBase(data: ShimmerBonusBase[]): ShimmerBonus[] {
        return data.map(bonus => new ShimmerBonus(bonus.index, bonus.data));
    }

    getBonus(): number {
        return this.baseBonus * this.bonusMultiplier;
    }
}

export class IslandExpeditions extends Domain {
    bonusToShovelSpeed: number = 0;
    reductionToKitchenCosts: number = 0;
    bonusStarTalentPoints: number = 0;
    shimmerBonuses: ShimmerBonus[] = [];
    dummyTargetBestDPS: number = 0;

    getRawKeys(): RawData[] {
        return [
            {key: "OptLacc", perPlayer: false, default: []}
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.shimmerBonuses = ShimmerBonus.fromBase(initShimmerBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const expeditions = data.get(this.getDataKey()) as IslandExpeditions;
        const optionList = data.get("OptLacc") as number[];

        // Shimmer Island keeps the Dummy Target's best DPS across all characters.
        expeditions.dummyTargetBestDPS = Number(optionList[172] ?? 0);

        // Points invested into shimmer bonuses are stored in option account list starting from index 174.
        expeditions.shimmerBonuses.forEach(bonus => {
            bonus.baseBonus = Number(optionList[174 + bonus.index] ?? 0);
        });

        expeditions.bonusToShovelSpeed = optionList[184] >= FractIslandBonusesThresholds[4] ? 25 : 0;
        expeditions.reductionToKitchenCosts = optionList[184] >= FractIslandBonusesThresholds[2] ? 30 : 0;
        expeditions.bonusStarTalentPoints = optionList[184] >= FractIslandBonusesThresholds[5] ? 100 : 0;
    }

    getShimmerBonus(index: number): number {
        return this.shimmerBonuses.find(bonus => bonus.index === index)?.getBonus() ?? 0;
    }
}

export const updateIslandExpeditions = (data: Map<string, any>) => {
    const expeditions = data.get("islandExpeditions") as IslandExpeditions;
    const sailing = data.get("sailing") as Sailing;
    const shimLanternBonus = sailing.artifacts[31].getBonus();

    // The Shim Lantern boosts every Shimmer bonus, 
    // but even higher artifact rarities are capped at Sovereign.
    const multiplier = Math.max(1, Math.min(4, 1 + (100 * shimLanternBonus) / 100));
    expeditions.shimmerBonuses.forEach(bonus => bonus.bonusMultiplier = multiplier);

    return expeditions;
};
