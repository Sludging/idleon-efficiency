/**
 * Event Shop ownership checks.
 *
 * The saved account owns Friendly Slot (22), but not bonuses 27 or 37. The
 * first uppercase-encoded index (27) checks the ownership mapping boundary.
 */

import {
    ExtractionResults,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { EventShop } from '../../../data/domain/eventShop';
import { initEventShopBonusRepo } from '../../../data/domain/data/EventShopBonusRepo';

const saveName = 'latest';

const ownershipCases = initEventShopBonusRepo();

describe('Event Shop - Ownership', () => {
    let nativeOwnership: { index: number; owned: number }[];
    let gameData: Map<string, any>;
    let eventShop: EventShop;

    beforeAll(() => {
        gameData = loadGameDataFromSave(saveName);
        eventShop = gameData.get('eventShop') as EventShop;

        const results: ExtractionResults = loadExtractionResults('event-shop-ownership-data.json');
        validateExtractionHealth(results);
        const extraction = results.extractions.event_shop_ownership;
        if (!extraction || !Array.isArray(extraction.result)) {
            throw new Error('Missing native Event Shop ownership catalog');
        }
        nativeOwnership = extraction.result;
    });

    ownershipCases.forEach(({ index, data }) => {
        it(`matches game ownership for ${data.name} (${index})`, () => {
            const nativeRow = nativeOwnership.find(row => row.index === index);
            if (!nativeRow) {
                throw new Error(`Missing native Event Shop ownership row for ${data.name} (${index})`);
            }
            if (nativeOwnership.length !== ownershipCases.length) {
                throw new Error(`Event Shop ownership catalog mismatch: native ${nativeOwnership.length}, generated ${ownershipCases.length}`);
            }

            expect(Number(eventShop.isBonusOwned(index))).toMatchLiveGameWithDetails(nativeRow.owned, {
                tolerance: 0,
                context: `Event Shop ownership for ${data.name} (${index})`,
                debugInfo: { saveName, gameDataLoaded: gameData.has('eventShop') },
            });
        });
    });
});
