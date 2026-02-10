/**
 * Orion Global Bonus Calculation Validation
 *
 * Tests our Orion global bonus final calculations against live game data.
 *
 * Global bonuses (indices 0-5):
 *   0: +{% Class XP (base 5)
 *   1: +{ Base DMG (base 10)
 *   2: +{% Total DMG (base 2)
 *   3: +{% Skill XP (base 4)
 *   4: +{% Drop Rate (base 1)
 *   5: +{ All Stat (base 2)
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Orion } from '../../../data/domain/world-1/orion';

const saveName = 'latest';
const extractionResultsName = 'orion-global-bonus-data.json';

describe('Orion Domain - Global Bonus Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let orion: Orion;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    orion = gameData.get("orion") as Orion;
  });

  describe('All Global Bonuses', () => {
    it('validates global bonus 0 (+{% Class XP)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_0');
      const domainBonus = orion.getGlobalBonus(0);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.00);
    });

    it('validates global bonus 1 (+{ Base DMG)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_1');
      const domainBonus = orion.getGlobalBonus(1);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.00);
    });

    it('validates global bonus 2 (+{% Total DMG)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_2');
      const domainBonus = orion.getGlobalBonus(2);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.00);
    });

    it('validates global bonus 3 (+{% Skill XP)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_3');
      const domainBonus = orion.getGlobalBonus(3);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.00);
    });

    it('validates global bonus 4 (+{% Drop Rate)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_4');
      const domainBonus = orion.getGlobalBonus(4);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.00);
    });

    it('validates global bonus 5 (+{ All Stat)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_5');
      const domainBonus = orion.getGlobalBonus(5);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.00);
    });
  });

  describe('Edge Cases', () => {
    it('returns 0 for invalid bonus index', () => {
      const domainBonus = orion.getGlobalBonus(99);
      expect(domainBonus).toBe(0);
    });
  });
});
