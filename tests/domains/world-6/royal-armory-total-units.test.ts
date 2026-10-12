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
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalUnitRole } from '../../../data/domain/world-6/royalArmory/units';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-total-units-data.json';
const totalUnitCases = [
 { mapIndex: 1, role: RoyalUnitRole.Worker },
 { mapIndex: 1, role: RoyalUnitRole.Trader },
 { mapIndex: 1, role: RoyalUnitRole.Guard },
 { mapIndex: 15, role: RoyalUnitRole.Worker },
 { mapIndex: 15, role: RoyalUnitRole.Guard },
 { mapIndex: 16, role: RoyalUnitRole.Worker },
 { mapIndex: 16, role: RoyalUnitRole.Guard },
 { mapIndex: 26, role: RoyalUnitRole.Guard },
 { mapIndex: 51, role: RoyalUnitRole.Guard },
 { mapIndex: 53, role: RoyalUnitRole.Trader },
 { mapIndex: 53, role: RoyalUnitRole.Surveyor },
] as const;

describe('Royal Armory total outpost units', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 totalUnitCases.forEach(({ mapIndex, role }) => {
  it(`matches assigned and passive ${RoyalUnitRole[role]} units for outpost row ${mapIndex}`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(
    extractionResults,
    `royal_armory_total_units_row_${mapIndex}_selector_${role}`,
   );
   const domainValue = royalArmory.mapStates.get(mapIndex)!.units.getTotalCount(role);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory outpost row ${mapIndex} ${RoyalUnitRole[role]} units`,
   });
  });
 });
});
