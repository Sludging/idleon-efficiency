import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// This paired normal loadout covers persistent totals, not forms, dungeons or unseen loadouts.
describe('Persistent normal player Defence and base Accuracy', () => {
  let player: Player;
  let replay: { defence: number; accuracy: number; terms: Record<string, number>; stages: Record<string, number>; context: Record<string, unknown> };
  beforeAll(() => {
    const results = loadExtractionResults('player-secondary-stats-data.json');
    validateExtractionHealth(results);
    replay = results.extractions.secondary_stats.result;
    player = getTargetPlayer(loadGameDataFromSave('latest').get('players') as Player[]);
  });

  it('matches persistent normal Defence', () => {
    expect(player.stats.defence).toMatchLiveGameWithDetails(replay.defence, {
      tolerance: 0,
      context: `${player.playerName} persistent Defence; native inputs and stages: ${JSON.stringify(replay)}`,
    });
  });

  it('matches separately named base Accuracy', () => {
    expect(player.stats.baseAccuracy).toMatchLiveGameWithDetails(replay.accuracy, {
      tolerance: 0,
      context: `${player.playerName} persistent base Accuracy; native inputs and stages: ${JSON.stringify(replay)}`,
    });
  });
});
