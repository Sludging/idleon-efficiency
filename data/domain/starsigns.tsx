import { ConstellationBase, initConstellationsRepo } from "./data/ConstellationsRepo";

interface StarBonus {
    text: string,
    bonus: number
    percent: boolean;
}

export class StarSign {
    hasChip: boolean = false;
    constructor(public name: string, public bonuses: StarBonus[]) { }

    getText = () => {
        return this.bonuses.map((bonus) => {
            return `${bonus.bonus < 0 ? "" : "+"}${bonus.bonus}${bonus.percent ? "%" : ""} ${bonus.text}`
        }).join(' | ')
    }

    getBonus = (bonusType: string) => {
        const bonus = this.bonuses.find((bonus) => bonus.text.toLowerCase().includes(bonusType.toLowerCase()));
        if (bonus) {
            return this.hasChip ? bonus.bonus * 2 : bonus.bonus;
        }
        return 0;
    }
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
    57: new StarSign("Unknown", [{ text: "Who's to say...?", bonus: 0, percent: false }]),
    58: new StarSign("Fillerz24", [{ text: "", bonus: 0, percent: false }]),
    59: new StarSign("Fillerz25", [{ text: "", bonus: 0, percent: false }]),
    60: new StarSign("Fillerz26", [{ text: "", bonus: 0, percent: false }]),
    61: new StarSign("Fillerz27", [{ text: "", bonus: 0, percent: false }]),
    62: new StarSign("Fillerz28", [{ text: "", bonus: 0, percent: false }]),
    63: new StarSign("Fillerz29", [{ text: "", bonus: 0, percent: false }]),
}
