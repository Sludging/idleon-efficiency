import { Cooking, Meal } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

type MealCostCaptureContext = {
  mealIndex: number;
  name: string;
  currentLevel: number;
  owned: number;
};

// Turkey of Thank is the first named meal, regardless of its saved level.
const turkeyMealIndex = 0;

describe('Cooking meal next-level cost', () => {
  let meal: Meal;
  let nativeCost: number;
  let captureContext: MealCostCaptureContext;

  beforeAll(() => {
    const results = loadExtractionResults('cooking-meal-level-cost-data.json');
    validateExtractionHealth(results);
    nativeCost = getExtractedValue(results, 'cooking_meal_level_cost');
    captureContext = results.extractions.cooking_meal_level_cost_context.result;

    const cooking = loadGameDataFromSave('latest').get('cooking') as Cooking;
    const turkey = cooking.meals.find(candidate => candidate.mealIndex === turkeyMealIndex);
    if (!turkey) throw new Error('Cooking meal Turkey of Thank not found');
    meal = turkey;

    if (captureContext.mealIndex !== meal.mealIndex
      || captureContext.currentLevel !== meal.level
      || captureContext.owned !== meal.count) {
      throw new Error('Meal cost capture does not match the selected save. Extract matching results before comparing costs.');
    }
  });

  it('matches the quantity of Turkey of Thank required for its next level', () => {
    expect(meal.getMealLevelCost()).toMatchLiveGameWithDetails(nativeCost, {
      tolerance: 0,
      context: `${meal.name} cost from level ${meal.level} to ${meal.level + 1}`,
      debugInfo: {
        mealIndex: meal.mealIndex,
        currentLevel: meal.level,
        owned: meal.count,
        nativeCost,
        captureContext,
        companion162Bonus: meal.companion162Bonus,
        reducedCostToUpgrade: meal.reducedCostToUpgrade,
        foodLustDiscount: meal.foodLustDiscount,
      },
    });
  });
});
