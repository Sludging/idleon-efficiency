import { GroupByFunction, range } from "../utility";
import { Arcade } from "./world-2/arcade";
import { Domain, RawData } from "./base/domain";
import { Construction, Library } from "./world-3/construction/construction";
import { initTalentNameRepo } from "./data/TalentNameRepo";
import { AFKTypeEnum } from "./enum/aFKTypeEnum";
import { Item } from "./items";
import { Player } from "./player";
import { Quests } from "./quests";
import { Storage } from "./storage";
import { WeeklyBoss } from "./weekly-boss";
import { FractIslandBonusesThresholds } from "./world-2/islandExpedition";

// Option List Indexes:
// 15 = Colo1 Tix
// 35 = Colo2 Tix
// 56 = Colo3 Tix
// 16 = Boss1 Keys
// 31 = Boss2 Keys 
// 80 = Boss3 Keys

const BOSS_KEYS_MAX_DAYS = 3;

// Verbose name for basicially which index in account option list stores the days since last pick up of keys.
const daysSincePickupBossIndexMap: Record<string, number> = {
    "Key1": 16,
    "Key2": 31,
    "Key3": 80
}

const bossKeyNPCName: Record<string, string> = {
    "Key1": "Dog_Bone",
    "Key2": "Djonnut",
    "Key3": "Bellows"
}

const dialogReqForKey: Record<string, number> = {
    "Key1": 5,
    "Key2": 5,
    "Key3": 8.5
}
export class Key {
    daysSincePickup: number = 0;
    amountPerDay: number = 0;
    constructor(public item: Item) { }

    keysAvailableForPickup = () => {
        // No NPC quest yet for Troll key.
        if (this.item.internalName == "Key4") {
            return 0
        }
        return Math.min(this.daysSincePickup, BOSS_KEYS_MAX_DAYS) * this.amountPerDay;
    }
}

export class Miniboss {
    currentCount: number = 0;
    daysToNext: number = 0;
    constructor(public bossInternalName: string, public daysSinceLastKill: number) {
        this.currentCount = this.getCurrentCount();
        this.daysToNext = this.getDaysToNext();
    }

    setDaysSinceLastKill = (daysSinceKill: number) => {
        this.daysSinceLastKill = daysSinceKill;
        this.currentCount = this.getCurrentCount();
        this.daysToNext = this.getDaysToNext();
    }

    getCurrentCount = (daysSinceKill: number = this.daysSinceLastKill) => {
        if (daysSinceKill < 3) {
            return 0;
        }

        switch (this.bossInternalName) {
            case "mini3a":
                return Math.min(10, Math.floor(Math.pow(daysSinceKill - 3, .55)));
            case "mini4a":
                return Math.min(8, Math.floor(Math.pow(daysSinceKill - 3, .5)));
            case "mini5a":
                return Math.min(6, Math.floor(Math.pow(daysSinceKill - 3, .5)));
            case "mini6a":
                return Math.min(6, Math.floor(Math.pow(daysSinceKill - 3, .5)));
            default:
                return -1;
        }
    }

    getMaxCount = () => {
        switch (this.bossInternalName) {
            case "mini3a":
                return 10;
            case "mini4a":
                return 8;
            case "mini5a":
                return 6;
            case "mini6a":
                return 6;
            default:
                return -1;
        }
    }

    getDaysToNext = () => {
        if (this.currentCount == this.getMaxCount()) {
            return Number.MAX_SAFE_INTEGER;
        }

        const daysTillNext = range(1, 100).find(value => {
            const countOnDay = this.getCurrentCount(this.daysSinceLastKill + value);
            if (countOnDay > this.currentCount) {
                return value;
            }
        })

        return daysTillNext ?? Number.MAX_SAFE_INTEGER;
    }
}

export class Account extends Domain {
    keys: Key[] = [];
    coloTickets: Item = Item.emptyItem("Colo Tickets");
    coloHighscores: number[] = [];
    minigameHighscores: number[] = [];
    library: Library = new Library();
    obolFragments: number = 0;
    miniBosses: Miniboss[] = [];
    totalMoney: number = 0;
    talentsMaxLevels: number[] = [];
    plunderousMobKills: number = 0;
    hasDeathBringerBundle: boolean = false;
    hasExplorerBundle: boolean = false;
    hasBankBundle: boolean = false;
    hasNoMealLeftBehindBundle: boolean = false;
    hasBundleL: boolean = false;
    hasBundleM: boolean = false;
    weeklyBoss: WeeklyBoss = new WeeklyBoss();
    movementSpeedBonusPercent: number = 0;
    spelunkingPowerBonus: number = 0;
    fractalIslandProgress: number = 0;
    island0Currency: number = 0;
    randomizerMonsterTargetsCompleted: number = 0;
    classExperienceShimmerCount: number = 0;
    classExperienceBonusPoints: number = 0;
    lifetimeFishCaught: number = 0;
    hasEquinoxBundle: boolean = false;
    wormholeEmperorProgress: number = 0;
    wraithOverlordProgress: number = 0;
    damageShimmerCount: number = 0;
    damageVaultProgress: number = 0;
    damageBonusPoints: number = 0;
    lateDamageBonusPoints: number = 0;
    damageMultiplierFloorInput: number = 0;
    damageExponentInput: number = 0;
    hasDamageMultiplierBundle: boolean = false;
    cavernDamageUpgradeLevel: number = 0;

