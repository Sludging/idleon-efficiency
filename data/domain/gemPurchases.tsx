import { Domain, RawData } from "./base/domain"
import { GemShopItemBase, initGemShopRepo } from "./data/GemShopRepo"
import { ImageData } from "./imageData"
import { Item } from "./items"
import { GemShopItemModel } from "./model/gemShopItemModel"

export class GemPurchase {
    name: string
    mtxName: string
    itemName: string
    desc: string
    cost: number
    maxPurchases: number
    qty: number
    costIncrement: number
    no: number
    section: string
    groupId: number
    sectionId: number
    slot: number
    isOffer: boolean

    pucrhased = 0;

    constructor(public index: number, data: GemShopItemModel) {
        this.name = data.name;
        this.mtxName = data.mtxName;
        this.itemName = data.itemDisplayName;
        this.desc = data.desc;
        this.cost = data.cost;
        this.maxPurchases = data.maxPurchases;
        this.qty = data.qty;
        this.costIncrement = data.costIncrement;
        this.no = data.no;
        this.section = data.section;
        this.groupId = data.groupId;
        this.sectionId = data.sectionId;
        this.slot = data.slot;
        this.isOffer = data.isOffer;
    }

    getCurrentCost(): number {
        return Math.round(this.pucrhased * this.costIncrement + this.cost);
    }

    getCostToMax(): number {
        // Round each purchase price before adding the remaining costs.
        let total = 0;
        for (let count = this.pucrhased; count < this.maxPurchases; count++) {
            total += Math.round(count * this.costIncrement + this.cost);
        }
        return total;
    }

    getImageData(): ImageData {
        return Item.getImageData(this.name);
    }

    static fromBase(data: GemShopItemBase[]): GemPurchase[] {
        return data.map(purchase => new GemPurchase(purchase.index, purchase.data))
    }
}

export class GemStore extends Domain {
    purchases: GemPurchase[] = [];
    gemBalance: number | undefined = undefined;

    getRawKeys(): RawData[] {
        return [
            { key: "GemItemsPurchased", perPlayer: false, default: [] }
        ]
    }
    init(_allItems: Item[], _charCount: number) {
        this.purchases = GemPurchase.fromBase(initGemShopRepo());
        return this;
    }
    parse(data: Map<string, any>): void {
        const gems = data.get(this.getDataKey()) as GemStore;
        const gemData = data.get("GemItemsPurchased") as number[];
        const rawData = data.get("rawData") as Record<string, string | number | undefined>;

        gems.gemBalance = rawData.GemsOwned === undefined ? undefined : Number(rawData.GemsOwned);

        gems.purchases.forEach(purchase => {
            purchase.pucrhased = Number(gemData[purchase.no] ?? 0);
        });
    }
}
