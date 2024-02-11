import { nFormatter } from "../utility";
import { Alchemy } from "./alchemy";
import { Domain, RawData } from "./base/domain";
import { initDreamChallengeRepo } from "./data/DreamChallengeRepo";
import { initDreamUpgradeRepo } from "./data/DreamUpgradeRepo";
import { Item } from "./items";
import { DreamChallengeModel } from "./model/dreamChallengeModel";
import { DreamUpgradeModel } from "./model/dreamUpgradeModel";

class Challenge {
    complete: boolean = false;
    constructor(public index: number, public data: DreamChallengeModel) { }

    getValue = (): number => {
        return this.complete ? 1 : 0;
    }

    getFillRateBonus = (): number => {
        if (!this.complete) {
            return 0;
        }

        switch (this.index) {
            case 3: return 10;
            case 9: return 15;
            case 14: return 20;
            case 19: return 25;
            case 22: return 30;
            case 24: return 35;
            case 29: return 40;
            default: return 0;
        }
    }
}

class Upgrade {
    unlocked: boolean = false;
    level: number = 0;
    maxLevel: number = 0;
    constructor(public index: number, public data: DreamUpgradeModel) { }

    setMaxLevel = (challanges: Challenge[]): void => {
        switch (this.index) {
            case 3: {
                this.maxLevel = Math.round(this.data.x1 + 3 * challanges[6].getValue() + 4 * challanges[15].getValue());
                break;
            }
            case 4: {
                this.maxLevel = Math.round(this.data.x1 + 5 * challanges[12].getValue() + 10 * challanges[18].getValue());
                break;
            }
            case 8: {
                this.maxLevel = Math.round(this.data.x1 + 5 * challanges[21].getValue() + 10 * challanges[26].getValue());
                break;
            }
            case 9: {
                this.maxLevel = Math.round(this.data.x1 + 4 * challanges[25].getValue());
                break;
            }
            case 10: {
                this.maxLevel = Math.round(this.data.x1 + 4 * challanges[30].getValue());
                break;
            }
            default: {
                this.maxLevel = Math.round(this.data.x1)
                break;
            }
        }
    }

    getDescription = () => {
        return this.data.upgrade.split("@")[0];
    }

    getBonusText = () => {
        const bonusValue = this.getBonus();
        // If it's a bonus we don't care about, just empty string is fine.
        if (bonusValue == -1) {
            return "";
        }

        const descSplit = this.data.upgrade.split("@   @ ")
        // This shouldn't happen but might as well be safe.
        if (descSplit.length < 2) {
            return ""
        }

        const bonusText = descSplit[1];
        // Handle this case by case, it's easier to read then finding a complicated catch-all.
        // Food Lust is unique as always, so has it's own override in the class below.
        if (bonusText.includes("Total Bonus:  ")) {// note the double space 
            return bonusText.replace("Total Bonus:  ", `Total Bonus: ${bonusValue} `);
        }

        if (bonusText.includes("Total Bonus: %")) {
            return bonusText.replace("Total Bonus: %", `Total Bonus: ${bonusValue}%`);
        }

        // again a safety fallback.
        return ""
    }

    getBonus = () => {
        // This is pretty ugly as a hardcoded list but there's not much I can do if the source data is bad.
        // Also I rather put all the "math" here instead of splattered across the repo.
        switch (this.index) {
            case 0:
            case 1:
            case 2:
                return -1;
            case 3: return 9 * this.level; // Reinvested liquid
            case 4: return 10 * this.level; // dmg
            case 5: return 1 * this.level // tower dmg every second
            case 6: return 1 * this.level // lab px
            case 7: return 1 * this.level // nugget size
            case 8: return 5 * this.level // drop rate
            // case 9: This one is a special one, so has it's own class
            case 10: return 1 * this.level // talent levels
            default: return -1;
        }
    }
}

class FoodLust extends Upgrade {
    bossesKilled: number = 0; // Stored at optionslist [193]

    override getBonus = () => {
        if (this.level == 0 || this.bossesKilled == 0) { 
            return 0;
        }
        return Math.max(0.01, Math.pow(0.8, Math.min(this.bossesKilled, this.level)))
    }

    override getBonusText = () => {
        const bonusValue = this.getBonus();

        return `Meal Cost: ${nFormatter(bonusValue * 100)}%`
    }
}

