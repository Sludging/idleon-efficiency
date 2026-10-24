import { Breeding } from '../../../data/domain/world-4/breeding';
import {
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

type ArenaBonusUnlock = {
  index: number;
  unlocked: number;
};

const extractionResultsName = 'breeding-data.json';
const bonusIndices = Array.from({ length: 16 }, (_, index) => index);

describe('Breeding Arena and Crucible bonus unlocks', () => {
  let breeding: Breeding;
  let arenaBonuses: ArenaBonusUnlock[];
  let crucibleBonuses: ArenaBonusUnlock[];

  beforeAll(() => {
    const extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    arenaBonuses = extractionResults.extractions['arena_bonuses'].result as ArenaBonusUnlock[];
    crucibleBonuses = extractionResults.extractions['crucible_bonuses'].result as ArenaBonusUnlock[];
    breeding = loadGameDataFromSave('latest').get('breeding') as Breeding;
  });

  it('covers all 16 native Arena bonus records', () => {
    expect(arenaBonuses).toHaveLength(16);
  });

  it('covers all 16 native Crucible bonus records', () => {
    expect(crucibleBonuses).toHaveLength(16);
  });

  it.each(bonusIndices)('matches Arena bonus %i unlock status with the game', index => {
    const expected = arenaBonuses.find(bonus => bonus.index === index);
    if (!expected) throw new Error(`Native Arena bonus record ${index} not found`);

    expect(Number(breeding.hasBonus(index))).toMatchLiveGameWithDetails(expected.unlocked, {
      tolerance: 0,
      context: `Arena bonus ${index} unlock status`,
      debugInfo: {
        index,
        arenaWave: breeding.arenaWave,
      },
    });
  });

  it.each(bonusIndices)('matches Crucible bonus %i unlock status with the game', index => {
    const expected = crucibleBonuses.find(bonus => bonus.index === index);
    if (!expected) throw new Error(`Native Crucible bonus record ${index} not found`);

    expect(breeding.getCrucibleBonus(index)).toMatchLiveGameWithDetails(expected.unlocked, {
      tolerance: 0,
      context: `Crucible bonus ${index} unlock status`,
      debugInfo: { index },
    });
  });
});
