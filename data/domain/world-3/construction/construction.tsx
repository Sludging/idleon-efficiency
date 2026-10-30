import { range } from "../../../utility";
import { Achievement } from "../../achievements";
import { Alchemy } from "../../world-2/alchemy/alchemy";
import { AtomCollider, CarbonAtom } from "./atomCollider";
import { getCompanionActiveBonus } from "../../companions";
import type { Companion } from "../../companions";
import { Domain, RawData } from "../../base/domain";
import { Building } from "./buildings";
import type { BuildingCompletionTimes } from "./buildings";
import { Cooking } from "../../world-4/cooking";
import { initBuildingRepo } from "../../data/BuildingRepo";
import { ImageData } from "../../imageData";
import { Item } from "../../items";
import { ConstructionMastery, Rift } from "../../world-4/rift";
import { Stamp } from "../../world-1/stamps";
import { Storage } from "../../storage";
import { DancingCoral } from "../../world-7/dancingCoral";
import { Menagerie } from "../../menagerie";
import { Player } from "../../player";
import { CogBoard, getRoyalOutpostCogBuildSpeedMultiplier } from "./cog";
import type { RoyalArmory } from "../../world-6/royalArmory/royalArmory";
import { SushiStation } from "../../world-7/sushi";
import type { Hole } from "../../world-5/hole/hole";
import type { ResearchGrid } from "../../world-7/research";
import type { Card } from "../../cards";
import type { GemStore } from "../../gemPurchases";
import type { LegendTalents } from "../../world-7/legendTalents";
import type { Lab } from "../../world-4/lab";
import type { Minehead } from "../../world-7/minehead";
import type { EventShop } from "../../eventShop";
import { initLibraryMetadataRepo } from "../../data/LibraryMetadataRepo";
import { initRandoListRepo } from "../../data/RandoListRepo";
import { initTalentTreeRepo } from "../../data/TalentTreeRepo";
import { ClassIndex, ClassTalentMap } from "../../talents";
import type { Talent } from "../../talents";
import type { Sailing } from "../../world-5/sailing/sailing";
import type { Summoning } from "../../world-6/summoning";
import type { SaltLick } from "./saltLick";
import type { TaskBoard } from "../../tasks";
import type { Breeding } from "../../world-4/breeding";
import type { Sigils } from "../../world-2/alchemy/sigils";

export { getCogPlayerBaseExpRate } from "./playerBuildSpeed";

const BOOKS_FOR_MAX_CHECKOUT = 20;
const libraryMetadata = initLibraryMetadataRepo()[0].data;
const vipLibrarySkills = new Set(libraryMetadata.vipTalents.map(talent => talent.skillIndex));
const randoLists = initRandoListRepo();
const libraryBlacklist = new Set(randoLists[16].data.elements.map(Number));
const hiddenLibraryClasses = new Set(randoLists[67].data.elements);
const libraryTalentPages = initTalentTreeRepo();


export class Library {
    currentBooks: number = 0;
    libCheckoutSpeed: number = 0;
    maximumBookLevel: number = libraryMetadata.baseMaximumLevel;
    vipMembership: number = 0;

    resetBookLevels(): void {
        this.maximumBookLevel = libraryMetadata.baseMaximumLevel;
        this.vipMembership = 0;
    }

