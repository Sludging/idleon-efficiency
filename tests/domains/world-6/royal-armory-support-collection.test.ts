import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-support-collection-data.json';

describe('Royal Armory Support Collection bonus', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        const gameData = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
    });

    it('matches the per-support collection-rate percentage', () => {
        const domainValue = royalArmory.resourceCollectionBonuses.supportCollectionBonus;

        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(extractionResults, 'royal_armory_support_collection');

        expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
            tolerance: 0,
            context: 'Royal Armory per-support collection-rate percentage',
        });
    });
});
