import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';

import { Poppy } from '../../../data/domain/world-2/poppy';

const saveName = 'latest';
const extractionResultsName = 'poppy-global-bonus-data.json';

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
    description: 'Owned Companion 51 clicker effect for Orion, Poppy, and Bubba bonuses at its saved active level',
    extractionKey: 'companion_51_bonus',
    domainExtractor: (gameData: Map<string, any>) =>
      getCompanionActiveBonus(gameData.get('companions') as Companion[], 51),
  },
  global_bonus_multi: {
    description: 'Poppy global bonus multiplier from Roo Megafeathers',
    extractionKey: 'global_bonus_multi',
    domainExtractor: (gameData: Map<string, any>) =>
      (gameData.get('poppy') as Poppy).getGlobalBonusMulti(),
  },
};

describe('Poppy Domain - Global Bonus - Parameters', () => {
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


