interface BonusInfo {
    item: string
    desc: string
    baseCost: number
    increment: number
    baseBonus: number
    maxLevel: number
    level?: number
}

const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

export class SaltLick {
    bonuses: BonusInfo[] = initBonuses()

    constructor() {}

    getBonus = (bonusIndex: number, round: boolean = false) => {
        const bonus = this.bonuses[bonusIndex];
        return bonus.baseBonus * (bonus.level ?? 0);
    }

    getCost = (bonusIndex: number, level?: number) => {
        const bonus = this.bonuses[bonusIndex];
        if (level) {
            return Math.floor(bonus.baseCost * Math.pow(bonus.increment, level));    
        }
        return Math.floor(bonus.baseCost * Math.pow(bonus.increment, bonus.level ?? 0));
    }

    getCostToMax = (bonusIndex: number) => {
        const bonus = this.bonuses[bonusIndex];
        let totalCost = 0;
        range((bonus.level ?? 0) + 1, bonus.maxLevel).forEach((level, _) => {
            totalCost += this.getCost(bonusIndex, level);
        });

        return totalCost;
    }

    getBonusText = (bonusIndex: number) => {
        const bonus = this.bonuses[bonusIndex];
        return bonus.desc.replace("{", this.getBonus(bonusIndex).toString());
    }
}

const initBonuses = (): BonusInfo[] => {
    return [
        {"item": "Refinery1", "desc": "Samples taken for the 3D printer are +{% bigger!", "baseCost": 5, "increment": 1.5, "baseBonus": 0.5, "maxLevel": 20},
        {"item": "Critter1", "desc": "+4 Obol storage slots per upgrade! Circle, Square, Hexagon, then Sparkle, in that order.", "baseCost": 100, "increment": 1.92, "baseBonus": 1, "maxLevel": 8},
        {"item": "Refinery2", "desc": "+{% Refinery Speed for all cycle types. In other words, cycles take less time.", "baseCost": 5, "increment": 2.2, "baseBonus": 2, "maxLevel": 10},
        {"item": "Soul2", "desc": "+{% Class EXP and Skill EXP. Not really sure what those blobulytes do with these souls...", "baseCost": 250, "increment": 1.3, "baseBonus": 0.2, "maxLevel": 100},
        {"item": "Refinery3", "desc": "+{ Max level for talent books from the library. RNG be with you!", "baseCost": 5, "increment": 2.2, "baseBonus": 2, "maxLevel": 10},
        {"item": "Critter4", "desc": "+{% Liquid rate and Capacity for all liquids in Alchemy.", "baseCost": 100, "increment": 1.2, "baseBonus": 1, "maxLevel": 100},
        {"item": "Refinery4", "desc": "+{% Points Earned during Worship Tower Defense from killing monsters.", "baseCost": 5, "increment": 2, "baseBonus": 5, "maxLevel": 10},
        {"item": "Soul4", "desc": "+{% Movement Speed. Doesn't work if you're above 170% move speed already.", "baseCost": 100, "increment": 1.3, "baseBonus": 0.4, "maxLevel": 25},
        {"item": "Refinery5", "desc": "+{% Multikill Rate for all worlds. All of them!", "baseCost": 5, "increment": 2.2, "baseBonus": 3, "maxLevel": 10},
        {"item": "Critter6", "desc": "+{% Total Damage dealt.", "baseCost": 250, "increment": 1.1, "baseBonus": 0.1, "maxLevel": 250},
    ]
};


export default function parseSaltLick(rawData: number[]) {
    const saltLick = new SaltLick();
    if (rawData) {
        rawData.forEach((bonus, index) => { // for each prayer
            if (index < saltLick.bonuses.length) { // ignore unknown values.
                saltLick.bonuses[index].level = bonus;
            }
        });
    }
    return saltLick;
}