import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { Companion } from '../../../data/domain/companions';
import { GemStore } from '../../../data/domain/gemPurchases';
import { Sailing } from '../../../data/domain/sailing';
import { Clamworks } from '../../../data/domain/world-7/clamworks';
import { EventShop } from '../../../data/domain/eventShop';

const saveName = 'live-game-2026-01-11';
const extractionResultsName = 'legend-talents-data.json';

export const legendTalentsParameterSpecs: Record<string, ParameterTestSpec> = {
  // ===== POINTS SYSTEM =====
  points_owned: {
    id: 'points_owned',
    description: 'Total legend talent points owned from all sources',
    extractionKey: 'points_owned',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.pointsOwned;
    }
  },
  points_spent: {
    id: 'points_spent',
    description: 'Total points spent (sum of all talent levels)',
    extractionKey: 'points_spent',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.pointsSpent;
    }
  },
  companion_37_owned: {
    id: 'companion_37_owned',
    description: 'Companion 37 owned status (contributes 10 points if owned)',
    extractionKey: 'companion_37_owned',
    domainExtractor: (gameData) => {
      const companions = gameData.get("companions") as Companion[];
      return companions.find(c => c.id === 37)?.owned ? 1 : 0;
    }
  },
  gem_shop_42: {
    id: 'gem_shop_42',
    description: 'Gem shop item 42 purchase count',
    extractionKey: 'gem_shop_42',
    domainExtractor: (gameData) => {
      const gemStore = gameData.get("gems") as GemStore;
      return gemStore.purchases.find(purchase => purchase.no == 42)?.pucrhased ?? 0;
    }
  },
  sailing_artifact_34_processed: {
    id: 'sailing_artifact_34_processed',
    description: 'Sailing artifact 34 processed bonus (min 5, rounded)',
    extractionKey: 'sailing_artifact_34_processed',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return Math.min(5, Math.round(sailing.artifacts.find(artifact => artifact.index == 34)?.getBonus() ?? 0));
    }
  },
  clam_work_bonus_1: {
    id: 'clam_work_bonus_1',
    description: 'Clam work bonus 1',
    extractionKey: 'clam_work_bonus_1',
    domainExtractor: (gameData) => {
      const clamworks = gameData.get("clamworks") as Clamworks;
      return clamworks.isBonusUnlocked(1) ? 1 : 0;
    }
  },
  clam_work_bonus_4: {
    id: 'clam_work_bonus_4',
    description: 'Clam work bonus 4',
    extractionKey: 'clam_work_bonus_4',
    domainExtractor: (gameData) => {
      const clamworks = gameData.get("clamworks") as Clamworks;
      return clamworks.isBonusUnlocked(4) ? 1 : 0;
    }
  },
  event_shop_32: {
    id: 'event_shop_32',
    description: 'Event shop bonus 32',
    extractionKey: 'event_shop_32',
    domainExtractor: (gameData) => {
      const eventShop = gameData.get("eventShop") as EventShop;
      return eventShop.isBonusOwned(32) ? 2 : 0;
    }
  },
  // NOTE: The following TODO features are NOT tested individually because they don't exist
  // as separate values in the domain. They contribute to pointsOwned, which WILL fail
  // if these bonuses exist in the game but aren't implemented in the domain.
  // Uncomment these tests if/when these systems are implemented in the domain:
  // zenith_market_5: {
  //   id: 'zenith_market_5',
  //   description: 'Zenith market bonus 5 (TODO feature in domain)',
  //   extractionKey: 'zenith_market_5',
  //   domainExtractor: (gameData) => {
  //     // TODO: Implement zenith market bonus 5, then extract the bonus here
  //     throw new Error('Zenith market bonus 5 not yet implemented in domain');
  //   }
  // },

  // ===== INDIVIDUAL TALENT LEVELS =====
  talent_0_level: {
    id: 'talent_0_level',
    description: 'Talent 0 (Coral Restoration) level',
    extractionKey: 'talent_0_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[0].level;
    }
  },
  talent_3_level: {
    id: 'talent_3_level',
    description: 'Talent 3 (Extended Database) level',
    extractionKey: 'talent_3_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[3].level;
    }
  },
  talent_5_level: {
    id: 'talent_5_level',
    description: 'Talent 5 (Kruk be Bubblin\') level',
    extractionKey: 'talent_5_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[5].level;
    }
  },
  talent_7_level: {
    id: 'talent_7_level',
    description: 'Talent 7 (Super Duper Talents) level',
    extractionKey: 'talent_7_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[7].level;
    }
  },
  talent_11_level: {
    id: 'talent_11_level',
    description: 'Talent 11 (Davey Jones Returns) level',
    extractionKey: 'talent_11_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[11].level;
    }
  },
  talent_15_level: {
    id: 'talent_15_level',
    description: 'Talent 15 (Reduced Jail Sentence) level',
    extractionKey: 'talent_15_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[15].level;
    }
  },
  talent_19_level: {
    id: 'talent_19_level',
    description: 'Talent 19 (More Soot More Salt) level',
    extractionKey: 'talent_19_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[19].level;
    }
  },
  talent_21_level: {
    id: 'talent_21_level',
    description: 'Talent 21 (Flopping a Full House) level',
    extractionKey: 'talent_21_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[21].level;
    }
  },
  talent_22_level: {
    id: 'talent_22_level',
    description: 'Talent 22 (Democracy FTW) level',
    extractionKey: 'talent_22_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[22].level;
    }
  },
  talent_25_level: {
    id: 'talent_25_level',
    description: 'Talent 25 (Midusian Appetite) level',
    extractionKey: 'talent_25_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[25].level;
    }
  },
  talent_30_level: {
    id: 'talent_30_level',
    description: 'Talent 30 (Lightning Fast Naps) level',
    extractionKey: 'talent_30_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[30].level;
    }
  },
  talent_35_level: {
    id: 'talent_35_level',
    description: 'Talent 35 (Obsolete No More) level',
    extractionKey: 'talent_35_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[35].level;
    }
  },
  talent_38_level: {
    id: 'talent_38_level',
    description: 'Talent 38 (Shrine World Order Bill) level',
    extractionKey: 'talent_38_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[38].level;
    }
  },
  talent_39_level: {
    id: 'talent_39_level',
    description: 'Talent 39 (Super Talent Points) level',
    extractionKey: 'talent_39_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[39].level;
    }
  },
  talent_40_level: {
    id: 'talent_40_level',
    description: 'Talent 40 (filler) level - should be 0',
    extractionKey: 'talent_40_level',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.talents[40].level;
    }
  },

  // ===== CALCULATED BONUSES =====
  talent_0_bonus: {
    id: 'talent_0_bonus',
    description: 'Talent 0 (Coral Restoration) bonus calculation',
    extractionKey: 'talent_0_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(0);
    }
  },
  talent_3_bonus: {
    id: 'talent_3_bonus',
    description: 'Talent 3 (Extended Database) bonus calculation',
    extractionKey: 'talent_3_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(3);
    }
  },
  talent_5_bonus: {
    id: 'talent_5_bonus',
    description: 'Talent 5 (Kruk be Bubblin\') bonus calculation',
    extractionKey: 'talent_5_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(5);
    }
  },
  talent_7_bonus: {
    id: 'talent_7_bonus',
    description: 'Talent 7 (Super Duper Talents) bonus calculation',
    extractionKey: 'talent_7_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(7);
    }
  },
  talent_11_bonus: {
    id: 'talent_11_bonus',
    description: 'Talent 11 (Davey Jones Returns) bonus calculation',
    extractionKey: 'talent_11_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(11);
    }
  },
  talent_15_bonus: {
    id: 'talent_15_bonus',
    description: 'Talent 15 (Reduced Jail Sentence) bonus calculation',
    extractionKey: 'talent_15_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(15);
    }
  },
  talent_19_bonus: {
    id: 'talent_19_bonus',
    description: 'Talent 19 (More Soot More Salt) bonus calculation',
    extractionKey: 'talent_19_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(19);
    }
  },
  talent_21_bonus: {
    id: 'talent_21_bonus',
    description: 'Talent 21 (Flopping a Full House) bonus calculation',
    extractionKey: 'talent_21_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(21);
    }
  },
  talent_22_bonus: {
    id: 'talent_22_bonus',
    description: 'Talent 22 (Democracy FTW) bonus calculation',
    extractionKey: 'talent_22_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(22);
    }
  },
  talent_25_bonus: {
    id: 'talent_25_bonus',
    description: 'Talent 25 (Midusian Appetite) bonus calculation',
    extractionKey: 'talent_25_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(25);
    }
  },
  talent_30_bonus: {
    id: 'talent_30_bonus',
    description: 'Talent 30 (Lightning Fast Naps) bonus calculation',
    extractionKey: 'talent_30_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(30);
    }
  },
  talent_35_bonus: {
    id: 'talent_35_bonus',
    description: 'Talent 35 (Obsolete No More) bonus calculation',
    extractionKey: 'talent_35_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(35);
    }
  },
  talent_38_bonus: {
    id: 'talent_38_bonus',
    description: 'Talent 38 (Shrine World Order Bill) bonus calculation',
    extractionKey: 'talent_38_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(38);
    }
  },
  talent_39_bonus: {
    id: 'talent_39_bonus',
    description: 'Talent 39 (Super Talent Points) bonus calculation',
    extractionKey: 'talent_39_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(39);
    }
  },
  talent_40_bonus: {
    id: 'talent_40_bonus',
    description: 'Talent 40 (filler) bonus - should be 0',
    extractionKey: 'talent_40_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(40);
    }
  },

  // ===== SUPER TALENT SYSTEM =====
  super_talent_unlocked: {
    id: 'super_talent_unlocked',
    description: 'Super talent system unlock status (1 if unlocked, 0 otherwise)',
    extractionKey: 'super_talent_unlocked',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.superTalentUnlocked ? 1 : 0;
    }
  },
  super_talent_bonus_levels: {
    id: 'super_talent_bonus_levels',
    description: 'Super talent bonus levels (50 + talent7 bonus + zenith market bonus)',
    extractionKey: 'super_talent_bonus_levels',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.superTalentBonusLevels;
    }
  },
};

describe('Legend Talents Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    global.testSetup('Loading extraction results and game data');
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  it('validates all legend talents parameters', () => {
    const parameterResults = runParameterValidationSuite(
      legendTalentsParameterSpecs,
      extractionResults,
      gameData,
      0.01  // 1% tolerance for numeric values
    );

    const failures: string[] = [];
    let passedCount = 0;

    parameterResults.forEach(result => {
      if (result.passed) {
        passedCount++;
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

      throw new Error(`Parameter validation failed:\n   ${failureDetails}\n\nThis indicates the domain implementation is incomplete or incorrect.`);
    }
  });
});
