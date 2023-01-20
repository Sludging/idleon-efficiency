import { round } from '../utility';
import { Card } from './cards';
import { initShrineRepo, ShrineBase } from './data/ShrineRepo';
import { ImageData } from './imageData';
import { Lab } from './lab';
import { Sailing } from './sailing';
import { ArtifactStatus } from './sailing/artifacts';

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
    artifactAcquired: boolean = false;
    cchizBonus: number = 0;

    constructor(public name: string, public boost: string, public initialBonus: number, public increment: number, public iconName: string) { }

    isShrineActive = (map: number | undefined = undefined) => {
        // If user has Moai Head, shrines are always active.
        if (this.artifactAcquired) {
            return true;
        }

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

    getBonus = (map: number | undefined = undefined) => {
        if (!this.isShrineActive(map)) {
            return 0;
        }

        return (this.initialBonus + ((this.level - 1) * this.increment)) * (1 + this.cchizBonus / 100);
    }

    getBonusText = (map: number | undefined = undefined) => {
        const bonus = this.getBonus(map);
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
    const sailing = data.get("sailing") as Sailing;
    const cards = data.get("cards") as Card[];

    const cchizBonus = cards.find((card) => card.id == "Boss3B")?.getBonus() ?? 0;
    const worldTour = lab.bonuses.find(bonus => bonus.name == "Shrine World Tour")?.active ?? false;
    const shrineArtifact = sailing.artifacts[0];
    shrines.forEach(shrine => {
        shrine.worldTour = worldTour
        shrine.artifactAcquired = shrineArtifact.status != ArtifactStatus.Unobtained;
        shrine.cchizBonus = cchizBonus;
    });
    
    return shrines;
}