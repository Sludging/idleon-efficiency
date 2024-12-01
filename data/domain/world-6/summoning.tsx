import { Domain, RawData } from "../base/domain";
import { SummonUpgradeBase, initSummonUpgradeRepo } from "../data/SummonUpgradeRepo";
import { initSummonEnemyRepo } from "../data/SummonEnemyRepo";
import { initSummonEnemyBonusRepo } from "../data/SummonEnemyBonusRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { SummonUpgradeModel } from "../model/summonUpgradeModel";
import { SkillsIndex } from "../SkillsIndex";
import { Player } from "../player";
import { SummonEnemyBonusModel } from "../model/summonEnemyBonusModel";
import { Sneaking } from "./sneaking";
import { nFormatter } from "../../utility";
import { deathNoteMobOrder } from '../deathnote';
import { SummonEnemyModel } from "../model/summonEnemyModel";
import { Sailing } from "../sailing";
import { TaskBoard } from "../tasks";
import { Achievement } from "../achievements";

const WhiteBattleOrder = [
    "Pet1", "Pet2", "Pet3", "Pet0", "Pet4", "Pet6", "Pet5", "Pet10", "Pet11"
]

export enum SummonEssenceColor {
    White = 0,
    Green = 1,
    Yellow = 2,
    Blue = 3,
    Purple = 4,
    Red = 5,
    Cyan = 6,
    FutureContent3 = 7,
    FutureContent4 = 8
}

export class SummonUpgrade {
    unlocked: boolean = false;
    level: number = 0;
    shouldBeDisplayed: boolean = true;
    bonusMultiplyer: number = 1;

    constructor(public index: number, public data: SummonUpgradeModel, level: number = 0) {
        this.shouldBeDisplayed = (data.name != "Name");
        this.level = level;
    }

    nextLevelCost = (): number => {
        return this.data.cost * Math.pow(this.data.costExponent, this.level);
    }

    getBaseBonus = (level: number = this.level): number => {
        return level * this.data.bonusQty
    }

    getFullBonus = (level: number = this.level): number => {
        return this.getBaseBonus(level) * this.bonusMultiplyer;
    }

    getImageData = (): ImageData => {
        return {
            location: `SumUpgIc${this.index}`,
            height: 42,
            width: 42
        }
    }

    getBorderImageData = (): ImageData => {
        return {
            location: `SumUpgBr${this.data.colour}`,
            height: 42,
            width: 42
        }
    }

    getLevelDisplay = (): string => {
        if (this.data.maxLvl == this.level) {
            return "MAX LV";
        }

        if (this.data.maxLvl == 9999) {
            return `Lv.${this.level}`;
        } else {
            return `Lv.${this.level}/${this.data.maxLvl}`;
        }
    }

    getBonusText = (level: number = this.level): string => {
        // This bonus is special so we make a special case
        if (this.index == 2) {
            return this.data.bonus.slice(0, this.data.bonus.indexOf('@')) + "Cost (and level) reset by cycle of 4 days (but you keep summoned familiars)";
        } else {
            return this.data.bonus.replace(/@/, '\r\n').replace(/{/, this.getBaseBonus(level).toString()).replace(/}/, this.getFullBonus(level).toString());
        }
    }

    static fromBase = (data: SummonUpgradeBase[]): SummonUpgrade[] => {
        return data.map((value) => new SummonUpgrade(value.index, value.data));
    }
}


export class SummonBonus {
    bonusValue: number = 0;
    pristineCharmBonus: number = 1;
    artifactBonus: number = 0;
    taskBoardBonus: number = 0;

    constructor(public index: number, public data: SummonEnemyBonusModel, bonusValue: number = 0) {
        this.bonusValue = bonusValue;
    }

    getBonus = (): number => {
        return 3.5 * this.bonusValue * this.pristineCharmBonus * 
            (1 + ((this.artifactBonus + this.taskBoardBonus) / 100));
    }

