import { Domain, RawData } from "./base/domain"
import { GemShopItemBase, initGemShopRepo } from "./data/GemShopRepo"
import { Item } from "./items"
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

export class GemStore extends Domain {
    purchases: GemPurchase[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "GemItemsPurchased", perPlayer: false, default: [] }
        ]
    }
    init(allItems: Item[], charCount: number) {
        this.purchases = GemPurchase.fromBase(initGemShopRepo());
        return this;
    }
    parse(data: Map<string, any>): void {
        const gems = data.get(this.getDataKey()) as GemStore;
        const gemData = data.get("GemItemsPurchased") as number[];

        gemData.forEach((data, index) => {
            if (data > 0) {
                let purchase = gems.purchases.find(x => x.no == index);
                if (purchase) {
                    purchase.pucrhased = data;
                }
            }
        })
    }
}