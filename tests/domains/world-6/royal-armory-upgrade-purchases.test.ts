import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-upgrade-purchases-data.json';
const purchaseCases = [
    { catalogIndex: 46, displayIndex: 1, effect: 'allows Royal Talent Points I when unlocked, below cap, and affordable from its displayed currency' },
    { catalogIndex: 30, displayIndex: 0, effect: 'rejects the capped Collect Resources Tool even though its quoted price is zero' },
    { catalogIndex: 80, displayIndex: 24, effect: 'rejects an unlocked, uncapped upgrade when its actual currency balance is below the raw price' },
    { catalogIndex: 50, displayIndex: 30, effect: 'rejects Global Decree - OL while locked despite enough currency and room below cap' },
] as const;

describe('Royal Armory upgrade purchase requirements', () => {
    let royalArmory: RoyalArmory;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
    });

    purchaseCases.forEach(({ catalogIndex, displayIndex, effect }) => {
        it(effect, () => {
            const upgrade = royalArmory.getUpgradeByIndex(catalogIndex);
            expect(upgrade).toBeDefined();
            const expectedStatus: boolean = extractionResults.extractions[`royal_armory_can_purchase_display_${displayIndex}`].result;
            const actualStatus = royalArmory.canPurchaseUpgrade(upgrade!);
            expect(actualStatus).toBe(expectedStatus);
            // Preserve the extracted boolean; encode only for the numeric live matcher.
            expect(Number(actualStatus)).toMatchLiveGameWithDetails(Number(expectedStatus), {
                tolerance: 0,
                context: `${effect}; catalog ${catalogIndex}, display ${displayIndex}, owned level ${upgrade!.level}; captured context ${JSON.stringify(extractionResults.extractions.royal_armory_purchase_context.result)}`,
            });
        });
    });
});
