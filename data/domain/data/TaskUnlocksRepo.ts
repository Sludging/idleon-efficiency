import { TaskUnlockModel } from '../model/taskUnlockModel';
import { TaskUnlocksModel } from '../model/taskUnlocksModel';

export class TaskUnlocksBase { constructor(public index: number, public data: TaskUnlocksModel) { } }



export const initTaskUnlocksRepo = () => {
    return [    
        new TaskUnlocksBase(0, <TaskUnlocksModel>{
                "unlocks": [
                    [
                        <TaskUnlockModel>{"item": "TestObj7", "tabNo": 0, "recipNo": 24},
                        <TaskUnlockModel>{"item": "EquipmentHats20", "tabNo": 0, "recipNo": 20}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentBows3", "tabNo": 0, "recipNo": 25},
                        <TaskUnlockModel>{"item": "EquipmentHats3", "tabNo": 0, "recipNo": 21}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentWands2", "tabNo": 0, "recipNo": 26},
                        <TaskUnlockModel>{"item": "EquipmentHats16", "tabNo": 0, "recipNo": 22}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FoodMining1", "tabNo": 0, "recipNo": 41},
                        <TaskUnlockModel>{"item": "FoodChoppin1", "tabNo": 0, "recipNo": 42}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FishingRod2", "tabNo": 0, "recipNo": 72},
                        <TaskUnlockModel>{"item": "MaxCapBagFi1", "tabNo": 0, "recipNo": 73}
                    ],
                    [
                        <TaskUnlockModel>{"item": "CatchingNet2", "tabNo": 0, "recipNo": 74},
                        <TaskUnlockModel>{"item": "MaxCapBagB1", "tabNo": 0, "recipNo": 75}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FishingRod3", "tabNo": 0, "recipNo": 76},
                        <TaskUnlockModel>{"item": "MaxCapBagFi2", "tabNo": 0, "recipNo": 77}
                    ],
                    [
                        <TaskUnlockModel>{"item": "CatchingNet3", "tabNo": 0, "recipNo": 78},
                        <TaskUnlockModel>{"item": "MaxCapBagB2", "tabNo": 0, "recipNo": 79}
                    ],
                    [
                        <TaskUnlockModel>{"item": "InvBag102", "tabNo": 0, "recipNo": 52},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 30, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShirts20", "tabNo": 0, "recipNo": 45},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 20, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentPants18", "tabNo": 0, "recipNo": 49},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 20, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentPendant10", "tabNo": 0, "recipNo": 37},
                        <TaskUnlockModel>{"item": "EquipmentRings3", "tabNo": 0, "recipNo": 39}
                    ],
                    [
                        <TaskUnlockModel>{"item": "OilBarrel5", "tabNo": 0, "recipNo": 46},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 20, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShirts25", "tabNo": 0, "recipNo": 53},
                        <TaskUnlockModel>{"item": "EquipmentShirts24", "tabNo": 0, "recipNo": 54}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShirts3", "tabNo": 0, "recipNo": 55},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 20, "recipNo": 0}
                    ],
                    [<TaskUnlockModel>{"item": "PremiumGem", "tabNo": 50, "recipNo": 0}]
                ]
            }),
        new TaskUnlocksBase(1, <TaskUnlocksModel>{
                "unlocks": [
                    [
                        <TaskUnlockModel>{"item": "TestObj3", "tabNo": 1, "recipNo": 5},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentBows5", "tabNo": 1, "recipNo": 6},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentWands5", "tabNo": 1, "recipNo": 7},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "Bullet", "tabNo": 1, "recipNo": 42},
                        <TaskUnlockModel>{"item": "BulletB", "tabNo": 1, "recipNo": 43}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentTools5", "tabNo": 1, "recipNo": 8},
                        <TaskUnlockModel>{"item": "MaxCapBag3", "tabNo": 1, "recipNo": 9}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentToolsHatchet2", "tabNo": 1, "recipNo": 10},
                        <TaskUnlockModel>{"item": "MaxCapBagT3", "tabNo": 1, "recipNo": 11}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FishingRod4", "tabNo": 1, "recipNo": 12},
                        <TaskUnlockModel>{"item": "MaxCapBagFi3", "tabNo": 1, "recipNo": 13}
                    ],
                    [
                        <TaskUnlockModel>{"item": "CatchingNet4", "tabNo": 1, "recipNo": 14},
                        <TaskUnlockModel>{"item": "MaxCapBagB3", "tabNo": 1, "recipNo": 15}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentPunching3", "tabNo": 1, "recipNo": 4},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentSword1", "tabNo": 1, "recipNo": 25},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentBows6", "tabNo": 1, "recipNo": 26},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentWands6", "tabNo": 1, "recipNo": 27},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "InvBag103", "tabNo": 1, "recipNo": 59},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "TestObj13", "tabNo": 1, "recipNo": 45},
                        <TaskUnlockModel>{"item": "EquipmentShirts5", "tabNo": 1, "recipNo": 49}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentHats41", "tabNo": 1, "recipNo": 46},
                        <TaskUnlockModel>{"item": "EquipmentShirts23", "tabNo": 1, "recipNo": 50}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentHats26", "tabNo": 1, "recipNo": 47},
                        <TaskUnlockModel>{"item": "EquipmentShirts22", "tabNo": 1, "recipNo": 51}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes16", "tabNo": 1, "recipNo": 52},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes18", "tabNo": 1, "recipNo": 53},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes17", "tabNo": 1, "recipNo": 54},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes19", "tabNo": 1, "recipNo": 55},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 25, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentTools6", "tabNo": 1, "recipNo": 28},
                        <TaskUnlockModel>{"item": "MaxCapBag4", "tabNo": 1, "recipNo": 29}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentToolsHatchet4", "tabNo": 1, "recipNo": 30},
                        <TaskUnlockModel>{"item": "MaxCapBagT4", "tabNo": 1, "recipNo": 31}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FishingRod5", "tabNo": 1, "recipNo": 32},
                        <TaskUnlockModel>{"item": "MaxCapBagFi4", "tabNo": 1, "recipNo": 33}
                    ],
                    [
                        <TaskUnlockModel>{"item": "CatchingNet5", "tabNo": 1, "recipNo": 34},
                        <TaskUnlockModel>{"item": "MaxCapBagB4", "tabNo": 1, "recipNo": 35}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FoodFish1", "tabNo": 1, "recipNo": 56},
                        <TaskUnlockModel>{"item": "FoodCatch1", "tabNo": 1, "recipNo": 57}
                    ],
                    [
                        <TaskUnlockModel>{"item": "MaxCapBagF4", "tabNo": 1, "recipNo": 36},
                        <TaskUnlockModel>{"item": "MaxCapBagM5", "tabNo": 1, "recipNo": 37}
                    ],
                    [<TaskUnlockModel>{"item": "PremiumGem", "tabNo": 70, "recipNo": 0}],
                    [<TaskUnlockModel>{"item": "PremiumGem", "tabNo": 70, "recipNo": 0}]
                ]
            }),
        new TaskUnlocksBase(2, <TaskUnlocksModel>{
                "unlocks": [
                    [
                        <TaskUnlockModel>{"item": "EquipmentSword2", "tabNo": 2, "recipNo": 5},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 30, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentBows7", "tabNo": 2, "recipNo": 6},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 30, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentWands3", "tabNo": 2, "recipNo": 7},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 30, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FoodTrapping1", "tabNo": 2, "recipNo": 56},
                        <TaskUnlockModel>{"item": "FoodWorship1", "tabNo": 2, "recipNo": 57}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentTools7", "tabNo": 2, "recipNo": 8},
                        <TaskUnlockModel>{"item": "MaxCapBag5", "tabNo": 2, "recipNo": 9}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentToolsHatchet5", "tabNo": 2, "recipNo": 10},
                        <TaskUnlockModel>{"item": "MaxCapBagT5", "tabNo": 2, "recipNo": 11}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FishingRod6", "tabNo": 2, "recipNo": 12},
                        <TaskUnlockModel>{"item": "MaxCapBagFi5", "tabNo": 2, "recipNo": 13}
                    ],
                    [
                        <TaskUnlockModel>{"item": "CatchingNet6", "tabNo": 2, "recipNo": 14},
                        <TaskUnlockModel>{"item": "MaxCapBagB5", "tabNo": 2, "recipNo": 15}
                    ],
                    [
                        <TaskUnlockModel>{"item": "TrapBoxSet4", "tabNo": 2, "recipNo": 16},
                        <TaskUnlockModel>{"item": "MaxCapBagTr4", "tabNo": 2, "recipNo": 17}
                    ],
                    [
                        <TaskUnlockModel>{"item": "WorshipSkull4", "tabNo": 2, "recipNo": 18},
                        <TaskUnlockModel>{"item": "MaxCapBagS4", "tabNo": 2, "recipNo": 19}
                    ],
                    [
                        <TaskUnlockModel>{"item": "TrapBoxSet5", "tabNo": 2, "recipNo": 40},
                        <TaskUnlockModel>{"item": "MaxCapBagTr5", "tabNo": 2, "recipNo": 41}
                    ],
                    [
                        <TaskUnlockModel>{"item": "WorshipSkull5", "tabNo": 2, "recipNo": 42},
                        <TaskUnlockModel>{"item": "MaxCapBagS5", "tabNo": 2, "recipNo": 43}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentPunching5", "tabNo": 2, "recipNo": 28},
                        <TaskUnlockModel>{"item": "EquipmentPunching4", "tabNo": 2, "recipNo": 4}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentSword3", "tabNo": 2, "recipNo": 29},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 35, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentBows8", "tabNo": 2, "recipNo": 30},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 35, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentWands7", "tabNo": 2, "recipNo": 31},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 35, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentHats61", "tabNo": 2, "recipNo": 48},
                        <TaskUnlockModel>{"item": "EquipmentShirts31", "tabNo": 2, "recipNo": 52}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentHats58", "tabNo": 2, "recipNo": 49},
                        <TaskUnlockModel>{"item": "EquipmentShirts28", "tabNo": 2, "recipNo": 53}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentHats59", "tabNo": 2, "recipNo": 50},
                        <TaskUnlockModel>{"item": "EquipmentShirts29", "tabNo": 2, "recipNo": 54}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentHats60", "tabNo": 2, "recipNo": 51},
                        <TaskUnlockModel>{"item": "EquipmentShirts30", "tabNo": 2, "recipNo": 55}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentTools11", "tabNo": 2, "recipNo": 32},
                        <TaskUnlockModel>{"item": "MaxCapBagMi6", "tabNo": 2, "recipNo": 33}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentToolsHatchet7", "tabNo": 2, "recipNo": 34},
                        <TaskUnlockModel>{"item": "MaxCapBagT6", "tabNo": 2, "recipNo": 35}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FishingRod7", "tabNo": 2, "recipNo": 36},
                        <TaskUnlockModel>{"item": "MaxCapBagFi6", "tabNo": 2, "recipNo": 37}
                    ],
                    [
                        <TaskUnlockModel>{"item": "CatchingNet7", "tabNo": 2, "recipNo": 38},
                        <TaskUnlockModel>{"item": "MaxCapBagB6", "tabNo": 2, "recipNo": 39}
                    ],
                    [
                        <TaskUnlockModel>{"item": "InvBag109", "tabNo": 2, "recipNo": 58},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 35, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "MaxCapBagF6", "tabNo": 2, "recipNo": 44},
                        <TaskUnlockModel>{"item": "MaxCapBagM7", "tabNo": 2, "recipNo": 45}
                    ],
                    [<TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}],
                    [<TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}]
                ]
            }),
        new TaskUnlocksBase(3, <TaskUnlocksModel>{
                "unlocks": [
                    [
                        <TaskUnlockModel>{"item": "EquipmentPunching6", "tabNo": 3, "recipNo": 4},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentSword4", "tabNo": 3, "recipNo": 5},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentBows9", "tabNo": 3, "recipNo": 6},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentWands8", "tabNo": 3, "recipNo": 7},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentTools8", "tabNo": 3, "recipNo": 8},
                        <TaskUnlockModel>{"item": "MaxCapBagMi7", "tabNo": 3, "recipNo": 9}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentToolsHatchet6", "tabNo": 3, "recipNo": 10},
                        <TaskUnlockModel>{"item": "MaxCapBagT7", "tabNo": 3, "recipNo": 11}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FishingRod8", "tabNo": 3, "recipNo": 12},
                        <TaskUnlockModel>{"item": "MaxCapBagFi7", "tabNo": 3, "recipNo": 13}
                    ],
                    [
                        <TaskUnlockModel>{"item": "CatchingNet8", "tabNo": 3, "recipNo": 14},
                        <TaskUnlockModel>{"item": "MaxCapBagB7", "tabNo": 3, "recipNo": 15}
                    ],
                    [
                        <TaskUnlockModel>{"item": "TrapBoxSet6", "tabNo": 3, "recipNo": 16},
                        <TaskUnlockModel>{"item": "MaxCapBagTr6", "tabNo": 3, "recipNo": 17}
                    ],
                    [
                        <TaskUnlockModel>{"item": "WorshipSkull6", "tabNo": 3, "recipNo": 18},
                        <TaskUnlockModel>{"item": "MaxCapBagS6", "tabNo": 3, "recipNo": 19}
                    ],
                    [
                        <TaskUnlockModel>{"item": "TrapBoxSet7", "tabNo": 3, "recipNo": 44},
                        <TaskUnlockModel>{"item": "MaxCapBagTr7", "tabNo": 3, "recipNo": 45}
                    ],
                    [
                        <TaskUnlockModel>{"item": "WorshipSkull7", "tabNo": 3, "recipNo": 46},
                        <TaskUnlockModel>{"item": "MaxCapBagS7", "tabNo": 3, "recipNo": 47}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes26", "tabNo": 3, "recipNo": 20},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes27", "tabNo": 3, "recipNo": 21},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes28", "tabNo": 3, "recipNo": 22},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes29", "tabNo": 3, "recipNo": 23},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentHats71", "tabNo": 3, "recipNo": 28},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShirts33", "tabNo": 3, "recipNo": 29},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentPants25", "tabNo": 3, "recipNo": 30},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes25", "tabNo": 3, "recipNo": 31},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentPunching7", "tabNo": 3, "recipNo": 32},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentSword5", "tabNo": 3, "recipNo": 33},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentBows10", "tabNo": 3, "recipNo": 34},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentWands9", "tabNo": 3, "recipNo": 35},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentTools12", "tabNo": 3, "recipNo": 36},
                        <TaskUnlockModel>{"item": "MaxCapBagMi8", "tabNo": 3, "recipNo": 37}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentToolsHatchet8", "tabNo": 3, "recipNo": 38},
                        <TaskUnlockModel>{"item": "MaxCapBagT8", "tabNo": 3, "recipNo": 39}
                    ],
                    [
                        <TaskUnlockModel>{"item": "FishingRod9", "tabNo": 3, "recipNo": 40},
                        <TaskUnlockModel>{"item": "MaxCapBagFi8", "tabNo": 3, "recipNo": 41}
                    ],
                    [
                        <TaskUnlockModel>{"item": "CatchingNet9", "tabNo": 3, "recipNo": 42},
                        <TaskUnlockModel>{"item": "MaxCapBagB8", "tabNo": 3, "recipNo": 43}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes31", "tabNo": 3, "recipNo": 24},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "EquipmentShoes33", "tabNo": 3, "recipNo": 25},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ],
                    [
                        <TaskUnlockModel>{"item": "MaxCapBagF8", "tabNo": 3, "recipNo": 48},
                        <TaskUnlockModel>{"item": "MaxCapBagM9", "tabNo": 3, "recipNo": 49}
                    ],
                    [
                        <TaskUnlockModel>{"item": "InvBag111", "tabNo": 3, "recipNo": 52},
                        <TaskUnlockModel>{"item": "PremiumGem", "tabNo": 5, "recipNo": 0}
                    ]
                ]
            })    
]
}
