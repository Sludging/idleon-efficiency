/**
 * Royal Armory upgrade bonus calculations.
 *
 * ArmoryUpgBonus is level multiplied by the static bonus-per-level value for
 * the selected upgrade. The selected Equinox dependency is upgrade 76; the
 * additional nonzero upgrades exercise the same public result on other live
 * save indices.
 *
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-bonus-data.json';

const bonusCases = [
 { index: 76, extractionKey: 'royal_armory_bonus_76', description: 'Equinox dependency upgrade 76' },
 { index: 9, extractionKey: 'royal_armory_bonus_9', description: 'representative nonzero upgrade 9' },
 { index: 19, extractionKey: 'royal_armory_bonus_19', description: 'representative nonzero upgrade 19' },
];

describe('Royal Armory upgrade bonuses', () => {
 let extractionResults: ExtractionResults;
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 bonusCases.forEach(({ index, extractionKey, description }) => {
  it(`validates ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = royalArmory.getUpgradeBonus(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory ${description}`,
   });
  });
 });

 it('returns zero for an unknown upgrade index', () => {
  expect(royalArmory.getUpgradeBonus(-1)).toBe(0);
  expect(royalArmory.getUpgradeBonus(999)).toBe(0);
 });
});
