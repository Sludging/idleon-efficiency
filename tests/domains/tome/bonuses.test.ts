/**
 * Tome Bonus calculation tests.
 *
 * Delivered v1.21 source is captured in docs/game-snippets/tome/Summoning.1.21.js
 * at the Tome Bonus calculation. Indices 0-5 provide the player-facing Tome
 * effects +{% DMG, +{% Skill Eff, +{% Drop Rate, +{% STR, +{% AGI, and +{% WIS.
 * Indices 0-2 use Tome score, with the 4,000- and 8,000-score conditions for
 * +{% Skill Eff and +{% Drop Rate; indices 6 and 7 provide Golden Tome DMG
 * Multi and Singed Tome Drop Rate Multi when their corresponding Event Shop
 * item is owned. Tome score bonuses include Grimoire upgrade 17 and Troll
 * equipment set bonuses.
 *
 * The paired current save keeps Golden Tome and Singed Tome locked, so their
 * nonzero formulas are source-reviewed but not exercised by this fixture.
 *
 * @testCovers Tome.getTomeBonus
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Player } from '../../../data/domain/player';
import type { Tome } from '../../../data/domain/world-4/tome';

const saveName = 'latest';
const extractionResultsName = 'tome-bonus-data.json';
const tomeBonusIndices = Array.from({ length: 8 }, (_, index) => index);

describe('Tome Domain - Bonuses', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;
 let tome: Tome;
 let player0: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  tome = gameData.get('tome') as Tome;
  player0 = (gameData.get('players') as Player[])[0];

  if (!tome) {
   throw new Error('Tome domain not found in save data');
  }
  if (!player0) {
   throw new Error('Player 0 not found in save data');
  }
 });

 tomeBonusIndices.forEach(index => {
  it(`matches the game Tome Bonus for index ${index}`, () => {
   const liveBonus = getExtractedValue(extractionResults, `tome_bonus_${index}`);

   expect(tome.getTomeBonus(index, player0)).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: `Tome Bonus (${index}, player 0)`,
   });
  });
 });

 tomeBonusIndices.forEach(index => {
  it(`matches the game unlock state for index ${index}`, () => {
   const liveUnlock = index < 6
    ? getExtractedValue(extractionResults, `tome_bonus_unlocked_${index}`)
    : getExtractedValue(extractionResults, index === 6 ? 'tome_bonus_event_shop_0' : 'tome_bonus_event_shop_27');
   const bonus = tome.bonuses.find(candidate => candidate.index === index);

   if (!bonus) {
    throw new Error(`Tome Bonus ${index} not found in save data`);
   }

   expect(bonus.unlocked).toBe(liveUnlock === 1);
  });
 });
});

