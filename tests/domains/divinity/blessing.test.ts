/**
 * Divinity Blessing Bonus Calculation Tests
 *
 * Tests that given the correct input parameters, our domain calculates
 * the correct blessing bonus values.
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
    it('validates god 2 (Nobisect) blessing bonus - special BlessyBunDN formula', () => {
      const god = divinity.gods[2];

      if (!god) {
        throw new Error('God 2 not found');
      }

      const extractedBonus = extractionResults.extractions.divinity_blessing_2.result;
      const calculatedBonus = god.getBlessingBonus();

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'God 2 (Nobisect) blessing bonus calculation (special BlessyBunDN formula)',
      });
    });

    it('validates god 4 blessing bonus - standard formula', () => {
      const god = divinity.gods[4];

      if (!god) {
        throw new Error('God 4 not found');
      }

      const extractedBonus = extractionResults.extractions.divinity_blessing_4.result;
      const calculatedBonus = god.getBlessingBonus();

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'God 4 blessing bonus calculation',
      });
    });

    it('validates god 6 (Purrmep) blessing bonus - standard formula', () => {
      const god = divinity.gods[6];

      if (!god) {
        throw new Error('God 6 not found');
      }

      const extractedBonus = extractionResults.extractions.divinity_blessing_6.result;
      const calculatedBonus = god.getBlessingBonus();

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'God 6 (Purrmep) blessing bonus calculation',
      });
    });

    it('validates god 7 blessing bonus - standard formula', () => {
      const god = divinity.gods[7];

      if (!god) {
        throw new Error('God 7 not found');
      }

      const extractedBonus = extractionResults.extractions.divinity_blessing_7.result;
      const calculatedBonus = god.getBlessingBonus();

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'God 7 blessing bonus calculation',
      });
    });

    it('validates god 9 blessing bonus - standard formula', () => {
      const god = divinity.gods[9];

      if (!god) {
        throw new Error('God 9 not found');
      }

      const extractedBonus = extractionResults.extractions.divinity_blessing_9.result;
      const calculatedBonus = god.getBlessingBonus();

      expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
        tolerance: 0,
        context: 'God 9 blessing bonus calculation',
      });
    });
  });
});
