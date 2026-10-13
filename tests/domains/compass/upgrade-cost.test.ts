import type { Compass, CompassUpgrade } from '../../../data/domain/compass';
import { updateIdleonData } from '../../../data/domain/idleonData';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
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

    // The game still quotes Moon of Print at cap, but its purchase gate blocks another level.
    // The website exposes zero as the actionable price, not the raw capped quote.
    it('keeps capped Moon of Print actionable prices at zero and blocks purchase', () => {
        const upgrade = compass.upgrades[43];
        expect(upgrade.cost).toBe(0);
        expect(upgrade.getCost(compass.upgrades, ...compass.getAdditionalCostArgs())).toBe(0);
        expect(compass.canAffordUpgrade(upgrade)).toBe(false);
        expect(compass.canAffordUpgrade(upgrade, 0)).toBe(false);
    });

    it('keeps current prices stable when normal account processing repeats for the same save', () => {
        const save = loadTestSave('latest');
        let gameData = loadGameDataFromSave('latest');
        gameData = updateIdleonData(
            gameData, save, save.get('playerNames'),
            normalizeCompanionStates(save.get('companions')), save.get('servervars'), true,
        ).getData();
        const processedCompass = gameData.get('compass') as Compass;
        currentPrices.forEach(({ upgradeId, mechanic }) => {
            const upgrade = processedCompass.upgrades[upgradeId];
            expectCurrentPrice(upgrade.cost, extractionResults, upgrade, mechanic);
            expectCurrentPrice(
                upgrade.getCost(processedCompass.upgrades, ...processedCompass.getAdditionalCostArgs()),
                extractionResults, upgrade, mechanic,
            );
        });
    });

    // Only the first engine purchase uses the unchanged saved state. Later purchases are outside this case.
    describe('efficiency goals current purchase prices', () => {
        beforeAll(() => {
            compass.calculateAllEfficiencies();
        });

        it.each(['Tempest Damage', 'Dust Multiplier', 'Tempest Accuracy', 'Tempest Defense'])(
            'matches %s first purchase against the game quote',
            goal => {
                const result = compass.efficiencyResults.get(goal)!;
                const firstPurchase = result.pathUpgrades[0];
                const upgrade = compass.upgrades[firstPurchase.upgrade.getId()];
                expectCurrentPrice(
                    firstPurchase.resourceCost, extractionResults, upgrade, `${goal} first purchase`,
                );
            },
        );
    });
});
