import { Arcade } from '../../../data/domain/world-2/arcade';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'arcade-gold-ball-gain-data.json';

describe('Arcade - overall gold-ball gain', () => {
  let arcade: Arcade;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    arcade = loadGameDataFromSave(saveName).get('arcade') as Arcade;
  });

  it('matches the overall gold-ball reward multiplier, including the event multiplier', () => {
    const expected = getExtractedValue(extractionResults, 'arcade_gold_ball_gain_multiplier');

    expect(arcade.getGoldBallGainMultiplier()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Overall Arcade gold-ball gain multiplier for ordinary board rewards',
      debugInfo: { saveName },
    });
  });
});
