import { Cloudsave } from "./cloudsave";
import { safeJsonParse } from "./idleonData";
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

        finalCount += this.chest.find(item => item.internalName == itemName)?.count ?? 0;
        finalCount += this.playerStorage.reduce((sum, player) => sum += (player.find(item => item.internalName == itemName)?.count ?? 0), 0);
        finalCount += this.refinery.find(item => item.name == itemName)?.quantity ?? 0;

        return finalCount;
    }
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
        const stoneData: Record<number,StoneProps> = safeJsonParse(doc, `IMm_${index}`, {}); 
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

export const updateStorage = (data: Map<string, any>) => {
    const storage = data.get("storage") as Storage;
    const refinery = data.get("refinery") as Refinery;

    storage.refinery = refinery.storage;

    return storage;
}