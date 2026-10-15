import type { Prayer } from '../../../data/domain/world-3/prayers';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

// Selected prayers use the ordinary complete curve. Passive prayers must instead scale before rounding.
describe('Character Prayer ordinary bonus inputs', () => {
  let prayers: Prayer[];
  let ordinaryBonuses: Record<number, number>;
  beforeAll(() => {
    const results = loadExtractionResults('prayer-player-bonuses-data.json');
    validateExtractionHealth(results);
    ordinaryBonuses = results.extractions.prayer_player_bonuses.result.ordinaryBonuses;
    prayers = loadGameDataFromSave('latest').get('prayers') as Prayer[];
  });

  it.each([
    [7, 'drop-rate Prayer full curve'],
    [5, 'Tachion preview before its passive exclusion'],
    [16, 'equipped Prayer full curve'],
  ] as const)('matches ordinary Prayer%s %s', (id) => {
    expect(prayers.find(prayer => prayer.index === id)!.getBonus()).toMatchLiveGame(ordinaryBonuses[id], 0);
  });
});
