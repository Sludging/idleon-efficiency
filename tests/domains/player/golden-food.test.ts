import type { GoldenFood } from '../../../data/domain/golden-food';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// All consumers read one prepared result for the actual saved recipient.
describe('Shared golden-food results', () => {
  const results = loadExtractionResults('golden-food-data.json');
  validateExtractionHealth(results);
  let goldenFood: GoldenFood;
  let player: Player;
  let players: Player[];

  beforeAll(() => {
    const data = loadGameDataFromSave('latest');
    goldenFood = data.get('goldenFood') as GoldenFood;
    players = data.get('players') as Player[];
    player = getTargetPlayer(players);
  });

  it.each([
    ['golden_hp', 'hp'],
    ['golden_monster_cash', 'monsterCash'],
    ['golden_skill_exp', 'skillExp'],
    ['golden_effectivity', 'effectivity'],
  ] as const)('matches %s through the complete prepared result', (key, field) => {
    expect(goldenFood.getResults(player)[field]).toMatchLiveGameWithDetails(
      getExtractedValue(results, key), { tolerance: 0, context: `Player ${player.playerID} ${field}` },
    );
  });

  it.each([0, 7])('keeps candidate owner %s separate from the recipient and map owner', ownerIndex => {
    expect(player.getAccountTalentBonus([players[ownerIndex]], 209, player.finalTalentInputs))
      .toMatchLiveGame(getExtractedValue(results, `death_bringer_candidate_${ownerIndex}`), 0);
  });
});
