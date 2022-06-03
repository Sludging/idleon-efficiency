import { round } from '../utility';
import { initShrineRepo, ShrineBase } from './data/ShrineRepo';
import { ImageData } from './imageData';
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

    getImageData = (): ImageData => {
        return {
            location: this.iconName,
            width: 66,
            height: 66
        }
    }

    static fromBase = (data: ShrineBase[]) => {
        return data.map(shrine => new Shrine(shrine.data.name, shrine.data.desc, shrine.data.baseBonus, shrine.data.increment, `ConTowerB${18 + shrine.index}`))
    }
}

export default function parseShrines(rawData: Array<Array<number>>) {
    const shrineData = Shrine.fromBase(initShrineRepo());
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