import parseTraps from './traps';
import parseStamps, { updateStampMaxCarry, updateStamps } from './stamps';
import parseStatues from './statues';
import parsePlayers, { Player, playerExtraCalculations, updatePlayerDeathnote, updatePlayerStarSigns, updatePlayers } from './player';
import parseAlchemy, { updateAlchemy } from './alchemy';
import parseBribes from './bribes';
import parseGuild from './guild';
import parseGems from './gemPurchases';
import parseAchievements from './achievements';
import parseShrines, { updateShrines } from './shrines';
import { Item } from './items';
import parseStorage, { updateStorage } from './storage';
import parseQuests from './quests';
import parsePrayers from './prayers';
import parseRefinery, { updateRefinery } from './refinery';
import parseSaltLick from './saltLick';
import parsePrinter, { updatePrinter } from './printer';
import parseTaskboard from './tasks';
import { Cloudsave } from './cloudsave';
import parseWorship, { updateWorship } from './worship';
import parseConstruction, { updateConstruction } from './construction';
import parseCards, { updateCards } from './cards';
import parseArcade, { updateArcade } from './arcade';
import parseObols from './obols';
import { calculateFamily } from './family';
import { parseDungeons } from './dungeons';
import { parseForge, updateForge } from './forge';
import { parseCooking, updateCooking } from './cooking';
import { parseLab, updateLab } from './lab';
import { parseBreeding, updateAllShinyEffects, updateBreeding } from './breeding';
import { notUndefined } from '../utility';
import parseSigils, { updateSigils } from './sigils';
import { parseAnvil, updateAnvil } from './anvil';
import { updateAlerts } from './alerts';
import { parseAccount, updateAccount } from './account';
import parseDivinity, { updateDivinity } from './divinity';
import parseSailing, { updateMinTravelTime, updateSailing } from './sailing';
import parseGaming, { updateGaming, updateSuperbitImpacts } from './gaming';
import parseAtomCollider, { updateAtomCollider } from './atomCollider';
import { updateArtifacts } from './sailing/artifacts';
import parseConstellations from './constellations';
import parseSlab from './slab';
import parseCapacity, { updateCapacity } from './capacity';
import parseDeathnote, { updateDeathnote } from './deathnote';
import parseRift from './rift';
import parseCompanions from './companions';

