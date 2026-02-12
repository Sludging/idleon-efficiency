/**
 * Cooking Meal Bonus Parameter Validation
 *
 * Tests our cooking meal bonus calculations against live game data.
 *
 * Formula (from game code):
 *   CookingMealBonusMultioo() * RibbonBonus(ribbonLevel) * mealLevel * bonusQty
 *
 * Where CookingMealBonusMultioo =
 *   (1 + (MainframeBonus(116) + ShinyBonusS(20)) / 100) * (1 + WinBonus(26) / 100)
 *
 * Note: MainframeBonus(116) maps to jewel 16 (values >100 = jewel indices)
 * Note: RibbonBonus is calculated in cooking domain, not a cross-domain dependency
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Lab } from '../../../data/domain/world-4/lab';
import { Breeding } from '../../../data/domain/world-4/breeding';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { Cooking } from '../../../data/domain/world-4/cooking';

const saveName = 'latest';
const extractionResultsName = 'cooking-meal-bonus-data.json';

const parameterSpecs = {
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
};

describe('Cooking Domain - Meal Bonus - Parameters', () => {
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
