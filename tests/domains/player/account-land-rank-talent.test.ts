import type { Player } from '../../../data/domain/player';
import { Talent } from '../../../data/domain/talents';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Talents - account Dank Ranks bonus', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('farming-land-rank-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  it('validates the account maximum Dank Ranks bonus with recipient talent inputs', () => {
    const liveValue = getExtractedValue(extractionResults, 'account_dank_ranks_bonus');
    const players = gameData.get('players') as Player[];
    const recipient = getTargetPlayer(players);
    // Candidates retain allocations and both presets; shared talent inputs belong to the recipient.
    const domainValue = Talent.getAccountTalentBonus(players, 207, recipient.finalTalentInputs);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Raw account Dank Ranks maximum for the retained recipient before the Land Rank minimum multiplier',
    });
  });
});
