import { commaNotation, lavaFunc, lavaLog, notateNumber } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { initSpelunkingChapterRepo, SpelunkingChapterBase } from "../data/SpelunkingChapterRepo";
import { initSpelunkingMetadataRepo } from "../data/SpelunkingMetadataRepo";
import { initSpelunkingTunnelRepo, SpelunkingTunnelBase } from "../data/SpelunkingTunnelRepo";
import { initSpelunkingUpgradeRepo, SpelunkingUpgradeBase } from "../data/SpelunkingUpgradeRepo";
import { initSpelunkingElixirRepo, SpelunkingElixirBase } from "../data/SpelunkingElixirRepo";
import { initSpelunkingToolRepo, SpelunkingToolBase } from "../data/SpelunkingToolRepo";
import { AFKTypeEnum } from "../enum/aFKTypeEnum";
import { Item } from "../items";
import { ChapterBonusModel } from "../model/chapterBonusModel";
import { SpelunkingDiscoveryModel } from "../model/spelunkingDiscoveryModel";
import { SpelunkingItemDropModel } from "../model/spelunkingItemDropModel";
import { SpelunkingRewardLabelModel } from "../model/spelunkingRewardLabelModel";
import { SpelunkingTunnelModel } from "../model/spelunkingTunnelModel";
import { SpelunkingUpgradeModel } from "../model/spelunkingUpgradeModel";
import type { ImageData } from "../imageData";
import { initTomeEpilogueBonusRepo } from "../data/TomeEpilogueBonusRepo";
import type { EquipmentSets } from "../misc/equipmentSets";
import type { Grimoire } from "../grimoire";
import type { Player } from "../player";
import type { Tome } from "../world-4/tome";
import { EnemyData, EnemyInfo } from "../enemies";
import { SpelunkingChapterModel } from "../model/spelunkingChapterModel";
import { SkillsIndex } from "../SkillsIndex";
import { Companion, getCompanionActiveBonus } from "../companions";
import type { Storage } from "../storage";
import type { TaskBoard } from "../tasks";
import type { Sailing } from "../world-5/sailing/sailing";
import type { StaticRepositories } from "../repositories";
import { SkillMastery, type Rift } from "../world-4/rift";
import type { RoyalArmory } from "../world-6/royalArmory/royalArmory";
import { Card } from "../cards";
import type { Alchemy } from "../world-2/alchemy/alchemy";
import type { BigFish } from "./bigFish";
import type { LegendTalents } from "./legendTalents";
import type { Meritocraty } from "./meritocraty";
import type { SushiStation } from "./sushi";
import type { Cooking } from "../world-4/cooking";
import type { JellyOperator } from "./jellyOperator";
import type { Account } from "../account";
import type { GemStore } from "../gemPurchases";
import type { Menagerie } from "../menagerie";
import { TotalizerBonus, type Worship } from "../world-3/worship";
import type { Breeding } from "../world-4/breeding";
import type { Lab } from "../world-4/lab";
import type { Gaming } from "../world-5/gaming";
import type { Slab } from "../world-5/slab";
import { CropScientistBonusText, type Farming } from "../world-6/farming";
import type { Summoning } from "../world-6/summoning";
import type { Button } from "./button";
import type { Clamworks } from "./clamworks";
import type { DancingCoral } from "./dancingCoral";
import { getStampBonusForKey, type Stamp } from "../world-1/stamps";
import type { Arcade } from "../world-2/arcade";
import type { Hole } from "../world-5/hole/hole";
import type { Skilling } from "../skilling";
import type { Minehead } from "./minehead";
import type { ZenithMarket } from "./zenithShop";

const ELIXIR_EFFECT_QUANTITIES = [25, 1, 30, 1, 20, 60, 25, 30, 1, 1, 1, 0];
const GRAND_DISCOVERIES_PER_TUNNEL = 10;
const GRAND_DISCOVERY_UPGRADE_INDEX = 43;
const UNBOUNDED_UPGRADE_LEVEL = 99_999;

export interface SpelunkingUpgradeCostInputs {
    talentDiscount: number;
    mealDiscount: number;
    retention: number;
}

export interface SpelunkingPowerInputs {
    summoningWinnerBonus: number;
    sushiBonus: number;
    clamWorkReward: number;
    crucibleReward3: number;
    crucibleReward8: number;
    menagerieMultiplier: number;
    jellyObstruction38: number;
    jellyObstruction21: number;
    buttonBonus: number;
    meritLevel: number;
    gemPurchaseCount: number;
    companionBonus: number;
    dancingCoralBonus: number;
    cropScientistBonus: number;
    slabBonus: number;
    totalizerBonus: number;
    mealBonus: number;
    accountPowerBonus: number;
    stickerBonus: number;
    paletteBonus: number;
    exoticMarketBonus: number;
    cardLevel: number;
}

export interface SpelunkingAmberInputs {
    arcadeBonus: number;
    sushiBonus: number;
    cropScientistBonus: number;
    lampBonus: number;
    stampBonus: number;
    vialBonus: number;
    mealBonus: number;
    dancingCoralBonus: number;
    cardLevel: number;
    summoningWinnerBonus: number;
    masteryAmberPercent: number;
    loreEpilogueBonus: number;
    exoticMarketBonus: number;
}

export interface SpelunkingCharacterMetricInputs {
    masteryEfficiencyPercent: number;
    efficiencyStampBonus: number;
    efficiencyVialBonus: number;
    efficiencyBubbleBonus: number;
    zenithMarketBonus: number;
    jellyObstructionBonus: number;
    mineheadBonus: number;
    sushiBonus: number;
    coveBonus: number;
    grandTalentMultiplier: number;
}

export interface SpelunkingPlayerMetricInputs {
    playerID: number;
    playerName: string;
    skillLevel: number;
    allEfficiencyMultiplier: number;
    efficiencyTalentMultiplier: number;
    efficiencyCardBonus: number;
}

export interface CaveNodeHarvestOutcome {
    eligible: boolean;
    harvestChance: number;
    pagesPerDrop: number;
}

const NEUTRAL_CAVE_NODE_HARVEST: Readonly<CaveNodeHarvestOutcome> = Object.freeze({
    eligible: false,
    harvestChance: 0,
    pagesPerDrop: 0,
});

export class SpelunkingCharacterResults {
    playerName: string = "";
    skillLevel: number = 0;
    efficiency: number = 0;
    readonly grandDiscoveryChances: number[];
    readonly caveNodeHarvests: Readonly<CaveNodeHarvestOutcome>[];

    constructor(public readonly playerID: number, tunnels: readonly Tunnel[], chapters: readonly Chapter[]) {
        this.grandDiscoveryChances = tunnels.map(() => 0);
        this.caveNodeHarvests = chapters.map(() => NEUTRAL_CAVE_NODE_HARVEST);
    }
}

export class SpelunkingGrandDiscoveryResults {
    playerName: string = "";
    skillLevel: number = 0;
    readonly chances: number[];

    constructor(tunnels: readonly Tunnel[]) {
        this.chances = tunnels.map(() => 0);
    }
}

interface SpelunkingCaveNodeInputs {
    bubbleProwessMultiplier: number;
    mealProwessPercent: number;
}

interface SpelunkingPlayerCaveNodeInputs {
    playerID: number;
    starSignProwess: number;
}

const getLevelSquareSum = (start: number, count: number): number => {
    const squarePrefix = (level: number): number => level * (level + 1) * (2 * level + 1) / 6;
    return squarePrefix(start + count - 1) - squarePrefix(start - 1);
};

const getWeightedLevelPowerSum = (increment: number, start: number, count: number): number => {
    if (increment === 1) {
        return count * (10 + start) + count * (count - 1) / 2;
    }

    // Directly sum near-one powers to avoid cancellation in the closed form.
    if (Math.abs(increment - 1) < 1e-5) {
        let sum = 0;
        let power = 1;
        for (let offset = 0; offset < count; offset++) {
            sum += (10 + start + offset) * power;
            power *= increment;
        }
        return Math.pow(increment, start) * sum;
    }

    const power = Math.pow(increment, count);
    const geometricSum = (power - 1) / (increment - 1);
    const weightedOffsetSum = (increment - count * power + (count - 1) * power * increment)
        / Math.pow(1 - increment, 2);
    return Math.pow(increment, start) * ((10 + start) * geometricSum + weightedOffsetSum);
};

export class AmberDenomination {
    private readonly imageData: ImageData;

    constructor(
        public readonly tier: number,
        public readonly name: string,
        public readonly valueInBaseAmber: number,
        public readonly upgradeIndex?: number
    ) {
        // Keep each denomination's artwork in the same contain-fit frame as other Spelunking icons.
        this.imageData = Object.freeze({ location: `CaveAmber${tier}`, width: 50, height: 50 });
        Object.freeze(this);
    }

    getImageData(): ImageData {
        return this.imageData;
    }

    formatAmount(baseAmount: number): string {
        // Saved hauls stay in base Amber. All records use the account's current denomination, including zero.
        const amount = baseAmount / this.valueInBaseAmber;
        if (amount > 1e14) {
            return notateNumber(amount, "Big");
        }

        // The game's haul renderer uses rounded millions only above 1e9, not at that exact boundary.
        // Its Big branch makes the higher comma-notation suffixes unreachable here.
        if (amount > 1e9) {
            return `${commaNotation(amount / 1e6)}M`;
        }
        return commaNotation(amount);
    }
}

// Amber upgrades activate these account-wide units. Pink's actual conversion differs from its shop description.
const AMBER_DENOMINATIONS: readonly AmberDenomination[] = Object.freeze([
    new AmberDenomination(0, "Orange Amber", 1),
    new AmberDenomination(1, "Blue Amber", 1e3, 20),
    new AmberDenomination(2, "Green Amber", 1e9, 41),
    new AmberDenomination(3, "Red Amber", 1e21, 51),
    new AmberDenomination(4, "Pink Amber", 1e36, 66),
]);

