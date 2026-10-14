import type { GoldenFood } from '../../../data/domain/golden-food';
import type { Player } from '../../../data/domain/player';
import { Talent } from '../../../data/domain/talents';
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

  it('matches the golden-food all-stat contribution in raw percentage points', () => {
    expect(goldenFood.getAllStatPercent(player)).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'golden_all_stat_percent'),
      { tolerance: 0, context: `Player ${player.playerID} golden-food all-stat percentage points` },
    );
  });

  it.each([
    ['getDefencePercent', 'golden_defence_percent', 'raw Defence percentage points'],
    ['getBaseAccuracy', 'golden_base_accuracy', 'flat base Accuracy'],
  ] as const)('matches golden-food %s', (method, key, effect) => {
    expect(goldenFood[method](player)).toMatchLiveGameWithDetails(
      getExtractedValue(results, key),
      { tolerance: 0, context: `Player ${player.playerID} golden-food ${effect}` },
    );
  });

  it.each([0, 7])('keeps candidate owner %s separate from the recipient and map owner', ownerIndex => {
    expect(Talent.getAccountTalentBonus([players[ownerIndex]], 209, player.finalTalentInputs))
      .toMatchLiveGame(getExtractedValue(results, `death_bringer_candidate_${ownerIndex}`), 0);
  });
});
