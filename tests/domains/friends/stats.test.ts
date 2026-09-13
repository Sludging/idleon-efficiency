/**
 * Friend Bonuses / Stats calculation tests.
 *
 * Thingies("FriendBonusStatz", index, 0) returns the saved Friend Bonus
 * quantity for each player-facing stat. The v1.21 labels are Total Damage,
 * Class EXP gain, Skill Efficiency, Drop Rate, Skill EXP gain, More Coins,
 * and Extra Kills (indices 0-6). The latest save assigns indices 1, 0, 3,
 * 5, 4, and 2 at account level 13,053; index 6 is therefore the observed
 * unassigned zero path. OptionsListAccount[476] is raw assigned-bonus input,
 * while FriendBonusSlots, FriendBonusQTY, and FriendBonusXtraMulti are
 * internal branches of this selected public result.
 *
 * The standalone Friends owner API is not present yet. Keep every selected
 * comparison active so implementation must expose the missing calculation.
 */

import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
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

const missingOwnerApi = (signature: string): never => {
  throw new Error(`MISSING OWNER API - ${signature} is not exposed by its owning domain`);
};

describe('Friends Domain - Stats', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  friendBonusStats.forEach(({ index, label, description }) => {
    it(`matches the game Friend Bonus for ${description}`, () => {
      const liveValue = getExtractedValue(extractionResults, label);
      const domainValue = missingOwnerApi(`Thingies("FriendBonusStatz", ${index}, 0)`);

      // The expected value comes from the real save's Friend Bonus assignments;
      // the owner API must preserve the game's stat-specific quantity.
      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Friend Bonus ${description} (Thingies FriendBonusStatz ${index})`,
        debugInfo: { saveName, gameDataLoaded: gameData.has('players') },
      });
    });
  });
});
