import type { Compass, CompassUpgrade } from '../../../data/domain/compass';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const currentPrices = [
    { upgradeId: 14, mechanic: 'Tempest Damage ordinary Fighter-path price' },
    { upgradeId: 45, mechanic: 'Moon of Sneak price with Sneaky Sale discounts' },
    { upgradeId: 48, mechanic: 'Moon of Damage price with Damage Sale discounts' },
    { upgradeId: 51, mechanic: 'Moon of Experience price with Experience Sale discounts' },
    { upgradeId: 54, mechanic: 'Pristine Collector price with Pristine Sale discounts' },
    { upgradeId: 57, mechanic: 'Moon of Sleep price at zero owned levels with Snoozer Sale discounts' },
    { upgradeId: 151, mechanic: 'Sneaky Sale I price using its source Survival group, not its display Nomadic path' },
] as const;

function expectCurrentPrice(actual: number, results: ExtractionResults, upgrade: CompassUpgrade, mechanic: string): void {
    expect(actual).toMatchLiveGameWithDetails(
        getExtractedValue(results, `compass_upgrade_cost_${upgrade.id}`),
        {
            tolerance: 0,
            context: `${mechanic}; upgrade ${upgrade.id}, owned level ${upgrade.level}`,
        },
    );
}

describe('Compass current upgrade purchase prices', () => {
    let compass: Compass;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults('compass-upgrade-cost-data.json');
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave('latest');
        compass = gameData.get('compass') as Compass;
    });

    currentPrices.forEach(({ upgradeId, mechanic }) => {
        it(`matches prepared ${mechanic}`, () => {
            const upgrade = compass.upgrades[upgradeId];
            expectCurrentPrice(upgrade.cost, extractionResults, upgrade, mechanic);
        });

        it(`matches quoted ${mechanic}`, () => {
            const upgrade = compass.upgrades[upgradeId];
            expectCurrentPrice(
                upgrade.getCost(compass.upgrades, ...compass.getAdditionalCostArgs()),
                extractionResults, upgrade, mechanic,
            );
        });

        it(`uses the current ${mechanic} for dust affordability`, () => {
            const upgrade = compass.upgrades[upgradeId];
            const liveCost = getExtractedValue(extractionResults, `compass_upgrade_cost_${upgradeId}`) as number;
            const expectedAffordability = compass.getResourceCount(upgrade.getCostType()) >= liveCost;
            expect(compass.canAffordUpgrade(upgrade)).toBe(expectedAffordability);
            expect(compass.canAffordUpgrade(
                upgrade, upgrade.getCost(compass.upgrades, ...compass.getAdditionalCostArgs()),
            )).toBe(expectedAffordability);
        });
    });

});
