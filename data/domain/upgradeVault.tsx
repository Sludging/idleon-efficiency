import { nFormatter } from "../utility";
import { Domain, RawData } from "./base/domain";
import { UpgradeVaultBase, initUpgradeVaultRepo } from "./data/UpgradeVaultRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { UpgradeVaultModel } from "./model/upgradeVaultModel";
import { EventShop } from "./eventShop";
import { ResearchGrid } from "./world-7/research";
import type { Glimbo, GlimboTrade } from "./world-7/glimbo";
import { getCompanionActiveBonus, type Companion } from "./companions";
import type { SushiStation } from "./world-7/sushi";

export class VaultUpgBonus {
    public level: number = 0;
    public unlocked: boolean = false;
    public bonus: number = 0;
    public cost: number = 0;
    public costToMax: number = 0;
    public reductionFromDarts: number = 0;
    private companionDiscountPercent: number = 0;
    private sushiDiscountPercent: number = 0;
    private gildedAwningsOwned: boolean = false;
    private bundleUpgradeCount: number = 0;
    private glimboTrade: GlimboTrade | undefined;
    private enhancedMaximumIncrease: number = 1;

    constructor(
        public id: number,
        public data: UpgradeVaultModel,
    ) { 
        // Remove the "製" from the name if it exists, they are used in-game to indicate tooltips.
        if (data.name.indexOf("製") > -1) {
            this.data.name = this.data.name.split("製")[0].trim();
        }
        // $ is used as placeholder for additional text (depending on other game mechanics), remove it.
        this.data.name = data.name.replace("$", "");
    }

    static fromBase = (data: UpgradeVaultBase[]): VaultUpgBonus[] => {
        return data.map((upgrade, index) => new VaultUpgBonus(
            index,
            upgrade.data
        ));
    }

    getImageData = (): ImageData => {
        return VaultUpgBonus.imageDataForId(this.id);
    }

    static imageDataForId = (id: number): ImageData => {
        return {
            location: `VaultUpg${id}`,
            height: 56,
            width: 51,
        }
    }

    getBonus = (allUpgrades: VaultUpgBonus[]): number => {
        if (this.level === 0) {
            return 0;
        }

        // These rows ignore their color band's Vault Mastery multiplier.
        const isDirectUpgrade = [
            1, 6, 7, 8, 9, 13, 32, 33, 36, 40, 42, 43, 44, 49, 51, 52, 53, 57, 61,
            64, 70, 73, 74, 76, 79, 85, 86, 88, 89,
        ].includes(this.id);

        const baseBonus = this.level * this.data.value;
        if (isDirectUpgrade) {
            return baseBonus;
        }

        // Base damage gains extra points past its level thresholds, then blue Vault Mastery.
        if (this.id === 0) {
            const extraBonus = (
                Math.max(0, this.level - 25) +
                Math.max(0, this.level - 50) +
                Math.max(0, this.level - 100)
            );
            const vaultMasteryBonus: number = allUpgrades[32]?.getBonus(allUpgrades) || 0;
            return (baseBonus + extraBonus) * (1 + vaultMasteryBonus / 100);
        }

        // Cooking gains increasingly weighted threshold points, a level multiplier, then green Vault Mastery.
        if (this.id === 60) {
            const extraBonus = (
                Math.max(0, this.level - 25) +
                Math.max(0, this.level - 50) +
                2 * Math.max(0, this.level - 100) +
                3 * Math.max(0, this.level - 200) +
                5 * Math.max(0, this.level - 300) +
                7 * Math.max(0, this.level - 400) +
                10 * Math.max(0, this.level - 450)
            );
            const levelMultiplier = 1 + Math.floor(this.level / 25) / 5;
            const vaultMasteryBonus2: number = allUpgrades[61]?.getBonus(allUpgrades) || 0;
            return (baseBonus + extraBonus) * levelMultiplier * (1 + vaultMasteryBonus2 / 100);
        }

        // Ordinary rows use the Vault Mastery upgrade at the end of their color band.
        if (this.id < 32) {
            const vaultMasteryBonus: number = allUpgrades[32]?.getBonus(allUpgrades) || 0;
            return this.level * this.data.value * (1 + vaultMasteryBonus / 100);
        }

        if (this.id < 61) {
            const vaultMasteryBonus2: number = allUpgrades[61]?.getBonus(allUpgrades) || 0;
            return this.level * this.data.value * (1 + vaultMasteryBonus2 / 100);
        }

        if (this.id < 89) {
            const vaultMasteryBonus3: number = allUpgrades[89]?.getBonus(allUpgrades) || 0;
            return this.level * this.data.value * (1 + vaultMasteryBonus3 / 100);
        }

        return 0;
    }

