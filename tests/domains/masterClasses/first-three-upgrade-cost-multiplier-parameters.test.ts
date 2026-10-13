import type { ExtractionResults } from '../../utils/live-game-data-loader';
import type { ParameterTestSpec } from '../../utils/parameter-test-config';
import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'masterclasses-first-three-upgrade-cost-multiplier-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  armory_upgrade_79_bonus: {
    description: 'Compounding Outposting bonus reducing upgrade costs for the first three Master Classes',
    extractionKey: 'armory_upgrade_79_bonus',
    domainExtractor: (gameData: Map<string, unknown>): number => {
      const royalArmory = gameData.get('royalArmory') as RoyalArmory;
      return royalArmory.getUpgradeBonus(79);
    },
  },
};

describe('Master Classes - first-three upgrade cost multiplier - direct parameters', () => {
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
