import { range, secondsSinceUpdate } from "../utility";
import { Achievement } from "./achievements";
import { Alchemy } from "./alchemy";
import { AtomCollider, CarbonAtom } from "./atomCollider";
import { Building } from "./buildings";
import { Cooking } from "./cooking";
import { initBuildingRepo } from "./data/BuildingRepo";
import { ImageData } from "./imageData";
import { ConstructionMastery, Rift } from "./rift";
import { Stamp } from "./stamps";

const BOOKS_FOR_MAX_CHECKOUT = 20;
export class Library {
    currentBooks: number = 0;
    libCheckoutSpeed: number = 0;

    secondsToNextCheckout: number = -1;
    secondsToMaxCheckout: number = -1;

    gamingCheckoutBoost: number = 0;

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
    construction.library.currentBooks = optionsList[55] as number || 0;

    return construction;
}

export const updateConstruction = (data: Map<string, any>) => {
    const construction = data.get("construction") as Construction;
    const alchemy = data.get("alchemy") as Alchemy;
    const stamps = data.get("stamps") as Stamp[][];
    const achievements = data.get("achievements") as Achievement[];
    const cooking = data.get("cooking") as Cooking;
    const timeAway = JSON.parse((data.get("rawData") as { [k: string]: any })["TimeAway"]);
    const collider = data.get("collider") as AtomCollider;
    const rift = data.get("rift") as Rift;

    // Figure out max building levels
    const constMastery = rift.bonuses.find(bonus => bonus.name == "Construct Mastery") as ConstructionMastery;
    construction.buildings.forEach(building => {
        switch(building.index) {
            // Library
            case 1: 
                building.maxLvl += constMastery.getBonusByIndex(3);
                break;
            // Drone
            case 6: 
                building.maxLvl += constMastery.getBonusByIndex(1);
                break;
            // Wizard Towers
            case 9:
            case 10:
            case 11:                
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                const carbonAtom = collider.atoms[5] as CarbonAtom
                building.maxLvl += constMastery.getBonusByIndex(6) + carbonAtom.getExtraLevels();
                break;
            // Shrines
            case 18:
            case 19:
            case 20:                
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
                building.maxLvl += constMastery.getBonusByIndex(5);
                break;
        }


        building.finishedUpgrade = building.currentXP >= building.getBuildCost();
    })
    

    // Lib checkout speed
    const mealBonus = cooking.getMealBonusForKey("Lib");
    const alchemyBonus = alchemy.getBubbleBonusForKey("booksSpeed");
    const vialBonus = alchemy.getVialBonusForKey("TalBookSpd");
    const colliderBonus = collider.atoms[7].getBonus();
    const stampBonus = stamps.flatMap(tab => tab).filter(stamp => stamp.data.effect == "BookSpd").reduce((sum, stamp) => sum += stamp.getBonus(), 0);

    construction.library.libCheckoutSpeed = 4 *
        (3600 / (
            (1 + mealBonus / 100) *
            (1 + colliderBonus / 100) *
            (1 + (5 * construction.buildings[1].level + alchemyBonus + vialBonus + (
                stampBonus + Math.min(30, Math.max(0, 30 * (achievements[145].completed ? 1 : 0))))
            + construction.library.gamingCheckoutBoost) / 100)));
    
    // Figure out how long since library was checked.
    let timeSinceCheck = timeAway["BookLib"];
    const time = new Date()
    const gapFromLastSave = (time.getTime() / 1000) - timeAway['GlobalTime'];
    // If more than 5 mintues from last time save was updated, try and add that
    if (gapFromLastSave > 60 * 5) {
        timeSinceCheck += gapFromLastSave;
    }
    // Fake checkouts if been AFK for a long time.
    while (timeSinceCheck > construction.library.getTimeTillNextCheckout()) {
        timeSinceCheck -= construction.library.getTimeTillNextCheckout();
        construction.library.currentBooks += 1;
    }
    construction.library.secondsToNextCheckout = construction.library.getTimeTillNextCheckout() - timeSinceCheck;
    construction.library.secondsToMaxCheckout = construction.library.getTimeTillMaxCheckout() - timeSinceCheck;

    return construction;
}