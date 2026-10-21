import { Account } from '../../../data/domain/account';
import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

describe('Account saved miniboss and Plunderous progression', () => {
  it('matches miniboss progression counters and Pirate Plunder Monster kills from the genuine save', () => {
    const extractionResults = loadExtractionResults('account-state-data.json');
    validateExtractionHealth(extractionResults);
    const account = loadGameDataFromSave('latest').get('account') as Account;

    expect(account.miniBosses[0].daysSinceLastKill).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'world_3_miniboss_counter'),
      { tolerance: 0, context: 'World 3 miniboss days since last kill' },
    );
    expect(account.miniBosses[1].daysSinceLastKill).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'world_4_miniboss_counter'),
      { tolerance: 0, context: 'World 4 miniboss days since last kill' },
    );
    expect(account.miniBosses[2].daysSinceLastKill).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'world_5_miniboss_counter'),
      { tolerance: 0, context: 'World 5 miniboss days since last kill' },
    );
    expect(account.miniBosses[3].daysSinceLastKill).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'world_6_miniboss_counter'),
      { tolerance: 0, context: 'World 6 miniboss days since last kill' },
    );
    expect(account.plunderousMobKills).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'plunderous_mob_kills'),
      { tolerance: 0, context: 'Pirate Plunder Monster kills counted by Account' },
    );
  });
});
