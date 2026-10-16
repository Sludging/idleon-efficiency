import { getCompanionActiveBonus, type Companion } from '../../../data/domain/companions';
import type { Construction } from '../../../data/domain/world-3/construction/construction';
import { getRoyalOutpostCogBuildSpeedMultiplier } from '../../../data/domain/world-3/construction/cog';
import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ParameterTestSpec } from '../../utils/parameter-test-config';

const saveName = 'latest';
const extractionResultsName = 'construction-cog-build-rate-parameters-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  small_cog_build_speed_bonus: {
    description: 'category 1 Small Cog build-speed bonus',
    extractionKey: 'construction_small_cog_build_speed_bonus',
    domainExtractor: (gameData) => {
      const construction = gameData.get('construction') as Construction;
      return construction.cogBoard.getSmallCogBuildSpeedBonus();
    },
  },
  companion_157_bonus: {
    description: 'active companion 157 build-speed bonus',
    extractionKey: 'construction_companion_157_bonus',
    domainExtractor: (gameData) => {
      const companions = gameData.get('companions') as Companion[];
      return getCompanionActiveBonus(companions, 157);
    },
  },
  royal_outpost_build_speed_multiplier: {
    description: 'Royal Guardian Construction Outpost multiplier',
    extractionKey: 'construction_royal_outpost_build_speed_multiplier',
    domainExtractor: (gameData) => {
      const armory = gameData.get('royalArmory') as RoyalArmory;
      return getRoyalOutpostCogBuildSpeedMultiplier(armory.getSelectedOutpostBonusIndex(), armory.builtOutpostCount);
    },
  },
};

describe('Construction cog build rate parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(parameterSpecs).forEach(([, spec]) => {
    it(`matches ${spec.description}`, () => {
      const expected = getExtractedValue(extractionResults, spec.extractionKey);
      const actual = spec.domainExtractor(gameData);
      expect(actual).toMatchLiveGame(expected, 0);
    });
  });
});
