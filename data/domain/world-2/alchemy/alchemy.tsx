import { lavaFunc, lavaLog, nFormatter, number2letter, range, round } from '../../../utility'
import { Cooking } from '../../world-4/cooking';
import { CauldronBase, initBubbleRepo } from '../../data/BubbleRepo';
import { ImageData } from '../../imageData';
import { Item } from '../../items';
import { Lab } from '../../world-4/lab';
import { BubbleModel } from '../../model/bubbleModel';
import { ComponentBaseModel } from '../../model/componentBaseModel';
import { LiquidComponentModel } from '../../model/liquidComponentModel';
import { ComponentModel } from '../../model/componentModel';
import { SpiceComponentModel } from '../../model/spiceComponentModel';
import { Player } from '../../player';
import { ClassIndex } from '../../talents';
import { SkillsIndex } from '../../SkillsIndex';
import { Sailing } from '../../world-5/sailing/sailing';
import { TaskBoard } from '../../tasks';
import { Rift } from '../../world-4/rift';
import { Domain, RawData } from '../../base/domain';
import { MapInfo } from '../../maps';
import { Slab } from '../../world-5/slab';
import { JadeComponentModel } from '../../model/jadeComponentModel';
import { CropComponentModel } from '../../model/cropComponentModel';
import { SummonComponentModel } from '../../model/summonComponentModel';
import { SailTreasureComponentModel } from '../../model/sailTreasureComponentModel';
import { Tome } from '../../world-4/tome';
import type { EquipmentSets } from '../../misc/equipmentSets';
import type { Grimoire } from '../../grimoire';
import { UpgradeVault } from '../../upgradeVault';
import { Tesseract } from '../../tesseract';
import { Arcade } from '../arcade';
import { LegendTalent, LegendTalents } from '../../world-7/legendTalents';
import { Sigils } from './sigils';
import type { Farming } from '../../world-6/farming';
import { getCompanionActiveBonus, type Companion } from '../../companions';
import type { SushiStation } from '../../world-7/sushi';
import { Gaming } from '../../world-5/gaming';
import type { JellyOperator } from '../../world-7/jellyOperator';
import { Talent } from '../../talents';
import type { Account } from '../../account';
import type { EventShop } from '../../eventShop';
import type { Divinity } from '../../world-5/divinity';
import type { Hole } from '../../world-5/hole/hole';
import type { ZenithMarket } from '../../world-7/zenithShop';
import { LiquidCauldron } from './liquidCauldron';
import type { Meritocraty } from '../../world-7/meritocraty';
import { getStampBonusForKey, type Stamp } from '../../world-1/stamps';
import type { Guild } from '../../guild';

export enum CauldronIndex {
    Power = 0,
    Quicc = 1,
    HighIQ = 2,
    Kazam = 3
}

export enum CauldronBoostIndex {
    Speed = 0,
    Luck = 1,
    Cost = 2,
    Extra = 3
}

export const AlchemyConst = {
    OrangeBargain: 14,
    VialIndex: 4,
    UnderdevelopedCosts: 6,
    Anvilnomics: 4,
    HammerHammer: 2,
    BarleyBrew: 9,
    BlueFlav: 18,
    SmartBoi: 13,
    GospelLeader: 12,
    CallMePope: 11,
    CauldronCount: 4,
    CauldronBonusBubbleIndex: 1,
    LoCostMoJade: 29
};

const cauldronPrefix: Record<string, string> = {
    "Power Cauldron": "O",
    "Quicc Cauldron": "G",
    "High-IQ Cauldron": "P",
    "Kazam Cauldron": "Y"
}

const cauldronIndex: Record<string, number> = {
    "Power Cauldron": 0,
    "Quicc Cauldron": 1,
    "High-IQ Cauldron": 2,
    "Kazam Cauldron": 3
}

export const VialIndex = 4;

// P2W Consts
export const P2W_CAULDRON_SPEED_MAX = 150;
export const P2W_CAULDRON_NEWBUBBLE_MAX = 125;
export const P2W_CAULDRON_BOOST_MAX = 100;
export const P2W_LIQUIDS_REGEN_MAX = 100;
export const P2W_LIQUIDS_CAPACITY_MAX = 80;
export const P2W_VIALS_ATTEMPTS_MAX = 15;
export const P2W_VIALS_RNG_MAX = 45;

const vialPercentages = "99 90 80 70 60 60 40 50 40 35 30 25 17 16 13 9 13 10 7 11 1 25 25 20 20 15 14 13 5 12 10 9 7 5 4 3 3 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1".split(" ").map((value) => parseInt(value));
const vialCostPerLevel = [0, 100, 1000, 2500, 10000, 50000, 100000, 500000, 1000001, 5000000, 25000000, 100000000, 1000000000, 50000000000];

const calcBubbleMatCost = (bubbleLvl: number, bubbleIndex: number, baseCost: number, isLiquid: boolean, cauldCostReduxLvl: number = 0, undevelopedCostsBubbleLevel: number = 0, bubbleCostVialLvl: number = 0, bubbleBargainLvl: number = 0, bubbleMultClassLvl: number = 0, shopBargainBought: number = 0, hasAchievement: boolean, bubbleNewMultiLevel: number = 0, vialMultiplier: number = 1, isBits: boolean): number => {
    if (isLiquid) {
        return baseCost + Math.floor(bubbleLvl / 20);
    } else if (isBits) {
        return baseCost * Math.pow(2, bubbleLvl) * Math.max(0.1, Math.pow(0.75, shopBargainBought)) * (hasAchievement ? 0.9 : 1)
    } else {
        const first = bubbleIndex < 15 ?
            baseCost * Math.pow(1.35 - (0.3 * bubbleLvl) / (50 + bubbleLvl), bubbleLvl) :
            baseCost * Math.pow(1.37 - (0.28 * bubbleLvl) / (60 + bubbleLvl), bubbleLvl);

        const cauldCostReduxBoost = Math.max(
            0.1,
            1 - (Math.round(10 * lavaFunc("decay", cauldCostReduxLvl, 90, 100)) / 10) / 100
        );
        const bubbleCostBubbleBoost = Math.max(
            0.05,
            1 - (lavaFunc("decay", undevelopedCostsBubbleLevel, 40, 70) + (lavaFunc("add", bubbleCostVialLvl, 1, 0) * vialMultiplier)) / 100
        );
        const bubbleBargainBoost = Math.max(
            0.05,
            1 - (lavaFunc("decay", bubbleBargainLvl, 40, 12) / 100) * lavaFunc("decayMulti", bubbleMultClassLvl, 2, 50) * lavaFunc("decayMulti", bubbleNewMultiLevel, 1.4, 30)
        );
        const shopBargainBoost = Math.max(0.1, Math.pow(0.75, shopBargainBought));
        // for any material besides liquid
        return Math.min(1e9, Math.round(first * cauldCostReduxBoost * bubbleBargainBoost * bubbleCostBubbleBoost * shopBargainBoost * (hasAchievement ? 0.9 : 1)));
    }
}

function handleToolBubbles(titleText: string, bubbleName: string) {
    switch (bubbleName) {
        case "Stronk Tools": return titleText.replace("$", "Pickaxes and Fishing Rods");
        case "Sanic Tools": return titleText.replace("$", "Catching Nets and Traps");
        case "Le Brain Tools": return titleText.replace("$", "Hatchets and Worship Skulls");
        default: return titleText;
    }
}

export const bubbleGrowthMilestones = [50, 75, 90, 95, 99] as const;

export class Bubble {
    name: string;
    x1: number;
    x2: number;
    func: string;
    description: string;
    rawRequirements: ComponentBaseModel[];
    requirements: Array<Item> = [];

    level: number = 0;
    labUpgrade: boolean = false;
    bubbleIndex: number;
    cauldronIndex: number;

    iconPrefix: string

