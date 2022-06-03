import { DungEnemyModel } from '../model/dungEnemyModel';

export class DungEnemyBase { constructor(public id: string, public data: DungEnemyModel) { } }



export const initDungEnemyRepo = () => {
    return [    
        new DungEnemyBase("rockG", <DungEnemyModel>{
                "intName": "rockG",
                "health": 20,
                "damage": 0,
                "credit1DR": 0.01,
                "credit2DR": 0.001,
                "cardVal": -1,
                "coins": 3,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            }),
        new DungEnemyBase("frogG", <DungEnemyModel>{
                "intName": "frogG",
                "health": 6,
                "damage": 0,
                "credit1DR": 0.01,
                "credit2DR": 0.0015,
                "cardVal": -1,
                "coins": 3,
                "itemDropChance": 0.1,
                "cardDropChance": 0.007
            }),
        new DungEnemyBase("frogP", <DungEnemyModel>{
                "intName": "frogP",
                "health": 15,
                "damage": 1,
                "credit1DR": 0.012,
                "credit2DR": 0.0014,
                "cardVal": 0,
                "coins": 5,
                "itemDropChance": 0.1,
                "cardDropChance": 0.004
            }),
        new DungEnemyBase("frogNest", <DungEnemyModel>{
                "intName": "frogNest",
                "health": 25,
                "damage": 0,
                "credit1DR": 0.01,
                "credit2DR": 0.002,
                "cardVal": -1,
                "coins": 6,
                "itemDropChance": 0.1,
                "cardDropChance": 0.003
            }),
        new DungEnemyBase("frogBIG", <DungEnemyModel>{
                "intName": "frogBIG",
                "health": 55,
                "damage": 1,
                "credit1DR": 0.013,
                "credit2DR": 0.003,
                "cardVal": -1,
                "coins": 8,
                "itemDropChance": 0.1,
                "cardDropChance": 0.0025
            }),
        new DungEnemyBase("frogD", <DungEnemyModel>{
                "intName": "frogD",
                "health": 125,
                "damage": 2,
                "credit1DR": 0.014,
                "credit2DR": 0.004,
                "cardVal": 1,
                "coins": 15,
                "itemDropChance": 0.1,
                "cardDropChance": 0.0025
            }),
        new DungEnemyBase("frogY", <DungEnemyModel>{
                "intName": "frogY",
                "health": 400,
                "damage": 3,
                "credit1DR": 0.017,
                "credit2DR": 0.006,
                "cardVal": 2,
                "coins": 25,
                "itemDropChance": 0.1,
                "cardDropChance": 0.0025
            }),
        new DungEnemyBase("frogR", <DungEnemyModel>{
                "intName": "frogR",
                "health": 1300,
                "damage": 5,
                "credit1DR": 0.02,
                "credit2DR": 0.012,
                "cardVal": 14,
                "coins": 40,
                "itemDropChance": 0.1,
                "cardDropChance": 0.0025
            }),
        new DungEnemyBase("frogW", <DungEnemyModel>{
                "intName": "frogW",
                "health": 4500,
                "damage": 10,
                "credit1DR": 0.03,
                "credit2DR": 0.02,
                "cardVal": 15,
                "coins": 75,
                "itemDropChance": 0.1,
                "cardDropChance": 0.0025
            }),
        new DungEnemyBase("frogGG", <DungEnemyModel>{
                "intName": "frogGG",
                "health": 20000,
                "damage": 20,
                "credit1DR": 0.06,
                "credit2DR": 0.025,
                "cardVal": 22,
                "coins": 600,
                "itemDropChance": 0.2,
                "cardDropChance": 0.004
            }),
        new DungEnemyBase("frogGR", <DungEnemyModel>{
                "intName": "frogGR",
                "health": 700,
                "damage": 3,
                "credit1DR": 0.8,
                "credit2DR": 0.5,
                "cardVal": 3,
                "coins": 100,
                "itemDropChance": 0.1,
                "cardDropChance": 0.04
            }),
        new DungEnemyBase("JungleTree", <DungEnemyModel>{
                "intName": "JungleTree",
                "health": 10,
                "damage": 0,
                "credit1DR": 0.01,
                "credit2DR": 0.001,
                "cardVal": -1,
                "coins": 3,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            }),
        new DungEnemyBase("Pet2", <DungEnemyModel>{
                "intName": "Pet2",
                "health": 9,
                "damage": 0,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 1,
                "itemDropChance": 0,
                "cardDropChance": 0
            }),
        new DungEnemyBase("Pet5", <DungEnemyModel>{
                "intName": "Pet5",
                "health": 2,
                "damage": 0,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 1,
                "itemDropChance": 0,
                "cardDropChance": 0
            }),
        new DungEnemyBase("pghost", <DungEnemyModel>{
                "intName": "pghost",
                "health": 18,
                "damage": 0,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 1,
                "itemDropChance": 0,
                "cardDropChance": 0
            }),
        new DungEnemyBase("rockS", <DungEnemyModel>{
                "intName": "rockS",
                "health": 100,
                "damage": 2,
                "credit1DR": 0.1,
                "credit2DR": 0.02,
                "cardVal": -1,
                "coins": 10,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("jarSand", <DungEnemyModel>{
                "intName": "jarSand",
                "health": 12,
                "damage": 1,
                "credit1DR": 0.011,
                "credit2DR": 0.0015,
                "cardVal": -1,
                "coins": 4,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("target", <DungEnemyModel>{
                "intName": "target",
                "health": 15,
                "damage": 0,
                "credit1DR": 0.012,
                "credit2DR": 0.0017,
                "cardVal": 6,
                "coins": 5,
                "itemDropChance": 0.1,
                "cardDropChance": 0.005
            }),
        new DungEnemyBase("mimicA", <DungEnemyModel>{
                "intName": "mimicA",
                "health": 25,
                "damage": 1,
                "credit1DR": 0.0125,
                "credit2DR": 0.0017,
                "cardVal": -1,
                "coins": 7,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("shovelR", <DungEnemyModel>{
                "intName": "shovelR",
                "health": 40,
                "damage": 1,
                "credit1DR": 0.013,
                "credit2DR": 0.00175,
                "cardVal": -1,
                "coins": 7,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("rocky", <DungEnemyModel>{
                "intName": "rocky",
                "health": 70,
                "damage": 0,
                "credit1DR": 0.016,
                "credit2DR": 0.0025,
                "cardVal": 7,
                "coins": 12,
                "itemDropChance": 0.1,
                "cardDropChance": 0.008
            }),
        new DungEnemyBase("crabcake", <DungEnemyModel>{
                "intName": "crabcake",
                "health": 60,
                "damage": 1,
                "credit1DR": 0.015,
                "credit2DR": 0.003,
                "cardVal": -1,
                "coins": 10,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("coconut", <DungEnemyModel>{
                "intName": "coconut",
                "health": 105,
                "damage": 2,
                "credit1DR": 0.015,
                "credit2DR": 0.0018,
                "cardVal": -1,
                "coins": 16,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("totem", <DungEnemyModel>{
                "intName": "totem",
                "health": 250,
                "damage": 10,
                "credit1DR": 0.016,
                "credit2DR": 0.002,
                "cardVal": 16,
                "coins": 30,
                "itemDropChance": 0.1,
                "cardDropChance": 0.07
            }),
        new DungEnemyBase("sandcastle", <DungEnemyModel>{
                "intName": "sandcastle",
                "health": 142,
                "damage": 2,
                "credit1DR": 0.017,
                "credit2DR": 0.0023,
                "cardVal": 9,
                "coins": 19,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("steakR", <DungEnemyModel>{
                "intName": "steakR",
                "health": 171,
                "damage": 3,
                "credit1DR": 0.018,
                "credit2DR": 0.0025,
                "cardVal": 9,
                "coins": 19,
                "itemDropChance": 0.1,
                "cardDropChance": 0.0025
            }),
        new DungEnemyBase("steak", <DungEnemyModel>{
                "intName": "steak",
                "health": 225,
                "damage": 3,
                "credit1DR": 0.019,
                "credit2DR": 0.0035,
                "cardVal": -1,
                "coins": 22,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("cactus", <DungEnemyModel>{
                "intName": "cactus",
                "health": 300,
                "damage": 4,
                "credit1DR": 0.022,
                "credit2DR": 0.005,
                "cardVal": 8,
                "coins": 27,
                "itemDropChance": 0.1,
                "cardDropChance": 0.0025
            }),
        new DungEnemyBase("potatoB", <DungEnemyModel>{
                "intName": "potatoB",
                "health": 450,
                "damage": 5,
                "credit1DR": 0.03,
                "credit2DR": 0.006,
                "cardVal": 10,
                "coins": 35,
                "itemDropChance": 0.1,
                "cardDropChance": 0.0025
            }),
        new DungEnemyBase("babaHour", <DungEnemyModel>{
                "intName": "babaHour",
                "health": 1000,
                "damage": 4,
                "credit1DR": 0.2,
                "credit2DR": 0.1,
                "cardVal": -1,
                "coins": 100,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("babaMummy", <DungEnemyModel>{
                "intName": "babaMummy",
                "health": 600,
                "damage": 5,
                "credit1DR": 0.6,
                "credit2DR": 0.3,
                "cardVal": -1,
                "coins": 80,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("snakeZ", <DungEnemyModel>{
                "intName": "snakeZ",
                "health": 1750,
                "damage": 5,
                "credit1DR": 0.8,
                "credit2DR": 0.6,
                "cardVal": 11,
                "coins": 150,
                "itemDropChance": 0.1,
                "cardDropChance": 0.02
            }),
        new DungEnemyBase("PalmTree", <DungEnemyModel>{
                "intName": "PalmTree",
                "health": 10,
                "damage": 0,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("Copper", <DungEnemyModel>{
                "intName": "Copper",
                "health": 10,
                "damage": 3,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("FishSmall", <DungEnemyModel>{
                "intName": "FishSmall",
                "health": 10,
                "damage": 0,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("FishMed", <DungEnemyModel>{
                "intName": "FishMed",
                "health": 10,
                "damage": 0,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("Iron", <DungEnemyModel>{
                "intName": "Iron",
                "health": 10,
                "damage": 3,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("Gold", <DungEnemyModel>{
                "intName": "Gold",
                "health": 10,
                "damage": 3,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("Plat", <DungEnemyModel>{
                "intName": "Plat",
                "health": 10,
                "damage": 3,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("Void", <DungEnemyModel>{
                "intName": "Void",
                "health": 10,
                "damage": 3,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0
            }),
        new DungEnemyBase("iceBossZ", <DungEnemyModel>{
                "intName": "iceBossZ",
                "health": 2800,
                "damage": 20,
                "credit1DR": 0.8,
                "credit2DR": 0.6,
                "cardVal": 18,
                "coins": 250,
                "itemDropChance": 0.1,
                "cardDropChance": 0.02
            }),
        new DungEnemyBase("sheep", <DungEnemyModel>{
                "intName": "sheep",
                "health": 10,
                "damage": 0,
                "credit1DR": 0,
                "credit2DR": 0,
                "cardVal": -1,
                "coins": 0,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            }),
        new DungEnemyBase("iceknight", <DungEnemyModel>{
                "intName": "iceknight",
                "health": 100,
                "damage": 100,
                "credit1DR": 0.2,
                "credit2DR": 0.08,
                "cardVal": 17,
                "coins": 65,
                "itemDropChance": 0.1,
                "cardDropChance": 0.017
            }),
        new DungEnemyBase("flake", <DungEnemyModel>{
                "intName": "flake",
                "health": 25,
                "damage": 1,
                "credit1DR": 0.014,
                "credit2DR": 0.002,
                "cardVal": -1,
                "coins": 7,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            }),
        new DungEnemyBase("mamoth", <DungEnemyModel>{
                "intName": "mamoth",
                "health": 60,
                "damage": 1,
                "credit1DR": 0.017,
                "credit2DR": 0.0025,
                "cardVal": -1,
                "coins": 10,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            }),
        new DungEnemyBase("snowball", <DungEnemyModel>{
                "intName": "snowball",
                "health": 125,
                "damage": 2,
                "credit1DR": 0.02,
                "credit2DR": 0.003,
                "cardVal": -1,
                "coins": 18,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            }),
        new DungEnemyBase("thermostat", <DungEnemyModel>{
                "intName": "thermostat",
                "health": 300,
                "damage": 2,
                "credit1DR": 0.023,
                "credit2DR": 0.004,
                "cardVal": -1,
                "coins": 33,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            }),
        new DungEnemyBase("eye", <DungEnemyModel>{
                "intName": "eye",
                "health": 650,
                "damage": 3,
                "credit1DR": 0.026,
                "credit2DR": 0.005,
                "cardVal": -1,
                "coins": 50,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            }),
        new DungEnemyBase("Fillerzz3", <DungEnemyModel>{
                "intName": "Fillerzz3",
                "health": 10,
                "damage": 3,
                "credit1DR": 0.001,
                "credit2DR": 1e-06,
                "cardVal": -1,
                "coins": 3,
                "itemDropChance": 0.1,
                "cardDropChance": 0.01
            })    
]
}
