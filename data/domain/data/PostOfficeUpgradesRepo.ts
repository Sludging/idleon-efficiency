import { PostOfficeUpgradeModel } from '../model/postOfficeUpgradeModel';
import { PostOfficeUpgradesModel } from '../model/postOfficeUpgradesModel';

export class PostOfficeUpgradesBase { constructor(public id: string, public data: PostOfficeUpgradesModel) { } }



export const initPostOfficeUpgradesRepo = () => {
    return [    
        new PostOfficeUpgradesBase("Civil War Memory Box", <PostOfficeUpgradesModel>{
                "name": "Civil War Memory Box",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "Base Damage",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "basedmg",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Fight AFK Gains",
                        "x1": 13,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "fightAFK",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Critical Chance",
                        "x1": 10,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "critchance",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Locally Sourced Organs", <PostOfficeUpgradesModel>{
                "name": "Locally Sourced Organs",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "Base Max HP",
                        "x1": 1,
                        "x2": 2,
                        "func": "intervalAdd",
                        "bonusKey": "baseHP",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Max HP",
                        "x1": 0.1,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "pctHP",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Faster Respawns",
                        "x1": 30,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "SelfHeal",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Magician Starterpack", <PostOfficeUpgradesModel>{
                "name": "Magician Starterpack",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "Base Max MP",
                        "x1": 1,
                        "x2": 3,
                        "func": "intervalAdd",
                        "bonusKey": "baseMP",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Max MP",
                        "x1": 0.1,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "pctMP",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Faster Cooldowns",
                        "x1": 17,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "cooldown",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Box of Unwanted Stats", <PostOfficeUpgradesModel>{
                "name": "Box of Unwanted Stats",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "Base Accuracy",
                        "x1": 0.25,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "acc",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "Base Defence",
                        "x1": 0.3,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "def",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Monster EXP",
                        "x1": 29,
                        "x2": 170,
                        "func": "decay",
                        "bonusKey": "monsterExp",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Dwarven Supplies", <PostOfficeUpgradesModel>{
                "name": "Dwarven Supplies",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Mining Efficiency",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "MinEffPct",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Prowess Effect",
                        "x1": 40,
                        "x2": 150,
                        "func": "decay",
                        "bonusKey": "MinProw",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Mining AFK Gain",
                        "x1": 15,
                        "x2": 175,
                        "func": "decay",
                        "bonusKey": "MinAFK",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Blacksmith Box", <PostOfficeUpgradesModel>{
                "name": "Blacksmith Box",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Smithing EXP",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "SmithExp",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Production Speed",
                        "x1": 75,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "ProdSpd",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% to Craft +1 Slot",
                        "x1": 30,
                        "x2": 150,
                        "func": "decay",
                        "bonusKey": "OneSlot",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Taped Up Timber", <PostOfficeUpgradesModel>{
                "name": "Taped Up Timber",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Choppin Efficiency",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "ChopEffPct",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Prowess Effect",
                        "x1": 40,
                        "x2": 150,
                        "func": "decay",
                        "bonusKey": "ChopProw",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Choppin AFK Gain",
                        "x1": 15,
                        "x2": 175,
                        "func": "decay",
                        "bonusKey": "ChopAFK",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Carepack From Mum", <PostOfficeUpgradesModel>{
                "name": "Carepack From Mum",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Not Consume Food",
                        "x1": 23,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "NonConsume",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Health Food Effect",
                        "x1": 30,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "HealthFoodEffect",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Boost Food Effect",
                        "x1": 30,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "PowerFoodEffect",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Sealed Fishheads", <PostOfficeUpgradesModel>{
                "name": "Sealed Fishheads",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Fishin Efficiency",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "FishEffPct",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Prowess Effect",
                        "x1": 40,
                        "x2": 150,
                        "func": "decay",
                        "bonusKey": "FishProw",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Fishin AFK Gain",
                        "x1": 15,
                        "x2": 175,
                        "func": "decay",
                        "bonusKey": "FishAFK",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Potion Package", <PostOfficeUpgradesModel>{
                "name": "Potion Package",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Brewing Speed",
                        "x1": 70,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "BrewSpeed",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Alchemy EXP",
                        "x1": 60,
                        "x2": 150,
                        "func": "decay",
                        "bonusKey": "AlchEXP",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "Cranium Cook Time",
                        "x1": 0.1,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "CookTime",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Bug Hunting Supplies", <PostOfficeUpgradesModel>{
                "name": "Bug Hunting Supplies",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Catchin Efficiency",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "CatchEffPct",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Prowess Effect",
                        "x1": 40,
                        "x2": 150,
                        "func": "decay",
                        "bonusKey": "CatchProw",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Catchin AFK Gain",
                        "x1": 15,
                        "x2": 175,
                        "func": "decay",
                        "bonusKey": "CatchAFK",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Non Predatory Loot Box", <PostOfficeUpgradesModel>{
                "name": "Non Predatory Loot Box",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Drop Rarity",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "DropRate",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "LUK",
                        "x1": 0.25,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "LUK",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Crystal Mob Spawn",
                        "x1": 65,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "CrystalSpawn",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Deaths Storage Unit", <PostOfficeUpgradesModel>{
                "name": "Deaths Storage Unit",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "Weapon Power",
                        "x1": 22,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "12a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Basic Atk Speed",
                        "x1": 15,
                        "x2": 150,
                        "func": "decay",
                        "bonusKey": "12b",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Total Damage",
                        "x1": 15,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "12c",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Utilitarian Capsule", <PostOfficeUpgradesModel>{
                "name": "Utilitarian Capsule",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Printer Sample Size",
                        "x1": 5,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "13a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Multikill per Tier",
                        "x1": 15,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "13b",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Cash from Mobs",
                        "x1": 39,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "13c",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Lazzzy Lootcrate", <PostOfficeUpgradesModel>{
                "name": "Lazzzy Lootcrate",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% 2X AFK XP chance",
                        "x1": 30,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "14a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% AFK exp if 36hr+",
                        "x1": 35,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "14b",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% AFK Cash if 36hr+",
                        "x1": 35,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "14c",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Science Spare Parts", <PostOfficeUpgradesModel>{
                "name": "Science Spare Parts",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "Lab Efficiency",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "15a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Lab EXP gain",
                        "x1": 40,
                        "x2": 150,
                        "func": "decay",
                        "bonusKey": "15b",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "Base LUK",
                        "x1": 30,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "15c",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Trapping Lockbox", <PostOfficeUpgradesModel>{
                "name": "Trapping Lockbox",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Trapping Efficiency",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "16a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Trapping EXP",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "16b",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Critters Trapped",
                        "x1": 45,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "16c",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Construction Container", <PostOfficeUpgradesModel>{
                "name": "Construction Container",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Base Build Rate",
                        "x1": 0.25,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "17a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Shrine Charge Rate",
                        "x1": 75,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "17b",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Construction EXP",
                        "x1": 0.5,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "17c",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Crate of the Creator", <PostOfficeUpgradesModel>{
                "name": "Crate of the Creator",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Worship Efficiency",
                        "x1": 50,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "18a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Max Charge",
                        "x1": 200,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "18b",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "Starting Worship Pts",
                        "x1": 90,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "18c",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Chefs Essentials", <PostOfficeUpgradesModel>{
                "name": "Chefs Essentials",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "Cooking Efficiency",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "19a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Cooking EXP gain",
                        "x1": 60,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "19b",
                        "investmentReq": 24.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% for 2x Ladle Drop",
                        "x1": 88,
                        "x2": 200,
                        "func": "decay",
                        "bonusKey": "19c",
                        "investmentReq": 99.9
                    }
                ],
                "maxLevel": 400.1
            }),
        new PostOfficeUpgradesBase("Myriad Crate", <PostOfficeUpgradesModel>{
                "name": "Myriad Crate",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "Base All Stat",
                        "x1": 400,
                        "x2": 20000,
                        "func": "decay",
                        "bonusKey": "20a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "Base All Efficiency",
                        "x1": 1000,
                        "x2": 20000,
                        "func": "decay",
                        "bonusKey": "20b",
                        "investmentReq": 99.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% All Skills exp",
                        "x1": 100,
                        "x2": 20000,
                        "func": "decay",
                        "bonusKey": "20c",
                        "investmentReq": 299.9
                    }
                ],
                "maxLevel": 100000
            }),
        new PostOfficeUpgradesBase("Scurvy C'arr'ate", <PostOfficeUpgradesModel>{
                "name": "Scurvy C'arr'ate",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% afk counts for sailing",
                        "x1": 8,
                        "x2": 400,
                        "func": "decay",
                        "bonusKey": "21a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "AGI",
                        "x1": 0.2,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "21b",
                        "investmentReq": 49.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Total Damage",
                        "x1": 25,
                        "x2": 400,
                        "func": "decay",
                        "bonusKey": "21c",
                        "investmentReq": 199.9
                    }
                ],
                "maxLevel": 800.1
            }),
        new PostOfficeUpgradesBase("Box of Gosh", <PostOfficeUpgradesModel>{
                "name": "Box of Gosh",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Divinity EXP",
                        "x1": 75,
                        "x2": 400,
                        "func": "decay",
                        "bonusKey": "22a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "WIS",
                        "x1": 0.2,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "22b",
                        "investmentReq": 49.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Divinity Gain",
                        "x1": 30,
                        "x2": 400,
                        "func": "decay",
                        "bonusKey": "22c",
                        "investmentReq": 199.9
                    }
                ],
                "maxLevel": 800.1
            }),
        new PostOfficeUpgradesBase("Gaming Lootcrate", <PostOfficeUpgradesModel>{
                "name": "Gaming Lootcrate",
                "bonuses": [
                    <PostOfficeUpgradeModel>{
                        "bonus": "% afk counts for gaming",
                        "x1": 14,
                        "x2": 400,
                        "func": "decay",
                        "bonusKey": "23a",
                        "investmentReq": 0
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "STR",
                        "x1": 0.2,
                        "x2": 0,
                        "func": "add",
                        "bonusKey": "23b",
                        "investmentReq": 49.9
                    },
                    <PostOfficeUpgradeModel>{
                        "bonus": "% Total Damage",
                        "x1": 25,
                        "x2": 400,
                        "func": "decay",
                        "bonusKey": "23c",
                        "investmentReq": 199.9
                    }
                ],
                "maxLevel": 800.1
            })    
]
}
