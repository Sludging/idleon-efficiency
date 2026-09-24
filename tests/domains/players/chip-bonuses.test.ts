/**
 * Equipped-chip contributions for the extraction character, in raw game units.
 *
 * The real save goes through the application pipeline, including Lab attaching
 * equipped chips to Player. This does not cover other characters or equipment
 * changes; nonzero toteff coverage is deferred at the human's direction.
 *
 */
import { ExtractionResults, loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';
import { getTargetPlayer, TARGET_PLAYER_INDEX } from '../../utils/target-player';
const saveName = 'latest';
const extractionResultsName = 'player-chip-bonuses-data.json';

// Numeric effects and enabling contributions use the same equipped-chip producer.
const chipBonusSelectors = [
 'def', 'move', 'acc', 'dr', 'atkspd', 'labexp', 'linewidth', 'fafk',
 'safk', 'crys', 'resp', 'toteff', 'dmg', 'eff', 'mkill', 'star',
 'troph', 'key1', 'pend', 'weppow', 'card1', 'card2', '__missing_chip_bonus__',
];

describe('Player Domain - Chip Bonuses', () => {
 let extractionResults: ExtractionResults;
 let player: Player & { getChipBonus?: (stat: string) => number };

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave(saveName);
  const players = gameData.get('players') as Player[];
  player = getTargetPlayer(players);
 });

 chipBonusSelectors.forEach(stat => {
  it(`matches the equipped-chip ${stat} contribution for player ${TARGET_PLAYER_INDEX}`, () => {
   const liveValue = getExtractedValue(extractionResults, `chip_bonus_${stat}`);
   if (typeof player.getChipBonus !== 'function') {
    throw new Error(`MISSING OWNER API - Player.getChipBonus("${stat}") must expose chipBonuses("${stat}")`);
   }
   const domainValue = player.getChipBonus(stat);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Player ${player.playerID} chip contribution ${stat}; equipped chips: ${player.labInfo.chips.map(slot => slot.chip?.index ?? -1).join(', ')}`,
   });
  });
 });
});
