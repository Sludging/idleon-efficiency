import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Bubba } from '../../../data/domain/world-3/bubba';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';

const saveName = 'latest';
const extractionResultsName = 'worship-soul-rewards-data.json';

const parameterSpecs = {
  worship_efficiency: {
    description: 'Worship efficiency (TODO: not yet implemented)',
    extractionKey: 'worship_efficiency',
    domainExtractor: (_gameData: Map<string, any>) => {
      // TODO: This feature is not yet implemented in the domain
      // Game function: skillstats2("WorshipEfficiency")
      // This test will fail until worship efficiency calculation is added to the domain
      throw new Error("worship_efficiency: NOT IMPLEMENTED - skillstats2('WorshipEfficiency') calculation missing from domain");
    }
  },

  food_bonus_worship_soul_boosts: {
    description: 'Food bonus for worship soul boosts (TODO: not yet implemented)',
    extractionKey: 'food_bonus_worship_soul_boosts',
    domainExtractor: (_gameData: Map<string, any>) => {
      // TODO: This feature is not yet implemented in the domain
      // Game function: TotalFoodBonuses("WorshipSoulBoosts")
      // This test will fail until food bonus calculation is added to the cooking domain
      throw new Error("food_bonus_worship_soul_boosts: NOT IMPLEMENTED - TotalFoodBonuses('WorshipSoulBoosts') missing from Cooking domain");
    }
  },

  talent_57: {
    description: 'Talent 57 bonus (TODO: not yet implemented)',
    extractionKey: 'talent_57',
    domainExtractor: (_gameData: Map<string, any>) => {
      // TODO: This feature is not yet implemented in the domain
      // Game function: TalentCalc(57)
      // This test will fail until talent calculation context is properly implemented
      throw new Error("talent_57: NOT IMPLEMENTED - TalentCalc(57) context-aware calculation missing from domain");
    }
  },

  bubba_bonus_3: {
    description: 'Bubba global bonus 3 (Soul Gain)',
    extractionKey: 'bubba_bonus_3',
    domainExtractor: (gameData: Map<string, any>) => {
      const bubba = gameData.get("bubba") as Bubba;
      return bubba.getGlobalBonus(3);
    }
  },

  dementia_set_bonus: {
    description: 'Dementia equipment set bonus',
    extractionKey: 'dementia_set_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const equipmentSets = gameData.get("equipmentSets") as EquipmentSets;
      const dementiaSet = equipmentSets.equipmentSets.find(set => set.data.name == "DEMENTIA_SET");
      return dementiaSet?.getBonus(true) || 0;
    }
  },

  arcade_bonus_24: {
    description: 'Arcade bonus 24',
    extractionKey: 'arcade_bonus_24',
    domainExtractor: (gameData: Map<string, any>) => {
      const arcade = gameData.get("arcade") as Arcade;
      return arcade.bonuses.find(bonus => bonus.index == 24)?.getBonus() || 0;
    }
  },

  vault_upgrade_50: {
    description: 'Vault upgrade 50 bonus',
    extractionKey: 'vault_upgrade_50',
    domainExtractor: (gameData: Map<string, any>) => {
      const upgradeVault = gameData.get("upgradeVault") as UpgradeVault;
      return upgradeVault.getBonusForId(50);
    }
  },
};

describe('Worship Domain - Soul Rewards - Parameters', () => {
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
