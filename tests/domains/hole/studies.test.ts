import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { assertStudyEffects } from './part1-test-helpers';

describe('Hole Studies progression, owned effects and current participation', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-studies-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
 });


 Array.from({ length: 18 }, (_, index) => index).forEach(index => {

  it(`matches every Study ${index} numeric contribution and discrete owned rule`, () => {
   assertStudyEffects(index, hole.studies[index].getEffects(), results);
  });

 });

});
