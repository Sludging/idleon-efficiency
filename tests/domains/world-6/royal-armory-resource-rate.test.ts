/**
 * Hourly Royal Guardian Outpost collection for source-selected map rows 1 and 0.
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
import { getTargetPlayer } from '../../utils/target-player';
import { Player } from '../../../data/domain/player';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { RoyalArmory, getRoyalGuardianContribution } from '../../../data/domain/world-6/royalArmory/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-resource-rate-data.json';
const rateCases = [
 { mapIndex: 1, extractionKey: 'royal_armory_rate_row_1', description: 'source-selected map row 1' },
 { mapIndex: 0, extractionKey: 'royal_armory_rate_row_0_empty', description: 'source-selected map row 0' },
] as const;

describe('Royal Armory hourly outpost collection', () => {
 let extractionResults: ExtractionResults;
 let royalArmory: RoyalArmory;
 let player: Player;
 let players: Player[];
 let alchemy: Alchemy;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave(saveName);
  royalArmory = gameData.get('royalArmory') as RoyalArmory;
  alchemy = gameData.get('alchemy') as Alchemy;
  players = gameData.get('players') as Player[];
  player = getTargetPlayer(players);
 });

 rateCases.forEach(({ mapIndex, extractionKey, description }) => {
  it(`matches the game's hourly collection for ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = royalArmory.mapStates.get(mapIndex)!.getResourceCollectionRate(
    royalArmory.resourceCollectionBonuses,
    getRoyalGuardianContribution(player, alchemy, players),
   );

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory hourly collection for ${description}`,
   });
  });
 });

});
