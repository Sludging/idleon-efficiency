import { Domain, RawData } from "../base/domain";
import { CoralKidUpgradeBase, initCoralKidUpgradeRepo } from "../data/CoralKidUpgradeRepo";
import { Item } from "../items";
import type { Menagerie } from "../menagerie";
import type { CoralKidUpgradeModel } from "../model/coralKidUpgradeModel";
import type { Player } from "../player";
import { SkillsIndex } from "../SkillsIndex";
import type { Storage } from "../storage";
import type { Divinity } from "../world-5/divinity";
import type { CoralReef } from "./coralReef";

export class CoralKidBonus {
    level: number = 0;
    godRank: number = 0;
    coralReefUpgradeLevels: number = 0;

    constructor(public index: number, public data: CoralKidUpgradeModel) {}

    static fromBase(data: CoralKidUpgradeBase[] = initCoralKidUpgradeRepo()): CoralKidBonus[] {
        return data.map(upgrade => new CoralKidBonus(upgrade.index, upgrade.data));
    }

    get costCurrency(): 'divinityPoints' | 'CKsing' {
        return this.data.mode === 'original' ? 'divinityPoints' : 'CKsing';
    }

    getBonus(level: number = this.level): number {
        switch (this.index) {
            case 0:
                return 10 * level;
            case 1:
                return Math.round(2 * level);
            case 4:
                return Math.round(2 * level);
            case 2:
                return (level / (25 + level)) * 20;
            case 3:
                return Math.round(level);
            case 5:
                return (level / (40 + level)) * 100;
            case 6:
                return Math.round(100 * level);
            case 7:
                return Math.round(10 * level);
            case 8:
                return Math.round(50 * level);
            case 9:
                return Math.round(125 * level / (level + 100));
            case 10:
                return Math.round(5 * level);
            case 11:
                return Math.round(level);
            default:
                return 0;
        }
    }

    getPercentageMultiplier(level: number = this.level): number {
        if (this.index === 1) {
            throw new Error("The blessing maximum-level upgrade adds levels, not a percentage.");
        }
        return 1 + this.getBonus(level) / 100;
    }

    getTotalBonus(level: number = this.level): number {
        switch (this.index) {
            case 2:
                return Math.pow(this.getPercentageMultiplier(level), Math.max(0, this.godRank));
            case 4:
                return this.coralReefUpgradeLevels * this.getBonus(level);
            case 9:
                return 100 * Math.max(0, Math.min(1, this.getBonus(level) / 100));
            case 11:
                return Math.pow(this.getPercentageMultiplier(level), Math.max(0, this.godRank - 25));
            default:
                return this.getBonus(level);
        }
    }

    getMinorLinkSkillMultiplier(divinityLevel: number, level: number = this.level): number {
        return 1 + ((1 + this.getBonus(level) / 100) * divinityLevel) / (60 + divinityLevel);
    }

    getUpgradeCost(): number {
        if (this.index === 1) {
            return 1E7 * Math.pow(6, this.index) * Math.pow(1.25, this.level);
        }
        if (this.index < 6) {
            return 1E7 * Math.pow(6, this.index) * Math.pow(1.1, this.level);
        }
        const singularityIndex = this.index - 6;
        if (this.index === 10 || this.index === 11) {
            return Math.pow(5 + 2 * singularityIndex, singularityIndex) * Math.pow(1.85, this.level);
        }
        return Math.pow(7 + 2 * singularityIndex, singularityIndex) * Math.pow(1.13, this.level);
    }

    getBonusText(): string {
        const bonus = this.getBonus();

        return this.data.description.replace("{", bonus.toString()).replace("}", (1 + bonus / 100).toString());
    }
}

export class CoralKidSingularity {
    unlocked: boolean = false;
    spiralsOwned: number = 0;
    kills: number = 0;
    elapsedHours: number = 0;
    baseValue: number = 0;
    killMultiplier: number = 1;
    timeMultiplier: number = 0.1;
    spiralsOnClaim: number = 0;

