import { initArtifactRepo } from "./data/ArtifactRepo";
import { initIslandInfoRepo, IslandInfoBase } from "./data/IslandInfoRepo";
import { CaptainBonusBase, initCaptainBonusRepo } from './data/CaptainBonusRepo';
import { CaptainBonusModel } from './model/captainBonusModel';
import { ImageData } from "./imageData";
import { IslandInfoModel } from "./model/islandInfoModel";
import { Artifact, SlabInfluencedArtifact } from "./sailing/artifacts";
import { Cooking } from "./cooking";
import { Sigils } from "./sigils";
import { Divinity } from "./divinity";
import { Card } from "./cards";
import { Alchemy } from "./alchemy";
import { Stamp } from "./world-1/stamps";
import { PlayerStatues } from "./statues";
import { GemStore } from "./gemPurchases";
import { Player } from "./player";
import { Family } from "./family";
import { ClassIndex } from "./talents";
import { range } from "../utility";
import { TaskBoard } from "./tasks";
import { Achievement } from "./achievements";
import { Rift, SkillMastery } from "./rift";
import { SkillsIndex } from "./SkillsIndex";
import { Worship, TotalizerBonus } from "./worship";
import { Domain, RawData } from "./base/domain";
import { Item } from "./items";
import { StarSigns } from "./starsigns";
import { Sneaking } from "./world-6/sneaking";

// "Captains": [
//     [0,0,-1,3,6.75,2,0],
//     [0,1,-1,4,259.25,6,0],

// [3] == level
// [0] == Trait1?
// [1] == Trait2?
// [5] == Base of trait 1
// [6] == Base of trait 2

const captainBonuses = initCaptainBonusRepo();

export enum IslandStatus {
    Discoverd,
    Hidden
}

export class CaptainTrait {
    bonus: CaptainBonusModel;
    traitIndex: number;
    constructor(bonus: CaptainBonusBase, public baseValue: number, public currentBonus: number) {
        this.bonus = bonus.data;
        this.traitIndex = bonus.index;
    }

    getBonusText = (includeBase: boolean = true) => {
        return `+${this.currentBonus}%${includeBase ? `(${this.baseValue})` : ""}`;
        //return this.bonus.bonus.replace("{", this.currentBonus.toString());   
    }

    getImageData = () => {
        return {
            location: `SailTra${this.traitIndex}`,
            width: 28,
            height: 23
        }
    }

    static getLootImageData = () => {
        return {
            location: `SailTra1`,
            width: 28,
            height: 23
        }
    }

    static getSpeedImageData = () => {
        return {
            location: `SailTra0`,
            width: 28,
            height: 23
        }
    }
}

export class Captain {
    traits: CaptainTrait[] = [];

    // bonusValues is array of traits, each array holds another array of [traitIndex, bonusValue].
    constructor(public index: number, public level: number, public currentXP: number, traitInfo: number[][]) {
        // If base value is 0, there's no trait.
        traitInfo.forEach(([traitIndex, baseValue]) => {
            if (traitIndex > -1) {
                this.traits.push(new CaptainTrait(captainBonuses[traitIndex], baseValue, baseValue * this.level));
            }
        })
    }

    getExpForNextLevel = () => {
        const firstMath = 9 + Math.pow(this.level, 3);
        const secondMath = Math.pow(1.5, this.level);
        return firstMath * secondMath * Math.pow(1.5, Math.max(this.level - 10, 0));
    }

    getLootBonus = () => {
        return 0;
    }
}

// [1,1,0,10,89.07241619351657,10],
// [2,3,0,10,637.2757311515547,17],
// [0,0,0,9,15.931893278788872,16],
// [3,3,0,12,637.2757311515547,19],
// [-1,-1,-1,5,0,9]

export enum BoatUpgradeType {
    Loot = 0,
    Speed = 1
}
export class Boat {
    sigilBonus: number = 0;
    genieLampBonus: number = 30;

