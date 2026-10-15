import { nFormatter } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { EquipmentSetsBase, initEquipmentSetsRepo } from "../data/EquipmentSetsRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { EquipmentSetsModel } from "../model/equipmentSetsModel";
import { Player } from "../player";

export class EquipmentSet {
    // Game v1.22 (lines 241267–241314) requires six Prehistoric tools; the generated boolean omits this numeric requirement.
    static readonly prehistoricSetRequiredToolCount = 6;

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

    isActiveFor(player?: Player): boolean {
        let active = this.unlocked;
        if (!active && player) {
            let matchedCount = 0;
            for (let index = 0; index < this.data.armors.length; index++) {
                const armorName = this.data.armors[index];
                if (this.data.armors.indexOf(armorName) == index &&
                    player.gear.equipment.some(item => item?.internalName == armorName)) {
                    matchedCount++;
                }
            }

            const toolsRequired = this.data.name === "PREHISTORIC_SET"
                ? EquipmentSet.prehistoricSetRequiredToolCount
                : Number(this.data.toolsRequired);
            let matchedTools = 0;
            for (const toolName of this.data.tools) {
                if (matchedTools >= toolsRequired) {
                    break;
                }
                if (player.gear.tools.some(item => item?.internalName == toolName)) {
                    matchedTools++;
                }
            }
            matchedCount += matchedTools;

            if (this.data.weaponRequired &&
                this.data.weapons.some(weaponName => player.gear.equipment.some(item => item?.internalName == weaponName))) {
                matchedCount++;
            }

            const requiredCount = this.data.armors.length + toolsRequired + Number(this.data.weaponRequired);
            active = matchedCount >= requiredCount;
        }

        return active;
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

    getSetBonus = (setName: string, player?: Player, raw: boolean = false) => {
        const set = this.equipmentSets.find(set => set.data.name == setName);

        if (!set) {
            throw new Error(`Set ${setName} not found`);
        }

        if (set.isActiveFor(player)) {
            return set.getBonus(raw);
        }

        return 0;
    }
}
