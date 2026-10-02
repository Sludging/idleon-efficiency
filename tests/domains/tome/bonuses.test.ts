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
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import type { Player } from '../../../data/domain/player';
import type { Tome } from '../../../data/domain/world-4/tome';

const saveName = 'latest';
const extractionResultsName = 'tome-bonus-data.json';
const tomeBonusEffects = [
 'Damage bonus from Tome score',
 'Skill Efficiency bonus unlocked at 4,000 Tome score',
 'Drop Rate bonus unlocked at 8,000 Tome score',
 'STR stat bonus',
 'AGI stat bonus',
 'WIS stat bonus',
 'Golden Tome Damage Multi',
 'Singed Tome Drop Rate Multi',
] as const;
const tomeBonusIndices = tomeBonusEffects.map((_, index) => index);
// Game extraction reads cached total score while the domain recomputes current Tome lines; keep this bound narrow to retain failure detection.
const SCORE_DERIVED_TOME_BONUS_TOLERANCE = 0.0025;

describe('Tome Domain - Bonuses for the active player', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;
 let tome: Tome;
 let activePlayer: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  tome = gameData.get('tome') as Tome;
  activePlayer = getTargetPlayer(gameData.get('players') as Player[]);

  if (!tome) {
   throw new Error('Tome domain not found in save data');
  }
 });

 tomeBonusIndices.forEach(index => {
  const effect = tomeBonusEffects[index];
  it(`matches the game Tome ${effect} for the active player`, () => {
   const liveBonus = getExtractedValue(extractionResults, `tome_bonus_${index}`);

   expect(tome.getTomeBonus(index, activePlayer)).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: SCORE_DERIVED_TOME_BONUS_TOLERANCE,
    context: `Tome ${effect} for the active player`,
   });
  });
 });

 tomeBonusIndices.forEach(index => {
  const effect = tomeBonusEffects[index];
  it(`matches the unlock state for the Tome ${effect}`, () => {
   const liveUnlock = index < 6
    ? getExtractedValue(extractionResults, `tome_bonus_unlocked_${index}`)
    : getExtractedValue(extractionResults, index === 6 ? 'tome_bonus_event_shop_0' : 'tome_bonus_event_shop_27');
   const bonus = tome.bonuses.find(candidate => candidate.index === index);

   if (!bonus) {
    throw new Error(`Tome ${effect} not found in save data`);
   }

   expect(bonus.unlocked).toBe(liveUnlock === 1);
  });
 });
});

