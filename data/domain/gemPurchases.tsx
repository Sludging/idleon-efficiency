import { Cloudsave } from "./cloudsave"
import { GemShopItemBase, initGemShopRepo } from "./data/GemShopRepo"
import { IParser, safeJsonParse } from "./idleonData"
import { GemShopItemModel } from "./model/gemShopItemModel"

export class GemPurchase {
    name: string
    itemName: string
    desc: string
    cost: number
    maxPurchases: number
    qty: number
    costIncrement: number
    no: number

    pucrhased = 0;

    constructor(public index: number, data: GemShopItemModel) {
        this.name = data.name;
        this.itemName = data.itemDisplayName;
        this.desc = data.desc;
        this.cost = data.cost;
        this.maxPurchases = data.maxPurchases;
        this.qty = data.qty;
        this.costIncrement = data.costIncrement;
        this.no = data.no;
    }

    static fromBase(data: GemShopItemBase[]): GemPurchase[] {
        return data.map(purchase => new GemPurchase(purchase.index, purchase.data))
    }
}

export class GemStore {
    purchases: GemPurchase[];

    constructor() {
        this.purchases = GemPurchase.fromBase(initGemShopRepo());
    }
}

export const initGems = () => {
    return new GemStore();
}

const parseGems: IParser = function (raw: Cloudsave, data: Map<string, any>) {
    const gems = data.get("gems") as GemStore;
    const gemData = safeJsonParse(raw, "GemItemsPurchased", []) as number[];

    gemData.forEach((data, index) => {
        if (data > 0) {
            let purchase = gems.purchases.find(x => x.no == index);
            if (purchase) {
                purchase.pucrhased = data;
            }
        }
    })

    data.set("gems", gems);
}

export default parseGems;