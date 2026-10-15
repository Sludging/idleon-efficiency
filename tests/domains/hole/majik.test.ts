import type { Hole, PocketGodSelection } from '../../../data/domain/world-5/hole/hole';
import type { Divinity } from '../../../data/domain/world-5/divinity';
import type * as HoleModule from '../../../data/domain/world-5/hole/hole';
import type * as DivinityModule from '../../../data/domain/world-5/divinity';
import type { Player } from '../../../data/domain/player';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { assertPairedContext, captured, coreNumber, decodedSave } from './part1-test-helpers';
import type { CapturedMajik, CapturedMajikPool } from './part2-test-helpers';
import { assertPocketCharacterBinding, compareCore, freshPart2Account } from './part2-test-helpers';

const releasedIds = [0, 1, 2, 3, 4, 9, 10, 11, 12, 13, 14, 21, 22, 23, 24, 25, 26];

describe('Hole Majik shared investment, effects and character-bound Pocket Divinity', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let rows: CapturedMajik[];
 let pool: CapturedMajikPool;

 beforeAll(() => {
  results = loadExtractionResults('hole-majik-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  rows = captured<CapturedMajik[]>(results, 'upgrades');
  pool = captured<CapturedMajikPool>(results, 'pool');
 });

 it('pairs original outputs with the real imported account', () => {
  assertPairedContext(results, data);
 });

 it('uses one earned, invested and remaining pool across all three saved trees', () => {
  compareCore(hole.majiks.purchasedPoints, pool.purchased, 'Purchased Majik points');
  compareCore(hole.majiks.earnedPoints, pool.earned, 'Earned Majik points');
  compareCore(hole.majiks.investedPoints, pool.invested, 'Invested Majik points');
  compareCore(hole.majiks.remainingPoints, pool.remaining, 'Remaining Majik points');
  expect(pool.rawInvestments).toEqual(decodedSave<number[][]>('Holes').slice(4, 7));
  expect(hole.majiks.upgrades.map(upgrade => upgrade.index)).toEqual(rows.map(row => row.id));
  const trees = [hole.majiks.HoleUpgrades, hole.majiks.VillageUpgrades, hole.majiks.IdleonUpgrades];
  trees.forEach((upgrades, tree) => {
   expect(upgrades.map(upgrade => upgrade.name))
    .toEqual(pool.rawNames[tree].filter(name => name !== 'Confused_Bonus').map(name => name.replace(/_/g, ' ')));
  });
  // The real save has zero placeholder investment. Keep all saved positions in the pool assertion.
  const allSavedInvestment = pool.rawInvestments.reduce((sum, tree) => sum + tree.reduce((total, level) => total + level, 0), 0);
  compareCore(hole.majiks.investedPoints, allSavedInvestment, 'Complete saved investment including placeholders');
 });

 releasedIds.forEach(id => {
  it(`matches released Majik ${id}'s tree path, level split, enhancement cap and purchase state`, () => {
   const row = rows.find(row => row.id === id)!;
   const upgrade = hole.majiks.upgrades.find(upgrade => upgrade.index === id)!;
   expect(upgrade.name).toBe(row.name.replace(/_/g, ' '));
   expect(upgrade.treePosition).toBe(row.position);
   expect(upgrade.prerequisiteId).toBe(row.prerequisiteId);
   expect(upgrade.prerequisiteMet).toBe(row.prerequisiteMet);
   expect(upgrade.saveAvailable).toBe(true);
   expect(upgrade.unlocked).toBe(row.level > 0);
   expect(upgrade.access).toBe(row.access);
   expect(upgrade.enhancementAllowed).toBe(row.gate);
   expect(upgrade.canPurchase).toBe(row.canPurchase);
   for (const [actual, expected, label] of [
    [upgrade.level, row.level, 'saved level'],
    [upgrade.initialLevel, row.initial, 'initial purchase'],
    [upgrade.enhancementLevel, row.enhancement, 'enhancement levels'],
    [upgrade.currentCap, row.cap, 'effective cap'],
    [upgrade.getBonus(), row.bonus, 'current effect'],
   ] as const) compareCore(actual, expected, `${upgrade.name} ${label}`);
   expect(upgrade.pointsRequired).toBe(1);
  });
 });

 it('keeps Profoun-tain capacity, coin and marble effects separate', () => {
  const expected = captured<{ capacity: number; coin: number; marble: number }>(results, 'fountain_effects');
  const upgrade = hole.majiks.HoleUpgrades.find(upgrade => upgrade.index === 4)!;
  const effects = upgrade.getEffects();
  for (const [key, value] of [
   ['fountain-stack-capacity', expected.capacity],
   ['fountain-coin-value', expected.coin],
   ['fountain-marble-rate', expected.marble],
  ] as const) {
   const effect = effects.find(effect => effect.key === key)!;
   expect(typeof effect.value).toBe('number');
   compareCore(effect.value as number, value, `Profoun-tain ${key}`);
  }
 });

 it('keeps nonlinear Forge, schematic-count and Equal Spread effects active', () => {
  const forge = hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index === 22)!;
  compareCore(forge.getEffects()[0].value as number, rows.find(row => row.id === 22)!.bonus, 'Beeg Beeg Forge power-of-three multiplier');
  const creator = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 10)!;
  coreNumber(creator.getEffects()[0].value as number, results, 'village_schematic_effect', 'Contented Creator built-schematic EXP contribution');
  const spread = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 14)!;
  coreNumber(spread.getEffects()[0].value as number | null, results, 'equal_spread_effect', 'Equal Spread EXP contribution');
  const enhance = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 11)!;
  expect(enhance.getEffects().find(effect => effect.key === 'enhance-majik')!.value).toBe(rows.find(row => row.id === 11)!.gate);
 });

 it('keeps only schematic-dependent Majik values unavailable when the real schematic input is omitted, not game parity', () => {
  const run = freshPart2Account();
  const { updateHole, updateHolePresentation }: typeof HoleModule = require('../../../data/domain/world-5/hole/hole');
  const accountHole = run.data.get('hole') as Hole;
  const parse = jest.spyOn(accountHole, 'parse');
  let originalInputs: Map<string, any>;
  try {
   run.data = run.process(run.data, run.save, run.save.get('playerNames'),
    normalizeCompanionStates(run.save.get('companions')), run.save.get('servervars'), true).getData();
   originalInputs = new Map(parse.mock.calls[0][0]);
  } finally {
   parse.mockRestore();
  }
  const creator = accountHole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 10)!;
  const progression = () => accountHole.majiks.upgrades.map(upgrade => ({
   id: upgrade.index, level: upgrade.level, saveAvailable: upgrade.saveAvailable, unlocked: upgrade.unlocked,
   initialLevel: upgrade.initialLevel, enhancementLevel: upgrade.enhancementLevel,
   enhancementAllowed: upgrade.enhancementAllowed, currentCap: upgrade.currentCap, access: upgrade.access,
   prerequisiteId: upgrade.prerequisiteId, prerequisiteMet: upgrade.prerequisiteMet,
   pointsRequired: upgrade.pointsRequired, canPurchase: upgrade.canPurchase, bonus: upgrade.getBonus(),
  }));
  const pointPool = () => ({
   purchased: accountHole.majiks.purchasedPoints, earned: accountHole.majiks.earnedPoints,
   invested: accountHole.majiks.investedPoints, remaining: accountHole.majiks.remainingPoints,
  });
  const independentEffects = () => accountHole.majiks.upgrades.filter(upgrade => upgrade.index !== 10)
   .map(upgrade => ({ id: upgrade.index, effects: upgrade.getEffects(), description: upgrade.getDescription() }));
  const savedProgression = progression();
  const savedPool = pointPool();
  const savedIndependentEffects = independentEffects();
  const creatorEffects = creator.getEffects();
  const creatorDescription = creator.getDescription();
  const schematicCount = creator.createdSchematics;
  expect(creator.level).toBeGreaterThan(0);
  expect(schematicCount).not.toBeNull();
  expect(creatorEffects.find(effect => effect.key === 'villager-exp')!.value).not.toBeNull();
  expect(creatorDescription).not.toContain('|');
  const missingInputs = new Map(originalInputs!);
  const holes = [...originalInputs!.get('Holes')];
  delete holes[13];
  missingInputs.set('Holes', holes);
  const prepare = () => {
   accountHole.prepareSharedStudyEffects();
   accountHole.prepareSharedUpgradeEffects();
   updateHole(run.data);
   updateHolePresentation(run.data);
  };
  try {
   accountHole.parse(missingInputs);
   expect(creator.createdSchematics).toBeNull();
   prepare();
   expect(accountHole.sourceSaveAvailable.schematics).toBe(false);
   expect(creator.createdSchematics).toBeNull();
   expect(creator.getEffects().find(effect => effect.key === 'villager-exp')!.value).toBeNull();
   expect(creator.getDescription()).toContain('|');
   expect(creator.getDescription()).toBe(creator.data.desc.replace(/_/g, ' ')
    .replace(/[{}]/g, creator.getBonus().toString()));
   expect(progression()).toEqual(savedProgression);
   expect(pointPool()).toEqual(savedPool);
   expect(independentEffects()).toEqual(savedIndependentEffects);
  } finally {
   accountHole.parse(originalInputs!);
   prepare();
  }
  expect(creator.createdSchematics).toBe(schematicCount);
  expect(creator.getEffects()).toEqual(creatorEffects);
  expect(creator.getDescription()).toBe(creatorDescription);
  expect(progression()).toEqual(savedProgression);
  expect(pointPool()).toEqual(savedPool);
  expect(independentEffects()).toEqual(savedIndependentEffects);
 });

 it('retains canonical Pocket gods and bonus identities rather than duplicating their effects', () => {
  const expected = captured<PocketGodSelection[]>(results, 'pocket_selections');
  expect(hole.majiks.pocketDivinity.selections).toEqual(expected);
  expect(hole.majiks.pocketDivinity.linkedGods).toEqual([...new Set(expected.filter(selection => selection.active).map(selection => selection.godId))]);
 });

 it('keeps the observed ordinary Pocket overlap and Elemental Sorcerer secondary link without duplicates', () => {
  const pocket = hole.majiks.pocketDivinity;
  const ordinaryOverlap = pocket.characters.find(character => character.playerName === 'SludgeMan')!;
  expect(ordinaryOverlap.primaryGodId).toBe(0);
  expect(pocket.linkedGods).toContain(ordinaryOverlap.primaryGodId);
  expect(ordinaryOverlap.effectiveGodIds!.filter(id => id === ordinaryOverlap.primaryGodId)).toHaveLength(1);
  const sorcerer = pocket.characters.find(character => character.playerName === 'Sludgev5')!;
  expect(sorcerer.secondaryGodId).toBe(2);
  expect(sorcerer.effectiveGodIds!.filter(id => id === sorcerer.secondaryGodId)).toHaveLength(1);
 });

 it('matches Player 3 runtime activation and binds every real named primary and secondary link', () => {
  assertPocketCharacterBinding(data, results);
 });
});

