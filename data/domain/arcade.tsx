import { lavaFunc, range } from "../utility"
import { Achievement } from "./achievements";
import { ArcadeBonusBase, initArcadeBonusRepo } from "./data/ArcadeBonusRepo";
import { ImageData } from "./imageData";
import { ArcadeBonusModel } from "./model/arcadeBonusModel";

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

export class ArcadeBonus {
    effect: string
    x1: number
    x2: number
    func: string
    type: string
    lvlUpText: string

    level: number = 0;

    constructor(public index: number, data: ArcadeBonusModel) {
        this.effect = data.effect;
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.func = data.func;
        this.type = data.type;
        this.lvlUpText = data.lvlUpText;
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
    bonuses: ArcadeBonus[] = [];
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

    static fromBase = (data: ArcadeBonusBase[]) => {
        const toReturn = new Arcade();
        toReturn.bonuses = data.map((bonus => new ArcadeBonus(bonus.index, bonus.data)))
        return toReturn;
    }
}

export default function parseArcade(bonusArray: number[], optionList: number[]) {
    const arcade = Arcade.fromBase(initArcadeBonusRepo());

    bonusArray.forEach((level, index) => {
        if (index < arcade.bonuses.length) {
            arcade.bonuses[index].level = level;
        }
    });

    arcade.balls = optionList[74];
    arcade.goldBalls = optionList[75];

    return arcade;
}