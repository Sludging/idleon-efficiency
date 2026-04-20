
/**
 * @testCovers ZenithMarket.getBonusForId
 * @testCovers ZenithMarketBonus.getBonus
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';

const saveName = 'latest';
const extractionResultsName = 'zenith-market-data.json';

describe('ZenithMarket Bonus Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let zenithMarket: ZenithMarket;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    zenithMarket = gameData.get("zenithMarket") as ZenithMarket;
  });

  describe('Key Market Bonuses (used in cross-domain calculations)', () => {
    it('validates bonus 0 (True Zen) - used in zenith statue multiplier', () => {
      const liveBonus = getExtractedValue(extractionResults, 'zenith_market_0_bonus');
      const domainBonus = zenithMarket.getBonusForId(0);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 2 (Lamp Boost) - used in hole domain Lamp calculation', () => {
      const liveBonus = getExtractedValue(extractionResults, 'zenith_market_2_bonus');
      const domainBonus = zenithMarket.getBonusForId(2);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates bonus 5 (Super Dupers) - used in legend talent superTalentBonusLevels', () => {
      const liveBonus = getExtractedValue(extractionResults, 'zenith_market_5_bonus');
      const domainBonus = zenithMarket.getBonusForId(5);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });
  });

  describe('Sample Bonus', () => {
    it('validates bonus 9 (Classy Gogo) - upper index sample', () => {
      const liveBonus = getExtractedValue(extractionResults, 'zenith_market_9_bonus');
      const domainBonus = zenithMarket.getBonusForId(9);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });
  });

  describe('Edge Cases', () => {
    it('returns 0 for getBonusForId with non-existent index', () => {
      expect(zenithMarket.getBonusForId(99)).toBe(0);
    });
  });
});
