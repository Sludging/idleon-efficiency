import { ClickerMegarewardModel } from "../model/clickerMegarewardModel";

export class PoppyMegafishBase { constructor(public index: number, public data: ClickerMegarewardModel) { } }

export const initPoppyMegafishRepo = (): PoppyMegafishBase[] => {
    return [
        new PoppyMegafishBase(0, <ClickerMegarewardModel>{
            name: "Squid",
            desc: "Unlocks the first 3 upgrades in the Tar Pit, visit through top left corner"
        }),
        new PoppyMegafishBase(1, <ClickerMegarewardModel>{
            name: "Sequin",
            desc: "Boosts all of Poppy's Bonuses by 1.5x their base amount"
        }),
        new PoppyMegafishBase(2, <ClickerMegarewardModel>{
            name: "Nautilus",
            desc: "Adds two more Reset Spirals to upgrade, and gives +5 Pts when Fisheroo Resetting"
        }),
        new PoppyMegafishBase(3, <ClickerMegarewardModel>{
            name: "Koi",
            desc: "Boosts all of Poppy's Bonuses by 2x their base amount."
        }),
        new PoppyMegafishBase(4, <ClickerMegarewardModel>{
            name: "Angler",
            desc: "Unlocks another 3 upgrades in the Tar Pit, and boosts Tartar Fish gain by 3x"
        }),
        new PoppyMegafishBase(5, <ClickerMegarewardModel>{
            name: "Leech",
            desc: "The Fishing Buddy upgrade now gives +50% Bluefin caught and +50% Shiny Speed per Lv past Lv.5!"
        }),
        new PoppyMegafishBase(6, <ClickerMegarewardModel>{
            name: "Aquaray",
            desc: "Boosts all of Poppy's Bonuses by 2.5x their base amount"
        }),
        new PoppyMegafishBase(7, <ClickerMegarewardModel>{
            name: "Jettison",
            desc: "Unlocks the final 2 upgrades in the Tar Pit, and boosts Tartar Fish gain by another 3x"
        }),
        new PoppyMegafishBase(8, <ClickerMegarewardModel>{
            name: "Shoal",
            desc: "Boosts all of Poppy's Bonuses by 3x their base amount"
        }),
        new PoppyMegafishBase(9, <ClickerMegarewardModel>{
            name: "Eel",
            desc: "Shiny fishing is 1% faster per upgrade LV of the Tasty Fishbait upgrade"
        }),
        new PoppyMegafishBase(10, <ClickerMegarewardModel>{
            name: "Marlin",
            desc: "All upgrades, including Tar Pit upgrades, are 5% cheaper per LV of King Worm upgrade"
        }),
        new PoppyMegafishBase(11, <ClickerMegarewardModel>{
            name: "Eclectic",
            desc: "Poppy's bonuses are now {x higher than they were at first"
        })
    ];
}