import { lavaFunc } from "../utility";

export const TalentConst = {
    NearbyOutletIndex: 478,
    ChargeSiphonIndex: 475,
    CrystalSpawnIndex: 26,
    CrystalForDaysIndex: 619
}

export class Talent {
    public name: string;
    public description: string;
    public x1: number;
    public x2: number;
    public funcX: string;
    public y1: number;
    public y2: number;
    public funcY: string;
    public lvlUpText: string;
    public skillIndex: number

    level: number = 0;
    maxLevel: number = 0;

    constructor({ name, description, x1, x2, funcX, y1, y2, funcY, lvlUpText, skillIndex }: { name: string, description: string, x1: number, x2: number, funcX: string, y1: number, y2: number, funcY: string, lvlUpText: string, skillIndex: number }) {
        this.name = name;
        this.description = description;
        this.x1 = x1;
        this.x2 = x2;
        this.funcX = funcX;
        this.y1 = y1;
        this.y2 = y2;
        this.funcY = funcY;
        this.lvlUpText = lvlUpText;
        this.skillIndex = skillIndex;
    }

    getBonus = (round: boolean = false, yBonus = false) => {
        if (yBonus) {
            return lavaFunc(this.funcY, this.level, this.y1, this.y2, round);
        }
        return lavaFunc(this.funcX, this.level, this.x1, this.x2, round);
    }

    getBonusText = (): string => {
        const xBonus = this.getBonus(true);
        const yBonus = this.getBonus(true, true);
        if (this.description.includes("}")) {
            return this.description.replace("{", xBonus.toString()).replace("}", yBonus.toString());
        }

        return this.description.replace("{", xBonus.toString());
    }

    getClass = (): string => {
        return `icons-5656 icons-UISkillIcon${this.skillIndex}`;
    }
}

export enum ClassIndex {
    Beginner = 1,
    Journeyman = 2,
    Maestro = 3,
    Virtuoso = 4,
    Infinilyte = 5,
    Warrior = 7,
    Barbarian = 8,
    Squire = 9,
    Blood_Berserker = 10,
    Death_Bringer = 11,
    Divine_Knight = 12,
    Royal_Guardian = 13,
    Archer = 19,
    Bowman = 20,
    Hunter = 21,
    Siege_Breaker = 22,
    Mayheim = 23,
    Wind_Walker = 24,
    Beast_Master = 25,
    Mage = 31,
    Wizard = 32,
    Shaman = 33,
    Elemental_Sorcerer = 34,
    Spiritual_Monk = 35,
    Bubonic_Conjuror = 36,
    Arcane_Cultist = 37
}

export const ClassTalentMap: Record<ClassIndex, string[]> = {
    [ClassIndex.Beginner]: ["Beginner"],
    [ClassIndex.Journeyman]: ["Beginner", "Journeyman"],
    [ClassIndex.Maestro]: ["Beginner", "Journeyman", "Maestro"],
    [ClassIndex.Virtuoso]: [],
    [ClassIndex.Infinilyte]: [],
    [ClassIndex.Warrior]: ["Rage Basics", "Warrior"],
    [ClassIndex.Barbarian]: ["Rage Basics", "Warrior", "Barbarian"],
    [ClassIndex.Squire]: ["Rage Basics", "Warrior", "Squire"],
    [ClassIndex.Blood_Berserker]: [],
    [ClassIndex.Death_Bringer]: [],
    [ClassIndex.Divine_Knight]: [],
    [ClassIndex.Royal_Guardian]: [],
    [ClassIndex.Archer]: ["Calm Basics", "Archer"],
    [ClassIndex.Bowman]: ["Calm Basics", "Archer", "Bowman"],
    [ClassIndex.Hunter]: ["Calm Basics", "Archer", "Hunter"],
    [ClassIndex.Siege_Breaker]: [],
    [ClassIndex.Mayheim]: [],
    [ClassIndex.Wind_Walker]: [],
    [ClassIndex.Beast_Master]: [],
    [ClassIndex.Mage]: ["Savvy Basics", "Mage"],
    [ClassIndex.Shaman]: ["Savvy Basics", "Mage", "Shaman"],
    [ClassIndex.Wizard]: ["Savvy Basics", "Mage", "Wizard"],
    [ClassIndex.Elemental_Sorcerer]: [],
    [ClassIndex.Spiritual_Monk]: [],
    [ClassIndex.Bubonic_Conjuror]: [],
    [ClassIndex.Arcane_Cultist]: [],
}