    getBonusText = (): string => {
        switch (this.data.bonusId) {
            // Only those bonuses have a '{' to be replaced by the bonus value, others use a '<'
            case 5:
            case 10:
            case 12:
            case 13:
            case 19:
            case 20:
                return this.data.bonus.replace(/{/, nFormatter(this.getBonus()));
            default:
                return this.data.bonus.replace(/</, nFormatter(1 + this.getBonus() / 100));
        }
    }
}

export interface SummonEssence {
    color: SummonEssenceColor,
    quantity: number,
    display: boolean,
    unlocked: boolean,
    victories: number,
    battles: SummonEnemyModel[]
}

export class BattlesInfo {
    private allVictories: number[] = [];
    allBattles: SummonEnemyModel[][] = [];
    // Can't mix them as it's not managed in the same way, also in case some more colors appears later
    endlessVictories: number = 0;
    currentHealth: number = 0;
    maxHealth: number = 0;
    playerUnitsHP: number = 0;
    playerUnitsAtk: number = 0;

    constructor() {}

    // This should now be used anywhere this value is needed
    getTotalVictories = (): number => {
        return this.allVictories.reduce((sum, victories) => sum + victories, 0) + this.endlessVictories;
    }

    // Use this to set value of the victories array as it is now private to force using the above function
    updateAllVictories = (victoryArray: number[]) => {
        this.allVictories = victoryArray;
    }

    static getBattleBonusText = (battle: SummonEnemyBonusModel | undefined, bonusValue: number): string => {
        if (battle) {
            const bonus = 3.5 * bonusValue;
            switch (battle.bonusId) {
                // Only those bonuses have a '{' to be replaced by the bonus value, others use a '<'
                case 5:
                case 10:
                case 12:
                case 13:
                case 19:
                case 20:
                    return battle.bonus.replace(/{/, nFormatter(bonus));
                default:
                    return battle.bonus.replace(/</, nFormatter(1 + bonus / 100));
            }
        } else {
            return "";
        }
    }
}

export class Summoning extends Domain {
    summonUpgrades: SummonUpgrade[] = [];
    summonBonuses: SummonBonus[] = [];
    summonEssences: SummonEssence[] = [];
    summoningLevel: number = 0;
    summonBattles: BattlesInfo = new BattlesInfo();
    summonFamiliarRaw: number[] = [];

    updateUnlockedUpgrades = () => {
        this.summonUpgrades.forEach(upgrade => {
            // If filler upgrade, should neither be displayed nor considered unlocked
            if(!upgrade.shouldBeDisplayed) {
                upgrade.unlocked = false;
                return;
            }

            // If idReq under 0 that means it's unlocked from the beginning
            if(upgrade.data.idReq < 0) {
                upgrade.unlocked = true;
                return;
            }

            // if required upgrade to unlock have a level higher than 0, then it's displayed in-game so it's considered unlocked
            upgrade.unlocked = (this.summonUpgrades.find(searchedUpgrade => searchedUpgrade.index == upgrade.data.idReq)?.level ?? 0) > 0;
        });
    }

