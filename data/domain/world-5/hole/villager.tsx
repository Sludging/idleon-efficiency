export enum VillagerIndex {
    Polonai = 0,
    Kaipu = 1,
    Cosmo = 2,
    Minau = 3,
    Bolaia = 4,
}

export const MAX_KAIPU_SCHEMATIC_SLOTS = 105;

export interface HoleContributor {
    source: string;
    owner: string;
    sourceIds?: string[];
    value: number;
    unit: "percent" | "multiplier" | "EXP/hour/Opal" | "progress/hour" | "count";
    combination: "base" | "additive" | "multiplicative" | "allocation";
}

export interface VillagerUnlock {
    kind: "cavern" | "schematic" | "majik-point" | "measurement" | "study-rate";
    requiredLevel: number;
    identities: number[];
    atMaximum: boolean;
}


export interface VillagerCharacterRate {
    playerId: number;
    playerName: string;
    expPerHour: number;
    statueBonus: number;
    statueFactor: number;
    contributors: HoleContributor[];
    inputs: VillagerGrowthInputs;
}

export interface VillagerGrowthInputs {
    roleMultiplier: number;
    opalExp: number;
    accountMultiplier: number;
    exoticBonus: number;
    arcadeBonus: number;
    grimoireBonus: number;
    arcaneBonus: number;
    equalSpreadBonus: number;
    additiveBonus: number;
}

export interface VillagerAccountGrowthInputs {
    compassPercent: number;
    legendPercent: number;
    pristinePercent: number;
    companionBonus: number;
    eventShopOwned: boolean;
    lorePercent: number;
    exoticPercent: number;
    arcadePercent: number;
    grimoirePercent: number;
    arcanePercent: number;
    gloomieCardLevel: number;
    summoningPercent: number;
    vaultPercent: number;
}

export interface VillagerSharedGrowthInputs extends VillagerAccountGrowthInputs {
    earlyExplorerExpUpgrade: number;
    cosmoFountainPercent: number;
    bundleBonus: number;
    opalExp: number;
    jarPercent: number;
    equalSpreadPercent: number;
    enthusiasmPerTen: number;
    contentedCreator: number;
    enhancedMajik: number;
    bravery: number;
    justice: number;
    wisdom: number;
    slabItemsMeasurement: number;
    gloomieSchematic: number;
    gloomieCardPercent: number;
    bell: number;
    tomeMeasurement: number;
}

export interface VillagerCharacterInput {
    playerId: number;
    playerName: string;
    statueBonus: number;
}

const villagerMetadata = [
    { name: "Polonai", title: "Explorer of the Hole" },
    { name: "Kaipu", title: "Engineer of Schematics" },
    { name: "Cosmo", title: "Conjuror of bonuses" },
    { name: "Minau", title: "Taker of Measurements" },
    { name: "Bolaia", title: "Student of Cavern Lore" },
];

export class Villager {
    level: number = 0;
    currentExp: number = 0;
    opals: number = 0;
    gemshopUpgrade: boolean = false;
    purchasedExpUpgrade: number = 0;
    characterRates: VillagerCharacterRate[] = [];
    declare nextUnlock: VillagerUnlock;

    constructor(public index: VillagerIndex, public name: string, public title: string) { }

    parse(holeData: number[][]): void {
        this.level = Number(holeData[1]?.[this.index] ?? 0);
        this.currentExp = Number(holeData[2]?.[this.index] ?? 0);
        this.opals = Number(holeData[3]?.[this.index] ?? 0);
        this.purchasedExpUpgrade = Number(holeData[23]?.[this.index] ?? 0);
        this.gemshopUpgrade = this.purchasedExpUpgrade === 1;
        this.characterRates = [];
    }

    get rescued(): boolean {
        return this.level >= 1;
    }
    get claimReady(): boolean {
        return this.rescued && this.currentExp >= this.getExpRequirement();
    }

