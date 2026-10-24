import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import type { Player } from '../../../data/domain/player';
import { getCogPlayerBaseExpRate } from '../../../data/domain/world-3/construction/construction';

const saveName = 'latest';
const extractionResultsName = 'construction-cog-player-base-exp-rate-data.json';

describe('Construction cog player base EXP/hour', () => {
    const gameData = loadGameDataFromSave(saveName);
    const players = gameData.get('players') as Player[];
    const contextPlayer = getTargetPlayer(players);
    const targetPlayers = players.map(player => ({
        player,
        playerName: player.playerName,
        playerIndex: player.playerID,
        extractionKey: `player_base_exp_rate_player_${player.playerID}`,
    }));
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
    });

    it('covers every saved character with native base Construction EXP/hour', () => {
        expect(players.map(player => player.playerID).sort((left, right) => left - right))
            .toEqual(Array.from({ length: 11 }, (_, index) => index));
        expect(Object.keys(extractionResults.extractions).sort())
            .toEqual(targetPlayers.map(({ extractionKey }) => extractionKey).sort());
    });

    it.each(targetPlayers)('matches base Construction EXP/hour for $playerName in the current-character context', ({ player, playerIndex, extractionKey }) => {
        const expected = getExtractedValue(extractionResults, extractionKey);

        expect(Number.isFinite(expected)).toBe(true);
        expect(expected).toBeGreaterThan(0);

        expect(getCogPlayerBaseExpRate(player, contextPlayer, gameData)).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `idleon.callFunction('WorkbenchStuff', 'PlayerConExp', ${playerIndex}, 0) in current context ${contextPlayer.playerName}; base Construction EXP/hour excludes board position and aggregate cog EXP bonuses`,
        });
    });
});
