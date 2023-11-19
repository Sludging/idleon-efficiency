import { Cloudsave } from "./cloudsave";
import { BribeBase, initBribeRepo } from "./data/BribeRepo";
import { IParser, safeJsonParse } from "./idleonData";

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

const parseBribes: IParser = function (raw: Cloudsave, data: Map<string, any>) {
    const bribes = data.get("bribes") as Bribe[];
    const bribesData = safeJsonParse(raw, "BribeStatus", []) as number[];

    bribesData.forEach((bribe, index) => {
        if (index < bribes.length) { // ignore future values
            bribes[index].status = bribe as BribeStatus;
        }
    })

    data.set("bribes", bribes);
}

export default parseBribes;