import { Alchemy } from "../../world-2/alchemy/alchemy";
import { Domain, RawData } from "../../base/domain";
import { initRefineryCostRepo } from "../../data/RefineryCostRepo";
import { Family } from "../../family";
import { Item } from "../../items";
import { Lab } from "../../world-4/lab";
import { ComponentModel } from "../../model/componentModel";
import { ConstructionMastery, Rift } from "../../world-4/rift";
import { SaltLick } from "./saltLick";
import { Sigils } from "../../world-2/alchemy/sigils";
import { getStampBonusForKey, Stamp } from "../../world-1/stamps";
import { ClassIndex } from "../../talents";
import { Arcade } from "../../world-2/arcade";
import { Votes } from "../../world-2/votes";
import { LegendTalents } from "../../world-7/legendTalents";
import { Companion, getCompanionActiveBonus } from "../../companions";
import { TaskBoard } from "../../tasks";
import { Printer } from "./printer";
import { Cooking } from "../../world-4/cooking";
import { ResearchGrid } from "../../world-7/research";
import { ImageData } from "../../imageData";
import { Storage } from "../../storage";

// Cap power per cycle before rounding down.
const MAX_POWER_PER_CYCLE = 250000;

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

export interface RefineryFuelInput {
    item: string;
    displayName: string;
    imageData: ImageData;
    isSalt: boolean;
    stored: number;
    costPerHour: number;
    costToRankUp: number;
    printedPerHour: number;
    netUsePerHour: number;
}

export class SaltStatus {
    rank: number = 0
    unlocked: boolean = false
    progress: number = 0
    autoRefineEnabled: boolean = false
    active: boolean = false
    baseCost: ComponentModel[] = []
    outputPerHour: number = 0
    consumedPerHour: number = 0
    balancePerHour: number = 0
    maxSafeRank: number | null = null
    fuelTimeSeconds: number | null = null
    storedFuelInsufficient: boolean = false
    storedSaltQuantity: number = 0
    fuelInputs: RefineryFuelInput[] = []
    private powerBonus: number = 0;


    updateSustainability(
        cycleTime: number,
        previous: SaltStatus | undefined,
        previousName: string | undefined,
        previousCycleTime: number,
        next: SaltStatus | undefined,
        name: string,
        nextCycleTime: number,
        saltMeritLevel: number,
        index: number,
        powerBonus: number,
        printer: Printer,
    ) {
        this.powerBonus = powerBonus;
        const power = (salt: SaltStatus) =>
            Math.floor(Math.min(MAX_POWER_PER_CYCLE, Math.pow(salt.rank, 1.3) * (1 + powerBonus)));
        const maxRank = (allowance: number, quantity: number, exponent: number) => {
            let lower = 0;
            let upper = 1;
            while (Math.floor(Math.pow(upper, exponent)) * quantity <= allowance + 1e-9) {
                lower = upper;
                upper *= 2;
            }
            while (lower + 1 < upper) {
                const candidate = Math.floor((lower + upper) / 2);
                if (Math.floor(Math.pow(candidate, exponent)) * quantity <= allowance + 1e-9) {
                    lower = candidate;
                } else {
                    upper = candidate;
                }
            }
            return lower;
        };

        this.outputPerHour = this.unlocked && this.active ? power(this) * 3600 / cycleTime : 0;
        const nextCost = next?.baseCost.find(cost => cost.item === name);
        this.consumedPerHour = this.unlocked && next?.unlocked && next.active && nextCost
            ? Math.floor(Math.pow(next.rank, index + 1 <= saltMeritLevel ? 1.3 : 1.5)) * nextCost.quantity * 3600 / nextCycleTime
            : 0;
        this.balancePerHour = this.outputPerHour - this.consumedPerHour;
        this.maxSafeRank = null;
        if (!this.unlocked) return;

        // The previous salt is assumed active, even when it is currently switched off.
        const previousCost = this.baseCost.find(cost => cost.item === previousName);
        const allowance = previous?.unlocked ? power(previous) * cycleTime / previousCycleTime : 0;
        if (previousCost) {
            this.maxSafeRank = maxRank(allowance, previousCost.quantity, index <= saltMeritLevel ? 1.3 : 1.5);
        }
        for (const cost of this.baseCost) {
            if (cost.item.includes("Refinery")) continue;
            const printed = printer.GetTotalActive(cost.item);
            if (printed > 0) {
                const printerLimit = maxRank(printed * cycleTime / 3600, cost.quantity, 1.5);
                this.maxSafeRank = this.maxSafeRank === null ? printerLimit : Math.min(this.maxSafeRank, printerLimit);
            }
        }
    }

    getCap = () => {
        // The math.max(x,25) is taken from Lava's code, guess he got lazy to add more values after 25.
        return parseInt(RankToPowerCap[Math.min(this.rank, 25)]);
    }

    getPowerPerCycle = () => {
        return Math.floor(Math.min(MAX_POWER_PER_CYCLE, Math.pow(this.rank, 1.3) * (1 + this.powerBonus)));
    }

    getTimeToNextRank = (cycleTime: number) => {
        return this.getCyclesTillNextRank() * cycleTime;
    }

