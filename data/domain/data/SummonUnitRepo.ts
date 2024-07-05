import { SummonUnitModel } from '../model/summonUnitModel';

export class SummonUnitBase { constructor(public index: number, public data: SummonUnitModel) { } }



export const initSummonUnitRepo = () => {
    return [    
        new SummonUnitBase(0, <SummonUnitModel>{
                "height": 23,
                "speed": 7,
                "colRadius": 17,
                "qtyText": 4,
                "minQty": 1,
                "maxQty": 8,
                "baseCost": 5,
                "baseHp": 1,
                "baseDamage": 1
            }),
        new SummonUnitBase(1, <SummonUnitModel>{
                "height": 41,
                "speed": 8,
                "colRadius": 16,
                "qtyText": 0,
                "minQty": 1,
                "maxQty": 3,
                "baseCost": 10,
                "baseHp": 1,
                "baseDamage": 3
            }),
        new SummonUnitBase(2, <SummonUnitModel>{
                "height": 38,
                "speed": 1.5,
                "colRadius": 22,
                "qtyText": 2,
                "minQty": 1,
                "maxQty": 2,
                "baseCost": 30,
                "baseHp": 3,
                "baseDamage": 2
            }),
        new SummonUnitBase(3, <SummonUnitModel>{
                "height": 36,
                "speed": 3,
                "colRadius": 18,
                "qtyText": 3,
                "minQty": 1,
                "maxQty": 2,
                "baseCost": 12,
                "baseHp": 1,
                "baseDamage": 0
            }),
        new SummonUnitBase(4, <SummonUnitModel>{
                "height": 36,
                "speed": 11,
                "colRadius": 18,
                "qtyText": 1,
                "minQty": 1,
                "maxQty": 3,
                "baseCost": 8,
                "baseHp": 1,
                "baseDamage": 2
            }),
        new SummonUnitBase(5, <SummonUnitModel>{
                "height": 55,
                "speed": 5,
                "colRadius": 28,
                "qtyText": 4,
                "minQty": 1,
                "maxQty": 3,
                "baseCost": 15,
                "baseHp": 8,
                "baseDamage": 0.75
            })    
]
}
