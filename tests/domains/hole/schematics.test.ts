import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { coreNumber } from './part1-test-helpers';
 
const numericEffects = [14, 45, 46, 47, 48, 52, 53, 54, 55, 56, 57, 58, 59, 82, 83, 84];
const intrinsicEffects = [15, 38, 41, 72, 73, 76, 80, 94];

describe('Hole Schematics numeric benefits', () => {
 let results: ExtractionResults;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-schematics-data.json');
  validateExtractionHealth(results);
  hole = loadGameDataFromSave('latest').get('hole') as Hole;
 });

 
 numericEffects.forEach(id => {
  it(`matches schematic ${id}'s owned numeric effect`, () => {
   const schematic = hole.schematics.find(schematic => schematic.index === id)!;
   const effect = schematic.getEffects().find(effect => effect.key === `schematic:${id}:bonus`)!;
   coreNumber(effect.value as number, results, `effect_${id}`, `${schematic.data.name} owned benefit`);
  });
 });

 intrinsicEffects.forEach(id => {
  it(`matches schematic ${id}'s intrinsic contribution`, () => {
   const schematic = hole.schematics.find(schematic => schematic.index === id)!;
   coreNumber(schematic.getIntrinsicBonus(), results, `intrinsic_${id}`, `${schematic.data.name} intrinsic benefit`);
  });
 });

 it('keeps both Motherlode Trickledown effects and their distinct caller factors', () => {
  const effects = hole.schematics.find(schematic => schematic.index === 49)!.getEffects();
  for (const [key, extraction] of [['all-skill-exp', 'effect_49_10'], ['all-skill-efficiency', 'effect_49_15']]) {
   const effect = effects.find(effect => effect.key === key)!;
   coreNumber(effect.value as number, results, extraction, `Motherlode Trickledown ${key}`);
  }
 });
});
