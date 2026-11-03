import { Cooking } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type RibbonCapture = {
  unlocked: boolean;
  shelf: { index: number; rank: number | null }[];
  totalRanks: number;
  ribbonedMealCount: number;
  mealCount: number;
  maxRank: number;
  lowestRank: number | null;
  highestRank: number | null;
  rankSummaries: { rank: number; mealCount: number; multiplier: number }[];
  meals: { index: number; ribbonRank: number; ribbonMultiplier: number; masteryLevel: number; masteryMultiplier: number }[];
};

describe('Cooking ribbons and meal Mastery nodes', () => {
  let cooking: Cooking;
  let expected: RibbonCapture;
  const compare = (actual: number, native: number, context: string) => {
    expect(actual).toMatchLiveGameWithDetails(native, { tolerance: 0, context });
  };

  beforeAll(() => {
    const results = loadExtractionResults('cooking-ribbons-data.json');
    validateExtractionHealth(results);
    expected = results.extractions.cooking_ribbons.result;
    cooking = loadGameDataFromSave('latest').get('cooking') as Cooking;
  });

  it('preserves shelf positions and the native shelf unlock', () => {
    expect(cooking.ribbons.unlocked).toBe(expected.unlocked);
    expect(cooking.ribbons.shelf).toEqual(expected.shelf);
  });

  it('matches equipped-ribbon totals, counts, extremes and maximum rank', () => {
    for (const key of ['totalRanks', 'ribbonedMealCount', 'mealCount', 'maxRank'] as const) {
      compare(cooking.ribbons[key], expected[key], `Equipped ribbon ${key}`);
    }
    expect(cooking.ribbons.lowestRank).toBe(expected.lowestRank);
    expect(cooking.ribbons.highestRank).toBe(expected.highestRank);
  });

  it('matches each ribbon rank multiplier and equipped-meal count', () => {
    expect(cooking.ribbons.rankSummaries).toHaveLength(expected.rankSummaries.length);
    for (const row of expected.rankSummaries) {
      const actual = cooking.ribbons.rankSummaries.find(candidate => candidate.rank === row.rank)!;
      compare(actual.mealCount, row.mealCount, `Meals holding ribbon rank ${row.rank}`);
      compare(actual.multiplier, row.multiplier, `Meal bonus multiplier at ribbon rank ${row.rank}`);
    }
  });

  it('matches saved meal ranks and Mastery nodes with their native multipliers', () => {
    // Cover each ribbon rank and Mastery level combination, including meals with neither bonus.
    const representatives = expected.meals.filter((row, index, rows) => rows.findIndex(candidate =>
      candidate.ribbonRank === row.ribbonRank && candidate.masteryLevel === row.masteryLevel) === index);
    for (const row of representatives) {
      const meal = cooking.meals[row.index];
      compare(meal.ribbonLevel, row.ribbonRank, `${meal.name} equipped ribbon rank`);
      compare(meal.getRibbonBonus(), row.ribbonMultiplier, `${meal.name} ribbon multiplier`);
      compare(meal.cookMasterLevel, row.masteryLevel, `${meal.name} Mastery node level`);
      compare(meal.getBonusMultiCook(), row.masteryMultiplier, `${meal.name} Mastery node multiplier`);
    }
  });
});
