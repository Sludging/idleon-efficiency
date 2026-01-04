import { Domain, RawData } from "./base/domain";
import { EmperorBonusBase, initEmperorBonusRepo } from "./data/EmperorBonusRepo";
import { Item } from "./items";
import { EmperorBonusModel } from "./model/emperorBonusModel";
import { Sneaking } from "./world-6/sneaking";
import { Tesseract } from "./tesseract";
import { Arcade } from "./arcade";

export class EmperorBonus {
    // Level in this case means number of times we got this bonus from killing the emperor.
    level: number = 0;
    arcaneBonus48: number = 0;
    arcadeBonus51: number = 0;
    
    constructor(public index: number, public data: EmperorBonusModel) { }

    getBonus(): number {
        const baseBonus = this.data.bonusValue * this.level;
        // Apply arcane and arcade bonuses as multipliers (like in game code)
        return Math.floor(baseBonus * (1 + (this.arcaneBonus48 + this.arcadeBonus51) / 100));
    }

    static fromBase(data: EmperorBonusBase[]): EmperorBonus[] {
        return data.map((base, index) => new EmperorBonus(index, base.data));
    }
}

export class Emperor extends Domain {
    public emperorKills: number = 0;
    public maxEmperorAttempts: number = 0;
    public dailyEmperorTries: number = 0;
    public bossHP: number = 0;
    public emperorBonuses: EmperorBonus[] = [];

    constructor(name: string) {
        super(name);
    }

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        this.emperorBonuses = EmperorBonus.fromBase(initEmperorBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const optionList = data.get("OptLacc") as number[];
        const emperor = data.get("emperor") as Emperor;
        // Parse emperor kills from OptionsListAccount[369]

        // Exit early when we don't have the data we need.
        if (optionList.length < 382) {
            return;
        }
        emperor.emperorKills = optionList?.[369] || 0;
        
        // Parse max attempts from OptionsListAccount[382]
        emperor.maxEmperorAttempts = optionList?.[382] || 0;

        // Calculate derived values
        emperor.bossHP = emperor.calculateBossHP();
        emperor.dailyEmperorTries = emperor.calculateDailyTries();
        
        // Calculate emperor bonuses
        emperor.calculateEmperorBonuses();
    }

    /**
     * Calculate boss HP based on emperor kills
     */
    public calculateBossHP(): number {
        return 135e13 * Math.pow(1.7, this.emperorKills);
    }



    /**
     * Calculate daily emperor tries
     */
    public calculateDailyTries(): number {
        return Math.round(1 + this.maxEmperorAttempts);
    }

    /**
     * Update max emperor attempts with cross-system bonuses
     */
    public updateMaxAttempts(ninjaBonus: number): void {
        // Based on game code: 5 * ninjaBonus + 6 * emperorKills + 5
        this.maxEmperorAttempts = Math.round(5 * ninjaBonus + 6 * this.emperorKills + 5);
    }

    /**
     * Calculate emperor bonuses based on kills
     */
    public calculateEmperorBonuses(): void {
        const emperorBonusRepo = initEmperorBonusRepo();
        
        // Reset bonuses
        this.emperorBonuses = EmperorBonus.fromBase(initEmperorBonusRepo());
        
        // Calculate bonuses based on emperor kills
        // Game code loops from 0 to emperorKills-1 (exclusive)
        for (let kill = 0; kill < this.emperorKills; kill++) {
            const stuff6q = kill - 48 * Math.floor(kill / 48);
            
            // Find which bonus this kill unlocks
            for (const bonus of emperorBonusRepo) {
                if (bonus.data.levelMappings.includes(stuff6q)) {
                    // Add bonus value to the appropriate slot
                    this.emperorBonuses[bonus.index].level += 1;
                    break;
                }
            }
        }
    }
}

/**
 * Update emperor max attempts with cross-system bonuses
 */
export const updateEmperorMaxAttempts = (accountData: Map<string, any>) => {
    const emperor = accountData.get("emperor") as Emperor;
    const sneaking = accountData.get("sneaking") as Sneaking;

    if (emperor && sneaking) {
        try {
            // Get ninja bonus from sneaking domain (EmporiumBonus, 39)
            // Jade upgrade 39 is "Emperor Season Pass" which gives +2 visits and increases max from 6 to 11
            const emperorSeasonPass = sneaking.jadeUpgrades.find(upgrade => upgrade.index === 39);
            const ninjaBonus = emperorSeasonPass?.purchased ? 1 : 0;
            
            // Update max attempts with cross-system bonuses
            emperor.updateMaxAttempts(ninjaBonus);
        } catch (error) {
            console.error("Failed to update emperor max attempts:", error);
        }
    }
};

/**
 * Update emperor bonuses with cross-system bonuses
 */
export const updateEmperorBonuses = (accountData: Map<string, any>) => {
    const emperor = accountData.get("emperor") as Emperor;
    const tesseract = accountData.get("tesseract") as Tesseract;
    const arcade = accountData.get("arcade") as Arcade;

    if (emperor && tesseract && arcade) {
        try {
            // Get arcane bonus 48 from tesseract domain and arcade bonus 51
            const arcaneBonus48 = tesseract.upgrades[48] ? tesseract.upgrades[48].getBonus(tesseract.upgrades) : 0;
            const arcadeBonus51 = arcade.bonuses[51] ? arcade.bonuses[51].getBonus() : 0;
            
            // Update all emperor bonuses with cross-system bonuses
            emperor.emperorBonuses.forEach(bonus => {
                bonus.arcaneBonus48 = arcaneBonus48;
                bonus.arcadeBonus51 = arcadeBonus51;
            });
        } catch (error) {
            console.error("Failed to update emperor bonuses:", error);
        }
    }
};
