/**
 * Cooking Domain Live Game Validation
 * 
 * Tests our cooking domain calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { CropScientistBonusText, Farming } from '../../../data/domain/world-6/farming';
import { Player } from '../../../data/domain/player';
import { Votes } from '../../../data/domain/world-2/votes';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { AtomCollider } from '../../../data/domain/world-3/construction/atomCollider';
import { TotalizerBonus, Worship } from '../../../data/domain/world-3/worship';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { Arcade } from '../../../data/domain/world-2/arcade';
import { Button } from '../../../data/domain/world-7/button';
import { Stamp } from '../../../data/domain/world-1/stamps';
import { Lab } from '../../../data/domain/world-4/lab';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { Card } from '../../../data/domain/cards';
import { Menagerie } from '../../../data/domain/menagerie';

const saveName = 'latest';
const extractionResultsName = 'cooking-speed-data.json';


const cookingParameterSpecs: Record<string, ParameterTestSpec> = {
  // Bonus parameters
  starsignBonus: {
    description: 'Gordonius Major multiplicative cooking-speed bonus',
    extractionKey: 'starsign_58_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get('players') as Player[];
      const starsign58 = Math.max(...players.map(player => player.starSigns.find(sign => sign.name == "Gordonius Major")?.getBonus("Cooking SPD (Multiplicative!)") ?? 0), 0);
      return starsign58;
    },
  },

  talent59Bonus: {
    description: 'Blood Marrow talent cooking-speed bonus',
    extractionKey: 'talent_59_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get('players') as Player[];
      const bestbloodMarrowBonus = Math.max(...players.flatMap(player => (player.talents.find(talent => talent.skillIndex == 59)?.getBonus() ?? 0)));
      return bestbloodMarrowBonus;
    },
  },

  cropSc3Bonus: {
    description: 'Crop Scientist multiplicative cooking-speed bonus',
    extractionKey: 'crop_sc_3_bonus',
    domainExtractor: (gameData) => {
      const farming = gameData.get('farming') as Farming;
      return farming?.cropScientist.getBonus(CropScientistBonusText.CookingSpeed) ?? 0;
    },
  },

  enhancedTalent146Bonus: {
    description: 'Effective Apocalypse Chow cooking-speed multiplier',
    extractionKey: 'talent_enh_146_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get('players') as Player[];
      return Math.max(1, ...players.map(player => player.getTalentEnhancedBonus(146)));
    },
  },


  voting13Bonus: {
    description: 'Voting bonus that boosts Cooking EXP and Cooking Speed',
    extractionKey: 'voting_13_bonus',
    domainExtractor: (gameData) => {
      const votes = gameData.get('votes') as Votes;
      const votingBonus13 = votes.getCurrentBonus(13);
      return votingBonus13;
    },
  },

  vault54Bonus: {
    description: 'Kitchen Dream-mare Vault upgrade input to kitchen speed',
    extractionKey: 'vault_upg_54_bonus',
    domainExtractor: (gameData) => {
      const upgradeVault = gameData.get('upgradeVault') as UpgradeVault;
      const upgradeVaultBonus = upgradeVault.getBonusForId(54);
      return upgradeVaultBonus;
    },
  },

  mealBonusZMealFarm: {
    description: 'Burned Mello meal-cooking speed bonus input to kitchen speed',
    extractionKey: 'meal_bonus_zmealfarm',
    domainExtractor: (gameData) => {
      const cooking = gameData.get('cooking') as Cooking;
      const zMealFarmBonus = cooking.getMealBonusForKey("zMealFarm");
      return zMealFarmBonus;
    },
  },

  alchBubblesMealSpdzBonus: {
    description: 'Effective Diamond Chef multiplier to meal and fire kitchen speeds',
    extractionKey: 'alch_bubbles_meal_spdz_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return Math.max(1, alchemy.getBubbleBonusForKey("MealSpdz"));
    }
  },

  atomBonuses8Factor: {
    description: 'Effective Fluoride (Void Plate Chef) multiplier to meal and fire kitchen speeds',
    extractionKey: 'atom_bonuses_8_factor',
    domainExtractor: (gameData) => {
      const collider = gameData.get("collider") as AtomCollider;
      return Math.max(1, collider.atoms[8].getBonus());
    }
  },

  msa1Bonus: {
    description: 'MSA Mealing bonus to meal-cooking speed',
    extractionKey: 'msa_1_bonus',
    domainExtractor: (gameData) => {
      const worship = gameData.get("worship") as Worship;
      const worshipBonus = worship.totalizer.getBonus(TotalizerBonus.Cooking);
      return worshipBonus;
    }
  },

  artifact13Bonus: {
    description: 'Triagulon artifact bonus input to kitchen speed',
    extractionKey: 'artifact_13_bonus',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      const artifactBonus13 = sailing.artifacts[13].getBonus();
      return artifactBonus13;
    }
  },

  buttonBonus7: {
    description: "The Button's Crop Evo bonus input to kitchen speed",
    extractionKey: 'button_bonus_7',
    domainExtractor: (gameData) => {
      const button = gameData.get("button") as Button;
      return button.getBonusForIndex(7);
    }
  },

  arcade28Bonus: {
    description: 'Arcade Cook SPD multiplier input to kitchen speed',
    extractionKey: 'arcade_28_bonus',
    domainExtractor: (gameData) => {
      const arcade = gameData.get("arcade") as Arcade;
      return arcade.bonuses[28].getBonus();
    }
  },

  alchVials6turtleBonus: {
    description: 'Turtle Tisane vial bonus to multiplicative Cooking Speed',
    extractionKey: 'alch_vials_6turtle_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getVialBonusForKey("6turtle");
    }
  },

  alchVialsMealCookBonus: {
    description: 'MealCook alchemy vial bonus for meal-cooking speed',
    extractionKey: 'alch_vials_MealCook_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getVialBonusForKey("MealCook");
    }
  },

  stampBonusMealCook: {
    description: 'Meal Cooking Speed stamp bonus input to kitchen speed',
    extractionKey: 'stamp_bonus_MealCook',
    domainExtractor: (gameData) => {
      const stamps = gameData.get("stamps") as Stamp[][];
      return stamps.flatMap(tab => tab)
        .filter(stamp => stamp.bonus.includes("Meal Cooking Speed"))
        .reduce((sum, stamp) => sum + stamp.getBonus(), 0);
    }
  },

  mainframe114Bonus: {
    description: 'Emerald Pyramite jewel bonus to meal-cooking speed',
    extractionKey: 'mainframe_114_bonus',
    domainExtractor: (gameData) => {
      const mainframe = gameData.get("lab") as Lab;
      return mainframe.jewels[14].getBonus();
    }
  },

  mealBonusMcook: {
    description: 'Cooking meal bonuses for Meal Cooking Speed',
    extractionKey: 'meal_bonus_Mcook',
    domainExtractor: (gameData) => {
      const cooking = gameData.get("cooking") as Cooking;
      return cooking.getMealBonusForKey("Mcook");
    }
  },

  summoningWinBonus15: {
    description: 'Summoning winner bonus 15 input to Cooking SPD',
    extractionKey: 'summoning_win_bonus_15',
    domainExtractor: (gameData) => {
      const summoning = gameData.get("summoning") as Summoning;
      return summoning.summonBonuses.find(bonus => bonus.index == 15)?.getBonus() ?? 0;
    }
  },

  holesMonumentRogBonuses02: {
    description: 'Bravery monument Cooking Speed multiplier',
    extractionKey: 'holes_monument_rog_bonuses_0_2',
    domainExtractor: (gameData) => {
      const hole = gameData.get("hole") as Hole;
      return hole.getMonumentBonus("Bravery", 2);
    }
  },

  holesBUpg56Bonus: {
    description: 'Heavy Redstone Seasoning multiplicative Cooking Speed bonus',
    extractionKey: 'holes_b_upg_56_bonus',
    domainExtractor: (gameData) => {
      const hole = gameData.get("hole") as Hole;
      return hole.getSchematicBonus(56);
    }
  },

  lampBonus0: {
    description: 'More Wishes lamp bonus input to kitchen speed',
    extractionKey: 'lamp_bonuses_0',
    domainExtractor: (gameData) => {
      const hole = gameData.get("hole") as Hole;
      return hole.lamp.getBonus(false, 0, 0);
    }
  },

  alchVials6cookspdBonus: {
    description: 'Firefly Grog vial bonus to multiplicative Cooking Speed',
    extractionKey: 'alch_vials_6cookspd_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getVialBonusForKey("6CookSpd");
    }
  },

  mainframe100Bonus: {
    description: 'Amethyst Rhinestone jewel bonus to meal-cooking speed',
    extractionKey: 'mainframe_100_bonus',
    domainExtractor: (gameData) => {
      const mainframe = gameData.get("lab") as Lab;
      return mainframe.jewels[0].getBonus();
    }
  },

  mealBonusKitchenEff: {
    description: 'Cabbage meal bonus used as kitchen efficiency in meal speed',
    extractionKey: 'meal_bonus_KitchenEff',
    domainExtractor: (gameData) => {
      const cooking = gameData.get("cooking") as Cooking;
      return cooking.getMealBonusForKey("KitchenEff");
    }
  },

  ceramicCardBonus: {
    description: 'Ceramic Spirit passive card contribution to kitchen speed',
    extractionKey: 'ceramic_card_cooking_speed_bonus',
    domainExtractor: (gameData) => {
      const cards = gameData.get('cards') as Card[];
      return cards.find(card => card.id === 'w6c1')?.getBonus() ?? 0;
    }
  },

  trollCardBonus: {
    description: 'Massive Troll passive card contribution to kitchen speed',
    extractionKey: 'troll_card_cooking_speed_bonus',
    domainExtractor: (gameData) => {
      const cards = gameData.get('cards') as Card[];
      return cards.find(card => card.id === 'Boss4A')?.getBonus() ?? 0;
    }
  },

  menagerieCookingMultiplier: {
    description: 'Menagerie bonus multiplier used in kitchen speed',
    extractionKey: 'menagerie_cooking_multiplier',
    domainExtractor: (gameData) => {
      const menagerie = gameData.get('menagerie') as Menagerie;
      return menagerie.getBonusMultiplier(4);
    }
  }
};

describe('Kitchen 0 meal-speed input parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(cookingParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description} used in kitchen 0 meal speed`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