    getExpRequirement(): number {
        const level = this.level;
        switch (this.index) {
            case VillagerIndex.Polonai: {
                if (level === 1) return 5;
                return 10 * ((10 + 7 * Math.pow(level, 2.1)) * Math.pow(2.1, level)
                    * (1 + 0.75 * Math.max(0, level - 4))
                    * Math.pow(3.4, Math.max(0, level - 12)) - 1.5);
            }
            case VillagerIndex.Kaipu:
                return 30 * (10 + 6 * Math.pow(level, 1.8)) * Math.pow(1.57, level);
            case VillagerIndex.Cosmo:
                return 50 * (10 + 5 * Math.pow(level, 1.7)) * Math.pow(1.4, level);
            case VillagerIndex.Minau:
                return 120 * (30 + 10 * Math.pow(level, 2)) * Math.pow(2, level);
            case VillagerIndex.Bolaia:
                return 500 * (10 + 5 * Math.pow(level, 1.3)) * Math.pow(1.13, level);
        }
    }
    prepareNextUnlock(schematicOrder: number[], measurementCount: number, cavernCount: number): void {
        const requiredLevel = Math.max(1, this.level + 1);
        switch (this.index) {
            case VillagerIndex.Polonai: {
                const atMaximum = this.level >= cavernCount;
                this.nextUnlock = {
                    kind: "cavern", requiredLevel, identities: atMaximum ? [] : [requiredLevel - 1], atMaximum,
                };
                break;
            }
            case VillagerIndex.Kaipu: {
                const schematicLimit = Math.min(MAX_KAIPU_SCHEMATIC_SLOTS, schematicOrder.length);
                const currentCount = Math.min(schematicLimit, 1 + 3 * this.level + Math.floor(this.level / 5));
                const nextCount = Math.min(schematicLimit, 1 + 3 * requiredLevel + Math.floor(requiredLevel / 5));
                const atMaximum = currentCount >= schematicLimit;
                this.nextUnlock = {
                    kind: "schematic", requiredLevel,
                    identities: atMaximum ? [] : schematicOrder.slice(currentCount, nextCount),
                    atMaximum,
                };
                break;
            }
            case VillagerIndex.Cosmo:
                this.nextUnlock = { kind: "majik-point", requiredLevel, identities: [], atMaximum: false };
                break;
            case VillagerIndex.Minau: {
                const atMaximum = this.level >= measurementCount;
                this.nextUnlock = {
                    kind: "measurement", requiredLevel, identities: atMaximum ? [] : [requiredLevel - 1], atMaximum,
                };
                break;
            }
            case VillagerIndex.Bolaia:
                this.nextUnlock = { kind: "study-rate", requiredLevel, identities: [], atMaximum: false };
                break;
        }
    }

