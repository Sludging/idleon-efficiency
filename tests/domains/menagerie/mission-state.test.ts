import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Account } from '../../../data/domain/account';
import { Menagerie } from '../../../data/domain/menagerie';

const extractionResultsName = 'menagerie-mission-state-data.json';

describe('Menagerie current mission task', () => {
  let extractionResults: ExtractionResults;
  let menagerie: Menagerie;
  let account: Account;
  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const accountData = loadGameDataFromSave('latest');
    menagerie = accountData.get('menagerie') as Menagerie;
    account = accountData.get('account') as Account;
  });

  it('uses saved claims to select the current task requirement', () => {
    const mission = menagerie.getMissions()[0];

    expect(mission.claimCount).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'mission_0_claims'),
      { tolerance: 0, context: 'Account-level mission claims' },
    );
    expect(mission.currentRequirement).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'mission_0_requirement'),
      { tolerance: 0, context: 'Account-level mission current task' },
    );
    expect(account.hasBankBundle).toBe(Boolean(getExtractedValue(extractionResults, 'mission_bank_bundle')));
  });
});
