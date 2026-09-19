import { ExoticMarketUpgradeModel } from '../model/exoticMarketUpgradeModel';

export class ExoticMarketUpgradeBase { constructor(public index: number, public data: ExoticMarketUpgradeModel) { } }



export const initExoticMarketRepo = () => {
    return [    
        new ExoticMarketUpgradeBase(0, <ExoticMarketUpgradeModel>{
                "name": "SPROUTLUCK I",
                "description": "}x crop evolution chance",
                "cropId": 3,
                "effect": 500,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(1, <ExoticMarketUpgradeModel>{
                "name": "SPROUTLUCK II",
                "description": "}x crop evolution chance",
                "cropId": 5,
                "effect": 600,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(2, <ExoticMarketUpgradeModel>{
                "name": "SPROUTLUCK III",
                "description": "}x crop evolution chance",
                "cropId": 6,
                "effect": 700,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(3, <ExoticMarketUpgradeModel>{
                "name": "SPROUTLUCK IV",
                "description": "}x crop evolution chance",
                "cropId": 7,
                "effect": 800,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(4, <ExoticMarketUpgradeModel>{
                "name": "GENEOLOGY I",
                "description": "+{% crop evolution chance per Farming LV above 50",
                "cropId": 9,
                "effect": 6,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(5, <ExoticMarketUpgradeModel>{
                "name": "GENEOLOGY II",
                "description": "+{% crop evolution chance per Farming LV above 100",
                "cropId": 11,
                "effect": 12,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(6, <ExoticMarketUpgradeModel>{
                "name": "GENEOLOGY III",
                "description": "+{% crop evolution chance per Farming LV above 150",
                "cropId": 13,
                "effect": 20,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(7, <ExoticMarketUpgradeModel>{
                "name": "GENEOLOGY IV",
                "description": "+{% crop evolution chance per Farming LV above 200",
                "cropId": 15,
                "effect": 28,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(8, <ExoticMarketUpgradeModel>{
                "name": "GENEOLOGY V",
                "description": "+{% crop evolution chance per Farming LV above 250",
                "cropId": 16,
                "effect": 50,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(9, <ExoticMarketUpgradeModel>{
                "name": "STABLEROOT I",
                "description": "+{% Land Rank EXP gain for all plots",
                "cropId": 17,
                "effect": 350,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(10, <ExoticMarketUpgradeModel>{
                "name": "STABLEROOT II",
                "description": "+{% Land Rank EXP gain for all plots",
                "cropId": 18,
                "effect": 250,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(11, <ExoticMarketUpgradeModel>{
                "name": "STABLEROOT III",
                "description": "+{% Land Rank EXP gain for all plots",
                "cropId": 20,
                "effect": 400,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(12, <ExoticMarketUpgradeModel>{
                "name": "VIGOUROOT I",
                "description": "}x Land Rank EXP gain for all plots",
                "cropId": 21,
                "effect": 100,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(13, <ExoticMarketUpgradeModel>{
                "name": "VIGOUROOT II",
                "description": "}x Land Rank EXP gain for all plots",
                "cropId": 23,
                "effect": 130,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(14, <ExoticMarketUpgradeModel>{
                "name": "PLUMP DATABASE",
                "description": "+{% higher bonuses from the Land Rank Database",
                "cropId": 24,
                "effect": 60,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(15, <ExoticMarketUpgradeModel>{
                "name": "DATADIGGING",
                "description": "+$ higher max LV for 5th column of Land Rank Database",
                "cropId": 25,
                "effect": 5,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(16, <ExoticMarketUpgradeModel>{
                "name": "LEGUMIOSO I",
                "description": "+{% Extra Beans from Legumulyte",
                "cropId": 27,
                "effect": 250,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(17, <ExoticMarketUpgradeModel>{
                "name": "LEGUMIOSO II",
                "description": "+{% Extra Beans from Legumulyte",
                "cropId": 29,
                "effect": 350,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(18, <ExoticMarketUpgradeModel>{
                "name": "LEGUMIOSO III",
                "description": "+{% Extra Beans from Legumulyte",
                "cropId": 30,
                "effect": 420,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(19, <ExoticMarketUpgradeModel>{
                "name": "LARGUMES I",
                "description": "}x more Beans from Lugumulyte",
                "cropId": 31,
                "effect": 90,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(20, <ExoticMarketUpgradeModel>{
                "name": "LARGUMES II",
                "description": "}x more Beans from Lugumulyte",
                "cropId": 32,
                "effect": 130,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(21, <ExoticMarketUpgradeModel>{
                "name": "FARMER BRAIN",
                "description": "+{% Farming EXP gain on all characters",
                "cropId": 33,
                "effect": 300,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(22, <ExoticMarketUpgradeModel>{
                "name": "FARMER KNOWHOW",
                "description": "}x Farming EXP gain on all characters",
                "cropId": 34,
                "effect": 120,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(23, <ExoticMarketUpgradeModel>{
                "name": "STALK VALUE I",
                "description": "+{% higher Crop Value max cap",
                "cropId": 36,
                "effect": 50,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(24, <ExoticMarketUpgradeModel>{
                "name": "STALK VALUE II",
                "description": "+{% higher Crop Value max cap",
                "cropId": 37,
                "effect": 70,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(25, <ExoticMarketUpgradeModel>{
                "name": "STALK VALUE III",
                "description": "+{% higher Crop Value max cap",
                "cropId": 38,
                "effect": 120,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(26, <ExoticMarketUpgradeModel>{
                "name": "EVERGROW I",
                "description": "}x Overgrowth Chance for all crops",
                "cropId": 40,
                "effect": 100,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(27, <ExoticMarketUpgradeModel>{
                "name": "EVERGROW II",
                "description": "}x Overgrowth Chance for all crops",
                "cropId": 41,
                "effect": 150,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(28, <ExoticMarketUpgradeModel>{
                "name": "DOUBLE PETAL I",
                "description": "+{% chance for crops to be worth 2x when harvested",
                "cropId": 42,
                "effect": 50,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(29, <ExoticMarketUpgradeModel>{
                "name": "DOUBLE PETAL II",
                "description": "+{% chance for crops to be worth 2x when harvested",
                "cropId": 44,
                "effect": 70,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(30, <ExoticMarketUpgradeModel>{
                "name": "GOGOGROW",
                "description": "+{% Growth Speed for all land plots",
                "cropId": 45,
                "effect": 50,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(31, <ExoticMarketUpgradeModel>{
                "name": "BOUNTIFUL I",
                "description": "+{% chance for +1 crop when fully grown",
                "cropId": 46,
                "effect": 50,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(32, <ExoticMarketUpgradeModel>{
                "name": "BOUNTIFUL II",
                "description": "+{% chance for +1 crop when fully grown",
                "cropId": 48,
                "effect": 60,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(33, <ExoticMarketUpgradeModel>{
                "name": "BOUNTIFUL III",
                "description": "+{% chance for +1 crop when fully grown",
                "cropId": 50,
                "effect": 70,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(34, <ExoticMarketUpgradeModel>{
                "name": "BETTER DAY I",
                "description": "+{% cheaper Day Market upgrades",
                "cropId": 51,
                "effect": 40,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(35, <ExoticMarketUpgradeModel>{
                "name": "BETTER DAY II",
                "description": "+{% cheaper Day Market upgrades",
                "cropId": 53,
                "effect": 55,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(36, <ExoticMarketUpgradeModel>{
                "name": "BETTER NIGHT I",
                "description": "+{% cheaper Night Market upgrades",
                "cropId": 54,
                "effect": 40,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(37, <ExoticMarketUpgradeModel>{
                "name": "BETTER NIGHT II",
                "description": "+{% cheaper Night Market upgrades",
                "cropId": 56,
                "effect": 55,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(38, <ExoticMarketUpgradeModel>{
                "name": "BETTER EXOTIC",
                "description": "+{% extra LVs when buying Exotic Upgrades",
                "cropId": 58,
                "effect": 70,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(39, <ExoticMarketUpgradeModel>{
                "name": "FREEXOTIC",
                "description": "+{% chance to save a purchase when buying Exotic",
                "cropId": 60,
                "effect": 30,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(40, <ExoticMarketUpgradeModel>{
                "name": "SCIENTERRIFIC",
                "description": "+{% higher bonuses from Crop Scientist",
                "cropId": 62,
                "effect": 20,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(41, <ExoticMarketUpgradeModel>{
                "name": "BRIAR PATCH",
                "description": "+{% Total Damage @ (Not Farming Related)",
                "cropId": 64,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(42, <ExoticMarketUpgradeModel>{
                "name": "GRAVEL POUND",
                "description": "}x Total Spelunking POW @ (Not Farming Related)",
                "cropId": 66,
                "effect": 300,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(43, <ExoticMarketUpgradeModel>{
                "name": "SAP SURGE",
                "description": "}x Amber found in Spelunking @ (Not Farming Related)",
                "cropId": 67,
                "effect": 500,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(44, <ExoticMarketUpgradeModel>{
                "name": "4 LEAF CLOVER",
                "description": "+{% Palette Luck in Gaming @ (Not Farming Related)",
                "cropId": 69,
                "effect": 150,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(45, <ExoticMarketUpgradeModel>{
                "name": "5 LEAF CLOVER",
                "description": "}x Artifact Find Chance @ (Not Farming Related)",
                "cropId": 79,
                "effect": 30,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(46, <ExoticMarketUpgradeModel>{
                "name": "BUD COURIER",
                "description": "+{% chance for 2x Snail Mail @ (Not Farming Related)",
                "cropId": 71,
                "effect": 35,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(47, <ExoticMarketUpgradeModel>{
                "name": "STUDIOUS SPORE",
                "description": "+{% Spelunking EXP Gain @ (Not Farming Related)",
                "cropId": 73,
                "effect": 200,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(48, <ExoticMarketUpgradeModel>{
                "name": "PRISMA PETAL",
                "description": "+{% Prisma Bubble Bonus @ (Not Farming Related)",
                "cropId": 75,
                "effect": 2,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(49, <ExoticMarketUpgradeModel>{
                "name": "EXALTED ELDOU",
                "description": "+{% Exalted Stamp Bonus @ (Not Farming Related)",
                "cropId": 77,
                "effect": 2,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(50, <ExoticMarketUpgradeModel>{
                "name": "INTELLEAF",
                "description": "+{% Class EXP @ (Not Farming Related)",
                "cropId": 78,
                "effect": 300,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(51, <ExoticMarketUpgradeModel>{
                "name": "GRAPEVINE",
                "description": "}x Villager EXP gain @ (Not Farming Related)",
                "cropId": 81,
                "effect": 70,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(52, <ExoticMarketUpgradeModel>{
                "name": "HOLLOW TRUNK",
                "description": "}x Jar Collectibles Chance @ (Not Farming Related)",
                "cropId": 83,
                "effect": 200,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(53, <ExoticMarketUpgradeModel>{
                "name": "BONEMEAL SOIL",
                "description": "+{% Deathbringer Bones @ (Not Farming Related)",
                "cropId": 85,
                "effect": 160,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(54, <ExoticMarketUpgradeModel>{
                "name": "FORCE OF NAUTRE",
                "description": "+{% Windwalker Dust @ (Not Farming Related)",
                "cropId": 86,
                "effect": 160,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(55, <ExoticMarketUpgradeModel>{
                "name": "PURPLE GRASS",
                "description": "+{% Arcane Cultist Tachyons @ (Not Farming Related)",
                "cropId": 87,
                "effect": 160,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(56, <ExoticMarketUpgradeModel>{
                "name": "POTENT HEMLOCK",
                "description": "+{% Kill per Kill @ (Not Farming Related)",
                "cropId": 88,
                "effect": 35,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(57, <ExoticMarketUpgradeModel>{
                "name": "GOLD FIGLEAF",
                "description": "+{% Gold Balls gained in Arcade @ (Not Farming Related)",
                "cropId": 89,
                "effect": 10,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(58, <ExoticMarketUpgradeModel>{
                "name": "SNAPEGRASS",
                "description": "}x Jade Gain in Sneaking @ (Not Farming Related)",
                "cropId": 91,
                "effect": 1500,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(59, <ExoticMarketUpgradeModel>{
                "name": "POMMELION SEED",
                "description": "+{% Drop Rate @ (Not Farming Related)",
                "cropId": 92,
                "effect": 25,
                "x4": 1,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(60, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 93,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(61, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 94,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(62, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 95,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(63, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 96,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(64, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 97,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(65, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 98,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(66, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 99,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(67, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 100,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(68, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 101,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(69, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 102,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(70, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 104,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(71, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 106,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(72, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 108,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(73, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 110,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(74, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 112,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(75, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 113,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(76, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 114,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(77, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 116,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(78, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 118,
                "effect": 1,
                "x4": 0,
                "x5": 2
            }),
        new ExoticMarketUpgradeBase(79, <ExoticMarketUpgradeModel>{
                "name": "NAME MAGNI",
                "description": "+{% everything is awesome evrythn is cool when u r tem",
                "cropId": 119,
                "effect": 1,
                "x4": 0,
                "x5": 2
            })    
]
}
