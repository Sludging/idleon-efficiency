import { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
const talents = {"STR": 111, "AGI": 291, "WIS": 486, "LUK": 36};

describe('Obols - direct attribute modifiers', () => {
  let results: ExtractionResults;
  let data: Map<string, any>;
  let player: Player;
  beforeAll(() => {
    results = loadExtractionResults('player-equipment-properties-data.json');
    validateExtractionHealth(results);
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });
  Object.entries(talents).forEach(([property, talent]) => {
    it(`matches the ${property} Obol talent percentage`, () => {
      expect(player.getTalentBonus(talent)).toMatchLiveGame(getExtractedValue(results, `secondary_talent_${property}`), 0);
    });
  });
});
