import { lavaFunc } from '../utility'

export enum StampTab {
    Combat = 0,
    Skill = 1,
    Misc = 2
}

export const StampConsts = {
    PraydayIndex: 34,
    FlowinIndex: 33,
    CrystallinIndex: 2,
}

interface StampData {
    effect: string; // todo: ENUM
    function: string; // todo: ENUM
    x1: number;
    x2: number;
    upgradeInterval: number;
    material: string;
    startV: number;
    mCostExp: number;
    startingCost: number;
    cCostExp: number;
    i10: number;
    upgradeText: string;
    i12: number;
}

export class Stamp {
    raw_name: string;
    name: string;
    level: number = 0;
    maxLevel: number = 0;
    icon: string;
    type: string; // todo: enum
    bonus: string;
    data: StampData;


    constructor(name: string, raw_name: string, type: string, bonus: string, data: StampData) {
        this.raw_name = raw_name;
        this.icon = `/icons/assets/data/${raw_name}.png`;
        this.name = name.replace("_", " ");
        this.type = type;
        this.bonus = bonus;
        this.data = data;
    }

    getGoldCost = (hasBribe: boolean = false, blueFlavPercent: number = 0): number => {
        const goldCost = this.data.startingCost * Math.pow(this.data.cCostExp - (this.level / (this.level + 5 * this.data.upgradeInterval)) * 0.25, this.level * (10 / this.data.upgradeInterval)) * Math.max(0.1, 1 - blueFlavPercent);
        if (hasBribe) {
            //TODO: Make this math less... hard coded?
            return goldCost * 0.92;
        }
        return goldCost
    }

    getMaterialCost = (blueFlavPercent: number = 0): number => {
        const baseCost = this.data.startV * Math.pow(this.data.mCostExp, Math.pow(Math.round(this.level / this.data.upgradeInterval) - 1, 0.8));
        return Math.floor(baseCost) * Math.max(0.1, 1 - blueFlavPercent);
    }

