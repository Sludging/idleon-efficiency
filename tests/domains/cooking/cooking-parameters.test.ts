/**
 * Cooking Domain Live Game Validation
 * 
 * Tests our cooking domain calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { Cooking } from '../../../data/domain/cooking';
import { StarSigns } from '../../../data/domain/starsigns';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'live-game-2025-08-23'; // This should match extraction time
const extractionResultsName = 'cooking-speed-data.json';


export const cookingParameterSpecs: Record<string, ParameterTestSpec> = {
  // Kitchen instance values
  mealLevels: {
    id: 'meal_levels',
    description: 'Kitchen meal levels',
    extractionKey: 'kitchen_0_meal_levels',
    domainExtractor: (gameData) => {
      const cooking = gameData.get('cooking');
      return cooking?.kitchens[0]?.mealLevels;
    },
  },

  recipeLevels: {
    id: 'recipe_levels',
    description: 'Kitchen recipe levels',
    extractionKey: 'kitchen_0_recipe_levels',
    domainExtractor: (gameData) => {
      const cooking = gameData.get('cooking');
      return cooking?.kitchens[0]?.recipeLevels;
    },
  },

  luckLevels: {
    id: 'luck_levels',
    description: 'Kitchen luck levels',
    extractionKey: 'kitchen_0_luck_levels',
    domainExtractor: (gameData) => {
      const cooking = gameData.get('cooking');
      return cooking?.kitchens[0]?.luckLevels;
    },
  },

  // Bonus parameters
  starsignBonus: {
    id: 'starsign_bonus',
    description: 'Star sign cooking speed bonus',
    extractionKey: 'starsign_58_bonus',
    domainExtractor: (gameData) => {
      const starSigns = gameData.get("starsigns") as StarSigns;
      const starsign58 = starSigns.unlockedStarSigns.find(sign => sign.name == "Gordonius Major")?.getBonus("Cooking SPD (Multiplicative!)") ?? 0;
      return starsign58;
    },
  },

  mealCookVialBonus: {
    id: 'meal_cook_vial_bonus',
    description: 'Meal cooking vial bonus',
    extractionKey: 'meal_cook_vial_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get('alchemy');
      return alchemy?.getVialBonusForKey("MealCook") ?? 0;
    },
  }

  // TODO: Add more parameters as they are extracted from live game
  // This table will grow as we expand the extraction config
};

describe('Cooking Domain - Parameters', () => {
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
    

  describe('Parameter Validation', () => {
    it('validates all cooking parameters against extracted results', () => {
      // Run table-driven parameter validation
      const parameterResults = runParameterValidationSuite(
        cookingParameterSpecs,
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
          // Only log successes in verbose mode
          testLog(result.notes || `✅ ${result.parameterId}: passed`, 'debug');
        } else {
          // Log ALL failures for debugging
          testLog(`❌ ${result.parameterId}: ${result.error}`, 'always');
          
          failures.push(result.parameterId);
        }
      });
      testLog(`📊 Parameter Validation: ${passedCount}/${parameterResults.length} passed`, 'always');
      
      // FAIL THE TEST IMMEDIATELY if parameters don't match
      if (failures.length > 0) {
        const failureDetails = failures.map(paramId => {
          const result = parameterResults.find(r => r.parameterId === paramId);
          return `${paramId}: ${result?.error}`;
        }).join('\n   ');
        
        throw new Error(`Parameter validation failed:\n   ${failureDetails}\n\nThis indicates save data doesn't match live game state.`);
      }
    });
  });
});