export interface Bar {
    current: number,
    max: number,
    rate: number,
    percentageOfCap: number,
    timeToFull: number,
}


export class Equinox extends Domain {
    challenges: Challenge[] = [];
    upgrades: Upgrade[] = [];
    bar: Bar = {
        current: 0,
        max: 0,
        percentageOfCap: 0,
        rate: 0,
        timeToFull: 0,
    }

    numberOfActiveChallenges: number = 0;
    activeChallenges: Challenge[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "WeeklyBoss", perPlayer: false, default: {} },
            { key: "Dream", perPlayer: false, default: [] },
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.challenges = initDreamChallengeRepo().map(challenge => new Challenge(challenge.index, challenge.data));
        this.upgrades = initDreamUpgradeRepo().map(upgrade => {
            switch (upgrade.index) {
                case 9: return new FoodLust(upgrade.index, upgrade.data)
                default: return new Upgrade(upgrade.index, upgrade.data)
            }
        });
        this.upgrades = this.upgrades.filter(upgrade => upgrade.data.upgrade != "Huh...");
        return this;
    }

    parse(data: Map<string, any>): void {
        const equinox = data.get(this.getDataKey()) as Equinox;
        const weeklyBoss = data.get("WeeklyBoss") as Record<string, number>;
        const dreamData = data.get("Dream") as number[];
        const optionList = data.get("OptLacc") as number[];

        equinox.challenges.forEach((challenge) => {
            challenge.complete = weeklyBoss[`d_${challenge.index}`] == -1;
        })

        const upgradesUnlocked = [0, 2, 5, 7, 10, 13, 17, 20, 23, 28].reduce((sum, challengeIndex) => {
            return sum += equinox.challenges[challengeIndex].complete ? 1 : 0
        }, 1);

        equinox.upgrades.forEach(upgrade => {
            upgrade.unlocked = upgrade.index < upgradesUnlocked;
            upgrade.level = dreamData[upgrade.index + 2];
            upgrade.setMaxLevel(equinox.challenges);
        });

        equinox.bar.current = dreamData[0];

        const totalUpgradeLevels = equinox.upgrades.reduce((sum, upgrade) => sum += upgrade.level, 0);
        equinox.bar.max = Math.round((120 + 40 * totalUpgradeLevels) * Math.pow(1.02, totalUpgradeLevels));

        equinox.numberOfActiveChallenges = Math.round(Math.min(5, dreamData[2]));
        equinox.activeChallenges = equinox.challenges.filter(challenge => !challenge.complete).slice(0, this.numberOfActiveChallenges);

        (equinox.upgrades[9] as FoodLust).bossesKilled = optionList[193];
    }
}

export function updateEquinoxBar(data: Map<string, any>) {
    const equinox = data.get("equinox") as Equinox;
    const alchemy = data.get("alchemy") as Alchemy
    const rawData = data.get("rawData") as Record<string, any>;
    const bundleInfo = rawData["BundlesReceived"] as Record<string, number>;
    const lastUpdated = data.get("lastUpdated") as Date;

    const hasBundle = bundleInfo == undefined ? false : bundleInfo["bun_q"] != undefined;
    const baseMultiplier = hasBundle ? 90 : 60;

    const marbleMocha = alchemy.vials.find(vial => vial.name == "Marble Mocha")?.getBonus() ?? 0;
    const fillRateFromChallenges = equinox.challenges.reduce((sum, challenge) => sum += challenge.getFillRateBonus(), 0);
    equinox.bar.rate = Math.round(baseMultiplier * (1 + ((marbleMocha + fillRateFromChallenges) / 100)));

    const hoursSinceUpdate = ((new Date().getTime() - lastUpdated.getTime()) / 1000) / 3600;
    // calculate how much bar would have filled based on last updated time.
    const futureFilled = hoursSinceUpdate * equinox.bar.rate;
    equinox.bar.current = Math.min(equinox.bar.max, equinox.bar.current + futureFilled);
    equinox.bar.percentageOfCap = Math.round(equinox.bar.max / equinox.bar.current * 100);
    equinox.bar.timeToFull = (equinox.bar.max - equinox.bar.current) / (equinox.bar.rate / 3600);
}