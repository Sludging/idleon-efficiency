import { ExpeditionIslandModel } from '../model/expeditionIslandModel';

export class ExpeditionIslandBase { constructor(public index: number, public data: ExpeditionIslandModel) { } }



export const initExpeditionIslandRepo = () => {
    return [    
        new ExpeditionIslandBase(0, <ExpeditionIslandModel>{
                "index": 0,
                "name": "TRASH",
                "description": "Trade garbage that washs up each day for items",
                "unlockBaseCost": 10
            }),
        new ExpeditionIslandBase(1, <ExpeditionIslandModel>{
                "index": 1,
                "name": "RANDO",
                "description": "Guaranteed Random Event once a week",
                "unlockBaseCost": 12
            }),
        new ExpeditionIslandBase(2, <ExpeditionIslandModel>{
                "index": 2,
                "name": "CRYSTAL",
                "description": "Fight daily giant crystal mobs that drop candy",
                "unlockBaseCost": 15
            }),
        new ExpeditionIslandBase(3, <ExpeditionIslandModel>{
                "index": 3,
                "name": "SEASALT",
                "description": "Catch legendary fish for crafting World 6 equips",
                "unlockBaseCost": 50
            }),
        new ExpeditionIslandBase(4, <ExpeditionIslandModel>{
                "index": 4,
                "name": "SHIMMER",
                "description": "Do Weekly Challenges for Shimmer Upgrades",
                "unlockBaseCost": 25
            }),
        new ExpeditionIslandBase(5, <ExpeditionIslandModel>{
                "index": 5,
                "name": "FRACTAL",
                "description": "Dump your time candy here for... nothing...?",
                "unlockBaseCost": 70
            })    
]
}
