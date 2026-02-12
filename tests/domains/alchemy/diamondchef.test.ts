/**
 * Alchemy Diamond Chef Parameter Validation
 *
 * Tests our diamond chef bubble calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Alchemy, CauldronIndex, DiamonChefBubble } from '../../../data/domain/world-2/alchemy/alchemy';
import { lavaFunc } from '../../../data/utility';

const saveName = 'latest';
const extractionResultsName = 'diamond-chef-data.json';

const alchemyParameterSpecs = {
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
      const baseMath = lavaFunc(diamondChef.data.func, diamondChef.level, diamondChef.data.x1, diamondChef.data.x2, false)
      return baseMath;
    }
  },

  diamondChefFinalBonus: {
    description: 'Diamond Chef - Final Bonus',
    extractionKey: 'diamond_chef_final_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      const diamonChef = alchemy.cauldrons[CauldronIndex.Kazam].bubbles.find(bubble => bubble.name == "Diamond Chef")?.getBonus() ?? 0;
      return diamonChef
    }
  },
};

describe('Alchemy Domain - Diamond Chef Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(alchemyParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0.01);
    });
  });
});
