import { ImageData } from "./imageData";

export class Prayer {
    level: number = 0;
    totalPrayersOwned: number = 0; // PrayOwned
    constructor(public index: number, public name: string, public towerIndex: number, public bonusText: string, public curseText: string,
        public x1: number, public x2: number, public soul: string, public costMulti: number,
        public towerName: string, public waveReq: number, public maxLevel: number) { }

    getLevelCosts = (): number => {
        if (this.level == 0) {
            return 0;
        }

        if (this.level < 6) {
            return Math.round(this.costMulti * (1 + (4 + (this.index / 25)) * this.level));
        }
        let prayerMultiplier = 1.25;
        if (this.index == 9) {
            prayerMultiplier = 1.5
        }

        const bonus = this.costMulti * (1 + (4 + (this.index / 25)) * this.level) * Math.pow(prayerMultiplier, this.level - 5);
        return Math.round(Math.min(2000000000, bonus));
    }

    getBonus = (): number => {
        return Math.round(this.x1 * Math.max(1, 1 + (this.level - 1) / 10));
    }

    getCurse = (): number => {
        return Math.round(this.x2 * Math.max(1, 1 + (this.level - 1) / 10));
    }

    getBonusText = (): string => {
        return this.bonusText.replace("{", this.getBonus().toString());
    }

    getCurseText = (): string => {
        return this.curseText.replace("{", this.getCurse().toString());
    }

    getImageData = (): ImageData => {
        return {
            location: `Prayer${this.index}`,
            width: 50,
            height: 50
        }
    }
}

const initPrayers = () => {
    return [
        new Prayer(0, "Big Brain Time", 1, "+{% Class EXP", "+{% Max HP for all monsters", 30, 250, "Soul1", 100, "Goblin Gorefest", 10, 50),
        new Prayer(1, "Skilled Dimwit", 1, "+{% Skill Efficiency", "-{% Skill EXP Gain", 30, 20, "Soul1", 300, "Goblin Gorefest", 25, 50),
        new Prayer(2, "Unending Energy", 1, "+{% Class and Skill EXP", "Max AFK time is now 10 hours. Use with caution", 25, 10, "Soul1", 600, "Goblin Gorefest", 51, 50),
        new Prayer(3, "Shiny Snitch", 1, "Shiny Critters drop in bundles of { instead of 1.", "Your Shiny chance is now x{ lower.", 20, 15, "Soul1", 1000, "Goblin Gorefest", 81, 50),
        new Prayer(4, "Zerg Rushogen", 1, "+{% AFK Gain Rate", "-{% Carry Capacity", 10, 12, "Soul1", 3000, "Goblin Gorefest", 121, 20),
        new Prayer(5, "Tachion of the Titans", 2, "Giant Monsters can now spawn on Monster Kill", "Giant Monsters can now spawn...", 10, 10, "Soul2", 100, "Wakawaka War", 11, 2),
        new Prayer(6, "Balance of Precision", 2, "+{% Total Accuracy", "-{% Total Damage", 30, 15, "Soul2", 250, "Wakawaka War", 31, 50),
        new Prayer(7, "Midas Minded", 2, "+{% Drop Rate", "+{% Max HP for all monsters", 20, 250, "Soul2", 700, "Wakawaka War", 71, 50),
        new Prayer(8, "Jawbreaker", 2, "+{% Coins from Monsters", "+{% Max HP for all monsters", 40, 200, "Soul2", 1500, "Wakawaka War", 101, 50),
        new Prayer(9, "The Royal Sampler", 3, "+{% 3d Printer Sample Size", "-{% All Exp Gain. Remove all samples to Unequip.", 15, 30, "Soul3", 100, "Acorn Assault", 21, 20),
        new Prayer(10, "Antifun Spirit", 3, "+{% Minigame Reward Multi", "Minigames cost { plays per attempt.", 700, 9, "Soul3", 600, "Acorn Assault", 41, 10),
        new Prayer(11, "Circular Criticals", 3, "+{% Critical Hit Chance", "-{% Critical Damage", 10, 15, "Soul3", 2000, "Acorn Assault", 71, 20),
        new Prayer(12, "Ruck Sack", 3, "+{% Carry Capacity", "-{% AFK Gain Rate", 30, 15, "Soul3", 4500, "Acorn Assault", 111, 50),
        new Prayer(13, "Fibers of Absence", 4, "+{% Kills for Deathnote and opening portals", "-{% Total Damage", 30, 15, "Soul4", 100, "Frosty Firefight", 21, 50),
        new Prayer(14, "Vacuous Tissue", 4, "+100% Dungeon Credits and Flurbos from Boosted Runs", "Use 2x Dungeon Passes per run.", 10, 10, "Soul4", 10, "Frosty Firefight", 51, 1),
        new Prayer(15, "Beefy For Real", 4, "+{% Total Damage", "-{% Total Defence and Accuracy", 20, 10, "Soul4", 5000, "Frosty Firefight", 121, 40),
        new Prayer(16, "Balance of Pain", 5, "+{% Multikill per Damage Tier", "-{% Total Defence and Accuracy", 8, 15, "Soul5", 100, "Clash of Cans", 21, 30),
        new Prayer(17, "Balance of Proficiency", 5, "+{% Skill EXP Gain", "-{% Skill Efficiency", 30, 20, "Soul5", 1000, "Clash of Cans", 51, 50),
        new Prayer(18, "Glitterbug", 5, "+{% chance for Giant Mobs to summon 2 Crystal Mobs", "Giant Mobs are {% less likely to spawn.", 30, 20, "Soul5", 7000, "Clash of Cans", 131, 30),
        new Prayer(19, "Some Prayer Name0", 1, "+{% EXP from all monsters", "+{% Max HP for all monsters", 30, 150, "Soul1", 100, "Goblin Gorefest", 999, 999),
        new Prayer(20, "Some Prayer Name0", 1, "+{% EXP from all monsters", "+{% Max HP for all monsters", 30, 150, "Soul1", 100, "Goblin Gorefest", 999, 999),
        new Prayer(21, "Some Prayer Name0", 1, "+{% EXP from all monsters", "+{% Max HP for all monsters", 30, 150, "Soul1", 100, "Goblin Gorefest", 999, 999),
        new Prayer(22, "Some Prayer Name0", 1, "+{% EXP from all monsters", "+{% Max HP for all monsters", 30, 150, "Soul1", 100, "Goblin Gorefest", 999, 999),
        new Prayer(23, "Some Prayer Name0", 1, "+{% EXP from all monsters", "+{% Max HP for all monsters", 30, 150, "Soul1", 100, "Goblin Gorefest", 999, 999),
        new Prayer(24, "Some Prayer Name0", 1, "+{% EXP from all monsters", "None. Even curses need time off every now and then.", 30, 150, "Soul1", 100, "Goblin Gorefest", 999, 999),
    ];
}

export default function parsePrayers(rawData: number[]) {
    const prayerData = initPrayers(); // Initialize prayer array with all pre-populated data
    if (rawData) {
        rawData.forEach((prayer, index) => { // for each prayer
            if (index < prayerData.length) { // ignore unknown prayers.
                prayerData[index].level = prayer;
            }
        });
    }
    return prayerData;
}