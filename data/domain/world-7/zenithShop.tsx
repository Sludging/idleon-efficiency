import { Domain, RawData } from "../base/domain";
import { initZenithMarketBonusRepo, ZenithMarketBonusBase } from "../data/ZenithMarketBonusRepo";
import { Item } from "../items";
import { ZenithMarketBonusModel } from "../model/zenithMarketBonusModel";

export interface NonDepositedCluster {
    source: string,
    quantity: number
}

export class ZenithMarketBonus {
    public level: number = 0;

    constructor(public index: number, public data: ZenithMarketBonusModel) {}

    getBonus(): number {
        return this.data.bonus * this.level;
    }

    getNextLevelCost(): number {
        const nextlevelCost = this.level + this.data.unlockCost * Math.pow(this.data.costExponent, this.level);

        // Not sure why the cost is not always floored, it's like that in-game tho
        if (1E6 > nextlevelCost) {
            return Math.floor(nextlevelCost);
        }

        return nextlevelCost;
    }

    static fromBase(data : ZenithMarketBonusBase[]) {
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
        this.bonuses = ZenithMarketBonus.fromBase(initZenithMarketBonusRepo());
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
        });
    }

    getBonusForId(index: number): number {
        return this.bonuses.find(bonus => bonus.index == index)?.getBonus() ?? 0;
    }
}