    update(divinityPoints: number, baseValueBonusPercent: number, unlocked: boolean, spiralsOwned: number): void {
        this.unlocked = unlocked;
        this.spiralsOwned = spiralsOwned;

        // The game uses a rounded logarithm divisor, not Math.log10.
        const pointsLog = Math.log(Math.max(divinityPoints, 1)) / 2.30259;
        const killsLog = Math.log(Math.max(this.kills, 1)) / 2.30259;
        const killsLog2 = Math.log(Math.max(this.kills, 1)) / Math.log(2);
        this.baseValue = (pointsLog + Math.max(0, 5 * (pointsLog - 12))) * (1 + baseValueBonusPercent / 100);
        this.killMultiplier = 1 + (5 * Math.max(0, killsLog2 - 16) + Math.max(0, 25 * Math.floor(killsLog - 5))) / 100;
        this.timeMultiplier = 0.1 + (5 * Math.min(120, this.elapsedHours) + 5 * Math.pow(Math.max(0, this.elapsedHours - 120), 0.5)) / 100;
        this.spiralsOnClaim = Math.floor(Math.min(1E9, this.baseValue * this.killMultiplier * this.timeMultiplier));
    }
}

export class CoralKid extends Domain {
    coralKidBonuses: CoralKidBonus[] = CoralKidBonus.fromBase();
    classExpMultiplier: number = 1;
    totalDivinityLevel: number = 0;
    divinityPointsBonusPercent: number = 0;
    damageMultiplier: number = 1;
    nonDivinityAfkTimePercent: number = 0;
    minorLinkSkillMultipliersByPlayerIndex: number[] = [];
    singularity: CoralKidSingularity = new CoralKidSingularity();

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const coralKid = data.get(this.getDataKey()) as CoralKid;
        const optionList = data.get("OptLacc") as number[];

        coralKid.coralKidBonuses.forEach(upgrade => {
            const saveIndex = upgrade.index < 6 ? 427 + upgrade.index : 616 + upgrade.index - 6;
            upgrade.level = Number(optionList[saveIndex] ?? 0);
        });
        coralKid.singularity.kills = Number(optionList[623] ?? 0);
        coralKid.singularity.elapsedHours = Number(optionList[624] ?? 0);
    }

    getBonusFromIndex(index: number): number {
        return this.coralKidBonuses.find(bonus => bonus.index == index)?.getBonus() || 0;
    }

    getLumiGenerationBonus(): number {
        return this.getBonusFromIndex(10);
    }

    getBonusTextFromIndex(index: number): string {
        return this.coralKidBonuses.find(bonus => bonus.index == index)?.getBonusText() || "";
    }

    getBonusNextlevelCost(index: number): number {
        return this.coralKidBonuses.find(bonus => bonus.index == index)?.getUpgradeCost() || 0; 
    }

    update(players: Player[], divinity: Divinity, coralReef: CoralReef, menagerie: Menagerie, storage: Storage): void {
        this.totalDivinityLevel = players.reduce((total, player) => total + player.skills.get(SkillsIndex.Divinity)!.level, 0);
        const reefLevels = coralReef.upgrades.reduce((total, upgrade) => total + (upgrade.index < 6 ? upgrade.level : 0), 0);
        for (const upgrade of this.coralKidBonuses) {
            upgrade.godRank = divinity.godRank;
            // The game counts only the original six Coral Reef upgrades.
            upgrade.coralReefUpgradeLevels = reefLevels;
        }
        this.classExpMultiplier = this.coralKidBonuses[2].getTotalBonus();
        this.divinityPointsBonusPercent = this.coralKidBonuses[4].getTotalBonus();
        this.damageMultiplier = this.coralKidBonuses[11].getTotalBonus();
        this.nonDivinityAfkTimePercent = this.coralKidBonuses[9].getTotalBonus();
        this.minorLinkSkillMultipliersByPlayerIndex = [];
        for (const player of players) {
            const divinityLevel = player.skills.get(SkillsIndex.Divinity)!.level;
            this.minorLinkSkillMultipliersByPlayerIndex[player.playerID] =
                this.coralKidBonuses[3].getMinorLinkSkillMultiplier(divinityLevel);
        }
        this.singularity.update(
            divinity.currentDivinity,
            this.getBonusFromIndex(7),
            menagerie.unlocks[2].owned,
            storage.amountInStorage('CKsing'),
        );
    }
}

export const updateCoralKid = (data: Map<string, any>): void => {
    const coralKid = data.get("coralKid") as CoralKid;
    coralKid.update(
        data.get("players") as Player[],
        data.get("divinity") as Divinity,
        data.get("coralReef") as CoralReef,
        data.get("menagerie") as Menagerie,
        data.get("storage") as Storage,
    );
};