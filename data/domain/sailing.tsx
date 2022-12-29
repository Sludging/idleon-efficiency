import { ArtifactBase, initArtifactRepo } from "./data/ArtifactRepo";
import { initIslandInfoRepo, IslandInfoBase } from "./data/IslandInfoRepo";
import { GemStore } from "./gemPurchases";
import { ImageData } from "./imageData";
import { ArtifactModel } from "./model/artifactModel";
import { IslandInfoModel } from "./model/islandInfoModel";

export enum ArtifactStatus {
    Unobtained,
    Obtained,
    Ancient
}

export class Artifact {
    status: ArtifactStatus = ArtifactStatus.Unobtained;

    constructor(public index: number, public data: ArtifactModel) {}

    static fromBase = (data: ArtifactBase[]): Artifact[] => {
        return data.map(artifact => new Artifact(artifact.index, artifact.data));
    }

    updateStatus = (artifactStatus: number) => {
        switch(artifactStatus) {
            case 1:
                this.status = ArtifactStatus.Obtained;
                break;
            case 2: 
                this.status = ArtifactStatus.Ancient;
                break;
        }
    }

    getImageData = (): ImageData => {
        return {
            location: `Arti${this.index}`,
            width: 22,
            height: 20,
        }
    }
}

export class Island {
    artifacts: Artifact[] = [];

    constructor(public index: number, public data: IslandInfoModel) {}

    static fromBase = (data: IslandInfoBase[]): Island[] => {
        return data.map(island => new Island(island.index, island.data));
    }
}

export class Ship {

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
    ships: Ship[] = [];

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

}

export default function parseSailing(sailingData: number[][]) {
    const sailing = new Sailing();

    // Sailing index 3 = array of artifacts found or not.
    sailingData[3].forEach((artifact, index) => {
        sailing.artifacts[index].updateStatus(artifact);
    })

    sailing.captainsUnlocked = Math.round(sailingData[2][0] + 1);
    sailing.boatsUnlocked = Math.round(sailingData[2][1] + 1);

    return sailing;
}

export const updateSailing = (data: Map<string, any>) => {
    const sailing = data.get("sailing") as Sailing;
    const gemStore = data.get("gems") as GemStore;

    // Max chests
    const chestPurchases = gemStore.purchases.find(upgrade => upgrade.index == 130)?.pucrhased ?? 0;
    sailing.maxChests += Math.min(Math.round(5 + chestPurchases), 19);

    return sailing;
}
