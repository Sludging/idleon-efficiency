import { RandoIslandRewardModel } from '../model/randoIslandRewardModel';

export class RandoIslandRewardBase { constructor(public index: number, public data: RandoIslandRewardModel) { } }



export const initRandoIslandRewardRepo = () => {
    return [    
        new RandoIslandRewardBase(0, <RandoIslandRewardModel>{
                "index": 0,
                "initialBaseCost": 25,
                "initialCostGrowth": 1.8,
                "refreshedBaseCost": 10,
                "refreshedCostGrowth": 1.5,
                "itemId": undefined,
                "bookPayload": undefined
            }),
        new RandoIslandRewardBase(1, <RandoIslandRewardModel>{
                "index": 1,
                "initialBaseCost": 10,
                "initialCostGrowth": 1.6,
                "refreshedBaseCost": 6,
                "refreshedCostGrowth": 1.4,
                "itemId": undefined,
                "bookPayload": undefined
            }),
        new RandoIslandRewardBase(2, <RandoIslandRewardModel>{
                "index": 2,
                "initialBaseCost": 200,
                "initialCostGrowth": undefined,
                "refreshedBaseCost": 200,
                "refreshedCostGrowth": undefined,
                "itemId": "TalentBook1",
                "bookPayload": 3650200
            })    
]
}
