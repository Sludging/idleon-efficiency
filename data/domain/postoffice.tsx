import { lavaFunc } from '../utility'
import { initPostOfficeUpgradesRepo, PostOfficeUpgradesBase } from './data/PostOfficeUpgradesRepo';
import { ImageData } from './imageData';
import { PostOfficeUpgradeModel } from './model/postOfficeUpgradeModel';

// PostOfficeInfo0 - The current deliverables
// PostOfficeInfo1 - streak / shield info
// PostOfficeInfo2 - rewards?

// CYDeliveryBoxComplete + CYDeliveryBoxMisc + CYDeliveryBoxStreak

export const PostOfficeConst = {
    BlacksmithBoxIndex: 5,
    MaxBoxLevel: 400,
    NonPredatoryBoxIndex: 11
}

export interface PostOfficeExtra {
    complete: number,
    misc: number,
    streak: number
}

export class BoxBonus {
    constructor(public data: PostOfficeUpgradeModel) { }

    getBonus = (level: number, index: number, round = false): number => {
        let bonusLevel = level - Math.round(this.data.investmentReq);

        // Bonus isn't unlocked yet.
        if (bonusLevel <= 0) {
            return 0;
        }
        return lavaFunc(this.data.func, bonusLevel, this.data.x1, this.data.x2, round);
    }

    getBonusText = (level: number, index: number): string => {
        return `${this.getBonus(level, index, true)} ${this.data.bonus}`;
    }
}

export class Box {
    level: number = 0;

    constructor(public index: number, public name: string, public bonuses: BoxBonus[], public maxLevel: number) { }

    getImageData = (): ImageData => {
        return {
            location: `UIboxUpg${this.index}`,
            width: this.index == 0 ? 88 : 96,
            height: this.index == 0 ? 76 : 80
        }
    }

    static fromBase = (data: PostOfficeUpgradesBase[]) => {
        return data.filter(box => box.data.name != "Filler").map((box, index) => new Box(index, box.id, box.data.bonuses.map(bonus => new BoxBonus(bonus)), box.data.maxLevel));
    }
}

export const initPostOffice = () => Box.fromBase(initPostOfficeUpgradesRepo());