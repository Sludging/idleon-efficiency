import { letterToNumber } from "../../../utility";
import type { GamingSpeciesBase } from "../../data/GamingSpeciesRepo";
import type { GamingUpgradeBase } from "../../data/GamingUpgradeRepo";
import type { GamingSpeciesModel } from "../../model/gamingSpeciesModel";
import type { GamingUpgradeModel } from "../../model/gamingUpgradeModel";
import type { ImageData } from "../../imageData";
import type { Gaming } from "../gaming";
import type { PaletteColor } from "./palette";
import type { BogLogImport, HighScoreImport, KitsuneImport, KingRatImport, ShellImport, ShovelImport, SnailImport, SquirrelImport } from "./imports";
import type { Alchemy } from "../../world-2/alchemy/alchemy";
import type { Votes } from "../../world-2/votes";
import type { Cooking } from "../../world-4/cooking";
import { SkillMastery, type Rift } from "../../world-4/rift";
import type { Sailing } from "../sailing/sailing";
import type { Divinity } from "../divinity";
import type { Hole } from "../hole/hole";
import { CropScientistBonusText, type Farming } from "../../world-6/farming";
import type { Sneaking } from "../../world-6/sneaking";
import type { Summoning } from "../../world-6/summoning";
import type { Emperor } from "../../world-6/emperor";
import type { ResearchGrid } from "../../world-7/research";
import type { SushiStation } from "../../world-7/sushi";
import type { Meritocraty } from "../../world-7/meritocraty";
import type { UpgradeVault } from "../../upgradeVault";
import type { GemStore } from "../../gemPurchases";
import type { Card } from "../../cards";
import type { Player } from "../../player";
import type { Achievement } from "../../achievements";
import { getCompanionActiveBonus, type Companion } from "../../companions";
import { TotalizerBonus, type Worship } from "../../world-3/worship";
import { SkillsIndex } from "../../SkillsIndex";

export class Plant {
    speciesId: number;
    name: string;
    description: string | undefined;
    unlocked = false;

    constructor(data: GamingSpeciesModel) {
        this.speciesId = data.speciesId;
        this.name = data.name;
        this.description = data.effectText;
    }

    static fromBase(records: GamingSpeciesBase[]): Plant[] {
        return records.filter(record => record.data.speciesId >= 1 && record.data.speciesId <= 10)
            .map(record => new Plant(record.data));
    }

    parse(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const saved = data.get("Gaming") as unknown[];

        this.unlocked = this.speciesId === 1 || (this.speciesId < 10
            ? gaming.mutations.discoveredCount >= this.speciesId - 1
            : typeof saved[6] === "string" && saved[6].includes("h"));
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const rat = gaming.getImport(8) as KingRatImport;

        this.unlocked = this.speciesId === 1 || (this.speciesId < 10
            ? gaming.mutations.discoveredCount >= this.speciesId - 1
            : rat.purchased);
    }

    getEvolutionProbability(stage: number, base: number, cropMultiplier: number): number {
        // Visible stages start at 1. The native growth calculation starts at 0.
        const nativeStage = stage - 1;
        const royale = Math.floor(this.speciesId / 10);
        let divisor = 1 + 2000 * royale;

        // Royale uses an extra penalty at each native evolution stage.
        if (nativeStage === 3) divisor = 20 * (1 + 1000 * royale);
        else if (nativeStage === 4) divisor = 250 * (1 + 500 * royale);
        else if (nativeStage === 5) divisor = 5000 * (1 + 200 * royale);
        else if (nativeStage === 6) divisor = 50000 * (1 + 100 * royale);
        else if (nativeStage === 7) divisor = 250000 * (1 + 5 * royale);
        else if (nativeStage === 8) divisor = 10000000 * (1 + 2 * royale);

        return Math.min(1, Math.pow(base, nativeStage + 1) * (cropMultiplier / divisor));
    }

    getBonusText(): string | undefined {
        return this.description;
    }

    getImageData(): ImageData {
        return { location: `GamingPlant${String.fromCharCode(96 + this.speciesId)}0`, width: 90, height: 90 };
    }
}

export interface FertilizerEffect {
    harvestBits?: number;
    growthCycleSeconds?: number;
    additionalSlots?: number;
}

export class FertilizerUpgrade {
    name: string;
    description: string;
    level = 0;
    costBits = 0;
    effect: FertilizerEffect = {};

    constructor(public index: number, data: GamingUpgradeModel) {
        this.name = data.name;
        this.description = data.desc;
    }

    static fromBase(records: GamingUpgradeBase[]): FertilizerUpgrade[] {
        return records.map(record => new FertilizerUpgrade(record.index, record.data));
    }

