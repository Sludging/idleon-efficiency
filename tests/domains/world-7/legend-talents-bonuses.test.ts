import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';

const saveName = 'latest';
const extractionResultsName = 'legend-talents-data.json';

describe('Legend Talents Bonus Calculations', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let legendTalents: LegendTalents;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  legendTalents = gameData.get("legendTalents") as LegendTalents;
 });

 it('matches populated point and super-talent outputs shown by the website', () => {
  expect(legendTalents.pointsOwned).toMatchLiveGameWithDetails(
   getExtractedValue(extractionResults, 'points_owned'),
   { tolerance: 0, context: 'Legend talent points owned' },
  );
  expect(legendTalents.pointsSpent).toMatchLiveGameWithDetails(
   getExtractedValue(extractionResults, 'points_spent'),
   { tolerance: 0, context: 'Legend talent points spent' },
  );
  expect(legendTalents.pointsAvaible).toMatchLiveGameWithDetails(
   getExtractedValue(extractionResults, 'points_available'),
   { tolerance: 0, context: 'Available Legend Talent points shown in the Legend menu' },
  );
  expect(legendTalents.superTalentUnlocked ? 1 : 0).toMatchLiveGameWithDetails(
   getExtractedValue(extractionResults, 'super_talent_unlocked'),
   { tolerance: 0, context: 'Legend super-talent system unlock status' },
  );
  expect(legendTalents.superTalentBonusLevels).toMatchLiveGameWithDetails(
   getExtractedValue(extractionResults, 'super_talent_bonus_levels'),
   { tolerance: 0, context: 'Legend super-talent bonus levels' },
  );
 });

 it('matches displayed levels for representative unlocked legend talents', () => {
  const selectedTalents = [0, 3, 5, 7, 11, 15, 19, 21, 22, 25, 30, 35, 38, 39];

  selectedTalents.forEach(index => {
   expect(legendTalents.talents[index].level).toMatchLiveGameWithDetails(
    getExtractedValue(extractionResults, `talent_${index}_level`),
    { tolerance: 0, context: `Displayed level for legend talent ${index}` },
   );
  });
 });

 describe('Key Talent Bonuses', () => {
  it('validates talent 3 bonus (Extended Database) - used in farming', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_3_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(3);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 3 bonus shown by the website',
   });
  });

  it('validates talent 7 bonus (Super Duper Talents) - affects super talent system', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_7_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(7);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 7 bonus used by super talents',
   });
  });

  it('validates talent 19 bonus (More Soot More Salt) - used in refinery', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_19_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(19);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 19 bonus shown by the website',
   });
  });

  it('validates talent 21 bonus (Flopping a Full House) - used in cards', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_21_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(21);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 21 bonus shown in card calculations',
   });
  });

  it('validates talent 22 bonus (Democracy FTW) - used in voting', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_22_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(22);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 22 bonus shown by the website',
   });
  });

  it('validates talent 25 bonus (Midusian Appetite) - used in skilling/golden food', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_25_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(25);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 25 bonus shown by the website',
   });
  });

  it('validates talent 39 bonus (Super Talent Points) - unlock flag', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_39_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(39);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 39 bonus used for super-talent unlock',
   });
  });
 });

 describe('Sample Talent Bonuses', () => {
  it('validates talent 0 bonus (Coral Restoration)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_0_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(0);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 0 bonus shown by the website',
   });
  });

  it('validates talent 5 bonus (Kruk be Bubblin\')', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_5_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(5);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 5 bonus shown by the website',
   });
  });

  it('validates talent 11 bonus (Davey Jones Returns)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_11_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(11);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 11 bonus used by Sailing',
   });
  });

  it('validates talent 15 bonus (Reduced Jail Sentence)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_15_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(15);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 15 bonus shown by the website',
   });
  });

  it('validates talent 30 bonus (Lightning Fast Naps)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_30_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(30);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 30 bonus shown by the website',
   });
  });

  it('validates talent 35 bonus (Obsolete No More)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_35_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(35);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 35 bonus shown by the website',
   });
  });

  it('validates talent 38 bonus (Shrine World Order Bill)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'talent_38_bonus');
   const domainBonus = legendTalents.getBonusFromIndex(38);

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: 'Legend Talent 38 bonus shown by the website',
   });
  });
 });

});
