import { GroupBy, lavaFunc, range } from "../utility"
import { ImageData } from "./imageData"

export enum PassiveType {
    Dungeon = "Dungeon",
    Flurbo = "Flurbo"
}

export const dungeonLevels = "0 4 10 18 28 40 70 110 160 230 320 470 670 940 1310 1760 2400 3250 4000 5000 6160 8000 10000 12500 15000 18400 21000 25500 30500 36500 45400 52000 61000 72500 85000 110000 125000 145000 170000 200000 250000 275000 325000 400000 490000 600000 725000 875000 1000000 1200000 1500000 3000000 5000000 10000000 20000000 30000000 40000000 50000000 60000000 80000000 100000000 999999999 999999999 999999999 999999999 999999999 1999999999 1999999999 1999999999 1999999999 1999999999".split(" ")

// var xt = n._GenINFO[12]; - Is this the current level?

interface DungeonItemData {
    name: string
    bonus: string
    increment: number
    rarity: string
    desc: string
    lvlText: string
    baseValue: number
    maxLevel: number
    achieve: string
    world: string
}

export class DungeonItem {
    name: string
    bonus: string
    increment: number
    rarity: string
    desc: string
    lvlText: string
    baseValue: number
    maxLevel: number
    achieve: string
    world: string

    level: number = 0;

    constructor(public index: number, data: DungeonItemData) {
        this.name = data.name;
        this.bonus = data.bonus;
        this.increment = data.increment;
        this.rarity = data.rarity
        this.desc = data.desc
        this.lvlText = data.lvlText;
        this.baseValue = data.baseValue;
        this.maxLevel = data.maxLevel;
        this.achieve = data.achieve;
        this.world = data.world;
    }

    getRarityNumber = () => {
        switch (this.rarity) {
            case "Common": return 0;
            case "Uncommon": return 1;
            case "Rare": return 2;
            case "Epic": return 3;
            case "Legendary": return 4;
            default: return -1;
        }
    }

    getUpgradeCost = () => {
        const baseMath = 1 + 0.7 * Math.pow(this.level, 1.5 + 0.05 * this.level);
        const rarityNumber = this.getRarityNumber();
        return Math.floor(baseMath * (1 + (rarityNumber + 1) * Math.pow(4, (rarityNumber + 2.348) / 2.348)));
    }

    getImageData = (): ImageData => {
        return {
            location: `DungItems${this.index}`,
            width: 42,
            height: 42
        }
    }

    getBonus = () => {
        return this.baseValue + (this.increment * this.level);
    }

    getBonusText = () => {
        return this.desc.replace(/{/g, this.getBonus().toString());
    }
}

interface DungeonPassiveData {
    effect: string
    x1: number
    x2: number
    func: string
    type: string
    lvlUpText: string
}

export class DungeonPassive {
    effect: string
    x1: number
    x2: number
    func: string
    type: string
    lvlUpText: string
    passiveType: PassiveType

    level: number = 0;

    constructor(public index: number, group: string, data: DungeonPassiveData) {
        this.effect = data.effect;
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.func = data.func;
        this.type = data.type;
        this.lvlUpText = data.lvlUpText
        this.passiveType = group as PassiveType;
    }

    getBonus = (round: boolean = false) => {
        return lavaFunc(this.func, this.level, this.x1, this.x2, round);
    }

    getCostToMax = () => {
        let totalCost = 0;
        range(this.level, this.passiveType == PassiveType.Dungeon ? 100 : 50).forEach((level, _) => {
            totalCost += this.getUpgradeCost(level);
        });

        return totalCost;
    }

