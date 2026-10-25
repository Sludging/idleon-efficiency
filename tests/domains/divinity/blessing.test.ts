/**
 * Compares each selected god's blessing bonus shown by the website with the
 * matching game result for this saved account.
 */
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Divinity, NobisectGod } from '../../../data/domain/world-5/divinity';
import type { Player } from '../../../data/domain/player';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Skilling } from '../../../data/domain/skilling';
import { getTargetPlayer } from '../../utils/target-player';
const saveName = 'latest';
const extractionResultsName = 'divinity-blessing-data.json';

describe('Divinity Domain - Blessing Bonus', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let divinity: Divinity;

 beforeAll(() => {
  // Load live game extraction results
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  // Load matching save data - MUST correspond to the same game state as extraction
  try {
   gameData = loadGameDataFromSave(saveName);

   // Get fully configured divinity domain
   divinity = gameData.get('divinity') as Divinity;
   if (!divinity) {
    throw new Error('Divinity domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Nobisect blessing lifecycle', () => {
  it('returns zero without player context', () => {
   const god = divinity.gods[2] as NobisectGod;

   expect(god.getBlessingBonus()).toBe(0);
  });

  it('initializes zero bonuses for every loaded player', () => {
   const roster = gameData.get('players') as Player[];
   const initializedDivinity = new Divinity().init([], roster.length);
   const god = initializedDivinity.gods[2] as NobisectGod;

   expect(roster.length).toBeGreaterThan(0);
   for (const player of roster) {
    expect(god.getBlessingBonus(player)).toBe(0);
   }
  });

  it('resets prepared bonuses and reproduces them after updating', () => {
   const roster = gameData.get('players') as Player[];
   const alchemy = gameData.get('alchemy') as Alchemy;
   const skilling = gameData.get('skilling') as Skilling;
   const initializedDivinity = new Divinity().init([], roster.length);
   const god = initializedDivinity.gods[2] as NobisectGod;
   god.blessLevel = divinity.gods[2].blessLevel;
   god.updateBlessings(roster, alchemy, skilling);
   const originalBonuses = roster.map(player => god.getBlessingBonus(player));

   god.resetBlessings(roster.length);
   for (const player of roster) {
    expect(god.getBlessingBonus(player)).toBe(0);
   }
   god.updateBlessings(roster, alchemy, skilling);

   expect(roster.map(player => god.getBlessingBonus(player))).toEqual(originalBonuses);
  });

  it('retains prepared bonuses across repeated updates with unchanged inputs', () => {
   const roster = gameData.get('players') as Player[];
   const alchemy = gameData.get('alchemy') as Alchemy;
   const skilling = gameData.get('skilling') as Skilling;
   const god = divinity.gods[2] as NobisectGod;
   const originalBonuses = roster.map(player => god.getBlessingBonus(player));

   god.updateBlessings(roster, alchemy, skilling);
   expect(roster.map(player => god.getBlessingBonus(player))).toEqual(originalBonuses);

   god.updateBlessings(roster, alchemy, skilling);
   expect(roster.map(player => god.getBlessingBonus(player))).toEqual(originalBonuses);
  });
 });

 describe('Blessing Bonus Calculations', () => {
  it('matches Nobisect blessing bonus shown by the website', () => {
   const god = divinity.gods[2];
   if (!god) throw new Error('God 2 (Nobisect) not found');

   const extractedBonus = extractionResults.extractions.divinity_blessing_2.result;
   const players = gameData.get('players') as Player[];
   const calculatedBonus = god.getBlessingBonus(getTargetPlayer(players));

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Nobisect blessing bonus shown on the website',
   });
  });


  it('matches Goharut blessing bonus shown on the website', () => {
   const god = divinity.gods[4];
   if (!god) throw new Error('God 4 (Goharut) not found');

   const extractedBonus = extractionResults.extractions.divinity_blessing_4.result;
   const calculatedBonus = god.getBlessingBonus();

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Goharut blessing bonus shown on the website',
   });
  });


  it('matches Purrmep blessing bonus shown on the website', () => {
   const god = divinity.gods[6];
   if (!god) throw new Error('God 6 (Purrmep) not found');

   const extractedBonus = extractionResults.extractions.divinity_blessing_6.result;
   const calculatedBonus = god.getBlessingBonus();

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Purrmep blessing bonus shown on the website',
   });
  });


  it('matches Flutterbis blessing bonus shown on the website', () => {
   const god = divinity.gods[7];
   if (!god) throw new Error('God 7 (Flutterbis) not found');

   const extractedBonus = extractionResults.extractions.divinity_blessing_7.result;
   const calculatedBonus = god.getBlessingBonus();

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Flutterbis blessing bonus shown on the website',
   });
  });


  it('matches Bagur blessing bonus shown on the website', () => {
   const god = divinity.gods[9];
   if (!god) throw new Error('God 9 (Bagur) not found');

   const extractedBonus = extractionResults.extractions.divinity_blessing_9.result;
   const calculatedBonus = god.getBlessingBonus();

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Bagur blessing bonus shown on the website',
   });
  });
 });
});
