import { MenagerieBonusModel } from '../model/menagerieBonusModel';

export class MenagerieBonusBase { constructor(public index: number, public data: MenagerieBonusModel) { } }



export const initMenagerieBonusRepo = () => {
    return [    
        new MenagerieBonusBase(0, <MenagerieBonusModel>{
                "index": 0,
                "description": "+{ more Menagerie Missions",
                "bonusPerLevel": 1,
                "costExponent": 2.1
            }),
        new MenagerieBonusBase(1, <MenagerieBonusModel>{
                "index": 1,
                "description": "Each Menagerie Rank boosts Lumi/hr by +{%",
                "bonusPerLevel": 25,
                "costExponent": 2.1
            }),
        new MenagerieBonusBase(2, <MenagerieBonusModel>{
                "index": 2,
                "description": "+{ Black Stars to use in your Gaming Palette",
                "bonusPerLevel": 1,
                "costExponent": 22.8
            }),
        new MenagerieBonusBase(3, <MenagerieBonusModel>{
                "index": 3,
                "description": "}x Research EXP gains",
                "bonusPerLevel": 10,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(4, <MenagerieBonusModel>{
                "index": 4,
                "description": "}x Cooking Speed",
                "bonusPerLevel": 500,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(5, <MenagerieBonusModel>{
                "index": 5,
                "description": "+{ Max LV for all Shrines in Construction",
                "bonusPerLevel": 10,
                "costExponent": 22.8
            }),
        new MenagerieBonusBase(6, <MenagerieBonusModel>{
                "index": 6,
                "description": "+{ Organic Labels to use in the Exotic Market",
                "bonusPerLevel": 1,
                "costExponent": 3.5
            }),
        new MenagerieBonusBase(7, <MenagerieBonusModel>{
                "index": 7,
                "description": "}x cheaper summoning upgrades per 50 upg LVs",
                "bonusPerLevel": 100,
                "costExponent": 2.1
            }),
        new MenagerieBonusBase(8, <MenagerieBonusModel>{
                "index": 8,
                "description": "+{ Minehead Upgrade Doublers",
                "bonusPerLevel": 1,
                "costExponent": 35
            }),
        new MenagerieBonusBase(9, <MenagerieBonusModel>{
                "index": 9,
                "description": "}x extra value for all Sailing Treasure",
                "bonusPerLevel": 20,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(10, <MenagerieBonusModel>{
                "index": 10,
                "description": "+{ Sushi Station Upgrade Doublers",
                "bonusPerLevel": 1,
                "costExponent": 35
            }),
        new MenagerieBonusBase(11, <MenagerieBonusModel>{
                "index": 11,
                "description": "}x Forge Speed all the way back in World 1",
                "bonusPerLevel": 75,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(12, <MenagerieBonusModel>{
                "index": 12,
                "description": "+{ Jelly Operator Upgrade Doublers",
                "bonusPerLevel": 1,
                "costExponent": 35
            }),
        new MenagerieBonusBase(13, <MenagerieBonusModel>{
                "index": 13,
                "description": "All Shiny Critters are worth }x more",
                "bonusPerLevel": 100,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(14, <MenagerieBonusModel>{
                "index": 14,
                "description": "}x all Summoning Essence gain",
                "bonusPerLevel": 25,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(15, <MenagerieBonusModel>{
                "index": 15,
                "description": "Slow Roast Wiz starts at { sec every wave",
                "bonusPerLevel": 600,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(16, <MenagerieBonusModel>{
                "index": 16,
                "description": "Orion's first upgrade is }x cheaper",
                "bonusPerLevel": 500,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(17, <MenagerieBonusModel>{
                "index": 17,
                "description": "+{ Max LVs for all Atoms",
                "bonusPerLevel": 1,
                "costExponent": 22.8
            }),
        new MenagerieBonusBase(18, <MenagerieBonusModel>{
                "index": 18,
                "description": "Poppy's first upgrade is }x cheaper",
                "bonusPerLevel": 400,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(19, <MenagerieBonusModel>{
                "index": 19,
                "description": "}x Land Rank EXP for all Farming Plots",
                "bonusPerLevel": 50,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(20, <MenagerieBonusModel>{
                "index": 20,
                "description": "Bubba's first upgrade is }x cheaper",
                "bonusPerLevel": 300,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(21, <MenagerieBonusModel>{
                "index": 21,
                "description": "}x Cooking Mastery EXP gains",
                "bonusPerLevel": 1,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(22, <MenagerieBonusModel>{
                "index": 22,
                "description": "}x Spelunking POW",
                "bonusPerLevel": 25,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(23, <MenagerieBonusModel>{
                "index": 23,
                "description": "}x Class EXP gain",
                "bonusPerLevel": 5,
                "costExponent": 1.3
            }),
        new MenagerieBonusBase(24, <MenagerieBonusModel>{
                "index": 24,
                "description": "}x Drop Rate",
                "bonusPerLevel": 1,
                "costExponent": 1.3
            })    
]
}
