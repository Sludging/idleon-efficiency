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
import { nFormatter, notateNumber } from "../../utility";
import { deathNoteMobOrder } from '../world-3/construction/deathnote';
import { SummonEnemyModel } from "../model/summonEnemyModel";
import { Sailing } from "../world-5/sailing/sailing";
import { TaskBoard } from "../tasks";
import { Achievement } from "../achievements";
import { Equinox } from "../world-3/equinox";
import { Cooking } from "../world-4/cooking";
import { Emperor } from "../world-6/emperor";
import { EquipmentSets } from "../misc/equipmentSets";

const WhiteBattleOrder = [
    "Pet1", "Pet2", "Pet3", "Pet0", "Pet4", "Pet6", "Pet5", "Pet10", "Pet11"
]

const EndlessModeBattleOrder = [
    "rift1", "rift2", "rift3", "rift4", "rift5"
]

// engine.GameAttribute.h.CustomList.h.SummonEnemies[9]
const EndlessModeBonusIndexes = [
    21,22,23,24,25,27,23,22,24,29,25,26,24,23,22,32,30,31,25,24,26,29,24,22,21,23,31,28,27,24,26,22,30,25,29,28,23,26,24,32
]

// engine.GameAttribute.h.CustomList.h.SummonEnemies[10]
const EndlessModeBonusIncrease = [
    1,3,1,12,1,7,2,4,15,10,1,4,18,2,4,3,20,25,2,20,5,30,24,4,1,2,2,35,9,26,5,5,40,1,45,50,2,6,30,3
]

// engine.GameAttribute.h.CustomList.h.SummonEnemies[11]
const EndlessModeModifierID = [
    4,5,1,6,4,0,5,6,7,8,3,10,2,9,7,1,6,5,2,8,3,4,10,6,1,7,2,0,6,3,5,8,9,4,6,2,1,5,10,8
]

// engine.GameAttribute.h.CustomList.h.SummonEnemies[12]
const EndlessModeEnemyModifier = [
    ["Slow Motion", "All units, both yours and my own, move at 60% speed."],
    ["Fast Forward", "All of our units, yours and mine, move at 170% speed."],
    ["Glass Cannon", "You have but a single health point, as do I."],
    ["Zerg Surprise", "You best be ready, I'm playing all my minions on turn 1!"],
    ["Extra Time", "I've doubled our health points so we can play longer."],
    ["Fair Play", "No lane stacking! When you hurt me, all your units in that lane take damage."],
    ["Invincibility", "Just let me play my units, I will forfeit one health each time, but you must deal the final blow."],
    ["Offsides Rule", "When you hurt me, all your minions beyond the midfield perish."],
    ["Triple Overtime", "Ten times the health points. I wanna see your deck's lategame viability."],
    ["Truce", "No mods, no effects, no tricks. I want a proper match this time."],
    ["Uno Draw 7", "You're playing with a 7 card hand. It's more fun this way, trust me you'll love it!"]
]

export enum SummonEssenceColor {
    White = 0,
    Green = 1,
    Yellow = 2,
    Blue = 3,
    Purple = 4,
    Red = 5,
    Cyan = 6,
    Teal = 7,
    FutureContent4 = 8,
    Endless = 9
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
    achievement379Bonus: number = 0;
    achievement373Bonus: number = 0;
    summoning32Bonus: number = 0;

    // More bonuses
    godshardSetBonus: number = 0;
    emperorBonus: number = 0;

    constructor(public index: number, public data: SummonEnemyBonusModel, bonusValue: number = 0) {
        this.bonusValue = bonusValue;
    }

