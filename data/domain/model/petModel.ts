import { PetGeneModel } from './petGeneModel';
import { PetStatModel } from './petStatModel';
import { ShinyBonusModel } from './shinyBonusModel';

export interface PetModel {
    stats: PetStatModel,
    gene: PetGeneModel,
    shinyBonus: ShinyBonusModel
}