    getCyclesTillNextRank = () => {
        // Round the remaining cycle count to the nearest whole cycle.
        // The Refinery screen fills the final progress without consuming fuel.
        const remainingProgress = Math.max(0, this.getCap() - this.progress);
        return Math.round(remainingProgress / Math.max(this.getPowerPerCycle(), 1));
    }

    prepareFuel(
        name: string,
        quantity: (item: string) => number,
        items: Item[],
        printer: Printer,
        cycleTime: number,
        saltMeritApplies: boolean,
    ) {
        const cycles = this.getCyclesTillNextRank();
        this.storedSaltQuantity = quantity(name);
        this.storedFuelInsufficient = this.unlocked && this.baseCost.some(cost =>
            quantity(cost.item) < cost.quantity * this.getCostMulti(cost.item.includes("Refinery"), saltMeritApplies) * cycles
        );
        this.fuelTimeSeconds = null;
        const netUse = new Map<string, number>();
        for (const item of new Set(this.baseCost.map(cost => cost.item))) {
            const isSalt = item.includes("Refinery");
            const perCycle = this.baseCost.filter(cost => cost.item === item)
                .reduce((total, cost) => total + cost.quantity * this.getCostMulti(isSalt, saltMeritApplies), 0);
            const netConsumption = perCycle * 3600 / cycleTime - (isSalt ? 0 : printer.GetTotalActive(item));
            netUse.set(item, netConsumption);
            if (netConsumption <= 0) continue;
            const time = quantity(item) * 3600 / netConsumption;
            this.fuelTimeSeconds = this.fuelTimeSeconds === null ? time : Math.min(this.fuelTimeSeconds, time);
        }
        this.fuelInputs = this.baseCost.flatMap(cost => {
            const item = items.find(candidate => candidate.internalName === cost.item);
            if (!item) return [];
            const isSalt = cost.item.includes("Refinery");
            const perCycle = cost.quantity * this.getCostMulti(isSalt, saltMeritApplies);
            return [{
                item: cost.item,
                displayName: item.displayName,
                imageData: item.getImageData(),
                isSalt,
                stored: quantity(cost.item),
                costPerHour: perCycle * 3600 / cycleTime,
                costToRankUp: perCycle * cycles,
                printedPerHour: printer.GetTotalActive(cost.item),
                netUsePerHour: Math.max(0, netUse.get(cost.item)!),
            }];
        });
    }


    getCostMulti = (salt: boolean, taskBought: boolean = false) => {
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

    updateSustainability(printer: Printer, saltMeritLevel: number, powerBonus: number) {
        const salts = Object.entries(this.salts);
        const cycles = [this.cycleInfo["Combustion"], this.cycleInfo["Synthesis"], this.cycleInfo["Polymerization"]];
        salts.forEach(([name, salt], index) => {
            const previous = salts[index - 1];
            const next = salts[index + 1];
            salt.updateSustainability(
                cycles[Math.floor(index / 3)].cycleTime,
                previous?.[1], previous?.[0], previous ? cycles[Math.floor((index - 1) / 3)].cycleTime : 0,
                next?.[1], name, next ? cycles[Math.floor((index + 1) / 3)].cycleTime : 0,
                saltMeritLevel, index, powerBonus, printer,
            );
        });
    }

    prepareFuel(storage: Storage, items: Item[], printer: Printer, saltMeritLevel: number) {
        const quantity = (name: string) =>
            (this.storage.find(item => item.name === name)?.quantity ?? 0)
            + storage.chest.filter(item => item.internalName === name).reduce((sum, item) => sum + item.count, 0);
        const cycles = [this.cycleInfo["Combustion"], this.cycleInfo["Synthesis"], this.cycleInfo["Polymerization"]];
        Object.entries(this.salts).forEach(([name, salt], index) => {
            salt.prepareFuel(name, quantity, items, printer, cycles[Math.floor(index / 3)].cycleTime, index <= saltMeritLevel);
        });
    }

    shinyBonusSpeed: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Refinery", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        const costRepo = initRefineryCostRepo();

        costRepo.forEach((salt, index) => {
            // Init cycle time as max time (900), will be updated in post processing to match reduced values.
            this.cycleInfo["Combustion"] = new CycleInfo("Combustion", 900, 0);
            this.cycleInfo["Synthesis"] = new CycleInfo("Synthesis", 900, 0);
            this.cycleInfo["Polymerization"] = new CycleInfo("Polymerization", 900, 0);

            const newSaltStatus = new SaltStatus()
            newSaltStatus.baseCost = salt.data.cost.map(component => component as ComponentModel);
            this.salts[`Refinery${index + 1}`] = newSaltStatus;
        })

        return this;
    }

