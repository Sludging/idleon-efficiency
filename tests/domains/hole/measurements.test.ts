import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { captured } from './part1-test-helpers';
import type { CapturedMeasurement } from './part2-test-helpers';
import { compareCore } from './part2-test-helpers';



describe('Hole Measurement numeric results', () => {
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



 Array.from({ length: 17 }, (_, index) => index).forEach(index => {
  it(`matches Measurement ${index}'s raw, normalized and multiplier values`, () => {
   const measurement = hole.measurements[index];
   const row = rows[index];
   compareCore(measurement.rawStatistic, row.raw, `Measurement ${index} raw statistic`);
   compareCore(measurement.normalizedQuantity, row.normalized, `Measurement ${index} normalized account statistic`);
   compareCore(measurement.multiplier, row.multiplier, `Measurement ${index} statistic multiplier`);
  });
  it(`matches Measurement ${index}'s base and effective benefits`, () => {
   const measurement = hole.measurements[index];
   const row = rows[index];
   compareCore(measurement.baseBenefit, row.base, `Measurement ${index} base benefit`);
   compareCore(measurement.effectiveBenefit, row.benefit, `Measurement ${index} effective benefit`);
  });
  it(`matches Measurement ${index}'s next price and shortfall`, () => {
   const measurement = hole.measurements[index];
   const row = rows[index];
   compareCore(measurement.nextCost, row.price, `Measurement ${index} next price`);
   compareCore(measurement.shortfall, row.shortfall, `Measurement ${index} next-level shortfall`);
  });
 });


});
