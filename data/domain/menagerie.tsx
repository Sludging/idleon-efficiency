import { initRandoListRepo } from "./data/RandoListRepo";
import { Domain, RawData } from "./base/domain";
import { initMenagerieMissionRepo, MenagerieMissionBase } from "./data/MenagerieMissionRepo";
import { MenagerieMissionModel } from "./model/menagerieMissionModel";
import { initMenagerieBonusRepo, MenagerieBonusBase } from "./data/MenagerieBonusRepo";
import { initMenagerieUnlockRepo, MenagerieUnlockBase } from "./data/MenagerieUnlockRepo";
import { MenagerieBonusModel } from "./model/menagerieBonusModel";
import { MenagerieUnlockModel } from "./model/menagerieUnlockModel";
import { Item } from "./items";
import { ImageData } from "./imageData";

export class MenagerieMission {
    progress = 0;
    claimCount = 0;
    currentRequirement = 0;
    nextRequirement = 0;
    available = false;
    ready = false;

    constructor(public index: number, public data: MenagerieMissionModel) { }

    parse(claimCount: number): void {
        this.claimCount = claimCount;
        this.currentRequirement = Math.floor(this.data.initialRequirement + this.data.requirementIncrement * claimCount);
        this.nextRequirement = Math.floor(this.data.initialRequirement + this.data.requirementIncrement * (claimCount + 1));
    }

    update(progress: number, available: boolean): void {
        this.progress = progress;
        this.available = available;
        this.ready = available && progress >= this.currentRequirement;
    }

    getImageData(): ImageData {
        return { location: `MenaIconY${this.index}`, width: 38, height: 38 };
    }

    static fromBase(data: MenagerieMissionBase[]): MenagerieMission[] {
        return data.map(mission => new MenagerieMission(mission.index, mission.data));
    }
}

export class MenagerieUnlock {
    owned = false;
    available = false;
    requiredRank = 0;
    nextCost = 0;
    affordable = false;

    constructor(public index: number, public data: MenagerieUnlockModel) { }

    parse(owned: number): void {
        this.owned = owned >= 1;
    }

    getImageData(): ImageData {
        return { location: `MenaIconO${this.index}`, width: 44, height: 55 };
    }

    update(available: boolean, lumi: number, requiredRank: number): void {
        this.available = available;
        this.requiredRank = requiredRank;
        this.nextCost = (10 + this.index ** 2) * Math.max(1.6, 2.5 - 0.15 * this.index / 4) ** this.index;
        this.affordable = lumi >= this.nextCost && !this.owned;
    }

    static fromBase(data: MenagerieUnlockBase[]): MenagerieUnlock[] {
        return data.map(unlock => new MenagerieUnlock(unlock.index, unlock.data));
    }
}

const getMenageriePercentageMultiplier = (effect: number): number => 1 + effect / 100;

export class MenagerieBonus {
    level = 0;
    effect = 0;
    nextEffect = 0;
    nextCost = 0;
    available = false;
    requiredRank = 0;
    affordable = false;

    constructor(public index: number, public data: MenagerieBonusModel) { }

    parse(level: number): void {
        this.level = level;
    }

    update(available: boolean, lumi: number, requiredRank: number): void {
        this.effect = this.data.bonusPerLevel * this.level;
        this.nextEffect = this.data.bonusPerLevel * (this.level + 1);
        this.nextCost = 3 * this.level + this.level ** 1.5
            + (5 + this.index ** 1.5) * Math.max(1.45, 2.25 - 0.15 * this.index / 4) ** this.index
            * this.data.costExponent ** this.level;
        this.available = available;
        this.requiredRank = requiredRank;
        this.affordable = lumi >= this.nextCost;
    }

    getImageData(): ImageData {
        return { location: `MenaIconP${this.index}`, width: 42, height: 55 };
    }
    getPercentageMultiplier(): number {
        return getMenageriePercentageMultiplier(this.effect);
    }


    getDescriptionEffect(effect: number, placeholder: '{' | '}'): number {
        return placeholder === '}' ? getMenageriePercentageMultiplier(effect) : effect;
    }

    static fromBase(data: MenagerieBonusBase[]): MenagerieBonus[] {
        return data.map(bonus => new MenagerieBonus(bonus.index, bonus.data));
    }
}

