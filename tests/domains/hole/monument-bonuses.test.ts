/**
 * Hole Domain - Monument bonuses
 *
 * Validates representative Bravery, Justice, and Wisdom monument bonuses,
 * including self multipliers and both delivered calculation branches.
 *
 * @testCovers Hole.getMonumentBonus
 * @testCovers MonumentBonus.getBonus
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Hole } from '../../../data/domain/world-5/hole/hole';

const saveName = 'latest';
const extractionResultsName = 'hole-monument-bonuses-data.json';

const monumentCases = [
 {
  monumentName: 'Bravery',
  bonusIndex: 2,
  extractionKey: 'monument_rog_bonus_0_2',
  description: 'Bravery monument bonus 2 (linear branch; accepted root)',
 },
 {
  monumentName: 'Bravery',
  bonusIndex: 8,
  extractionKey: 'monument_rog_bonus_0_8',
  description: 'Bravery monument bonus 8 (nonlinear branch)',
 },
 {
  monumentName: 'Bravery',
  bonusIndex: 9,
  extractionKey: 'monument_rog_bonus_0_9',
  description: 'Bravery monument bonus 9 (self multiplier)',
 },
 {
  monumentName: 'Justice',
  bonusIndex: 0,
  extractionKey: 'monument_rog_bonus_1_0',
  description: 'Justice monument bonus 0 (linear branch)',
 },
 {
  monumentName: 'Justice',
  bonusIndex: 2,
  extractionKey: 'monument_rog_bonus_1_2',
  description: 'Justice monument bonus 2 (nonlinear branch)',
 },
 {
  monumentName: 'Justice',
  bonusIndex: 7,
  extractionKey: 'monument_rog_bonus_1_7',
  description: 'Justice monument bonus 7 (nonlinear zero-level case)',
 },
 {
  monumentName: 'Justice',
  bonusIndex: 9,
  extractionKey: 'monument_rog_bonus_1_9',
  description: 'Justice monument bonus 9 (self multiplier)',
 },
 {
  monumentName: 'Wisdom',
  bonusIndex: 0,
  extractionKey: 'monument_rog_bonus_2_0',
  description: 'Wisdom monument bonus 0 (linear branch)',
 },
 {
  monumentName: 'Wisdom',
  bonusIndex: 6,
  extractionKey: 'monument_rog_bonus_2_6',
  description: 'Wisdom monument bonus 6 (nonlinear branch)',
 },
 {
  monumentName: 'Wisdom',
  bonusIndex: 7,
  extractionKey: 'monument_rog_bonus_2_7',
  description: 'Wisdom monument bonus 7 (linear zero-level case)',
 },
 {
  monumentName: 'Wisdom',
  bonusIndex: 9,
  extractionKey: 'monument_rog_bonus_2_9',
  description: 'Wisdom monument bonus 9 (self multiplier)',
 },
];

describe('Hole Domain - Monument bonuses', () => {
 let extractionResults: ExtractionResults;
 let hole: Hole;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  hole = loadGameDataFromSave(saveName).get('hole') as Hole;
 });

 monumentCases.forEach(({ monumentName, bonusIndex, extractionKey, description }) => {
  it(`validates ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = hole.getMonumentBonus(monumentName, bonusIndex);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: description,
   });
  });
 });
});
