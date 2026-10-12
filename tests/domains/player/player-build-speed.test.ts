/**
 * Player Build Speed Calculation Validation
 *
 * Tests our Player build speed calculations against paired live-game values for players 0-9.
 * The source combines construction level and bubble with additive Build Speed
 * inputs and account multipliers. The paired results exercise the complete
 * calculation, including player-specific inputs and account-wide effects.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'player-build-speed-data.json';
// WorkbenchStuff.1.22.js uses the active player's EtcBonuses("30") instead of per-player gear.
// The user accepts the existing 5% tolerance for this known input mismatch.
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
