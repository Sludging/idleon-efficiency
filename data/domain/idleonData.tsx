import parseTraps from './traps';
import parseStamps from './stamps';
import parseStatues from './statues';
import parsePlayers, { Player } from './player';
import parseAlchemy from './alchemy';
import parseBribes from './bribes';
import parseGuild from './guild';
import parseGems from './gemPurchases';
import parseAchievements from './achievements';
import parseLooty from './lootyTracker';
import parseShrines from './shrines';
import { initAllItems, Item } from './items';
import parseStorage from './storage';
import parseQuests from './quests';
import parsePrayers from './prayers';
import parseRefinery from './refinery';
import parseSaltLick from './saltLick';
import parsePrinter from './printer';
import parseDeathnote from './deathnote';
import parseTaskboard from './tasks';
import { Cloudsave } from './cloudsave';
import parseWorship from './worship';
import parseConstruction from './construction';
import parseCards from './cards';
import parseArcade from './arcade';
import parseObols from './obols';
import { parseFamily } from './family';
import { parseDungeons } from './dungeons';

export class IdleonData {
    private data: Map<string, any>
    private lastUpdated?: Date

    constructor(data: Map<string, any>, lastUpdated?: Date) {
        this.data = data;
        this.lastUpdated = lastUpdated;
    }

    public getData = () => {
        return this.data;
    }

    public getLastUpdated = (raw: boolean = false) => {
        if (raw) {
            return this.lastUpdated;
        }
        if (this.lastUpdated) {
            const resolvedFormat = Intl.DateTimeFormat().resolvedOptions();
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric", month: "numeric", day: "numeric",
                hour: "numeric", minute: "numeric", second: "numeric",
                hour12: resolvedFormat.hour12,
                timeZone: resolvedFormat.timeZone
            };
            return Intl.DateTimeFormat(resolvedFormat.locale, options).format(this.lastUpdated);
        }

        return "";
    }
}

