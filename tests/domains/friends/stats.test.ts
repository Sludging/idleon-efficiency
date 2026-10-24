/**
 * Account-wide Friend Bonus stat and slot checks.
 *
 * The saved account assigns six bonuses at level 13,053 and leaves the seventh
 * stat unassigned. The assertions cover those seven visible stat values,
 * including the zero value for the unassigned stat.
 *
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { Friends } from '../../../data/domain/friends';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'friend-bonus-stats-data.json';

const friendBonusStats = [
 { index: 0, label: 'friend_bonus_stat_0', description: 'Total Damage' },
 { index: 1, label: 'friend_bonus_stat_1', description: 'Class EXP gain' },
 { index: 2, label: 'friend_bonus_stat_2', description: 'Skill Efficiency' },
 { index: 3, label: 'friend_bonus_stat_3', description: 'Drop Rate' },
 { index: 4, label: 'friend_bonus_stat_4', description: 'Skill EXP gain' },
 { index: 5, label: 'friend_bonus_stat_5', description: 'More Coins' },
 { index: 6, label: 'friend_bonus_stat_6', description: 'Extra Kills' },
] as const;

describe('Friends Domain - Stats', () => {
 let extractionResults: ExtractionResults;
 let friends: Friends;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  friends = gameData.get('friends') as Friends;
 });

 it('matches the available Friend Bonus slots', () => {
  const liveValue = getExtractedValue(extractionResults, 'friend_bonus_slots');
  if (liveValue === undefined || liveValue === null) {
   throw new Error('Missing native Friend Bonus slots result: friend_bonus_slots');
  }

  expect(friends.friendBonusSlots).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Available Friend Bonus slots',
   debugInfo: { saveName, gameDataLoaded: gameData.has('friends') },
  });
 });

 friendBonusStats.forEach(({ index, label, description }) => {
  it(`matches the saved Friend Bonus value for ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, label);
   const domainValue = friends.getFriendBonus(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Friend Bonus ${description}`,
    debugInfo: { saveName, gameDataLoaded: gameData.has('friends') },
   });
  });
 });
});
