import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

type SourceResult = {
  nativeCombatAccuracy: number;
  sourceCombatAccuracy: number;
  nativeMovementSpeed: number;
  sourceMovementSpeed: number;
  speedTerms: Record<string, number>;
  accuracyTerms: Record<string, number>;
};

describe('combat Accuracy and normal movement speed', () => {
  let player: Player;
  let result: SourceResult;

  beforeAll(() => {
    const extracted = loadExtractionResults('player-combat-accuracy-movement-speed-data.json');
    validateExtractionHealth(extracted);
    result = extracted.extractions.combat_speed.result as SourceResult;
    player = getTargetPlayer(loadGameDataFromSave('latest').get('players') as Player[]);
  });

  it('matches normal combat Accuracy from PlayerAccTot for the retained character', () => {
    expect(result.sourceCombatAccuracy).toMatchLiveGame(result.nativeCombatAccuracy, 0);
    expect(player.stats.accuracy).toMatchLiveGameWithDetails(result.sourceCombatAccuracy, {
      tolerance: 0,
      context: `${player.playerName} normal combat Accuracy; source inputs: ${JSON.stringify(result.accuracyTerms)}`,
    });
  });

  it('matches normal movement-speed ratio', () => {
    expect(result.sourceMovementSpeed).toMatchLiveGame(result.nativeMovementSpeed, 0);
    expect(player.stats.movementSpeed).toMatchLiveGameWithDetails(result.sourceMovementSpeed, {
      tolerance: 0,
      context: `${player.playerName} normal movement-speed ratio; native inputs: ${JSON.stringify(result.speedTerms)}`,
    });
  });
});
