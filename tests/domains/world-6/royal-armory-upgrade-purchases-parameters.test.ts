import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-upgrade-purchases-data.json';
const purchaseInputs = [
    { catalogIndex: 46, displayIndex: 1, effect: 'available Royal Talent Points I' },
    { catalogIndex: 30, displayIndex: 0, effect: 'capped Collect Resources Tool' },
    { catalogIndex: 80, displayIndex: 24, effect: 'unlocked upgrade with insufficient currency' },
    { catalogIndex: 50, displayIndex: 30, effect: 'locked but affordable Global Decree - OL' },
] as const;

// Price and unlock are separate calculated aspects used directly by eligibility.
// Their upstream discounts and progression totals belong to those aspects' tests.
describe('Royal Armory purchase direct price and unlock parameters', () => {
    let royalArmory: RoyalArmory;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
    });

    purchaseInputs.forEach(({ catalogIndex, displayIndex, effect }) => {
        it(`matches the raw current price used by the ${effect} purchase check`, () => {
            const upgrade = royalArmory.getUpgradeByIndex(catalogIndex);
            expect(upgrade).toBeDefined();
            expect(upgrade!.getCost()).toMatchLiveGame(
                getExtractedValue(extractionResults, `royal_armory_purchase_price_display_${displayIndex}`),
                0,
            );
        });

        it(`matches the displayed unlock used by the ${effect} purchase check`, () => {
            const upgrade = royalArmory.getUpgradeByIndex(catalogIndex);
            expect(upgrade).toBeDefined();
            const expectedStatus: boolean = extractionResults.extractions[`royal_armory_purchase_unlocked_display_${displayIndex}`].result;
            const actualStatus = upgrade!.isUnlocked();
            expect(actualStatus).toBe(expectedStatus);
            // The source caller returns a boolean; numeric encoding is matcher-only.
            expect(Number(actualStatus)).toMatchLiveGame(Number(expectedStatus), 0);
        });
    });
});
