import type { Player } from '../../../data/domain/player';
import type { Prayer } from '../../../data/domain/world-3/prayers';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

interface NativePrayerRecipient {
  playerId: number;
  playerName: string;
  bonuses: Record<number, number>;
}

// The retained save has nonempty all-empty slots on character10 and selected Prayer16 on character3.
describe('Complete character Prayer bonuses', () => {
  let players: Player[];
  let prayers: Prayer[];
  let nativeRecipients: NativePrayerRecipient[];
  beforeAll(() => {
    const results = loadExtractionResults('prayer-player-bonuses-data.json');
    validateExtractionHealth(results);
    nativeRecipients = results.extractions.prayer_player_bonuses.result.players;
    const data = loadGameDataFromSave('latest');
    players = data.get('players') as Player[];
    prayers = data.get('prayers') as Prayer[];
  });

  const cases = [
    { playerId: 10, prayerId: 7, effect: 'drop-rate bonus with no equipped prayers' },
    { playerId: 10, prayerId: 5, effect: 'Tachion of the Titans exclusion with no equipped prayers' },
    { playerId: 3, prayerId: 16, effect: 'full bonus for the saved equipped prayer' },
  ];
  cases.forEach(({ playerId, prayerId, effect }) => {
    it(`matches ${effect}`, () => {
      const player = players.find(candidate => candidate.playerID === playerId)!;
      const prayer = prayers.find(candidate => candidate.index === prayerId)!;
      const native = nativeRecipients.find(candidate => candidate.playerId === playerId)!;
      expect(prayer.getBonusForPlayer(player)).toMatchLiveGameWithDetails(native.bonuses[prayerId], {
        tolerance: 0,
        context: `${native.playerName}: ${effect}; independent raw-slot source replay`,
      });
    });
  });
});
