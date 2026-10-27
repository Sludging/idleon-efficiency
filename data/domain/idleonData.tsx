import type { StaticRepositories } from './repositories';
import { Traps, updateShinyCritterRewardMultiplier, updateTrapDisplayData } from './world-3/traps';
import { Stamps, updateStampMaxCarry, updateStamps } from './world-1/stamps';
import { Statues, updateStatueBonuses } from './world-1/statues';
import { Players, playerExtraCalculations, updatePlayerDeathnote, updatePlayerStarSigns, updatePlayerTalentLevelExceptESBonus, updatePlayers, updatePlayerTalentLevelESBonus, updatePlayerTalentPoints, Player, updatePlayerSpecialTalents } from './player';
import { Alchemy, updateAlchemy, updateAlchemySlabBubbles, updateAlchemyTomeBubbles } from './world-2/alchemy/alchemy';
import { updatePlayerTalentContexts } from './player';
import { updateSpeedrunTalentPoints } from './player';
import { updateEquipmentProperties } from './equipment';
import { GoldenFood, updateGoldenFood } from './golden-food';
import { updatePlayerDropRates, updatePlayerPowers, updatePlayerSecondaryStats, updatePlayerSkillStatsDN, updatePlayerStats } from './player-stats';
import { updateButtonTaskProgress } from './world-7/buttonTaskProgress';
import { Bribes } from './world-1/bribes';
import { GemStore } from './gemPurchases';
import { Achievements } from './achievements';
import { Shrines, updateShrines } from './world-3/construction/shrines';
import { Item } from './items';
import { Storage, updateStorage } from './storage';
import { Quests } from './quests';
import { Prayers, updatePrayerPlayerBonuses } from './world-3/prayers';
import { Refinery, updateRefinery } from './world-3/construction/refinery';
import { SaltLick } from './world-3/construction/saltLick';
import { Printer, updatePrinter } from './world-3/construction/printer';
import { TaskBoard } from './tasks';
import { Cloudsave } from './cloudsave';
import { Worship, updateTotemsBonuses, updateWorship, updateWorshipTotalizer } from './world-3/worship';
import { Construction, updateConstruction } from './world-3/construction/construction';
import { updateCards, Cards } from './cards';
import { Arcade, updateArcade } from './world-2/arcade';
import { ObolsData } from './world-2/obols';
import { Family, calculateFamily } from './family';
import { Dungeons } from './dungeons';
import { Forge, updateForge } from './world-1/forge';
import { Cooking, updateCooking } from './world-4/cooking';
import { Lab, updateLab } from './world-4/lab';
import { Breeding, updateAllShinyEffects, updateBeastMasterImpact, updateBreeding, updateBreedingDisplayData, prepareBreedingCrucibleLevel, prepareBreedingShinyLevels } from './world-4/breeding';
import { notUndefined } from '../utility';
import { Sigils, updateSigils, updateSigilsChargeSpeed } from './world-2/alchemy/sigils';
import { AnvilWrapper, updateAnvil } from './world-1/anvil';
import { Alerts, updateAlerts } from './alerts';
import { Account, updateAccount } from './account';
import { Divinity, updateDivinity, updateDivinityBlessings, updateDivinityRates } from './world-5/divinity';
import { Sailing, updateSailing, updateMinTravelTimeAndSpeed, updateSailingCaptainExperience } from './world-5/sailing/sailing';
import { Gaming, updateGaming, updateGamingDisplay, updateSuperbitImpacts } from './world-5/gaming';
import { AtomCollider, updateAtomCollider } from './world-3/construction/atomCollider';
import { updateArtifactBuildSpeed, updateArtifacts, updateSailingArtifactSlabBoost } from './world-5/sailing/artifacts';
import { Constellations } from './constellations';
import { Slab, updateSlabBonusDisplay, updateSlabBonusMultiplier } from './world-5/slab';
import { Capacity, updateCapacity } from './capacity';
import { Deathnote, updateDeathnote, updateDeathnoteMiniboss, updateDeathnoteWorldRanks } from './world-3/construction/deathnote';
import { Companions, updateCompanionImpact } from './companions';
import type { CompanionState } from './companions/companionState';
import { HandleRawDataKey } from './base/domain';
import type { Domain } from './base/domain';
import { Guild } from './guild';
import { Rift } from "./world-4/rift";
import { Equinox, updateEquinoxBar } from './world-3/equinox';
import { POExtra } from './world-2/postoffice';
import { Sneaking, updateSneaking, updateSneakingGemstones, updateSneakingNinjas, updateSneakingOmnijade, updateSneakingProgression } from './world-6/sneaking';
import { Summoning, updateSummoningUpgrades, updateSummoningWinnerBonusBoost, updateSummoningWinnerImpact } from './world-6/summoning';
import { Farming, updateFarmingCropScientistBonuses, updateFarmingDisplayData, updateFarmingLandRankBonuses, updateFarmingLevel, updateFarmingStickerBonuses } from './world-6/farming';
import { SushiStation, updateSushiStation } from './world-7/sushi';
import { Spelunking, updateSpelunkingChapterBonuses, updateSpelunkingUpgradeBonuses, updateSpelunkingPower, updateSpelunkingAccountMetrics, updateSpelunkingLateCalculations, updateSpelunkingPresentation } from './world-7/spelunking';
import { ResearchGrid, updateResearchGrid, updateResearchDisplay } from './world-7/research';
import { Minehead, updateMinehead, updateMineheadDropRate, updateMineheadDailyTries, updateMineheadBaseDamage, updateMineheadDepthCharges, updateMineheadCurrencyGain } from './world-7/minehead';
import { Glimbo, updateGlimbo } from './world-7/glimbo';
import { JellyOperator, updateJellyOperator, updateJellyOperatorPresentation } from './world-7/jellyOperator';
import { Button, updateButton } from './world-7/button';
import { StarSigns, updateInfinityStarSigns, updateStarSignsUnlocked, updateStarSignMeritocracyBonus } from './starsigns';
import { IslandExpeditions, updateIslandExpeditions, updateIslandRewardPossession } from './world-2/islandExpedition';
import { Tome, updateTomeBonuses, updateTomeScores } from './world-4/tome';
import { KillRoy, updateKillroy } from './world-2/killroy';
import { updateVotesBonus, Votes } from './world-2/votes';
import { Hole, updateHole, updateHoleCharacterCapabilities, updateHolePresentation, updateHoleStudyEffects, updateHoleUpgradeEffects, updateHoleWell } from './world-5/hole/hole';
import { UpgradeVault } from './upgradeVault';
import { Grimoire, updateGrimoireEfficiency, updateGrimoireUpgradeCosts } from './grimoire';
import { Tesseract, updateArcaneCultistImpact, updateTesseractEfficiency, updateTesseractUpgradeCosts } from './tesseract';
import { Compass, updateCompassDamageEfficiency, updateCompassExaltedStampBonus, updateCompassUpgradeCosts } from './compass';
import { Emperor, updateEmperorMaxAttempts, updateEmperorBonuses } from './world-6/emperor';
import { RoyalArmory, updateRoyalArmory, updateRoyalArmoryLateInputs } from './world-6/royalArmory/royalArmory';
import { EquipmentSets } from './misc/equipmentSets';
import { EventShop } from './eventShop';
import { Friends, updateFriends } from './friends';
import { Clamworks, updateClamWorkOutputs } from './world-7/clamworks';
import { Meritocraty, updateMeritocratyBonus, updateMeritocratyLate } from './world-7/meritocraty';
import { LegendTalents, updateLegendTalents } from './world-7/legendTalents';
import { MasterClasses, updateMasterClasses } from './masterClasses';
import { CoralKid } from './world-7/coralKid';
import { Bubba, updateBubba, updateBubbaMeatRate } from './world-3/bubba';
import { BigFish, updateBigFishUnlocked } from './world-7/bigFish';
import { CoralReef, updateCoralReefDailyGain, updateCoralReefMaximumLevels } from './world-7/coralReef';
import { DancingCoral } from './world-7/dancingCoral';
import { Hoops } from './world-1/hoops';
import { Darts } from './world-1/darts';
import { Orion, updateOrionFeatherRate, updateOrionGlobalBonus } from './world-1/orion';
import { Poppy, updatePoppyFishRate, updatePoppyFishPerCatch, updatePoppyGlobalBonus } from './world-2/poppy';
import { updateNonDepositedZenithClusters, ZenithMarket } from './world-7/zenithShop';
import { Gallery, updateGallery } from './world-7/gallery';
import { HatRack, updateHatRack } from './world-7/hatRack';
import { Skilling, updateAllEfficiencies, updateAllSkillExperienceMultiplier, updateSkillEfficiencies } from './skilling';
import { updateAttributeTalents, updatePowerTalents, updateRightHandOfActionBonuses } from './talents';
import { updatePlayerHealth } from './player-health';
import { Menagerie, prepareMenagerie, updateMenagerieMissions } from "./menagerie";
import { Speedrun, updateSpeedrunBonuses, updateSpeedrun } from './speedrun';
import { updateWeeklyBoss } from './weekly-boss';

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
    new GoldenFood("goldenFood"),
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
    new Speedrun("speedrun"),
    new Sneaking("sneaking"),
    new Summoning("summoning"),
    new Farming("farming"),
    new SushiStation("sushi"),
    new Spelunking("spelunking"),
    new ResearchGrid("research"),
    new Minehead("minehead"),
    new Glimbo("glimbo"),
    new JellyOperator("jellyOperator"),
    new StarSigns("starsigns"),
    new Button("button"),
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
    new RoyalArmory("royalArmory"),
    new EquipmentSets("equipmentSets"),
    new EventShop("eventShop"),
    new Friends("friends"),
    new Clamworks("clamworks"),
    new Meritocraty("meritocraty"),
    new LegendTalents("legendTalents"),
    new MasterClasses("masterClasses"),
    new Bubba("bubba"),
    new CoralKid("coralKid"),
    new BigFish("bigFish"),
    new CoralReef("coralReef"),
    new DancingCoral("dancingCoral"),
    new Hoops("hoops"),
    new Darts("darts"),
    new Orion("orion"),
    new Poppy("poppy"),
    new ZenithMarket("zenithMarket"),
    new Gallery("gallery"),
    new HatRack("hatRack"),
    new Skilling("skilling"),
    new Menagerie("menagerie"),
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

