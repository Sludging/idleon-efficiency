import { commaNotation, notateNumber } from "../../utility";
import type { ImageData } from "../imageData";
import { initSushiStationUpgradeRepo } from "../data/SushiStationUpgradeRepo";
import type { SushiStationUpgradeBase } from "../data/SushiStationUpgradeRepo";
import type { SushiStationUpgradeModel } from "../model/sushiStationUpgradeModel";

export type SushiUpgradeCostModifiers = {
    wholesaleQuantity: number;
    unlockDiscountPercent: number;
    knowledgeDiscountPercent: number;
    jellyDiscountPercent: number;
};


const formatGameAmount = (value: number): string => notateNumber(value, "Big");
const getDescriptionForUnlock = (upgrade: SushiUpgrade, level: number): string | undefined => {
    const quantity = formatGameAmount(upgrade.getBonus(level));
    switch (upgrade.index) {
        case 0:
            return `Sushi Station slots added by this upgrade: ${quantity}.`;
        case 13:
            return level > 0 ? `Each newly created Sushi gains ${quantity} Knowledge EXP.` : "Newly created Sushi does not gain Knowledge EXP from this upgrade.";
        case 14:
            return `Hot Plate slots unlocked by this upgrade: ${quantity}. Current Hot Plate Bucks multiplier: ${Math.round(100 * (1 + upgrade.slotEffects[1] / 100)) / 100}x.`;
        case 15:
            return `Cold Plate slots unlocked by this upgrade: ${quantity}. Current daily Knowledge EXP per Cold Plate for each lower-tier Sushi: ${Math.round(100 * upgrade.slotEffects[2]) / 100}.`;
        case 16:
            return `Milktoast Plate slots unlocked by this upgrade: ${quantity}. Current daily Knowledge EXP per Milktoast Plate: ${Math.round(100 * upgrade.slotEffects[3]) / 100}.`;
        case 23:
            return `Charcoal Fireplaces unlocked by this upgrade: ${quantity}. Each gives +1% Fuel generation per Sushi tier in its column.`;
        case 25:
            return `Purple Fireplaces generate 1 Fireplace Spark per second. ${level > 0 ? "Purple Fireplaces are unlocked." : "Purple Fireplaces are not unlocked."} You have ${notateNumber(upgrade.fireplaceSparks, "Big")} Fireplace Sparks; their current multiplier on all Fireplace bonuses is ${Math.round(100 * upgrade.fireplaceSparkMultiplier) / 100}x.`;
        case 28:
            return `${level > 0 ? "" : "Overtuned Fuel is not unlocked. "}When Fuel is generated at capacity, 1 fuel overflow is gained. Current overflow: ${notateNumber(upgrade.fuelOverflow, "Big")}; current Bucks multiplier from overflow: ${Math.round(100 * upgrade.overtunedMultiplier) / 100}x.`;
        case 26:
            return `${level > 0 ? "Pink Fireplaces are unlocked." : "Pink Fireplaces are not unlocked."} Current Knowledge EXP multiplier for Sushi above pink fires: ${Math.round(100 * (1 + upgrade.fireplaceEffects[3] / 100)) / 100}x.`;
        case 27:
            return `${level > 0 ? "Green Fireplaces are unlocked." : "Green Fireplaces are not unlocked."} Current Bucks multiplier for Sushi above green fires: ${Math.round(100 * (1 + upgrade.fireplaceEffects[1] / 100)) / 100}x.`;
        case 39:
            return level > 0
                ? "Combining Sushi adds score equal to the tier created; cooking new Sushi or taking too long ends the combo. The best combo grants a permanent Bucks multiplier."
                : "The Combo Meter is not unlocked. Once unlocked, combining Sushi adds score equal to the tier created; cooking new Sushi or taking too long ends the combo, and the best combo grants a permanent Bucks multiplier.";
        case 44:
            return level > 0
                ? "Creating a new Sushi type grants a new permanent IdleOn bonus."
                : "Sushi Service Bonuses are not unlocked. Once unlocked, creating a new Sushi type grants a new permanent IdleOn bonus.";
        default:
            return undefined;
    }
};

