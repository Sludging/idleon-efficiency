import { nFormatter, notUndefined, round } from "../utility"
import { Achievement } from "./achievements";
import { Alchemy } from "./alchemy";
import { AtomCollider } from "./atomCollider";
import { Breeding, territoryNiceNames } from "./breeding";
import { Card } from "./cards";
import { initMealRepo, MealBase } from "./data/MealRepo";
import { Worship, TotalizerBonus } from "./worship";
import { GemStore } from "./gemPurchases";
import { ImageData } from "./imageData";
import { Lab } from "./lab";
import { MealModel } from "./model/mealModel";
import { Player } from "./player";
import { Sailing } from "./sailing";
import { Sigils } from "./sigils";
import { Stamp } from "./stamps";
import { ClassIndex } from "./talents";
import { Domain, RawData } from "./base/domain";
import { Item } from "./items";
import { Equinox, FoodLust } from "./equinox";
import { CropScientistBonusText, Farming } from "./world-6/farming";
import { Summoning } from "./world-6/summoning";
import { Arcade } from "./arcade";
import { Sneaking } from "./world-6/sneaking";
import { StarSigns } from "./starsigns";
import { IslandExpeditions } from './islandExpedition';

const spiceValues: number[] = "0 3 5 8 10 13 15 19 20 23 27 31 33 37 41 45 48 50 53 56 58 60 63 66".split(" ").map(value => parseInt(value));
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
    for (let next of range(idx ? last(loc) + 1 : 0, n - r + idx)) { yield* numericCombinations(n, r, loc.concat(next)); }
}

