const SkullChargeMap: Record<string, number> = {
    "WorshipSkull1": 100,
    "WorshipSkull2": 200,
    "WorshipSkull3": 400,
    "WorshipSkull4": 750,
    "WorshipSkull5": 1250
}

const SkullSpeedMap: Record<string, number> = {
    "WorshipSkull1": 4,
    "WorshipSkull2": 5,
    "WorshipSkull3": 5,
    "WorshipSkull4": 6,
    "WorshipSkull5": 7
}

export class Worship {
    currentCharge: number = 0;

    constructor() { }

    getEstimatedCharge = (chargeRate: number, maxCharge: number, timeAwayInSeconds: number) => {
        return Math.min(this.currentCharge + chargeRate * (timeAwayInSeconds / 3600), maxCharge);
    }

    getChargeRate = (skullInternalName: string, worshipLevel: number = 0, popeRate: number = 0, cardBonus: number = 0, stampBonus: number = 0, talentBonus: number = 0) => {
        const skullSpeed = SkullSpeedMap[skullInternalName];
        const speedMath = 0.2 * Math.pow(skullSpeed, 1.3);
        const levelMath = (0.9 * Math.pow(worshipLevel, 0.5)) / (Math.pow(worshipLevel, 0.5) + 250);
        const base = 6 / Math.max(5.7 - (speedMath + (levelMath + (0.6 * worshipLevel) / (worshipLevel + 40))), 0.57);
        return base * Math.max(1, popeRate) * (1 + (cardBonus + stampBonus) / 100) * Math.max(talentBonus, 1)
    }

    getMaxCharge = (skullInternalName: string, cardBonus: number = 0, buffBonus: number = 0, stampBonus: number = 0, alchemyBonus: number = 0, worshipLevel: number = 0, popeRate: number = 0) => {
        const skullChargeBonus = SkullChargeMap[skullInternalName];
        const base = buffBonus + (stampBonus + alchemyBonus * Math.floor(worshipLevel / 10));
        return Math.floor(Math.max(50, cardBonus + (base + skullChargeBonus * Math.max(popeRate, 1))));
    }
}