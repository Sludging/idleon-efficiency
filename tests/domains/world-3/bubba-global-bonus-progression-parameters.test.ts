import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Bubba } from '../../../data/domain/world-3/bubba';
import { Minehead } from '../../../data/domain/world-7/minehead';

const saveName = 'latest';
const extractionResultsName = 'bubba-global-bonus-progression-data.json';

describe('Bubba permanent bonus upgrade cost parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;
  let bubba: Bubba;
  let minehead: Minehead;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    bubba = gameData.get('bubba') as Bubba;
    minehead = gameData.get('minehead') as Minehead;
  });

  it('matches the direct game price for Bubba Boon', () => {
    expect(bubba.getUpgradeCost(3)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'next_bonus_cost'),
      0
    );
  });

  it('matches Bubba Boon upgrade 3 used to choose the next ordered bonus', () => {
    expect(bubba.getUpgradeBonus(3)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'bonus_upgrade_3'),
      0
    );
  });

  it('matches Minehead progression reward 5 used by the game cost formula', () => {
    expect(minehead.getBonusFromIndex(5)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'minehead_bonus_5'),
      0
    );
  });
});
