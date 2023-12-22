import { Domain, RawData } from "./base/domain";
import { BribeBase, initBribeRepo } from "./data/BribeRepo";
import { Item } from "./items";

export const BribeConst = {
    StampBribe: 0
};

export enum BribeStatus {
    Purchased = 1,
    Available = 0,
    Locked = -1
}

export class Bribe {
    public status: BribeStatus = BribeStatus.Locked;

    constructor(public bribeIndex: number, public name: string, public description: string, public cost: number, public type: string, public bonus: string, public value: number) { }

    static fromBase = (data: BribeBase[]) => {
        return data.map((bribe, index) => new Bribe(index, bribe.data.name, bribe.data.desc, bribe.data.cost, bribe.data.type, bribe.data.intName, bribe.data.amount));
    }

    getBonus = () => {
        if (this.status != BribeStatus.Purchased) {
            return 0;
        }

        return this.value;
    }
}

export class Bribes extends Domain {
    getRawKeys(): RawData[] {
        return [
            { key: "BribeStatus", perPlayer: false, default: [] }
        ]
    }
    init(allItems: Item[], charCount: number) {
        return Bribe.fromBase(initBribeRepo());
    }
    parse(data: Map<string, any>): void {
        const bribes = data.get(this.getDataKey()) as Bribe[];
        const bribesData = data.get("BribeStatus") as number[];
    
        bribesData.forEach((bribe, index) => {
            if (index < bribes.length) { // ignore future values
                bribes[index].status = bribe as BribeStatus;
            }
        })
    }

}