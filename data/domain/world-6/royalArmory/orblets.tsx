import type { OrbletMarketBonusBase } from "../../data/OrbletMarketBonusRepo";
import type { OrbletMarketBonusModel } from "../../model/orbletMarketBonusModel";
import type { ImageData } from "../../imageData";

// Each ordinary market template contains one effect marker with an optional sign and unit.
const royalArmoryOrbletEffectPlaceholder = /[+-]?[{}](?:%|px|x)?/;

export class RoyalArmoryOrbletMarketBonus {
    level: number = 0;
    private bonus: number = 0;
    private predecessor: RoyalArmoryOrbletMarketBonus | undefined;

    constructor(
        public index: number,
        public data: OrbletMarketBonusModel,
    ) { }
    static fromBase(data: OrbletMarketBonusBase[]): RoyalArmoryOrbletMarketBonus[] {
        const bonuses = data.map((bonus) => {
            switch (bonus.index) {
                case 4: return new RoyalArmoryGlorificationBonus(bonus.index, bonus.data);
                default: return new RoyalArmoryOrbletMarketBonus(bonus.index, bonus.data);
            }
        });
        // Unlocks follow catalog IDs, including Glorification before Intervene, not list positions.
        bonuses.forEach((bonus) => {
            bonus.predecessor = bonuses.find((candidate) => candidate.index === bonus.index - 1);
        });
        return bonuses;
    }

    parse(level: number | null | undefined): void {
        this.level = level ?? 0;
    }

    updateBonus(): void {
        // Each Orblet market level adds its listed bonus; the game rounds down the total.
        this.bonus = this.getBonusAtLevel(Number(this.level));
    }

    getBonus(): number {
        return this.bonus;
    }

    private getBonusAtLevel(level: number): number {
        return Math.floor(Number(this.data.bonusPerLevel) * level);
    }

    getCost(): number {
        const level = Number(this.level);
        const cost = level + Number(this.data.costBase) * Math.pow(Number(this.data.costMultiplier), level);
        // Million-Orblet prices retain their fractional value; only lower prices are rounded down.
        return cost < 1_000_000 ? Math.floor(cost) : cost;
    }

    getDescription(stripValue = false): string {
        if (stripValue) {
            return this.data.description.replace(royalArmoryOrbletEffectPlaceholder, "")
                .replace(/_/g, " ").replace(/\s+/g, " ").trim();
        }
        return this.describeBonus(this.getBonus());
    }

    getCurrentValue(): string {
        return this.formatValue(this.getBonus());
    }

    getNextValue(): string | undefined {
        const bonus = this.getNextBonus();
        return bonus === undefined ? undefined : this.formatValue(bonus);
    }

    private formatValue(bonus: number): string {
        const placeholder = this.data.description.match(royalArmoryOrbletEffectPlaceholder)![0];
        return this.describeBonus(bonus, placeholder);
    }

    private describeBonus(bonus: number, template = this.data.description): string {
        // Intervene displays a multiplier; the other market effects display the raw bonus.
        return template.replace(/_/g, " ")
            .replace(/{/g, bonus.toString())
            .replace(/}/g, (1 + bonus / 100).toString());
    }

    getNextBonus(): number | undefined {
        const level = Number(this.level);
        // Preview a further level without changing the current cache or saved progression.
        return level >= Number(this.data.maxLevel) ? undefined : this.getBonusAtLevel(level + 1);
    }

    getLevel(): number | undefined {
        return Number(this.level);
    }

    getMaxLevel(): number | undefined {
        return Number(this.data.maxLevel);
    }

    getImageData(): ImageData {
        return { location: "Orblet", width: 72, height: 72 };
    }

    isUnlocked(): boolean {
        return this.index === 0 || (this.predecessor !== undefined && Number(this.predecessor.level) >= 1);
    }

    isAffordable(orbletsOwned: number): boolean {
        // Balance coverage is independent of progression, caps, and per-outpost attempt eligibility.
        return orbletsOwned >= this.getCost();
    }
}

export class RoyalArmoryGlorificationBonus extends RoyalArmoryOrbletMarketBonus {
    override getCurrentValue(): string {
        return "10%";
    }

    override getDescription(stripValue = false): string {
        // The saved market level affects price and unlocks, not the fixed chance or success effects.
        const effect = "chance per attempt to glorify an outpost. On success: +10 outpost points, 2× rank XP, +1 Worker.";
        return stripValue ? effect : `${this.getCurrentValue()} ${effect}`;
    }

    override getNextBonus(): number | undefined {
        return undefined;
    }

    override getLevel(): number | undefined {
        return undefined;
    }

    override getMaxLevel(): number | undefined {
        return undefined;
    }
}
