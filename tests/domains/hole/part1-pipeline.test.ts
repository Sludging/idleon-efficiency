import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Player } from '../../../data/domain/player';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import type { HoleContributor } from '../../../data/domain/world-5/hole/villager';
import type { Tome } from '../../../data/domain/world-4/tome';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { Cloudsave } from '../../../data/domain/cloudsave';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import type { updateIdleonData } from '../../../data/domain/idleonData';
import type * as SaveLoader from '../../utils/cloudsave-loader';
import type * as AccountPipeline from '../../../data/domain/idleonData';
import type * as AccountItems from '../../../data/domain/items';
import type * as HoleModule from '../../../data/domain/world-5/hole/hole';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import type { CapturedHoleInputs } from './part1-test-helpers';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';
import { assertPairedContext, captured, coreNumber } from './part1-test-helpers';

interface AccountRun {
 data: Map<string, any>;
 save: Cloudsave;
 process: typeof updateIdleonData;
 present: typeof HoleModule.updateHolePresentation;
 holeParseData: Map<string, any>;
 sneakingParseData: Map<string, any>;
}

// Domain registrations hold instances. Reload modules to test a genuinely fresh owner.
function freshAccount(): AccountRun {
 let run: AccountRun;
 jest.isolateModules(() => {
  const loader: typeof SaveLoader = require('../../utils/cloudsave-loader');
  const pipeline: typeof AccountPipeline = require('../../../data/domain/idleonData');
  const items: typeof AccountItems = require('../../../data/domain/items');
  const save = loader.loadTestSave('latest');
  const account = pipeline.initAccountDataKeys(items.initAllItems());
  const hole = account.get('hole') as Hole;
  const holeModule: typeof HoleModule = require('../../../data/domain/world-5/hole/hole');
  const sneaking = account.get('sneaking') as Sneaking;
  const holeParse = jest.spyOn(hole, 'parse');
  const sneakingParse = jest.spyOn(sneaking, 'parse');
  try {
   const data = pipeline.updateIdleonData(account, save, save.get('playerNames'),
    normalizeCompanionStates(save.get('companions')), save.get('servervars'), true).getData();
   expect(hole.villagers.every(villager => villager.nextUnlock !== null)).toBe(true);
   expect(hole.anotherTry.access).not.toBeNull();
   expect(hole.anotherTry.availableWishes).toBe(hole.wishesAvailable);
   expect(hole.anotherTry.affordable).not.toBeNull();
   expect(hole.anotherTry.resets.map(reset => reset.category))
    .toEqual(['Opals', 'Majik', 'Jar enchantments', 'Summoning doublers']);
   loader.validateGameDataStructure(data);
   run = { data, save, process: pipeline.updateIdleonData, present: preparedData => {
    const preparedHole = preparedData.get('hole') as Hole;
    preparedHole.prepareSharedUpgradeEffects();
    holeModule.updateHole(preparedData);
    holeModule.updateHolePresentation(preparedData);
   }, holeParseData: new Map(holeParse.mock.calls[0][0]), sneakingParseData: new Map(sneakingParse.mock.calls[0][0]) };
  } finally {
   holeParse.mockRestore();
   sneakingParse.mockRestore();
  }
 });
 return run!;
}

function preparedSnapshot(hole: Hole): string {
 return JSON.stringify({
  villagers: hole.villagers.map(villager => ({ level: villager.level, exp: villager.currentExp, opals: villager.opals,
   purchased: villager.purchasedExpUpgrade, nextUnlock: villager.nextUnlock, rates: villager.characterRates })),
  studies: hole.studies.map(study => ({ level: study.level, progress: study.progress, access: study.access,
   participation: study.participation, rate: study.progressPerHour, contributors: study.contributors, effects: study.getEffects() })),
  cavernSources: hole.cavernOpalSources, ledger: hole.opalLedger, lanterns: hole.lanterns,
  studyContributors: hole.studyContributors, neighbors: hole.eligibleStudyNeighbors,
  allocations: hole.allocationEffects, reset: hole.anotherTry,
 });
}

describe('Hole part 1 fresh and repeated normal account processing', () => {
 let results: ExtractionResults;
 let inputs: CapturedHoleInputs;

 beforeAll(() => {
  results = loadExtractionResults('hole-part1-pipeline-data.json');
  validateExtractionHealth(results);
  inputs = captured<CapturedHoleInputs>(results, 'paired_hole_inputs');
 });

 function assertNormalAccount(data: Map<string, any>): void {
  assertPairedContext(results, data);
  const hole = data.get('hole') as Hole;
  const players = data.get('players') as Player[];
  const statues = data.get('statues') as PlayerStatues[];
  expect(players).toHaveLength(11);
  expect(hole.villagers).toHaveLength(5);
  expect(hole.villagers.map(villager => villager.level)).toEqual(inputs.levels);
  expect(hole.villagers.map(villager => villager.currentExp)).toEqual(inputs.exp);
  expect(hole.villagers.map(villager => villager.opals)).toEqual(inputs.investments.slice(0, 5));
  expect(hole.villagers.map(villager => villager.purchasedExpUpgrade)).toEqual(inputs.purchased);
  expect(hole.studies.map(study => study.level)).toEqual(inputs.studyLevels);
  expect(hole.studies.map(study => study.progress)).toEqual(inputs.studyProgress);
  expect(hole.savedStudyTarget).toBe(inputs.target);
  hole.villagers.forEach(villager => {
   expect(villager.characterRates).toHaveLength(players.length);
   expect(new Set(villager.characterRates.map(rate => rate.playerId)).size).toBe(players.length);
   expect(villager.characterRates.map(rate => rate.playerId)).toEqual(players.map(player => player.playerID));
   expect(villager.characterRates.map(rate => rate.playerName)).toEqual(players.map(player => player.playerName));
   expect(villager).not.toHaveProperty('expPerHour');
   expect(villager).not.toHaveProperty('contributors');
   villager.characterRates.forEach(rate => {
    const player = players.find(player => player.playerID === rate.playerId)!;
    const statueOwner = statues.find(owner => owner.playerID === player.playerID)!;
    const statue = statueOwner.statues.find(statue => statue.index === 28)!;
    expect(rate.unavailableReason).toBeNull();
    expect(rate.expPerHour).not.toBeNull();
    expect(Number.isFinite(rate.expPerHour)).toBe(true);
    expect(rate.inputs).not.toBeNull();
    // This checks identity binding, not parity for uncaptured character contexts.
    expect(rate.statueBonus).toBe(statue.getBonus(player));
    expect(rate.statueFactor).toBe(1 + statue.getBonus(player) / 100);
    const contributorOwners = rate.contributors.filter(contributor => contributor.owner.startsWith('statues:'));
    expect(contributorOwners).toHaveLength(1);
    expect(contributorOwners[0].owner).toBe(`statues:${player.playerID}:28`);
    expect(contributorOwners[0].value).toBe(rate.statueBonus);
    expect(rate.contributors.every(contributor => contributor.value !== null)).toBe(true);
    expect(new Set(rate.contributors.map(contributor =>
     `${contributor.owner}:${contributor.combination}:${contributor.unit}`)).size)
     .toBe(rate.contributors.length);
   });
   const target = villager.characterRates.find(rate => rate.playerId === TARGET_PLAYER_INDEX)!;
   coreNumber(target.expPerHour, results, `growth_${villager.index}`, `Normal pipeline ${villager.name} captured-context growth`);
  });
  coreNumber(hole.getSchematicBonus(14, 0), results, 'pipeline_schematic_14', 'Early Study sediment schematic consumer');
  coreNumber(hole.gambit.gambitPointsMulti, results, 'pipeline_gambit_multiplier', 'Study Gambit multiplier consumer');
  coreNumber(hole.gambit.getGambitTotalScore(), results, 'pipeline_gambit_points', 'Study Gambit points consumer');
  const tome = data.get('tome') as Tome;
  const line = tome.lines.find(line => line.index === 93)!;
  const cavernTotal = inputs.cavernOpals.reduce((sum, opals) => sum + opals, 0);
  expect(hole.cavernEarnedOpals).toBe(cavernTotal);
  expect(hole.opalLedger.earned).toBeGreaterThan(cavernTotal);
  players.forEach(player => {
   expect(line.getPlayerCurrentValueDisplay(player.playerID)).toBe(cavernTotal.toString());
   coreNumber(line.getPlayerScore(player.playerID), results, 'pipeline_tome_93', 'Tome cavern-only Opal score');
  });
 }

 it('prepares all 55 named rates and consumers on independent fresh normal imports', () => {
  const first = freshAccount();
  assertNormalAccount(first.data);
  const firstHole = first.data.get('hole') as Hole;
  const firstSnapshot = preparedSnapshot(firstHole);
  const second = freshAccount();
  assertNormalAccount(second.data);
  const secondHole = second.data.get('hole') as Hole;
  expect(preparedSnapshot(secondHole)).toBe(firstSnapshot);
 });

 it('keeps actual progression and modifiers unchanged on repeated imports', () => {
  const run = freshAccount();
  assertNormalAccount(run.data);
  let hole = run.data.get('hole') as Hole;
  const snapshot = preparedSnapshot(hole);
  for (let pass = 0; pass < 2; pass++) {
   run.data = run.process(run.data, run.save, run.save.get('playerNames'),
    normalizeCompanionStates(run.save.get('companions')), run.save.get('servervars'), true).getData();
   hole = run.data.get('hole') as Hole;
   assertNormalAccount(run.data);
   expect(preparedSnapshot(hole)).toBe(snapshot);
  }
 });
});

