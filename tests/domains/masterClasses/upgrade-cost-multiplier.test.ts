import type { MasterClasses } from '../../../data/domain/masterClasses';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, validateGameDataStructure } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'masterclasses-upgrade-cost-multiplier-data.json';

describe('Master Classes - whole upgrade cost multiplier', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, unknown>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    validateGameDataStructure(gameData);
  });

  function wholeMultiplier(): number {
    const masterClasses = gameData.get('masterClasses') as MasterClasses;
    return masterClasses.getUpgradeCostMultiplier();
  }

  it('matches the whole account-wide discount applied to Masterclass upgrade costs', () => {
    expect(wholeMultiplier()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'masterclass_upgrade_cost_multiplier'),
      { tolerance: 0, context: 'Whole Masterclass cost multiplier after normal processing of the paired real account' },
    );
  });
});
