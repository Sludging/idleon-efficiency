import { Domain, RawData } from "../base/domain";
import { SkillsIndex } from "../SkillsIndex";
import { Item } from "../items";
import { initGamingBoxRepo } from "../data/GamingBoxRepo";
import { initGamingImportRepo } from "../data/GamingImportRepo";
import { initGamingMetadataRepo } from "../data/GamingMetadataRepo";
import { initGamingPaletteRepo } from "../data/GamingPaletteRepo";
import { initGamingSpeciesRepo } from "../data/GamingSpeciesRepo";
import { initGamingSuperbitsRepo } from "../data/GamingSuperbitsRepo";
import { initGamingUpgradeRepo } from "../data/GamingUpgradeRepo";
import { initRandoList2Repo } from "../data/RandoList2Repo";

import { GamingMetadataModel } from "../model/gamingMetadataModel";
import { AtomCollider } from "../world-3/construction/atomCollider";
import { Construction } from "../world-3/construction/construction";
import { Equinox } from "../world-3/equinox";
import { FertilizerUpgrade, Garden, Logbook, MutationProgress, Plant } from "./gaming/garden";
import { Import } from "./gaming/imports";
import { PaletteColor, PaletteProgress, Superbit, SuperbitBoard } from "./gaming/palette";

const cglunkoBonusCoefficient = Number(initRandoList2Repo()[13].data.elements[14]);

export class Gaming extends Domain {
    level = 0;
    bits = 0;
    reclaimedCrownCount = 0;
    evolvedPlantCount = 0;
    cglunkoBonus: number | null = null;
    metadata: GamingMetadataModel = initGamingMetadataRepo()[0].data;
    plants: Plant[] = Plant.fromBase(initGamingSpeciesRepo());
    fertilizer: FertilizerUpgrade[] = FertilizerUpgrade.fromBase(initGamingUpgradeRepo());
    imports: Import[] = Import.fromBase(initGamingImportRepo(), initGamingBoxRepo());
    superbits: Superbit[] = Superbit.fromBase(initGamingSuperbitsRepo());
    superbitBoards: SuperbitBoard[] = [0, 1, 2].map(index => new SuperbitBoard(index, this.superbits));
    paletteColors: PaletteColor[] = PaletteColor.fromBase(initGamingPaletteRepo());
    garden = new Garden();
    mutations = new MutationProgress();
    logbook = new Logbook(this.plants);
    palette = new PaletteProgress();

    isSuperbitPurchased = (id: number): boolean =>
        this.superbits.find(superbit => superbit.superbitId === id)?.purchased ?? false;

    getPaletteBonus = (index: number): number => this.paletteColors.find(color => color.index === index)?.getBonus() ?? 0;

    getImport = (id: number): Import | undefined => this.imports.find(importItem => importItem.importId === id);

