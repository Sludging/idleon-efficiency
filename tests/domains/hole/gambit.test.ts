import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { captured, coreNumber } from './part1-test-helpers';

describe('Gambit account progress and rewards', () => {
 let hole: Hole;
 let summoning: Summoning;
 let results: ExtractionResults;

 beforeAll(() => {
  results = loadExtractionResults('hole-gambit-data.json');
  validateExtractionHealth(results);
  const data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  summoning = data.get('summoning') as Summoning;
 });

 it('matches all six best run times and their total', () => {
  const times = captured<number[]>(results, 'run_times');
  expect(hole.gambit.challenges).toHaveLength(times.length);
  hole.gambit.challenges.forEach(challenge => {
   expect(challenge.maxTime).toMatchLiveGameWithDetails(times[challenge.index], {
    tolerance: 0, context: `${challenge.name} best time in seconds`,
   });
  });
  coreNumber(hole.gambit.getGambitTotalTime(), results, 'total_time', 'Total Gambit time in seconds');
 });

 it('matches base points, final points, and the points multiplier', () => {
  coreNumber(hole.gambit.getGambitBaseScore(), results, 'base_points', 'Gambit points before the account multiplier');
  coreNumber(hole.gambit.getGambitTotalScore(), results, 'final_points', 'Final Gambit points');
  coreNumber(hole.gambit.gambitPointsMulti, results, 'points_multiplier', 'Gambit points multiplier');
 });

 it('matches total and available Summoning Doublers through their owner', () => {
  coreNumber(summoning.summoningDoublersOwned, results, 'doublers_total', 'Total Summoning Doublers');
  coreNumber(summoning.summoningDoublersAvailable, results, 'doublers_available', 'Available Summoning Doublers');
 });

 it('matches every reward threshold, active effect, and unlock state', () => {
  const thresholds = captured<number[]>(results, 'reward_thresholds');
  const effects = captured<number[]>(results, 'reward_effects');
  const unlocked = captured<boolean[]>(results, 'reward_unlocked');
  expect(hole.gambit.bonuses).toHaveLength(thresholds.length);
  hole.gambit.bonuses.forEach(bonus => {
   expect(bonus.getScoreThreshold()).toMatchLiveGameWithDetails(thresholds[bonus.index], {
    tolerance: 0, context: `Gambit reward ${bonus.index} points requirement`,
   });
   expect(hole.gambit.getBonus(bonus.index)).toMatchLiveGameWithDetails(effects[bonus.index], {
    tolerance: 0, context: `Gambit reward ${bonus.index} active numeric effect`,
   });
   expect(bonus.unlocked).toBe(unlocked[bonus.index]);
  });
 });

 it('matches the score-scaled reward multipliers', () => {
  // Compare full-precision effects, not the native description's display-only floor.
  const multipliers = captured<Record<string, number>>(results, 'reward_multipliers');
  Object.entries(multipliers).forEach(([index, expected]) => {
   const bonus = hole.gambit.bonuses.find(bonus => bonus.index === Number(index))!;
   expect(bonus.getMultiplier(hole.gambit.getGambitTotalScore())).toMatchLiveGameWithDetails(expected, {
    tolerance: 0, context: `Gambit reward ${index} effect multiplier`,
   });
  });
 });

 it('matches current reward projections without changing earned rewards', () => {
  const score = hole.gambit.getGambitTotalScore();
  const effects = captured<number[]>(results, 'reward_effects');
  hole.gambit.bonuses.forEach(bonus => {
   expect(bonus.getBonusAtScore(score)).toMatchLiveGameWithDetails(effects[bonus.index], {
    tolerance: 0, context: `Gambit reward ${bonus.index} current score projection`,
   });
  });
 });

 it('projects useful effects at ten million points from the verified game formulas', () => {
  // The game divides natural logarithms by 2.30259, not the exact logarithm of ten.
  // These target values come from the source formulas, not an alternate-score native capture.
  const score = 10000000;
  const bonuses = hole.gambit.bonuses;
  expect(bonuses[0].getBonusAtScore(score)).toBe(22);
  expect(bonuses[3].getBonusAtScore(score)).toBe(174.99962706081328);
  expect(bonuses[5].getMultiplierAtScore(score)).toBe(2.7499962706081327);
  expect(bonuses[7].getMultiplierAtScore(score)).toBe(1.6999985082432532);
  expect(bonuses[8].getMultiplierAtScore(score)).toBe(7.999985082432532);
  expect(bonuses[11].getMultiplierAtScore(score)).toBe(2.7499962706081327);
 });

 it('projects the source-derived rewards at the next whole-point Opal milestone', () => {
  // This controlled score is the seventh Opal boundary, not a mutated account or native target capture.
  const score = 10000344;
  const bonuses = hole.gambit.bonuses;
  expect(hole.gambit.getOpalsAtScore(score)).toBe(7);
  expect(hole.gambit.getOpalsAtScore(score - 1)).toBe(6);
  expect(bonuses[0].getBonusAtScore(score)).toBe(22);
  expect(bonuses[3].getBonusAtScore(score)).toBe(175.00000054684782);
  expect(bonuses[5].getMultiplierAtScore(score)).toBe(2.750000005468478);
  expect(bonuses[7].getMultiplierAtScore(score)).toBe(1.7000000021873913);
  expect(bonuses[8].getMultiplierAtScore(score)).toBe(8.000000021873912);
  expect(bonuses[11].getMultiplierAtScore(score)).toBe(2.750000005468478);
 });

 it('uses the requested score for reward gates and preserves current ownership', () => {
  const score = hole.gambit.getGambitTotalScore();
  const effects = captured<number[]>(results, 'reward_effects');
  const unlocked = captured<boolean[]>(results, 'reward_unlocked');
  hole.gambit.bonuses.forEach(bonus => {
   expect(bonus.getBonusAtScore(0)).toBe(0);
   expect(bonus.getMultiplierAtScore(0)).toBe(1);
   // At its exact threshold, each exported reward grants a positive value.
   expect(bonus.getBonusAtScore(bonus.getScoreThreshold())).toBeGreaterThan(0);
   expect(bonus.unlocked).toBe(unlocked[bonus.index]);
   expect(bonus.getBonus(score)).toMatchLiveGameWithDetails(effects[bonus.index], {
    tolerance: 0, context: `Gambit reward ${bonus.index} unchanged current effect after preview`,
   });
  });
 });

 it('targets the next unclaimed Opal from the saved Gambit count', () => {
  const foundOpals = captured<number>(results, 'opals_found');
  coreNumber(hole.gambit.getNextOpalScore(foundOpals), results, 'next_opal_score', 'Next unclaimed Gambit Opal points');
  const target = hole.gambit.getNextOpalScore(foundOpals);
  expect(hole.gambit.getOpalsAtScore(target)).toBe(foundOpals + 1);
  expect(hole.gambit.getOpalsAtScore(target - 1)).toBe(foundOpals);
 });

 it('matches cavern Opals through the existing Opal ledger', () => {
  const source = hole.opalLedger.sources.find(source => source.id === 'cavern:13')!;
  coreNumber(source.opals, results, 'opals_found', 'Gambit credited cavern Opals');
 });
});
