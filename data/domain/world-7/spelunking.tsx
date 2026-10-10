import { Domain, RawData } from "../base/domain";
import { initSpelunkingChapterRepo, SpelunkingChapterBase } from "../data/SpelunkingChapterRepo";
import { initSpelunkingTunnelRepo, SpelunkingTunnelBase } from "../data/SpelunkingTunnelRepo";
import { initSpelunkingUpgradeRepo, SpelunkingUpgradeBase } from "../data/SpelunkingUpgradeRepo";
import { Item } from "../items";
import { ChapterBonusModel } from "../model/chapterBonusModel";
import { SpelunkingDiscoveryModel } from "../model/spelunkingDiscoveryModel";
import { SpelunkingUpgradeModel } from "../model/spelunkingUpgradeModel";

export class Tunnel {
    public unlocked: boolean = false;
    public bossKilled: boolean = false;
    public bestDepth: number = 0;
    public biggestHaul: number = 0;
    public discoveryCount: number = 0;

    constructor(
        public index: number,
        public name: string,
        public loreBonus: string,
        public bossDepth: number,
        public discoveries: Discovery[]
    ) {

    }


    static fromBase = (data: SpelunkingTunnelBase[]): Tunnel[] => {
        return data.map(tunnel => new Tunnel(
            tunnel.index,
            tunnel.data.name,
            tunnel.data.loreBonus,
            tunnel.data.bossDepth,
            Discovery.fromBase(tunnel.data.discoveries)
        ))
            // Filter out 'future' tunnels based on number of discoveries
            .filter(tunnel => tunnel.discoveries.length > 0);
    }
}

export class Discovery {
    unlocked: boolean = false;
    constructor(public index: number, public name: string, public data: SpelunkingDiscoveryModel) {
    }

    static fromBase = (data: SpelunkingDiscoveryModel[]): Discovery[] => {
        return data.map((discovery, index) => new Discovery(index, discovery.name, discovery));
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
    public level: number = 0;
    public unlocked: boolean = false;

    constructor(public index: number, public data: SpelunkingUpgradeModel) {
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
    // TODO: Move this out of the Spelunking domain and into a 
    // more appropriate place. 
    premiumHatsFound: number = 0;

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
        this.tunnels = Tunnel.fromBase(initSpelunkingTunnelRepo());
        this.chapters = Chapter.fromBase(initSpelunkingChapterRepo());
        this.upgrades = Upgrade.fromBase(initSpelunkingUpgradeRepo());
        this.stamina = Array(charCount).fill(0);
        return this;
    }

    parse(data: Map<string, any>): void {
        const spelunking = data.get(this.getDataKey()) as Spelunking;
        const spelunkingData = data.get("Spelunk") as unknown[][];

        spelunking.premiumHatsFound = 0;

        // Safe guard for old accounts / missing data.
        if (!spelunkingData || spelunkingData.length == 0) {
            return;
        }

        const tunnelUnlocks = (spelunkingData[0] ?? []) as number[];
        const bestDepths = (spelunkingData[1] ?? []) as number[];
        const biggestHauls = (spelunkingData[2] ?? []) as (number | string)[];
        const staminaLevels = (spelunkingData[3] ?? []) as number[];
        const shopUpgradeLevels = (spelunkingData[5] ?? []) as number[];
        const discoveriesMade = (spelunkingData[6] ?? []) as string[];
        spelunking.premiumHatsFound = (spelunkingData[46] ?? []).length;

        // Get raw discoveries and clean up the underscores so we can match
        // them to the name of discoveries
        const discoveriesMadeClean = discoveriesMade.map(discovery => String(discovery).replace(/_/g, ' ').trim());

        spelunking.tunnels.forEach(tunnel => {
            tunnel.unlocked = tunnelUnlocks[tunnel.index] > 0;
            tunnel.bestDepth = bestDepths[tunnel.index];
            // Cloudsave serializes very large haul values as strings.
            tunnel.biggestHaul = Number(biggestHauls[tunnel.index] ?? 0);
            tunnel.discoveryCount = 0;
            tunnel.discoveries.forEach(discovery => {
                discovery.unlocked = discoveriesMadeClean.includes(discovery.name);
                if (discovery.unlocked) {
                    tunnel.discoveryCount++;
                }
            });
        });

        spelunking.stamina.forEach((_, index) => {
            spelunking.stamina[index] = staminaLevels[index];
        });

        spelunking.upgrades.forEach(upgrade => {
            upgrade.level = shopUpgradeLevels[upgrade.index];
            upgrade.unlocked = upgrade.level != -1; // -1 means the upgrade is locked
        });

        const spelunkCurrencies = (spelunkingData[4] ?? []) as number[];

        spelunking.ownedAmber = spelunkCurrencies[0];
    }
}
