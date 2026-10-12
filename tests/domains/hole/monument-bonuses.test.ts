/**
 * Hole Domain - Monument bonuses
 *
 * Validates representative Bravery, Justice, and Wisdom monument bonuses,
 * including self multipliers and both delivered calculation branches.
 *
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
  description: 'Bravery monument Cooking Speed bonus (linear multiplier path)',
 },
 {
  monumentName: 'Bravery',
  bonusIndex: 8,
  extractionKey: 'monument_rog_bonus_0_8',
  description: 'Bravery monument AFK gain bonus (nonlinear path)',
 },
 {
  monumentName: 'Bravery',
  bonusIndex: 9,
  extractionKey: 'monument_rog_bonus_0_9',
  description: 'Bravery monument bonus multiplier applied to Bravery rewards',
 },
 {
  monumentName: 'Justice',
  bonusIndex: 0,
  extractionKey: 'monument_rog_bonus_1_0',
  description: 'Justice monument Catching Efficiency bonus (linear multiplier path)',
 },
 {
  monumentName: 'Justice',
  bonusIndex: 2,
  extractionKey: 'monument_rog_bonus_1_2',
  description: 'Justice monument Artifact Find Chance bonus (nonlinear path)',
 },
 {
  monumentName: 'Justice',
  bonusIndex: 7,
  extractionKey: 'monument_rog_bonus_1_7',
  description: 'Justice monument daily Lamp Wishes bonus at zero saved level',
 },
 {
  monumentName: 'Justice',
  bonusIndex: 9,
  extractionKey: 'monument_rog_bonus_1_9',
  description: 'Justice monument bonus multiplier applied to Justice rewards',
 },
 {
  monumentName: 'Wisdom',
  bonusIndex: 0,
  extractionKey: 'monument_rog_bonus_2_0',
  description: 'Wisdom monument Chopping Efficiency bonus (linear multiplier path)',
 },
 {
  monumentName: 'Wisdom',
  bonusIndex: 6,
  extractionKey: 'monument_rog_bonus_2_6',
  description: 'Wisdom monument Player Drop Rate bonus (nonlinear path)',
 },
 {
  monumentName: 'Wisdom',
  bonusIndex: 7,
  extractionKey: 'monument_rog_bonus_2_7',
  description: 'Wisdom monument Gambit Points bonus at zero saved level',
 },
 {
  monumentName: 'Wisdom',
  bonusIndex: 9,
  extractionKey: 'monument_rog_bonus_2_9',
  description: 'Wisdom monument bonus multiplier applied to Wisdom rewards',
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
