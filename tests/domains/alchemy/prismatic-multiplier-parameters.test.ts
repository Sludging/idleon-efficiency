/**
 * Alchemy Prismatic Multiplier Parameter Validation
 *
 * Tests our alchemy prismatic bubble multiplier parameter calculations against live game data.
 *
 * Formula:
 *   Math.min(3, 2 + (arcaneUpg45 + arcade54 + w6Trophy + palette28 + 0.2*purpleSigils + exotic48 + legend36) / 100)
 *
 * This multiplier is applied to all prismatic bubbles to boost their bonus values.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Tesseract } from '../../../data/domain/tesseract';
import { Arcade } from '../../../data/domain/world-2/arcade';
import { Slab } from '../../../data/domain/world-5/slab';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { Sigils } from '../../../data/domain/world-2/alchemy/sigils';

const saveName = 'latest';
const extractionResultsName = 'alchemy-prismatic-multiplier-data.json';

const parameterSpecs = {
  arcane_upgrade_45_bonus: {
    description: 'Arcane (tesseract) upgrade 45 bonus',
    extractionKey: 'arcane_upgrade_45_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const tesseract = gameData.get("tesseract") as Tesseract;
      return tesseract.getUpgradeBonus(45);
    }
  },

  arcade_bonus_54: {
    description: 'Arcade bonus 54',
    extractionKey: 'arcade_bonus_54',
    domainExtractor: (gameData: Map<string, any>) => {
      const arcade = gameData.get("arcade") as Arcade;
      return arcade.bonuses[54]?.getBonus() || 0;
    }
  },

  world_6_trophy_bonus: {
    description: 'World 6 trophy bonus (Trophy23 - 10 if obtained)',
    extractionKey: 'world_6_trophy_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const slab = gameData.get("slab") as Slab;
      const world6Trophy = slab.obtainableItems.find(item => item.internalName === "Trophy23");
      return world6Trophy?.obtained ? 10 : 0;
    }
  },

  palette_bonus_28: {
    description: 'Gaming palette bonus 28',
    extractionKey: 'palette_bonus_28',
    domainExtractor: (_gameData: Map<string, any>) => {
      // TODO: This feature is not yet implemented in the domain
      // Game function: GamingStatType("PaletteBonus", 28, 0)
      // This test will fail until gaming palette is added to the domain
      throw new Error("palette_bonus_28: NOT IMPLEMENTED - gaming palette feature missing from domain");
    }
  },

  total_purple_sigils: {
    description: 'Total purple sigils (boost level >= 4)',
    extractionKey: 'total_purple_sigils',
    domainExtractor: (gameData: Map<string, any>) => {
      const sigils = gameData.get("sigils") as Sigils;
      return sigils.sigils.reduce((sum, sigil) => sum + (sigil.boostLevel >= 4 ? 1 : 0), 0);
    }
  },

  exotic_market_bonus_48: {
    description: 'Exotic market bonus 48',
    extractionKey: 'exotic_market_bonus_48',
    domainExtractor: (_gameData: Map<string, any>) => {
      // TODO: This feature is not yet implemented in the domain
      // Game function: FarmingStuffs("ExoticBonusQTY", 48, 0)
      // This test will fail until farming exotic market is added to the domain
      throw new Error("exotic_market_bonus_48: NOT IMPLEMENTED - farming exotic market feature missing from domain");
    }
  },

  legend_talent_36_bonus: {
    description: 'Legend talent 36 bonus',
    extractionKey: 'legend_talent_36_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(36);
    }
  },
};

describe('Alchemy Domain - Prismatic Multiplier - Parameters', () => {
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

      // For TODO items, we expect the domain extractor to throw an error
      if (spec.description.includes('TODO')) {
        expect(() => spec.domainExtractor(gameData)).toThrow(/NOT IMPLEMENTED/);
      } else {
        const domainValue = spec.domainExtractor(gameData);
        expect(domainValue).toMatchLiveGame(liveValue, 0);
      }
    });
  });
});
