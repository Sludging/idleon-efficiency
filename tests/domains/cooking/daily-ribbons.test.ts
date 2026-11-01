import { Cooking } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type Contribution = { source: string; amount: number; active: boolean; share: number };
type DailyCapture = {
  dailyGenerationUnlocked: boolean;
  dailyCount: number;
  minimumDailyCount: number;
  maximumDailyCount: number;
  dailyCountBreakdown: {
    sources: (Contribution & { group: 'base' | 'additional' })[];
    baseTotal: number;
    additionalTotal: number;
    additiveTotal: number;
    meritocracyMultiplier: number;
    meritocracyImpact: number;
    expectedRawCount: number;
    roundingAdjustment: number;
    total: number;
  };
  dailyRankProbabilities: { rank: number; probability: number }[];
  averageDailyRank: number;
  dailyRankBreakdown: {
    sources: Contribution[];
    beforeOverflow: number;
    overflowAdjustment: number;
    total: number;
  };
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

  it('matches generation availability and website account-best expected quantity and random daily range', () => {
    expect(cooking.ribbons.dailyGenerationUnlocked).toBe(expected.dailyGenerationUnlocked);
    const quantity = cooking.ribbons.dailyQuantity;
    compare(quantity.dailyCount, expected.dailyCount, 'Website account-best expected daily ribbons');
    compare(quantity.minimumDailyCount, expected.minimumDailyCount, 'Minimum daily ribbon quantity');
    compare(quantity.maximumDailyCount, expected.maximumDailyCount, 'Maximum daily ribbon quantity');
  });

  it('matches exact finite rank probabilities and average rank', () => {
    const probabilities = cooking.ribbons.dailyRankProbabilities;
    expect(probabilities.map(row => row.rank)).toEqual(expected.dailyRankProbabilities.map(row => row.rank));
    for (const row of expected.dailyRankProbabilities) {
      const actual = probabilities.find(candidate => candidate.rank === row.rank)!;
      compare(actual.probability, row.probability, `Probability of daily ribbon rank ${row.rank}`);
    }
    compare(cooking.ribbons.averageDailyRank, expected.averageDailyRank, 'Average daily ribbon rank');
  });

  it('matches quantity source amounts, additive groups, shares and exact rounding', () => {
    const actual = cooking.ribbons.dailyQuantity.dailyCountBreakdown;
    expect(actual.sources.map(row => row.source)).toEqual(expected.dailyCountBreakdown.sources.map(row => row.source));
    for (const row of expected.dailyCountBreakdown.sources) {
      const source = actual.sources.find(candidate => candidate.source === row.source)!;
      expect(source.group).toBe(row.group);
      expect(source.active).toBe(row.active);
      compare(source.amount, row.amount, `Daily quantity source ${row.source}`);
      compare(source.share, row.share, `Daily quantity additive-group share ${row.source}`);
    }
    for (const key of ['baseTotal', 'additionalTotal', 'additiveTotal', 'meritocracyMultiplier', 'meritocracyImpact', 'expectedRawCount', 'roundingAdjustment', 'total'] as const) {
      compare(actual[key], expected.dailyCountBreakdown[key], `Daily quantity breakdown ${key}`);
    }
  });

  it('matches rank source amounts, additive shares and overflow adjustment', () => {
    const actual = cooking.ribbons.dailyRankBreakdown;
    expect(actual.sources.map(row => row.source)).toEqual(expected.dailyRankBreakdown.sources.map(row => row.source));
    for (const row of expected.dailyRankBreakdown.sources) {
      const source = actual.sources.find(candidate => candidate.source === row.source)!;
      expect(source.active).toBe(row.active);
      compare(source.amount, row.amount, `Daily rank source ${row.source}`);
      compare(source.share, row.share, `Daily rank additive share ${row.source}`);
    }
    for (const key of ['beforeOverflow', 'overflowAdjustment', 'total'] as const) {
      compare(actual[key], expected.dailyRankBreakdown[key], `Daily rank breakdown ${key}`);
    }
  });
});
