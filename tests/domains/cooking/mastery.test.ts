import { Cooking } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type MasteryCapture = {
  level: number;
  nativeRank: number;
  unlockTier: number;
  unlocked: boolean;
  totalLadles: number;
  experienceRequired: number;
  purplePoints: { total: number; spent: number; available: number };
  yellowPoints: { total: number; spent: number; available: number };
  context: { totalLadles: number; totalCookingLevels: number; divorceCakeLevel: number; totalRibbonRanks: number; nativeRank: number };
  upgrades: { index: number; level: number; unlocked: boolean; coefficient: number; effect: number }[];
};

describe('Cooking Mastery account progression', () => {
  let cooking: Cooking;
  let expected: MasteryCapture;
  let savedExperience: number;
  let nativeRate: number;
  const compare = (actual: number, native: number, context: string) => {
    expect(actual).toMatchLiveGameWithDetails(native, { tolerance: 0, context });
  };

  beforeAll(() => {
    const results = loadExtractionResults('cooking-mastery-data.json');
    const rateResults = loadExtractionResults('cooking-mastery-experience-data.json');
    validateExtractionHealth(results);
    validateExtractionHealth(rateResults);
    expected = results.extractions.cooking_mastery.result;
    nativeRate = getExtractedValue(rateResults, 'cooking_mastery_experience_rate');
    const savedMastery = loadTestSave('latest').get('CookMaster');
    const savedRows: (number | string)[][] = typeof savedMastery === 'string'
      ? JSON.parse(savedMastery)
      : savedMastery;
    savedExperience = Number(savedRows[1][1]);
    cooking = loadGameDataFromSave('latest').get('cooking') as Cooking;
  });

  it('keeps progression level, native rank and upgrade unlock tier distinct', () => {
    compare(cooking.mastery.rank, expected.level, 'Existing Mastery progression index');
    compare(cooking.mastery.getLevel(), expected.level, 'Mastery level');
    compare(cooking.mastery.getNativeRank(), expected.nativeRank, 'Native Mastery rank');
    compare(cooking.mastery.unlockTier, expected.unlockTier, 'Mastery upgrade unlock tier');
    expect(cooking.mastery.unlocked).toBe(expected.unlocked);
  });

  it('matches saved EXP, lifetime ladles and the native next-level threshold', () => {
    // Runtime EXP can advance after the retained save. Saved progress remains authoritative.
    compare(cooking.mastery.experience, savedExperience, 'Saved Mastery EXP');
    compare(cooking.mastery.totalLadles, expected.totalLadles, 'Lifetime ladles used');
    compare(cooking.mastery.getExperienceRequired(), expected.experienceRequired, 'Next Mastery level EXP requirement');
  });

  it('projects seconds to next level from saved progress and native EXP per hour', () => {
    const expectedSeconds = expected.unlocked && nativeRate > 0
      ? Math.max(0, expected.experienceRequired - savedExperience) / nativeRate * 3600
      : null;
    const seconds = cooking.mastery.getTimeToNextLevelSeconds();
    if (expectedSeconds === null) {
      expect(seconds).toBeNull();
    } else {
      expect(seconds).not.toBeNull();
      compare(seconds!, expectedSeconds, 'Seconds to next Mastery level at unchanged bonuses');
    }
  });

  it('matches total, spent and remaining purple and yellow points', () => {
    for (const pool of ['purplePoints', 'yellowPoints'] as const) {
      for (const quantity of ['total', 'spent', 'available'] as const) {
        compare(cooking.mastery[pool][quantity], expected[pool][quantity], `${pool} ${quantity}`);
      }
    }
  });

  it('matches all six contextual upgrade effects and observed unlock states', () => {
    expect(cooking.mastery.upgrades).toHaveLength(expected.upgrades.length);
    for (const row of expected.upgrades) {
      const upgrade = cooking.mastery.upgrades[row.index];
      const context = `Mastery upgrade ${upgrade.data.name}`;
      compare(upgrade.level, row.level, `${context} saved level`);
      compare(upgrade.getBonus(), row.coefficient, `${context} allocated coefficient`);
      compare(upgrade.getContextualBonus(), row.effect, `${context} current account effect`);
      expect(upgrade.unlocked).toBe(row.unlocked);
      for (const key of ['totalLadles', 'totalCookingLevels', 'divorceCakeLevel', 'totalRibbonRanks', 'nativeRank'] as const) {
        compare(upgrade.context[key], expected.context[key], `${context} ${key}`);
      }
    }
  });
});
