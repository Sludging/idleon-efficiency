import { Breeding } from "./breeding"
import { Card, CardInfo } from "./cards"
import { Cooking } from "./cooking"
import { Deathnote } from "./deathnote"
import { GemStore } from "./gemPurchases"
import { ImageData } from "./imageData"
import { Player, SkillsIndex } from "./player"
import { Storage } from "./storage"

export const chipSlotReq = [5, 10, 15, 25, 35, 50, 75];

export interface MainframeData {
    no: number
    x: number
    y: number
    range: number
    bonusOn: number
    bonusOff: number
    name: string
    description: string
}
export class MainframeBonus {
    index: number
    x: number
    y: number
    range: number
    bonusOn: number
    bonusOff: number
    name: string
    description: string

    active: boolean = false;

    constructor(data: MainframeData) {
        this.index = data.no;
        this.x = data.x;
        this.y = data.y;
        this.range = data.range;
        this.bonusOn = data.bonusOff;
        this.bonusOff = data.bonusOn;
        this.name = data.name;
        this.description = data.description;
    }

    getImageData = (): ImageData => {
        return {
            location: `LabBonus${this.index}`,
            width: 64,
            height: 64
        }
    }

    getBonusText = () => {
        return this.description.split("@ - @")[0];
    }

    getBonus = () => {
        return this.bonusOn;
    }

    getRange = (connectionBonus: number = 0) => {
        return 80 * (1 + connectionBonus / 100);
    }
}

export class AnimalFarmBonus extends MainframeBonus {
    totalSpecies: number = 0;
    override getBonusText = () => {
        return this.description.replace(/{/g, this.getBonus().toString())
    }

    override getBonus = () => {
        return this.bonusOn * this.totalSpecies;
    }
}

export class FungiFingerBonus extends MainframeBonus {
    greenMushroomKilled: number = 0;
    override getBonusText = () => {
        return this.description.replace(/{/g, this.getBonus().toString())
    }

    override getBonus = () => {
        return this.bonusOn * Math.floor(this.greenMushroomKilled / 1e6);
    }
}

export class UnadulteratedBankingBonus extends MainframeBonus {
    greenStacks: number = 0;
    override getBonusText = () => {
        return this.description.replace(/{/g, this.getBonus().toString())
    }

    override getBonus = () => {
        return this.bonusOn * this.greenStacks;
    }
}

const initBonuses = (): MainframeBonus[] => {
    return [
        new AnimalFarmBonus({ "no": 0, "x": 91, "y": 353, "range": 90, "bonusOn": 0, "bonusOff": 1, "name": "Animal Farm", "description": "+1% Total Damage for every different species you have bred within Pet Breeding. You just need to breed the pet type one time for it to count! @ - @ Total Bonus: {%" }),
        new MainframeBonus({ "no": 1, "x": 250, "y": 310, "range": 90, "bonusOn": 1, "bonusOff": 2, "name": "Wired In", "description": "All Uploaded Players print 2x more resources from their section of the 3D Printer. The displayed amount will NOT appear doubled, just to avoid confusion as to what your actual base Sampling Rate is, but it will be displayed in blue." }),
        new MainframeBonus({ "no": 2, "x": 356, "y": 147, "range": 90, "bonusOn": 1, "bonusOff": 3, "name": "Gilded Cyclical Tubing", "description": "All refinery cycles occur 3x faster. Faster cycles means more salts!" }),
        // TODO: no bubble with the jewel bonus.
        new MainframeBonus({ "no": 3, "x": 450, "y": 220, "range": 90, "bonusOn": 0, "bonusOff": 1, "name": "No Bubble Left Behind", "description": "Every 24 hours, your 3 lowest level Alchemy Bubbles gets +1 Lv. This only applies to bubbles Lv 5 or higher, so it's more like 'your lowest level bubble that is at least level 5'. ALSO, it only works on the first 15 bubbles of each colour!" }),
        new MainframeBonus({ "no": 4, "x": 538, "y": 362, "range": 90, "bonusOn": 1, "bonusOff": 2, "name": "Killer's Brightside", "description": "All monster kills count for 2x more than normal for things like opening portals and Death Note. Doesn't increase resource drops or exp gain." }),
        new MainframeBonus({ "no": 5, "x": 651, "y": 113, "range": 90, "bonusOn": 0, "bonusOff": 1, "name": "Shrine World Tour", "description": "If a shrine is placed within town, instead of in a monster map, it will act as though it is placed in EVERY map in that entire world!" }),
        new MainframeBonus({ "no": 6, "x": 753, "y": 244, "range": 90, "bonusOn": 1, "bonusOff": 5, "name": "Viaduct of the Gods", "description": "All alchemy liquids have x5 higher max capacity. However, you regenerate alchemy liquids -30% slower." }),
        new MainframeBonus({ "no": 7, "x": 824, "y": 377, "range": 90, "bonusOn": 1, "bonusOff": 2, "name": "Certified Stamp Book", "description": "All Stamps, except for MISC tab stamps, give DOUBLE the bonus." }),
        new MainframeBonus({ "no": 8, "x": 917, "y": 326, "range": 90, "bonusOn": 1, "bonusOff": 1.5, "name": "Spelunker Obol", "description": "1.50x higher effects from all active Jewels within the Mainframe." }),
        new FungiFingerBonus({ "no": 9, "x": 982, "y": 148, "range": 90, "bonusOn": 0, "bonusOff": 2, "name": "Fungi Finger Pocketer", "description": "+2% extra cash from monsters for every 1 million Green Mushroom kills your account has, which can be viewed at Death Note. @ - @ Total Bonus: {%" }),
        new MainframeBonus({ "no": 10, "x": 1177, "y": 163, "range": 90, "bonusOn": 1, "bonusOff": 2, "name": "My 1st Chemistry Set", "description": "All Vials in Alchemy give DOUBLE the bonus. The bonus description will reflect this doubling." }),
        new UnadulteratedBankingBonus({ "no": 11, "x": 1300, "y": 380, "range": 90, "bonusOn": 0, "bonusOff": 2, "name": "Unadulterated Banking Fury", "description": "+2% Total Damage for each 'greened' stack of resources in your bank. A 'greened' stack is one with 10 million or more items. @ - @ Total Bonus: {%" }),
    ]
}

interface JewelData {
    x: number
    y: number
    range: number
    effect: string
    description: string
    name: string
    bonusGiven: number
    requirements: {
        item: string
        quantity: number
    }[]
}

export class Jewel {
    available: boolean = false;
    active: boolean = false;

