import { Bubba } from '../../../data/domain/world-3/bubba';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'bubba-meat-slice-rate-data.json';

describe('Bubba meat-slice production rate', () => {
  it('matches the current meat-slice production rate', () => {
    const extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const bubba = loadGameDataFromSave(saveName).get('bubba') as Bubba;

    expect(bubba.getMeatSliceRate()).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'meat_slice_rate'), {
      tolerance: 0,
      context: 'Current Bubba meat-slice production rate',
    });
  });
});