const keyFunctionMap: Record<string, Function> = {
    "stamps": (doc: Cloudsave, charCount: number) => parseStamps(doc.get("StampLv"), doc.get("StampLvM")),
    "traps": (doc: Cloudsave, charCount: number) => parseTraps([...Array(charCount)].map((_, i) => { return doc.get(`PldTraps_${i}`) })),
    "statues": (doc: Cloudsave, charCount: number) => parseStatues([...Array(charCount)].map((_, i) => { try { return JSON.parse(doc.get(`StatueLevels_${i}`)) } catch (e) { console.log("Statues", i, doc.get(`StatueLevels_${i}`)); throw e } }), JSON.parse(doc.get(`StuG`))),
    "timeAway": (doc: Cloudsave, charCount: number) => JSON.parse(doc.get('TimeAway')),
    "cauldronBubbles": (doc: Cloudsave, charCount: number) => doc.get('CauldronBubbles'),
    "cards": (doc: Cloudsave, charCount: number) => parseCards(JSON.parse(doc.get('Cards0'))),
    "players": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parsePlayers(doc, accountData, allItems),
    "alchemy": (doc: Cloudsave, allItems: Item[], charCount: number) => parseAlchemy(doc.get("CauldronInfo"), doc.get("CauldUpgLVs"), allItems),
    "bribes": (doc: Cloudsave, charCount: number) => parseBribes(doc.get("BribeStatus")),
    "guild": (doc: Cloudsave, charCount: number) => parseGuild(JSON.parse(doc.get("Guild"))),
    "gems": (doc: Cloudsave, charCount: number) => parseGems(JSON.parse(doc.get('GemItemsPurchased'))),
    "achievements": (doc: Cloudsave, charCount: number) => parseAchievements(JSON.parse(doc.get('AchieveReg')), JSON.parse(doc.get('SteamAchieve'))),
    "lootyData": (doc: Cloudsave, allItems: Item[], charCount: number) => parseLooty(JSON.parse(doc.get("Cards1")), allItems),
    "rawData": (doc: Cloudsave, charCount: number) => doc.toJSON(),
    "POExtra": (doc: Cloudsave, charCount: number) => {
        return {
            streak: doc.get("CYDeliveryBoxStreak"),
            complete: doc.get("CYDeliveryBoxComplete"),
            misc: doc.get("CYDeliveryBoxMisc"),
        }
    },
    "shrines": (doc: Cloudsave, charCount: number) => parseShrines(JSON.parse(doc.get("Shrine"))),
    "storage": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parseStorage(doc, accountData.get("playerNames"), allItems, JSON.parse(doc.get("InvStorageUsed"))),
    "constellations": (doc: Cloudsave, charCount: number) => JSON.parse(doc.get("SSprog")),
    "quests": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parseQuests(doc, accountData, allItems),
    "prayers": (doc: Cloudsave, charCount: number) => parsePrayers(JSON.parse(doc.get("PrayOwned"))),
    "refinery": (doc: Cloudsave, charCount: number) => parseRefinery(JSON.parse(doc.get("Refinery"))),
    "saltLick": (doc: Cloudsave, charCount: number) => parseSaltLick(JSON.parse(doc.get("SaltLick"))),
    "printer": (doc: Cloudsave, charCount: number) => parsePrinter(JSON.parse(doc.get("Print")), charCount),
    "deathnote": (doc: Cloudsave, charCount: number) => parseDeathnote([...Array(charCount)].map((_, i) => { return doc.get(`KLA_${i}`) })),
    "taskboard": (doc: Cloudsave, charCount: number) => parseTaskboard(JSON.parse(doc.get(`TaskZZ0`)), JSON.parse(doc.get(`TaskZZ1`)), JSON.parse(doc.get(`TaskZZ2`)), JSON.parse(doc.get(`TaskZZ3`)), doc.get(`TaskZZ4`), doc.get(`TaskZZ5`)),
    "worship": (doc: Cloudsave, accountData: Map<string, any>, charCount: number) => parseWorship(JSON.parse(doc.get("TotemInfo")), accountData),
    "construction": (doc: Cloudsave, charCount: number) => parseConstruction(JSON.parse(doc.get("Tower"))),
    "arcade": (doc: Cloudsave, charCount: number) => parseArcade(JSON.parse(doc.get("ArcadeUpg")), doc.get("OptLacc")),
    "obols": (doc: Cloudsave, allItems: Item[], charCount: number) => parseObols(doc, charCount, allItems),
    "dungeons": (doc: Cloudsave, charCount: number) => parseDungeons(JSON.parse(doc.get("DungUpg")), doc.get("OptLacc")),
}

const postProcessingMap: Record<string, Function> = {
    "family": (doc: Cloudsave, accountData: Map<string, any>) => parseFamily(accountData.get("players") as Player[]),
}

export const updateIdleonData = async (data: Cloudsave, charNames: string[], allItems: Item[], serverVars: Record<string, any>, isStatic: boolean = false) => {
    let accountData = new Map();
    accountData.set("playerNames", charNames);
    accountData.set("itemsData", allItems);
    accountData.set("servervars", serverVars);
    Object.entries(keyFunctionMap).forEach(([key, toExecute]) => {
        try {
            if (key == "players" || key == "storage" || key == "quests") {
                accountData.set(key, toExecute(data, accountData, allItems, charNames.length));
            }
            else if (key == "worship") {
                accountData.set(key, toExecute(data, accountData, charNames.length));
            }
            else if (key == "lootyData" || key == "obols" || key == "alchemy") {
                accountData.set(key, toExecute(data, allItems, charNames.length));
            }
            else {
                accountData.set(key, toExecute(data, charNames.length));
            }
        }
        catch (e) {
            console.debug(e);
            console.log(`Failed parsing ${key}`);
            accountData.set(key, undefined);
        }
    })

    // Do post parse processing.
    Object.entries(postProcessingMap).forEach(([key, toExecute]) => {
        try {
            accountData.set(key, toExecute(data, accountData));
        }
        catch (e) {
            console.debug(e);
            console.log(`Failed post-processing ${key}`);
            accountData.set(key, undefined);
        }
    })

    const saveGlobalTime = JSON.parse(data.get("TimeAway"))["GlobalTime"] as number;
    const lastUpdated = isStatic ? new Date(saveGlobalTime * 1000) : new Date()
    const newData = new IdleonData(accountData, lastUpdated);

    return newData;
}