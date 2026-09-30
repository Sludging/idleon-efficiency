/**
 * Total Royal Guardian workers include assigned workers and rank-granted
 * passive workers. These saved rows exercise the unit types used by the
 * resource-production core comparison, with different saved assignment entries.
 */

import {
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-total-units-data.json';
const totalUnitCases = [
 { mapIndex: 1, selector: 0 },
 { mapIndex: 1, selector: 1 },
 { mapIndex: 1, selector: 2 },
 { mapIndex: 15, selector: 0 },
 { mapIndex: 15, selector: 2 },
 { mapIndex: 16, selector: 0 },
 { mapIndex: 16, selector: 2 },
 { mapIndex: 26, selector: 2 },
 { mapIndex: 51, selector: 2 },
 { mapIndex: 53, selector: 1 },
 { mapIndex: 53, selector: 3 },
] as const;

describe('Royal Armory total outpost units', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 totalUnitCases.forEach(({ mapIndex, selector }) => {
  it(`matches assigned and passive workers for outpost row ${mapIndex}, unit type ${selector}`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(
    extractionResults,
    `royal_armory_total_units_row_${mapIndex}_selector_${selector}`,
   );
   const domainValue = royalArmory.getTotalOutpostUnits(mapIndex, selector);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory outpost row ${mapIndex} workers of unit type ${selector}`,
   });
  });
 });
});
