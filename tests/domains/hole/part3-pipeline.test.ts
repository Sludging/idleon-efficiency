import { ResourceCavren, ResourceCavrens } from '../../../data/domain/world-5/hole/hole';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Account } from '../../../data/domain/account';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { GoldenFood } from '../../../data/domain/golden-food';
import type { Votes } from '../../../data/domain/world-2/votes';

import { Card } from '../../../data/domain/cards';
import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Skilling } from '../../../data/domain/skilling';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';
import { getStatCards } from '../../../data/domain/player-stats';
import { getRightHandOfActionBonus } from '../../../data/domain/talents';

import { freshPart2Account } from './part2-test-helpers';

const skillSpecs = [
 { skill: SkillsIndex.Mining, name: 'Mining' },
 { skill: SkillsIndex.Chopping, name: 'Choppin' },
 { skill: SkillsIndex.Fishing, name: 'Fishing' },
 { skill: SkillsIndex.Catching, name: 'Catching' },
] as const;

const activePlayerGameOutputs = {
 Mining: 2.913318481483654e+26,
 Choppin: 5076045237411091000,
 Fishing: 4.2728452190364783e+21,
 Catching: 15372793386663366,
} as const;

function playerEfficiencyRows(data: Map<string, any>) {
 const players = data.get('players') as Player[];
 const skilling = data.get('skilling') as Skilling;
 return players.map(player => ({
  playerID: player.playerID,
  skills: skillSpecs.map(({ skill }) => [skill, skilling.getSkillEfficiency(player.playerID, skill)]),
 }));
}

function skillEfficiencySnapshot(data: Map<string, any>): string {
 return JSON.stringify(playerEfficiencyRows(data));
}


describe('Hole cavern resource shortfall', () => {
 it('reports only outstanding resources below, at, and above the requirement', () => {
  const cavern = new ResourceCavren(0, 'Motherload', 'Ores');
  const resourceRequirement = 200 * Math.pow(2.2, 1);
  const cases = [
   resourceRequirement - 1,
   resourceRequirement,
   resourceRequirement + 1,
  ];

  cases.forEach(current => {
   cavern.layerState = 0;
   cavern.resourceCurrent = current;
   cavern.prepare(0);

   expect(cavern.resourceCurrent).toBe(current);
   expect(cavern.resourceRequirement).toBe(resourceRequirement);
   expect(cavern.resourceRemaining).toBe(Math.max(0, resourceRequirement - current));
   expect(cavern.resourceRequirementMet).toBe(current >= resourceRequirement);
  });

 });
});

describe('Hole shared cavern claims', () => {
 it('returns remaining daily claims for known usage and unavailable for unknown usage', () => {
  const resourceCavrens = new ResourceCavrens();
  [
   { usage: 0, remaining: 6 },
   { usage: 2, remaining: 4 },
   { usage: 6, remaining: 0 },
   { usage: 8, remaining: 0 },
  ].forEach(({ usage, remaining }) => {
   resourceCavrens.sharedClaimCounter = usage;
   expect(resourceCavrens.getRemainingSharedClaims()).toBe(remaining);
  });
  resourceCavrens.sharedClaimCounter = null;
  expect(resourceCavrens.getRemainingSharedClaims()).toBeNull();
 });
});

