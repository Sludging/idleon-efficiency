import { nFormatter } from "../utility";
import { Alchemy } from "./alchemy";
import { Cooking } from "./cooking";
import { ImageData } from "./imageData";
import { Lab } from "./lab";
import { Player, SkillsIndex } from "./player";

export const waveReqs = "2 5 8 12 15 20 25 35 50 65 80 100 125 150 175 200".split(" ").map(value => parseInt(value));

interface PeteGeneData {
    name: string
    abilityType: string
    x2: number
    lowerLetter: string
    upperLetter: string
    description: string
    combatDescription: string
}

export class PetGene {
    constructor(public data: PeteGeneData) { }
}

const initPetGenes = () => {
    return [
        new PetGene({ "name": "Fighter", "abilityType": "Red", "x2": 5, "lowerLetter": "a", "upperLetter": "A", "description": "Throws a Rusty Sword, which deals 200% Damage", "combatDescription": "When in combat, all pets on team deal 1.10x Damage" }),
        new PetGene({ "name": "Defender", "abilityType": "Red", "x2": 10, "lowerLetter": "b", "upperLetter": "B", "description": "Throws an Armored Shield, which gives 90% block chance to pets it passes over, and deals 50% Damage", "combatDescription": "When in combat, all pets have +12% Block Chance" }),
        new PetGene({ "name": "Forager", "abilityType": "Green", "x2": 12, "lowerLetter": "c", "upperLetter": "C", "description": "Heals all pets by 25% HP", "combatDescription": "When foraging, this pet contributes 2x Foraging Speed" }),
        new PetGene({ "name": "Fleeter", "abilityType": "Green", "x2": 13, "lowerLetter": "d", "upperLetter": "D", "description": "Boosts ability recharge rate for all pets by +30% for 8 sec. Doesn't boost other Fleeter pets though.", "combatDescription": "When foraging, all pets contribute 1.30x more Foraging Speed" }),
        new PetGene({ "name": "Breeder", "abilityType": "Special", "x2": 15, "lowerLetter": "e", "upperLetter": "E", "description": "Every 1 sec, heal whatever pet you are holding down on for 5% HP. On PC, you just need you mouse over the pet. On Phones, your finger must be on the pet. This Lasts 10 seconds.", "combatDescription": "When in Fence Yard, increases Breedability Multiplier of this pet species" }),
        new PetGene({ "name": "Special", "abilityType": "Unsure", "x2": 15, "lowerLetter": "f", "upperLetter": "F", "description": "Summons shootings stars which double the damage of all attacks they touch.", "combatDescription": "When in Fence Yard, increases Special Passive of this pet species over time" }),
        new PetGene({ "name": "Mercenary", "abilityType": "Red", "x2": 4, "lowerLetter": "g", "upperLetter": "G", "description": "Throws 2-3 small daggers which deal 150% Damage", "combatDescription": "When foraging, this pet contributes 2x Fight Power" }),
        new PetGene({ "name": "Boomer", "abilityType": "Red", "x2": 7, "lowerLetter": "h", "upperLetter": "H", "description": "Throws a boomerang, which deals 60% Damage and has an 80% chance to bounce", "combatDescription": "When in combat, the pet in front of this one has ability reset to 30%" }),
        new PetGene({ "name": "Sniper", "abilityType": "Red", "x2": 9, "lowerLetter": "i", "upperLetter": "I", "description": "Fires a bullet at farthest enemy. 200% Damage, +30% Crit chance, 4x Crit DMG", "combatDescription": "When in combat, all pets have +25% Crit DMG" }),
        new PetGene({ "name": "Amplifier", "abilityType": "Red", "x2": 10, "lowerLetter": "j", "upperLetter": "J", "description": "Summons a spiral, which deals 100% Damage, and +50% more Damage for each attack that moves through it", "combatDescription": "When in combat, all pets have +10% Crit Chance" }),
        new PetGene({ "name": "Tsar", "abilityType": "Red", "x2": 25, "lowerLetter": "k", "upperLetter": "K", "description": "Drop da bomba...", "combatDescription": "When foraging, the pets in the territory above and below contribute 1.50x Fight Power" }),
        new PetGene({ "name": "Rattler", "abilityType": "Red", "x2": 4, "lowerLetter": "l", "upperLetter": "L", "description": "Throws 5 bones. Bones deal 5% Damage, +1% more damage for each bone ever thrown", "combatDescription": "When in combat, this pet's Basic Attack is now a Bone instead of a Fist" }),
        new PetGene({ "name": "Cursory", "abilityType": "Red", "x2": 3, "lowerLetter": "m", "upperLetter": "M", "description": "Shoots a Cursed Skull, which deals 50% Damage, and makes all future attacks deal +5% more dmg", "combatDescription": "When in combat, pets in front and behind this one deal 1.50x Damage" }),
        new PetGene({ "name": "Fastidious", "abilityType": "Green", "x2": 10, "lowerLetter": "n", "upperLetter": "N", "description": "Pemanently gives all pets +1% Crit Chance, +5% Crit DMG, and +2% ability regen speed. After 20 stacks, additional stacks give less bonus.", "combatDescription": "When foraging," }),
        new PetGene({ "name": "Flashy", "abilityType": "Green", "x2": 18, "lowerLetter": "o", "upperLetter": "O", "description": "Duplicates all friendly attacks instantly, almost like magic!", "combatDescription": "When foraging, all pets contribute 1.50x more Foraging Speed if there are no Combat Pets in team" }),
        new PetGene({ "name": "Opticular", "abilityType": "Green", "x2": 7, "lowerLetter": "p", "upperLetter": "P", "description": "Permanently boosts the Crit Chance of all pets. Only recharges when an attack Critical Hits", "combatDescription": "When foraging, this pet contributes 3x Foraging Speed if it has the largest Number on the team" }),
        new PetGene({ "name": "Monolithic", "abilityType": "Green", "x2": 20, "lowerLetter": "q", "upperLetter": "Q", "description": "Freezes time for 6 seconds. During this, pet continue to shoot Basic Attacks and regenerate abilities", "combatDescription": "When foraging, the requirement to fill the reward bar goes up less every time it is filled" }),
        new PetGene({ "name": "Alchemic", "abilityType": "Green", "x2": 9, "lowerLetter": "r", "upperLetter": "R", "description": "Turns all friend attacks into Cursed Skulls", "combatDescription": "When foraging, there is a 50% chance for 2 spices when filling the reward bar" }),
        new PetGene({ "name": "Badumdum", "abilityType": "Green", "x2": 7, "lowerLetter": "s", "upperLetter": "S", "description": "Permanently boost the Basic Attack speed of all pets. Only recharges when a Basic Attack hits", "combatDescription": "When foraging, the pets in the territory above and below contribute 1.20x Foraging Speed" }),
        new PetGene({ "name": "Defstone", "abilityType": "Red", "x2": 5, "lowerLetter": "t", "upperLetter": "T", "description": "Shoots rocks bases on the total number of blocks by your team. Resets block amount when activated", "combatDescription": "When in combat, all pets have +50% HP" }),
        new PetGene({ "name": "Targeter", "abilityType": "Green", "x2": 8, "lowerLetter": "u", "upperLetter": "U", "description": "The next non Basic Attack fired will deal x2.50 Damage.", "combatDescription": "When foraging, this pet contributes 5x Foraging Speed if the pet above this one is also a Targeter" }),
        new PetGene({ "name": "Looter", "abilityType": "Green", "x2": 4, "lowerLetter": "v", "upperLetter": "V", "description": "Activates a random ability, selected from all the abilites across all pets you've ever had", "combatDescription": "When foraging, there is a small chance to find extra spices when filling the reward bar many times before claiming" }),
        new PetGene({ "name": "Refiller", "abilityType": "Green", "x2": 30, "lowerLetter": "w", "upperLetter": "W", "description": "For 6 seconds, every non Basic Attack that hits a monster refills a random ability on the team by 5%", "combatDescription": "When in combat, all abilites start at +25% filled" }),
        new PetGene({ "name": "Eggshell", "abilityType": "Green", "x2": 12, "lowerLetter": "x", "upperLetter": "X", "description": "For 10 seconds, every critical hit boosts the block chance of all pets by 1%", "combatDescription": "When in Fence Yard, randomly lays eggs which can be picked up and will appear in your incubator" }),
    ]
}

