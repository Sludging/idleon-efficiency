import { EventShop } from '../../../data/domain/eventShop';
import { initEventShopBonusRepo } from '../../../data/domain/data/EventShopBonusRepo';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Event Shop - Remaining star cost', () => {
    it('matches the full catalog cost less the cost of bonuses owned in the game', () => {
        const gameData = loadGameDataFromSave('latest');
        const eventShop = gameData.get('eventShop') as EventShop;
        const results = loadExtractionResults('event-shop-ownership-data.json');
        validateExtractionHealth(results);

        const extraction = results.extractions.event_shop_ownership;
        if (!extraction || !Array.isArray(extraction.result)) {
            throw new Error('Missing native Event Shop ownership catalog');
        }

        const nativeOwnership: { index: number; owned: number }[] = extraction.result;
        const catalog = initEventShopBonusRepo();
        if (nativeOwnership.length !== catalog.length) {
            throw new Error(`Event Shop ownership catalog mismatch: native ${nativeOwnership.length}, generated ${catalog.length}`);
        }

        const nativeOwnershipByIndex = new Map<number, number>();
        for (const row of nativeOwnership) {
            if (nativeOwnershipByIndex.has(row.index)) {
                throw new Error(`Duplicate native Event Shop ownership row for bonus ${row.index}`);
            }
            if (row.owned !== 0 && row.owned !== 1) {
                throw new Error(`Invalid native Event Shop ownership for bonus ${row.index}: ${row.owned}`);
            }
            nativeOwnershipByIndex.set(row.index, row.owned);
        }

        for (const bonus of catalog) {
            if (!nativeOwnershipByIndex.has(bonus.index)) {
                throw new Error(`Missing native Event Shop ownership row for ${bonus.data.name} (${bonus.index})`);
            }
        }

        const fullCatalogCost = catalog.reduce((total, bonus) => total + bonus.data.price, 0);
        const nativeOwnedCatalogCost = catalog
            .filter(bonus => nativeOwnershipByIndex.get(bonus.index) === 1)
            .reduce((total, bonus) => total + bonus.data.price, 0);
        const expectedRemainingStarCost = fullCatalogCost - nativeOwnedCatalogCost;

        expect(eventShop.getRemainingStarCost()).toMatchLiveGameWithDetails(expectedRemainingStarCost, {
            tolerance: 0,
            context: 'Event Shop star cost for all unowned bonuses, without subtracting the star balance',
            debugInfo: {
                saveName: 'latest',
                catalogSize: catalog.length,
                fullCatalogCost,
                nativeOwnedCatalogCost,
            },
        });
    });
});
