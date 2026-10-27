/**
 * Compares Purrmep's account-wide passive bonus from saved primary links
 * with the matching game result.
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Divinity } from '../../../data/domain/world-5/divinity';

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
  it('matches Purrmep account-wide minor-link bonus from primary links', () => {
   const extractedBonus = extractionResults.extractions.divinity_minor_bonus_6.result;
   const calculatedBonus = divinity.gamingGrowthMinorLinkBonus;

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Purrmep account-wide minor-link passive bonus from primary links',
   });
  });
 });
});
