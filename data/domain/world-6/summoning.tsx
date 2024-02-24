import { Domain, RawData } from "../base/domain";
import { Item } from "../items";

export class Summoning extends Domain {
    getRawKeys(): RawData[] {
        throw new Error("Method not implemented.");
    }
    init(allItems: Item[], charCount: number) {
        throw new Error("Method not implemented.");
    }
    parse(data: Map<string, any>): void {
        throw new Error("Method not implemented.");
    }
    
}