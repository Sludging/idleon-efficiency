import { SeedInfoModel } from '../model/seedInfoModel';

export class SeedInfoBase { constructor(public index: number, public data: SeedInfoModel) { } }



export const initSeedInfoRepo = () => {
    return [    
        new SeedInfoBase(0, <SeedInfoModel>{
                "name": "BASIC",
                "seedId": 0,
                "x1": 0,
                "x2": 20,
                "x3": 1,
                "x5": 0.3,
                "x6": 0.75
            }),
        new SeedInfoBase(1, <SeedInfoModel>{
                "name": "EARTHY",
                "seedId": 1,
                "x1": 21,
                "x2": 45,
                "x3": 10,
                "x5": 0.12,
                "x6": 0.63
            }),
        new SeedInfoBase(2, <SeedInfoModel>{
                "name": "BULBO",
                "seedId": 2,
                "x1": 46,
                "x2": 60,
                "x3": 25,
                "x5": 0.04,
                "x6": 0.3
            }),
        new SeedInfoBase(3, <SeedInfoModel>{
                "name": "SUSHI",
                "seedId": 3,
                "x1": 61,
                "x2": 83,
                "x3": 50,
                "x5": 0.01,
                "x6": 0.4
            }),
        new SeedInfoBase(4, <SeedInfoModel>{
                "name": "MUSHIE",
                "seedId": 4,
                "x1": 84,
                "x2": 106,
                "x3": 80,
                "x5": 0.003,
                "x6": 0.2
            }),
        new SeedInfoBase(5, <SeedInfoModel>{
                "name": "GLASSY",
                "seedId": 5,
                "x1": 107,
                "x2": 119,
                "x3": 120,
                "x5": 0.0005,
                "x6": 0.05
            })    
]
}