export interface CollectionSummary {
    found: number;
    missing: number;
    capacity: number;
}

export interface NumberedGrandDiscovery {
    tunnelIndex: number;
    number: number;
    found: boolean;
}

export class Discovery {
    public found: boolean = false;

    // x1 is the object POW factor. x2 is object HP.
    // x3 is the Amber factor, not a fixed drop quantity.
    // x4 enables depth scaling. x5 is its multiplier. x6 is the minimum raw spawn depth.
    constructor(public index: number, public tunnelIndex: number, public data: SpelunkingDiscoveryModel) {
    }

    getImageData(): ImageData {
        const tunnelPrefix = this.tunnelIndex === 0
            ? "_"
            : String.fromCharCode("a".charCodeAt(0) + this.tunnelIndex - 1);
        // IconImage uses contain-fit within this logical frame, not the PNG's natural dimensions.
        return { location: `CaveRock${tunnelPrefix}${this.index}`, width: 50, height: 50 };
    }

    static fromBase(data: SpelunkingDiscoveryModel[], tunnelIndex: number): Discovery[] {
        return data.map((discovery, index) => new Discovery(index, tunnelIndex, discovery));
    }
}

export class Tunnel {
    public loreCompleted: boolean = false;
    // Records and spawn thresholds use raw depth.
    // Run depths and data.bossDepth use displayed depth: raw + 1.
    public bestDepth: number = 0;
    // Biggest haul is Amber kept after exit settlement, including the applicable toll or successful-exit bonus.
    // Destruction can reveal descent holes. Escape ropes allow safe exit, but attacking removes the rope.
    public biggestHaul: number = 0;
    public discoveries: Discovery[];
    public loreBoss: SpelunkingDiscoveryModel;
    public grandDiscoveries: NumberedGrandDiscovery[];

    constructor(
        public index: number,
        public data: SpelunkingTunnelModel,
        private spelunking: Spelunking,
        public accessLoreTunnel: Tunnel | undefined,
        public itemDrops: SpelunkingItemDropModel[]
    ) {
        const objects = data.discoveries;
        // The final object is the Lore boss. Its destruction records Lore, not an ordinary discovery.
        this.loreBoss = objects[objects.length - 1];
        this.discoveries = Discovery.fromBase(objects.slice(0, -1), index);
        this.grandDiscoveries = Array.from({ length: GRAND_DISCOVERIES_PER_TUNNEL }, (_, ordinal) => ({
            tunnelIndex: index,
            number: ordinal + 1,
            found: false,
        }));
    }

    getLoreBossImageData(): ImageData {
        // IconImage uses contain-fit within this logical frame, not the PNG's natural dimensions.
        return { location: `CaveBoss${this.index}`, width: 50, height: 50 };
    }

    get available(): boolean {
        return this.index < this.spelunking.availableTunnelCount;
    }

    get tunnelPowerFactor(): number {
        // Only the first object's x7 supplies the tunnel POW factor. Other x7 values are filler.
        return Number(this.data.discoveries[0].x7);
    }

    get finalDiscovery(): Discovery {
        return this.discoveries[this.discoveries.length - 1];
    }

    get discoveryCount(): number {
        return this.discoveries.reduce((found, discovery) => found + Number(discovery.found), 0);
    }

    get ordinarySummary(): CollectionSummary {
        const found = this.discoveryCount;
        const capacity = this.discoveries.length;
        return { found, missing: capacity - found, capacity };
    }

    get grandSummary(): CollectionSummary {
        const found = this.grandDiscoveries.reduce((total, discovery) => total + Number(discovery.found), 0);
        return { found, missing: GRAND_DISCOVERIES_PER_TUNNEL - found, capacity: GRAND_DISCOVERIES_PER_TUNNEL };
    }

    get grandEligible(): boolean {
        // First destruction records the final ordinary discovery. Each later Grand Discovery is twice as rare.
        return this.available
            && this.spelunking.grandDiscoveryUpgrade.unlocked
            && this.spelunking.grandDiscoveryUpgradeBonus >= 1
            && this.finalDiscovery.found
            && this.grandSummary.missing > 0;
    }

    parse(spelunkingData: unknown[][], discoveredNames: Set<string>): void {
        // Overwrite every saved field, including ownership, so missing or changed saves clear old progress.
        this.loreCompleted = Number(spelunkingData[0]?.[this.index] ?? 0) >= 1;
        this.bestDepth = Number(spelunkingData[1]?.[this.index] ?? 0);
        // Cloudsave serializes very large haul values as strings.
        this.biggestHaul = Number(spelunkingData[2]?.[this.index] ?? 0);
        this.discoveries.forEach(discovery => {
            discovery.found = discoveredNames.has(discovery.data.name);
        });

        const grandFoundCount = Number(spelunkingData[44]?.[this.index] ?? 0);
        this.grandDiscoveries.forEach((discovery, ordinal) => {
            discovery.found = grandFoundCount > ordinal;
        });
    }

    static fromBase(
        data: SpelunkingTunnelBase[],
        spelunking: Spelunking,
        itemDrops: SpelunkingItemDropModel[]
    ): Tunnel[] {
        const tunnels: Tunnel[] = [];
        // Future tunnel slots have no objects.
        data.filter(tunnel => tunnel.data.discoveries.length > 0).forEach(tunnel => {
            tunnels.push(new Tunnel(
                tunnel.index,
                tunnel.data,
                spelunking,
                tunnels[tunnels.length - 1],
                itemDrops.filter(drop => drop.tunnelIndex === tunnel.index)
            ));
        });
        return tunnels;
    }
}

export class ChapterBonus {
    level: number = 0;
    artifactBonus: number = 0;

    constructor(public index: number, public data: ChapterBonusModel) {}

    getBonus(): number {
        // Only marked Journal bonuses receive the Sailing artifact's multiplier.
        const multiplier = this.data.x3 === 1 ? 1 + this.artifactBonus / 100 : 1;
        return multiplier * lavaFunc(this.data.func, this.level, this.data.x1, this.data.x2);
    }

    getEffectLimit(): number | undefined {
        const multiplier = this.data.x3 === 1 ? 1 + this.artifactBonus / 100 : 1;
        if (this.data.func === "decay") {
            return this.data.x1 * multiplier;
        }
        if (this.data.func === "decayMulti") {
            return (1 + this.data.x1) * multiplier;
        }
        return undefined;
    }

    getProgressToEffectLimit(): number | undefined {
        if (this.data.func === "decay" || this.data.func === "decayMulti") {
            return this.level / (this.level + this.data.x2);
        }
        return undefined;
    }
}

export class Chapter {
    bonuses: ChapterBonus[];
    chestPageStacks: Item[] = [];
    playerPageStacks: Item[][] = [];

    constructor(
        public index: number,
        public data: SpelunkingChapterModel,
        public pageItem: Item,
        public gatheringSource: EnemyData
    ) {
        this.bonuses = data.bonuses.map((bonus, index) => new ChapterBonus(index, bonus));
    }

    get name(): string {
        return this.data.name;
    }

    parse(savedLevels: (number | string)[]): void {
        // Three-bonus chapters still occupy four saved Journal slots.
        this.bonuses.forEach(bonus => {
            bonus.level = Number(savedLevels[4 * this.index + bonus.index] ?? 0);
        });
    }

    prepareArtifactBonus(artifactBonus: number): void {
        this.bonuses.forEach(bonus => { bonus.artifactBonus = artifactBonus; });
    }

    preparePageStacks(storage: Storage): void {
        // Retain Storage's individual stacks; pooled pages do not establish read eligibility.
        this.chestPageStacks = storage.chest.filter(item => item.internalName === this.pageItem.internalName);
        this.playerPageStacks = storage.playerStorage.map(
            inventory => inventory.filter(item => item.internalName === this.pageItem.internalName)
        );
    }

    static fromBase(data: SpelunkingChapterBase[], allItems: Item[]): Chapter[] {
        return data.flatMap(chapter => {
            const pageItem = allItems.find(item => item.internalName === `Spelunking${chapter.index}`)!;
            const gatheringSource = EnemyInfo.find(enemy =>
                enemy.details.AFKtype === AFKTypeEnum.Spelunking
                && pageItem.sources.sources?.some(source => source.txtName === enemy.details.Name)
            );
            if (!gatheringSource) return [];
            return [new Chapter(chapter.index, chapter.data, pageItem, gatheringSource)];
        });
    }
}

interface StaminaMaximumInputs {
    upgrade4: number;
    upgrade5: number;
    trackometerStamina: number;
    meritStamina: number;
    companion: number;
    chapterStamina: number;
    masteryStamina: number;
    chapterSpecialty: number;
    highestSpecialty: number;
    fishAdvice: number;
}

export class SpelunkingStamina {
    current: number = 0;
    maximum: number = 0;

    constructor(public playerID: number) {}

    getImageData(): ImageData {
        return { location: 'CaveShopUpg4', width: 34, height: 34 };
    }

    parse(savedStamina: (number | string)[]): void {
        this.current = Number(savedStamina[this.playerID] ?? 0);
    }

    prepareMaximum(skillLevel: number, inputs: StaminaMaximumInputs): void {
        const level = Math.max(0, skillLevel);
        // Journal Specialty and the talent add flat stamina despite their percentage descriptions.
        const base = 14 + level + inputs.upgrade4 * Math.floor(level / 10)
            + inputs.chapterStamina + inputs.masteryStamina
            + inputs.upgrade5 + inputs.chapterSpecialty + inputs.highestSpecialty;
        // Trackometer, merit and the companion's flat stamina stay outside both multipliers.
        this.maximum = Math.floor(
            inputs.trackometerStamina + inputs.meritStamina + 10 * inputs.companion
            + base * (1 + inputs.fishAdvice / 100) * (1 + inputs.companion / 100)
        );
    }