export interface MenagerieProgression {
    lumi: number;
    shells: number;
    rank: number;
    shellThreshold: number;
    shellRankReady: boolean;
    lumiPerHour: number;
}

export interface MenagerieResourceBalances {
    blackStarsOwned: number;
    organicLabels: number;
    mineheadDoublersOwned: number;
    mineheadDoublers: number;
    sushiDoublersOwned: number;
    sushiDoublers: number;
    jellyOperatorDoublersOwned: number;
    jellyOperatorDoublers: number;
}
export type MenagerieUsableResource = "blackStarsOwned" | "organicLabels" | "mineheadDoublers" | "sushiDoublers" | "jellyOperatorDoublers";

export interface MenagerieMissionAvailability {
    baseline: number;
    menagerieBonus: number;
    researchBonus: number;
    jadeEmporium: number;
    bankBundle: number;
    missionLimit: number;
}

export interface MenagerieLumiInputs {
    coralKidBonus10: number;
    superbitType69: number;
    arcadeBonus73: number;
    ninjaEmporium47: number;
    menagerieBonus1: number;
    researchBonus165: number;
    bankBundleK: number;
    bankBundleL: number;
    bankBundleM: number;
    purpleJellyBonus: number;
    clamWorkBonus8: number;
    crucibleBonus4: number;
    crucibleBonus14: number;
    yellowConstructionBonus: number;
    atomBonus16: number;
    zenithMarketBonus11: number;
    dancingCoralBonus6: number;
    lumiVialBonus: number;
    researchBonus164: number;
    cardLevel: number;
}

export interface MenagerieLumiSaveInputs {
    purpleJellyBonus: number;
    yellowConstructionBonus: number;
    crucibleBonus4: number;
    crucibleBonus14: number;
}


export class Menagerie extends Domain {
    missions: MenagerieMission[] = [];
    unlocks: MenagerieUnlock[] = [];
    bonuses: MenagerieBonus[] = [];
    lumiBalance = 0;
    shellBalance = 0;
    rank = 0;
    lumiPerHour = 0;
    isAvailable = true;
    availableMissionCount = 0;
    availableUnlockCount = 0;
    availableBonusCount = 0;
    missionAvailability: MenagerieMissionAvailability = {
        baseline: 1,
        menagerieBonus: 0,
        researchBonus: 0,
        jadeEmporium: 0,
        bankBundle: 0,
        missionLimit: 0,
    };
    private lumiInputs: MenagerieLumiInputs = {
        coralKidBonus10: 0,
        superbitType69: 0,
        arcadeBonus73: 0,
        ninjaEmporium47: 0,
        menagerieBonus1: 0,
        researchBonus165: 0,
        bankBundleK: 0,
        bankBundleL: 0,
        bankBundleM: 0,
        purpleJellyBonus: 0,
        clamWorkBonus8: 0,
        crucibleBonus4: 0,
        crucibleBonus14: 0,
        yellowConstructionBonus: 0,
        atomBonus16: 0,
        zenithMarketBonus11: 0,
        dancingCoralBonus6: 0,
        lumiVialBonus: 0,
        researchBonus164: 0,
        cardLevel: 0,
    };
    private mineheadDoubledUpgradeIds = new Set<number>();
    private sushiDoubledUpgradeIds = new Set<number>();
    private jellyOperatorDoubledUpgradeIds = new Set<number>();
    private consumedDoublerCounts: [number, number, number] = [0, 0, 0];
    private purpleJellyBonus = 0;
    private yellowConstructionBonus = 0;
    private savedCrucibleWave = 0;
    private resourceBalances: MenagerieResourceBalances = {
        blackStarsOwned: 0,
        organicLabels: 0,
        mineheadDoublersOwned: 0,
        mineheadDoublers: 0,
        sushiDoublersOwned: 0,
        sushiDoublers: 0,
        jellyOperatorDoublersOwned: 0,
        jellyOperatorDoublers: 0,
    };

