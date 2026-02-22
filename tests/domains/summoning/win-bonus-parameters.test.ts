/**
 * Summoning Winner Bonus Parameter Validation
 *
 * Tests our summoning winner bonus (WinBonus) calculations against live game data.
 *
 * Formula (from game code):
 * WinBonus calculation has multiple branches based on bonus index:
 *
 * 1. Indices 20, 22, 24, 31: Return raw bonus value only
 *    bonusValue
 *
 * 2. Index 19: Uses 3.5x multiplier without recursive bonus 31
 *    3.5 * bonusValue * pristineCharm * (1 + gemPurchase/100) *
 *    (1 + (artifact + min(10, taskBonus) + achiev379 + achiev373 + godshardSet) / 100)
 *
 * 3. Indices 20-33 (excluding the raw-only ones): Uses all multipliers including recursive bonus 31
 *    bonusValue * pristineCharm * (1 + gemPurchase/100) *
 *    (1 + (artifact + min(10, taskBonus) + achiev379 + achiev373 + winBonus31 + emperorBonus + godshardSet) / 100)
 *
 * 4. Default (all others): Uses 3.5x multiplier with all bonuses including recursive bonus 31
 *    3.5 * bonusValue * pristineCharm * (1 + gemPurchase/100) *
 *    (1 + (artifact + min(10, taskBonus) + achiev379 + achiev373 + winBonus31 + emperorBonus + godshardSet) / 100)
 *
 * Cross-domain dependencies:
 * - Sneaking: Pristine charm bonus (Crystal Comb)
 * - Sailing: Artifact 32 bonus
 * - TaskBoard: Merit bonus (capped at 10)
 * - Achievements: Completion status for 373 and 379
 * - EquipmentSets: Godshard set bonus
 * - Emperor: Emperor bonus 8
 * - GemStore: Gem purchase 11
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import type { TaskBoard } from '../../../data/domain/tasks';
import type { Achievement } from '../../../data/domain/achievements';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { Emperor } from '../../../data/domain/world-6/emperor';
import type { GemStore } from '../../../data/domain/gemPurchases';

const saveName = 'latest';
const extractionResultsName = 'summoning-win-bonus-data.json';

const parameterSpecs = {
  pristine_charm_bonus_8: {
    description: 'Pristine charm bonus 8 (Crystal Comb - summoning winner bonus)',
    extractionKey: 'pristine_charm_bonus_8',
    domainExtractor: (gameData: Map<string, any>) => {
      const sneaking = gameData.get("sneaking") as Sneaking;
      const crystalComb = sneaking.pristineCharms?.find(charm => charm.data.itemId === 8);
      return (crystalComb && crystalComb.unlocked) ? crystalComb.data.x1 : 0;
    }
  },

  gem_item_purchased_11: {
    description: 'Gem shop purchase 11 (Winner Bonuses)',
    extractionKey: 'gem_item_purchased_11',
    domainExtractor: (gameData: Map<string, any>) => {
      const gemStore = gameData.get("gems") as GemStore;
      return gemStore.purchases.find(purchase => purchase.no === 11)?.pucrhased ?? 0;
    }
  },

  artifact_bonus_32: {
    description: 'Sailing artifact 32 bonus (summoning winner bonus)',
    extractionKey: 'artifact_bonus_32',
    domainExtractor: (gameData: Map<string, any>) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.artifacts[32]?.getBonus() ?? 0;
    }
  },

  task_board_bonus_2_5_4: {
    description: 'Task board merit bonus for summoning winners (capped at 10 in formula)',
    extractionKey: 'task_board_bonus_2_5_4',
    domainExtractor: (gameData: Map<string, any>) => {
      const taskboard = gameData.get("taskboard") as TaskBoard;
      // Merit 44 is index [2][5] in the game data structure
      return taskboard.merits[44]?.getBonus() ?? 0;
    }
  },

  achievement_379_status: {
    description: 'Achievement 379 completion status (adds +1% if completed)',
    extractionKey: 'achievement_379_status',
    domainExtractor: (gameData: Map<string, any>) => {
      const achievements = gameData.get("achievements") as Achievement[];
      return achievements[379]?.completed ? 1 : 0;
    }
  },

  achievement_373_status: {
    description: 'Achievement 373 completion status (adds +1% if completed)',
    extractionKey: 'achievement_373_status',
    domainExtractor: (gameData: Map<string, any>) => {
      const achievements = gameData.get("achievements") as Achievement[];
      return achievements[373]?.completed ? 1 : 0;
    }
  },

  godshard_set_bonus: {
    description: 'Godshard equipment set bonus for summoning winners',
    extractionKey: 'godshard_set_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const equipmentSets = gameData.get("equipmentSets") as EquipmentSets;
      return equipmentSets.getSetBonus("GODSHARD_SET", undefined, true);
    }
  },

  emperor_bonus_8: {
    description: 'Emperor bonus 8 (summoning winner bonus)',
    extractionKey: 'emperor_bonus_8',
    domainExtractor: (gameData: Map<string, any>) => {
      const emperor = gameData.get("emperor") as Emperor;
      return emperor.emperorBonuses[8]?.getBonus() ?? 0;
    }
  }
};

describe('Summoning Domain - Winner Bonus - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
