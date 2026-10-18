import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { Study } from '../../../data/domain/world-5/hole/hole';
import type { Gaming } from '../../../data/domain/world-5/gaming';
import type { Stamp } from '../../../data/domain/world-1/stamps';
import { getStampBonusForKey } from '../../../data/domain/world-1/stamps';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import type { CapturedHoleInputs } from './part1-test-helpers';
import { assertPairedContext, assertStudyEffects, captured, coreNumber, decodedSave } from './part1-test-helpers';

describe('Hole Studies progression, owned effects and current participation', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let inputs: CapturedHoleInputs;
 let savedHoleData: number[][];
 let optionListAccount: number[];

 beforeAll(() => {
  results = loadExtractionResults('hole-studies-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  inputs = captured<CapturedHoleInputs>(results, 'paired_hole_inputs');
  savedHoleData = decodedSave<number[][]>('Holes');
  optionListAccount = decodedSave<number[]>('OptLacc');
 });


 Array.from({ length: 18 }, (_, index) => index).forEach(index => {

  it(`matches every Study ${index} numeric contribution and discrete owned rule`, () => {
   assertStudyEffects(index, hole.studies[index].getEffects(), results);
  });

 });

});
