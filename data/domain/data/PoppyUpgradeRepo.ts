import { PoppyUpgradeModel } from '../model/poppyUpgradeModel';

export class PoppyUpgradeBase { constructor(public index: number, public data: PoppyUpgradeModel) { } }



export const initPoppyUpgradeRepo = () => {
    return [    
        new PoppyUpgradeBase(0, <PoppyUpgradeModel>{
                "name": "tasty Fishbait",
                "x0": 4,
                "x1": 1.06,
                "unlock": 100,
                "desc": "Catch { Fish every 30 seconds",
                "x2": 10
            }),
        new PoppyUpgradeBase(1, <PoppyUpgradeModel>{
                "name": "Quick Reeling",
                "x0": 150,
                "x1": 1.2,
                "unlock": 500,
                "desc": "Bluefin fishing speed is ]x Faster",
                "x2": 5
            }),
        new PoppyUpgradeBase(2, <PoppyUpgradeModel>{
                "name": "Shiny Lure",
                "x0": 500,
                "x1": 3.5,
                "unlock": 2500,
                "desc": "Catch Shiny Fish at a rate of {%/hr",
                "x2": 50
            }),
        new PoppyUpgradeBase(3, <PoppyUpgradeModel>{
                "name": "Bonuses from Poppy",
                "x0": 10000,
                "x1": 3,
                "unlock": 30000,
                "desc": "Gain a permanent bonus in the real game!",
                "x2": 10
            }),
        new PoppyUpgradeBase(4, <PoppyUpgradeModel>{
                "name": "fishy discount",
                "x0": 30000,
                "x1": 1.13,
                "unlock": 250000,
                "desc": "All fish upgrades are ~% cheaper",
                "x2": 10
            }),
        new PoppyUpgradeBase(5, <PoppyUpgradeModel>{
                "name": "Juicy Worm",
                "x0": 150000,
                "x1": 1.07,
                "unlock": 3e+06,
                "desc": "Catch +{ more Bluefin Fish each time",
                "x2": 50
            }),
        new PoppyUpgradeBase(6, <PoppyUpgradeModel>{
                "name": "Fisheroo Reset",
                "x0": 4e+07,
                "x1": 20,
                "unlock": 2.5e+07,
                "desc": "Reset all upgrades and fish for bonuses!",
                "x2": 1
            }),
        new PoppyUpgradeBase(7, <PoppyUpgradeModel>{
                "name": "Fishing Buddy",
                "x0": 1.2e+09,
                "x1": 7.5,
                "unlock": 6e+08,
                "desc": "Recruit a new Bluefin fisherman!",
                "x2": 1
            }),
        new PoppyUpgradeBase(8, <PoppyUpgradeModel>{
                "name": "Lightning Quickness",
                "x0": 6e+08,
                "x1": 1.12,
                "unlock": 4e+09,
                "desc": "Shiny fishing speed is ]x faster",
                "x2": 5
            }),
        new PoppyUpgradeBase(9, <PoppyUpgradeModel>{
                "name": "Fisheroo Investing",
                "x0": 7.5e+09,
                "x1": 1.7,
                "unlock": 1.4e+10,
                "desc": "Next Fisheroo Reset gives +{ more pts!",
                "x2": 1
            }),
        new PoppyUpgradeBase(10, <PoppyUpgradeModel>{
                "name": "Multihook Fishing",
                "x0": 2e+10,
                "x1": 1.12,
                "unlock": 8e+10,
                "desc": "Catch +{ more Bluefin Fish each time",
                "x2": 200
            }),
        new PoppyUpgradeBase(11, <PoppyUpgradeModel>{
                "name": "Greatest Catch",
                "x0": 1.5e+12,
                "x1": 15,
                "unlock": 4e+11,
                "desc": "Reset it all. Gain a permanent Megafish",
                "x2": 5
            }),
        new PoppyUpgradeBase(12, <PoppyUpgradeModel>{
                "name": "Super Yummy bait",
                "x0": 1,
                "x1": 1.15,
                "unlock": 0,
                "desc": "Catch +{ more Bluefin Fish each time",
                "x2": 100
            }),
        new PoppyUpgradeBase(13, <PoppyUpgradeModel>{
                "name": "Bonus Catching",
                "x0": 1,
                "x1": 1.1,
                "unlock": 0,
                "desc": "+?% chance for extra shiny catches",
                "x2": 700
            }),
        new PoppyUpgradeBase(14, <PoppyUpgradeModel>{
                "name": "Bluefin Frenzy",
                "x0": 1,
                "x1": 1.2,
                "unlock": 0,
                "desc": "Boosts the amount of Bluefin Fish caught by +{%",
                "x2": 8
            }),
        new PoppyUpgradeBase(15, <PoppyUpgradeModel>{
                "name": "Fishy Reductions",
                "x0": 4,
                "x1": 1.15,
                "unlock": 0,
                "desc": "All bluefin fish upgrades are ~% cheaper",
                "x2": 15
            }),
        new PoppyUpgradeBase(16, <PoppyUpgradeModel>{
                "name": "Super Tarbait",
                "x0": 2,
                "x1": 1.15,
                "unlock": 0,
                "desc": "Catch Tartar Fish ]x faster",
                "x2": 5
            }),
        new PoppyUpgradeBase(17, <PoppyUpgradeModel>{
                "name": "Tarrific Resets",
                "x0": 3,
                "x1": 2,
                "unlock": 0,
                "desc": "Next Fisheroo Reset gives +{ more pts to spend!",
                "x2": 1
            }),
        new PoppyUpgradeBase(18, <PoppyUpgradeModel>{
                "name": "Mongo Multipliers",
                "x0": 2,
                "x1": 1.1,
                "unlock": 0,
                "desc": "Multipliers in Shiny Fishing show up ?% more often!",
                "x2": 30
            }),
        new PoppyUpgradeBase(19, <PoppyUpgradeModel>{
                "name": "King Worm",
                "x0": 5,
                "x1": 1.2,
                "unlock": 0,
                "desc": "Catch +{ more Bluefin Fish every 100 seconds",
                "x2": 1000
            })    
]
}