    getRawKeys(): RawData[] {
        return [
            { key: "Menagerie", perPlayer: false, default: [] },
            { key: "OptLacc", perPlayer: false, default: [] },
            { key: "Research", perPlayer: false, default: [] },
            { key: "Divinity", perPlayer: false, default: [] },
            { key: "Cards1", perPlayer: false, default: [] },
            { key: "GreenStacks", perPlayer: false, default: [] },
            { key: "Holes", perPlayer: false, default: [] },
            { key: "FarmCrop", perPlayer: false, default: [] },
            { key: "KRbest", perPlayer: false, default: {} },
            { key: "Spelunk", perPlayer: false, default: [] },
            { key: "Ninja", perPlayer: false, default: [] },
        ];
    }

    init(_allItems: Item[], _charCount: number): Menagerie {
        this.missions = MenagerieMission.fromBase(initMenagerieMissionRepo());
        this.unlocks = MenagerieUnlock.fromBase(initMenagerieUnlockRepo());
        this.bonuses = MenagerieBonus.fromBase(initMenagerieBonusRepo());
        this.crucibleThresholds = initRandoListRepo()[115].data.elements;
        return this;
    }

    parse(data: Map<string, unknown>): void {
        const menagerie = data.get(this.getDataKey()) as Menagerie;
        const savedMenagerie = data.get("Menagerie") as (number | string)[][] | undefined;
        const savedMissionClaims = savedMenagerie?.[1] ?? [];
        menagerie.missions.forEach(mission => mission.parse(Number(savedMissionClaims[mission.index] ?? 0)));
        menagerie.lumiBalance = Number(savedMenagerie?.[0]?.[0] ?? 0);
        menagerie.shellBalance = Number(savedMenagerie?.[0]?.[1] ?? 0);
        menagerie.rank = Number(savedMenagerie?.[0]?.[2] ?? 0);
        menagerie.purpleJellyBonus = Number(savedMenagerie?.[0]?.[4] ?? 0);
        menagerie.yellowConstructionBonus = 3 * Number(savedMenagerie?.[0]?.[14] ?? 0);
        menagerie.savedTomeRank = menagerie.rank;
        const savedUnlocks = savedMenagerie?.[2] ?? [];
        menagerie.unlocks.forEach(unlock => unlock.parse(Number(savedUnlocks[unlock.index] ?? 0)));
        const savedBonusLevels = savedMenagerie?.[3] ?? [];
        menagerie.totalMenagerieBonusLevels = savedBonusLevels.reduce<number>((total, level) => total + Number(level), 0);
        menagerie.bonuses.forEach(bonus => bonus.parse(Number(savedBonusLevels[bonus.index] ?? 0)));
        const options = data.get("OptLacc") as number[];
        menagerie.savedCrucibleWave = Number(options[628]);
        const research = data.get("Research") as number[][];
        const divinity = data.get("Divinity") as number[];
        const cardData = data.get("Cards1") as unknown[];
        const greenStacks = data.get("GreenStacks") as unknown[];
        const spelunk = data.get("Spelunk") as (number | string)[][];
        const mineheadDoubledUpgradeIds = spelunk[51] ?? [];
        const sushiDoubledUpgradeIds = spelunk[52] ?? [];
        const jellyOperatorDoubledUpgradeIds = spelunk[53] ?? [];
        menagerie.mineheadDoubledUpgradeIds = new Set(mineheadDoubledUpgradeIds.map(Number));
        menagerie.sushiDoubledUpgradeIds = new Set(sushiDoubledUpgradeIds.map(Number));
        menagerie.jellyOperatorDoubledUpgradeIds = new Set(jellyOperatorDoubledUpgradeIds.map(Number));
        menagerie.consumedDoublerCounts = [
            mineheadDoubledUpgradeIds.length,
            sushiDoubledUpgradeIds.length,
            jellyOperatorDoubledUpgradeIds.length,
        ];
        const holes = data.get("Holes") as number[][];
        const crops = data.get("FarmCrop") as object;
        const killroy = data.get("KRbest") as Record<string, number>;
        const ninja = data.get("Ninja") as number[][];
        const ninjaBossKillCounts = ninja[105];
        menagerie.deathnoteBossPoints = ninjaBossKillCounts.reduce((total, kills) => {
            const bossRank = kills < 100 ? 0
                : kills < 250 ? 1
                    : kills < 1_000 ? 2
                        : kills < 5_000 ? 3
                            : kills < 25_000 ? 4
                                : kills < 100_000 ? 5
                                    : kills < 1_000_000 ? 7
                                        : 10;
            return total + bossRank;
        }, 0);
        menagerie.greenStackCount = greenStacks.length;
        menagerie.depthProgress = Math.round([...spelunk[47], ...spelunk[1]].reduce<number>((total, depth) => total + Number(depth), 0));
        menagerie.summoningBossKills = Math.round(Object.entries(killroy).reduce<number>((total, [key, value]) => key.includes("SummzTrz") ? total + Number(value) : total, 0));
        

        menagerie.missions.forEach(mission => {
            switch (mission.index) {
                case 1: mission.progress = Number(options[232]); break;
                case 4: mission.progress = Number(options[319]); break;
                case 8: mission.progress = Number(options[464]); break;
                case 14: mission.progress = Number(options[594]); break;
                case 22: mission.progress = Number(options[369]); break;
                case 6: mission.progress = Math.round(Number(divinity[25]) - 10); break;
                case 9: mission.progress = Number(research[7]?.[4]); break;
                case 11: mission.progress = Number(research[7]?.[9]); break;
                case 19: mission.progress = cardData.length; break;
                case 23: mission.progress = Math.round(Number(holes[11][1]) + Number(holes[11][3]) + Number(holes[11][5]) + Number(holes[11][7])); break;
                case 25: mission.progress = Math.round(Number(options[262]) - 9); break;
                case 26: mission.progress = Math.round(Number(options[279]) - 11); break;
                case 32: mission.progress = Math.round(Object.entries(killroy).reduce((total, [key, value]) => key.includes("SummzTrz") ? total : total + Number(value), 0)); break;
            }
        });

        menagerie.cropCount = crops == null ? null : Object.keys(crops).length;
    }

