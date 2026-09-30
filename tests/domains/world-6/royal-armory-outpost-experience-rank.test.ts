/**
 * Rank comparisons cover base Outpost point progression, Barrel experience,
 * worker and resource production, Outpost connection range, and purification.
 */

import {
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

type OutpostRankType = 0 | 1 | 2 | 3 | 4;
const rankTrackNames: Record<OutpostRankType, string> = {
 0: 'base Outpost point progression',
 1: 'Barrel experience',
 2: 'passive workers and resource production',
 3: 'Outpost connection range',
 4: 'purification',
};

const saveName = 'latest';
const extractionResultsName = 'royal-armory-outpost-experience-rank-data.json';
const rankCases: { rankType: OutpostRankType; extractionKey: string }[] = [
 { rankType: 0, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_0' },
 { rankType: 1, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_1' },
 { rankType: 2, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_2' },
 { rankType: 3, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_3' },
 { rankType: 4, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_4' },
];

describe('Royal Armory outpost experience rank', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 rankCases.forEach(({ rankType, extractionKey }) => {
  it(`matches the ${rankTrackNames[rankType]} rank for saved outpost row 1`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = royalArmory.getOutpostExperienceRank(1, rankType);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory ${rankTrackNames[rankType]} rank for outpost row 1`,
   });
  });
 });
});
