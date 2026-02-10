import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Worship } from '../../../data/domain/world-3/worship';

const saveName = 'latest';
const extractionResultsName = 'worship-totalizer-bonuses-data.json';

const parameterSpecs = {
  total_waves: {
    description: 'Total waves across all totems',
    extractionKey: 'total_waves',
    domainExtractor: (gameData: Map<string, any>) => {
      const worship = gameData.get("worship") as Worship;
      return worship.totalizer.totalWaves;
    }
  },
};

describe('Worship Domain - Totalizer - Parameters', () => {
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
