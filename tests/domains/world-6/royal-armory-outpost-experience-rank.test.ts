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
import { OutpostRank } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';

const rankTrackNames: Record<OutpostRank, string> = {
 [OutpostRank.Trading]: 'base Outpost point progression',
 [OutpostRank.Intel]: 'Barrel experience',
 [OutpostRank.Command]: 'passive workers and resource production',
 [OutpostRank.Military]: 'Outpost connection range',
 [OutpostRank.Purity]: 'purification',
};

const saveName = 'latest';
const extractionResultsName = 'royal-armory-outpost-experience-rank-data.json';
const rankCases: { rankType: OutpostRank; extractionKey: string }[] = [
 { rankType: OutpostRank.Trading, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_0' },
 { rankType: OutpostRank.Intel, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_1' },
 { rankType: OutpostRank.Command, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_2' },
 { rankType: OutpostRank.Military, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_3' },
 { rankType: OutpostRank.Purity, extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_4' },
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
   const domainValue = royalArmory.mapStates.get(1)!.getRankProgress(rankType).level;

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory ${rankTrackNames[rankType]} rank for outpost row 1`,
   });
  });
 });
});