    getBonus = (): number => {
        switch (true)
        {
            // +1 from in-game indexes as it starts from 1 instead of 0
            case this.data.bonusId == 21:
            case this.data.bonusId == 23:
            case this.data.bonusId == 25:
            case this.data.bonusId == 32:
                return this.bonusValue;
            case this.data.bonusId == 20:
                return 3.5 * this.bonusValue * this.pristineCharmBonus * (1 + (this.artifactBonus + Math.min(10, this.taskBoardBonus) + this.achievement379Bonus + this.achievement373Bonus + this.godshardSetBonus) / 100);
            case 21 <= this.data.bonusId && 34 >= this.data.bonusId:
                return this.bonusValue * this.pristineCharmBonus * (1 + (this.artifactBonus + Math.min(10, this.taskBoardBonus) + this.achievement379Bonus + this.achievement373Bonus + this.summoning32Bonus + this.godshardSetBonus + this.emperorBonus) / 100); 
            default:
                return 3.5 * this.bonusValue * this.pristineCharmBonus * (1 + (this.artifactBonus + Math.min(10, this.taskBoardBonus) + this.achievement379Bonus + this.achievement373Bonus + this.summoning32Bonus + this.godshardSetBonus + this.emperorBonus) / 100);
        }
    }

    static getBonusValueForDisplay = (bonusId: number, bonusValue: number): number => {
        switch (true)
        {
            // +1 from in-game indexes as it starts from 1
            case bonusId == 21:
            case bonusId == 23:
            case bonusId == 25:
            case bonusId == 32:
                return bonusValue;
            case bonusId == 20:
                return 3.5 * bonusValue;
            case 21 <= bonusId && 34 >= bonusId:
                return bonusValue;
            default:
                return 3.5 * bonusValue;
        }
    }

    getBonusText = (): string => {
        // Can't have the two at the same time, so no worries with displaying two times the bonus
        return this.data.bonus.replace(/{/, nFormatter(this.getBonus())).replace(/</, notateNumber(1 + this.getBonus() / 100));
    }
}

export interface SummonEssence {
    color: SummonEssenceColor,
    quantity: number,
    displayBattles: boolean,
    displayEssence: boolean,
    unlocked: boolean,
    victories: number,
    battles: SummonEnemyModel[]
}

export interface EndlessFight {
    enemy: SummonEnemyModel,
    hp: number,
    atk: number,
    bonus: string,
    modifier: string[],
}

export class BattlesInfo {
    allVictories: number[] = [];
    allBattles: SummonEnemyModel[][] = [];
    currentHealth: number = 0;
    maxHealth: number = 0;
    playerUnitsHP: number = 0;
    playerUnitsAtk: number = 0;

    constructor() {}

    // This should now be used anywhere this value is needed
    getTotalVictories = (): number => {
        return this.allVictories.reduce((sum, victories) => sum + victories, 0);
    }

    // Get info to display for the next 10 fights
    getTenNextEndlessFights = (): EndlessFight[] => {
        const fights: EndlessFight[] = [];
        const bonuses = initSummonEnemyBonusRepo();

        for (let i = 0; i < 10; i++) {
            const battlenumber = this.allVictories[SummonEssenceColor.Endless]+i;
            // to avoid to modify the original info if updating some values inside the fight
            const battle: SummonEnemyModel = JSON.parse(JSON.stringify(this.allBattles[SummonEssenceColor.Endless][0 + Math.min(4, Math.floor(battlenumber / 20))]));
            fights.push({enemy: battle, hp: 0, atk: 0, 
                    modifier: BattlesInfo.getEndlessBattleFightModifier(battlenumber), 
                    bonus: BattlesInfo.getBattleBonusText(bonuses.find(bonus => bonus.data.bonusId == BattlesInfo.getEndlessBattleFightBonusIndex(battlenumber))?.data, EndlessModeBonusIncrease[BattlesInfo.getEndlessBattleFightIndex(battlenumber)])});
        }

        return fights;
    }

