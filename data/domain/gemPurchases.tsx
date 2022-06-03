import { GemShopItemBase, initGemShopRepo } from "./data/GemShopRepo"
import { GemShopItemModel } from "./model/gemShopItemModel"

interface GemData {
    itemName: string
    desc: string
    cost: number
    no: number
    maxPurchases: number
    qty: number
    costIncrement: number
}

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
        this.itemName = data.itemName;
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

    constructor(rawData: number[]) {
        this.purchases = GemPurchase.fromBase(initGemShopRepo());
        
        rawData.forEach((data, index) => {
            if (data > 0) {
                let purchase = this.purchases.find(x => x.no == index);
                if (purchase) {
                    purchase.pucrhased = data;
                }
            }
        })
    }
}

export default function parseGems(gemData: number[]) {
    return new GemStore(gemData);
}