import { ExtractionResults, loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';

const saveName = 'latest';
const extractionResultsName = 'legend-talents-data.json';

type LegendTalentCatalogEntry = {
 index: number;
 name: string;
 effect: string;
 level: number;
 bonus: number;
 maxLevel: number;
};

const extractionResults: ExtractionResults = loadExtractionResults(extractionResultsName);
const nativeCatalog = extractionResults.extractions['legend_talent_catalog'].result as LegendTalentCatalogEntry[];

describe('Legend Talents Bonus Calculations', () => {
 let gameData: Map<string, any>;
 let legendTalents: LegendTalents;

 beforeAll(() => {
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

 it.each(nativeCatalog)('matches bonus for $index: $name, $effect (saved level $level)', ({ index, name, effect, level, bonus }) => {
  expect(legendTalents.getBonusFromIndex(index)).toMatchLiveGameWithDetails(bonus, {
   tolerance: 0,
   context: `${name}: ${effect} bonus`,
   debugInfo: { index, level },
  });
 });

 it.each(nativeCatalog)('matches saved level for $index: $name, $effect (saved level $level)', ({ index, name, effect, level }) => {
  const talent = legendTalents.talents.find(candidate => candidate.index === index);
  if (!talent) throw new Error(`Legend Talent record ${index}: ${name}, ${effect} not found`);

  expect(talent.level).toMatchLiveGameWithDetails(level, {
   tolerance: 0,
   context: `${name}: ${effect} saved level`,
   debugInfo: { index, level },
  });
 });

 it.each(nativeCatalog)('matches maximum level for $index: $name, $effect (saved level $level)', ({ index, name, effect, level, maxLevel }) => {
  const talent = legendTalents.talents.find(candidate => candidate.index === index);
  if (!talent) throw new Error(`Legend Talent record ${index}: ${name}, ${effect} not found`);

  expect(talent.getMaxLevel()).toMatchLiveGameWithDetails(maxLevel, {
   tolerance: 0,
   context: `${name}: ${effect} effective maximum level`,
   debugInfo: { index, level },
  });
 });

});
