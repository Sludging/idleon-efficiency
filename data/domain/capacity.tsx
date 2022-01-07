// (H._customBlock_MaxCapacity = function (t) {
//     if ("a" == t.charAt(0)) return 1;
//     if ("AllCapBonuses" == t)
//         return (
//             (1 + (F._customBlock_GuildBonuses(2) + r._customBlock_GetTalentNumber(1, 634)) / 100) *
//             (1 + F._customBlock_Shrine(3) / 100) *
//             Math.max(1 - F._customBlock_prayersReal(4, 1) / 100, 0.4) *
//             (1 + F._customBlock_prayersReal(12, 0) / 100)
//         );
//     if ("bOre" == t || "bBar" == t || "cOil" == t) {
//         (t = b.engine.getGameAttribute("MaxCarryCap")), (t = parsenum(t) = null != d.Mining ? t.getReserved("Mining") : t.h.Mining);
//         var n = 1 + r._customBlock_StampBonusOfTypeX("MinCap") / 100,
//             s = b.engine.getGameAttribute("GemItemsPurchased")[58];
//         s = parsenum(s);
//         var a = r._customBlock_StampBonusOfTypeX("AllCarryCap"),
//             A = b.engine.getGameAttribute("DNSM");
//         return (
//             (A = null != d.StarSigns ? A.getReserved("StarSigns") : A.h.StarSigns),
//             (A = null != d.CarryCap ? A.getReserved("CarryCap") : A.h.CarryCap),
//             Math.floor(t * n * (1 + (25 * s) / 100) * (1 + (a + parsenum(A)) / 100) * H._customBlock_MaxCapacity("AllCapBonuses"))
//         );
//     }
//     return "dFish" == t
//         ? ((t = b.engine.getGameAttribute("MaxCarryCap")),
//           (t = parsenum(t) = null != d.Fishing ? t.getReserved("Fishing") : t.h.Fishing),
//           (n = parsenum(n) = b.engine.getGameAttribute("GemItemsPurchased")[58]),
//           (s = 1 + r._customBlock_StampBonusOfTypeX("FishCap") / 100),
//           (a = r._customBlock_StampBonusOfTypeX("AllCarryCap")),
//           (A = b.engine.getGameAttribute("DNSM")),
//           (A = null != d.StarSigns ? A.getReserved("StarSigns") : A.h.StarSigns),
//           (A = null != d.CarryCap ? A.getReserved("CarryCap") : A.h.CarryCap),
//           Math.floor(t * (1 + (25 * n) / 100) * s * (1 + (a + parsenum(A)) / 100) * H._customBlock_MaxCapacity("AllCapBonuses")))
//         : "dBugs" == t
//         ? ((t = b.engine.getGameAttribute("MaxCarryCap")),
//           (t = parsenum(t) = null != d.Bugs ? t.getReserved("Bugs") : t.h.Bugs),
//           (n = parsenum(n) = b.engine.getGameAttribute("GemItemsPurchased")[58]),
//           (s = 1 + r._customBlock_StampBonusOfTypeX("CatchCap") / 100),
//           (a = r._customBlock_StampBonusOfTypeX("AllCarryCap")),
//           (A = b.engine.getGameAttribute("DNSM")),
//           (A = null != d.StarSigns ? A.getReserved("StarSigns") : A.h.StarSigns),
//           (A = null != d.CarryCap ? A.getReserved("CarryCap") : A.h.CarryCap),
//           Math.floor(t * (1 + (25 * n) / 100) * s * (1 + (a + parsenum(A)) / 100) * H._customBlock_MaxCapacity("AllCapBonuses")))
//         : "bLog" == t || "bLeaf" == t
//         ? ((t = b.engine.getGameAttribute("MaxCarryCap")),
//           (t = parsenum(t) = null != d.Chopping ? t.getReserved("Chopping") : t.h.Chopping),
//           (n = 1 + r._customBlock_StampBonusOfTypeX("ChopCap") / 100),
//           (s = parsenum(s) = b.engine.getGameAttribute("GemItemsPurchased")[58]),
//           (a = r._customBlock_StampBonusOfTypeX("AllCarryCap")),
//           (A = b.engine.getGameAttribute("DNSM")),
//           (A = null != d.StarSigns ? A.getReserved("StarSigns") : A.h.StarSigns),
//           (A = null != d.CarryCap ? A.getReserved("CarryCap") : A.h.CarryCap),
//           Math.floor(t * n * (1 + (25 * s) / 100) * (1 + (a + parsenum(A)) / 100) * H._customBlock_MaxCapacity("AllCapBonuses")))
//         : "cFood" == t
//         ? ((t = b.engine.getGameAttribute("MaxCarryCap")),
//           (t = parsenum(t) = null != d.Foods ? t.getReserved("Foods") : t.h.Foods),
//           (n = parsenum(n) = b.engine.getGameAttribute("GemItemsPurchased")[58]),
//           (s = r._customBlock_StampBonusOfTypeX("AllCarryCap")),
//           (a = b.engine.getGameAttribute("DNSM")),
//           (a = null != d.StarSigns ? a.getReserved("StarSigns") : a.h.StarSigns),
//           (a = null != d.CarryCap ? a.getReserved("CarryCap") : a.h.CarryCap),
//           Math.floor(t * (1 + (25 * n) / 100) * (1 + (s + parsenum(a)) / 100) * H._customBlock_MaxCapacity("AllCapBonuses")))
//         : "dCritters" == t
//         ? ((t = b.engine.getGameAttribute("MaxCarryCap")),
//           (t = parsenum(t) = null != d.Critters ? t.getReserved("Critters") : t.h.Critters),
//           (n = parsenum(n) = b.engine.getGameAttribute("GemItemsPurchased")[58]),
//           (s = r._customBlock_StampBonusOfTypeX("AllCarryCap")),
//           (a = b.engine.getGameAttribute("DNSM")),
//           (a = null != d.StarSigns ? a.getReserved("StarSigns") : a.h.StarSigns),
//           (a = null != d.CarryCap ? a.getReserved("CarryCap") : a.h.CarryCap),
//           Math.floor(t * (1 + (25 * n) / 100) * (1 + (s + parsenum(a)) / 100) * H._customBlock_MaxCapacity("AllCapBonuses")))
//         : "dSouls" == t
//         ? ((t = b.engine.getGameAttribute("MaxCarryCap")),
//           (t = parsenum(t) = null != d.Souls ? t.getReserved("Souls") : t.h.Souls),
//           (n = parsenum(n) = b.engine.getGameAttribute("GemItemsPurchased")[58]),
//           (s = r._customBlock_StampBonusOfTypeX("AllCarryCap")),
//           (a = b.engine.getGameAttribute("DNSM")),
//           (a = null != d.StarSigns ? a.getReserved("StarSigns") : a.h.StarSigns),
//           (a = null != d.CarryCap ? a.getReserved("CarryCap") : a.h.CarryCap),
//           Math.floor(t * (1 + (25 * n) / 100) * (1 + (s + parsenum(a)) / 100) * H._customBlock_MaxCapacity("AllCapBonuses")))
//         : "dCurrency" == t || "dQuest" == t || "dStatueStone" == t
//         ? 999999
//         : "bCraft" == t
//         ? ((t = b.engine.getGameAttribute("MaxCarryCap")),
//           (t = parsenum(t) = null != d.bCraft ? t.getReserved("bCraft") : t.h.bCraft),
//           (n = 1 + r._customBlock_StampBonusOfTypeX("MatCap") / 100),
//           (s = parsenum(s) = b.engine.getGameAttribute("GemItemsPurchased")[58]),
//           (a = r._customBlock_StampBonusOfTypeX("AllCarryCap")),
//           (A = b.engine.getGameAttribute("DNSM")),
//           (A = null != d.StarSigns ? A.getReserved("StarSigns") : A.h.StarSigns),
//           (A = null != d.CarryCap ? A.getReserved("CarryCap") : A.h.CarryCap),
//           Math.floor(t * n * (1 + (25 * s) / 100) * (1 + (a + parsenum(A)) / 100) * (1 + r._customBlock_GetTalentNumber(1, 78) / 100) * H._customBlock_MaxCapacity("AllCapBonuses")))
//         : "dExpOrb" == t || "dStone" == t || "dFishToolkit" == t
//         ? 999999
//         : "fillerz" == t
//         ? ((t = b.engine.getGameAttribute("MaxCarryCap")), null != d.fillerz ? t.getReserved("fillerz") : t.h.fillerz)
//         : "d" == t.charAt(0)
//         ? 999999
//         : 2;
// }),

