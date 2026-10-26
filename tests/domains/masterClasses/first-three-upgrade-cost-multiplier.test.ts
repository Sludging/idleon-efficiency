import type { MasterClasses } from '../../../data/domain/masterClasses';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, validateGameDataStructure } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'masterclasses-first-three-upgrade-cost-multiplier-data.json';

describe('Master Classes - first-three upgrade cost multiplier', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, unknown>;

  function preparedMultiplier(): number {
    return (gameData.get('masterClasses') as MasterClasses).getFirstThreeUpgradeCostMultiplier();
  }

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    validateGameDataStructure(gameData);
  });

  it('matches the account-wide cost multiplier for the first three Master Classes', () => {
    expect(preparedMultiplier()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'first_three_upgrade_cost_multiplier'),
      {
        tolerance: 0,
        context: 'First-three upgrade cost multiplier after normal processing of the paired real account',
      },
    );
  });
});
