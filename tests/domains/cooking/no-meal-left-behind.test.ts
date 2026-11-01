import { Cooking } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type NoMealLeftBehindCapture = {
  enabled: boolean;
  dailyMealCount: number;
  dailyLevelGain: number;
  jadeUpgradeOwned: boolean;
  bundleOwned: boolean;
  targetMealIndex: number | null;
  currentLevel: number | null;
  nextLevel: number | null;
  effectiveLevelGain: number;
  minimumMealLevel: number;
  levelLimit: number;
  maximumMealLevel: number;
  mealLevels: number[];
};

describe('Cooking No Meal Left Behind', () => {
  let cooking: Cooking;
  let expected: NoMealLeftBehindCapture;

  const compare = (actual: number | null, native: number | null, context: string) => {
    if (native === null) {
      expect(actual).toBeNull();
      return;
    }

    expect(actual).toMatchLiveGameWithDetails(native, { tolerance: 0, context });
  };

  beforeAll(() => {
    const results = loadExtractionResults('cooking-no-meal-left-behind-data.json');
    validateExtractionHealth(results);
    expected = results.extractions.cooking_no_meal_left_behind.result;
    cooking = loadGameDataFromSave('latest').get('cooking') as Cooking;
  });

  it('matches the daily upgrade unlock and both level-grant sources', () => {
    for (const key of ['enabled', 'jadeUpgradeOwned', 'bundleOwned'] as const) {
      expect(cooking.noMealLeftBehind[key]).toBe(expected[key]);
    }
  });

  it('matches configured daily meal count, level gain and eligible level limits', () => {
    for (const key of ['dailyMealCount', 'dailyLevelGain', 'minimumMealLevel', 'levelLimit'] as const) {
      compare(cooking.noMealLeftBehind[key], expected[key], `No Meal Left Behind ${key}`);
    }
  });

  it('matches the next awarding target, current level, next level and effective free levels', () => {
    for (const key of ['targetMealIndex', 'currentLevel', 'nextLevel', 'effectiveLevelGain'] as const) {
      compare(cooking.noMealLeftBehind[key], expected[key], `No Meal Left Behind ${key}`);
    }
  });

  it('uses the captured save state and marks only the daily upgrade target', () => {
    for (const meal of cooking.meals) {
      compare(meal.level, expected.mealLevels[meal.mealIndex], `${meal.name} saved meal level`);
      compare(meal.maxLevel, expected.maximumMealLevel, `${meal.name} account meal level cap`);
      expect(meal.noMealLeftBehindAffected).toBe(meal.mealIndex === expected.targetMealIndex);
    }
  });
});
