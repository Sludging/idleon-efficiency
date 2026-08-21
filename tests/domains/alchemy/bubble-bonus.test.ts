/**
 * Alchemy Bubble Bonus Calculation Tests
 *
 * Tests representative ordinary and special bubble bonuses against live game
 * data extracted from the running game.
 *
 * @testCovers Bubble.getBonus
 * @testCovers DiamonChefBubble.getBonus
 * @testCovers Alchemy.getBubbleBonusForKey
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';

const saveName = 'latest';
const extractionResultsName = 'bubble-bonus-data.json';

const bubbleBonusCalculationSpecs: Record<string, { description: string; extractionKey: string; bonusKey: string; playerIndex?: number }> = {
 toolW: {
  description: 'Stronk Tools (ToolW / Power index 7; player 0 class and 16th-bubble dependent)',
  extractionKey: 'ordinary_tool_w_final_bonus',
  bonusKey: 'ToolW',
  playerIndex: 0,
 },
 diamondChef: {
  description: 'Diamond Chef (MealSpdz)',
  extractionKey: 'diamond_chef_final_bonus',
  bonusKey: 'MealSpdz',
 },
 dailyDrip: {
  description: 'Da Daily Drip (LqdCap)',
  extractionKey: 'daily_drip_final_bonus',
  bonusKey: 'LqdCap',
 },
 cropiusMapper: {
  description: 'Cropius Mapper (Y6)',
  extractionKey: 'cropius_mapper_final_bonus',
  bonusKey: 'Y6',
 },
 slabW2: {
  description: 'Slab-scaled bubble (W2 / Slabi Orefish)',
  extractionKey: 'slab_w2_final_bonus',
  bonusKey: 'W2',
 },
 tomeW8: {
  description: 'Tome-scaled bubble (W8 / Tome Strength)',
  extractionKey: 'tome_w8_final_bonus',
  bonusKey: 'W8',
 },
 boostedMinEff: {
  description: '16th-bubble boosted bubble (MinEff / Hearty Diggy)',
  extractionKey: 'boosted_min_eff_final_bonus',
  bonusKey: 'MinEff',
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

 Object.entries(bubbleBonusCalculationSpecs).forEach(([_, spec]) => {
  it(`validates ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const player = spec.playerIndex === undefined ? undefined : gameData.get('players')[spec.playerIndex];
   const domainValue = alchemy.getBubbleBonusForKey(spec.bonusKey, player);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Alchemy ${spec.description}`,
   });
  });
 });
});
