/**
 * Worship Totalizer Bonuses Calculation Validation
 *
 * Tests our Worship totalizer bonus calculations against live game data.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Worship, TotalizerBonus } from '../../../data/domain/world-3/worship';

const saveName = 'latest';
const extractionResultsName = 'worship-totalizer-bonuses-data.json';

describe('Worship Domain - Totalizer Bonus Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let worship: Worship;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    worship = gameData.get("worship") as Worship;
  });

  describe('All Totalizer Bonuses', () => {
    it('validates bonus 0 (Damage)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_0_damage');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.Damage);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 1 (Cooking)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_1_cooking');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.Cooking);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 2 (Boat Speed)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_2_boat_speed');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.BoatSpeed);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 3 (Bit Value)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_3_bit_value');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.BitValue);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 4 (Exp Multi)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_4_exp_multi');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.ExpMulti);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 5 (Skill Exp)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_5_skill_exp');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.SkillExp);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 6 (Farming Exp)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_6_farming_exp');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.FarmingExp);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 7 (Jade Coin)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_7_jade_coin');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.JadeCoin);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 8 (Essence Gain)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_8_essence_gain');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.EssenceGain);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 9 (Spelunking Power)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_9_spelunking_pow');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.SpelunkingPow);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 10 (World 7 Second Skill)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'bonus_10_world7_skill');
      const domainBonus = worship.totalizer.getBonus(TotalizerBonus.World7SeconSkill);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });
  });
});
