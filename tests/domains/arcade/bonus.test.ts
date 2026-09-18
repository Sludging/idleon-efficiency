/**
 * Arcade bonus calculation tests.
 *
 * The paired save exercises the evolved companion 27 branch on an unmaxed
 * Prisma bonus (54) and has two real max-level entries. Index 8 is the
 * representative max-level comparison below; the source gate is exact level
 * 101, not every level at or above 101.
 *
 * The synthetic cases keep the source-backed multiplier boundaries visible
 * without inventing live save state. They use initialized Arcade/Companion
 * objects and the normal companion-impact update to drive getBonus.
 *
 * @testCovers ArcadeBonus.getBonus
 */

import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Arcade } from '../../../data/domain/world-2/arcade';

const saveName = 'latest';
const extractionResultsName = 'arcade-bonus-data.json';

const liveBonusCases = [
  {
    index: 54,
    extractionKey: 'arcade_bonus_54',
    description: 'unmaxed Prisma Bonuses bonus with evolved companion 27',
  },
  {
    index: 8,
    extractionKey: 'arcade_bonus_8',
    description: 'real max-level Multikill per Tier bonus',
  },
] as const;

describe('Arcade Domain - Bonus Calculations', () => {
  let extractionResults: ExtractionResults;
  let arcade: Arcade;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave(saveName);
    arcade = gameData.get('arcade') as Arcade;

    if (!arcade) {
      throw new Error('Arcade domain not found in save data');
    }
  });

  liveBonusCases.forEach(({ index, extractionKey, description }) => {
    it(`matches the game ${description} at index ${index}`, () => {
      const bonus = arcade.bonuses.find(candidate => candidate.index === index);
      if (!bonus) {
        throw new Error(`Arcade bonus ${index} is missing from save data`);
      }

      const liveValue = getExtractedValue(extractionResults, extractionKey);
      expect(bonus.getBonus()).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Arcade bonus ${index} (${description})`,
        debugInfo: {
          saveName,
          level: bonus.level,
        },
      });
    });
  });
});
