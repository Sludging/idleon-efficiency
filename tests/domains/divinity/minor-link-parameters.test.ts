/**
 * Divinity Minor Link Bonus Parameter Validation
 *
 * Tests our divinity minor link bonus calculations against live game data.
 *
 * Formula:
 *   max(1, Y2ACTIVE) *
 *   ((1 + CoralKidUpgBonus(3, 0) / 100) * divinityLevel) / (60 + divinityLevel) *
 *   passiveMax
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Alchemy } from '../../../data/domain/alchemy';

const saveName = 'latest';
const extractionResultsName = 'divinity-minor-link-data.json';

const parameterSpecs = {
  alchemy_bubble_y2active: {
    description: 'Alchemy bubble Y2ACTIVE (yellow bubble 2 active)',
    extractionKey: 'alchemy_bubble_y2active',
    domainExtractor: (gameData: Map<string, any>) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("Y2ACTIVE");
    }
  },

  clamworks_bonus_3: {
    description: 'CoralKid upgrade bonus 3 (MISSING IMPLEMENTATION)',
    extractionKey: 'clamworks_bonus_3',
    domainExtractor: (_gameData: Map<string, any>) => {
      // MISSING: CoralKid is a World 7 feature without domain implementation
      // This is a game function call: CoralKidUpgBonus(3, 0)
      throw new Error("clamworks_bonus_3: NOT IMPLEMENTED - CoralKid domain missing");
    }
  },
};

describe('Divinity Domain - Minor Link Bonus - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
