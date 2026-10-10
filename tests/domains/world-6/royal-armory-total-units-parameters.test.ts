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
const passiveUnitInputs = [
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

describe('Royal Armory total-unit direct parameters', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    passiveUnitInputs.forEach(({ mapIndex, role }) => {
        it(`matches passive ${RoyalUnitRole[role]} units added for outpost row ${mapIndex}`, () => {
            const extractionResults = loadExtractionResults(extractionResultsName);
            validateExtractionHealth(extractionResults);
            const liveValue = getExtractedValue(
                extractionResults,
                `royal_armory_passive_units_row_${mapIndex}_selector_${role}`,
            );
            const domainValue = royalArmory.mapStates.get(mapIndex)!.units.getPassiveCount(role);

            expect(domainValue).toMatchLiveGame(liveValue, 0);
        });
    });
});
