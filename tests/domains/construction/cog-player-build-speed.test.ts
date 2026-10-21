import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Player } from '../../../data/domain/player';
import { getCogPlayerBuildSpeed } from '../../../data/domain/world-3/construction/playerBuildSpeed';

const saveName = 'latest';
const extractionResultsName = 'construction-cog-player-build-speed-data.json';
const targetPlayers = [
    { playerIndex: 3, extractionKey: 'player_build_speed_player_3' },
    { playerIndex: 7, extractionKey: 'player_build_speed_player_7' },
];

describe('Construction cog player build speed', () => {
    let gameData: Map<string, any>;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        gameData = loadGameDataFromSave(saveName);
    });

    it.each(targetPlayers)('matches native PlayerBuildSpd for target player index $playerIndex in context 3', ({ playerIndex, extractionKey }) => {
        const players = gameData.get('players') as Player[];
        const player = players[playerIndex];
        const expected = getExtractedValue(extractionResults, extractionKey);

        expect(getCogPlayerBuildSpeed(player, players[3], gameData)).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `WorkbenchStuff.PlayerBuildSpd(${playerIndex}, 0) in active context ${players[3].playerName}`,
        });
    });

});
