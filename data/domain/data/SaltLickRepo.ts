import { SaltLickModel } from '../model/saltLickModel';

export class SaltLickBase { constructor(public index: number, public data: SaltLickModel) { } }



export const initSaltLickRepo = () => {
    return [    
        new SaltLickBase(0, <SaltLickModel>{
                "item": "Refinery1",
                "desc": "Samples taken for the 3D printer are +{% bigger!",
                "baseCost": 5,
                "baseBonus": 0.5,
                "maxLevel": 20,
                "costInc": 1.5
            }),
        new SaltLickBase(1, <SaltLickModel>{
                "item": "Refinery1",
                "desc": "+4 Obol storage slots per upgrade! Circle, Square, Hexagon, then Sparkle, in that order.",
                "baseCost": 10,
                "baseBonus": 1,
                "maxLevel": 8,
                "costInc": 2.3
            }),
        new SaltLickBase(2, <SaltLickModel>{
                "item": "Refinery2",
                "desc": "+{% Refinery Speed for all cycle types. In other words, cycles take less time.",
                "baseCost": 5,
                "baseBonus": 2,
                "maxLevel": 100,
                "costInc": 1.15
            }),
        new SaltLickBase(3, <SaltLickModel>{
                "item": "Refinery2",
                "desc": "+{% Class EXP and Skill EXP. Not really sure what those blobulytes do with these souls...",
                "baseCost": 10,
                "baseBonus": 0.2,
                "maxLevel": 100,
                "costInc": 1.2
            }),
        new SaltLickBase(4, <SaltLickModel>{
                "item": "Refinery3",
                "desc": "+{ Max level for talent books from the library. RNG be with you!",
                "baseCost": 5,
                "baseBonus": 2,
                "maxLevel": 10,
                "costInc": 2.2
            }),
        new SaltLickBase(5, <SaltLickModel>{
                "item": "Refinery3",
                "desc": "+{% Liquid rate and Capacity for all liquids in Alchemy.",
                "baseCost": 10,
                "baseBonus": 1,
                "maxLevel": 100,
                "costInc": 1.122
            }),
        new SaltLickBase(6, <SaltLickModel>{
                "item": "Refinery4",
                "desc": "+{% Points Earned during Worship Tower Defense from killing monsters.",
                "baseCost": 5,
                "baseBonus": 5,
                "maxLevel": 10,
                "costInc": 2.1
            }),
        new SaltLickBase(7, <SaltLickModel>{
                "item": "Refinery4",
                "desc": "+{% Movement Speed. Doesn't work if you're above 170% move speed already.",
                "baseCost": 10,
                "baseBonus": 0.4,
                "maxLevel": 25,
                "costInc": 1.4
            }),
        new SaltLickBase(8, <SaltLickModel>{
                "item": "Refinery5",
                "desc": "+{% Multikill Rate for all worlds. All of them!",
                "baseCost": 5,
                "baseBonus": 3,
                "maxLevel": 10,
                "costInc": 2.2
            }),
        new SaltLickBase(9, <SaltLickModel>{
                "item": "Refinery5",
                "desc": "+{% Total Damage dealt.",
                "baseCost": 10,
                "baseBonus": 0.1,
                "maxLevel": 250,
                "costInc": 1.04
            }),
        new SaltLickBase(10, <SaltLickModel>{
                "item": "Refinery6",
                "desc": "+{% Cooking Mastery EXP gain, a feature unlocked via Rift 61 deep in World 4.",
                "baseCost": 100,
                "baseBonus": 1,
                "maxLevel": 100,
                "costInc": 1.22
            })    
]
}