import { SkillsIndex } from "./player";


export const playerInventoryBagMapping = [
    ["0", "1", "InvBag1"],
    ["1", "1", "InvBag2"],
    ["2", "1", "InvBag3"],
    ["3", "1", "InvBag4"],
    ["4", "1", "InvBag5"],
    ["5", "1", "InvBag6"],
    ["6", "1", "InvBag7"],
    ["7", "1", "InvBag8"],
    ["8", "0", "InvBag9"],
    ["9", "0", "InvBag10"],
    ["10", "0", "InvBag11"],
    ["11", "0", "InvBag12"],
    ["12", "0", "InvBag13"],
    ["13", "0", "InvBag14"],
    ["14", "0", "InvBag15"],
    ["15", "0", "InvBag16"],
    ["16", "0", "InvBag17"],
    ["17", "0", "InvBag18"],
    ["18", "0", "InvBag19"],
    ["19", "0", "InvBag20"],
    ["20", "1", "InvBag21"],
    ["21", "1", "InvBag22"],
    ["22", "1", "InvBag23"],
    ["23", "1", "InvBag24"],
    ["24", "1", "InvBag25"],
    ["25", "1", "InvBag26"],
    ["100", "1", "InvBag100"],
    ["101", "1", "InvBag101"],
    ["110", "1", "InvBag110"],
    ["102", "1", "InvBag102"],
    ["103", "1", "InvBag103"],
    ["109", "1", "InvBag109"],
    ["104", "1", "InvBag104"],
    ["105", "1", "InvBag105"],
    ["106", "1", "InvBag106"],
    ["107", "1", "InvBag107"],
    ["108", "0", "InvBag108"],
];

