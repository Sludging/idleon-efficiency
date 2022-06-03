import { SourceModel } from '../model/sourceModel';
import { SourcesModel } from '../model/sourcesModel';

export class SourcesBase { constructor(public id: string, public data: SourcesModel) { } }



export const initCustomSourceRepo = () => {
    return [    
        new SourcesBase("Quest50", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}],
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
        new SourcesBase("StoneWeb", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT1eb", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Summer Cooler]]", "txtName": "Summer Cooler"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneAeB", <SourcesModel>{
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
        new SourcesBase("Pearl4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent8", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent7", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[2021 Giftmas Box]]", "txtName": "2021 Giftmas Box"},
                    <SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("CardsY0", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("FoodEvent4", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Choco Box]]", "txtName": "Choco Box"}],
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
        new SourcesBase("Quest63", <SourcesModel>{
                "sources": [],
                "recipeFrom": [],
                "questAss": [<SourceModel>{"wikiName": "[[Shuvelle#Diggy Hole!|Diggy Hole!]]", "txtName": "Shuvelle: Diggy Hole!"}]
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
        new SourcesBase("EquipmentHats33", <SourcesModel>{
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
        new SourcesBase("EquipmentHats21", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("PremiumGem", <SourcesModel>{
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
        new SourcesBase("Timecandy1", <SourcesModel>{
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
        new SourcesBase("Timecandy2", <SourcesModel>{
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
        new SourcesBase("Timecandy3", <SourcesModel>{
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
        new SourcesBase("Timecandy4", <SourcesModel>{
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
        new SourcesBase("Timecandy5", <SourcesModel>{
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
        new SourcesBase("StoneZ1", <SourcesModel>{
                "sources": [
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
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    },
                    <SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}
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
        new SourcesBase("EquipmentStatues1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues4", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues5", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues6", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues7", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Level up Gift|Level up Gift]]",
                        "txtName": "Alchemy: Level up Gift"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("EquipmentStatues8", <SourcesModel>{
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
        new SourcesBase("StoneA3b", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StonePremLUK", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneHelm6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneW6", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ExpBalloon1", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ExpBalloon2", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ExpBalloon3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Guild Giftbox]]", "txtName": "Guild Giftbox"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ResetFrag", <SourcesModel>{
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
        new SourcesBase("ObolBronze0", <SourcesModel>{
                "sources": [
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
        new SourcesBase("ObolBronze1", <SourcesModel>{
                "sources": [
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
        new SourcesBase("ObolBronze2", <SourcesModel>{
                "sources": [
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
        new SourcesBase("ObolBronze3", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    },
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}
                ],
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
        new SourcesBase("ObolBronzeDamage", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Mediocre Obols]]",
                        "txtName": "Alchemy: Mediocre Obols"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilverDamage", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
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
        new SourcesBase("ObolSilver0", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilver1", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilver2", <SourcesModel>{
                "sources": [
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"},
                    <SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolSilver3", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Decent Obols]]", "txtName": "Alchemy: Decent Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeCons", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeKill", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeDef", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeTrapping", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("ObolBronzeWorship", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Alchemy#Liquid Shop|Grand Obols]]", "txtName": "Alchemy: Grand Obols"}],
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
        new SourcesBase("StoneW1", <SourcesModel>{
                "sources": [
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
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneT1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneHelm1", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("StoneA1b", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Weak UPG Stone]]",
                        "txtName": "Alchemy: Weak UPG Stone"
                    }
                ],
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
        new SourcesBase("PureWater2", <SourcesModel>{
                "sources": [
                    <SourceModel>{
                        "wikiName": "[[Alchemy#Liquid Shop|Alchemy Liquid Shop]]",
                        "txtName": "Alchemy: Liquid Shop"
                    }
                ],
                "recipeFrom": [],
                "questAss": []
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
        new SourcesBase("BadgeG1", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("BadgeG2", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("BadgeG3", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken1", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken2", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken3", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Scripticus#Champion of the Grasslands|Champion of the Grasslands]]",
                        "txtName": "Scripticus: Champion of the Grasslands"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("BadgeD1", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("BadgeD2", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("BadgeD3", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken28", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken29", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("NPCtoken30", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Cowbo_Jones#The_New_Sheriff|The New Sheriff]]",
                        "txtName": "Cowbo Jones: The New Sheriff"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats52", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts26", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants20", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes21", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentRings16", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Yum_Yum_Desert#Merit_Shop|Yum Yum Desert Merit Shop]]",
                        "txtName": "Yum Yum Desert Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats22", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShirts18", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPants17", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes20", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentPendant17", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Tasks/Blunder_Hills#Merit_Shop|Blunder Hills Merit Shop]]",
                        "txtName": "Blunder Hills Merit Shop"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentHats68", <SourcesModel>{
                "sources": [
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
        new SourcesBase("EquipmentPendant25", <SourcesModel>{
                "sources": [
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
        new SourcesBase("NPCtoken39", <SourcesModel>{
                "sources": [
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
        new SourcesBase("BadgeI1", <SourcesModel>{
                "sources": [
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
        new SourcesBase("BadgeI2", <SourcesModel>{
                "sources": [
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
        new SourcesBase("BadgeI3", <SourcesModel>{
                "sources": [
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
        new SourcesBase("Quest45", <SourcesModel>{
                "sources": [<SourceModel>{"wikiName": "[[Mimic|Active Mimics (1/100)]]", "txtName": "Active Mimics (1/100)"}],
                "recipeFrom": [],
                "questAss": []
            }),
        new SourcesBase("Peanut", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Picnic Stowaway#Brunchin' with the Blobs|Brunchin' with the Blobs]]",
                        "txtName": "Picnic Stowaway: Brunchin' with the Blobs"
                    }
                ],
                "questAss": []
            }),
        new SourcesBase("EquipmentShoes15", <SourcesModel>{
                "sources": [],
                "recipeFrom": [
                    <SourceModel>{
                        "wikiName": "[[Colosseum#Dewdrop_Silver_Chest|W1 Colosseum first silver chest]]",
                        "txtName": "Colosseum: W1 Colosseum first silver chest"
                    }
                ],
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