    prepareCharacterRates(contexts: VillagerCharacterInput[], inputs: VillagerSharedGrowthInputs): void {
        let roleMultiplier = 1;
        if (this.index === VillagerIndex.Polonai && Math.min(18, this.level) < 13) {
            roleMultiplier = Math.pow(1.5, inputs.earlyExplorerExpUpgrade);
        } else if (this.index === VillagerIndex.Cosmo) {
            roleMultiplier = 1 + inputs.cosmoFountainPercent / 100;
        }

        const enthusiasm = Math.floor(this.opals / 10) * inputs.enthusiasmPerTen;
        const additiveBonus = inputs.bravery + inputs.justice + inputs.wisdom + inputs.slabItemsMeasurement
            + enthusiasm + inputs.contentedCreator + inputs.enhancedMajik + inputs.gloomieSchematic
            + inputs.gloomieCardPercent + inputs.bell + inputs.tomeMeasurement
            + inputs.summoningPercent + inputs.vaultPercent;
        const sharedContributors: HoleContributor[] = [
            { source: "EXP per invested Opal", owner: "schematic:0",
                value: inputs.opalExp, unit: "EXP/hour/Opal", combination: "base" },
            { source: "Invested Opals", owner: `villager:${this.index}`,
                value: this.opals, unit: "count", combination: "allocation" },
            { source: "Role multiplier", owner: `villager:${this.index}`,
                value: roleMultiplier, unit: "multiplier", combination: "multiplicative" },
            { source: "Purchased EXP multiplier", owner: "gems",
                value: 1 + this.purchasedExpUpgrade, unit: "multiplier", combination: "multiplicative" },
            { source: "Compass Villager EXP", owner: "compass:59",
                value: inputs.compassPercent, unit: "percent", combination: "multiplicative" },
            { source: "Legend Villager EXP", owner: "legendTalents:12",
                value: inputs.legendPercent, unit: "percent", combination: "multiplicative" },
            { source: "Pristine Villager EXP", owner: "sneaking:21",
                value: inputs.pristinePercent, unit: "percent", combination: "multiplicative" },
            { source: "Companion Villager EXP", owner: "companions:13",
                value: 1 + 2 * inputs.companionBonus, unit: "multiplier", combination: "multiplicative" },
            { source: "Collectible Villager EXP", owner: "cavern:10",
                sourceIds: [4, 10, 12, 22, 29, 35].map(index => `jar-collectible:${index}`),
                value: inputs.jarPercent, unit: "percent", combination: "multiplicative" },
            { source: "Event Shop Villager EXP", owner: "eventShop:6",
                value: 25 * Number(inputs.eventShopOwned), unit: "percent", combination: "multiplicative" },
            { source: "Tome epilogue Villager EXP", owner: "tome:epilogue:1",
                value: inputs.lorePercent, unit: "percent", combination: "multiplicative" },
            { source: "Villager bundle", owner: "gems:bundle",
                value: 50 * inputs.bundleBonus, unit: "percent", combination: "multiplicative" },
            { source: "Exotic Market Villager EXP", owner: "farming:51",
                value: inputs.exoticPercent, unit: "percent", combination: "multiplicative" },
            { source: "Arcade Villager EXP", owner: "arcade:38",
                value: inputs.arcadePercent, unit: "percent", combination: "multiplicative" },
            { source: "Grimoire Villager EXP", owner: "grimoire:29",
                value: inputs.grimoirePercent, unit: "percent", combination: "multiplicative" },
            { source: "Arcane Villager EXP", owner: "tesseract:32",
                value: inputs.arcanePercent, unit: "percent", combination: "multiplicative" },
            { source: "Equal Spread", owner: "majik:14",
                value: inputs.equalSpreadPercent, unit: "percent", combination: "allocation" },
            { source: "Bravery Villager EXP", owner: "cavern:3", value: inputs.bravery, unit: "percent", combination: "additive" },
            { source: "Justice Villager EXP", owner: "cavern:9", value: inputs.justice, unit: "percent", combination: "additive" },
            { source: "Wisdom Villager EXP", owner: "cavern:12", value: inputs.wisdom, unit: "percent", combination: "additive" },
            { source: "Slab items Measurement", owner: "measurement:7",
                value: inputs.slabItemsMeasurement, unit: "percent", combination: "additive" },
            { source: "Opal Enthusiasm", owner: "majik:9", value: enthusiasm, unit: "percent", combination: "allocation" },
            { source: "Contented Creator", owner: "majik:10",
                value: inputs.contentedCreator, unit: "percent", combination: "additive" },
            { source: "Cosmo, Enhance!", owner: "majik:11",
                value: inputs.enhancedMajik, unit: "percent", combination: "additive" },
            { source: "Gloomie colony schematic", owner: "schematic:48",
                value: inputs.gloomieSchematic, unit: "percent", combination: "additive" },
            { source: "Gloomie card", owner: "cards:caveB",
                value: inputs.gloomieCardPercent, unit: "percent", combination: "additive" },
            { source: "Bell Villager EXP", owner: "cavern:4", value: inputs.bell, unit: "percent", combination: "additive" },
            { source: "Tome score Measurement", owner: "measurement:0",
                value: inputs.tomeMeasurement, unit: "percent", combination: "additive" },
            { source: "Summoning Villager EXP", owner: "summoning:21",
                value: inputs.summoningPercent, unit: "percent", combination: "additive" },
            { source: "Vault Villager EXP", owner: "upgradeVault:73",
                value: inputs.vaultPercent, unit: "percent", combination: "additive" },
        ];
        this.characterRates = contexts.map(context => {
            const accountMultiplier = (1 + inputs.compassPercent / 100) * (1 + inputs.legendPercent / 100)
                * (1 + inputs.pristinePercent / 100) * (1 + 2 * inputs.companionBonus)
                * (1 + context.statueBonus / 100) * (1 + inputs.jarPercent / 100)
                * (1 + 25 * Number(inputs.eventShopOwned) / 100) * (1 + inputs.lorePercent / 100)
                * (1 + 50 * inputs.bundleBonus / 100);
            const growth: VillagerGrowthInputs = {
                roleMultiplier, opalExp: inputs.opalExp, accountMultiplier, exoticBonus: inputs.exoticPercent,
                arcadeBonus: inputs.arcadePercent, grimoireBonus: inputs.grimoirePercent,
                arcaneBonus: inputs.arcanePercent, equalSpreadBonus: inputs.equalSpreadPercent, additiveBonus,
            };
            const contributors: HoleContributor[] = [...sharedContributors, {
                source: "Villager Statue", owner: `statues:${context.playerId}:28`, value: context.statueBonus,
                unit: "percent", combination: "multiplicative",
            }];
            return {
                ...context, inputs: growth, expPerHour: this.calculateExpRate(growth),
                statueFactor: 1 + context.statueBonus / 100,
                contributors,
            };
        });
    }

    calculateExpRate(inputs: VillagerGrowthInputs): number {
        return Math.max(1, inputs.roleMultiplier) * inputs.opalExp * Math.max(1, inputs.accountMultiplier)
            * this.opals * (1 + this.purchasedExpUpgrade)
            * (1 + inputs.exoticBonus / 100) * (1 + inputs.arcadeBonus / 100)
            * (1 + inputs.grimoireBonus / 100) * (1 + inputs.arcaneBonus / 100)
            * (1 + inputs.equalSpreadBonus / 100) * (1 + inputs.additiveBonus / 100);
    }
}

export class Villagers {
    static getVillagers(): Villager[] {
        return villagerMetadata.map((metadata, index) => new Villager(index, metadata.name, metadata.title));
    }
}
