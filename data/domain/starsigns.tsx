import { ConstellationBase, initConstellationsRepo } from "./data/ConstellationsRepo";
import { Domain } from './base/domain';
import { RawData } from './base/domain';
import { Item } from "./items";
import { Summoning } from "./world-6/summoning";

interface StarBonus {
    text: string,
    bonus: number
    percent: boolean;
}

export class StarSign {
    hasChip: boolean = false;
    seraphCosmosBonus: number = 1;
    aligned: boolean = false;
    constructor(public name: string, public bonuses: StarBonus[]) { }

    getText = () => {
        return this.bonuses.map((bonus) => {
            return `${bonus.bonus < 0 ? "" : "+"}${bonus.bonus}${bonus.percent ? "%" : ""} ${bonus.text}`
        }).join(' | ')
    }

    getBonus = (bonusType: string) => {
        const bonus = this.bonuses.find((bonus) => bonus.text.toLowerCase().includes(bonusType.toLowerCase()));
        if (bonus) {
            return this.hasChip ? bonus.bonus * this.seraphCosmosBonus * 2 : bonus.bonus * this.seraphCosmosBonus;
        }
        return 0;
    }

    duplicate(noDownside: boolean = false) {
        let bonuses = this.bonuses;
        if (noDownside) {
            bonuses = bonuses.filter(bonus => bonus.bonus > 0);
        }

        return new StarSign(this.name, bonuses);
    }
}

export class StarSigns extends Domain  {
    unlockedStarSigns: string[] = [];
    summoningLevel: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "StarSignsUnlocked", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const starSigns = data.get("starsigns") as StarSigns;      
        const starSignsUnlockedData = data.get("StarSg") as string;

        console.log(starSignsUnlockedData);

        starSigns.unlockedStarSigns = [];
        if (starSignsUnlockedData) {
            /*starSignsUnlockedData.map((key: string, value: string | number) => {
                if (!starSigns.unlockedStarSigns.includes(key)) {
                    starSigns.unlockedStarSigns.push(key);
                }
            });*/
    
            console.log(starSigns.unlockedStarSigns);
        }    
    }

    isStarSignUnlocked = (starSignName: string): boolean => {
        return this.unlockedStarSigns.includes(starSignName.replaceAll(' ', '_'));
    }

    getSeraphCosmosBonus = (): number => {
        if (this.isStarSignUnlocked("Seraph Cosmos")) {
            return Math.min(3, Math.pow(1.1, Math.ceil((this.summoningLevel + 1) / 20)));
        } else {
            return 1;
        }
    }

    getMaxNumberOfEquipedSigns = (): number => {
        let count = 1;
        if (this.isStarSignUnlocked("Chronus Cosmos")) {
            count++;
        }
        if (this.isStarSignUnlocked("Hydron Cosmos")) {
            count++;
        }
        return count;
    }
}

export const updateStarSignsUnlocked = (data: Map<string, any>) => {
    const starSigns = data.get("starsigns") as StarSigns;
    const summoning = data.get("summoning") as Summoning;

    starSigns.summoningLevel = summoning.summoningLevel;
}