    parse(data: Map<string, any>): void {
        const saved = data.get("Gaming") as unknown[];

        this.level = Number(saved[this.index + 1]) || 0;
        this.costBits = 0;
        this.effect = {};
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const servervars = data.get("servervars") as Record<string, number>;
        const level = this.level;

        if (this.index === 0) {
            this.costBits = (1 + 3 * level + Math.pow(level, 2)) * Math.pow(
                Math.min(1.25, Math.max(1.13, 1 + (servervars.GamingFertCostExpA ?? 0) / 1000))
                + Math.max(0, Math.min(0.15, 0.18 * (level - 50) / (level + 100))), level);
            this.effect = { harvestBits: this.getHarvestBits() };
        } else if (this.index === 1) {
            this.costBits = (2 + 5 * level + Math.pow(level, 2)) * Math.pow(1.22, level);
            // A growth cycle is one roll. Initial appearance may need several rolls.
            this.effect = { growthCycleSeconds: gaming.garden.growthCycleSeconds / gaming.garden.initialAppearanceProbability };
        } else if (this.index === 2) {
            this.costBits = level < 11
                ? (25 * (level + 1) + Math.pow(level + 1, 3)) * Math.pow(5 + 3.7 * level, level)
                : 9999 * Math.pow(10, 39 + 2 * level);
            this.effect = { additionalSlots: Math.min(21, level) };
        }
    }

    getHarvestBits(): number {
        return (1 + 4 * this.level) * Math.pow(1.065, this.level);
    }

    getImageData(): ImageData {
        const width = this.index === 0 ? 108 : this.index === 1 ? 100 : 113;
        const height = this.index === 0 ? 69 : this.index === 1 ? 78 : 76;
        return { location: `GamingFertilizer${this.index}`, width, height };
    }
}

export interface GardenSlot {
    index: number;
    active: boolean;
    plant: Plant | null;
    stage: number | null;
    position: { x: number; y: number };
    paletteColor: PaletteColor | null;
    canEvolve: boolean;
    nextEvolutionProbability: number;
}

export class Garden {
    slots: GardenSlot[] = [];
    capacity = 3;
    readonly maximumCapacity = 24;
    maximumStage = 4;
    growthCycleSeconds = 5000;
    harvestBits = 1;
    nonPlantBitsMultiplier = 1;
    initialAppearanceProbability = 0.13;
    evolutionUpgradeLevel = 0;
    evolutionUpgradeCostBits = 36;
    evolutionChances: { plant: Plant; fromStage: number; toStage: number; probability: number }[] = [];

    parse(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const saved = data.get("Gaming") as unknown[];
        const sprouts = data.get("GamingSprout") as number[][];

        this.evolutionUpgradeLevel = Number(saved[7]) || 0;

        // Row 24 is the native sentinel, not a 25th slot. Slots have no elapsed growth timer.
        this.slots = sprouts.slice(0, 24).map((row, index) => {
            const plant = gaming.plants.find(plant => plant.speciesId === Number(row?.[1])) ?? null;

            return {
                index,
                active: Number(row?.[0]) === 1,
                plant,
                // Save stages start at 0. Visible stages start at 1.
                stage: plant && Number(row?.[3]) >= 0 ? Number(row[3]) + 1 : null,
                position: { x: Number(row?.[4]) || 0, y: Number(row?.[5]) || 0 },
                paletteColor: Number(row?.[2]) >= 0
                    ? gaming.paletteColors.find(color => color.index === Number(row[2])) ?? null : null,
                canEvolve: false,
                nextEvolutionProbability: 0,
            };
        });
    }

