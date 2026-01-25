/**
 * Cooking Meal Bonus Parameter Validation
 *
 * Tests our cooking meal bonus calculations against live game data.
 *
 * Formula (from game code):
 *   CookingMealBonusMultioo() * RibbonBonus(ribbonLevel) * mealLevel * bonusQty
 *
 * Where CookingMealBonusMultioo =
 *   (1 + (MainframeBonus(116) + ShinyBonusS(20)) / 100) * (1 + WinBonus(26) / 100)
 *
 * Note: MainframeBonus(116) maps to jewel 16 (values >100 = jewel indices)
 * Note: RibbonBonus is calculated in cooking domain, not a cross-domain dependency
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { Lab } from '../../../data/domain/lab';
import { Breeding } from '../../../data/domain/breeding';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { Cooking } from '../../../data/domain/cooking';

const saveName = 'latest';
const extractionResultsName = 'cooking-meal-bonus-data.json';

export const cookingMealBonusParameterSpecs: Record<string, ParameterTestSpec> = {
  mainframe_jewel_16: {
    id: 'mainframe_jewel_16',
    description: 'Mainframe jewel 16 bonus (meal bonus)',
    extractionKey: 'mainframe_jewel_16',
    domainExtractor: (gameData) => {
      const lab = gameData.get("lab") as Lab;
      return lab.jewels[16].active ? lab.jewels[16].getBonus() : 0;
    }
  },

  shiny_bonus_20: {
    id: 'shiny_bonus_20',
    description: 'Breeding shiny bonus 20 (meal bonus)',
    extractionKey: 'shiny_bonus_20',
    domainExtractor: (gameData) => {
      const breeding = gameData.get("breeding") as Breeding;
      return breeding.shinyBonuses.find(bonus => bonus.data.index === 20)?.getBonus() ?? 0;
    }
  },

  win_bonus_26: {
    id: 'win_bonus_26',
    description: 'Summoning winner bonus 26 (meal bonus)',
    extractionKey: 'win_bonus_26',
    domainExtractor: (gameData) => {
      const summoning = gameData.get("summoning") as Summoning;
      return summoning.summonBonuses.find(bonus => bonus.data.bonusId === 26)?.getBonus() ?? 0;
    }
  },

  ribbon_bonus_meal_11: {
    id: 'ribbon_bonus_meal_11',
    description: 'Ribbon bonus for meal 11',
    extractionKey: 'ribbon_bonus_meal_11',
    domainExtractor: (gameData) => {
      const cooking = gameData.get("cooking") as Cooking;
      return cooking.meals[11].getRibbonBonus();
    }
  },

};

describe('Cooking Domain - Meal Bonus - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    // Load live game extraction results
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);

    // Load matching save data - MUST correspond to the same game state as extraction
    try {
      gameData = loadGameDataFromSave(saveName);
    } catch (error: any) {
      throw new Error(`❌ Failed to load save data: ${error.message}`);
    }
  });

  describe('Parameter Validation', () => {
    it('validates all cooking meal bonus parameters against extracted results', () => {
      // Run table-driven parameter validation
      const parameterResults = runParameterValidationSuite(
        cookingMealBonusParameterSpecs,
        extractionResults,
        gameData
      );

      // Ensure we validated at least some parameters
      expect(parameterResults.length).toBeGreaterThan(0);

      // Log results for each parameter
      let passedCount = 0;
      let failures: string[] = [];
      parameterResults.forEach(result => {
        if (result.passed) {
          passedCount++;
          testLog(result.notes || `✅ ${result.parameterId}: passed`, 'debug');
        } else {
          testLog(`❌ ${result.parameterId}: ${result.error}`, 'always');
          failures.push(result.parameterId);
        }
      });
      testLog(`📊 Parameter Validation: ${passedCount}/${parameterResults.length} passed`, 'always');

      // FAIL THE TEST if parameters don't match
      if (failures.length > 0) {
        const failureDetails = failures.map(paramId => {
          const result = parameterResults.find(r => r.parameterId === paramId);
          return `${paramId}: ${result?.error}`;
        }).join('\n   ');

        throw new Error(`Parameter validation failed:\n   ${failureDetails}\n\nThis indicates our domain calculations don't match live game.`);
      }
    });
  });
});
