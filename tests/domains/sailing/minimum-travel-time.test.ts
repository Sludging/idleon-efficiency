import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'sailing-speed-data.json';


describe('Sailing Domain - Minimum Travel Time', () => {
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
  });


  it('matches the game minimum travel time for the paired save', () => {
    const sailing = loadGameDataFromSave(saveName).get('sailing') as Sailing;

    expect(sailing.boats[0].minTravelTime).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'minimum_travel_time'),
      { tolerance: 0, context: 'Sailing minimum travel time' },
    );
  });

});
