import { nFormatter } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { EquipmentSetsBase, initEquipmentSetsRepo } from "../data/EquipmentSetsRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { EquipmentSetsModel } from "../model/equipmentSetsModel";
import type { Player } from "../player";
import type { Storage } from "../storage";

export type EquipmentSetItemLocation =
    | { kind: "storage"; count: number }
    | { kind: "bag" | "equipped" | "tool"; playerId: number; playerName: string; count: number };

export class EquipmentSetItem {
    locations: EquipmentSetItemLocation[] = [];

    constructor(public item: Item) { }

    get available(): boolean {
        return this.locations.length > 0;
    }

    prepareLocations(storage: Storage, players: Player[]): void {
        this.locations = [];
        const name = this.item.internalName;
        const storageCount = storage.chest.reduce((count, item) => count + (item.internalName === name ? item.count : 0), 0);
        if (storageCount > 0) {
            this.locations.push({ kind: "storage", count: storageCount });
        }

        for (const player of players) {
            const identity = { playerId: player.playerID, playerName: player.playerName };
            const bagCount = storage.playerStorage[player.playerID].reduce(
                (count, item) => count + (item.internalName === name ? item.count : 0), 0,
            );
            if (bagCount > 0) {
                this.locations.push({ kind: "bag", ...identity, count: bagCount });
            }
            const equippedCount = player.gear.equipment.filter(item => item?.internalName === name).length;
            if (equippedCount > 0) {
                this.locations.push({ kind: "equipped", ...identity, count: equippedCount });
            }
            const toolCount = player.gear.tools.filter(item => item?.internalName === name).length;
            if (toolCount > 0) {
                this.locations.push({ kind: "tool", ...identity, count: toolCount });
            }
        }
    }
}

export interface EquipmentSetRequirement {
    kind: "armor" | "tool" | "weapon";
    requiredCount: number;
    items: EquipmentSetItem[];
}

export class EquipmentSet {

    unlocked: boolean = false;
    requirements: EquipmentSetRequirement[] = [];
    constructor(public index: number, public data: EquipmentSetsModel, public imageData: ImageData | undefined) { }

    getImageData = () => this.imageData;

    getRequiredParts(): number {
        return this.requirements.reduce((count, requirement) => count + requirement.requiredCount, 0);
    }

    prepareAvailability(storage: Storage, players: Player[]): void {
        for (const requirement of this.requirements) {
            for (const member of requirement.items) {
                member.prepareLocations(storage, players);
            }
        }
    }

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

            const set = new EquipmentSet(index, equipmentSet.data, item?.getImageData());
            const members = (names: string[]) => names.filter(name => name !== "none").map(name => new EquipmentSetItem(itemsByName.get(name)!));
            const requirements: EquipmentSetRequirement[] = [
                { kind: "armor", requiredCount: equipmentSet.data.armors.length, items: members(equipmentSet.data.armors) },
                { kind: "tool", requiredCount: equipmentSet.data.toolsRequired, items: members(equipmentSet.data.tools) },
                { kind: "weapon", requiredCount: Number(equipmentSet.data.weaponRequired), items: members(equipmentSet.data.weapons) },
            ];
            set.requirements = requirements.filter(requirement => requirement.requiredCount > 0);
            return set;
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
        const set = this.equipmentSets.find(set => set.data.name == setName)!;

        if (set.unlocked) {
            return set.getBonus(raw);
        }

        return 0;
    }
}

export const updateEquipmentSetAvailability = (data: Map<string, any>): void => {
    const equipmentSets = data.get("equipmentSets") as EquipmentSets;
    const storage = data.get("storage") as Storage;
    const players = data.get("players") as Player[];
    for (const set of equipmentSets.equipmentSets) {
        set.prepareAvailability(storage, players);
    }
};
