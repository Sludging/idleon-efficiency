import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import type { RoyalArmoryUpgrade } from '../../../data/domain/world-6/royalArmory/upgrades';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-upgrade-prices-data.json';
const currentPrices = [
    {
        catalogIndex: 46,
        displayIndex: 1,
        label: 'royal_armory_upgrade_price_display_1',
        effect: 'Royal Talent Points I after its cheap opening, without positional Jelly reductions',
    },
    {
        catalogIndex: 58,
        displayIndex: 2,
        label: 'royal_armory_upgrade_price_display_2',
        effect: 'Solo Militia Status after its cheap opening, without positional Jelly reductions',
    },
    {
        catalogIndex: 41,
        displayIndex: 5,
        label: 'royal_armory_upgrade_price_display_5',
        effect: 'Royal Marble with both Jelly reductions doubled by a missing position lookup',
    },
    {
        catalogIndex: 50,
        displayIndex: 30,
        label: 'royal_armory_upgrade_price_display_30',
        effect: 'Global Decree - OL with both Jelly reductions in the first lookup region',
    },
    {
        catalogIndex: 36,
        displayIndex: 41,
        label: 'royal_armory_upgrade_price_display_41',
        effect: 'Anti-Rodent Power Move II with only the second positional Jelly reduction',
    },
] as const;

describe('Royal Armory upgrade purchase prices', () => {
    let royalArmory: RoyalArmory;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
    });

    function priceUpgrade(catalogIndex: number): RoyalArmoryUpgrade {
        const upgrade = royalArmory.getUpgradeByIndex(catalogIndex);
        expect(upgrade).toBeDefined();
        return upgrade!;
    }

    currentPrices.forEach(({ catalogIndex, displayIndex, label, effect }) => {
        it(`matches the raw current purchase price for ${effect}`, () => {
            const upgrade = priceUpgrade(catalogIndex);
            expect(upgrade.getCost()).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, label),
                {
                    tolerance: 0,
                    context: `${effect}; catalog ${catalogIndex}, displayed position ${displayIndex}, owned level ${upgrade.level}`,
                },
            );
        });
    });

    it('previews a more expensive following Royal Talent Points I purchase without changing its current price', () => {
        const upgrade = priceUpgrade(46);
        const currentGamePrice = getExtractedValue(extractionResults, 'royal_armory_upgrade_price_display_1');

        // The real level 108 is past the cheap opening and its price exponent is > 1.
        // This checks use of the owned-level argument, not an invented future game price.
        expect(upgrade.getCost(upgrade.level + 1)).toBeGreaterThan(currentGamePrice);
        expect(upgrade.getCost()).toMatchLiveGameWithDetails(currentGamePrice, {
            tolerance: 0,
            context: 'Royal Talent Points I current price remains equal to the independent paired game price after a following-purchase preview',
        });
    });
});
