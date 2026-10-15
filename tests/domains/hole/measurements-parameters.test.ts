import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Tome } from '../../../data/domain/world-4/tome';
import type { Farming } from '../../../data/domain/world-6/farming';
import type { Deathnote } from '../../../data/domain/world-3/construction/deathnote';
import type { TaskBoard } from '../../../data/domain/tasks';
import type { Slab } from '../../../data/domain/world-5/slab';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, normalizeExtractedValue, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { assertPairedContext, captured } from './part1-test-helpers';
import type { CapturedMeasurement } from './part2-test-helpers';

const producers: { key: string; description: string; extract: (data: Map<string, any>, hole: Hole) => number | null }[] = [
 { key: 'lengthmeister', description: 'Lengthmeister benefit percentage', extract: (_data, hole) => hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 12)!.getBonus() },
 { key: 'fountain_discount', description: 'Fountain Measurement price discount', extract: (_data, hole) => hole.getFountainBonus(2, 14) },
 { key: 'account_level', description: 'Tome numeric account level', extract: data => (data.get('tome') as Tome).totalAccountLevel },
 { key: 'skill_levels', description: 'Tome numeric total of all 21 saved skill slots', extract: data => (data.get('tome') as Tome).totalSkillLevel },
 { key: 'tome_score', description: 'Tome highest score against original cached score', extract: data => (data.get('tome') as Tome).getHighestScore() },
 { key: 'crop_count', description: 'complete Farming registered crop map count', extract: data => (data.get('farming') as Farming).registeredCropCount },
 { key: 'deathnote_points', description: 'normal-world Death Note points', extract: data => (data.get('deathnote') as Deathnote).getTotalWorldRank() },
 { key: 'highest_damage', description: 'highest recorded task damage', extract: data => Number((data.get('taskboard') as TaskBoard).tasks.find(task => task.name === 'Road to Max Damage')!.count) },
 { key: 'slab_items', description: 'raw obtained Slab item count', extract: data => (data.get('slab') as Slab).rawObtainedCount },
 { key: 'study_levels', description: 'summed saved Study levels', extract: (_data, hole) => hole.savedStudyLevelsForMeasurements!.reduce((sum, level) => sum + level, 0) },
];

describe('Measurements every direct calculated input', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let rows: CapturedMeasurement[];

 beforeAll(() => {
  results = loadExtractionResults('hole-measurements-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  rows = captured<CapturedMeasurement[]>(results, 'measurements');
 });

 it('pairs direct parameters with the unchanged original save', () => {
  assertPairedContext(results, data);
 });

 producers.forEach(producer => {
  it(`matches direct ${producer.description}`, () => {
   const actual = producer.extract(data, hole);
   expect(actual).not.toBeNull();
   expect(actual).toMatchLiveGame(getExtractedValue(results, producer.key), 0);
  });
 });

 Array.from({ length: 17 }, (_, index) => index).forEach(index => {
  it(`matches Measurement ${index}'s directly consumed quantity, multiplier, base and price modifier`, () => {
   const measurement = hole.measurements[index];
   const row = rows[index];
   // Keep these parameter checks even though all 17 rows also have core comparisons.
   expect(measurement.rawStatistic).not.toBeNull();
   expect(measurement.rawStatistic).toMatchLiveGame(normalizeExtractedValue(row.raw), 0);
   expect(measurement.normalizedQuantity).toMatchLiveGame(row.normalized, 0);
   expect(measurement.getMeasurementMulti()).toMatchLiveGame(row.multiplier, 0);
   expect(measurement.getMeasurementBaseBonus()).toMatchLiveGame(row.base, 0);
   expect(measurement.cosmosBonus).toMatchLiveGame(getExtractedValue(results, 'lengthmeister'), 0);
   expect(measurement.fountainDiscountPercent).toMatchLiveGame(getExtractedValue(results, 'fountain_discount'), 0);
  });
 });
});
