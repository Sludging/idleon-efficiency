import { ClickerMegarewardModel } from "../model/clickerMegarewardModel";

export class OrionMegafeatherBase { constructor(public index: number, public data: ClickerMegarewardModel) { } }

export const initOrionMegafeatherRepo = (): OrionMegafeatherBase[] => {
    return [
        new OrionMegafeatherBase(0, <ClickerMegarewardModel>{
            name: "Maple",
            desc: "Multiplies all Feather generation by 10x. Multiplicative, so extra powerful!"
        }),
        new OrionMegafeatherBase(1, <ClickerMegarewardModel>{
            name: "Amethyst",
            desc: "Boosts all of Orion's Bonuses by double their base amount."
        }),
        new OrionMegafeatherBase(2, <ClickerMegarewardModel>{
            name: "Frostraven",
            desc: "All upgrades cost 1% less feathers per LV of Feather Generation."
        }),
        new OrionMegafeatherBase(3, <ClickerMegarewardModel>{
            name: "Phoenix",
            desc: "Instead of double, all of Orion's Bonuses are now triple."
        }),
        new OrionMegafeatherBase(4, <ClickerMegarewardModel>{
            name: "Obsidian",
            desc: "The Feather Cheapener upgrades now give +2 and +4 Feathers/sec each LV, respectively."
        }),
        new OrionMegafeatherBase(5, <ClickerMegarewardModel>{
            name: "Evergreen",
            desc: "Forget triple, Orion's Bonuses are now quadruple!"
        }),
        new OrionMegafeatherBase(6, <ClickerMegarewardModel>{
            name: "Pristine",
            desc: "The upgrade Feather Restart now gives a 5x feather bonus instead of the previous 3x."
        }),
        new OrionMegafeatherBase(7, <ClickerMegarewardModel>{
            name: "Lavathian",
            desc: "Quadruple? Pfft more like Noobruple, Orion's Bonuses are now Quintuple as big, that's 5x!"
        }),
        new OrionMegafeatherBase(8, <ClickerMegarewardModel>{
            name: "Midas",
            desc: "The cost of Feather Generation upgrade now goes up 25% slower."
        }),
        new OrionMegafeatherBase(9, <ClickerMegarewardModel>{
            name: "Fractal",
            desc: "Orion's bonuses are now {x higher than they were at first."
        })
    ];
}