import { AbilityTypeEnum } from '../enum/abilityTypeEnum';

export interface PetGeneModel {
    name: string,
    abilityType: AbilityTypeEnum,
    x2: number,
    lowerLetter: string,
    upperLetter: string,
    description: string,
    combatDescription: string
}
