import { Domain, RawData } from "../base/domain";
import type { Item } from "../items";

export class Glimbo extends Domain {
    tradeCounts: number[] = [];

    getRawKeys(): RawData[] {
        return [{ key: "Research", perPlayer: false, default: [] }];
    }

    init(_allItems: Item[], _charCount: number): Glimbo {
        this.tradeCounts = [];
        return this;
    }

    parse(data: Map<string, any>): void {
        const glimbo = data.get(this.getDataKey()) as Glimbo;
        const research = data.get("Research") as unknown[][];
        const tradeCounts = research[12] ?? [];
        glimbo.tradeCounts = tradeCounts.map(count => Number(count));
    }

    get totalTrades(): number {
        let totalTrades = 0;
        for (const count of this.tradeCounts) {
            // The game rounds the running total after each trade count.
            totalTrades = Math.round(totalTrades + count);
        }
        return Math.round(totalTrades);
    }
}
