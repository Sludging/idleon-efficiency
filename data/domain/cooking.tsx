import { nFormatter, round } from "../utility"
import { Achievement } from "./achievements";
import { Alchemy } from "./alchemy";
import { AtomCollider } from "./atomCollider";
import { Breeding } from "./breeding";
import { Card } from "./cards";
import { initMealRepo, MealBase } from "./data/MealRepo";
import { Gaming, TotalizerBonus } from "./gaming";
import { GemStore } from "./gemPurchases";
import { ImageData } from "./imageData";
import { Lab } from "./lab";
import { MealModel } from "./model/mealModel";
import { Player } from "./player";
import { Sailing } from "./sailing";
import { Sigils } from "./sigils";
import { Stamp } from "./stamps";

const spiceValues: number[] = "0 3 5 8 10 13 15 19 20 23 27 31 33 37 41 45 48 50 53 56".split(" ").map(value => parseInt(value));
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

    mainframeBonus: number = 0;
    shinyBonus: number = 0;

    // Active cooking values
    cookingContribution: number = 0;
    timeToNext: number = 0;
    timeToDiamond: number = 0;
    timeToPurple: number = 0;
    timeToVoid: number = 0;
    timeToThirty: number = 0;

    // Void plate achivement
    reducedCostToUpgrade: boolean = false;

    // Ladles
    ladlesToLevel: number = -1;
    zerkerLadlesToLevel: number = -1;
    ladlesToNextMilestone: number = -1;
    zerkerLadlesToNextMilestone: number = -1;

    // Calculated
    maxLevel: number = 30;

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

        const finalMath = (1 + ((mainFrameBonus +  this.shinyBonus) / 100)) * level * this.bonusQty;
        return roundResult ? round(finalMath) : finalMath;
    }

    getBonusText = (level: number = this.level) => {
        return this.bonusText.replace(/{/g, nFormatter(this.getBonus(true, this.mainframeBonus, level)));
    }

    getMealLevelCost = (level: number = this.level) => {
        const reductionMultipier = this.reducedCostToUpgrade ? 1 / 1.1 : 1;
        const baseMath = reductionMultipier * (10 + (level + Math.pow(level, 2)));
        return baseMath * Math.pow(1.2 + 0.05 * level, level);
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

    mealSpeed: number = 0;
    fireSpeed: number = 0;
    recipeLuck: number = 0;

    constructor(public index: number) { }

    getMealSpeed = (vialBonus: number, stampBonus: number, mealCookBonus: number, jewel0Bonus: number, cardBonus: number, kitchenEffBonus: number, jewel14Bonus: number, diamonChef: number, achieve225: boolean, achieve224: boolean, atom8Bonus: number, artifact13Bonus: number, gamingBonus: number) => {
        const baseMath = 10 * (1 + (this.richelin ? 2 : 0)) * Math.max(1, diamonChef) * Math.max(1, atom8Bonus) * (1 + gamingBonus / 100);
        const moreMath = (1 + (this.mealLevels / 10)) * (1 + (artifact13Bonus / 100)); 
        const bonusMath = (1 + (stampBonus + Math.max(0, jewel14Bonus)) / 100) * (1 + mealCookBonus / 100) * Math.max(1, jewel0Bonus);
        const cardAndAchiImpact = 1 + Math.min(cardBonus + (20 * (achieve225 ? 1 : 0)) + (10 * (achieve224 ? 1 : 0)), 100) / 100;
        return baseMath *
            moreMath *
            (1 + vialBonus / 100) *
            bonusMath *
            cardAndAchiImpact *
            (1 + (kitchenEffBonus * Math.floor((this.mealLevels + (this.recipeLevels + this.luckLevels)) / 10)) / 100);
    }

    getFireSpeed = (vialBonus: number, stampBonus: number, mealBonus: number, cardBonus: number, kitchenEffBonus: number, diamonChef: number, atom8Bonus: number, gamingBonus: number) => {
        const baseMath = 5 * (1 + (this.richelin ? 1 : 0)) * Math.max(1, diamonChef) * Math.max(1, atom8Bonus) * (1 + gamingBonus / 100);
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

    getSpiceUpgradeCost = (alchemyBonus: number, mealCostBonus: number, petBonusActive: boolean, upgradeType: UpgradeType, sigilBonus: number) => {
        const baseMath = 1 /
            ((1 + (alchemyBonus + sigilBonus) / 100) *
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

export class Cooking {
    meals: Meal[]
    spices: number[] = [];
    kitchens: Kitchen[] = [...Array(10)].map((_, index) => { return new Kitchen(index) });

    bestBerserker: Player | undefined;
    totalCookingSpeed: number = 0;

    mealsDiscovered: number = 0;
    mealsAtVoid: number = 0;
    mealsAtDiamond: number = 0;

    constructor() {
        this.meals = Meal.fromBase(initMealRepo());
    }

    getMaxMeals = () => {
        // Lava is using 'Turkey a la Thank' as filler name in the end, remove all of those meals and add 1 for the first meal which is real.
        return this.meals.filter(meal => meal.name != "Turkey a la Thank").length + 1;
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
        const sum = valueOfSpices.reduce((sum, value) => sum += spiceValues.indexOf(value), 0);
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

        // remove all outcomes that are larger than 59 and return sorted by lowest meal to highest.
        return possibleMeals.filter(meal => meal < 60).sort((meal1, meal2) => meal1 < meal2 ? -1 : 1);
    }

    spicesToValues = (spices: number[]) => {
        return spices.map(spice => spiceValues[spice]);
    }

    getRecipeTime = (possibleMeals: number[]) => {
        const lastMeal = possibleMeals[possibleMeals.length - 1];
        if (lastMeal < this.meals.length) {
            return 2 * this.meals[lastMeal].cookReq
        }
        return 2 * 5000000000
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

}

const populateDiscovery = (cooking: Cooking) => {
    // Lava is using 'Turkey a la Thank' as filler name in the end, remove all of those meals and add 1 for the first meal which is real.
    const mealsThatCanBeDiscovered = cooking.meals.filter(meal => meal.name != "Turkey a la Thank").length + 1;

    const availableValues = cooking.spicesToValues(cooking.spices.map((spice, index) => spice != -1 ? index : -1).filter(value => value != -1));
    const outputlucktime = [...Array(mealsThatCanBeDiscovered)].map((_, index) => 5000000000 * 2 / .004)
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

export const parseCooking = (cookingData: number[][], mealsData: number[][]) => {
    const cooking = new Cooking();

    if (cookingData.length == 0 || mealsData.length == 0) {
        return cooking;
    }

    if (mealsData.length) {
        mealsData[0].forEach((mealLevel, index) => {
            cooking.meals[index].level = mealLevel;
            cooking.meals[index].count = mealsData[2][index];
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
    return cooking;
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
    const gaming = data.get("gaming") as Gaming;

    const bestLadleSkillLevel = Math.max(...players.flatMap(player => (player.talents.find(talent => talent.skillIndex == 148)?.maxLevel ?? 0)));
    if (bestLadleSkillLevel > 0) {
        cooking.bestBerserker = players.find(player => player.talents.find(talent => talent.skillIndex == 148 && talent.maxLevel == bestLadleSkillLevel) != undefined);
    }
    const zerkerBonus = cooking.bestBerserker?.talents.find(talent => talent.skillIndex == 148)?.getBonus(false, false, true) ?? 0;

    cooking.kitchens.forEach(kitchen => {
        kitchen.richelin = (gemStore.purchases.find(purchase => purchase.no == 120)?.pucrhased ?? -1) > kitchen.index;
    });

    const jewelMealBonus = mainframe.jewels[16].active ? mainframe.jewels[16].getBonus() : 0; // TODO: Remove hardcoding
    const voidPlateAchiev = achievements[233].completed;
    cooking.meals.forEach(meal => {
        meal.mainframeBonus = jewelMealBonus
        meal.reducedCostToUpgrade = voidPlateAchiev;
    });

    // Meal speed
    const vialBonus = alchemy.getVialBonusForKey("MealCook");
    const diamonChef = alchemy.getBubbleBonusForKey("MealSpdz");
    const stampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("Meal Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
    const mealSpeedBonus = cooking?.meals.filter(meal => meal.bonusKey == "Mcook").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const kitchenEfficientBonus = cooking?.meals.filter(meal => meal.bonusKey == "KitchenEff").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const jewel0Bonus = mainframe.jewels[0].getBonus(); // TODO: Remove hardcoding
    const jewel14Bonus = mainframe.jewels[14].getBonus(); // TODO: Remove hardcoding
    const cardBonus = cards.find(card => card.id == "Boss4A")?.getBonus() ?? 0;
    const artifactBonus = sailing.artifacts[13].getBonus();
    const atomBonus = collider.atoms[8].getBonus();
    const gamingBonus = gaming.totalizer.getBonus(TotalizerBonus.Cooking);

    // Fire speed
    const fireVialBonus = alchemy.getVialBonusForKey("RecCook");
    const fireStampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("New Recipe Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
    const fireSpeedMealBonus = cooking?.meals.filter(meal => meal.bonusKey == "Rcook").reduce((sum, meal) => sum += meal.getBonus(), 0);

    // Kitchen upgrade costs
    const kitchenCosts = alchemy.vials.filter(vial => vial.description.includes("Kitchen Upgrading Cost")).reduce((sum, vial) => sum += vial.getBonus(), 0);
    const mealKitchenCosts = cooking?.meals.filter(meal => meal.bonusKey == "KitchC").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const arenaBonusActive = breeding.hasBonus(7);

    let totalContribution = 0;
    cooking.kitchens.forEach(kitchen => {
        kitchen.mealSpeed = kitchen.getMealSpeed(vialBonus, stampBonus, mealSpeedBonus, jewel0Bonus, cardBonus, kitchenEfficientBonus, jewel14Bonus, diamonChef, achievements[225].completed, achievements[224].completed, atomBonus, artifactBonus, gamingBonus);
        kitchen.fireSpeed = kitchen.getFireSpeed(fireVialBonus, fireStampBonus, fireSpeedMealBonus, cardBonus, kitchenEfficientBonus, diamonChef, atomBonus, gamingBonus);
        kitchen.recipeLuck = kitchen.getLuck();

        kitchen.speedUpgradeCost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Speed, sigils.sigils[18].getBonus());
        kitchen.fireUpgradeCost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Fire, sigils.sigils[18].getBonus());
        kitchen.luckUpgradecost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Luck, sigils.sigils[18].getBonus());

        // if actively cooking
        if (kitchen.activeMeal != -1) {
            cooking.meals[kitchen.activeMeal].cookingContribution += kitchen.mealSpeed;
            totalContribution += kitchen.mealSpeed;
        }
    })

    // Max Level
    const artifactMaxMealLevel = sailing.artifacts[17].getBonus();
    cooking.meals.forEach(meal => {
        const cookingSpeed = meal.cookingContribution > 0 ? meal.cookingContribution : totalContribution;
        meal.maxLevel += artifactMaxMealLevel;
        
        // No need to do any maths for max level meals.
        if (meal.level == meal.maxLevel) {
            return;
        }

        meal.timeToDiamond = Math.max(0, ((meal.getCostsTillDiamond() - meal.count) * meal.cookReq) / cookingSpeed);
        meal.timeToPurple = Math.max(0, ((meal.getCostsTillPurple() - meal.count) * meal.cookReq) / cookingSpeed);
        meal.timeToVoid = Math.max(0, ((meal.getCostsTillVoid() - meal.count) * meal.cookReq) / cookingSpeed);
        meal.timeToThirty = Math.max(0, ((meal.getCostsTillThirty() - meal.count) * meal.cookReq) / cookingSpeed);

        meal.timeToNext = Math.max(0, ((meal.getMealLevelCost() - meal.count) * meal.cookReq) / cookingSpeed);
        meal.ladlesToLevel = Math.max(0, Math.ceil((((meal.getMealLevelCost() - meal.count) * meal.cookReq) / cookingSpeed)));
        meal.zerkerLadlesToLevel = Math.max(0, Math.ceil((((meal.getMealLevelCost() - meal.count) * meal.cookReq) / cookingSpeed) / (1 + zerkerBonus / 100)));

        let milestoneCosts = 0;
        if (meal.timeToDiamond > 0) {
            milestoneCosts = meal.getCostsTillDiamond();
        }
        else if (meal.timeToPurple > 0) {
            milestoneCosts = meal.getCostsTillPurple();
        }
        else if (meal.timeToVoid > 0) {
            milestoneCosts = meal.getCostsTillVoid();
        }
        else if (meal.timeToThirty > 0) {
            milestoneCosts = meal.getCostsTillThirty();
        }
        if (milestoneCosts > 0) {
            meal.ladlesToNextMilestone = Math.ceil((((milestoneCosts - meal.count) * meal.cookReq) / cookingSpeed));
            meal.zerkerLadlesToNextMilestone = Math.ceil((((milestoneCosts - meal.count) * meal.cookReq) / cookingSpeed) / (1 + zerkerBonus / 100));
        }
    });

    populateDiscovery(cooking);

    // Nice to have maths
    cooking.totalCookingSpeed = totalContribution;
    cooking.mealsDiscovered = cooking.meals.filter(meal => meal.level > 0).length;
    cooking.mealsAtVoid = cooking.meals.reduce((count, meal) => count += meal.level >= 30 ? 1 : 0, 0);
    cooking.mealsAtDiamond = cooking.meals.reduce((sum, meal) => sum += meal.level >= 11 ? 1 : 0, 0);

    return cooking;
}