    // corresponds to a.engine.getGameAttribute("CurrenciesOwned").h.TalentPoints
    talentPointsOwned: number[] = [];

    // Arcade
    arcadeMaxBalls: number = 0;
    arcadeBallsToClaim: number = 0;

    activity: Record<AFKTypeEnum, number> = {
        [AFKTypeEnum.Choppin]: 0,
        [AFKTypeEnum.Fighting]: 0,
        [AFKTypeEnum.Laboratory]: 0,
        [AFKTypeEnum.Catching]: 0,
        [AFKTypeEnum.Cooking]: 0,
        [AFKTypeEnum.Error]: 0,
        [AFKTypeEnum.Fishing]: 0,
        [AFKTypeEnum.Mining]: 0,
        [AFKTypeEnum.Divinity]: 0,
        [AFKTypeEnum.Nothing]: 0,
        [AFKTypeEnum.PayingRespect]: 0,
        [AFKTypeEnum.Spelunking]: 0,
    };
    getFractalIslandArtifactBonus(): number {
        return this.fractalIslandProgress >= 2500 ? 1 : 0;
    }

    isFractalStealthUnlocked(): boolean {
        return this.fractalIslandProgress >= FractIslandBonusesThresholds[6];
    }


    getRawKeys(): RawData[] {
        return [
            { key: "CYObolFragments", perPlayer: false, default: 0 },
            { key: "CYKeysAll", perPlayer: false, default: [] },
            { key: "CYColosseumTickets", perPlayer: false, default: 0 },
            { key: "FamValColosseumHighscores", perPlayer: false, default: [] },
            { key: "FamValMinigameHiscores", perPlayer: false, default: [] },
            { key: "CYTalentPoints", perPlayer: false, default: [] },
            { key: "WeeklyBoss", perPlayer: false, default: {} },
            { key: "SM_", perPlayer: true, default: {} },
        ]
    }

    init(allItems: Item[], _charCount: number) {
        this.miniBosses = [];
        this.miniBosses.push(new Miniboss("mini3a", 0));
        this.miniBosses.push(new Miniboss("mini4a", 0));
        this.miniBosses.push(new Miniboss("mini5a", 0));
        this.miniBosses.push(new Miniboss("mini6a", 0));

        allItems.filter(item => isBossKeyRegex().exec(item.internalName)).forEach((keyItem) => {
            const newKey = new Key(keyItem.duplicate());
            this.keys.push(newKey);
        })

        const coloItem = (allItems.find(item => item.internalName == "TixCol") as Item).duplicate();
        this.coloTickets = coloItem;

        return this;
    }

