/**
 * CoralKid Domain Calculation Tests
 *
 * Tests our CoralKid bonus and cost calculations against live game data.
 *
 * CoralKid provides 6 upgrades that affect various game mechanics:
 * - Bonus 0: Divinity EXP gain (10 * level)
 * - Bonus 1: Blessing max level (+2 * level, rounded)
 * - Bonus 2: God Rank class EXP (20 * level / (25 + level))
 * - Bonus 3: Minor link boost (level, rounded)
 * - Bonus 4: Divinity PTS gain (+2 * level, rounded)
 * - Bonus 5: Daily Coral generation (100 * level / (40 + level))
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { CoralKid } from '../../../data/domain/world-7/coralKid';

const saveName = 'latest';
const extractionResultsName = 'coral-kid-data.json';

describe('CoralKid Domain - Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let coralKid: CoralKid;

  beforeAll(() => {
    // Load live game extraction results
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);

    // Load matching save data
    try {
      gameData = loadGameDataFromSave(saveName);

      // Get fully configured coralKid domain
      coralKid = gameData.get('coralKid') as CoralKid;
      if (!coralKid) {
        throw new Error('CoralKid domain not found in save data');
      }

    } catch (error: any) {
      throw new Error(`❌ Failed to load save data: ${error.message}`);
    }
  });

  describe('Bonus Calculations', () => {
    it('validates bonus 0 calculation (Divinity EXP gain)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'coral_kid_bonus_0');
      const calculatedBonus = coralKid.getBonusFromIndex(0);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'CoralKid bonus 0: Divinity EXP gain',
      });
    });

    it('validates bonus 1 calculation (Blessing max level)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'coral_kid_bonus_1');
      const calculatedBonus = coralKid.getBonusFromIndex(1);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'CoralKid bonus 1: Blessing max level increase',
      });
    });

    it('validates bonus 2 calculation (God Rank class EXP)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'coral_kid_bonus_2');
      const calculatedBonus = coralKid.getBonusFromIndex(2);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0.01,
        context: 'CoralKid bonus 2: God Rank class EXP multiplier',
      });
    });

    it('validates bonus 3 calculation (Minor link boost)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'coral_kid_bonus_3');
      const calculatedBonus = coralKid.getBonusFromIndex(3);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'CoralKid bonus 3: Divinity skill level boost to minor links',
      });
    });

    it('validates bonus 4 calculation (Divinity PTS gain)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'coral_kid_bonus_4');
      const calculatedBonus = coralKid.getBonusFromIndex(4);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'CoralKid bonus 4: Divinity PTS gain per Coral Reef upgrade',
      });
    });

    it('validates bonus 5 calculation (Daily Coral generation)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'coral_kid_bonus_5');
      const calculatedBonus = coralKid.getBonusFromIndex(5);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0.01,
        context: 'CoralKid bonus 5: Daily Coral generation increase',
      });
    });
  });

  describe('Cost Calculations', () => {
    it('validates cost calculation for bonus 0', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_kid_cost_0');
      const calculatedCost = coralKid.getBonusNextlevelCost(0);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralKid upgrade cost for bonus 0',
      });
    });

    it('validates cost calculation for bonus 1', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_kid_cost_1');
      const calculatedCost = coralKid.getBonusNextlevelCost(1);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralKid upgrade cost for bonus 1',
      });
    });

    it('validates cost calculation for bonus 2', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_kid_cost_2');
      const calculatedCost = coralKid.getBonusNextlevelCost(2);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralKid upgrade cost for bonus 2',
      });
    });

    it('validates cost calculation for bonus 3', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_kid_cost_3');
      const calculatedCost = coralKid.getBonusNextlevelCost(3);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralKid upgrade cost for bonus 3',
      });
    });

    it('validates cost calculation for bonus 4', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_kid_cost_4');
      const calculatedCost = coralKid.getBonusNextlevelCost(4);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralKid upgrade cost for bonus 4',
      });
    });

    it('validates cost calculation for bonus 5', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_kid_cost_5');
      const calculatedCost = coralKid.getBonusNextlevelCost(5);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralKid upgrade cost for bonus 5',
      });
    });
  });
});
