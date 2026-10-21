import type { Cloudsave } from '../../../data/domain/cloudsave';
import type { MasterClasses } from '../../../data/domain/masterClasses';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadTestSave, validateGameDataStructure } from '../../utils/cloudsave-loader';
import { initAccountDataKeys, updateIdleonData } from '../../../data/domain/idleonData';
import { initAllItems } from '../../../data/domain/items';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';

const saveName = 'latest';
const extractionResultsName = 'masterclasses-first-three-upgrade-cost-multiplier-data.json';

describe('Master Classes - first-three upgrade cost multiplier', () => {
  let extractionResults: ExtractionResults;
  let cloudSave: Cloudsave;
  let gameData: Map<string, unknown>;

  function processAccount(): void {
    gameData = updateIdleonData(
      gameData,
      cloudSave,
      cloudSave.get('playerNames'),
      normalizeCompanionStates(cloudSave.get('companions')),
      cloudSave.get('servervars'),
      true,
    ).getData();
  }

  function preparedMultiplier(): number {
    return (gameData.get('masterClasses') as MasterClasses).getFirstThreeUpgradeCostMultiplier();
  }

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    cloudSave = loadTestSave(saveName);
    gameData = initAccountDataKeys(initAllItems());
    processAccount();
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

  it('keeps the paired game multiplier when processing the same real account again', () => {
    const expected = getExtractedValue(extractionResults, 'first_three_upgrade_cost_multiplier');
    expect(preparedMultiplier()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Prepared first-three multiplier before repeated real-account processing',
    });
    // Run the full pipeline again to detect compounding or stale accumulated Research state.
    processAccount();
    expect(preparedMultiplier()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'First-three multiplier after repeated processing, compared with the independent paired game result',
    });
  });

});
