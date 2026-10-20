import { commaNotation, notateNumber } from "../../../utility";
import { initSpecificItemRepo } from "../../data/SpecificItemRepo";
import { initRandoList2Repo } from "../../data/RandoList2Repo";
import { BaseItemModel } from "../../model/baseItemModel";

export type CoveShapeColor = "blue" | "purple";

export class CoveShape {
    constructor(
        public id: number,
        public color: CoveShapeColor,
        public data: BaseItemModel
    ) { }

    get name(): string {
        return this.data.displayName;
    }
}

export class CoveUpgrade {
    level: number = 0;

    constructor(
        public index: number,
        public name: string,
        public label: string,
        public bonusPerLevel: number,
        public costBase: number
    ) { }

    getDescription(): string | null {
        if (/[@^#鉢]/.test(this.label)) {
            return null;
        }

        const bonus = this.getBonus();
        const reduction = Math.floor(10000 * (1 - 1 / (1 + bonus / 100))) / 100;
        return this.label
            .replace(/\{/g, commaNotation(bonus))
            .replace(/\}/g, notateNumber(1 + bonus / 100, "MultiplierInfo").replace(/#/g, ""))
            .replace(/\$/g, `${reduction}`)
            .replace(/_/g, " ")
            .trim();
    }

    getBonus(): number {
        return this.level * this.bonusPerLevel;
    }

    getCost(costReductionBonus: number, studyDiscountActive: boolean): number {
        let cost = (Math.pow(this.costBase, this.level) + this.level) / (1 + costReductionBonus / 100);

        if (this.index % 2 === 1) {
            cost *= 5;
        }
        if (studyDiscountActive) {
            cost *= 0.85;
        }
        if (cost < 1_000_000) {
            cost = Math.max(1, Math.floor(cost));
        }

        return cost;
    }
}

export interface CoveLocalInputs {
    mapId: number;
    cavernId: number;
    campUpgrade100Bonus: number;
    campUpgrade101Bonus: number;
    campUpgrade103Bonus: number;
    campUpgrade105Bonus: number;
    gameLog: (value: number) => number;
}

export interface CoveLocalEffects {
    inCoveContext: boolean;
    dropRateMultiplier: number;
    afkGainMultiplier: number;
    multikillPerDamageTier: number;
    baseMultikill: number;
    respawnTimeMultiplier: number;
    bluePickupTargetId: number | null;
    bluePickupAmount: number;
    purplePickupTargetId: number | null;
    purplePickupAmount: number;
    pickupRandomDoubleChance: number;
}

export interface CoveCharacterInputs extends CoveLocalInputs {
    playerId: number;
}

export interface CoveRewardState {
    opalsEarned: number;
    ribbonRewardEarned: boolean;
}

export interface CovePurchaseEffects {
    incrementsStudyDailyCounter: boolean;
    opalsEarned: number;
    resetsMonsterRespawnTime: boolean;
    ribbonRewardEarned: boolean;
}

const coveUpgradeCount = 24;
const coveShapeNames = Array.from({ length: 12 }, (_, index) => `HoleGshape${index}`);

const getCoveShapes = (): CoveShape[] => {
    const repository = initSpecificItemRepo();
    return coveShapeNames.map((internalName, index) => {
        const shape = repository.find(item => item.id === internalName)!;
        return new CoveShape(index, index < 6 ? "blue" : "purple", shape.data);
    });
};

const getCoveUpgrades = (): CoveUpgrade[] => {
    const records = initRandoList2Repo();
    const names = records[11].data.elements;
    const labels = records[12].data.elements;
    const bonusPerLevels = records[13].data.elements;
    const costBases = records[14].data.elements;

    return Array.from({ length: coveUpgradeCount }, (_, index) => new CoveUpgrade(
        index,
        names[index].replace(/_/g, " "),
        labels[index],
        Number(bonusPerLevels[index]),
        Number(costBases[index])
    ));
};

export class Cove {
    readonly shapes: CoveShape[] = getCoveShapes();
    readonly upgrades: CoveUpgrade[] = getCoveUpgrades();
    readonly blueShapeBalances: number[] = Array(6).fill(0);
    readonly purpleShapeBalances: number[] = Array(6).fill(0);
    blueShapeTargetId: number | null = null;
    purpleShapeTargetId: number | null = null;
    glunkoKills: number = 0;
    normalDropRate: number = 0;
    rewards: CoveRewardState = { opalsEarned: 0, ribbonRewardEarned: false };
    localEffectsByPlayerId: ReadonlyMap<number, CoveLocalEffects> = new Map();

    parse(optionsListAccount: number[] | undefined): void {
        this.upgrades.forEach(upgrade => {
            upgrade.level = Number(optionsListAccount?.[630 + upgrade.index] ?? 0);
        });

        this.shapes.forEach(shape => {
            const balance = Number(optionsListAccount?.[654 + shape.id] ?? 0);
            if (shape.color === "blue") {
                this.blueShapeBalances[shape.id] = balance;
            } else {
                this.purpleShapeBalances[shape.id - 6] = balance;
            }
        });

        const blueTarget = Number(optionsListAccount?.[666] ?? 0);
        const purpleTarget = Number(optionsListAccount?.[667] ?? 0);
        this.blueShapeTargetId = blueTarget > 0 ? blueTarget - 1 : null;
        this.purpleShapeTargetId = purpleTarget > 0 ? purpleTarget + 5 : null;
        this.glunkoKills = Number(optionsListAccount?.[668] ?? 0);
        this.normalDropRate = Number(optionsListAccount?.[200] ?? 0);

        this.rewards = {
            opalsEarned: this.upgrades[0].level,
            ribbonRewardEarned: this.upgrades[5].level > 0
        };
        this.localEffectsByPlayerId = new Map();
    }

    getPurchaseEffects(upgradeIndex: number): CovePurchaseEffects {
        const grantsRibbon = upgradeIndex === 5 && !this.rewards.ribbonRewardEarned;
        return {
            incrementsStudyDailyCounter: !grantsRibbon,
            opalsEarned: upgradeIndex === 0 ? 1 : 0,
            resetsMonsterRespawnTime: upgradeIndex === 2,
            ribbonRewardEarned: grantsRibbon
        };
    }

    getCurrencyBalance(upgradeIndex: number): number {
        const page = Math.floor(upgradeIndex / 12);
        const pageSlot = upgradeIndex % 12;
        const currencyIndex = 654 + Math.floor(pageSlot / 2) + 6 * page;
        return currencyIndex < 660
            ? this.blueShapeBalances[currencyIndex - 654]
            : this.purpleShapeBalances[currencyIndex - 660];
    }

    getUpgradeCost(upgradeIndex: number, studyDailyCount: number, studyBonus: number): number {
        const upgrade = this.upgrades[upgradeIndex];
        const costReductionBonus = this.upgrades[7].getBonus();
        const studyDiscountActive = studyDailyCount < studyBonus;
        return upgrade.getCost(costReductionBonus, studyDiscountActive);
    }

    canPurchase(upgradeIndex: number, activePage: number, studyDailyCount: number, studyBonus: number): boolean {
        const page = Math.floor(upgradeIndex / 12);
        if (activePage !== page) {
            return false;
        }
        const balance = this.getCurrencyBalance(upgradeIndex);
        const cost = this.getUpgradeCost(upgradeIndex, studyDailyCount, studyBonus);
        return balance >= cost;
    }

    getBlueShapeDigits(gameLog: (value: number) => number): number {
        return this.blueShapeBalances.reduce((sum, balance) => sum + Math.ceil(gameLog(balance)), 0);
    }

    getPurpleShapeDigits(gameLog: (value: number) => number): number {
        return this.purpleShapeBalances.reduce((sum, balance) => sum + Math.ceil(gameLog(balance)), 0);
    }

    prepare(inputs: CoveLocalInputs): CoveLocalEffects {
        const inCoveContext = inputs.mapId === 216 && inputs.cavernId === 17;
        const blueDigits = this.getBlueShapeDigits(inputs.gameLog);
        const purpleDigits = this.getPurpleShapeDigits(inputs.gameLog);
        const dropBonus1 = this.upgrades[1].getBonus();
        const dropBonus17 = this.upgrades[17].getBonus();
        const dropBonus21 = this.upgrades[21].getBonus();
        const dropBonus3 = this.upgrades[3].getBonus();
        const dropBonus12 = this.upgrades[12].getBonus();
        const blueShapeBonus = this.upgrades[10].getBonus();
        const purpleShapeBonus = this.upgrades[22].getBonus();
        const killBonus = this.upgrades[4].getBonus();
        const afkBonus8 = this.upgrades[8].getBonus();
        const afkBonus13 = this.upgrades[13].getBonus();
        const multikillBonus = this.upgrades[6].getBonus();
        const baseMultikillBonus = this.upgrades[15].getBonus();
        const respawnBonus = this.upgrades[2].getBonus();

        const blueTargetBalance = this.blueShapeTargetId === null ? 0
            : this.blueShapeBalances[this.blueShapeTargetId];
        const blueTargetBonus = this.upgrades[9].getBonus();
        const blueTargetUnlocked = blueTargetBonus > 0 && this.blueShapeTargetId !== null &&
            blueTargetBalance >= 0.1;
        const purpleTargetBalance = this.purpleShapeTargetId === null ? 0
            : this.purpleShapeBalances[this.purpleShapeTargetId - 6];
        const purpleTargetBonus = this.upgrades[16].getBonus();
        const purpleTargetUnlocked = purpleTargetBonus > 0 && this.purpleShapeTargetId !== null &&
            purpleTargetBalance >= 0.1;

        return {
            inCoveContext,
            dropRateMultiplier: (1 + (dropBonus1 + dropBonus17 + dropBonus21) / 100)
                * (1 + dropBonus3 / 100)
                * (1 + dropBonus12 / 100)
                * (1 + blueShapeBonus * blueDigits / 100)
                * (1 + purpleShapeBonus * purpleDigits / 100)
                * (1 + this.upgrades[4].getBonus() * Math.ceil(inputs.gameLog(this.glunkoKills)) / 100)
                * (1 + this.upgrades[18].getBonus() * Math.ceil(inputs.gameLog(this.normalDropRate)) / 100),
            afkGainMultiplier: (10 + afkBonus8 + afkBonus13) / 100,
            multikillPerDamageTier: multikillBonus / 100,
            baseMultikill: baseMultikillBonus / 100,
            respawnTimeMultiplier: 1 / (1 + (respawnBonus + inputs.campUpgrade100Bonus) / 100),
            bluePickupTargetId: blueTargetUnlocked ? this.blueShapeTargetId : null,
            bluePickupAmount: blueTargetUnlocked ? blueTargetBonus : 0,
            purplePickupTargetId: purpleTargetUnlocked ? this.purpleShapeTargetId : null,
            purplePickupAmount: purpleTargetUnlocked ? purpleTargetBonus : 0,
            pickupRandomDoubleChance: Math.min(
                (inputs.campUpgrade101Bonus + inputs.campUpgrade103Bonus + inputs.campUpgrade105Bonus) / 100,
                3
            )
        };
    }

    prepareCharacters(inputs: CoveCharacterInputs[]): ReadonlyMap<number, CoveLocalEffects> {
        const effectsByPlayerId = new Map<number, CoveLocalEffects>();
        inputs.forEach(character => {
            effectsByPlayerId.set(character.playerId, this.prepare(character));
        });
        this.localEffectsByPlayerId = effectsByPlayerId;
        return effectsByPlayerId;
    }
}

