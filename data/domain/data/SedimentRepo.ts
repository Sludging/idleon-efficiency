import { SedimentModel } from '../model/sedimentModel';

export class SedimentBase { constructor(public index: number, public data: SedimentModel) { } }



export const initSedimentRepo = () => {
    return [    
        new SedimentBase(0, <SedimentModel>{"index": 0, "name": "Gravel", "unlockRequirement": "0"}),
        new SedimentBase(1, <SedimentModel>{"index": 1, "name": "Goldust", "unlockRequirement": "50"}),
        new SedimentBase(2, <SedimentModel>{"index": 2, "name": "Redstone", "unlockRequirement": "500"}),
        new SedimentBase(3, <SedimentModel>{"index": 3, "name": "Mythril", "unlockRequirement": "9000"}),
        new SedimentBase(4, <SedimentModel>{"index": 4, "name": "Cobaltine", "unlockRequirement": "125000"}),
        new SedimentBase(5, <SedimentModel>{"index": 5, "name": "Bruntine", "unlockRequirement": "1500000"}),
        new SedimentBase(6, <SedimentModel>{"index": 6, "name": "Freezium", "unlockRequirement": "20000000"}),
        new SedimentBase(7, <SedimentModel>{"index": 7, "name": "Sweetium", "unlockRequirement": "100000000"}),
        new SedimentBase(8, <SedimentModel>{"index": 8, "name": "Rad Coral", "unlockRequirement": "500000000"}),
        new SedimentBase(9, <SedimentModel>{"index": 9, "name": "Hyper Coral", "unlockRequirement": "2000000000.0"})    
]
}
