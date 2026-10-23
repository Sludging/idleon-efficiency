import { Breeding } from '../../../data/domain/world-4/breeding';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const extractionResultsName = 'breeding-data.json';

describe('Breeding Shiny OverLV effects', () => {
  let extractionResults: ExtractionResults;
  let breeding: Breeding;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    breeding = loadGameDataFromSave('latest').get('breeding') as Breeding;
  });

  it('matches the account Shiny OverLV total with the game', () => {
    expect(breeding.getTotalShinyOverlevels()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'total_shiny_overlevels'),
      {
        tolerance: 0,
        context: 'Account Shiny OverLV total',
      },
    );
  });

  it('matches Shiny speed with infinite Breedabilli and its existing Silkrode contribution', () => {
    // Actor 3 has Silkrode and an effective Breedabilli bonus of 150.
    // Lab already applies Silkrode to the website's account-wide sign.
    // The public true/false scenario includes that contribution without doubling it again.
    expect(breeding.getShinySpeed(true, false)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'shiny_speed'),
      {
        tolerance: 0,
        context: 'Shiny speed with infinite Breedabilli and Silkrode already included',
        debugInfo: {
          nativeEquipment: extractionResults.extractions['shiny_speed_equipment'].result,
          starSignEquipped: true,
          silkrodeEquipped: false,
        },
      },
    );
  });
});
