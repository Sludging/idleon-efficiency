import { RoyalStatueModel } from '../model/royalStatueModel';

export class RoyalStatueBase { constructor(public index: number, public data: RoyalStatueModel) { } }



export const initRoyalStatueRepo = () => {
    return [    
        new RoyalStatueBase(0, <RoyalStatueModel>{
                "index": 0,
                "description": "}千 TOTAL DAMAGE",
                "baseBonus": 200,
                "bonusPerLevel": 15,
                "unlockItem": "RGshard0",
                "unlockChanceDenominator": 25,
                "upgradeItem": "RGenh",
                "attemptCost": 1
            }),
        new RoyalStatueBase(1, <RoyalStatueModel>{
                "index": 1,
                "description": "}千 DROP RATE",
                "baseBonus": 50,
                "bonusPerLevel": 5,
                "unlockItem": "RGshard1",
                "unlockChanceDenominator": 50,
                "upgradeItem": "RGenh",
                "attemptCost": 1
            }),
        new RoyalStatueBase(2, <RoyalStatueModel>{
                "index": 2,
                "description": "}千 EXTRA KILLS",
                "baseBonus": 30,
                "bonusPerLevel": 3,
                "unlockItem": "RGshard2",
                "unlockChanceDenominator": 100,
                "upgradeItem": "RGenh",
                "attemptCost": 1
            }),
        new RoyalStatueBase(3, <RoyalStatueModel>{
                "index": 3,
                "description": "}千 CLASS EXP",
                "baseBonus": 300,
                "bonusPerLevel": 20,
                "unlockItem": "RGshard3",
                "unlockChanceDenominator": 250,
                "upgradeItem": "RGenh",
                "attemptCost": 1
            }),
        new RoyalStatueBase(4, <RoyalStatueModel>{
                "index": 4,
                "description": "4",
                "baseBonus": 10,
                "bonusPerLevel": 3,
                "unlockItem": "RGshard4",
                "unlockChanceDenominator": 500,
                "upgradeItem": "RGenh",
                "attemptCost": 1
            }),
        new RoyalStatueBase(5, <RoyalStatueModel>{
                "index": 5,
                "description": "5",
                "baseBonus": 10,
                "bonusPerLevel": 3,
                "unlockItem": "RGshard5",
                "unlockChanceDenominator": 1000,
                "upgradeItem": "RGenh",
                "attemptCost": 1
            }),
        new RoyalStatueBase(6, <RoyalStatueModel>{
                "index": 6,
                "description": "6",
                "baseBonus": 10,
                "bonusPerLevel": 3,
                "unlockItem": "RGshard6",
                "unlockChanceDenominator": 2500,
                "upgradeItem": "RGenh",
                "attemptCost": 1
            }),
        new RoyalStatueBase(7, <RoyalStatueModel>{
                "index": 7,
                "description": "7",
                "baseBonus": 10,
                "bonusPerLevel": 3,
                "unlockItem": "RGshard7",
                "unlockChanceDenominator": 10000,
                "upgradeItem": "RGenh",
                "attemptCost": 1
            })    
]
}
