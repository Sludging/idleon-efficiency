import { initRandoList2Repo, RandoListBase } from "../../data/RandoList2Repo";
import { initSpecificItemRepo } from "../../data/SpecificItemRepo";
import { RandoListModel } from "../../model/randoListModel";
import { BaseItemModel } from "../../model/baseItemModel";

export type CoveShapeColor = "blue" | "purple";

export class CoveShape {
    constructor(
        public id: number,
        public color: CoveShapeColor,
        public data: BaseItemModel
    ) { }

    get name(): string {
        return this.data.displayName ?? this.data.internalName;
    }
}

export class CoveUpgrade {
    level: number | null = null;

    constructor(
        public index: number,
        public label: string,
        public bonusPerLevel: number,
        public costBase: number
    ) { }

    getBonus(): number | null {
        return this.level === null ? null : this.level * this.bonusPerLevel;
    }

    getCost(costReductionBonus: number | null, studyDiscountActive: boolean): number | null {
        if (this.level === null || costReductionBonus === null) {
            return null;
        }
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
    campUpgrade100Bonus: number | null;
    campUpgrade101Bonus: number | null;
    campUpgrade103Bonus: number | null;
    campUpgrade105Bonus: number | null;
    gameLog: (value: number) => number;
}

export interface CoveLocalEffects {
    appliesInCove: boolean;
    dropRateMultiplier: number | null;
    afkGainMultiplier: number | null;
    multikillPerDamageTier: number | null;
    baseMultikill: number | null;
    respawnTimeMultiplier: number | null;
    bluePickupTargetId: number | null;
    bluePickupTargetKnown: boolean;
    bluePickupAmount: number | null;
    purplePickupTargetId: number | null;
    purplePickupTargetKnown: boolean;
    purplePickupAmount: number | null;
    pickupRandomDoubleChance: number | null;
}

export interface CoveCharacterInputs extends CoveLocalInputs {
    playerId: number;
}

export interface CoveRewardState {
    opalsEarned: number | null;
    ribbonRewardEarned: boolean | null;
}

export interface CovePurchaseEffects {
    incrementsStudyDailyCounter: boolean | null;
    opalsEarned: number;
    resetsMonsterRespawnTime: boolean;
    ribbonRewardEarned: boolean | null;
}

const coveUpgradeCount = 24;
const coveShapeNames = Array.from({ length: 12 }, (_, index) => `HoleGshape${index}`);

const getRandoRecord = (records: RandoListBase[], index: number): RandoListModel => {
    return records.find(record => record.index === index)!.data;
};

const getCoveShapes = (): CoveShape[] => {
    const repository = initSpecificItemRepo();
    const shapes = coveShapeNames.map((internalName, index) => {
        const shape = repository.find(item => item.id === internalName)!;
        return new CoveShape(index, index < 6 ? "blue" : "purple", shape.data);
    });
    return shapes;
};

const getCoveUpgrades = (): CoveUpgrade[] => {
    const records = initRandoList2Repo();
    const labels = getRandoRecord(records, 12).elements;
    const bonusPerLevels = getRandoRecord(records, 13).elements;
    const costBases = getRandoRecord(records, 14).elements;

    return Array.from({ length: coveUpgradeCount }, (_, index) => new CoveUpgrade(
        index,
        labels[index],
        Number(bonusPerLevels[index]),
        Number(costBases[index])
    ));
};

export class Cove {
    readonly shapes: CoveShape[] = getCoveShapes();
    readonly upgrades: CoveUpgrade[] = getCoveUpgrades();
    readonly blueShapeBalances: (number | null)[] = Array(6).fill(null);
    readonly purpleShapeBalances: (number | null)[] = Array(6).fill(null);
    blueShapeTargetId: number | null = null;
    blueShapeTargetAvailable: boolean = false;
    purpleShapeTargetId: number | null = null;
    purpleShapeTargetAvailable: boolean = false;
    glunkoKills: number | null = null;
    normalDropRate: number | null = null;
    rewards: CoveRewardState = { opalsEarned: null, ribbonRewardEarned: null };
    localEffectsByPlayerId: ReadonlyMap<number, CoveLocalEffects> = new Map();

