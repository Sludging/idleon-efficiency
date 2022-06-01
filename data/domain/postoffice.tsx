import { lavaFunc } from '../utility'
import { initPostOfficeUpgradesRepo, PostOfficeUpgradesBase } from './data/PostOfficeUpgradesRepo';
import { ImageData } from './imageData';

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
    constructor(public bonus: string, public x1: number, public x2: number, public func: string) { }

    getBonus = (level: number, index: number, round = false): number => {
        let bonusLevel = level;
        if (index == 1) {
            bonusLevel -= 25;
        }
        if (index == 2) {
            bonusLevel -= 100;
        }

        if (bonusLevel <= 0) {
            return 0;
        }

        return lavaFunc(this.func, bonusLevel, this.x1, this.x2, round);
    }

    getBonusText = (level: number, index: number): string => {
        return `${this.getBonus(level, index, true)} ${this.bonus}`;
    }
}

export class Box {
    level: number = 0;

    constructor(public index: number, public name: string, public bonuses: BoxBonus[]) { }

    getImageData = (): ImageData => {
        return {
            location: `UIboxUpg${this.index}`,
            width: this.index == 0 ? 88 : 96,
            height: this.index == 0 ? 76 : 80
        }
    }

    static fromBase = (data: PostOfficeUpgradesBase[]) => {
        return data.map((box, index) => new Box(index, box.id, box.data.bonuses.map(bonus => new BoxBonus(bonus.bonus, bonus.x1, bonus.x2, bonus.func))));
    }
}

export const initPostOffice = () => Box.fromBase(initPostOfficeUpgradesRepo());