    prepareMaximumLevelInputs(
        gildedAwningsOwned: boolean,
        bundleUpgradeCount: number,
        glimboTrade: GlimboTrade | undefined,
        enhancedMaximumIncrease: number,
    ): void {
        this.gildedAwningsOwned = gildedAwningsOwned;
        this.bundleUpgradeCount = bundleUpgradeCount;
        this.glimboTrade = glimboTrade;
        this.enhancedMaximumIncrease = enhancedMaximumIncrease;
    }

    getMaxLevel = (): number => {
        const eventShopIncrease = this.data.eventShopMaxLevelEligible
            ? 25 * Number(this.gildedAwningsOwned) : 0;
        const bundleIncrease = Math.max(0, Math.min(10, 10 * this.bundleUpgradeCount));

        if (this.glimboTrade !== undefined) {
            const tradeIncrease = this.glimboTrade.data.enhancedMaxLevelEligible
                ? this.enhancedMaximumIncrease : 1;
            return Math.round(
                this.data.max_level + (eventShopIncrease + bundleIncrease)
                + tradeIncrease * this.glimboTrade.count,
            );
        }

        // One-level upgrades receive the event increase, but not the bundle increase.
        if (this.data.max_level >= 2) {
            return Math.round(this.data.max_level + (eventShopIncrease + bundleIncrease));
        }
        return Math.round(this.data.max_level + eventShopIncrease);
    }

    preparePriceInputs(companionDiscountPercent: number, sushiDiscountPercent: number): void {
        this.companionDiscountPercent = companionDiscountPercent;
        this.sushiDiscountPercent = sushiDiscountPercent;
    }

    getCost = (allUpgrades: VaultUpgBonus[]): number => {
        if (this.level >= this.getMaxLevel()) {
            return 0;
        }

        return this.getRawCost(allUpgrades);
    }

    // Native quotes remain available when the effective cap blocks a purchase.
    getRawCost = (allUpgrades: VaultUpgBonus[]): number => {
        const dartsFactor = 1 / (1 + this.reductionFromDarts / 100);
        // Major Discount applies only to the first color band, before its lower floor.
        let costMultiplier = this.id < 33
            ? Math.max(0.001, (1 / (1 + allUpgrades[13].getBonus(allUpgrades) / 100)) * dartsFactor)
            : Math.max(0.01, dartsFactor);
        costMultiplier *= Math.max(0.1, 1 - this.companionDiscountPercent / 100);
        costMultiplier *= Math.max(0.1, 1 - this.sushiDiscountPercent / 100);
        if (this.id >= 33) {
            costMultiplier *= Math.pow(1.1, Math.max(0, this.id - 61));
        }

        const baseCost = this.level + (this.data.base_cost + this.level) * Math.pow(this.data.scaling_factor, this.level);
        return costMultiplier * baseCost;
    }

    getCostToMax = (allUpgrades: VaultUpgBonus[]): number => {
        let totalCost = 0;
        const tempUpgrade = new VaultUpgBonus(this.id, this.data);
        tempUpgrade.level = this.level;
        tempUpgrade.reductionFromDarts = this.reductionFromDarts;
        tempUpgrade.preparePriceInputs(this.companionDiscountPercent, this.sushiDiscountPercent);
        tempUpgrade.prepareMaximumLevelInputs(
            this.gildedAwningsOwned,
            this.bundleUpgradeCount,
            this.glimboTrade,
            this.enhancedMaximumIncrease,
        );
        const maximumLevel = this.getMaxLevel();

        for (let i = this.level; i < maximumLevel; i++) {
            totalCost += tempUpgrade.getCost(allUpgrades);
            tempUpgrade.level++;
        }

        return totalCost;
    }