    getUpgradeCost = (level: number = this.level) => {
        if (this.passiveType == PassiveType.Dungeon) {
            const baseMath = Math.pow(1.5 * level, 1.04);
            const moreMath = 1.024 + ((level - 60) / (level + 60)) * 0.01 * Math.floor((level + 940) / 1000);
            return Math.floor(2 + baseMath * Math.pow(moreMath, level));
        }
        if (this.passiveType == PassiveType.Flurbo) {
            const baseMath = Math.pow(1.7 * level, 1.05);
            const moreMath = 1.027 + ((level - 30) / (level + 30)) * 0.01 * Math.floor((level + 970) / 1000);
            return Math.floor(1 + baseMath * Math.pow(moreMath, level));
        }
        return 0;
    }
}

const initDungeonPassives = () => {
    return GroupBy([
        new DungeonPassive(0, "Dungeon", { "effect": "Max HP", "x1": 1, "x2": 0, "func": "add", "type": "", "lvlUpText": "maxHp" }),
        new DungeonPassive(1, "Dungeon", { "effect": "Max MP", "x1": 1, "x2": 0, "func": "add", "type": "", "lvlUpText": "maxMp" }),
        new DungeonPassive(2, "Dungeon", { "effect": "Base Damage", "x1": 100, "x2": 100, "func": "decay", "type": "", "lvlUpText": "baseDmg" }),
        new DungeonPassive(3, "Dungeon", { "effect": "Total Dmg", "x1": 250, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "pctDmg" }),
        new DungeonPassive(4, "Dungeon", { "effect": "Crit Chance", "x1": 50, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "critChance" }),
        new DungeonPassive(5, "Dungeon", { "effect": "Move Speed", "x1": 70, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "MoveSpeed" }),
        new DungeonPassive(6, "Dungeon", { "effect": "Block Chance", "x1": 50, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "BlockChance" }),
        new DungeonPassive(7, "Dungeon", { "effect": "Drop Rarity", "x1": 150, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "DropRarity" }),
        new DungeonPassive(0, "Flurbo", { "effect": "Weapon Power", "x1": 50, "x2": 80, "func": "decay", "type": "", "lvlUpText": "WepPow" }),
        new DungeonPassive(1, "Flurbo", { "effect": "Talent Pts", "x1": 1, "x2": 0, "func": "add", "type": "", "lvlUpText": "TalPtAll" }),
        new DungeonPassive(2, "Flurbo", { "effect": "Class Exp", "x1": 45, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "EXP" }),
        new DungeonPassive(3, "Flurbo", { "effect": "Skilling Exp", "x1": 90, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "skillEXP" }),
        new DungeonPassive(4, "Flurbo", { "effect": "Monster Cash", "x1": 75, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "MonsterCash" }),
        new DungeonPassive(5, "Flurbo", { "effect": "Accuracy", "x1": 1, "x2": 0, "func": "add", "type": "%", "lvlUpText": "Acc" }),
        new DungeonPassive(6, "Flurbo", { "effect": "Defence", "x1": 1, "x2": 0, "func": "add", "type": "%", "lvlUpText": "Def" }),
        new DungeonPassive(7, "Flurbo", { "effect": "AFK Gains", "x1": 10, "x2": 50, "func": "decay", "type": "%", "lvlUpText": "AFKgains" }),
    ], "passiveType");
}

export const DungeonSetInfo = {
    "Beginner Traits": {
        rankReq: 5,
        visualOrder: 1,
    },
    "Kinda Cool Traits": {
        rankReq: 10,
        visualOrder: 4,
    },
    "Strategery Traits": {
        rankReq: 15,
        visualOrder: 7,
    },
    "Da Cred Traits": {
        rankReq: 20,
        visualOrder: 2,
    },
    "Drop Drip Traits": {
        rankReq: 25,
        visualOrder: 5,
    },
    "Cash Money Traits": {
        rankReq: 30,
        visualOrder: 8,
    },
    "ChOiIiCe Traits": {
        rankReq: 35,
        visualOrder: 3,
    },
    "Royale Traits": {
        rankReq: 40,
        visualOrder: 6,
    },
    "Endothelium Traits": {
        rankReq: 50,
        visualOrder: 9,
    },
}

export class DungeonTrait {
    active: boolean = false;