/** A Sushi Station upgrade backed by generated game metadata. */
export class SushiUpgrade {
    level: number = 0;
    unlocked: boolean = false;
    menagerieDoubled = false;
    costModifiers: SushiUpgradeCostModifiers = {
        wholesaleQuantity: 0,
        unlockDiscountPercent: 0,
        knowledgeDiscountPercent: 0,
        jellyDiscountPercent: 0
    };
    fuelPerHour: number = 0;
    fuelCapacity: number = 0;
    slotEffects: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    fireplaceEffects: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    fireplaceSparks: number = 0;
    fuelOverflow: number = 0;
    uniqueSushi: number = 0;
    fireplaceSparkMultiplier: number = 1;
    overtunedMultiplier: number = 1;
    knowledgeExperienceBase: number = 1;
    saffronHours: number = 1;
    readonly costMultiplier: number;
    readonly costExponent: number;

    constructor(public readonly index: number, public readonly data: SushiStationUpgradeModel) {
        this.costMultiplier = data.costMultiplier === 0 ? 1 : data.costMultiplier;
        this.costExponent = data.costExponent;
    }

    static fromBase(data: SushiStationUpgradeBase[] = initSushiStationUpgradeRepo()): SushiUpgrade[] {
        return data.map(upgrade => new SushiUpgrade(upgrade.index, upgrade.data));
    }

    getBonus(level: number = this.level): number {
        return this.data.bonusPerLevel * level * (this.menagerieDoubled ? 2 : 1);
    }

    /** Returns the game's cost for purchasing this upgrade at the given level. */
    getCost(level: number = this.level): number {
        const displayOrder = this.data.displayOrder;
        const modifiers = this.costModifiers;

        // Keep this multiplication in SushiStuff.UpgCost order to preserve its floating-point result.
        return Math.max(0.1, this.costMultiplier) *
            (5 + displayOrder + Math.pow(Math.max(0, displayOrder - 1), 2)) *
            Math.pow(1.5 + Math.max(0, displayOrder - 3) / 16, Math.max(0, displayOrder - 4)) *
            Math.pow(1.3, Math.max(0, displayOrder - 20)) *
            (1 / (1 + modifiers.wholesaleQuantity / 100)) *
            Math.max(0.1, 1 - modifiers.unlockDiscountPercent / 100) *
            (1 / (1 + modifiers.knowledgeDiscountPercent / 100)) *
            (1 / (1 + modifiers.jellyDiscountPercent / 100)) *
            Math.pow(this.costExponent, level);
    }

    isMaxed(): boolean {
        // The game treats max levels above 998 as uncapped and max zero as unavailable.
        return this.data.maxLevel <= 998 && this.level >= this.data.maxLevel;
    }

    isUnlocked(): boolean {
        return this.unlocked;
    }

    getDescription(level: number = this.level): string {
        const unlockDescription = getDescriptionForUnlock(this, level);
        if (unlockDescription !== undefined) {
            return unlockDescription;
        }

        const description = this.data.description
            .replace(
                "{",
                this.data.description.includes("{%")
                    ? commaNotation(this.getBonus(level))
                    : formatGameAmount(this.getBonus(level))
            )
            .replace(
                "}",
                notateNumber(1 + this.getBonus(level) / 100, "MultiplierInfo").replace("#", "")
            );
        switch (this.index) {
            case 1:
                return description.replace("$", formatGameAmount(this.fuelCapacity));
            case 2:
            case 3:
            case 4:
            case 5:
            case 9:
            case 10:
            case 11:
            case 12:
                return description.replace("$", `${Math.round(100 * (1 + level / 100)) / 100}`);
            case 6:
                return description.replace("$", formatGameAmount(Math.round(this.getBonus(level)) + 1));
            case 8:
                return description.replace("$", `${formatGameAmount(this.fuelPerHour)}/hr; maximum capacity is ${formatGameAmount(this.fuelCapacity)}.`);
            case 22:
                return description.replace("$", formatGameAmount(level === this.level ? this.saffronHours : Math.round(1 + this.getBonus(level))));
            case 29:
                return description.replace("$", `${this.uniqueSushi - 6}`);
            case 36:
                return description.replace("$", `${Math.round(1e4 * (1 - 1 / (1 + this.getBonus(level) / 100))) / 100}`);
            case 37:
                return description.replace("$", formatGameAmount(
                    level === this.level ? this.knowledgeExperienceBase : Math.round((1 + this.getBonus(level) / 10) * 10) / 10
                ));
            default:
                return description;
        }
    }

    getImageData(): ImageData {
        return {
            location: `SushiUpg${this.index}`,
            width: 52,
            height: 52
        };
    }
}
