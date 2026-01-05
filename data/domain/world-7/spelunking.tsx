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
    constructor(public index: number, public name: string,public data: SpelunkingDiscoveryModel) {
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

    static fromBase = (data: SpelunkingUpgradeBase[]): Upgrade[] => {
        return data.map(upgrade => new Upgrade(upgrade.index, upgrade.data));
    }
}

export class Spelunking extends Domain {
    tunnels: Tunnel[] = []
    chapters: Chapter[] = []
    upgrades: Upgrade[] = []
    stamina: number[] = []

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: 0 }
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
        const spelunkingData = data.get("Spelunk") as any[][];

        // Safe guard for old accounts / missing data.
        if (!spelunkingData || spelunkingData.length == 0) {
            return;
        }

        // Get raw discoveries and clean up the underscores so we can match
        // them to the name of discoveries
        const discoveriesMade = spelunkingData[6] as string[];
        const discoveriesMadeClean = discoveriesMade.map(discovery => String(discovery)?.replace(/_/g, ' '));

        spelunking.tunnels.forEach(tunnel => {
            tunnel.unlocked = spelunkingData[0][tunnel.index] > 0;
            tunnel.bestDepth = spelunkingData[1][tunnel.index];
            tunnel.biggestHaul = spelunkingData[2][tunnel.index];
            tunnel.discoveries.forEach(discovery => {
                discovery.unlocked = discoveriesMadeClean.includes(discovery.name);
            });
        });

        spelunking.stamina.forEach((_, index) => {
            spelunking.stamina[index] = spelunkingData[3][index];
        });

        spelunking.upgrades.forEach(upgrade => {
            upgrade.level = spelunkingData[5][upgrade.index];
            upgrade.unlocked = upgrade.level != -1; // -1 means the upgrade is locked
        });

    }
}
