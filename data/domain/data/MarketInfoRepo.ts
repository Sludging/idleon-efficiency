import { MarketInfoModel } from '../model/marketInfoModel';

export class MarketInfoBase { constructor(public index: number, public data: MarketInfoModel) { } }



export const initMarketInfoRepo = () => {
    return [    
        new MarketInfoBase(0, <MarketInfoModel>{
                "name": "LAND PLOTS",
                "bonus": "You get { extra plots of land to plant crops in",
                "cropId": 0,
                "cropIdIncrement": 2,
                "cost": 2,
                "costExponent": 2,
                "cropReq": 0,
                "maxLvl": 20,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(1, <MarketInfoModel>{
                "name": "STRONGER VINES",
                "bonus": "+{% chance for +1 crop when fully grown",
                "cropId": 1,
                "cropIdIncrement": 0.18,
                "cost": 2,
                "costExponent": 1.13,
                "cropReq": 3,
                "maxLvl": 500,
                "bonusPerLvl": 2
            }),
        new MarketInfoBase(2, <MarketInfoModel>{
                "name": "NUTRITIOUS SOIL",
                "bonus": "+{% growth speed for all land",
                "cropId": 7,
                "cropIdIncrement": 0.15,
                "cost": 3,
                "costExponent": 1.12,
                "cropReq": 8,
                "maxLvl": 500,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(3, <MarketInfoModel>{
                "name": "SMARTER SEEDS",
                "bonus": "+{% farming EXP gain from all sources",
                "cropId": 21,
                "cropIdIncrement": 0.14,
                "cost": 6,
                "costExponent": 1.1,
                "cropReq": 14,
                "maxLvl": 500,
                "bonusPerLvl": 3
            }),
        new MarketInfoBase(4, <MarketInfoModel>{
                "name": "BIOLOGY BOOST",
                "bonus": "+{% chance of crop evolution, or 'next crop' chance",
                "cropId": 46,
                "cropIdIncrement": 0.09,
                "cost": 10,
                "costExponent": 1.1,
                "cropReq": 31,
                "maxLvl": 500,
                "bonusPerLvl": 15
            }),
        new MarketInfoBase(5, <MarketInfoModel>{
                "name": "PRODUCT DOUBLER",
                "bonus": "+{% chance for crops to be worth 2x when collected",
                "cropId": 30,
                "cropIdIncrement": 0.12,
                "cost": 15,
                "costExponent": 1.2,
                "cropReq": 42,
                "maxLvl": 500,
                "bonusPerLvl": 3
            }),
        new MarketInfoBase(6, <MarketInfoModel>{
                "name": "MORE BEENZ",
                "bonus": "+{% magic beans gained when trading in crops",
                "cropId": 61,
                "cropIdIncrement": 0.11,
                "cost": 25,
                "costExponent": 1.15,
                "cropReq": 59,
                "maxLvl": 500,
                "bonusPerLvl": 2
            }),
        new MarketInfoBase(7, <MarketInfoModel>{
                "name": "ENHANCED DEEDS",
                "bonus": "Nothing yet. A weekly update will change this, some day...",
                "cropId": 84,
                "cropIdIncrement": 0.07,
                "cost": 40,
                "costExponent": 1.5,
                "cropReq": 80,
                "maxLvl": 500,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(8, <MarketInfoModel>{
                "name": "OVERGROWTH",
                "bonus": "Unlocks Overgrowth (OG). Each OG doubles crop value ~ EXP",
                "cropId": 2,
                "cropIdIncrement": 0.1,
                "cost": 10,
                "costExponent": 1.1,
                "cropReq": 19,
                "maxLvl": 1,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(9, <MarketInfoModel>{
                "name": "EVOLUTION GMO",
                "bonus": "}x crop evolution chance per crop you have 200 of",
                "cropId": 2,
                "cropIdIncrement": 0.1,
                "cost": 15,
                "costExponent": 1.05,
                "cropReq": 25,
                "maxLvl": 500,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(10, <MarketInfoModel>{
                "name": "SPEED GMO",
                "bonus": "+{% growth speed per crop you have 1000 of",
                "cropId": 2,
                "cropIdIncrement": 0.1,
                "cost": 25,
                "costExponent": 1.155,
                "cropReq": 36,
                "maxLvl": 500,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(11, <MarketInfoModel>{
                "name": "OG FERTILIZER",
                "bonus": "}x higher chance for Overgrowth to occur",
                "cropId": 2,
                "cropIdIncrement": 0.1,
                "cost": 40,
                "costExponent": 1.04,
                "cropReq": 50,
                "maxLvl": 500,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(12, <MarketInfoModel>{
                "name": "EXP GMO",
                "bonus": "+{% farming EXP gain crop you have 2500 of",
                "cropId": 2,
                "cropIdIncrement": 0.1,
                "cost": 70,
                "costExponent": 1.095,
                "cropReq": 65,
                "maxLvl": 100,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(13, <MarketInfoModel>{
                "name": "LAND RANK",
                "bonus": "Nothing yet. These nuts, so true.",
                "cropId": 2,
                "cropIdIncrement": 0.1,
                "cost": 100,
                "costExponent": 1.05,
                "cropReq": 71,
                "maxLvl": 500,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(14, <MarketInfoModel>{
                "name": "VALUE GMO",
                "bonus": "+{% crop value per per crop you have 10000 of",
                "cropId": 2,
                "cropIdIncrement": 0.1,
                "cost": 150,
                "costExponent": 1.125,
                "cropReq": 95,
                "maxLvl": 500,
                "bonusPerLvl": 1
            }),
        new MarketInfoBase(15, <MarketInfoModel>{
                "name": "SUPER GMO",
                "bonus": "+{% all 'GMO' bonuses per crop you have 100K",
                "cropId": 2,
                "cropIdIncrement": 0.1,
                "cost": 250,
                "costExponent": 1.2,
                "cropReq": 109,
                "maxLvl": 50,
                "bonusPerLvl": 1
            })    
]
}
