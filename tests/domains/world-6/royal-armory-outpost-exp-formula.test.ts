/**
 * Experience required to advance the base Outpost point progression, the
 * passive-worker/production track, and the purification track. Ranks 1 and 2
 * show growth after each track's distinct first-rank requirement.
 */

import {
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { OutpostRank, OutpostRankProgress } from '../../../data/domain/world-6/royalArmory/outposts';

const extractionResultsName = 'royal-armory-outpost-exp-formula-data.json';
const formulaCases: { rank: number; rankType: OutpostRank; track: string }[] = [
 { rank: 0, rankType: OutpostRank.Trading, track: 'base Outpost point progression' },
 { rank: 0, rankType: OutpostRank.Command, track: 'passive-worker and production track' },
 { rank: 0, rankType: OutpostRank.Purity, track: 'purification track' },
 { rank: 1, rankType: OutpostRank.Trading, track: 'base Outpost point progression' },
 { rank: 1, rankType: OutpostRank.Command, track: 'passive-worker and production track' },
 { rank: 1, rankType: OutpostRank.Purity, track: 'purification track' },
 { rank: 2, rankType: OutpostRank.Trading, track: 'base Outpost point progression' },
 { rank: 2, rankType: OutpostRank.Command, track: 'passive-worker and production track' },
 { rank: 2, rankType: OutpostRank.Purity, track: 'purification track' },
];

describe('Royal Armory outpost experience requirements', () => {
 formulaCases.forEach(({ rank, rankType, track }) => {
  it(`matches the experience needed for rank ${rank} on the ${track}`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(
    extractionResults,
    `royal_armory_outpost_exp_formula_${rank}_${rankType}`,
   );
   const domainValue = OutpostRankProgress.getExperienceThreshold(rank, rankType);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory rank ${rank} experience requirement for ${track}`,
   });
  });
 });
});
