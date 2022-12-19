import { range } from "../utility";
import { Arcade } from "./arcade";
import { Cloudsave } from "./cloudsave";
import { Construction, Library } from "./construction";
import { AFKTypeEnum } from "./enum/aFKTypeEnum";
import { Item } from "./items";
import { Activity, Player } from "./player";
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

    getCurrentCount = (daysSinceKill: number = this.daysSinceLastKill) => {
        if (daysSinceKill < 3) { 
            return 0;
        }
        
        switch(this.bossInternalName) {
            case "mini3a": 
                return Math.min(10, Math.floor(Math.pow(daysSinceKill - 3, .55)));
            case "mini4a": 
                return Math.min(8, Math.floor(Math.pow(daysSinceKill - 3, .5)));
            default:
                return -1;
        }
    }

    getMaxCount = () => {
        switch(this.bossInternalName) {
            case "mini3a": 
                return 10;
            case "mini4a": 
                return 8;
            default:
                return -1;
        }
    }

    getDaysToNext = () => {
        if ((this.bossInternalName == "mini3a" && this.currentCount == 10) || (this.bossInternalName == "mini4a" && this.currentCount == 8)) {
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

export class Account {
    keys: Key[] = [];
    coloTickets: Item = Item.emptyItem("Colo Tickets");
    library: Library = new Library();
    miniBosses: Miniboss[] = [];
    totalMoney: number = 0;
    
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
        [AFKTypeEnum.Nothing]: 0,
    };
}

export const parseAccount = (doc: Cloudsave, allItems: Item[]) => {
    const account = new Account();
    const accountOptions = doc.get("OptLacc") as string | number[];
    const keyData = doc.get("CYKeysAll") as number[];
    keyData.forEach((keyCount, keyIndex) => {
        if (keyCount > 0) {
            const keyItem = (allItems.find(item => item.internalName == `Key${keyIndex + 1}`) as Item).duplicate();
            keyItem.count = keyCount;
            const newKey = new Key(keyItem);
            account.keys.push(newKey);
        }
    })

    const coloItem = allItems.find(item => item.internalName == "TixCol") as Item;
    coloItem.count = doc.get("CYColosseumTickets") as number;
    account.coloTickets = coloItem;

    // W3 Mini Boss
    const daysSinceW3mini = accountOptions[96] as number || 0;
    account.miniBosses.push(new Miniboss("mini3a", daysSinceW3mini));

    // W4 Mini Boss
    const daysSinceW4mini = accountOptions[98] as number || 0;
    account.miniBosses.push(new Miniboss("mini4a", daysSinceW4mini));
    return account;
}

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


    // Check how many players are in each activity type.
    players.forEach(player => {
        if (player.currentMonster && player.currentMonster.details) {
            account.activity[player.currentMonster.details.AFKtype] += 1;
        }
        else {
            account.activity[AFKTypeEnum.Error] += 1;
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
