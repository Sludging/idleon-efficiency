import { ClickerUpgradeModel } from "../model/clickerUpgradeModel";

export class ClickerUpgradeBase { constructor(public index: number, public type: string, public data: ClickerUpgradeModel) { } }

export const initClickerUpgradeRepo = (): ClickerUpgradeBase[] => {
    return [
        new ClickerUpgradeBase(0, "Orion", {
            name: "Feather Generation",
            x0: 5, 
            x1: 1.1, 
            unlock: 100,
            desc: "Generates } feather per second", 
            x2: 0
        }),
        new ClickerUpgradeBase(1, "Orion", {
            name: "Bonuses of Orion",
            x0: 350, 
            x1: 25, 
            unlock: 1000,
            desc: "Gain a permanent bonus in the real game! This upgrade never resets.", 
            x2: 0
        }),
        new ClickerUpgradeBase(2, "Orion", {
            name: "Feather Multiplier",
            x0: 500, 
            x1: 1.11, 
            unlock: 2500,
            desc: "Boosts feather generation by +}%", 
            x2: 0
        }),
        new ClickerUpgradeBase(3, "Orion", {
            name: "Feather Cheapener",
            x0: 3000, 
            x1: 1.16, 
            unlock: 30000,
            desc: "All feather upgrades are @% cheaper", 
            x2: 0
        }),
        new ClickerUpgradeBase(4, "Orion", {
            name: "Feather Restart",
            x0: 1000000, 
            x1: 14, 
            unlock: 750000,
            desc: "Reset almost all Upgrades and Feathers. Generate {x Feathers", 
            x2: 0
        }),
        new ClickerUpgradeBase(5, "Orion", {
            name: "Super Feather Production",
            x0: 2000000, 
            x1: 1.12, 
            unlock: 10000000,
            desc: "Generates +} more feathers per second", 
            x2: 0
        }),
        new ClickerUpgradeBase(6, "Orion", {
            name: "Shiny Feathers",
            x0: 5000000, 
            x1: 1.4, 
            unlock: 250000000,
            desc: "Rare chance for a Shiny Feather, each one gives +}% feather generation", 
            x2: 0
        }),
        new ClickerUpgradeBase(7, "Orion", {
            name: "Super Feather Cheapener",
            x0: 50000000, 
            x1: 1.27, 
            unlock: 5000000000,
            desc: "All feather upgrades are }% cheaper", 
            x2: 0
        }),
        new ClickerUpgradeBase(8, "Orion", {
            name: "The Great Mega Reset",
            x0: 250000000000, 
            x1: 20, 
            unlock: 100000000000,
            desc: "Reset almost everything. Gain a permanent Megafeather", 
            x2: 0
        }),
        new ClickerUpgradeBase(9, "Poppy", {
            name: "Tasty Fishbait",
            x0: 4, 
            x1: 1.06, 
            unlock: 100,
            desc: "Catch { Fish every 30 seconds", 
            x2: 10
        }),
        new ClickerUpgradeBase(10, "Poppy", {
            name: "Quick Reeling",
            x0: 150, 
            x1: 1.2, 
            unlock: 500,
            desc: "Bluefin fishing speed is ]x Faster", 
            x2: 5
        }),
        new ClickerUpgradeBase(11, "Poppy", {
            name: "Shiny Lure",
            x0: 500, 
            x1: 3.5, 
            unlock: 2500,
            desc: "Catch Shiny Fish at a rate of {%/hr", 
            x2: 50
        }),
        new ClickerUpgradeBase(12, "Poppy", {
            name: "Bonuses from Poppy",
            x0: 10000, 
            x1: 3, 
            unlock: 30000,
            desc: "Gain a permanent bonus in the real game!", 
            x2: 10
        }),
        new ClickerUpgradeBase(13, "Poppy", {
            name: "Fishy Discount",
            x0: 30000, 
            x1: 1.13, 
            unlock: 250000,
            desc: "All fish upgrades are ~% cheaper", 
            x2: 10
        }),
        new ClickerUpgradeBase(14, "Poppy", {
            name: "Juicy Worm",
            x0: 150000, 
            x1: 1.07, 
            unlock: 3000000,
            desc: "Catch +{ more Bluefin Fish each time", 
            x2: 50
        }),
        new ClickerUpgradeBase(15, "Poppy", {
            name: "Fisheroo Reset",
            x0: 40000000, 
            x1: 20, 
            unlock: 25000000,
            desc: "Reset all upgrades and fish for bonuses!", 
            x2: 1
        }),
        new ClickerUpgradeBase(16, "Poppy", {
            name: "Fishing Buddy",
            x0: 1200000000, 
            x1: 7.5, 
            unlock: 600000000,
            desc: "Recruit a new Bluefin fisherman!", 
            x2: 1
        }),
        new ClickerUpgradeBase(17, "Poppy", {
            name: "Lightning Quickness",
            x0: 600000000, 
            x1: 1.12, 
            unlock: 4000000000,
            desc: "Shiny fishing speed is ]x faster", 
            x2: 5
        }),
        new ClickerUpgradeBase(18, "Poppy", {
            name: "Fisheroo Investing",
            x0: 7500000000, 
            x1: 1.7, 
            unlock: 14000000000,
            desc: "Next Fisheroo Reset gives +{ more pts!", 
            x2: 1
        }),
        new ClickerUpgradeBase(19, "Poppy", {
            name: "Multihook Fishing",
            x0: 20000000000, 
            x1: 1.12, 
            unlock: 80000000000,
            desc: "Catch +{ more Bluefin Fish each time", 
            x2: 200
        }),
        new ClickerUpgradeBase(20, "Poppy", {
            name: "Greatest Catch",
            x0: 1500000000000, 
            x1: 15, 
            unlock: 400000000000,
            desc: "Reset it all. Gain a permanent Megafish", 
            x2: 5
        }),
        new ClickerUpgradeBase(21, "Tar Pit", {
            name: "Super Yummy bait",
            x0: 1, 
            x1: 1.15, 
            unlock: 0,
            desc: "Catch +{ more Bluefin Fish each time", 
            x2: 100
        }),
        new ClickerUpgradeBase(22, "Tar Pit", {
            name: "Bonus Catching",
            x0: 1, 
            x1: 1.1, 
            unlock: 0,
            desc: "+?% chance for extra shiny catches", 
            x2: 700
        }),
        new ClickerUpgradeBase(23, "Tar Pit", {
            name: "Bluefin Frenzy",
            x0: 1, 
            x1: 1.2, 
            unlock: 0,
            desc: "Boosts the amount of Bluefin Fish caught by +{%", 
            x2: 8
        }),
        new ClickerUpgradeBase(24, "Tar Pit", {
            name: "Fishy Reductions",
            x0: 4, 
            x1: 1.15, 
            unlock: 0,
            desc: "All bluefin fish upgrades are ~% cheaper", 
            x2: 15
        }),
        new ClickerUpgradeBase(25, "Tar Pit", {
            name: "Super Tarbait",
            x0: 2, 
            x1: 1.15, 
            unlock: 0,
            desc: "Catch Tartar Fish ]x faster", 
            x2: 5
        }),
        new ClickerUpgradeBase(26, "Tar Pit", {
            name: "Tarrific Resets",
            x0: 3, 
            x1: 2, 
            unlock: 0,
            desc: "Next Fisheroo Reset gives +{ more pts to spend!", 
            x2: 1
        }),
        new ClickerUpgradeBase(27, "Tar Pit", {
            name: "Mongo Multipliers",
            x0: 2, 
            x1: 1.1, 
            unlock: 0,
            desc: "Multipliers in Shiny Fishing show up ?% more often!", 
            x2: 30
        }),
        new ClickerUpgradeBase(28, "Tar Pit", {
            name: "King Worm",
            x0: 5, 
            x1: 1.2, 
            unlock: 0,
            desc: "Catch +{ more Bluefin Fish every 100 seconds", 
            x2: 1000
        })
    ];
}