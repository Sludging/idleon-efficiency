import { TomeEpilogueBonusModel } from "../model/tomeEpilogueBonusModel";

export class TomeEpilogueBonusBase { constructor(public index: number, public data: TomeEpilogueBonusModel) { } }

export const initTomeEpilogueBonusRepo = () => {
    return [
        new TomeEpilogueBonusBase(0, <TomeEpilogueBonusModel>{
            "bonus": "}x Bones",
            "x0": 420,
            "x1": 7000
        }),
        new TomeEpilogueBonusBase(1, <TomeEpilogueBonusModel>{
            "bonus": "}x|Villager EXP",
            "x0": 150,
            "x1": 1000
        }),
        new TomeEpilogueBonusBase(2, <TomeEpilogueBonusModel>{
            "bonus": "}x Dust",
            "x0": 750,
            "x1": 6000
        }),
        new TomeEpilogueBonusBase(3, <TomeEpilogueBonusModel>{
            "bonus": "}x|Artifact Find",
            "x0": 100,
            "x1": 3000
        }),
        new TomeEpilogueBonusBase(4, <TomeEpilogueBonusModel>{
            "bonus": "}x Amber",
            "x0": 400,
            "x1": 15000
        }),
        new TomeEpilogueBonusBase(5, <TomeEpilogueBonusModel>{
            "bonus": "+{%|Palette Luck",
            "x0": 200,
            "x1": 12000
        }),
        new TomeEpilogueBonusBase(6, <TomeEpilogueBonusModel>{
            "bonus": "}x Tachyon",
            "x0": 600,
            "x1": 5000
        }),
        new TomeEpilogueBonusBase(7, <TomeEpilogueBonusModel>{
            "bonus": "+{%|W7 Skill 2",
            "x0": 100,
            "x1": 16000
        }),
        new TomeEpilogueBonusBase(8, <TomeEpilogueBonusModel>{
            "bonus": "}x Equinox",
            "x0": 220,
            "x1": 5000
        }),
        new TomeEpilogueBonusBase(9, <TomeEpilogueBonusModel>{
            "bonus": "+{%|W7 Skill 3",
            "x0": 100,
            "x1": 17000
        }),
        new TomeEpilogueBonusBase(10, <TomeEpilogueBonusModel>{
            "bonus": "filler",
            "x0": 500,
            "x1": 5000
        })
    ]
}
