import { MenagerieJellyfishCurrencyModel } from '../model/menagerieJellyfishCurrencyModel';
import { MenagerieJellyfishModel } from '../model/menagerieJellyfishModel';
import { MenagerieJellyfishRewardModel } from '../model/menagerieJellyfishRewardModel';
import { MenagerieJellyfishUpgradeModel } from '../model/menagerieJellyfishUpgradeModel';

export class MenagerieJellyfishBase { constructor(public index: number, public data: MenagerieJellyfishModel) { } }



export const initMenagerieJellyfishRepo = () => {
    return [    
        new MenagerieJellyfishBase(0, <MenagerieJellyfishModel>{
                "index": 0,
                "color": "Pink",
                "unlockId": 3,
                "description": "Unlock the Pink Jellyfish within the Menagerie 膛",
                "label": "Purple Shell/Lumi purchases",
                "currency": <MenagerieJellyfishCurrencyModel>{"kind": "account", "id": "Money"},
                "upgrades": [
                    <MenagerieJellyfishUpgradeModel>{
                        "index": 0,
                        "label": "Shell purchase",
                        "maxLevel": undefined,
                        "bonusPerLevel": undefined
                    },
                    <MenagerieJellyfishUpgradeModel>{
                        "index": 1,
                        "label": "Lumi gains",
                        "maxLevel": undefined,
                        "bonusPerLevel": undefined
                    }
                ],
                "reward": undefined
            }),
        new MenagerieJellyfishBase(1, <MenagerieJellyfishModel>{
                "index": 1,
                "color": "Blue",
                "unlockId": 5,
                "description": "Unlock the Blue Jellyfish within the Menagerie 膛",
                "label": "Blue Ladle donation",
                "currency": <MenagerieJellyfishCurrencyModel>{"kind": "item", "id": "Ladle"},
                "upgrades": [],
                "reward": undefined
            }),
        new MenagerieJellyfishBase(2, <MenagerieJellyfishModel>{
                "index": 2,
                "color": "Red",
                "unlockId": 7,
                "description": "Unlock the Red Jellyfish within the Menagerie 膛",
                "label": "Red Spelunking page reading",
                "currency": undefined,
                "upgrades": [],
                "reward": undefined
            }),
        new MenagerieJellyfishBase(3, <MenagerieJellyfishModel>{
                "index": 3,
                "color": "Silver",
                "unlockId": 10,
                "description": "Unlock the Silver Jellyfish within the Menagerie 膛",
                "label": "Silver Obol upgrades",
                "currency": <MenagerieJellyfishCurrencyModel>{"kind": "account", "id": "ObolFragments"},
                "upgrades": [
                    <MenagerieJellyfishUpgradeModel>{
                        "index": 0,
                        "label": "Miscellaneous Obol bonuses",
                        "maxLevel": 100,
                        "bonusPerLevel": undefined
                    },
                    <MenagerieJellyfishUpgradeModel>{
                        "index": 1,
                        "label": "Automatic fragment conversion",
                        "maxLevel": 190,
                        "bonusPerLevel": undefined
                    }
                ],
                "reward": undefined
            }),
        new MenagerieJellyfishBase(4, <MenagerieJellyfishModel>{
                "index": 4,
                "color": "Yellow",
                "unlockId": 12,
                "description": "Unlock the Yellow Jellyfish within the Menagerie 膛",
                "label": "Yellow Construction bonuses",
                "currency": undefined,
                "upgrades": [
                    <MenagerieJellyfishUpgradeModel>{"index": 0, "label": "Build speed", "maxLevel": undefined, "bonusPerLevel": 25},
                    <MenagerieJellyfishUpgradeModel>{
                        "index": 1,
                        "label": "Construction EXP",
                        "maxLevel": undefined,
                        "bonusPerLevel": 15
                    },
                    <MenagerieJellyfishUpgradeModel>{"index": 2, "label": "Flaggy rate", "maxLevel": undefined, "bonusPerLevel": 10},
                    <MenagerieJellyfishUpgradeModel>{"index": 3, "label": "Lumi gains", "maxLevel": undefined, "bonusPerLevel": 3}
                ],
                "reward": undefined
            }),
        new MenagerieJellyfishBase(5, <MenagerieJellyfishModel>{
                "index": 5,
                "color": "Green",
                "unlockId": 23,
                "description": "Unlock the Green Jellyfish within the Menagerie 膛",
                "label": "Green Gallery nametag reward",
                "currency": undefined,
                "upgrades": [],
                "reward": <MenagerieJellyfishRewardModel>{
                    "requirementType": "galleryDeposit",
                    "requiredItem": "EquipmentNametag28",
                    "requiredCount": 12,
                    "rewardItem": "EquipmentNametagReplica43",
                    "rewardQuantity": 1
                }
            })    
]
}
