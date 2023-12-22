import { Alchemy } from "./alchemy";
import { Domain, RawData } from "./base/domain";
import { initRefineryCostRepo } from "./data/RefineryCostRepo";
import { Family } from "./family";
import { Item } from "./items";
import { Lab } from "./lab";
import { ComponentModel } from "./model/componentModel";
import { ConstructionMastery, Rift } from "./rift";
import { SaltLick } from "./saltLick";
import { Sigils } from "./sigils";
import { getStampBonusForKey, Stamp } from "./stamps";
import { ClassIndex } from "./talents";

const RankToPowerCap = "50 50 200 800 3000 8000 14000 20000 30000 40000 50000 65000 80000 100000 200000 300000 400000 500000 600000 700000 800000 900000 1000000 1000000 1000000 1000000".split(" ");

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
    baseCost: ComponentModel[] = []

    getCap = () => {
        // The math.max(x,25) is taken from Lava's code, guess he got lazy to add more values after 25.
        return parseInt(RankToPowerCap[Math.min(this.rank, 25)]);
    }

    getPowerPerCycle = () => {
        // If salt isn't unlocked, just return 1 per cycle.
        if (this.rank == 0) {
            return 1
        }
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
        // For unranked salts, just show base costs.
        if (this.rank == 0) {
            return 1;
        }

        if (salt && taskBought) {
            return Math.floor(Math.pow(this.rank, 1.3));
        }
        return Math.floor(Math.pow(this.rank, 1.5));
    }
}

export class RefineryStorage {
    constructor(public name: string, public quantity: number) { }
}

export class CycleInfo {
    constructor(public name: string, public cycleTime: number, public timePast: number) { }
}

export class Refinery extends Domain {
    salts: Record<string, SaltStatus> = {}
    storage: RefineryStorage[] = []
    cycleInfo: Record<string, CycleInfo> = {}

    shinyBonusSpeed: number = 0;

    getRawKeys(): RawData[] {
        return [
            {key: "Refinery", perPlayer: false, default: []}
        ]
    }

    init(allItems: Item[], charCount: number) {
        const costRepo = initRefineryCostRepo();

        costRepo.forEach((salt, index) => {
            // Init cycle time as max time (900), will be updated in post processing to match reduced values.
            this.cycleInfo["Combustion"] = new CycleInfo("Combustion", 900, 0);
            this.cycleInfo["Synthesis"] = new CycleInfo("Synthesis", 900, 0);

            const newSaltStatus = new SaltStatus()
            newSaltStatus.baseCost = salt.data.cost.map(component => component as ComponentModel);
            this.salts[`Refinery${index + 1}`] = newSaltStatus;
        })

        return this;
    }
    
    parse(data: Map<string, any>): void {
        const refinery = data.get(this.getDataKey()) as Refinery;
        const refineryData = data.get("Refinery") as any[][];

        if (refineryData.length > 0) {
            const unlockedSalts = refineryData[0][0];

            refinery.cycleInfo["Combustion"].timePast = refineryData[0][1];
            refinery.cycleInfo["Synthesis"].timePast = refineryData[0][2];
            refineryData[1].forEach((salt, index) => {
                if (salt != "Blank") {
                    refinery.storage.push(new RefineryStorage(salt, refineryData[2][index]));
                }
            });

            [...Array(unlockedSalts)].forEach((_, i) => {
                const saltIndex = i + 3;
                if (i > Object.keys(refinery.salts).length) {
                    return;
                }
                refinery.salts[`Refinery${i + 1}`].rank = refineryData[saltIndex][1];
                refinery.salts[`Refinery${i + 1}`].progress = refineryData[saltIndex][0];
                refinery.salts[`Refinery${i + 1}`].autoRefine = refineryData[saltIndex][4];
                refinery.salts[`Refinery${i + 1}`].active = refineryData[saltIndex][3] as boolean;
            })
        }
    }
}

// Nothing depends on this, can be last.
export function updateRefinery(data: Map<string, any>) {
    const refinery = data.get("refinery") as Refinery;
    const lab = data.get("lab") as Lab;
    const sigils = data.get("sigils") as Sigils;
    const alchemy = data.get("alchemy") as Alchemy;
    const saltLick = data.get("saltLick") as SaltLick;
    const stamps = data.get("stamps") as Stamp[][];
    const family = data.get("family") as Family;
    const rift = data.get("rift") as Rift;
    const lastUpdated = data.get("lastUpdated") as Date;

    const constMastery = rift.bonuses.find(bonus => bonus.name == "Construct Mastery") as ConstructionMastery;

    const labCycleBonus = lab.bonuses.find(bonus => bonus.name == "Gilded Cyclical Tubing")?.active ?? false ? 3 : 1;
    const vialBonus = alchemy.getVialBonusForKey("RefSpd");
    const saltLickBonus = saltLick.getBonus(2);
    const secondsSinceUpdate = (new Date().getTime() - lastUpdated.getTime()) / 1000;
    const stampBonus = getStampBonusForKey(stamps, "RefinerySpd");
    const divineKnightBonus = family.classBonus.get(ClassIndex.Divine_Knight)?.getBonus() ?? 0;
    const riftBonus = constMastery.getBonusByIndex(0);

    refinery.cycleInfo["Combustion"].cycleTime = Math.ceil((900 * Math.pow(4, 0)) / ((1 + (vialBonus + saltLickBonus + divineKnightBonus + sigils.sigils[10].getBonus() + stampBonus + refinery.shinyBonusSpeed + riftBonus) / 100) * labCycleBonus));
    refinery.cycleInfo["Combustion"].timePast += secondsSinceUpdate;

    refinery.cycleInfo["Synthesis"].cycleTime = Math.ceil((900 * Math.pow(4, 1)) / ((1 + (vialBonus + saltLickBonus + divineKnightBonus + sigils.sigils[10].getBonus() + stampBonus + refinery.shinyBonusSpeed + riftBonus) / 100) * labCycleBonus));
    refinery.cycleInfo["Synthesis"].timePast += secondsSinceUpdate;

    return refinery;
}