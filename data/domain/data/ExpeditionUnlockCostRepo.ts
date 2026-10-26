import { ExpeditionUnlockCostModel } from '../model/expeditionUnlockCostModel';

export class ExpeditionUnlockCostBase { constructor(public index: number, public data: ExpeditionUnlockCostModel) { } }



export const initExpeditionUnlockCostRepo = () => {
    return [    
        new ExpeditionUnlockCostBase(0, <ExpeditionUnlockCostModel>{"ownedCount": 0, "additionalCost": 0}),
        new ExpeditionUnlockCostBase(1, <ExpeditionUnlockCostModel>{"ownedCount": 1, "additionalCost": 15}),
        new ExpeditionUnlockCostBase(2, <ExpeditionUnlockCostModel>{"ownedCount": 2, "additionalCost": 45}),
        new ExpeditionUnlockCostBase(3, <ExpeditionUnlockCostModel>{"ownedCount": 3, "additionalCost": 100}),
        new ExpeditionUnlockCostBase(4, <ExpeditionUnlockCostModel>{"ownedCount": 4, "additionalCost": 200}),
        new ExpeditionUnlockCostBase(5, <ExpeditionUnlockCostModel>{"ownedCount": 5, "additionalCost": 500})    
]
}
