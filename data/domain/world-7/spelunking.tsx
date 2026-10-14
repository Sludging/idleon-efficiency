import { commaNotation, lavaFunc, notateNumber } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { initSpelunkingChapterRepo, SpelunkingChapterBase } from "../data/SpelunkingChapterRepo";
import { initSpelunkingMetadataRepo } from "../data/SpelunkingMetadataRepo";
import { initSpelunkingTunnelRepo, SpelunkingTunnelBase } from "../data/SpelunkingTunnelRepo";
import { initSpelunkingUpgradeRepo, SpelunkingUpgradeBase } from "../data/SpelunkingUpgradeRepo";
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
import type { Rift, SkillMastery } from "../world-4/rift";
import type { RoyalArmory } from "../world-6/royalArmory/royalArmory";
import type { Card } from "../cards";
import type { Alchemy } from "../world-2/alchemy/alchemy";
import type { BigFish } from "./bigFish";
import type { LegendTalents } from "./legendTalents";
import type { Meritocraty } from "./meritocraty";
import type { SushiStation } from "./sushi";

const GRAND_DISCOVERIES_PER_TUNNEL = 10;
const GRAND_DISCOVERY_UPGRADE_INDEX = 43;

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
}

export class Upgrade {
    public level: number = -1;

    constructor(public index: number, public data: SpelunkingUpgradeModel) {
    }
    get purchasedLevel(): number {
        return Math.max(0, this.level);
    }

    get unlocked(): boolean {
        return this.level !== -1;
    }

    getBonus(): number {
        return this.data.bonusPerLevel * this.purchasedLevel;
    }

    static fromBase = (data: SpelunkingUpgradeBase[]): Upgrade[] => {
        return data.map(upgrade => new Upgrade(upgrade.index, upgrade.data));
    }
}

export class Spelunking extends Domain {
    tunnels: Tunnel[] = []
    chapters: Chapter[] = []
    upgrades: Upgrade[] = []
    stamina: SpelunkingStamina[] = []
    dailyReadLimit: number = 5;
    dailyReadsUsed: number = 0;
    hourlyRecharge: number = 5;
    trackometerLevel: number = 0;

    get dailyReadsRemaining(): number {
        return Math.max(0, this.dailyReadLimit - this.dailyReadsUsed);
    }

    getTrackometerStaminaBonus(): number {
        // Maxima-Track scales its raw upgrade bonus by the saved Trackometer level.
        return this.getUpgradeBonus(61) * this.trackometerLevel;
    }
    ownedAmber: number = 0;
    exaltedStampFragments: number = 0;
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

    getTotalDiscoveries(): number {
        return this.tunnels.reduce((total, tunnel) => total + tunnel.discoveryCount, 0);
    }

    getResearchExpEpilogueBonus(player: Player, tome: Tome, grimoire: Grimoire, equipmentSets: EquipmentSets): number {
        const epilogue = this.researchExpEpilogue;
        if (!(this.ownedEpilogueCount > epilogue.index)) {
            return 0;
        }

        // Use this character's Tome score and equipped set, not the account's highest score.
        const score = tome.getPlayerTotalScore(player.playerID);
        const grimoireBonus = grimoire.getUpgradeBonus(17);
        const trollSetBonus = equipmentSets.getSetBonus("TROLL_SET", player, true);
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
        ]
    }


    init(allItems: Item[], charCount: number) {
        this.chapters = Chapter.fromBase(initSpelunkingChapterRepo(), allItems);
        this.upgrades = Upgrade.fromBase(initSpelunkingUpgradeRepo());
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
        this.dailyReadLimit = 5;
        this.dailyReadsUsed = 0;
        this.hourlyRecharge = 5;
        this.trackometerLevel = 0;
        this.ownedAmber = 0;
        this.exaltedStampFragments = 0;
        this.ownedEpilogueCount = 0;
        return this;
    }

    parse(data: Map<string, any>): void {
        const spelunking = data.get(this.getDataKey()) as Spelunking;
        const charCount = data.get("charCount") as number;
        spelunking.stamina = Array.from({ length: charCount }, (_, playerID) =>
            spelunking.stamina.find(stamina => stamina.playerID === playerID) ?? new SpelunkingStamina(playerID)
        );
        const spelunkingData = (data.get("Spelunk") ?? []) as unknown[][];
        const savedStamina = (spelunkingData[3] ?? []) as (number | string)[];
        const currencies = (spelunkingData[4] ?? []) as (number | string)[];
        const shopUpgradeLevels = (spelunkingData[5] ?? []) as (number | string)[];
        const savedChapterLevels = (spelunkingData[8] ?? []) as (number | string)[];
        const accountOptions = (data.get("OptLacc") ?? []) as (number | string)[];
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
        spelunking.upgrades.forEach(upgrade => {
            upgrade.level = Number(shopUpgradeLevels[upgrade.index] ?? -1);
        });
        spelunking.ownedAmber = Number(currencies[0] ?? 0);
        // Exalted Stamp Fragments add to the Compass bonus for exalted stamps.
        spelunking.exaltedStampFragments = Number(currencies[3] ?? 0);
    }
}