    static getBattleBonusText = (battle: SummonEnemyBonusModel | undefined, bonusValue: number): string => {
        if (battle) {
            const bonus = SummonBonus.getBonusValueForDisplay(battle.bonusId, bonusValue);

            return battle.bonus.replace(/{/, nFormatter(bonus)).replace(/</, nFormatter(1 + bonus / 100));
        } else {
            return "";
        }
    }

    static getEndlessBattleFightIndex = (endlessFightIndex: number): number => {
        return Math.round(endlessFightIndex - 40 * Math.floor(endlessFightIndex / 40));
    }

    static getEndlessBattleFightModifier = (endlessFightIndex: number): string[] => {
        return EndlessModeEnemyModifier[EndlessModeModifierID[this.getEndlessBattleFightIndex(endlessFightIndex)]];
    }

    static getEndlessBattleFightBonusIndex = (endlessFightIndex: number): number => {
        return EndlessModeBonusIndexes[this.getEndlessBattleFightIndex(endlessFightIndex)];
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
                    upgrade.bonusMultiplyer = (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Endless)?.victories ?? 0);
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

    updatePlayersUnitStats = () => {
        const healthFlatBonus = [1,10,35,37];
        const healthFlat = (1 + this.summonUpgrades.filter(upgrade => healthFlatBonus.indexOf(upgrade.index) > -1)?.reduce((sum, upgrade) => sum + upgrade.getFullBonus(), 0));
        this.summonBattles.playerUnitsHP = healthFlat * (1 + (this.summonUpgrades.find(upgrade => upgrade.index == 20)?.getFullBonus() ?? 0) / 100 ) 
                                        * (1 + ((this.summonUpgrades.find(upgrade => upgrade.index == 50)?.getFullBonus() ?? 0) + (this.summonUpgrades.find(upgrade => upgrade.index == 59)?.getFullBonus() ?? 0) + (this.summonUpgrades.find(upgrade => upgrade.index == 63)?.getFullBonus() ?? 0)) / 100 )
                                        * (1 + (this.summonUpgrades.find(upgrade => upgrade.index == 61)?.getFullBonus() ?? 0) / 100);

        const attackFlatBonus = [3,12,21,31];
        const attackFlat = (1 + this.summonUpgrades.filter(upgrade => attackFlatBonus.indexOf(upgrade.index) > -1)?.reduce((sum, upgrade) => sum + upgrade.getFullBonus(), 0));
        this.summonBattles.playerUnitsAtk = attackFlat * (1 + (this.summonUpgrades.find(upgrade => upgrade.index == 43)?.getFullBonus() ?? 0) / 100 ) 
                                        * (1 + ((this.summonUpgrades.find(upgrade => upgrade.index == 51)?.getFullBonus() ?? 0) + (this.summonUpgrades.find(upgrade => upgrade.index == 56)?.getFullBonus() ?? 0) + (this.summonUpgrades.find(upgrade => upgrade.index == 64)?.getFullBonus() ?? 0)) / 100 )
                                        * (1 + (this.summonUpgrades.find(upgrade => upgrade.index == 60)?.getFullBonus() ?? 0) / 100);

        // This bonus is based on attack damage of units, so can't update it before
        const sharpenedSpikeUpgrade = this.summonUpgrades.find(upgrade => upgrade.index == 68);
        if (sharpenedSpikeUpgrade) {
            sharpenedSpikeUpgrade.bonusMultiplyer = this.summonBattles.playerUnitsAtk;
        }
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Summon", perPlayer: false, default: [] },
            { key: "OptLacc", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
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
        
        // Reset and add "blank" values into arrays
        summoning.summonBattles.allVictories = [];
        summoning.summonBattles.allBattles = [];
        for (let i = 0; i < Object.keys(SummonEssenceColor).filter(key => isNaN(Number(key))).length; i++) {
            summoning.summonBattles.allVictories.push(0);
            summoning.summonBattles.allBattles.push([]);
        }
        
        const enemyRepo = initSummonEnemyRepo();
        // Create an array of array that contains all summoning battles in the right order using WhiteBattleOrder then DeathNoteOrder for other colors
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
        EndlessModeBattleOrder.forEach(battle => {
            const enemyData = enemyRepo.find((enemy) => enemy.data.enemyId == battle);
            if (enemyData) {
                summoning.summonBattles.allBattles[SummonEssenceColor.Endless].push(enemyData.data);
            }
        });

        const wonBattles = summoningData[1] as string[];
        wonBattles.forEach((battle) => {
            // ignore if endless mode enemy
            if (EndlessModeBattleOrder.indexOf(battle) >= 0) {
                return;
            }

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
                        summoning.summonBattles.allVictories[i]++;
                        return;
                    }
                }
            }
        });
        for (let i = 0; i < (optionList[319] ?? 0); i++) {
            const index = BattlesInfo.getEndlessBattleFightIndex(i);
            const relevantBonus = summoning.summonBonuses.find(bonus => bonus.data.bonusId == BattlesInfo.getEndlessBattleFightBonusIndex(i));
            if (relevantBonus) {
                relevantBonus.bonusValue += EndlessModeBonusIncrease[index];
            }
            summoning.summonBattles.allVictories[SummonEssenceColor.Endless]++;
        }

