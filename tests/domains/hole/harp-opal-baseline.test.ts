import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX, getTargetPlayer } from '../../utils/target-player';
import { captured, decodedSave, coreNumber } from './part1-test-helpers';

type HarpGameInputs = {
 playerId: number;
 playerName: string;
 opals: number;
 savedPower: number;
 schematicOwners: number[];
 layout: number[];
 slotCount: number;
 genInfoPower: number;
 naturalDistinctCount: number;
 distinctActiveLayoutValues: number;
 activationCountBefore: number;
};

describe('Harp baseline Opal chance paired calculation', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let inputs: HarpGameInputs;

 beforeAll(() => {
  results = loadExtractionResults('hole-harp-opal-baseline-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  inputs = captured<HarpGameInputs>(results, 'paired_harp_inputs');
 });

 it('pairs game output with the configured real Harp save and active player', () => {
  const savedHole = decodedSave<number[][]>('Holes');
  const player = getTargetPlayer(data.get('players'));
  const activeContext = captured<{ playerId: number; playerName: string }>(results, 'active_context');

  expect(activeContext.playerId).toBe(TARGET_PLAYER_INDEX);
  expect(activeContext.playerId).toBe(inputs.playerId);
  expect(activeContext.playerName).toBe(player.playerName);
  expect(inputs.playerName).toBe(player.playerName);
  expect(inputs.opals).toBe(savedHole[7][5]);
  expect(inputs.savedPower).toBe(savedHole[11][22]);
  expect(inputs.genInfoPower).toBe(inputs.savedPower);
  expect(inputs.schematicOwners).toEqual(savedHole[13].slice(37, 40));
  expect(inputs.layout).toEqual(savedHole[20].slice(0, 20));

  const slotCount = hole.harp.slotCount;
  expect(slotCount).not.toBeNull();
  expect(inputs.slotCount).toBe(slotCount);
  expect(inputs.layout.length).toBeGreaterThanOrEqual(slotCount!);
  expect(new Set(inputs.layout.slice(0, slotCount!)).size).toBe(inputs.distinctActiveLayoutValues);
 });

 it('matches the selected public baseline chance with the controlled game counters', () => {
  const baseline = hole.harp.baselineOpalChance;
  expect(typeof baseline).toBe('number');
  coreNumber(baseline!, results, 'baseline_opal_chance', 'Harp zero-activation baseline Opal chance');
  expect(captured<{ activation: number; distinct: number }>(results, 'counters_after_controlled_calls')).toEqual({
   activation: inputs.activationCountBefore,
   distinct: inputs.naturalDistinctCount,
  });
 });
});

