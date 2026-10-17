import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Tome, TomeLine } from '../../../data/domain/world-4/tome';
import tomeNativeLineScoreConfig from '../../configs/tome-native-line-score-parameters.json';

const extractionResultsName = 'tome-native-line-score-parameters-data.json';
const tomeLineTests = tomeNativeLineScoreConfig.extractions.map((extraction) => ({
  index: Number(extraction.label.replace('tome_pts_', '')),
  description: extraction.description,
}));

const getTomeLine = (tome: Tome, index: number): TomeLine => {
  const line = tome.lines.find((candidate) => candidate.index === index);
  if (!line) {
    throw new Error(`Tome line ${index} not found`);
  }
  return line;
};

describe('Tome native line score inputs', () => {
  let extractionResults: ExtractionResults;
  let tome: Tome;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave('latest');
    tome = gameData.get('tome') as Tome;

    if (!tome) {
      throw new Error('Tome domain not found in save data');
    }
  });

  it('covers all native Tome lines', () => {
    expect(tomeLineTests.map(({ index }) => index)).toEqual(
      Array.from({ length: 124 }, (_, index) => index),
    );
  });


  tomeLineTests.forEach(({ index, description }) => {
    it(`matches ${description}`, () => {
      const line = getTomeLine(tome, index);
      const nativeScore = getExtractedValue(extractionResults, `tome_pts_${index}`);
      let highestPlayerScore = 0;

      for (let playerIndex = 0; playerIndex < tome.charCount; playerIndex++) {
        highestPlayerScore = Math.max(highestPlayerScore, line.getPlayerScore(playerIndex));
      }

      expect(highestPlayerScore).toMatchLiveGame(nativeScore, 0);
    });
  });
});
