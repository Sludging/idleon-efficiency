import { letterToNumber } from "../../../utility";
import type { ImageData } from "../../imageData";
import type { Gaming } from "../gaming";
import type { GamingSuperbitBase } from "../../data/GamingSuperbitsRepo";
import type { GamingPaletteBase } from "../../data/GamingPaletteRepo";
import type { GamingSuperbitModel } from "../../model/gamingSuperbitModel";
import type { GamingPaletteModel } from "../../model/gamingPaletteModel";
import type { LegendTalents } from "../../world-7/legendTalents";
import type { ResearchGrid } from "../../world-7/research";
import type { SushiStation } from "../../world-7/sushi";
import type { Meritocraty } from "../../world-7/meritocraty";
import type { Tome } from "../../world-4/tome";
import type { Farming } from "../../world-6/farming";
import type { Sneaking } from "../../world-6/sneaking";
import type { Arcade } from "../../world-2/arcade";
import type { KingRatImport, SnailImport, SquirrelImport } from "./imports";

export class Superbit {
    superbitId: number;
    name: string;
    description: string;
    costBase: number;
    costExponent: number;
    purchased = false;
    costBits = 0;
    affordable = false;
    prerequisitesMet = false;
    canPurchase = false;

    constructor(data: GamingSuperbitModel) {
        this.superbitId = data.superbitId;
        this.name = data.name;
        this.description = data.description;
        this.costBase = data.x1;
        this.costExponent = data.x2;
    }

    static fromBase(records: GamingSuperbitBase[]): Superbit[] {
        return records.filter(record => record.data.superbitId <= 69).map(record => new Superbit(record.data));
    }

    parse(data: Map<string, any>): void {
        const rawGaming = data.get("Gaming") ?? [];
        this.purchased = false;
        for (const selector of String(rawGaming[12] ?? "")) {
            if (letterToNumber(selector) === this.superbitId) {
                this.purchased = true;
                break;
            }
        }
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const board = gaming.superbitBoards[Math.floor(this.superbitId / 24)];

        this.costBits = this.costBase * Math.pow(10, this.costExponent);
        this.affordable = gaming.bits >= this.costBits;
        this.canPurchase = !this.purchased && board.accessible && this.affordable && this.prerequisitesMet;
    }

    getCost(): number { return this.costBits; }
    getBonusText(): string {
        // Native GamingUpg text separates the static effect from player-specific totals.
        // This entity exposes the effect rule, not those account-wide bonus totals.
        const effectText = this.description.split(/Total bonus:/i)[0].trim();

        return effectText
            .replace("₣", " Bits")
            // The exporter removes the achievement-count token but leaves its parentheses.
            .replace(" ()", "")
            .replace(": +% ", ": a percentage increase to ");
    }
}

export class SuperbitBoard {
    accessible: boolean;
    superbits: Superbit[];
    requirements: { superbit: Superbit; isRoot: boolean; qualifyingNeighborSuperbitIds: number[] }[];

    constructor(public index: number, superbits: Superbit[]) {
        this.accessible = index === 0;
        this.superbits = superbits.filter(superbit => Math.floor(superbit.superbitId / 24) === index);
        this.requirements = this.superbits.map(superbit => {
            const position = superbit.superbitId % 24;
            const neighbors: number[] = [];

            // A purchase requires a neighbor above, left or right, never below.
            if (position >= 6) neighbors.push(superbit.superbitId - 6);
            if (position % 6 !== 0) neighbors.push(superbit.superbitId - 1);
            if (position % 6 !== 5 && this.superbits.some(member => member.superbitId === superbit.superbitId + 1)) {
                neighbors.push(superbit.superbitId + 1);
            }

            return { superbit, isRoot: position === 0, qualifyingNeighborSuperbitIds: neighbors };
        });
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const research = data.get("research") as ResearchGrid;

        this.accessible = this.index === 0 ||
            (gaming.palette.duperBitsUnlocked && (this.index === 1 || research.getBonusForId(87) >= 1));

        this.requirements.forEach(requirement => {
            requirement.superbit.prerequisitesMet = requirement.isRoot ||
                requirement.qualifyingNeighborSuperbitIds.some(id => gaming.isSuperbitPurchased(id));
            requirement.superbit.update(data);
        });
    }
}

export interface PaletteStageLuck { stage: number; multiplier: number; }

