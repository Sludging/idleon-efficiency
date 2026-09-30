import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-support-collection-data.json';

describe('Royal Armory Support Collection direct parameters', () => {
    let extractionResults: ExtractionResults;
    let royalArmory: RoyalArmory;
    let jellyOperator: JellyOperator;

    beforeAll(() => {
        const gameData = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
        jellyOperator = gameData.get('jellyOperator') as JellyOperator;
    });

    it('matches the Royal Armory upgrade 43 percentage input', () => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(extractionResults, 'royal_armory_support_collection_upgrade_43');
        const domainValue = royalArmory.getUpgradeBonus(43);

        expect(domainValue).toMatchLiveGame(liveValue, 0);
    });

    it('matches Jelly Operation quantity at index 41 in normal mode', () => {
        const supportObstruction = jellyOperator.obstructions.find(candidate => candidate.index === 41);
        if (!supportObstruction) {
            throw new Error(
                'Missing website result for direct Support Collection parameter: ' +
                'JellyOperator.obstructions has no index 41, matching ' +
                'JellyOperation("RoG_BonusQTY", 41, 0); see dependency #415.',
            );
        }

        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(extractionResults, 'royal_armory_support_collection_jelly_quantity_41');
        const domainValue = supportObstruction.getBonus();

        expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
});
