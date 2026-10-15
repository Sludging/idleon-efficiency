import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Player } from '../../../data/domain/player';
import type { Companion } from '../../../data/domain/companions';
import { getCompanionActiveBonus } from '../../../data/domain/companions';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { assertPairedContext, captured } from './part1-test-helpers';
import type { CapturedMajik, CapturedMajikPool, CapturedSchematic } from './part2-test-helpers';

describe('Majik and Pocket Divinity direct calculated parameters', () => {
 let results: ExtractionResults;
 let schematicResults: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-majik-data.json');
  schematicResults = loadExtractionResults('hole-schematics-data.json');
  validateExtractionHealth(results);
  validateExtractionHealth(schematicResults);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
 });

 it('pairs both direct-parameter sources with the real imported account', () => {
  assertPairedContext(results, data);
  assertPairedContext(schematicResults, data);
 });

 it('matches earned and invested point inputs without excluding placeholder slots', () => {
  const pool = captured<CapturedMajikPool>(results, 'pool');
  expect(hole.villagers[2].level).toMatchLiveGame(getExtractedValue(results, 'cosmo_level'), 0);
  expect(hole.majiks.earnedPoints).toMatchLiveGame(pool.earned, 0);
  expect(hole.majiks.investedPoints).toMatchLiveGame(pool.invested, 0);
  expect(hole.majiks.remainingPoints).toMatchLiveGame(pool.remaining, 0);
  const rows = captured<CapturedMajik[]>(results, 'upgrades');
  rows.forEach(row => {
   const upgrade = hole.majiks.upgrades.find(upgrade => upgrade.index === row.id)!;
   expect(upgrade.currentCap).toMatchLiveGame(row.cap, 0);
   expect(upgrade.enhancementAllowed).toBe(row.gate);
   expect(upgrade.getBonus()).toMatchLiveGame(row.bonus, 0);
  });
 });

 it('matches built-schematic count and Equal Spread used by multi-effect Majik', () => {
  const rows = captured<CapturedSchematic[]>(schematicResults, 'schematics');
  const creator = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 10)!;
  expect(creator.createdSchematics).toMatchLiveGame(rows.filter(row => row.built).length, 0);
  expect(creator.createdSchematics).toMatchLiveGame(getExtractedValue(results, 'built_schematics'), 0);
  expect(hole.allocationEffects.leastUnlockedInvestment).toMatchLiveGame(getExtractedValue(results, 'least_investment'), 0);
  expect(hole.allocationEffects.equalSpreadPercent).toMatchLiveGame(getExtractedValue(results, 'equal_spread_effect'), 0);
 });

 it('matches the actual eligible Doot parameter and active character Divinity level', () => {
  const player = getTargetPlayer(data.get('players') as Player[]);
  const companion = getCompanionActiveBonus(data.get('companions') as Companion[], 0);
  const effective = player.skills.get(SkillsIndex.Divinity)!.level >= 2 ? companion : 0;
  expect(effective).toMatchLiveGame(getExtractedValue(results, 'effective_doot'), 0);
  expect(player.skills.get(SkillsIndex.Divinity)!.level).toMatchLiveGame(getExtractedValue(results, 'active_divinity_level'), 0);
  expect(hole.majiks.pocketDivinity.getBonus())
   .toMatchLiveGame(captured<CapturedMajik[]>(results, 'upgrades').find(upgrade => upgrade.id === 21)!.bonus, 0);
 });

 it('matches the String is Strung input shared with schematic string effects', () => {
  expect(hole.majiks.HoleUpgrades.find(upgrade => upgrade.index === 1)!.getBonus())
   .toMatchLiveGame(getExtractedValue(results, 'string_slots_bonus'), 0);
 });
});
