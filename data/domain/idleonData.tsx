import { Traps } from './world-3/traps';
import { Stamps, updateStampMaxCarry, updateStamps } from './world-1/stamps';
import { Statues, updateStatueBonuses } from './world-1/statues';
import { Players, playerExtraCalculations, updatePlayerDeathnote, updatePlayerStarSigns, updatePlayerTalentLevelExceptESBonus, updatePlayers, updatePlayerTalentLevelESBonus, updatePlayerTalentPoints, Player, updatePlayerSpecialTalents } from './player';
import { Alchemy, updateAlchemy, updateAlchemySlabBubbles, updateAlchemyTomeBubbles } from './world-2/alchemy/alchemy';
import { Bribes } from './world-1/bribes';
import { GemStore } from './gemPurchases';
import { Achievements } from './achievements';
import { Shrines, updateShrines } from './world-3/construction/shrines';
import { Item } from './items';
import { Storage, updateStorage } from './storage';
import { Quests } from './quests';
import { Prayers } from './world-3/prayers';
import { Refinery, updateRefinery } from './world-3/construction/refinery';
import { SaltLick } from './world-3/construction/saltLick';
import { Printer, updatePrinter } from './world-3/construction/printer';
import { TaskBoard } from './tasks';
import { Cloudsave } from './cloudsave';
import { Worship, updateWorship, updateWorshipTotalizer } from './world-3/worship';
import { Construction, updateConstruction } from './world-3/construction/construction';
import { updateCards, Cards } from './cards';
import { Arcade, updateArcade } from './world-2/arcade';
import { ObolsData } from './world-2/obols';
import { Family, calculateFamily } from './family';
import { Dungeons } from './dungeons';
import { Forge, updateForge } from './world-1/forge';
import { Cooking, updateCooking } from './world-4/cooking';
import { Lab, updateLab } from './world-4/lab';
import { Breeding, updateAllShinyEffects, updateBeastMasterImpact, updateBreeding, updateBreedingDisplayData } from './world-4/breeding';
import { notUndefined } from '../utility';
import { Sigils, updateSigils, updateSigilsChargeSpeed } from './world-2/alchemy/sigils';
import { AnvilWrapper, updateAnvil } from './world-1/anvil';
import { Alerts, updateAlerts } from './alerts';
import { Account, updateAccount } from './account';
import { Divinity, updateDivinity } from './world-5/divinity';
import { Sailing, updateSailing, updateMinTravelTimeAndSpeed } from './world-5/sailing/sailing';
import { Gaming, updateGaming, updateSuperbitImpacts } from './world-5/gaming';
import { AtomCollider, updateAtomCollider } from './world-3/construction/atomCollider';
import { updateArtifacts, updateSailingArtifactSlabBoost } from './world-5/sailing/artifacts';
import { Constellations } from './constellations';
import { Slab, updateSlabBonusDisplay } from './world-5/slab';
import { Capacity, updateCapacity } from './capacity';
import { Deathnote, updateDeathnote, updateDeathnoteMiniboss } from './world-3/construction/deathnote';
import { Companions, updateCompanionImpact } from './companions';
import { Domain, HandleRawDataKey } from './base/domain';
import { Guild } from './guild';
import { Rift } from "./world-4/rift";
import { Equinox, updateEquinoxBar } from './world-3/equinox';
import { POExtra } from './world-2/postoffice';
import { Sneaking, updateSneaking } from './world-6/sneaking';
import { Summoning, updateSummoningLevelAndBonusesFromIt, updateSummoningWinnerBonusBoost, updateSummoningWinnerImpact } from './world-6/summoning';
import { Farming, updateFarmingCropScientistBonuses, updateFarmingDisplayData, updateFarmingLevel } from './world-6/farming';
import { StarSigns, updateInfinityStarSigns, updateStarSignsUnlocked } from './starsigns';
import { IslandExpeditions } from './world-2/islandExpedition';
import { Tome, updateTomeScores } from './world-4/tome';
import { KillRoy } from './world-2/killroy';
import { updateVotesBonus, Votes } from './world-2/votes';
import { Hole, updateHole } from './world-5/hole/hole';
import { UpgradeVault } from './upgradeVault';
import { Grimoire, updateGrimoireEfficiency } from './grimoire';
import { Tesseract, updateArcaneCultistImpact, updateTesseractEfficiency } from './tesseract';
import { Compass, updateCompassDamageEfficiency } from './compass';
import { Emperor, updateEmperorMaxAttempts, updateEmperorBonuses } from './world-6/emperor';
import { EquipmentSets } from './misc/equipmentSets';
import { EventShop } from './eventShop';
import { Clamworks } from './world-7/clamworks';
import { Meritocraty, updateMeritocratyBonus } from './world-7/meritocraty';
import { LegendTalents, updateLegendTalents } from './world-7/legendTalents';
import { Bubba, updateBubba } from './world-3/bubba';
import { CoralKid } from './world-7/coralKid';
import { BigFish, updateBigFishUnlocked } from './world-7/bigFish';
import { CoralReef, updateCoralReefDailyGain } from './world-7/coralReef';
import { DancingCoral } from './world-7/dancingCoral';
import { Hoops } from './world-1/hoops';
import { Darts } from './world-1/darts';
import { Orion, updateOrionFeatherRate, updateOrionGlobalBonus } from './world-1/orion';

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
    new Farming("farming"),
    new StarSigns("starsigns"),
    new IslandExpeditions("islandExpeditions"),
    new Companions("companions"),
    new Tome("tome"),
    new KillRoy("killroy"),
    new Votes("votes"),
    new Hole("hole"),
    new UpgradeVault("upgradeVault"),
    new Grimoire("grimoire"),
    new Tesseract("tesseract"),
    new Compass("compass"),
    new Emperor("emperor"),
    new EquipmentSets("equipmentSets"),
    new EventShop("eventShop"),
    new Clamworks("clamworks"),
    new Meritocraty("meritocraty"),
    new LegendTalents("legendTalents"),
    new Bubba("bubba"),
    new CoralKid("coralKid"),
    new BigFish("bigFish"),
    new CoralReef("coralReef"),
    new DancingCoral("dancingCoral"),
    new Hoops("hoops"),
    new Darts("darts"),
    new Orion("orion"),
]

