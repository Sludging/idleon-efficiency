import { DungEnhanceModel } from '../model/dungEnhanceModel';
import { MiscUpgradeModel } from '../model/miscUpgradeModel';

export class DungEnhanceBase { constructor(public id: string, public data: DungEnhanceModel) { } }



export const initDungEnhanceRepo = () => {
    return [    
        new DungEnhanceBase("Weapon", <DungEnhanceModel>{
                "enhancements": [
                    <MiscUpgradeModel>{"upgrade": "% Crit Chance", "min": 6, "max": 18},
                    <MiscUpgradeModel>{"upgrade": "% Total Damage", "min": 5, "max": 30},
                    <MiscUpgradeModel>{"upgrade": "% Boss Damage", "min": 10, "max": 40},
                    <MiscUpgradeModel>{"upgrade": "% Mastery", "min": 10, "max": 32},
                    <MiscUpgradeModel>{"upgrade": "% Crit Dmg", "min": 30, "max": 100}
                ]
            }),
        new DungEnhanceBase("Armor", <DungEnhanceModel>{
                "enhancements": [
                    <MiscUpgradeModel>{"upgrade": "% Move Speed", "min": 3, "max": 5},
                    <MiscUpgradeModel>{"upgrade": "% Total Hp", "min": 8, "max": 25},
                    <MiscUpgradeModel>{"upgrade": "% Total Mp", "min": 8, "max": 25},
                    <MiscUpgradeModel>{"upgrade": "% Block Chance", "min": 3, "max": 6},
                    <MiscUpgradeModel>{"upgrade": "% Boss Damage", "min": 5, "max": 15}
                ]
            }),
        new DungEnhanceBase("Jewelery", <DungEnhanceModel>{
                "enhancements": [
                    <MiscUpgradeModel>{"upgrade": "% Cash From Mobs", "min": 15, "max": 40},
                    <MiscUpgradeModel>{"upgrade": "% Drop Chance", "min": 8, "max": 20},
                    <MiscUpgradeModel>{"upgrade": "% Xtra Dice Chance", "min": 25, "max": 50},
                    <MiscUpgradeModel>{"upgrade": "% Total Damage", "min": 3, "max": 15}
                ]
            })    
]
}
