import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Player } from '../../../data/domain/player';
import type { Orion } from '../../../data/domain/world-1/orion';
import type { Poppy } from '../../../data/domain/world-2/poppy';
import type { ResearchGrid } from '../../../data/domain/world-7/research';
import type * as HoleModule from '../../../data/domain/world-5/hole/hole';
import type * as GambitModule from '../../../data/domain/world-5/hole/gambit';
import type * as PlayerModule from '../../../data/domain/player';
import type * as OrionModule from '../../../data/domain/world-1/orion';
import type * as PoppyModule from '../../../data/domain/world-2/poppy';
import type * as ResearchModule from '../../../data/domain/world-7/research';
import type { Divinity } from '../../../data/domain/world-5/divinity';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { Equinox } from '../../../data/domain/world-3/equinox';
import type { Tome } from '../../../data/domain/world-4/tome';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';
import { assertPairedContext, captured, coreNumber, decodedSave } from './part1-test-helpers';
import type { CapturedMajikPool, CapturedMeasurement, CapturedSchematic } from './part2-test-helpers';
import { assertPocketCharacterBinding, compareCore, freshPart2Account } from './part2-test-helpers';

function preparedSnapshot(data: Map<string, any>): string {
 const hole = data.get('hole') as Hole;
 const divinity = data.get('divinity') as Divinity;
 const tome = data.get('tome') as Tome;
 return JSON.stringify({
  schematics: hole.schematicCatalogue.map(schematic => ({ id: schematic.index, built: schematic.built,
   slot: schematic.availabilitySlot, available: schematic.available, price: schematic.currentCost,
   shortfall: schematic.shortfall, effects: schematic.getEffects() })),
  pool: [hole.majiks.earnedPoints, hole.majiks.investedPoints, hole.majiks.remainingPoints],
  majik: hole.majiks.upgrades.map(upgrade => ({ id: upgrade.index, level: upgrade.level,
   initial: upgrade.initialLevel, enhancement: upgrade.enhancementLevel, cap: upgrade.currentCap,
   effects: upgrade.getEffects(), canPurchase: upgrade.canPurchase })),
  pocket: { selections: hole.majiks.pocketDivinity.selections, characters: hole.majiks.pocketDivinity.characters },
  measurements: hole.measurements.map(measurement => ({ id: measurement.index, level: measurement.level,
   access: measurement.access, raw: measurement.rawStatistic, normalized: measurement.normalizedQuantity,
   multiplier: measurement.multiplier, base: measurement.baseBenefit, effective: measurement.effectiveBenefit,
   currency: measurement.currency.index, price: measurement.nextCost, shortfall: measurement.shortfall })),
  characters: (data.get('players') as Player[]).map(player => ({ id: player.playerID, name: player.playerName,
   stats: player.stats, level: player.level })),
  links: divinity.playerInfo.map(info => ({ id: info.playerIndex, primary: info.primaryGod?.index,
   secondary: info.esGod?.index, doot: info.dootActive, gods: info.gods.map(god => god.index) })),
  gods: divinity.gods.map(god => ({ id: god.index, cap: god.blessMaxLevel, players: god.linkedPlayers.map(player => player.playerID) })),
  tome: [tome.totalAccountLevel, tome.totalSkillLevel, tome.getHighestScore()],
  gaming: divinity.getGamingGrowthMinorLinkBonus(),
  votes: (data.get('votes') as Votes).getBonusMultiplier(),
  equinox: (data.get('equinox') as Equinox).bar.rate,
  gambit: hole.gambit.gambitPointsMulti,
  growth: hole.villagers.map(villager => villager.characterRates),
 });
}

