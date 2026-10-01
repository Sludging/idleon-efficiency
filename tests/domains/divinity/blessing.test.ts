/**
 * Compares each selected god's blessing bonus shown by the website with the
 * matching game result for this saved account.
 */
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Divinity } from '../../../data/domain/divinity';
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

 describe('Blessing Bonus Calculations', () => {
  it('matches Nobisect blessing bonus shown by the website', () => {
   const god = divinity.gods[2];
   if (!god) throw new Error('God 2 (Nobisect) not found');

   const extractedBonus = extractionResults.extractions.divinity_blessing_2.result;
   const calculatedBonus = god.getBlessingBonus();

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
