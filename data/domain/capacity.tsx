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

import { range } from "../utility";
import { Domain, RawData } from "./base/domain";
import { Bribe, BribeStatus } from "./bribes";
import { GemStore } from "./gemPurchases";
import { Guild } from "./guild";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { Player } from "./player";
import { Prayer } from "./prayers";
import { Shrine, ShrineConstants } from "./shrines";
import { SkillsIndex } from "./SkillsIndex";
import { Stamp } from "./world-1/stamps";
import { Storage } from "./storage";


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
    ["111", "1", "InvBag111"],
    ["104", "1", "InvBag104"],
    ["105", "1", "InvBag105"],
    ["106", "1", "InvBag106"],
    ["107", "1", "InvBag107"],
    ["108", "1", "InvBag108"]
];

export const CapacityConst = {
    TelekineticStorageSkillIndex: 634,
    ExtraBagsSkillIndex: 78,
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
        5000: "MaxCapBagM8",
        10000: "MaxCapBagM9",
        20000: "MaxCapBagM10",
        25000: "MaxCapBagM11",
        50000: "MaxCapBagM12",
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
        5000: "MaxCapBagF7",
        10000: "MaxCapBagF8",
        20000: "MaxCapBagF9",
        25000: "MaxCapBagF10",
        30000: "MaxCapBagF11",
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
        5000: "MaxCapBagMi7",
        10000: "MaxCapBagMi8",
        20000: "MaxCapBagMi9",
        25000: "MaxCapBagMi110",
        30000: "MaxCapBagMi11",
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
        5000: "MaxCapBagT7",
        10000: "MaxCapBagT8",
        20000: "MaxCapBagT9",
        25000: "MaxCapBagT10",
        30000: "MaxCapBagT11",
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
        5000: "MaxCapBagFi7",
        10000: "MaxCapBagFi8",
        20000: "MaxCapBagFi9",
        25000: "MaxCapBagFi10",
        30000: "MaxCapBagFi11",
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
        5000: "MaxCapBagB7",
        10000: "MaxCapBagB8",
        20000: "MaxCapBagB9",
        25000: "MaxCapBagB10",
        30000: "MaxCapBagB11",
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
        5000: "MaxCapBagTr6",
        10000: "MaxCapBagTr7",
        20000: "MaxCapBagTr8",
        25000: "MaxCapBagTr9",
        30000: "MaxCapBagTr10",
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
        5000: "MaxCapBagS6",
        10000: "MaxCapBagS7",
        20000: "MaxCapBagS8",
        25000: "MaxCapBagS9",
        30000: "MaxCapBagS10",
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

interface CarryData {
    skillIndex?: SkillsIndex,
    displayName: string,
    stampName?: string
}

// This is trying to help hide away the various information and manipulation I do into one location.
// TBH I think it's rather ugly how I do this but .. it works.
const CarryInfo: Record<string, CarryData> = {
    "bCraft": { skillIndex: SkillsIndex.Smithing, displayName: "Materials", stampName: "StampB8" },
    "Foods": { displayName: "Food" },
    "Mining": { skillIndex: SkillsIndex.Mining, displayName: "Mining", stampName: "StampB4" },
    "Chopping": { skillIndex: SkillsIndex.Chopping, displayName: "Chopping", stampName: "StampB6" },
    "Fishing": { skillIndex: SkillsIndex.Fishing, displayName: "Fishing", stampName: "StampB21" },
    "Bugs": { skillIndex: SkillsIndex.Catching, displayName: "Bugs", stampName: "StampB23" },
    "Critters": { skillIndex: SkillsIndex.Trapping, displayName: "Critters" },
    "Souls": { skillIndex: SkillsIndex.Worship, displayName: "Souls" },
}

export class PlayerCapacity {
    bags: Bag[];

    // Calculated
    allCapBonus: number = 0;
    totalInventorySlots: number = 0;

    constructor(public playerID: number, bagInfo: Map<string, number>) {
        this.bags = [];
        Object.keys(CarryInfo).forEach(carryType => {
            // This should never fail but, better safe then sorry.
            if (bagInfo.has(carryType)) {
                const typeInfo = CarryInfo[carryType];
                this.bags.push(new Bag(carryType, bagInfo.get(carryType) as number, typeInfo.displayName, typeInfo.skillIndex, typeInfo.stampName));
            }
        })
    }


    setAllCapsBonus = (guildBonus: number = 0, telekineticStorageBonus: number = 0, shrineBonus: number = 0, zergPrayer: number = 0, ruckSackPrayer: number = 0, bribeCapBonus: number = 0) => {
        this.allCapBonus = (
            (1 + (guildBonus + telekineticStorageBonus) / 100) *
            (1 + (shrineBonus / 100)) *
            Math.max(1 - zergPrayer / 100, 0.4) *
            (1 + (ruckSackPrayer + bribeCapBonus) / 100)
        );
    }
}

class Bag {
    maxCarry: number = 0;

    constructor(public name: string, public capacity: number, public displayName: string, public skill?: SkillsIndex, public stampName?: string) { }

    getImageData = (): ImageData => {
        if (Object.keys(capacityToBagMapping).includes(this.name)) {
            const bagName = capacityToBagMapping[this.name][this.capacity];
            if (bagName == "Blank" || bagName == this.name) {
                return {
                    location: 'MaxCapBagNone',
                    width: 36,
                    height: 36
                }
            }
            return {
                location: `${bagName}_x1`,
                width: 36,
                height: 36
            }
        }
        return {
            location: 'Blank',
            width: 36,
            height: 36,
        };
    }

    setCapacity = (props: CapacityProps) => {
        if (this.name == "bCraft") {
            this.maxCarry = this.getMaterialCapacity(props.allCapBonuses, props.stampMatCapBonus, props.gemsCapacityBought, props.stampAllCapBonus, props.extraBagsLevel, props.starSignExtraCap);
        }
        else if (this.skill != undefined || this.name == "Foods") {
            this.maxCarry = this.getSkillCapacity(props.allCapBonuses, props.gemsCapacityBought, props.stampMatCapBonus, props.stampAllCapBonus, props.starSignExtraCap)
        }
    }


    private getSkillCapacity = (allCapBonuses: number, gemCarryCap: number, skillCapstamp: number, allCapStamp: number, starSign: number) => {
        return Math.floor(
            this.capacity *
            (1 + (25 * gemCarryCap) / 100) *
            (1 + skillCapstamp / 100) *
            (1 + (allCapStamp + starSign) / 100) *
            allCapBonuses
        );
    }

    private getMaterialCapacity = (allCapBonuses: number, stampMatCapBonus: number, gemsCapacityBought: number, stampAllCapBonus: number, extraBagsLevel: number, starSignExtraCap: number) => {
        const stampMatCapMath = (1 + stampMatCapBonus / 100);
        const gemPurchaseMath = (1 + (25 * gemsCapacityBought) / 100);
        const additionalCapMath = (1 + (stampAllCapBonus + starSignExtraCap) / 100);
        const talentBonusMath = (1 + extraBagsLevel / 100);
        const bCraftCap = this.capacity;
        return Math.floor(bCraftCap * stampMatCapMath * gemPurchaseMath * additionalCapMath * talentBonusMath * allCapBonuses);
    }
}

interface BestCapacityPlayer {
    maxCapacity: number
    inventorySlots: number
    player?: Player
    bag?: Bag
}

export class Capacity extends Domain {
    players: PlayerCapacity[] = [];
    maxCapacityByType: Record<string, BestCapacityPlayer> = {
        "bCraft": { maxCapacity: 0, inventorySlots: 0 },
        "Foods": { maxCapacity: 0, inventorySlots: 0 },
        "Mining": { maxCapacity: 0, inventorySlots: 0 },
        "Chopping": { maxCapacity: 0, inventorySlots: 0 },
        "Fishing": { maxCapacity: 0, inventorySlots: 0 },
        "Bugs": { maxCapacity: 0, inventorySlots: 0 },
        "Critters": { maxCapacity: 0, inventorySlots: 0 },
        "Souls": { maxCapacity: 0, inventorySlots: 0 },
    }

    getRawKeys(): RawData[] {
        return [
            {key: "MaxCarryCap_", perPlayer: true, default: new Map()}
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const capacity = data.get(this.getDataKey()) as Capacity;
        const charCount = data.get("charCount") as number;
        // Array of `MaxCarryCap_<x>` data from each player.
        const maxCapacities = range(0, charCount).map((_, index) => new Map(Object.entries(data.get(`MaxCarryCap_${index}`))))

        // Capacity data has no "persistence", so we reset the previous data.
        capacity.players = [];
        maxCapacities.forEach((playerCapacity, index) => {
            capacity.players.push(new PlayerCapacity(index, playerCapacity as Map<string, number>));
        })
    }
}

export function updateCapacity(data: Map<string, any>) {
    const capacity = data.get("capacity") as Capacity;
    const guild = data.get("guild") as Guild;
    const shrines = data.get("shrines") as Shrine[];
    const bribes = data.get("bribes") as Bribe[];
    const players = data.get("players") as Player[];
    const stamps = (data.get("stamps") as Stamp[][]).flatMap(tab => tab);
    const prayers = data.get("prayers") as Prayer[];
    const gemStore = data.get("gems") as GemStore;

    // Inventory slots
    const storage = data.get("storage") as Storage;

    const guildCarryBonus = guild.guildBonuses[2].getBonus();
    const bribeCapBonus = bribes.find(bribe => bribe.name == "Bottomless Bags")?.status == BribeStatus.Purchased ? 5 : 0;
    const zergPrayer = prayers[4];
    const ruckSackPrayer = prayers[12];
    const allCapStampBonus = stamps.find((stamp) => stamp.raw_name == CapacityConst.AllCarryStamp)?.getBonus() ?? 0;
    const gemCapacityBonus = gemStore.purchases[58].pucrhased;

    players.forEach(player => {
        // All Cap Math
        const currentPlayerInfo = capacity.players[player.playerID];

        if (currentPlayerInfo) {
            const telekineticStorageBonus = player.getTalentBonus(CapacityConst.TelekineticStorageSkillIndex);
            const extraBagsTalentBonus = player.getTalentBonus(CapacityConst.ExtraBagsSkillIndex);
            const starSignExtraCap = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Carry Cap"), 0);

            const carryCapShrineBonus = shrines[ShrineConstants.CarryShrine].getBonus(player.currentMapId);
            const zergPrayerBonus = player.activePrayers.includes(4) ? zergPrayer.getCurse() : 0;
            const ruckSackPrayerBonus = player.activePrayers.includes(12) ? ruckSackPrayer.getBonus() : 0;

            currentPlayerInfo.setAllCapsBonus(guildCarryBonus, telekineticStorageBonus, carryCapShrineBonus, zergPrayerBonus, ruckSackPrayerBonus, bribeCapBonus);

            // Set max inventory slots.
            currentPlayerInfo.totalInventorySlots = storage.playerStorage[player.playerID].filter((item) => item.internalName != "LockedInvSpace").length;

            // Update individual bag carry caps.
            Object.keys(CarryInfo).forEach(carryType => {
                const playerBag = currentPlayerInfo.bags.find(bag => bag.name == carryType);
                // This shouldn't happen but, handling it to be safe and to make TS happy.
                if (!playerBag) {
                    return;
                }
                let stampBonus = 0;
                if (playerBag.stampName) {
                    const skillLevel = playerBag.skill && player.skills.get(playerBag.skill)?.level
                    stampBonus = stamps.find(stamp => stamp.raw_name == playerBag.stampName)?.getBonus(skillLevel) ?? 0;
                }

                playerBag.setCapacity({
                    allCapBonuses: currentPlayerInfo.allCapBonus,
                    stampMatCapBonus: stampBonus,
                    gemsCapacityBought: gemCapacityBonus,
                    stampAllCapBonus: allCapStampBonus,
                    extraBagsLevel: extraBagsTalentBonus,
                    starSignExtraCap: starSignExtraCap
                })

                // Keep track of highest carry cap player per type.
                if (playerBag.maxCarry > capacity.maxCapacityByType[carryType].maxCapacity) {
                    capacity.maxCapacityByType[carryType].maxCapacity = playerBag.maxCarry;
                    capacity.maxCapacityByType[carryType].player = player;
                    capacity.maxCapacityByType[carryType].inventorySlots = currentPlayerInfo.totalInventorySlots;
                    capacity.maxCapacityByType[carryType].bag = playerBag;
                }
            })
        }
    })

    return capacity;
}