    private cropCount: number | null = null;
    private crucibleThresholds: string[] = [];
    private greenStackCount = 0;
    private depthProgress = 0;
    private summoningBossKills = 0;
    savedTomeRank = 0;
    totalMenagerieBonusLevels = 0;
    private deathnoteBossPoints = 0;

    getShellImageData(): ImageData {
        return { location: "MenaShell1", width: 54, height: 52 };
    }

    getLumiImageData(): ImageData {
        return { location: "LumiCurrency", width: 14, height: 14 };
    }

    getMissions(): MenagerieMission[] {
        return this.missions;
    }

    getUnlocks(): MenagerieUnlock[] {
        return this.unlocks;
    }

    getBonuses(): MenagerieBonus[] {
        return this.bonuses;
    }

    getBonusValue(index: number): number {
        return this.bonuses[index].effect;
    }
    getBonusMultiplier(index: number): number {
        return this.bonuses[index].getPercentageMultiplier();
    }


    getProgression(): MenagerieProgression {
        const shellThreshold = Math.round(Math.min(
            15,
            1
                + Math.min(1, Math.floor(this.rank / 3))
                + Math.min(1, Math.floor(this.rank / 1))
                + Math.min(8, Math.floor(Math.max(0, this.rank - 5) / 5))
                + Math.min(1, Math.floor(this.rank / 8))
                + Math.min(2, Math.floor(this.rank / 22)),
        ));
        return {
            lumi: this.lumiBalance,
            shells: this.shellBalance,
            rank: this.rank,
            shellThreshold,
            shellRankReady: this.shellBalance >= shellThreshold,
            lumiPerHour: this.lumiPerHour,
        };
    }

    getResourceBalances(): MenagerieResourceBalances {
        return { ...this.resourceBalances };
    }
    getUsableResourceImageData(resource: MenagerieUsableResource): ImageData {
        const imageData: Record<MenagerieUsableResource, ImageData> = {
            blackStarsOwned: { location: "MenaBlackStar", width: 18, height: 17 },
            organicLabels: { location: "MenaOrganicLabelSeal", width: 29, height: 29 },
            mineheadDoublers: { location: "MenaMineheadDoubler", width: 32, height: 32 },
            sushiDoublers: { location: "MenaSushiDoubler", width: 32, height: 22 },
            jellyOperatorDoublers: { location: "MenaJellyOperatorDoublerIcon", width: 40, height: 36 },
        };
        return imageData[resource];
    }

    isMineheadUpgradeDoubled(index: number): boolean {
        return this.mineheadDoubledUpgradeIds.has(index);
    }

