import { GroupBy, lavaFunc, range } from "../utility"
import { DungItemBase, initDungItemRepo } from "./data/DungItemRepo"
import { DungPassivesBase, initDungPassivesRepo } from "./data/DungPassivesRepo"
import { DungSetBase, initDungTraitRepo } from "./data/DungTraitRepo"
import { DungItemModel } from "./model/dungItemModel"
import { ImageData } from "./imageData"
import { DungPassiveModel } from "./model/dungPassiveModel"

export enum PassiveType {
    Dungeon = "Dungeon",
    Flurbo = "Flurbo"
}

export const dungeonLevels = "0 4 10 18 28 40 70 110 160 230 320 470 670 940 1310 1760 2400 3250 4000 5000 6160 8000 10000 12500 15000 18400 21000 25500 30500 36500 45400 52000 61000 72500 85000 110000 125000 145000 170000 200000 250000 275000 325000 400000 490000 600000 725000 875000 1000000 1200000 1500000 3000000 5000000 10000000 20000000 30000000 40000000 50000000 60000000 80000000 100000000 999999999 999999999 999999999 999999999 999999999 1999999999 1999999999 1999999999 1999999999 1999999999".split(" ")

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

    constructor(public index: number, data: DungItemModel) {
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

    static fromBase(data: DungItemBase[]): DungeonItem[] {
        return data.map(item => new DungeonItem(item.index, item.data));
    }
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

    constructor(public index: number, group: string, data: DungPassiveModel) {
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

    static fromBase(data: DungPassivesBase[]) {
        return data.flatMap((type) => type.data.passives.map((passive, index) => new DungeonPassive(index, type.id, passive)));
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

    // I'm ignoring rank req for now, maybe someday.
    static fromBase(data: DungSetBase[]): DungeonTrait[] {
        let traitIndex = 0;
        return data.flatMap(set => set.data.traits.map(trait => new DungeonTrait(traitIndex++, set.id, trait.name)))
    }
}

export class Dungeons {
    items: DungeonItem[];
    passives: Map<PassiveType, DungeonPassive[]>;
    traits: DungeonTrait[];
    xp: number = 0;
    rank: number = 0;
    boostedcount: number = 0;
    credits: number = 0;
    flurbos: number = 0;

    constructor() {
        this.items = DungeonItem.fromBase(initDungItemRepo());
        this.passives =  GroupBy(DungeonPassive.fromBase(initDungPassivesRepo()), "passiveType");
        this.traits = DungeonTrait.fromBase(initDungTraitRepo());
    }

    public static getDungeonRank = (dungeonXP: number) => {
        const rank = Number(dungeonLevels.reduce((rank, req, index, _) => {
            if (dungeonXP > Number(req)) {
                rank = index.toString()
            }
            return rank;
        }, "0")) + 1;

        return rank;
    }

    public static getDungeonImageData = (dungeonRank: number): ImageData => {
        return {
            location: `Dung_Rank${dungeonRank}`,
            height: 20,
            width: 16
        }
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