    getHoursUntilFull(hourlyRecharge: number): number {
        return Math.max(0, this.maximum - this.current) / hourlyRecharge;
    }
    get eligibleForTeam(): boolean {
        return this.current >= this.maximum / 2;
    }
}

export interface UpgradeSourceBonusInputs {
    spelunkingSkillLevelTotal: number;
    ordinaryDiscoveryCount: number;
    bestDepthTotal: number;
    biggestHaulDigitTotal: number;
    grandDiscoveryCount: number;
    manicTotalDepth: number;
    trackometerLevel: number;
}

export class Upgrade {
    public level: number = -1;
    public sourceBonus: number = 0;
    public nextCost!: number;
    public costToMax!: number | undefined;
    public costNext10!: number;
    private costInputs!: SpelunkingUpgradeCostInputs;

    get remainingCap(): number | undefined {
        return this.data.maxLevel === UNBOUNDED_UPGRADE_LEVEL
            ? undefined
            : Math.max(0, this.data.maxLevel - this.level);
    }


    constructor(public index: number, public data: SpelunkingUpgradeModel) {
    }
    get purchasedLevel(): number {
        return Math.max(0, this.level);
    }

    get unlocked(): boolean {
        return this.level !== -1;
    }

    parse(savedLevel: number | string | undefined): void {
        this.level = Number(savedLevel ?? -1);
        this.sourceBonus = this.getBonus();
    }

    getBonus(): number {
        return this.data.bonusPerLevel * this.purchasedLevel;
    }
    prepareCostQuotes(inputs: SpelunkingUpgradeCostInputs): void {
        this.costInputs = inputs;
        this.nextCost = this.getCost();
        this.costToMax = this.getCostToMax();
        this.costNext10 = this.getCostForNextNLevels();
    }

    getCost(level: number = this.level): number {
        const factor = this.getCostFactor(level, this.costInputs);
        if (level === -1) {
            return factor;
        }
        return 0.25 * factor * Math.pow(this.data.costIncrement, level)
            + Math.pow(level, 2) + 5 * level;
    }

    getCostForNextNLevels(levelCount: number = 10): number {
        const remainingCap = this.remainingCap;
        const purchaseCount = remainingCap === undefined
            ? Math.max(0, levelCount)
            : Math.min(Math.max(0, levelCount), remainingCap);
        let total = 0;
        for (let offset = 0; offset < purchaseCount; offset++) {
            total += this.getCost(this.level + offset);
        }
        return total;
    }

    getCostToMax(): number | undefined {
        const remainingCap = this.remainingCap;
        if (remainingCap === undefined) {
            return undefined;
        }
        if (remainingCap === 0) {
            return 0;
        }

        let total = 0;
        let firstLevel = this.level;
        let normalLevelCount = remainingCap;
        if (this.level === -1) {
            total = this.getCost(-1);
            firstLevel = 0;
            normalLevelCount--;
        }
        if (normalLevelCount === 0) {
            return total;
        }

        const increment = this.data.costIncrement;
        const weightedLevels = getWeightedLevelPowerSum(increment, firstLevel, normalLevelCount);
        const levelSum = normalLevelCount * (2 * firstLevel + normalLevelCount - 1) / 2;
        const levelSquareSum = getLevelSquareSum(firstLevel, normalLevelCount);
        const factor = this.getCostBaseFactor(this.costInputs);
        return total + 0.25 * factor * weightedLevels + levelSquareSum + 5 * levelSum;
    }

    private getCostFactor(level: number, inputs: SpelunkingUpgradeCostInputs): number {
        let factor = inputs.talentDiscount * inputs.mealDiscount * (10 + level) * this.data.costBase
            * inputs.retention * Math.pow(9.5, this.data.column) * Math.pow(6.3, this.data.x2);
        if (this.index >= 52) {
            factor *= 1e7;
        }
        if (this.index >= 66) {
            factor *= 1e9;
        }
        return factor;
    }

    private getCostBaseFactor(inputs: SpelunkingUpgradeCostInputs): number {
        let factor = inputs.talentDiscount * inputs.mealDiscount * this.data.costBase * inputs.retention
            * Math.pow(9.5, this.data.column) * Math.pow(6.3, this.data.x2);
        if (this.index >= 52) {
            factor *= 1e7;
        }
        if (this.index >= 66) {
            factor *= 1e9;
        }
        return factor;
    }

    updateSourceBonus(inputs: UpgradeSourceBonusInputs): void {
        const ownedBonus = this.getBonus();
        this.sourceBonus = ownedBonus;
        switch (this.index) {
            case 0:
                this.sourceBonus = ownedBonus * inputs.spelunkingSkillLevelTotal;
                break;
            case 1:
            case 10:
                this.sourceBonus = ownedBonus * (1 + 5 * inputs.ordinaryDiscoveryCount / 100);
                break;
            case 2:
                this.sourceBonus = ownedBonus * (2 + inputs.bestDepthTotal / 100);
                break;
            case 3:
                this.sourceBonus = ownedBonus * (1 + 3 * inputs.biggestHaulDigitTotal / 100);
                break;
            case 7:
                this.sourceBonus = 15 + ownedBonus / (250 + ownedBonus) * 45;
                break;
            case 8:
                this.sourceBonus = ownedBonus * (1 + inputs.spelunkingSkillLevelTotal / 100);
                break;
            case 9:
                this.sourceBonus = ownedBonus * (1 + inputs.bestDepthTotal / 100);
                break;
            case 19:
                this.sourceBonus = Math.max(10, 50 - ownedBonus);
                break;
            case 25:
                this.sourceBonus = 1 + ownedBonus;
                break;
            case 38:
                this.sourceBonus = 20 + ownedBonus;
                break;
            case 44:
            case 45:
            case 46:
                this.sourceBonus = ownedBonus * inputs.grandDiscoveryCount;
                break;
            case 54:
            case 55:
            case 56:
                this.sourceBonus = this.getEffectiveBonus(inputs.manicTotalDepth, inputs.trackometerLevel);
                break;
            case 59:
            case 60:
            case 61:
                this.sourceBonus = this.getEffectiveBonus(inputs.manicTotalDepth, inputs.trackometerLevel);
                break;
        }
    }

    getEffectiveBonus(manicTotalDepth: number, trackometerLevel: number): number {
        const bonus = this.getBonus();
        if (this.index >= 54 && this.index <= 56) {
            return bonus * (1 + 5 * manicTotalDepth / 100);
        }
        if (this.index >= 59 && this.index <= 61) {
            return bonus * trackometerLevel;
        }
        return bonus;
    }

    static fromBase = (data: SpelunkingUpgradeBase[]): Upgrade[] => {
        return data.map(upgrade => new Upgrade(upgrade.index, upgrade.data));
    }
}

export class SpelunkingTool {
    constructor(public index: number, public data: SpelunkingToolBase["data"]) {
    }

    isUnlocked(getUpgradeBonus: (index: number) => number): boolean {
        const unlock = this.data.unlock;
        if (unlock.kind === "default") {
            return true;
        }
        if (unlock.kind !== "upgrade" || unlock.upgradeIndex === undefined) {
            return false;
        }
        return getUpgradeBonus(unlock.upgradeIndex) >= (unlock.minimumBonus ?? 0);
    }

    static fromBase = (data: SpelunkingToolBase[]): SpelunkingTool[] =>
        data.map(tool => new SpelunkingTool(tool.index, tool.data));
}

interface SpelunkingElixirUpgradeBonuses {
    owned: number;
    equipmentSlots: number;
    duplicates: number;
    memorizedSlots: number;
    consumptionReduction: number;
}

export class SpelunkingElixirs {
    records: SpelunkingElixirBase[] = [];
    descriptions: string[] = [];
    equippedSlots: number[] = [];
    memorizedIndices: number[] = [];
    ownedCount: number = 0;
    slotLimit: number = 1;
    duplicateLimit: number = 0;
    memorizeLimit: number = 0;
    private upgradeConsumptionReduction: number = 0;
    private chapterConsumptionReduction: number = 0;

    get consumptionReduction(): number {
        return Math.min(0.6, (this.upgradeConsumptionReduction + this.chapterConsumptionReduction) / 100);
    }

    getImageData(index: number): ImageData {
        return { location: `CaveElix${index}`, width: 46, height: 46 };
    }

    init(): void {
        this.records = initSpelunkingElixirRepo();
        this.descriptions = this.records.map((record, index) =>
            record.data.description.replace("{", String(ELIXIR_EFFECT_QUANTITIES[index]))
        );
        this.equippedSlots = [];
        this.memorizedIndices = [];
        this.ownedCount = 0;
        this.slotLimit = 1;
        this.duplicateLimit = 0;
        this.memorizeLimit = 0;
        this.upgradeConsumptionReduction = 0;
        this.chapterConsumptionReduction = 0;
    }

    parse(equippedSlots: (number | string)[], memorizedIndices: (number | string)[],
        upgradeBonuses: SpelunkingElixirUpgradeBonuses): void {
        this.equippedSlots = Array.from({ length: 5 }, (_, index) => Number(equippedSlots[index] ?? -1));
        this.memorizedIndices = memorizedIndices.map(index => Number(index));
        this.ownedCount = Math.round(Math.min(12, upgradeBonuses.owned));
        this.slotLimit = Math.round(Math.min(5, 1 + upgradeBonuses.equipmentSlots));
        this.duplicateLimit = Math.round(Math.min(5, upgradeBonuses.duplicates));
        this.memorizeLimit = Math.round(upgradeBonuses.memorizedSlots);
        this.upgradeConsumptionReduction = upgradeBonuses.consumptionReduction;
        this.chapterConsumptionReduction = 0;
    }

    prepareChapterConsumptionReduction(chapterBonus: number): void {
        this.chapterConsumptionReduction = chapterBonus;
    }
}

