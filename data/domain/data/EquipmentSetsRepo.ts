import { EquipmentSetsModel } from '../model/equipmentSetsModel';

export class EquipmentSetsBase { constructor(public index: number, public data: EquipmentSetsModel) { } }



export const initEquipmentSetsRepo = () => {
    return [    
        new EquipmentSetsBase(0, <EquipmentSetsModel>{
                "name": "COPPER_SET",
                "armors": ["EquipmentHats17", "EquipmentShirts11", "EquipmentPants2"],
                "tools": [
                    "EquipmentTools2",
                    "EquipmentToolsHatchet3",
                    "FishingRod2",
                    "CatchingNet2",
                    "TrapBoxSet2",
                    "WorshipSkull2"
                ],
                "weapons": ["none"],
                "toolsRequired": true,
                "weaponRequired": false,
                "bonusValue": 60,
                "description": "+{% Mining and Chopping Efficiency",
                "displayOrder": 0
            }),
        new EquipmentSetsBase(1, <EquipmentSetsModel>{
                "name": "IRON_SET",
                "armors": ["EquipmentHats18", "EquipmentShirts12", "EquipmentPants3"],
                "tools": [
                    "EquipmentTools3",
                    "EquipmentToolsHatchet1",
                    "FishingRod3",
                    "CatchingNet3",
                    "WorshipSkull2"
                ],
                "weapons": ["none"],
                "toolsRequired": true,
                "weaponRequired": false,
                "bonusValue": 25,
                "description": "+{% Class EXP Gain",
                "displayOrder": 1
            }),
        new EquipmentSetsBase(2, <EquipmentSetsModel>{
                "name": "AMAROK_SET",
                "armors": ["EquipmentHats22", "EquipmentShirts18", "EquipmentPants17", "EquipmentShoes20"],
                "tools": ["none"],
                "weapons": ["none"],
                "toolsRequired": false,
                "weaponRequired": false,
                "bonusValue": 40,
                "description": "+{% Accuracy and Defence",
                "displayOrder": 2
            }),
        new EquipmentSetsBase(3, <EquipmentSetsModel>{
                "name": "GOLD_SET",
                "armors": ["EquipmentHats28", "EquipmentShirts13", "EquipmentPants4", "EquipmentShoes3"],
                "tools": [
                    "EquipmentTools5",
                    "EquipmentToolsHatchet2",
                    "FishingRod4",
                    "CatchingNet4",
                    "WorshipSkull2"
                ],
                "weapons": ["EquipmentPunching3", "TestObj3", "EquipmentBows5", "EquipmentWands5"],
                "toolsRequired": true,
                "weaponRequired": true,
                "bonusValue": 50,
                "description": "x Coins Dropped by Monsters",
                "displayOrder": 3
            }),
        new EquipmentSetsBase(4, <EquipmentSetsModel>{
                "name": "PLATINUM_SET",
                "armors": ["EquipmentHats19", "EquipmentShirts14", "EquipmentPants5", "EquipmentShoes4"],
                "tools": [
                    "EquipmentTools6",
                    "EquipmentToolsHatchet4",
                    "FishingRod5",
                    "CatchingNet5",
                    "TrapBoxSet3",
                    "WorshipSkull3"
                ],
                "weapons": ["EquipmentSword1", "EquipmentBows6", "EquipmentWands6"],
                "toolsRequired": true,
                "weaponRequired": true,
                "bonusValue": 60,
                "description": "+{% Fishing and Catching Efficiency",
                "displayOrder": 4
            }),
        new EquipmentSetsBase(5, <EquipmentSetsModel>{
                "name": "EFAUNT_SET",
                "armors": ["EquipmentHats52", "EquipmentShirts26", "EquipmentPants20", "EquipmentShoes21"],
                "tools": ["none"],
                "weapons": ["none"],
                "toolsRequired": false,
                "weaponRequired": false,
                "bonusValue": 25,
                "description": "+{% Drop Rate",
                "displayOrder": 5
            }),
        new EquipmentSetsBase(6, <EquipmentSetsModel>{
                "name": "DEMENTIA_SET",
                "armors": ["EquipmentHats53", "EquipmentShirts15", "EquipmentPants6", "EquipmentShoes5"],
                "tools": [
                    "EquipmentTools7",
                    "EquipmentToolsHatchet5",
                    "FishingRod6",
                    "CatchingNet6",
                    "TrapBoxSet4",
                    "WorshipSkull4"
                ],
                "weapons": ["EquipmentPunching4", "EquipmentSword2", "EquipmentBows7", "EquipmentWands3"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 50,
                "description": "+{% Critters and Souls gained",
                "displayOrder": 6
            }),
        new EquipmentSetsBase(7, <EquipmentSetsModel>{
                "name": "VOID_SET",
                "armors": ["EquipmentHats54", "EquipmentShirts27", "EquipmentPants21", "EquipmentShoes22"],
                "tools": [
                    "EquipmentTools11",
                    "EquipmentToolsHatchet7",
                    "FishingRod7",
                    "CatchingNet7",
                    "TrapBoxSet5",
                    "WorshipSkull5"
                ],
                "weapons": ["EquipmentPunching5", "EquipmentSword3", "EquipmentBows8", "EquipmentWands7"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 10,
                "description": "+{% AFK Gains",
                "displayOrder": 7
            }),
        new EquipmentSetsBase(8, <EquipmentSetsModel>{
                "name": "CHIZOAR_SET",
                "armors": ["EquipmentHats68", "EquipmentShirts6", "EquipmentPants9", "EquipmentShoes23"],
                "tools": ["none"],
                "weapons": ["none"],
                "toolsRequired": false,
                "weaponRequired": false,
                "bonusValue": 40,
                "description": "+{% All Skill EXP Gain",
                "displayOrder": 8
            }),
        new EquipmentSetsBase(9, <EquipmentSetsModel>{
                "name": "LUSTRE_SET",
                "armors": ["EquipmentHats70", "EquipmentShirts32", "EquipmentPants24", "EquipmentShoes24"],
                "tools": [
                    "EquipmentTools8",
                    "EquipmentToolsHatchet6",
                    "FishingRod8",
                    "CatchingNet8",
                    "TrapBoxSet6",
                    "WorshipSkull6"
                ],
                "weapons": ["EquipmentPunching6", "EquipmentSword4", "EquipmentBows9", "EquipmentWands8"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 75,
                "description": "+{% Total Damage",
                "displayOrder": 9
            }),
        new EquipmentSetsBase(10, <EquipmentSetsModel>{
                "name": "DIABOLICAL_SET",
                "armors": ["EquipmentHats71", "EquipmentShirts33", "EquipmentPants25", "EquipmentShoes25"],
                "tools": [
                    "EquipmentTools12",
                    "EquipmentToolsHatchet8",
                    "FishingRod9",
                    "CatchingNet9",
                    "TrapBoxSet7",
                    "WorshipSkull7"
                ],
                "weapons": ["EquipmentPunching7", "EquipmentSword5", "EquipmentBows10", "EquipmentWands9"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 20,
                "description": "+{% Faster Monster Respawning",
                "displayOrder": 10
            }),
        new EquipmentSetsBase(11, <EquipmentSetsModel>{
                "name": "TROLL_SET",
                "armors": ["EquipmentHats74", "EquipmentShirts34", "EquipmentPants8", "EquipmentShoes34"],
                "tools": ["none"],
                "weapons": ["none"],
                "toolsRequired": false,
                "weaponRequired": false,
                "bonusValue": 25,
                "description": "x Higher Bonuses from Tome",
                "displayOrder": 11
            }),
        new EquipmentSetsBase(12, <EquipmentSetsModel>{
                "name": "MAGMA_SET",
                "armors": ["EquipmentHats77", "EquipmentShirts35", "EquipmentPants26", "EquipmentShoes35"],
                "tools": [
                    "EquipmentTools9",
                    "EquipmentToolsHatchet9",
                    "FishingRod10",
                    "CatchingNet10",
                    "TrapBoxSet8",
                    "WorshipSkull9"
                ],
                "weapons": ["EquipmentPunching8", "EquipmentSword6", "EquipmentBows11", "EquipmentWands10"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 100,
                "description": "+{% Lab and Divinity EXP Gain",
                "displayOrder": 13
            }),
        new EquipmentSetsBase(13, <EquipmentSetsModel>{
                "name": "KATTLEKRUK_SET",
                "armors": [
                    "EquipmentHats83",
                    "EquipmentShirts36",
                    "EquipmentPants27",
                    "EquipmentShoes36",
                    "EquipmentCape13"
                ],
                "tools": ["none"],
                "weapons": ["EquipmentPunching9", "EquipmentSword7", "EquipmentBows12", "EquipmentWands11"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 5,
                "description": "+{ LV for all Talents",
                "displayOrder": 14
            }),
        new EquipmentSetsBase(14, <EquipmentSetsModel>{
                "name": "MARBIGLASS_SET",
                "armors": ["EquipmentHats105", "EquipmentShirts37", "EquipmentPants29", "EquipmentShoes37"],
                "tools": [
                    "EquipmentTools14",
                    "EquipmentToolsHatchet12",
                    "FishingRod11",
                    "CatchingNet11",
                    "TrapBoxSet9",
                    "WorshipSkull10"
                ],
                "weapons": ["EquipmentPunching10", "EquipmentSword8", "EquipmentBows13", "EquipmentWands12"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 10,
                "description": "+{% All Stat",
                "displayOrder": 15
            }),
        new EquipmentSetsBase(15, <EquipmentSetsModel>{
                "name": "GODSHARD_SET",
                "armors": ["EquipmentHats106", "EquipmentShirts38", "EquipmentPants30", "EquipmentShoes38"],
                "tools": [
                    "EquipmentTools15",
                    "EquipmentToolsHatchet10",
                    "FishingRod12",
                    "CatchingNet12",
                    "TrapBoxSet10",
                    "WorshipSkull11"
                ],
                "weapons": ["EquipmentPunching11", "EquipmentSword9", "EquipmentBows14", "EquipmentWands13"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 15,
                "description": "x Higher Winners Bonuses from Summoning",
                "displayOrder": 16
            }),
        new EquipmentSetsBase(16, <EquipmentSetsModel>{
                "name": "EMPEROR_SET",
                "armors": [
                    "EquipmentHats119",
                    "EquipmentShirts39",
                    "EquipmentPants31",
                    "EquipmentShoes40",
                    "EquipmentRings36",
                    "EquipmentPendant35",
                    "EquipmentCape17"
                ],
                "tools": ["none"],
                "weapons": ["none"],
                "toolsRequired": false,
                "weaponRequired": false,
                "bonusValue": 20,
                "description": "Ribbons and Exalted Stamps give x more multi",
                "displayOrder": 17
            }),
        new EquipmentSetsBase(17, <EquipmentSetsModel>{
                "name": "PREHISTORIC_SET",
                "armors": ["EquipmentHats123", "EquipmentShirts41", "EquipmentPants32", "EquipmentShoes41"],
                "tools": [
                    "EquipmentTools16",
                    "EquipmentToolsHatchet13",
                    "FishingRod13",
                    "CatchingNet13",
                    "TrapBoxSet11",
                    "WorshipSkull12"
                ],
                "weapons": ["EquipmentPunching12", "EquipmentSword10", "EquipmentBows15", "EquipmentWands14"],
                "toolsRequired": false,
                "weaponRequired": true,
                "bonusValue": 100,
                "description": "x EXP Gain in all World 7 Skills",
                "displayOrder": 18
            }),
        new EquipmentSetsBase(18, <EquipmentSetsModel>{
                "name": "SECRET_SET",
                "armors": [
                    "EquipmentHats61",
                    "EquipmentPunching11",
                    "EquipmentShirts31",
                    "Trophy3",
                    "EquipmentNametag4"
                ],
                "tools": ["none"],
                "weapons": ["none"],
                "toolsRequired": false,
                "weaponRequired": false,
                "bonusValue": 25,
                "description": "x Gold Food effect",
                "displayOrder": 12
            })    
]
}
