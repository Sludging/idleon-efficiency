import { Domain, RawData } from "../base/domain";
import { initSpelunkingChapterRepo, SpelunkingChapterBase } from "../data/SpelunkingChapterRepo";
import { initSpelunkingMetadataRepo } from "../data/SpelunkingMetadataRepo";
import { initSpelunkingTunnelRepo, SpelunkingTunnelBase } from "../data/SpelunkingTunnelRepo";
import { initSpelunkingUpgradeRepo, SpelunkingUpgradeBase } from "../data/SpelunkingUpgradeRepo";
import { Item } from "../items";
import { ChapterBonusModel } from "../model/chapterBonusModel";
import { SpelunkingDiscoveryModel } from "../model/spelunkingDiscoveryModel";
import { SpelunkingItemDropModel } from "../model/spelunkingItemDropModel";
import { SpelunkingRewardLabelModel } from "../model/spelunkingRewardLabelModel";
import { SpelunkingTunnelModel } from "../model/spelunkingTunnelModel";
import { SpelunkingUpgradeModel } from "../model/spelunkingUpgradeModel";

const GRAND_DISCOVERIES_PER_TUNNEL = 10;
const GRAND_DISCOVERY_UPGRADE_INDEX = 43;

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

export class Chapter {
    constructor(
        public index: number,
        public name: string,
        public bonuses: ChapterBonusModel[]
    ) {
    }

    static fromBase = (data: SpelunkingChapterBase[]): Chapter[] => {
        return data.map(chapter => new Chapter(chapter.index, chapter.data.name, chapter.data.bonuses));
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
        return this.data.bonusPerLevel * this.level;
    }

    static fromBase = (data: SpelunkingUpgradeBase[]): Upgrade[] => {
        return data.map(upgrade => new Upgrade(upgrade.index, upgrade.data));
    }
}

export class Spelunking extends Domain {
    tunnels: Tunnel[] = []
    chapters: Chapter[] = []
    upgrades: Upgrade[] = []
    stamina: number[] = []
    ownedAmber: number = 0;
    exaltedStampFragments: number = 0;
    grandDiscoveryUpgrade!: Upgrade;
    amber!: SpelunkingRewardLabelModel;
    // Destruction rewards are not discoveries or fixed drops. Bling bags only present the generated loot.
    sharedDestructionDrops: {
        data: SpelunkingRewardLabelModel;
        itemDrop?: SpelunkingItemDropModel;
        unlockUpgrade?: Upgrade;
    }[] = [];

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
        // The effective Grand gate clamps negative levels. Keep the existing raw upgrade-bonus APIs unchanged.
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

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: [] }
        ]
    }


    init(_allItems: Item[], charCount: number) {
        this.chapters = Chapter.fromBase(initSpelunkingChapterRepo());
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
        this.stamina = Array(charCount).fill(0);
        this.ownedAmber = 0;
        this.exaltedStampFragments = 0;
        return this;
    }

    parse(data: Map<string, any>): void {
        const spelunking = data.get(this.getDataKey()) as Spelunking;
        const spelunkingData = (data.get("Spelunk") ?? []) as unknown[][];
        const savedStamina = (spelunkingData[3] ?? []) as (number | string)[];
        const currencies = (spelunkingData[4] ?? []) as (number | string)[];
        const shopUpgradeLevels = (spelunkingData[5] ?? []) as (number | string)[];
        const discoveredNames = new Set(
            (spelunkingData[6] ?? []).map(discovery => String(discovery).replace(/_/g, " ").trim())
        );

        spelunking.tunnels.forEach(tunnel => tunnel.parse(spelunkingData, discoveredNames));
        spelunking.stamina.forEach((_, index) => {
            spelunking.stamina[index] = Number(savedStamina[index] ?? 0);
        });
        // Missing shop slots stay locked. Every parse replaces levels; unlocked derives from the saved sentinel.
        spelunking.upgrades.forEach(upgrade => {
            upgrade.level = Number(shopUpgradeLevels[upgrade.index] ?? -1);
        });
        spelunking.ownedAmber = Number(currencies[0] ?? 0);
        // Exalted Stamp Fragments add to the Compass bonus for exalted stamps.
        spelunking.exaltedStampFragments = Number(currencies[3] ?? 0);
    }
}

