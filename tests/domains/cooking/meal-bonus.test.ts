/**
 * Compares Cooking's displayed meal-bonus totals with the saved game's
 * matching MealBonus values.
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Cooking } from '../../../data/domain/world-4/cooking';

const saveName = 'latest';
const extractionResultsName = 'cooking-meal-bonus-data.json';

describe('Cooking Domain - Meal Bonus', () => {
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

 describe('Meal Bonus Calculations', () => {
  it('matches Popped Corn meal Sailing Speed bonus shown by the website', () => {
   const extractedBonus = extractionResults.extractions.meal_bonus_sailing.result;
   const calculatedBonus = cooking.getMealBonusForKey("Sailing");

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Popped Corn Sailing Speed bonus shown by the website',
   });
  });


  it('matches the meal-cooking-speed bonus total used by the website', () => {
   const extractedBonus = extractionResults.extractions.meal_bonus_mcook.result;
   const calculatedBonus = cooking.getMealBonusForKey("Mcook");

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Cooking meal bonus contributing to the website meal cooking speed',
   });
  });


  it('matches Cabbage meal kitchen efficiency bonus shown by the website', () => {
   const extractedBonus = extractionResults.extractions.meal_bonus_kitchen_eff.result;
   const calculatedBonus = cooking.getMealBonusForKey("KitchenEff");

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Cabbage kitchen efficiency bonus shown by the website',
   });
  });
 });
});