    constructor(public index: number, public setName: string, public bonus: string) { }

    getImageData = (): ImageData => {
        return {
            location: `DungTrait${this.active ? 'A' : 'B'}${this.index}`,
            width: 51,
            height: 51
        }
    }
}

const initDungeonTraits = () => {
    return [
        new DungeonTrait(0, "Beginner Traits", "+5 Max HP"),
        new DungeonTrait(1, "Beginner Traits", "+3 Base Damage"),
        new DungeonTrait(2, "Beginner Traits", "+5 Max MP"),
        new DungeonTrait(3, "Kinda Cool Traits", "Start each dungeon run with 2 grey RNG items"),
        new DungeonTrait(4, "Kinda Cool Traits", "Start each dungeon run with 1 green RNG item"),
        new DungeonTrait(5, "Kinda Cool Traits", "50% to start each dungeon run with 1 blue RNG item"),
        new DungeonTrait(6, "Strategery Traits", "Each grey RNG item also gives +1% drop chance"),
        new DungeonTrait(7, "Strategery Traits", "Each green RNG items also gives +1 base dmg"),
        new DungeonTrait(8, "Strategery Traits", "Each Blue RNG item also gives +3 base mana"),
        new DungeonTrait(9, "Strategery Traits", "Each purple RNG item also gives +5 base dmg"),
        new DungeonTrait(10, "Da Cred Traits", "Dungeon Credits drop +30% more often from mobs and bosses"),
        new DungeonTrait(11, "Da Cred Traits", "Dungeon Flurbos, the pink ones, drop +30% more often from mobs and bosses"),
        new DungeonTrait(12, "Drop Drip Traits", "Enhancers drop from mobs instead of equipment 25% more often"),
        new DungeonTrait(13, "Drop Drip Traits", "Equipment drop from mobs instead of enhancers 25% more often"),
        new DungeonTrait(14, "Drop Drip Traits", "Weapons drop instead of armor ~ jewelry 25% more often"),
        new DungeonTrait(15, "Drop Drip Traits", "Armor ~ jewelry drop instead of weapons 25% more often"),
        new DungeonTrait(16, "Cash Money Traits", "Shop prices of Equipment scales up 30% slower"),
        new DungeonTrait(17, "Cash Money Traits", "Shop prices of enhancers scales up 40% slower"),
        new DungeonTrait(18, "Cash Money Traits", "Shop prices of RNG items scale up 15% slower"),
        new DungeonTrait(19, "ChOiIiCe Traits", "RNG items from shops sometimes have +1 choices"),
        new DungeonTrait(20, "ChOiIiCe Traits", "RNG items from anywhere but shops sometimes have +1 choices"),
        new DungeonTrait(21, "ChOiIiCe Traits", "Higher rarity RNG items, aka green or better, are 25% more likely"),
        new DungeonTrait(22, "Royale Traits", "You can pick 1 additional trait. Not per set, just in total."),
        new DungeonTrait(23, "Royale Traits", "Have all first 6 traits, on the house!"),
        new DungeonTrait(24, "Endothelium Traits", "Max Hp is 1, but you start with 10 RNG items."),
        new DungeonTrait(25, "Endothelium Traits", "Max HP is 1, but +10,000% Mana regen and -50% atk cooldown"),
        new DungeonTrait(26, "Endothelium Traits", "Max HP is 1, but you have +300% basic attack spd and start with 5"),
        new DungeonTrait(27, "Endothelium Traits", "Hmm.. I'll get back to you on this one"),
    ]
}

const initDungeonItems = () => {
    return [
        new DungeonItem(0, { "name": "Helping Heart", "bonus": "maxHp", "increment": 0.2, "rarity": "Common", "desc": "Increases your max HP by +{", "lvlText": "Next Lv: +{ Max HP", "baseValue": 3, "maxLevel": 10, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(1, { "name": "Rusty Blade", "bonus": "baseDmg2", "increment": 0.2, "rarity": "Common", "desc": "Increases your base damage by +{", "lvlText": "Next Lv: +{ Base DMG", "baseValue": 3, "maxLevel": 10, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(2, { "name": "Mana Crystal", "bonus": "maxMp", "increment": 0.2, "rarity": "Common", "desc": "Increases your max MP by +{", "lvlText": "Next Lv: +{ Max MP", "baseValue": 2, "maxLevel": 10, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(3, { "name": "Sandulls", "bonus": "MoveSpeed", "increment": 0.1, "rarity": "Common", "desc": "Increases your Move Speed by +{%", "lvlText": "Next Lv: +{% Move speed", "baseValue": 2.5, "maxLevel": 10, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(4, { "name": "Pan Lid", "bonus": "BlockChance", "increment": 0.1, "rarity": "Common", "desc": "Increases your Block Chance by +{%. I Guess pan lids are effective shields!", "lvlText": "Next Lv: +{% Block chance", "baseValue": 3, "maxLevel": 10, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(5, { "name": "Rabbit Paw", "bonus": "DropRarity", "increment": 0.2, "rarity": "Common", "desc": "Increases your Drop Rate by +{%", "lvlText": "Next Lv: +{% Drop rate", "baseValue": 5, "maxLevel": 8, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(6, { "name": "Tax Ledger", "bonus": "monsterCash", "increment": 1, "rarity": "Common", "desc": "Monsters drop +{% more Cash to spend at NPC shop.", "lvlText": "Next Lv: +{% Cash dropped", "baseValue": 14, "maxLevel": 8, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(7, { "name": "Big Ol Belly", "bonus": "foodEff", "increment": 1.5, "rarity": "Common", "desc": "Food heals is +{% more effective, and immediately drops 2 food items!", "lvlText": "Next Lv: +{% Food effect", "baseValue": 20, "maxLevel": 10, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(8, { "name": "Decaf Latte", "bonus": "skillSpd", "increment": 2, "rarity": "Common", "desc": "Skilling speed is +{% faster. Things like mining, fishing, and other skill actions.", "lvlText": "Next Lv: +{% Skill speed", "baseValue": 25, "maxLevel": 8, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(9, { "name": "Sharp Eye", "bonus": "critChance", "increment": 0.5, "rarity": "Common", "desc": "Increases critical hit chance by +{%. Critical hits are epic!", "lvlText": "Next Lv: +{% Crit chance", "baseValue": 3, "maxLevel": 6, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(10, { "name": "Unbalanced Scale", "bonus": "sellPrice", "increment": 2, "rarity": "Common", "desc": "All items you can sell are worth +{% more. Bruh, that's so money!", "lvlText": "Next Lv: +{% sell price", "baseValue": 20, "maxLevel": 7, "achieve": "5 'hunned Copper", "world": "Blunder Hills" }),
        new DungeonItem(11, { "name": "Sugar Rush", "bonus": "attackSpd", "increment": 1, "rarity": "Common", "desc": "Increases regular attack speed by +{%. Pow pow pow!", "lvlText": "Next Lv: +{% attack speed", "baseValue": 15, "maxLevel": 7, "achieve": "1.5 Ki'log'grams", "world": "Blunder Hills" }),
        new DungeonItem(12, { "name": "Handy Icepick", "bonus": "multiHit", "increment": 2, "rarity": "Common", "desc": "Regular attacks have a +{% chance to hit an additional line of damage.", "lvlText": "Next Lv: +{% extra hit chance", "baseValue": 25, "maxLevel": 8, "achieve": "Copper Quipment", "world": "Blunder Hills" }),
        new DungeonItem(13, { "name": "Stardew Drop", "bonus": "fullMpDmg", "increment": 2, "rarity": "Common", "desc": "Increase damage by +{% if MP is full. FULL, remember.", "lvlText": "Next Lv: +{% damage boost", "baseValue": 50, "maxLevel": 10, "achieve": "Rat-a-tat-tat", "world": "Yum Yum Desert" }),
        new DungeonItem(14, { "name": "Grey Grumblo", "bonus": "allGreyDmg", "increment": 2, "rarity": "Common", "desc": "Increases damage by +{% if all RNG items you've selected are Grey Rarity", "lvlText": "Next Lv: +{% damage boost", "baseValue": 40, "maxLevel": 10, "achieve": "Naked and Unafraid", "world": "Blunder Hills" }),
        new DungeonItem(15, { "name": "Muscle Memory", "bonus": "skillingDmg", "increment": 0.02, "rarity": "Common", "desc": "Each skilling action you perform increases damage by +{% up to +50%", "lvlText": "Next Lv: +{% dmg per action", "baseValue": 0.5, "maxLevel": 10, "achieve": "20 Bundles of Jungle", "world": "Blunder Hills" }),
        new DungeonItem(16, { "name": "Boss Skull", "bonus": "bossDmg", "increment": 3, "rarity": "Common", "desc": "Increases boss damage by +{%", "lvlText": "Next Lv: +{% Boss Damage", "baseValue": 20, "maxLevel": 8, "achieve": "Shut it Poochy", "world": "Blunder Hills" }),
        new DungeonItem(17, { "name": "Golden Dice", "bonus": "diceMoney", "increment": 5, "rarity": "Common", "desc": "Gives you a chance to get an additional Loot Dice based on how much Cash you have at the end.", "lvlText": "Next Lv: +{% extra dice chance based on Cash.", "baseValue": 10, "maxLevel": 5, "achieve": "2 Tons of Iron", "world": "Blunder Hills" }),
        new DungeonItem(18, { "name": "Plump Dice", "bonus": "diceHP", "increment": 5, "rarity": "Common", "desc": "Gives you a chance to get an additional Loot Dice based on how much HP you have at the end.", "lvlText": "Next Lv: +{% extra dice chance based on HP.", "baseValue": 10, "maxLevel": 5, "achieve": "Croakin' Froge", "world": "Frostbite Tundra" }),
        new DungeonItem(19, { "name": "Recycler", "bonus": "nothing", "increment": 0.5, "rarity": "Common", "desc": "Drops a new RNG item to pick up. {% chance to drop an additional RNG item.", "lvlText": "Next Lv: +{% chance for extra item", "baseValue": 5, "maxLevel": 30, "achieve": "Specializational!", "world": "Yum Yum Desert" }),
        new DungeonItem(20, { "name": "Sucker Punch", "bonus": "critDmg", "increment": 3, "rarity": "Uncommon", "desc": "Increases Critical Damage by +{%", "lvlText": "Next Lv: +{% Crit Dmg", "baseValue": 30, "maxLevel": 5, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(21, { "name": "Thorny Rose", "bonus": "maxHp", "increment": 1, "rarity": "Uncommon", "desc": "+{ Max HP, but take 6 damage. This can be lethal, watch out!", "lvlText": "Next Lv: +{ max HP", "baseValue": 13, "maxLevel": 5, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(22, { "name": "Battery", "bonus": "abilityCD", "increment": 1, "rarity": "Uncommon", "desc": "Attack abilities cooldown +{% faster.", "lvlText": "Next Lv: +{% cooldown reduction.", "baseValue": 25, "maxLevel": 5, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(23, { "name": "Liars Craps", "bonus": "DRandHP", "increment": 1, "rarity": "Uncommon", "desc": "+{% drop rate, -{% Max HP.", "lvlText": "Next Lv: +{% DR, -{% Max HP", "baseValue": 15, "maxLevel": 5, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(24, { "name": "Blood Vial", "bonus": "hpMissingDmg", "increment": 2, "rarity": "Uncommon", "desc": "+2% Dmg every 1% HP missing, up to {%. Having more of this item only increases max cap.", "lvlText": "Next Lv: +{% Max Cap", "baseValue": 30, "maxLevel": 5, "achieve": "Colosseum Contender", "world": "Blunder Hills" }),
        new DungeonItem(25, { "name": "Fashion Sense", "bonus": "rareEquips", "increment": 2, "rarity": "Uncommon", "desc": "Equipment drops being of a higher rarity will happen +{% more often.", "lvlText": "Next Lv: +{% rare equip chance", "baseValue": 25, "maxLevel": 8, "achieve": "Careful, it's Sharp!", "world": "Yum Yum Desert" }),
        new DungeonItem(26, { "name": "Can of Varnish", "bonus": "baseDmgPLUS", "increment": 2, "rarity": "Uncommon", "desc": "Rusty Blades gives +{% more base DMG. Also comes with 1 Rusty Blade, what a deal!", "lvlText": "Next Lv: +{% higher dmg bonus from Rusty Blades", "baseValue": 30, "maxLevel": 6, "achieve": "Bigtime Bloacher", "world": "Yum Yum Desert" }),
        new DungeonItem(27, { "name": "Spare Change", "bonus": "cashFloor", "increment": 5, "rarity": "Uncommon", "desc": "Every 30 seconds, if you're standing still, you'll notice some cash on the floor!", "lvlText": "Next Lv: +{% Cash Found", "baseValue": 50, "maxLevel": 6, "achieve": "Wode Together", "world": "Blunder Hills" }),
        new DungeonItem(28, { "name": "Sneaky Cap", "bonus": "sneakCR", "increment": 0.1, "rarity": "Uncommon", "desc": "For every minute you go undamaged, +{% crit chance, up to +30%.", "lvlText": "Next Lv: +{% crit chance per minute", "baseValue": 10, "maxLevel": 5, "achieve": "Well Learned", "world": "Yum Yum Desert" }),
        new DungeonItem(29, { "name": "Ninja Smoke", "bonus": "invuln", "increment": 0.1, "rarity": "Uncommon", "desc": "+{ sec of invincibility time whenever you get hit.", "lvlText": "Next Lv: +{ seconds", "baseValue": 2, "maxLevel": 10, "achieve": "Hammer Bub", "world": "Yum Yum Desert" }),
        new DungeonItem(30, { "name": "Tortoise Shell", "bonus": "blockStack", "increment": 0.2, "rarity": "Uncommon", "desc": "Each time you get hit, +0.3% block chance, up to a max of +{%", "lvlText": "Next Lv: +{% max cap", "baseValue": 6, "maxLevel": 5, "achieve": "Jellyfish Jelly", "world": "Yum Yum Desert" }),
        new DungeonItem(31, { "name": "Vampire Fangs", "bonus": "healKill", "increment": 2.5, "rarity": "Uncommon", "desc": "Whenever you kill a monster, {% chance to heal +1 HP.", "lvlText": "Next Lv: {% chance to heal on kill", "baseValue": 50, "maxLevel": 8, "achieve": "Right to Bear Iron", "world": "Blunder Hills" }),
        new DungeonItem(32, { "name": "Dead Book", "bonus": "dmgCritSpdU", "increment": 0.05, "rarity": "Rare", "desc": "+{% Dmg and Crit chance for each monster type you defeat, even before getting this.", "lvlText": "Next Lv: +{% Dmg and Crit chance.", "baseValue": 0.6, "maxLevel": 5, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(33, { "name": "Armadillo", "bonus": "hpDmgArma", "increment": 0.1, "rarity": "Rare", "desc": "+{ base damage for every 10 Max HP you have. Also gives 2 Helping Hearts, because he loves u!", "lvlText": "Next Lv: +{ Base DMG per 10 Max HP.", "baseValue": 3, "maxLevel": 5, "achieve": "", "world": "Blunder Hills" }),
        new DungeonItem(34, { "name": "Spiky Spine", "bonus": "retaliate", "increment": 5, "rarity": "Rare", "desc": "Whenever you get hit, deal {% damage to that monster. If you block, deal a critical hit.", "lvlText": "Next Lv: +{% retaliation dmg", "baseValue": 120, "maxLevel": 6, "achieve": "Blunder Skull", "world": "Frostbite Tundra" }),
        new DungeonItem(35, { "name": "Single Cut", "bonus": "dmgTakenU", "increment": 0.2, "rarity": "Rare", "desc": "Take 10 dmg, and gain +{% dmg. Also, 90% chance this item will drop on the floor again.", "lvlText": "Next Lv: +{% damage.", "baseValue": 6, "maxLevel": 5, "achieve": "Vial Noob", "world": "Yum Yum Desert" }),
        new DungeonItem(36, { "name": "RNG Voucher", "bonus": "enhanceSellRNG", "increment": 1, "rarity": "Rare", "desc": "Selling any enhancer has a {% chance to drop an RNG item of 1 choice.", "lvlText": "Next Lv: +{% chance", "baseValue": 10, "maxLevel": 5, "achieve": "Souped Up Salts", "world": "Frostbite Tundra" }),
        new DungeonItem(37, { "name": "", "bonus": "", "increment": 5, "rarity": "Rare", "desc": "", "lvlText": "Next Lv: +{ max HP.", "baseValue": 10, "maxLevel": 5, "achieve": "Unobtainable", "world": "Hyperion Nebula" }),
        new DungeonItem(38, { "name": "", "bonus": "", "increment": 5, "rarity": "Rare", "desc": "", "lvlText": "Next Lv: +{ max HP.", "baseValue": 10, "maxLevel": 5, "achieve": "Unobtainable", "world": "Hyperion Nebula" }),
        new DungeonItem(39, { "name": "", "bonus": "", "increment": 5, "rarity": "Rare", "desc": "", "lvlText": "Next Lv: +{ max HP.", "baseValue": 10, "maxLevel": 5, "achieve": "Unobtainable", "world": "Hyperion Nebula" }),
        new DungeonItem(40, { "name": "Angelite", "bonus": "reviveU", "increment": 1, "rarity": "Epic", "desc": "If you die, use up this item and revive instantly without losing 2 RNG items. Also +{% drop Rate.", "lvlText": "Next Lv: +{% drop rate.", "baseValue": 20, "maxLevel": 5, "achieve": "Smirky Souls", "world": "Frostbite Tundra" }),
        new DungeonItem(41, { "name": "Genesis Sphere", "bonus": "greyGenesisU", "increment": 0.3, "rarity": "Epic", "desc": "Choosing a Grey rarity RNG item has a {% chance to drop a new grey RNG item, up to 60%", "lvlText": "Next Lv: +{% chance for genesis.", "baseValue": 18.5, "maxLevel": 5, "achieve": "Good Times Roll", "world": "Frostbite Tundra" }),
        new DungeonItem(42, { "name": "Shattered Mirror", "bonus": "doubleAbility", "increment": 1, "rarity": "Epic", "desc": "Whenever you cast an attack ability, {% chance to cast it again shorty after for no mana cost.", "lvlText": "Next Lv: +{% recast chance", "baseValue": 25, "maxLevel": 5, "achieve": "Efaunt Trumped", "world": "Yum Yum Desert" }),
        new DungeonItem(43, { "name": "Transmogrifier Box", "bonus": "Nothing", "increment": 1, "rarity": "Epic", "desc": "Lose all Grey RNG items that you have just 1 of, and get a new one for each one you lost.", "lvlText": "Next Lv: +{ more ZAP!", "baseValue": 1, "maxLevel": 5, "achieve": "Vial Connoisseur", "world": "Yum Yum Desert" }),
        new DungeonItem(44, { "name": "", "bonus": "", "increment": 5, "rarity": "Epic", "desc": "", "lvlText": "Next Lv: +{ max HP.", "baseValue": 10, "maxLevel": 5, "achieve": "Unobtainable", "world": "Hyperion Nebula" }),
        new DungeonItem(45, { "name": "Horn of the Foal", "bonus": "critGodU", "increment": 15, "rarity": "Legendary", "desc": "+15% Crit Chance, +{% Crit Dmg, and -60% max HP. Oh, and Non Crits deal no damage.", "lvlText": "Next Lv: +{% crit dmg, all else equal.", "baseValue": 600, "maxLevel": 10, "achieve": "House Flipper", "world": "Blunder Hills" }),
        new DungeonItem(46, { "name": "Stone of the Bulwark", "bonus": "defGodU", "increment": 10, "rarity": "Legendary", "desc": "-85% attack speed and mana regen. +30% Block chance and +{% damage.", "lvlText": "Next Lv: +{% damage, all else equal.", "baseValue": 500, "maxLevel": 10, "achieve": "I Sawed...", "world": "Frostbite Tundra" }),
        new DungeonItem(47, { "name": "", "bonus": "", "increment": 5, "rarity": "Legendary", "desc": "", "lvlText": "Next Lv: +{ max HP.", "baseValue": 10, "maxLevel": 5, "achieve": "Unobtainable", "world": "Hyperion Nebula" }),
    ]
}

export class Dungeons {
    items: DungeonItem[] = initDungeonItems();
    passives: Map<PassiveType, DungeonPassive[]> = initDungeonPassives();
    traits: DungeonTrait[] = initDungeonTraits();

    xp: number = 0;
    rank: number = 0;
    boostedcount: number = 0;
    credits: number = 0;
    flurbos: number = 0;

    public static getDungeonRank = (dungeonXP: number) => {
        const rank = Number(dungeonLevels.reduce((rank, req, index, _) => {
            if (dungeonXP > Number(req)) {
                rank = index.toString()
            }
            return rank;
        }, "0")) + 1;

        return rank;
    }

    public static getDungeonRankClass = (dungeonRank: number) => {
        return `icons-1620 icons-Dung_Rank${dungeonRank}`;
    }
}

export const parseDungeons = (upgrades: number[][], optList: number[]) => {
    const dungeons = new Dungeons();

    // [
    //     [0,5,0,0,0,0,0,0,0,0,0,7,3,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,0,-1,0,0,-1,0,0,-1], // items
    //     [17,10,22,16,8,7,8,34], // dungeon upgrades
    //     [1,3,6,-1,-1,-1,-1,-1,-1],
    //     [6,6,6,6,3,3,2,2,2,-1],
    //     [3,3,3,6],
    //     [2,0,0,0,0,0,0,14], // flurbo upgrades
    //     [1,1,0,0,0,1,1,0,0,0]
    // ]

    // handle bad data, TODO better way.
    if (upgrades.length < 2) {
        return dungeons;
    }
    dungeons.items.forEach((item, index) => {
        if (index < upgrades[0].length) {
            item.level = upgrades[0][index];
        }
    })

    dungeons.passives.get(PassiveType.Dungeon)?.forEach(passive => {
        passive.level = upgrades[1][passive.index];
    });

    dungeons.passives.get(PassiveType.Flurbo)?.forEach(passive => {
        passive.level = upgrades[5][passive.index];
    });

    upgrades[2].forEach(index => {
        const trait = dungeons.traits.find(trait => trait.index == index)
        if (trait) {
            trait.active = true;
        }
    });


    dungeons.xp = optList[71]
    dungeons.rank = Number(dungeonLevels.reduce((rank, req, index, _) => {
        if (optList[71] > Number(req)) {
            rank = index.toString()
        }
        return rank;
    }, "0")) + 1;

    dungeons.flurbos = optList[73];
    dungeons.credits = optList[72];
    dungeons.boostedcount = optList[76] - 1; // -1 because Lava.
    return dungeons;
}