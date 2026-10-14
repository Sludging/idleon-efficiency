export enum VillagerIndex {
    Polonai = 0,
    Kaipu = 1,
    Cosmo = 2,
    Minau = 3,
    Bolaia = 4,
}

export interface HoleContributor {
    source: string;
    owner: string;
    sourceIds?: string[];
    value: number | null;
    unit: "percent" | "multiplier" | "EXP/hour/Opal" | "progress/hour" | "count";
    combination: "base" | "additive" | "multiplicative" | "allocation";
    unavailableReason?: string | null;
}

export interface VillagerUnlock {
    kind: "cavern" | "schematic" | "majik-point" | "measurement" | "study-rate";
    requiredLevel: number | null;
    identities: number[];
    releasedMaximum: boolean;
}

export interface VillagerCharacterRate {
    playerId: number;
    playerName: string;
    expPerHour: number | null;
    unavailableReason: string | null;
    statueBonus: number | null;
    statueFactor: number | null;
    contributors: HoleContributor[];
    inputs: VillagerGrowthInputs | null;
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
    unavailableReason: string | null;
    earlyExplorerExpUpgrade: number | null;
    cosmoFountainPercent: number;
    bundleBonus: number | null;
    opalExp: number;
    jarPercent: number | null;
    collectibleUnavailableReason: string | null;
    compassUnavailableReason: string | null;
    legendUnavailableReason: string | null;
    tomeUnavailableReason: string | null;
    pristineUnavailableReason: string | null;
    farmingUnavailableReason: string | null;
    arcadeUnavailableReason: string | null;
    grimoireUnavailableReason: string | null;
    arcaneUnavailableReason: string | null;
    summoningUnavailableReason: string | null;
    vaultUnavailableReason: string | null;
    schematicUnavailableReason: string | null;
    fountainUnavailableReason: string | null;
    measurementUnavailableReason: string | null;
    bellUnavailableReason: string | null;
    contentedCreatorUnavailableReason: string | null;
    equalSpreadPercent: number | null;
    equalSpreadUnavailableReason: string | null;
    enthusiasmPerTen: number | null;
    villageMajikUnavailableReason: string | null;
    contentedCreator: number;
    enhancedMajik: number;
    bravery: number | null;
    justice: number | null;
    wisdom: number | null;
    monumentUnavailableReason: string | null;
    slabItemsMeasurement: number;
    gloomieSchematic: number;
    gloomieSchematicUnavailableReason: string | null;
    gloomieCardPercent: number | null;
    gloomieCardUnavailableReason: string | null;
    bell: number;
    tomeMeasurement: number;
}

export interface VillagerCharacterInput {
    playerId: number;
    playerName: string;
    statueBonus: number | null;
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
    saveAvailable: boolean = false;
    progressionAvailable: boolean = false;
    expAvailable: boolean = false;
    investmentAvailable: boolean = false;
    purchasedUpgradeAvailable: boolean = false;
    progressionUnavailableReason: string | null = null;
    releaseVersion: number | null = null;
    characterRates: VillagerCharacterRate[] = [];
    nextUnlock: VillagerUnlock | null = null;
    unlockUnavailableReason: string | null = null;

    constructor(public index: VillagerIndex, public name: string, public title: string) { }

    parse(holeData: number[][], releaseVersion: number | null): void {
        this.saveAvailable = holeData[1]?.[this.index] != null;
        this.expAvailable = holeData[2]?.[this.index] != null;
        this.investmentAvailable = holeData[3]?.[this.index] != null;
        this.purchasedUpgradeAvailable = holeData[23]?.[this.index] != null;
        this.progressionAvailable = this.saveAvailable && this.expAvailable
            && this.investmentAvailable && this.purchasedUpgradeAvailable;
        this.progressionUnavailableReason = this.progressionAvailable ? null : "Saved villager progression is missing.";
        this.level = Number(holeData[1]?.[this.index] ?? 0);
        this.currentExp = Number(holeData[2]?.[this.index] ?? 0);
        this.opals = Number(holeData[3]?.[this.index] ?? 0);
        this.purchasedExpUpgrade = Number(holeData[23]?.[this.index] ?? 0);
        this.gemshopUpgrade = this.purchasedExpUpgrade === 1;
        this.releaseVersion = releaseVersion;
        this.characterRates = [];
        this.nextUnlock = null;
        this.unlockUnavailableReason = this.saveAvailable ? null : "Saved villager level is missing.";
    }

    get rescued(): boolean | null {
        return this.saveAvailable ? this.level >= 1 : null;
    }