interface PetUpgradeData {
    upgradeName: string
    filler: string
    material: string
    x1: number
    baseCost: number
    costScale: number
    baseCost2: number
    costScale2: number
    maxLevel: number
    description: string
    boostEffect: string
    x2: number
}

export class PetUpgrade {
    level: number = 0;

    constructor(public index: number, public data: PetUpgradeData) { }

    getImageData = (): ImageData => {
        if (this.index == 0) {
            return {
                height: 96,
                location: "Blank",
                width: 133
            };
        }
        return {
            location: `PetUpg${this.index - 1}`,
            height: 96,
            width: 133
        }
    }

    getBonus = () => {
        switch (this.index) {
            case 0:
            case 2:
            case 4:
                return this.level;
            case 1:
                return this.level * 4;
            case 3:
                return this.level * 25;
            case 5:
                return this.level * 0.25 + 1;
            case 6:
                return this.level * 6;
            case 7:
                return this.level * 0.3 + 1;
            case 8:
                return this.level * 2 + 1;
            case 9:
                return this.level * 0.05 + 1;
            case 10:
                return this.level * 10;
            case 11:
                return Math.ceil(Math.pow(this.level, 0.698) * 12);
            default: return 0;
        }
    }

    getCost = (matIndex: number) => {
        const baseCost = matIndex == 0 ? this.data.baseCost : this.data.baseCost2;
        const costScale = matIndex == 0 ? this.data.costScale : this.data.costScale2;

        return baseCost * (1 + this.level) * Math.pow(costScale, this.level);
    }