    bonusMultiplier: number = 1;

    constructor(public index: number, public data: JewelData) { } 

    getImageData = (): ImageData => {
        return {
            location: `ConsoleJwl${this.index}`,
            width: 66,
            height: 66
        }
    }

    getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        return this.data.bonusGiven * bonusMultiplier;
    }

    getBonusText = () => {
        return `${this.data.effect.replace(/}/g, this.getBonus().toString())}${this.bonusMultiplier > 1 ? ` (${this.bonusMultiplier}x multiplier from mainframe bonus)` : ""}`;
    }

    getRange = (connectionBonus: number = 0) => {
        // 1.52 change: Pyrite Rhombol no longer affects itself.
        if (this.index == 9) {
            return 80;
        }
        return 80 * (1 + connectionBonus / 100);
    }
}

export class PyriteRhombolJewel extends Jewel {
    override getRange = () => {
        // 1.52 change: Pyrite Rhombol no longer affects itself.
        return 80;
    }
}

export class AmethystRhinestoneJewel extends Jewel {
    numberOfActivePurples: number = 0;
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        const extraMultiplier = this.numberOfActivePurples >= 3 ? 2 : 1;
        return this.data.bonusGiven * bonusMultiplier * extraMultiplier;
    }
}

export class PyritePyramiteJewel extends Jewel {
    numberOfActiveOrange: number = 0;
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        const extraMultiplier = this.numberOfActiveOrange >= 4 ? 2 : 1;
        return this.data.bonusGiven * bonusMultiplier * extraMultiplier;
    }
}

export class EmeraldNavetteJewel extends Jewel {
    numberOfActiveGreen: number = 0;
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        const extraMultiplier = this.numberOfActiveGreen >= 5 ? 2 : 1;
        return this.data.bonusGiven * bonusMultiplier * extraMultiplier;
    }
}

export class EmeraldPyramiteJewel extends Jewel {
    numberOfKitchenLevels: number = 0;
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        const extraMultiplier = Math.ceil((this.numberOfKitchenLevels + 1) / 25);
        return this.data.bonusGiven * bonusMultiplier * extraMultiplier;
    }

    override getBonusText = () => {
        const increaseBy = this.data.bonusGiven * this.bonusMultiplier;
        return `${this.data.effect.replace(/}/g, increaseBy.toString()).replace(/{/g, this.getBonus().toString()) }${this.bonusMultiplier > 1 ? ` (${this.bonusMultiplier}x multiplier from mainframe bonus)` : ""}`;
    }
}

