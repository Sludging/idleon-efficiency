/**
 * Lab Domain - Jewel Connection Range
 *
 * Tests the fixed-range Jewel formulas against the delivered game function.
 *
 * @testCovers Jewel.getRange
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Lab } from '../../../data/domain/world-4/lab';

const saveName = 'latest';
const extractionResultsName = 'lab-jewel-range-data.json';

const rangeSpecs = [
 { index: 9, label: 'jewel_9_range', description: 'Pyrite Rhombol Jewel 9 fixed range' },
 { index: 19, label: 'jewel_19_range', description: 'Pure Opal Navette Jewel 19 fixed range' },
 { index: 21, label: 'jewel_21_range', description: 'Deadly Wrath Jewel 21 fixed range' },
 { index: 22, label: 'jewel_22_range', description: 'North Winds Jewel 22 fixed range' },
 { index: 23, label: 'jewel_23_range', description: 'Eternal Energy Jewel 23 fixed range' },
];

describe('Lab Domain - Jewel Connection Range', () => {
 let extractionResults: any;
 let lab: Lab;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  lab = loadGameDataFromSave(saveName).get('lab') as Lab;
 });

 rangeSpecs.forEach(({ index, label, description }) => {
  it(`validates ${description}`, () => {
   const liveRange = getExtractedValue(extractionResults, label);
   const domainRange = lab.jewels[index].getRange(0, 0);

   expect(domainRange).toMatchLiveGameWithDetails(liveRange, {
    tolerance: 0,
    context: description,
   });
  });
 });
});