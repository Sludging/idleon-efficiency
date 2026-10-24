import { Breeding } from '../../../data/domain/world-4/breeding';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const extractionResultsName = 'breeding-pet-damage-data.json';

describe('Breeding pet damage multiplier', () => {
  let extractionResults: ExtractionResults;
  let breeding: Breeding;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    breeding = loadGameDataFromSave('latest').get('breeding') as Breeding;
  });

  it('matches the complete pet combat multiplier with effective account Infinite Stars', () => {
    // Actor 3 has the same Infinite Stars and Silkrode contribution as the account convention.
    // The genuine save has no positive OverLV; this does not cover its damage increase.
    const nativeMultiplier = getExtractedValue(extractionResults, 'pet_damage_multiplier');

    expect(breeding.getPetDamageMultiplier()).toMatchLiveGameWithDetails(
      nativeMultiplier,
      {
        tolerance: 0,
        context: 'Complete pet combat multiplier with effective account Infinite Stars and Silkrode',
      },
    );
  });
});
