/**
 * Upgrade Vault bonuses across nonlinear formulas, direct exceptions, and mastery bands.
 *
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { UpgradeVault } from '../../../data/domain/upgradeVault';

const saveName = 'latest';
const extractionResultsName = 'upgrade-vault-bonus-data.json';

const bonusCases = [
 { index: 0, description: 'nonlinear bonus at index 0' },
 { index: 60, description: 'nonlinear bonus at index 60' },
 ...[1, 6, 7, 8, 9, 13, 32, 33, 36, 40, 42, 43, 44, 49, 51, 52, 53, 57, 61, 64, 70, 73, 74, 76, 79, 85, 86, 88, 89]
  .map(index => ({ index, description: `direct bonus at index ${index}` })),
 { index: 2, description: 'blue mastery-band representative at index 2' },
 { index: 31, description: 'blue mastery-band boundary at index 31' },
 { index: 34, description: 'green mastery-band representative at index 34' },
 { index: 59, description: 'green mastery-band boundary at index 59' },
 { index: 62, description: 'red mastery-band representative at index 62' },
 { index: 63, description: 'red mastery-band representative at index 63' },
 { index: 87, description: 'red mastery-band boundary at index 87' },
 { index: 90, description: 'ordinary out-of-range fallback at index 90' },
];

describe('Upgrade Vault bonuses', () => {
 let extractionResults: ExtractionResults;
 let upgradeVault: UpgradeVault;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  upgradeVault = loadGameDataFromSave(saveName).get('upgradeVault') as UpgradeVault;
 });

 bonusCases.forEach(({ index, description }) => {
  it(`validates ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, `vault_bonus_${index}`);
   const domainValue = upgradeVault.getBonusForId(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Upgrade Vault ${description}`,
   });
  });
 });
});
