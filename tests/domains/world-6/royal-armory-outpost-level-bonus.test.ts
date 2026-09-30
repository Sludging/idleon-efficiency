/**
 * Outpost levels increase collection, rank, and Barrel experience. Selector 1
 * also has a distinct connection-range effect.
 */

import {
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-outpost-level-bonus-data.json';
const bonusCases = [
 { index: 0, variant: 0, description: 'the baseline outpost-level effect' },
 { index: 1, variant: 0, description: 'the collection-rate increase per outpost level' },
 { index: 1, variant: 1, description: 'the alternate connection-range increase' },
 { index: 2, variant: 0, description: 'the rank and Barrel experience increase per outpost level' },
] as const;

describe('Royal Armory outpost-level bonuses', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 bonusCases.forEach(({ index, variant, description }) => {
  it(`matches ${description}`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(
    extractionResults,
    `royal_armory_outpost_level_bonus_${index}_${variant}`,
   );
   const domainValue = royalArmory.getOutpostLevelBonus(index, variant);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory ${description} (selector ${index}, variant ${variant})`,
   });
  });
 });
});
