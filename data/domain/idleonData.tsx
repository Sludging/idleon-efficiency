import parseTraps from './traps';
import parseStamps, { updateStamps } from './stamps';
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
import updateDeathnote from './deathnote';
import parseTaskboard from './tasks';
import { Cloudsave } from './cloudsave';
import parseWorship from './worship';
import parseConstruction from './construction';
import parseCards from './cards';
import parseArcade from './arcade';
import parseObols from './obols';
import { parseFamily } from './family';
import { parseDungeons } from './dungeons';
import { parseForge, updateForge } from './forge';
import { parseCooking, updateCooking } from './cooking';
import { parseLab, updateLab } from './lab';
import { parseBreeding, updateBreeding } from './breeding';


export const safeJsonParse = <T, >(doc: Cloudsave, key: string, emptyValue: T): T => {
    try {
        return JSON.parse(doc.get(key))
    }
    catch (e) {
        console.debug(key, doc.get(key))
    }
    return emptyValue;
}

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
    "statues": (doc: Cloudsave, charCount: number) => parseStatues([...Array(charCount)].map((_, i) => safeJsonParse(doc, `StatueLevels_${i}`, [])), safeJsonParse(doc, `StuG`, [])),
    "timeAway": (doc: Cloudsave, charCount: number) => JSON.parse(doc.get('TimeAway')),
    "cauldronBubbles": (doc: Cloudsave, charCount: number) => doc.get('CauldronBubbles'),
    "cards": (doc: Cloudsave, charCount: number) => parseCards(JSON.parse(doc.get('Cards0'))),
    "players": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parsePlayers(doc, accountData, allItems),
    "alchemy": (doc: Cloudsave, allItems: Item[], charCount: number) => parseAlchemy(doc.get("CauldronInfo"), doc.get("CauldUpgLVs"), allItems),
    "bribes": (doc: Cloudsave, charCount: number) => parseBribes(doc.get("BribeStatus")),
    "guild": (doc: Cloudsave, charCount: number) => parseGuild(JSON.parse(doc.get("Guild"))),
    "gems": (doc: Cloudsave, charCount: number) => parseGems(JSON.parse(doc.get('GemItemsPurchased'))),
    "achievements": (doc: Cloudsave, charCount: number) => parseAchievements(safeJsonParse(doc, 'AchieveReg', []), safeJsonParse(doc, 'SteamAchieve', [])),
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
    "taskboard": (doc: Cloudsave, charCount: number) => parseTaskboard(JSON.parse(doc.get(`TaskZZ0`)), JSON.parse(doc.get(`TaskZZ1`)), JSON.parse(doc.get(`TaskZZ2`)), JSON.parse(doc.get(`TaskZZ3`)), doc.get(`TaskZZ4`), doc.get(`TaskZZ5`)),
    "worship": (doc: Cloudsave, accountData: Map<string, any>, charCount: number) => parseWorship(JSON.parse(doc.get("TotemInfo")), accountData),
    "construction": (doc: Cloudsave, charCount: number) => parseConstruction(JSON.parse(doc.get("Tower"))),
    "arcade": (doc: Cloudsave, charCount: number) => parseArcade(safeJsonParse(doc, "ArcadeUpg", []), doc.get("OptLacc")),
    "obols": (doc: Cloudsave, allItems: Item[], charCount: number) => parseObols(doc, charCount, allItems),
    "dungeons": (doc: Cloudsave, charCount: number) => parseDungeons(safeJsonParse(doc, "DungUpg", []), doc.get("OptLacc")),
    "forge": (doc: Cloudsave, allItems: Item[], charCount: number) => parseForge(doc.get("ForgeItemQty"), doc.get("ForgeIntProg"), doc.get("ForgeItemOrder"), doc.get("ForgeLV"), allItems),
    "cooking": (doc: Cloudsave, charCount: number) => parseCooking(safeJsonParse(doc, "Cooking", []), safeJsonParse(doc, "Meals", [])),
    "lab": (doc: Cloudsave, charCount: number) => parseLab(safeJsonParse(doc, "Lab", [])),
    "breeding": (doc: Cloudsave, charCount: number) => parseBreeding(safeJsonParse(doc, "PetsStored", []), safeJsonParse(doc, "Pets", []), doc.get("OptLacc"), safeJsonParse(doc, "Territory", []), safeJsonParse(doc, "Breeding", [])),
}

// ORDER IS IMPORTANT!
const postProcessingMap: Record<string, Function> = {
    "lab": (doc: Cloudsave, accountData: Map<string, any>) => updateLab(accountData),
    "stamps": (doc: Cloudsave, accountData: Map<string, any>) => updateStamps(accountData),
    "family": (doc: Cloudsave, accountData: Map<string, any>) => parseFamily(accountData.get("players") as Player[]),
    "forge": (doc: Cloudsave, accountData: Map<string, any>) => updateForge(accountData.get("forge"), accountData.get("gems")),
    "cooking": (doc: Cloudsave, accountData: Map<string, any>) => updateCooking(accountData),
    "deathnote": (doc: Cloudsave, accountData: Map<string, any>) => updateDeathnote(accountData),
    "breeding": (doc: Cloudsave, accountData: Map<string, any>) => updateBreeding(accountData),
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
            else if (key == "lootyData" || key == "obols" || key == "alchemy" || key == "forge") {
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