export class SpelunkingManic {
    unlocked: boolean = false;
    enabled: boolean = false;
    depthByTunnel: number[] = [];
    readonly staminaCostMultiplier: number = 30;
    private powerBonusValue: number = 0;
    private grandDiscoveryChanceBonusValue: number = 0;
    private efficiencyBonusValue: number = 0;

    get powerBonus(): number {
        return this.powerBonusValue;
    }

    get grandDiscoveryChanceBonus(): number {
        return this.grandDiscoveryChanceBonusValue;
    }

    get efficiencyBonus(): number {
        return this.efficiencyBonusValue;
    }

    get totalDepth(): number {
        return this.depthByTunnel.reduce((total, depth) => Math.round(total + depth), 0);
    }

    parse(enabled: number | string | undefined, depthByTunnel: (number | string)[], unlocked: boolean): void {
        this.enabled = Number(enabled ?? 0) === 1;
        this.depthByTunnel = depthByTunnel.map(depth => Number(depth));
        this.unlocked = unlocked;
    }

    prepareUpgradeBonuses(powerBonus: number, grandDiscoveryChanceBonus: number, efficiencyBonus: number): void {
        this.powerBonusValue = powerBonus;
        this.grandDiscoveryChanceBonusValue = grandDiscoveryChanceBonus;
        this.efficiencyBonusValue = efficiencyBonus;
    }
}

export type OverstimNextLevelEstimate =
    | { status: 'estimated'; hours: number }
    | { status: 'locked' | 'unavailable' | 'ready' | 'pending-update' };

export class SpelunkingOverstim {
    unlocked: boolean = false;
    level: number = 0;
    fill: number = 0;
    fillBonusPercent: number = 0;
    potentialFillPerHour: number = 0;
    nextLevelEstimate: OverstimNextLevelEstimate = { status: 'unavailable' };

    get remainingFill(): number {
        return Math.max(0, this.threshold - this.fill);
    }

    get threshold(): number {
        return 100 * Math.pow(1.3, this.level);
    }

    get bonusPerLevel(): number {
        return 30 + this.upgradeBonus;
    }

    get bonus(): number {
        return this.bonusPerLevel * this.level;
    }

    get amberMultiplier(): number {
        return 1 + this.upgradeBonus * this.bonus / 100;
    }

    private upgradeBonus: number = 0;

    parse(level: number | string | undefined, fill: number | string | undefined, upgradeBonus: number): void {
        this.level = Number(level ?? 0);
        this.fill = Number(fill ?? 0);
        this.upgradeBonus = upgradeBonus;
        this.unlocked = upgradeBonus >= 1;
        this.fillBonusPercent = 0;
        this.potentialFillPerHour = 0;
        this.nextLevelEstimate = { status: 'unavailable' };
    }

    preparePotentialFillRate(fillBonusPercent: number, totalHourlyRecharge: number): void {
        this.fillBonusPercent = fillBonusPercent;
        this.potentialFillPerHour = this.unlocked
            ? totalHourlyRecharge * (1 + fillBonusPercent / 100)
            : 0;
    }

    prepareNextLevelEstimate(stamina: readonly SpelunkingStamina[], hourlyRecharge: number): void {
        this.nextLevelEstimate = { status: 'unavailable' };
        if (!this.unlocked) {
            this.nextLevelEstimate = { status: 'locked' };
            return;
        }

        let remainingFill = this.remainingFill;
        if (remainingFill <= 0) {
            this.nextLevelEstimate = { status: 'ready' };
            return;
        }

        const fillMultiplier = 1 + this.fillBonusPercent / 100;
        // Saved excess transfers once on a qualifying game update, even without more recharge.
        for (const characterStamina of stamina) {
            remainingFill -= fillMultiplier * Math.max(0, characterStamina.current - characterStamina.maximum);
        }
        if (remainingFill <= 0) {
            this.nextLevelEstimate = { status: 'pending-update' };
            return;
        }
        if (stamina.length === 0 || hourlyRecharge <= 0) {
            return;
        }

        const fullStaminaTimes = stamina
            .map(characterStamina => characterStamina.getHoursUntilFull(hourlyRecharge))
            .sort((left, right) => left - right);
        let elapsedHours = 0;
        let activeFillPerHour = 0;
        for (const fullStaminaTime of fullStaminaTimes) {
            const intervalFill = activeFillPerHour * (fullStaminaTime - elapsedHours);
            if (activeFillPerHour > 0 && remainingFill <= intervalFill) {
                this.nextLevelEstimate = {
                    status: 'estimated',
                    hours: elapsedHours + remainingFill / activeFillPerHour,
                };
                return;
            }
            remainingFill -= intervalFill;
            elapsedHours = fullStaminaTime;
            activeFillPerHour += fillMultiplier * hourlyRecharge;
        }

        this.nextLevelEstimate = {
            status: 'estimated',
            hours: elapsedHours + remainingFill / activeFillPerHour,
        };
    }
}

export class SpelunkingTrackometer {
    level: number = 0;
    fill: number = 0;
    unlocked: boolean = false;
    private staminaExpBonusValue: number = 0;
    private amberBonusValue: number = 0;
    private maxStaminaBonusValue: number = 0;

    get staminaExpBonus(): number {
        return this.staminaExpBonusValue;
    }

    get amberBonus(): number {
        return this.amberBonusValue;
    }

    get maxStaminaBonus(): number {
        return this.maxStaminaBonusValue;
    }

    get threshold(): number {
        return 1000 * Math.pow(1.5, this.level);
    }

    parse(level: number | string | undefined, fill: number | string | undefined, unlocked: boolean): void {
        this.level = Number(level ?? 0);
        this.fill = Number(fill ?? 0);
        this.unlocked = unlocked;
    }

    prepareUpgradeBonuses(staminaExpBonus: number, amberBonus: number, maxStaminaBonus: number): void {
        this.staminaExpBonusValue = staminaExpBonus;
        this.amberBonusValue = amberBonus;
        this.maxStaminaBonusValue = maxStaminaBonus;
    }
}

export class SpelunkingAutomaticToolUse {
    fullClearSetting: boolean = false;
    eligible: boolean = false;

    parse(fullClearSetting: number | string | undefined, accountProgress: number | string | undefined,
        autoButtonBonus: number, gemPurchaseCount: number | string | undefined): void {
        this.fullClearSetting = Number(fullClearSetting ?? 0) === 1;
        this.eligible = (autoButtonBonus >= 1 || Number(gemPurchaseCount ?? 0) > 0)
            && Number(accountProgress ?? 0) >= 15;
    }
}

interface RechargeContributor {
    source: string;
    value: number;
}

export class Spelunking extends Domain {
    tunnels: Tunnel[] = []
    chapters: Chapter[] = []
    upgrades: Upgrade[] = []
    tools: SpelunkingTool[] = [];
    elixirs: SpelunkingElixirs = new SpelunkingElixirs();
    manic: SpelunkingManic = new SpelunkingManic();
    overstim: SpelunkingOverstim = new SpelunkingOverstim();
    trackometer: SpelunkingTrackometer = new SpelunkingTrackometer();
    automaticToolUse: SpelunkingAutomaticToolUse = new SpelunkingAutomaticToolUse();
    stamina: SpelunkingStamina[] = []
    persistentPower: number = 1;
    savedAmberGainMultiplier: number = 1;
    characters: SpelunkingCharacterResults[] = [];
    grandDiscovery: SpelunkingGrandDiscoveryResults = new SpelunkingGrandDiscoveryResults([]);
    dailyReadLimit: number = 5;
    dailyReadsUsed: number = 0;
    readonly baseHourlyRecharge: number = 5;
    additiveRechargeContributors: RechargeContributor[] = [];
    rechargeMultiplierContributors: RechargeContributor[] = [];
    private rechargeSourceContributors!: {
        additive: {
            upgrade: RechargeContributor;
            alchemyBubble: RechargeContributor;
            chapterThree: RechargeContributor;
            chapterSix: RechargeContributor;
            skillMastery: RechargeContributor;
            card: RechargeContributor;
        };
        multiplier: {
            meritocracy: RechargeContributor;
            legendTalent: RechargeContributor;
            royalArmory: RechargeContributor;
            sushi: RechargeContributor;
        };
    };
    hourlyRecharge: number = this.baseHourlyRecharge;
    private mineheadDepthChargeCellLevel = 0;

    getMineheadDepthChargeCellLevel(): number {
        return this.mineheadDepthChargeCellLevel;
    }
    get trackometerLevel(): number {
        return this.trackometer.level;
    }

    set trackometerLevel(level: number) {
        this.trackometer.level = level;
    }

    get dailyReadsRemaining(): number {
        return Math.max(0, this.dailyReadLimit - this.dailyReadsUsed);
    }

    getHoursUntilAllFull(): number {
        let hoursUntilAllFull = 0;
        for (const stamina of this.stamina) {
            hoursUntilAllFull = Math.max(hoursUntilAllFull, stamina.getHoursUntilFull(this.hourlyRecharge));
        }
        return hoursUntilAllFull;
    }

    ownedAmber: number = 0;
    exaltedStampFragments: number = 0;
    prismaBubblesFound: number = 0;
    exaltDropChanceDenominator: number = 60;
    prismaDropChanceDenominator: number = 100;
    deepPocketsMultiplier: number = 1;
    spelunkingSkillLevelTotal: number = 0;
    bestDepthTotal: number = 0;
    biggestHaulDigitTotal: number = 0;
    grandDiscoveryCount: number = 0;
    grandDiscoveryUpgrade!: Upgrade;
    ownedEpilogueCount: number = 0;
    private readonly researchExpEpilogue = initTomeEpilogueBonusRepo().find(bonus => bonus.index === 7)!;
    amber!: SpelunkingRewardLabelModel;
    // Destruction rewards are not discoveries or fixed drops. Bling bags only present the generated loot.
    sharedDestructionDrops: {
        data: SpelunkingRewardLabelModel;
        itemDrop?: SpelunkingItemDropModel;
        unlockUpgrade?: Upgrade;
    }[] = [];

