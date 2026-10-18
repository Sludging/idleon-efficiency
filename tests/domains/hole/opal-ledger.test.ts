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


 externalIds.forEach(id => {
  it(`includes the current ${id} external contribution once`, () => {
   const sources = hole.opalLedger.sources.filter(source => source.id === id);
   expect(sources).toHaveLength(1);
   expect(sources[0].unavailableReason).toBeNull();
   coreNumber(sources[0].opals, results, `source_${id}`, `${id} external Opals`);
  });
 });

});
