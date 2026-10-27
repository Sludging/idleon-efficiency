import type { Grimoire } from '../../../data/domain/grimoire';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const extractionResultsName = 'grimoire-upgrade-cost-data.json';
const currentPrices = [
    { upgradeId: 0, label: 'grimoire_upgrade_cost_0', mechanic: 'Wraith Damage Femur purchase price' },
    { upgradeId: 25, label: 'grimoire_upgrade_cost_25', mechanic: 'Wraith Accuracy III Cranium purchase price' },
    { upgradeId: 49, label: 'grimoire_upgrade_cost_49', mechanic: 'Wraith Defence V Bovinae purchase price' },
] as const;

// These owned, unlocked rows include later upgrades that also receive both account discounts.
// The paired save has no zero-owned, locked, or selected Ribcage price observation.
describe('Grimoire current upgrade purchase costs', () => {
    let grimoire: Grimoire;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave('latest');
        grimoire = gameData.get('grimoire') as Grimoire;
    });

    currentPrices.forEach(({ upgradeId, label, mechanic }) => {
        const comparePrice = (actual: number) => {
            expect(actual).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, label),
                {
                    tolerance: 0,
                    context: `${mechanic}; upgrade ${upgradeId}, owned level ${grimoire.upgrades[upgradeId].level}`,
                },
            );
        };

        it(`matches prepared ${mechanic}`, () => {
            comparePrice(grimoire.upgrades[upgradeId].cost);
        });

        it(`matches quoted ${mechanic}`, () => {
            comparePrice(grimoire.upgrades[upgradeId].getCost(grimoire.upgrades));
        });
    });
});
