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
                "x4": -1
            }),
        new CompanionBase(1, <CompanionModel>{
                "id": "rift2",
                "desc": "+25 Lv for all Talents",
                "bonus": 25,
                "x1": -31,
                "x2": 6,
                "x3": -14,
                "x4": -1
            }),
        new CompanionBase(2, <CompanionModel>{
                "id": "ram",
                "desc": "You can use Storage Chest anywhere in Quickref",
                "bonus": 1,
                "x1": -26,
                "x2": 16,
                "x3": -19,
                "x4": -1
            }),
        new CompanionBase(3, <CompanionModel>{
                "id": "Crystal3",
                "desc": "{100% Drop Rate and Exp from monsters",
                "bonus": 100,
                "x1": -19,
                "x2": 20,
                "x3": -8,
                "x4": -1
            }),
        new CompanionBase(4, <CompanionModel>{
                "id": "sheep",
                "desc": "All big bubbles in Alchemy count as equipped",
                "bonus": 1,
                "x1": -6,
                "x2": 0,
                "x3": -11,
                "x4": -1
            }),
        new CompanionBase(5, <CompanionModel>{
                "id": "w5b1",
                "desc": "{5% All Skill Efficiency",
                "bonus": 5,
                "x1": 0,
                "x2": 0,
                "x3": -5,
                "x4": -1
            }),
        new CompanionBase(6, <CompanionModel>{
                "id": "beanG",
                "desc": "{5% AFK Gains Rate for Fighting and Skills",
                "bonus": 5,
                "x1": -9,
                "x2": 0,
                "x3": -22,
                "x4": -1
            }),
        new CompanionBase(7, <CompanionModel>{
                "id": "slimeG",
                "desc": "+25% Golden Balls earned in Arcade for Upgrades",
                "bonus": 1,
                "x1": 17,
                "x2": 0,
                "x3": -1,
                "x4": -1
            }),
        new CompanionBase(8, <CompanionModel>{
                "id": "jarSand",
                "desc": "+15 Base All Stats (STR/AGI/WIS/LUK)",
                "bonus": 15,
                "x1": 5,
                "x2": 0,
                "x3": -3,
                "x4": -1
            }),
        new CompanionBase(9, <CompanionModel>{
                "id": "bloque",
                "desc": "+20% All Skill EXP",
                "bonus": 20,
                "x1": 1,
                "x2": 0,
                "x3": -17,
                "x4": -1
            }),
        new CompanionBase(10, <CompanionModel>{
                "id": "frogG",
                "desc": "+10% Total Damage",
                "bonus": 10,
                "x1": 12,
                "x2": 0,
                "x3": -5,
                "x4": -1
            })    
]
}
