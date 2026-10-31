import { GemStore } from '../../../data/domain/gemPurchases';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
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
});
