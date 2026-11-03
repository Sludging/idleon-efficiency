import { BraveryMonument, Hole, JusticeMonument, WisdomMonument } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { captured, coreNumber } from './part1-test-helpers';

describe('Hole monuments', () => {
 let hole: Hole;
 let results: ExtractionResults;

 beforeAll(() => {
  results = loadExtractionResults('hole-monuments-data.json');
  validateExtractionHealth(results);
  hole = loadGameDataFromSave('latest').get('hole') as Hole;
  expect(captured(results, 'normal_story_context')).toEqual({
   braveryRound: 0, braveryDamageBoost: 0, wisdomMode: 0,
  });
 });

 it('calculates Bravery starting damage and story resources', () => {
  const bravery = hole.monuments.monuments.Bravery as BraveryMonument;
  coreNumber(bravery.minimumDamage, results, 'bravery_minimum_damage', 'Bravery minimum sword damage');
  coreNumber(bravery.maximumDamage, results, 'bravery_maximum_damage', 'Bravery maximum sword damage');
  coreNumber(bravery.swords, results, 'bravery_swords', 'Bravery starting swords');
  coreNumber(bravery.rethrows, results, 'bravery_rethrows', 'Bravery maximum rethrows');
  coreNumber(bravery.retellings, results, 'bravery_retellings', 'Bravery maximum retellings');
 });

 it('calculates Justice starting court resources', () => {
  const justice = hole.monuments.monuments.Justice as JusticeMonument;
  coreNumber(justice.mentalHealth, results, 'justice_mental_health', 'Justice starting mental health');
  coreNumber(justice.coins, results, 'justice_coins', 'Justice starting coins');
  coreNumber(justice.popularity, results, 'justice_popularity', 'Justice starting popularity');
  coreNumber(justice.dismissals, results, 'justice_dismissals', 'Justice maximum dismissals');
 });

 it('calculates Wisdom attempts, match duration, and instant matches', () => {
  const wisdom = hole.monuments.monuments.Wisdom as WisdomMonument;
  coreNumber(wisdom.attempts, results, 'wisdom_attempts', 'Wisdom starting attempts');
  coreNumber(wisdom.attemptsPerRound, results, 'wisdom_attempts_per_round', 'Wisdom attempts per completed board');
  coreNumber(wisdom.secondsPerMatch, results, 'wisdom_seconds_per_match', 'Wisdom seconds per match');
  coreNumber(wisdom.instantMatches, results, 'wisdom_instant_matches', 'Wisdom instant matches');
 });

 ['Bravery', 'Justice', 'Wisdom'].forEach(name => {
  it(`calculates ${name} hours, story rewards, readiness, and bonus progress`, () => {
   const monument = hole.monuments.monuments[name];
   const prefix = name.toLowerCase();
   coreNumber(monument.hours, results, `${prefix}_hours`, `${name} saved hours`);
   coreNumber(monument.rewardMultiplier, results, `${prefix}_reward_multiplier`, `${name} story reward multiplier`);
   coreNumber(monument.opalChancePercent, results, `${prefix}_opal_chance`, `${name} story Opal chance`);
   coreNumber(monument.secondsUntilReady, results, `${prefix}_seconds_until_ready`, `${name} native story wait estimate`);
   expect(monument.ready).toBe(captured<boolean>(results, `${prefix}_ready`));
   expect(monument.unlocks.map(unlock => unlock.unlocked)).toEqual(captured<boolean[]>(results, `${prefix}_unlocks`));
   coreNumber(monument.totalBonusLevels, results, `${prefix}_total_levels`, `${name} total bonus levels`);
   const progress = captured<{
    storedSeconds: number; linearLimitSeconds: number; removedBricks: number;
    nextUpgradeIndex: number | null; hoursRemaining: number; claimable: boolean;
   }[]>(results, 'story_progress')[monument.index];
   expect(monument.storedAttemptSeconds).toMatchLiveGameWithDetails(progress.storedSeconds, {
    tolerance: 0, context: `${name} stored story time in seconds`,
   });
   expect(monument.rewardLinearLimitSeconds).toMatchLiveGameWithDetails(progress.linearLimitSeconds, {
    tolerance: 0, context: `${name} full-rate reward growth window in seconds`,
   });
   expect(monument.unlocks.filter(unlock => unlock.unlocked)).toHaveLength(progress.removedBricks);
   const nextUpgrade = monument.nextStartingUpgrade;
   expect(nextUpgrade?.index ?? null).toBe(progress.nextUpgradeIndex);
   if (progress.nextUpgradeIndex !== null) {
    expect(nextUpgrade!.hoursRemaining).toBe(progress.hoursRemaining);
    expect(nextUpgrade!.claimable).toBe(progress.claimable);
   }
   const expected = captured<{ level: number; bonus: number; perLevelIncrement: number | null; bonusCap: number | null; capTargetLevel: number | null; progressPercent: number | null }[]>(results, `${prefix}_bonuses`);
   monument.bonuses.forEach((bonus, index) => {
    expect(bonus.level).toBe(expected[index].level);
    expect(bonus.getBonus()).toMatchLiveGameWithDetails(expected[index].bonus, { tolerance: 0, context: `${name} bonus ${index}` });
    expect(bonus.perLevelIncrement).toBe(expected[index].perLevelIncrement);
    for (const key of ['bonusCap', 'capTargetLevel', 'progressPercent'] as const) {
     if (expected[index][key] === null) {
      expect(bonus[key]).toBeNull();
     } else {
      expect(bonus[key]).toMatchLiveGameWithDetails(expected[index][key], { tolerance: 0, context: `${name} bonus ${index} ${key}` });
     }
    }
   });
   const opals = hole.opalLedger.sources.find(source => source.id === `cavern:${[3, 9, 12][monument.index]}`)!;
   coreNumber(opals.opals, results, `${prefix}_opals`, `${name} found Opals`);
  });
 });
});
