import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-support-collection-data.json';

describe('Royal Armory Support Collection bonus', () => {
    let royalArmory: RoyalArmory;
    let jellyOperator: JellyOperator;

    beforeAll(() => {
        const gameData = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
        jellyOperator = gameData.get('jellyOperator') as JellyOperator;
    });

    it('matches the per-support collection-rate percentage', () => {
        const supportObstruction = jellyOperator.obstructions.find(candidate => candidate.index === 41);
        if (!supportObstruction) {
            throw new Error(
                'Missing direct Support Collection parameter: JellyOperator.obstructions has no index 41, ' +
                'matching JellyOperation("RoG_BonusQTY", 41, 0).',
            );
        }
        const domainValue = royalArmory.getSupportCollectionBonus(supportObstruction.getBonus());

        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(extractionResults, 'royal_armory_support_collection');

        expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
            tolerance: 0,
            context: 'Royal Armory per-support collection-rate percentage',
        });
    });
});