    getBonusText = () => {
        return this.data.boostEffect.replace(/}/g, this.getBonus().toString())
    }
}

const initPetUpgrades = () => {
    return [
        new PetUpgrade(0, { "upgradeName": "No Upgrade Selected", "filler": "Filler", "material": "PetDeadCell", "x1": -1, "baseCost": 6, "costScale": 1.08, "baseCost2": 0, "costScale2": 1.15, "maxLevel": 100, "description": "TAP AN UPGRADE ABOVE! Also, as a reward for reading this, I'll let you know that upgrading this 'nothing' bonus actually boosts breeding exp gain!!", "boostEffect": "Breeding EXP Gain +}", "x2": 0 }),
        new PetUpgrade(1, { "upgradeName": "Genetic Splicing", "filler": "Filler", "material": "PetDeadCell", "x1": 0, "baseCost": 6, "costScale": 1.1, "baseCost2": 3, "costScale2": 2.5, "maxLevel": 20, "description": "Unlocks the 1st Breeding Multiplier, Gene Boosting. Genes are found while fighting with the DNA Splicer tool purchased at the Town Shop.", "boostEffect": "-}% Gene Boost Cost", "x2": 4 }),
        new PetUpgrade(2, { "upgradeName": "Egg Capacity", "filler": "Filler", "material": "PetDeadCell", "x1": 3, "baseCost": 20, "costScale": 1.5, "baseCost2": 10, "costScale2": 100, "maxLevel": 5, "description": "Increases the maximum number of eggs your incubator can hold. The more eggs you currently hold, the rarer it is to get a new one.", "boostEffect": "+} Egg Max", "x2": 1 }),
        new PetUpgrade(3, { "upgradeName": "Breedability Pulse", "filler": "Filler", "material": "PetDeadCell", "x1": 6, "baseCost": 25, "costScale": 1.25, "baseCost2": 10, "costScale2": 7, "maxLevel": 10, "description": "Unlocks the 2nd Breeding Multiplier, Breedability. Pets placed in the Fenceyard with the Breedable Gene increase this multi over time.", "boostEffect": "+}% Breedability Spd", "x2": 25 }),
        new PetUpgrade(4, { "upgradeName": "Fence Extension", "filler": "Filler", "material": "PetDeadCell", "x1": 11, "baseCost": 30, "costScale": 1.16, "baseCost2": 10, "costScale2": 4, "maxLevel": 10, "description": "Increases the number of slots in your Fence Yard, allowing for more pets to roam around, free range style!", "boostEffect": "+} Fenceyard Slots", "x2": 1 }),
        new PetUpgrade(5, { "upgradeName": "Rarity of the Egg", "filler": "Filler", "material": "PetDeadCell", "x1": 14, "baseCost": 35, "costScale": 1.25, "baseCost2": 10, "costScale2": 9, "maxLevel": 10, "description": "Unlocks the 3rd Breeding Multiplier, Rarity. Whenever you incubate with a full incubator, theres a chance to increase the rarity of another egg!", "boostEffect": "}x Rarity Chance", "x2": 1 }),
        new PetUpgrade(6, { "upgradeName": "Blooming Axe", "filler": "Filler", "material": "PetDeadCell", "x1": 20, "baseCost": 40, "costScale": 1.25, "baseCost2": 10, "costScale2": 10, "maxLevel": 10, "description": "Forage pets contribute a fraction of their forage speed toward Fight Power. Now you no longer need at least 1 fighting pet!", "boostEffect": "}% Fight Contribution", "x2": 6 }),
        new PetUpgrade(7, { "upgradeName": "Pastpresent Brood", "filler": "Filler", "material": "PetDeadCell", "x1": 25, "baseCost": 45, "costScale": 1.6, "baseCost2": 10, "costScale2": 130, "maxLevel": 5, "description": "Unlocks the 4th Breeding Multiplier, Pastpres. This increases based on the number of different pets discovered from the previous world.", "boostEffect": "}x Bigger Multi", "x2": 0.3 }),
        new PetUpgrade(8, { "upgradeName": "Paint Bucket", "filler": "Filler", "material": "PetDeadCell", "x1": 30, "baseCost": 50, "costScale": 1.05, "baseCost2": 10, "costScale2": 1.35, "maxLevel": 100, "description": "Unlocks Shiny Pet Breeding. Shiny Pets come in 1 of 5 colours, and boost their Special Passive bonus when in the Fenceyard.", "boostEffect": "+}% Base Shiny Chance", "x2": 2 }),
        new PetUpgrade(9, { "upgradeName": "Overwhelmed Golden Egg", "filler": "Filler", "material": "PetDeadCell", "x1": 35, "baseCost": 55, "costScale": 1.6, "baseCost2": 10, "costScale2": 5, "maxLevel": 20, "description": "Your New Pet Chance is multiplied by the number below for every 25 kitchen upgrade levels across all kitchens! This is SUPER important!", "boostEffect": "}x Multiplier per 100 Upg", "x2": 0.05 }),
        new PetUpgrade(10, { "upgradeName": "Failsafe Restitution Cloud", "filler": "Filler", "material": "PetDeadCell", "x1": 40, "baseCost": 60, "costScale": 1.08, "baseCost2": 10, "costScale2": 3.88, "maxLevel": 25, "description": "Unlocks the 5th Breeding Multiplier, Failure. This increases every time you fail to get a new/shiny pet, up to a max, and depletes when you succeed.", "boostEffect": "} Maximum Times", "x2": 10 }),
        new PetUpgrade(11, { "upgradeName": "Shattershell Iteration", "filler": "Filler", "material": "PetDeadCell", "x1": 45, "baseCost": 65, "costScale": 1.25, "baseCost2": 10, "costScale2": 34, "maxLevel": 10, "description": "Every time you use up your last incubator egg, there is a chance to produce 2 more eggs immediately.", "boostEffect": "}% Chance", "x2": 8 }),
        new PetUpgrade(12, { "upgradeName": "Filler", "filler": "Filler", "material": "PetDeadCell", "x1": 50, "baseCost": 70, "costScale": 1.6, "baseCost2": 10, "costScale2": 50, "maxLevel": 10, "description": "Filler", "boostEffect": "}% Cost Reduction", "x2": 0 }),
    ]
}

