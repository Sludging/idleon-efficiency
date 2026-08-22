import { SushiStationUpgradeModel } from '../model/sushiStationUpgradeModel';

export class SushiStationUpgradeBase { constructor(public index: number, public data: SushiStationUpgradeModel) { } }



export const initSushiStationUpgradeRepo = () => {
    return [    
        new SushiStationUpgradeBase(0, <SushiStationUpgradeModel>{
                "index": 0,
                "displayOrder": 6,
                "name": "Sushi Slot",
                "maxLevel": 50,
                "costExponent": 3.5,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Adds a new slot for your Sushi Station!"
            }),
        new SushiStationUpgradeBase(1, <SushiStationUpgradeModel>{
                "index": 1,
                "displayOrder": 3,
                "name": "Fuel Capacity I",
                "maxLevel": 9999,
                "costExponent": 1.08,
                "bonusPerLevel": 50,
                "costMultiplier": 0,
                "description": "+{ max Fuel Capacity!"
            }),
        new SushiStationUpgradeBase(2, <SushiStationUpgradeModel>{
                "index": 2,
                "displayOrder": 8,
                "name": "Fuel Capacity II",
                "maxLevel": 9999,
                "costExponent": 1.1,
                "bonusPerLevel": 200,
                "costMultiplier": 0,
                "description": "+{ max Fuel Capacity, and a unique @ $x Fuel Cap bonus!"
            }),
        new SushiStationUpgradeBase(3, <SushiStationUpgradeModel>{
                "index": 3,
                "displayOrder": 18,
                "name": "Fuel Capacity III",
                "maxLevel": 9999,
                "costExponent": 1.12,
                "bonusPerLevel": 1500,
                "costMultiplier": 0,
                "description": "+{ max Fuel Capacity, and a unique @ $x Fuel Cap bonus!"
            }),
        new SushiStationUpgradeBase(4, <SushiStationUpgradeModel>{
                "index": 4,
                "displayOrder": 29,
                "name": "Fuel Capacity IV",
                "maxLevel": 9999,
                "costExponent": 1.13,
                "bonusPerLevel": 10000,
                "costMultiplier": 0,
                "description": "+{ max Fuel Capacity, and a unique @ $x Fuel Cap bonus!"
            }),
        new SushiStationUpgradeBase(5, <SushiStationUpgradeModel>{
                "index": 5,
                "displayOrder": 39,
                "name": "Fuel Capacity V",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "bonusPerLevel": 50000,
                "costMultiplier": 0,
                "description": "+{ max Fuel Capacity, and a unique @ $x Fuel Cap bonus!"
            }),
        new SushiStationUpgradeBase(6, <SushiStationUpgradeModel>{
                "index": 6,
                "displayOrder": 7,
                "name": "Superior Sushi Skillz",
                "maxLevel": 35,
                "costExponent": 3.8,
                "bonusPerLevel": 1,
                "costMultiplier": 0.2,
                "description": "You can now click the Sushi on your fuel bar to change which sushi you cook, up to Tier $. This also increases fuel cost."
            }),
        new SushiStationUpgradeBase(7, <SushiStationUpgradeModel>{
                "index": 7,
                "displayOrder": 21,
                "name": "Quality Freshness",
                "maxLevel": 25,
                "costExponent": 6.5,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "{% chance for freshly cooked Sushi to be +1 higher Tier! Cook T1, get T2!"
            }),
        new SushiStationUpgradeBase(8, <SushiStationUpgradeModel>{
                "index": 8,
                "displayOrder": 1,
                "name": "Fastburn Fuel I",
                "maxLevel": 9999,
                "costExponent": 1.1,
                "bonusPerLevel": 15,
                "costMultiplier": 0,
                "description": "+{% faster Fuel generation! @ Your current rate is $"
            }),
        new SushiStationUpgradeBase(9, <SushiStationUpgradeModel>{
                "index": 9,
                "displayOrder": 5,
                "name": "Fastburn Fuel II",
                "maxLevel": 9999,
                "costExponent": 1.12,
                "bonusPerLevel": 100,
                "costMultiplier": 0,
                "description": "+{% faster Fuel generation, and a unique @ $x Fuel Generation multi bonus!"
            }),
        new SushiStationUpgradeBase(10, <SushiStationUpgradeModel>{
                "index": 10,
                "displayOrder": 17,
                "name": "Fastburn Fuel III",
                "maxLevel": 9999,
                "costExponent": 1.14,
                "bonusPerLevel": 750,
                "costMultiplier": 0,
                "description": "+{% faster Fuel generation, and a unique @ $x Fuel Generation multi bonus!"
            }),
        new SushiStationUpgradeBase(11, <SushiStationUpgradeModel>{
                "index": 11,
                "displayOrder": 26,
                "name": "Fastburn Fuel IV",
                "maxLevel": 9999,
                "costExponent": 1.16,
                "bonusPerLevel": 5000,
                "costMultiplier": 0,
                "description": "+{% faster Fuel generation, and a unique @ $x Fuel Generation multi bonus!"
            }),
        new SushiStationUpgradeBase(12, <SushiStationUpgradeModel>{
                "index": 12,
                "displayOrder": 34,
                "name": "Fastburn Fuel V",
                "maxLevel": 9999,
                "costExponent": 1.17,
                "bonusPerLevel": 25000,
                "costMultiplier": 0,
                "description": "+{% faster Fuel generation, and a unique @ $x Fuel Generation multi bonus!"
            }),
        new SushiStationUpgradeBase(13, <SushiStationUpgradeModel>{
                "index": 13,
                "displayOrder": 14,
                "name": "Seared Knowledge",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 1.5,
                "description": "Whenever a sushi is created in any way, that sushi type gains +1 EXP. Level up sushi for unique knowledge bonuses!"
            }),
        new SushiStationUpgradeBase(14, <SushiStationUpgradeModel>{
                "index": 14,
                "displayOrder": 12,
                "name": "Hot Slot",
                "maxLevel": 20,
                "costExponent": 20,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Adds a new SPECIAL slot for your Sushi Station... the Hot Plate! Sushi on these slots generate $x more Bucks!"
            }),
        new SushiStationUpgradeBase(15, <SushiStationUpgradeModel>{
                "index": 15,
                "displayOrder": 33,
                "name": "Cold Slot",
                "maxLevel": 8,
                "costExponent": 150,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Adds a new SPECIAL slot for your Sushi Station... the Cold Plate! Sushi on these slots generate +$ EXP/day for ALL sushi lower tiered than this one!"
            }),
        new SushiStationUpgradeBase(16, <SushiStationUpgradeModel>{
                "index": 16,
                "displayOrder": 23,
                "name": "Milktoast Slot",
                "maxLevel": 12,
                "costExponent": 70,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Adds a new SPECIAL slot for your Sushi Station... the Milktoast Plate! Sushi on these slots generate +$ EXP/day"
            }),
        new SushiStationUpgradeBase(17, <SushiStationUpgradeModel>{
                "index": 17,
                "displayOrder": 10,
                "name": "Salt Shaker",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 2,
                "description": "Click to use once per day. When used, all sushi have a chance of getting a Tier Up! By default, you get +1 shaker use every day, just sayin'."
            }),
        new SushiStationUpgradeBase(18, <SushiStationUpgradeModel>{
                "index": 18,
                "displayOrder": 22,
                "name": "Pepper Shaker",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 3,
                "description": "Click to use once per day. When used, all sushi have a chance to be Perfecto'd, which means its Knowledge Bonus is 2x bigger!"
            }),
        new SushiStationUpgradeBase(19, <SushiStationUpgradeModel>{
                "index": 19,
                "displayOrder": 32,
                "name": "Saffron Shaker",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 4,
                "description": "Click to use once per day. When used, all sushi generate 1 hour's worth of Bucks!"
            }),
        new SushiStationUpgradeBase(20, <SushiStationUpgradeModel>{
                "index": 20,
                "displayOrder": 19,
                "name": "Shake N' Bake",
                "maxLevel": 10,
                "costExponent": 100,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Whenever you use any Shaker, you instantly generate 1 hour's worth of Fuel! Also, {% chance to get 10 hour's worth instead!"
            }),
        new SushiStationUpgradeBase(21, <SushiStationUpgradeModel>{
                "index": 21,
                "displayOrder": 28,
                "name": "Bottomless Shakers",
                "maxLevel": 20,
                "costExponent": 12,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Whenever you use any Shaker, there's a {% chance to get another usage! Free use, basically..."
            }),
        new SushiStationUpgradeBase(22, <SushiStationUpgradeModel>{
                "index": 22,
                "displayOrder": 35,
                "name": "Sasaphrax Saffron",
                "maxLevel": 23,
                "costExponent": 11,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Saffron Shaker now generates $ hour's worth of Bucks, not just 1 hour!"
            }),
        new SushiStationUpgradeBase(23, <SushiStationUpgradeModel>{
                "index": 23,
                "displayOrder": 15,
                "name": "Charcoal Fireplace",
                "maxLevel": 15,
                "costExponent": 40,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Unlock a new Fireplace! This default red charcoal fire increases Fuel generation by +1% per Tier of Sushi in the column above it."
            }),
        new SushiStationUpgradeBase(24, <SushiStationUpgradeModel>{
                "index": 24,
                "displayOrder": 31,
                "name": "Copper Firelighter",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 3,
                "description": "Fireplaces can be changed to blue. Sushi above blue fires have a {% chance of getting +2 tiers instead of +1, so long as it's not your highest tier."
            }),
        new SushiStationUpgradeBase(25, <SushiStationUpgradeModel>{
                "index": 25,
                "displayOrder": 40,
                "name": "Potassium Firelighter",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 5,
                "description": "Fireplaces can be changed to purple, which each give +1蒲/sec @ $"
            }),
        new SushiStationUpgradeBase(26, <SushiStationUpgradeModel>{
                "index": 26,
                "displayOrder": 38,
                "name": "Lithium Firelighter",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 4,
                "description": "Fireplaces can be changed to pink. Sushi above pink fires generate $x more Knowledge EXP by all methods and means of doing so! Think about it."
            }),
        new SushiStationUpgradeBase(27, <SushiStationUpgradeModel>{
                "index": 27,
                "displayOrder": 24,
                "name": "Barium Firelighter",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 2,
                "description": "Fireplaces can be changed to green. Sushi above green fires generate $x more Bucks."
            }),
        new SushiStationUpgradeBase(28, <SushiStationUpgradeModel>{
                "index": 28,
                "displayOrder": 37,
                "name": "Overtuned Fuel",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "When you generate fuel while at max capacity, you get +1 识 @ $"
            }),
        new SushiStationUpgradeBase(29, <SushiStationUpgradeModel>{
                "index": 29,
                "displayOrder": 25,
                "name": "Heat of the East Wind",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "When a sushi is combined, it tiers-up the sushi to its right, but only if that sushi is lower tiered. @ This only works on sushi Tier $ and lower."
            }),
        new SushiStationUpgradeBase(30, <SushiStationUpgradeModel>{
                "index": 30,
                "displayOrder": 4,
                "name": "Customer Surcharge I",
                "maxLevel": 9999,
                "costExponent": 1.14,
                "bonusPerLevel": 2,
                "costMultiplier": 0,
                "description": "All your sushi generate Bucks based on their tier. Higher tier sushi generate way more! @ This upgrade boosts all Bucks generated by +{%"
            }),
        new SushiStationUpgradeBase(31, <SushiStationUpgradeModel>{
                "index": 31,
                "displayOrder": 11,
                "name": "Customer Surcharge II",
                "maxLevel": 9999,
                "costExponent": 1.16,
                "bonusPerLevel": 3,
                "costMultiplier": 0,
                "description": "All your sushi generate +{% more Bucks! Also, each unique sushi you create gives a 1.10x multiplicative bonus to Bucks generated, did you know that?"
            }),
        new SushiStationUpgradeBase(32, <SushiStationUpgradeModel>{
                "index": 32,
                "displayOrder": 20,
                "name": "Customer Surcharge III",
                "maxLevel": 9999,
                "costExponent": 1.17,
                "bonusPerLevel": 5,
                "costMultiplier": 0,
                "description": "All your sushi generate +{% more Bucks!"
            }),
        new SushiStationUpgradeBase(33, <SushiStationUpgradeModel>{
                "index": 33,
                "displayOrder": 36,
                "name": "Customer Surcharge IV",
                "maxLevel": 9999,
                "costExponent": 1.19,
                "bonusPerLevel": 10,
                "costMultiplier": 0,
                "description": "All your sushi generate +{% more Bucks!"
            }),
        new SushiStationUpgradeBase(34, <SushiStationUpgradeModel>{
                "index": 34,
                "displayOrder": 43,
                "name": "Customer Surcharge V",
                "maxLevel": 9999,
                "costExponent": 1.2,
                "bonusPerLevel": 20,
                "costMultiplier": 0,
                "description": "All your sushi generate +{% more Bucks!"
            }),
        new SushiStationUpgradeBase(35, <SushiStationUpgradeModel>{
                "index": 35,
                "displayOrder": 16,
                "name": "Quickpay Fee",
                "maxLevel": 120,
                "costExponent": 2,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "When a sushi is created, it instantly generates { minute's worth of Bucks!"
            }),
        new SushiStationUpgradeBase(36, <SushiStationUpgradeModel>{
                "index": 36,
                "displayOrder": 27,
                "name": "Wholesale Pricing",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "All upgrades are $% cheaper, now and forever!"
            }),
        new SushiStationUpgradeBase(37, <SushiStationUpgradeModel>{
                "index": 37,
                "displayOrder": 30,
                "name": "2nd Degree Searing",
                "maxLevel": 9999,
                "costExponent": 1.35,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Newly created Sushi generate +$ exp, instead of just +1 EXP. This is of course multiplied by all knowledge EXP multi's"
            }),
        new SushiStationUpgradeBase(38, <SushiStationUpgradeModel>{
                "index": 38,
                "displayOrder": 42,
                "name": "3rd Degree Searing",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Boosts all Sushi EXP gained from all sources by +{%. That includes newly created Sushi and EXP from Cold and Milktoast plates."
            }),
        new SushiStationUpgradeBase(39, <SushiStationUpgradeModel>{
                "index": 39,
                "displayOrder": 44,
                "name": "Rift Guy's Upgrade",
                "maxLevel": 0,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "I've got my hands in everything! Minehead, farming, the rift... so yea, of course I'm in the Sushi biz too, don't be so shocked."
            }),
        new SushiStationUpgradeBase(40, <SushiStationUpgradeModel>{
                "index": 40,
                "displayOrder": 41,
                "name": "No Tax on Tips",
                "maxLevel": 9999,
                "costExponent": 1.2,
                "bonusPerLevel": 2,
                "costMultiplier": 0,
                "description": "Multiplies all Bucks earned by }x"
            }),
        new SushiStationUpgradeBase(41, <SushiStationUpgradeModel>{
                "index": 41,
                "displayOrder": 0,
                "name": "Hourly Wage Meter",
                "maxLevel": 9999,
                "costExponent": 1.08,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Adds a display to the Top Right of the Sushi Station which shows total Hourly Bucks generated by all your sushi. @ Also, +{% total Bucks generated by all sushi!"
            }),
        new SushiStationUpgradeBase(42, <SushiStationUpgradeModel>{
                "index": 42,
                "displayOrder": 13,
                "name": "Movement Mittens",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 0.3,
                "description": "Adds the MOVE button. Enabling this option lets you drag the SLOTS themselves around your Sushi Station, instead of the sushi."
            }),
        new SushiStationUpgradeBase(43, <SushiStationUpgradeModel>{
                "index": 43,
                "displayOrder": 9,
                "name": "Sushi Tier Vision",
                "maxLevel": 9999,
                "costExponent": 1.2,
                "bonusPerLevel": 2,
                "costMultiplier": 0,
                "description": "Adds a toggle button to the Top Left of the Sushi Station. Click it to show Sushi Tiers numerically, can be turned off any time. @ Also, +{% total Bucks generated by all sushi!"
            }),
        new SushiStationUpgradeBase(44, <SushiStationUpgradeModel>{
                "index": 44,
                "displayOrder": 2,
                "name": "Sushi Service Bonuses",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Creating a new sushi type gives a new IdleOn bonus for the REST of the game! Check them out in the BONUS tap, top right corner."
            })    
]
}
