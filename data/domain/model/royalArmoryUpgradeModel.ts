

export interface RoyalArmoryUpgradeModel {
    index: number,
    displayOrder?: number,
    name: string,
    costBase: number,
    costExponent: number,
    resourceType: number,
    maxLevel: number,
    bonusPerLevel: number,
    requiredUpgrades?: number,
    x1: number,
    x2: number,
    description: string
}
