import { range } from '../../utility';
import { Stamp } from './stamps';

/**
 * Represents a specific upgrade scenario for a stamp with given discounts
 */
export interface StampUpgradeScenario {
    /** The atom discount percentage applied */
    atomDiscount: number;
    /** Whether gilded discount is applied */
    gildedDiscount: boolean;
    /** The maximum level achievable with these discounts */
    maxUpgradeLevel: number;
    /** The material cost to upgrade from current max level to next tier */
    materialCost: number;
    /** The gold cost to upgrade from current level to max level */
    goldCost: number;
    /** Whether this upgrade is achievable with current carrying capacity */
    isAchievable: boolean;
    /** Number of tiers that can be upgraded with these discounts */
    upgradableTiers: number;
}

/**
 * Calculator that handles stamp upgrade scenarios with different discount combinations
 */
export class StampUpgradeCalculator {
    // Cache of calculated scenarios
    private scenarios: Map<string, StampUpgradeScenario> = new Map();
    
    constructor(private stamp: Stamp) {}
    
    /**
     * Get a specific upgrade scenario for given discount settings
     * @param atomDiscount The atom discount percentage (0-90)
     * @param gildedDiscount Whether gilded discount is applied
     * @returns The calculated upgrade scenario
     */
    getScenario(atomDiscount: number, gildedDiscount: boolean): StampUpgradeScenario {
        const key = `${atomDiscount}-${gildedDiscount}`;
        if (!this.scenarios.has(key)) {
            this.scenarios.set(key, this.calculateScenario(atomDiscount, gildedDiscount));
        }
        return this.scenarios.get(key)!;
    }
    
    /**
     * Calculate all common upgrade scenarios at once
     */
    calculateAllScenarios(discountIncrement: number) {
        // Generate array of discounts from 0 to 90 with proper increments
        const atomDiscounts: number[] = [];
        for (let discount = 0; discount <= 90; discount += discountIncrement) {
            atomDiscounts.push(discount);
        }
        // Ensure 90 is always included if it's not already (in case of non-divisible increments)
        if (!atomDiscounts.includes(90)) {
            atomDiscounts.push(90);
        }

        // With and without gilded
        const gildedOptions = [false, true];
        
        for (const atomDiscount of atomDiscounts) {
            for (const gildedOption of gildedOptions) {
                this.getScenario(atomDiscount, gildedOption);
            }
        }
    }
    
    /**
     * Calculate a specific upgrade scenario
     * @private
     */
    private calculateScenario(atomDiscount: number, gildedDiscount: boolean): StampUpgradeScenario {
        // Save original state
        const originalAtomDiscount = this.stamp.atomDiscount;
        const originalGildedAvailable = this.stamp.gildedAvailable;
        const originalGildedCount = this.stamp.gildedCount;
        
        try {
            // Apply specified discounts
            this.stamp.atomDiscount = atomDiscount;
            this.stamp.gildedAvailable = gildedDiscount;
            this.stamp.gildedCount = gildedDiscount ? 1 : 0;
            
            // Calculate maximum level achievable
            let maxLevel = this.stamp.maxLevel;
            while (this.stamp.getMaterialCost(maxLevel) <= this.stamp.maxCarryAmount && maxLevel < 9999) {
                maxLevel += this.stamp.data.upgradeInterval;
            }
            maxLevel -= this.stamp.data.upgradeInterval; // Adjust back to last valid level
            
            // Calculate number of tiers that can be upgraded
            const upgradableTiers = Math.max(0, Math.floor((maxLevel - this.stamp.maxLevel) / this.stamp.data.upgradeInterval) + 1);
            
            // Calculate costs
            const nextTierLevel = this.stamp.maxLevel + this.stamp.data.upgradeInterval;
            const materialCost = this.stamp.getMaterialCost(this.stamp.maxLevel); // Cost to upgrade from current max level
            
            // Calculate total gold cost to reach max level from current level
            const goldCost = range(this.stamp.level, this.stamp.maxLevel).reduce(
                (sum, level) => sum + this.stamp.getGoldCost(level), 0
            );
            
            return {
                atomDiscount,
                gildedDiscount,
                maxUpgradeLevel: maxLevel,
                materialCost,
                goldCost,
                isAchievable: materialCost <= this.stamp.maxCarryAmount,
                upgradableTiers
            };
        } finally {
            // Restore original state
            this.stamp.atomDiscount = originalAtomDiscount;
            this.stamp.gildedAvailable = originalGildedAvailable;
            this.stamp.gildedCount = originalGildedCount;
        }
    }
    
