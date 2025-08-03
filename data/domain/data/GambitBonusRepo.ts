import { GambitBonusModel } from '../model/gambitBonusModel';

export class GambitBonusBase { constructor(public index: number, public data: GambitBonusModel) { } }



export const initGambitBonusRepo = () => {
    return [    
        new GambitBonusBase(0, <GambitBonusModel>{
                "index": 0,
                "x0": 1,
                "x1": 1,
                "description": "Press the star button in a summoning upgrade to DOUBLE it! Get more Gambit Points to get more doublers! You have $ left, and can reset them at The Lamp",
                "name": "{ Summoning Doublers"
            }),
        new GambitBonusBase(1, <GambitBonusModel>{
                "index": 1,
                "x0": 1,
                "x1": 1,
                "description": "You know how POW 10 works! You'll get an opal at 10 total score, then 100, then 1000, then 10000, etc...",
                "name": "1 Opal per POW 10 Points"
            }),
        new GambitBonusBase(2, <GambitBonusModel>{
                "index": 2,
                "x0": 20,
                "x1": 0,
                "description": "For example, having a party of 4 people would give 1.80x Flurbo Gain bonus",
                "name": "+{% Flurbos per party member"
            }),
        new GambitBonusBase(3, <GambitBonusModel>{
                "index": 3,
                "x0": 25,
                "x1": 1,
                "description": "This bonus INCREASES the more Gambit Points you have!",
                "name": "+{% Resources from Caverns"
            }),
        new GambitBonusBase(4, <GambitBonusModel>{
                "index": 4,
                "x0": 20,
                "x1": 0,
                "description": "no",
                "name": "+{% Upgrade Stone Success"
            }),
        new GambitBonusBase(5, <GambitBonusModel>{
                "index": 5,
                "x0": 25,
                "x1": 1,
                "description": "This bonus INCREASES the more Gambit Points you have!",
                "name": "} Essence Gain"
            }),
        new GambitBonusBase(6, <GambitBonusModel>{
                "index": 6,
                "x0": 35,
                "x1": 0,
                "description": "For example, if you combined two T8 ribbons, theres a 35% chance for a T10 instead of T9.",
                "name": "{% chance for 2 ribbon combine"
            }),
        new GambitBonusBase(7, <GambitBonusModel>{
                "index": 7,
                "x0": 10,
                "x1": 1,
                "description": "This bonus INCREASES the more Gambit Points you have!",
                "name": "} Coins from monsters"
            }),
        new GambitBonusBase(8, <GambitBonusModel>{
                "index": 8,
                "x0": 100,
                "x1": 1,
                "description": "This includes Owl Feathers and Roo Fish. Also, this bonus INCREASES the more Gambit Points you have!",
                "name": "} gains from clickers"
            }),
        new GambitBonusBase(9, <GambitBonusModel>{
                "index": 9,
                "x0": 1,
                "x1": 0,
                "description": "Trim Slot means the gold Trimmed Construction slot, and Wiz means Wizard Towers in Construction.",
                "name": "+1 Trim Slot and +100 Wiz Max LV"
            }),
        new GambitBonusBase(10, <GambitBonusModel>{
                "index": 10,
                "x0": 1,
                "x1": 0,
                "description": "no",
                "name": "2 extra Snail Mail every day"
            }),
        new GambitBonusBase(11, <GambitBonusModel>{
                "index": 11,
                "x0": 25,
                "x1": 1,
                "description": "This bonus INCREASES the more Gambit Points you have!",
                "name": "} Ninja Stealth"
            }),
        new GambitBonusBase(12, <GambitBonusModel>{
                "index": 12,
                "x0": 1,
                "x1": 0,
                "description": "no",
                "name": "2 Extra Bones on Deathbringer"
            }),
        new GambitBonusBase(13, <GambitBonusModel>{
                "index": 13,
                "x0": 1,
                "x1": 0,
                "description": "no",
                "name": "2 daily particle bubble upg"
            }),
        new GambitBonusBase(14, <GambitBonusModel>{
                "index": 14,
                "x0": 1,
                "x1": 0,
                "description": "no",
                "name": "World 7 bonus... what will it be...?"
            }),
        new GambitBonusBase(15, <GambitBonusModel>{
                "index": 15,
                "x0": 1,
                "x1": 0,
                "description": "no",
                "name": "World 7 bonus... what will it be...?"
            }),
        new GambitBonusBase(16, <GambitBonusModel>{
                "index": 16,
                "x0": 1,
                "x1": 0,
                "description": "no",
                "name": "World 7 bonus... what will it be...?"
            }),
        new GambitBonusBase(17, <GambitBonusModel>{
                "index": 17,
                "x0": 1,
                "x1": 0,
                "description": "no",
                "name": "World 7 bonus... what will it be...?"
            }),
        new GambitBonusBase(18, <GambitBonusModel>{
                "index": 18,
                "x0": 1,
                "x1": 0,
                "description": "no",
                "name": "World 8 bonus... what will it be...?"
            })    
]
}
