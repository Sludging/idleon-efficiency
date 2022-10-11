import { lavaFunc } from "../utility"
import { GuildBonusBase, initGuildBonusRepo } from "./data/GuildBonusRepo"
import { GuildBonusModel } from "./model/guildBonusModel"

export const GuildConstants = {
    BonusIndex: 0
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

    constructor(public index: number, data: GuildBonusModel) {
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

    static fromBase = (data: GuildBonusBase[]) => {
        return data.map(bonus => new GuildBonus(bonus.index, bonus.data))
    }
}


export class Guild {
    guildBonuses: GuildBonus[];

    constructor(guildInfo: number[][]) {
        this.guildBonuses = GuildBonus.fromBase(initGuildBonusRepo());

        if (guildInfo.length > 0) {
            const bonuses = guildInfo[GuildConstants.BonusIndex]
            bonuses.forEach((bonusLevel, index) => {
                if (index < this.guildBonuses.length) {
                    this.guildBonuses[index].level = bonusLevel;
                }
            })
        }
    }
}

export default function parseGuild(guildInfo: number[][]) {
    return new Guild(guildInfo);
}