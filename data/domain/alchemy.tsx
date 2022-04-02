import { lavaFunc } from '../utility'
import { Item } from './items';
import { Lab } from './lab';

export enum CauldronIndex {
    Power = 0,
    Quicc = 1,
    HighIQ = 2,
    Kazam = 3
}

export enum CauldronBoostIndex {
    Speed = 0,
    Luck = 1,
    Cost = 2,
    Extra = 3
}

export const AlchemyConst = {
    OrangeBargain: 14,
    VialIndex: 4,
    UnderdevelopedCosts: 6,
    Anvilnomics: 4,
    HammerHammer: 2,
    BarleyBrew: 9,
    BlueFlav: 18,
    SmartBoi: 13,
    GospelLeader: 12,
    CallMePope: 11,
    CauldronCount: 4,
    CauldronBonusBubbleIndex: 1
};

export const VialIndex = 4;

const vialPercentages = "99 90 80 70 60 60 40 50 40 35 30 25 17 16 13 9 13 10 7 11 1 25 25 20 20 15 14 13 5 12 10 9 7 5 4 3 3 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1".split(" ").map((value) => parseInt(value));
const vialCostPerLevel = [0, 100, 1000, 2500, 10000, 50000, 100000, 500000, 1000001, 5000000, 25000000, 100000000, 1000000000, 50000000000];

const calcBubbleMatCost = (bubbleLvl: number, bubbleIndex: number, baseCost: number, isLiquid: boolean, cauldCostReduxLvl: number = 0, undevelopedCostsBubbleLevel: number = 0, bubbleCostVialLvl: number = 0, bubbleBargainLvl: number = 0, bubbleMultClassLvl: number = 0, shopBargainBought: number = 0, hasAchievement: boolean, bubbleNewMultiLevel: number = 0, vialMultiplier: number = 1): number => {
    if (isLiquid) {
        return baseCost + Math.floor(bubbleLvl / 20);
    } else {
        const first = bubbleIndex < 14 ? 
            baseCost * Math.pow(1.35 - (0.3 * bubbleLvl) / (50 + bubbleLvl), bubbleLvl) : 
            baseCost * Math.pow(1.37 - (0.28 * bubbleLvl) / (60 + bubbleLvl), bubbleLvl);

        const cauldCostReduxBoost = Math.max(
            0.1,
            1 - (Math.round(10 * lavaFunc("decay", cauldCostReduxLvl, 90, 100)) / 10) / 100
        );
        const bubbleCostBubbleBoost = Math.max(
            0.05,
            1 - (lavaFunc("decay", undevelopedCostsBubbleLevel, 40, 70) + (lavaFunc("add", bubbleCostVialLvl, 1, 0) * vialMultiplier)) / 100
        );
        const bubbleBargainBoost = Math.max(
            0.05,
            1 - (lavaFunc("decay", bubbleBargainLvl, 40, 12) / 100) * lavaFunc("decayMulti", bubbleMultClassLvl, 2, 50) * lavaFunc("decayMulti", bubbleNewMultiLevel, 1.4, 30)
        );
        const shopBargainBoost = Math.max(0.1, Math.pow(0.75, shopBargainBought));
        // for any material besides liquid
        return Math.round(first * cauldCostReduxBoost * bubbleBargainBoost * bubbleCostBubbleBoost * shopBargainBoost * (hasAchievement ? 0.9 : 1));
    }
}

function handleToolBubbles(titleText: string, bubbleName: string) {
    switch (bubbleName) {
        case "Stronk Tools": return titleText.replace("$", "Pickaxes and Fishing Rods");
        case "Sanic Tools": return titleText.replace("$", "Catching Nets");
        case "Le Brain Tools": return titleText.replace("$", "Hatchets");
        default: return titleText;
    }
}

export class Bubble {
    name: string;
    x1: number;
    x2: number;
    func: string;
    description: string;
    rawRequirements: { item: string, quantity: number }[];
    requirements: Array<Item> = [];

    level: number = 0;
    class_name: string;
    labUpgrade: boolean = false;
    bubbleIndex: number

    constructor(name: string, icon_prefix: string, bubble_number: string, x1: number, x2: number, func: string, description: string, requirements: Array<{ item: string, quantity: number }>) {
        this.class_name = `icons-7070 icons-aUpgrades${icon_prefix}${bubble_number}`;
        this.name = name.replace(/_/g, " ");
        this.x1 = x1;
        this.x2 = x2;
        this.func = func;
        this.description = description;
        this.rawRequirements = requirements;
        this.bubbleIndex = parseInt(bubble_number);
    }

    getMaterialCost = (cauldCostReduxLvl: number = 0, undevelopedCostsBubbleLevel: number = 0, bubbleCostVialLvl: number = 0, bubbleBargainLvl: number = 0, bubbleMultClassLvl: number = 0, shopBargainBought: number = 0, hasAchievement: boolean = false, bubbleNewMultiLevel: number = 0, vialMultiplier: number = 1): Map<Item, number> => {
        let toReturn = new Map<Item, number>();
        this.requirements.forEach((req) => {
            toReturn.set(req, calcBubbleMatCost(this.level, this.bubbleIndex, req.count, req.internalName.includes("Liquid"), cauldCostReduxLvl, undevelopedCostsBubbleLevel, bubbleCostVialLvl, bubbleBargainLvl, bubbleMultClassLvl, shopBargainBought, hasAchievement, bubbleNewMultiLevel, vialMultiplier))
        })
        return toReturn;
    }

    getBonus = (round: boolean = false): number => {
        return lavaFunc(this.func, this.level, this.x1, this.x2, round);
    }

    getBonusText = (): string => {
        let titleText = this.description.replace(/{/g, this.getBonus(true).toString());
        return handleToolBubbles(titleText, this.name);
    }

}

export class Cauldron {
    name: string;
    short_name: string;
    bubbles: Array<Bubble> = [];
    boostLevels: Array<number> = [0, 0, 0, 0];

