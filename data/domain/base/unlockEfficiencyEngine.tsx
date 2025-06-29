import { ImageData } from "../imageData";

// Base interface for upgrades that can participate in efficiency calculations
export interface UnlockableUpgrade {
    id: number;
    level: number;
    unlocked: boolean;
    cost: number;
    data: {
        name: string;
        max_level: number;
        unlock_req: number;
    };
    getImageData(): ImageData;
    getCost(allUpgrades: UnlockableUpgrade[], ...args: any[]): number;
    copyUpgrade(): UnlockableUpgrade;
}

// Base interface for resource tracking
export interface ResourceTracker {
    getResourceCount(resourceType: number): number;
    getResourceImageData(resourceType: number): ImageData;
    canAffordUpgrade(upgrade: UnlockableUpgrade, cost?: number): boolean;
}

// Base interface for domains that have upgrade systems with efficiency calculations
export interface UnlockableDomain extends ResourceTracker {
    upgrades: UnlockableUpgrade[];
    totalLevel: number;
    
    // Method to create a copy of an upgrade for simulation
    copyUpgrade(upgrade: UnlockableUpgrade): UnlockableUpgrade;
    
    // Method to recalculate upgrade costs and bonuses after level changes
    recalculateUpgrades(upgrades: UnlockableUpgrade[]): void;
    
    // Method to get the resource type for an upgrade's cost
    getUpgradeResourceType(upgrade: UnlockableUpgrade): number;
}

// Result structure for efficiency calculations
export interface UnlockEfficiencyUpgrade {
    upgrade: UnlockableUpgrade;
    levelsGained: number;
    resourceCost: number;
    resourceType: number;
    efficiency: number; // levelsGained per resourceCost
    imageData: ImageData;
}

// Efficiency calculation result information
export interface UnlockPathInfo {
    nextUnlock: UnlockableUpgrade | null;
    pathUpgrades: UnlockEfficiencyUpgrade[];
    levelsNeeded: number;
    totalCost: number;
    resourceCosts: number[]; // Array indexed by resource type
    remainingLevels: number;
}

// Interface for efficiency calculators
export interface UnlockEfficiencyCalculator<T extends UnlockableDomain> {
    name: string;
    
    // Find the target for optimization (the goal)
    findNextUnlock(domain: T): UnlockableUpgrade | null;
    
    // Get all upgrades that can contribute to reaching the goal
    getRelevantUpgradeIds(domain: T): number[];
    
    // Calculate efficiency of upgrading a specific upgrade
    calculateUpgradeEfficiency(
        domain: T, 
        simulatedUpgrades: UnlockableUpgrade[], 
        upgradeId: number,
        simulatedResources: number[]
    ): number;
}

