import { ImageData } from "../../data/domain/imageData";

// Base interface for upgrades that can participate in efficiency calculations
export interface EfficiencyUpgrade {
    // Identity and state functions
    getId(): number;
    getLevel(): number;
    setLevel(level: number): void;
    isUnlocked(): boolean;
    
    // Metadata functions
    getName(): string;
    getMaxLevel(): number;
    getUnlockRequirement?(): number | undefined; // Optional for systems that don't use unlock requirements
    
    // Cost and utility functions
    getCost(allUpgrades: EfficiencyUpgrade[], ...args: any[]): number;
    getCostType(): number;
    getImageData(): ImageData;
    copyUpgrade(): EfficiencyUpgrade;
}

// TODO: Think if I need this long term
export interface ResourceTracker {
    getResourceCount(resourceType: number): number;
    getResourceImageData(resourceType: number): ImageData;
    canAffordUpgrade(upgrade: EfficiencyUpgrade, cost?: number): boolean;
}

// Base interface for domains that have upgrade systems with efficiency calculations
export interface EfficiencyDomain extends ResourceTracker {
    upgrades: EfficiencyUpgrade[];
    
    // Method to create a copy of an upgrade for simulation
    copyUpgrade(upgrade: EfficiencyUpgrade): EfficiencyUpgrade;
    
    // Method to recalculate upgrade costs and bonuses after level changes
    recalculateUpgrades(upgrades: EfficiencyUpgrade[]): void;

    // Method to get the current resources of the domain (dust, tachyons, bones, etc.)
    getResources(): Record<number, number>;

    // Method to get the types of resources used by the domain (dust, tachyons, bones, etc.)
    // Key is the resource name, value is the type/value used in resources costs.
    getResourceTypes(): Record<string, number>;

    // Method to get the general name of the resource (e.g. "Dust", "Tachyons", "Bones", etc.)
    getResourceGeneralName(): string;

    // Method to provide additional arguments for upgrade cost calculations
    getAdditionalCostArgs(): any[];
}

// Base interface for all efficiency calculators
export interface EfficiencyCalculator<T extends EfficiencyDomain> {
    name: string;
    calculateCurrentValue(domain: T): number;
    getRelevantUpgradeIds(domain: T): number[];
    calculateValueWithUpgrade(domain: T, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number;
}

// Result structure for efficiency calculations (this is individual upgrades bought in order)
export interface EfficientUpgrade {
    upgrade: EfficiencyUpgrade;
    valueIncrease: number; // Could be levels gained, damage increase, etc.
    resourceCost: number;
    efficiency: number; // valueIncrease per resourceCost
}

// Efficiency calculation result information (this is the output of the engine)
export interface EfficiencyPathInfo {
    goal: string; // Description of the optimization goal
    pathUpgrades: EfficientUpgrade[];
    totalValue: number; // Total value gained (levels, damage, etc.)
    resourceCosts: Record<number,number>; // Dictionary of total resource costs
}

export class EfficiencyEngine<T extends EfficiencyDomain> {
    calculateEfficiency(
        domain: T, 
        calculator: EfficiencyCalculator<T>, 
        maxUpgrades: number = 100,
        resourceWeights?: Record<number, number>
    ): EfficiencyPathInfo {
        const currentValue = calculator.calculateCurrentValue(domain);
        const result: EfficiencyPathInfo = {
            goal: calculator.name,
            pathUpgrades: [],
            totalValue: 0,
            resourceCosts: {},
        }

        if (maxUpgrades <= 0) {
            return result;
        }
        
        // Get relevant upgrade IDs for this calculator
        const relevantUpgradeIds = calculator.getRelevantUpgradeIds(domain);

        // Create a working copy of the current state for simulation
        let simulatedUpgrades = domain.upgrades.map(u => domain.copyUpgrade(u));
        let simulatedResources = { ...domain.getResources() };
        let simulatedValue = currentValue;

        // Find the next maxUpgrades most efficient upgrades to purchase in sequence
        for (let purchaseStep = 0; purchaseStep < maxUpgrades; purchaseStep++) {
            let bestUpgrade: EfficiencyUpgrade | null = null;
            let bestEfficiency = 0;
            let bestValueIncrease = 0;
            let bestNewValue = 0;
            let bestResourceCost = 0;

            // Check each relevant upgrade to find the most efficient one at this step
            for (const upgradeId of relevantUpgradeIds) {
                const upgrade = simulatedUpgrades.find(u => u.getId() === upgradeId);
                if (!upgrade || !upgrade.isUnlocked() || upgrade.getLevel() >= upgrade.getMaxLevel()) {
                    continue; // Skip locked or maxed upgrades
                }

                // Calculate value with this upgrade at +1 level using current simulated dust amounts
                const resourceCost = upgrade.getCost(simulatedUpgrades, ...domain.getAdditionalCostArgs());
                
                // Apply resource weight if available
                const resourceType = upgrade.getCostType();
                const weight = resourceWeights?.[resourceType] ?? 1.0;
                
                // Skip upgrades that cost resources with weight 0 (user can't farm them)
                if (weight === 0) {
                    continue;
                }
                
                // Temporarily deduct resource cost to account for opportunity cost
                const originalResources = simulatedResources[resourceType] || 0;
                simulatedResources[resourceType] = Math.max(0, originalResources - resourceCost);
                
                // Calculate value with this upgrade at +1 level using reduced resources
                const newValue = calculator.calculateValueWithUpgrade(domain, simulatedUpgrades, upgradeId, simulatedResources);
                const valueIncrease = newValue - simulatedValue;
                
                // Restore original resources
                simulatedResources[resourceType] = originalResources;
                
                // Higher weight = faster farming = cheaper resource = higher efficiency
                // Lower weight = slower farming = more expensive resource = lower efficiency
                const weightedCost = resourceCost / weight;
                const efficiency = valueIncrease / weightedCost;

                if (bestUpgrade === null || efficiency > bestEfficiency) {
                    bestUpgrade = upgrade!;
                    bestEfficiency = efficiency;
                    bestValueIncrease = valueIncrease;
                    bestNewValue = newValue;
                    bestResourceCost = resourceCost;
                }
            }

            // If we found a best upgrade, add it to our results and simulate purchasing it
            if (bestUpgrade) {
                // Create a snapshot of the upgrade state for display (showing the level it will be after purchase)
                const upgradeSnapshot = bestUpgrade.copyUpgrade();
                upgradeSnapshot.setLevel(upgradeSnapshot.getLevel() + 1); // Show the level after purchase

                result.pathUpgrades.push({
                    upgrade: upgradeSnapshot,
                    valueIncrease: bestValueIncrease,
                    resourceCost: bestResourceCost,
                    efficiency: bestEfficiency,
                });

                // Update the total resource costs and value gained
                const resourceType = bestUpgrade.getCostType();
                result.resourceCosts[resourceType] = (result.resourceCosts[resourceType] || 0) + bestResourceCost;
                result.totalValue += bestValueIncrease;

                // Simulate purchasing this upgrade
                bestUpgrade.setLevel(bestUpgrade.getLevel() + 1);
                simulatedValue = bestNewValue;

                // Deduct resource cost from simulated available resources
                simulatedResources[resourceType] = Math.max(0, simulatedResources[resourceType] - bestResourceCost);

                // Recalculate costs and bonuses for all upgrades after this purchase
                domain.recalculateUpgrades(simulatedUpgrades);
            } else {
                // No more efficient upgrades available (either all maxed, locked, or no positive efficiency)
                break;
            }
        }

        return result;
    }
}
