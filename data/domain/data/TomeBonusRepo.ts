import { TomeBonusModel } from '../model/tomeBonusModel';

export class TomeBonusBase { constructor(public index: number, public data: TomeBonusModel) { } }



export const initTomeBonusRepo = () => {
    return [    
        new TomeBonusBase(0, <TomeBonusModel>{"index": 0, "description": "+{% DMG"}),
        new TomeBonusBase(1, <TomeBonusModel>{"index": 1, "description": "+{% Skill Eff"}),
        new TomeBonusBase(2, <TomeBonusModel>{"index": 2, "description": "+{% Drop Rate"}),
        new TomeBonusBase(3, <TomeBonusModel>{"index": 3, "description": "+{% STR"}),
        new TomeBonusBase(4, <TomeBonusModel>{"index": 4, "description": "+{% AGI"}),
        new TomeBonusBase(5, <TomeBonusModel>{"index": 5, "description": "+{% WIS"})    
]
}
