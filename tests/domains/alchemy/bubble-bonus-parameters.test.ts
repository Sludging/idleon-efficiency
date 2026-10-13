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
 ImpactedByTheTomeBubble,
} from '../../../data/domain/world-2/alchemy/alchemy';
import { Player } from '../../../data/domain/player';
import { lavaFunc } from '../../../data/utility';
import { getTargetPlayer } from '../../utils/target-player';

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

const getTomeBubble = (gameData: Map<string, any>): ImpactedByTheTomeBubble => {
 const bubble = getBubbleByBonusKey(gameData.get('alchemy') as Alchemy, 'W8');
 if (!(bubble instanceof ImpactedByTheTomeBubble)) {
  throw new Error('Tome Strength bubble has the wrong domain type');
 }
 return bubble;
};

// These roots precede class, health, mana, and Tome scaling in the prepared bonuses.
const selectedRawBubbles = [
 { bonusKey: 'W7', extractionKey: 'raw_w7_bonus', description: 'Endgame Eff I' },
 { bonusKey: 'A8', extractionKey: 'raw_a8_bonus', description: 'Endgame Eff II' },
 { bonusKey: 'M7', extractionKey: 'raw_m7_bonus', description: 'Endgame Eff III' },
 { bonusKey: 'MinEff', extractionKey: 'raw_min_eff_bonus', description: 'mining efficiency' },
 { bonusKey: 'ChopEff', extractionKey: 'raw_chop_eff_bonus', description: 'chopping efficiency' },
 { bonusKey: 'W8', extractionKey: 'raw_w8_bonus', description: 'Tome Strength' },
];

const bubbleBonusParameterSpecs = {
 y13DirectBubbleBonus: {
  description: 'Y13 root Bubble bonus before any account-level Alchemy scaling',
  extractionKey: 'y13_direct_bubble_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return alchemy.cauldrons[CauldronIndex.Kazam].bubbles[32].getBonus();
  }
 },

 ordinaryToolWBaseBonus: {
  description: 'Stronk Tools base Bubble bonus before player class and 16th-bubble scaling',
  extractionKey: 'ordinary_tool_w_base_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return alchemy.cauldrons[CauldronIndex.Power].bubbles[7].getBonus();
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

 playerMaximumMP: {
  description: 'Alchemy-preparation maximum MP consumed by chopping efficiency',
  extractionKey: 'player_alchemy_max_mp',
  domainExtractor: (gameData: Map<string, any>) => {
   const player: Player = getTargetPlayer(gameData.get('players'));
   return player.health.getAlchemyMaxMP();
  },
 },

 playerMaximumHP: {
  description: 'Alchemy-preparation maximum HP consumed by mining efficiency',
  extractionKey: 'player_alchemy_max_hp',
  domainExtractor: (gameData: Map<string, any>) => {
   const player: Player = getTargetPlayer(gameData.get('players'));
   return player.health.getAlchemyMaxHP();
  },
 },

 highIQSixteenthBonus: {
  description: 'High IQ cauldron 16th-bubble multiplier consumed by chopping efficiency',
  extractionKey: 'high_iq_sixteenth_bonus',
  domainExtractor: (gameData: Map<string, any>) => (gameData.get('alchemy') as Alchemy).cauldrons[CauldronIndex.HighIQ].bubbles[16].getBonus(),
 },

 tomeScore: {
  description: 'prepared Tome completion score consumed by the Strength bubble',
  extractionKey: 'w8_tome_score',
  domainExtractor: (gameData: Map<string, any>) => getTomeBubble(gameData).theTomeTotalScore,
 },

 tomeGrimoireBonus: {
  description: 'prepared Grimoire Tome percentage consumed by the Strength bubble',
  extractionKey: 'w8_grimoire_bonus',
  domainExtractor: (gameData: Map<string, any>) => getTomeBubble(gameData).grimoireTomeBonus,
 },

 tomeTrollSetBonus: {
  description: 'prepared Troll set Tome percentage consumed by the Strength bubble',
  extractionKey: 'w8_troll_set_bonus',
  domainExtractor: (gameData: Map<string, any>) => getTomeBubble(gameData).trollSetTomeBonus,
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

 selectedRawBubbles.forEach(spec => {
  it(`validates ${spec.description} raw bubble bonus before player scaling`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const bubble = getBubbleByBonusKey(gameData.get('alchemy') as Alchemy, spec.bonusKey);
   // W8's public getter includes Tome scaling; compare the same root expression it consumes.
   const domainValue = bubble instanceof ImpactedByTheTomeBubble
    ? lavaFunc(bubble.func, bubble.level, bubble.x1, bubble.x2, false) * (bubble.prismatic ? bubble.prismaticMultiplier : 1)
    : bubble.getBonus();
   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
