/**
 * Cooking Domain Live Game Validation
 * 
 * Tests our cooking domain calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Cooking } from '../../../data/domain/cooking';
import { StarSigns } from '../../../data/domain/starsigns';
import { CropScientistBonusText, Farming } from '../../../data/domain/world-6/farming';
import { Player } from '../../../data/domain/player';
import { Votes } from '../../../data/domain/world-2/votes';
import { Alchemy } from '../../../data/domain/alchemy';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { AtomCollider } from '../../../data/domain/atomCollider';
import { TotalizerBonus, Worship } from '../../../data/domain/worship';
import { Sailing } from '../../../data/domain/sailing';
import { Arcade } from '../../../data/domain/arcade';
import { Stamp } from '../../../data/domain/world-1/stamps';
import { Lab } from '../../../data/domain/lab';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { Card } from '../../../data/domain/cards';
import { Achievement } from '../../../data/domain/achievements';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'cooking-speed-data.json';


const cookingParameterSpecs: Record<string, ParameterTestSpec> = {
  // Kitchen instance values
  mealLevels: {
    description: 'Kitchen meal levels',
    extractionKey: 'kitchen_0_meal_levels',
    domainExtractor: (gameData) => {
      const cooking = gameData.get('cooking') as Cooking;
      return cooking?.kitchens[0]?.mealLevels;
    },
  },

  recipeLevels: {
    description: 'Kitchen recipe levels',
    extractionKey: 'kitchen_0_recipe_levels',
    domainExtractor: (gameData) => {
      const cooking = gameData.get('cooking') as Cooking;
      return cooking?.kitchens[0]?.recipeLevels;
    },
  },

  luckLevels: {
    description: 'Kitchen luck levels',
    extractionKey: 'kitchen_0_luck_levels',
    domainExtractor: (gameData) => {
      const cooking = gameData.get('cooking') as Cooking;
      return cooking?.kitchens[0]?.luckLevels;
    },
  },

  // Bonus parameters
  starsignBonus: {
    description: 'Star sign cooking speed bonus',
    extractionKey: 'starsign_58_bonus',
    domainExtractor: (gameData) => {
      const starSigns = gameData.get("starsigns") as StarSigns;
      const starsign58 = starSigns.unlockedStarSigns.find(sign => sign.name == "Gordonius Major")?.getBonus("Cooking SPD (Multiplicative!)") ?? 0;
      return starsign58;
    },
  },

  talent59Bonus: {
    description: 'Talent 59 bonus',
    extractionKey: 'talent_59_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get('players') as Player[];
      const bestbloodMarrowBonus = Math.max(...players.flatMap(player => (player.talents.find(talent => talent.skillIndex == 59)?.getBonus() ?? 0)));
      return bestbloodMarrowBonus;
    },
  },

  cropSc3Bonus: {
    description: 'Crop SC 3 bonus',
    extractionKey: 'crop_sc_3_bonus',
    domainExtractor: (gameData) => {
      const farming = gameData.get('farming') as Farming;
      return farming?.cropScientist.getBonus(CropScientistBonusText.CookingSpeed) ?? 0;
    },
  },

  enhancedTalent146Bonus: {
    description: 'Enhanced Talent 146 bonus',
    extractionKey: 'talent_enh_146_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get('players') as Player[];
      const bestapocalypseChowBonus = Math.max(...players.flatMap(player => (player.getTalentEnhancedBonus(146))));
      return bestapocalypseChowBonus;
    },
  },

  voting13Bonus: {
    description: 'Voting 13 bonus',
    extractionKey: 'voting_13_bonus',
    domainExtractor: (gameData) => {
      const votes = gameData.get('votes') as Votes;
      const votingBonus13 = votes.getCurrentBonus(13);
      return votingBonus13;
    },
  },

  vault54Bonus: {
    description: 'Vault 54 bonus',
    extractionKey: 'vault_upg_54_bonus',
    domainExtractor: (gameData) => {
      const upgradeVault = gameData.get('upgradeVault') as UpgradeVault;
      const upgradeVaultBonus = upgradeVault.getBonusForId(54);
      return upgradeVaultBonus;
    },
  },

  mealBonusZMealFarm: {
    description: 'Meal bonus for Z meal farm',
    extractionKey: 'meal_bonus_zmealfarm',
    domainExtractor: (gameData) => {
      const cooking = gameData.get('cooking') as Cooking;
      const zMealFarmBonus = cooking.getMealBonusForKey("zMealFarm");
      return zMealFarmBonus;
    },
  },

  alchBubblesMealSpdzBonus: {
    description: 'Alchemy bubbles MealSpdz bonus',
    extractionKey: 'alch_bubbles_meal_spdz_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      const diamonChef = alchemy.getBubbleBonusForKey("MealSpdz");
      return diamonChef
    }
  },

  atomBonuses8Bonus: {
    description: 'Atom bonuses 8 bonus',
    extractionKey: 'atom_bonuses_8_bonus',
    domainExtractor: (gameData) => {
      const collider = gameData.get("collider") as AtomCollider;
      const atomBonus8 = collider.atoms[8].getBonus();
      return atomBonus8;
    }
  },

  msa1Bonus: {
    description: 'MSA 1 bonus',
    extractionKey: 'msa_1_bonus',
    domainExtractor: (gameData) => {
      const worship = gameData.get("worship") as Worship;
      const worshipBonus = worship.totalizer.getBonus(TotalizerBonus.Cooking);
      return worshipBonus;
    }
  },

  artifact13Bonus: {
    description: 'Artifact 13 bonus',
    extractionKey: 'artifact_13_bonus',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      const artifactBonus13 = sailing.artifacts[13].getBonus();
      return artifactBonus13;
    }
  },

  arcade28Bonus: {
    description: 'Arcade 28 bonus',
    extractionKey: 'arcade_28_bonus',
    domainExtractor: (gameData) => {
      const arcade = gameData.get("arcade") as Arcade;
      const arcadeBonus28 = arcade.bonuses.find(bonus => bonus.effect == "+{% Cook SPD multi")?.getBonus() ?? 0;
      return arcadeBonus28;
    }
  },

  alchVials6turtleBonus: {
    description: 'Alchemy vial bonus for 6turtle',
    extractionKey: 'alch_vials_6turtle_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      const alchVials6turtleBonus = alchemy.getVialBonusForKey("6turtle");
      return alchVials6turtleBonus;
    }
  },

  alchVialsMealCookBonus: {
    description: 'Alchemy vial bonus for MealCook',
    extractionKey: 'alch_vials_MealCook_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      const alchVialsMealCookBonus = alchemy.getVialBonusForKey("MealCook");
      return alchVialsMealCookBonus;
    }
  },

  stampBonusMealCook: {
    description: 'Stamp bonus for MealCook',
    extractionKey: 'stamp_bonus_MealCook',
    domainExtractor: (gameData) => {
      const stamps = gameData.get("stamps") as Stamp[][];
      const stampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.bonus.includes("Meal Cooking Speed")).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
      return stampBonus;
    }
  },

  mainframe114Bonus: {
    description: 'Mainframe 114 bonus',
    extractionKey: 'mainframe_114_bonus',
    domainExtractor: (gameData) => {
      const mainframe = gameData.get("lab") as Lab;
      const jewel14Bonus = mainframe.jewels[14].getBonus();
      return jewel14Bonus;
    }
  },

  mealBonusMcook: {
    description: 'Meal bonus for Mcook',
    extractionKey: 'meal_bonus_Mcook',
    domainExtractor: (gameData) => {
      const cooking = gameData.get("cooking") as Cooking;
      const mealSpeedBonus = cooking.getMealBonusForKey("Mcook");
      return mealSpeedBonus;
    }
  },

  summoningWinBonus15: {
    description: 'Summoning win bonus 15',
    extractionKey: 'summoning_win_bonus_15',
    domainExtractor: (gameData) => {
      const summoning = gameData.get("summoning") as Summoning;
      // Our bonus index starts at 1, so we get 16 instead of 15.
      const winnerBonus = summoning.summonBonuses.find(bonus => bonus.data.bonusId == 16)?.getBonus() ?? 0;
      return winnerBonus;
    }
  },

  holesMonumentRogBonuses02: {
    description: 'Holes monument - Bravery bonus 2',
    extractionKey: 'holes_monument_rog_bonuses_0_2',
    domainExtractor: (gameData) => {
      const hole = gameData.get("hole") as Hole;
      const holeBravey2Bonus = hole.getMonumentBonus("Bravery", 2);
      return holeBravey2Bonus;
    }
  },

  holesBUpg56Bonus: {
    description: 'Holes Schematics 56 bonus',
    extractionKey: 'holes_b_upg_56_bonus',
    domainExtractor: (gameData) => {
      const hole = gameData.get("hole") as Hole;
      const holeSchematic56 = hole.getSchematicBonus(56);
      return holeSchematic56;
    }
  },

  cardW6c1Bonus: {
    description: 'Card w6c1 bonus',
    extractionKey: 'card_w6c1_bonus',
    domainExtractor: (gameData) => {
      const cards = gameData.get("cards") as Card[];
      // Sadly the game checks for number of levels, not the actual bonus so we do this.
      // Hopefully this still leads to a good test.
      const ceramicCardBonus = (cards.find(card => card.id == "w6c1")?.getLevels() ?? 0) + 1;
      return ceramicCardBonus;
    }
  },

  lampBonus0: {
    description: 'Lamp bonus 0',
    extractionKey: 'lamp_bonuses_0',
    domainExtractor: (gameData) => {
      const hole = gameData.get("hole") as Hole;
      const holeLampBonus0 = hole.lamp.getBonus(false, 0, 0);
      return holeLampBonus0;
    }
  },

  alchVials6cookspdBonus: {
    description: 'Alchemy vial bonus for 6CookSpd',
    extractionKey: 'alch_vials_6cookspd_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      const alchVials6cookspdBonus = alchemy.getVialBonusForKey("6CookSpd");
      return alchVials6cookspdBonus;
    }
  },

  mainframe100Bonus: {
    description: 'Mainframe 100 bonus',
    extractionKey: 'mainframe_100_bonus',
    domainExtractor: (gameData) => {
      const mainframe = gameData.get("lab") as Lab;
      const jewel0Bonus = mainframe.jewels[0].getBonus();
      return jewel0Bonus;
    }
  },

  cardBoss4aBonus: {
    description: 'Card boss4a bonus',
    extractionKey: 'card_boss4a_bonus',
    domainExtractor: (gameData) => {
      const cards = gameData.get("cards") as Card[];
      // Sadly the game checks for number of levels, not the actual bonus so we do this.
      // Hopefully this still leads to a good test.
      const trollCardBonus = (cards.find(card => card.id == "Boss4A")?.getLevels() ?? 0) + 1;
      return trollCardBonus;
    }
  },

  achieveStatus225Bonus: {
    description: 'Achieve status 225 bonus',
    extractionKey: 'achieve_status_225_bonus',
    domainExtractor: (gameData) => {
      const achievements = gameData.get("achievements") as Achievement[];
      return achievements[225].completed;
    }
  },

  achieveStatus224Bonus: {
    description: 'Achieve status 224 bonus',
    extractionKey: 'achieve_status_224_bonus',
    domainExtractor: (gameData) => {
      const achievements = gameData.get("achievements") as Achievement[];
      return achievements[224].completed;
    }
  },

  mealBonusKitchenEff: {  
    description: 'Meal bonus for KitchenEff',
    extractionKey: 'meal_bonus_KitchenEff',
    domainExtractor: (gameData) => {
      const cooking = gameData.get("cooking") as Cooking;
      const kitchenEfficientBonus = cooking.getMealBonusForKey("KitchenEff");
      return kitchenEfficientBonus;
    }
  }
};

describe('Cooking Domain - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(cookingParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0.01);
    });
  });
});
