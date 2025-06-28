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
                "x4": 2000
            }),
        new CompanionBase(1, <CompanionModel>{
                "id": "rift2",
                "desc": "+25 Lv for all Talents",
                "bonus": 25,
                "x1": -31,
                "x2": 6,
                "x3": -14,
                "x4": 450
            }),
        new CompanionBase(2, <CompanionModel>{
                "id": "ram",
                "desc": "You can use Storage Chest anywhere in Quickref",
                "bonus": 1,
                "x1": -26,
                "x2": 16,
                "x3": -19,
                "x4": 150
            }),
        new CompanionBase(3, <CompanionModel>{
                "id": "Crystal3",
                "desc": "{100% Drop Rate and Exp from monsters",
                "bonus": 100,
                "x1": -19,
                "x2": 20,
                "x3": -8,
                "x4": 150
            }),
        new CompanionBase(4, <CompanionModel>{
                "id": "sheep",
                "desc": "All big bubbles in Alchemy count as equipped",
                "bonus": 1,
                "x1": -6,
                "x2": 0,
                "x3": -11,
                "x4": 10
            }),
        new CompanionBase(5, <CompanionModel>{
                "id": "w5b1",
                "desc": "{5% All Skill Efficiency",
                "bonus": 5,
                "x1": 0,
                "x2": 0,
                "x3": -5,
                "x4": 10
            }),
        new CompanionBase(6, <CompanionModel>{
                "id": "beanG",
                "desc": "{5% AFK Gains Rate for Fighting and Skills",
                "bonus": 5,
                "x1": -9,
                "x2": 0,
                "x3": -22,
                "x4": 10
            }),
        new CompanionBase(7, <CompanionModel>{
                "id": "slimeG",
                "desc": "+25% Golden Balls earned in Arcade for Upgrades",
                "bonus": 1,
                "x1": 17,
                "x2": 0,
                "x3": -1,
                "x4": 5
            }),
        new CompanionBase(8, <CompanionModel>{
                "id": "jarSand",
                "desc": "+15 Base All Stats (STR/AGI/WIS/LUK)",
                "bonus": 15,
                "x1": 5,
                "x2": 0,
                "x3": -3,
                "x4": 5
            }),
        new CompanionBase(9, <CompanionModel>{
                "id": "bloque",
                "desc": "+20% All Skill EXP",
                "bonus": 20,
                "x1": 1,
                "x2": 0,
                "x3": -17,
                "x4": 5
            }),
        new CompanionBase(10, <CompanionModel>{
                "id": "frogG",
                "desc": "+10% Total Damage",
                "bonus": 10,
                "x1": 12,
                "x2": 0,
                "x3": -5,
                "x4": 5
            }),
        new CompanionBase(11, <CompanionModel>{
                "id": "slimeBz",
                "desc": "Only 100 of these exist in IdleOn...",
                "bonus": 10,
                "x1": -48,
                "x2": 0,
                "x3": -30,
                "x4": 1
            }),
        new CompanionBase(12, <CompanionModel>{
                "id": "caveC",
                "desc": "10x Total Damage",
                "bonus": 9,
                "x1": -44,
                "x2": 0,
                "x3": -35,
                "x4": 1000
            }),
        new CompanionBase(13, <CompanionModel>{
                "id": "w6d3",
                "desc": "3x Villager EXP and +25 Opals",
                "bonus": 1,
                "x1": -29,
                "x2": 0,
                "x3": -19,
                "x4": 250
            }),
        new CompanionBase(14, <CompanionModel>{
                "id": "rift3",
                "desc": "2x Kills for Opening Portals and Deathnote",
                "bonus": 1,
                "x1": -21,
                "x2": 0,
                "x3": -16,
                "x4": 250
            }),
        new CompanionBase(15, <CompanionModel>{
                "id": "w6b4",
                "desc": "3.50x faster Equinox Bar Fill Rate",
                "bonus": 2.5,
                "x1": -23,
                "x2": 0,
                "x3": -19,
                "x4": 100
            }),
        new CompanionBase(16, <CompanionModel>{
                "id": "Crystal4",
                "desc": "1.75x Lab EXP and Divinity EXP Gain",
                "bonus": 0.75,
                "x1": -21,
                "x2": 0,
                "x3": -5,
                "x4": 100
            }),
        new CompanionBase(17, <CompanionModel>{
                "id": "w5b6",
                "desc": "3d Printer samples grow {1%/day for 100 days",
                "bonus": 1,
                "x1": -17,
                "x2": 0,
                "x3": -15,
                "x4": 100
            }),
        new CompanionBase(18, <CompanionModel>{
                "id": "frogBIG",
                "desc": "{25% Carry Capacity for all item types",
                "bonus": 25,
                "x1": -13,
                "x2": 0,
                "x3": -29,
                "x4": 10
            }),
        new CompanionBase(19, <CompanionModel>{
                "id": "potato",
                "desc": "{5% Ballot Bonus Multi",
                "bonus": 5,
                "x1": -46,
                "x2": 0,
                "x3": -25,
                "x4": 10
            }),
        new CompanionBase(20, <CompanionModel>{
                "id": "w4b1",
                "desc": "{30 Talent Points for all classes",
                "bonus": 30,
                "x1": -1,
                "x2": 0,
                "x3": -5,
                "x4": 10
            }),
        new CompanionBase(21, <CompanionModel>{
                "id": "frogP",
                "desc": "+15% Defence",
                "bonus": 15,
                "x1": 10,
                "x2": 0,
                "x3": -5,
                "x4": 5
            }),
        new CompanionBase(22, <CompanionModel>{
                "id": "glass",
                "desc": "+15% Drop Rate",
                "bonus": 15,
                "x1": -2,
                "x2": 0,
                "x3": -5,
                "x4": 5
            }),
        new CompanionBase(23, <CompanionModel>{
                "id": "mushG",
                "desc": "+15% Accuracy",
                "bonus": 15,
                "x1": -8,
                "x2": 0,
                "x3": -5,
                "x4": 5
            }),
        new CompanionBase(24, <CompanionModel>{
                "id": "Pet10",
                "desc": "4x Coins from Mobs",
                "bonus": 3,
                "x1": -10,
                "x2": 0,
                "x3": -13,
                "x4": 500
            }),
        new CompanionBase(25, <CompanionModel>{
                "id": "Pet12",
                "desc": "{50% AFK Gains",
                "bonus": 50,
                "x1": 3,
                "x2": 0,
                "x3": -20,
                "x4": 500
            }),
        new CompanionBase(26, <CompanionModel>{
                "id": "Pet3",
                "desc": "1.30x Drop Rate",
                "bonus": 0.3,
                "x1": -1,
                "x2": 0,
                "x3": 0,
                "x4": 500
            }),
        new CompanionBase(27, <CompanionModel>{
                "id": "reindeer",
                "desc": "2.00x Gold Ball Shop Bonuses",
                "bonus": 1,
                "x1": -40,
                "x2": 0,
                "x3": -33,
                "x4": 500
            }),
        new CompanionBase(28, <CompanionModel>{
                "id": "w7d1",
                "desc": "Bababooey!",
                "bonus": 1,
                "x1": -30,
                "x2": 0,
                "x3": -48,
                "x4": 500
            }),
        new CompanionBase(29, <CompanionModel>{
                "id": "Pet0",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": 6,
                "x2": 0,
                "x3": -8,
                "x4": 100
            }),
        new CompanionBase(30, <CompanionModel>{
                "id": "Pet1",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": 4,
                "x2": 0,
                "x3": -5,
                "x4": 100
            }),
        new CompanionBase(31, <CompanionModel>{
                "id": "Pet2",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": 2,
                "x2": 0,
                "x3": -8,
                "x4": 100
            }),
        new CompanionBase(32, <CompanionModel>{
                "id": "Pet4",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": -2,
                "x2": 0,
                "x3": -13,
                "x4": 100
            }),
        new CompanionBase(33, <CompanionModel>{
                "id": "Pet5",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": -2,
                "x2": 0,
                "x3": -10,
                "x4": 100
            }),
        new CompanionBase(34, <CompanionModel>{
                "id": "Pet6",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": 2,
                "x2": 0,
                "x3": -9,
                "x4": 100
            }),
        new CompanionBase(35, <CompanionModel>{
                "id": "Pet8",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": -5,
                "x2": 0,
                "x3": -13,
                "x4": 100
            }),
        new CompanionBase(36, <CompanionModel>{
                "id": "Pet11",
                "desc": "Bababooey!",
                "bonus": 3,
                "x1": -4,
                "x2": 0,
                "x3": -11,
                "x4": 100
            })    
]
}
