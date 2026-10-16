import { Farming } from '../../../data/domain/world-6/farming';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'farming-beans-data.json';

describe('Farming magic beans from depot', () => {
  let farming: Farming;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    farming = loadGameDataFromSave(saveName).get('farming') as Farming;
  });

  it('matches beans available when converting the current Crop Depot', () => {
    const expected = getExtractedValue(extractionResults, 'farming_magic_beans_from_depot');

    expect(farming.magicBeansFromDepot).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Farming magic beans from depot',
    });
  });
});
