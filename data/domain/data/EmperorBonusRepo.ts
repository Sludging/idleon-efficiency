import { EmperorBonusModel } from '../model/emperorBonusModel';

export class EmperorBonusBase { constructor(public index: number, public data: EmperorBonusModel) { } }



export const initEmperorBonusRepo = () => {
    return [    
        new EmperorBonusBase(0, <EmperorBonusModel>{
                "bonusId": 0,
                "bonusName": "}x Ninja Stealth",
                "bonusValue": 30,
                "levelMappings": [
                    0,
                    2,
                    6,
                    11,
                    15,
                    19,
                    25,
                    32,
                    44
                ]
            }),
        new EmperorBonusBase(1, <EmperorBonusModel>{
                "bonusId": 1,
                "bonusName": "}x Deathbringer Extra Bones",
                "bonusValue": 5,
                "levelMappings": [
                    1,
                    4,
                    10,
                    16,
                    26,
                    37,
                    47
                ]
            }),
        new EmperorBonusBase(2, <EmperorBonusModel>{
                "bonusId": 2,
                "bonusName": "$% cheaper Farming Upgrades",
                "bonusValue": 20,
                "levelMappings": [
                    3,
                    7,
                    12,
                    17,
                    23,
                    36,
                    45
                ]
            }),
        new EmperorBonusBase(3, <EmperorBonusModel>{"bonusId": 3, "bonusName": "+{ Opals", "bonusValue": 1, "levelMappings": [9, 27]}),
        new EmperorBonusBase(4, <EmperorBonusModel>{
                "bonusId": 4,
                "bonusName": "}x Windwalker Extra Dust",
                "bonusValue": 5,
                "levelMappings": [
                    5,
                    8,
                    13,
                    18,
                    22,
                    29,
                    40
                ]
            }),
        new EmperorBonusBase(5, <EmperorBonusModel>{
                "bonusId": 5,
                "bonusName": "+{% Equinox Bar Fill Rate",
                "bonusValue": 15,
                "levelMappings": [14, 21, 28, 41]
            }),
        new EmperorBonusBase(6, <EmperorBonusModel>{
                "bonusId": 6,
                "bonusName": "}x Arcane Cultist Extra Tachyons",
                "bonusValue": 5,
                "levelMappings": [20, 34, 43]
            }),
        new EmperorBonusBase(7, <EmperorBonusModel>{
                "bonusId": 7,
                "bonusName": "}x Gaming Bit gain",
                "bonusValue": 50,
                "levelMappings": [24, 33, 38, 42]
            }),
        new EmperorBonusBase(8, <EmperorBonusModel>{
                "bonusId": 8,
                "bonusName": "}x Summoning Winner Bonuses",
                "bonusValue": 1,
                "levelMappings": [31]
            }),
        new EmperorBonusBase(9, <EmperorBonusModel>{
                "bonusId": 9,
                "bonusName": "+{% something World 7ish",
                "bonusValue": 5,
                "levelMappings": [35]
            }),
        new EmperorBonusBase(10, <EmperorBonusModel>{
                "bonusId": 10,
                "bonusName": "+{% something World 7ish",
                "bonusValue": 5,
                "levelMappings": [39]
            }),
        new EmperorBonusBase(11, <EmperorBonusModel>{
                "bonusId": 11,
                "bonusName": "+{% Drop Rate",
                "bonusValue": 10,
                "levelMappings": [30, 46]
            })    
]
}