    updateSecondaryBonus = () => {
        this.summonUpgrades.forEach(upgrade => {
            switch (upgrade.index) {
                case 0:
                    // Multiply bonus by all color victories
                    const allVictories: number = this.summonBattles.getTotalVictories();
                    upgrade.bonusMultiplyer = allVictories;
                    break;
                case 11:
                    // Multiply bonus by green victory
                    upgrade.bonusMultiplyer = (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Green)?.victories ?? 0);
                    break;
                case 18:
                    // Multiply bonus by yellow victory
                    upgrade.bonusMultiplyer = (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Yellow)?.victories ?? 0);
                    break;
                case 27:
                    // Multiply bonus by blue victory
                    upgrade.bonusMultiplyer = (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Blue)?.victories ?? 0);
                    break;
                case 38:
                    // Multiply bonus by purple victory
                    upgrade.bonusMultiplyer = (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Purple)?.victories ?? 0);
                    break;
                case 46:
                    // Multiply bonus by red victory
                    upgrade.bonusMultiplyer = (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Red)?.victories ?? 0);
                    break;
                case 54:
                    // Multiply bonus by cyan victory
                    upgrade.bonusMultiplyer = (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Cyan)?.victories ?? 0);
                    break;
                case 62:
                case 63:
                case 64:
                    // Multiply bonus by endless summoning victory
                    upgrade.bonusMultiplyer = this.summonBattles.endlessVictories;
                    break;
                case 30:
                case 40:
                case 52:
                case 58:
                case 65:
                case 66:
                case 67:
                    // Multiply bonus by summoning level
                    upgrade.bonusMultiplyer = this.summoningLevel;
                    break;
                case 60:
                case 61:
                    // Multiply bonus for every 100 total summoning upgrades purchased
                    upgrade.bonusMultiplyer = Math.floor(this.summonUpgrades.reduce((sum, upgrade) => sum + upgrade.level, 0)/100);
                    break;
                default:
                    upgrade.bonusMultiplyer = 1;
                    break;
            }
        });
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Summon", perPlayer: false, default: [] },
            { key: "OptLacc", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const summoning = data.get(this.dataKey) as Summoning;
        const summoningData = data.get("Summon") as any[];
        const optionList = data.get("OptLacc") as number[];

        // Defend against old accounts and people without any summoning data.
        if (summoningData.length == 0) {
            return;
        }

        summoning.summonUpgrades = [];
        summoning.summonUpgrades = initSummonUpgradeRepo()
            .map(
            base => new SummonUpgrade(base.index, base.data, summoningData[0][base.index] ?? 0)
        );

        summoning.summonBonuses = initSummonEnemyBonusRepo()
        .map(
            base => new SummonBonus(base.index, base.data)
        );
        
        // Already add values for next essences even if shouldn't use all indexes
        const victoryArray = [0,0,0,0,0,0,0,0];
        summoning.summonBattles.updateAllVictories(victoryArray);
        const enemyRepo = initSummonEnemyRepo();

        // Create an array of array that contains all summoning battles in the right order using WhiteBattleOrder then DeathNoteOrder for other colors
        summoning.summonBattles.allBattles = [[], [], [], [], [], [], [], []];
        WhiteBattleOrder.forEach(battle => {
            const enemyData = enemyRepo.find((enemy) => enemy.data.enemyId == battle);
            if (enemyData) {
                summoning.summonBattles.allBattles[0].push(enemyData.data);
            }
        });
        for (let i = 0; i < deathNoteMobOrder.length; i++) {
            deathNoteMobOrder[i].forEach(mob => {
                const enemyData = enemyRepo.find((enemy) => enemy.data.enemyId == mob);
                if (enemyData) {
                    summoning.summonBattles.allBattles[i+1].push(enemyData.data);
                }
            })            
        }
        summoning.summonBattles.endlessVictories = optionList[319] ?? 0;

        const wonBattles = summoningData[1] as string[];
        wonBattles.forEach((battle) => {
            // For each win we increment the relevant bonus value and add a victory to the associated color
            const enemyData = enemyRepo.find((enemy) => enemy.data.enemyId == battle);
            if (enemyData) {
                const relevantBonus = summoning.summonBonuses.find(bonus => bonus.data.bonusId == enemyData.data.bonusId);
                if (relevantBonus) {
                    // Some bonusQty are stored in string, so need to cast it to avoid concatening strings instead of making a sum of bonuses
                    relevantBonus.bonusValue += Number(enemyData.data.bonusQty);
                }

                // Add a victory to the corresponding color
                for (let i = 0; i < summoning.summonBattles.allBattles.length; i++) {
                    if (summoning.summonBattles.allBattles[i].includes(enemyData.data)) {
                        victoryArray[i]++;
                        return;
                    }
                }
            }
        });
        summoning.summonBattles.updateAllVictories(victoryArray);

        summoning.summonEssences = [];
        const essences = summoningData[2] as number[];
        essences.forEach((value, index) => {
            let unlocked: boolean = false;
            let display: boolean = false;
            switch(index) {
                case SummonEssenceColor.White:
                    unlocked = true;
                    display = true;
                    break;
                case SummonEssenceColor.Green:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 4)?.level ?? 0) > 0;
                    display = true;
                    break;
                case SummonEssenceColor.Yellow:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 13)?.level ?? 0) > 0;
                    display = true;
                    break;
                case SummonEssenceColor.Blue:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 23)?.level ?? 0) > 0;
                    display = true;
                    break;
                case SummonEssenceColor.Purple:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 33)?.level ?? 0) > 0;
                    display = true;
                    break;
                case SummonEssenceColor.Red:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 44)?.level ?? 0) > 0;
                    display = true;
                    break;
                case SummonEssenceColor.Cyan:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 53)?.level ?? 0) > 0;
                    display = true;
                    break;
                case SummonEssenceColor.FutureContent3:
                case SummonEssenceColor.FutureContent4:
                default:
                    unlocked = false;
                    display = false;
                    break;
            }

            let colorVictories: number = 0;
            if (index < victoryArray.length) {
                colorVictories = victoryArray[index];
            }

            let colorBattles: SummonEnemyModel[] = [];
            if (index < summoning.summonBattles.allBattles.length) {
                colorBattles = summoning.summonBattles.allBattles[index];
            }

            summoning.summonEssences.push({ color: index, quantity: value, unlocked: unlocked, display: display, victories: colorVictories, battles: colorBattles });
        });

        summoning.summonBattles.playerUnitsHP = 1 * (1 + ((summoning.summonUpgrades.find(upgrade => upgrade.index == 1)?.getBonus() ?? 0) + ((summoning.summonUpgrades.find(upgrade => upgrade.index == 10)?.getBonus() ?? 0) + ((summoning.summonUpgrades.find(upgrade => upgrade.index == 35)?.getBonus() ?? 0) + (summoning.summonUpgrades.find(upgrade => upgrade.index == 37)?.getBonus() ?? 0))))) * (1 + (summoning.summonUpgrades.find(upgrade => upgrade.index == 20)?.getBonus() ?? 0) / 100)

        summoning.summonBattles.playerUnitsAtk =  1 * (1 + ((summoning.summonUpgrades.find(upgrade => upgrade.index == 3)?.getBonus() ?? 0) + ((summoning.summonUpgrades.find(upgrade => upgrade.index == 12)?.getBonus() ?? 0) + ((summoning.summonUpgrades.find(upgrade => upgrade.index == 21)?.getBonus() ?? 0) + (summoning.summonUpgrades.find(upgrade => upgrade.index == 31)?.getBonus() ?? 0))))) * (1 + (summoning.summonUpgrades.find(upgrade => upgrade.index == 43)?.getBonus() ?? 0) / 100)

        summoning.updateUnlockedUpgrades();

        summoning.summonBattles.currentHealth = summoningData[3][0] ?? 0;
        summoning.summonBattles.maxHealth = summoningData[3][2] ?? 0;

        summoning.summonFamiliarRaw = summoningData[4];
    }

    static getSummoningStoneIcon(color: SummonEssenceColor): ImageData {
        return {
            location: `SummC${color+1}`,
            height: 25,
            width: 25
        }
    }

    static getEssenceIcon(color: SummonEssenceColor): ImageData {
        return {
            location: `W6item${color + 6}_x1`,
            height: 25,
            width: 25
        }
    }

    static getEssenceColorName = (color: SummonEssenceColor): string => {
        return Object.keys(SummonEssenceColor)[Object.values(SummonEssenceColor).indexOf(color as number as SummonEssenceColor)];
    }
}

