/**
 * Core comparisons for the regular account's six unlocked expedition islands.
 *
 * Native values belong to the retained latest save and player 3, Sludgev4.
 * This account exercises three unlocked and five locked Fractal bonuses.
 * Native scene outcomes were not captured for Crystal mobs, bottle collection,
 * garbage collection, or Shimmer rewards. These tests do not infer those values.
 * Existing Shimmer bonus comparisons remain in shimmer-bonuses.test.ts.
 */

import { Player } from '../../../data/domain/player';
import { IslandExpeditions } from '../../../data/domain/world-2/islandExpedition';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
 ExtractionResults,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';

interface NativeIslandState {
 options: [
  garbageDays: number,
  garbage: number,
  bottles: number,
  garbageGainLevel: number,
  bottleGainLevel: number,
  bribeSetUnlocked: number,
  lootLevel: number,
  doubleBossLevel: number,
  eventUsedThisWeek: number,
  islandTokens: string,
  bottleDays: number,
  crystalDays: number,
  dummyTargetBestDPS: number,
  shimmerCurrency: number,
  shimmerStrength: number,
  shimmerAgility: number,
  shimmerWisdom: number,
  shimmerLuck: number,
  shimmerDamage: number,
  shimmerClassExperience: number,
  shimmerSkillEfficiency: number,
  trialBest: number,
  rewardClaimed: number,
  trialIndex: number,
  fractalHours: number,
 ];
 letters: string[];
 bottleBonus: number;
 fractal: number[];
 shimmer: number;
}

interface NativeShimmerShop {
 costs: number[];
 thresholds: number[];
 trial: number;
 claimed: number;
}

const saveName = 'latest';
const playerIndex = 3;
const extractionResultsName = 'island-expeditions-state-data.json';

const savedValues = [
 { description: 'Message Bottle wallet', optionIndex: 2, getValue: (domain: IslandExpeditions) => domain.bottles },
 { description: 'unclaimed bottle days', optionIndex: 10, getValue: (domain: IslandExpeditions) => domain.collection.unclaimedDays },
 { description: 'Garbage wallet', optionIndex: 1, getValue: (domain: IslandExpeditions) => domain.trash.garbage },
 { description: 'unclaimed garbage days', optionIndex: 0, getValue: (domain: IslandExpeditions) => domain.trash.unclaimedDays },
 { description: 'Garbage gain upgrade level', optionIndex: 3, getValue: (domain: IslandExpeditions) => domain.trash.garbageGainLevel },
 { description: 'Message Bottle gain upgrade level', optionIndex: 4, getValue: (domain: IslandExpeditions) => domain.trash.bottleGainLevel },
 { description: 'Trash bribe-set unlock', optionIndex: 5, getValue: (domain: IslandExpeditions) => Number(domain.trash.bribeSetUnlocked) },
 { description: 'Rando loot upgrade level', optionIndex: 6, getValue: (domain: IslandExpeditions) => domain.rando.lootLevel },
 { description: 'Rando double-boss upgrade level', optionIndex: 7, getValue: (domain: IslandExpeditions) => domain.rando.doubleBossLevel },
 { description: 'weekly Rando event use', optionIndex: 8, getValue: (domain: IslandExpeditions) => Number(domain.rando.eventUsedThisWeek) },
 { description: 'unclaimed Crystal days', optionIndex: 11, getValue: (domain: IslandExpeditions) => domain.crystal.unclaimedDays },
 { description: 'account-wide best Dummy Target DPS', optionIndex: 12, getValue: (domain: IslandExpeditions) => domain.dummyTargetBestDPS },
 { description: 'Shimmer wallet', optionIndex: 13, getValue: (domain: IslandExpeditions) => domain.shimmer.currency },
 { description: 'weekly Shimmer trial best result', optionIndex: 21, getValue: (domain: IslandExpeditions) => domain.shimmer.trialBest },
 { description: 'weekly Shimmer reward claim', optionIndex: 22, getValue: (domain: IslandExpeditions) => Number(domain.shimmer.rewardClaimed) },
 { description: 'weekly Shimmer trial index', optionIndex: 23, getValue: (domain: IslandExpeditions) => domain.shimmer.trialIndex },
 { description: 'Nothing AFK hours', optionIndex: 24, getValue: (domain: IslandExpeditions) => domain.fractal.afkHours },
] as const;

const islands = ['Trash', 'Rando', 'Crystal', 'Seasalt', 'Shimmer', 'Fractal'] as const;
const shimmerBonuses = ['Base STR', 'Base AGI', 'Base WIS', 'Base LUK', 'Total Damage', 'Class EXP', 'Skill Efficiency'] as const;
const fractalBonuses = [
 'Nothing trophy chance',
 'Dungeon Credits and Flurbos',
 'Kitchen upgrade cost reduction',
 'Sailing artifact chance',
 'Dirty Shovel nugget gain',
 'Star Talent Points',
 'Ninja Twin stealth',
 'World 7 bonus',
] as const;

