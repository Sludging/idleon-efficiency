/**
 * Cooking Meal Bonus Parameter Validation
 *
 * Tests our cooking meal bonus calculations against live game data.
 *
 * Formula (from game code):
 *   BonusMultiCook(mealIndex) * CookingMealBonusMultioo() *
 *     RibbonBonus(ribbonLevel) * mealLevel * bonusQty
 *
 * Where CookingMealBonusMultioo =
 *   (1 + (MainframeBonus(116) + ShinyBonusS(20)) / 100) *
 *   (1 + WinBonus(26) / 100) * (1 + 25 * Companions(162) / 100)
 *
 * BonusMultiCook reads the meal's CookMaster progression.
 *
 * Note: MainframeBonus(116) maps to jewel 16 (values >100 = jewel indices)
 * Note: RibbonBonus is calculated in cooking domain, not a cross-domain dependency
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Lab } from '../../../data/domain/world-4/lab';
import { Breeding } from '../../../data/domain/world-4/breeding';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const saveName = 'latest';
const extractionResultsName = 'cooking-meal-bonus-data.json';

// The six saved meals exercise distinct observed Cook Mastery multipliers,
// from 1.0 (meal 51) through 1.615... (meal 1), across early and later meals.
// They are representative values for the same calculation, not separate branches.
const parameterSpecs: Record<string, ParameterTestSpec> = {
 mainframe_jewel_16: {
  description: 'Mainframe jewel 16 bonus (meal bonus)',
  extractionKey: 'mainframe_jewel_16',
  domainExtractor: (gameData: Map<string, any>) => {
   const lab = gameData.get("lab") as Lab;
   return lab.jewels[16].active ? lab.jewels[16].getBonus() : 0;
  }
 },

 shiny_bonus_20: {
  description: 'Breeding shiny bonus 20 (meal bonus)',
  extractionKey: 'shiny_bonus_20',
  domainExtractor: (gameData: Map<string, any>) => {
   const breeding = gameData.get("breeding") as Breeding;
   return breeding.shinyBonuses.find(bonus => bonus.data.index === 20)?.getBonus() ?? 0;
  }
 },

 win_bonus_26: {
  description: 'Summoning winner bonus 26 (meal bonus)',
  extractionKey: 'win_bonus_26',
  domainExtractor: (gameData: Map<string, any>) => {
   const summoning = gameData.get("summoning") as Summoning;
   return summoning.summonBonuses.find(bonus => bonus.index === 26)?.getBonus() ?? 0;
  }
 },

 ribbon_bonus_meal_11: {
  description: 'Ribbon bonus for meal 11',
  extractionKey: 'ribbon_bonus_meal_11',
  domainExtractor: (gameData: Map<string, any>) => {
   const cooking = gameData.get("cooking") as Cooking;
   return cooking.meals[11].getRibbonBonus();
  }
 },

 bonus_multi_cook_meal_1: {
  description: 'Cooking Mastery multiplier used in the Egg meal bonus',
  extractionKey: 'bonus_multi_cook_meal_1',
  domainExtractor: (gameData: Map<string, any>) => {
   const cooking = gameData.get("cooking") as Cooking;
   return cooking.meals[1].getBonusMultiCook();
  }
 },

 bonus_multi_cook_meal_12: {
  description: 'Cooking Mastery multiplier used in the Corndog meal bonus',
  extractionKey: 'bonus_multi_cook_meal_12',
  domainExtractor: (gameData: Map<string, any>) => {
   const cooking = gameData.get("cooking") as Cooking;
   return cooking.meals[12].getBonusMultiCook();
  }
 },

 bonus_multi_cook_meal_13: {
  description: 'Cooking Mastery multiplier used in the Cabbage meal bonus',
  extractionKey: 'bonus_multi_cook_meal_13',
  domainExtractor: (gameData: Map<string, any>) => {
   const cooking = gameData.get("cooking") as Cooking;
   return cooking.meals[13].getBonusMultiCook();
  }
 },

 bonus_multi_cook_meal_43: {
  description: 'Cooking Mastery multiplier used in the Soda meal bonus',
  extractionKey: 'bonus_multi_cook_meal_43',
  domainExtractor: (gameData: Map<string, any>) => {
   const cooking = gameData.get("cooking") as Cooking;
   return cooking.meals[43].getBonusMultiCook();
  }
 },

 bonus_multi_cook_meal_51: {
  description: 'Cooking Mastery multiplier used in the Popped Corn meal bonus',
  extractionKey: 'bonus_multi_cook_meal_51',
  domainExtractor: (gameData: Map<string, any>) => {
   const cooking = gameData.get("cooking") as Cooking;
   return cooking.meals[51].getBonusMultiCook();
  }
 },

 bonus_multi_cook_meal_52: {
  description: 'Cooking Mastery multiplier used in the Double Cherry meal bonus',
  extractionKey: 'bonus_multi_cook_meal_52',
  domainExtractor: (gameData: Map<string, any>) => {
   const cooking = gameData.get("cooking") as Cooking;
   return cooking.meals[52].getBonusMultiCook();
  }
 },

 companion_162_bonus: {
  description: 'Companion 162 meal bonus multiplier input',
  extractionKey: 'companion_162_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const companions = gameData.get("companions") as Companion[];
   return getCompanionActiveBonus(companions, 162);
  }
 },
};

describe('Cooking Domain - Meal Bonus - Parameters', () => {
 let extractionResults: ExtractionResults;
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
