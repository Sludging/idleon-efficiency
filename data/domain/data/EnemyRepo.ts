import { AFKTypeEnum } from '../enum/aFKTypeEnum';
import { BossAttackModel } from '../model/bossAttackModel';
import { BossDetailsModel } from '../model/bossDetailsModel';
import { CardDropModel } from '../model/cardDropModel';
import { CoinDropModel } from '../model/coinDropModel';
import { EnemyDetailsModel } from '../model/enemyDetailsModel';
import { EnemyModel } from '../model/enemyModel';
import { EnemyNavModel } from '../model/enemyNavModel';
import { EnemyTableModel } from '../model/enemyTableModel';
import { EnemyTypeEnum } from '../enum/enemyTypeEnum';
import { ItemDropModel } from '../model/itemDropModel';
import { MapDataModel } from '../model/mapDataModel';
import { MapNameModel } from '../model/mapNameModel';
import { RecipeDropModel } from '../model/recipeDropModel';
import { SubTableDropModel } from '../model/subTableDropModel';
import { TalentDropModel } from '../model/talentDropModel';

export class EnemyBase { constructor(public id: string, public data: EnemyModel) { } }



export const initEnemyRepo = () => {
    return [    
        new EnemyBase("ForgeA", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Fire Forge",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "CopperBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "IronBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GoldBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ForgeB", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Cinder Forge",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PlatBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DementiaBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "VoidBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bandit_Bob", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bandit Bob",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.01, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.07, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Crystal1",
                    "next": "Blank",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("SoulCard1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Forest Soul",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC11", "quantity": 1, "chance": 0.00022, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul1", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("SoulCard2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dune Soul",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC12", "quantity": 1, "chance": 0.00018, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul2", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("SoulCard3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Rooted Soul",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD10", "quantity": 1, "chance": 0.00016, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul3", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul3", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul3", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul3", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("SoulCard4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Frigid Soul",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul4", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul4", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul4", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul4", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("SoulCard5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Squishy Soul",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul5", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul5", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul5", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul5", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("SoulCard6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Oozie Soul",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul6", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul6", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul6", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul6", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Froge",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC11", "quantity": 1, "chance": 0.00022, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter1", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crabbo",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC12", "quantity": 1, "chance": 0.00018, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter2", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Scorpie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD10", "quantity": 1, "chance": 0.00016, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter3", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mousey",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter4", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Owlio",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter5", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Pingy",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter6", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bunny",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter7", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dung Beat",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter8", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard9", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Honker",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter9", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("CritterCard10", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Blobfish",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 420,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD10", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter10", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Cooking", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Cooking",
                    "AFKtype": AFKTypeEnum.Cooking,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 25,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 180,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 100,
                    "ExpType": 10,
                    "Defence": 100,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Laboratory", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Laboratory",
                    "AFKtype": AFKTypeEnum.Laboratory,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 25,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 180,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 25,
                    "ExpType": 12,
                    "Defence": 100,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Divinity", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Divinity",
                    "AFKtype": AFKTypeEnum.Divinity,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 25,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 180,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 25,
                    "ExpType": 12,
                    "Defence": 100,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("riftAll", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "The Rift",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 75,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 9,
                    "RespawnTime": 40,
                    "DeathFrame": 23,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 100,
                    "ExpType": 0,
                    "Defence": 2,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "riftAll",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceRift", "name": "The Rift", "id": 166},
                    "portalRequirements": [100]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("rift1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Rift Spooker",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 14,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 71,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 19,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 100,
                    "ExpType": 0,
                    "Defence": 2,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("rift2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Rift Slug",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 14,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 74,
                    "MonsterMoving": 1,
                    "MovingFrame": 9,
                    "RespawnTime": 40,
                    "DeathFrame": 23,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 100,
                    "ExpType": 0,
                    "Defence": 2,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("rift3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Rift Jocund",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 14,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 65,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 40,
                    "DeathFrame": 19,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 100,
                    "ExpType": 0,
                    "Defence": 2,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("rift4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Rift Hivemind",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 14,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 68,
                    "MonsterMoving": 1,
                    "MovingFrame": 14,
                    "RespawnTime": 40,
                    "DeathFrame": 28,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 100,
                    "ExpType": 0,
                    "Defence": 2,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("rift5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Rift Stalker",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 14,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 76,
                    "MonsterMoving": 1,
                    "MovingFrame": 10,
                    "RespawnTime": 40,
                    "DeathFrame": 27,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 100,
                    "ExpType": 0,
                    "Defence": 2,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogP", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Poisonic Frog",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 14,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 32,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 40,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 50,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 7,
                    "ExpType": 0,
                    "Defence": 2,
                    "MoveSPEED": 4,
                    "Damages": [5, 1],
                    "DefFor0": 2
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.012, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.0014, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogNest", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Frog Nest",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 13,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 38,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 55,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 3000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 150,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [50, 1],
                    "DefFor0": 40.66
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogD", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Globohopper",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 75,
                    "HeightOfMonster": 67,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 10000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.004, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogY", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "King Frog",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 13,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 72,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 55,
                    "DeathFrame": 14,
                    "MonsterHPTotal": 2500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 95,
                    "ExpType": 0,
                    "Defence": 110,
                    "MoveSPEED": 3,
                    "Damages": [45, 1],
                    "DefFor0": 35.69
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.017, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogR", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Lava Slimer",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 13,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 55,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 2500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 95,
                    "ExpType": 0,
                    "Defence": 110,
                    "MoveSPEED": 3,
                    "Damages": [45, 1],
                    "DefFor0": 35.69
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogW", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chromatium Frog",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 75,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 10000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 0,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.02, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogGG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Eldritch Croaker",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 75,
                    "HeightOfMonster": 82,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 45,
                    "DeathFrame": 19,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 6,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.025, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogGR", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Grandfrogger",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 112,
                    "HeightOfMonster": 107,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 700,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogGR2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Rotting Grandfrogger",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 112,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 17500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogGR3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Forlorn Grandfrogger",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 112,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 350000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("frogGR4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Vengeful Grandfrogger",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 112,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 1400000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Meteor", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Fallen Meteor",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 68,
                    "HeightOfMonster": 43,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 0,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("rocky", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Grumblo",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 46,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 10000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 0,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.016, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("cactus", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Cactopunk",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 75,
                    "HeightOfMonster": 61,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 10000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.022, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("totem", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Lazlo",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 75,
                    "HeightOfMonster": 75,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 10000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.016, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.002, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("target", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Target",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 21,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 34,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 40,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 18500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 310,
                    "ExpType": 0,
                    "Defence": 260,
                    "MoveSPEED": 2,
                    "Damages": [125, 1],
                    "DefFor0": 123.37
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.012, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.0017, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("steakR", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Beefie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 31,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 72,
                    "HeightOfMonster": 64,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 14,
                    "MonsterHPTotal": 23000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 350,
                    "ExpType": 0,
                    "Defence": 300,
                    "MoveSPEED": 5,
                    "Damages": [150, 1],
                    "DefFor0": 152.99
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.018, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("potatoB", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crescent Spud",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 21,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 34,
                    "HeightOfMonster": 89,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 18500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 310,
                    "ExpType": 0,
                    "Defence": 260,
                    "MoveSPEED": 4,
                    "Damages": [125, 1],
                    "DefFor0": 123.37
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("snakeZ", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Snakenhotep",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 90,
                    "HeightOfMonster": 148,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 9,
                    "MonsterHPTotal": 1750,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("snakeZ2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Enraged Snakenhotep",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 12250,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("snakeZ3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Inevitable Snakenhotep",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 1750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("iceknight", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Ice Guard",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 90,
                    "HeightOfMonster": 76,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 10000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [50, 1],
                    "DefFor0": 40.66
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.08, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("iceBossZ", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Glaciaxus",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 90,
                    "HeightOfMonster": 141,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 6,
                    "MonsterHPTotal": 2800,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("iceBossZ2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Golden Glaciaxus",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 90,
                    "HeightOfMonster": 141,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 6,
                    "MonsterHPTotal": 66000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("iceBossZ3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Caustic Glaciaxus",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 90,
                    "HeightOfMonster": 141,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 6,
                    "MonsterHPTotal": 4480000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 3400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Crystal0", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crystal Carrot",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 1,
                    "MonsterOffsetX": 23,
                    "MonsterOffsetY": 23,
                    "HeightOfMonster": 68,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 35,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 1,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 0,
                    "Defence": 150,
                    "MoveSPEED": 4,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA14", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                        <TalentDropModel>{"item": "TalentBook1", "quantity": 3618100, "chance": 0.005, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5b", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "acorn",
                    "next": "mushW",
                    "hasCrystal": false,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("Crystal1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crystal Crabal",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 11,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 64,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 7500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 210,
                    "ExpType": 0,
                    "Defence": 180,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB13", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                        <TalentDropModel>{"item": "TalentBook1", "quantity": 3618100, "chance": 0.005, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable11", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5b", "quantity": 3, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "shovelR",
                    "next": "Bandit_Bob",
                    "hasCrystal": false,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("Crystal2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crystal Cattle",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 47,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 47,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 252000,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 1000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 210,
                    "ExpType": 0,
                    "Defence": 180,
                    "MoveSPEED": 5,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE15", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                        <TalentDropModel>{"item": "TalentBook1", "quantity": 3618100, "chance": 0.005, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable17", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable18", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5b", "quantity": 3, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "skele2",
                    "next": undefined,
                    "hasCrystal": false,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("Crystal3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crystal Custard",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 47,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 252000,
                    "DeathFrame": 14,
                    "MonsterHPTotal": 1000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 210,
                    "ExpType": 0,
                    "Defence": 180,
                    "MoveSPEED": 5,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG14", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                        <TalentDropModel>{"item": "TalentBook1", "quantity": 3618100, "chance": 0.005, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable22", "quantity": 1, "chance": 0.4, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "w4c4",
                    "next": "Blank",
                    "hasCrystal": false,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("Crystal4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crystal Capybara",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 47,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 252000,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 1000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 210,
                    "ExpType": 0,
                    "Defence": 180,
                    "MoveSPEED": 5,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH14", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable27", "quantity": 1, "chance": 0.17, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable28", "quantity": 1, "chance": 0.17, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "w5c2",
                    "next": "Blank",
                    "hasCrystal": false,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("mushG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Green Mushroom",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 1,
                    "MonsterOffsetX": 23,
                    "MonsterOffsetY": 23,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 35,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands1", "quantity": 1, "chance": 0.22, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA0", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodHealth1", "quantity": 3, "chance": 0.005, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentShirts16", "quantity": 1, "chance": 0.00035, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW2", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Cutter", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.003, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "mushG",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "GrasslandsA", "name": "Spore Meadows", "id": 1},
                    "portalRequirements": [11]
                },
                "navigation": <EnemyNavModel>{
                    "prev": undefined,
                    "next": "mushR",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("frogG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Frog",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 14,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 40,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 25,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 10,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [3, 1],
                    "DefFor0": 1
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 3, "chance": 0.48, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 1, "chance": 0.21, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA2", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest3", "quantity": 1, "chance": 0.5, "questLink": "Picnic_Stowaway2"},
                        <ItemDropModel>{"item": "Quest4", "quantity": 1, "chance": 0.3, "questLink": "Picnic_Stowaway2"},
                        <ItemDropModel>{"item": "FoodPotMana1", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "InvStorageF", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats6", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.0038, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "frogG",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "GrasslandsB", "name": "Froggy Fields", "id": 2},
                    "portalRequirements": [15]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "mushR",
                    "next": "beanG",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("beanG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bored Bean",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 7,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 50,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 80,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 18,
                    "ExpType": 0,
                    "Defence": 2,
                    "MoveSPEED": 4,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 5, "chance": 0.46, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands3", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA3", "quantity": 1, "chance": 9.7e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA2", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats25", "quantity": 1, "chance": 3.5e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.0045, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "beanG",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "GrasslandsC", "name": "Valley Of The Beans", "id": 14},
                    "portalRequirements": [40, 1500]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "frogG",
                    "next": "slimeG",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("slimeG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Slime",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 24,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 25,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 42,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 175,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 26,
                    "ExpType": 0,
                    "Defence": 4,
                    "MoveSPEED": 4,
                    "Damages": [10, 1],
                    "DefFor0": 5.27
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 8, "chance": 0.44, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Jungle1", "quantity": 1, "chance": 0.19, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA4", "quantity": 1, "chance": 9.5e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 43, "chance": 3e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "OilBarrel2", "quantity": 10, "chance": 0.0003, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 47, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 0.004, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "slimeG",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "JungleA", "name": "Jungle Perimeter", "id": 16},
                    "portalRequirements": [60, 3000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "beanG",
                    "next": "snakeG",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("snakeG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Baby Boa",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 25,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 36,
                    "HeightOfMonster": 32,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 45,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 325,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 36,
                    "ExpType": 0,
                    "Defence": 8,
                    "MoveSPEED": 8,
                    "Damages": [13, 1],
                    "DefFor0": 7.4
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 11, "chance": 0.43, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Jungle2", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA5", "quantity": 1, "chance": 9.4e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodHealth2", "quantity": 3, "chance": 0.005, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest7", "quantity": 1, "chance": 0.2, "questLink": "Stiltzcho2"},
                        <ItemDropModel>{"item": "StampA7", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "InvBag100", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "snakeG",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "JungleB", "name": "Winding Willows", "id": 19},
                    "portalRequirements": [100]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "slimeG",
                    "next": "carrotO",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("carrotO", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Carrotman",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 9,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 45,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 50,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 600,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 46,
                    "ExpType": 0,
                    "Defence": 10,
                    "MoveSPEED": 6,
                    "Damages": [16, 1],
                    "DefFor0": 9.66
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 15, "chance": 0.41, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Jungle3", "quantity": 1, "chance": 0.17, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA6", "quantity": 1, "chance": 9e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodHealth2", "quantity": 4, "chance": 0.006, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentBows4", "quantity": 1, "chance": 4e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "carrotO",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "JungleC", "name": "Vegetable Patch", "id": 24},
                    "portalRequirements": [125, 2000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "snakeG",
                    "next": "goblinG",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("goblinG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Glublin",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 15,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 52,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 1100,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 60,
                    "ExpType": 0,
                    "Defence": 15,
                    "MoveSPEED": 4,
                    "Damages": [20, 1],
                    "DefFor0": 12.82
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 19, "chance": 0.39, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Forest1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA7", "quantity": 1, "chance": 8.6e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneHelm1", "quantity": 1, "chance": 0.00015, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 44, "chance": 3e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 0.004, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "goblinG",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "ForestA", "name": "Forest Outskirts", "id": 26},
                    "portalRequirements": [150]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "carrotO",
                    "next": "plank",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("plank", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Wode Board",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 3,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 58,
                    "HeightOfMonster": 46,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 45,
                    "DeathFrame": 19,
                    "MonsterHPTotal": 1800,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 75,
                    "ExpType": 0,
                    "Defence": 25,
                    "MoveSPEED": 3,
                    "Damages": [35, 1],
                    "DefFor0": 26.12
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 23, "chance": 0.37, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Forest2", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA8", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 48, "chance": 3e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest12", "quantity": 1, "chance": 0.1, "questLink": "Dog_Bone1"},
                        <ItemDropModel>{"item": "EquipmentShirts19", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 0.0045, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "plank",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "ForestB", "name": "Encroaching Forest Villas", "id": 27},
                    "portalRequirements": [30, 4200]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "goblinG",
                    "next": "frogBIG",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("frogBIG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Gigafrog",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 13,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 26,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 55,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 2500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 95,
                    "ExpType": 0,
                    "Defence": 60,
                    "MoveSPEED": 3,
                    "Damages": [45, 1],
                    "DefFor0": 35.69
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 28, "chance": 0.35, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Forest3", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA9", "quantity": 1, "chance": 7e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampA10", "quantity": 1, "chance": 3e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodPotRe2", "quantity": 5, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampA8", "quantity": 1, "chance": 0.0003, "questLink": "Papua_Piggea1"},
                        <ItemDropModel>{"item": "ObolBronzePop", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "frogBIG",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "ForestC", "name": "Tucked Away", "id": 28},
                    "portalRequirements": [0]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "plank",
                    "next": "poopSmall",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("branch", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Walking Stick",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 8,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 20,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 60,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 1500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 120,
                    "ExpType": 0,
                    "Defence": 150,
                    "MoveSPEED": 4,
                    "Damages": [20, 1],
                    "DefFor0": 12.82
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 90, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "TreeInterior1", "quantity": 1, "chance": 0.21, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA12", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "TreeInterior1b", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 68, "chance": 0.0002, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3c", "quantity": 1, "chance": 0.0057, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "branch",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "TreeInteriorA", "name": "The Base Of The Bark", "id": 13},
                    "portalRequirements": [2500, 50000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "ratB",
                    "next": "acorn",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("acorn", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Nutto",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 5,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 42,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 60,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 4000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 190,
                    "ExpType": 0,
                    "Defence": 200,
                    "MoveSPEED": 5,
                    "Damages": [40, 1],
                    "DefFor0": 30.84
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 110, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "TreeInterior2", "quantity": 1, "chance": 0.23, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA13", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3c", "quantity": 1, "chance": 0.0065, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "acorn",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "TreeInteriorB", "name": "Hollowed Trunk", "id": 18},
                    "portalRequirements": [5000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "branch",
                    "next": "Crystal0",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("mushW", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Wood Mushroom",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 34,
                    "MonsterOffsetX": 23,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 50,
                    "DeathFrame": 14,
                    "MonsterHPTotal": 10000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 300,
                    "ExpType": 0,
                    "Defence": 500,
                    "MoveSPEED": 4,
                    "Damages": [75, 1],
                    "DefFor0": 66.8
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 40, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest15", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "TreeInterior1b", "quantity": 1, "chance": 7.5e-05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA16", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3c", "quantity": 1, "chance": 0.007, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5b", "quantity": 1, "chance": 0.002, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "mushW",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "TreeInteriorC", "name": "Where the Branches End", "id": 31},
                    "portalRequirements": [0]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "Crystal0",
                    "next": undefined,
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("poopSmall", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Poop",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 20,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 32,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 60,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 9000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 220,
                    "ExpType": 0,
                    "Defence": 100,
                    "MoveSPEED": 4,
                    "Damages": [150, 1],
                    "DefFor0": 152.99
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 80, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Sewers1", "quantity": 1, "chance": 0.24, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA10", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Sewers1b", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 69, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest22", "quantity": 1, "chance": 0.23, "questLink": "Mutton2"},
                        <ItemDropModel>{"item": "Quest22", "quantity": 1, "chance": 0.23, "questLink": "Mutton3"},
                        <ItemDropModel>{"item": "Quest22", "quantity": 1, "chance": 0.23, "questLink": "Mutton4"},
                        <SubTableDropModel>{"item": "DropTable3b", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "poopSmall",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "SewerA", "name": "Poopy Sewers", "id": 8},
                    "portalRequirements": [20000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "frogBIG",
                    "next": "ratB",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("ratB", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Rat",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 22,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 32,
                    "MonsterMoving": 1,
                    "MovingFrame": 9,
                    "RespawnTime": 60,
                    "DeathFrame": 18,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 330,
                    "ExpType": 0,
                    "Defence": 180,
                    "MoveSPEED": 8,
                    "Damages": [220, 1],
                    "DefFor0": 238.55
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 105, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Sewers2", "quantity": 1, "chance": 0.19, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA11", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest14", "quantity": 1, "chance": 0.1, "questLink": "TP_Pete2"},
                        <ItemDropModel>{"item": "Quest23", "quantity": 1, "chance": 0.16, "questLink": "Mutton3"},
                        <ItemDropModel>{"item": "Quest23", "quantity": 1, "chance": 0.16, "questLink": "Mutton4"},
                        <SubTableDropModel>{"item": "DropTable3b", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "ratB",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "SewerB", "name": "Rats Nest", "id": 15},
                    "portalRequirements": [35000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "poopSmall",
                    "next": "branch",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("poopD", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Boop",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 33,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 34,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 745000,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 200000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1000,
                    "ExpType": 0,
                    "Defence": 120,
                    "MoveSPEED": 3,
                    "Damages": [250, 1],
                    "DefFor0": 275.97
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.99, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Sewers3", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA15", "quantity": 1, "chance": 0.0015, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "poopD",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "SewerD", "name": "Meel's Crypt", "id": 38},
                    "portalRequirements": [0]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "poopBig",
                    "next": "wolfA",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("rockG", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Healing Rune",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 13,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 42,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 55,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 3000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 150,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [50, 1],
                    "DefFor0": 40.66
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("rockB", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Shielding Rune",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 13,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 42,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 55,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 3000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 150,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [50, 1],
                    "DefFor0": 40.66
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("rockS", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Skeleton Rune",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 13,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 42,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 6000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 10,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [50, 1],
                    "DefFor0": 40.66
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("jarSand", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sandy Pot",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 16,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 32,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 50,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 2000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 150,
                    "ExpType": 0,
                    "Defence": 60,
                    "MoveSPEED": 5,
                    "Damages": [30, 1],
                    "DefFor0": 21.54
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 40, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertA1", "quantity": 1, "chance": 0.22, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB1", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats9", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertA1b", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.003, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "jarSand",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertCalmA", "name": "Jar Bridge", "id": 51},
                    "portalRequirements": [250]
                },
                "navigation": <EnemyNavModel>{
                    "prev": undefined,
                    "next": "mimicA",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("mimicA", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mimic",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 17,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 9,
                    "RespawnTime": 50,
                    "DeathFrame": 19,
                    "MonsterHPTotal": 4000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 180,
                    "ExpType": 0,
                    "Defence": 80,
                    "MoveSPEED": 4,
                    "Damages": [45, 1],
                    "DefFor0": 35.69
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 47, "chance": 0.47, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertA2", "quantity": 1, "chance": 0.212, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GoldricP1", "quantity": 1, "chance": 0.1, "questLink": "Goldric3"},
                        <CardDropModel>{"item": "CardsB2", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "InvBag101", "quantity": 1, "chance": 2.5e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 16, "chance": 5e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "mimicA",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertCalmB", "name": "The Mimic Hole", "id": 52},
                    "portalRequirements": [600, 1000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "jarSand",
                    "next": "crabcake",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("crabcake", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crabcake",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 11,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 64,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 6500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 210,
                    "ExpType": 0,
                    "Defence": 120,
                    "MoveSPEED": 4,
                    "Damages": [60, 1],
                    "DefFor0": 50.87
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 55, "chance": 0.45, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertA3", "quantity": 1, "chance": 0.205, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB3", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertA3b", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 41, "chance": 2.5e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.0036, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "crabcake",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertCalmC", "name": "Dessert Dunes", "id": 53},
                    "portalRequirements": [1000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "mimicA",
                    "next": "coconut",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("coconut", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mafioso",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 10,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 55,
                    "HeightOfMonster": 44,
                    "MonsterMoving": 1,
                    "MovingFrame": 15,
                    "RespawnTime": 40,
                    "DeathFrame": 26,
                    "MonsterHPTotal": 10000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 240,
                    "ExpType": 0,
                    "Defence": 145,
                    "MoveSPEED": 4,
                    "Damages": [80, 1],
                    "DefFor0": 72.24
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 67, "chance": 0.43, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertB1", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GoldricP2", "quantity": 1, "chance": 0.075, "questLink": "Goldric3"},
                        <CardDropModel>{"item": "CardsB4", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 17, "chance": 2e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "coconut",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertMildA", "name": "The Grandioso Canyon", "id": 57},
                    "portalRequirements": [1200]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "crabcake",
                    "next": "sandcastle",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("sandcastle", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sand Castle",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 28,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 59,
                    "HeightOfMonster": 34,
                    "MonsterMoving": 1,
                    "MovingFrame": 9,
                    "RespawnTime": 40,
                    "DeathFrame": 19,
                    "MonsterHPTotal": 12500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 265,
                    "ExpType": 0,
                    "Defence": 170,
                    "MoveSPEED": 3,
                    "Damages": [95, 1],
                    "DefFor0": 88.89
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 80, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertB2", "quantity": 1, "chance": 0.19, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GoldricP3", "quantity": 1, "chance": 0.05, "questLink": "Goldric3"},
                        <CardDropModel>{"item": "CardsB5", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "sandcastle",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertMildB", "name": "Shifty Sandbox", "id": 58},
                    "portalRequirements": [1600]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "coconut",
                    "next": "pincermin",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("pincermin", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Pincermin",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 2,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 42,
                    "HeightOfMonster": 82,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 50,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 15500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 290,
                    "ExpType": 0,
                    "Defence": 225,
                    "MoveSPEED": 5,
                    "Damages": [112, 1],
                    "DefFor0": 108.27
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 90, "chance": 0.38, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertB3", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB6", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <RecipeDropModel>{
                            "item": "SmithingRecipes4",
                            "quantity": 53,
                            "chance": 3e-06,
                            "questLink": "(Enter World 4)"
                        },
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0037, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "pincermin",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertMildC", "name": "Pincer Plateau", "id": 59},
                    "portalRequirements": [2000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "sandcastle",
                    "next": "potato",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("potato", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mashed Potato",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 21,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 34,
                    "HeightOfMonster": 89,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 18500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 310,
                    "ExpType": 0,
                    "Defence": 260,
                    "MoveSPEED": 6,
                    "Damages": [125, 1],
                    "DefFor0": 123.37
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 100, "chance": 0.37, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertB4", "quantity": 1, "chance": 0.17, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB7", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0039, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "potato",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertMildD", "name": "Slamabam Straightaway", "id": 60},
                    "portalRequirements": [2500, 0]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "pincermin",
                    "next": "steak",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("steak", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Tyson",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 31,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 72,
                    "HeightOfMonster": 62,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 14,
                    "MonsterHPTotal": 23000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 350,
                    "ExpType": 0,
                    "Defence": 300,
                    "MoveSPEED": 5,
                    "Damages": [150, 1],
                    "DefFor0": 152.99
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 112, "chance": 0.36, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertC1", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB8", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "steak",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertNightA", "name": "The Ring", "id": 62},
                    "portalRequirements": [3000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "potato",
                    "next": "moonman",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("moonman", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Moonmoon",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 30,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 66,
                    "HeightOfMonster": 54,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 26500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 380,
                    "ExpType": 0,
                    "Defence": 330,
                    "MoveSPEED": 4,
                    "Damages": [170, 1],
                    "DefFor0": 177.1
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 125, "chance": 0.35, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertC2", "quantity": 1, "chance": 0.165, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertC2b", "quantity": 1, "chance": 0.0005, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB9", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest18", "quantity": 1, "chance": 0.0001, "questLink": "Loominadi1"},
                        <ItemDropModel>{"item": "EquipmentHats14", "quantity": 1, "chance": 1.5e-07, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "moonman",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertNightB", "name": "Up Up Down Down", "id": 63},
                    "portalRequirements": [4000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "steak",
                    "next": "sandgiant",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("sandgiant", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sand Giant",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 29,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 72,
                    "HeightOfMonster": 44,
                    "MonsterMoving": 1,
                    "MovingFrame": 9,
                    "RespawnTime": 40,
                    "DeathFrame": 20,
                    "MonsterHPTotal": 30000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 410,
                    "ExpType": 0,
                    "Defence": 365,
                    "MoveSPEED": 3,
                    "Damages": [195, 1],
                    "DefFor0": 207.65
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 140, "chance": 0.34, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertC3", "quantity": 1, "chance": 0.152, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB10", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 58, "chance": 1.7e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.0037, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "sandgiant",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertNightC", "name": "Sands of Time", "id": 64},
                    "portalRequirements": [5000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "moonman",
                    "next": "snailZ",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("snailZ", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Snelbie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 27,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 72,
                    "HeightOfMonster": 54,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 40,
                    "DeathFrame": 18,
                    "MonsterHPTotal": 35000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 460,
                    "ExpType": 0,
                    "Defence": 400,
                    "MoveSPEED": 4,
                    "Damages": [225, 1],
                    "DefFor0": 244.76
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 160, "chance": 0.35, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DesertC4", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB11", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPendant14", "quantity": 1, "chance": 2e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.0039, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "snailZ",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertNightD", "name": "Djonnuttown", "id": 65},
                    "portalRequirements": [1]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "sandgiant",
                    "next": "shovelR",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("sheep", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sheepie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 35,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 47,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 55000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 620,
                    "ExpType": 0,
                    "Defence": 550,
                    "MoveSPEED": 4,
                    "Damages": [300, 1],
                    "DefFor0": 338.94
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 180, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowA1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE0", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentStatues16", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampB5", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "sheep",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowA1", "name": "Steep Sheep Ledge", "id": 101},
                    "portalRequirements": [1000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": undefined,
                    "next": "flake",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("flake", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Frost Flake",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 36,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 44,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 40,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 67000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 700,
                    "ExpType": 0,
                    "Defence": 650,
                    "MoveSPEED": 4,
                    "Damages": [360, 1],
                    "DefFor0": 415.1
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 190, "chance": 0.46, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowA2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE1", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampB7", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowA2a", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "flake",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowA2", "name": "Snowfield Outskirts", "id": 103},
                    "portalRequirements": [2000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "sheep",
                    "next": "stache",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("stache", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sir Stache",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 37,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 70,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 40,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 81000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 800,
                    "ExpType": 0,
                    "Defence": 775,
                    "MoveSPEED": 4,
                    "Damages": [420, 1],
                    "DefFor0": 491.48
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 205, "chance": 0.43, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowA3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE2", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodPotGr3", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentStatues17", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "stache",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowA3", "name": "The Stache Split", "id": 104},
                    "portalRequirements": [3000, 100000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "flake",
                    "next": "bloque",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("ram", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dedotated Ram",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 46,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 62,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 35,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 1250000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 3500,
                    "ExpType": 0,
                    "Defence": 1500,
                    "MoveSPEED": 6,
                    "Damages": [3000, 1],
                    "DefFor0": 3563.92
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 520, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowA4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE14", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentRings23", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats11", "quantity": 1, "chance": 1.5e-07, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.0034, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "ram",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowD1", "name": "Wam Wonderland", "id": 116},
                    "portalRequirements": [250000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "eye",
                    "next": "skele",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("bloque", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bloque",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 32,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 42,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 940,
                    "ExpType": 0,
                    "Defence": 900,
                    "MoveSPEED": 4,
                    "Damages": [500, 1],
                    "DefFor0": 593.5
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 240, "chance": 0.41, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowB1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE3", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentStatues19", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodPotMana3", "quantity": 1, "chance": 0.0025, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "bloque",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowB1", "name": "Refrigeration Station", "id": 105},
                    "portalRequirements": [4000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "stache",
                    "next": "mamoth",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("mamoth", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mamooth",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 38,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 115000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1030,
                    "ExpType": 0,
                    "Defence": 1050,
                    "MoveSPEED": 3,
                    "Damages": [580, 1],
                    "DefFor0": 695.37
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 260, "chance": 0.39, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowB2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE4", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowB2a", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "InvBag110", "quantity": 1, "chance": 8e-06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest63", "quantity": 1, "chance": 1, "questLink": "Shuvelle5"},
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0027, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "mamoth",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowB2", "name": "Mamooooth Mountain", "id": 106},
                    "portalRequirements": [6000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "bloque",
                    "next": "snowball",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("snowball", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Snowman",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 39,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 135000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1130,
                    "ExpType": 0,
                    "Defence": 1200,
                    "MoveSPEED": 6,
                    "Damages": [690, 1],
                    "DefFor0": 834.89
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 285, "chance": 0.37, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowB5", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE5", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampB10", "quantity": 1, "chance": 2.5e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodHealth10", "quantity": 1, "chance": 0.009, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest63", "quantity": 1, "chance": 1, "questLink": "Shuvelle6"},
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0029, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "snowball",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowB3", "name": "Rollin' Tundra", "id": 107},
                    "portalRequirements": [8000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "mamoth",
                    "next": "penguin",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("penguin", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Penguin",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 40,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 14,
                    "RespawnTime": 40,
                    "DeathFrame": 25,
                    "MonsterHPTotal": 160000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1250,
                    "ExpType": 0,
                    "Defence": 1350,
                    "MoveSPEED": 4,
                    "Damages": [800, 1],
                    "DefFor0": 973.57
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 310, "chance": 0.36, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowB3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE6", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentStatues16", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "penguin",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowB4", "name": "Signature Slopes", "id": 108},
                    "portalRequirements": [11000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "snowball",
                    "next": "thermostat",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("thermostat", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Thermister",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 41,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 68,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 20,
                    "MonsterHPTotal": 185000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1370,
                    "ExpType": 0,
                    "Defence": 1500,
                    "MoveSPEED": 4,
                    "Damages": [950, 1],
                    "DefFor0": 1161.15
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 340, "chance": 0.35, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowB4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE7", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampB12", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest63", "quantity": 1, "chance": 1, "questLink": "Shuvelle7"},
                        <RecipeDropModel>{
                            "item": "SmithingRecipes4",
                            "quantity": 54,
                            "chance": 8e-07,
                            "questLink": "(Enter World 4)"
                        },
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0033, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "thermostat",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowB5", "name": "Thermonuclear Climb", "id": 109},
                    "portalRequirements": [15000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "penguin",
                    "next": "glass",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("glass", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Quenchie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 42,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 44,
                    "MonsterMoving": 1,
                    "MovingFrame": 10,
                    "RespawnTime": 45,
                    "DeathFrame": 23,
                    "MonsterHPTotal": 225000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1570,
                    "ExpType": 0,
                    "Defence": 1700,
                    "MoveSPEED": 4,
                    "Damages": [1150, 1],
                    "DefFor0": 1408.37
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 370, "chance": 0.34, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowC1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE8", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentStatues17", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "glass",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowC1", "name": "Waterlogged Entrance", "id": 110},
                    "portalRequirements": [18000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "thermostat",
                    "next": "snakeB",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("snakeB", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Cryosnake",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 43,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 36,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 45,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 260000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1690,
                    "ExpType": 0,
                    "Defence": 1900,
                    "MoveSPEED": 6,
                    "Damages": [1425, 1],
                    "DefFor0": 1743.06
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 400, "chance": 0.32, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowC2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE9", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentStatues19", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "snakeB",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowC2", "name": "Cryo Catacombs", "id": 111},
                    "portalRequirements": [22000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "glass",
                    "next": "speaker",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("speaker", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bop Box",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 44,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 12,
                    "RespawnTime": 45,
                    "DeathFrame": 23,
                    "MonsterHPTotal": 310000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1780,
                    "ExpType": 0,
                    "Defence": 2150,
                    "MoveSPEED": 4,
                    "Damages": [1700, 1],
                    "DefFor0": 2072.08
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 440, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowC3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE10", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodHealth9", "quantity": 1, "chance": 0.007, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.003, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "speaker",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowC3", "name": "Overpass of Sound", "id": 112},
                    "portalRequirements": [35000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "snakeB",
                    "next": "eye",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("eye", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Neyeptune",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 63,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 43,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 350000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1900,
                    "ExpType": 0,
                    "Defence": 2400,
                    "MoveSPEED": 4,
                    "Damages": [2000, 1],
                    "DefFor0": 2424.95
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 490, "chance": 0.28, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowC4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE11", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowC4a", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "eye",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowC4", "name": "Crystal Basecamp", "id": 113},
                    "portalRequirements": [120000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "speaker",
                    "next": "ram",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("Iceball", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Ice Ball",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 45,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 70,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 45,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 200000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1500,
                    "ExpType": 0,
                    "Defence": 100,
                    "MoveSPEED": 0,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("mushP", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Purp Mushroom",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 49,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 38,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 500000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2350,
                    "ExpType": 0,
                    "Defence": 2800,
                    "MoveSPEED": 4,
                    "Damages": [2100, 1],
                    "DefFor0": 2541.34
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 550, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyA1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentShoes30", "quantity": 1, "chance": 6e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG1", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "mushP",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceA1", "name": "Spaceway Raceway", "id": 151},
                    "portalRequirements": [5000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": undefined,
                    "next": "w4a2",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4a2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "TV",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 50,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 55,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 18,
                    "MonsterHPTotal": 650000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 3000,
                    "ExpType": 0,
                    "Defence": 3300,
                    "MoveSPEED": 4,
                    "Damages": [2300, 1],
                    "DefFor0": 2772.33
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 630, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyA2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyA2b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Line12", "quantity": 1, "chance": 2.2e-06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "InvStorage22", "quantity": 1, "chance": 8e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG2", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4a2",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceA2", "name": "TV Outpost", "id": 152},
                    "portalRequirements": [12000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "mushP",
                    "next": "w4a3",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4a3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Donut",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 51,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 40,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 850000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 4000,
                    "ExpType": 0,
                    "Defence": 3800,
                    "MoveSPEED": 4,
                    "Damages": [2550, 1],
                    "DefFor0": 3057.91
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 730, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyA3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentShoes32", "quantity": 1, "chance": 6e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG3", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4a3",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceA3", "name": "Donut Drive-In", "id": 153},
                    "portalRequirements": [18000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4a2",
                    "next": "demonP",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("demonP", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Demon Genie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 52,
                    "MonsterOffsetX": 50,
                    "MonsterOffsetY": 69,
                    "HeightOfMonster": 68,
                    "MonsterMoving": 1,
                    "MovingFrame": 13,
                    "RespawnTime": 40,
                    "DeathFrame": 24,
                    "MonsterHPTotal": 1000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 4800,
                    "ExpType": 0,
                    "Defence": 4325,
                    "MoveSPEED": 3,
                    "Damages": [2750, 1],
                    "DefFor0": 3284.02
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 860, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyA4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentRings24", "quantity": 1, "chance": 4e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG4", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.0034, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "demonP",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceA4", "name": "Outskirts of Fallstar Isle", "id": 154},
                    "portalRequirements": [25000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4a3",
                    "next": "w4b2",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4b2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Soda Can",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 54,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 38,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 1500000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 7600,
                    "ExpType": 0,
                    "Defence": 5150,
                    "MoveSPEED": 6,
                    "Damages": [3000, 1],
                    "DefFor0": 3563.92
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1050, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyB1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Weight3", "quantity": 1, "chance": 1.9e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG6", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0027, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4b2",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceB1", "name": "Mountainous Deugh", "id": 155},
                    "portalRequirements": [40000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "demonP",
                    "next": "w4b1",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4b1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Flying Worm",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 53,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 55,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 40,
                    "DeathFrame": 18,
                    "MonsterHPTotal": 2000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 8750,
                    "ExpType": 0,
                    "Defence": 5650,
                    "MoveSPEED": 7,
                    "Damages": [3400, 1],
                    "DefFor0": 4005.88
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1300, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyB2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampA29", "quantity": 1, "chance": 3.8e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG5", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4b1",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceB2", "name": "Wurm Highway", "id": 156},
                    "portalRequirements": [60000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4b2",
                    "next": "w4b3",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4b3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Gelatinous Cuboid",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 55,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 12,
                    "RespawnTime": 40,
                    "DeathFrame": 19,
                    "MonsterHPTotal": 3000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 10800,
                    "ExpType": 0,
                    "Defence": 6200,
                    "MoveSPEED": 4,
                    "Damages": [3900, 1],
                    "DefFor0": 4549.15
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1600, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyB3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "InvStorageS", "quantity": 1, "chance": 3.8e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG7", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats13", "quantity": 1, "chance": 1.5e-07, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0029, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4b3",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceB3", "name": "Jelly Cube Bridge", "id": 157},
                    "portalRequirements": [90000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4b1",
                    "next": "w4b4",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4b4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Choccie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 56,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 40,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 4000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 14000,
                    "ExpType": 0,
                    "Defence": 6900,
                    "MoveSPEED": 4,
                    "Damages": [4500, 1],
                    "DefFor0": 5189.1
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 2000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyB4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentRings25", "quantity": 1, "chance": 4e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG8", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4b4",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceB4", "name": "Cocoa Tunnel", "id": 158},
                    "portalRequirements": [120000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4b3",
                    "next": "w4b5",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4b5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Biggole Wurm",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 57,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 55,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 40,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 6000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 17500,
                    "ExpType": 0,
                    "Defence": 7700,
                    "MoveSPEED": 6,
                    "Damages": [5200, 1],
                    "DefFor0": 5921.21
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 2500, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyB5", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "InvStorage23", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG9", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0033, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4b5",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceB5", "name": "Standstill Plains", "id": 159},
                    "portalRequirements": [150000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4b4",
                    "next": "w4c1",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4c1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Clammie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 58,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 8000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 23400,
                    "ExpType": 0,
                    "Defence": 8700,
                    "MoveSPEED": 4,
                    "Damages": [6000, 1],
                    "DefFor0": 6741.2
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 3100, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyC1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyC1b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG10", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4c1",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceC1", "name": "Shelled Shores", "id": 160},
                    "portalRequirements": [190000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4b5",
                    "next": "w4c2",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4c2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Octodar",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 59,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 36,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 14,
                    "MonsterHPTotal": 11000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 27600,
                    "ExpType": 0,
                    "Defence": 9600,
                    "MoveSPEED": 4,
                    "Damages": [7000, 1],
                    "DefFor0": 7744.43
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 3500, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyC2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG11", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes4", "quantity": 55, "chance": 3e-07, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4c2",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceC2", "name": "The Untraveled Octopath", "id": 161},
                    "portalRequirements": [250000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4c1",
                    "next": "w4c3",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4c3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Flombeige",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 60,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 45,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 15000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 30000,
                    "ExpType": 0,
                    "Defence": 10500,
                    "MoveSPEED": 4,
                    "Damages": [8200, 1],
                    "DefFor0": 8920.83
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 4500, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyC3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Line3", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG12", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.003, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4c3",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceC3", "name": "Flamboyant Bayou", "id": 162},
                    "portalRequirements": [300000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4c2",
                    "next": "w4c4",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w4c4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Stilted Seeker",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 61,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 76,
                    "MonsterMoving": 1,
                    "MovingFrame": 9,
                    "RespawnTime": 45,
                    "DeathFrame": 20,
                    "MonsterHPTotal": 20000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 33000,
                    "ExpType": 0,
                    "Defence": 11000,
                    "MoveSPEED": 6,
                    "Damages": [10000, 1],
                    "DefFor0": 10638.1
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyC4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 6.667e-05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsG13", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w4c4",
                    "world": "Hyperion Nebula",
                    "map": <MapNameModel>{"intName": "xSpaceC4", "name": "Enclave of Eyes", "id": 163},
                    "portalRequirements": [350000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w4c3",
                    "next": "Crystal3",
                    "hasCrystal": true,
                    "crystalName": "Crystal3",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5a1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Suggma",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 62,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 29,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 43,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 25000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 40000,
                    "ExpType": 0,
                    "Defence": 12000,
                    "MoveSPEED": 3,
                    "Damages": [10000, 1],
                    "DefFor0": 10638.1
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaA1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaA1b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 4, "chance": 2e-08, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH1", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5a1",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaA1", "name": "Naut Sake Perimeter", "id": 201},
                    "portalRequirements": [25000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": undefined,
                    "next": "w5a2",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5a2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Maccie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 63,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 42,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 43,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 35000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 54000,
                    "ExpType": 0,
                    "Defence": 12000,
                    "MoveSPEED": 4,
                    "Damages": [14000, 1],
                    "DefFor0": 14295.2
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 7000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaA2", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 20, "chance": 1e-05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH2", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampC16", "quantity": 1, "chance": 3e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5a2",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaA2", "name": "Niagrilled Falls", "id": 202},
                    "portalRequirements": [30000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5a1",
                    "next": "w5a3",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5a3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mister Brightside",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 64,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 63,
                    "HeightOfMonster": 68,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 43,
                    "DeathFrame": 20,
                    "MonsterHPTotal": 60000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 91000,
                    "ExpType": 0,
                    "Defence": 12000,
                    "MoveSPEED": 4,
                    "Damages": [14000, 1],
                    "DefFor0": 14295.2
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 8500, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaA3", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH3", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 21, "chance": 4e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5a3",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaA3", "name": "The Killer Roundabout", "id": 203},
                    "portalRequirements": [50000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5a2",
                    "next": "w5a4",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5a4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Cheese Nub",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 65,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 37,
                    "HeightOfMonster": 47,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 43,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 90000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 135000,
                    "ExpType": 0,
                    "Defence": 17000,
                    "MoveSPEED": 5,
                    "Damages": [14000, 1],
                    "DefFor0": 14295.2
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 10000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaA4", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 0, "chance": 1e-06, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH4", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "InvStorageC", "quantity": 1, "chance": 1.01e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0034, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5a4",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaA4", "name": "Cracker Jack Lake", "id": 204},
                    "portalRequirements": [75000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5a3",
                    "next": "w5a5",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5a5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Stiltmole",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 66,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 68,
                    "HeightOfMonster": 65,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 45,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 130000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 185000,
                    "ExpType": 0,
                    "Defence": 17000,
                    "MoveSPEED": 3,
                    "Damages": [23000, 1],
                    "DefFor0": 21974.5
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 12500, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaA5", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaA5b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 1, "chance": 6e-07, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH5", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0037, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5a5",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaA5", "name": "The Great Molehill", "id": 205},
                    "portalRequirements": [125000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5a4",
                    "next": "w5b1",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5b1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Molti",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 67,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 43,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 200000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 275000,
                    "ExpType": 0,
                    "Defence": 17000,
                    "MoveSPEED": 3,
                    "Damages": [23000, 1],
                    "DefFor0": 21974.5
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 15000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaB1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH6", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 2, "chance": 4e-07, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5b1",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaB1", "name": "Erruption River", "id": 206},
                    "portalRequirements": [300000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5a5",
                    "next": "w5b2",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5b2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Purgatory Stalker",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 68,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 46,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 43,
                    "DeathFrame": 9,
                    "MonsterHPTotal": 300000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 400000,
                    "ExpType": 0,
                    "Defence": 17000,
                    "MoveSPEED": 3,
                    "Damages": [30000, 1],
                    "DefFor0": 27591.3
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 17000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaB2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH7", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 3, "chance": 2e-07, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5b2",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaB2", "name": "Mount Doomish", "id": 207},
                    "portalRequirements": [500000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5b1",
                    "next": "w5b3",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5b3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Citringe",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 69,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 43,
                    "HeightOfMonster": 45,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 45,
                    "DeathFrame": 19,
                    "MonsterHPTotal": 420000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 550000,
                    "ExpType": 0,
                    "Defence": 26000,
                    "MoveSPEED": 3,
                    "Damages": [30000, 1],
                    "DefFor0": 27591.3
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 19000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaB3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaB3b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH8", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 5, "chance": 1e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0029, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5b3",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaB3", "name": "OJ Bay", "id": 208},
                    "portalRequirements": [1000000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5b2",
                    "next": "w5b4",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5b4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Lampar",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 70,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 48,
                    "HeightOfMonster": 55,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 43,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 600000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 780000,
                    "ExpType": 0,
                    "Defence": 26000,
                    "MoveSPEED": 3,
                    "Damages": [30000, 1],
                    "DefFor0": 27591.3
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 22000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaB4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH9", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 6, "chance": 1e-06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats12", "quantity": 1, "chance": 1.5e-07, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5b4",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaB4", "name": "Lampar Lake", "id": 209},
                    "portalRequirements": [2000000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5b3",
                    "next": "w5b5",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5b5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Fire Spirit",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 71,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 63,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 43,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 720000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 900000,
                    "ExpType": 0,
                    "Defence": 26000,
                    "MoveSPEED": 4,
                    "Damages": [40000, 1],
                    "DefFor0": 35242.3
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaB5", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH10", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 7, "chance": 1e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0033, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5b5",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaB5", "name": "Spitfire River", "id": 210},
                    "portalRequirements": [3000000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5b4",
                    "next": "w5b6",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5b6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Biggole Mole",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 72,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 1,
                    "MovingFrame": 9,
                    "RespawnTime": 45,
                    "DeathFrame": 18,
                    "MonsterHPTotal": 900000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1000000,
                    "ExpType": 0,
                    "Defence": 36000,
                    "MoveSPEED": 3,
                    "Damages": [40000, 1],
                    "DefFor0": 35242.3
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 29000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaB6", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key5", "quantity": 1, "chance": 1.33333e-05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH11", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 22, "chance": 5e-07, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5b6",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaB6", "name": "Miner Mole Outskirts", "id": 211},
                    "portalRequirements": [6000000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5b5",
                    "next": "w5c1",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5c1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Crawler",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 73,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 24,
                    "HeightOfMonster": 35,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 42,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 1200000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1150000,
                    "ExpType": 0,
                    "Defence": 45000,
                    "MoveSPEED": 4,
                    "Damages": [40000, 1],
                    "DefFor0": 35242.3
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 36000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaC1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key5", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH12", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable27", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5c1",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaC1", "name": "Crawly Catacombs", "id": 212},
                    "portalRequirements": [10000000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5b6",
                    "next": "w5c2",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("w5c2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Tremor Wurm",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 74,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 49,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 47,
                    "DeathFrame": 8,
                    "MonsterHPTotal": 1500000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1250000,
                    "ExpType": 0,
                    "Defence": 50000,
                    "MoveSPEED": 2,
                    "Damages": [200000, 1],
                    "DefFor0": 135245
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 50000, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LavaC2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key5", "quantity": 1, "chance": 4e-05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsH13", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StampA37", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable27", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "w5c2",
                    "world": "Smolderin' Plateau",
                    "map": <MapNameModel>{"intName": "wLavaC2", "name": "The Worm Nest", "id": 213},
                    "portalRequirements": [60000]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "w5c1",
                    "next": "Crystal4",
                    "hasCrystal": true,
                    "crystalName": "Crystal4",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("mushR", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Red Mushroom",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 19,
                    "MonsterOffsetX": 23,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 50,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 45,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 47,
                    "ExpType": 0,
                    "Defence": 25,
                    "MoveSPEED": 4,
                    "Damages": [30, 1],
                    "DefFor0": 21.54
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 6, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands4", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsA1", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.0052, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "mushR",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "GrasslandsD", "name": "Birch Enclave", "id": 17},
                    "portalRequirements": [0]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "mushG",
                    "next": "frogG",
                    "hasCrystal": true,
                    "crystalName": "Crystal0",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("shovelR", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dig Doug",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 56,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 40,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 228,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 60, "chance": 0.43, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsB12", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "snailZ",
                    "next": "Crystal1",
                    "hasCrystal": true,
                    "crystalName": "Crystal1",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("skele", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Xylobone",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 56,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 40,
                    "DeathFrame": 20,
                    "MonsterHPTotal": 200000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2000,
                    "ExpType": 0,
                    "Defence": 100,
                    "MoveSPEED": 4,
                    "Damages": [200, 1],
                    "DefFor0": 213.8
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 100, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE12", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.01, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "ram",
                    "next": "skele2",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("skele2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bloodbone",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 48,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 56,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 60,
                    "DeathFrame": 20,
                    "MonsterHPTotal": 10000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 6000,
                    "ExpType": 0,
                    "Defence": 100,
                    "MoveSPEED": 4,
                    "Damages": [3000, 1],
                    "DefFor0": 3563.92
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 800, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowC5", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsE13", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "skele2",
                    "world": "Frostbite Tundra",
                    "map": <MapNameModel>{"intName": "ySnowD2", "name": "Hell Hath Frozen Over", "id": 117},
                    "portalRequirements": [0]
                },
                "navigation": <EnemyNavModel>{
                    "prev": "skele",
                    "next": "Crystal2",
                    "hasCrystal": true,
                    "crystalName": "Crystal2",
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("wolfA", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Amarok",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 25000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 105,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <ItemDropModel>{"item": "Crystal1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <CoinDropModel>{"item": "COIN", "quantity": 500, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Meatloaf", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ2", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats39", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolAmarokA", "quantity": 1, "chance": 0.0007, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest17", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable2", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "poopD",
                    "next": "wolfB",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 25000,
                    "defence": 40,
                    "exp": 4000,
                    "keys": 1,
                    "attacks": [
                        <BossAttackModel>{"name": "Fireball", "damage": 40},
                        <BossAttackModel>{"name": "Stomp", "damage": 120},
                        <BossAttackModel>{"name": "Rock Spikes", "damage": 50},
                        <BossAttackModel>{"name": "Spike Traps", "damage": 48},
                        <BossAttackModel>{"name": "Sword Swing", "damage": 100},
                        <BossAttackModel>{"name": "Uppercut", "damage": 200},
                        <BossAttackModel>{"name": "Rocketfist", "damage": 100}
                    ]
                }
            }),
        new EnemyBase("wolfB", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chaotic Amarok",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 8000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 1750,
                    "MoveSPEED": 3,
                    "Damages": [1200, 1],
                    "DefFor0": 1469.66
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 500, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Meatloaf", "quantity": 3, "chance": 0.1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ4", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats39", "quantity": 1, "chance": 0.004, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolAmarokA", "quantity": 1, "chance": 0.0033, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest17", "quantity": 3, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest29", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 4, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable2", "quantity": 4, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 4, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "wolfA",
                    "next": "wolfC",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 8000000,
                    "defence": 1750,
                    "exp": 400000,
                    "keys": 5,
                    "attacks": [
                        <BossAttackModel>{"name": "Fireball", "damage": 650},
                        <BossAttackModel>{"name": "Stomp", "damage": 1500},
                        <BossAttackModel>{"name": "Rock Spikes", "damage": 800},
                        <BossAttackModel>{"name": "Spike Traps", "damage": 675},
                        <BossAttackModel>{"name": "Sword Swing", "damage": 1500},
                        <BossAttackModel>{"name": "Uppercut", "damage": 3000},
                        <BossAttackModel>{"name": "Rocketfist", "damage": 1000}
                    ]
                }
            }),
        new EnemyBase("wolfC", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Radiant Amarok",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 100000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 8000,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 500, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Meatloaf", "quantity": 10, "chance": 0.05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ14", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats39", "quantity": 1, "chance": 0.012, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolAmarokA", "quantity": 1, "chance": 0.0085, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentCape3", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneZ1", "quantity": 1, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest17", "quantity": 6, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest29", "quantity": 2, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "wolfB",
                    "next": "babaHour",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 100000000,
                    "defence": 8000,
                    "exp": 50000000,
                    "keys": 30,
                    "attacks": [
                        <BossAttackModel>{"name": "Fireball", "damage": 3650},
                        <BossAttackModel>{"name": "Stomp", "damage": 5500},
                        <BossAttackModel>{"name": "Rock Spikes", "damage": 3800},
                        <BossAttackModel>{"name": "Spike Traps", "damage": 3675},
                        <BossAttackModel>{"name": "Sword Swing", "damage": 5500},
                        <BossAttackModel>{"name": "Uppercut", "damage": 8000},
                        <BossAttackModel>{"name": "Rocketfist", "damage": 5000}
                    ]
                }
            }),
        new EnemyBase("Boss2A", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Efaunt",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 1000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 550,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <ItemDropModel>{"item": "Crystal2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ3", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                        <ItemDropModel>{"item": "MidnightCookie", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolEfauntA", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats2", "quantity": 1, "chance": 0.000667, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 75, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EfauntDrop1", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable6", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "babaMummy",
                    "next": "Boss2B",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 1000000,
                    "defence": 350,
                    "exp": 100000,
                    "keys": 1,
                    "attacks": [
                        <BossAttackModel>{"name": "Hammer", "damage": 1250},
                        <BossAttackModel>{"name": "Scimitar", "damage": 300},
                        <BossAttackModel>{"name": "Fire Column", "damage": 350},
                        <BossAttackModel>{"name": "Purple Psionic Hoops", "damage": 450},
                        <BossAttackModel>{"name": "Finger Gun", "damage": 5000},
                        <BossAttackModel>{"name": "Headpat", "damage": 10000},
                        <BossAttackModel>{"name": "Blue Psionic", "damage": 400}
                    ]
                }
            }),
        new EnemyBase("Boss2B", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chaotic Efaunt",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 30000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 3500,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ7", "quantity": 1, "chance": 0.016, "questLink": "N/A"},
                        <ItemDropModel>{"item": "MidnightCookie", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolEfauntA", "quantity": 1, "chance": 0.003, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats2", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EfauntDrop1", "quantity": 3, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EfauntDrop2", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss2A",
                    "next": "Boss2C",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 30000000,
                    "defence": 3500,
                    "exp": 2000000,
                    "keys": 5,
                    "attacks": [
                        <BossAttackModel>{"name": "Hammer", "damage": 1800},
                        <BossAttackModel>{"name": "Scimitar", "damage": 4000},
                        <BossAttackModel>{"name": "Fire Column", "damage": 2000},
                        <BossAttackModel>{"name": "Purple Psionic Hoops", "damage": 1500},
                        <BossAttackModel>{"name": "Finger Gun", "damage": 2500},
                        <BossAttackModel>{"name": "Headpat", "damage": 5000},
                        <BossAttackModel>{"name": "Blue Psionic", "damage": 3300}
                    ]
                }
            }),
        new EnemyBase("Boss2C", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Gilded Efaunt",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 400000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 15000,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ15", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "MidnightCookie", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolEfauntA", "quantity": 1, "chance": 0.018, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats2", "quantity": 1, "chance": 0.015, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EfauntDrop1", "quantity": 12, "chance": 0.9, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EfauntDrop2", "quantity": 4, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentCape4", "quantity": 1, "chance": 0.0007, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss2B",
                    "next": "mini3a",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 400000000,
                    "defence": 15000,
                    "exp": 100000000,
                    "keys": 40,
                    "attacks": [
                        <BossAttackModel>{"name": "Hammer", "damage": 18000},
                        <BossAttackModel>{"name": "Scimitar", "damage": 40000},
                        <BossAttackModel>{"name": "Fire Column", "damage": 20000},
                        <BossAttackModel>{"name": "Purple Psionic Hoops", "damage": 15000},
                        <BossAttackModel>{"name": "Finger Gun", "damage": 25000},
                        <BossAttackModel>{"name": "Headpat", "damage": 50000},
                        <BossAttackModel>{"name": "Blue Psionic", "damage": 33000}
                    ]
                }
            }),
        new EnemyBase("Boss3A", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chizoar",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 20000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 2250,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ8", "quantity": 1, "chance": 0.007, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolChizoarA", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPendant24", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Chiz0", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable14", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "mini3a",
                    "next": "Boss3B",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 20000000,
                    "defence": 2250,
                    "exp": 750000,
                    "keys": 1,
                    "attacks": [
                        <BossAttackModel>{"name": "Front Stomp", "damage": 3200},
                        <BossAttackModel>{"name": "Back Stomp", "damage": 3600},
                        <BossAttackModel>{"name": "Frozen Spikes", "damage": 2500},
                        <BossAttackModel>{"name": "Falling Icicles", "damage": 2100},
                        <BossAttackModel>{"name": "Tusk Swipe", "damage": 3500}
                    ]
                }
            }),
        new EnemyBase("Boss3B", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chaotic Chizoar",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 250000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 7500,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ9", "quantity": 1, "chance": 0.004, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolChizoarA", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPendant24", "quantity": 1, "chance": 0.0032, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Chiz0", "quantity": 3, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Chiz1", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss3A",
                    "next": "Boss3C",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 250000000,
                    "defence": 7500,
                    "exp": 10000000,
                    "keys": 5,
                    "attacks": [
                        <BossAttackModel>{"name": "Front Stomp", "damage": 6000},
                        <BossAttackModel>{"name": "Back Stomp", "damage": 9000},
                        <BossAttackModel>{"name": "Frozen Spikes", "damage": 5000},
                        <BossAttackModel>{"name": "Falling Icicles", "damage": 4000},
                        <BossAttackModel>{"name": "Tusk Swipe", "damage": 6000}
                    ]
                }
            }),
        new EnemyBase("Boss3C", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Blighted Chizoar",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 2000000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 25000,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ16", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolChizoarA", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPendant24", "quantity": 1, "chance": 0.014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentCape5", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Chiz0", "quantity": 7, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Chiz1", "quantity": 2, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneZ2", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss3B",
                    "next": "mini4a",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 2000000000,
                    "defence": 25000,
                    "exp": 500000000,
                    "keys": 50,
                    "attacks": [
                        <BossAttackModel>{"name": "Front Stomp", "damage": 18000},
                        <BossAttackModel>{"name": "Back Stomp", "damage": 40000},
                        <BossAttackModel>{"name": "Frozen Spikes", "damage": 20000},
                        <BossAttackModel>{"name": "Falling Icicles", "damage": 15000},
                        <BossAttackModel>{"name": "Tusk Swipe", "damage": 25000},
                        <BossAttackModel>{"name": "filler", "damage": 33000}
                    ]
                }
            }),
        new EnemyBase("Boss4A", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Massive Troll",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 80000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1000000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ10", "quantity": 1, "chance": 0.004, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolTroll", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "TrollPart", "quantity": 1, "chance": 0.13, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "mini4a",
                    "next": "Boss4B",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 80000000,
                    "defence": 2500,
                    "exp": 750000,
                    "keys": 1,
                    "attacks": [<BossAttackModel>{"name": "Talk no Jutsu", "damage": 1000}, <BossAttackModel>{"name": "filler", "damage": 400}]
                }
            }),
        new EnemyBase("Boss4B", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chaotic Troll",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 350000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 5000000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ11", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolTroll", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                        <ItemDropModel>{"item": "TrollPart", "quantity": 2, "chance": 0.3, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss4A",
                    "next": "Boss4C",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 350000000,
                    "defence": 5,
                    "exp": 30000000,
                    "keys": 5,
                    "attacks": [<BossAttackModel>{"name": "Talk no Jutsu", "damage": 1800}, <BossAttackModel>{"name": "filler", "damage": 3300}]
                }
            }),
        new EnemyBase("Boss4C", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Blitzkrieg Troll",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 2000000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 20000000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ17", "quantity": 1, "chance": 0.003, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolTroll", "quantity": 1, "chance": 0.007, "questLink": "N/A"},
                        <ItemDropModel>{"item": "TrollPart", "quantity": 4, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentCape6", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneZ2", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss4B",
                    "next": "Boss5A",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 2000000000,
                    "defence": 25,
                    "exp": 1000000000,
                    "keys": 60,
                    "attacks": [<BossAttackModel>{"name": "Talk no Jutsu", "damage": 18000}, <BossAttackModel>{"name": "filler", "damage": 33000}]
                }
            }),
        new EnemyBase("Boss5A", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Kattlecruk",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 1e+11,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1000000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "KrukPart", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ18", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolKruk", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA6", "quantity": 3, "chance": 0.05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable27", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss4C",
                    "next": "Boss5B",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 1000000000,
                    "defence": 2500,
                    "exp": 20000000,
                    "keys": 1,
                    "attacks": [
                        <BossAttackModel>{"name": "Attack1", "damage": 1000},
                        <BossAttackModel>{"name": "Attack2", "damage": 1500},
                        <BossAttackModel>{"name": "Attack3", "damage": 800},
                        <BossAttackModel>{"name": "Attack4", "damage": 450},
                        <BossAttackModel>{"name": "Attack5", "damage": 5000},
                        <BossAttackModel>{"name": "Attack6", "damage": 10000},
                        <BossAttackModel>{"name": "Attack7", "damage": 400}
                    ]
                }
            }),
        new EnemyBase("Boss5B", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chaotic Kattlecruk",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 2.5e+12,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 5000000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "KrukPart", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "KrukPart2", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 3.5e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolKruk", "quantity": 1, "chance": 0.00022, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneT6", "quantity": 2, "chance": 0.05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ19", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable27", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss5A",
                    "next": "Boss5C",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 1000000000,
                    "defence": 5,
                    "exp": 700000000,
                    "keys": 5,
                    "attacks": [
                        <BossAttackModel>{"name": "Attack1", "damage": 1800},
                        <BossAttackModel>{"name": "Attack2", "damage": 4000},
                        <BossAttackModel>{"name": "Attack3", "damage": 2000},
                        <BossAttackModel>{"name": "Attack4", "damage": 1500},
                        <BossAttackModel>{"name": "Attack5", "damage": 2500},
                        <BossAttackModel>{"name": "Attack6", "damage": 5000},
                        <BossAttackModel>{"name": "Attack7", "damage": 3300}
                    ]
                }
            }),
        new EnemyBase("Boss5C", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sacrilegious Kattlecruk",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 1e+15,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 20000000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "KrukPart", "quantity": 2, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "KrukPart2", "quantity": 1, "chance": 0.08, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 0.0004, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolKruk", "quantity": 1, "chance": 0.0014, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW7", "quantity": 2, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneHelm7", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ20", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentCape13", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss5B",
                    "next": "Blank",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": <BossDetailsModel>{
                    "health": 1000000000,
                    "defence": 25,
                    "exp": 2000000000,
                    "keys": 70,
                    "attacks": [
                        <BossAttackModel>{"name": "Attack1", "damage": 18000},
                        <BossAttackModel>{"name": "Attack2", "damage": 40000},
                        <BossAttackModel>{"name": "Attack3", "damage": 20000},
                        <BossAttackModel>{"name": "Attack4", "damage": 15000},
                        <BossAttackModel>{"name": "Attack5", "damage": 25000},
                        <BossAttackModel>{"name": "Attack6", "damage": 50000},
                        <BossAttackModel>{"name": "Attack7", "damage": 33000}
                    ]
                }
            }),
        new EnemyBase("poopBig", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dr Defecaus",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 745000,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                        <ItemDropModel>{"item": "JobApplication", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 24, "chance": 0.06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Sewers1", "quantity": 150, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{
                            "item": "EquipmentToolsHatchet2b",
                            "quantity": 1,
                            "chance": 0.02,
                            "questLink": "N/A"
                        },
                        <ItemDropModel>{"item": "EquipmentTools10", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Sewers1b", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 2, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "babayaga",
                    "next": "poopD",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("babayaga", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Baba Yaga",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 6,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 92,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 86400,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 150000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1750,
                    "ExpType": 0,
                    "Defence": 300,
                    "MoveSPEED": 4,
                    "Damages": [400, 20],
                    "DefFor0": 466.07
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 800, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ0", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                        <ItemDropModel>{"item": "BabaYagaETC", "quantity": 1, "chance": 0.006, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 63, "chance": 0.06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest41", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 2, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 0.5, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": undefined,
                    "next": "poopBig",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("babaHour", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Biggie Hours",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 6,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 86,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 86400,
                    "DeathFrame": 20,
                    "MonsterHPTotal": 800000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12500,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 5,
                    "Damages": [500, 20],
                    "DefFor0": 593.5
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 7000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Hgg", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneZ1", "quantity": 2, "chance": 0.4, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 66, "chance": 0.06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ5", "quantity": 1, "chance": 0.024, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 75, "chance": 0.06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 0.4, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "wolfC",
                    "next": "babaMummy",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("babaMummy", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "King Doot",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 6,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 102,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 86400,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 3000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 50000,
                    "ExpType": 0,
                    "Defence": 1000,
                    "MoveSPEED": 4,
                    "Damages": [800, 450],
                    "DefFor0": 973.57
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ6", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key2", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 65, "chance": 0.06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 5, "chance": 0.75, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneZ1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPants19", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "MidnightCookie", "quantity": 2, "chance": 0.2, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 0.5, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "babaHour",
                    "next": "Boss2A",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("mini3a", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dilapidated Slush",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 6,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 60,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 12500000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 250000,
                    "ExpType": 0,
                    "Defence": 2000,
                    "MoveSPEED": 0,
                    "Damages": [20000, 450],
                    "DefFor0": 19482
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ12", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "WorshipSkull8", "quantity": 1, "chance": 0.009, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ObolSlush", "quantity": 1, "chance": 0.004, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key3", "quantity": 2, "chance": 0.8, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes3", "quantity": 20, "chance": 0.06, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 0.5, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss2C",
                    "next": "Boss3A",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("mini4a", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mutated Mush",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 6,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 78,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 9,
                    "MonsterHPTotal": 120000000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 2000000,
                    "ExpType": 0,
                    "Defence": 4500,
                    "MoveSPEED": 3,
                    "Damages": [3000, 450],
                    "DefFor0": 3563.92
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsZ13", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes3", "quantity": 21, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PetEgg", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Ladle", "quantity": 3, "chance": 1, "questLink": "N/A"},
                        <RecipeDropModel>{"item": "SmithingRecipes4", "quantity": 56, "chance": 0.008, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 0.5, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": <EnemyNavModel>{
                    "prev": "Boss3C",
                    "next": "Boss4A",
                    "hasCrystal": true,
                    "crystalName": undefined,
                    "hasCard": true
                },
                "bossData": undefined
            }),
        new EnemyBase("xmasEvent", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Giftmas Blobulyte",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 10, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest30", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent1", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent2", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent3", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent4", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("xmasEvent2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Meaning of Giftmas",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 10, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest30", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent1", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent2", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent3", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent4", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("xmasEvent3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Golden Giftmas Box",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 10, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest30", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent1", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent2", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent3", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent4", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("loveEvent", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Loveulyte",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY3", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest40", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent5", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent6", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent7", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent8", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("loveEvent2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chocco Box",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY3", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest40", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent5", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent6", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent7", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent8", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("loveEvent3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Giant Rose",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY3", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentCape8", "quantity": 1, "chance": 0.001429, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentCape9", "quantity": 1, "chance": 0.001429, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentCape10", "quantity": 1, "chance": 0.001429, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("EasterEvent1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Egggulyte",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY6", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest42", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneTe", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneAe", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneWe", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("EasterEvent2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Egg Capsule",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY6", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest42", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest44", "quantity": 1, "chance": 0.13, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneTe", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneAe", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneWe", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("SummerEvent1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Coastiolyte",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY11", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest49", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest50", "quantity": 1, "chance": 0.13, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("SummerEvent2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Summer Spirit",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY2", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Timecandy1", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Timecandy2", "quantity": 3, "chance": 0.01, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneWeb", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneT1eb", "quantity": 3, "chance": 0.03, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneAeB", "quantity": 3, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest50", "quantity": 1, "chance": 0.1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("springEvent1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bubbulyte",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY2", "quantity": 1, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest71", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "CardPack6", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("springEvent2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Spring Splendor",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY2", "quantity": 1, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Timecandy1", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats38", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats32", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats56", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ClassSwap", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ResetBox", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ResetCompletedS", "quantity": 1, "chance": 0.001, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Blank0ramaFiller", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Nightmare Amarok",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 85,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ghost", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Ghost (Event)",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 6,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 52,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 100,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 1000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "a",
                    "ExpGiven": 1,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 5,
                    "Damages": [5, 5],
                    "DefFor0": 2
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 10, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest30", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent1", "quantity": 2, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent2", "quantity": 2, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent3", "quantity": 2, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent4", "quantity": 2, "chance": 0.3, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("slimeR", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Valentslime",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 24,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 32,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 42,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 20,
                    "ExpType": 0,
                    "Defence": 9,
                    "MoveSPEED": 4,
                    "Damages": [1, 1],
                    "DefFor0": 0
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY3", "quantity": 1, "chance": 0.085, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent5", "quantity": 5, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent6", "quantity": 5, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent7", "quantity": 5, "chance": 0.25, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodEvent8", "quantity": 5, "chance": 0.25, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("sheepB", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Floofie",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 35,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 47,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 300,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 1,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 5,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY6", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Timecandy1", "quantity": 3, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Timecandy2", "quantity": 3, "chance": 0.15, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Timecandy4", "quantity": 2, "chance": 0.01, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneTe", "quantity": 2, "chance": 0.07, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneAe", "quantity": 2, "chance": 0.08, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneWe", "quantity": 2, "chance": 0.04, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("snakeY", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Shell Snake",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 25,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 36,
                    "HeightOfMonster": 32,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 45,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 170,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 34,
                    "ExpType": 0,
                    "Defence": 18,
                    "MoveSPEED": 8,
                    "Damages": [22, 1],
                    "DefFor0": 14.57
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY7", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Timecandy1", "quantity": 3, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Timecandy2", "quantity": 3, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneTe", "quantity": 2, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneAe", "quantity": 2, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneWe", "quantity": 2, "chance": 0.02, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("crabcakeB", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mr Blueberry",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 11,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 40,
                    "HeightOfMonster": 64,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 20,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [22, 1],
                    "DefFor0": 14.57
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY10", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest49", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneT1eb", "quantity": 3, "chance": 0.012, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneAeB", "quantity": 3, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneWeb", "quantity": 2, "chance": 0.01, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("shovelY", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Plasti Doug",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 56,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 40,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsY13", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Quest49", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneT1eb", "quantity": 3, "chance": 0.012, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneAeB", "quantity": 3, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneWeb", "quantity": 2, "chance": 0.01, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("pghost", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Ghost (Event)",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 40,
                    "DeathFrame": 9,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 7,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet0", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Squirrel",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 36,
                    "MonsterMoving": 1,
                    "MovingFrame": 7,
                    "RespawnTime": 40,
                    "DeathFrame": 15,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Piggo",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 38,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 16,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Wild Boar",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 40,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 5,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mallay",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 44,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 40,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Whale",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 45,
                    "MonsterMoving": 1,
                    "MovingFrame": 5,
                    "RespawnTime": 40,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chippy",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 44,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 40,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bunny",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 13,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mecho Mouse",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 1,
                    "MovingFrame": 0,
                    "RespawnTime": 40,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Panda",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 47,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet9", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dog",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 44,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 40,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet10", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Cool Bird",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 53,
                    "MonsterMoving": 1,
                    "MovingFrame": 8,
                    "RespawnTime": 40,
                    "DeathFrame": 17,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Pet11", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Hedgehog",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 23,
                    "MonsterOffsetX": 38,
                    "MonsterOffsetY": 47,
                    "HeightOfMonster": 46,
                    "MonsterMoving": 1,
                    "MovingFrame": 6,
                    "RespawnTime": 40,
                    "DeathFrame": 11,
                    "MonsterHPTotal": 14000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 420,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 4,
                    "Damages": [2, 1],
                    "DefFor0": 0.5
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Copper", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Copper",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 120,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 1,
                    "Defence": 25,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC1", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.0065, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "Copper",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "MininggA", "name": "Tunnels Entrance", "id": 6},
                    "portalRequirements": [10]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Iron", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Iron",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 120,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 5,
                    "ExpType": 1,
                    "Defence": 140,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC2", "quantity": 1, "chance": 0.00013, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.007, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "Iron",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "MininggB", "name": "Freefall Caverns", "id": 7},
                    "portalRequirements": [25, 81]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Gold", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Gold",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 120,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 10,
                    "ExpType": 1,
                    "Defence": 1000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC3", "quantity": 1, "chance": 0.00011, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.0075, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Plat", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Plat",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 180,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 30,
                    "ExpType": 1,
                    "Defence": 7500,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD2", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.0077, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "Plat",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "MininggC", "name": "The Ol' Straightaway", "id": 10},
                    "portalRequirements": [40]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Dementia", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dementia",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 180,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 55,
                    "ExpType": 1,
                    "Defence": 40000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD1", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.0082, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Void", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Void",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 240,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 185,
                    "ExpType": 1,
                    "Defence": 100000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD3", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.009, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "Void",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "MininggD", "name": "Echoing Egress", "id": 11},
                    "portalRequirements": [50, 60]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Lustre", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Lustre",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 240,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 250,
                    "ExpType": 1,
                    "Defence": 250000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD4", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.0095, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Starfire", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Starfire",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 240,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 500,
                    "ExpType": 1,
                    "Defence": 1000000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF16", "quantity": 1, "chance": 3e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.011, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "Starfire",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "MininggE", "name": "Slip Slidy Ledges", "id": 12},
                    "portalRequirements": [60]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Dreadlo", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dreadlo",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 300,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 850,
                    "ExpType": 1,
                    "Defence": 5000000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF29", "quantity": 1, "chance": 3e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.013, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Godshard", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Godshard",
                    "AFKtype": AFKTypeEnum.Mining,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 38,
                    "HeightOfMonster": 30,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.oreType,
                    "SpecialType": "",
                    "ExpGiven": 1250,
                    "ExpType": 1,
                    "Defence": 20000000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0.4, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("OakTree", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Oak Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 2,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 3,
                    "Defence": 20,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC4", "quantity": 1, "chance": 0.0004, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.008, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BirchTree", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Birch Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 5,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 6,
                    "ExpType": 3,
                    "Defence": 80,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC5", "quantity": 1, "chance": 0.00029, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.0085, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("JungleTree", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Jungle Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 112,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 300,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 12,
                    "ExpType": 3,
                    "Defence": 250,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC6", "quantity": 1, "chance": 0.00021, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.009, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ForestTree", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Forest Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 8,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 20,
                    "ExpType": 3,
                    "Defence": 600,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC7", "quantity": 1, "chance": 0.00017, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.0095, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("PalmTree", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Palm Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 2,
                    "RespawnTime": 0,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 32,
                    "ExpType": 3,
                    "Defence": 1250,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD7", "quantity": 1, "chance": 0.00011, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable11", "quantity": 2, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ToiletTree", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Toilet Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 3,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 50,
                    "ExpType": 3,
                    "Defence": 3500,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD5", "quantity": 1, "chance": 0.00012, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.0106, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("StumpTree", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Stump Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 4,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 90,
                    "ExpType": 3,
                    "Defence": 10000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD6", "quantity": 1, "chance": 0.00013, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.0102, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("SaharanFoal", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Saharan Foal",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 3,
                    "RespawnTime": 0,
                    "DeathFrame": 0,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 150,
                    "ExpType": 3,
                    "Defence": 16000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD8", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable17", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Tree7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Wispy Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 3,
                    "RespawnTime": 0,
                    "DeathFrame": 9,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 275,
                    "ExpType": 3,
                    "Defence": 30000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF2", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable17", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("AlienTree", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Alien Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 4,
                    "RespawnTime": 0,
                    "DeathFrame": 6,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 500,
                    "ExpType": 3,
                    "Defence": 70000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF13", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable22", "quantity": 2, "chance": 0.00815, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Tree8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Cubed Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 4,
                    "RespawnTime": 0,
                    "DeathFrame": 10,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 1250,
                    "ExpType": 3,
                    "Defence": 150000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF12", "quantity": 1, "chance": 4e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable22", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Tree9", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Maple Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 5,
                    "RespawnTime": 0,
                    "DeathFrame": 11,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 2500,
                    "ExpType": 3,
                    "Defence": 600000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF24", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Leaf5", "quantity": 1, "chance": 0.0049, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Tree10", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dandelioli Tree",
                    "AFKtype": AFKTypeEnum.Choppin,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 0,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 5,
                    "RespawnTime": 0,
                    "DeathFrame": 12,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.treeType,
                    "SpecialType": "",
                    "ExpGiven": 6600,
                    "ExpType": 3,
                    "Defence": 2500000,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF25", "quantity": 1, "chance": 5e-06, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable28", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("FishSmall", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Small Fish",
                    "AFKtype": AFKTypeEnum.Fishing,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 2,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "",
                    "ExpGiven": 6,
                    "ExpType": 4,
                    "Defence": 40,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "FishSmall",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zFishingA", "name": "Salty Shores", "id": 54},
                    "portalRequirements": [15]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("FishMed", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Medium Fish",
                    "AFKtype": AFKTypeEnum.Fishing,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 2,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "",
                    "ExpGiven": 50,
                    "ExpType": 4,
                    "Defence": 20000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "FishMed",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zFishingC", "name": "Deepwater Docks", "id": 61},
                    "portalRequirements": [30]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Fish1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Goldfish",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 0,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Fish2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Hermit Can",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Fish3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Jellyfish",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 2,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Fish4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bloach",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 3,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Fish5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Skelefish",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 4,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Fish6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Shark",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 5,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Fish7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Manta Ray",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 6,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Fish8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Kraken",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 4,
                    "MonsterOffsetX": 42,
                    "MonsterOffsetY": 28,
                    "HeightOfMonster": 48,
                    "MonsterMoving": 1,
                    "MovingFrame": 4,
                    "RespawnTime": 86400,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 750000,
                    "Type": EnemyTypeEnum.fishType,
                    "SpecialType": "a",
                    "ExpGiven": 12000,
                    "ExpType": 0,
                    "Defence": 600,
                    "MoveSPEED": 3,
                    "Damages": [1000, 1],
                    "DefFor0": 1223.26
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Fly Nest",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 51,
                    "RespawnTime": 86400,
                    "DeathFrame": 0,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Butterfly Bar",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 67,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sentient Bowl",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 59,
                    "RespawnTime": 86400,
                    "DeathFrame": 2,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Grocery Bag",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 63,
                    "RespawnTime": 86400,
                    "DeathFrame": 3,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Snowden",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 106,
                    "RespawnTime": 86400,
                    "DeathFrame": 4,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Icicle Nest",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 112,
                    "RespawnTime": 86400,
                    "DeathFrame": 5,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bee Hive",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 157,
                    "RespawnTime": 86400,
                    "DeathFrame": 6,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Fairy Hovel",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 112,
                    "RespawnTime": 86400,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest9", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Scarab Nest",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 205,
                    "RespawnTime": 86400,
                    "DeathFrame": 8,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("BugNest10", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mote Hovel",
                    "AFKtype": AFKTypeEnum.Fighting,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 30,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 207,
                    "RespawnTime": 86400,
                    "DeathFrame": 9,
                    "MonsterHPTotal": 999999999,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Flies",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 0,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 2,
                    "ExpType": 6,
                    "Defence": 40,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC11", "quantity": 1, "chance": 0.00042, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable12", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Butterflies",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 6,
                    "ExpType": 6,
                    "Defence": 400,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsC12", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ButterBar", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable12", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": <MapDataModel>{
                    "enemy": "Bug2",
                    "world": "Yum-Yum Desert",
                    "map": <MapNameModel>{"intName": "zDesertCavernA", "name": "Bandit Bob's Hideout", "id": 67},
                    "portalRequirements": [0]
                },
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sentient Cereal",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 2,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 10,
                    "ExpType": 6,
                    "Defence": 2000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD10", "quantity": 1, "chance": 0.00028, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable12", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Fruitflies",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 3,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 20,
                    "ExpType": 6,
                    "Defence": 6000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable12", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Mosquisnow",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 4,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 40,
                    "ExpType": 6,
                    "Defence": 15000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF8", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable18", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Flycicle",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 5,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 75,
                    "ExpType": 6,
                    "Defence": 35000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF9", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable18", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Bumble Bee",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 6,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 150,
                    "ExpType": 6,
                    "Defence": 100000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF14", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable23", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Fairy",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 7,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 300,
                    "ExpType": 6,
                    "Defence": 250000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF15", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable23", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug9", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Scarab",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 8,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 550,
                    "ExpType": 6,
                    "Defence": 500000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF26", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Bug10", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dust Mote",
                    "AFKtype": AFKTypeEnum.Catching,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 32,
                    "MonsterOffsetY": 50,
                    "HeightOfMonster": 100,
                    "MonsterMoving": 0,
                    "MovingFrame": 1,
                    "RespawnTime": 0,
                    "DeathFrame": 9,
                    "MonsterHPTotal": 5,
                    "Type": EnemyTypeEnum.bugType,
                    "SpecialType": "",
                    "ExpGiven": 1750,
                    "ExpType": 6,
                    "Defence": 2000000,
                    "MoveSPEED": 0,
                    "Damages": [6, 1],
                    "DefFor0": 2.67
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                        <CardDropModel>{"item": "CardsF27", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestA1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dewdrop Bronze Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 18000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 100, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW1", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA1", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                        <ItemDropModel>{"item": "OakTree", "quantity": 40, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Copper", "quantity": 30, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "CopperBar", "quantity": 20, "chance": 0.2, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key1", "quantity": 1, "chance": 0.04, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestB1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dewdrop Silver Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 36000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 400, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats17", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW2", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA2", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodG4", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Iron", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "CopperBar", "quantity": 50, "chance": 0.35, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key1", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "JungleTree", "quantity": 15, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "BirchTree", "quantity": 25, "chance": 0.1, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestC1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dewdrop Golden Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1250, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodG1", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "IronBar", "quantity": 15, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Gold", "quantity": 20, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "ToiletTree", "quantity": 50, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key1", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StumpTree", "quantity": 50, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentShirts12", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestD1", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Dewdrop Legendary Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 345600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 1, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestA2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sandstone Bronze Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 18000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 1000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW2", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA2", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Fish1", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Fish2", "quantity": 50, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Bug1", "quantity": 65, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Gold", "quantity": 75, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key2", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GoldBar", "quantity": 20, "chance": 0.2, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestB2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sandstone Silver Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 36000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats18", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW3", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA3", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Fish3", "quantity": 100, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Bug3", "quantity": 125, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key2", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodG2", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Plat", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GoldBar", "quantity": 60, "chance": 0.35, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PalmTree", "quantity": 100, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestC2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sandstone Golden Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 10000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodG3", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PlatBar", "quantity": 20, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Dementia", "quantity": 80, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Fish4", "quantity": 150, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Bug4", "quantity": 169, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPants4", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key2", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestD2", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Sandstone Legendary Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 345600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 1, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestA3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chillsnap Bronze Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 18000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 10000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW3", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SnowA2a", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA3", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul1", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter1", "quantity": 65, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PlatBar", "quantity": 60, "chance": 0.35, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key3", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PlatBar", "quantity": 20, "chance": 0.2, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestB3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chillsnap Silver Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 36000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 40000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.23, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentHats28", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW3", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA3", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter2", "quantity": 350, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Bug5", "quantity": 150, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key3", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodG5", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Dementia", "quantity": 100, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "SaharanFoal", "quantity": 100, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestC3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chillsnap Golden Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 100000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.45, "questLink": "N/A"},
                        <ItemDropModel>{"item": "DementiaBar", "quantity": 80, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul2", "quantity": 400, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Void", "quantity": 120, "chance": 0.1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Bug6", "quantity": 150, "chance": 0.2, "questLink": "N/A"},
                        <ItemDropModel>{"item": "EquipmentPants5", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key3", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodG6", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestD3", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Chillsnap Legendary Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 345600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 1, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestA4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Astro Bronze Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 18000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 8000000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW4", "quantity": 1, "chance": 0.015, "questLink": "N/A"},
                        <ItemDropModel>{"item": "GalaxyA2b", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA4", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Soul1", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter6", "quantity": 200, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "VoidBar", "quantity": 100, "chance": 0.35, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 0.006, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestB4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Astro Silver Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 36000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 30000000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.23, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneW4", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "StoneA4", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Critter8", "quantity": 600, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Bug7", "quantity": 1500, "chance": 0.4, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 0.012, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodG7", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Lustre", "quantity": 1000, "chance": 0.6, "questLink": "N/A"},
                        <ItemDropModel>{"item": "AlienTree", "quantity": 750, "chance": 0.5, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestC4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Astro Golden Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [
                        <CoinDropModel>{"item": "COIN", "quantity": 60000000, "chance": 1, "questLink": "N/A"},
                        <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.45, "questLink": "N/A"},
                        <ItemDropModel>{"item": "LustreBar", "quantity": 150, "chance": 0.05, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Starfire", "quantity": 2000, "chance": 0.03, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Bug8", "quantity": 1500, "chance": 0.02, "questLink": "N/A"},
                        <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                        <ItemDropModel>{"item": "FoodG7", "quantity": 2, "chance": 0.025, "questLink": "N/A"},
                        <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 1, "questLink": "N/A"}
                    ]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestD4", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "Astro Legendary Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 345600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": <EnemyTableModel>{
                    "drops": [<CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 1, "questLink": "N/A"}]
                },
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestA5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Bronze Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 18000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestB5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Silver Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 36000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestC5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Golden Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestD5", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Legendary Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 345600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestA6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Bronze Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 18000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestB6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Silver Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 36000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestC6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Golden Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestD6", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Legendary Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 345600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestA7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Bronze Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 18000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestB7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Silver Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 36000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestC7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Golden Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestD7", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Legendary Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 345600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestA8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Bronze Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 18000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 10,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestB8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Silver Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 36000,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 500,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestC8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Golden Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 86400,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 20000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("ChestD8", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "NYI Legendary Chest",
                    "AFKtype": AFKTypeEnum.Error,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 34,
                    "MonsterOffsetY": 25,
                    "HeightOfMonster": 40,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 345600,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 100000,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 0,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 1],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": undefined,
                "navigation": undefined,
                "bossData": undefined
            }),
        new EnemyBase("Nothing", <EnemyModel>{
                "details": <EnemyDetailsModel>{
                    "Name": "",
                    "AFKtype": AFKTypeEnum.Nothing,
                    "MonsterFace": 0,
                    "MonsterOffsetX": 22,
                    "MonsterOffsetY": 32,
                    "HeightOfMonster": 180,
                    "MonsterMoving": 0,
                    "MovingFrame": 0,
                    "RespawnTime": 1,
                    "DeathFrame": 1,
                    "MonsterHPTotal": 42,
                    "Type": EnemyTypeEnum.monsterType,
                    "SpecialType": "",
                    "ExpGiven": 69,
                    "ExpType": 0,
                    "Defence": 1,
                    "MoveSPEED": 0,
                    "Damages": [0, 0],
                    "DefFor0": 0.22
                },
                "drops": undefined,
                "mapData": <MapDataModel>{
                    "enemy": "Nothing",
                    "world": "Blunder Hills",
                    "map": <MapNameModel>{"intName": "GrasslandaTown", "name": "Blunder Hills", "id": 0},
                    "portalRequirements": [1, 0]
                },
                "navigation": undefined,
                "bossData": undefined
            })    
]
}
