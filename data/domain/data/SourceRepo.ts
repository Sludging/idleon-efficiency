import { SourceModel } from '../model/sourceModel';
import { SourcesModel } from '../model/sourcesModel';

export class SourcesBase { constructor(public id: string, public data: SourcesModel) { } }



export const initSourceRepo = () => {
    return [    
        new SourcesBase("EquipmentPunching1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TestObj1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPunching2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats17", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats20", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats16", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats21", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TestObj7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[DropTable1|Recipe from DropTable1]]", "txtName": "DropTable1"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats18", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts12", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentSmithingTabs2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Scripticus#The Smithing Grind|Recipe from The Smithing Grind]]",
                        "txtName": "Scripticus: The Smithing Grind"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#The Smithing Grind|The Smithing Grind]]",
                        "txtName": "Scripticus: The Smithing Grind"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum#Dewdrop_Silver_Chest|W1 Colosseum first silver chest]]",
                        "txtName": "Colosseum: W1 Colosseum first silver chest"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[DropTable3|Recipe from DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodMining1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Krunk#A Plot to be Perfect|A Plot to be Perfect]]",
                        "txtName": "Krunk: A Plot to be Perfect"
                    },
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("FoodChoppin1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Slime|Recipe from Slime]]", "txtName": "Slime"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Slime]]", "txtName": "Slime"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Glublin|Recipe from Glublin]]", "txtName": "Glublin"},
                    <SourceModel>{
                        "wikiName": "[[Funguy#Videogame Highscores are COOL!|Recipe from Videogame Highscores are COOL!]]",
                        "txtName": "Funguy: Videogame Highscores are COOL!"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{"wikiName": "[[Glublin]]", "txtName": "Glublin"},
                    <SourceModel>{
                        "wikiName": "[[Funguy#Videogame Highscores are COOL!|Videogame Highscores are COOL!]]",
                        "txtName": "Funguy: Videogame Highscores are COOL!"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts20", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("OilBarrel5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings14", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Slime|Recipe from Slime]]", "txtName": "Slime"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Slime]]", "txtName": "Slime"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants15", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Wode Board|Recipe from Wode Board]]", "txtName": "Wode Board"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Wode Board]]", "txtName": "Wode Board"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants18", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("Peanut", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Brunchin' with the Blobs|Brunchin' with the Blobs]]",
                        "txtName": "Picnic Stowaway: Brunchin' with the Blobs"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("PeanutG", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Rocklyte#How It's Made, Episode 7. The Super Peanut|Recipe from How It's Made, Episode 7. The Super Peanut]]",
                        "txtName": "Rocklyte: How It's Made, Episode 7. The Super Peanut"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Rocklyte#How It's Made, Episode 7. The Super Peanut|How It's Made, Episode 7. The Super Peanut]]",
                        "txtName": "Rocklyte: How It's Made, Episode 7. The Super Peanut"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("InvBag102", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts25", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts24", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("BadgeG1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ]
            }),
        new SourcesBase("BadgeG2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ]
            }),
        new SourcesBase("BadgeG3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ]
            }),
        new SourcesBase("EquipmentHats67", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings26", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Baba Yaga|Recipe from Baba Yaga]]", "txtName": "Baba Yaga"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Baba Yaga]]", "txtName": "Baba Yaga"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats22", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts18", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants17", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes20", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants22", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Walking Stick|Recipe from Walking Stick]]", "txtName": "Walking Stick"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Walking Stick]]", "txtName": "Walking Stick"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants23", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Poop|Recipe from Poop]]", "txtName": "Poop"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"}],
                "questAss": []
            }),
        new SourcesBase("FillerMaterial", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant17", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("FishingRod2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("CatchingNet2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("FishingRod3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("CatchingNet3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 1]]",
                        "txtName": "Task Unlocks Tab 1"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 1]]", "txtName": "Task Unlocks Tab 1"}],
                "questAss": []
            }),
        new SourcesBase("TrapBoxSet2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagTr1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagS1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats28", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPunching3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("TestObj3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("FishingRod4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("CatchingNet4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings11", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Mimic|Recipe from Mimic]]", "txtName": "Mimic"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Mimic]]", "txtName": "Mimic"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant16", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Mafioso|Recipe from Mafioso]]", "txtName": "Mafioso"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Mafioso]]", "txtName": "Mafioso"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagF3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats19", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant26", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Dr Defecaus|Recipe from Dr Defecaus]]", "txtName": "Dr Defecaus"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSword1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("FishingRod5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("CatchingNet5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagF4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSmithingTabs3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Postboy Pablob#Signed, Sealed and Lost in the Post|Signed, Sealed and Lost in the Post]]",
                        "txtName": "Postboy Pablob: Signed, Sealed and Lost in the Post"
                    }
                ]
            }),
        new SourcesBase("Quest35", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Crabcake|Recipe from Crabcake]]", "txtName": "Crabcake"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Crabcake]]", "txtName": "Crabcake"}],
                "questAss": []
            }),
        new SourcesBase("Bullet", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("BulletB", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats64", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TestObj13", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats41", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats26", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts23", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts22", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes16", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes18", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes17", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes19", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("FoodFish1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("FoodCatch1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("Quest36", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Sand Giant|Recipe from Sand Giant]]", "txtName": "Sand Giant"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Sand Giant]]", "txtName": "Sand Giant"}],
                "questAss": []
            }),
        new SourcesBase("InvBag103", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 2]]",
                        "txtName": "Task Unlocks Tab 2"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 2]]", "txtName": "Task Unlocks Tab 2"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats52", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts26", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants20", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings16", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings27", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[King Doot|Recipe from King Doot]]", "txtName": "King Doot"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant27", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Biggie Hours|Recipe from Biggie Hours]]", "txtName": "Biggie Hours"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"}],
                "questAss": []
            }),
        new SourcesBase("TrapBoxSet3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagTr3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagS3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("BadgeD1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The New Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ]
            }),
        new SourcesBase("BadgeD2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The New Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ]
            }),
        new SourcesBase("BadgeD3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The New Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ]
            }),
        new SourcesBase("ResetCompletedS", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Biggie Hours|Recipe from Biggie Hours]]", "txtName": "Biggie Hours"},
                    <SourceModel>{"wikiName": "[[Efaunt|Recipe from Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{
                        "wikiName": "[[Builder Bird#Restoring Power to the Portal|Restoring Power to the Portal]]",
                        "txtName": "Builder Bird: Restoring Power to the Portal"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Bunny you Should Say That!|Bunny you Should Say That!]]",
                        "txtName": "Lord of the Hunt: Bunny you Should Say That!"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [
                    <SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"},
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"}
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken28", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken29", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken30", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats53", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPunching4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSword2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("FishingRod6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("CatchingNet6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("TrapBoxSet4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagTr4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagS4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings28", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Dilapidated Slush|Recipe from Dilapidated Slush]]",
                        "txtName": "Dilapidated Slush"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings29", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Mutated Mush|Recipe from Mutated Mush]]", "txtName": "Mutated Mush"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagF5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats54", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts27", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes22", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPunching5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSword3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools11", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagMi6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("FishingRod7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("CatchingNet7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("TrapBoxSet5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagTr5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagS5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagF6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSmithingTabs4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats61", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats58", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats59", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats60", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts31", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts28", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts29", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts30", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("FoodTrapping1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("FoodWorship1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("InvBag109", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 3]]",
                        "txtName": "Task Unlocks Tab 3"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 3]]", "txtName": "Task Unlocks Tab 3"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats66", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("BadgeI1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|Recipe from The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ]
            }),
        new SourcesBase("BadgeI2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|Recipe from The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ]
            }),
        new SourcesBase("BadgeI3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|Recipe from The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ]
            }),
        new SourcesBase("Quest68", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[DropTable15|Recipe from DropTable15]]", "txtName": "DropTable15"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"}],
                "questAss": []
            }),
        new SourcesBase("NPCtoken39", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|Recipe from The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken40", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|Recipe from The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken41", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|Recipe from The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant25", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Recipe from Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats68", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Recipe from Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Recipe from Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Recipe from Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes23", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Recipe from Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Frostbite_Tundra#Merit_Shop|Frostbite Tundra Merit Shop]]",
                        "txtName": "Frostbite Tundra Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats70", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts32", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPunching6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSword4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagMi7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("FishingRod8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("CatchingNet8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("TrapBoxSet6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagTr6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagS6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes26", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes27", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes28", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes29", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes31", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes33", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagF7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats71", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts33", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants25", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes25", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPunching7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSword5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools12", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagMi8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("FishingRod9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("CatchingNet9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("TrapBoxSet7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagTr7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagS7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagF8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSmithingTabs5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag111", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Tasks/Unlocks|Recipe from Task Unlocks Tab 4]]",
                        "txtName": "Task Unlocks Tab 4"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Tasks/Unlocks|Task Unlocks Tab 4]]", "txtName": "Task Unlocks Tab 4"}],
                "questAss": []
            }),
        new SourcesBase("DNAgun1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Pincermin|Recipe from Pincermin]]", "txtName": "Pincermin"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Pincermin]]", "txtName": "Pincermin"}],
                "questAss": []
            }),
        new SourcesBase("DNAgun2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Thermister|Recipe from Thermister]]", "txtName": "Thermister"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Thermister]]", "txtName": "Thermister"}],
                "questAss": []
            }),
        new SourcesBase("DNAgun3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Octodar|Recipe from Octodar]]", "txtName": "Octodar"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Octodar]]", "txtName": "Octodar"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings30", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Mutated Mush|Recipe from Mutated Mush]]", "txtName": "Mutated Mush"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats74", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts34", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes34", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats77", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Cheese Nub|Recipe from Cheese Nub]]", "txtName": "Cheese Nub"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Cheese Nub]]", "txtName": "Cheese Nub"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts35", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Stiltmole|Recipe from Stiltmole]]", "txtName": "Stiltmole"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Stiltmole]]", "txtName": "Stiltmole"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants26", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Molti|Recipe from Molti]]", "txtName": "Molti"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Molti]]", "txtName": "Molti"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes35", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Purgatory Stalker|Recipe from Purgatory Stalker]]",
                        "txtName": "Purgatory Stalker"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Purgatory Stalker]]", "txtName": "Purgatory Stalker"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentPunching8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Suggma|Recipe from Suggma]]", "txtName": "Suggma"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Suggma]]", "txtName": "Suggma"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSword6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Citringe|Recipe from Citringe]]", "txtName": "Citringe"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Citringe]]", "txtName": "Citringe"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows11", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Lampar|Recipe from Lampar]]", "txtName": "Lampar"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Lampar]]", "txtName": "Lampar"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentWands10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Fire Spirit|Recipe from Fire Spirit]]", "txtName": "Fire Spirit"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Fire Spirit]]", "txtName": "Fire Spirit"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagMi9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FishingRod10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagFi9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CatchingNet10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagB9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TrapBoxSet8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagTr8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagS8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagF9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Maccie|Recipe from Maccie]]", "txtName": "Maccie"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Maccie]]", "txtName": "Maccie"}],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{
                        "wikiName": "[[Mister Brightside|Recipe from Mister Brightside]]",
                        "txtName": "Mister Brightside"
                    }
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Mister Brightside]]", "txtName": "Mister Brightside"}],
                "questAss": []
            }),
        new SourcesBase("Bullet3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"},
                    <SourceModel>{"wikiName": "[[Biggole Mole|Recipe from Biggole Mole]]", "txtName": "Biggole Mole"}
                ],
                "recipeFrom": [<SourceModel>{"wikiName": "[[Biggole Mole]]", "txtName": "Biggole Mole"}],
                "questAss": []
            }),
        new SourcesBase("EquipmentSmithingTabs6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Smithing]]", "txtName": "Smithing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("COIN", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Eldritch Croaker]]", "txtName": "Eldritch Croaker"},
                    <SourceModel>{"wikiName": "[[Rotting Grandfrogger]]", "txtName": "Rotting Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Forlorn Grandfrogger]]", "txtName": "Forlorn Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Vengeful Grandfrogger]]", "txtName": "Vengeful Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Fallen Meteor]]", "txtName": "Fallen Meteor"},
                    <SourceModel>{"wikiName": "[[Beefie]]", "txtName": "Beefie"},
                    <SourceModel>{"wikiName": "[[Crescent Spud]]", "txtName": "Crescent Spud"},
                    <SourceModel>{"wikiName": "[[Enraged Snakenhotep]]", "txtName": "Enraged Snakenhotep"},
                    <SourceModel>{"wikiName": "[[Inevitable Snakenhotep]]", "txtName": "Inevitable Snakenhotep"},
                    <SourceModel>{"wikiName": "[[Ice Guard]]", "txtName": "Ice Guard"},
                    <SourceModel>{"wikiName": "[[Glaciaxus]]", "txtName": "Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Golden Glaciaxus]]", "txtName": "Golden Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Caustic Glaciaxus]]", "txtName": "Caustic Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Crystal Custard]]", "txtName": "Crystal Custard"},
                    <SourceModel>{"wikiName": "[[Crystal Capybara]]", "txtName": "Crystal Capybara"},
                    <SourceModel>{"wikiName": "[[Green Mushroom]]", "txtName": "Green Mushroom"},
                    <SourceModel>{"wikiName": "[[Red Mushroom]]", "txtName": "Red Mushroom"},
                    <SourceModel>{"wikiName": "[[Wood Mushroom]]", "txtName": "Wood Mushroom"},
                    <SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"},
                    <SourceModel>{"wikiName": "[[Bored Bean]]", "txtName": "Bored Bean"},
                    <SourceModel>{"wikiName": "[[Slime]]", "txtName": "Slime"},
                    <SourceModel>{"wikiName": "[[Baby Boa]]", "txtName": "Baby Boa"},
                    <SourceModel>{"wikiName": "[[Carrotman]]", "txtName": "Carrotman"},
                    <SourceModel>{"wikiName": "[[Glublin]]", "txtName": "Glublin"},
                    <SourceModel>{"wikiName": "[[Wode Board]]", "txtName": "Wode Board"},
                    <SourceModel>{"wikiName": "[[Gigafrog]]", "txtName": "Gigafrog"},
                    <SourceModel>{"wikiName": "[[Walking Stick]]", "txtName": "Walking Stick"},
                    <SourceModel>{"wikiName": "[[Nutto]]", "txtName": "Nutto"},
                    <SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"},
                    <SourceModel>{"wikiName": "[[Rat]]", "txtName": "Rat"},
                    <SourceModel>{"wikiName": "[[Boop]]", "txtName": "Boop"},
                    <SourceModel>{"wikiName": "[[Baba Yaga]]", "txtName": "Baba Yaga"},
                    <SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"},
                    <SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"},
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"},
                    <SourceModel>{"wikiName": "[[Shielding Rune]]", "txtName": "Shielding Rune"},
                    <SourceModel>{"wikiName": "[[Ice Ball]]", "txtName": "Ice Ball"},
                    <SourceModel>{"wikiName": "[[Sandy Pot]]", "txtName": "Sandy Pot"},
                    <SourceModel>{"wikiName": "[[Mimic]]", "txtName": "Mimic"},
                    <SourceModel>{"wikiName": "[[Crabcake]]", "txtName": "Crabcake"},
                    <SourceModel>{"wikiName": "[[Dig Doug]]", "txtName": "Dig Doug"},
                    <SourceModel>{"wikiName": "[[Mafioso]]", "txtName": "Mafioso"},
                    <SourceModel>{"wikiName": "[[Sand Castle]]", "txtName": "Sand Castle"},
                    <SourceModel>{"wikiName": "[[Pincermin]]", "txtName": "Pincermin"},
                    <SourceModel>{"wikiName": "[[Mashed Potato]]", "txtName": "Mashed Potato"},
                    <SourceModel>{"wikiName": "[[Tyson]]", "txtName": "Tyson"},
                    <SourceModel>{"wikiName": "[[Moonmoon]]", "txtName": "Moonmoon"},
                    <SourceModel>{"wikiName": "[[Sand Giant]]", "txtName": "Sand Giant"},
                    <SourceModel>{"wikiName": "[[Snelbie]]", "txtName": "Snelbie"},
                    <SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"},
                    <SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"},
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"},
                    <SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"},
                    <SourceModel>{"wikiName": "[[Sheepie]]", "txtName": "Sheepie"},
                    <SourceModel>{"wikiName": "[[Frost Flake]]", "txtName": "Frost Flake"},
                    <SourceModel>{"wikiName": "[[Sir Stache]]", "txtName": "Sir Stache"},
                    <SourceModel>{"wikiName": "[[Dedotated Ram]]", "txtName": "Dedotated Ram"},
                    <SourceModel>{"wikiName": "[[Bloque]]", "txtName": "Bloque"},
                    <SourceModel>{"wikiName": "[[Mamooth]]", "txtName": "Mamooth"},
                    <SourceModel>{"wikiName": "[[Snowman]]", "txtName": "Snowman"},
                    <SourceModel>{"wikiName": "[[Penguin]]", "txtName": "Penguin"},
                    <SourceModel>{"wikiName": "[[Thermister]]", "txtName": "Thermister"},
                    <SourceModel>{"wikiName": "[[Quenchie]]", "txtName": "Quenchie"},
                    <SourceModel>{"wikiName": "[[Cryosnake]]", "txtName": "Cryosnake"},
                    <SourceModel>{"wikiName": "[[Bop Box]]", "txtName": "Bop Box"},
                    <SourceModel>{"wikiName": "[[Neyeptune]]", "txtName": "Neyeptune"},
                    <SourceModel>{"wikiName": "[[Xylobone]]", "txtName": "Xylobone"},
                    <SourceModel>{"wikiName": "[[Bloodbone]]", "txtName": "Bloodbone"},
                    <SourceModel>{"wikiName": "[[Chizoar]]", "txtName": "Chizoar"},
                    <SourceModel>{"wikiName": "[[Chaotic Chizoar]]", "txtName": "Chaotic Chizoar"},
                    <SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"},
                    <SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"},
                    <SourceModel>{"wikiName": "[[Massive Troll]]", "txtName": "Massive Troll"},
                    <SourceModel>{"wikiName": "[[Chaotic Troll]]", "txtName": "Chaotic Troll"},
                    <SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"},
                    <SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"},
                    <SourceModel>{"wikiName": "[[Purp Mushroom]]", "txtName": "Purp Mushroom"},
                    <SourceModel>{"wikiName": "[[TV]]", "txtName": "TV"},
                    <SourceModel>{"wikiName": "[[Donut]]", "txtName": "Donut"},
                    <SourceModel>{"wikiName": "[[Demon Genie]]", "txtName": "Demon Genie"},
                    <SourceModel>{"wikiName": "[[Soda Can]]", "txtName": "Soda Can"},
                    <SourceModel>{"wikiName": "[[Flying Worm]]", "txtName": "Flying Worm"},
                    <SourceModel>{"wikiName": "[[Gelatinous Cuboid]]", "txtName": "Gelatinous Cuboid"},
                    <SourceModel>{"wikiName": "[[Choccie]]", "txtName": "Choccie"},
                    <SourceModel>{"wikiName": "[[Biggole Wurm]]", "txtName": "Biggole Wurm"},
                    <SourceModel>{"wikiName": "[[Clammie]]", "txtName": "Clammie"},
                    <SourceModel>{"wikiName": "[[Octodar]]", "txtName": "Octodar"},
                    <SourceModel>{"wikiName": "[[Flombeige]]", "txtName": "Flombeige"},
                    <SourceModel>{"wikiName": "[[Stilted Seeker]]", "txtName": "Stilted Seeker"},
                    <SourceModel>{"wikiName": "[[Suggma]]", "txtName": "Suggma"},
                    <SourceModel>{"wikiName": "[[Maccie]]", "txtName": "Maccie"},
                    <SourceModel>{"wikiName": "[[Mister Brightside]]", "txtName": "Mister Brightside"},
                    <SourceModel>{"wikiName": "[[Cheese Nub]]", "txtName": "Cheese Nub"},
                    <SourceModel>{"wikiName": "[[Stiltmole]]", "txtName": "Stiltmole"},
                    <SourceModel>{"wikiName": "[[Molti]]", "txtName": "Molti"},
                    <SourceModel>{"wikiName": "[[Purgatory Stalker]]", "txtName": "Purgatory Stalker"},
                    <SourceModel>{"wikiName": "[[Citringe]]", "txtName": "Citringe"},
                    <SourceModel>{"wikiName": "[[Lampar]]", "txtName": "Lampar"},
                    <SourceModel>{"wikiName": "[[Fire Spirit]]", "txtName": "Fire Spirit"},
                    <SourceModel>{"wikiName": "[[Biggole Mole]]", "txtName": "Biggole Mole"},
                    <SourceModel>{"wikiName": "[[Crawler]]", "txtName": "Crawler"},
                    <SourceModel>{"wikiName": "[[Tremor Wurm]]", "txtName": "Tremor Wurm"},
                    <SourceModel>{"wikiName": "[[Kattlecruk]]", "txtName": "Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Chaotic Kattlecruk]]", "txtName": "Chaotic Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Sacrilegious Kattlecruk]]", "txtName": "Sacrilegious Kattlecruk"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Legendary Chest|Dewdrop Legendary Chest]]",
                        "txtName": "Colosseum: Dewdrop Legendary Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Legendary Chest|Sandstone Legendary Chest]]",
                        "txtName": "Colosseum: Sandstone Legendary Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Legendary Chest|Chillsnap Legendary Chest]]",
                        "txtName": "Colosseum: Chillsnap Legendary Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Golden Chest|Astro Golden Chest]]",
                        "txtName": "Colosseum: Astro Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Legendary Chest|Astro Legendary Chest]]",
                        "txtName": "Colosseum: Astro Legendary Chest"
                    },
                    <SourceModel>{"wikiName": "[[Ghost (Event)]]", "txtName": "Ghost (Event)"},
                    <SourceModel>{"wikiName": "[[Giftmas Blobulyte]]", "txtName": "Giftmas Blobulyte"},
                    <SourceModel>{"wikiName": "[[Valentslime]]", "txtName": "Valentslime"},
                    <SourceModel>{"wikiName": "[[Loveulyte]]", "txtName": "Loveulyte"},
                    <SourceModel>{"wikiName": "[[Chocco Box]]", "txtName": "Chocco Box"},
                    <SourceModel>{"wikiName": "[[Giant Rose]]", "txtName": "Giant Rose"},
                    <SourceModel>{"wikiName": "[[Floofie]]", "txtName": "Floofie"},
                    <SourceModel>{"wikiName": "[[Shell Snake]]", "txtName": "Shell Snake"},
                    <SourceModel>{"wikiName": "[[Egg Capsule]]", "txtName": "Egg Capsule"},
                    <SourceModel>{"wikiName": "[[Mr Blueberry]]", "txtName": "Mr Blueberry"},
                    <SourceModel>{"wikiName": "[[Plasti Doug]]", "txtName": "Plasti Doug"},
                    <SourceModel>{"wikiName": "[[Copper]]", "txtName": "Copper"},
                    <SourceModel>{"wikiName": "[[Iron]]", "txtName": "Iron"},
                    <SourceModel>{"wikiName": "[[Gold]]", "txtName": "Gold"},
                    <SourceModel>{"wikiName": "[[Plat]]", "txtName": "Plat"},
                    <SourceModel>{"wikiName": "[[Dementia]]", "txtName": "Dementia"},
                    <SourceModel>{"wikiName": "[[Void]]", "txtName": "Void"},
                    <SourceModel>{"wikiName": "[[Lustre]]", "txtName": "Lustre"},
                    <SourceModel>{"wikiName": "[[Starfire]]", "txtName": "Starfire"},
                    <SourceModel>{"wikiName": "[[Dreadlo]]", "txtName": "Dreadlo"},
                    <SourceModel>{"wikiName": "[[Godshard]]", "txtName": "Godshard"},
                    <SourceModel>{"wikiName": "[[Oak Tree]]", "txtName": "Oak Tree"},
                    <SourceModel>{"wikiName": "[[Birch Tree]]", "txtName": "Birch Tree"},
                    <SourceModel>{"wikiName": "[[Jungle Tree]]", "txtName": "Jungle Tree"},
                    <SourceModel>{"wikiName": "[[Forest Tree]]", "txtName": "Forest Tree"},
                    <SourceModel>{"wikiName": "[[Stump Tree]]", "txtName": "Stump Tree"},
                    <SourceModel>{"wikiName": "[[Toilet Tree]]", "txtName": "Toilet Tree"},
                    <SourceModel>{"wikiName": "[[Palm Tree]]", "txtName": "Palm Tree"},
                    <SourceModel>{"wikiName": "[[Saharan Foal]]", "txtName": "Saharan Foal"},
                    <SourceModel>{"wikiName": "[[Wispy Tree]]", "txtName": "Wispy Tree"},
                    <SourceModel>{"wikiName": "[[Alien Tree]]", "txtName": "Alien Tree"},
                    <SourceModel>{"wikiName": "[[Cubed Tree]]", "txtName": "Cubed Tree"},
                    <SourceModel>{"wikiName": "[[Maple Tree]]", "txtName": "Maple Tree"},
                    <SourceModel>{"wikiName": "[[Dandelioli Tree]]", "txtName": "Dandelioli Tree"},
                    <SourceModel>{"wikiName": "[[Small Fish]]", "txtName": "Small Fish"},
                    <SourceModel>{"wikiName": "[[Medium Fish]]", "txtName": "Medium Fish"},
                    <SourceModel>{"wikiName": "[[Goldfish]]", "txtName": "Goldfish"},
                    <SourceModel>{"wikiName": "[[Hermit Can]]", "txtName": "Hermit Can"},
                    <SourceModel>{"wikiName": "[[Jellyfish]]", "txtName": "Jellyfish"},
                    <SourceModel>{"wikiName": "[[Bloach]]", "txtName": "Bloach"},
                    <SourceModel>{"wikiName": "[[Skelefish]]", "txtName": "Skelefish"},
                    <SourceModel>{"wikiName": "[[Shark]]", "txtName": "Shark"},
                    <SourceModel>{"wikiName": "[[Manta Ray]]", "txtName": "Manta Ray"},
                    <SourceModel>{"wikiName": "[[Kraken]]", "txtName": "Kraken"},
                    <SourceModel>{"wikiName": "[[Fly Nest]]", "txtName": "Fly Nest"},
                    <SourceModel>{"wikiName": "[[Butterfly Bar]]", "txtName": "Butterfly Bar"},
                    <SourceModel>{"wikiName": "[[Sentient Bowl]]", "txtName": "Sentient Bowl"},
                    <SourceModel>{"wikiName": "[[Grocery Bag]]", "txtName": "Grocery Bag"},
                    <SourceModel>{"wikiName": "[[Snowden]]", "txtName": "Snowden"},
                    <SourceModel>{"wikiName": "[[Icicle Nest]]", "txtName": "Icicle Nest"},
                    <SourceModel>{"wikiName": "[[Bee Hive]]", "txtName": "Bee Hive"},
                    <SourceModel>{"wikiName": "[[Fairy Hovel]]", "txtName": "Fairy Hovel"},
                    <SourceModel>{"wikiName": "[[Scarab Nest]]", "txtName": "Scarab Nest"},
                    <SourceModel>{"wikiName": "[[Mote Hovel]]", "txtName": "Mote Hovel"},
                    <SourceModel>{"wikiName": "[[Flies]]", "txtName": "Flies"},
                    <SourceModel>{"wikiName": "[[Butterflies]]", "txtName": "Butterflies"},
                    <SourceModel>{"wikiName": "[[Sentient Cereal]]", "txtName": "Sentient Cereal"},
                    <SourceModel>{"wikiName": "[[Fruitflies]]", "txtName": "Fruitflies"},
                    <SourceModel>{"wikiName": "[[Mosquisnow]]", "txtName": "Mosquisnow"},
                    <SourceModel>{"wikiName": "[[Flycicle]]", "txtName": "Flycicle"},
                    <SourceModel>{"wikiName": "[[Bumble Bee]]", "txtName": "Bumble Bee"},
                    <SourceModel>{"wikiName": "[[Fairy]]", "txtName": "Fairy"},
                    <SourceModel>{"wikiName": "[[Scarab]]", "txtName": "Scarab"},
                    <SourceModel>{"wikiName": "[[Dust Mote]]", "txtName": "Dust Mote"},
                    <SourceModel>{"wikiName": "[[Blobfish]]", "txtName": "Blobfish"},
                    <SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"},
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"},
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{"wikiName": "[[DropTable3b]]", "txtName": "DropTable3b"},
                    <SourceModel>{"wikiName": "[[DropTable3c]]", "txtName": "DropTable3c"},
                    <SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"},
                    <SourceModel>{"wikiName": "[[DropTable5]]", "txtName": "DropTable5"},
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"},
                    <SourceModel>{"wikiName": "[[DropTable5b]]", "txtName": "DropTable5b"},
                    <SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"},
                    <SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"},
                    <SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"},
                    <SourceModel>{"wikiName": "[[DropTable9]]", "txtName": "DropTable9"},
                    <SourceModel>{"wikiName": "[[DropTable10]]", "txtName": "DropTable10"},
                    <SourceModel>{"wikiName": "[[DropTable11]]", "txtName": "DropTable11"},
                    <SourceModel>{"wikiName": "[[DropTable12]]", "txtName": "DropTable12"},
                    <SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"},
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"},
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"},
                    <SourceModel>{"wikiName": "[[DropTable17]]", "txtName": "DropTable17"},
                    <SourceModel>{"wikiName": "[[DropTable18]]", "txtName": "DropTable18"},
                    <SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"},
                    <SourceModel>{"wikiName": "[[DropTable19]]", "txtName": "DropTable19"},
                    <SourceModel>{"wikiName": "[[DropTable20]]", "txtName": "DropTable20"},
                    <SourceModel>{"wikiName": "[[DropTable21]]", "txtName": "DropTable21"},
                    <SourceModel>{"wikiName": "[[DropTable22]]", "txtName": "DropTable22"},
                    <SourceModel>{"wikiName": "[[DropTable23]]", "txtName": "DropTable23"},
                    <SourceModel>{"wikiName": "[[SuperDropTable4]]", "txtName": "SuperDropTable4"},
                    <SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"},
                    <SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"},
                    <SourceModel>{"wikiName": "[[DropTable27]]", "txtName": "DropTable27"},
                    <SourceModel>{"wikiName": "[[SuperDropTable5]]", "txtName": "SuperDropTable5"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungCredits1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Eldritch Croaker]]", "txtName": "Eldritch Croaker"},
                    <SourceModel>{"wikiName": "[[Rotting Grandfrogger]]", "txtName": "Rotting Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Forlorn Grandfrogger]]", "txtName": "Forlorn Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Vengeful Grandfrogger]]", "txtName": "Vengeful Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Beefie]]", "txtName": "Beefie"},
                    <SourceModel>{"wikiName": "[[Crescent Spud]]", "txtName": "Crescent Spud"},
                    <SourceModel>{"wikiName": "[[Enraged Snakenhotep]]", "txtName": "Enraged Snakenhotep"},
                    <SourceModel>{"wikiName": "[[Inevitable Snakenhotep]]", "txtName": "Inevitable Snakenhotep"},
                    <SourceModel>{"wikiName": "[[Ice Guard]]", "txtName": "Ice Guard"},
                    <SourceModel>{"wikiName": "[[Glaciaxus]]", "txtName": "Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Glaciaxus]]", "txtName": "Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Golden Glaciaxus]]", "txtName": "Golden Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Golden Glaciaxus]]", "txtName": "Golden Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Caustic Glaciaxus]]", "txtName": "Caustic Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Caustic Glaciaxus]]", "txtName": "Caustic Glaciaxus"},
                    <SourceModel>{
                        "wikiName": "[[Toadstall#Creating a Party!|Creating a Party!]]",
                        "txtName": "Toadstall: Creating a Party!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Toadstall#Bigger Party Better Party!|Bigger Party Better Party!]]",
                        "txtName": "Toadstall: Bigger Party Better Party!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Toadstall#Bother the Frogger!|Bother the Frogger!]]",
                        "txtName": "Toadstall: Bother the Frogger!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gangster Gus#Plunderin Down Yonder|Plunderin Down Yonder]]",
                        "txtName": "Gangster Gus: Plunderin Down Yonder"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gangster Gus#Perfect Progress Score|Perfect Progress Score]]",
                        "txtName": "Gangster Gus: Perfect Progress Score"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gangster Gus#Sanke Revival Denial|Sanke Revival Denial]]",
                        "txtName": "Gangster Gus: Sanke Revival Denial"
                    },
                    <SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungCredits2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Eldritch Croaker]]", "txtName": "Eldritch Croaker"},
                    <SourceModel>{"wikiName": "[[Rotting Grandfrogger]]", "txtName": "Rotting Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Forlorn Grandfrogger]]", "txtName": "Forlorn Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Vengeful Grandfrogger]]", "txtName": "Vengeful Grandfrogger"},
                    <SourceModel>{"wikiName": "[[Beefie]]", "txtName": "Beefie"},
                    <SourceModel>{"wikiName": "[[Crescent Spud]]", "txtName": "Crescent Spud"},
                    <SourceModel>{"wikiName": "[[Enraged Snakenhotep]]", "txtName": "Enraged Snakenhotep"},
                    <SourceModel>{"wikiName": "[[Inevitable Snakenhotep]]", "txtName": "Inevitable Snakenhotep"},
                    <SourceModel>{"wikiName": "[[Ice Guard]]", "txtName": "Ice Guard"},
                    <SourceModel>{"wikiName": "[[Glaciaxus]]", "txtName": "Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Golden Glaciaxus]]", "txtName": "Golden Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Caustic Glaciaxus]]", "txtName": "Caustic Glaciaxus"},
                    <SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Crystal Custard]]", "txtName": "Crystal Custard"},
                    <SourceModel>{"wikiName": "[[Crystal Capybara]]", "txtName": "Crystal Capybara"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TalentBook1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Crystal Custard]]", "txtName": "Crystal Custard"},
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"},
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"},
                    <SourceModel>{
                        "wikiName": "[[Scripticus#The Bigger they are, the Bigger they Fall!|The Bigger they are, the Bigger they Fall!]]",
                        "txtName": "Scripticus: The Bigger they are, the Bigger they Fall!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Glumlee#The Impossible Task|The Impossible Task]]",
                        "txtName": "Glumlee: The Impossible Task"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#The Last Supper, at Least for Today!|The Last Supper, at Least for Today!]]",
                        "txtName": "Picnic Stowaway: The Last Supper, at Least for Today!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Rocklyte#Becoming the Best Beginner|Becoming the Best Beginner]]",
                        "txtName": "Rocklyte: Becoming the Best Beginner"
                    },
                    <SourceModel>{
                        "wikiName": "[[Wellington#Puzzles and Math, a Winning Combination!|Puzzles and Math, a Winning Combination!]]",
                        "txtName": "Wellington: Puzzles and Math, a Winning Combination!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Constructing a Tower|Constructing a Tower]]",
                        "txtName": "Hoggindaz: Constructing a Tower"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Taking Samples|Taking Samples]]",
                        "txtName": "Hoggindaz: Taking Samples"
                    },
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Green Mushroom]]", "txtName": "Green Mushroom"},
                    <SourceModel>{"wikiName": "[[Red Mushroom]]", "txtName": "Red Mushroom"},
                    <SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"},
                    <SourceModel>{"wikiName": "[[Bored Bean]]", "txtName": "Bored Bean"},
                    <SourceModel>{"wikiName": "[[Baba Yaga]]", "txtName": "Baba Yaga"},
                    <SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"},
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Slime]]", "txtName": "Slime"},
                    <SourceModel>{"wikiName": "[[Baby Boa]]", "txtName": "Baby Boa"},
                    <SourceModel>{"wikiName": "[[Carrotman]]", "txtName": "Carrotman"},
                    <SourceModel>{"wikiName": "[[Baba Yaga]]", "txtName": "Baba Yaga"},
                    <SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"},
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Glublin]]", "txtName": "Glublin"},
                    <SourceModel>{"wikiName": "[[Wode Board]]", "txtName": "Wode Board"},
                    <SourceModel>{"wikiName": "[[Gigafrog]]", "txtName": "Gigafrog"},
                    <SourceModel>{"wikiName": "[[Baba Yaga]]", "txtName": "Baba Yaga"},
                    <SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"},
                    <SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"},
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Copper]]", "txtName": "Copper"},
                    <SourceModel>{"wikiName": "[[Iron]]", "txtName": "Iron"},
                    <SourceModel>{"wikiName": "[[Gold]]", "txtName": "Gold"},
                    <SourceModel>{"wikiName": "[[Plat]]", "txtName": "Plat"},
                    <SourceModel>{"wikiName": "[[Dementia]]", "txtName": "Dementia"},
                    <SourceModel>{"wikiName": "[[Void]]", "txtName": "Void"},
                    <SourceModel>{"wikiName": "[[Lustre]]", "txtName": "Lustre"},
                    <SourceModel>{"wikiName": "[[Starfire]]", "txtName": "Starfire"},
                    <SourceModel>{"wikiName": "[[Dreadlo]]", "txtName": "Dreadlo"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Oak Tree]]", "txtName": "Oak Tree"},
                    <SourceModel>{"wikiName": "[[Birch Tree]]", "txtName": "Birch Tree"},
                    <SourceModel>{"wikiName": "[[Jungle Tree]]", "txtName": "Jungle Tree"},
                    <SourceModel>{"wikiName": "[[Forest Tree]]", "txtName": "Forest Tree"},
                    <SourceModel>{"wikiName": "[[Stump Tree]]", "txtName": "Stump Tree"},
                    <SourceModel>{"wikiName": "[[Toilet Tree]]", "txtName": "Toilet Tree"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable5b", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Carrot]]", "txtName": "Crystal Carrot"},
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Wood Mushroom]]", "txtName": "Wood Mushroom"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Sandy Pot]]", "txtName": "Sandy Pot"},
                    <SourceModel>{"wikiName": "[[Mimic]]", "txtName": "Mimic"},
                    <SourceModel>{"wikiName": "[[Crabcake]]", "txtName": "Crabcake"},
                    <SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"},
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Dig Doug]]", "txtName": "Dig Doug"},
                    <SourceModel>{"wikiName": "[[Mafioso]]", "txtName": "Mafioso"},
                    <SourceModel>{"wikiName": "[[Sand Castle]]", "txtName": "Sand Castle"},
                    <SourceModel>{"wikiName": "[[Pincermin]]", "txtName": "Pincermin"},
                    <SourceModel>{"wikiName": "[[Mashed Potato]]", "txtName": "Mashed Potato"},
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Tyson]]", "txtName": "Tyson"},
                    <SourceModel>{"wikiName": "[[Moonmoon]]", "txtName": "Moonmoon"},
                    <SourceModel>{"wikiName": "[[Sand Giant]]", "txtName": "Sand Giant"},
                    <SourceModel>{"wikiName": "[[Snelbie]]", "txtName": "Snelbie"},
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"},
                    <SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Small Fish]]", "txtName": "Small Fish"},
                    <SourceModel>{"wikiName": "[[Medium Fish]]", "txtName": "Medium Fish"},
                    <SourceModel>{"wikiName": "[[Goldfish]]", "txtName": "Goldfish"},
                    <SourceModel>{"wikiName": "[[Hermit Can]]", "txtName": "Hermit Can"},
                    <SourceModel>{"wikiName": "[[Jellyfish]]", "txtName": "Jellyfish"},
                    <SourceModel>{"wikiName": "[[Bloach]]", "txtName": "Bloach"},
                    <SourceModel>{"wikiName": "[[Skelefish]]", "txtName": "Skelefish"},
                    <SourceModel>{"wikiName": "[[Shark]]", "txtName": "Shark"},
                    <SourceModel>{"wikiName": "[[Manta Ray]]", "txtName": "Manta Ray"},
                    <SourceModel>{"wikiName": "[[Kraken]]", "txtName": "Kraken"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable12", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Crabal]]", "txtName": "Crystal Crabal"},
                    <SourceModel>{"wikiName": "[[Flies]]", "txtName": "Flies"},
                    <SourceModel>{"wikiName": "[[Butterflies]]", "txtName": "Butterflies"},
                    <SourceModel>{"wikiName": "[[Sentient Cereal]]", "txtName": "Sentient Cereal"},
                    <SourceModel>{"wikiName": "[[Fruitflies]]", "txtName": "Fruitflies"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable14", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Sheepie]]", "txtName": "Sheepie"},
                    <SourceModel>{"wikiName": "[[Frost Flake]]", "txtName": "Frost Flake"},
                    <SourceModel>{"wikiName": "[[Sir Stache]]", "txtName": "Sir Stache"},
                    <SourceModel>{"wikiName": "[[Xylobone]]", "txtName": "Xylobone"},
                    <SourceModel>{"wikiName": "[[Chizoar]]", "txtName": "Chizoar"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable15", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Bloque]]", "txtName": "Bloque"},
                    <SourceModel>{"wikiName": "[[Mamooth]]", "txtName": "Mamooth"},
                    <SourceModel>{"wikiName": "[[Snowman]]", "txtName": "Snowman"},
                    <SourceModel>{"wikiName": "[[Penguin]]", "txtName": "Penguin"},
                    <SourceModel>{"wikiName": "[[Thermister]]", "txtName": "Thermister"},
                    <SourceModel>{"wikiName": "[[Chizoar]]", "txtName": "Chizoar"},
                    <SourceModel>{"wikiName": "[[Chaotic Chizoar]]", "txtName": "Chaotic Chizoar"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable16", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Dedotated Ram]]", "txtName": "Dedotated Ram"},
                    <SourceModel>{"wikiName": "[[Quenchie]]", "txtName": "Quenchie"},
                    <SourceModel>{"wikiName": "[[Cryosnake]]", "txtName": "Cryosnake"},
                    <SourceModel>{"wikiName": "[[Bop Box]]", "txtName": "Bop Box"},
                    <SourceModel>{"wikiName": "[[Neyeptune]]", "txtName": "Neyeptune"},
                    <SourceModel>{"wikiName": "[[Bloodbone]]", "txtName": "Bloodbone"},
                    <SourceModel>{"wikiName": "[[Chizoar]]", "txtName": "Chizoar"},
                    <SourceModel>{"wikiName": "[[Chaotic Chizoar]]", "txtName": "Chaotic Chizoar"},
                    <SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable17", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Saharan Foal]]", "txtName": "Saharan Foal"},
                    <SourceModel>{"wikiName": "[[Wispy Tree]]", "txtName": "Wispy Tree"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable18", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Cattle]]", "txtName": "Crystal Cattle"},
                    <SourceModel>{"wikiName": "[[Mosquisnow]]", "txtName": "Mosquisnow"},
                    <SourceModel>{"wikiName": "[[Flycicle]]", "txtName": "Flycicle"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crystal Custard]]", "txtName": "Crystal Custard"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable19", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Custard]]", "txtName": "Crystal Custard"},
                    <SourceModel>{"wikiName": "[[Massive Troll]]", "txtName": "Massive Troll"},
                    <SourceModel>{"wikiName": "[[Chaotic Troll]]", "txtName": "Chaotic Troll"},
                    <SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"},
                    <SourceModel>{"wikiName": "[[Purp Mushroom]]", "txtName": "Purp Mushroom"},
                    <SourceModel>{"wikiName": "[[TV]]", "txtName": "TV"},
                    <SourceModel>{"wikiName": "[[Donut]]", "txtName": "Donut"},
                    <SourceModel>{"wikiName": "[[Demon Genie]]", "txtName": "Demon Genie"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable20", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Custard]]", "txtName": "Crystal Custard"},
                    <SourceModel>{"wikiName": "[[Massive Troll]]", "txtName": "Massive Troll"},
                    <SourceModel>{"wikiName": "[[Chaotic Troll]]", "txtName": "Chaotic Troll"},
                    <SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"},
                    <SourceModel>{"wikiName": "[[Soda Can]]", "txtName": "Soda Can"},
                    <SourceModel>{"wikiName": "[[Flying Worm]]", "txtName": "Flying Worm"},
                    <SourceModel>{"wikiName": "[[Gelatinous Cuboid]]", "txtName": "Gelatinous Cuboid"},
                    <SourceModel>{"wikiName": "[[Choccie]]", "txtName": "Choccie"},
                    <SourceModel>{"wikiName": "[[Biggole Wurm]]", "txtName": "Biggole Wurm"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable21", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Custard]]", "txtName": "Crystal Custard"},
                    <SourceModel>{"wikiName": "[[Massive Troll]]", "txtName": "Massive Troll"},
                    <SourceModel>{"wikiName": "[[Chaotic Troll]]", "txtName": "Chaotic Troll"},
                    <SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"},
                    <SourceModel>{"wikiName": "[[Clammie]]", "txtName": "Clammie"},
                    <SourceModel>{"wikiName": "[[Octodar]]", "txtName": "Octodar"},
                    <SourceModel>{"wikiName": "[[Flombeige]]", "txtName": "Flombeige"},
                    <SourceModel>{"wikiName": "[[Stilted Seeker]]", "txtName": "Stilted Seeker"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Golden Chest|Astro Golden Chest]]",
                        "txtName": "Colosseum: Astro Golden Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crystal Capybara]]", "txtName": "Crystal Capybara"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable25", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Capybara]]", "txtName": "Crystal Capybara"},
                    <SourceModel>{"wikiName": "[[Suggma]]", "txtName": "Suggma"},
                    <SourceModel>{"wikiName": "[[Maccie]]", "txtName": "Maccie"},
                    <SourceModel>{"wikiName": "[[Mister Brightside]]", "txtName": "Mister Brightside"},
                    <SourceModel>{"wikiName": "[[Cheese Nub]]", "txtName": "Cheese Nub"},
                    <SourceModel>{"wikiName": "[[Stiltmole]]", "txtName": "Stiltmole"},
                    <SourceModel>{"wikiName": "[[Kattlecruk]]", "txtName": "Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Chaotic Kattlecruk]]", "txtName": "Chaotic Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Sacrilegious Kattlecruk]]", "txtName": "Sacrilegious Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Scarab]]", "txtName": "Scarab"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable26", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Capybara]]", "txtName": "Crystal Capybara"},
                    <SourceModel>{"wikiName": "[[Molti]]", "txtName": "Molti"},
                    <SourceModel>{"wikiName": "[[Purgatory Stalker]]", "txtName": "Purgatory Stalker"},
                    <SourceModel>{"wikiName": "[[Citringe]]", "txtName": "Citringe"},
                    <SourceModel>{"wikiName": "[[Lampar]]", "txtName": "Lampar"},
                    <SourceModel>{"wikiName": "[[Fire Spirit]]", "txtName": "Fire Spirit"},
                    <SourceModel>{"wikiName": "[[Biggole Mole]]", "txtName": "Biggole Mole"},
                    <SourceModel>{"wikiName": "[[Kattlecruk]]", "txtName": "Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Chaotic Kattlecruk]]", "txtName": "Chaotic Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Sacrilegious Kattlecruk]]", "txtName": "Sacrilegious Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Dust Mote]]", "txtName": "Dust Mote"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable27", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crystal Capybara]]", "txtName": "Crystal Capybara"},
                    <SourceModel>{"wikiName": "[[Crawler]]", "txtName": "Crawler"},
                    <SourceModel>{"wikiName": "[[Tremor Wurm]]", "txtName": "Tremor Wurm"},
                    <SourceModel>{"wikiName": "[[Kattlecruk]]", "txtName": "Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Chaotic Kattlecruk]]", "txtName": "Chaotic Kattlecruk"},
                    <SourceModel>{"wikiName": "[[Sacrilegious Kattlecruk]]", "txtName": "Sacrilegious Kattlecruk"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Grasslands1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Green Mushroom]]", "txtName": "Green Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Green Mushroom]]", "txtName": "Green Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Green Mushroom]]", "txtName": "Green Mushroom"},
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"},
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Mr. Worldwide|Mr. Worldwide]]",
                        "txtName": "Scripticus: Mr. Worldwide"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts16", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Green Mushroom]]", "txtName": "Green Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Green Mushroom]]", "txtName": "Green Mushroom"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable11]]", "txtName": "DropTable11"},
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Alchemial Apprentice|Alchemial Apprentice]]",
                        "txtName": "Cowbo Jones: Alchemial Apprentice"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Cutter", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Green Mushroom]]", "txtName": "Green Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Grasslands4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Red Mushroom]]", "txtName": "Red Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Red Mushroom]]", "txtName": "Red Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Wood Mushroom]]", "txtName": "Wood Mushroom"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Sprout#Frisbee Fanatic|Frisbee Fanatic]]",
                        "txtName": "Sprout: Frisbee Fanatic"
                    }
                ]
            }),
        new SourcesBase("TreeInterior1b", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Wood Mushroom]]", "txtName": "Wood Mushroom"},
                    <SourceModel>{"wikiName": "[[Walking Stick]]", "txtName": "Walking Stick"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA16", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Wood Mushroom]]", "txtName": "Wood Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable3c", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Wood Mushroom]]", "txtName": "Wood Mushroom"},
                    <SourceModel>{"wikiName": "[[Walking Stick]]", "txtName": "Walking Stick"},
                    <SourceModel>{"wikiName": "[[Nutto]]", "txtName": "Nutto"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Grasslands2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"},
                    <SourceModel>{"wikiName": "[[Godshard]]", "txtName": "Godshard"},
                    <SourceModel>{"wikiName": "[[Fly Nest]]", "txtName": "Fly Nest"},
                    <SourceModel>{"wikiName": "[[Butterfly Bar]]", "txtName": "Butterfly Bar"},
                    <SourceModel>{"wikiName": "[[Sentient Bowl]]", "txtName": "Sentient Bowl"},
                    <SourceModel>{"wikiName": "[[Grocery Bag]]", "txtName": "Grocery Bag"},
                    <SourceModel>{"wikiName": "[[Snowden]]", "txtName": "Snowden"},
                    <SourceModel>{"wikiName": "[[Icicle Nest]]", "txtName": "Icicle Nest"},
                    <SourceModel>{"wikiName": "[[Bee Hive]]", "txtName": "Bee Hive"},
                    <SourceModel>{"wikiName": "[[Fairy Hovel]]", "txtName": "Fairy Hovel"},
                    <SourceModel>{"wikiName": "[[Scarab Nest]]", "txtName": "Scarab Nest"},
                    <SourceModel>{"wikiName": "[[Mote Hovel]]", "txtName": "Mote Hovel"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Beating Up Frogs for some Sauce|Beating Up Frogs for some Sauce]]",
                        "txtName": "Picnic Stowaway: Beating Up Frogs for some Sauce"
                    }
                ]
            }),
        new SourcesBase("Quest4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Beating Up Frogs for some Sauce|Beating Up Frogs for some Sauce]]",
                        "txtName": "Picnic Stowaway: Beating Up Frogs for some Sauce"
                    }
                ]
            }),
        new SourcesBase("FoodPotMana1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"},
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"},
                    <SourceModel>{"wikiName": "[[DropTable3b]]", "txtName": "DropTable3b"},
                    <SourceModel>{"wikiName": "[[DropTable3c]]", "txtName": "DropTable3c"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorageF", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Frog]]", "txtName": "Frog"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Grasslands3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bored Bean]]", "txtName": "Bored Bean"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bored Bean]]", "txtName": "Bored Bean"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Bored Bean]]", "txtName": "Bored Bean"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable10]]", "txtName": "DropTable10"},
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Alchemial Apprentice|Alchemial Apprentice]]",
                        "txtName": "Cowbo Jones: Alchemial Apprentice"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats25", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bored Bean]]", "txtName": "Bored Bean"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Jungle1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Slime]]", "txtName": "Slime"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Slime]]", "txtName": "Slime"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("OilBarrel2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Slime]]", "txtName": "Slime"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Jungle2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Baby Boa]]", "txtName": "Baby Boa"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Baby Boa]]", "txtName": "Baby Boa"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Baby Boa]]", "txtName": "Baby Boa"},
                    <SourceModel>{"wikiName": "[[Carrotman]]", "txtName": "Carrotman"},
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Baby Boa]]", "txtName": "Baby Boa"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#No Stone Unturned|No Stone Unturned]]",
                        "txtName": "Stiltzcho: No Stone Unturned"
                    }
                ]
            }),
        new SourcesBase("StampA7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Baby Boa]]", "txtName": "Baby Boa"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag100", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Baby Boa]]", "txtName": "Baby Boa"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Jungle3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Carrotman]]", "txtName": "Carrotman"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Carrotman]]", "txtName": "Carrotman"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentBows4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Carrotman]]", "txtName": "Carrotman"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Forest1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Glublin]]", "txtName": "Glublin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Glublin]]", "txtName": "Glublin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneHelm1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Glublin]]", "txtName": "Glublin"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Forest2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Wode Board]]", "txtName": "Wode Board"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Wode Board]]", "txtName": "Wode Board"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Wode Board]]", "txtName": "Wode Board"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Dog Bone (NPC)#Why he Die???|Why he Die???]]",
                        "txtName": "Dog Bone (NPC): Why he Die???"
                    }
                ]
            }),
        new SourcesBase("EquipmentShirts19", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Wode Board]]", "txtName": "Wode Board"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Forest3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gigafrog]]", "txtName": "Gigafrog"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gigafrog]]", "txtName": "Gigafrog"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gigafrog]]", "txtName": "Gigafrog"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotRe2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Gigafrog]]", "txtName": "Gigafrog"},
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#The Most Important Meal of the Day|The Most Important Meal of the Day]]",
                        "txtName": "Picnic Stowaway: The Most Important Meal of the Day"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gigafrog]]", "txtName": "Gigafrog"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzePop", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gigafrog]]", "txtName": "Gigafrog"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TreeInterior1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Walking Stick]]", "txtName": "Walking Stick"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Walking Stick]]", "txtName": "Walking Stick"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TreeInterior2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Nutto]]", "txtName": "Nutto"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Nutto]]", "txtName": "Nutto"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Sewers1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"},
                    <SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Sewers1b", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"},
                    <SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest22", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"},
                    <SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"},
                    <SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"},
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"},
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"},
                    <SourceModel>{"wikiName": "[[DropTable19]]", "txtName": "DropTable19"},
                    <SourceModel>{"wikiName": "[[DropTable20]]", "txtName": "DropTable20"},
                    <SourceModel>{"wikiName": "[[DropTable21]]", "txtName": "DropTable21"},
                    <SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"},
                    <SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"},
                    <SourceModel>{"wikiName": "[[DropTable27]]", "txtName": "DropTable27"}
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Mutton#Clout Chasin'|Clout Chasin']]",
                        "txtName": "Mutton: Clout Chasin'"
                    },
                    <SourceModel>{
                        "wikiName": "[[Mutton#Cross Platform Promotion|Cross Platform Promotion]]",
                        "txtName": "Mutton: Cross Platform Promotion"
                    },
                    <SourceModel>{
                        "wikiName": "[[Mutton#7 Figure Followers|7 Figure Followers]]",
                        "txtName": "Mutton: 7 Figure Followers"
                    }
                ]
            }),
        new SourcesBase("DropTable3b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Poop]]", "txtName": "Poop"}, <SourceModel>{"wikiName": "[[Rat]]", "txtName": "Rat"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Sewers2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Rat]]", "txtName": "Rat"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Rat]]", "txtName": "Rat"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Rat]]", "txtName": "Rat"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[TP Pete#The Rats are to Blame!|The Rats are to Blame!]]",
                        "txtName": "TP Pete: The Rats are to Blame!"
                    }
                ]
            }),
        new SourcesBase("Quest23", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Rat]]", "txtName": "Rat"},
                    <SourceModel>{"wikiName": "[[Rat]]", "txtName": "Rat"},
                    <SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"},
                    <SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"},
                    <SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"},
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"},
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"}
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Mutton#Cross Platform Promotion|Cross Platform Promotion]]",
                        "txtName": "Mutton: Cross Platform Promotion"
                    },
                    <SourceModel>{
                        "wikiName": "[[Mutton#7 Figure Followers|7 Figure Followers]]",
                        "txtName": "Mutton: 7 Figure Followers"
                    }
                ]
            }),
        new SourcesBase("Sewers3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Boop]]", "txtName": "Boop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsA15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Boop]]", "txtName": "Boop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Baba Yaga]]", "txtName": "Baba Yaga"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("BabaYagaETC", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Baba Yaga]]", "txtName": "Baba Yaga"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest41", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Baba Yaga]]", "txtName": "Baba Yaga"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Dazey#Dressing like a Dork|Dressing like a Dork]]",
                        "txtName": "Dazey: Dressing like a Dork"
                    },
                    <SourceModel>{
                        "wikiName": "[[Dazey#Literally Physics|Literally Physics]]",
                        "txtName": "Dazey: Literally Physics"
                    }
                ]
            }),
        new SourcesBase("CardsZ1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("JobApplication", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[TP Pete#Fired for BS Reasons!|Fired for BS Reasons!]]",
                        "txtName": "TP Pete: Fired for BS Reasons!"
                    }
                ]
            }),
        new SourcesBase("EquipmentToolsHatchet2b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dr Defecaus]]", "txtName": "Dr Defecaus"},
                    <SourceModel>{
                        "wikiName": "[[TP Pete#Fired for BS Reasons!|Fired for BS Reasons!]]",
                        "txtName": "TP Pete: Fired for BS Reasons!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Crystal1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Builder Bird#Restoring Power to the Portal|Restoring Power to the Portal]]",
                        "txtName": "Builder Bird: Restoring Power to the Portal"
                    }
                ]
            }),
        new SourcesBase("Meatloaf", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"},
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats39", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"},
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolAmarokA", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"},
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest17", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Amarok]]", "txtName": "Amarok"},
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"}
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Dog Bone (NPC)#Bow Wow going Dow..n!|Bow Wow going Dow..n!]]",
                        "txtName": "Dog Bone (NPC): Bow Wow going Dow..n!"
                    }
                ]
            }),
        new SourcesBase("CardsZ4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest29", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Chaotic Amarok]]", "txtName": "Chaotic Amarok"},
                    <SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentCape3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneZ1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Radiant Amarok]]", "txtName": "Radiant Amarok"},
                    <SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"},
                    <SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"},
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"},
                    <SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"},
                    <SourceModel>{
                        "wikiName": "[[Bushlyte#A Peanut for your Thoughts|A Peanut for your Thoughts]]",
                        "txtName": "Bushlyte: A Peanut for your Thoughts"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bushlyte#Honk if you Love Peanuts!|Honk if you Love Peanuts!]]",
                        "txtName": "Bushlyte: Honk if you Love Peanuts!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bushlyte#A Peanut Saved is a Peanut not Eaten!|A Peanut Saved is a Peanut not Eaten!]]",
                        "txtName": "Bushlyte: A Peanut Saved is a Peanut not Eaten!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Rocklyte#If Life Gives you Peanuts, make Shiny Peanuts!|If Life Gives you Peanuts, make Shiny Peanuts!]]",
                        "txtName": "Rocklyte: If Life Gives you Peanuts, make Shiny Peanuts!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Tiki Chief#Hotel? Tikivago. Sorry, couldn't Help It!|Hotel? Tikivago. Sorry, couldn't Help It!]]",
                        "txtName": "Tiki Chief: Hotel? Tikivago. Sorry, couldn't Help It!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Rhyming is Key!|Rhyming is Key!]]",
                        "txtName": "Loominadi: Rhyming is Key!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Uh, Something About Vials?|Uh, Something About Vials?]]",
                        "txtName": "Loominadi: Uh, Something About Vials?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sandy Pot]]", "txtName": "Sandy Pot"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sandy Pot]]", "txtName": "Sandy Pot"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sandy Pot]]", "txtName": "Sandy Pot"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertA1b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sandy Pot]]", "txtName": "Sandy Pot"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mimic]]", "txtName": "Mimic"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GoldricP1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mimic]]", "txtName": "Mimic"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Goldric#Only Winners have Portraits|Only Winners have Portraits]]",
                        "txtName": "Goldric: Only Winners have Portraits"
                    }
                ]
            }),
        new SourcesBase("CardsB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mimic]]", "txtName": "Mimic"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag101", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mimic]]", "txtName": "Mimic"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crabcake]]", "txtName": "Crabcake"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crabcake]]", "txtName": "Crabcake"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertA3b", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Crabcake]]", "txtName": "Crabcake"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dig Doug]]", "txtName": "Dig Doug"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mafioso]]", "txtName": "Mafioso"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GoldricP2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mafioso]]", "txtName": "Mafioso"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Goldric#Only Winners have Portraits|Only Winners have Portraits]]",
                        "txtName": "Goldric: Only Winners have Portraits"
                    }
                ]
            }),
        new SourcesBase("CardsB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mafioso]]", "txtName": "Mafioso"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sand Castle]]", "txtName": "Sand Castle"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GoldricP3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sand Castle]]", "txtName": "Sand Castle"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Goldric#Only Winners have Portraits|Only Winners have Portraits]]",
                        "txtName": "Goldric: Only Winners have Portraits"
                    }
                ]
            }),
        new SourcesBase("CardsB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sand Castle]]", "txtName": "Sand Castle"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Pincermin]]", "txtName": "Pincermin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Pincermin]]", "txtName": "Pincermin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mashed Potato]]", "txtName": "Mashed Potato"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mashed Potato]]", "txtName": "Mashed Potato"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Tyson]]", "txtName": "Tyson"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Tyson]]", "txtName": "Tyson"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Moonmoon]]", "txtName": "Moonmoon"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertC2b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Moonmoon]]", "txtName": "Moonmoon"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Moonmoon]]", "txtName": "Moonmoon"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest18", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Moonmoon]]", "txtName": "Moonmoon"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Rhyming is Key!|Rhyming is Key!]]",
                        "txtName": "Loominadi: Rhyming is Key!"
                    }
                ]
            }),
        new SourcesBase("DesertC3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sand Giant]]", "txtName": "Sand Giant"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sand Giant]]", "txtName": "Sand Giant"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DesertC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Snelbie]]", "txtName": "Snelbie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsB11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Snelbie]]", "txtName": "Snelbie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Snelbie]]", "txtName": "Snelbie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Hgg", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA3b", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"},
                    <SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"},
                    <SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"},
                    <SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"},
                    <SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    },
                    <SourceModel>{
                        "wikiName": "[[Meel#Waitin' for the Cards to Drop|Waitin' for the Cards to Drop]]",
                        "txtName": "Meel: Waitin' for the Cards to Drop"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable13", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Biggie Hours]]", "txtName": "Biggie Hours"},
                    <SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"},
                    <SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"},
                    <SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Key2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Djonnut#I'm Blue Dabadedada|I'm Blue Dabadedada]]",
                        "txtName": "Djonnut: I'm Blue Dabadedada"
                    },
                    <SourceModel>{
                        "wikiName": "[[Djonnut#The Blue New World|The Blue New World]]",
                        "txtName": "Djonnut: The Blue New World"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PremiumGem", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Golden Chest|Astro Golden Chest]]",
                        "txtName": "Colosseum: Astro Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Egg Capsule]]", "txtName": "Egg Capsule"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{"wikiName": "[[DropTable13]]", "txtName": "DropTable13"},
                    <SourceModel>{
                        "wikiName": "[[TP Pete#Roll of Anger|Roll of Anger]]",
                        "txtName": "TP Pete: Roll of Anger"
                    },
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Can't somebody else do it?|Can't somebody else do it?]]",
                        "txtName": "Scripticus: Can't somebody else do it?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Early Evening Eating Endeavor|Early Evening Eating Endeavor]]",
                        "txtName": "Picnic Stowaway: Early Evening Eating Endeavor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Don't Desert the Dessert|Don't Desert the Dessert]]",
                        "txtName": "Picnic Stowaway: Don't Desert the Dessert"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#A Midnight Snack|A Midnight Snack]]",
                        "txtName": "Picnic Stowaway: A Midnight Snack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Super Skillage|Super Skillage]]",
                        "txtName": "Cactolyte: Super Skillage"
                    },
                    <SourceModel>{
                        "wikiName": "[[Funguy#Party Crashin'|Party Crashin']]",
                        "txtName": "Funguy: Party Crashin'"
                    },
                    <SourceModel>{
                        "wikiName": "[[Papua Piggea#Oinko Boinko|Oinko Boinko]]",
                        "txtName": "Papua Piggea: Oinko Boinko"
                    },
                    <SourceModel>{"wikiName": "[[Desert Davey#U Cool?|U Cool?]]", "txtName": "Desert Davey: U Cool?"},
                    <SourceModel>{
                        "wikiName": "[[Mutton#Cross Platform Promotion|Cross Platform Promotion]]",
                        "txtName": "Mutton: Cross Platform Promotion"
                    },
                    <SourceModel>{
                        "wikiName": "[[Scubidew#Don't Step to Me, Bro!|Don't Step to Me, Bro!]]",
                        "txtName": "Scubidew: Don't Step to Me, Bro!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Whattso#The Whaley Hard Minigame|The Whaley Hard Minigame]]",
                        "txtName": "Whattso: The Whaley Hard Minigame"
                    },
                    <SourceModel>{
                        "wikiName": "[[Postboy Pablob#Signed, Sealed and Lost in the Post|Signed, Sealed and Lost in the Post]]",
                        "txtName": "Postboy Pablob: Signed, Sealed and Lost in the Post"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bandit Bob#Bringing Bob's Boxes|Bringing Bob's Boxes]]",
                        "txtName": "Bandit Bob: Bringing Bob's Boxes"
                    },
                    <SourceModel>{
                        "wikiName": "[[Carpetiem#Darn Lazy Gamers!|Darn Lazy Gamers!]]",
                        "txtName": "Carpetiem: Darn Lazy Gamers!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Carpetiem#Be like Buster!|Be like Buster!]]",
                        "txtName": "Carpetiem: Be like Buster!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Goldric#Trickle Down Economics|Trickle Down Economics]]",
                        "txtName": "Goldric: Trickle Down Economics"
                    },
                    <SourceModel>{"wikiName": "[[Goldric#Hoopsies|Hoopsies]]", "txtName": "Goldric: Hoopsies"},
                    <SourceModel>{
                        "wikiName": "[[Goldric#Only Winners have Portraits|Only Winners have Portraits]]",
                        "txtName": "Goldric: Only Winners have Portraits"
                    },
                    <SourceModel>{
                        "wikiName": "[[Goldric#Criminal Code of Conduct|Criminal Code of Conduct]]",
                        "txtName": "Goldric: Criminal Code of Conduct"
                    },
                    <SourceModel>{
                        "wikiName": "[[Meel#Spooky Scary Skelepoops|Spooky Scary Skelepoops]]",
                        "txtName": "Meel: Spooky Scary Skelepoops"
                    },
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#Lookin' Like a Snack|Lookin' Like a Snack]]",
                        "txtName": "Snake Jar: Lookin' Like a Snack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#PSA. You Are Being Eaten!|PSA. You Are Being Eaten!]]",
                        "txtName": "Snake Jar: PSA. You Are Being Eaten!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#A Noob, served Medium Rare!|A Noob, served Medium Rare!]]",
                        "txtName": "Snake Jar: A Noob, served Medium Rare!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Rhyming is Key!|Rhyming is Key!]]",
                        "txtName": "Loominadi: Rhyming is Key!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Uh, Something About Vials?|Uh, Something About Vials?]]",
                        "txtName": "Loominadi: Uh, Something About Vials?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Journey to the Center of the Blundermines|Journey to the Center of the Blundermines]]",
                        "txtName": "Loominadi: Journey to the Center of the Blundermines"
                    },
                    <SourceModel>{
                        "wikiName": "[[Wellington#Findin' Fingerprints|Findin' Fingerprints]]",
                        "txtName": "Wellington: Findin' Fingerprints"
                    },
                    <SourceModel>{
                        "wikiName": "[[Dazey#Dressing like a Dork|Dressing like a Dork]]",
                        "txtName": "Dazey: Dressing like a Dork"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The Grind Begins...?|The Grind Begins...?]]",
                        "txtName": "Cowbo Jones: The Grind Begins...?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Say Goodbye to your Dubloon!|Say Goodbye to your Dubloon!]]",
                        "txtName": "Cowbo Jones: Say Goodbye to your Dubloon!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The Notorious B.O.B|The Notorious B.O.B]]",
                        "txtName": "Cowbo Jones: The Notorious B.O.B"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The Worst Trade Deal in History|The Worst Trade Deal in History]]",
                        "txtName": "Cowbo Jones: The Worst Trade Deal in History"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Children? What'd they ever do for Me...|Children? What'd they ever do for Me...]]",
                        "txtName": "Cowbo Jones: Children? What'd they ever do for Me..."
                    },
                    <SourceModel>{
                        "wikiName": "[[Centurion#Colosseum GDQ|Colosseum GDQ]]",
                        "txtName": "Centurion: Colosseum GDQ"
                    },
                    <SourceModel>{
                        "wikiName": "[[Giftmas Blobulyte#Boo, Headshot!|Boo, Headshot!]]",
                        "txtName": "Giftmas Blobulyte: Boo, Headshot!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Giftmas Blobulyte#You Shouldn't Have! No, really.|You Shouldn't Have! No, really.]]",
                        "txtName": "Giftmas Blobulyte: You Shouldn't Have! No, really."
                    },
                    <SourceModel>{
                        "wikiName": "[[Telescope#I'm Seeing Stars!|I'm Seeing Stars!]]",
                        "txtName": "Telescope: I'm Seeing Stars!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Egggulyte#Egg Shaped Lootboxes!|Egg Shaped Lootboxes!]]",
                        "txtName": "Egggulyte: Egg Shaped Lootboxes!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Egggulyte#I've Got a Golden Tickegg!|I've Got a Golden Tickegg!]]",
                        "txtName": "Egggulyte: I've Got a Golden Tickegg!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Iceland Irwin#Crikey, it's cold out!|Crikey, it's cold out!]]",
                        "txtName": "Iceland Irwin: Crikey, it's cold out!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Turn ON for what???|Turn ON for what???]]",
                        "txtName": "Hoggindaz: Turn ON for what???"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Trapping with the Lord|Trapping with the Lord]]",
                        "txtName": "Hoggindaz: Trapping with the Lord"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Constructing a Tower|Constructing a Tower]]",
                        "txtName": "Hoggindaz: Constructing a Tower"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Monke Tower Time!|Monke Tower Time!]]",
                        "txtName": "Hoggindaz: Monke Tower Time!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Taking Samples|Taking Samples]]",
                        "txtName": "Hoggindaz: Taking Samples"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Fairly Odd Damage|Fairly Odd Damage]]",
                        "txtName": "Bill Brr: Fairly Odd Damage"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Laughin' Amphibian|Laughin' Amphibian]]",
                        "txtName": "Bill Brr: Laughin' Amphibian"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lonely Hunter#Leaf Him Alone!|Leaf Him Alone!]]",
                        "txtName": "Lonely Hunter: Leaf Him Alone!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#The Mouse n the Molerat|The Mouse n the Molerat]]",
                        "txtName": "Lord of the Hunt: The Mouse n the Molerat"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Noot Noot!|Noot Noot!]]",
                        "txtName": "Lord of the Hunt: Noot Noot!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Spookyness|The Spookyness]]",
                        "txtName": "Falloween Pumpkin: The Spookyness"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Scaryness|The Scaryness]]",
                        "txtName": "Falloween Pumpkin: The Scaryness"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Horroriness|The Horroriness]]",
                        "txtName": "Falloween Pumpkin: The Horroriness"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Booeyness|The Booeyness]]",
                        "txtName": "Falloween Pumpkin: The Booeyness"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Afterparty|The Afterparty]]",
                        "txtName": "Falloween Pumpkin: The Afterparty"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants19", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MidnightCookie", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"},
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"},
                    <SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"},
                    <SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Crystal2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Constructor Crow#Restoring Power to another Portal|Restoring Power to another Portal]]",
                        "txtName": "Constructor Crow: Restoring Power to another Portal"
                    }
                ]
            }),
        new SourcesBase("CardsZ3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolEfauntA", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"},
                    <SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"},
                    <SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EfauntDrop1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Efaunt]]", "txtName": "Efaunt"},
                    <SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"},
                    <SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EfauntDrop2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Chaotic Efaunt]]", "txtName": "Chaotic Efaunt"},
                    <SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentCape4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gilded Efaunt]]", "txtName": "Gilded Efaunt"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sheepie]]", "txtName": "Sheepie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sheepie]]", "txtName": "Sheepie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues16", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Sheepie]]", "txtName": "Sheepie"},
                    <SourceModel>{"wikiName": "[[Penguin]]", "txtName": "Penguin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sheepie]]", "txtName": "Sheepie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Frost Flake]]", "txtName": "Frost Flake"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Frost Flake]]", "txtName": "Frost Flake"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Frost Flake]]", "txtName": "Frost Flake"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowA2a", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Frost Flake]]", "txtName": "Frost Flake"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sir Stache]]", "txtName": "Sir Stache"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sir Stache]]", "txtName": "Sir Stache"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotGr3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Sir Stache]]", "txtName": "Sir Stache"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues17", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Sir Stache]]", "txtName": "Sir Stache"},
                    <SourceModel>{"wikiName": "[[Quenchie]]", "txtName": "Quenchie"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dedotated Ram]]", "txtName": "Dedotated Ram"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dedotated Ram]]", "txtName": "Dedotated Ram"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings23", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dedotated Ram]]", "txtName": "Dedotated Ram"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bloque]]", "txtName": "Bloque"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bloque]]", "txtName": "Bloque"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues19", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Bloque]]", "txtName": "Bloque"},
                    <SourceModel>{"wikiName": "[[Cryosnake]]", "txtName": "Cryosnake"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotMana3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bloque]]", "txtName": "Bloque"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mamooth]]", "txtName": "Mamooth"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mamooth]]", "txtName": "Mamooth"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowB2a", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mamooth]]", "txtName": "Mamooth"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag110", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mamooth]]", "txtName": "Mamooth"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest63", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Mamooth]]", "txtName": "Mamooth"},
                    <SourceModel>{"wikiName": "[[Snowman]]", "txtName": "Snowman"},
                    <SourceModel>{"wikiName": "[[Thermister]]", "txtName": "Thermister"}
                ],
                "recipeFrom": [],
                "questAss": [<SourceModel>{"wikiName": "[[Shuvelle#Diggy Hole!|Diggy Hole!]]", "txtName": "Shuvelle: Diggy Hole!"}]
            }),
        new SourcesBase("SnowB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Snowman]]", "txtName": "Snowman"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Snowman]]", "txtName": "Snowman"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Snowman]]", "txtName": "Snowman"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Snowman]]", "txtName": "Snowman"},
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Penguin]]", "txtName": "Penguin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Penguin]]", "txtName": "Penguin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Thermister]]", "txtName": "Thermister"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Thermister]]", "txtName": "Thermister"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Thermister]]", "txtName": "Thermister"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Quenchie]]", "txtName": "Quenchie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Quenchie]]", "txtName": "Quenchie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Cryosnake]]", "txtName": "Cryosnake"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Cryosnake]]", "txtName": "Cryosnake"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowC3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bop Box]]", "txtName": "Bop Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bop Box]]", "txtName": "Bop Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Bop Box]]", "txtName": "Bop Box"},
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Neyeptune]]", "txtName": "Neyeptune"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Neyeptune]]", "txtName": "Neyeptune"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowC4a", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Neyeptune]]", "txtName": "Neyeptune"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Xylobone]]", "txtName": "Xylobone"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SnowC5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bloodbone]]", "txtName": "Bloodbone"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsE13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bloodbone]]", "txtName": "Bloodbone"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Chizoar]]", "txtName": "Chizoar"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolChizoarA", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Chizoar]]", "txtName": "Chizoar"},
                    <SourceModel>{"wikiName": "[[Chaotic Chizoar]]", "txtName": "Chaotic Chizoar"},
                    <SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant24", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Chizoar]]", "txtName": "Chizoar"},
                    <SourceModel>{"wikiName": "[[Chaotic Chizoar]]", "txtName": "Chaotic Chizoar"},
                    <SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Chiz0", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Chizoar]]", "txtName": "Chizoar"},
                    <SourceModel>{"wikiName": "[[Chaotic Chizoar]]", "txtName": "Chaotic Chizoar"},
                    <SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Chaotic Chizoar]]", "txtName": "Chaotic Chizoar"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Chiz1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Chaotic Chizoar]]", "txtName": "Chaotic Chizoar"},
                    <SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ16", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentCape5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneZ2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Blighted Chizoar]]", "txtName": "Blighted Chizoar"},
                    <SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"},
                    <SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"},
                    <SourceModel>{"wikiName": "[[SuperDropTable4]]", "txtName": "SuperDropTable4"},
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Journey to the Center of the Blundermines|Journey to the Center of the Blundermines]]",
                        "txtName": "Loominadi: Journey to the Center of the Blundermines"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSlush", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Key3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dilapidated Slush]]", "txtName": "Dilapidated Slush"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bellows#Poking Some Eyes Out|Poking Some Eyes Out]]",
                        "txtName": "Bellows: Poking Some Eyes Out"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bellows#Eyexperience|Eyexperience]]",
                        "txtName": "Bellows: Eyexperience"
                    },
                    <SourceModel>{"wikiName": "[[Bellows#Veyebing|Veyebing]]", "txtName": "Bellows: Veyebing"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Massive Troll]]", "txtName": "Massive Troll"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolTroll", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Massive Troll]]", "txtName": "Massive Troll"},
                    <SourceModel>{"wikiName": "[[Chaotic Troll]]", "txtName": "Chaotic Troll"},
                    <SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TrollPart", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Massive Troll]]", "txtName": "Massive Troll"},
                    <SourceModel>{"wikiName": "[[Chaotic Troll]]", "txtName": "Chaotic Troll"},
                    <SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Chaotic Troll]]", "txtName": "Chaotic Troll"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ17", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentCape6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Blitzkrieg Troll]]", "txtName": "Blitzkrieg Troll"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Key4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"},
                    <SourceModel>{"wikiName": "[[Stilted Seeker]]", "txtName": "Stilted Seeker"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Golden Chest|Astro Golden Chest]]",
                        "txtName": "Colosseum: Astro Golden Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PetEgg", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"},
                    <SourceModel>{
                        "wikiName": "[[Blobbo#A Honker Took mah Baby!|A Honker Took mah Baby!]]",
                        "txtName": "Blobbo: A Honker Took mah Baby!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Blobbo#Glitter Critter|Glitter Critter]]",
                        "txtName": "Blobbo: Glitter Critter"
                    },
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Filling the Menu|Filling the Menu]]",
                        "txtName": "Oinkin: Filling the Menu"
                    },
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Diner Deliverer|Diner Deliverer]]",
                        "txtName": "Oinkin: Diner Deliverer"
                    },
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Recipe for Fattening Pastry|Recipe for Fattening Pastry]]",
                        "txtName": "Oinkin: Recipe for Fattening Pastry"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gobo#Breeding in Outer Space|Breeding in Outer Space]]",
                        "txtName": "Gobo: Breeding in Outer Space"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gobo#Breeding in Outer Space|Breeding in Outer Space]]",
                        "txtName": "Gobo: Breeding in Outer Space"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gobo#Intense Pet Fighting|Intense Pet Fighting]]",
                        "txtName": "Gobo: Intense Pet Fighting"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gobo#Intense Pet Fighting|Intense Pet Fighting]]",
                        "txtName": "Gobo: Intense Pet Fighting"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gobo#Squirrel Tactics|Squirrel Tactics]]",
                        "txtName": "Gobo: Squirrel Tactics"
                    },
                    <SourceModel>{"wikiName": "[[Gobo#Spicy Cooking|Spicy Cooking]]", "txtName": "Gobo: Spicy Cooking"},
                    <SourceModel>{
                        "wikiName": "[[Gobo#Lab Experimentation, Ft. You|Lab Experimentation, Ft. You]]",
                        "txtName": "Gobo: Lab Experimentation, Ft. You"
                    },
                    <SourceModel>{
                        "wikiName": "[[Nebula Neddy#Task Requirement Affirmative|Task Requirement Affirmative]]",
                        "txtName": "Nebula Neddy: Task Requirement Affirmative"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Ladle", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Mutated Mush]]", "txtName": "Mutated Mush"},
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    },
                    <SourceModel>{
                        "wikiName": "[[Blobbo#A Honker Took mah Baby!|A Honker Took mah Baby!]]",
                        "txtName": "Blobbo: A Honker Took mah Baby!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Blobbo#Glitter Critter|Glitter Critter]]",
                        "txtName": "Blobbo: Glitter Critter"
                    },
                    <SourceModel>{
                        "wikiName": "[[Capital P#Right side wrong side!|Right side wrong side!]]",
                        "txtName": "Capital P: Right side wrong side!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Capital P#No room on the Dance Floor!|No room on the Dance Floor!]]",
                        "txtName": "Capital P: No room on the Dance Floor!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Capital P#Everybody move it move it!|Everybody move it move it!]]",
                        "txtName": "Capital P: Everybody move it move it!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Filling the Menu|Filling the Menu]]",
                        "txtName": "Oinkin: Filling the Menu"
                    },
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Diner Deliverer|Diner Deliverer]]",
                        "txtName": "Oinkin: Diner Deliverer"
                    },
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Recipe for Fattening Pastry|Recipe for Fattening Pastry]]",
                        "txtName": "Oinkin: Recipe for Fattening Pastry"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gobo#Squirrel Tactics|Squirrel Tactics]]",
                        "txtName": "Gobo: Squirrel Tactics"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gobo#Squirrel Tactics|Squirrel Tactics]]",
                        "txtName": "Gobo: Squirrel Tactics"
                    },
                    <SourceModel>{"wikiName": "[[Gobo#Spicy Cooking|Spicy Cooking]]", "txtName": "Gobo: Spicy Cooking"},
                    <SourceModel>{
                        "wikiName": "[[Gobo#Lab Experimentation, Ft. You|Lab Experimentation, Ft. You]]",
                        "txtName": "Gobo: Lab Experimentation, Ft. You"
                    },
                    <SourceModel>{
                        "wikiName": "[[Nebula Neddy#Task Requirement Affirmative|Task Requirement Affirmative]]",
                        "txtName": "Nebula Neddy: Task Requirement Affirmative"
                    },
                    <SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Purp Mushroom]]", "txtName": "Purp Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes30", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Purp Mushroom]]", "txtName": "Purp Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Purp Mushroom]]", "txtName": "Purp Mushroom"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[TV]]", "txtName": "TV"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyA2b", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[TV]]", "txtName": "TV"},
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[TV]]", "txtName": "TV"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage22", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[TV]]", "txtName": "TV"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[TV]]", "txtName": "TV"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Donut]]", "txtName": "Donut"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes32", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Donut]]", "txtName": "Donut"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Donut]]", "txtName": "Donut"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Demon Genie]]", "txtName": "Demon Genie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Demon Genie]]", "txtName": "Demon Genie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Demon Genie]]", "txtName": "Demon Genie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Soda Can]]", "txtName": "Soda Can"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Soda Can]]", "txtName": "Soda Can"},
                    <SourceModel>{
                        "wikiName": "[[Scubidew#Uncovering the Deep Sea State!!!|Uncovering the Deep Sea State!!!]]",
                        "txtName": "Scubidew: Uncovering the Deep Sea State!!!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Soda Can]]", "txtName": "Soda Can"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Flying Worm]]", "txtName": "Flying Worm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA29", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Flying Worm]]", "txtName": "Flying Worm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Flying Worm]]", "txtName": "Flying Worm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gelatinous Cuboid]]", "txtName": "Gelatinous Cuboid"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorageS", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gelatinous Cuboid]]", "txtName": "Gelatinous Cuboid"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gelatinous Cuboid]]", "txtName": "Gelatinous Cuboid"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choccie]]", "txtName": "Choccie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings25", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choccie]]", "txtName": "Choccie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choccie]]", "txtName": "Choccie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Biggole Wurm]]", "txtName": "Biggole Wurm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage23", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Biggole Wurm]]", "txtName": "Biggole Wurm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Biggole Wurm]]", "txtName": "Biggole Wurm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Clammie]]", "txtName": "Clammie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyC1b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Clammie]]", "txtName": "Clammie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Clammie]]", "txtName": "Clammie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Octodar]]", "txtName": "Octodar"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Octodar]]", "txtName": "Octodar"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyC3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Flombeige]]", "txtName": "Flombeige"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Flombeige]]", "txtName": "Flombeige"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Flombeige]]", "txtName": "Flombeige"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GalaxyC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Stilted Seeker]]", "txtName": "Stilted Seeker"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsG13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Stilted Seeker]]", "txtName": "Stilted Seeker"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Suggma]]", "txtName": "Suggma"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaA1b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Suggma]]", "txtName": "Suggma"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Suggma]]", "txtName": "Suggma"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Maccie]]", "txtName": "Maccie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Maccie]]", "txtName": "Maccie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC16", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Maccie]]", "txtName": "Maccie"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mister Brightside]]", "txtName": "Mister Brightside"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mister Brightside]]", "txtName": "Mister Brightside"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Cheese Nub]]", "txtName": "Cheese Nub"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Cheese Nub]]", "txtName": "Cheese Nub"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorageC", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Cheese Nub]]", "txtName": "Cheese Nub"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaA5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Stiltmole]]", "txtName": "Stiltmole"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaA5b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Stiltmole]]", "txtName": "Stiltmole"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Stiltmole]]", "txtName": "Stiltmole"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Molti]]", "txtName": "Molti"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Molti]]", "txtName": "Molti"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Purgatory Stalker]]", "txtName": "Purgatory Stalker"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Purgatory Stalker]]", "txtName": "Purgatory Stalker"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Citringe]]", "txtName": "Citringe"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaB3b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Citringe]]", "txtName": "Citringe"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Citringe]]", "txtName": "Citringe"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Lampar]]", "txtName": "Lampar"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Lampar]]", "txtName": "Lampar"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Fire Spirit]]", "txtName": "Fire Spirit"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Fire Spirit]]", "txtName": "Fire Spirit"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaB6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Biggole Mole]]", "txtName": "Biggole Mole"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Biggole Mole]]", "txtName": "Biggole Mole"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crawler]]", "txtName": "Crawler"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Crawler]]", "txtName": "Crawler"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LavaC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Tremor Wurm]]", "txtName": "Tremor Wurm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsH13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Tremor Wurm]]", "txtName": "Tremor Wurm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA37", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Tremor Wurm]]", "txtName": "Tremor Wurm"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ18", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Kattlecruk]]", "txtName": "Kattlecruk"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ19", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Chaotic Kattlecruk]]", "txtName": "Chaotic Kattlecruk"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsZ20", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Sacrilegious Kattlecruk]]", "txtName": "Sacrilegious Kattlecruk"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable5]]", "txtName": "DropTable5"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"},
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Can't somebody else do it?|Can't somebody else do it?]]",
                        "txtName": "Scripticus: Can't somebody else do it?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("OakTree", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Copper", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CopperBar", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Key1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Bronze Chest|Dewdrop Bronze Chest]]",
                        "txtName": "Colosseum: Dewdrop Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Dog Bone (NPC)#Why he Die???|Why he Die???]]",
                        "txtName": "Dog Bone (NPC): Why he Die???"
                    },
                    <SourceModel>{
                        "wikiName": "[[Dog Bone (NPC)#Bow Wow going Dow..n!|Bow Wow going Dow..n!]]",
                        "txtName": "Dog Bone (NPC): Bow Wow going Dow..n!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Iron", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("JungleTree", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("BirchTree", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Silver Chest|Dewdrop Silver Chest]]",
                        "txtName": "Colosseum: Dewdrop Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Live-Action Entertainment|Live-Action Entertainment]]",
                        "txtName": "Picnic Stowaway: Live-Action Entertainment"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#The Most Important Meal of the Day|The Most Important Meal of the Day]]",
                        "txtName": "Picnic Stowaway: The Most Important Meal of the Day"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Brunchin' with the Blobs|Brunchin' with the Blobs]]",
                        "txtName": "Picnic Stowaway: Brunchin' with the Blobs"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Luncheon with the Inlaws|Luncheon with the Inlaws]]",
                        "txtName": "Picnic Stowaway: Luncheon with the Inlaws"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Afternoon Tea in a Jiffy|Afternoon Tea in a Jiffy]]",
                        "txtName": "Picnic Stowaway: Afternoon Tea in a Jiffy"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Early Evening Eating Endeavor|Early Evening Eating Endeavor]]",
                        "txtName": "Picnic Stowaway: Early Evening Eating Endeavor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Tiki Chief#Brochure Building|Brochure Building]]",
                        "txtName": "Tiki Chief: Brochure Building"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("IronBar", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Gold", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ToiletTree", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StumpTree", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Dewdrop#Golden Chest|Dewdrop Golden Chest]]",
                        "txtName": "Colosseum: Dewdrop Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GoldBar", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Bronze Chest|Sandstone Bronze Chest]]",
                        "txtName": "Colosseum: Sandstone Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Mayoral Skill|Mayoral Skill]]",
                        "txtName": "Shuvelle: Mayoral Skill"
                    },
                    <SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Mayoral Skill|Mayoral Skill]]",
                        "txtName": "Shuvelle: Mayoral Skill"
                    },
                    <SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Luncheon with the Inlaws|Luncheon with the Inlaws]]",
                        "txtName": "Picnic Stowaway: Luncheon with the Inlaws"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Afternoon Tea in a Jiffy|Afternoon Tea in a Jiffy]]",
                        "txtName": "Picnic Stowaway: Afternoon Tea in a Jiffy"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Early Evening Eating Endeavor|Early Evening Eating Endeavor]]",
                        "txtName": "Picnic Stowaway: Early Evening Eating Endeavor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#The Last Supper, at Least for Today!|The Last Supper, at Least for Today!]]",
                        "txtName": "Picnic Stowaway: The Last Supper, at Least for Today!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Plat", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PalmTree", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Silver Chest|Sandstone Silver Chest]]",
                        "txtName": "Colosseum: Sandstone Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"},
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#The Last Supper, at Least for Today!|The Last Supper, at Least for Today!]]",
                        "txtName": "Picnic Stowaway: The Last Supper, at Least for Today!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Don't Desert the Dessert|Don't Desert the Dessert]]",
                        "txtName": "Picnic Stowaway: Don't Desert the Dessert"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#A Midnight Snack|A Midnight Snack]]",
                        "txtName": "Picnic Stowaway: A Midnight Snack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PlatBar", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Dementia", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Sandstone#Golden Chest|Sandstone Golden Chest]]",
                        "txtName": "Colosseum: Sandstone Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Soul1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Bronze Chest|Chillsnap Bronze Chest]]",
                        "txtName": "Colosseum: Chillsnap Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SaharanFoal", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Silver Chest|Chillsnap Silver Chest]]",
                        "txtName": "Colosseum: Chillsnap Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DementiaBar", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Soul2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Void", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Chillsnap#Golden Chest|Chillsnap Golden Chest]]",
                        "txtName": "Colosseum: Chillsnap Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("VoidBar", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Bronze Chest|Astro Bronze Chest]]",
                        "txtName": "Colosseum: Astro Bronze Chest"
                    },
                    <SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Golden Chest|Astro Golden Chest]]",
                        "txtName": "Colosseum: Astro Golden Chest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    },
                    <SourceModel>{"wikiName": "[[SuperDropTable4]]", "txtName": "SuperDropTable4"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Lustre", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("AlienTree", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Silver Chest|Astro Silver Chest]]",
                        "txtName": "Colosseum: Astro Silver Chest"
                    },
                    <SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LustreBar", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Golden Chest|Astro Golden Chest]]",
                        "txtName": "Colosseum: Astro Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Starfire", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Golden Chest|Astro Golden Chest]]",
                        "txtName": "Colosseum: Astro Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum/Astro#Golden Chest|Astro Golden Chest]]",
                        "txtName": "Colosseum: Astro Golden Chest"
                    },
                    <SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY0", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Ghost (Event)]]", "txtName": "Ghost (Event)"},
                    <SourceModel>{"wikiName": "[[Giftmas Blobulyte]]", "txtName": "Giftmas Blobulyte"},
                    <SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest30", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Ghost (Event)]]", "txtName": "Ghost (Event)"},
                    <SourceModel>{"wikiName": "[[Giftmas Blobulyte]]", "txtName": "Giftmas Blobulyte"},
                    <SourceModel>{
                        "wikiName": "[[Giftmas Blobulyte#Boo, Headshot!|Boo, Headshot!]]",
                        "txtName": "Giftmas Blobulyte: Boo, Headshot!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Giftmas Blobulyte#You Shouldn't Have! No, really.|You Shouldn't Have! No, really.]]",
                        "txtName": "Giftmas Blobulyte: You Shouldn't Have! No, really."
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Ghost (Event)]]", "txtName": "Ghost (Event)"},
                    <SourceModel>{"wikiName": "[[Giftmas Blobulyte]]", "txtName": "Giftmas Blobulyte"},
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"},
                    <SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Ghost (Event)]]", "txtName": "Ghost (Event)"},
                    <SourceModel>{"wikiName": "[[Giftmas Blobulyte]]", "txtName": "Giftmas Blobulyte"},
                    <SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Ghost (Event)]]", "txtName": "Ghost (Event)"},
                    <SourceModel>{"wikiName": "[[Giftmas Blobulyte]]", "txtName": "Giftmas Blobulyte"},
                    <SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Ghost (Event)]]", "txtName": "Ghost (Event)"},
                    <SourceModel>{"wikiName": "[[Giftmas Blobulyte]]", "txtName": "Giftmas Blobulyte"},
                    <SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Valentslime]]", "txtName": "Valentslime"},
                    <SourceModel>{"wikiName": "[[Loveulyte]]", "txtName": "Loveulyte"},
                    <SourceModel>{"wikiName": "[[Chocco Box]]", "txtName": "Chocco Box"},
                    <SourceModel>{"wikiName": "[[Giant Rose]]", "txtName": "Giant Rose"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Valentslime]]", "txtName": "Valentslime"},
                    <SourceModel>{"wikiName": "[[Loveulyte]]", "txtName": "Loveulyte"},
                    <SourceModel>{"wikiName": "[[Chocco Box]]", "txtName": "Chocco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Valentslime]]", "txtName": "Valentslime"},
                    <SourceModel>{"wikiName": "[[Loveulyte]]", "txtName": "Loveulyte"},
                    <SourceModel>{"wikiName": "[[Chocco Box]]", "txtName": "Chocco Box"},
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Valentslime]]", "txtName": "Valentslime"},
                    <SourceModel>{"wikiName": "[[Loveulyte]]", "txtName": "Loveulyte"},
                    <SourceModel>{"wikiName": "[[Chocco Box]]", "txtName": "Chocco Box"},
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Valentslime]]", "txtName": "Valentslime"},
                    <SourceModel>{"wikiName": "[[Loveulyte]]", "txtName": "Loveulyte"},
                    <SourceModel>{"wikiName": "[[Chocco Box]]", "txtName": "Chocco Box"},
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest40", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Loveulyte]]", "txtName": "Loveulyte"},
                    <SourceModel>{"wikiName": "[[Chocco Box]]", "txtName": "Chocco Box"},
                    <SourceModel>{
                        "wikiName": "[[Loveulyte#Heart Hogger|Heart Hogger]]",
                        "txtName": "Loveulyte: Heart Hogger"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loveulyte#Heartbreaker|Heartbreaker]]",
                        "txtName": "Loveulyte: Heartbreaker"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentCape8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Giant Rose]]", "txtName": "Giant Rose"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentCape9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Giant Rose]]", "txtName": "Giant Rose"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentCape10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Giant Rose]]", "txtName": "Giant Rose"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Floofie]]", "txtName": "Floofie"},
                    <SourceModel>{"wikiName": "[[Egg Capsule]]", "txtName": "Egg Capsule"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Floofie]]", "txtName": "Floofie"},
                    <SourceModel>{"wikiName": "[[Shell Snake]]", "txtName": "Shell Snake"},
                    <SourceModel>{"wikiName": "[[DropTable13]]", "txtName": "DropTable13"},
                    <SourceModel>{
                        "wikiName": "[[Scripticus#The Choice is Yours!|The Choice is Yours!]]",
                        "txtName": "Scripticus: The Choice is Yours!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Can't somebody else do it?|Can't somebody else do it?]]",
                        "txtName": "Scripticus: Can't somebody else do it?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#The Hungry Stowaway|The Hungry Stowaway]]",
                        "txtName": "Picnic Stowaway: The Hungry Stowaway"
                    },
                    <SourceModel>{"wikiName": "[[Desert Davey#U Cool?|U Cool?]]", "txtName": "Desert Davey: U Cool?"},
                    <SourceModel>{
                        "wikiName": "[[Mutton#Clout Chasin'|Clout Chasin']]",
                        "txtName": "Mutton: Clout Chasin'"
                    },
                    <SourceModel>{
                        "wikiName": "[[Fishpaste97#'Accidental' Exploit|'Accidental' Exploit]]",
                        "txtName": "Fishpaste97: 'Accidental' Exploit"
                    },
                    <SourceModel>{
                        "wikiName": "[[Djonnut#Genie Dieting|Genie Dieting]]",
                        "txtName": "Djonnut: Genie Dieting"
                    },
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#A Noob, served Medium Rare!|A Noob, served Medium Rare!]]",
                        "txtName": "Snake Jar: A Noob, served Medium Rare!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#No Country for One Character|No Country for One Character]]",
                        "txtName": "Cowbo Jones: No Country for One Character"
                    },
                    <SourceModel>{
                        "wikiName": "[[Centurion#Which one of yous is the Mafia?|Which one of yous is the Mafia?]]",
                        "txtName": "Centurion: Which one of yous is the Mafia?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loveulyte#Heart Hogger|Heart Hogger]]",
                        "txtName": "Loveulyte: Heart Hogger"
                    },
                    <SourceModel>{
                        "wikiName": "[[Iceland Irwin#Crikey, it's cold out!|Crikey, it's cold out!]]",
                        "txtName": "Iceland Irwin: Crikey, it's cold out!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Trapping with the Lord|Trapping with the Lord]]",
                        "txtName": "Hoggindaz: Trapping with the Lord"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Monke Tower Time!|Monke Tower Time!]]",
                        "txtName": "Hoggindaz: Monke Tower Time!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Mayoral Luck|Mayoral Luck]]",
                        "txtName": "Shuvelle: Mayoral Luck"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lonely Hunter#Leaf Him Alone!|Leaf Him Alone!]]",
                        "txtName": "Lonely Hunter: Leaf Him Alone!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lonely Hunter#Skeleton? Skelegone!|Skeleton? Skelegone!]]",
                        "txtName": "Lonely Hunter: Skeleton? Skelegone!"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Floofie]]", "txtName": "Floofie"},
                    <SourceModel>{"wikiName": "[[Shell Snake]]", "txtName": "Shell Snake"},
                    <SourceModel>{"wikiName": "[[DropTable13]]", "txtName": "DropTable13"},
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#Time Crime Episode 1|Time Crime Episode 1]]",
                        "txtName": "Stiltzcho: Time Crime Episode 1"
                    },
                    <SourceModel>{
                        "wikiName": "[[Speccius#More like 'Sleepius' lmao|More like 'Sleepius' lmao]]",
                        "txtName": "Speccius: More like 'Sleepius' lmao"
                    },
                    <SourceModel>{
                        "wikiName": "[[Postboy Pablob#Signed, Sealed and Lost in the Post|Signed, Sealed and Lost in the Post]]",
                        "txtName": "Postboy Pablob: Signed, Sealed and Lost in the Post"
                    },
                    <SourceModel>{
                        "wikiName": "[[Centurion#High Scorer|High Scorer]]",
                        "txtName": "Centurion: High Scorer"
                    },
                    <SourceModel>{
                        "wikiName": "[[Centurion#Colosseum Champ!|Colosseum Champ!]]",
                        "txtName": "Centurion: Colosseum Champ!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Giftmas Blobulyte#Boo, Headshot!|Boo, Headshot!]]",
                        "txtName": "Giftmas Blobulyte: Boo, Headshot!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Telescope#I'm Seeing Stars!|I'm Seeing Stars!]]",
                        "txtName": "Telescope: I'm Seeing Stars!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loveulyte#Heartbreaker|Heartbreaker]]",
                        "txtName": "Loveulyte: Heartbreaker"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Voter Recognition|Voter Recognition]]",
                        "txtName": "Hoggindaz: Voter Recognition"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#The Spores are a Bore|The Spores are a Bore]]",
                        "txtName": "Bill Brr: The Spores are a Bore"
                    },
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Melting the Snakes|Melting the Snakes]]",
                        "txtName": "Crystalswine: Melting the Snakes"
                    },
                    <SourceModel>{"wikiName": "[[Shuvelle#Diggy Hole!|Diggy Hole!]]", "txtName": "Shuvelle: Diggy Hole!"},
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Floofie]]", "txtName": "Floofie"},
                    <SourceModel>{"wikiName": "[[DropTable13]]", "txtName": "DropTable13"},
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Super Skillage|Super Skillage]]",
                        "txtName": "Cactolyte: Super Skillage"
                    },
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#Red Stuff Bad!|Red Stuff Bad!]]",
                        "txtName": "Snake Jar: Red Stuff Bad!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Centurion#Colosseum GDQ|Colosseum GDQ]]",
                        "txtName": "Centurion: Colosseum GDQ"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Voter Apathy|Voter Apathy]]",
                        "txtName": "Hoggindaz: Voter Apathy"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Keep Away Contract|Keep Away Contract]]",
                        "txtName": "Yondergreen: Keep Away Contract"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Pelt for the Pelt God|Pelt for the Pelt God]]",
                        "txtName": "Lord of the Hunt: Pelt for the Pelt God"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Happy Tree Friend|Happy Tree Friend]]",
                        "txtName": "Lord of the Hunt: Happy Tree Friend"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Noot Noot!|Noot Noot!]]",
                        "txtName": "Lord of the Hunt: Noot Noot!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 1|Treasure Hunt 1]]",
                        "txtName": "Walupiggy: Treasure Hunt 1"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneTe", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Floofie]]", "txtName": "Floofie"},
                    <SourceModel>{"wikiName": "[[Shell Snake]]", "txtName": "Shell Snake"},
                    <SourceModel>{"wikiName": "[[Egg Capsule]]", "txtName": "Egg Capsule"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneAe", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Floofie]]", "txtName": "Floofie"},
                    <SourceModel>{"wikiName": "[[Shell Snake]]", "txtName": "Shell Snake"},
                    <SourceModel>{"wikiName": "[[Egg Capsule]]", "txtName": "Egg Capsule"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneWe", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Floofie]]", "txtName": "Floofie"},
                    <SourceModel>{"wikiName": "[[Shell Snake]]", "txtName": "Shell Snake"},
                    <SourceModel>{"wikiName": "[[Egg Capsule]]", "txtName": "Egg Capsule"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Shell Snake]]", "txtName": "Shell Snake"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest42", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Egg Capsule]]", "txtName": "Egg Capsule"},
                    <SourceModel>{
                        "wikiName": "[[Egggulyte#Egg Shaped Lootboxes!|Egg Shaped Lootboxes!]]",
                        "txtName": "Egggulyte: Egg Shaped Lootboxes!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Egggulyte#I've Got a Golden Tickegg!|I've Got a Golden Tickegg!]]",
                        "txtName": "Egggulyte: I've Got a Golden Tickegg!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest44", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Egg Capsule]]", "txtName": "Egg Capsule"},
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 4|Treasure Hunt 4]]",
                        "txtName": "Walupiggy: Treasure Hunt 4"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mr Blueberry]]", "txtName": "Mr Blueberry"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest49", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Mr Blueberry]]", "txtName": "Mr Blueberry"},
                    <SourceModel>{"wikiName": "[[Plasti Doug]]", "txtName": "Plasti Doug"},
                    <SourceModel>{
                        "wikiName": "[[Coastiolyte#Cooler than a Cooler!|Cooler than a Cooler!]]",
                        "txtName": "Coastiolyte: Cooler than a Cooler!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Coastiolyte#Vibe Check|Vibe Check]]",
                        "txtName": "Coastiolyte: Vibe Check"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT1eb", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Mr Blueberry]]", "txtName": "Mr Blueberry"},
                    <SourceModel>{"wikiName": "[[Plasti Doug]]", "txtName": "Plasti Doug"},
                    <SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneAeB", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Mr Blueberry]]", "txtName": "Mr Blueberry"},
                    <SourceModel>{"wikiName": "[[Plasti Doug]]", "txtName": "Plasti Doug"},
                    <SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneWeb", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Mr Blueberry]]", "txtName": "Mr Blueberry"},
                    <SourceModel>{"wikiName": "[[Plasti Doug]]", "txtName": "Plasti Doug"},
                    <SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Plasti Doug]]", "txtName": "Plasti Doug"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Copper]]", "txtName": "Copper"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Iron]]", "txtName": "Iron"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gold]]", "txtName": "Gold"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Plat]]", "txtName": "Plat"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dementia]]", "txtName": "Dementia"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Void]]", "txtName": "Void"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Lustre]]", "txtName": "Lustre"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF16", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Starfire]]", "txtName": "Starfire"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF29", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dreadlo]]", "txtName": "Dreadlo"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Oak Tree]]", "txtName": "Oak Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Birch Tree]]", "txtName": "Birch Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Jungle Tree]]", "txtName": "Jungle Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Forest Tree]]", "txtName": "Forest Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Stump Tree]]", "txtName": "Stump Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Toilet Tree]]", "txtName": "Toilet Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Palm Tree]]", "txtName": "Palm Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Palm Tree]]", "txtName": "Palm Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Saharan Foal]]", "txtName": "Saharan Foal"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Wispy Tree]]", "txtName": "Wispy Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alien Tree]]", "txtName": "Alien Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable22", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Alien Tree]]", "txtName": "Alien Tree"},
                    <SourceModel>{"wikiName": "[[Cubed Tree]]", "txtName": "Cubed Tree"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Cubed Tree]]", "txtName": "Cubed Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Maple Tree]]", "txtName": "Maple Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Leaf5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Maple Tree]]", "txtName": "Maple Tree"},
                    <SourceModel>{"wikiName": "[[Dandelioli Tree]]", "txtName": "Dandelioli Tree"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF25", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dandelioli Tree]]", "txtName": "Dandelioli Tree"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Flies]]", "txtName": "Flies"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsC12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Butterflies]]", "txtName": "Butterflies"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ButterBar", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Butterflies]]", "txtName": "Butterflies"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Sentient Cereal]]", "txtName": "Sentient Cereal"},
                    <SourceModel>{"wikiName": "[[Blobfish]]", "txtName": "Blobfish"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsD9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Fruitflies]]", "txtName": "Fruitflies"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mosquisnow]]", "txtName": "Mosquisnow"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Flycicle]]", "txtName": "Flycicle"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Bumble Bee]]", "txtName": "Bumble Bee"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DropTable23", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Bumble Bee]]", "txtName": "Bumble Bee"},
                    <SourceModel>{"wikiName": "[[Fairy]]", "txtName": "Fairy"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Fairy]]", "txtName": "Fairy"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF26", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Scarab]]", "txtName": "Scarab"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsF27", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dust Mote]]", "txtName": "Dust Mote"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Blobfish]]", "txtName": "Blobfish"},
                    <SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Refinery1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Construction#Refinery|Refinery]]", "txtName": "Construction: Refinery"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Refinery2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Construction#Refinery|Refinery]]", "txtName": "Construction: Refinery"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Refinery3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Construction#Refinery|Refinery]]", "txtName": "Construction: Refinery"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Refinery4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Construction#Refinery|Refinery]]", "txtName": "Construction: Refinery"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Refinery5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Construction#Refinery|Refinery]]", "txtName": "Construction: Refinery"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Refinery6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Construction#Refinery|Refinery]]", "txtName": "Construction: Refinery"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"},
                    <SourceModel>{"wikiName": "[[DropTable5]]", "txtName": "DropTable5"},
                    <SourceModel>{"wikiName": "[[DropTable10]]", "txtName": "DropTable10"},
                    <SourceModel>{"wikiName": "[[DropTable11]]", "txtName": "DropTable11"},
                    <SourceModel>{"wikiName": "[[DropTable12]]", "txtName": "DropTable12"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"},
                    <SourceModel>{
                        "wikiName": "[[Town Marble#Visualizing the Sculpture Within...|Visualizing the Sculpture Within...]]",
                        "txtName": "Town Marble: Visualizing the Sculpture Within..."
                    },
                    <SourceModel>{
                        "wikiName": "[[Bandit Bob#Bob's Brand New Bandana|Bob's Brand New Bandana]]",
                        "txtName": "Bandit Bob: Bob's Brand New Bandana"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ExpBalloon1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{"wikiName": "[[DropTable13]]", "txtName": "DropTable13"},
                    <SourceModel>{
                        "wikiName": "[[TP Pete#Roll of Anger|Roll of Anger]]",
                        "txtName": "TP Pete: Roll of Anger"
                    },
                    <SourceModel>{
                        "wikiName": "[[TP Pete#The Rats are to Blame!|The Rats are to Blame!]]",
                        "txtName": "TP Pete: The Rats are to Blame!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Sprout#Sticks and Stone Something Something Bones...|Sticks and Stone Something Something Bones...]]",
                        "txtName": "Sprout: Sticks and Stone Something Something Bones..."
                    },
                    <SourceModel>{
                        "wikiName": "[[Sprout#Justice Wears No Clothes|Justice Wears No Clothes]]",
                        "txtName": "Sprout: Justice Wears No Clothes"
                    },
                    <SourceModel>{
                        "wikiName": "[[Scripticus#What Lies at the Heart of the Forest|What Lies at the Heart of the Forest]]",
                        "txtName": "Scripticus: What Lies at the Heart of the Forest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Brunchin' with the Blobs|Brunchin' with the Blobs]]",
                        "txtName": "Picnic Stowaway: Brunchin' with the Blobs"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Afternoon Tea in a Jiffy|Afternoon Tea in a Jiffy]]",
                        "txtName": "Picnic Stowaway: Afternoon Tea in a Jiffy"
                    },
                    <SourceModel>{
                        "wikiName": "[[Promotheus#The Witcher, but not Really|The Witcher, but not Really]]",
                        "txtName": "Promotheus: The Witcher, but not Really"
                    },
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#No Stone Unturned|No Stone Unturned]]",
                        "txtName": "Stiltzcho: No Stone Unturned"
                    },
                    <SourceModel>{
                        "wikiName": "[[Builder Bird#Restoring Power to the Portal|Restoring Power to the Portal]]",
                        "txtName": "Builder Bird: Restoring Power to the Portal"
                    },
                    <SourceModel>{
                        "wikiName": "[[Papua Piggea#Crystal Crime Stopper|Crystal Crime Stopper]]",
                        "txtName": "Papua Piggea: Crystal Crime Stopper"
                    },
                    <SourceModel>{
                        "wikiName": "[[Papua Piggea#Stamp Collecting|Stamp Collecting]]",
                        "txtName": "Papua Piggea: Stamp Collecting"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bandit Bob#Bullets for Bandit Bob!|Bullets for Bandit Bob!]]",
                        "txtName": "Bandit Bob: Bullets for Bandit Bob!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Carpetiem#Old Timey Craftin'|Old Timey Craftin']]",
                        "txtName": "Carpetiem: Old Timey Craftin'"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Rhyming is Key!|Rhyming is Key!]]",
                        "txtName": "Loominadi: Rhyming is Key!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Say Goodbye to your Dubloon!|Say Goodbye to your Dubloon!]]",
                        "txtName": "Cowbo Jones: Say Goodbye to your Dubloon!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The Notorious B.O.B|The Notorious B.O.B]]",
                        "txtName": "Cowbo Jones: The Notorious B.O.B"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The Worst Trade Deal in History|The Worst Trade Deal in History]]",
                        "txtName": "Cowbo Jones: The Worst Trade Deal in History"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Simple Shippin|Simple Shippin]]",
                        "txtName": "Post Office: Simple Shippin"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{"wikiName": "[[DropTable3b]]", "txtName": "DropTable3b"},
                    <SourceModel>{"wikiName": "[[DropTable5b]]", "txtName": "DropTable5b"},
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotGr2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"},
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Brunchin' with the Blobs|Brunchin' with the Blobs]]",
                        "txtName": "Picnic Stowaway: Brunchin' with the Blobs"
                    },
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#Outta the Way Slimes|Outta the Way Slimes]]",
                        "txtName": "Stiltzcho: Outta the Way Slimes"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{"wikiName": "[[DropTable12]]", "txtName": "DropTable12"},
                    <SourceModel>{
                        "wikiName": "[[TP Pete#The Rats are to Blame!|The Rats are to Blame!]]",
                        "txtName": "TP Pete: The Rats are to Blame!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Scubidew#Uncovering the Deep Sea State!!!|Uncovering the Deep Sea State!!!]]",
                        "txtName": "Scubidew: Uncovering the Deep Sea State!!!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Luncheon with the Inlaws|Luncheon with the Inlaws]]",
                        "txtName": "Picnic Stowaway: Luncheon with the Inlaws"
                    },
                    <SourceModel>{
                        "wikiName": "[[Tiki Chief#Brochure Building|Brochure Building]]",
                        "txtName": "Tiki Chief: Brochure Building"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotYe1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Plan-it Express|Plan-it Express]]",
                        "txtName": "Post Office: Plan-it Express"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotYe2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("OilBarrel3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Dudes Next Door|Dudes Next Door]]",
                        "txtName": "Post Office: Dudes Next Door"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues13", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues14", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{"wikiName": "[[DropTable5b]]", "txtName": "DropTable5b"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Down Undelivery|Down Undelivery]]",
                        "txtName": "Post Office: Down Undelivery"
                    },
                    <SourceModel>{"wikiName": "[[DropTable3c]]", "txtName": "DropTable3c"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues18", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    },
                    <SourceModel>{"wikiName": "[[Goldric#Hoopsies|Hoopsies]]", "txtName": "Goldric: Hoopsies"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneHelm6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Alpine Suppliers|Alpine Suppliers]]",
                        "txtName": "Post Office: Alpine Suppliers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Don't Desert the Dessert|Don't Desert the Dessert]]",
                        "txtName": "Picnic Stowaway: Don't Desert the Dessert"
                    },
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#Lookin' Like a Snack|Lookin' Like a Snack]]",
                        "txtName": "Snake Jar: Lookin' Like a Snack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#A Hat in Crime|A Hat in Crime]]",
                        "txtName": "Cowbo Jones: A Hat in Crime"
                    },
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 3|Treasure Hunt 3]]",
                        "txtName": "Walupiggy: Treasure Hunt 3"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ExpBalloon2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Peanut De-Aging|Peanut De-Aging]]",
                        "txtName": "Cactolyte: Peanut De-Aging"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Peanut De-Aging|Peanut De-Aging]]",
                        "txtName": "Cactolyte: Peanut De-Aging"
                    },
                    <SourceModel>{
                        "wikiName": "[[Tiki Chief#Blame it on the Glublins|Blame it on the Glublins]]",
                        "txtName": "Tiki Chief: Blame it on the Glublins"
                    },
                    <SourceModel>{
                        "wikiName": "[[Constructor Crow#Restoring Power to another Portal|Restoring Power to another Portal]]",
                        "txtName": "Constructor Crow: Restoring Power to another Portal"
                    },
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#PSA. You Are Being Eaten!|PSA. You Are Being Eaten!]]",
                        "txtName": "Snake Jar: PSA. You Are Being Eaten!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Wellington#You Can't Run, but you Can Hide|You Can't Run, but you Can Hide]]",
                        "txtName": "Wellington: You Can't Run, but you Can Hide"
                    },
                    <SourceModel>{
                        "wikiName": "[[Dazey#Literally Physics|Literally Physics]]",
                        "txtName": "Dazey: Literally Physics"
                    },
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Children? What'd they ever do for Me...|Children? What'd they ever do for Me...]]",
                        "txtName": "Cowbo Jones: Children? What'd they ever do for Me..."
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Chizoar No More|Chizoar No More]]",
                        "txtName": "Hoggindaz: Chizoar No More"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Fairly Odd Damage|Fairly Odd Damage]]",
                        "txtName": "Bill Brr: Fairly Odd Damage"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Frogecoin to the MOON!|Frogecoin to the MOON!]]",
                        "txtName": "Lord of the Hunt: Frogecoin to the MOON!"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TixCol", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    },
                    <SourceModel>{
                        "wikiName": "[[Typhoon#Surprise Attack!|Surprise Attack!]]",
                        "txtName": "Typhoon: Surprise Attack!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Centurion#Down The Mimic Hole!|Down The Mimic Hole!]]",
                        "txtName": "Centurion: Down The Mimic Hole!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Centurion#Which one of yous is the Mafia?|Which one of yous is the Mafia?]]",
                        "txtName": "Centurion: Which one of yous is the Mafia?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lonely Hunter#Skeleton? Skelegone!|Skeleton? Skelegone!]]",
                        "txtName": "Lonely Hunter: Skeleton? Skelegone!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lonely Hunter#Opening Chests|Opening Chests]]",
                        "txtName": "Lonely Hunter: Opening Chests"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW3b", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Post Office#Cosmic Carrier|Cosmic Carrier]]",
                        "txtName": "Post Office: Cosmic Carrier"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotOr1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable5]]", "txtName": "DropTable5"},
                    <SourceModel>{"wikiName": "[[DropTable11]]", "txtName": "DropTable11"},
                    <SourceModel>{"wikiName": "[[DropTable12]]", "txtName": "DropTable12"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotRe1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable3b]]", "txtName": "DropTable3b"},
                    <SourceModel>{"wikiName": "[[DropTable3c]]", "txtName": "DropTable3c"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotGr1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"},
                    <SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"},
                    <SourceModel>{"wikiName": "[[DropTable10]]", "txtName": "DropTable10"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("OilBarrel1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Glumlee#Learning to Smelt|Learning to Smelt]]",
                        "txtName": "Glumlee: Learning to Smelt"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SmithingHammerChisel", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Town Marble#Visualizing the Sculpture Within...|Visualizing the Sculpture Within...]]",
                        "txtName": "Town Marble: Visualizing the Sculpture Within..."
                    },
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Luncheon with the Inlaws|Luncheon with the Inlaws]]",
                        "txtName": "Picnic Stowaway: Luncheon with the Inlaws"
                    }
                ]
            }),
        new SourcesBase("StampA5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag104", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("rtt0", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"},
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{
                        "wikiName": "[[Scripticus#What Lies at the Heart of the Forest|What Lies at the Heart of the Forest]]",
                        "txtName": "Scripticus: What Lies at the Heart of the Forest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Glumlee#Learning to Smelt|Learning to Smelt]]",
                        "txtName": "Glumlee: Learning to Smelt"
                    },
                    <SourceModel>{
                        "wikiName": "[[Promotheus#I'm Ready, Promotion!|I'm Ready, Promotion!]]",
                        "txtName": "Promotheus: I'm Ready, Promotion!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ResetFrag", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Blunder Hills|Blunder Hills Vendors]]",
                        "txtName": "Blunder Hills Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    },
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"},
                    <SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"},
                    <SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"},
                    <SourceModel>{"wikiName": "[[SuperDropTable4]]", "txtName": "SuperDropTable4"},
                    <SourceModel>{"wikiName": "[[SuperDropTable5]]", "txtName": "SuperDropTable5"},
                    <SourceModel>{
                        "wikiName": "[[Promotheus#Three Right Answers|Three Right Answers]]",
                        "txtName": "Promotheus: Three Right Answers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Speccius#More like 'Sleepius' lmao|More like 'Sleepius' lmao]]",
                        "txtName": "Speccius: More like 'Sleepius' lmao"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotOr2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest37", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Journey to the Center of the Blundermines|Journey to the Center of the Blundermines]]",
                        "txtName": "Loominadi: Journey to the Center of the Blundermines"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag105", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]",
                        "txtName": "Encroaching Forest Villas Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest19", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Say Goodbye to your Dubloon!|Say Goodbye to your Dubloon!]]",
                        "txtName": "Cowbo Jones: Say Goodbye to your Dubloon!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Giftmas Blobulyte#You Shouldn't Have! No, really.|You Shouldn't Have! No, really.]]",
                        "txtName": "Giftmas Blobulyte: You Shouldn't Have! No, really."
                    }
                ]
            }),
        new SourcesBase("BobJoePickle", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Obol Altar#Bad Kitty, get off that altar!|Bad Kitty, get off that altar!]]",
                        "txtName": "Obol Altar: Bad Kitty, get off that altar!"
                    }
                ]
            }),
        new SourcesBase("InvBag106", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage10", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage13", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SmithingHammerChisel2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#YumYum Grotto|YumYum Grotto Vendors]]",
                        "txtName": "YumYum Grotto Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    },
                    <SourceModel>{"wikiName": "[[Whattso#Mopey Dick|Mopey Dick]]", "txtName": "Whattso: Mopey Dick"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight10", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line10", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken27", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Faraway Piers|Faraway Piers Vendors]]",
                        "txtName": "Faraway Piers Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TrapBoxSet1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Pelt for the Pelt God|Pelt for the Pelt God]]",
                        "txtName": "Lord of the Hunt: Pelt for the Pelt God"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("WorshipSkull1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotOr3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotRe3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    },
                    <SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag107", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage16", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage17", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage18", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage19", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage20", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage21", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest57", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest67", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Whetstone", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Frostbite Towndra|Frostbite Towndra Vendors]]",
                        "txtName": "Frostbite Towndra Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest65", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest66", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth13", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DNAgun0", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotOr4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotGr4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotRe4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotYe4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag108", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB41", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB38", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Outer World Town|Outer World Town Vendors]]",
                        "txtName": "Outer World Town Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth14", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Magma Rivertown|Magma Rivertown Vendors]]",
                        "txtName": "Magma Rivertown Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodHealth15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Magma Rivertown|Magma Rivertown Vendors]]",
                        "txtName": "Magma Rivertown Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("OilBarrel6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Magma Rivertown|Magma Rivertown Vendors]]",
                        "txtName": "Magma Rivertown Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Magma Rivertown|Magma Rivertown Vendors]]",
                        "txtName": "Magma Rivertown Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Magma Rivertown|Magma Rivertown Vendors]]",
                        "txtName": "Magma Rivertown Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Magma Rivertown|Magma Rivertown Vendors]]",
                        "txtName": "Magma Rivertown Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC22", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Vendors#Magma Rivertown|Magma Rivertown Vendors]]",
                        "txtName": "Magma Rivertown Vendor"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest24", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"},
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"},
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{"wikiName": "[[DropTable3b]]", "txtName": "DropTable3b"},
                    <SourceModel>{"wikiName": "[[DropTable3c]]", "txtName": "DropTable3c"},
                    <SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"},
                    <SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"},
                    <SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"},
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"},
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"},
                    <SourceModel>{"wikiName": "[[DropTable19]]", "txtName": "DropTable19"},
                    <SourceModel>{"wikiName": "[[DropTable20]]", "txtName": "DropTable20"},
                    <SourceModel>{"wikiName": "[[DropTable21]]", "txtName": "DropTable21"},
                    <SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"},
                    <SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"},
                    <SourceModel>{"wikiName": "[[DropTable27]]", "txtName": "DropTable27"}
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Mutton#7 Figure Followers|7 Figure Followers]]",
                        "txtName": "Mutton: 7 Figure Followers"
                    }
                ]
            }),
        new SourcesBase("ObolBronze0", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    },
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SuperDropTable1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable1]]", "txtName": "DropTable1"},
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"},
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{"wikiName": "[[DropTable3b]]", "txtName": "DropTable3b"},
                    <SourceModel>{"wikiName": "[[DropTable3c]]", "txtName": "DropTable3c"},
                    <SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"},
                    <SourceModel>{"wikiName": "[[DropTable5]]", "txtName": "DropTable5"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Funguy#Partycrastination|Partycrastination]]",
                        "txtName": "Funguy: Partycrastination"
                    }
                ]
            }),
        new SourcesBase("ObolBronze1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable2]]", "txtName": "DropTable2"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    },
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{"wikiName": "[[DropTable3b]]", "txtName": "DropTable3b"},
                    <SourceModel>{"wikiName": "[[DropTable3c]]", "txtName": "DropTable3c"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotMana2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronze2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable3]]", "txtName": "DropTable3"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    },
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronze3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable4]]", "txtName": "DropTable4"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    },
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Leaf1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable5]]", "txtName": "DropTable5"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable5]]", "txtName": "DropTable5"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable5]]", "txtName": "DropTable5"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"},
                    <SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"},
                    <SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"},
                    <SourceModel>{"wikiName": "[[SuperDropTable4]]", "txtName": "SuperDropTable4"},
                    <SourceModel>{"wikiName": "[[SuperDropTable5]]", "txtName": "SuperDropTable5"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SilverPen", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"},
                    <SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"},
                    <SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"},
                    <SourceModel>{"wikiName": "[[SuperDropTable4]]", "txtName": "SuperDropTable4"},
                    <SourceModel>{"wikiName": "[[SuperDropTable5]]", "txtName": "SuperDropTable5"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverMoney", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverDamage", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeEXP", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[SuperDropTable1]]", "txtName": "SuperDropTable1"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable5b]]", "txtName": "DropTable5b"},
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{
                        "wikiName": "[[Krunk#King of the Cavern|King of the Cavern]]",
                        "txtName": "Krunk: King of the Cavern"
                    },
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#Outta the Way Slimes|Outta the Way Slimes]]",
                        "txtName": "Stiltzcho: Outta the Way Slimes"
                    },
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#No Stone Unturned|No Stone Unturned]]",
                        "txtName": "Stiltzcho: No Stone Unturned"
                    },
                    <SourceModel>{
                        "wikiName": "[[Papua Piggea#This Little Piggy Felt Remorse|This Little Piggy Felt Remorse]]",
                        "txtName": "Papua Piggea: This Little Piggy Felt Remorse"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest32", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"},
                    <SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"}
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[XxX Cattleprod XxX#Ok, NOW it's Peak Gaming!|Ok, NOW it's Peak Gaming!]]",
                        "txtName": "XxX Cattleprod XxX: Ok, NOW it's Peak Gaming!"
                    }
                ]
            }),
        new SourcesBase("ObolSilver0", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"},
                    <SourceModel>{
                        "wikiName": "[[Carpetiem#Darn Lazy Gamers!|Darn Lazy Gamers!]]",
                        "txtName": "Carpetiem: Darn Lazy Gamers!"
                    },
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SuperDropTable2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable6]]", "txtName": "DropTable6"},
                    <SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"},
                    <SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"},
                    <SourceModel>{"wikiName": "[[DropTable9]]", "txtName": "DropTable9"},
                    <SourceModel>{"wikiName": "[[DropTable10]]", "txtName": "DropTable10"},
                    <SourceModel>{"wikiName": "[[DropTable11]]", "txtName": "DropTable11"},
                    <SourceModel>{"wikiName": "[[DropTable12]]", "txtName": "DropTable12"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA2b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB16", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilver1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable7]]", "txtName": "DropTable7"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA17", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilver2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable8]]", "txtName": "DropTable8"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB23", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable9]]", "txtName": "DropTable9"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable9]]", "txtName": "DropTable9"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats27", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable9]]", "txtName": "DropTable9"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilver3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable9]]", "txtName": "DropTable9"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Leaf2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable11]]", "txtName": "DropTable11"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable11]]", "txtName": "DropTable11"},
                    <SourceModel>{
                        "wikiName": "[[Sprout#Sticks and Stone Something Something Bones...|Sticks and Stone Something Something Bones...]]",
                        "txtName": "Sprout: Sticks and Stone Something Something Bones..."
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable11]]", "txtName": "DropTable11"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable12]]", "txtName": "DropTable12"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable12]]", "txtName": "DropTable12"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable12]]", "txtName": "DropTable12"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable13]]", "txtName": "DropTable13"},
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#Time Crime Episode 2|Time Crime Episode 2]]",
                        "txtName": "Stiltzcho: Time Crime Episode 2"
                    },
                    <SourceModel>{
                        "wikiName": "[[Papua Piggea#Crystal Crime Stopper|Crystal Crime Stopper]]",
                        "txtName": "Papua Piggea: Crystal Crime Stopper"
                    },
                    <SourceModel>{"wikiName": "[[Desert Davey#U Cool?|U Cool?]]", "txtName": "Desert Davey: U Cool?"},
                    <SourceModel>{
                        "wikiName": "[[Centurion#Colosseum Champ!|Colosseum Champ!]]",
                        "txtName": "Centurion: Colosseum Champ!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Telescope#I'm Seeing Stars!|I'm Seeing Stars!]]",
                        "txtName": "Telescope: I'm Seeing Stars!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Iceland Irwin#Crikey, it's cold out!|Crikey, it's cold out!]]",
                        "txtName": "Iceland Irwin: Crikey, it's cold out!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Voter Appeasement|Voter Appeasement]]",
                        "txtName": "Hoggindaz: Voter Appeasement"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Have a Candy|Have a Candy]]",
                        "txtName": "Bill Brr: Have a Candy"
                    },
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Sunrunning to Chizoar|Sunrunning to Chizoar]]",
                        "txtName": "Crystalswine: Sunrunning to Chizoar"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Stance on Big Tech|Stance on Big Tech]]",
                        "txtName": "Yondergreen: Stance on Big Tech"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#No Snapping Contract|No Snapping Contract]]",
                        "txtName": "Yondergreen: No Snapping Contract"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Mayoral Sack Size|Mayoral Sack Size]]",
                        "txtName": "Shuvelle: Mayoral Sack Size"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Diggy Diggy Hole!|Diggy Diggy Hole!]]",
                        "txtName": "Shuvelle: Diggy Diggy Hole!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Dig Diggily Diggy Dig Dig Hole!|Dig Diggily Diggy Dig Dig Hole!]]",
                        "txtName": "Shuvelle: Dig Diggily Diggy Dig Dig Hole!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Frogecoin to the MOON!|Frogecoin to the MOON!]]",
                        "txtName": "Lord of the Hunt: Frogecoin to the MOON!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Yet another Cartoon Reference|Yet another Cartoon Reference]]",
                        "txtName": "Lord of the Hunt: Yet another Cartoon Reference"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Small Stingers, Big Owie|Small Stingers, Big Owie]]",
                        "txtName": "Lord of the Hunt: Small Stingers, Big Owie"
                    },
                    <SourceModel>{"wikiName": "[[Snouts#Mana Plox|Mana Plox]]", "txtName": "Snouts: Mana Plox"},
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable13]]", "txtName": "DropTable13"},
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Top Skillage|Top Skillage]]",
                        "txtName": "Cactolyte: Top Skillage"
                    },
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#Time Crime Season Finale|Time Crime Season Finale]]",
                        "txtName": "Stiltzcho: Time Crime Season Finale"
                    },
                    <SourceModel>{
                        "wikiName": "[[Goldric#Dont lay a finger on my Sheepies!!!|Dont lay a finger on my Sheepies!!!]]",
                        "txtName": "Goldric: Dont lay a finger on my Sheepies!!!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#The Mummy of Mystery|The Mummy of Mystery]]",
                        "txtName": "Loominadi: The Mummy of Mystery"
                    },
                    <SourceModel>{"wikiName": "[[Cowbo Jones#Tomb Raid|Tomb Raid]]", "txtName": "Cowbo Jones: Tomb Raid"},
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Global Warming|Global Warming]]",
                        "txtName": "Crystalswine: Global Warming"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Ad Solidarity Contract|Ad Solidarity Contract]]",
                        "txtName": "Yondergreen: Ad Solidarity Contract"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Untitled Quest|Untitled Quest]]",
                        "txtName": "Lord of the Hunt: Untitled Quest"
                    },
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 2|Treasure Hunt 2]]",
                        "txtName": "Walupiggy: Treasure Hunt 2"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable13]]", "txtName": "DropTable13"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGold3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverLuck", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeDef", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[SuperDropTable2]]", "txtName": "SuperDropTable2"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB30", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PureWater", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"},
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"},
                    <SourceModel>{
                        "wikiName": "[[Carpetiem#Old Timey Craftin'|Old Timey Craftin']]",
                        "txtName": "Carpetiem: Old Timey Craftin'"
                    },
                    <SourceModel>{
                        "wikiName": "[[Loominadi#Uh, Something About Vials?|Uh, Something About Vials?]]",
                        "txtName": "Loominadi: Uh, Something About Vials?"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB36", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeWorship", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SuperDropTable3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable14]]", "txtName": "DropTable14"},
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"},
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"},
                    <SourceModel>{"wikiName": "[[DropTable17]]", "txtName": "DropTable17"},
                    <SourceModel>{"wikiName": "[[DropTable18]]", "txtName": "DropTable18"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC19", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA20", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeTrapping", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable15]]", "txtName": "DropTable15"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB34", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA27", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeCons", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable16]]", "txtName": "DropTable16"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Leaf3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable17]]", "txtName": "DropTable17"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB25", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable17]]", "txtName": "DropTable17"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB27", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable18]]", "txtName": "DropTable18"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB31", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeKill", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[SuperDropTable3]]", "txtName": "SuperDropTable3"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues20", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable19]]", "txtName": "DropTable19"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA31", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable19]]", "txtName": "DropTable19"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable19]]", "txtName": "DropTable19"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SuperDropTable4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable19]]", "txtName": "DropTable19"},
                    <SourceModel>{"wikiName": "[[DropTable20]]", "txtName": "DropTable20"},
                    <SourceModel>{"wikiName": "[[DropTable21]]", "txtName": "DropTable21"},
                    <SourceModel>{"wikiName": "[[DropTable22]]", "txtName": "DropTable22"},
                    <SourceModel>{"wikiName": "[[DropTable23]]", "txtName": "DropTable23"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable20]]", "txtName": "DropTable20"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable20]]", "txtName": "DropTable20"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotMana4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable20]]", "txtName": "DropTable20"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues22", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable21]]", "txtName": "DropTable21"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA32", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable21]]", "txtName": "DropTable21"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable21]]", "txtName": "DropTable21"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Leaf4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable22]]", "txtName": "DropTable22"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable22]]", "txtName": "DropTable22"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable23]]", "txtName": "DropTable23"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues23", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA33", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"},
                    <SourceModel>{"wikiName": "[[DropTable27]]", "txtName": "DropTable27"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotYe5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"},
                    <SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"},
                    <SourceModel>{"wikiName": "[[DropTable27]]", "txtName": "DropTable27"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SuperDropTable5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable25]]", "txtName": "DropTable25"},
                    <SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"},
                    <SourceModel>{"wikiName": "[[DropTable27]]", "txtName": "DropTable27"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues25", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA35", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodG9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"},
                    <SourceModel>{"wikiName": "[[DropTable27]]", "txtName": "DropTable27"},
                    <SourceModel>{"wikiName": "[[SuperDropTable5]]", "txtName": "SuperDropTable5"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage25", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable26]]", "txtName": "DropTable26"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[DropTable27]]", "txtName": "DropTable27"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneZ3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[SuperDropTable5]]", "txtName": "SuperDropTable5"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Secretstone", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Secretkeeper#The Few, the Proud|The Few, the Proud]]",
                        "txtName": "Secretkeeper: The Few, the Proud"
                    }
                ]
            }),
        new SourcesBase("EquipmentPants16", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Sprout#Justice Wears No Clothes|Justice Wears No Clothes]]",
                        "txtName": "Sprout: Justice Wears No Clothes"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts17", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Sprout#Shoe Shopping with Sprout|Shoe Shopping with Sprout]]",
                        "txtName": "Sprout: Shoe Shopping with Sprout"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Sprout#Frisbee Fanatic|Frisbee Fanatic]]",
                        "txtName": "Sprout: Frisbee Fanatic"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Sprout#Frisbee Fanatic|Frisbee Fanatic]]",
                        "txtName": "Sprout: Frisbee Fanatic"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeDamage", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Obol Altar#Bad Kitty, get off that altar!|Bad Kitty, get off that altar!]]",
                        "txtName": "Obol Altar: Bad Kitty, get off that altar!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Woodsman#A noob's first swing|A noob's first swing]]",
                        "txtName": "Woodsman: A noob's first swing"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentToolsHatchet0", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Woodsman#A noob's 2nd first swing|A noob's 2nd first swing]]",
                        "txtName": "Woodsman: A noob's 2nd first swing"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats4Choppin", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Woodsman#It's Just a Plank, Bro!|It's Just a Plank, Bro!]]",
                        "txtName": "Woodsman: It's Just a Plank, Bro!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Woodsman#Exotic Pranks... I mean Logs!|Exotic Pranks... I mean Logs!]]",
                        "txtName": "Woodsman: Exotic Pranks... I mean Logs!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Hardcore Gamer Status, Here I Come!|Hardcore Gamer Status, Here I Come!]]",
                        "txtName": "Scripticus: Hardcore Gamer Status, Here I Come!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Gear Up, Gamer!|Gear Up, Gamer!]]",
                        "txtName": "Scripticus: Gear Up, Gamer!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Mr. Worldwide|Mr. Worldwide]]",
                        "txtName": "Scripticus: Mr. Worldwide"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentTools1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Certified Swinger, of Pickaxes of course!|Certified Swinger, of Pickaxes of course!]]",
                        "txtName": "Scripticus: Certified Swinger, of Pickaxes of course!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Glumlee#Literally Burning your Money|Literally Burning your Money]]",
                        "txtName": "Glumlee: Literally Burning your Money"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Certified Swinger, of Pickaxes of course!|Certified Swinger, of Pickaxes of course!]]",
                        "txtName": "Scripticus: Certified Swinger, of Pickaxes of course!"
                    }
                ]
            }),
        new SourcesBase("MaxCapBagM1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#The Smithing Grind|The Smithing Grind]]",
                        "txtName": "Scripticus: The Smithing Grind"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#The Unoccupied Picnic|The Unoccupied Picnic]]",
                        "txtName": "Scripticus: The Unoccupied Picnic"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Live-Action Entertainment|Live-Action Entertainment]]",
                        "txtName": "Picnic Stowaway: Live-Action Entertainment"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#The Unoccupied Picnic|The Unoccupied Picnic]]",
                        "txtName": "Scripticus: The Unoccupied Picnic"
                    }
                ]
            }),
        new SourcesBase("InvBag3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Stiltzcho, the Leaf Scout|Stiltzcho, the Leaf Scout]]",
                        "txtName": "Scripticus: Stiltzcho, the Leaf Scout"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagM3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Stiltzcho, the Leaf Scout|Stiltzcho, the Leaf Scout]]",
                        "txtName": "Scripticus: Stiltzcho, the Leaf Scout"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#Investigator by Day, Prankster by Night|Investigator by Day, Prankster by Night]]",
                        "txtName": "Stiltzcho: Investigator by Day, Prankster by Night"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Stiltzcho, the Leaf Scout|Stiltzcho, the Leaf Scout]]",
                        "txtName": "Scripticus: Stiltzcho, the Leaf Scout"
                    }
                ]
            }),
        new SourcesBase("Trophy6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA1b", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Krunk#The Scientific Method, According to a Rock|The Scientific Method, According to a Rock]]",
                        "txtName": "Krunk: The Scientific Method, According to a Rock"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Krunk#The Scientific Method, According to a Rock|The Scientific Method, According to a Rock]]",
                        "txtName": "Krunk: The Scientific Method, According to a Rock"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("OilBarrel4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Glumlee#Learning to Swing|Learning to Swing]]",
                        "txtName": "Glumlee: Learning to Swing"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBagT2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Glumlee#Literally Burning your Money|Literally Burning your Money]]",
                        "txtName": "Glumlee: Literally Burning your Money"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest16", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Glumlee#The Impossible Task|The Impossible Task]]",
                        "txtName": "Glumlee: The Impossible Task"
                    },
                    <SourceModel>{
                        "wikiName": "[[Glumlee#He's Havin' a Bad Day|He's Havin' a Bad Day]]",
                        "txtName": "Glumlee: He's Havin' a Bad Day"
                    }
                ]
            }),
        new SourcesBase("NPCtoken6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Glumlee#He's Havin' a Bad Day|He's Havin' a Bad Day]]",
                        "txtName": "Glumlee: He's Havin' a Bad Day"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#The Hungry Stowaway|The Hungry Stowaway]]",
                        "txtName": "Picnic Stowaway: The Hungry Stowaway"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Beating Up Frogs for some Sauce|Beating Up Frogs for some Sauce]]",
                        "txtName": "Picnic Stowaway: Beating Up Frogs for some Sauce"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#A Midnight Snack|A Midnight Snack]]",
                        "txtName": "Picnic Stowaway: A Midnight Snack"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#King of Food|King of Food]]",
                        "txtName": "Picnic Stowaway: King of Food"
                    }
                ]
            }),
        new SourcesBase("Trophy1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#King of Food|King of Food]]",
                        "txtName": "Picnic Stowaway: King of Food"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Hamish#The Hamazing Plot Twist|The Hamazing Plot Twist]]",
                        "txtName": "Hamish: The Hamazing Plot Twist"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Hamish#Should We Tell Him?|Should We Tell Him?]]",
                        "txtName": "Hamish: Should We Tell Him?"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ResetCompleted", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Hamish#Should We Tell Him?|Should We Tell Him?]]",
                        "txtName": "Hamish: Should We Tell Him?"
                    },
                    <SourceModel>{
                        "wikiName": "[[Promotheus#Three Right Answers|Three Right Answers]]",
                        "txtName": "Promotheus: Three Right Answers"
                    },
                    <SourceModel>{
                        "wikiName": "[[Promotheus#Slovakian Scare|Slovakian Scare]]",
                        "txtName": "Promotheus: Slovakian Scare"
                    },
                    <SourceModel>{
                        "wikiName": "[[Funguy#Mushroom Munchies|Mushroom Munchies]]",
                        "txtName": "Funguy: Mushroom Munchies"
                    },
                    <SourceModel>{
                        "wikiName": "[[Speccius#More like 'Sleepius' lmao|More like 'Sleepius' lmao]]",
                        "txtName": "Speccius: More like 'Sleepius' lmao"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Rollin' Thunder!|Rollin' Thunder!]]",
                        "txtName": "Lord of the Hunt: Rollin' Thunder!"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Hamish#Slime for Storage|Slime for Storage]]",
                        "txtName": "Hamish: Slime for Storage"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats29", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Promotheus#Slovakian Scare|Slovakian Scare]]",
                        "txtName": "Promotheus: Slovakian Scare"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Promotheus#The Witcher, but not Really|The Witcher, but not Really]]",
                        "txtName": "Promotheus: The Witcher, but not Really"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PeanutS", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Bushlyte#A Peanut Saved is a Peanut not Eaten!|A Peanut Saved is a Peanut not Eaten!]]",
                        "txtName": "Bushlyte: A Peanut Saved is a Peanut not Eaten!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Rocklyte#Becoming the Best Beginner|Becoming the Best Beginner]]",
                        "txtName": "Rocklyte: Becoming the Best Beginner"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ExpBalloon3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Peanut De-Aging|Peanut De-Aging]]",
                        "txtName": "Cactolyte: Peanut De-Aging"
                    },
                    <SourceModel>{
                        "wikiName": "[[Wellington#Puzzles and Math, a Winning Combination!|Puzzles and Math, a Winning Combination!]]",
                        "txtName": "Wellington: Puzzles and Math, a Winning Combination!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Chizoar No More|Chizoar No More]]",
                        "txtName": "Hoggindaz: Chizoar No More"
                    },
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Small Stingers, Big Owie|Small Stingers, Big Owie]]",
                        "txtName": "Lord of the Hunt: Small Stingers, Big Owie"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest48", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Peanut De-Aging|Peanut De-Aging]]",
                        "txtName": "Cactolyte: Peanut De-Aging"
                    }
                ]
            }),
        new SourcesBase("Trophy13", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Maestro! The Stro! Mman!|Maestro! The Stro! Mman!]]",
                        "txtName": "Cactolyte: Maestro! The Stro! Mman!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#Investigator by Day, Prankster by Night|Investigator by Day, Prankster by Night]]",
                        "txtName": "Stiltzcho: Investigator by Day, Prankster by Night"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Stiltzcho#Time Crime Season Finale|Time Crime Season Finale]]",
                        "txtName": "Stiltzcho: Time Crime Season Finale"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("MaxCapBag10", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Funguy#Mushroom Munchies|Mushroom Munchies]]",
                        "txtName": "Funguy: Mushroom Munchies"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings13", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Funguy#Partycrastination|Partycrastination]]",
                        "txtName": "Funguy: Partycrastination"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Funguy#Wicked Party Cleanup|Wicked Party Cleanup]]",
                        "txtName": "Funguy: Wicked Party Cleanup"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Funguy#Wicked Party Cleanup|Wicked Party Cleanup]]",
                        "txtName": "Funguy: Wicked Party Cleanup"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bandit Bob#Bullets for Bandit Bob!|Bullets for Bandit Bob!]]",
                        "txtName": "Bandit Bob: Bullets for Bandit Bob!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Goldric#Criminal Code of Conduct|Criminal Code of Conduct]]",
                        "txtName": "Goldric: Criminal Code of Conduct"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Tiki Chief#Three Strikes, you're Out!|Three Strikes, you're Out!]]",
                        "txtName": "Tiki Chief: Three Strikes, you're Out!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Tiki Chief#Hotel? Tikivago. Sorry, couldn't Help It!|Hotel? Tikivago. Sorry, couldn't Help It!]]",
                        "txtName": "Tiki Chief: Hotel? Tikivago. Sorry, couldn't Help It!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken13", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dog Bone (NPC)#Bow Wow going Dow..n!|Bow Wow going Dow..n!]]",
                        "txtName": "Dog Bone (NPC): Bow Wow going Dow..n!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Papua Piggea#Stamp Collecting|Stamp Collecting]]",
                        "txtName": "Papua Piggea: Stamp Collecting"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Papua Piggea#This Little Piggy Felt Remorse|This Little Piggy Felt Remorse]]",
                        "txtName": "Papua Piggea: This Little Piggy Felt Remorse"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA19", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Papua Piggea#This Little Piggy Felt Remorse|This Little Piggy Felt Remorse]]",
                        "txtName": "Papua Piggea: This Little Piggy Felt Remorse"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Mutton#Beatboxing Starterpack|Beatboxing Starterpack]]",
                        "txtName": "Mutton: Beatboxing Starterpack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Mutton#Beatboxing Starterpack|Beatboxing Starterpack]]",
                        "txtName": "Mutton: Beatboxing Starterpack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA14", <SourcesModel>{
                "sources": [<SourceModel>{
                    "wikiName": "[[Mutton#Clout Chasin'|Clout Chasin']]",
                    "txtName": "Mutton: Clout Chasin'"
                }],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA16", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Mutton#Cross Platform Promotion|Cross Platform Promotion]]",
                        "txtName": "Mutton: Cross Platform Promotion"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Mutton#7 Figure Followers|7 Figure Followers]]",
                        "txtName": "Mutton: 7 Figure Followers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA26", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Mutton#7 Figure Followers|7 Figure Followers]]",
                        "txtName": "Mutton: 7 Figure Followers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB17", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Fishpaste97#'Accidental' Exploit|'Accidental' Exploit]]",
                        "txtName": "Fishpaste97: 'Accidental' Exploit"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken22", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Fishpaste97#Can you do the Can Can?|Can you do the Can Can?]]",
                        "txtName": "Fishpaste97: Can you do the Can Can?"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Fishpaste97#Can you do the Can Can?|Can you do the Can Can?]]",
                        "txtName": "Fishpaste97: Can you do the Can Can?"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC18", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Fishpaste97#Can you do the Can Can?|Can you do the Can Can?]]",
                        "txtName": "Fishpaste97: Can you do the Can Can?"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scubidew#Don't Step to Me, Bro!|Don't Step to Me, Bro!]]",
                        "txtName": "Scubidew: Don't Step to Me, Bro!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Carpetiem#Helping 100 times over|Helping 100 times over]]",
                        "txtName": "Carpetiem: Helping 100 times over"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken26", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Scubidew#A Normal Quest.|A Normal Quest.]]",
                        "txtName": "Scubidew: A Normal Quest."
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Whattso#The Whaley Hard Minigame|The Whaley Hard Minigame]]",
                        "txtName": "Whattso: The Whaley Hard Minigame"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Whattso#Bobbin' Bobbers|Bobbin' Bobbers]]",
                        "txtName": "Whattso: Bobbin' Bobbers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken18", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Whattso#Bobbin' Bobbers|Bobbin' Bobbers]]",
                        "txtName": "Whattso: Bobbin' Bobbers"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Whattso#The Biggest Fish in the Sea...?|The Biggest Fish in the Sea...?]]",
                        "txtName": "Whattso: The Biggest Fish in the Sea...?"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest46", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Whattso#The Biggest Fish in the Sea...?|The Biggest Fish in the Sea...?]]",
                        "txtName": "Whattso: The Biggest Fish in the Sea...?"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest20", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Bandit Bob#Bringing Bob's Boxes|Bringing Bob's Boxes]]",
                        "txtName": "Bandit Bob: Bringing Bob's Boxes"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Bake Him Away, Toys|Bake Him Away, Toys]]",
                        "txtName": "Cowbo Jones: Bake Him Away, Toys"
                    }
                ]
            }),
        new SourcesBase("NPCtoken16", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Bandit Bob#The Desert Dungeon Prequest|The Desert Dungeon Prequest]]",
                        "txtName": "Bandit Bob: The Desert Dungeon Prequest"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest45", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mimic|Active Mimics (1/100)]]", "txtName": "Active Mimics (1/100)"}],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Bandit Bob#The Desert Dungeon Prequest|The Desert Dungeon Prequest]]",
                        "txtName": "Bandit Bob: The Desert Dungeon Prequest"
                    }
                ]
            }),
        new SourcesBase("NPCtoken20", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Carpetiem#Helping 100 times over|Helping 100 times over]]",
                        "txtName": "Carpetiem: Helping 100 times over"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Carpetiem#Helping 100 times over|Helping 100 times over]]",
                        "txtName": "Carpetiem: Helping 100 times over"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken25", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Djonnut#The Blue New World|The Blue New World]]",
                        "txtName": "Djonnut: The Blue New World"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest27", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Goldric#Dress to Impress|Dress to Impress]]",
                        "txtName": "Goldric: Dress to Impress"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken21", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Goldric#Dont lay a finger on my Sheepies!!!|Dont lay a finger on my Sheepies!!!]]",
                        "txtName": "Goldric: Dont lay a finger on my Sheepies!!!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Meel#Waitin' for the Cards to Drop|Waitin' for the Cards to Drop]]",
                        "txtName": "Meel: Waitin' for the Cards to Drop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#Red Stuff Bad!|Red Stuff Bad!]]",
                        "txtName": "Snake Jar: Red Stuff Bad!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats44", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#PSA. You Are Being Eaten!|PSA. You Are Being Eaten!]]",
                        "txtName": "Snake Jar: PSA. You Are Being Eaten!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken17", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Snake Jar#A Noob, served Medium Rare!|A Noob, served Medium Rare!]]",
                        "txtName": "Snake Jar: A Noob, served Medium Rare!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken24", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Loominadi#The Mummy of Mystery|The Mummy of Mystery]]",
                        "txtName": "Loominadi: The Mummy of Mystery"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Weight8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Loominadi#The Mummy of Mystery|The Mummy of Mystery]]",
                        "txtName": "Loominadi: The Mummy of Mystery"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB14", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Wellington#Platforms in Disguise, Platsformers!|Platforms in Disguise, Platsformers!]]",
                        "txtName": "Wellington: Platforms in Disguise, Platsformers!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA24", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Wellington#Platforms in Disguise, Platsformers!|Platforms in Disguise, Platsformers!]]",
                        "txtName": "Wellington: Platforms in Disguise, Platsformers!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB20", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Wellington#Findin' Fingerprints|Findin' Fingerprints]]",
                        "txtName": "Wellington: Findin' Fingerprints"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB22", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Wellington#Findin' Fingerprints|Findin' Fingerprints]]",
                        "txtName": "Wellington: Findin' Fingerprints"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC14", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Wellington#You Can't Run, but you Can Hide|You Can't Run, but you Can Hide]]",
                        "txtName": "Wellington: You Can't Run, but you Can Hide"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken23", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Wellington#Puzzles and Math, a Winning Combination!|Puzzles and Math, a Winning Combination!]]",
                        "txtName": "Wellington: Puzzles and Math, a Winning Combination!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken14", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dazey#Literally Physics|Literally Physics]]",
                        "txtName": "Dazey: Literally Physics"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The Hatless Howerhouse!|The Hatless Howerhouse!]]",
                        "txtName": "Cowbo Jones: The Hatless Howerhouse!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Bake Him Away, Toys|Bake Him Away, Toys]]",
                        "txtName": "Cowbo Jones: Bake Him Away, Toys"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats30", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#A Hat in Crime|A Hat in Crime]]",
                        "txtName": "Cowbo Jones: A Hat in Crime"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Commence Criminal Crimes!|Commence Criminal Crimes!]]",
                        "txtName": "Cowbo Jones: Commence Criminal Crimes!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#Oh No, not the Elderly!|Oh No, not the Elderly!]]",
                        "txtName": "Cowbo Jones: Oh No, not the Elderly!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverEXP", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Cowbo Jones#Tomb Raid|Tomb Raid]]", "txtName": "Cowbo Jones: Tomb Raid"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken19", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Cowbo Jones#Tomb Raid|Tomb Raid]]", "txtName": "Cowbo Jones: Tomb Raid"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo Jones#The New Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[XxX Cattleprod XxX#Peak Gaming|Peak Gaming]]",
                        "txtName": "XxX Cattleprod XxX: Peak Gaming"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB19", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[XxX Cattleprod XxX#Peak Gaming|Peak Gaming]]",
                        "txtName": "XxX Cattleprod XxX: Peak Gaming"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[XxX Cattleprod XxX#Wait No, I meant Pathetic Gaming|Wait No, I meant Pathetic Gaming]]",
                        "txtName": "XxX Cattleprod XxX: Wait No, I meant Pathetic Gaming"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB18", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[XxX Cattleprod XxX#Wait No, I meant Pathetic Gaming|Wait No, I meant Pathetic Gaming]]",
                        "txtName": "XxX Cattleprod XxX: Wait No, I meant Pathetic Gaming"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA28", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[XxX Cattleprod XxX#Ok, NOW it's Peak Gaming!|Ok, NOW it's Peak Gaming!]]",
                        "txtName": "XxX Cattleprod XxX: Ok, NOW it's Peak Gaming!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest33", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[XxX Cattleprod XxX#Ok, NOW it's Peak Gaming!|Ok, NOW it's Peak Gaming!]]",
                        "txtName": "XxX Cattleprod XxX: Ok, NOW it's Peak Gaming!"
                    }
                ]
            }),
        new SourcesBase("Quest34", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[XxX Cattleprod XxX#Ok, NOW it's Peak Gaming!|Ok, NOW it's Peak Gaming!]]",
                        "txtName": "XxX Cattleprod XxX: Ok, NOW it's Peak Gaming!"
                    }
                ]
            }),
        new SourcesBase("Quest64", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Giftmas Blobulyte#Giftmas Time!|Giftmas Time!]]",
                        "txtName": "Giftmas Blobulyte: Giftmas Time!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest39", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Loveulyte#Heart Hogger|Heart Hogger]]",
                        "txtName": "Loveulyte: Heart Hogger"
                    }
                ]
            }),
        new SourcesBase("Quest43", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Egggulyte#Egg Shaped Lootboxes!|Egg Shaped Lootboxes!]]",
                        "txtName": "Egggulyte: Egg Shaped Lootboxes!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Egggulyte#I've Got a Golden Tickegg!|I've Got a Golden Tickegg!]]",
                        "txtName": "Egggulyte: I've Got a Golden Tickegg!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest59", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Mayoral Movie Taste|Mayoral Movie Taste]]",
                        "txtName": "Shuvelle: Mayoral Movie Taste"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Voter Recognition|Voter Recognition]]",
                        "txtName": "Hoggindaz: Voter Recognition"
                    }
                ]
            }),
        new SourcesBase("Quest60", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Legislative Action|Legislative Action]]",
                        "txtName": "Yondergreen: Legislative Action"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Voter Appeasement|Voter Appeasement]]",
                        "txtName": "Hoggindaz: Voter Appeasement"
                    }
                ]
            }),
        new SourcesBase("Quest61", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Coin Shenanigans|Coin Shenanigans]]",
                        "txtName": "Bill Brr: Coin Shenanigans"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Voter Apathy|Voter Apathy]]",
                        "txtName": "Hoggindaz: Voter Apathy"
                    }
                ]
            }),
        new SourcesBase("NPCtoken32", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#Chizoar No More|Chizoar No More]]",
                        "txtName": "Hoggindaz: Chizoar No More"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Hoggindaz#The Fresh Prince of the Tundra|The Fresh Prince of the Tundra]]",
                        "txtName": "Hoggindaz: The Fresh Prince of the Tundra"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP16", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Laughin' Amphibian|Laughin' Amphibian]]",
                        "txtName": "Bill Brr: Laughin' Amphibian"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Coin Shenanigans|Coin Shenanigans]]",
                        "txtName": "Bill Brr: Coin Shenanigans"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Duckin' and Shatterin'|Duckin' and Shatterin']]",
                        "txtName": "Bill Brr: Duckin' and Shatterin'"
                    },
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Hatin' on the Green One|Hatin' on the Green One]]",
                        "txtName": "Bill Brr: Hatin' on the Green One"
                    },
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Melting the Snakes|Melting the Snakes]]",
                        "txtName": "Crystalswine: Melting the Snakes"
                    },
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Sunrunning to Chizoar|Sunrunning to Chizoar]]",
                        "txtName": "Crystalswine: Sunrunning to Chizoar"
                    },
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Global Warming|Global Warming]]",
                        "txtName": "Crystalswine: Global Warming"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Infrastructure Plan|Infrastructure Plan]]",
                        "txtName": "Yondergreen: Infrastructure Plan"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Economic Policy|Economic Policy]]",
                        "txtName": "Yondergreen: Economic Policy"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Legislative Action|Legislative Action]]",
                        "txtName": "Yondergreen: Legislative Action"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#No Snapping Contract|No Snapping Contract]]",
                        "txtName": "Yondergreen: No Snapping Contract"
                    },
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Keep Away Contract|Keep Away Contract]]",
                        "txtName": "Yondergreen: Keep Away Contract"
                    },
                    <SourceModel>{
                        "wikiName": "[[Worldo#Odd Jobs for Cold Hard Cash|Odd Jobs for Cold Hard Cash]]",
                        "txtName": "Worldo: Odd Jobs for Cold Hard Cash"
                    },
                    <SourceModel>{
                        "wikiName": "[[Worldo#Can't Guard if you're Dead!|Can't Guard if you're Dead!]]",
                        "txtName": "Worldo: Can't Guard if you're Dead!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Mayoral Luck|Mayoral Luck]]",
                        "txtName": "Shuvelle: Mayoral Luck"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Mayoral Skill|Mayoral Skill]]",
                        "txtName": "Shuvelle: Mayoral Skill"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Mayoral Movie Taste|Mayoral Movie Taste]]",
                        "txtName": "Shuvelle: Mayoral Movie Taste"
                    },
                    <SourceModel>{"wikiName": "[[Shuvelle#Diggy Hole!|Diggy Hole!]]", "txtName": "Shuvelle: Diggy Hole!"},
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Diggy Diggy Hole!|Diggy Diggy Hole!]]",
                        "txtName": "Shuvelle: Diggy Diggy Hole!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Dig Diggily Diggy Dig Dig Hole!|Dig Diggily Diggy Dig Dig Hole!]]",
                        "txtName": "Shuvelle: Dig Diggily Diggy Dig Dig Hole!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Toadstall#Bigger Party Better Party!|Bigger Party Better Party!]]",
                        "txtName": "Toadstall: Bigger Party Better Party!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Toadstall#Bother the Frogger!|Bother the Frogger!]]",
                        "txtName": "Toadstall: Bother the Frogger!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gangster Gus#Plunderin Down Yonder|Plunderin Down Yonder]]",
                        "txtName": "Gangster Gus: Plunderin Down Yonder"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gangster Gus#Perfect Progress Score|Perfect Progress Score]]",
                        "txtName": "Gangster Gus: Perfect Progress Score"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gangster Gus#Sanke Revival Denial|Sanke Revival Denial]]",
                        "txtName": "Gangster Gus: Sanke Revival Denial"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken37", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Hatin' on the Green One|Hatin' on the Green One]]",
                        "txtName": "Bill Brr: Hatin' on the Green One"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken33", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Bellows#Optometric Hoarder|Optometric Hoarder]]",
                        "txtName": "Bellows: Optometric Hoarder"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA22", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Melting the Snakes|Melting the Snakes]]",
                        "txtName": "Crystalswine: Melting the Snakes"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken38", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Sunrunning to Chizoar|Sunrunning to Chizoar]]",
                        "txtName": "Crystalswine: Sunrunning to Chizoar"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA25", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Crystalswine#Global Warming|Global Warming]]",
                        "txtName": "Crystalswine: Global Warming"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest62", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Legislative Action|Legislative Action]]",
                        "txtName": "Yondergreen: Legislative Action"
                    }
                ]
            }),
        new SourcesBase("NPCtoken36", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Yondergreen#Ad Solidarity Contract|Ad Solidarity Contract]]",
                        "txtName": "Yondergreen: Ad Solidarity Contract"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardPack4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Worldo#Odd Jobs for Cold Hard Cash|Odd Jobs for Cold Hard Cash]]",
                        "txtName": "Worldo: Odd Jobs for Cold Hard Cash"
                    },
                    <SourceModel>{
                        "wikiName": "[[Worldo#Can't Guard if you're Dead!|Can't Guard if you're Dead!]]",
                        "txtName": "Worldo: Can't Guard if you're Dead!"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken35", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Shuvelle#Dig Diggily Diggy Dig Dig Hole!|Dig Diggily Diggy Dig Dig Hole!]]",
                        "txtName": "Shuvelle: Dig Diggily Diggy Dig Dig Hole!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken31", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Lonely Hunter#Opening Chests|Opening Chests]]",
                        "txtName": "Lonely Hunter: Opening Chests"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Carpenter Cardinal#Restoring Power, once again, to a Portal|Restoring Power, once again, to a Portal]]",
                        "txtName": "Carpenter Cardinal: Restoring Power, once again, to a Portal"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Crystal3", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Carpenter Cardinal#Restoring Power, once again, to a Portal|Restoring Power, once again, to a Portal]]",
                        "txtName": "Carpenter Cardinal: Restoring Power, once again, to a Portal"
                    }
                ]
            }),
        new SourcesBase("ResetBox", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#Untitled Quest|Untitled Quest]]",
                        "txtName": "Lord of the Hunt: Untitled Quest"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy10", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Lord of the Hunt#To Trap or not to Trap|To Trap or not to Trap]]",
                        "txtName": "Lord of the Hunt: To Trap or not to Trap"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Snouts#A Salty Fall|A Salty Fall]]", "txtName": "Snouts: A Salty Fall"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA18", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Snouts#Gravity VS Salt|Gravity VS Salt]]",
                        "txtName": "Snouts: Gravity VS Salt"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB26", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Snouts#Gravity VS Salt|Gravity VS Salt]]",
                        "txtName": "Snouts: Gravity VS Salt"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Snouts#Big Ol Chonker|Big Ol Chonker]]",
                        "txtName": "Snouts: Big Ol Chonker"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC20", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Snouts#Big Ol Chonker|Big Ol Chonker]]",
                        "txtName": "Snouts: Big Ol Chonker"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken34", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Snouts#Mana Plox|Mana Plox]]", "txtName": "Snouts: Mana Plox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest50", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Coastiolyte#Cooler than a Cooler!|Cooler than a Cooler!]]",
                        "txtName": "Coastiolyte: Cooler than a Cooler!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Coastiolyte#Vibe Check|Vibe Check]]",
                        "txtName": "Coastiolyte: Vibe Check"
                    },
                    <SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Pearl4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 1|Treasure Hunt 1]]",
                        "txtName": "Walupiggy: Treasure Hunt 1"
                    },
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 3|Treasure Hunt 3]]",
                        "txtName": "Walupiggy: Treasure Hunt 3"
                    },
                    <SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"},
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TalentPoint6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 2|Treasure Hunt 2]]",
                        "txtName": "Walupiggy: Treasure Hunt 2"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TalentPoint3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 2|Treasure Hunt 2]]",
                        "txtName": "Walupiggy: Treasure Hunt 2"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("TalentPoint2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 3|Treasure Hunt 3]]",
                        "txtName": "Walupiggy: Treasure Hunt 3"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 4|Treasure Hunt 4]]",
                        "txtName": "Walupiggy: Treasure Hunt 4"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardPack1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Walupiggy#Treasure Hunt 4|Treasure Hunt 4]]",
                        "txtName": "Walupiggy: Treasure Hunt 4"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Spookyness|The Spookyness]]",
                        "txtName": "Falloween Pumpkin: The Spookyness"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Scaryness|The Scaryness]]",
                        "txtName": "Falloween Pumpkin: The Scaryness"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Horroriness|The Horroriness]]",
                        "txtName": "Falloween Pumpkin: The Horroriness"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Booeyness|The Booeyness]]",
                        "txtName": "Falloween Pumpkin: The Booeyness"
                    },
                    <SourceModel>{
                        "wikiName": "[[Falloween Pumpkin#The Afterparty|The Afterparty]]",
                        "txtName": "Falloween Pumpkin: The Afterparty"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB42", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Capital P#Right side wrong side!|Right side wrong side!]]",
                        "txtName": "Capital P: Right side wrong side!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC21", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Capital P#No room on the Dance Floor!|No room on the Dance Floor!]]",
                        "txtName": "Capital P: No room on the Dance Floor!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA30", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Capital P#Everybody move it move it!|Everybody move it move it!]]",
                        "txtName": "Capital P: Everybody move it move it!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB37", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Filling the Menu|Filling the Menu]]",
                        "txtName": "Oinkin: Filling the Menu"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB40", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Diner Deliverer|Diner Deliverer]]",
                        "txtName": "Oinkin: Diner Deliverer"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB39", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Oinkin#Recipe for Fattening Pastry|Recipe for Fattening Pastry]]",
                        "txtName": "Oinkin: Recipe for Fattening Pastry"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PureWater2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Nebula Neddy#Task Requirement Affirmative|Task Requirement Affirmative]]",
                        "txtName": "Nebula Neddy: Task Requirement Affirmative"
                    },
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Alchemy Liquid Shop]]",
                        "txtName": "Alchemy: Liquid Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest72", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Slargon#Shut up the Namecallers!|Shut up the Namecallers!]]",
                        "txtName": "Slargon: Shut up the Namecallers!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Slargon#Assert Dominance over the Meek!|Assert Dominance over the Meek!]]",
                        "txtName": "Slargon: Assert Dominance over the Meek!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Poigu#Think twice speak once|Think twice speak once]]",
                        "txtName": "Poigu: Think twice speak once"
                    },
                    <SourceModel>{
                        "wikiName": "[[Poigu#Speak from the heart not the mind|Speak from the heart not the mind]]",
                        "txtName": "Poigu: Speak from the heart not the mind"
                    },
                    <SourceModel>{
                        "wikiName": "[[Poigu#Learn the Language of the Universe|Learn the Language of the Universe]]",
                        "txtName": "Poigu: Learn the Language of the Universe"
                    },
                    <SourceModel>{
                        "wikiName": "[[Muhmuguh#Wave after wave slowly Sailing|Wave after wave slowly Sailing]]",
                        "txtName": "Muhmuguh: Wave after wave slowly Sailing"
                    },
                    <SourceModel>{
                        "wikiName": "[[Muhmuguh#Rising up and Growing as a Gamer|Rising up and Growing as a Gamer]]",
                        "txtName": "Muhmuguh: Rising up and Growing as a Gamer"
                    },
                    <SourceModel>{
                        "wikiName": "[[Muhmuguh#Learn the Language of the Universe|Learn the Language of the Universe]]",
                        "txtName": "Muhmuguh: Learn the Language of the Universe"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest73", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Slargon#Smack the meanies!|Smack the meanies!]]",
                        "txtName": "Slargon: Smack the meanies!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Slargon#Mess with the Misters!|Mess with the Misters!]]",
                        "txtName": "Slargon: Mess with the Misters!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Slargon#Assert Dominance over the Meek!|Assert Dominance over the Meek!]]",
                        "txtName": "Slargon: Assert Dominance over the Meek!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Poigu#Think twice speak once|Think twice speak once]]",
                        "txtName": "Poigu: Think twice speak once"
                    },
                    <SourceModel>{
                        "wikiName": "[[Poigu#Speak from the heart not the mind|Speak from the heart not the mind]]",
                        "txtName": "Poigu: Speak from the heart not the mind"
                    },
                    <SourceModel>{
                        "wikiName": "[[Poigu#Learn the Language of the Universe|Learn the Language of the Universe]]",
                        "txtName": "Poigu: Learn the Language of the Universe"
                    },
                    <SourceModel>{
                        "wikiName": "[[Muhmuguh#Wave after wave slowly Sailing|Wave after wave slowly Sailing]]",
                        "txtName": "Muhmuguh: Wave after wave slowly Sailing"
                    },
                    <SourceModel>{
                        "wikiName": "[[Muhmuguh#Rising up and Growing as a Gamer|Rising up and Growing as a Gamer]]",
                        "txtName": "Muhmuguh: Rising up and Growing as a Gamer"
                    },
                    <SourceModel>{
                        "wikiName": "[[Muhmuguh#Learn the Language of the Universe|Learn the Language of the Universe]]",
                        "txtName": "Muhmuguh: Learn the Language of the Universe"
                    },
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Pearl6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Slargon#Mess with the Misters!|Mess with the Misters!]]",
                        "txtName": "Slargon: Mess with the Misters!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Slargon#Assert Dominance over the Meek!|Assert Dominance over the Meek!]]",
                        "txtName": "Slargon: Assert Dominance over the Meek!"
                    },
                    <SourceModel>{
                        "wikiName": "[[Poigu#Learn the Language of the Universe|Learn the Language of the Universe]]",
                        "txtName": "Poigu: Learn the Language of the Universe"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB43", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Pirate Porkchop#Bring me the Booty|Bring me the Booty]]",
                        "txtName": "Pirate Porkchop: Bring me the Booty"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB45", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Pirate Porkchop#Sailing for some Sparks|Sailing for some Sparks]]",
                        "txtName": "Pirate Porkchop: Sailing for some Sparks"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA34", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Pirate Porkchop#Seeking Treasure Shrooms|Seeking Treasure Shrooms]]",
                        "txtName": "Pirate Porkchop: Seeking Treasure Shrooms"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA36", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Pirate Porkchop#Ye finest treasure at once!|Ye finest treasure at once!]]",
                        "txtName": "Pirate Porkchop: Ye finest treasure at once!"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB44", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Poigu#Think twice speak once|Think twice speak once]]",
                        "txtName": "Poigu: Think twice speak once"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB46", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Poigu#Speak from the heart not the mind|Speak from the heart not the mind]]",
                        "txtName": "Poigu: Speak from the heart not the mind"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats46", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats47", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats48", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Ht", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats49", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats50", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats35", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats38", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRingsChat1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRingsChat2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRingsChat4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRingsChat5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRingsChat6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRingsChat3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRingsChat9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Blank", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage31", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage99", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ClassSwap", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardPack2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardPack3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardPack5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ17", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardPack6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain0", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain8", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain17", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolHyper0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats81", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats80", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats33", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StonePremSTR", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StonePremAGI", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StonePremWIS", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StonePremLUK", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"},
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StonePremStatswap", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StonePremRestore", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemQ16", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP20", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP22", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP23", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GemP24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Dreadlo", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Godshard", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StarfireBar", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DreadloBar", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("GodshardBar", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Forging]]", "txtName": "Forging"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ForestTree", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Tree7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Tree8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Tree9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Tree10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Fishing]]", "txtName": "Fishing"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Bug10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Catching]]", "txtName": "Catching"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter1A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter2A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter3A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter4A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter5A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter6A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter7A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter8A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter9A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Critter10A", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Soul3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Soul4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Soul5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Soul6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Starlight", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mining]]", "txtName": "Mining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("AlienTreetutorial", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choppin]]", "txtName": "Choppin"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat10", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat13", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat14", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat16", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CraftMat17", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Smithing#Production items|Anvil Production]]",
                        "txtName": "Smithing: Anvil Production"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant19", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant20", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant22", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant23", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings21", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings20", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings19", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings22", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings18", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain3", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain4", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain5", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain6", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain7", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain9", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain10", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain11", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain12", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain13", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain14", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain15", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain16", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain18", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain19", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain20", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain21", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain22", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain23", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentKeychain24", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Dungeons#Flurbo Shop|Flurbo Shop]]", "txtName": "Dungeons: Flurbo Shop"},
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Loot Rolls|Dungeon Loot Rolls]]",
                        "txtName": "Dungeons: Flurbo Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEnhancer0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEnhancer1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEnhancer2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungRNG0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungRNG1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungRNG2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungRNG3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungRNG4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungeonA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungeonA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungeonA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungeonA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungeonA5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungeonA6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungeonA7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungeonA8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchA5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchC3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchC5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchD1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchD2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchD3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchD4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchD5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchE1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchE2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchE3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchE4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchE5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchF1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchF2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchF3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchF4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponPunchF5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordA5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordC3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordC5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordD1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordD2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordD3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordD4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordD5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordE1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordE2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordE3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordE4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordE5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordF1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordF2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordF3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordF4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSwordF5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowA5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowC3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowC5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowD1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowD2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowD3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowD4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowD5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowE1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowE2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowE3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowE4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowE5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowF1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowF2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowF3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowF4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBowF5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandA3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandA4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandA5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandB3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandB4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandB5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandC1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandC2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandC3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandC5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandD1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandD2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandD3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandD4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandD5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandE1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandE2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandE3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandE4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandE5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandF1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandF2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandF3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandF4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWandF5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponSword1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponWand1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungWeaponBow1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentHats0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentHats1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentHats2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentHats3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentHats4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShirt0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShirt1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShirt2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShirt3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShirt4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPants0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPants1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPants2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPants3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPants4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShoes0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShoes1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShoes2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShoes3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentShoes4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPendant0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPendant1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPendant2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPendant3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentPendant4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentRings0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentRings1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentRings2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentRings3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("DungEquipmentRings4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Dungeons]]", "txtName": "Dungeons"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Timecandy#", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Pearl5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("LootDice", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Skull Shop]]", "txtName": "Killroy Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT1e", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"},
                    <SourceModel>{"wikiName": "[[Giftmas Box]]", "txtName": "Giftmas Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneHelm1b", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"},
                    <SourceModel>{"wikiName": "[[Giftmas Box]]", "txtName": "Giftmas Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"},
                    <SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"},
                    <SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX0", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Grandfrog's Gazebo|Grandfrog's Gazebo]]",
                        "txtName": "Dungeons: Grandfrog's Gazebo"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Grandfrog's Gazebo|Grandfrog's Gazebo]]",
                        "txtName": "Dungeons: Grandfrog's Gazebo"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Grandfrog's Gazebo|Grandfrog's Gazebo]]",
                        "txtName": "Dungeons: Grandfrog's Gazebo"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Grandfrog's Gazebo|Grandfrog's Gazebo]]",
                        "txtName": "Dungeons: Grandfrog's Gazebo"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Grandfrog's Gazebo|Grandfrog's Gazebo]]",
                        "txtName": "Dungeons: Grandfrog's Gazebo"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Grandfrog's Gazebo|Grandfrog's Gazebo]]",
                        "txtName": "Dungeons: Grandfrog's Gazebo"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Grandfrog's Gazebo|Grandfrog's Gazebo]]",
                        "txtName": "Dungeons: Grandfrog's Gazebo"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX14", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Grandfrog's Gazebo|Grandfrog's Gazebo]]",
                        "txtName": "Dungeons: Grandfrog's Gazebo"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX10", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX13", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX16", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest51", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PalmTreeD", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest53", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest54", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest55", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Crypt of Snakenhotep|Crypt of Snakenhotep]]",
                        "txtName": "Dungeons: Crypt of Snakenhotep"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX17", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX18", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX19", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsX20", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Tree7D", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PlatD", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish1D", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Fish3D", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Cashb", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Dung3Ice", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Dungeons#Igloo's Basement|Igloo's Basement]]",
                        "txtName": "Dungeons: Igloo's Basement"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest52", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Bill Brr#Coin Shenanigans|Coin Shenanigans]]",
                        "txtName": "Bill Brr: Coin Shenanigans"
                    }
                ]
            }),
        new SourcesBase("EquipmentHats42", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Giftmas Event", "txtName": "Giftmas Event"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats51", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Valenslimes Day Event", "txtName": "Valenslimes Day Event"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats55", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Steam Launch Event", "txtName": "Steam Launch Event"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats56", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Easter Event", "txtName": "Easter Event"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats63", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Summer Break Event", "txtName": "Summer Break Event"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Summer Bundle Gem Offer", "txtName": "Summer Bundle Gem Offer"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkChoppin", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverPop", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldPop", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverKill", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumTrapping", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkTrapping", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumCons", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkCons", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumWorship", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkWorship", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Obol Combining", "txtName": "Obol Combining"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRingsChat8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag22", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag23", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag24", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag25", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvBag26", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage32", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage33", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage34", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage35", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage36", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage37", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage38", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage39", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage40", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage41", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("InvStorage42", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats31", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats32", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats34", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats36", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats40", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats37", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats45", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats57", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats62", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Gem Shop]]", "txtName": "Gem Shop"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("BallJoePickle", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Arcade]]", "txtName": "Arcade"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Arcade]]", "txtName": "Arcade"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Gfoodcoupon", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Arcade]]", "txtName": "Arcade"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ItemsCoupon1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Arcade]]", "txtName": "Arcade"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ItemsCoupon2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Arcade]]", "txtName": "Arcade"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats65", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Arcade]]", "txtName": "Arcade"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Arcade]]", "txtName": "Arcade"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Arcade]]", "txtName": "Arcade"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGold0", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGold1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGold2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldDamage", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldMoney", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldMining", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldChoppin", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldFishing", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldCatching", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldLuck", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldKill", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldEXP", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverCard", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverDef", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldDef", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Quality Obol Stack|Quality Obol Stack]]",
                        "txtName": "Gem Shop: Quality Obol Stack"
                    },
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinum0", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinum1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinum2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinum3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPink0", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPink1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPink2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPink3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumDamage", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkDamage", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumMining", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkMining", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumChoppin", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumFishing", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkFishing", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumCatching", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkCatching", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumLuck", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkLuck", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumPop", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkPop", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumKill", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkKill", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumEXP", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkEXP", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumCard", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkCard", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPlatinumDef", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolPinkDef", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldTrapping", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldCons", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldWorship", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop#Marvelous Obol Stack|Marvelous Obol Stack]]",
                        "txtName": "Gem Shop: Marvelous Obol Stack"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats14", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Starter Hat", "txtName": "Starter Hat"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats11", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Starter Hat", "txtName": "Starter Hat"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats13", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Starter Hat", "txtName": "Starter Hat"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats12", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Starter Hat", "txtName": "Starter Hat"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA23", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Line6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodPotYe3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampC9", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest25", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy9", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Start", "txtName": "Start"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Start", "txtName": "Start"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Start", "txtName": "Start"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StampB2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "Start", "txtName": "Start"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeMining", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeChoppin", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeFishing", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeCatching", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverFishing", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverChoppin", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverCatching", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverMining", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverTrapping", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverWorship", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverCons", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGold", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolGoldCard", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Pearl3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Beach Oyster]]", "txtName": "Beach Oyster"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Pearl2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Beach Oyster]]", "txtName": "Beach Oyster"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Pearl1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Beach Oyster]]", "txtName": "Beach Oyster"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CritterCard1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CritterCard2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CritterCard3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CritterCard4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CritterCard5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CritterCard6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CritterCard7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Trapping]]", "txtName": "Trapping"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SoulCard1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SoulCard2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SoulCard3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SoulCard4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("SoulCard5", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Worship]]", "txtName": "Worship"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings15", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "Has a 1/1M chance to drop from active kills if the Blue Hedgehog [[Star Signs|Starsign]] is equipped.",
                        "txtName": "Has a 1/1M chance to drop from active kills if the Blue Hedgehog is equipped."
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats69", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Gem Shop|Limited time bundle]]",
                        "txtName": "Gem Shop: Limited time bundle"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy8", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "The only way to obtain this is when the [[Gem Shop|Lava Supporter Pack]] is available, or from contests (discord, twitch, twitter)",
                        "txtName": "The only way to obtain this is when the Lava Supporter Pack is available, or from contests (discord, twitch, twitter)"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest11", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Tiki Chief#Three Strikes, you're Out!|Three Strikes, you're Out!]]",
                        "txtName": "Tiki Chief: Three Strikes, you're Out!"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Tiki Chief#Three Strikes, you're Out!|Three Strikes, you're Out!]]",
                        "txtName": "Tiki Chief: Three Strikes, you're Out!"
                    }
                ]
            }),
        new SourcesBase("Quest26", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift (however this item has no use anymore)]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken15", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[TP Pete]]", "txtName": "TP Pete"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest56", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[King Doot]]", "txtName": "King Doot"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("NPCtoken10", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Krunk]]", "txtName": "Krunk"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Glumlee#Literally Burning your Money|Literally Burning your Money]]",
                        "txtName": "Glumlee: Literally Burning your Money"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Certified Swinger, of Pickaxes of course!|Certified Swinger, of Pickaxes of course!]]",
                        "txtName": "Scripticus: Certified Swinger, of Pickaxes of course!"
                    }
                ]
            }),
        new SourcesBase("Quest38", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest47", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Peanut De-Aging|Peanut De-Aging]]",
                        "txtName": "Cactolyte: Peanut De-Aging"
                    }
                ],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Cactolyte#Peanut De-Aging|Peanut De-Aging]]",
                        "txtName": "Cactolyte: Peanut De-Aging"
                    }
                ]
            }),
        new SourcesBase("Trophy5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Special Talents#Special Talent Book Sources|Roll Da Dice]]",
                        "txtName": "Roll Da Dice"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trophy12", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "Catch the Megalodon in the [[Fishing]] minigame",
                        "txtName": "Catch the Megalodon in the Fishing minigame"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Mayo", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "Dug at the end of the 'Treasure Hunt 1' quest from [[Walupiggy]]",
                        "txtName": "Dug at the end of the 'Treasure Hunt 1' quest from Walupiggy"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trash", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "Dug at the end of the 'Treasure Hunt 2' quest from [[Walupiggy]]",
                        "txtName": "Dug at the end of the 'Treasure Hunt 2' quest from Walupiggy"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Trash2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "Dug at the end of the 'Treasure Hunt 3' quest from [[Walupiggy]]",
                        "txtName": "Dug at the end of the 'Treasure Hunt 3' quest from Walupiggy"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Quest10", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Afternoon Tea in a Jiffy|Afternoon Tea in a Jiffy]]",
                        "txtName": "Picnic Stowaway: Afternoon Tea in a Jiffy"
                    }
                ]
            })    
]
}
