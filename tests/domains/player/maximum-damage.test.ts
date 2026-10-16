import { getPlayerDamageTotalMultiplier } from '../../../data/domain/player-damage-multiplier';
import { getMaximumDamage } from '../../../data/domain/player-damage';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Persistent player maximum damage', () => {
  let player: Player;
  let gameData: Map<string, any>;
  let maximumDamage: number;
  let totalMultiplier: number;

  beforeAll(() => {
    const results = loadExtractionResults('player-combat-stats-data.json');
    validateExtractionHealth(results);
    maximumDamage = getExtractedValue(results, 'player_maximum_damage');
    totalMultiplier = getExtractedValue(results, 'player_maximum_damage_total_multiplier');
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });



  it('matches the retained character native normal-world D component', () => {
    expect(getPlayerDamageTotalMultiplier(gameData, player)).toMatchLiveGameWithDetails(totalMultiplier, {
      tolerance: 0,
      context: `${player.playerName} DamageDealed("Max") total multiplier`,
    });
  });

  it('matches the retained character normal-world maximum damage', () => {
    expect(getMaximumDamage(gameData, player)).toMatchLiveGameWithDetails(maximumDamage, {
      tolerance: 0,
      context: `${player.playerName} normal-world maximum damage from DamageDealed("Max")`,
    });
  });
});
