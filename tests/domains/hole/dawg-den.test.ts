import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { captured, coreNumber } from './part1-test-helpers';

describe('Dawg Den score, rewards and amplifier effects', () => {
 let results: ExtractionResults;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-dawg-den-data.json');
  validateExtractionHealth(results);
  hole = loadGameDataFromSave('latest').get('hole') as Hole;
 });

 it('exposes the saved best score', () => {
  coreNumber(hole.dawgDen.bestScore, results, 'best_score', 'Dawg Den best score');
 });

 it('calculates the next Opal score threshold', () => {
  coreNumber(hole.dawgDen.nextOpalScore, results, 'next_opal_score', 'Dawg Den next Opal score');
 });

 it('calculates the current score multiplier', () => {
  coreNumber(hole.dawgDen.scoreMultiplier, results, 'score_multiplier', 'Dawg Den score multiplier');
 });

 it('exposes earned Opals through the cavern ledger', () => {
  const source = hole.opalLedger.sources.find(source => source.id === 'cavern:2')!;
  coreNumber(source.opals, results, 'opals_found', 'Dawg Den earned Opals');
 });

 it('evaluates all eight saved amplifier levels and effects', () => {
  const expected = captured<{ index: number; level: number; effect: number }[]>(results, 'modifiers');
  expect(hole.dawgDen.modifiers.map(modifier => modifier.index)).toEqual(expected.map(modifier => modifier.index));

  hole.dawgDen.modifiers.forEach((modifier, index) => {
   expect(modifier.level).toMatchLiveGameWithDetails(expected[index].level, {
    tolerance: 0, context: `${modifier.data.name} amplifier level`,
   });
   expect(modifier.getEffect()).toMatchLiveGameWithDetails(expected[index].effect, {
    tolerance: 0, context: `${modifier.data.name} amplifier effect`,
   });
  });
 });
});
