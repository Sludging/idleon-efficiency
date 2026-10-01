/**
 * Lab Domain - Jewel Bonus Calculation
 *
 * Checks the Lab mainframe effects that scale Rhinestone and Pyramite jewel
 * bonuses and the Emerald Navette jewel's unlock-gated bonus.
 *
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Lab } from '../../../data/domain/world-4/lab';

const saveName = 'latest';
const extractionResultsName = 'lab-jewel-bonus-data.json';

describe('Lab Domain - Jewel Bonus', () => {
 let extractionResults: any;
 let lab: Lab;

 const jewelBonusSpecs = [
  { index: 0, extractionKey: 'jewel_0_bonus', description: 'Meal Cooking speed from Amethyst Rhinestone, doubled by the saved Purple Jewel synergy' },
  { index: 3, extractionKey: 'jewel_3_bonus', description: 'Construction slot 1 building speed and slot 2 trim from Sapphire Rhinestone, doubled by the saved Blue Jewel synergy' },
  { index: 10, extractionKey: 'jewel_10_bonus', description: 'All-player damage from Pyrite Pyramite, doubled by the saved Orange Jewel synergy' },
  { index: 12, extractionKey: 'jewel_12_bonus', description: 'All-skill base efficiency and action speed from Emerald Navette, doubled by the saved Green Jewel synergy' },
  { index: 19, extractionKey: 'jewel_19_bonus', description: 'Pure Opal Navette boost to active Mainframe bonuses and jewels, excluding Spelunker Obol' },
  { index: 20, extractionKey: 'jewel_20_bonus', description: 'Pure Opal Rhombol boost to all Crop Depot bonuses' },
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