import { Domain, RawData } from "../base/domain";
import { Item } from "../items";
import { initShimmerBonusRepo, ShimmerBonusBase } from "../data/ShimmerBonusRepo";
import { ShimmerBonusModel } from "../model/shimmerBonusModel";
import { Sailing } from "../world-5/sailing/sailing";
import { initShimmerChallengeRepo, ShimmerChallengeBase } from "../data/ShimmerChallengeRepo";
import { initFishPoolRepo, FishPoolBase } from "../data/FishPoolRepo";
import { PoolTypeEnum } from "../enum/poolTypeEnum";
import { BottleCollection, CrystalIsland, TrashIsland } from "./island-expeditions/collections";
import type { Account } from "../account";
import type { Bribe } from "../world-1/bribes";
import { ExpeditionIslandBase, initExpeditionIslandRepo } from "../data/ExpeditionIslandRepo";
import { ExpeditionUnlockCostBase, initExpeditionUnlockCostRepo } from "../data/ExpeditionUnlockCostRepo";
import { ExpeditionIslandModel } from "../model/expeditionIslandModel";
import { initRandoIslandRewardRepo, RandoIslandRewardBase } from "../data/RandoIslandRewardRepo";
import { FractalIslandRewardBase, initFractalIslandRewardRepo } from "../data/FractalIslandRewardRepo";

export class ExpeditionIsland {
    unlocked: boolean = false;
    nextUnlockCost: number | undefined = undefined;

    constructor(public index: number, public data: ExpeditionIslandModel) { }

    static fromBase(data: ExpeditionIslandBase[]): ExpeditionIsland[] {
        return data.map(island => new ExpeditionIsland(island.index, island.data));
    }
}

export class IslandAccess {
    islands: ExpeditionIsland[] = [];
    private unlockCosts: ExpeditionUnlockCostBase[] = [];

    init(): void {
        this.islands = ExpeditionIsland.fromBase(initExpeditionIslandRepo());
        this.unlockCosts = initExpeditionUnlockCostRepo();
    }

    parse(membership: number | string | undefined): void {
        const membershipTokens = String(membership ?? "");
        const islandTokens = ["_", "a", "b", "c", "d", "e"];
        this.islands.forEach(island => {
            island.unlocked = membershipTokens.includes(islandTokens[island.index]);
        });

        const unlockedCount = this.unlockedIslandCount;
        this.islands.forEach(island => {
            island.nextUnlockCost = island.unlocked
                ? undefined
                : Math.round(island.data.unlockBaseCost + this.unlockCosts[unlockedCount].data.additionalCost);
        });
    }

    get unlockedIslandCount(): number {
        let unlockedCount = 0;
        for (const island of this.islands) {
            if (island.unlocked) {
                unlockedCount++;
            }
        }
        return unlockedCount;
    }

    isIslandUnlocked(index: number): boolean {
        return this.islands.find(island => island.index === index)?.unlocked ?? false;
    }
}

export class ShimmerBonus {
    baseBonus: number = 0;
    bonusMultiplier: number = 1;

    constructor(public index: number, public data: ShimmerBonusModel) { }

    static fromBase(data: ShimmerBonusBase[]): ShimmerBonus[] {
        return data.map(bonus => new ShimmerBonus(bonus.index, bonus.data));
    }

    getBonus(baseBonus: number = this.baseBonus): number {
        return baseBonus * this.bonusMultiplier;
    }

    getNextCost(): number {
        return 1 + Math.floor(this.baseBonus / this.data.levelDivisor);
    }
}

export class RandoIsland {
    eventUsedThisWeek: boolean = false;
    lootLevel: number = 0;
    doubleBossLevel: number = 0;
    rewards: RandoIslandRewardBase[] = [];

    init(): void {
        this.rewards = initRandoIslandRewardRepo();
    }

    parse(options: (number | string)[]): void {
        this.lootLevel = Number(options[166] ?? 0);
        this.doubleBossLevel = Number(options[167] ?? 0);
        this.eventUsedThisWeek = Number(options[168] ?? 0) === 1;
    }

    get lootUpgradePercent(): number {
        return this.getLootUpgradePercent();
    }

    // This chance applies only to the event boss on Rando Island.
    get islandDoubleBossChancePercent(): number {
        return this.getIslandDoubleBossChancePercent();
    }

    getLootUpgradePercent(level: number = this.lootLevel): number {
        return 5 * level;
    }

    getIslandDoubleBossChancePercent(level: number = this.doubleBossLevel): number {
        return 3 * level;
    }

    getInitialCost(index: number): number {
        const reward = this.rewards[index].data;
        const level = this.getRewardLevel(index);
        return reward.initialBaseCost * (reward.initialCostGrowth ?? 1) ** level;
    }

    getRefreshedCost(index: number): number {
        const reward = this.rewards[index].data;
        const level = this.getRewardLevel(index);
        return (reward.refreshedBaseCost ?? reward.initialBaseCost) * (reward.refreshedCostGrowth ?? 1) ** level;
    }

    private getRewardLevel(index: number): number {
        if (index === 0) {
            return this.lootLevel;
        }
        if (index === 1) {
            return this.doubleBossLevel;
        }
        return 0;
    }
}

