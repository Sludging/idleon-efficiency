import { BribeBase, initBribeRepo } from "./data/BribeRepo";

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

export const initBribes = () => {
    return Bribe.fromBase(initBribeRepo());
}

export default function parseBribes(bribesData: number[]) {
    let bribeArray = Bribe.fromBase(initBribeRepo());
    bribesData.forEach((bribe, index) => {
        if (index < bribeArray.length) { // ignore future values
            bribeArray[index].status = bribe as BribeStatus;
        }
    })
    return bribeArray;
}
