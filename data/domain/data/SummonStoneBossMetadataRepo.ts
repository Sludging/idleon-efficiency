import { SummonStoneBossMetadataModel } from '../model/summonStoneBossMetadataModel';
import { SummonStoneBossModel } from '../model/summonStoneBossModel';

export class SummonStoneBossMetadataBase { constructor(public index: number, public data: SummonStoneBossMetadataModel) { } }



export const initSummonStoneBossMetadataRepo = () => {
    return [    
        new SummonStoneBossMetadataBase(0, <SummonStoneBossMetadataModel>{
                "bosses": [
                    <SummonStoneBossModel>{
                        "stoneIndex": 0,
                        "enemyId": "babaMummy",
                        "territoryName": "The Aetherdoot",
                        "baseHp": 500000,
                        "baseDamage": 1600
                    },
                    <SummonStoneBossModel>{
                        "stoneIndex": 1,
                        "enemyId": "slimeB",
                        "territoryName": "The Grover Glunko",
                        "baseHp": 2000000,
                        "baseDamage": 4000
                    },
                    <SummonStoneBossModel>{
                        "stoneIndex": 2,
                        "enemyId": "mini6a",
                        "territoryName": "The Shimmerlord",
                        "baseHp": 300000000,
                        "baseDamage": 800000
                    },
                    <SummonStoneBossModel>{
                        "stoneIndex": 3,
                        "enemyId": "mini3a",
                        "territoryName": "The Freezerslush",
                        "baseHp": 20000000,
                        "baseDamage": 60000
                    },
                    <SummonStoneBossModel>{
                        "stoneIndex": 4,
                        "enemyId": "mini4a",
                        "territoryName": "The Hexermush",
                        "baseHp": 8000000,
                        "baseDamage": 16000
                    },
                    <SummonStoneBossModel>{
                        "stoneIndex": 5,
                        "enemyId": "mini5a",
                        "territoryName": "The Cinderdomeo",
                        "baseHp": 80000000,
                        "baseDamage": 240000
                    },
                    <SummonStoneBossModel>{
                        "stoneIndex": 6,
                        "enemyId": "Boss6",
                        "territoryName": "The Zephyeror",
                        "baseHp": 1000000000,
                        "baseDamage": 4000000
                    },
                    <SummonStoneBossModel>{
                        "stoneIndex": 7,
                        "enemyId": "babayaga",
                        "territoryName": "W7 boss",
                        "baseHp": 4000000000,
                        "baseDamage": 80000000
                    },
                    <SummonStoneBossModel>{
                        "stoneIndex": 8,
                        "enemyId": "babayaga",
                        "territoryName": "W8 boss",
                        "baseHp": 24000000000,
                        "baseDamage": 80000000
                    }
                ],
                "trialWinScalingBase": 4000
            })    
]
}
