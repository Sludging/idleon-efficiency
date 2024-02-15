import { MarketInfoModel } from '../model/marketInfoModel';

export class MarketInfoBase { constructor(public index: number, public data: MarketInfoModel) { } }



export const initMarketInfoRepo = () => {
    return [    
        new MarketInfoBase(0, <MarketInfoModel>{
                "name": "LAND PLOTS",
                "bonus": "You get { extra plots of land to plant crops in",
                "x1": 0,
                "x2": 2,
                "x3": 2,
                "x4": 2,
                "x5": 0,
                "x6": 20,
                "x7": 1
            }),
        new MarketInfoBase(1, <MarketInfoModel>{
                "name": "STRONGER VINES",
                "bonus": "+{% chance for +1 crop when fully grown",
                "x1": 1,
                "x2": 0.18,
                "x3": 2,
                "x4": 1.13,
                "x5": 3,
                "x6": 500,
                "x7": 2
            }),
        new MarketInfoBase(2, <MarketInfoModel>{
                "name": "NUTRITIOUS SOIL",
                "bonus": "+{% growth speed for all land",
                "x1": 7,
                "x2": 0.15,
                "x3": 3,
                "x4": 1.12,
                "x5": 8,
                "x6": 500,
                "x7": 1
            }),
        new MarketInfoBase(3, <MarketInfoModel>{
                "name": "SMARTER SEEDS",
                "bonus": "+{% farming EXP gain from all sources",
                "x1": 21,
                "x2": 0.14,
                "x3": 6,
                "x4": 1.1,
                "x5": 14,
                "x6": 500,
                "x7": 3
            }),
        new MarketInfoBase(4, <MarketInfoModel>{
                "name": "BIOLOGY BOOST",
                "bonus": "+{% chance of crop evolution, or 'next crop' chance",
                "x1": 46,
                "x2": 0.09,
                "x3": 10,
                "x4": 1.1,
                "x5": 31,
                "x6": 500,
                "x7": 15
            }),
        new MarketInfoBase(5, <MarketInfoModel>{
                "name": "PRODUCT DOUBLER",
                "bonus": "+{% chance for crops to be worth 2x when collected",
                "x1": 30,
                "x2": 0.12,
                "x3": 15,
                "x4": 1.2,
                "x5": 42,
                "x6": 500,
                "x7": 3
            }),
        new MarketInfoBase(6, <MarketInfoModel>{
                "name": "MORE BEENZ",
                "bonus": "+{% magic beans gained when trading in crops",
                "x1": 61,
                "x2": 0.11,
                "x3": 25,
                "x4": 1.15,
                "x5": 59,
                "x6": 500,
                "x7": 2
            }),
        new MarketInfoBase(7, <MarketInfoModel>{
                "name": "ENHANCED DEEDS",
                "bonus": "Nothing yet. A weekly update will change this, some day...",
                "x1": 84,
                "x2": 0.07,
                "x3": 40,
                "x4": 1.5,
                "x5": 80,
                "x6": 500,
                "x7": 1
            }),
        new MarketInfoBase(8, <MarketInfoModel>{
                "name": "OVERGROWTH",
                "bonus": "Unlocks Overgrowth (OG). Each OG doubles crop value ~ EXP",
                "x1": 2,
                "x2": 0.1,
                "x3": 10,
                "x4": 1.1,
                "x5": 19,
                "x6": 1,
                "x7": 1
            }),
        new MarketInfoBase(9, <MarketInfoModel>{
                "name": "EVOLUTION GMO",
                "bonus": "}x crop evolution chance per crop you have 200 of",
                "x1": 2,
                "x2": 0.1,
                "x3": 15,
                "x4": 1.05,
                "x5": 25,
                "x6": 500,
                "x7": 1
            }),
        new MarketInfoBase(10, <MarketInfoModel>{
                "name": "SPEED GMO",
                "bonus": "+{% growth speed per crop you have 1000 of",
                "x1": 2,
                "x2": 0.1,
                "x3": 25,
                "x4": 1.155,
                "x5": 36,
                "x6": 500,
                "x7": 1
            }),
        new MarketInfoBase(11, <MarketInfoModel>{
                "name": "OG FERTILIZER",
                "bonus": "}x higher chance for Overgrowth to occur",
                "x1": 2,
                "x2": 0.1,
                "x3": 40,
                "x4": 1.04,
                "x5": 50,
                "x6": 500,
                "x7": 1
            }),
        new MarketInfoBase(12, <MarketInfoModel>{
                "name": "EXP GMO",
                "bonus": "+{% farming EXP gain crop you have 2500 of",
                "x1": 2,
                "x2": 0.1,
                "x3": 70,
                "x4": 1.095,
                "x5": 65,
                "x6": 100,
                "x7": 1
            }),
        new MarketInfoBase(13, <MarketInfoModel>{
                "name": "LAND RANK",
                "bonus": "Nothing yet. These nuts, so true.",
                "x1": 2,
                "x2": 0.1,
                "x3": 100,
                "x4": 1.05,
                "x5": 71,
                "x6": 500,
                "x7": 1
            }),
        new MarketInfoBase(14, <MarketInfoModel>{
                "name": "VALUE GMO",
                "bonus": "+{% crop value per per crop you have 10000 of",
                "x1": 2,
                "x2": 0.1,
                "x3": 150,
                "x4": 1.125,
                "x5": 95,
                "x6": 500,
                "x7": 1
            }),
        new MarketInfoBase(15, <MarketInfoModel>{
                "name": "SUPER GMO",
                "bonus": "+{% all 'GMO' bonuses per crop you have 100K",
                "x1": 2,
                "x2": 0.1,
                "x3": 250,
                "x4": 1.2,
                "x5": 109,
                "x6": 50,
                "x7": 1
            })    
]
}
