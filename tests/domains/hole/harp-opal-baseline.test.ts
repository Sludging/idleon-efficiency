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

