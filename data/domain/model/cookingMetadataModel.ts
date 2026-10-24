import { CookingKitchenCostModel } from './cookingKitchenCostModel';
import { CookingRecipeOddsModel } from './cookingRecipeOddsModel';
import { CookingSpiceRecipeModel } from './cookingSpiceRecipeModel';

export interface CookingMetadataModel {
    spiceRecipes: CookingSpiceRecipeModel[],
    recipeOdds: CookingRecipeOddsModel[],
    kitchenCosts: CookingKitchenCostModel[],
    masteryRankRequirements: number[],
    maxRibbonRank: number
}