    getExpRequirement(): number | null {
        if (!this.saveAvailable) return null;
        const level = this.level;
        switch (this.index) {
            case VillagerIndex.Polonai: {
                if (level === 1) return 5;
                if (this.releaseVersion === null) return null;
                const releaseMultiplier = Math.min(1, Math.max(0, Math.floor((100000 + this.releaseVersion) / 100247.3)));
                return 10 * ((10 + 7 * Math.pow(level, 2.1)) * Math.pow(2.1, level)
                    * (1 + 0.75 * Math.max(0, level - 4))
                    * Math.pow(3.4, releaseMultiplier * Math.max(0, level - 12)) - 1.5);
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

    get requirementUnavailableReason(): string | null {
        if (!this.saveAvailable) return "Saved villager level is missing.";
        if (this.index === VillagerIndex.Polonai && this.level !== 1 && this.releaseVersion === null) {
            return "Saved content-version marker is missing.";
        }
        return null;
    }

    get claimReady(): boolean | null {
        if (!this.expAvailable || !this.saveAvailable) return null;
        const requirement = this.getExpRequirement();
        return requirement === null ? null : this.rescued === true && this.currentExp >= requirement;
    }

    prepareNextUnlock(schematicAvailabilityOrder: number[], measurementCount: number, cavernCount: number): void {
        this.nextUnlock = null;
        if (!this.saveAvailable) return;
        const requiredLevel = Math.max(1, this.level + 1);
        switch (this.index) {
            case VillagerIndex.Polonai:
                this.nextUnlock = {
                    kind: "cavern", requiredLevel: this.level < cavernCount ? requiredLevel : null,
                    identities: this.level < cavernCount ? [requiredLevel - 1] : [],
                    releasedMaximum: this.level >= cavernCount,
                };
                break;
            case VillagerIndex.Kaipu: {
                const available = Math.min(105, 1 + 3 * this.level + Math.floor(this.level / 5), schematicAvailabilityOrder.length);
                const nextAvailable = Math.min(105, 1 + 3 * requiredLevel + Math.floor(requiredLevel / 5), schematicAvailabilityOrder.length);
                this.nextUnlock = {
                    kind: "schematic", requiredLevel: available < 105 && available < schematicAvailabilityOrder.length ? requiredLevel : null,
                    identities: schematicAvailabilityOrder.slice(available, nextAvailable),
                    releasedMaximum: available === Math.min(105, schematicAvailabilityOrder.length),
                };
                break;
            }
            case VillagerIndex.Cosmo:
                this.nextUnlock = { kind: "majik-point", requiredLevel, identities: [], releasedMaximum: false };
                break;
            case VillagerIndex.Minau:
                this.nextUnlock = { kind: "measurement", requiredLevel: this.level < measurementCount ? requiredLevel : null,
                    identities: this.level < measurementCount ? [requiredLevel - 1] : [], releasedMaximum: this.level >= measurementCount };
                break;
            case VillagerIndex.Bolaia:
                this.nextUnlock = { kind: "study-rate", requiredLevel, identities: [], releasedMaximum: false };
                break;
        }
    }

    prepareCharacterRates(contexts: VillagerCharacterInput[], inputs: VillagerSharedGrowthInputs): void {
        let roleMultiplier = 1;
        let roleReason: string | null = null;
        if (this.index === VillagerIndex.Polonai) {
            if (!this.saveAvailable) roleReason = "Saved cavern access is missing.";
            else if (Math.min(18, this.level) < 13) {
                if (inputs.earlyExplorerExpUpgrade === null) roleReason = "Saved early Explorer EXP upgrade is missing.";
                else roleMultiplier = Math.pow(1.5, inputs.earlyExplorerExpUpgrade);
            }
        } else if (this.index === VillagerIndex.Cosmo) {
            roleReason = inputs.fountainUnavailableReason;
            if (roleReason === null) roleMultiplier = 1 + inputs.cosmoFountainPercent / 100;
        }

        const enthusiasm = !this.investmentAvailable || inputs.enthusiasmPerTen === null
            ? null : Math.floor(this.opals / 10) * inputs.enthusiasmPerTen;
        const enthusiasmReason = !this.investmentAvailable ? "Saved Opal investment is missing."
            : inputs.villageMajikUnavailableReason;
        const additiveBonus = (inputs.bravery ?? 0) + ((inputs.justice ?? 0) + (inputs.wisdom ?? 0) + (inputs.slabItemsMeasurement
            + ((enthusiasm ?? 0) + (inputs.contentedCreator + (inputs.enhancedMajik + (inputs.gloomieSchematic
            + ((inputs.gloomieCardPercent ?? 0) + (inputs.bell + (inputs.tomeMeasurement
            + (inputs.summoningPercent + inputs.vaultPercent))))))))));
        const sharedContributors: HoleContributor[] = [
            { source: "EXP per invested Opal", owner: "schematic:0",
                value: inputs.schematicUnavailableReason === null ? inputs.opalExp : null,
                unit: "EXP/hour/Opal", combination: "base", unavailableReason: inputs.schematicUnavailableReason },
            { source: "Invested Opals", owner: `villager:${this.index}`,
                value: this.investmentAvailable ? this.opals : null, unit: "count", combination: "allocation",
                unavailableReason: this.investmentAvailable ? null : "Saved Opal investment is missing." },
            { source: "Role multiplier", owner: `villager:${this.index}`,
                value: roleReason === null ? roleMultiplier : null, unit: "multiplier", combination: "multiplicative",
                unavailableReason: roleReason },
            { source: "Purchased EXP multiplier", owner: "gems",
                value: this.purchasedUpgradeAvailable ? 1 + this.purchasedExpUpgrade : null,
                unit: "multiplier", combination: "multiplicative",
                unavailableReason: this.purchasedUpgradeAvailable ? null : "Saved purchased EXP upgrade is missing." },
            { source: "Compass Villager EXP", owner: "compass:59",
                value: inputs.compassUnavailableReason === null ? inputs.compassPercent : null,
                unit: "percent", combination: "multiplicative", unavailableReason: inputs.compassUnavailableReason },
            { source: "Legend Villager EXP", owner: "legendTalents:12",
                value: inputs.legendUnavailableReason === null ? inputs.legendPercent : null,
                unit: "percent", combination: "multiplicative", unavailableReason: inputs.legendUnavailableReason },
            { source: "Pristine Villager EXP", owner: "sneaking:21",
                value: inputs.pristineUnavailableReason === null ? inputs.pristinePercent : null,
                unit: "percent", combination: "multiplicative", unavailableReason: inputs.pristineUnavailableReason },
            { source: "Companion Villager EXP", owner: "companions:13", value: 1 + 2 * inputs.companionBonus, unit: "multiplier", combination: "multiplicative" },
            { source: "Collectible Villager EXP", owner: "cavern:10",
                sourceIds: [4, 10, 12, 22, 29, 35].map(index => `jar-collectible:${index}`),
                value: inputs.jarPercent, unit: "percent", combination: "multiplicative",
                unavailableReason: inputs.collectibleUnavailableReason },
            { source: "Event Shop Villager EXP", owner: "eventShop:6", value: 25 * Number(inputs.eventShopOwned), unit: "percent", combination: "multiplicative" },
            { source: "Tome epilogue Villager EXP", owner: "tome:epilogue:1",
                value: inputs.tomeUnavailableReason === null ? inputs.lorePercent : null,
                unit: "percent", combination: "multiplicative", unavailableReason: inputs.tomeUnavailableReason },
            { source: "Villager bundle", owner: "gems:bundle", value: inputs.bundleBonus === null ? null : 50 * inputs.bundleBonus,
                unit: "percent", combination: "multiplicative",
                unavailableReason: inputs.bundleBonus === null ? "Saved bundle ownership is missing." : null },
            { source: "Exotic Market Villager EXP", owner: "farming:51",
                value: inputs.farmingUnavailableReason === null ? inputs.exoticPercent : null,
                unit: "percent", combination: "multiplicative", unavailableReason: inputs.farmingUnavailableReason },
            { source: "Arcade Villager EXP", owner: "arcade:38",
                value: inputs.arcadeUnavailableReason === null ? inputs.arcadePercent : null,
                unit: "percent", combination: "multiplicative", unavailableReason: inputs.arcadeUnavailableReason },
            { source: "Grimoire Villager EXP", owner: "grimoire:29",
                value: inputs.grimoireUnavailableReason === null ? inputs.grimoirePercent : null,
                unit: "percent", combination: "multiplicative", unavailableReason: inputs.grimoireUnavailableReason },
            { source: "Arcane Villager EXP", owner: "tesseract:32",
                value: inputs.arcaneUnavailableReason === null ? inputs.arcanePercent : null,
                unit: "percent", combination: "multiplicative", unavailableReason: inputs.arcaneUnavailableReason },
            { source: "Equal Spread", owner: "majik:14", value: inputs.equalSpreadPercent, unit: "percent", combination: "allocation",
                unavailableReason: inputs.equalSpreadUnavailableReason },
            { source: "Bravery Villager EXP", owner: "cavern:3", value: inputs.bravery, unit: "percent", combination: "additive",
                unavailableReason: inputs.monumentUnavailableReason },
            { source: "Justice Villager EXP", owner: "cavern:9", value: inputs.justice, unit: "percent", combination: "additive",
                unavailableReason: inputs.monumentUnavailableReason },
            { source: "Wisdom Villager EXP", owner: "cavern:12", value: inputs.wisdom, unit: "percent", combination: "additive",
                unavailableReason: inputs.monumentUnavailableReason },
            { source: "Slab items Measurement", owner: "measurement:7",
                value: inputs.measurementUnavailableReason === null ? inputs.slabItemsMeasurement : null,
                unit: "percent", combination: "additive", unavailableReason: inputs.measurementUnavailableReason },
            { source: "Opal Enthusiasm", owner: "majik:9", value: enthusiasm, unit: "percent", combination: "allocation",
                unavailableReason: enthusiasmReason },
            { source: "Contented Creator", owner: "majik:10",
                value: inputs.contentedCreatorUnavailableReason === null ? inputs.contentedCreator : null,
                unit: "percent", combination: "additive", unavailableReason: inputs.contentedCreatorUnavailableReason },
            { source: "Cosmo, Enhance!", owner: "majik:11",
                value: inputs.villageMajikUnavailableReason === null ? inputs.enhancedMajik : null,
                unit: "percent", combination: "additive", unavailableReason: inputs.villageMajikUnavailableReason },
            { source: "Gloomie colony schematic", owner: "schematic:48",
                value: inputs.gloomieSchematicUnavailableReason === null ? inputs.gloomieSchematic : null,
                unit: "percent", combination: "additive", unavailableReason: inputs.gloomieSchematicUnavailableReason },
            { source: "Gloomie card", owner: "cards:caveB", value: inputs.gloomieCardPercent, unit: "percent", combination: "additive",
                unavailableReason: inputs.gloomieCardUnavailableReason },
            { source: "Bell Villager EXP", owner: "cavern:4",
                value: inputs.bellUnavailableReason === null ? inputs.bell : null,
                unit: "percent", combination: "additive", unavailableReason: inputs.bellUnavailableReason },
            { source: "Tome score Measurement", owner: "measurement:0",
                value: inputs.measurementUnavailableReason === null ? inputs.tomeMeasurement : null,
                unit: "percent", combination: "additive", unavailableReason: inputs.measurementUnavailableReason },
            { source: "Summoning Villager EXP", owner: "summoning:21",
                value: inputs.summoningUnavailableReason === null ? inputs.summoningPercent : null,
                unit: "percent", combination: "additive", unavailableReason: inputs.summoningUnavailableReason },
            { source: "Vault Villager EXP", owner: "upgradeVault:73",
                value: inputs.vaultUnavailableReason === null ? inputs.vaultPercent : null,
                unit: "percent", combination: "additive", unavailableReason: inputs.vaultUnavailableReason },
        ];
        this.characterRates = contexts.map(context => {
            const reason = !this.saveAvailable || !this.investmentAvailable || !this.purchasedUpgradeAvailable
                ? "Saved villager growth inputs are missing."
                : inputs.unavailableReason ?? roleReason
                    ?? (inputs.bundleBonus === null ? "Saved bundle ownership is missing." : null)
                    ?? inputs.equalSpreadUnavailableReason
                    ?? inputs.monumentUnavailableReason
                    ?? inputs.gloomieSchematicUnavailableReason
                    ?? (context.statueBonus === null ? "Saved Villager Statue state is missing for this character." : null);
            const accountMultiplier = (1 + inputs.compassPercent / 100) * (1 + inputs.legendPercent / 100)
                * (1 + inputs.pristinePercent / 100) * (1 + 2 * inputs.companionBonus)
                * (1 + (context.statueBonus ?? 0) / 100) * (1 + (inputs.jarPercent ?? 0) / 100)
                * (1 + 25 * Number(inputs.eventShopOwned) / 100) * (1 + inputs.lorePercent / 100)
                * (1 + 50 * (inputs.bundleBonus ?? 0) / 100);
            const growth: VillagerGrowthInputs | null = reason === null ? {
                roleMultiplier, opalExp: inputs.opalExp, accountMultiplier, exoticBonus: inputs.exoticPercent,
                arcadeBonus: inputs.arcadePercent, grimoireBonus: inputs.grimoirePercent,
                arcaneBonus: inputs.arcanePercent, equalSpreadBonus: inputs.equalSpreadPercent!, additiveBonus,
            } : null;
            const contributors: HoleContributor[] = [...sharedContributors, {
                source: "Villager Statue", owner: `statues:${context.playerId}:28`, value: context.statueBonus,
                unit: "percent", combination: "multiplicative",
                unavailableReason: context.statueBonus === null ? "Saved Villager Statue state is missing for this character." : null,
            }];
            return {
                ...context, inputs: growth, expPerHour: growth === null ? null : this.calculateExpRate(growth),
                unavailableReason: reason,
                statueFactor: context.statueBonus === null ? null : 1 + context.statueBonus / 100,
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