    parse(data: Map<string, any>): void {
        const account = data.get(this.getDataKey()) as Account;
        const optionList = data.get("OptLacc") as number[];
        const keyData = data.get("CYKeysAll") as number[];
        const colosseumHighscores = data.get("FamValColosseumHighscores") as number[];
        const minigamesHighscores = data.get("FamValMinigameHiscores") as number[];
        const obolFragments = data.get("CYObolFragments") as number;
        const talentPointsOwned = data.get("CYTalentPoints") as number[];
        const charCount = data.get("charCount") as number;

        account.plunderousMobKills = Number(optionList?.[139] ?? 0);
        account.obolFragments = Number(obolFragments);
        account.movementSpeedBonusPercent = Number(optionList?.[438] ?? 0);
        account.spelunkingPowerBonus = Number(optionList?.[500] ?? 0);
        account.fractalIslandProgress = Number(optionList?.[184] ?? 0);
        account.island0Currency = Number(optionList?.[161] ?? 0);
        account.randomizerMonsterTargetsCompleted = Number(optionList?.[338] ?? 0);
        account.classExperienceShimmerCount = Number(optionList?.[179] ?? 0);
        account.classExperienceBonusPoints = Number(optionList?.[421] ?? 0);
        account.lifetimeFishCaught = Number(optionList?.[345] ?? 0);
        account.wormholeEmperorProgress = Number(optionList?.[152] ?? 0);
        account.wraithOverlordProgress = Number(optionList?.[329] ?? 0);
        account.damageShimmerCount = Number(optionList?.[178] ?? 0);
        account.damageVaultProgress = Number(optionList?.[346] ?? 0);
        account.damageBonusPoints = Number(optionList?.[419] ?? 0);
        account.lateDamageBonusPoints = Number(optionList?.[435] ?? 0);
        account.damageMultiplierFloorInput = Number(optionList?.[232] ?? 0);
        account.damageExponentInput = Number(optionList?.[473] ?? 0);
        account.cavernDamageUpgradeLevel = Number(optionList?.[649] ?? 0);
        account.weeklyBoss.parse(optionList, data.get("WeeklyBoss") as Record<string, unknown>);
        const rawData = data.get("rawData") as Record<string, string | undefined>;
        const bundles: Record<string, string | number> = rawData.BundlesReceived === undefined
            ? {}
            : JSON.parse(rawData.BundlesReceived);
        account.hasDeathBringerBundle = Number(bundles.bun_v) === 1;
        account.hasExplorerBundle = Number(bundles.bun_p) === 1;
        account.hasNoMealLeftBehindBundle = Number(bundles.bun_s) === 1;
        account.hasEquinoxBundle = Number(bundles.bun_q) === 1;
        account.hasDamageMultiplierBundle = Number(bundles.bon_a) === 1;
        account.hasBankBundle = Number(bundles.ban_k) === 1;
        account.hasBundleL = Number(bundles.ban_l) === 1;
        account.hasBundleM = Number(bundles.ban_m) === 1;

        account.talentPointsOwned = [];
        talentPointsOwned.forEach((points) => {
            // Some values high enough can be stored as string
            account.talentPointsOwned.push(parseFloat(points.toString()));
        });

        keyData.forEach((keyCount, keyIndex) => {
            const keyItem = account.keys.find(key => key.item.internalName == `Key${keyIndex + 1}`)
            if (keyCount > 0 && keyItem) {
                keyItem.item.count = keyCount;
            }
        })

        account.coloTickets.count = data.get("CYColosseumTickets") as number;

        account.miniBosses.forEach(boss => {
            // W3 Mini Boss
            if (boss.bossInternalName == "mini3a") {
                boss.setDaysSinceLastKill(optionList[96] as number || 0);
            }
            // W4 Mini Boss
            if (boss.bossInternalName == "mini4a") {
                boss.setDaysSinceLastKill(optionList[98] as number || 0);
            }
            // W5 Mini Boss
            if (boss.bossInternalName == "mini5a") {
                boss.setDaysSinceLastKill(optionList[225] as number || 0);
            }
            // W6 Mini Boss
            if (boss.bossInternalName == "mini6a") {
                boss.setDaysSinceLastKill(optionList[226] as number || 0);
            }
        });

        account.coloHighscores = [];
        colosseumHighscores.forEach((score) => {
            // Some values high enough can be stored as string
            account.coloHighscores.push(parseFloat(score.toString()));
        });
        account.minigameHighscores = [];
        minigamesHighscores.forEach((score) => {
            // Some values high enough can be stored as string
            account.minigameHighscores.push(parseFloat(score.toString()));
        });

        account.talentsMaxLevels = [];
        const allTalents = initTalentNameRepo();
        const playerMaxLevelTalents = [...Array(charCount)].map((_, i) => data.get(`SM_${i}`));
        allTalents.forEach(talent => {
            let talentMaxlevel = 0;
            playerMaxLevelTalents.forEach(playerTalentsMaxLevels => {
                const playerTalentMaxLevel = playerTalentsMaxLevels[talent.index] ?? 0;
                if (talentMaxlevel < playerTalentMaxLevel) {
                    talentMaxlevel = playerTalentMaxLevel;
                }
            });
            account.talentsMaxLevels.push(talentMaxlevel);
        });
    }
}

const isBossKeyRegex = () => { return /Key(\d+)/g; };

export const updateAccount = (data: Map<string, any>) => {
    const account = data.get("account") as Account;
    const quests = data.get("quests") as Quests;
    const players = data.get("players") as Player[];
    const storage = data.get("storage") as Storage;
    const accountOptions = (data.get("rawData") as { [k: string]: any })["OptLacc"] as string | number[];
    const construction = data.get("construction") as Construction;
    const arcade = data.get("arcade") as Arcade;

    account.keys.forEach(key => {
        key.daysSincePickup = accountOptions[daysSincePickupBossIndexMap[key.item.internalName]] as number ?? 0;

        const npcName = bossKeyNPCName[key.item.internalName];
        const dialogReq = dialogReqForKey[key.item.internalName];
        key.amountPerDay = Object.entries(quests.dialogData).reduce((sum, [_, playerDialogs]) => sum += playerDialogs[npcName] > dialogReq ? 1 : 0, 0)
    });

    const enumKeys = Object.keys(AFKTypeEnum).filter((v) => isNaN(Number(v)))
    // Reset previous info.
    for (const key of enumKeys) {
        account.activity[key as keyof typeof AFKTypeEnum] = 0;
    }

    // Check how many players are in each activity type.
    GroupByFunction(players, function(player: Player) { return player.currentMonster && player.currentMonster.details ? player.currentMonster.details.AFKtype : undefined })
        .forEach(players => {
            const firstPlayer = players[0] ?? undefined;
            if (firstPlayer && firstPlayer.currentMonster && firstPlayer.currentMonster.details) {
                account.activity[firstPlayer.currentMonster.details.AFKtype] = players.length;
            }
            else {
                account.activity[AFKTypeEnum.Error] += players.length;
            }
        });

    // Copy library (or well, reference)
    account.library = construction.library;

    // Sum up your money
    account.totalMoney = storage.money + players.reduce((sum, player) => sum += player.money, 0);

    // Arcade
    account.arcadeMaxBalls = arcade.maxBalls;
    account.arcadeBallsToClaim = arcade.ballsToClaim;

    return account;
}
