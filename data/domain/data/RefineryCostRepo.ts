import { ComponentModel } from '../model/componentModel';
import { RefineryCostModel } from '../model/refineryCostModel';

export class RefineryCostBase { constructor(public id: string, public data: RefineryCostModel) { } }



export const initRefineryCostRepo = () => {
    return [    
        new RefineryCostBase("Refinery1", <RefineryCostModel>{
                "cost": [<ComponentModel>{"item": "Grasslands1", "quantity": 10}, <ComponentModel>{"item": "Copper", "quantity": 5}]
            }),
        new RefineryCostBase("Refinery2", <RefineryCostModel>{
                "cost": [
                    <ComponentModel>{"item": "Forest3", "quantity": 10},
                    <ComponentModel>{"item": "ForestTree", "quantity": 5},
                    <ComponentModel>{"item": "Refinery1", "quantity": 2}
                ]
            }),
        new RefineryCostBase("Refinery3", <RefineryCostModel>{
                "cost": [
                    <ComponentModel>{"item": "DesertA1", "quantity": 50},
                    <ComponentModel>{"item": "Fish1", "quantity": 30},
                    <ComponentModel>{"item": "Bug1", "quantity": 40},
                    <ComponentModel>{"item": "Refinery2", "quantity": 2}
                ]
            }),
        new RefineryCostBase("Refinery4", <RefineryCostModel>{
                "cost": [
                    <ComponentModel>{"item": "SnowA1", "quantity": 10},
                    <ComponentModel>{"item": "Soul2", "quantity": 2},
                    <ComponentModel>{"item": "Critter3", "quantity": 1},
                    <ComponentModel>{"item": "Refinery3", "quantity": 1}
                ]
            }),
        new RefineryCostBase("Refinery5", <RefineryCostModel>{
                "cost": [
                    <ComponentModel>{"item": "SnowB4", "quantity": 25},
                    <ComponentModel>{"item": "Fish4", "quantity": 5},
                    <ComponentModel>{"item": "Bug3", "quantity": 5},
                    <ComponentModel>{"item": "Critter4", "quantity": 5},
                    <ComponentModel>{"item": "Refinery4", "quantity": 2}
                ]
            }),
        new RefineryCostBase("Refinery6", <RefineryCostModel>{
                "cost": [
                    <ComponentModel>{"item": "SnowC4", "quantity": 50},
                    <ComponentModel>{"item": "VoidBar", "quantity": 5},
                    <ComponentModel>{"item": "Tree7", "quantity": 5},
                    <ComponentModel>{"item": "Bug6", "quantity": 5},
                    <ComponentModel>{"item": "Soul4", "quantity": 5},
                    <ComponentModel>{"item": "Refinery5", "quantity": 2}
                ]
            })    
]
}
