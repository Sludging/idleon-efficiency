import { Item } from "./items";

export const SaltCostMap: Map<string, { item: string, quantity: number}[]> = new Map();
SaltCostMap.set("Refinery1", [
    {"item": "Grasslands1", "quantity": 10},
    {"item": "Copper", "quantity": 5}
]);
SaltCostMap.set("Refinery2", [
    {"item": "Forest3", "quantity": 10},
    {"item": "ForestTree", "quantity": 5},
    {"item": "Refinery1", "quantity": 2}
]);
SaltCostMap.set("Refinery3", [
    {"item": "DesertA1", "quantity": 50},
    {"item": "Fish1", "quantity": 30},
    {"item": "Bug1", "quantity": 40},
    {"item": "Refinery2", "quantity": 3}
]);
SaltCostMap.set("Refinery4", [
    {"item": "SnowA1", "quantity": 10},
    {"item": "Soul2", "quantity": 2},
    {"item": "Critter3", "quantity": 1},
    {"item": "Refinery3", "quantity": 1}
]);
SaltCostMap.set("Refinery5", [
    {"item": "SnowB4", "quantity": 25},
    {"item": "Fish4", "quantity": 5},
    {"item": "Bug3", "quantity": 5},
    {"item": "Critter4", "quantity": 5},
    {"item": "Refinery4", "quantity": 2}
]);
SaltCostMap.set("Refinery6", [
    {"item": "SnowC4", "quantity": 50},
    {"item": "VoidBar", "quantity": 5},
    {"item": "Tree7", "quantity": 5},
    {"item": "Bug6", "quantity": 5},
    {"item": "Soul4", "quantity": 5},
    {"item": "Refinery5", "quantity": 3}
]);

const RankToPowerCap = "50 50 200 800 3000 8000 14000 20000 30000 40000 50000 65000 80000 100000 200000 300000 400000 500000 600000 700000 800000 800000 800000 800000 800000 800000 800000 800000".split(" ");

// if ("CapMulti" == t) return Math.ceil(Math.pow(4, n - 1));
// if ("CycleInitialTime" == t)
// return (
//     (n = 900 * Math.pow(4, Math.floor(n))),
//     (t = b.engine.getGameAttribute("DNSM")),
//     (t = null != d.AlchVials ? t.getReserved("AlchVials") : t.h.AlchVials),
//     (t = null != d.RefSpd ? t.getReserved("RefSpd") : t.h.RefSpd),
//     Math.ceil(n / (1 + (parsenum(t) + C._customBlock_SaltLick(2)) / 100))
// );
// if ("FuelCalc" == t) {
// for (
//     t = b.engine.getGameAttribute("DNSM"),
//         null != d.RefineDN0 ? t.setReserved("RefineDN0", 0) : (t.h.RefineDN0 = 0),
//         t = b.engine.getGameAttribute("DNSM"),
//         null != d.RefineDN1 ? t.setReserved("RefineDN1", 0) : (t.h.RefineDN1 = 0),
//         t = 0;
//     6 > t;

