import type { Menagerie } from '../../../data/domain/menagerie';
import { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
const properties = ["STR", "AGI", "WIS", "LUK", "Defence", "Accuracy", "Weapon_Power", "Mining_Power", "Choppin_Power", "Fishing_Power", "Catching_Power", "Trapping_Power", "Worship_Power"] as const;

describe('Equipment - normal gear properties', () => {
  let results: ExtractionResults;
  let data: Map<string, any>;
  let player: Player;
  let silverMultiplier: number;
  beforeAll(() => {
    results = loadExtractionResults('player-equipment-properties-data.json');
    validateExtractionHealth(results);
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
    silverMultiplier = (data.get('menagerie') as Menagerie).silverJellyfish.miscMultiplier;
  });
  properties.forEach(property => {
    // `gear_properties` is a legacy unscaled replay: adjust only raw Obol MISC rows using the loaded provider. This is a source-backed integration check, not native gear parity.
    it(`matches ${property} from the saved loadout, replacements and Obols`, () => {
      const legacyExpected = results.extractions.gear_properties.result[property];
      const isSilverAffected = property === 'Defence' || property.endsWith('_Power');
      const expected = isSilverAffected
        ? legacyExpected + getExtractedValue(results, `obol_raw_${property}`) * (silverMultiplier - 1)
        : legacyExpected;
      expect(player.gear.getProperty(property)).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `Target player gear contribution ${property}, not a final character stat`,
      });
    });
  });
});
