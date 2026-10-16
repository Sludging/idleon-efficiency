import { Domain, RawData } from "../base/domain";
import { initZenithMarketRepo, ZenithMarketBase } from "../data/ZenithMarketRepo";
import { Item } from "../items";
import { ZenithMarketModel } from "../model/zenithMarketModel";
import { Player } from "../player";
import { Storage } from "../storage";
import { commaNotation, notateNumber } from "../../utility";

export interface NonDepositedCluster {
    source: string,
    quantity: number
}

export class ZenithMarketBonus {
    public level: number = 0;
    public unlocked: boolean;

    constructor(public index: number, public data: ZenithMarketModel) {
        this.unlocked = index === 0;
    }

    getBonus(): number {
        return Math.floor(this.data.bonusPerLevel * this.level);
    }

    getBonusText(): string {
        const bonus = this.getBonus();
        const description = this.data.description.replace("{", commaNotation(bonus));

        return description.replace("}", notateNumber(1 + bonus / 100, "MultiplierInfo").replace("#", ""));
    }

    getNextLevelCost(level: number = this.level): number {
        const nextLevelCost = level + this.data.unlockCost * Math.pow(this.data.costExponent, level);

        // The game floors costs below 1,000,000 and preserves fractions above it.
        if (1E6 > nextLevelCost) {
            return Math.floor(nextLevelCost);
        }

        return nextLevelCost;
    }

    getCostToMax(): number {
        let totalCost = 0;
        for (let level = this.level; level < this.data.maxLevel; level++) {
            totalCost += this.getNextLevelCost(level);
        }

        return totalCost;
    }

    static fromBase(data : ZenithMarketBase[]) {
        return data.map(d => new ZenithMarketBonus(d.index, d.data));
    }
}

export class ZenithMarket extends Domain {
    bonuses: ZenithMarketBonus[] = [];
    depositedClusters: number = 0;
    nonDepositedClusters: NonDepositedCluster[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: 0 }
        ]
    }

    init(_allItems: Item[]) {
        this.bonuses = ZenithMarketBonus.fromBase(initZenithMarketRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const zenithMarket = data.get(this.getDataKey()) as ZenithMarket;
        const spelunkingData = data.get("Spelunk") as any[][];
        const optionList = data.get("OptLacc") as number[];

        // Safe guard for old accounts / missing data.
        if (!spelunkingData || spelunkingData.length == 0) {
            return;
        }

        zenithMarket.depositedClusters = optionList[486] ?? 0;

        const zenithMarketLevels = spelunkingData[45] as number[];

        zenithMarket.bonuses.forEach(bonus => {
            bonus.level = zenithMarketLevels[bonus.index] || 0;
            bonus.unlocked = bonus.index === 0 || (zenithMarketLevels[bonus.index - 1] ?? 0) >= 1;
        });
    }

    getBonusForId(index: number): number {
        return this.bonuses.find(bonus => bonus.index == index)?.getBonus() ?? 0;
    }
}

export const updateNonDepositedZenithClusters = (data: Map<string, any>) => {
    const zenithMarket = data.get("zenithMarket") as ZenithMarket;
    const players = data.get("players") as Player[];
    const storage = data.get("storage") as Storage;

    zenithMarket.nonDepositedClusters = [];

    const clusterItemInternalName = "Quest110";

    const quantityInChest = storage.chest.reduce((sum, item) => sum += item.internalName == clusterItemInternalName ? item.count : 0, 0);
    if (quantityInChest > 0) {
        zenithMarket.nonDepositedClusters.push({
            source: "Chest",
            quantity: quantityInChest
        });
    }

    storage.playerStorage.forEach((inventory, playerIndex) => {
        const quantityInPlayerInventory = inventory.reduce((sum, item) => sum += item.internalName == clusterItemInternalName ? item.count : 0, 0);
        if (quantityInPlayerInventory > 0) {
            zenithMarket.nonDepositedClusters.push({
                source: `${players[playerIndex].playerName ?? ""}`,
                quantity: quantityInPlayerInventory
            });
        }
    });

    return zenithMarket;
}