export const CapacityConst = {
    TelekineticStorageSkillIndex: 634,
    ExtraBagsSkillIndex: 78,
    MiningCapStamp: "StampB4",
    ChoppingCapStamp: "StampB6",
    MaterialCapStamp: "StampB8",
    FishCapStamp: "StampB21",
    BugCapStamp: "StampB23",
    AllCarryStamp: "StampC2"
};

const capacityToBagMapping: Record<string, Record<number, string>> = {
    "bCraft": {
        10: "bCraft",
        25: "MaxCapBagM1",
        50: "MaxCapBagM2",
        100: "MaxCapBagM3",
        250: "MaxCapBagM4",
        500: "MaxCapBagM5",
        1000: "MaxCapBagM6",
        2000: "MaxCapBagM7",
        5000: "MaxCapBag",
        10000: "MaxCapBag",
        25000: "MaxCapBag",
        50000: "MaxCapBag",
        100000: "MaxCapBag",
        250000: "MaxCapBag",
        500000: "MaxCapBag",
        1000000: "MaxCapBag",
    },
    "Foods": {
        10: "Foods",
        25: "MaxCapBag6",
        50: "MaxCapBag8",
        100: "MaxCapBag10",
        250: "MaxCapBagF3",
        500: "MaxCapBagF4",
        1000: "MaxCapBagF5",
        2000: "MaxCapBagF6",
        5000: "MaxCapBag",
        10000: "MaxCapBag",
        25000: "MaxCapBag",
        50000: "MaxCapBag",
        100000: "MaxCapBag",
        250000: "MaxCapBag",
        500000: "MaxCapBag",
        1000000: "MaxCapBag",
    },
    "Mining": {
        10: "Mining",
        25: "MaxCapBagT2",
        50: "MaxCapBag1",
        100: "MaxCapBag2",
        250: "MaxCapBag3",
        500: "MaxCapBag4",
        1000: "MaxCapBag5",
        2000: "MaxCapBagMi6",
        5000: "MaxCapBag",
        10000: "MaxCapBag",
        25000: "MaxCapBag",
        50000: "MaxCapBag",
        100000: "MaxCapBag",
        250000: "MaxCapBag",
        500000: "MaxCapBag",
        1000000: "MaxCapBag",
    },
    "Chopping": {
        10: "Chopping",
        25: "MaxCapBagT1",
        50: "MaxCapBag7",
        100: "MaxCapBag9",
        250: "MaxCapBagT3",
        500: "MaxCapBagT4",
        1000: "MaxCapBagT5",
        2000: "MaxCapBagT6",
        5000: "MaxCapBag",
        10000: "MaxCapBag",
        25000: "MaxCapBag",
        50000: "MaxCapBag",
        100000: "MaxCapBag",
        250000: "MaxCapBag",
        500000: "MaxCapBag",
        1000000: "MaxCapBag",
    },
    "Fishing": {
        10: "Fishing",
        25: "MaxCapBagFi0",
        50: "MaxCapBagFi1",
        100: "MaxCapBagFi2",
        250: "MaxCapBagFi3",
        500: "MaxCapBagFi4",
        1000: "MaxCapBagFi5",
        2000: "MaxCapBagFi6",
        5000: "MaxCapBag",
        10000: "MaxCapBag",
        25000: "MaxCapBag",
        50000: "MaxCapBag",
        100000: "MaxCapBag",
        250000: "MaxCapBag",
        500000: "MaxCapBag",
        1000000: "MaxCapBag",
    },
    "Bugs": {
        10: "Bugs",
        25: "MaxCapBagB0",
        50: "MaxCapBagB1",
        100: "MaxCapBagB2",
        250: "MaxCapBagB3",
        500: "MaxCapBagB4",
        1000: "MaxCapBagB5",
        2000: "MaxCapBagB6",
        5000: "MaxCapBag",
        10000: "MaxCapBag",
        25000: "MaxCapBag",
        50000: "MaxCapBag",
        100000: "MaxCapBag",
        250000: "MaxCapBag",
        500000: "MaxCapBag",
        1000000: "MaxCapBag",
    },
    "Critters": {
        10: "Critters",
        25: "Blank",
        50: "MaxCapBagTr0",
        100: "MaxCapBagTr1",
        250: "MaxCapBagTr2",
        500: "MaxCapBagTr3",
        1000: "MaxCapBagTr4",
        2000: "MaxCapBagTr5",
        5000: "MaxCapBag",
        10000: "MaxCapBag",
        25000: "MaxCapBag",
        50000: "MaxCapBag",
        100000: "MaxCapBag",
        250000: "MaxCapBag",
        500000: "MaxCapBag",
        1000000: "MaxCapBag",
    },
    "Souls": {
        10: "Souls",
        25: "Blank",
        50: "MaxCapBagS0",
        100: "MaxCapBagS1",
        250: "MaxCapBagS2",
        500: "MaxCapBagS3",
        1000: "MaxCapBagS4",
        2000: "MaxCapBagS5",
        5000: "MaxCapBag",
        10000: "MaxCapBag",
        25000: "MaxCapBag",
        50000: "MaxCapBag",
        100000: "MaxCapBag",
        250000: "MaxCapBag",
        500000: "MaxCapBag",
        1000000: "MaxCapBag",
    },
}