export const GetTalentArray = (page: string): Talent[] => {
    switch (page) {
        case "Beginner": return [
            new Talent(JSON.parse('{"name": "Health Booster", "description": "Increases Max HP by {", "x1": 1, "x2": 0.15, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Hp", "skillIndex": 0}')),
            new Talent(JSON.parse('{"name": "Mana Booster", "description": "Increases Max MP by {", "x1": 1, "x2": 0.1, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Mp", "skillIndex": 1}')),
            new Talent(JSON.parse('{"name": "Star Player", "description": "Gives { Star Talent Points. Star Talents are found throughout the game!", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Star Talent Point", "skillIndex": 8}')),
            new Talent(JSON.parse('{"name": "Bucklered Up", "description": "Increases Total Defense by +{%", "x1": 40, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{% Total Def", "skillIndex": 9}')),
            new Talent(JSON.parse('{"name": "Sharpened Axe", "description": "Increases Base Weapon Power by {. This contributes to your total damage.", "x1": 0.25, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{ Base Weapon Power", "skillIndex": 5}')),
            new Talent(JSON.parse('{"name": "Fist Of Rage", "description": "Increases your Base STR by { (STR boosts Max HP and Crit Damage)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Str", "skillIndex": 10}')),
            new Talent(JSON.parse('{"name": "Quickness Boots", "description": "Increases your Base AGI by { (AGI boosts Movement Speed and Crit Chance)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Agi", "skillIndex": 11}')),
            new Talent(JSON.parse('{"name": "Book Of The Wise", "description": "Increases your Base WIS by { (WIS boosts Mana and Boss Damage)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Wis", "skillIndex": 12}')),
            new Talent(JSON.parse('{"name": "Lucky Clover", "description": "Increases your Base LUK by { (LUK boosts drop rate, EXP Gain, and other RNG)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Luk", "skillIndex": 13}')),
            new Talent(JSON.parse('{"name": "Gilded Sword", "description": "Boosts Damage dealt to all monsters by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{% Damage", "skillIndex": 6}')),
            new Talent(JSON.parse('{"name": "Happy Dude", "description": "Increases Exp Gain for all Skills by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Exp Gain", "skillIndex": 75}')),
            new Talent(JSON.parse('{"name": "Knucklebuster", "description": "Increases Critical Hit Damage by {%", "x1": 30, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Critical Damage", "skillIndex": 76}')),
            new Talent(JSON.parse('{"name": "Feather Flight", "description": "Increases Movement Speed by {%", "x1": 20, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Move Speed", "skillIndex": 77}')),
            new Talent(JSON.parse('{"name": "Extra Bags", "description": "Carry Capacity for materials is increased by {%", "x1": 200, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Mat Carry Cap", "skillIndex": 78}')),
            new Talent(JSON.parse('{"name": "Sleepin\' On The Job", "description": "AFK Gains Rate for Fighting is increased by {%", "x1": 21, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Afk Gains Rate", "skillIndex": 79}')),
        ];
        case "Journeyman": return [
            new Talent(JSON.parse('{"name": "Indiana Attack", "description": "Whip forward, dealing {% dmg and pulling in up to } monsters.", "x1": 50, "x2": 1, "funcX": "bigBase", "y1": 3, "y2": 30, "funcY": "intervalAdd", "lvlUpText": "+{% Dmg & +} Mobs", "skillIndex": 15}')),
            new Talent(JSON.parse('{"name": "Breakin\' The Bank", "description": "Multiplies value of all coins on ground by {x.", "x1": 0.6, "x2": 100, "funcX": "decayMulti", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{X Multi", "skillIndex": 16}')),
            new Talent(JSON.parse('{"name": "Supernova Player", "description": "Gives { Star Talent Points.", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Star Talent Point", "skillIndex": 17}')),
            new Talent(JSON.parse('{"name": "Two Punch Man", "description": "Regular punches do +{% more damage and also hit a 2nd time for }% damage", "x1": 0.6, "x2": 0, "funcX": "add", "y1": 25, "y2": 3, "funcY": "intervalAdd", "lvlUpText": "+{% Dmg & +}% 2Nd Dmg", "skillIndex": 18}')),
            new Talent(JSON.parse('{"name": "Gimme Gimme", "description": "Monsters have a {% chance to drop 2x loot for } Minutes", "x1": 80, "x2": 60, "funcX": "decay", "y1": 3, "y2": 20, "funcY": "intervalAdd", "lvlUpText": "+{% Chance & +} Minutes", "skillIndex": 19}')),
            new Talent(JSON.parse('{"name": "Lucky Hit", "description": "LUK\'s effect on Damage is increased by {%", "x1": 0.4, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Effect", "skillIndex": 20}')),
            new Talent(JSON.parse('{"name": "F\'Luk\'Ey Fabrics", "description": "All Equipment gives {% more LUK than what\'s listed", "x1": 100, "x2": 250, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Luk From Equips", "skillIndex": 21}')),
            new Talent(JSON.parse('{"name": "Chaching!", "description": "Straight up cash, yo. +{% more to be exact.", "x1": 50, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Mo Money", "skillIndex": 22}')),
            new Talent(JSON.parse('{"name": "Lucky Horseshoe", "description": "+{ base LUK", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Luk", "skillIndex": 23}')),
            new Talent(JSON.parse('{"name": "Curse Of Mr Looty Booty", "description": "+{% Drop rate, and -}% Total Damage. Cmon, do it! Or are u too scared?", "x1": 70, "x2": 100, "funcX": "decay", "y1": 120, "y2": 100, "funcY": "decay", "lvlUpText": "+{% Drop & -}% Dmg", "skillIndex": 24}')),
            new Talent(JSON.parse('{"name": "Its Your Birthday!", "description": "Drops some random reward. Has a {% chance to have no cooldown!", "x1": 35, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Chance", "skillIndex": 25}')),
            new Talent(JSON.parse('{"name": "Cmon Out Crystals", "description": "+{% Crystal Mob spawn chance", "x1": 300, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Spawn Chance", "skillIndex": 26}')),
            new Talent(JSON.parse('{"name": "Reroll Pls", "description": "{% Chance to get a reroll on AFK rewards. Can trigger multiple times!", "x1": 36, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Chance", "skillIndex": 27}')),
            new Talent(JSON.parse('{"name": "Cards Galore", "description": "+{% Card Drop Chance. As with all card drop bonuses, this affects AFK too.", "x1": 50, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Card Drop Chance", "skillIndex": 28}')),
            new Talent(JSON.parse('{"name": "Rares Everywhere!", "description": "Items in all Rare Drop Tables are {% more likely to drop!", "x1": 30, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Rare Drop Table Items", "skillIndex": 29}')),
        ];
        case "Maestro": return [
            new Talent(JSON.parse('{"name": "Coin Toss", "description": "Throws a coin which deals {% Dmg. Damage also increases the more money you have", "x1": 100, "x2": 1, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Dmg", "skillIndex": 30}')),
            new Talent(JSON.parse('{"name": "Skillage Damage", "description": "+{% DMG for every 5 levels of your lowest LV Skill", "x1": 50, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Dmg", "skillIndex": 31}')),
            new Talent(JSON.parse('{"name": "Printer Go Brrr", "description": "Print { Hours of printer samples instantly. }% chance to have no cooldown!", "x1": 1, "x2": 40, "funcX": "intervalAdd", "y1": 95, "y2": 60, "funcY": "decay", "lvlUpText": "{ Hours & +}% No Cd Chance", "skillIndex": 32}')),
            new Talent(JSON.parse('{"name": "Triple Jab", "description": "Punches now hit a 3rd time for {% dmg. The other hits do +}% more Dmg", "x1": 20, "x2": 4, "funcX": "intervalAdd", "y1": 0.5, "y2": 0, "funcY": "add", "lvlUpText": "+{% 3Rd Dmg & +} Other Dmg", "skillIndex": 33}')),
            new Talent(JSON.parse('{"name": "One Step Ahead", "description": "Check-Mate!", "x1": 1, "x2": 1, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "Pawn To B{", "skillIndex": 34}')),
            new Talent(JSON.parse('{"name": "Lucky Charms", "description": "LUK\'s effect on Class EXP Gain is increased by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Effect", "skillIndex": 35}')),
            new Talent(JSON.parse('{"name": "Clever Clover Obols", "description": "Obols give +{% more LUK than what\'s listed", "x1": 60, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Luk From Obols", "skillIndex": 36}')),
            new Talent(JSON.parse('{"name": "Skilliest Statue", "description": "\'EhExPee\', \'Kapow\', and \'Feasty\' statues give {% higher bonuses", "x1": 100, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Higher Bonuses", "skillIndex": 37}')),
            new Talent(JSON.parse('{"name": "Bliss N Chips", "description": "+{ Max LV to \'Happy Dude\', and +} Max LV to Lucky Horseshoe", "x1": 2, "x2": 0, "funcX": "add", "y1": 1, "y2": 0, "funcY": "add", "lvlUpText": "+{ Max Lv & +} Max Lv", "skillIndex": 38}')),
            new Talent(JSON.parse('{"name": "Colloquial Containers", "description": "Each Lv of \'Lotto Skills\' Bubble raises max Lv of \'Sleepin On The Job\' Talent, up to +{", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv For Sleep On Job", "skillIndex": 39}')),
            new Talent(JSON.parse('{"name": "Maestro Transfusion", "description": "+{% Skill EXP Gain, and -}% Skill Efficiency. Affects all Skills.", "x1": 2.5, "x2": 0, "funcX": "add", "y1": 140, "y2": 100, "funcY": "decay", "lvlUpText": "+{% Exp Gain & -}% Efficiency", "skillIndex": 40}')),
            new Talent(JSON.parse('{"name": "Crystal Countdown", "description": "Killing a Crystal or Giant lowers REQ Exp of a random skill by 2%. Stacks up to {%.", "x1": 100, "x2": 100, "funcX": "decay", "y1": 10, "y2": 1, "funcY": "add", "lvlUpText": "+{% Max Exp Reduction", "skillIndex": 41}')),
            new Talent(JSON.parse('{"name": "Left Hand Of Learning", "description": "+{% Skill EXP Gain for your other characters, if their Skill LV is lower than Maestro\'s.", "x1": 200, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Skill Exp To Family", "skillIndex": 42}')),
            new Talent(JSON.parse('{"name": "Right Hand Of Action", "description": "+{% Skill Efficiency for your other characters, if their Skill LV is lower than Maestro\'s.", "x1": 150, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Skill Eff To Family", "skillIndex": 43}')),
            new Talent(JSON.parse('{"name": "Jman Was Better", "description": "+{ Talent Points for the \'Journeyman\' tab. Maestro not worth the wait, eh?", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Journeyman Point", "skillIndex": 44}')),
        ]
        case "Virtuoso": return [];
        case "Infinilyte": return [];
        case "Rage Basics": return [
            new Talent(JSON.parse('{"name": "Health Booster", "description": "Increases Max HP by {", "x1": 1, "x2": 0.15, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Hp", "skillIndex": 0}')),
            new Talent(JSON.parse('{"name": "Mana Booster", "description": "Increases Max MP by {", "x1": 1, "x2": 0.1, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Mp", "skillIndex": 1}')),
            new Talent(JSON.parse('{"name": "Star Player", "description": "Gives { Star Talent Points. Star Talents are found throughout the game!", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Star Talent Point", "skillIndex": 8}')),
            new Talent(JSON.parse('{"name": "Bucklered Up", "description": "Increases Total Defense by +{%", "x1": 40, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{% Total Def", "skillIndex": 9}')),
            new Talent(JSON.parse('{"name": "Sharpened Axe", "description": "Increases Base Weapon Power by {. This contributes to your total damage.", "x1": 0.25, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{ Base Weapon Power", "skillIndex": 5}')),
            new Talent(JSON.parse('{"name": "Fist Of Rage", "description": "Increases your Base STR by { (STR boosts Max HP and Crit Damage)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Str", "skillIndex": 10}')),
            new Talent(JSON.parse('{"name": "Quickness Boots", "description": "Increases your Base AGI by { (AGI boosts Movement Speed and Crit Chance)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Agi", "skillIndex": 11}')),
            new Talent(JSON.parse('{"name": "Book Of The Wise", "description": "Increases your Base WIS by { (WIS boosts Mana and Boss Damage)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Wis", "skillIndex": 12}')),
            new Talent(JSON.parse('{"name": "Lucky Clover", "description": "Increases your Base LUK by { (LUK boosts drop rate, EXP Gain, and other RNG)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Luk", "skillIndex": 13}')),
            new Talent(JSON.parse('{"name": "Gilded Sword", "description": "Boosts Damage dealt to all monsters by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{% Damage", "skillIndex": 6}')),
            new Talent(JSON.parse('{"name": "Brute Efficiency", "description": "Increases the total efficiency of all specialized skills by {%", "x1": 1, "x2": 0.02, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Efficiency", "skillIndex": 85}')),
            new Talent(JSON.parse('{"name": "Meat Shank", "description": "Damage dealt is increased by {% for every power of 10 Max HP you have", "x1": 100, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 86}')),
            new Talent(JSON.parse('{"name": "Critikill", "description": "Increases Critical Hit Damage by {%", "x1": 52, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Critical Damage", "skillIndex": 87}')),
            new Talent(JSON.parse('{"name": "Idle Brawling", "description": "AFK Gains Rate for Fighting is increased by {%", "x1": 20, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Afk Gains Rate", "skillIndex": 88}')),
            new Talent(JSON.parse('{"name": "Idle Skilling", "description": "AFK Gains Rate for all Specialized Skills is increased by {%", "x1": 20, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Afk Gains Rate", "skillIndex": 89}')),
        ];
        case "Warrior": return [
            new Talent(JSON.parse('{"name": "Power Strike", "description": "Slash forward dealing {% damage to up to 3 monsters", "x1": 130, "x2": 3, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 90}')),
            new Talent(JSON.parse('{"name": "Whirl", "description": "Swing your weapon around you dealing {% damage to up to } monsters", "x1": 60, "x2": 1.5, "funcX": "bigBase", "y1": 4, "y2": 24, "funcY": "intervalAdd", "lvlUpText": "+{% Damage & +} Mobs Hit", "skillIndex": 91}')),
            new Talent(JSON.parse('{"name": "Health Overdrive", "description": "Increase max HP by {%", "x1": 0.5, "x2": 0.02, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Hp", "skillIndex": 92}')),
            new Talent(JSON.parse('{"name": "Double Strike", "description": "Basic Attacks with Warrior Weapons have a {% chance to hit twice", "x1": 110, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "{% Double Hit Chance", "skillIndex": 93}')),
            new Talent(JSON.parse('{"name": "Firmly Grasp It", "description": "Temporarily boosts base STR by { for } minutes", "x1": 15, "x2": 1, "funcX": "bigBase", "y1": 2, "y2": 4, "funcY": "intervalAdd", "lvlUpText": "+{ Str & +} Mins", "skillIndex": 94}')),
            new Talent(JSON.parse('{"name": "Strength In Numbers", "description": "STR\'s effect on both Damage and HP is increased by {%", "x1": 0.75, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Effect", "skillIndex": 95}')),
            new Talent(JSON.parse('{"name": "\'Str\'Ess Tested Garb", "description": "All Equipment gives {% more STR than what\'s listed", "x1": 200, "x2": 250, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Str From Equips", "skillIndex": 96}')),
            new Talent(JSON.parse('{"name": "Carry A Big Stick", "description": "The effect Weapon Power has on Damage Dealt is increased by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Weapon Power Effect", "skillIndex": 97}')),
            new Talent(JSON.parse('{"name": "Absolute Unit", "description": "+{ base STR", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Str", "skillIndex": 98}')),
            new Talent(JSON.parse('{"name": "Haungry For Gold", "description": "Golden Food bonuses are increased by {%", "x1": 55, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Bonus", "skillIndex": 99}')),
            new Talent(JSON.parse('{"name": "Big Pick", "description": "Swings forward and mines the rock with +{% bonus Mining Efficiency", "x1": 150, "x2": 15, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Efficiency", "skillIndex": 100}')),
            new Talent(JSON.parse('{"name": "Copper Collector", "description": "Mining Efficiency is increased by +{% for every power of 10 Copper Ore in Storage Chest.", "x1": 20, "x2": 70, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Efficiency", "skillIndex": 101}')),
            new Talent(JSON.parse('{"name": "Motherlode Miner", "description": "+{% base multi-ore drop chance. This can trigger up to 4 times in a row per swing.", "x1": 20, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Multi-Ore Base Chance", "skillIndex": 102}')),
            new Talent(JSON.parse('{"name": "Tool Proficiency", "description": "Pickaxes give +{% more Mining Power than whats listed for every 10 Mining Lv you have", "x1": 16, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Pow Per 10 Mining Lv", "skillIndex": 103}')),
            new Talent(JSON.parse('{"name": "Tempestuous Emotions", "description": "Increases Exp Gain for all Specialized Skills by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Exp Gain", "skillIndex": 104}')),
        ];
        case "Barbarian": return [
            new Talent(JSON.parse('{"name": "Bear Swipe", "description": "A big ol\' bear claw swipes up to { monsters in front of you, dealing }% damage", "x1": 3, "x2": 30, "funcX": "intervalAdd", "y1": 108, "y2": 2, "funcY": "bigBase", "lvlUpText": "+{ Mobs & +}% Dmg", "skillIndex": 105}')),
            new Talent(JSON.parse('{"name": "Axe Hurl", "description": "Throws axe in a downward arc, which deals {% dmg to up to } monsters.", "x1": 200, "x2": 3, "funcX": "bigBase", "y1": 2, "y2": 50, "funcY": "intervalAdd", "lvlUpText": "+{% Dmg & +} Mobs", "skillIndex": 106}')),
            new Talent(JSON.parse('{"name": "Mocking Shout", "description": "Every 0.5 sec, monsters move toward you and heal for {% HP. Lasts for } seconds", "x1": 1, "x2": 0, "funcX": "add", "y1": 20, "y2": 0.2, "funcY": "bigBase", "lvlUpText": "+1% Heal, +} Sec", "skillIndex": 107}')),
            new Talent(JSON.parse('{"name": "No Pain No Gain", "description": "Reduces max HP by {%, increases damage by }%. Also, you take double damage.", "x1": 100, "x2": 30, "funcX": "decay", "y1": 100, "y2": 50, "funcY": "decay", "lvlUpText": "-{% Hp & +}% Damage", "skillIndex": 108}')),
            new Talent(JSON.parse('{"name": "Monster Decimator", "description": "There is a {% chance for a monster kill to be counted for double for opening new portals.", "x1": 100, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Double Count Chance", "skillIndex": 109}')),
            new Talent(JSON.parse('{"name": "Apocalypse Zow", "description": "+{% Dmg for every monster you kill over 100,000 times. Counts } monster types", "x1": 2, "x2": 33, "funcX": "intervalAdd", "y1": 1, "y2": 0, "funcY": "add", "lvlUpText": "+{% Dmg & +1 Mob Type", "skillIndex": 110}')),
            new Talent(JSON.parse('{"name": "Fistful Of Obol", "description": "Obols give +{% more STR than what\'s listed", "x1": 60, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Str From Obols", "skillIndex": 111}')),
            new Talent(JSON.parse('{"name": "Strongest Statues", "description": "\'Power\', \'Mining\', and \'Oceanman\' statues give {% higher bonuses", "x1": 100, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Higher Bonuses", "skillIndex": 112}')),
            new Talent(JSON.parse('{"name": "Str Summore", "description": "+{ Max Talent Level for \'Fist of Rage\'", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv", "skillIndex": 81}')),
            new Talent(JSON.parse('{"name": "Beefy Bottles", "description": "Each Lv of \'Warriors Only\' Bubble raises max Lv of \'CritiKill\' Talent, up to +{", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv For Critikill Talent", "skillIndex": 114}')),
            new Talent(JSON.parse('{"name": "Worming Undercover", "description": "{% chance", "x1": -1, "x2": -1, "funcX": "9.3", "y1": 0.7, "y2": -1, "funcY": "_", "lvlUpText": "", "skillIndex": 115}')),
            new Talent(JSON.parse('{"name": "Bobbin\' Bobbers", "description": "+{% Minigame reward, and +1 Fishing Power per pt of your Highscore, up to +}", "x1": 12, "x2": 3, "funcX": "bigBase", "y1": 5, "y2": 3, "funcY": "intervalAdd", "lvlUpText": "+{% Reward & +} Cap", "skillIndex": 116}')),
            new Talent(JSON.parse('{"name": "All Fish Diet", "description": "+{% Fishing EXP, since like, fish is brain food and so it makes sense that... eh forget it.", "x1": 1.5, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1.5% Fishing Exp", "skillIndex": 117}')),
            new Talent(JSON.parse('{"name": "Catching Some Zzz\'S", "description": "+{% Away Gains for Fishing only. Just fishing. It totally doesn\'t boost anything else!", "x1": 20, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Fishing Away Gains", "skillIndex": 118}')),
            new Talent(JSON.parse('{"name": "Back To Basics", "description": "+{ Talent Points for the \'Warrior\' talent tab, and +10 dmg to these Talents\' feelings!", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Talent Pt", "skillIndex": 119}')),
        ];
        case "Squire": return [
            new Talent(JSON.parse('{"name": "Shockwave Slash", "description": "Slash forward, causing a shockwave which deals {% dmg to up to } enemies", "x1": 175, "x2": 2, "funcX": "bigBase", "y1": 3, "y2": 30, "funcY": "intervalAdd", "lvlUpText": "+{% Dmg & +} Mobs Hit", "skillIndex": 120}')),
            new Talent(JSON.parse('{"name": "Daggerang", "description": "Throw a dagger which comes right back to you, dealing {% Dmg to up to } mobs", "x1": 200, "x2": 1.5, "funcX": "bigBase", "y1": 4, "y2": 30, "funcY": "intervalAdd", "lvlUpText": "+{% Dmg & +} Mobs Hit", "skillIndex": 121}')),
            new Talent(JSON.parse('{"name": "Bricky Skin", "description": "Block {% of all damage. Also, passively gives +} base DEF at all times, even when not in use!", "x1": 20, "x2": 0.4, "funcX": "bigBase", "y1": 1, "y2": 3, "funcY": "intervalAdd", "lvlUpText": "+{% Block, +} Base Def", "skillIndex": 122}')),
            new Talent(JSON.parse('{"name": "Mastery Up", "description": "+{% Mastery. This affects how big your minimum damage is compared to max damage!", "x1": 18, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Mastery", "skillIndex": 123}')),
            new Talent(JSON.parse('{"name": "Balanced Spirit", "description": "Boosts Accuracy and DEF by +{%, but lowers damage by -}%", "x1": 25, "x2": 50, "funcX": "decay", "y1": 39, "y2": 40, "funcY": "decay", "lvlUpText": "+{% Acc/Def, -}% Dmg", "skillIndex": 124}')),
            new Talent(JSON.parse('{"name": "Precision Power", "description": "+{% Dmg per Refinery Rank if accuracy is 1.5x higher than needed for 100% hit chance", "x1": 11, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Dmg If Acc Big", "skillIndex": 125}')),
            new Talent(JSON.parse('{"name": "Fistful Of Obol", "description": "Obols give +{% more STR than what\'s listed", "x1": 60, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Str From Obols", "skillIndex": 111}')),
            new Talent(JSON.parse('{"name": "Shieldiest Statues", "description": "\'Power\', \'Mining\', and \'Defence\' statues give {% higher bonuses", "x1": 100, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Higher Bonuses", "skillIndex": 127}')),
            new Talent(JSON.parse('{"name": "Str Summore", "description": "+{ Max Talent Level for \'Fist of Rage\'", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv", "skillIndex": 81}')),
            new Talent(JSON.parse('{"name": "Blocky Bottles", "description": "Each Lv of \'Warriors Only\' Bubble raises max Lv of \'Meat Shank\' Talent, up to +{", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv For Meat Shank", "skillIndex": 129}')),
            new Talent(JSON.parse('{"name": "Refinery Throttle", "description": "Automatically trigger { Refinery Cycles. Still costs materials, though.", "x1": 3, "x2": 8, "funcX": "intervalAdd", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Cycle Every 8 Lvs", "skillIndex": 130}')),
            new Talent(JSON.parse('{"name": "Redox Rates", "description": "+{% Build Speed per power of 10 Redox Salts in your Storage Chest", "x1": 40, "x2": 70, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Build Spd", "skillIndex": 131}')),
            new Talent(JSON.parse('{"name": "Sharper Saws", "description": "+{% Construction EXP gain. More like Cogstruction am I right fellas?", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Construction Exp", "skillIndex": 132}')),
            new Talent(JSON.parse('{"name": "Super Samples", "description": "+{% Sample Size when taking Samples for the 3d printer.", "x1": 9, "x2": 75, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Sample Size", "skillIndex": 133}')),
            new Talent(JSON.parse('{"name": "Back To Basics", "description": "+{ Talent Points for the \'Warrior\' talent tab, and +10 dmg to these Talents\' feelings!", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Talent Pt", "skillIndex": 119}')),
        ];
        case "Blood Berserker": return [];
        case "Death Bringer": return [];
        case "Divine Knight": return [];
        case "Royal Guardian": return [];
        case "Filler": return [];
        case "Calm Basics": return [
            new Talent(JSON.parse('{"name": "Health Booster", "description": "Increases Max HP by {", "x1": 1, "x2": 0.15, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Hp", "skillIndex": 0}')),
            new Talent(JSON.parse('{"name": "Mana Booster", "description": "Increases Max MP by {", "x1": 1, "x2": 0.1, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Mp", "skillIndex": 1}')),
            new Talent(JSON.parse('{"name": "Star Player", "description": "Gives { Star Talent Points. Star Talents are found throughout the game!", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Star Talent Point", "skillIndex": 8}')),
            new Talent(JSON.parse('{"name": "Bucklered Up", "description": "Increases Total Defense by +{%", "x1": 40, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{% Total Def", "skillIndex": 9}')),
            new Talent(JSON.parse('{"name": "Sharpened Axe", "description": "Increases Base Weapon Power by {. This contributes to your total damage.", "x1": 0.25, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{ Base Weapon Power", "skillIndex": 5}')),
            new Talent(JSON.parse('{"name": "Fist Of Rage", "description": "Increases your Base STR by { (STR boosts Max HP and Crit Damage)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Str", "skillIndex": 10}')),
            new Talent(JSON.parse('{"name": "Quickness Boots", "description": "Increases your Base AGI by { (AGI boosts Movement Speed and Crit Chance)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Agi", "skillIndex": 11}')),
            new Talent(JSON.parse('{"name": "Book Of The Wise", "description": "Increases your Base WIS by { (WIS boosts Mana and Boss Damage)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Wis", "skillIndex": 12}')),
            new Talent(JSON.parse('{"name": "Lucky Clover", "description": "Increases your Base LUK by { (LUK boosts drop rate, EXP Gain, and other RNG)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Luk", "skillIndex": 13}')),
            new Talent(JSON.parse('{"name": "Gilded Sword", "description": "Boosts Damage dealt to all monsters by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{% Damage", "skillIndex": 6}')),
            new Talent(JSON.parse('{"name": "Elusive Efficiency", "description": "Increases the total efficiency of all specialized skills by {%", "x1": 1, "x2": 0.02, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Efficiency", "skillIndex": 263}')),
            new Talent(JSON.parse('{"name": "Featherweight", "description": "Increases Movement Speed by {% so you can outrun those slowpoke Warriors and Mages", "x1": 25, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Move Speed", "skillIndex": 266}')),
            new Talent(JSON.parse('{"name": "I See You", "description": "Increases Critical Hit Chance by {%", "x1": 27, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Crit Chance", "skillIndex": 267}')),
            new Talent(JSON.parse('{"name": "Idle Shooting", "description": "AFK Gains Rate for Fighting is increased by {%", "x1": 20, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Afk Gains Rate", "skillIndex": 268}')),
            new Talent(JSON.parse('{"name": "Broken Time", "description": "Production Speed in all Town Skills is increased by {%", "x1": 100, "x2": 75, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Production Speed", "skillIndex": 269}')),
        ];
        case "Archer": return [
            new Talent(JSON.parse('{"name": "Piercing Arrow", "description": "Shoots an arrow that deals {% damage to up to } monsters", "x1": 110, "x2": 2, "funcX": "bigBase", "y1": 2, "y2": 40, "funcY": "intervalAdd", "lvlUpText": "+{% Damage & +} Mobs Hit", "skillIndex": 270}')),
            new Talent(JSON.parse('{"name": "Kung Fu Kick", "description": "Pushes back nearby monsters by { pixels while dealing }% damage", "x1": 25, "x2": 1, "funcX": "bigBase", "y1": 60, "y2": 2, "funcY": "bigBase", "lvlUpText": "+{ Pixels & +}% Dmg", "skillIndex": 271}')),
            new Talent(JSON.parse('{"name": "Hema Overdrive", "description": "Increase max HP and max MP by {%", "x1": 0.4, "x2": 0.01, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Hp And Mp", "skillIndex": 272}')),
            new Talent(JSON.parse('{"name": "Strafe", "description": "Temporarily boosts Movement Speed by {% for } minutes", "x1": 5, "x2": 0.3, "funcX": "bigBase", "y1": 2, "y2": 15, "funcY": "intervalAdd", "lvlUpText": "+{% Speed % +} Mins", "skillIndex": 273}')),
            new Talent(JSON.parse('{"name": "Have Another!", "description": "Basic Attacks have a {% chance to fire 1 additional arrow", "x1": 120, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Chance", "skillIndex": 274}')),
            new Talent(JSON.parse('{"name": "Veins Of The Infernal", "description": "Increases Damage Dealt by {% every 10 Smithing Levels", "x1": 50, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 284}')),
            new Talent(JSON.parse('{"name": "Garb Of Un\'Agi\'Ng Quality", "description": "All Equipment gives {% more AGI than what\'s listed", "x1": 1.5, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Agi From Equips", "skillIndex": 276}')),
            new Talent(JSON.parse('{"name": "High Polymer Limbs", "description": "The effect Weapon Power has on Damage Dealt is increased by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Weapon Power Effect", "skillIndex": 277}')),
            new Talent(JSON.parse('{"name": "Sanic Speed", "description": "+{ base AGI", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Agi", "skillIndex": 278}')),
            new Talent(JSON.parse('{"name": "Robbinghood", "description": "Monster drop rarity increased by {%", "x1": 40, "x2": 65, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Rarity", "skillIndex": 279}')),
            new Talent(JSON.parse('{"name": "Smeltin\' Erryday", "description": "Every kill has a {% chance to give } seconds of instant forge progress", "x1": 50, "x2": 80, "funcX": "decay", "y1": 1, "y2": 60, "funcY": "intervalAdd", "lvlUpText": "+{% For } Forge Secs", "skillIndex": 280}')),
            new Talent(JSON.parse('{"name": "Acme Anvil", "description": "Get 1 Anvil Production Point, and also gain +{ extra pts every 10 Smithing Lvs", "x1": 1, "x2": 15, "funcX": "intervalAdd", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Extra Pts", "skillIndex": 281}')),
            new Talent(JSON.parse('{"name": "Yea I Already Know", "description": "Start with {% exp per 250 AGI when you lv up any Specialized Skill. Caps at }%.", "x1": 5, "x2": 90, "funcX": "decay", "y1": 5, "y2": 10, "funcY": "intervalAdd", "lvlUpText": "+{% Exp, And +}% Cap", "skillIndex": 282}')),
            new Talent(JSON.parse('{"name": "Godly Creation", "description": "{% chance to apply a special bonus to any equip crafted at the anvil.", "x1": 50, "x2": 75, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Chance", "skillIndex": 283}')),
            new Talent(JSON.parse('{"name": "Focused Soul", "description": "EXP Gain for all Specialized Skills is increased by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Exp Gain In Spec Skills", "skillIndex": 265}')),
        ];
        case "Bowman": return [
            new Talent(JSON.parse('{"name": "Homing Arrows", "description": "Fires { arrows into the air, which seek out nearby monsters and deal }% damage", "x1": 2, "x2": 15, "funcX": "intervalAdd", "y1": 27, "y2": 3, "funcY": "bigBase", "lvlUpText": "+{ Arrow & +}% Damage", "skillIndex": 285}')),
            new Talent(JSON.parse('{"name": "Magic Shortbow", "description": "Magic shortbows fire at your target, and up to { nearby monsters, for }% damage", "x1": 2, "x2": 20, "funcX": "intervalAdd", "y1": 47, "y2": 3, "funcY": "bigBase", "lvlUpText": "+{ Monsters & +}% Dmg", "skillIndex": 286}')),
            new Talent(JSON.parse('{"name": "Flax Instastring", "description": "Basic attacks have a {% chance to spawn a Magic Shortbow.", "x1": 40, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Trigger Chance", "skillIndex": 287}')),
            new Talent(JSON.parse('{"name": "Extendo Rangeo", "description": "Attack range is increased by +{ Pixels, and +}% accuracy, for a few minutes", "x1": 19.5, "x2": 0.5, "funcX": "bigBase", "y1": 40, "y2": 60, "funcY": "decay", "lvlUpText": "+{Px Range & +} Mins", "skillIndex": 288}')),
            new Talent(JSON.parse('{"name": "Woah, That Was Fast!", "description": "All attack talent cooldowns are {% lower. No, not regular attacks lol", "x1": 30, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Lower Cooldowns", "skillIndex": 289}')),
            new Talent(JSON.parse('{"name": "Speedna", "description": "+{% Damage for every 15% movement spd you have above 100%", "x1": 60, "x2": 77, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 290}')),
            new Talent(JSON.parse('{"name": "Shoeful Of Obol", "description": "Obols give +{% more AGI than what is listed", "x1": 135, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Agi", "skillIndex": 291}')),
            new Talent(JSON.parse('{"name": "Shwifty Statues", "description": "\'Speed\', \'Anvil\', and \'Ol Reliable\' statues give +{% more bonus", "x1": 100, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Higher Bonuses", "skillIndex": 292}')),
            new Talent(JSON.parse('{"name": "Agi Again", "description": "+{ Max Talent Level for \'Quickness Boots\'", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv", "skillIndex": 293}')),
            new Talent(JSON.parse('{"name": "Velocity Vessels", "description": "Each Lv of \'Archer or Bust\' Bubble raises max Lv of \'Featherweight\', up to +{", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv Cap", "skillIndex": 294}')),
            new Talent(JSON.parse('{"name": "Teleki\'Net\'Ic Logs", "description": "+{% Catching Efficiency for every power of 10 Oak Logs in the storage chest", "x1": 20, "x2": 70, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Efficiency", "skillIndex": 295}')),
            new Talent(JSON.parse('{"name": "Briar Patch Runner", "description": "AGI has a +{% larger effect on Catching Efficiency than normal", "x1": 0.5, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Effect", "skillIndex": 296}')),
            new Talent(JSON.parse('{"name": "Bug Enthusiast", "description": "+{% Catching EXP. You\'re one step closer to figuring out how butter can fly!", "x1": 1.5, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Catching Exp", "skillIndex": 297}')),
            new Talent(JSON.parse('{"name": "Sunset On The Hives", "description": "+{% Away Gain for Catching Hint:Useful for when you idle on catching!", "x1": 20, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Away Gains", "skillIndex": 298}')),
            new Talent(JSON.parse('{"name": "Previous Points", "description": "+{ Talent Points for the \'Archer\' talent tab. But,what\'s wrong with these talents?", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Talent Pt", "skillIndex": 299}')),
        ];
        case "Hunter": return [
            new Talent(JSON.parse('{"name": "360 Noscope", "description": "Deal {% DMG split between all hit monsters. The more mobs hit, the less dmg done", "x1": 225, "x2": 3, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 300}')),
            new Talent(JSON.parse('{"name": "Bear Trap", "description": "Lay down { bear traps that deal }% dmg when a monster triggers it", "x1": 2, "x2": 30, "funcX": "intervalAdd", "y1": 150, "y2": 2, "funcY": "bigBase", "lvlUpText": "+{ Traps & +}% Dmg", "skillIndex": 301}')),
            new Talent(JSON.parse('{"name": "Uwu Rawrrr", "description": "When mobs die, their respawn time is { seconds faster!", "x1": 55, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Seconds Faster", "skillIndex": 302}')),
            new Talent(JSON.parse('{"name": "Stop Right There", "description": "Immobilizes monsters within a { pixel radius of you for } seconds.", "x1": 150, "x2": 1.5, "funcX": "bigBase", "y1": 4, "y2": 20, "funcY": "intervalAdd", "lvlUpText": "+{ Pixels & +} Sec", "skillIndex": 303}')),
            new Talent(JSON.parse('{"name": "Have Another... Again!", "description": "Basic Attacks have a {% chance to fire 1 more arrow. Stacks with \'Have Another!\'", "x1": 120, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Chance", "skillIndex": 304}')),
            new Talent(JSON.parse('{"name": "Looty Mc Shooty", "description": "+{% Damage for every 50 items you\'ve ever found on any of your players.", "x1": 36, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 305}')),
            new Talent(JSON.parse('{"name": "Shoeful Of Obol", "description": "Obols give +{% more AGI than what is listed", "x1": 135, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Agi", "skillIndex": 291}')),
            new Talent(JSON.parse('{"name": "Straightshot Statues", "description": "\'Speed\', \'Anvil\', and \'Bullseye\' statues give +{% more bonus", "x1": 100, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Higher Bonuses", "skillIndex": 307}')),
            new Talent(JSON.parse('{"name": "Agi Again", "description": "+{ Max Talent Level for \'Quickness Boots\'", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv", "skillIndex": 293}')),
            new Talent(JSON.parse('{"name": "Visibility Vessels", "description": "Each Lv of \'Archer or Bust\' Bubble raises max Lv of \'I See You\', up to +{", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv For Icu", "skillIndex": 309}')),
            new Talent(JSON.parse('{"name": "Eagle Eye", "description": "Collect & set all traps, but only get {% critters. }% Exp is given to each player.", "x1": 140, "x2": 100, "funcX": "decay", "y1": 130, "y2": 100, "funcY": "decay", "lvlUpText": "+{% Critters & +}% Xp", "skillIndex": 310}')),
            new Talent(JSON.parse('{"name": "Invasive Species", "description": "+{% Trapping Efficiency per power of 10 Froge Critters in Storage", "x1": 30, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Trap Efficiency", "skillIndex": 311}')),
            new Talent(JSON.parse('{"name": "Shroom Bait", "description": "+{% Trapping Exp Gain. Doesn\'t affect EXP given to other players when in Eagle Eye.", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Trapping Exp", "skillIndex": 312}')),
            new Talent(JSON.parse('{"name": "Reflective Eyesight", "description": "{x Shiny Critter chance. Triggers again every 10 Trapping LVs", "x1": 2, "x2": 100, "funcX": "decayMulti", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{X Shiny Chance", "skillIndex": 313}')),
            new Talent(JSON.parse('{"name": "Previous Points", "description": "+{ Talent Points for the \'Archer\' talent tab. But,what\'s wrong with these talents?", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Talent Pt", "skillIndex": 299}')),
        ];
        case "Siege Breaker": return [
            new Talent(JSON.parse('{"name": "Ballista", "description": "Ballista bitch", "x1": 400, "x2": 25, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "", "skillIndex": 315}')),
        ];
        case "Mayheim": return [];
        case "Wind Walker": return [];
        case "Beast Master": return [];
        case "Savvy Basics": return [
            new Talent(JSON.parse('{"name": "Health Booster", "description": "Increases Max HP by {", "x1": 1, "x2": 0.15, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Hp", "skillIndex": 0}')),
            new Talent(JSON.parse('{"name": "Mana Booster", "description": "Increases Max MP by {", "x1": 1, "x2": 0.1, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Mp", "skillIndex": 1}')),
            new Talent(JSON.parse('{"name": "Star Player", "description": "Gives { Star Talent Points. Star Talents are found throughout the game!", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Star Talent Point", "skillIndex": 8}')),
            new Talent(JSON.parse('{"name": "Bucklered Up", "description": "Increases Total Defense by +{%", "x1": 40, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{% Total Def", "skillIndex": 9}')),
            new Talent(JSON.parse('{"name": "Sharpened Axe", "description": "Increases Base Weapon Power by {. This contributes to your total damage.", "x1": 0.25, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{ Base Weapon Power", "skillIndex": 5}')),
            new Talent(JSON.parse('{"name": "Fist Of Rage", "description": "Increases your Base STR by { (STR boosts Max HP and Crit Damage)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Str", "skillIndex": 10}')),
            new Talent(JSON.parse('{"name": "Quickness Boots", "description": "Increases your Base AGI by { (AGI boosts Movement Speed and Crit Chance)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Agi", "skillIndex": 11}')),
            new Talent(JSON.parse('{"name": "Book Of The Wise", "description": "Increases your Base WIS by { (WIS boosts Mana and Boss Damage)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Wis", "skillIndex": 12}')),
            new Talent(JSON.parse('{"name": "Lucky Clover", "description": "Increases your Base LUK by { (LUK boosts drop rate, EXP Gain, and other RNG)", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Luk", "skillIndex": 13}')),
            new Talent(JSON.parse('{"name": "Gilded Sword", "description": "Boosts Damage dealt to all monsters by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "_", "lvlUpText": "+{% Damage", "skillIndex": 6}')),
            new Talent(JSON.parse('{"name": "Smart Efficiency", "description": "Increases the total efficiency of all specialized skills by {%", "x1": 1, "x2": 0.02, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Efficiency", "skillIndex": 445}')),
            new Talent(JSON.parse('{"name": "Overclocked Energy", "description": "Damage dealt is increased by {% for every power of 10 Max MP you have", "x1": 150, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 446}')),
            new Talent(JSON.parse('{"name": "Farsight", "description": "Increases Crit Chance by {% and Crit Dmg by }%", "x1": 17, "x2": 45, "funcX": "decay", "y1": 33, "y2": 45, "funcY": "decay", "lvlUpText": "+{% Chance, +}% Dmg", "skillIndex": 447}')),
            new Talent(JSON.parse('{"name": "Idle Casting", "description": "AFK Gains Rate for Fighting is increased by {%", "x1": 20, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Afk Gains Rate", "skillIndex": 448}')),
            new Talent(JSON.parse('{"name": "Active Afk\'Er", "description": "AFK Gains Rate for all Specialized Skills is increased by {%", "x1": 20, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Afk Gains Rate", "skillIndex": 449}')),
        ];
        case "Mage": return [
            new Talent(JSON.parse('{"name": "Energy Bolt", "description": "Your next basic attack strikes the Targeted Enemy for {% Damage", "x1": 160, "x2": 2, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 450}')),
            new Talent(JSON.parse('{"name": "Mini Fireball", "description": "Shoots a fireball that explodes on impact, dealing {% damage", "x1": 120, "x2": 1, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 451}')),
            new Talent(JSON.parse('{"name": "Mana Overdrive", "description": "Increase max MP by {%", "x1": 0.5, "x2": 0.02, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Mp", "skillIndex": 452}')),
            new Talent(JSON.parse('{"name": "Teleport", "description": "Move forward instantly by a distance of { Pixels", "x1": 25, "x2": 1, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Pixel Moved", "skillIndex": 453}')),
            new Talent(JSON.parse('{"name": "You\'Re Next", "description": "Basic attacks have a {% chance to Mark enemies, who then take }% more damage", "x1": 110, "x2": 70, "funcX": "decay", "y1": 25, "y2": 0.5, "funcY": "bigBase", "lvlUpText": "+{% Chance & +}% Dmg", "skillIndex": 454}')),
            new Talent(JSON.parse('{"name": "Knowledge Is Power", "description": "The effect your WIS stat has on Damage is increased by {%", "x1": 1.5, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Effect", "skillIndex": 455}')),
            new Talent(JSON.parse('{"name": "Unt\'Wis\'Ted Robes", "description": "All Equipment gives {% more WIS than what\'s listed", "x1": 1.5, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Wis From Equips", "skillIndex": 456}')),
            new Talent(JSON.parse('{"name": "Power Overwhelming", "description": "The effect Weapon Power has on Damage Dealt is increased by {%", "x1": 1.2, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Weapon Power Effect", "skillIndex": 457}')),
            new Talent(JSON.parse('{"name": "Free Meal", "description": "{% Chance for food to not be consumed when it otherwise would be", "x1": 53, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Non-Consume Chance", "skillIndex": 458}')),
            new Talent(JSON.parse('{"name": "Individual Insight", "description": "+{ base WIS", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Wis", "skillIndex": 459}')),
            new Talent(JSON.parse('{"name": "Log On Logs", "description": "For { Minutes, trees drop }% more Logs than normal", "x1": 2, "x2": 10, "funcX": "intervalAdd", "y1": 14, "y2": 1.86, "funcY": "bigBase", "lvlUpText": "+{ Mins & +}% More Logs", "skillIndex": 460}')),
            new Talent(JSON.parse('{"name": "Leaf Thief", "description": "{% Choppin Efficiency per power of 10 Grass Leaves in your Storage Chest.", "x1": 25, "x2": 70, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Efficiency", "skillIndex": 461}')),
            new Talent(JSON.parse('{"name": "Deforesting All Doubt", "description": "The effect your WIS stat has on Choppin Efficiency is increased by {%", "x1": 0.75, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Effect", "skillIndex": 462}')),
            new Talent(JSON.parse('{"name": "Inner Peace", "description": "Increases Exp Gain for all Specialized Skills by {%", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Exp Gain", "skillIndex": 464}')),
            new Talent(JSON.parse('{"name": "Choppin It Up Ez", "description": "+{% Minigame Rewards, and +}% Dmg per 25 Pts of your Minigame Highscore", "x1": 1, "x2": 0, "funcX": "add", "y1": 5.7, "y2": 50, "funcY": "decay", "lvlUpText": "+{% Rewards & +}% Dmg", "skillIndex": 463}')),
        ];
        case "Wizard": return [
            new Talent(JSON.parse('{"name": "Ice Shards", "description": "Your next basic attack deals {% dmg 3 times, and freezes all nearby mobs", "x1": 70, "x2": 1, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 465}')),
            new Talent(JSON.parse('{"name": "Floor Is Lava", "description": "Summon {x2 volcanos which erupt around you, dealing }% dmg", "x1": 1, "x2": 40, "funcX": "intervalAdd", "y1": 120, "y2": 1, "funcY": "bigBase", "lvlUpText": "+{ Volcano & +}% Dmg", "skillIndex": 466}')),
            new Talent(JSON.parse('{"name": "Tornado", "description": "Summon a tornado, which deals {% dmg and disappears after } seconds", "x1": 20, "x2": 0.3, "funcX": "bigBase", "y1": 4, "y2": 20, "funcY": "intervalAdd", "lvlUpText": "+{% Dmg & +} Sec", "skillIndex": 467}')),
            new Talent(JSON.parse('{"name": "Speedy Book", "description": "Getting 4@kills in 4@sec activates \'Speedy Book\' boosting attack rate by {% for } sec", "x1": 10, "x2": 0.2, "funcX": "bigBase", "y1": 3, "y2": 15, "funcY": "intervalAdd", "lvlUpText": "+{% Rate & } Sec", "skillIndex": 468}')),
            new Talent(JSON.parse('{"name": "Mana Is Life", "description": "{% of taken dmg is dealt to MP. Also passively boosts MP regen by +}%", "x1": 25, "x2": 0.35, "funcX": "bigBase", "y1": 15, "y2": 0.35, "funcY": "bigBase", "lvlUpText": "+{% Dmg & }% Mp Regen", "skillIndex": 469}')),
            new Talent(JSON.parse('{"name": "Paperwork, Great...", "description": "+{% Damage for every 10 Stamps in your collection. Oink Oink!", "x1": 70, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 470}')),
            new Talent(JSON.parse('{"name": "Occult Obols", "description": "Obols give +{% more WIS than what is listed", "x1": 135, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Wis", "skillIndex": 486}')),
            new Talent(JSON.parse('{"name": "Staring Statues", "description": "\'Exp\', \'Lumberbob\', and \'Beholder\' statues give +{% more bonus", "x1": 100, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Higher Bonuses", "skillIndex": 472}')),
            new Talent(JSON.parse('{"name": "Wis Wumbo", "description": "+{ Max Talent Level for \'Book of the Wise\'", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv", "skillIndex": 488}')),
            new Talent(JSON.parse('{"name": "Fuscia Flasks", "description": "Each Lv of \'Mage is Best\' Bubble raises max Lv of \'Overclocked Energy\', up to +{", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv Cap", "skillIndex": 474}')),
            new Talent(JSON.parse('{"name": "Charge Syphon", "description": "Steal charge from all your players, giving you {% of it. +}% Max Charge for 1 Min", "x1": 35, "x2": 0.3, "funcX": "bigBase", "y1": 100, "y2": 10, "funcY": "bigBase", "lvlUpText": "+{% Steal, +}% Temp Max", "skillIndex": 475}')),
            new Talent(JSON.parse('{"name": "Sooouls", "description": "+{% Worship Efficiency per power of 10 Forest Souls in your Storage Chest", "x1": 25, "x2": 70, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Worship Eff.", "skillIndex": 476}')),
            new Talent(JSON.parse('{"name": "Bless Up", "description": "+{% Worship EXP gain. Access the other totems faster!", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Worship Exp", "skillIndex": 477}')),
            new Talent(JSON.parse('{"name": "Nearby Outlet", "description": "{x Charge rate. You know, for Worship... No, not for your phone.", "x1": 1, "x2": 100, "funcX": "decayMulti", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{X Charge Rate", "skillIndex": 478}')),
            new Talent(JSON.parse('{"name": "Earlier Education", "description": "+{ Talent Points for the \'Mage\' talent tab. What, these talent\'s aint good \'nuff for ya?", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Talent Pt", "skillIndex": 494}')),
        ];
        case "Shaman": return [
            new Talent(JSON.parse('{"name": "Crazy Concoctions", "description": "Throws 1 of 4 potions, with a potency of {%", "x1": 17, "x2": 3, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Potency", "skillIndex": 480}')),
            new Talent(JSON.parse('{"name": "Auspicious Aura", "description": "Casts } aura which heals you and damages monsters. The strength of the aura is {%", "x1": 10, "x2": 3, "funcX": "bigBase", "y1": 1, "y2": 35, "funcY": "intervalAdd", "lvlUpText": "+{% Strength & +} Auras", "skillIndex": 481}')),
            new Talent(JSON.parse('{"name": "Sizzling Skull", "description": "Fire a skull which bounces around dealing {% dmg to up to } monsters", "x1": 125, "x2": 1, "funcX": "bigBase", "y1": 3, "y2": 20, "funcY": "intervalAdd", "lvlUpText": "+{% Dmg & +} More Mobs", "skillIndex": 482}')),
            new Talent(JSON.parse('{"name": "Tenteyecle", "description": "Killing a monster has a {% chance to reduce attack cooldowns by } seconds", "x1": 100, "x2": 100, "funcX": "decay", "y1": 2, "y2": 200, "funcY": "intervalAdd", "lvlUpText": "+{% Chance", "skillIndex": 483}')),
            new Talent(JSON.parse('{"name": "Instant Invincibility", "description": "When damaged, you will stay invincible for an additional +{ more seconds", "x1": 5, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ More Seconds", "skillIndex": 484}')),
            new Talent(JSON.parse('{"name": "Virile Vials", "description": "+{% damage dealt for every alchemy vial upgraded to at least Green LV", "x1": 12, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Damage", "skillIndex": 485}')),
            new Talent(JSON.parse('{"name": "Occult Obols", "description": "Obols give +{% more WIS than what is listed", "x1": 135, "x2": 80, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% More Wis", "skillIndex": 486}')),
            new Talent(JSON.parse('{"name": "Stupendous Statues", "description": "\'Exp\', \'Lumberbob\', and \'Cauldron\' statues give +{% more bonus", "x1": 100, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Higher Bonuses", "skillIndex": 487}')),
            new Talent(JSON.parse('{"name": "Wis Wumbo", "description": "+{ Max Talent Level for \'Book of the Wise\'", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv", "skillIndex": 488}')),
            new Talent(JSON.parse('{"name": "Fantasia Flasks", "description": "Each Lv of \'Mage is Best\' Bubble raises max Lv of \'Farsight\', up to +{", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Max Lv Cap", "skillIndex": 489}')),
            new Talent(JSON.parse('{"name": "Cranium Cooking", "description": "Killing a monster gives { seconds of instant alchemy progress. Lasts for } seconds", "x1": 40, "x2": 100, "funcX": "decay", "y1": 10, "y2": 2, "funcY": "intervalAdd", "lvlUpText": "+{ Progress & +} Time", "skillIndex": 490}')),
            new Talent(JSON.parse('{"name": "Busy Brewin\'", "description": "Boosts brew speed by +{% for this character.", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Brew Effect", "skillIndex": 491}')),
            new Talent(JSON.parse('{"name": "Bubble Breakthrough", "description": "+{% Alchemy EXP. Also, +}% odds of New Bubble when brewing on this player", "x1": 1, "x2": 0, "funcX": "add", "y1": 1, "y2": 0.02, "funcY": "add", "lvlUpText": "+{% Exp & +}% Chance", "skillIndex": 492}')),
            new Talent(JSON.parse('{"name": "Sharing Some Smarts", "description": "All characters in the same cauldron as this one gain +{% more Alch EXP.", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Alch Exp", "skillIndex": 493}')),
            new Talent(JSON.parse('{"name": "Earlier Education", "description": "+{ Talent Points for the \'Mage\' talent tab. What, these talent\'s aint good \'nuff for ya?", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+1 Talent Pt", "skillIndex": 494}')),
        ];
        case "Elemental Sorcerer": return [];
        case "Spiritual Monk": return [];
        case "Bubonic Conjuror": return [];
        case "Arcane Cultist": return [];
        case "Special Talent 1": return [
            new Talent(JSON.parse('{"name": "Bored To Death", "description": "Reduces the Respawn Timer to { sec. This will boost AFK Survival Percent!", "x1": 600, "x2": 2, "funcX": "reduce", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "{ Sec Respawn", "skillIndex": 615}')),
            new Talent(JSON.parse('{"name": "Beginner Best Class", "description": "+1 Base Weapon Power every 10 Lvs of your best Beginner. Caps at +{.", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Weapon Pow Cap", "skillIndex": 616}')),
            new Talent(JSON.parse('{"name": "Studious Quester", "description": "Quests give +{% more exp than normal", "x1": 120, "x2": 40, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Quest Exp", "skillIndex": 617}')),
            new Talent(JSON.parse('{"name": "Quest Chungus", "description": "Each Completed Quest gives +1 LUK. Total bonus caps at +{ LUK", "x1": 4, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ Luk Cap", "skillIndex": 618}')),
            new Talent(JSON.parse('{"name": "Crystals 4 Dayys", "description": "Crystal Monsters have a +{% chance to spawn", "x1": 174, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Spawn Rate", "skillIndex": 619}')),
            new Talent(JSON.parse('{"name": "Will Of The Eldest", "description": "+1 All Stats for every 10 Levels of your highest leveled character. Caps at +{.", "x1": 1, "x2": 0, "funcX": "add", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{ All Stat Cap", "skillIndex": 620}')),
            new Talent(JSON.parse('{"name": "Tick Tock", "description": "+{% Away Gains Rate for both Fighting and Skills", "x1": 8, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Away Gain Rate", "skillIndex": 621}')),
            new Talent(JSON.parse('{"name": "Stonks!", "description": "Gives { Special Talent Points.", "x1": 130, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "Even Stonkier!", "skillIndex": 622}')),
            new Talent(JSON.parse('{"name": "Roll Da Dice", "description": "Rolls a { sided dice. If it lands on a 1, you win a special Trophy!", "x1": 10000, "x2": 25, "funcX": "reduce", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "Dice Only Has { Sides", "skillIndex": 623}')),
            new Talent(JSON.parse('{"name": "Attacks On Simmer", "description": "Attack moves boost your AFK gains +{% more than they normally do", "x1": 40, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Attack Afk Effect", "skillIndex": 624}')),
            new Talent(JSON.parse('{"name": "Toilet Paper Postage", "description": "Stamps giving Skill Efficiency will give {x higher bonuses.", "x1": 0.7, "x2": 100, "funcX": "decayMulti", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{X Higher Bonus", "skillIndex": 625}')),
            new Talent(JSON.parse('{"name": "Exp Converter", "description": "{% of EXP earned in chosen Skill is turned to Class EXP. Assign to Attack to choose.", "x1": 150, "x2": 200, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Exp Converted", "skillIndex": 626}')),
            new Talent(JSON.parse('{"name": "Goblet Of Hemoglobin", "description": "Killing a monster heals you by {%. This also counts for AFK, helping Survivability!", "x1": 6, "x2": 66, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Hp Regen Per Kill", "skillIndex": 627}')),
        ];
        case "Special Talent 2": return [
            new Talent(JSON.parse('{"name": "Just Exp", "description": "+{% Class EXP", "x1": 10, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Class Exp", "skillIndex": 632}')),
            new Talent(JSON.parse('{"name": "Frothy Malk", "description": "Boost foods, like potions, give +{% higher bonuses than normal.", "x1": 50, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Boost Food Effect", "skillIndex": 631}')),
            new Talent(JSON.parse('{"name": "Convert Better, Darnit!", "description": "EXP Converter Talent gives {x more Class EXP every 5 LV of chosen skill", "x1": 1.7, "x2": 100, "funcX": "decayMulti", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{X More Class Exp", "skillIndex": 630}')),
            new Talent(JSON.parse('{"name": "Pulsation", "description": "The rate at which you gain mana used to cast Attacks is boosted by +{%", "x1": 75, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Mana Regen Rate", "skillIndex": 629}')),
            new Talent(JSON.parse('{"name": "Cardiovascular!", "description": "+{% additional card drop chance. It\'s multiplicative, so it always helps!", "x1": 60, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Card Drop Chance", "skillIndex": 628}')),
            new Talent(JSON.parse('{"name": "Milkyway Candies", "description": "{% chance to get a Time Candy if AFK 30+ hrs. Longer AFK boosts candy quality", "x1": 200, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Candy Drop", "skillIndex": 633}')),
            new Talent(JSON.parse('{"name": "Telekinetic Storage", "description": "Deposits your items to storage, and destroys items on ground. PASSIVE: +{% Carry Cap", "x1": 30, "x2": 60, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Carry Cap", "skillIndex": 634}')),
            new Talent(JSON.parse('{"name": "Printer Sampling", "description": "Cast to sample {% of your current AFK gains rate, which is used by the 3d Printer.", "x1": 10, "x2": 0.075, "funcX": "bigBase", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Afk Gains Sampled", "skillIndex": 635}')),
            new Talent(JSON.parse('{"name": "Supersource", "description": "+{ Base Efficiency for all Skills. Mining, Choppin, Fishing, everything!", "x1": 250, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "", "skillIndex": 636}')),
            new Talent(JSON.parse('{"name": "Action Frenzy", "description": "+{% Speed for all Skills. Zoom zoom! Isn\'t that what you zoomers are all about?", "x1": 60, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Skilling Speed", "skillIndex": 637}')),
            new Talent(JSON.parse('{"name": "Dungeonic Damage", "description": "+{% damage for every power of 10 Dungeon Credits you\'ve earned", "x1": 15, "x2": 100, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Dmg Per Pow 10 Creds", "skillIndex": 638}')),
            new Talent(JSON.parse('{"name": "Shrine Architect", "description": "Cast this talent to place shrines. You also charge them +{% faster", "x1": 50, "x2": 50, "funcX": "decay", "y1": 0, "y2": 0, "funcY": "txt", "lvlUpText": "+{% Charge Rate", "skillIndex": 639}')),
            new Talent(JSON.parse('{"name": "Mega Crit", "description": "+{% Crit chance. If over 100% crit chance, can Mega Crit for +}% more dmg.", "x1": 20, "x2": 100, "funcX": "decay", "y1": 200, "y2": 2, "funcY": "bigBase", "lvlUpText": "+{% Chance &+}% Dmg", "skillIndex": 640}')),
        ];
        case "Special Talent 3": return [];
        case "Special Talent 4": return [];
        case "Special Talent 5": return [];
        default: return [];
    }
};