    get currentAmberDenomination(): AmberDenomination {
        // The highest active unit applies to every haul, regardless of the recorded amount.
        for (let index = AMBER_DENOMINATIONS.length - 1; index > 0; index--) {
            const denomination = AMBER_DENOMINATIONS[index];
            if (denomination.upgradeIndex !== undefined && this.getUpgradeBonus(denomination.upgradeIndex) >= 1) {
                return denomination;
            }
        }
        return AMBER_DENOMINATIONS[0];
    }

    get bestUnlockedTool(): SpelunkingTool {
        let bestTool = this.tools[0];
        for (const tool of this.tools) {
            if (tool.index <= 4 && tool.isUnlocked(index => this.getUpgradeBonus(index))) {
                bestTool = tool;
            }
        }
        return bestTool;
    }

    get availableTunnelCount(): number {
        let availableCount = 1;
        // The highest scanned Lore completion grants access. The final released tunnel cannot unlock another.
        for (let position = 0; position < this.tunnels.length - 1; position++) {
            const tunnel = this.tunnels[position];
            if (tunnel.loreCompleted) {
                availableCount = Math.max(availableCount, tunnel.index + 2);
            }
        }
        return availableCount;
    }

    get grandDiscoveryUpgradeBonus(): number {
        // The effective Grand gate uses purchased levels, which clamp negative saved levels to zero.
        return this.grandDiscoveryUpgrade.data.bonusPerLevel * this.grandDiscoveryUpgrade.purchasedLevel;
    }


    get ordinarySummary(): CollectionSummary {
        const found = this.getTotalDiscoveries();
        const capacity = this.tunnels.reduce((total, tunnel) => total + tunnel.discoveries.length, 0);
        return { found, missing: capacity - found, capacity };
    }

    get grandSummary(): CollectionSummary {
        const found = this.tunnels.reduce((total, tunnel) => total + tunnel.grandSummary.found, 0);
        const capacity = this.tunnels.length * GRAND_DISCOVERIES_PER_TUNNEL;
        return { found, missing: capacity - found, capacity };
    }

    getDeepestDelveDepth(): number {
        return Math.max(0, ...this.tunnels.map(tunnel => tunnel.bestDepth));
    }

    getBiggestDelveHaul(): number {
        return Math.max(0, ...this.tunnels.map(tunnel => tunnel.biggestHaul));
    }

    getTotalShopUpgradeLevels(): number {
        return this.upgrades.reduce((total, upgrade) => total + Math.max(0, upgrade.level), 0);
    }

