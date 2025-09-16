import { BellBonusModel } from '../model/bellBonusModel';

export class BellBonusBase { constructor(public index: number, public data: BellBonusModel) { } }



export const initBellBonusRepo = () => {
    return [    
        new BellBonusBase(0, <BellBonusModel>{"index": 0, "description": "+{% BUCKET FILL RATE", "value": "10"}),
        new BellBonusBase(1, <BellBonusModel>{"index": 1, "description": "+{% ALL VILLAGER EXP", "value": "0.5"}),
        new BellBonusBase(2, <BellBonusModel>{"index": 2, "description": "+{% HARP NOTE GAINS", "value": "10"}),
        new BellBonusBase(3, <BellBonusModel>{"index": 3, "description": "+{% DAILY LAMP WISHES", "value": "0.3"}),
        new BellBonusBase(4, <BellBonusModel>{"index": 4, "description": "+{% EXTRA RUPIE CHANCE", "value": "0.5"}),
        new BellBonusBase(5, <BellBonusModel>{"index": 5, "description": "+{% DOUBLE TORCH CHANCE", "value": "2.0"})    
]
}
