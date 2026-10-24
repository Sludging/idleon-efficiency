import { CoralReef } from '../../../data/domain/world-7/coralReef';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'coral-reef-maximum-levels-data.json';

describe('Coral Reef upgrade maximum levels', () => {
  let extractionResults: ExtractionResults;
  let coralReef: CoralReef;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    coralReef = loadGameDataFromSave(saveName).get('coralReef') as CoralReef;
  });

  it('applies the Pillar Coral maximum-level unlock', () => {
    const ownership = getExtractedValue(extractionResults, 'pillar_coral_maximum_level_unlock_owned');

    expect(coralReef.upgrades[3].getMaxLevel()).toBe(ownership === 1 ? 15 : 12);
  });
});
