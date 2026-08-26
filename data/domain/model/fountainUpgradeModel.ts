

export interface FountainUpgradeModel {
    waterIndex: number,
    index: number,
    name: string,
    prerequisiteIndex: number,
    uiPosition: string,
    costCurrencyIndex: number,
    baseCost: number,
    costMultiplier: number,
    bonusPerLevel: number,
    description: string,
    marbleizeEligible: boolean
}
