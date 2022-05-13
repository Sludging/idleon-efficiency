import { nFormatter, round } from "../utility"
import { Alchemy } from "./alchemy";
import { Breeding } from "./breeding";
import { Card } from "./cards";
import { GemStore } from "./gemPurchases";
import { ImageData } from "./imageData";
import { Lab } from "./lab";
import { Stamp } from "./stamps";

const spiceValues: number[] = "0 3 5 8 10 13 15 19 20 23 27 31 33 37 41 45 48 51 53 57".split(" ").map(value => parseInt(value));
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

export interface MealInfo {
    name: string,
    cookingReq: number,
    bonusQty: number,
    bonusText: string,
    description: string,
    bonusKey: string
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
    optimalSpices: number[] = [];
    discoveryTime: number = 0;
    discoveryChance: number = 0;

    mainframeBonus: number = 0;

    // Active cooking values
    cookingContribution: number = 0;
    timeToNext: number = 0;
    timeToDiamond: number = 0;

    constructor(public mealIndex: number, data: MealInfo) {
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
        const finalMath = (1 + mainFrameBonus / 100) * level * this.bonusQty;
        return roundResult ? round(finalMath) : finalMath;
    }

    getBonusText = (level: number = this.level) => {
        return this.bonusText.replace(/{/g, nFormatter(this.getBonus(true, this.mainframeBonus, level)));
    }

    getMealLevelCost = (level: number = this.level) => {
        const baseMath = 10 + (level + Math.pow(level, 2));
        return baseMath * Math.pow(1.2 + 0.05 * level, level);
    }

    getCostsTillDiamond = () => {
        let totalCost = 0;
        for (let level of range(this.level, 10)) {
            totalCost += this.getMealLevelCost(level);
        }

        return totalCost;
    }
}

const initMeals = () => {
    return [
        new Meal(0, { "name": "Turkey a la Thank", "cookingReq": 10, "bonusQty": 2, "bonusText": "+{% Total Damage", "description": "Do I smell gratitude? Oh, no that's colonialization...", "bonusKey": "TotDmg" }),
        new Meal(1, { "name": "Egg", "cookingReq": 15, "bonusQty": 5, "bonusText": "+{% Meal Cooking Speed", "description": "It's just an egg.", "bonusKey": "Mcook" }),
        new Meal(2, { "name": "Salad", "cookingReq": 25, "bonusQty": 3, "bonusText": "+{% Cash from Monsters", "description": "Yea uhm, could I get a burger, but hold the meat and buns?", "bonusKey": "Cash" }),
        new Meal(3, { "name": "Pie", "cookingReq": 40, "bonusQty": 5, "bonusText": "+{% New Recipe Cooking Speed", "description": "Cartoon characters with a fear of levitation HATE the smell of this!", "bonusKey": "Rcook" }),
        new Meal(4, { "name": "Frenk Fries", "cookingReq": 60, "bonusQty": 5, "bonusText": "+{% New Pet Breeding Odds", "description": "You're breeding pets in outer space, don't be shocked that there's no France!", "bonusKey": "Npet" }),
        new Meal(5, { "name": "Spaghetti", "cookingReq": 90, "bonusQty": 4, "bonusText": "+{% Breeding EXP", "description": "Your mom made this. It's her spaghetti.", "bonusKey": "BrExp" }),
        new Meal(6, { "name": "Corn", "cookingReq": 125, "bonusQty": 2, "bonusText": "+{% Skill Efficiency", "description": "To think the government is subsidizing this... its bonus is terrible!!!", "bonusKey": "Seff" }),
        new Meal(7, { "name": "Garlic Bread", "cookingReq": 175, "bonusQty": 4, "bonusText": "+{% VIP Library Membership", "description": "The letter H ain't lookin' so good after eating a few of these...", "bonusKey": "VIP" }),
        new Meal(8, { "name": "Garlicless Bread", "cookingReq": 250, "bonusQty": 2, "bonusText": "+{% Lab EXP", "description": "Many revolutions in the world originate from an increase in the price of bread", "bonusKey": "Lexp" }),
        new Meal(9, { "name": "Pizza", "cookingReq": 350, "bonusQty": 9, "bonusText": "+{% New Pet Breeding Odds", "description": "Mama mia mahhh piiiiiiiizzza!!! Wait I already did that joke, replace this one", "bonusKey": "Npet" }),
        new Meal(10, { "name": "Apple", "cookingReq": 500, "bonusQty": 5, "bonusText": "+{ Base DEF", "description": "Aw jeez Richard, I sure am hungry for apples!", "bonusKey": "Def" }),
        new Meal(11, { "name": "Pancakes", "cookingReq": 700, "bonusQty": 2, "bonusText": "+{Px Line Width in Lab Mainframe", "description": "Ohhh, they're called 'pan'cakes because they're like cakes made in a pan haha", "bonusKey": "PxLine" }),
        new Meal(12, { "name": "Corndog", "cookingReq": 1000, "bonusQty": 12, "bonusText": "+{% Meal Cooking Speed", "description": "Ohhh, they're called 'corn'dogs because... wait, why are they called corndogs?", "bonusKey": "Mcook" }),
        new Meal(13, { "name": "Cabbage", "cookingReq": 1400, "bonusQty": 5, "bonusText": "+{% All Cooking Spd per 10 upgrade Lvs", "description": "This is a MONUMENTALLY IMPORTANT vegetable, as well as upgrade.", "bonusKey": "KitchenEff" }),
        new Meal(14, { "name": "Potato Pea Pastry", "cookingReq": 2000, "bonusQty": 1, "bonusText": "+{% Lower Egg Incubator Time", "description": "Yuhhhh it's that Triple P threat! Look out for them P's bro!", "bonusKey": "TimeEgg" }),
        new Meal(15, { "name": "Dango", "cookingReq": 3000, "bonusQty": 2, "bonusText": "+{% Lower Kitchen Upgrade Costs", "description": "Look, I'm not sure what these are either, just go with it.", "bonusKey": "KitchC" }),
        new Meal(16, { "name": "Sourish Fish", "cookingReq": 4000, "bonusQty": 4, "bonusText": "+{% VIP Library Membership", "description": "Shhh stop saying they're sweet, you're gonna get me in trouble!", "bonusKey": "VIP" }),
        new Meal(17, { "name": "Octoplop", "cookingReq": 5000, "bonusQty": 2, "bonusText": "+{% Total Damage", "description": "They really did just plop an octopus on a plate and call it a day.", "bonusKey": "TotDmg" }),
        new Meal(18, { "name": "Croissant", "cookingReq": 8000, "bonusQty": 1, "bonusText": "+{% Pet Fighting Damage", "description": "Carl loves these!", "bonusKey": "PetDmg" }),
        new Meal(19, { "name": "Canopy", "cookingReq": 12500, "bonusQty": 10, "bonusText": "+{% New Recipe Cooking Speed", "description": "...oh, you said 'Can of Pea's. You know, that does make a lot more sense.", "bonusKey": "Rcook" }),
        new Meal(20, { "name": "Cannoli", "cookingReq": 20000, "bonusQty": 1, "bonusText": "+{% Points earned in Tower Defence", "description": "Ain't got no joke for this one, it's existence is enough of a joke.", "bonusKey": "TDpts" }),
        new Meal(21, { "name": "Cheese", "cookingReq": 35000, "bonusQty": 5, "bonusText": "+{% Cooking EXP", "description": "Sourced organically, straight from the moon!", "bonusKey": "CookExp" }),
        new Meal(22, { "name": "Sawdust", "cookingReq": 50000, "bonusQty": 5, "bonusText": "+{% Lab EXP", "description": "'Id rather starve than eat that' - Angie, 2021", "bonusKey": "Lexp" }),
        new Meal(23, { "name": "Eggplant", "cookingReq": 75000, "bonusQty": 5, "bonusText": "+{% Pet Breedability Speed in Fenceyard", "description": "Idk what you Zoomers are up to with those eggplant emojis, but I don't like it...", "bonusKey": "Breed" }),
        new Meal(24, { "name": "Cheesy Bread", "cookingReq": 110000, "bonusQty": 1, "bonusText": "+{% Total Accuracy", "description": "Another bread meal? Wow so unoriginal, I'm glad I already left a 1 star rating.", "bonusKey": "TotAcc" }),
        new Meal(25, { "name": "Wild Boar", "cookingReq": 200000, "bonusQty": 2, "bonusText": "+{Px Line Width in Lab Mainframe", "description": "It's not really wild anymore is it, it looks kinda dead and roasted.", "bonusKey": "PxLine" }),
        new Meal(26, { "name": "Donut", "cookingReq": 300000, "bonusQty": 15, "bonusText": "+{% New Pet Breeding Odds", "description": "Mmmmm... doooooooonut...", "bonusKey": "Npet" }),
        new Meal(27, { "name": "Riceball", "cookingReq": 500000, "bonusQty": 3, "bonusText": "+{% Skill Efficiency", "description": "Dude it's just a ball of rice, like what do you want me to say about it?", "bonusKey": "Seff" }),
        new Meal(28, { "name": "Cauliflower", "cookingReq": 750000, "bonusQty": 1, "bonusText": "+{% Basic Atk Speed", "description": "The white part is called Curd. Welp, time to recategorize this as an educational game!", "bonusKey": "AtkSpd" }),
        new Meal(29, { "name": "Durian Fruit", "cookingReq": 1000000, "bonusQty": 6, "bonusText": "+{% Lower Kitchen Upgrade costs", "description": "This must have been in the room when Kurt said it smelled like 'teen spirit'...", "bonusKey": "KitchC" }),
        new Meal(30, { "name": "Orange", "cookingReq": 1500000, "bonusQty": 3, "bonusText": "+{% VIP Library Membership", "description": "The true arch-nemesis of rappers and poets alike.", "bonusKey": "VIP" }),
        new Meal(31, { "name": "Bunt Cake", "cookingReq": 3000000, "bonusQty": 7, "bonusText": "+{% Cash from Monsters", "description": "Bunt cake more like Punt cake because I'm kicking this trash straight to the garbage.", "bonusKey": "Cash" }),
        new Meal(32, { "name": "Chocolate Truffle", "cookingReq": 5000000, "bonusQty": 25, "bonusText": "+{% New Pet Breeding Odds", "description": "I mean it's got a bite taken out of it, pretty gross.", "bonusKey": "Npet" }),
        new Meal(33, { "name": "Leek", "cookingReq": 8000000, "bonusQty": 2, "bonusText": "+{% skilling prowess", "description": "Leek! More importantly, prowess lowers the efficiency needed when AFK bar is orange.", "bonusKey": "Sprow" }),
        new Meal(34, { "name": "Fortune Cookie", "cookingReq": 12000000, "bonusQty": 4, "bonusText": "+{% Faster Library checkout Speed", "description": "It reads: 'Salvation lies not within enjoying video games, but from gitting gud at them'", "bonusKey": "Lib" }),
        new Meal(35, { "name": "Pretzel", "cookingReq": 20000000, "bonusQty": 7, "bonusText": "+{% Lab EXP", "description": "I love pretzels, people really be sleepin' on the versatility they bring to the table!", "bonusKey": "Lexp" }),
        new Meal(36, { "name": "Sea Urchin", "cookingReq": 30000000, "bonusQty": 1, "bonusText": "+{% Critters from traps", "description": "At least one person reading this has eating one of these. Oh, it's you? Good for you.", "bonusKey": "Critter" }),
        new Meal(37, { "name": "Mashed Potato", "cookingReq": 40000000, "bonusQty": 6, "bonusText": "+{% Cooking EXP", "description": "This nutritious meal reminds me of the Mashed Potato monster from IdleOn, the video game!", "bonusKey": "CookExp" }),
        new Meal(38, { "name": "Mutton", "cookingReq": 90000000, "bonusQty": 1, "bonusText": "+{% Crit Chance", "description": "Yeap I tell you hwat Bobby, this is a real man's meal right here!", "bonusKey": "Crit" }),
        new Meal(39, { "name": "Wedding Cake", "cookingReq": 135000000, "bonusQty": 2, "bonusText": "+{% Pet Fighting Damage", "description": "Imagine getting married lol so cringe haha am I right??!?! High-five, fellow kids!", "bonusKey": "PetDmg" }),
        new Meal(40, { "name": "Eel", "cookingReq": 200000000, "bonusQty": 1, "bonusText": "+{% Line Width in Lab Mainframe", "description": "The younger sibling of the Loch Ness Monster. He's real, but no one really cares.", "bonusKey": "LinePct" }),
        new Meal(41, { "name": "Whipped Cocoa", "cookingReq": 300000000, "bonusQty": 4, "bonusText": "+{% Skill Efficiency", "description": "Why is this being served on a plate? Was the cup not good enough for you??", "bonusKey": "Seff" }),
        new Meal(42, { "name": "Onion", "cookingReq": 500000000, "bonusQty": 3, "bonusText": "+{% Total Damage", "description": "No, I'm not crying, this onion is just stimulating the lachrymal glands in my eyes.", "bonusKey": "TotDmg" }),
        new Meal(43, { "name": "Soda", "cookingReq": 700000000, "bonusQty": 20, "bonusText": "+{% Meal Cooking Speed", "description": "Yea those red marks are grill marks, our chef doesn't know what he's doing.", "bonusKey": "Mcook" }),
        new Meal(44, { "name": "Sushi Roll", "cookingReq": 900000000, "bonusQty": 7, "bonusText": "+{% VIP Library Membership", "description": "For something called a 'sushi roll', it isn't moving around very much.", "bonusKey": "VIP" }),
        new Meal(45, { "name": "Buncha Banana", "cookingReq": 1250000000, "bonusQty": 4, "bonusText": "+{ Max LVs for TP Pete Star Talent", "description": "Straight from the island of Karjama! Or something like that, starts with a K at least.", "bonusKey": "TPpete" }),
        new Meal(46, { "name": "Pumpkin", "cookingReq": 1700000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "According to the author of the Iliad, its value should peak right around January...", "bonusKey": "non" }),
        new Meal(47, { "name": "Cotton Candy", "cookingReq": 4000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "The most exquisite of fairground cuisine!", "bonusKey": "non" }),
        new Meal(48, { "name": "Massive Fig", "cookingReq": 7000000000, "bonusQty": 3, "bonusText": "+{% Total Damage", "description": "This thing has gotta weigh at least 30!", "bonusKey": "non" }),
        new Meal(49, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(50, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(51, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(52, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(53, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(54, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(55, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(56, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(57, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(58, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
        new Meal(59, { "name": "Turkey a la Thank", "cookingReq": 50000000000, "bonusQty": 2, "bonusText": "+{% EXP from World 1 Mobs", "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.", "bonusKey": "non" }),
    ]
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

    getMealSpeed = (vialBonus: number, stampBonus: number, mealCookBonus: number, jewelBonus: number, cardBonus: number, kitchenEffBonus: number, jewelBonus2: number, diamonChef: number) => {
        const baseMath = 10 * (1 + (this.richelin ? 2 : 0)) * Math.max(1, diamonChef);
        const bonusMath = (1 + (stampBonus + Math.max(0, jewelBonus2)) / 100) * (1 + mealCookBonus / 100) * Math.max(1, jewelBonus);
        const cardImpact = 1 + Math.min(cardBonus, 50) / 100;
        return baseMath *
            (1 + this.mealLevels / 10) *
            (1 + vialBonus / 100) *
            bonusMath *
            cardImpact *
            (1 + (kitchenEffBonus * Math.floor((this.mealLevels + (this.recipeLevels + this.luckLevels)) / 10)) / 100);
    }

    getFireSpeed = (vialBonus: number, stampBonus: number, mealBonus: number, cardBonus: number, kitchenEffBonus: number, diamonChef: number) => {
        const baseMath = 5 * (1 + (this.richelin ? 1 : 0)) * Math.max(1, diamonChef);
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

    getSpiceUpgradeCost = (alchemyBonus: number, mealCostBonus: number, petBonusActive: boolean, upgradeType: UpgradeType) => {
        const baseMath = 1 /
            ((1 + alchemyBonus / 100) *
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
    meals: Meal[] = initMeals();
    spices: number[] = [];
    kitchens: Kitchen[] = [...Array(10)].map((_, index) => { return new Kitchen(index) });

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

        // return sorted by lowest meal to highest.
        return possibleMeals.sort((meal1, meal2) => meal1 < meal2 ? -1 : 1);
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

}

const populateDiscovery = (cooking: Cooking) => {
    const availableValues = cooking.spicesToValues(cooking.spices.map((spice, index) => spice != -1 ? index : -1).filter(value => value != -1));
    const outputlucktime = [...Array(49)].map((_, index) => 5000000000 * 2 / .004)
    const mealTimes = cooking.meals.map(meal => meal.cookReq);
    for (let len of range(0, 3)) {
        const possibleCombinations = combinations(availableValues, len + 1);
        for (let combination of possibleCombinations) {
            const possibleMeals = cooking.getMealsFromSpiceValues(combination);
            const time = cooking.getRecipeTime(possibleMeals);
            const firstKitchenLuck = cooking.kitchens[0].recipeLuck;
            const firstKitchenFire = cooking.kitchens[0].fireSpeed;
            possibleMeals.slice(0, 6).forEach((meal, index) => {
                if (meal < 49) {
                    let notOdds = 1;
                    let mealChance = Math.min(mealLuckValues[index] * firstKitchenLuck, 1);
                    for (let reverseIndex = possibleMeals.length; reverseIndex > index; reverseIndex--) {
                        notOdds *= 1 - Math.min(mealLuckValues[reverseIndex] * firstKitchenLuck, 1);
                    }
                    const realLuck = mealChance * notOdds;
                    const luckTime = time / realLuck;
                    if (luckTime < outputlucktime[meal]) {
                        outputlucktime[meal] = luckTime;
                        cooking.meals[meal].discoveryTime = time / (firstKitchenFire / 3600);
                        cooking.meals[meal].discoveryChance = realLuck;
                        cooking.meals[meal].optimalSpices = combination.map(value => spiceValues.indexOf(value));
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

    cooking.kitchens.forEach(kitchen => {
        kitchen.richelin = (gemStore.purchases.find(purchase => purchase.itemName == "Richelin Kitchen")?.pucrhased ?? -1) > kitchen.index;
    });

    const alchemy = data.get("alchemy") as Alchemy;
    const stamps = data.get("stamps") as Stamp[][];
    const mainframe = data.get("lab") as Lab;
    const cards = data.get("cards") as Card[];
    const breeding = data.get("breeding") as Breeding;

    const jewelMealBonus = mainframe.jewels[16].active ? mainframe.jewels[16].getBonus() : 0; // TODO: Remove hardcoding
    cooking.meals.forEach(meal => meal.mainframeBonus = jewelMealBonus);

    // Meal speed
    const vialBonus = alchemy.vials.filter(vial => vial.description.includes("Meal Cooking Speed")).reduce((sum, vial) => sum += vial.getBonus(), 0);
    const diamonChef = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Diamond Chef")?.getBonus() ?? 0;
    const stampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("Meal Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
    const mealSpeedBonus = cooking?.meals.filter(meal => meal.bonusKey == "Mcook").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const kitchenEfficientBonus = cooking?.meals.filter(meal => meal.bonusKey == "KitchenEff").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const jewelBonus = mainframe.jewels[0].active ? mainframe.jewels[0].getBonus() : 1; // TODO: Remove hardcoding
    const jewelBonus2 = mainframe.jewels[14].active ? mainframe.jewels[14].getBonus() : 0; // TODO: Remove hardcoding
    const cardBonus = cards.find(card => card.name == "Boss4A")?.getBonus() ?? 0;

    // Fire speed
    const fireVialBonus = alchemy.vials.filter(vial => vial.description.includes("New Recipe Cooking Speed")).reduce((sum, vial) => sum += vial.getBonus(), 0);
    const fireStampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("New Recipe Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
    const fireSpeedMealBonus = cooking?.meals.filter(meal => meal.bonusKey == "Rcook").reduce((sum, meal) => sum += meal.getBonus(), 0);

    // Kitchen upgrade costs
    const kitchenCosts = alchemy.vials.filter(vial => vial.description.includes("Kitchen Upgrading Cost")).reduce((sum, vial) => sum += vial.getBonus(), 0);
    const mealKitchenCosts = cooking?.meals.filter(meal => meal.bonusKey == "KitchC").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const arenaBonusActive = breeding.hasBonus(7);

    cooking.kitchens.forEach(kitchen => {
        kitchen.mealSpeed = kitchen.getMealSpeed(vialBonus, stampBonus, mealSpeedBonus, jewelBonus, cardBonus, kitchenEfficientBonus, jewelBonus2, diamonChef);
        kitchen.fireSpeed = kitchen.getFireSpeed(fireVialBonus, fireStampBonus, fireSpeedMealBonus, cardBonus, kitchenEfficientBonus, diamonChef);
        kitchen.recipeLuck = kitchen.getLuck();

        kitchen.speedUpgradeCost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Speed);
        kitchen.fireUpgradeCost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Fire);
        kitchen.luckUpgradecost = kitchen.getSpiceUpgradeCost(kitchenCosts, mealKitchenCosts, arenaBonusActive, UpgradeType.Luck);

        // if actively cooking
        if (kitchen.activeMeal != -1) {
            cooking.meals[kitchen.activeMeal].cookingContribution += kitchen.mealSpeed;
        }
    })

    cooking.meals.filter(meal => meal.cookingContribution > 0).forEach(meal => {
        meal.timeToNext = ((meal.getMealLevelCost() - meal.count) * meal.cookReq) / meal.cookingContribution;
        meal.timeToDiamond = ((meal.getCostsTillDiamond() - meal.count) * meal.cookReq) / meal.cookingContribution
    });

    populateDiscovery(cooking);

    return cooking;
}