export class ShimmerIsland {
    currency: number = 0;
    trialIndex: number = 0;
    trialBest: number = 0;
    rewardClaimed: boolean = false;
    bonuses: ShimmerBonus[] = [];
    challenges: ShimmerChallengeBase[] = [];

    init(): void {
        this.bonuses = ShimmerBonus.fromBase(initShimmerBonusRepo());
        this.challenges = initShimmerChallengeRepo();
    }

    parse(options: (number | string)[]): void {
        this.currency = Number(options[173] ?? 0);
        this.trialBest = Number(options[181] ?? 0);
        this.rewardClaimed = Number(options[182] ?? 0) === 1;
        this.trialIndex = Number(options[183] ?? 0);
        this.bonuses.forEach(bonus => {
            bonus.baseBonus = Number(options[174 + bonus.index] ?? 0);
            bonus.bonusMultiplier = 1;
        });
    }

    get currentTrial(): ShimmerChallengeBase {
        return this.challenges[this.trialIndex];
    }

    get trialReward(): number {
        return Math.ceil(10 * Math.min(4, Math.sqrt(this.trialBest / this.currentTrial.data.threshold)));
    }

    prepareBonusMultiplier(multiplier: number): void {
        this.bonuses.forEach(bonus => bonus.bonusMultiplier = multiplier);
    }
}

export class FractalIsland {
    static readonly rewardCatalog: FractalIslandRewardBase[] = initFractalIslandRewardRepo();
    readonly rewards: FractalIslandRewardBase[] = FractalIsland.rewardCatalog;
    afkHours: number = 0;

    parse(options: (number | string)[]): void {
        this.afkHours = Number(options[184] ?? 0);
    }

    isBonusUnlocked(index: number): boolean {
        return this.afkHours >= this.rewards[index].data.requiredHours;
    }

    get bonusToShovelSpeed(): number {
        return this.isBonusUnlocked(4) ? 25 : 0;
    }

    get reductionToKitchenCosts(): number {
        return this.isBonusUnlocked(2) ? 30 : 0;
    }

    get bonusStarTalentPoints(): number {
        return this.isBonusUnlocked(5) ? 100 : 0;
    }
}

export const FractIslandBonusesThresholds = FractalIsland.rewardCatalog.map(reward => reward.data.requiredHours);

export type SeasaltFishing = {
    pool: PoolTypeEnum;
    fish: FishPoolBase[];
};

export class IslandExpeditions extends Domain {
    bottles: number = 0;
    access: IslandAccess = new IslandAccess();
    collection: BottleCollection = new BottleCollection();
    trash: TrashIsland = new TrashIsland();
    rando: RandoIsland = new RandoIsland();
    crystal: CrystalIsland = new CrystalIsland();
    shimmer: ShimmerIsland = new ShimmerIsland();
    fractal: FractalIsland = new FractalIsland();
    seasalt: SeasaltFishing = {
        pool: PoolTypeEnum.FishBig,
        fish: initFishPoolRepo().filter(fish => fish.data.pool === PoolTypeEnum.FishBig),
    };
    dummyTargetBestDPS: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "OptLacc", perPlayer: false, default: [] },
            { key: "QuestComplete_", perPlayer: true, default: {} },
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.access.init();
        this.trash.init();
        this.rando.init();
        this.shimmer.init();
        return this;
    }

    parse(data: Map<string, any>): void {
        const expeditions = data.get(this.getDataKey()) as IslandExpeditions;
        const optionList = data.get("OptLacc") as (number | string)[];
        expeditions.bottles = Number(optionList[162] ?? 0);
        expeditions.access.parse(optionList[169]);
        expeditions.collection.parse(data, data.get("charCount") as number);
        expeditions.trash.parse(optionList);
        expeditions.rando.parse(optionList);
        expeditions.crystal.parse(optionList);
        expeditions.shimmer.parse(optionList);
        expeditions.fractal.parse(optionList);

        // Shimmer Island keeps the Dummy Target's best DPS across all characters.
        expeditions.dummyTargetBestDPS = Number(optionList[172] ?? 0);
    }

    get islands(): ExpeditionIsland[] {
        return this.access.islands;
    }

    get unlockedIslandCount(): number {
        return this.access.unlockedIslandCount;
    }

    isIslandUnlocked(index: number): boolean {
        return this.access.isIslandUnlocked(index);
    }

    get shimmerBonuses(): ShimmerBonus[] {
        return this.shimmer.bonuses;
    }

    get bonusToShovelSpeed(): number {
        return this.fractal.bonusToShovelSpeed;
    }

    get reductionToKitchenCosts(): number {
        return this.fractal.reductionToKitchenCosts;
    }

    get bonusStarTalentPoints(): number {
        return this.fractal.bonusStarTalentPoints;
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
    expeditions.shimmer.prepareBonusMultiplier(multiplier);

    const account = data.get("account") as Account;
    const bribes = data.get("bribes") as Bribe[];
    expeditions.collection.prepare({
        bottleServiceBonus: bribes[31].getBonus(),
        bottleUpgradeLevel: expeditions.trash.bottleGainLevel,
        explorerBundleOwned: account.hasExplorerBundle,
    });

    return expeditions;
};
