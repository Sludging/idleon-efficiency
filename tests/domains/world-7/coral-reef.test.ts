/**
 * CoralReef Domain Calculation Tests
 *
 * Tests our CoralReef cost calculations against live game data.
 *
 * CoralReef provides 6 upgrades with various effects:
 * - Cost formula: x1 * x2^level
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
    it('validates cost calculation for upgrade 0', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_0');
      const calculatedCost = coralReef.getBonusNextlevelCost(0);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralReef upgrade cost for upgrade 0',
      });
    });

    it('validates cost calculation for upgrade 1', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_1');
      const calculatedCost = coralReef.getBonusNextlevelCost(1);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralReef upgrade cost for upgrade 1',
      });
    });

    it('validates cost calculation for upgrade 2', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_2');
      const calculatedCost = coralReef.getBonusNextlevelCost(2);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralReef upgrade cost for upgrade 2',
      });
    });

    it('validates cost calculation for upgrade 3', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_3');
      const calculatedCost = coralReef.getBonusNextlevelCost(3);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralReef upgrade cost for upgrade 3',
      });
    });

    it('validates cost calculation for upgrade 4', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_4');
      const calculatedCost = coralReef.getBonusNextlevelCost(4);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralReef upgrade cost for upgrade 4',
      });
    });

    it('validates cost calculation for upgrade 5', () => {
      const extractedCost = getExtractedValue(extractionResults, 'coral_reef_cost_5');
      const calculatedCost = coralReef.getBonusNextlevelCost(5);

      expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
        tolerance: 0.01,
        context: 'CoralReef upgrade cost for upgrade 5',
      });
    });
  });
});
