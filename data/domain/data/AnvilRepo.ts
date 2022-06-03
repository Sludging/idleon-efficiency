import { AnvilProduceModel } from '../model/anvilProduceModel';

export class AnvilProduceBase { constructor(public index: number, public data: AnvilProduceModel) { } }



export const initAnvilRepo = () => {
    return [    
        new AnvilProduceBase(0, <AnvilProduceModel>{"item": "CraftMat1", "no": 1, "time": 100, "levelReq": 1, "exp": 6}),
        new AnvilProduceBase(1, <AnvilProduceModel>{"item": "CraftMat5", "no": 2, "time": 200, "levelReq": 5, "exp": 10}),
        new AnvilProduceBase(2, <AnvilProduceModel>{"item": "CraftMat6", "no": 3, "time": 350, "levelReq": 12, "exp": 16}),
        new AnvilProduceBase(3, <AnvilProduceModel>{"item": "CraftMat7", "no": 4, "time": 700, "levelReq": 17, "exp": 25}),
        new AnvilProduceBase(4, <AnvilProduceModel>{"item": "CraftMat9", "no": 5, "time": 1200, "levelReq": 25, "exp": 35}),
        new AnvilProduceBase(5, <AnvilProduceModel>{"item": "CraftMat8", "no": 6, "time": 2000, "levelReq": 30, "exp": 50}),
        new AnvilProduceBase(6, <AnvilProduceModel>{"item": "CraftMat10", "no": 7, "time": 3000, "levelReq": 35, "exp": 65}),
        new AnvilProduceBase(7, <AnvilProduceModel>{"item": "CraftMat11", "no": 8, "time": 4000, "levelReq": 43, "exp": 75}),
        new AnvilProduceBase(8, <AnvilProduceModel>{"item": "CraftMat12", "no": 9, "time": 6000, "levelReq": 50, "exp": 90}),
        new AnvilProduceBase(9, <AnvilProduceModel>{"item": "CraftMat13", "no": 10, "time": 8500, "levelReq": 60, "exp": 110}),
        new AnvilProduceBase(10, <AnvilProduceModel>{"item": "CraftMat14", "no": 11, "time": 12000, "levelReq": 70, "exp": 140}),
        new AnvilProduceBase(11, <AnvilProduceModel>{"item": "CraftMat15", "no": 12, "time": 120000, "levelReq": 999, "exp": 1000}),
        new AnvilProduceBase(12, <AnvilProduceModel>{"item": "CraftMat16", "no": 13, "time": 160000, "levelReq": 999, "exp": 1300}),
        new AnvilProduceBase(13, <AnvilProduceModel>{"item": "CraftMat17", "no": 14, "time": 250000, "levelReq": 999, "exp": 2000})    
]
}