    getBonusText = (skillLevel: number = 0): string => {
        return this.bonus.replace(/{/, this.getBonus(skillLevel, true).toString());
    }

    getBonus = (skillLevel: number = 0, round = false): number => {
        const normalLevel = this.level * 10 / this.data.upgradeInterval;
        const lvlDiff = 3 + (normalLevel - 3) * Math.pow(skillLevel / (normalLevel - 3), 0.75)
        const reducedLevel = Math.floor(lvlDiff * this.data.upgradeInterval / 10);
        // only second tab gets reduced level math and only if the reduced level is lower than stamp level.
        if (skillLevel > 0 && reducedLevel < this.level && this.raw_name.includes("B")) {
            return lavaFunc(this.data.function, reducedLevel, this.data.x1, this.data.x2, round);
        }
        return lavaFunc(this.data.function, this.level, this.data.x1, this.data.x2, round);
    }

    isMaxLevel = (): boolean => {
        return this.level == this.maxLevel;
    }
}

const initStamps = (): Stamp[][] => {
    let combat_stamp = [
        new Stamp("Sword Stamp", "StampA1", "Combat Stamp", "+{ Base Damage", JSON.parse('{"effect": "BaseDmg", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "Grasslands1", "startV": 20, "mCostExp": 5, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base Damage", "i12": 3}')),
        new Stamp("Heart Stamp", "StampA2", "Combat Stamp", "+{ Base HP", JSON.parse('{"effect": "BaseHP", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "OakTree", "startV": 25, "mCostExp": 7, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base HP", "i12": 3}')),
        new Stamp("Mana Stamp", "StampA3", "Combat Stamp", "+{ Base MP", JSON.parse('{"effect": "BaseMP", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "Copper", "startV": 25, "mCostExp": 7, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base MP", "i12": 0}')),
        new Stamp("Tomahawk Stamp", "StampA4", "Combat Stamp", "+{% Total Damage", JSON.parse('{"effect": "PctDmg", "function": "decay", "x1": 6, "x2": 40, "upgradeInterval": 4, "material": "CopperBar", "startV": 15, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Total Damage", "i12": 3}')),
        new Stamp("Target Stamp", "StampA5", "Combat Stamp", "+{ Base Accuracy", JSON.parse('{"effect": "BaseAcc", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "CraftMat1", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base Accuracy", "i12": 3}')),
        new Stamp("Shield Stamp", "StampA6", "Combat Stamp", "+{ Base Defence", JSON.parse('{"effect": "BaseDef", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "Iron", "startV": 50, "mCostExp": 7, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base Defence", "i12": 3}')),
        new Stamp("Longsword Stamp", "StampA7", "Combat Stamp", "+{ Base Damage", JSON.parse('{"effect": "BaseDmg", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 4, "material": "Grasslands3", "startV": 50, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base Damage", "i12": 6}')),
        new Stamp("Kapow Stamp", "StampA8", "Combat Stamp", "+{% Critical Damage", JSON.parse('{"effect": "CritDmg", "function": "decay", "x1": 8, "x2": 40, "upgradeInterval": 3, "material": "CraftMat5", "startV": 50, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Critical Damage", "i12": 6}')),
        new Stamp("Fist Stamp", "StampA9", "Combat Stamp", "+{ STR", JSON.parse('{"effect": "BaseSTR", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "BirchTree", "startV": 50, "mCostExp": 7, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} STR", "i12": 3}')),
        new Stamp("Battleaxe Stamp", "StampA10", "Combat Stamp", "+{% Total Damage", JSON.parse('{"effect": "PctDmg", "function": "decay", "x1": 10, "x2": 40, "upgradeInterval": 4, "material": "Leaf1", "startV": 25, "mCostExp": 4, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Total Damage", "i12": 5}')),
        new Stamp("Agile Stamp", "StampA11", "Combat Stamp", "+{ AGI", JSON.parse('{"effect": "BaseAGI", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "EquipmentToolsHatchet3", "startV": 1, "mCostExp": 4, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} AGI", "i12": 0}')),
        new Stamp("Vitality Stamp", "StampA12", "Combat Stamp", "+{ Base HP", JSON.parse('{"effect": "BaseHP", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 4, "material": "Jungle2", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base HP", "i12": 6}')),
        new Stamp("Book Stamp", "StampA13", "Combat Stamp", "+{ WIS", JSON.parse('{"effect": "BaseWIS", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "IronBar", "startV": 20, "mCostExp": 5, "startingCost": 50, "cCostExp": 1.35, "i10": 0, "upgradeText": "{} WIS", "i12": 3}')),
        new Stamp("Manamoar Stamp", "StampA14", "Combat Stamp", "+{ Base MP", JSON.parse('{"effect": "BaseMP", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 3, "material": "Forest1", "startV": 25, "mCostExp": 6, "startingCost": 75, "cCostExp": 1.32, "i10": 0, "upgradeText": "{} Base MP", "i12": 2}')),
        new Stamp("Clover Stamp", "StampA15", "Combat Stamp", "+{ LUK", JSON.parse('{"effect": "BaseLUK", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "EquipmentShirts12", "startV": 1, "mCostExp": 2, "startingCost": 300, "cCostExp": 1.38, "i10": 0, "upgradeText": "{} LUK", "i12": 6}')),
        new Stamp("Scimitar Stamp", "StampA16", "Combat Stamp", "+{ Base Damage", JSON.parse('{"effect": "BaseDmg", "function": "add", "x1": 3, "x2": 0, "upgradeInterval": 4, "material": "Fish1", "startV": 75, "mCostExp": 7, "startingCost": 2000, "cCostExp": 1.33, "i10": 0, "upgradeText": "{} Base Damage", "i12": 0}')),
        new Stamp("Bullseye Stamp", "StampA17", "Combat Stamp", "+{ Base Accuracy.", JSON.parse('{"effect": "BaseAcc", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 5, "material": "Bug3", "startV": 100, "mCostExp": 10, "startingCost": 5000, "cCostExp": 1.36, "i10": 0, "upgradeText": "{} Base Accuracy", "i12": 0}')),
        new Stamp("Feather Stamp", "StampA18", "Combat Stamp", "+{% Movement Speed", JSON.parse('{"effect": "PctMoveSpd", "function": "decay", "x1": 5, "x2": 50, "upgradeInterval": 5, "material": "DesertB1", "startV": 25, "mCostExp": 6, "startingCost": 2500, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base Move Speed", "i12": 0}')),
        new Stamp("Polearm Stamp", "StampA19", "Combat Stamp", "+{% Total Damage", JSON.parse('{"effect": "PctDmg", "function": "decay", "x1": 16, "x2": 40, "upgradeInterval": 6, "material": "TestObj7", "startV": 1, "mCostExp": 2, "startingCost": 3000, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Total Damage", "i12": 0}')),
        new Stamp("Violence Stamp", "StampA20", "Combat Stamp", "+{ STR", JSON.parse('{"effect": "BaseSTR", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 3, "material": "Dementia", "startV": 10, "mCostExp": 7, "startingCost": 10000, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} STR", "i12": 0}')),
        new Stamp("Buckler Stamp", "StampA21", "Combat Stamp", "+{ Base Defence", JSON.parse('{"effect": "BaseDef", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 7, "material": "PlatBar", "startV": 25, "mCostExp": 6, "startingCost": 2200, "cCostExp": 1.305, "i10": 0, "upgradeText": "{} Base Defence", "i12": 0}')),
        new Stamp("Hermes Stamp", "StampA22", "Combat Stamp", "+{ AGI", JSON.parse('{"effect": "BaseAGI", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 3, "material": "Soul3", "startV": 30, "mCostExp": 7, "startingCost": 10000, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} STR", "i12": 0}')),
        new Stamp("Sukka Foo", "StampA23", "Combat Stamp", "+{% Damage Toward Bosses", JSON.parse('{"effect": "BossDmg", "function": "decay", "x1": 24, "x2": 60, "upgradeInterval": 10, "material": "Quest17", "startV": 3, "mCostExp": 5, "startingCost": 10000, "cCostExp": 1.34, "i10": 0, "upgradeText": "{}% Boss Damage", "i12": 0}')),
        new Stamp("Arcane Stamp", "StampA24", "Combat Stamp", "+{ WIS", JSON.parse('{"effect": "BaseWIS", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 3, "material": "GoldBar", "startV": 50, "mCostExp": 7, "startingCost": 1550, "cCostExp": 1.36, "i10": 0, "upgradeText": "{} Base WIS", "i12": 0}')),
        new Stamp("Avast Yar Stamp", "StampA25", "Combat Stamp", "+{ Base Damage", JSON.parse('{"effect": "BaseDmg", "function": "add", "x1": 6, "x2": 0, "upgradeInterval": 5, "material": "Critter7", "startV": 75, "mCostExp": 7, "startingCost": 15000, "cCostExp": 1.33, "i10": 0, "upgradeText": "{} Base Damage", "i12": 0}')),
        new Stamp("Steve Sword", "StampA26", "Combat Stamp", "+{% Total Damage. Also grats on 1 million followers!", JSON.parse('{"effect": "PctDmg", "function": "decay", "x1": 20, "x2": 60, "upgradeInterval": 10, "material": "Bug4", "startV": 150, "mCostExp": 5, "startingCost": 10000, "cCostExp": 1.32, "i10": 0, "upgradeText": "{}% Total Damage", "i12": 0}')),
        new Stamp("Blover Stamp", "StampA27", "Combat Stamp", "+{ LUK", JSON.parse('{"effect": "BaseLUK", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 4, "material": "Fish3", "startV": 100, "mCostExp": 7, "startingCost": 25000, "cCostExp": 1.39, "i10": 0, "upgradeText": "{} Base LUK", "i12": 0}')),
        new Stamp("Stat Graph Stamp", "StampA28", "Combat Stamp", "+{ All Stats. ''All Stats'' means STR, AGI, WIS, and LUK", JSON.parse('{"effect": "BaseAllStat", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "StoneZ1", "startV": 2, "mCostExp": 2, "startingCost": 2000, "cCostExp": 1.36, "i10": 0, "upgradeText": "{} All Stats", "i12": 0}')),
        new Stamp("Gilded Axe Stamp", "StampA29", "Combat Stamp", "+{ Base Damage", JSON.parse('{"effect": "BaseDmg", "function": "add", "x1": 8, "x2": 0, "upgradeInterval": 6, "material": "CraftMat12", "startV": 200, "mCostExp": 6, "startingCost": 2000000, "cCostExp": 1.43, "i10": 0, "upgradeText": "{} Base Damage", "i12": 0}')),
        new Stamp("Diamond Axe Stamp", "StampA30", "Combat Stamp", "+{% Total Damage", JSON.parse('{"effect": "PctDmg", "function": "decay", "x1": 20, "x2": 60, "upgradeInterval": 10, "material": "CraftMat14", "startV": 200, "mCostExp": 6, "startingCost": 3000000, "cCostExp": 1.47, "i10": 0, "upgradeText": "{}% Total Damage", "i12": 0}')),
        new Stamp("Tripleshot Stamp", "StampA31", "Combat Stamp", "+{ Base Accuracy", JSON.parse('{"effect": "BaseAcc", "function": "add", "x1": 3, "x2": 0, "upgradeInterval": 10, "material": "CraftMat13", "startV": 200, "mCostExp": 6, "startingCost": 1500000, "cCostExp": 1.4, "i10": 0, "upgradeText": "{} Base Accuracy", "i12": 0}')),
        new Stamp("Blackheart Stamp", "StampA32", "Combat Stamp", "+{ Base HP", JSON.parse('{"effect": "BaseHP", "function": "add", "x1": 10, "x2": 0, "upgradeInterval": 15, "material": "CraftMat11", "startV": 200, "mCostExp": 6, "startingCost": 1000000, "cCostExp": 1.4, "i10": 0, "upgradeText": "{} Base HP", "i12": 0}')),
        new Stamp("FILLER", "StampA33", "Combat Stamp", "FILLER", JSON.parse('{"effect": "BaseDef", "function": "add", "x1": 30, "x2": 0, "upgradeInterval": 10, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base Defence", "i12": 0}')),
        new Stamp("FILLER", "StampA34", "Combat Stamp", "FILLER", JSON.parse('{"effect": "BaseDef", "function": "add", "x1": 30, "x2": 0, "upgradeInterval": 10, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base Defence", "i12": 0}')),
        new Stamp("FILLER", "StampA35", "Combat Stamp", "FILLER", JSON.parse('{"effect": "BaseDef", "function": "add", "x1": 30, "x2": 0, "upgradeInterval": 10, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base Defence", "i12": 0}')),
    ];
    let skills_stamp = [
        new Stamp("Pickaxe Stamp", "StampB1", "Skills Stamp", "+{ Base Mining Efficiency", JSON.parse('{"effect": "BaseMinEff", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 10, "material": "OakTree", "startV": 25, "mCostExp": 7, "startingCost": 50, "cCostExp": 1.3, "i10": 1, "upgradeText": "{} Mining Efficiency", "i12": 0}')),
        new Stamp("Hatchet Stamp", "StampB2", "Skills Stamp", "+{ Base Choppin' Efficiency", JSON.parse('{"effect": "BaseChopEff", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 10, "material": "CraftMat1", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 3, "upgradeText": "{} Choppin Efficiency", "i12": 0}')),
        new Stamp("Anvil Zoomer Stamp", "StampB3", "Skills Stamp", "+{% Anvil Production Speed. This affects the 'Produce' tab within the anvil.", JSON.parse('{"effect": "AnvilPAspd", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 2, "upgradeText": "{}% Anvil Production Spd", "i12": 0}')),
        new Stamp("Lil' Mining Baggy Stamp", "StampB4", "Skills Stamp", "+{% Carrying Capacity for Mining Items", JSON.parse('{"effect": "MinCap", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 10, "material": "JungleTree", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 1, "upgradeText": "{} Mining Carry Cap", "i12": 0}')),
        new Stamp("Twin Ores Stamp", "StampB5", "Skills Stamp", "+{% Multi-Ore Chance", JSON.parse('{"effect": "DoubleMin", "function": "decay", "x1": 15, "x2": 40, "upgradeInterval": 5, "material": "EquipmentHats3", "startV": 1, "mCostExp": 3, "startingCost": 10000, "cCostExp": 1.3, "i10": 1, "upgradeText": "{}% Multi Ore Chance", "i12": 0}')),
        new Stamp("Choppin' Bag Stamp", "StampB6", "Skills Stamp", "+{% Carrying Capacity for Choppin' Items", JSON.parse('{"effect": "ChopCap", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 10, "material": "Jungle3", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 3, "upgradeText": "{} Choppin Carry Cap", "i12": 0}')),
        new Stamp("Duplogs Stamp", "StampB7", "Skills Stamp", "+{% Multi-Log Chance", JSON.parse('{"effect": "DoubleChop", "function": "decay", "x1": 15, "x2": 40, "upgradeInterval": 5, "material": "EquipmentHats20", "startV": 1, "mCostExp": 3, "startingCost": 20000, "cCostExp": 1.3, "i10": 3, "upgradeText": "{}% Multi Log Chance", "i12": 0}')),
        new Stamp("Matty Bag Stamp", "StampB8", "Skills Stamp", "+{% Carrying Capacity for Material Items", JSON.parse('{"effect": "MatCap", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 10, "material": "MaxCapBagM2", "startV": 1, "mCostExp": 2, "startingCost": 50, "cCostExp": 1.3, "i10": 2, "upgradeText": "{} Material Carry Cap", "i12": 0}')),
        new Stamp("Smart Dirt Stamp", "StampB9", "Skills Stamp", "+{% Mining Exp Gain", JSON.parse('{"effect": "MinExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "Forest2", "startV": 25, "mCostExp": 6, "startingCost": 80, "cCostExp": 1.35, "i10": 1, "upgradeText": "{}% Mining Exp", "i12": 0}')),
        new Stamp("Cool Diggy Tool Stamp", "StampB10", "Skills Stamp", "+{ Base Mining Efficicency", JSON.parse('{"effect": "BaseMinEff", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 10, "material": "EquipmentToolsHatchet1", "startV": 1, "mCostExp": 2, "startingCost": 35000, "cCostExp": 1.4, "i10": -1, "upgradeText": "{} Mining Efficiency", "i12": 0}')),
        new Stamp("High IQ Lumber Stamp", "StampB11", "Skills Stamp", "+{% Choppin Exp Gain", JSON.parse('{"effect": "ChopExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "Forest3", "startV": 25, "mCostExp": 6, "startingCost": 80, "cCostExp": 1.35, "i10": 3, "upgradeText": "{}% Choppin Exp", "i12": 0}')),
        new Stamp("Swag Swingy Tool Stamp", "StampB12", "Skills Stamp", "+{ Base Choppin' Efficiency", JSON.parse('{"effect": "BaseChopEff", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 10, "material": "EquipmentTools2", "startV": 1, "mCostExp": 2, "startingCost": 50000, "cCostExp": 1.36, "i10": 3, "upgradeText": "{} Choppin Efficiency", "i12": 0}')),
        new Stamp("Alch Go Brrr Stamp", "StampB13", "Skills Stamp", "+{% Alchemy Speed", JSON.parse('{"effect": "AlchSpd", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 4, "material": "ForestTree", "startV": 40, "mCostExp": 6, "startingCost": 800, "cCostExp": 1.29, "i10": -1, "upgradeText": "{}% Alch Speed", "i12": 0}')),
        new Stamp("Brainstew Stamps", "StampB14", "Skills Stamp", "+{% Alchemy Exp Gain", JSON.parse('{"effect": "AlchExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "Gold", "startV": 40, "mCostExp": 6, "startingCost": 1250, "cCostExp": 1.28, "i10": 5, "upgradeText": "{}% Alch Exp", "i12": 0}')),
        new Stamp("Drippy Drop Stamp", "StampB15", "Skills Stamp", "+{% Liquid Regen Speed in Alchemy", JSON.parse('{"effect": "LiquidSpd", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "DesertA1", "startV": 60, "mCostExp": 6, "startingCost": 1000, "cCostExp": 1.3, "i10": -1, "upgradeText": "{}% Liquid Spd", "i12": 0}')),
        new Stamp("Droplots Stamp", "StampB16", "Skills Stamp", "+{ Cap for all Liquids in Alchemy", JSON.parse('{"effect": "LiquidCap", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "Fish4", "startV": 25, "mCostExp": 4, "startingCost": 2500, "cCostExp": 1.3, "i10": -1, "upgradeText": "{} Liquid Cap", "i12": 0}')),
        new Stamp("Fishing Rod Stamp", "StampB17", "Skills Stamp", "+{ Base Fishing Efficiency", JSON.parse('{"effect": "BaseFishEff", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 5, "material": "Bug1", "startV": 50, "mCostExp": 6, "startingCost": 1000, "cCostExp": 1.32, "i10": 4, "upgradeText": "{} Fishing Efficiency", "i12": 0}')),
        new Stamp("Fishhead Stamp", "StampB18", "Skills Stamp", "+{% Fishing Exp Gain", JSON.parse('{"effect": "FishExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "DesertA2", "startV": 55, "mCostExp": 9, "startingCost": 1500, "cCostExp": 1.33, "i10": 4, "upgradeText": "{}% Fishing Exp", "i12": 0}')),
        new Stamp("Catch Net Stamp", "StampB19", "Skills Stamp", "+{ Base Catching Efficiency", JSON.parse('{"effect": "BaseCatchEff", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 5, "material": "Fish1", "startV": 50, "mCostExp": 6, "startingCost": 1000, "cCostExp": 1.3, "i10": 6, "upgradeText": "{} Catching Efficiency", "i12": 0}')),
        new Stamp("Fly Intel Stamp", "StampB20", "Skills Stamp", "+{% Catching Exp Gain", JSON.parse('{"effect": "CatchExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "DesertA3", "startV": 40, "mCostExp": 10, "startingCost": 1500, "cCostExp": 1.33, "i10": 6, "upgradeText": "{}% Catching Exp", "i12": 0}')),
        new Stamp("Bag o Heads Stamp", "StampB21", "Skills Stamp", "+{% Carry Capacity for Fishing Items", JSON.parse('{"effect": "FishCap", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 8, "material": "Bug2", "startV": 35, "mCostExp": 7, "startingCost": 1000, "cCostExp": 1.3, "i10": 4, "upgradeText": "{}% Fish Carry Cap", "i12": 0}')),
        new Stamp("Holy Mackerel Stamp", "StampB22", "Skills Stamp", "+{% Multi-Fish Chance", JSON.parse('{"effect": "DoubleFish", "function": "decay", "x1": 20, "x2": 40, "upgradeInterval": 5, "material": "Plat", "startV": 30, "mCostExp": 6, "startingCost": 1500, "cCostExp": 1.3, "i10": 4, "upgradeText": "{}% Multifish Chance", "i12": 0}')),
        new Stamp("Bugsack Stamp", "StampB23", "Skills Stamp", "+{% Carry Capacity for Catching Items", JSON.parse('{"effect": "CatchCap", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 8, "material": "Fish2", "startV": 35, "mCostExp": 7, "startingCost": 1000, "cCostExp": 1.3, "i10": 6, "upgradeText": "{}% Bug Carry Cap", "i12": 0}')),
        new Stamp("Buzz Buzz Stamp", "StampB24", "Skills Stamp", "+{% Mutli-Bug Chance", JSON.parse('{"effect": "DoubleCatch", "function": "decay", "x1": 20, "x2": 40, "upgradeInterval": 5, "material": "ToiletTree", "startV": 45, "mCostExp": 6, "startingCost": 1500, "cCostExp": 1.3, "i10": 6, "upgradeText": "{}% Multibug Chance", "i12": 0}')),
        new Stamp("Hidey Box Stamp", "StampB25", "Skills Stamp", "+{ Base Trapping Efficiency", JSON.parse('{"effect": "TrappingEff", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 10, "material": "Critter2", "startV": 100, "mCostExp": 5, "startingCost": 7500, "cCostExp": 1.3, "i10": 7, "upgradeText": "{} Trapping Efficiency", "i12": 0}')),
        new Stamp("Purp Froge Stamp", "StampB26", "Skills Stamp", "+{% Shiny Catch rate, multiplier", JSON.parse('{"effect": "ShinyChance", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "Critter3", "startV": 125, "mCostExp": 6, "startingCost": 10000, "cCostExp": 1.3, "i10": 7, "upgradeText": "{}% Shiny Chance", "i12": 0}')),
        new Stamp("Spikemouth Stamp", "StampB27", "Skills Stamp", "+{% Trapping Exp Gain", JSON.parse('{"effect": "TrappingExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 3, "material": "Critter4", "startV": 150, "mCostExp": 6, "startingCost": 12500, "cCostExp": 1.3, "i10": 7, "upgradeText": "{}% Trapping Exp", "i12": 0}')),
        new Stamp("Shiny Crab Stamp", "StampB28", "Skills Stamp", "+{% Shiny Catch rate, multiplier", JSON.parse('{"effect": "ShinyChance", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 3, "material": "Critter5", "startV": 200, "mCostExp": 7, "startingCost": 15000, "cCostExp": 1.3, "i10": 7, "upgradeText": "{}% Shiny Chance", "i12": 0}')),
        new Stamp("Gear Stamp", "StampB29", "Skills Stamp", "+{% Building Speed", JSON.parse('{"effect": "BuildProd", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 3, "material": "SnowB1", "startV": 100, "mCostExp": 5, "startingCost": 10000, "cCostExp": 1.3, "i10": 8, "upgradeText": "{}% Building Spd", "i12": 0}')),
        new Stamp("Stample Stamp", "StampB30", "Skills Stamp", "+{% 3D Printer Sampling Size", JSON.parse('{"effect": "SampleRate", "function": "decay", "x1": 4, "x2": 30, "upgradeInterval": 4, "material": "SnowA1", "startV": 100, "mCostExp": 6, "startingCost": 10000, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Sample Size", "i12": 0}')),
        new Stamp("Saw Stamp", "StampB31", "Skills Stamp", "+{% Construction Exp Gain", JSON.parse('{"effect": "ConstructionExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 3, "material": "DementiaBar", "startV": 20, "mCostExp": 5, "startingCost": 15000, "cCostExp": 1.3, "i10": 8, "upgradeText": "{}% Construction Exp", "i12": 0}')),
        new Stamp("Amplestample Stamp", "StampB32", "Skills Stamp", "+{% 3D Printer Sampling Size", JSON.parse('{"effect": "SampleRate", "function": "decay", "x1": 5, "x2": 30, "upgradeInterval": 4, "material": "Bug5", "startV": 200, "mCostExp": 11, "startingCost": 25000, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Sample Size", "i12": 0}')),
        new Stamp("SpoOoky Stamp", "StampB33", "Skills Stamp", "+{ Base Worship Efficiency", JSON.parse('{"effect": "WorshipEff", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 10, "material": "Soul1", "startV": 45, "mCostExp": 6, "startingCost": 7500, "cCostExp": 1.3, "i10": 9, "upgradeText": "{} Worship Efficiency", "i12": 0}')),
        new Stamp("Flowin Stamp", "StampB34", "Skills Stamp", "+{% Charge Rate per Hour, multiplier", JSON.parse('{"effect": "WorshipCharge", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "Refinery1", "startV": 2, "mCostExp": 5, "startingCost": 15000, "cCostExp": 1.3, "i10": 9, "upgradeText": "{}% Charging Speed", "i12": 0}')),
        new Stamp("Prayday Stamp", "StampB35", "Skills Stamp", "+{% Max Charge", JSON.parse('{"effect": "WorshipMax", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "SnowB4", "startV": 150, "mCostExp": 6, "startingCost": 10000, "cCostExp": 1.3, "i10": 9, "upgradeText": "{}% Max Charge", "i12": 0}')),
        new Stamp("Banked Pts Stamp", "StampB36", "Skills Stamp", "+{ Starting Points in Worship Tower Defense", JSON.parse('{"effect": "WorshipPTS", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 6, "material": "Soul2", "startV": 100, "mCostExp": 3, "startingCost": 6000, "cCostExp": 1.3, "i10": 9, "upgradeText": "{} Starting TD Pts", "i12": 0}')),
        new Stamp("Cooked Meal Stamp", "StampB37", "Skills Stamp", "+{% Meal Cooking Speed", JSON.parse('{"effect": "MealCook", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 15, "material": "Fish5", "startV": 200, "mCostExp": 5, "startingCost": 1000000, "cCostExp": 1.35, "i10": 0, "upgradeText": "{}% Meal Cooking Spd", "i12": 0}')),
        new Stamp("Spice Stamp", "StampB38", "Skills Stamp", "+{% New Recipe Cooking Speed", JSON.parse('{"effect": "RecipeCook", "function": "add", "x1": 2, "x2": 0, "upgradeInterval": 15, "material": "GalaxyA1", "startV": 200, "mCostExp": 5, "startingCost": 1000000, "cCostExp": 1.35, "i10": 0, "upgradeText": "{}% New Recipe Spd", "i12": 0}')),
        new Stamp("Ladle Stamp", "StampB39", "Skills Stamp", "+{ Cooking Efficiency", JSON.parse('{"effect": "CookingEff", "function": "add", "x1": 25, "x2": 0, "upgradeInterval": 10, "material": "Fish6", "startV": 200, "mCostExp": 5, "startingCost": 1000000, "cCostExp": 1.35, "i10": 0, "upgradeText": "{} Cooking Efficiency", "i12": 0}')),
        new Stamp("Nest Eggs Stamp", "StampB40", "Skills Stamp", "+{% Breeding EXP Gain", JSON.parse('{"effect": "BreedExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 10, "material": "AlienTree", "startV": 200, "mCostExp": 5, "startingCost": 1000000, "cCostExp": 1.4, "i10": 0, "upgradeText": "{}% Breeding EXP", "i12": 0}')),
        new Stamp("Egg Stamp", "StampB41", "Skills Stamp", "+{% New Pet Chance", JSON.parse('{"effect": "NewPet", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 15, "material": "GalaxyA3", "startV": 200, "mCostExp": 5, "startingCost": 1000000, "cCostExp": 1.4, "i10": 0, "upgradeText": "{}% New Pet Chance", "i12": 0}')),
        new Stamp("Lab Tube Stamp", "StampB42", "Skills Stamp", "+{% Lab Exp Gain", JSON.parse('{"effect": "LabExp", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 10, "material": "GalaxyB1", "startV": 200, "mCostExp": 5, "startingCost": 1000000, "cCostExp": 1.35, "i10": 0, "upgradeText": "{}% Lab EXP", "i12": 0}')),
    ];
    let misc_stamp = [
        new Stamp("Questin Stamp", "StampC1", "Misc Stamp", "+{% Quest Exp", JSON.parse('{"effect": "QuestExp", "function": "decay", "x1": 70, "x2": 50, "upgradeInterval": 10, "material": "Jungle1", "startV": 30, "mCostExp": 6, "startingCost": 500, "cCostExp": 1.32, "i10": 0, "upgradeText": "{}% Quest EXP", "i12": 3}')),
        new Stamp("Mason Jar Stamp", "StampC2", "Misc Stamp", "+{% Carry Capacity for ALL item types!", JSON.parse('{"effect": "AllCarryCap", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 4, "material": "DesertA1b", "startV": 1, "mCostExp": 3, "startingCost": 4000, "cCostExp": 1.28, "i10": 0, "upgradeText": "{}% All Carry Cap", "i12": 3}')),
        new Stamp("Crystallin", "StampC3", "Misc Stamp", "+{% Crystal Monster Spawn Chance", JSON.parse('{"effect": "CrySpawn", "function": "decay", "x1": 110, "x2": 50, "upgradeInterval": 10, "material": "CraftMat6", "startV": 35, "mCostExp": 8, "startingCost": 800, "cCostExp": 1.31, "i10": 0, "upgradeText": "{}% Spawn Chance", "i12": 3}')),
        new Stamp("Arcade Ball Stamp", "StampC4", "Misc Stamp", "+{% Arcade Ball recharge rate", JSON.parse('{"effect": "ArcadeBallz", "function": "decay", "x1": 50, "x2": 100, "upgradeInterval": 10, "material": "Copper", "startV": 30, "mCostExp": 6, "startingCost": 1500, "cCostExp": 1.33, "i10": 0, "upgradeText": "{}% ball gain rate", "i12": 3}')),
        new Stamp("Gold Ball Stamp", "StampC5", "Misc Stamp", "+{% reduced golden ball cost for upgrades", JSON.parse('{"effect": "GoldBallz", "function": "decay", "x1": 40, "x2": 100, "upgradeInterval": 10, "material": "Fish1", "startV": 50, "mCostExp": 6.5, "startingCost": 1000, "cCostExp": 1.33, "i10": 0, "upgradeText": "{}% HP Food Effect", "i12": 3}')),
        new Stamp("Potion Stamp", "StampC6", "Misc Stamp", "+{% Effect from Boost Food, like Potions and stuff, like, such as!", JSON.parse('{"effect": "BFood", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 5, "material": "FoodMining1", "startV": 50, "mCostExp": 8, "startingCost": 1500, "cCostExp": 1.305, "i10": 0, "upgradeText": "{}% Boost Food Effect", "i12": 3}')),
        new Stamp("Golden Apple Stamp", "StampC7", "Misc Stamp", "+{% Effect from Golden Food. Sparkle sparkle!", JSON.parse('{"effect": "GFood", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 4, "material": "FoodG4", "startV": 2, "mCostExp": 4, "startingCost": 3000, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Gold Food Effect", "i12": 3}')),
        new Stamp("Ball Timer Stamp", "StampC8", "Misc Stamp", "+{hr Arcade Ball claim max time", JSON.parse('{"effect": "ArcadeTimeMax", "function": "decay", "x1": 12, "x2": 30, "upgradeInterval": 5, "material": "OakTree", "startV": 100, "mCostExp": 15, "startingCost": 1000, "cCostExp": 1.32, "i10": 0, "upgradeText": "{}hr Max Claim Time", "i12": 3}')),
        new Stamp("Card Stamp", "StampC9", "Misc Stamp", "+{% Card Drop Rate. Go get them cards boy-o!", JSON.parse('{"effect": "CardDrop", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 10, "material": "DesertB2", "startV": 25, "mCostExp": 6, "startingCost": 1200, "cCostExp": 1.31, "i10": 0, "upgradeText": "{}% Card Drop Rate", "i12": 3}')),
        new Stamp("Blank", "StampC10", "Misc Stamp", "+{", JSON.parse('{"effect": "BaseDmg", "function": "add", "x1": 30, "x2": 0, "upgradeInterval": 10, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base HP", "i12": 3}')),
        new Stamp("Blank", "StampC11", "Misc Stamp", "+{", JSON.parse('{"effect": "BaseDmg", "function": "add", "x1": 30, "x2": 0, "upgradeInterval": 10, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base HP", "i12": 3}')),
        new Stamp("Blank", "StampC12", "Misc Stamp", "+{", JSON.parse('{"effect": "BaseDmg", "function": "add", "x1": 30, "x2": 0, "upgradeInterval": 10, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Base HP", "i12": 3}')),
        new Stamp("Talent I Stamp", "StampC13", "Misc Stamp", "+{ Talent Points for Tab 1", JSON.parse('{"effect": "Talent1", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "Grasslands2", "startV": 50, "mCostExp": 10, "startingCost": 2000, "cCostExp": 1.4, "i10": 0, "upgradeText": "{} Talent 1 Pts", "i12": 3}')),
        new Stamp("Talent II Stamp", "StampC14", "Misc Stamp", "+{ Talent Points for Tab 2", JSON.parse('{"effect": "Talent2", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "DesertB3", "startV": 200, "mCostExp": 8, "startingCost": 4000, "cCostExp": 1.35, "i10": 0, "upgradeText": "{} Talent 2 Pts", "i12": 3}')),
        new Stamp("Talent III Stamp", "StampC15", "Misc Stamp", "+{ Talent Points for Tab 3", JSON.parse('{"effect": "Talent3", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "Leaf3", "startV": 20, "mCostExp": 4, "startingCost": 40000, "cCostExp": 1.35, "i10": 0, "upgradeText": "{} Talent 3 Pts", "i12": 3}')),
        new Stamp("Talent IV Stamp", "StampC16", "Misc Stamp", "+{ Talent Points for Tab 4", JSON.parse('{"effect": "Talent4", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Talent 4 Pts", "i12": 3}')),
        new Stamp("Talent V Stamp", "StampC17", "Misc Stamp", "+{ Talent Points for Tab 5", JSON.parse('{"effect": "Talent5", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "Copper", "startV": 25, "mCostExp": 6, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Talent 5 Pts", "i12": 3}')),
        new Stamp("Talent S Stamp", "StampC18", "Misc Stamp", "+{ Talent Points for Star Tab", JSON.parse('{"effect": "TalentS", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "Leaf2", "startV": 20, "mCostExp": 4, "startingCost": 50, "cCostExp": 1.3, "i10": 0, "upgradeText": "{} Star Talent Pts", "i12": 3}')),
        new Stamp("Multikill Stamp", "StampC19", "Misc Stamp", "+{% Base Multikill Rate, for all worlds.", JSON.parse('{"effect": "Overkill", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "Grasslands1", "startV": 100, "mCostExp": 3, "startingCost": 10000, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Base Overkill", "i12": 3}')),
        new Stamp("Biblio Stamp", "StampC20", "Misc Stamp", "+{% Talent Book Library Refresh Speed", JSON.parse('{"effect": "BookSpd", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 2, "material": "SaharanFoal", "startV": 125, "mCostExp": 5, "startingCost": 12500, "cCostExp": 1.3, "i10": 0, "upgradeText": "{}% Faster Books", "i12": 3}')),
        new Stamp("DNA Stamp", "StampC21", "Misc Stamp", "+{% DNA gained from Splicing", JSON.parse('{"effect": "DNAsplice", "function": "add", "x1": 1, "x2": 0, "upgradeInterval": 3, "material": "Bug7", "startV": 200, "mCostExp": 5, "startingCost": 1000000, "cCostExp": 1.6, "i10": 0, "upgradeText": "{}% more DNA", "i12": 0}')),
    ];

    return [combat_stamp, skills_stamp, misc_stamp]
}

export default function parseStamps(rawData: Array<any>, maxData: Array<any>) {
    const stampData = initStamps(); // Initialize stamp array with all pre-populated data
    if (rawData) {
        rawData.forEach((tab, index) => { // for each tab in the cloud save
            Object.entries(tab).map(([key, value]) => { // for each stamp in the current tab
                if (key.toLowerCase() !== "length") {  // ignroe length at the end
                    try {
                        stampData[index][parseInt(key)].level = value as number; // update our pre-populated data with the stamp level
                        stampData[index][parseInt(key)].maxLevel = maxData[index][key] as number;
                    }
                    catch (e) {
                        console.debug("Unable to set level for stamp", key);
                    }
                }
            })
        })
    }
    return stampData;
}