/**
 * CoralReef Daily Gains - Calculation Tests
 *
 * Tests the final daily coral gains calculation against live game data.
 *
 * The calculation combines bonuses from multiple domains:
 * - Base: 10 coral/day
 * - Multiplicative: Companion 40, Event Shop 25, Gem Purchase 41
 * - Additive: CoralKid, DancingCoral, Clamworks, KillRoy, Stamps,
 *             Alchemy, LegendTalents, Arcade, Sneaking, Cards, Statues
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { CoralReef } from '../../../data/domain/world-7/coralReef';

const saveName = 'latest';
const extractionResultsName = 'coral-reef-daily-gains-data.json';

describe('CoralReef Daily Gains - Calculation', () => {
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

   coralReef = gameData.get('coralReef') as CoralReef;
   if (!coralReef) {
    throw new Error('CoralReef domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Daily Coral Gains Calculation', () => {
  it('matches the website daily Coral Reef gain to the live game', () => {
   const liveValue = getExtractedValue(extractionResults, 'reef_daily_gains');

   expect(coralReef.dailyCoralGains).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: 'Website daily Coral Reef gain',
   });
  });
 });
});
