import { BubbaCharismaBonusModel } from "../model/bubbaCharismaBonusModel";

export class BubbaCharismaBonusBase { constructor(public index: number, public data: BubbaCharismaBonusModel) { } }

export const initBubbaCharismaBonusRepo = (): BubbaCharismaBonusBase[] => {
    return [
        new BubbaCharismaBonusBase(0, <BubbaCharismaBonusModel>{
            name: "Hustle",
            desc: "}x Flesh",
            value: 10
        }),
        new BubbaCharismaBonusBase(1, <BubbaCharismaBonusModel>{
            name: "Rizz",
            desc: "-$% Costs",
            value: 2
        }),
        new BubbaCharismaBonusBase(2, <BubbaCharismaBonusModel>{
            name: "Joy",
            desc: "}x Happiness",
            value: 5
        }),
        new BubbaCharismaBonusBase(3, <BubbaCharismaBonusModel>{
            name: "Courage",
            desc: "+{% Dice luk",
            value: 1
        }),
        new BubbaCharismaBonusBase(4, <BubbaCharismaBonusModel>{
            name: "Mindful",
            desc: "+{% 2x LVs",
            value: 0.1
        }),
        new BubbaCharismaBonusBase(5, <BubbaCharismaBonusModel>{
            name: "Savvy",
            desc: "+{% Coins",
            value: 1
        })
    ];
}