/**
 * Companion 44's level-two Friend Bonus multiplier input, compared with the
 * game's CompLV2 state for the same saved account.
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
 Companion,
 getCompanionActiveBonus,
 isCompanionLevelTwo,
} from '../../../data/domain/companions';

const saveName = 'latest';
const extractionResultsName = 'friend-bonus-stats-data.json';


describe('Companions Domain - Level-aware Bonus', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 it('matches the game level-one metadata bonus for owned companion 44', () => {
  const liveLevelOneBonus = getExtractedValue(extractionResults, 'friend_bonus_companion_44');
  const companions = gameData.get('companions') as Companion[];

  expect(getCompanionActiveBonus(companions, 44)).toMatchLiveGameWithDetails(liveLevelOneBonus, {
   tolerance: 0,
   context: 'Companion 44 active bonus',
  });
 });

 it('matches the game level-two state for owned companion 44', () => {
  const liveLevelTwoState = getExtractedValue(extractionResults, 'friend_bonus_companion_lv2_44');
  const companions = gameData.get('companions') as Companion[];

  expect(isCompanionLevelTwo(companions, 44)).toMatchLiveGameWithDetails(liveLevelTwoState, {
   tolerance: 0,
   context: 'Companion 44 level-two state used by the Friend Bonus multiplier',
  });
 });

});
