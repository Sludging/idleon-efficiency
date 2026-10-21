import { Gaming } from '../../../data/domain/world-5/gaming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const extractionResultsName = 'menagerie-lumi-inputs-data.json';

let gaming: Gaming;
let nativeSuperbit69: number;
beforeAll(() => {
  const results = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(results);
  nativeSuperbit69 = getExtractedValue(results, 'superbit_69');
  gaming = loadGameDataFromSave('latest').get('gaming') as Gaming;
});

describe('Gaming Superbit availability', () => {
  it('matches native ownership of Lumi Gainz', () => {
    // Native GamingStatType returns numeric 0/1; convert production boolean for exact comparison.
    expect(Number(gaming.isSuperbitPurchased(69))).toMatchLiveGameWithDetails(nativeSuperbit69, {
      tolerance: 0,
      context: 'Lumi Gainz Superbit 69 ownership from the saved Gaming state',
    });
  });
});
