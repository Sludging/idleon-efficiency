import { DancingCoralBonusModel } from "../model/dancingCoralBonus";

export class DancingCoralBonusBase { constructor(public index: number, public data: DancingCoralBonusModel) { } }



export const initDancingCoralBonusRepo = () => {
    return [
        new DancingCoralBonusBase(0, <DancingCoralBonusModel>{
            name: "Reef Coral",
            itemSource: "Generated Daily in Town",
            desc: "+{% Daily Reef Coral",
            powerReq: 20,
            bonus: 2
        }),
        new DancingCoralBonusBase(1, <DancingCoralBonusModel>{
            name: "Vibrant Coral",
            itemSource: "Dropped by Shellslugs",
            desc: "+{% Spelunking POW",
            powerReq: 100,
            bonus: 5
        }),
        new DancingCoralBonusBase(2, <DancingCoralBonusModel>{
            name: "Glowing Coral",
            itemSource: "Dropped by Litterfish",
            desc: "+{% Spelunking Amber gain",
            powerReq: 250,
            bonus: 3
        }),
        new DancingCoralBonusBase(3, <DancingCoralBonusModel>{
            name: "Neon Coral",
            itemSource: "Dropped by Coralcave crab",
            desc: "}x Class EXP gain",
            powerReq: 1000,
            bonus: 4
        }),
        new DancingCoralBonusBase(4, <DancingCoralBonusModel>{
            name: "Twisted Coral",
            itemSource: "Dropped by Pirate Pou",
            desc: "+{% who knows",
            powerReq: 3000,
            bonus: 1
        }),
        new DancingCoralBonusBase(5, <DancingCoralBonusModel>{
            name: "6th Coral",
            itemSource: "Dropped by RIPtide",
            desc: "+{% who knows",
            powerReq: 10000,
            bonus: 1
        }),
        new DancingCoralBonusBase(6, <DancingCoralBonusModel>{
            name: "7th Coral",
            itemSource: "Dropped by RIPtide",
            desc: "+{% who knows",
            powerReq: 25000,
            bonus: 1
        }),
        new DancingCoralBonusBase(7, <DancingCoralBonusModel>{
            name: "8th Coral",
            itemSource: "Dropped by RIPtide",
            desc: "+{% who knows",
            powerReq: 100000,
            bonus: 1
        }),
        new DancingCoralBonusBase(8, <DancingCoralBonusModel>{
            name: "9th Coral",
            itemSource: "Dropped by RIPtide",
            desc: "+{% who knows",
            powerReq: 500000,
            bonus: 1
        })
    ]
}