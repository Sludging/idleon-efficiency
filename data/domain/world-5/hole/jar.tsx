import { commaNotation, lavaLog, notateNumber } from "../../../utility";
import { initHoleJarBonusRepo } from "../../data/HoleJarBonusRepo";
import { initHoleJarRepo } from "../../data/HoleJarRepo";
import { HoleJarBonusModel } from "../../model/holeJarBonusModel";
import { HoleJarModel } from "../../model/holeJarModel";
import { ImageData } from "../../imageData";
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
    requirement: number;
    quality: number;
    ratePerHour: number;
}

export interface JarPreparation {
    collectibleBonus: number;
    cavernCount: number;
    producerCount: number;
    productionUpgrade67: number;
    productionUpgrade74: number;
    productionUpgrade72: number;
    cavernLog: number;
}

export class JarBonus {
    level: number = 0;
    legendTalentBonus: number = 1;
    imageData: ImageData;

    constructor(public index: number, public data: HoleJarBonusModel) {
        this.imageData = { location: `HoleJarC${index}`, width: 41, height: 41 };
    }

    getImageData(): ImageData {
        return this.imageData;
    }

    getUnit(): "percent" | "multiplier" | null {
        if (this.data.description.includes("{")) {
            return "percent";
        }
        if (this.data.description.includes("}")) {
            return "multiplier";
        }
        return null;
    }


    getDescription(): string {
        return this.getDescriptionForBonus(this.getBonus());
    }

    getFirstDiscoveryDescription(): string {
        return this.getDescriptionForBonus(this.getFirstDiscoveryBonus());
    }

    getFirstDiscoveryBonus(): number {
        return this.data.bonus * this.legendTalentBonus;
    }

    private getDescriptionForBonus(bonus: number): string {
        const percent = commaNotation(Math.round(bonus));
        const multiplier = notateNumber(1 + bonus / 100, "MultiplierInfo").replace(/#/g, "");
        return this.data.description
            .replace(/\{%/g, `${percent}%`)
            .replace(/\}x/g, `${multiplier}×`)
            .replace(/_/g, " ")
            .replace(/\s*@\s*/g, "\n")
            .replace(/[ \t]+/g, " ")
            .replace(/ *\n */g, "\n")
            .trim();
    }

    getBonus(): number {
        return this.level * this.data.bonus * this.legendTalentBonus;
    }
}

export class JarType {
    unlocked: boolean = false;
    jarsPerHour: number = 0;
    imageData: ImageData;

    constructor(public index: number, public data: HoleJarModel) {
        this.imageData = { location: `HoleJar${index}`, width: 67, height: 71 };
    }

    getImageData(): ImageData {
        return this.imageData;
    }

    getDescription(): string {
        return this.data.description.replace(/\{%/g, "").replace(/_/g, " ").replace(/\s+/g, " ");
    }
}

export interface JarProducerAssignment {
    index: number;
    type: number | null;
    work: number;
}

export class Jar {
    jarTypes: JarType[] = [];
    jarBonuses: JarBonus[] = [];
    board: JarBoardEntry[] = [];
    ownedTypeCount: number = 0;
    holdings: number[] = Array(12).fill(0);
    readonly holdingImages: ImageData[] = Array.from({ length: 12 }, (_, index) => ({
        location: `HoleJarR${index}`,
        width: 25,
        height: 25,
    }));
    preferredCollectibleTarget: number | null = null;
    producerAssignments: JarProducerAssignment[] = [];
    producers: JarProducer[] = [];
    requirementBalances: number[] = Array(10).fill(0);
    gildedBonusPercent: number = 0;
    nextTypeCost: number | null = null;

    constructor() {
        this.jarTypes = initHoleJarRepo().map(jar => new JarType(jar.index, jar.data));
        this.jarBonuses = initHoleJarBonusRepo().map(bonus => new JarBonus(bonus.index, bonus.data));
    }

    parse(holeData: (number[] | undefined)[], savedBoard: number[][] | null): void {
        this.ownedTypeCount = Number(holeData[11]?.[37] ?? 0);
        this.jarTypes.forEach(jar => {
            jar.unlocked = this.ownedTypeCount >= jar.index;
        });

        this.jarBonuses.forEach(bonus => {
            bonus.level = Number(holeData[24]?.[bonus.index] ?? 0);
        });
        const preferredTarget = Number(holeData[11]?.[62] ?? -1);
        this.preferredCollectibleTarget = preferredTarget < 0 ? null : preferredTarget;

        this.board = (savedBoard ?? []).slice(0, 120).filter(entry => entry?.length >= 5).map(entry => ({
            type: Number(entry[0]),
            quality: Number(entry[1]),
            x: Number(entry[2]),
            y: Number(entry[3]),
            randomRoll: Number(entry[4]),
        }));
        const producerData = holeData[25] ?? [];
        this.producerAssignments = Array.from({ length: 3 }, (_, index) => ({
            index,
            type: producerData[index] == null ? null : Number(producerData[index]),
            work: Number(producerData[index + 3] ?? 0),
        }));
        this.requirementBalances = Array.from({ length: 10 }, (_, index) =>
            Number(holeData[11]?.[40 + index] ?? 0));
        this.holdings = Array.from({ length: 12 }, (_, index) => {
            const value = index < 10 ? holeData[9]?.[20 + index] : holeData[11]?.[38 + index - 10];
            return Number(value ?? 0);
        });
        this.producers = [];
        this.nextTypeCost = this.ownedTypeCount >= 9 ? null
            : 50 * Math.pow(1 + this.ownedTypeCount, 1.5) * Math.pow(4.8, this.ownedTypeCount);
        this.gildedBonusPercent = Number(holeData[11]?.[60] ?? 0);
    }

    prepare(inputs: JarPreparation): void {
        const baseRate = 36000 * (1 + inputs.collectibleBonus / 100) *
            (1 + inputs.productionUpgrade72 * inputs.cavernLog / 100);
        this.producers = [];
        this.jarTypes.forEach(jarType => {
            jarType.jarsPerHour = 0;
        });

        if (inputs.cavernCount < 11) {
            return;
        }

        this.producerAssignments.slice(0, inputs.producerCount).forEach(assignment => {
            const { type, work, index } = assignment;
            if (type === null || type < 0 || type >= this.jarTypes.length) {
                return;
            }

            const requirementBalance = this.requirementBalances[Math.max(0, type - 1)];
            const requirementLog = lavaLog(requirementBalance);
            const requirement = (1000 + 2000 * type) /
                ((1 + inputs.productionUpgrade67 / 100) *
                    (1 + inputs.productionUpgrade74 * requirementLog / 100));
            this.producers.push({
                index,
                type,
                work,
                requirement,
                quality: Math.floor(Math.log10(work / requirement)),
                ratePerHour: baseRate,
            });

            const jarType = this.jarTypes[type];
            jarType.jarsPerHour += baseRate / requirement;
        });
    }

    getHoldingImageData(index: number): ImageData | null {
        return this.holdingImages[index] ?? null;
    }

    getBonus(index: number): number | null {
        const bonus = this.jarBonuses.find(bonus => bonus.index == index);
        return bonus?.getBonus() ?? null;
    }
}
