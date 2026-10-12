/**
 * Account-wide Armory progression totals used by Outpost resource collection.
 * The purification total counts built outposts that reached their first rank;
 * each result is compared with the game for the same paired save.
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';

const saveName = 'latest';

const totalStatCases = [
 {
  total: 'totalResourceGrade',
  extractionResultsName: 'royal-armory-resource-rate-data.json',
  extractionKey: 'royal_armory_rate_total_statz_0',
  description: 'the sum of Royal Armory resource grades',
 },
 {
  total: 'totalOutpostUpgradeLevels',
  extractionResultsName: 'royal-armory-resource-rate-data.json',
  extractionKey: 'royal_armory_rate_total_statz_1',
  description: 'Royal Guardian outpost upgrade levels across built outposts',
 },
 {
  total: 'purifiedOutpostCount',
  extractionResultsName: 'royal-armory-resource-rate-data.json',
  extractionKey: 'royal_armory_rate_total_statz_2',
  description: 'built outposts that reached their first purification rank',
 },
 {
  total: 'resourceQuantityLogTotal',
  extractionResultsName: 'royal-armory-resource-rate-data.json',
  extractionKey: 'royal_armory_rate_total_statz_3',
  description: 'log-scaled owned Top of List resources used for collection rate',
 },
 {
  total: 'builtOutpostCount',
  extractionResultsName: 'tome-score-data.json',
  extractionKey: 'tome_producer_119_royalg_total_stats_4',
  description: 'number of built outposts',
 },
] as const;

describe('Royal Armory account progression totals', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 totalStatCases.forEach(({ total, extractionResultsName, extractionKey, description }) => {
  it(`matches ${description}`, () => {
   const extractionResults: ExtractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = royalArmory[total];

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory ${description} (${total})`,
   });
  });
 });
});