    prepare(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const farming = data.get("farming") as Farming;
        const sneaking = data.get("sneaking") as Sneaking;
        const gems = data.get("gems") as GemStore;
        const capacityUpgrade = gaming.fertilizer.find(upgrade => upgrade.index === 2)!;
        const purchased = (id: number): number => gaming.isSuperbitPurchased(id) ? 1 : 0;

        // Logbook needs this stage limit before it calculates the Bits bonus.
        this.capacity = Math.round(Math.min(this.maximumCapacity, 3 + capacityUpgrade.level
            + gems.purchases.find(purchase => purchase.no === 133)!.pucrhased));
        this.maximumStage = 1 + Math.min(9, purchased(48) + purchased(57)
            + Math.min(Math.round(3 + purchased(1) + purchased(5) + purchased(18)
                + (sneaking.jadeUpgrades.find(upgrade => upgrade.index === 6)!.purchased ? 1 : 0)), 7));

        const mutationLevel = this.evolutionUpgradeLevel;
        this.evolutionUpgradeCostBits = (25 + 10 * (mutationLevel + 1) + Math.pow(mutationLevel + 1, 2)) * Math.pow(1.3, mutationLevel);
        const baseEvolution = 0.13 + 0.11 * mutationLevel / (150 + mutationLevel);
        const cropMultiplier = Math.max(1, farming.cropScientist.getBonus(CropScientistBonusText.PlantEvolutionChance));

        this.initialAppearanceProbability = Math.min(1, baseEvolution * cropMultiplier);
        this.evolutionChances = gaming.plants.flatMap(plant => Array.from({ length: this.maximumStage - 1 }, (_, index) => ({
            plant,
            fromStage: index + 1,
            toStage: index + 2,
            probability: plant.getEvolutionProbability(index + 1, baseEvolution, cropMultiplier),
        })));

        this.slots.forEach(slot => {
            slot.canEvolve = slot.active && slot.index < this.capacity && slot.plant !== null
                && slot.stage !== null && slot.stage < this.maximumStage;
            slot.nextEvolutionProbability = slot.canEvolve
                ? slot.plant!.getEvolutionProbability(slot.stage!, baseEvolution, cropMultiplier)
                : 0;
        });
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const divinity = data.get("divinity") as Divinity;
        const squirrel = gaming.getImport(2) as SquirrelImport;
        const kitsune = gaming.getImport(4) as KitsuneImport;
        const valueUpgrade = gaming.fertilizer.find(upgrade => upgrade.index === 0)!;
        const speedUpgrade = gaming.fertilizer.find(upgrade => upgrade.index === 1)!;
        const paletteMode = gaming.palette.active ? 1 : 0;

        // Initial appearance is a probability per cycle, not part of the cycle duration.
        this.growthCycleSeconds = (5000 * (1 + 99 * paletteMode)) /
            ((1 + 2 * speedUpgrade.level / 100) * (1 + gaming.getPaletteBonus(8) / 100) * (1 + gaming.getPaletteBonus(11) / 100)
                * (1 + (squirrel.shop.find(upgrade => upgrade.index === 1)!.bonusPercent! + divinity.getGamingGrowthMinorLinkBonus()) / 100)
                * kitsune.growthMultiplier);

        // Imports and Logbook must be updated before these factors are read.
        this.nonPlantBitsMultiplier = this.getNonPlantBitsMultiplier(data);
        this.harvestBits = valueUpgrade.getHarvestBits() * this.nonPlantBitsMultiplier * kitsune.rewardMultiplier;
    }

    private getNonPlantBitsMultiplier(data: Map<string, any>): number {
        const gaming = data.get("gaming") as Gaming;
        const research = data.get("research") as ResearchGrid;
        const sushi = data.get("sushi") as SushiStation;
        const sailing = data.get("sailing") as Sailing;
        const companions = data.get("companions") as Companion[];
        const alchemy = data.get("alchemy") as Alchemy;
        const hole = data.get("hole") as Hole;
        const rift = data.get("rift") as Rift;
        const worship = data.get("worship") as Worship;
        const cards = data.get("cards") as Card[];
        const cooking = data.get("cooking") as Cooking;
        const players = data.get("players") as Player[];
        const achievements = data.get("achievements") as Achievement[];
        const summoning = data.get("summoning") as Summoning;
        const emperor = data.get("emperor") as Emperor;
        const meritocraty = data.get("meritocraty") as Meritocraty;
        const farming = data.get("farming") as Farming;
        const vault = data.get("upgradeVault") as UpgradeVault;

        const skillMastery = rift.bonuses.find(bonus => bonus instanceof SkillMastery) as SkillMastery;
        const squirrel = gaming.getImport(2) as SquirrelImport;
        const shell = gaming.getImport(3) as ShellImport;
        const log = gaming.getImport(5) as BogLogImport;
        const pong = gaming.getImport(6) as HighScoreImport;
        const snail = gaming.getImport(7) as SnailImport;
        const rat = gaming.getImport(8) as KingRatImport;
        const shovel = gaming.getImport(1) as ShovelImport;

        const bitsTalent = players.reduce((best, player) => Math.max(best, player.getTalentBonus(177)), 0);
        const card = cards.find(card => card.id === "w7b2")!;
        // Skill Mastery supplies the complete Bits percentage.
        const masteryBits = skillMastery.getSkillBonus(SkillsIndex.Gaming, 1);

        // Preserve native factor order. Additive bonuses inside a factor stay grouped.
        return (1 + 99 * Number(gaming.palette.active))
            * (1 + research.getBonusForId(87, 0) / 100)
            * (1 + sushi.getBonusFromIndex(29) / 100)
            * (1 + sailing.artifacts[20].getBonus() / 100)
            * Math.max(1, 1 + getCompanionActiveBonus(companions, 53))
            * (1 + alchemy.getVialBonusForKey("7bits") / 100)
            * (1 + sailing.artifacts[23].getBonus() / 100)
            * (1 + hole.getMonumentBonus("Bravery", 4) / 100)
            * (1 + masteryBits / 100)
            * (1 + worship.totalizer.getBonus(TotalizerBonus.BitValue) / 100)
            * Math.max(1, snail.bitsMultiplier)
            * (1 + card.getBonus() / 100)
            * Math.max(1, squirrel.shop.find(upgrade => upgrade.index === 0)!.multiplier!)
            * Math.max(1, shovel.bestNugget)
            * shell.earnedBitsMultiplier
            * Math.max(1, gaming.logbook.bitsMultiplier * log.bitsMultiplier * rat.bitsMultiplier)
            * (1 + (cooking.getMealBonusForKey("GamingBits") + alchemy.getVialBonusForKey("GameBits")) / 100)
            * (1 + bitsTalent * gaming.level / 100)
            * Math.max(1, Math.min(25, pong.bitsMultiplier))
            * (1 + (Number(achievements.find(achievement => achievement.index === 296)!.completed)
                + Number(achievements.find(achievement => achievement.index === 307)!.completed)) / 20)
            * (1 + summoning.getSummoningWinnerBonusFromIndex(16) / 100)
            * (1 + hole.lamp.getBonus(false, 1, 1) / 100)
            * (1 + emperor.getEffectiveBonus(7) / 100)
            * (1 + gaming.getPaletteBonus(7) / 100)
            * (1 + gaming.getPaletteBonus(18) / 100)
            * (1 + meritocraty.getCurrentBonus(1) / 100)
            * (1 + farming.getStickerBonus(3) / 100)
            * (1 + vault.getBonusForId(68) / 100);
    }
}