    speed: number = 0;

    // Helper values.
    speedBaseMath = 0;
    speedBaseMathWithoutStarSign = 0;
    speedBaseMathWithSilkrode = 0;
    unendingSearchBonus = 0;
    minTravelTime = 120;

    constructor(public index: number, public assignIsland: Island | undefined, public distanceTravelled: number, public lootUpgrades: number, public speedUpgrades: number, public captain: Captain | undefined) { }

    getSpeedUpgradeType = () => {
        if (this.index < 2) {
            return this.index;
        }
        if (this.index < 5) {
            return 1 + 2 * (this.index - 2)
        }

        return Math.min(30, 2 * (this.index - 4));
    }

    getLootUpgradeType = () => {
        if (this.index < 4) {
            return 0;
        }

        return Math.min(30, 1 + 2 * (this.index - 4));
    }

    getUpgradeCostTillLevel = (type: BoatUpgradeType, targetLevel: number) => {
        const currentUpgradeLevel = type == BoatUpgradeType.Loot ? this.lootUpgrades : this.speedUpgrades;
        return range(currentUpgradeLevel, targetLevel).reduce((sum, level) => sum += this.getUpgradeCost(type, level), 0);
    }

    getUpgradeCost = (type: BoatUpgradeType, targetLevel?: number) => {
        const lootType = type == BoatUpgradeType.Loot ? this.getLootUpgradeType() : this.getSpeedUpgradeType();
        // Taking a page out of Lava's book, ternary operator FTW.
        const currentUpgradeLevel = targetLevel ? targetLevel : type == BoatUpgradeType.Loot ? this.lootUpgrades : this.speedUpgrades;

        if (lootType == 0) {
            return Math.round((5 + 4 * currentUpgradeLevel) * Math.pow(1.17 - .12 * currentUpgradeLevel / (currentUpgradeLevel + 200), currentUpgradeLevel));
        }

        if (lootType % 2 == 1) {
            return Math.round((5 + 2 * currentUpgradeLevel) * Math.pow(1.15 - .1 * currentUpgradeLevel / (currentUpgradeLevel + 200), currentUpgradeLevel))
        }

        return Math.round((2 + currentUpgradeLevel) * Math.pow(1.12 - .07 * currentUpgradeLevel / (currentUpgradeLevel + 200), currentUpgradeLevel));
    }

    getLootValue = (
        { lootUpgrades = this.lootUpgrades, includeCaptain = true }
            : { lootUpgrades?: number, includeCaptain?: boolean } = { lootUpgrades: this.lootUpgrades, includeCaptain: true }
    ) => {
        // Check if captain is boosting the value.
        const captainBonus = includeCaptain ?
            this.captain?.traits.filter(trait => trait.bonus.bonus.includes("Loot Value")).reduce((sum, trait) => sum += trait.currentBonus, 0) ?? 0
            : 0;

        const firstMath = 2 + Math.pow(Math.floor(lootUpgrades / 8), 2);
        return (5 + firstMath * lootUpgrades) * (1 + (this.sigilBonus + (captainBonus + this.genieLampBonus)) / 100) * (1 + this.unendingSearchBonus / 100);
    }

    getSpeedValue = (
        { starSignEquipped, silkRodeEquipped, speedUpgrades = this.speedUpgrades, includeCaptain = true, islandBound = false }
            : { starSignEquipped: boolean, silkRodeEquipped: boolean, speedUpgrades?: number, includeCaptain?: boolean, islandBound?: boolean } = { starSignEquipped:false, silkRodeEquipped:false, speedUpgrades: this.speedUpgrades, includeCaptain: true, islandBound: false }
    ) => {
        // Check if captain is boosting the value.
        const captainBonus = includeCaptain ?
            this.captain?.traits.filter(trait => trait.bonus.bonus.includes("Boat Speed")).reduce((sum, trait) => sum += trait.currentBonus, 0) ?? 0
            : 0;

        const firstMath = 5 + Math.pow(Math.floor(speedUpgrades / 7), 2);
        const boatSpeed = (10 + firstMath * speedUpgrades) * (1 + captainBonus / 100) * (starSignEquipped ? (silkRodeEquipped ? this.speedBaseMathWithSilkrode : this.speedBaseMath) : this.speedBaseMathWithoutStarSign);
        if (islandBound && this.assignIsland) {
            return Math.min(boatSpeed, (this.assignIsland.data.distance * 60) / this.minTravelTime);
        }

        return boatSpeed;
    }
}

