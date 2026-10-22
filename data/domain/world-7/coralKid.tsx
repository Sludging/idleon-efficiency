import { Domain, RawData } from "../base/domain";
import { Item } from "../items";

export const coralKidBonuses = [
    "Lets you click the volcano, linking the divinity of your choice to ALL players! Also, +{% Divinity EXP gain for all!",
    "The Max Level of the Blessing upgrade for each Divinity is +{ levels higher!",
    "God Rank now also gives }x Class EXP to all players! Total Bonus:$x Class EXP",
    "Divinity Skill Lv boosts Minor Link Bonuses a bit more! (Your Divinity LV of $ boosts Minor Link Bonuses by ^x)",
    "Boosts Divinity PTS gain by +{% per Coral Reef upgrade! Total Bonus:+$% Divinity PTS",
    "You now generate {% more Daily Coral for the Coral Reef back in town!"
]

export class CoralKidBonus {
    level: number = 0;

    constructor(public index: number, public bonus: string) {}
    
    static fromBase() {
        return coralKidBonuses.map((bonus, index) => new CoralKidBonus(index, bonus));
    }

    getBonus(): number {
        switch (this.index) {
            case 0:
                return 10 * this.level;
            case 1:
            case 4:
                return 2 * this.level;
            case 2:
                return 20 * (this.level / (25 + this.level));
            case 3:
                return this.level;
            default:
                return 100 * (this.level / (40 + this.level));
        }
    }

    getUpgradeCost(): number {
        switch (this.index) {
            case 1:
                return 1E7 * Math.pow(6, this.index) * Math.pow(1.25, this.level);
            default :
                return 1E7 * Math.pow(6, this.index) * Math.pow(1.1, this.level);
        }
    }

    getBonusText(): string {
        const bonus = this.getBonus();

        return this.bonus.replace("{", bonus.toString()).replace("}", (1 + bonus / 100).toString());
    }
}

export class CoralKid extends Domain {
    coralKidBonuses: CoralKidBonus[] = CoralKidBonus.fromBase();
    private lumiUpgradeLevel = 0;
    private divinityPointsUpgradeLevel = 0;
    private divinityExpUpgradeLevel = 0;

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const coralKid = data.get(this.getDataKey()) as CoralKid;
        const optionList = data.get("OptLacc") as number[];

        coralKid.lumiUpgradeLevel = Number(optionList[620] ?? 0);
        coralKid.divinityPointsUpgradeLevel = Number(optionList[616] ?? 0);
        coralKid.divinityExpUpgradeLevel = Number(optionList[618] ?? 0);
        coralKid.coralKidBonuses.forEach(upgrade => {
            upgrade.level = optionList[427 + upgrade.index] || 0;
        });
    }

    getBonusFromIndex(index: number): number {
        // Second-page Divinity bonuses return rounded percentage points, not multipliers.
        if (index === 6) {
            return Math.round(100 * this.divinityPointsUpgradeLevel);
        }
        if (index === 8) {
            return Math.round(50 * this.divinityExpUpgradeLevel);
        }

        return this.coralKidBonuses.find(bonus => bonus.index == index)?.getBonus() || 0;
    }

    getLumiGenerationBonus(): number {
        return Math.round(5 * this.lumiUpgradeLevel);
    }

    getBonusTextFromIndex(index: number): string {
        return this.coralKidBonuses.find(bonus => bonus.index == index)?.getBonusText() || "";
    }

    getBonusNextlevelCost(index: number): number {
        return this.coralKidBonuses.find(bonus => bonus.index == index)?.getUpgradeCost() || 0; 
    }
}