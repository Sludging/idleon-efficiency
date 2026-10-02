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
 { index: 0, description: 'Bigger Damage nonlinear bonus' },
 { index: 60, description: 'Cooking Knowledge nonlinear bonus' },
 { index: 1, description: 'Natural Talent bonus' },
 { index: 6, description: 'Evolving Talent bonus' },
 { index: 7, description: 'Massive Whirl bonus' },
 { index: 8, description: 'Rapid Arrows bonus' },
 { index: 9, description: 'Dual Fireballs bonus' },
 { index: 13, description: 'Major Discount bonus' },
 { index: 32, description: 'Vault Mastery bonus' },
 { index: 33, description: 'Storage Slots bonus' },
 { index: 36, description: 'Straight to Storage bonus' },
 { index: 40, description: 'Stunning Talent bonus' },
 { index: 42, description: 'Vial Overtune bonus' },
 { index: 43, description: 'Active Murdering bonus' },
 { index: 44, description: 'Card Retirement bonus' },
 { index: 49, description: 'Quest KAPOW! bonus' },
 { index: 51, description: 'Slight Do-Over bonus' },
 { index: 52, description: 'Duplicate Entries bonus' },
 { index: 53, description: 'Special Talent bonus' },
 { index: 57, description: 'Teh TOM bonus' },
 { index: 61, description: 'Vault Mastery II bonus' },
 { index: 64, description: 'Skulltrick bonus' },
 { index: 70, description: 'Collection Cashout bonus' },
 { index: 73, description: 'Smarter Villagers bonus' },
 { index: 74, description: 'Super Slab bonus' },
 { index: 76, description: 'Big Blessings bonus' },
 { index: 79, description: 'Properly Funded Research bonus' },
 { index: 85, description: 'Bigger Better Beans bonus' },
 { index: 86, description: '24 Karat Foods bonus' },
 { index: 88, description: 'Topheavy Charms bonus' },
 { index: 89, description: 'Vault Mastery III bonus' },
 { index: 2, description: 'Monster Tax bonus in the blue mastery band' },
 { index: 31, description: 'Dirty Money bonus at the blue mastery boundary' },
 { index: 34, description: 'Recipe for Profit bonus in the green mastery band' },
 { index: 59, description: 'Breeding Knowledge bonus at the green mastery boundary' },
 { index: 62, description: 'Speedy Sailing bonus in the red mastery band' },
 { index: 63, description: 'Artifact Find Chance bonus in the red mastery band' },
 { index: 87, description: 'Rest of the Essentials bonus at the red mastery boundary' },
 { index: 90, description: 'out-of-range bonus fallback at index 90' },
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
