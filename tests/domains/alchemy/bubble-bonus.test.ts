/**
 * Alchemy Bubble Bonus Calculation Tests
 *
 * Tests representative ordinary and special bubble bonuses against live game
 * data extracted from the running game.
 *
 */
import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';

const saveName = 'latest';
const extractionResultsName = 'bubble-bonus-data.json';

// Representatives cover player-specific scaling, the prismatic Y13 path,
// each special-bubble scaling rule, and all three Tome stat effects.
const bubbleBonusCalculationSpecs: Record<string, { description: string; extractionKey: string; bonusKey: string; playerIndex?: number }> = {
 toolW: {
  description: 'Stronk Tools tool-based skill-power increase for player 0, including class scaling',
  extractionKey: 'ordinary_tool_w_final_bonus',
  bonusKey: 'ToolW',
  playerIndex: 0,
 },
 y13: {
  description: "Codfrey's Gallery bonus-multiplier increase from the prismatic Y13 bubble",
  extractionKey: 'y13_final_bonus',
  bonusKey: 'Y13',
 },
 diamondChef: {
  description: 'Diamond Chef meal and fire-kitchen speed multiplier',
  extractionKey: 'diamond_chef_final_bonus',
  bonusKey: 'MealSpdz',
 },
 dailyDrip: {
  description: 'Da Daily Drip increase to every liquid maximum capacity',
  extractionKey: 'daily_drip_final_bonus',
  bonusKey: 'LqdCap',
 },
 cropiusMapper: {
  description: 'Cropius Mapper World 6 crop-evolution chance from opened maps',
  extractionKey: 'cropius_mapper_final_bonus',
  bonusKey: 'Y6',
 },
 slabW2: {
  description: 'Slabi Orefish mining and fishing power from Slab items, for player 0',
  extractionKey: 'slab_w2_final_bonus',
  bonusKey: 'W2',
  playerIndex: 0,
 },
 tomeW8: {
  description: 'Tome Strength bubble increase from player 0 Tome completion points',
  extractionKey: 'tome_w8_final_bonus',
  bonusKey: 'W8',
  playerIndex: 0,
 },
 tomeA9: {
  description: 'Tome Agility bubble increase from player 0 Tome completion points',
  extractionKey: 'tome_a9_final_bonus',
  bonusKey: 'A9',
  playerIndex: 0,
 },
 tomeM9: {
  description: 'Tome Wisdom bubble increase from player 0 Tome completion points',
  extractionKey: 'tome_m9_final_bonus',
  bonusKey: 'M9',
  playerIndex: 0,
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
