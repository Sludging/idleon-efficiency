import { getMaximumDamage } from '../../../data/domain/player-damage';
import type { Player } from '../../../data/domain/player';
import { MapInfo } from '../../../data/domain/maps';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, validateTownExtractionContext } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import extractionConfig from '../../configs/player-maximum-damage.json';

describe('Persistent player maximum damage', () => {
  let player: Player;
  let gameData: Map<string, any>;
  let maximumDamage: number;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[], extractionConfig.requiredActivePlayerIndex);
    const results = loadExtractionResults('player-maximum-damage-data.json');
    validateTownExtractionContext(results, {
      activePlayerIndex: player.playerID,
      mapId: player.currentMapId,
      mapInternalName: MapInfo[player.currentMapId].data.map.intName,
    });
    validateExtractionHealth(results);
    maximumDamage = getExtractedValue(results, 'player_maximum_damage');
  });

  it('matches the retained character normal-world maximum damage', () => {
    expect(getMaximumDamage(gameData, player)).toMatchLiveGameWithDetails(maximumDamage, {
      tolerance: 0,
      context: `${player.playerName} normal-world maximum damage from DamageDealed("Max")`,
    });
  });
});
