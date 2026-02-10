import { round } from '../../../utility';
import { Domain, RawData } from '../../base/domain';
import { initSaltLickRepo, SaltLickBase } from '../../data/SaltLickRepo';
import { Item } from '../../items';
import { SaltLickModel } from '../../model/saltLickModel';

const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

export class SaltLickBonus {
    level: number = 0

    constructor(public index: number, public data: SaltLickModel) { }

    static fromBase = (data: SaltLickBase[]) => {
        return data.map(bonus => new SaltLickBonus(bonus.index, bonus.data));
    }
}

export class SaltLick extends Domain {
    bonuses: SaltLickBonus[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "SaltLick", perPlayer: false, default: [] }
        ]
    }
    init(_allItems: Item[], _charCount: number) {
        this.bonuses = SaltLickBonus.fromBase(initSaltLickRepo());
        return this;
    }
    parse(data: Map<string, any>): void {
        const saltLick = data.get(this.getDataKey()) as SaltLick;
        const rawData = data.get("SaltLick") as number[];

        rawData.forEach((bonus, index) => { // for each salt lick bonus
            if (index < saltLick.bonuses.length) { // ignore unknown values.
                saltLick.bonuses[index].level = bonus;
            }
        });
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