    getUpgradeBonus(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index === index)?.getBonus() ?? 0;
    }
    prepareUpgradePrices(inputs: SpelunkingUpgradeCostInputs): void {
        for (const upgrade of this.upgrades) {
            upgrade.prepareCostQuotes(inputs);
        }
    }

    canAffordUpgrade(upgrade: Upgrade, cost?: number): boolean {
        const quote = cost ?? upgrade.nextCost;
        return this.ownedAmber >= quote;
    }

    getTotalDiscoveries(): number {
        return this.tunnels.reduce((total, tunnel) => total + tunnel.discoveryCount, 0);
    }

    getResearchExpEpilogueBonus(tome: Tome, grimoire: Grimoire, equipmentSets: EquipmentSets): number {
        const epilogue = this.researchExpEpilogue;
        if (!(this.ownedEpilogueCount > epilogue.index)) {
            return 0;
        }

        const score = tome.getHighestScore();
        const grimoireBonus = grimoire.getUpgradeBonus(17);
        const trollSetBonus = equipmentSets.getSetBonus("TROLL_SET", true);
        const scoreBlocks = Math.floor(Math.max(0, score - epilogue.data.x1) / 100);
        const scorePower = Math.pow(scoreBlocks, 0.7);
        return (1 + (grimoireBonus + trollSetBonus) / 100)
            * epilogue.data.x0 * Math.max(0, scorePower / (25 + scorePower));
    }

    getRawKeys(): RawData[] {
        // Account slot 410 records successful Journal reads in the saved daily period.
        return [
            { key: "Spelunk", perPlayer: false, default: [] },
            { key: "OptLacc", perPlayer: false, default: [] },
            { key: "GemItemsPurchased", perPlayer: false, default: [] },
        ]
    }


    /** Prepare neutral catalogue state before save parsing; calculation updates replace account-derived values. */
    init(allItems: Item[], charCount: number, repositories: StaticRepositories) {
        this.persistentPower = 1;
        this.savedAmberGainMultiplier = 1;
        this.chapters = Chapter.fromBase(initSpelunkingChapterRepo(), allItems);
        this.upgrades = Upgrade.fromBase(initSpelunkingUpgradeRepo());
        this.tools = SpelunkingTool.fromBase(initSpelunkingToolRepo());
        this.elixirs.init();
        this.manic = new SpelunkingManic();
        this.overstim = new SpelunkingOverstim();
        this.trackometer = new SpelunkingTrackometer();
        this.automaticToolUse = new SpelunkingAutomaticToolUse();
        const metadata = initSpelunkingMetadataRepo()[0].data;
        this.amber = metadata.rewardLabels.find(label => label.dropCode === "_")!;
        this.sharedDestructionDrops = metadata.rewardLabels
            .filter(label => label.dropCode !== "_" && !metadata.itemDrops.some(
                drop => drop.dropCode === label.dropCode && drop.tunnelIndex !== undefined
            ))
            .map(label => {
                // Non-item rewards can genuinely lack item and shop-gate metadata.
                const itemDrop = metadata.itemDrops.find(drop => drop.dropCode === label.dropCode);
                return {
                    data: label,
                    itemDrop,
                    unlockUpgrade: itemDrop?.unlockUpgradeIndex !== undefined
                        ? this.upgrades[itemDrop.unlockUpgradeIndex]
                        : undefined,
                };
            });
        this.grandDiscoveryUpgrade = this.upgrades[GRAND_DISCOVERY_UPGRADE_INDEX];
        this.tunnels = Tunnel.fromBase(initSpelunkingTunnelRepo(), this, metadata.itemDrops);
        this.stamina = Array.from({ length: charCount }, (_, playerID) => new SpelunkingStamina(playerID));
        this.resetCharacterMetrics();
        this.dailyReadLimit = 5;
        this.dailyReadsUsed = 0;
        const bubble = repositories.get("Bubble")
            .flatMap(cauldron => cauldron.data.bubbles)
            .find(entry => entry.bonusKey === "Y11")!;
        const upgradeFiveName = repositories.get("SpelunkingUpgrade")
            .find(upgrade => upgrade.index === 5)!.data.name;
        const chapterThreePage = this.chapters[2].pageItem.displayName;
        const chapterSixPage = this.chapters[5].pageItem.displayName;
        const rechargeCard = repositories.get("EnemyDetails")
            .find(enemy => enemy.id === "w7a10")!.data.Name;
        const contributors = {
            additive: {
                upgrade: { source: upgradeFiveName, value: 0 },
                alchemyBubble: { source: bubble.name, value: 0 },
                chapterThree: { source: chapterThreePage, value: 0 },
                chapterSix: { source: chapterSixPage, value: 0 },
                skillMastery: { source: SkillMastery.displayName, value: 0 },
                card: { source: rechargeCard, value: 0 },
            },
            multiplier: {
                meritocracy: {
                    source: repositories.get("MeritocratyBonus").find(bonus => bonus.index === 17)!.data.text,
                    value: 1,
                },
                legendTalent: {
                    source: repositories.get("LegendTalents").find(talent => talent.index === 30)!.data.name,
                    value: 1,
                },
                royalArmory: {
                    source: repositories.get("RoyalArmoryUpgrade").find(upgrade => upgrade.index === 79)!.data.name,
                    value: 1,
                },
                sushi: {
                    source: repositories.get("Sushi").find(entry => entry.index === 11)!.data.name,
                    value: 1,
                },
            },
        };
        this.rechargeSourceContributors = contributors;
        this.additiveRechargeContributors = [
            contributors.additive.upgrade,
            contributors.additive.alchemyBubble,
            contributors.additive.chapterThree,
            contributors.additive.chapterSix,
            contributors.additive.skillMastery,
            contributors.additive.card,
        ];
        this.rechargeMultiplierContributors = [
            contributors.multiplier.meritocracy,
            contributors.multiplier.legendTalent,
            contributors.multiplier.royalArmory,
            contributors.multiplier.sushi,
        ];
        this.hourlyRecharge = this.baseHourlyRecharge;
        this.trackometerLevel = 0;
        this.trackometer.fill = 0;
        this.trackometer.unlocked = false;
        this.ownedAmber = 0;
        this.exaltedStampFragments = 0;
        this.prismaBubblesFound = 0;
        this.exaltDropChanceDenominator = 60;
        this.prismaDropChanceDenominator = 100;
        this.deepPocketsMultiplier = 1;
        this.spelunkingSkillLevelTotal = 0;
        this.bestDepthTotal = 0;
        this.biggestHaulDigitTotal = 0;
        this.grandDiscoveryCount = 0;
        this.ownedEpilogueCount = 0;
        this.prepareUpgradeBonuses();
        this.prepareUpgradePrices({ talentDiscount: 1, mealDiscount: 1, retention: 1 });
        return this;
    }

    parse(data: Map<string, unknown>): void {
        const spelunking = data.get(this.getDataKey()) as Spelunking;
        spelunking.persistentPower = 1;
        spelunking.savedAmberGainMultiplier = 1;
        const charCount = data.get("charCount") as number;
        spelunking.stamina = Array.from({ length: charCount }, (_, playerID) =>
            spelunking.stamina.find(stamina => stamina.playerID === playerID) ?? new SpelunkingStamina(playerID)
        );
        spelunking.resetCharacterMetrics();
        const spelunkingData = (data.get("Spelunk") ?? []) as unknown[][];
        spelunking.mineheadDepthChargeCellLevel = Number((spelunkingData[18] as unknown[] | undefined)?.[40] ?? 0);
        const savedStamina = (spelunkingData[3] ?? []) as (number | string)[];
        const currencies = (spelunkingData[4] ?? []) as (number | string)[];
        const shopUpgradeLevels = (spelunkingData[5] ?? []) as (number | string)[];
        const savedChapterLevels = (spelunkingData[8] ?? []) as (number | string)[];
        const accountOptions = (data.get("OptLacc") ?? []) as (number | string)[];
        const gemPurchases = (data.get("GemItemsPurchased") ?? []) as (number | string)[];
        spelunking.dailyReadsUsed = Number(accountOptions[410] ?? 0);
        spelunking.trackometerLevel = Number(currencies[8] ?? 0);
        spelunking.chapters.forEach(chapter => chapter.parse(savedChapterLevels));
        spelunking.ownedEpilogueCount = Number(spelunkingData[13]?.[2] ?? 0);
        const discoveredNames = new Set(
            (spelunkingData[6] ?? []).map(discovery => String(discovery).replace(/_/g, " ").trim())
        );

        spelunking.tunnels.forEach(tunnel => tunnel.parse(spelunkingData, discoveredNames));
        spelunking.stamina.forEach(stamina => stamina.parse(savedStamina));
        // Missing shop slots stay locked. Every parse replaces levels; unlocked derives from the saved sentinel.
        spelunking.upgrades.forEach(upgrade => upgrade.parse(shopUpgradeLevels[upgrade.index]));
        spelunking.automaticToolUse.parse(
            accountOptions[538], accountOptions[478], spelunking.getUpgradeBonus(12), gemPurchases[43]
        );
        spelunking.elixirs.parse(
            (spelunkingData[7] ?? []) as (number | string)[],
            (spelunkingData[48] ?? []) as (number | string)[],
            {
                owned: spelunking.getUpgradeBonus(23),
                equipmentSlots: spelunking.getUpgradeBonus(24),
                duplicates: spelunking.getUpgradeBonus(25),
                memorizedSlots: spelunking.getUpgradeBonus(57),
                consumptionReduction: spelunking.getUpgradeBonus(26),
            }
        );
        spelunking.manic.parse(
            spelunkingData[4]?.[10] as number | string | undefined,
            (spelunkingData[47] ?? []) as (number | string)[],
            spelunking.getUpgradeBonus(53) >= 1
        );
        spelunking.overstim.parse(
            currencies[1], currencies[2], spelunking.getUpgradeBonus(6)
        );
        spelunking.trackometer.parse(
            currencies[8], currencies[9], spelunking.getUpgradeBonus(59) >= 1
        );
        spelunking.ownedAmber = Number(currencies[0] ?? 0);
        spelunking.exaltedStampFragments = Number(currencies[3] ?? 0);
        spelunking.prismaBubblesFound = Number(currencies[4] ?? 0);
        spelunking.exaltDropChanceDenominator = 60 * Math.pow(8, spelunking.exaltedStampFragments)
            / (1 + spelunking.getUpgradeBonus(27) / 100);
        spelunking.prismaDropChanceDenominator = 100 * Math.pow(1.5, spelunking.prismaBubblesFound)
            / (1 + spelunking.getUpgradeBonus(28) / 100);
    }

    /**
     * Calculate normal-world account POW without tutorial overrides or active delve elixirs.
     * Equipped elixir slots do not establish active effects, so run-local multipliers stay neutral.
     */
    calculatePersistentPower(inputs: SpelunkingPowerInputs): void {
        const upgrade0 = this.upgrades[0].sourceBonus;
        const upgrade1 = this.upgrades[1].sourceBonus;
        const upgrade2 = this.upgrades[2].sourceBonus;
        const upgrade3 = this.upgrades[3].sourceBonus;
        const upgrade14 = this.upgrades[14].sourceBonus;
        const upgrade15 = this.upgrades[15].sourceBonus;
        const upgrade16 = this.upgrades[16].sourceBonus;
        const upgrade17 = this.upgrades[17].sourceBonus;
        const upgrade46 = this.upgrades[46].sourceBonus;
        const upgrade54 = this.upgrades[54].sourceBonus;

        // Keep native factor order and nested sums to preserve floating-point results.
        const multiplier = (1 + inputs.summoningWinnerBonus / 100)
            * (1 + inputs.sushiBonus / 100)
            * (1 + inputs.clamWorkReward)
            * (30 * inputs.crucibleReward3 + 50 * inputs.crucibleReward8 + 1)
            * inputs.menagerieMultiplier
            * (1 + inputs.jellyObstruction38 / 100)
            * (1 + inputs.jellyObstruction21 / 100)
            * (1 + inputs.buttonBonus / 100)
            * (1 + (15 * inputs.meritLevel) / 100)
            * Math.max(1, Math.pow(2, inputs.gemPurchaseCount))
            * (
                Math.max(1, this.chapters[1].bonuses[2].getBonus())
                * Math.max(1, this.chapters[5].bonuses[0].getBonus())
                * Math.max(1, this.chapters[4].bonuses[2].getBonus())
                * Math.max(1, this.chapters[6].bonuses[2].getBonus())
                * Math.max(1, inputs.companionBonus)
            )
            * (1 + upgrade1 / 100)
            * (1 + inputs.dancingCoralBonus / 100)
            * (1 + (inputs.cropScientistBonus + (inputs.slabBonus + (inputs.totalizerBonus + inputs.mealBonus))) / 100)
            * (1 + upgrade2 / 100)
            * (1 + inputs.accountPowerBonus / 100)
            * (1 + upgrade3 / 100)
            * (1 + inputs.stickerBonus / 100)
            * (1 + inputs.paletteBonus / 100)
            * (1 + upgrade46 / 100)
            * (1 + upgrade54 / 100)
            * (1 + (inputs.exoticMarketBonus + Math.min(4 * inputs.cardLevel, 30)) / 100)
            * (1 + (upgrade14 + (upgrade15 + (upgrade16 + upgrade17))) / 100);

        this.persistentPower = (1 + upgrade0) * multiplier;
    }

    prepareSavedAmberGain(inputs: SpelunkingAmberInputs): void {
        // Saved preview uses depth zero and no destroyed objects or active elixir effects.
        // Preserve native multiplication order and nested sums.
        this.savedAmberGainMultiplier = (1 + 14 * this.upgrades[67].sourceBonus)
            * (1 + inputs.arcadeBonus / 100)
            * (1 + inputs.sushiBonus / 100)
            * (1 + (inputs.cropScientistBonus
                + (inputs.lampBonus + inputs.stampBonus + inputs.vialBonus + inputs.mealBonus)) / 100)
            * (1 + inputs.dancingCoralBonus / 100)
            * (1 + (Math.min(5 * inputs.cardLevel, 40) + Math.min(10 * inputs.cardLevel, 100)) / 100)
            * (1 + inputs.summoningWinnerBonus / 100)
            * (1 + (this.upgrades[7].getBonus()
                + (this.upgrades[20].sourceBonus
                    + (this.upgrades[41].sourceBonus + this.upgrades[51].sourceBonus))) / 100)
            * this.overstim.amberMultiplier
            * (1 + inputs.masteryAmberPercent / 100)
            * (1 + this.upgrades[44].sourceBonus / 100)
            * (1 + this.upgrades[8].sourceBonus / 100)
            * (1 + this.upgrades[60].sourceBonus / 100)
            * (1 + inputs.loreEpilogueBonus / 100)
            * Math.max(1, this.chapters[1].bonuses[3].getBonus())
            * Math.max(1, this.chapters[5].bonuses[1].getBonus())
            * Math.max(1, this.chapters[4].bonuses[1].getBonus())
            * (1 + inputs.exoticMarketBonus / 100)
            * (1 + this.upgrades[9].sourceBonus / 100)
            * (1 + this.upgrades[10].sourceBonus / 100)
            * (1 + this.upgrades[21].sourceBonus / 150);
    }

    private resetCharacterMetrics(): void {
        this.characters = this.stamina.map(stamina =>
            new SpelunkingCharacterResults(stamina.playerID, this.tunnels, this.chapters)
        );
        this.grandDiscovery = new SpelunkingGrandDiscoveryResults(this.tunnels);
    }

    prepareCharacterMetrics(
        inputs: SpelunkingCharacterMetricInputs,
        players: readonly SpelunkingPlayerMetricInputs[]
    ): void {
        this.resetCharacterMetrics();
        let grandCharacter: SpelunkingCharacterResults | undefined;
        for (const player of players) {
            const character = this.characters[player.playerID];
            character.playerName = player.playerName;
            character.skillLevel = player.skillLevel;
            if (grandCharacter === undefined || player.skillLevel > grandCharacter.skillLevel) {
                grandCharacter = character;
            }
            const efficiency = (10 + (this.chapters[0].bonuses[0].getBonus()
                + this.chapters[1].bonuses[0].getBonus()))
                * Math.max(1, 1 + (player.allEfficiencyMultiplier - 1) / 20)
                * (1 + inputs.masteryEfficiencyPercent / 100)
                * (1 + this.upgrades[56].sourceBonus / 100)
                * (1 + this.chapters[0].bonuses[1].getBonus() / 100)
                * Math.max(1, player.efficiencyTalentMultiplier)
                * (1 + (inputs.efficiencyStampBonus
                    + (player.efficiencyCardBonus
                        + (inputs.efficiencyVialBonus + inputs.efficiencyBubbleBonus))) / 100);
            character.efficiency = efficiency;

            const grandBase = 0.00004
                * (1 + this.upgrades[43].sourceBonus / 100)
                * (1 + inputs.zenithMarketBonus / 100)
                * (1 + this.chapters[4].bonuses[0].getBonus() / 100)
                * (1 + inputs.jellyObstructionBonus / 100)
                * (1 + player.skillLevel * (inputs.mineheadBonus + inputs.sushiBonus) / 100)
                * (1 + inputs.coveBonus / 100)
                * Math.max(1, inputs.grandTalentMultiplier)
                * (1 + this.upgrades[55].sourceBonus / 100)
                * Math.max(1, this.chapters[6].bonuses[1].getBonus());
            for (const tunnel of this.tunnels) {
                character.grandDiscoveryChances[tunnel.index] = tunnel.grandEligible
                    ? grandBase * Math.pow(2, -tunnel.grandSummary.found)
                    : 0;
            }
        }
        if (grandCharacter !== undefined) {
            this.grandDiscovery.playerName = grandCharacter.playerName;
            this.grandDiscovery.skillLevel = grandCharacter.skillLevel;
            for (const tunnel of this.tunnels) {
                this.grandDiscovery.chances[tunnel.index] = grandCharacter.grandDiscoveryChances[tunnel.index];
            }
        }
    }

    private resetCaveNodeHarvests(): void {
        for (const character of this.characters) {
            character.caveNodeHarvests.fill(NEUTRAL_CAVE_NODE_HARVEST);
        }
    }

    prepareCaveNodeHarvests(
        inputs: SpelunkingCaveNodeInputs,
        players: readonly SpelunkingPlayerCaveNodeInputs[]
    ): void {
        this.resetCaveNodeHarvests();
        for (const player of players) {
            const character = this.characters[player.playerID];
            const efficiency = character.efficiency;
            const prowess = Math.max(0, Math.min(0.1,
                (inputs.bubbleProwessMultiplier - 1) / 10
                + (0.001 * player.starSignProwess + 0.0005 * inputs.mealProwessPercent)
            ));
            for (const chapter of this.chapters) {
                const difficulty = chapter.gatheringSource.details.Defence;
                const ratio = efficiency / difficulty;
                const harvestChance = ratio >= 0.25
                    ? Math.min(1.512 * (ratio - 0.0763) / (ratio + 5), 1)
                    : 0;
                const eligible = harvestChance > 0.05;
                const pagesPerDrop = eligible
                    ? Math.floor(Math.max(Math.pow(efficiency / (10 * difficulty), 0.25 + prowess), 1))
                    : 0;
                character.caveNodeHarvests[chapter.index] = { eligible, harvestChance, pagesPerDrop };
            }
        }
    }

    prepareUpgradeBonuses(): void {
        const sourceBonusInputs: UpgradeSourceBonusInputs = {
            spelunkingSkillLevelTotal: this.spelunkingSkillLevelTotal,
            ordinaryDiscoveryCount: this.getTotalDiscoveries(),
            bestDepthTotal: this.bestDepthTotal,
            biggestHaulDigitTotal: this.biggestHaulDigitTotal,
            grandDiscoveryCount: this.grandDiscoveryCount,
            manicTotalDepth: this.manic.totalDepth,
            trackometerLevel: this.trackometerLevel,
        };
        for (const upgrade of this.upgrades) {
            upgrade.updateSourceBonus(sourceBonusInputs);
        }
        this.manic.prepareUpgradeBonuses(
            this.upgrades.find(upgrade => upgrade.index === 54)!.sourceBonus,
            this.upgrades.find(upgrade => upgrade.index === 55)!.sourceBonus,
            this.upgrades.find(upgrade => upgrade.index === 56)!.sourceBonus
        );
        this.trackometer.prepareUpgradeBonuses(
            this.upgrades.find(upgrade => upgrade.index === 59)!.sourceBonus,
            this.upgrades.find(upgrade => upgrade.index === 60)!.sourceBonus,
            this.upgrades.find(upgrade => upgrade.index === 61)!.sourceBonus
        );
    }
    updateRechargeContributors(values: {
        additive: {
            upgrade: number;
            alchemyBubble: number;
            chapterThree: number;
            chapterSix: number;
            skillMastery: number;
            card: number;
        };
        multiplier: {
            meritocracy: number;
            legendTalent: number;
            royalArmory: number;
            sushi: number;
        };
    }): void {
        const { additive, multiplier } = this.rechargeSourceContributors;
        additive.upgrade.value = values.additive.upgrade;
        additive.alchemyBubble.value = values.additive.alchemyBubble;
        additive.chapterThree.value = values.additive.chapterThree;
        additive.chapterSix.value = values.additive.chapterSix;
        additive.skillMastery.value = values.additive.skillMastery;
        additive.card.value = values.additive.card;
        multiplier.meritocracy.value = values.multiplier.meritocracy;
        multiplier.legendTalent.value = values.multiplier.legendTalent;
        multiplier.royalArmory.value = values.multiplier.royalArmory;
        multiplier.sushi.value = values.multiplier.sushi;
        const additiveRecharge = this.additiveRechargeContributors
            .reduce((total, contributor) => total + contributor.value, 0);
        // Multiply from the base to preserve the existing left-to-right operation order.
        this.hourlyRecharge = this.rechargeMultiplierContributors.reduce(
            (rate, contributor) => rate * contributor.value, this.baseHourlyRecharge
        ) * (1 + additiveRecharge / 100);
    }
}



