import type { Cloudsave } from '../../../data/domain/cloudsave';
import type { updateIdleonData } from '../../../data/domain/idleonData';
import type * as AccountPipeline from '../../../data/domain/idleonData';
import type * as AccountItems from '../../../data/domain/items';
import type * as SaveLoader from '../../utils/cloudsave-loader';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Player } from '../../../data/domain/player';
import type { Divinity } from '../../../data/domain/world-5/divinity';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { getCompanionActiveBonus } from '../../../data/domain/companions';
import type { Companion } from '../../../data/domain/companions';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { normalizeExtractedValue } from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';
import { captured } from './part1-test-helpers';

export interface CapturedSchematic {
 id: number;
 slot: number;
 name: string;
 currency: number;
 built: boolean;
 released: boolean;
 available: boolean;
 requiredLevel: number | null;
 price: number;
 stock: number;
 currentCost: number | null;
 shortfall: number | null;
 affordable: boolean | null;
}

export interface CapturedMajik {
 id: number;
 tree: number;
 position: number;
 name: string;
 level: number;
 initial: number;
 enhancement: number;
 gate: boolean;
 cap: number;
 prerequisiteId: number | null;
 prerequisiteMet: boolean;
 access: boolean;
 canPurchase: boolean;
 bonus: number;
}

export interface CapturedMajikPool {
 purchased: number;
 earned: number;
 invested: number;
 remaining: number;
 rawInvestments: number[][];
 rawNames: string[][];
}

export interface CapturedMeasurement {
 id: number;
 type: number;
 level: number;
 access: boolean;
 raw: number | string;
 normalized: number;
 multiplier: number;
 base: number;
 benefit: number;
 price: number;
 currency: number;
 stock: number;
 shortfall: number;
 affordable: boolean;
}

export interface CapturedOrdinaryLinks {
 playerId: number;
 playerName: string;
 primaryGodId: number | null;
 secondaryGodId: number | null;
}

export interface Part2AccountRun {
 data: Map<string, any>;
 save: Cloudsave;
 process: typeof updateIdleonData;
}

// Registrations keep domain instances. Isolate modules to create a fresh real account owner.
export function freshPart2Account(): Part2AccountRun {
 let run: Part2AccountRun;
 jest.isolateModules(() => {
  const loader: typeof SaveLoader = require('../../utils/cloudsave-loader');
  const pipeline: typeof AccountPipeline = require('../../../data/domain/idleonData');
  const items: typeof AccountItems = require('../../../data/domain/items');
  const save = loader.loadTestSave('latest');
  const account = pipeline.initAccountDataKeys(items.initAllItems());
  const data = pipeline.updateIdleonData(account, save, save.get('playerNames'),
   normalizeCompanionStates(save.get('companions')), save.get('servervars'), true).getData();
  loader.validateGameDataStructure(data);
  run = { data, save, process: pipeline.updateIdleonData };
 });
 return run!;
}

export function compareCore(actual: number | null, expected: number | string | null, context: string): void {
 if (expected === null) {
  expect(actual).toBeNull();
  return;
 }
 expect(actual).not.toBeNull();
 expect(actual).toMatchLiveGameWithDetails(normalizeExtractedValue(expected), { tolerance: 0, context });
}

export function assertPocketCharacterBinding(data: Map<string, any>, results: ExtractionResults): void {
 const hole = data.get('hole') as Hole;
 const pocket = hole.majiks.pocketDivinity;
 const players = data.get('players') as Player[];
 const divinity = data.get('divinity') as Divinity;
 const ordinary = captured<CapturedOrdinaryLinks[]>(results, 'ordinary_links');
 const dootOwned = getCompanionActiveBonus(data.get('companions') as Companion[], 0) > 0;
 expect(pocket.characters.map(character => [character.playerId, character.playerName]))
  .toEqual(players.map(player => [player.playerID, player.playerName]));
 expect(ordinary.map(character => [character.playerId, character.playerName]))
  .toEqual(players.map(player => [player.playerID, player.playerName]));
 expect(new Set(pocket.characters.map(character => character.playerId)).size).toBe(players.length);
 pocket.characters.forEach(character => {
  const player = players.find(player => player.playerID === character.playerId)!;
  const links = divinity.playerInfo.find(info => info.playerIndex === player.playerID)!;
  const saved = ordinary.find(info => info.playerId === player.playerID)!;
  expect(character.primaryGodId).toBe(saved.primaryGodId);
  expect(character.secondaryGodId).toBe(saved.secondaryGodId);
  expect(links.primaryGod?.index ?? null).toBe(saved.primaryGodId);
  expect(links.esGod?.index ?? null).toBe(saved.secondaryGodId);
  const eligible = dootOwned && player.skills.get(SkillsIndex.Divinity)!.level >= 2;
  expect(character.dootEligible).toBe(eligible);
  expect(links.dootActive).toBe(eligible);
  expect(links.gods).not.toBe(divinity.gods);
  expect(character.ordinaryLinksAvailable).toBe(true);
  expect(character.pocketActivationAvailable).toBe(true);
  const ordinaryGodIds = saved.primaryGodId === null ? [] : [saved.primaryGodId];
  if (saved.primaryGodId !== null && saved.secondaryGodId !== null && divinity.gods[saved.secondaryGodId].unlocked) {
   if (!ordinaryGodIds.includes(saved.secondaryGodId)) ordinaryGodIds.push(saved.secondaryGodId);
  }
  expect(links.ordinaryGods.map(god => god.index)).toEqual(ordinaryGodIds);
  const previous = eligible ? divinity.gods.map(god => god.index) : ordinaryGodIds;
  const effective = [...new Set([...previous, ...pocket.linkedGods])];
  expect(character.pocketGodIds).toEqual(pocket.linkedGods);
  expect(character.overlappingGodIds).toEqual(pocket.linkedGods.filter(id => previous.includes(id)));
  expect(character.addedGodIds).toEqual(pocket.linkedGods.filter(id => !previous.includes(id)));
  expect(character.effectiveGodIds).toEqual(effective);
  expect(new Set(character.effectiveGodIds).size).toBe(character.effectiveGodIds!.length);
  expect(new Set(links.gods.map(god => god.index)).size).toBe(links.gods.length);
  effective.forEach(id => expect(links.isLinkedToGod(id)).toBe(true));
  expect(character.allStatPercent).toBe(eligible ? 15 * pocket.level : 0);
 });
 divinity.gods.forEach(god => {
  expect(new Set(god.linkedPlayers.map(player => player.playerID)).size).toBe(god.linkedPlayers.length);
 });

 // Only this character was active in the original runtime. Other rows check real parsed identity binding.
 const active = pocket.characters.find(character => character.playerId === TARGET_PLAYER_INDEX)!;
 const runtimeGods = captured<{ id: number; active: boolean }[]>(results, 'active_gods');
 expect(active.dootEligible).toBe(normalizeExtractedValue(results.extractions.effective_doot.result) > 0);
 expect(active.primaryGodId).toBe(normalizeExtractedValue(results.extractions.active_primary_god.result));
 expect(active.effectiveGodIds).toEqual(runtimeGods.filter(god => god.active).map(god => god.id));
 compareCore(active.allStatPercent, normalizeExtractedValue(results.extractions.pocket_all_stat.result), 'Player 3 Pocket All Stat contribution');
 runtimeGods.forEach(god => {
  const activeLinks = divinity.playerInfo.find(info => info.playerIndex === TARGET_PLAYER_INDEX)!;
  expect(activeLinks.isLinkedToGod(god.id)).toBe(god.active);
 });
}