export const updateSummoningLevelAndBonusesFromIt = (data: Map<string, any>) => {
    const summoning = data.get("summoning") as Summoning;
    const players = data.get("players") as Player[];

    let levels: number[] = [];
    players.forEach(player => {
        levels.push(player.skills.get(SkillsIndex.Summoning)?.level ?? 0);
    })
    summoning.summoningLevel = Math.max(...levels);

    summoning.updateSecondaryBonus();
}

export const updateSummoningWinnerBonusBoost = (data: Map<string, any>) => {
    const summoning = data.get("summoning") as Summoning;
    const sneaking = data.get("sneaking") as Sneaking;
    const sailing = data.get("sailing") as Sailing;
    const taskboard = data.get("taskboard") as TaskBoard;
    const achievements = data.get("achievements") as Achievement[];

    const crystalComb = sneaking.pristineCharms?.find(charm => charm.data.itemId == 8);
    const charmBonus = (crystalComb && crystalComb.unlocked) ? (1 + crystalComb.data.x1 / 100) : 1;
    const sailingArtifactBonus = sailing.artifacts[32].getBonus();

    const achiev379 = achievements[379].completed ? 1 : 0; // x1.01
    const achiev373 = achievements[373].completed ? 1 : 0; // x1.01
    const taskBonus = taskboard.merits[44].getBonus();

    summoning.summonBonuses.forEach(bonus => {
        bonus.pristineCharmBonus = charmBonus;
        bonus.artifactBonus = sailingArtifactBonus;
        bonus.taskBoardBonus = Math.min(10, taskBonus) + achiev373 + achiev379
    });
}
