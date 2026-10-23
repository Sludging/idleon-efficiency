import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// The genuine active context has no dungeon, special-map, or Arcane map modifier.
describe('Persistent normal character drop-rate multiplier', () => {
  it('matches the active character native Drop Rate in the aligned persistent context', () => {
    const results = loadExtractionResults('player-drop-rate-data.json');
    validateExtractionHealth(results);
    const dropRateMultiplier = getExtractedValue(results, 'player_drop_rate_multiplier');
    const player = getTargetPlayer(loadGameDataFromSave('latest').get('players') as Player[]);
    expect(player.stats.dropRateMultiplier).toMatchLiveGameWithDetails(dropRateMultiplier, {
      tolerance: 0,
      context: `${player.playerName} persistent Drop Rate from native Button task 16 in the aligned saved-map context`,
    });
  });
});
