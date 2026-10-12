import { JellyFeverModel } from '../model/jellyFeverModel';

export class JellyFeverBase { constructor(public index: number, public data: JellyFeverModel) { } }



export const initJellyFeverRepo = () => {
    return [    
        new JellyFeverBase(0, <JellyFeverModel>{"index": 0, "name": "COLD", "description": "{1.01x DMG every second"}),
        new JellyFeverBase(1, <JellyFeverModel>{"index": 1, "name": "RASH", "description": "2.00x DMG"}),
        new JellyFeverBase(2, <JellyFeverModel>{"index": 2, "name": "SEPSIS", "description": "2.00x all Bloodcell gains"}),
        new JellyFeverBase(3, <JellyFeverModel>{"index": 3, "name": "NAUSEA", "description": "2.00x EXP gains for all Cells"}),
        new JellyFeverBase(4, <JellyFeverModel>{"index": 4, "name": "RABIES", "description": "1.50x DMG and 1.25x SPD"}),
        new JellyFeverBase(5, <JellyFeverModel>{"index": 5, "name": "PLAGUE", "description": "1.40x SPD"})    
]
}
