import { ImageData } from "./imageData";
import { MapInfo } from "./maps";
import { Player } from "./player";

const deathNoteMobOrder = [
    "mushG mushR frogG beanG slimeG snakeG carrotO goblinG plank frogBIG poopSmall ratB branch acorn mushW".split(" "),
    "jarSand mimicA crabcake coconut sandcastle pincermin potato steak moonman sandgiant snailZ".split(" "),
    "sheep flake stache bloque mamoth snowball penguin thermostat glass snakeB speaker eye ram skele2".split(" "),
    "mushP w4a2 w4a3 demonP w4b2 w4b1 w4b3 w4b4 w4b5 w4c1 w4c2 w4c3 w4c4".split(" "),
    "w5a1 w5a2 w5a3 w5a4 w5a5 w5b1 w5b2 w5b3 w5b4 w5b5 w5b6 w5c1 w5c2".split(" "),
];

export class Deathnote {
    mobKillCount: Map<string, number[]> = new Map()
    playerKillsByMap: Map<number, Map<number, number>> = new Map();

    constructor() {
        deathNoteMobOrder.forEach((world) => {
            world.forEach((monster) => {
                this.mobKillCount.set(monster, []);
            })
        })
    }

    getDeathnoteRank = (killCount: number) => {
        switch (true) {
            case killCount < 25000: return 0;
            case killCount > 25000 && killCount < 100000: return 1;
            case killCount > 100000 && killCount < 250000: return 2;
            case killCount > 250000 && killCount < 500000: return 3;
            case killCount > 500000 && killCount < 1000000: return 4;
            case killCount > 1000000 && killCount < 5000000: return 5;
            case killCount > 5000000 && killCount < 100000000: return 7;
            case killCount > 100000000: return 10;
            default: return 0;
        }
    }

    getNextRankReq = (rank: number) => {
        switch (rank) {
            case 0: return 25000;
            case 1: return 100000;
            case 2: return 250000;
            case 3: return 500000;
            case 4: return 1000000;
            case 5: return 5000000;
            case 7: return 100000000;
            default: return 0;
        }
    }

    getRankImageData = (rank: number): ImageData => {
        if (rank == 0) { 
            return {
                location: 'Blank',
                height: 25,
                width: 20
            };
        }
        const iconNumber = rank - 1 - Math.floor(rank / 7) - 2 * Math.floor(rank / 10);
        return {
            location: `StatusSkull${iconNumber}`,
            height: 25,
            width: 20
        };
    }
}

export default function parseDeathnote(klaData: string[]) {
    const deathNote = new Deathnote();
    // const doc = new Map<string, any>(Object.entries(accountData.get("rawData")));
    // const playerData = accountData.get("players") as Player[];
    // const charCount = playerData.length;

    klaData.forEach((playerKillData, pIndex) => {
        deathNote.playerKillsByMap.set(pIndex, new Map());
        const jsonData = JSON.parse(playerKillData) as number[][]
        jsonData.forEach((mapInfo, mapIndex) => {
            if (mapIndex < MapInfo.length) {
                const mapData = MapInfo[mapIndex];
                const killCount = mapData.data.portalRequirements[0] - mapInfo[0];
                if (deathNote.mobKillCount.has(mapData.data.enemy)) {
                    deathNote.mobKillCount.get(mapData.data.enemy)?.push(killCount); //do we really only care about 0?
                }

                deathNote.playerKillsByMap.get(pIndex)?.set(mapIndex, killCount);
            }
        });
    })           
    return deathNote;
}