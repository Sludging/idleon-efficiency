/**
 * The purified-outpost collection bonus converts reaching the purification
 * track's first rank into additional collection percentage.
 */

import {
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-outpost-purify-bonus-data.json';
const extractionKey = 'royal_armory_outpost_purify_bonus';

describe('Royal Armory purified-outpost collection bonus', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 it('matches the extra collection percentage for purified outposts', () => {
  const extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const liveValue = getExtractedValue(extractionResults, extractionKey);
  const domainValue = royalArmory.getOutpostPurifyBonus();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Royal Armory collection percentage for purified outposts',
  });
 });
});
