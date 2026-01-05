import { EfficiencyDomain, EfficiencyCalculator, EfficiencyUpgrade } from "./efficiencyEngine";

// Cheapest path calculator implementation
// Our goal is to increase our total level as cheaply as possible.
export class CheapestPathCalculator<T extends EfficiencyDomain> implements EfficiencyCalculator<T> {
    name = "Cheapest Path";

    calculateValueWithUpgrade(_domain: T, simulatedUpgrades: EfficiencyUpgrade[], _upgradeId: number, _simulatedResources: Record<number, number>): number {
        // When upgrading all we are doing is increasing our total level by 1.
        return simulatedUpgrades.reduce((sum, upgrade) => sum + upgrade.getLevel(), 0) + 1;
    }

    // Our target is always the sum of all upgrade levels.
    calculateCurrentValue(domain: T): number {
        return domain.upgrades.reduce((sum, upgrade) => sum + upgrade.getLevel(), 0);
    }
    
    getRelevantUpgradeIds(domain: T): number[] {
        // All unlocked, non-maxed upgrades are relevant for optimization
        return domain.upgrades
            .filter(u => u.isUnlocked() && u.getLevel() < u.getMaxLevel())
            .map(u => u.getId());
    }
    
    calculateValueIncrease(
        _domain: T,
        _simulatedUpgrades: EfficiencyUpgrade[],
        _upgradeId: number,
        _simulatedResources: number[]
    ): number {
        // Each upgrade level always contributes exactly 1 level toward unlock
        return 1;
    }
}