    isSushiUpgradeDoubled(index: number): boolean {
        return this.sushiDoubledUpgradeIds.has(index);
    }

    isJellyOperatorUpgradeDoubled(index: number): boolean {
        return this.jellyOperatorDoubledUpgradeIds.has(index);
    }

    getMissionAvailability(): MenagerieMissionAvailability {
        return { ...this.missionAvailability };
    }

    getLumiInputs(): MenagerieLumiInputs {
        return { ...this.lumiInputs };
    }

    getLumiSaveInputs(): MenagerieLumiSaveInputs {
        let crucibleArenaLevel = 0;
        if (this.unlocks[8].owned) {
            while (crucibleArenaLevel < 16 && this.savedCrucibleWave >= Number(this.crucibleThresholds[crucibleArenaLevel])) {
                crucibleArenaLevel++;
            }
        }

        return {
            purpleJellyBonus: this.purpleJellyBonus,
            yellowConstructionBonus: this.yellowConstructionBonus,
            crucibleBonus4: Number(crucibleArenaLevel > 4),
            crucibleBonus14: Number(crucibleArenaLevel > 14),
        };
    }

    prepare(accountData: Map<string, unknown>): void {
        const account = accountData.get("account") as {
            hasBundleL: boolean;
            hasBundleM: boolean;
        };
        const bankBundleL = Number(account.hasBundleL);
        const bankBundleM = Number(account.hasBundleM);

        this.availableUnlockCount = Math.round(
            Math.min(7, this.rank) + Math.floor(Math.max(0, this.rank - 7) / 2),
        );
        this.availableBonusCount = Math.round(
            Math.min(6, this.rank) + Math.floor(Math.max(0, this.rank - 6) / 2),
        );
        const getRequiredRank = (index: number, unlock: boolean): number => {
            let rank = 0;
            let count = 0;
            while (count <= index) {
                count = Math.round(unlock
                    ? Math.min(7, rank) + Math.floor(Math.max(0, rank - 7) / 2)
                    : Math.min(6, rank) + Math.floor(Math.max(0, rank - 6) / 2));
                if (count <= index) rank += 1;
            }
            return rank;
        };
        this.unlocks.forEach(unlock => {
            unlock.update(
                unlock.index < this.availableUnlockCount,
                this.lumiBalance,
                getRequiredRank(unlock.index, true),
            );
        });
        this.bonuses.forEach(bonus => {
            bonus.update(
                bonus.index < this.availableBonusCount,
                this.lumiBalance,
                getRequiredRank(bonus.index, false),
            );
        });

        const mineheadDoublersOwned = Math.round(this.getBonusValue(8) + 3 * bankBundleL);
        const sushiDoublersOwned = Math.round(this.getBonusValue(10) + 3 * bankBundleL);
        const jellyOperatorDoublersOwned = Math.round(this.getBonusValue(12) + 3 * bankBundleL);
        this.resourceBalances = {
            blackStarsOwned: Math.round(this.getBonusValue(2) + 4 * bankBundleM),
            organicLabels: Math.round(this.getBonusValue(6)),
            mineheadDoublersOwned,
            mineheadDoublers: Math.round(mineheadDoublersOwned - this.consumedDoublerCounts[0]),
            sushiDoublersOwned,
            sushiDoublers: Math.round(sushiDoublersOwned - this.consumedDoublerCounts[1]),
            jellyOperatorDoublersOwned,
            jellyOperatorDoublers: Math.round(jellyOperatorDoublersOwned - this.consumedDoublerCounts[2]),
        };
    }

