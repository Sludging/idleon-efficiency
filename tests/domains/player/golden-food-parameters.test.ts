import type { GoldenFood } from '../../../data/domain/golden-food';
import type { Player } from '../../../data/domain/player';
import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Golden-food all-stat direct parameters', () => {
  const foodResults = loadExtractionResults('golden-food-data.json');
  const attributeResults = loadExtractionResults('player-attribute-sources-data.json');
  validateExtractionHealth(foodResults);
  validateExtractionHealth(attributeResults);
  let goldenFood: GoldenFood;
  let jelly: JellyOperator;
  let player: Player;

  beforeAll(() => {
    const data = loadGameDataFromSave('latest');
    goldenFood = data.get('goldenFood') as GoldenFood;
    jelly = data.get('jellyOperator') as JellyOperator;
    player = getTargetPlayer(data.get('players') as Player[]);
  });

  it('matches the complete effectiveness used by the all-stat food effect', () => {
    expect(goldenFood.getEffectivity(player)).toMatchLiveGame(
      getExtractedValue(foodResults, 'golden_effectivity'), 0,
    );
  });

  it.each([
    [10, 'unlocked Spinine reward'],
    [51, 'locked Smooth Stone reward'],
  ] as const)('matches Jelly obstruction %s: %s for golden-food effectiveness', (index) => {
    // These normal-mode rewards use Jelly research unlocks, not Sushi unlock flags.
    expect(jelly.getObstructionBonus(index)).toMatchLiveGame(
      getExtractedValue(attributeResults, `jelly_${index}`), 0,
    );
  });
});
