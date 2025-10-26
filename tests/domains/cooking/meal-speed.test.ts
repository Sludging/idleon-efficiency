/**
 * Cooking Domain Live Game Validation
 * 
 * Tests our cooking domain calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, getExtractedValue, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Cooking } from '../../../data/domain/cooking';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'live-game-2025-10-26'; // This should match extraction time
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

  describe('getMealSpeed Function Testing', () => {
    it('validates getMealSpeed calculation against live game', () => {
      // Get live game final result
      const liveFinalSpeed = getExtractedValue(extractionResults, 'final_cooking_speed');
      
      
      // Call the ACTUAL domain function - this should use all the save data dependencies
      // The kitchen should already be fully configured from save data
      const domainResult = cooking.kitchens[0].mealSpeed; // This is the calculated value from updateCooking()
      
      // Use custom matcher with detailed logging
      const ratio = domainResult / liveFinalSpeed;
      expect(domainResult).toMatchLiveGameWithDetails(liveFinalSpeed, {
        tolerance: 0.01,
        context: 'Kitchen 0 meal speed calculation',
        debugInfo: {
          ratio: ratio.toExponential(3),
          timestamp: extractionResults.timestamp,
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