export class IdleonData {
    private data: Map<string, any>
    private lastUpdated: Date

    public initialized: boolean = false;

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

    public setLastUpdated = (lastUpdated: Date) => {
        this.lastUpdated = lastUpdated;
    }
}

export const initAccountDataKeys = (allItems: Item[]) => {
    const accountData: Map<string, any> = new Map();
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
            }
        }
    })

    return accountData;
}


// ORDER IS IMPORTANT, the keys are not relevant as data doesn't get persisted.
// This allows for multiple calls that touch the same data to happen in the same map (artifacts + sailing for example)
const postProcessingMap: Record<string, Function> = {
    "updateOrionGlobalBonus": (doc: Cloudsave, accountData: Map<string, any>) => updateOrionGlobalBonus(accountData),
    "updateBubba": (doc: Cloudsave, accountData: Map<string, any>) => updateBubba(accountData),
    "updateBigFish": (doc: Cloudsave, accountData: Map<string, any>) => updateBigFishUnlocked(accountData),
    "updateMeritocraty": (doc: Cloudsave, accountData: Map<string, any>) => updateMeritocratyBonus(accountData),
    "updateLegendTalents": (doc: Cloudsave, accountData: Map<string, string>) => updateLegendTalents(accountData),
    "updatePlayerDeathnote": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerDeathnote(accountData),
    "updatePlayerSpecialTalents": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerSpecialTalents(accountData),
    "summoningLevel": (doc: Cloudsave, accountData: Map<string, any>) => updateSummoningLevelAndBonusesFromIt(accountData),
    "summoningWinnerBonus": (doc: Cloudsave, accountData: Map<string, any>) => updateSummoningWinnerBonusBoost(accountData),
    "summoningWinnerImpact": (doc: Cloudsave, accountData: Map<string, any>) => updateSummoningWinnerImpact(accountData),
    "starSignsUnlocked": (doc: Cloudsave, accountData: Map<string, any>) => updateStarSignsUnlocked(accountData),
    "farmingLevel": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingLevel(accountData),
    "updateCompanionImpact": (doc: Cloudsave, accountData: Map<string, any>) => updateCompanionImpact(accountData),
    "divinity": (doc: Cloudsave, accountData: Map<string, any>) => updateDivinity(accountData),
    "updatePlayerTalentLevelWithoutESBonus": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerTalentLevelExceptESBonus(accountData),
    "family": (doc: Cloudsave, accountData: Map<string, any>) => calculateFamily(accountData),
    "updatePlayerTalentLevelESBonus": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerTalentLevelESBonus(accountData),
    "arcaneCultistImpact": (doc: Cloudsave, accountData: Map<string, any>) => updateArcaneCultistImpact(accountData),
    "emperorBonuses": (doc: Cloudsave, accountData: Map<string, any>) => updateEmperorBonuses(accountData),
    "updateAllShinies": (doc: Cloudsave, accountData: Map<string, any>) => updateAllShinyEffects(accountData),
    "updateInfinityStarSigns": (doc: Cloudsave, accountData: Map<string, any>) => updateInfinityStarSigns(accountData),
    "updateSuperbitImpcats": (doc: Cloudsave, accountData: Map<string, any>) => updateSuperbitImpacts(accountData),
    "playerStarSigns": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerStarSigns(accountData),
    "cards": (doc: Cloudsave, accountData: Map<string, any>) => updateCards(accountData),
    "gaming": (doc: Cloudsave, accountData: Map<string, any>) => updateGaming(accountData),
    "collider": (doc: Cloudsave, accountData: Map<string, any>) => updateAtomCollider(accountData),
    "artifacts": (doc: Cloudsave, accountData: Map<string, any>) => updateArtifacts(accountData),
    "sigils": (doc: Cloudsave, accountData: Map<string, any>) => updateSigils(accountData),
    "storage": (doc: Cloudsave, accountData: Map<string, any>) => updateStorage(accountData),
    "lab": (doc: Cloudsave, accountData: Map<string, any>) => updateLab(accountData),
    "artifactsSlabBonus": (doc: Cloudsave, accountData: Map<string, any>) => updateSailingArtifactSlabBoost(accountData),
    "alchemySlabBubbles": (doc: Cloudsave, accountData: Map<string, any>) => updateAlchemySlabBubbles(accountData),
    "deathnoteMiniboss": (doc: Cloudsave, accountData: Map<string, any>) => updateDeathnoteMiniboss(accountData),
    "alchemy": (doc: Cloudsave, accountData: Map<string, any>) => updateAlchemy(accountData),
    "playerTalentPoints": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerTalentPoints(accountData),
    "tomeScore": (doc: Cloudsave, accountData: Map<string, any>) => updateTomeScores(accountData),
    "hole": (doc: Cloudsave, accountData: Map<string, any>) => updateHole(accountData),
    "alchemyTomeBubbles": (doc: Cloudsave, accountData: Map<string, any>) => updateAlchemyTomeBubbles(accountData),
    "sneaking": (doc: Cloudsave, accountData: Map<string, any>) => updateSneaking(accountData),
    "farmingCropScientist": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingCropScientistBonuses(accountData),
    "stamps": (doc: Cloudsave, accountData: Map<string, any>) => updateStamps(accountData),
    "forge": (doc: Cloudsave, accountData: Map<string, any>) => updateForge(accountData.get("forge"), accountData.get("gems")),
    "worshipTotalizer": (doc: Cloudsave, accountData: Map<string, any>) => updateWorshipTotalizer(accountData),
    "arcade": (doc: Cloudsave, accountData: Map<string, any>) => updateArcade(accountData),
    "cooking": (doc: Cloudsave, accountData: Map<string, any>) => updateCooking(accountData),
    "statueBuffs": (doc: Cloudsave, accountData: Map<string, any>) => updateStatueBonuses(accountData),
    "sailing": (doc: Cloudsave, accountData: Map<string, any>) => updateSailing(accountData),
    "breeding": (doc: Cloudsave, accountData: Map<string, any>) => updateBreeding(accountData),
    "shrines": (doc: Cloudsave, accountData: Map<string, any>) => updateShrines(accountData),
    "players": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayers(accountData),
    "capacity": (doc: Cloudsave, accountData: Map<string, any>) => updateCapacity(accountData),
    "printer": (doc: Cloudsave, accountData: Map<string, any>) => updatePrinter(accountData),
    "worship": (doc: Cloudsave, accountData: Map<string, any>) => updateWorship(accountData),
    "account": (doc: Cloudsave, accountData: Map<string, any>) => updateAccount(accountData),
    "construction": (doc: Cloudsave, accountData: Map<string, any>) => updateConstruction(accountData),
    "deathnoteEquinox": (doc: Cloudsave, accountData: Map<string, any>) => updateDeathnote(accountData),
    "equinox": (doc: Cloudsave, accountData: Map<string, any>) => updateEquinoxBar(accountData),
    "votes": (doc: Cloudsave, accountData: Map<string, any>) => updateVotesBonus(accountData),
}