describe('Hole part 1 H4–H6 parse availability contracts, not live-game parity', () => {
 it('H4 marks Superbit ownership unavailable when its saved input is absent and restores availability', () => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const snapshot = preparedSnapshot(hole);
  const missingHole = new Map(run.holeParseData);
  const gaming = [...run.holeParseData.get('Gaming')];
  delete gaming[12];
  missingHole.set('Gaming', gaming);
  try {
   hole.parse(missingHole);
   expect(hole.superbitOwnershipSaveAvailable).toBe(false);
  } finally {
   hole.parse(run.holeParseData);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
  }
  expect(hole.superbitOwnershipSaveAvailable).toBe(true);
  expect(preparedSnapshot(hole)).toBe(snapshot);
 });

 it('H5 marks Cards unavailable when their saved input is absent and restores availability', () => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const snapshot = preparedSnapshot(hole);
  const missingHole = new Map(run.holeParseData);
  const rawData = { ...run.holeParseData.get('rawData') };
  delete rawData.Cards0;
  missingHole.set('rawData', rawData);
  try {
   hole.parse(missingHole);
   expect(hole.sourceSaveAvailable.cards).toBe(false);
   expect(hole.sharedGrowthUnavailableReason).toBe('Saved inputs are missing: Cards.');
  } finally {
   hole.parse(run.holeParseData);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
  }
  expect(hole.sourceSaveAvailable.cards).toBe(true);
  expect(hole.sharedGrowthUnavailableReason).toBeNull();
  expect(preparedSnapshot(hole)).toBe(snapshot);
 });

 it('H6 marks Village Majik unavailable when its saved input is absent and restores availability', () => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const snapshot = preparedSnapshot(hole);
  const missingHole = new Map(run.holeParseData);
  const holes = [...run.holeParseData.get('Holes')];
  delete holes[5];
  missingHole.set('Holes', holes);
  try {
   hole.parse(missingHole);
   expect(hole.sourceSaveAvailable.villageMajik).toBe(false);
   expect(hole.sharedGrowthUnavailableReason).toBe('Saved inputs are missing: Hole Majik.');
  } finally {
   hole.parse(run.holeParseData);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
  }
  expect(hole.sourceSaveAvailable.villageMajik).toBe(true);
  expect(hole.sharedGrowthUnavailableReason).toBeNull();
  expect(preparedSnapshot(hole)).toBe(snapshot);
 });
});

describe('Hole part 1 Sneaking input contracts, not live-game parity', () => {
 it('uses zero Candy Cache contribution when the initialized charm is explicitly unowned', () => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const sneaking = run.data.get('sneaking') as Sneaking;
  const candyCache = sneaking.pristineCharms.find(charm => charm.data.itemId === 21)!;
  const ownership = candyCache.unlocked;
  const snapshot = preparedSnapshot(hole);
  try {
   candyCache.unlocked = false;
   run.present(run.data);
   expect(hole.growthInputs!.pristinePercent).toBe(0);
   hole.villagers.forEach(villager => {
    villager.characterRates.forEach(rate => {
     expect(rate.unavailableReason).toBeNull();
     expect(rate.expPerHour).not.toBeNull();
     const contributor = rate.contributors.find(contributor => contributor.owner === 'sneaking:21')!;
     expect(contributor.value).toBe(0);
     expect(contributor.unavailableReason).toBeNull();
    });
   });
  } finally {
   candyCache.unlocked = ownership;
   run.present(run.data);
  }
  expect(preparedSnapshot(hole)).toBe(snapshot);
 });

 it('resets prior Candy Cache ownership at the absent Ninja parse boundary and keeps Hole rates unavailable', () => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const sneaking = run.data.get('sneaking') as Sneaking;
  const candyCache = sneaking.pristineCharms.find(charm => charm.data.itemId === 21)!;
  const ownership = sneaking.pristineCharms.map(charm => charm.unlocked);
  const snapshot = preparedSnapshot(hole);
  const baseline = JSON.parse(snapshot);
  const growthInputs = hole.growthInputs;
  // Omit one raw input from captured real parse maps. Keep the real account and other parsed inputs.
  const missingSneaking = new Map(run.sneakingParseData);
  missingSneaking.delete('Ninja');
  const missingHole = new Map(run.holeParseData);
  const rawData = { ...run.holeParseData.get('rawData') };
  delete rawData.Ninja;
  missingHole.set('rawData', rawData);
  try {
   candyCache.unlocked = true;
   sneaking.parse(missingSneaking);
   expect(sneaking.pristineCharms.every(charm => !charm.unlocked)).toBe(true);
   hole.parse(missingHole);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
   expect(hole.sharedGrowthUnavailableReason).toBe('Saved inputs are missing: Sneaking.');
   expect(hole.growthInputs).toBeNull();
   expect(hole.villagers).toHaveLength(5);
   hole.villagers.forEach((villager, villagerIndex) => {
    expect(villager.characterRates).toHaveLength(11);
    const baselineRates = baseline.villagers[villagerIndex].rates;
    expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
     .toEqual(expect.arrayContaining(baselineRates.map((rate: { playerId: number; playerName: string }) =>
      [rate.playerId, rate.playerName])));
    villager.characterRates.forEach(rate => {
     expect(rate.expPerHour).toBeNull();
     expect(rate.inputs).toBeNull();
     expect(rate.unavailableReason).toBe('Saved inputs are missing: Sneaking.');
     for (const owner of ['sneaking:21', 'summoning:21']) {
      expect(rate.contributors.find(contributor => contributor.owner === owner)).toMatchObject({
       value: null, unavailableReason: 'Saved Sneaking inputs are missing.',
      });
     }
     const baselineRate = baselineRates.find((saved: { playerId: number }) => saved.playerId === rate.playerId)!;
     const independent = rate.contributors.filter(contributor =>
      !['sneaking:21', 'summoning:21'].includes(contributor.owner));
     const savedIndependent = baselineRate.contributors.filter((contributor: HoleContributor) =>
      !['sneaking:21', 'summoning:21'].includes(contributor.owner));
     expect(independent).toHaveLength(savedIndependent.length);
     expect(independent).toEqual(expect.arrayContaining(savedIndependent));
     expect(rate.statueBonus).toBe(baselineRate.statueBonus);
     expect(rate.statueFactor).toBe(baselineRate.statueFactor);
    });
   });
   const omitted = JSON.parse(preparedSnapshot(hole));
   expect(omitted.villagers.map(({ rates, ...progression }: { rates: unknown }) => progression))
    .toEqual(baseline.villagers.map(({ rates, ...progression }: { rates: unknown }) => progression));
   for (const key of ['studies', 'studyContributors', 'neighbors', 'allocations', 'ledger', 'lanterns', 'cavernSources', 'reset']) {
    expect(omitted[key]).toEqual(baseline[key]);
   }
  } finally {
   sneaking.pristineCharms.forEach((charm, index) => {
    charm.unlocked = ownership[index];
   });
   hole.parse(run.holeParseData);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
  }
  expect(preparedSnapshot(hole)).toBe(snapshot);
  expect(hole.growthInputs).toEqual(growthInputs);
 });
});

