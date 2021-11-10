interface BoxBonus {
    bonus: string
    x1: number
    x2: number
    func: string
}

export class Box {
    level: number = 0;

    constructor(public name: string, public bonuses: BoxBonus[]) { }
}

export const initPostOffice = () => {
    return [
        new Box("Civil War Memory Box", JSON.parse('[{"bonus": "Base Damage", "x1": 1, "x2": 0, "func": "add"}, {"bonus": "% Fight AFK Gains", "x1": 13, "x2": 200, "func": "decay"}, {"bonus": "% Critical Chance", "x1": 10, "x2": 200, "func": "decay"}]')),
        new Box("Locally Sourced Organs", JSON.parse('[{"bonus": "Base Max HP", "x1": 1, "x2": 2, "func": "intervalAdd"}, {"bonus": "% Max HP", "x1": 0.1, "x2": 0, "func": "add"}, {"bonus": "% Self-Heal Per Min", "x1": 25, "x2": 200, "func": "decay"}]')),
        new Box("Magician Starterpack", JSON.parse('[{"bonus": "Base Max MP", "x1": 1, "x2": 3, "func": "intervalAdd"}, {"bonus": "% Max MP", "x1": 0.1, "x2": 0, "func": "add"}, {"bonus": "% Faster Cooldowns", "x1": 17, "x2": 200, "func": "decay"}]')),
        new Box("Box of Unwanted Stats", JSON.parse('[{"bonus": "Base Accuracy", "x1": 0.25, "x2": 0, "func": "add"}, {"bonus": "Base Defence", "x1": 0.3, "x2": 0, "func": "add"}, {"bonus": "% Monster EXP", "x1": 29, "x2": 170, "func": "decay"}]')),
        new Box("Dwarven Supplies", JSON.parse('[{"bonus": "% Mining Efficiency", "x1": 50, "x2": 200, "func": "decay"}, {"bonus": "% Prowess Effect", "x1": 40, "x2": 150, "func": "decay"}, {"bonus": "% Mining AFK Gain", "x1": 15, "x2": 175, "func": "decay"}]')),
        new Box("Blacksmith Box", JSON.parse('[{"bonus": "% Smithing EXP", "x1": 50, "x2": 200, "func": "decay"}, {"bonus": "% Production Speed", "x1": 75, "x2": 200, "func": "decay"}, {"bonus": "% to Craft +1 Slot", "x1": 30, "x2": 150, "func": "decay"}]')),
        new Box("Taped Up Timber", JSON.parse('[{"bonus": "% Choppin Efficiency", "x1": 50, "x2": 200, "func": "decay"}, {"bonus": "% Prowess Effect", "x1": 40, "x2": 150, "func": "decay"}, {"bonus": "% Choppin AFK Gain", "x1": 15, "x2": 175, "func": "decay"}]')),
        new Box("Carepack From Mum", JSON.parse('[{"bonus": "% Not Consume Food", "x1": 23, "x2": 200, "func": "decay"}, {"bonus": "% Health Food Effect", "x1": 30, "x2": 200, "func": "decay"}, {"bonus": "% Power Food Effect", "x1": 30, "x2": 200, "func": "decay"}]')),
        new Box("Sealed Fishheads", JSON.parse('[{"bonus": "% Fishin Efficiency", "x1": 50, "x2": 200, "func": "decay"}, {"bonus": "% Prowess Effect", "x1": 40, "x2": 150, "func": "decay"}, {"bonus": "% Fishin AFK Gain", "x1": 15, "x2": 175, "func": "decay"}]')),
        new Box("Potion Package", JSON.parse('[{"bonus": "% Brewing Speed", "x1": 70, "x2": 200, "func": "decay"}, {"bonus": "% Alchemy EXP", "x1": 60, "x2": 150, "func": "decay"}, {"bonus": "Cranium Cook Time", "x1": 0.1, "x2": 0, "func": "add"}]')),
        new Box("Bug Hunting Supplies", JSON.parse('[{"bonus": "% Catchin Efficiency", "x1": 50, "x2": 200, "func": "decay"}, {"bonus": "% Prowess Effect", "x1": 40, "x2": 150, "func": "decay"}, {"bonus": "% Catchin AFK Gain", "x1": 15, "x2": 175, "func": "decay"}]')),
        new Box("Non Predatory Loot Box", JSON.parse('[{"bonus": "% Drop Rarity", "x1": 50, "x2": 200, "func": "decay"}, {"bonus": "LUK", "x1": 0.25, "x2": 0, "func": "add"}, {"bonus": "% Crystal Mob Spawn", "x1": 65, "x2": 200, "func": "decay"}]')),
    ];
}