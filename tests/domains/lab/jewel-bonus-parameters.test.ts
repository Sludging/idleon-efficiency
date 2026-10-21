import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Lab } from '../../../data/domain/world-4/lab';

const saveName = 'latest';
const extractionResultsName = 'lab-jewel-bonus-data.json';

const jewelBonusParameterSpecs: Record<string, ParameterTestSpec> = {
  jewel0BonusMultiplier: {
    description: 'Amethyst Rhinestone Jewel 0 multiplier',
    extractionKey: 'jewel_0_bonus_multiplier',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[0].bonusMultiplier;
    },
  },
};

describe('Lab Domain - Jewel Bonus Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(jewelBonusParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);

      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});