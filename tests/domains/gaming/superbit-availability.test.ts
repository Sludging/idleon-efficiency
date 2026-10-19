import { Gaming } from '../../../data/domain/world-5/gaming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const genuineOwnedGamingSelector =
  'DJPQKEzABHGMLFRNCSTIOUVWXYZ肥肢肖肋肉箱者管職耐算箔策答筒筍白';

// Gaming[12] is from suk69's genuine v1.23 save at
// .cache/test-accounts/suk69/snapshots/2026-10-18T08-45-56-815Z-dc51ff8f/save.json.
// Save SHA256: 60768f8dda486b5f8cf3299058c72d97e160b497ac0458c6c1cdb99d2c63c991.
// The recorded selector is the parser input; the test does not load a cached profile.

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
  it('reports ownership of Lumi Gainz from native Superbit type 69', () => {
    // Native GamingStatType returns numeric 0/1; its truth value is the public ownership result.
    expect(gaming.isSuperbitPurchased(69)).toBe(nativeSuperbit69 !== 0);
  });

  it('parses owned Lumi Gainz from the genuine saved Gaming selector', () => {
    const savedGaming: unknown[] = [];
    savedGaming[12] = genuineOwnedGamingSelector;
    const parsedGaming = new Gaming('gaming');
    const rawData = new Map<string, any>([['Gaming', savedGaming]]);
    parsedGaming.superbits.forEach(superbit => superbit.parse(rawData));

    // Native GamingStatType("SuperBitType", 69, 0) is 1 for this paired save.
    expect(parsedGaming.isSuperbitPurchased(69)).toBe(true);
  });
});
