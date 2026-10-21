import type { Lab } from '../../../data/domain/world-4/lab';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';

describe('Player maximum damage Lab parameters', () => {
  let lab: Lab;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults('player-damage-lab-parameters-data.json');
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave('latest');
    lab = gameData.get('lab') as Lab;
  });


  it('matches native MainframeBonus(110) with Pyrite Pyramite Jewel 10', () => {
    const bonus = lab.jewels.find(jewel => jewel.index === 10)!.getBonus();
    expect(bonus).toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_lab_mainframe_110'), 0);
  });
});