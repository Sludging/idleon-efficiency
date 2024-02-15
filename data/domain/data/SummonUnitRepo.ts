import { SummonUnitModel } from '../model/summonUnitModel';

export class SummonUnitBase { constructor(public index: number, public data: SummonUnitModel) { } }



export const initSummonUnitRepo = () => {
    return [    
        new SummonUnitBase(0, <SummonUnitModel>{
                "x1": 23,
                "x2": 7,
                "x3": 17,
                "x4": 4,
                "x5": 1,
                "x6": 8,
                "x7": 5,
                "x8": 1,
                "x9": 1
            }),
        new SummonUnitBase(1, <SummonUnitModel>{
                "x1": 41,
                "x2": 5.3,
                "x3": 16,
                "x4": 0,
                "x5": 1,
                "x6": 3,
                "x7": 15,
                "x8": 2,
                "x9": 4
            }),
        new SummonUnitBase(2, <SummonUnitModel>{
                "x1": 38,
                "x2": 2.5,
                "x3": 22,
                "x4": 2,
                "x5": 1,
                "x6": 2,
                "x7": 30,
                "x8": 3,
                "x9": 2
            }),
        new SummonUnitBase(3, <SummonUnitModel>{
                "x1": 36,
                "x2": 3,
                "x3": 18,
                "x4": 3,
                "x5": 1,
                "x6": 2,
                "x7": 12,
                "x8": 1,
                "x9": 0
            }),
        new SummonUnitBase(4, <SummonUnitModel>{
                "x1": 36,
                "x2": 11,
                "x3": 18,
                "x4": 1,
                "x5": 1,
                "x6": 3,
                "x7": 8,
                "x8": 1,
                "x9": 2
            }),
        new SummonUnitBase(5, <SummonUnitModel>{
                "x1": 55,
                "x2": 5,
                "x3": 28,
                "x4": 4,
                "x5": 1,
                "x6": 3,
                "x7": 15,
                "x8": 8,
                "x9": 0.75
            })    
]
}