export class MutationProgress {
    dna = 0;
    discoveredCount = 0;
    maximumDiscoveries = 8;
    pityDna = 0;
    canAttempt = false;
    attemptProbability = 0;
    nextPlant: Plant | null = null;

    parse(data: Map<string, any>): void {
        const saved = data.get("Gaming") as unknown[];
        const options = (data.get("OptLacc") ?? []) as number[];

        this.dna = Number(saved[5]) || 0;
        this.discoveredCount = Number(saved[4]) || 0;
        this.pityDna = Number(options[342]) || 0;
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const votes = data.get("votes") as Votes;

        this.canAttempt = this.dna > 0.5 && this.discoveredCount < this.maximumDiscoveries;
        this.nextPlant = gaming.plants.find(plant => plant.speciesId === this.discoveredCount + 2 && plant.speciesId < 10) ?? null;

        const voteMultiplier = 1 + votes.getCurrentBonus(21) / 100;
        this.attemptProbability = this.discoveredCount === 0
            ? Math.min(0.8, (7 * this.dna / (100 + this.dna)) * voteMultiplier)
            : Math.min(0.99, (42 * this.dna / (100 + this.dna)) * Math.pow(0.31, this.discoveredCount) * voteMultiplier
                * (1 + 10 * Math.pow(Math.max(0, this.pityDna / (70 * Math.pow(1.7, this.discoveredCount) + this.pityDna)), 2)));
    }
}

export class Logbook {
    entries: { plant: Plant; highestStage: number | null; maximumStage: number }[];
    totalRecordedStages = 0;
    bitsMultiplier = 1;

    constructor(plants: Plant[]) {
        this.entries = plants.map(plant => ({ plant, highestStage: null, maximumStage: 4 }));
    }

    parse(data: Map<string, any>): void {
        const saved = data.get("Gaming") as unknown[];
        const stages = typeof saved[11] === "string" ? saved[11] : "";

        this.entries.forEach(entry => {
            // The encoded count already includes the first visible stage.
            const highestStage = letterToNumber(stages.charAt(entry.plant.speciesId - 1));
            entry.highestStage = highestStage > 0 ? highestStage : null;
        });
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const alchemy = data.get("alchemy") as Alchemy;

        // Garden prepares its maximum stage before Logbook; Garden Bits use this bonus next.
        this.totalRecordedStages = this.entries.reduce((total, entry) => {
            entry.maximumStage = gaming.garden.maximumStage;
            return total + (entry.highestStage ?? 0);
        }, 0);

        this.bitsMultiplier = Math.max(1, Math.pow(1.08, this.totalRecordedStages)
            + alchemy.getBubbleBonusForKey("Y3") * this.totalRecordedStages / 100);
    }

    getImageData(): ImageData {
        return { location: "GamingLogbook", width: 40, height: 40 };
    }
}
