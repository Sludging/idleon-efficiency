import { CompanionModel } from '../model/companionModel';

export class CompanionBase { constructor(public index: number, public data: CompanionModel) { } }



export const initCompanionRepo = () => {
    return [    
        new CompanionBase(0, <CompanionModel>{
                "id": "babaMummy",
                "desc": "All Divinities from World 5 count as Active",
                "bonus": 1,
                "x1": -53,
                "x2": -22,
                "x3": -14,
                "x4": 2000,
                "x5": 165
            }),
        new CompanionBase(1, <CompanionModel>{
                "id": "rift2",
                "desc": "+25 Lv for all Talents",
                "bonus": 25,
                "x1": -31,
                "x2": 6,
                "x3": -14,
                "x4": 450,
                "x5": 125
            }),
        new CompanionBase(2, <CompanionModel>{
                "id": "ram",
                "desc": "You can use Storage Chest anywhere in Quickref",
                "bonus": 1,
                "x1": -26,
                "x2": 16,
                "x3": -19,
                "x4": 150,
                "x5": 120
            }),
        new CompanionBase(3, <CompanionModel>{
                "id": "Crystal3",
                "desc": "{100% Drop Rate and Class Exp",
                "bonus": 100,
                "x1": -19,
                "x2": 20,
                "x3": -8,
                "x4": 150,
                "x5": 110
            }),
        new CompanionBase(4, <CompanionModel>{
                "id": "sheep",
                "desc": "All big bubbles in Alchemy count as equipped",
                "bonus": 1,
                "x1": -6,
                "x2": 0,
                "x3": -11,
                "x4": 10,
                "x5": 80
            }),
        new CompanionBase(5, <CompanionModel>{
                "id": "w5b1",
                "desc": "{5% All Skill Efficiency",
                "bonus": 5,
                "x1": 0,
                "x2": 0,
                "x3": -5,
                "x4": 10,
                "x5": 70
            }),
        new CompanionBase(6, <CompanionModel>{
                "id": "beanG",
                "desc": "{5% AFK Gains Rate for Fighting and Skills",
                "bonus": 5,
                "x1": -9,
                "x2": 0,
                "x3": -22,
                "x4": 10,
                "x5": 65
            }),
        new CompanionBase(7, <CompanionModel>{
                "id": "slimeG",
                "desc": "+25% Golden Balls earned in Arcade for Upgrades",
                "bonus": 1,
                "x1": 17,
                "x2": 0,
                "x3": -1,
                "x4": 5,
                "x5": 50
            }),
        new CompanionBase(8, <CompanionModel>{
                "id": "jarSand",
                "desc": "+15 Base All Stats (STR/AGI/WIS/LUK)",
                "bonus": 15,
                "x1": 5,
                "x2": 0,
                "x3": -3,
                "x4": 5,
                "x5": 50
            }),
        new CompanionBase(9, <CompanionModel>{
                "id": "bloque",
                "desc": "+20% All Skill EXP",
                "bonus": 20,
                "x1": 1,
                "x2": 0,
                "x3": -17,
                "x4": 5,
                "x5": 50
            }),
        new CompanionBase(10, <CompanionModel>{
                "id": "frogG",
                "desc": "+10% Total Damage",
                "bonus": 10,
                "x1": 12,
                "x2": 0,
                "x3": -5,
                "x4": 5,
                "x5": 40
            }),
        new CompanionBase(11, <CompanionModel>{
                "id": "slimeBz",
                "desc": "Only 100 of these exist in IdleOn...",
                "bonus": 10,
                "x1": -48,
                "x2": 0,
                "x3": -30,
                "x4": 1,
                "x5": 10
            }),
        new CompanionBase(12, <CompanionModel>{
                "id": "caveC",
                "desc": "10x Total Damage",
                "bonus": 9,
                "x1": -44,
                "x2": 0,
                "x3": -35,
                "x4": 1000,
                "x5": 150
            }),
        new CompanionBase(13, <CompanionModel>{
                "id": "w6d3",
                "desc": "3x Villager EXP and +25 Opals",
                "bonus": 1,
                "x1": -29,
                "x2": 0,
                "x3": -19,
                "x4": 250,
                "x5": 140
            }),
        new CompanionBase(14, <CompanionModel>{
                "id": "rift3",
                "desc": "2x Kills for Opening Portals and Deathnote",
                "bonus": 1,
                "x1": -21,
                "x2": 0,
                "x3": -16,
                "x4": 250,
                "x5": 135
            }),
        new CompanionBase(15, <CompanionModel>{
                "id": "w6b4",
                "desc": "3.50x faster Equinox Bar Fill Rate",
                "bonus": 2.5,
                "x1": -23,
                "x2": 0,
                "x3": -19,
                "x4": 100,
                "x5": 110
            }),
        new CompanionBase(16, <CompanionModel>{
                "id": "Crystal4",
                "desc": "1.75x Lab EXP and Divinity EXP Gain",
                "bonus": 0.75,
                "x1": -21,
                "x2": 0,
                "x3": -5,
                "x4": 100,
                "x5": 110
            }),
        new CompanionBase(17, <CompanionModel>{
                "id": "w5b6",
                "desc": "3d Printer samples grow {1%/day for 100 days",
                "bonus": 1,
                "x1": -17,
                "x2": 0,
                "x3": -15,
                "x4": 100,
                "x5": 100
            }),
        new CompanionBase(18, <CompanionModel>{
                "id": "frogBIG",
                "desc": "{25% Carry Capacity for all item types",
                "bonus": 25,
                "x1": -13,
                "x2": 0,
                "x3": -29,
                "x4": 10,
                "x5": 80
            }),
        new CompanionBase(19, <CompanionModel>{
                "id": "potato",
                "desc": "{5% Ballot Bonus Multi (World 2 feature)",
                "bonus": 5,
                "x1": -46,
                "x2": 0,
                "x3": -25,
                "x4": 10,
                "x5": 70
            }),
        new CompanionBase(20, <CompanionModel>{
                "id": "w4b1",
                "desc": "{30 Talent Points for all classes",
                "bonus": 30,
                "x1": -1,
                "x2": 0,
                "x3": -5,
                "x4": 10,
                "x5": 60
            }),
        new CompanionBase(21, <CompanionModel>{
                "id": "frogP",
                "desc": "+15% Defence",
                "bonus": 15,
                "x1": 10,
                "x2": 0,
                "x3": -5,
                "x4": 5,
                "x5": 55
            }),
        new CompanionBase(22, <CompanionModel>{
                "id": "glass",
                "desc": "+15% Drop Rate",
                "bonus": 15,
                "x1": -2,
                "x2": 0,
                "x3": -5,
                "x4": 5,
                "x5": 50
            }),
        new CompanionBase(23, <CompanionModel>{
                "id": "mushG",
                "desc": "+15% Accuracy",
                "bonus": 15,
                "x1": -8,
                "x2": 0,
                "x3": -5,
                "x4": 5,
                "x5": 30
            }),
        new CompanionBase(24, <CompanionModel>{
                "id": "Pet10",
                "desc": "4x Coins from Mobs",
                "bonus": 3,
                "x1": -10,
                "x2": 0,
                "x3": -13,
                "x4": 500,
                "x5": 100
            }),
        new CompanionBase(25, <CompanionModel>{
                "id": "Pet12",
                "desc": "{50% AFK Gains",
                "bonus": 50,
                "x1": 3,
                "x2": 0,
                "x3": -20,
                "x4": 500,
                "x5": 110
            }),
        new CompanionBase(26, <CompanionModel>{
                "id": "Pet3",
                "desc": "1.30x Drop Rate",
                "bonus": 0.3,
                "x1": -1,
                "x2": 0,
                "x3": 0,
                "x4": 500,
                "x5": 100
            }),
        new CompanionBase(27, <CompanionModel>{
                "id": "reindeer",
                "desc": "2.00x Gold Ball Shop Bonuses",
                "bonus": 1,
                "x1": -40,
                "x2": 0,
                "x3": -33,
                "x4": 500,
                "x5": 150
            }),
        new CompanionBase(28, <CompanionModel>{
                "id": "w7d1",
                "desc": "{30% AFK gains for World 7 skills, and {1 World Class Showcase Slot (Grade 4)",
                "bonus": 30,
                "x1": -30,
                "x2": 0,
                "x3": -48,
                "x4": 500,
                "x5": 200
            }),
        new CompanionBase(29, <CompanionModel>{
                "id": "Pet0",
                "desc": "1.50x Kills for Opening Portals and Deathnote",
                "bonus": 0.5,
                "x1": 6,
                "x2": 0,
                "x3": -8,
                "x4": 100,
                "x5": 115
            }),
        new CompanionBase(30, <CompanionModel>{
                "id": "Pet1",
                "desc": "2x Friend Bonuses, {2 Friend Bonus Slots, Auto Loot, Storage Quickref Usage, Infinite Teleporting",
                "bonus": 1,
                "x1": 4,
                "x2": 0,
                "x3": -5,
                "x4": 100,
                "x5": 110
            }),
        new CompanionBase(31, <CompanionModel>{
                "id": "Pet2",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": 2,
                "x2": 0,
                "x3": -8,
                "x4": 100,
                "x5": 90
            }),
        new CompanionBase(32, <CompanionModel>{
                "id": "Pet4",
                "desc": "2x Class EXP gain and 2x All Skill EXP gain",
                "bonus": 1,
                "x1": -2,
                "x2": 0,
                "x3": -13,
                "x4": 100,
                "x5": 125
            }),
        new CompanionBase(33, <CompanionModel>{
                "id": "Pet5",
                "desc": "2x Total Damage, and 2x Class EXP gain",
                "bonus": 1,
                "x1": -2,
                "x2": 0,
                "x3": -10,
                "x4": 100,
                "x5": 100
            }),
        new CompanionBase(34, <CompanionModel>{
                "id": "Pet6",
                "desc": "3x Class EXP gain",
                "bonus": 2,
                "x1": 2,
                "x2": 0,
                "x3": -9,
                "x4": 100,
                "x5": 80
            }),
        new CompanionBase(35, <CompanionModel>{
                "id": "Pet8",
                "desc": "2x Refinery Salts produced (affects POW produced in Refinery)",
                "bonus": 1,
                "x1": -5,
                "x2": 0,
                "x3": -13,
                "x4": 100,
                "x5": 110
            }),
        new CompanionBase(36, <CompanionModel>{
                "id": "Pet11",
                "desc": "{200% Gold Balls gained from the Arcade,",
                "bonus": 200,
                "x1": -4,
                "x2": 0,
                "x3": -11,
                "x4": 100,
                "x5": 100
            }),
        new CompanionBase(37, <CompanionModel>{
                "id": "w7e1",
                "desc": "10x Class EXP and {10 Legend Talent PTS",
                "bonus": 1,
                "x1": -10,
                "x2": 20,
                "x3": -33,
                "x4": 1000,
                "x5": 150
            }),
        new CompanionBase(38, <CompanionModel>{
                "id": "w7a5",
                "desc": "4x Masterclass drops (Bones/Dust/Tachyon)",
                "bonus": 3,
                "x1": -54,
                "x2": 0,
                "x3": -15,
                "x4": 250,
                "x5": 130
            }),
        new CompanionBase(39, <CompanionModel>{
                "id": "w7a8",
                "desc": "+50% Meritocracy Bonus Multi (World 7 feature)",
                "bonus": 50,
                "x1": -15,
                "x2": 30,
                "x3": -7,
                "x4": 250,
                "x5": 115
            }),
        new CompanionBase(40, <CompanionModel>{
                "id": "w7a4",
                "desc": "1.75x Daily Reef Coral (World 7 feature)",
                "bonus": 0.75,
                "x1": -10,
                "x2": 20,
                "x3": -19,
                "x4": 100,
                "x5": 110
            }),
        new CompanionBase(41, <CompanionModel>{
                "id": "Crystal6",
                "desc": "{40% Ballot Bonus Multi (World 2 feature)",
                "bonus": 40,
                "x1": -17,
                "x2": 0,
                "x3": -14,
                "x4": 100,
                "x5": 105
            }),
        new CompanionBase(42, <CompanionModel>{
                "id": "w7a3",
                "desc": "{1 Grade for 2 Gallery Showcases (World 7 feature)",
                "bonus": 2,
                "x1": -9,
                "x2": 28,
                "x3": -17,
                "x4": 100,
                "x5": 90
            }),
        new CompanionBase(43, <CompanionModel>{
                "id": "w7a7",
                "desc": "1.25x Artifact Find chance (World 5 feature)",
                "bonus": 0.25,
                "x1": -4,
                "x2": 0,
                "x3": -19,
                "x4": 10,
                "x5": 80
            }),
        new CompanionBase(44, <CompanionModel>{
                "id": "w7a10",
                "desc": "{1 Friend Bonus slot",
                "bonus": 1,
                "x1": -9,
                "x2": 0,
                "x3": -15,
                "x4": 10,
                "x5": 75
            }),
        new CompanionBase(45, <CompanionModel>{
                "id": "w7a1",
                "desc": "1.50x Coins from monsters",
                "bonus": 0.5,
                "x1": 6,
                "x2": 0,
                "x3": -5,
                "x4": 10,
                "x5": 65
            }),
        new CompanionBase(46, <CompanionModel>{
                "id": "coconut",
                "desc": "+15% faster Alchemy Brew Speed",
                "bonus": 15,
                "x1": -4,
                "x2": 0,
                "x3": -24,
                "x4": 5,
                "x5": 60
            }),
        new CompanionBase(47, <CompanionModel>{
                "id": "snakeG",
                "desc": "+10% Class EXP",
                "bonus": 10,
                "x1": 3,
                "x2": 0,
                "x3": -9,
                "x4": 5,
                "x5": 55
            }),
        new CompanionBase(48, <CompanionModel>{
                "id": "mushP",
                "desc": "+5% Golden Food bonus",
                "bonus": 5,
                "x1": -10,
                "x2": 0,
                "x3": -11,
                "x4": 5,
                "x5": 50
            }),
        new CompanionBase(49, <CompanionModel>{
                "id": "bubba",
                "desc": "{30% Gallery Bonus Multi (World 7 feature)",
                "bonus": 30,
                "x1": -29,
                "x2": 0,
                "x3": -37,
                "x4": 5,
                "x5": 165
            }),
        new CompanionBase(50, <CompanionModel>{
                "id": "snakeR",
                "desc": "{25% Class EXP, {25% Drop Rate, 1.01x Class EXP, and 1.01x Drop Rate",
                "bonus": 25,
                "x1": -3,
                "x2": 0,
                "x3": -9,
                "x4": 0,
                "x5": 60
            }),
        new CompanionBase(51, <CompanionModel>{
                "id": "w6c2b",
                "desc": "3x bonuses from Orion, Poppy, and Bubba (and all future Clickers)",
                "bonus": 2,
                "x1": -21,
                "x2": 0,
                "x3": -11,
                "x4": 100,
                "x5": 130
            }),
        new CompanionBase(52, <CompanionModel>{
                "id": "w7b5",
                "desc": "1.50x Research EXP gain (World 7 feature)",
                "bonus": 0.5,
                "x1": -24,
                "x2": 0,
                "x3": -18,
                "x4": 1,
                "x5": 120
            }),
        new CompanionBase(53, <CompanionModel>{
                "id": "w7b1b",
                "desc": "100x Gaming Bits gained (World 5 feature)",
                "bonus": 99,
                "x1": -7,
                "x2": 0,
                "x3": -18,
                "x4": 1,
                "x5": 140
            }),
        new CompanionBase(54, <CompanionModel>{
                "id": "w7b6b",
                "desc": "+1 new Research Shape, shows up after you get Research LV. 20",
                "bonus": 1,
                "x1": -24,
                "x2": 0,
                "x3": -26,
                "x4": 1,
                "x5": 165
            }),
        new CompanionBase(55, <CompanionModel>{
                "id": "w7b11",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": -26,
                "x2": 0,
                "x3": -28,
                "x4": 1,
                "x5": 200
            }),
        new CompanionBase(56, <CompanionModel>{
                "id": "w7b10",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": -43,
                "x2": 0,
                "x3": -30,
                "x4": 1,
                "x5": 260
            }),
        new CompanionBase(57, <CompanionModel>{
                "id": "w7b12",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": -36,
                "x2": 0,
                "x3": -41,
                "x4": 1,
                "x5": 340
            }),
        new CompanionBase(58, <CompanionModel>{
                "id": "bubbab",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": -47,
                "x2": 0,
                "x3": -35,
                "x4": 1,
                "x5": 420
            }),
        new CompanionBase(59, <CompanionModel>{
                "id": "acorn",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 60
            }),
        new CompanionBase(60, <CompanionModel>{
                "id": "babaHour",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 150
            }),
        new CompanionBase(61, <CompanionModel>{
                "id": "babayaga",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 150
            }),
        new CompanionBase(62, <CompanionModel>{
                "id": "branch",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 55
            }),
        new CompanionBase(63, <CompanionModel>{
                "id": "carrotO",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 80
            }),
        new CompanionBase(64, <CompanionModel>{
                "id": "caveA",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(65, <CompanionModel>{
                "id": "caveB",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(66, <CompanionModel>{
                "id": "crabcake",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 60
            }),
        new CompanionBase(67, <CompanionModel>{
                "id": "crabcakeB",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(68, <CompanionModel>{
                "id": "Crystal0",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 105
            }),
        new CompanionBase(69, <CompanionModel>{
                "id": "Crystal1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 105
            }),
        new CompanionBase(70, <CompanionModel>{
                "id": "Crystal2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(71, <CompanionModel>{
                "id": "Crystal5",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(72, <CompanionModel>{
                "id": "demonP",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(73, <CompanionModel>{
                "id": "frogGG",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 125
            }),
        new CompanionBase(74, <CompanionModel>{
                "id": "frogR",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 120
            }),
        new CompanionBase(75, <CompanionModel>{
                "id": "frogY",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 110
            }),
        new CompanionBase(76, <CompanionModel>{
                "id": "ghost",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(77, <CompanionModel>{
                "id": "goblinG",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 45
            }),
        new CompanionBase(78, <CompanionModel>{
                "id": "mamoth",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(79, <CompanionModel>{
                "id": "mimicA",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 40
            }),
        new CompanionBase(80, <CompanionModel>{
                "id": "moonman",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 70
            }),
        new CompanionBase(81, <CompanionModel>{
                "id": "mushR",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 40
            }),
        new CompanionBase(82, <CompanionModel>{
                "id": "mushW",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(83, <CompanionModel>{
                "id": "pincermin",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 95
            }),
        new CompanionBase(84, <CompanionModel>{
                "id": "plank",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 50
            }),
        new CompanionBase(85, <CompanionModel>{
                "id": "potatoB",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 110
            }),
        new CompanionBase(86, <CompanionModel>{
                "id": "ratB",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 90
            }),
        new CompanionBase(87, <CompanionModel>{
                "id": "rift1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(88, <CompanionModel>{
                "id": "rift4",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(89, <CompanionModel>{
                "id": "rift5",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(90, <CompanionModel>{
                "id": "sandcastle",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 45
            }),
        new CompanionBase(91, <CompanionModel>{
                "id": "sandgiant",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 105
            }),
        new CompanionBase(92, <CompanionModel>{
                "id": "shovelR",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 50
            }),
        new CompanionBase(93, <CompanionModel>{
                "id": "shovel",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(94, <CompanionModel>{
                "id": "skele",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(95, <CompanionModel>{
                "id": "skele2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(96, <CompanionModel>{
                "id": "slimeB",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(97, <CompanionModel>{
                "id": "slimmer",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(98, <CompanionModel>{
                "id": "snailZ",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 115
            }),
        new CompanionBase(99, <CompanionModel>{
                "id": "snakeB",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(100, <CompanionModel>{
                "id": "snakeY",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(101, <CompanionModel>{
                "id": "snowball",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(102, <CompanionModel>{
                "id": "speaker",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(103, <CompanionModel>{
                "id": "steak",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 85
            }),
        new CompanionBase(104, <CompanionModel>{
                "id": "steakR",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(105, <CompanionModel>{
                "id": "thermostat",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(106, <CompanionModel>{
                "id": "w4a2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(107, <CompanionModel>{
                "id": "w4a3",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(108, <CompanionModel>{
                "id": "w4b2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(109, <CompanionModel>{
                "id": "w4b3",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(110, <CompanionModel>{
                "id": "w4b4",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(111, <CompanionModel>{
                "id": "w4c1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(112, <CompanionModel>{
                "id": "w4c2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(113, <CompanionModel>{
                "id": "w4c3",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(114, <CompanionModel>{
                "id": "w4c4",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(115, <CompanionModel>{
                "id": "w5a1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(116, <CompanionModel>{
                "id": "w5a2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(117, <CompanionModel>{
                "id": "w5a3",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(118, <CompanionModel>{
                "id": "w5a4",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(119, <CompanionModel>{
                "id": "w5a5",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(120, <CompanionModel>{
                "id": "w5b3",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(121, <CompanionModel>{
                "id": "w5b4",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(122, <CompanionModel>{
                "id": "w5b5",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(123, <CompanionModel>{
                "id": "w5c1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(124, <CompanionModel>{
                "id": "w5c2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(125, <CompanionModel>{
                "id": "w6a1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(126, <CompanionModel>{
                "id": "w6a2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(127, <CompanionModel>{
                "id": "w6a3",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(128, <CompanionModel>{
                "id": "w6a4",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(129, <CompanionModel>{
                "id": "w6a5",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(130, <CompanionModel>{
                "id": "w6b1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(131, <CompanionModel>{
                "id": "w6b2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(132, <CompanionModel>{
                "id": "w6b3",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(133, <CompanionModel>{
                "id": "w6c1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(134, <CompanionModel>{
                "id": "w6c2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(135, <CompanionModel>{
                "id": "w6d1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(136, <CompanionModel>{
                "id": "w6d2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(137, <CompanionModel>{
                "id": "w7a2",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(138, <CompanionModel>{
                "id": "w7a6",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(139, <CompanionModel>{
                "id": "w7a9",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(140, <CompanionModel>{
                "id": "w7a11",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(141, <CompanionModel>{
                "id": "w7a12",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(142, <CompanionModel>{
                "id": "w7b1",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(143, <CompanionModel>{
                "id": "w7b2",
                "desc": "20x total Spelunking POW, and 2x Minehead Currency Gain!",
                "bonus": 20,
                "x1": -20,
                "x2": 0,
                "x3": -19,
                "x4": 1,
                "x5": 190
            }),
        new CompanionBase(144, <CompanionModel>{
                "id": "w7b3",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(145, <CompanionModel>{
                "id": "w7b4",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(146, <CompanionModel>{
                "id": "w7b6",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(147, <CompanionModel>{
                "id": "w7b7zzz",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(148, <CompanionModel>{
                "id": "w7b8zzz",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(149, <CompanionModel>{
                "id": "w7b9zzz",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 100
            }),
        new CompanionBase(150, <CompanionModel>{
                "id": "T1a",
                "desc": "Congratulations on winning the Bronze Tournament in Season 1!",
                "bonus": 1,
                "x1": -26,
                "x2": 0,
                "x3": -19,
                "x4": 1,
                "x5": 10
            }),
        new CompanionBase(151, <CompanionModel>{
                "id": "T1b",
                "desc": "Congratulations on winning the Silver Tournament in Season 1!",
                "bonus": 1,
                "x1": -26,
                "x2": 0,
                "x3": -19,
                "x4": 1,
                "x5": 10
            }),
        new CompanionBase(152, <CompanionModel>{
                "id": "T1c",
                "desc": "Congratulations on winning the Gold Tournament in Season 1!",
                "bonus": 1,
                "x1": -26,
                "x2": 0,
                "x3": -24,
                "x4": 1,
                "x5": 10
            }),
        new CompanionBase(153, <CompanionModel>{
                "id": "rift5",
                "desc": "Not officially in the game and may never be",
                "bonus": 1,
                "x1": 0,
                "x2": 0,
                "x3": 0,
                "x4": 1,
                "x5": 170
            }),
        new CompanionBase(154, <CompanionModel>{
                "id": "w7b3b",
                "desc": "1.60x Kills multi, and 2x Artifact Find Chance for Sailing!",
                "bonus": 0.6,
                "x1": -16,
                "x2": 0,
                "x3": -22,
                "x4": 1,
                "x5": 160
            })    
]
}
