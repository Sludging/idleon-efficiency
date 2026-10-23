import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { getCogFlaggyRateForContext } from '../../../data/domain/world-3/construction/construction';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'construction-cog-flaggy-rate-data.json';

describe('Construction board Flaggy rate', () => {
    let gameData: Map<string, any>;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        gameData = loadGameDataFromSave(saveName);
    });

    it('matches meaningful positive board Flaggy/hour in the current-character context', () => {
        const expected = getExtractedValue(extractionResults, 'construction_cog_flaggy_rate');
        const players = gameData.get('players') as Player[];
        const contextPlayer = getTargetPlayer(players);

        expect(Number.isFinite(expected)).toBe(true);
        expect(expected).toBeGreaterThan(0);

        expect(getCogFlaggyRateForContext(gameData, contextPlayer)).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `WorkbenchStuff.FlagSpeed(0, 0) board Flaggy/hour in context player index ${contextPlayer.playerID}`,
        });
    });
});
