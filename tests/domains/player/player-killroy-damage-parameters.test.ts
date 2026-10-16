import type { KillroyPrime, Rift } from '../../../data/domain/world-4/rift';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Player Killroy damage parameter', () => {
  let rift: Rift;
  let nativeKillroyDamageBonus: number;

  beforeAll(() => {
    const results = loadExtractionResults('player-killroy-damage-parameters-data.json');
    validateExtractionHealth(results);
    nativeKillroyDamageBonus = getExtractedValue(results, 'player_killroy_damage_bonus');

    const data = loadGameDataFromSave('latest');
    rift = data.get('rift') as Rift;
  });

  it('matches native KillroyDMG with Death Note Killroy kills', () => {
    const killroyPrime = rift.bonuses.find(bonus => bonus.name === 'Killroy Prime') as KillroyPrime;
    expect(killroyPrime.getDamageBonus()).toMatchLiveGame(nativeKillroyDamageBonus, 0);
  });
});
