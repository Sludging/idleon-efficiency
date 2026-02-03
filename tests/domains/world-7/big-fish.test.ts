/**
 * Big Fish Domain Calculation Tests
 *
 * Tests our Big Fish bonus, cost, and unlock requirement calculations against live game data.
 *
 * Big Fish provides 6 advice upgrades that affect various game mechanics:
 * - Bonus formula: level / (100 + level) * x0 (0 if not unlocked)
 * - Cost formula: 1.15^level * 10.01^x1
 * - Unlock requirement: 4000 + (300 + 50 * max(0, index - 2)) * index
 *
 * Bonuses are unlocked when total player levels exceed the unlock requirement.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { BigFish } from '../../../data/domain/world-7/bigFish';

const saveName = 'latest';
const extractionResultsName = 'big-fish-data.json';

describe('Big Fish Domain - Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let bigFish: BigFish;

  beforeAll(() => {
    // Load live game extraction results
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);

    // Load matching save data
    try {
      gameData = loadGameDataFromSave(saveName);

      // Get fully configured bigFish domain
      bigFish = gameData.get('bigFish') as BigFish;
      if (!bigFish) {
        throw new Error('BigFish domain not found in save data');
      }

    } catch (error: any) {
      throw new Error(`❌ Failed to load save data: ${error.message}`);
    }
  });

  describe('Bonus Calculations', () => {
    it('validates bonus 0 calculation (W7 mob respawn rate)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_0');
      const calculatedBonus = bigFish.getBonusFromIndex(0);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0.01,
        context: 'Big Fish bonus 0: W7 mob respawn rate',
      });
    });

    it('validates bonus 1 calculation (Max Stamina in Spelunking)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_1');
      const calculatedBonus = bigFish.getBonusFromIndex(1);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0.01,
        context: 'Big Fish bonus 1: Max Stamina in Spelunking',
      });
    });

    it('validates bonus 2 calculation (Spelunking AFK Gains)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_2');
      const calculatedBonus = bigFish.getBonusFromIndex(2);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0.01,
        context: 'Big Fish bonus 2: Spelunking AFK Gains',
      });
    });

    it('validates bonus 3 calculation (Kill per Kill in W7)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_3');
      const calculatedBonus = bigFish.getBonusFromIndex(3);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0.01,
        context: 'Big Fish bonus 3: Kill per Kill in W7',
      });
    });

    it('validates bonus 4 calculation (Class EXP Gain)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_4');
      const calculatedBonus = bigFish.getBonusFromIndex(4);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0.01,
        context: 'Big Fish bonus 4: Class EXP Gain',
      });
    });

    it('validates bonus 5 calculation (Double Gold Food drop chance)', () => {
      const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_5');
      const calculatedBonus = bigFish.getBonusFromIndex(5);

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0.01,
        context: 'Big Fish bonus 5: Double Gold Food drop chance',
      });
    });
  });

  describe('Cost Calculations', () => {
    it('validates cost calculation for bonus 0', () => {
      const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_0');
      const calculatedCost = bigFish.getBonusNextlevelCost(0);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'Big Fish upgrade cost for bonus 0',
      });
    });

    it('validates cost calculation for bonus 1', () => {
      const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_1');
      const calculatedCost = bigFish.getBonusNextlevelCost(1);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'Big Fish upgrade cost for bonus 1',
      });
    });

    it('validates cost calculation for bonus 2', () => {
      const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_2');
      const calculatedCost = bigFish.getBonusNextlevelCost(2);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'Big Fish upgrade cost for bonus 2',
      });
    });

    it('validates cost calculation for bonus 3', () => {
      const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_3');
      const calculatedCost = bigFish.getBonusNextlevelCost(3);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'Big Fish upgrade cost for bonus 3',
      });
    });

    it('validates cost calculation for bonus 4', () => {
      const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_4');
      const calculatedCost = bigFish.getBonusNextlevelCost(4);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'Big Fish upgrade cost for bonus 4',
      });
    });

    it('validates cost calculation for bonus 5', () => {
      const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_5');
      const calculatedCost = bigFish.getBonusNextlevelCost(5);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'Big Fish upgrade cost for bonus 5',
      });
    });
  });

  describe('Unlock Level Requirement Calculations', () => {
    it('validates unlock requirement for bonus 0', () => {
      const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_0');
      const calculatedReq = bigFish.bonuses[0].getUnlockLevelRequired();

      expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
        tolerance: 0,
        context: 'Big Fish unlock level requirement for bonus 0',
      });
    });

    it('validates unlock requirement for bonus 1', () => {
      const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_1');
      const calculatedReq = bigFish.bonuses[1].getUnlockLevelRequired();

      expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
        tolerance: 0,
        context: 'Big Fish unlock level requirement for bonus 1',
      });
    });

    it('validates unlock requirement for bonus 2', () => {
      const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_2');
      const calculatedReq = bigFish.bonuses[2].getUnlockLevelRequired();

      expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
        tolerance: 0,
        context: 'Big Fish unlock level requirement for bonus 2',
      });
    });

    it('validates unlock requirement for bonus 3', () => {
      const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_3');
      const calculatedReq = bigFish.bonuses[3].getUnlockLevelRequired();

      expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
        tolerance: 0,
        context: 'Big Fish unlock level requirement for bonus 3',
      });
    });

    it('validates unlock requirement for bonus 4', () => {
      const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_4');
      const calculatedReq = bigFish.bonuses[4].getUnlockLevelRequired();

      expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
        tolerance: 0,
        context: 'Big Fish unlock level requirement for bonus 4',
      });
    });

    it('validates unlock requirement for bonus 5', () => {
      const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_5');
      const calculatedReq = bigFish.bonuses[5].getUnlockLevelRequired();

      expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
        tolerance: 0,
        context: 'Big Fish unlock level requirement for bonus 5',
      });
    });
  });
});