// Generic efficiency calculation engine
export class UnlockEfficiencyEngine<T extends UnlockableDomain> {
    /**
     * Calculate the most efficient path to reach a goal.
     * @param maxUpgrades - Maximum upgrades to calculate. For exact calculations, pass the specific target amount.
     */
    calculateUnlockPath(
        domain: T,
        calculator: UnlockEfficiencyCalculator<T>,
        maxUpgrades: number = 100
    ): UnlockPathInfo {
        // Find the optimization target
        const nextUnlock = calculator.findNextUnlock(domain);
        
        if (!nextUnlock) {
            return {
                nextUnlock: null,
                pathUpgrades: [],
                levelsNeeded: 0,
                totalCost: 0,
                resourceCosts: [],
                remainingLevels: 0
            };
        }

        const currentLevel = domain.totalLevel;
        const targetLevel = nextUnlock.data.unlock_req;
        const levelsNeeded = targetLevel - currentLevel;

        if (levelsNeeded <= 0) {
            return {
                nextUnlock,
                pathUpgrades: [],
                levelsNeeded: 0,
                totalCost: 0,
                resourceCosts: [],
                remainingLevels: 0
            };
        }

        // Get relevant upgrade IDs
        const relevantUpgradeIds = calculator.getRelevantUpgradeIds(domain);
        
        // Create simulation state
        let simulatedUpgrades = domain.upgrades.map(u => domain.copyUpgrade(u));
        let simulatedResources = this.initializeResourceTracking(domain);
        let remainingLevels = levelsNeeded;
        
        const pathUpgrades: UnlockEfficiencyUpgrade[] = [];
        let totalCost = 0;

        // Greedy algorithm: pick most efficient upgrade up to maxUpgrades or until goal reached
        for (let step = 0; step < maxUpgrades && remainingLevels > 0; step++) {
            let bestUpgrade: UnlockableUpgrade | null = null;
            let bestCost = Infinity;

            // Find the cheapest available upgrade
            for (const upgradeId of relevantUpgradeIds) {
                const upgrade = simulatedUpgrades.find(u => u.id === upgradeId);
                if (!upgrade || !upgrade.unlocked || upgrade.level >= upgrade.data.max_level) {
                    continue;
                }

                const cost = upgrade.getCost(simulatedUpgrades);
                if (cost < bestCost) {
                    bestCost = cost;
                    bestUpgrade = upgrade;
                }
            }

            if (!bestUpgrade || bestCost === Infinity) {
                // No more available upgrades - stop and record remaining levels
                break;
            }

            // Simulate purchasing this upgrade
            bestUpgrade.level += 1;
            remainingLevels--;
            totalCost += bestCost;

            const resourceType = domain.getUpgradeResourceType(bestUpgrade);
            simulatedResources[resourceType] += bestCost;

            // Add to path upgrades or update existing entry
            const existingEntry = pathUpgrades.find(p => p.upgrade.id === bestUpgrade!.id);
            if (existingEntry) {
                existingEntry.levelsGained++;
                existingEntry.resourceCost += bestCost;
                existingEntry.efficiency = existingEntry.levelsGained / existingEntry.resourceCost;
            } else {
                pathUpgrades.push({
                    upgrade: domain.copyUpgrade(bestUpgrade),
                    levelsGained: 1,
                    resourceCost: bestCost,
                    resourceType,
                    efficiency: 1 / bestCost,
                    imageData: bestUpgrade.getImageData()
                });
            }

            // Recalculate costs after this purchase
            domain.recalculateUpgrades(simulatedUpgrades);
        }

        // Sort path upgrades by resource type and then by id for cleaner display
        pathUpgrades.sort((a, b) => {
            if (a.resourceType !== b.resourceType) {
                return a.resourceType - b.resourceType;
            }
            return a.upgrade.id - b.upgrade.id;
        });

        return {
            nextUnlock,
            pathUpgrades,
            levelsNeeded,
            totalCost,
            resourceCosts: simulatedResources,
            remainingLevels: Math.max(0, remainingLevels)
        };
    }

    private initializeResourceTracking(domain: T): number[] {
        // Initialize resource tracking array - size depends on domain
        // For now, use a reasonable default size and let domains override if needed
        return new Array(10).fill(0);
    }
}

// Base implementation for standard efficiency calculator (optimizes for next unlock)
export class StandardUnlockEfficiencyCalculator<T extends UnlockableDomain> implements UnlockEfficiencyCalculator<T> {
    name = "Next Unlock Path";
    
    findNextUnlock(domain: T): UnlockableUpgrade | null {
        // Find the next locked item with the lowest requirement
        return [...domain.upgrades]
            .filter(u => !u.unlocked)
            .sort((a, b) => a.data.unlock_req - b.data.unlock_req)[0] || null;
    }
    
    getRelevantUpgradeIds(domain: T): number[] {
        // All unlocked, non-maxed upgrades are relevant for optimization
        return domain.upgrades
            .filter(u => u.unlocked && u.level < u.data.max_level)
            .map(u => u.id);
    }
    
    calculateUpgradeEfficiency(
        domain: T,
        simulatedUpgrades: UnlockableUpgrade[],
        upgradeId: number,
        simulatedResources: number[]
    ): number {
        // Each upgrade level always contributes exactly 1 level toward unlock
        return 1;
    }
} 
