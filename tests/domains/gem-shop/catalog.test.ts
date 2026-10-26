import { GemStore } from '../../../data/domain/gemPurchases';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

interface NativeQuote {
    counterId: number;
    shopName: string;
    purchased: number;
    displayedCost: number;
}

// These rows cover fixed and rising quotes, capped rows, and both shared-counter card packs.
const scenarios = [
    { shopName: 'Resource Boost', nativeName: 'RESOURCE_BOOST', itemCode: 'GemP41', behavior: 'a capped resource upgrade with a rising quote' },
    { shopName: 'Opal', nativeName: 'OPAL', itemCode: 'GemP43', behavior: 'a fixed-price resource purchase' },
    { shopName: 'Bottled Wind', nativeName: 'BOTTLED_WIND', itemCode: 'Quest72', behavior: 'an unpurchased consumable' },
    { shopName: 'Item Backpack Space', nativeName: 'ITEM_BACKPACK_SPACE', itemCode: 'InvBag21', behavior: 'capped backpack space with a nonzero quote' },
    { shopName: 'Storage Chest Space', nativeName: 'STORAGE_CHEST_SPACE', itemCode: 'InvStorage31', behavior: 'capped storage space with a nonzero quote' },
    { shopName: 'Ancient Card Pack', nativeName: 'ANCIENT_CARD_PACK', itemCode: 'CardPack2', behavior: 'the first card pack using the shared counter' },
    { shopName: 'Eternal Card Pack', nativeName: 'ETERNAL_CARD_PACK', itemCode: 'CardPack3', behavior: 'the second card pack using the same counter and a different quote' },
    { shopName: 'Infinity Hammer', nativeName: 'INFINITY_HAMMER', itemCode: 'GemP1', behavior: 'a capped upgrade that grants no inventory item quantity' },
    { shopName: 'More Sample Spaces', nativeName: 'MORE_SAMPLE_SPACES', itemCode: 'GemQ2', behavior: 'a capped sample upgrade with a rising quote' },
    { shopName: 'Life Refill', nativeName: 'LIFE_REFILL', itemCode: 'GemP32', behavior: 'an unpurchased repeatable refill with no inventory item quantity' },
];

describe('Gem Shop numeric catalog', () => {
    let extractionResults: ExtractionResults;
    let nativeQuotes: NativeQuote[];
    let gems: GemStore;

    beforeAll(() => {
        extractionResults = loadExtractionResults('gem-shop-data.json');
        validateExtractionHealth(extractionResults);
        // Object captures must bypass the numeric extraction normalizer.
        nativeQuotes = extractionResults.extractions.catalog_quotes.result as NativeQuote[];

        const gameData = loadGameDataFromSave('latest');
        getTargetPlayer(gameData.get('players') as Player[]);
        gems = gameData.get('gems') as GemStore;
    });

    it('matches the account gem balance', () => {
        expect(gems.gemBalance).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'gem_balance'), {
            tolerance: 0,
            context: 'Account gem balance',
        });
    });

    it.each(scenarios)('matches $shopName: $behavior', ({ shopName, nativeName, itemCode }) => {
        const nativeQuote = nativeQuotes.find(row => row.shopName === nativeName);
        const purchase = gems.purchases.find(row => row.name === itemCode);
        if (!nativeQuote || !purchase) {
            throw new Error(`Missing native or domain Gem Shop row: ${shopName}`);
        }

        expect(purchase.pucrhased).toMatchLiveGameWithDetails(nativeQuote.purchased, {
            tolerance: 0,
            context: `${shopName} saved purchase counter`,
        });
        expect(purchase.getCurrentCost()).toMatchLiveGameWithDetails(nativeQuote.displayedCost, {
            tolerance: 0,
            context: `${shopName} displayed gem quote`,
        });
    });

    // Native 1.24 source 482418-482429 rounds each purchase price, then increments the count.
    // Operands: docs/plans/gem-shop-mechanics-research.md:44-55.
    // These independently calculated catalog-cap projections are not native observed totals.
    // Resource Boost: completed empty sum = 0. Opal: (60 - 22) * 250 = 9500.
    // Bottled Wind: 4 * 240 = 960. Life Refill: 15 prices, 60, 69, ... 186, total 1845.
    // Integer operands do not exercise fractional rounding. These saved counts do not cover above-cap counts.
    it.each([
        { shopName: 'Resource Boost', itemCode: 'GemP41', expected: 0, behavior: 'completed empty sum' },
        { shopName: 'Opal', itemCode: 'GemP43', expected: 9500, behavior: 'fixed-price remainder' },
        { shopName: 'Bottled Wind', itemCode: 'Quest72', expected: 960, behavior: 'unpurchased fixed stock' },
        { shopName: 'Life Refill', itemCode: 'GemP32', expected: 1845, behavior: 'unpurchased increasing prices' },
    ])('CORE: matches $shopName catalog-cap cost: $behavior', ({ shopName, itemCode, expected }) => {
        const purchase = gems.purchases.find(row => row.name === itemCode);
        if (!purchase) {
            throw new Error(`Missing domain Gem Shop row: ${shopName}`);
        }

        expect(purchase.getCostToMax()).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `${shopName} gem cost from saved count to catalog cap; independent projection, not a native observed total`,
        });
    });
});
