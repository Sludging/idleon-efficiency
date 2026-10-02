/**
 * Hourly Royal Guardian Outpost collection for a developed outpost and the
 * raw calculated rate for the saved empty row, which is not forced to zero.
 * Player-specific bonuses use the player selected by the matching extraction
 * configuration.
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-resource-rate-data.json';
const extractedPlayerID = 3;
const rateCases = [
 { mapIndex: 1, extractionKey: 'royal_armory_rate_row_1', description: 'developed outpost row 1' },
 { mapIndex: 0, extractionKey: 'royal_armory_rate_row_0_empty', description: 'empty outpost row 0' },
] as const;

describe('Royal Armory hourly outpost collection', () => {
 let extractionResults: ExtractionResults;
 let royalArmory: RoyalArmory;
 let player: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave(saveName);
  royalArmory = gameData.get('royalArmory') as RoyalArmory;
  const players = gameData.get('players') as Player[];
  const matchingPlayer = players.find(candidate => candidate.playerID === extractedPlayerID);
  if (!matchingPlayer) {
   throw new Error(`The paired save has no player ${extractedPlayerID} from the extraction state.`);
  }
  player = matchingPlayer;
 });

 rateCases.forEach(({ mapIndex, extractionKey, description }) => {
  it(`matches the game's hourly collection for ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = royalArmory.getOutpostResourceRate(mapIndex, player);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory hourly collection for ${description}`,
   });
  });
 });
});
