import { ComponentModel } from '../model/componentModel';
import { DetRecipeComponentModel } from '../model/detRecipeComponentModel';
import { DetailedRecipeModel } from '../model/detailedRecipeModel';
import { RecipeModel } from '../model/recipeModel';

export class RecipeBase { constructor(public id: string, public data: RecipeModel) { } }



export const initRecipeRepo = () => {
    return [    
        new RecipeBase("EquipmentPunching1", <RecipeModel>{
                "intID": "EquipmentPunching1",
                "recipe": [<ComponentModel>{"item": "CraftMat2", "quantity": 1}, <ComponentModel>{"item": "CraftMat3", "quantity": 5}],
                "levelReqToCraft": 1,
                "expGiven": 3,
                "no": 1,
                "tab": 1,
                "sellPrice": 16,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat3", "quantity": 5}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "CraftMat2", "quantity": 1}, <ComponentModel>{"item": "CraftMat3", "quantity": 5}]
                }
            }),
        new RecipeBase("TestObj1", <RecipeModel>{
                "intID": "TestObj1",
                "recipe": [<ComponentModel>{"item": "Grasslands1", "quantity": 10}, <ComponentModel>{"item": "CopperBar", "quantity": 5}],
                "levelReqToCraft": 2,
                "expGiven": 10,
                "no": 2,
                "tab": 1,
                "sellPrice": 65,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 5}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Grasslands1", "quantity": 10}, <ComponentModel>{"item": "CopperBar", "quantity": 5}]
                }
            }),
        new RecipeBase("EquipmentBows1", <RecipeModel>{
                "intID": "EquipmentBows1",
                "recipe": [<ComponentModel>{"item": "Grasslands1", "quantity": 10}, <ComponentModel>{"item": "CraftMat1", "quantity": 15}],
                "levelReqToCraft": 2,
                "expGiven": 10,
                "no": 3,
                "tab": 1,
                "sellPrice": 75,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat1", "quantity": 15}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Grasslands1", "quantity": 10}, <ComponentModel>{"item": "CraftMat1", "quantity": 15}]
                }
            }),
        new RecipeBase("EquipmentWands1", <RecipeModel>{
                "intID": "EquipmentWands1",
                "recipe": [<ComponentModel>{"item": "Grasslands1", "quantity": 10}, <ComponentModel>{"item": "OakTree", "quantity": 15}],
                "levelReqToCraft": 2,
                "expGiven": 12,
                "no": 4,
                "tab": 1,
                "sellPrice": 60,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 15}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Grasslands1", "quantity": 10}, <ComponentModel>{"item": "OakTree", "quantity": 15}]
                }
            }),
        new RecipeBase("EquipmentHats1", <RecipeModel>{
                "intID": "EquipmentHats1",
                "recipe": [<ComponentModel>{"item": "Grasslands1", "quantity": 4}, <ComponentModel>{"item": "Copper", "quantity": 5}],
                "levelReqToCraft": 1,
                "expGiven": 6,
                "no": 5,
                "tab": 1,
                "sellPrice": 27,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands1", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Copper", "quantity": 5}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Grasslands1", "quantity": 4}, <ComponentModel>{"item": "Copper", "quantity": 5}]
                }
            }),
        new RecipeBase("EquipmentShirts1", <RecipeModel>{
                "intID": "EquipmentShirts1",
                "recipe": [<ComponentModel>{"item": "Grasslands1", "quantity": 6}, <ComponentModel>{"item": "OakTree", "quantity": 3}],
                "levelReqToCraft": 1,
                "expGiven": 8,
                "no": 6,
                "tab": 1,
                "sellPrice": 24,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands1", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 3}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Grasslands1", "quantity": 6}, <ComponentModel>{"item": "OakTree", "quantity": 3}]
                }
            }),
        new RecipeBase("EquipmentPants1", <RecipeModel>{
                "intID": "EquipmentPants1",
                "recipe": [<ComponentModel>{"item": "Grasslands2", "quantity": 6}, <ComponentModel>{"item": "CopperBar", "quantity": 3}],
                "levelReqToCraft": 4,
                "expGiven": 14,
                "no": 7,
                "tab": 1,
                "sellPrice": 51,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands2", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 3}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Grasslands2", "quantity": 6}, <ComponentModel>{"item": "CopperBar", "quantity": 3}]
                }
            }),
        new RecipeBase("EquipmentShoes9", <RecipeModel>{
                "intID": "EquipmentShoes9",
                "recipe": [<ComponentModel>{"item": "Grasslands3", "quantity": 12}, <ComponentModel>{"item": "Leaf1", "quantity": 5}],
                "levelReqToCraft": 6,
                "expGiven": 16,
                "no": 8,
                "tab": 1,
                "sellPrice": 104,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands3", "quantity": 12},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Leaf1", "quantity": 5}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Grasslands3", "quantity": 12}, <ComponentModel>{"item": "Leaf1", "quantity": 5}]
                }
            }),
        new RecipeBase("EquipmentTools2", <RecipeModel>{
                "intID": "EquipmentTools2",
                "recipe": [<ComponentModel>{"item": "CopperBar", "quantity": 5}, <ComponentModel>{"item": "Grasslands2", "quantity": 10}],
                "levelReqToCraft": 3,
                "expGiven": 13,
                "no": 9,
                "tab": 1,
                "sellPrice": 85,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands2", "quantity": 10}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "CopperBar", "quantity": 5}, <ComponentModel>{"item": "Grasslands2", "quantity": 10}]
                }
            }),
        new RecipeBase("MaxCapBag1", <RecipeModel>{
                "intID": "MaxCapBag1",
                "recipe": [<ComponentModel>{"item": "Copper", "quantity": 120}],
                "levelReqToCraft": 5,
                "expGiven": 18,
                "no": 10,
                "tab": 1,
                "sellPrice": 360,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "Copper", "quantity": 120}],
                    "detRecipeTotals": [<ComponentModel>{"item": "Copper", "quantity": 120}]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet3", <RecipeModel>{
                "intID": "EquipmentToolsHatchet3",
                "recipe": [
                    <ComponentModel>{"item": "CopperBar", "quantity": 5},
                    <ComponentModel>{"item": "OakTree", "quantity": 10},
                    <ComponentModel>{"item": "CraftMat1", "quantity": 5}
                ],
                "levelReqToCraft": 4,
                "expGiven": 13,
                "no": 11,
                "tab": 1,
                "sellPrice": 70,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat1", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CopperBar", "quantity": 5},
                        <ComponentModel>{"item": "OakTree", "quantity": 10},
                        <ComponentModel>{"item": "CraftMat1", "quantity": 5}
                    ]
                }
            }),
        new RecipeBase("MaxCapBag7", <RecipeModel>{
                "intID": "MaxCapBag7",
                "recipe": [<ComponentModel>{"item": "OakTree", "quantity": 150}, <ComponentModel>{"item": "CraftMat5", "quantity": 30}],
                "levelReqToCraft": 6,
                "expGiven": 18,
                "no": 12,
                "tab": 1,
                "sellPrice": 660,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat5", "quantity": 30}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "OakTree", "quantity": 150}, <ComponentModel>{"item": "CraftMat5", "quantity": 30}]
                }
            }),
        new RecipeBase("EquipmentHats15", <RecipeModel>{
                "intID": "EquipmentHats15",
                "recipe": [
                    <ComponentModel>{"item": "Grasslands2", "quantity": 15},
                    <ComponentModel>{"item": "OakTree", "quantity": 30},
                    <ComponentModel>{"item": "CraftMat1", "quantity": 10}
                ],
                "levelReqToCraft": 4,
                "expGiven": 15,
                "no": 13,
                "tab": 1,
                "sellPrice": 165,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands2", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat1", "quantity": 10}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Grasslands2", "quantity": 15},
                        <ComponentModel>{"item": "OakTree", "quantity": 30},
                        <ComponentModel>{"item": "CraftMat1", "quantity": 10}
                    ]
                }
            }),
        new RecipeBase("EquipmentPunching2", <RecipeModel>{
                "intID": "EquipmentPunching2",
                "recipe": [
                    <ComponentModel>{"item": "CopperBar", "quantity": 20},
                    <ComponentModel>{"item": "OakTree", "quantity": 75},
                    <ComponentModel>{"item": "CraftMat5", "quantity": 20}
                ],
                "levelReqToCraft": 6,
                "expGiven": 19,
                "no": 14,
                "tab": 1,
                "sellPrice": 530,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat5", "quantity": 20}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "OakTree", "quantity": 75},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 20}
                    ]
                }
            }),
        new RecipeBase("MaxCapBag8", <RecipeModel>{
                "intID": "MaxCapBag8",
                "recipe": [
                    <ComponentModel>{"item": "FoodHealth1", "quantity": 75},
                    <ComponentModel>{"item": "FoodHealth3", "quantity": 25},
                    <ComponentModel>{"item": "OakTree", "quantity": 60},
                    <ComponentModel>{"item": "CopperBar", "quantity": 15}
                ],
                "levelReqToCraft": 7,
                "expGiven": 22,
                "no": 15,
                "tab": 1,
                "sellPrice": 550,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth1", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth3", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 15}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodHealth1", "quantity": 75},
                        <ComponentModel>{"item": "FoodHealth3", "quantity": 25},
                        <ComponentModel>{"item": "OakTree", "quantity": 60},
                        <ComponentModel>{"item": "CopperBar", "quantity": 15}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagM2", <RecipeModel>{
                "intID": "MaxCapBagM2",
                "recipe": [
                    <ComponentModel>{"item": "CraftMat5", "quantity": 80},
                    <ComponentModel>{"item": "Grasslands2", "quantity": 40},
                    <ComponentModel>{"item": "Grasslands3", "quantity": 30}
                ],
                "levelReqToCraft": 8,
                "expGiven": 25,
                "no": 16,
                "tab": 1,
                "sellPrice": 1370,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat5", "quantity": 80},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands2", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands3", "quantity": 30}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CraftMat5", "quantity": 80},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 40},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 30}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats17", <RecipeModel>{
                "intID": "EquipmentHats17",
                "recipe": [<ComponentModel>{"item": "CopperBar", "quantity": 20}, <ComponentModel>{"item": "Grasslands3", "quantity": 40}],
                "levelReqToCraft": 6,
                "expGiven": 35,
                "no": 17,
                "tab": 1,
                "sellPrice": 420,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands3", "quantity": 40}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "CopperBar", "quantity": 20}, <ComponentModel>{"item": "Grasslands3", "quantity": 40}]
                }
            }),
        new RecipeBase("EquipmentShirts11", <RecipeModel>{
                "intID": "EquipmentShirts11",
                "recipe": [<ComponentModel>{"item": "CopperBar", "quantity": 25}, <ComponentModel>{"item": "CraftMat5", "quantity": 120}],
                "levelReqToCraft": 7,
                "expGiven": 55,
                "no": 18,
                "tab": 1,
                "sellPrice": 1615,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat5", "quantity": 120}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "CopperBar", "quantity": 25}, <ComponentModel>{"item": "CraftMat5", "quantity": 120}]
                }
            }),
        new RecipeBase("EquipmentPants2", <RecipeModel>{
                "intID": "EquipmentPants2",
                "recipe": [<ComponentModel>{"item": "CopperBar", "quantity": 30}, <ComponentModel>{"item": "BirchTree", "quantity": 150}],
                "levelReqToCraft": 8,
                "expGiven": 75,
                "no": 19,
                "tab": 1,
                "sellPrice": 660,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 0, "item": "BirchTree", "quantity": 150}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "CopperBar", "quantity": 30}, <ComponentModel>{"item": "BirchTree", "quantity": 150}]
                }
            }),
        new RecipeBase("EquipmentShoes1", <RecipeModel>{
                "intID": "EquipmentShoes1",
                "recipe": [<ComponentModel>{"item": "CopperBar", "quantity": 75}],
                "levelReqToCraft": 10,
                "expGiven": 110,
                "no": 20,
                "tab": 1,
                "sellPrice": 525,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 75}],
                    "detRecipeTotals": [<ComponentModel>{"item": "CopperBar", "quantity": 75}]
                }
            }),
        new RecipeBase("EquipmentHats20", <RecipeModel>{
                "intID": "EquipmentHats20",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats17", "quantity": 1},
                    <ComponentModel>{"item": "IronBar", "quantity": 15},
                    <ComponentModel>{"item": "Copper", "quantity": 80}
                ],
                "levelReqToCraft": 10,
                "expGiven": 300,
                "no": 21,
                "tab": 1,
                "sellPrice": 1140,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands3", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Copper", "quantity": 80}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "IronBar", "quantity": 15},
                        <ComponentModel>{"item": "Copper", "quantity": 80},
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats3", <RecipeModel>{
                "intID": "EquipmentHats3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats17", "quantity": 1},
                    <ComponentModel>{"item": "IronBar", "quantity": 15},
                    <ComponentModel>{"item": "CraftMat1", "quantity": 40}
                ],
                "levelReqToCraft": 10,
                "expGiven": 300,
                "no": 22,
                "tab": 1,
                "sellPrice": 1020,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands3", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat1", "quantity": 40}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "IronBar", "quantity": 15},
                        <ComponentModel>{"item": "CraftMat1", "quantity": 40},
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats16", <RecipeModel>{
                "intID": "EquipmentHats16",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats17", "quantity": 1},
                    <ComponentModel>{"item": "IronBar", "quantity": 15},
                    <ComponentModel>{"item": "OakTree", "quantity": 150}
                ],
                "levelReqToCraft": 10,
                "expGiven": 300,
                "no": 23,
                "tab": 1,
                "sellPrice": 1200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands3", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "IronBar", "quantity": 15},
                        <ComponentModel>{"item": "OakTree", "quantity": 150},
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats21", <RecipeModel>{
                "intID": "EquipmentHats21",
                "recipe": [<ComponentModel>{"item": "EquipmentHats17", "quantity": 1}, <ComponentModel>{"item": "IronBar", "quantity": 150}],
                "levelReqToCraft": 12,
                "expGiven": 50,
                "no": 24,
                "tab": 1,
                "sellPrice": 5220,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands3", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("TestObj7", <RecipeModel>{
                "intID": "TestObj7",
                "recipe": [<ComponentModel>{"item": "Jungle1", "quantity": 125}, <ComponentModel>{"item": "CraftMat6", "quantity": 125}],
                "levelReqToCraft": 12,
                "expGiven": 270,
                "no": 25,
                "tab": 1,
                "sellPrice": 4375,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat6", "quantity": 125}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Jungle1", "quantity": 125}, <ComponentModel>{"item": "CraftMat6", "quantity": 125}]
                }
            }),
        new RecipeBase("EquipmentBows3", <RecipeModel>{
                "intID": "EquipmentBows3",
                "recipe": [<ComponentModel>{"item": "Jungle1", "quantity": 125}, <ComponentModel>{"item": "BirchTree", "quantity": 250}],
                "levelReqToCraft": 12,
                "expGiven": 270,
                "no": 26,
                "tab": 1,
                "sellPrice": 2000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 0, "item": "BirchTree", "quantity": 250}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Jungle1", "quantity": 125}, <ComponentModel>{"item": "BirchTree", "quantity": 250}]
                }
            }),
        new RecipeBase("EquipmentWands2", <RecipeModel>{
                "intID": "EquipmentWands2",
                "recipe": [<ComponentModel>{"item": "Jungle1", "quantity": 125}, <ComponentModel>{"item": "CopperBar", "quantity": 100}],
                "levelReqToCraft": 12,
                "expGiven": 270,
                "no": 27,
                "tab": 1,
                "sellPrice": 1950,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 100}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Jungle1", "quantity": 125}, <ComponentModel>{"item": "CopperBar", "quantity": 100}]
                }
            }),
        new RecipeBase("EquipmentRings2", <RecipeModel>{
                "intID": "EquipmentRings2",
                "recipe": [<ComponentModel>{"item": "CopperBar", "quantity": 300}],
                "levelReqToCraft": 11,
                "expGiven": 330,
                "no": 28,
                "tab": 1,
                "sellPrice": 2100,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 300}],
                    "detRecipeTotals": [<ComponentModel>{"item": "CopperBar", "quantity": 300}]
                }
            }),
        new RecipeBase("EquipmentTools3", <RecipeModel>{
                "intID": "EquipmentTools3",
                "recipe": [<ComponentModel>{"item": "IronBar", "quantity": 70}, <ComponentModel>{"item": "Jungle3", "quantity": 150}],
                "levelReqToCraft": 13,
                "expGiven": 500,
                "no": 29,
                "tab": 1,
                "sellPrice": 4490,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Jungle3", "quantity": 150}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "IronBar", "quantity": 70}, <ComponentModel>{"item": "Jungle3", "quantity": 150}]
                }
            }),
        new RecipeBase("MaxCapBag2", <RecipeModel>{
                "intID": "MaxCapBag2",
                "recipe": [<ComponentModel>{"item": "Iron", "quantity": 700}],
                "levelReqToCraft": 14,
                "expGiven": 600,
                "no": 30,
                "tab": 1,
                "sellPrice": 4900,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "Iron", "quantity": 700}],
                    "detRecipeTotals": [<ComponentModel>{"item": "Iron", "quantity": 700}]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet1", <RecipeModel>{
                "intID": "EquipmentToolsHatchet1",
                "recipe": [<ComponentModel>{"item": "JungleTree", "quantity": 200}, <ComponentModel>{"item": "CraftMat6", "quantity": 100}],
                "levelReqToCraft": 14,
                "expGiven": 680,
                "no": 31,
                "tab": 1,
                "sellPrice": 3700,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "JungleTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat6", "quantity": 100}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "JungleTree", "quantity": 200}, <ComponentModel>{"item": "CraftMat6", "quantity": 100}]
                }
            }),
        new RecipeBase("MaxCapBag9", <RecipeModel>{
                "intID": "MaxCapBag9",
                "recipe": [<ComponentModel>{"item": "BirchTree", "quantity": 800}],
                "levelReqToCraft": 15,
                "expGiven": 680,
                "no": 32,
                "tab": 1,
                "sellPrice": 2400,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "BirchTree", "quantity": 800}],
                    "detRecipeTotals": [<ComponentModel>{"item": "BirchTree", "quantity": 800}]
                }
            }),
        new RecipeBase("EquipmentHats18", <RecipeModel>{
                "intID": "EquipmentHats18",
                "recipe": [<ComponentModel>{"item": "IronBar", "quantity": 125}, <ComponentModel>{"item": "Forest1", "quantity": 300}],
                "levelReqToCraft": 12,
                "expGiven": 520,
                "no": 33,
                "tab": 1,
                "sellPrice": 10000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Forest1", "quantity": 300}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "IronBar", "quantity": 125}, <ComponentModel>{"item": "Forest1", "quantity": 300}]
                }
            }),
        new RecipeBase("EquipmentShirts12", <RecipeModel>{
                "intID": "EquipmentShirts12",
                "recipe": [<ComponentModel>{"item": "IronBar", "quantity": 150}, <ComponentModel>{"item": "JungleTree", "quantity": 600}],
                "levelReqToCraft": 13,
                "expGiven": 600,
                "no": 34,
                "tab": 1,
                "sellPrice": 8400,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 0, "item": "JungleTree", "quantity": 600}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "IronBar", "quantity": 150}, <ComponentModel>{"item": "JungleTree", "quantity": 600}]
                }
            }),
        new RecipeBase("EquipmentPants3", <RecipeModel>{
                "intID": "EquipmentPants3",
                "recipe": [<ComponentModel>{"item": "IronBar", "quantity": 170}, <ComponentModel>{"item": "CraftMat6", "quantity": 225}],
                "levelReqToCraft": 14,
                "expGiven": 750,
                "no": 35,
                "tab": 1,
                "sellPrice": 11065,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 170},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat6", "quantity": 225}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "IronBar", "quantity": 170}, <ComponentModel>{"item": "CraftMat6", "quantity": 225}]
                }
            }),
        new RecipeBase("EquipmentSmithingTabs2", <RecipeModel>{
                "intID": "EquipmentSmithingTabs2",
                "recipe": [
                    <ComponentModel>{"item": "IronBar", "quantity": 250},
                    <ComponentModel>{"item": "CraftMat7", "quantity": 200},
                    <ComponentModel>{"item": "ForestTree", "quantity": 400},
                    <ComponentModel>{"item": "Forest3", "quantity": 250}
                ],
                "levelReqToCraft": 15,
                "expGiven": 1500,
                "no": 36,
                "tab": 1,
                "sellPrice": 27500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat7", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "ForestTree", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Forest3", "quantity": 250}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "IronBar", "quantity": 250},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 200},
                        <ComponentModel>{"item": "ForestTree", "quantity": 400},
                        <ComponentModel>{"item": "Forest3", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts2", <RecipeModel>{
                "intID": "EquipmentShirts2",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts1", "quantity": 1},
                    <ComponentModel>{"item": "Grasslands1", "quantity": 25},
                    <ComponentModel>{"item": "OakTree", "quantity": 50}
                ],
                "levelReqToCraft": 3,
                "expGiven": 15,
                "no": 37,
                "tab": 1,
                "sellPrice": 199,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands1", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands1", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 50}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Grasslands1", "quantity": 31}, <ComponentModel>{"item": "OakTree", "quantity": 53}]
                }
            }),
        new RecipeBase("EquipmentPendant10", <RecipeModel>{
                "intID": "EquipmentPendant10",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows1", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentWands1", "quantity": 1},
                    <ComponentModel>{"item": "TestObj1", "quantity": 2},
                    <ComponentModel>{"item": "CraftMat1", "quantity": 300}
                ],
                "levelReqToCraft": 10,
                "expGiven": 350,
                "no": 38,
                "tab": 1,
                "sellPrice": 1165,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat1", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentWands1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TestObj1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat1", "quantity": 300}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CraftMat1", "quantity": 315},
                        <ComponentModel>{"item": "Grasslands1", "quantity": 40},
                        <ComponentModel>{"item": "OakTree", "quantity": 15},
                        <ComponentModel>{"item": "CopperBar", "quantity": 10}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes15", <RecipeModel>{
                "intID": "EquipmentShoes15",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes1", "quantity": 1},
                    <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                    <ComponentModel>{"item": "IronBar", "quantity": 125}
                ],
                "levelReqToCraft": 13,
                "expGiven": 600,
                "no": 39,
                "tab": 1,
                "sellPrice": 10525,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 125}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentRings3", <RecipeModel>{
                "intID": "EquipmentRings3",
                "recipe": [<ComponentModel>{"item": "IronBar", "quantity": 600}],
                "levelReqToCraft": 13,
                "expGiven": 700,
                "no": 40,
                "tab": 1,
                "sellPrice": 19200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 600}],
                    "detRecipeTotals": [<ComponentModel>{"item": "IronBar", "quantity": 600}]
                }
            }),
        new RecipeBase("EquipmentHats8", <RecipeModel>{
                "intID": "EquipmentHats8",
                "recipe": [
                    <ComponentModel>{"item": "BirchTree", "quantity": 100},
                    <ComponentModel>{"item": "Iron", "quantity": 50},
                    <ComponentModel>{"item": "OilBarrel1", "quantity": 60}
                ],
                "levelReqToCraft": 5,
                "expGiven": 20,
                "no": 41,
                "tab": 1,
                "sellPrice": 1130,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "BirchTree", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Iron", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OilBarrel1", "quantity": 60}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "BirchTree", "quantity": 100},
                        <ComponentModel>{"item": "Iron", "quantity": 50},
                        <ComponentModel>{"item": "OilBarrel1", "quantity": 60}
                    ]
                }
            }),
        new RecipeBase("FoodMining1", <RecipeModel>{
                "intID": "FoodMining1",
                "recipe": [<ComponentModel>{"item": "Iron", "quantity": 5}, <ComponentModel>{"item": "FoodPotMana1", "quantity": 2}],
                "levelReqToCraft": 2,
                "expGiven": 5,
                "no": 42,
                "tab": 1,
                "sellPrice": 45,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Iron", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodPotMana1", "quantity": 2}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Iron", "quantity": 5}, <ComponentModel>{"item": "FoodPotMana1", "quantity": 2}]
                }
            }),
        new RecipeBase("FoodChoppin1", <RecipeModel>{
                "intID": "FoodChoppin1",
                "recipe": [<ComponentModel>{"item": "JungleTree", "quantity": 6}, <ComponentModel>{"item": "FoodPotRe1", "quantity": 3}],
                "levelReqToCraft": 1,
                "expGiven": 5,
                "no": 43,
                "tab": 1,
                "sellPrice": 48,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "JungleTree", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodPotRe1", "quantity": 3}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "JungleTree", "quantity": 6}, <ComponentModel>{"item": "FoodPotRe1", "quantity": 3}]
                }
            }),
        new RecipeBase("EquipmentShoes7", <RecipeModel>{
                "intID": "EquipmentShoes7",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes1", "quantity": 1},
                    <ComponentModel>{"item": "Jungle1", "quantity": 600},
                    <ComponentModel>{"item": "JungleTree", "quantity": 1000}
                ],
                "levelReqToCraft": 11,
                "expGiven": 300,
                "no": 44,
                "tab": 1,
                "sellPrice": 12525,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Jungle1", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "JungleTree", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Jungle1", "quantity": 600},
                        <ComponentModel>{"item": "JungleTree", "quantity": 1000},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts10", <RecipeModel>{
                "intID": "EquipmentShirts10",
                "recipe": [<ComponentModel>{"item": "Forest1", "quantity": 500}, <ComponentModel>{"item": "IronBar", "quantity": 500}],
                "levelReqToCraft": 14,
                "expGiven": 800,
                "no": 45,
                "tab": 1,
                "sellPrice": 26000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Forest1", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 500}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Forest1", "quantity": 500}, <ComponentModel>{"item": "IronBar", "quantity": 500}]
                }
            }),
        new RecipeBase("EquipmentShirts20", <RecipeModel>{
                "intID": "EquipmentShirts20",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts11", "quantity": 1},
                    <ComponentModel>{"item": "TestObj7", "quantity": 1},
                    <ComponentModel>{"item": "BirchTree", "quantity": 325}
                ],
                "levelReqToCraft": 14,
                "expGiven": 600,
                "no": 46,
                "tab": 1,
                "sellPrice": 6965,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat5", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 0, "item": "BirchTree", "quantity": 325}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "BirchTree", "quantity": 325},
                        <ComponentModel>{"item": "CopperBar", "quantity": 25},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 120},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("OilBarrel5", <RecipeModel>{
                "intID": "OilBarrel5",
                "recipe": [<ComponentModel>{"item": "OilBarrel1", "quantity": 1}, <ComponentModel>{"item": "Leaf1", "quantity": 1}],
                "levelReqToCraft": 4,
                "expGiven": 3,
                "no": 47,
                "tab": 1,
                "sellPrice": 12,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "OilBarrel1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Leaf1", "quantity": 1}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "OilBarrel1", "quantity": 1}, <ComponentModel>{"item": "Leaf1", "quantity": 1}]
                }
            }),
        new RecipeBase("EquipmentRings14", <RecipeModel>{
                "intID": "EquipmentRings14",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentRings2", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentRings3", "quantity": 1},
                    <ComponentModel>{"item": "Jungle1", "quantity": 1000}
                ],
                "levelReqToCraft": 16,
                "expGiven": 800,
                "no": 48,
                "tab": 1,
                "sellPrice": 31300,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Jungle1", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Jungle1", "quantity": 1000},
                        <ComponentModel>{"item": "CopperBar", "quantity": 300},
                        <ComponentModel>{"item": "IronBar", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants15", <RecipeModel>{
                "intID": "EquipmentPants15",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants1", "quantity": 3},
                    <ComponentModel>{"item": "Forest2", "quantity": 275},
                    <ComponentModel>{"item": "BirchTree", "quantity": 700}
                ],
                "levelReqToCraft": 12,
                "expGiven": 400,
                "no": 49,
                "tab": 1,
                "sellPrice": 9128,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants1", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands2", "quantity": 18},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Forest2", "quantity": 275},
                        <DetRecipeComponentModel>{"indent": 0, "item": "BirchTree", "quantity": 700}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Forest2", "quantity": 275},
                        <ComponentModel>{"item": "BirchTree", "quantity": 700},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 18},
                        <ComponentModel>{"item": "CopperBar", "quantity": 9}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants18", <RecipeModel>{
                "intID": "EquipmentPants18",
                "recipe": [<ComponentModel>{"item": "EquipmentPants1", "quantity": 3}, <ComponentModel>{"item": "Iron", "quantity": 200}],
                "levelReqToCraft": 12,
                "expGiven": 400,
                "no": 50,
                "tab": 1,
                "sellPrice": 1553,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants1", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands2", "quantity": 18},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Iron", "quantity": 200}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Iron", "quantity": 200},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 18},
                        <ComponentModel>{"item": "CopperBar", "quantity": 9}
                    ]
                }
            }),
        new RecipeBase("Peanut", <RecipeModel>{
                "intID": "Peanut",
                "recipe": [
                    <ComponentModel>{"item": "FoodHealth3", "quantity": 2},
                    <ComponentModel>{"item": "Copper", "quantity": 1},
                    <ComponentModel>{"item": "BirchTree", "quantity": 1}
                ],
                "levelReqToCraft": 5,
                "expGiven": 2,
                "no": 51,
                "tab": 1,
                "sellPrice": 20,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Copper", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "BirchTree", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodHealth3", "quantity": 2},
                        <ComponentModel>{"item": "Copper", "quantity": 1},
                        <ComponentModel>{"item": "BirchTree", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("PeanutG", <RecipeModel>{
                "intID": "PeanutG",
                "recipe": [<ComponentModel>{"item": "Peanut", "quantity": 100}, <ComponentModel>{"item": "GoldBar", "quantity": 50}],
                "levelReqToCraft": 18,
                "expGiven": 200,
                "no": 52,
                "tab": 1,
                "sellPrice": 7750,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Peanut", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodHealth3", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Copper", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 1, "item": "BirchTree", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 50}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GoldBar", "quantity": 50},
                        <ComponentModel>{"item": "FoodHealth3", "quantity": 200},
                        <ComponentModel>{"item": "Copper", "quantity": 100},
                        <ComponentModel>{"item": "BirchTree", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("InvBag102", <RecipeModel>{
                "intID": "InvBag102",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts16", "quantity": 2},
                    <ComponentModel>{"item": "EquipmentHats6", "quantity": 2},
                    <ComponentModel>{"item": "Grasslands1", "quantity": 150}
                ],
                "levelReqToCraft": 8,
                "expGiven": 60,
                "no": 53,
                "tab": 1,
                "sellPrice": 1000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts16", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats6", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands1", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentShirts16", "quantity": 2},
                        <ComponentModel>{"item": "EquipmentHats6", "quantity": 2},
                        <ComponentModel>{"item": "Grasslands1", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts25", <RecipeModel>{
                "intID": "EquipmentShirts25",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts1", "quantity": 1},
                    <ComponentModel>{"item": "Grasslands4", "quantity": 40},
                    <ComponentModel>{"item": "BirchTree", "quantity": 100}
                ],
                "levelReqToCraft": 5,
                "expGiven": 30,
                "no": 54,
                "tab": 1,
                "sellPrice": 604,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands1", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Grasslands4", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "BirchTree", "quantity": 100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Grasslands4", "quantity": 40},
                        <ComponentModel>{"item": "BirchTree", "quantity": 100},
                        <ComponentModel>{"item": "Grasslands1", "quantity": 6},
                        <ComponentModel>{"item": "OakTree", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts24", <RecipeModel>{
                "intID": "EquipmentShirts24",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts16", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentShirts1", "quantity": 1},
                    <ComponentModel>{"item": "CraftMat1", "quantity": 150}
                ],
                "levelReqToCraft": 7,
                "expGiven": 60,
                "no": 55,
                "tab": 1,
                "sellPrice": 599,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts16", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands1", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat1", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentShirts16", "quantity": 1},
                        <ComponentModel>{"item": "CraftMat1", "quantity": 150},
                        <ComponentModel>{"item": "Grasslands1", "quantity": 6},
                        <ComponentModel>{"item": "OakTree", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts3", <RecipeModel>{
                "intID": "EquipmentShirts3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts1", "quantity": 5},
                    <ComponentModel>{"item": "EquipmentShirts2", "quantity": 2},
                    <ComponentModel>{"item": "EquipmentShirts25", "quantity": 2},
                    <ComponentModel>{"item": "EquipmentShirts24", "quantity": 2}
                ],
                "levelReqToCraft": 9,
                "expGiven": 120,
                "no": 56,
                "tab": 1,
                "sellPrice": 2924,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts1", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands1", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts2", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands1", "quantity": 12},
                        <DetRecipeComponentModel>{"indent": 2, "item": "OakTree", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts25", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands1", "quantity": 12},
                        <DetRecipeComponentModel>{"indent": 2, "item": "OakTree", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands4", "quantity": 80},
                        <DetRecipeComponentModel>{"indent": 1, "item": "BirchTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts24", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts16", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands1", "quantity": 12},
                        <DetRecipeComponentModel>{"indent": 2, "item": "OakTree", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat1", "quantity": 300}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Grasslands1", "quantity": 116},
                        <ComponentModel>{"item": "OakTree", "quantity": 133},
                        <ComponentModel>{"item": "Grasslands4", "quantity": 80},
                        <ComponentModel>{"item": "BirchTree", "quantity": 200},
                        <ComponentModel>{"item": "EquipmentShirts16", "quantity": 2},
                        <ComponentModel>{"item": "CraftMat1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("BadgeG1", <RecipeModel>{
                "intID": "BadgeG1",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken1", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken2", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken3", "quantity": 1}
                ],
                "levelReqToCraft": 1,
                "expGiven": 2,
                "no": 57,
                "tab": 1,
                "sellPrice": 23301,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken10", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken13", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Quest9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken14", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken5", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken6", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken4", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken9", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken10", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken11", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken13", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken7", "quantity": 1},
                        <ComponentModel>{"item": "Quest9", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken15", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken12", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken14", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("BadgeG2", <RecipeModel>{
                "intID": "BadgeG2",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats22", "quantity": 1},
                    <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                    <ComponentModel>{"item": "StumpTree", "quantity": 2000}
                ],
                "levelReqToCraft": 40,
                "expGiven": 250000,
                "no": 58,
                "tab": 1,
                "sellPrice": 540450,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Quest17", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "ForestTree", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TreeInterior1b", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StumpTree", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "StumpTree", "quantity": 2000},
                        <ComponentModel>{"item": "Quest17", "quantity": 20},
                        <ComponentModel>{"item": "ForestTree", "quantity": 2500},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 5}
                    ]
                }
            }),
        new RecipeBase("BadgeG3", <RecipeModel>{
                "intID": "BadgeG3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows4", "quantity": 1},
                    <ComponentModel>{"item": "PeanutG", "quantity": 30},
                    <ComponentModel>{"item": "Sewers1b", "quantity": 12},
                    <ComponentModel>{"item": "Cutter", "quantity": 1}
                ],
                "levelReqToCraft": 1,
                "expGiven": 2,
                "no": 59,
                "tab": 1,
                "sellPrice": 248500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PeanutG", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Peanut", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodHealth3", "quantity": 6000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Copper", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "BirchTree", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Sewers1b", "quantity": 12},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Cutter", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentBows4", "quantity": 1},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 12},
                        <ComponentModel>{"item": "Cutter", "quantity": 1},
                        <ComponentModel>{"item": "GoldBar", "quantity": 1500},
                        <ComponentModel>{"item": "FoodHealth3", "quantity": 6000},
                        <ComponentModel>{"item": "Copper", "quantity": 3000},
                        <ComponentModel>{"item": "BirchTree", "quantity": 3000}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats67", <RecipeModel>{
                "intID": "EquipmentHats67",
                "recipe": [
                    <ComponentModel>{"item": "TreeInterior2", "quantity": 25000},
                    <ComponentModel>{"item": "TreeInterior1b", "quantity": 15}
                ],
                "levelReqToCraft": 10,
                "expGiven": 100,
                "no": 60,
                "tab": 1,
                "sellPrice": 2251350,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "TreeInterior2", "quantity": 25000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TreeInterior1b", "quantity": 15}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "TreeInterior2", "quantity": 25000},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 15}
                    ]
                }
            }),
        new RecipeBase("NPCtoken1", <RecipeModel>{
                "intID": "NPCtoken1",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken5", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken6", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken4", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken9", "quantity": 1}
                ],
                "levelReqToCraft": 1,
                "expGiven": 2,
                "no": 61,
                "tab": 1,
                "sellPrice": 3600,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken9", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken5", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken6", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken4", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken9", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("NPCtoken2", <RecipeModel>{
                "intID": "NPCtoken2",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken10", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken11", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken13", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken7", "quantity": 1}
                ],
                "levelReqToCraft": 1,
                "expGiven": 5,
                "no": 62,
                "tab": 1,
                "sellPrice": 7700,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken10", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken13", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken7", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken10", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken11", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken13", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken7", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("NPCtoken3", <RecipeModel>{
                "intID": "NPCtoken3",
                "recipe": [
                    <ComponentModel>{"item": "Quest9", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken15", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken12", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken14", "quantity": 1}
                ],
                "levelReqToCraft": 1,
                "expGiven": 2,
                "no": 63,
                "tab": 1,
                "sellPrice": 12001,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken14", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest9", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken15", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken12", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken14", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("EquipmentRings26", <RecipeModel>{
                "intID": "EquipmentRings26",
                "recipe": [<ComponentModel>{"item": "EquipmentRings20", "quantity": 1}, <ComponentModel>{"item": "IronBar", "quantity": 1000}],
                "levelReqToCraft": 20,
                "expGiven": 5,
                "no": 64,
                "tab": 1,
                "sellPrice": 32001,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings20", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 1000}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "EquipmentRings20", "quantity": 1}, <ComponentModel>{"item": "IronBar", "quantity": 1000}]
                }
            }),
        new RecipeBase("EquipmentHats22", <RecipeModel>{
                "intID": "EquipmentHats22",
                "recipe": [
                    <ComponentModel>{"item": "Quest17", "quantity": 20},
                    <ComponentModel>{"item": "ForestTree", "quantity": 2500},
                    <ComponentModel>{"item": "TreeInterior1b", "quantity": 5}
                ],
                "levelReqToCraft": 23,
                "expGiven": 6000,
                "no": 65,
                "tab": 1,
                "sellPrice": 30450,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest17", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "ForestTree", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TreeInterior1b", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest17", "quantity": 20},
                        <ComponentModel>{"item": "ForestTree", "quantity": 2500},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 5}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts18", <RecipeModel>{
                "intID": "EquipmentShirts18",
                "recipe": [
                    <ComponentModel>{"item": "Quest17", "quantity": 10},
                    <ComponentModel>{"item": "IronBar", "quantity": 300},
                    <ComponentModel>{"item": "Sewers1", "quantity": 600}
                ],
                "levelReqToCraft": 21,
                "expGiven": 3000,
                "no": 66,
                "tab": 1,
                "sellPrice": 30100,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest17", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Sewers1", "quantity": 600}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest17", "quantity": 10},
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "Sewers1", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants17", <RecipeModel>{
                "intID": "EquipmentPants17",
                "recipe": [
                    <ComponentModel>{"item": "Quest17", "quantity": 6},
                    <ComponentModel>{"item": "CraftMat7", "quantity": 300},
                    <ComponentModel>{"item": "Forest3", "quantity": 500}
                ],
                "levelReqToCraft": 17,
                "expGiven": 1500,
                "no": 67,
                "tab": 1,
                "sellPrice": 28500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest17", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat7", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Forest3", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest17", "quantity": 6},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 300},
                        <ComponentModel>{"item": "Forest3", "quantity": 500}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes20", <RecipeModel>{
                "intID": "EquipmentShoes20",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes15", "quantity": 1},
                    <ComponentModel>{"item": "Quest17", "quantity": 5},
                    <ComponentModel>{"item": "Leaf1", "quantity": 125}
                ],
                "levelReqToCraft": 14,
                "expGiven": 700,
                "no": 68,
                "tab": 1,
                "sellPrice": 12275,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest17", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Leaf1", "quantity": 125}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest17", "quantity": 5},
                        <ComponentModel>{"item": "Leaf1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants22", <RecipeModel>{
                "intID": "EquipmentPants22",
                "recipe": [<ComponentModel>{"item": "EquipmentPants15", "quantity": 2}, <ComponentModel>{"item": "Fish1", "quantity": 500}],
                "levelReqToCraft": 14,
                "expGiven": 1,
                "no": 69,
                "tab": 1,
                "sellPrice": 20256,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants15", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPants1", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands2", "quantity": 36},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 18},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Forest2", "quantity": 550},
                        <DetRecipeComponentModel>{"indent": 1, "item": "BirchTree", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish1", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish1", "quantity": 500},
                        <ComponentModel>{"item": "Forest2", "quantity": 550},
                        <ComponentModel>{"item": "BirchTree", "quantity": 1400},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 36},
                        <ComponentModel>{"item": "CopperBar", "quantity": 18}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants23", <RecipeModel>{
                "intID": "EquipmentPants23",
                "recipe": [<ComponentModel>{"item": "EquipmentPants18", "quantity": 2}, <ComponentModel>{"item": "Bug1", "quantity": 500}],
                "levelReqToCraft": 14,
                "expGiven": 1,
                "no": 70,
                "tab": 1,
                "sellPrice": 4606,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants18", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPants1", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands2", "quantity": 36},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 18},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Iron", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug1", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug1", "quantity": 500},
                        <ComponentModel>{"item": "Iron", "quantity": 400},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 36},
                        <ComponentModel>{"item": "CopperBar", "quantity": 18}
                    ]
                }
            }),
        new RecipeBase("FillerMaterial", <RecipeModel>{
                "intID": "FillerMaterial",
                "recipe": [<ComponentModel>{"item": "FillerMaterial", "quantity": 1}, <ComponentModel>{"item": "FillerMaterial", "quantity": 1}],
                "levelReqToCraft": 63,
                "expGiven": 1000000,
                "no": 32,
                "tab": 5,
                "sellPrice": 8,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FillerMaterial", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FillerMaterial", "quantity": 1}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "FillerMaterial", "quantity": 2}]
                }
            }),
        new RecipeBase("EquipmentPendant17", <RecipeModel>{
                "intID": "EquipmentPendant17",
                "recipe": [
                    <ComponentModel>{"item": "Quest29", "quantity": 4},
                    <ComponentModel>{"item": "Quest17", "quantity": 10},
                    <ComponentModel>{"item": "PureWater", "quantity": 25}
                ],
                "levelReqToCraft": 25,
                "expGiven": 15000,
                "no": 72,
                "tab": 1,
                "sellPrice": 4150,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest29", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest17", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 25}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest29", "quantity": 4},
                        <ComponentModel>{"item": "Quest17", "quantity": 10},
                        <ComponentModel>{"item": "PureWater", "quantity": 25}
                    ]
                }
            }),
        new RecipeBase("FishingRod2", <RecipeModel>{
                "intID": "FishingRod2",
                "recipe": [<ComponentModel>{"item": "CopperBar", "quantity": 200}, <ComponentModel>{"item": "Fish1", "quantity": 180}],
                "levelReqToCraft": 10,
                "expGiven": 200,
                "no": 73,
                "tab": 1,
                "sellPrice": 2120,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CopperBar", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish1", "quantity": 180}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "CopperBar", "quantity": 200}, <ComponentModel>{"item": "Fish1", "quantity": 180}]
                }
            }),
        new RecipeBase("MaxCapBagFi1", <RecipeModel>{
                "intID": "MaxCapBagFi1",
                "recipe": [<ComponentModel>{"item": "Fish1", "quantity": 180}],
                "levelReqToCraft": 9,
                "expGiven": 125,
                "no": 74,
                "tab": 1,
                "sellPrice": 720,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "Fish1", "quantity": 180}],
                    "detRecipeTotals": [<ComponentModel>{"item": "Fish1", "quantity": 180}]
                }
            }),
        new RecipeBase("CatchingNet2", <RecipeModel>{
                "intID": "CatchingNet2",
                "recipe": [<ComponentModel>{"item": "JungleTree", "quantity": 500}, <ComponentModel>{"item": "Bug1", "quantity": 400}],
                "levelReqToCraft": 10,
                "expGiven": 200,
                "no": 75,
                "tab": 1,
                "sellPrice": 4200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "JungleTree", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug1", "quantity": 400}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "JungleTree", "quantity": 500}, <ComponentModel>{"item": "Bug1", "quantity": 400}]
                }
            }),
        new RecipeBase("MaxCapBagB1", <RecipeModel>{
                "intID": "MaxCapBagB1",
                "recipe": [<ComponentModel>{"item": "Bug1", "quantity": 180}],
                "levelReqToCraft": 9,
                "expGiven": 125,
                "no": 76,
                "tab": 1,
                "sellPrice": 540,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "Bug1", "quantity": 180}],
                    "detRecipeTotals": [<ComponentModel>{"item": "Bug1", "quantity": 180}]
                }
            }),
        new RecipeBase("FishingRod3", <RecipeModel>{
                "intID": "FishingRod3",
                "recipe": [
                    <ComponentModel>{"item": "IronBar", "quantity": 300},
                    <ComponentModel>{"item": "Fish2", "quantity": 650},
                    <ComponentModel>{"item": "PureWater", "quantity": 3}
                ],
                "levelReqToCraft": 16,
                "expGiven": 750,
                "no": 77,
                "tab": 1,
                "sellPrice": 16900,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish2", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish2", "quantity": 650},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagFi2", <RecipeModel>{
                "intID": "MaxCapBagFi2",
                "recipe": [<ComponentModel>{"item": "Fish2", "quantity": 425}, <ComponentModel>{"item": "PureWater", "quantity": 2}],
                "levelReqToCraft": 15,
                "expGiven": 450,
                "no": 78,
                "tab": 1,
                "sellPrice": 4775,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish2", "quantity": 425},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 2}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Fish2", "quantity": 425}, <ComponentModel>{"item": "PureWater", "quantity": 2}]
                }
            }),
        new RecipeBase("CatchingNet3", <RecipeModel>{
                "intID": "CatchingNet3",
                "recipe": [
                    <ComponentModel>{"item": "ForestTree", "quantity": 800},
                    <ComponentModel>{"item": "Bug2", "quantity": 850},
                    <ComponentModel>{"item": "PureWater", "quantity": 3}
                ],
                "levelReqToCraft": 16,
                "expGiven": 750,
                "no": 79,
                "tab": 1,
                "sellPrice": 15800,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "ForestTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "ForestTree", "quantity": 800},
                        <ComponentModel>{"item": "Bug2", "quantity": 850},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagB2", <RecipeModel>{
                "intID": "MaxCapBagB2",
                "recipe": [<ComponentModel>{"item": "Bug2", "quantity": 425}, <ComponentModel>{"item": "PureWater", "quantity": 2}],
                "levelReqToCraft": 15,
                "expGiven": 450,
                "no": 80,
                "tab": 1,
                "sellPrice": 3925,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug2", "quantity": 425},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 2}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Bug2", "quantity": 425}, <ComponentModel>{"item": "PureWater", "quantity": 2}]
                }
            }),
        new RecipeBase("TrapBoxSet2", <RecipeModel>{
                "intID": "TrapBoxSet2",
                "recipe": [<ComponentModel>{"item": "Critter1A", "quantity": 1}, <ComponentModel>{"item": "Refinery1", "quantity": 5}],
                "levelReqToCraft": 16,
                "expGiven": 750,
                "no": 81,
                "tab": 1,
                "sellPrice": 600,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter1A", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 5}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Critter1A", "quantity": 1}, <ComponentModel>{"item": "Refinery1", "quantity": 5}]
                }
            }),
        new RecipeBase("MaxCapBagTr1", <RecipeModel>{
                "intID": "MaxCapBagTr1",
                "recipe": [<ComponentModel>{"item": "Critter1", "quantity": 200}, <ComponentModel>{"item": "Refinery1", "quantity": 3}],
                "levelReqToCraft": 15,
                "expGiven": 450,
                "no": 82,
                "tab": 1,
                "sellPrice": 900,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter1", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 3}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Critter1", "quantity": 200}, <ComponentModel>{"item": "Refinery1", "quantity": 3}]
                }
            }),
        new RecipeBase("WorshipSkull2", <RecipeModel>{
                "intID": "WorshipSkull2",
                "recipe": [<ComponentModel>{"item": "Soul1", "quantity": 250}, <ComponentModel>{"item": "Refinery1", "quantity": 5}],
                "levelReqToCraft": 16,
                "expGiven": 750,
                "no": 83,
                "tab": 1,
                "sellPrice": 1250,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul1", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 5}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Soul1", "quantity": 250}, <ComponentModel>{"item": "Refinery1", "quantity": 5}]
                }
            }),
        new RecipeBase("MaxCapBagS1", <RecipeModel>{
                "intID": "MaxCapBagS1",
                "recipe": [<ComponentModel>{"item": "Soul1", "quantity": 200}, <ComponentModel>{"item": "Refinery1", "quantity": 3}],
                "levelReqToCraft": 15,
                "expGiven": 450,
                "no": 84,
                "tab": 1,
                "sellPrice": 900,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul1", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 3}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Soul1", "quantity": 200}, <ComponentModel>{"item": "Refinery1", "quantity": 3}]
                }
            }),
        new RecipeBase("EquipmentHats28", <RecipeModel>{
                "intID": "EquipmentHats28",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats17", "quantity": 1},
                    <ComponentModel>{"item": "Bug1", "quantity": 2000},
                    <ComponentModel>{"item": "GoldBar", "quantity": 250}
                ],
                "levelReqToCraft": 15,
                "expGiven": 900,
                "no": 1,
                "tab": 2,
                "sellPrice": 35170,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands3", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug1", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 250}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug1", "quantity": 2000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts13", <RecipeModel>{
                "intID": "EquipmentShirts13",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts11", "quantity": 1},
                    <ComponentModel>{"item": "DesertA1", "quantity": 1500},
                    <ComponentModel>{"item": "GoldBar", "quantity": 350}
                ],
                "levelReqToCraft": 16,
                "expGiven": 1400,
                "no": 2,
                "tab": 2,
                "sellPrice": 131865,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat5", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA1", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 350}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DesertA1", "quantity": 1500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 350},
                        <ComponentModel>{"item": "CopperBar", "quantity": 25},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 120}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants4", <RecipeModel>{
                "intID": "EquipmentPants4",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants2", "quantity": 1},
                    <ComponentModel>{"item": "Fish1", "quantity": 500},
                    <ComponentModel>{"item": "GoldBar", "quantity": 475}
                ],
                "levelReqToCraft": 18,
                "expGiven": 2500,
                "no": 3,
                "tab": 2,
                "sellPrice": 57285,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 1, "item": "BirchTree", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish1", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 475}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish1", "quantity": 500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 475},
                        <ComponentModel>{"item": "CopperBar", "quantity": 30},
                        <ComponentModel>{"item": "BirchTree", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes3", <RecipeModel>{
                "intID": "EquipmentShoes3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes15", "quantity": 1},
                    <ComponentModel>{"item": "GoldBar", "quantity": 600},
                    <ComponentModel>{"item": "PureWater", "quantity": 4}
                ],
                "levelReqToCraft": 20,
                "expGiven": 4200,
                "no": 4,
                "tab": 2,
                "sellPrice": 79725,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 4}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentPunching3", <RecipeModel>{
                "intID": "EquipmentPunching3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPunching2", "quantity": 3},
                    <ComponentModel>{"item": "CraftMat3", "quantity": 5000},
                    <ComponentModel>{"item": "ToiletTree", "quantity": 2000}
                ],
                "levelReqToCraft": 18,
                "expGiven": 3300,
                "no": 5,
                "tab": 2,
                "sellPrice": 46590,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPunching2", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 225},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat5", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat3", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "ToiletTree", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CraftMat3", "quantity": 5000},
                        <ComponentModel>{"item": "ToiletTree", "quantity": 2000},
                        <ComponentModel>{"item": "CopperBar", "quantity": 60},
                        <ComponentModel>{"item": "OakTree", "quantity": 225},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 60}
                    ]
                }
            }),
        new RecipeBase("TestObj3", <RecipeModel>{
                "intID": "TestObj3",
                "recipe": [
                    <ComponentModel>{"item": "ForestTree", "quantity": 1250},
                    <ComponentModel>{"item": "TestObj7", "quantity": 1},
                    <ComponentModel>{"item": "PureWater", "quantity": 8}
                ],
                "levelReqToCraft": 17,
                "expGiven": 1900,
                "no": 6,
                "tab": 2,
                "sellPrice": 17275,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "ForestTree", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 8}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "ForestTree", "quantity": 1250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("EquipmentBows5", <RecipeModel>{
                "intID": "EquipmentBows5",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows3", "quantity": 1},
                    <ComponentModel>{"item": "GoldBar", "quantity": 250},
                    <ComponentModel>{"item": "PureWater", "quantity": 8}
                ],
                "levelReqToCraft": 17,
                "expGiven": 1900,
                "no": 7,
                "tab": 2,
                "sellPrice": 31150,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "BirchTree", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 8}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "BirchTree", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentWands5", <RecipeModel>{
                "intID": "EquipmentWands5",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentWands2", "quantity": 1},
                    <ComponentModel>{"item": "CraftMat7", "quantity": 1000},
                    <ComponentModel>{"item": "PureWater", "quantity": 8}
                ],
                "levelReqToCraft": 17,
                "expGiven": 1900,
                "no": 8,
                "tab": 2,
                "sellPrice": 42350,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentWands2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat7", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 8}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CraftMat7", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("EquipmentTools5", <RecipeModel>{
                "intID": "EquipmentTools5",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentTools3", "quantity": 1},
                    <ComponentModel>{"item": "DesertA2", "quantity": 2500},
                    <ComponentModel>{"item": "GoldBar", "quantity": 800}
                ],
                "levelReqToCraft": 20,
                "expGiven": 4400,
                "no": 9,
                "tab": 2,
                "sellPrice": 271490,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentTools3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Jungle3", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DesertA2", "quantity": 2500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "IronBar", "quantity": 70},
                        <ComponentModel>{"item": "Jungle3", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("MaxCapBag3", <RecipeModel>{
                "intID": "MaxCapBag3",
                "recipe": [
                    <ComponentModel>{"item": "MaxCapBag1", "quantity": 2},
                    <ComponentModel>{"item": "MaxCapBag2", "quantity": 1},
                    <ComponentModel>{"item": "Gold", "quantity": 2000}
                ],
                "levelReqToCraft": 15,
                "expGiven": 1200,
                "no": 10,
                "tab": 2,
                "sellPrice": 31620,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBag1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Copper", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBag2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Iron", "quantity": 700},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Gold", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Gold", "quantity": 2000},
                        <ComponentModel>{"item": "Copper", "quantity": 240},
                        <ComponentModel>{"item": "Iron", "quantity": 700}
                    ]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet2", <RecipeModel>{
                "intID": "EquipmentToolsHatchet2",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentToolsHatchet1", "quantity": 1},
                    <ComponentModel>{"item": "Quest19", "quantity": 5},
                    <ComponentModel>{"item": "DesertA3", "quantity": 2000}
                ],
                "levelReqToCraft": 20,
                "expGiven": 4400,
                "no": 11,
                "tab": 2,
                "sellPrice": 181200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentToolsHatchet1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "JungleTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat6", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA3", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "DesertA3", "quantity": 2000},
                        <ComponentModel>{"item": "JungleTree", "quantity": 200},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagT3", <RecipeModel>{
                "intID": "MaxCapBagT3",
                "recipe": [
                    <ComponentModel>{"item": "MaxCapBag7", "quantity": 2},
                    <ComponentModel>{"item": "MaxCapBag9", "quantity": 1},
                    <ComponentModel>{"item": "ForestTree", "quantity": 2100}
                ],
                "levelReqToCraft": 15,
                "expGiven": 1200,
                "no": 12,
                "tab": 2,
                "sellPrice": 24720,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBag7", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat5", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBag9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "BirchTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 0, "item": "ForestTree", "quantity": 2100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "ForestTree", "quantity": 2100},
                        <ComponentModel>{"item": "OakTree", "quantity": 300},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 60},
                        <ComponentModel>{"item": "BirchTree", "quantity": 800}
                    ]
                }
            }),
        new RecipeBase("FishingRod4", <RecipeModel>{
                "intID": "FishingRod4",
                "recipe": [
                    <ComponentModel>{"item": "Fish2", "quantity": 2500},
                    <ComponentModel>{"item": "CraftMat9", "quantity": 1000},
                    <ComponentModel>{"item": "FishingRod3", "quantity": 1}
                ],
                "levelReqToCraft": 22,
                "expGiven": 5500,
                "no": 13,
                "tab": 2,
                "sellPrice": 104400,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat9", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FishingRod3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish2", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish2", "quantity": 3150},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagFi3", <RecipeModel>{
                "intID": "MaxCapBagFi3",
                "recipe": [
                    <ComponentModel>{"item": "MaxCapBagFi1", "quantity": 2},
                    <ComponentModel>{"item": "MaxCapBagFi2", "quantity": 1},
                    <ComponentModel>{"item": "Fish2", "quantity": 2000}
                ],
                "levelReqToCraft": 17,
                "expGiven": 1850,
                "no": 14,
                "tab": 2,
                "sellPrice": 28215,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagFi1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish1", "quantity": 360},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagFi2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish2", "quantity": 425},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish2", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish2", "quantity": 2425},
                        <ComponentModel>{"item": "Fish1", "quantity": 360},
                        <ComponentModel>{"item": "PureWater", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("CatchingNet4", <RecipeModel>{
                "intID": "CatchingNet4",
                "recipe": [
                    <ComponentModel>{"item": "Quest19", "quantity": 5},
                    <ComponentModel>{"item": "Bug2", "quantity": 2500},
                    <ComponentModel>{"item": "CatchingNet3", "quantity": 1}
                ],
                "levelReqToCraft": 22,
                "expGiven": 5500,
                "no": 15,
                "tab": 2,
                "sellPrice": 55800,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CatchingNet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "ForestTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "Bug2", "quantity": 3350},
                        <ComponentModel>{"item": "ForestTree", "quantity": 800},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagB3", <RecipeModel>{
                "intID": "MaxCapBagB3",
                "recipe": [
                    <ComponentModel>{"item": "MaxCapBagB1", "quantity": 2},
                    <ComponentModel>{"item": "MaxCapBagB2", "quantity": 1},
                    <ComponentModel>{"item": "Bug2", "quantity": 2100}
                ],
                "levelReqToCraft": 17,
                "expGiven": 1850,
                "no": 16,
                "tab": 2,
                "sellPrice": 23905,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagB1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug1", "quantity": 360},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagB2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug2", "quantity": 425},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug2", "quantity": 2100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug2", "quantity": 2525},
                        <ComponentModel>{"item": "Bug1", "quantity": 360},
                        <ComponentModel>{"item": "PureWater", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("EquipmentRings11", <RecipeModel>{
                "intID": "EquipmentRings11",
                "recipe": [
                    <ComponentModel>{"item": "Fish1", "quantity": 10000},
                    <ComponentModel>{"item": "Sewers1b", "quantity": 4},
                    <ComponentModel>{"item": "PureWater", "quantity": 15}
                ],
                "levelReqToCraft": 23,
                "expGiven": 10000,
                "no": 17,
                "tab": 2,
                "sellPrice": 42750,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish1", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Sewers1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 15}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish1", "quantity": 10000},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 4},
                        <ComponentModel>{"item": "PureWater", "quantity": 15}
                    ]
                }
            }),
        new RecipeBase("EquipmentPendant16", <RecipeModel>{
                "intID": "EquipmentPendant16",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPendant10", "quantity": 1},
                    <ComponentModel>{"item": "DesertA1b", "quantity": 4},
                    <ComponentModel>{"item": "PureWater", "quantity": 20}
                ],
                "levelReqToCraft": 28,
                "expGiven": 28000,
                "no": 18,
                "tab": 2,
                "sellPrice": 2405,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPendant10", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentBows1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat1", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentWands1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 2, "item": "OakTree", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TestObj1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 20}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DesertA1b", "quantity": 4},
                        <ComponentModel>{"item": "PureWater", "quantity": 20},
                        <ComponentModel>{"item": "CraftMat1", "quantity": 315},
                        <ComponentModel>{"item": "Grasslands1", "quantity": 40},
                        <ComponentModel>{"item": "OakTree", "quantity": 15},
                        <ComponentModel>{"item": "CopperBar", "quantity": 10}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagF3", <RecipeModel>{
                "intID": "MaxCapBagF3",
                "recipe": [
                    <ComponentModel>{"item": "MaxCapBag8", "quantity": 2},
                    <ComponentModel>{"item": "FoodHealth7", "quantity": 400},
                    <ComponentModel>{"item": "FoodMining1", "quantity": 700},
                    <ComponentModel>{"item": "FoodChoppin1", "quantity": 700}
                ],
                "levelReqToCraft": 18,
                "expGiven": 2400,
                "no": 19,
                "tab": 2,
                "sellPrice": 98200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBag8", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodHealth1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodHealth3", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CopperBar", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth7", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodMining1", "quantity": 700},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Iron", "quantity": 3500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodPotMana1", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodChoppin1", "quantity": 700},
                        <DetRecipeComponentModel>{"indent": 1, "item": "JungleTree", "quantity": 4200},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodPotRe1", "quantity": 2100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodHealth7", "quantity": 400},
                        <ComponentModel>{"item": "FoodHealth1", "quantity": 150},
                        <ComponentModel>{"item": "FoodHealth3", "quantity": 50},
                        <ComponentModel>{"item": "OakTree", "quantity": 120},
                        <ComponentModel>{"item": "CopperBar", "quantity": 30},
                        <ComponentModel>{"item": "Iron", "quantity": 3500},
                        <ComponentModel>{"item": "FoodPotMana1", "quantity": 1400},
                        <ComponentModel>{"item": "JungleTree", "quantity": 4200},
                        <ComponentModel>{"item": "FoodPotRe1", "quantity": 2100}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagM4", <RecipeModel>{
                "intID": "MaxCapBagM4",
                "recipe": [
                    <ComponentModel>{"item": "MaxCapBagM2", "quantity": 2},
                    <ComponentModel>{"item": "DesertA1b", "quantity": 1},
                    <ComponentModel>{"item": "CraftMat7", "quantity": 1700}
                ],
                "levelReqToCraft": 18,
                "expGiven": 2400,
                "no": 20,
                "tab": 2,
                "sellPrice": 70800,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagM2", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat5", "quantity": 160},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands2", "quantity": 80},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Grasslands3", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA1b", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat7", "quantity": 1700}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DesertA1b", "quantity": 1},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 1700},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 160},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 80},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 60}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats19", <RecipeModel>{
                "intID": "EquipmentHats19",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats18", "quantity": 1},
                    <ComponentModel>{"item": "Fish3", "quantity": 2250},
                    <ComponentModel>{"item": "PlatBar", "quantity": 750}
                ],
                "levelReqToCraft": 29,
                "expGiven": 20000,
                "no": 21,
                "tab": 2,
                "sellPrice": 386500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PlatBar", "quantity": 750}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts14", <RecipeModel>{
                "intID": "EquipmentShirts14",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts12", "quantity": 1},
                    <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                    <ComponentModel>{"item": "PlatBar", "quantity": 1000}
                ],
                "levelReqToCraft": 30,
                "expGiven": 36000,
                "no": 22,
                "tab": 2,
                "sellPrice": 1133400,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 1, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PlatBar", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants5", <RecipeModel>{
                "intID": "EquipmentPants5",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants3", "quantity": 1},
                    <ComponentModel>{"item": "Bug3", "quantity": 5000},
                    <ComponentModel>{"item": "PlatBar", "quantity": 1250}
                ],
                "levelReqToCraft": 31,
                "expGiven": 50000,
                "no": 23,
                "tab": 2,
                "sellPrice": 661065,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 170},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat6", "quantity": 225},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug3", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PlatBar", "quantity": 1250}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug3", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1250},
                        <ComponentModel>{"item": "IronBar", "quantity": 170},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 225}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes4", <RecipeModel>{
                "intID": "EquipmentShoes4",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes3", "quantity": 1},
                    <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                    <ComponentModel>{"item": "Fish3", "quantity": 3000}
                ],
                "levelReqToCraft": 32,
                "expGiven": 55000,
                "no": 24,
                "tab": 2,
                "sellPrice": 261725,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish3", "quantity": 3000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentPendant26", <RecipeModel>{
                "intID": "EquipmentPendant26",
                "recipe": [<ComponentModel>{"item": "EquipmentPendant16", "quantity": 1}, <ComponentModel>{"item": "PureWater", "quantity": 25}],
                "levelReqToCraft": 25,
                "expGiven": 10000,
                "no": 25,
                "tab": 2,
                "sellPrice": 3655,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPendant16", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPendant10", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentBows1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat1", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentWands1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Grasslands1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 3, "item": "OakTree", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 2, "item": "TestObj1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Grasslands1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertA1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 25}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PureWater", "quantity": 45},
                        <ComponentModel>{"item": "DesertA1b", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat1", "quantity": 315},
                        <ComponentModel>{"item": "Grasslands1", "quantity": 40},
                        <ComponentModel>{"item": "OakTree", "quantity": 15},
                        <ComponentModel>{"item": "CopperBar", "quantity": 10}
                    ]
                }
            }),
        new RecipeBase("EquipmentSword1", <RecipeModel>{
                "intID": "EquipmentSword1",
                "recipe": [
                    <ComponentModel>{"item": "DesertA3b", "quantity": 3},
                    <ComponentModel>{"item": "CraftMat9", "quantity": 2500},
                    <ComponentModel>{"item": "TestObj3", "quantity": 1}
                ],
                "levelReqToCraft": 23,
                "expGiven": 10000,
                "no": 26,
                "tab": 2,
                "sellPrice": 167515,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA3b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat9", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TestObj3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "ForestTree", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 8}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DesertA3b", "quantity": 3},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 2500},
                        <ComponentModel>{"item": "ForestTree", "quantity": 1250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("EquipmentBows6", <RecipeModel>{
                "intID": "EquipmentBows6",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows5", "quantity": 1},
                    <ComponentModel>{"item": "TreeInterior1b", "quantity": 3},
                    <ComponentModel>{"item": "Fish4", "quantity": 1400}
                ],
                "levelReqToCraft": 23,
                "expGiven": 10000,
                "no": 27,
                "tab": 2,
                "sellPrice": 56620,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentBows3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "BirchTree", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TreeInterior1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish4", "quantity": 1400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 3},
                        <ComponentModel>{"item": "Fish4", "quantity": 1400},
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "BirchTree", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentWands6", <RecipeModel>{
                "intID": "EquipmentWands6",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentWands5", "quantity": 1},
                    <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                    <ComponentModel>{"item": "Bug4", "quantity": 4000}
                ],
                "levelReqToCraft": 23,
                "expGiven": 10000,
                "no": 28,
                "tab": 2,
                "sellPrice": 123850,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentWands5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentWands2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat7", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Sewers1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug4", "quantity": 4000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                        <ComponentModel>{"item": "Bug4", "quantity": 4000},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("EquipmentTools6", <RecipeModel>{
                "intID": "EquipmentTools6",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentTools5", "quantity": 1},
                    <ComponentModel>{"item": "PlatBar", "quantity": 800},
                    <ComponentModel>{"item": "DesertB3", "quantity": 10500}
                ],
                "levelReqToCraft": 26,
                "expGiven": 16000,
                "no": 29,
                "tab": 2,
                "sellPrice": 1899490,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentTools5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentTools3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Jungle3", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertA2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertB3", "quantity": 10500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertB3", "quantity": 10500},
                        <ComponentModel>{"item": "DesertA2", "quantity": 2500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "IronBar", "quantity": 70},
                        <ComponentModel>{"item": "Jungle3", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("MaxCapBag4", <RecipeModel>{
                "intID": "MaxCapBag4",
                "recipe": [<ComponentModel>{"item": "Plat", "quantity": 7500}, <ComponentModel>{"item": "MaxCapBag3", "quantity": 1}],
                "levelReqToCraft": 24,
                "expGiven": 9000,
                "no": 30,
                "tab": 2,
                "sellPrice": 181620,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Plat", "quantity": 7500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBag3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBag1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Copper", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBag2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Iron", "quantity": 700},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Gold", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Plat", "quantity": 7500},
                        <ComponentModel>{"item": "Gold", "quantity": 2000},
                        <ComponentModel>{"item": "Copper", "quantity": 240},
                        <ComponentModel>{"item": "Iron", "quantity": 700}
                    ]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet4", <RecipeModel>{
                "intID": "EquipmentToolsHatchet4",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentToolsHatchet2", "quantity": 1},
                    <ComponentModel>{"item": "PalmTree", "quantity": 6500},
                    <ComponentModel>{"item": "CraftMat7", "quantity": 5000}
                ],
                "levelReqToCraft": 26,
                "expGiven": 16000,
                "no": 31,
                "tab": 2,
                "sellPrice": 511200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentToolsHatchet2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentToolsHatchet1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "JungleTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat6", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertA3", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PalmTree", "quantity": 6500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat7", "quantity": 5000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PalmTree", "quantity": 6500},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 5000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "DesertA3", "quantity": 2000},
                        <ComponentModel>{"item": "JungleTree", "quantity": 200},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagT4", <RecipeModel>{
                "intID": "MaxCapBagT4",
                "recipe": [<ComponentModel>{"item": "PalmTree", "quantity": 7500}, <ComponentModel>{"item": "MaxCapBagT3", "quantity": 1}],
                "levelReqToCraft": 24,
                "expGiven": 9000,
                "no": 32,
                "tab": 2,
                "sellPrice": 174720,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "PalmTree", "quantity": 7500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagT3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBag7", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "OakTree", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBag9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "BirchTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 1, "item": "ForestTree", "quantity": 2100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PalmTree", "quantity": 7500},
                        <ComponentModel>{"item": "ForestTree", "quantity": 2100},
                        <ComponentModel>{"item": "OakTree", "quantity": 300},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 60},
                        <ComponentModel>{"item": "BirchTree", "quantity": 800}
                    ]
                }
            }),
        new RecipeBase("FishingRod5", <RecipeModel>{
                "intID": "FishingRod5",
                "recipe": [
                    <ComponentModel>{"item": "Fish4", "quantity": 2000},
                    <ComponentModel>{"item": "PlatBar", "quantity": 800},
                    <ComponentModel>{"item": "FishingRod4", "quantity": 1}
                ],
                "levelReqToCraft": 29,
                "expGiven": 29000,
                "no": 33,
                "tab": 2,
                "sellPrice": 508400,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FishingRod4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat9", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FishingRod3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish2", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish4", "quantity": 2000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "Fish2", "quantity": 3150},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagFi4", <RecipeModel>{
                "intID": "MaxCapBagFi4",
                "recipe": [
                    <ComponentModel>{"item": "Fish4", "quantity": 2500},
                    <ComponentModel>{"item": "Fish1", "quantity": 5000},
                    <ComponentModel>{"item": "MaxCapBagFi3", "quantity": 1}
                ],
                "levelReqToCraft": 27,
                "expGiven": 17000,
                "no": 34,
                "tab": 2,
                "sellPrice": 93215,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish4", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagFi3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagFi1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish1", "quantity": 360},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagFi2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish2", "quantity": 425},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish2", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish4", "quantity": 2500},
                        <ComponentModel>{"item": "Fish1", "quantity": 5360},
                        <ComponentModel>{"item": "Fish2", "quantity": 2425},
                        <ComponentModel>{"item": "PureWater", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("CatchingNet5", <RecipeModel>{
                "intID": "CatchingNet5",
                "recipe": [
                    <ComponentModel>{"item": "Bug4", "quantity": 7000},
                    <ComponentModel>{"item": "Plat", "quantity": 3000},
                    <ComponentModel>{"item": "CatchingNet4", "quantity": 1}
                ],
                "levelReqToCraft": 29,
                "expGiven": 29000,
                "no": 35,
                "tab": 2,
                "sellPrice": 255800,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug4", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Plat", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CatchingNet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CatchingNet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "ForestTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug4", "quantity": 7000},
                        <ComponentModel>{"item": "Plat", "quantity": 3000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "Bug2", "quantity": 3350},
                        <ComponentModel>{"item": "ForestTree", "quantity": 800},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagB4", <RecipeModel>{
                "intID": "MaxCapBagB4",
                "recipe": [<ComponentModel>{"item": "Bug4", "quantity": 7500}, <ComponentModel>{"item": "MaxCapBagB3", "quantity": 1}],
                "levelReqToCraft": 27,
                "expGiven": 17000,
                "no": 36,
                "tab": 2,
                "sellPrice": 173905,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug4", "quantity": 7500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagB3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagB1", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug1", "quantity": 360},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagB2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug2", "quantity": 425},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug2", "quantity": 2100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug4", "quantity": 7500},
                        <ComponentModel>{"item": "Bug2", "quantity": 2525},
                        <ComponentModel>{"item": "Bug1", "quantity": 360},
                        <ComponentModel>{"item": "PureWater", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagF4", <RecipeModel>{
                "intID": "MaxCapBagF4",
                "recipe": [
                    <ComponentModel>{"item": "FoodG3", "quantity": 9},
                    <ComponentModel>{"item": "DesertA3b", "quantity": 4},
                    <ComponentModel>{"item": "MaxCapBagF3", "quantity": 2}
                ],
                "levelReqToCraft": 28,
                "expGiven": 28000,
                "no": 37,
                "tab": 2,
                "sellPrice": 199870,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodG3", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA3b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagF3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBag8", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodHealth1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodHealth3", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 2, "item": "OakTree", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodHealth7", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodMining1", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Iron", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodPotMana1", "quantity": 2800},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodChoppin1", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 2, "item": "JungleTree", "quantity": 8400},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodPotRe1", "quantity": 4200}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodG3", "quantity": 9},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 4},
                        <ComponentModel>{"item": "FoodHealth7", "quantity": 800},
                        <ComponentModel>{"item": "FoodHealth1", "quantity": 300},
                        <ComponentModel>{"item": "FoodHealth3", "quantity": 100},
                        <ComponentModel>{"item": "OakTree", "quantity": 240},
                        <ComponentModel>{"item": "CopperBar", "quantity": 60},
                        <ComponentModel>{"item": "Iron", "quantity": 7000},
                        <ComponentModel>{"item": "FoodPotMana1", "quantity": 2800},
                        <ComponentModel>{"item": "JungleTree", "quantity": 8400},
                        <ComponentModel>{"item": "FoodPotRe1", "quantity": 4200}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagM5", <RecipeModel>{
                "intID": "MaxCapBagM5",
                "recipe": [
                    <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                    <ComponentModel>{"item": "TreeInterior1b", "quantity": 4},
                    <ComponentModel>{"item": "MaxCapBagM4", "quantity": 2}
                ],
                "levelReqToCraft": 30,
                "expGiven": 41000,
                "no": 38,
                "tab": 2,
                "sellPrice": 143460,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Sewers1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TreeInterior1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagM4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagM2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 320},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands2", "quantity": 160},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands3", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertA1b", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat7", "quantity": 3400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 4},
                        <ComponentModel>{"item": "DesertA1b", "quantity": 2},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 3400},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 320},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 160},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 120}
                    ]
                }
            }),
        new RecipeBase("EquipmentSmithingTabs3", <RecipeModel>{
                "intID": "EquipmentSmithingTabs3",
                "recipe": [
                    <ComponentModel>{"item": "PlatBar", "quantity": 2000},
                    <ComponentModel>{"item": "Fish4", "quantity": 2000},
                    <ComponentModel>{"item": "Bug4", "quantity": 2000},
                    <ComponentModel>{"item": "DesertC1", "quantity": 1500}
                ],
                "levelReqToCraft": 35,
                "expGiven": 135000,
                "no": 40,
                "tab": 2,
                "sellPrice": 1213500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "PlatBar", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertC1", "quantity": 1500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PlatBar", "quantity": 2000},
                        <ComponentModel>{"item": "Fish4", "quantity": 2000},
                        <ComponentModel>{"item": "Bug4", "quantity": 2000},
                        <ComponentModel>{"item": "DesertC1", "quantity": 1500}
                    ]
                }
            }),
        new RecipeBase("Quest13", <RecipeModel>{
                "intID": "Quest13",
                "recipe": [
                    <ComponentModel>{"item": "Fish2", "quantity": 250},
                    <ComponentModel>{"item": "DesertA2", "quantity": 400},
                    <ComponentModel>{"item": "PureWater", "quantity": 4}
                ],
                "levelReqToCraft": 18,
                "expGiven": 1500,
                "no": 41,
                "tab": 2,
                "sellPrice": 30950,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish2", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA2", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 4}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish2", "quantity": 250},
                        <ComponentModel>{"item": "DesertA2", "quantity": 400},
                        <ComponentModel>{"item": "PureWater", "quantity": 4}
                    ]
                }
            }),
        new RecipeBase("Quest35", <RecipeModel>{
                "intID": "Quest35",
                "recipe": [
                    <ComponentModel>{"item": "TreeInterior1b", "quantity": 2},
                    <ComponentModel>{"item": "PureWater", "quantity": 5},
                    <ComponentModel>{"item": "InvBag105", "quantity": 1}
                ],
                "levelReqToCraft": 17,
                "expGiven": 900,
                "no": 42,
                "tab": 2,
                "sellPrice": 2929,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "TreeInterior1b", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "InvBag105", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 2},
                        <ComponentModel>{"item": "PureWater", "quantity": 5},
                        <ComponentModel>{"item": "InvBag105", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("Bullet", <RecipeModel>{
                "intID": "Bullet",
                "recipe": [<ComponentModel>{"item": "ForestTree", "quantity": 10}, <ComponentModel>{"item": "Bug1", "quantity": 10}],
                "levelReqToCraft": 16,
                "expGiven": 1,
                "no": 43,
                "tab": 2,
                "sellPrice": 130,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "ForestTree", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug1", "quantity": 10}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "ForestTree", "quantity": 10}, <ComponentModel>{"item": "Bug1", "quantity": 10}]
                }
            }),
        new RecipeBase("BulletB", <RecipeModel>{
                "intID": "BulletB",
                "recipe": [<ComponentModel>{"item": "Gold", "quantity": 15}, <ComponentModel>{"item": "Bullet", "quantity": 2}],
                "levelReqToCraft": 20,
                "expGiven": 1,
                "no": 44,
                "tab": 2,
                "sellPrice": 455,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Gold", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bullet", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "ForestTree", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug1", "quantity": 20}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Gold", "quantity": 15},
                        <ComponentModel>{"item": "ForestTree", "quantity": 20},
                        <ComponentModel>{"item": "Bug1", "quantity": 20}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats64", <RecipeModel>{
                "intID": "EquipmentHats64",
                "recipe": [
                    <ComponentModel>{"item": "DesertA3b", "quantity": 5},
                    <ComponentModel>{"item": "PureWater", "quantity": 20},
                    <ComponentModel>{"item": "Quest35", "quantity": 1}
                ],
                "levelReqToCraft": 19,
                "expGiven": 2000,
                "no": 45,
                "tab": 2,
                "sellPrice": 4329,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA3b", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest35", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TreeInterior1b", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "InvBag105", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DesertA3b", "quantity": 5},
                        <ComponentModel>{"item": "PureWater", "quantity": 25},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 2},
                        <ComponentModel>{"item": "InvBag105", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("TestObj13", <RecipeModel>{
                "intID": "TestObj13",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats20", "quantity": 1},
                    <ComponentModel>{"item": "GoldBar", "quantity": 400},
                    <ComponentModel>{"item": "DesertA1b", "quantity": 2}
                ],
                "levelReqToCraft": 24,
                "expGiven": 7450,
                "no": 46,
                "tab": 2,
                "sellPrice": 47260,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats20", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands3", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Copper", "quantity": 80},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA1b", "quantity": 2}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GoldBar", "quantity": 400},
                        <ComponentModel>{"item": "DesertA1b", "quantity": 2},
                        <ComponentModel>{"item": "IronBar", "quantity": 15},
                        <ComponentModel>{"item": "Copper", "quantity": 80},
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats41", <RecipeModel>{
                "intID": "EquipmentHats41",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats3", "quantity": 1},
                    <ComponentModel>{"item": "PalmTree", "quantity": 2000},
                    <ComponentModel>{"item": "DesertA1b", "quantity": 2}
                ],
                "levelReqToCraft": 24,
                "expGiven": 7450,
                "no": 47,
                "tab": 2,
                "sellPrice": 41140,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands3", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat1", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PalmTree", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA1b", "quantity": 2}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PalmTree", "quantity": 2000},
                        <ComponentModel>{"item": "DesertA1b", "quantity": 2},
                        <ComponentModel>{"item": "IronBar", "quantity": 15},
                        <ComponentModel>{"item": "CraftMat1", "quantity": 40},
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats26", <RecipeModel>{
                "intID": "EquipmentHats26",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats16", "quantity": 1},
                    <ComponentModel>{"item": "Sewers1", "quantity": 4000},
                    <ComponentModel>{"item": "DesertA1b", "quantity": 2}
                ],
                "levelReqToCraft": 24,
                "expGiven": 7450,
                "no": 48,
                "tab": 2,
                "sellPrice": 121320,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats16", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Grasslands3", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 1, "item": "OakTree", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Sewers1", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA1b", "quantity": 2}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Sewers1", "quantity": 4000},
                        <ComponentModel>{"item": "DesertA1b", "quantity": 2},
                        <ComponentModel>{"item": "IronBar", "quantity": 15},
                        <ComponentModel>{"item": "OakTree", "quantity": 150},
                        <ComponentModel>{"item": "CopperBar", "quantity": 20},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts5", <RecipeModel>{
                "intID": "EquipmentShirts5",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts20", "quantity": 1},
                    <ComponentModel>{"item": "DesertA2", "quantity": 4000},
                    <ComponentModel>{"item": "DesertA3b", "quantity": 1}
                ],
                "levelReqToCraft": 26,
                "expGiven": 14700,
                "no": 50,
                "tab": 2,
                "sellPrice": 287045,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts20", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "BirchTree", "quantity": 325},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA2", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA3b", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DesertA2", "quantity": 4000},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 1},
                        <ComponentModel>{"item": "BirchTree", "quantity": 325},
                        <ComponentModel>{"item": "CopperBar", "quantity": 25},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 120},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts23", <RecipeModel>{
                "intID": "EquipmentShirts23",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts10", "quantity": 1},
                    <ComponentModel>{"item": "TreeInterior1", "quantity": 3000},
                    <ComponentModel>{"item": "DesertA3b", "quantity": 1}
                ],
                "levelReqToCraft": 26,
                "expGiven": 19000,
                "no": 51,
                "tab": 2,
                "sellPrice": 296080,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts10", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Forest1", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "IronBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TreeInterior1", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA3b", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "TreeInterior1", "quantity": 3000},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 1},
                        <ComponentModel>{"item": "Forest1", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 500}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts22", <RecipeModel>{
                "intID": "EquipmentShirts22",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts21", "quantity": 1},
                    <ComponentModel>{"item": "CraftMat9", "quantity": 1500},
                    <ComponentModel>{"item": "DesertA3b", "quantity": 1}
                ],
                "levelReqToCraft": 26,
                "expGiven": 14700,
                "no": 52,
                "tab": 2,
                "sellPrice": 90280,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts21", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat9", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA3b", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentShirts21", "quantity": 1},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 1500},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes16", <RecipeModel>{
                "intID": "EquipmentShoes16",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes3", "quantity": 1},
                    <ComponentModel>{"item": "PureWater", "quantity": 9},
                    <ComponentModel>{"item": "Copper", "quantity": 1500},
                    <ComponentModel>{"item": "Iron", "quantity": 1200}
                ],
                "levelReqToCraft": 22,
                "expGiven": 5500,
                "no": 53,
                "tab": 2,
                "sellPrice": 93075,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Copper", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Iron", "quantity": 1200}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PureWater", "quantity": 13},
                        <ComponentModel>{"item": "Copper", "quantity": 1500},
                        <ComponentModel>{"item": "Iron", "quantity": 1200},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes18", <RecipeModel>{
                "intID": "EquipmentShoes18",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes3", "quantity": 1},
                    <ComponentModel>{"item": "PureWater", "quantity": 9},
                    <ComponentModel>{"item": "Fish1", "quantity": 1250},
                    <ComponentModel>{"item": "Fish2", "quantity": 1000}
                ],
                "levelReqToCraft": 24,
                "expGiven": 6500,
                "no": 54,
                "tab": 2,
                "sellPrice": 96175,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish1", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish2", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PureWater", "quantity": 13},
                        <ComponentModel>{"item": "Fish1", "quantity": 1250},
                        <ComponentModel>{"item": "Fish2", "quantity": 1000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes17", <RecipeModel>{
                "intID": "EquipmentShoes17",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes3", "quantity": 1},
                    <ComponentModel>{"item": "PureWater", "quantity": 9},
                    <ComponentModel>{"item": "JungleTree", "quantity": 1600},
                    <ComponentModel>{"item": "ForestTree", "quantity": 1000}
                ],
                "levelReqToCraft": 22,
                "expGiven": 5000,
                "no": 55,
                "tab": 2,
                "sellPrice": 99775,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 0, "item": "JungleTree", "quantity": 1600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "ForestTree", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PureWater", "quantity": 13},
                        <ComponentModel>{"item": "JungleTree", "quantity": 1600},
                        <ComponentModel>{"item": "ForestTree", "quantity": 1000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes19", <RecipeModel>{
                "intID": "EquipmentShoes19",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes3", "quantity": 1},
                    <ComponentModel>{"item": "PureWater", "quantity": 9},
                    <ComponentModel>{"item": "Bug1", "quantity": 2000},
                    <ComponentModel>{"item": "Bug2", "quantity": 1250}
                ],
                "levelReqToCraft": 24,
                "expGiven": 6500,
                "no": 56,
                "tab": 2,
                "sellPrice": 97425,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug1", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug2", "quantity": 1250}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "PureWater", "quantity": 13},
                        <ComponentModel>{"item": "Bug1", "quantity": 2000},
                        <ComponentModel>{"item": "Bug2", "quantity": 1250},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("FoodFish1", <RecipeModel>{
                "intID": "FoodFish1",
                "recipe": [<ComponentModel>{"item": "Fish2", "quantity": 5}, <ComponentModel>{"item": "FoodPotOr2", "quantity": 2}],
                "levelReqToCraft": 24,
                "expGiven": 15,
                "no": 57,
                "tab": 2,
                "sellPrice": 105,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodPotOr2", "quantity": 2}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Fish2", "quantity": 5}, <ComponentModel>{"item": "FoodPotOr2", "quantity": 2}]
                }
            }),
        new RecipeBase("FoodCatch1", <RecipeModel>{
                "intID": "FoodCatch1",
                "recipe": [<ComponentModel>{"item": "Bug2", "quantity": 5}, <ComponentModel>{"item": "FoodHealth6", "quantity": 1}],
                "levelReqToCraft": 24,
                "expGiven": 15,
                "no": 58,
                "tab": 2,
                "sellPrice": 93,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth6", "quantity": 1}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Bug2", "quantity": 5}, <ComponentModel>{"item": "FoodHealth6", "quantity": 1}]
                }
            }),
        new RecipeBase("Quest36", <RecipeModel>{
                "intID": "Quest36",
                "recipe": [
                    <ComponentModel>{"item": "Quest37", "quantity": 1},
                    <ComponentModel>{"item": "GoldBar", "quantity": 80},
                    <ComponentModel>{"item": "DesertC2b", "quantity": 5}
                ],
                "levelReqToCraft": 21,
                "expGiven": 2500,
                "no": 59,
                "tab": 2,
                "sellPrice": 30000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest37", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GoldBar", "quantity": 80},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertC2b", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Quest37", "quantity": 1},
                        <ComponentModel>{"item": "GoldBar", "quantity": 80},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 5}
                    ]
                }
            }),
        new RecipeBase("InvBag103", <RecipeModel>{
                "intID": "InvBag103",
                "recipe": [
                    <ComponentModel>{"item": "Sewers1b", "quantity": 1},
                    <ComponentModel>{"item": "InvBag100", "quantity": 1},
                    <ComponentModel>{"item": "DesertA1", "quantity": 777}
                ],
                "levelReqToCraft": 18,
                "expGiven": 1200,
                "no": 60,
                "tab": 2,
                "sellPrice": 48420,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Sewers1b", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "InvBag100", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA1", "quantity": 777}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Sewers1b", "quantity": 1},
                        <ComponentModel>{"item": "InvBag100", "quantity": 1},
                        <ComponentModel>{"item": "DesertA1", "quantity": 777}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats52", <RecipeModel>{
                "intID": "EquipmentHats52",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants19", "quantity": 1},
                    <ComponentModel>{"item": "EfauntDrop1", "quantity": 20},
                    <ComponentModel>{"item": "StoneA3b", "quantity": 2},
                    <ComponentModel>{"item": "Quest36", "quantity": 3}
                ],
                "levelReqToCraft": 43,
                "expGiven": 250000,
                "no": 61,
                "tab": 2,
                "sellPrice": 120220,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EfauntDrop1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StoneA3b", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest36", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Quest37", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertC2b", "quantity": 15}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentPants19", "quantity": 1},
                        <ComponentModel>{"item": "EfauntDrop1", "quantity": 20},
                        <ComponentModel>{"item": "StoneA3b", "quantity": 2},
                        <ComponentModel>{"item": "Quest37", "quantity": 3},
                        <ComponentModel>{"item": "GoldBar", "quantity": 240},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 15}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts26", <RecipeModel>{
                "intID": "EquipmentShirts26",
                "recipe": [
                    <ComponentModel>{"item": "EfauntDrop1", "quantity": 10},
                    <ComponentModel>{"item": "MidnightCookie", "quantity": 10},
                    <ComponentModel>{"item": "PureWater", "quantity": 25}
                ],
                "levelReqToCraft": 39,
                "expGiven": 50000,
                "no": 62,
                "tab": 2,
                "sellPrice": 4260,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EfauntDrop1", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MidnightCookie", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 25}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EfauntDrop1", "quantity": 10},
                        <ComponentModel>{"item": "MidnightCookie", "quantity": 10},
                        <ComponentModel>{"item": "PureWater", "quantity": 25}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants20", <RecipeModel>{
                "intID": "EquipmentPants20",
                "recipe": [
                    <ComponentModel>{"item": "EfauntDrop1", "quantity": 7},
                    <ComponentModel>{"item": "Hgg", "quantity": 3},
                    <ComponentModel>{"item": "PureWater", "quantity": 25}
                ],
                "levelReqToCraft": 37,
                "expGiven": 40000,
                "no": 63,
                "tab": 2,
                "sellPrice": 1260,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EfauntDrop1", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Hgg", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 25}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EfauntDrop1", "quantity": 7},
                        <ComponentModel>{"item": "Hgg", "quantity": 3},
                        <ComponentModel>{"item": "PureWater", "quantity": 25}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes21", <RecipeModel>{
                "intID": "EquipmentShoes21",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes4", "quantity": 1},
                    <ComponentModel>{"item": "EfauntDrop1", "quantity": 5},
                    <ComponentModel>{"item": "DesertA3b", "quantity": 3}
                ],
                "levelReqToCraft": 32,
                "expGiven": 25000,
                "no": 64,
                "tab": 2,
                "sellPrice": 261970,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EfauntDrop1", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertA3b", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EfauntDrop1", "quantity": 5},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 3},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentRings16", <RecipeModel>{
                "intID": "EquipmentRings16",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPunching3", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentBows6", "quantity": 1},
                    <ComponentModel>{"item": "EfauntDrop2", "quantity": 4},
                    <ComponentModel>{"item": "EfauntDrop1", "quantity": 15}
                ],
                "levelReqToCraft": 45,
                "expGiven": 500000,
                "no": 65,
                "tab": 2,
                "sellPrice": 103229,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPunching3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPunching2", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 2, "item": "OakTree", "quantity": 225},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat3", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "ToiletTree", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentBows5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentBows3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 3, "item": "BirchTree", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TreeInterior1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish4", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EfauntDrop2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EfauntDrop1", "quantity": 15}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EfauntDrop2", "quantity": 4},
                        <ComponentModel>{"item": "EfauntDrop1", "quantity": 15},
                        <ComponentModel>{"item": "CraftMat3", "quantity": 5000},
                        <ComponentModel>{"item": "ToiletTree", "quantity": 2000},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 3},
                        <ComponentModel>{"item": "Fish4", "quantity": 1400},
                        <ComponentModel>{"item": "CopperBar", "quantity": 60},
                        <ComponentModel>{"item": "OakTree", "quantity": 225},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 60},
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "BirchTree", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentRings27", <RecipeModel>{
                "intID": "EquipmentRings27",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentRings11", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentPants19", "quantity": 1},
                    <ComponentModel>{"item": "PureWater", "quantity": 35}
                ],
                "levelReqToCraft": 38,
                "expGiven": 15,
                "no": 66,
                "tab": 2,
                "sellPrice": 44700,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish1", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Sewers1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 35}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentPants19", "quantity": 1},
                        <ComponentModel>{"item": "PureWater", "quantity": 50},
                        <ComponentModel>{"item": "Fish1", "quantity": 10000},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 4}
                    ]
                }
            }),
        new RecipeBase("EquipmentPendant27", <RecipeModel>{
                "intID": "EquipmentPendant27",
                "recipe": [<ComponentModel>{"item": "EquipmentPendant20", "quantity": 1}, <ComponentModel>{"item": "PureWater", "quantity": 60}],
                "levelReqToCraft": 38,
                "expGiven": 2500,
                "no": 67,
                "tab": 2,
                "sellPrice": 3001,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPendant20", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 60}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "EquipmentPendant20", "quantity": 1}, <ComponentModel>{"item": "PureWater", "quantity": 60}]
                }
            }),
        new RecipeBase("TrapBoxSet3", <RecipeModel>{
                "intID": "TrapBoxSet3",
                "recipe": [<ComponentModel>{"item": "Critter2A", "quantity": 2}, <ComponentModel>{"item": "Refinery1", "quantity": 20}],
                "levelReqToCraft": 29,
                "expGiven": 4000,
                "no": 69,
                "tab": 2,
                "sellPrice": 6000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter2A", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 20}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Critter2A", "quantity": 2}, <ComponentModel>{"item": "Refinery1", "quantity": 20}]
                }
            }),
        new RecipeBase("MaxCapBagTr3", <RecipeModel>{
                "intID": "MaxCapBagTr3",
                "recipe": [<ComponentModel>{"item": "Critter2", "quantity": 1000}, <ComponentModel>{"item": "Refinery1", "quantity": 15}],
                "levelReqToCraft": 28,
                "expGiven": 4000,
                "no": 70,
                "tab": 2,
                "sellPrice": 6500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter2", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 15}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Critter2", "quantity": 1000}, <ComponentModel>{"item": "Refinery1", "quantity": 15}]
                }
            }),
        new RecipeBase("WorshipSkull3", <RecipeModel>{
                "intID": "WorshipSkull3",
                "recipe": [<ComponentModel>{"item": "Soul2", "quantity": 1200}, <ComponentModel>{"item": "Refinery1", "quantity": 25}],
                "levelReqToCraft": 29,
                "expGiven": 4000,
                "no": 71,
                "tab": 2,
                "sellPrice": 13300,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul2", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 25}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Soul2", "quantity": 1200}, <ComponentModel>{"item": "Refinery1", "quantity": 25}]
                }
            }),
        new RecipeBase("MaxCapBagS3", <RecipeModel>{
                "intID": "MaxCapBagS3",
                "recipe": [<ComponentModel>{"item": "Soul2", "quantity": 1500}, <ComponentModel>{"item": "Refinery1", "quantity": 20}],
                "levelReqToCraft": 28,
                "expGiven": 4000,
                "no": 72,
                "tab": 2,
                "sellPrice": 15500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul2", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 20}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Soul2", "quantity": 1500}, <ComponentModel>{"item": "Refinery1", "quantity": 20}]
                }
            }),
        new RecipeBase("BadgeD1", <RecipeModel>{
                "intID": "BadgeD1",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken28", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken29", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken30", "quantity": 1}
                ],
                "levelReqToCraft": 30,
                "expGiven": 4000,
                "no": 73,
                "tab": 2,
                "sellPrice": 199000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken28", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken16", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken29", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken20", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken21", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken27", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken30", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken25", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken26", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken23", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken16", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken17", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken18", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken19", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken20", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken21", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken22", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken27", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken24", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken25", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken26", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken23", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("BadgeD2", <RecipeModel>{
                "intID": "BadgeD2",
                "recipe": [
                    <ComponentModel>{"item": "Fish4", "quantity": 4000},
                    <ComponentModel>{"item": "Bug4", "quantity": 8000},
                    <ComponentModel>{"item": "PureWater2", "quantity": 50}
                ],
                "levelReqToCraft": 30,
                "expGiven": 4000,
                "no": 74,
                "tab": 2,
                "sellPrice": 234500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish4", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug4", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 50}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish4", "quantity": 4000},
                        <ComponentModel>{"item": "Bug4", "quantity": 8000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 50}
                    ]
                }
            }),
        new RecipeBase("BadgeD3", <RecipeModel>{
                "intID": "BadgeD3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats52", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentPendant14", "quantity": 1},
                    <ComponentModel>{"item": "Hgg", "quantity": 13},
                    <ComponentModel>{"item": "DesertC2b", "quantity": 100}
                ],
                "levelReqToCraft": 30,
                "expGiven": 4000,
                "no": 75,
                "tab": 2,
                "sellPrice": 146233,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats52", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPants19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EfauntDrop1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StoneA3b", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Quest36", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Quest37", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertC2b", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPendant14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Hgg", "quantity": 13},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertC2b", "quantity": 100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentPendant14", "quantity": 1},
                        <ComponentModel>{"item": "Hgg", "quantity": 13},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 115},
                        <ComponentModel>{"item": "EquipmentPants19", "quantity": 1},
                        <ComponentModel>{"item": "EfauntDrop1", "quantity": 20},
                        <ComponentModel>{"item": "StoneA3b", "quantity": 2},
                        <ComponentModel>{"item": "Quest37", "quantity": 3},
                        <ComponentModel>{"item": "GoldBar", "quantity": 240}
                    ]
                }
            }),
        new RecipeBase("ResetCompletedS", <RecipeModel>{
                "intID": "ResetCompletedS",
                "recipe": [<ComponentModel>{"item": "ResetFrag", "quantity": 25}, <ComponentModel>{"item": "PureWater", "quantity": 5}],
                "levelReqToCraft": 28,
                "expGiven": 4000,
                "no": 76,
                "tab": 2,
                "sellPrice": 5250,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "ResetFrag", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 5}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "ResetFrag", "quantity": 25}, <ComponentModel>{"item": "PureWater", "quantity": 5}]
                }
            }),
        new RecipeBase("NPCtoken28", <RecipeModel>{
                "intID": "NPCtoken28",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken16", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken17", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken18", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken19", "quantity": 1}
                ],
                "levelReqToCraft": 30,
                "expGiven": 4000,
                "no": 77,
                "tab": 2,
                "sellPrice": 16000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken16", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken19", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken16", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken17", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken18", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken19", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("NPCtoken29", <RecipeModel>{
                "intID": "NPCtoken29",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken20", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken21", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken22", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken27", "quantity": 1}
                ],
                "levelReqToCraft": 30,
                "expGiven": 4000,
                "no": 78,
                "tab": 2,
                "sellPrice": 167000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken20", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken21", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken27", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken20", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken21", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken22", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken27", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("NPCtoken30", <RecipeModel>{
                "intID": "NPCtoken30",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken24", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken25", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken26", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken23", "quantity": 1}
                ],
                "levelReqToCraft": 30,
                "expGiven": 4000,
                "no": 79,
                "tab": 2,
                "sellPrice": 16000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken25", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken26", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken23", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken24", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken25", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken26", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken23", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats53", <RecipeModel>{
                "intID": "EquipmentHats53",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats19", "quantity": 1},
                    <ComponentModel>{"item": "Critter1", "quantity": 5000},
                    <ComponentModel>{"item": "DementiaBar", "quantity": 300}
                ],
                "levelReqToCraft": 36,
                "expGiven": 100000,
                "no": 1,
                "tab": 3,
                "sellPrice": 851500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DementiaBar", "quantity": 300}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts15", <RecipeModel>{
                "intID": "EquipmentShirts15",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts14", "quantity": 1},
                    <ComponentModel>{"item": "Soul1", "quantity": 1000},
                    <ComponentModel>{"item": "DementiaBar", "quantity": 350}
                ],
                "levelReqToCraft": 37,
                "expGiven": 120000,
                "no": 2,
                "tab": 3,
                "sellPrice": 1661400,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 2, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DementiaBar", "quantity": 350}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants6", <RecipeModel>{
                "intID": "EquipmentPants6",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants5", "quantity": 1},
                    <ComponentModel>{"item": "SnowA1", "quantity": 8000},
                    <ComponentModel>{"item": "DementiaBar", "quantity": 400}
                ],
                "levelReqToCraft": 38,
                "expGiven": 150000,
                "no": 3,
                "tab": 3,
                "sellPrice": 2861065,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPants3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "IronBar", "quantity": 170},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat6", "quantity": 225},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug3", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PlatBar", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA1", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DementiaBar", "quantity": 400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowA1", "quantity": 8000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 400},
                        <ComponentModel>{"item": "Bug3", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1250},
                        <ComponentModel>{"item": "IronBar", "quantity": 170},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 225}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes5", <RecipeModel>{
                "intID": "EquipmentShoes5",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes4", "quantity": 1},
                    <ComponentModel>{"item": "Critter1A", "quantity": 3},
                    <ComponentModel>{"item": "DementiaBar", "quantity": 500}
                ],
                "levelReqToCraft": 39,
                "expGiven": 200000,
                "no": 4,
                "tab": 3,
                "sellPrice": 1012025,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DementiaBar", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentPunching4", <RecipeModel>{
                "intID": "EquipmentPunching4",
                "recipe": [<ComponentModel>{"item": "EquipmentPunching3", "quantity": 2}, <ComponentModel>{"item": "SnowA2", "quantity": 70000}],
                "levelReqToCraft": 40,
                "expGiven": 3,
                "no": 5,
                "tab": 3,
                "sellPrice": 15143180,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPunching3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPunching2", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CopperBar", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 2, "item": "OakTree", "quantity": 450},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat5", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat3", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "ToiletTree", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA2", "quantity": 70000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowA2", "quantity": 70000},
                        <ComponentModel>{"item": "CraftMat3", "quantity": 10000},
                        <ComponentModel>{"item": "ToiletTree", "quantity": 4000},
                        <ComponentModel>{"item": "CopperBar", "quantity": 120},
                        <ComponentModel>{"item": "OakTree", "quantity": 450},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 120}
                    ]
                }
            }),
        new RecipeBase("EquipmentSword2", <RecipeModel>{
                "intID": "EquipmentSword2",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentSword1", "quantity": 1},
                    <ComponentModel>{"item": "SnowA2", "quantity": 25000},
                    <ComponentModel>{"item": "Refinery1", "quantity": 150}
                ],
                "levelReqToCraft": 39,
                "expGiven": 200000,
                "no": 6,
                "tab": 3,
                "sellPrice": 5557515,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentSword1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertA3b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat9", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TestObj3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "ForestTree", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 2, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA2", "quantity": 25000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowA2", "quantity": 25000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 3},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 2500},
                        <ComponentModel>{"item": "ForestTree", "quantity": 1250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("EquipmentBows7", <RecipeModel>{
                "intID": "EquipmentBows7",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows6", "quantity": 1},
                    <ComponentModel>{"item": "Soul1", "quantity": 7000},
                    <ComponentModel>{"item": "Refinery1", "quantity": 150}
                ],
                "levelReqToCraft": 39,
                "expGiven": 200000,
                "no": 7,
                "tab": 3,
                "sellPrice": 92620,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentBows5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentBows3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 3, "item": "BirchTree", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TreeInterior1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish4", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul1", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul1", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 3},
                        <ComponentModel>{"item": "Fish4", "quantity": 1400},
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "BirchTree", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentWands3", <RecipeModel>{
                "intID": "EquipmentWands3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentWands6", "quantity": 1},
                    <ComponentModel>{"item": "SaharanFoal", "quantity": 10000},
                    <ComponentModel>{"item": "Refinery1", "quantity": 150}
                ],
                "levelReqToCraft": 39,
                "expGiven": 200000,
                "no": 8,
                "tab": 3,
                "sellPrice": 438850,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentWands6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentWands5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentWands2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat7", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Sewers1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug4", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SaharanFoal", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 10000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                        <ComponentModel>{"item": "Bug4", "quantity": 4000},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("EquipmentTools7", <RecipeModel>{
                "intID": "EquipmentTools7",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentTools6", "quantity": 1},
                    <ComponentModel>{"item": "DementiaBar", "quantity": 275},
                    <ComponentModel>{"item": "SnowA3", "quantity": 15000}
                ],
                "levelReqToCraft": 38,
                "expGiven": 150000,
                "no": 9,
                "tab": 3,
                "sellPrice": 6061990,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentTools6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentTools5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentTools3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Jungle3", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertA2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertB3", "quantity": 10500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DementiaBar", "quantity": 275},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA3", "quantity": 15000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DementiaBar", "quantity": 275},
                        <ComponentModel>{"item": "SnowA3", "quantity": 15000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertB3", "quantity": 10500},
                        <ComponentModel>{"item": "DesertA2", "quantity": 2500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "IronBar", "quantity": 70},
                        <ComponentModel>{"item": "Jungle3", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("MaxCapBag5", <RecipeModel>{
                "intID": "MaxCapBag5",
                "recipe": [<ComponentModel>{"item": "Dementia", "quantity": 17500}, <ComponentModel>{"item": "MaxCapBag4", "quantity": 2}],
                "levelReqToCraft": 35,
                "expGiven": 65000,
                "no": 10,
                "tab": 3,
                "sellPrice": 975740,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Dementia", "quantity": 17500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBag4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Plat", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBag3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBag1", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Copper", "quantity": 480},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBag2", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Iron", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Gold", "quantity": 4000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Dementia", "quantity": 17500},
                        <ComponentModel>{"item": "Plat", "quantity": 15000},
                        <ComponentModel>{"item": "Gold", "quantity": 4000},
                        <ComponentModel>{"item": "Copper", "quantity": 480},
                        <ComponentModel>{"item": "Iron", "quantity": 1400}
                    ]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet5", <RecipeModel>{
                "intID": "EquipmentToolsHatchet5",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentToolsHatchet4", "quantity": 1},
                    <ComponentModel>{"item": "SaharanFoal", "quantity": 15000},
                    <ComponentModel>{"item": "Refinery1", "quantity": 50}
                ],
                "levelReqToCraft": 38,
                "expGiven": 150000,
                "no": 11,
                "tab": 3,
                "sellPrice": 966200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentToolsHatchet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentToolsHatchet2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentToolsHatchet1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "JungleTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat6", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertA3", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PalmTree", "quantity": 6500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat7", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SaharanFoal", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 50}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "PalmTree", "quantity": 6500},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 5000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "DesertA3", "quantity": 2000},
                        <ComponentModel>{"item": "JungleTree", "quantity": 200},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagT5", <RecipeModel>{
                "intID": "MaxCapBagT5",
                "recipe": [<ComponentModel>{"item": "SaharanFoal", "quantity": 20000}, <ComponentModel>{"item": "MaxCapBagT4", "quantity": 2}],
                "levelReqToCraft": 35,
                "expGiven": 65000,
                "no": 12,
                "tab": 3,
                "sellPrice": 949440,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "SaharanFoal", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagT4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PalmTree", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagT3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBag7", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "OakTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBag9", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 3, "item": "BirchTree", "quantity": 1600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "ForestTree", "quantity": 4200}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 20000},
                        <ComponentModel>{"item": "PalmTree", "quantity": 15000},
                        <ComponentModel>{"item": "ForestTree", "quantity": 4200},
                        <ComponentModel>{"item": "OakTree", "quantity": 600},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 120},
                        <ComponentModel>{"item": "BirchTree", "quantity": 1600}
                    ]
                }
            }),
        new RecipeBase("FishingRod6", <RecipeModel>{
                "intID": "FishingRod6",
                "recipe": [
                    <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                    <ComponentModel>{"item": "Refinery1", "quantity": 50},
                    <ComponentModel>{"item": "FishingRod5", "quantity": 1}
                ],
                "levelReqToCraft": 38,
                "expGiven": 150000,
                "no": 13,
                "tab": 3,
                "sellPrice": 963400,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FishingRod5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FishingRod4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat9", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FishingRod3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish2", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Fish4", "quantity": 2000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "Fish2", "quantity": 3150},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagFi5", <RecipeModel>{
                "intID": "MaxCapBagFi5",
                "recipe": [
                    <ComponentModel>{"item": "Critter3A", "quantity": 4},
                    <ComponentModel>{"item": "Refinery1", "quantity": 50},
                    <ComponentModel>{"item": "MaxCapBagFi4", "quantity": 2}
                ],
                "levelReqToCraft": 35,
                "expGiven": 65000,
                "no": 14,
                "tab": 3,
                "sellPrice": 191470,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter3A", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagFi4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish1", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagFi3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagFi1", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish1", "quantity": 720},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagFi2", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish2", "quantity": 4000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter3A", "quantity": 4},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Fish4", "quantity": 5000},
                        <ComponentModel>{"item": "Fish1", "quantity": 10720},
                        <ComponentModel>{"item": "Fish2", "quantity": 4850},
                        <ComponentModel>{"item": "PureWater", "quantity": 4}
                    ]
                }
            }),
        new RecipeBase("CatchingNet6", <RecipeModel>{
                "intID": "CatchingNet6",
                "recipe": [
                    <ComponentModel>{"item": "Bug5", "quantity": 15000},
                    <ComponentModel>{"item": "Refinery1", "quantity": 50},
                    <ComponentModel>{"item": "CatchingNet5", "quantity": 1}
                ],
                "levelReqToCraft": 38,
                "expGiven": 150000,
                "no": 15,
                "tab": 3,
                "sellPrice": 740800,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug5", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CatchingNet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug4", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Plat", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CatchingNet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CatchingNet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "ForestTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug5", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Bug4", "quantity": 7000},
                        <ComponentModel>{"item": "Plat", "quantity": 3000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "Bug2", "quantity": 3350},
                        <ComponentModel>{"item": "ForestTree", "quantity": 800},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagB5", <RecipeModel>{
                "intID": "MaxCapBagB5",
                "recipe": [<ComponentModel>{"item": "Bug5", "quantity": 10000}, <ComponentModel>{"item": "MaxCapBagB4", "quantity": 2}],
                "levelReqToCraft": 35,
                "expGiven": 65000,
                "no": 16,
                "tab": 3,
                "sellPrice": 667810,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug5", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagB4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug4", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagB3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagB1", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug1", "quantity": 720},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagB2", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug2", "quantity": 4200}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug5", "quantity": 10000},
                        <ComponentModel>{"item": "Bug4", "quantity": 15000},
                        <ComponentModel>{"item": "Bug2", "quantity": 5050},
                        <ComponentModel>{"item": "Bug1", "quantity": 720},
                        <ComponentModel>{"item": "PureWater", "quantity": 4}
                    ]
                }
            }),
        new RecipeBase("TrapBoxSet4", <RecipeModel>{
                "intID": "TrapBoxSet4",
                "recipe": [
                    <ComponentModel>{"item": "Critter4A", "quantity": 5},
                    <ComponentModel>{"item": "Refinery1", "quantity": 50},
                    <ComponentModel>{"item": "TrapBoxSet3", "quantity": 1}
                ],
                "levelReqToCraft": 40,
                "expGiven": 225000,
                "no": 17,
                "tab": 3,
                "sellPrice": 11015,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter4A", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrapBoxSet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter2A", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 20}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter4A", "quantity": 5},
                        <ComponentModel>{"item": "Refinery1", "quantity": 70},
                        <ComponentModel>{"item": "Critter2A", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagTr4", <RecipeModel>{
                "intID": "MaxCapBagTr4",
                "recipe": [<ComponentModel>{"item": "Critter4", "quantity": 10000}, <ComponentModel>{"item": "MaxCapBagTr3", "quantity": 2}],
                "levelReqToCraft": 37,
                "expGiven": 80000,
                "no": 18,
                "tab": 3,
                "sellPrice": 163000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter4", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagTr3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter2", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 30}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter4", "quantity": 10000},
                        <ComponentModel>{"item": "Critter2", "quantity": 2000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 30}
                    ]
                }
            }),
        new RecipeBase("WorshipSkull4", <RecipeModel>{
                "intID": "WorshipSkull4",
                "recipe": [
                    <ComponentModel>{"item": "Soul3", "quantity": 7000},
                    <ComponentModel>{"item": "Refinery1", "quantity": 50},
                    <ComponentModel>{"item": "WorshipSkull3", "quantity": 1}
                ],
                "levelReqToCraft": 40,
                "expGiven": 225000,
                "no": 19,
                "tab": 3,
                "sellPrice": 158300,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul3", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "WorshipSkull3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul2", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 25}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul3", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 75},
                        <ComponentModel>{"item": "Soul2", "quantity": 1200}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagS4", <RecipeModel>{
                "intID": "MaxCapBagS4",
                "recipe": [<ComponentModel>{"item": "Soul3", "quantity": 8000}, <ComponentModel>{"item": "MaxCapBagS3", "quantity": 2}],
                "levelReqToCraft": 37,
                "expGiven": 80000,
                "no": 20,
                "tab": 3,
                "sellPrice": 191000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul3", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagS3", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul2", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 40}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul3", "quantity": 8000},
                        <ComponentModel>{"item": "Soul2", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 40}
                    ]
                }
            }),
        new RecipeBase("EquipmentRings28", <RecipeModel>{
                "intID": "EquipmentRings28",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentRings13", "quantity": 1},
                    <ComponentModel>{"item": "MidnightCookie", "quantity": 30},
                    <ComponentModel>{"item": "PureWater2", "quantity": 20},
                    <ComponentModel>{"item": "Refinery3", "quantity": 400}
                ],
                "levelReqToCraft": 45,
                "expGiven": 1,
                "no": 21,
                "tab": 3,
                "sellPrice": 55000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings13", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MidnightCookie", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery3", "quantity": 400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentRings13", "quantity": 1},
                        <ComponentModel>{"item": "MidnightCookie", "quantity": 30},
                        <ComponentModel>{"item": "PureWater2", "quantity": 20},
                        <ComponentModel>{"item": "Refinery3", "quantity": 400}
                    ]
                }
            }),
        new RecipeBase("EquipmentRings29", <RecipeModel>{
                "intID": "EquipmentRings29",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentRings13", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentKeychain24", "quantity": 1},
                    <ComponentModel>{"item": "PureWater2", "quantity": 20},
                    <ComponentModel>{"item": "Refinery3", "quantity": 400}
                ],
                "levelReqToCraft": 45,
                "expGiven": 1,
                "no": 22,
                "tab": 3,
                "sellPrice": 46200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings13", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentKeychain24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery3", "quantity": 400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentRings13", "quantity": 1},
                        <ComponentModel>{"item": "EquipmentKeychain24", "quantity": 1},
                        <ComponentModel>{"item": "PureWater2", "quantity": 20},
                        <ComponentModel>{"item": "Refinery3", "quantity": 400}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagF5", <RecipeModel>{
                "intID": "MaxCapBagF5",
                "recipe": [
                    <ComponentModel>{"item": "FoodFish1", "quantity": 1500},
                    <ComponentModel>{"item": "FoodCatch1", "quantity": 1500},
                    <ComponentModel>{"item": "FoodHealth9", "quantity": 10000},
                    <ComponentModel>{"item": "MaxCapBagF4", "quantity": 2}
                ],
                "levelReqToCraft": 39,
                "expGiven": 100000,
                "no": 23,
                "tab": 3,
                "sellPrice": 2596740,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodFish1", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish2", "quantity": 7500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodPotOr2", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodCatch1", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug2", "quantity": 7500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodHealth6", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth9", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagF4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodG3", "quantity": 18},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertA3b", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagF3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBag8", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FoodHealth1", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FoodHealth3", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 3, "item": "OakTree", "quantity": 480},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodHealth7", "quantity": 1600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodMining1", "quantity": 2800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Iron", "quantity": 14000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FoodPotMana1", "quantity": 5600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodChoppin1", "quantity": 2800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "JungleTree", "quantity": 16800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FoodPotRe1", "quantity": 8400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodHealth9", "quantity": 10000},
                        <ComponentModel>{"item": "Fish2", "quantity": 7500},
                        <ComponentModel>{"item": "FoodPotOr2", "quantity": 3000},
                        <ComponentModel>{"item": "Bug2", "quantity": 7500},
                        <ComponentModel>{"item": "FoodHealth6", "quantity": 1500},
                        <ComponentModel>{"item": "FoodG3", "quantity": 18},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 8},
                        <ComponentModel>{"item": "FoodHealth7", "quantity": 1600},
                        <ComponentModel>{"item": "FoodHealth1", "quantity": 600},
                        <ComponentModel>{"item": "FoodHealth3", "quantity": 200},
                        <ComponentModel>{"item": "OakTree", "quantity": 480},
                        <ComponentModel>{"item": "CopperBar", "quantity": 120},
                        <ComponentModel>{"item": "Iron", "quantity": 14000},
                        <ComponentModel>{"item": "FoodPotMana1", "quantity": 5600},
                        <ComponentModel>{"item": "JungleTree", "quantity": 16800},
                        <ComponentModel>{"item": "FoodPotRe1", "quantity": 8400}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagM6", <RecipeModel>{
                "intID": "MaxCapBagM6",
                "recipe": [
                    <ComponentModel>{"item": "SnowB1", "quantity": 15000},
                    <ComponentModel>{"item": "SnowB2a", "quantity": 3},
                    <ComponentModel>{"item": "MaxCapBagM5", "quantity": 2}
                ],
                "levelReqToCraft": 39,
                "expGiven": 100000,
                "no": 24,
                "tab": 3,
                "sellPrice": 4346370,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowB1", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowB2a", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagM5", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Sewers1b", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TreeInterior1b", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagM4", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagM2", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 640},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Grasslands2", "quantity": 320},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Grasslands3", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertA1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat7", "quantity": 6800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowB1", "quantity": 15000},
                        <ComponentModel>{"item": "SnowB2a", "quantity": 3},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 6},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 8},
                        <ComponentModel>{"item": "DesertA1b", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 6800},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 640},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 320},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 240}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats54", <RecipeModel>{
                "intID": "EquipmentHats54",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats53", "quantity": 1},
                    <ComponentModel>{"item": "Refinery3", "quantity": 500},
                    <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                    <ComponentModel>{"item": "PureWater2", "quantity": 5}
                ],
                "levelReqToCraft": 43,
                "expGiven": 275000,
                "no": 25,
                "tab": 3,
                "sellPrice": 7101750,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts27", <RecipeModel>{
                "intID": "EquipmentShirts27",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts15", "quantity": 1},
                    <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                    <ComponentModel>{"item": "VoidBar", "quantity": 500},
                    <ComponentModel>{"item": "PureWater2", "quantity": 4}
                ],
                "levelReqToCraft": 44,
                "expGiven": 300000,
                "no": 26,
                "tab": 3,
                "sellPrice": 36636600,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 3, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DementiaBar", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC3", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "VoidBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 4}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 500},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants21", <RecipeModel>{
                "intID": "EquipmentPants21",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants6", "quantity": 1},
                    <ComponentModel>{"item": "Tree7", "quantity": 75000},
                    <ComponentModel>{"item": "VoidBar", "quantity": 650},
                    <ComponentModel>{"item": "PureWater2", "quantity": 4}
                ],
                "levelReqToCraft": 45,
                "expGiven": 370000,
                "no": 27,
                "tab": 3,
                "sellPrice": 9891265,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPants5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentPants3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 170},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat6", "quantity": 225},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug3", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PlatBar", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowA1", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DementiaBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree7", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "VoidBar", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 4}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree7", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 650},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "SnowA1", "quantity": 8000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 400},
                        <ComponentModel>{"item": "Bug3", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1250},
                        <ComponentModel>{"item": "IronBar", "quantity": 170},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 225}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes22", <RecipeModel>{
                "intID": "EquipmentShoes22",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes5", "quantity": 1},
                    <ComponentModel>{"item": "Bug6", "quantity": 60000},
                    <ComponentModel>{"item": "VoidBar", "quantity": 725},
                    <ComponentModel>{"item": "PureWater2", "quantity": 4}
                ],
                "levelReqToCraft": 46,
                "expGiven": 500000,
                "no": 28,
                "tab": 3,
                "sellPrice": 7907225,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 3, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 4}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentPunching5", <RecipeModel>{
                "intID": "EquipmentPunching5",
                "recipe": [
                    <ComponentModel>{"item": "SnowA2a", "quantity": 100},
                    <ComponentModel>{"item": "Critter5A", "quantity": 50},
                    <ComponentModel>{"item": "Quest36", "quantity": 10},
                    <ComponentModel>{"item": "PureWater2", "quantity": 15}
                ],
                "levelReqToCraft": 45,
                "expGiven": 500000,
                "no": 29,
                "tab": 3,
                "sellPrice": 323900,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA2a", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter5A", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest36", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Quest37", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertC2b", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 15}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowA2a", "quantity": 100},
                        <ComponentModel>{"item": "Critter5A", "quantity": 50},
                        <ComponentModel>{"item": "PureWater2", "quantity": 15},
                        <ComponentModel>{"item": "Quest37", "quantity": 10},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 50}
                    ]
                }
            }),
        new RecipeBase("EquipmentSword3", <RecipeModel>{
                "intID": "EquipmentSword3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentSword2", "quantity": 1},
                    <ComponentModel>{"item": "SnowC4a", "quantity": 10},
                    <ComponentModel>{"item": "Critter6A", "quantity": 15},
                    <ComponentModel>{"item": "PureWater2", "quantity": 7}
                ],
                "levelReqToCraft": 45,
                "expGiven": 450000,
                "no": 30,
                "tab": 3,
                "sellPrice": 5657910,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentSword2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentSword1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertA3b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat9", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "TestObj3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "ForestTree", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowA2", "quantity": 25000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC4a", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter6A", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 7}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowC4a", "quantity": 10},
                        <ComponentModel>{"item": "Critter6A", "quantity": 15},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "SnowA2", "quantity": 25000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 3},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 2500},
                        <ComponentModel>{"item": "ForestTree", "quantity": 1250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("EquipmentBows8", <RecipeModel>{
                "intID": "EquipmentBows8",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows7", "quantity": 1},
                    <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                    <ComponentModel>{"item": "Refinery3", "quantity": 350},
                    <ComponentModel>{"item": "PureWater2", "quantity": 7}
                ],
                "levelReqToCraft": 45,
                "expGiven": 450000,
                "no": 31,
                "tab": 3,
                "sellPrice": 167970,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentBows6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentBows5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentBows3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "BirchTree", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "GoldBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 2, "item": "TreeInterior1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish4", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul1", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC4a", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery3", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 7}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                        <ComponentModel>{"item": "Refinery3", "quantity": 350},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "Soul1", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 3},
                        <ComponentModel>{"item": "Fish4", "quantity": 1400},
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "BirchTree", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentWands7", <RecipeModel>{
                "intID": "EquipmentWands7",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentWands3", "quantity": 1},
                    <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                    <ComponentModel>{"item": "Soul4", "quantity": 5000},
                    <ComponentModel>{"item": "PureWater2", "quantity": 7}
                ],
                "levelReqToCraft": 45,
                "expGiven": 450000,
                "no": 32,
                "tab": 3,
                "sellPrice": 654200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentWands3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentWands6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentWands5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentWands2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CopperBar", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat7", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Sewers1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug4", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SaharanFoal", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC4a", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 7}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                        <ComponentModel>{"item": "Soul4", "quantity": 5000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 10000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                        <ComponentModel>{"item": "Bug4", "quantity": 4000},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("EquipmentTools11", <RecipeModel>{
                "intID": "EquipmentTools11",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentTools7", "quantity": 1},
                    <ComponentModel>{"item": "VoidBar", "quantity": 400},
                    <ComponentModel>{"item": "PureWater2", "quantity": 5}
                ],
                "levelReqToCraft": 45,
                "expGiven": 400000,
                "no": 33,
                "tab": 3,
                "sellPrice": 8542240,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentTools7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentTools6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentTools5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentTools3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Jungle3", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertA2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertB3", "quantity": 10500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DementiaBar", "quantity": 275},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowA3", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "VoidBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "VoidBar", "quantity": 400},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 275},
                        <ComponentModel>{"item": "SnowA3", "quantity": 15000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertB3", "quantity": 10500},
                        <ComponentModel>{"item": "DesertA2", "quantity": 2500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "IronBar", "quantity": 70},
                        <ComponentModel>{"item": "Jungle3", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagMi6", <RecipeModel>{
                "intID": "MaxCapBagMi6",
                "recipe": [<ComponentModel>{"item": "Void", "quantity": 25000}, <ComponentModel>{"item": "MaxCapBag5", "quantity": 2}],
                "levelReqToCraft": 43,
                "expGiven": 200000,
                "no": 34,
                "tab": 3,
                "sellPrice": 3151480,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Void", "quantity": 25000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBag5", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Dementia", "quantity": 35000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBag4", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Plat", "quantity": 30000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBag3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBag1", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Copper", "quantity": 960},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBag2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Iron", "quantity": 2800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Gold", "quantity": 8000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Void", "quantity": 25000},
                        <ComponentModel>{"item": "Dementia", "quantity": 35000},
                        <ComponentModel>{"item": "Plat", "quantity": 30000},
                        <ComponentModel>{"item": "Gold", "quantity": 8000},
                        <ComponentModel>{"item": "Copper", "quantity": 960},
                        <ComponentModel>{"item": "Iron", "quantity": 2800}
                    ]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet7", <RecipeModel>{
                "intID": "EquipmentToolsHatchet7",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentToolsHatchet5", "quantity": 1},
                    <ComponentModel>{"item": "Tree7", "quantity": 50000},
                    <ComponentModel>{"item": "PureWater2", "quantity": 5}
                ],
                "levelReqToCraft": 45,
                "expGiven": 400000,
                "no": 35,
                "tab": 3,
                "sellPrice": 2966450,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentToolsHatchet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentToolsHatchet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentToolsHatchet2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentToolsHatchet1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "JungleTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat6", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertA3", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PalmTree", "quantity": 6500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat7", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SaharanFoal", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree7", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree7", "quantity": 50000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "PalmTree", "quantity": 6500},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 5000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "DesertA3", "quantity": 2000},
                        <ComponentModel>{"item": "JungleTree", "quantity": 200},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagT6", <RecipeModel>{
                "intID": "MaxCapBagT6",
                "recipe": [<ComponentModel>{"item": "Tree7", "quantity": 30000}, <ComponentModel>{"item": "MaxCapBagT5", "quantity": 2}],
                "levelReqToCraft": 43,
                "expGiven": 200000,
                "no": 36,
                "tab": 3,
                "sellPrice": 3098880,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree7", "quantity": 30000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagT5", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SaharanFoal", "quantity": 40000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagT4", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PalmTree", "quantity": 30000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagT3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBag7", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "OakTree", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat5", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBag9", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "BirchTree", "quantity": 3200},
                        <DetRecipeComponentModel>{"indent": 3, "item": "ForestTree", "quantity": 8400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree7", "quantity": 30000},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 40000},
                        <ComponentModel>{"item": "PalmTree", "quantity": 30000},
                        <ComponentModel>{"item": "ForestTree", "quantity": 8400},
                        <ComponentModel>{"item": "OakTree", "quantity": 1200},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 240},
                        <ComponentModel>{"item": "BirchTree", "quantity": 3200}
                    ]
                }
            }),
        new RecipeBase("FishingRod7", <RecipeModel>{
                "intID": "FishingRod7",
                "recipe": [
                    <ComponentModel>{"item": "Refinery3", "quantity": 200},
                    <ComponentModel>{"item": "Critter5A", "quantity": 3},
                    <ComponentModel>{"item": "FishingRod6", "quantity": 1},
                    <ComponentModel>{"item": "PureWater2", "quantity": 5}
                ],
                "levelReqToCraft": 45,
                "expGiven": 400000,
                "no": 37,
                "tab": 3,
                "sellPrice": 983659,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery3", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter5A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FishingRod6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FishingRod5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FishingRod4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat9", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FishingRod3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish2", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery3", "quantity": 200},
                        <ComponentModel>{"item": "Critter5A", "quantity": 3},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Fish4", "quantity": 2000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "Fish2", "quantity": 3150},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagFi6", <RecipeModel>{
                "intID": "MaxCapBagFi6",
                "recipe": [<ComponentModel>{"item": "Fish4", "quantity": 50000}, <ComponentModel>{"item": "MaxCapBagFi5", "quantity": 2}],
                "levelReqToCraft": 43,
                "expGiven": 200000,
                "no": 38,
                "tab": 3,
                "sellPrice": 1282940,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish4", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagFi5", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter3A", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagFi4", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish4", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish1", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagFi3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBagFi1", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish1", "quantity": 1440},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBagFi2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish2", "quantity": 1700},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish2", "quantity": 8000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish4", "quantity": 60000},
                        <ComponentModel>{"item": "Critter3A", "quantity": 8},
                        <ComponentModel>{"item": "Refinery1", "quantity": 100},
                        <ComponentModel>{"item": "Fish1", "quantity": 21440},
                        <ComponentModel>{"item": "Fish2", "quantity": 9700},
                        <ComponentModel>{"item": "PureWater", "quantity": 8}
                    ]
                }
            }),
        new RecipeBase("CatchingNet7", <RecipeModel>{
                "intID": "CatchingNet7",
                "recipe": [
                    <ComponentModel>{"item": "Bug6", "quantity": 50000},
                    <ComponentModel>{"item": "CatchingNet6", "quantity": 1},
                    <ComponentModel>{"item": "PureWater2", "quantity": 5}
                ],
                "levelReqToCraft": 45,
                "expGiven": 400000,
                "no": 39,
                "tab": 3,
                "sellPrice": 2741050,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug6", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CatchingNet6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug5", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CatchingNet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug4", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Plat", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CatchingNet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CatchingNet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "ForestTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug6", "quantity": 50000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Bug5", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Bug4", "quantity": 7000},
                        <ComponentModel>{"item": "Plat", "quantity": 3000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "Bug2", "quantity": 3350},
                        <ComponentModel>{"item": "ForestTree", "quantity": 800},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagB6", <RecipeModel>{
                "intID": "MaxCapBagB6",
                "recipe": [<ComponentModel>{"item": "Bug6", "quantity": 35000}, <ComponentModel>{"item": "MaxCapBagB5", "quantity": 2}],
                "levelReqToCraft": 43,
                "expGiven": 200000,
                "no": 40,
                "tab": 3,
                "sellPrice": 2735620,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug6", "quantity": 35000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagB5", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug5", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagB4", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug4", "quantity": 30000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagB3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBagB1", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Bug1", "quantity": 1440},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBagB2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Bug2", "quantity": 1700},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug2", "quantity": 8400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug6", "quantity": 35000},
                        <ComponentModel>{"item": "Bug5", "quantity": 20000},
                        <ComponentModel>{"item": "Bug4", "quantity": 30000},
                        <ComponentModel>{"item": "Bug2", "quantity": 10100},
                        <ComponentModel>{"item": "Bug1", "quantity": 1440},
                        <ComponentModel>{"item": "PureWater", "quantity": 8}
                    ]
                }
            }),
        new RecipeBase("TrapBoxSet5", <RecipeModel>{
                "intID": "TrapBoxSet5",
                "recipe": [
                    <ComponentModel>{"item": "Critter6A", "quantity": 6},
                    <ComponentModel>{"item": "TrapBoxSet4", "quantity": 1},
                    <ComponentModel>{"item": "PureWater2", "quantity": 5}
                ],
                "levelReqToCraft": 46,
                "expGiven": 500000,
                "no": 41,
                "tab": 3,
                "sellPrice": 11283,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter6A", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrapBoxSet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter4A", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TrapBoxSet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter2A", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter6A", "quantity": 6},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter4A", "quantity": 5},
                        <ComponentModel>{"item": "Refinery1", "quantity": 70},
                        <ComponentModel>{"item": "Critter2A", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagTr5", <RecipeModel>{
                "intID": "MaxCapBagTr5",
                "recipe": [<ComponentModel>{"item": "Critter6", "quantity": 30000}, <ComponentModel>{"item": "MaxCapBagTr4", "quantity": 2}],
                "levelReqToCraft": 44,
                "expGiven": 250000,
                "no": 42,
                "tab": 3,
                "sellPrice": 1376000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter6", "quantity": 30000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagTr4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter4", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagTr3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter2", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 60}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter6", "quantity": 30000},
                        <ComponentModel>{"item": "Critter4", "quantity": 20000},
                        <ComponentModel>{"item": "Critter2", "quantity": 4000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 60}
                    ]
                }
            }),
        new RecipeBase("WorshipSkull5", <RecipeModel>{
                "intID": "WorshipSkull5",
                "recipe": [
                    <ComponentModel>{"item": "Soul4", "quantity": 8000},
                    <ComponentModel>{"item": "WorshipSkull4", "quantity": 1},
                    <ComponentModel>{"item": "PureWater2", "quantity": 5}
                ],
                "levelReqToCraft": 46,
                "expGiven": 500000,
                "no": 43,
                "tab": 3,
                "sellPrice": 438550,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul4", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "WorshipSkull4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul3", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "WorshipSkull3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul2", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul4", "quantity": 8000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Soul3", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 75},
                        <ComponentModel>{"item": "Soul2", "quantity": 1200}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagS5", <RecipeModel>{
                "intID": "MaxCapBagS5",
                "recipe": [<ComponentModel>{"item": "Soul3", "quantity": 30000}, <ComponentModel>{"item": "MaxCapBagS4", "quantity": 2}],
                "levelReqToCraft": 44,
                "expGiven": 250000,
                "no": 44,
                "tab": 3,
                "sellPrice": 982000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul3", "quantity": 30000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagS4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul3", "quantity": 16000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagS3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul2", "quantity": 6000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 80}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul3", "quantity": 46000},
                        <ComponentModel>{"item": "Soul2", "quantity": 6000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 80}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagF6", <RecipeModel>{
                "intID": "MaxCapBagF6",
                "recipe": [
                    <ComponentModel>{"item": "FoodG5", "quantity": 10},
                    <ComponentModel>{"item": "FoodTrapping1", "quantity": 30},
                    <ComponentModel>{"item": "FoodWorship1", "quantity": 30},
                    <ComponentModel>{"item": "MaxCapBagF5", "quantity": 1}
                ],
                "levelReqToCraft": 44,
                "expGiven": 250000,
                "no": 45,
                "tab": 3,
                "sellPrice": 2634640,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodG5", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodTrapping1", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter2", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodWorship1", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul2", "quantity": 2100},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagF5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodFish1", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish2", "quantity": 7500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodPotOr2", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodCatch1", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug2", "quantity": 7500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodHealth6", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FoodHealth9", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagF4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FoodG3", "quantity": 18},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertA3b", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagF3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBag8", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "FoodHealth1", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 4, "item": "FoodHealth3", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 4, "item": "OakTree", "quantity": 480},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CopperBar", "quantity": 120},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FoodHealth7", "quantity": 1600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FoodMining1", "quantity": 2800},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Iron", "quantity": 14000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "FoodPotMana1", "quantity": 5600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FoodChoppin1", "quantity": 2800},
                        <DetRecipeComponentModel>{"indent": 4, "item": "JungleTree", "quantity": 16800},
                        <DetRecipeComponentModel>{"indent": 4, "item": "FoodPotRe1", "quantity": 8400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodG5", "quantity": 10},
                        <ComponentModel>{"item": "Critter2", "quantity": 3000},
                        <ComponentModel>{"item": "PureWater", "quantity": 60},
                        <ComponentModel>{"item": "Soul2", "quantity": 2100},
                        <ComponentModel>{"item": "FoodHealth9", "quantity": 10000},
                        <ComponentModel>{"item": "Fish2", "quantity": 7500},
                        <ComponentModel>{"item": "FoodPotOr2", "quantity": 3000},
                        <ComponentModel>{"item": "Bug2", "quantity": 7500},
                        <ComponentModel>{"item": "FoodHealth6", "quantity": 1500},
                        <ComponentModel>{"item": "FoodG3", "quantity": 18},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 8},
                        <ComponentModel>{"item": "FoodHealth7", "quantity": 1600},
                        <ComponentModel>{"item": "FoodHealth1", "quantity": 600},
                        <ComponentModel>{"item": "FoodHealth3", "quantity": 200},
                        <ComponentModel>{"item": "OakTree", "quantity": 480},
                        <ComponentModel>{"item": "CopperBar", "quantity": 120},
                        <ComponentModel>{"item": "Iron", "quantity": 14000},
                        <ComponentModel>{"item": "FoodPotMana1", "quantity": 5600},
                        <ComponentModel>{"item": "JungleTree", "quantity": 16800},
                        <ComponentModel>{"item": "FoodPotRe1", "quantity": 8400}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagM7", <RecipeModel>{
                "intID": "MaxCapBagM7",
                "recipe": [
                    <ComponentModel>{"item": "SnowC3", "quantity": 60000},
                    <ComponentModel>{"item": "SnowC4a", "quantity": 3},
                    <ComponentModel>{"item": "MaxCapBagM6", "quantity": 1}
                ],
                "levelReqToCraft": 44,
                "expGiven": 250000,
                "no": 46,
                "tab": 3,
                "sellPrice": 29876370,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC3", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC4a", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 0, "item": "MaxCapBagM6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowB1", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowB2a", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "MaxCapBagM5", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Sewers1b", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 2, "item": "TreeInterior1b", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 2, "item": "MaxCapBagM4", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "MaxCapBagM2", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat5", "quantity": 640},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Grasslands2", "quantity": 320},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Grasslands3", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertA1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat7", "quantity": 6800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowC3", "quantity": 60000},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 3},
                        <ComponentModel>{"item": "SnowB1", "quantity": 15000},
                        <ComponentModel>{"item": "SnowB2a", "quantity": 3},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 6},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 8},
                        <ComponentModel>{"item": "DesertA1b", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 6800},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 640},
                        <ComponentModel>{"item": "Grasslands2", "quantity": 320},
                        <ComponentModel>{"item": "Grasslands3", "quantity": 240}
                    ]
                }
            }),
        new RecipeBase("EquipmentSmithingTabs4", <RecipeModel>{
                "intID": "EquipmentSmithingTabs4",
                "recipe": [
                    <ComponentModel>{"item": "VoidBar", "quantity": 1200},
                    <ComponentModel>{"item": "Soul4", "quantity": 7500},
                    <ComponentModel>{"item": "Critter6A", "quantity": 10},
                    <ComponentModel>{"item": "Refinery3", "quantity": 400}
                ],
                "levelReqToCraft": 50,
                "expGiven": 1500000,
                "no": 48,
                "tab": 3,
                "sellPrice": 7742530,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "VoidBar", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul4", "quantity": 7500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter6A", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery3", "quantity": 400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "VoidBar", "quantity": 1200},
                        <ComponentModel>{"item": "Soul4", "quantity": 7500},
                        <ComponentModel>{"item": "Critter6A", "quantity": 10},
                        <ComponentModel>{"item": "Refinery3", "quantity": 400}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats61", <RecipeModel>{
                "intID": "EquipmentHats61",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats39", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentHats54", "quantity": 1},
                    <ComponentModel>{"item": "Refinery4", "quantity": 400}
                ],
                "levelReqToCraft": 49,
                "expGiven": 1000000,
                "no": 49,
                "tab": 3,
                "sellPrice": 7143250,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats39", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats54", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentHats39", "quantity": 1},
                        <ComponentModel>{"item": "Refinery4", "quantity": 400},
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats58", <RecipeModel>{
                "intID": "EquipmentHats58",
                "recipe": [<ComponentModel>{"item": "EquipmentHats54", "quantity": 1}, <ComponentModel>{"item": "Refinery4", "quantity": 150}],
                "levelReqToCraft": 48,
                "expGiven": 750000,
                "no": 50,
                "tab": 3,
                "sellPrice": 7116750,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats54", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery4", "quantity": 150},
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats59", <RecipeModel>{
                "intID": "EquipmentHats59",
                "recipe": [<ComponentModel>{"item": "EquipmentHats54", "quantity": 1}, <ComponentModel>{"item": "Refinery4", "quantity": 150}],
                "levelReqToCraft": 48,
                "expGiven": 750000,
                "no": 51,
                "tab": 3,
                "sellPrice": 7116750,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats54", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery4", "quantity": 150},
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats60", <RecipeModel>{
                "intID": "EquipmentHats60",
                "recipe": [<ComponentModel>{"item": "EquipmentHats54", "quantity": 1}, <ComponentModel>{"item": "Refinery4", "quantity": 150}],
                "levelReqToCraft": 48,
                "expGiven": 750000,
                "no": 52,
                "tab": 3,
                "sellPrice": 7116750,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats54", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 150}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery4", "quantity": 150},
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts31", <RecipeModel>{
                "intID": "EquipmentShirts31",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPunching4", "quantity": 2},
                    <ComponentModel>{"item": "EquipmentShirts27", "quantity": 1},
                    <ComponentModel>{"item": "Refinery4", "quantity": 400}
                ],
                "levelReqToCraft": 50,
                "expGiven": 1200000,
                "no": 53,
                "tab": 3,
                "sellPrice": 66962960,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPunching4", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPunching3", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentPunching2", "quantity": 12},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CopperBar", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 3, "item": "OakTree", "quantity": 900},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 240},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat3", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "ToiletTree", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowA2", "quantity": 140000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts27", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 4, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC3", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery4", "quantity": 400},
                        <ComponentModel>{"item": "SnowA2", "quantity": 140000},
                        <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 500},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat3", "quantity": 20000},
                        <ComponentModel>{"item": "ToiletTree", "quantity": 8000},
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "CopperBar", "quantity": 240},
                        <ComponentModel>{"item": "OakTree", "quantity": 900},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 240},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts28", <RecipeModel>{
                "intID": "EquipmentShirts28",
                "recipe": [<ComponentModel>{"item": "EquipmentShirts27", "quantity": 1}, <ComponentModel>{"item": "Refinery4", "quantity": 250}],
                "levelReqToCraft": 49,
                "expGiven": 1000000,
                "no": 54,
                "tab": 3,
                "sellPrice": 36661600,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts27", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 4, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC3", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 250}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery4", "quantity": 250},
                        <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 500},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts29", <RecipeModel>{
                "intID": "EquipmentShirts29",
                "recipe": [<ComponentModel>{"item": "EquipmentShirts27", "quantity": 1}, <ComponentModel>{"item": "Refinery4", "quantity": 250}],
                "levelReqToCraft": 49,
                "expGiven": 1000000,
                "no": 55,
                "tab": 3,
                "sellPrice": 36661600,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts27", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 4, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC3", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 250}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery4", "quantity": 250},
                        <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 500},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts30", <RecipeModel>{
                "intID": "EquipmentShirts30",
                "recipe": [<ComponentModel>{"item": "EquipmentShirts27", "quantity": 1}, <ComponentModel>{"item": "Refinery4", "quantity": 250}],
                "levelReqToCraft": 49,
                "expGiven": 1000000,
                "no": 56,
                "tab": 3,
                "sellPrice": 36661600,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts27", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 4, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC3", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 250}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Refinery4", "quantity": 250},
                        <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 500},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("FoodTrapping1", <RecipeModel>{
                "intID": "FoodTrapping1",
                "recipe": [<ComponentModel>{"item": "Critter2", "quantity": 100}, <ComponentModel>{"item": "PureWater", "quantity": 1}],
                "levelReqToCraft": 36,
                "expGiven": 10000,
                "no": 57,
                "tab": 3,
                "sellPrice": 550,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter2", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 1}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Critter2", "quantity": 100}, <ComponentModel>{"item": "PureWater", "quantity": 1}]
                }
            }),
        new RecipeBase("FoodWorship1", <RecipeModel>{
                "intID": "FoodWorship1",
                "recipe": [<ComponentModel>{"item": "Soul2", "quantity": 70}, <ComponentModel>{"item": "PureWater", "quantity": 1}],
                "levelReqToCraft": 36,
                "expGiven": 10000,
                "no": 58,
                "tab": 3,
                "sellPrice": 680,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul2", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater", "quantity": 1}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Soul2", "quantity": 70}, <ComponentModel>{"item": "PureWater", "quantity": 1}]
                }
            }),
        new RecipeBase("InvBag109", <RecipeModel>{
                "intID": "InvBag109",
                "recipe": [
                    <ComponentModel>{"item": "InvBag110", "quantity": 1},
                    <ComponentModel>{"item": "SnowA2", "quantity": 2000},
                    <ComponentModel>{"item": "SnowA2a", "quantity": 3}
                ],
                "levelReqToCraft": 35,
                "expGiven": 5000,
                "no": 59,
                "tab": 3,
                "sellPrice": 435690,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "InvBag110", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA2", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA2a", "quantity": 3}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "InvBag110", "quantity": 1},
                        <ComponentModel>{"item": "SnowA2", "quantity": 2000},
                        <ComponentModel>{"item": "SnowA2a", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats66", <RecipeModel>{
                "intID": "EquipmentHats66",
                "recipe": [
                    <ComponentModel>{"item": "Critter9", "quantity": 1000000},
                    <ComponentModel>{"item": "Critter9A", "quantity": 1},
                    <ComponentModel>{"item": "PureWater2", "quantity": 25}
                ],
                "levelReqToCraft": 40,
                "expGiven": 500000,
                "no": 60,
                "tab": 3,
                "sellPrice": 80001253,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter9", "quantity": 1000000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter9A", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "PureWater2", "quantity": 25}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter9", "quantity": 1000000},
                        <ComponentModel>{"item": "Critter9A", "quantity": 1},
                        <ComponentModel>{"item": "PureWater2", "quantity": 25}
                    ]
                }
            }),
        new RecipeBase("BadgeI1", <RecipeModel>{
                "intID": "BadgeI1",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken39", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken40", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken41", "quantity": 1}
                ],
                "levelReqToCraft": 1,
                "expGiven": 2,
                "no": 61,
                "tab": 3,
                "sellPrice": 32000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken39", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken31", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken32", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken34", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken40", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken35", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken36", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken38", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken41", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken33", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "NPCtoken37", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken31", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken32", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken34", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken35", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken36", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken38", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken33", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken37", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("BadgeI2", <RecipeModel>{
                "intID": "BadgeI2",
                "recipe": [
                    <ComponentModel>{"item": "Soul4", "quantity": 12500},
                    <ComponentModel>{"item": "Critter8A", "quantity": 4},
                    <ComponentModel>{"item": "Quest58", "quantity": 1}
                ],
                "levelReqToCraft": 2,
                "expGiven": 5,
                "no": 62,
                "tab": 3,
                "sellPrice": 500437522,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul4", "quantity": 12500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter8A", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Quest58", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul4", "quantity": 12500},
                        <ComponentModel>{"item": "Critter8A", "quantity": 4},
                        <ComponentModel>{"item": "Quest58", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("BadgeI3", <RecipeModel>{
                "intID": "BadgeI3",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats68", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentRings23", "quantity": 1},
                    <ComponentModel>{"item": "Refinery6", "quantity": 10},
                    <ComponentModel>{"item": "SnowC4a", "quantity": 60}
                ],
                "levelReqToCraft": 1,
                "expGiven": 2,
                "no": 63,
                "tab": 3,
                "sellPrice": 8412776,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats68", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats54", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Chiz0", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC5", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery5", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings23", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC4a", "quantity": 60}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentRings23", "quantity": 1},
                        <ComponentModel>{"item": "Refinery6", "quantity": 10},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 60},
                        <ComponentModel>{"item": "Chiz0", "quantity": 25},
                        <ComponentModel>{"item": "SnowC5", "quantity": 1000},
                        <ComponentModel>{"item": "Refinery5", "quantity": 100},
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("Quest68", <RecipeModel>{
                "intID": "Quest68",
                "recipe": [
                    <ComponentModel>{"item": "SnowA2", "quantity": 5},
                    <ComponentModel>{"item": "SnowB5", "quantity": 20},
                    <ComponentModel>{"item": "IronBar", "quantity": 5}
                ],
                "levelReqToCraft": 38,
                "expGiven": 5,
                "no": 64,
                "tab": 3,
                "sellPrice": 7535,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowB5", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "IronBar", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowA2", "quantity": 5},
                        <ComponentModel>{"item": "SnowB5", "quantity": 20},
                        <ComponentModel>{"item": "IronBar", "quantity": 5}
                    ]
                }
            }),
        new RecipeBase("NPCtoken39", <RecipeModel>{
                "intID": "NPCtoken39",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken31", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken32", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken34", "quantity": 1}
                ],
                "levelReqToCraft": 1,
                "expGiven": 2,
                "no": 65,
                "tab": 3,
                "sellPrice": 12000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken31", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken32", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken34", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken31", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken32", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken34", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("NPCtoken40", <RecipeModel>{
                "intID": "NPCtoken40",
                "recipe": [
                    <ComponentModel>{"item": "NPCtoken35", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken36", "quantity": 1},
                    <ComponentModel>{"item": "NPCtoken38", "quantity": 1}
                ],
                "levelReqToCraft": 2,
                "expGiven": 5,
                "no": 66,
                "tab": 3,
                "sellPrice": 12000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken35", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken36", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken38", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "NPCtoken35", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken36", "quantity": 1},
                        <ComponentModel>{"item": "NPCtoken38", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("NPCtoken41", <RecipeModel>{
                "intID": "NPCtoken41",
                "recipe": [<ComponentModel>{"item": "NPCtoken33", "quantity": 1}, <ComponentModel>{"item": "NPCtoken37", "quantity": 1}],
                "levelReqToCraft": 1,
                "expGiven": 2,
                "no": 67,
                "tab": 3,
                "sellPrice": 8000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken33", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "NPCtoken37", "quantity": 1}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "NPCtoken33", "quantity": 1}, <ComponentModel>{"item": "NPCtoken37", "quantity": 1}]
                }
            }),
        new RecipeBase("EquipmentPendant25", <RecipeModel>{
                "intID": "EquipmentPendant25",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPendant24", "quantity": 1},
                    <ComponentModel>{"item": "Chiz1", "quantity": 15},
                    <ComponentModel>{"item": "Chiz0", "quantity": 30}
                ],
                "levelReqToCraft": 52,
                "expGiven": 5,
                "no": 68,
                "tab": 3,
                "sellPrice": 46,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPendant24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Chiz1", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Chiz0", "quantity": 30}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentPendant24", "quantity": 1},
                        <ComponentModel>{"item": "Chiz1", "quantity": 15},
                        <ComponentModel>{"item": "Chiz0", "quantity": 30}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats68", <RecipeModel>{
                "intID": "EquipmentHats68",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats54", "quantity": 1},
                    <ComponentModel>{"item": "Chiz0", "quantity": 25},
                    <ComponentModel>{"item": "SnowC5", "quantity": 1000},
                    <ComponentModel>{"item": "Refinery5", "quantity": 100}
                ],
                "levelReqToCraft": 50,
                "expGiven": 2,
                "no": 69,
                "tab": 3,
                "sellPrice": 7811775,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats54", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Chiz0", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC5", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery5", "quantity": 100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Chiz0", "quantity": 25},
                        <ComponentModel>{"item": "SnowC5", "quantity": 1000},
                        <ComponentModel>{"item": "Refinery5", "quantity": 100},
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts6", <RecipeModel>{
                "intID": "EquipmentShirts6",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts27", "quantity": 1},
                    <ComponentModel>{"item": "Chiz0", "quantity": 18},
                    <ComponentModel>{"item": "SnowA4", "quantity": 100000},
                    <ComponentModel>{"item": "Refinery5", "quantity": 50}
                ],
                "levelReqToCraft": 49,
                "expGiven": 5,
                "no": 70,
                "tab": 3,
                "sellPrice": 86641618,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts27", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 4, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC3", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Chiz0", "quantity": 18},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowA4", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery5", "quantity": 50}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Chiz0", "quantity": 18},
                        <ComponentModel>{"item": "SnowA4", "quantity": 100000},
                        <ComponentModel>{"item": "Refinery5", "quantity": 50},
                        <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 500},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants9", <RecipeModel>{
                "intID": "EquipmentPants9",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants21", "quantity": 1},
                    <ComponentModel>{"item": "Chiz0", "quantity": 10},
                    <ComponentModel>{"item": "SnowC4a", "quantity": 8},
                    <ComponentModel>{"item": "Refinery4", "quantity": 250}
                ],
                "levelReqToCraft": 48,
                "expGiven": 2,
                "no": 71,
                "tab": 3,
                "sellPrice": 9996275,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants21", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPants6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentPants5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentPants3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 170},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat6", "quantity": 225},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug3", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowA1", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Tree7", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Chiz0", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowC4a", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 250}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Chiz0", "quantity": 10},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 8},
                        <ComponentModel>{"item": "Refinery4", "quantity": 250},
                        <ComponentModel>{"item": "Tree7", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 650},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "SnowA1", "quantity": 8000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 400},
                        <ComponentModel>{"item": "Bug3", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1250},
                        <ComponentModel>{"item": "IronBar", "quantity": 170},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 225}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes23", <RecipeModel>{
                "intID": "EquipmentShoes23",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes22", "quantity": 1},
                    <ComponentModel>{"item": "Chiz0", "quantity": 6},
                    <ComponentModel>{"item": "SnowB2a", "quantity": 10},
                    <ComponentModel>{"item": "Refinery4", "quantity": 100}
                ],
                "levelReqToCraft": 47,
                "expGiven": 5,
                "no": 72,
                "tab": 3,
                "sellPrice": 7948731,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 5, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Chiz0", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowB2a", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Chiz0", "quantity": 6},
                        <ComponentModel>{"item": "SnowB2a", "quantity": 10},
                        <ComponentModel>{"item": "Refinery4", "quantity": 100},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats70", <RecipeModel>{
                "intID": "EquipmentHats70",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats54", "quantity": 1},
                    <ComponentModel>{"item": "Fish5", "quantity": 80000},
                    <ComponentModel>{"item": "LustreBar", "quantity": 2500}
                ],
                "levelReqToCraft": 50,
                "expGiven": 1000000,
                "no": 1,
                "tab": 4,
                "sellPrice": 38751750,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats54", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish5", "quantity": 80000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LustreBar", "quantity": 2500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish5", "quantity": 80000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2500},
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts32", <RecipeModel>{
                "intID": "EquipmentShirts32",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts27", "quantity": 1},
                    <ComponentModel>{"item": "GalaxyA1", "quantity": 100000},
                    <ComponentModel>{"item": "LustreBar", "quantity": 1200}
                ],
                "levelReqToCraft": 51,
                "expGiven": 1000000,
                "no": 2,
                "tab": 4,
                "sellPrice": 61636600,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts27", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 4, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC3", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyA1", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LustreBar", "quantity": 1200}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GalaxyA1", "quantity": 100000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 1200},
                        <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 500},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants24", <RecipeModel>{
                "intID": "EquipmentPants24",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants21", "quantity": 1},
                    <ComponentModel>{"item": "CraftMat11", "quantity": 60000},
                    <ComponentModel>{"item": "LustreBar", "quantity": 1600}
                ],
                "levelReqToCraft": 52,
                "expGiven": 1000000,
                "no": 3,
                "tab": 4,
                "sellPrice": 37091265,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants21", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPants6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentPants5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentPants3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "IronBar", "quantity": 170},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat6", "quantity": 225},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug3", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowA1", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Tree7", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat11", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LustreBar", "quantity": 1600}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CraftMat11", "quantity": 60000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 1600},
                        <ComponentModel>{"item": "Tree7", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 650},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "SnowA1", "quantity": 8000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 400},
                        <ComponentModel>{"item": "Bug3", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1250},
                        <ComponentModel>{"item": "IronBar", "quantity": 170},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 225}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes24", <RecipeModel>{
                "intID": "EquipmentShoes24",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes22", "quantity": 1},
                    <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                    <ComponentModel>{"item": "LustreBar", "quantity": 2000}
                ],
                "levelReqToCraft": 53,
                "expGiven": 1000000,
                "no": 4,
                "tab": 4,
                "sellPrice": 47307225,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 5, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyA2", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LustreBar", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2000},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentPunching6", <RecipeModel>{
                "intID": "EquipmentPunching6",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPunching5", "quantity": 1},
                    <ComponentModel>{"item": "CraftMat12", "quantity": 50000},
                    <ComponentModel>{"item": "Refinery4", "quantity": 2000}
                ],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 5,
                "tab": 4,
                "sellPrice": 573900,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPunching5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowA2a", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter5A", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Quest36", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Quest37", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertC2b", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CraftMat12", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "CraftMat12", "quantity": 50000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 2000},
                        <ComponentModel>{"item": "SnowA2a", "quantity": 100},
                        <ComponentModel>{"item": "Critter5A", "quantity": 50},
                        <ComponentModel>{"item": "PureWater2", "quantity": 15},
                        <ComponentModel>{"item": "Quest37", "quantity": 10},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 50}
                    ]
                }
            }),
        new RecipeBase("EquipmentSword4", <RecipeModel>{
                "intID": "EquipmentSword4",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentSword3", "quantity": 1},
                    <ComponentModel>{"item": "AlienTree", "quantity": 90000},
                    <ComponentModel>{"item": "Refinery4", "quantity": 500}
                ],
                "levelReqToCraft": 52,
                "expGiven": 1000000,
                "no": 6,
                "tab": 4,
                "sellPrice": 10657910,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentSword3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentSword2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentSword1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertA3b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat9", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "TestObj3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "ForestTree", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 4, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowA2", "quantity": 25000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC4a", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter6A", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 0, "item": "AlienTree", "quantity": 90000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "AlienTree", "quantity": 90000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 10},
                        <ComponentModel>{"item": "Critter6A", "quantity": 15},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "SnowA2", "quantity": 25000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 3},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 2500},
                        <ComponentModel>{"item": "ForestTree", "quantity": 1250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("EquipmentBows9", <RecipeModel>{
                "intID": "EquipmentBows9",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows8", "quantity": 1},
                    <ComponentModel>{"item": "Fish5", "quantity": 110000},
                    <ComponentModel>{"item": "Refinery4", "quantity": 500}
                ],
                "levelReqToCraft": 52,
                "expGiven": 1000000,
                "no": 7,
                "tab": 4,
                "sellPrice": 767970,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentBows7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentBows6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentBows5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentBows3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "BirchTree", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 4, "item": "GoldBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 3, "item": "TreeInterior1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish4", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul1", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC4a", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery3", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish5", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish5", "quantity": 110000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                        <ComponentModel>{"item": "Refinery3", "quantity": 350},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "Soul1", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 3},
                        <ComponentModel>{"item": "Fish4", "quantity": 1400},
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "BirchTree", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentWands8", <RecipeModel>{
                "intID": "EquipmentWands8",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentWands7", "quantity": 1},
                    <ComponentModel>{"item": "Critter7", "quantity": 50000},
                    <ComponentModel>{"item": "Refinery4", "quantity": 500}
                ],
                "levelReqToCraft": 52,
                "expGiven": 1000000,
                "no": 8,
                "tab": 4,
                "sellPrice": 3054200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentWands7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentWands3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentWands6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentWands5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentWands2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CopperBar", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat7", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Sewers1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug4", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SaharanFoal", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowC4a", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter7", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter7", "quantity": 50000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                        <ComponentModel>{"item": "Soul4", "quantity": 5000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 10000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                        <ComponentModel>{"item": "Bug4", "quantity": 4000},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("EquipmentTools8", <RecipeModel>{
                "intID": "EquipmentTools8",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentTools11", "quantity": 1},
                    <ComponentModel>{"item": "LustreBar", "quantity": 1000},
                    <ComponentModel>{"item": "Refinery4", "quantity": 600}
                ],
                "levelReqToCraft": 52,
                "expGiven": 1000000,
                "no": 9,
                "tab": 4,
                "sellPrice": 21102240,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentTools11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentTools7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentTools6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentTools5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentTools3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "IronBar", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Jungle3", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 4, "item": "DesertA2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 4, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertB3", "quantity": 10500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 275},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowA3", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "VoidBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LustreBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 600}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "LustreBar", "quantity": 1000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 600},
                        <ComponentModel>{"item": "VoidBar", "quantity": 400},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 275},
                        <ComponentModel>{"item": "SnowA3", "quantity": 15000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertB3", "quantity": 10500},
                        <ComponentModel>{"item": "DesertA2", "quantity": 2500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "IronBar", "quantity": 70},
                        <ComponentModel>{"item": "Jungle3", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagMi7", <RecipeModel>{
                "intID": "MaxCapBagMi7",
                "recipe": [<ComponentModel>{"item": "Lustre", "quantity": 110000}, <ComponentModel>{"item": "Refinery4", "quantity": 400}],
                "levelReqToCraft": 53,
                "expGiven": 1000000,
                "no": 10,
                "tab": 4,
                "sellPrice": 6640000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Lustre", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 400}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Lustre", "quantity": 110000}, <ComponentModel>{"item": "Refinery4", "quantity": 400}]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet6", <RecipeModel>{
                "intID": "EquipmentToolsHatchet6",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentToolsHatchet7", "quantity": 1},
                    <ComponentModel>{"item": "AlienTree", "quantity": 110000},
                    <ComponentModel>{"item": "Refinery4", "quantity": 600}
                ],
                "levelReqToCraft": 52,
                "expGiven": 1000000,
                "no": 11,
                "tab": 4,
                "sellPrice": 9076450,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentToolsHatchet7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentToolsHatchet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentToolsHatchet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentToolsHatchet2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentToolsHatchet1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "JungleTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat6", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 4, "item": "DesertA3", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PalmTree", "quantity": 6500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat7", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SaharanFoal", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Tree7", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "AlienTree", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 600}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "AlienTree", "quantity": 110000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 600},
                        <ComponentModel>{"item": "Tree7", "quantity": 50000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "PalmTree", "quantity": 6500},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 5000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "DesertA3", "quantity": 2000},
                        <ComponentModel>{"item": "JungleTree", "quantity": 200},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagT7", <RecipeModel>{
                "intID": "MaxCapBagT7",
                "recipe": [<ComponentModel>{"item": "AlienTree", "quantity": 110000}, <ComponentModel>{"item": "Refinery4", "quantity": 400}],
                "levelReqToCraft": 53,
                "expGiven": 1000000,
                "no": 12,
                "tab": 4,
                "sellPrice": 6090000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "AlienTree", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 400}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "AlienTree", "quantity": 110000}, <ComponentModel>{"item": "Refinery4", "quantity": 400}]
                }
            }),
        new RecipeBase("FishingRod8", <RecipeModel>{
                "intID": "FishingRod8",
                "recipe": [
                    <ComponentModel>{"item": "Fish5", "quantity": 90000},
                    <ComponentModel>{"item": "FishingRod7", "quantity": 1},
                    <ComponentModel>{"item": "Refinery4", "quantity": 750}
                ],
                "levelReqToCraft": 53,
                "expGiven": 1000000,
                "no": 13,
                "tab": 4,
                "sellPrice": 1508659,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish5", "quantity": 90000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FishingRod7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery3", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter5A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FishingRod6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FishingRod5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Fish4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FishingRod4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat9", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "FishingRod3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Fish2", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 750}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish5", "quantity": 90000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 750},
                        <ComponentModel>{"item": "Refinery3", "quantity": 200},
                        <ComponentModel>{"item": "Critter5A", "quantity": 3},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Fish4", "quantity": 2000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "Fish2", "quantity": 3150},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagFi7", <RecipeModel>{
                "intID": "MaxCapBagFi7",
                "recipe": [<ComponentModel>{"item": "Fish5", "quantity": 120000}, <ComponentModel>{"item": "Refinery4", "quantity": 500}],
                "levelReqToCraft": 54,
                "expGiven": 1000000,
                "no": 14,
                "tab": 4,
                "sellPrice": 650000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish5", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 500}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Fish5", "quantity": 120000}, <ComponentModel>{"item": "Refinery4", "quantity": 500}]
                }
            }),
        new RecipeBase("CatchingNet8", <RecipeModel>{
                "intID": "CatchingNet8",
                "recipe": [
                    <ComponentModel>{"item": "Bug7", "quantity": 130000},
                    <ComponentModel>{"item": "CatchingNet7", "quantity": 1},
                    <ComponentModel>{"item": "Refinery4", "quantity": 750}
                ],
                "levelReqToCraft": 53,
                "expGiven": 1000000,
                "no": 15,
                "tab": 4,
                "sellPrice": 11916050,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug7", "quantity": 130000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CatchingNet7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug6", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CatchingNet6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug5", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CatchingNet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug4", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Plat", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CatchingNet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Bug2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CatchingNet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "ForestTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 750}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug7", "quantity": 130000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 750},
                        <ComponentModel>{"item": "Bug6", "quantity": 50000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Bug5", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Bug4", "quantity": 7000},
                        <ComponentModel>{"item": "Plat", "quantity": 3000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "Bug2", "quantity": 3350},
                        <ComponentModel>{"item": "ForestTree", "quantity": 800},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagB7", <RecipeModel>{
                "intID": "MaxCapBagB7",
                "recipe": [<ComponentModel>{"item": "Bug7", "quantity": 110000}, <ComponentModel>{"item": "Refinery4", "quantity": 500}],
                "levelReqToCraft": 54,
                "expGiven": 1000000,
                "no": 16,
                "tab": 4,
                "sellPrice": 7750000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug7", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 500}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Bug7", "quantity": 110000}, <ComponentModel>{"item": "Refinery4", "quantity": 500}]
                }
            }),
        new RecipeBase("TrapBoxSet6", <RecipeModel>{
                "intID": "TrapBoxSet6",
                "recipe": [
                    <ComponentModel>{"item": "Critter8A", "quantity": 10},
                    <ComponentModel>{"item": "TrapBoxSet5", "quantity": 1},
                    <ComponentModel>{"item": "Refinery4", "quantity": 1000}
                ],
                "levelReqToCraft": 54,
                "expGiven": 1000000,
                "no": 17,
                "tab": 4,
                "sellPrice": 111313,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter8A", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrapBoxSet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter6A", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TrapBoxSet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter4A", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 2, "item": "TrapBoxSet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter2A", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter8A", "quantity": 10},
                        <ComponentModel>{"item": "Refinery4", "quantity": 1000},
                        <ComponentModel>{"item": "Critter6A", "quantity": 6},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter4A", "quantity": 5},
                        <ComponentModel>{"item": "Refinery1", "quantity": 70},
                        <ComponentModel>{"item": "Critter2A", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagTr6", <RecipeModel>{
                "intID": "MaxCapBagTr6",
                "recipe": [<ComponentModel>{"item": "Critter9", "quantity": 100000}, <ComponentModel>{"item": "Refinery4", "quantity": 1000}],
                "levelReqToCraft": 55,
                "expGiven": 1000000,
                "no": 18,
                "tab": 4,
                "sellPrice": 8100000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter9", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 1000}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Critter9", "quantity": 100000}, <ComponentModel>{"item": "Refinery4", "quantity": 1000}]
                }
            }),
        new RecipeBase("WorshipSkull6", <RecipeModel>{
                "intID": "WorshipSkull6",
                "recipe": [
                    <ComponentModel>{"item": "Soul4", "quantity": 40000},
                    <ComponentModel>{"item": "WorshipSkull5", "quantity": 1},
                    <ComponentModel>{"item": "Refinery4", "quantity": 1000}
                ],
                "levelReqToCraft": 54,
                "expGiven": 1000000,
                "no": 19,
                "tab": 4,
                "sellPrice": 1938550,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul4", "quantity": 40000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "WorshipSkull5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul4", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "WorshipSkull4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul3", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 2, "item": "WorshipSkull3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Soul2", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul4", "quantity": 48000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Soul3", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 75},
                        <ComponentModel>{"item": "Soul2", "quantity": 1200}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagS6", <RecipeModel>{
                "intID": "MaxCapBagS6",
                "recipe": [<ComponentModel>{"item": "Soul4", "quantity": 90000}, <ComponentModel>{"item": "Refinery4", "quantity": 1000}],
                "levelReqToCraft": 55,
                "expGiven": 1000000,
                "no": 20,
                "tab": 4,
                "sellPrice": 3250000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul4", "quantity": 90000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 1000}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Soul4", "quantity": 90000}, <ComponentModel>{"item": "Refinery4", "quantity": 1000}]
                }
            }),
        new RecipeBase("EquipmentShoes26", <RecipeModel>{
                "intID": "EquipmentShoes26",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes16", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentShoes24", "quantity": 1},
                    <ComponentModel>{"item": "Copper", "quantity": 300000}
                ],
                "levelReqToCraft": 56,
                "expGiven": 1000000,
                "no": 21,
                "tab": 4,
                "sellPrice": 48300300,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes16", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Copper", "quantity": 1500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Iron", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyA2", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Copper", "quantity": 300000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Copper", "quantity": 301500},
                        <ComponentModel>{"item": "PureWater", "quantity": 17},
                        <ComponentModel>{"item": "Iron", "quantity": 1200},
                        <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 1200},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 250},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "CopperBar", "quantity": 150},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes27", <RecipeModel>{
                "intID": "EquipmentShoes27",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes17", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentShoes24", "quantity": 1},
                    <ComponentModel>{"item": "OakTree", "quantity": 300000}
                ],
                "levelReqToCraft": 56,
                "expGiven": 1000000,
                "no": 22,
                "tab": 4,
                "sellPrice": 48007000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes17", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 1, "item": "JungleTree", "quantity": 1600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "ForestTree", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyA2", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "OakTree", "quantity": 300000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "OakTree", "quantity": 300000},
                        <ComponentModel>{"item": "PureWater", "quantity": 17},
                        <ComponentModel>{"item": "JungleTree", "quantity": 1600},
                        <ComponentModel>{"item": "ForestTree", "quantity": 1000},
                        <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 1200},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 250},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "CopperBar", "quantity": 150},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes28", <RecipeModel>{
                "intID": "EquipmentShoes28",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes18", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentShoes24", "quantity": 1},
                    <ComponentModel>{"item": "Fish1", "quantity": 300000}
                ],
                "levelReqToCraft": 56,
                "expGiven": 1000000,
                "no": 23,
                "tab": 4,
                "sellPrice": 48603400,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish1", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish2", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyA2", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish1", "quantity": 300000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish1", "quantity": 301250},
                        <ComponentModel>{"item": "PureWater", "quantity": 17},
                        <ComponentModel>{"item": "Fish2", "quantity": 1000},
                        <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 1200},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 250},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "CopperBar", "quantity": 150},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes29", <RecipeModel>{
                "intID": "EquipmentShoes29",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes19", "quantity": 1},
                    <ComponentModel>{"item": "EquipmentShoes24", "quantity": 1},
                    <ComponentModel>{"item": "Bug1", "quantity": 300000}
                ],
                "levelReqToCraft": 56,
                "expGiven": 1000000,
                "no": 24,
                "tab": 4,
                "sellPrice": 48304650,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 2, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "PureWater", "quantity": 9},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug1", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug2", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyA2", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug1", "quantity": 300000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug1", "quantity": 302000},
                        <ComponentModel>{"item": "PureWater", "quantity": 17},
                        <ComponentModel>{"item": "Bug2", "quantity": 1250},
                        <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 1200},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 250},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "CopperBar", "quantity": 150},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes31", <RecipeModel>{
                "intID": "EquipmentShoes31",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes30", "quantity": 4},
                    <ComponentModel>{"item": "EquipmentShoes24", "quantity": 1}
                ],
                "levelReqToCraft": 55,
                "expGiven": 1000000,
                "no": 25,
                "tab": 4,
                "sellPrice": 47319225,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes30", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyA2", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentShoes30", "quantity": 4},
                        <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2000},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes33", <RecipeModel>{
                "intID": "EquipmentShoes33",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes32", "quantity": 4},
                    <ComponentModel>{"item": "EquipmentShoes24", "quantity": 1}
                ],
                "levelReqToCraft": 55,
                "expGiven": 1000000,
                "no": 26,
                "tab": 4,
                "sellPrice": 47319225,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes32", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyA2", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentShoes32", "quantity": 4},
                        <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2000},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagF7", <RecipeModel>{
                "intID": "MaxCapBagF7",
                "recipe": [
                    <ComponentModel>{"item": "FoodHealth11", "quantity": 175000},
                    <ComponentModel>{"item": "Meatloaf", "quantity": 30},
                    <ComponentModel>{"item": "GalaxyA2b", "quantity": 10},
                    <ComponentModel>{"item": "Refinery4", "quantity": 1000}
                ],
                "levelReqToCraft": 58,
                "expGiven": 1000000,
                "no": 27,
                "tab": 4,
                "sellPrice": 54360500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth11", "quantity": 175000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Meatloaf", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyA2b", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodHealth11", "quantity": 175000},
                        <ComponentModel>{"item": "Meatloaf", "quantity": 30},
                        <ComponentModel>{"item": "GalaxyA2b", "quantity": 10},
                        <ComponentModel>{"item": "Refinery4", "quantity": 1000}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagM8", <RecipeModel>{
                "intID": "MaxCapBagM8",
                "recipe": [
                    <ComponentModel>{"item": "GalaxyA4", "quantity": 130000},
                    <ComponentModel>{"item": "GalaxyA2b", "quantity": 10},
                    <ComponentModel>{"item": "Refinery4", "quantity": 1000}
                ],
                "levelReqToCraft": 58,
                "expGiven": 1000000,
                "no": 28,
                "tab": 4,
                "sellPrice": 35851500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyA4", "quantity": 130000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyA2b", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GalaxyA4", "quantity": 130000},
                        <ComponentModel>{"item": "GalaxyA2b", "quantity": 10},
                        <ComponentModel>{"item": "Refinery4", "quantity": 1000}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats71", <RecipeModel>{
                "intID": "EquipmentHats71",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats70", "quantity": 1},
                    <ComponentModel>{"item": "Critter10", "quantity": 600000},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 10000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 800}
                ],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 29,
                "tab": 4,
                "sellPrice": 86841750,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats70", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentHats54", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentHats53", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentHats19", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentHats18", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Forest1", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 2250},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PlatBar", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery3", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish5", "quantity": 80000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter10", "quantity": 600000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter10", "quantity": 600000},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 10000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 800},
                        <ComponentModel>{"item": "Fish5", "quantity": 80000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2500},
                        <ComponentModel>{"item": "Refinery3", "quantity": 500},
                        <ComponentModel>{"item": "VoidBar", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter1", "quantity": 5000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Fish3", "quantity": 2250},
                        <ComponentModel>{"item": "PlatBar", "quantity": 750},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "Forest1", "quantity": 300}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts33", <RecipeModel>{
                "intID": "EquipmentShirts33",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts32", "quantity": 1},
                    <ComponentModel>{"item": "Tree8", "quantity": 400000},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 2500},
                    <ComponentModel>{"item": "Refinery6", "quantity": 400}
                ],
                "levelReqToCraft": 61,
                "expGiven": 1000000,
                "no": 30,
                "tab": 4,
                "sellPrice": 93679100,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts32", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShirts27", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShirts15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShirts14", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShirts12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "IronBar", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 5, "item": "JungleTree", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 4, "item": "DesertB4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PlatBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Soul1", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowC3", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyA1", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree8", "quantity": 400000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 400}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree8", "quantity": 400000},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 2500},
                        <ComponentModel>{"item": "Refinery6", "quantity": 400},
                        <ComponentModel>{"item": "GalaxyA1", "quantity": 100000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 1200},
                        <ComponentModel>{"item": "SnowC3", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 500},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Soul1", "quantity": 1000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 350},
                        <ComponentModel>{"item": "DesertB4", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 150},
                        <ComponentModel>{"item": "JungleTree", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants25", <RecipeModel>{
                "intID": "EquipmentPants25",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants24", "quantity": 1},
                    <ComponentModel>{"item": "Bug8", "quantity": 450000},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 4000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 600}
                ],
                "levelReqToCraft": 62,
                "expGiven": 1000000,
                "no": 31,
                "tab": 4,
                "sellPrice": 91155265,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPants21", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentPants6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentPants5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentPants3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "IronBar", "quantity": 170},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat6", "quantity": 225},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Bug3", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PlatBar", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SnowA1", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Tree7", "quantity": 75000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat11", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 1600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug8", "quantity": 450000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 600}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug8", "quantity": 450000},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 4000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 600},
                        <ComponentModel>{"item": "CraftMat11", "quantity": 60000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 1600},
                        <ComponentModel>{"item": "Tree7", "quantity": 75000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 650},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "SnowA1", "quantity": 8000},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 400},
                        <ComponentModel>{"item": "Bug3", "quantity": 5000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 1250},
                        <ComponentModel>{"item": "IronBar", "quantity": 170},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 225}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes25", <RecipeModel>{
                "intID": "EquipmentShoes25",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes24", "quantity": 1},
                    <ComponentModel>{"item": "Fish7", "quantity": 500000},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 5000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 700}
                ],
                "levelReqToCraft": 63,
                "expGiven": 1000000,
                "no": 32,
                "tab": 4,
                "sellPrice": 49882225,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes24", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes22", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentShoes5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentShoes4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentShoes3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentShoes15", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentShoes1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CopperBar", "quantity": 75},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat5", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PalmTree", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish3", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter1A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug6", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 725},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyA2", "quantity": 120000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish7", "quantity": 500000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 700}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish7", "quantity": 500000},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 5000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 700},
                        <ComponentModel>{"item": "GalaxyA2", "quantity": 120000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 2000},
                        <ComponentModel>{"item": "Bug6", "quantity": 60000},
                        <ComponentModel>{"item": "VoidBar", "quantity": 725},
                        <ComponentModel>{"item": "PureWater2", "quantity": 4},
                        <ComponentModel>{"item": "Critter1A", "quantity": 3},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 500},
                        <ComponentModel>{"item": "PalmTree", "quantity": 7000},
                        <ComponentModel>{"item": "Fish3", "quantity": 3000},
                        <ComponentModel>{"item": "GoldBar", "quantity": 600},
                        <ComponentModel>{"item": "PureWater", "quantity": 4},
                        <ComponentModel>{"item": "CraftMat5", "quantity": 500},
                        <ComponentModel>{"item": "IronBar", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 75}
                    ]
                }
            }),
        new RecipeBase("EquipmentPunching7", <RecipeModel>{
                "intID": "EquipmentPunching7",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPunching6", "quantity": 1},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 50000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 5000}
                ],
                "levelReqToCraft": 65,
                "expGiven": 1000000,
                "no": 33,
                "tab": 4,
                "sellPrice": 1123900,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPunching6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPunching5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowA2a", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter5A", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Quest36", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Quest37", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 3, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DesertC2b", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CraftMat12", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 5000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "StarfireBar", "quantity": 50000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 5000},
                        <ComponentModel>{"item": "CraftMat12", "quantity": 50000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 2000},
                        <ComponentModel>{"item": "SnowA2a", "quantity": 100},
                        <ComponentModel>{"item": "Critter5A", "quantity": 50},
                        <ComponentModel>{"item": "PureWater2", "quantity": 15},
                        <ComponentModel>{"item": "Quest37", "quantity": 10},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 50}
                    ]
                }
            }),
        new RecipeBase("EquipmentSword5", <RecipeModel>{
                "intID": "EquipmentSword5",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentSword4", "quantity": 1},
                    <ComponentModel>{"item": "Fish8", "quantity": 200000},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 750}
                ],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 34,
                "tab": 4,
                "sellPrice": 11735910,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentSword4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentSword3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentSword2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentSword1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "DesertA3b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat9", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 4, "item": "TestObj3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "ForestTree", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 5, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SnowA2", "quantity": 25000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowC4a", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter6A", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 1, "item": "AlienTree", "quantity": 90000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish8", "quantity": 200000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 750}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish8", "quantity": 200000},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 750},
                        <ComponentModel>{"item": "AlienTree", "quantity": 90000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 10},
                        <ComponentModel>{"item": "Critter6A", "quantity": 15},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "SnowA2", "quantity": 25000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 3},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 2500},
                        <ComponentModel>{"item": "ForestTree", "quantity": 1250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("EquipmentBows10", <RecipeModel>{
                "intID": "EquipmentBows10",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows9", "quantity": 1},
                    <ComponentModel>{"item": "Critter10A", "quantity": 10},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 750}
                ],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 35,
                "tab": 4,
                "sellPrice": 846000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentBows8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentBows7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentBows6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentBows5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentBows3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 6, "item": "BirchTree", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "TreeInterior1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish4", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Soul1", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowC4a", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery3", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish5", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter10A", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 750}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter10A", "quantity": 10},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 750},
                        <ComponentModel>{"item": "Fish5", "quantity": 110000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                        <ComponentModel>{"item": "Refinery3", "quantity": 350},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "Soul1", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 3},
                        <ComponentModel>{"item": "Fish4", "quantity": 1400},
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "BirchTree", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentWands9", <RecipeModel>{
                "intID": "EquipmentWands9",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentWands8", "quantity": 1},
                    <ComponentModel>{"item": "Soul5", "quantity": 15000},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 800}
                ],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 36,
                "tab": 4,
                "sellPrice": 3887200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentWands8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentWands7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentWands3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentWands6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentWands5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentWands2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CopperBar", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat7", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Sewers1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Bug4", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SaharanFoal", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 2, "item": "SnowC4a", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter7", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul5", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul5", "quantity": 15000},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 800},
                        <ComponentModel>{"item": "Critter7", "quantity": 50000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                        <ComponentModel>{"item": "Soul4", "quantity": 5000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 10000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                        <ComponentModel>{"item": "Bug4", "quantity": 4000},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("EquipmentTools12", <RecipeModel>{
                "intID": "EquipmentTools12",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentTools8", "quantity": 1},
                    <ComponentModel>{"item": "LustreBar", "quantity": 5000},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 20}
                ],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 37,
                "tab": 4,
                "sellPrice": 83662240,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentTools8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentTools11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentTools7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentTools6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentTools5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentTools3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Jungle3", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 5, "item": "DesertA2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 5, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 4, "item": "DesertB3", "quantity": 10500},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 275},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SnowA3", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "VoidBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LustreBar", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 20}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "LustreBar", "quantity": 6000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 20},
                        <ComponentModel>{"item": "Refinery4", "quantity": 600},
                        <ComponentModel>{"item": "VoidBar", "quantity": 400},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 275},
                        <ComponentModel>{"item": "SnowA3", "quantity": 15000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertB3", "quantity": 10500},
                        <ComponentModel>{"item": "DesertA2", "quantity": 2500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "IronBar", "quantity": 70},
                        <ComponentModel>{"item": "Jungle3", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagMi8", <RecipeModel>{
                "intID": "MaxCapBagMi8",
                "recipe": [
                    <ComponentModel>{"item": "Starfire", "quantity": 300000},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 4},
                    <ComponentModel>{"item": "Refinery5", "quantity": 800}
                ],
                "levelReqToCraft": 62,
                "expGiven": 1000000,
                "no": 38,
                "tab": 4,
                "sellPrice": 30092000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Starfire", "quantity": 300000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery5", "quantity": 800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Starfire", "quantity": 300000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 4},
                        <ComponentModel>{"item": "Refinery5", "quantity": 800}
                    ]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet8", <RecipeModel>{
                "intID": "EquipmentToolsHatchet8",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentToolsHatchet6", "quantity": 1},
                    <ComponentModel>{"item": "Tree8", "quantity": 100000},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 40}
                ],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 39,
                "tab": 4,
                "sellPrice": 17196450,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentToolsHatchet6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentToolsHatchet7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentToolsHatchet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentToolsHatchet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentToolsHatchet2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentToolsHatchet1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "JungleTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat6", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 5, "item": "DesertA3", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PalmTree", "quantity": 6500},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CraftMat7", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SaharanFoal", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Tree7", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "AlienTree", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree8", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 40}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree8", "quantity": 100000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 40},
                        <ComponentModel>{"item": "AlienTree", "quantity": 110000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 600},
                        <ComponentModel>{"item": "Tree7", "quantity": 50000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "PalmTree", "quantity": 6500},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 5000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "DesertA3", "quantity": 2000},
                        <ComponentModel>{"item": "JungleTree", "quantity": 200},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagT8", <RecipeModel>{
                "intID": "MaxCapBagT8",
                "recipe": [
                    <ComponentModel>{"item": "Tree8", "quantity": 300000},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 4},
                    <ComponentModel>{"item": "Refinery5", "quantity": 800}
                ],
                "levelReqToCraft": 62,
                "expGiven": 1000000,
                "no": 40,
                "tab": 4,
                "sellPrice": 24092000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree8", "quantity": 300000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery5", "quantity": 800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree8", "quantity": 300000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 4},
                        <ComponentModel>{"item": "Refinery5", "quantity": 800}
                    ]
                }
            }),
        new RecipeBase("FishingRod9", <RecipeModel>{
                "intID": "FishingRod9",
                "recipe": [
                    <ComponentModel>{"item": "Fish7", "quantity": 40000},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 60},
                    <ComponentModel>{"item": "FishingRod8", "quantity": 1}
                ],
                "levelReqToCraft": 61,
                "expGiven": 1000000,
                "no": 41,
                "tab": 4,
                "sellPrice": 1888659,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish7", "quantity": 40000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FishingRod8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish5", "quantity": 90000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FishingRod7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery3", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter5A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FishingRod6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FishingRod5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Fish4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 4, "item": "FishingRod4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Fish2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat9", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 5, "item": "FishingRod3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Fish2", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 6, "item": "PureWater", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 750}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish7", "quantity": 40000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 60},
                        <ComponentModel>{"item": "Fish5", "quantity": 90000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 750},
                        <ComponentModel>{"item": "Refinery3", "quantity": 200},
                        <ComponentModel>{"item": "Critter5A", "quantity": 3},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Fish4", "quantity": 2000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "Fish2", "quantity": 3150},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagFi8", <RecipeModel>{
                "intID": "MaxCapBagFi8",
                "recipe": [<ComponentModel>{"item": "Fish7", "quantity": 300000}, <ComponentModel>{"item": "Refinery6", "quantity": 600}],
                "levelReqToCraft": 63,
                "expGiven": 1000000,
                "no": 42,
                "tab": 4,
                "sellPrice": 1560000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish7", "quantity": 300000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 600}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Fish7", "quantity": 300000}, <ComponentModel>{"item": "Refinery6", "quantity": 600}]
                }
            }),
        new RecipeBase("CatchingNet9", <RecipeModel>{
                "intID": "CatchingNet9",
                "recipe": [
                    <ComponentModel>{"item": "Bug8", "quantity": 100000},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 80},
                    <ComponentModel>{"item": "CatchingNet8", "quantity": 1}
                ],
                "levelReqToCraft": 61,
                "expGiven": 1000000,
                "no": 43,
                "tab": 4,
                "sellPrice": 24156050,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug8", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 80},
                        <DetRecipeComponentModel>{"indent": 0, "item": "CatchingNet8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug7", "quantity": 130000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CatchingNet7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug6", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CatchingNet6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug5", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CatchingNet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Bug4", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Plat", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CatchingNet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Bug2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CatchingNet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "ForestTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 6, "item": "PureWater", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 750}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug8", "quantity": 100000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 80},
                        <ComponentModel>{"item": "Bug7", "quantity": 130000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 750},
                        <ComponentModel>{"item": "Bug6", "quantity": 50000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Bug5", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Bug4", "quantity": 7000},
                        <ComponentModel>{"item": "Plat", "quantity": 3000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "Bug2", "quantity": 3350},
                        <ComponentModel>{"item": "ForestTree", "quantity": 800},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagB8", <RecipeModel>{
                "intID": "MaxCapBagB8",
                "recipe": [<ComponentModel>{"item": "Bug8", "quantity": 300000}, <ComponentModel>{"item": "Refinery6", "quantity": 600}],
                "levelReqToCraft": 63,
                "expGiven": 1000000,
                "no": 44,
                "tab": 4,
                "sellPrice": 36060000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug8", "quantity": 300000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 600}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Bug8", "quantity": 300000}, <ComponentModel>{"item": "Refinery6", "quantity": 600}]
                }
            }),
        new RecipeBase("TrapBoxSet7", <RecipeModel>{
                "intID": "TrapBoxSet7",
                "recipe": [<ComponentModel>{"item": "Critter10", "quantity": 100000}, <ComponentModel>{"item": "TrapBoxSet6", "quantity": 1}],
                "levelReqToCraft": 62,
                "expGiven": 1000000,
                "no": 45,
                "tab": 4,
                "sellPrice": 8111313,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter10", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrapBoxSet6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter8A", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TrapBoxSet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter6A", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 2, "item": "TrapBoxSet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter4A", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 3, "item": "TrapBoxSet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Critter2A", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter10", "quantity": 100000},
                        <ComponentModel>{"item": "Critter8A", "quantity": 10},
                        <ComponentModel>{"item": "Refinery4", "quantity": 1000},
                        <ComponentModel>{"item": "Critter6A", "quantity": 6},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter4A", "quantity": 5},
                        <ComponentModel>{"item": "Refinery1", "quantity": 70},
                        <ComponentModel>{"item": "Critter2A", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagTr7", <RecipeModel>{
                "intID": "MaxCapBagTr7",
                "recipe": [<ComponentModel>{"item": "Critter10", "quantity": 300000}, <ComponentModel>{"item": "Refinery6", "quantity": 800}],
                "levelReqToCraft": 64,
                "expGiven": 1000000,
                "no": 46,
                "tab": 4,
                "sellPrice": 24080000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter10", "quantity": 300000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 800}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Critter10", "quantity": 300000}, <ComponentModel>{"item": "Refinery6", "quantity": 800}]
                }
            }),
        new RecipeBase("WorshipSkull7", <RecipeModel>{
                "intID": "WorshipSkull7",
                "recipe": [<ComponentModel>{"item": "Soul5", "quantity": 60000}, <ComponentModel>{"item": "WorshipSkull6", "quantity": 1}],
                "levelReqToCraft": 62,
                "expGiven": 1000000,
                "no": 47,
                "tab": 4,
                "sellPrice": 4938550,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul5", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "WorshipSkull6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul4", "quantity": 40000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "WorshipSkull5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul4", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "WorshipSkull4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Soul3", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 3, "item": "WorshipSkull3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Soul2", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 2, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery4", "quantity": 1000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul5", "quantity": 60000},
                        <ComponentModel>{"item": "Soul4", "quantity": 48000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Soul3", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 75},
                        <ComponentModel>{"item": "Soul2", "quantity": 1200}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagS7", <RecipeModel>{
                "intID": "MaxCapBagS7",
                "recipe": [<ComponentModel>{"item": "Soul5", "quantity": 300000}, <ComponentModel>{"item": "Refinery6", "quantity": 800}],
                "levelReqToCraft": 64,
                "expGiven": 1000000,
                "no": 48,
                "tab": 4,
                "sellPrice": 15080000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul5", "quantity": 300000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 800}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Soul5", "quantity": 300000}, <ComponentModel>{"item": "Refinery6", "quantity": 800}]
                }
            }),
        new RecipeBase("MaxCapBagF8", <RecipeModel>{
                "intID": "MaxCapBagF8",
                "recipe": [
                    <ComponentModel>{"item": "FoodHealth12", "quantity": 500000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 800},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 25}
                ],
                "levelReqToCraft": 64,
                "expGiven": 1000000,
                "no": 49,
                "tab": 4,
                "sellPrice": 2000155000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth12", "quantity": 500000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 25}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodHealth12", "quantity": 500000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 800},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 25}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagM9", <RecipeModel>{
                "intID": "MaxCapBagM9",
                "recipe": [
                    <ComponentModel>{"item": "GalaxyC4", "quantity": 500000},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 25},
                    <ComponentModel>{"item": "Refinery6", "quantity": 800}
                ],
                "levelReqToCraft": 64,
                "expGiven": 1000000,
                "no": 50,
                "tab": 4,
                "sellPrice": 3750155000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC4", "quantity": 500000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GalaxyC4", "quantity": 500000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 25},
                        <ComponentModel>{"item": "Refinery6", "quantity": 800}
                    ]
                }
            }),
        new RecipeBase("EquipmentSmithingTabs5", <RecipeModel>{
                "intID": "EquipmentSmithingTabs5",
                "recipe": [
                    <ComponentModel>{"item": "StarfireBar", "quantity": 5000},
                    <ComponentModel>{"item": "Tree8", "quantity": 200000},
                    <ComponentModel>{"item": "Bug8", "quantity": 150000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 600}
                ],
                "levelReqToCraft": 65,
                "expGiven": 1000000,
                "no": 52,
                "tab": 4,
                "sellPrice": 34065000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree8", "quantity": 200000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug8", "quantity": 150000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 600}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "StarfireBar", "quantity": 5000},
                        <ComponentModel>{"item": "Tree8", "quantity": 200000},
                        <ComponentModel>{"item": "Bug8", "quantity": 150000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 600}
                    ]
                }
            }),
        new RecipeBase("InvBag111", <RecipeModel>{
                "intID": "InvBag111",
                "recipe": [
                    <ComponentModel>{"item": "Fish6", "quantity": 10000},
                    <ComponentModel>{"item": "Bug7", "quantity": 20000},
                    <ComponentModel>{"item": "AlienTree", "quantity": 20000},
                    <ComponentModel>{"item": "Soul5", "quantity": 5000}
                ],
                "levelReqToCraft": 53,
                "expGiven": 1000000,
                "no": 53,
                "tab": 4,
                "sellPrice": 2800000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish6", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug7", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "AlienTree", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul5", "quantity": 5000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish6", "quantity": 10000},
                        <ComponentModel>{"item": "Bug7", "quantity": 20000},
                        <ComponentModel>{"item": "AlienTree", "quantity": 20000},
                        <ComponentModel>{"item": "Soul5", "quantity": 5000}
                    ]
                }
            }),
        new RecipeBase("DNAgun1", <RecipeModel>{
                "intID": "DNAgun1",
                "recipe": [<ComponentModel>{"item": "DesertC2b", "quantity": 100}, <ComponentModel>{"item": "DNAgun0", "quantity": 5}],
                "levelReqToCraft": 55,
                "expGiven": 1000000,
                "no": 54,
                "tab": 4,
                "sellPrice": 30016000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "DesertC2b", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DNAgun0", "quantity": 5}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "DesertC2b", "quantity": 100}, <ComponentModel>{"item": "DNAgun0", "quantity": 5}]
                }
            }),
        new RecipeBase("DNAgun2", <RecipeModel>{
                "intID": "DNAgun2",
                "recipe": [<ComponentModel>{"item": "SnowB2a", "quantity": 30}, <ComponentModel>{"item": "DNAgun1", "quantity": 1}],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 55,
                "tab": 4,
                "sellPrice": 30110500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "SnowB2a", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DNAgun1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DesertC2b", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DNAgun0", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "SnowB2a", "quantity": 30},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 100},
                        <ComponentModel>{"item": "DNAgun0", "quantity": 5}
                    ]
                }
            }),
        new RecipeBase("DNAgun3", <RecipeModel>{
                "intID": "DNAgun3",
                "recipe": [<ComponentModel>{"item": "GalaxyA2b", "quantity": 200}, <ComponentModel>{"item": "DNAgun2", "quantity": 1}],
                "levelReqToCraft": 65,
                "expGiven": 1000000,
                "no": 56,
                "tab": 4,
                "sellPrice": 30140500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyA2b", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DNAgun2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "SnowB2a", "quantity": 30},
                        <DetRecipeComponentModel>{"indent": 1, "item": "DNAgun1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DesertC2b", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 2, "item": "DNAgun0", "quantity": 5}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "GalaxyA2b", "quantity": 200},
                        <ComponentModel>{"item": "SnowB2a", "quantity": 30},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 100},
                        <ComponentModel>{"item": "DNAgun0", "quantity": 5}
                    ]
                }
            }),
        new RecipeBase("EquipmentRings30", <RecipeModel>{
                "intID": "EquipmentRings30",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentRings24", "quantity": 5},
                    <ComponentModel>{"item": "GalaxyA1", "quantity": 100000},
                    <ComponentModel>{"item": "EquipmentRings25", "quantity": 1}
                ],
                "levelReqToCraft": 60,
                "expGiven": 1000000,
                "no": 57,
                "tab": 4,
                "sellPrice": 10000006,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings24", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyA1", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentRings25", "quantity": 1}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentRings24", "quantity": 5},
                        <ComponentModel>{"item": "GalaxyA1", "quantity": 100000},
                        <ComponentModel>{"item": "EquipmentRings25", "quantity": 1}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats74", <RecipeModel>{
                "intID": "EquipmentHats74",
                "recipe": [
                    <ComponentModel>{"item": "TrollPart", "quantity": 50},
                    <ComponentModel>{"item": "Line3", "quantity": 10},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 20000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 4000}
                ],
                "levelReqToCraft": 70,
                "expGiven": 1000000,
                "no": 61,
                "tab": 4,
                "sellPrice": 470500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrollPart", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Line3", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 4000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "TrollPart", "quantity": 50},
                        <ComponentModel>{"item": "Line3", "quantity": 10},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 20000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 4000}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts34", <RecipeModel>{
                "intID": "EquipmentShirts34",
                "recipe": [
                    <ComponentModel>{"item": "TrollPart", "quantity": 25},
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 25},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 10000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 2800}
                ],
                "levelReqToCraft": 68,
                "expGiven": 1000000,
                "no": 62,
                "tab": 4,
                "sellPrice": 390000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrollPart", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC1b", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 2800}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "TrollPart", "quantity": 25},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 25},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 10000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 2800}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants8", <RecipeModel>{
                "intID": "EquipmentPants8",
                "recipe": [
                    <ComponentModel>{"item": "TrollPart", "quantity": 15},
                    <ComponentModel>{"item": "GalaxyC4", "quantity": 333333},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 5000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 1600}
                ],
                "levelReqToCraft": 67,
                "expGiven": 1000000,
                "no": 63,
                "tab": 4,
                "sellPrice": 2500177500,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrollPart", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 0, "item": "GalaxyC4", "quantity": 333333},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 1600}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "TrollPart", "quantity": 15},
                        <ComponentModel>{"item": "GalaxyC4", "quantity": 333333},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 5000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 1600}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes34", <RecipeModel>{
                "intID": "EquipmentShoes34",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes30", "quantity": 8},
                    <ComponentModel>{"item": "TrollPart", "quantity": 10},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                    <ComponentModel>{"item": "Refinery6", "quantity": 750}
                ],
                "levelReqToCraft": 65,
                "expGiven": 1000000,
                "no": 64,
                "tab": 4,
                "sellPrice": 112000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes30", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrollPart", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 750}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "EquipmentShoes30", "quantity": 8},
                        <ComponentModel>{"item": "TrollPart", "quantity": 10},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 750}
                    ]
                }
            }),
        new RecipeBase("EquipmentHats77", <RecipeModel>{
                "intID": "EquipmentHats77",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentHats74", "quantity": 1},
                    <ComponentModel>{"item": "Bug10", "quantity": 80000},
                    <ComponentModel>{"item": "DreadloBar", "quantity": 2500}
                ],
                "levelReqToCraft": 65,
                "expGiven": 1000000,
                "no": 1,
                "tab": 5,
                "sellPrice": 26073000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentHats74", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TrollPart", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Line3", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StarfireBar", "quantity": 20000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery6", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug10", "quantity": 80000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DreadloBar", "quantity": 2500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug10", "quantity": 80000},
                        <ComponentModel>{"item": "DreadloBar", "quantity": 2500},
                        <ComponentModel>{"item": "TrollPart", "quantity": 50},
                        <ComponentModel>{"item": "Line3", "quantity": 10},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 20000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 4000}
                    ]
                }
            }),
        new RecipeBase("EquipmentShirts35", <RecipeModel>{
                "intID": "EquipmentShirts35",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShirts34", "quantity": 1},
                    <ComponentModel>{"item": "LavaA3", "quantity": 900000},
                    <ComponentModel>{"item": "DreadloBar", "quantity": 1200}
                ],
                "levelReqToCraft": 66,
                "expGiven": 1000000,
                "no": 2,
                "tab": 5,
                "sellPrice": 19800391200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShirts34", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TrollPart", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyC1b", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StarfireBar", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery6", "quantity": 2800},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaA3", "quantity": 900000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DreadloBar", "quantity": 1200}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "LavaA3", "quantity": 900000},
                        <ComponentModel>{"item": "DreadloBar", "quantity": 1200},
                        <ComponentModel>{"item": "TrollPart", "quantity": 25},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 25},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 10000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 2800}
                    ]
                }
            }),
        new RecipeBase("EquipmentPants26", <RecipeModel>{
                "intID": "EquipmentPants26",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPants8", "quantity": 1},
                    <ComponentModel>{"item": "LavaA4", "quantity": 10000000},
                    <ComponentModel>{"item": "DreadloBar", "quantity": 1600}
                ],
                "levelReqToCraft": 67,
                "expGiven": 1000000,
                "no": 3,
                "tab": 5,
                "sellPrice": 292500179100,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPants8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TrollPart", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyC4", "quantity": 333333},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StarfireBar", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery6", "quantity": 1600},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaA4", "quantity": 10000000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DreadloBar", "quantity": 1600}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "LavaA4", "quantity": 10000000},
                        <ComponentModel>{"item": "DreadloBar", "quantity": 1600},
                        <ComponentModel>{"item": "TrollPart", "quantity": 15},
                        <ComponentModel>{"item": "GalaxyC4", "quantity": 333333},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 5000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 1600}
                    ]
                }
            }),
        new RecipeBase("EquipmentShoes35", <RecipeModel>{
                "intID": "EquipmentShoes35",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentShoes34", "quantity": 1},
                    <ComponentModel>{"item": "LavaB3", "quantity": 1200000},
                    <ComponentModel>{"item": "DreadloBar", "quantity": 2000}
                ],
                "levelReqToCraft": 68,
                "expGiven": 1000000,
                "no": 4,
                "tab": 5,
                "sellPrice": 69600114000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentShoes34", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentShoes30", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TrollPart", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StarfireBar", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery6", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaB3", "quantity": 1200000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "DreadloBar", "quantity": 2000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "LavaB3", "quantity": 1200000},
                        <ComponentModel>{"item": "DreadloBar", "quantity": 2000},
                        <ComponentModel>{"item": "EquipmentShoes30", "quantity": 8},
                        <ComponentModel>{"item": "TrollPart", "quantity": 10},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 750}
                    ]
                }
            }),
        new RecipeBase("EquipmentPunching8", <RecipeModel>{
                "intID": "EquipmentPunching8",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentPunching7", "quantity": 1},
                    <ComponentModel>{"item": "FoodG10", "quantity": 1000},
                    <ComponentModel>{"item": "LavaA5b", "quantity": 500}
                ],
                "levelReqToCraft": 70,
                "expGiven": 1000000,
                "no": 5,
                "tab": 5,
                "sellPrice": 251223900,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentPunching7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentPunching6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentPunching5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SnowA2a", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter5A", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Quest36", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Quest37", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 4, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 4, "item": "DesertC2b", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CraftMat12", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StarfireBar", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery6", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodG10", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaA5b", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodG10", "quantity": 1000},
                        <ComponentModel>{"item": "LavaA5b", "quantity": 500},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 50000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 5000},
                        <ComponentModel>{"item": "CraftMat12", "quantity": 50000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 2000},
                        <ComponentModel>{"item": "SnowA2a", "quantity": 100},
                        <ComponentModel>{"item": "Critter5A", "quantity": 50},
                        <ComponentModel>{"item": "PureWater2", "quantity": 15},
                        <ComponentModel>{"item": "Quest37", "quantity": 10},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertC2b", "quantity": 50}
                    ]
                }
            }),
        new RecipeBase("EquipmentSword6", <RecipeModel>{
                "intID": "EquipmentSword6",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentSword5", "quantity": 1},
                    <ComponentModel>{"item": "Tree10", "quantity": 500000},
                    <ComponentModel>{"item": "LavaA5b", "quantity": 100}
                ],
                "levelReqToCraft": 67,
                "expGiven": 1000000,
                "no": 6,
                "tab": 5,
                "sellPrice": 186735910,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentSword5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentSword4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentSword3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentSword2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentSword1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "DesertA3b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat9", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 5, "item": "TestObj3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "ForestTree", "quantity": 1250},
                        <DetRecipeComponentModel>{"indent": 6, "item": "TestObj7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CraftMat6", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 6, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 4, "item": "SnowA2", "quantity": 25000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SnowC4a", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter6A", "quantity": 15},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 2, "item": "AlienTree", "quantity": 90000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish8", "quantity": 200000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StarfireBar", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery6", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree10", "quantity": 500000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaA5b", "quantity": 100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree10", "quantity": 500000},
                        <ComponentModel>{"item": "LavaA5b", "quantity": 100},
                        <ComponentModel>{"item": "Fish8", "quantity": 200000},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 750},
                        <ComponentModel>{"item": "AlienTree", "quantity": 90000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 10},
                        <ComponentModel>{"item": "Critter6A", "quantity": 15},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "SnowA2", "quantity": 25000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "DesertA3b", "quantity": 3},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 2500},
                        <ComponentModel>{"item": "ForestTree", "quantity": 1250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 125}
                    ]
                }
            }),
        new RecipeBase("EquipmentBows11", <RecipeModel>{
                "intID": "EquipmentBows11",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentBows10", "quantity": 1},
                    <ComponentModel>{"item": "Tree10", "quantity": 500000},
                    <ComponentModel>{"item": "LavaA5b", "quantity": 100}
                ],
                "levelReqToCraft": 67,
                "expGiven": 1000000,
                "no": 7,
                "tab": 5,
                "sellPrice": 175846000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentBows10", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentBows9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentBows8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentBows7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentBows6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentBows5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentBows3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 7, "item": "BirchTree", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 6, "item": "GoldBar", "quantity": 250},
                        <DetRecipeComponentModel>{"indent": 6, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 5, "item": "TreeInterior1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Fish4", "quantity": 1400},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Soul1", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SnowC4a", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery3", "quantity": 350},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish5", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter10A", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StarfireBar", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery6", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree10", "quantity": 500000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaA5b", "quantity": 100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree10", "quantity": 500000},
                        <ComponentModel>{"item": "LavaA5b", "quantity": 100},
                        <ComponentModel>{"item": "Critter10A", "quantity": 10},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 750},
                        <ComponentModel>{"item": "Fish5", "quantity": 110000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                        <ComponentModel>{"item": "Refinery3", "quantity": 350},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "Soul1", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "TreeInterior1b", "quantity": 3},
                        <ComponentModel>{"item": "Fish4", "quantity": 1400},
                        <ComponentModel>{"item": "GoldBar", "quantity": 250},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "BirchTree", "quantity": 250}
                    ]
                }
            }),
        new RecipeBase("EquipmentWands10", <RecipeModel>{
                "intID": "EquipmentWands10",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentWands9", "quantity": 1},
                    <ComponentModel>{"item": "Tree10", "quantity": 500000},
                    <ComponentModel>{"item": "LavaA5b", "quantity": 100}
                ],
                "levelReqToCraft": 67,
                "expGiven": 1000000,
                "no": 8,
                "tab": 5,
                "sellPrice": 178887200,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentWands9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentWands8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentWands7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentWands3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentWands6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentWands5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentWands2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "Jungle1", "quantity": 125},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CopperBar", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat7", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 6, "item": "PureWater", "quantity": 8},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Sewers1b", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Bug4", "quantity": 4000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "SaharanFoal", "quantity": 10000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 3, "item": "SnowC4a", "quantity": 4},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Soul4", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 7},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter7", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 500},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul5", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "StarfireBar", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Refinery6", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree10", "quantity": 500000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaA5b", "quantity": 100}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Tree10", "quantity": 500000},
                        <ComponentModel>{"item": "LavaA5b", "quantity": 100},
                        <ComponentModel>{"item": "Soul5", "quantity": 15000},
                        <ComponentModel>{"item": "StarfireBar", "quantity": 3000},
                        <ComponentModel>{"item": "Refinery6", "quantity": 800},
                        <ComponentModel>{"item": "Critter7", "quantity": 50000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 500},
                        <ComponentModel>{"item": "SnowC4a", "quantity": 4},
                        <ComponentModel>{"item": "Soul4", "quantity": 5000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 7},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 10000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 150},
                        <ComponentModel>{"item": "Sewers1b", "quantity": 3},
                        <ComponentModel>{"item": "Bug4", "quantity": 4000},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater", "quantity": 8},
                        <ComponentModel>{"item": "Jungle1", "quantity": 125},
                        <ComponentModel>{"item": "CopperBar", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("EquipmentTools9", <RecipeModel>{
                "intID": "EquipmentTools9",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentTools12", "quantity": 1},
                    <ComponentModel>{"item": "StarfireBar", "quantity": 10000}
                ],
                "levelReqToCraft": 70,
                "expGiven": 1000000,
                "no": 9,
                "tab": 5,
                "sellPrice": 83672240,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentTools12", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentTools8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentTools11", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentTools7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentTools6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentTools5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentTools3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "IronBar", "quantity": 70},
                        <DetRecipeComponentModel>{"indent": 7, "item": "Jungle3", "quantity": 150},
                        <DetRecipeComponentModel>{"indent": 6, "item": "DesertA2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "GoldBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 5, "item": "DesertB3", "quantity": 10500},
                        <DetRecipeComponentModel>{"indent": 4, "item": "DementiaBar", "quantity": 275},
                        <DetRecipeComponentModel>{"indent": 4, "item": "SnowA3", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "VoidBar", "quantity": 400},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "LustreBar", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "LustreBar", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyC1b", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 0, "item": "StarfireBar", "quantity": 10000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "StarfireBar", "quantity": 10000},
                        <ComponentModel>{"item": "LustreBar", "quantity": 6000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 20},
                        <ComponentModel>{"item": "Refinery4", "quantity": 600},
                        <ComponentModel>{"item": "VoidBar", "quantity": 400},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 275},
                        <ComponentModel>{"item": "SnowA3", "quantity": 15000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "DesertB3", "quantity": 10500},
                        <ComponentModel>{"item": "DesertA2", "quantity": 2500},
                        <ComponentModel>{"item": "GoldBar", "quantity": 800},
                        <ComponentModel>{"item": "IronBar", "quantity": 70},
                        <ComponentModel>{"item": "Jungle3", "quantity": 150}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagMi9", <RecipeModel>{
                "intID": "MaxCapBagMi9",
                "recipe": [<ComponentModel>{"item": "Starfire", "quantity": 900000}],
                "levelReqToCraft": 67,
                "expGiven": 1000000,
                "no": 10,
                "tab": 5,
                "sellPrice": 90000000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "Starfire", "quantity": 900000}],
                    "detRecipeTotals": [<ComponentModel>{"item": "Starfire", "quantity": 900000}]
                }
            }),
        new RecipeBase("EquipmentToolsHatchet9", <RecipeModel>{
                "intID": "EquipmentToolsHatchet9",
                "recipe": [
                    <ComponentModel>{"item": "EquipmentToolsHatchet8", "quantity": 1},
                    <ComponentModel>{"item": "AlienTree", "quantity": 110000}
                ],
                "levelReqToCraft": 70,
                "expGiven": 1000000,
                "no": 11,
                "tab": 5,
                "sellPrice": 23246450,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "EquipmentToolsHatchet8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "EquipmentToolsHatchet6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "EquipmentToolsHatchet7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "EquipmentToolsHatchet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "EquipmentToolsHatchet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "EquipmentToolsHatchet2", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "EquipmentToolsHatchet1", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "JungleTree", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 7, "item": "CraftMat6", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 6, "item": "DesertA3", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PalmTree", "quantity": 6500},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CraftMat7", "quantity": 5000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "SaharanFoal", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Tree7", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "AlienTree", "quantity": 110000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 600},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Tree8", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyC1b", "quantity": 40},
                        <DetRecipeComponentModel>{"indent": 0, "item": "AlienTree", "quantity": 110000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "AlienTree", "quantity": 220000},
                        <ComponentModel>{"item": "Tree8", "quantity": 100000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 40},
                        <ComponentModel>{"item": "Refinery4", "quantity": 600},
                        <ComponentModel>{"item": "Tree7", "quantity": 50000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "SaharanFoal", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "PalmTree", "quantity": 6500},
                        <ComponentModel>{"item": "CraftMat7", "quantity": 5000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "DesertA3", "quantity": 2000},
                        <ComponentModel>{"item": "JungleTree", "quantity": 200},
                        <ComponentModel>{"item": "CraftMat6", "quantity": 100}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagT9", <RecipeModel>{
                "intID": "MaxCapBagT9",
                "recipe": [<ComponentModel>{"item": "Tree9", "quantity": 900000}],
                "levelReqToCraft": 67,
                "expGiven": 1000000,
                "no": 12,
                "tab": 5,
                "sellPrice": 135000000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "Tree9", "quantity": 900000}],
                    "detRecipeTotals": [<ComponentModel>{"item": "Tree9", "quantity": 900000}]
                }
            }),
        new RecipeBase("FishingRod10", <RecipeModel>{
                "intID": "FishingRod10",
                "recipe": [<ComponentModel>{"item": "FishingRod9", "quantity": 1}, <ComponentModel>{"item": "Fish8", "quantity": 250000}],
                "levelReqToCraft": 71,
                "expGiven": 1000000,
                "no": 13,
                "tab": 5,
                "sellPrice": 3138659,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FishingRod9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Fish7", "quantity": 40000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyC1b", "quantity": 60},
                        <DetRecipeComponentModel>{"indent": 1, "item": "FishingRod8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Fish5", "quantity": 90000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "FishingRod7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Refinery3", "quantity": 200},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter5A", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "FishingRod6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "DementiaBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 4, "item": "FishingRod5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Fish4", "quantity": 2000},
                        <DetRecipeComponentModel>{"indent": 5, "item": "PlatBar", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 5, "item": "FishingRod4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Fish2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CraftMat9", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 6, "item": "FishingRod3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "IronBar", "quantity": 300},
                        <DetRecipeComponentModel>{"indent": 7, "item": "Fish2", "quantity": 650},
                        <DetRecipeComponentModel>{"indent": 7, "item": "PureWater", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Fish8", "quantity": 250000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Fish8", "quantity": 250000},
                        <ComponentModel>{"item": "Fish7", "quantity": 40000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 60},
                        <ComponentModel>{"item": "Fish5", "quantity": 90000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 750},
                        <ComponentModel>{"item": "Refinery3", "quantity": 200},
                        <ComponentModel>{"item": "Critter5A", "quantity": 3},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "DementiaBar", "quantity": 300},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Fish4", "quantity": 2000},
                        <ComponentModel>{"item": "PlatBar", "quantity": 800},
                        <ComponentModel>{"item": "Fish2", "quantity": 3150},
                        <ComponentModel>{"item": "CraftMat9", "quantity": 1000},
                        <ComponentModel>{"item": "IronBar", "quantity": 300},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagFi9", <RecipeModel>{
                "intID": "MaxCapBagFi9",
                "recipe": [<ComponentModel>{"item": "Fish8", "quantity": 900000}],
                "levelReqToCraft": 68,
                "expGiven": 1000000,
                "no": 14,
                "tab": 5,
                "sellPrice": 4500000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "Fish8", "quantity": 900000}],
                    "detRecipeTotals": [<ComponentModel>{"item": "Fish8", "quantity": 900000}]
                }
            }),
        new RecipeBase("CatchingNet10", <RecipeModel>{
                "intID": "CatchingNet10",
                "recipe": [<ComponentModel>{"item": "CatchingNet9", "quantity": 1}, <ComponentModel>{"item": "Bug9", "quantity": 250000}],
                "levelReqToCraft": 71,
                "expGiven": 1000000,
                "no": 15,
                "tab": 5,
                "sellPrice": 74156050,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "CatchingNet9", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Bug8", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "GalaxyC1b", "quantity": 80},
                        <DetRecipeComponentModel>{"indent": 1, "item": "CatchingNet8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Bug7", "quantity": 130000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "CatchingNet7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Bug6", "quantity": 50000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "CatchingNet6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Bug5", "quantity": 15000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 4, "item": "CatchingNet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Bug4", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Plat", "quantity": 3000},
                        <DetRecipeComponentModel>{"indent": 5, "item": "CatchingNet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Quest19", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 6, "item": "Bug2", "quantity": 2500},
                        <DetRecipeComponentModel>{"indent": 6, "item": "CatchingNet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 7, "item": "ForestTree", "quantity": 800},
                        <DetRecipeComponentModel>{"indent": 7, "item": "Bug2", "quantity": 850},
                        <DetRecipeComponentModel>{"indent": 7, "item": "PureWater", "quantity": 3},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 750},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug9", "quantity": 250000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug9", "quantity": 250000},
                        <ComponentModel>{"item": "Bug8", "quantity": 100000},
                        <ComponentModel>{"item": "GalaxyC1b", "quantity": 80},
                        <ComponentModel>{"item": "Bug7", "quantity": 130000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 750},
                        <ComponentModel>{"item": "Bug6", "quantity": 50000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Bug5", "quantity": 15000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 50},
                        <ComponentModel>{"item": "Bug4", "quantity": 7000},
                        <ComponentModel>{"item": "Plat", "quantity": 3000},
                        <ComponentModel>{"item": "Quest19", "quantity": 5},
                        <ComponentModel>{"item": "Bug2", "quantity": 3350},
                        <ComponentModel>{"item": "ForestTree", "quantity": 800},
                        <ComponentModel>{"item": "PureWater", "quantity": 3}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagB9", <RecipeModel>{
                "intID": "MaxCapBagB9",
                "recipe": [<ComponentModel>{"item": "Bug9", "quantity": 900000}],
                "levelReqToCraft": 68,
                "expGiven": 1000000,
                "no": 16,
                "tab": 5,
                "sellPrice": 180000000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [<DetRecipeComponentModel>{"indent": 0, "item": "Bug9", "quantity": 900000}],
                    "detRecipeTotals": [<ComponentModel>{"item": "Bug9", "quantity": 900000}]
                }
            }),
        new RecipeBase("TrapBoxSet8", <RecipeModel>{
                "intID": "TrapBoxSet8",
                "recipe": [
                    <ComponentModel>{"item": "TrapBoxSet7", "quantity": 1},
                    <ComponentModel>{"item": "Critter10A", "quantity": 100},
                    <ComponentModel>{"item": "Refinery6", "quantity": 10000}
                ],
                "levelReqToCraft": 73,
                "expGiven": 1000000,
                "no": 17,
                "tab": 5,
                "sellPrice": 9111613,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "TrapBoxSet7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Critter10", "quantity": 100000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "TrapBoxSet6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Critter8A", "quantity": 10},
                        <DetRecipeComponentModel>{"indent": 2, "item": "TrapBoxSet5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Critter6A", "quantity": 6},
                        <DetRecipeComponentModel>{"indent": 3, "item": "TrapBoxSet4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Critter4A", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 4, "item": "TrapBoxSet3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Critter2A", "quantity": 2},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Refinery1", "quantity": 20},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter10A", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 10000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Critter10A", "quantity": 100},
                        <ComponentModel>{"item": "Refinery6", "quantity": 10000},
                        <ComponentModel>{"item": "Critter10", "quantity": 100000},
                        <ComponentModel>{"item": "Critter8A", "quantity": 10},
                        <ComponentModel>{"item": "Refinery4", "quantity": 1000},
                        <ComponentModel>{"item": "Critter6A", "quantity": 6},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Critter4A", "quantity": 5},
                        <ComponentModel>{"item": "Refinery1", "quantity": 70},
                        <ComponentModel>{"item": "Critter2A", "quantity": 2}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagTr8", <RecipeModel>{
                "intID": "MaxCapBagTr8",
                "recipe": [<ComponentModel>{"item": "Critter10", "quantity": 900000}, <ComponentModel>{"item": "Refinery4", "quantity": 5000}],
                "levelReqToCraft": 69,
                "expGiven": 1000000,
                "no": 18,
                "tab": 5,
                "sellPrice": 72500000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Critter10", "quantity": 900000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 5000}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Critter10", "quantity": 900000}, <ComponentModel>{"item": "Refinery4", "quantity": 5000}]
                }
            }),
        new RecipeBase("WorshipSkull9", <RecipeModel>{
                "intID": "WorshipSkull9",
                "recipe": [
                    <ComponentModel>{"item": "Soul6", "quantity": 125000},
                    <ComponentModel>{"item": "WorshipSkull8", "quantity": 1},
                    <ComponentModel>{"item": "WorshipSkull7", "quantity": 1},
                    <ComponentModel>{"item": "Refinery6", "quantity": 10000}
                ],
                "levelReqToCraft": 73,
                "expGiven": 1000000,
                "no": 19,
                "tab": 5,
                "sellPrice": 14688650,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul6", "quantity": 125000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "WorshipSkull8", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "WorshipSkull7", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 1, "item": "Soul5", "quantity": 60000},
                        <DetRecipeComponentModel>{"indent": 1, "item": "WorshipSkull6", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Soul4", "quantity": 40000},
                        <DetRecipeComponentModel>{"indent": 2, "item": "WorshipSkull5", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 3, "item": "Soul4", "quantity": 8000},
                        <DetRecipeComponentModel>{"indent": 3, "item": "WorshipSkull4", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Soul3", "quantity": 7000},
                        <DetRecipeComponentModel>{"indent": 4, "item": "Refinery1", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 4, "item": "WorshipSkull3", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Soul2", "quantity": 1200},
                        <DetRecipeComponentModel>{"indent": 5, "item": "Refinery1", "quantity": 25},
                        <DetRecipeComponentModel>{"indent": 3, "item": "PureWater2", "quantity": 5},
                        <DetRecipeComponentModel>{"indent": 2, "item": "Refinery4", "quantity": 1000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery6", "quantity": 10000}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Soul6", "quantity": 125000},
                        <ComponentModel>{"item": "WorshipSkull8", "quantity": 1},
                        <ComponentModel>{"item": "Refinery6", "quantity": 10000},
                        <ComponentModel>{"item": "Soul5", "quantity": 60000},
                        <ComponentModel>{"item": "Soul4", "quantity": 48000},
                        <ComponentModel>{"item": "Refinery4", "quantity": 1000},
                        <ComponentModel>{"item": "PureWater2", "quantity": 5},
                        <ComponentModel>{"item": "Soul3", "quantity": 7000},
                        <ComponentModel>{"item": "Refinery1", "quantity": 75},
                        <ComponentModel>{"item": "Soul2", "quantity": 1200}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagS8", <RecipeModel>{
                "intID": "MaxCapBagS8",
                "recipe": [<ComponentModel>{"item": "Soul6", "quantity": 800000}, <ComponentModel>{"item": "Refinery4", "quantity": 5000}],
                "levelReqToCraft": 69,
                "expGiven": 1000000,
                "no": 20,
                "tab": 5,
                "sellPrice": 56500000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Soul6", "quantity": 800000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Refinery4", "quantity": 5000}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "Soul6", "quantity": 800000}, <ComponentModel>{"item": "Refinery4", "quantity": 5000}]
                }
            }),
        new RecipeBase("MaxCapBagF9", <RecipeModel>{
                "intID": "MaxCapBagF9",
                "recipe": [
                    <ComponentModel>{"item": "FoodHealth15", "quantity": 2500000},
                    <ComponentModel>{"item": "FoodG9", "quantity": 50},
                    <ComponentModel>{"item": "FoodG10", "quantity": 50}
                ],
                "levelReqToCraft": 68,
                "expGiven": 1000000,
                "no": 21,
                "tab": 5,
                "sellPrice": 40000010000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodHealth15", "quantity": 2500000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodG9", "quantity": 50},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FoodG10", "quantity": 50}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "FoodHealth15", "quantity": 2500000},
                        <ComponentModel>{"item": "FoodG9", "quantity": 50},
                        <ComponentModel>{"item": "FoodG10", "quantity": 50}
                    ]
                }
            }),
        new RecipeBase("MaxCapBagM10", <RecipeModel>{
                "intID": "MaxCapBagM10",
                "recipe": [
                    <ComponentModel>{"item": "LavaA1", "quantity": 2000000},
                    <ComponentModel>{"item": "LavaB1", "quantity": 600000},
                    <ComponentModel>{"item": "LavaA5b", "quantity": 200}
                ],
                "levelReqToCraft": 69,
                "expGiven": 1000000,
                "no": 22,
                "tab": 5,
                "sellPrice": 55300000000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaA1", "quantity": 2000000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaB1", "quantity": 600000},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaA5b", "quantity": 200}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "LavaA1", "quantity": 2000000},
                        <ComponentModel>{"item": "LavaB1", "quantity": 600000},
                        <ComponentModel>{"item": "LavaA5b", "quantity": 200}
                    ]
                }
            }),
        new RecipeBase("Bullet3", <RecipeModel>{
                "intID": "Bullet3",
                "recipe": [
                    <ComponentModel>{"item": "Bug10", "quantity": 100},
                    <ComponentModel>{"item": "Tree10", "quantity": 100},
                    <ComponentModel>{"item": "LavaB5", "quantity": 500}
                ],
                "levelReqToCraft": 71,
                "expGiven": 1000000,
                "no": 23,
                "tab": 5,
                "sellPrice": 40057000,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "Bug10", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "Tree10", "quantity": 100},
                        <DetRecipeComponentModel>{"indent": 0, "item": "LavaB5", "quantity": 500}
                    ],
                    "detRecipeTotals": [
                        <ComponentModel>{"item": "Bug10", "quantity": 100},
                        <ComponentModel>{"item": "Tree10", "quantity": 100},
                        <ComponentModel>{"item": "LavaB5", "quantity": 500}
                    ]
                }
            }),
        new RecipeBase("EquipmentSmithingTabs6", <RecipeModel>{
                "intID": "EquipmentSmithingTabs6",
                "recipe": [
                    <ComponentModel>{"item": "FillerMaterial", "quantity": 1},
                    <ComponentModel>{"item": "FillerMaterial", "quantity": 1},
                    <ComponentModel>{"item": "FillerMaterial", "quantity": 1}
                ],
                "levelReqToCraft": 80,
                "expGiven": 1000000,
                "no": 24,
                "tab": 5,
                "sellPrice": 12,
                "recipeFrom": [],
                "detailedRecipe": <DetailedRecipeModel>{
                    "detRecipe": [
                        <DetRecipeComponentModel>{"indent": 0, "item": "FillerMaterial", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FillerMaterial", "quantity": 1},
                        <DetRecipeComponentModel>{"indent": 0, "item": "FillerMaterial", "quantity": 1}
                    ],
                    "detRecipeTotals": [<ComponentModel>{"item": "FillerMaterial", "quantity": 3}]
                }
            })    
]
}
