import { FarmingLandRankUpgradeModel } from '../model/farmingLandRankUpgradeModel';

export class FarmingLandRankUpgradeBase { constructor(public index: number, public data: FarmingLandRankUpgradeModel) { } }



export const initFarmingLandRankUpgradeRepo = () => {
    return [    
        new FarmingLandRankUpgradeBase(0, <FarmingLandRankUpgradeModel>{
                "index": 0,
                "name": "Evolution Boost",
                "description": "Increases next crop chance by +{% per rank of the land plot",
                "baseBonus": 250,
                "totalRankRequirement": 1
            }),
        new FarmingLandRankUpgradeBase(1, <FarmingLandRankUpgradeModel>{
                "index": 1,
                "name": "Production Boost",
                "description": "Boosts value of crops harvested by +{% per rank of the land plot",
                "baseBonus": 5,
                "totalRankRequirement": 5
            }),
        new FarmingLandRankUpgradeBase(2, <FarmingLandRankUpgradeModel>{
                "index": 2,
                "name": "Soil Exp Boost",
                "description": "Each land gains +{% extra Rank EXP per rank of the previous land",
                "baseBonus": 25,
                "totalRankRequirement": 20
            }),
        new FarmingLandRankUpgradeBase(3, <FarmingLandRankUpgradeModel>{
                "index": 3,
                "name": "Evolution Megaboost",
                "description": "Increases next crop chance by +{% multiplicatively!",
                "baseBonus": 600,
                "totalRankRequirement": 30
            }),
        new FarmingLandRankUpgradeBase(4, <FarmingLandRankUpgradeModel>{
                "index": 4,
                "name": "Seed of Stealth",
                "description": "Increases the Stealth of all Ninja Twins by +{% per Farming LV",
                "baseBonus": 2,
                "totalRankRequirement": 60
            }),
        new FarmingLandRankUpgradeBase(5, <FarmingLandRankUpgradeModel>{
                "index": 5,
                "name": "Farmtastic Boost",
                "description": "Increases Farming Skill EXP gained by +{%",
                "baseBonus": 90,
                "totalRankRequirement": 80
            }),
        new FarmingLandRankUpgradeBase(6, <FarmingLandRankUpgradeModel>{
                "index": 6,
                "name": "Soil Exp Megaboost",
                "description": "All plots of land gain +{% more Rank EXP",
                "baseBonus": 200,
                "totalRankRequirement": 125
            }),
        new FarmingLandRankUpgradeBase(7, <FarmingLandRankUpgradeModel>{
                "index": 7,
                "name": "Overgrowth Boost",
                "description": "Increases chance for Overgrowth by +{%",
                "baseBonus": 120,
                "totalRankRequirement": 180
            }),
        new FarmingLandRankUpgradeBase(8, <FarmingLandRankUpgradeModel>{
                "index": 8,
                "name": "Production Megaboost",
                "description": "Increases the amount of crops harvested by +{%",
                "baseBonus": 100,
                "totalRankRequirement": 250
            }),
        new FarmingLandRankUpgradeBase(9, <FarmingLandRankUpgradeModel>{
                "index": 9,
                "name": "Seed of Loot",
                "description": "Increases the Drop Rate of all characters by +{%",
                "baseBonus": 10,
                "totalRankRequirement": 400
            }),
        new FarmingLandRankUpgradeBase(10, <FarmingLandRankUpgradeModel>{
                "index": 10,
                "name": "Evolution Superboost",
                "description": "Increases next crop chance by +{% multiplicatively!",
                "baseBonus": 3000,
                "totalRankRequirement": 500
            }),
        new FarmingLandRankUpgradeBase(11, <FarmingLandRankUpgradeModel>{
                "index": 11,
                "name": "Overgrowth Megaboost",
                "description": "Increases chance for Overgrowth by +{%",
                "baseBonus": 340,
                "totalRankRequirement": 600
            }),
        new FarmingLandRankUpgradeBase(12, <FarmingLandRankUpgradeModel>{
                "index": 12,
                "name": "Farmtastic Megaboost",
                "description": "Increases Farming Skill EXP gained by +{%",
                "baseBonus": 110,
                "totalRankRequirement": 700
            }),
        new FarmingLandRankUpgradeBase(13, <FarmingLandRankUpgradeModel>{
                "index": 13,
                "name": "Soil Exp Superboost",
                "description": "All plots of land gain +{% more Rank EXP",
                "baseBonus": 520,
                "totalRankRequirement": 900
            }),
        new FarmingLandRankUpgradeBase(14, <FarmingLandRankUpgradeModel>{
                "index": 14,
                "name": "Seed of Damage",
                "description": "Gives a +{% Total Damage bonus to all characters",
                "baseBonus": 20,
                "totalRankRequirement": 1200
            }),
        new FarmingLandRankUpgradeBase(15, <FarmingLandRankUpgradeModel>{
                "index": 15,
                "name": "Evolution Ultraboost",
                "description": "Increases next crop chance by +{% multiplicatively!",
                "baseBonus": 40000,
                "totalRankRequirement": 1300
            }),
        new FarmingLandRankUpgradeBase(16, <FarmingLandRankUpgradeModel>{
                "index": 16,
                "name": "Farmtastic Superboost",
                "description": "Increases Farming Skill EXP gained by +{%",
                "baseBonus": 220,
                "totalRankRequirement": 1500
            }),
        new FarmingLandRankUpgradeBase(17, <FarmingLandRankUpgradeModel>{
                "index": 17,
                "name": "Production Superboost",
                "description": "Increases the amount of crops harvested by +{%",
                "baseBonus": 600,
                "totalRankRequirement": 1750
            }),
        new FarmingLandRankUpgradeBase(18, <FarmingLandRankUpgradeModel>{
                "index": 18,
                "name": "Overgrowth Superboost",
                "description": "Increases chance for Overgrowth by +{%",
                "baseBonus": 1500,
                "totalRankRequirement": 2000
            }),
        new FarmingLandRankUpgradeBase(19, <FarmingLandRankUpgradeModel>{
                "index": 19,
                "name": "Seed of Stats",
                "description": "Gives a +{% All Stat bonus to your characters",
                "baseBonus": 5,
                "totalRankRequirement": 3500
            })    
]
}
