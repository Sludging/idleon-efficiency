import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { assertPairedContext, captured, coreNumber } from './part1-test-helpers';
import type { CapturedSchematic } from './part2-test-helpers';
import { compareCore } from './part2-test-helpers';

const numericEffects = [14, 45, 46, 47, 48, 52, 53, 54, 55, 56, 57, 58, 59, 82, 83, 84];
const intrinsicEffects = [15, 38, 41, 72, 73, 76, 80, 94];

describe('Hole Schematics catalogue, current purchases and owned effects', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let rows: CapturedSchematic[];

 beforeAll(() => {
  results = loadExtractionResults('hole-schematics-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  rows = captured<CapturedSchematic[]>(results, 'schematics');
 });

 it('pairs original character and preserves released game order without Bee String', () => {
  assertPairedContext(results, data);
  expect(hole.schematicCatalogue.map(schematic => schematic.index)).toEqual(rows.map(row => row.id));
  expect(hole.releasedSchematics.map(schematic => schematic.index)).toEqual(rows.filter(row => row.released).map(row => row.id));
  expect(hole.schematics).toHaveLength(106);
  expect(hole.releasedSchematics).toHaveLength(105);
  expect(hole.releasedSchematics.some(schematic => schematic.index === 31)).toBe(false);
  coreNumber(hole.schematicAvailabilityCount, results, 'availability', 'Kaipu available schematic count');
 });

 // Exhaustive small catalogue covers literal, Sediment, Harp, Rupie and Fountain price branches.
 Array.from({ length: 106 }, (_, slot) => slot).forEach(slot => {
  it(`matches catalogue slot ${slot} identity, access, ownership, price, wallet and shortfall`, () => {
   const row = rows[slot];
   const schematic = hole.schematicCatalogue[slot];
   expect(schematic.index).toBe(row.id);
   expect(schematic.data.name.replace(/_/g, ' ')).toBe(row.name.replace(/_/g, ' '));
   expect(schematic.availabilitySlot).toBe(row.slot);
   expect(schematic.released).toBe(row.released);
   expect(schematic.saveAvailable).toBe(true);
   expect(schematic.built).toBe(row.built);
   expect(schematic.available).toBe(row.available);
   expect(schematic.requiredKaipuLevel).toBe(row.requiredLevel);
   expect(schematic.currency.index).toBe(row.currency);
   expect(schematic.currency).toBe(hole.currencies.find(currency => currency.index === row.currency));
   compareCore(schematic.currency.stock, row.stock, `${row.name} spendable wallet`);
   compareCore(schematic.getCost(), row.price, `${row.name} original source price`);
   compareCore(schematic.currentCost, row.currentCost, `${row.name} next construction cost`);
   compareCore(schematic.shortfall, row.shortfall, `${row.name} construction shortfall`);
   expect(schematic.affordable).toBe(row.affordable);
   const owned = schematic.getEffects().find(effect => effect.key === `schematic:${row.id}:owned`)!;
   expect(owned.unit).toBe('rule');
   expect(owned.value).toBe(row.built);
  });
 });

 numericEffects.forEach(id => {
  it(`matches schematic ${id}'s owned numeric effect`, () => {
   const schematic = hole.schematics.find(schematic => schematic.index === id)!;
   const effect = schematic.getEffects().find(effect => effect.key === `schematic:${id}:bonus`)!;
   expect(schematic.numericBenefitAvailable).toBe(true);
   expect(typeof effect.value).toBe('number');
   coreNumber(effect.value as number, results, `effect_${id}`, `${schematic.data.name} owned benefit`);
  });
 });

 intrinsicEffects.forEach(id => {
  it(`matches schematic ${id}'s intrinsic contribution without claiming full cavern output`, () => {
   const schematic = hole.schematics.find(schematic => schematic.index === id)!;
   coreNumber(schematic.getIntrinsicBonus(), results, `intrinsic_${id}`, `${schematic.data.name} intrinsic benefit`);
   const effect = schematic.getEffects().find(effect => effect.key === `schematic:${id}:intrinsic`)!;
   expect(typeof effect.value).toBe('number');
   coreNumber(effect.value as number, results, `intrinsic_${id}`, `${schematic.data.name} public intrinsic effect`);
  });
 });

 it('keeps both Motherlode Trickledown effects and their distinct caller factors', () => {
  const effects = hole.schematics.find(schematic => schematic.index === 49)!.getEffects();
  for (const [key, extraction] of [['all-skill-exp', 'effect_49_10'], ['all-skill-efficiency', 'effect_49_15']]) {
   const effect = effects.find(effect => effect.key === key)!;
   expect(typeof effect.value).toBe('number');
   coreNumber(effect.value as number, results, extraction, `Motherlode Trickledown ${key}`);
  }
 });
});
