/**
 * Validates Slab's account-wide multiplier for Slab bonuses.
 *
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Slab } from '../../../data/domain/world-5/slab';

const saveName = 'latest';
const extractionResultsName = 'slab-bonus-data.json';

describe('Slab Domain - Slab Bonus', () => {
 let extractionResults: ExtractionResults;
 let slab: Slab;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  slab = loadGameDataFromSave(saveName).get('slab') as Slab;
 });


 it('validates the account-wide Slab bonus multiplier', () => {
  const liveValue = getExtractedValue(extractionResults, 'slab_bonus_multiplier');
  const domainValue = slab.getSlabBonusMultiplier();
  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Slab account-wide bonus multiplier',
  });
 });
});
