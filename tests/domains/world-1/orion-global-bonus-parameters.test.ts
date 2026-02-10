/**
 * Orion Global Bonus Parameter Validation
 *
 * Tests our Orion global bonus parameter calculations against live game data.
 *
 * Formula for each bonus:
 *   baseValue * (1 + legendTalent26 / 100) * (1 + companion51) * (1 + owlBonusAll / 100)
 *     * Math.max(0, Math.ceil((upgradeLevel1 - index) / 6))
 *
 * Where owlBonusAll (megafeather multiplier):
 *   100*megafeather(1) + 100*megafeather(3) + 100*megafeather(5) + 100*megafeather(7)
 *     + 100*min(1, megafeather(9)) + 50*max(0, megafeather(9) - 1)
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Companion } from '../../../data/domain/companions';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';

const saveName = 'latest';
const extractionResultsName = 'orion-global-bonus-data.json';

const parameterSpecs = {
  legend_talent_26_bonus: {
    description: 'Legend talent 26 bonus (Furry Friends Forever)',
    extractionKey: 'legend_talent_26_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(26);
    }
  },

  companion_51_bonus: {
    description: 'Companion 51 bonus (clicker bonus multiplier)',
    extractionKey: 'companion_51_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const companions = gameData.get("companions") as Companion[];
      const companion51 = companions.find(c => c.id === 51);
      return companion51?.owned ? companion51.data.bonus : 0;
    }
  },
};

describe('Orion Domain - Global Bonus - Parameters', () => {
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
