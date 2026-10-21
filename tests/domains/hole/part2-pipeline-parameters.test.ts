import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Companion } from '../../../data/domain/companions';
import { getCompanionActiveBonus } from '../../../data/domain/companions';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { captured } from './part1-test-helpers';
import type { CapturedMeasurement } from './part2-test-helpers';

const measurementConsumers = [
 { index: 0, description: 'Tome-score Villager EXP' },
 { index: 7, description: 'Slab-items Villager EXP' },
 { index: 13, description: 'Death Note Gambit points' },
];

describe('Normal-import consumers retain their direct Hole parameters', () => {
 let results: ExtractionResults;
 let measurements: ExtractionResults;
 let majik: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-part2-pipeline-data.json');
  measurements = loadExtractionResults('hole-measurements-data.json');
  majik = loadExtractionResults('hole-majik-data.json');
  [results, measurements, majik].forEach(validateExtractionHealth);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
 });

 

 it('matches Voter Integrity consumed by Votes', () => {
  expect(hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index === 24)!.getBonus())
   .toMatchLiveGame(getExtractedValue(results, 'vote_majik'), 0);
 });

 it('matches Equinox Maxim consumed by the Equinox bar rate', () => {
  expect(hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index === 26)!.getBonus())
   .toMatchLiveGame(getExtractedValue(results, 'equinox_majik'), 0);
 });

 measurementConsumers.forEach(consumer => {
  it(`matches the prepared ${consumer.description} Measurement`, () => {
   const row = captured<CapturedMeasurement[]>(measurements, 'measurements').find(row => row.id === consumer.index)!;
   const measurement = hole.measurements[consumer.index];
   expect(measurement.effectiveBenefit).toMatchLiveGame(row.benefit, 0);
  });
 });

it('matches the whole calculated Doot companion bonus', () => {
  const companionBonus = getCompanionActiveBonus(data.get('companions') as Companion[], 0);
  expect(companionBonus).toMatchLiveGame(getExtractedValue(majik, 'effective_doot'), 0);
 });
});
