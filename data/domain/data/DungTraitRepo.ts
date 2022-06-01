import { DungSetModel } from '../model/dungSetModel';
import { DungTraitModel } from '../model/dungTraitModel';

export class DungSetBase { constructor(public id: string, public data: DungSetModel) { } }



export const initDungTraitRepo = () => {
    return [    
        new DungSetBase("Beginner Traits", <DungSetModel>{
                "rankReq": 5,
                "name": "Beginner Traits",
                "traits": [<DungTraitModel>{"name": "+5 Max HP"}, <DungTraitModel>{"name": "+3 Base Damage"}, <DungTraitModel>{"name": "+5 Max MP"}]
            }),
        new DungSetBase("Kinda Cool Traits", <DungSetModel>{
                "rankReq": 10,
                "name": "Kinda Cool Traits",
                "traits": [
                    <DungTraitModel>{"name": "Start each dungeon run with 2 grey RNG items"},
                    <DungTraitModel>{"name": "Start each dungeon run with 1 green RNG item"},
                    <DungTraitModel>{"name": "50% to start each dungeon run with 1 blue RNG item"}
                ]
            }),
        new DungSetBase("Strategery Traits", <DungSetModel>{
                "rankReq": 15,
                "name": "Strategery Traits",
                "traits": [
                    <DungTraitModel>{"name": "Each grey RNG item also gives +1% drop chance"},
                    <DungTraitModel>{"name": "Each green RNG items also gives +1 base dmg"},
                    <DungTraitModel>{"name": "Each Blue RNG item also gives +3 base mana"},
                    <DungTraitModel>{"name": "Each purple RNG item also gives +5 base dmg"}
                ]
            }),
        new DungSetBase("Da Cred Traits", <DungSetModel>{
                "rankReq": 20,
                "name": "Da Cred Traits",
                "traits": [
                    <DungTraitModel>{"name": "Dungeon Credits drop +30% more often from mobs and bosses"},
                    <DungTraitModel>{"name": "Dungeon Flurbos, the pink ones, drop +30% more often from mobs and bosses"}
                ]
            }),
        new DungSetBase("Drop Drip Traits", <DungSetModel>{
                "rankReq": 25,
                "name": "Drop Drip Traits",
                "traits": [
                    <DungTraitModel>{"name": "Enhancers drop from mobs instead of equipment 25% more often"},
                    <DungTraitModel>{"name": "Equipment drop from mobs instead of enhancers 25% more often"},
                    <DungTraitModel>{"name": "Weapons drop instead of armor ~ jewelry 25% more often"},
                    <DungTraitModel>{"name": "Armor ~ jewelry drop instead of weapons 25% more often"}
                ]
            }),
        new DungSetBase("Cash Money Traits", <DungSetModel>{
                "rankReq": 30,
                "name": "Cash Money Traits",
                "traits": [
                    <DungTraitModel>{"name": "Shop prices of Equipment scales up 30% slower"},
                    <DungTraitModel>{"name": "Shop prices of enhancers scales up 40% slower"},
                    <DungTraitModel>{"name": "Shop prices of RNG items scale up 15% slower"}
                ]
            }),
        new DungSetBase("ChOiIiCe Traits", <DungSetModel>{
                "rankReq": 35,
                "name": "ChOiIiCe Traits",
                "traits": [
                    <DungTraitModel>{"name": "RNG items from shops sometimes have +1 choices"},
                    <DungTraitModel>{"name": "RNG items from anywhere but shops sometimes have +1 choices"},
                    <DungTraitModel>{"name": "Higher rarity RNG items, aka green or better, are 25% more likely"}
                ]
            }),
        new DungSetBase("Royale Traits", <DungSetModel>{
                "rankReq": 40,
                "name": "Royale Traits",
                "traits": [
                    <DungTraitModel>{"name": "100% chance to start each dungeon with 1 purple RNG item of 4 choices."},
                    <DungTraitModel>{"name": "Start each dungeon with 2 green, 2 grey, and 2 blue RNG item"}
                ]
            }),
        new DungSetBase("Endothelium Traits", <DungSetModel>{
                "rankReq": 50,
                "name": "Endothelium Traits",
                "traits": [
                    <DungTraitModel>{"name": "Max Hp is 1, but you start with 10 RNG items."},
                    <DungTraitModel>{"name": "Max HP is 1, but +10,000% Mana regen and -50% atk cooldown"},
                    <DungTraitModel>{"name": "Max HP is 1, but you have +300% basic attack spd and start with 5"},
                    <DungTraitModel>{"name": "Hmm.. I'll get back to you on this one"}
                ]
            })    
]
}
