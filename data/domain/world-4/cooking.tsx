import { commaNotation, lavaLog, round } from "../../utility"
import { Achievement } from "../achievements";
import { Account } from "../account";
import { Companion, getCompanionActiveBonus, isCompanionLevelTwo } from "../companions";
import { Alchemy } from "../world-2/alchemy/alchemy";
import { AtomCollider } from "../world-3/construction/atomCollider";
import { Breeding, territoryNiceNames } from "./breeding";
import { Card } from "../cards";
import { initMealRepo, MealBase } from "../data/MealRepo";
import { Worship, TotalizerBonus } from "../world-3/worship";
import { GemStore } from "../gemPurchases";
import { ImageData } from "../imageData";
import { Lab } from "./lab";
import { MealModel } from "../model/mealModel";
import { Player } from "../player";
import { Sailing } from "../world-5/sailing/sailing";
import { Sigils } from "../world-2/alchemy/sigils";
import { Stamp } from "../world-1/stamps";
import { Domain, RawData } from "../base/domain";
import { Item } from "../items";
import { Equinox, FoodLust } from "../world-3/equinox";
import { CropScientistBonusText, Farming } from "../world-6/farming";
import { Summoning } from "../world-6/summoning";
import { Arcade } from "../world-2/arcade";
import { Sneaking } from "../world-6/sneaking";
import { Button } from "../world-7/button";
import type { JellyOperator } from "../world-7/jellyOperator";
import { EventShop } from "../eventShop";
import { StarSigns } from "../starsigns";
import { IslandExpeditions } from '../world-2/islandExpedition';
import { UpgradeVault } from "../upgradeVault";
import { Hole } from "../world-5/hole/hole";
import { Votes } from "../world-2/votes";
import { EquipmentSets } from "../misc/equipmentSets";
import { Stat } from "../base/stat";
import type { Rift } from "./rift";
import type { Menagerie } from "../menagerie";
import { CookingMasteryUpgradeBase, initCookingMasteryRepo } from "../data/CookingMasteryRepo";
import { CookingMasteryUpgradeModel } from "../model/cookingMasteryUpgradeModel";
import { SkillsIndex } from "../SkillsIndex";
import type { Gaming } from "../world-5/gaming";
import type { ResearchGrid } from "../world-7/research";
import type { SaltLick } from "../world-3/construction/saltLick";
import type { Spelunking } from "../world-7/spelunking";
import type { Grimoire } from "../grimoire";
import type { Clamworks } from "../world-7/clamworks";
import { initCookingMetadataRepo } from "../data/CookingMetadataRepo";
import type { RoyalArmory } from "../world-6/royalArmory/royalArmory";
import type { Meritocraty } from "../world-7/meritocraty";
import type { LegendTalents } from "../world-7/legendTalents";
import type { SushiStation } from "../world-7/sushi";
import { Talent } from "../talents";

const cookingMetadata = initCookingMetadataRepo()[0].data;
const masteryUpgradeImages: readonly string[] = [
    "CookingMasterySalty", "CookingMasterySpicy", "CookingMasterySweet",
    "CookingMasterySmoky", "CookingMasterySour", "CookingMasterySavory",
];

const spiceValues: number[] = "0 3 5 8 10 13 15 19 20 23 27 31 33 37 41 45 48 50 53 56 58 60 63 66 70 73".split(" ").map(value => parseInt(value));
const mealLuckValues: number[] = "1 .20 .10 .05 .02 .01 .004 .001 .0005 .0003".split(" ").map(value => parseFloat(value));


// Stolens from https://stackoverflow.com/a/54385026
function* range(start: number, end: number) {
    for (; start <= end; ++start) { yield start; }
}

function last<T>(arr: T[]) { return arr[arr.length - 1]; }

function* numericCombinations(n: number, r: number, loc: number[] = []): IterableIterator<number[]> {
    const idx = loc.length;
    if (idx === r) {
        yield loc;
        return;
    }
    for (const next of range(idx ? last(loc) + 1 : 0, n - r + idx)) { yield* numericCombinations(n, r, loc.concat(next)); }
}

function* combinations<T>(arr: T[], r: number) {
    for (const idxs of numericCombinations(arr.length, r)) { yield idxs.map(i => arr[i]); }
}

export class Meal {
    name: string
    cookReq: number
    bonusQty: number
    bonusText: string
    description: string
    bonusKey: string

    count: number = 0;
    level: number = 0;
    ribbonLevel: number = 0;

    // Discover values
    timeOptimalSpices: number[] = [];
    timeDiscoveryTime: number = 0;
    timeDiscoveryChance: number = 0;
    chanceOptimalSpices: number[] = [];
    chanceDiscoveryTime: number = 0;
    chanceDiscoveryChance: number = 0;

    // Meal effect bonus
    mainframeBonus: number = 0;
    shinyBonus: number = 0;
    winnerBonus: number = 0;
    companion162Bonus: number = 0;
    cookMasterLevel: number = 0;
    armorSetBonus: number = 0;
    ribbonCloudBonus: number = 0;
    ribbonJellyBonus: number = 0;

    // Active cooking values
    cookingContribution: number = 0;
    cookingContributionWithSilkrode: number = 0;
    cookingContributionWithoutStarSign: number = 0;

    cookingTotalSpeed: number = 0;
    cookingTotalSpeedWithSilkrode: number = 0;
    cookingTotalSpeedWithoutStarSign: number = 0;

    // Void plate achivement
    reducedCostToUpgrade: boolean = false;

    // Equinox bonus
    foodLustDiscount: number = 1;

    // Calculated
    maxLevel: number = 30;

    // Jade upgrade, equivalent to No Bubbles Left Behind
    noMealLeftBehindAffected: boolean = false;

    constructor(public mealIndex: number, data: MealModel) {
        this.name = data.name;
        this.cookReq = data.cookingReq;
        this.bonusQty = data.bonusQty;
        this.bonusText = data.bonusText;
        this.description = data.description;
        this.bonusKey = data.bonusKey;
    }

    parse(mealsData: number[][], ribbonData: number[], masteryData: number[][]): void {
        this.level = Number(mealsData?.[0]?.[this.mealIndex] ?? 0);
        this.count = Number(mealsData?.[2]?.[this.mealIndex] ?? 0);
        this.ribbonLevel = Number(ribbonData?.[28 + this.mealIndex] ?? 0);
        this.cookMasterLevel = Number(masteryData?.[0]?.[this.mealIndex] ?? 0);
    }

    getImageData = (): ImageData => {
        return {
            location: `CookingM${this.mealIndex}`,
            width: 41,
            height: 32
        }
    }

    getMasteryImageData(): ImageData {
        return { location: "CookingMasteryMealNode", width: 31, height: 32 };
    }

    getRibbonBonus = (ribbonLevel: number = this.ribbonLevel) => {
        return 1 + (Math.floor(5 * ribbonLevel + Math.floor(ribbonLevel / 2) * (4 + 6.5 * Math.floor(ribbonLevel / 5))) + Math.floor(ribbonLevel / 4) * (this.armorSetBonus / 4) + Math.floor(ribbonLevel / 10) * this.ribbonCloudBonus + Math.floor(ribbonLevel / 20) * this.ribbonJellyBonus) / 100;
    }

    // Cooking Mastery multiplier for this meal's bonus.
    getBonusMultiCook = () => {
        return 1 + (100 * this.cookMasterLevel) / (this.cookMasterLevel + 5) / 100;
    }

    getBonus = (roundResult: boolean = false, mainFrameBonus: number = this.mainframeBonus, level: number = this.level) => {
        // Jewel doesn't impact the line width meals.
        if (this.bonusKey == "PxLine") {  // This used to be the case but no more? -> || this.bonusKey == "LinePct") {
            const finalMath = level * this.bonusQty;
            return roundResult ? round(finalMath) : finalMath;
        }

        const cookingMealBonusMultioo =
            (1 + ((mainFrameBonus + this.shinyBonus) / 100)) *
            (1 + this.winnerBonus / 100) *
            (1 + (25 * this.companion162Bonus) / 100);
        const finalMath = this.getBonusMultiCook() *
            cookingMealBonusMultioo *
            this.getRibbonBonus() *
            level *
            this.bonusQty;
        return roundResult ? round(finalMath) : finalMath;
    }

