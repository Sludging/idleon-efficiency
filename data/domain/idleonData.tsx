import parseTraps, { initTraps } from './traps';
import parseStamps, { initStamps, updateStampMaxCarry, updateStamps } from './stamps';
import parseStatues, { initStatues } from './statues';
import parsePlayers, { Player, initPlayers, playerExtraCalculations, updatePlayerDeathnote, updatePlayerStarSigns, updatePlayers } from './player';
import parseAlchemy, { initAlchemy, updateAlchemy } from './alchemy';
import parseBribes, { initBribes } from './bribes';
import parseGuild, { initGuild } from './guild';
import parseGems, { initGems } from './gemPurchases';
import parseAchievements, { initAchievements } from './achievements';
import parseShrines, { initShrines, updateShrines } from './shrines';
import { Item } from './items';
import parseStorage, { initStorage, updateStorage } from './storage';
import parseQuests, { initQuests } from './quests';
import parsePrayers, { initPrayers } from './prayers';
import parseRefinery, { initRefinery, updateRefinery } from './refinery';
import parseSaltLick, { initSaltLick } from './saltLick';
import parsePrinter, { initPrinter, updatePrinter } from './printer';
import parseTaskboard, { initTaskboard } from './tasks';
import { Cloudsave } from './cloudsave';
import parseWorship, { initWorship, updateWorship } from './worship';
import parseConstruction, { initConstruction, updateConstruction } from './construction';
import parseCards, { updateCards, initCards } from './cards';
import parseArcade, { initArcade, updateArcade } from './arcade';
import parseObols, { initObols } from './obols';
import { calculateFamily, initFamily } from './family';
import parseDungeons, { initDungeons } from './dungeons';
import parseForge, { initForge, updateForge } from './forge';
import parseCooking, { initCooking, updateCooking } from './cooking';
import parseLab, { initLab, updateLab } from './lab';
import parseBreeding, { initBreeding, updateAllShinyEffects, updateBreeding } from './breeding';
import { notUndefined } from '../utility';
import parseSigils, { initSigils, updateSigils } from './sigils';
import { initAnvil, parseAnvil, updateAnvil } from './anvil';
import { initAlerts, updateAlerts } from './alerts';
import parseAccount, { initAccount, updateAccount } from './account';
import parseDivinity, { initDivinity, updateDivinity } from './divinity';
import parseSailing, { initSailing, updateMinTravelTime, updateSailing } from './sailing';
import parseGaming, { updateGaming, updateSuperbitImpacts, initGaming } from './gaming';
import parseAtomCollider, { initAtomCollider, updateAtomCollider } from './atomCollider';
import { updateArtifacts } from './sailing/artifacts';
import parseConstellations, { initConstellations } from './constellations';
import parseSlab, { initSlab } from './slab';
import parseCapacity, { initCapacity, updateCapacity } from './capacity';
import parseDeathnote, { updateDeathnote, initDeathnote } from './deathnote';
import parseRift, { initRift } from './rift';
import parseCompanions, { updateCompanionImpact } from './companions';
import parsePostOfficeExtra from './postoffice';

export const safeJsonParse = <T,>(doc: Cloudsave, key: string, emptyValue: T): T => {
    try {
        return JSON.parse(doc.get(key))
    }
    catch (e) {
        //console.debug(key, doc.get(key), e)
    }
    return emptyValue;
}

export interface IParser {
    (raw: Cloudsave, data: Map<string, any>): void
}

export class IdleonData {
    private data: Map<string, any>
    private lastUpdated: Date

