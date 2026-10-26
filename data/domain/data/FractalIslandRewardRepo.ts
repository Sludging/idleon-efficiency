import { FractalIslandRewardModel } from '../model/fractalIslandRewardModel';

export class FractalIslandRewardBase { constructor(public index: number, public data: FractalIslandRewardModel) { } }



export const initFractalIslandRewardRepo = () => {
    return [    
        new FractalIslandRewardBase(0, <FractalIslandRewardModel>{
                "index": 0,
                "description": "1 in 100000 chance for Trophy per hr of Nothing AFK",
                "requiredHours": 24
            }),
        new FractalIslandRewardBase(1, <FractalIslandRewardModel>{
                "index": 1,
                "description": "1.25x Dungeon Credits and Flurbos gained",
                "requiredHours": 200
            }),
        new FractalIslandRewardBase(2, <FractalIslandRewardModel>{"index": 2, "description": "-30% Kitchen Upgrade Costs", "requiredHours": 750}),
        new FractalIslandRewardBase(3, <FractalIslandRewardModel>{
                "index": 3,
                "description": "1.20x Chance to find Sailing Artifacts",
                "requiredHours": 2500
            }),
        new FractalIslandRewardBase(4, <FractalIslandRewardModel>{
                "index": 4,
                "description": "Dirty Shovel digs up +25% more Gold Nuggets",
                "requiredHours": 10000
            }),
        new FractalIslandRewardBase(5, <FractalIslandRewardModel>{"index": 5, "description": "+100 Star Talent Pts", "requiredHours": 20000}),
        new FractalIslandRewardBase(6, <FractalIslandRewardModel>{
                "index": 6,
                "description": "All Ninja Twins get +2% Stealth per Sneaking LV",
                "requiredHours": 40000
            }),
        new FractalIslandRewardBase(7, <FractalIslandRewardModel>{
                "index": 7,
                "description": "World 7 Bonus... I wonder what it will be...",
                "requiredHours": 60000
            })    
]
}
