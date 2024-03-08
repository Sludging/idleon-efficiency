import { Traps } from './traps';
import { Stamps, updateStampMaxCarry, updateStamps } from './stamps';
import { Statues, updateStatueBonuses } from './statues';
import { Players, playerExtraCalculations, updatePlayerDeathnote, updatePlayerStarSigns, updatePlayers } from './player';
import { Alchemy, updateAlchemy } from './alchemy';
import { Bribes } from './bribes';
import { GemStore } from './gemPurchases';
import { Achievements } from './achievements';
import { Shrines, updateShrines } from './shrines';
import { Item } from './items';
import { Storage, updateStorage } from './storage';
import { Quests } from './quests';
import { Prayers } from './prayers';
import { Refinery, updateRefinery } from './refinery';
import { SaltLick } from './saltLick';
import { Printer, updatePrinter } from './printer';
import { TaskBoard } from './tasks';
import { Cloudsave } from './cloudsave';
import { Worship, updateWorship } from './worship';
import { Construction, updateConstruction } from './construction';
import { updateCards, Cards } from './cards';
import { Arcade, updateArcade } from './arcade';
import { ObolsData } from './obols';
import { Family, calculateFamily } from './family';
import { Dungeons } from './dungeons';
import { Forge, updateForge } from './forge';
import { Cooking, updateCooking } from './cooking';
import { Lab, updateLab } from './lab';
import { Breeding, updateAllShinyEffects, updateBreeding } from './breeding';
import { notUndefined } from '../utility';
import { Sigils, updateSigils, updateSigilsChargeSpeed } from './sigils';
import { AnvilWrapper, updateAnvil } from './anvil';
import { Alerts, updateAlerts } from './alerts';
import { Account, updateAccount } from './account';
import { Divinity, updateDivinity } from './divinity';
import { Sailing, updateMinTravelTime, updateSailing } from './sailing';
import { Gaming, updateGaming, updateSuperbitImpacts } from './gaming';
import { AtomCollider, updateAtomCollider } from './atomCollider';
import { updateArtifacts } from './sailing/artifacts';
import { Constellations } from './constellations';
import { Slab } from './slab';
import { Capacity, updateCapacity } from './capacity';
import { Deathnote, updateDeathnote } from './deathnote';
import parseCompanions, { updateCompanionImpact } from './companions';
import { Domain, HandleRawDataKey } from './base/domain';
import { Guild } from './guild';
import { Rift } from './rift';
import { Equinox, updateEquinoxBar } from './equinox';
import { POExtra } from './postoffice';
import { Sneaking, updateSneaking } from './world-6/sneaking';
import { Summoning, updateSummoningLevelAndBonusesFromIt, updateSummoningPristineCharm } from './world-6/summoning';
import { Farming, updateFarmingCropScientistBonuses, updateFarmingDisplayData, updateFarmingLevel } from './world-6/farming';

export const safeJsonParse = <T,>(doc: Cloudsave, key: string, emptyValue: T): T => {
    const data = doc.get(key);
    try {
        if (typeof (data) === "string") {
            return JSON.parse(doc.get(key))
        }
        return data;
    }
    catch (e) {
        console.debug(key, doc.get(key), e)
    }
    return emptyValue;
}

export interface IParser {
    (raw: Cloudsave, data: Map<string, any>): void
}

// The full list of data domains that we initilize and parse.
// The string passed to the constructor is the "data key" that the front-end components
// will use to read that information, it should only be defined here and init / parse / update functions should use 
// the 'getDataKey' function instead.
const domainList: Domain[] = [
    new Stamps("stamps"),
    new Traps("traps"),
    new Statues("statues"),
    new AnvilWrapper("anvil"),
    new Prayers("prayers"),
    new Cards("cards"),
    new Players("players"),
    new Alchemy("alchemy"),
    new Bribes("bribes"),
    new Guild("guild"),
    new GemStore("gems"),
    new Achievements("achievements"),
    new Slab("slab"),
    new Shrines("shrines"),
    new Storage("storage"),
    new Constellations("constellations"),
    // TODO: Confirm quests work, it had a special JSON parsing inside which I didn't keep when converting.
    new Quests("quests"),
    new Refinery("refinery"),
    new SaltLick("saltLick"),
    new Printer("printer"),
    new TaskBoard("taskboard"),
    new Worship("worship"),
    new Construction("construction"),
    new Arcade("arcade"),
    new ObolsData("obols"),
    new Dungeons("dungeons"),
    new Forge("forge"),
    new Cooking("cooking"),
    new Lab("lab"),
    new Breeding("breeding"),
    new Sigils("sigils"),
    new Account("account"),
    new Divinity("divinity"),
    new Sailing("sailing"),
    new Gaming("gaming"),
    new AtomCollider("collider"),
    new Capacity("capacity"),
    new Deathnote("deathnote"),
    new Family("family"),
    new Alerts("alerts"),
    new Rift("rift"),
    new POExtra("POExtra"),
    new Equinox("equinox"),
    new Sneaking("sneaking"),
    new Summoning("summoning"),
    new Farming("farming")
]

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