// I really really hate this.
const postPostProcessingMap: Record<string, Function> = {
    "updateOrionFeatherRate": (doc: Cloudsave, accountData: Map<string, any>) => updateOrionFeatherRate(accountData),
    "stamps": (doc: Cloudsave, accountData: Map<string, any>) => updateStampMaxCarry(accountData),
    "slab": (doc: Cloudsave, accountData: Map<string, any>) => updateSlabBonusDisplay(accountData),
    "playersExtraMaths": (doc: Cloudsave, accountData: Map<string, any>) => playerExtraCalculations(accountData),
    "anvil": (doc: Cloudsave, accountData: Map<string, any>) => updateAnvil(accountData),
    "refinery": (doc: Cloudsave, accountData: Map<string, any>) => updateRefinery(accountData),
    "sailing": (doc: Cloudsave, accountData: Map<string, any>) => updateMinTravelTimeAndSpeed(accountData),
    "farming": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingDisplayData(accountData),
    "sigilsChargeSpeed": (doc: Cloudsave, accountData: Map<string, any>) => updateSigilsChargeSpeed(accountData),
    "breedingShinyAndBreedingSpeed": (doc: Cloudsave, accountData: Map<string, any>) => updateBreedingDisplayData(accountData),
    "petBeastmaster": (doc: Cloudsave, accountData: Map<string, any>) => updateBeastMasterImpact(accountData),
    "compassDamageEfficiency": (doc: Cloudsave, accountData: Map<string, any>) => updateCompassDamageEfficiency(accountData),
    "grimoireEfficiency": (doc: Cloudsave, accountData: Map<string, any>) => updateGrimoireEfficiency(accountData),
    "emperorMaxAttempts": (doc: Cloudsave, accountData: Map<string, any>) => updateEmperorMaxAttempts(accountData),
    "tesseractEfficiency": (doc: Cloudsave, accountData: Map<string, any>) => updateTesseractEfficiency(accountData),
    "coralReefDailyGains": (doc: Cloudsave, accountData: Map<string, any>) => updateCoralReefDailyGain(accountData),
    "alerts": (doc: Cloudsave, accountData: Map<string, any>) => updateAlerts(accountData),
}

export const updateIdleonData = (accountData: Map<string, any>, data: Cloudsave, charNames: string[], companions: number[], serverVars: Record<string, any>, isStatic: boolean = false) => {
    accountData.set("playerNames", charNames);
    accountData.set("servervars", serverVars);
    accountData.set("OptLacc", data.get("OptLacc"));
    accountData.set("rawData", data.toJSON())
    accountData.set("timeAway", JSON.parse(data.get('TimeAway')));
    accountData.set("ownedCompanions", companions);

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
        parseData.set("itemsData", accountData.get("itemsData"));
        parseData.set("playerNames", charNames);
        parseData.set("servervars", serverVars);
        parseData.set("ownedCompanions", companions);
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
    // TODO: Need to think of a safe way to handle this longer term.
    const players = accountData.get("players") as Player[];
    players.sort((playera, playerb) => playera.playerID > playerb.playerID ? 1 : -1);

    const newData = new IdleonData(accountData, lastUpdated);

    return newData;
}
