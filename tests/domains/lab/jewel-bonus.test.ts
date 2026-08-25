/**
 * Lab Domain - Jewel Bonus Calculation
 *
 * Tests the dynamic Jewel bonus calculation against the delivered game formula.
 *
 * @testCovers Jewel.getBonus
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Lab, Jewel } from '../../../data/domain/world-4/lab';

const saveName = 'latest';
const extractionResultsName = 'lab-jewel-bonus-data.json';

describe('Lab Domain - Jewel Bonus', () => {
 let extractionResults: any;
 let lab: Lab;

 const jewelBonusSpecs = [
  { index: 0, extractionKey: 'jewel_0_bonus', description: 'Amethyst Rhinestone Jewel 0 bonus' },
  { index: 3, extractionKey: 'jewel_3_bonus', description: 'Sapphire Rhinestone Jewel 3 bonus' },
  { index: 10, extractionKey: 'jewel_10_bonus', description: 'Pyrite Pyramite Jewel 10 bonus' },
  { index: 12, extractionKey: 'jewel_12_bonus', description: 'Emerald Navette Jewel 12 bonus' },
  { index: 19, extractionKey: 'jewel_19_bonus', description: 'Pure Opal Navette Jewel 19 bonus' },
  { index: 20, extractionKey: 'jewel_20_bonus', description: 'Pure Opal Rhombol Jewel 20 bonus' },
 ];

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  lab = loadGameDataFromSave(saveName).get('lab') as Lab;
 });

 jewelBonusSpecs.forEach(({ index, extractionKey, description }) => {
  it(`validates ${description} against live game`, () => {
   const liveBonus = getExtractedValue(extractionResults, extractionKey);
   const domainBonus = lab.jewels[index].getBonus();

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: description,
   });
  });
 });
});