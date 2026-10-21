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
const extractionResultsName = 'masterclasses-upgrade-cost-multiplier-data.json';

describe('Master Classes - whole upgrade cost multiplier', () => {
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

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    cloudSave = loadTestSave(saveName);
    gameData = initAccountDataKeys(initAllItems());
    processAccount();
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

  it('keeps the same paired game multiplier when processing the same real account again', () => {
    const expected = getExtractedValue(extractionResults, 'masterclass_upgrade_cost_multiplier');
    expect(wholeMultiplier()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Prepared whole multiplier before repeated real-account processing',
    });
    // Reuse the same account map and Cloudsave through the actual parse/calculate
    // pipeline: the multiplier must be overwritten, not compounded or cached stale.
    processAccount();
    expect(wholeMultiplier()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Whole multiplier after repeated real-account processing, compared with the independent paired game value',
    });
  });

});
