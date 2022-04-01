import { round } from '../utility';
import { Lab } from './lab';

export const ShrineConstants = {
    DmgShrine: 0,
    HpDefShrine: 1,
    CarryShrine: 3,
    ExpShrine: 5,
    CrystalShrine: 6
}

export class Shrine {
    currentMap: number = 0;
    level: number = 0;
    accumulatedHours: number = 0;

    worldTour: boolean = false;
    constructor(public name: string, public boost: string, public initialBonus: number, public increment: number, public iconName: string) { }

    isShrineActive = (map: number | undefined = undefined) => {
        // if map is valid, and we are on the same map, shrine is active.
        if (map != undefined && map == this.currentMap) {
            return true;
        }

        // if map is valid and world tour is active, check if shrine in the same world.

        if (map != undefined && this.worldTour) {
            const playerWorld = Math.floor(map / 50);
            const shrineWorld = Math.floor(this.currentMap / 50);
            return playerWorld == shrineWorld;
        }

        return false;
    }

    getBonus = (map: number | undefined = undefined, cardBonus: number = 0) => {
        if (!this.isShrineActive(map)) {
            return 0;
        }

        return (this.initialBonus + ((this.level - 1) * this.increment)) * (1 + cardBonus / 100);
    }

    getBonusText = (map: number | undefined = undefined, cardBonus: number = 0) => {
        const bonus = this.getBonus(map, cardBonus);
        return this.boost.split('.')[0].replace(/\+/g, round(bonus).toString());
    }

    getHourRequirement = () => {
        return Math.floor(20 * (this.level - 1) + 6 * this.level * Math.pow(1.63, this.level - 1))
    }

    getClass = () => {
        return `icons-6666 icons-${this.iconName}`;
    }
}

const initShrines = () => {
    return [
        new Shrine("Woodular Shrine", "Boosts Total Damage of players on this map by +%. @ AFK Time to next Lv: @", 12, 3, "ConTowerB18"),
        new Shrine("Isaccian Shrine", "Boosts Max HP and DEF of players on this map by +%. @ AFK Time to next Lv: @", 12, 3, "ConTowerB19"),
        new Shrine("Crystal Shrine", "Boosts the Lv Up Rate of all Shrines on this map by +%. @ AFK Time to next Lv: @", 20, 4, "ConTowerB20"),
        new Shrine("Pantheon Shrine", "Boosts Carry Capacity of players on this map by +%. @ AFK Time to next Lv: @", 10, 2, "ConTowerB21"),
        new Shrine("Clover Shrine", "Boosts Drop Rate of players on this map by +%. @ AFK Time to next Lv: @", 15, 3, "ConTowerB22"),
        new Shrine("Summereading Shrine", "Boosts ALL Exp Gain of players on this map by +%. @ AFK Time to next Lv: @", 6, 1, "ConTowerB23"),
        new Shrine("Crescent Shrine", "Boosts Crystal and Giant Spawn chance on this map by +%. @ AFK Time to next Lv: @", 50, 10, "ConTowerB24"),
        new Shrine("Undead Shrine", "Boosts Respawn Rate of monsters on this map by +%. @ AFK Time to next Lv: @", 5, 1, "ConTowerB25"),
        new Shrine("Primordial Shrine", "Boosts AFK Gain Rate on this map by +%, up to 80% total. @ AFK Time to next Lv: @", 1, 0.1, "ConTowerB26"),
    ];
}

export default function parseShrines(rawData: Array<Array<number>>) {
    const shrineData = initShrines(); // Initialize stamp array with all pre-populated data
    if (rawData) {
        rawData.forEach((shrine, index) => { // for each shrine
            shrineData[index].currentMap = shrine[0];
            shrineData[index].level = shrine[3];
            shrineData[index].accumulatedHours = shrine[4];
        });
    }
    return shrineData;
}

export const updateShrines = (data: Map<string, any>) => {
    const shrines = data.get("shrines") as Shrine[];
    const lab = data.get("lab") as Lab;

    const worldTour = lab.bonuses.find(bonus => bonus.name == "Shrine World Tour")?.active ?? false;
    shrines.forEach(shrine => shrine.worldTour = worldTour);
    return shrines;
}