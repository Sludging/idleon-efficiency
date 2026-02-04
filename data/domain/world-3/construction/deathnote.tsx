import { range } from "../../../utility";
import { Domain, RawData } from "../../base/domain";
import { EnemyInfo } from '../../enemies';
import { ImageData } from '../../imageData';
import { Item } from "../../items";
import { MapInfo } from "../../maps";
import { Rift } from "../../world-4/rift";
import { Sneaking } from "../../world-6/sneaking";
import { initEnemyRepo } from "../../data/EnemyRepo";
import { AFKTypeEnum } from "../../enum/aFKTypeEnum";

export const deathNoteMobOrder = [
    ["mushG", "mushR", "frogG", "beanG", "slimeG", "snakeG", "carrotO", "goblinG", "plank", "frogBIG", "poopSmall", "ratB", "branch", "acorn", "mushW"],
    ["jarSand", "mimicA", "crabcake", "coconut", "sandcastle", "pincermin", "potato", "steak", "moonman", "sandgiant", "snailZ"],
    ["sheep", "flake", "stache", "bloque", "mamoth", "snowball", "penguin", "thermostat", "glass", "snakeB", "speaker", "eye", "ram", "skele2"],
    ["mushP", "w4a2", "w4a3", "demonP", "w4b2", "w4b1", "w4b3", "w4b4", "w4b5", "w4c1", "w4c2", "w4c3", "w4c4"],
    ["w5a1", "w5a2", "w5a3", "w5a4", "w5a5", "w5b1", "w5b2", "w5b3", "w5b4", "w5b5", "w5b6", "w5c1", "w5c2"],
    ["w6a1", "w6a2", "w6a3", "w6a4", "w6a5", "w6b1", "w6b2", "w6b3", "w6b4", "w6c1", "w6c2", "w6d1", "w6d2", "w6d3"],
    ["w7a1", "w7a2", "w7a3", "w7a4", "w7a5", "w7a6", "w7a7", "w7a8", "w7a9", "w7a10", "w7a11", "w7a12"]
];

export const deathNoteMinibossesOrder = "slimeB poopBig babayaga babaHour babaMummy mini3a mini4a mini5a mini6a".split(" ");

export class Deathnote extends Domain {
    mobKillCount: Map<string, number[]> = new Map()
    playerKillsByMap: Map<number, Map<number, number>> = new Map();
    hasRiftBonus: boolean = false;
    hasMinibosses: boolean = false;

    getDeathnoteRank = (killCount: number) => {
        switch (true) {
            case killCount < 25000: return 0;
            case killCount > 25000 && killCount < 100000: return 1;
            case killCount > 100000 && killCount < 250000: return 2;
            case killCount > 250000 && killCount < 500000: return 3;
            case killCount > 500000 && killCount < 1000000: return 4;
            case killCount > 1000000 && killCount < 5000000: return 5;
            case killCount > 5000000 && killCount < 100000000: return 7;
            case killCount > 100000000 && killCount < 1000000000: return 10;
            case killCount > 1000000000: return this.hasRiftBonus ? 20 : 10;
            default: return 0;
        }
    }

    getDeathnoteMinibossRank = (killCount: number) => {
        switch (true) {
            case killCount < 100: return 0;
            case killCount > 100 && killCount < 250: return 1;
            case killCount > 250 && killCount < 1000: return 2;
            case killCount > 1000 && killCount < 5000: return 3;
            case killCount > 5000 && killCount < 25000: return 4;
            case killCount > 25000 && killCount < 100000: return 5;
            case killCount > 100000 && killCount < 1000000: return 7;
            case killCount > 1000000 && killCount < 10000000: return 10;
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
            case 10: return this.hasRiftBonus ? 1000000000 : 0;
            default: return 0;
        }
    }

