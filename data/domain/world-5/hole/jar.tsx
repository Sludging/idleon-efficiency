import { lavaLog } from "../../../utility";
import { initHoleJarBonusRepo } from "../../data/HoleJarBonusRepo";
import { initHoleJarRepo } from "../../data/HoleJarRepo";
import { HoleJarBonusModel } from "../../model/holeJarBonusModel";
import { HoleJarModel } from "../../model/holeJarModel";

export interface JarBoardEntry {
    type: number;
    quality: number;
    x: number;
    y: number;
    randomRoll: number;
}

export interface JarProducer {
    index: number;
    type: number;
    work: number;
    requirement: number | null;
    quality: number | null;
    ratePerHour: number | null;
}

export interface JarPreparation {
    collectibleBonus: number | null;
    cavernCount: number | null;
    producerCount: number | null;
    productionUpgrade67: number | null;
    productionUpgrade74: number | null;
    productionUpgrade72: number | null;
    cavernLog: number | null;
}

export class JarBonus {
    level: number | null = null;
    legendTalentBonus: number = 1;

    constructor(public index: number, public data: HoleJarBonusModel) {}

    getBonus(): number | null {
        return this.level === null ? null : this.level * this.data.bonus * this.legendTalentBonus;
    }
}

export class JarType {
    unlocked: boolean | null = null;

    constructor(public index: number, public data: HoleJarModel) {}
}

export interface JarProducerAssignment {
    index: number;
    type: number | null;
    work: number | null;
}

export class Jar {
    jarTypes: JarType[] = [];
    jarBonuses: JarBonus[] = [];
    board: JarBoardEntry[] = [];
    boardAvailable: boolean = false;
    ownedTypeCount: number | null = null;
    holdings: (number | null)[] = Array(12).fill(null);
    requirementBalances: (number | null)[] = Array(10).fill(null);
    collectibleLevelsAvailable: boolean = false;
    preferredCollectibleTarget: number | null = null;
    producerAssignments: JarProducerAssignment[] = [];
    producers: JarProducer[] = [];
    gildedBonusPercent: number | null = null;
    nextTypeCost: number | null = null;

    constructor() {
        this.jarTypes = initHoleJarRepo().map(jar => new JarType(jar.index, jar.data));
        this.jarBonuses = initHoleJarBonusRepo().map(bonus => new JarBonus(bonus.index, bonus.data));
    }

    parse(holeData: (number[] | undefined)[], savedBoard: number[][] | null): void {
        const ownedCount = holeData[11]?.[37];
        this.ownedTypeCount = ownedCount == null ? null : Number(ownedCount);
        this.jarTypes.forEach(jar => {
            jar.unlocked = this.ownedTypeCount === null ? null : this.ownedTypeCount >= jar.index + 1;
        });

        const levels = holeData[24];
        this.jarBonuses.forEach(bonus => {
            bonus.level = levels?.[bonus.index] == null ? null : Number(levels[bonus.index]);
        });
        this.collectibleLevelsAvailable = levels !== undefined;
        const preferredTarget = holeData[11]?.[62];
        this.preferredCollectibleTarget = preferredTarget == null || Number(preferredTarget) < 0
            ? null : Number(preferredTarget);

        this.boardAvailable = savedBoard !== null;
        this.board = (savedBoard ?? []).slice(0, 120).filter(entry => entry?.length >= 5).map(entry => ({
            type: Number(entry[0]),
            quality: Number(entry[1]),
            x: Number(entry[2]),
            y: Number(entry[3]),
            randomRoll: Number(entry[4]),
        }));
        this.producerAssignments = Array.from({ length: 3 }, (_, index) => ({
            index,
            type: holeData[25]?.[index] == null ? null : Number(holeData[25]![index]),
            work: holeData[25]?.[index + 3] == null ? null : Number(holeData[25]![index + 3]),
        }));
        this.requirementBalances = Array.from({ length: 10 }, (_, index) => {
            const balance = holeData[11]?.[40 + index];
            return balance == null ? null : Number(balance);
        });
        const rupies = holeData[9];
        this.holdings = Array.from({ length: 12 }, (_, index) => {
            const value = index < 10 ? rupies?.[20 + index] : holeData[11]?.[38 + index - 10];
            return value == null ? null : Number(value);
        });
        this.producers = [];
        this.nextTypeCost = this.ownedTypeCount === null || this.ownedTypeCount >= 9 ? null
            : 50 * Math.pow(1 + this.ownedTypeCount, 1.5) * Math.pow(4.8, this.ownedTypeCount);
        const gildedBonusPercent = holeData[11]?.[60];
        this.gildedBonusPercent = gildedBonusPercent == null ? null : Number(gildedBonusPercent);
    }

    prepare(inputs: JarPreparation): void {
        const hasRateInputs = inputs.collectibleBonus !== null && inputs.productionUpgrade72 !== null
            && inputs.cavernLog !== null;
        const baseRate = hasRateInputs
            ? 36000 * (1 + inputs.collectibleBonus! / 100) *
                (1 + inputs.productionUpgrade72! * inputs.cavernLog! / 100)
            : null;
        const producerCount = inputs.producerCount;
        this.producers = [];
        if (producerCount !== null && inputs.cavernCount !== null && inputs.cavernCount >= 11) {
            this.producerAssignments.slice(0, producerCount).forEach(assignment => {
                const { type, work, index } = assignment;
                if (type === null || type < 0 || work === null) {
                    return;
                }

                const requirementBalance = this.requirementBalances[Math.max(0, type - 1)];
                const requirementLog = requirementBalance === null ? null : lavaLog(requirementBalance);
                const requirement = inputs.productionUpgrade67 === null || inputs.productionUpgrade74 === null
                    || requirementLog === null ? null
                    : (1000 + 2000 * type) /
                        ((1 + inputs.productionUpgrade67 / 100) *
                            (1 + inputs.productionUpgrade74 * requirementLog / 100));
                this.producers.push({
                    index,
                    type,
                    work,
                    requirement,
                    quality: requirement === null || requirement <= 0 ? null
                        : Math.floor(Math.log10(work / requirement)),
                    ratePerHour: baseRate,
                });
            });
        }
    }

    getBonus(index: number): number | null {
        const bonus = this.jarBonuses.find(bonus => bonus.index == index);

        if (bonus) {
            return bonus.getBonus();
        }

        return 0;
    }
}