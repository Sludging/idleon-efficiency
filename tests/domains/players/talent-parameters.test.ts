/**
 * Cooking Domain Live Game Validation
 * 
 * Tests our cooking domain calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { Player } from '../../../data/domain/player';
import { ClassIndex } from '../../../data/domain/talents';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'live-game-2025-08-23'; // This should match extraction time
const extractionResultsName = 'talents-sludgeadin.json';


export const generalTalentParameterSpecs: Record<string, ParameterTestSpec> = {
  talent_146_bonus: {
    id: 'talent_146_enhanced_bonus',
    description: 'Apocalypse Chow - Talent 146 Enhanced bonus',
    extractionKey: 'talent_146_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const lastIndexBloodBerserker = players.filter(player => player.getEliteClass() == ClassIndex.Blood_Berserker).sort((player1, player2) => player2.playerID - player1.playerID)[0] ?? undefined;
      return lastIndexBloodBerserker.getTalentEnhancedBonus(146);
    }
  },
  all_talent_level_146: {
    id: 'all_talent_level_146',
    description: 'All talent level 146',
    extractionKey: 'all_talent_level_146',
    domainExtractor: (gameData) => {
        const players = gameData.get("players") as Player[];
        const talent146 = players.flatMap(player => player.talents).find(talent => talent.skillIndex == 146);
        return talent146 ? talent146.maxLevel - talent146.bookMaxLevel : 0;
    }
  },
  all_talent_level_49: {
    id: 'all_talent_level_49',
    description: 'All talent level - 49',
    extractionKey: 'all_talent_level_49',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const talent49 = players.flatMap(player => player.talents).find(talent => talent.skillIndex == 49);
      return talent49 ? talent49.maxLevel - talent49.bookMaxLevel : 0;
    }
  },
};

describe('Talent Domain - General - Parameters', () => {
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
    it('validates all general talent parameters against extracted results', () => {
      // Run table-driven parameter validation
      const parameterResults = runParameterValidationSuite(
        generalTalentParameterSpecs,
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