interface TerritoryData {
    img: string
    trekReq: number
    fightPower: number
    enemyAttack: number
    battleName: string
    filler1: string
    filler2: string
    filler3: string
    enemies: {
        id: string
        health: number
        colour: number
        size: number
    }[]
}

export class Pet {
    constructor(public name: string, public gene: PetGene, public power: number) { }
}

export class Territory {
    currentSpices: number = 0;
    currentProgress: number = 0;
    spiceReward: string = '';
    pets: Pet[] = [];

    unlocked: boolean = false;

    constructor(public index: number, public data: TerritoryData) { }

    getTrekReq = () => {
        const monolithicPets = 0; // TODO: actually check
        const baseMath = 1 + 0.02 / (monolithicPets / 5 + 1);
        return (this.data.trekReq + this.currentSpices) * Math.pow(baseMath, this.currentSpices);
    }

    getTrekHr = () => {
        // if ("TotalTrekkingHR" == t) {
        //     var us = b.engine.getGameAttribute("DNSM");
        //     null != d.PetszzDN2 ? us.setReserved("PetszzDN2", 0) : (us.h.PetszzDN2 = 0);
        //     for (var gs = 0; 4 > gs; ) {
        //         var ms = gs++;
        //         if ("none" != b.engine.getGameAttribute("Pets")[(ms + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0]) {
        //             var ds = b.engine.getGameAttribute("DNSM"),
        //                 cs = b.engine.getGameAttribute("DNSM"),
        //                 ps = null != d.PetszzDN2 ? cs.getReserved("PetszzDN2") : cs.h.PetszzDN2,
        //                 hs = ds,
        //                 bs = parsenum(ps) + w._customBlock_PetStuff("Trekking", "0", ms, w._customBlock_Breeding("TerritoryID", "0", a, 42));
        //             null != d.PetszzDN2 ? hs.setReserved("PetszzDN2", bs) : (hs.h.PetszzDN2 = bs);
        //         }
        //     }
        //     for (var fs = 0; 4 > fs; ) {
        //         var ys = fs++,
        //             Rs = b.engine.getGameAttribute("Pets")[(ys + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0][1];
        //         if (parsenum(Rs) == e.__cast(3, k)) {
        //             var vs = b.engine.getGameAttribute("DNSM"),
        //                 Fs = b.engine.getGameAttribute("DNSM"),
        //                 Ns = null != d.PetszzDN2 ? Fs.getReserved("PetszzDN2") : Fs.h.PetszzDN2,
        //                 Is = vs,
        //                 Ds = 1.3 * parsenum(Ns);
        //             null != d.PetszzDN2 ? Is.setReserved("PetszzDN2", Ds) : (Is.h.PetszzDN2 = Ds);
        //         }
        //     }
        //     for (var Es = 0; 12 > Es; ) {
        //         var Ss = Es++;
        //         if (0 <= Ss + 4 * (w._customBlock_Breeding("TerritoryID", "0", a, 42) - 1) && -1 != b.engine.getGameAttribute("Pets")[(27 + (Ss + 4 * (w._customBlock_Breeding("TerritoryID", "0", a, 42) - 1))) | 0]) {
        //             var Gs = b.engine.getGameAttribute("Pets")[(Ss + (27 + 4 * (w._customBlock_Breeding("TerritoryID", "0", a, 42) - 1))) | 0][1];
        //             if (parsenum(Gs) == e.__cast(18, k)) {
        //                 var Ts = b.engine.getGameAttribute("DNSM"),
        //                     Us = b.engine.getGameAttribute("DNSM"),
        //                     _s = null != d.PetszzDN2 ? Us.getReserved("PetszzDN2") : Us.h.PetszzDN2,
        //                     Ms = Ts,
        //                     Vs = 1.2 * parsenum(_s);
        //                 null != d.PetszzDN2 ? Ms.setReserved("PetszzDN2", Vs) : (Ms.h.PetszzDN2 = Vs);
        //             }
        //         }
        //     }
        //     for (var Ps = 0; 4 > Ps; ) {
        //         var Cs = Ps++,
        //             Bs = b.engine.getGameAttribute("Pets")[(Cs + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0][1];
        //         if (parsenum(Bs) == e.__cast(14, k)) {
        //             var Os = b.engine.getGameAttribute("DNSM");
        //             null != d.PetszzDN3 ? Os.setReserved("PetszzDN3", 1) : (Os.h.PetszzDN3 = 1);
        //             for (var xs = 0; 4 > xs; ) {
        //                 var ks = xs++;
        //                 if ("none" != b.engine.getGameAttribute("Pets")[(ks + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0][0]) {
        //                     var ws = b.engine.getGameAttribute("CustomLists"),
        //                         Xs = null != d.PetGenes ? ws.getReserved("PetGenes") : ws.h.PetGenes,
        //                         zs = b.engine.getGameAttribute("Pets")[(ks + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0][1],
        //                         Ls = Xs[0 | parsenum(zs)][1];
        //                     if (0 == parsenum(Ls)) {
        //                         var Qs = b.engine.getGameAttribute("DNSM");
        //                         null != d.PetszzDN3 ? Qs.setReserved("PetszzDN3", 0) : (Qs.h.PetszzDN3 = 0);
        //                         break;
        //                     }
        //                 }
        //             }
        //             var Ws = b.engine.getGameAttribute("DNSM");
        //             if (1 == (null != d.PetszzDN3 ? Ws.getReserved("PetszzDN3") : Ws.h.PetszzDN3)) {
        //                 var Ys = b.engine.getGameAttribute("DNSM"),
        //                     Zs = b.engine.getGameAttribute("DNSM"),
        //                     Hs = null != d.PetszzDN2 ? Zs.getReserved("PetszzDN2") : Zs.h.PetszzDN2,
        //                     Js = Ys,
        //                     js = 1.5 * parsenum(Hs);
        //                 null != d.PetszzDN2 ? Js.setReserved("PetszzDN2", js) : (Js.h.PetszzDN2 = js);
        //             }
        //         }
        //     }
        //     var qs = b.engine.getGameAttribute("DNSM");
        //     return null != d.PetszzDN2 ? qs.getReserved("PetszzDN2") : qs.h.PetszzDN2;
        // }
    }
}

