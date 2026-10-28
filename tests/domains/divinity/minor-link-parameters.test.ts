/**
 * Directly compares calculations used by Divinity minor links with the saved
 * game's values; these inputs determine the linked player's displayed bonus.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Alchemy } from '../../../data/domain/alchemy';
import { CoralKid } from '../../../data/domain/world-7/coralKid';

const saveName = 'latest';
const extractionResultsName = 'divinity-minor-link-data.json';

const parameterSpecs = {
  alchemy_bubble_y2active: {
    description: 'Effective Big P multiplier that increases linked-god passive bonuses',
    extractionKey: 'alchemy_bubble_y2active',
    domainExtractor: (gameData: Map<string, any>) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return Math.max(1, alchemy.getBubbleBonusForKey("Y2ACTIVE"));
    }
  },

  clamworks_bonus_3: {
    description: 'Clamworks Multikill multiplier input to the linked-player passive bonus',
    extractionKey: 'clamworks_bonus_3',
    domainExtractor: (gameData: Map<string, any>) => {
      const coralKid = gameData.get("coralKid") as CoralKid;
      return coralKid.getBonusFromIndex(3);
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
