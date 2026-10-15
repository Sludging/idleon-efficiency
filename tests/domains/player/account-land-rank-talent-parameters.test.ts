import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Talents - account Dank Ranks parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('farming-land-rank-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  it('validates an allocated candidate Dank Ranks curve with recipient final talent inputs', () => {
    const players = gameData.get('players') as Player[];
    const recipient = getTargetPlayer(players);
    // Sludgadin is an allocated maximum candidate. Candidate 7 repeats the same result in this save.
    // Both candidate presets lack Dank Ranks; shared talent inputs still belong to the recipient.
    const candidate = players[0];
    const liveValue = getExtractedValue(extractionResults, 'dank_ranks_candidate_0_bonus');
    const domainValue = candidate.getTalentBonusAtInputs(207, recipient.finalTalentInputs);

    expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
});
