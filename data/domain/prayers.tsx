import { range } from "../utility";
import { initPrayerRepo, PrayerBase } from "./data/PrayerRepo";
import { ImageData } from "./imageData";
import { PrayerModel } from "./model/prayerModel";

export class Prayer {
    level: number = 0;
    totalPrayersOwned: number = 0; // PrayOwned
    constructor(public index: number, public data: PrayerModel) { }

    getLevelCosts = (level: number = this.level): number => {
        if (level == 0) {
            return 0;
        }

        if (level < 6) {
            return Math.round(this.data.costMult * (1 + (4 + (this.index / 25)) * level));
        }

        if (this.index == 9) {
            return Math.round(Math.min(2e9, this.data.costMult * (1 + (2 + (this.index / 20)) * level) * Math.pow(1.3, level - 5)));
        }

        return Math.round(Math.min(2e9, this.data.costMult * (1 + (1 + this.index / 20) * level) * Math.pow(1.12, level - 5)));
    }

    getCostToMax = () => {
        let totalCost = 0;
        range((this.level ?? 0), this.data.maxLevel).forEach((level, _) => {
            totalCost += this.getLevelCosts(level);
        });

        return totalCost;
    }

    getBonus = (): number => {
        return Math.round(this.data.x1 * Math.max(1, 1 + (this.level - 1) / 10));
    }

    getCurse = (): number => {
        return Math.round(this.data.x2 * Math.max(1, 1 + (this.level - 1) / 10));
    }

    getBonusText = (): string => {
        return this.data.bonus.replace("{", this.getBonus().toString());
    }

    getCurseText = (): string => {
        return this.data.curse.replace("{", this.getCurse().toString());
    }

    getImageData = (): ImageData => {
        return {
            location: `Prayer${this.index}`,
            width: 50,
            height: 50
        }
    }

    static fromBase = (data: PrayerBase[]) => {
        return data.map(prayer => new Prayer(prayer.index, prayer.data))
    }
}

export default function parsePrayers(rawData: number[]) {
    const prayerData = Prayer.fromBase(initPrayerRepo());
    if (rawData) {
        rawData.forEach((prayer, index) => { // for each prayer
            if (index < prayerData.length) { // ignore unknown prayers.
                prayerData[index].level = prayer;
            }
        });
    }
    return prayerData;
}