export class Island {
    artifacts: Artifact[] = [];
    status: IslandStatus = IslandStatus.Hidden;
    discoverProgress: number = -1;

    constructor(public index: number, public data: IslandInfoModel) { }

    getImageData = (): ImageData => {
        return {
            location: `SailIsland${this.index}`,
            height: 20,
            width: 20,
        }
    }

    static fromBase = (data: IslandInfoBase[]): Island[] => {
        return data.map(island => new Island(island.index, island.data));
    }
}

export class Ship {
    lootLevel: number = 0;
    speedLevel: number = 0;
}

// Sailing: [
//    [-1,-1,-1,-1,3000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//    [660.9760136675222,176.57040000000018,3.8640000000000043,151.72152500000084,313.4682,23.24000000000001,-0.01,5512.430243750001,40.99,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01,-0.01],
//    [5,5],
//    [1,1,2,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]


export class Sailing extends Domain {
    artifacts: Artifact[] = Artifact.fromBase(initArtifactRepo());
    islands: Island[] = Island.fromBase(initIslandInfoRepo());
    boats: Boat[] = [];
    captains: Captain[] = [];
    shopCaptains: Captain[] = [];
    loot: number[] = [];

    maxChests: number = 5;
    captainsUnlocked = 1;
    boatsUnlocked = 1;

    shinyMinSpeedBonus: number = 0;

    starSignInfinity: boolean = false;
    starSignUnlocked: boolean = false;

    nextCaptainCost = () => {
        return (60 * this.captainsUnlocked + 15 * Math.pow(this.captainsUnlocked, 2.2)) * Math.pow(1.52, this.captainsUnlocked) * .6;
    }

    nextBoatCost = () => {
        return (60 * this.boatsUnlocked + 15 * Math.pow(this.boatsUnlocked, 2.25)) * Math.pow(1.55, this.boatsUnlocked);
    }

    // if ("NewCaptBoatSlot" == e) return 0 == s ? (60 * r + 15 * Math.pow(r, 2)) * Math.pow(1.43, r) * .6 : (60 * r + 15 * Math.pow(r, 2)) * Math.pow(1.43, r);
    static getLootImageData = (lootIndex: number): ImageData => {
        return {
            location: `SailT${lootIndex}`,
            height: 22,
            width: 22
        };
    }