export const safeJsonParse = <T,>(doc: Cloudsave, key: string, emptyValue: T): T => {
    try {
        return JSON.parse(doc.get(key))
    }
    catch (e) {
        //console.debug(key, doc.get(key), e)
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
    "stamps": (doc: Cloudsave, allItems: Item[], charCount: number) => parseStamps(doc.get("StampLv"), doc.get("StampLvM"), allItems),
    "traps": (doc: Cloudsave, charCount: number) => parseTraps([...Array(charCount)].map((_, i) => { return doc.get(`PldTraps_${i}`) })),
    "statues": (doc: Cloudsave, charCount: number) => parseStatues([...Array(charCount)].map((_, i) => safeJsonParse(doc, `StatueLevels_${i}`, [])), safeJsonParse(doc, `StuG`, [])),
    "anvil": (doc: Cloudsave, allItems: Item[], charCount: number) => parseAnvil(
        [...Array(charCount)].map((_, i) => doc.get(`AnvilPA_${i}`)),
        [...Array(charCount)].map((_, i) => doc.get(`AnvilPAstats_${i}`)),
        [...Array(charCount)].map((_, i) => doc.get(`AnvilPAselect_${i}`)),
        allItems),
    "timeAway": (doc: Cloudsave, charCount: number) => JSON.parse(doc.get('TimeAway')),
    "cauldronBubbles": (doc: Cloudsave, charCount: number) => doc.get('CauldronBubbles'),
    "prayers": (doc: Cloudsave, charCount: number) => parsePrayers(safeJsonParse(doc, "PrayOwned", [])),
    "cards": (doc: Cloudsave, charCount: number) => parseCards(safeJsonParse(doc, 'Cards0', {})),
    "players": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parsePlayers(doc, accountData, allItems, charCount),
    "alchemy": (doc: Cloudsave, allItems: Item[], charCount: number) => parseAlchemy(doc.get("CauldronInfo"), doc.get("CauldUpgLVs"), allItems),
    "bribes": (doc: Cloudsave, charCount: number) => parseBribes(doc.get("BribeStatus")),
    "guild": (doc: Cloudsave, charCount: number) => parseGuild(safeJsonParse(doc, "Guild", []),),
    "gems": (doc: Cloudsave, charCount: number) => parseGems(safeJsonParse(doc, 'GemItemsPurchased', [])),
    "achievements": (doc: Cloudsave, charCount: number) => parseAchievements(safeJsonParse(doc, 'AchieveReg', []), safeJsonParse(doc, 'SteamAchieve', [])),
    "slab": (doc: Cloudsave, allItems: Item[], charCount: number) => parseSlab(safeJsonParse(doc, "Cards1", []), allItems),
    "rawData": (doc: Cloudsave, charCount: number) => doc.toJSON(),
    "POExtra": (doc: Cloudsave, charCount: number) => {
        return {
            streak: doc.get("CYDeliveryBoxStreak"),
            complete: doc.get("CYDeliveryBoxComplete"),
            misc: doc.get("CYDeliveryBoxMisc"),
        }
    },
    "shrines": (doc: Cloudsave, charCount: number) => parseShrines(safeJsonParse(doc, "Shrine", [])),
    "storage": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parseStorage(doc, accountData.get("playerNames"), allItems, JSON.parse(doc.get("InvStorageUsed"))),
    "constellations": (doc: Cloudsave, charCount: number) => parseConstellations(safeJsonParse(doc, "SSprog", [])),
    "quests": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parseQuests(doc, accountData, allItems, charCount),
    "refinery": (doc: Cloudsave, charCount: number) => parseRefinery(safeJsonParse(doc, "Refinery", [])),
    "saltLick": (doc: Cloudsave, charCount: number) => parseSaltLick(safeJsonParse(doc, "SaltLick", [])),
    "printer": (doc: Cloudsave, charCount: number) => parsePrinter(safeJsonParse(doc, "Print", []), doc.get("PrinterXtra") as any[], charCount),
    "taskboard": (doc: Cloudsave, charCount: number) => parseTaskboard(safeJsonParse(doc, `TaskZZ0`, []), safeJsonParse(doc, `TaskZZ1`, []), safeJsonParse(doc, `TaskZZ2`, []), safeJsonParse(doc, `TaskZZ3`, []), safeJsonParse(doc, `TaskZZ4`, []), safeJsonParse(doc, `TaskZZ5`, [])),
    "worship": (doc: Cloudsave, accountData: Map<string, any>, charCount: number) => parseWorship(safeJsonParse(doc, "TotemInfo", [])),
    "construction": (doc: Cloudsave, charCount: number) => parseConstruction(safeJsonParse(doc, "Tower", []), doc.get("OptLacc")),
    "arcade": (doc: Cloudsave, charCount: number) => parseArcade(safeJsonParse(doc, "ArcadeUpg", []), doc.get("OptLacc")),
    "obols": (doc: Cloudsave, allItems: Item[], charCount: number) => parseObols(doc, charCount, allItems),
    "dungeons": (doc: Cloudsave, charCount: number) => parseDungeons(safeJsonParse(doc, "DungUpg", []), doc.get("OptLacc")),
    "forge": (doc: Cloudsave, allItems: Item[], charCount: number) => parseForge(doc.get("ForgeItemQty"), doc.get("ForgeIntProg"), doc.get("ForgeItemOrder"), doc.get("ForgeLV"), allItems),
    "cooking": (doc: Cloudsave, charCount: number) => parseCooking(safeJsonParse(doc, "Cooking", []), safeJsonParse(doc, "Meals", [])),
    "lab": (doc: Cloudsave, charCount: number) => parseLab(safeJsonParse(doc, "Lab", []), charCount),
    "breeding": (doc: Cloudsave, charCount: number) => parseBreeding(safeJsonParse(doc, "PetsStored", []), safeJsonParse(doc, "Pets", []), doc.get("OptLacc"), safeJsonParse(doc, "Territory", []), safeJsonParse(doc, "Breeding", [])),
    "sigils": (doc: Cloudsave, charCount: number) => parseSigils(safeJsonParse(doc, "CauldronP2W", []), safeJsonParse(doc, "CauldronJobs1", [])),
    "account": (doc: Cloudsave, allItems: Item[], charCount: number) => parseAccount(doc, allItems),
    "divinity": (doc: Cloudsave, charCount: number) => parseDivinity(charCount, doc.get("Divinity") as number[] || [], [...Array(charCount)].map((_, index) => doc.get(`AFKtarget_${index}`)), [...Array(charCount)].map((_, index) => doc.get(`SL_${index}`))),
    "sailing": (doc: Cloudsave, charCount: number) => parseSailing(safeJsonParse(doc, "Sailing", []), safeJsonParse(doc, "Boats", []), safeJsonParse(doc, "Captains", [])),
    "gaming": (doc: Cloudsave, charCount: number) => parseGaming(doc.get("Gaming") as any[] || [], safeJsonParse(doc, "GamingSprout", []),[...Array(charCount)].map((_, i) => { return doc.get(`Lv0_${i}`) })),
    "collider": (doc: Cloudsave, charCount: number) => parseAtomCollider(doc.get("Atoms") as number[] || [], doc.get("Divinity") as number[] || []),
    "capacity": (doc: Cloudsave, charCount: number) => parseCapacity([...Array(charCount)].map((_, index) => new Map(Object.entries(safeJsonParse(doc,`MaxCarryCap_${index}`, new Map()))))),
    "deathnote": (doc: Cloudsave, charCount: number) => parseDeathnote([...Array(charCount)].map((_, i) => { return doc.get(`KLA_${i}`) })),
    "rift": (doc: Cloudsave, charCount: number) => parseRift(doc.get("Rift") as number[], [...Array(charCount)].map((_, i) => { return doc.get(`Lv0_${i}`) }), safeJsonParse(doc, "Tower", [])),
}

// ORDER IS IMPORTANT, the keys are not relevant as data doesn't get persisted.
// This allows for multiple calls that touch the same data to happen in the same map (artifacts + sailing for example)
const postProcessingMap: Record<string, Function> = {
    "updatePlayerDeathnote": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerDeathnote(accountData),
    "updateAllShinies": (doc: Cloudsave, accountData: Map<string, any>) => updateAllShinyEffects(accountData),
    "updateSuperbitImpcats": (doc: Cloudsave, accountData: Map<string, any>) => updateSuperbitImpacts(accountData),
    "playerStarSigns": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerStarSigns(accountData),
    "cards": (doc: Cloudsave, accountData: Map<string, any>) => updateCards(accountData),
    "gaming": (doc: Cloudsave, accountData: Map<string, any>) => updateGaming(accountData),
    "collider": (doc: Cloudsave, accountData: Map<string, any>) => updateAtomCollider(accountData),
    "artifacts": (doc: Cloudsave, accountData: Map<string, any>) => updateArtifacts(accountData),
    "sigils": (doc: Cloudsave, accountData: Map<string, any>) => updateSigils(accountData),
    "storage": (doc: Cloudsave, accountData: Map<string, any>) => updateStorage(accountData),
    "lab": (doc: Cloudsave, accountData: Map<string, any>) => updateLab(accountData),
    "alchemy": (doc: Cloudsave, accountData: Map<string, any>) => updateAlchemy(accountData),
    "stamps": (doc: Cloudsave, accountData: Map<string, any>) => updateStamps(accountData),
    "divinity": (doc: Cloudsave, accountData: Map<string, any>) => updateDivinity(accountData),
    "forge": (doc: Cloudsave, accountData: Map<string, any>) => updateForge(accountData.get("forge"), accountData.get("gems")),
    "cooking": (doc: Cloudsave, accountData: Map<string, any>) => updateCooking(accountData),
    "sailing": (doc: Cloudsave, accountData: Map<string, any>) => updateSailing(accountData),
    "breeding": (doc: Cloudsave, accountData: Map<string, any>) => updateBreeding(accountData),
    "shrines": (doc: Cloudsave, accountData: Map<string, any>) => updateShrines(accountData),
    "players": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayers(accountData),
    "capacity": (doc: Cloudsave, accountData: Map<string, any>) => updateCapacity(accountData),
    "printer": (doc: Cloudsave, accountData: Map<string, any>) => updatePrinter(accountData),
    "worship": (doc: Cloudsave, accountData: Map<string, any>) => updateWorship(accountData),
    "arcade": (doc: Cloudsave, accountData: Map<string, any>) => updateArcade(accountData),
    "account": (doc: Cloudsave, accountData: Map<string, any>) => updateAccount(accountData),
    "construction": (doc: Cloudsave, accountData: Map<string, any>) => updateConstruction(accountData),
    "deathnote": (doc: Cloudsave, accountData: Map<string, any>) => updateDeathnote(accountData),
}

// I really really hate this.
const postPostProcessingMap: Record<string, Function> = {
    "stamps": (doc: Cloudsave, accountData: Map<string, any>) => updateStampMaxCarry(accountData),
    "family": (doc: Cloudsave, accountData: Map<string, any>) => calculateFamily(accountData.get("players") as Player[]),
    "playersExtraMaths": (doc: Cloudsave, accountData: Map<string, any>) => playerExtraCalculations(accountData),
    "anvil": (doc: Cloudsave, accountData: Map<string, any>) => updateAnvil(accountData),
    "refinery": (doc: Cloudsave, accountData: Map<string, any>) => updateRefinery(accountData),
    "sailing": (doc: Cloudsave, accountData: Map<string, any>) => updateMinTravelTime(accountData),
    "alerts": (doc: Cloudsave, accountData: Map<string, any>) => updateAlerts(accountData),
}

export const updateIdleonData = async (data: Cloudsave, charNames: string[], companions: number[], allItems: Item[], serverVars: Record<string, any>, isStatic: boolean = false) => {
    let accountData = new Map();
    accountData.set("playerNames", charNames);
    accountData.set("itemsData", allItems);
    accountData.set("servervars", serverVars);
    accountData.set("OptLacc", data.get("OptLacc"));

    // Handle Companions
    accountData.set("companions", parseCompanions(companions));

    // Do some time math, useful for adjusting AFK timers if needed.
    const saveGlobalTime = JSON.parse(data.get("TimeAway"))["GlobalTime"] as number;
    const lastUpdated = isStatic ? new Date(saveGlobalTime * 1000) : new Date()
    accountData.set("lastUpdated", lastUpdated);

    const validCharCount = [...Array(charNames.length)].map((_, i) => data.get(`Lv0_${i}`) as number[]).filter(notUndefined).length;
    Object.entries(keyFunctionMap).forEach(([key, toExecute]) => {
        try {
            if (key == "players" || key == "storage" || key == "quests") {
                accountData.set(key, toExecute(data, accountData, allItems, validCharCount));
            }
            else if (key == "worship") {
                accountData.set(key, toExecute(data, accountData, validCharCount));
            }
            else if (key == "obols" || key == "alchemy" || key == "forge" || key == "stamps" || key == "anvil" || key == "account" || key == "slab") {
                accountData.set(key, toExecute(data, allItems, validCharCount));
            }
            else {
                accountData.set(key, toExecute(data, validCharCount));
            }
        }
        catch (e) {
            console.debug(e);
            console.log(`Failed parsing ${key}`);
            accountData.set(key, undefined);
        }
    })

    // Do post parse processing
    Object.entries(postProcessingMap).forEach(([key, toExecute]) => {
        try {
            toExecute(data, accountData);
        }
        catch (e) {
            console.debug(e);
            console.log(`Failed post-processing ${key}`);
            //accountData.set(key, undefined);
        }
    })

    // Do post post parse processing
    Object.entries(postPostProcessingMap).forEach(([key, toExecute]) => {
        try {
            accountData.set(key, toExecute(data, accountData));
        }
        catch (e) {
            console.debug(e);
            console.log(`Failed post-post-processing ${key}`);
            //accountData.set(key, undefined);
        }
    })
    
    // I sometimes forget that sorting has implication, fix sorting in the end incase I screwed something up in the post processing functions.
    const players = accountData.get("players") as Player[];
    players.sort((playera, playerb) => playera.playerID > playerb.playerID ? 1 : -1);

    const newData = new IdleonData(accountData, lastUpdated);

    return newData;
}
