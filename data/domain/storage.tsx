import { range } from "../utility";
import { Cloudsave } from "./cloudsave";
import { IParser, safeJsonParse } from "./idleonData";
import { Item, StoneProps } from "./items";
import { Refinery, RefineryStorage } from "./refinery";

export class Storage {
    chest: Item[] = []
    playerStorage: Item[][] = [];
    refinery: RefineryStorage[] = []
    storageChestsUsed: Record<string, number> = {}
    money: number = 0;

    amountInStorage = (itemName: string): number => {
        let finalCount = 0;

        finalCount += this.chest.reduce((sum, item) => sum += item.internalName == itemName ? item.count : 0, 0);
        finalCount += this.playerStorage.reduce((sum, player) => sum += player.reduce((sum,item) => sum += item.internalName == itemName ? item.count : 0, 0), 0);
        finalCount += this.refinery.find(item => item.name == itemName)?.quantity ?? 0;

        return finalCount;
    }
}

export const initStorage = () => {
    return new Storage();
}

const parseStorage: IParser = function (raw: Cloudsave, data: Map<string, any>) {
    const storage = data.get("storage") as Storage;
    const allItems = data.get("itemsData") as Item[];
    const charCount = data.get("charCount") as number;

    const chestOrder = safeJsonParse(raw, "ChestOrder", []) as string[];
    const chestQuantity = safeJsonParse(raw, "ChestQuantity", []) as number[];
    const storageInvUsed = safeJsonParse(raw, "InvStorageUsed", {}) as Record<string, number>;

    chestOrder.forEach((item, index) => {
        const itemData = allItems.find(x => x.internalName == item)?.duplicate() ?? Item.emptyItem(item);
        itemData.count = chestQuantity[index];
        storage.chest.push(itemData);
    });

    range(0, charCount).forEach((_, index) => {
        let playerInventory: Item[] = [];
        const inventoryOrder: string[] = safeJsonParse(raw, `InventoryOrder_${index}`, []);
        const inventoryQuantity: number[] = safeJsonParse(raw, `ItemQTY_${index}`, []);
        const stoneData: Record<number,StoneProps> = safeJsonParse(raw, `IMm_${index}`, {}); 
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
    storage.money = safeJsonParse(raw, "MoneyBANK", 0);

    data.set("storage", storage);
}

export const updateStorage = (data: Map<string, any>) => {
    const storage = data.get("storage") as Storage;
    const refinery = data.get("refinery") as Refinery;

    storage.refinery = refinery.storage;

    return storage;
}

export default parseStorage;