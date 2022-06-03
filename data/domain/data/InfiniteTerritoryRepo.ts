import { InfiniteTerritoryModel } from '../model/infiniteTerritoryModel';
import { TerritoryEnemyModel } from '../model/territoryEnemyModel';

export class InfiniteTerritoryBase { constructor(public index: number, public data: InfiniteTerritoryModel) { } }



export const initInfiniteTerritoryRepo = () => {
    return [    
        new InfiniteTerritoryBase(0, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "shovelR", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "shovelR", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "shovelR", "health": 125, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(1, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "mushG", "health": 500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "beanG", "health": 10, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": 25, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(2, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "carrotO", "health": 700, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "snakeG", "health": 10, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "frogBIG", "health": 25, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(3, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "goblinG", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(4, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "acorn", "health": 900, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "frogD", "health": 210, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(5, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "frogBIG", "health": 2500, "colour": 70, "size": 200},
                    <TerritoryEnemyModel>{"id": "frogBIG", "health": 10, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(6, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "ratB", "health": 1500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "ratB", "health": 1500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "ratB", "health": 1500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(7, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "poopSmall", "health": 2000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "poopSmall", "health": 2000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "poopSmall", "health": 2000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "poopSmall", "health": 2000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(8, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "mushG", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "mushR", "health": 100, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "mushW", "health": 25, "colour": 0, "size": 400},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(9, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "ghost", "health": 900, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "ghost", "health": 210, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "ghost", "health": 25, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "moonman", "health": 1000, "colour": 0, "size": 400},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(10, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "jarSand", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(11, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "mimicA", "health": 500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "mimicA", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "jarSand", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(12, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "jarSand", "health": 700, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(13, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "jarSand", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "mimicA", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(14, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "crabcake", "health": 900, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "sandcastle", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "ghost", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "ghost", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(15, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "coconut", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "crabcake", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "coconut", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(16, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "sandcastle", "health": 500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "pincermin", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(17, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "pincermin", "health": 7000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(18, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "potato", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "potato", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "steak", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(19, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "babaHour", "health": 900, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "potato", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "moonman", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "snailZ", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Crystal1", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(20, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "moonman", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "steak", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "steak", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "sandcastle", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(21, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "sandgiant", "health": 500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(22, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "rocky", "health": 700, "colour": 100, "size": 300},
                    <TerritoryEnemyModel>{"id": "snailZ", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(23, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "snailZ", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "cactus", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "rocky", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "rocky", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "cactus", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(24, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "babaMummy", "health": 900, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(25, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "snailZ", "health": 50, "colour": 150, "size": 300},
                    <TerritoryEnemyModel>{"id": "rocky", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(26, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "sheep", "health": 500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(27, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "flake", "health": 7000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "sheep", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(28, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "stache", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "bloque", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(29, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "flake", "health": 900, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "mamoth", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "stache", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(30, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "bloque", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "sheep", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "flake", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "flake", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(31, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "bloque", "health": 500, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "stache", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(32, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "stache", "health": 700, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "bloque", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(33, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "mamoth", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "mamoth", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(34, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "snowball", "health": 900, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "penguin", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "snowball", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "glass", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(35, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "mamoth", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "penguin", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "mamoth", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(36, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "glass", "health": 500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "snowball", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(37, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "penguin", "health": 7000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "glass", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(38, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "snowball", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(39, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "thermostat", "health": 900, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "penguin", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "penguin", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "thermostat", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "thermostat", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(40, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "snakeB", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(41, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "speaker", "health": 500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(42, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "eye", "health": 700, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "speaker", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(43, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "eye", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "slimeR", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "eye", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "slimeR", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "slimeR", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(44, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "ram", "health": 900, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "ram", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "speaker", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(45, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "sheep", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "sheep", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "glass", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(46, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "skele2", "health": 500, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "speaker", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "skele2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(47, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "skele", "health": 7000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "glass", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "eye", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "thermostat", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(48, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "skele2", "health": 800, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "bloque", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "skele", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "skele2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new InfiniteTerritoryBase(49, <InfiniteTerritoryModel>{
                "enemies": [
                    <TerritoryEnemyModel>{"id": "Crystal2", "health": 900, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Crystal2", "health": -1, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Crystal2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "ram", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "ram", "health": -1, "colour": -1, "size": -1}
                ]
            })    
]
}
