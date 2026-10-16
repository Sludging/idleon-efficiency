import { getPersistentSpelunkingPower } from '../../../data/domain/world-7/spelunkingPower';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'button-spelunking-power-data.json';
describe('Persistent Spelunking power', () => {
  let gameData: Map<string, any>;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  it('matches the account-wide Spelunking power used by Button task 50', () => {
    const expected = getExtractedValue(extractionResults, 'button_spelunking_power');
    const actual = getPersistentSpelunkingPower(gameData);

    expect(actual).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Account-wide persistent Spelunking power',
    });
  });
});
