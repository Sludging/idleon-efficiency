import { StatueDataModel } from '../model/statueDataModel';

export class StatueDataBase { constructor(public index: number, public data: StatueDataModel) { } }



export const initStatueRepo = () => {
    return [    
        new StatueDataBase(0, <StatueDataModel>{"name": "Power", "effect": "@Base Damage", "dk": 30, "bonus": 3}),
        new StatueDataBase(1, <StatueDataModel>{"name": "Speed", "effect": "%@Move Speed", "dk": 65, "bonus": 0.1}),
        new StatueDataBase(2, <StatueDataModel>{"name": "Mining", "effect": "@Mining Power", "dk": 280, "bonus": 0.3}),
        new StatueDataBase(3, <StatueDataModel>{"name": "Feasty", "effect": "%@Food Effect", "dk": 320, "bonus": 1}),
        new StatueDataBase(4, <StatueDataModel>{"name": "Health", "effect": "@Base Health", "dk": 0, "bonus": 3}),
        new StatueDataBase(5, <StatueDataModel>{"name": "Kachow", "effect": "%@Crit Damage", "dk": -15, "bonus": 0.4}),
        new StatueDataBase(6, <StatueDataModel>{"name": "Lumberbob", "effect": "@Choppin Power", "dk": 90, "bonus": 0.3}),
        new StatueDataBase(7, <StatueDataModel>{"name": "Thicc Skin", "effect": "@Base Defence", "dk": 210, "bonus": 1}),
        new StatueDataBase(8, <StatueDataModel>{"name": "Oceanman", "effect": "@Fishing Power", "dk": 115, "bonus": 0.3}),
        new StatueDataBase(9, <StatueDataModel>{"name": "Ol Reliable", "effect": "@Catchin Power", "dk": 45, "bonus": 0.3}),
        new StatueDataBase(10, <StatueDataModel>{"name": "Exp", "effect": "%@Class Exp", "dk": 0, "bonus": 0.1}),
        new StatueDataBase(11, <StatueDataModel>{"name": "Anvil", "effect": "%@Product Spd", "dk": 165, "bonus": 0.5}),
        new StatueDataBase(12, <StatueDataModel>{"name": "Cauldron", "effect": "%@Alchemy Exp", "dk": 280, "bonus": 0.5}),
        new StatueDataBase(13, <StatueDataModel>{"name": "Beholder", "effect": "%@Crit Chance", "dk": 300, "bonus": 0.2}),
        new StatueDataBase(14, <StatueDataModel>{"name": "Bullseye", "effect": "%@Accuracy", "dk": 110, "bonus": 0.8}),
        new StatueDataBase(15, <StatueDataModel>{"name": "Box", "effect": "@Trappin Power", "dk": 180, "bonus": 0.3}),
        new StatueDataBase(16, <StatueDataModel>{"name": "Twosoul", "effect": "@Worship Power", "dk": 260, "bonus": 0.3}),
        new StatueDataBase(17, <StatueDataModel>{"name": "Ehexpee", "effect": "%@Skill Exp", "dk": 69, "bonus": 0.1}),
        new StatueDataBase(18, <StatueDataModel>{"name": "Seesaw", "effect": "%@Cons Exp", "dk": 13, "bonus": 0.5})    
]
}
