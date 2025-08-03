import { BellActionModel } from '../model/bellActionModel';

export class BellActionBase { constructor(public index: number, public data: BellActionModel) { } }



export const initBellActionRepo = () => {
    return [    
        new BellActionBase(0, <BellActionModel>{
                "index": 0,
                "actionType": "Ring",
                "description": "Ring the bell to get +1 LV of a random bonus"
            }),
        new BellActionBase(1, <BellActionModel>{
                "index": 1,
                "actionType": "Ping",
                "description": "Ping the bell to find an Opal instantly"
            }),
        new BellActionBase(2, <BellActionModel>{
                "index": 2,
                "actionType": "Clean",
                "description": "Clean the bell for a % chance to unlock a new improvement method"
            }),
        new BellActionBase(3, <BellActionModel>{
                "index": 3,
                "actionType": "Renew",
                "description": "Renew the bell to reset all bonuses but keep improvement methods and opals"
            })    
]
}