export const StarSignMap: Record<number, StarSign> = {
    0: new StarSign("The Buff Guy", [{ text: "Total Damage", bonus: 1, percent: true }, { text: "STR", bonus: 3, percent: false }]),
    1: new StarSign("Flexo Bendo", [{ text: "Movement Speed", bonus: 2, percent: true }, { text: "AGI", bonus: 3, percent: false }]),
    2: new StarSign("The Book Worm", [{ text: "Class EXP Gain", bonus: 1, percent: true }, { text: "WIS", bonus: 3, percent: false }]),
    3: new StarSign("The Fuzzy Dice", [{ text: "Talent Points", bonus: 3, percent: true }, { text: "LUK", bonus: 3, percent: false }]),
    4: new StarSign("Dwarfo Beardus", [{ text: "Mining Efficiency", bonus: 5, percent: true }, { text: "Multi-Ore Chance", bonus: 20, percent: true }]),
    5: new StarSign("Hipster Logger", [{ text: "Chop Efficiency", bonus: 5, percent: true }, { text: "Multi-Log Chance", bonus: 20, percent: true }]),
    6: new StarSign("Pie Seas", [{ text: "Fishing Efficiency", bonus: 5, percent: true }, { text: "Multi-Fish Chance", bonus: 20, percent: true }]),
    7: new StarSign("Shoe Fly", [{ text: "Catch Efficiency", bonus: 5, percent: true }, { text: "Multi-Bug Chance", bonus: 20, percent: true }]),
    8: new StarSign("Blue Hedgehog", [{ text: "Movement Speed", bonus: 4, percent: true }, { text: "Ring Drop", bonus: 0.0001, percent: true }]),
    9: new StarSign("Gum Drop", [{ text: "to get a Time Candy when claiming 8+ Hour AFK gains", bonus: 15, percent: true }]),
    10: new StarSign("Activelius", [{ text: "Class EXP when fighting actively", bonus: 15, percent: true }]),
    11: new StarSign("Pack Mule", [{ text: "Carry Cap", bonus: 10, percent: true }]),
    12: new StarSign("Ned Kelly", [{ text: "Defence", bonus: 6, percent: true }, { text: "Weapon Power", bonus: 2, percent: false }]),
    13: new StarSign("Robinhood", [{ text: "Accuracy", bonus: 4, percent: true }, { text: "Movement Speed", bonus: 2, percent: true }, { text: "Cant Trade GME", bonus: 1, percent: false }]),
    14: new StarSign("Pirate Booty", [{ text: "Drop Rate", bonus: 5, percent: true }]),
    15: new StarSign("Muscle Man", [{ text: "STR", bonus: 8, percent: false }]),
    16: new StarSign("Fast Frog", [{ text: "AGI", bonus: 8, percent: false }]),
    17: new StarSign("Smart Stooge", [{ text: "WIS", bonus: 8, percent: false }]),
    18: new StarSign("Lucky Larry", [{ text: "LUK", bonus: 8, percent: false }]),
    19: new StarSign("Silly Snoozer", [{ text: "Fight AFK Gain", bonus: 2, percent: true }]),
    20: new StarSign("The Big Comatose", [{ text: "Skill AFK Gain", bonus: 2, percent: true }]),
    21: new StarSign("Miniature Game", [{ text: "minigame reward", bonus: 30, percent: true }]),
    22: new StarSign("Mount Eaterest", [{ text: "chance to not consume food", bonus: 10, percent: true }, { text: "All Food Effect", bonus: 15, percent: true }]),
    23: new StarSign("Bob Build Guy", [{ text: "Speed in Town Skills", bonus: 10, percent: true }]),
    24: new StarSign("The Big Brain", [{ text: "Class EXP gain", bonus: 3, percent: true }]),
    25: new StarSign("The OG Skiller", [{ text: "Carry Cap", bonus: 5, percent: true }, { text: "Skill AFK gain", bonus: 1, percent: true }, { text: "All Skill Prowess", bonus: 2, percent: true }]),
    26: new StarSign("Grim Reaper", [{ text: "Mob Respawn rate", bonus: 2, percent: true }]),
    27: new StarSign("The Fallen Titan", [{ text: "Boss Damage", bonus: 3, percent: true }, { text: "Crit Chance", bonus: 4, percent: true }]),
    28: new StarSign("The Forsaken", [{ text: "Total HP", bonus: -80, percent: true }, { text: "Defence", bonus: -50, percent: true }, { text: "Fight AFK Gain", bonus: 6, percent: true }]),
    29: new StarSign("Mr No Sleep", [{ text: "AFK Gain", bonus: -6, percent: true }, { text: "Carry Cap", bonus: 30, percent: true }]),
    30: new StarSign("Sir Savvy", [{ text: "Skill EXP gain", bonus: 3, percent: true }]),
    31: new StarSign("All Rounder", [{ text: "All Stats", bonus: 4, percent: false }]),
    32: new StarSign("Fatty Doodoo", [{ text: "Movement Speed", bonus: -3, percent: true }, { text: "Defence", bonus: 5, percent: true }, { text: "Total Damage", bonus: 2, percent: true }]),
    33: new StarSign("Chronus Cosmos", [{ text: "All character can now align with 2 Star Signs at once", bonus: 0, percent: false }]),
    34: new StarSign("All Rounderi", [{ text: "All Stat i.e. STR/AGI/WIS/LUK", bonus: 1, percent: true }]),
    35: new StarSign("Centaurii", [{ text: "Accuracy", bonus: 10, percent: true }]),
    36: new StarSign("Murmollio", [{ text: "Defence", bonus: 10, percent: true }]),
    37: new StarSign("Strandissi", [{ text: "STR", bonus: 3, percent: true }]),
    38: new StarSign("Agitagi", [{ text: "AGI", bonus: 3, percent: true }]),
    39: new StarSign("Wispommo", [{ text: "WIS", bonus: 3, percent: true }]),
    40: new StarSign("Lukiris", [{ text: "LUK", bonus: 3, percent: true }]),
    41: new StarSign("Pokaminni", [{ text: "Card Drop (Outside of Dungeons)", bonus: 15, percent: true }]),
    42: new StarSign("Gor Bowzor", [{ text: "Boss Damage", bonus: 12, percent: true }]),
    43: new StarSign("Hydron Cosmos", [{ text: "All characters can now align with 3 Star Signs at once", bonus: 0, percent: false }]),
    44: new StarSign("Trapezoidburg", [{ text: "Critters/Trap", bonus: 20, percent: true }, { text: "Trap Efficiency", bonus: 10, percent: true }]),
    45: new StarSign("Sawsaw Salala", [{ text: "Construct Exp", bonus: 25, percent: true }]),
    46: new StarSign("Preys Bea", [{ text: "Worship Efficiency", bonus: 15, percent: true }, { text: "Worship EXP", bonus: 15, percent: true }]),
    47: new StarSign("Cullingo", [{ text: "Total Multikill", bonus: 15, percent: true }]),
    48: new StarSign("Gum Drop Major", [{ text: "to get a Time Candy when claiming 40+ Hour AFK gains", bonus: 40, percent: true }]),
    49: new StarSign("Grim Reaper Major", [{ text: "Mob Respawn rate (If Lv>60)", bonus: 4, percent: true }]),
    50: new StarSign("Sir Savvy Major", [{ text: "Skill EXP gain (If Lv>70)", bonus: 6, percent: true }]),
    51: new StarSign("The Bulwark", [{ text: "Total Damage", bonus: 20, percent: true }, { text: "Movement Speed", bonus: -12, percent: true }]),
    52: new StarSign("Big Brain Major", [{ text: "Class EXP gain (If Lv>80)", bonus: 6, percent: true }]),
    53: new StarSign("The Fiesty", [{ text: "Total Damage", bonus: 6, percent: true }]),
    54: new StarSign("The Overachiever", [{ text: "Total Damage", bonus: 15, percent: true }, { text: "Fight AFK Gain", bonus: -7, percent: true }]),
    55: new StarSign("Comatose Major", [{ text: "Skill AFK Gain (If Lv>90)", bonus: 4, percent: true }]),
    56: new StarSign("S. Snoozer Major", [{ text: "Fight AFK Gain (If Lv>100)", bonus: 4, percent: true }]),
    57: new StarSign("Breedabilli", [{ text: "Breedable Spd", bonus: 35, percent: true }, { text: "Shiny Pet LV spd", bonus: 15, percent: true }]),
    58: new StarSign("Gordonius Major", [{ text: "Cooking SPD (Multiplicative!)", bonus: 15, percent: true }]),
    59: new StarSign("Power Bowower", [{ text: "Pet DMG for Breeding Skill", bonus: 30, percent: true }]),
    60: new StarSign("Scienscion", [{ text: "Lab EXP Gain", bonus: 20, percent: true }]),
    61: new StarSign("Artifosho", [{ text: "Artifact Find Chance (Multiplicative)", bonus: 15, percent: true }]),
    62: new StarSign("Divividov", [{ text: "Divinity EXP", bonus: 30, percent: true }]),
    63: new StarSign("C. Shanti Minor", [{ text: "Sailing SPD", bonus: 20, percent: true }]),
    64: new StarSign("Muscle Magnus", [{ text: "STR", bonus: 50, percent: false }]),
    65: new StarSign("Cropiovo Minor", [{ text: "Crop Evo chance per Farming LV", bonus: 3, percent: true }]),
    66: new StarSign("Fabarmi", [{ text: "Farming EXP", bonus: 20, percent: true }]),
    67: new StarSign("O.G. Signalais", [{ text: "OG Chance", bonus: 15, percent: true }]),
    68: new StarSign("Lightspeed Frog", [{ text: "AGI", bonus: 50, percent: false }]),
    69: new StarSign("Beanbie Major", [{ text: "Golden Food", bonus: 20, percent: true }]),
    70: new StarSign("Damarian Major", [{ text: "Total Damage", bonus: 25, percent: true }]),
    71: new StarSign("Lotto Larrinald", [{ text: "LUK", bonus: 50, percent: false }]),
    72: new StarSign("Intellostooge", [{ text: "WIS", bonus: 50, percent: false }]),
    73: new StarSign("S. Tealio", [{ text: "Ninja Twin Stealth", bonus: 12, percent: true }]),
    74: new StarSign("Sneekee E. X.", [{ text: "Sneaking EXP", bonus: 15, percent: true }]),
    75: new StarSign("Jadaciussi", [{ text: "Jade Gain (Multiplicative!)", bonus: 10, percent: true }]),
    76: new StarSign("Druipi Major", [{ text: "Drop Rarity", bonus: 12, percent: true }]),
    77: new StarSign("Sumo Magno", [{ text: "Summoning EXP", bonus: 20, percent: true }]),
    78: new StarSign("Killian Maximus", [{ text: "Multikill Per Tier", bonus: 3, percent: true }]),
    79: new StarSign("Seraph Cosmos", [{ text: "All characters now get 1.10x Star Sign bonuses per 20 Summoning LV", bonus: 10, percent: true }]),
    80: new StarSign("Glimmer of Beyond", [{ text: "This star sign is unreachable for now...", bonus: 0, percent: true }]),
    81: new StarSign("Fillerz48", [{ text: "", bonus: 0, percent: false }]),
    82: new StarSign("Fillerz49", [{ text: "", bonus: 0, percent: false }]),
    83: new StarSign("Fillerz50", [{ text: "", bonus: 0, percent: false }]),
    84: new StarSign("Fillerz51", [{ text: "", bonus: 0, percent: false }]),
    85: new StarSign("Fillerz52", [{ text: "", bonus: 0, percent: false }]),
    86: new StarSign("Fillerz53", [{ text: "", bonus: 0, percent: false }]),
    87: new StarSign("Fillerz54", [{ text: "", bonus: 0, percent: false }]),
    88: new StarSign("Fillerz55", [{ text: "", bonus: 0, percent: false }]),
    89: new StarSign("Fillerz56", [{ text: "", bonus: 0, percent: false }]),
    90: new StarSign("Fillerz57", [{ text: "", bonus: 0, percent: false }]),
    91: new StarSign("Fillerz58", [{ text: "", bonus: 0, percent: false }]),
    92: new StarSign("Fillerz59", [{ text: "", bonus: 0, percent: false }]),
    93: new StarSign("Fillerz32", [{ text: "", bonus: 0, percent: false }]),
}