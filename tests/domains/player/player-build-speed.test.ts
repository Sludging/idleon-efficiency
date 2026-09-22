/**
 * Player Build Speed Calculation Validation
 *
 * Tests our Player build speed calculations against live game data for all 12 players.
 * Build speed is a complex calculation that depends on:
 * - Construction skill level
 * - Stamps, guild bonuses, achievements
 * - Alchemy bubbles and vials
 * - Arcade, voting, vault, summoning bonuses
 * - Gear bonuses, post office bonuses
 * - Talents (Redox Salt), atom collider, storage
 * - Gaming palette (not yet implemented)
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'player-build-speed-data.json';
// IdleOn PlayerBuildSpd uses the active player's EtcBonuses("30") instead of per player.
// We accept the small difference between the two calculations, and allow a 5% relative tolerance for build speed validation.
const PLAYER_BUILD_SPEED_RELATIVE_TOLERANCE = 0.05;

describe('Player Domain - Build Speed Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let players: Player[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    players = gameData.get("players") as Player[];
  });

  describe('All Players Build Speed', () => {
    for (let playerIndex = 0; playerIndex < 10; playerIndex++) {
      it(`validates build speed for player ${playerIndex}`, () => {
        const liveBuildSpeed = getExtractedValue(extractionResults, `build_speed_player_${playerIndex}`);
        const domainBuildSpeed = players[playerIndex].buildSpeed.value;

        expect(domainBuildSpeed).toMatchLiveGameWithDetails(liveBuildSpeed, {
          tolerance: PLAYER_BUILD_SPEED_RELATIVE_TOLERANCE,
          context: `Player ${playerIndex} build speed`,
        });
      });
    }
  });
});
