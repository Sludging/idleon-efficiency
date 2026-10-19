import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const nestedSchematics = [50, 79, 98, 32, 33, 34, 35, 36];

describe('Schematics direct prepared parameters', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-schematics-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
 });


 it('matches the Study input consumed by sediment expansion', () => {
  expect(hole.getStudyBolaiaBonuses(0)).toMatchLiveGame(getExtractedValue(results, 'study_0'), 0);
 });

 nestedSchematics.forEach(id => {
  it(`matches nested schematic ${id} consumed by resource layers or Harp string slots`, () => {
   expect(hole.getSchematicBonus(id, 1)).toMatchLiveGame(getExtractedValue(results, `schematic_parameter_${id}`), 0);
  });
 });

 it('matches String is Strung and prepared distinct Harp string count', () => {
  expect(hole.majiks.HoleUpgrades.find(upgrade => upgrade.index === 1)!.getBonus())
   .toMatchLiveGame(getExtractedValue(results, 'string_slots_bonus'), 0);
  const strings = hole.schematics.find(schematic => schematic.index === 38)!.uniqueHarpStrings;
  expect(strings).not.toBeNull();
  expect(strings).toMatchLiveGame(getExtractedValue(results, 'harp_string_count'), 0);
 });

 it('matches availability and the active Lamp discount without consuming saved stacks', () => {
  expect(hole.schematicAvailabilityCount).toMatchLiveGame(getExtractedValue(results, 'availability'), 0);
  hole.schematics.forEach(schematic => {
   expect(schematic.discountStacks).toMatchLiveGame(getExtractedValue(results, 'lamp_stacks'), 0);
   expect(schematic.discountMultiplier).toMatchLiveGame(getExtractedValue(results, 'lamp_multiplier'), 0);
  });
 });


});
