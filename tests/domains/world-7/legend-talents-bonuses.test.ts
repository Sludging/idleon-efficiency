import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';

const saveName = 'live-game-2026-01-11';
const extractionResultsName = 'legend-talents-data.json';

describe('Legend Talents Bonus Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let legendTalents: LegendTalents;

  beforeAll(() => {
    global.testSetup('Loading extraction results and game data for bonus calculations');
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    legendTalents = gameData.get("legendTalents") as LegendTalents;
  });

  describe('Key Talent Bonuses', () => {
    it('validates talent 3 bonus (Extended Database) - used in farming', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_3_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(3);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 7 bonus (Super Duper Talents) - affects super talent system', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_7_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(7);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 19 bonus (More Soot More Salt) - used in refinery', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_19_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(19);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 21 bonus (Flopping a Full House) - used in cards', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_21_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(21);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 22 bonus (Democracy FTW) - used in voting', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_22_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(22);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 25 bonus (Midusian Appetite) - used in skilling/golden food', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_25_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(25);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 39 bonus (Super Talent Points) - unlock flag', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_39_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(39);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });
  });

  describe('Sample Talent Bonuses', () => {
    it('validates talent 0 bonus (Coral Restoration)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_0_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(0);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 5 bonus (Kruk be Bubblin\')', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_5_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(5);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 11 bonus (Davey Jones Returns)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_11_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(11);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 15 bonus (Reduced Jail Sentence)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_15_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(15);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 30 bonus (Lightning Fast Naps)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_30_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(30);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 35 bonus (Obsolete No More)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_35_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(35);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });

    it('validates talent 38 bonus (Shrine World Order Bill)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_38_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(38);

      expect(domainBonus).toMatchLiveGame(liveBonus, 0.01);
    });
  });

  describe('Edge Cases', () => {
    it('validates filler talent (40) returns 0 bonus', () => {
      const liveBonus = getExtractedValue(extractionResults, 'talent_40_bonus');
      const domainBonus = legendTalents.getBonusFromIndex(40);

      expect(domainBonus).toBe(0);
      expect(liveBonus).toBe(0);
    });
  });
});
