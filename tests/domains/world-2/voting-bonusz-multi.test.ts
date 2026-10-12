import { Votes } from '../../../data/domain/world-2/votes';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'voting-bonusz-multi-data.json';

describe('Account-wide vote multiplier', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  it('matches the full account-wide multiplier applied to vote bonuses', () => {
    const liveValue = getExtractedValue(extractionResults, 'voting_bonusz_multi');
    const votes = gameData.get('votes') as Votes;

    // Test the named producer directly: getCurrentBonus can be zero when this vote is not selected.
    expect(votes.getBonusMultiplier()).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Votes VotingBonuszMulti account-wide multiplier',
    });
  });
});
