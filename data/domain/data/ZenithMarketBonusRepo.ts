import { ZenithMarketBonusModel } from "../model/zenithMarketBonusModel";

export class ZenithMarketBonusBase { constructor(public index: number, public data: ZenithMarketBonusModel) { } }

export const initZenithMarketBonusRepo = (): ZenithMarketBonusBase[] => {
    return [
        new ZenithMarketBonusBase(0, <ZenithMarketBonusModel>{
            name: "True Zen",
            unlockCost: 1,
            costExponent: 1.14,
            maxLevel: 250,
            bonus: 2,
            x0: 1,
            desc: "}x higher bonuses from Zenith Statues"
        }),
        new ZenithMarketBonusBase(1, <ZenithMarketBonusModel>{
            name: "Kruk Bubbles",
            unlockCost: 2,
            costExponent: 6,
            maxLevel: 5,
            bonus: 1,
            x0: 1,
            desc: "Adds a new bubble for Kattlekruk to boost!"
        }),
        new ZenithMarketBonusBase(2, <ZenithMarketBonusModel>{
            name: "Lamp Boost",
            unlockCost: 5,
            costExponent: 1.09,
            maxLevel: 200,
            bonus: 1,
            x0: 1,
            desc: "}x higher bonuses from The Lamp in Caverns"
        }),
        new ZenithMarketBonusBase(3, <ZenithMarketBonusModel>{
            name: "Double Cluster",
            unlockCost: 8,
            costExponent: 1.17,
            maxLevel: 100,
            bonus: 5,
            x0: 1,
            desc: "+{% chance for a Double Zenith Cluster drop"
        }),
        new ZenithMarketBonusBase(4, <ZenithMarketBonusModel>{
            name: "Bubble Boost",
            unlockCost: 15,
            costExponent: 1.5,
            maxLevel: 25,
            bonus: 2,
            x0: 1,
            desc: "+{ daily LVs for all Kattlekruk bubbles"
        }),
        new ZenithMarketBonusBase(5, <ZenithMarketBonusModel>{
            name: "Super Dupers",
            unlockCost: 50,
            costExponent: 1.7,
            maxLevel: 25,
            bonus: 1,
            x0: 1,
            desc: "Super Talents get +{ more LVs"
        }),
        new ZenithMarketBonusBase(6, <ZenithMarketBonusModel>{
            name: "Most Grandiose",
            unlockCost: 250,
            costExponent: 1.25,
            maxLevel: 50,
            bonus: 4,
            x0: 1,
            desc: "}x Grand Discovery Chance in Spelunking"
        }),
        new ZenithMarketBonusBase(7, <ZenithMarketBonusModel>{
            name: "Giga Symbols",
            unlockCost: 1000,
            costExponent: 1.15,
            maxLevel: 100,
            bonus: 1,
            x0: 1,
            desc: "}x Sneaking Symbol success chance"
        }),
        new ZenithMarketBonusBase(8, <ZenithMarketBonusModel>{
            name: "Woozle Wuzzle",
            unlockCost: 5000,
            costExponent: 1.125,
            maxLevel: 30,
            bonus: 1,
            x0: 1,
            desc: "+{% EXP Gain for the Research skill!"
        }),
        new ZenithMarketBonusBase(9, <ZenithMarketBonusModel>{
            name: "Classy Gogo",
            unlockCost: 25000,
            costExponent: 1.115,
            maxLevel: 100,
            bonus: 1,
            x0: 1,
            desc: "}x Class EXP gain, for now..."
        })
    ];
}