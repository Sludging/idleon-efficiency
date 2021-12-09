interface StarBonus {
    text: string,
    bonus: number
    percent: boolean;
}

export class StarSign {
    constructor(public name: string, public bonuses: StarBonus[]) { }

    getText = () => {
        return this.bonuses.map((bonus) => {
            return `${bonus.bonus < 0 ? "" : "+"}${bonus.bonus}${bonus.percent ? "%" : ""} ${bonus.text}`
        }).join(' | ')
    }

    getBonus = (bonusType: string) => {
        const bonus = this.bonuses.find((bonus) => bonus.text.toLowerCase().includes(bonusType.toLowerCase()));
        if (bonus) {
            return bonus.bonus;
        }
        return 0;
    }
}

export class Constellation {
    constructor(public name: string, public area: string, public x: number, public y: number, public num1: number, public num2: number, public num3: number, public num4: number, public requirement: string, public starChartPoints: number) { }
}

export const StarSignMap: Record<number, StarSign> = {
    0: new StarSign("The Buff Guy", [{ text: "Total Damage", bonus: 1, percent: true }, { text: "STR", bonus: 3, percent: false }]),
    1: new StarSign("Flexo Bendo", [{ text: "Movement Speed", bonus: 2, percent: true }, { text: "AGI", bonus: 3, percent: false }]),
    2: new StarSign("The Book Worm", [{ text: "Class EXP Gain", bonus: 1, percent: true }, { text: "WIS", bonus: 3, percent: false }]),
    3: new StarSign("The Fuzzy Dice", [{ text: "Talent Points", bonus: 3, percent: true }, { text: "LUK", bonus: 3, percent: false }]),
    4: new StarSign("Dwarfo Beardus", [{ text: "Mining Efficency", bonus: 5, percent: true }, { text: "Multi-Ore Chance", bonus: 20, percent: true }]),
    5: new StarSign("Hipster Logger", [{ text: "Chop Efficency", bonus: 5, percent: true }, { text: "Multi-Log Chance", bonus: 20, percent: true }]),
    6: new StarSign("Pie Seas", [{ text: "Fishing Efficency", bonus: 5, percent: true }, { text: "Multi-Fish Chance", bonus: 20, percent: true }]),
    7: new StarSign("Shoe Fly", [{ text: "Catch Efficency", bonus: 5, percent: true }, { text: "Multi-Bug Chance", bonus: 20, percent: true }]),
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
    33: new StarSign("Chronus Cosmos", [ { text: "All character can now align with 2 Star Signs at once", bonus: 0, percent: false}]),
    34: new StarSign("All Rounderi", [ { text: "All Stat i.e. STR/AGI/WIS/LUK", bonus: 1, percent: true}]),
    35: new StarSign("Centaurii", [ { text: "Accuracy", bonus: 10, percent: true}]),
    36: new StarSign("Murmollio", [ { text: "Defence", bonus: 10, percent: true}]),
    37: new StarSign("Strandissi", [ { text: "STR", bonus: 3, percent: true}]),
    38: new StarSign("Agitagi", [ { text: "AGI", bonus: 3, percent: true}]),
    39: new StarSign("Wispommo", [ { text: "WIS", bonus: 3, percent: true}]),
    40: new StarSign("Lukiris", [ { text: "LUK", bonus: 3, percent: true}]),
    41: new StarSign("Pokaminni", [ { text: "Card Drop (Outside of Dungeons)", bonus: 15, percent: true}]),
    42: new StarSign("Gor Bowzor", [ { text: "Boss Damage", bonus: 12, percent: true}]),
    43: new StarSign("Hydron Cosmos", [ { text: "All characters can now align with 3 Star Signs at once", bonus: 0, percent: false}]),
    44: new StarSign("Trapezoidburg", [ { text: "Critters/Trap", bonus: 20, percent: true}, { text: "Trap Efficiency", bonus: 10, percent: true}]),
    45: new StarSign("Sawsaw Salala", [ { text: "Construct Exp", bonus: 25, percent: true}]),
    46: new StarSign("Preys Bea", [ { text: "Worship Efficiency", bonus: 15, percent: true}, { text: "Worship EXP", bonus: 15, percent: true}]),
    47: new StarSign("Cullingo", [ { text: "Total Multikill", bonus: 15, percent: true}]),
    48: new StarSign("Gum Drop Major", [ { text: "to get a Time Candy when claiming 40+ Hour AFK gains", bonus: 40, percent: true}]),
    49: new StarSign("Grim Reaper Major", [ { text: "Mob Respawn rate (If Lv>60)", bonus: 4, percent: true}]),
    50: new StarSign("Sir Savvy Major", [ { text: "Skill EXP gain (If Lv>70)", bonus: 6, percent: true}]),
    51: new StarSign("The Bulwark", [ { text: "Total Damage", bonus: 20, percent: true}, { text: "Movement Speed", bonus: -12, percent: true}]),
    52: new StarSign("Big Brain Major", [ { text: "Class EXP gain (If Lv>80)", bonus: 6, percent: true}]),
    53: new StarSign("The Fiesty", [ { text: "Total Damage", bonus: 6, percent: true}]),
    54: new StarSign("The Overachiever", [ { text: "Total Damage", bonus: 15, percent: true}, { text: "Fight AFK Gain", bonus: -7, percent: true}]),
    55: new StarSign("Comatose Major", [ { text: "Skill AFK Gain (If Lv>90)", bonus: 4, percent: true}]),
    56: new StarSign("S. Snoozer Major", [ { text: "Fight AFK Gain (If Lv>100)", bonus: 4, percent: true}]),
    57: new StarSign("Unknown", [ { text: "Who's to say...?", bonus: 0, percent: false}]),
    58: new StarSign("Fillerz24", [ { text: "", bonus: 0, percent: false}]),
    59: new StarSign("Fillerz25", [ { text: "", bonus: 0, percent: false}]),
    60: new StarSign("Fillerz26", [ { text: "", bonus: 0, percent: false}]),
    61: new StarSign("Fillerz27", [ { text: "", bonus: 0, percent: false}]),
    62: new StarSign("Fillerz28", [ { text: "", bonus: 0, percent: false}]),
    63: new StarSign("Fillerz29", [ { text: "", bonus: 0, percent: false}]),
}

