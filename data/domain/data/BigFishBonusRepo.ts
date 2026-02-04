import { BigFishBonusModel } from '../model/bigFishBonusModel';

export class BigFishBonusBase { constructor(public index: number, public data: BigFishBonusModel) { } }



export const initBigFishBonusRepo = () => {
    return [
        new BigFishBonusBase(0, <BigFishBonusModel>{
            "name": "Advice on Life and Death",
            "desc": "Well uhh dying is bad. +{% faster W7 mob respawn rate",
            "x0": 10,
            "x1": 26,
            "filler": "filler"
        }),
        new BigFishBonusBase(1, <BigFishBonusModel>{
            "name": "Advice on Being Tired",
            "desc": "It feels better to not be. +{% Max Stamina in Spelunking",
            "x0": 8,
            "x1": 29,
            "filler": "filler"
        }),
        new BigFishBonusBase(2, <BigFishBonusModel>{
            "name": "Advice on Sleeping",
            "desc": "Don't do it while awake. +{% Spelunking AFK Gains",
            "x0": 20,
            "x1": 31,
            "filler": "filler"
        }),
        new BigFishBonusBase(3, <BigFishBonusModel>{
            "name": "Advice on Murder One",
            "desc": "Only do it in video games. +{% Kill per Kill in W7",
            "x0": 10,
            "x1": 33,
            "filler": "filler"
        }),
        new BigFishBonusBase(4, <BigFishBonusModel>{
            "name": "Advice on Being Smart",
            "desc": "Use 100% of your brain. }x Class EXP Gain",
            "x0": 25,
            "x1": 35,
            "filler": "filler"
        }),
        new BigFishBonusBase(5, <BigFishBonusModel>{
            "name": "Advice on Materialism",
            "desc": "Two things better than one tbh. +{% Double Gold Food drop chance",
            "x0": 10,
            "x1": 38,
            "filler": "filler"
        }),
    ]
}