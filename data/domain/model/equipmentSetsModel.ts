

export interface EquipmentSetsModel {
    name: string,
    armors: string[],
    tools: string[],
    weapons: string[],
    toolsRequired: number,
    weaponRequired: boolean,
    bonusValue: number,
    description: string,
    displayOrder: number
}
