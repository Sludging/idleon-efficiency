import { Domain, RawData } from "../base/domain";
import { Item } from "../items";

export class Minehead extends Domain {
    opponentsDefeated: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Research", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const minehead = data.get(this.getDataKey()) as Minehead;
        const researchData = data.get("Research") as number[][] | undefined;

        minehead.opponentsDefeated = Number(researchData?.[7]?.[4]) || 0;
    }

    getOpponentsDefeated(): number {
        return this.opponentsDefeated;
    }
}