    /**
     * Check if the stamp can be upgraded without any discounts
     */
    canUpgradeWithoutDiscounts(): boolean {
        return this.getScenario(0, false).isAchievable;
    }
    
    /**
     * Check if the stamp can be upgraded with gilded discount only
     */
    canUpgradeWithGildedOnly(): boolean {
        return !this.canUpgradeWithoutDiscounts() && this.getScenario(0, true).isAchievable;
    }
    
    /**
     * Find the minimum atom discount needed to upgrade this stamp
     * @param withGilded Whether to include gilded discount in the calculation
     * @returns The minimum atom discount percentage needed, or -1 if not possible
     */
    getMinimumAtomDiscount(withGilded: boolean): number {
        // Binary search to find minimum atom discount
        let low = 0;
        let high = 90;
        let result = -1;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (this.getScenario(mid, withGilded).isAchievable) {
                result = mid;
                high = mid - 1; // Try to find a lower discount
            } else {
                low = mid + 1; // Need higher discount
            }
        }
        
        return result;
    }
    
    /**
     * Get the maximum level achievable with current carrying capacity
     * @param atomDiscount The atom discount percentage to apply
     * @param withGilded Whether to include gilded discount
     */
    getMaxAchievableLevel(atomDiscount: number, withGilded: boolean): number {
        return this.getScenario(atomDiscount, withGilded).maxUpgradeLevel;
    }
    
    /**
     * Get the number of tiers that can be upgraded with specific discounts
     * @param atomDiscount The atom discount percentage to apply
     * @param withGilded Whether to include gilded discount
     * @returns The number of tiers that can be upgraded
     */
    getUpgradableTiers(atomDiscount: number, withGilded: boolean): number {
        return this.getScenario(atomDiscount, withGilded).upgradableTiers;
    }
    
    /**
     * Check if the stamp can be upgraded to a specific level with given discounts
     * @param targetLevel The level to check
     * @param atomDiscount The atom discount percentage
     * @param withGilded Whether to include gilded discount
     */
    canUpgradeToLevel(targetLevel: number, atomDiscount: number, withGilded: boolean): boolean {
        const scenario = this.getScenario(atomDiscount, withGilded);
        return scenario.isAchievable && scenario.maxUpgradeLevel >= targetLevel;
    }
    
    /**
     * Filter stamps based on upgrade possibilities with specific discount settings
     * @param stamps All stamps to filter
     * @param options Filter options
     * @returns Filtered stamps
     */
    static filterUpgradableStamps(
        stamps: Stamp[][], 
        options: {
            requireNoDiscounts?: boolean,
            requireGildedOnly?: boolean,
            requireAtomDiscount?: number,
            includeGildedWithAtom?: boolean
        }
    ): Stamp[] {
        const allStamps = stamps.flatMap(tab => tab);
        
        return allStamps.filter(stamp => {
            // Skip stamps without an upgrade calculator
            if (!stamp.upgradeCalculator) return false;
            
            // Filter for stamps that can be upgraded without any discounts
            if (options.requireNoDiscounts) {
                return stamp.upgradeCalculator.canUpgradeWithoutDiscounts();
            }
            
            // Filter for stamps that can be upgraded with gilded discount only
            if (options.requireGildedOnly) {
                return stamp.upgradeCalculator.canUpgradeWithGildedOnly();
            }
            
            // Filter for stamps that require atom discount (with or without gilded)
            if (options.requireAtomDiscount !== undefined) {
                const withGilded = options.includeGildedWithAtom ?? false;
                
                // If we're looking for stamps that need exactly this discount
                const minDiscount = stamp.upgradeCalculator.getMinimumAtomDiscount(withGilded);
                
                // Skip stamps that can be upgraded without atom discount
                if (stamp.upgradeCalculator.canUpgradeWithoutDiscounts()) return false;
                
                // Skip stamps that can be upgraded with gilded only (if we're not including gilded)
                if (!withGilded && stamp.upgradeCalculator.canUpgradeWithGildedOnly()) return false;
                
                // Check if this stamp requires at most the specified atom discount
                return minDiscount >= 0 && minDiscount <= options.requireAtomDiscount;
            }
            
            return false;
        });
    }
} 