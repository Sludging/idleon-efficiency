import { ClickerUpgradeModel } from "../model/clickerUpgradeModel";

export class PoppyUpgradeBase { constructor(public index: number, public data: ClickerUpgradeModel) { } }

export const initPoppyUpgradeRepo = (): PoppyUpgradeBase[] => {
    return [
        new PoppyUpgradeBase(0, {
            name: "Tasty Fishbait",
            x0: 4, 
            x1: 1.06, 
            unlock: 100,
            desc: "Catch { Fish every 30 seconds",
            x2: 10
        }),
        new PoppyUpgradeBase(1, {
            name: "Quick Reeling",
            x0: 150, 
            x1: 1.2, 
            unlock: 500,
            desc: "Bluefin fishing speed is ]x Faster", 
            x2: 5
        }),
        new PoppyUpgradeBase(2, {
            name: "Shiny Lure",
            x0: 500, 
            x1: 3.5, 
            unlock: 2500,
            desc: "Catch Shiny Fish at a rate of {%/hr", 
            x2: 50
        }),
        new PoppyUpgradeBase(3, {
            name: "Bonuses from Poppy",
            x0: 10000, 
            x1: 3, 
            unlock: 30000,
            desc: "Gain a permanent bonus in the real game!", 
            x2: 10
        }),
        new PoppyUpgradeBase(4, {
            name: "Fishy Discount",
            x0: 30000, 
            x1: 1.13, 
            unlock: 250000,
            desc: "All fish upgrades are ~% cheaper", 
            x2: 10
        }),
        new PoppyUpgradeBase(5, {
            name: "Juicy Worm",
            x0: 150000, 
            x1: 1.07, 
            unlock: 3000000,
            desc: "Catch +{ more Bluefin Fish each time", 
            x2: 50
        }),
        new PoppyUpgradeBase(6, {
            name: "Fisheroo Reset",
            x0: 40000000, 
            x1: 20, 
            unlock: 25000000,
            desc: "Reset all upgrades and fish for bonuses!", 
            x2: 1
        }),
        new PoppyUpgradeBase(7, {
            name: "Fishing Buddy",
            x0: 1200000000, 
            x1: 7.5, 
            unlock: 600000000,
            desc: "Recruit a new Bluefin fisherman!", 
            x2: 1
        }),
        new PoppyUpgradeBase(8, {
            name: "Lightning Quickness",
            x0: 600000000, 
            x1: 1.12, 
            unlock: 4000000000,
            desc: "Shiny fishing speed is ]x faster", 
            x2: 5
        }),
        new PoppyUpgradeBase(9, {
            name: "Fisheroo Investing",
            x0: 7500000000, 
            x1: 1.7, 
            unlock: 14000000000,
            desc: "Next Fisheroo Reset gives +{ more pts!", 
            x2: 1
        }),
        new PoppyUpgradeBase(10, {
            name: "Multihook Fishing",
            x0: 20000000000, 
            x1: 1.12, 
            unlock: 80000000000,
            desc: "Catch +{ more Bluefin Fish each time", 
            x2: 200
        }),
        new PoppyUpgradeBase(11, {
            name: "Greatest Catch",
            x0: 1500000000000, 
            x1: 15, 
            unlock: 400000000000,
            desc: "Reset it all. Gain a permanent Megafish", 
            x2: 5
        })
    ];
}

export const initPoppyTarpitUpgradeRepo = (): PoppyUpgradeBase[] => {
    return [
        new PoppyUpgradeBase(0, {
            name: "Super Yummy bait",
            x0: 1, 
            x1: 1.15, 
            unlock: 0,
            desc: "Catch +{ more Bluefin Fish each time", 
            x2: 100
        }),
        new PoppyUpgradeBase(1, {
            name: "Bonus Catching",
            x0: 1, 
            x1: 1.1, 
            unlock: 0,
            desc: "+?% chance for extra shiny catches", 
            x2: 700
        }),
        new PoppyUpgradeBase(2, {
            name: "Bluefin Frenzy",
            x0: 1,
            x1: 1.2, 
            unlock: 0,
            desc: "Boosts the amount of Bluefin Fish caught by +{%", 
            x2: 8
        }),
        new PoppyUpgradeBase(3, {
            name: "Fishy Reductions",
            x0: 4, 
            x1: 1.15, 
            unlock: 0,
            desc: "All bluefin fish upgrades are ~% cheaper", 
            x2: 15
        }),
        new PoppyUpgradeBase(4, {
            name: "Super Tarbait",
            x0: 2, 
            x1: 1.15, 
            unlock: 0,
            desc: "Catch Tartar Fish ]x faster", 
            x2: 5
        }),
        new PoppyUpgradeBase(5, {
            name: "Tarrific Resets",
            x0: 3, 
            x1: 2, 
            unlock: 0,
            desc: "Next Fisheroo Reset gives +{ more pts to spend!", 
            x2: 1
        }),
        new PoppyUpgradeBase(6, {
            name: "Mongo Multipliers",
            x0: 2, 
            x1: 1.1, 
            unlock: 0,
            desc: "Multipliers in Shiny Fishing show up ?% more often!", 
            x2: 30
        }),
        new PoppyUpgradeBase(7, {
            name: "King Worm",
            x0: 5, 
            x1: 1.2, 
            unlock: 0,
            desc: "Catch +{ more Bluefin Fish every 100 seconds", 
            x2: 1000
        })
    ];
}