    parse(optionsListAccount: number[] | undefined): void {
        this.upgrades.forEach(upgrade => {
            const level = optionsListAccount?.[630 + upgrade.index];
            upgrade.level = level == null ? null : Number(level);
        });

        this.shapes.forEach(shape => {
            const balance = optionsListAccount?.[654 + shape.id];
            if (shape.color === "blue") {
                this.blueShapeBalances[shape.id] = balance == null ? null : Number(balance);
            } else {
                this.purpleShapeBalances[shape.id - 6] = balance == null ? null : Number(balance);
            }
        });

        const blueTarget = optionsListAccount?.[666];
        const purpleTarget = optionsListAccount?.[667];
        this.blueShapeTargetAvailable = blueTarget != null;
        this.purpleShapeTargetAvailable = purpleTarget != null;
        this.blueShapeTargetId = blueTarget != null && blueTarget > 0 ? Number(blueTarget) - 1 : null;
        this.purpleShapeTargetId = purpleTarget != null && purpleTarget > 0 ? Number(purpleTarget) + 5 : null;
        const glunkoKills = optionsListAccount?.[668];
        const normalDropRate = optionsListAccount?.[200];
        this.glunkoKills = glunkoKills == null ? null : Number(glunkoKills);
        this.normalDropRate = normalDropRate == null ? null : Number(normalDropRate);

        this.rewards = {
            opalsEarned: this.upgrades[0].level,
            ribbonRewardEarned: this.upgrades[5].level === null ? null : this.upgrades[5].level > 0
        };
        this.localEffectsByPlayerId = new Map();
    }

    getPurchaseEffects(upgradeIndex: number): CovePurchaseEffects {
        const ribbonRewardEarned = this.rewards.ribbonRewardEarned;
        const rewardKnown = upgradeIndex !== 5 || ribbonRewardEarned !== null;
        const grantsRibbon = upgradeIndex === 5 && ribbonRewardEarned === false;
        return {
            incrementsStudyDailyCounter: rewardKnown ? !grantsRibbon : null,
            opalsEarned: upgradeIndex === 0 ? 1 : 0,
            resetsMonsterRespawnTime: upgradeIndex === 2,
            ribbonRewardEarned: rewardKnown ? grantsRibbon : null
        };
    }

    getCurrencyBalance(upgradeIndex: number): number | null {
        const page = Math.floor(upgradeIndex / 12);
        const pageSlot = upgradeIndex % 12;
        const currencyIndex = 654 + Math.floor(pageSlot / 2) + 6 * page;
        return currencyIndex < 660
            ? this.blueShapeBalances[currencyIndex - 654]
            : this.purpleShapeBalances[currencyIndex - 660];
    }

    getUpgradeCost(upgradeIndex: number, studyDailyCount: number, studyBonus: number): number | null {
        const upgrade = this.upgrades[upgradeIndex];
        const costReductionBonus = this.upgrades[7].getBonus();
        const studyDiscountActive = studyDailyCount < studyBonus;
        return upgrade.getCost(costReductionBonus, studyDiscountActive);
    }

    canPurchase(upgradeIndex: number, activePage: number, studyDailyCount: number, studyBonus: number): boolean | null {
        const page = Math.floor(upgradeIndex / 12);
        if (activePage !== page) {
            return false;
        }
        const balance = this.getCurrencyBalance(upgradeIndex);
        const cost = this.getUpgradeCost(upgradeIndex, studyDailyCount, studyBonus);
        return balance === null || cost === null ? null : balance >= cost;
    }

    getBlueShapeDigits(gameLog: (value: number) => number): number | null {
        if (this.blueShapeBalances.some(balance => balance === null)) {
            return null;
        }
        return this.blueShapeBalances.reduce<number>((sum, balance) => sum + Math.ceil(gameLog(balance!)), 0);
    }

    getPurpleShapeDigits(gameLog: (value: number) => number): number | null {
        if (this.purpleShapeBalances.some(balance => balance === null)) {
            return null;
        }
        return this.purpleShapeBalances.reduce<number>((sum, balance) => sum + Math.ceil(gameLog(balance!)), 0);
    }

