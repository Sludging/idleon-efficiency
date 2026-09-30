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
import { CoralReef, updateCoralReefDailyGain } from '../../../data/domain/world-7/coralReef';

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

   // Run the daily gains calculation
   updateCoralReefDailyGain(gameData);

   // Get the updated coral reef domain
   coralReef = gameData.get('coralReef') as CoralReef;
   if (!coralReef) {
    throw new Error('CoralReef domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Daily Coral Gains Calculation', () => {
  it('maps each breakdown component to the live extraction inputs', () => {
   const breakdown = coralReef.dailyCoralGainBreakdown;
   expect(breakdown).toBeDefined();
   if (!breakdown) {
    throw new Error('Coral Reef daily gain breakdown was not populated');
   }

   const extracted = (label: string) => getExtractedValue(extractionResults, label);
   const eventShopOwned = extracted('param_event_shop_25_owned');
   expect(breakdown.base).toBe(10);
   expect(breakdown.multipliers).toEqual([
    { label: 'Companion 40', factor: 1 + extracted('param_companion_40_bonus') },
    { label: 'Event shop bonus 25', factor: 1 + (eventShopOwned ? 0.3 : 0) },
    { label: 'Gem purchase 41', factor: 1 + 20 * extracted('param_gem_purchase_41') / 100 },
   ]);
   expect(breakdown.additiveBonuses).toEqual([
    { label: 'Coral Kid upgrade 5', percent: extracted('param_coral_kid_bonus_5') },
    { label: 'Dancing Coral upgrade 0', percent: extracted('param_dancing_coral_bonus_0') },
    { label: 'Clamworks bonus 5', percent: extracted('param_clamwork_bonus_5') ? 20 : 0 },
    { label: 'Killroy daily coral reef gains', percent: extracted('param_killroy_bonus_6') },
    { label: 'Corale stamp', percent: extracted('param_stamp_corale') },
    { label: 'Alchemy vial 7corale', percent: extracted('param_vial_7corale') },
    { label: 'Legend talent 0', percent: extracted('param_legend_talent_bonus_0') },
    { label: 'Arcade bonus 57', percent: extracted('param_arcade_bonus_57') },
    { label: 'Sneaking emporium upgrade 43', percent: extracted('param_emporium_bonus_43') ? 20 : 0 },
    { label: 'Demonblub card', percent: extracted('param_card_w7a9_level') },
    { label: 'Statue 31', percent: extracted('param_statue_31_bonus') },
   ]);
  });

  it('reconciles the breakdown to the extracted daily gain', () => {
   const breakdown = coralReef.dailyCoralGainBreakdown;
   expect(breakdown).toBeDefined();
   if (!breakdown) {
    throw new Error('Coral Reef daily gain breakdown was not populated');
   }

   const additiveTotal = breakdown.additiveBonuses.reduceRight((total, bonus) => bonus.percent + total, 0);
   const breakdownTotal = breakdown.base * breakdown.multipliers[0].factor * breakdown.multipliers[1].factor
    * breakdown.multipliers[2].factor * (1 + additiveTotal / 100);
   expect(breakdownTotal).toBe(coralReef.dailyCoralGains);

   const extractedValue = getExtractedValue(extractionResults, 'reef_daily_gains');
   expect(breakdownTotal).toMatchLiveGameWithDetails(extractedValue, {
    context: 'Coral Reef daily gains breakdown',
   });
  });
 });
});
