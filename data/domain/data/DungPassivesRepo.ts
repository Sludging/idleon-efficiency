import { DungPassiveModel } from '../model/dungPassiveModel';
import { DungPassivesModel } from '../model/dungPassivesModel';

export class DungPassivesBase { constructor(public id: string, public data: DungPassivesModel) { } }



export const initDungPassivesRepo = () => {
    return [    
        new DungPassivesBase("Dungeon", <DungPassivesModel>{
                "passives": [
                    <DungPassiveModel>{
                        "effect": "Max HP",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "type": "",
                        "lvlUpText": "maxHp"
                    },
                    <DungPassiveModel>{
                        "effect": "Max MP",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "type": "",
                        "lvlUpText": "maxMp"
                    },
                    <DungPassiveModel>{
                        "effect": "Base Damage",
                        "x1": 100,
                        "x2": 100,
                        "func": "decay",
                        "type": "",
                        "lvlUpText": "baseDmg"
                    },
                    <DungPassiveModel>{
                        "effect": "Total Dmg",
                        "x1": 250,
                        "x2": 100,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "pctDmg"
                    },
                    <DungPassiveModel>{
                        "effect": "Crit Chance",
                        "x1": 50,
                        "x2": 100,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "critChance"
                    },
                    <DungPassiveModel>{
                        "effect": "Move Speed",
                        "x1": 70,
                        "x2": 100,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "MoveSpeed"
                    },
                    <DungPassiveModel>{
                        "effect": "Block Chance",
                        "x1": 50,
                        "x2": 100,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "BlockChance"
                    },
                    <DungPassiveModel>{
                        "effect": "Drop Rarity",
                        "x1": 150,
                        "x2": 100,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "DropRarity"
                    }
                ]
            }),
        new DungPassivesBase("Flurbo", <DungPassivesModel>{
                "passives": [
                    <DungPassiveModel>{
                        "effect": "Weapon Power",
                        "x1": 50,
                        "x2": 80,
                        "func": "decay",
                        "type": "",
                        "lvlUpText": "WepPow"
                    },
                    <DungPassiveModel>{
                        "effect": "Talent Pts",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "type": "",
                        "lvlUpText": "TalPtAll"
                    },
                    <DungPassiveModel>{
                        "effect": "Class Exp",
                        "x1": 45,
                        "x2": 100,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "EXP"
                    },
                    <DungPassiveModel>{
                        "effect": "Skilling Exp",
                        "x1": 90,
                        "x2": 100,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "skillEXP"
                    },
                    <DungPassiveModel>{
                        "effect": "Monster Cash",
                        "x1": 75,
                        "x2": 100,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "MonsterCash"
                    },
                    <DungPassiveModel>{
                        "effect": "Accuracy",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "type": "%",
                        "lvlUpText": "Acc"
                    },
                    <DungPassiveModel>{
                        "effect": "Defence",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "type": "%",
                        "lvlUpText": "Def"
                    },
                    <DungPassiveModel>{
                        "effect": "AFK Gains",
                        "x1": 10,
                        "x2": 50,
                        "func": "decay",
                        "type": "%",
                        "lvlUpText": "AFKgains"
                    }
                ]
            })    
]
}
