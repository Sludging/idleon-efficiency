import { GamingUpgradeModel } from '../model/gamingUpgradeModel';

export class GamingUpgradeBase { constructor(public index: number, public data: GamingUpgradeModel) { } }



export const initGamingUpgradeRepo = () => {
    return [    
        new GamingUpgradeBase(0, <GamingUpgradeModel>{
                "name": "Sprout Value",
                "x1": 1,
                "x2": 1,
                "x3": 1,
                "x4": 1,
                "desc": "Sprouts give { when collected. This is known as their 'base value'."
            }),
        new GamingUpgradeBase(1, <GamingUpgradeModel>{
                "name": "Sprout Speed",
                "x1": 1,
                "x2": 1,
                "x3": 1,
                "x4": 1,
                "desc": "Sprouts grow back every { on average. This time is also 1 growth cycle."
            }),
        new GamingUpgradeBase(2, <GamingUpgradeModel>{
                "name": "Sprout Capacity",
                "x1": 1,
                "x2": 1,
                "x3": 1,
                "x4": 1,
                "desc": "Your garden can hold up to { sprouts. Current storage shown in top left."
            })    
]
}
