import { Domain, RawData } from "../base/domain";
import { SummonUpgradeBase, initSummonUpgradeRepo } from "../data/SummonUpgradeRepo";
import { SummonEnemyBase, initSummonEnemyRepo } from "../data/SummonEnemyRepo";
import { SummonUnitBase, initSummonUnitRepo } from "../data/SummonUnitRepo";
import { SummonEnemyBonusBase, initSummonEnemyBonusRepo } from "../data/SummonEnemyBonusRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { SummonUpgradeModel } from "../model/summonUpgradeModel";
import { SkillsIndex } from "../SkillsIndex";
import { Player } from "../player";
import { SummonEnemyBonusModel } from "../model/summonEnemyBonusModel";
import { Sneaking } from "./sneaking";
import { nFormatter } from "../../utility";
import { Deathnote, deathNoteMobOrder } from '../deathnote';

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
    FutureContent2 = 6,
    FutureContent3 = 7,
    FutureContent4 = 8
}

export class SummonUpgrade {
    unlocked: boolean = false;
    level: number = 0;
    shouldBeDisplayed: boolean = true;
    secondaryBonus: string = "";

    constructor(public index: number, public data: SummonUpgradeModel, level: number = 0) {
        this.shouldBeDisplayed = (data.name != "Name");
        this.level = level;
    }

    nextLevelCost = (): number => {
        return this.data.cost * Math.pow(this.data.costExponent, this.level);
    }

    getBonus = (level: number = this.level): number => {
        return level * this.data.bonusQty
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
            return this.data.bonus.slice(0, this.data.bonus.indexOf('@')) + "Cost (and level) reset a few days after buying it";
        } else {
            return this.data.bonus.replace(/@/, '\r\n').replace(/{/, this.getBonus(level).toString()).replace(/}/, this.secondaryBonus);
        }
    }

    static fromBase = (data: SummonUpgradeBase[]): SummonUpgrade[] => {
        return data.map((value) => new SummonUpgrade(value.index, value.data));
    }
}


export class SummonBonus {
    bonusValue: number = 0;
    pristineCharmBonus: number = 1;

    constructor(public index: number, public data: SummonEnemyBonusModel, bonusValue: number = 0) {
        this.bonusValue = bonusValue;
    }