describe('Hole part 1 H10–H11 and H15–H16 narrow omissions of captured real parse inputs, not game parity or synthetic game branches', () => {
 it.each(['Hole Majik array', 'Monumental Vibes entry'])(
  'H10 keeps independent public data when the captured %s is missing and restores growth',
  missingInput => {
   const run = freshAccount();
   const hole = run.data.get('hole') as Hole;
   const snapshot = preparedSnapshot(hole);
   const baseline = JSON.parse(snapshot);
   const villagers = hole.villagers.map(villager => ({
    level: villager.level, exp: villager.currentExp, opals: villager.opals,
    purchased: villager.purchasedExpUpgrade, rescued: villager.rescued,
    requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
    nextUnlock: JSON.parse(JSON.stringify(villager.nextUnlock)),
   }));
   const studies = hole.studies.map(study => ({
    requirement: study.getRequirement(), claimReady: study.claimReady,
   }));
   const missingHole = new Map(run.holeParseData);
   const holes = [...run.holeParseData.get('Holes')];
   if (missingInput === 'Hole Majik array') {
    delete holes[4];
   } else {
    holes[4] = [...holes[4]];
    delete holes[4][0];
   }
   missingHole.set('Holes', holes);
   try {
    hole.parse(missingHole);
    hole.prepareSharedStudyEffects();
    run.present(run.data);
    expect(hole.sourceSaveAvailable.monumentalVibes).toBe(false);
    expect(hole.sharedGrowthUnavailableReason).toBe('Saved inputs are missing: Monumental Vibes.');
    expect(hole.growthInputs).toBeNull();
    expect(hole.villagers).toHaveLength(5);
    hole.villagers.forEach(villager => {
     expect(villager.characterRates).toHaveLength(11);
     const savedRates = baseline.villagers[villager.index].rates;
     expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
      .toEqual(expect.arrayContaining(savedRates.map((rate: { playerId: number; playerName: string }) =>
       [rate.playerId, rate.playerName])));
     villager.characterRates.forEach(rate => {
      expect(rate.expPerHour).toBeNull();
      expect(rate.inputs).toBeNull();
      expect(rate.unavailableReason).toBe('Saved inputs are missing: Monumental Vibes.');
      ['cavern:3', 'cavern:9', 'cavern:12'].forEach(owner => {
       const contributor = rate.contributors.find(contributor => contributor.owner === owner)!;
       expect(contributor.value).toBeNull();
       expect(contributor.unavailableReason).toBe('Saved Monumental Vibes input is missing.');
      });
      const savedRate = savedRates.find((saved: { playerId: number }) => saved.playerId === rate.playerId)!;
      const independent = rate.contributors.filter(row => !['cavern:3', 'cavern:9', 'cavern:12'].includes(row.owner));
      const savedIndependent = savedRate.contributors.filter((row: HoleContributor) =>
       !['cavern:3', 'cavern:9', 'cavern:12'].includes(row.owner));
      expect(independent).toHaveLength(savedIndependent.length);
      expect(independent).toEqual(expect.arrayContaining(savedIndependent));
      expect(rate.statueBonus).toBe(savedRate.statueBonus);
      expect(rate.statueFactor).toBe(savedRate.statueFactor);
     });
    });
    expect(hole.villagers.map(villager => ({
     level: villager.level, exp: villager.currentExp, opals: villager.opals,
     purchased: villager.purchasedExpUpgrade, rescued: villager.rescued,
     requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
     nextUnlock: villager.nextUnlock,
    }))).toEqual(villagers);
    expect(hole.studies.map(study => ({
     requirement: study.getRequirement(), claimReady: study.claimReady,
    }))).toEqual(studies);
    const omitted = JSON.parse(preparedSnapshot(hole));
    expect(omitted.studies).toEqual(baseline.studies);
    expect(omitted.studyContributors).toEqual(baseline.studyContributors);
    expect(omitted.neighbors).toEqual(baseline.neighbors);
    expect(omitted.allocations).toEqual(baseline.allocations);
    expect(omitted.ledger).toEqual(baseline.ledger);
    expect(omitted.lanterns).toEqual(baseline.lanterns);
   } finally {
    hole.parse(run.holeParseData);
    hole.prepareSharedStudyEffects();
    run.present(run.data);
   }
   expect(preparedSnapshot(hole)).toBe(snapshot);
  },
 );

 it.each(['parsed Spelunk', 'Collectible Legend Talent entry', 'truncated Legend Talent row'])(
  'H11/H15 keeps independent public data when the captured %s is missing and restores Study and growth rates',
  missingInput => {
   const run = freshAccount();
   const hole = run.data.get('hole') as Hole;
   const snapshot = preparedSnapshot(hole);
   const baseline = JSON.parse(snapshot);
   const growthInputs = hole.growthInputs;
   const villagers = hole.villagers.map(villager => ({
    level: villager.level, exp: villager.currentExp, opals: villager.opals,
    purchased: villager.purchasedExpUpgrade, rescued: villager.rescued,
    requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
    nextUnlock: JSON.parse(JSON.stringify(villager.nextUnlock)),
   }));
   const studies = hole.studies.map(study => ({
    index: study.index, level: study.level, progress: study.progress, access: study.access,
    requirement: study.getRequirement(), claimReady: study.claimReady, effects: study.getEffects(),
   }));
   const participation = hole.studies.map(study => ({ index: study.index, participation: study.participation }));
   const savedTarget = hole.savedStudyTarget;
   const missingHole = new Map(run.holeParseData);
   if (missingInput === 'parsed Spelunk') {
    missingHole.delete('Spelunk');
    const rawData = { ...run.holeParseData.get('rawData') };
    delete rawData.Spelunk;
    missingHole.set('rawData', rawData);
   } else {
    const spelunk = [...run.holeParseData.get('Spelunk')];
    if (missingInput === 'truncated Legend Talent row') {
     // Keep the talent row present, but end it before the required collectible talent.
     spelunk[18] = spelunk[18].slice(0, 29);
    } else {
     spelunk[18] = [...spelunk[18]];
     delete spelunk[18][29];
    }
    missingHole.set('Spelunk', spelunk);
   }
   try {
    hole.parse(missingHole);
    hole.prepareSharedStudyEffects();
    run.present(run.data);
    expect(hole.sourceSaveAvailable.collectibleLegendTalent).toBe(false);
    const growthReason = missingInput === 'parsed Spelunk'
     ? 'Saved inputs are missing: Legend Talents and Tome, Collectible Legend Talent.'
     : 'Saved inputs are missing: Collectible Legend Talent.';
    expect(hole.sharedGrowthUnavailableReason).toBe(growthReason);
    expect(hole.growthInputs).toBeNull();
    expect(hole.villagers).toHaveLength(5);
    hole.villagers.forEach((villager, villagerIndex) => {
     const baselineRates = baseline.villagers[villagerIndex].rates;
     expect(villager.characterRates).toHaveLength(11);
     expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
      .toEqual(expect.arrayContaining(baselineRates.map((rate: { playerId: number; playerName: string }) =>
       [rate.playerId, rate.playerName])));
     villager.characterRates.forEach(rate => {
      expect(rate.expPerHour).toBeNull();
      expect(rate.inputs).toBeNull();
      expect(rate.unavailableReason).toBe(growthReason);
      const contributor = rate.contributors.find(contributor => contributor.owner === 'cavern:10')!;
      expect(contributor.value).toBeNull();
      expect(contributor.unavailableReason).toBe('Saved collectible Legend Talent input is missing.');
      expect(contributor.sourceIds).toHaveLength(6);
      expect(contributor.sourceIds).toEqual(expect.arrayContaining(
       [4, 10, 12, 22, 29, 35].map(index => `jar-collectible:${index}`)));
      const baselineRate = baselineRates.find((saved: { playerId: number }) => saved.playerId === rate.playerId)!;
      const dependentOwners = missingInput === 'parsed Spelunk'
       ? ['cavern:10', 'legendTalents:12', 'tome:epilogue:1', 'measurement:0'] : ['cavern:10'];
      if (missingInput === 'parsed Spelunk') {
       for (const owner of ['legendTalents:12', 'tome:epilogue:1']) {
        expect(rate.contributors.find(row => row.owner === owner)).toMatchObject({
         value: null, unavailableReason: 'Saved Legend Talent and Tome inputs are missing.',
        });
       }
       expect(rate.contributors.find(row => row.owner === 'measurement:0')).toMatchObject({
        value: null, unavailableReason: 'Saved Tome Measurement inputs are missing.',
       });
      }
      const independent = rate.contributors.filter(row => !dependentOwners.includes(row.owner));
      const savedIndependent = baselineRate.contributors.filter((row: HoleContributor) =>
       !dependentOwners.includes(row.owner));
      expect(independent).toHaveLength(savedIndependent.length);
      expect(independent).toEqual(expect.arrayContaining(savedIndependent));
      expect(rate.statueBonus).toBe(baselineRate.statueBonus);
      expect(rate.statueFactor).toBe(baselineRate.statueFactor);
     });
    });
    expect(hole.studyInputsUnavailableReason).toBe('Saved Study inputs are missing: Collectible Legend Talent.');
    expect(hole.studyRate).toBeNull();
    const collectible = hole.studyContributors.find(contributor => contributor.owner === 'jar-collectible:16')!;
    expect(collectible.value).toBeNull();
    expect(collectible.unavailableReason).toBe('Saved collectible Legend Talent input is missing.');
    const independentStudy = hole.studyContributors.filter(contributor => contributor.owner !== 'jar-collectible:16');
    const baselineIndependentStudy = baseline.studyContributors.filter((contributor: { owner: string }) =>
     contributor.owner !== 'jar-collectible:16');
    expect(independentStudy).toHaveLength(baselineIndependentStudy.length);
    expect(independentStudy).toEqual(expect.arrayContaining(baselineIndependentStudy));
    hole.studies.forEach(study => {
     const savedParticipation = participation.find(row => row.index === study.index)!.participation;
     expect(study.participation).toBe(savedParticipation);
     if (savedParticipation === 'target' || savedParticipation === 'neighbor') {
      expect(study.progressPerHour).toBeNull();
      expect(study.rateUnavailableReason).toBe('Saved Study inputs are missing: Collectible Legend Talent.');
      const contributor = study.contributors.find(contributor => contributor.owner === 'jar-collectible:16')!;
      expect(contributor.value).toBeNull();
      expect(contributor.unavailableReason).toBe('Saved collectible Legend Talent input is missing.');
      const independent = study.contributors.filter(row => row.owner !== 'jar-collectible:16');
      expect(independent).toHaveLength(baselineIndependentStudy.length);
      expect(independent).toEqual(expect.arrayContaining(baselineIndependentStudy));
     } else if (savedParticipation === 'inactive') {
      expect(study.progressPerHour).toBe(0);
      expect(study.rateUnavailableReason).toBeNull();
     }
    });
    expect(hole.savedStudyTarget).toBe(savedTarget);
    expect(hole.villagers.map(villager => ({
     level: villager.level, exp: villager.currentExp, opals: villager.opals,
     purchased: villager.purchasedExpUpgrade, rescued: villager.rescued,
     requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
     nextUnlock: villager.nextUnlock,
    }))).toEqual(villagers);
    expect(hole.studies.map(study => ({
     index: study.index, level: study.level, progress: study.progress, access: study.access,
     requirement: study.getRequirement(), claimReady: study.claimReady, effects: study.getEffects(),
    }))).toEqual(studies);
    const omitted = JSON.parse(preparedSnapshot(hole));
    expect(omitted.neighbors).toEqual(baseline.neighbors);
    expect(omitted.allocations).toEqual(baseline.allocations);
    expect(omitted.ledger).toEqual(baseline.ledger);
    expect(omitted.lanterns).toEqual(baseline.lanterns);
    expect(omitted.cavernSources).toEqual(baseline.cavernSources);
    expect(omitted.reset).toEqual(baseline.reset);
   } finally {
    hole.parse(run.holeParseData);
    hole.prepareSharedStudyEffects();
    run.present(run.data);
   }
   expect(preparedSnapshot(hole)).toBe(snapshot);
   expect(hole.growthInputs).toEqual(growthInputs);
  },
 );

 it('H16 marks missing saved Compass growth unavailable without changing independent public results and restores the baseline', () => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const snapshot = preparedSnapshot(hole);
  const baseline = JSON.parse(snapshot);
  const growthInputs = hole.growthInputs;
  const villagers = hole.villagers.map(villager => ({
   level: villager.level, exp: villager.currentExp, opals: villager.opals,
   purchased: villager.purchasedExpUpgrade, rescued: villager.rescued,
   requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
   nextUnlock: JSON.parse(JSON.stringify(villager.nextUnlock)),
  }));
  const studies = hole.studies.map(study => ({
   requirement: study.getRequirement(), claimReady: study.claimReady,
  }));
  const studyRate = hole.studyRate;
  const savedTarget = hole.savedStudyTarget;
  const missingHole = new Map(run.holeParseData);
  const rawData = { ...run.holeParseData.get('rawData') };
  delete rawData.Compass;
  missingHole.set('rawData', rawData);
  try {
   hole.parse(missingHole);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
   expect(hole.sourceSaveAvailable.compass).toBe(false);
   expect(hole.sharedGrowthUnavailableReason).toBe('Saved inputs are missing: Compass.');
   expect(hole.growthInputs).toBeNull();
   expect(hole.villagers).toHaveLength(5);
   hole.villagers.forEach((villager, villagerIndex) => {
    const baselineRates = baseline.villagers[villagerIndex].rates;
    expect(villager.characterRates).toHaveLength(11);
    expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
     .toEqual(expect.arrayContaining(baselineRates.map((rate: { playerId: number; playerName: string }) =>
      [rate.playerId, rate.playerName])));
    villager.characterRates.forEach(rate => {
     expect(rate.expPerHour).toBeNull();
     expect(rate.inputs).toBeNull();
     expect(rate.unavailableReason).toBe('Saved inputs are missing: Compass.');
     const compass = rate.contributors.find(contributor => contributor.owner === 'compass:59')!;
     expect(compass.value).toBeNull();
     expect(compass.unavailableReason).toBe('Saved Compass inputs are missing.');
     const baselineRate = baselineRates.find((saved: { playerId: number }) => saved.playerId === rate.playerId)!;
     const independent = rate.contributors.filter(contributor => contributor.owner !== 'compass:59');
     const savedIndependent = baselineRate.contributors.filter((contributor: { owner: string }) =>
      contributor.owner !== 'compass:59');
     expect(independent).toHaveLength(savedIndependent.length);
     expect(independent).toEqual(expect.arrayContaining(savedIndependent));
     expect(rate.statueBonus).toBe(baselineRate.statueBonus);
     expect(rate.statueFactor).toBe(baselineRate.statueFactor);
    });
   });
   expect(hole.villagers.map(villager => ({
    level: villager.level, exp: villager.currentExp, opals: villager.opals,
    purchased: villager.purchasedExpUpgrade, rescued: villager.rescued,
    requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
    nextUnlock: villager.nextUnlock,
   }))).toEqual(villagers);
   expect(hole.studies.map(study => ({
    requirement: study.getRequirement(), claimReady: study.claimReady,
   }))).toEqual(studies);
   expect(hole.studyRate).toBe(studyRate);
   expect(hole.savedStudyTarget).toBe(savedTarget);
   const omitted = JSON.parse(preparedSnapshot(hole));
   expect(omitted.studies).toEqual(baseline.studies);
   expect(omitted.studyContributors).toEqual(baseline.studyContributors);
   expect(omitted.neighbors).toEqual(baseline.neighbors);
   expect(omitted.allocations).toEqual(baseline.allocations);
   expect(omitted.lanterns).toEqual(baseline.lanterns);
   expect(omitted.cavernSources).toEqual(baseline.cavernSources);
   expect(omitted.reset).toEqual(baseline.reset);
   const compassSource = hole.opalLedger.sources.find(source => source.id === 'compass')!;
   expect(compassSource.opals).toBeNull();
   expect(compassSource.unavailableReason).toBe('Saved Compass inputs are missing.');
   const independentSources = hole.opalLedger.sources.filter(source => source.id !== 'compass');
   const baselineSources = baseline.ledger.sources.filter((source: { id: string }) => source.id !== 'compass');
   expect(independentSources).toHaveLength(baselineSources.length);
   expect(independentSources).toEqual(expect.arrayContaining(baselineSources));
   expect(hole.opalLedger.cavernEarned).toBe(baseline.ledger.cavernEarned);
   expect(hole.opalLedger.invested).toBe(baseline.ledger.invested);
   expect(hole.opalLedger.emperorSchematicFloorAdjustment).toBe(baseline.ledger.emperorSchematicFloorAdjustment);
   expect(hole.opalLedger.externalEarned).toBeNull();
   expect(hole.opalLedger.externalRoundingAdjustment).toBeNull();
   expect(hole.opalLedger.earned).toBeNull();
   expect(hole.opalLedger.uninvested).toBeNull();
   expect(hole.opalLedger.unavailableReason).toBe('Saved Compass inputs are missing.');
  } finally {
   hole.parse(run.holeParseData);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
  }
  expect(preparedSnapshot(hole)).toBe(snapshot);
  expect(hole.growthInputs).toEqual(growthInputs);
 });
});

