import { range } from "../utility";
import { Domain, RawData } from "./base/domain";
import { Item, StoneProps } from "./items";
import { Refinery, RefineryStorage } from "./world-3/construction/refinery";
import { initSlabItemSortRepo } from "./data/SlabItemSortRepo";
import type { StaticRepositories } from "./repositories";
import { nonStorableGreenstackItems, unobtainableGreenstackItems, unrealisticGreenstackItems } from "./storage-greenstack-policy";

const nonStorableGreenstackTypes = ['Dungeon Evaporate', 'Dungeon Food', 'Dungeon Item'];

export class Storage extends Domain {
    chest: Item[] = []
    playerStorage: Item[][] = [];
    refinery: RefineryStorage[] = []
    storageChestsUsed: Record<string, number> = {}
    money: number = 0;
    creditedGreenStackCount: number = 0;
    creditedGreenStackItems: string[] = [];

    private greenstackableItems: string[] = [];
    private eligibleGreenstackItems: string[] = [];
    private missingGreenstackItems: string[] = [];
    private unrealisticGreenstackItems: string[] = [];

    getGreenstackCount(): number {
        return this.creditedGreenStackCount;
    }

    getEligibleGreenstackCount(): number {
        return this.eligibleGreenstackItems.length;
    }

    getEligibleGreenstackItems(): string[] {
        return this.eligibleGreenstackItems;
    }

    getMissingGreenstackItems(): string[] {
        return this.missingGreenstackItems;
    }

    getUnrealisticGreenstackItems(): string[] {
        return this.unrealisticGreenstackItems;
    }

    updateGreenstacks(): void {
        const creditedItems = new Set(this.creditedGreenStackItems);
        const eligible: string[] = [];
        const missing: string[] = [];
        const unrealistic: string[] = [];

        for (const item of this.greenstackableItems) {
            const credited = creditedItems.has(item);
            const isUnrealistic = unrealisticGreenstackItems.has(item);
            const reachable = !isUnrealistic && !unobtainableGreenstackItems.has(item);

            if (isUnrealistic) unrealistic.push(item);
            if (credited || reachable) eligible.push(item);
            if (!credited && reachable) missing.push(item);
        }

        this.eligibleGreenstackItems = eligible;
        this.missingGreenstackItems = missing;
        this.unrealisticGreenstackItems = unrealistic;
    }

    amountInStorage = (itemName: string, playerID?: number): number => {
        let finalCount = 0;

        finalCount += this.chest.reduce((sum, item) => sum += item.internalName == itemName ? item.count : 0, 0);
        if (playerID === undefined) {
            finalCount += this.playerStorage.reduce((sum, player) => sum += player.reduce((sum, item) => sum += item.internalName == itemName ? item.count : 0, 0), 0);
        } else {
            finalCount += this.playerStorage[playerID].reduce((sum, item) => sum += item.internalName == itemName ? item.count : 0, 0);
        }
        finalCount += this.refinery.find(item => item.name == itemName)?.quantity ?? 0;

        return finalCount;
    }

    getRawKeys(): RawData[] {
        return [
            { key: "ChestOrder", perPlayer: false, default: [] },
            { key: "ChestQuantity", perPlayer: false, default: [] },
            { key: "InvStorageUsed", perPlayer: false, default: {} },
            { key: "MoneyBANK", perPlayer: false, default: 0 },
            { key: "GreenStacks", perPlayer: false, default: [] },
            { key: "InventoryOrder_", perPlayer: true, default: [] },
            { key: "ItemQTY_", perPlayer: true, default: [] },
            { key: "IMm_", perPlayer: true, default: {} },
        ]
    }

    init(_allItems: Item[], _charCount: number, repositories: StaticRepositories) {
        const itemDetails = new Map(repositories.get('ItemDetail').map(item => [item.id, item.data]));
        this.greenstackableItems = initSlabItemSortRepo().flatMap(slabItem => {
            const item = slabItem.data.item.item;
            const detail = itemDetails.get(item);
            // Placeholder item types do not describe a storable item.
            if (!detail || detail.typeGen.startsWith('a') || detail.Type === 'What' || nonStorableGreenstackTypes.includes(detail.Type)
                || nonStorableGreenstackItems.has(item)) {
                return [];
            }
            return [item];
        });
        this.eligibleGreenstackItems = [];
        this.missingGreenstackItems = [];
        this.unrealisticGreenstackItems = [];
        return this;
    }

    parse(data: Map<string, any>): void {
        const storage = data.get(this.getDataKey()) as Storage;
        const allItems = data.get("itemsData") as Item[];
        const charCount = data.get("charCount") as number;

        const chestOrder = data.get("ChestOrder") as string[];
        const chestQuantity = data.get("ChestQuantity") as number[];
        const storageInvUsed = data.get("InvStorageUsed") as Record<string, number>;
        const creditedGreenStacks = data.get("GreenStacks") as string[];

        storage.creditedGreenStackCount = creditedGreenStacks.length;
        storage.creditedGreenStackItems = [...creditedGreenStacks];

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

export const updateStorageGreenstacks = (data: Map<string, any>) => {
    const storage = data.get('storage') as Storage;
    storage.updateGreenstacks();
    return storage;
}