describe('Isolated ordinary-link and Pocket source-rule contracts, not matched-game comparisons', () => {
 it('requires a primary link and an unlocked secondary, then deduplicates ordinary, Pocket and Doot activation', () => {
  const run = freshPart2Account();
  // Load runtime exports after the save helpers initialize pipeline registrations.
  const { updateDivinity }: typeof DivinityModule = require('../../../data/domain/world-5/divinity');
  const divinity = run.data.get('divinity') as Divinity;
  const hole = run.data.get('hole') as Hole;
  const pocket = hole.majiks.pocketDivinity;
  const links = divinity.playerInfo.find(info => info.esGod !== undefined)!;
  const player = (run.data.get('players') as Player[]).find(player => player.playerID === links.playerIndex)!;
  const primary = divinity.gods[0];
  const secondary = divinity.gods[2];
  const cases = [
   { name: 'No primary', primary: false, unlocked: true, pocket: false, doot: false, duplicate: false },
   { name: 'Locked secondary', primary: true, unlocked: false, pocket: false, doot: false, duplicate: false },
   { name: 'Pocket without primary', primary: false, unlocked: true, pocket: true, doot: false, duplicate: false },
   { name: 'Pocket adds locked secondary', primary: true, unlocked: false, pocket: true, doot: false, duplicate: false },
   { name: 'Eligible secondary', primary: true, unlocked: true, pocket: false, doot: false, duplicate: false },
   { name: 'Pocket overlaps eligible secondary', primary: true, unlocked: true, pocket: true, doot: false, duplicate: false },
   { name: 'Duplicate ordinary and Pocket links', primary: true, unlocked: true, pocket: true, doot: false, duplicate: true },
   { name: 'Prepared Doot union without ordinary links', primary: false, unlocked: false, pocket: true, doot: true, duplicate: false },
  ];
  for (const branch of cases) {
   links.primaryGod = branch.primary ? primary : undefined;
   links.esGod = branch.duplicate ? primary : secondary;
   links.esGod.unlocked = branch.unlocked;
   links.dootActive = branch.doot;
   pocket.saveAvailable = true;
   pocket.level = branch.pocket ? 1 : 0;
   pocket.parseSelections([links.esGod.index, links.esGod.index]);
   updateDivinity(run.data);
   pocket.prepareCharacters(run.data.get('players') as Player[], divinity);
   const ordinaryIds = branch.primary
    ? branch.unlocked && !branch.duplicate ? [primary.index, secondary.index] : [primary.index] : [];
   const pocketIds = branch.pocket ? [links.esGod.index] : [];
   const previousIds = branch.doot ? divinity.gods.map(god => god.index) : ordinaryIds;
   const effectiveIds = [...new Set([...previousIds, ...pocketIds])];
   const character = pocket.characters.find(character => character.playerId === player.playerID)!;
   expect({ branch: branch.name, ids: links.ordinaryGods.map(god => god.index) })
    .toEqual({ branch: branch.name, ids: ordinaryIds });
   expect(links.primaryGod).toBe(branch.primary ? primary : undefined);
   expect(links.esGod).toBe(branch.duplicate ? primary : secondary);
   expect(character.primaryGodId).toBe(branch.primary ? primary.index : null);
   expect(character.secondaryGodId).toBe(links.esGod.index);
   expect(character.pocketActivationAvailable).toBe(true);
   expect(character.overlappingGodIds).toEqual(pocketIds.filter(id => previousIds.includes(id)));
   expect(character.addedGodIds).toEqual(pocketIds.filter(id => !previousIds.includes(id)));
   expect(character.effectiveGodIds).toEqual(effectiveIds);
   expect(character.allStatPercent).toBe(branch.doot ? 15 * pocket.level : 0);
   expect(links.gods.map(god => god.index)).toEqual(effectiveIds);
   divinity.gods.forEach(god => {
    const active = effectiveIds.includes(god.index);
    expect(links.isLinkedToGod(god.index)).toBe(active);
    expect(god.linkedPlayers.filter(linked => linked.playerID === player.playerID)).toHaveLength(active ? 1 : 0);
   });
   const gaming = divinity.getGamingGrowthMinorLinkBonus();
   links.esGod = undefined;
   updateDivinity(run.data);
   expect(divinity.getGamingGrowthMinorLinkBonus()).toBe(gaming);
  }
 });
});