const initJewels = () => {
    return [
        new AmethystRhinestoneJewel(0, { "x": 68, "y": 134, "range": 90, "effect": "Meal cooking is }x faster. This bonus is applied TWICE if all 3 purple jewels are active.", "description": "Boosts Meal Cooking speed", "requirements": [{ "item": "Quest66", "quantity": 5 }, { "item": "Meal1", "quantity": 2000 }, { "item": "Spice0", "quantity": 200 }], "name": "Amethyst Rhinestone", "bonusGiven": 1.5 }),
        new Jewel(1, { "x": 164, "y": 412, "range": 90, "effect": "'Animal Farm' mainframe bonus gives an additional +}% per species. If Animal Farm is not active, then this does nothing.", "description": "Bolsters 'Animal Farm'", "requirements": [{ "item": "Quest35", "quantity": 5 }, { "item": "Meal3", "quantity": 2000 }, { "item": "Spice1", "quantity": 200 }], "name": "Purple Navette", "bonusGiven": 0.5 }),
        new Jewel(2, { "x": 163, "y": 218, "range": 90, "effect": "All players get +}% Lab EXP gain.", "description": "Boosts Lab EXP gain", "requirements": [{ "item": "Timecandy1", "quantity": 10 }, { "item": "Meal5", "quantity": 2000 }, { "item": "Spice2", "quantity": 200 }], "name": "Purple Rhombol", "bonusGiven": 40 }),
        new Jewel(3, { "x": 246, "y": 110, "range": 90, "effect": "Construction slot 1 is now trimmed up, and has }x building Speed. Also trims slot 2 if all 4 blue jewels are active.", "description": "Trims up a construction slot", "requirements": [{ "item": "Quest15", "quantity": 10 }, { "item": "Meal7", "quantity": 5000 }, { "item": "Spice3", "quantity": 400 }], "name": "Sapphire Rhinestone", "bonusGiven": 3 }),
        new Jewel(4, { "x": 277, "y": 394, "range": 90, "effect": "All players get +}% All Stat. STR, AGI, WIS, and LUCK to boot.", "description": "Boosts all stats", "requirements": [{ "item": "TreeInterior1b", "quantity": 25 }, { "item": "Meal9", "quantity": 5000 }, { "item": "Spice4", "quantity": 400 }], "name": "Sapphire Navette", "bonusGiven": 3 }),
        new Jewel(5, { "x": 470, "y": 294, "range": 90, "effect": "Even if this jewel is off, all players within a 150px radius of this jewel, shown by the circle, have +25% Line Width. @ Also gives +}% Breeding EXP, but only when active.", "description": "Emits a 'Line Width' Aura", "requirements": [{ "item": "Sewers1b", "quantity": 30 }, { "item": "Meal11", "quantity": 5000 }, { "item": "Spice5", "quantity": 400 }], "name": "Sapphire Rhombol", "bonusGiven": 25 }),
        new Jewel(6, { "x": 490, "y": 112, "range": 90, "effect": "Every 24 hours, the } lowest level Kitchen Upgrades across all owned kitchens gain +1 Lv.", "description": "Automatically levels up kitchens", "requirements": [{ "item": "Quest38", "quantity": 2 }, { "item": "Meal13", "quantity": 5000 }, { "item": "Spice6", "quantity": 400 }], "name": "Sapphire Pyramite", "bonusGiven": 2 }),
        new Jewel(7, { "x": 552, "y": 163, "range": 90, "effect": "'No Bubble Left Behind' mainframe bonus gives +} levels instead of +1, and does so for the lowest 4 bubbles instead of 3.", "description": "Bolsters 'No Bubble Left Behind'", "requirements": [{ "item": "DesertA1b", "quantity": 50 }, { "item": "Meal15", "quantity": 10000 }, { "item": "Spice7", "quantity": 1500 }], "name": "Pyrite Rhinestone", "bonusGiven": 2 }),
        new Jewel(8, { "x": 646, "y": 407, "range": 90, "effect": "All players get }x 'non-consume' chance, and raises the max chance from 90% to 98%, allowing for longer AFK with food.", "description": "Boosts 'non-consume' chance", "requirements": [{ "item": "EquipmentPants19", "quantity": 2 }, { "item": "Meal17", "quantity": 10000 }, { "item": "Spice8", "quantity": 1500 }], "name": "Pyrite Navette", "bonusGiven": 3 }),
        new PyriteRhombolJewel(9, { "x": 696, "y": 319, "range": 90, "effect": "All mainframe bonuses and jewels have a }% larger connection range, except for this jewel. This jewel has an 80px connection range no matter what!", "description": "Boosts mainframe connection range", "requirements": [{ "item": "DesertA3b", "quantity": 50 }, { "item": "Meal19", "quantity": 10000 }, { "item": "Spice9", "quantity": 1500 }], "name": "Pyrite Rhombol", "bonusGiven": 30 }),
        new PyritePyramiteJewel(10, { "x": 847, "y": 105, "range": 90, "effect": "All players deal 1.}x more damage. This bonus is applied TWICE if all 4 Orange Jewels are active.", "description": "Boosts player damage", "requirements": [{ "item": "DesertC2b", "quantity": 50 }, { "item": "Meal21", "quantity": 10000 }, { "item": "Spice10", "quantity": 1500 }], "name": "Pyrite Pyramite", "bonusGiven": 10 }),
        new Jewel(11, { "x": 989, "y": 407, "range": 90, "effect": "}% reduced incubation egg time. Mo eggs mo problems tho, fo sho.", "description": "Reduces egg incubation time", "requirements": [{ "item": "BabaYagaETC", "quantity": 1 }, { "item": "Meal23", "quantity": 25000 }, { "item": "Spice11", "quantity": 5000 }], "name": "Emerald Rhinestone", "bonusGiven": 28 }),
        new EmeraldNavetteJewel(12, { "x": 1079, "y": 233, "range": 90, "effect": "All players have } higher base efficiency in all skills, and +10% skill action speed. This bonus is applied TWICE if all 5 Green Jewels are active.", "description": "Boosts player efficiency", "requirements": [{ "item": "SnowA2a", "quantity": 80 }, { "item": "Meal25", "quantity": 25000 }, { "item": "Spice12", "quantity": 5000 }], "name": "Emerald Navette", "bonusGiven": 200 }),
        new Jewel(13, { "x": 1085, "y": 121, "range": 90, "effect": "'Fungi Finger Pocketer' mainframe bonus gives an additional +}% cash bonus per million mushroom kills", "description": "Bolsters 'Fungi Finger Pocketer'", "requirements": [{ "item": "SnowB2a", "quantity": 120 }, { "item": "Meal27", "quantity": 25000 }, { "item": "Spice13", "quantity": 5000 }], "name": "Emerald Rhombol", "bonusGiven": 1 }),
        new EmeraldPyramiteJewel(14, { "x": 1167, "y": 390, "range": 90, "effect": "Meal cooking is }% faster for every 25 total upgrade levels across all kitchens. @ Total Bonus: {% speed", "description": "Boosts Meal Cooking speed", "requirements": [{ "item": "SnowC4a", "quantity": 150 }, { "item": "Meal29", "quantity": 25000 }, { "item": "Spice14", "quantity": 5000 }], "name": "Emerald Pyramite", "bonusGiven": 1 }),
        new Jewel(15, { "x": 1300, "y": 208, "range": 90, "effect": "Special Pets in the Fenceyard level up their Passive Bonuses +}% faster", "description": "Boosts Pet Passive level up rate", "requirements": [{ "item": "GalaxyA2b", "quantity": 200 }, { "item": "Meal31", "quantity": 25000 }, { "item": "Spice15", "quantity": 5000 }], "name": "Emerald Ulthurite", "bonusGiven": 30 }),
        new Jewel(16, { "x": 1365, "y": 100, "range": 90, "effect": "All meal bonuses, as shown in the Dinner Table Menu, actaully give 1.}x higher bonus than what is shown. So if a bonus says +100%, it is actually giving +1}%", "description": "Bolsters meals", "requirements": [{ "item": "GalaxyC1b", "quantity": 300 }, { "item": "Meal33", "quantity": 100000 }, { "item": "Spice15", "quantity": 10000 }], "name": "Black Diamond Rhinestone", "bonusGiven": 16 }),
        new Jewel(17, { "x": 1389, "y": 408, "range": 90, "effect": "'Unadulterated Banking Fury' gives an additional +}% Total Damage per greened stack.", "description": "Bolsters 'Unadulterated Banking Fury'", "requirements": [{ "item": "Critter10A", "quantity": 10000 }, { "item": "Meal35", "quantity": 100000 }, { "item": "Spice16", "quantity": 10000 }], "name": "Black Diamond Ulthurite", "bonusGiven": 1 }),
    ]
}

