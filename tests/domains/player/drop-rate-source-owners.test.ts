import type { Account } from '../../../data/domain/account';
import type { Minehead } from '../../../data/domain/world-7/minehead';
import type { Player } from '../../../data/domain/player';
import { Talent } from '../../../data/domain/talents';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
// These are complete source-owner calculations. Account flags and counters are smoke inputs, not plumbing tests.
describe('Persistent drop-rate source-owner calculations', () => {
  let data: Map<string, unknown>;
  let players: Player[];
  let player: Player;
  let replay: { terms: Record<string, number>; talentCandidates328: number[] };
  beforeAll(() => {
    const results = loadExtractionResults('player-drop-rate-data.json');
    validateExtractionHealth(results);
    replay = results.extractions.drop_rate.result;
    data = loadGameDataFromSave('latest');
    players = data.get('players') as Player[];
    player = getTargetPlayer(players);
  });
  const archlord = (): number => {
    const account = data.get('account') as Account;
    return Talent.getArchlordOfThePiratesMultiplier(players, player.finalTalentInputs, account.plunderousMobKills);
  };
  it('matches complete Archlord Of The Pirates account talent and Plunderous kill multiplier', () => {
    expect(archlord()).toMatchLiveGameWithDetails(replay.terms.workbench, {
      tolerance: 0, context: `Archlord candidate maximum and saved Plunderous kills for recipient ${player.playerID}`,
    });
  });
  it('matches complete Research-gated Minehead trade multiplier', () => {
    const minehead = data.get('minehead') as Minehead;
    expect(minehead.getTradeDropRateMultiplier()).toMatchLiveGameWithDetails(replay.terms.mineheadTrade, {
      tolerance: 0, context: 'Minehead permanent drop-rate multiplier from Research168 and completed trade blocks',
    });
  });
  it('matches earned Bronzehead reward in exact source percentage points', () => {
    expect((data.get('minehead') as Minehead).getBonusFromIndex(0)).toMatchLiveGameWithDetails(replay.terms.bronzehead, {
      tolerance: 0, context: 'Bronzehead metadata reward after its saved defeated-opponent gate',
    });
  });
});
