import { SummonEssenceModel } from '../model/summonEssenceModel';

export class SummonEssenceBase { constructor(public index: number, public data: SummonEssenceModel) { } }



export const initSummonEssenceRepo = () => {
    return [    
        new SummonEssenceBase(0, <SummonEssenceModel>{
                "colour": 0,
                "knowledgeUpgradeId": 65,
                "victoryUpgradeId": 0,
                "unlockUpgradeId": undefined
            }),
        new SummonEssenceBase(1, <SummonEssenceModel>{
                "colour": 1,
                "knowledgeUpgradeId": 66,
                "victoryUpgradeId": 11,
                "unlockUpgradeId": 4
            }),
        new SummonEssenceBase(2, <SummonEssenceModel>{
                "colour": 2,
                "knowledgeUpgradeId": 67,
                "victoryUpgradeId": 18,
                "unlockUpgradeId": 13
            }),
        new SummonEssenceBase(3, <SummonEssenceModel>{
                "colour": 3,
                "knowledgeUpgradeId": 30,
                "victoryUpgradeId": 27,
                "unlockUpgradeId": 23
            }),
        new SummonEssenceBase(4, <SummonEssenceModel>{
                "colour": 4,
                "knowledgeUpgradeId": 40,
                "victoryUpgradeId": 38,
                "unlockUpgradeId": 33
            }),
        new SummonEssenceBase(5, <SummonEssenceModel>{
                "colour": 5,
                "knowledgeUpgradeId": 52,
                "victoryUpgradeId": 46,
                "unlockUpgradeId": 44
            }),
        new SummonEssenceBase(6, <SummonEssenceModel>{
                "colour": 6,
                "knowledgeUpgradeId": 58,
                "victoryUpgradeId": 54,
                "unlockUpgradeId": 53
            }),
        new SummonEssenceBase(7, <SummonEssenceModel>{
                "colour": 7,
                "knowledgeUpgradeId": 80,
                "victoryUpgradeId": 73,
                "unlockUpgradeId": undefined
            })    
]
}
