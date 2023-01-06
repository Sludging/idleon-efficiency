import { initArtifactRepo } from "./data/ArtifactRepo";
import { initIslandInfoRepo, IslandInfoBase } from "./data/IslandInfoRepo";
import { CaptainBonusBase, initCaptainBonusRepo } from './data/CaptainBonusRepo';
import { CaptainBonusModel } from './model/captainBonusModel';
import { GemStore } from "./gemPurchases";
import { ImageData } from "./imageData";
import { IslandInfoModel } from "./model/islandInfoModel";
import { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";
import { LootyInfo } from "./lootyTracker";
import { Artifact, AshenUrnArtifact, FauxoryTuskArtifact, GenieLampArtifact, ManekiKatArtifact, SlabInfluencedArtifact, TriagulonArtifact, WeatherbookArtifact } from "./sailing/artifacts";
import { Cooking } from "./cooking";

// "Captains": [
//     [0,0,-1,3,6.75,2,0],
//     [0,1,-1,4,259.25,6,0],

// [3] == level
// [0] == Trait1?
// [1] == Trait2?
// [5] == Base of trait 1
// [6] == Base of trait 2

const captainBonuses = initCaptainBonusRepo();

export class CaptainTrait {
    bonus: CaptainBonusModel;
    traitIndex: number;
    constructor(bonus: CaptainBonusBase, public baseValue: number, public currentBonus: number) {
        this.bonus = bonus.data;
        this.traitIndex = bonus.index;
    }

    getBonusText = () => {
        return `+${this.currentBonus}% (${this.baseValue})`;
        //return this.bonus.bonus.replace("{", this.currentBonus.toString());   
    }

    getImageData = () => {
        return {
            location: `SailTra${this.traitIndex}`,
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

    constructor(public index: number, public assignIsland: number, public lootUpgrades: number, public speedUpgrades: number, public captain: Captain | undefined) { }

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

    getUpgradeCost = (type: BoatUpgradeType) => {
        const lootType = type == BoatUpgradeType.Loot ? this.getLootUpgradeType() : this.getSpeedUpgradeType();
        const currentUpgradeLevel = type == BoatUpgradeType.Loot ? this.lootUpgrades : this.speedUpgrades;

        if (lootType == 0) {
            return Math.round((5 + 4 * currentUpgradeLevel) * Math.pow(1.17 - .12 * currentUpgradeLevel / (currentUpgradeLevel + 200), currentUpgradeLevel));
        }

        if (lootType % 2 == 1) {
            return Math.round((5 + 2 * currentUpgradeLevel) * Math.pow(1.15 - .1 * currentUpgradeLevel / (currentUpgradeLevel + 200), currentUpgradeLevel))
        }

        return Math.round((2 + currentUpgradeLevel) * Math.pow(1.12 - .07 * currentUpgradeLevel / (currentUpgradeLevel + 200), currentUpgradeLevel));
    }

    getLootValue = (something: number = 4) => {
        // Check if captain is boosting the value.
        const captainBonus = this.captain?.traits.filter(trait => trait.bonus.bonus.includes("Loot Value")).reduce((sum, trait) => sum += trait.currentBonus, 0) ?? 0;

        if (something == 6) {
            const firstMath = 2 + Math.pow(Math.floor((this.lootUpgrades + 1) / 8), 2);
            return (5 + firstMath * (this.lootUpgrades + 1)) * (1 + (this.sigilBonus + captainBonus + this.genieLampBonus) / 100);
        }

        const firstMath = 2 + Math.pow(Math.floor(this.lootUpgrades / 8), 2);
        return (5 + firstMath * this.lootUpgrades) * (1 + (this.sigilBonus + (captainBonus + this.genieLampBonus)) / 100);
    }
}

export class Island {
    artifacts: Artifact[] = [];

    constructor(public index: number, public data: IslandInfoModel) { }

    static fromBase = (data: IslandInfoBase[]): Island[] => {
        return data.map(island => new Island(island.index, island.data));
    }
}

export class Ship {
    lootLevel: number = 0;
    speedLevel: number = 0;

}

// "Sailing": [
//     [
//         -1,
//         -1,
//         -1,
//         1000,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         87.48177916406271,
//         96.88550000000004,
//         12.99,
//         286.22762500000056,
//         28.99,
//         199.94,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01,
//         -0.01
//     ],
//     [
//         2,
//         3
//     ],
//     [
//         1,
//         1,
//         1,
//         1,
//         1,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0,
//         0
//     ]
// ]


// "Boats": [
//     [
//         1,
//         1,
//         0,
//         8,
//         29.187414635975678,
//         9
//     ],
//     [
//         2,
//         3,
//         1,
//         8,
//         586.5551424352022,
//         12
//     ],
//     [
//         0,
//         2,
//         0,
//         7,
//         184.21441201857112,
//         10
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         1,
//         0,
//         15
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0
//     ]
// ]


// "Captains": [
//     [
//         0,
//         1,
//         -1,
//         3,
//         6.75,
//         7,
//         0
//     ],
//     [
//         0,
//         1,
//         -1,
//         4,
//         13.25,
//         6,
//         0
//     ],
//     [
//         0,
//         1,
//         -1,
//         3,
//         24.75,
//         6,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         0,
//         1,
//         -1,
//         1,
//         0,
//         5,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ],
//     [
//         -1,
//         -1,
//         -1,
//         0,
//         0,
//         0,
//         0
//     ]
// ]

export class Sailing {
    artifacts: Artifact[] = Artifact.fromBase(initArtifactRepo());
    islands: Island[] = Island.fromBase(initIslandInfoRepo());
    boats: Boat[] = [];
    captains: Captain[] = [];

    maxChests: number = 5;
    captainsUnlocked = 1;
    boatsUnlocked = 1;

    constructor() {
        // Map artifacts to islands to make display easier.
        let artifactIndex = 0;
        this.islands.forEach(island => {
            island.artifacts = this.artifacts.slice(artifactIndex, artifactIndex + island.data.artifactsPerIsland);
            artifactIndex += island.data.artifactsPerIsland;
        })
    }
    // if ("NewCaptBoatSlot" == e) return 0 == s ? (60 * r + 15 * Math.pow(r, 2)) * Math.pow(1.43, r) * .6 : (60 * r + 15 * Math.pow(r, 2)) * Math.pow(1.43, r);
    static getLootImageData = (lootIndex: number): ImageData => {
        return {
            location: `SailT${lootIndex}`,
            height: 22,
            width: 22
        };
    }
}

export default function parseSailing(sailingData: number[][], boatData: number[][], captainData: number[][]) {
    const sailing = new Sailing();

    if (sailingData.length == 0) {
        return sailing;
    }

    // Sailing index 3 = array of artifacts found or not.
    sailingData[3].forEach((artifact, index) => {
        sailing.artifacts[index].updateStatus(artifact);
    })

    sailing.captainsUnlocked = Math.round(sailingData[2][0] + 1);
    sailing.boatsUnlocked = Math.round(sailingData[2][1] + 1);

    captainData.forEach((captain, cIndex) => {
        if (cIndex < sailing.captainsUnlocked && captain[0] != -1) {
            sailing.captains.push(new Captain(cIndex, captain[3], captain[4], [[captain[1], captain[5]], [captain[2], captain[6]]]));
        }
    })

    boatData.forEach((boat, bIndex) => {
        if (bIndex < sailing.boatsUnlocked && (boat[3] + boat[5]) != 0) {
            const boatCaptain = boat[0] < sailing.captains.length ? sailing.captains[boat[0]] : undefined;
            sailing.boats.push(new Boat(bIndex, boat[1], boat[3], boat[5], boatCaptain));
        }
    })

    return sailing;
}

export const updateSailing = (data: Map<string, any>) => {
    const sailing = data.get("sailing") as Sailing;
    const gemStore = data.get("gems") as GemStore;
    const players = data.get("players") as Player[];
    const looty = data.get("lootyData") as LootyInfo;
    const cooking = data.get("cooking") as Cooking;

    // Max chests
    const chestPurchases = gemStore.purchases.find(upgrade => upgrade.index == 130)?.pucrhased ?? 0;
    sailing.maxChests += Math.min(Math.round(5 + chestPurchases), 19);

    // Sailing Related
    // TODO: Add handling for 27 once I know the number of gold owned.

    // Skills related.
    (sailing.artifacts[5] as GenieLampArtifact).sailingLevel = players[0].skills.get(SkillsIndex.Sailing)?.level ?? 0;
    (sailing.artifacts[3] as FauxoryTuskArtifact).sailingLevel = players[0].skills.get(SkillsIndex.Sailing)?.level ?? 0;
    (sailing.artifacts[23] as WeatherbookArtifact).gamingLevel = players[0].skills.get(SkillsIndex.Gaming)?.level ?? 0;
    
    // Slab related.
    (sailing.artifacts[2] as SlabInfluencedArtifact).lootyCount = looty.rawData.length;
    (sailing.artifacts[10] as SlabInfluencedArtifact).lootyCount = looty.rawData.length;
    (sailing.artifacts[18] as SlabInfluencedArtifact).lootyCount = looty.rawData.length;
    (sailing.artifacts[20] as SlabInfluencedArtifact).lootyCount = looty.rawData.length;
    
    // Highest level
    const highestLevelPlayer = players.sort((playera, playerb) => playera.level > playerb.level ? -1 : 1)[0];
    (sailing.artifacts[1] as ManekiKatArtifact).highestLevel = highestLevelPlayer.level;
    (sailing.artifacts[11] as AshenUrnArtifact).highestLevel = highestLevelPlayer.level;

    // Cooking related.
    (sailing.artifacts[13] as TriagulonArtifact).turkeyOwned = cooking.meals[0].count;

    // Update artifact impacts
    sailing.boats.forEach(boat => boat.genieLampBonus = sailing.artifacts[5].getBonus());

    return sailing;
}
