/**
 * Divinity Blessing Bonus Validation
 *
 * Tests our divinity blessing bonus calculations against live game data.
 *
 * Standard formula (most gods):
 *   blessLevel * blessingPerLevel * (1 + 0.05 * emporiumBonus33 * max(0, godRank))
 *   where godRank = numberOfUnlockedGods - 10
 *
 * God 2 (Nobisect) uses special BlessyBunDN formula with skill efficiencies and stats.
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { Divinity } from '../../../data/domain/divinity';
import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { Alchemy } from '../../../data/domain/alchemy';
import { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'divinity-blessing-data.json';

export const divinityBlessingParameterSpecs: Record<string, ParameterTestSpec> = {
  emporium_bonus_33: {
    id: 'emporium_bonus_33',
    description: 'Jade Emporium upgrade 33 bonus (True Godly Blessings)',
    extractionKey: 'emporium_bonus_33',
    domainExtractor: (gameData) => {
      const sneaking = gameData.get("sneaking") as Sneaking;
      const upgrade33 = sneaking.jadeUpgrades.find(upgrade => upgrade.index === 33);
      // Upgrade 33 gives 1.05x higher blessing per god rank if purchased
      // The game code uses this as a multiplier: 0.05 * EmporiumBonus(33) * godRank
      // If purchased, EmporiumBonus returns 1, otherwise 0
      return upgrade33?.purchased ? 1 : 0;
    }
  },

  gods_unlocked_count: {
    id: 'gods_unlocked_count',
    description: 'Number of gods unlocked + god rank',
    extractionKey: 'gods_unlocked_count',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      const unlockedGods = divinity.gods.filter(god => god.unlocked).length;
      return unlockedGods + divinity.godRank;
    }
  },

  // God 2 (Nobisect) - BlessyBunDN intermediate calculations
  skill_all_efficiencies: {
    id: 'skill_all_efficiencies',
    description: 'All skill efficiencies stat (MISSING IMPLEMENTATION)',
    extractionKey: 'skill_all_efficiencies',
    domainExtractor: (_gameData) => {
      // MISSING: We don't currently track "AllEfficiencies" skill stats in the domain
      // This is a game function call: SkillStats("AllEfficiencies")
      // When this test fails, it indicates we need to reverse-engineer this calculation
      throw new Error("skill_all_efficiencies: NOT IMPLEMENTED - SkillStats('AllEfficiencies') calculation missing from domain");
    }
  },

  alchemy_bubble_mineff: {
    id: 'alchemy_bubble_mineff',
    description: 'Mining efficiency bubble',
    extractionKey: 'alchemy_bubble_mineff',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("MinEff");
    }
  },

  alchemy_bubble_chopeff: {
    id: 'alchemy_bubble_chopeff',
    description: 'Chopping efficiency bubble',
    extractionKey: 'alchemy_bubble_chopeff',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("ChopEff");
    }
  },

  total_stats_str: {
    id: 'total_stats_str',
    description: 'Total STR stat (active player)',
    extractionKey: 'total_stats_str',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      return players[0].stats.strength;
    }
  },

  total_stats_agi: {
    id: 'total_stats_agi',
    description: 'Total AGI stat (active player)',
    extractionKey: 'total_stats_agi',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      return players[0].stats.agility;
    }
  },

  total_stats_wis: {
    id: 'total_stats_wis',
    description: 'Total WIS stat (active player)',
    extractionKey: 'total_stats_wis',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      return players[0].stats.wisdom;
    }
  },

};

describe('Divinity Domain - Blessing Bonus - Parameters', () => {
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
    it('validates all divinity blessing parameters against extracted results', () => {
      // Run table-driven parameter validation
      const parameterResults = runParameterValidationSuite(
        divinityBlessingParameterSpecs,
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
