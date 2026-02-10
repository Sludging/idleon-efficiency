/**
 * Poppy Global Bonus Calculation Validation
 *
 * Tests our Poppy global bonus final calculations against live game data.
 *
 * Global bonuses (indices 0-6):
 *   0: +{% Fish Efficiency (base 3)
 *   1: +{ Defence (base 3)
 *   2: +{% Fishing XP (base 5)
 *   3: +{% Accuracy (base 2)
 *   4: +{% Total DMG (base 2)
 *   5: +{% AFK Gains (base 0.5)
 *   6: +{% Cash (base 3)
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Poppy } from '../../../data/domain/world-2/poppy';

const saveName = 'latest';
const extractionResultsName = 'poppy-global-bonus-data.json';

describe('Poppy Domain - Global Bonus Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let poppy: Poppy;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    poppy = gameData.get("poppy") as Poppy;
  });

  describe('All Global Bonuses', () => {
    it('validates global bonus 0 (+{% Fish Efficiency)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_0');
      const domainBonus = poppy.getGlobalBonus(0);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 1 (+{ Defence)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_1');
      const domainBonus = poppy.getGlobalBonus(1);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 2 (+{% Fishing XP)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_2');
      const domainBonus = poppy.getGlobalBonus(2);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 3 (+{% Accuracy)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_3');
      const domainBonus = poppy.getGlobalBonus(3);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 4 (+{% Total DMG)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_4');
      const domainBonus = poppy.getGlobalBonus(4);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 5 (+{% AFK Gains)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_5');
      const domainBonus = poppy.getGlobalBonus(5);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 6 (+{% Cash)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_6');
      const domainBonus = poppy.getGlobalBonus(6);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });
  });

  describe('Edge Cases', () => {
    it('returns 0 for invalid bonus index', () => {
      const domainBonus = poppy.getGlobalBonus(99);
      expect(domainBonus).toBe(0);
    });
  });
});
