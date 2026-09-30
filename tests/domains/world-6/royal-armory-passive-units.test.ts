import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-total-units-data.json';
const outpostRow = 1;
const unitType = 0;

describe('Royal Armory passive outpost units', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    it('matches the passive worker contribution for a saved outpost and unit type', () => {
        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(
            extractionResults,
            `royal_armory_passive_units_row_${outpostRow}_selector_${unitType}`,
        );
        const domainValue = royalArmory.getPassiveOutpostUnits(outpostRow, unitType);

        expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
            tolerance: 0,
            context: `Royal Armory passive workers for outpost row ${outpostRow}, unit type ${unitType}`,
        });
    });
});