describe('Hole part 1 H19 contributor contracts for required captured inputs, not additional game branches', () => {
 const omissions: {
  name: string; rawKey?: string; holeIndex?: number; flag: string;
  growthInput?: string; studyInput?: string; reason: string;
  growthOwners: string[]; studyOwners: string[]; ledgerId?: string; cosmoRole?: boolean;
 }[] = [
  { name: 'Summoning', rawKey: 'Summon', flag: 'summoning', growthInput: 'Summoning',
   reason: 'Saved Summoning inputs are missing.', growthOwners: ['summoning:21'], studyOwners: [] },
  { name: 'Farming', rawKey: 'FarmUpg', flag: 'farming', growthInput: 'Farming',
   reason: 'Saved Farming inputs are missing.', growthOwners: ['farming:51'], studyOwners: [] },
  { name: 'Arcade', rawKey: 'ArcadeUpg', flag: 'arcade', growthInput: 'Arcade',
   reason: 'Saved Arcade inputs are missing.', growthOwners: ['arcade:38'], studyOwners: [] },
  { name: 'Grimoire and dependent Tome epilogue', rawKey: 'Grimoire', flag: 'grimoire', growthInput: 'Grimoire',
   reason: 'Saved Grimoire inputs are missing.', growthOwners: ['grimoire:29', 'tome:epilogue:1'],
   studyOwners: [], ledgerId: 'grimoire' },
  { name: 'Tesseract', rawKey: 'Arcane', flag: 'tesseract', growthInput: 'Tesseract',
   reason: 'Saved Tesseract inputs are missing.', growthOwners: ['tesseract:32'], studyOwners: [], ledgerId: 'arcane' },
  { name: 'Upgrade Vault', rawKey: 'UpgVault', flag: 'vault', growthInput: 'Vault',
   reason: 'Saved Vault inputs are missing.', growthOwners: ['upgradeVault:73'], studyOwners: [] },
  { name: 'Cards', rawKey: 'Cards0', flag: 'cards', growthInput: 'Cards',
   reason: 'Saved card inputs are missing.', growthOwners: ['cards:caveB'], studyOwners: [] },
  { name: 'Gem Shop purchases and dependent Summoning', rawKey: 'GemItemsPurchased', flag: 'gems',
   growthInput: 'Gem Shop purchases', reason: 'Saved Gem Shop purchase inputs are missing.',
   growthOwners: ['summoning:21'], studyOwners: [], ledgerId: 'gem-shop' },
  { name: 'Emperor and dependent Summoning', rawKey: 'OptLacc', flag: 'emperor', growthInput: 'Emperor',
   reason: 'Saved Emperor inputs are missing.', growthOwners: ['summoning:21'], studyOwners: [], ledgerId: 'emperor' },
  { name: 'Village Majik and dependent Measurements', holeIndex: 5, flag: 'villageMajik',
   growthInput: 'Hole Majik', studyInput: 'Hole Majik', reason: 'Saved Village Majik inputs are missing.',
   growthOwners: ['majik:9', 'majik:10', 'majik:11', 'majik:14', 'measurement:7', 'measurement:0'],
   studyOwners: ['majik:13'] },
  { name: 'Hole schematics and dependent Contented Creator', holeIndex: 13, flag: 'schematics',
   growthInput: 'Hole schematics', studyInput: 'Hole schematics', reason: 'Saved Hole schematic inputs are missing.',
   growthOwners: ['schematic:0', 'schematic:48', 'majik:10'],
   studyOwners: ['schematic:85', 'schematic:87', 'schematic:88', 'schematic:99'], ledgerId: 'schematic' },
  { name: 'Monument rewards', holeIndex: 15, flag: 'monumentRewards', growthInput: 'Hole monument rewards',
   reason: 'Saved monument reward inputs are missing.', growthOwners: ['cavern:3', 'cavern:9', 'cavern:12'],
   studyOwners: [] },
  { name: 'Bell bonuses', holeIndex: 17, flag: 'bellBonuses', growthInput: 'Hole Bell bonuses',
   reason: 'Saved Bell bonus inputs are missing.', growthOwners: ['cavern:4'], studyOwners: [] },
  { name: 'Measurements', holeIndex: 22, flag: 'measurements', growthInput: 'Hole Measurements',
   reason: 'Saved Hole Measurement inputs are missing.', growthOwners: ['measurement:7', 'measurement:0'],
   studyOwners: [] },
  { name: 'Hole collectibles', holeIndex: 24, flag: 'collectibles',
   growthInput: 'Hole collectibles', studyInput: 'Hole collectibles', reason: 'Saved Hole collectible inputs are missing.',
   growthOwners: ['cavern:10'], studyOwners: ['jar-collectible:16'] },
  { name: 'Fountain upgrades and dependent monuments and Cosmo', holeIndex: 31, flag: 'fountainUpgrades',
   growthInput: 'Hole Fountain upgrades', studyInput: 'Hole Fountain upgrades', reason: 'Saved Fountain upgrade inputs are missing.',
   growthOwners: ['cavern:3', 'cavern:9', 'cavern:12'], studyOwners: ['cavern:15'], cosmoRole: true },
  { name: 'Fountain marbleization and dependent monuments and Cosmo', holeIndex: 32, flag: 'fountainMarbleization',
   growthInput: 'Hole Fountain marbleization', studyInput: 'Hole Fountain marbleization',
   reason: 'Saved Fountain marbleization inputs are missing.',
   growthOwners: ['cavern:3', 'cavern:9', 'cavern:12'], studyOwners: ['cavern:15'], cosmoRole: true },
  { name: 'Study stamps', rawKey: 'StampLv', flag: 'studyStamps', studyInput: 'Study stamps',
   reason: 'Saved Study stamp inputs are missing.', growthOwners: [], studyOwners: ['stamps'] },
 ];

 it.each(omissions)('marks every dependent contributor unavailable for $name and restores the captured baseline', omission => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const snapshot = preparedSnapshot(hole);
  const baseline = JSON.parse(snapshot);
  const growthInputs = hole.growthInputs;
  const studyRate = hole.studyRate;
  const progression = hole.villagers.map(villager => ({
   rescued: villager.rescued, requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
   progressionAvailable: villager.progressionAvailable, reason: villager.progressionUnavailableReason,
  }));
  const studyProgression = hole.studies.map(study => ({
   requirement: study.getRequirement(), claimReady: study.claimReady,
  }));
  const missingHole = new Map(run.holeParseData);
  if (omission.rawKey !== undefined) {
   const rawData = { ...run.holeParseData.get('rawData') };
   delete rawData[omission.rawKey];
   missingHole.set('rawData', rawData);
  } else {
   const holes = [...run.holeParseData.get('Holes')];
   delete holes[omission.holeIndex!];
   missingHole.set('Holes', holes);
  }
  try {
   hole.parse(missingHole);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
   expect(hole.sourceSaveAvailable[omission.flag]).toBe(false);
   const growthReason = omission.growthInput === undefined ? null : `Saved inputs are missing: ${omission.growthInput}.`;
   const studyReason = omission.studyInput === undefined ? null : `Saved Study inputs are missing: ${omission.studyInput}.`;
   expect(hole.sharedGrowthUnavailableReason).toBe(growthReason);
   expect(hole.studyInputsUnavailableReason).toBe(studyReason);
   if (growthReason === null) expect(hole.growthInputs).toEqual(growthInputs);
   else expect(hole.growthInputs).toBeNull();
   expect(hole.villagers).toHaveLength(5);
   hole.villagers.forEach((villager, villagerIndex) => {
    const baselineRates = baseline.villagers[villagerIndex].rates;
    expect(villager.characterRates).toHaveLength(11);
    expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
     .toEqual(expect.arrayContaining(baselineRates.map((rate: { playerId: number; playerName: string }) =>
      [rate.playerId, rate.playerName])));
    villager.characterRates.forEach(rate => {
     const savedRate = baselineRates.find((saved: { playerId: number }) => saved.playerId === rate.playerId)!;
     expect(rate.unavailableReason).toBe(growthReason);
     if (growthReason === null) {
      expect(rate.expPerHour).toBe(savedRate.expPerHour);
      expect(rate.inputs).toEqual(savedRate.inputs);
     } else {
      expect(rate.expPerHour).toBeNull();
      expect(rate.inputs).toBeNull();
     }
     const dependsOnMissingInput = (row: HoleContributor) => omission.growthOwners.includes(row.owner)
      || (omission.cosmoRole === true && villager.index === 2 && row.owner === 'villager:2'
       && row.combination === 'multiplicative' && row.unit === 'multiplier');
     const dependent = rate.contributors.filter(dependsOnMissingInput);
     expect(dependent).toHaveLength(omission.growthOwners.length + Number(omission.cosmoRole === true && villager.index === 2));
     expect(dependent.map(row => [row.owner, row.combination, row.unit]))
      .toEqual(expect.arrayContaining(savedRate.contributors.filter(dependsOnMissingInput)
       .map((row: HoleContributor) => [row.owner, row.combination, row.unit])));
     dependent.forEach(row => {
      expect(row.value).toBeNull();
      expect(row.unavailableReason).toBe(omission.reason);
     });
     const independent = rate.contributors.filter(row => !dependsOnMissingInput(row));
     const savedIndependent = savedRate.contributors.filter((row: HoleContributor) => !dependsOnMissingInput(row));
     expect(independent).toHaveLength(savedIndependent.length);
     expect(independent).toEqual(expect.arrayContaining(savedIndependent));
     expect(rate.statueBonus).toBe(savedRate.statueBonus);
     expect(rate.statueFactor).toBe(savedRate.statueFactor);
    });
   });
   const dependentStudy = hole.studyContributors.filter(row => omission.studyOwners.includes(row.owner));
   expect(dependentStudy).toHaveLength(omission.studyOwners.length);
   expect(dependentStudy.map(row => [row.owner, row.combination, row.unit]))
    .toEqual(expect.arrayContaining(baseline.studyContributors
     .filter((row: HoleContributor) => omission.studyOwners.includes(row.owner))
     .map((row: HoleContributor) => [row.owner, row.combination, row.unit])));
   dependentStudy.forEach(row => {
    expect(row.value).toBeNull();
    expect(row.unavailableReason).toBe(omission.reason);
   });
   const independentStudy = hole.studyContributors.filter(row => !omission.studyOwners.includes(row.owner));
   const savedIndependentStudy = baseline.studyContributors.filter((row: HoleContributor) =>
    !omission.studyOwners.includes(row.owner));
   expect(independentStudy).toHaveLength(savedIndependentStudy.length);
   expect(independentStudy).toEqual(expect.arrayContaining(savedIndependentStudy));
   expect(hole.studyRate).toBe(studyReason === null ? studyRate : null);
   hole.studies.forEach((study, index) => {
    const savedStudy = baseline.studies[index];
    expect(study.participation).toBe(savedStudy.participation);
    expect(study.level).toBe(savedStudy.level);
    expect(study.progress).toBe(savedStudy.progress);
    expect(study.access).toBe(savedStudy.access);
    expect(study.getEffects()).toEqual(savedStudy.effects);
    if (study.participation === 'target' || study.participation === 'neighbor') {
     expect(study.progressPerHour).toBe(studyReason === null ? savedStudy.rate : null);
     expect(study.rateUnavailableReason).toBe(studyReason);
     const dependent = study.contributors.filter(row => omission.studyOwners.includes(row.owner));
     expect(dependent).toHaveLength(omission.studyOwners.length);
     expect(dependent).toEqual(expect.arrayContaining(dependentStudy));
     const independent = study.contributors.filter(row => !omission.studyOwners.includes(row.owner));
     expect(independent).toHaveLength(savedIndependentStudy.length);
     expect(independent).toEqual(expect.arrayContaining(savedIndependentStudy));
    } else if (study.participation === 'inactive') {
     expect(study.progressPerHour).toBe(0);
     expect(study.rateUnavailableReason).toBeNull();
     expect(study.contributors).toHaveLength(0);
    }
   });
   expect(hole.villagers.map(villager => ({
    rescued: villager.rescued, requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
    progressionAvailable: villager.progressionAvailable, reason: villager.progressionUnavailableReason,
   }))).toEqual(progression);
   expect(hole.studies.map(study => ({
    requirement: study.getRequirement(), claimReady: study.claimReady,
   }))).toEqual(studyProgression);
   const omitted = JSON.parse(preparedSnapshot(hole));
   expect(omitted.villagers.map(({ rates, ...saved }: { rates: unknown }) => saved))
    .toEqual(baseline.villagers.map(({ rates, ...saved }: { rates: unknown }) => saved));
   expect(omitted.neighbors).toEqual(baseline.neighbors);
   expect(omitted.lanterns).toEqual(baseline.lanterns);
   expect(omitted.cavernSources).toEqual(baseline.cavernSources);
   expect(hole.savedStudyTarget).toBe(run.holeParseData.get('Holes')[11][61]);
   if (omission.flag === 'villageMajik') {
    expect(hole.allocationEffects.leastUnlockedInvestment).toBe(baseline.allocations.leastUnlockedInvestment);
    expect(hole.allocationEffects.equalSpreadPercent).toBeNull();
    expect(hole.allocationEffects.equalSpreadUnavailableReason).toBe(omission.reason);
    expect(hole.allocationEffects.unavailableReason).toBe(omission.reason);
    hole.allocationEffects.opalEnthusiasm.forEach((effect, index) => {
     expect(effect.investedTens).toBe(baseline.allocations.opalEnthusiasm[index].investedTens);
     expect(effect.percent).toBeNull();
     expect(effect.unavailableReason).toBe(omission.reason);
    });
   } else {
    expect(omitted.allocations).toEqual(baseline.allocations);
   }
   if (omission.ledgerId === undefined) {
    expect(omitted.ledger).toEqual(baseline.ledger);
    expect(omitted.reset).toEqual(baseline.reset);
   } else {
    const dependent = hole.opalLedger.sources.find(source => source.id === omission.ledgerId)!;
    expect(dependent.opals).toBeNull();
    expect(dependent.unavailableReason).toEqual(expect.any(String));
    expect(dependent.unavailableReason!.length).toBeGreaterThan(0);
    const independent = hole.opalLedger.sources.filter(source => source.id !== omission.ledgerId);
    const savedIndependent = baseline.ledger.sources.filter((source: { id: string }) => source.id !== omission.ledgerId);
    expect(independent).toHaveLength(savedIndependent.length);
    expect(independent).toEqual(expect.arrayContaining(savedIndependent));
    expect(hole.opalLedger.cavernEarned).toBe(baseline.ledger.cavernEarned);
    expect(hole.opalLedger.invested).toBe(baseline.ledger.invested);
    expect(hole.opalLedger.externalEarned).toBeNull();
    expect(hole.opalLedger.externalRoundingAdjustment).toBeNull();
    expect(hole.opalLedger.earned).toBeNull();
    expect(hole.opalLedger.uninvested).toBeNull();
    expect(hole.opalLedger.unavailableReason).toBe(dependent.unavailableReason);
   }
  } finally {
   hole.parse(run.holeParseData);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
  }
  expect(preparedSnapshot(hole)).toBe(snapshot);
  expect(hole.growthInputs).toEqual(growthInputs);
 });

 it.each([
  { name: 'Kaipu investment', kind: 'investment', holeIndex: 3, villagerIndex: 1 },
  { name: 'Cosmo purchased multiplier', kind: 'purchased', holeIndex: 23, villagerIndex: 2 },
  { name: 'Bolaia level', kind: 'bolaia', holeIndex: 1, villagerIndex: 4 },
  { name: 'Polonai level', kind: 'polonai', holeIndex: 1, villagerIndex: 0 },
  { name: 'bundle ownership', kind: 'bundle' },
  { name: 'one character Statue save', kind: 'statue' },
 ])('keeps owner-scoped missing $name distinct from independent results and restores the baseline', omission => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const snapshot = preparedSnapshot(hole);
  const baseline = JSON.parse(snapshot);
  const growthInputs = hole.growthInputs;
  const studyRate = hole.studyRate;
  const missingPlayerId = (run.data.get('players') as Player[])[0].playerID;
  const missingHole = new Map(run.holeParseData);
  if (omission.holeIndex !== undefined) {
   const holes = [...run.holeParseData.get('Holes')];
   holes[omission.holeIndex] = [...holes[omission.holeIndex]];
   delete holes[omission.holeIndex][omission.villagerIndex!];
   missingHole.set('Holes', holes);
  } else if (omission.kind === 'bundle') {
   missingHole.delete('BundlesReceived');
  } else {
   const rawData = { ...run.holeParseData.get('rawData') };
   delete rawData[`StatueLevels_${missingPlayerId}`];
   missingHole.set('rawData', rawData);
  }
  try {
   hole.parse(missingHole);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
   expect(hole.sharedGrowthUnavailableReason).toBeNull();
   expect(hole.growthInputs).toEqual(growthInputs);
   expect(hole.villagers).toHaveLength(5);
   const missingAllocation = ['investment', 'bolaia', 'polonai'].includes(omission.kind);
   hole.villagers.forEach((villager, villagerIndex) => {
    const savedVillager = baseline.villagers[villagerIndex];
    const affectedOwner = villagerIndex === omission.villagerIndex;
    expect(villager.characterRates).toHaveLength(11);
    expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
     .toEqual(expect.arrayContaining(savedVillager.rates.map((rate: { playerId: number; playerName: string }) =>
      [rate.playerId, rate.playerName])));
    if (omission.kind === 'investment' && affectedOwner) {
     expect(villager.investmentAvailable).toBe(false);
     expect(villager.progressionAvailable).toBe(false);
    } else if (omission.kind === 'purchased' && affectedOwner) {
     expect(villager.purchasedUpgradeAvailable).toBe(false);
     expect(villager.progressionAvailable).toBe(false);
    } else if (['bolaia', 'polonai'].includes(omission.kind) && affectedOwner) {
     expect(villager.saveAvailable).toBe(false);
     expect(villager.rescued).toBeNull();
     expect(villager.getExpRequirement()).toBeNull();
     expect(villager.requirementUnavailableReason).toBe('Saved villager level is missing.');
     expect(villager.progressionAvailable).toBe(false);
    } else {
     expect(villager.progressionAvailable).toBe(true);
     expect(villager.progressionUnavailableReason).toBeNull();
    }
    if (!affectedOwner || !['bolaia', 'polonai'].includes(omission.kind)) expect(villager.level).toBe(savedVillager.level);
    expect(villager.currentExp).toBe(savedVillager.exp);
    if (!affectedOwner || omission.kind !== 'investment') expect(villager.opals).toBe(savedVillager.opals);
    if (!affectedOwner || omission.kind !== 'purchased') expect(villager.purchasedExpUpgrade).toBe(savedVillager.purchased);
    villager.characterRates.forEach(rate => {
     const savedRate = savedVillager.rates.find((saved: { playerId: number }) => saved.playerId === rate.playerId)!;
     const affectedStatue = omission.kind === 'statue' && rate.playerId === missingPlayerId;
     const expectedReason = affectedOwner ? 'Saved villager growth inputs are missing.'
      : omission.kind === 'bundle' ? 'Saved bundle ownership is missing.'
       : missingAllocation ? 'Saved villager access or Opal investment is missing.'
        : affectedStatue ? 'Saved Villager Statue state is missing for this character.' : null;
     expect(rate.unavailableReason).toBe(expectedReason);
     if (expectedReason === null) {
      expect(rate.expPerHour).toBe(savedRate.expPerHour);
      expect(rate.inputs).toEqual(savedRate.inputs);
     } else {
      expect(rate.expPerHour).toBeNull();
      expect(rate.inputs).toBeNull();
     }
     const dependent: [string, HoleContributor['combination'], HoleContributor['unit'], string][] = [];
     if (missingAllocation) dependent.push(['majik:14', 'allocation', 'percent', 'Saved villager access or Opal investment is missing.']);
     if (omission.kind === 'investment' && affectedOwner) {
      dependent.push([`villager:${villagerIndex}`, 'allocation', 'count', 'Saved Opal investment is missing.']);
      dependent.push(['majik:9', 'allocation', 'percent', 'Saved Opal investment is missing.']);
     }
     if (omission.kind === 'purchased' && affectedOwner) {
      dependent.push(['gems', 'multiplicative', 'multiplier', 'Saved purchased EXP upgrade is missing.']);
     }
     if (omission.kind === 'polonai' && affectedOwner) {
      dependent.push(['villager:0', 'multiplicative', 'multiplier', 'Saved cavern access is missing.']);
     }
     if (omission.kind === 'bundle') dependent.push(['gems:bundle', 'multiplicative', 'percent', 'Saved bundle ownership is missing.']);
     if (affectedStatue) {
      dependent.push([`statues:${missingPlayerId}:28`, 'multiplicative', 'percent', 'Saved Villager Statue state is missing for this character.']);
     }
     dependent.forEach(([owner, combination, unit, reason]) => {
      expect(rate.contributors.find(row => row.owner === owner && row.combination === combination && row.unit === unit))
       .toMatchObject({ value: null, unavailableReason: reason });
     });
     const independent = rate.contributors.filter(row => !dependent.some(([owner, combination, unit]) =>
      row.owner === owner && row.combination === combination && row.unit === unit));
     const savedIndependent = savedRate.contributors.filter((row: HoleContributor) =>
      !dependent.some(([owner, combination, unit]) =>
       row.owner === owner && row.combination === combination && row.unit === unit));
     expect(independent).toHaveLength(savedIndependent.length);
     expect(independent).toEqual(expect.arrayContaining(savedIndependent));
     expect(rate.statueBonus).toBe(affectedStatue ? null : savedRate.statueBonus);
     expect(rate.statueFactor).toBe(affectedStatue ? null : savedRate.statueFactor);
    });
   });
   if (omission.kind === 'bolaia') {
    expect(hole.studyRate).toBeNull();
    expect(hole.studyContributors.find(row => row.owner === 'villager:4'
     && row.combination === 'additive' && row.unit === 'count'))
     .toMatchObject({ value: null, unavailableReason: 'Saved Bolaia level is missing.' });
    const independent = hole.studyContributors.filter(row => row.owner !== 'villager:4' || row.unit !== 'count');
    const savedIndependent = baseline.studyContributors.filter((row: HoleContributor) =>
     row.owner !== 'villager:4' || row.unit !== 'count');
    expect(independent).toHaveLength(savedIndependent.length);
    expect(independent).toEqual(expect.arrayContaining(savedIndependent));
    expect(hole.studyContributors.find(row => row.owner === 'villager:4' && row.unit === 'percent')!.value).toBe(5);
   } else {
    expect(hole.studyRate).toBe(studyRate);
    expect(hole.studyContributors).toHaveLength(baseline.studyContributors.length);
    expect(hole.studyContributors).toEqual(expect.arrayContaining(baseline.studyContributors));
   }
   if (['bolaia', 'polonai'].includes(omission.kind)) {
    const studyAccessReason = omission.kind === 'polonai'
     ? 'Saved Study target is not an available released Study.' : 'Saved Study access is missing.';
    expect(hole.eligibleStudyNeighbors).toBeNull();
    expect(hole.studyNeighborEligibilityUnavailableReason).toBe(studyAccessReason);
    hole.studies.forEach((study, index) => {
     const savedStudy = baseline.studies[index];
     expect(study.level).toBe(savedStudy.level);
     expect(study.progress).toBe(savedStudy.progress);
     expect(study.getEffects()).toEqual(savedStudy.effects);
     expect(study.access).toBe(omission.kind === 'polonai' ? null : savedStudy.access);
     expect(study.participation).toBe('unavailable');
     expect(study.progressPerHour).toBeNull();
     expect(study.rateUnavailableReason).toBe(studyAccessReason);
     expect(study.contributors).toHaveLength(0);
    });
   } else {
    expect(JSON.parse(preparedSnapshot(hole)).studies).toEqual(baseline.studies);
    expect(hole.eligibleStudyNeighbors).toEqual(baseline.neighbors);
   }
   if (missingAllocation) {
    expect(hole.allocationEffects.leastUnlockedInvestment).toBeNull();
    expect(hole.allocationEffects.equalSpreadPercent).toBeNull();
    expect(hole.allocationEffects.equalSpreadUnavailableReason).toBe('Saved villager access or Opal investment is missing.');
    hole.allocationEffects.opalEnthusiasm.forEach((effect, index) => {
     if (omission.kind === 'investment' && index === omission.villagerIndex) {
      expect(effect.investedTens).toBeNull();
      expect(effect.percent).toBeNull();
      expect(effect.unavailableReason).toBe('Saved Opal investment is missing.');
     } else {
      expect(effect).toEqual(baseline.allocations.opalEnthusiasm[index]);
     }
    });
   } else {
    expect(hole.allocationEffects).toEqual(baseline.allocations);
   }
   if (omission.kind === 'investment') {
    expect(hole.opalLedger.invested).toBeNull();
    expect(hole.opalLedger.uninvested).toBeNull();
    expect(hole.opalLedger.unavailableReason).toBe('Saved Opal investments are missing.');
    expect(hole.opalLedger.earned).toBe(baseline.ledger.earned);
    expect(hole.opalLedger.externalEarned).toBe(baseline.ledger.externalEarned);
    expect(hole.opalLedger.cavernEarned).toBe(baseline.ledger.cavernEarned);
    expect(hole.opalLedger.sources).toHaveLength(baseline.ledger.sources.length);
    expect(hole.opalLedger.sources).toEqual(expect.arrayContaining(baseline.ledger.sources));
   } else {
    expect(hole.opalLedger).toEqual(baseline.ledger);
   }
   expect(hole.cavernOpalSources).toEqual(baseline.cavernSources);
   expect(hole.lanterns).toEqual(baseline.lanterns);
   if (omission.kind !== 'polonai') expect(hole.anotherTry).toEqual(baseline.reset);
   else {
    expect(hole.anotherTry.access).toBeNull();
    expect(hole.anotherTry.affordable).toBeNull();
    expect(hole.anotherTry.availableWishes).toBe(baseline.reset.availableWishes);
    expect(hole.anotherTry.wishCost).toBe(baseline.reset.wishCost);
    expect(hole.anotherTry.resets).toEqual(baseline.reset.resets);
   }
  } finally {
   hole.parse(run.holeParseData);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
  }
  expect(preparedSnapshot(hole)).toBe(snapshot);
  expect(hole.growthInputs).toEqual(growthInputs);
 });
});