    update(accountData: Map<string, unknown>): void {
        const tome = accountData.get("tome") as { totalAccountLevel: number; totalBestWorshipWaves: number; getHighestScore(): number };
        const spelunking = accountData.get("spelunking") as { bestDepthTotal: number; manic: { totalDepth: number } };
        const farming = accountData.get("farming") as { getTotalStickers(): number };
        const cooking = accountData.get("cooking") as { meals: { level: number }[] };
        const sushi = accountData.get("sushi") as { getUniqueSushi(): number };
        const hole = accountData.get("hole") as { opalLedger: { earned: number } };
        const gaming = accountData.get("gaming") as {
            reclaimedCrownCount: number;
            bits: number;
            palette: { totalLevels: number };
            isSuperbitPurchased(index: number): boolean;
        };
        const bubba = accountData.get("bubba") as { ownedMegaflesh: number };
        const summoning = accountData.get("summoning") as { summonBattles: { allVictories: number[] } };
        const sailing = accountData.get("sailing") as { artifacts: { status: number }[] };
        const sigils = accountData.get("sigils") as { sigils: { boostLevel: number }[] };
        const printer = accountData.get("printer") as { samples: { item: string; quantity: number }[][] };
        const slab = accountData.get("slab") as { registeredItemCount: number };

        const worship = accountData.get("worship") as { totemInfo: { maxWave: number }[] };
        const research = accountData.get("research") as { getBonusForId(index: number, mode?: number): number };
        const sneaking = accountData.get("sneaking") as { jadeUpgrades: { index: number; purchased: boolean }[] };
        const account = accountData.get("account") as {
            hasBankBundle: boolean;
            hasBundleL: boolean;
            hasBundleM: boolean;
        };
        const coralKid = accountData.get("coralKid") as { getLumiGenerationBonus(): number };
        const arcade = accountData.get("arcade") as { bonuses: { getBonus(): number }[] };
        const clamworks = accountData.get("clamworks") as { isBonusUnlocked(index: number): boolean };
        const collider = accountData.get("collider") as { atoms: { getBonus(): number }[] };
        const zenithMarket = accountData.get("zenithMarket") as { getBonusForId(index: number): number };
        const dancingCoral = accountData.get("dancingCoral") as {
            getLumiBonusFromIndex(index: number): number;
        };
        const alchemy = accountData.get("alchemy") as { getVialBonusForKey(bonusKey: string): number };
        const cards = accountData.get("cards") as { id: string; getLevels(): number }[];
        const bankBundleK = Number(account.hasBankBundle);
        const bankBundleL = Number(account.hasBundleL);
        const bankBundleM = Number(account.hasBundleM);
        const jadeUpgrade47 = sneaking.jadeUpgrades.find(upgrade => upgrade.index === 47)!;
        const researchMissionBonus = research.getBonusForId(164, 1);
        this.missionAvailability = {
            baseline: 1,
            menagerieBonus: this.getBonusValue(0),
            researchBonus: researchMissionBonus,
            jadeEmporium: Number(jadeUpgrade47.purchased),
            bankBundle: 3 * bankBundleK,
            missionLimit: this.missions.length,
        };
        this.availableMissionCount = Math.round(Math.min(
            this.missionAvailability.missionLimit,
            this.missionAvailability.baseline
                + this.missionAvailability.menagerieBonus
                + this.missionAvailability.researchBonus
                + this.missionAvailability.jadeEmporium
                + this.missionAvailability.bankBundle,
        ));
        const savedLumiInputs = this.getLumiSaveInputs();
        this.lumiInputs = {
            coralKidBonus10: coralKid.getLumiGenerationBonus(),
            superbitType69: Number(gaming.isSuperbitPurchased(69)),
            arcadeBonus73: arcade.bonuses[73].getBonus(),
            ninjaEmporium47: Number(jadeUpgrade47.purchased),
            menagerieBonus1: this.getBonusValue(1),
            researchBonus165: research.getBonusForId(165),
            bankBundleK,
            bankBundleL,
            bankBundleM,
            purpleJellyBonus: savedLumiInputs.purpleJellyBonus,
            clamWorkBonus8: Number(clamworks.isBonusUnlocked(8)),
            crucibleBonus4: savedLumiInputs.crucibleBonus4,
            crucibleBonus14: savedLumiInputs.crucibleBonus14,
            yellowConstructionBonus: savedLumiInputs.yellowConstructionBonus,
            atomBonus16: collider.atoms[16].getBonus(),
            zenithMarketBonus11: zenithMarket.getBonusForId(11),
            dancingCoralBonus6: dancingCoral.getLumiBonusFromIndex(6),
            lumiVialBonus: alchemy.getVialBonusForKey("7lumiadd"),
            researchBonus164: research.getBonusForId(164),
            cardLevel: cards.find(card => card.id === "w7b10")!.getLevels(),
        };

        if (this.rank === 0) {
            this.lumiPerHour = 0;
        } else {
            const lumiInputs = this.lumiInputs;
            const additivePool = lumiInputs.purpleJellyBonus
                + (25 * lumiInputs.clamWorkBonus8
                    + (10 * lumiInputs.crucibleBonus4
                        + (25 * lumiInputs.crucibleBonus14
                            + (lumiInputs.yellowConstructionBonus
                                + (lumiInputs.atomBonus16
                                    + (lumiInputs.zenithMarketBonus11
                                        + (lumiInputs.dancingCoralBonus6
                                            + (lumiInputs.lumiVialBonus
                                                + (lumiInputs.researchBonus164 + Math.min(5 * lumiInputs.cardLevel, 50))))))))));
            this.lumiPerHour = 10
                * (1 + lumiInputs.coralKidBonus10 / 100)
                * (1 + Math.min(0.25, lumiInputs.superbitType69))
                * (1 + lumiInputs.arcadeBonus73 / 100)
                * (1 + 10 * lumiInputs.ninjaEmporium47 / 100)
                * (1 + lumiInputs.menagerieBonus1 * this.rank / 100)
                * (1 + lumiInputs.researchBonus165 / 100)
                * (1 + lumiInputs.bankBundleK)
                * (1 + 2 * lumiInputs.bankBundleL)
                * (1 + 2 * lumiInputs.bankBundleM)
                * (1 + additivePool / 100);
        }

        this.missions.forEach(mission => {
            switch (mission.index) {
                case 0: mission.progress = tome.totalAccountLevel; break;
                case 2: mission.progress = this.depthProgress; break;
                case 3: mission.progress = this.cropCount as number; break;
                case 5: mission.progress = worship.totemInfo.reduce((total, totem) => total + totem.maxWave, 0); break;
                case 7: mission.progress = cooking.meals[0].level; break;
                case 10: mission.progress = sushi.getUniqueSushi(); break;
                case 12: mission.progress = hole.opalLedger.earned; break;
                case 13: mission.progress = (accountData.get("glimbo") as { totalTrades: number }).totalTrades; break;
                case 15: mission.progress = farming.getTotalStickers(); break;
                case 16: mission.progress = tome.getHighestScore(); break;
                case 17: mission.progress = gaming.reclaimedCrownCount; break;
                case 20: {
                    const copperSample = printer.samples.flat().find(sample => sample.item === "Copper");
                    mission.progress = copperSample ? Math.ceil(Math.log10(copperSample.quantity)) : 0;
                    break;
                }
                case 21: mission.progress = this.greenStackCount; break;
                case 24: mission.progress = Math.floor(Math.log10(gaming.bits)); break;
                case 27: mission.progress = Math.round(bubba.ownedMegaflesh - 11); break;
                case 28: mission.progress = Math.round(gaming.palette.totalLevels); break;
                case 29: mission.progress = this.summoningBossKills; break;
                case 18: mission.progress = Math.round(sailing.artifacts.reduce((total, artifact) => total + Math.max(0, artifact.status), 0)); break;
                case 30: mission.progress = this.deathnoteBossPoints; break;
                case 31: mission.progress = Math.round(sigils.sigils.reduce((sum, sigil) => sum + sigil.boostLevel + 1, 0)); break;
            }
        });
        this.missions.forEach(mission => mission.update(
            mission.progress,
            mission.index < this.availableMissionCount,
        ));
    }
}

export const updateMenagerieMissions = (accountData: Map<string, unknown>): void => {
    (accountData.get("menagerie") as Menagerie).update(accountData);
};

export const prepareMenagerie = (accountData: Map<string, unknown>): void => {
    const menagerie = accountData.get("menagerie") as Menagerie;
    menagerie.prepare(accountData);

    const minehead = accountData.get("minehead") as {
        prepareMenagerieDoublerSelections(menagerie: Menagerie): void;
    };
    const sushi = accountData.get("sushi") as {
        prepareMenagerieDoublerSelections(menagerie: Menagerie): void;
    };
    const jellyOperator = accountData.get("jellyOperator") as {
        prepareMenagerieDoublerSelections(menagerie: Menagerie): void;
    };
    minehead.prepareMenagerieDoublerSelections(menagerie);
    sushi.prepareMenagerieDoublerSelections(menagerie);
    jellyOperator.prepareMenagerieDoublerSelections(menagerie);
};