export const initAccountDataKeys = (allItems: Item[], repositories: StaticRepositories) => {
    const accountData: Map<string, any> = new Map();
    accountData.set("itemsData", allItems);
    domainList.forEach(dataDomain => {
        if (!dataDomain.initialized) {
            const key = dataDomain.getDataKey();
            const domainData = dataDomain.init(allItems, 0, repositories);
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
    // Tome reads mastery-scaled open floors before the existing Sneaking update.
    "sneakingProgression": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateSneakingProgression(accountData),
    // Study effects use saved state and must be ready before schematic consumers.
    "holeStudyEffects": (_doc: Cloudsave, accountData: Map<string, any>) => updateHoleStudyEffects(accountData),
    // Camp effects use parsed Majik and Harp state before their shared consumers.
    "holeUpgradeEffects": (_doc: Cloudsave, accountData: Map<string, any>) => updateHoleUpgradeEffects(accountData),
    // Pet Arena Crucible rewards need parsed Menagerie unlocks before Menagerie prepares Lumi inputs.
    "breedingCrucibleLevel": (_doc: Cloudsave, accountData: Map<string, any>) => prepareBreedingCrucibleLevel(accountData),
    // Shiny levels need their Menagerie cap before account-wide shiny effects are distributed.
    "breedingShinyLevels": (_doc: Cloudsave, accountData: Map<string, unknown>) => prepareBreedingShinyLevels(accountData),
    // Parse-owned Menagerie effects must be ready before the earliest recipient calculation.
    "menageriePrepared": (_doc: Cloudsave, accountData: Map<string, any>) => prepareMenagerie(accountData),
    // Coral Reef maximum levels use parsed Menagerie unlocks before cap consumers run.
    "coralReefMaximumLevels": (_doc: Cloudsave, accountData: Map<string, any>) => updateCoralReefMaximumLevels(accountData),
    // Clam Work uses parsed Menagerie state and must settle before post-post-processing consumers.
    "clamWorkOutputs": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateClamWorkOutputs(accountData),
    // Minehead rewards are account-wide inputs to downstream bonus consumers.
    "minehead": (doc: Cloudsave, accountData: Map<string, any>) => updateMinehead(accountData),
    "jellyOperator": (doc: Cloudsave, accountData: Map<string, any>) => updateJellyOperator(accountData),
    "royalArmory": (doc: Cloudsave, accountData: Map<string, any>) => updateRoyalArmory(accountData),
    "updateCompanionImpact": (doc: Cloudsave, accountData: Map<string, any>) => updateCompanionImpact(accountData),
    // Friend Bonuses consumes parsed companion and Event Shop state.
    "friends": (doc: Cloudsave, accountData: Map<string, any>) => updateFriends(accountData),
    // Parsed ownership contributes to Equinox before Research and to Collider/Construction before their consumers.
    "gamingSuperbitImpacts": (doc: Cloudsave, accountData: Map<string, any>) => updateSuperbitImpacts(accountData),
    // Killroy uses parsed Rift progress and prepares run gates before shared bonus consumers.
    "killroy": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateKillroy(accountData),
    // Research consumes parsed companion, Equinox, and Sushi state before downstream consumers calculate.
    "researchGrid": (doc: Cloudsave, accountData: Map<string, any>) => updateResearchGrid(accountData),
    "glimbo": (_doc: Cloudsave, accountData: Map<string, any>) => updateGlimbo(accountData),
    "mineheadDailyTries": (_doc: Cloudsave, accountData: Map<string, any>) => updateMineheadDailyTries(accountData),
    // Minehead's trade multiplier consumes prepared Research without delaying early opponent rewards.
    "mineheadDropRate": (_doc: Cloudsave, accountData: Map<string, any>) => updateMineheadDropRate(accountData),
    // Prepare the canonical account Farming level before sticker odds.
    "farmingLevel": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingLevel(accountData),
    // Stickers need prepared Research and companion effects; Arcade levels, Sushi unlocks and Menagerie ownership are parsed inputs.
    "farmingStickerBonuses": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingStickerBonuses(accountData),
    "button": (doc: Cloudsave, accountData: Map<string, any>) => updateButton(accountData),
    "updateOrionGlobalBonus": (doc: Cloudsave, accountData: Map<string, any>) => updateOrionGlobalBonus(accountData),
    "updatePoppyGlobalBonus": (doc: Cloudsave, accountData: Map<string, any>) => updatePoppyGlobalBonus(accountData),
    "updateBubba": (doc: Cloudsave, accountData: Map<string, any>) => updateBubba(accountData),
    "updateBigFish": (doc: Cloudsave, accountData: Map<string, any>) => updateBigFishUnlocked(accountData),
    "updateMeritocraty": (doc: Cloudsave, accountData: Map<string, any>) => updateMeritocratyBonus(accountData),
    "updateLegendTalents": (doc: Cloudsave, accountData: Map<string, string>) => updateLegendTalents(accountData),
    "mineheadBaseDamage": (_doc: Cloudsave, accountData: Map<string, any>) => updateMineheadBaseDamage(accountData),
    // Earned Palette bonuses consume Legend Talents, not the later equipped-color Luck calculation.
    "gaming": (doc: Cloudsave, accountData: Map<string, any>) => updateGaming(accountData),
    "mineheadDepthCharges": (_doc: Cloudsave, accountData: Map<string, any>) => updateMineheadDepthCharges(accountData),
    // Daily Shopping Spree and early Royal Armory Bargain inputs are ready before shared upgrade costs.
    // Parsed Research accumulation and Outpost selection combine with Compounding Outposting bonus before first-three costs.
    "updateMasterClasses": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateMasterClasses(accountData),
    // Tesseract prices consume both prepared Master Classes multipliers.
    "tesseractUpgradeCosts": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateTesseractUpgradeCosts(accountData),
    // Compass prices also require the prepared shared and first-three discounts.
    "compassUpgradeCosts": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateCompassUpgradeCosts(accountData),
    // Grimoire prices use the same prepared account discounts as Tesseract.
    "grimoireUpgradeCosts": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateGrimoireUpgradeCosts(accountData),
    "updateSlabBonusMultiplier": (doc: Cloudsave, accountData: Map<string, any>) => updateSlabBonusMultiplier(accountData),
    "updatePlayerDeathnote": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerDeathnote(accountData),
    "updatePlayerSpecialTalents": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerSpecialTalents(accountData),
    "emperorBonuses": (doc: Cloudsave, accountData: Map<string, any>) => updateEmperorBonuses(accountData),
    "summoningWinnerBonus": (doc: Cloudsave, accountData: Map<string, any>) => updateSummoningWinnerBonusBoost(accountData),
    "summoningWinnerImpact": (doc: Cloudsave, accountData: Map<string, any>) => updateSummoningWinnerImpact(accountData),
    "starSignsUnlocked": (doc: Cloudsave, accountData: Map<string, any>) => updateStarSignsUnlocked(accountData),
    "divinity": (doc: Cloudsave, accountData: Map<string, any>) => updateDivinity(accountData),
    "updatePlayerTalentLevelWithoutESBonus": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerTalentLevelExceptESBonus(accountData),
    "family": (doc: Cloudsave, accountData: Map<string, any>) => calculateFamily(accountData),
    "updatePlayerTalentLevelESBonus": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerTalentLevelESBonus(accountData),
    "arcaneCultistImpact": (doc: Cloudsave, accountData: Map<string, any>) => updateArcaneCultistImpact(accountData),
    "updateAllShinies": (doc: Cloudsave, accountData: Map<string, any>) => updateAllShinyEffects(accountData),
    "updateInfinityStarSigns": (doc: Cloudsave, accountData: Map<string, any>) => updateInfinityStarSigns(accountData),
    "playerStarSigns": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerStarSigns(accountData),
    "cards": (doc: Cloudsave, accountData: Map<string, any>) => updateCards(accountData),
    "collider": (doc: Cloudsave, accountData: Map<string, any>) => updateAtomCollider(accountData),
    "artifacts": (doc: Cloudsave, accountData: Map<string, any>) => updateArtifacts(accountData),
    "islandExpeditions": (doc: Cloudsave, accountData: Map<string, any>) => updateIslandExpeditions(accountData),
    "sigils": (doc: Cloudsave, accountData: Map<string, any>) => updateSigils(accountData),
    "storage": (doc: Cloudsave, accountData: Map<string, any>) => updateStorage(accountData),
    "lab": (doc: Cloudsave, accountData: Map<string, any>) => updateLab(accountData),
    "artifactsSlabBonus": (doc: Cloudsave, accountData: Map<string, any>) => updateSailingArtifactSlabBoost(accountData),
    // Journal effects consume the prepared Sailing artifact, including its Slab boost.
    "spelunkingChapterBonuses": (_doc: Cloudsave, accountData: Map<string, any>) => updateSpelunkingChapterBonuses(accountData),
    "alchemySlabBubbles": (doc: Cloudsave, accountData: Map<string, any>) => updateAlchemySlabBubbles(accountData),
    "deathnoteMiniboss": (doc: Cloudsave, accountData: Map<string, any>) => updateDeathnoteMiniboss(accountData),
    "alchemy": (doc: Cloudsave, accountData: Map<string, any>) => updateAlchemy(accountData),
    "playerTalentPoints": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerTalentPoints(accountData),
    "tomeScore": (doc: Cloudsave, accountData: Map<string, any>) => updateTomeScores(accountData),
    "deathnoteWorldRanks": (doc: Cloudsave, accountData: Map<string, any>) => updateDeathnoteWorldRanks(accountData),
    "hole": (doc: Cloudsave, accountData: Map<string, any>) => updateHole(accountData),
    "alchemyTomeBubbles": (doc: Cloudsave, accountData: Map<string, any>) => updateAlchemyTomeBubbles(accountData),
    // Tome bonuses consume the score and Tome-adjusted bubbles above; callers pass the relevant Player to getTomeBonus.
    "tomeBonuses": (doc: Cloudsave, accountData: Map<string, any>) => updateTomeBonuses(accountData),
    "sneaking": (doc: Cloudsave, accountData: Map<string, any>) => updateSneaking(accountData),
    "farmingCropScientist": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingCropScientistBonuses(accountData),
    // Prepare exalted stamp scaling after its account inputs and before stamp bonuses.
    "compassExaltedStampBonus": (_doc: Cloudsave, accountData: Map<string, any>) => updateCompassExaltedStampBonus(accountData),
    "stamps": (doc: Cloudsave, accountData: Map<string, any>) => updateStamps(accountData),
    // Well rates use settled Cavern Resource Stamp bonuses.
    "holeWell": (_doc: Cloudsave, accountData: Map<string, any>) => updateHoleWell(accountData),
    "forge": (doc: Cloudsave, accountData: Map<string, any>) => updateForge(accountData.get("forge"), accountData.get("gems"), accountData.get("menagerie"), accountData.get("cards")),
    "worshipTotalizer": (doc: Cloudsave, accountData: Map<string, any>) => updateWorshipTotalizer(accountData),
    "arcade": (doc: Cloudsave, accountData: Map<string, any>) => updateArcade(accountData),
    "cooking": (doc: Cloudsave, accountData: Map<string, any>) => updateCooking(accountData),
    "statueBuffs": (doc: Cloudsave, accountData: Map<string, any>) => updateStatueBonuses(accountData),
    "sailing": (doc: Cloudsave, accountData: Map<string, any>) => updateSailing(accountData),
    "breeding": (doc: Cloudsave, accountData: Map<string, any>) => updateBreeding(accountData),
    "shrines": (doc: Cloudsave, accountData: Map<string, any>) => updateShrines(accountData),
    // Gallery consumes settled Alchemy, Cards and character-specific Lab chips.
    "gallery": (doc: Cloudsave, accountData: Map<string, any>) => updateGallery(accountData),
    // Hat Rack consumes settled Minehead, companion, Event Shop and Sushi state.
    "hatRack": (doc: Cloudsave, accountData: Map<string, any>) => updateHatRack(accountData),
    // Sushi consumes settled Arcade, Gaming, Collider, Sailing, Research, Button, Jelly and Minehead state.
    "sushiStation": (doc: Cloudsave, accountData: Map<string, any>) => updateSushiStation(accountData),
    "updatePoppyFishPerCatch": (_doc: Cloudsave, accountData: Map<string, any>) => updatePoppyFishPerCatch(accountData),
    "updateBubbaMeatRate": (_doc: Cloudsave, accountData: Map<string, any>) => updateBubbaMeatRate(accountData),
    "mineheadCurrencyGain": (_doc: Cloudsave, accountData: Map<string, any>) => updateMineheadCurrencyGain(accountData),
    "players": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayers(accountData),
    "capacity": (doc: Cloudsave, accountData: Map<string, any>) => updateCapacity(accountData),
    "votes": (doc: Cloudsave, accountData: Map<string, any>) => updateVotesBonus(accountData),
    "playerTalentContexts": (_doc: Cloudsave, accountData: Map<string, any>) => updatePlayerTalentContexts(accountData),
    "speedrunBonuses": (_doc: Cloudsave, accountData: Map<string, any>) => updateSpeedrunBonuses(accountData),
    // Refresh only Voidwalker's fourth-tab total after One Step Ahead receives its final talent inputs.
    "speedrunTalentPoints": (_doc: Cloudsave, accountData: Map<string, any>) => updateSpeedrunTalentPoints(accountData),
    // Gemstone effects use each character's final actual talent level.
    "sneakingGemstones": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateSneakingGemstones(accountData),
    // Prepare Will Of The Eldest's account-wide level cap before attribute source consumers.
    "attributeTalents": (_doc: Cloudsave, accountData: Map<string, any>) => updateAttributeTalents(accountData),
    // Beginner Best Class uses its own beginner-line level cap before weapon-power consumers.
    "powerTalents": (_doc: Cloudsave, accountData: Map<string, any>) => updatePowerTalents(accountData),
    // Land Rank bonuses use final recipient contexts before stat consumers and Farming display snapshots.
    "farmingLandRankBonuses": (_doc: Cloudsave, accountData: Map<string, any>) => updateFarmingLandRankBonuses(accountData),
    // Equipment and Obol attribute modifiers consume each character's final talent context.
    "equipmentProperties": (_doc: Cloudsave, accountData: Map<string, any>) => updateEquipmentProperties(accountData),
    "goldenFood": (_doc: Cloudsave, accountData: Map<string, any>) => updateGoldenFood(accountData),
    // Calculate primary attributes after Golden Food and before attribute-dependent health.
    "playerStats": (_doc: Cloudsave, accountData: Map<string, any>) => updatePlayerStats(accountData),
    // Prepare each character's normal maxima before player-aware efficiency consumers.
    "playerHealth": (doc: Cloudsave, accountData: Map<string, any>) => updatePlayerHealth(accountData),
    "playerPowers": (_doc: Cloudsave, accountData: Map<string, any>) => updatePlayerPowers(accountData),
    "playerSecondaryStats": (_doc: Cloudsave, accountData: Map<string, any>) => updatePlayerSecondaryStats(accountData),
    // Character Prayer bonuses use parsed Superbits and preserve the distinction between absent and empty saved slots.
    "prayerPlayerBonuses": (_doc: Cloudsave, accountData: Map<string, any>) => updatePrayerPlayerBonuses(accountData),
    // Drop rate follows Luck and every prepared persistent source, including late Lab and Sigil results.
    "playerDropRates": (_doc: Cloudsave, accountData: Map<string, any>) => updatePlayerDropRates(accountData),
    "printer": (doc: Cloudsave, accountData: Map<string, any>) => updatePrinter(accountData),
    "worship": (doc: Cloudsave, accountData: Map<string, any>) => updateWorship(accountData),
    "account": (doc: Cloudsave, accountData: Map<string, any>) => updateAccount(accountData),
    "construction": (doc: Cloudsave, accountData: Map<string, any>) => updateConstruction(accountData),
    "deathnoteEquinox": (doc: Cloudsave, accountData: Map<string, any>) => updateDeathnote(accountData),
    "equinox": (doc: Cloudsave, accountData: Map<string, any>) => updateEquinoxBar(accountData),
    // Nobisect reads independent all-skill efficiency after attributes and health-scaled bubbles are ready.
    "allEfficiencies": (doc: Cloudsave, accountData: Map<string, any>) => updateAllEfficiencies(accountData),
    "divinityBlessings": (_doc: Cloudsave, accountData: Map<string, any>) => updateDivinityBlessings(accountData),
    "updatePlayerSkillStatsDN": (_doc: Cloudsave, accountData: Map<string, any>) => updatePlayerSkillStatsDN(accountData),
    // Talent contexts and caps are settled above; prepare Right Hand before shared skill efficiency reads it.
    "rightHandOfActionBonuses": (_doc: Cloudsave, accountData: Map<string, any>) => updateRightHandOfActionBonuses(accountData),
    "updateSkillEfficiencies": (_doc: Cloudsave, accountData: Map<string, any>) => updateSkillEfficiencies(accountData),
    "updateHoleCharacterCapabilities": (_doc: Cloudsave, accountData: Map<string, any>) => updateHoleCharacterCapabilities(accountData),
    // Persistent POW consumes settled producers and effective account upgrade bonuses.
    "spelunkingUpgradeBonuses": (_doc: Cloudsave, accountData: Map<string, any>) => updateSpelunkingUpgradeBonuses(accountData),
    "spelunkingPower": (_doc: Cloudsave, accountData: Map<string, any>) => updateSpelunkingPower(accountData),
    // Saved metrics use final character inputs and effective account upgrade bonuses.
    "spelunkingAccountMetrics": (_doc: Cloudsave, accountData: Map<string, any>) => updateSpelunkingAccountMetrics(accountData),
}

// I really really hate this.
const postPostProcessingMap: Record<string, Function> = {
    "jellyOperator": (doc: Cloudsave, accountData: Map<string, any>) => updateJellyOperatorPresentation(accountData),
    "updateSummoningUpgrades": (doc: Cloudsave, accountData: Map<string, any>) => updateSummoningUpgrades(accountData),
    "updateWorshipTotemsSoulGainBonuses": (doc: Cloudsave, accountData: Map<string, any>) => updateTotemsBonuses(accountData),
    "updateOrionFeatherRate": (doc: Cloudsave, accountData: Map<string, any>) => updateOrionFeatherRate(accountData),
    "updatePoppyFishRate": (doc: Cloudsave, accountData: Map<string, any>) => updatePoppyFishRate(accountData),
    "stamps": (doc: Cloudsave, accountData: Map<string, any>) => updateStampMaxCarry(accountData),
    "traps": (doc: Cloudsave, accountData: Map<string, any>) => updateTrapDisplayData(accountData),
    "slab": (doc: Cloudsave, accountData: Map<string, any>) => updateSlabBonusDisplay(accountData),
    "islandRewardPossession": (doc: Cloudsave, accountData: Map<string, any>) => updateIslandRewardPossession(accountData),
    "playersExtraMaths": (doc: Cloudsave, accountData: Map<string, any>) => playerExtraCalculations(accountData),
    "artifactBuildSpeed": (_doc: Cloudsave, accountData: Map<string, any>) => updateArtifactBuildSpeed(accountData),
    "anvil": (doc: Cloudsave, accountData: Map<string, any>) => updateAnvil(accountData),
    "refinery": (doc: Cloudsave, accountData: Map<string, any>) => updateRefinery(accountData),
    "sailing": (doc: Cloudsave, accountData: Map<string, any>) => updateMinTravelTimeAndSpeed(accountData),
    "sailingCaptainExperience": (doc: Cloudsave, accountData: Map<string, any>) => updateSailingCaptainExperience(accountData),
    "farming": (doc: Cloudsave, accountData: Map<string, any>) => updateFarmingDisplayData(accountData),
    "sigilsChargeSpeed": (doc: Cloudsave, accountData: Map<string, any>) => updateSigilsChargeSpeed(accountData),
    "breedingShinyAndBreedingSpeed": (doc: Cloudsave, accountData: Map<string, any>) => updateBreedingDisplayData(accountData),
    "petBeastmaster": (doc: Cloudsave, accountData: Map<string, any>) => updateBeastMasterImpact(accountData),
    "compassDamageEfficiency": (doc: Cloudsave, accountData: Map<string, any>) => updateCompassDamageEfficiency(accountData),
    "grimoireEfficiency": (doc: Cloudsave, accountData: Map<string, any>) => updateGrimoireEfficiency(accountData),
    "emperorMaxAttempts": (doc: Cloudsave, accountData: Map<string, any>) => updateEmperorMaxAttempts(accountData),
    "tesseractEfficiency": (doc: Cloudsave, accountData: Map<string, any>) => updateTesseractEfficiency(accountData),
    "coralReefDailyGains": (doc: Cloudsave, accountData: Map<string, any>) => updateCoralReefDailyGain(accountData),
    "nonDepositedZenithClusters": (doc: Cloudsave, accountData: Map<string, any>) => updateNonDepositedZenithClusters(accountData),
    "alerts": (doc: Cloudsave, accountData: Map<string, any>) => updateAlerts(accountData),
    "royalArmoryLate": (doc: Cloudsave, accountData: Map<string, any>) => updateRoyalArmoryLateInputs(accountData),
    "meritocraty": (doc: Cloudsave, accountData: Map<string, any>) => updateMeritocratyLate(accountData),
    // Construction rates read Star Sign bonuses after Meritocracy settles.
    "starSignMeritocracyBonus": (_doc: Cloudsave, accountData: Map<string, any>) => updateStarSignMeritocracyBonus(accountData),
    // Shared ninja inputs need settled account Star Signs and final talent, statue, ballot, and Land Rank bonuses.
    "sneakingNinjas": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateSneakingNinjas(accountData),
    // Omnijade summaries and Charm Collector need the prepared permanent charms and settled account providers.
    "sneakingOmnijade": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateSneakingOmnijade(accountData),
    "shinyCritterRewardMultiplier": (_doc: Cloudsave, accountData: Map<string, any>) => updateShinyCritterRewardMultiplier(accountData),
    // Numerical stamina inputs need late Royal Armory and Meritocracy before page-stack preparation.
    "spelunkingLateCalculations": (_doc: Cloudsave, accountData: Map<string, any>) => updateSpelunkingLateCalculations(accountData),
    "spelunkingPresentation": (_doc: Cloudsave, accountData: Map<string, any>) => updateSpelunkingPresentation(accountData),
    // These Gaming results are UI-only; Imports, Garden and Palette chances need the settled account inputs above.
    "gaming": (doc: Cloudsave, accountData: Map<string, any>) => updateGamingDisplay(accountData),
    // Research presentation needs settled producers and the selected Royal Outpost's late inputs.
    "researchDisplay": (_doc: Cloudsave, accountData: Map<string, any>) => updateResearchDisplay(accountData),
    // Hole inspection uses settled account bonuses, Player contexts and matching Statue bonuses.
    "holePresentation": (_doc: Cloudsave, accountData: Map<string, any>) => updateHolePresentation(accountData),
    "menagerieMissions": (_doc: Cloudsave, accountData: Map<string, any>) => updateMenagerieMissions(accountData),
    // Button task progress uses settled account and character results.
    "buttonTaskProgress": (_doc: Cloudsave, accountData: Map<string, any>) => updateButtonTaskProgress(accountData),
    "allSkillExperienceMultiplier": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateAllSkillExperienceMultiplier(accountData),
    "divinityRates": (_doc: Cloudsave, accountData: Map<string, unknown>) => updateDivinityRates(accountData),
    // Weekly task inputs need final character, capacity, stamp, shrine, prayer, and companion preparation.
    "weeklyBoss": (_doc: Cloudsave, accountData: Map<string, any>) => {
        updateWeeklyBoss(accountData);
        return (accountData.get("account") as Account).weeklyBoss;
    },
    "speedrun": (_doc: Cloudsave, accountData: Map<string, any>) => {
        updateSpeedrun(accountData);
        // This map stores updater returns, so retain the registered domain.
        return accountData.get("speedrun");
    },
}

export const updateIdleonData = (accountData: Map<string, any>, data: Cloudsave, charNames: string[], companions: CompanionState[], serverVars: Record<string, any>, isStatic: boolean = false) => {
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
