import { lavaFunc, range } from "../utility";
import { Domain, RawData } from "./base/domain";
import { GemStore } from "./gemPurchases";
import { Item } from "./items";

const getDescRegex = () => { return /Smelt down (?<ores>\d+) Ores into 1 Bar at the Forge. Smelting will take (?<cooldown>\d+) Seconds per Bar using Forge Slot 1./g; };
const getOilRegex = () => { return /Increases (?<effect>.*) by (?<amount>\d+)% for (.*) it's in. (?<chance>\d+)% chance to be consumed when a bar is forged./g; };

export class ForgeSlot {
    brimestone: boolean = false

    constructor(public ores: Item, public oils: Item, public bars: Item, public progress: number) { }

    getOreInterval = () => {
        const match = getDescRegex().exec(this.ores.description);
        if (match && match.groups) {
            return parseInt(match.groups["cooldown"]);
        }
        return 0;
    }

    getTimeTillEmpty = (upgradeBonus: number) => {
        return Math.round(this.ores.count / this.getOrePerInterval()) * (this.getOreInterval() / (4 * this.getSpeed(upgradeBonus)));
    }

    getOrePerInterval = () => {
        const match = getDescRegex().exec(this.ores.description);
        if (match && match.groups) {
            return parseInt(match.groups["ores"]);
        }
        return 0;
    }

    getOilSpeed = () => {
        const match = getOilRegex().exec(this.oils.description);
        if (match && match.groups) {
            if (match.groups["effect"] === "Forging Speed") {
                return parseInt(match.groups["amount"])
            }
        }
        return 1;
    }

    getSpeed = (upgradeBonus: number) => {
        let speed = Math.round(upgradeBonus) / 100;
        speed *= this.getOilSpeed();
        if (this.brimestone) {
            speed *= 1.5;
        }
        return speed * 0.25;
    }
}

export class ForgeUpgrade {
    level = 0;

    constructor(public name: string, public maxLevel: number, public bonus: string, public costExp: number | undefined) { }

    getBonus = () => {
        switch (this.name) {
            case "New Forge Slot":
            case "Forge EXP Gain":
            case "Bar Bonanza":
            case "Puff Puff Go":
                return this.level;
            case "Forge Speed":
                return this.level * 5;
            case "Ore Capacity Boost":
                return 10 * (2 + this.level);
            default:
                return -1;
        }
    }

    getBonusText = () => {
        return this.bonus.replace(/{/g, this.getStat().toString());
    }

    getCost = (level: number = this.level) => {
        if (this.costExp == undefined) {
            // this is forge slots, has it's own math.
            return Math.round(200 * Math.pow(5.4, Math.pow(level, 0.83)));
        }
        if (level < 5) {
            return Math.round(50 * Math.pow(2.5, Math.pow(level, 0.51)));
        }
        return Math.round(400 * Math.pow(this.costExp, level - 5))
    }

    getMaxCost = () => {
        return range(this.level, this.maxLevel).reduce((sum, level) => sum += this.getCost(level), 0);
    }

    // TODO: Think of a better name? this is based on '_customBlock_ForgeStats'
    getStat = () => {
        switch (this.name) {
            case "New Forge Slot":
            case "Forge EXP Gain":
            case "Bar Bonanza":
                return this.level
            case "Ore Capacity Boost": return 20 + lavaFunc("add", 10, 10, this.level)
            case "Forge Speed": return 100 + 5 * this.level
            case "Puff Puff Go": return 2 * this.level;
            default: return 1
        }
    }
}

export class Forge extends Domain {
    upgrades: ForgeUpgrade[] = [];
    slots: ForgeSlot[] = [];

    getRawKeys(): RawData[] {
        return [
            {key: "ForgeItemQty", perPlayer: false, default: []},
            {key: "ForgeIntProg", perPlayer: false, default: []},
            {key: "ForgeItemOrder", perPlayer: false, default: []},
            {key: "ForgeLV", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.upgrades.push(new ForgeUpgrade(
            "New Forge Slot",
            16,
            "{ extra slots to smelt ores.",
            undefined
        ))

        this.upgrades.push(new ForgeUpgrade(
            "Ore Capacity Boost",
            50,
            "Increases max ores per slot by +{.",
            1.41
        ))

        this.upgrades.push(new ForgeUpgrade(
            "Forge Speed",
            90,
            "Ores are turned into bars +{% faster.",
            1.2
        ))

        this.upgrades.push(new ForgeUpgrade(
            "Forge EXP Gain",
            85,
            "+{% EXP gain from using the forge.",
            1.21
        ))

        this.upgrades.push(new ForgeUpgrade(
            "Bar Bonanza",
            75,
            "+{% chance to make an extra bar.",
            1.25
        ))

        this.upgrades.push(new ForgeUpgrade(
            "Puff Puff Go",
            60,
            "+{% for a card drop while afk.",
            1.33
        ))

        return this;
    }

    parse(data: Map<string, any>): void {
        const forge = data.get(this.getDataKey()) as Forge;
        const forgeItemQuantity = data.get("ForgeItemQty") as number[];
        const forgeProgress = data.get("ForgeIntProg") as number[];
        const forgeItemOrder = data.get("ForgeItemOrder") as string[];
        const forgeLevels = data.get("ForgeLV") as number[];
        const allItems = data.get("itemsData") as Item[];

        forgeLevels.forEach((level, index) => {
            if (index < forge.upgrades.length) {
                forge.upgrades[index].level = level;
            }
        });

        let index = 0;
        while (index < forgeItemQuantity.length) {
            const oreItem = allItems.find(item => item.internalName == forgeItemOrder[index])?.duplicate() ?? Item.emptyItem(forgeItemOrder[index]);
            oreItem.count = forgeItemQuantity[index];

            const oilItem = allItems.find(item => item.internalName == forgeItemOrder[index + 1])?.duplicate() ?? Item.emptyItem(forgeItemOrder[index + 1]);
            oilItem.count = forgeItemQuantity[index + 1];

            const barItem = allItems.find(item => item.internalName == forgeItemOrder[index + 2])?.duplicate() ?? Item.emptyItem(forgeItemOrder[index + 2]);
            barItem.count = forgeItemQuantity[index + 2];

            forge.slots.push(new ForgeSlot(oreItem, oilItem, barItem, forgeProgress[index / 3]));
            index += 3;
        }

    }
}

export const updateForge = (forge: Forge, gemStore: GemStore) => {
    const brimeStoneBought = gemStore.purchases.find(purchase => purchase.no == 104)?.pucrhased ?? 0;
    forge.slots.forEach((slot, index) => {
        if (index < brimeStoneBought)
            slot.brimestone = true;
    });

    return forge;
}