interface ChipData {
    name: string
    bonus: string
    description: string
    bool1: boolean
    stat: string
    baseVal: number
    requirements: {
        item: string
        quantity: number
    }[]
}

export class Chip {
    count: number = 0;
    constructor(public index: number, public data: ChipData) { }

    getImageData = (): ImageData => {
        return {
            location: `ConsoleChip${this.index}`,
            width: 42,
            height: 42
        }
    }

    getBonus = () => {
        return this.data.baseVal;
    }

    getBonusText = () => {
        return this.data.bonus.replace(/{/g, this.getBonus().toString());
    }
}

const initChips = () => {
    return [
        new Chip(0, { "name": "Grounded Nanochip", "bonus": "+{% Total Defence", "description": "Boosts total defence", "requirements": [{ "item": "Copper", "quantity": 20000 }, { "item": "Meal0", "quantity": 100 }, { "item": "Spice0", "quantity": 100 }], "bool1": false, "stat": "def", "baseVal": 10 }),
        new Chip(1, { "name": "Grounded Motherboard", "bonus": "+{% Move Speed if total is less than 170%", "description": "Boosts total movement speed", "requirements": [{ "item": "OakTree", "quantity": 30000 }, { "item": "Meal1", "quantity": 100 }, { "item": "Spice0", "quantity": 100 }], "bool1": false, "stat": "move", "baseVal": 30 }),
        new Chip(2, { "name": "Grounded Software", "bonus": "+{% Total Accuracy", "description": "Boosts total accuracy", "requirements": [{ "item": "Fish1", "quantity": 20000 }, { "item": "Meal3", "quantity": 100 }, { "item": "Spice1", "quantity": 100 }], "bool1": false, "stat": "acc", "baseVal": 10 }),
        new Chip(3, { "name": "Grounded Processor", "bonus": "+{% Drop Rate if total is less than 5.00x", "description": "Boosts total drop rate", "requirements": [{ "item": "DesertA1", "quantity": 10000 }, { "item": "Meal4", "quantity": 100 }, { "item": "Spice1", "quantity": 100 }], "bool1": false, "stat": "dr", "baseVal": 60 }),
        new Chip(4, { "name": "Potato Chip", "bonus": "+{% Basic Attack spd. *Can Only Equip 1 per player*", "description": "Boosts attack speed", "requirements": [{ "item": "Bug1", "quantity": 20000 }, { "item": "Meal6", "quantity": 100 }, { "item": "Spice2", "quantity": 100 }], "bool1": true, "stat": "atkspd", "baseVal": 20 }),
        new Chip(5, { "name": "Conductive Nanochip", "bonus": "+{% Lab EXP Gain", "description": "Boosts lab exp gain", "requirements": [{ "item": "StumpTree", "quantity": 100000 }, { "item": "Meal9", "quantity": 100 }, { "item": "Spice3", "quantity": 100 }], "bool1": false, "stat": "labexp", "baseVal": 30 }),
        new Chip(6, { "name": "Conductive Motherboard", "bonus": "+{% Line Width within Mainframe", "description": "Boosts mainframe line width", "requirements": [{ "item": "Gold", "quantity": 100000 }, { "item": "Meal12", "quantity": 100 }, { "item": "Spice4", "quantity": 100 }], "bool1": false, "stat": "linewidth", "baseVal": 12 }),
        new Chip(7, { "name": "Conductive Software", "bonus": "+{% Fighting AFK Gain Rate *Can Only Equip 1 per player*", "description": "Boosts Fighting AFK gain rate", "requirements": [{ "item": "Critter2", "quantity": 10000 }, { "item": "Meal15", "quantity": 100 }, { "item": "Spice4", "quantity": 100 }], "bool1": true, "stat": "fafk", "baseVal": 15 }),
        new Chip(8, { "name": "Conductive Processor", "bonus": "+{% Skilling AFK Gain Rate *Can Only Equip 1 per player*", "description": "Boosts Skilling AFK gain Rate", "requirements": [{ "item": "Bug5", "quantity": 100000 }, { "item": "Meal18", "quantity": 100 }, { "item": "Spice5", "quantity": 100 }], "bool1": true, "stat": "safk", "baseVal": 15 }),
        new Chip(9, { "name": "Chocolatey Chip", "bonus": "{% chance to spawn a crystal mob when one dies. *Can Only Equip 1 per player*", "description": "Chance for Crystal Mob revival", "requirements": [{ "item": "CraftMat8", "quantity": 200000 }, { "item": "Meal21", "quantity": 100 }, { "item": "Spice6", "quantity": 100 }], "bool1": true, "stat": "crys", "baseVal": 75 }),
        new Chip(10, { "name": "Galvanic Nanochip", "bonus": "+{% Monster Respawn Rate", "description": "Boosts Mob respawn rate", "requirements": [{ "item": "SnowC1", "quantity": 100000 }, { "item": "Meal24", "quantity": 100 }, { "item": "Spice7", "quantity": 100 }], "bool1": false, "stat": "resp", "baseVal": 10 }),
        new Chip(11, { "name": "Galvanic Motherboard", "bonus": "+{% Total Skilling Efficiency for all skills", "description": "Boosts skilling efficiency", "requirements": [{ "item": "Fish5", "quantity": 250000 }, { "item": "Meal27", "quantity": 100 }, { "item": "Spice8", "quantity": 100 }], "bool1": false, "stat": "toteff", "baseVal": 20 }),
        new Chip(12, { "name": "Galvanic Software", "bonus": "+{% Total Damage", "description": "Boosts total damage", "requirements": [{ "item": "Dementia", "quantity": 300000 }, { "item": "Meal29", "quantity": 100 }, { "item": "Spice9", "quantity": 100 }], "bool1": false, "stat": "dmg", "baseVal": 10 }),
        new Chip(13, { "name": "Galvanic Processor", "bonus": "+{ Base Efficiency for all skills", "description": "Boosts base skilling efficiency", "requirements": [{ "item": "GalaxyB2", "quantity": 100000 }, { "item": "Meal31", "quantity": 100 }, { "item": "Spice10", "quantity": 100 }], "bool1": false, "stat": "eff", "baseVal": 250 }),
        new Chip(14, { "name": "Wood Chip", "bonus": "+{% Multikill per Damage Tier for all worlds", "description": "Boosts multikill", "requirements": [{ "item": "Tree8", "quantity": 250000 }, { "item": "Meal33", "quantity": 100 }, { "item": "Spice11", "quantity": 100 }], "bool1": false, "stat": "mkill", "baseVal": 15 }),
        new Chip(15, { "name": "Silkrode Nanochip", "bonus": "Doubles the bonuses of all active Star Signs. *Can Only Equip 1 per player*", "description": "Bolsters active star signs", "requirements": [{ "item": "CraftMat10", "quantity": 2000000 }, { "item": "Meal35", "quantity": 100 }, { "item": "Spice12", "quantity": 100 }], "bool1": true, "stat": "star", "baseVal": 1 }),
        new Chip(16, { "name": "Silkrode Motherboard", "bonus": "Doubles MISC bonuses of currently equipped Trophy. *Can Only Equip 1 per player*", "description": "Bolsters equipped trophy", "requirements": [{ "item": "Soul5", "quantity": 2000000 }, { "item": "Meal37", "quantity": 100 }, { "item": "Spice13", "quantity": 100 }], "bool1": true, "stat": "troph", "baseVal": 1 }),
        new Chip(17, { "name": "Silkrode Software", "bonus": "Doubles MISC bonuses of keychain equipped in the upper keychain slot. *Can Only Equip 1 per player*", "description": "Bolsters equipped keychain", "requirements": [{ "item": "Bug8", "quantity": 2000000 }, { "item": "Meal39", "quantity": 100 }, { "item": "Spice13", "quantity": 100 }], "bool1": true, "stat": "key1", "baseVal": 1 }),
        new Chip(18, { "name": "Silkrode Processor", "bonus": "Doubles MISC bonuses of currently equipped Pendant. *Can Only Equip 1 per player*", "description": "Bolsters equipped pendant", "requirements": [{ "item": "Critter10", "quantity": 2000000 }, { "item": "Meal41", "quantity": 100 }, { "item": "Spice14", "quantity": 100 }], "bool1": true, "stat": "pend", "baseVal": 1 }),
        new Chip(19, { "name": "Poker Chip", "bonus": "Your weapon gives 1.{x more Weapon Power. *Can Only Equip 1 per player*", "description": "Bolsters equipped Weapon", "requirements": [{ "item": "CraftMat14", "quantity": 2000000 }, { "item": "Meal43", "quantity": 100 }, { "item": "Spice14", "quantity": 100 }], "bool1": true, "stat": "weppow", "baseVal": 25 }),
        new Chip(20, { "name": "Omega Nanochip", "bonus": "Doubles bonus of card equipped in top left slot. *Can Only Equip 1 per player*", "description": "Bolsters an equipped card", "requirements": [{ "item": "Bug8", "quantity": 10000000 }, { "item": "Meal45", "quantity": 100 }, { "item": "Spice15", "quantity": 100 }], "bool1": true, "stat": "card1", "baseVal": 1 }),
        new Chip(21, { "name": "Omega Motherboard", "bonus": "Doubles bonus of card equipped in bottom right slot. *Can Only Equip 1 per player*", "description": "Bolsters an equipped card", "requirements": [{ "item": "Fish8", "quantity": 10000000 }, { "item": "Meal47", "quantity": 100 }, { "item": "Spice16", "quantity": 100 }], "bool1": true, "stat": "card2", "baseVal": 1 }),
    ]
}

export interface Point {
    x: number
    y: number
}

export class Lab {
    bonuses: MainframeBonus[] = initBonuses();
    jewels: Jewel[] = initJewels();
    chips: Chip[] = initChips();
    playerCords: Record<number, Point> = {};
    playerChips: Record<number, Chip[]> = {};
    playersInTubes: Player[] = [];
    playersInChain: Player[] = [];

