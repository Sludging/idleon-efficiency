import { BubbaGiftModel } from "../model/bubbaGiftModel";

export class BubbaGiftBase { constructor(public index: number, public data: BubbaGiftModel) { } }

export const initBubbaGiftRepo = (): BubbaGiftBase[] => {
    return [
        new BubbaGiftBase(0, <BubbaGiftModel>{
            name: "Beeg Slice",
            desc: "}x extra Meat Slice production. Generates 20 minutes of Meat Slices when triggered.",
            value: "100"
        }),
        new BubbaGiftBase(1, <BubbaGiftModel>{
            name: "Beach Ball",
            desc: "+{% extra happiness for Bubba from all sources. Gives +200 happiness instantly when triggered",
            value: "50"
        }),
        new BubbaGiftBase(2, <BubbaGiftModel>{
            name: "Numbahs",
            desc: "}x faster Charisma attribute level up rate. Instantly gives your selected attribute +1 LV when triggered",
            value: "150"
        }),
        new BubbaGiftBase(3, <BubbaGiftModel>{
            name: "Red Die",
            desc: "+{% Dice Luck, making low rolls more rare and high rolls less rare. Rolls the dice when triggered",
            value: "50"
        }),
        new BubbaGiftBase(4, <BubbaGiftModel>{
            name: "Slabcakes",
            desc: "{% chance for 10x smoked meat. Smokes you up a new smoked meat when triggered",
            value: "15"
        }),
        new BubbaGiftBase(5, <BubbaGiftModel>{
            name: "Surprise Box",
            desc: "+{% chance for +1 LV when upgrading which doesn't affect cost. Gives a random upgrade +2 LV when triggered",
            value: "10"
        })
    ];
}