const initTerritory = () => {
    return [
        new Territory(0, { "img": "PetFightBG0.png", "trekReq": 5, "fightPower": 0, "enemyAttack": 1, "battleName": "The Grass Gang", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "mushG", "health": 10, "colour": 0, "size": 200 }, { "id": "frogG", "health": 30, "colour": 0, "size": 300 }, { "id": "beanG", "health": 50, "colour": 0, "size": 300 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(1, { "img": "5bg.png", "trekReq": 20, "fightPower": 5, "enemyAttack": 3, "battleName": "The Carrot Crew", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "carrotO", "health": 20, "colour": 0, "size": 300 }, { "id": "carrotO", "health": 50, "colour": 0, "size": 300 }, { "id": "carrotO", "health": 70, "colour": 0, "size": 300 }, { "id": "carrotO", "health": 150, "colour": 0, "size": 300 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(2, { "img": "10bg.png", "trekReq": 100, "fightPower": 20, "enemyAttack": 12, "battleName": "Big Boy Plank and the Gs", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "goblinG", "health": 200, "colour": 0, "size": 200 }, { "id": "goblinG", "health": 200, "colour": 0, "size": 200 }, { "id": "plank", "health": 500, "colour": 0, "size": 400 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(3, { "img": "4bg.png", "trekReq": 250, "fightPower": 50, "enemyAttack": 20, "battleName": "Branchial Heirarchy", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "branch", "health": 100, "colour": 0, "size": 100 }, { "id": "branch", "health": 300, "colour": 348, "size": 200 }, { "id": "branch", "health": 600, "colour": 336, "size": 300 }, { "id": "branch", "health": 1200, "colour": 324, "size": 400 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(4, { "img": "1bg.png", "trekReq": 1000, "fightPower": 100, "enemyAttack": 35, "battleName": "Dr. Def, phD MD", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "poopBig", "health": 5000, "colour": 0, "size": 300 }, { "id": "poopBig", "health": 10, "colour": 0, "size": 100 }, { "id": "Mob3", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(5, { "img": "9bg.png", "trekReq": 2000, "fightPower": 250, "enemyAttack": 70, "battleName": "Confetti Cake Brigade", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "crabcake", "health": 200, "colour": 0, "size": 300 }, { "id": "crabcake", "health": 800, "colour": 70, "size": 300 }, { "id": "crabcake", "health": 2000, "colour": 140, "size": 300 }, { "id": "crabcake", "health": 3000, "colour": 210, "size": 300 }, { "id": "crabcake", "health": 6000, "colour": 280, "size": 300 }] }),
        new Territory(6, { "img": "PetFightBG4.png", "trekReq": 5000, "fightPower": 600, "enemyAttack": 150, "battleName": "The Giant Grumblo", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "rocky", "health": 40000, "colour": 15, "size": 600 }, { "id": "Mob2", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob3", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(7, { "img": "14bg.png", "trekReq": 12500, "fightPower": 1100, "enemyAttack": 300, "battleName": "The Beach Boys", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "coconut", "health": 10000, "colour": 200, "size": 200 }, { "id": "coconut", "health": 50000, "colour": 300, "size": 300 }, { "id": "potato", "health": 10000, "colour": 200, "size": 200 }, { "id": "potato", "health": 50000, "colour": 300, "size": 300 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(8, { "img": "PetFightBG1.png", "trekReq": 25000, "fightPower": 1750, "enemyAttack": 600, "battleName": "The Sands of Time", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "babaHour", "health": 140000, "colour": 0, "size": 300 }, { "id": "sandgiant", "health": 10000, "colour": 0, "size": 100 }, { "id": "sandgiant", "health": 10000, "colour": 0, "size": 100 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": 0, "size": -1 }] }),
        new Territory(9, { "img": "20bg.png", "trekReq": 50000, "fightPower": 3000, "enemyAttack": 1500, "battleName": "The Dungeoneering Duo", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "babaMummy", "health": 200000, "colour": 0, "size": 200 }, { "id": "snakeZ", "health": 500000, "colour": 0, "size": 200 }, { "id": "Mob3", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(10, { "img": "PetFightBG2.png", "trekReq": 100000, "fightPower": 5000, "enemyAttack": 5000, "battleName": "The Stray Flock", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "sheep", "health": 200000, "colour": 0, "size": 100 }, { "id": "sheep", "health": 600000, "colour": 0, "size": 200 }, { "id": "sheep", "health": 200000, "colour": 0, "size": 100 }, { "id": "sheep", "health": 600000, "colour": 0, "size": 200 }, { "id": "sheep", "health": 200000, "colour": 0, "size": 100 }] }),
        new Territory(11, { "img": "PetFightBG3.png", "trekReq": 300000, "fightPower": 10000, "enemyAttack": 20000, "battleName": "The Permafrost Brothers", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "bloque", "health": 1200000, "colour": 30, "size": 400 }, { "id": "snowball", "health": 1200000, "colour": 50, "size": 400 }, { "id": "Mob3", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(12, { "img": "18bg.png", "trekReq": 1000000, "fightPower": 25000, "enemyAttack": 50000, "battleName": "The Coolest Beats", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "speaker", "health": 2000000, "colour": 0, "size": 200 }, { "id": "speaker", "health": 2000000, "colour": 0, "size": 200 }, { "id": "iceknight", "health": 6000000, "colour": 0, "size": 200 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(13, { "img": "17bg.png", "trekReq": 2000000, "fightPower": 40000, "enemyAttack": 100000, "battleName": "The Cursed Shepherd Boy", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "ram", "health": 3000000, "colour": 0, "size": 100 }, { "id": "ram", "health": 6000000, "colour": 0, "size": 200 }, { "id": "skele2", "health": 15000000, "colour": 0, "size": 300 }, { "id": "ram", "health": 6000000, "colour": 0, "size": 200 }, { "id": "ram", "health": 3000000, "colour": 0, "size": 100 }] }),
        new Territory(14, { "img": "PetFightBGz.png", "trekReq": 5000000, "fightPower": 77000, "enemyAttack": 1, "battleName": "BRuh", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "shovelR", "health": 50, "colour": 0, "size": 200 }, { "id": "shovelR", "health": 50, "colour": 0, "size": 200 }, { "id": "shovelR", "health": 125, "colour": 0, "size": 300 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(15, { "img": "8bg.png", "trekReq": 4000000, "fightPower": 100000, "enemyAttack": 200000, "battleName": "The Blue Jeans Group", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "demonP", "health": 20000000, "colour": 330, "size": 200 }, { "id": "demonP", "health": 20000000, "colour": 300, "size": 200 }, { "id": "demonP", "health": 20000000, "colour": 270, "size": 200 }, { "id": "demonP", "health": 20000000, "colour": 250, "size": 200 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(16, { "img": "21bg.png", "trekReq": 7500000, "fightPower": 175000, "enemyAttack": 300000, "battleName": "Fissure Wurm", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "w4b5", "health": 100000000, "colour": 0, "size": 500 }, { "id": "Mob2", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob3", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(17, { "img": "22bg.png", "trekReq": 10000000, "fightPower": 300000, "enemyAttack": 400000, "battleName": "Calamity Clammies", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "w4c1", "health": 250000000, "colour": 120, "size": 400 }, { "id": "w4c1", "health": 250000000, "colour": 240, "size": 500 }, { "id": "Mob3", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
        new Territory(18, { "img": "22bg.png", "trekReq": 10000000, "fightPower": 300000, "enemyAttack": 500000, "battleName": "FILLER FILLER FILLER", "filler1": "Filler", "filler2": "Filler", "filler3": "Filler", "enemies": [{ "id": "w4c1", "health": 250000000, "colour": 120, "size": 400 }, { "id": "w4c1", "health": 250000000, "colour": 240, "size": 500 }, { "id": "Mob3", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob4", "health": -1, "colour": -1, "size": -1 }, { "id": "Mob5", "health": -1, "colour": -1, "size": -1 }] }),
    ]
}

export class Egg {
    constructor(public rarity: number) { }

    getImageData = (): ImageData => {
        return {
            location: `PetEgg${this.rarity}`,
            height: 43,
            width: 38
        }
    }
}

export class Breeding {
    arenaWave: number = 0;
    territory: Territory[] = initTerritory();
    upgrade: PetUpgrade[] = initPetUpgrades();
    genes: PetGene[] = initPetGenes();
    eggs: Egg[] = [];
    timeTillEgg: number = 0;
    totalEggTime: number = 0;

    speciesUnlocks: number[] = [];
    skillLevel: number = 0;
    deadCells: number = 0;

    hasBonus = (bonusNumber: number) => {
        if (bonusNumber > waveReqs.length) {
            return false;
        }
        return this.arenaWave >= waveReqs[bonusNumber];
    }

    setTimeForEgg = (labBonus: number, mealBonus: number, alchemyBonus: number) => {
        this.totalEggTime = 7200 / (1 + (labBonus + (mealBonus + alchemyBonus)) / 100);
    }

    getStatRange = () => {
        let baseMath = Math.pow(4 * this.skillLevel + Math.pow(this.skillLevel / 2, 3), 0.85);
        const eggRarity = Math.min(1, Math.max(...this.eggs.map(egg => egg.rarity)));
        const maxRange = Math.max(0.1, 1 - ((eggRarity + 4) / 12) * 0.9);
        baseMath *= (1 + eggRarity / 8);
        const maxStat = baseMath * (Math.min(1.2 + this.skillLevel / 12, 4) * Math.pow(2.71828, -10 * 0) + 1);
        const minStat = baseMath * (Math.min(1.2 + this.skillLevel / 12, 4) * Math.pow(2.71828, -10 * maxRange) + 1);
        return [minStat, maxStat];
    }
}

export const petArenaBonuses = [
    { "desc": "Unlocks 3Rd Pet Battle Slot" },
    { "desc": "+25% Library Vip Membership" },
    { "desc": "1.20X Total Damage" },
    { "desc": "New Post Office Upgrade Crate" },
    { "desc": "Unlocks 4Th Pet Battle Slot" },
    { "desc": "1.5X Monster Cash" },
    { "desc": "New Post Office Upgrade Crate" },
    { "desc": "-50% Kitchen Upgrade Costs" },
    { "desc": "Unlocks 5Th Pet Battle Slot" },
    { "desc": "New Post Office Upgrade Crate" },
    { "desc": "+60% Library Vip Membership" },
    { "desc": "Can Equip 3Rd Large Bubble" },
    { "desc": "Unlocks 6Th Pet Battle Slot" },
    { "desc": "+20% Line Width For All Players" },
    { "desc": "2X Monster Cash" },
    { "desc": "1.40X Total Damage" }
]

// "Breeding":
// [
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // EGGS
//     [10,3,0,0,0,0,0,0],
//     [5,4,1,0,0,0,0,0,0,0,0,0,0], // UPGRADES
//     [129.02025711903048,139.839716262204,0,0,0,0,0,0,223.07304319999994],
//     [0,0,0,0,0,20,20,10,20,13,0,0,0,0,0,0,0],
//     [0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0]
// ]

export const parseBreeding = (petsStored: any[][], pets: any[][], optionsList: any[], territory: any[][], breedingData: number[][]) => {
    const breeding = new Breeding();
    if (petsStored.length == 0 || pets.length == 0 || territory.length == 0 || breedingData.length == 0) {
        return breeding;
    }
    breeding.timeTillEgg = parseFloat(optionsList[87] as string);
    breeding.arenaWave = parseInt(optionsList[89] as string);

    breedingData[0].forEach(egg => {
        breeding.eggs.push(new Egg(egg));
    });

    breeding.speciesUnlocks = breedingData[1];

    breedingData[2].forEach((upgrade, index) => {
        breeding.upgrade[index].level = upgrade;
    })

    const territoryFightsWon = parseInt(optionsList[85] as string);

    territory.forEach((territory, index) => {
        if (index < breeding.territory.length) {
            breeding.territory[index].unlocked = index < territoryFightsWon;
            breeding.territory[index].currentProgress = territory[0];
            breeding.territory[index].currentSpices = territory[1];
            breeding.territory[index].spiceReward = territory[3];

            const territoryPets = pets.slice(27 + (4 * index), 27 + (4 * index) + 4);
            territoryPets.forEach(pet => {
                breeding.territory[index].pets.push(new Pet(pet[0] as string, breeding.genes[pet[1] as number], pet[2] as number));
            })
        }
    })

    breeding.deadCells = breedingData[3][8];

    return breeding;
}

export const updateBreeding = (data: Map<string, any>) => {
    const breeding = data.get("breeding") as Breeding;
    const alchemy = data.get("alchemy") as Alchemy;
    const lab = data.get("lab") as Lab;
    const cooking = data.get("cooking") as Cooking;
    const players = data.get("players") as Player[];

    const alchemyEggTimeBonus = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Egg Ink")?.getBonus() ?? 0;
    const mealEggTimeBonus = cooking.meals.filter(meal => meal.bonusKey == "TimeEgg").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const mainframeBonus = lab.jewels.find(jewel => jewel.active && jewel.data.description == "Reduces egg incubation time")?.getBonus() ?? 0;
    breeding.setTimeForEgg(mainframeBonus, mealEggTimeBonus, alchemyEggTimeBonus);

    // Breeding level is universal, so just get it from the first player.
    breeding.skillLevel = players[0].skills.get(SkillsIndex.Breeding)?.level ?? 0;

    return breeding;
}