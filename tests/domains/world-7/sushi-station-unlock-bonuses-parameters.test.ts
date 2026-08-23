import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-station-unlock-bonuses-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  sushi_unique_count: {
    description: 'Number of contiguous unlocked Sushi entries',
    extractionKey: 'sushi_unique_count',
    domainExtractor: (gameData) => {
      const sushi = gameData.get("sushi") as SushiStation;
      return sushi.getUniqueSushi();
    }
  },
};

describe('Sushi Station - Unlock Bonuses - Parameters', () => {
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