export class PaletteColor {
    name: string;
    red: number;
    green: number;
    blue: number;
    bonusText: string;
    bonusValue: number;
    usesDecay: number;
    levelUpBase: number;
    levelUpExponent: number;
    unlockChanceBase: number;
    level = 0;
    unlocked = false;
    equipped = false;
    equippedSlot: number | null = null;
    bonus = 0;
    unlockProbability = 0;
    levelUpProbability = 0;
    stageLuckMultipliers: PaletteStageLuck[] = [];
    private blackStarState = 0;
    constructor(public index: number, data: GamingPaletteModel) {
        this.name = data.name;
        this.red = data.red;
        this.green = data.green;
        this.blue = data.blue;
        this.bonusText = data.bonus;
        this.bonusValue = data.bonusValue;
        this.usesDecay = data.usesDecay;
        this.levelUpBase = data.levelUpBase;
        this.levelUpExponent = data.levelUpExponent;
        this.unlockChanceBase = data.unlockChanceBase;
    }

    static fromBase(records: GamingPaletteBase[]): PaletteColor[] {
        return records.map(record => new PaletteColor(record.index, record.data));
    }

    parse(data: Map<string, any>): void {
        const spelunk = data.get("Spelunk") ?? [];
        const equippedColors: number[] = (spelunk[10] ?? []).map(Number);

        this.level = Number(spelunk[9]?.[this.index] ?? 0);
        this.blackStarState = Number(spelunk[49]?.[this.index] ?? 0);
        this.unlocked = this.level > 0;

        // Keep the saved slot position. Empty selectors must not shift later colors.
        const slot = equippedColors.indexOf(this.index);
        this.equippedSlot = slot >= 0 ? slot : null;
        this.equipped = this.equippedSlot !== null;
    }

    updateBonuses(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const legendTalents = data.get("legendTalents") as LegendTalents;
        const legendMultiplier = 1 + legendTalents.getBonusFromIndex(10) / 100;
        const blackStarMultiplier = Math.max(1, 1 + this.blackStarState + Math.floor(this.blackStarState / 2));
        const loreMultiplier = gaming.palette.loreBonusUnlocked ? 1.5 : 1;
        const baseBonus = this.usesDecay === 1
            ? (this.level / (this.level + 25)) * this.bonusValue
            : this.level * this.bonusValue;
        const doubler = colorDoublers[this.index];
        const doubleMultiplier = doubler !== undefined && gaming.isSuperbitPurchased(doubler)
            ? 2 + 0.5 * Number(gaming.isSuperbitPurchased(59))
            : 1;

        // Earned bonuses include unequipped colors. Preserve native multiplier order.
        this.bonus = baseBonus * doubleMultiplier * legendMultiplier * blackStarMultiplier * loreMultiplier;
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;

        this.stageLuckMultipliers = gaming.palette.stageLuckMultipliers;
        this.unlockProbability = Math.min(1, gaming.palette.bonusLuck * (1 / this.unlockChanceBase));
        this.levelUpProbability = Math.min(
            1,
            gaming.palette.bonusLuck *
            (1 / (this.levelUpBase * Math.pow(Math.max(1.2, this.levelUpExponent - 0.05), this.level)))
        );
    }

    getBlackStarState(): number { return this.blackStarState; }

    getBlackStarImageData(): ImageData {
        return this.blackStarState === 2
            ? { location: "MenaBlackStarDouble", width: 18, height: 60 }
            : { location: "MenaBlackStar", width: 18, height: 17 };
    }

    getBonus(): number { return this.bonus; }
    getBonusText(): string {
        return this.bonusText.replace("{", this.bonus.toString()).replace("}", (1 + this.bonus / 100).toString());
    }

    private getStageLuck(stage: number): number {
        // Stored evolution stages 0..7 correspond to visible stages 1..8; higher stages use the last row.
        if (this.stageLuckMultipliers.length === 0) return 1;

        const last = this.stageLuckMultipliers[this.stageLuckMultipliers.length - 1];
        const row = this.stageLuckMultipliers.find(row => row.stage === Math.min(last.stage, Math.max(1, stage)));
        return row ? row.multiplier : 1;
    }

    getUnlockProbability(stage = 1): number {
        return Math.min(1, this.unlockProbability * this.getStageLuck(stage));
    }

    getLevelUpProbability(stage = 1): number {
        return Math.min(1, this.levelUpProbability * this.getStageLuck(stage));
    }
}

export class PaletteProgress {
    active = false;
    equippedColorIds: number[] = [];
    slotLimit = 2;
    totalLevels = 0;
    totalLevelsBonus = 0;
    bonusLuck = 1;
    bonusMultiplier = 1;
    stageLuckMultipliers: PaletteStageLuck[] = [];
    loreBonusUnlocked = false;
    duperBitsUnlocked = false;
    blackStarsAvailable = 0;