    constructor(name: string, short_name: string) {
        this.name = name;
        this.short_name = short_name;
    }
}

export class Vial {
    name: string;
    x1: number;
    x2: number;
    func: string;
    description: string;
    rawRequirements: { item: string, quantity: number }[];
    requirements: Array<Item> = [];

    level: number = 0;
    bonusMulitplier: number = 1;

    constructor(public vialIndex: number, name: string, x1: number, x2: number, func: string, description: string, requirements: Array<{ item: string, quantity: number }>) {
        this.name = name.replace(/_/g, " ");
        this.x1 = x1;
        this.x2 = x2;
        this.func = func;
        this.description = description;
        this.rawRequirements = requirements;
    }

    getBonus = (round: boolean = false): number => {
        return lavaFunc(this.func, this.level, this.x1, this.x2, round) * this.bonusMulitplier;
    }

    getBonusText = (): string => {
        return this.description.replace(/{/g, this.getBonus(true).toString());

    }

    getClass = () => {
        const costItem = this.requirements.find(item => !item.internalName.includes("Liquid"));
        if (costItem) {
            return costItem.getClass();
        }

        return "";
    }

    getVialClass = () => {
        return `icons-104120 icons-aVials${this.level}`
    }

    getNumberToRoll = () => {
        return 100 - vialPercentages[this.vialIndex];
    }

    getMaterialCost = (): Map<Item, number> => {
        let toReturn = new Map<Item, number>();
        this.requirements.forEach((req) => {
            if (req.internalName.includes("Liquid")) {
                toReturn.set(req, 3 * this.level)
            }
            else {
                toReturn.set(req, vialCostPerLevel[this.level]);
            }
        })
        return toReturn;
    }
}

export class Alchemy {
    cauldrons: Array<Cauldron> = [];
    vials: Array<Vial> = [];

    getUndevelopedCostsBubbleLevel = (): number => {
        if (this.cauldrons.length > 0) {
            return this.cauldrons[CauldronIndex.Kazam].bubbles[AlchemyConst.UnderdevelopedCosts].level;
        }

        return 0;
    }

    getBarleyBrewVialLevel = (): number => {
        if (this.vials.length > 0) {
            return this.vials[AlchemyConst.BarleyBrew].level;
        }

        return 0;
    }

    hasAchievement = (): boolean => {
        return this.cauldrons[CauldronIndex.HighIQ].bubbles[AlchemyConst.SmartBoi].level > 50;
    }

