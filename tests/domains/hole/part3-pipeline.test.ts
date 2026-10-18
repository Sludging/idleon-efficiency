import { ResourceCavren, ResourceCavrens } from '../../../data/domain/world-5/hole/hole';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { GoldenFood } from '../../../data/domain/golden-food';
import type { Votes } from '../../../data/domain/world-2/votes';
import { Card } from '../../../data/domain/cards';
import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Skilling } from '../../../data/domain/skilling';
import { getExtractedValue, loadExtractionResults, normalizeExtractedValue, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';
import { getStatCards } from '../../../data/domain/player-stats';
import { getRightHandOfActionBonus } from '../../../data/domain/talents';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { freshPart2Account } from './part2-test-helpers';

const attributeResultsName = 'player-attributes-data.json';
const powerResultsName = 'player-powers-data.json';
const bubbleResultsName = 'bubble-bonus-data.json';
const goldenFoodResultsName = 'golden-food-data.json';

const skillResultsName = 'hole-character-skill-efficiencies-data.json';
function getObjectResult<T>(results: ExtractionResults, label: string): T {
 const extraction = results.extractions[label];
 if (!extraction) {
  throw new Error(`Extraction '${label}' not found in results. Available: ${Object.keys(results.extractions).join(', ')}`);
 }
 if (results.errors[label]) {
  throw new Error(`Extraction '${label}' failed: ${results.errors[label].error}`);
 }
 return extraction.result as T;
}


let attributeResults: ExtractionResults;
let powerResults: ExtractionResults;
let bubbleResults: ExtractionResults;
let goldenFoodResults: ExtractionResults;
let skillResults: ExtractionResults;

const skillSpecs = [
 { skill: SkillsIndex.Mining, name: 'Mining' },
 { skill: SkillsIndex.Chopping, name: 'Choppin' },
 { skill: SkillsIndex.Fishing, name: 'Fishing' },
 { skill: SkillsIndex.Catching, name: 'Catching' },
] as const;

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
 beforeAll(() => {
  attributeResults = loadExtractionResults(attributeResultsName);
  powerResults = loadExtractionResults(powerResultsName);
  bubbleResults = loadExtractionResults(bubbleResultsName);
  goldenFoodResults = loadExtractionResults(goldenFoodResultsName);
  skillResults = loadExtractionResults(skillResultsName);
  [attributeResults, powerResults, bubbleResults, goldenFoodResults, skillResults].forEach(validateExtractionHealth);
 });
 it('calculates every character skill, matches selected-player runtime output, and binds saved assignments by player ID', () => {
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

  const alchemy = data.get('alchemy') as Alchemy;
  const goldenFood = data.get('goldenFood') as GoldenFood;
  const votes = data.get('votes') as Votes;
  const activePlayer = players.find(player => player.playerID === TARGET_PLAYER_INDEX)!;
  const attributes = getObjectResult<Record<string, unknown>>(attributeResults, 'attributes');
  const powers = getObjectResult<{ powers: Record<string, unknown> }>(powerResults, 'powers').powers;
  expect(activePlayer.stats.strength).toMatchLiveGameWithDetails(normalizeExtractedValue(attributes.strength), { tolerance: 0, context: `Player ${activePlayer.playerID} STR` });
  expect(activePlayer.stats.wisdom).toMatchLiveGameWithDetails(normalizeExtractedValue(attributes.wisdom), { tolerance: 0, context: `Player ${activePlayer.playerID} WIS` });
  expect(activePlayer.stats.agility).toMatchLiveGameWithDetails(normalizeExtractedValue(attributes.agility), { tolerance: 0, context: `Player ${activePlayer.playerID} AGI` });
  expect(activePlayer.stats.getSkillPower(SkillsIndex.Mining)).toMatchLiveGameWithDetails(normalizeExtractedValue(powers.mining), { tolerance: 0, context: `Player ${activePlayer.playerID} Mining Power` });
  expect(activePlayer.stats.getSkillPower(SkillsIndex.Chopping)).toMatchLiveGameWithDetails(normalizeExtractedValue(powers.chopping), { tolerance: 0, context: `Player ${activePlayer.playerID} Choppin Power` });
  [
   { index: 24, key: 'mining_card_factor', name: 'Mining' },
   { index: 27, key: 'chopping_card_factor', name: 'Choppin' },
   { index: 30, key: 'fishing_card_factor', name: 'Fishing' },
   { index: 32, key: 'catching_card_factor', name: 'Catching' },
  ].forEach(({ index, key, name }) => {
   expect(Card.GetTotalBonusForId(getStatCards(activePlayer), index)).toMatchLiveGameWithDetails(
    getExtractedValue(skillResults, key),
    { tolerance: 0, context: `Player ${activePlayer.playerID} ${name} card factor` },
   );
  });
  expect(activePlayer.stats.getSkillPower(SkillsIndex.Fishing)).toMatchLiveGameWithDetails(normalizeExtractedValue(powers.fishing), { tolerance: 0, context: `Player ${activePlayer.playerID} Fishing Power` });
  expect(activePlayer.stats.getSkillPower(SkillsIndex.Catching)).toMatchLiveGameWithDetails(normalizeExtractedValue(powers.catching), { tolerance: 0, context: `Player ${activePlayer.playerID} Catching Power` });
  expect(activePlayer.stats.getSkillStatsDN(SkillsIndex.Fishing)).toMatchLiveGameWithDetails(getExtractedValue(skillResults, 'fishing_skill_stats_dn'), { tolerance: 0, context: `Player ${activePlayer.playerID} cached Fishing SkillStatsDN` });
  expect(alchemy.getBubbleBonusForKey('ToolW', activePlayer)).toMatchLiveGameWithDetails(getExtractedValue(bubbleResults, 'ordinary_tool_w_final_bonus'), { tolerance: 0, context: `Player ${activePlayer.playerID} ToolW` });
  expect(alchemy.getBubbleBonusForKey('ToolM', activePlayer)).toMatchLiveGameWithDetails(getExtractedValue(skillResults, 'tool_m_final_bonus'), { tolerance: 0, context: `Player ${activePlayer.playerID} ToolM` });
  expect(alchemy.getBubbleBonusForKey('ToolA', activePlayer)).toMatchLiveGameWithDetails(getExtractedValue(skillResults, 'tool_a_final_bonus'), { tolerance: 0, context: `Player ${activePlayer.playerID} ToolA` });
  expect(alchemy.getVialBonusForKey('MinEff')).toMatchLiveGameWithDetails(getExtractedValue(skillResults, 'mining_efficiency_vial'), { tolerance: 0, context: `Player ${activePlayer.playerID} MinEff vial` });
  expect(goldenFood.getEffectivity(activePlayer)).toMatchLiveGameWithDetails(getExtractedValue(goldenFoodResults, 'golden_effectivity'), { tolerance: 0, context: `Player ${activePlayer.playerID} GoldFoodBonus MULTI` });
  expect(alchemy.getBubbleBonusForKey('MinEff', activePlayer)).toMatchLiveGameWithDetails(getExtractedValue(bubbleResults, 'min_eff_final_bonus'), { tolerance: 0, context: `Player ${activePlayer.playerID} MinEff bubble` });
  [
   { key: 'MinEffPct', extractionKey: 'mining_post_office_efficiency', name: 'Mining' },
   { key: 'ChopEffPct', extractionKey: 'chopping_post_office_efficiency', name: 'Choppin' },
   { key: 'FishEffPct', extractionKey: 'fishing_post_office_efficiency', name: 'Fishing' },
   { key: 'CatchEffPct', extractionKey: 'catching_post_office_efficiency', name: 'Catching' },
  ].forEach(({ key, extractionKey, name }) => {
   expect(activePlayer.getPostOfficeBonus(key)).toMatchLiveGameWithDetails(getExtractedValue(skillResults, extractionKey), {
    tolerance: 0, context: `Player ${activePlayer.playerID} ${name} Post Office efficiency`,
   });
  });
  [
   { bonus: 'Mining Efficiency', extractionKey: 'mining_star_sign_efficiency', name: 'Mining' },
   { bonus: 'Chop Efficiency', extractionKey: 'chopping_star_sign_efficiency', name: 'Choppin' },
   { bonus: 'Fishing Efficiency', extractionKey: 'fishing_star_sign_efficiency', name: 'Fishing' },
   { bonus: 'Catch Efficiency', extractionKey: 'catching_star_sign_efficiency', name: 'Catching' },
  ].forEach(({ bonus, extractionKey, name }) => {
   const bonusTotal = activePlayer.starSigns.reduce((total, sign) => total + sign.getBonus(bonus), 0);
   expect(bonusTotal).toMatchLiveGameWithDetails(getExtractedValue(skillResults, extractionKey), {
    tolerance: 0, context: `Player ${activePlayer.playerID} ${name} Star Sign efficiency`,
   });
  });
  [
   { skill: SkillsIndex.Mining, key: 'mining_right_hand_bonus', name: 'Mining' },
   { skill: SkillsIndex.Chopping, key: 'chopping_right_hand_bonus', name: 'Choppin' },
   { skill: SkillsIndex.Fishing, key: 'fishing_right_hand_bonus', name: 'Fishing' },
   { skill: SkillsIndex.Catching, key: 'catching_right_hand_bonus', name: 'Catching' },
  ].forEach(({ skill, key, name }) => {
   expect(getRightHandOfActionBonus(players, activePlayer, skill)).toMatchLiveGameWithDetails(getExtractedValue(skillResults, key), {
    tolerance: 0, context: `Player ${activePlayer.playerID} ${name} Right Hand of Action`,
   });
  });
  [
   { index: 7, key: 'mining_voting_bonus', name: 'Mining' },
   { index: 9, key: 'chopping_voting_bonus', name: 'Choppin' },
   { index: 8, key: 'fishing_voting_bonus', name: 'Fishing' },
   { index: 10, key: 'catching_voting_bonus', name: 'Catching' },
  ].forEach(({ index, key, name }) => {
   expect(votes.getCurrentBonus(index)).toMatchLiveGameWithDetails(getExtractedValue(skillResults, key), {
    tolerance: 0, context: `Player ${activePlayer.playerID} ${name} VotingBonusz`,
   });
  });
  const efficiencySpecs = [
   { skill: SkillsIndex.Mining, key: 'mining_efficiency', name: 'Mining' },
   { skill: SkillsIndex.Chopping, key: 'chopping_efficiency', name: 'Choppin' },
   { skill: SkillsIndex.Fishing, key: 'fishing_efficiency', name: 'Fishing' },
   { skill: SkillsIndex.Catching, key: 'catching_efficiency', name: 'Catching' },
  ] as const;
  efficiencySpecs.forEach(({ skill, key, name }) => {
   expect(skilling.getSkillEfficiency(activePlayer.playerID, skill)).toMatchLiveGameWithDetails(
    getExtractedValue(skillResults, key),
    { tolerance: 0, context: `Player ${activePlayer.playerID} ${name} efficiency` },
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
 });

 it('replaces character-keyed outputs on fresh imports and re-imports without changing saved state', () => {
  const first = freshPart2Account();
  const playerNames = first.save.get('playerNames') as string[];
  const reducedRoster = playerNames.slice(0, 3);
  const replacement = freshPart2Account(reducedRoster);
  const reducedSnapshot = skillEfficiencySnapshot(replacement.data);
  const saveBefore = JSON.stringify(replacement.save);

  expect(replacement.data).not.toBe(first.data);
  expect(replacement.data.get('skilling')).not.toBe(first.data.get('skilling'));

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
