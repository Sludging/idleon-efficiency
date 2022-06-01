import { Cloudsave } from "./cloudsave";
import { Item, StoneProps } from "./items";

export class Storage {
    chest: Item[] = []
    playerStorage: Item[][] = [];
    storageChestsUsed: Record<string, number> = {}
    money: number = 0;
}

export default function parseStorage(doc: Cloudsave, playerNames: string[], allItems: Item[], storageInvUsed: Record<string, number>) {
    const chestOrder: string[] = doc.get("ChestOrder");
    const chestQuantity: number[] = doc.get("ChestQuantity");
    
    const storage = new Storage();
    chestOrder.forEach((item, index) => {
        const itemData = allItems.find(x => x.internalName == item)?.duplicate() ?? Item.emptyItem(item);
        itemData.count = chestQuantity[index];
        storage.chest.push(itemData);
    });

    playerNames.forEach((_, index) => {
        let playerInventory: Item[] = [];
        const inventoryOrder: string[] = doc.get(`InventoryOrder_${index}`);
        const inventoryQuantity: number[] = doc.get(`ItemQTY_${index}`);
        const stoneData: Record<number,StoneProps> = JSON.parse(doc.get(`IMm_${index}`)); 
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
    });

    storage.storageChestsUsed = storageInvUsed;
    storage.money = doc.get("MoneyBANK");
    return storage;
}