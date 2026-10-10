import type { RoyalArmoryUpgradeBase } from "../../data/RoyalArmoryUpgradeRepo";
import type { RoyalArmoryUpgradeModel } from "../../model/royalArmoryUpgradeModel";
import type { ImageData } from "../../imageData";

export class RoyalArmoryUpgrade {
    level: number = 0;
    private unlocked: boolean = false;
    readonly displayIndex: number | undefined;
    private readonly displayCostGrowth: number;
    private readonly displayCostWeight: number;
    private purchaseResourceType: number | undefined;
    private jellyObstruction11DiscountWeight: number = 0;
    private jellyObstruction26DiscountWeight: number = 0;
    private masterClassCostMultiplier: number = 1;
    private jellyCostMultiplier: number = 1;

    constructor(
        public index: number,
        public data: RoyalArmoryUpgradeModel,
    ) {
        this.displayIndex = data.displayOrder;
        const displayIndex = this.displayIndex;
        this.displayCostGrowth = displayIndex === undefined ? 0 : Math.pow(1.24, displayIndex);
        this.displayCostWeight = displayIndex === undefined ? 0 : 3 + 5 * displayIndex;
    }

    static fromBase(data: RoyalArmoryUpgradeBase[]): RoyalArmoryUpgrade[] {
        const upgrades = data.map((upgrade) => new RoyalArmoryUpgrade(upgrade.index, upgrade.data));
        for (const upgrade of upgrades) {
            // Purchases use the display row's currency, not the mapped upgrade's own catalog metadata.
            if (upgrade.displayIndex !== undefined) {
                upgrade.purchaseResourceType = Math.round(upgrades[upgrade.displayIndex].data.resourceType);
            }
            // The game interprets the display index as a catalog ID for its inverse Jelly lookup.
            // Canonical repository/save order keeps each catalog ID at that array index.
            const jellyPosition = upgrade.displayIndex === undefined ? -1 : upgrades[upgrade.displayIndex]?.displayIndex ?? -1;
            upgrade.jellyObstruction11DiscountWeight = Math.max(0, Math.ceil((5 - jellyPosition) / 5));
            upgrade.jellyObstruction26DiscountWeight = Math.max(0, Math.ceil((10 - jellyPosition) / 10));
        }
        return upgrades;
    }

    parse(level: unknown): void {
        this.level = Number(level) || 0;
        this.resetCostInputs();
        this.resetUnlock();
    }

    getBonus(): number {
        return this.level * this.data.bonusPerLevel;
    }

    isUnlocked(): boolean {
        return this.unlocked;
    }

    getMaxLevel(): number {
        return this.data.maxLevel;
    }

    isMaxLevel(): boolean {
        return this.level >= this.getMaxLevel();
    }

    getPurchaseResourceType(): number | undefined {
        return this.purchaseResourceType;
    }

    getImageData(): ImageData {
        return { location: `RAupg${this.index}`, width: 48, height: 48 };
    }

    resetUnlock(): void {
        this.unlocked = false;
    }

    updateUnlock(unlockedUpgradeCount: number): void {
        // Unlocks follow the displayed prefix, independently of purchase price or level cap.
        this.unlocked = this.displayIndex !== undefined && this.displayIndex < unlockedUpgradeCount;
    }

    resetCostInputs(): void {
        this.masterClassCostMultiplier = 1;
        this.jellyCostMultiplier = 1;
    }

    updateCostInputs(masterClassCostMultiplier: number, jellyObstruction11Bonus: number, jellyObstruction26Bonus: number): void {
        this.masterClassCostMultiplier = masterClassCostMultiplier;
        // Settle the combined account discount once for subsequent purchase quotes.
        this.jellyCostMultiplier = 1 / (1 + (
            this.jellyObstruction11DiscountWeight * jellyObstruction11Bonus +
            this.jellyObstruction26DiscountWeight * jellyObstruction26Bonus
        ) / 100);
    }

    /** Raw one-purchase quote from the supplied owned level, using settled account discounts. */
    getCost(level: number = this.level): number {
        if (this.displayIndex === undefined) return 0;

        // Royal Talent Points I and Solo Militia Status have cheap opening purchases before ordinary discounts.
        if (this.index === 46 && level < 3) return 2;
        if (this.index === 58 && level < 1) return 3;

        // Preserve the game's multiplication order when applying the prepared account multipliers.
        return 25 *
            this.masterClassCostMultiplier *
            this.displayCostGrowth *
            this.displayCostWeight *
            this.jellyCostMultiplier *
            this.data.costBase *
            Math.pow(this.data.costExponent, level);
    }
}