    prepareBookLevels(data: Map<string, any>, players: readonly Player[]): void {
        const sailing = data.get("sailing") as Sailing;
        const summoning = data.get("summoning") as Summoning;
        const collider = data.get("collider") as AtomCollider;
        const achievements = data.get("achievements") as Achievement[];
        const saltLick = data.get("saltLick") as SaltLick;
        const taskboard = data.get("taskboard") as TaskBoard;
        const cooking = data.get("cooking") as Cooking;
        const breeding = data.get("breeding") as Breeding;
        const sigils = data.get("sigils") as Sigils;

        this.maximumBookLevel = Math.round(
            libraryMetadata.baseMaximumLevel
            + sailing.artifacts[21].getBonus()
            + summoning.getSummoningWinnerBonusFromIndex(19)
            + libraryMetadata.oxygenMaximumIncrease * Math.min(collider.atoms[libraryMetadata.oxygenAtomIndex].level, 1)
            + Math.min(libraryMetadata.checkoutAchievementMaximumIncrease, Math.max(0,
                libraryMetadata.checkoutAchievementMaximumIncrease * Number(achievements[libraryMetadata.checkoutAchievementIndex].completed)))
            + saltLick.getBonus(4)
            + taskboard.merits[18].getBonus()
        );
        this.vipMembership = cooking.getMealBonusForKey("VIP")
            + libraryMetadata.arenaMembershipBonuses.reduce((sum, bonus) =>
                sum + (breeding.hasBonus(bonus.arenaBonusIndex) ? bonus.membershipIncrease : 0), 0)
            + sigils.sigils[15].getBonus();

        for (const player of players) {
            const beginnerPageCount = player.classId === ClassIndex.Voidwalker ? 4
                : player.classId === ClassIndex.Maestro ? 3 : 2;
            const pageNames = ["Beginner", "Journeyman", "Maestro", "Voidwalker"].slice(0, beginnerPageCount);
            const currentClass = ClassIndex[player.classId].toUpperCase();
            for (const page of ClassTalentMap[player.classId]) {
                const className = page.toUpperCase().replace(/ /g, "_");
                if (!hiddenLibraryClasses.has(className) || className === currentClass) {
                    pageNames.push(page);
                }
            }
            const eligibleSkills = new Set(
                libraryTalentPages.filter(page => pageNames.includes(page.id))
                    .flatMap(page => Object.values(page.data.talents).map(talent => talent.skillIndex))
            );
            for (const vip of libraryMetadata.vipTalents) {
                if (this.vipMembership >= vip.requiredMembership) {
                    eligibleSkills.add(vip.skillIndex);
                }
            }
            for (const talent of player.talents) {
                talent.libraryMaxLevel = !libraryBlacklist.has(talent.skillIndex) && eligibleSkills.has(talent.skillIndex)
                    ? this.maximumBookLevel : undefined;
            }
        }
    }

    getBookCheckoutSummary(talents: readonly Talent[]): { requiredCheckouts: number; vipTalentsToBook: number } {
        let requiredCheckouts = 0;
        let vipTalentsToBook = 0;
        const countedSkills = new Set<number>();

        for (const talent of talents) {
            if (!talent.canBookHigher() || countedSkills.has(talent.skillIndex)) {
                continue;
            }

            // Shared talent identities need only one book, even when several pages display them.
            countedSkills.add(talent.skillIndex);
            if (vipLibrarySkills.has(talent.skillIndex)) {
                // VIP books roll random levels and cannot use the guaranteed maximum setting.
                vipTalentsToBook++;
            } else {
                requiredCheckouts += BOOKS_FOR_MAX_CHECKOUT;
            }
        }

        return { requiredCheckouts, vipTalentsToBook };
    }


    secondsToNextCheckout: number = -1;
    secondsToMaxCheckout: number = -1;

    gamingCheckoutBoost: number = 0;

    getTimeTillNextCheckout = (currentBooks: number = this.currentBooks) => {
        return Math.round(this.libCheckoutSpeed * (1 + 10 * Math.pow(currentBooks, 1.4) / 100));
    }

    getTimeTillMaxCheckout = () => {
        if (this.currentBooks >= BOOKS_FOR_MAX_CHECKOUT) {
            return 0;
        }

        return range(this.currentBooks, BOOKS_FOR_MAX_CHECKOUT).reduce((sum, bookCount) => {
            sum += this.getTimeTillNextCheckout(bookCount);
            return sum;
        }, 0)
    }

    getImageData = (): ImageData => {
        return {
            location: "Libz",
            height: 37,
            width: 35,
        }
    }
}

export interface ConstructionBuildingTiming {
    playerID: number;
    playerName: string;
    lowerBuildRatePercent: number;
    normalBuildSpeed: number;
    trimmedBuildSpeed: number;
    buildings: BuildingCompletionTimes[];
}

export interface TrimmedSlotContributions {
    minehead: number;
    lab: number;
    atom: number;
    legendTalent: number;
    gambit: number;
    eventShop: number;
}

export class Construction extends Domain {
    buildings: Building[] = [];
    buildingSlots: number[] = [-1, -1, -1, -1, -1, -1, -1, -1];
    trimmedSlotCount: number = 0;
    trimmedSlotContributions: TrimmedSlotContributions = {
        minehead: 0, lab: 0, atom: 0, legendTalent: 0, gambit: 0, eventShop: 0,
    };
    totalBuildSpeed: number = 0;
    private buildingTimingByPlayer = new Map<number, ConstructionBuildingTiming>();
    bestBuildingTiming: ConstructionBuildingTiming | null = null;
    buildingTimingComparison: ConstructionBuildingTiming[] = [];
    cogProgress: { name: string, progress: number }[] = [
        { name: "Nooby", progress: 0 },
        { name: "Decent", progress: 0 },
        { name: "Superb", progress: 0 },
        { name: "Ultimate", progress: 0 },
    ];
    library: Library = new Library();
    cogBoard: CogBoard = new CogBoard();