    getCglunkoBonus(): number | null {
        return this.cglunkoBonus;
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Gaming", perPlayer: false, default: [] },
            { key: "GamingSprout", perPlayer: false, default: [] },
            { key: "Spelunk", perPlayer: false, default: [] },
            { key: "Research", perPlayer: false, default: [] },
            { key: "OptLacc", perPlayer: false, default: [] },
            { key: "GemItemsPurchased", perPlayer: false, default: [] },
            // Gaming's level is account-wide; every character stores the same value.
            { key: "Lv0_0", perPlayer: false, default: [] },
        ];
    }

    init(_allItems: Item[], _charCount: number): Gaming {
        this.level = 0;
        this.bits = 0;
        this.reclaimedCrownCount = 0;
        this.evolvedPlantCount = 0;
        this.cglunkoBonus = null;

        this.metadata = initGamingMetadataRepo()[0].data;
        this.plants = Plant.fromBase(initGamingSpeciesRepo());
        this.fertilizer = FertilizerUpgrade.fromBase(initGamingUpgradeRepo());
        this.imports = Import.fromBase(initGamingImportRepo(), initGamingBoxRepo());
        this.superbits = Superbit.fromBase(initGamingSuperbitsRepo());
        this.superbitBoards = [0, 1, 2].map(index => new SuperbitBoard(index, this.superbits));
        this.paletteColors = PaletteColor.fromBase(initGamingPaletteRepo());

        this.garden = new Garden();
        this.mutations = new MutationProgress();
        this.logbook = new Logbook(this.plants);
        this.palette = new PaletteProgress();
        return this;
    }

    parse(data: Map<string, any>): void {
        const gaming = data.get(this.getDataKey()) as Gaming;
        gaming.init([], 0);

        const savedGaming = data.get("Gaming") as unknown[] ?? [];
        const skillLevels = data.get("Lv0_0") as number[] ?? [];
        gaming.level = Number(skillLevels[SkillsIndex.Gaming] ?? 0);
        gaming.bits = Number(savedGaming[0] ?? 0);
        const savedAccountOptions = data.get("OptLacc") as number[] | null;
        const cglunkoUpgradeLevel = savedAccountOptions?.[644];
        gaming.cglunkoBonus = cglunkoUpgradeLevel == null ? null
            : Number(cglunkoUpgradeLevel) * cglunkoBonusCoefficient;
        const savedSprouts = data.get("GamingSprout") as number[][];
        // Native migration initializes an empty GamingSprout list before reading row 28.
        gaming.evolvedPlantCount = savedSprouts.length === 0 ? 0 : Number(savedSprouts[28][1]);
        const research = data.get("Research") as unknown[][] ?? [];
        gaming.reclaimedCrownCount = research[11]?.length ?? 0;

        // Parse purchase flags before the aspects that use them.
        gaming.imports.forEach(importItem => importItem.parse(data));
        gaming.superbits.forEach(superbit => superbit.parse(data));
        gaming.palette.parse(data);

        gaming.mutations.parse(data);
        gaming.plants.forEach(plant => plant.parse(data));

        gaming.fertilizer.forEach(upgrade => upgrade.parse(data));
        gaming.garden.parse(data);
        gaming.logbook.parse(data);
    }
}

// Earned Palette bonuses are account inputs, independent of later equipped-color Luck.
export const updateGaming = (data: Map<string, any>): Gaming => {
    const gaming = data.get("gaming") as Gaming;
    gaming.palette.updateBonuses(data);
    return gaming;
};

// Replace every contribution, including when a subsequent save no longer owns the Superbit.
export const updateSuperbitImpacts = (data: Map<string, any>): void => {
    const gaming = data.get("gaming") as Gaming;
    const construction = data.get("construction") as Construction;
    construction.library.gamingCheckoutBoost = gaming.isSuperbitPurchased(12) ? gaming.level : 0;

    const atomCollider = data.get("collider") as AtomCollider;
    const atomDiscount = gaming.isSuperbitPurchased(21) ? 10 : 0;
    const atomMaxLevelBoost = gaming.isSuperbitPurchased(23) ? 10 : 0;
    atomCollider.atoms.forEach(atom => {
        atom.superbit21Discount = atomDiscount;
        atom.superbit23MaxLevelBoost = atomMaxLevelBoost;
    });

    const equinox = data.get("equinox") as Equinox;
    const equinoxMaxLevelBoost = gaming.isSuperbitPurchased(35) ? 10 : 0;
    equinox.upgrades.forEach(upgrade => {
        upgrade.bonusLevelFromSuperBit35 = equinoxMaxLevelBoost;
    });
};

// Only costs, garden rates, import mechanics and Palette chances wait for settled inputs.
export const updateGamingDisplay = (data: Map<string, any>): Gaming => {
    const gaming = data.get("gaming") as Gaming;

    gaming.imports.forEach(importItem => importItem.update(data));

    gaming.plants.forEach(plant => plant.update(data));
    gaming.mutations.update(data);

    // Logbook entries need the maximum stage; harvest then consumes the Logbook multiplier.
    gaming.garden.prepare(data);
    gaming.logbook.update(data);
    gaming.garden.update(data);

    gaming.fertilizer.forEach(upgrade => upgrade.update(data));

    gaming.palette.update(data);
    gaming.superbitBoards.forEach(board => board.update(data));

    return gaming;
};