    getDistance = (x1: number, y1: number, x2: number, y2: number) => {
        return 0.9604339 * Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2)) + 0.397824735 * Math.min(Math.abs(x1 - x2), Math.abs(y1 - y2));
    }

    getPlayerLinewidth = (player: Player, pxMealBonus: number, linePctMealBonus: number, passiveCardBonus: number, petArenaBonus: number, inGemTube: boolean) => {
        const labSkillLevel = player.skills.get(SkillsIndex.Intellect)?.level ?? 0;
        let baseWidth = 50 + (2 * labSkillLevel);

        if (this.jewels[5].available) {
            const playerCords = this.playerCords[player.playerID];
            if (this.getDistance(this.jewels[5].data.x, this.jewels[5].data.y, playerCords.x, playerCords.y) < 150) {
                baseWidth *= (1 + (this.jewels[5].getBonus() / 100));
            }
        }
        const playerChipBonus = player.labInfo.chips.filter(slot => slot.chip && slot.chip.index == 6).reduce((sum, slot) => sum += slot.chip?.getBonus() ?? 0, 0);
        const bonusWidth = inGemTube ? 30 : 0;
        return Math.floor((baseWidth + (pxMealBonus + Math.min(passiveCardBonus, 50)))
            * (1 + ((linePctMealBonus + playerChipBonus + (20 * petArenaBonus) + bonusWidth) / 100))
        )
    }
}

