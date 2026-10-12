import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-bonus-data.json';
const bonusCases = [
    { index: 76, extractionKey: 'royal_armory_bonus_76', description: 'the bonus to Dreamstuff gained from Outpost progress' },
    { index: 19, extractionKey: 'royal_armory_bonus_19', description: 'the bonus to the resource-production specialization' },
];

describe('Royal Armory upgrade bonuses', () => {
    let extractionResults: ExtractionResults;
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    bonusCases.forEach(({ index, extractionKey, description }) => {
        it(`matches ${description}`, () => {
            const liveValue = getExtractedValue(extractionResults, extractionKey);
            const domainValue = royalArmory.getUpgradeBonus(index);

            expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
                tolerance: 0,
                context: `Royal Armory ${description}`,
            });
        });
    });
});