describe('Hole part 2 normal imports and affected consumers without input replacement', () => {
 let pipeline: ExtractionResults;
 let schematics: ExtractionResults;
 let majik: ExtractionResults;
 let measurements: ExtractionResults;

 beforeAll(() => {
  pipeline = loadExtractionResults('hole-part2-pipeline-data.json');
  schematics = loadExtractionResults('hole-schematics-data.json');
  majik = loadExtractionResults('hole-majik-data.json');
  measurements = loadExtractionResults('hole-measurements-data.json');
  [pipeline, schematics, majik, measurements].forEach(validateExtractionHealth);
 });

 function assertNormalAccount(data: Map<string, any>): void {
  [pipeline, schematics, majik, measurements].forEach(results => assertPairedContext(results, data));
  const hole = data.get('hole') as Hole;
  const divinity = data.get('divinity') as Divinity;
  const savedHole = decodedSave<number[][]>('Holes');
  expect(hole.villagers.map(villager => villager.level)).toEqual(savedHole[1].slice(0, 5));
  expect(hole.villagers.map(villager => villager.currentExp)).toEqual(savedHole[2].slice(0, 5));
  expect(hole.schematics.map(schematic => schematic.built)).toEqual(savedHole[13].slice(0, 106).map(value => value === 1));
  expect(hole.measurements.map(measurement => measurement.level)).toEqual(savedHole[22].slice(0, 17));
  const rows = captured<CapturedSchematic[]>(schematics, 'schematics');
  expect(hole.schematicCatalogue.map(schematic => schematic.index)).toEqual(rows.map(row => row.id));
  rows.forEach(row => {
   const schematic = hole.schematics.find(schematic => schematic.index === row.id)!;
   compareCore(schematic.currentCost, row.currentCost, `Normal import schematic ${row.id} current price`);
  });
  const pool = captured<CapturedMajikPool>(majik, 'pool');
  compareCore(hole.majiks.earnedPoints, pool.earned, 'Normal import earned Majik points');
  compareCore(hole.majiks.investedPoints, pool.invested, 'Normal import invested Majik points');
  compareCore(hole.majiks.remainingPoints, pool.remaining, 'Normal import remaining Majik points');
  captured<CapturedMeasurement[]>(measurements, 'measurements').forEach(row => {
   const measurement = hole.measurements[row.id];
   compareCore(measurement.effectiveBenefit, row.benefit, `Normal import Measurement ${row.id} benefit`);
   compareCore(measurement.nextCost, row.price, `Normal import Measurement ${row.id} price`);
  });
  assertPocketCharacterBinding(data, majik);
  coreNumber((data.get('votes') as Votes).getBonusMultiplier(), pipeline, 'vote_multiplier', 'Normal import Votes multiplier');
  coreNumber((data.get('equinox') as Equinox).bar.rate, pipeline, 'equinox_rate', 'Normal import Equinox fill rate');
  coreNumber(divinity.getGamingGrowthMinorLinkBonus(), pipeline, 'gaming_primary_links', 'Gaming keeps primary links separate from Pocket and Doot');
  coreNumber(hole.gambit.gambitPointsMulti, pipeline, 'gambit_multiplier', 'Hole Gambit consumes prepared Measurement benefits');
  const growth = hole.villagers[0].characterRates.find(rate => rate.playerId === TARGET_PLAYER_INDEX)!;
  coreNumber(growth.expPerHour, pipeline, 'growth_0', 'Hole growth consumes prepared Measurement benefits for Player 3');
 }

 it('matches two independent fresh imports of the complete real save', () => {
  const first = freshPart2Account();
  assertNormalAccount(first.data);
  const snapshot = preparedSnapshot(first.data);
  const second = freshPart2Account();
  assertNormalAccount(second.data);
  expect(preparedSnapshot(second.data)).toBe(snapshot);
 });

 it('replaces derived records without stacking effects on repeated imports of the same complete save', () => {
  const run = freshPart2Account();
  assertNormalAccount(run.data);
  const snapshot = preparedSnapshot(run.data);
  const saveBefore = JSON.stringify(run.save);
  for (let pass = 0; pass < 2; pass++) {
   run.data = run.process(run.data, run.save, run.save.get('playerNames'),
    normalizeCompanionStates(run.save.get('companions')), run.save.get('servervars'), true).getData();
   assertNormalAccount(run.data);
   expect(preparedSnapshot(run.data)).toBe(snapshot);
   expect(JSON.stringify(run.save)).toBe(saveBefore);
  }
 });
});

