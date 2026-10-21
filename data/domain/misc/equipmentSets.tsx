import { nFormatter } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { EquipmentSetsBase, initEquipmentSetsRepo } from "../data/EquipmentSetsRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { EquipmentSetsModel } from "../model/equipmentSetsModel";

export class EquipmentSet {

    unlocked: boolean = false;
    constructor(public index: number, public data: EquipmentSetsModel, public imageData: ImageData) { }

    getImageData = () => this.imageData;

    getDescription = () => {
        if (this.data.description.includes("x ")) {
            return this.data.description.replace("x ", `${nFormatter(this.getBonus(), "MultiplierInfo")}x `);
        }
        return this.data.description.replace("{", this.getBonus().toFixed(2));
    }

    getBonus = (raw: boolean = false) => {
        if (this.data.description.includes("x ") && !raw) {
            return 1 + this.data.bonusValue / 100;
        }
        return this.data.bonusValue;
    }


    static fromBase = (data: EquipmentSetsBase[], allItems: Item[]) => {
        const itemsByName = new Map(allItems.map(item => [item.internalName, item]));
        return data.map((equipmentSet, index) => {
            const itemName = [
                ...equipmentSet.data.armors,
                ...equipmentSet.data.weapons,
                ...equipmentSet.data.tools,
            ].find(name => name !== "none" && itemsByName.has(name));
            const item = itemName ? itemsByName.get(itemName) : undefined;

            if (!item) {
                throw new Error(`No equipment image item found for ${equipmentSet.data.name}`);
            }

            return new EquipmentSet(index, equipmentSet.data, item.getImageData());
        });
    }
}

export class EquipmentSets extends Domain {
    unlocked: boolean = false;
    equipmentSets: EquipmentSet[] = [];
    permanentlyActive: boolean = false;
    daysPassed: number = 0;

    getRawKeys(): RawData[] {
        return [];
    }

    init(allItems: Item[], _charCount: number) {
        this.equipmentSets = EquipmentSet.fromBase(initEquipmentSetsRepo(), allItems);
        return this;
    }

    parse(data: Map<string, any>) {
        const equipmentSets = data.get(this.getDataKey()) as EquipmentSets;
        const optionList = data.get("OptLacc") as (string | number)[];
        const rawData = data.get("rawData") as Record<string, any>;

        let bundleInfo = undefined;
        let serverGemsReceived = 0;
        // Make sure we have bundle info, this usually is missing for public profiles.
        if (rawData["BundlesReceived"] !== undefined) {
            bundleInfo = JSON.parse(rawData["BundlesReceived"]) as Record<string, number>;
        }
        if (rawData["ServerGemsReceived"] !== undefined) {
            serverGemsReceived = rawData["ServerGemsReceived"];
        }
        const smithyUnlocked = optionList[380] as number;
        const unlockedSets = (optionList[379] ?? "").toString().split(',');
        const days = optionList[381] as number;
        const bundleValue = bundleInfo?.bun_i == 1 ? 1 : 0;
        const isSmithyUnlocked = 2e3 <= serverGemsReceived + 1500 * bundleValue || 1 > Math.round(30 - days);

        equipmentSets.unlocked = smithyUnlocked == 1;
        equipmentSets.permanentlyActive = isSmithyUnlocked;
        equipmentSets.daysPassed = days;
        // If user unlocked sets, set the unlocked status for each set
        if (unlockedSets && unlockedSets.length > 0) {
            equipmentSets.equipmentSets.forEach(set => {
                set.unlocked = unlockedSets.includes(set.data.name);
            });
        }
    }

    getSetBonus = (setName: string, raw: boolean = false) => {
        const set = this.equipmentSets.find(set => set.data.name == setName);

        if (!set) {
            throw new Error(`Set ${setName} not found`);
        }

        if (set.unlocked) {
            return set.getBonus(raw);
        }

        return 0;
    }
}