    prismatic: boolean = false;
    prismaticMultiplier: number = 2;

    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new Bubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, public data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        this.name = id.replace("]", "²")
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.func = data.func;
        this.description = data.description;
        this.rawRequirements = data.requirements;
        this.bubbleIndex = bubbleIndex;
        this.iconPrefix = iconPrefix;
        this.cauldronIndex = cauldronIndex[data.cauldron];

    }

    getImageData = (): ImageData => {
        return {
            location: `aUpgrades${this.iconPrefix}${this.bubbleIndex}`,
            height: 70,
            width: 70
        }
    }

    getMaterialCost = (cauldCostReduxLvl: number = 0, undevelopedCostsBubbleLevel: number = 0, bubbleCostVialLvl: number = 0, bubbleBargainLvl: number = 0, bubbleMultClassLvl: number = 0, shopBargainBought: number = 0, hasAchievement: boolean = false, bubbleNewMultiLevel: number = 0, vialMultiplier: number = 1): Map<Item, number> => {
        const toReturn = new Map<Item, number>();
        this.requirements.forEach((req) => {
            toReturn.set(req, calcBubbleMatCost(this.level, this.bubbleIndex, req.count, req.internalName.includes("Liquid"), cauldCostReduxLvl, undevelopedCostsBubbleLevel, bubbleCostVialLvl, bubbleBargainLvl, bubbleMultClassLvl, shopBargainBought, hasAchievement, bubbleNewMultiLevel, vialMultiplier, req.internalName == "Bits"))
        })
        return toReturn;
    }

    getAtomCost = (materialCost: number) => {
        return Math.floor((materialCost / 1e9) * (this.bubbleIndex + 1) * Math.pow(1.04, this.bubbleIndex) * 100)
    }

    getBonus = (roundResult: boolean = false): number => {
        return this.getGrowthBonus(roundResult);
    }

    // Other account-based multipliers do not change the bubble's growth curve.
    getGrowthBonus(roundResult: boolean = true): number {
        return lavaFunc(this.func, this.level, this.x1, this.x2, roundResult) *
            (this.prismatic ? this.prismaticMultiplier : 1);
    }

    getMaximumBonus(): number | undefined {
        let maximum: number;
        switch (this.func) {
            case "decay": maximum = this.x1; break;
            case "decayMulti": maximum = this.x1 + 1; break;
            case "addDECAY": maximum = this.x1 * 100000; break;
            default: return undefined;
        }
        return maximum * (this.prismatic ? this.prismaticMultiplier : 1);
    }

    getBonusProgress(level: number = this.level): number | undefined {
        const maximum = this.getMaximumBonus();
        if (maximum === undefined) {
            return undefined;
        }
        if (this.func === "addDECAY") {
            const current = lavaFunc(this.func, level, this.x1, this.x2)
                * (this.prismatic ? this.prismaticMultiplier : 1);
            return round(current) / maximum * 100;
        }
        return level / (level + this.x2) * 100;
    }

    getNextGrowthMilestone(): { percentage: number; level: number } | undefined {
        const maximum = this.getMaximumBonus();
        const currentProgress = this.getBonusProgress();
        if (maximum === undefined || !Number.isFinite(maximum) ||
            currentProgress === undefined || !Number.isFinite(currentProgress)) {
            return undefined;
        }

        let percentage: number | undefined;
        for (const milestone of bubbleGrowthMilestones) {
            if (milestone > currentProgress) {
                percentage = milestone;
                break;
            }
        }
        if (percentage === undefined) {
            return undefined;
        }

        let lower = 0;
        let upper = 1;
        while (true) {
            const progress = this.getBonusProgress(upper);
            if (progress === undefined || !Number.isFinite(progress)) {
                return undefined;
            }
            if (progress >= percentage) {
                break;
            }
            if (upper === Number.MAX_SAFE_INTEGER) {
                return undefined;
            }
            upper = Math.min(upper * 2, Number.MAX_SAFE_INTEGER);
        }

        // Find the first whole-number level that reaches the milestone, including bonus rounding.
        while (lower < upper) {
            const middle = lower + Math.floor((upper - lower) / 2);
            const progress = this.getBonusProgress(middle);
            if (progress === undefined || !Number.isFinite(progress)) {
                return undefined;
            }
            if (progress >= percentage) {
                upper = middle;
            } else {
                lower = middle + 1;
            }
        }
        return { percentage, level: lower };
    }

    getBonusText = (bonus: number = this.getBonus(true)): string => {
        const titleText = this.description.replace(/{/g, nFormatter(bonus));
        return handleToolBubbles(titleText, this.name);
    }

    // This is currently only used for prismatic bubbles, but I added it here
    // in case it's used anywhere else in the future.
    getBubbleIdentifier = (): string => {
        return `${number2letter(this.cauldronIndex)}${this.bubbleIndex}`;
    }

}

export class ImpactedBySlabBubble extends Bubble {
    lootyCount: number = 0;

    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new ImpactedBySlabBubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        super(id, data, iconPrefix, bubbleIndex);
    }

    override getBonus = (roundResult: boolean = false): number => {
        const bonus = lavaFunc(this.func, this.level, this.x1, this.x2, false) *
            (this.prismatic ? this.prismaticMultiplier : 1);
        return roundResult ? round(Math.floor(this.lootyCount / 100) * bonus) : Math.floor(this.lootyCount / 100) * bonus;
    }

    override getBonusText = (bonus: number = this.getBonus(true)): string => {
        let bonusText = this.description.replace(/{/g, lavaFunc(this.func, this.level, this.x1, this.x2, true).toString());
        bonusText += ` (${this.lootyCount} items found = ${bonus.toString()} bonus stats)`;
        return bonusText;
    }
}

export class ImpactedByTheTomeBubble extends Bubble {
    theTomeTotalScore: number = 0;
    grimoireTomeBonus: number = 0;
    trollSetTomeBonus: number = 0;

    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new ImpactedByTheTomeBubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        super(id, data, iconPrefix, bubbleIndex);
    }

    override getBonus = (roundResult: boolean = false): number => {
        const bonus = lavaFunc(this.func, this.level, this.x1, this.x2, false) *
            (this.prismatic ? this.prismaticMultiplier : 1);
        const scoreStackBonus = Math.floor(Math.max(0, this.theTomeTotalScore - 5000) / 2000) * bonus;
        const finalBonus = scoreStackBonus * (1 + (this.grimoireTomeBonus + this.trollSetTomeBonus) / 100);
        return roundResult ? round(finalBonus) : finalBonus;
    }

    override getBonusText = (bonus: number = this.getBonus(true)): string => {
        let bonusText = this.description.replace(/{/g, lavaFunc(this.func, this.level, this.x1, this.x2, true).toString());
        bonusText += ` (${this.theTomeTotalScore} total score = +${bonus.toString()}% total bonus)`;
        return bonusText;
    }
}

export class DiamonChefBubble extends Bubble {
    diamonMeals: number = 0;

    // Should this live inside the bubble base class? :thinking:
    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new DiamonChefBubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        super(id, data, iconPrefix, bubbleIndex);
    }

    override getBonus = (roundResult: boolean = false): number => {
        const bonus = lavaFunc(this.func, this.level, this.x1, this.x2, false) *
            (this.prismatic ? this.prismaticMultiplier : 1);
        return roundResult ? round(Math.pow(bonus, this.diamonMeals)) : Math.pow(bonus, this.diamonMeals);
    }

    override getBonusText = (bonus: number = this.getBonus(true)): string => {
        const theBonus = lavaFunc(this.func, this.level, this.x1, this.x2, true) *
            (this.prismatic ? this.prismaticMultiplier : 1);
        let titleText = this.description.replace(/{/g, theBonus.toString());
        titleText += ` (${this.diamonMeals} diamond plates = ${bonus.toString()}x faster)`;
        return handleToolBubbles(titleText, this.name);
    }
}

export class DailyDripBubble extends Bubble {
    totalAlchemyLevel: number = 0;

    // Should this live inside the bubble base class? :thinking:
    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new DailyDripBubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        super(id, data, iconPrefix, bubbleIndex);
    }

    override getBonus = (roundResult: boolean = false): number => {
        const bonus = lavaFunc(this.func, this.level, this.x1, this.x2, roundResult) *
            (this.prismatic ? this.prismaticMultiplier : 1);
        const alchemyBonus = bonus * Math.max(Math.pow(this.totalAlchemyLevel / 25, .3), 0);
        return roundResult ? round(alchemyBonus) : alchemyBonus;
    }

    override getBonusText = (bonus: number = this.getBonus(true)): string => {
        return this.description.replace(/\$/g, bonus.toString());
    }
}

export class CropiusMapperBubble extends Bubble {
    totalW6PortalsOpened: number = 0;

    // Should this live inside the bubble base class? :thinking:
    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new CropiusMapperBubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        super(id, data, iconPrefix, bubbleIndex);
    }

    override getBonus = (roundResult: boolean = false): number => {
        const bonus = lavaFunc(this.func, this.level, this.x1, this.x2, roundResult) *
            (this.prismatic ? this.prismaticMultiplier : 1);
        const cropEvoBonus = bonus * this.totalW6PortalsOpened;
        return roundResult ? round(cropEvoBonus) : cropEvoBonus;
    }

    override getBonusText = (bonus: number = this.getBonus(true)): string => {
        return this.description.replace(/{/g, lavaFunc(this.func, this.level, this.x1, this.x2, true).toString()).replace(/\$/g, this.totalW6PortalsOpened + " portals = " + bonus.toString() + "%");
    }
}

export class CauldronBoost {
    level = 0;
    progress = 0;
    requirement = 0;
    maxLevel = 170;

    parse(level: unknown, progress: unknown): void {
        this.level = Number(level ?? 0);
        this.progress = Number(progress ?? 0);
    }

    prepareRequirement(requirementReduction: number): void {
        const nextLevel = this.level + 1;
        this.requirement = Math.floor(1 + Math.pow(1.5 * nextLevel, 1.6)
            * Math.pow(1.073, nextLevel) * 2 * Math.max((100 - requirementReduction) / 100, 0.05));
    }

    get progressPercent(): number {
        return this.progress / this.requirement * 100;
    }
}

export interface NextBubblePreview {
    bubbleNumber: number;
    worldNumber: number;
    brewRequirement: number;
    chancePercent: number;
}

export interface BestBrewerPreview {
    playerId: number | undefined;
    chancePercent: number;
    estimatedUnlocks: number;
    nextBubbles: NextBubblePreview[];
}

export class Cauldron {
    name: string;
    short_name: string;
    bubbles: Array<Bubble> = [];
    boosts = Array.from({ length: 4 }, () => new CauldronBoost());
    hiddenBubbleLevels: number = 0;
    brewProgress = 0;
    brewRequirement = 0.01;
    // Estimated brew points per hour use one character's bonuses for shared speed factors.
    brewSpeed = 0;
    bestBrewerPreview: BestBrewerPreview = {
        playerId: undefined, chancePercent: 0, estimatedUnlocks: 0, nextBubbles: [],
    };
    private unlockedBubbleCount = 0;
    private assignedPlayerIds: number[] = [];
    private ivory = false;
    private newBubbleMultiplier = 1;

    parse(
        index: number, levels: Record<string, number | string>, brew: unknown,
        boostLevels: unknown[], boostProgress: unknown[], jobs: unknown[], ivoryEncoding: string,
    ): void {
        this.hiddenBubbleLevels = 0;
        Object.entries(levels).forEach(([bubbleNumber, level]) => {
            if (bubbleNumber === "length") {
                return;
            }
            const bubbleIndex = Number(bubbleNumber);
            if (bubbleIndex < this.bubbles.length) {
                this.bubbles[bubbleIndex].level = Number(level);
            } else {
                this.hiddenBubbleLevels += Number(level);
            }
        });
        this.unlockedBubbleCount = 0;
        while (Number(levels[this.unlockedBubbleCount] ?? 0) !== 0) {
            this.unlockedBubbleCount++;
        }
        this.brewProgress = Number(brew ?? 0);
        this.boosts.forEach((boost, boostIndex) => {
            const saveIndex = index * 4 + boostIndex;
            boost.parse(boostLevels[saveIndex], boostProgress[saveIndex]);
        });
        this.assignedPlayerIds = [];
        jobs.forEach((job, playerId) => {
            if (Number(job) === index) {
                this.assignedPlayerIds.push(playerId);
            }
        });
        this.ivory = ivoryEncoding.charAt(index) === "1";
    }

