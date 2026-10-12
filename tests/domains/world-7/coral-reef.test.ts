/**
 * CoralReef Domain Calculation Tests
 *
 * Tests our CoralReef cost calculations against live game data.
 *
 * CoralReef provides 6 upgrades with various effects:
 * - Cost formula: x1 * x2^level
 * 
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { CoralReef } from '../../../data/domain/world-7/coralReef';

const saveName = 'latest';
const extractionResultsName = 'coral-reef-data.json';

describe('CoralReef Domain - Calculations', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let coralReef: CoralReef;

 beforeAll(() => {
  // Load live game extraction results
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  // Load matching save data
  try {
   gameData = loadGameDataFromSave(saveName);

   // Get fully configured coralReef domain
   coralReef = gameData.get('coralReef') as CoralReef;
   if (!coralReef) {
    throw new Error('CoralReef domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Cost Calculations', () => {
  it('matches the next cost for Daily Grind Time bubble levels', () => {
   const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_0');
   const calculatedCost = coralReef.getBonusNextlevelCost(0);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Coral Reef next cost for Daily Grind Time bubble levels',
   });
  });

  it('matches the next cost for Orange Coral upgrade (effect not described in current metadata)', () => {
   const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_1');
   const calculatedCost = coralReef.getBonusNextlevelCost(1);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Coral Reef next cost for Orange Coral upgrade; effect not described in current metadata',
   });
  });

  it('matches the next cost for the Tome Epilogue bonus unlock', () => {
   const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_2');
   const calculatedCost = coralReef.getBonusNextlevelCost(2);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Coral Reef next cost for the Tome Epilogue bonus unlock',
   });
  });

  it('matches the next cost for a Ninja Knowledge upgrade', () => {
   const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_3');
   const calculatedCost = coralReef.getBonusNextlevelCost(3);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Coral Reef next cost for a Ninja Knowledge upgrade',
   });
  });

  it('matches the next cost for Gallery bonus and Trophy slot increases', () => {
   const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_4');
   const calculatedCost = coralReef.getBonusNextlevelCost(4);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Coral Reef next cost for Gallery bonus and Trophy slot increases',
   });
  });

  it('matches the next cost for Blue Coral upgrade (effect not described in current metadata)', () => {
   const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_5');
   const calculatedCost = coralReef.getBonusNextlevelCost(5);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Coral Reef next cost for Blue Coral upgrade; effect not described in current metadata',
   });
  });
 });
});

