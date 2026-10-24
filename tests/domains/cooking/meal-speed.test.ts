/**
 * Compares all ten kitchens' populated meal-cooking speeds with the game's results.
 * This fixture's account-best selections align with native actor 3.
 * Other actors and star-sign/Silkrode variants remain unobserved.
 */

import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Cooking } from '../../../data/domain/world-4/cooking';

type KitchenMealSpeed = {
 index: number;
 speed: number;
};

const saveName = 'latest';
const extractionResultsName = 'cooking-speed-data.json';

describe('Cooking Domain - Meal Speed', () => {
 let extractionResults: ExtractionResults;
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
  it.each(Array.from({ length: 10 }, (_, index) => index))('matches the displayed meal speed for kitchen %i', (index) => {
   const expectedSpeeds = extractionResults.extractions['kitchen_meal_speeds'].result as KitchenMealSpeed[];
   const expected = expectedSpeeds.find(candidate => candidate.index === index);
   if (!expected) {
    throw new Error(`Native meal-cooking speed record for kitchen ${index} not found`);
   }

   const kitchen = cooking.kitchens[index];
   expect(kitchen.mealSpeed).toMatchLiveGameWithDetails(expected.speed, {
    tolerance: 0,
    context: `Kitchen ${index} meal-cooking speed`,
    debugInfo: {
     kitchenIndex: index,
     status: kitchen.status,
     activeMeal: kitchen.activeMeal,
     mealLevels: kitchen.mealLevels,
     recipeLevels: kitchen.recipeLevels,
     luckLevels: kitchen.luckLevels,
    }
   });
  });
 });
});
