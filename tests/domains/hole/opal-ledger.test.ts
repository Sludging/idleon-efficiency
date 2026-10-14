import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import type { CapturedHoleInputs } from './part1-test-helpers';
import { assertPairedContext, captured, coreNumber } from './part1-test-helpers';

const externalIds = ['gem-shop', 'grimoire', 'companion', 'compass', 'emperor', 'schematic', 'arcane', 'sushi'];

describe('Hole earned Opals, allocation effects and Another Try facts', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let inputs: CapturedHoleInputs;

 beforeAll(() => {
  results = loadExtractionResults('hole-opal-ledger-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  inputs = captured<CapturedHoleInputs>(results, 'paired_hole_inputs');
 });

 it('pairs actual ledger inputs rather than using the actor cached balance', () => {
  assertPairedContext(results, data);
 });

 Array.from({ length: 18 }, (_, index) => index).forEach(index => {
  it(`attributes cavern ${index} earned Opals to its source`, () => {
   const source = hole.opalLedger.sources.find(source => source.id === `cavern:${index}`)!;
   expect(source.owner).toBe(`cavern:${index}`);
   expect(source.name).toBe(hole.studies[index].data.name);
   expect(source.unit).toBe('Opals');
   expect(source.unavailableReason).toBeNull();
   coreNumber(source.opals, results, `cavern_${index}`, `Cavern ${index} earned Opals`);
  });
 });

 externalIds.forEach(id => {
  it(`includes the current ${id} external contribution once`, () => {
   const sources = hole.opalLedger.sources.filter(source => source.id === id);
   expect(sources).toHaveLength(1);
   expect(sources[0].unavailableReason).toBeNull();
   coreNumber(sources[0].opals, results, `source_${id}`, `${id} external Opals`);
  });
 });

 it('reconciles full earnings, rounded external grants, all eight investments and fresh uninvested supply', () => {
  expect(hole.cavernOpalSources).toHaveLength(18);
  expect(hole.opalLedger.sources.map(source => source.id)).toEqual([
   ...Array.from({ length: 18 }, (_, index) => `cavern:${index}`), ...externalIds,
  ]);
  expect(hole.opalLedger.unavailableReason).toBeNull();
  coreNumber(hole.cavernEarnedOpals, results, 'cavern_total', 'Early cavern-only earned Opals');
  for (const [value, key] of [
   [hole.opalLedger.cavernEarned, 'cavern_total'], [hole.opalLedger.externalEarned, 'external_total'],
   [hole.opalLedger.emperorSchematicFloorAdjustment, 'emperor_schematic_floor_adjustment'],
   [hole.opalLedger.externalRoundingAdjustment, 'external_rounding_adjustment'], [hole.opalLedger.earned, 'earned'],
   [hole.opalLedger.invested, 'invested'], [hole.opalLedger.uninvested, 'uninvested'],
  ] as const) coreNumber(value, results, key, `Opal ledger ${key}`);
  expect(hole.opalLedger.earned).toBe(hole.opalLedger.cavernEarned! + hole.opalLedger.externalEarned!);
  expect(hole.opalLedger.uninvested).toBe(hole.opalLedger.earned! - hole.opalLedger.invested!);
  const attributedExternal = hole.opalLedger.sources
   .filter(source => externalIds.includes(source.id)).reduce((sum, source) => sum + source.opals!, 0);
  coreNumber(attributedExternal + hole.opalLedger.emperorSchematicFloorAdjustment!
   + hole.opalLedger.externalRoundingAdjustment!, results, 'external_total', 'Attributed grants with joint floor and final rounding');
 });

 it('reports Equal Spread from rescued villagers and Opal Enthusiasm per ten invested', () => {
  expect(hole.allocationEffects.unavailableReason).toBeNull();
  expect(hole.allocationEffects.equalSpreadUnavailableReason).toBeNull();
  coreNumber(hole.allocationEffects.leastUnlockedInvestment, results, 'least_investment', 'Least rescued-villager investment');
  coreNumber(hole.allocationEffects.equalSpreadPercent, results, 'equal_spread', 'Current Equal Spread allocation effect');
  expect(hole.allocationEffects.opalEnthusiasm).toHaveLength(5);
  hole.allocationEffects.opalEnthusiasm.forEach((effect, index) => {
   expect(effect.villagerId).toBe(index);
   expect(effect.investedTens).toBe(Math.floor(inputs.investments[index] / 10));
   expect(effect.unavailableReason).toBeNull();
   coreNumber(effect.percent, results, `enthusiasm_${index}`, `Villager ${index} current Opal Enthusiasm`);
  });
 });

 it('reports current reset access, six-wish cost and stock without executing a reset', () => {
  expect(hole.anotherTry.access).toBe(captured<boolean>(results, 'another_try_access'));
  expect(hole.anotherTry.affordable).toBe(captured<boolean>(results, 'another_try_affordable'));
  coreNumber(hole.anotherTry.wishCost, results, 'another_try_cost', 'Another Try current wish cost');
  expect(hole.anotherTry.availableWishes).toBe(inputs.wishes);
  expect(hole.villagers.map(villager => villager.opals)).toEqual(inputs.investments.slice(0, 5));
  expect(hole.villagers.map(villager => villager.currentExp)).toEqual(inputs.exp);
 });
});
