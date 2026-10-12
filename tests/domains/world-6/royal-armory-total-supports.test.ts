import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-resource-rate-data.json';
const mapIndex = 1;
const extractionKey = 'royal_armory_rate_total_supports_row_1';

describe('Royal Armory support workers assigned to an outpost', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    it('matches the number of support-worker occurrences assigned to outpost row 1', () => {
        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(extractionResults, extractionKey);
        const domainValue = royalArmory.getTotalSupports(mapIndex);

        expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
            tolerance: 0,
            context: 'Royal Armory support workers assigned to outpost row 1',
        });
    });
});