interface CapacityProps {
    allCapBonuses: number,
    stampMatCapBonus: number, 
    gemsCapacityBought: number, 
    stampAllCapBonus: number, 
    extraBagsLevel: number, 
    starSignExtraCap: number
}


class Bag {
    constructor(public name: string, public capacity: number, public displayName?: string, public skill?: SkillsIndex, ) { }

    getClass = () => {
        if (Object.keys(capacityToBagMapping).includes(this.name)) {
            const bagName = capacityToBagMapping[this.name][this.capacity];
            if (bagName == "Blank" || bagName == this.name) {
                return `icons-3636 icons-MaxCapBagNone`;
            }
            return `icons-3636 icons-${bagName}_x1`;
        }
        return "";
    }

    getCapacity = (props: CapacityProps) => {
        if (this.name == "bCraft") {
            return this.getMaterialCapacity(props.allCapBonuses, props.stampMatCapBonus, props.gemsCapacityBought, props.stampAllCapBonus, props.extraBagsLevel, props.starSignExtraCap);
        }

        if (this.skill != undefined || this.name == "Foods") {
            return this.getSkillCapacity(props.allCapBonuses, props.gemsCapacityBought, props.stampMatCapBonus, props.stampAllCapBonus, props.starSignExtraCap)
        }
        
        return this.capacity;
    }

    
    private getSkillCapacity = (allCapBonuses: number = 0, gemCarryCap: number = 0, skillCapstamp: number = 0, allCapStamp: number = 0, starSign: number = 0) => {
        return Math.floor(
            this.capacity *
            (1 + (25 * gemCarryCap) / 100) *
            (1 + skillCapstamp / 100 ) *
            (1 + (allCapStamp + starSign) / 100) *
            allCapBonuses
        );
    }

