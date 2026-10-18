import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Harp baseline direct Schematic parameters', () => {
 let results: ExtractionResults;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-harp-opal-baseline-data.json');
  validateExtractionHealth(results);
  hole = loadGameDataFromSave('latest').get('hole') as Hole;
 });

 it('matches owned Stringy Effect contribution used by the baseline', () => {
  const schematic = hole.schematics.find(schematic => schematic.index === 39)!;
  expect(schematic.getBonus(15)).toMatchLiveGame(getExtractedValue(results, 'stringy_effect'), 0);
 });

 it('matches owned Variety Effect contribution for distinct active saved strings', () => {
  const schematic = hole.schematics.find(schematic => schematic.index === 38)!;
  expect(schematic.getIntrinsicBonus()).not.toBeNull();
  expect(schematic.getIntrinsicBonus()).toMatchLiveGame(getExtractedValue(results, 'variety_effect'), 0);
 });
});