    getBuildingTiming(player: Player): ConstructionBuildingTiming {
        return this.buildingTimingByPlayer.get(player.playerID)!;
    }

    prepareBuildingTiming(rates: { player: Player; normalBuildSpeed: number }[], trimmedMultiplier: number): void {
        this.buildingTimingByPlayer.clear();
        this.bestBuildingTiming = null;
        this.buildingTimingComparison = [];
        rates.forEach(({ player, normalBuildSpeed }) => {
            const trimmedBuildSpeed = normalBuildSpeed * trimmedMultiplier;
            const timing = {
                playerID: player.playerID,
                playerName: player.playerName,
                lowerBuildRatePercent: 0,
                normalBuildSpeed,
                trimmedBuildSpeed,
                buildings: this.buildings.map(building => building.getCompletionTimes(normalBuildSpeed, trimmedBuildSpeed)),
            };
            this.buildingTimingByPlayer.set(player.playerID, timing);
            this.buildingTimingComparison.push(timing);
            if (!this.bestBuildingTiming || normalBuildSpeed > this.bestBuildingTiming.normalBuildSpeed) {
                this.bestBuildingTiming = timing;
            }
        });
        const bestRate = this.bestBuildingTiming?.normalBuildSpeed ?? 0;
        this.buildingTimingComparison.forEach(timing => {
            timing.lowerBuildRatePercent = bestRate > 0
                ? (bestRate - timing.normalBuildSpeed) / bestRate * 100
                : 0;
        });
    }


