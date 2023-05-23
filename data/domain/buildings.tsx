import { range } from "../utility";
import { BuildingBase } from "./data/BuildingRepo";
import { ImageData } from "./imageData";
import { BuildingModel } from "./model/buildingModel";
import { ComponentModel } from "./model/componentModel";

// Randolist[13]
const buildMultiplier = "15 200 2250 12000 25000 60000 100000 150000 50000000 25 700 4500 20000 40000 125000 400000 1000000 3500000 60 1250 6000 27500 70000 200000 2000000 7000000 60000000".split(" ");

export class Building {
    description: string
    bonus: string
    lvlUpReq: ComponentModel[]
    maxLvl: number
    costIncrement: number
    bonusInc: number[]
    misc: number
    name: string

    level: number = 0;
    nextLevelUnlocked: boolean = false;
    finishedUpgrade: boolean = false;
    currentXP: number = 0;

    constructor(public index: number, data: BuildingModel) {
        this.description = data.description;
        this.bonus = data.bonus;
        this.lvlUpReq = data.lvlUpReq as ComponentModel[];
        this.maxLvl = data.maxLvl;
        this.costIncrement = data.costInc;
        this.bonusInc = data.bonusInc;
        this.misc = data.misc;
        this.name = data.name;
    }

    getImageData = (): ImageData => {
        return {
            location: `ConTowerB${this.index}`,
            height: 66,
            width: 66
        }
    }

    getBuildCost = (level: number = this.level) => {
        //misc stores the max possible level after all upgrades (just how wikibot does it)
        if (level == Math.max(this.maxLvl, this.misc)) {
            return 0;
        }
        
        if (this.index == 0) {
            const math1 = Math.pow(level + 1, 2);
            return 20 * math1 * Math.pow(1.6, level + 1);
        }
        else {
            const multiplier = Number(buildMultiplier[this.index]);
            return multiplier * Math.pow(this.costIncrement, level);
        }
    }

    // Gives NEXT level costs, so if input 0 it will give level 1, etc...
    getLevelCosts = (level: number = this.level, costCruncher: Building): { item: string, quantity: number}[] => {
        const toReturn: { item: string, quantity: number}[] = [];
        this.lvlUpReq.forEach(item => {
            const math1 =  Math.min(0.1, 0.1 * Math.floor((costCruncher.level + 999) / 1000));
            const math2 = Math.max(0, costCruncher.level - 1);
            const costReduction = Math.max(0.2, 1 - (math1 + (math2 * costCruncher.bonusInc[0]) / 100))
            if (item.item.includes("Refinery")) {
                toReturn.push({ 
                    item: item.item,
                    quantity: Math.floor(costReduction * item.quantity * (level + 1))
                });
            }
            else {
                toReturn.push({
                    item: item.item,
                    quantity: Math.floor(costReduction * item.quantity * Math.pow(this.costIncrement + 0.03 - ((this.costIncrement + 0.03 - 1.05) * level) / (this.maxLvl / 2 + level), level))
                })
            }
        });

        return toReturn;
    }

    getMaxLevelCosts = (costCruncher: Building): { item: string, quantity: number}[] => {
        let toReturn: { item: string, quantity: number}[] = [];
        range(this.level, this.maxLvl).forEach(level => {
            const thisLevelCosts = this.getLevelCosts(level, costCruncher);
            if (toReturn.length == 0) {
                toReturn = thisLevelCosts;
            }
            else {
                thisLevelCosts.forEach(levelCost => {
                    const matchingItem = toReturn.find(costItem => costItem.item == levelCost.item);
                    if (matchingItem) {
                        matchingItem.quantity += levelCost.quantity;
                    }
                });
            }
        })

        return toReturn;
    }

