import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Divinity } from '../../../data/domain/world-5/divinity';
import type { Companion } from '../../../data/domain/companions';
import { getCompanionActiveBonus } from '../../../data/domain/companions';
import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { assertPairedContext, captured } from './part1-test-helpers';
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

 it('pairs all affected-consumer parameter sources with the real account', () => {
  [results, measurements, majik].forEach(source => assertPairedContext(source, data));
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
   expect(measurement.effectiveBenefit).not.toBeNull();
   expect(measurement.effectiveBenefit).toMatchLiveGame(row.benefit, 0);
  });
 });

 it('matches effective Companion eligibility consumed by Divinity and Pocket records', () => {
  const player = getTargetPlayer(data.get('players') as Player[]);
  const links = (data.get('divinity') as Divinity).playerInfo.find(info => info.playerIndex === player.playerID)!;
  const effective = player.skills.get(SkillsIndex.Divinity)!.level >= 2
   ? getCompanionActiveBonus(data.get('companions') as Companion[], 0) : 0;
  expect(effective).toMatchLiveGame(getExtractedValue(majik, 'effective_doot'), 0);
  expect(Number(links.dootActive)).toMatchLiveGame(getExtractedValue(majik, 'effective_doot'), 0);
 });
});
