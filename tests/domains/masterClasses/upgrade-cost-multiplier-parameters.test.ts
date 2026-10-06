import type { ExtractionResults } from '../../utils/live-game-data-loader';
import type { ParameterTestSpec } from '../../utils/parameter-test-config';
import type { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'masterclasses-upgrade-cost-multiplier-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  daily_shopping_spree_allowance: {
    description: 'Daily Shopping Spree allowance for daily cheap Masterclass upgrades',
    extractionKey: 'daily_shopping_spree_allowance',
    domainExtractor: (gameData: Map<string, unknown>): number => {
      const legendTalents = gameData.get('legendTalents') as LegendTalents;
      return legendTalents.getBonusFromIndex(23);
    },
  },
  bargain_bonus: {
    description: 'Bargain bonus reducing the whole Masterclass upgrade cost multiplier',
    extractionKey: 'bargain_bonus',
    domainExtractor: (gameData: Map<string, unknown>): number => {
      const royalArmory = gameData.get('royalArmory') as RoyalArmory;
      return royalArmory.getOrbletMarketBonus(7);
    },
  },
};

describe('Master Classes - upgrade cost multiplier - direct parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, unknown>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.values(parameterSpecs).forEach(spec => {
    it(`matches the game's ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      expect(spec.domainExtractor(gameData)).toMatchLiveGame(liveValue, 0);
    });
  });
});
