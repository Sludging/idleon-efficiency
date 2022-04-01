import { MapInfo } from "./maps";
import { Player } from "./player";

const deathNoteMobOrder = [
    "mushG mushR frogG beanG slimeG snakeG carrotO goblinG plank frogBIG poopSmall ratB branch acorn mushW".split(" "),
    "jarSand mimicA crabcake coconut sandcastle pincermin potato steak moonman sandgiant snailZ".split(" "),
    "sheep flake stache bloque mamoth snowball penguin thermostat glass snakeB speaker eye ram skele2".split(" "),
    "mushP w4a2 w4a3 demonP w4b2 w4b1 w4b3 w4b4 w4b5 w4c1 w4c2 w4c3 w4c4".split(" "),
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

    getRankClass = (rank: number) => {
        if (rank == 0) { 
            return '';
        }
        const iconNumber = rank - 1 - Math.floor(rank / 7) - 2 * Math.floor(rank / 10);
        return `icons-2025 icons-StatusSkull${iconNumber}`;
    }
}

export default function updateDeathnote(accountData: Map<string, any>) {
    const deathNote = new Deathnote();
    const doc = new Map<string, any>(Object.entries(accountData.get("rawData")));
    const playerData = accountData.get("players") as Player[];
    const charCount = playerData.length;

    const rawData = [...Array(charCount)].map((_, i) => { return doc.get(`KLA_${i}`) })
    rawData.forEach((playerKillData, index) => {
        const jsonData = JSON.parse(playerKillData) as number[][];
        jsonData.forEach((mapInfo, mapIndex) => {
            const mapData = MapInfo.find(map => map.id == mapIndex);
            if (mapData && mapData.enemy && deathNote.mobKillCount.has(mapData.enemy)) {
                const killCount = mapData.portalRequirements[0] - mapInfo[0];
                deathNote.mobKillCount.get(mapData.enemy)?.push(killCount); //do we really only care about 0?
            }
            if (mapData && mapData.enemy) {
                const killCount = mapData.portalRequirements[0] - mapInfo[0];
                playerData[index].killInfo.set(mapData.id, killCount);
            }
        });
    })           
    return deathNote;
}