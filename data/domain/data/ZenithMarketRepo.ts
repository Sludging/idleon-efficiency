import { ZenithMarketModel } from '../model/zenithMarketModel';

export class ZenithMarketBase { constructor(public index: number, public data: ZenithMarketModel) { } }



export const initZenithMarketRepo = () => {
    return [    
        new ZenithMarketBase(0, <ZenithMarketModel>{
                "name": "TRUE ZEN",
                "unlockCost": 1,
                "costExponent": 1.14,
                "maxLevel": 250,
                "bonusPerLevel": 2,
                "x1": 1,
                "description": "}x higher bonuses from Zenith Statues"
            }),
        new ZenithMarketBase(1, <ZenithMarketModel>{
                "name": "KRUK BUBBLES",
                "unlockCost": 2,
                "costExponent": 6,
                "maxLevel": 5,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "Adds a new bubble for Kattlekruk to boost!"
            }),
        new ZenithMarketBase(2, <ZenithMarketModel>{
                "name": "LAMP BOOST",
                "unlockCost": 5,
                "costExponent": 1.09,
                "maxLevel": 200,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "}x higher bonuses from The Lamp in Caverns"
            }),
        new ZenithMarketBase(3, <ZenithMarketModel>{
                "name": "DOUBLE CLUSTER",
                "unlockCost": 8,
                "costExponent": 1.17,
                "maxLevel": 100,
                "bonusPerLevel": 5,
                "x1": 1,
                "description": "+{% chance for a Double Zenith Cluster drop"
            }),
        new ZenithMarketBase(4, <ZenithMarketModel>{
                "name": "BUBBLE BOOST",
                "unlockCost": 15,
                "costExponent": 1.5,
                "maxLevel": 25,
                "bonusPerLevel": 2,
                "x1": 1,
                "description": "+{ daily LVs for all Kattlekruk bubbles"
            }),
        new ZenithMarketBase(5, <ZenithMarketModel>{
                "name": "SUPER DUPERS",
                "unlockCost": 50,
                "costExponent": 1.7,
                "maxLevel": 25,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "Super Talents get +{ more LVs"
            }),
        new ZenithMarketBase(6, <ZenithMarketModel>{
                "name": "MOST GRANDIOSE",
                "unlockCost": 250,
                "costExponent": 1.25,
                "maxLevel": 50,
                "bonusPerLevel": 4,
                "x1": 1,
                "description": "}x Grand Discovery Chance in Spelunking"
            }),
        new ZenithMarketBase(7, <ZenithMarketModel>{
                "name": "GIGA SYMBOLS",
                "unlockCost": 1000,
                "costExponent": 1.15,
                "maxLevel": 100,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "}x Sneaking Symbol success chance"
            }),
        new ZenithMarketBase(8, <ZenithMarketModel>{
                "name": "WOOZLE WUZZLE",
                "unlockCost": 5000,
                "costExponent": 1.125,
                "maxLevel": 30,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "+{% EXP Gain for the Research skill!"
            }),
        new ZenithMarketBase(9, <ZenithMarketModel>{
                "name": "CLASSY GOGO",
                "unlockCost": 25000,
                "costExponent": 1.115,
                "maxLevel": 100,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "}x Class EXP gain, for now..."
            })    
]
}
