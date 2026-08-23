/**
 * Alchemy Prismatic Multiplier Parameter Validation
 *
 * Tests our alchemy prismatic bubble multiplier parameter calculations against live game data.
 *
 * Formula:
 *   Math.min(4, 2 + (arcaneUpg45 + arcade54 + sushiRoGBonus23 + w6Trophy + palette28 + 0.2*purpleSigils + exotic48 + legend36 + 50*companion88) / 100)
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
import { Farming } from '../../../data/domain/world-6/farming';
import { Companion } from '../../../data/domain/companions';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { SushiStation } from '../../../data/domain/world-7/sushi';

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
  domainExtractor: (gameData: Map<string, any>) => {
   const gaming = gameData.get("gaming") as Gaming;
   return gaming.getPaletteBonus(28);
  }
 },

 total_purple_sigils: {
  description: 'Total purple sigils (boost level >= 3)',
  extractionKey: 'total_purple_sigils',
  domainExtractor: (gameData: Map<string, any>) => {
   const sigils = gameData.get("sigils") as Sigils;
   return sigils.sigils.reduce((sum, sigil) => sum + (sigil.boostLevel >= 3 ? 1 : 0), 0);
  }
 },

 exotic_market_bonus_48: {
  description: 'Exotic market bonus 48',
  extractionKey: 'exotic_market_bonus_48',
  domainExtractor: (gameData: Map<string, any>) => {
   const farming = gameData.get("farming") as Farming;
   return farming.getExoticMarketBonusValue(48);
  }
 },

 companion_88_bonus: {
  description: 'Companion 88 prismatic multiplier input',
  extractionKey: 'companion_88_bonus',
  domainExtractor: (gameData: Map<string, any>) => {
   const companions = gameData.get("companions") as Companion[];
   const companion = companions.find(c => c.id === 88);
   return companion?.owned ? companion.data.bonus : 0;
  }
 },

 sushi_rog_bonus_qty_23: {
  description: 'Sushi RoG bonus quantity 23',
  extractionKey: 'sushi_rog_bonus_qty_23',
  domainExtractor: (gameData: Map<string, any>) => {
   const sushi = gameData.get("sushi") as SushiStation;
   return sushi.getBonusFromIndex(23);
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
   const domainValue = spec.domainExtractor(gameData);
   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
