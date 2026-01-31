import { BubbaMegafleshModel } from "../model/bubbaMegafleshModel";

export class BubbaMegafleshBase { constructor(public index: number, public data: BubbaMegafleshModel) { } }

export const initBubbaMegafleshRepo = (): BubbaMegafleshBase[] => {
    return [
        new BubbaMegafleshBase(0, <BubbaMegafleshModel>{
            name: "Glazed Ham",
            desc: "+1% Meat Slices produced per total upgrade level. Current Bonus:$x"
        }),
        new BubbaMegafleshBase(1, <BubbaMegafleshModel>{
            name: "Mutton Chop",
            desc: "Bubba's IdleOn Bonuses are all 1.20x higher"
        }),
        new BubbaMegafleshBase(2, <BubbaMegafleshModel>{
            name: "Bacon Sizzler",
            desc: "You can now select 2 Gifts at the start of each run"
        }),
        new BubbaMegafleshBase(3, <BubbaMegafleshModel>{
            name: "Pork Cube",
            desc: "Bubba's IdleOn Bonuses are now all 1.40x higher"
        }),
        new BubbaMegafleshBase(4, <BubbaMegafleshModel>{
            name: "Sooshi",
            desc: "+1 Dice rolled, +5 max sides per Dice, and worser rolls are ignored"
        }),
        new BubbaMegafleshBase(5, <BubbaMegafleshModel>{
            name: "Grand Salmon",
            desc: "Double tap a Charisma Attribute to emulsify it, making it give 3x bonus"
        }),
        new BubbaMegafleshBase(6, <BubbaMegafleshModel>{
            name: "Golden Ham",
            desc: "Bubba's IdleOn Bonuses are now 1.60x higher"
        }),
        new BubbaMegafleshBase(7, <BubbaMegafleshModel>{
            name: "Beef Pie",
            desc: "Start each new run with 50 Pats to make Bubba happy!"
        }),
        new BubbaMegafleshBase(8, <BubbaMegafleshModel>{
            name: "Big Tenderloin",
            desc: "You now have a 75% chance to get free meat when upgrading the Smoke Room"
        }),
        new BubbaMegafleshBase(9, <BubbaMegafleshModel>{
            name: "Sirloin Steak",
            desc: "Bubba's IdleOn Bonuses are all 1.80x higher"
        }),
        new BubbaMegafleshBase(10, <BubbaMegafleshModel>{
            name: "Ambiguous Meat",
            desc: "Your chance to find Dollars, Quarters, and Nickels is now double"
        }),
        new BubbaMegafleshBase(11, <BubbaMegafleshModel>{
            name: "Chromatic Meat",
            desc: "Bubba's IdleOn Bonuses are all $x higher"
        })
    ];
}