    private getMaterialCapacity = (allCapBonuses: number = 0, stampMatCapBonus: number, gemsCapacityBought: number, stampAllCapBonus: number, extraBagsLevel: number, starSignExtraCap: number) => {

        //         ? ((t = b.engine.getGameAttribute("MaxCarryCap")),
        //           (t = parsenum(t) = null != d.bCraft ? t.getReserved("bCraft") : t.h.bCraft),
        //           (n = 1 + r._customBlock_StampBonusOfTypeX("MatCap") / 100),
        //           (s = parsenum(s) = b.engine.getGameAttribute("GemItemsPurchased")[58]),
        //           (a = r._customBlock_StampBonusOfTypeX("AllCarryCap")),
        //           (A = b.engine.getGameAttribute("DNSM")),
        //           (A = null != d.StarSigns ? A.getReserved("StarSigns") : A.h.StarSigns),
        //           (A = null != d.CarryCap ? A.getReserved("CarryCap") : A.h.CarryCap),
        //           Math.floor(t * n * (1 + (25 * s) / 100) * (1 + (a + parsenum(A)) / 100) * (1 + r._customBlock_GetTalentNumber(1, 78) / 100) * H._customBlock_MaxCapacity("AllCapBonuses")))

        const stampMatCapMath = (1 + stampMatCapBonus / 100);
        const gemPurchaseMath = (1 + (25 * gemsCapacityBought) / 100);
        const additionalCapMath = (1 + (stampAllCapBonus + starSignExtraCap) / 100); // ignoring star sign
        const talentBonusMath = (1 + extraBagsLevel / 100);
        const bCraftCap = this.capacity;
        return Math.floor(bCraftCap * stampMatCapMath * gemPurchaseMath * additionalCapMath * talentBonusMath * allCapBonuses);
    }
}

interface BagCapacity {
    Mining: number
    Chopping: number
    Souls: number
    Quests: number
    Fishing: number
    fillerz: number
    Critters: number
    Foods: number
    bCraft: number
    Bugs: number
    Statues: number
}

export class Capacity {
    bags: Bag[];

    constructor(bags?: BagCapacity) {
        this.bags = [];
        this.bags.push(new Bag("Mining", bags?.Mining ?? 0, "Mining", SkillsIndex.Mining));
        this.bags.push(new Bag("Chopping", bags?.Chopping ?? 0, "Chopping", SkillsIndex.Chopping));
        this.bags.push(new Bag("Souls", bags?.Souls ?? 0, "Souls", SkillsIndex.Worship));
        this.bags.push(new Bag("Quests", bags?.Quests ?? 0));
        this.bags.push(new Bag("Fishing", bags?.Fishing ?? 0, "Fishing", SkillsIndex.Fishing));
        this.bags.push(new Bag("fillerz", bags?.fillerz ?? 0));
        this.bags.push(new Bag("Critters", bags?.Critters ?? 0, "Critters", SkillsIndex.Trapping));
        this.bags.push(new Bag("Foods", bags?.Foods ?? 0, "Foods"));
        this.bags.push(new Bag("bCraft", bags?.bCraft ?? 0, "Materials"));
        this.bags.push(new Bag("Bugs", bags?.Bugs ?? 0, "Bugs", SkillsIndex.Catching));
        this.bags.push(new Bag("Statues", bags?.Statues ?? 0));
    }

    getMiningCapacity = () => {
        //         (t = b.engine.getGameAttribute("MaxCarryCap")), (t = parsenum(t) = null != d.Mining ? t.getReserved("Mining") : t.h.Mining);
        //         var n = 1 + r._customBlock_StampBonusOfTypeX("MinCap") / 100,
        //             s = b.engine.getGameAttribute("GemItemsPurchased")[58];
        //         s = parsenum(s);
        //         var a = r._customBlock_StampBonusOfTypeX("AllCarryCap"),
        //             A = b.engine.getGameAttribute("DNSM");
        //         return (
        //             (A = null != d.StarSigns ? A.getReserved("StarSigns") : A.h.StarSigns),
        //             (A = null != d.CarryCap ? A.getReserved("CarryCap") : A.h.CarryCap),
        //             Math.floor(t * n * (1 + (25 * s) / 100) * (1 + (a + parsenum(A)) / 100) * H._customBlock_MaxCapacity("AllCapBonuses"))
        //         );
    }

    getAllCapsBonus = (guildBonus: number = 0, telekineticStorageBonus: number = 0, shrineBonus: number = 0, zergPrayer: number = 0, ruckSackPrayer: number = 0, bribeCapBonus: number = 0) => {
        // if ("AllCapBonuses" == t)
        // return (
        //     (1 + (F._customBlock_GuildBonuses(2) + r._customBlock_GetTalentNumber(1, 634)) / 100) *
        //     (1 + F._customBlock_Shrine(3) / 100) *
        //     Math.max(1 - F._customBlock_prayersReal(4, 1) / 100, 0.4) *
        //     (1 + F._customBlock_prayersReal(12, 0) / 100)
        // );
        return (
            (1 + (guildBonus + telekineticStorageBonus) / 100) *
            (1 + (shrineBonus / 100)) *
            (1 + (bribeCapBonus / 100)) *
            Math.max(1 - zergPrayer / 100, 0.4) *
            (1 + ruckSackPrayer / 100)
        );
    }
}