    get readyAttempts(): number {
        return Math.floor(this.brewProgress / this.brewRequirement);
    }

    get attemptProgress(): number {
        return this.brewProgress - this.readyAttempts * this.brewRequirement;
    }

    get brewProgressPercent(): number {
        return this.attemptProgress / this.brewRequirement * 100;
    }

    private getBrewRequirement(unlocked: number): number {
        switch (unlocked) {
            case 0: return 0.01;
            case 1: return 0.15;
            case 2: return 0.75;
            case 3: return 5;
            case 4: return 20;
            default: return 1 + Math.pow(3 * (unlocked - 3), 2.2) * Math.pow(1.3, unlocked - 3);
        }
    }

    private getBaseNewBubbleChance(unlocked: number): number {
        return 139 * Math.pow(0.73, unlocked + 1) / Math.max(0.1 * unlocked + 1, 1);
    }

    getNewBubbleChance(player: Player): number {
        return this.getBaseNewBubbleChance(this.unlockedBubbleCount) * this.newBubbleMultiplier
            * (1 + player.getTalentBonusAtInputs(492, player.finalTalentInputs, true) / 100);
    }

    private getEstimatedUnlocks(chanceMultiplier: number): number {
        let remaining = this.brewProgress;
        let unlocked = this.unlockedBubbleCount;
        let expected = 0;
        while (expected < 1000) {
            const requirement = this.getBrewRequirement(unlocked);
            const chance = Math.min(this.getBaseNewBubbleChance(unlocked) * chanceMultiplier / 100, 1);
            const attempts = Math.floor(remaining / requirement);
            if (attempts <= 0 || chance <= 0) {
                break;
            }
            const attemptsPerBubble = 1 / chance;
            if (attempts < attemptsPerBubble) {
                expected += attempts * chance;
                break;
            }
            expected++;
            remaining -= attemptsPerBubble * requirement;
            unlocked++;
        }
        return expected;
    }

    prepareBrewing(
        players: Player[], p2wChance: number, boostRequirementReduction: number,
        specificSpeedMultiplier: number, playerBrewSpeeds: ReadonlyMap<number, number>,
    ): void {
        this.brewRequirement = this.getBrewRequirement(this.unlockedBubbleCount);
        this.boosts.forEach(boost => boost.prepareRequirement(boostRequirementReduction));
        const luck = Math.round(10 * (1 + 0.05 * this.boosts[CauldronBoostIndex.Luck].level)) / 10;
        this.newBubbleMultiplier = luck * Math.max(p2wChance, 1) * (this.ivory ? 1.5 : 1);
        const speedBoost = 1 + Math.round(5 * this.boosts[CauldronBoostIndex.Speed].level) / 100;
        const ivoryMultiplier = this.ivory ? 1.5 * specificSpeedMultiplier : specificSpeedMultiplier;
        const cauldronMultiplier = speedBoost * ivoryMultiplier;
        this.brewSpeed = this.assignedPlayerIds.reduce((sum, playerId) =>
            sum + (playerBrewSpeeds.get(playerId) ?? 0) * cauldronMultiplier, 0);

        let bestPlayer: Player | undefined;
        let bestBonus = 0;
        players.forEach(player => {
            const bonus = player.getTalentBonusAtInputs(492, player.finalTalentInputs, true);
            if (bonus > bestBonus) {
                bestPlayer = player;
                bestBonus = bonus;
            }
        });
        const chanceMultiplier = this.newBubbleMultiplier * (1 + bestBonus / 100);
        this.bestBrewerPreview = {
            playerId: bestPlayer?.playerID,
            chancePercent: this.getBaseNewBubbleChance(this.unlockedBubbleCount) * chanceMultiplier,
            estimatedUnlocks: this.getEstimatedUnlocks(chanceMultiplier),
            nextBubbles: Array.from({ length: 10 }, (_, offset) => {
                const unlocked = this.unlockedBubbleCount + offset;
                return {
                    bubbleNumber: unlocked + 1,
                    worldNumber: Math.ceil((unlocked + 1) / 5),
                    brewRequirement: this.getBrewRequirement(unlocked),
                    chancePercent: this.getBaseNewBubbleChance(unlocked) * chanceMultiplier,
                };
            }),
        };
    }

    constructor(name: string, short_name: string) {
        this.name = name;
        this.short_name = short_name;
    }

    getImageData(): ImageData {
        return { location: `aBrewBarCircle${cauldronIndex[this.name]}`, width: 24, height: 24 };
    }

