import { Cooking } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const extractionResultsName = 'cooking-mastery-experience-data.json';

describe('Cooking Mastery EXP per hour', () => {
  let extractionResults: ExtractionResults;
  let cooking: Cooking;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    cooking = loadGameDataFromSave('latest').get('cooking') as Cooking;
  });

  it('matches raw account Mastery EXP per hour with the game', () => {
    const expected = getExtractedValue(extractionResults, 'cooking_mastery_experience_rate');

    expect(cooking.getMasteryExperienceRate()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Raw account Cooking Mastery EXP per hour',
      debugInfo: { unit: 'EXP/hour', scope: 'account' },
    });
  });

  it('matches ordered account multipliers, impacts and the final additive group', () => {
    const expected = extractionResults.extractions.cooking_mastery_experience_breakdown.result as {
      base: number;
      factors: { source: string; percent: number; multiplier: number; active: boolean; impact: number }[];
      additiveBonuses: { source: string; percent: number; active: boolean; share: number }[];
      additivePercent: number;
      additiveMultiplier: number;
    };
    const actual = cooking.mastery.experienceBreakdown;
    const compare = (value: number, native: number, context: string) => {
      expect(value).toMatchLiveGameWithDetails(native, { tolerance: 0, context });
    };

    compare(actual.base, expected.base, 'Mastery EXP base');
    expect(actual.factors.map(row => row.source)).toEqual(expected.factors.map(row => row.source));
    for (const row of expected.factors) {
      const source = actual.factors.find(candidate => candidate.source === row.source)!;
      expect(source.active).toBe(row.active);
      for (const key of ['percent', 'multiplier', 'impact'] as const) {
        compare(source[key], row[key], `Mastery EXP ${row.source} ${key}`);
      }
    }
    expect(actual.additiveBonuses.map(row => row.source)).toEqual(expected.additiveBonuses.map(row => row.source));
    for (const row of expected.additiveBonuses) {
      const source = actual.additiveBonuses.find(candidate => candidate.source === row.source)!;
      expect(source.active).toBe(row.active);
      compare(source.percent, row.percent, `Mastery EXP additive ${row.source}`);
      compare(source.share, row.share, `Mastery EXP additive share ${row.source}`);
    }
    compare(actual.additivePercent, expected.additivePercent, 'Mastery EXP grouped additive percentage');
    compare(actual.additiveMultiplier, expected.additiveMultiplier, 'Mastery EXP grouped additive multiplier');
  });
});
