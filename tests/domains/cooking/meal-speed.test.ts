/**
 * Compares kitchen 0's calculated meal-cooking speed, shown by the website,
 * with the game's CookingSPEED result for this saved account.
 */

import { loadExtractionResults, getExtractedValue, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Cooking } from '../../../data/domain/world-4/cooking';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'cooking-speed-data.json';

describe('Cooking Domain - Meal Speed', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let cooking: Cooking;

 beforeAll(() => {
  // Load live game extraction results
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  // Load matching save data - MUST correspond to the same game state as extraction
  try {
   gameData = loadGameDataFromSave(saveName);

   // Get fully configured cooking domain
   cooking = gameData.get('cooking') as Cooking;
   if (!cooking) {
    throw new Error('Cooking domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Kitchen meal-cooking speed', () => {
  it('matches the displayed meal speed for kitchen 0', () => {
   const liveFinalSpeed = getExtractedValue(extractionResults, 'final_cooking_speed');
   const domainResult = cooking.kitchens[0].mealSpeed;
   const ratio = domainResult / liveFinalSpeed;

   expect(domainResult).toMatchLiveGameWithDetails(liveFinalSpeed, {
    tolerance: 0,
    context: 'Kitchen 0 meal-cooking speed shown by the website',
    debugInfo: {
     ratio: ratio.toExponential(3),
     possibleCauses: ratio < 0.1 ? [
      'Missing parameters in domain calculation',
      'Incorrect bonus calculations',
      'Save data vs live game state mismatch'
     ] : ['Minor calculation differences']
    }
   });
  });
 });
});