export const ConstellationMap: Record<number, Constellation> = {
    0: new Constellation("A-1","Blunder Hills",908,21,30,99,4,3,"Reach Lv 30 on four players @ Progress:{/}",1),
    1: new Constellation("A-2","Where the Branches End",827,343,1,99,1,3,"AFK here for 1+ hours. @ Progress:{/}",3),
    2: new Constellation("A-3","Valley Of The Beans",575,1186,0,99,4,3,"Reach this star on 4 players @ Progress:{/}",0),
    3: new Constellation("A-4","Tucked Away",387,835,0,99,3,4,"Reach this star on 3 players @ Progress:{/}",0),
    4: new Constellation("A-5","The Office",296,446,0,99,3,5,"Defeat Dr. Defecaus on 3 players @ Progress:{/}",4),
    5: new Constellation("A-6","Freefall Caverns",653,236,18,30,1,3,"Reach this star as any Archer Class @ Progress:{/}",0),
    6: new Constellation("A-7","Winding Willows",707,651,24,99,2,3,"AFK here for 24+ hours on 2 players @ Progress:{/}",3),
    7: new Constellation("A-8","Dewdrop Colosseum",882,459,0,99,3,4,"Clear the colosseum on 3 players @ Progress:{/}",4),
    8: new Constellation("A-9","End Of The Road",1183,571,20,99,3,5,"Defeat Amarok in under 20 seconds on 3 players @ Progress:{/}",4),
    9: new Constellation("A-10","Echoing Egress",125,758,31,43,1,4,"Reach this star as any Mage Class @ Progress:{/}",0),
    10: new Constellation("Filler","",0,0,0,0,0,0,"",0),
    11: new Constellation("Filler","",0,0,0,0,0,0,"",0),
    12: new Constellation("B-1","The Mimic Hole",16,876,0,99,3,4,"Reach this star on 3 players @ Progress:{/}",0),
    13: new Constellation("B-2","Faraway Piers",490,367,31,43,1,4,"Reach this star as any Mage Class @ Progress:{/}",0),
    14: new Constellation("B-3","The Grandioso Canyon",1011,432,36,99,3,4,"AFK here for 36+ hours on 3 players @ Progress:{/}",3),
    15: new Constellation("B-4","Slamabam Straightaway",1790,443,0,99,4,5,"Reach this star on 4 players @ Progress:{/}",0),
    16: new Constellation("B-5","Sandstone Colosseum",134,209,0,99,4,3,"Clear the colosseum on 4 players @ Progress:{/}",4),
    17: new Constellation("B-6","Efaunt's Tomb",210,443,0,99,1,5,"Defeat Efaunt as any Beginner Class @ Progress:{/}",4),
    18: new Constellation("B-7","Up Up Down Down",958,55,48,99,3,3,"AFK here for 48+ hours on 3 players @ Progress:{/}",3),
    19: new Constellation("B-8","YumYum Grotto",11,451,65,99,4,4,"Reach Lv 65 on four players @ Progress:{/}",1),
    20: new Constellation("Filler","",0,0,0,0,0,0,"",0),
    21: new Constellation("Filler","",0,0,0,0,0,0,"",0),
    22: new Constellation("Filler","",0,0,0,0,0,0,"",0),
    23: new Constellation("C-1","Frostbite Towndra",13,244,90,99,6,6,"Reach Lv 90 on 6 players @ Progress:{/}",1),
    24: new Constellation("C-2","Steep Sheep Ledge",898,698,0,99,4,4,"Defeat a sheepie barehanded on four players @ Progress:{/}",4),
    25: new Constellation("C-3","Trappers Folley",183,368,0,99,5,4,"Reach Lv 15 trapping on five players @ Progress:{/}",4),
    26: new Constellation("C-4","Refrigeration Station",78,450,60,99,3,4,"AFK for 60+ hrs on 3 players @ Progress:{/}",3),
    27: new Constellation("C-5","Rollin' Tundra",1643,439,11,99,4,5,"Reach wave 11 on 4 players @ Progress:{/}",4),
    28: new Constellation("C-6","Thermonuclear Climb",843,1010,11,99,9,5,"AFK for 11+ hrs on 9 players @ Progress:{/}",3),
    29: new Constellation("C-7","Crystal Basecamp",1488,283,0,99,6,6,"Reach this star on 6 players @ Progress:{/}",0),
    30: new Constellation("C-8","Hell Hath Frozen Over",923,303,0,99,4,5,"Kill a bloodbone on 4 players @ Progress:{/}",4),
    31: new Constellation("Filler","",0,0,0,0,0,0,"",0),
    32: new Constellation("Filler","",0,0,0,0,0,0,"",0),
    33: new Constellation("Filler","",0,0,0,0,0,0,"",0),
}