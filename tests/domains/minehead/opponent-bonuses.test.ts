/**
 * Minehead opponent bonus calculations against the paired live-game extraction.
 *
 * Planning probes observed 13 defeated opponents; the refreshed paired
 * extraction must confirm which sampled indices remain earned or locked.
 * These representative normal-path samples cover an earned bonus (0), the last earned index (12), the strict
 * first-locked boundary (13), the parent Hat Rack index (21), and a late
 * placeholder index (31). The source supports all 32 opponent indices; this
 * representative set does not prove every index or every defeat transition.
 * Preview samples use each opponent's ungated base bonus for locked indices 21
 * and 31 rather than manufacturing a defeated state.
 *
 * @testCovers Minehead.getBonusFromIndex
 * @testCovers MineheadOpponent.getBaseBonus
 */

import { Minehead } from '../../../data/domain/world-7/minehead';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'minehead-data.json';

type MineheadOpponentTestSurface = {
  index: number;
  getBaseBonus?: () => number;
};

type MineheadTestSurface = Minehead & {
  getBonusFromIndex?: (index: number) => number;
  opponents?: MineheadOpponentTestSurface[];
};

const normalBonusCases = [
  {
    index: 0,
    extractionKey: 'minehead_bonus_0',
    description: 'earned first opponent bonus',
  },
  {
    index: 12,
    extractionKey: 'minehead_bonus_12',
    description: 'last earned opponent bonus before the strict boundary',
  },
  {
    index: 13,
    extractionKey: 'minehead_bonus_13',
    description: 'first locked opponent at the strict defeat boundary',
  },
  {
    index: 21,
    extractionKey: 'minehead_bonus_21',
    description: 'locked parent Hat Rack opponent bonus',
  },
  {
    index: 31,
    extractionKey: 'minehead_bonus_31',
    description: 'locked late-placeholder opponent bonus',
  },
] as const;

const previewBonusCases = [
  {
    index: 21,
    extractionKey: 'minehead_preview_21',
    description: 'parent Hat Rack opponent base bonus',
  },
  {
    index: 31,
    extractionKey: 'minehead_preview_31',
    description: 'late-placeholder opponent base bonus',
  },
] as const;

describe('Minehead Domain - Opponent Bonuses', () => {
  let extractionResults: ExtractionResults;
  let minehead: MineheadTestSurface;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);

    const gameData = loadGameDataFromSave(saveName);
    const loadedMinehead = gameData.get('minehead') as MineheadTestSurface | undefined;
    if (!loadedMinehead) {
      throw new Error('Minehead domain not found in save data');
    }
    minehead = loadedMinehead;
  });

  normalBonusCases.forEach(({ index, extractionKey, description }) => {
    it(`matches the game ${description} at index ${index}`, () => {
      const liveValue = getExtractedValue(extractionResults, extractionKey);
      if (typeof minehead.getBonusFromIndex !== 'function') {
        throw new Error(
          'MISSING SELECTED CALCULATION - Minehead.getBonusFromIndex(index) must expose Minehead("BonusQTY", index, 0)',
        );
      }
      const domainValue = minehead.getBonusFromIndex(index);

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead opponent bonus ${index} (${description})`,
      });
    });
  });

  previewBonusCases.forEach(({ index, extractionKey, description }) => {
    it(`matches the game ${description} at index ${index}`, () => {
      const liveValue = getExtractedValue(extractionResults, extractionKey);
      const opponent = minehead.opponents?.find(candidate => candidate.index === index);
      if (!opponent) {
        throw new Error(
          `MISSING SELECTED CALCULATION - Minehead opponent ${index} must expose getBaseBonus() for Minehead("BonusQTY", ${index}, 99)`,
        );
      }
      if (typeof opponent.getBaseBonus !== 'function') {
        throw new Error(
          `MISSING SELECTED CALCULATION - MineheadOpponent.getBaseBonus() must expose Minehead("BonusQTY", ${index}, 99)`,
        );
      }
      const domainValue = opponent.getBaseBonus();

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead opponent preview ${index} (${description})`,
      });
    });
  });
});
