/**
 * Representative equipment subtotals for the configured target player (player 3)
 * from the paired real save. Dungeon Total Damage is checked separately from
 * ordinary Total Damage in the overworld, not during a dungeon transition.
 * These samples do not prove unobserved slot or system conditions.
 */
import { Player } from '../../../data/domain/player';
import { EquipmentBonus, getEquipmentEffect } from '../../../data/domain/equipment-effects';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer, TARGET_PLAYER_INDEX } from '../../utils/target-player';
const equipmentBonusSamples: { bonus: EquipmentBonus; description: string }[] = [
 { bonus: EquipmentBonus.SkillEfficiency, description: 'Skill Efficiency from equipment and account bonuses' },
 { bonus: EquipmentBonus.DropRate, description: 'Drop Rate including personal and family obols' },
 { bonus: EquipmentBonus.Money, description: 'Money without conflating other money effects' },
 { bonus: EquipmentBonus.TotalDamage, description: 'Total Damage' },
 { bonus: EquipmentBonus.DungeonTotalDamage, description: 'distinct dungeon-labelled Total Damage in the overworld' },
];

describe('Player Domain - Equipment Bonuses', () => {
 let extractionResults: ExtractionResults;
 let player: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults('player-equipment-bonuses-data.json');
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave('latest');
  const players = gameData.get('players') as Player[];
  player = getTargetPlayer(players);
 });

 equipmentBonusSamples.forEach(({ bonus, description }) => {
  it(`matches ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, `equipment_bonus_${bonus}`);
   expect(player.gear.getBonus(bonus)).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Player ${TARGET_PLAYER_INDEX} equipment ${description}`,
   });
  });
 });
 it('matches every mapped unique effect in the complete prepared ETC snapshot', () => {
  const prepared = extractionResults.extractions.equipment_prepared_effects.result;
  for (const bonus of Object.values(EquipmentBonus)) {
   if (typeof bonus !== 'number') continue;
   const effect = getEquipmentEffect(bonus)!;
   const key = effect.replace(/ /g, '_');
   // The ETC snapshot also contains raw gear properties. Compare only exact unique-effect labels.
   if (!Object.prototype.hasOwnProperty.call(prepared, key)) continue;
   expect(player.gear.getBonus(bonus)).toMatchLiveGameWithDetails(prepared[key], {
    tolerance: 0,
    context: `Target player prepared equipment effect ${effect}`,
   });
  }
 });
});
