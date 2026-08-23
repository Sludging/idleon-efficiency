import { Domain, RawData } from "../base/domain";
import { SushiBase, initSushiRepo } from "../data/SushiRepo";
import { Item } from "../items";
import { SushiModel } from "../model/sushiModel";

export class Sushi {
    unlocked: boolean = false;

    constructor(public index: number, public data: SushiModel) { }

    static fromBase = (data: SushiBase[]): Sushi[] => {
        return data.map(sushi => new Sushi(sushi.index, sushi.data));
    }

    getBaseBonus(): number {
        return this.data.unlockBonus;
    }

    getBonus(): number {
        return this.unlocked ? this.getBaseBonus() : 0;
    }
}

export class SushiStation extends Domain {
    sushi: Sushi[] = [];
    uniqueSushi: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Sushi", perPlayer: false, default: [] }
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        this.sushi = Sushi.fromBase(initSushiRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const sushiStation = data.get(this.getDataKey()) as SushiStation;
        const sushiData = data.get("Sushi") as number[][] || [];
        const unlockedSushi = sushiData[5] || [];

        sushiStation.uniqueSushi = sushiStation.sushi.reduce((count, sushi) => {
            sushi.unlocked = Number(unlockedSushi[sushi.index]) >= 0;
            return count + (sushi.unlocked ? 1 : 0);
        }, 0);
    }

    getUniqueSushi(): number {
        return this.uniqueSushi;
    }

    getBonusFromIndex(index: number): number {
        return this.sushi.find(sushi => sushi.index === index)?.getBonus() ?? 0;
    }
}

