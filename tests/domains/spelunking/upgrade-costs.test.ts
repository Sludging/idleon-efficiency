import { Spelunking, SpelunkingUpgradeCostInputs, Upgrade } from '../../../data/domain/world-7/spelunking';
import { initSpelunkingUpgradeRepo } from '../../../data/domain/data/SpelunkingUpgradeRepo';

const priceInputs: SpelunkingUpgradeCostInputs = {
    talentDiscount: 0.95,
    mealDiscount: 0.5,
    retention: 0.5,
};

function createUpgrade(index: number, level: number, costIncrement?: number): Upgrade {
    const data = initSpelunkingUpgradeRepo()[index].data;
    const upgrade = new Upgrade(index, costIncrement === undefined ? data : { ...data, costIncrement });
    upgrade.parse(level);
    upgrade.prepareCostQuotes(priceInputs);
    return upgrade;
}

function sourceCost(upgrade: Upgrade, level: number): number {
    let factor = priceInputs.talentDiscount * priceInputs.mealDiscount * (10 + level) * upgrade.data.costBase
        * priceInputs.retention * Math.pow(9.5, upgrade.data.column) * Math.pow(6.3, upgrade.data.x2);
    if (upgrade.index >= 52) {
        factor *= 1e7;
    }
    if (upgrade.index >= 66) {
        factor *= 1e9;
    }
    if (level === -1) {
        return factor;
    }
    return 0.25 * factor * Math.pow(upgrade.data.costIncrement, level) + Math.pow(level, 2) + 5 * level;
}

function sequentialCost(upgrade: Upgrade, startLevel: number, count: number): number {
    let total = 0;
    for (let level = startLevel; level < startLevel + count; level++) {
        total += sourceCost(upgrade, level);
    }
    return total;
}
function expectRelativeMatch(actual: number, expected: number): void {
    const difference = Math.abs(actual - expected) / Math.max(1, Math.abs(expected));
    expect(difference).toBeLessThan(5e-7);
}

describe('Spelunking shop upgrade cost quotes', () => {
    it('matches the source quote branches and tier boundaries', () => {
        for (const [index, level] of [[0, 175], [51, 100], [52, 5], [65, -1], [66, -1]]) {
            const upgrade = createUpgrade(index, level);
            expect(upgrade.nextCost).toBe(sourceCost(upgrade, level));
            expect(upgrade.getCost(level)).toBe(sourceCost(upgrade, level));
        }

        const firstPurchase = createUpgrade(65, -1);
        expect(firstPurchase.getCost()).toBe(sourceCost(firstPurchase, -1));
        expect(firstPurchase.getCost(0)).toBe(sourceCost(firstPurchase, 0));
    });

    it('bounds finite totals, keeps sentinel maxima unbounded, and leaves saved levels unchanged', () => {
        const capped = createUpgrade(52, 5);
        expect(capped.remainingCap).toBe(5);
        expectRelativeMatch(capped.costToMax!, sequentialCost(capped, 5, 5));
        expect(capped.costNext10).toBe(sequentialCost(capped, 5, 5));
        expect(capped.level).toBe(5);

        const lockedFinite = createUpgrade(65, -1);
        expect(lockedFinite.remainingCap).toBe(301);
        const lockedSequentialTotal = sequentialCost(lockedFinite, -1, 1)
            + sequentialCost(lockedFinite, 0, 300);
        expectRelativeMatch(lockedFinite.costToMax!, lockedSequentialTotal);
        expect(lockedFinite.costNext10).toBe(sequentialCost(lockedFinite, -1, 10));
        expect(lockedFinite.level).toBe(-1);

        const unbounded = createUpgrade(0, 175);
        expect(unbounded.remainingCap).toBeUndefined();
        expect(unbounded.costToMax).toBeUndefined();
        expect(unbounded.costNext10).toBe(sequentialCost(unbounded, 175, 10));

        const maxed = createUpgrade(52, 10);
        expect(maxed.remainingCap).toBe(0);
        expect(maxed.costToMax).toBe(0);
        expect(maxed.costNext10).toBe(0);
    });

    it('uses stable finite aggregates for increments at and near one', () => {
        for (const increment of [1, 1 + 1e-10]) {
            const upgrade = createUpgrade(65, -1, increment);
            const expected = sequentialCost(upgrade, -1, 1) + sequentialCost(upgrade, 0, 300);
            const difference = Math.abs(upgrade.costToMax! - expected) / Math.max(1, Math.abs(expected));
            expect(difference).toBeLessThan(1e-12);
            expect(upgrade.level).toBe(-1);
        }
    });

    it('compares Amber with the supplied quote without applying purchase eligibility', () => {
        const spelunking = new Spelunking('spelunking');
        const locked = createUpgrade(65, -1);
        const maxed = createUpgrade(52, 10);
        spelunking.ownedAmber = locked.nextCost!;

        expect(spelunking.canAffordUpgrade(locked)).toBe(true);
        expect(spelunking.canAffordUpgrade(locked, locked.nextCost! * 1.01)).toBe(false);
        expect(spelunking.canAffordUpgrade(maxed, 1)).toBe(true);
    });
});
