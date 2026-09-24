/**
 * Representative equipment subtotals for player 0 from the paired real save.
 * Dungeon Total Damage is checked separately from ordinary Total Damage in the
 * overworld, not during a dungeon transition. These samples do not prove
 * unobserved slot or system conditions.
 */
import { Player } from '../../../data/domain/player';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer, TARGET_PLAYER_INDEX } from '../../utils/target-player';
const equipmentBonusSamples: { bonus: EquipmentBonus; description: string }[] = [
 { bonus: EquipmentBonus.SkillEfficiency, description: 'Skill Efficiency from equipment and account bonuses' },
 { bonus: EquipmentBonus.DropRate, description: 'Drop Rate including personal and family obols' },
 { bonus: EquipmentBonus.Money, description: 'Money without conflating other money effects' },
 { bonus: EquipmentBonus.TotalDamage, description: 'Total Damage' },
 { bonus: EquipmentBonus.DungeonTotalDamage, description: 'distinct dungeon-labelled Total Damage in the overworld' },
 { bonus: 0 as EquipmentBonus, description: 'an unsupported equipment effect' },
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
   expect(player.getEquipmentBonus(bonus)).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Player ${TARGET_PLAYER_INDEX} equipment ${description}`,
   });
  });
 });
});
