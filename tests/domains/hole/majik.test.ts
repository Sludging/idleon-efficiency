import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { captured, coreNumber } from './part1-test-helpers';
import type { CapturedMajik, CapturedMajikPool } from './part2-test-helpers';
import { compareCore } from './part2-test-helpers';

describe('Hole Majik extracted effect comparisons', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-majik-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
 });


 it('matches paired numeric Majik effects', () => {
  const upgrades = captured<CapturedMajik[]>(results, 'upgrades');
  const forge = hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index === 22)!;
  compareCore(forge.getEffects()[0].value as number, upgrades.find(upgrade => upgrade.id === 22)!.bonus,
   'Beeg Beeg Forge effect');
  const creator = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 10)!;
  coreNumber(creator.getEffects()[0].value as number, results,
   'village_schematic_effect', 'Contented Creator EXP effect');
  const spread = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 14)!;
  coreNumber(spread.getEffects()[0].value as number | null, results,
   'equal_spread_effect', 'Equal Spread EXP effect');
 });

it('matches the final Majik point pool, upgrade caps, and bonuses', () => {
  const pool = captured<CapturedMajikPool>(results, 'pool');
  compareCore(hole.majiks.purchasedPoints, pool.purchased, 'Majik purchased points');
  compareCore(hole.majiks.earnedPoints, pool.earned, 'Majik earned points');
  compareCore(hole.majiks.investedPoints, pool.invested, 'Majik invested points');
  compareCore(hole.majiks.remainingPoints, pool.remaining, 'Majik remaining points');

  const upgrades = captured<CapturedMajik[]>(results, 'upgrades');
  upgrades.forEach(row => {
   const upgrade = hole.majiks.upgrades.find(candidate => candidate.index === row.id)!;
   compareCore(upgrade.currentCap, row.cap, `${upgrade.name} cap`);
   compareCore(upgrade.getBonus(), row.bonus, `${upgrade.name} bonus`);
  });
 });

it('matches paired Pocket Divinity All Stat contribution', () => {
  coreNumber(hole.majiks.pocketDivinity.getDootAllStatPercent(), results,
   'pocket_all_stat', 'Pocket Divinity All Stat contribution');
 });

});