    constructor(data: Map<string, any>, lastUpdated: Date) {
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

export const initAccountDataKeys = (allItems: Item[]) => {
    const accountData = new Map<string, any>();
    accountData.set("stamps", initStamps(allItems));
    accountData.set("traps", initTraps(0));
    accountData.set("statues", initStatues(0));
    accountData.set("anvil", initAnvil(0));
    accountData.set("prayers", initPrayers());
    accountData.set("cards", initCards());
    accountData.set("players", initPlayers(0, accountData.get("playerNames")));
    accountData.set("alchemy", initAlchemy(allItems));
    accountData.set("bribes", initBribes());
    accountData.set("guild", initGuild());
    accountData.set("gems", initGems());
    accountData.set("achievements", initAchievements());
    accountData.set("slab", initSlab(allItems));
    accountData.set("POExtra", { streak: 0, complete: 0, misc: 0 });
    accountData.set("shrines", initShrines());
    accountData.set("storage", initStorage());
    accountData.set("constellations", initConstellations());
    accountData.set("quests", initQuests(allItems));
    accountData.set("refinery", initRefinery());
    accountData.set("saltLick", initSaltLick());
    accountData.set("printer", initPrinter());
    accountData.set("taskboard", initTaskboard());
    accountData.set("worship", initWorship());
    accountData.set("construction", initConstruction());
    accountData.set("arcade", initArcade());
    accountData.set("obols", initObols());
    accountData.set("dungeons", initDungeons());
    accountData.set("forge", initForge());
    accountData.set("cooking", initCooking());
    accountData.set("lab", initLab());
    accountData.set("breeding", initBreeding());
    accountData.set("sigils", initSigils());
    accountData.set("account", initAccount(allItems));
    accountData.set("divinity", initDivinity());
    accountData.set("sailing", initSailing());
    accountData.set("gaming", initGaming());
    accountData.set("collider", initAtomCollider());
    accountData.set("capacity", initCapacity());
    accountData.set("deathnote", initDeathnote());
    accountData.set("family", initFamily());
    accountData.set("alerts", initAlerts());
    accountData.set("rift", initRift());
    accountData.set("itemsData", allItems);
    return accountData;
}

const parseFunctions: IParser[] = [
    parseRefinery,
    parseStamps,
    parseTraps,
    parseStatues,
    parsePlayers,
    parseAnvil,
    parseCards,
    parsePrayers,
    parseAlchemy,
    parseBribes,
    parseGuild,
    parseGems,
    parseAchievements,
    parseSlab,
    parsePostOfficeExtra,
    parseShrines,
    parseStorage,
    parseConstellations,
    parseQuests,
    parseSaltLick,
    parsePrinter,
    parseTaskboard,
    parseWorship,
    parseConstruction,
    parseArcade,
    parseObols,
    parseDungeons,
    parseForge,
    parseCooking,
    parseLab,
    parseBreeding,
    parseSigils,
    parseAccount,
    parseDivinity,
    parseSailing,
    parseGaming,
    parseAtomCollider,
    parseCapacity,
    parseDeathnote,
    parseRift,
]

// ORDER IS IMPORTANT, the keys are not relevant as data doesn't get persisted.
// This allows for multiple calls that touch the same data to happen in the same map (artifacts + sailing for example)
const postProcessingMap: Record<string, Function> = {
    "updateCompanionImpact": (doc: Cloudsave, accountData: Map<string, any>) => updateCompanionImpact(accountData),
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

export const updateIdleonData = async (accountData: Map<string, any>, data: Cloudsave, charNames: string[], companions: number[], allItems: Item[], serverVars: Record<string, any>, isStatic: boolean = false) => {
    accountData.set("playerNames", charNames);
    accountData.set("servervars", serverVars);
    accountData.set("OptLacc", data.get("OptLacc"));
    accountData.set("rawData", data.toJSON())
    accountData.set("timeAway", JSON.parse(data.get('TimeAway')));

    // Handle Companions
    accountData.set("companions", parseCompanions(companions));

    // Do some time math, useful for adjusting AFK timers if needed.
    const saveGlobalTime = JSON.parse(data.get("TimeAway"))["GlobalTime"] as number;
    const lastUpdated = isStatic ? new Date(saveGlobalTime * 1000) : new Date()
    accountData.set("lastUpdated", lastUpdated);

    const validCharCount = [...Array(charNames.length)].map((_, i) => data.get(`Lv0_${i}`) as number[]).filter(notUndefined).length;
    accountData.set("charCount", validCharCount);

    parseFunctions.forEach(dataParser => {
        try {
            dataParser(data, accountData);
        }
        catch (e) {
            console.debug(e);
            console.log(`Failed parsing ${dataParser.name}`);
        }
    });

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
    // const players = accountData.get("players") as Player[];
    // players.sort((playera, playerb) => playera.playerID > playerb.playerID ? 1 : -1);

    const newData = new IdleonData(accountData, lastUpdated);

    return newData;
}
