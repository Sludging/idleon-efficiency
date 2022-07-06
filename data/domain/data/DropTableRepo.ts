import { CoinDropModel } from '../model/coinDropModel';
import { DropTableModel } from '../model/dropTableModel';
import { ItemDropModel } from '../model/itemDropModel';
import { RecipeDropModel } from '../model/recipeDropModel';
import { SubTableDropModel } from '../model/subTableDropModel';
import { TalentDropModel } from '../model/talentDropModel';

export class DropTableBase { constructor(public id: string, public data: DropTableModel) { } }



export const initDropTableRepo = () => {
    return [    
        new DropTableBase("DropTable1", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 27, "chance": 0.008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth1", "quantity": 10, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotMana1", "quantity": 5, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats5", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPants10", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB3", "quantity": 1, "chance": 0.0012, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 3, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolBronze0", "quantity": 1, "chance": 0.00063, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable1", "quantity": 1, "chance": 0.004, "questLink": "N/A"}
                ],
                "subTable": "DropTable1"
            }),
        new DropTableBase("DropTable2", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth3", "quantity": 15, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues1", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotGr1", "quantity": 5, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotOr2", "quantity": 10, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "rtt0", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentShirts21", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest21", "quantity": 1, "chance": 0.3, "questLink": "Funguy3"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 4, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolBronze1", "quantity": 1, "chance": 0.00063, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable1", "quantity": 1, "chance": 0.0045, "questLink": "N/A"}
                ],
                "subTable": "DropTable2"
            }),
        new DropTableBase("DropTable3", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth2", "quantity": 15, "chance": 0.42, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues5", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 39, "chance": 5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotMana2", "quantity": 10, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT2", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "rtt0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 6, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolBronze2", "quantity": 1, "chance": 0.00063, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable1", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                ],
                "subTable": "DropTable3"
            }),
        new DropTableBase("DropTable3b", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotRe1", "quantity": 25, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotMana1", "quantity": 25, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues5", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues4", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 3, "chance": 0.5, "questLink": "Mutton4"},
                    <SubTableDropModel>{"item": "SuperDropTable1", "quantity": 1, "chance": 0.0055, "questLink": "N/A"}
                ],
                "subTable": "DropTable3b"
            }),
        new DropTableBase("DropTable3c", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotRe1", "quantity": 25, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotMana1", "quantity": 25, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues5", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues15", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 3, "chance": 0.5, "questLink": "Mutton4"},
                    <SubTableDropModel>{"item": "SuperDropTable1", "quantity": 1, "chance": 0.0055, "questLink": "N/A"}
                ],
                "subTable": "DropTable3c"
            }),
        new DropTableBase("DropTable4", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues7", "quantity": 1, "chance": 0.27, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB11", "quantity": 1, "chance": 0.0009, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotGr1", "quantity": 5, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA13", "quantity": 1, "chance": 0.00015, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolBronze3", "quantity": 1, "chance": 0.00063, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable1", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable4"
            }),
        new DropTableBase("DropTable5", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Leaf1", "quantity": 5, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues3", "quantity": 1, "chance": 0.32, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotOr1", "quantity": 5, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB9", "quantity": 1, "chance": 0.0015, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable1", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable5"
            }),
        new DropTableBase("SuperDropTable1", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Trophy2", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SilverPen", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                    <TalentDropModel>{"item": "TalentBook1", "quantity": 3623100, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ResetFrag", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <TalentDropModel>{"item": "TalentBook1", "quantity": 362450, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG4", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolSilverMoney", "quantity": 1, "chance": 0.02835, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolSilverDamage", "quantity": 1, "chance": 0.02835, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolBronzeEXP", "quantity": 1, "chance": 0.03045, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ1", "quantity": 2, "chance": 0.85, "questLink": "N/A"}
                ],
                "subTable": "SuperDropTable1"
            }),
        new DropTableBase("DropTable5b", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues2", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues4", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues14", "quantity": 1, "chance": 0.05, "questLink": "N/A"}
                ],
                "subTable": "DropTable5b"
            }),
        new DropTableBase("DropTable6", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvBag7", "quantity": 1, "chance": 0.0018, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth6", "quantity": 15, "chance": 0.42, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotGr2", "quantity": 25, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB15", "quantity": 1, "chance": 0.0006, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues12", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{
                        "item": "Quest32",
                        "quantity": 1,
                        "chance": 0.6,
                        "questLink": "XxX_Cattleprod_XxX3"
                    },
                    <ItemDropModel>{"item": "Quest24", "quantity": 7, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest23", "quantity": 3, "chance": 0.3, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolSilver0", "quantity": 1, "chance": 0.00063, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable6"
            }),
        new DropTableBase("DropTable7", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvStorage14", "quantity": 1, "chance": 0.0012, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA2b", "quantity": 1, "chance": 0.005, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth7", "quantity": 15, "chance": 0.42, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB16", "quantity": 1, "chance": 0.0004, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues11", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{
                        "item": "Quest32",
                        "quantity": 1,
                        "chance": 0.9,
                        "questLink": "XxX_Cattleprod_XxX3"
                    },
                    <ItemDropModel>{"item": "Quest24", "quantity": 8, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest23", "quantity": 3, "chance": 0.3, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolSilver1", "quantity": 1, "chance": 0.00063, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable7"
            }),
        new DropTableBase("DropTable8", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "MidnightCookie", "quantity": 1, "chance": 0.003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA17", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotRe3", "quantity": 25, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB24", "quantity": 1, "chance": 0.00015, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues13", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 8, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest23", "quantity": 3, "chance": 0.3, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolSilver2", "quantity": 1, "chance": 0.00063, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable8"
            }),
        new DropTableBase("DropTable9", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB23", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues10", "quantity": 1, "chance": 0.102, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolSilver3", "quantity": 1, "chance": 0.00063, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable9"
            }),
        new DropTableBase("DropTable10", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA2", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotGr1", "quantity": 5, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable10"
            }),
        new DropTableBase("DropTable11", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Leaf2", "quantity": 4, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW2", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues8", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotOr1", "quantity": 5, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB13", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable11"
            }),
        new DropTableBase("DropTable12", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT2", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues9", "quantity": 1, "chance": 0.085, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA11", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotOr1", "quantity": 5, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB21", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable12"
            }),
        new DropTableBase("DropTable13", <DropTableModel>{
                "drops": [
                    <ItemDropModel>{"item": "ExpBalloon1", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 4, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy1", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy2", "quantity": 1, "chance": 0.32, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy3", "quantity": 1, "chance": 0.13, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy4", "quantity": 1, "chance": 0.035, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy5", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy6", "quantity": 1, "chance": 0.001, "questLink": "N/A"}
                ],
                "subTable": "DropTable13"
            }),
        new DropTableBase("SuperDropTable2", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SilverPen", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Trophy2", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ResetFrag", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG3", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolGold3", "quantity": 1, "chance": 0.02205, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolSilverLuck", "quantity": 1, "chance": 0.02205, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolBronzeDef", "quantity": 1, "chance": 0.03045, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ1", "quantity": 3, "chance": 0.7, "questLink": "N/A"}
                ],
                "subTable": "SuperDropTable2"
            }),
        new DropTableBase("DropTable14", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB30", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PureWater", "quantity": 1, "chance": 0.022, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB36", "quantity": 1, "chance": 0.0006, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues18", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues2", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotOr3", "quantity": 25, "chance": 0.15, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 8, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest23", "quantity": 5, "chance": 0.3, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 3, "chance": 0.2, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolBronzeWorship", "quantity": 1, "chance": 0.02205, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable3", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable14"
            }),
        new DropTableBase("DropTable15", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampC19", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PureWater", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA20", "quantity": 1, "chance": 0.00015, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth10", "quantity": 15, "chance": 0.5, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes3", "quantity": 63, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues18", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 9, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest23", "quantity": 5, "chance": 0.3, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 3, "chance": 0.2, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolBronzeTrapping", "quantity": 1, "chance": 0.02205, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable3", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable15"
            }),
        new DropTableBase("DropTable16", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB34", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PureWater", "quantity": 1, "chance": 0.027, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA27", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotYe2", "quantity": 25, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues4", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 10, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 3, "chance": 0.2, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest23", "quantity": 5, "chance": 0.3, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "ObolBronzeCons", "quantity": 1, "chance": 0.02205, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable3", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable16"
            }),
        new DropTableBase("DropTable17", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Leaf3", "quantity": 3, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB25", "quantity": 1, "chance": 0.0012, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable3", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable17"
            }),
        new DropTableBase("DropTable18", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB27", "quantity": 1, "chance": 0.0012, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable3", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable18"
            }),
        new DropTableBase("SuperDropTable3", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SilverPen", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB31", "quantity": 1, "chance": 0.015, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Trophy2", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ResetFrag", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG5", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG8", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolBronzeKill", "quantity": 1, "chance": 0.03045, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ2", "quantity": 3, "chance": 0.7, "questLink": "N/A"}
                ],
                "subTable": "SuperDropTable3"
            }),
        new DropTableBase("DropTable19", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA31", "quantity": 1, "chance": 0.00027, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Weight7", "quantity": 1, "chance": 0.00023, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 8, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 3, "chance": 0.2, "questLink": "Mutton4"},
                    <SubTableDropModel>{"item": "SuperDropTable4", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable19"
            }),
        new DropTableBase("DropTable20", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Line8", "quantity": 1, "chance": 0.00015, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotMana4", "quantity": 50, "chance": 0.15, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 8, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 3, "chance": 0.2, "questLink": "Mutton4"},
                    <SubTableDropModel>{"item": "SuperDropTable4", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable20"
            }),
        new DropTableBase("DropTable21", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA32", "quantity": 1, "chance": 0.00018, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Weight13", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest24", "quantity": 8, "chance": 0.5, "questLink": "Mutton4"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 3, "chance": 0.2, "questLink": "Mutton4"},
                    <SubTableDropModel>{"item": "SuperDropTable4", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable21"
            }),
        new DropTableBase("DropTable22", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Leaf4", "quantity": 3, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Weight4", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable4", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable22"
            }),
        new DropTableBase("DropTable23", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Line13", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "SuperDropTable4", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ],
                "subTable": "DropTable23"
            }),
        new DropTableBase("SuperDropTable4", <DropTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SilverPen", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Trophy2", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ResetFrag", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG7", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ2", "quantity": 3, "chance": 0.7, "questLink": "N/A"}
                ],
                "subTable": "SuperDropTable4"
            })    
]
}
