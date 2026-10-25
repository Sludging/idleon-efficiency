/**
 * Account-wide Friend Bonus values, contributor state, slots, multiplier, and sources.
 *
 * The regular account assigns six bonuses to MaxionSquire at level 13,053.
 * Extra Kills remains unassigned. Native assignment records supply contributor
 * expectations independently from the website parser and bonus calculations.
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
 let contributors: Map<number, { accountLevel: number; friendName: string }>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const nativeAssignments: string = extractionResults.extractions.friend_bonus_assignments.result;
  contributors = new Map(
   nativeAssignments.split(';').map(record => {
    const [statIndex, accountLevel, friendName] = record.split(',');
    return [Number(statIndex), { accountLevel: Number(accountLevel), friendName }];
   }),
  );
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

 it('matches the shared Friend Bonus multiplier', () => {
  const liveValue = getExtractedValue(extractionResults, 'friend_bonus_multiplier');

  expect(friends.bonusMultiplier).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Shared Friend Bonus multiplier',
   debugInfo: { saveName, gameDataLoaded: gameData.has('friends') },
  });
 });

 it('matches each current effective slot and additive multiplier source', () => {
  const liveSources = extractionResults.extractions.friend_bonus_sources.result;
  const domainSources = {
   baseSlots: friends.slotSources.base,
   spearfishSlots: friends.slotSources.spearfish,
   mrPigSlots: friends.slotSources.mrPig,
   friendlySlotSlots: friends.slotSources.friendlySlot,
   slotOfFriendshipSlots: friends.slotSources.slotOfFriendship,
   baseMultiplier: friends.multiplierSources.base,
   mrPigMultiplierIncrease: friends.multiplierSources.mrPig,
   spearfishMultiplierIncrease: friends.multiplierSources.spearfish,
  };

  Object.entries(domainSources).forEach(([source, domainValue]) => {
   expect(domainValue).toMatchLiveGameWithDetails(liveSources[source], {
    tolerance: 0,
    context: `Current effective Friend Bonus source: ${source}`,
    debugInfo: { saveName, source, gameDataLoaded: gameData.has('friends') },
   });
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

   const contributor = contributors.get(index);
   const bonus = friends.bonuses[index];
   expect(bonus.active).toBe(contributor !== undefined);
   expect(bonus.friendName).toBe(contributor?.friendName ?? '');
   expect(bonus.accountLevel).toMatchLiveGameWithDetails(contributor?.accountLevel ?? 0, {
    tolerance: 0,
    context: `Friend Bonus sender account level for ${description}`,
    debugInfo: { saveName, friendName: bonus.friendName, active: bonus.active },
   });
  });
 });
});
