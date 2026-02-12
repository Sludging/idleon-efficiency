/**
 * Cooking Meal Bonus Calculation Tests
 *
 * Tests that given the correct input parameters, our domain calculates
 * the correct meal bonus values.
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
    it('validates Sailing meal bonus calculation', () => {
      const extractedBonus = extractionResults.extractions.meal_bonus_sailing.result;
      const calculatedBonus = cooking.getMealBonusForKey("Sailing");

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'Sailing meal bonus calculation',
      });
    });

    it('validates Mcook meal bonus calculation', () => {
      const extractedBonus = extractionResults.extractions.meal_bonus_mcook.result;
      const calculatedBonus = cooking.getMealBonusForKey("Mcook");

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'Mcook meal bonus calculation',
      });
    });

    it('validates KitchenEff meal bonus calculation', () => {
      const extractedBonus = extractionResults.extractions.meal_bonus_kitchen_eff.result;
      const calculatedBonus = cooking.getMealBonusForKey("KitchenEff");

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'KitchenEff meal bonus calculation',
      });
    });
  });
});