export const updateSpelunkingChapterBonuses = (data: Map<string, any>): void => {
    const spelunking = data.get("spelunking") as Spelunking;
    const sailing = data.get("sailing") as Sailing;
    const artifactBonus = sailing.artifacts[35].getBonus();
    spelunking.chapters.forEach(chapter => chapter.prepareArtifactBonus(artifactBonus));
    spelunking.elixirs.prepareChapterConsumptionReduction(spelunking.chapters[3].bonuses[2].getBonus());
};

export const updateSpelunkingUpgradeBonuses = (data: Map<string, any>): void => {
    const spelunking = data.get("spelunking") as Spelunking;
    const players = data.get("players") as Player[];

    let skillLevelTotal = 0;
    for (const player of players) {
        skillLevelTotal = Math.round(skillLevelTotal + Math.max(0, player.skills.get(SkillsIndex.Spelunking)!.level));
    }
    spelunking.spelunkingSkillLevelTotal = skillLevelTotal;

    let bestDepthTotal = 0;
    let biggestHaulDigitTotal = 0;
    for (const tunnel of spelunking.tunnels) {
        bestDepthTotal = Math.round(bestDepthTotal + tunnel.bestDepth);
        biggestHaulDigitTotal = Math.round(biggestHaulDigitTotal + Math.ceil(lavaLog(tunnel.biggestHaul)));
    }
    spelunking.bestDepthTotal = bestDepthTotal;
    spelunking.biggestHaulDigitTotal = biggestHaulDigitTotal;
    spelunking.grandDiscoveryCount = spelunking.grandSummary.found;
    spelunking.prepareUpgradeBonuses();
};

export const updateSpelunkingPower = (data: Map<string, any>): void => {
    const spelunking = data.get("spelunking") as Spelunking;
    const summoning = data.get("summoning") as Summoning;
    const sushi = data.get("sushi") as SushiStation;
    const clamworks = data.get("clamworks") as Clamworks;
    const breeding = data.get("breeding") as Breeding;
    const menagerie = data.get("menagerie") as Menagerie;
    const jellyOperator = data.get("jellyOperator") as JellyOperator;
    const button = data.get("button") as Button;
    const taskBoard = data.get("taskboard") as TaskBoard;
    const gems = data.get("gems") as GemStore;
    const companions = data.get("companions") as Companion[];
    const dancingCoral = data.get("dancingCoral") as DancingCoral;
    const farming = data.get("farming") as Farming;
    const slab = data.get("slab") as Slab;
    const lab = data.get("lab") as Lab;
    const gaming = data.get("gaming") as Gaming;
    const worship = data.get("worship") as Worship;
    const cooking = data.get("cooking") as Cooking;
    const account = data.get("account") as Account;
    const cards = data.get("cards") as Card[];

    spelunking.calculatePersistentPower({
        summoningWinnerBonus: summoning.getSummoningWinnerBonusFromIndex(27),
        sushiBonus: sushi.getBonusFromIndex(20),
        clamWorkReward: Number(clamworks.isBonusUnlocked(11)),
        crucibleReward3: breeding.getCrucibleBonus(3),
        crucibleReward8: breeding.getCrucibleBonus(8),
        menagerieMultiplier: menagerie.getBonusMultiplier(22),
        jellyObstruction38: jellyOperator.getObstructionBonus(38),
        jellyObstruction21: jellyOperator.getObstructionBonus(21),
        buttonBonus: button.getBonusForIndex(6),
        meritLevel: taskBoard.merits.find(merit => merit.index === 48)!.level,
        gemPurchaseCount: gems.purchases.find(purchase => purchase.no === 43)?.pucrhased ?? 0,
        companionBonus: getCompanionActiveBonus(companions, 143),
        dancingCoralBonus: dancingCoral.getBonusFromIndex(1),
        cropScientistBonus: farming.cropScientist.getBonus(CropScientistBonusText.Spelunky),
        slabBonus: slab.getSpelunkingPowerBonus(lab.bonuses[15].getBonus(), gaming.isSuperbitPurchased(25)),
        totalizerBonus: worship.totalizer.getBonus(TotalizerBonus.SpelunkingPow),
        mealBonus: cooking.getMealBonusForKey("SplkPOW"),
        accountPowerBonus: account.spelunkingPowerBonus,
        stickerBonus: farming.getStickerBonus(6),
        paletteBonus: gaming.getPaletteBonus(13),
        exoticMarketBonus: farming.getExoticMarketBonusValue(42),
        cardLevel: cards.find(card => card.id === "w7a5")!.getLevels(),
    });
};

