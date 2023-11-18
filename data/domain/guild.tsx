import { lavaFunc } from "../utility"
import { Cloudsave } from "./cloudsave"
import { GuildBonusBase, initGuildBonusRepo } from "./data/GuildBonusRepo"
import { IParser, safeJsonParse } from "./idleonData"
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

    constructor() {
        this.guildBonuses = GuildBonus.fromBase(initGuildBonusRepo());
    }
}

export const initGuild = () => {
    return new Guild();
}

const parseGuild: IParser = function (raw: Cloudsave, data: Map<string, any>) {
    const guild = data.get("guild") as Guild;
    const guildInfo = safeJsonParse(raw, "Guild", []) as number[][];

    if (guildInfo.length > 0) {
        const bonuses = guildInfo[GuildConstants.BonusIndex]
        bonuses.forEach((bonusLevel, index) => {
            if (index < guild.guildBonuses.length) {
                guild.guildBonuses[index].level = bonusLevel;
            }
        })
    }

    data.set("guild", guild);
}

export default parseGuild;