// ) {
//     s = t++;
//     var a = b.engine.getGameAttribute("CustomLists");
//     if ("Blank" != (null != d.RefineryInfo ? a.getReserved("RefineryInfo") : a.h.RefineryInfo)[0 | n][s]) {
//         if (((a = b.engine.getGameAttribute("CustomLists")), -1 != ("" + g.string((null != d.RefineryInfo ? a.getReserved("RefineryInfo") : a.h.RefineryInfo)[0 | n][s])).indexOf("Refinery"))) {
//             a = b.engine.gameAttributes;
//             var A = "SaltySpitoon_" + Math.round(n);
//             null != d.DummyText2 ? a.setReserved("DummyText2", A) : (a.h.DummyText2 = A);
//         }
//         (a = b.engine.getGameAttribute("DNSM")), (A = b.engine.getGameAttribute("PixelHelperActor")[5].getValue("ActorEvents_232", "_JustStorageOWNED"));
//         var r = b.engine.getGameAttribute("CustomLists");
//         (r = "" + g.string((null != d.RefineryInfo ? r.getReserved("RefineryInfo") : r.h.RefineryInfo)[0 | n][s])),
//             (A = parsenum(A) = null != d[r] ? A.getReserved(r) : A.h[r]),
//             (r = b.engine.getGameAttribute("Refinery")[(3 + n) | 0][1]),
//             (r = C._customBlock_Refinery("CostsMulti", parsenum(r)));
//         var i = b.engine.getGameAttribute("CustomLists");
//         (i = (null != d.RefineryInfo ? i.getReserved("RefineryInfo") : i.h.RefineryInfo)[0 | n][s + 6]),
//             (A = Math.floor(A / Math.max(0, r * parsenum(i)))),
//             null != d.RefineDN1 ? a.setReserved("RefineDN1", A) : (a.h.RefineDN1 = A),
//             (a = b.engine.gameAttributes),
//             null != d.DummyText2 ? a.setReserved("DummyText2", "no") : (a.h.DummyText2 = "no"),
//             (a = b.engine.getGameAttribute("DNSM")),
//             (a = parsenum(a) = null != d.RefineDN1 ? a.getReserved("RefineDN1") : a.h.RefineDN1),
//             (A = b.engine.getGameAttribute("DNSM")),
//             (a < (parsenum(A) = null != d.RefineDN0 ? A.getReserved("RefineDN0") : A.h.RefineDN0) || 0 == s) &&
//                 ((a = b.engine.getGameAttribute("DNSM")),
//                 (s = b.engine.getGameAttribute("DNSM")),
//                 (s = null != d.RefineDN1 ? s.getReserved("RefineDN1") : s.h.RefineDN1),
//                 null != d.RefineDN0 ? a.setReserved("RefineDN0", s) : (a.h.RefineDN0 = s));
//     }
// }
// return (t = b.engine.getGameAttribute("DNSM")), (parsenum(t) = null != d.RefineDN0 ? t.getReserved("RefineDN0") : t.h.RefineDN0) * C._customBlock_Refinery("CycleInitialTime", Math.floor(n / 3));
// }

export class SaltStatus {
    rank: number = 0
    progress: number = 0
    autoRefine: number = 0
    active: boolean = false
    baseCost: {item: string, quantity: number}[] = []

    getCap = () => {
        return parseInt(RankToPowerCap[this.rank]);
    }

    getPowerPerCycle = () => {
        return Math.floor(Math.pow(this.rank, 1.3));
    }

    getTimeToNextRank = (cycleTime: number) => {
        return this.getCyclesTillNextRank() * cycleTime;
    }

    getCyclesTillNextRank = () => {
        const remainingProgress = this.getCap() - this.progress;
        return Math.ceil(remainingProgress / this.getPowerPerCycle())
    }

    getFuelTime = (itemsInStorage: Item[], itemsInPrinter: Item[], taskBought: boolean = false) => {
        const timeArray: number[] = [];
        this.baseCost.forEach((cost) => {
            const multiplier = this.getCostMulti(cost.item.includes("Refinery"), taskBought);
            const storageInfo = itemsInStorage.find((item) => item.internalName == cost.item);
            if (!storageInfo || storageInfo.count < cost.quantity * multiplier) {
                timeArray.push(0)
            }
            timeArray.push((storageInfo?.count ?? 0) / (cost.quantity * multiplier));
        });

        return Math.min(...timeArray);
    }


    getCostMulti = (salt: boolean, taskBought: boolean = false) => {
        if (salt && taskBought) {
            return Math.floor(Math.pow(this.rank, 1.3));
        }
        return Math.floor(Math.pow(this.rank, 1.5));
    }
}

export class RefineryStorage {
    constructor(public name: string, public quantity: number) {}
}

export class Refinery {
    salts: Record<string, SaltStatus> = {}
    storage: RefineryStorage[] = []
    timePastCombustion: number = 0
    timePastSynthesis: number = 0
}

export default function parseRefinery(rawData: any[][]) {
    const toReturn = new Refinery();
    if (rawData.length > 0) {
        const unlockedSalts = rawData[0][0];
        toReturn.timePastCombustion = rawData[0][1];
        toReturn.timePastSynthesis = rawData[0][2];
        rawData[1].forEach((salt, index) => {
            if (salt != "Blank") {
                toReturn.storage.push(new RefineryStorage(salt, rawData[2][index]));
            }
        });

        [...Array(unlockedSalts)].forEach((_, i) => {
            const newSaltStatus = new SaltStatus()
            const saltIndex = i + 3;
            newSaltStatus.rank = rawData[saltIndex][1];
            newSaltStatus.progress = rawData[saltIndex][0];
            newSaltStatus.autoRefine = rawData[saltIndex][4];
            newSaltStatus.active = rawData[saltIndex][3] as boolean;
            newSaltStatus.baseCost = SaltCostMap.get(`Refinery${i + 1}`) ?? [];
            toReturn.salts[`Refinery${i + 1}`] = newSaltStatus;
        })
    }
    return toReturn;
}