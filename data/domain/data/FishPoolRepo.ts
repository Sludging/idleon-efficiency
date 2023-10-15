import { FishPoolModel } from '../model/fishPoolModel';
import { PoolTypeEnum } from '../enum/poolTypeEnum';

export class FishPoolBase { constructor(public index: number, public data: FishPoolModel) { } }



export const initFishPoolRepo = () => {
    return [    
        new FishPoolBase(0, <FishPoolModel>{
                "fish": "Fish1",
                "expGiven": 4,
                "damageDelt": 25,
                "efficiency": 0,
                "cardDrop": "CardsC8",
                "cardChance": 0.002,
                "pool": PoolTypeEnum.FishSmall
            }),
        new FishPoolBase(1, <FishPoolModel>{
                "fish": "Fish2",
                "expGiven": 7,
                "damageDelt": 70,
                "efficiency": 50,
                "cardDrop": "CardsC9",
                "cardChance": 0.0018,
                "pool": PoolTypeEnum.FishSmall
            }),
        new FishPoolBase(2, <FishPoolModel>{
                "fish": "Fish3",
                "expGiven": 12,
                "damageDelt": 120,
                "efficiency": 200,
                "cardDrop": "CardsC10",
                "cardChance": 0.0016,
                "pool": PoolTypeEnum.FishSmall
            }),
        new FishPoolBase(3, <FishPoolModel>{
                "fish": "Fish4",
                "expGiven": 21,
                "damageDelt": 200,
                "efficiency": 400,
                "cardDrop": "CardsD11",
                "cardChance": 0.0014,
                "pool": PoolTypeEnum.FishSmall
            }),
        new FishPoolBase(4, <FishPoolModel>{
                "fish": "Fish5",
                "expGiven": 35,
                "damageDelt": 300,
                "efficiency": 0,
                "cardDrop": "CardsF20",
                "cardChance": 0.001,
                "pool": PoolTypeEnum.FishMed
            }),
        new FishPoolBase(5, <FishPoolModel>{
                "fish": "Fish6",
                "expGiven": 60,
                "damageDelt": 750,
                "efficiency": 10000,
                "cardDrop": "CardsF21",
                "cardChance": 0.0004,
                "pool": PoolTypeEnum.FishMed
            }),
        new FishPoolBase(6, <FishPoolModel>{
                "fish": "Fish7",
                "expGiven": 92,
                "damageDelt": 1500,
                "efficiency": 50000,
                "cardDrop": "CardsF22",
                "cardChance": 0.0001,
                "pool": PoolTypeEnum.FishMed
            }),
        new FishPoolBase(7, <FishPoolModel>{
                "fish": "Fish8",
                "expGiven": 150,
                "damageDelt": 4000,
                "efficiency": 200000,
                "cardDrop": "CardsF23",
                "cardChance": 2.5e-05,
                "pool": PoolTypeEnum.FishMed
            }),
        new FishPoolBase(8, <FishPoolModel>{
                "fish": "Fish9",
                "expGiven": 450,
                "damageDelt": 5000,
                "efficiency": 0,
                "cardDrop": "CardsF30",
                "cardChance": 0.001,
                "pool": PoolTypeEnum.FishBig
            }),
        new FishPoolBase(9, <FishPoolModel>{
                "fish": "Fish10",
                "expGiven": 1600,
                "damageDelt": 6000,
                "efficiency": 1000000,
                "cardDrop": "CardsF31",
                "cardChance": 0.0004,
                "pool": PoolTypeEnum.FishBig
            }),
        new FishPoolBase(10, <FishPoolModel>{
                "fish": "Fish11",
                "expGiven": 3500,
                "damageDelt": 8000,
                "efficiency": 5000000,
                "cardDrop": "CardsF32",
                "cardChance": 0.0001,
                "pool": PoolTypeEnum.FishBig
            }),
        new FishPoolBase(11, <FishPoolModel>{
                "fish": "Fish12",
                "expGiven": 30000,
                "damageDelt": 10000,
                "efficiency": 30000000,
                "cardDrop": "CardsF33",
                "cardChance": 2.5e-05,
                "pool": PoolTypeEnum.FishBig
            }),
        new FishPoolBase(12, <FishPoolModel>{
                "fish": "Fish13",
                "expGiven": 2000,
                "damageDelt": 1,
                "efficiency": 0,
                "cardDrop": "CardsC8",
                "cardChance": 1e-08,
                "pool": PoolTypeEnum.FishEquinox
            }),
        new FishPoolBase(13, <FishPoolModel>{
                "fish": "Fish13",
                "expGiven": 2000,
                "damageDelt": 1,
                "efficiency": 400000,
                "cardDrop": "CardsC8",
                "cardChance": 1e-08,
                "pool": PoolTypeEnum.FishEquinox
            }),
        new FishPoolBase(14, <FishPoolModel>{
                "fish": "Fish13",
                "expGiven": 2000,
                "damageDelt": 1,
                "efficiency": 2000000,
                "cardDrop": "CardsC8",
                "cardChance": 1e-08,
                "pool": PoolTypeEnum.FishEquinox
            }),
        new FishPoolBase(15, <FishPoolModel>{
                "fish": "Fish13",
                "expGiven": 2000,
                "damageDelt": 1,
                "efficiency": 12000000,
                "cardDrop": "CardsC8",
                "cardChance": 1e-08,
                "pool": PoolTypeEnum.FishEquinox
            })    
]
}