export const parseLab = (labData: number[][]) => {
    const lab = new Lab();

    if (labData.length == 0) {
        return lab;
    }
    let cordIndex = 0;
    while (cordIndex < labData[0].length) {
        lab.playerCords[cordIndex / 2] = { x: labData[0][cordIndex], y: labData[0][cordIndex + 1] };
        cordIndex += 2;
    }

    labData[14].forEach((value, index) => {
        if (value == 1) {
            lab.jewels[index].available = true;
        }
    })

    // Figure out what chips players have.
    labData.slice(1, 10).forEach((playerChips, index) => {
        lab.playerChips[index] = playerChips.filter(chip => chip != -1).map(chip => lab.chips[chip]);
    });

    labData[15].forEach((chipCount, index) => {
        if (index < lab.chips.length) {
            lab.chips[index].count = chipCount;
            const usedCount = Object.values(lab.playerChips).flatMap(chips => chips).reduce((sum, chip) => sum += (chip.index == lab.chips[index].index) ? 1 : 0, 0);
            lab.chips[index].count -= usedCount;
        }
    })

    return lab;
}

const _calculatePlayersLineWidth = (lab: Lab, cooking: Cooking, breeding: Breeding, cards: Card[], gemStore: GemStore) => {
    const jewelMultiplier = (lab.bonuses.find(bonus => bonus.index == 8)?.active ?? false) ? 1.5 : 1;
    const mealBonus = lab.jewels.filter(jewel => jewel.active && jewel.index == 16).reduce((sum, jewel) => sum += jewel.getBonus(jewelMultiplier), 0)
    if (lab.playersInTubes.length > 0) {
        const pxMealBonus = cooking?.meals.filter(meal => meal.bonusKey == "PxLine").reduce((sum, meal) => sum += meal.getBonus(false, mealBonus), 0) ?? 0;
        const linePctMealBonus = cooking?.meals.filter(meal => meal.bonusKey == "LinePct").reduce((sum, meal) => sum += meal.getBonus(false, mealBonus), 0) ?? 0;
        const passiveCardBonus = cards?.filter(card => card.effect.includes("Line Width")).reduce((sum, card) => sum += card.getBonus(), 0) ?? 0;
        const petArenaBonus = breeding.hasBonus(13) ? 20 : 0;
        const gemTubes = (gemStore?.purchases.find(purchase => purchase.no == 123)?.pucrhased ?? 0) * 2;

        lab.playersInTubes.forEach((player, index) => {
            player.labInfo.lineWidth = lab?.getPlayerLinewidth(player, pxMealBonus, linePctMealBonus, passiveCardBonus, petArenaBonus, index < gemTubes) ?? 0;
            player.labInfo.supped = index < gemTubes;
        });
    }
}

