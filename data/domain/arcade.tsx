import { lavaFunc, range } from "../utility"
import { Achievement } from "./achievements";
import { ImageData } from "./imageData";

export const ARCADE_MAX_LEVEL: number = 100
const achivementsWithBallBonus: number[][] = [
    [40, 3],
    [46, 1],
    [47, 1],
    [49, 1],
    [54, 1],
    [76, 2],
    [77, 1],
    [80, 3],
    [83, 2],
    [98, 2],
    [103, 2],
    [115, 3],
    [116, 1],
    [140, 1],
    [146, 2],
    [151, 2],
    [154, 1],
    [160, 3],
    [171, 4],
    [213, 3],
    [227, 2],
    [229, 2],
    [232, 2],
    [234, 2]
]

interface ArcadeBonusInfo {
    effect: string
    x1: number
    x2: number
    func: string
    type: string
    lvlUpText: string
    index: number
}

export class ArcadeBonus {
    effect: string
    x1: number
    x2: number
    func: string
    type: string
    lvlUpText: string
    index: number

    level: number = 0;

    constructor(data: ArcadeBonusInfo) {
        this.effect = data.effect;
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.func = data.func;
        this.type = data.type;
        this.lvlUpText = data.lvlUpText;
        this.index = data.index;
    }

    getBonus = (round: boolean = false, level: number = this.level) => {
        return lavaFunc(this.func, level, this.x1, this.x2, round);
    }

    getBonusText = (round: boolean = true) => {
        return this.effect.replace(/{/, this.getBonus(true).toString());
    }

    getImageData = (): ImageData => {
        return {
            location: `PachiShopICON${this.index}`,
            width: 62,
            height: 62
        }
    }

    getCost = (stampBonus: number = 0, level: number = this.level) => {
        const stampMath = Math.max(0.6, 1 - stampBonus / 100);
        return Math.round(stampMath * (5 + (3 * level + Math.pow(level, 1.3))));
    }

    getCostToMax = (stampBonus: number = 0) => {
        let totalCost = 0;
        range((this.level ?? 0), ARCADE_MAX_LEVEL).forEach((level, _) => {
            totalCost += this.getCost(stampBonus, level);
        });

        return totalCost;
    }
}

export class Arcade {
    bonuses: ArcadeBonus[] = initArcadeBonuses();
    balls: number = 0;
    goldBalls: number = 0;

    getMaxClaimTime = (stampBonus: number = 0) => {
        return Math.ceil(3600 * 48 + Math.min(10, stampBonus));
    }

    getBallBonus = (achivements: Achievement[], ballVialBonus: number = 0, meritLevel: number = 0, stampBonus: number = 0) => {
        let totalBonus = 0;
        achivementsWithBallBonus.forEach(achi => {
            if (achi[0] < achivements.length) {
                if (achivements[achi[0]].completed) {
                    totalBonus += achi[1];
                }
            }
        });

        return totalBonus + ballVialBonus + (5 * meritLevel + Math.min(50, stampBonus));
    }

    getBallsPerSec = (achivements: Achievement[], ballVialBonus: number = 0, meritLevel: number = 0, stampBonus: number = 0) => {
        return 4000 / (1 + this.getBallBonus(achivements, ballVialBonus, meritLevel, stampBonus) / 100);
    }
}

const initArcadeBonuses = (): ArcadeBonus[] => {
    return [
        new ArcadeBonus({ "effect": "+{ Base Damage", "x1": 1, "x2": 0, "func": "add", "type": "", "lvlUpText": "+{ Dmg", "index": 0 }),
        new ArcadeBonus({ "effect": "+{ Base Defence", "x1": 0.2, "x2": 0, "func": "add", "type": "", "lvlUpText": "+{ Def", "index": 1 }),
        new ArcadeBonus({ "effect": "+{% Total Accuracy", "x1": 60, "x2": 100, "func": "decay", "type": "", "lvlUpText": "+{% Acc", "index": 2 }),
        new ArcadeBonus({ "effect": "+{% Mining EXP gain", "x1": 60, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Min EXP", "index": 3 }),
        new ArcadeBonus({ "effect": "+{% Fishing EXP gain", "x1": 60, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Fish EXP", "index": 4 }),
        new ArcadeBonus({ "effect": "+{% Sample Size", "x1": 4, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Size", "index": 5 }),
        new ArcadeBonus({ "effect": "+{% AFK Gains Rate", "x1": 4, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Rate", "index": 6 }),
        new ArcadeBonus({ "effect": "+{ Cap for all Liquids", "x1": 25, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{ Cap", "index": 7 }),
        new ArcadeBonus({ "effect": "+{% Multikill per Tier", "x1": 10, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Multikill", "index": 8 }),
        new ArcadeBonus({ "effect": "+{% Catching EXP gain", "x1": 50, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Catch EXP", "index": 9 }),
        new ArcadeBonus({ "effect": "+{% Cash from Mobs", "x1": 20, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Cash", "index": 10 }),
        new ArcadeBonus({ "effect": "+{% Cash from Mobs", "x1": 30, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Cash", "index": 11 }),
        new ArcadeBonus({ "effect": "+{% Class EXP gain", "x1": 20, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% EXP", "index": 12 }),
        new ArcadeBonus({ "effect": "+{% Shiny Chance", "x1": 100, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Chance", "index": 13 }),
        new ArcadeBonus({ "effect": "+{% Trapping EXP", "x1": 50, "x2": 100, "func": "decay", "type": "%", "lvlUpText": "+{% Trap EXP", "index": 14 }),
        new ArcadeBonus({ "effect": "+{ Starting TD Pts", "x1": 1, "x2": 0, "func": "add", "type": "", "lvlUpText": "+{ Worship Pts", "index": 15 }),
        new ArcadeBonus({ "effect": "+{ Tab 1 Talent Pt", "x1": 1, "x2": 10, "func": "intervalAdd", "type": "", "lvlUpText": "+{ Talent Pt", "index": 16 }),
        new ArcadeBonus({ "effect": "+{ Weapon Power", "x1": 0.07, "x2": 0, "func": "add", "type": "", "lvlUpText": "+{ Wep POW", "index": 17 }),
    ]
}

export default function parseArcade(bonusArray: number[], optionList: number[]) {
    const arcade = new Arcade();

    bonusArray.forEach((level, index) => {
        if (index < arcade.bonuses.length) {
            arcade.bonuses[index].level = level;
        }
    });

    arcade.balls = optionList[74];
    arcade.goldBalls = optionList[75];

    return arcade;
}