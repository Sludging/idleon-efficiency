import type { GoldenFood } from '../../../data/domain/golden-food';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Golden Food player task bonuses', () => {
  let goldenFood: GoldenFood;
  let player: Player;
  let baseDamage: number;
  let damageMultiplier: number;
  let classExperiencePercent: number;

  beforeAll(() => {
    const results = loadExtractionResults('golden-food-player-task-bonuses-data.json');
    validateExtractionHealth(results);
    baseDamage = getExtractedValue(results, 'golden_food_base_damage');
    damageMultiplier = getExtractedValue(results, 'golden_food_damage_multiplier');
    classExperiencePercent = getExtractedValue(results, 'golden_food_class_experience_percent');

    const data = loadGameDataFromSave('latest');
    goldenFood = data.get('goldenFood') as GoldenFood;
    player = getTargetPlayer(data.get('players') as Player[]);
  });

  it('matches golden-food raw base-damage points used by the player task', () => {

    expect(goldenFood.getBaseDamage(player)).toMatchLiveGameWithDetails(baseDamage, {
      tolerance: 0,
      context: `Player ${player.playerID} golden-food raw base-damage points`,
    });
  });

  it('matches the golden-food total-damage multiplier used by the player task', () => {

    expect(goldenFood.getDamageMultiplier(player)).toMatchLiveGameWithDetails(damageMultiplier, {
      tolerance: 0,
      context: `Player ${player.playerID} golden-food total-damage multiplier (factor including base 1)`,
    });
  });

  it('matches golden-food additive class EXP percentage points used by the player task', () => {

    expect(goldenFood.getClassExperiencePercent(player)).toMatchLiveGameWithDetails(classExperiencePercent, {
      tolerance: 0,
      context: `Player ${player.playerID} golden-food additive class EXP percentage points`,
    });
  });
});
