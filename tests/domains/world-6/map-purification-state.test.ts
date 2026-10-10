/**
 * Whether saved maps have reached the first Purity rank and earn its production bonus.
 */

import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-map-purification-state-data.json';

const purificationCases = [
    {
        mapIndex: 0,
        extractionKey: 'royal_armory_map_purification_row_0',
        description: 'map row 0',
    },
    {
        mapIndex: 1,
        extractionKey: 'royal_armory_map_purification_row_1',
        description: 'map row 1',
    },
];

describe('Royal Armory map purification state', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        const gameData = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
        if (!royalArmory) {
            throw new Error('Royal Armory domain not found in save data');
        }
    });

    purificationCases.forEach(({ mapIndex, extractionKey, description }) => {
        it(`matches the game purification state for ${description}`, () => {
            const map = royalArmory.mapStates.get(mapIndex)!;
            const domainValue = map.isOutpost() && map.purified;
            const extractionResults = loadExtractionResults(extractionResultsName);
            validateExtractionHealth(extractionResults);
            const liveValue = getExtractedValue(extractionResults, extractionKey);

            // Compare the game's numeric purification state with the website's boolean result.
            expect(Number(domainValue)).toMatchLiveGameWithDetails(liveValue, {
                tolerance: 0,
                context: `Royal Armory purification state for ${description}`,
            });
        });
    });
});
