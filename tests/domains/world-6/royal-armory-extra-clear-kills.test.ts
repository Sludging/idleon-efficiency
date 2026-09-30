/**
 * Extra kills credited toward clearing Royal Guardian Outposts, with the
 * character and account bonuses compared separately in the parameter test.
 */

import {
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-extra-clear-kills-data.json';

describe('Royal Armory extra clear kills', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 it('matches the extra mob kills credited toward Outpost clearing', () => {
  const extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const liveValue = getExtractedValue(extractionResults, 'royal_armory_extra_clear_kills');
  const domainValue = royalArmory.getExtraClearKills();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Royal Armory extra kills credited toward Outpost progress',
  });
 });
});
