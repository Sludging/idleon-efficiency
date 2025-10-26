import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { Player } from '../../../data/domain/player';
import { ClassIndex } from '../../../data/domain/talents';
import { Votes } from '../../../data/domain/world-2/votes';
import { Companion } from '../../../data/domain/companions';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { number2letter } from '../../../data/utility';
import { Alchemy } from '../../../data/domain/alchemy';
import { Equinox } from '../../../data/domain/equinox';
import { Arcade } from '../../../data/domain/arcade';
import { Emperor } from '../../../data/domain/emperor';
import { Tesseract } from '../../../data/domain/tesseract';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'live-game-2025-10-26'; // This should match extraction time
const extractionResultsName = 'equinox-rate.json';


export const equinoxRateParameterSpecs: Record<string, ParameterTestSpec> = {
  has_bun_q: {
    id: 'has_bun_q',
    description: 'Has bun_q bundle',
    extractionKey: 'has_bun_q',
    domainExtractor: (gameData) => {
      const rawData = gameData.get("rawData") as Record<string, any>;

      let bundleInfo: any = undefined;
      if (rawData["BundlesReceived"] !== undefined) {
        bundleInfo = JSON.parse(rawData["BundlesReceived"]) as Record<string, number>;
      }
      const hasBundle = bundleInfo == undefined ? false : bundleInfo.bun_q == 1;
      return hasBundle;
    }
  },
  voting_bonus_32: {
    id: 'voting_bonus_32',
    description: 'Voting bonus 32',
    extractionKey: 'voting_bonus_32',
    domainExtractor: (gameData) => {
      const votes = gameData.get("votes") as Votes;
      return votes.getCurrentBonus(32);
    }
  },
  companion_15_bonus: {
    id: 'companion_15_bonus',
    description: 'Companion 15 bonus',
    extractionKey: 'companion_15_bonus',
    domainExtractor: (gameData) => {
      const companions = gameData.get("companions") as Companion[];
      return companions.find(c => c.id === 15)?.data.bonus ?? 0;
    }
  },
  cosmo_bonus_2_5: {
    id: 'cosmo_bonus_2_5',
    description: 'Cosmo bonus 2 - 5',
    extractionKey: 'cosmo_bonus_2_5',
    domainExtractor: (gameData) => {
      const hole = gameData.get("hole") as Hole;
      return hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index == 26)?.getBonus() ?? 0;
    }
  },
  event_shop_owned_3: {
    id: 'event_shop_owned_3',
    description: 'Event shop owned 3',
    extractionKey: 'event_shop_owned_3',
    domainExtractor: (gameData) => {
      const optionList = gameData.get("OptLacc") as number[];
      return optionList[311].toString().includes(number2letter(3)) ? 1 : 0;
    }
  },
  option_320_bonus: {
    id: 'option_320_bonus',
    description: 'Option 320 bonus',
    extractionKey: 'option_320_bonus',
    domainExtractor: (gameData) => {
      const optionList = gameData.get("OptLacc") as number[];
      return optionList[320] / 10;
    }
  },
  alch_vials_eq_bar_bonus: {
    id: 'alch_vials_eq_bar_bonus',
    description: 'Alch vials eq bar bonus',
    extractionKey: 'alch_vials_eq_bar_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getVialBonusForKey("EqBar");
    }
  },
  cloud_bonus_3: {
    id: 'cloud_bonus_3',
    description: 'Cloud bonus 3',
    extractionKey: 'cloud_bonus_3',
    domainExtractor: (gameData) => {
      const equinox = gameData.get("equinox") as Equinox;
      return equinox.challenges.find(challenge => challenge.index == 3)?.complete ? 1 : 0;
    }
  },
  cloud_bonus_9: {
    id: 'cloud_bonus_9',
    description: 'Cloud bonus 9',
    extractionKey: 'cloud_bonus_9',
    domainExtractor: (gameData) => {
      const equinox = gameData.get("equinox") as Equinox;
      return equinox.challenges.find(challenge => challenge.index == 9)?.complete ? 1 : 0;
    }
  },
  cloud_bonus_14: {
    id: 'cloud_bonus_14',
    description: 'Cloud bonus 14',
    extractionKey: 'cloud_bonus_14',
    domainExtractor: (gameData) => {
      const equinox = gameData.get("equinox") as Equinox;
      return equinox.challenges.find(challenge => challenge.index == 14)?.complete ? 1 : 0;
    }
  },
  cloud_bonus_19: {
    id: 'cloud_bonus_19',
    description: 'Cloud bonus 19',
    extractionKey: 'cloud_bonus_19',
    domainExtractor: (gameData) => {
      const equinox = gameData.get("equinox") as Equinox;
      return equinox.challenges.find(challenge => challenge.index == 19)?.complete ? 1 : 0;
    }
  },
  cloud_bonus_22: {
    id: 'cloud_bonus_22',
    description: 'Cloud bonus 22',
    extractionKey: 'cloud_bonus_22',
    domainExtractor: (gameData) => {
      const equinox = gameData.get("equinox") as Equinox;
      return equinox.challenges.find(challenge => challenge.index == 22)?.complete ? 1 : 0;
    }
  },
  cloud_bonus_24: {
    id: 'cloud_bonus_24',
    description: 'Cloud bonus 24',
    extractionKey: 'cloud_bonus_24',
    domainExtractor: (gameData) => {
      const equinox = gameData.get("equinox") as Equinox;
      return equinox.challenges.find(challenge => challenge.index == 24)?.complete ? 1 : 0;
    }
  },
  cloud_bonus_29: {
    id: 'cloud_bonus_29',
    description: 'Cloud bonus 29',
    extractionKey: 'cloud_bonus_29',
    domainExtractor: (gameData) => {
      const equinox = gameData.get("equinox") as Equinox;
      return equinox.challenges.find(challenge => challenge.index == 29)?.complete ? 1 : 0;
    }
  },
  arcade_bonus_41: {
    id: 'arcade_bonus_41',
    description: 'Arcade bonus 41',
    extractionKey: 'arcade_bonus_41',
    domainExtractor: (gameData) => {
      const arcade = gameData.get("arcade") as Arcade;
      return arcade.bonuses.find(bonus => bonus.index == 41)?.getBonus() ?? 0;
    }
  },
  emperor_bonus_5: {
    id: 'emperor_bonus_5',
    description: 'Emperor bonus 5',
    extractionKey: 'emperor_bonus_5',
    domainExtractor: (gameData) => {
      const emperor = gameData.get("emperor") as Emperor;
      return emperor.emperorBonuses.find(bonus => bonus.index == 5)?.getBonus() ?? 0;
    }
  },
  tesseract_bonus_37: {
    id: 'tesseract_bonus_37',
    description: 'Tesseract bonus 37',
    extractionKey: 'tesseract_bonus_37',
    domainExtractor: (gameData) => {
      const tesseract = gameData.get("tesseract") as Tesseract;
      return tesseract.getUpgradeBonus(37) ?? 0;
    }
  }
};

describe('Equinox Domain - Rate - Parameters', () => {
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
    it('validates all equinox rate parameters against extracted results', () => {
      // Run table-driven parameter validation
      const parameterResults = runParameterValidationSuite(
        equinoxRateParameterSpecs,
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
