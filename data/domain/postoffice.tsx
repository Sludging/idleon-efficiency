import { lavaFunc } from '../utility'

export const PostOfficeConst = {
    BlacksmithBoxIndex: 5,
    MaxBoxLevel: 400
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

        return lavaFunc(this.func, bonusLevel, this.x1, this.x2, round);
    }

    getBonusText = (level: number, index: number): string => {
        return `${this.getBonus(level, index, true)} ${this.bonus}`;
    }
}

export class Box {
    level: number = 0;

    constructor(public name: string, public bonuses: BoxBonus[]) { }
}

export const initPostOffice = () => {
    return [
        new Box("Civil War Memory Box", [new BoxBonus("Base Damage", 1, 0, "add"), new BoxBonus("% Fight AFK Gains", 13, 200, "decay"), new BoxBonus("% Critical Chance", 10, 200, "decay")]),
        new Box("Locally Sourced Organs", [new BoxBonus("Base Max HP", 1, 2, "intervalAdd"), new BoxBonus("% Max HP", 0.1, 0, "add"), new BoxBonus("% Self-Heal Per Min", 25, 200, "decay")]),
        new Box("Magician Starterpack", [new BoxBonus("Base Max MP", 1, 3, "intervalAdd"), new BoxBonus("% Max MP", 0.1, 0, "add"), new BoxBonus("% Faster Cooldowns", 17, 200, "decay")]),
        new Box("Box of Unwanted Stats", [new BoxBonus("Base Accuracy", 0.25, 0, "add"), new BoxBonus("Base Defence", 0.3, 0, "add"), new BoxBonus("% Monster EXP", 29, 170, "decay")]),
        new Box("Dwarven Supplies", [new BoxBonus("% Mining Efficiency", 50, 200, "decay"), new BoxBonus("% Prowess Effect", 40, 150, "decay"), new BoxBonus("% Mining AFK Gain", 15, 175, "decay")]),
        new Box("Blacksmith Box", [new BoxBonus("% Smithing EXP", 50, 200, "decay"), new BoxBonus("% Production Speed", 75, 200, "decay"), new BoxBonus("% to Craft +1 Slot", 30, 150, "decay")]),
        new Box("Taped Up Timber", [new BoxBonus("% Choppin Efficiency", 50, 200, "decay"), new BoxBonus("% Prowess Effect", 40, 150, "decay"), new BoxBonus("% Choppin AFK Gain", 15, 175, "decay")]),
        new Box("Carepack From Mum", [new BoxBonus("% Not Consume Food", 23, 200, "decay"), new BoxBonus("% Health Food Effect", 30, 200, "decay"), new BoxBonus("% Power Food Effect", 30, 200, "decay")]),
        new Box("Sealed Fishheads", [new BoxBonus("% Fishin Efficiency", 50, 200, "decay"), new BoxBonus("% Prowess Effect", 40, 150, "decay"), new BoxBonus("% Fishin AFK Gain", 15, 175, "decay")]),
        new Box("Potion Package", [new BoxBonus("% Brewing Speed", 70, 200, "decay"), new BoxBonus("% Alchemy EXP", 60, 150, "decay"), new BoxBonus("Cranium Cook Time", 0.1, 0, "add")]),
        new Box("Bug Hunting Supplies", [new BoxBonus("% Catchin Efficiency", 50, 200, "decay"), new BoxBonus("% Prowess Effect", 40, 150, "decay"), new BoxBonus("% Catchin AFK Gain", 15, 175, "decay")]),
        new Box("Non Predatory Loot Box", [new BoxBonus("% Drop Rarity", 50, 200, "decay"), new BoxBonus("LUK", 0.25, 0, "add"), new BoxBonus("% Crystal Mob Spawn", 65, 200, "decay")]),
    ];
}