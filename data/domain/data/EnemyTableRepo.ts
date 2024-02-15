import { CardDropModel } from '../model/cardDropModel';
import { CoinDropModel } from '../model/coinDropModel';
import { EnemyTableModel } from '../model/enemyTableModel';
import { ItemDropModel } from '../model/itemDropModel';
import { RecipeDropModel } from '../model/recipeDropModel';
import { SubTableDropModel } from '../model/subTableDropModel';
import { TalentDropModel } from '../model/talentDropModel';

export class EnemyTableBase { constructor(public id: string, public data: EnemyTableModel) { } }



export const initEnemyTableRepo = () => {
    return [    
        new EnemyTableBase("frogP", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.012, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.0014, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogNest", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("frogD", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.004, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogY", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.017, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogR", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogW", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.02, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogGG", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogGR", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogGR2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogGR3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogGR4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogFiller1", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("frogFiller1b", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("frogFiller1d", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("Meteor", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("rocky", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.016, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("cactus", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.022, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("target", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.012, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.0017, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("totem", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.016, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.002, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("steakR", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.018, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("potatoB", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("snakeZ", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("snakeZ2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("snakeZ3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("iceknight", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.08, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("iceBossZ", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("iceBossZ2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("iceBossZ3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits1", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DungCredits2", "quantity": 1, "chance": 0.8, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogFiller3de", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("frogFiller3fd", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("frogFiller3drt", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("frogFiller3ed", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("ForgeA", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "CopperBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "IronBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GoldBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ForgeB", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PlatBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DementiaBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "VoidBar", "quantity": 69, "chance": 0.5, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bandit_Bob", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest19", "quantity": 69, "chance": 0.07, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mushPtutorial", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 50, "chance": 0.5, "questLink": "N/A"}]
            }),
        new EnemyTableBase("demonPtutorial", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 250, "chance": 0.4, "questLink": "N/A"}]
            }),
        new EnemyTableBase("behemoth", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 1, "questLink": "N/A"}]
            }),
        new EnemyTableBase("AlienTreetutorial", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"}]
            }),
        new EnemyTableBase("Starlight", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"}]
            }),
        new EnemyTableBase("Crystal0", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA14", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                    <TalentDropModel>{"item": "TalentBook1", "quantity": 3618100, "chance": 0.005, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5b", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Crystal1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB13", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                    <TalentDropModel>{"item": "TalentBook1", "quantity": 3618100, "chance": 0.005, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable11", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5b", "quantity": 3, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Crystal2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE15", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                    <TalentDropModel>{"item": "TalentBook1", "quantity": 3618100, "chance": 0.005, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable17", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable18", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5b", "quantity": 3, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Crystal3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG14", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                    <TalentDropModel>{"item": "TalentBook1", "quantity": 3618100, "chance": 0.005, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable22", "quantity": 1, "chance": 0.4, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Crystal4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH14", "quantity": 1, "chance": 0.006, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable27", "quantity": 1, "chance": 0.17, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable28", "quantity": 1, "chance": 0.17, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Crystal5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI15", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampC3", "quantity": 1, "chance": 0.1, "questLink": "Papua_Piggea2"},
                    <SubTableDropModel>{"item": "DropTable29", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable30", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable31", "quantity": 1, "chance": 0.17, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable32", "quantity": 1, "chance": 0.17, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mushG", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands1", "quantity": 1, "chance": 0.22, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA0", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth1", "quantity": 3, "chance": 0.005, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentShirts16", "quantity": 1, "chance": 0.00035, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW2", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Cutter", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.003, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mushR", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 6, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands4", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA1", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.0052, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mushW", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 40, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest15", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "TreeInterior1b", "quantity": 1, "chance": 7.5e-05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA16", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3c", "quantity": 1, "chance": 0.007, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5b", "quantity": 1, "chance": 0.002, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogG", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 3, "chance": 0.48, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 1, "chance": 0.21, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA2", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest3", "quantity": 1, "chance": 0.5, "questLink": "Picnic_Stowaway2"},
                    <ItemDropModel>{"item": "Quest4", "quantity": 1, "chance": 0.3, "questLink": "Picnic_Stowaway2"},
                    <ItemDropModel>{"item": "FoodPotMana1", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvStorageF", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats6", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.0038, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("beanG", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 5, "chance": 0.46, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands3", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA3", "quantity": 1, "chance": 9.7e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA2", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats25", "quantity": 1, "chance": 3.5e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 0.0045, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("slimeG", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 8, "chance": 0.44, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Jungle1", "quantity": 1, "chance": 0.19, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA4", "quantity": 1, "chance": 9.5e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 43, "chance": 3e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "OilBarrel2", "quantity": 10, "chance": 0.0003, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 47, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 0.004, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("snakeG", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 11, "chance": 0.43, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Jungle2", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA5", "quantity": 1, "chance": 9.4e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth2", "quantity": 3, "chance": 0.005, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest7", "quantity": 1, "chance": 0.2, "questLink": "Stiltzcho2"},
                    <ItemDropModel>{"item": "StampA7", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvBag100", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("carrotO", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 15, "chance": 0.41, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Jungle3", "quantity": 1, "chance": 0.17, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA6", "quantity": 1, "chance": 9e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth2", "quantity": 4, "chance": 0.006, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentBows4", "quantity": 1, "chance": 4e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("goblinG", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 19, "chance": 0.39, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Forest1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA7", "quantity": 1, "chance": 8.6e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneHelm1", "quantity": 1, "chance": 0.00015, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 44, "chance": 3e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 0.004, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("plank", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 23, "chance": 0.37, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Forest2", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA8", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 48, "chance": 3e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest12", "quantity": 1, "chance": 0.1, "questLink": "Dog_Bone1"},
                    <ItemDropModel>{"item": "EquipmentShirts19", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 0.0045, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("frogBIG", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 28, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Forest3", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA9", "quantity": 1, "chance": 7e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA10", "quantity": 1, "chance": 3e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotRe2", "quantity": 5, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA8", "quantity": 1, "chance": 0.0003, "questLink": "Papua_Piggea1"},
                    <ItemDropModel>{"item": "ObolBronzePop", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("branch", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 90, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "TreeInterior1", "quantity": 1, "chance": 0.21, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA12", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "TreeInterior1b", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 68, "chance": 0.0002, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3c", "quantity": 1, "chance": 0.0057, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("acorn", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 110, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "TreeInterior2", "quantity": 1, "chance": 0.23, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA13", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3c", "quantity": 1, "chance": 0.0065, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("poopSmall", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 80, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Sewers1", "quantity": 1, "chance": 0.24, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA10", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Sewers1b", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 69, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 1, "chance": 0.23, "questLink": "Mutton2"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 1, "chance": 0.23, "questLink": "Mutton3"},
                    <ItemDropModel>{"item": "Quest22", "quantity": 1, "chance": 0.23, "questLink": "Mutton4"},
                    <SubTableDropModel>{"item": "DropTable3b", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ratB", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 105, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Sewers2", "quantity": 1, "chance": 0.19, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA11", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest14", "quantity": 1, "chance": 0.1, "questLink": "TP_Pete2"},
                    <ItemDropModel>{"item": "Quest23", "quantity": 1, "chance": 0.16, "questLink": "Mutton3"},
                    <ItemDropModel>{"item": "Quest23", "quantity": 1, "chance": 0.16, "questLink": "Mutton4"},
                    <SubTableDropModel>{"item": "DropTable3b", "quantity": 1, "chance": 0.006, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("poopD", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0.99, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Sewers3", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsA15", "quantity": 1, "chance": 0.0015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("babayaga", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 800, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ0", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "BabaYagaETC", "quantity": 1, "chance": 0.006, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes1", "quantity": 63, "chance": 0.06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest41", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 0.5, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("poopBig", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "JobApplication", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 24, "chance": 0.06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Sewers1", "quantity": 150, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{
                        "item": "EquipmentToolsHatchet2b",
                        "quantity": 1,
                        "chance": 0.02,
                        "questLink": "N/A"
                    },
                    <ItemDropModel>{"item": "EquipmentTools10", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Sewers1b", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("GrasslandsBoss", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 500, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Meatloaf", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ2", "quantity": 1, "chance": 0.045, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats39", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ1", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest17", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("wolfA", <EnemyTableModel>{
                "drops": [
                    <ItemDropModel>{"item": "Crystal1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <CoinDropModel>{"item": "COIN", "quantity": 500, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Meatloaf", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ2", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats39", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolAmarokA", "quantity": 1, "chance": 0.0007, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest17", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("wolfB", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 500, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Meatloaf", "quantity": 3, "chance": 0.1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ4", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats39", "quantity": 1, "chance": 0.004, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolAmarokA", "quantity": 1, "chance": 0.0033, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest17", "quantity": 3, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest29", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 4, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 4, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 4, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("wolfC", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 500, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Meatloaf", "quantity": 10, "chance": 0.05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ14", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats39", "quantity": 1, "chance": 0.012, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolAmarokA", "quantity": 1, "chance": 0.0085, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentCape3", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ1", "quantity": 1, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest17", "quantity": 6, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest29", "quantity": 2, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BossPart", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
            }),
        new EnemyTableBase("rockG", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
            }),
        new EnemyTableBase("rockB", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
            }),
        new EnemyTableBase("rockS", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
            }),
        new EnemyTableBase("Iceball", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"}]
            }),
        new EnemyTableBase("jarSand", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 40, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertA1", "quantity": 1, "chance": 0.22, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB1", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats9", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertA1b", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.003, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mimicA", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 47, "chance": 0.47, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertA2", "quantity": 1, "chance": 0.212, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GoldricP1", "quantity": 1, "chance": 0.1, "questLink": "Goldric3"},
                    <CardDropModel>{"item": "CardsB2", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvBag101", "quantity": 1, "chance": 2.5e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 16, "chance": 5e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("crabcake", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 55, "chance": 0.45, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertA3", "quantity": 1, "chance": 0.205, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB3", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertA3b", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 41, "chance": 2.5e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.0036, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("shovelR", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 60, "chance": 0.43, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB12", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("coconut", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 67, "chance": 0.43, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertB1", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GoldricP2", "quantity": 1, "chance": 0.075, "questLink": "Goldric3"},
                    <CardDropModel>{"item": "CardsB4", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 17, "chance": 2e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("sandcastle", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 80, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertB2", "quantity": 1, "chance": 0.19, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GoldricP3", "quantity": 1, "chance": 0.05, "questLink": "Goldric3"},
                    <CardDropModel>{"item": "CardsB5", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("pincermin", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 90, "chance": 0.38, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertB3", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB6", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <RecipeDropModel>{
                        "item": "SmithingRecipes4",
                        "quantity": 53,
                        "chance": 3e-06,
                        "questLink": "(Enter World 4)"
                    },
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0037, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("potato", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 100, "chance": 0.37, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertB4", "quantity": 1, "chance": 0.17, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB7", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 0.0039, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("steak", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 112, "chance": 0.36, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertC1", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB8", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("moonman", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 125, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertC2", "quantity": 1, "chance": 0.165, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertC2b", "quantity": 1, "chance": 0.0005, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB9", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest18", "quantity": 1, "chance": 0.0001, "questLink": "Loominadi1"},
                    <ItemDropModel>{"item": "EquipmentHats14", "quantity": 1, "chance": 1.5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("sandgiant", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 140, "chance": 0.34, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertC3", "quantity": 1, "chance": 0.152, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB10", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 58, "chance": 1.7e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.0037, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("snailZ", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 160, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DesertC4", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsB11", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant14", "quantity": 1, "chance": 2e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 0.0039, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("babaHour", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 7000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Hgg", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ1", "quantity": 2, "chance": 0.4, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 66, "chance": 0.06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.008, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ5", "quantity": 1, "chance": 0.024, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 75, "chance": 0.06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 0.4, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("babaMummy", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ6", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key2", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 65, "chance": 0.06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 5, "chance": 0.75, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPants19", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "MidnightCookie", "quantity": 2, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 0.5, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss2A", <EnemyTableModel>{
                "drops": [
                    <ItemDropModel>{"item": "Crystal2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ3", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                    <ItemDropModel>{"item": "MidnightCookie", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolEfauntA", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats2", "quantity": 1, "chance": 0.000667, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes2", "quantity": 75, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EfauntDrop1", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable6", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss2B", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ7", "quantity": 1, "chance": 0.016, "questLink": "N/A"},
                    <ItemDropModel>{"item": "MidnightCookie", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolEfauntA", "quantity": 1, "chance": 0.003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats2", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EfauntDrop1", "quantity": 3, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EfauntDrop2", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss2C", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ15", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "MidnightCookie", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolEfauntA", "quantity": 1, "chance": 0.018, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats2", "quantity": 1, "chance": 0.015, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EfauntDrop1", "quantity": 12, "chance": 0.9, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EfauntDrop2", "quantity": 4, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentCape4", "quantity": 1, "chance": 0.0007, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("EfauntArm", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ3", "quantity": 1, "chance": 5e-07, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("sheep", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 180, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowA1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE0", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues16", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB5", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("flake", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 190, "chance": 0.46, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowA2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE1", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB7", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowA2a", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("stache", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 205, "chance": 0.43, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowA3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE2", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotGr3", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues17", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ram", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 520, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowA4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE14", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentRings23", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats11", "quantity": 1, "chance": 1.5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.0034, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("bloque", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 240, "chance": 0.41, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowB1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE3", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues19", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodPotMana3", "quantity": 1, "chance": 0.0025, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mamoth", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 260, "chance": 0.39, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowB2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE4", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowB2a", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvBag110", "quantity": 1, "chance": 8e-06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest63", "quantity": 1, "chance": 1, "questLink": "Shuvelle5"},
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0027, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("snowball", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 285, "chance": 0.37, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowB5", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE5", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB10", "quantity": 1, "chance": 2.5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth10", "quantity": 1, "chance": 0.009, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest63", "quantity": 1, "chance": 1, "questLink": "Shuvelle6"},
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0029, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("penguin", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 310, "chance": 0.36, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowB3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE6", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues16", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("thermostat", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 340, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowB4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE7", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampB12", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest63", "quantity": 1, "chance": 1, "questLink": "Shuvelle7"},
                    <RecipeDropModel>{
                        "item": "SmithingRecipes4",
                        "quantity": 54,
                        "chance": 8e-07,
                        "questLink": "(Enter World 4)"
                    },
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 0.0033, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("glass", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 370, "chance": 0.34, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowC1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE8", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues17", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("snakeB", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 400, "chance": 0.32, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowC2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE9", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentStatues19", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("speaker", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 440, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowC3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE10", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodHealth9", "quantity": 1, "chance": 0.007, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.003, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("eye", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 490, "chance": 0.28, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowC4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE11", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowC4a", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("skele", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 100, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE12", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 0.01, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("skele2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 800, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowC5", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest78", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsE13", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 0.005, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss3A", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ8", "quantity": 1, "chance": 0.007, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolChizoarA", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant24", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Chiz0", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable14", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss3B", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ9", "quantity": 1, "chance": 0.004, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolChizoarA", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant24", "quantity": 1, "chance": 0.0032, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Chiz0", "quantity": 3, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Chiz1", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss3C", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ16", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolChizoarA", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant24", "quantity": 1, "chance": 0.014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentCape5", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Chiz0", "quantity": 7, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Chiz1", "quantity": 2, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ2", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mini3a", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ12", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "WorshipSkull8", "quantity": 1, "chance": 0.009, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolSlush", "quantity": 1, "chance": 0.004, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key3", "quantity": 2, "chance": 0.8, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes3", "quantity": 20, "chance": 0.06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 0.5, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss4A", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1000000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ10", "quantity": 1, "chance": 0.004, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolTroll", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "TrollPart", "quantity": 1, "chance": 0.13, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss4B", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 5000000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ11", "quantity": 1, "chance": 0.002, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolTroll", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "TrollPart", "quantity": 2, "chance": 0.3, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss4C", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 20000000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ17", "quantity": 1, "chance": 0.003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolTroll", "quantity": 1, "chance": 0.007, "questLink": "N/A"},
                    <ItemDropModel>{"item": "TrollPart", "quantity": 4, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentCape6", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneZ2", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mini4a", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ13", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes3", "quantity": 21, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA3b", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PetEgg", "quantity": 1, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Ladle", "quantity": 3, "chance": 1, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes4", "quantity": 56, "chance": 0.008, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 0.5, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("mushP", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 550, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyA1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentShoes30", "quantity": 1, "chance": 6e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG1", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4a2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 630, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyA2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyA2b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Line12", "quantity": 1, "chance": 2.2e-06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvStorage22", "quantity": 1, "chance": 8e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG2", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4a3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 730, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyA3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentShoes32", "quantity": 1, "chance": 6e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG3", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("demonP", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 860, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyA4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentRings24", "quantity": 1, "chance": 4e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG4", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 0.0034, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4b2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1050, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyB1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Weight3", "quantity": 1, "chance": 1.9e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG6", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0027, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4b1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1300, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyB2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA29", "quantity": 1, "chance": 3.8e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG5", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4b3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1600, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyB3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvStorageS", "quantity": 1, "chance": 3.8e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG7", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats13", "quantity": 1, "chance": 1.5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0029, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4b4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 2000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyB4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentRings25", "quantity": 1, "chance": 4e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG8", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4b5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 2500, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyB5", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvStorage23", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG9", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 0.0033, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4c1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 3100, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyC1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyC1b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG10", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4c2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 3500, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyC2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG11", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes4", "quantity": 55, "chance": 3e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4c3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 4500, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyC3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Line3", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG12", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.003, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w4c4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyC4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 6.667e-05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsG13", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 0.0032, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5a1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaA1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaA1b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 4, "chance": 2e-08, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH1", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5a2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 7000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaA2", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 20, "chance": 1e-05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH2", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampC16", "quantity": 1, "chance": 3e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5a3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 8500, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaA3", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH3", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 21, "chance": 4e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5a4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 10000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaA4", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 0, "chance": 1e-06, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH4", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvStorageC", "quantity": 1, "chance": 1.01e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0034, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5a5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 12500, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaA5", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaA5b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 1, "chance": 6e-07, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH5", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.0037, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5b1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 15000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaB1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH6", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 2, "chance": 4e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5b2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 17000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaB2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH7", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 3, "chance": 2e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5b3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 19000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaB3", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaB3b", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH8", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 5, "chance": 1e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0029, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5b4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 22000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaB4", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH9", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 6, "chance": 1e-06, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats12", "quantity": 1, "chance": 1.5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5b5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 25000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaB5", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH10", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 7, "chance": 1e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0033, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5b6", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 29000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaB6", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key5", "quantity": 1, "chance": 1.33333e-05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH11", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes5", "quantity": 22, "chance": 5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5c1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 36000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaC1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key5", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH12", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable27", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w5c2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 50000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LavaC2", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key5", "quantity": 1, "chance": 4e-05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsH13", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StampA37", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable27", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss5A", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ18", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolKruk", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA6", "quantity": 3, "chance": 0.05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable27", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss5B", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 5000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart2", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 3.5e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolKruk", "quantity": 1, "chance": 0.00022, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT6", "quantity": 2, "chance": 0.05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ19", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 2, "chance": 1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable27", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss5C", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 20000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart", "quantity": 2, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart2", "quantity": 1, "chance": 0.08, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 0.0004, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ObolKruk", "quantity": 1, "chance": 0.0014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW7", "quantity": 2, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneHelm7", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ20", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentCape13", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 2, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("riftAll", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("rift1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("rift2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("rift3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("rift4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("rift5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 6000, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest74", "quantity": 1, "chance": 1e-09, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6a1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 65000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiA1", "quantity": 1, "chance": 0.16, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI1", "quantity": 1, "chance": 2.5e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 4, "chance": 2e-08, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable29", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6a2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 72000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiA2", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiA2b", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 5, "chance": 6e-07, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI2", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable29", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6a3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 80000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiA3", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI3", "quantity": 1, "chance": 1.5e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 6, "chance": 5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable29", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6a4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 89000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiA4", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI4", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 7, "chance": 4e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable29", "quantity": 1, "chance": 0.0034, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6a5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 98500, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiA5", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                    <ItemDropModel>{"item": "InvStorageD", "quantity": 1, "chance": 5e-07, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI5", "quantity": 1, "chance": 8e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable29", "quantity": 1, "chance": 0.0037, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6b1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 130000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiB1", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI6", "quantity": 1, "chance": 6e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable30", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6b2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 145000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiB2", "quantity": 1, "chance": 0.14, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiB2b", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 28, "chance": 5e-09, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI7", "quantity": 1, "chance": 5e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable30", "quantity": 1, "chance": 0.0025, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6b3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 160000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiB3", "quantity": 1, "chance": 0.13, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI8", "quantity": 1, "chance": 3e-06, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 27, "chance": 3.4e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable30", "quantity": 1, "chance": 0.0029, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6b4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 175000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiB4", "quantity": 1, "chance": 0.13, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI9", "quantity": 1, "chance": 2e-06, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 26, "chance": 2.5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable30", "quantity": 1, "chance": 0.0031, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6c1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 200000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiC1", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI10", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 25, "chance": 2.5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable31", "quantity": 1, "chance": 0.0033, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6c2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 230000, "chance": 0.5, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 29, "chance": 2.5e-07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiC2", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI11", "quantity": 1, "chance": 8e-07, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 30, "chance": 2.5e-07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Line9", "quantity": 1, "chance": 9.999e-08, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 31, "chance": 2.5e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable31", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6d1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 350000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiD1", "quantity": 1, "chance": 0.11, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI12", "quantity": 1, "chance": 6e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable32", "quantity": 1, "chance": 0.0028, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6d2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 400000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiD2", "quantity": 1, "chance": 0.11, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI13", "quantity": 1, "chance": 5e-07, "questLink": "N/A"},
                    <RecipeDropModel>{"item": "SmithingRecipes6", "quantity": 24, "chance": 1e-07, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable32", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("w6d3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 500000, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SpiD3", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsI14", "quantity": 1, "chance": 4e-07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Line14", "quantity": 1, "chance": 3.3e-09, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable32", "quantity": 1, "chance": 0.0035, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss6A", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsZ18", "quantity": 1, "chance": 0.0008, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 1e-05, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss6B", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 5000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart2", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 3.5e-05, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Boss6C", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 20000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart", "quantity": 2, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "KrukPart2", "quantity": 1, "chance": 0.08, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPendant29", "quantity": 1, "chance": 0.0004, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestA1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 100, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW1", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA1", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "OakTree", "quantity": 40, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Copper", "quantity": 30, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "CopperBar", "quantity": 20, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key1", "quantity": 1, "chance": 0.04, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestB1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 400, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats17", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW2", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA2", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG4", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Iron", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "CopperBar", "quantity": 50, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key1", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "JungleTree", "quantity": 15, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "BirchTree", "quantity": 25, "chance": 0.1, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable2", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestC1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1250, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.8, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG1", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "IronBar", "quantity": 15, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Gold", "quantity": 20, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ToiletTree", "quantity": 50, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key1", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StumpTree", "quantity": 50, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentShirts12", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable3", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestD1", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 1, "questLink": "N/A"}]
            }),
        new EnemyTableBase("ChestA2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 1000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW2", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA2", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Fish1", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Fish2", "quantity": 50, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Bug1", "quantity": 65, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Gold", "quantity": 75, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key2", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GoldBar", "quantity": 20, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable6", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestB2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 4000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats18", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW3", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA3", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Fish3", "quantity": 100, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Bug3", "quantity": 125, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key2", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG2", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Plat", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GoldBar", "quantity": 60, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PalmTree", "quantity": 100, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable7", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestC2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 10000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG3", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PlatBar", "quantity": 20, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Dementia", "quantity": 80, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Fish4", "quantity": 150, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Bug4", "quantity": 169, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPants4", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key2", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable8", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestD2", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 1, "questLink": "N/A"}]
            }),
        new EnemyTableBase("ChestA3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 10000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW3", "quantity": 1, "chance": 0.025, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SnowA2a", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA3", "quantity": 1, "chance": 0.09, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul1", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter1", "quantity": 65, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PlatBar", "quantity": 60, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key3", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PlatBar", "quantity": 20, "chance": 0.2, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable14", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestB3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 40000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.23, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats28", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW3", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA3", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter2", "quantity": 350, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Bug5", "quantity": 150, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key3", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG5", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Dementia", "quantity": 100, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "SaharanFoal", "quantity": 100, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable15", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestC3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 100000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.45, "questLink": "N/A"},
                    <ItemDropModel>{"item": "DementiaBar", "quantity": 80, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul2", "quantity": 400, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Void", "quantity": 120, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Bug6", "quantity": 150, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentPants5", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key3", "quantity": 1, "chance": 0.18, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG6", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable16", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestD3", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 1, "questLink": "N/A"}]
            }),
        new EnemyTableBase("ChestA4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 8000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.12, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW4", "quantity": 1, "chance": 0.015, "questLink": "N/A"},
                    <ItemDropModel>{"item": "GalaxyA2b", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA4", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul1", "quantity": 50, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter6", "quantity": 200, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "VoidBar", "quantity": 100, "chance": 0.35, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 0.006, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable19", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestB4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 30000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.23, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneW4", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneA4", "quantity": 1, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter8", "quantity": 600, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Bug7", "quantity": 1500, "chance": 0.4, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 0.012, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG7", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Lustre", "quantity": 1000, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "AlienTree", "quantity": 750, "chance": 0.5, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable20", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestC4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 60000000, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.45, "questLink": "N/A"},
                    <ItemDropModel>{"item": "LustreBar", "quantity": 150, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Starfire", "quantity": 2000, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Bug8", "quantity": 1500, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Key4", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodG7", "quantity": 2, "chance": 0.025, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable21", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ChestD4", <EnemyTableModel>{
                "drops": [<CoinDropModel>{"item": "COIN", "quantity": 5000, "chance": 1, "questLink": "N/A"}]
            }),
        new EnemyTableBase("GiantMobzz69", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable13", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ghost", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 10, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest30", "quantity": 1, "chance": 0.15, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent1", "quantity": 2, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent2", "quantity": 2, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent3", "quantity": 2, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent4", "quantity": 2, "chance": 0.3, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("xmasEvent", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 10, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest30", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent1", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent2", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent3", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent4", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("xmasEvent2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 10, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest30", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent1", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent2", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent3", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent4", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("xmasEvent3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 10, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY0", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest30", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent1", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent2", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent3", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent4", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("slimeR", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY3", "quantity": 1, "chance": 0.085, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent5", "quantity": 5, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent6", "quantity": 5, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent7", "quantity": 5, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent8", "quantity": 5, "chance": 0.25, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("loveEvent", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY3", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest40", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent5", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent6", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent7", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent8", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("loveEvent2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY3", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest40", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent5", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent6", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent7", "quantity": 2, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "FoodEvent8", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("loveEvent3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY3", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentCape8", "quantity": 1, "chance": 0.001429, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentCape9", "quantity": 1, "chance": 0.001429, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentCape10", "quantity": 1, "chance": 0.001429, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("sheepB", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY6", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy1", "quantity": 3, "chance": 0.6, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy2", "quantity": 3, "chance": 0.15, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy4", "quantity": 2, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneTe", "quantity": 2, "chance": 0.07, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneAe", "quantity": 2, "chance": 0.08, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneWe", "quantity": 2, "chance": 0.04, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("snakeY", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY7", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy1", "quantity": 3, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy2", "quantity": 3, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneTe", "quantity": 2, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneAe", "quantity": 2, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneWe", "quantity": 2, "chance": 0.02, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("EasterEvent1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY6", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest42", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneTe", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneAe", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneWe", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("EasterEvent2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY6", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.3, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest42", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest44", "quantity": 1, "chance": 0.13, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneTe", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneAe", "quantity": 3, "chance": 0.25, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneWe", "quantity": 2, "chance": 0.25, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("crabcakeB", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY10", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT1eb", "quantity": 3, "chance": 0.012, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneAeB", "quantity": 3, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneWeb", "quantity": 2, "chance": 0.01, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("shovelY", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY13", "quantity": 1, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT1eb", "quantity": 3, "chance": 0.012, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneAeB", "quantity": 3, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneWeb", "quantity": 2, "chance": 0.01, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SummerEvent1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY11", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest49", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest50", "quantity": 1, "chance": 0.13, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SummerEvent2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY2", "quantity": 1, "chance": 0.05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.5, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy1", "quantity": 1, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy2", "quantity": 3, "chance": 0.01, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneWeb", "quantity": 1, "chance": 0.02, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneT1eb", "quantity": 3, "chance": 0.03, "questLink": "N/A"},
                    <ItemDropModel>{"item": "StoneAeB", "quantity": 3, "chance": 0.04, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest50", "quantity": 1, "chance": 0.1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("springEvent1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY2", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Quest71", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "CardPack6", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("springEvent2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY2", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy1", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats38", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats32", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats56", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ClassSwap", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ResetBox", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ResetCompletedS", "quantity": 1, "chance": 0.001, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("fallEvent1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 69, "chance": 0.5, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsY2", "quantity": 1, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "PremiumGem", "quantity": 1, "chance": 0.2, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Timecandy8", "quantity": 1, "chance": 0.1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats85", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats86", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats87", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats88", "quantity": 1, "chance": 0.001, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats31", "quantity": 1, "chance": 0.0007, "questLink": "N/A"},
                    <ItemDropModel>{"item": "EquipmentHats32", "quantity": 1, "chance": 0.0007, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Copper", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC1", "quantity": 1, "chance": 0.0002, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.0065, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Iron", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC2", "quantity": 1, "chance": 0.00013, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.007, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Gold", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC3", "quantity": 1, "chance": 0.00011, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.0075, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Plat", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD2", "quantity": 1, "chance": 8e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.0077, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Dementia", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD1", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 1, "chance": 0.0082, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Void", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD3", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.009, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Lustre", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD4", "quantity": 1, "chance": 6e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.0095, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Starfire", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF16", "quantity": 1, "chance": 3e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.011, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Dreadlo", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF29", "quantity": 1, "chance": 3e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.013, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Marble", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF29", "quantity": 1, "chance": 1e-08, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.014, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Godshard", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF39", "quantity": 1, "chance": 2e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable4", "quantity": 2, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("OakTree", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC4", "quantity": 1, "chance": 0.0004, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.008, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BirchTree", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC5", "quantity": 1, "chance": 0.00029, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.0085, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("JungleTree", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC6", "quantity": 1, "chance": 0.00021, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.009, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ForestTree", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC7", "quantity": 1, "chance": 0.00017, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.0095, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("StumpTree", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD6", "quantity": 1, "chance": 0.00013, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.0102, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("ToiletTree", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD5", "quantity": 1, "chance": 0.00012, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable5", "quantity": 1, "chance": 0.0106, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("PalmTree", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD7", "quantity": 1, "chance": 0.00011, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable11", "quantity": 2, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SaharanFoal", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD8", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable17", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Tree7", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF2", "quantity": 1, "chance": 0.0001, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable17", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("AlienTree", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF13", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable22", "quantity": 2, "chance": 0.00815, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Tree8", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF12", "quantity": 1, "chance": 4e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable22", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Tree9", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF24", "quantity": 1, "chance": 1e-05, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Leaf5", "quantity": 1, "chance": 0.0049, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Tree10", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF25", "quantity": 1, "chance": 5e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable28", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Tree11", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF25", "quantity": 1, "chance": 1e-08, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable28", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Tree12", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF25", "quantity": 1, "chance": 1e-08, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable28", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Tree13", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF25", "quantity": 1, "chance": 1e-08, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable28", "quantity": 1, "chance": 0.0089, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BirchTree2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BirchTree3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("FishSmall", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("FishMed", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("FishBig", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("FishEquinox", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish6", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish7", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish8", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish9", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish10", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish11", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish12", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Fish13", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable9", "quantity": 1, "chance": 0.012, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest6", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest7", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest8", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest9", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest10", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest11", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest12", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("BugNest13", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Grasslands2", "quantity": 2, "chance": 0, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC11", "quantity": 1, "chance": 0.00042, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable12", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC12", "quantity": 1, "chance": 0.0003, "questLink": "N/A"},
                    <ItemDropModel>{"item": "ButterBar", "quantity": 1, "chance": 0.01, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable12", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD10", "quantity": 1, "chance": 0.00028, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable12", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable12", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF8", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable18", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug6", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF9", "quantity": 1, "chance": 0.00025, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable18", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug7", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF14", "quantity": 1, "chance": 5e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable23", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug8", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF15", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable23", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug9", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF26", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable25", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug10", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF27", "quantity": 1, "chance": 2e-05, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug11", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF27", "quantity": 1, "chance": 1e-08, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable26", "quantity": 1, "chance": 1e-08, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug12", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF37", "quantity": 1, "chance": 5e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable29", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("Bug13", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsF38", "quantity": 1, "chance": 1e-06, "questLink": "N/A"},
                    <SubTableDropModel>{"item": "DropTable30", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SoulCard1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC11", "quantity": 1, "chance": 0.00022, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul1", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul1", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SoulCard2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC12", "quantity": 1, "chance": 0.00018, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul2", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul2", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SoulCard3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD10", "quantity": 1, "chance": 0.00016, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul3", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul3", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul3", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul3", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SoulCard4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul4", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul4", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul4", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul4", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SoulCard5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul5", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul5", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul5", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul5", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SoulCard6", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul6", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul6", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul6", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul6", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("SoulCard7", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul7", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul7", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul7", "quantity": 1, "chance": 1, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Soul7", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard1", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC11", "quantity": 1, "chance": 0.00022, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter1", "quantity": 1, "chance": 1, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard2", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsC12", "quantity": 1, "chance": 0.00018, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter2", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard3", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD10", "quantity": 1, "chance": 0.00016, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter3", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard4", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter4", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard5", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter5", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard6", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter6", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard7", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter7", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard8", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter8", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard9", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD9", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter9", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            }),
        new EnemyTableBase("CritterCard10", <EnemyTableModel>{
                "drops": [
                    <CoinDropModel>{"item": "COIN", "quantity": 0, "chance": 0, "questLink": "N/A"},
                    <CardDropModel>{"item": "CardsD10", "quantity": 1, "chance": 0.00014, "questLink": "N/A"},
                    <ItemDropModel>{"item": "Critter10", "quantity": 1, "chance": 0.015, "questLink": "N/A"}
                ]
            })    
]
}
