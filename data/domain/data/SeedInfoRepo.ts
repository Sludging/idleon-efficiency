import { SeedInfoModel } from '../model/seedInfoModel';

export class SeedInfoBase { constructor(public index: number, public data: SeedInfoModel) { } }



export const initSeedInfoRepo = () => {
    return [    
        new SeedInfoBase(0, <SeedInfoModel>{
                "name": "BASIC",
                "seedId": 0,
                "cropIdMin": 0,
                "cropIdMax": 20,
                "lvlReq": 1,
                "nextCropChance": 0.3,
                "nextCropDecay": 0.75
            }),
        new SeedInfoBase(1, <SeedInfoModel>{
                "name": "EARTHY",
                "seedId": 1,
                "cropIdMin": 21,
                "cropIdMax": 45,
                "lvlReq": 10,
                "nextCropChance": 0.12,
                "nextCropDecay": 0.63
            }),
        new SeedInfoBase(2, <SeedInfoModel>{
                "name": "BULBO",
                "seedId": 2,
                "cropIdMin": 46,
                "cropIdMax": 60,
                "lvlReq": 25,
                "nextCropChance": 0.04,
                "nextCropDecay": 0.3
            }),
        new SeedInfoBase(3, <SeedInfoModel>{
                "name": "SUSHI",
                "seedId": 3,
                "cropIdMin": 61,
                "cropIdMax": 83,
                "lvlReq": 50,
                "nextCropChance": 0.01,
                "nextCropDecay": 0.4
            }),
        new SeedInfoBase(4, <SeedInfoModel>{
                "name": "MUSHIE",
                "seedId": 4,
                "cropIdMin": 84,
                "cropIdMax": 106,
                "lvlReq": 80,
                "nextCropChance": 0.003,
                "nextCropDecay": 0.2
            }),
        new SeedInfoBase(5, <SeedInfoModel>{
                "name": "GLASSY",
                "seedId": 5,
                "cropIdMin": 107,
                "cropIdMax": 159,
                "lvlReq": 120,
                "nextCropChance": 0.0005,
                "nextCropDecay": 0.05
            })    
]
}