    getDescription = (): string => {
        // For now we only care about line1
        /* const fullDescription = this.data.description_line2 ?
            [this.data.description_line1, this.data.description_line2].join(' ') :
            this.data.description_line1; */

        const fullDescription = this.data.description_line1;

        // Lava decided that upgrade 13 (Major Discount) deserves it's own special handling
        if (this.id == 13) {
            return fullDescription.replace('$',
                (Math.round(1e4 * (1 - 1 / (1 + this.bonus / 100))) / 100).toFixed(2)
            )
        }
        return fullDescription.replace('{', this.bonus.toFixed(2))
            .replace('}', nFormatter(1 + this.bonus / 100, "MultiplierInfo"))
            .replace('$', this.bonus.toFixed(2));
    }
}

export class UpgradeVault extends Domain {
    bonuses: VaultUpgBonus[] = [];
    totalVaultLevel: number = 0;

    getRawKeys(): RawData[] {   
        return [
            { key: "UpgVault", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.bonuses = VaultUpgBonus.fromBase(initUpgradeVaultRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const upgradeVault = data.get(this.getDataKey()) as UpgradeVault;
        const upgradesData = data.get("UpgVault") as number[];
        const optionList = data.get("OptLacc") as number[];

        upgradeVault.bonuses.forEach(upgrade => {
            upgrade.prepareMaximumLevelInputs(false, 0, undefined, 1);
            upgrade.preparePriceInputs(0, 0);
            upgrade.cost = 0;
            upgrade.costToMax = 0;
        });
    
        // Calculate total vault level first
        upgradeVault.totalVaultLevel = upgradesData.reduce((sum, level) => sum + level, 0);

        // Retrieve it directly without using the domain class to avoid a post parse recalculation
        const costReductionFromDarts = optionList[437] || 0;
    
        upgradesData.forEach((level, index) => {
            if (index < upgradeVault.bonuses.length) {
                const upgrade = upgradeVault.bonuses[index];
                upgrade.level = level;
                upgrade.reductionFromDarts = costReductionFromDarts;
                
                // Set unlocked status based on total vault level
                upgrade.unlocked = upgradeVault.totalVaultLevel >= upgrade.data.unlock_req;
            }
        });

        // Mastery-aware bonuses remain available during parsing.
        // Mastery rows must be available before their color bands are cached.
        const specialUpgrades = [13, 32, 61, 89];
        const specialUpgradesBonuses = upgradeVault.bonuses.filter(bonus => specialUpgrades.includes(bonus.id));

        specialUpgradesBonuses.forEach(bonus => {
            bonus.bonus = bonus.getBonus(upgradeVault.bonuses);
        });

        // Then we can calculate the bonuses for the other upgrades
        upgradeVault.bonuses.forEach(bonus => {
            bonus.bonus = bonus.getBonus(upgradeVault.bonuses);
        });
    }

    updateMaximumLevels(
        eventShop: EventShop,
        research: ResearchGrid,
        glimbo: Glimbo,
        companions: Companion[],
        sushi: SushiStation,
    ): void {
        const gildedAwningsOwned = eventShop.isBonusOwned(65);
        const enhancedMaximumIncrease = 1
            + (research.bonuses[169].getLevel() + Number(eventShop.isBonusOwned(40)));
        const companionDiscountPercent = getCompanionActiveBonus(companions, 99);
        const sushiDiscountPercent = Math.max(sushi.getBonusFromIndex(38), sushi.getBonusFromIndex(47));

        this.bonuses.forEach(upgrade => {
            const trade = glimbo.trades.find(trade => trade.data.vaultUpgradeIndex === upgrade.id);
            upgrade.prepareMaximumLevelInputs(
                gildedAwningsOwned, glimbo.bundleUpgradeCount, trade, enhancedMaximumIncrease,
            );
            upgrade.preparePriceInputs(companionDiscountPercent, sushiDiscountPercent);
            upgrade.cost = upgrade.getCost(this.bonuses);
            upgrade.costToMax = upgrade.getCostToMax(this.bonuses);
        });
    }

    getBonusForId = (id: number): number => {
        const upgrade = this.bonuses.find(bonus => bonus.id === id);
        if (!upgrade) {
            return 0;
        }

        return upgrade.getBonus(this.bonuses);
    }
}
