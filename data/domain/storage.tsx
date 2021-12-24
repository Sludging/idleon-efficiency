import { Cloudsave } from "./cloudsave";
import { Item, StoneProps } from "./items";

export class Storage {
    chest: Item[] = []
    playerStorage: Item[][] = [];
}

export default function parseStorage(doc: Cloudsave, playerNames: string[], allItems: Item[]) {
    const chestOrder: string[] = doc.get("ChestOrder");
    const chestQuantity: number[] = doc.get("ChestQuantity");
    
    const storage = new Storage();
    chestOrder.forEach((item, index) => {
        const itemData = allItems.find(x => x.internalName == item)?.duplicate() ?? new Item({ internalName: item, displayName: item, Type: "Misc"});
        itemData.count = chestQuantity[index];
        storage.chest.push(itemData);
    });

    playerNames.forEach((_, index) => {
        let playerInventory: Item[] = [];
        const inventoryOrder: string[] = doc.get(`InventoryOrder_${index}`);
        const inventoryQuantity: number[] = doc.get(`ItemQTY_${index}`);
        const stoneData: Record<number,StoneProps> = JSON.parse(doc.get(`IMm_${index}`)); 
        inventoryOrder.forEach((item, index) => {
            const itemData = allItems.find(x => x.internalName == item)?.duplicate() ?? new Item({ internalName: item, displayName: item, Type: "Misc"});
            itemData.count = inventoryQuantity[index];
            playerInventory.push(itemData);
        });

        Object.entries(stoneData).forEach(([location, data]) => {
            const asNumber = Number(location);
            playerInventory[asNumber].addStone(data);
        });

        storage.playerStorage.push(playerInventory);
    });
    return storage;
}