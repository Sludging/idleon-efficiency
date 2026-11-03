import { range } from "../utility";
import { Domain, RawData } from "./base/domain";
import { Item, StoneProps } from "./items";
import { Refinery, RefineryStorage } from "./world-3/construction/refinery";
import { initSlabItemSortRepo } from "./data/SlabItemSortRepo";
import type { DeepReadonly, StaticRepositories } from "./repositories";
import { nonStorableGreenstackItems, unobtainableGreenstackItems, unrealisticGreenstackItems } from "./storage-greenstack-policy";
import type { CommonItemBase } from "./data/ItemDetailRepo";
import type { BundleOwnership } from "./bundleOwnership";
import type { Account } from "./account";
import type { Construction } from "./world-3/construction/construction";
import type { GemStore } from "./gemPurchases";
import type { EventShop } from "./eventShop";
import type { UpgradeVault } from "./upgradeVault";

export class StorageChestUpgrade {
    internalName: string;
    displayName: string;
    id: number;
    capacity: number;
    unlocked: boolean = false;
    slotContribution: number = 0;

    constructor(item: DeepReadonly<CommonItemBase>) {
        this.internalName = item.id;
        this.displayName = item.data.displayName;
        this.id = item.data.ID;
        this.capacity = item.data.lvReqToCraft;
    }

    static fromBase(items: readonly DeepReadonly<CommonItemBase>[]): StorageChestUpgrade[] {
        return items.filter(item => item.data.Type === 'Storage').map(item => new StorageChestUpgrade(item));
    }

    parse(usedChests: Record<string, number>): void {
        this.unlocked = Object.hasOwn(usedChests, String(this.id));
        this.slotContribution = this.unlocked ? Number(usedChests[String(this.id)]) : 0;
    }
}

const nonStorableGreenstackTypes = ['Dungeon Evaporate', 'Dungeon Food', 'Dungeon Item'];

export class Storage extends Domain {
    chest: Item[] = []
    playerStorage: Item[][] = [];
    refinery: RefineryStorage[] = []
    storageChestsUsed: Record<string, number> = {}
    money: number = 0;
    creditedGreenStackCount: number = 0;
    creditedGreenStackItems: string[] = [];
    chestUpgrades: StorageChestUpgrade[] = [];
    private slotCount: number = 54;

    private greenstackableItems: string[] = [];
    private eligibleGreenstackItems: string[] = [];
    private missingGreenstackItems: string[] = [];
    private unrealisticGreenstackItems: string[] = [];

    prepareSlotCount(
        towerStorageLevel: number,
        bundles: BundleOwnership,
        moreStoragePurchases: number,
        eventShop: EventShop,
        vaultStorageSlots: number,
    ): void {
        let slots = 54;
        for (const contribution of Object.values(this.storageChestsUsed)) {
            slots += Number(contribution);
        }

        // Keep the game's initial capacity calculation and rounding order.
        slots = Math.round(slots + 2 * towerStorageLevel);
        if (bundles.getOwnership('bun_i') === 'owned') {
            slots = Math.round(slots + 8);
        }
        if (bundles.getOwnership('bun_c') === 'owned') {
            slots = Math.round(slots + 16);
        }
        if (bundles.getOwnership('bon_a') === 'owned') {
            slots = Math.round(slots + 20);
        }
        slots = Math.round(slots + 9 * moreStoragePurchases);

        const starterOfferTwoOwned = Number(bundles.getOwnership('bon_x') === 'owned');
        const starterOfferThreeOwned = Number(bundles.getOwnership('bon_y') === 'owned');
        const extraStorage = Math.round(
            12 * Number(eventShop.isBonusOwned(10))
            + 16 * Number(eventShop.isBonusOwned(11))
            + (vaultStorageSlots + (22 * starterOfferTwoOwned + 27 * starterOfferThreeOwned)),
        );
        this.slotCount = Math.round(slots + extraStorage);
    }

    getSlotCount(): number {
        return this.slotCount;
    }

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
        this.chestUpgrades = StorageChestUpgrade.fromBase(repositories.get('ItemDetail'));
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
        storage.chestUpgrades.forEach(chest => chest.parse(storageInvUsed));
        storage.slotCount = 54;
        storage.money = data.get("MoneyBANK");
    }
}

export const updateStorage = (data: Map<string, any>) => {
    const storage = data.get("storage") as Storage;
    const refinery = data.get("refinery") as Refinery;
    const construction = data.get("construction") as Construction;
    const account = data.get("account") as Account;
    const gemStore = data.get("gems") as GemStore;
    const eventShop = data.get("eventShop") as EventShop;
    const upgradeVault = data.get("upgradeVault") as UpgradeVault;
    const moreStorage = gemStore.purchases.find(purchase => purchase.no === 109)!;

    storage.refinery = refinery.storage;
    storage.prepareSlotCount(
        construction.buildings[4].level,
        account.bundles,
        moreStorage.pucrhased,
        eventShop,
        upgradeVault.getBonusForId(33),
    );

    return storage;
}

export const updateStorageGreenstacks = (data: Map<string, any>) => {
    const storage = data.get('storage') as Storage;
    storage.updateGreenstacks();
    return storage;
}
