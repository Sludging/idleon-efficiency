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
const extractionResultsName = 'royal-armory-upgrade-unlocks-data.json';
const representativeStatuses = [
    {
        catalogIndex: 30,
        displayIndex: 0,
        label: 'royal_armory_upgrade_unlocked_display_0',
        effect: 'Collect Resources Tool, the first displayed upgrade',
    },
    {
        catalogIndex: 41,
        displayIndex: 5,
        label: 'royal_armory_upgrade_unlocked_display_5',
        effect: 'Royal Marble, whose catalog ID differs from its displayed position',
    },
    {
        catalogIndex: 70,
        displayIndex: 6,
        label: 'royal_armory_upgrade_unlocked_display_6',
        effect: 'Resource Replenish, whose catalog ID differs from its displayed position',
    },
] as const;

describe('Royal Armory upgrade progression and displayed unlocks', () => {
    let royalArmory: RoyalArmory;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
    });

    function compareStatus(catalogIndex: number, displayIndex: number, label: string, effect: string): void {
        const upgrade: RoyalArmoryUpgrade | undefined = royalArmory.getUpgradeByIndex(catalogIndex);
        expect(upgrade).toBeDefined();
        // Extraction preserves the caller's boolean. The numeric matcher needs
        // 0/1 on both sides; no website calculation supplies the expected status.
        const expectedStatus: boolean = extractionResults.extractions[label].result;
        const actualStatus = upgrade!.isUnlocked();
        expect(actualStatus).toBe(expectedStatus);
        expect(Number(actualStatus)).toMatchLiveGameWithDetails(Number(expectedStatus), {
            tolerance: 0,
            context: `${effect}; catalog ${catalogIndex}, displayed position ${displayIndex}; availability is independent of price and cap`,
        });
    }

    it('matches the full owned-level total that advances Royal upgrade progression', () => {
        expect(royalArmory.getTotalUpgradeLevels()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'royal_armory_total_upgrade_levels'),
            {
                tolerance: 0,
                context: 'Prepared account-owned Royal upgrade levels, including non-displayed catalog records',
            },
        );
    });

    it('matches how many displayed Royal upgrades the account has unlocked', () => {
        expect(royalArmory.getUnlockedUpgradeCount()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'royal_armory_unlocked_upgrade_count'),
            {
                tolerance: 0,
                context: 'Prepared displayed-upgrade count compared independently with the capped game count',
            },
        );
    });

    representativeStatuses.forEach(({ catalogIndex, displayIndex, label, effect }) => {
        it(`matches displayed availability for ${effect}`, () => {
            compareStatus(catalogIndex, displayIndex, label, effect);
        });
    });

});