describe('Hole part 1 H20 cavern counter contracts, not additional live-game parity', () => {
 it.each([
  'missing row 11',
  'missing colony counter',
  'missing kill counter',
  'present zero colony counter',
  'present zero kill counter',
  'disabled schematic with missing colony counter',
 ])('keeps dependent growth distinct from independent results for %s and restores the baseline', scenario => {
  const run = freshAccount();
  const hole = run.data.get('hole') as Hole;
  const snapshot = preparedSnapshot(hole);
  const baseline = JSON.parse(snapshot);
  const growthInputs = hole.growthInputs;
  const studyRate = hole.studyRate;
  const progression = hole.villagers.map(villager => ({
   rescued: villager.rescued, available: villager.progressionAvailable,
   requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
  }));
  const schematic = hole.schematics[48];
  const ownership = schematic.unlocked;
  expect(ownership).toBe(true);
  const tomeMeasurementBonus = hole.measurements[0].getBonus();
  const missingRow = scenario === 'missing row 11';
  const disabledSchematic = scenario === 'disabled schematic with missing colony counter';
  const missingColony = missingRow || scenario === 'missing colony counter' || disabledSchematic;
  const missingKills = missingRow || scenario === 'missing kill counter';
  const zeroColony = scenario === 'present zero colony counter';
  const zeroKills = scenario === 'present zero kill counter';
  const colonyReason = missingColony && !disabledSchematic ? 'Saved Gloomie colony counter is missing.' : null;
  const rateReason = colonyReason;
  const counterInputs = new Map(run.holeParseData);
  const holes = [...run.holeParseData.get('Holes')];
  if (missingRow) {
   delete holes[11];
  } else {
   holes[11] = [...holes[11]];
   if (missingColony) delete holes[11][26];
   if (missingKills) delete holes[11][28];
   if (zeroColony) holes[11][26] = 0;
   if (zeroKills) holes[11][28] = 0;
  }
  counterInputs.set('Holes', holes);
  const changedOwners: string[] = [];
  if (missingColony || zeroColony) changedOwners.push('schematic:48');
  if (disabledSchematic) changedOwners.push('majik:10');
  try {
   hole.parse(counterInputs);
   if (disabledSchematic) schematic.unlocked = false;
   hole.prepareSharedStudyEffects();
   run.present(run.data);
   expect(hole.sourceSaveAvailable.gloomieColonyCounter).toBe(!missingColony);
   expect(hole.sourceSaveAvailable.schematics).toBe(true);
   expect(hole.sourceSaveAvailable.measurements).toBe(true);
   expect(hole.sharedGrowthUnavailableReason).toBeNull();
   expect(hole.growthInputs).toEqual(growthInputs);
   // Tome score, not Gloomie kills, supplies the Villager EXP Measurement.
   expect(hole.measurements[0].getBonus()).toBe(tomeMeasurementBonus);
   expect(hole.villagers).toHaveLength(5);
   hole.villagers.forEach((villager, villagerIndex) => {
    const savedRates = baseline.villagers[villagerIndex].rates;
    expect(villager.characterRates).toHaveLength(11);
    expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
     .toEqual(expect.arrayContaining(savedRates.map((rate: { playerId: number; playerName: string }) =>
      [rate.playerId, rate.playerName])));
    villager.characterRates.forEach(rate => {
     const savedRate = savedRates.find((saved: { playerId: number }) => saved.playerId === rate.playerId)!;
     expect(rate.unavailableReason).toBe(rateReason);
     if (rateReason !== null) {
      expect(rate.expPerHour).toBeNull();
      expect(rate.inputs).toBeNull();
     } else {
      expect(rate.expPerHour).not.toBeNull();
      expect(rate.inputs).not.toBeNull();
      expect(Number.isFinite(rate.expPerHour)).toBe(true);
     }
     const colony = rate.contributors.find(row => row.owner === 'schematic:48'
      && row.combination === 'additive' && row.unit === 'percent')!;
     const tomeMeasurement = rate.contributors.find(row => row.owner === 'measurement:0'
      && row.combination === 'additive' && row.unit === 'percent')!;
     expect(colony.unavailableReason).toBe(colonyReason);
     expect(tomeMeasurement).toEqual(savedRate.contributors.find((row: HoleContributor) =>
      row.owner === 'measurement:0' && row.combination === 'additive' && row.unit === 'percent'));
     if (colonyReason !== null) expect(colony.value).toBeNull();
     else if (zeroColony || disabledSchematic) expect(colony.value).toBe(0);
     if (!missingRow && (missingKills || zeroKills)) {
      expect(rate.expPerHour).toBe(savedRate.expPerHour);
      expect(rate.inputs).toEqual(savedRate.inputs);
     }
     if (disabledSchematic) {
      expect(rate.contributors.find(row => row.owner === 'majik:10'
       && row.combination === 'additive' && row.unit === 'percent'))
       .toMatchObject({ value: expect.any(Number), unavailableReason: null });
     }
     const independent = rate.contributors.filter(row => row.combination !== 'additive' || row.unit !== 'percent'
      || !changedOwners.includes(row.owner));
     const savedIndependent = savedRate.contributors.filter((row: HoleContributor) =>
      row.combination !== 'additive' || row.unit !== 'percent' || !changedOwners.includes(row.owner));
     expect(independent).toHaveLength(savedIndependent.length);
     expect(independent).toEqual(expect.arrayContaining(savedIndependent));
     for (const [owner, combination, unit] of [
      ['schematic:0', 'base', 'EXP/hour/Opal'],
      ['measurement:7', 'additive', 'percent'],
     ]) {
      expect(rate.contributors.find(row => row.owner === owner && row.combination === combination && row.unit === unit))
       .toEqual(savedRate.contributors.find((row: HoleContributor) =>
        row.owner === owner && row.combination === combination && row.unit === unit));
     }
     expect(rate.statueBonus).toBe(savedRate.statueBonus);
     expect(rate.statueFactor).toBe(savedRate.statueFactor);
    });
   });
   expect(hole.villagers.map(villager => ({
    rescued: villager.rescued, available: villager.progressionAvailable,
    requirement: villager.getExpRequirement(), claimReady: villager.claimReady,
   }))).toEqual(progression);
   const changed = JSON.parse(preparedSnapshot(hole));
   expect(changed.villagers.map(({ rates, ...saved }: { rates: unknown }) => saved))
    .toEqual(baseline.villagers.map(({ rates, ...saved }: { rates: unknown }) => saved));
   for (const key of ['allocations', 'ledger', 'cavernSources', 'studyContributors']) {
    expect(changed[key]).toEqual(baseline[key]);
   }
   expect(hole.studyInputsUnavailableReason).toBeNull();
   expect(hole.studyRate).toBe(studyRate);
   if (missingRow) {
    expect(hole.savedStudyTarget).toBeNull();
    expect(hole.studyTargetUnavailableReason).toBe('Saved Study target is missing.');
    expect(hole.eligibleStudyNeighbors).toBeNull();
    expect(hole.studyNeighborEligibilityUnavailableReason).toBe('Saved Study target is missing.');
    hole.studies.forEach((study, index) => {
     expect([study.level, study.progress, study.access])
      .toEqual([baseline.studies[index].level, baseline.studies[index].progress, baseline.studies[index].access]);
     expect(study.participation).toBe('unavailable');
     expect(study.progressPerHour).toBeNull();
     expect(study.rateUnavailableReason).toBe('Saved Study target is missing.');
     if ([1, 7, 11, 16].includes(study.index)) {
      expect(study.getEffects().find(effect => effect.key === 'skilling-requirement-divisor-contribution'))
       .toMatchObject({ value: null, unavailableReason: 'Saved skilling progression is missing.' });
     } else {
      expect(study.getEffects()).toEqual(baseline.studies[index].effects);
     }
    });
    expect(hole.lanterns.usesToday).toBeNull();
    expect(hole.lanterns.usageUnavailableReason).toBe('Saved Lantern usage is missing.');
    expect(hole.lanterns.locations).toEqual(baseline.lanterns.locations);
    expect(hole.lanterns.totalStock).toBe(baseline.lanterns.totalStock);
    expect(hole.anotherTry.availableWishes).toBeNull();
    expect(hole.anotherTry.affordable).toBeNull();
    expect(hole.anotherTry.access).toBe(baseline.reset.access);
    expect(hole.anotherTry.wishCost).toBe(baseline.reset.wishCost);
    expect(hole.anotherTry.resets).toEqual(baseline.reset.resets);
   } else {
    for (const key of ['studies', 'neighbors', 'lanterns', 'reset']) {
     expect(changed[key]).toEqual(baseline[key]);
    }
   }
  } finally {
   schematic.unlocked = ownership;
   hole.parse(run.holeParseData);
   hole.prepareSharedStudyEffects();
   run.present(run.data);
  }
  expect(preparedSnapshot(hole)).toBe(snapshot);
  expect(hole.growthInputs).toEqual(growthInputs);
  expect(hole.sourceSaveAvailable.gloomieColonyCounter).toBe(true);
 });
});