    static fromBase = (data: CauldronBase) => {
        const iconPrefix = cauldronPrefix[data.id];
        const toReturn = new Cauldron(data.id, iconPrefix);
        data.data.bubbles.forEach((bubble, index) => {
            if (iconPrefix == "Y" && index == 17) {
                toReturn.bubbles.push(DiamonChefBubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
            else if (bubble.name == "Da Daily Drip") {
                toReturn.bubbles.push(DailyDripBubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
            else if (bubble.name == "Cropius Mapper") {
                toReturn.bubbles.push(CropiusMapperBubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
            else if (["W2", "W4", "A2", "A4", "M2", "M4"].includes(bubble.bonusKey)) {
                toReturn.bubbles.push(ImpactedBySlabBubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
            else if (["W10AllCharz", "W8", "A10AllCharz", "A9", "M10AllCharz", "M9"].includes(bubble.bonusKey)) {
                toReturn.bubbles.push(ImpactedByTheTomeBubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
            else {
                toReturn.bubbles.push(Bubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
        })

        return toReturn;
    }
}

export class Vial {
    name: string;
    x1: number;
    x2: number;
    func: string;
    description: string;
    rawRequirements: ComponentBaseModel[];
    requirements: Array<Item> = [];

    level: number = 0;
    bonusMulitplier: number = 1;
    vaultBonus: number = 0;
    maxedVials: number = 0;
    meritocracyBonus = 0;

    static calculateBonusMultiplier(labMultiplier: number, maxedVials: number, vaultBonus: number, meritocracyBonus: number): number {
        return labMultiplier * (1 + (2 * maxedVials + vaultBonus) / 100) * (1 + meritocracyBonus / 100);
    }

    constructor(id: string, public data: BubbleModel, public vialIndex: number) {
        this.name = id;
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.func = data.func;
        this.description = data.description;
        this.rawRequirements = data.requirements;
    }

    static fromBase = (id: string, data: BubbleModel, vialIndex: number) => {
        return new Vial(id, data, vialIndex);
    }

    getBonus = (round: boolean = false): number => {
        return lavaFunc(this.func, this.level, this.x1, this.x2, round)
            * Vial.calculateBonusMultiplier(this.bonusMulitplier, this.maxedVials, this.vaultBonus, this.meritocracyBonus);
    }

    getBonusText = (bonus: number = this.getBonus(true)): string => {
        return this.description.replace(/{/g, nFormatter(bonus, "Smaller"));
    }

    getImageData = (): ImageData => {
        const costItem = this.requirements.find(item => !item.internalName.includes("Liquid"));
        if (costItem) {
            return costItem.getImageData();
        }

        return {
            location: 'Blank',
            width: 36,
            height: 36
        };
    }

    getBackgroundImageData = (): ImageData => {
        return {
            location: `aVials${Math.max(this.level, 1)}`,
            width: 104,
            height: 120
        };
    }

    getNumberToRoll = () => {
        return 100 - vialPercentages[this.vialIndex < vialPercentages.length ? this.vialIndex : vialPercentages.length - 1];
    }

    getMaterialCost = (): Map<Item, number> => {
        const toReturn = new Map<Item, number>();
        this.requirements.forEach((req) => {
            if (req.internalName.includes("Liquid")) {
                toReturn.set(req, 3 * this.level)
            }
            else {
                toReturn.set(req, vialCostPerLevel[this.level]);
            }
        })
        return toReturn;
    }
}

export class P2W {
    cauldronLevels: Record<string, { speed: number, newBubble: number, boostReq: number }> = {
        "Power": { speed: 0, newBubble: 0, boostReq: 0 },
        "Quicc": { speed: 0, newBubble: 0, boostReq: 0 },
        "High-IQ": { speed: 0, newBubble: 0, boostReq: 0 },
        "Kazam": { speed: 0, newBubble: 0, boostReq: 0 },
    }
    liquidLevels: Record<string, { regen: number, capacity: number }> = {
        "Water Drops": { regen: 0, capacity: 0 },
        "Liquid N₂": { regen: 0, capacity: 0 },
        "Trench H₂O": { regen: 0, capacity: 0 },
        "Toxic HG": { regen: 0, capacity: 0 },
    }
    vialAttempts: number = 0;
    vialsRng: number = 0;
    playerSpeedLevel = 0;
    playerExpLevel = 0;

    parse(levels: number[][]): void {
        Object.values(this.cauldronLevels).forEach((value, index) => {
            const startIndex = index * 3;
            value.speed = Number(levels[0]?.[startIndex] ?? 0);
            value.newBubble = Number(levels[0]?.[startIndex + 1] ?? 0);
            value.boostReq = Number(levels[0]?.[startIndex + 2] ?? 0);
        });
        Object.values(this.liquidLevels).forEach((value, index) => {
            const startIndex = index * 2;
            value.regen = Math.max(Number(levels[1]?.[startIndex] ?? 0), 0);
            value.capacity = Math.max(Number(levels[1]?.[startIndex + 1] ?? 0), 0);
        });
        this.vialAttempts = Number(levels[2]?.[0] ?? 0);
        this.vialsRng = Number(levels[2]?.[1] ?? 0);
        this.playerSpeedLevel = Number(levels[3]?.[0] ?? 0);
        this.playerExpLevel = Number(levels[3]?.[1] ?? 0);
    }

    getCauldronBonuses(index: number): { speed: number; newBubble: number; boostReq: number } {
        const levels = Object.values(this.cauldronLevels)[index];
        return {
            speed: Math.max(0, lavaFunc("add", levels.speed, 3, 0.2)),
            newBubble: Math.max(0, lavaFunc("decayMulti", levels.newBubble, 2.5, 100)),
            boostReq: Math.max(0, lavaFunc("decay", levels.boostReq, 70, 100)),
        };
    }

    getPlayerSpeedBonus(): number {
        return Math.max(0, lavaFunc("decay", this.playerSpeedLevel, 35, 100));
    }

    getCauldronCost = (
        type: "Speed" | "NewBubble" | "BoostReq",
        level: number
    ): number => {
        switch (type) {
            case "Speed":
                return Math.round(2500 * Math.pow(1.15 - (0.117 * level) / (100 + level), level))
            case "NewBubble":
                return Math.round(3200 * Math.pow(1.18 - (0.145 * level) / (100 + level), level))
            case "BoostReq":
                return Math.round(3750 * Math.pow(1.2 - (0.14 * level) / (100 + level), level));
        }
    }

    getCauldronCostToMax = (
        type: "Speed" | "NewBubble" | "BoostReq",
        cauldron: "Power" | "Quicc" | "High-IQ" | "Kazam"
    ) => {
        let max = 0;
        let currentLevel = 0;
        switch (type) {
            case "Speed": {
                max = P2W_CAULDRON_SPEED_MAX;
                currentLevel = this.cauldronLevels[cauldron].speed;
                break;
            }
            case "NewBubble": {
                max = P2W_CAULDRON_NEWBUBBLE_MAX;
                currentLevel = this.cauldronLevels[cauldron].newBubble;
                break;
            }
            case "BoostReq": {
                max = P2W_CAULDRON_BOOST_MAX;
                currentLevel = this.cauldronLevels[cauldron].boostReq;
                break;
            }
        }
        if (max == currentLevel) {
            return 0;
        }
        return range(currentLevel, max).reduce((sum, level) => sum += this.getCauldronCost(type, level), 0)

    }

    getLiquidCost = (type: "Regen" | "Capacity", level: number): number => {
        switch (type) {
            case "Regen":
                return Math.round(2500 * Math.pow(1.19 - (0.135 * level) / (100 + level), level))
            case "Capacity":
                return Math.round(3500 * Math.pow(1.2 - (0.13 * level) / (100 + level), level));
        }
    }

    getLiquidCostToMax = (
        type: "Regen" | "Capacity",
        liquid: "Water Drops" | "Liquid N₂" | "Trench H₂O" | "Toxic HG"
    ) => {
        let max = 0;
        let currentLevel = 0;

        switch (type) {
            case "Regen": {
                max = P2W_LIQUIDS_REGEN_MAX;
                currentLevel = this.liquidLevels[liquid].regen;
                break;
            }
            case "Capacity": {
                max = P2W_LIQUIDS_CAPACITY_MAX;
                currentLevel = this.liquidLevels[liquid].capacity;
                break;
            }
        }

        if (max == currentLevel) {
            return 0;
        }
        return range(currentLevel, max).reduce((sum, level) => sum += this.getLiquidCost(type, level), 0)

    }

    getVialsCost = (type: "Attempts" | "RNG", level: number): number => {
        switch (type) {
            case "Attempts":
                return Math.round(1e4 * Math.pow(2, level))
            case "RNG":
                return Math.round(5e3 * Math.pow(1.25, level))
        }
    }

    getVialsCostToMax = (type: "Attempts" | "RNG"): number => {
        let max = 0;
        let currentLevel = 0;

        switch (type) {
            case "Attempts": {
                max = P2W_VIALS_ATTEMPTS_MAX;
                currentLevel = this.vialAttempts;
                break;
            }
            case "RNG": {
                max = P2W_VIALS_RNG_MAX;
                currentLevel = this.vialsRng;
                break;
            }
        }

        if (max == currentLevel) {
            return 0;
        }
        return range(currentLevel, max).reduce((sum, level) => sum += this.getVialsCost(type, level), 0)
    }
}

export interface DailyBubbleSources {
    mainframe: number;
    pyrite: number;
    mainframeActive: boolean;
    mainframeCount: number;
    pyriteCount: number;
    mainframeLevelGain: number;
    pyriteLevelGain: number;
    superbitCount: number;
    superbit4Chance: number;
    superbit22Chance: number;
    amberiteBase: number;
    amberiteTier: number;
    merit: number;
    superbit4: number;
    superbit22: number;
    bundle: boolean;
    event: boolean;
    tachyon: boolean;
    pyriteActive: boolean;
    amberiteOwned: boolean;
    amberiteTierOwned: boolean;
    potentialMainframeCount: number;
    potentialMainframeLevelGain: number;
    potentialPyrite: number;
    potentialPyriteCount: number;
    potentialPyriteLevelGain: number;
    potentialAmberiteBase: number;
    potentialAmberiteTier: number;
    potentialMerit: number;
    potentialSuperbit4Chance: number;
    potentialSuperbit22Chance: number;
}

export interface DailyBubbleProgression {
    enabled: boolean;
    upgradeCount: number;
    minLevelGain: number;
    maxLevelGain: number;
    normalTargets: readonly Bubble[];
    krukActive: boolean;
    krukTargets: readonly Bubble[];
    sources: DailyBubbleSources;
}

export interface AccountDailyBubbleProgression extends DailyBubbleProgression {
    maxLevelGainVaries: boolean;
    krukActiveVaries: boolean;
}

export type AlchSourceRewardBasis =
    | "value"
    | "perLevel"
    | "levelOne"
    | "whenUnlocked"
    | "perMaxedVial"
    | "perEtherealSigil"
    | "whenWinning"
    | "afterWorld7Winning";

export type AlchemySourceReward = {
    active: boolean;
    potentialValue: number;
    basis: AlchSourceRewardBasis;
};

export class Alchemy extends Domain {
    cauldrons: Array<Cauldron> = [];
    vials: Array<Vial> = [];
    p2w: P2W = new P2W();
    liquids = Object.keys(this.p2w.liquidLevels).map((name, index) => new LiquidCauldron(index, name));
    prismaFragments = 0;
    prismaticBaseMultiplier = 2;
    prismaticMaximumMultiplier = 5;
    prismaticMultiplier = this.prismaticBaseMultiplier;
    prismaticMultiplierSources = {
        tesseractPercent: 0,
        arcadePercent: 0,
        sushiPercent: 0,
        jellyOperatorPercent: 0,
        world6TrophyPercent: 0,
        palettePercent: 0,
        purpleSigilsPercent: 0,
        exoticMarketPercent: 0,
        legendTalentPercent: 0,
        companionPercent: 0,
    };
    prismaticMultiplierSourceRewards: Record<keyof Alchemy["prismaticMultiplierSources"], AlchemySourceReward> = {
        tesseractPercent: { active: false, potentialValue: 0, basis: "perLevel" },
        arcadePercent: { active: false, potentialValue: 0, basis: "levelOne" },
        sushiPercent: { active: false, potentialValue: 0, basis: "whenUnlocked" },
        jellyOperatorPercent: { active: false, potentialValue: 0, basis: "value" },
        world6TrophyPercent: { active: false, potentialValue: 0, basis: "whenUnlocked" },
        palettePercent: { active: false, potentialValue: 0, basis: "whenUnlocked" },
        purpleSigilsPercent: { active: false, potentialValue: 0, basis: "perEtherealSigil" },
        exoticMarketPercent: { active: false, potentialValue: 0, basis: "levelOne" },
        legendTalentPercent: { active: false, potentialValue: 0, basis: "perLevel" },
        companionPercent: { active: false, potentialValue: 0, basis: "whenUnlocked" },
    };
    vialBonusMultiplier = 1;
    vialMultiplierSources = {
        labFactor: 1,
        vialMasteryPercent: 0,
        vaultPercent: 0,
        meritocracyPercent: 0,
    };
    vialMultiplierSourceRewards: Record<keyof Alchemy["vialMultiplierSources"], AlchemySourceReward> = {
        labFactor: { active: false, potentialValue: 2, basis: "whenUnlocked" },
        vialMasteryPercent: { active: false, potentialValue: 0, basis: "perMaxedVial" },
        vaultPercent: { active: false, potentialValue: 0, basis: "perLevel" },
        meritocracyPercent: { active: false, potentialValue: 0, basis: "afterWorld7Winning" },
    };
    sigilSyrup = 0;
    private savedBrewerWisdom = new Map<number, number>();
    private savedBrewerLastActive = new Map<number, number>();
    // The save does not identify the active character. Estimate shared bonuses from saved character activity.
    brewingContextPlayerId: number | undefined = undefined;

    prepareBrewing(players: Player[], stampBonus: number, guildBonus: number, companionBonus: number): void {
        let contextPlayer: Player | undefined;
        let latestActivity = 0;
        for (const player of players) {
            const activity = this.savedBrewerLastActive.get(player.playerID)!;
            if (Number.isFinite(activity) && activity > latestActivity) {
                contextPlayer = player;
                latestActivity = activity;
            }
        }
        if (!contextPlayer) {
            // If activity timestamps are missing, use the character with the most bonus talent levels.
            let bestAddedLevels = -1;
            for (const player of players) {
                const inputs = player.finalTalentInputs;
                const addedLevels = Math.ceil(inputs.minorLinkTalentLevels) + inputs.eliteTalentLevels
                    + inputs.achievementTalentLevels + Math.floor(inputs.familyTalentLevels)
                    + inputs.companionTalentLevels + inputs.ninjaMasteryTalentLevels
                    + inputs.equinoxTalentLevels + inputs.grimoireTalentLevels + inputs.equipmentTalentLevels
                    + Math.min(5, inputs.tesseractTalentLevels) + inputs.gamingTalentLevels;
                if (addedLevels > bestAddedLevels) {
                    contextPlayer = player;
                    bestAddedLevels = addedLevels;
                }
            }
        }
        this.brewingContextPlayerId = contextPlayer?.playerID;
        const playerBrewSpeeds = new Map<number, number>();
        const playerSpeedBonus = this.p2w.getPlayerSpeedBonus();
        if (contextPlayer) {
            const bubbleBonus = this.getBubbleBonusForKey("BrewSpd", contextPlayer);
            const postOfficeBonus = contextPlayer.getPostOfficeBonus("BrewSpeed");
            const sharedMultiplier = 1 + (stampBonus + guildBonus + (bubbleBonus + postOfficeBonus)) / 100;
            for (const player of players) {
                const level = player.skills.get(SkillsIndex.Alchemy)!.level;
                const isContextPlayer = player === contextPlayer;
                const wisdom = isContextPlayer ? player.stats.wisdom : this.savedBrewerWisdom.get(player.playerID)!;
                const wisdomCurve = wisdom < 1000
                    ? (Math.pow(wisdom + 1, 0.37) - 1) / 40
                    : (wisdom - 1000) / (wisdom + 2500) * 0.5 + 0.297;
                let characterSpeed = playerSpeedBonus * level;
                if (isContextPlayer) {
                    const busyBrewing = player.getTalentBonusAtInputs(491, player.finalTalentInputs);
                    const brokenTime = player.getTalentBonusAtInputs(269, player.finalTalentInputs);
                    const starSignBonus = player.starSigns.reduce((sum, sign) =>
                        sum + sign.getBonus("Speed in Town Skills"), 0);
                    const townSpeed = brokenTime + starSignBonus;
                    characterSpeed *= 1 + wisdomCurve / 0.6;
                    characterSpeed *= 1 + (busyBrewing + townSpeed) / 100;
                } else {
                    // Inactive characters use allocated Busy Brewing points, not the talent's percentage bonus.
                    const busyBrewingRank = player.getTalent(491)?.pointsSpent ?? 0;
                    characterSpeed *= (1 + busyBrewingRank / 100) * (1 + wisdomCurve / 0.6);
                }
                const researchSpeed = Math.round(Math.pow(level, 0.8)) * sharedMultiplier
                    * (1 + characterSpeed / 100) * (1 + companionBonus / 100);
                playerBrewSpeeds.set(player.playerID, researchSpeed);
            }
        }
        const vialKeys = ["OrangeBrew", "GreenBrew", "PurpleBrew", "YellowBrew"];
        this.cauldrons.forEach((cauldron, index) => {
            const p2w = this.p2w.getCauldronBonuses(index);
            const specificSpeedMultiplier = (1 + this.getVialBonusForKey(vialKeys[index]) / 100)
                * (1 + p2w.speed / 100);
            cauldron.prepareBrewing(players, p2w.newBubble, p2w.boostReq, specificSpeedMultiplier, playerBrewSpeeds);
        });
    }
    private dailyPlayers: readonly Player[] = [];
    private dailyMainframeBonus = 0;
    private dailyBundleOwned = false;
    private dailyEventOwned = false;
    private dailyUpgradeCount = 0;
    private dailyKrukAccountActive = false;
    private dailyDootPlayers = new Set<number>();
    private dailyZenithTier = 0;
    private dailyNormalTargets: Bubble[] = [];
    private dailySources: Omit<DailyBubbleSources, "tachyon"> = {
        mainframe: 0, pyrite: 0, mainframeActive: false, amberiteBase: 0,
        amberiteTier: 0, merit: 0, superbit4: 0, superbit22: 0,
        mainframeCount: 0, pyriteCount: 0, superbitCount: 0,
        mainframeLevelGain: 0, pyriteLevelGain: 0,
        superbit4Chance: 0, superbit22Chance: 0, bundle: false, event: false,
        potentialMainframeCount: 0, potentialMainframeLevelGain: 0,
        potentialPyrite: 0, potentialPyriteCount: 0, potentialPyriteLevelGain: 0,
        potentialAmberiteBase: 0, potentialAmberiteTier: 0, potentialMerit: 0,
        pyriteActive: false, amberiteOwned: false, amberiteTierOwned: false,
        potentialSuperbit4Chance: 0.2, potentialSuperbit22Chance: 0.3,
    };
    dailyBubbleProgression: AccountDailyBubbleProgression | null = null;

    prepareDailyBubbleProgression(
        players: Player[], lab: Lab, sailing: Sailing, taskboard: TaskBoard,
        gaming: Gaming, account: Account, eventShop: EventShop, divinity: Divinity,
        hole: Hole, zenithMarket: ZenithMarket,
    ): void {
        const mainframe = lab.bonuses[3];
        this.dailyMainframeBonus = mainframe.getBonus() + (mainframe.active ? lab.jewels[7].getBonus() : 0);
        this.dailyBundleOwned = account.hasNoMealLeftBehindBundle;
        this.dailyEventOwned = eventShop.isBonusOwned(2);
        this.dailyPlayers = players;

        const amberite = sailing.artifacts[12];
        const tierBonuses = [
            0, 0, amberite.data.ancientBonusQty, amberite.data.eldritchBonusQty,
            amberite.data.sovereignBonusQty, amberite.data.omnipotentBonusQty,
            amberite.data.transcendentBonusQty, amberite.data.verisimilitudeBonusQty,
        ];
        const amberiteBonus = amberite.getBonus() + (tierBonuses[amberite.status] ?? 0);
        const meritUpgrade = taskboard.merits.find(value => value.descLine1.includes("Bubbles upgraded by"))!;
        const merit = meritUpgrade.level;
        const superbitBonus = Math.floor(0.2 * Number(gaming.isSuperbitPurchased(4)) + 0.3 * Number(gaming.isSuperbitPurchased(22)));
        const mainframeCount = Math.min(2, Math.max(0, mainframe.getBonus()));
        const mainframeLevelGain = Math.round(Math.max(1, mainframe.getBonus() - 1));
        const totalLevelGain = Math.round(Math.max(1, this.dailyMainframeBonus - 1));
        const potentialMainframe = mainframe.bonusOn;
        const potentialPyrite = lab.jewels[7].data.bonusGiven * lab.jewels[7].bonusMultiplier;
        const mainframeForPyrite = mainframe.active ? mainframe.getBonus() : potentialMainframe;
        const potentialMainframeLevel = Math.round(Math.max(1, potentialMainframe - 1));
        this.dailySources = {
            mainframe: this.dailyMainframeBonus,
            pyrite: lab.jewels[7].getBonus(),
            mainframeActive: mainframe.active,
            mainframeCount,
            pyriteCount: Math.max(0, Math.min(2, this.dailyMainframeBonus) - mainframeCount),
            mainframeLevelGain: mainframeLevelGain - 1,
            pyriteLevelGain: totalLevelGain - mainframeLevelGain,
            superbitCount: superbitBonus,
            superbit4Chance: 0.2 * Number(gaming.isSuperbitPurchased(4)),
            superbit22Chance: 0.3 * Number(gaming.isSuperbitPurchased(22)),
            amberiteBase: amberite.getBonus(),
            amberiteTier: tierBonuses[amberite.status] ?? 0,
            merit,
            superbit4: Number(gaming.isSuperbitPurchased(4)),
            superbit22: Number(gaming.isSuperbitPurchased(22)),
            bundle: this.dailyBundleOwned,
            event: this.dailyEventOwned,
            pyriteActive: lab.jewels[7].active,
            amberiteOwned: amberite.status > 0,
            amberiteTierOwned: amberite.status > 1,
            potentialSuperbit4Chance: 0.2,
            potentialSuperbit22Chance: 0.3,
            potentialMainframeCount: Math.min(2, Math.max(0, potentialMainframe)),
            potentialMainframeLevelGain: potentialMainframeLevel - 1,
            potentialPyrite,
            potentialPyriteCount: Math.max(0, Math.min(2, mainframeForPyrite + potentialPyrite) - Math.min(2, Math.max(0, mainframeForPyrite))),
            potentialPyriteLevelGain: Math.round(Math.max(1, mainframeForPyrite + potentialPyrite - 1))
                - Math.round(Math.max(1, mainframeForPyrite - 1)),
            potentialAmberiteBase: amberite.getBonus(true),
            potentialAmberiteTier: amberite.data.ancientBonusQty,
            potentialMerit: meritUpgrade.bonusPerLevel,
        };
        this.dailyUpgradeCount = Math.min(10, Math.max(3, Math.round(
            Math.min(4, this.dailyMainframeBonus + 2) + amberiteBonus + merit + superbitBonus,
        )));

        const enabled = this.dailyMainframeBonus > 0.5 || this.dailyBundleOwned || this.dailyEventOwned;
        this.dailyNormalTargets = enabled
            ? this.cauldrons.flatMap(cauldron => cauldron.bubbles.slice(0, 15))
                .filter(bubble => bubble.level >= 2 && bubble.level < 10000)
                .sort((a, b) => a.level - b.level || b.cauldronIndex - a.cauldronIndex || b.bubbleIndex - a.bubbleIndex)
                .slice(0, this.dailyUpgradeCount)
            : [];
        const selected = new Set(this.dailyNormalTargets);
        this.cauldrons.forEach(cauldron => cauldron.bubbles.forEach(bubble => {
            bubble.labUpgrade = selected.has(bubble);
        }));

        this.dailyKrukAccountActive = divinity.w7ChosenDivinityBonusIndex === 8
            || hole.majiks.pocketDivinity.selections.some(selection => selection.active && selection.bonusId === 8)
            || divinity.playerInfo.some(info => info.playerIndex < 12 && info.primaryGod?.data.bonusIndex === 8);
        this.dailyDootPlayers = new Set(divinity.playerInfo.filter(info => info.dootActive).map(info => info.playerIndex));
        this.dailyZenithTier = zenithMarket.getBonusForId(1);
        const recipients = players.map(player => this.getDailyBubbleProgression(player));
        if (recipients.length === 0) {
            this.dailyBubbleProgression = null;
            return;
        }

        const first = recipients[0];
        const best = recipients.reduce((current, recipient) =>
            recipient.maxLevelGain > current.maxLevelGain ? recipient : current, first);
        const krukRecipient = recipients.find(recipient => recipient.krukActive);
        this.dailyBubbleProgression = {
            ...best,
            krukActive: !!krukRecipient,
            krukTargets: krukRecipient?.krukTargets ?? [],
            maxLevelGainVaries: recipients.some(recipient => recipient.maxLevelGain !== first.maxLevelGain),
            krukActiveVaries: recipients.some(recipient => recipient.krukActive !== first.krukActive),
        };
    }

    // Targets use saved levels and only the first 15 bubbles in each cauldron.
    // Level gains are the game's displayed values, not bounds on every reset.
    getDailyBubbleProgression(player: Player): DailyBubbleProgression {
        const enabled = this.dailyMainframeBonus > 0.5 || this.dailyBundleOwned || this.dailyEventOwned;
        const minLevelGain = Math.round(Math.max(1, this.dailyMainframeBonus - 1));
        let maxLevelGain = Math.round(Math.max(1, this.dailyMainframeBonus - 1) + 1);
        if (this.dailyBundleOwned) {
            maxLevelGain = Math.round(maxLevelGain + 3);
            if (this.dailyMainframeBonus > 0.5) maxLevelGain = Math.round(maxLevelGain + 1);
        }
        if (this.dailyEventOwned) maxLevelGain = Math.round(maxLevelGain + 2);
        const tachyon = Talent.getAccountTalentBonus(this.dailyPlayers, 598, player.finalTalentInputs) >= 1;
        if (tachyon) {
            maxLevelGain = Math.round(maxLevelGain + 3);
        }

        const krukActive = this.dailyKrukAccountActive || this.dailyDootPlayers.has(player.playerID);
        const krukTargets: Bubble[] = [];
        if (krukActive) {
            krukTargets.push(this.cauldrons[0].bubbles[0], this.cauldrons[1].bubbles[0], this.cauldrons[2].bubbles[0]);
            if (this.dailyZenithTier >= 1) krukTargets.push(this.cauldrons[3].bubbles[0]);
            if (this.dailyZenithTier >= 2) krukTargets.push(this.cauldrons[3].bubbles[9]);
            if (this.dailyZenithTier >= 3) krukTargets.push(this.cauldrons[0].bubbles[11]);
            if (this.dailyZenithTier >= 4) krukTargets.push(this.cauldrons[1].bubbles[11]);
            if (this.dailyZenithTier >= 5) krukTargets.push(this.cauldrons[1].bubbles[2]);
        }
        return { enabled, upgradeCount: this.dailyUpgradeCount, minLevelGain, maxLevelGain,
            normalTargets: this.dailyNormalTargets, krukActive, krukTargets,
            sources: { ...this.dailySources, tachyon } };
    }

    getUndevelopedCostsBubbleLevel = (): number => {
        if (this.cauldrons.length > 0) {
            return this.cauldrons[CauldronIndex.Kazam].bubbles[AlchemyConst.UnderdevelopedCosts].level;
        }

        return 0;
    }

    getBarleyBrewVialLevel = (): number => {
        if (this.vials.length > 0) {
            return this.vials[AlchemyConst.BarleyBrew].level;
        }

        return 0;
    }

    _shouldBoostPlayer = (player: Player, cauldron: CauldronIndex, bubble: number) => {
        const bonusKey = this.cauldrons[cauldron].bubbles[bubble].data.bonusKey;
        // Class boosts exclude multiplier, active, all-character, and late bubbles; the 16th-bubble pass is independent.
        // The game calculates the first stat bubble before it prepares the class multiplier.
        if (bubble === 0 || bubble === 16 || bubble >= 30 || bonusKey.includes("passz") || bonusKey.includes("ACTIVE") || bonusKey.includes("AllCharz")) {
            return false;
        }

        if (player.getBaseClass() == ClassIndex.Archer && cauldron == CauldronIndex.Quicc) {
            return true;
        }

        if (player.getBaseClass() == ClassIndex.Mage && cauldron == CauldronIndex.HighIQ) {
            return true;
        }

        if (player.getBaseClass() == ClassIndex.Warrior && cauldron == CauldronIndex.Power) {
            // The carpenter bubble is no longer boosted
            if (bubble == 12) {
                return false;
            }

            return true;
        }

        return false;
    }

    _shouldBoostBubble = (bubble: number, cauldron: CauldronIndex) => {
        if (cauldron == CauldronIndex.Power) {
            return [0, 2, 4, 7, 14].includes(bubble);
        }

        if (cauldron == CauldronIndex.Quicc) {
            return [0, 6, 9, 12, 14].includes(bubble);
        }

        if (cauldron == CauldronIndex.HighIQ) {
            return [0, 2, 6, 12, 14].includes(bubble);
        }

        return false
    }

    // Account bonuses include the 16th bubble, but exclude recipient class, level, and mana scaling.
    getBonusForBubble = (cauldron: CauldronIndex, bubble: number) => {
        let extraBonus = 1;

        // If bubble is boosted by the 16th bubble.
        if (this._shouldBoostBubble(bubble, cauldron)) {
            extraBonus *= this.cauldrons[cauldron].bubbles[16].getBonus();
        }

        return this.cauldrons[cauldron].bubbles[bubble].getBonus() * extraBonus;
    }

    getBubbleBonusForKey = (bonusKey: string, player?: Player) => {
        const matchingBubbles = this.cauldrons.flatMap(cauldron => cauldron.bubbles).filter(bubble => bubble.data.bonusKey == bonusKey);
        return matchingBubbles.reduce((sum, bubble) => {
            const bonus = player
                ? this.getBonusForPlayer(player, bubble.cauldronIndex, bubble.bubbleIndex)
                : this.getBonusForBubble(bubble.cauldronIndex, bubble.bubbleIndex);

            return sum + bonus;
        }, 0)
    }

    getAllCharacterBubbleBonusForKey = (key: 'A7AllCharz' | 'M8AllCharz' | 'W9AllCharz', players: readonly Player[]): number => {
        const bubble = this.cauldrons
            .find(cauldron => cauldron.bubbles.some(candidate => candidate.data.bonusKey === key))!
            .bubbles.find(candidate => candidate.data.bonusKey === key)!;
        let totalLevels = 0;

        for (const player of players) {
            const baseClass = player.getBaseClass();
            if (
                (baseClass === ClassIndex.Warrior && bubble.cauldronIndex === CauldronIndex.Power) ||
                (baseClass === ClassIndex.Archer && bubble.cauldronIndex === CauldronIndex.Quicc) ||
                (baseClass === ClassIndex.Mage && bubble.cauldronIndex === CauldronIndex.HighIQ)
            ) {
                totalLevels += player.level;
            }
        }

        return this.getBubbleBonusForKey(key) * (1 + 4 * totalLevels / (totalLevels + 1000));
    }

    getVialBonusForKey = (bonusKey: string) => {
        const matchingVials = this.vials.filter(vial => vial.data.bonusKey == bonusKey);
        return matchingVials.reduce((sum, vial) => sum += vial.getBonus(), 0)
    }

    getBonusTextForBubble = (cauldron: CauldronIndex, bubble: number) => {
        return this.cauldrons[cauldron].bubbles[bubble].getBonusText(this.getBonusForBubble(cauldron, bubble));
    }

    // Some class-bound bonuses also apply to Beginners.
    private isBubbleAllowedForClass(bonusKey: string, classId: number): boolean {
        switch (bonusKey) {
            case 'W1':
                return classId >= 7 && classId < 18;
            case 'W5':
            case 'W6':
                return classId < 18;
            case 'A1':
            case 'A5':
                return classId >= 18 && classId < 30;
            case 'A6':
                return classId < 7 || (classId >= 18 && classId < 30);
            case 'M1':
            case 'M6':
                return classId < 7 || classId >= 30;
            case 'M5':
                return classId >= 30;
            default:
                return true;
        }
    }

    getBonusForPlayer = (player: Player, cauldron: CauldronIndex, bubble: number) => {
        const selectedBubble = this.cauldrons[cauldron].bubbles[bubble];
        const bonusKey = selectedBubble.data.bonusKey;
        if (!this.isBubbleAllowedForClass(bonusKey, player.classId)) {
            return 0;
        }

        let extraBonus = 1;

        // If player is right class, boost by the 2nd bubble
        if (this._shouldBoostPlayer(player, cauldron, bubble)) {
            extraBonus *= this.cauldrons[cauldron].bubbles[1].getBonus();
        }

        if (bonusKey === 'MinEff' || bonusKey === 'ChopEff') {
            // Health or mana scales the raw bonus before class and 16th-bubble multipliers.
            const preparationMaximum = bonusKey === 'MinEff'
                ? player.health.getAlchemyMaxHP()
                : player.health.getAlchemyMaxMP();
            let bonus = selectedBubble.getBonus() * lavaLog(preparationMaximum);
            bonus *= extraBonus;
            if (this._shouldBoostBubble(bubble, cauldron)) {
                bonus *= this.cauldrons[cauldron].bubbles[16].getBonus();
            }
            return bonus;
        }

        let bonus = this.getBonusForBubble(cauldron, bubble) * extraBonus;
        if (bonusKey === 'W7' || bonusKey === 'A8' || bonusKey === 'M7') {
            // Endgame efficiency keeps factor 1 below level 520, then gains 1 per ten class levels.
            bonus *= Math.max(1, Math.floor((player.level - 500) / 10));
        }
        return bonus;
    }

    hasAchievement = (): boolean => {
        return this.cauldrons[CauldronIndex.HighIQ].bubbles[AlchemyConst.SmartBoi].level > 50;
    }

    getActiveBubble = (bubbleString: string) => {
        switch (bubbleString[0]) {
            case "_": return this.cauldrons[CauldronIndex.Power].bubbles[parseInt(bubbleString.slice(1))]
            case "a": return this.cauldrons[CauldronIndex.Quicc].bubbles[parseInt(bubbleString.slice(1))]
            case "b": return this.cauldrons[CauldronIndex.HighIQ].bubbles[parseInt(bubbleString.slice(1))]
            case "c": return this.cauldrons[CauldronIndex.Kazam].bubbles[parseInt(bubbleString.slice(1))]
        }
    }

    getRawKeys(): RawData[] {
        return [
            { key: "CauldronInfo", default: {}, perPlayer: false },
            { key: "CauldUpgLVs", default: [], perPlayer: false },
            { key: "CauldUpgXPs", default: [], perPlayer: false },
            { key: "CauldronJobs1", default: [], perPlayer: false },
            { key: "PVStatList_", default: [], perPlayer: true },
            { key: "PTimeAway_", default: 0, perPlayer: true },
            { key: "CauldronP2W", default: [], perPlayer: false },
        ];
    }

    init(allItems: Item[], _charCount: number) {
        this.cauldrons = [];
        this.vials = [];
        const data = initBubbleRepo();

        data.forEach(cauldron => {
            const cauldronName = cauldron.id
            // If one of the cauldrons
            if (["Power Cauldron", "Quicc Cauldron", "High-IQ Cauldron", "Kazam Cauldron"].includes(cauldronName)) {
                this.cauldrons.push(Cauldron.fromBase(cauldron))
            }
            // If vials
            if (cauldronName == "Vials") {
                cauldron.data.bubbles.forEach((vial, index) => {
                    this.vials.push(Vial.fromBase(vial.name, vial, index));
                })
            }
        })

        convertToItemClass(this, allItems);

        return this;
    }

    parse(data: Map<string, any>): void {
        const alchemy = data.get(this.getDataKey()) as Alchemy;
        const alchemyData = data.get("CauldronInfo") as Record<string, number | string>[];
        const boostLevels = data.get("CauldUpgLVs") as number[];
        const boostProgress = data.get("CauldUpgXPs") as number[];
        const jobs = data.get("CauldronJobs1") as number[];
        const optionList = data.get("OptLacc") as (number | string)[];

        alchemy.cauldrons.forEach((cauldron, index) => {
            cauldron.parse(index, alchemyData[index] ?? {}, alchemyData[5]?.[index],
                boostLevels, boostProgress, jobs, String(optionList[32] ?? ""));
        });
        if (alchemyData[AlchemyConst.VialIndex]) {
            handleVial(alchemyData[AlchemyConst.VialIndex], alchemy);
        }
        alchemy.liquids.forEach(liquid => {
            liquid.parse(alchemyData[6]?.[liquid.liquidIndex], boostLevels, boostProgress, jobs, Number(optionList[123] ?? 0));
        });
        alchemy.p2w.parse(data.get("CauldronP2W") as number[][]);
        alchemy.prismaFragments = Number(optionList[383] ?? 0);
        alchemy.sigilSyrup = Number(optionList[409] ?? 0);
        alchemy.savedBrewerWisdom = new Map();
        alchemy.savedBrewerLastActive = new Map();
        const charCount = data.get("charCount") as number;
        for (let playerId = 0; playerId < charCount; playerId++) {
            const savedStats = data.get(`PVStatList_${playerId}`) as (number | string)[];
            alchemy.savedBrewerWisdom.set(playerId, Number(savedStats[2] ?? 0));
            alchemy.savedBrewerLastActive.set(playerId, Number(data.get(`PTimeAway_${playerId}`) ?? 0));
        }

        // Mark bubbles that are prismatic
        const prismaticBubbles = optionList[384] as string;
        if (prismaticBubbles && prismaticBubbles.length > 0) {
            alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).forEach(bubble => {
                // I don't think the comma in the end really matters, but it's here
                // to match the game code.
                if (prismaticBubbles.includes(`${bubble.getBubbleIdentifier()},`)) {
                    bubble.prismatic = true;
                }
            })
        }
    }
}

const handleVial = (vialData: Record<string, number | string>, alchemy: Alchemy) => {
    for (const [vial, level] of Object.entries(vialData)) {
        if (vial !== "length" && parseInt(vial) < alchemy.vials.length) {
            try {
                alchemy.vials[parseInt(vial)].level = Number(level);
            }
            catch (e) {
                console.log(`Failed on vial ${vial}`, e)
            }
        }
    };
}

// Should move this to a common library for typeguards.
const isLiquidComponent = (x: ComponentBaseModel): x is LiquidComponentModel => "liquidNo" in x
const isComponent = (x: ComponentBaseModel): x is ComponentModel => "item" in x
const isSpiceComponent = (x: ComponentBaseModel): x is SpiceComponentModel => "spiceNo" in x
const isCropComponent = (x: ComponentBaseModel): x is CropComponentModel => "cropId" in x
const isSummonComponent = (x: ComponentBaseModel): x is SummonComponentModel => "summonId" in x
const isSailingTreasureComponent = (x: ComponentBaseModel): x is SailTreasureComponentModel => "sailTreasureNo" in x

const convertToItemClass = (alchemy: Alchemy, allItems: Item[]) => {
    alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).forEach(bubble => {
        bubble.rawRequirements.forEach(req => {
            switch (true) {
                case isLiquidComponent(req): {
                    const liquid = req as LiquidComponentModel;
                    const itemName = `Liquid${liquid.liquidNo}`;
                    const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                    reqItem.count = liquid.quantity;
                    bubble.requirements.push(reqItem);
                    return;
                }
                // Jade upgrades only have quantity field which isn't distinct so can't use a type guard, hardcoded for now
                case (["Quickdraw Quiver", "Essence Chapter"].includes(bubble.name)): {
                    const itemName = `W6item0_x1`;
                    const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                    reqItem.count = (req as JadeComponentModel).quantity;
                    bubble.requirements.push(reqItem);
                    return;
                }
                case isComponent(req): {
                    const comp = req as ComponentModel;
                    const itemName = comp.item;
                    const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                    reqItem.count = comp.quantity;
                    bubble.requirements.push(reqItem);
                    return;
                }
                case isSpiceComponent(req): {
                    const spice = req as SpiceComponentModel;
                    const itemName = `CookingSpice${spice.spiceNo}`;
                    const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                    reqItem.count = spice.quantity;
                    bubble.requirements.push(reqItem);
                    return;
                }
                case isCropComponent(req): {
                    const crop = req as CropComponentModel;
                    const itemName = `FarmCrop${crop.cropId}`;
                    const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                    reqItem.count = crop.quantity;
                    bubble.requirements.push(reqItem);
                    return;
                }
                case isSummonComponent(req): {
                    const summon = req as SummonComponentModel;
                    const itemName = `W6item${parseInt(summon.summonId) + 6}_x1`;
                    const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                    reqItem.count = summon.quantity;
                    bubble.requirements.push(reqItem);
                    return;
                }
                case isSailingTreasureComponent(req): {
                    const treasure = req as SailTreasureComponentModel;
                    const itemName = `SailTr${treasure.sailTreasureNo}`;
                    const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                    reqItem.count = treasure.quantity;
                    bubble.requirements.push(reqItem);
                    return;
                }
            }
        })
    })

    alchemy.vials.forEach(vial => {
        vial.rawRequirements.forEach(req => {
            if (isLiquidComponent(req)) {
                const liquid = req as LiquidComponentModel;
                const itemName = `Liquid${liquid.liquidNo}`;
                const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                reqItem.count = liquid.quantity;
                vial.requirements.push(reqItem);
            }

            if (isComponent(req)) {
                const comp = req as ComponentModel;
                const itemName = comp.item;
                const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                reqItem.count = comp.quantity;
                vial.requirements.push(reqItem);
            }
        })
    })
}


export function updateAlchemySlabBubbles(data: Map<string, any>) {
    const alchemy = data.get("alchemy") as Alchemy;
    const slab = data.get("slab") as Slab;

    alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles.filter(bubble => ["W2", "W4", "A2", "A4", "M2", "M4"].includes(bubble.data.bonusKey))).forEach(bubble => {
        (bubble as ImpactedBySlabBubble).lootyCount = slab.rawObtainedCount;
    })

    return alchemy;
}

export function updateAlchemyTomeBubbles(data: Map<string, any>) {
    const alchemy = data.get("alchemy") as Alchemy;
    const tome = data.get("tome") as Tome;
    const grimoire = data.get("grimoire") as Grimoire;
    const equipmentSets = data.get("equipmentSets") as EquipmentSets;
    const tomeScore = tome.getHighestScore();
    const grimoireTomeBonus = grimoire.getUpgradeBonus(17);
    const trollSetTomeBonus = equipmentSets.getSetBonus("TROLL_SET", true);
    const scoreScaledBubbleKeys = ["W10AllCharz", "W8", "A10AllCharz", "A9", "M10AllCharz", "M9"];
    const modifierBubbleKeys = ["W8", "A9", "M9"];

    alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles.filter(bubble => scoreScaledBubbleKeys.includes(bubble.data.bonusKey)))
        .forEach(bubble => {
            const tomeBubble = bubble as ImpactedByTheTomeBubble;
            tomeBubble.theTomeTotalScore = tomeScore;
            if (modifierBubbleKeys.includes(bubble.data.bonusKey)) {
                tomeBubble.grimoireTomeBonus = grimoireTomeBonus;
                tomeBubble.trollSetTomeBonus = trollSetTomeBonus;
            }
        })

    return alchemy;
}

export function updateAlchemy(data: Map<string, any>) {
    const alchemy = data.get("alchemy") as Alchemy;
    const lab = data.get("lab") as Lab;
    const cooking = data.get("cooking") as Cooking;
    const players = data.get("players") as Player[];
    const rift = data.get("rift") as Rift;
    const vault = data.get("upgradeVault") as UpgradeVault;
    const tesseract = data.get("tesseract") as Tesseract;
    const arcade = data.get("arcade") as Arcade;
    const slab = data.get("slab") as Slab;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const sigils = data.get("sigils") as Sigils;
    const farming = data.get("farming") as Farming;
    const companions = data.get("companions") as Companion[];
    const sushi = data.get("sushi") as SushiStation;
    const jellyOperator = data.get("jellyOperator") as JellyOperator;
    const gaming = data.get("gaming") as Gaming

    const vaultBonus42 = vault.getBonusForId(42);
    const labBonusActive = lab.bonuses.find(bonus => bonus.name == "My 1st Chemistry Set")?.active ?? false;
    const riftVialMastery = rift.bonuses.find(bonus => bonus.name == "Vial Mastery");
    const maxVials = alchemy.vials.reduce((sum, vial) => sum += vial.level == 13 ? 1 : 0, 0);
    const meritocracy = data.get("meritocraty") as Meritocraty;
    const meritocracyBonus = meritocracy.getCurrentBonus(20);
    const labMultiplier = labBonusActive ? 2 : 1;
    const masteryMaxedVials = riftVialMastery?.active ? maxVials : 0;
    alchemy.vialMultiplierSources = {
        labFactor: labMultiplier,
        vialMasteryPercent: 2 * masteryMaxedVials,
        vaultPercent: vaultBonus42,
        meritocracyPercent: meritocracyBonus,
    };
    const vaultUpgrade42 = vault.bonuses.find(upgrade => upgrade.id === 42)!;
    alchemy.vialMultiplierSourceRewards = {
        labFactor: { active: labBonusActive, potentialValue: 2, basis: "whenUnlocked" },
        vialMasteryPercent: {
            active: riftVialMastery?.active ?? false,
            potentialValue: maxVials > 0 ? 2 * maxVials : 2,
            basis: maxVials > 0 ? "whenUnlocked" : "perMaxedVial",
        },
        vaultPercent: { active: vaultUpgrade42.level > 0, potentialValue: vaultUpgrade42.data.value, basis: "perLevel" },
        meritocracyPercent: {
            active: meritocracy.haveReachedW7 && meritocracy.currentBonusIndex === 20,
            potentialValue: meritocracy.haveReachedW7
                ? meritocracy.getPotentialBonus(20)
                : meritocracy.getPotentialBonusWhenEligible(20),
            basis: meritocracy.haveReachedW7 ? "whenWinning" : "afterWorld7Winning",
        },
    };
    alchemy.vialBonusMultiplier = Vial.calculateBonusMultiplier(labMultiplier, masteryMaxedVials, vaultBonus42, meritocracyBonus);

    alchemy.vials.forEach(vial => {
        vial.bonusMulitplier = labMultiplier;
        vial.maxedVials = masteryMaxedVials;
        vial.vaultBonus = vaultBonus42;
        vial.meritocracyBonus = meritocracyBonus;
    });

    const diamonChefBubble = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Diamond Chef") as DiamonChefBubble;
    if (diamonChefBubble) {
        diamonChefBubble.diamonMeals = cooking.meals.reduce((sum, meal) => sum += meal.level >= 11 ? 1 : 0, 0);
    }
    const dailyDripBubble = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Da Daily Drip") as DailyDripBubble;
    if (dailyDripBubble) {
        dailyDripBubble.totalAlchemyLevel = players.reduce((sum, player) => sum += player.skills.get(SkillsIndex.Alchemy)?.level ?? 0, 0);
    }

    let totalW6portalsOpened = 0;
    players.forEach(player => {
        for (let i = 0; 13 > i; i++) {
            const mapId = 251 + i;
            if (mapId < player.killInfo.size || mapId < MapInfo.length) {
                MapInfo[mapId].data.portalRequirements.forEach(req => {
                    totalW6portalsOpened += (player.killInfo.get(mapId) ?? 0) > req ? 1 : 0;
                });
            }
        }
    })
    const cropiusMapperBubble = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Cropius Mapper") as CropiusMapperBubble;
    if (cropiusMapperBubble) {
        cropiusMapperBubble.totalW6PortalsOpened = totalW6portalsOpened;
    }

    // Update prismatic multiplier
    const world6Trophy = slab.obtainableItems.find(item => item.internalName == "Trophy23");
    const arcaneBonus45 = tesseract.getUpgradeBonus(45);
    const arcadeBonus54 = arcade.bonuses[54].getBonus();
    const sushiBonus23 = sushi.getBonusFromIndex(23);
    const jellyBonus36 = jellyOperator.getObstructionBonus(36);
    const world6TrophyReward = 10;
    const world6TrophyBonus = world6Trophy?.obtained ? world6TrophyReward : 0;
    const paletteBonus28 = gaming.getPaletteBonus(28);
    const legendBonus36 = legendTalents.getBonusFromIndex(36);
    const purpleSigilsBonus = sigils.sigils.reduce((sum, sigil) => sum += (sigil.boostLevel >= 3 ? 1 : 0), 0);
    const exoticMarketBonus48 = farming.getExoticMarketBonusValue(48);
    // Prismatic strength uses the companion's active bonus, including its evolved value.
    const companion88Bonus = getCompanionActiveBonus(companions, 88);
    const tesseractUpgrade45 = tesseract.upgrades.find(upgrade => upgrade.id === 45)!;
    const sushi23 = sushi.sushi.find(sushi => sushi.index === 23)!;
    const jellyObstruction36 = jellyOperator.obstructions.find(obstruction => obstruction.index === 36)!;
    const paletteColor28 = gaming.paletteColors.find(color => color.index === 28)!;
    const exoticMarketUpgrade48 = farming.exoticMarketUpgrades.find(upgrade => upgrade.index === 48)!;
    const legendTalent36 = legendTalents.talents.find(talent => talent.index === 36)!;
    const companion88 = companions.find(companion => companion.id === 88)!;
    const purpleSigilReward = .2;

    alchemy.prismaticMultiplierSources = {
        tesseractPercent: arcaneBonus45,
        arcadePercent: arcadeBonus54,
        sushiPercent: sushiBonus23,
        jellyOperatorPercent: jellyBonus36,
        world6TrophyPercent: world6TrophyBonus,
        palettePercent: paletteBonus28,
        purpleSigilsPercent: purpleSigilReward * purpleSigilsBonus,
        exoticMarketPercent: exoticMarketBonus48,
        legendTalentPercent: legendBonus36,
        companionPercent: 50 * companion88Bonus,
    };
    alchemy.prismaticMultiplierSourceRewards = {
        tesseractPercent: { active: tesseractUpgrade45.level > 0, potentialValue: tesseractUpgrade45.data.value, basis: "perLevel" },
        arcadePercent: { active: arcade.bonuses[54].level > 0, potentialValue: arcade.bonuses[54].getBonus(false, 1), basis: "levelOne" },
        sushiPercent: { active: sushi23.unlocked, potentialValue: sushi23.getBaseBonus(), basis: "whenUnlocked" },
        jellyOperatorPercent: { active: jellyObstruction36.completed, potentialValue: jellyOperator.getObstructionBonus(36, true), basis: "value" },
        world6TrophyPercent: { active: world6Trophy?.obtained ?? false, potentialValue: world6TrophyReward, basis: "whenUnlocked" },
        palettePercent: { active: paletteColor28.unlocked, potentialValue: paletteColor28.getBonusAtLevel(1), basis: "whenUnlocked" },
        purpleSigilsPercent: { active: purpleSigilsBonus > 0, potentialValue: purpleSigilReward, basis: "perEtherealSigil" },
        exoticMarketPercent: { active: exoticMarketUpgrade48.level > 0, potentialValue: exoticMarketUpgrade48.getBonus(1), basis: "levelOne" },
        legendTalentPercent: { active: legendTalent36.level > 0, potentialValue: legendTalent36.data.bonusValue, basis: "perLevel" },
        companionPercent: {
            active: companion88.owned || companion88.bonusTokenActive,
            potentialValue: 50 * (companion88.owned || companion88.bonusTokenActive ? companion88Bonus : companion88.data.bonus),
            basis: "whenUnlocked",
        },
    };
    const sources = alchemy.prismaticMultiplierSources;
    const prismaBonus = Math.min(alchemy.prismaticMaximumMultiplier, alchemy.prismaticBaseMultiplier + (sources.tesseractPercent + (sources.arcadePercent + (sources.sushiPercent + sources.jellyOperatorPercent) + (sources.world6TrophyPercent + (sources.palettePercent + (sources.purpleSigilsPercent + sources.exoticMarketPercent)))) + (sources.legendTalentPercent + sources.companionPercent)) / 100);
    alchemy.prismaticMultiplier = prismaBonus;

    alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).forEach(bubble => {
        if (bubble.prismatic) {
            bubble.prismaticMultiplier = prismaBonus;
        }
    })
}

export function updateAlchemyDailyBubbleProgression(data: Map<string, any>): void {
    const alchemy = data.get("alchemy") as Alchemy;
    alchemy.prepareDailyBubbleProgression(
        data.get("players") as Player[],
        data.get("lab") as Lab,
        data.get("sailing") as Sailing,
        data.get("taskboard") as TaskBoard,
        data.get("gaming") as Gaming,
        data.get("account") as Account,
        data.get("eventShop") as EventShop,
        data.get("divinity") as Divinity,
        data.get("hole") as Hole,
        data.get("zenithMarket") as ZenithMarket,
    );
}

export function updateAlchemyBrewing(data: Map<string, any>): Alchemy {
    const alchemy = data.get("alchemy") as Alchemy;
    const players = data.get("players") as Player[];
    const stamps = data.get("stamps") as Stamp[][];
    const guild = data.get("guild") as Guild;
    const companions = data.get("companions") as Companion[];
    alchemy.prepareBrewing(players, getStampBonusForKey(stamps, "AlchSpd"),
        guild.guildBonuses[5].getBonus(), getCompanionActiveBonus(companions, 46));
    return alchemy;
}