export const initAccountDataKeys = (accountData: Map<string, any>, allItems: Item[]) => {
    accountData.set("itemsData", allItems);
    domainList.forEach(dataDomain => {
        if (!dataDomain.initialized) {
            const key = dataDomain.getDataKey();
            const domainData = dataDomain.init(allItems, 0);
            // This is to protect from mistakes of forgetting to return a value from init.
            if (!domainData) {
                console.error("forgot to return data for init, key:", key);
            }
            else {
                accountData.set(key, domainData);
                dataDomain.markInitialized();
            }
        }
    })

    return accountData;
}


// ORDER IS IMPORTANT, the keys are not relevant as data doesn't get persisted.
// This allows for multiple calls that touch the same data to happen in the same map (artifacts + sailing for example)
const postProcessingMap: Record<string, Function> = {
    "summoningLevel": (doc: Cloudsave, accountData: Map<string, any>) => updateSummoningLevelAndBonusesFromIt(accountData),
    "farmingLevel": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingLevel(accountData),
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
    "sneaking": (doc: Cloudsave, accountData: Map<string, any>) => updateSneaking(accountData),
    "farmingCropScientist": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingCropScientistBonuses(accountData),
    "summoningPristineCharm": (doc: Cloudsave, accountData: Map<string, any>) => updateSummoningPristineCharm(accountData),
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
    "equinox": (doc: Cloudsave, accountData: Map<string, any>) => updateEquinoxBar(accountData),
}

// I really really hate this.
const postPostProcessingMap: Record<string, Function> = {
    "stamps": (doc: Cloudsave, accountData: Map<string, any>) => updateStampMaxCarry(accountData),
    "family": (doc: Cloudsave, accountData: Map<string, any>) => calculateFamily(accountData),
    "playersExtraMaths": (doc: Cloudsave, accountData: Map<string, any>) => playerExtraCalculations(accountData),
    "anvil": (doc: Cloudsave, accountData: Map<string, any>) => updateAnvil(accountData),
    "refinery": (doc: Cloudsave, accountData: Map<string, any>) => updateRefinery(accountData),
    "sailing": (doc: Cloudsave, accountData: Map<string, any>) => updateMinTravelTime(accountData),
    "farming": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingDisplayData(accountData),
    "alerts": (doc: Cloudsave, accountData: Map<string, any>) => updateAlerts(accountData),
    "statueBuffs": (doc: Cloudsave, accountData: Map<string, any>) => updateStatueBonuses(accountData),
    "sigilsChargeSpeed": (doc: Cloudsave, accountData: Map<string, any>) => updateSigilsChargeSpeed(accountData),
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

    // Foreach of our data domains
    domainList.forEach(dataDomain => {
        // Get the raw keys
        const rawKeys = dataDomain.getRawKeys();

        // Safely parse the json from the cloudsave data and store in the map
        const parseData = new Map<string, any>();
        rawKeys.forEach(raw => {
            HandleRawDataKey(raw, parseData, data, validCharCount);
        });

        // Add the data from the init into the map to be used in the parse.
        parseData.set(dataDomain.getDataKey(), accountData.get(dataDomain.getDataKey()));

        // Add commonly used data pieces
        parseData.set("charCount", validCharCount);
        parseData.set("OptLacc", accountData.get("OptLacc"));
        parseData.set("lastUpdated", accountData.get("lastUpdated"));
        parseData.set("itemsData", allItems);
        parseData.set("playerNames", charNames);
        parseData.set("servervars", serverVars);
        // TODO: Get rid of this. It's only used for players since it's a very unique one.
        parseData.set("rawData", data.toJSON())


        // Execute the parse function.
        dataDomain.parse(parseData);
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
