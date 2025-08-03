import { MonumentBonusModel } from '../model/monumentBonusModel';
import { MonumentModel } from '../model/monumentModel';
import { MonumentUnlockModel } from '../model/monumentUnlockModel';

export class MonumentBase { constructor(public index: number, public data: MonumentModel) { } }



export const initMonumentRepo = () => {
    return [    
        new MonumentBase(0, <MonumentModel>{
                "index": 0,
                "name": "Bravery",
                "unlocks": [
                    <MonumentUnlockModel>{"index": 0, "description": "Swords deal {~} damage", "hours_required": 1},
                    <MonumentUnlockModel>{"index": 1, "description": "+2 additional Sword", "hours_required": 80},
                    <MonumentUnlockModel>{
                        "index": 2,
                        "description": "You can Re-Throw 5 swords per story",
                        "hours_required": 300
                    },
                    <MonumentUnlockModel>{"index": 3, "description": "+1 additional Sword", "hours_required": 750},
                    <MonumentUnlockModel>{"index": 4, "description": "You get 1 Retelling per story", "hours_required": 2000},
                    <MonumentUnlockModel>{"index": 5, "description": "+1 additional Sword", "hours_required": 5000},
                    <MonumentUnlockModel>{"index": 6, "description": "+10 Re-Throws per story", "hours_required": 10000},
                    <MonumentUnlockModel>{"index": 7, "description": "+1 additional Sword", "hours_required": 24000}
                ],
                "bonuses": [
                    <MonumentBonusModel>{"index": 0, "description": "+{% Mining Efficiency"},
                    <MonumentBonusModel>{"index": 1, "description": "}x Bucket Fill Rate"},
                    <MonumentBonusModel>{"index": 2, "description": "}x Cooking Speed"},
                    <MonumentBonusModel>{"index": 3, "description": "+{% EXP Gain for Villagers"},
                    <MonumentBonusModel>{"index": 4, "description": "}x Gaming Bits Gain"},
                    <MonumentBonusModel>{"index": 5, "description": "+{% Chance for Bravery Opals"},
                    <MonumentBonusModel>{"index": 6, "description": "+{% DMG for all Characters"},
                    <MonumentBonusModel>{"index": 7, "description": "}x Bell Ring & Ping Rate"},
                    <MonumentBonusModel>{"index": 8, "description": "+{% All Monument AFK Gain"},
                    <MonumentBonusModel>{"index": 9, "description": "}x Bravery Bonuses Multi"}
                ]
            }),
        new MonumentBase(1, <MonumentModel>{
                "index": 1,
                "name": "Justice",
                "unlocks": [
                    <MonumentUnlockModel>{"index": 0, "description": "Start with $ coins", "hours_required": 1},
                    <MonumentUnlockModel>{"index": 1, "description": "Start with 2 Mental Health", "hours_required": 80},
                    <MonumentUnlockModel>{"index": 2, "description": "You can Dismiss 1 case per story", "hours_required": 300},
                    <MonumentUnlockModel>{"index": 3, "description": "Start with 1.5x more coins", "hours_required": 750},
                    <MonumentUnlockModel>{"index": 4, "description": "+1 Mental Health and Dismissal", "hours_required": 2000},
                    <MonumentUnlockModel>{"index": 5, "description": "Start with 10 popularity", "hours_required": 5000},
                    <MonumentUnlockModel>{"index": 6, "description": "Start with 3x more coins", "hours_required": 10000},
                    <MonumentUnlockModel>{
                        "index": 7,
                        "description": "+2 Mental Health and Dismissals",
                        "hours_required": 24000
                    }
                ],
                "bonuses": [
                    <MonumentBonusModel>{"index": 0, "description": "+{% Catching Efficiency"},
                    <MonumentBonusModel>{"index": 1, "description": "}x Harp Note Gain"},
                    <MonumentBonusModel>{"index": 2, "description": "}x Artifact Find Chance"},
                    <MonumentBonusModel>{"index": 3, "description": "+{% EXP Gain for Villagers"},
                    <MonumentBonusModel>{"index": 4, "description": "}x All Summoning Essence Gain"},
                    <MonumentBonusModel>{"index": 5, "description": "+{% Chance for Justice Opals"},
                    <MonumentBonusModel>{"index": 6, "description": "+{% Class EXP Gain"},
                    <MonumentBonusModel>{"index": 7, "description": "+{% more daily Lamp Wishes"},
                    <MonumentBonusModel>{"index": 8, "description": "+{% All Monument AFK Gain"},
                    <MonumentBonusModel>{"index": 9, "description": "}x Justice Bonuses Multi"}
                ]
            }),
        new MonumentBase(2, <MonumentModel>{
                "index": 2,
                "name": "Wisdom",
                "unlocks": [
                    <MonumentUnlockModel>{"index": 0, "description": "Start with # Attempts", "hours_required": 1},
                    <MonumentUnlockModel>{"index": 1, "description": "Get +2 Attempts per Board Clear", "hours_required": 80},
                    <MonumentUnlockModel>{
                        "index": 2,
                        "description": "1st attempt each Board reveals row",
                        "hours_required": 300
                    },
                    <MonumentUnlockModel>{
                        "index": 3,
                        "description": "Start with 4 Insta Matches per story",
                        "hours_required": 750
                    },
                    <MonumentUnlockModel>{"index": 4, "description": "+4 additional Starting Attempts", "hours_required": 2000},
                    <MonumentUnlockModel>{
                        "index": 5,
                        "description": "4th attempt each Board reveals square",
                        "hours_required": 5000
                    },
                    <MonumentUnlockModel>{
                        "index": 6,
                        "description": "Get +1 Attempts per Board Clear",
                        "hours_required": 10000
                    },
                    <MonumentUnlockModel>{"index": 7, "description": "+5 additional Insta Matches", "hours_required": 24000}
                ],
                "bonuses": [
                    <MonumentBonusModel>{"index": 0, "description": "+{% Choppin Efficiency"},
                    <MonumentBonusModel>{"index": 1, "description": "}x Jar Rupie Value"},
                    <MonumentBonusModel>{"index": 2, "description": "}x Jade Coin Gain"},
                    <MonumentBonusModel>{"index": 3, "description": "+{% EXP Gain for Villagers"},
                    <MonumentBonusModel>{"index": 4, "description": "}x Farming Crop Evo Chance"},
                    <MonumentBonusModel>{"index": 5, "description": "+{% Chance for Wisdom Opals"},
                    <MonumentBonusModel>{"index": 6, "description": "+{% Player Drop Rate"},
                    <MonumentBonusModel>{"index": 7, "description": "+{% Gambit Points"},
                    <MonumentBonusModel>{"index": 8, "description": "+{% All Monument AFK Gain"},
                    <MonumentBonusModel>{"index": 9, "description": "}x Wisdom Bonuses Multi"}
                ]
            })    
]
}