    getBonusText = (level: number = this.level) => {
        return this.bonusText.replace(/{/g, commaNotation(this.getBonus(true, this.mainframeBonus, level)));
    }

    getMealLevelCost = (level: number = this.level) => {
        const tier = Math.floor((level + 1000) / 1111);
        const reductionMultipier = this.reducedCostToUpgrade ? 1 / 1.1 : 1;
        return Math.max(0.001, 1 / Math.max(1, 5 * this.companion162Bonus)) *
            Math.pow(10, 22 * tier) *
            reductionMultipier *
            this.foodLustDiscount *
            (10 + (level + Math.pow(level, 2))) *
            Math.pow(1.2 + 0.05 * level, level) *
            Math.pow(1 + 0.4 * tier, level);
    }

    getCostsTillDiamond = () => {
        let totalCost = 0;
        for (const level of range(this.level, 10)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getCostsTillPurple = () => {
        let totalCost = 0;
        for (const level of range(this.level, 15)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getCostsTillVoid = () => {
        let totalCost = 0;
        for (const level of range(this.level, 21)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getCostsTillThirty = () => {
        let totalCost = 0;
        for (const level of range(this.level, 29)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getCostsTillMaxLevel = () => {
        let totalCost = 0;
        for (const level of range(this.level, this.maxLevel - 1)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getNextMilestoneCost = () => {
        switch (true) {
            case this.getCostsTillDiamond() > 0: return this.getCostsTillDiamond();
            case this.getCostsTillPurple() > 0: return this.getCostsTillPurple();
            case this.getCostsTillVoid() > 0: return this.getCostsTillVoid();
            case this.getCostsTillThirty() > 0: return this.getCostsTillThirty();
            case this.getCostsTillMaxLevel() > 0: return this.getCostsTillMaxLevel();
            default: return 0;
        }
    }

    getTotalCookingSpeed = (starSignEquipped: boolean, silkrodeBonus: boolean) => {
        return starSignEquipped ? (silkrodeBonus ? this.cookingTotalSpeedWithSilkrode : this.cookingTotalSpeed) : this.cookingTotalSpeedWithoutStarSign;
    }

    getContributionSpeed = (starSignEquipped: boolean, silkrodeBonus: boolean) => {
        return starSignEquipped ? (silkrodeBonus ? this.cookingContributionWithSilkrode : this.cookingContribution) : this.cookingContributionWithoutStarSign;
    }

    getTimeTill = (cost: number, starSignEquipped: boolean, silkrodeBonus: boolean, useContribution: boolean) => {
        return Math.max(0, ((cost - this.count) * this.cookReq) / (useContribution ? this.getContributionSpeed(starSignEquipped, silkrodeBonus) : this.getTotalCookingSpeed(starSignEquipped, silkrodeBonus)))
    }

    getLadlesTo = (cost: number, starSignEquipped: boolean, silkrodeBonus: boolean, useContribution: boolean, zerkerBonus: number = 0) => {
        return Math.max(0, Math.ceil((((cost - this.count) * this.cookReq) / (useContribution ? this.getContributionSpeed(starSignEquipped, silkrodeBonus) : this.getTotalCookingSpeed(starSignEquipped, silkrodeBonus))) / (1 + zerkerBonus / 100)));
    }

    static fromBase(data: MealBase[]): Meal[] {
        return data.map(meal => new Meal(meal.index, meal.data));
    }
}

export enum UpgradeType {
    Speed = 0,
    Fire = 1,
    Luck = 2
}

export enum KitchenStatus {
    Locked = 0,
    Unlocked = 1,
    Meal = 2,
    Recipe = 3,
}

type KitchenSpeedParameters = {
    starsign58bonus: number,
    mealCookVialBonus: number,
    fireflyVialBonus: number,
    turtleVialBonus: number,
    summoningWinnerBonus: number,
    stampBonus: number,
    meal63Bonus: number,
    mealCookBonus: number,
    jewel0Bonus: number,
    trollCardBonus: number,
    ceramicCardBonus: number,
    kitchenEffBonus: number,
    jewel14Bonus: number,
    diamonChef: number,
    achieve225: boolean,
    achieve224: boolean,
    atom8Bonus: number,
    artifact13Bonus: number,
    crucible5Bonus: number,
    crucible12Bonus: number,
    totalizerBonus: number,
    bloodMarrowBonus: number,
    superChowBonus: number,
    eventShopDoughRollerBonus: number,
    clamPromotion10Bonus: number,
    cropScientistBonus: number,
    buttonBonus7: number,
    farmingLevel: number,
    arcadeBonus: number,
    votingBonus13: number,
    vaultBonus54: number,
    holeBravey2Bonus: number,
    holeSchematic56: number,
    lampBonus00: number,
    menagerieMultiplier: number
}

export class Kitchen {
    mealLevels: number = 0;
    recipeLevels: number = 0;
    luckLevels: number = 0;

    speedUpgradeCost: number = 0;
    fireUpgradeCost: number = 0;
    luckUpgradecost: number = 0;

    status: KitchenStatus = KitchenStatus.Locked;
    activeMeal: number = -1;
    activeRecipe: number[] = [];
    progress: number = -1;
    richelin: boolean = false;

    mealSpeed: number = 1;
    mealSpeedWithoutStarSign: number = 1;
    mealSpeedWithSilkrode: number = 1;

    fireSpeed: number = 1;
    recipeLuck: number = 1;

    constructor(public index: number) { }

    // "CookingSPEED" == d
    getMealSpeed = (params: KitchenSpeedParameters) => {
        const {
            bloodMarrowBonus,
            cropScientistBonus,
            superChowBonus,
            eventShopDoughRollerBonus,
            clamPromotion10Bonus,
            meal63Bonus,
            farmingLevel,
            diamonChef,
            atom8Bonus,
            totalizerBonus,
            artifact13Bonus,
            crucible5Bonus,
            crucible12Bonus,
            buttonBonus7,
            arcadeBonus,
            turtleVialBonus,
            mealCookVialBonus,
            stampBonus,
            mealCookBonus,
            starsign58bonus,
            summoningWinnerBonus,
            ceramicCardBonus,
            fireflyVialBonus,
            jewel0Bonus,
            trollCardBonus,
            achieve225,
            achieve224,
            kitchenEffBonus,
            jewel14Bonus,
            votingBonus13,
            vaultBonus54,
            holeBravey2Bonus,
            holeSchematic56,
            lampBonus00,
            menagerieMultiplier
        } = params;

        return 10 *
            (1 + bloodMarrowBonus / 100) *
            Math.max(1, cropScientistBonus) *
            Math.max(1, superChowBonus) *
            (1 + eventShopDoughRollerBonus) *
            (1 + 9 * clamPromotion10Bonus) *
            (1 + (this.richelin ? 2 : 0)) *
            (1 + votingBonus13 / 100) *
            (1 + vaultBonus54 / 100) *
            (1 + (meal63Bonus * Math.ceil((farmingLevel + 1) / 50)) / 100) *
            Math.max(1, diamonChef) *
            Math.max(1, atom8Bonus) *
            (1 + totalizerBonus / 100) *
            (1 + this.mealLevels / 10) *
            (1 + artifact13Bonus / 100) *
            (1 + 9 * crucible5Bonus + 20 * crucible12Bonus) *
            (1 + buttonBonus7 / 100) *
            (1 + arcadeBonus / 100) *
            (1 + turtleVialBonus / 100) *
            (1 + mealCookVialBonus / 100) *
            (1 + (stampBonus + Math.max(0, jewel14Bonus)) / 100) *
            (1 + mealCookBonus / 100) *
            (1 + starsign58bonus / 100) *
            (1 + summoningWinnerBonus / 100) *
            menagerieMultiplier *
            (1 + holeBravey2Bonus / 100) *
            Math.max(1, holeSchematic56) *
            (1 + ceramicCardBonus / 100) *
            (1 + lampBonus00 / 100) *
            (1 + fireflyVialBonus / 100) *
            Math.max(1, jewel0Bonus) *
            (1 + Math.min(trollCardBonus + (20 * (achieve225 ? 1 : 0) + 10 * (achieve224 ? 1 : 0)), 100) / 100) *
            (1 + (kitchenEffBonus * Math.floor((this.mealLevels + (this.recipeLevels + this.luckLevels)) / 10)) / 100);
    }

    // "CookingFIRE" == d
    getFireSpeed = (vialBonus: number, stampBonus: number, mealBonus: number, cardBonus: number, kitchenEffBonus: number, diamonChef: number, atom8Bonus: number, totalizerBonus: number) => {
        const baseMath = 5 * (1 + (this.richelin ? 1 : 0)) * Math.max(1, diamonChef) * Math.max(1, atom8Bonus) * (1 + totalizerBonus / 100);
        const stampMath = 1 + stampBonus / 100;
        const mealMath = 1 + mealBonus / 100;
        const cardImpact = 1 + Math.min(cardBonus, 50) / 100;
        return baseMath *
            (1 + this.recipeLevels / 10) *
            (1 + vialBonus / 100) *
            stampMath * mealMath * cardImpact *
            (1 + (kitchenEffBonus * Math.floor((this.mealLevels + (this.recipeLevels + this.luckLevels)) / 10)) / 100);
    }

    getLuck = () => {
        return 1 + Math.pow(5 * this.luckLevels, 0.85) / 100;
    }

    getSpiceForUpgrade = (upgradeType: UpgradeType) => {
        return Math.floor(2 * this.index + upgradeType);
    }

    getUpdatedMealSpeed = (starSignEquipped: boolean, silkrodeBonus: boolean) => {
        return starSignEquipped ? (silkrodeBonus ? this.mealSpeedWithSilkrode : this.mealSpeed) : this.mealSpeedWithoutStarSign;
    }

    getSpiceUpgradeCost = (alchemyBonus: number, mealCostBonus: number, petBonusActive: boolean, upgradeType: UpgradeType, sigilBonus: number, islandEpeditionBonus: number) => {
        const baseMath = 1 /
            ((1 + (alchemyBonus + sigilBonus) / 100) *
                (1 + islandEpeditionBonus / 100) *
                (1 + mealCostBonus / 100) *
                (1 + (this.richelin ? 40 : 0) / 100) *
                (1 + (0.5 * (petBonusActive ? 1 : 0))))

        let upgradeLevel = 0;
        switch (upgradeType) {
            case UpgradeType.Speed:
                upgradeLevel = this.mealLevels
                break;
            case UpgradeType.Fire:
                upgradeLevel = this.recipeLevels;
                break;
            case UpgradeType.Luck:
                upgradeLevel = this.luckLevels;
                break;
        }
        let upgradeMath = upgradeLevel + 1 + Math.floor(Math.max(0, upgradeLevel - 10) / 2);
        upgradeMath = upgradeMath + Math.pow(Math.max(0, upgradeLevel - 30), 1.2);
        return 1 + baseMath * upgradeMath * Math.pow(1.02, Math.max(0, upgradeLevel - 60));
    }
}

export interface CookingMasteryContext {
    readonly totalLadles: number;
    readonly totalCookingLevels: number;
    readonly divorceCakeLevel: number;
    readonly totalRibbonRanks: number;
    readonly nativeRank: number;
}

export class CookingMasteryUpgrade {
    level: number = 0;
    unlocked: boolean = false;
    context: CookingMasteryContext = {
        totalLadles: 0, totalCookingLevels: 0, divorceCakeLevel: 0, totalRibbonRanks: 0, nativeRank: 1,
    };

    constructor(public index: number, public data: CookingMasteryUpgradeModel) { }

    getImageData(): ImageData {
        return { location: masteryUpgradeImages[this.index], width: 33, height: 35 };
    }

    parse(upgradeLevels: readonly number[]): void {
        this.level = Number(upgradeLevels[this.index] ?? 0);
    }

    update(context: CookingMasteryContext, masteryLevel: number): void {
        this.context = context;
        this.unlocked = masteryLevel >= this.data.requiredMasteryLevel;
    }

    getBonus(): number {
        return this.level * this.data.bonusPerLevel;
    }

    getContextualBonus(): number {
        const bonus = this.getBonus();
        switch (this.index) {
            case 0: return lavaLog(this.context.totalLadles) * bonus;
            case 1: return Math.max(0, this.context.totalCookingLevels - 1000) * bonus;
            case 2: return Math.max(0, this.context.divorceCakeLevel - 75) * bonus;
            case 3: return bonus / (25 + bonus) * 250;
            case 4: return this.context.totalRibbonRanks * bonus;
            case 5: return this.context.nativeRank * bonus;
            default: return 0;
        }
    }

    static fromBase(data: CookingMasteryUpgradeBase[]): CookingMasteryUpgrade[] {
        return data.map(upgrade => new CookingMasteryUpgrade(upgrade.index, upgrade.data));
    }
}

interface CookingMasteryInputs {
    totalCookingLevels: number;
    divorceCakeLevel: number;
    totalRibbonRanks: number;
    unlocked: boolean;
    eventShopPointsOwned: boolean;
    purpleJellyBonus: number;
    yellowJellyBonus: number;
    yellowResearchBonus: number;
    menagerieBonus: number;
    researchBonus: number;
    superbitPurchased: boolean;
    companionBonus: number;
    fountainBonus: number;
    vialBonus: number;
    arcadeBonus: number;
    saltLickBonus: number;
}

export interface CookingMasteryPointPool {
    readonly total: number;
    readonly spent: number;
    readonly available: number;
}

export interface CookingMasteryExperienceBreakdown {
    readonly base: number;
    readonly factors: readonly {
        source: 'salty' | 'spicy' | 'sweet' | 'menagerie' | 'sour' | 'research' | 'superbit' | 'savory' | 'companion' | 'fountain';
        percent: number;
        multiplier: number;
        active: boolean;
        /** Relative loss when this factor alone is removed. */
        impact: number;
    }[];
    readonly additiveBonuses: readonly {
        source: 'vial' | 'arcade' | 'saltLick';
        percent: number;
        active: boolean;
        /** Fraction of the additive percentage group, excluding its base multiplier. */
        share: number;
    }[];
    readonly additivePercent: number;
    readonly additiveMultiplier: number;
    readonly total: number;
}

export class CookingMastery {
    readonly upgrades: CookingMasteryUpgrade[];
    rank: number = 0;
    experience: number = 0;
    totalLadles: number = 0;
    unlocked: boolean = false;
    unlockTier: number = 0;
    purplePoints: CookingMasteryPointPool = { total: 0, spent: 0, available: 0 };
    yellowPoints: CookingMasteryPointPool = { total: 0, spent: 0, available: 0 };
    experienceBreakdown: CookingMasteryExperienceBreakdown = {
        base: 2, factors: [], additiveBonuses: [], additivePercent: 0, additiveMultiplier: 1, total: 2,
    };
    private purpleAllocations: number[] = [];
    private yellowAllocations: number[] = [];

    constructor() {
        this.upgrades = CookingMasteryUpgrade.fromBase(initCookingMasteryRepo());
    }

    getImageData(): ImageData {
        return { location: "CookingMastery", width: 44, height: 34 };
    }

    getPointImageData(kind: 'purple' | 'yellow'): ImageData {
        return {
            location: kind === 'purple' ? "CookingMasteryPurplePoints" : "CookingMasteryYellowPoints",
            width: 33,
            height: 18,
        };
    }

    parse(masteryData: number[][]): void {
        this.rank = Number(masteryData?.[1]?.[0] ?? 0);
        this.experience = Number(masteryData?.[1]?.[1] ?? 0);
        this.totalLadles = Number(masteryData?.[1]?.[3] ?? 0);
        this.purpleAllocations = (masteryData?.[2] ?? []).map(Number);
        this.yellowAllocations = (masteryData?.[0] ?? []).map(Number);
        this.upgrades.forEach(upgrade => upgrade.parse(this.purpleAllocations));
    }

    getLevel(): number {
        return this.rank;
    }

    getNativeRank(): number {
        return this.rank + 1;
    }

    getExperienceRequired(): number {
        return 100 * Math.pow(2.5, this.rank) * Math.pow(5, Math.max(0, this.rank - 40));
    }

    getTimeToNextLevelSeconds(): number | null {
        const rate = this.getExperienceRate();
        if (!this.unlocked || rate <= 0) return null;
        return Math.max(0, this.getExperienceRequired() - this.experience) / rate * 3600;
    }

    update(inputs: CookingMasteryInputs): void {
        this.unlocked = inputs.unlocked;
        this.unlockTier = cookingMetadata.masteryRankRequirements.reduce(
            (tier, requirement, index) => this.rank >= requirement ? index : tier, 0,
        );
        const context: CookingMasteryContext = {
            totalLadles: this.totalLadles,
            totalCookingLevels: inputs.totalCookingLevels,
            divorceCakeLevel: inputs.divorceCakeLevel,
            totalRibbonRanks: inputs.totalRibbonRanks,
            nativeRank: this.getNativeRank(),
        };
        this.upgrades.forEach(upgrade => upgrade.update(context, this.rank));

        // All saved allocations count, including meal slots beyond the displayed catalogue.
        const purpleSpent = this.purpleAllocations.reduce((total, amount) => Math.round(total + amount), 0);
        const yellowSpent = this.yellowAllocations.reduce((total, amount) => Math.round(total + amount), 0);
        const purpleTotal = Math.round(this.rank + (1 + 5 * Number(inputs.eventShopPointsOwned)
            + (5 * inputs.companionBonus + inputs.purpleJellyBonus)));
        const yellowTotal = Math.round(this.rank + (1 + 5 * Number(inputs.eventShopPointsOwned)
            + (5 * inputs.companionBonus + inputs.yellowJellyBonus))) + inputs.yellowResearchBonus;
        this.purplePoints = { total: purpleTotal, spent: purpleSpent, available: Math.max(0, purpleTotal - purpleSpent) };
        this.yellowPoints = { total: yellowTotal, spent: yellowSpent, available: Math.max(0, yellowTotal - yellowSpent) };

        const factorInputs: Pick<CookingMasteryExperienceBreakdown['factors'][number], 'source' | 'percent'>[] = [
            { source: 'salty', percent: this.upgrades[0].getContextualBonus() },
            { source: 'spicy', percent: this.upgrades[1].getContextualBonus() },
            { source: 'sweet', percent: this.upgrades[2].getContextualBonus() },
            { source: 'menagerie', percent: inputs.menagerieBonus },
            { source: 'sour', percent: this.upgrades[4].getContextualBonus() },
            { source: 'research', percent: inputs.researchBonus },
            { source: 'superbit', percent: 40 * Number(inputs.superbitPurchased) },
            { source: 'savory', percent: this.upgrades[5].getContextualBonus() },
            { source: 'companion', percent: 200 * inputs.companionBonus },
            { source: 'fountain', percent: inputs.fountainBonus },
        ];
        const factors = factorInputs.map(({ source, percent }) => {
            const multiplier = 1 + percent / 100;
            return { source, percent, multiplier, active: percent !== 0, impact: 1 - 1 / multiplier };
        });
        // Vial, Arcade, and Salt Lick percentages add together after the separate EXP multipliers.
        const additivePercent = inputs.vialBonus + (inputs.arcadeBonus + inputs.saltLickBonus);
        const additiveInputs: Pick<CookingMasteryExperienceBreakdown['additiveBonuses'][number], 'source' | 'percent'>[] = [
            { source: 'vial', percent: inputs.vialBonus },
            { source: 'arcade', percent: inputs.arcadeBonus },
            { source: 'saltLick', percent: inputs.saltLickBonus },
        ];
        const additiveBonuses = additiveInputs.map(({ source, percent }) => ({
            source, percent, active: percent !== 0, share: additivePercent === 0 ? 0 : percent / additivePercent,
        }));
        const additiveMultiplier = 1 + additivePercent / 100;
        const total = factors.reduce((rate, factor) => rate * factor.multiplier, 2) * additiveMultiplier;
        this.experienceBreakdown = { base: 2, factors, additiveBonuses, additivePercent, additiveMultiplier, total };
    }

    getExperienceRate(): number {
        // Availability is separate from the native raw EXP rate.
        return this.experienceBreakdown.total;
    }
}

export interface RibbonShelfSlot {
    readonly index: number;
    readonly rank: number | null;
}

export interface RibbonRankSummary {
    readonly rank: number;
    readonly mealCount: number;
    readonly multiplier: number;
}

export interface RibbonRankProbability {
    readonly rank: number;
    readonly probability: number;
}

export interface CookingDailyCountBreakdown {
    readonly sources: readonly {
        source: 'base' | 'dailyRoll' | 'legendTalent' | 'eventShop' | 'deathBringerBundle' | 'boaringBundle' | 'ribbonWinningTalent' | 'palette';
        group: 'base' | 'additional';
        amount: number;
        active: boolean;
        /** Fraction of this source's additive group before its multiplier. */
        share: number;
    }[];
    readonly baseTotal: number;
    readonly additionalTotal: number;
    readonly additiveTotal: number;
    readonly meritocracyMultiplier: number;
    /** Relative loss in the base group when Meritocracy alone is removed. */
    readonly meritocracyImpact: number;
    readonly expectedRawCount: number;
    readonly roundingAdjustment: number;
    readonly total: number;
}

export interface CookingDailyRibbonQuantity {
    readonly dailyCount: number;
    readonly minimumDailyCount: number;
    readonly maximumDailyCount: number;
    readonly dailyCountBreakdown: CookingDailyCountBreakdown;
}

export interface CookingDailyRankBreakdown {
    readonly sources: readonly {
        source: 'base' | 'grimoire' | 'sushi' | 'anniversaryBundle' | 'smoky' | 'armoryEventShop' | 'companion';
        amount: number;
        active: boolean;
        /** Fraction of expected rank before overflow replacement. */
        share: number;
    }[];
    readonly beforeOverflow: number;
    readonly overflowAdjustment: number;
    readonly total: number;
}

interface CookingRibbonInputs {
    grimoireShelfBonus: number;
    grimoireRankBonus: number;
    deathBringerBundleOwned: boolean;
    boaringBundleOwned: boolean;
    anniversaryBundleOwned: boolean;
    eventShopDailyOwned: boolean;
    eventShopRankOwned: boolean;
    meritocracyBonus: number;
    legendTalentBonus: number;
    ribbonWinningTalentBonus: number;
    paletteBonus: number;
    sushiBonus: number;
    smokyBonus: number;
    armoryBonus: number;
    companionBonus: number;
    companionLevelTwo: number;
}

export class CookingRibbons {
    shelf: readonly RibbonShelfSlot[] = Array.from({ length: 28 }, (_, index) => ({ index, rank: null }));
    unlocked: boolean = false;
    dailyGenerationUnlocked: boolean = false;
    totalRanks: number = 0;
    ribbonedMealCount: number = 0;
    mealCount: number = 0;
    readonly maxRank: number = cookingMetadata.maxRibbonRank;
    lowestRank: number | null = null;
    highestRank: number | null = null;
    rankSummaries: readonly RibbonRankSummary[] = [];
    dailyQuantity: CookingDailyRibbonQuantity = {
        dailyCount: 0,
        minimumDailyCount: 0,
        maximumDailyCount: 0,
        dailyCountBreakdown: {
            sources: [], baseTotal: 0, additionalTotal: 0, additiveTotal: 0,
            meritocracyMultiplier: 1, meritocracyImpact: 0,
            expectedRawCount: 0, roundingAdjustment: 0, total: 0,
        },
    };
    dailyRankProbabilities: readonly RibbonRankProbability[] = [];
    averageDailyRank: number = 0;
    dailyRankBreakdown: CookingDailyRankBreakdown = { sources: [], beforeOverflow: 0, overflowAdjustment: 0, total: 0 };
    private shelfPreviouslyUnlocked: boolean = false;

    getImageData(rank: number): ImageData {
        return { location: `Ribbon${rank - 1}`, width: 42, height: 41 };
    }

    parse(ribbonData: readonly number[], optionList: readonly number[]): void {
        this.shelf = Array.from({ length: 28 }, (_, index) => {
            const rank = Number(ribbonData[index] ?? 0);
            return { index, rank: rank === 0 ? null : rank };
        });
        this.shelfPreviouslyUnlocked = Number(optionList?.[337] ?? 0) === 1;
    }

    updateMealRanks(meals: readonly Meal[]): void {
        this.mealCount = meals.length;
        this.totalRanks = 0;
        this.ribbonedMealCount = 0;
        this.lowestRank = null;
        this.highestRank = null;
        const counts = new Map<number, number>();
        for (const meal of meals) {
            const rank = meal.ribbonLevel;
            this.totalRanks += rank;
            if (rank <= 0) continue;
            this.ribbonedMealCount++;
            this.lowestRank = this.lowestRank === null ? rank : Math.min(this.lowestRank, rank);
            this.highestRank = this.highestRank === null ? rank : Math.max(this.highestRank, rank);
            counts.set(rank, (counts.get(rank) ?? 0) + 1);
        }
        // All meals receive the same account ribbon inputs before this summary runs.
        this.rankSummaries = meals.length === 0 ? [] : Array.from({ length: this.maxRank }, (_, index) => {
            const rank = index + 1;
            return { rank, mealCount: counts.get(rank) ?? 0, multiplier: meals[0].getRibbonBonus(rank) };
        });
    }

    updateDaily(inputs: CookingRibbonInputs): void {
        this.unlocked = inputs.grimoireShelfBonus >= 1 || inputs.deathBringerBundleOwned || this.shelfPreviouslyUnlocked;
        this.dailyGenerationUnlocked = inputs.grimoireRankBonus >= 1 || inputs.deathBringerBundleOwned
            || inputs.boaringBundleOwned || inputs.eventShopDailyOwned;
        this.dailyQuantity = this.calculateDailyQuantity(inputs);
        this.updateDailyRanks(inputs);
    }

    private getCappedIncrements(value: number, cap: number): Map<number, number> {
        const lower = Math.floor(value);
        const fraction = value - lower;
        const distribution = new Map<number, number>();
        distribution.set(Math.min(cap, lower), 1 - fraction);
        if (fraction > 0) {
            const upper = Math.min(cap, lower + 1);
            distribution.set(upper, (distribution.get(upper) ?? 0) + fraction);
        }
        return distribution;
    }

    private calculateDailyQuantity(inputs: CookingRibbonInputs): CookingDailyRibbonQuantity {
        const palette = this.getCappedIncrements(inputs.paletteBonus / 100, 3);
        let paletteExpectation = 0;
        for (const [amount, probability] of palette) paletteExpectation += amount * probability;
        const sourceInputs: Pick<CookingDailyCountBreakdown['sources'][number], 'source' | 'group' | 'amount'>[] = [
            { source: 'base', group: 'base', amount: 1 },
            { source: 'dailyRoll', group: 'additional', amount: 0.5 },
            { source: 'legendTalent', group: 'base', amount: inputs.legendTalentBonus },
            { source: 'eventShop', group: 'base', amount: 3 * Number(inputs.eventShopDailyOwned) },
            { source: 'deathBringerBundle', group: 'base', amount: 5 * Number(inputs.deathBringerBundleOwned) },
            { source: 'boaringBundle', group: 'base', amount: 5 * Number(inputs.boaringBundleOwned) },
            { source: 'ribbonWinningTalent', group: 'additional', amount: inputs.ribbonWinningTalentBonus / 100 },
            { source: 'palette', group: 'additional', amount: paletteExpectation },
        ];
        const baseTotal = 1 + 3 * Number(inputs.eventShopDailyOwned)
            + (5 * Number(inputs.deathBringerBundleOwned) + 5 * Number(inputs.boaringBundleOwned)) + inputs.legendTalentBonus;
        const additionalTotal = 0.5 + inputs.ribbonWinningTalentBonus / 100 + paletteExpectation;
        const sources = sourceInputs.map(source => {
            const groupTotal = source.group === 'base' ? baseTotal : additionalTotal;
            return { ...source, active: source.amount !== 0, share: groupTotal === 0 ? 0 : source.amount / groupTotal };
        });
        const meritocracyMultiplier = 1 + inputs.meritocracyBonus / 100;
        const expectedRawCount = meritocracyMultiplier * baseTotal + additionalTotal;
        const counts = new Map<number, number>();
        if (this.dailyGenerationUnlocked) {
            for (const [paletteCount, paletteProbability] of palette) {
                // Only the base group receives Meritocracy. Integrate the final uniform roll exactly.
                const offset = meritocracyMultiplier * baseTotal + inputs.ribbonWinningTalentBonus / 100 + paletteCount;
                for (let count = Math.floor(offset); count < Math.ceil(offset + 1); count++) {
                    const probability = Math.max(0, Math.min(1, count + 1 - offset) - Math.max(0, count - offset));
                    if (probability > 0) counts.set(count, (counts.get(count) ?? 0) + probability * paletteProbability);
                }
            }
        }
        let dailyCount = 0;
        let minimumDailyCount = Infinity;
        let maximumDailyCount = -Infinity;
        for (const [count, probability] of counts) {
            dailyCount += count * probability;
            minimumDailyCount = Math.min(minimumDailyCount, count);
            maximumDailyCount = Math.max(maximumDailyCount, count);
        }
        return {
            dailyCount,
            minimumDailyCount: counts.size === 0 ? 0 : minimumDailyCount,
            maximumDailyCount: counts.size === 0 ? 0 : maximumDailyCount,
            dailyCountBreakdown: {
                sources, baseTotal, additionalTotal, additiveTotal: baseTotal + additionalTotal,
                meritocracyMultiplier, meritocracyImpact: 1 - 1 / meritocracyMultiplier,
                expectedRawCount: this.dailyGenerationUnlocked ? expectedRawCount : 0,
                roundingAdjustment: this.dailyGenerationUnlocked ? dailyCount - expectedRawCount : 0,
                total: dailyCount,
            },
        };
    }

    private addRankIncrements(ranks: ReadonlyMap<number, number>, increments: ReadonlyMap<number, number>): Map<number, number> {
        const result = new Map<number, number>();
        for (const [rank, probability] of ranks) {
            for (const [increment, incrementProbability] of increments) {
                const combinedProbability = probability * incrementProbability;
                if (combinedProbability <= 0) continue;
                const combinedRank = rank + increment;
                result.set(combinedRank, (result.get(combinedRank) ?? 0) + combinedProbability);
            }
        }
        return result;
    }

    private updateDailyRanks(inputs: CookingRibbonInputs): void {
        const chance = Math.max(0, Math.min(0.65,
            0.1 + (inputs.grimoireRankBonus + 15 * Number(inputs.deathBringerBundleOwned)) / 100));
        let continuing = new Map<number, number>([[1, 1]]);
        const stopped = new Map<number, number>();
        // Failures in the first two trials do not stop the roll. Later failures stop it.
        for (let trial = 0; trial < 7; trial++) {
            const next = new Map<number, number>();
            for (const [rank, probability] of continuing) {
                const success = probability * chance;
                const failure = probability * (1 - chance);
                if (success > 0) next.set(rank + 1, (next.get(rank + 1) ?? 0) + success);
                const failureTarget = trial >= 2 ? stopped : next;
                if (failure > 0) failureTarget.set(rank, (failureTarget.get(rank) ?? 0) + failure);
            }
            continuing = next;
        }
        for (const [rank, probability] of continuing) stopped.set(rank, (stopped.get(rank) ?? 0) + probability);
        let grimoireIncrement = 0;
        for (const [rank, probability] of stopped) grimoireIncrement += (rank - 1) * probability;
        const sushiChance = inputs.sushiBonus >= 1 ? 0.1 : 0;
        const armoryChance = Math.max(0, Math.min(1, (inputs.armoryBonus + 25 * Number(inputs.eventShopRankOwned)) / 100));
        const smoky = this.getCappedIncrements(inputs.smokyBonus > 0 ? inputs.smokyBonus / 100 : 0, 3);
        const companion = inputs.companionBonus === 1
            ? new Map([[5 + 3 * inputs.companionLevelTwo, 0.1], [3 + inputs.companionLevelTwo, 0.405], [1, 0.495]])
            : new Map([[0, 1]]);
        const increments: { source: CookingDailyRankBreakdown['sources'][number]['source']; distribution: Map<number, number> }[] = [
            { source: 'sushi', distribution: new Map([[0, 1 - sushiChance], [1, sushiChance]]) },
            { source: 'anniversaryBundle', distribution: new Map([[Number(inputs.anniversaryBundleOwned), 1]]) },
            { source: 'smoky', distribution: smoky },
            { source: 'armoryEventShop', distribution: new Map([[0, 1 - armoryChance], [1, armoryChance]]) },
            { source: 'companion', distribution: companion },
        ];
        const sourceInputs: Pick<CookingDailyRankBreakdown['sources'][number], 'source' | 'amount'>[] = [
            { source: 'base', amount: 1 }, { source: 'grimoire', amount: grimoireIncrement },
        ];
        let ranks = stopped;
        for (const increment of increments) {
            let amount = 0;
            for (const [value, probability] of increment.distribution) amount += value * probability;
            sourceInputs.push({ source: increment.source, amount });
            ranks = this.addRankIncrements(ranks, increment.distribution);
        }
        const beforeOverflow = sourceInputs.reduce((total, source) => total + source.amount, 0);
        const finalRanks = new Map<number, number>();
        // Native daily generation replaces ranks above 20 with rank 2; it does not cap them.
        for (const [rank, probability] of ranks) {
            const finalRank = rank > 20 ? 2 : rank;
            finalRanks.set(finalRank, (finalRanks.get(finalRank) ?? 0) + probability);
        }
        this.dailyRankProbabilities = [...finalRanks].sort(([left], [right]) => left - right)
            .map(([rank, probability]) => ({ rank, probability }));
        this.averageDailyRank = this.dailyRankProbabilities.reduce((total, entry) => total + entry.rank * entry.probability, 0);
        this.dailyRankBreakdown = {
            sources: sourceInputs.map(source => ({
                ...source, active: source.amount !== 0, share: beforeOverflow === 0 ? 0 : source.amount / beforeOverflow,
            })),
            beforeOverflow,
            overflowAdjustment: this.averageDailyRank - beforeOverflow,
            total: this.averageDailyRank,
        };
    }
}

export class NoMealLeftBehind {
    enabled: boolean = false;
    jadeUpgradeOwned: boolean = false;
    bundleOwned: boolean = false;
    dailyMealCount: number = 0;
    dailyLevelGain: number = 0;
    targetMealIndex: number | null = null;
    currentLevel: number | null = null;
    nextLevel: number | null = null;
    effectiveLevelGain: number = 0;
    readonly minimumMealLevel: number = 2;
    levelLimit: number = 30;

    getImageData(): ImageData {
        return { location: "NjJupg16", width: 128, height: 78 };
    }

    update(meals: readonly Meal[], jadeUpgradeOwned: boolean, bundleOwned: boolean, maximumMealLevel: number): void {
        this.jadeUpgradeOwned = jadeUpgradeOwned;
        this.bundleOwned = bundleOwned;
        this.enabled = jadeUpgradeOwned || bundleOwned;
        this.dailyMealCount = this.enabled ? 1 : 0;
        this.dailyLevelGain = Number(jadeUpgradeOwned) + 2 * Number(bundleOwned);
        this.levelLimit = Math.min(150, maximumMealLevel);
        this.targetMealIndex = null;
        this.currentLevel = null;
        this.nextLevel = null;
        this.effectiveLevelGain = 0;
        for (const meal of meals) meal.noMealLeftBehindAffected = false;
        if (!this.enabled) return;

        let target: Meal | null = null;
        for (const meal of meals) {
            if (meal.level < this.minimumMealLevel || meal.level >= maximumMealLevel) continue;
            // Equal-level meals favor the later meal in the catalogue.
            if (target === null || meal.level < target.level
                || (meal.level === target.level && meal.mealIndex > target.mealIndex)) {
                target = meal;
            }
        }
        // The daily award stops at level 150, even when meals can reach a higher level.
        if (target === null || target.level >= this.levelLimit) return;

        this.targetMealIndex = target.mealIndex;
        this.currentLevel = target.level;
        this.nextLevel = Math.min(this.levelLimit, target.level + this.dailyLevelGain);
        this.effectiveLevelGain = this.nextLevel - this.currentLevel;
        target.noMealLeftBehindAffected = true;
    }
}

export class Cooking extends Domain {
    meals: Meal[] = [];
    spices: number[] = [];
    kitchens: Kitchen[] = [...Array(10)].map((_, index) => { return new Kitchen(index) });
    readonly mastery: CookingMastery = new CookingMastery();
    readonly ribbons: CookingRibbons = new CookingRibbons();
    readonly noMealLeftBehind: NoMealLeftBehind = new NoMealLeftBehind();

    bestBerserker: Player | undefined;
    totalCookingSpeed: Stat = new Stat("Total Cooking Speed");
    totalCookingSpeedWithoutStarSign: Stat = new Stat("Total Cooking Speed Without Star Sign");
    totalCookingSpeedWithSilkrode: Stat = new Stat("Total Cooking Speed With Silkrode");

    mealsDiscovered: number = 0;
    mealsAtVoid: number = 0;
    mealsAtDiamond: number = 0;

    foodLustDiscountCapped: boolean = false;

    starSignUnlocked: boolean = false;
    starSignInfinity: boolean = false;

    isCookingMasteryUnlocked(rift: Rift, companions: Companion[]): boolean {
        return rift.level > 58 || getCompanionActiveBonus(companions, 87) > 0.1;
    }

    getMasteryExperienceRate(): number {
        return this.mastery.getExperienceRate();
    }

    getMaxMeals = () => {
        return this.meals.length;
    }

    getTotalCookingSpeed = (starSignEquipped: boolean, silkrodeBonus: boolean) => {
        return starSignEquipped ? (silkrodeBonus ? this.totalCookingSpeedWithSilkrode.value : this.totalCookingSpeed.value) : this.totalCookingSpeedWithoutStarSign.value;
    }

    getZerkerBonus = () => {
        return this.bestBerserker?.talents.find(talent => talent.skillIndex == 148)?.getBonus(false, false, true) ?? 0;
    }

    getMealsFromSpiceValues = (valueOfSpices: number[]): number[] => {
        const possibleMeals: number[] = [];
        // Each spice value is also a possible meal.
        valueOfSpices.forEach(value => {
            if (!possibleMeals.includes(value)) {
                possibleMeals.push(value);
            }
        });
        // the sum of spice indexes is a possible meal.
        let sum = valueOfSpices.reduce((sum, value) => sum += spiceValues.indexOf(value), 0);
        // New W6 meals require at least one W6 spice, so filter those out if we don't have at least one w6 spice
        // This exact number of -14 and min of 55 is stolen from the code. So .. it works :shrug:
        if (sum > 71) {
            sum = sum - 14;
        }
        else {
            sum = Math.min(55, sum);
        }
        if (!spiceValues.includes(sum)) {
            possibleMeals.push(sum);
        }

        // if we have 3 or more spices, add sum - 1.
        if (valueOfSpices.length > 2 && !possibleMeals.includes(sum - 1) && !spiceValues.includes(sum - 1)) {
            possibleMeals.push(sum - 1);
        }
        // if we have more than one spice, add sum + 1.
        if (valueOfSpices.length > 1 && !possibleMeals.includes(sum + 1) && !spiceValues.includes(sum + 1)) {
            possibleMeals.push(sum + 1);
        }

        // remove all outcomes that are larger than the current number of available meals in the game and return sorted by lowest meal to highest.
        return possibleMeals.filter(meal => meal < this.meals.length).sort((meal1, meal2) => meal1 < meal2 ? -1 : 1);
    }

    spicesToValues = (spices: number[]) => {
        return spices.map(spice => spiceValues[spice]);
    }

    getRecipeTime = (possibleMeals: number[]) => {
        const lastMeal = possibleMeals[possibleMeals.length - 1];
        if (lastMeal < this.meals.length) {
            return 2 * this.meals[lastMeal].cookReq
        }
        // I forgot what this code does, so no idea why we have this weird default. I'm going to set it to the last meal cooking req
        return 2 * 50000000000000000
    }

    getNextKitchenCost = () => {
        const currentKitchens = this.kitchens.filter(kitchen => kitchen.status != KitchenStatus.Locked).length;
        switch (currentKitchens) {
            case 1: return 82e5;
            case 2: return 75e6;
            case 3: return 4e8;
            case 4: return 8e9;
            case 5: return 5e10;
            case 6: return 213e10;
            case 7: return 6e13;
            case 8: return 2e15;
            case 9: return 1e17;
        }
    }

    getMealBonusForKey = (bonusKey: string) => {
        return this.meals.filter(meal => meal.bonusKey == bonusKey).reduce((sum, meal) => sum += meal.getBonus(), 0);
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Cooking", perPlayer: false, default: [] },
            { key: "Meals", perPlayer: false, default: [] },
            { key: "Ribbon", perPlayer: false, default: [] },
            { key: "CookMaster", perPlayer: false, default: [] },
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.meals = Meal.fromBase(initMealRepo());
        this.spices = [...Array(territoryNiceNames.length - 1)].map(_ => 0);

        populateDiscovery(this);
        return this;
    }

    parse(data: Map<string, any>): void {
        const cooking = data.get(this.getDataKey()) as Cooking;
        const cookingData = data.get("Cooking") as number[][];
        const mealsData = data.get("Meals") as number[][];
        const ribbonData = data.get("Ribbon") as number[];
        const cookMasterData = data.get("CookMaster") as number[][];

        cooking.mastery.parse(cookMasterData);
        cooking.ribbons.parse(ribbonData, data.get("OptLacc") as number[]);
        cooking.meals.forEach(meal => meal.parse(mealsData, ribbonData, cookMasterData));

        if (cookingData.length == 0 || mealsData.length == 0) {
            return;
        }

        cooking.spices = mealsData[3];
        cookingData.forEach((kitchen, index) => {
            if (index > cooking.kitchens.length) {
                return;
            }
            cooking.kitchens[index].status = kitchen[0];
            cooking.kitchens[index].mealLevels = kitchen[6];
            cooking.kitchens[index].recipeLevels = kitchen[7];
            cooking.kitchens[index].luckLevels = kitchen[8];
            cooking.kitchens[index].progress = kitchen[10];
            cooking.kitchens[index].activeMeal = kitchen[1];
            cooking.kitchens[index].activeRecipe = kitchen.slice(2, 6).filter(number => number != -1);
        })
    }
}

const populateDiscovery = (cooking: Cooking) => {
    const mealsThatCanBeDiscovered = cooking.meals.length;

    const availableValues = cooking.spicesToValues(cooking.spices.map((spice, index) => spice != -1 ? index : -1).filter(value => value != -1));

    const outputlucktime = [...Array(mealsThatCanBeDiscovered)].map((_, _index) => 50000000000000000 * 2 / .004)
    const outputLuck = [...Array(mealsThatCanBeDiscovered)].map((_, _index) => 0)
    for (const len of range(0, 3)) {
        const possibleCombinations = combinations(availableValues, len + 1);
        for (const combination of possibleCombinations) {
            const possibleMeals = cooking.getMealsFromSpiceValues(combination);
            const time = cooking.getRecipeTime(possibleMeals);
            const firstKitchenLuck = cooking.kitchens[0].recipeLuck;
            const firstKitchenFire = cooking.kitchens[0].fireSpeed;
            possibleMeals.slice(0, 6).forEach((meal, index) => {
                if (meal < mealsThatCanBeDiscovered) {
                    let notOdds = 1;
                    // Get the chance to cook this meal based on it's index in the possible meal array
                    const mealChance = Math.min(mealLuckValues[index] * firstKitchenLuck, 1);
                    // If we have more then one possible meal, calculate the chance of hitting the other meals.
                    if (possibleMeals.length > 1) {
                        for (let reverseIndex = possibleMeals.length; reverseIndex > index; reverseIndex--) {
                            notOdds *= 1 - Math.min(mealLuckValues[reverseIndex] * firstKitchenLuck, 1);
                        }
                    }
                    // Calculate "real chance to hit meal".
                    const realLuck = mealChance * notOdds;
                    const luckTime = time / realLuck;
                    if (luckTime < outputlucktime[meal] || (luckTime == outputlucktime[meal] && combination.length < cooking.meals[meal].timeOptimalSpices.length)) {
                        outputlucktime[meal] = luckTime;
                        cooking.meals[meal].timeDiscoveryTime = time / (firstKitchenFire / 3600);
                        cooking.meals[meal].timeDiscoveryChance = realLuck;
                        cooking.meals[meal].timeOptimalSpices = combination.map(value => spiceValues.indexOf(value));
                    }
                    if (realLuck > outputLuck[meal]) {
                        outputLuck[meal] = realLuck;
                        cooking.meals[meal].chanceDiscoveryTime = time / (firstKitchenFire / 3600);
                        cooking.meals[meal].chanceDiscoveryChance = realLuck;
                        cooking.meals[meal].chanceOptimalSpices = combination.map(value => spiceValues.indexOf(value));
                    }
                }
            })
        }
    }
}

export const updateCooking = (data: Map<string, any>) => {
    const cooking = data.get("cooking") as Cooking;
    const account = data.get("account") as Account;
    const gemStore = data.get("gems") as GemStore;
    const alchemy = data.get("alchemy") as Alchemy;
    const stamps = data.get("stamps") as Stamp[][];
    const mainframe = data.get("lab") as Lab;
    const cards = data.get("cards") as Card[];
    const breeding = data.get("breeding") as Breeding;
    const achievements = data.get("achievements") as Achievement[];
    const sigils = data.get("sigils") as Sigils;
    const players = data.get("players") as Player[];
    const sailing = data.get("sailing") as Sailing;
    const collider = data.get("collider") as AtomCollider;
    const worship = data.get("worship") as Worship;
    const equinox = data.get("equinox") as Equinox;
    const farming = data.get("farming") as Farming;
    const summoning = data.get("summoning") as Summoning;
    const arcade = data.get("arcade") as Arcade;
    const sneaking = data.get("sneaking") as Sneaking;
    const starSigns = data.get("starsigns") as StarSigns;
    const islandExpeditions = data.get("islandExpeditions") as IslandExpeditions;
    const upgradeVault = data.get("upgradeVault") as UpgradeVault;
    const hole = data.get("hole") as Hole;
    const votes = data.get("votes") as Votes;
    const equipmentSets = data.get("equipmentSets") as EquipmentSets;
    const companions = data.get("companions") as Companion[];
    const button = data.get("button") as Button;
    const jellyOperator = data.get("jellyOperator") as JellyOperator;
    const eventShop = data.get("eventShop") as EventShop;
    const menagerie = data.get("menagerie") as Menagerie;
    const gaming = data.get("gaming") as Gaming;
    const research = data.get("research") as ResearchGrid;
    const saltLick = data.get("saltLick") as SaltLick;
    const spelunking = data.get("spelunking") as Spelunking;
    const grimoire = data.get("grimoire") as Grimoire;
    const clamworks = data.get("clamworks") as Clamworks;
    const companion162Bonus = getCompanionActiveBonus(companions, 162);

    const bestLadleSkillLevel = Math.max(...players.flatMap(player => (player.talents.find(talent => talent.skillIndex == 148)?.maxLevel ?? 0)));
    if (bestLadleSkillLevel > 0) {
        cooking.bestBerserker = players.find(player => player.talents.find(talent => talent.skillIndex == 148 && talent.maxLevel == bestLadleSkillLevel) != undefined);
    }

    cooking.kitchens.forEach(kitchen => {
        kitchen.richelin = (gemStore.purchases.find(purchase => purchase.no == 120)?.pucrhased ?? -1) > kitchen.index;
    });

    const jewelMealBonus = mainframe.jewels[16].active ? mainframe.jewels[16].getBonus() : 0;
    const voidPlateAchiev = achievements[233].completed;
    const foodLust = (equinox.upgrades[9] as FoodLust);
    const ribbonCloudBonus = equinox.getChallengeBonus(73);
    const ribbonJellyBonus = jellyOperator.getObstructionBonus(60);
    cooking.meals.forEach(meal => {
        meal.mainframeBonus = jewelMealBonus;
        meal.companion162Bonus = companion162Bonus;
        meal.reducedCostToUpgrade = voidPlateAchiev;
        meal.foodLustDiscount = foodLust.getBonus();
        meal.armorSetBonus = equipmentSets.getSetBonus("EMPEROR_SET", true);
        meal.ribbonCloudBonus = ribbonCloudBonus;
        meal.ribbonJellyBonus = ribbonJellyBonus;

        // Reset any previously calculated info, the next section should re-populate this.
        meal.cookingContribution = 0;
        meal.cookingContributionWithoutStarSign = 0;
        meal.cookingContributionWithSilkrode = 0;
        meal.cookingTotalSpeed = 0;
        meal.cookingTotalSpeedWithoutStarSign = 0;
        meal.cookingTotalSpeedWithSilkrode = 0;
    });

    cooking.foodLustDiscountCapped = foodLust.isCapped();

    cooking.ribbons.updateMealRanks(cooking.meals);
    cooking.mastery.update({
        totalCookingLevels: players.reduce((total, player) => total + (player.skills.get(SkillsIndex.Cooking)?.level ?? 0), 0),
        divorceCakeLevel: cooking.meals[73].level,
        totalRibbonRanks: cooking.ribbons.totalRanks,
        unlocked: cooking.isCookingMasteryUnlocked(data.get("rift") as Rift, companions),
        eventShopPointsOwned: eventShop.isBonusOwned(54),
        purpleJellyBonus: jellyOperator.getObstructionBonus(13),
        yellowJellyBonus: jellyOperator.getObstructionBonus(5),
        yellowResearchBonus: research.getBonusForId(190, 1),
        menagerieBonus: menagerie.getBonusValue(21),
        researchBonus: research.getBonusForId(190),
        superbitPurchased: gaming.isSuperbitPurchased(68),
        companionBonus: getCompanionActiveBonus(companions, 87),
        fountainBonus: hole.getFountainBonus(2, 17),
        vialBonus: alchemy.getVialBonusForKey("7cookmastery"),
        arcadeBonus: arcade.bonuses[69].getBonus(),
        saltLickBonus: saltLick.getBonus(10),
    });

    // Meal speed
    const mealCookVialBonus = alchemy.getVialBonusForKey("MealCook");
    const fireflyVialBonus = alchemy.getVialBonusForKey("6CookSpd");
    const turtleVialBonus = alchemy.getVialBonusForKey("6turtle");
    const diamonChef = alchemy.getBubbleBonusForKey("MealSpdz");
    const stampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("Meal Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
    const mealSpeedBonus = cooking.getMealBonusForKey("Mcook");
    const meal63Bonus = cooking.getMealBonusForKey("zMealFarm");
    const kitchenEfficientBonus = cooking.getMealBonusForKey("KitchenEff");
    const jewel0Bonus = mainframe.jewels[0].getBonus();
    const jewel14Bonus = mainframe.jewels[14].getBonus();
    const trollCardBonus = cards.find(card => card.id == "Boss4A")?.getBonus() ?? 0;
    const ceramicCardBonus = cards.find(card => card.id == "w6c1")?.getBonus() ?? 0;
    const artifactBonus = sailing.artifacts[13].getBonus();
    const crucible5Bonus = breeding.getCrucibleBonus(5);
    const crucible12Bonus = breeding.getCrucibleBonus(12);
    const buttonBonus7 = button.getBonusForIndex(7);
    const atomBonus = collider.atoms[8].getBonus();
    const worshipBonus = worship.totalizer.getBonus(TotalizerBonus.Cooking);
    const starsign58 = Math.max(...players.map(player => player.starSigns.find(sign => sign.name == "Gordonius Major")?.getBonus("Cooking SPD (Multiplicative!)") ?? 0), 0);
    const cropScientistBonus = farming.cropScientist.getBonus(CropScientistBonusText.CookingSpeed);
    const arcadeBonus = arcade.bonuses[28].getBonus();
    const summonBonus = summoning.summonBonuses.find(bonus => bonus.data.bonusId == 16);
    const winnerBonus = summonBonus?.getBonus() ?? 0;
    const eventShopDoughRollerBonus = eventShop.isBonusOwned(53) ? 1 : 0;
    const clamPromotion10Bonus = Number(clamworks.isBonusUnlocked(10));

    const bestBloodMarrowTalent = players
        .map(player => player.talents.find(talent => talent.skillIndex === 59))
        .filter(talent => talent !== undefined)
        .sort((a, b) => (b?.getBonus() ?? 0) - (a?.getBonus() ?? 0))[0];
    const bestbloodMarrowBonus = bestBloodMarrowTalent?.getBonus() ?? 0;

    const bestApocalypseChowTalent = players
        .map(player => player.talents.find(talent => talent.skillIndex === 146))
        .filter(talent => talent !== undefined)
        .sort((a, b) => (b?.getEnhancedBonus() ?? 0) - (a?.getEnhancedBonus() ?? 0))[0];
    const bestapocalypseChowBonus = bestApocalypseChowTalent?.getEnhancedBonus() ?? 0;

    const vaultUpgrade54 = upgradeVault.bonuses.find(bonus => bonus.id === 54);
    const upgradeVaultBonus = vaultUpgrade54?.getBonus(upgradeVault.bonuses) ?? 0;
    const holeSchematic56 = hole.getSchematicBonus(56);
    // TODO: Fix lamp bonus to be correct.
    const holeLampBonus = hole.lamp.getBonus(false, 0, 0);
    const holeBraveyCookingSpeedBonus = hole.monuments.monuments["Bravery"].bonuses.find(bonus => bonus.index == 2);
    const holeBravey2Bonus = holeBraveyCookingSpeedBonus?.getBonus() ?? 0;
    const votingBonus13 = votes.getCurrentBonus(13);
    // TODO: Include currently unused bonuses into the math.

    // Fire speed
    const fireVialBonus = alchemy.getVialBonusForKey("RecCook");
    const fireStampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("New Recipe Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
    const fireSpeedMealBonus = cooking?.meals.filter(meal => meal.bonusKey == "Rcook").reduce((sum, meal) => sum += meal.getBonus(), 0);

    // Kitchen upgrade costs
    const kitchenCosts = alchemy.vials.filter(vial => vial.description.includes("Kitchen Upgrading Cost")).reduce((sum, vial) => sum += vial.getBonus(), 0);
    const mealKitchenCosts = cooking?.meals.filter(meal => meal.bonusKey == "KitchC").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const arenaBonusActive = breeding.hasBonus(7);
    const islandExpeditionReduction = islandExpeditions.reductionToKitchenCosts;

    const cookingSpeedParameters: KitchenSpeedParameters = {
        starsign58bonus: starsign58,
        mealCookVialBonus: mealCookVialBonus,
        fireflyVialBonus: fireflyVialBonus,
        turtleVialBonus: turtleVialBonus,
        summoningWinnerBonus: winnerBonus,
        stampBonus: stampBonus,
        meal63Bonus: meal63Bonus,
        mealCookBonus: mealSpeedBonus,
        jewel0Bonus: jewel0Bonus,
        trollCardBonus: trollCardBonus,
        ceramicCardBonus: ceramicCardBonus,
        kitchenEffBonus: kitchenEfficientBonus,
        jewel14Bonus: jewel14Bonus,
        diamonChef: diamonChef,
        achieve225: achievements[225].completed,
        achieve224: achievements[224].completed,
        atom8Bonus: atomBonus,
        artifact13Bonus: artifactBonus,
        crucible5Bonus: crucible5Bonus,
        crucible12Bonus: crucible12Bonus,
        buttonBonus7: buttonBonus7,
        totalizerBonus: worshipBonus,
        bloodMarrowBonus: bestbloodMarrowBonus,
        superChowBonus: bestapocalypseChowBonus,
        eventShopDoughRollerBonus: eventShopDoughRollerBonus,
        clamPromotion10Bonus: clamPromotion10Bonus,
        cropScientistBonus: cropScientistBonus,
        farmingLevel: farming.farmingLevel,
        arcadeBonus: arcadeBonus,
        votingBonus13: votingBonus13,
        vaultBonus54: upgradeVaultBonus,
        holeBravey2Bonus: holeBravey2Bonus,
        holeSchematic56: holeSchematic56,
        lampBonus00: holeLampBonus,
        menagerieMultiplier: menagerie.getBonusMultiplier(4)
    }

    let totalCookingSpeed = 0;
    let totalCookingSpeedWithoutStarSign = 0;
    let totalCookingSpeedWithSilkrode = 0;
    cooking.kitchens.forEach((kitchen, _) => {
        kitchen.mealSpeed = kitchen.getMealSpeed(cookingSpeedParameters);
        kitchen.mealSpeedWithoutStarSign = kitchen.getMealSpeed({ ...cookingSpeedParameters, starsign58bonus: 0 });
        kitchen.mealSpeedWithSilkrode = kitchen.getMealSpeed({ ...cookingSpeedParameters, starsign58bonus: cookingSpeedParameters.starsign58bonus * 2 });
        kitchen.fireSpeed = kitchen.getFireSpeed(fireVialBonus, fireStampBonus, fireSpeedMealBonus, trollCardBonus, kitchenEfficientBonus, diamonChef, atomBonus, worshipBonus);
        kitchen.recipeLuck = kitchen.getLuck();

        kitchen.speedUpgradeCost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Speed, sigils.sigils[18].getBonus(), islandExpeditionReduction);
        kitchen.fireUpgradeCost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Fire, sigils.sigils[18].getBonus(), islandExpeditionReduction);
        kitchen.luckUpgradecost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Luck, sigils.sigils[18].getBonus(), islandExpeditionReduction);

        // if actively cooking
        if (kitchen.activeMeal != -1) {
            cooking.meals[kitchen.activeMeal].cookingContribution += kitchen.mealSpeed;
            cooking.meals[kitchen.activeMeal].cookingContributionWithoutStarSign += kitchen.mealSpeedWithoutStarSign;
            cooking.meals[kitchen.activeMeal].cookingContributionWithSilkrode += kitchen.mealSpeedWithSilkrode;
            totalCookingSpeed += kitchen.mealSpeed;
            totalCookingSpeedWithoutStarSign += kitchen.mealSpeedWithoutStarSign;
            totalCookingSpeedWithSilkrode += kitchen.mealSpeedWithSilkrode;
        }
    })

    // Every meal shares one account-wide level cap.
    const artifactMaxMealLevel = sailing.artifacts[17].getBonus();
    const jadeUpgradeMaxMealLevel = (sneaking.jadeUpgrades.find(upgrade => upgrade.index == 20)?.purchased ? 10 : 0) + (sneaking.jadeUpgrades.find(upgrade => upgrade.index == 21)?.purchased ? 10 : 0)
    const maximumMealLevel = Math.round(
        30 + artifactMaxMealLevel + jadeUpgradeMaxMealLevel
        + 30 * Number(spelunking.tunnels[5].loreCompleted)
        + Math.min(20, grimoire.upgrades[26].getBonus(grimoire.upgrades))
        + 10 * Number(menagerie.getUnlocks()[20].owned)
    );
    cooking.meals.forEach(meal => {
        meal.maxLevel = maximumMealLevel;

        meal.cookingTotalSpeed = totalCookingSpeed;
        meal.cookingTotalSpeedWithoutStarSign = totalCookingSpeedWithoutStarSign;
        meal.cookingTotalSpeedWithSilkrode = totalCookingSpeedWithSilkrode;

        // No need to do any maths for max level meals.
        if (meal.level == meal.maxLevel) {
            return;
        }
    });

    cooking.noMealLeftBehind.update(
        cooking.meals,
        sneaking.jadeUpgrades.find(upgrade => upgrade.data.name == "No Meal Left Behind")?.purchased ?? false,
        account.hasNoMealLeftBehindBundle,
        maximumMealLevel,
    );

    populateDiscovery(cooking);

    // Nice to have maths
    cooking.totalCookingSpeed.value = totalCookingSpeed;
    cooking.totalCookingSpeed.sources.push(
        { name: `Blood Marrow - (Level ${bestBloodMarrowTalent?.level}) Talent`, value: bestBloodMarrowTalent?.getBonus() },
        { name: "Crop Scientist", value: Math.max(1, cookingSpeedParameters.cropScientistBonus) },
        { name: `Super Chow (Level ${bestApocalypseChowTalent.level}) - Talent`, value: bestApocalypseChowTalent.getEnhancedBonus() },
        { name: "Voting Bonus", value: cookingSpeedParameters.votingBonus13 },
        { name: "Kitchen Dream-mare - Vault", value: (1 + upgradeVaultBonus / 100).toFixed(2) },
        { name: `Burned Marshmallow (Farming Level ${cookingSpeedParameters.farmingLevel}) - Meal`, value: cookingSpeedParameters.meal63Bonus * Math.ceil((cookingSpeedParameters.farmingLevel + 1) / 50) },
        { name: "Diamon Chef - Bubble", value: Math.max(1, cookingSpeedParameters.diamonChef) },
        { name: "Fluoride - Atom", value: Math.max(0, 100 * (cookingSpeedParameters.atom8Bonus - 1)), format: "Big" },
        { name: "Totalizer", value: cookingSpeedParameters.totalizerBonus },
        { name: "Triagulon - Artifact", value: cookingSpeedParameters.artifact13Bonus, format: "None" },
        { name: "Arcade", value: cookingSpeedParameters.arcadeBonus },
        { name: "Turtle - Vial", value: cookingSpeedParameters.turtleVialBonus, format: "None" },
        { name: "Dreadnog - Vial", value: alchemy.vials.find(vial => vial.data.name === "Dreadnog")?.getBonus() ?? 0, format: "None" },
        { name: "Long Island Tea - Vial", value: alchemy.vials.find(vial => vial.data.name === "Long Island Tea")?.getBonus() ?? 0, format: "None" },
        { name: "Cooked Meal Stamp", value: cookingSpeedParameters.stampBonus },
        { name: "Emerald Pyramite Jewel", value: Math.max(0, cookingSpeedParameters.jewel14Bonus) }
    );

    cooking.totalCookingSpeed.sources.push(...
        cooking.meals.filter(meal => meal.bonusKey == "Mcook").map(meal => (
            { name: meal.name, value: meal.getBonusText() }
        ))
    );

    cooking.totalCookingSpeed.sources.push(
        { name: "Gordonius Major - Star Sign", value: cookingSpeedParameters.starsign58bonus },
        { name: "Summoning Winner Bonus", value: summonBonus?.getBonusText() ?? "N/A" },
        { name: "Bravery - Monument", value: holeBraveyCookingSpeedBonus?.getDescription() ?? "N/A" },
        { name: "Heavy Redstone Seasoning - Hole Schematic", value: Math.max(1, cookingSpeedParameters.holeSchematic56) },
        { name: "Ceramic - Card", value: cookingSpeedParameters.ceramicCardBonus },
        { name: "Lamp Bonus", value: cookingSpeedParameters.lampBonus00 },
        { name: "Firefly - Vial", value: cookingSpeedParameters.fireflyVialBonus },
        { name: "Amethyst Rhinestone - Jewel", value: Math.max(1, cookingSpeedParameters.jewel0Bonus) },
        { name: "Troll Card + Achievements", value: Math.min(cookingSpeedParameters.trollCardBonus + (20 * (cookingSpeedParameters.achieve225 ? 1 : 0) + 10 * (cookingSpeedParameters.achieve224 ? 1 : 0)), 100) },
        { name: "Cabbage - Meal (Kitchen 0)", value: cookingSpeedParameters.kitchenEffBonus * Math.floor((cooking.kitchens[0].mealLevels + (cooking.kitchens[0].recipeLevels + cooking.kitchens[0].luckLevels)) / 10) }
    );

    cooking.totalCookingSpeedWithoutStarSign.value = totalCookingSpeedWithoutStarSign;
    cooking.totalCookingSpeedWithSilkrode.value = totalCookingSpeedWithSilkrode;
    cooking.mealsDiscovered = cooking.meals.filter(meal => meal.level > 0).length;
    cooking.mealsAtVoid = cooking.meals.reduce((count, meal) => count += meal.level >= 30 ? 1 : 0, 0);
    cooking.mealsAtDiamond = cooking.meals.reduce((sum, meal) => sum += meal.level >= 11 ? 1 : 0, 0);
    cooking.starSignUnlocked = starSigns.isStarSignUnlocked("Gordonius Major");
    cooking.starSignInfinity = (starSigns.infinityStarSigns.find(sign => sign.name == "Gordonius Major") != undefined);

    return cooking;
}

export const updateCookingRibbons = (data: Map<string, any>): void => {
    const cooking = data.get("cooking") as Cooking;
    const account = data.get("account") as Account;
    const players = data.get("players") as Player[];
    const companions = data.get("companions") as Companion[];
    const eventShop = data.get("eventShop") as EventShop;
    const grimoire = data.get("grimoire") as Grimoire;
    const meritocraty = data.get("meritocraty") as Meritocraty;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const gaming = data.get("gaming") as Gaming;
    const sushi = data.get("sushi") as SushiStation;
    const royalArmory = data.get("royalArmory") as RoyalArmory;

    // Daily ribbon estimates use the highest Ribbon Winning bonus available across characters.
    let ribbonWinningTalentBonus = 0;
    for (const player of players) {
        ribbonWinningTalentBonus = Math.max(ribbonWinningTalentBonus,
            Talent.getAccountTalentBonus(players, 204, player.finalTalentInputs));
    }

    cooking.ribbons.updateDaily({
        grimoireShelfBonus: grimoire.getUpgradeBonus(4),
        grimoireRankBonus: grimoire.getUpgradeBonus(5),
        deathBringerBundleOwned: account.bundles.getOwnership("bun_v") === "owned",
        boaringBundleOwned: account.bundles.getOwnership("ban_f") === "owned",
        anniversaryBundleOwned: account.bundles.getOwnership("ban_a") === "owned",
        eventShopDailyOwned: eventShop.isBonusOwned(13),
        eventShopRankOwned: eventShop.isBonusOwned(51),
        meritocracyBonus: meritocraty.getCurrentBonus(11),
        legendTalentBonus: legendTalents.getBonusFromIndex(13),
        ribbonWinningTalentBonus,
        paletteBonus: gaming.getPaletteBonus(33),
        sushiBonus: sushi.getBonusFromIndex(14),
        smokyBonus: cooking.mastery.upgrades[3].getContextualBonus(),
        armoryBonus: royalArmory.getUpgradeBonus(82),
        companionBonus: getCompanionActiveBonus(companions, 169),
        companionLevelTwo: isCompanionLevelTwo(companions, 169),
    });
};