const _findPrismSource = (lab: Lab) => {
    for (let playerIndex = 0; playerIndex < lab.playersInTubes.length; playerIndex++) {
        const player = lab.playersInTubes[playerIndex];
        const playerCords = lab.playerCords[player.playerID];
        if (lab.getDistance(43, 229, playerCords.x, playerCords.y) < player.labInfo.lineWidth) {
            return player
        }
    }
    return undefined;
}

const _calculatePlayerImpact = (connectedPlayers: Player[], chainIndex: number, lab: Lab) => {
    const jewelMultiplier = (lab.bonuses.find(bonus => bonus.index == 8)?.active ?? false) ? 1.5 : 1;
    const connectionRangeBonus = lab.jewels.filter(jewel => jewel.active && jewel.index == 9).reduce((sum, jewel) => sum += jewel.getBonus(jewelMultiplier), 0)

    const player = connectedPlayers[chainIndex];
    const playerCords = lab.playerCords[player.playerID];
    let hasImpact = false
    lab.playersInTubes.forEach(tubePlayer => {
        const tubePlayerCoords = lab.playerCords[tubePlayer.playerID];
        const inRange = lab.getDistance(playerCords.x, playerCords.y, tubePlayerCoords.x, tubePlayerCoords.y) < tubePlayer.labInfo.lineWidth;
        if (!connectedPlayers.includes(tubePlayer) && inRange) {
            connectedPlayers.push(tubePlayer);
            hasImpact = true;
        }
    })

    lab.bonuses.filter(bonus => !bonus.active).forEach(bonus => {
        const inRange = lab.getDistance(playerCords.x, playerCords.y, bonus.x, bonus.y) < bonus.getRange(connectionRangeBonus);
        if (inRange) {
            bonus.active = true;
            hasImpact = true;
        }
    });

    lab.jewels.filter(jewel => jewel.available && !jewel.active).forEach(jewel => {
        const inRange = lab.getDistance(playerCords.x, playerCords.y, jewel.data.x, jewel.data.y) < jewel.getRange(connectionRangeBonus);
        if (inRange) {
            jewel.active = true;
            hasImpact = true;
        }
    });

    return hasImpact;
}

