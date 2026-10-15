/**
 * Event Shop ownership checks.
 *
 * The saved account owns Friendly Slot (22), but not bonuses 27 or 37. The
 * first uppercase-encoded index (27) checks the ownership mapping boundary.
 */

import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { EventShop } from '../../../data/domain/eventShop';

const saveName = 'latest';

const ownershipCases = [
    {
        index: 22,
        label: 'friend_bonus_event_shop_22',
        resultsName: 'friend-bonus-stats-data.json',
        description: 'owned Friendly Slot',
    },
    {
        index: 37,
        label: 'sticker_event_shop_bonus',
        resultsName: 'farming-stickers-data.json',
        description: 'unowned Event Shop bonus',
    },
    {
        index: 27,
        label: 'tome_bonus_event_shop_27',
        resultsName: 'tome-bonus-data.json',
        description: 'unowned first uppercase-encoded bonus',
    },
] as const;

describe('Event Shop - Ownership', () => {
    const extractionResults: Record<string, ExtractionResults> = {};
    let gameData: Map<string, any>;
    let eventShop: EventShop;

    beforeAll(() => {
        gameData = loadGameDataFromSave(saveName);
        eventShop = gameData.get('eventShop') as EventShop;

        ownershipCases.forEach(({ resultsName }) => {
            const results = loadExtractionResults(resultsName);
            validateExtractionHealth(results);
            extractionResults[resultsName] = results;
        });
    });

    ownershipCases.forEach(({ index, label, resultsName, description }) => {
        it(`matches game ownership for ${description}`, () => {
            const liveValue = getExtractedValue(extractionResults[resultsName], label);
            const domainValue = eventShop.isBonusOwned(index) ? 1 : 0;

            expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
                tolerance: 0,
                context: `Event Shop ownership for bonus ${index} (${description})`,
                debugInfo: { saveName, gameDataLoaded: gameData.has('eventShop') },
            });
        });
    });
});