    getRawKeys(): RawData[] {
        return [
            { key: "Tower", perPlayer: false, default: [] },
            { key: "CogM", perPlayer: false, default: [] },
            { key: "CogO", perPlayer: false, default: [] },
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.buildings = Building.fromBase(initBuildingRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const construction = data.get(this.getDataKey()) as Construction;

        // init again to reset the data set;
        // TODO: This is very ugly, need to do better.
        construction.init([], 0);
        construction.buildingTimingByPlayer.clear();
        construction.bestBuildingTiming = null;
        construction.buildingTimingComparison = [];
        construction.library.resetBookLevels();
        construction.cogBoard.parse(data.get("CogM"), data.get("CogO"));

        const towerData = data.get("Tower") as number[];
        const optionsList = data.get("OptLacc") as number[];


        // 55 = building slot 1 = tower number
        // 56 = building slot 2 = -1 if empty
        // 57 = building slot 3 = -1 if empty
        // 58 = building slot 4 = -1 if empty
        // 59 = building slot 5 = -1 if empty
        // 60 = building slot 6 = -1 if empty
        // 61 = building slot 7 = -1 if empty
        // 62 = building slot 8 = -1 if empty
        towerData.slice(54, 62).forEach((buildingSlot, index) => {
            construction.buildingSlots[index] = buildingSlot;
        });

        // 63 = Progress on nooby cogs
        // 64 = Progress on decent cogs
        // 65 = Progress on superb cogs
        // 66 = Progress on ultimate cogs
        towerData.slice(62, 66).forEach((cogProgress, index) => {
            construction.cogProgress[index].progress = cogProgress;
        });

        construction.buildings.forEach((building) => {
            building.level = towerData[building.index];

            // Next level is unlocked if the next index for this building is +1.
            building.nextLevelUnlocked = (building.level + 1) == towerData[building.index + construction.buildings.length];

            // Current XP is the last set of indexes, with 12 in the middle of misc info.
            building.currentXP = towerData[building.index + 12 + construction.buildings.length * 2];

            building.currentlyBuilding = construction.buildingSlots.includes(building.index);
            building.unlocked = building.index % 9 === 0 || towerData[building.index - 1] > 0;
        });

        // current book count;
        construction.library.currentBooks = optionsList[55] as number || 0;
    }
}

export const updateLibraryBookLevels = (data: Map<string, any>): Library => {
    const library = (data.get("construction") as Construction).library;
    library.prepareBookLevels(data, data.get("players") as Player[]);
    return library;
}

export const updateConstruction = (data: Map<string, any>) => {
    const construction = data.get("construction") as Construction;
    const alchemy = data.get("alchemy") as Alchemy;
    const stamps = data.get("stamps") as Stamp[][];
    const achievements = data.get("achievements") as Achievement[];
    const cooking = data.get("cooking") as Cooking;
    const timeAway = JSON.parse((data.get("rawData") as { [k: string]: any })["TimeAway"]);
    const collider = data.get("collider") as AtomCollider;
    const rift = data.get("rift") as Rift;
    const storage = data.get("storage") as Storage;
    const dancingCoral = data.get("dancingCoral") as DancingCoral;
    const menagerie = data.get("menagerie") as Menagerie;
    const sushi = data.get("sushi") as SushiStation;
    const hole = data.get("hole") as Hole;
    const costCruncher = construction?.buildings.find(building => building.index == 5) as Building;

    // Figure out max building levels
    const constMastery = rift.bonuses.find(bonus => bonus.name == "Construct Mastery") as ConstructionMastery;
    construction.buildings.forEach(building => {
        building.maxLvl = building.baseMaxLvl;
        switch (building.index) {
            // Library
            case 1:
                building.maxLvl += constMastery.getBonusByIndex(3);
                break;
            // Drone
            case 6:
                building.maxLvl += constMastery.getBonusByIndex(1);
                break;
            // Wizard Towers
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                const carbonAtom = collider.atoms[5] as CarbonAtom
                building.maxLvl += Math.round(constMastery.getBonusByIndex(6) + carbonAtom.getExtraLevels() + 100 * hole.gambit.getBonus(9));
                break;
            // Shrines
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
                building.maxLvl = Math.round(
                    building.baseMaxLvl
                    + constMastery.getBonusByIndex(5)
                    + (dancingCoral.isDancingCoralPurchased(building.index - 18) ? 100 : 0)
                    + sushi.getBonusFromIndex(58)
                    + menagerie.getBonusValue(5),
                );
                break;
        }

        building.maxed = building.level >= building.maxLvl;
        // If we aren't already max level, check if our current build xp is higher then required.
        if (!building.maxed) {
            building.finishedUpgrade = building.currentXP >= building.getBuildCost();
        }

        building.buildPercentage = Math.min(Math.round((building.currentXP * 100) / building.getBuildCost()), 100);

        building.upgradable = building.getLevelCosts(building.level, costCruncher).filter((costData, _) => {
            const amountInStorage = storage?.amountInStorage(costData.item) ?? 0;
            if (amountInStorage >= costData.quantity) {
                return true;
            }
        }).length == 2 && (building.buildPercentage === 100 || building.nextLevelUnlocked);
    })


    // Lib checkout speed
    const mealBonus = cooking.getMealBonusForKey("Lib");
    const alchemyBonus = alchemy.getBubbleBonusForKey("booksSpeed");
    const vialBonus = alchemy.getVialBonusForKey("TalBookSpd");
    const colliderBonus = collider.atoms[7].getBonus();
    const stampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.data.effect == "BookSpd").reduce((sum, stamp) => sum += stamp.getBonus(), 0);

    construction.library.libCheckoutSpeed = 4 *
        (3600 / (
            (1 + mealBonus / 100) *
            (1 + colliderBonus / 100) *
            (1 + (5 * construction.buildings[1].level + alchemyBonus + vialBonus + (
                stampBonus + Math.min(30, Math.max(0, 30 * (achievements[145].completed ? 1 : 0))))
                + construction.library.gamingCheckoutBoost) / 100)));

    // Figure out how long since library was checked.
    let timeSinceCheck = timeAway["BookLib"];
    const time = new Date()
    const gapFromLastSave = (time.getTime() / 1000) - timeAway['GlobalTime'];
    // If more than 5 mintues from last time save was updated, try and add that
    if (gapFromLastSave > 60 * 5) {
        timeSinceCheck += gapFromLastSave;
    }
    // Fake checkouts if been AFK for a long time.
    while (timeSinceCheck > construction.library.getTimeTillNextCheckout()) {
        timeSinceCheck -= construction.library.getTimeTillNextCheckout();
        construction.library.currentBooks += 1;
    }
    construction.library.secondsToNextCheckout = construction.library.getTimeTillNextCheckout() - timeSinceCheck;
    construction.library.secondsToMaxCheckout = construction.library.getTimeTillMaxCheckout() - timeSinceCheck;

    return construction;
}
export interface CogBuildRateResult {
    rate: number;
    characterName: string;
}

const getCogExtraBuildSpeedMultiplier = (data: Map<string, any>, construction: Construction): number => {
    const companions = data.get("companions") as Companion[];
    const royalArmory = data.get("royalArmory") as RoyalArmory;
    const menagerie = data.get("menagerie") as Menagerie;
    const smallCogBuildSpeedBonus = construction.cogBoard.getSmallCogBuildSpeedBonus();
    const companionBuildSpeedBonus = getCompanionActiveBonus(companions, 157);
    const royalOutpostMultiplier = getRoyalOutpostCogBuildSpeedMultiplier(
        royalArmory.getSelectedOutpostBonusIndex(),
        royalArmory.builtOutpostCount,
    );
    return (1 + smallCogBuildSpeedBonus / 100) *
        (1 + companionBuildSpeedBonus / 100) *
        (1 + menagerie.yellowJellyfish.upgrades[0].effect / 100) *
        Math.max(1, royalOutpostMultiplier);
}

export const getCogBuildRateForContext = (data: Map<string, any>, contextPlayer: Player): number => {
    const construction = data.get("construction") as Construction;
    const players = data.get("players") as Player[];
    return construction.cogBoard.getBuildRateForContext(
        players,
        getCogExtraBuildSpeedMultiplier(data, construction),
        data,
        contextPlayer,
    );
}

export const getBestCogBuildRate = (data: Map<string, any>): CogBuildRateResult => {
    const players = data.get("players") as Player[];
    return players.map(contextPlayer => ({
        rate: getCogBuildRateForContext(data, contextPlayer),
        characterName: contextPlayer.playerName,
    })).reduce((best, current) => current.rate > best.rate ? current : best);
}

export const updateConstructionBuildingTiming = (data: Map<string, any>): Construction => {
    const construction = data.get("construction") as Construction;
    const players = data.get("players") as Player[];
    const collider = data.get("collider") as AtomCollider;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const minehead = data.get("minehead") as Minehead;
    const lab = data.get("lab") as Lab;
    const hole = data.get("hole") as Hole;
    const eventShop = data.get("eventShop") as EventShop;
    const contributions = {
        minehead: Math.min(1, minehead.getBonusFromIndex(18)),
        lab: Math.ceil(lab.jewels[3].getBonus() / 5),
        atom: Math.min(collider.atoms[6].level, 1),
        legendTalent: Math.min(1, legendTalents.getBonusFromIndex(33)),
        gambit: hole.gambit.getBonus(9),
        eventShop: Number(eventShop.isBonusOwned(14)),
    };
    construction.trimmedSlotContributions = contributions;
    construction.trimmedSlotCount = Math.round(Math.min(8, Object.values(contributions).reduce((sum, value) => sum + value, 0)));
    construction.buildings.forEach(building => {
        building.currentlyTrimmed = construction.buildingSlots.slice(0, construction.trimmedSlotCount).includes(building.index);
    });
    const trimmedMultiplier = (3 + collider.atoms[6].getBonus() / 100) *
        (1 + legendTalents.getBonusFromIndex(33) / 100);

    construction.prepareBuildingTiming(players.map(player => ({
        player,
        normalBuildSpeed: getCogBuildRateForContext(data, player),
    })), trimmedMultiplier);
    return construction;
}

export const getCogFlaggyRateForContext = (data: Map<string, any>, contextPlayer: Player): number => {
    const construction = data.get("construction") as Construction;
    const players = data.get("players") as Player[];
    const research = data.get("research") as ResearchGrid;
    const menagerie = data.get("menagerie") as Menagerie;
    const cards = data.get("cards") as Card[];
    const gems = data.get("gems") as GemStore;
    const smallCogBonus = construction.cogBoard.getSmallCogFlaggyRateBonus();
    const researchBonus = research.getBonusForId(89);
    const yellowJellyfishBonus = menagerie.yellowJellyfish.upgrades[2].effect;
    const cardLevel = cards.find(card => card.id === "w7b3")!.getLevels();
    const extraFlaggyRateMultiplier = (1 + smallCogBonus / 100) *
        (1 + researchBonus / 100) *
        (1 + yellowJellyfishBonus / 100) *
        (1 + 10 * cardLevel / 100);
    const flaggyPurchase = gems.purchases.find(purchase => purchase.no === 118)!;
    const gemShopFlaggyMultiplier = 1 + 50 * flaggyPurchase.pucrhased / 100;

    return construction.cogBoard.getFlaggyRateForContext(
        players,
        extraFlaggyRateMultiplier,
        gemShopFlaggyMultiplier,
        data,
        contextPlayer,
    );
}

export interface CogFlaggyRateResult {
    rate: number;
    characterName: string;
}

export const getBestCogFlaggyRate = (data: Map<string, any>): CogFlaggyRateResult => {
    const players = data.get("players") as Player[];
    let best = { rate: 0, characterName: "" };
    for (const contextPlayer of players) {
        const rate = getCogFlaggyRateForContext(data, contextPlayer);
        if (best.characterName === "" || rate > best.rate) {
            best = { rate, characterName: contextPlayer.playerName };
        }
    }
    return best;
}