// Delivered game 1.24 fixes these contributions at 25, 30, and 100 per native unlock flag.
// See docs/plans/island-expeditions-game-evidence.md, Fractal Island.
const fractalContributions = [
 { description: 'Dirty Shovel nugget gain', flagIndex: 4, amount: 25, getValue: (domain: IslandExpeditions) => domain.bonusToShovelSpeed },
 { description: 'Kitchen upgrade cost reduction', flagIndex: 2, amount: 30, getValue: (domain: IslandExpeditions) => domain.reductionToKitchenCosts },
 { description: 'Star Talent Points', flagIndex: 5, amount: 100, getValue: (domain: IslandExpeditions) => domain.bonusStarTalentPoints },
] as const;

describe('Island Expeditions Domain - Account State and Numeric Outcomes', () => {
 let extractionResults: ExtractionResults;
 let nativeState: NativeIslandState;
 let nativeShimmerShop: NativeShimmerShop;
 let expeditions: IslandExpeditions;
 let player: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  nativeState = extractionResults.extractions.island_state.result as NativeIslandState;
  nativeShimmerShop = extractionResults.extractions.shimmer_shop_cache.result as NativeShimmerShop;

  const gameData = loadGameDataFromSave(saveName);
  expeditions = gameData.get('islandExpeditions') as IslandExpeditions;
  player = (gameData.get('players') as Player[])[playerIndex];
 });

 savedValues.forEach(({ description, optionIndex, getValue }) => {
  it(`matches the ${description}`, () => {
   expect(getValue(expeditions)).toMatchLiveGameWithDetails(nativeState.options[optionIndex], {
    tolerance: 0,
    context: description,
    debugInfo: { saveName, accountOptionIndex: 160 + optionIndex },
   });
  });
 });

 it('matches the number of recognized unlocked islands', () => {
  const unlockedCount = nativeState.letters.filter(token => nativeState.options[9].includes(token)).length;

  expect(expeditions.unlockedIslandCount).toMatchLiveGameWithDetails(unlockedCount, {
   tolerance: 0,
   context: 'Recognized unlocked expedition islands',
   debugInfo: { saveName, nativeTokens: nativeState.options[9], recognizedTokens: nativeState.letters },
  });
 });

 islands.forEach((name, index) => {
  it(`matches access to ${name} Island`, () => {
   const unlocked = nativeState.options[9].includes(nativeState.letters[index]);

   expect(Number(expeditions.isIslandUnlocked(index))).toMatchLiveGameWithDetails(Number(unlocked), {
    tolerance: 0,
    context: `${name} Island access`,
    debugInfo: { saveName, islandIndex: index, nativeToken: nativeState.letters[index] },
   });
  });
 });

 it('matches the active character Message Bottle gain bonus', () => {
  expect(expeditions.collection.getBottleGainPercent(player)).toMatchLiveGameWithDetails(nativeState.bottleBonus, {
   tolerance: 0,
   context: 'Message Bottle gain percentage points for player 3',
   debugInfo: { saveName, playerIndex },
  });
 });

 it('selects the weekly Shimmer trial observed in the native shop', () => {
  expect(expeditions.shimmer.currentTrial.index).toMatchLiveGameWithDetails(nativeShimmerShop.trial, {
   tolerance: 0,
   context: 'Current weekly Shimmer trial',
   debugInfo: { saveName, nativeAccountTrialIndex: nativeState.options[23] },
  });
 });

 shimmerBonuses.forEach((description, index) => {
  it(`matches the native next Shimmer cost for ${description}`, () => {
   expect(expeditions.shimmerBonuses[index].getNextCost()).toMatchLiveGameWithDetails(nativeShimmerShop.costs[index], {
    tolerance: 0,
    context: `Next Shimmer ${description} cost`,
    debugInfo: {
     saveName,
     bonusIndex: index,
     baseBonus: nativeState.options[14 + index],
     nativeBonusMultiplier: nativeState.shimmer,
    },
   });
  });
 });

 fractalBonuses.forEach((description, index) => {
  it(`matches the Fractal unlock for ${description}`, () => {
   expect(Number(expeditions.fractal.isBonusUnlocked(index))).toMatchLiveGameWithDetails(nativeState.fractal[index], {
    tolerance: 0,
    context: `Fractal ${description} unlock`,
    debugInfo: { saveName, bonusIndex: index, nativeAfkHours: nativeState.options[24] },
   });
  });
 });

 fractalContributions.forEach(({ description, flagIndex, amount, getValue }) => {
  it(`preserves the Fractal ${description} contribution`, () => {
   const nativeContribution = nativeState.fractal[flagIndex] * amount;

   expect(getValue(expeditions)).toMatchLiveGameWithDetails(nativeContribution, {
    tolerance: 0,
    context: `Fractal ${description} contribution`,
    debugInfo: { saveName, nativeFlag: nativeState.fractal[flagIndex], contributionPerUnlock: amount },
   });
  });
 });
});
