import { SummonEnemyBonusModel } from '../model/summonEnemyBonusModel';

export class SummonEnemyBonusBase { constructor(public index: number, public data: SummonEnemyBonusModel) { } }



export const initSummonEnemyBonusRepo = () => {
    return [    
        new SummonEnemyBonusBase(0, <SummonEnemyBonusModel>{"bonusId": 1, "bonus": "<x Total DMG"}),
        new SummonEnemyBonusBase(1, <SummonEnemyBonusModel>{"bonusId": 2, "bonus": "<x Jade Gain"}),
        new SummonEnemyBonusBase(2, <SummonEnemyBonusModel>{"bonusId": 3, "bonus": "<x Farming SPD"}),
        new SummonEnemyBonusBase(3, <SummonEnemyBonusModel>{"bonusId": 4, "bonus": "<x Artifact Find"}),
        new SummonEnemyBonusBase(4, <SummonEnemyBonusModel>{"bonusId": 5, "bonus": "+{ Lab Con Range"}),
        new SummonEnemyBonusBase(5, <SummonEnemyBonusModel>{"bonusId": 6, "bonus": "<x All Essence"}),
        new SummonEnemyBonusBase(6, <SummonEnemyBonusModel>{"bonusId": 7, "bonus": "<x Sneak EXP"}),
        new SummonEnemyBonusBase(7, <SummonEnemyBonusModel>{"bonusId": 8, "bonus": "<x Sigil SPD"}),
        new SummonEnemyBonusBase(8, <SummonEnemyBonusModel>{"bonusId": 9, "bonus": "<x Farming EXP"}),
        new SummonEnemyBonusBase(9, <SummonEnemyBonusModel>{"bonusId": 10, "bonus": "+{% Drop Rate"}),
        new SummonEnemyBonusBase(10, <SummonEnemyBonusModel>{"bonusId": 11, "bonus": "<x Crop EVO"}),
        new SummonEnemyBonusBase(11, <SummonEnemyBonusModel>{"bonusId": 12, "bonus": "+{% AFK Gains"}),
        new SummonEnemyBonusBase(12, <SummonEnemyBonusModel>{"bonusId": 13, "bonus": "+{% Skill EXP"}),
        new SummonEnemyBonusBase(13, <SummonEnemyBonusModel>{"bonusId": 14, "bonus": "<x Construct SPD"}),
        new SummonEnemyBonusBase(14, <SummonEnemyBonusModel>{"bonusId": 15, "bonus": "<x Skill Effncy."}),
        new SummonEnemyBonusBase(15, <SummonEnemyBonusModel>{"bonusId": 16, "bonus": "<x Cooking SPD"}),
        new SummonEnemyBonusBase(16, <SummonEnemyBonusModel>{"bonusId": 17, "bonus": "<x Gaming Bits"}),
        new SummonEnemyBonusBase(17, <SummonEnemyBonusModel>{"bonusId": 18, "bonus": "<x Shiny EXP"}),
        new SummonEnemyBonusBase(18, <SummonEnemyBonusModel>{"bonusId": 19, "bonus": "+{% All Stat"}),
        new SummonEnemyBonusBase(19, <SummonEnemyBonusModel>{"bonusId": 20, "bonus": "+{ Library Max"})    
]
}
