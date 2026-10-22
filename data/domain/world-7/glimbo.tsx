import { Domain, RawData } from "../base/domain";
import { GlimboTradeBase, initGlimboTradeRepo } from "../data/GlimboTradeRepo";
import type { GlimboTradeModel } from "../model/glimboTradeModel";
import { Item } from "../items";
import { UpgradeVault, VaultUpgBonus } from "../upgradeVault";
import { EventShop } from "../eventShop";
import { getCompanionActiveBonus, Companion } from "../companions";
import { ResearchGrid } from "./research";
import { StaticRepositories } from "../repositories";
import { ImageData } from "../imageData";
import { Storage } from "../storage";

export const greenstackThreshold = 10_000_000;

export class GlimboTrade {
    count: number = 0;
    cost: number = 0;
    currentVaultLevel: number = 0;
    maximumLevel: number = 0;
    nextMaximumLevel: number = 0;
    material!: Item;
    upgradeName: string = "";
    upgradeImageData: ImageData = { location: "", height: 0, width: 0 };
    private companionCostBonus: number = 0;
    private couponCostMultiplier: number = 1;

    constructor(public index: number, public data: GlimboTradeModel) { }

    get nextMaximumLevelGain(): number {
        return this.nextMaximumLevel - this.maximumLevel;
    }

    getCostAtCount(count: number): number {
        const baseCost = (1 + count + 1.5 * count)
            * Math.pow(this.data.costScaling, count)
            * this.couponCostMultiplier;
        const companionCostMultiplier = baseCost < 1e9
            ? Math.max(0.2, 1 - this.companionCostBonus / 100)
            : Math.max(0.01, 1 - this.companionCostBonus / 100);

        return baseCost < 1e9
            ? Math.floor(Math.max(1, baseCost * companionCostMultiplier))
            : baseCost * companionCostMultiplier;
    }
    canAfford(resourceBudget: number, count: number = this.count): boolean {
        return resourceBudget >= this.getCostAtCount(count);
    }

    getAffordableTradeCount(resourceBudget: number): number {
        let remainingBudget = resourceBudget;
        let affordableTradeCount = 0;
        let proposedCount = this.count;

        while (true) {
            const nextCost = this.getCostAtCount(proposedCount);
            if (nextCost > remainingBudget) return affordableTradeCount;

            remainingBudget -= nextCost;
            proposedCount++;
            affordableTradeCount++;
        }
    }

    setCostDiscounts(couponCostMultiplier: number, companionCostBonus: number): void {
        this.couponCostMultiplier = couponCostMultiplier;
        this.companionCostBonus = companionCostBonus;
    }

    static fromBase(data: GlimboTradeBase[]): GlimboTrade[] {
        return data.map(trade => new GlimboTrade(trade.index, trade.data));
    }
}

export class Glimbo extends Domain {
    tradeCounts: number[] = [];
    trades: GlimboTrade[] = [];
    bundleUpgradeCount: number = 0;
    private dropRateMultiplier: number = 1;
    private storage: Storage | null = null;

    getRawKeys(): RawData[] {
        return [
            { key: "Research", perPlayer: false, default: [] },
            { key: "BundlesReceived", perPlayer: false, default: null },
        ];
    }

    init(allItems: Item[], _charCount: number, repositories: StaticRepositories): Glimbo {
        this.tradeCounts = [];
        this.storage = null;
        this.trades = GlimboTrade.fromBase(initGlimboTradeRepo());
        this.trades.forEach(trade => {
            trade.material = allItems.find(item => item.internalName === trade.data.costItem)!;
            trade.upgradeImageData = VaultUpgBonus.imageDataForId(trade.data.vaultUpgradeIndex);
            const upgrade = repositories.get("UpgradeVault").find(entry => entry.index === trade.data.vaultUpgradeIndex);
            trade.upgradeName = upgrade?.data.name || "";
            trade.currentVaultLevel = 0;
            trade.cost = trade.getCostAtCount(0);
            trade.maximumLevel = (upgrade?.data.max_level ?? 0) + 1;
            trade.nextMaximumLevel = (upgrade?.data.max_level ?? 0) + 2;
        });
        return this;
    }

    parse(data: Map<string, any>): void {
        const glimbo = data.get(this.getDataKey()) as Glimbo;
        const research = data.get("Research") as unknown[][];
        const savedTradeCounts = research[12] ?? [];
        glimbo.tradeCounts = savedTradeCounts.map(count => Number(count));
        const bundles = data.get("BundlesReceived") as Record<string, number> | null;
        glimbo.bundleUpgradeCount = Number(bundles?.bon_u ?? 0);
        glimbo.trades.forEach(trade => {
            trade.count = glimbo.tradeCounts[trade.index] ?? 0;
        });
    }

    get totalTrades(): number {
        let totalTrades = 0;
        for (const count of this.tradeCounts) {
            // The game rounds the running total after each trade count.
            totalTrades = Math.round(totalTrades + count);
        }
        return Math.round(totalTrades);
    }

    get dropRateBonusMultiplier(): number {
        return this.dropRateMultiplier;
    }
    getResourceBudget(tradeIndex: number, maintainGreenstacks: boolean): number {
        if (this.storage === null) return 0;

        const itemName = this.trades[tradeIndex].data.costItem;
        const bankStock = this.storage.chest.reduce(
            (total, item) => total + (item.internalName === itemName ? item.count : 0),
            0,
        );
        const reservedBankStock = maintainGreenstacks ? Math.min(bankStock, greenstackThreshold) : 0;
        return this.storage.amountInStorage(itemName) - reservedBankStock;
    }

    update(
        upgradeVault: UpgradeVault,
        research: ResearchGrid,
        eventShop: EventShop,
        companions: Companion[],
        storage: Storage,
    ): void {
        this.storage = storage;
        this.dropRateMultiplier = 1 + research.bonuses[168].getBonusMode2() / 100;
        const bundleMaximumBonus = Math.max(0, Math.min(10, 10 * this.bundleUpgradeCount));
        const enhancedMaximumIncrease = 1 + research.bonuses[169].getLevel() + Number(eventShop.isBonusOwned(40));
        const companionCostBonus = getCompanionActiveBonus(companions, 57);
        const couponCostMultiplier = Math.max(0.1, 1 - 25 * Number(eventShop.isBonusOwned(38)) / 100);

        this.trades.forEach(trade => {
            const vaultUpgrade = upgradeVault.bonuses[trade.data.vaultUpgradeIndex];
            trade.currentVaultLevel = vaultUpgrade.level;
            trade.setCostDiscounts(couponCostMultiplier, companionCostBonus);
            trade.cost = trade.getCostAtCount(trade.count);

            const maximumStep = trade.data.enhancedMaxLevelEligible ? enhancedMaximumIncrease : 1;
            const baseMaximum = vaultUpgrade.data.max_level + bundleMaximumBonus;
            trade.maximumLevel = Math.round(baseMaximum + maximumStep * (trade.count + 1));
            trade.nextMaximumLevel = Math.round(baseMaximum + maximumStep * (trade.count + 2));
        });
    }
}

export const updateGlimbo = (data: Map<string, any>): void => {
    const glimbo = data.get("glimbo") as Glimbo;
    glimbo.update(
        data.get("upgradeVault") as UpgradeVault,
        data.get("research") as ResearchGrid,
        data.get("eventShop") as EventShop,
        data.get("companions") as Companion[],
        data.get("storage") as Storage,
    );
};
