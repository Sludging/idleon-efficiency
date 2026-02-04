import { range } from "../utility";
import { Domain, RawData } from "./base/domain";
import { Item, StoneProps } from "./items";
import { Refinery, RefineryStorage } from "./world-3/construction/refinery";

export class Storage extends Domain {
    chest: Item[] = []
    playerStorage: Item[][] = [];
    refinery: RefineryStorage[] = []
    storageChestsUsed: Record<string, number> = {}
    money: number = 0;

    amountInStorage = (itemName: string): number => {
        let finalCount = 0;

        finalCount += this.chest.reduce((sum, item) => sum += item.internalName == itemName ? item.count : 0, 0);
        finalCount += this.playerStorage.reduce((sum, player) => sum += player.reduce((sum, item) => sum += item.internalName == itemName ? item.count : 0, 0), 0);
        finalCount += this.refinery.find(item => item.name == itemName)?.quantity ?? 0;

        return finalCount;
    }

    getRawKeys(): RawData[] {
        return [
            { key: "ChestOrder", perPlayer: false, default: [] },
            { key: "ChestQuantity", perPlayer: false, default: [] },
            { key: "InvStorageUsed", perPlayer: false, default: {} },
            { key: "MoneyBANK", perPlayer: false, default: 0 },
            { key: "InventoryOrder_", perPlayer: true, default: [] },
            { key: "ItemQTY_", perPlayer: true, default: [] },
            { key: "IMm_", perPlayer: true, default: {} },
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const storage = data.get(this.getDataKey()) as Storage;
        const allItems = data.get("itemsData") as Item[];
        const charCount = data.get("charCount") as number;

        const chestOrder = data.get("ChestOrder") as string[];
        const chestQuantity = data.get("ChestQuantity") as number[];
        const storageInvUsed = data.get("InvStorageUsed") as Record<string, number>;

        // Chest data has no "persistence", so we reset the previous data.
        storage.chest = [];
        chestOrder.forEach((item, index) => {
            const itemData = allItems.find(x => x.internalName == item)?.duplicate() ?? Item.emptyItem(item);
            itemData.count = chestQuantity[index];
            storage.chest.push(itemData);
        });

        // Player storage data has no "persistence", so we reset the previous data.
        storage.playerStorage = [];
        range(0, charCount).forEach((_, index) => {
            const playerInventory: Item[] = [];
            const inventoryOrder: string[] = data.get(`InventoryOrder_${index}`);
            const inventoryQuantity: number[] = data.get(`ItemQTY_${index}`);
            const stoneData: Record<number, StoneProps> = data.get(`IMm_${index}`);
            inventoryOrder.forEach((item, index) => {
                const itemData = allItems.find(x => x.internalName == item)?.duplicate() ?? Item.emptyItem(item);
                itemData.count = inventoryQuantity[index];
                playerInventory.push(itemData);
            });

            Object.entries(stoneData).forEach(([location, data]) => {
                const asNumber = Number(location);
                playerInventory[asNumber].addStone(data);
            });

            storage.playerStorage.push(playerInventory);
        })

        storage.storageChestsUsed = storageInvUsed;
        storage.money = data.get("MoneyBANK");
    }
}

export const updateStorage = (data: Map<string, any>) => {
    const storage = data.get("storage") as Storage;
    const refinery = data.get("refinery") as Refinery;

    storage.refinery = refinery.storage;

    return storage;
}
