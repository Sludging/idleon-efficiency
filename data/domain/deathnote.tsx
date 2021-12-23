import { MapInfo } from "./maps";

const deathNoteMobOrder = [
    "mushG mushR frogG beanG slimeG snakeG carrotO goblinG plank frogBIG poopSmall ratB branch acorn mushW".split(" "),
    "jarSand mimicA crabcake coconut sandcastle pincermin potato steak moonman sandgiant snailZ".split(" "),
    "sheep flake stache bloque mamoth snowball penguin thermostat glass snakeB speaker eye ram skele2".split(" "),
];

export class Deathnote {
    mobKillCount: Map<string, number[]> = new Map()

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

    getRankClass = (rank: number) => {
        if (rank == 0) { 
            return '';
        }
        const iconNumber = rank - 1 - Math.floor(rank / 7) - 2 * Math.floor(rank / 10);
        return `icons-2025 icons-StatusSkull${iconNumber}`;
    }
}

export default function parseDeathnote(rawData: string[]) {
    const deathNote = new Deathnote();

    rawData.forEach((playerData) => {
        const jsonData = JSON.parse(playerData) as number[][];
        jsonData.forEach((mapInfo, mapIndex) => {
            const mapData = MapInfo.find(map => map.id == mapIndex);
            if (mapData && mapData.enemy && deathNote.mobKillCount.has(mapData.enemy)) {
                deathNote.mobKillCount.get(mapData.enemy)?.push(mapData.portalRequirements[0] - mapInfo[0]); //do we really only care about 0?
            }
        });
    })           
    return deathNote;
}