import { Cooking } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type DailyCapture = {
  dailyGenerationUnlocked: boolean;
  dailyCount: number;
  minimumDailyCount: number;
  maximumDailyCount: number;
  dailyRankProbabilities: { rank: number; probability: number }[];
  averageDailyRank: number;
};

describe('Daily Cooking ribbons', () => {
  let cooking: Cooking;
  let expected: DailyCapture;
  const compare = (actual: number, captured: number, context: string) => {
    expect(actual).toMatchLiveGameWithDetails(captured, { tolerance: 0, context });
  };

  beforeAll(() => {
    const results = loadExtractionResults('cooking-daily-ribbons-data.json');
    validateExtractionHealth(results);
    expected = results.extractions.cooking_daily_ribbons.result;
    const gameData = loadGameDataFromSave('latest');
    cooking = gameData.get('cooking') as Cooking;
  });

  it('matches daily ribbon unlocks, average quantity and quantity range using the highest account-wide talent bonus', () => {
    expect(cooking.ribbons.dailyGenerationUnlocked).toBe(expected.dailyGenerationUnlocked);
    const quantity = cooking.ribbons.dailyQuantity;
    compare(quantity.dailyCount, expected.dailyCount, 'Average daily ribbons with the highest account-wide Ribbon Winning bonus');
    compare(quantity.minimumDailyCount, expected.minimumDailyCount, 'Minimum daily ribbon quantity');
    compare(quantity.maximumDailyCount, expected.maximumDailyCount, 'Maximum daily ribbon quantity');
  });

  it('matches exact rank probabilities and average rank', () => {
    const probabilities = cooking.ribbons.dailyRankProbabilities;
    expect(probabilities.map(row => row.rank)).toEqual(expected.dailyRankProbabilities.map(row => row.rank));
    for (const row of expected.dailyRankProbabilities) {
      const actual = probabilities.find(candidate => candidate.rank === row.rank)!;
      compare(actual.probability, row.probability, `Probability of daily ribbon rank ${row.rank}`);
    }
    compare(cooking.ribbons.averageDailyRank, expected.averageDailyRank, 'Average daily ribbon rank');
  });
});
