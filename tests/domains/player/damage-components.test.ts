import { getDamageAttributeContribution, getPlayerDamageBaseComponent } from '../../../data/domain/player-damage-base';
import { getPlayerDamagePercentComponent } from '../../../data/domain/player-damage-percent';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Persistent player damage components', () => {
  let player: Player;
  let gameData: Map<string, any>;
  let damageAttribute: number;
  let baseComponent: number;
  let percentComponent: number;

  beforeAll(() => {
    const results = loadExtractionResults('player-combat-stats-data.json');
    validateExtractionHealth(results);
    damageAttribute = getExtractedValue(results, 'player_damage_attribute_contribution');
    baseComponent = getExtractedValue(results, 'player_maximum_damage_base_component');
    percentComponent = getExtractedValue(results, 'player_maximum_damage_percent_component');
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it('matches the retained character native DamageDealedSTATtype input', () => {
    expect(getDamageAttributeContribution(gameData, player)).toMatchLiveGameWithDetails(damageAttribute, {
      tolerance: 0,
      context: `${player.playerName} DamageDealedSTATtype`,
    });
  });

  it('matches the retained character native normal-world B component', () => {
    expect(getPlayerDamageBaseComponent(gameData, player, getDamageAttributeContribution(gameData, player))).toMatchLiveGameWithDetails(baseComponent, {
      tolerance: 0,
      context: `${player.playerName} DamageDealed("Max") base component`,
    });
  });

  it('matches the retained character native normal-world C component', () => {
    expect(getPlayerDamagePercentComponent(gameData, player, getDamageAttributeContribution(gameData, player))).toMatchLiveGameWithDetails(percentComponent, {
      tolerance: 0,
      context: `${player.playerName} DamageDealed("Max") percent component`,
    });
  });
});