export const updateSpelunkingChapterBonuses = (data: Map<string, any>): void => {
    const spelunking = data.get("spelunking") as Spelunking;
    const sailing = data.get("sailing") as Sailing;
    const artifactBonus = sailing.artifacts[35].getBonus();
    spelunking.chapters.forEach(chapter => chapter.prepareArtifactBonus(artifactBonus));
};

export const updateSpelunkingPresentation = (data: Map<string, any>): void => {
    const spelunking = data.get("spelunking") as Spelunking;
    const players = data.get("players") as Player[];
    const storage = data.get("storage") as Storage;
    const taskBoard = data.get("taskboard") as TaskBoard;
    const companions = data.get("companions") as Companion[];
    const rift = data.get("rift") as Rift;
    const mastery = rift.bonuses.find(bonus => bonus.name === "Skill Mastery") as SkillMastery;
    const bigFish = data.get("bigFish") as BigFish;
    const meritocracy = data.get("meritocraty") as Meritocraty;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const royalArmory = data.get("royalArmory") as RoyalArmory;
    const sushi = data.get("sushi") as SushiStation;
    const alchemy = data.get("alchemy") as Alchemy;
    const cards = data.get("cards") as Card[];
    const nativeCardLevel = cards.find(card => card.id === "w7a10")!.getLevels();
    let highestSpecialty = 0;
    // Each contributor supplies its own final talent context, not the recipient's context.
    players.forEach(player => {
        highestSpecialty = Math.max(highestSpecialty, player.getTalentBonus(236));
    });

    const upgrade5 = spelunking.getUpgradeBonus(5);
    const maximumInputs: StaminaMaximumInputs = {
        upgrade4: spelunking.getUpgradeBonus(4),
        upgrade5,
        trackometerStamina: spelunking.getTrackometerStaminaBonus(),
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
    const additiveRecharge = upgrade5 + alchemy.getBubbleBonusForKey("Y11")
        + spelunking.chapters[2].bonuses[1].getBonus()
        + spelunking.chapters[5].bonuses[2].getBonus()
        + mastery.getSkillBonus(SkillsIndex.Spelunking, 5)
        + Math.min(2 * nativeCardLevel, 20);
    spelunking.hourlyRecharge = 5
        * (1 + meritocracy.getCurrentBonus(17) / 100)
        * (1 + legendTalents.getBonusFromIndex(30) / 100)
        * Math.max(1, royalArmory.getSpelunkingRechargeOutpostMultiplier())
        * (1 + sushi.getBonusFromIndex(11) / 100)
        * (1 + additiveRecharge / 100);

    players.forEach(player => {
        spelunking.stamina[player.playerID].prepareMaximum(
            player.skills.get(SkillsIndex.Spelunking)!.level, maximumInputs
        );
    });
    spelunking.chapters.forEach(chapter => chapter.preparePageStacks(storage));
};
