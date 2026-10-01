/**
 * Compares Purrmep's linked-player passive bonus shown by the website with
 * the matching game result for the saved linked player.
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Divinity } from '../../../data/domain/divinity';

const saveName = 'latest';
const extractionResultsName = 'divinity-minor-link-data.json';

describe('Divinity Domain - Minor Link Bonus', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let divinity: Divinity;

 beforeAll(() => {
  // Load live game extraction results
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  // Load matching save data - MUST correspond to the same game state as extraction
  try {
   gameData = loadGameDataFromSave(saveName);

   // Get fully configured divinity domain
   divinity = gameData.get('divinity') as Divinity;
   if (!divinity) {
    throw new Error('Divinity domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Minor Link Bonus Calculations', () => {
  it('matches Purrmep minor-link bonus for its linked player', () => {
   const god = divinity.gods[6];
   if (!god) throw new Error('God 6 (Purrmep) not found');

   const purrmepPlayer = god.linkedPlayers.at(0);
   if (!purrmepPlayer) throw new Error('No player linked to Purrmep');

   const extractedBonus = extractionResults.extractions.divinity_minor_bonus_6.result;
   const calculatedBonus = god.getMinorLinkBonus(purrmepPlayer);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Purrmep minor-link passive bonus shown for its linked player',
   });
  });
 });
});
