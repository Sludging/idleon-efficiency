import { ClamWorkBonusModel } from "../model/clamWorkBonusModel";

export class ClamWorkBonusBase { constructor(public index: number, public data: ClamWorkBonusModel) { } }

export const initClamWorkBonusRepo = () => {
    return [  
        new ClamWorkBonusBase(0, <ClamWorkBonusModel>{
            "description": "Pearls you find are worth $ instead of just 1",
            "value": 1,
            "cost": 1.20
        }),
        new ClamWorkBonusBase(1, <ClamWorkBonusModel>{
            "description": "Increases the total number of clams on the map to $",
            "value": 1,
            "cost": 5.0
        }),
        new ClamWorkBonusBase(2, <ClamWorkBonusModel>{
            "description": "Pearls have a $% chance to be worth 10x when picked up!",
            "value": 3,
            "cost": 1.50
        }),
        new ClamWorkBonusBase(3, <ClamWorkBonusModel>{
            "description": "Boosts pearl value based on your Multikill! Currently gives }x",
            "value": 1,
            "cost": 1.4
        }),
        new ClamWorkBonusBase(4, <ClamWorkBonusModel>{
            "description": "All upgrades are $% cheaper",
            "value": 12,
            "cost": 1.15
        }),
        new ClamWorkBonusBase(5, <ClamWorkBonusModel>{
            "description": "Clams now drop pure pearls! These are worth $x more than normal!",
            "value": 50,
            "cost": 1.5
        }),
        new ClamWorkBonusBase(6, <ClamWorkBonusModel>{
            "description": "Boosts the drop rate of pearls by }x",
            "value": 10,
            "cost": 1.35
        }),
        new ClamWorkBonusBase(7, <ClamWorkBonusModel>{
            "description": "Increases the value of all pearls found by }x",
            "value": 10,
            "cost": 1.25
        }),
        new ClamWorkBonusBase(8, <ClamWorkBonusModel>{
            "description": "All upgrades are }x cheaper",
            "value": 16,
            "cost": 1.22
        })
    ]
}