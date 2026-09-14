/**
 * Companions level-aware bonus validation.
 *
 * The paired save owns companion 44 through its legacy numeric companion list.
 * The test loader adapts that input to an owned level-one state, so the live
 * comparisons cover the base effect and the game's disabled level-two effect.
 * Controlled catalog clones cover the positive metadata branch without
 * inventing a positive live extraction.
 *
 * @testCovers getCompanionBonus
 */

import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  Companion,
  getCompanionBonus,
} from '../../../data/domain/companions';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';

const saveName = 'latest';
const extractionResultsName = 'friend-bonus-stats-data.json';

const cloneCompanion44 = (
  companions: Companion[],
  state: Pick<Companion, 'owned' | 'level'>,
): Companion => {
  const companion = companions.find(companion => companion.id === 44);
  if (!companion) {
    throw new Error('Companion 44 is missing from the initialized catalog');
  }

  // Clone catalog metadata, including bonus2, while changing only account state.
  return {
    ...companion,
    ...state,
    data: { ...companion.data, bonus2: companion.data.bonus2 },
  };
};

describe('Companions Domain - Level-aware Bonus', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  it('matches the game level-one metadata bonus for owned companion 44', () => {
    const liveLevelOneBonus = getExtractedValue(extractionResults, 'friend_bonus_companion_44');
    const companions = gameData.get('companions') as Companion[];

    expect(getCompanionBonus(companions, 44)).toMatchLiveGameWithDetails(liveLevelOneBonus, {
      tolerance: 0,
      context: 'Companion 44 level-one metadata bonus',
    });
  });

  it('matches the game level-two state for owned companion 44', () => {
    const liveLevelTwoState = getExtractedValue(extractionResults, 'friend_bonus_companion_lv2_44');
    const companions = gameData.get('companions') as Companion[];

    expect(getCompanionBonus(companions, 44, 2)).toMatchLiveGameWithDetails(liveLevelTwoState, {
      tolerance: 0,
      context: 'Companion 44 level-two bonus state',
    });
  });

  it('selects level-two metadata only for an owned level-two companion', () => {
    const companions = gameData.get('companions') as Companion[];
    const levelTwoCompanion = cloneCompanion44(companions, { owned: true, level: 2 });

    // The no-selector and level-one calls retain the base Friend Bonus effect.
    expect(getCompanionBonus([levelTwoCompanion], 44)).toBe(levelTwoCompanion.data.bonus);
    expect(getCompanionBonus([levelTwoCompanion], 44, 1)).toBe(levelTwoCompanion.data.bonus);
    expect(getCompanionBonus([levelTwoCompanion], 44, 2)).toBe(levelTwoCompanion.data.bonus2);
  });

  it('returns no companion effect for unowned level-one and level-two states', () => {
    const companions = gameData.get('companions') as Companion[];
    const unownedLevelOne = cloneCompanion44(companions, { owned: false, level: 1 });
    const unownedLevelTwo = cloneCompanion44(companions, { owned: false, level: 2 });

    expect(getCompanionBonus([unownedLevelOne], 44)).toBe(0);
    expect(getCompanionBonus([unownedLevelTwo], 44, 2)).toBe(0);
  });

  it('normalizes legacy numeric ownership and keeps the highest duplicate level', () => {
    // Numeric entries adapt to owned level-one records; canonical objects use
    // membership for ownership and duplicate records retain their max level.
    expect(normalizeCompanionStates([44])).toEqual([{ id: 44, level: 1 }]);
    expect(normalizeCompanionStates([
      { id: 44, level: 2 },
      44,
      { id: 44, level: 1 },
    ])).toEqual([{ id: 44, level: 2 }]);
  });
});
