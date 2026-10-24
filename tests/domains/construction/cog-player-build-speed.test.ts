import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import type { Player } from '../../../data/domain/player';
import { getCogPlayerBuildSpeed } from '../../../data/domain/world-3/construction/playerBuildSpeed';

const saveName = 'latest';
const extractionResultsName = 'construction-cog-player-build-speed-data.json';

describe('Construction cog player build speed', () => {
    const gameData = loadGameDataFromSave(saveName);
    const players = gameData.get('players') as Player[];
    const contextPlayer = getTargetPlayer(players);
    const targetPlayers = players.map(player => ({
        player,
        playerName: player.playerName,
        playerIndex: player.playerID,
        extractionKey: `player_build_speed_player_${player.playerID}`,
    }));
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
    });

    it('covers every saved character with a native base build rate', () => {
        expect(players.map(player => player.playerID).sort((left, right) => left - right))
            .toEqual(Array.from({ length: 11 }, (_, index) => index));
        expect(Object.keys(extractionResults.extractions).sort())
            .toEqual(targetPlayers.map(({ extractionKey }) => extractionKey).sort());
    });

    it.each(targetPlayers)('matches base build rate for $playerName in the current-character context', ({ player, playerIndex, extractionKey }) => {
        const expected = getExtractedValue(extractionResults, extractionKey);

        expect(getCogPlayerBuildSpeed(player, contextPlayer, gameData)).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `WorkbenchStuff.PlayerBuildSpd(${playerIndex}, 0) in current context ${contextPlayer.playerName}`,
        });
    });

});
