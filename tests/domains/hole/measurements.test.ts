import type { Hole, MeasurementStatisticUnit } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { assertPairedContext, captured, decodedSave } from './part1-test-helpers';
import type { CapturedMeasurement } from './part2-test-helpers';
import { compareCore } from './part2-test-helpers';

const units: Record<number, MeasurementStatisticUnit> = {
 0: 'kills', 1: 'crops', 2: 'levels', 3: 'points', 4: 'levels',
 6: 'points', 7: 'damage', 8: 'items', 9: 'study-levels', 10: 'kills',
};

describe('All 17 Hole Measurements and their current owned benefit', () => {
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

 it('pairs every row with original outputs and preserves all purchased levels', () => {
  assertPairedContext(results, data);
  expect(hole.measurements).toHaveLength(17);
  expect(rows).toHaveLength(17);
  expect(hole.measurements.map(measurement => measurement.index)).toEqual(rows.map(row => row.id));
  expect(hole.measurements.map(measurement => measurement.level)).toEqual(decodedSave<number[][]>('Holes')[22].slice(0, 17));
  expect(hole.measurements.map(measurement => measurement.statisticType)).toEqual(rows.map(row => row.type));
 });

 Array.from({ length: 17 }, (_, index) => index).forEach(index => {
  it(`matches Measurement ${index} statistic identity, unit, raw quantity and normalized multiplier`, () => {
   const measurement = hole.measurements[index];
   const row = rows[index];
   expect(measurement.statisticType).toBe(row.type);
   expect(measurement.statisticId).toBe(`hole-measurement-statistic:${row.type}`);
   expect(measurement.statisticUnit).toBe(units[row.type]);
   expect(measurement.statisticAvailable).toBe(true);
   expect(measurement.statisticUnavailableReason).toBeNull();
   compareCore(measurement.rawStatistic, row.raw, `Measurement ${index} raw ${measurement.statisticUnit}`);
   compareCore(measurement.normalizedQuantity, row.normalized, `Measurement ${index} normalized account statistic`);
   compareCore(measurement.multiplier, row.multiplier, `Measurement ${index} statistic multiplier`);
  });

  it(`matches Measurement ${index} access, purchased level, base benefit and effective benefit`, () => {
   const measurement = hole.measurements[index];
   const row = rows[index];
   expect(measurement.saveAvailable).toBe(true);
   expect(measurement.access).toBe(row.access);
   expect(measurement.unlocked).toBe(row.access);
   expect(measurement.benefitAvailable).toBe(true);
   compareCore(measurement.level, row.level, `Measurement ${index} purchased level`);
   compareCore(measurement.baseBenefit, row.base, `Measurement ${index} Lengthmeister-adjusted base benefit`);
   compareCore(measurement.effectiveBenefit, row.benefit, `Measurement ${index} owned effective benefit`);
  });

  it(`matches Measurement ${index} next price, currency, stock, shortfall and affordability`, () => {
   const measurement = hole.measurements[index];
   const row = rows[index];
   expect(measurement.currency.index).toBe(row.currency);
   expect(measurement.currency).toBe(hole.currencies.find(currency => currency.index === row.currency));
   compareCore(measurement.nextCost, row.price, `Measurement ${index} discounted next price`);
   compareCore(measurement.currency.stock, row.stock, `Measurement ${index} spendable currency stock`);
   compareCore(measurement.shortfall, row.shortfall, `Measurement ${index} next-level shortfall`);
   expect(measurement.affordable).toBe(row.affordable);
  });
 });

 it('joins the last Measurement to generated Bronze Coins rather than an unknown sediment', () => {
  const currency = hole.measurements[16].currency;
  expect(currency.index).toBe(rows[16].currency);
  expect(currency.index).toBe(30);
  expect(currency.data.name.replace(/_/g, ' ')).toBe('Bronze Coins');
  expect(currency.data.kind).toBe('Fountain');
 });
});
