import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { getCogBuildRateForContext } from '../../../data/domain/world-3/construction/construction';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'construction-cog-build-rate-data.json';

describe('Construction cog build rate', () => {
  let gameData: Map<string, any>;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  it('matches the prepared board in the native current-character context with a finite positive native rate', () => {
    const expected = getExtractedValue(extractionResults, 'construction_cog_build_rate');
    const players = gameData.get('players') as Player[];
    const contextPlayer = getTargetPlayer(players);

    expect(Number.isFinite(expected)).toBe(true);
    expect(expected).toBeGreaterThan(0);

    expect(getCogBuildRateForContext(gameData, contextPlayer)).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: `Prepared placed-board cog build rate for context player index ${contextPlayer.playerID}`,
    });
  });
});
