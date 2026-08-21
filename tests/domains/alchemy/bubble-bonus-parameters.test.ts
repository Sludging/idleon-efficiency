/**
 * Alchemy Bubble Bonus Parameter Validation
 *
 * Tests the direct Diamond Chef inputs that distinguish the special bubble
 * branch from the ordinary Bubble bonus calculation.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Alchemy, CauldronIndex } from '../../../data/domain/world-2/alchemy/alchemy';

const saveName = 'latest';
const extractionResultsName = 'bubble-bonus-data.json';

const bubbleBonusParameterSpecs = {
 diamondChefPrismaticState: {
  description: 'Diamond Chef - Prismatic State',
  extractionKey: 'diamond_chef_prismatic_state',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return (alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef")?.prismatic ?? false) ? 1 : 0;
  }
 },

 alchemyPrismaticBonus: {
  description: 'Alchemy Prismatic Bonus consumed by Bubble bonus',
  extractionKey: 'alchemy_prismatic_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   return alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef")?.prismaticMultiplier ?? 2;
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