    prepare(inputs: CoveLocalInputs): CoveLocalEffects {
        const appliesInCove = inputs.mapId === 216 && inputs.cavernId === 17;
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
        const killCount = this.glunkoKills;
        const normalDropBonus = this.upgrades[18].getBonus();
        const normalDropRate = this.normalDropRate;
        const dropRateAvailable = blueDigits !== null && purpleDigits !== null && killCount !== null &&
            normalDropRate !== null && dropBonus1 !== null && dropBonus17 !== null && dropBonus21 !== null &&
            dropBonus3 !== null && dropBonus12 !== null && blueShapeBonus !== null && purpleShapeBonus !== null &&
            killBonus !== null && normalDropBonus !== null;
        const afkBonus8 = this.upgrades[8].getBonus();
        const afkBonus13 = this.upgrades[13].getBonus();
        const multikillBonus = this.upgrades[6].getBonus();
        const baseMultikillBonus = this.upgrades[15].getBonus();
        const respawnBonus = this.upgrades[2].getBonus();

        const blueTargetBalance = this.blueShapeTargetId === null ? 0
            : this.blueShapeBalances[this.blueShapeTargetId];
        const blueTargetBonus = this.upgrades[9].getBonus();
        const blueTargetKnown = this.blueShapeTargetAvailable && blueTargetBonus !== null &&
            (this.blueShapeTargetId === null || blueTargetBalance !== null);
        const blueTargetUnlocked = blueTargetKnown && blueTargetBonus! > 0 &&
            this.blueShapeTargetId !== null && blueTargetBalance! >= 0.1;
        const purpleTargetBalance = this.purpleShapeTargetId === null ? 0
            : this.purpleShapeBalances[this.purpleShapeTargetId - 6];
        const purpleTargetBonus = this.upgrades[16].getBonus();
        const purpleTargetKnown = this.purpleShapeTargetAvailable && purpleTargetBonus !== null &&
            (this.purpleShapeTargetId === null || purpleTargetBalance !== null);
        const purpleTargetUnlocked = purpleTargetKnown && purpleTargetBonus! > 0 &&
            this.purpleShapeTargetId !== null && purpleTargetBalance! >= 0.1;

        return {
            appliesInCove,
            dropRateMultiplier: !appliesInCove ? 1 : dropRateAvailable
                ? (1 + (dropBonus1! + dropBonus17! + dropBonus21!) / 100)
                    * (1 + dropBonus3! / 100)
                    * (1 + dropBonus12! / 100)
                    * (1 + blueShapeBonus! * blueDigits! / 100)
                    * (1 + purpleShapeBonus! * purpleDigits! / 100)
                    * (1 + killBonus! * Math.ceil(inputs.gameLog(killCount!)) / 100)
                    * (1 + normalDropBonus! * Math.ceil(inputs.gameLog(normalDropRate!)) / 100)
                : null,
            afkGainMultiplier: !appliesInCove ? 0
                : afkBonus8 === null || afkBonus13 === null ? null : (10 + afkBonus8 + afkBonus13) / 100,
            multikillPerDamageTier: !appliesInCove ? 0
                : multikillBonus === null ? null : multikillBonus / 100,
            baseMultikill: !appliesInCove ? 0
                : baseMultikillBonus === null ? null : baseMultikillBonus / 100,
            respawnTimeMultiplier: !appliesInCove ? 1
                : respawnBonus === null || inputs.campUpgrade100Bonus === null ? null
                    : 1 / (1 + (respawnBonus + inputs.campUpgrade100Bonus) / 100),
            bluePickupTargetId: appliesInCove && blueTargetUnlocked ? this.blueShapeTargetId : null,
            bluePickupTargetKnown: !appliesInCove || blueTargetKnown,
            bluePickupAmount: !appliesInCove ? 0 : !blueTargetKnown ? null
                : blueTargetUnlocked ? blueTargetBonus : 0,
            purplePickupTargetId: appliesInCove && purpleTargetUnlocked ? this.purpleShapeTargetId : null,
            purplePickupTargetKnown: !appliesInCove || purpleTargetKnown,
            purplePickupAmount: !appliesInCove ? 0 : !purpleTargetKnown ? null
                : purpleTargetUnlocked ? purpleTargetBonus : 0,
            pickupRandomDoubleChance: appliesInCove
                ? inputs.campUpgrade101Bonus === null || inputs.campUpgrade103Bonus === null ||
                    inputs.campUpgrade105Bonus === null ? null : Math.min(
                    (inputs.campUpgrade101Bonus + inputs.campUpgrade103Bonus + inputs.campUpgrade105Bonus) / 100,
                    3
                )
                : 0
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