    // if ("TowerBuildReq" == t) {
    //     if (0 == n) {
    //         var ws = b.engine.getGameAttribute("TowerInfo")[0 | n],
    //             Qs = Math.pow(parsenum(ws) + 1, 2),
    //             Xs = b.engine.getGameAttribute("TowerInfo")[0 | n];
    //         return 20 * Qs * Math.pow(1.6, parsenum(Xs) + 1);
    //     }
    //     var zs = b.engine.getGameAttribute("CustomLists"),
    //         Ls = (null != d.RANDOlist ? zs.getReserved("RANDOlist") : zs.h.RANDOlist)[13][0 | n],
    //         Zs = parsenum(Ls),
    //         Ws = b.engine.getGameAttribute("CustomLists"),
    //         Ys = (null != d.TowerInfo ? Ws.getReserved("TowerInfo") : Ws.h.TowerInfo)[0 | n][9],
    //         Hs = parsenum(Ys),
    //         Js = b.engine.getGameAttribute("TowerInfo")[0 | n];
    //     return Zs * Math.pow(Hs, parsenum(Js));
    // }
    // if ("TowerSaltCost" == t) {
    //     var js = b.engine.getGameAttribute("TowerInfo")[5],
    //         qs = Math.min(0.1, 0.1 * Math.floor((parsenum(js) + 999) / 1000)),
    //         Ks = b.engine.getGameAttribute("TowerInfo")[5],
    //         $s = Math.max(0, parsenum(Ks) - 1),
    //         ea = b.engine.getGameAttribute("CustomLists"),
    //         ta = (null != d.TowerInfo ? ea.getReserved("TowerInfo") : ea.h.TowerInfo)[5][2],
    //         na = Math.max(0.2, 1 - (qs + ($s * parsenum(ta)) / 100)),
    //         sa = b.engine.getGameAttribute("CustomLists"),
    //         aa = (null != d.TowerInfo ? sa.getReserved("TowerInfo") : sa.h.TowerInfo)[0 | n][6],
    //         Aa = parsenum(aa),
    //         ra = b.engine.getGameAttribute("TowerInfo")[0 | n];
    //     return Math.floor(na * Aa * (parsenum(ra) + 1));
    // }
    // if ("TowerMatCost" == t) {
    //     var la = b.engine.getGameAttribute("TowerInfo")[5],
    //         ia = Math.min(0.1, 0.1 * Math.floor((parsenum(la) + 999) / 1000)),
    //         oa = b.engine.getGameAttribute("TowerInfo")[5],
    //         ua = Math.max(0, parsenum(oa) - 1),
    //         ga = b.engine.getGameAttribute("CustomLists"),
    //         ma = (null != d.TowerInfo ? ga.getReserved("TowerInfo") : ga.h.TowerInfo)[5][2],
    //         da = Math.max(0.2, 1 - (ia + (ua * parsenum(ma)) / 100)),
    //         ca = b.engine.getGameAttribute("CustomLists"),
    //         pa = (null != d.TowerInfo ? ca.getReserved("TowerInfo") : ca.h.TowerInfo)[0 | n][7],
    //         ha = parsenum(pa),
    //         ba = b.engine.getGameAttribute("CustomLists"),
    //         fa = (null != d.TowerInfo ? ba.getReserved("TowerInfo") : ba.h.TowerInfo)[0 | n][9],
    //         Ra = parsenum(fa),
    //         ya = b.engine.getGameAttribute("CustomLists"),
    //         va = (null != d.TowerInfo ? ya.getReserved("TowerInfo") : ya.h.TowerInfo)[0 | n][9],
    //         Fa = parsenum(va),
    //         Na = b.engine.getGameAttribute("TowerInfo")[0 | n],
    //         Ia = parsenum(Na),
    //         Da = b.engine.getGameAttribute("CustomLists"),
    //         Ua = (null != d.TowerInfo ? Da.getReserved("TowerInfo") : Da.h.TowerInfo)[0 | n][8],
    //         Ea = parsenum(Ua),
    //         Sa = b.engine.getGameAttribute("TowerInfo")[0 | n],
    //         Ta = parsenum(Sa),
    //         _a = b.engine.getGameAttribute("TowerInfo")[0 | n];
    //     return Math.floor(da * ha * Math.pow(Ra + 0.03 - ((Fa + 0.03 - 1.05) * Ia) / (Ea / 2 + Ta), parsenum(_a)));
    // }
    // if ("TowerBuildSlots" == t) {
    //     var Ga = b.engine.getGameAttribute("GemItemsPurchased")[117],
    //         Ma = parsenum(Ga),
    //         Va = b.engine.getGameAttribute("Tasks")[2][2][0];
    //     return Math.round(2 + (Ma + Math.ceil(parsenum(Va) / 2)));
    // }

    static fromBase = (data: BuildingBase[]) => {
        return data.map(building => new Building(building.index, building.data));
    }
}