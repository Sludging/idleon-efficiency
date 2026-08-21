/**
 * Alchemy Bubble Bonus Calculation and Parameter Tests
 *
 * Tests aggregate bubble bonuses and Diamond Chef's unique bubble behavior
 * against live game data extracted from the running game.
 *
 * @testCovers Bubble.getBonus
 * @testCovers DiamonChefBubble.getBonus
 * @testCovers Alchemy.getBubbleBonusForKey
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Alchemy, CauldronIndex, DiamonChefBubble } from '../../../data/domain/world-2/alchemy/alchemy';
import { lavaFunc } from '../../../data/utility';

const saveName = 'latest';
const extractionResultsName = 'diamond-chef-data.json';

const bubbleBonusParameterSpecs = {
 diamondChefIsBubbleSuper: {
  description: 'Diamond Chef - Is Bubble Super',
  extractionKey: 'diamond_chef_is_bubble_super',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return (alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef")?.prismatic ?? false) ? 1 : 0;
  }
 },

 alchemyPrismaticBonus: {
  description: 'Alchemy Prismatic Bonus',
  extractionKey: 'alchemy_prismatic_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef")?.prismaticMultiplier ?? 2;
  }
 },

 diamondChefBaseBonus: {
  description: 'Diamond Chef - Base Bonus',
  extractionKey: 'diamond_chef_base_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   const diamondChef = alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef") as DiamonChefBubble;
   return lavaFunc(diamondChef.data.func, diamondChef.level, diamondChef.data.x1, diamondChef.data.x2, false);
  }
 },
};

describe('Alchemy Domain - Bubble Bonus', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let alchemy: Alchemy;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  alchemy = gameData.get("alchemy") as Alchemy;
 });

 describe('Bubble Bonus Parameters', () => {
  Object.entries(bubbleBonusParameterSpecs).forEach(([_, spec]) => {
   it(`validates ${spec.description}`, () => {
    const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
    const domainValue = spec.domainExtractor(gameData);
    expect(domainValue).toMatchLiveGame(liveValue, 0.01);
   });
  });
 });

 describe('Bubble Bonus Calculations', () => {
  it('validates the MealSpdz bubble bonus calculation', () => {
   const liveValue = getExtractedValue(extractionResults, 'diamond_chef_final_bonus');
   const domainValue = alchemy.getBubbleBonusForKey("MealSpdz");

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: 'Alchemy MealSpdz bubble bonus',
   });
  });
 });
});
