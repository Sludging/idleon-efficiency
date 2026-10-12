import type { RoyalStatueBase } from "../../data/RoyalStatueRepo";
import type { RoyalStatueModel } from "../../model/royalStatueModel";
import type { ImageData } from "../../imageData";
import type { Item } from "../../items";
import { commaNotation, nFormatter } from "../../../utility";

export class RoyalStatue {
    level: number = 0;
    private reverenceBonus: number = 0;
    private marbleOwned: number = 0;
    private parchmentOwned: number = 0;

    constructor(
        public index: number,
        public data: RoyalStatueModel,
        public readonly restorationMaterial: Item,
        public readonly enchantmentMaterial: Item,
    ) { }

    static fromBase(data: RoyalStatueBase[], materials: ReadonlyMap<string, Item>): RoyalStatue[] {
        return data.map(statue => new RoyalStatue(statue.index, statue.data,
            materials.get(statue.data.unlockItem)!, materials.get(statue.data.upgradeItem)!));
    }

    parse(level: unknown): void {
        this.level = Number(level) || 0;
        this.reverenceBonus = this.marbleOwned = this.parchmentOwned = 0;
    }

    updateBonusInput(reverenceBonus: number): void {
        this.reverenceBonus = reverenceBonus;
    }

    updateMaterialInputs(marbleOwned: number, parchmentOwned: number): void {
        this.marbleOwned = marbleOwned;
        this.parchmentOwned = parchmentOwned;
    }

    getBonus(level: number = this.level): number {
        if (level === 0) return 0;
        return (1 + this.reverenceBonus / 100) *
            (this.data.baseBonus + this.data.bonusPerLevel * Math.max(0, level - 1));
    }

    getDescription(level: number = this.level): string {
        const bonus = this.getBonus(level);
        return this.data.description.replace(/_/g, " ")
            .replace(/{/g, commaNotation(bonus))
            .replace(/}/g, nFormatter(1 + bonus / 100, "MultiplierInfo"));
    }

    getAttemptMaterial(): Item {
        return this.level === 0 ? this.restorationMaterial : this.enchantmentMaterial;
    }

    /** Required material for one attempt, not guaranteed expenditure: parchment can be recycled. */
    getAttemptQuantity(): number {
        return this.data.attemptCost;
    }

    getSuccessChance(): number {
        if (this.level === 0) return 1 / this.data.unlockChanceDenominator;
        return 1 / (10 * Math.ceil(((25 + 15 * Math.pow(this.index, 2)) *
            Math.max(1, 1 + (this.level - 1) / 4)) / 10));
    }

    getOwnedMaterialQuantity(): number {
        return this.level === 0 ? this.marbleOwned : this.parchmentOwned;
    }

    isAffordable(): boolean {
        return this.getOwnedMaterialQuantity() >= this.getAttemptQuantity();
    }

    getImageData(): ImageData {
        // The game has no covered frame for statue 7.
        if (this.level === 0 && this.index === 7) return { location: "", width: 0, height: 0 };
        return { location: `RoyalStatue${this.level === 0 ? "Covered" : ""}${this.index}`, width: 130, height: 170 };
    }

    getAttemptMaterialImageData(): ImageData {
        // These two supplied marble sprites are fully transparent.
        return this.getAttemptMaterial().getImageData();
    }
}