    getBonus = (): number => {
        return 3.5 * this.bonusValue * this.pristineCharmBonus;
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
    victories: number
}

export class Summoning extends Domain {
    summonUpgrades: SummonUpgrade[] = [];
    summonBonuses: SummonBonus[] = [];
    summonEssences: SummonEssence[] = [];
    summoningLevel: number = 0;

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
                    const allVictories: number = this.summonEssences.reduce((sum, essence) => sum + essence.victories, 0);
                    upgrade.secondaryBonus = (upgrade.getBonus() * allVictories).toString();
                    break;
                case 11:
                    // Multiply bonus by green victory
                    upgrade.secondaryBonus = (upgrade.getBonus() * (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Green)?.victories ?? 0)).toString();
                    break;
                case 18:
                    // Multiply bonus by yellow victory
                    upgrade.secondaryBonus = (upgrade.getBonus() * (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Yellow)?.victories ?? 0)).toString();
                    break;
                case 27:
                    // Multiply bonus by blue victory
                    upgrade.secondaryBonus = (upgrade.getBonus() * (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Blue)?.victories ?? 0)).toString();
                    break;
                case 38:
                    // Multiply bonus by purple victory
                    upgrade.secondaryBonus = (upgrade.getBonus() * (this.summonEssences?.find(essence => essence.color == SummonEssenceColor.Purple)?.victories ?? 0)).toString();
                    break;
                case 30:
                case 40:
                case 65:
                case 66:
                case 67:
                    // Multiply bonus by summoning level
                    upgrade.secondaryBonus = (upgrade.getBonus() * this.summoningLevel).toString();
                    break;
                default:
                    upgrade.secondaryBonus = "";
                    break;
            }
        });
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Summon", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const summoning = data.get(this.dataKey) as Summoning;
        const summoningData = data.get("Summon") as any[];

        summoning.summonUpgrades = [];
        summoning.summonUpgrades = initSummonUpgradeRepo()
            .map(
            base => new SummonUpgrade(base.index, base.data, summoningData[0][base.index] ?? 0)
        );
        
        const victories = [0,0,0,0,0,0,0,0,0] as number[];
        const enemyRepo = initSummonEnemyRepo();
        const wonBattles = summoningData[1] as string[];
        wonBattles.forEach((battle) => {
            const enemyData = enemyRepo.find((enemy) => enemy.data.enemyId == battle);
            if (enemyData) {
                const relevantBonus = summoning.summonBonuses.find(bonus => bonus.data.bonusId == enemyData.data.bonusId);
                if (relevantBonus) {
                    relevantBonus.bonusValue += enemyData.data.bonusQty as number;
                }
                switch(true) {
                    case WhiteBattleOrder.includes(battle):
                        victories[0]++;
                        break;
                    default:
                        for (let i = 0; i < deathNoteMobOrder.length; i++) {
                            if (deathNoteMobOrder[i].includes(battle)) {
                                victories[i+1]++;
                                break;
                            }
                        }
                }
            }
        });

        summoning.summonEssences = [];
        const essences = summoningData[2] as number[];
        essences.forEach((value, index) => {
            let shouldDisplay: boolean = false;
            switch(index) {
                case SummonEssenceColor.White:
                    shouldDisplay = true;
                    break;
                case SummonEssenceColor.Green:
                    shouldDisplay = (this.summonUpgrades?.find(upgrade => upgrade.index == 4)?.level ?? 0) > 0;
                    break;
                case SummonEssenceColor.Yellow:
                    shouldDisplay = (this.summonUpgrades?.find(upgrade => upgrade.index == 13)?.level ?? 0) > 0;
                    break;
                case SummonEssenceColor.Blue:
                    shouldDisplay = (this.summonUpgrades?.find(upgrade => upgrade.index == 23)?.level ?? 0) > 0;
                    break;
                case SummonEssenceColor.Purple:
                    shouldDisplay = (this.summonUpgrades?.find(upgrade => upgrade.index == 33)?.level ?? 0) > 0;
                    break;
                // For now you can't get red or later essences, but we already know which upgrade will unlock red essence, but for others will need to do it when available
                case SummonEssenceColor.Red:
                    shouldDisplay = (this.summonUpgrades?.find(upgrade => upgrade.index == 44)?.level ?? 0) > 0;
                    break;
                case SummonEssenceColor.FutureContent2:
                case SummonEssenceColor.FutureContent3:
                case SummonEssenceColor.FutureContent4:
                default:
                    shouldDisplay = false;
                    break;
            }

            let colorVictories: number = 0;
            if (index < victories.length) {
                colorVictories = victories[index];
            }

            summoning.summonEssences.push({ color: index, quantity: value, display: shouldDisplay, victories: colorVictories});
        });

        summoning.updateUnlockedUpgrades();

        summoning.summonBonuses = initSummonEnemyBonusRepo()
        .map(
            base => new SummonBonus(base.index, base.data)
        );
    }

    static getEssenceIcon(color: SummonEssenceColor): ImageData {
        return {
            location: `SummC${color+1}`,
            height: 25,
            width: 25
        }
    }
}

export const updateSummoningLevelAndBonuses = (data: Map<string, any>) => {
    const summoning = data.get("summoning") as Summoning;
    const players = data.get("players") as Player[];

    summoning.summoningLevel = players[0]?.skills.get(SkillsIndex.Summoning)?.level ?? 0;

    summoning.updateSecondaryBonus();
}

export const updateSummoningPristineCharm = (data: Map<string, any>) => {
    const summoning = data.get("summoning") as Summoning;
    const sneaking = data.get("sneaking") as Sneaking;

    const crystalComb = sneaking.pristineCharms?.find(charm => charm.data.itemId == 8);
    if (crystalComb && crystalComb.unlocked) {
        const bonusValue = (1 + crystalComb.data.x1 / 100);
        summoning.summonBonuses.forEach(bonus => bonus.pristineCharmBonus = bonusValue);
    }
}