import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

type UnitType = 0 | 1 | 2 | 3;

const saveName = 'latest';
const extractionResultsName = 'royal-armory-total-units-data.json';
const passiveUnitInputs: { mapIndex: number; unitType: UnitType }[] = [
    { mapIndex: 1, unitType: 0 },
    { mapIndex: 1, unitType: 1 },
    { mapIndex: 1, unitType: 2 },
    { mapIndex: 15, unitType: 0 },
    { mapIndex: 15, unitType: 2 },
    { mapIndex: 16, unitType: 0 },
    { mapIndex: 16, unitType: 2 },
    { mapIndex: 26, unitType: 2 },
    { mapIndex: 51, unitType: 2 },
    { mapIndex: 53, unitType: 1 },
    { mapIndex: 53, unitType: 3 },
];

describe('Royal Armory total-unit direct parameters', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    passiveUnitInputs.forEach(({ mapIndex, unitType }) => {
        it(`matches passive workers added for outpost row ${mapIndex}, unit type ${unitType}`, () => {
            const extractionResults = loadExtractionResults(extractionResultsName);
            validateExtractionHealth(extractionResults);
            const liveValue = getExtractedValue(
                extractionResults,
                `royal_armory_passive_units_row_${mapIndex}_selector_${unitType}`,
            );
            const domainValue = royalArmory.getPassiveOutpostUnits(mapIndex, unitType);

            expect(domainValue).toMatchLiveGame(liveValue, 0);
        });
    });
});