    parse(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const spelunk = data.get("Spelunk") ?? [];
        const options = data.get("OptLacc") ?? [];
        const equippedColors: number[] = (spelunk[10] ?? []).map(Number);

        this.active = Number(options[411] ?? 0) === 1;
        this.equippedColorIds = equippedColors.filter(id => id >= 0);
        this.loreBonusUnlocked = Number(spelunk[0]?.[8] ?? 0) >= 1;
        this.duperBitsUnlocked = Number(spelunk[0]?.[1] ?? 0) >= 1;

        gaming.paletteColors.forEach(color => color.parse(data));
    }

    updateBonuses(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const legendTalents = data.get("legendTalents") as LegendTalents;
        const menagerie = data.get("menagerie") as { getResourceBalances(): { blackStarsAvailable: number } };

        this.blackStarsAvailable = menagerie.getResourceBalances().blackStarsAvailable;

        // The total-level bonus is an aggregate, not another color record.
        this.totalLevels = gaming.paletteColors.reduce((total, color) => total + color.level, 0);
        this.totalLevelsBonus = Math.round(this.totalLevels);
        const legendMultiplier = 1 + legendTalents.getBonusFromIndex(10) / 100;
        const loreMultiplier = this.loreBonusUnlocked ? 1.5 : 1;
        this.bonusMultiplier = legendMultiplier * loreMultiplier;

        gaming.paletteColors.forEach(color => color.updateBonuses(data));
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const research = data.get("research") as ResearchGrid;
        const sushi = data.get("sushi") as SushiStation;
        const meritocraty = data.get("meritocraty") as Meritocraty;
        const tome = data.get("tome") as Tome;
        const farming = data.get("farming") as Farming;
        const sneaking = data.get("sneaking") as Sneaking;
        const arcade = data.get("arcade") as Arcade;
        const snail = gaming.getImport(7) as SnailImport;
        const kingRat = gaming.getImport(8) as KingRatImport;
        const squirrel = gaming.getImport(2) as SquirrelImport;
        const emporium41 = Number(sneaking.jadeUpgrades.find(upgrade => upgrade.index === 41)!.purchased);
        const superbit = (id: number): number => Number(gaming.isSuperbitPurchased(id));
        const ratLuck = kingRat.shop.find(upgrade => upgrade.index === 1)!.bonusPercent!;

        this.slotLimit = Math.round(2 + (superbit(42) + emporium41));
        gaming.paletteColors.forEach(color => {
            color.equipped = color.equippedSlot !== null && color.equippedSlot < this.slotLimit;
        });
        this.equippedColorIds = gaming.paletteColors
            .filter(color => color.equipped)
            .sort((left, right) => left.equippedSlot! - right.equippedSlot!)
            .map(color => color.index);

        // Keep these nested sums in the native order. Reassociation changes large-number results.
        const arcadeAndResearchLuck =
            arcade.bonuses.find(bonus => bonus.index === 58)!.getBonus() + research.getBonusForId(107, 2);
        const emporiumLuck = 100 * emporium41 + arcadeAndResearchLuck;
        const squirrelAndFarmingLuck =
            squirrel.shop.find(upgrade => upgrade.index === 2)!.bonusPercent! +
            farming.getExoticMarketBonusValue(44) + emporiumLuck;
        const snailLuck =
            20 * Math.max(0, snail.currentLevel - 25) * superbit(28) + squirrelAndFarmingLuck;
        const advancedGamingLuck = Math.max(0, 3 * (gaming.level - 200) * superbit(45)) + snailLuck;
        const totalLevelLuck =
            (4 * gaming.level * Number(this.loreBonusUnlocked) + this.totalLevelsBonus + tome.getEpilogueBonus(5)) *
            superbit(38) + advancedGamingLuck;

        this.bonusLuck =
            (1 + superbit(42)) *
            (1 + sushi.getBonusFromIndex(42) / 100) *
            (1 + meritocraty.getCurrentBonus(8) / 100) *
            (1 + ratLuck / 100) *
            (1 + 0.3 * superbit(65)) *
            (1 + (gaming.getPaletteBonus(3) + totalLevelLuck) / 100);

        this.stageLuckMultipliers = gaming.metadata.plantStagePaletteLuck.map(row => ({
            stage: row.plantStage + 1,
            multiplier: row.multiplier,
        }));
        gaming.paletteColors.forEach(color => color.update(data));
    }
}

const colorDoublers: Readonly<Record<number, number>> = { 25: 49, 13: 51, 31: 52, 18: 54, 3: 58, 12: 61 };

