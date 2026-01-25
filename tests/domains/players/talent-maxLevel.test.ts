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

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'talents-sludgeadin-data.json';

export const talentMaxLevelParameterSpecs: Record<string, ParameterTestSpec> = {
  talent_max_level_149_bonus: {
    id: 'talent_max_level_149_bonus',
    description: 'Max level bonus - Symbols of Beyond - Sludgadin',
    extractionKey: 'talent_max_level_149_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromTalent ?? 0;
    }
  },
  talent_max_level_family_bonus_68: {
    id: 'talent_max_level_family_bonus_68',
    description: 'Max level bonus - Family bonus 68 - Sludgadin',
    extractionKey: 'talent_max_family_bonus_68',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromES ?? 0;
    }
  },
  talent_max_level_companion_bonus: {
    id: 'talent_max_level_companion_bonus',
    description: 'Max level bonus - Companion 1 - Sludgadin',
    extractionKey: 'talent_max_level_companion_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromSlug ?? 0;
    }
  },
  talent_max_level_divinity_bonus: {
    id: 'talent_max_level_divinity_bonus',
    description: 'Max level bonus - Divinity bonus - Sludgadin',
    extractionKey: 'talent_max_level_divinity_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromBear ?? 0;
    }
  },
  talent_max_level_equinox_12_bonus: {
    id: 'talent_max_level_equinox_12_bonus',
    description: 'Max level bonus - Equinox 12 - Sludgadin',
    extractionKey: 'talent_max_level_equinox_12_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromEquinox ?? 0;
    }
  },
  talent_max_level_ninja_mastery_bonus: {
    id: 'talent_max_level_ninja_mastery_bonus',
    description: 'Max level bonus - Ninja Mastery - Sludgadin',
    extractionKey: 'talent_max_level_ninja_mastery_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromNinjaMastery ?? 0;
    }
  },
  talent_max_level_grimoire_39_bonus: {
    id: 'talent_max_level_grimoire_39_bonus',
    description: 'Max level bonus - Grimoire 39 - Sludgadin',
    extractionKey: 'talent_max_level_grimoire_39_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromGrimoire ?? 0;
    }
  },
  talent_max_level_set_kattlekruk_bonus: {
    id: 'talent_max_level_set_kattlekruk_bonus',
    description: 'Max level bonus - Kattlekruk set - Sludgadin',
    extractionKey: 'talent_max_level_set_kattlekruk_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromKattlekrukSet ?? 0;
    }
  },
  talent_max_level_tesseract_57_bonus: {
    id: 'talent_max_level_tesseract_57_bonus',
    description: 'Max level bonus - Tesseract 57 - Sludgadin',
    extractionKey: 'talent_max_level_tesseract_57_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromTesseract ?? 0;
    }
  },
  talent_max_level_final_bonus: {
    id: 'talent_max_level_final_bonus',
    description: 'Max level bonus - Final - Sludgadin',
    extractionKey: 'all_talent_level_146',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      const talent146 = sludgadin?.talents.find(talent => talent.skillIndex == 146);
      return talent146 ? talent146.maxLevel - talent146.bookMaxLevel : 0;
    }
  }
}
    

describe('Talent Domain - Max Level - Parameters', () => {
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
        talentMaxLevelParameterSpecs,
        extractionResults,
        gameData,
        0,
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
