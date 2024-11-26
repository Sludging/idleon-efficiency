import { GroupByFunction, range } from "../utility";
import { Arcade } from "./arcade";
import { Domain, RawData } from "./base/domain";
import { Construction, Library } from "./construction";
import { initTalentNameRepo } from "./data/TalentNameRepo";
import { AFKTypeEnum } from "./enum/aFKTypeEnum";
import { safeJsonParse } from "./idleonData";
import { Item } from "./items";
import { Player } from "./player";
import { Quests } from "./quests";
import { Storage } from "./storage";

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
    miniBosses: Miniboss[] = [];
    totalMoney: number = 0;
    talentsMaxLevels: number[] = [];

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
    };

    getRawKeys(): RawData[] {
        return [
            {key: "CYKeysAll", perPlayer: false, default: []},
            {key: "CYColosseumTickets", perPlayer: false, default: 0},
            {key: "FamValColosseumHighscores", perPlayer: false, default: []},
            {key: "FamValMinigameHiscores", perPlayer: false, default: []},
            {key: "CYTalentPoints", perPlayer: false, default: []},
            {key: "SM_", perPlayer: true, default: {}},
        ]
    }

    init(allItems: Item[], charCount: number) {
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
        const talentPointsOwned = data.get("CYTalentPoints") as number[];
        const charCount = data.get("charCount") as number;

        account.talentPointsOwned = talentPointsOwned;

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

        account.coloHighscores = colosseumHighscores;
        account.minigameHighscores = minigamesHighscores;

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
    GroupByFunction(players, function (player: Player) { return player.currentMonster && player.currentMonster.details ? player.currentMonster.details.AFKtype : undefined })
        .forEach(players => {
            const firstPlayer = players[0] ?? undefined;
            if (firstPlayer && firstPlayer.currentMonster && firstPlayer.currentMonster.details) {
                account.activity[firstPlayer.currentMonster.details.AFKtype] = players.length;
            }
            else {
                account.activity[AFKTypeEnum.Error] += players.length;
            }
        })

    // Copy library (or well, reference)
    account.library = construction.library;

    // Sum up your money
    account.totalMoney = storage.money + players.reduce((sum, player) => sum += player.money, 0);

    // Arcade
    account.arcadeMaxBalls = arcade.maxBalls;
    account.arcadeBallsToClaim = arcade.ballsToClaim;

    return account;
}