import type { Grimoire } from '../../../data/domain/grimoire';
import { EfficiencyEngine } from '../../../lib/efficiencyEngine/efficiencyEngine';
import { CheapestPathCalculator } from '../../../lib/efficiencyEngine/calculators';
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

    it('matches the first Cranium-only cheapest-path purchase price for Wraith Accuracy III', () => {
        // Cranium-only farming selects this observed current purchase without changing the saved account.
        const resourceWeights = { 0: 0, 1: 0, 2: 1, 3: 0 };
        const engine = new EfficiencyEngine<Grimoire>();
        const calculator = new CheapestPathCalculator<Grimoire>();
        const path = engine.calculateEfficiency(grimoire, calculator, 1, resourceWeights);

        expect(path.pathUpgrades[0].resourceCost).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'grimoire_upgrade_cost_25'),
            {
                tolerance: 0,
                context: 'First Cranium-only cheapest-path current purchase price; Wraith Accuracy III at owned level 227',
            },
        );
    });

    // The game returns a raw price at cap, but its purchase gate prevents another purchase.
    // The website exposes the actionable price as zero for this owned Ripped Page.
    it('keeps capped Ripped Page prepared actionable cost at zero', () => {
        expect(grimoire.upgrades[52].cost).toBe(0);
    });

    it('keeps capped Ripped Page quoted actionable cost at zero', () => {
        expect(grimoire.upgrades[52].getCost(grimoire.upgrades)).toBe(0);
    });
});
