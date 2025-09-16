

export interface EquipmentSetsModel {
    name: string,
    armors: string[],
    tools: string[],
    weapons: string[],
    toolsRequired: boolean,
    weaponRequired: boolean,
    bonusValue: number,
    description: string,
    displayOrder: number
}
