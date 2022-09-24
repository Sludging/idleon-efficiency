import { range, secondsSinceUpdate } from "../utility";
import { Achievement } from "./achievements";
import { Alchemy } from "./alchemy";
import { Building } from "./buildings";
import { Cooking } from "./cooking";
import { initBuildingRepo } from "./data/BuildingRepo";
import { ImageData } from "./imageData";
import { Stamp } from "./stamps";

const BOOKS_FOR_MAX_CHECKOUT = 20;
export class Library {
    currentBooks: number = 0;
    libCheckoutSpeed: number = 0;

    secondsToNextCheckout: number = -1;
    secondsToMaxCheckout: number = -1;

    getTimeTillNextCheckout = (currentBooks: number = this.currentBooks) => {
        return Math.round(this.libCheckoutSpeed * (1 + 10 * Math.pow(currentBooks, 1.4) / 100));
    }

    getTimeTillMaxCheckout = () => {
        if (this.currentBooks >= BOOKS_FOR_MAX_CHECKOUT) {
            return 0;
        } 

        return range(this.currentBooks, BOOKS_FOR_MAX_CHECKOUT).reduce((sum, bookCount) => {
            sum += this.getTimeTillNextCheckout(bookCount);
            return sum;
        }, 0)
    }

    getImageData = (): ImageData => {
        return {
            location: "Libz",
            height: 37,
            width: 35,
        }
    }
}

export class Construction {
    buildings: Building[];
    buildingSlots: number[] = [-1, -1, -1, -1, -1, -1, -1, -1];
    cogProgress: { name: string, progress: number }[] = [
        { name: "Nooby", progress: 0 },
        { name: "Decent", progress: 0 },
        { name: "Superb", progress: 0 },
        { name: "Ultimate", progress: 0 },
    ];
    library: Library = new Library();

    constructor() {
        this.buildings = Building.fromBase(initBuildingRepo());
    }
}

export default function parseConstruction(towerData: number[], optionsList: any[]) {
    const construction = new Construction();
    construction.buildings.forEach((building) => {
        building.level = towerData[building.index];
        // Next level is unlocked if the next index for this building is +1.
        building.nextLevelUnlocked = (building.level + 1) == towerData[building.index + construction.buildings.length];
        // Current XP is the last set of indexes, with 12 in the middle of misc info.
        building.currentXP = towerData[building.index + 12 + construction.buildings.length * 2];
    });
    // 55 = building slot 1 = tower number
    // 56 = building slot 2 = -1 if empty
    // 57 = building slot 3 = -1 if empty
    // 58 = building slot 4 = -1 if empty
    // 59 = building slot 5 = -1 if empty
    // 60 = building slot 6 = -1 if empty
    // 61 = building slot 7 = -1 if empty
    // 62 = building slot 8 = -1 if empty
    towerData.slice(54, 62).forEach((buildingSlot, index) => {
        construction.buildingSlots[index] = buildingSlot;
    })
    // 63 = Progress on nooby cogs
    // 64 = Progress on decent cogs
    // 65 = Progress on superb cogs
    // 66 = Progress on ultimate cogs
    towerData.slice(62, 66).forEach((cogProgress, index) => {
        construction.cogProgress[index].progress = cogProgress;
    })

    // current book count;
    construction.library.currentBooks = optionsList[55] as number;

    return construction;
}

export const updateConstruction = (data: Map<string, any>) => {
    const construction = data.get("construction") as Construction;
    const alchemy = data.get("alchemy") as Alchemy;
    const stamps = data.get("stamps") as Stamp[][];
    const achievements = data.get("achievements") as Achievement[];
    const cooking = data.get("cooking") as Cooking;
    const timeAway = JSON.parse((data.get("rawData") as { [k: string]: any })["TimeAway"]);
    // Lib checkout speed
    const mealBonus = (1 + cooking.getMealBonusForKey("Lib") / 100);
    const alchemyBonus = alchemy.getBubbleBonusForKey("booksSpeed");
    const vialBonus = alchemy.getVialBonusForKey("TalBookSpd");
    const stampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.data.effect == "BookSpd").reduce((sum, stamp) => sum += stamp.getBonus(), 0);

    construction.library.libCheckoutSpeed = 4 *
        (3600 / (mealBonus *
            (1 + (5 * construction.buildings[1].level + alchemyBonus + vialBonus + (
                stampBonus + Math.min(30, Math.max(0, 30 * (achievements[145].completed ? 1 : 0))))) / 100)));
    
    construction.library.secondsToNextCheckout = construction.library.getTimeTillNextCheckout() - secondsSinceUpdate(timeAway["Global"]) - timeAway["BookLib"];
    construction.library.secondsToMaxCheckout = construction.library.getTimeTillMaxCheckout() - secondsSinceUpdate(timeAway["Global"]) - timeAway["BookLib"];

    return construction;
}

// if ("BookReqTime" == c) {
//     var Vf = 1 + A._customBlock_MealBonus("Lib") / 100,
//         Fg = a.engine.getGameAttribute("TowerInfo")[1],
//         ng = null == Fg ? 0 : parseNumber(Fg),
//         gg = a.engine.getGameAttribute("DNSM"),
//         Od = null != e.AlchBubbles ? gg.getReserved("AlchBubbles") : gg.h.AlchBubbles,
//         je = null != e.booksSpeed ? Od.getReserved("booksSpeed") : Od.h.booksSpeed,
//         ig = null == je ? 0 : parseNumber(je)
//         Cf = a.engine.getGameAttribute("DNSM"),
//         sg = null != e.AlchVials ? Cf.getReserved("AlchVials") : Cf.h.AlchVials,
//         Wf = null != e.TalBookSpd ? sg.getReserved("TalBookSpd") : sg.h.TalBookSpd,
//         dg = 4 * (
    // 3600 / (Vf * (1 + (5 * ng + ig + parseNumber(Wf) +
    // (t._customBlock_StampBonusOfTypeX("BookSpd") +
    // Math.min(30, Math.max(0, 30 * w._customBlock_AchieveStatus(145)))))) / 100))),
//         Ig = a.engine.getGameAttribute("OptionsListAccount")[55];
//     return Math.round(dg * (1 + 10 * Math.pow(parseNumber(Ig), 1.4) / 100))
// }