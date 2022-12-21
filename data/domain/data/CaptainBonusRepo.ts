import { CaptainBonusModel } from '../model/captainBonusModel';

export class CaptainBonusBase { constructor(public index: number, public data: CaptainBonusModel) { } }



export const initCaptainBonusRepo = () => {
    return [    
        new CaptainBonusBase(0, <CaptainBonusModel>{"min": 10, "max": 60, "filler": 0, "bonus": "+{% Boat Speed"}),
        new CaptainBonusBase(1, <CaptainBonusModel>{"min": 30, "max": 100, "filler": 0, "bonus": "+{% Loot Value"}),
        new CaptainBonusBase(2, <CaptainBonusModel>{"min": 30, "max": 100, "filler": 0, "bonus": "+{% Cloud Discover Rate"}),
        new CaptainBonusBase(3, <CaptainBonusModel>{"min": 10, "max": 50, "filler": 0, "bonus": "+{% Artifact Find Chance"}),
        new CaptainBonusBase(4, <CaptainBonusModel>{"min": 10, "max": 40, "filler": 0, "bonus": "+{% Rare Chest Chance"})    
]
}