    parse(data: Map<string, any>): void {
        const refinery = data.get(this.getDataKey()) as Refinery;
        const refineryData = data.get("Refinery") as any[][];

        // Reset some data before every parse;
        refinery.storage = [];

        if (refineryData.length > 0) {
            const unlockedSalts = refineryData[0][0];

            refinery.cycleInfo["Combustion"].timePast = refineryData[0][1];
            refinery.cycleInfo["Synthesis"].timePast = refineryData[0][2];
            refinery.cycleInfo["Polymerization"].timePast = refineryData[0][3]
            refineryData[1].forEach((salt, index) => {
                if (salt != "Blank") {
                    refinery.storage.push(new RefineryStorage(salt, refineryData[2][index]));
                }
            });

            Object.values(refinery.salts).forEach((salt, index) => {
                salt.unlocked = index < unlockedSalts;
                if (refineryData[index + 3]?.[1] != null) {
                    salt.rank = refineryData[index + 3][1];
                }
                if (!salt.unlocked) {
                    salt.active = false;
                }
            });

            [...Array(unlockedSalts)].forEach((_, i) => {
                const saltIndex = i + 3;
                if (i >= Object.keys(refinery.salts).length || !refineryData[saltIndex]) {
                    return;
                }
                refinery.salts[`Refinery${i + 1}`].progress = refineryData[saltIndex][0];
                refinery.salts[`Refinery${i + 1}`].autoRefineEnabled = refineryData[saltIndex][4] > 0;
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
    const arcade = data.get("arcade") as Arcade;
    const votes = data.get("votes") as Votes;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const lastUpdated = data.get("lastUpdated") as Date;
    const cooking = data.get("cooking") as Cooking;
    const research = data.get("research") as ResearchGrid;

    const constMastery = rift.bonuses.find(bonus => bonus.name == "Construct Mastery") as ConstructionMastery;

    const labCycleBonus = lab.bonuses.find(bonus => bonus.name == "Gilded Cyclical Tubing")?.active ?? false ? 3 : 1;
    const vialBonus = alchemy.getVialBonusForKey("RefSpd");
    const saltLickBonus = saltLick.getBonus(2);
    const secondsSinceUpdate = (new Date().getTime() - lastUpdated.getTime()) / 1000;
    const stampBonus = getStampBonusForKey(stamps, "RefinerySpd");
    const divineKnightBonus = family.classBonus.get(ClassIndex.Divine_Knight)?.getBonus() ?? 0;
    const riftBonus = constMastery.getBonusByIndex(0);
    const arcadeBonus = arcade.bonuses.find(bonus => bonus.index == 25)?.getBonus() ?? 0;
    const sigilsBonus = sigils.sigils[10].getBonus() ?? 0;
    const votesBonus = votes.getCurrentBonus(33);
    const legendTalentBonus = legendTalents.getBonusFromIndex(19);
    const researchSpeedBonus = research.getBonusForId(49);
    const polymerizationBonus = cooking.getMealBonusForKey("PolyRefSpd") + research.getBonusForId(48);

    refinery.cycleInfo["Combustion"].cycleTime = Math.ceil(900 * Math.pow(4, 0) / ((1 + (vialBonus + (saltLickBonus + divineKnightBonus + (sigilsBonus + (stampBonus + (refinery.shinyBonusSpeed + (riftBonus + (arcadeBonus + votesBonus + researchSpeedBonus))))))) / 100) * Math.max(1, labCycleBonus) * (1 + legendTalentBonus / 100)));
    refinery.cycleInfo["Combustion"].timePast += secondsSinceUpdate;

    refinery.cycleInfo["Synthesis"].cycleTime = Math.ceil(900 * Math.pow(4, 1) / ((1 + (vialBonus + (saltLickBonus + divineKnightBonus + (sigilsBonus + (stampBonus + (refinery.shinyBonusSpeed + (riftBonus + (arcadeBonus + votesBonus + researchSpeedBonus))))))) / 100) * Math.max(1, labCycleBonus) * (1 + legendTalentBonus / 100)));
    refinery.cycleInfo["Synthesis"].timePast += secondsSinceUpdate;

    // Polymerization has a longer base cycle and its own speed bonuses.
    refinery.cycleInfo["Polymerization"].cycleTime = Math.ceil(900 * Math.pow(4, 2) * 25 / ((1 + (vialBonus + (saltLickBonus + divineKnightBonus + (sigilsBonus + (stampBonus + (refinery.shinyBonusSpeed + (riftBonus + (arcadeBonus + votesBonus + researchSpeedBonus))))))) / 100) * Math.max(1, labCycleBonus) * (1 + legendTalentBonus / 100) * (1 + polymerizationBonus / 100)));
    refinery.cycleInfo["Polymerization"].timePast += secondsSinceUpdate;


    return refinery;
}

export function updateRefinerySustainability(data: Map<string, any>) {
    const refinery = data.get("refinery") as Refinery;
    const printer = data.get("printer") as Printer;
    const taskboard = data.get("taskboard") as TaskBoard;
    const companions = data.get("companions") as Companion[];
    const storage = data.get("storage") as Storage;
    const items = data.get("itemsData") as Item[];
    const saltMerit = taskboard.merits.find(merit => merit.descLine1 === "Refinery Salt Costs don't scale beyond")!;

    refinery.updateSustainability(printer, saltMerit.level, getCompanionActiveBonus(companions, 35));
    refinery.prepareFuel(storage, items, printer, saltMerit.level);
    return refinery;
}
