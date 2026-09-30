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
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

type RankType = 0 | 2 | 4;

const saveName = 'latest';
const extractionResultsName = 'royal-armory-outpost-exp-formula-data.json';
const formulaCases: { rank: number; rankType: RankType; track: string }[] = [
 { rank: 0, rankType: 0, track: 'base Outpost point progression' },
 { rank: 0, rankType: 2, track: 'passive-worker and production track' },
 { rank: 0, rankType: 4, track: 'purification track' },
 { rank: 1, rankType: 0, track: 'base Outpost point progression' },
 { rank: 1, rankType: 2, track: 'passive-worker and production track' },
 { rank: 1, rankType: 4, track: 'purification track' },
 { rank: 2, rankType: 0, track: 'base Outpost point progression' },
 { rank: 2, rankType: 2, track: 'passive-worker and production track' },
 { rank: 2, rankType: 4, track: 'purification track' },
];

describe('Royal Armory outpost experience requirements', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 formulaCases.forEach(({ rank, rankType, track }) => {
  it(`matches the experience needed for rank ${rank} on the ${track}`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(
    extractionResults,
    `royal_armory_outpost_exp_formula_${rank}_${rankType}`,
   );
   const domainValue = royalArmory.getOutpostExperienceFormula(rank, rankType);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory rank ${rank} experience requirement for ${track}`,
   });
  });
 });
});
