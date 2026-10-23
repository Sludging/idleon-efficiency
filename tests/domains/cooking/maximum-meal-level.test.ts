import { initMealRepo } from '../../../data/domain/data/MealRepo';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const extractionResultsName = 'cooking-maximum-meal-level-data.json';

// The real meal catalog excludes unused allocated save slots.
const meals = initMealRepo().map(({ index, data }) => ({ index, name: data.name }));

describe('Cooking maximum meal level', () => {
  let extractionResults: ExtractionResults;
  let cooking: Cooking;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    cooking = loadGameDataFromSave('latest').get('cooking') as Cooking;
  });

  it.each(meals)('matches the account meal level cap for $name (meal $index)', ({ index, name }) => {
    const expected = getExtractedValue(extractionResults, 'cooking_maximum_meal_level');
    const meal = cooking.meals.find(candidate => candidate.mealIndex === index);
    if (!meal) throw new Error(`Cooking meal ${index} (${name}) not found`);

    expect(meal.maxLevel).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: `${name} maximum meal level`,
      debugInfo: { mealIndex: index, currentLevel: meal.level },
    });
  });
});