export const updateSpelunkingAccountMetrics = (data: Map<string, any>): void => {
    const spelunking = data.get("spelunking") as Spelunking;
    const players = data.get("players") as Player[];
    const cards = data.get("cards") as Card[];
    const stamps = data.get("stamps") as Stamp[][];
    const arcade = data.get("arcade") as Arcade;
    const sushi = data.get("sushi") as SushiStation;
    const farming = data.get("farming") as Farming;
    const hole = data.get("hole") as Hole;
    const alchemy = data.get("alchemy") as Alchemy;
    const cooking = data.get("cooking") as Cooking;
    const dancingCoral = data.get("dancingCoral") as DancingCoral;
    const summoning = data.get("summoning") as Summoning;
    const tome = data.get("tome") as Tome;
    const rift = data.get("rift") as Rift;
    const mastery = rift.bonuses.find(bonus => bonus.name === SkillMastery.displayName) as SkillMastery;
    const skilling = data.get("skilling") as Skilling;
    const zenithMarket = data.get("zenithMarket") as ZenithMarket;
    const jellyOperator = data.get("jellyOperator") as JellyOperator;
    const minehead = data.get("minehead") as Minehead;

    spelunking.prepareSavedAmberGain({
        arcadeBonus: arcade.bonuses.find(bonus => bonus.index === 55)!.getBonus(),
        sushiBonus: sushi.getBonusFromIndex(28),
        cropScientistBonus: farming.cropScientist.getBonus(CropScientistBonusText.Spelunky),
        lampBonus: hole.lamp.getBonus(false, 3, 0),
        stampBonus: getStampBonusForKey(stamps, "spelunkamb"),
        vialBonus: alchemy.getVialBonusForKey("7amber"),
        mealBonus: cooking.getMealBonusForKey("SplkAmb"),
        dancingCoralBonus: dancingCoral.getBonusFromIndex(2),
        cardLevel: cards.find(card => card.id === "w7a7")!.getLevels(),
        summoningWinnerBonus: summoning.getSummoningWinnerBonusFromIndex(28),
        masteryAmberPercent: mastery.getSkillBonus(SkillsIndex.Spelunking, 6),
        loreEpilogueBonus: tome.getEpilogueBonus(4),
        exoticMarketBonus: farming.getExoticMarketBonusValue(43),
    });

    let grandTalentMultiplier = 0;
    for (const player of players) {
        grandTalentMultiplier = Math.max(grandTalentMultiplier,
            player.getTalentBonusAtInputs(238, player.finalTalentInputs));
    }
    spelunking.prepareCharacterMetrics({
        masteryEfficiencyPercent: mastery.getSkillBonus(SkillsIndex.Spelunking, 1),
        efficiencyStampBonus: getStampBonusForKey(stamps, "spelunkeff"),
        efficiencyVialBonus: alchemy.getVialBonusForKey("7spelunkeff"),
        efficiencyBubbleBonus: alchemy.getBubbleBonusForKey("A11"),
        zenithMarketBonus: zenithMarket.getBonusForId(6),
        jellyObstructionBonus: jellyOperator.getObstructionBonus(31),
        mineheadBonus: minehead.getBonusFromIndex(14),
        sushiBonus: sushi.getBonusFromIndex(21),
        coveBonus: hole.cove.upgrades[20].getBonus(),
        grandTalentMultiplier,
    }, players.map(player => ({
        playerID: player.playerID,
        playerName: player.playerName,
        skillLevel: player.skills.get(SkillsIndex.Spelunking)!.level,
        allEfficiencyMultiplier: skilling.getAllEfficiencies(player),
        efficiencyTalentMultiplier: player.getTalentBonusAtInputs(237, player.finalTalentInputs),
        efficiencyCardBonus: Card.GetTotalBonusForId(
            player.cardInfo!.cards.filter(card => card.passive || player.cardInfo!.equippedCards.includes(card)), 98
        ),
    })));
};

export const updateSpelunkingLateCalculations = (data: Map<string, any>): void => {
    const spelunking = data.get("spelunking") as Spelunking;
    const players = data.get("players") as Player[];
    const taskBoard = data.get("taskboard") as TaskBoard;
    const companions = data.get("companions") as Companion[];
    const rift = data.get("rift") as Rift;
    const mastery = rift.bonuses.find(bonus => bonus.name === SkillMastery.displayName) as SkillMastery;
    const bigFish = data.get("bigFish") as BigFish;
    const meritocracy = data.get("meritocraty") as Meritocraty;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const royalArmory = data.get("royalArmory") as RoyalArmory;
    const sushi = data.get("sushi") as SushiStation;
    const alchemy = data.get("alchemy") as Alchemy;
    const cards = data.get("cards") as Card[];
    const rechargeCard = cards.find(card => card.id === "w7a10")!;
    const nativeCardLevel = rechargeCard.getLevels();
    let highestSpecialty = 0;
    // Each contributor supplies its own final talent context, not the recipient's context.
    players.forEach(player => {
        highestSpecialty = Math.max(highestSpecialty, player.getTalentBonus(236));
    });

    spelunking.deepPocketsMultiplier = 1 + 7 * spelunking.getUpgradeBonus(21) / 100;

    const savedPlayerNames = data.get("playerNames") as string[];
    const firstSavedUsernamePlayer = players.find(player => player.playerName === savedPlayerNames[0])!;
    const cooking = data.get("cooking") as Cooking;
    // Cave Node prowess needs each player's final Star Sign bonuses after late Meritocracy.
    spelunking.prepareCaveNodeHarvests({
        bubbleProwessMultiplier: alchemy.getBubbleBonusForKey("ProwessMulti"),
        mealProwessPercent: cooking.getMealBonusForKey("Sprow"),
    }, players.map(player => ({
        playerID: player.playerID,
        starSignProwess: player.starSigns.reduce(
            (sum, sign) => sum + sign.getBonus("All Skill Prowess"), 0
        ),
    })));
    const jellyOperator = data.get("jellyOperator") as JellyOperator;
    let maximumTalentBonus = 0;
    for (const player of players) {
        maximumTalentBonus = Math.max(maximumTalentBonus,
            player.getTalentBonusAtInputs(235, player.finalTalentInputs));
    }

    const talentDiscount = 1 / (1
        + Math.max(0, maximumTalentBonus * royalArmory.getTotalRoyalStatueLevels()) / 100);
    const mealLevelScale = Math.min(2,
        Math.max(1, 1 + Math.floor(firstSavedUsernamePlayer.skills.get(SkillsIndex.Spelunking)!.level / 50)));
    const mealDiscount = 1 / (1 + cooking.getMealBonusForKey("SplkUpg") * mealLevelScale / 100);
    const retention = Math.max(0.1, 1
        - (Math.max(sushi.getBonusFromIndex(6), sushi.getBonusFromIndex(27))
            + jellyOperator.getObstructionBonus(22)) / 100);
    spelunking.prepareUpgradePrices({ talentDiscount, mealDiscount, retention });

    const upgrade5 = spelunking.getUpgradeBonus(5);
    const maximumInputs: StaminaMaximumInputs = {
        upgrade4: spelunking.getUpgradeBonus(4),
        upgrade5,
        trackometerStamina: spelunking.trackometer.maxStaminaBonus,
        meritStamina: taskBoard.merits.find(merit => merit.index === 50)!.getBonus(),
        companion: getCompanionActiveBonus(companions, 148),
        chapterStamina: spelunking.chapters[2].bonuses[0].getBonus(),
        masteryStamina: mastery.getSkillBonus(SkillsIndex.Spelunking, 3),
        chapterSpecialty: spelunking.chapters[3].bonuses[0].getBonus(),
        highestSpecialty,
        fishAdvice: bigFish.getBonusFromIndex(1),
    };
    // Mastery already returns the full reward amounts, not unlock indicators.
    spelunking.dailyReadLimit = 5 + mastery.getSkillBonus(SkillsIndex.Spelunking, 4);
    // Recharge uses the native card level; equipped card boosts do not apply.
    spelunking.updateRechargeContributors({
        additive: {
            upgrade: upgrade5,
            alchemyBubble: alchemy.getBubbleBonusForKey("Y11"),
            chapterThree: spelunking.chapters[2].bonuses[1].getBonus(),
            chapterSix: spelunking.chapters[5].bonuses[2].getBonus(),
            skillMastery: mastery.getSkillBonus(SkillsIndex.Spelunking, 5),
            card: Math.min(2 * nativeCardLevel, 20),
        },
        multiplier: {
            meritocracy: 1 + meritocracy.getCurrentBonus(17) / 100,
            legendTalent: 1 + legendTalents.getBonusFromIndex(30) / 100,
            royalArmory: Math.max(1, royalArmory.getSpelunkingRechargeOutpostMultiplier()),
            sushi: 1 + sushi.getBonusFromIndex(11) / 100,
        },
    });

    players.forEach(player => {
        spelunking.stamina[player.playerID].prepareMaximum(
            player.skills.get(SkillsIndex.Spelunking)!.level, maximumInputs
        );
    });
    // Native overflow pools recharge from actual characters, not padded saved stamina slots.
    let totalHourlyRecharge = 0;
    for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
        totalHourlyRecharge += spelunking.hourlyRecharge;
    }
    spelunking.overstim.preparePotentialFillRate(
        spelunking.chapters[2].bonuses[2].getBonus(), totalHourlyRecharge
    );
    spelunking.overstim.prepareNextLevelEstimate(
        players.map(player => spelunking.stamina[player.playerID]), spelunking.hourlyRecharge
    );
};

export const updateSpelunkingPresentation = (data: Map<string, any>): void => {
    const spelunking = data.get("spelunking") as Spelunking;
    const storage = data.get("storage") as Storage;
    spelunking.chapters.forEach(chapter => chapter.preparePageStacks(storage));
};