describe('Hole missing Death Note input availability, not matched-game branch parity', () => {
 it('withholds dependent Gambit and downstream values, preserves independent state, and recovers the real input', () => {
  const run = freshPart2Account();
  // Load runtime exports after the save helpers initialize pipeline registrations.
  const { updateHole, updateHolePresentation }: typeof HoleModule = require('../../../data/domain/world-5/hole/hole');
  const { updateOrionFeatherRate }: typeof OrionModule = require('../../../data/domain/world-1/orion');
  const { updatePoppyFishRate }: typeof PoppyModule = require('../../../data/domain/world-2/poppy');
  const { updateResearchDisplay }: typeof ResearchModule = require('../../../data/domain/world-7/research');
  const hole = run.data.get('hole') as Hole;
  const parse = jest.spyOn(hole, 'parse');
  let originalInputs: Map<string, any>;
  try {
   run.data = run.process(run.data, run.save, run.save.get('playerNames'),
    normalizeCompanionStates(run.save.get('companions')), run.save.get('servervars'), true).getData();
   originalInputs = new Map(parse.mock.calls[0][0]);
  } finally {
   parse.mockRestore();
  }
  const orion = run.data.get('orion') as Orion;
  const poppy = run.data.get('poppy') as Poppy;
  const research = run.data.get('research') as ResearchGrid;
  const measurement = hole.measurements[13];
  const featherRate = orion.getFeatherRate();
  const before = preparedSnapshot(run.data);
  const baseline = JSON.parse(before);
  const records = hole.gambit.challenges.map(challenge => ({
   time: challenge.maxTime, score: challenge.getScoreValue(), display: challenge.getDisplayTime(),
  }));
  const gambitScore = hole.gambit.getGambitTotalScore();
  const gambitBonuses = hole.gambit.bonuses.map(bonus => ({
   unlocked: bonus.unlocked, value: hole.gambit.getBonus(bonus.index),
  }));
  const downstream = JSON.stringify({
   orionBonus: orion.gambitBonus8, orionRate: orion.getFeatherRate(),
   poppyBonus: poppy.gambitBonus8, offline: research.offlineGains,
  });
  const independentProduction = () => {
   const production = research.production;
   return {
    expPerHour: production.expPerHour,
    expBeforeSharedMultiplierPerHour: production.expBeforeSharedMultiplierPerHour,
    expMultiplier: production.expMultiplier, additiveExpPercent: production.additiveExpPercent,
    insightAccrualPerHour: production.insightAccrualPerHour,
    gameDisplayedInsightPerHour: production.gameDisplayedInsightPerHour,
    insightMultiplier: production.insightMultiplier,
    kaleidoscopeBoostPercent: production.kaleidoscopeBoostPercent,
    totalInsightExpBonusPercent: production.totalInsightExpBonusPercent,
   };
  };
  const production = independentProduction();
  const independentOffline = JSON.stringify(research.offlineGains.contributors
   .filter(contributor => !contributor.source.startsWith('The Hole Gambit:')));
  const papers = JSON.stringify(research.papers);
  const reference = research.progress.savedExpCopy!;
  const referencePlayer = (run.data.get('players') as Player[]).find(player => player.playerID === reference.characterID)!;
  expect(referencePlayer.currentMap).not.toContain('Tutorial');
  expect(measurement.level).toBeGreaterThan(0);
  expect(gambitScore).toBeGreaterThan(0);
  const missingInputs = new Map(originalInputs!);
  const rawData = { ...originalInputs!.get('rawData') };
  delete rawData.KLA_0;
  missingInputs.set('rawData', rawData);
  missingInputs.delete('KLA_0');
  const prepare = () => {
   hole.prepareSharedStudyEffects();
   hole.prepareSharedUpgradeEffects();
   updateHole(run.data);
   updateHolePresentation(run.data);
   updateOrionFeatherRate(run.data);
   updatePoppyFishRate(run.data);
   updateResearchDisplay(run.data);
  };
  try {
   hole.parse(missingInputs);
   prepare();
   expect(hole.sourceSaveAvailable.measurementDeathnote).toBe(false);
   expect(measurement.rawStatistic).toBeNull();
   expect(measurement.multiplier).toBeNull();
   expect(measurement.effectiveBenefit).toBeNull();
   expect(hole.gambit.gambitPointsMulti).toBeNull();
   expect(hole.gambit.getGambitTotalScore()).toBeNull();
   hole.gambit.bonuses.forEach(bonus => {
    expect(bonus.unlocked).toBeNull();
    expect(hole.gambit.getBonus(bonus.index)).toBeNull();
   });
   expect(orion.gambitBonus8).toBeNull();
   expect(orion.getFeatherRate()).toBe(featherRate === 0 ? 0 : null);
   expect(poppy.gambitBonus8).toBeNull();
   const gambitOffline = research.offlineGains.contributors.find(contributor => contributor.source.startsWith('The Hole Gambit:'))!;
   expect(gambitOffline.inputValue).toBeNull();
   expect(gambitOffline.value).toBeNull();
   expect(research.offlineGains.percent).toBeNull();
   expect(research.offlineGains.fraction).toBeNull();
   expect(research.offlineGains.unclampedPercent).toBeNull();
   expect(research.offlineGains.onlinePercent).toBe(100);
   expect(JSON.stringify(research.offlineGains.contributors
    .filter(contributor => !contributor.source.startsWith('The Hole Gambit:')))).toBe(independentOffline);
   expect(independentProduction()).toEqual(production);
   expect(JSON.stringify(research.papers)).toBe(papers);
   expect(hole.gambit.getBonus(-1)).toBe(0);
   expect(hole.gambit.challenges.map(challenge => ({
    time: challenge.maxTime, score: challenge.getScoreValue(), display: challenge.getDisplayTime(),
   }))).toEqual(records);
   const omitted = JSON.parse(preparedSnapshot(run.data));
   expect(omitted.measurements[13].level).toBe(baseline.measurements[13].level);
   expect(omitted.measurements[13].access).toBe(baseline.measurements[13].access);
   expect(omitted.measurements[13].base).toBe(baseline.measurements[13].base);
   expect(omitted.measurements[13].price).toBe(baseline.measurements[13].price);
   const deathnoteMeasurementIds = hole.measurements
    .filter(row => row.statisticType === measurement.statisticType).map(row => row.index);
   expect(omitted.measurements.filter((row: { id: number }) => !deathnoteMeasurementIds.includes(row.id)))
    .toEqual(baseline.measurements.filter((row: { id: number }) => !deathnoteMeasurementIds.includes(row.id)));
   for (const id of deathnoteMeasurementIds) {
    const saved = baseline.measurements.find((row: { id: number }) => row.id === id);
    const dependent = omitted.measurements.find((row: { id: number }) => row.id === id);
    expect(dependent).toEqual({
     ...saved, raw: null, normalized: null, multiplier: null,
     effective: saved.level === 0 ? 0 : null,
    });
   }
   for (const key of ['schematics', 'pool', 'majik', 'pocket', 'characters', 'links', 'gods', 'gaming', 'votes', 'equinox', 'growth']) {
    expect(omitted[key]).toEqual(baseline[key]);
   }
  } finally {
   hole.parse(originalInputs!);
   prepare();
  }
  expect(preparedSnapshot(run.data)).toBe(before);
  expect(hole.gambit.getGambitTotalScore()).toBe(gambitScore);
  expect(hole.gambit.bonuses.map(bonus => ({
   unlocked: bonus.unlocked, value: hole.gambit.getBonus(bonus.index),
  }))).toEqual(gambitBonuses);
  expect(JSON.stringify({
   orionBonus: orion.gambitBonus8, orionRate: orion.getFeatherRate(),
   poppyBonus: poppy.gambitBonus8, offline: research.offlineGains,
  })).toBe(downstream);
 });
});

