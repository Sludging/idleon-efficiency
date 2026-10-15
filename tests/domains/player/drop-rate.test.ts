import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// The retained normal loadout supplies real branch coverage. No map or dungeon context is simulated.
describe('Persistent normal character drop-rate multiplier', () => {
  it('matches independent native Luck stages, chip cap and ordered permanent products', () => {
    const results = loadExtractionResults('player-drop-rate-data.json');
    validateExtractionHealth(results);
    const replay = results.extractions.drop_rate.result;
    const player = getTargetPlayer(loadGameDataFromSave('latest').get('players') as Player[]);
    expect(player.stats.dropRateMultiplier).toMatchLiveGameWithDetails(replay.dropRateMultiplier, {
      tolerance: 0,
      context: `${player.playerName} raw base1 persistent drop rate; independent native stages: ${JSON.stringify(replay)}`,
    });
  });
});
