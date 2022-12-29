import { TerritoryEnemyModel } from '../model/territoryEnemyModel';
import { TerritoryFightModel } from '../model/territoryFightModel';

export class TerritoryFightBase { constructor(public index: number, public data: TerritoryFightModel) { } }



export const initTerritoryFightRepo = () => {
    return [    
        new TerritoryFightBase(0, <TerritoryFightModel>{
                "img": "PetFightBG0.png",
                "trekReq": 5,
                "fightPower": 0,
                "enemyAttack": 1,
                "battleName": "The Grass Gang",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "mushG", "health": 10, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "frogG", "health": 30, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "beanG", "health": 50, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(1, <TerritoryFightModel>{
                "img": "5bg.png",
                "trekReq": 20,
                "fightPower": 5,
                "enemyAttack": 3,
                "battleName": "The Carrot Crew",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "carrotO", "health": 20, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "carrotO", "health": 50, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "carrotO", "health": 70, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "carrotO", "health": 150, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(2, <TerritoryFightModel>{
                "img": "10bg.png",
                "trekReq": 100,
                "fightPower": 20,
                "enemyAttack": 12,
                "battleName": "Big Boy Plank and the Gs",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "goblinG", "health": 200, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "goblinG", "health": 200, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "plank", "health": 500, "colour": 0, "size": 400},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(3, <TerritoryFightModel>{
                "img": "4bg.png",
                "trekReq": 250,
                "fightPower": 50,
                "enemyAttack": 20,
                "battleName": "Branchial Heirarchy",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "branch", "health": 100, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "branch", "health": 300, "colour": 348, "size": 200},
                    <TerritoryEnemyModel>{"id": "branch", "health": 600, "colour": 336, "size": 300},
                    <TerritoryEnemyModel>{"id": "branch", "health": 1200, "colour": 324, "size": 400},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(4, <TerritoryFightModel>{
                "img": "1bg.png",
                "trekReq": 1000,
                "fightPower": 100,
                "enemyAttack": 35,
                "battleName": "Dr. Def, phD MD",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "poopBig", "health": 5000, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "poopBig", "health": 10, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(5, <TerritoryFightModel>{
                "img": "9bg.png",
                "trekReq": 2000,
                "fightPower": 250,
                "enemyAttack": 70,
                "battleName": "Confetti Cake Brigade",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "crabcake", "health": 200, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "crabcake", "health": 800, "colour": 70, "size": 300},
                    <TerritoryEnemyModel>{"id": "crabcake", "health": 2000, "colour": 140, "size": 300},
                    <TerritoryEnemyModel>{"id": "crabcake", "health": 3000, "colour": 210, "size": 300},
                    <TerritoryEnemyModel>{"id": "crabcake", "health": 6000, "colour": 280, "size": 300}
                ]
            }),
        new TerritoryFightBase(6, <TerritoryFightModel>{
                "img": "PetFightBG4.png",
                "trekReq": 5000,
                "fightPower": 600,
                "enemyAttack": 150,
                "battleName": "The Giant Grumblo",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "rocky", "health": 40000, "colour": 15, "size": 600},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(7, <TerritoryFightModel>{
                "img": "14bg.png",
                "trekReq": 10000,
                "fightPower": 900,
                "enemyAttack": 300,
                "battleName": "The Beach Boys",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "coconut", "health": 10000, "colour": 200, "size": 200},
                    <TerritoryEnemyModel>{"id": "coconut", "health": 50000, "colour": 300, "size": 300},
                    <TerritoryEnemyModel>{"id": "potato", "health": 10000, "colour": 200, "size": 200},
                    <TerritoryEnemyModel>{"id": "potato", "health": 50000, "colour": 300, "size": 300},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(8, <TerritoryFightModel>{
                "img": "PetFightBG1.png",
                "trekReq": 20000,
                "fightPower": 1250,
                "enemyAttack": 600,
                "battleName": "The Sands of Time",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "babaHour", "health": 140000, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "sandgiant", "health": 10000, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "sandgiant", "health": 10000, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": 0, "size": -1}
                ]
            }),
        new TerritoryFightBase(9, <TerritoryFightModel>{
                "img": "20bg.png",
                "trekReq": 30000,
                "fightPower": 2000,
                "enemyAttack": 1500,
                "battleName": "The Dungeoneering Duo",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "babaMummy", "health": 200000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "snakeZ", "health": 500000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(10, <TerritoryFightModel>{
                "img": "PetFightBG2.png",
                "trekReq": 50000,
                "fightPower": 3000,
                "enemyAttack": 5000,
                "battleName": "The Stray Flock",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "sheep", "health": 200000, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "sheep", "health": 600000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "sheep", "health": 200000, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "sheep", "health": 600000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "sheep", "health": 200000, "colour": 0, "size": 100}
                ]
            }),
        new TerritoryFightBase(11, <TerritoryFightModel>{
                "img": "PetFightBG3.png",
                "trekReq": 100000,
                "fightPower": 4500,
                "enemyAttack": 15000,
                "battleName": "The Permafrost Brothers",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "bloque", "health": 1200000, "colour": 30, "size": 400},
                    <TerritoryEnemyModel>{"id": "snowball", "health": 1200000, "colour": 50, "size": 400},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(12, <TerritoryFightModel>{
                "img": "18bg.png",
                "trekReq": 250000,
                "fightPower": 6500,
                "enemyAttack": 25000,
                "battleName": "The Coolest Beats",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "speaker", "health": 1500000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "speaker", "health": 1500000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "iceknight", "health": 5000000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(13, <TerritoryFightModel>{
                "img": "17bg.png",
                "trekReq": 500000,
                "fightPower": 9000,
                "enemyAttack": 40000,
                "battleName": "The Cursed Shepherd Boy",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "ram", "health": 2000000, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "ram", "health": 5000000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "skele2", "health": 12000000, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "ram", "health": 5000000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "ram", "health": 3000000, "colour": 0, "size": 100}
                ]
            }),
        new TerritoryFightBase(14, <TerritoryFightModel>{
                "img": "PetFightBGz.png",
                "trekReq": 800000,
                "fightPower": 77000,
                "enemyAttack": 1,
                "battleName": "BRuh",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "shovelR", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "shovelR", "health": 50, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "shovelR", "health": 125, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(15, <TerritoryFightModel>{
                "img": "8bg.png",
                "trekReq": 1250000,
                "fightPower": 13250,
                "enemyAttack": 75000,
                "battleName": "The Blue Jeans Group",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "demonP", "health": 5000000, "colour": 330, "size": 200},
                    <TerritoryEnemyModel>{"id": "demonP", "health": 10000000, "colour": 300, "size": 200},
                    <TerritoryEnemyModel>{"id": "demonP", "health": 15000000, "colour": 270, "size": 200},
                    <TerritoryEnemyModel>{"id": "demonP", "health": 20000000, "colour": 250, "size": 200},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(16, <TerritoryFightModel>{
                "img": "21bg.png",
                "trekReq": 1500000,
                "fightPower": 17000,
                "enemyAttack": 110000,
                "battleName": "The Big Fissure Wurm",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "w4b5", "health": 100000000, "colour": 0, "size": 500},
                    <TerritoryEnemyModel>{"id": "Mob2", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(17, <TerritoryFightModel>{
                "img": "22bg.png",
                "trekReq": 3000000,
                "fightPower": 25000,
                "enemyAttack": 150000,
                "battleName": "Calamity Clammies",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "w4c1", "health": 250000000, "colour": 120, "size": 400},
                    <TerritoryEnemyModel>{"id": "w4c1", "health": 250000000, "colour": 240, "size": 500},
                    <TerritoryEnemyModel>{"id": "Mob3", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob4", "health": -1, "colour": -1, "size": -1},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(18, <TerritoryFightModel>{
                "img": "24bg.png",
                "trekReq": 5000000,
                "fightPower": 45000,
                "enemyAttack": 200000,
                "battleName": "The Suggma Ballers",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "w5a1", "health": 400000000, "colour": 0, "size": 400},
                    <TerritoryEnemyModel>{"id": "w5a1", "health": 400000000, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "w5a1", "health": 400000000, "colour": 0, "size": 200},
                    <TerritoryEnemyModel>{"id": "w5a1", "health": 400000000, "colour": 0, "size": 300},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(19, <TerritoryFightModel>{
                "img": "25bg.png",
                "trekReq": 10000000,
                "fightPower": 75000,
                "enemyAttack": 300000,
                "battleName": "The Juicer Gang",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "w5b3", "health": 5e+09, "colour": 80, "size": 200},
                    <TerritoryEnemyModel>{"id": "w5b3", "health": 4.8e+09, "colour": 160, "size": 200},
                    <TerritoryEnemyModel>{"id": "w5b3", "health": 100000000, "colour": 220, "size": 100},
                    <TerritoryEnemyModel>{"id": "w5b3", "health": 50000000, "colour": 300, "size": 100},
                    <TerritoryEnemyModel>{"id": "Mob5", "health": -1, "colour": -1, "size": -1}
                ]
            }),
        new TerritoryFightBase(20, <TerritoryFightModel>{
                "img": "3bg.png",
                "trekReq": 15000000,
                "fightPower": 110000,
                "enemyAttack": 450000,
                "battleName": "The Ultrawurm et All",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "w5c2", "health": 5e+10, "colour": 180, "size": 400},
                    <TerritoryEnemyModel>{"id": "w5c1", "health": 1e+09, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "w5c1", "health": 2.5e+09, "colour": 330, "size": 200},
                    <TerritoryEnemyModel>{"id": "w5c1", "health": 4e+09, "colour": 30, "size": 200},
                    <TerritoryEnemyModel>{"id": "w5c1", "health": 6e+09, "colour": 300, "size": 300}
                ]
            }),
        new TerritoryFightBase(21, <TerritoryFightModel>{
                "img": "3bg.png",
                "trekReq": 300000000,
                "fightPower": 2500000,
                "enemyAttack": 450000,
                "battleName": "Filler Filler",
                "filler1": "Filler",
                "filler2": "Filler",
                "filler3": "Filler",
                "enemies": [
                    <TerritoryEnemyModel>{"id": "w5c1", "health": 1e+09, "colour": 0, "size": 100},
                    <TerritoryEnemyModel>{"id": "w5c1", "health": 2.5e+09, "colour": 330, "size": 200},
                    <TerritoryEnemyModel>{"id": "w5c1", "health": 4e+09, "colour": 30, "size": 200},
                    <TerritoryEnemyModel>{"id": "w5c1", "health": 6e+09, "colour": 300, "size": 300},
                    <TerritoryEnemyModel>{"id": "w5c2", "health": 5e+10, "colour": 180, "size": 400}
                ]
            })    
]
}