    getActiveBubble = (bubbleString: string) => {
        switch (bubbleString[0]) {
            case "_": return this.cauldrons[CauldronIndex.Power].bubbles[parseInt(bubbleString.slice(1))]
            case "a": return this.cauldrons[CauldronIndex.Quicc].bubbles[parseInt(bubbleString.slice(1))]
            case "b": return this.cauldrons[CauldronIndex.HighIQ].bubbles[parseInt(bubbleString.slice(1))]
            case "c": return this.cauldrons[CauldronIndex.Kazam].bubbles[parseInt(bubbleString.slice(1))]
        }
    }
}

const initAlchemy = () => {
    const alchemy = new Alchemy();
    let power_cauldron = new Cauldron("Power Cauldron", "O")
    power_cauldron.bubbles.push(new Bubble("Roid Ragin", "O", "0", 1, 0, "add", "+{ Total STR. 'Total' here means that, for example, a +10% STR bonus from something else wouldn't affect this bonus.", JSON.parse('[{"item": "OakTree", "quantity": 25}, {"item": "Liquid1", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Warriors Rule", "O", "1", 2, 50, "decayMulti", "All Orange Passive Bubbles, which are the smaller sized ones, give a {x higher bonus to your warrior-based classes.", JSON.parse('[{"item": "Grasslands1", "quantity": 20}, {"item": "CraftMat1", "quantity": 3}, {"item": "Liquid1", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Hearty Diggy", "O", "2", 50, 100, "decay", "+{% mining efficiency per power of 10 max HP that your character has. The perfect bonus for miners with infinite HP!", JSON.parse('[{"item": "JungleTree", "quantity": 40}, {"item": "CopperBar", "quantity": 18}, {"item": "Liquid1", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Wyoming Blood", "O", "3", 23.5, 1.5, "bigBase", "Multi-Ore mining chance is increased by +{%, and your max Multi-Ore chance is 300% instead of 100%.", JSON.parse('[{"item": "Bug1", "quantity": 30}, {"item": "Forest1", "quantity": 50}, {"item": "Liquid1", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Reely Smart", "O", "4", 100, 80, "decay", "+{% Mining and Fishing EXP gain. Y'know what, I'll even DOUBLE that bonus for whichever skill has the lower level!", JSON.parse('[{"item": "CraftMat6", "quantity": 25}, {"item": "DesertA3", "quantity": 40}, {"item": "Liquid1", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Big Meaty Claws", "O", "5", 1, 0.02, "add", "Increases base damage by +$. This bonus increases based on how much Max HP you have above 250.", JSON.parse('[{"item": "BirchTree", "quantity": 200}, {"item": "DesertB2", "quantity": 75}, {"item": "Liquid1", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Sploosh Sploosh", "O", "6", 23.5, 1.5, "bigBase", "Multi-Fish fishing chance is increased by +{%, and your max Multi-Fish chance is 300% instead of 100%.", JSON.parse('[{"item": "Fish2", "quantity": 100}, {"item": "Liquid1", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Stronk Tools", "O", "7", 65, 70, "decay", "The following tools give +{% more skilling Power than normal: $", JSON.parse('[{"item": "Plat", "quantity": 60}, {"item": "Grasslands2", "quantity": 200}, {"item": "Liquid1", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Fmj", "O", "8", 0.5, 0, "add", "+{% more defence from Equipment. Also, +1 base Def per Class LV, up to +{.", JSON.parse('[{"item": "Bug4", "quantity": 50}, {"item": "DesertC2", "quantity": 140}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Bappity Boopity", "O", "9", 35, 100, "decay", "+{% critical Damage. Badabing, badaboom! Or in Italian, Babadabinga, babadaboomahh!", JSON.parse('[{"item": "CraftMat8", "quantity": 100}, {"item": "JungleTree", "quantity": 700}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Brittley Spears", "O", "10", 40, 50, "decay", "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.", JSON.parse('[{"item": "Critter1", "quantity": 10}, {"item": "Liquid2", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Call Me Bob", "O", "11", 25, 2.5, "bigBase", "+{% Construction EXP Gain. Also gives +50% Bug-Fixing speed if your username is LavaFlame2. Actually, better make that +500%...", JSON.parse('[{"item": "SnowA3", "quantity": 120}, {"item": "Liquid2", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Carpenter", "O", "12", 2, 50, "decay", "+{% Build Speed per Construction Level.", JSON.parse('[{"item": "Refinery2", "quantity": 3}, {"item": "Liquid2", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Buff Boi Talent", "O", "13", 5, 1, "bigBase", "+{ Talent Points for EACH tab! Yea, it's amazing right? But it's just for warriors, don't tell the other classes!!", JSON.parse('[{"item": "Critter4", "quantity": 50}, {"item": "Liquid2", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Orange Bargain", "O", "14", 40, 12, "decay", "The material costs of ALL orange bubbles are {% lower", JSON.parse('[{"item": "Soul4", "quantity": 30}, {"item": "Liquid2", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Penny Of Strength", "O", "15", 18, 30, "decay", "+{% Cash from Monsters for every 250 STR. The pennies reflect your strength in themselves, thus making them more valuable!", JSON.parse('[{"item": "Fish5", "quantity": 200}, {"item": "Liquid3", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Multorange", "O", "16", 1.4, 30, "decayMulti", "The following orange bubbles give {x higher bonus than what they display: I, III, IV, VI, XII", JSON.parse('[{"item": "GalaxyA3", "quantity": 250}, {"item": "Liquid3", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Dream Of Ironfish", "O", "17", 12, 30, "decay", "+{% Mining and Fishing AFK GAINS rate. Wow, how bias can you get... giving the warrior's bubble TWO afk gain bonuses.", JSON.parse('[{"item": "CraftMat13", "quantity": 200}, {"item": "Liquid3", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Shimmeron", "O", "18", 80, 40, "decay", "+{% Gold Food Effect. Go on, its ok, I won't be offended. No seriously, go upgrade something else, I know I'm not a good upgrade...", JSON.parse('[{"item": "CraftMat14", "quantity": 300}, {"item": "Liquid3", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Bite But Not Chew", "O", "19", 50, 40, "decay", "+{% Food Non-Consume chance. Also, if your capped Non-Consume chance happens to be 98%, this changes it to 99%!", JSON.parse('[{"item": "GalaxyC4", "quantity": 200}, {"item": "Liquid3", "quantity": 5}]')))
    let quicc_cauldron = new Cauldron("Quicc Cauldron", "G")
    quicc_cauldron.bubbles.push(new Bubble("Swift Steppin", "G", "0", 1, 0, "add", "+{ Total AGI. Probably the lamest of the five stats... err, I mean four, hehe.", JSON.parse('[{"item": "Copper", "quantity": 15}, {"item": "Liquid1", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Archer Or Bust", "G", "1", 2, 50, "decayMulti", "All Green Passive Bonuses, which are the smaller sized ones, give {x more bonuses to your archer-based characters.", JSON.parse('[{"item": "Grasslands1", "quantity": 20}, {"item": "BirchTree", "quantity": 30}, {"item": "Liquid1", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Hammer Hammer", "G", "2", 23, 2, "bigBase", "You can now produce +1 more items at once in the anvil, and your production speed is increased by {%.", JSON.parse('[{"item": "Iron", "quantity": 30}, {"item": "Grasslands3", "quantity": 30}, {"item": "Liquid1", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Lil Big Damage", "G", "3", 20, 100, "decay", "+{% Mastery. Mastery is your stat that boosts minimum damage. Just like in Maplest... err, just like how I thought it up myself!", JSON.parse('[{"item": "Fish1", "quantity": 25}, {"item": "Jungle3", "quantity": 40}, {"item": "Liquid1", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Anvilnomics", "G", "4", 40, 100, "decay", "Costs for buying Anvil Production Points is reduced by {%. This is just like a tax cut, so remember me as a hero!", JSON.parse('[{"item": "ForestTree", "quantity": 50}, {"item": "Gold", "quantity": 40}, {"item": "Liquid1", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Quick Slap", "G", "5", 1, 0.02, "add", "Increases base damage by +$. This bonus increases based on how much Movement Speed you have above 110%.", JSON.parse('[{"item": "DesertB1", "quantity": 90}, {"item": "CraftMat6", "quantity": 200}, {"item": "Liquid1", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Sanic Tools", "G", "6", 65, 70, "decay", "The following tools give +{% more skilling Power than normal: $", JSON.parse('[{"item": "Jungle1", "quantity": 130}, {"item": "GoldBar", "quantity": 6}, {"item": "Liquid1", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Bug]", "G", "7", 23.5, 1.5, "bigBase", "Multi-Bug catching chance is increased by +{%, and your max Multi-Bug chance is 300% instead of 100%.", JSON.parse('[{"item": "Bug3", "quantity": 70}, {"item": "Liquid1", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Shaquracy", "G", "8", 1, 0, "add", "Your secondary stat (WIS for warrior, STR for archer, AGI for mage) gives +{% more Accuracy than normal.", JSON.parse('[{"item": "Fish4", "quantity": 65}, {"item": "PalmTree", "quantity": 250}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Cheap Shot", "G", "9", 7, 100, "decay", "+{% critical Chance, as it increases the chance for your attack to hit the monster's privates, and for the monster to be male.", JSON.parse('[{"item": "Bug5", "quantity": 35}, {"item": "DesertC3", "quantity": 150}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Bow Jack", "G", "10", 40, 50, "decay", "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.", JSON.parse('[{"item": "Soul1", "quantity": 5}, {"item": "Liquid2", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Call Me Ash", "G", "11", 25, 2, "bigBase", "+1 Placeable Trap, and +{% Trapping Efficiency.", JSON.parse('[{"item": "SaharanFoal", "quantity": 100}, {"item": "Liquid2", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Cuz I Catch Em All", "G", "12", 3, 100, "decayMulti", "{x more likely to catch shiny critters when opening a trap.", JSON.parse('[{"item": "Soul3", "quantity": 25}, {"item": "Liquid2", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Fast Boi Talent", "G", "13", 5, 1, "bigBase", "+{ Talent Points for EACH tab, but just for Archers! Well, and 'that' class, you know who you are!", JSON.parse('[{"item": "Bug6", "quantity": 120}, {"item": "Liquid2", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Green Bargain", "G", "14", 40, 12, "decay", "The material costs of ALL green bubbles are {% lower", JSON.parse('[{"item": "Critter5", "quantity": 200}, {"item": "Liquid2", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Dollar Of Agility", "G", "15", 18, 30, "decay", "+{% Cash from Monsters for every 250 AGI. The extra agility allows the dollars to stretch in size and increase in value!", JSON.parse('[{"item": "CraftMat11", "quantity": 250}, {"item": "Liquid3", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Premigreen", "G", "16", 1.4, 30, "decayMulti", "The following green bubbles give {x higher bonus than what they display: I, VI, VIII, X, XII", JSON.parse('[{"item": "Critter8", "quantity": 150}, {"item": "Liquid3", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Fly In Mind", "G", "17", 12, 40, "decay", "+{% Catching AFK Gains Rate. Now you too can dream about bugs in your sleep, just like I do all the time!!!!", JSON.parse('[{"item": "Bug7", "quantity": 350}, {"item": "Liquid3", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Kill Per Kill", "G", "18", 70, 40, "decay", "+{% extra Kills for Deathnote and opening portals to new maps. Shoutout to my I.S. players who fondly remember 'Kill Per Kill'!", JSON.parse('[{"item": "Refinery4", "quantity": 6}, {"item": "Liquid3", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Afk Expexp", "G", "19", 40, 40, "decay", "+{% chance for Double EXP when claiming AFK gains. You'll know this happens because it literally tells you it happened!", JSON.parse('[{"item": "Bug8", "quantity": 300}, {"item": "Liquid3", "quantity": 5}]')))
    let high_iq_cauldron = new Cauldron("High-IQ Cauldron", "P")
    high_iq_cauldron.bubbles.push(new Bubble("Stable Jenius", "P", "0", 1, 0, "add", "+{ Total WIS. Honesty the greatest bonus in any Idle Game, believe me. Absolutely incredible, everyone says so!", JSON.parse('[{"item": "CraftMat1", "quantity": 10}, {"item": "Liquid1", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Mage Is Best", "P", "1", 2, 50, "decayMulti", "All Purple Passive Bonuses, which are the smaller sized ones, give {x more bonuses to your mage-based characters.", JSON.parse('[{"item": "Grasslands1", "quantity": 25}, {"item": "CopperBar", "quantity": 13}, {"item": "Liquid1", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Hocus Choppus", "P", "2", 50, 100, "decay", "+{% choppin efficiency per power of 10 max MP that your character has. Super diaper! Err, duper.", JSON.parse('[{"item": "CraftMat5", "quantity": 22}, {"item": "ForestTree", "quantity": 40}, {"item": "Liquid1", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Molto Loggo", "P", "3", 23.5, 1.5, "bigBase", "Multi-Log chop chance is increased by +{%, and your max Multi-Log chance is now 300% instead of 100%.", JSON.parse('[{"item": "IronBar", "quantity": 21}, {"item": "DesertA2", "quantity": 30}, {"item": "Liquid1", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Noodubble", "P", "4", 100, 60, "decay", "+{% Choppin' and Alchemy EXP gain. Y'know what, I'll even... actually, never mind.", JSON.parse('[{"item": "CraftMat7", "quantity": 20}, {"item": "Fish2", "quantity": 30}, {"item": "Liquid1", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Name I Guess", "P", "5", 1, 0.02, "add", "Increases base damage by +$. This bonus increases based on how much Max MP you have above 150.", JSON.parse('[{"item": "Jungle2", "quantity": 110}, {"item": "Gold", "quantity": 40}, {"item": "Liquid1", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Le Brain Tools", "P", "6", 65, 70, "decay", "The following tools give +{% more skilling Power than normal: $", JSON.parse('[{"item": "BirchTree", "quantity": 250}, {"item": "Bug3", "quantity": 55}, {"item": "Liquid1", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Cookin Roadkill", "P", "7", 120, 70, "decay", "Cranium Cooking lasts {% longer, gives {% more progress per kill, and has a {% lower cooldown. Also +{% Alchemy EXP!", JSON.parse('[{"item": "ToiletTree", "quantity": 75}, {"item": "Liquid1", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Brewstachio", "P", "8", 50, 100, "decay", "+{% Brew Speed. This a multiplicative bonus, which means its ultra powerful, all the time! Even on Mondays, the worst day!", JSON.parse('[{"item": "DesertC1", "quantity": 150}, {"item": "Fish4", "quantity": 50}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("All For Kill", "P", "9", 40, 100, "decay", "Attack Talents give +{% higher bonuses to Offline Gains than they normally do. So you might as well just AFK forever, bye!", JSON.parse('[{"item": "StumpTree", "quantity": 100}, {"item": "PlatBar", "quantity": 5}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Matty Stafford", "P", "10", 40, 50, "decay", "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.", JSON.parse('[{"item": "Refinery1", "quantity": 3}, {"item": "Liquid2", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Call Me Pope", "P", "11", 2.4, 70, "decayMulti", "{x Worship Charge rate per hour. Also, {x Max Worship Charge! You bouta go super with all that charge... just sayin'", JSON.parse('[{"item": "Critter2", "quantity": 25}, {"item": "Liquid2", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Gospel Leader", "P", "12", 60, 30, "decay", "+{% Max Charge per 10 Worship levels. I guess you could say this upgrade doesn't come Free of Charge!", JSON.parse('[{"item": "Bug5", "quantity": 150}, {"item": "Liquid2", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Smart Boi Talent", "P", "13", 5, 1, "bigBase", "Sorry, mages don't get anything because you're lame.... Ok fine, you can have +{ Talent Points for each tab, but I'm not happy about it.", JSON.parse('[{"item": "SnowC1", "quantity": 150}, {"item": "Liquid2", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Purple Bargain", "P", "14", 40, 12, "decay", "The material costs of ALL purple bubbles are {% lower", JSON.parse('[{"item": "Soul1", "quantity": 500}, {"item": "Liquid2", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Nickel Of Wisdom", "P", "15", 18, 30, "decay", "+{% Cash from Monsters for every 250 WIS. Wisdom allows the nickel to trick others into thinking its a Dime, increasing its value!", JSON.parse('[{"item": "AlienTree", "quantity": 150}, {"item": "Liquid3", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Severapurple", "P", "16", 1.4, 30, "decayMulti", "The following purple bubbles give {x higher bonus than what they display: I, III, VI, X, XII", JSON.parse('[{"item": "Void", "quantity": 175}, {"item": "Liquid3", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Tree Sleeper", "P", "17", 12, 40, "decay", "+{% Choppin' AFK Gains Rate. Ain't nothin' like sittin' down at the ol' tree and havin' a snooze n' a sleep!", JSON.parse('[{"item": "Soul5", "quantity": 60}, {"item": "Liquid3", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Hyperswift", "P", "18", 30, 30, "decay", "+{% Basic Attack Speed. Just like all other Basic Attack Speed bonuses, this boosts AFK kills/hr if you do enough dmg!", JSON.parse('[{"item": "Fish7", "quantity": 250}, {"item": "Liquid3", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Matrix Evolved", "P", "19", 60, 40, "decay", "+{% Lab EXP Gain. Also +{% ineptitude to face the reality of what's REALLY going on behind the scenes...", JSON.parse('[{"item": "Tree8", "quantity": 250}, {"item": "Liquid3", "quantity": 5}]')))
    let kazam_cauldron = new Cauldron("Kazam Cauldron", "Y")
    kazam_cauldron.bubbles.push(new Bubble("Lotto Skills", "Y", "0", 1, 0, "add", "+{ LUK. Also, this will increase your chances of winning the lottery in real life from 0.0% to 0.000%! I'm not even joking, it's true!!", JSON.parse('[{"item": "Copper", "quantity": 11}, {"item": "OakTree", "quantity": 15}, {"item": "CraftMat1", "quantity": 8}, {"item": "Liquid1", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Droppin Loads", "Y", "1", 40, 70, "decay", "+{% Drop Rate. Thanks to this upgrade, you can get even MORE angry when you keep not getting that rare pet drop from the boss!", JSON.parse('[{"item": "Fish1", "quantity": 20}, {"item": "Bug1", "quantity": 30}, {"item": "Liquid1", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Startue Exp", "Y", "2", 25, 60, "decay", "Leveling up a statue resets it's exp bar down to {%, instead of 0%. Staturrific! Yea... the jokes are only gonna go downhill from here lol", JSON.parse('[{"item": "DesertA1", "quantity": 30}, {"item": "Forest2", "quantity": 40}, {"item": "Liquid1", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Level Up Gift", "Y", "3", 100, 30, "decay", "Whenever you level up anything, {% chance to drop a gift! It could be an EXP balloon, a Gem for the gem shop, or something crazy weird!", JSON.parse('[{"item": "Iron", "quantity": 35}, {"item": "JungleTree", "quantity": 70}, {"item": "CraftMat5", "quantity": 30}, {"item": "Liquid1", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Prowesessary", "Y", "4", 1.5, 60, "decayMulti", "The Prowess Bonus for every skill is multiplied by {. Prowess lowers the Efficiency needed to get multiple QTY per drop from resources.", JSON.parse('[{"item": "GoldBar", "quantity": 25}, {"item": "ToiletTree", "quantity": 50}, {"item": "Liquid1", "quantity": 3}]')))
    kazam_cauldron.bubbles.push(new Bubble("Stamp Tramp", "Y", "5", 1, 0, "add", "Increases the Max Lv of the 'Toilet Paper Postage' Talent to {. You can unlock this talent by typing 'More like Poopy Pete' near Pete.", JSON.parse('[{"item": "Bug2", "quantity": 65}, {"item": "Liquid1", "quantity": 4}]')))
    kazam_cauldron.bubbles.push(new Bubble("Undeveloped Costs", "Y", "6", 40, 70, "decay", "Reduces the material costs of all Alchemy Bubbles by {%. They are just bubbles though, how much could they even cost? 10 dollars?", JSON.parse('[{"item": "Fish3", "quantity": 75}, {"item": "Liquid1", "quantity": 6}]')))
    kazam_cauldron.bubbles.push(new Bubble("Da Daily Drip", "Y", "7", 30, 100, "decay", "Increases the Max Cap for every liquid by +$. This bonus increases based on the combined Alchemy LV of all your characters!", JSON.parse('[{"item": "CraftMat9", "quantity": 125}, {"item": "Liquid1", "quantity": 8}]')))
    kazam_cauldron.bubbles.push(new Bubble("Grind Time", "Y", "8", 9.7, 0.3, "bigBase", "+{% Class EXP. The go-to active bubble for anyone who wants to reach max level faster and finally start playing the game!", JSON.parse('[{"item": "Liquid1", "quantity": 50}, {"item": "Liquid2", "quantity": 25}]')))
    kazam_cauldron.bubbles.push(new Bubble("Laaarrrryyyy", "Y", "9", 120, 100, "decay", "Every time you upgrade an Alchemy bubble, there's a {% chance it'll upgrade 2 times, for no extra cost! Two fer one, getter dun!", JSON.parse('[{"item": "Dementia", "quantity": 50}, {"item": "DesertC4", "quantity": 130}, {"item": "Liquid2", "quantity": 4}]')))
    kazam_cauldron.bubbles.push(new Bubble("Cogs For Hands", "Y", "10", 4, 0, "add", "+{% Cog Production speed. Cogs are great. I really really like cogs. I guess you could say I think they're pretty Coggers...", JSON.parse('[{"item": "SnowA2", "quantity": 50}, {"item": "Liquid2", "quantity": 3}]')))
    kazam_cauldron.bubbles.push(new Bubble("Sample It", "Y", "11", 12, 40, "decay", "+{% Sample Size when taking samples for the 3d printer. Finally, your statisitcal analysis will be accurate!", JSON.parse('[{"item": "Soul2", "quantity": 15}, {"item": "Liquid2", "quantity": 3}]')))
    kazam_cauldron.bubbles.push(new Bubble("Big Game Hunter", "Y", "12", 70, 50, "decay", "Each time a Giant Monster spawns, the chance for another Giant Monster in that same week goes down by {% less than normal.", JSON.parse('[{"item": "Critter3", "quantity": 40}, {"item": "Liquid2", "quantity": 4}]')))
    kazam_cauldron.bubbles.push(new Bubble("Ignore Overdues", "Y", "13", 100, 60, "decay", "+{% Book Checkout speed, thanks to this one little bubble that librarians do NOT want you to know about!", JSON.parse('[{"item": "Tree7", "quantity": 120}, {"item": "Liquid2", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Yellow Bargain", "Y", "14", 40, 12, "decay", "The material costs of ALL yellow bubbles are {% lower.", JSON.parse('[{"item": "Critter6", "quantity": 250}, {"item": "Liquid2", "quantity": 3}]')))
    kazam_cauldron.bubbles.push(new Bubble("Mr Massacre", "Y", "15", 90, 50, "decay", "+{% Multikill per damage tier. Remember, damage tier is shown by the Purple Bar in AFK info, and multikill is bigtime for resources", JSON.parse('[{"item": "Refinery3", "quantity": 8}, {"item": "Liquid3", "quantity": 3}]')))
    kazam_cauldron.bubbles.push(new Bubble("Egg Ink", "Y", "16", 40, 40, "decay", "+{% faster Egg Incubation Time in the Pet Nest. This will be an absolutely VITAL upgrade once you unlock pet egg rarity!", JSON.parse('[{"item": "Spice0", "quantity": 100}, {"item": "Liquid3", "quantity": 4}]')))
    kazam_cauldron.bubbles.push(new Bubble("Diamond Chef", "Y", "17", 1.6, 40, "decayMulti", "{x faster Meal and Fire Kitchen Speeds for every Meal at Lv 11+. This is when the meal plate goes Diamond, just so you know.", JSON.parse('[{"item": "Spice6", "quantity": 100}, {"item": "Liquid3", "quantity": 4}]')))
    kazam_cauldron.bubbles.push(new Bubble("Card Champ", "Y", "18", 100, 40, "decay", "+{% Card Drop Chance for all card types, even Party Dungeon cards!", JSON.parse('[{"item": "Spice9", "quantity": 100}, {"item": "Liquid3", "quantity": 5}]')))
    kazam_cauldron.bubbles.push(new Bubble("Petting The Rift", "Y", "19", 1.5, 60, "decayMulti", "{x New Pet Chance for every gap you traverse in the SpaceTime Rift. The Rift entrance is deep in World 4, far above the 8 armed octodars.", JSON.parse('[{"item": "Critter10", "quantity": 100}, {"item": "Liquid3", "quantity": 5}]')))
    alchemy.vials.push(new Vial(0, "Copper Corona", 3, 0, "add", "Orange bubble cauldron brew speed is increased by +{%", JSON.parse('[{"item": "Copper", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(1, "Sippy Splinters", 3, 0, "add", "Green bubble cauldron brew speed is increased by +{%", JSON.parse('[{"item": "OakTree", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(2, "Mushroom Soup", 3, 0, "add", "Yellow cauldron brew speed is increased by +{%", JSON.parse('[{"item": "Grasslands1", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(3, "Spool Sprite", 3, 0, "add", "Purple cauldron brew speed is increased by +{%", JSON.parse('[{"item": "CraftMat1", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(4, "Barium Mixture", 3, 0, "add", "+{ Water Droplet max capacity. Thats the 1st liquid type in Alchemy, btw.", JSON.parse('[{"item": "CopperBar", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(5, "Dieter Drink", 1, 0, "add", "Monsters drop +{% more money.", JSON.parse('[{"item": "Grasslands3", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(6, "Skinny 0 Cal", 2.5, 0, "add", "+{% chance to get double points when depositing statues. So like... if you deposit one statue, it might count as one! Or two.", JSON.parse('[{"item": "Jungle2", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(7, "Thumb Pow", 1, 0, "add", "When converting Skill EXP into Class EXP using the 'EXP CONVERTER' star talent, you'll get {% more Class EXP than you usually do.", JSON.parse('[{"item": "CraftMat5", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(8, "Jungle Juice", 1, 0, "add", "+{% liquid regen rate for all liquid cauldrons. Yes, even the secret one!", JSON.parse('[{"item": "JungleTree", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(9, "Barley Brew", 1, 0, "add", "Alchemy bubble upgrade costs are {% lower for all bubbles! Even the giraffe bubbles that look strangely like elephants!", JSON.parse('[{"item": "IronBar", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(10, "Anearful", 2, 0, "add", "+{% Card drop rate. Even works offline, just like it always has! What do you mean this used to say something different...?", JSON.parse('[{"item": "Forest1", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(11, "Tea With Pea", 3, 0, "add", "+{ Liquid Nitrogen max capacity. Thats the 2nd liquid type in Alchemy, btw.", JSON.parse('[{"item": "ToiletTree", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(12, "Gold Guzzle", 1, 0, "add", "+{% Shop sell price.", JSON.parse('[{"item": "Gold", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(13, "Ramificoction", 1, 0, "add", "+{ Talent Points for Tab 1. Shout out to that 1 person who'll make it this far without knowing what talents are, you're my hero!", JSON.parse('[{"item": "Forest3", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(14, "Seawater", 1, 0, "add", "+{% chance for 1 kill to count for 2 when trying to open new portals, but only while actively playing. One, two, buckle my shoe.", JSON.parse('[{"item": "Fish1", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(15, "Tail Time", 0.5, 0, "add", "+{ Weapon Power. This is gonna be OP in later worlds I can already tell.", JSON.parse('[{"item": "Sewers2", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(16, "Fly In My Drink", 3, 0, "add", "Eww go get me another one, I can't drink this! ...what, why are you looking at me like that? OH right, uh, this gives +{ base Accuracy.", JSON.parse('[{"item": "Bug1", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(17, "Mimicraught", 1, 0, "add", "+{% EXP from monsters. Sorry, I know this is a lame bonus. Send me an email if you want me change it to +{% NPC dialogue talking speed.", JSON.parse('[{"item": "DesertA2", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(18, "Blue Flav", 30, 7, "decay", "-{% material cost for stamps. You know how it's hard to increase stamps max levels? Well this kinda makes that a bit less factual!", JSON.parse('[{"item": "Plat", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(19, "Slug Slurp", 2, 0, "add", "+{ Post Office Box Points for every character, and easily the best bonus in the game. A box will never abandon you!", JSON.parse('[{"item": "Fish2", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(20, "Pickle Jar", 50, 0, "add", "+{% Nothing. Absolutely nothing, now and forever. It's a darn pickle, what were you expecting?", JSON.parse('[{"item": "BobJoePickle", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(21, "Fur Refresher", 2, 0, "add", "+{% higher Shiny Critter chance. This is a multiplier, so +1% from this vial means 1.01x, so 5% shiny chance would go to 5.05%.", JSON.parse('[{"item": "SnowA1", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(22, "Sippy Soul", 1, 0, "add", "+{ Talent Points for Tab 2.", JSON.parse('[{"item": "Soul1", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(23, "Crab Juice", 4, 0, "add", "+{ Starting points in Worship Tower Defence. Of course, a true balloon monkey wouldn't accept handouts like this.", JSON.parse('[{"item": "Critter2", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(24, "Void Vial", 1, 0, "add", "+{% Mining Efficiency.", JSON.parse('[{"item": "Void", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(25, "Red Malt", 1, 0, "add", "+{% Refinery Cycle Speed. I just want to see you squirm a bit more as you decide where to spend your precious salts hahahaha!!", JSON.parse('[{"item": "Refinery1", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(26, "Ew Gross Gross", 1, 0, "add", "+{% Catching Efficiency.", JSON.parse('[{"item": "Bug5", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(27, "The Spanish Sahara", 1, 0, "add", "+{% Choppin Efficiency.", JSON.parse('[{"item": "SaharanFoal", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(28, "Poison Tincture", 3, 0, "add", "Eagle Eye Trap-O-Vision gives +{% more critters. It will always give less than if you manually collected the traps though.", JSON.parse('[{"item": "Critter1A", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(29, "Etruscan Lager", 1, 0, "add", "+{% Fishing Efficiency.", JSON.parse('[{"item": "SnowB2", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(30, "Chonker Chug", 1, 0, "add", "+{% Talent Book Library checkout speed.", JSON.parse('[{"item": "Soul2", "quantity": -1}, {"item": "Liquid2", "quantity": -1}]')))
    alchemy.vials.push(new Vial(31, "Bubonic Burp", 1, 0, "add", "+{ Cog Inventory spaces. DONT PANIC!!! I KNOW HOW ALARMING IT IS THAT A VIAL FINALLY GIVES A USEFUL BONUS FOR ONCE, BUT STAY CALM!", JSON.parse('[{"item": "Critter4", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(32, "Visible Ink", 1, 0, "add", "+{% Construction Exp gain.", JSON.parse('[{"item": "SnowB3", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(33, "Orange Malt", 5, 0, "add", "+{% higher Shiny Critter chance. This stacks with the shiny chance from the Fur Refresher vial. You see, they have the same shaped vial.", JSON.parse('[{"item": "Refinery2", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(34, "Snow Slurry", 0.5, 0, "add", "+{% Printer sample size. My my there are a lot of these 'sample size' bonuses in the game... too many...", JSON.parse('[{"item": "SnowB5", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(35, "Slowergy Drink", 1, 0, "add", "+{% Base Multikill per Multikill Tier for all worlds. Stack them skulls!", JSON.parse('[{"item": "Soul4", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(36, "Sippy Cup", 1, 0, "add", "+{% Cog production speed.", JSON.parse('[{"item": "SnowC1", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(37, "Bunny Brew", 1, 0, "add", "+{ Talent Points for Tab 3.", JSON.parse('[{"item": "Critter7", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(38, "40-40 Purity", 1, 0, "add", "+{ Trench Seawater max capacity. Thats the 3rd liquid type in Alchemy, btw.", JSON.parse('[{"item": "SnowC4", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(39, "Shaved Ice", 1, 0, "add", "+{% base Giant Monster spawn rate.", JSON.parse('[{"item": "Refinery5", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(40, "Goosey Glug", 1, 0, "add", "+{ base critter per trap. This is a sHONKingly good bonus, the only one of its kind!", JSON.parse('[{"item": "Critter9", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(41, "Ball Pickle Jar", 25, 0, "add", "+{% arcade ball gain rate, and those are balls blessed by Balljoepickle himself, so you know they're extra lucky!", JSON.parse('[{"item": "BallJoePickle", "quantity": -1}, {"item": "Liquid1", "quantity": -1}]')))
    alchemy.vials.push(new Vial(42, "Capachino", 4, 0, "add", "+{% Breeding EXP gain", JSON.parse('[{"item": "GalaxyA1", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(43, "Donut Drink", 5, 0, "add", "+{% Chance to breed a new pet. Multiplicative, so +5% here would change a 1 in 100 to 1 in 95 chance.", JSON.parse('[{"item": "GalaxyA3", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(44, "Long Island Tea", 6, 0, "add", "+{% Meal Cooking Speed", JSON.parse('[{"item": "Fish6", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(45, "Spook Pint", 5, 0, "add", "+{% New Recipe Cooking Speed", JSON.parse('[{"item": "Soul5", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(46, "Calcium Carbonate", 11, 0, "add", "+{ Starting Worship Pts.", JSON.parse('[{"item": "GalaxyB3", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(47, "Bloat Draft", 3, 0, "add", "+{% Lab EXP gain", JSON.parse('[{"item": "Critter10", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(48, "Choco Milkshake", 50, 7, "decay", "-{% Kitchen Upgrading Cost.", JSON.parse('[{"item": "GalaxyB4", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(49, "Pearl Seltzer", 0.5, 0, "add", "+{% All Stats. If you don't know what all stats means by now, you've prolly got bigger problems than not knowing what all stats means.", JSON.parse('[{"item": "GalaxyC1b", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(50, "Krakenade", 1, 0, "add", "+{ Weapon Power", JSON.parse('[{"item": "Fish8", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.vials.push(new Vial(51, "Electrolyte", 2, 0, "add", "+{% Pet Team Damage", JSON.parse('[{"item": "GalaxyC4", "quantity": -1}, {"item": "Liquid3", "quantity": -1}]')))
    alchemy.cauldrons.push(power_cauldron);
    alchemy.cauldrons.push(quicc_cauldron);
    alchemy.cauldrons.push(high_iq_cauldron);
    alchemy.cauldrons.push(kazam_cauldron);
    return alchemy;
}

const handleCauldron = (cauldronData: Map<string, number>, index: number, alchemy: Alchemy, boostLevels: Array<number>) => {
    Object.entries(cauldronData).forEach(([bubble_number, level], _) => {
        if (bubble_number !== "length" && parseInt(bubble_number) < alchemy.cauldrons[index].bubbles.length) {
            try {
                alchemy.cauldrons[index].bubbles[parseInt(bubble_number)].level = level;
            }
            catch (e) {
                console.log(`Failed on ${bubble_number} / ${index}`, e)
            }
        }
    });

    for (let boost in CauldronBoostIndex) {
        // ignore the keys from the enum
        if (isNaN(parseInt(boost))) {
            continue;
        }
        alchemy.cauldrons[index].boostLevels[boost] = boostLevels[(index * AlchemyConst.CauldronCount) + parseInt(boost.toString())];
    }
}

const handleVial = (vialData: Map<string, number>, alchemy: Alchemy) => {
    for (let [vial, level] of Object.entries(vialData)) {
        if (vial !== "length" && parseInt(vial) < alchemy.vials.length) {
            try {
                alchemy.vials[parseInt(vial)].level = level;
            }
            catch (e) {
                console.log(`Failed on vial ${vial}`, e)
            }
        }
    };
}

const convertToItemClass = (alchemy: Alchemy, allItems: Item[]) => {
    alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).forEach(bubble => {
        bubble.rawRequirements.forEach(req => {
            const reqItem = allItems.find(item => item.internalName == req.item)?.duplicate() ?? new Item({ displayName: req.item, internalName: req.item });
            reqItem.count = req.quantity;
            bubble.requirements.push(reqItem);
        })
    })

    alchemy.vials.forEach(vial => {
        vial.rawRequirements.forEach(req => {
            const reqItem = allItems.find(item => item.internalName == req.item)?.duplicate() ?? new Item({ displayName: req.item, internalName: req.item });
            reqItem.count = req.quantity;
            vial.requirements.push(reqItem);
        })
    })
}

export default function parseAlchemy(alchemyData: Array<Map<string, number>>, boostLevels: Array<number>, allItems: Item[]) {
    var alchemy = initAlchemy();
    alchemyData.forEach((indexData, index) => {
        // Handle cauldrons if the first 4 arrays of data
        if (index in CauldronIndex) {
            handleCauldron(indexData, index, alchemy, boostLevels)
        }
        // Handle vials if 5th array of data
        if (index == AlchemyConst.VialIndex) {
            handleVial(indexData, alchemy);
        }
    })

    convertToItemClass(alchemy, allItems);
    return alchemy;
}

export function updateAlchemy(data: Map<string, any>) {
    const alchemy = data.get("alchemy") as Alchemy;
    const lab = data.get("lab") as Lab;

    if (lab.bonuses.find(bonus => bonus.name == "My 1st Chemistry Set")?.active ?? false) {
        alchemy.vials.forEach(vial => vial.bonusMulitplier = 2)
    }

    if (lab.bonuses.find(bonus => bonus.name == "No Bubble Left Behind")?.active) {
        let bubblesToUpgrade = 3;
        if (lab.jewels.find(jewel => jewel.data.name == "Pyrite Rhinestone")?.active) {
            bubblesToUpgrade += 1;
        }
        const sortedBubbles = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles.slice(0, 15).filter(bubble => bubble.level > 5)).sort((bubble1, bubble2) => bubble1.level < bubble2.level ? -1 : 1);
        sortedBubbles.slice(0, bubblesToUpgrade).forEach(bubble => bubble.labUpgrade = true);
    }

    return alchemy;
}