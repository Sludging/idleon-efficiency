import { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
const properties = ["STR", "AGI", "WIS", "LUK", "Defence", "Accuracy", "Weapon_Power", "Mining_Power", "Choppin_Power", "Fishing_Power", "Catching_Power", "Trapping_Power", "Worship_Power"] as const;

describe('Equipment - normal gear properties', () => {
  let results: ExtractionResults;
  let data: Map<string, any>;
  let player: Player;
  beforeAll(() => {
    results = loadExtractionResults('player-equipment-properties-data.json');
    validateExtractionHealth(results);
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });
  properties.forEach(property => {
    it(`matches ${property} from the saved loadout, replacements and Obols`, () => {
      const expected = results.extractions.gear_properties.result[property];
      expect(player.gear.getProperty(property)).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `Target player gear contribution ${property}, not a final character stat`,
      });
    });
  });
});
