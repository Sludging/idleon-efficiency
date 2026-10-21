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
  { index: 1, extractionKey: 'jewel_1_bonus', description: 'Purple Navette Jewel 1 input used by Lab Mainframe 0' },
  { index: 2, extractionKey: 'jewel_2_bonus', description: 'Purple Rhombol Jewel 2 public bonus' },
  { index: 3, extractionKey: 'jewel_3_bonus', description: 'Construction slot 1 building speed and slot 2 trim from Sapphire Rhinestone, doubled by the saved Blue Jewel synergy' },
  { index: 4, extractionKey: 'jewel_4_bonus', description: 'Lab jewel effect that doubles Sapphire Rhinestone bonuses' },
  { index: 5, extractionKey: 'jewel_5_bonus', description: 'Lab jewel effect that doubles Sapphire Rhinestone bonuses' },
  { index: 6, extractionKey: 'jewel_6_bonus', description: 'Lab jewel effect that doubles Sapphire Rhinestone bonuses' },
  { index: 7, extractionKey: 'jewel_7_bonus', description: 'Lab jewel effect that doubles Pyrite Pyramite bonuses' },
  { index: 8, extractionKey: 'jewel_8_bonus', description: 'Lab jewel effect that doubles Pyrite Pyramite bonuses' },
  { index: 9, extractionKey: 'jewel_9_bonus', description: 'Lab jewel effect that doubles Pyrite Pyramite bonuses' },
  { index: 10, extractionKey: 'jewel_10_bonus', description: 'All-player damage from Pyrite Pyramite, doubled by the saved Orange Jewel synergy' },
  { index: 11, extractionKey: 'jewel_11_bonus', description: 'Lab jewel effect that doubles Emerald Navette bonuses' },
  { index: 12, extractionKey: 'jewel_12_bonus', description: 'All-skill base efficiency and action speed from Emerald Navette, doubled by the saved Green Jewel synergy' },
  { index: 13, extractionKey: 'jewel_13_bonus', description: 'Lab jewel effect that doubles Emerald Navette bonuses' },
  { index: 14, extractionKey: 'jewel_14_bonus', description: 'Emerald Pyramite bonus with the saved kitchen-level behavior' },
  { index: 15, extractionKey: 'jewel_15_bonus', description: 'Lab jewel effect that doubles Emerald Navette bonuses' },
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