export const updateLab = (data: Map<string, any>) => {
    const lab = data.get("lab") as Lab;
    const playerData = data.get("players") as Player[];
    const cooking = data.get("cooking") as Cooking;
    const cards = data.get("cards") as Card[];
    const gemStore = data.get("gems") as GemStore;
    const breeding = data.get("breeding") as Breeding;
    const deathnote = data.get("deathnote") as Deathnote;
    const storage = data.get("storage") as Storage;

    // Append chip info to the players.
    Object.entries(lab.playerChips).forEach(([playerIndex, chips]) => {
        const index = parseInt(playerIndex);
        chips.forEach((chip, chipIndex) => {
            playerData[index].labInfo.chips[chipIndex].chip = chip;
        })
        // Update card boost, kinda ugly here but easiest solution for now.
        if (chips.filter(chip => chip.data.name == "Omega Nanochip").length > 0 && playerData[index].cardInfo) {
            (playerData[index].cardInfo as CardInfo).equippedCards[0].chipBoost = 2;
        }
        if (chips.filter(chip => chip.data.name == "Omega Motherboard").length > 0 && playerData[index].cardInfo) {
            (playerData[index].cardInfo as CardInfo).equippedCards[7].chipBoost = 2;
        }
    })

    // Things to care about:
    // 1. Jewel that boosts meal bonus.
    // 2. Jewel that boosts line width.
    // 3. Jewel that boosts connection range.
    // 4. Bonus that doubles all Jewels.

    // Figure out which players are in lab first and sort by player id.
    const playersInLab = [...playerData].filter(player => player.currentMonster == "Laboratory").sort((player1, player2) => player1.playerID > player2.playerID ? 1 : -1);
    lab.playersInTubes = playersInLab;

    // fake active jewel 16

    let loopAgain = true;
    let counter = 0;
    const connectedPlayers: Player[] = [];
    while (loopAgain) {
        loopAgain = false;
        counter += 1;
        // calculate line widths
        _calculatePlayersLineWidth(lab, cooking, breeding, cards, gemStore);

        // If we have players in lab, and no chain, try and find the player connected to prism.
        if (lab.playersInTubes.length > 0 && connectedPlayers.length == 0) {
            const prismPlayer = _findPrismSource(lab);
            if (prismPlayer) {
                connectedPlayers.push(prismPlayer);
            }
        }

        // Loop the things
        for (let chainIndex = 0; chainIndex < lab.playersInTubes.length; chainIndex++) {
            if (connectedPlayers.length > chainIndex) {
                loopAgain = _calculatePlayerImpact(connectedPlayers, chainIndex, lab);
            }
        }
    }

    if (lab.jewels[16].available) {
        // fake 16 is active to avoid odd scenarios
        lab.jewels[16].active = true;

        _calculatePlayersLineWidth(lab, cooking, breeding, cards, gemStore);
        // deactivate after we updated all the widths.
        lab.jewels[16].active = false;

        // If we have players in lab, and no chain, try and find the player connected to prism.
        if (lab.playersInTubes.length > 0 && connectedPlayers.length == 0) {
            const prismPlayer = _findPrismSource(lab);
            if (prismPlayer) {
                connectedPlayers.push(prismPlayer);
            }
        }

        // Loop the things
        for (let chainIndex = 0; chainIndex < lab.playersInTubes.length; chainIndex++) {
            if (connectedPlayers.length > chainIndex) {
                loopAgain = _calculatePlayerImpact(connectedPlayers, chainIndex, lab);
            }
        }

        // Redo line width maths in case the jewel didn't get re-enabled.
        _calculatePlayersLineWidth(lab, cooking, breeding, cards, gemStore);
    }

    const jewelMultiplier = (lab.bonuses.find(bonus => bonus.index == 8)?.active ?? false) ? 1.5 : 1;
    lab.jewels.forEach(jewel => jewel.bonusMultiplier = jewelMultiplier);

    // Special Jewel handling
    (lab.jewels[0] as AmethystRhinestoneJewel).numberOfActivePurples = lab.jewels.filter(jewel => (jewel.data.name.includes("Amethyst") || jewel.data.name.includes("Purple")) && jewel.active).length;
    (lab.jewels[10] as PyritePyramiteJewel).numberOfActiveOrange = lab.jewels.filter(jewel => jewel.data.name.includes("Pyrite") && jewel.active).length;
    (lab.jewels[12] as EmeraldNavetteJewel).numberOfActiveGreen = lab.jewels.filter(jewel => jewel.data.name.includes("Emerald") && jewel.active).length;
    (lab.jewels[14] as EmeraldPyramiteJewel).numberOfKitchenLevels = cooking.kitchens.reduce((sum, kitchen) => sum += kitchen.recipeLevels + kitchen.mealLevels + kitchen.luckLevels, 0);

    // Special Bonus handling
    (lab.bonuses[0] as AnimalFarmBonus).totalSpecies = breeding.speciesUnlocks.reduce((sum, world) => sum += world, 0);
    (lab.bonuses[9] as FungiFingerBonus).greenMushroomKilled = deathnote.mobKillCount.get("mushG")?.reduce((sum, killCount) => sum += Math.round(killCount), 0) ?? 0;
    (lab.bonuses[11] as UnadulteratedBankingBonus).greenStacks = storage.chest.filter(item => item.count >= 1e7).length;

    return lab;
}