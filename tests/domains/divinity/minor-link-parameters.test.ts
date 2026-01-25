/**
 * Divinity Minor Link Bonus Parameter Validation
 *
 * Tests our divinity minor link bonus calculations against live game data.
 *
 * Formula:
 *   max(1, Y2ACTIVE) *
 *   ((1 + CoralKidUpgBonus(3, 0) / 100) * divinityLevel) / (60 + divinityLevel) *
 *   passiveMax
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { Alchemy } from '../../../data/domain/alchemy';

const saveName = 'latest';
const extractionResultsName = 'divinity-minor-link-data.json';

export const divinityMinorLinkParameterSpecs: Record<string, ParameterTestSpec> = {
  alchemy_bubble_y2active: {
    id: 'alchemy_bubble_y2active',
    description: 'Alchemy bubble Y2ACTIVE (yellow bubble 2 active)',
    extractionKey: 'alchemy_bubble_y2active',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("Y2ACTIVE");
    }
  },

  clamworks_bonus_3: {
    id: 'clamworks_bonus_3',
    description: 'CoralKid upgrade bonus 3 (MISSING IMPLEMENTATION)',
    extractionKey: 'clamworks_bonus_3',
    domainExtractor: (_gameData) => {
      // MISSING: CoralKid is a World 7 feature without domain implementation
      // This is a game function call: CoralKidUpgBonus(3, 0)
      throw new Error("clamworks_bonus_3: NOT IMPLEMENTED - CoralKid domain missing");
    }
  },

};

describe('Divinity Domain - Minor Link Bonus - Parameters', () => {
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
    it('validates all divinity minor link parameters against extracted results', () => {
      // Run table-driven parameter validation
      const parameterResults = runParameterValidationSuite(
        divinityMinorLinkParameterSpecs,
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
