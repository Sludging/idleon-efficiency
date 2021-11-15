interface StarBonus {
    text: string,
    bonus: number
    percent: boolean;
}

export class StarSign {
    constructor(public name: string, public bonuses: StarBonus[]) { }

    getText = () => {
        return this.bonuses.map((bonus) => {
            return `${bonus.bonus < 0 ? "" : "+"}${bonus.bonus}${bonus.percent ? "%" : ""} ${bonus.text}`
        }).join(' | ')
    }

    getBonus = (bonusType: string) => {
        const bonus = this.bonuses.find((bonus) => bonus.text.toLowerCase().includes(bonusType.toLowerCase()));
        if (bonus) {
            return bonus.bonus;
        }
        return 0;
    }
}

export const StarSignMap: Record<number, StarSign> = {
    0: new StarSign("The_Buff_Guy", [{ text: "Total Damage", bonus: 1, percent: true }, { text: "STR", bonus: 3, percent: false }]),
    1: new StarSign("Flexo_Bendo", [{ text: "Movement Speed", bonus: 2, percent: true }, { text: "AGI", bonus: 3, percent: false }]),
    2: new StarSign("The_Book_Worm", [{ text: "Class EXP Gain", bonus: 1, percent: true }, { text: "WIS", bonus: 3, percent: false }]),
    3: new StarSign("The_Fuzzy_Dice", [{ text: "Talent Points", bonus: 3, percent: true }, { text: "LUK", bonus: 3, percent: false }]),
    4: new StarSign("Dwarfo_Beardus", [{ text: "Mining Efficency", bonus: 5, percent: true }, { text: "Multi-Ore Chance", bonus: 20, percent: true }]),
    5: new StarSign("Hipster_Logger", [{ text: "Chop Efficency", bonus: 5, percent: true }, { text: "Multi-Log Chance", bonus: 20, percent: true }]),
    6: new StarSign("Pie_Seas", [{ text: "Fishing Efficency", bonus: 5, percent: true }, { text: "Multi-Fish Chance", bonus: 20, percent: true }]),
    7: new StarSign("Shoe_Fly", [{ text: "Catch Efficency", bonus: 5, percent: true }, { text: "Multi-Bug Chance", bonus: 20, percent: true }]),
    8: new StarSign("Blue_Hedgehog", [{ text: "Movement Speed", bonus: 4, percent: true }, { text: "Ring Drop", bonus: 0.0001, percent: true }]),
    9: new StarSign("Gum_Drop", [{ text: "to get a Time Candy when claiming 8+ Hour AFK gains", bonus: 15, percent: true }]),
    10: new StarSign("Activelius", [{ text: "Class EXP when fighting actively", bonus: 15, percent: true }]),
    11: new StarSign("Pack_Mule", [{ text: "Carry Cap", bonus: 10, percent: true }]),
    12: new StarSign("Ned_Kelly", [{ text: "Defence", bonus: 6, percent: true }, { text: "Weapon Power", bonus: 2, percent: false }]),
    13: new StarSign("Robinhood", [{ text: "Accuracy", bonus: 4, percent: true }, { text: "Movement Speed", bonus: 2, percent: true }, { text: "Cant Trade GME", bonus: 1, percent: false }]),
    14: new StarSign("Pirate_Booty", [{ text: "Drop Rate", bonus: 5, percent: true }]),
    15: new StarSign("Muscle_Man", [{ text: "STR", bonus: 8, percent: false }]),
    16: new StarSign("Fast_Frog", [{ text: "AGI", bonus: 8, percent: false }]),
    17: new StarSign("Smart_Stooge", [{ text: "WIS", bonus: 8, percent: false }]),
    18: new StarSign("Lucky_Larry", [{ text: "LUK", bonus: 8, percent: false }]),
    19: new StarSign("Silly_Snoozer", [{ text: "Fight AFK Gain", bonus: 2, percent: true }]),
    20: new StarSign("The_Big_Comatose", [{ text: "Skill AFK Gain", bonus: 2, percent: true }]),
    21: new StarSign("Miniature_Game", [{ text: "minigame reward", bonus: 30, percent: true }]),
    22: new StarSign("Mount_Eaterest", [{ text: "chance to not consume food", bonus: 10, percent: true }, { text: "All Food Effect", bonus: 15, percent: true }]),
    23: new StarSign("Bob_Build_Guy", [{ text: "Speed in Town Skills", bonus: 10, percent: true }]),
    24: new StarSign("The_Big_Brain", [{ text: "Class EXP gain", bonus: 3, percent: true }]),
    25: new StarSign("The_OG_Skiller", [{ text: "Carry Cap", bonus: 5, percent: true }, { text: "Skill AFK gain", bonus: 1, percent: true }, { text: "All Skill Prowess", bonus: 2, percent: true }]),
    26: new StarSign("Grim_Reaper", [{ text: "Mob Respawn rate", bonus: 2, percent: true }]),
    27: new StarSign("The_Fallen_Titan", [{ text: "Boss Damage", bonus: 3, percent: true }, { text: "Crit Chance", bonus: 4, percent: true }]),
    28: new StarSign("The_Forsaken", [{ text: "Total HP", bonus: -80, percent: true }, { text: "Defence", bonus: -50, percent: true }, { text: "Total HP", bonus: -80, percent: true }, { text: "Fight AFK Gain", bonus: 6, percent: true }]),
    29: new StarSign("Mr_No_Sleep", [{ text: "AFK Gain", bonus: -6, percent: true }, { text: "Carry Cap", bonus: 30, percent: true }]),
    30: new StarSign("Sir_Savvy", [{ text: "Skill EXP gain", bonus: 3, percent: true }]),
    31: new StarSign("All_Rounder", [{ text: "All Stats", bonus: 4, percent: false }]),
    32: new StarSign("Fatty_Doodoo", [{ text: "Movement Speed", bonus: -3, percent: true }, { text: "Defence", bonus: 5, percent: true }, { text: "Total Damage", bonus: 2, percent: true }]),
    // 33: new StarSign("Chronus_Cosmos", [ { text: "All character can now align with 2 Star Signs at once", bonus: -, percent: false}]),
}