import { Orion } from '../../../data/domain/world-1/orion';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'orion-feather-rate-data.json';

describe('Orion feather production rate', () => {
  it('matches the current per-second feather production rate', () => {
    const extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const orion = loadGameDataFromSave(saveName).get('orion') as Orion;

    expect(orion.getFeatherRate()).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'feather_rate'), {
      tolerance: 0,
      context: 'Current Orion feather production rate per second',
    });
  });
});