        summoning.summonEssences = [];
        const essences = summoningData[2] as number[];
        for (let index = 0; index < summoning.summonBattles.allVictories.length; index++) {
            let unlocked: boolean = false;
            let displayBattle: boolean = false;
            let displayEssence: boolean = false;
            const essenceOwned: number = index < essences.length ? essences[index] : 0;
            switch(index) {
                case SummonEssenceColor.White:
                    unlocked = true;
                    displayBattle = true;
                    displayEssence = true;
                    break;
                case SummonEssenceColor.Green:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 4)?.level ?? 0) > 0;
                    displayBattle = true;
                    displayEssence = true;
                    break;
                case SummonEssenceColor.Yellow:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 13)?.level ?? 0) > 0;
                    displayBattle = true;
                    displayEssence = true;
                    break;
                case SummonEssenceColor.Blue:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 23)?.level ?? 0) > 0;
                    displayBattle = true;
                    displayEssence = true;
                    break;
                case SummonEssenceColor.Purple:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 33)?.level ?? 0) > 0;
                    displayBattle = true;
                    displayEssence = true;
                    break;
                case SummonEssenceColor.Red:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 44)?.level ?? 0) > 0;
                    displayBattle = true;
                    displayEssence = true;
                    break;
                case SummonEssenceColor.Cyan:
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 53)?.level ?? 0) > 0;
                    displayBattle = true;
                    displayEssence = true;
                    break;
                case SummonEssenceColor.Teal:
                    // TODO : update this once Spelunking is correctly implemented
                    unlocked = false;
                    displayBattle = true;
                    displayEssence = true;
                    break;
                case SummonEssenceColor.Endless:
                    // Need to update this once we know which upgrade unlock this
                    unlocked = (this.summonUpgrades?.find(upgrade => upgrade.index == 70)?.level ?? 0) > 0;
                    displayBattle = true;
                    // There's no real Endless essence, so never display it
                    displayEssence = false;
                    break;
                case SummonEssenceColor.FutureContent4:
                default:
                    unlocked = false;
                    displayBattle = false;
                    displayEssence = false;
                    break;
            }

            let colorVictories: number = 0;
            if (index < summoning.summonBattles.allVictories.length) {
                colorVictories = summoning.summonBattles.allVictories[index];
            }

            let colorBattles: SummonEnemyModel[] = [];
            if (index < summoning.summonBattles.allBattles.length) {
                colorBattles = summoning.summonBattles.allBattles[index];
            }

            summoning.summonEssences.push({ color: index, quantity: essenceOwned, unlocked: unlocked, displayBattles: displayBattle, displayEssence: displayEssence, victories: colorVictories, battles: colorBattles });
        }

        summoning.updateUnlockedUpgrades();

        summoning.summonBattles.currentHealth = summoningData[3][0] ?? 0;
        summoning.summonBattles.maxHealth = summoningData[3][2] ?? 0;

        summoning.summonFamiliarRaw = summoningData[4];
    }

    static getSummoningStoneIcon(color: SummonEssenceColor): ImageData {
        if (color == SummonEssenceColor.Endless) {
            return {
                location: `SumUpgIc70`,
                height: 25,
                width: 25
            }
        }

        return {
            location: `SummC${color+1}`,
            height: 25,
            width: 25
        }
    }

    static getEssenceIcon(color: SummonEssenceColor): ImageData {
        let location = "";
        switch(color) {
            case SummonEssenceColor.Red:
                location = "red_custom";
                break;
            case SummonEssenceColor.Cyan:
                location = "cyan_custom";
                break;
            default:
                location = `W6item${color + 6}_x1`;
                break;
        }
        return {
            location: location,
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

    const levels: number[] = [];
    players.forEach(player => {
        levels.push(player.skills.get(SkillsIndex.Summoning)?.level ?? 0);
    })
    summoning.summoningLevel = Math.max(...levels);

    summoning.updateSecondaryBonus();
    summoning.updatePlayersUnitStats();
}

export const updateSummoningWinnerBonusBoost = (data: Map<string, any>) => {
    const summoning = data.get("summoning") as Summoning;
    const sneaking = data.get("sneaking") as Sneaking;
    const sailing = data.get("sailing") as Sailing;
    const taskboard = data.get("taskboard") as TaskBoard;
    const achievements = data.get("achievements") as Achievement[];
    const emperor = data.get("emperor") as Emperor;
    const equipmentSets = data.get("equipmentSets") as EquipmentSets;   

    const crystalComb = sneaking.pristineCharms?.find(charm => charm.data.itemId == 8);
    const charmBonus = (crystalComb && crystalComb.unlocked) ? (1 + crystalComb.data.x1 / 100) : 1;
    const sailingArtifactBonus = sailing.artifacts[32].getBonus();

    const achiev379 = achievements[379].completed ? 1 : 0; // x1.01
    const achiev373 = achievements[373].completed ? 1 : 0; // x1.01
    const taskBonus = taskboard.merits[44].getBonus();
    const emperorBonus = emperor.emperorBonuses[8].getBonus();
    const godshardSetBonus = equipmentSets.getSetBonus("GODSHARD_SET", undefined, true);
    
    // this bonus isn't affected by any boost, so we can already calculate it here
    const summonBonus = (summoning.summonBonuses.find(bonus => bonus.data.bonusId == 32)?.getBonus() ?? 0);

    summoning.summonBonuses.forEach(bonus => {
        bonus.pristineCharmBonus = charmBonus;
        bonus.artifactBonus = sailingArtifactBonus;
        bonus.taskBoardBonus = taskBonus;
        bonus.achievement373Bonus = achiev373;
        bonus.achievement379Bonus = achiev379;
        bonus.summoning32Bonus = summonBonus;
        bonus.godshardSetBonus = godshardSetBonus;
        bonus.emperorBonus = emperorBonus;
    });
}

// Kinda like what have been done for breeding Shiny with updateAllShinyEffects(), easier to manage this way
export const updateSummoningWinnerImpact = (data: Map<string, any>) => {
    const summoning = data.get("summoning") as Summoning;
    const equinox = data.get("equinox") as Equinox;
    const cooking = data.get("cooking") as Cooking;

    // Equinox Max Level
    const bonusEquinoxLevel = (summoning.summonBonuses.find(bonus => bonus.data.bonusId == 25)?.getBonus() ?? 0);
    // Don't bother if == 0
    if (bonusEquinoxLevel > 0) {
        equinox.upgrades.forEach((upgrade) => {
            upgrade.bonusLevelFromSummoningWinner24 = bonusEquinoxLevel;
            upgrade.setMaxLevel(equinox.challenges);
        });
    }

    // Meal Bonus
    const mealBonus = (summoning.summonBonuses.find(bonus => bonus.data.bonusId == 27)?.getBonus() ?? 0);

    cooking.meals.forEach(meal => {
        meal.winnerBonus = mealBonus;
    });
}
