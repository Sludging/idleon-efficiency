import { FeatherModel } from '../model/featherModel';

export class FeatherBase { constructor(public index: number, public data: FeatherModel) { } }



export const initFeatherRepo = () => {
    return [    
        new FeatherBase(0, <FeatherModel>{
                "name": "Feather Generation",
                "x1": 5,
                "x2": 1.1,
                "x3": 100,
                "bonus1": "{/sec",
                "bonus2": "Generates } feather per second",
                "x4": 0
            }),
        new FeatherBase(1, <FeatherModel>{
                "name": "Bonuses of Orion",
                "x1": 350,
                "x2": 25,
                "x3": 1000,
                "bonus1": "+{% Class XP",
                "bonus2": "Gain a permanent bonus for outside this map! This upgrade never resets...",
                "x4": 0
            }),
        new FeatherBase(2, <FeatherModel>{
                "name": "Feather Multiplier",
                "x1": 500,
                "x2": 1.11,
                "x3": 2500,
                "bonus1": "+{ Base DMG",
                "bonus2": "Boosts feather generation by +}%",
                "x4": 0
            }),
        new FeatherBase(3, <FeatherModel>{
                "name": "Feather Cheapener",
                "x1": 3000,
                "x2": 1.16,
                "x3": 30000,
                "bonus1": "+{% Total DMG",
                "bonus2": "All feather upgrades are @% cheaper",
                "x4": 0
            }),
        new FeatherBase(4, <FeatherModel>{
                "name": "Feather Restart",
                "x1": 1e+06,
                "x2": 14,
                "x3": 750000,
                "bonus1": "+{% Skill XP",
                "bonus2": "Reset almost all Upgrades and Feathers. Generate {x Feathers",
                "x4": 0
            }),
        new FeatherBase(5, <FeatherModel>{
                "name": "Super Feather Production",
                "x1": 2e+06,
                "x2": 1.12,
                "x3": 1e+07,
                "bonus1": "+{% Drop Rate",
                "bonus2": "Generates +} more feathers per second",
                "x4": 0
            }),
        new FeatherBase(6, <FeatherModel>{
                "name": "Shiny Feathers",
                "x1": 5e+06,
                "x2": 1.4,
                "x3": 2.5e+08,
                "bonus1": "+{ All Stat",
                "bonus2": "Rare chance for a Shiny Feather, each one gives +}% feather generation",
                "x4": 0
            }),
        new FeatherBase(7, <FeatherModel>{
                "name": "Super Feather Cheapener",
                "x1": 5e+07,
                "x2": 1.27,
                "x3": 5e+09,
                "bonus1": "{",
                "bonus2": "All feather upgrades are }% cheaper",
                "x4": 0
            }),
        new FeatherBase(8, <FeatherModel>{
                "name": "The Great Mega Reset",
                "x1": 2.5e+11,
                "x2": 20,
                "x3": 1e+11,
                "bonus1": "Nah",
                "bonus2": "Reset almost everything. Gain a permanent Megafeather",
                "x4": 0
            }),
        new FeatherBase(9, <FeatherModel>{
                "name": "tasty Fishbait",
                "x1": 4,
                "x2": 1.06,
                "x3": 100,
                "bonus1": "{/minute",
                "bonus2": "Catch { Fish every 30 seconds",
                "x4": 10
            }),
        new FeatherBase(10, <FeatherModel>{
                "name": "Quick Reeling",
                "x1": 150,
                "x2": 1.2,
                "x3": 500,
                "bonus1": "+{% Fish Efficiency",
                "bonus2": "Bluefin fishing speed is ]x Faster",
                "x4": 5
            }),
        new FeatherBase(11, <FeatherModel>{
                "name": "Shiny Lure",
                "x1": 500,
                "x2": 3.5,
                "x3": 2500,
                "bonus1": "+{ Defence",
                "bonus2": "Catch Shiny Fish at a rate of {%/hr",
                "x4": 50
            }),
        new FeatherBase(12, <FeatherModel>{
                "name": "Bonuses from Poppy",
                "x1": 10000,
                "x2": 3,
                "x3": 30000,
                "bonus1": "+{% Fishing XP",
                "bonus2": "Gain a permanent bonus for outside this map!",
                "x4": 10
            }),
        new FeatherBase(13, <FeatherModel>{
                "name": "fishy discount",
                "x1": 30000,
                "x2": 1.13,
                "x3": 250000,
                "bonus1": "+{% Accuracy",
                "bonus2": "All fish upgrades are ~% cheaper",
                "x4": 10
            }),
        new FeatherBase(14, <FeatherModel>{
                "name": "Juicy Worm",
                "x1": 150000,
                "x2": 1.07,
                "x3": 3e+06,
                "bonus1": "+{% Total DMG",
                "bonus2": "Catch +{ more Bluefin Fish each time",
                "x4": 50
            }),
        new FeatherBase(15, <FeatherModel>{
                "name": "Fisheroo Reset",
                "x1": 4e+07,
                "x2": 20,
                "x3": 2.5e+07,
                "bonus1": "+{% AFK Gains",
                "bonus2": "Reset all upgrades and fish for bonuses!",
                "x4": 1
            }),
        new FeatherBase(16, <FeatherModel>{
                "name": "Fishing Buddy",
                "x1": 1.2e+09,
                "x2": 7.5,
                "x3": 6e+08,
                "bonus1": "+{% Cash",
                "bonus2": "Recruit a new Bluefin fisherman!",
                "x4": 1
            }),
        new FeatherBase(17, <FeatherModel>{
                "name": "Lightning Quickness",
                "x1": 6e+08,
                "x2": 1.12,
                "x3": 4e+09,
                "bonus1": "Nah",
                "bonus2": "Shiny fishing speed is ]x faster",
                "x4": 5
            }),
        new FeatherBase(18, <FeatherModel>{
                "name": "Fisheroo Investing",
                "x1": 7.5e+09,
                "x2": 1.7,
                "x3": 1.4e+10,
                "bonus1": "Nah",
                "bonus2": "Next Fisheroo Reset gives +{ more pts!",
                "x4": 1
            }),
        new FeatherBase(19, <FeatherModel>{
                "name": "Multihook Fishing",
                "x1": 2e+10,
                "x2": 1.12,
                "x3": 8e+10,
                "bonus1": "Nah",
                "bonus2": "Catch +{ more Bluefin Fish each time",
                "x4": 200
            }),
        new FeatherBase(20, <FeatherModel>{
                "name": "Greatest Catch",
                "x1": 1.5e+12,
                "x2": 15,
                "x3": 4e+11,
                "bonus1": "Nah",
                "bonus2": "Reset it all. Gain a permanent Megafish",
                "x4": 5
            }),
        new FeatherBase(21, <FeatherModel>{
                "name": "Super Yummy bait",
                "x1": 1,
                "x2": 1.15,
                "x3": -1,
                "bonus1": "+{% Accuracy",
                "bonus2": "Catch +{ more Bluefin Fish each time",
                "x4": 100
            }),
        new FeatherBase(22, <FeatherModel>{
                "name": "Bonus Catching",
                "x1": 1,
                "x2": 1.1,
                "x3": -1,
                "bonus1": "+{% Total DMG",
                "bonus2": "+?% chance for extra shiny catches",
                "x4": 700
            }),
        new FeatherBase(23, <FeatherModel>{
                "name": "Bluefin Frenzy",
                "x1": 1,
                "x2": 1.2,
                "x3": -1,
                "bonus1": "+{% AFK Gains",
                "bonus2": "Boosts the amount of Bluefin Fish caught by +{%",
                "x4": 8
            }),
        new FeatherBase(24, <FeatherModel>{
                "name": "Fishy Reductions",
                "x1": 4,
                "x2": 1.15,
                "x3": -1,
                "bonus1": "+{% Cash",
                "bonus2": "All bluefin fish upgrades are ~% cheaper",
                "x4": 15
            }),
        new FeatherBase(25, <FeatherModel>{
                "name": "Super Tarbait",
                "x1": 2,
                "x2": 1.15,
                "x3": -1,
                "bonus1": "Nah",
                "bonus2": "Catch Tartar Fish ]x faster",
                "x4": 5
            }),
        new FeatherBase(26, <FeatherModel>{
                "name": "Tarrific Resets",
                "x1": 3,
                "x2": 2,
                "x3": -1,
                "bonus1": "Nah",
                "bonus2": "Next Fisheroo Reset gives +{ more pts to spend!",
                "x4": 1
            }),
        new FeatherBase(27, <FeatherModel>{
                "name": "Mongo Multipliers",
                "x1": 2,
                "x2": 1.1,
                "x3": -1,
                "bonus1": "Nah",
                "bonus2": "Multipliers in Shiny Fishing show up ?% more often!",
                "x4": 30
            }),
        new FeatherBase(28, <FeatherModel>{
                "name": "King Worm",
                "x1": 5,
                "x2": 1.2,
                "x3": -1,
                "bonus1": "Nah",
                "bonus2": "Catch +{ more Bluefin Fish every 100 seconds",
                "x4": 1000
            })    
]
}
