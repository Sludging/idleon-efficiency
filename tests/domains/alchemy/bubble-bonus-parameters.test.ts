/**
 * Alchemy Bubble Bonus Parameter Validation
 *
 * Tests the direct producer inputs used by ordinary and special Bubble bonus
 * representatives, including the selected Y13 prismatic branch.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
 Alchemy,
 CauldronIndex,
 CropiusMapperBubble,
 DailyDripBubble,
 DiamonChefBubble,
 ImpactedBySlabBubble,
} from '../../../data/domain/world-2/alchemy/alchemy';

const saveName = 'latest';
const extractionResultsName = 'bubble-bonus-data.json';

const getBubbleByBonusKey = (alchemy: Alchemy, bonusKey: string) => {
 const bubble = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(candidate => candidate.data.bonusKey == bonusKey);
 if (!bubble) {
  throw new Error(`Alchemy bubble ${bonusKey} not found`);
 }
 return bubble;
};

const getBubbleByName = (alchemy: Alchemy, name: string) => {
 const bubble = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(candidate => candidate.name == name);
 if (!bubble) {
  throw new Error(`Alchemy bubble ${name} not found`);
 }
 return bubble;
};

const bubbleBonusParameterSpecs = {
 diamondChefPrismaticState: {
  description: 'Diamond Chef - Prismatic State',
  extractionKey: 'diamond_chef_prismatic_state',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return getBubbleByName(alchemy, "Diamond Chef").prismatic ? 1 : 0;
  }
 },

 y13PrismaticState: {
  description: 'Y13 - Prismatic State',
  extractionKey: 'y13_prismatic_state',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return getBubbleByBonusKey(alchemy, "Y13").prismatic ? 1 : 0;
  }
 },
 ordinaryToolWPrismaticState: {
  description: 'Stronk Tools - Prismatic State',
  extractionKey: 'ordinary_tool_w_prismatic_state',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return getBubbleByBonusKey(alchemy, "ToolW").prismatic ? 1 : 0;
  }
 },

 dailyDripPrismaticState: {
  description: 'Da Daily Drip - Prismatic State',
  extractionKey: 'daily_drip_prismatic_state',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return getBubbleByBonusKey(alchemy, "LqdCap").prismatic ? 1 : 0;
  }
 },

 cropiusMapperPrismaticState: {
  description: 'Cropius Mapper - Prismatic State',
  extractionKey: 'cropius_mapper_prismatic_state',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return getBubbleByBonusKey(alchemy, "Y6").prismatic ? 1 : 0;
  }
 },

 slabW2PrismaticState: {
  description: 'Slabi Orefish - Prismatic State',
  extractionKey: 'slab_w2_prismatic_state',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return getBubbleByBonusKey(alchemy, "W2").prismatic ? 1 : 0;
  }
 },

 alchemyPrismaticBonus: {
  description: 'Alchemy Prismatic Bonus consumed by Bubble bonus',
  extractionKey: 'alchemy_prismatic_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return getBubbleByName(alchemy, "Diamond Chef").prismaticMultiplier;
  }
 },

 ordinaryToolWSecondBonus: {
  description: 'Power cauldron second-bubble bonus used by Stronk Tools class scaling',
  extractionKey: 'ordinary_tool_w_second_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return alchemy.cauldrons[CauldronIndex.Power].bubbles[1].getBonus();
  }
 },

 ordinaryToolWSixteenthBonus: {
  description: 'Power cauldron 16th-bubble bonus used by Stronk Tools',
  extractionKey: 'ordinary_tool_w_sixteenth_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return alchemy.cauldrons[CauldronIndex.Power].bubbles[16].getBonus();
  }
 },

 diamondChefMealCount: {
  description: 'Diamond Chef qualifying meal count',
  extractionKey: 'diamond_chef_meal_count',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   const bubble = getBubbleByName(alchemy, "Diamond Chef");
   if (!(bubble instanceof DiamonChefBubble)) {
    throw new Error('Diamond Chef bubble has the wrong domain type');
   }
   return bubble.diamonMeals;
  }
 },

 dailyDripTotalAlchemyLevel: {
  description: 'Da Daily Drip total Alchemy level',
  extractionKey: 'daily_drip_total_alchemy_level',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   const bubble = getBubbleByName(alchemy, "Da Daily Drip");
   if (!(bubble instanceof DailyDripBubble)) {
    throw new Error('Da Daily Drip bubble has the wrong domain type');
   }
   return bubble.totalAlchemyLevel;
  }
 },

 cropiusMapperPortalCount: {
  description: 'Cropius Mapper opened World 6 portal count',
  extractionKey: 'cropius_mapper_portal_count',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   const bubble = getBubbleByName(alchemy, "Cropius Mapper");
   if (!(bubble instanceof CropiusMapperBubble)) {
    throw new Error('Cropius Mapper bubble has the wrong domain type');
   }
   return bubble.totalW6PortalsOpened;
  }
 },

 slabRawObtainedCount: {
  description: 'Raw Slab item count used by W2 bubble scaling',
  extractionKey: 'slab_raw_obtained_count',
  domainExtractor: (gameData: Map<string, any>) => {
   const slabBubble = getBubbleByBonusKey(gameData.get("alchemy") as Alchemy, "W2");
   if (!(slabBubble instanceof ImpactedBySlabBubble)) {
    throw new Error('W2 bubble has the wrong domain type');
   }
   return slabBubble.lootyCount;
  }
 },
};

describe('Alchemy Domain - Bubble Bonus Parameters', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 Object.entries(bubbleBonusParameterSpecs).forEach(([_, spec]) => {
  it(`validates ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const domainValue = spec.domainExtractor(gameData);
   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
