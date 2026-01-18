import { ClamworksBonusModel } from "../model/clamworksBonusModel";

export class ClamworksBonusBase { constructor(public index: number, public data: ClamworksBonusModel) { } }

export const initClamworksBonusRepo = () => {
    return [  
        new ClamworksBonusBase(0, <ClamworksBonusModel>{
            "description": "Pearls you find are worth $ instead of just 1",
            "value": 1,
            "cost": 1.20
        }),
        new ClamworksBonusBase(1, <ClamworksBonusModel>{
            "description": "Increases the total number of clams on the map to $",
            "value": 1,
            "cost": 5.0
        }),
        new ClamworksBonusBase(2, <ClamworksBonusModel>{
            "description": "Pearls have a $% chance to be worth 10x when picked up!",
            "value": 3,
            "cost": 1.50
        }),
        new ClamworksBonusBase(3, <ClamworksBonusModel>{
            "description": "Boosts pearl value based on your Multikill! Currently gives }x",
            "value": 1,
            "cost": 1.4
        }),
        new ClamworksBonusBase(4, <ClamworksBonusModel>{
            "description": "All upgrades are $% cheaper",
            "value": 12,
            "cost": 1.15
        }),
        new ClamworksBonusBase(5, <ClamworksBonusModel>{
            "description": "Clams now drop pure pearls! These are worth $x more than normal!",
            "value": 50,
            "cost": 1.5
        }),
        new ClamworksBonusBase(6, <ClamworksBonusModel>{
            "description": "Boosts the drop rate of pearls by }x",
            "value": 10,
            "cost": 1.35
        }),
        new ClamworksBonusBase(7, <ClamworksBonusModel>{
            "description": "Increases the value of all pearls found by }x",
            "value": 10,
            "cost": 1.25
        }),
        new ClamworksBonusBase(8, <ClamworksBonusModel>{
            "description": "All upgrades are }x cheaper",
            "value": 16,
            "cost": 1.22
        })
    ]
}