    getNextMinibossRankReq = (rank: number) => {
        switch (rank) {
            case 0: return 100;
            case 1: return 250;
            case 2: return 1000;
            case 3: return 5000;
            case 4: return 25000;
            case 5: return 100000;
            case 7: return 1000000;
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

    getKillsMap = (): Map<string, Map<string, number>> => {
        const toReturn = new Map<string, Map<string, number>>();
        const monsterInfo = EnemyInfo;

        this.mobKillCount.forEach((killArray, mobName) => {
            const monsterData = monsterInfo.find((monster) => monster.id == mobName);
            const killCount = killArray.reduce((sum, killCount) => sum += Math.round(killCount), 0);
            if (monsterData?.mapData?.world) {
                if (!toReturn.has(monsterData.mapData.world)) {
                    toReturn.set(monsterData.mapData.world, new Map<string, number>());
                }

                toReturn.get(monsterData.mapData.world)?.set(monsterData.details.Name, killCount);
            } else if (monsterData && this.hasMinibosses && deathNoteMinibossesOrder.includes(monsterData?.id ?? "")) {
                // Need the monster to be loaded, the Jade upgrade purchased and the monster to be part of the miniboss list
                // If all that then mean it should be displayed on the Minibosses section
                if (!toReturn.has("Minibosses")) {
                    toReturn.set("Minibosses", new Map<string, number>());
                }

                toReturn.get("Minibosses")?.set(monsterData.details.Name, killCount);
            }
        });

        return toReturn;
    }

    getTotalRank = (): number => {
        const killsMap = this.getKillsMap();
        let totalRank = 0;
        [...killsMap.entries()].forEach(([worldName, deathnoteMobs]) => {
            totalRank += [...deathnoteMobs.values()].reduce((sum, killCount) => sum + (worldName == "Minibosses" ? this.getDeathnoteMinibossRank(killCount) : this.getDeathnoteRank(killCount)), 0);
        });

        return totalRank;
    }

    getRawKeys(): RawData[] {
        return [
            { key: "KLA_", perPlayer: true, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        deathNoteMinibossesOrder.forEach((monster) => {
            this.mobKillCount.set(monster, []);
        })
        deathNoteMobOrder.forEach((world) => {
            world.forEach((monster) => {
                this.mobKillCount.set(monster, []);
            })
        })

        return this;
    }

    parse(data: Map<string, any>): void {
        const deathNote = data.get(this.getDataKey()) as Deathnote;

        // init again to reset the data set;
        // TODO: This is very ugly, need to do better.
        deathNote.init([], 0);

        const enemyRepo = initEnemyRepo();

        const charCount = data.get("charCount") as number;
        const klaData = range(0, charCount).map((_, i) => { return data.get(`KLA_${i}`) }) as number[][][];

        // Get the kill count per map (so we can get values for strange maps that can be chowed/zowed)
        klaData.forEach((playerKillData, pIndex) => {
            deathNote.playerKillsByMap.set(pIndex, new Map());
            playerKillData.forEach((mapInfo, mapIndex) => {
                if (mapIndex < MapInfo.length) {
                    // Rework this whole section to not use MapInfo
                    const mapData = MapInfo[mapIndex];
                    const killCount = mapData.data.portalRequirements[0] - mapInfo[0];
                    const enemy = enemyRepo.find(enemy => enemy.id == mapData.data.enemy);
                    // Seems like you can kill Nothing and undefined enemies.
                    // TODO: Will be easier to do if we based everything the enemyRepo instead of the old data.
                    if (enemy?.data.details.AFKtype != AFKTypeEnum.Fighting) {
                        return;
                    }

                    deathNote.playerKillsByMap.get(pIndex)?.set(mapIndex, killCount);
                }
            });
        })

        // Get the Deathnote kills for each mob in the death note list
        deathNoteMobOrder.forEach((world) => {
            world.forEach((monster) => {
                const mapData = MapInfo.find(map => map.data.enemy == monster);
                if (mapData) {
                    klaData.forEach(playerKillData => {
                        if (mapData.index < playerKillData.length) {
                            const killCount = mapData.data.portalRequirements[0] - playerKillData[mapData.index][0];
                            // Every mob should be there as they're inserted during init
                            deathNote.mobKillCount.get(monster)?.push(killCount);
                        }
                    })
                }
            })
        })
    }
}

export const updateDeathnote = (data: Map<string, any>) => {
    const deathNote = data.get("deathnote") as Deathnote;
    const rift = data.get("rift") as Rift;

    deathNote.hasRiftBonus = rift.bonuses.find(bonus => bonus.name == "Eclipse Skulls")?.active ?? false;
}

export const updateDeathnoteMiniboss = (data: Map<string, any>) => {
    const deathNote = data.get("deathnote") as Deathnote;
    const sneaking = data.get("sneaking") as Sneaking;

    deathNote.hasMinibosses = sneaking.jadeUpgrades.find(upgrade => upgrade.index == 7)?.purchased ?? false;

    if (deathNote.hasMinibosses) {
        sneaking.minibossKills.forEach((killCount, index) => {
            if (index < deathNoteMinibossesOrder.length && deathNote.mobKillCount.has(deathNoteMinibossesOrder[index])) {
                deathNote.mobKillCount.get(deathNoteMinibossesOrder[index])?.push(killCount);
            }
        })
    }
}
