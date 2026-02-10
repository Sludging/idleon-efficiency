import { ClickerMegarewardModel } from "../model/clickerMegarewardModel";

export class BubbaMegafleshBase { constructor(public index: number, public data: ClickerMegarewardModel) { } }

export const initBubbaMegafleshRepo = (): BubbaMegafleshBase[] => {
    return [
        new BubbaMegafleshBase(0, <ClickerMegarewardModel>{
            name: "Glazed Ham",
            desc: "+1% Meat Slices produced per total upgrade level. Current Bonus:$x"
        }),
        new BubbaMegafleshBase(1, <ClickerMegarewardModel>{
            name: "Mutton Chop",
            desc: "Bubba's IdleOn Bonuses are all 1.20x higher"
        }),
        new BubbaMegafleshBase(2, <ClickerMegarewardModel>{
            name: "Bacon Sizzler",
            desc: "You can now select 2 Gifts at the start of each run"
        }),
        new BubbaMegafleshBase(3, <ClickerMegarewardModel>{
            name: "Pork Cube",
            desc: "Bubba's IdleOn Bonuses are now all 1.40x higher"
        }),
        new BubbaMegafleshBase(4, <ClickerMegarewardModel>{
            name: "Sooshi",
            desc: "+1 Dice rolled, +5 max sides per Dice, and worser rolls are ignored"
        }),
        new BubbaMegafleshBase(5, <ClickerMegarewardModel>{
            name: "Grand Salmon",
            desc: "Double tap a Charisma Attribute to emulsify it, making it give 3x bonus"
        }),
        new BubbaMegafleshBase(6, <ClickerMegarewardModel>{
            name: "Golden Ham",
            desc: "Bubba's IdleOn Bonuses are now 1.60x higher"
        }),
        new BubbaMegafleshBase(7, <ClickerMegarewardModel>{
            name: "Beef Pie",
            desc: "Start each new run with 50 Pats to make Bubba happy!"
        }),
        new BubbaMegafleshBase(8, <ClickerMegarewardModel>{
            name: "Big Tenderloin",
            desc: "You now have a 75% chance to get free meat when upgrading the Smoke Room"
        }),
        new BubbaMegafleshBase(9, <ClickerMegarewardModel>{
            name: "Sirloin Steak",
            desc: "Bubba's IdleOn Bonuses are all 1.80x higher"
        }),
        new BubbaMegafleshBase(10, <ClickerMegarewardModel>{
            name: "Ambiguous Meat",
            desc: "Your chance to find Dollars, Quarters, and Nickels is now double"
        }),
        new BubbaMegafleshBase(11, <ClickerMegarewardModel>{
            name: "Chromatic Meat",
            desc: "Bubba's IdleOn Bonuses are all $x higher"
        })
    ];
}