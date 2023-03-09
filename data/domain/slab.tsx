import { initSlabItemSortRepo } from './data/SlabItemSortRepo';
import { Item } from './items'

export class Slab {
    obtainableItems: Item[];
    // Keeping track of the raw number from cloudsave because it has fake items and therefore doesn't match up with our "realistic" obtainableItems array.
    rawObtainedCount: number = 0;
    // Keeping track of the max possible slab items to make it easy to display.
    obtainableCount: number = 0;

    constructor(allItems: Item[]) {
        this.obtainableItems = allItems.filter(item => item.data.slabSort != undefined);

        // Sort all items based on slab sort to match up the game better.
        this.obtainableItems.sort((item1, item2) => {
            const item1Order = slabItems.find(item => item.item == item1.internalName)?.order ?? 0;
            const item2Order = slabItems.find(item => item.item == item2.internalName)?.order ?? 0;
            return item1Order > item2Order ? 1 : -1;
        });
    }
}

export const slabItems = initSlabItemSortRepo().map(slabItem => {
    return {
        item: slabItem.data.item.item,
        order: slabItem.data.order,
    }
});

export const customHandCraftedListOfUnobtainableItems = [
    "Godshard",
    "GodshardBar",
    "EquipmentShirts7",
    "EquipmentPants7",
    "EquipmentPants13",
    "EquipmentRings4",
    "EquipmentRings5",
    "EquipmentRings8",
    "EquipmentRings9",
    "EquipmentRings10",
    "EquipmentRingsFishing1",
    "EquipmentRingsFishing2",
    "EquipmentRingsFishing3",
    "EquipmentToolsHatchet10",
    "IceMountains2",
    "EquipmentSmithingTabs6",
    "StampB28",
    "StampB29",
    "StampB32",
    "StampB33",
    "StampB35",
    "StampC13",
    "StampC17",
    "InvBag9",
    "Line4",
    "Line9",
    "Line14",
    "Weight14",
    "Weight9",
    "DungWeaponWandE5",
    "DungWeaponWandF1",
    "DungWeaponWandF2",
    "DungWeaponWandF3",
    "DungWeaponWandF4",
    "DungWeaponWandF5",
    "DungWeaponPunchE5",
    "DungWeaponPunchF1",
    "DungWeaponPunchF2",
    "DungWeaponPunchF3",
    "DungWeaponPunchF4",
    "DungWeaponPunchF5",
    "DungWeaponSwordE5",
    "DungWeaponSwordF1",
    "DungWeaponSwordF2",
    "DungWeaponSwordF3",
    "DungWeaponSwordF4",
    "DungWeaponSwordF5",
    "DungWeaponBowE5",
    "DungWeaponBowF1",
    "DungWeaponBowF2",
    "DungWeaponBowF3",
    "DungWeaponBowF4",
    "DungWeaponBowF5",
    "DungEquipmentHats4",
    "DungEquipmentShirt4",
    "DungEquipmentPants4",
    "DungEquipmentShoes4",
    "DungEquipmentPendant4",
    "DungEquipmentRings4",
    "TalentPoint5",
    "Quest31",
    "EquipmentShoes2",
    "EquipmentCape7",
    "Trophy7",
];

export const initSlab = (allItems: Item[) => {
    return new Slab(allItems);
}

export default function parseSlab(lootedInfo: string[], allItems: Item[]) {
    let slab = new Slab(allItems);
    slab.obtainableItems = allItems.filter(item => item.data.slabSort != undefined);

    slab.obtainableItems.forEach(item => {
        item.obtained = lootedInfo.includes(item.internalName);
    })

    // All Items doesn't contain certain things that don't naturally (refinery books / anvil recipes etc). So add them in as fake items
    lootedInfo.forEach(looted => {
        if (slab.obtainableItems.findIndex(item => item.internalName == looted) == -1 && slabItems.map(item => item.item).includes(looted)) {
            const fakeItem = Item.emptyItem(looted);
            fakeItem.obtained = true;
            slab.obtainableItems.push(fakeItem);
        }
    })

    // Sort all items based on slab sort to match up the game better.
    slab.obtainableItems.sort((item1, item2) => {
        const item1Order = slabItems.find(item => item.item == item1.internalName)?.order ?? 0;
        const item2Order = slabItems.find(item => item.item == item2.internalName)?.order ?? 0;
        return item1Order > item2Order ? 1 : -1;
    });


    // Keep track of raw data for easy access in the UI and maths.
    slab.rawObtainedCount = lootedInfo.length;
    slab.obtainableCount = slabItems.length;

    return slab;
}