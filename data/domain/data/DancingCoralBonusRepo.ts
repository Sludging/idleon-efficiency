import { DancingCoralBonusModel } from "../model/dancingCoralBonus";

export class DancingCoralBonusBase { constructor(public index: number, public data: DancingCoralBonusModel) { } }



export const initDancingCoralBonusRepo = () => {
    return [
        new DancingCoralBonusBase(0, <DancingCoralBonusModel>{
            name: "Reef Coral",
            desc: "+{% Daily Reef Coral",
            powerReq: 20,
            bonus: 2
        }),
        new DancingCoralBonusBase(1, <DancingCoralBonusModel>{
            name: "Vibrant Coral",
            desc: "+{% Spelunking POW",
            powerReq: 100,
            bonus: 5
        }),
        new DancingCoralBonusBase(2, <DancingCoralBonusModel>{
            name: "Glowing Coral",
            desc: "+{% Spelunking Amber gain",
            powerReq: 250,
            bonus: 3
        }),
        new DancingCoralBonusBase(3, <DancingCoralBonusModel>{
            name: "Neon Coral",
            desc: "}x Class EXP gain",
            powerReq: 1000,
            bonus: 4
        }),
        new DancingCoralBonusBase(4, <DancingCoralBonusModel>{
            name: "Twisted Coral",
            desc: "+{% who knows",
            powerReq: 3000,
            bonus: 1
        }),
        new DancingCoralBonusBase(5, <DancingCoralBonusModel>{
            name: "6th Coral",
            desc: "+{% who knows",
            powerReq: 10000,
            bonus: 1
        }),
        new DancingCoralBonusBase(6, <DancingCoralBonusModel>{
            name: "7th Coral",
            desc: "+{% who knows",
            powerReq: 25000,
            bonus: 1
        }),
        new DancingCoralBonusBase(7, <DancingCoralBonusModel>{
            name: "8th Coral",
            desc: "+{% who knows",
            powerReq: 100000,
            bonus: 1
        }),
        new DancingCoralBonusBase(8, <DancingCoralBonusModel>{
            name: "9th Coral",
            desc: "+{% who knows",
            powerReq: 500000,
            bonus: 1
        })
    ]
}