function* combinations<T>(arr: T[], r: number) {
    for (let idxs of numericCombinations(arr.length, r)) { yield idxs.map(i => arr[i]); }
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

    getImageData = (): ImageData => {
        return {
            location: `CookingM${this.mealIndex}`,
            width: 41,
            height: 32
        }
    }

    getBonus = (roundResult: boolean = false, mainFrameBonus: number = this.mainframeBonus, level: number = this.level) => {
        // Jewel doesn't impact the line width meals.
        if (this.bonusKey == "PxLine" || this.bonusKey == "LinePct") {
            const finalMath = level * this.bonusQty;
            return roundResult ? round(finalMath) : finalMath;
        }

        const finalMath = (1 + ((mainFrameBonus + this.shinyBonus) / 100)) * (1 + this.winnerBonus / 100) * level * this.bonusQty;
        return roundResult ? round(finalMath) : finalMath;
    }

    getBonusText = (level: number = this.level) => {
        return this.bonusText.replace(/{/g, nFormatter(this.getBonus(true, this.mainframeBonus, level)));
    }

    getMealLevelCost = (level: number = this.level) => {
        const reductionMultipier = this.reducedCostToUpgrade ? 1 / 1.1 : 1;
        const baseMath = reductionMultipier * (10 + (level + Math.pow(level, 2)));
        return (baseMath * Math.pow(1.2 + 0.05 * level, level)) * this.foodLustDiscount;
    }

    getCostsTillDiamond = () => {
        let totalCost = 0;
        for (let level of range(this.level, 10)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getCostsTillPurple = () => {
        let totalCost = 0;
        for (let level of range(this.level, 15)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getCostsTillVoid = () => {
        let totalCost = 0;
        for (let level of range(this.level, 21)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getCostsTillThirty = () => {
        let totalCost = 0;
        for (let level of range(this.level, 29)) {
            totalCost += this.getMealLevelCost(level);
        }
        return totalCost;
    }

    getCostsTillMaxLevel = () => {
        let totalCost = 0;
        for (let level of range(this.level, this.maxLevel-1)) {
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
    getMealSpeed = (starsign58bonus: number, mealCookVialBonus: number, fireflyVialBonus: number, turtleVialBonus: number, summoningWinnerBonus: number, stampBonus: number, meal63Bonus: number, mealCookBonus: number, jewel0Bonus: number, trollCardBonus: number, ceramicCardBonus: number, kitchenEffBonus: number, jewel14Bonus: number, diamonChef: number, achieve225: boolean, achieve224: boolean, atom8Bonus: number, artifact13Bonus: number, totalizerBonus: number, bloodMarrowBonus: number, superChowBonus: number, cropScientistBonus: number, farmingLevel: number, arcadeBonus: number) => {
        return 10 *
            (1 + bloodMarrowBonus / 100) * 
            Math.max(1, cropScientistBonus) * 
            Math.max(1, superChowBonus) * 
            (1 + (this.richelin ? 2 : 0)) * 
            (1 + meal63Bonus * Math.ceil((farmingLevel + 1) / 50) / 100) *
            Math.max(1, diamonChef) * 
            Math.max(1, atom8Bonus) * 
            (1 + totalizerBonus / 100) * 
            (1 + this.mealLevels / 10) * 
            (1 + artifact13Bonus / 100) * 
            (1 + arcadeBonus / 100) * 
            (1 + turtleVialBonus / 100) * 
            (1 + mealCookVialBonus / 100) * 
            (1 + (stampBonus + Math.max(0, jewel14Bonus)) / 100) * 
            (1 + mealCookBonus / 100) * 
            (1 + starsign58bonus / 100) * 
            (1 + summoningWinnerBonus / 100) * 
            (1 + ceramicCardBonus / 100) * 
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

export class Cooking extends Domain {
    meals: Meal[] = [];
    spices: number[] = [];
    kitchens: Kitchen[] = [...Array(10)].map((_, index) => { return new Kitchen(index) });

    bestBerserker: Player | undefined;
    totalCookingSpeed: number = 0;
    totalCookingSpeedWithoutStarSign: number = 0;
    totalCookingSpeedWithSilkrode: number = 0;

    mealsDiscovered: number = 0;
    mealsAtVoid: number = 0;
    mealsAtDiamond: number = 0;

    foodLustDiscountCapped: boolean = false;

    starSignUnlocked: boolean = false;
    starSignInfinity: boolean = false;

    getMaxMeals = () => {
        return this.meals.length;
    }

    getTotalCookingSpeed = (starSignEquipped: boolean, silkrodeBonus: boolean) => {
        return starSignEquipped ? (silkrodeBonus ? this.totalCookingSpeedWithSilkrode : this.totalCookingSpeed) : this.totalCookingSpeedWithoutStarSign;
    }

    getZerkerBonus = () => {
        return this.bestBerserker?.talents.find(talent => talent.skillIndex == 148)?.getBonus(false, false, true) ?? 0;
    }

    getMealsFromSpiceValues = (valueOfSpices: number[]): number[] => {
        let possibleMeals: number[] = [];
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

    updateNoMealLeftBehind = (bonusActivated: boolean) => {
        this.meals.forEach(meal => meal.noMealLeftBehindAffected = false);
        if (bonusActivated) {
            let mealToUpgrade = 1;
    
            const sortedMeals = this.meals.filter(meal => meal.level > 5 && meal.level < meal.maxLevel).sort((meal1, meal2) => {
                // If same level, then go with higher meal index.
                if (meal1.level == meal2.level) {
                    return meal1.mealIndex > meal2.mealIndex ? -1 : 1
                }
                return meal1.level < meal2.level ? -1 : 1
            });
            sortedMeals.slice(0, mealToUpgrade).forEach(meal => meal.noMealLeftBehindAffected = true);
        }
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Cooking", perPlayer: false, default: [] },
            { key: "Meals", perPlayer: false, default: [] },
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.meals = Meal.fromBase(initMealRepo());
        this.spices = [...Array(territoryNiceNames.length - 1)].map(index => 0);

        populateDiscovery(this);
        return this;
    }

    parse(data: Map<string, any>): void {
        const cooking = data.get(this.getDataKey()) as Cooking;
        const cookingData = data.get("Cooking") as number[][];
        const mealsData = data.get("Meals") as number[][];

        if (cookingData.length == 0 || mealsData.length == 0) {
            return;
        }

        if (mealsData.length) {
            mealsData[0].forEach((mealLevel, index) => {
                // defend against future meals.
                if (index < cooking.meals.length) {
                    cooking.meals[index].level = mealLevel;
                    cooking.meals[index].count = mealsData[2][index];
                }
            })
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

    let availableValues = cooking.spicesToValues(cooking.spices.map((spice, index) => spice != -1 ? index : -1).filter(value => value != -1));

    const outputlucktime = [...Array(mealsThatCanBeDiscovered)].map((_, index) => 50000000000000000 * 2 / .004)
    const outputLuck = [...Array(mealsThatCanBeDiscovered)].map((_, index) => 0)
    for (let len of range(0, 3)) {
        const possibleCombinations = combinations(availableValues, len + 1);
        for (let combination of possibleCombinations) {
            const possibleMeals = cooking.getMealsFromSpiceValues(combination);
            const time = cooking.getRecipeTime(possibleMeals);
            const firstKitchenLuck = cooking.kitchens[0].recipeLuck;
            const firstKitchenFire = cooking.kitchens[0].fireSpeed;
            possibleMeals.slice(0, 6).forEach((meal, index) => {
                if (meal < mealsThatCanBeDiscovered) {
                    let notOdds = 1;
                    // Get the chance to cook this meal based on it's index in the possible meal array
                    let mealChance = Math.min(mealLuckValues[index] * firstKitchenLuck, 1);
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
    cooking.meals.forEach(meal => {
        meal.mainframeBonus = jewelMealBonus;
        meal.reducedCostToUpgrade = voidPlateAchiev;
        meal.foodLustDiscount = foodLust.getBonus();

        // Reset any previously calculated info, the next section should re-populate this.
        meal.cookingContribution = 0;
        meal.cookingContributionWithoutStarSign = 0;
        meal.cookingContributionWithSilkrode = 0;
        meal.cookingTotalSpeed = 0;
        meal.cookingTotalSpeedWithoutStarSign = 0;
        meal.cookingTotalSpeedWithSilkrode = 0;
        meal.maxLevel = 30;
    });

    cooking.foodLustDiscountCapped = foodLust.isCapped();

    // Meal speed
    const mealCookVialBonus = alchemy.getVialBonusForKey("MealCook");
    const fireflyVialBonus = alchemy.getVialBonusForKey("6CookSpd");
    const turtleVialBonus = alchemy.getVialBonusForKey("6turtle");
    const diamonChef = alchemy.getBubbleBonusForKey("MealSpdz");
    const stampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("Meal Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
    const mealSpeedBonus = cooking?.meals.filter(meal => meal.bonusKey == "Mcook").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const meal63Bonus = cooking?.meals.filter(meal => meal.bonusKey == "zMealFarm").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const kitchenEfficientBonus = cooking?.meals.filter(meal => meal.bonusKey == "KitchenEff").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const jewel0Bonus = mainframe.jewels[0].getBonus();
    const jewel14Bonus = mainframe.jewels[14].getBonus();
    const trollCardBonus = cards.find(card => card.id == "Boss4A")?.getBonus() ?? 0;
    const ceramicCardBonus = cards.find(card => card.id == "w6c1")?.getBonus() ?? 0;
    const artifactBonus = sailing.artifacts[13].getBonus();
    const atomBonus = collider.atoms[8].getBonus();
    const worshipBonus = worship.totalizer.getBonus(TotalizerBonus.Cooking);
    const starsign58 = starSigns.unlockedStarSigns.find(sign => sign.name == "Gordonius Major")?.getBonus("Cooking SPD (Multiplicative!)") ?? 0;
    const cropScientistBonus = farming.cropScientist.getBonus(CropScientistBonusText.CookingSpeed);
    const arcadeBonus = arcade.bonuses.find(bonus => bonus.effect == "+{% Cook SPD multi")?.getBonus() ?? 0;
    const winnerBonus = summoning.summonBonuses.find(bonus => bonus.data.bonusId == 16)?.getBonus() ?? 0;

    const bestbloodMarrowBonus = Math.max(...players.flatMap(player => (player.talents.find(talent => talent.skillIndex == 59)?.getBonus() ?? 0)));
    const totalMeals = cooking.meals.reduce((sum, meal) => sum += meal.level, 0)
    const bloodMarrowBonus = Math.pow(Math.min(1.012, 1 + (bestbloodMarrowBonus / 100)), totalMeals);

    const lastIndexBloodBerserker = players.filter(player => player.classId == ClassIndex.Blood_Berserker).sort((player1, player2) => player2.playerID - player1.playerID)[0] ?? undefined;
    const enhancementLevel = Math.max(...players.flatMap(player => (player.talents.find(talent => talent.skillIndex == 49)?.level ?? 0)));
    let superChowBonus = 0;
    // If we have a blood berserker and the voidwalker enhancement level is at least 125, we get a super chow bonus
    if (lastIndexBloodBerserker && enhancementLevel >= 125) {
        const killsOver100M = Array.from(lastIndexBloodBerserker.killInfo.entries()).reduce((sum, [_, value]) => sum += value >= 1e8 ? 1 : 0, 0);
        superChowBonus = Math.pow(1.1, killsOver100M);
    }

    // Fire speed
    const fireVialBonus = alchemy.getVialBonusForKey("RecCook");
    const fireStampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("New Recipe Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
    const fireSpeedMealBonus = cooking?.meals.filter(meal => meal.bonusKey == "Rcook").reduce((sum, meal) => sum += meal.getBonus(), 0);

    // Kitchen upgrade costs
    const kitchenCosts = alchemy.vials.filter(vial => vial.description.includes("Kitchen Upgrading Cost")).reduce((sum, vial) => sum += vial.getBonus(), 0);
    const mealKitchenCosts = cooking?.meals.filter(meal => meal.bonusKey == "KitchC").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const arenaBonusActive = breeding.hasBonus(7);
    const islandExpeditionReduction = islandExpeditions.reductionToKitchenCosts;

    let totalCookingSpeed = 0;
    let totalCookingSpeedWithoutStarSign = 0;
    let totalCookingSpeedWithSilkrode = 0;
    cooking.kitchens.forEach((kitchen, index) => {
        kitchen.mealSpeed = kitchen.getMealSpeed(starsign58, mealCookVialBonus, fireflyVialBonus, turtleVialBonus, winnerBonus, stampBonus, meal63Bonus, mealSpeedBonus, jewel0Bonus, trollCardBonus, ceramicCardBonus, kitchenEfficientBonus, jewel14Bonus, diamonChef, achievements[225].completed, achievements[224].completed, atomBonus, artifactBonus, worshipBonus, bloodMarrowBonus, superChowBonus, cropScientistBonus, farming.farmingLevel, arcadeBonus);
        kitchen.mealSpeedWithoutStarSign = kitchen.getMealSpeed(0, mealCookVialBonus, fireflyVialBonus, turtleVialBonus, winnerBonus, stampBonus, meal63Bonus, mealSpeedBonus, jewel0Bonus, trollCardBonus, ceramicCardBonus, kitchenEfficientBonus, jewel14Bonus, diamonChef, achievements[225].completed, achievements[224].completed, atomBonus, artifactBonus, worshipBonus, bloodMarrowBonus, superChowBonus, cropScientistBonus, farming.farmingLevel, arcadeBonus);
        kitchen.mealSpeedWithSilkrode = kitchen.getMealSpeed(starsign58*2, mealCookVialBonus, fireflyVialBonus, turtleVialBonus, winnerBonus, stampBonus, meal63Bonus, mealSpeedBonus, jewel0Bonus, trollCardBonus, ceramicCardBonus, kitchenEfficientBonus, jewel14Bonus, diamonChef, achievements[225].completed, achievements[224].completed, atomBonus, artifactBonus, worshipBonus, bloodMarrowBonus, superChowBonus, cropScientistBonus, farming.farmingLevel, arcadeBonus);
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

    // Max Level
    const artifactMaxMealLevel = sailing.artifacts[17].getBonus();
    const jadeUpgradeMaxMealLevel = (sneaking.jadeUpgrades.find(upgrade => upgrade.index == 20)?.purchased ? 10 : 0) + (sneaking.jadeUpgrades.find(upgrade => upgrade.index == 21)?.purchased ? 10 : 0)
    cooking.meals.forEach(meal => {
        meal.maxLevel += artifactMaxMealLevel;
        meal.maxLevel += jadeUpgradeMaxMealLevel;

        meal.cookingTotalSpeed = totalCookingSpeed;
        meal.cookingTotalSpeedWithoutStarSign = totalCookingSpeedWithoutStarSign;
        meal.cookingTotalSpeedWithSilkrode = totalCookingSpeedWithSilkrode;

        // No need to do any maths for max level meals.
        if (meal.level == meal.maxLevel) {
            return;
        }
    });

    cooking.updateNoMealLeftBehind(sneaking.jadeUpgrades.find(upgrade => upgrade.data.name == "No Meal Left Behind")?.purchased ?? false);

    populateDiscovery(cooking);

    // Nice to have maths
    cooking.totalCookingSpeed = totalCookingSpeed;
    cooking.totalCookingSpeedWithoutStarSign = totalCookingSpeedWithoutStarSign;
    cooking.totalCookingSpeedWithSilkrode = totalCookingSpeedWithSilkrode;
    cooking.mealsDiscovered = cooking.meals.filter(meal => meal.level > 0).length;
    cooking.mealsAtVoid = cooking.meals.reduce((count, meal) => count += meal.level >= 30 ? 1 : 0, 0);
    cooking.mealsAtDiamond = cooking.meals.reduce((sum, meal) => sum += meal.level >= 11 ? 1 : 0, 0);
    cooking.starSignUnlocked = starSigns.isStarSignUnlocked("Gordonius Major");
    cooking.starSignInfinity = (starSigns.infinityStarSigns.find(sign => sign.name == "Gordonius Major") != undefined);

    return cooking;
}