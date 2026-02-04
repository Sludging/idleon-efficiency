import { Domain, RawData } from '../base/domain';
import { initSlabItemSortRepo } from '../data/SlabItemSortRepo';
import { Item } from '../items'
import { Lab, SlabSovereigntyBonus } from '../world-4/lab';
import { Sailing } from './sailing/sailing';
import { SlabInfluencedArtifact } from './sailing/artifacts';
import { Sneaking } from '../world-6/sneaking';
import { ImageData } from "../imageData";

export enum SlabBonusesText {
    TotalDamage = "Total Damage",
    DivinityPoints = "Divinity Points",
    SailingSpeed = "Sailing Speed",
    MoreBits = "Gaming Bits",
    JadeCoins = "Jade Coins",
    AllEssenceGain = "All Essences Gain"
}

export class SlabBonus {
    bonus: number = 0;
    icon: ImageData = {
        location: ``,
        width: 0,
        height: 0
    };

    constructor(public type: SlabBonusesText) { }
}

export class Slab extends Domain {
    obtainableItems: Item[] = [];
    // Keeping track of the raw number from cloudsave because it has fake items and therefore doesn't match up with our "realistic" obtainableItems array.
    rawObtainedCount: number = 0;
    // Keeping track of the max possible slab items to make it easy to display.
    obtainableCount: number = 0;

    bonuses: SlabBonus[] = [];

    getRawKeys(): RawData[] {
        return [
            {key: "Cards1", perPlayer: false, default: []}
        ]
    }

    init(allItems: Item[], _charCount: number) {
        this.obtainableItems = allItems.filter(item => item.data.slabSort != undefined);

        // Sort all items based on slab sort to match up the game better.
        this.obtainableItems.sort((item1, item2) => {
            const item1Order = slabItems.find(item => item.item == item1.internalName)?.order ?? 0;
            const item2Order = slabItems.find(item => item.item == item2.internalName)?.order ?? 0;
            return item1Order > item2Order ? 1 : -1;
        });

        return this;
    }

    parse(data: Map<string, any>): void {
        const slab = data.get(this.getDataKey()) as Slab;
        const rawItems = data.get("Cards1") as string[];

        // Clean up items that shouldn't be here, happens on older profiles.
        const lootedInfo = rawItems.filter(item => item && typeof item === 'string').filter(item =>
            item != "null" &&
            item.indexOf("Cards") == -1 &&
            item.indexOf("SailTr") == -1 &&
            item != "Bits" &&
            item.indexOf("Spice") == -1
        )

        slab.obtainableItems.forEach(item => {
            item.obtained = lootedInfo.includes(item.internalName);
        })

        // All Items doesn't contain certain things that don't naturally drop (refinery books / anvil recipes etc). So add them in as fake items
        lootedInfo.forEach(looted => {
            if (slab.obtainableItems.findIndex(item => item.internalName == looted) == -1 && slabItems.map(item => item.item).includes(looted)) {
                const fakeItem = Item.emptyItem(looted);
                fakeItem.obtained = true;
                slab.obtainableItems.push(fakeItem);
            }
        })

        // Keep track of raw data for easy access in the UI and maths.
        slab.rawObtainedCount = lootedInfo.length;
        slab.obtainableCount = slabItems.length;

        slab.bonuses = [];
        Object.values(SlabBonusesText).forEach((key, _) => {
            slab.bonuses.push(new SlabBonus(key));
        });
    }
}

export const slabItems = initSlabItemSortRepo().map(slabItem => {
    return {
        item: slabItem.data.item.item,
        order: slabItem.data.order,
    }
});

export const updateSlabBonusDisplay = (data: Map<string, any>) => {
    const slab = data.get("slab") as Slab;
    const sneaking = data.get("sneaking") as Sneaking;
    const sailing = data.get("sailing") as Sailing;
    const lab = data.get("lab") as Lab;

    const slabSoverignBonus = lab.bonuses[15].active ? (1 + (lab.bonuses[15] as SlabSovereigntyBonus).getBonus() / 100) : 1;

    slab.bonuses.forEach(bonus => {
        switch (bonus.type) {
            case SlabBonusesText.AllEssenceGain:
                bonus.bonus = (sneaking.jadeUpgrades.find(upgrade => upgrade.data.name = "Essence Confetti")?.purchased ?? false) ? (Math.floor(Math.max(0, slab.rawObtainedCount - 1000) / 10) * 3 * slabSoverignBonus) : 0;
                bonus.icon = {
                    location: 'Slab5',
                    width: 22,
                    height: 20
                }
                break;
            case SlabBonusesText.DivinityPoints:
                bonus.bonus = (sailing.artifacts[18] as SlabInfluencedArtifact).getBonus();
                bonus.icon = (sailing.artifacts[18] as SlabInfluencedArtifact).getImageData();
                bonus.icon.width = 22;
                bonus.icon.height = 20;
                break;
            case SlabBonusesText.JadeCoins:
                bonus.bonus = (sneaking.jadeUpgrades.find(upgrade => upgrade.data.name = "Jade Coin Magnetism")?.purchased ?? false) ? (Math.floor(Math.max(0, slab.rawObtainedCount - 1000) / 10) * 5 * slabSoverignBonus) : 0;
                bonus.icon = {
                    location: 'Slab4',
                    width: 22,
                    height: 20
                }
                break;
            case SlabBonusesText.MoreBits:
                bonus.bonus = (sailing.artifacts[20] as SlabInfluencedArtifact).getBonus();
                bonus.icon = (sailing.artifacts[20] as SlabInfluencedArtifact).getImageData();
                bonus.icon.width = 22;
                bonus.icon.height = 20;
                break;
            case SlabBonusesText.SailingSpeed:
                bonus.bonus = (sailing.artifacts[10] as SlabInfluencedArtifact).getBonus();
                bonus.icon = (sailing.artifacts[10] as SlabInfluencedArtifact).getImageData();
                bonus.icon.width = 22;
                bonus.icon.height = 20;
                break;
            case SlabBonusesText.TotalDamage:
                bonus.bonus = (sailing.artifacts[2] as SlabInfluencedArtifact).getBonus();
                bonus.icon = (sailing.artifacts[2] as SlabInfluencedArtifact).getImageData();
                bonus.icon.width = 22;
                bonus.icon.height = 20;
                break;
        }
    })

    return slab;
}

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
