import { CookingKitchenCostModel } from '../model/cookingKitchenCostModel';
import { CookingMetadataModel } from '../model/cookingMetadataModel';
import { CookingRecipeOddsModel } from '../model/cookingRecipeOddsModel';
import { CookingSpiceRecipeModel } from '../model/cookingSpiceRecipeModel';

export class CookingMetadataBase { constructor(public index: number, public data: CookingMetadataModel) { } }



export const initCookingMetadataRepo = () => {
    return [    
        new CookingMetadataBase(0, <CookingMetadataModel>{
                "spiceRecipes": [
                    <CookingSpiceRecipeModel>{"spiceIndex": 0, "mealIndex": 0},
                    <CookingSpiceRecipeModel>{"spiceIndex": 1, "mealIndex": 3},
                    <CookingSpiceRecipeModel>{"spiceIndex": 2, "mealIndex": 5},
                    <CookingSpiceRecipeModel>{"spiceIndex": 3, "mealIndex": 8},
                    <CookingSpiceRecipeModel>{"spiceIndex": 4, "mealIndex": 10},
                    <CookingSpiceRecipeModel>{"spiceIndex": 5, "mealIndex": 13},
                    <CookingSpiceRecipeModel>{"spiceIndex": 6, "mealIndex": 15},
                    <CookingSpiceRecipeModel>{"spiceIndex": 7, "mealIndex": 19},
                    <CookingSpiceRecipeModel>{"spiceIndex": 8, "mealIndex": 20},
                    <CookingSpiceRecipeModel>{"spiceIndex": 9, "mealIndex": 23},
                    <CookingSpiceRecipeModel>{"spiceIndex": 10, "mealIndex": 27},
                    <CookingSpiceRecipeModel>{"spiceIndex": 11, "mealIndex": 31},
                    <CookingSpiceRecipeModel>{"spiceIndex": 12, "mealIndex": 33},
                    <CookingSpiceRecipeModel>{"spiceIndex": 13, "mealIndex": 37},
                    <CookingSpiceRecipeModel>{"spiceIndex": 14, "mealIndex": 41},
                    <CookingSpiceRecipeModel>{"spiceIndex": 15, "mealIndex": 45},
                    <CookingSpiceRecipeModel>{"spiceIndex": 16, "mealIndex": 48},
                    <CookingSpiceRecipeModel>{"spiceIndex": 17, "mealIndex": 50},
                    <CookingSpiceRecipeModel>{"spiceIndex": 18, "mealIndex": 53},
                    <CookingSpiceRecipeModel>{"spiceIndex": 19, "mealIndex": 56},
                    <CookingSpiceRecipeModel>{"spiceIndex": 20, "mealIndex": 58},
                    <CookingSpiceRecipeModel>{"spiceIndex": 21, "mealIndex": 60},
                    <CookingSpiceRecipeModel>{"spiceIndex": 22, "mealIndex": 63},
                    <CookingSpiceRecipeModel>{"spiceIndex": 23, "mealIndex": 66},
                    <CookingSpiceRecipeModel>{"spiceIndex": 24, "mealIndex": 70},
                    <CookingSpiceRecipeModel>{"spiceIndex": 25, "mealIndex": 73}
                ],
                "recipeOdds": [
                    <CookingRecipeOddsModel>{"index": 0, "baseChance": 1},
                    <CookingRecipeOddsModel>{"index": 1, "baseChance": 0.2},
                    <CookingRecipeOddsModel>{"index": 2, "baseChance": 0.1},
                    <CookingRecipeOddsModel>{"index": 3, "baseChance": 0.05},
                    <CookingRecipeOddsModel>{"index": 4, "baseChance": 0.02},
                    <CookingRecipeOddsModel>{"index": 5, "baseChance": 0.01},
                    <CookingRecipeOddsModel>{"index": 6, "baseChance": 0.004},
                    <CookingRecipeOddsModel>{"index": 7, "baseChance": 0.001},
                    <CookingRecipeOddsModel>{"index": 8, "baseChance": 0.0005},
                    <CookingRecipeOddsModel>{"index": 9, "baseChance": 0.0003}
                ],
                "kitchenCosts": [
                    <CookingKitchenCostModel>{"kitchenIndex": 1, "coinCost": 8200000},
                    <CookingKitchenCostModel>{"kitchenIndex": 2, "coinCost": 75000000},
                    <CookingKitchenCostModel>{"kitchenIndex": 3, "coinCost": 400000000},
                    <CookingKitchenCostModel>{"kitchenIndex": 4, "coinCost": 8000000000},
                    <CookingKitchenCostModel>{"kitchenIndex": 5, "coinCost": 50000000000},
                    <CookingKitchenCostModel>{"kitchenIndex": 6, "coinCost": 2130000000000},
                    <CookingKitchenCostModel>{"kitchenIndex": 7, "coinCost": 60000000000000},
                    <CookingKitchenCostModel>{"kitchenIndex": 8, "coinCost": 2000000000000000},
                    <CookingKitchenCostModel>{"kitchenIndex": 9, "coinCost": 100000000000000000}
                ],
                "masteryRankRequirements": [
                    0,
                    1,
                    5,
                    10,
                    25,
                    100,
                    150,
                    250,
                    500
                ],
                "maxRibbonRank": 25
            })    
]
}
