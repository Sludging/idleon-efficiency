import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Skilling } from '../../../data/domain/skilling';
import { Food } from '../../../data/domain/items';
import type { Player } from '../../../data/domain/player';
import { getTalentCalculationBonus } from '../../../data/domain/player-talent-calculations';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import type { Bubba } from '../../../data/domain/world-3/bubba';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
const saveName = 'latest';
const extractionResultsName = 'worship-soul-rewards-data.json';

const parameterSpecs = {
  worship_efficiency: {
    description: 'Target character Worship efficiency used by Worship soul rewards',
    extractionKey: 'worship_efficiency',
    domainExtractor: (gameData: Map<string, any>) => {
      const player = getTargetPlayer(gameData.get('players') as Player[]);
      const skilling = gameData.get('skilling') as Skilling;
      return skilling.getSkillEfficiency(player.playerID, SkillsIndex.Worship);
    },
  },

  food_bonus_worship_soul_boosts: {
    description: 'Equipped Worship Soul Gain food contribution',
    extractionKey: 'food_bonus_worship_soul_boosts',
    domainExtractor: (gameData: Map<string, any>) => {
      const player = getTargetPlayer(gameData.get('players') as Player[]);
      const foodStatue = (gameData.get('statues') as PlayerStatues[])[player.playerID]
        .statues.find(statue => statue.index === 3)!;
      const inputs = {
        boostFoodStamp: getStampBonusForKey(gameData.get('stamps') as Stamp[][], 'BFood'),
        foodStatue: foodStatue.getBonus(player),
      };

      return Food.getWorshipSoulContribution(player, inputs);
    },
  },

  talent_57: {
    description: 'Species Epoch soul bonus',
    extractionKey: 'talent_57',
    domainExtractor: (gameData: Map<string, any>) => {
      const player = getTargetPlayer(gameData.get('players') as Player[]);
      return getTalentCalculationBonus(gameData, player, 57);
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
  let extractionResults: ExtractionResults;
  let efficiencyResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    efficiencyResults = loadExtractionResults('worship-efficiency-parameters-data.json');
    validateExtractionHealth(efficiencyResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const results = spec.extractionKey === 'worship_efficiency' ? efficiencyResults : extractionResults;
      const liveValue = getExtractedValue(results, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
