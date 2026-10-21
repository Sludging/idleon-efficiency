import { ClamworksRewardModel } from '../model/clamworksRewardModel';

export class ClamworksRewardBase { constructor(public index: number, public data: ClamworksRewardModel) { } }



export const initClamworksRewardRepo = () => {
    return [    
        new ClamworksRewardBase(0, <ClamworksRewardModel>{
                "index": 0,
                "description": "+1 Grade for 2 Gallery Slots",
                "requiredWorkerClassLevel": 1
            }),
        new ClamworksRewardBase(1, <ClamworksRewardModel>{"index": 1, "description": "+1 Legend Talent PTS", "requiredWorkerClassLevel": 2}),
        new ClamworksRewardBase(2, <ClamworksRewardModel>{
                "index": 2,
                "description": "+10 LV/day for Kattlekruk bubbles",
                "requiredWorkerClassLevel": 3
            }),
        new ClamworksRewardBase(3, <ClamworksRewardModel>{
                "index": 3,
                "description": "+5% Meritocracy Multi bonus",
                "requiredWorkerClassLevel": 4
            }),
        new ClamworksRewardBase(4, <ClamworksRewardModel>{"index": 4, "description": "+1 Legend Talent PTS", "requiredWorkerClassLevel": 5}),
        new ClamworksRewardBase(5, <ClamworksRewardModel>{"index": 5, "description": "+20% extra Daily Coral", "requiredWorkerClassLevel": 6}),
        new ClamworksRewardBase(6, <ClamworksRewardModel>{
                "index": 6,
                "description": "+15 LV/day from Brain Coral",
                "requiredWorkerClassLevel": 7
            }),
        new ClamworksRewardBase(7, <ClamworksRewardModel>{"index": 7, "description": "+3% Gallery Bonus Multi", "requiredWorkerClassLevel": 8}),
        new ClamworksRewardBase(8, <ClamworksRewardModel>{"index": 8, "description": "+25% Lumi Gains Rate", "requiredWorkerClassLevel": 9}),
        new ClamworksRewardBase(9, <ClamworksRewardModel>{"index": 9, "description": "1.25x Research EXP gain", "requiredWorkerClassLevel": 10}),
        new ClamworksRewardBase(10, <ClamworksRewardModel>{"index": 10, "description": "10x Cooking Speed", "requiredWorkerClassLevel": 11}),
        new ClamworksRewardBase(11, <ClamworksRewardModel>{"index": 11, "description": "2x Spelunking POW", "requiredWorkerClassLevel": 12})    
]
}