    getRawKeys(): RawData[] {
        return [
            {key: "Sailing", perPlayer: false, default: []},
            {key: "Boats", perPlayer: false, default: []},
            {key: "Captains", perPlayer: false, default: []},
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        // Map artifacts to islands to make display easier.
        let artifactIndex = 0;
        this.islands.forEach(island => {
            island.artifacts = this.artifacts.slice(artifactIndex, artifactIndex + island.data.artifactsPerIsland);
            artifactIndex += island.data.artifactsPerIsland;
        })

        return this;
    }

    parse(data: Map<string, any>): void {
        const sailing = data.get(this.getDataKey()) as Sailing;
        const sailingData = data.get("Sailing") as number[][];
        const boatData = data.get("Boats") as number[][];
        const captainData = data.get("Captains") as number[][];

        if (sailingData.length == 0) {
            return;
        }

        // Some sailing data has no "persistence", so we reset the previous data.
        sailing.boats = [];
        sailing.captains = [];

        sailing.loot = sailingData[1];

        // Sailing index 3 = array of artifacts found or not.
        sailingData[3].forEach((artifact, index) => {
            if (index < sailing.artifacts.length) {
                sailing.artifacts[index].updateStatus(artifact);
            }
        })

        sailing.islands.forEach(island => {
            if (sailingData[0][island.index] == -1) {
                island.status = IslandStatus.Discoverd;
            }
            else {
                island.discoverProgress = sailingData[0][island.index];
            }
        });

        sailing.captainsUnlocked = Math.round(sailingData[2][0] + 1);
        sailing.boatsUnlocked = Math.round(sailingData[2][1] + 1);

        captainData.forEach((captain, cIndex) => {
            if (cIndex < sailing.captainsUnlocked && captain[0] != -1) {
                sailing.captains.push(new Captain(cIndex, captain[3], captain[4], [[captain[1], captain[5]], [captain[2], captain[6]]]));
            } else if (cIndex >= captainData.length - 3) {
                sailing.shopCaptains.push(new Captain(cIndex, captain[3], captain[4], [[captain[1], captain[5]], [captain[2], captain[6]]]));
            }
        })

        // [1,4,1,14,1827.7902880492559,17],
        // [2,4,1,14,1290.5608459374048,23]
        boatData.forEach((boat, bIndex) => {
            if (bIndex < sailing.boatsUnlocked && (boat[3] + boat[5]) != 0) {
                const boatCaptain = sailing.captains.find(captain => captain.index == boat[0]);
                const targetIsland = boat[1] != -1 && boat[1] < sailing.islands.length ? sailing.islands[boat[1]] : undefined;
                sailing.boats.push(new Boat(bIndex, targetIsland, boat[4], boat[3], boat[5], boatCaptain));
            }
        })
    }
}

export const updateSailing = (data: Map<string, any>) => {
    const sailing = data.get("sailing") as Sailing;
    const cooking = data.get("cooking") as Cooking;
    const sigils = data.get("sigils") as Sigils;
    const divinity = data.get("divinity") as Divinity;
    const cards = data.get("cards") as Card[];
    const stamps = data.get("stamps") as Stamp[][];
    const statues = data.get("statues") as PlayerStatues[];
    const alchemy = data.get("alchemy") as Alchemy;
    const gemStore = data.get("gems") as GemStore;
    const players = data.get("players") as Player[];
    const taskboard = data.get("taskboard") as TaskBoard;
    const achievements = data.get("achievements") as Achievement[];
    const rift = data.get("rift") as Rift;
    const worship = data.get("worship") as Worship;
    const starSigns = data.get("starsigns") as StarSigns;
    const sneaking = data.get("sneaking") as Sneaking;

    const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;

    const chestPurchases = gemStore.purchases.find(upgrade => upgrade.no == 129)?.pucrhased ?? 0;
    const artifactBoost = sailing.artifacts[19].getBonus();
    sailing.maxChests = Math.min(
        Math.round(
            5 + chestPurchases +
            Math.min(4, artifactBoost) +
            (taskboard.merits.find(merit => merit.descLine1.includes("Loot Pile Capacity"))?.getBonus() ?? 0) +
            (achievements[287].completed ? 1 : 0) +
            (achievements[290].completed ? 1 : 0)
        )
        , 30);

    // Speed base math
    const purrmepPlayer = divinity.gods[6].linkedPlayers.at(0); // purrmep is limited to only 1 player linked.
    const cardBonus = cards.filter(card => card.data.effect.includes("Sailing Speed (Passive)")).reduce((sum, card) => sum += card.getBonus(), 0);
    const divinityMinorBonus = purrmepPlayer ? divinity.gods[6].getMinorLinkBonus(purrmepPlayer) : 0;
    const stampBonus = stamps.flatMap(tab => tab).reduce((sum, stamp) => sum += stamp.data.effect == "SailSpd" ? stamp.getBonus() : 0, 0);
    const mealBonus = cooking.getMealBonusForKey("Sailing");
    const skillMasteryBonus = skillMastery.getSkillBonus(SkillsIndex.Sailing, 1);
    const worshipBonus = worship.totalizer.getBonus(TotalizerBonus.BoatSpeed);
    const starsignBonus = starSigns.unlockedStarSigns.find(sign => sign.name == "C. Shanti Minor")?.getBonus("Sailing SPD") ?? 0;
    const firstMath = (1 + (divinityMinorBonus + cardBonus + alchemy.getBubbleBonusForKey("Y1")) / 125) * (1 + divinity.gods[4].getBlessingBonus() / 100);
    const speedBaseMath = firstMath * (1 + divinity.gods[6].getBlessingBonus() / 100)
        * (1 + (divinity.gods[9].getBlessingBonus() + (sailing.artifacts[10] as SlabInfluencedArtifact).getBonus() + stampBonus + statues[0].statues[24].getBonus() + mealBonus + alchemy.getVialBonusForKey("SailSpd") + skillMasteryBonus + worshipBonus + starsignBonus) / 125);
    const speedBaseMathWithSilkrode = firstMath * (1 + divinity.gods[6].getBlessingBonus() / 100)
        * (1 + (divinity.gods[9].getBlessingBonus() + (sailing.artifacts[10] as SlabInfluencedArtifact).getBonus() + stampBonus + statues[0].statues[24].getBonus() + mealBonus + alchemy.getVialBonusForKey("SailSpd") + skillMasteryBonus + worshipBonus + (starsignBonus * 2)) / 125);
    const speedBaseMathWithoutStarSign = firstMath * (1 + divinity.gods[6].getBlessingBonus() / 100)
    * (1 + (divinity.gods[9].getBlessingBonus() + (sailing.artifacts[10] as SlabInfluencedArtifact).getBonus() + stampBonus + statues[0].statues[24].getBonus() + mealBonus + alchemy.getVialBonusForKey("SailSpd") + skillMasteryBonus + worshipBonus + 0) / 125);

    //Unending Loot Search
    const highestLevelUnendingSearch = players.slice().sort((player1, player2) => player1.getTalentBonus(325) > player2.getTalentBonus(325) ? -1 : 1)[0];

    // Update boat impacts
    sailing.boats.forEach(boat => {
        boat.genieLampBonus = sailing.artifacts[5].getBonus()
        boat.sigilBonus = sigils.sigils[21].getBonus();
        boat.speedBaseMath = speedBaseMath;
        boat.speedBaseMathWithoutStarSign = speedBaseMathWithoutStarSign;
        boat.speedBaseMathWithSilkrode = speedBaseMathWithSilkrode;
        boat.unendingSearchBonus = highestLevelUnendingSearch.getTalentBonus(325);
    });

    // Nice info to have for the UI
    sailing.starSignUnlocked = starSigns.isStarSignUnlocked("C. Shanti Minor");
    sailing.starSignInfinity = (starSigns.infinityStarSigns.find(sign => sign.name == "C. Shanti Minor") != undefined);

    // Update available artifacts from Emporium Upgrades
    const lastIsland = sailing.islands.find(island => island.index == 14);
    if (lastIsland && sneaking.jadeUpgrades.find(upgrade => upgrade.data.name == "Brighter Lighthouse Bulb")?.purchased && lastIsland.artifacts.length == 1) {
        lastIsland.artifacts= sailing.artifacts.slice(29, 29 + 4);
    }

    return sailing;
}

export const updateMinTravelTime = (data: Map<string, any>) => {
    const sailing = data.get("sailing") as Sailing;
    const family = data.get("family") as Family;

    // Minimum travel time
    const siegeBonus = family.classBonus.get(ClassIndex.Siege_Breaker)?.getBonus() ?? 0;
    sailing.boats.forEach(boat => {
        boat.minTravelTime = 120 / (1 + ((siegeBonus + sailing.shinyMinSpeedBonus) / 100));
    });

    return sailing;
}
