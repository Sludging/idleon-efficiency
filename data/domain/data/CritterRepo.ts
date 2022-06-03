import { CritterModel } from '../model/critterModel';

export class CritterBase { constructor(public id: string, public data: CritterModel) { } }



export const initCritterRepo = () => {
    return [    
        new CritterBase("Critter1", <CritterModel>{
                "location": "Jungle Perimeter",
                "baseExp": 2,
                "baseShinyRate": 0.05,
                "shiny": "Critter1A",
                "effForBonus": 35
            }),
        new CritterBase("Critter2", <CritterModel>{
                "location": "Salty Shores",
                "baseExp": 8,
                "baseShinyRate": 0.03,
                "shiny": "Critter2A",
                "effForBonus": 400
            }),
        new CritterBase("Critter3", <CritterModel>{
                "location": "The Ring",
                "baseExp": 25,
                "baseShinyRate": 0.02,
                "shiny": "Critter3A",
                "effForBonus": 1500
            }),
        new CritterBase("Critter4", <CritterModel>{
                "location": "Rats Nest",
                "baseExp": 50,
                "baseShinyRate": 0.01,
                "shiny": "Critter4A",
                "effForBonus": 3500
            }),
        new CritterBase("Critter5", <CritterModel>{
                "location": "Hollowed Trunk",
                "baseExp": 80,
                "baseShinyRate": 0.006,
                "shiny": "Critter5A",
                "effForBonus": 8000
            }),
        new CritterBase("Critter6", <CritterModel>{
                "location": "The Stache Split",
                "baseExp": 125,
                "baseShinyRate": 0.003,
                "shiny": "Critter6A",
                "effForBonus": 15000
            }),
        new CritterBase("Critter7", <CritterModel>{
                "location": "Thermonuclear Climb",
                "baseExp": 160,
                "baseShinyRate": 0.0015,
                "shiny": "Critter7A",
                "effForBonus": 45000
            }),
        new CritterBase("Critter8", <CritterModel>{
                "location": "Efaunt's Tomb",
                "baseExp": 200,
                "baseShinyRate": 0.0006,
                "shiny": "Critter8A",
                "effForBonus": 100000
            }),
        new CritterBase("Critter9", <CritterModel>{
                "location": "Wam Wonderland",
                "baseExp": 260,
                "baseShinyRate": 0.0002,
                "shiny": "Critter9A",
                "effForBonus": 200000
            }),
        new CritterBase("Critter10", <CritterModel>{
                "location": "Cocoa Tunnel",
                "baseExp": 350,
                "baseShinyRate": 3e-05,
                "shiny": "Critter10A",
                "effForBonus": 500000
            })    
]
}
