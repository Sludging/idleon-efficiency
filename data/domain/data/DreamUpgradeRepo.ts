import { DreamUpgradeModel } from '../model/dreamUpgradeModel';

export class DreamUpgradeBase { constructor(public index: number, public data: DreamUpgradeModel) { } }



export const initDreamUpgradeRepo = () => {
    return [    
        new DreamUpgradeBase(0, <DreamUpgradeModel>{
                "name": "Equinox Dreams",
                "upgrade": "Unlocks a Dream cloud through which you can complete challenges. @ More clouds allows you to see more challenges at once",
                "x1": 5,
                "x2": 0
            }),
        new DreamUpgradeBase(1, <DreamUpgradeModel>{
                "name": "Equinox Resources",
                "upgrade": "Unlocks a new resource to gather right here in the equinox. @ Each one has it's own Vial in Alchemy, but no card",
                "x1": 4,
                "x2": 0
            }),
        new DreamUpgradeBase(2, <DreamUpgradeModel>{
                "name": "Shades of K",
                "upgrade": "Adds another choice at the end of each Killroy Run to invest into",
                "x1": 3,
                "x2": 0
            }),
        new DreamUpgradeBase(3, <DreamUpgradeModel>{
                "name": "Liquidvestment",
                "upgrade": "If liquid is full, 9% of excess liquid generated will be invested into CAP/RATE upgrades. @   @ Total Bonus: % Excess invested",
                "x1": 4,
                "x2": 9
            }),
        new DreamUpgradeBase(4, <DreamUpgradeModel>{
                "name": "Matching Scims",
                "upgrade": "10% Damage. This is its own multiplier, so it's EXTRA powerful! @   @ Total Bonus: % DMG",
                "x1": 8,
                "x2": 10
            }),
        new DreamUpgradeBase(5, <DreamUpgradeModel>{
                "name": "Slow Roast Wiz",
                "upgrade": "1% tower dmg every second for all towers in worship, resets when a new wave starts. Only starts working after 10 seconds @   @ Total Bonus: % DMG",
                "x1": 5,
                "x2": 1
            }),
        new DreamUpgradeBase(6, <DreamUpgradeModel>{
                "name": "Laboratory Fuse",
                "upgrade": "1 px longer connection range for all Lab bonuses and jewels, unless they state otherwise @   @ Total Bonus:  Px range",
                "x1": 10,
                "x2": 1
            }),
        new DreamUpgradeBase(7, <DreamUpgradeModel>{
                "name": "Metal Detector",
                "upgrade": "1% nugget size for each nugget you dig up that isn't a new biggest nug. Once you do eventually dig up a new best, this bonus resets. @   @ Total Bonus: % Nug Size per small nug",
                "x1": 6,
                "x2": 1
            }),
        new DreamUpgradeBase(8, <DreamUpgradeModel>{
                "name": "Faux Jewels",
                "upgrade": "5% Drop Rate. This is additive, so it's great but not THAT great. DR is DR though right? @   @ Total Bonus: % Drop",
                "x1": 6,
                "x2": 5
            }),
        new DreamUpgradeBase(9, <DreamUpgradeModel>{
                "name": "Food Lust",
                "upgrade": "Defeating a Random Event boss lowers Meal upgrade cost by -20%. Stacks up to  times. Resets when meal is upgraded. @   @ (For the number ppl out there, this is 0.80x cost per stack)",
                "x1": 10,
                "x2": 1
            }),
        new DreamUpgradeBase(10, <DreamUpgradeModel>{
                "name": "Equinox Symbols",
                "upgrade": "1 all talent LVs, as long as they have a single point invested @   @ Total Bonus:  All Talent LVs",
                "x1": 5,
                "x2": 1
            }),
        new DreamUpgradeBase(11, <DreamUpgradeModel>{"name": "Hmm...", "upgrade": "Huh...", "x1": 2, "x2": -1}),
        new DreamUpgradeBase(12, <DreamUpgradeModel>{"name": "Hmm...", "upgrade": "Huh...", "x1": 2, "x2": -1}),
        new DreamUpgradeBase(13, <DreamUpgradeModel>{"name": "Hmm...", "upgrade": "Huh...", "x1": 2, "x2": -1})    
]
}
