import { SpelunkingItemDropModel } from '../model/spelunkingItemDropModel';
import { SpelunkingMetadataModel } from '../model/spelunkingMetadataModel';
import { SpelunkingRewardLabelModel } from '../model/spelunkingRewardLabelModel';

export class SpelunkingMetadataBase { constructor(public index: number, public data: SpelunkingMetadataModel) { } }



export const initSpelunkingMetadataRepo = () => {
    return [    
        new SpelunkingMetadataBase(0, <SpelunkingMetadataModel>{
                "rewardLabels": [
                    <SpelunkingRewardLabelModel>{"dropCode": "_", "displayName": "Amber"},
                    <SpelunkingRewardLabelModel>{"dropCode": "a", "displayName": "Prisma Bubbles"},
                    <SpelunkingRewardLabelModel>{"dropCode": "b", "displayName": "Exalted Stamp Frags"},
                    <SpelunkingRewardLabelModel>{"dropCode": "c", "displayName": "Snail Mail"},
                    <SpelunkingRewardLabelModel>{"dropCode": "d", "displayName": "Blinding Lantern"},
                    <SpelunkingRewardLabelModel>{"dropCode": "e", "displayName": "Sigil Syrup"},
                    <SpelunkingRewardLabelModel>{"dropCode": "f", "displayName": "Spirit Offering"},
                    <SpelunkingRewardLabelModel>{"dropCode": "g", "displayName": "Strange Gold Piece"},
                    <SpelunkingRewardLabelModel>{"dropCode": "h", "displayName": "Rockenstone"},
                    <SpelunkingRewardLabelModel>{"dropCode": "i", "displayName": "Sheetmetal"},
                    <SpelunkingRewardLabelModel>{"dropCode": "j", "displayName": "Popcorn"},
                    <SpelunkingRewardLabelModel>{"dropCode": "k", "displayName": "Pillario"}
                ],
                "itemDrops": [
                    <SpelunkingItemDropModel>{
                        "dropCode": "a",
                        "itemId": "Quest99",
                        "displayName": "Prisma Bubbles",
                        "tunnelIndex": undefined,
                        "unlockUpgradeIndex": 28
                    },
                    <SpelunkingItemDropModel>{
                        "dropCode": "d",
                        "itemId": "Quest90",
                        "displayName": "Blinding Lantern",
                        "tunnelIndex": undefined,
                        "unlockUpgradeIndex": 29
                    },
                    <SpelunkingItemDropModel>{
                        "dropCode": "f",
                        "itemId": "Quest102",
                        "displayName": "Spirit Offering",
                        "tunnelIndex": undefined,
                        "unlockUpgradeIndex": 29
                    },
                    <SpelunkingItemDropModel>{
                        "dropCode": "g",
                        "itemId": "CaveGoldPiece",
                        "displayName": "Strange Gold Piece",
                        "tunnelIndex": undefined,
                        "unlockUpgradeIndex": 30
                    },
                    <SpelunkingItemDropModel>{
                        "dropCode": "h",
                        "itemId": "W7item0",
                        "displayName": "Rockenstone",
                        "tunnelIndex": 0,
                        "unlockUpgradeIndex": undefined
                    },
                    <SpelunkingItemDropModel>{
                        "dropCode": "i",
                        "itemId": "W7item1",
                        "displayName": "Sheetmetal",
                        "tunnelIndex": 2,
                        "unlockUpgradeIndex": undefined
                    },
                    <SpelunkingItemDropModel>{
                        "dropCode": "j",
                        "itemId": "W7item2",
                        "displayName": "Popcorn",
                        "tunnelIndex": 4,
                        "unlockUpgradeIndex": undefined
                    },
                    <SpelunkingItemDropModel>{
                        "dropCode": "k",
                        "itemId": "W7item3",
                        "displayName": "Pillario",
                        "tunnelIndex": 6,
                        "unlockUpgradeIndex": undefined
                    }
                ]
            })    
]
}