describe('Hole part 3 character skill efficiencies and saved cavern assignments', () => {
 it('calculates every character skill, matches active Player 3 runtime output, and binds saved assignments by player ID', () => {
  const run = freshPart2Account();
  const data = run.data;
  const players = data.get('players') as Player[];
  const hole = data.get('hole') as Hole;
  const skilling = data.get('skilling') as Skilling;
  expect(hole.getResearchExpUpgradeBonus()).toBe(hole.researchExpUpgradeLevel);

  const assignments = hole.resourceCavrens.characterAssignments!;

  players.forEach(player => {
   skillSpecs.forEach(({ skill }) => {
    expect(Number.isFinite(skilling.getSkillEfficiency(player.playerID, skill))).toBe(true);
   });
  });

  const account = data.get('account') as Account;
  const alchemy = data.get('alchemy') as Alchemy;
  const goldenFood = data.get('goldenFood') as GoldenFood;
  const votes = data.get('votes') as Votes;
  const activePlayer = players.find(player => player.playerID === TARGET_PLAYER_INDEX)!;
  expect(activePlayer.stats.strength).toMatchLiveGameWithDetails(6578131, { tolerance: 0, context: 'Player 3 STR' });
  expect(activePlayer.stats.wisdom).toMatchLiveGameWithDetails(2264517, { tolerance: 0, context: 'Player 3 WIS' });
  expect(activePlayer.stats.agility).toMatchLiveGameWithDetails(2261752, { tolerance: 0, context: 'Player 3 AGI' });
  expect(activePlayer.stats.getSkillPower(SkillsIndex.Mining)).toMatchLiveGameWithDetails(138292.01483685424, { tolerance: 0, context: 'Player 3 Mining Power' });
  expect(activePlayer.stats.getSkillPower(SkillsIndex.Chopping)).toMatchLiveGameWithDetails(70755.73287807195, { tolerance: 0, context: 'Player 3 Choppin Power' });
  [
   { index: 24, value: 77, name: 'Mining' },
   { index: 27, value: 151, name: 'Choppin' },
   { index: 30, value: 175, name: 'Fishing' },
   { index: 32, value: 255, name: 'Catching' },
  ].forEach(({ index, value, name }) => {
   expect(Card.GetTotalBonusForId(getStatCards(activePlayer), index)).toMatchLiveGameWithDetails(value, {
    tolerance: 0, context: `Player 3 ${name} card factor`,
   });
  });
  expect(activePlayer.stats.getSkillPower(SkillsIndex.Fishing)).toMatchLiveGameWithDetails(28264.776733807124, { tolerance: 0, context: 'Player 3 Fishing Power' });
  expect(activePlayer.stats.getSkillPower(SkillsIndex.Catching)).toMatchLiveGameWithDetails(25737.334226563547, { tolerance: 0, context: 'Player 3 Catching Power' });
  expect(activePlayer.stats.getSkillStatsDN(SkillsIndex.Fishing)).toMatchLiveGameWithDetails(33314.91905054332, { tolerance: 0, context: 'Player 3 cached SkillStatsDN' });
  expect(activePlayer.fishingToolkitPower).toBe(1);
  expect(account.minigameHighscores[1]).toBe(26);
  expect(alchemy.getBubbleBonusForKey('ToolW', activePlayer)).toMatchLiveGameWithDetails(4405.484211371604, { tolerance: 0, context: 'Player 3 ToolW' });
  expect(alchemy.getBubbleBonusForKey('ToolM', activePlayer)).toMatchLiveGameWithDetails(461.4679314636946, { tolerance: 0, context: 'Player 3 ToolM' });
  expect(alchemy.getBubbleBonusForKey('ToolA', activePlayer)).toMatchLiveGameWithDetails(461.581743906173, { tolerance: 0, context: 'Player 3 ToolA' });
  expect(alchemy.getVialBonusForKey('MinEff')).toMatchLiveGameWithDetails(69.16, { tolerance: 0, context: 'Player 3 MinEff vial' });
  expect(goldenFood.getEffectivity(activePlayer)).toMatchLiveGameWithDetails(750.2014291918579, { tolerance: 0, context: 'Player 3 GoldFoodBonus MULTI' });
  ['MinEffPct', 'ChopEffPct', 'FishEffPct', 'CatchEffPct'].forEach(key => {
   expect(activePlayer.getPostOfficeBonus(key)).toMatchLiveGameWithDetails(
    33.333333333333336, { tolerance: 0, context: `Player 3 ${key}` });
  });
  expect(alchemy.getBubbleBonusForKey('MinEff', activePlayer)).toMatchLiveGameWithDetails(40557.24973547218, { tolerance: 0, context: 'Player 3 MinEff bubble' });
  expect(activePlayer.starSigns.reduce((total, sign) => total + sign.getBonus('Mining Efficiency'), 0)).toBe(50);
  expect(activePlayer.starSigns.reduce((total, sign) => total + sign.getBonus('Chop Efficiency'), 0)).toBe(50);
  expect(activePlayer.starSigns.reduce((total, sign) => total + sign.getBonus('Fishing Efficiency'), 0)).toBe(50);
  expect(activePlayer.starSigns.reduce((total, sign) => total + sign.getBonus('Catch Efficiency'), 0)).toBe(50);
  skillSpecs.forEach(({ skill }) => {
   expect(getRightHandOfActionBonus(players, activePlayer, skill)).toBe(103.125);
  });
  expect(TARGET_PLAYER_INDEX).toBe(3);
  expect(activePlayer.playerName).toBe('Sludgev4');
  expect(assignments[activePlayer.playerID]).toBe(-1);
  [
   { index: 7, name: 'Mining' },
   { index: 9, name: 'Choppin' },
   { index: 8, name: 'Fishing' },
   { index: 10, name: 'Catching' },
  ].forEach(({ index, name }) => {
   expect(votes.getCurrentBonus(index)).toMatchLiveGameWithDetails(0, {
    tolerance: 0, context: `Player 3 ${name} VotingBonusz`,
   });
  });
  skillSpecs.forEach(({ skill, name }) => {
   expect(skilling.getSkillEfficiency(activePlayer.playerID, skill)).toMatchLiveGameWithDetails(
    activePlayerGameOutputs[name],
    { tolerance: 0, context: `Unassigned Player 3 ${name} efficiency from the same-startup 1.22 runtime` },
   );
  });

  const cavernSpecs = [
   { name: 'Motherload', cavernId: 1, skill: SkillsIndex.Mining },
   { name: 'The Hive', cavernId: 7, skill: SkillsIndex.Catching },
   { name: 'Evertree', cavernId: 11, skill: SkillsIndex.Chopping },
   { name: 'The Bottomless Trench', cavernId: 16, skill: SkillsIndex.Fishing },
  ] as const;
  cavernSpecs.forEach(({ name, cavernId, skill }) => {
   const cavern = hole.resourceCavrens.cavrens[name];
   expect(cavern.cavernId).toBe(cavernId);
   const expectedPlayers = players.filter(player => assignments[player.playerID] === cavernId);
   expect(cavern.characterCapabilities.map(capability => capability.playerID))
    .toEqual(expectedPlayers.map(player => player.playerID));
   cavern.characterCapabilities.forEach(capability => {
    const player = players.find(candidate => candidate.playerID === capability.playerID)!;
    expect(assignments[player.playerID]).toBe(cavernId);
    expect(capability.skill).toBe(skill);
    expect(capability.efficiency).toBe(skilling.getSkillEfficiency(player.playerID, skill));
   });
  });
  expect(Object.values(hole.resourceCavrens.cavrens)
   .flatMap(cavern => cavern.characterCapabilities)
   .some(capability => capability.playerID === activePlayer.playerID)).toBe(false);
 });

 it('replaces character-keyed outputs on fresh imports and re-imports without changing saved state', () => {
  const first = freshPart2Account();
  const firstSnapshot = skillEfficiencySnapshot(first.data);
  const playerNames = first.save.get('playerNames') as string[];
  const reducedRoster = playerNames.slice(0, 3);
  const replacement = freshPart2Account(reducedRoster);
  const reducedSnapshot = skillEfficiencySnapshot(replacement.data);
  const saveBefore = JSON.stringify(replacement.save);

  expect(replacement.data).not.toBe(first.data);
  expect(replacement.data.get('skilling')).not.toBe(first.data.get('skilling'));
  expect(reducedSnapshot).not.toBe(firstSnapshot);

  const reducedPlayers = replacement.data.get('players') as Player[];
  const skilling = replacement.data.get('skilling') as Skilling;
  expect(reducedPlayers.map(player => player.playerID)).toEqual([0, 1, 2]);
  reducedPlayers.forEach(player => {
   skillSpecs.forEach(({ skill }) => {
    expect(Number.isFinite(skilling.getSkillEfficiency(player.playerID, skill))).toBe(true);
   });
  });
  for (let playerID = 3; playerID < playerNames.length; playerID++) {
   expect(() => skilling.getSkillEfficiency(playerID, SkillsIndex.Mining))
    .toThrow(`Skill efficiency has not been calculated for player ${playerID} and skill ${SkillsIndex.Mining}`);
  }

  replacement.data = replacement.process(replacement.data, replacement.save, reducedRoster,
   normalizeCompanionStates(replacement.save.get('companions')), replacement.save.get('servervars'), true).getData();
  expect(skillEfficiencySnapshot(replacement.data)).toBe(reducedSnapshot);
  expect(JSON.stringify(replacement.save)).toBe(saveBefore);
 });
});