describe('Isolated Gambit availability contracts, not matched-game comparisons', () => {
 it('keeps an unpurchased Gambit Measurement at zero without publishing a missing purchased benefit', () => {
  const { Hole }: typeof HoleModule = require('../../../data/domain/world-5/hole/hole');
  const measurement = new Hole('hole').measurements[13];
  measurement.saveAvailable = true;
  expect(measurement.rawStatistic).toBeNull();
  expect(measurement.effectiveBenefit).toBe(0);
  measurement.level = 1;
  expect(measurement.effectiveBenefit).toBeNull();
 });

 it('keeps zero records, invalid rewards, Tutorial rewards and zero base feather production available', () => {
  const { Gambit }: typeof GambitModule = require('../../../data/domain/world-5/hole/gambit');
  const { Player }: typeof PlayerModule = require('../../../data/domain/player');
  const { Orion }: typeof OrionModule = require('../../../data/domain/world-1/orion');
  const gambit = new Gambit();
  gambit.gambitPointsMulti = null;
  gambit.updateUnlockedBonuses();
  expect(gambit.getGambitTotalScore()).toBe(0);
  expect(gambit.getGambitTotalTime()).toBe(0);
  gambit.bonuses.forEach(bonus => {
   expect(bonus.unlocked).toBe(false);
   expect(gambit.getBonus(bonus.index)).toBe(0);
  });
  gambit.challenges[0].maxTime = 1;
  gambit.updateUnlockedBonuses();
  expect(gambit.getGambitTotalScore()).toBeNull();
  expect(gambit.getBonus(8)).toBeNull();
  expect(gambit.getBonus(-1)).toBe(0);
  const player = new Player(0, 'Tutorial contract');
  player.currentMap = 'Tutorial';
  expect(gambit.getBonus(8, player)).toBe(0);
  const orion = new Orion('orion').init([]);
  orion.gambitBonus8 = null;
  expect(orion.getFeatherRate()).toBe(0);
 });
});
