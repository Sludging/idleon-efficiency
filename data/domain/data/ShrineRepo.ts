import { ShrineModel } from '../model/shrineModel';

export class ShrineBase { constructor(public index: number, public data: ShrineModel) { } }



export const initShrineRepo = () => {
    return [    
        new ShrineBase(0, <ShrineModel>{
                "name": "Woodular Shrine",
                "desc": "Boosts Total Damage of players on this map by +%. @ AFK Time to next Lv: @",
                "baseBonus": 12,
                "increment": 3,
                "misc": 0
            }),
        new ShrineBase(1, <ShrineModel>{
                "name": "Isaccian Shrine",
                "desc": "Boosts Max HP and DEF of players on this map by +%. @ AFK Time to next Lv: @",
                "baseBonus": 12,
                "increment": 3,
                "misc": 0
            }),
        new ShrineBase(2, <ShrineModel>{
                "name": "Crystal Shrine",
                "desc": "Boosts the Lv Up Rate of all Shrines on this map by +%. @ AFK Time to next Lv: @",
                "baseBonus": 20,
                "increment": 4,
                "misc": 0
            }),
        new ShrineBase(3, <ShrineModel>{
                "name": "Pantheon Shrine",
                "desc": "Boosts Carry Capacity of players on this map by +%. @ AFK Time to next Lv: @",
                "baseBonus": 10,
                "increment": 2,
                "misc": 0
            }),
        new ShrineBase(4, <ShrineModel>{
                "name": "Clover Shrine",
                "desc": "Boosts Drop Rate of players on this map by +%. @ AFK Time to next Lv: @",
                "baseBonus": 15,
                "increment": 3,
                "misc": 0
            }),
        new ShrineBase(5, <ShrineModel>{
                "name": "Summereading Shrine",
                "desc": "Boosts ALL Exp Gain of players on this map by +%. @ AFK Time to next Lv: @",
                "baseBonus": 6,
                "increment": 1,
                "misc": 0
            }),
        new ShrineBase(6, <ShrineModel>{
                "name": "Crescent Shrine",
                "desc": "Boosts Crystal and Giant Spawn chance on this map by +%. @ AFK Time to next Lv: @",
                "baseBonus": 50,
                "increment": 10,
                "misc": 0
            }),
        new ShrineBase(7, <ShrineModel>{
                "name": "Undead Shrine",
                "desc": "Boosts Respawn Rate of monsters on this map by +%. @ AFK Time to next Lv: @",
                "baseBonus": 5,
                "increment": 1,
                "misc": 0
            }),
        new ShrineBase(8, <ShrineModel>{
                "name": "Primordial Shrine",
                "desc": "Boosts AFK Gain Rate on this map by +%, up to 150% tot. @ AFK Time to next Lv: @",
                "baseBonus": 1,
                "increment": 0.1,
                "misc": 0
            })    
]
}
