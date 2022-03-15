import { lavaFunc } from '../utility'

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

    getClass = () => {
        if (this.index == 0) {
            return `icons-8876 icons-UIboxUpg${this.index}`
        }
        return `icons-9680 icons-UIboxUpg${this.index}`
    }
}

export const initPostOffice = () => {
    return [
        new Box(0, "Civil War Memory Box", [new BoxBonus("Base Damage", 1, 0, "add"), new BoxBonus("% Fight AFK Gains", 13, 200, "decay"), new BoxBonus("% Critical Chance", 10, 200, "decay")]),
        new Box(1, "Locally Sourced Organs", [new BoxBonus("Base Max HP", 1, 2, "intervalAdd"), new BoxBonus("% Max HP", 0.1, 0, "add"), new BoxBonus("% Self-Heal Per Min", 25, 200, "decay")]),
        new Box(2, "Magician Starterpack", [new BoxBonus("Base Max MP", 1, 3, "intervalAdd"), new BoxBonus("% Max MP", 0.1, 0, "add"), new BoxBonus("% Faster Cooldowns", 17, 200, "decay")]),
        new Box(3, "Box of Unwanted Stats", [new BoxBonus("Base Accuracy", 0.25, 0, "add"), new BoxBonus("Base Defence", 0.3, 0, "add"), new BoxBonus("% Monster EXP", 29, 170, "decay")]),
        new Box(4, "Dwarven Supplies", [new BoxBonus("% Mining Efficiency", 50, 200, "decay"), new BoxBonus("% Prowess Effect", 40, 150, "decay"), new BoxBonus("% Mining AFK Gain", 15, 175, "decay")]),
        new Box(5, "Blacksmith Box", [new BoxBonus("% Smithing EXP", 50, 200, "decay"), new BoxBonus("% Production Speed", 75, 200, "decay"), new BoxBonus("% to Craft +1 Slot", 30, 150, "decay")]),
        new Box(6, "Taped Up Timber", [new BoxBonus("% Choppin Efficiency", 50, 200, "decay"), new BoxBonus("% Prowess Effect", 40, 150, "decay"), new BoxBonus("% Choppin AFK Gain", 15, 175, "decay")]),
        new Box(7, "Carepack From Mum", [new BoxBonus("% Not Consume Food", 23, 200, "decay"), new BoxBonus("% Health Food Effect", 30, 200, "decay"), new BoxBonus("% Power Food Effect", 30, 200, "decay")]),
        new Box(8, "Sealed Fishheads", [new BoxBonus("% Fishin Efficiency", 50, 200, "decay"), new BoxBonus("% Prowess Effect", 40, 150, "decay"), new BoxBonus("% Fishin AFK Gain", 15, 175, "decay")]),
        new Box(9, "Potion Package", [new BoxBonus("% Brewing Speed", 70, 200, "decay"), new BoxBonus("% Alchemy EXP", 60, 150, "decay"), new BoxBonus("Cranium Cook Time", 0.1, 0, "add")]),
        new Box(10, "Bug Hunting Supplies", [new BoxBonus("% Catchin Efficiency", 50, 200, "decay"), new BoxBonus("% Prowess Effect", 40, 150, "decay"), new BoxBonus("% Catchin AFK Gain", 15, 175, "decay")]),
        new Box(11, "Non Predatory Loot Box", [new BoxBonus("% Drop Rarity", 50, 200, "decay"), new BoxBonus("LUK", 0.25, 0, "add"), new BoxBonus("% Crystal Mob Spawn", 65, 200, "decay")]),
        new Box(12, "Deaths Storage Unit", [new BoxBonus("Weapon Power", 22, 200, "decay"), new BoxBonus("% Basic Atk Speed", 15, 150, "decay"), new BoxBonus("% Total Damage", 15, 200, "decay")]),
        new Box(13, "Utilitarian Capsule", [new BoxBonus("% Printer Sample Size", 5, 200, "decay"), new BoxBonus("% Multikill per Tier", 15, 200, "decay"), new BoxBonus("% Cash from Mobs", 39, 200, "decay")]),
        new Box(14, "Lazzzy Lootcrate", [new BoxBonus("% 2X AFK XP chance", 30, 200, "decay"), new BoxBonus("% AFK exp if 36hr+", 35, 200, "decay"), new BoxBonus("% AFK Cash if 36hr+", 35, 200, "decay")]),
        new Box(15, "Science Spare Parts", [new BoxBonus("Lab Efficiency", 4, 0, "add"), new BoxBonus("% Lab EXP gain", 40, 150, "decay"), new BoxBonus("Base LUK", 30, 200, "decay")]),
        new Box(16, "Trapping Lockbox", [new BoxBonus("% Trapping Efficiency", 50, 200, "decay"), new BoxBonus("% Trapping EXP", 50, 200, "decay"), new BoxBonus("% Critters Trapped", 45, 200, "decay")]),
        new Box(17, "Construction Container", [new BoxBonus("% Base Build Rate", 0.25, 0, "add"), new BoxBonus("% Shrine Charge Rate", 75, 200, "decay"), new BoxBonus("% Construction EXP", 0.5, 0, "add")]),
        new Box(18, "Crate of the Creator", [new BoxBonus("% Worship Efficiency", 50, 200, "decay"), new BoxBonus("% Max Charge", 200, 200, "decay"), new BoxBonus("Starting Worship Pts", 90, 200, "decay")]),
        new Box(19, "Chefs Essentials", [new BoxBonus("Cooking Efficiency", 4, 0, "add"), new BoxBonus("% Cooking EXP gain", 60, 200, "decay"), new BoxBonus("% for 2x Ladle Drop", 88, 200, "decay")]),
        new Box(20, "Myriad Crate", [new BoxBonus("Base All Stat", 40, 200, "decay"), new BoxBonus("Base All Efficiency", 100, 200, "decay"), new BoxBonus("% All Skills exp", 30, 200, "decay")]),
        new Box(21, "Filler", [new BoxBonus("Nothing", 50, 200, "decay"), new BoxBonus("Nothing", 0.25, 0, "add"), new BoxBonus("Nothing", 65, 200, "decay")]),
    ];
}