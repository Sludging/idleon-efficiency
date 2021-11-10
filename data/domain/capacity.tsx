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

export const CapacityConst = {
    TelekineticStorageSkillIndex: 634,
    ExtraBagsSkillIndex: 78
};

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
    mining: number = 0;
    chopping: number = 0;
    fishing: number = 0;
    monsterMats: number = 0;
    bugs: number = 0;
    souls: number = 0;
    critters: number = 0;
    food: number = 0;

    constructor(bags?: BagCapacity) {
        this.mining = bags?.Mining ?? 0;
        this.chopping = bags?.Chopping ?? 0;
        this.fishing = bags?.Fishing ?? 0;
        this.souls = bags?.Souls ?? 0;
        this.monsterMats = bags?.bCraft ?? 0;
        this.bugs = bags?.Bugs ?? 0;
        this.critters = bags?.Critters ?? 0;
        this.food = bags?.Foods ?? 0;
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

    getMaterialCapacity = (allCapBonuses: number = 0, stampMatCapBonus: number, gemsCapacityBought: number, stampAllCapBonus: number, extraBagsLevel: number, starSignExtraCap: number) => {

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
        return Math.floor(this.monsterMats * stampMatCapMath * gemPurchaseMath * additionalCapMath * talentBonusMath * allCapBonuses);

    }

    getAllCapsBonus = (guildBonus: number = 0, telekineticStorageBonus: number = 0, shrineBonus: number = 0, zergPrayer: number = 0, ruckSackPrayer: number = 0) => {
        // if ("AllCapBonuses" == t)
        // return (
        //     (1 + (F._customBlock_GuildBonuses(2) + r._customBlock_GetTalentNumber(1, 634)) / 100) *
        //     (1 + F._customBlock_Shrine(3) / 100) *
        //     Math.max(1 - F._customBlock_prayersReal(4, 1) / 100, 0.4) *
        //     (1 + F._customBlock_prayersReal(12, 0) / 100)
        // );
        return (
            (1 + (guildBonus + telekineticStorageBonus) / 100) *
            (1 + shrineBonus / 100) *
            Math.max(1 - zergPrayer / 100, 0.4) *
            (1 + ruckSackPrayer / 100)
        );
    }

    getFishCapacity = (allCapBonuses: number = 0, fishCarryCap: number = 0, gemCarryCap: number = 0, fishCapStamp: number = 0, allCapStamp: number = 0, starSign: number = 0) => {
        return Math.floor(
            fishCarryCap *
            (1 + (25 * gemCarryCap) / 100) *
            fishCapStamp *
            (1 + (allCapStamp + starSign) / 100) *
            allCapBonuses
        );
    }
}