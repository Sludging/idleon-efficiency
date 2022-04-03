import { lavaFunc } from "../utility"

export const GuildConstants = {
    BonusIndex: 0
}

export interface BonusData {
    name: string
    xPos: number
    yPos: number
    bonus: string
    x1: number
    x2: number
    func: string
    maxLevel: number
    reqIndex: number
    reqLevel: number
    gpBaseCost: number
    gpIncrease: number
}

export class GuildBonus {
    name: string
    bonus: string
    x1: number
    x2: number
    func: string
    maxLevel: number
    reqIndex: number
    reqLevel: number
    gpBaseCost: number
    gpIncrease: number

    level: number = 0

    constructor(data: BonusData) {
        this.name = data.name;
        this.bonus = data.bonus;
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.func = data.func;
        this.maxLevel = data.maxLevel;
        this.reqIndex = data.reqIndex;
        this.reqLevel = data.reqLevel;
        this.gpBaseCost = data.gpBaseCost;
        this.gpIncrease = data.gpIncrease;
    }

    getBonus = () => {
        return lavaFunc(this.func, this.level, this.x1, this.x2);
    }
}


export class Guild {
    guildBonuses: GuildBonus[] = initBonus()

    constructor(guildInfo: number[][]) {
        const bonuses = guildInfo[GuildConstants.BonusIndex]
        bonuses.forEach((bonusLevel, index) => {
            if (index < this.guildBonuses.length) {
                this.guildBonuses[index].level = bonusLevel;
            }
        })
    }
}

const initBonus = () => {
    return [
        new GuildBonus(JSON.parse('{"name": "Guild Gifts", "xPos": 194, "yPos": 401, "bonus": "+{% chance for an extra Guild Gift to be added to your...", "x1": 700, "x2": 100, "func": "decay", "maxLevel": 100, "reqIndex": 0, "reqLevel": 0, "gpBaseCost": 10, "gpIncrease": 40}')),
        new GuildBonus(JSON.parse('{"name": "Stat Runes", "xPos": 110, "yPos": 395, "bonus": "+{ Total All Stats", "x1": 40, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 0, "reqLevel": 2, "gpBaseCost": 20, "gpIncrease": 60}')),
        new GuildBonus(JSON.parse('{"name": "Rucksack", "xPos": 115, "yPos": 329, "bonus": "+{% Total Carry Cap", "x1": 70, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 1, "reqLevel": 4, "gpBaseCost": 20, "gpIncrease": 70}')),
        new GuildBonus(JSON.parse('{"name": "Power of Pow", "xPos": 90, "yPos": 265, "bonus": "+{ Weapon Power", "x1": 10, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 2, "reqLevel": 5, "gpBaseCost": 20, "gpIncrease": 80}')),
        new GuildBonus(JSON.parse('{"name": "REM Fighting", "xPos": 98, "yPos": 201, "bonus": "+{% Fight AFK gain rate", "x1": 10, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 3, "reqLevel": 8, "gpBaseCost": 30, "gpIncrease": 90}')),
        new GuildBonus(JSON.parse('{"name": "Make or Break", "xPos": 98, "yPos": 137, "bonus": "+{% Production Rate in Town Skills", "x1": 30, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 4, "reqLevel": 10, "gpBaseCost": 30, "gpIncrease": 100}')),
        new GuildBonus(JSON.parse('{"name": "Multi Tool", "xPos": 160, "yPos": 265, "bonus": "+{% Total Skill Efficiency", "x1": 30, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 2, "reqLevel": 5, "gpBaseCost": 20, "gpIncrease": 80}')),
        new GuildBonus(JSON.parse('{"name": "Sleepy Skiller", "xPos": 167, "yPos": 201, "bonus": "+{% Skill AFK gain rate", "x1": 10, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 6, "reqLevel": 8, "gpBaseCost": 30, "gpIncrease": 90}')),
        new GuildBonus(JSON.parse('{"name": "Wait A Minute", "xPos": 296, "yPos": 137, "bonus": "+{% Nothing Yet", "x1": 1, "x2": 0, "func": "add", "maxLevel": 0, "reqIndex": 16, "reqLevel": 5, "gpBaseCost": 20, "gpIncrease": 80}')),
        new GuildBonus(JSON.parse('{"name": "Bonus GP for small guilds", "xPos": 194, "yPos": 335, "bonus": "+}% GP earned if your guild has ] members or less...", "x1": 200, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 0, "reqLevel": 2, "gpBaseCost": 10, "gpIncrease": 10}')),
        new GuildBonus(JSON.parse('{"name": "Gold Charm", "xPos": 284, "yPos": 395, "bonus": "+{% Total Drop Rate", "x1": 40, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 0, "reqLevel": 2, "gpBaseCost": 20, "gpIncrease": 60}')),
        new GuildBonus(JSON.parse('{"name": "Star Dazzle", "xPos": 270, "yPos": 329, "bonus": "+{ Star Talent Points", "x1": 120, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 10, "reqLevel": 4, "gpBaseCost": 20, "gpIncrease": 70}')),
        new GuildBonus(JSON.parse('{"name": "C2 Card Spotter", "xPos": 238, "yPos": 265, "bonus": "+{% Card Drop Rate", "x1": 60, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 11, "reqLevel": 5, "gpBaseCost": 20, "gpIncrease": 80}')),
        new GuildBonus(JSON.parse('{"name": "Bestone", "xPos": 232, "yPos": 201, "bonus": "+{% Stone Upgrade Success chance", "x1": 16, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 12, "reqLevel": 8, "gpBaseCost": 30, "gpIncrease": 90}')),
        new GuildBonus(JSON.parse('{"name": "Wait A Minute2", "xPos": 296, "yPos": 137, "bonus": "+{% Nothing Yet", "x1": 1, "x2": 0, "func": "add", "maxLevel": 0, "reqIndex": 16, "reqLevel": 5, "gpBaseCost": 20, "gpIncrease": 80}')), // CUSTOM MADE
        new GuildBonus(JSON.parse('{"name": "Craps", "xPos": 305, "yPos": 265, "bonus": "+{% chance to get an AFK Reroll", "x1": 28, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 11, "reqLevel": 5, "gpBaseCost": 20, "gpIncrease": 80}')),
        new GuildBonus(JSON.parse('{"name": "Anotha One", "xPos": 296, "yPos": 201, "bonus": "+{% chance for 2x EXP when claiming AFK", "x1": 26, "x2": 50, "func": "decay", "maxLevel": 50, "reqIndex": 15, "reqLevel": 8, "gpBaseCost": 30, "gpIncrease": 90}')),
        new GuildBonus(JSON.parse('{"name": "Wait A Minute3", "xPos": 296, "yPos": 137, "bonus": "+{% Nothing Yet", "x1": 1, "x2": 0, "func": "add", "maxLevel": 0, "reqIndex": 16, "reqLevel": 5, "gpBaseCost": 20, "gpIncrease": 80}')), // CUSTOM MADE
    ];
}

export default function parseGuild(guildInfo: number[][]) {
    return new Guild(guildInfo);
}