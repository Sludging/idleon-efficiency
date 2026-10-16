import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { getCogBuildRateForContext } from '../../../data/domain/world-3/construction/construction';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

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

  it('matches the refreshed 96-slot board for the native current-character context', () => {
    const expected = getExtractedValue(extractionResults, 'construction_cog_build_rate');
    const players = gameData.get('players') as Player[];

    expect(getCogBuildRateForContext(gameData, players[3])).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Refreshed placed-board cog build rate for context player index 3',
    });
  });
});
