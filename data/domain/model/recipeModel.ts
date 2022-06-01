import { ComponentModel } from './componentModel';
import { DetailedRecipeModel } from './detailedRecipeModel';
import { SourceModel } from './sourceModel';

export interface RecipeModel {
    intID: string,
    recipe: ComponentModel[],
    levelReqToCraft: number,
    expGiven: number,
    no: number,
    tab: number,
    sellPrice?: number,
    recipeFrom?: SourceModel[],
    detailedRecipe?: DetailedRecipeModel
}
