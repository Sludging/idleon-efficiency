/**
 * Cooking Domain Live Game Validation
 * 
 * Tests our cooking domain calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { Achievement } from '../../../data/domain/achievements';
import { Alchemy, Bubble, CauldronIndex, DiamonChefBubble } from '../../../data/domain/alchemy';
import { lavaFunc } from '../../../data/utility';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'listix-11092025'; // This should match extraction time
const extractionResultsName = 'diamond-chef-listix.json';


export const alchemyParameterSpecs: Record<string, ParameterTestSpec> = {
  diamondChefIsBubbleSuper: {
    id: 'diamond_chef_is_bubble_super',
    description: 'Diamond Chef - Is Bubble Super',
    extractionKey: 'diamond_chef_is_bubble_super',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return (alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef")?.prismatic ?? false) ? 1 : 0;
    }
  },

  alchemyPrismaticBonus: {
    id: 'alchemy_prismatic_bonus',
    description: 'Alchemy Prismatic Bonus',
    extractionKey: 'alchemy_prismatic_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef")?.prismaticMultiplier ?? 2;
    }
  },
  diamondChefBaseBonus: {
    id: 'diamond_chef_base_bonus',
    description: 'Diamond Chef - Base Bonus',
    extractionKey: 'diamond_chef_base_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      const diamondChef = alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef") as DiamonChefBubble;
      const baseMath = lavaFunc(diamondChef.data.func, diamondChef.level, diamondChef.data.x1, diamondChef.data.x2, false)
      return baseMath;
    }
  },

  diamondChefFinalBonus: {
    id: 'diamond_chef_final_bonus',
    description: 'Diamond Chef - Final Bonus',
    extractionKey: 'diamond_chef_final_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      const diamonChef = alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef")?.getBonus() ?? 0;
      return diamonChef
    }
  },
};

// Reenable this when it works
/* {
  "label": "diamond_chef_base_bonus",
  "expression": "Math.abs(idleon.callFunction(\"ArbitraryCode5Inputs\", idleon.getAttr(\"CustomLists\").h.AlchemyDescription[3][17][3], idleon.getAttr(\"CustomLists\").h.AlchemyDescription[3][17][1], idleon.getAttr(\"CustomLists\").h.AlchemyDescription[3][17][2], idleon.getAttr(\"CauldronInfo\")[3][17], 0, 0))",
  "description": "Diamond Chef - Base Bonus"
} */

describe('Alchemy Domain - Parameters', () => {
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
    it('validates diamond chef parameters against extracted results', () => {
      // Run table-driven parameter validation
      const parameterResults = runParameterValidationSuite(
        alchemyParameterSpecs,
        extractionResults,
        gameData,
        0.01
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
