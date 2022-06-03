import { ComponentModel } from './componentModel';
import { DetRecipeComponentModel } from './detRecipeComponentModel';

export interface DetailedRecipeModel {
    detRecipe: DetRecipeComponentModel[],
    detRecipeTotals?: ComponentModel[]
}
