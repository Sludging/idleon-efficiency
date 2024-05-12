import { SubTableModel } from '../model/subTableModel';
import { SubTablesModel } from '../model/subTablesModel';

export class SubTablesBase { constructor(public id: string, public data: SubTablesModel) { } }



export const initSubTableRepo = () => {
    return [    
        new SubTablesBase("DropTable1", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal0", "chance": 0.6, "quantity": 1},
                    <SubTableModel>{"name": "mushG", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "mushR", "chance": 0.0052, "quantity": 1},
                    <SubTableModel>{"name": "frogG", "chance": 0.0038, "quantity": 1},
                    <SubTableModel>{"name": "beanG", "chance": 0.0045, "quantity": 1},
                    <SubTableModel>{"name": "babayaga", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "GrasslandsBoss", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "wolfA", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "wolfB", "chance": 1, "quantity": 4},
                    <SubTableModel>{"name": "ChestA1", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable2", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal0", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "slimeG", "chance": 0.004, "quantity": 1},
                    <SubTableModel>{"name": "snakeG", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "carrotO", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "babayaga", "chance": 1, "quantity": 1},
                    <SubTableModel>{"name": "GrasslandsBoss", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "wolfA", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "wolfB", "chance": 1, "quantity": 4},
                    <SubTableModel>{"name": "ChestB1", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable3", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal0", "chance": 0.4, "quantity": 1},
                    <SubTableModel>{"name": "goblinG", "chance": 0.004, "quantity": 1},
                    <SubTableModel>{"name": "plank", "chance": 0.0045, "quantity": 1},
                    <SubTableModel>{"name": "frogBIG", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "babayaga", "chance": 1, "quantity": 0.5},
                    <SubTableModel>{"name": "poopBig", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "GrasslandsBoss", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "wolfA", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "wolfB", "chance": 1, "quantity": 4},
                    <SubTableModel>{"name": "wolfC", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestC1", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable4", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal0", "chance": 0.6, "quantity": 1},
                    <SubTableModel>{"name": "Copper", "chance": 0.0065, "quantity": 1},
                    <SubTableModel>{"name": "Iron", "chance": 0.007, "quantity": 1},
                    <SubTableModel>{"name": "Gold", "chance": 0.0075, "quantity": 1},
                    <SubTableModel>{"name": "Plat", "chance": 0.0077, "quantity": 1},
                    <SubTableModel>{"name": "Dementia", "chance": 0.0082, "quantity": 1},
                    <SubTableModel>{"name": "Void", "chance": 0.009, "quantity": 2},
                    <SubTableModel>{"name": "Lustre", "chance": 0.0095, "quantity": 2},
                    <SubTableModel>{"name": "Starfire", "chance": 0.011, "quantity": 2},
                    <SubTableModel>{"name": "Dreadlo", "chance": 0.013, "quantity": 2},
                    <SubTableModel>{"name": "Marble", "chance": 0.014, "quantity": 2},
                    <SubTableModel>{"name": "Godshard", "chance": 0.015, "quantity": 2}
                ]
            }),
        new SubTablesBase("DropTable5", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal0", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "OakTree", "chance": 0.008, "quantity": 1},
                    <SubTableModel>{"name": "BirchTree", "chance": 0.0085, "quantity": 1},
                    <SubTableModel>{"name": "JungleTree", "chance": 0.009, "quantity": 1},
                    <SubTableModel>{"name": "ForestTree", "chance": 0.0095, "quantity": 1},
                    <SubTableModel>{"name": "StumpTree", "chance": 0.0102, "quantity": 1},
                    <SubTableModel>{"name": "ToiletTree", "chance": 0.0106, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable5b", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal0", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Crystal1", "chance": 1, "quantity": 3},
                    <SubTableModel>{"name": "Crystal2", "chance": 1, "quantity": 3},
                    <SubTableModel>{"name": "mushW", "chance": 0.002, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable6", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal1", "chance": 0.6, "quantity": 1},
                    <SubTableModel>{"name": "jarSand", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "mimicA", "chance": 0.0032, "quantity": 1},
                    <SubTableModel>{"name": "crabcake", "chance": 0.0036, "quantity": 1},
                    <SubTableModel>{"name": "babaHour", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "Boss2A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestA2", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable7", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal1", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "shovelR", "chance": 0.0032, "quantity": 1},
                    <SubTableModel>{"name": "coconut", "chance": 0.0032, "quantity": 1},
                    <SubTableModel>{"name": "sandcastle", "chance": 0.0035, "quantity": 1},
                    <SubTableModel>{"name": "pincermin", "chance": 0.0037, "quantity": 1},
                    <SubTableModel>{"name": "potato", "chance": 0.0039, "quantity": 1},
                    <SubTableModel>{"name": "Boss2A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss2B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestB2", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable8", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal1", "chance": 0.4, "quantity": 1},
                    <SubTableModel>{"name": "steak", "chance": 0.0032, "quantity": 1},
                    <SubTableModel>{"name": "moonman", "chance": 0.0035, "quantity": 1},
                    <SubTableModel>{"name": "sandgiant", "chance": 0.0037, "quantity": 1},
                    <SubTableModel>{"name": "snailZ", "chance": 0.0039, "quantity": 1},
                    <SubTableModel>{"name": "Boss2A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss2B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss2C", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestC2", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable9", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal1", "chance": 0.6, "quantity": 1},
                    <SubTableModel>{"name": "FishSmall", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "FishMed", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "FishBig", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "FishEquinox", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish1", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish2", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish3", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish4", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish5", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish6", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish7", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish8", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish9", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish10", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish11", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish12", "chance": 0.012, "quantity": 1},
                    <SubTableModel>{"name": "Fish13", "chance": 0.012, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable11", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal1", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "PalmTree", "chance": 0.015, "quantity": 2}
                ]
            }),
        new SubTablesBase("DropTable14", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal2", "chance": 0.6, "quantity": 1},
                    <SubTableModel>{"name": "sheep", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "flake", "chance": 0.0028, "quantity": 1},
                    <SubTableModel>{"name": "stache", "chance": 0.0031, "quantity": 1},
                    <SubTableModel>{"name": "skele", "chance": 0.01, "quantity": 1},
                    <SubTableModel>{"name": "Boss3A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestA3", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable15", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal2", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "bloque", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "mamoth", "chance": 0.0027, "quantity": 1},
                    <SubTableModel>{"name": "snowball", "chance": 0.0029, "quantity": 1},
                    <SubTableModel>{"name": "penguin", "chance": 0.0031, "quantity": 1},
                    <SubTableModel>{"name": "thermostat", "chance": 0.0033, "quantity": 1},
                    <SubTableModel>{"name": "Boss3A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss3B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestB3", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable16", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal2", "chance": 0.4, "quantity": 1},
                    <SubTableModel>{"name": "ram", "chance": 0.0034, "quantity": 1},
                    <SubTableModel>{"name": "glass", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "snakeB", "chance": 0.0028, "quantity": 1},
                    <SubTableModel>{"name": "speaker", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "eye", "chance": 0.0032, "quantity": 1},
                    <SubTableModel>{"name": "skele2", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "Boss3A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss3B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss3C", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestC3", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable17", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal2", "chance": 0.6, "quantity": 1},
                    <SubTableModel>{"name": "SaharanFoal", "chance": 0.0089, "quantity": 1},
                    <SubTableModel>{"name": "Tree7", "chance": 0.0089, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable18", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal2", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "Bug5", "chance": 0.015, "quantity": 1},
                    <SubTableModel>{"name": "Bug6", "chance": 0.015, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable19", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal3", "chance": 0.6, "quantity": 1},
                    <SubTableModel>{"name": "Boss4A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss4B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss4C", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "mushP", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w4a2", "chance": 0.0028, "quantity": 1},
                    <SubTableModel>{"name": "w4a3", "chance": 0.0031, "quantity": 1},
                    <SubTableModel>{"name": "demonP", "chance": 0.0034, "quantity": 1},
                    <SubTableModel>{"name": "ChestA4", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable20", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal3", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "Boss4A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss4B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss4C", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "w4b2", "chance": 0.0027, "quantity": 1},
                    <SubTableModel>{"name": "w4b1", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w4b3", "chance": 0.0029, "quantity": 1},
                    <SubTableModel>{"name": "w4b4", "chance": 0.0031, "quantity": 1},
                    <SubTableModel>{"name": "w4b5", "chance": 0.0033, "quantity": 1},
                    <SubTableModel>{"name": "ChestB4", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable21", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal3", "chance": 0.4, "quantity": 1},
                    <SubTableModel>{"name": "Boss4A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss4B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss4C", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "w4c1", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w4c2", "chance": 0.0028, "quantity": 1},
                    <SubTableModel>{"name": "w4c3", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "w4c4", "chance": 0.0032, "quantity": 1},
                    <SubTableModel>{"name": "ChestC4", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable22", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal3", "chance": 0.4, "quantity": 1},
                    <SubTableModel>{"name": "AlienTree", "chance": 0.00815, "quantity": 2},
                    <SubTableModel>{"name": "Tree8", "chance": 0.0089, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable25", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal4", "chance": 0.3, "quantity": 1},
                    <SubTableModel>{"name": "w5a1", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w5a2", "chance": 0.0028, "quantity": 1},
                    <SubTableModel>{"name": "w5a3", "chance": 0.0031, "quantity": 1},
                    <SubTableModel>{"name": "w5a4", "chance": 0.0034, "quantity": 1},
                    <SubTableModel>{"name": "w5a5", "chance": 0.0037, "quantity": 1},
                    <SubTableModel>{"name": "Boss5A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss5B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss5C", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestA5", "chance": 1, "quantity": 1},
                    <SubTableModel>{"name": "Bug9", "chance": 0.015, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable26", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal4", "chance": 0.2, "quantity": 1},
                    <SubTableModel>{"name": "w5b1", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w5b2", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w5b3", "chance": 0.0029, "quantity": 1},
                    <SubTableModel>{"name": "w5b4", "chance": 0.0031, "quantity": 1},
                    <SubTableModel>{"name": "w5b5", "chance": 0.0033, "quantity": 1},
                    <SubTableModel>{"name": "w5b6", "chance": 0.0035, "quantity": 1},
                    <SubTableModel>{"name": "Boss5A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss5B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestB5", "chance": 1, "quantity": 1},
                    <SubTableModel>{"name": "Bug10", "chance": 0.015, "quantity": 1},
                    <SubTableModel>{"name": "Bug11", "chance": 1e-08, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable27", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal4", "chance": 0.17, "quantity": 1},
                    <SubTableModel>{"name": "w5c1", "chance": 0.0028, "quantity": 1},
                    <SubTableModel>{"name": "w5c2", "chance": 0.0035, "quantity": 1},
                    <SubTableModel>{"name": "Boss5A", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "Boss5B", "chance": 1, "quantity": 2},
                    <SubTableModel>{"name": "ChestC5", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable28", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal4", "chance": 0.17, "quantity": 1},
                    <SubTableModel>{"name": "Tree10", "chance": 0.0089, "quantity": 1},
                    <SubTableModel>{"name": "Tree11", "chance": 0.0089, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable29", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal5", "chance": 0.3, "quantity": 1},
                    <SubTableModel>{"name": "w6a1", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w6a2", "chance": 0.0028, "quantity": 1},
                    <SubTableModel>{"name": "w6a3", "chance": 0.0031, "quantity": 1},
                    <SubTableModel>{"name": "w6a4", "chance": 0.0034, "quantity": 1},
                    <SubTableModel>{"name": "w6a5", "chance": 0.0037, "quantity": 1},
                    <SubTableModel>{"name": "ChestA6", "chance": 1, "quantity": 1},
                    <SubTableModel>{"name": "ChestB6", "chance": 1, "quantity": 1},
                    <SubTableModel>{"name": "ChestC6", "chance": 1, "quantity": 1},
                    <SubTableModel>{"name": "Bug12", "chance": 0.015, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable30", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal5", "chance": 0.2, "quantity": 1},
                    <SubTableModel>{"name": "w6b1", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w6b2", "chance": 0.0025, "quantity": 1},
                    <SubTableModel>{"name": "w6b3", "chance": 0.0029, "quantity": 1},
                    <SubTableModel>{"name": "w6b4", "chance": 0.0031, "quantity": 1},
                    <SubTableModel>{"name": "Bug13", "chance": 0.015, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable31", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal5", "chance": 0.17, "quantity": 1},
                    <SubTableModel>{"name": "w6c1", "chance": 0.0033, "quantity": 1},
                    <SubTableModel>{"name": "w6c2", "chance": 0.0035, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable32", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal5", "chance": 0.17, "quantity": 1},
                    <SubTableModel>{"name": "w6d1", "chance": 0.0028, "quantity": 1},
                    <SubTableModel>{"name": "w6d2", "chance": 0.0035, "quantity": 1},
                    <SubTableModel>{"name": "w6d3", "chance": 0.0035, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable33", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal5", "chance": 0.17, "quantity": 1},
                    <SubTableModel>{"name": "Tree12", "chance": 0.0089, "quantity": 1},
                    <SubTableModel>{"name": "Tree13", "chance": 0.0089, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable3c", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "mushW", "chance": 0.007, "quantity": 1},
                    <SubTableModel>{"name": "branch", "chance": 0.0057, "quantity": 1},
                    <SubTableModel>{"name": "acorn", "chance": 0.0065, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable3b", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "poopSmall", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "ratB", "chance": 0.006, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable13", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "babaHour", "chance": 0.4, "quantity": 1},
                    <SubTableModel>{"name": "babaMummy", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "mini3a", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "mini4a", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "mini5a", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "mini6a", "chance": 0.5, "quantity": 1},
                    <SubTableModel>{"name": "GiantMobzz69", "chance": 1, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable12", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Bug1", "chance": 0.015, "quantity": 1},
                    <SubTableModel>{"name": "Bug2", "chance": 0.015, "quantity": 1},
                    <SubTableModel>{"name": "Bug3", "chance": 0.015, "quantity": 1},
                    <SubTableModel>{"name": "Bug4", "chance": 0.015, "quantity": 1}
                ]
            }),
        new SubTablesBase("DropTable23", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Bug7", "chance": 0.015, "quantity": 1},
                    <SubTableModel>{"name": "Bug8", "chance": 0.015, "quantity": 1}
                ]
            }),
        new SubTablesBase("SuperDropTable1", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal0", "chance": 0.0024, "quantity": 1},
                    <SubTableModel>{"name": "mushG", "chance": 1.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "mushR", "chance": 2.08e-05, "quantity": 1},
                    <SubTableModel>{"name": "frogG", "chance": 1.52e-05, "quantity": 1},
                    <SubTableModel>{"name": "beanG", "chance": 1.8e-05, "quantity": 1},
                    <SubTableModel>{"name": "babayaga", "chance": 0.004, "quantity": 2},
                    <SubTableModel>{"name": "GrasslandsBoss", "chance": 0.004, "quantity": 2},
                    <SubTableModel>{"name": "wolfA", "chance": 0.004, "quantity": 2},
                    <SubTableModel>{"name": "wolfB", "chance": 0.004, "quantity": 4},
                    <SubTableModel>{"name": "ChestA1", "chance": 0.004, "quantity": 1},
                    <SubTableModel>{"name": "Crystal0", "chance": 0.00225, "quantity": 1},
                    <SubTableModel>{"name": "slimeG", "chance": 1.8e-05, "quantity": 1},
                    <SubTableModel>{"name": "snakeG", "chance": 2.25e-05, "quantity": 1},
                    <SubTableModel>{"name": "carrotO", "chance": 2.7e-05, "quantity": 1},
                    <SubTableModel>{"name": "babayaga", "chance": 0.0045, "quantity": 1},
                    <SubTableModel>{"name": "GrasslandsBoss", "chance": 0.0045, "quantity": 2},
                    <SubTableModel>{"name": "wolfA", "chance": 0.0045, "quantity": 2},
                    <SubTableModel>{"name": "wolfB", "chance": 0.0045, "quantity": 4},
                    <SubTableModel>{"name": "ChestB1", "chance": 0.0045, "quantity": 1},
                    <SubTableModel>{"name": "Crystal0", "chance": 0.002, "quantity": 1},
                    <SubTableModel>{"name": "goblinG", "chance": 2e-05, "quantity": 1},
                    <SubTableModel>{"name": "plank", "chance": 2.25e-05, "quantity": 1},
                    <SubTableModel>{"name": "frogBIG", "chance": 2.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "babayaga", "chance": 0.005, "quantity": 0.5},
                    <SubTableModel>{"name": "poopBig", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "GrasslandsBoss", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "wolfA", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "wolfB", "chance": 0.005, "quantity": 4},
                    <SubTableModel>{"name": "wolfC", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "ChestC1", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "poopSmall", "chance": 3.3e-05, "quantity": 1},
                    <SubTableModel>{"name": "ratB", "chance": 3.3e-05, "quantity": 1},
                    <SubTableModel>{"name": "mushW", "chance": 3.85e-05, "quantity": 1},
                    <SubTableModel>{"name": "branch", "chance": 3.135e-05, "quantity": 1},
                    <SubTableModel>{"name": "acorn", "chance": 3.575e-05, "quantity": 1},
                    <SubTableModel>{"name": "Crystal0", "chance": 0.0036, "quantity": 1},
                    <SubTableModel>{"name": "Copper", "chance": 3.9e-05, "quantity": 1},
                    <SubTableModel>{"name": "Iron", "chance": 4.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Gold", "chance": 4.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "Plat", "chance": 4.62e-05, "quantity": 1},
                    <SubTableModel>{"name": "Dementia", "chance": 4.92e-05, "quantity": 1},
                    <SubTableModel>{"name": "Void", "chance": 5.4e-05, "quantity": 2},
                    <SubTableModel>{"name": "Lustre", "chance": 5.7e-05, "quantity": 2},
                    <SubTableModel>{"name": "Starfire", "chance": 6.6e-05, "quantity": 2},
                    <SubTableModel>{"name": "Dreadlo", "chance": 7.8e-05, "quantity": 2},
                    <SubTableModel>{"name": "Marble", "chance": 8.4e-05, "quantity": 2},
                    <SubTableModel>{"name": "Godshard", "chance": 9e-05, "quantity": 2},
                    <SubTableModel>{"name": "Crystal0", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "OakTree", "chance": 4.8e-05, "quantity": 1},
                    <SubTableModel>{"name": "BirchTree", "chance": 5.1e-05, "quantity": 1},
                    <SubTableModel>{"name": "JungleTree", "chance": 5.4e-05, "quantity": 1},
                    <SubTableModel>{"name": "ForestTree", "chance": 5.7e-05, "quantity": 1},
                    <SubTableModel>{"name": "StumpTree", "chance": 6.12e-05, "quantity": 1},
                    <SubTableModel>{"name": "ToiletTree", "chance": 6.36e-05, "quantity": 1}
                ]
            }),
        new SubTablesBase("SuperDropTable2", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal1", "chance": 0.0036, "quantity": 1},
                    <SubTableModel>{"name": "jarSand", "chance": 1.8e-05, "quantity": 1},
                    <SubTableModel>{"name": "mimicA", "chance": 1.92e-05, "quantity": 1},
                    <SubTableModel>{"name": "crabcake", "chance": 2.16e-05, "quantity": 1},
                    <SubTableModel>{"name": "babaHour", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "Boss2A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "ChestA2", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal1", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "shovelR", "chance": 1.92e-05, "quantity": 1},
                    <SubTableModel>{"name": "coconut", "chance": 1.92e-05, "quantity": 1},
                    <SubTableModel>{"name": "sandcastle", "chance": 2.1e-05, "quantity": 1},
                    <SubTableModel>{"name": "pincermin", "chance": 2.22e-05, "quantity": 1},
                    <SubTableModel>{"name": "potato", "chance": 2.34e-05, "quantity": 1},
                    <SubTableModel>{"name": "Boss2A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss2B", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "ChestB2", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal1", "chance": 0.0024, "quantity": 1},
                    <SubTableModel>{"name": "steak", "chance": 1.92e-05, "quantity": 1},
                    <SubTableModel>{"name": "moonman", "chance": 2.1e-05, "quantity": 1},
                    <SubTableModel>{"name": "sandgiant", "chance": 2.22e-05, "quantity": 1},
                    <SubTableModel>{"name": "snailZ", "chance": 2.34e-05, "quantity": 1},
                    <SubTableModel>{"name": "Boss2A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss2B", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss2C", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "ChestC2", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal1", "chance": 0.0036, "quantity": 1},
                    <SubTableModel>{"name": "FishSmall", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "FishMed", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "FishBig", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "FishEquinox", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish1", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish2", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish3", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish4", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish5", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish6", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish7", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish8", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish9", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish10", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish11", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish12", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Fish13", "chance": 7.2e-05, "quantity": 1},
                    <SubTableModel>{"name": "Crystal1", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "PalmTree", "chance": 9e-05, "quantity": 2},
                    <SubTableModel>{"name": "Bug1", "chance": 9e-05, "quantity": 1},
                    <SubTableModel>{"name": "Bug2", "chance": 9e-05, "quantity": 1},
                    <SubTableModel>{"name": "Bug3", "chance": 9e-05, "quantity": 1},
                    <SubTableModel>{"name": "Bug4", "chance": 9e-05, "quantity": 1}
                ]
            }),
        new SubTablesBase("SuperDropTable3", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal2", "chance": 0.0036, "quantity": 1},
                    <SubTableModel>{"name": "sheep", "chance": 1.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "flake", "chance": 1.68e-05, "quantity": 1},
                    <SubTableModel>{"name": "stache", "chance": 1.86e-05, "quantity": 1},
                    <SubTableModel>{"name": "skele", "chance": 6e-05, "quantity": 1},
                    <SubTableModel>{"name": "Boss3A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "ChestA3", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal2", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "bloque", "chance": 1.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "mamoth", "chance": 1.62e-05, "quantity": 1},
                    <SubTableModel>{"name": "snowball", "chance": 1.74e-05, "quantity": 1},
                    <SubTableModel>{"name": "penguin", "chance": 1.86e-05, "quantity": 1},
                    <SubTableModel>{"name": "thermostat", "chance": 1.98e-05, "quantity": 1},
                    <SubTableModel>{"name": "Boss3A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss3B", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "ChestB3", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal2", "chance": 0.0024, "quantity": 1},
                    <SubTableModel>{"name": "ram", "chance": 2.04e-05, "quantity": 1},
                    <SubTableModel>{"name": "glass", "chance": 1.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "snakeB", "chance": 1.68e-05, "quantity": 1},
                    <SubTableModel>{"name": "speaker", "chance": 1.8e-05, "quantity": 1},
                    <SubTableModel>{"name": "eye", "chance": 1.92e-05, "quantity": 1},
                    <SubTableModel>{"name": "skele2", "chance": 3e-05, "quantity": 1},
                    <SubTableModel>{"name": "Boss3A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss3B", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss3C", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "ChestC3", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal2", "chance": 0.0036, "quantity": 1},
                    <SubTableModel>{"name": "SaharanFoal", "chance": 5.34e-05, "quantity": 1},
                    <SubTableModel>{"name": "Tree7", "chance": 5.34e-05, "quantity": 1},
                    <SubTableModel>{"name": "Crystal2", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "Bug5", "chance": 9e-05, "quantity": 1},
                    <SubTableModel>{"name": "Bug6", "chance": 9e-05, "quantity": 1}
                ]
            }),
        new SubTablesBase("SuperDropTable4", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal3", "chance": 0.0036, "quantity": 1},
                    <SubTableModel>{"name": "Boss4A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss4B", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss4C", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "mushP", "chance": 1.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4a2", "chance": 1.68e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4a3", "chance": 1.86e-05, "quantity": 1},
                    <SubTableModel>{"name": "demonP", "chance": 2.04e-05, "quantity": 1},
                    <SubTableModel>{"name": "ChestA4", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal3", "chance": 0.003, "quantity": 1},
                    <SubTableModel>{"name": "Boss4A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss4B", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss4C", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "w4b2", "chance": 1.62e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4b1", "chance": 1.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4b3", "chance": 1.74e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4b4", "chance": 1.86e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4b5", "chance": 1.98e-05, "quantity": 1},
                    <SubTableModel>{"name": "ChestB4", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal3", "chance": 0.0024, "quantity": 1},
                    <SubTableModel>{"name": "Boss4A", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss4B", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "Boss4C", "chance": 0.006, "quantity": 2},
                    <SubTableModel>{"name": "w4c1", "chance": 1.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4c2", "chance": 1.68e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4c3", "chance": 1.8e-05, "quantity": 1},
                    <SubTableModel>{"name": "w4c4", "chance": 1.92e-05, "quantity": 1},
                    <SubTableModel>{"name": "ChestC4", "chance": 0.006, "quantity": 1},
                    <SubTableModel>{"name": "Crystal3", "chance": 0.0024, "quantity": 1},
                    <SubTableModel>{"name": "AlienTree", "chance": 4.89e-05, "quantity": 2},
                    <SubTableModel>{"name": "Tree8", "chance": 5.34e-05, "quantity": 1},
                    <SubTableModel>{"name": "Bug7", "chance": 9e-05, "quantity": 1},
                    <SubTableModel>{"name": "Bug8", "chance": 9e-05, "quantity": 1}
                ]
            }),
        new SubTablesBase("SuperDropTable5", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal4", "chance": 0.0015, "quantity": 1},
                    <SubTableModel>{"name": "w5a1", "chance": 1.25e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5a2", "chance": 1.4e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5a3", "chance": 1.55e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5a4", "chance": 1.7e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5a5", "chance": 1.85e-05, "quantity": 1},
                    <SubTableModel>{"name": "Boss5A", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "Boss5B", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "Boss5C", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "ChestA5", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "Bug9", "chance": 7.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "Crystal4", "chance": 0.001, "quantity": 1},
                    <SubTableModel>{"name": "w5b1", "chance": 1.25e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5b2", "chance": 1.25e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5b3", "chance": 1.45e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5b4", "chance": 1.55e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5b5", "chance": 1.65e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5b6", "chance": 1.75e-05, "quantity": 1},
                    <SubTableModel>{"name": "Boss5A", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "Boss5B", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "ChestB5", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "Bug10", "chance": 7.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "Bug11", "chance": 5e-11, "quantity": 1},
                    <SubTableModel>{"name": "Crystal4", "chance": 0.00085, "quantity": 1},
                    <SubTableModel>{"name": "w5c1", "chance": 1.4e-05, "quantity": 1},
                    <SubTableModel>{"name": "w5c2", "chance": 1.75e-05, "quantity": 1},
                    <SubTableModel>{"name": "Boss5A", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "Boss5B", "chance": 0.005, "quantity": 2},
                    <SubTableModel>{"name": "ChestC5", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "Crystal4", "chance": 0.00102, "quantity": 1},
                    <SubTableModel>{"name": "Tree10", "chance": 5.34e-05, "quantity": 1},
                    <SubTableModel>{"name": "Tree11", "chance": 5.34e-05, "quantity": 1}
                ]
            }),
        new SubTablesBase("SuperDropTable6", <SubTablesModel>{
                "sources": [
                    <SubTableModel>{"name": "Crystal5", "chance": 0.0015, "quantity": 1},
                    <SubTableModel>{"name": "w6a1", "chance": 1.25e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6a2", "chance": 1.4e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6a3", "chance": 1.55e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6a4", "chance": 1.7e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6a5", "chance": 1.85e-05, "quantity": 1},
                    <SubTableModel>{"name": "ChestA6", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "ChestB6", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "ChestC6", "chance": 0.005, "quantity": 1},
                    <SubTableModel>{"name": "Bug12", "chance": 7.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "Crystal5", "chance": 0.001, "quantity": 1},
                    <SubTableModel>{"name": "w6b1", "chance": 1.25e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6b2", "chance": 1.25e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6b3", "chance": 1.45e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6b4", "chance": 1.55e-05, "quantity": 1},
                    <SubTableModel>{"name": "Bug13", "chance": 7.5e-05, "quantity": 1},
                    <SubTableModel>{"name": "Crystal5", "chance": 0.00085, "quantity": 1},
                    <SubTableModel>{"name": "w6c1", "chance": 1.65e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6c2", "chance": 1.75e-05, "quantity": 1},
                    <SubTableModel>{"name": "Crystal5", "chance": 0.00085, "quantity": 1},
                    <SubTableModel>{"name": "w6d1", "chance": 1.4e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6d2", "chance": 1.75e-05, "quantity": 1},
                    <SubTableModel>{"name": "w6d3", "chance": 1.75e-05, "quantity": 1},
                    <SubTableModel>{"name": "Crystal5", "chance": 0.00102, "quantity": 1},
                    <SubTableModel>{"name": "Tree12", "chance": 5.34e-05, "quantity": 1},
                    <SubTableModel>{"name": "Tree13", "chance": 5.34e-05, "quantity": 1}
                ]
            })    
]
}
