/**
 * Bubba Global Bonus Calculation Validation
 *
 * Tests our Bubba global bonus final calculations against live game data.
 *
 * Global bonuses (indices 1-7):
 *   1: +{% Build Rate (base 10)
 *   2: +{% Critter Gain (base 5)
 *   3: +{% Soul Gain (base 5)
 *   4: +{% Total DMG (base 15)
 *   5: +{% All Kills (base 1)
 *   6: {% XP Multi (base 4)
 *   7: -{% Atom Cost (base 3)
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Bubba } from '../../../data/domain/world-3/bubba';

const saveName = 'latest';
const extractionResultsName = 'bubba-global-bonus-data.json';

describe('Bubba Domain - Global Bonus Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let bubba: Bubba;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    bubba = gameData.get("bubba") as Bubba;
  });

  describe('All Global Bonuses', () => {
    it('validates global bonus 1 (+{% Build Rate)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_1');
      const domainBonus = bubba.getGlobalBonus(1);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 2 (+{% Critter Gain)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_2');
      const domainBonus = bubba.getGlobalBonus(2);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 3 (+{% Soul Gain)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_3');
      const domainBonus = bubba.getGlobalBonus(3);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 4 (+{% Total DMG)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_4');
      const domainBonus = bubba.getGlobalBonus(4);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 5 (+{% All Kills)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_5');
      const domainBonus = bubba.getGlobalBonus(5);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 6 ({% XP Multi)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_6');
      const domainBonus = bubba.getGlobalBonus(6);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates global bonus 7 (-{% Atom Cost)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'global_bonus_7');
      const domainBonus = bubba.getGlobalBonus(7);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });
  });

  describe('Edge Cases', () => {
    it('returns 0 for invalid bonus index', () => {
      const domainBonus = bubba.getGlobalBonus(99);
      expect(domainBonus).toBe(0);
    });
  });
});
