import { round } from '../utility';
import { Cloudsave } from './cloudsave';
import { initSaltLickRepo, SaltLickBase } from './data/SaltLickRepo';
import { IParser, safeJsonParse } from './idleonData';
import { SaltLickModel } from './model/saltLickModel';

const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

export class SaltLickBonus {
    level: number = 0

    constructor(public index: number, public data: SaltLickModel) {}

    static fromBase = (data: SaltLickBase[]) => {
        return data.map(bonus => new SaltLickBonus(bonus.index, bonus.data));
    }
}

export class SaltLick {
    bonuses: SaltLickBonus[];

    constructor() {
        this.bonuses = SaltLickBonus.fromBase(initSaltLickRepo());
    }

    getBonus = (bonusIndex: number, roundResult: boolean = false) => {
        const bonus = this.bonuses[bonusIndex];
        if (roundResult) {
            return round(bonus.data.baseBonus * (bonus.level ?? 0))
        }
        return bonus.data.baseBonus * (bonus.level ?? 0);
    }

    getCost = (bonusIndex: number, level?: number) => {
        const bonus = this.bonuses[bonusIndex];
        if (level) {
            return Math.floor(bonus.data.baseCost * Math.pow(bonus.data.costInc, level));    
        }
        return Math.floor(bonus.data.baseCost * Math.pow(bonus.data.costInc, bonus.level ?? 0));
    }

    getCostToMax = (bonusIndex: number) => {
        const bonus = this.bonuses[bonusIndex];
        let totalCost = 0;
        range((bonus.level ?? 0), bonus.data.maxLevel).forEach((level, _) => {
            totalCost += this.getCost(bonusIndex, level);
        });

        return totalCost;
    }

    getBonusText = (bonusIndex: number) => {
        const bonus = this.bonuses[bonusIndex];
        return bonus.data.desc.replace("{", this.getBonus(bonusIndex, true).toString());
    }
}

export const initSaltLick = () => {
    return new SaltLick();
}

const parseSaltLick: IParser = function (raw: Cloudsave, data: Map<string, any>) {
    const saltLick = data.get("saltLick") as SaltLick;
    const rawData = safeJsonParse(raw, "SaltLick", []) as number[];

    rawData.forEach((bonus, index) => { // for each salt lick bonus
        if (index < saltLick.bonuses.length) { // ignore unknown values.
            saltLick.bonuses[index].level = bonus;
        }
    });

    data.set("saltLick", saltLick);
}

export default parseSaltLick;