import type { Companion } from "./companions";
import type { Grimoire } from "./grimoire";
import type { EquipmentSets } from "./misc/equipmentSets";
import { LUNARHEIM_SUPER_TALENT_POINTS, LUNARHEIM_TUNNEL_INDEX, MAROON_WARSHIP_TALENT_LEVELS, Player } from "./player";
import type { Tesseract } from "./tesseract";
import type { Equinox } from "./world-3/equinox";
import type { Divinity } from "./world-5/divinity";
import type { Gaming } from "./world-5/gaming";
import type { Sneaking } from "./world-6/sneaking";
import { BASE_SUPER_TALENT_LEVELS, LegendTalents } from "./world-7/legendTalents";
import type { Spelunking } from "./world-7/spelunking";
import type { ZenithMarket } from "./world-7/zenithShop";

export interface TalentBonusSource {
    name: string;
    value: number;
    active: boolean;
    obtainableValue?: number;
    basis?: string;
}

// Native 1.24 applies source-specific rounding before the final Talent.getExtraLevels floor.
// These rows describe source contributions before a talent's shared-level cap.
export const getTalentSourceGroups = (data: Map<string, any>, player: Player): {
    points: TalentBonusSource[];
    superLevels: TalentBonusSource[];
    ordinaryLevels: TalentBonusSource[];
} => {
    const inputs = player.currentTalentInputs;
    const companions = data.get("companions") as Companion[];
    const divinity = data.get("divinity") as Divinity;
    const equinox = data.get("equinox") as Equinox;
    const sneaking = data.get("sneaking") as Sneaking;
    const grimoire = data.get("grimoire") as Grimoire;
    const equipmentSets = data.get("equipmentSets") as EquipmentSets;
    const tesseract = data.get("tesseract") as Tesseract;
    const gaming = data.get("gaming") as Gaming;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const zenithMarket = data.get("zenithMarket") as ZenithMarket;
    const spelunking = data.get("spelunking") as Spelunking;

    const classPoints = player.getSuperTalentPointsFromClassLevel();
    const lunarheimCompleted = spelunking.tunnels[LUNARHEIM_TUNNEL_INDEX].loreCompleted;
    const superDuperTalents = legendTalents.talents.find(talent => talent.index === 7)!;
    const superDupers = zenithMarket.bonuses.find(bonus => bonus.index === 5)!;
    const legendLevels = legendTalents.getBonusFromIndex(7);
    const marketLevels = zenithMarket.getBonusForId(5);
    const arctisLevels = Math.ceil(inputs.minorLinkTalentLevels);
    const familyLevels = Math.floor(inputs.familyTalentLevels);
    const tesseractLevels = Math.min(5, inputs.tesseractTalentLevels);
    const slug = companions.find(companion => companion.id === 1)!;
    const kattlekrukSet = equipmentSets.equipmentSets.find(set => set.data.name === "KATTLEKRUK_SET")!;
    const firstTalentMastery = sneaking.masteryRewards[2].requiredMastery;
    const symbolsTalent = player.talents.find(talent => [149, 374, 539].includes(talent.skillIndex));

    const ordinaryLevels: TalentBonusSource[] = [];
    if (symbolsTalent) {
        ordinaryLevels.push({
            name: "Symbols of Beyond",
            value: inputs.eliteTalentLevels,
            active: inputs.eliteTalentLevels !== 0,
            obtainableValue: symbolsTalent.getBonusAtLevel(1),
            basis: "at talent level 1",
        });
    }
    ordinaryLevels.push(
        {
            name: "Arctis minor link",
            value: arctisLevels,
            active: arctisLevels !== 0,
            obtainableValue: Math.ceil(divinity.gods[1].getMinorBonusForPlayer(player)),
            basis: "when linked, at your Divinity level",
        },
        {
            name: "Elemental Sorcerer Family bonus",
            value: familyLevels,
            active: familyLevels !== 0,
            basis: "from your highest-level Elemental Sorcerer",
        },
        {
            name: "Maroon Warship achievement",
            value: inputs.achievementTalentLevels,
            active: inputs.achievementTalentLevels !== 0,
            obtainableValue: MAROON_WARSHIP_TALENT_LEVELS,
        },
        {
            name: "Rift Slug companion",
            value: inputs.companionTalentLevels,
            active: inputs.companionTalentLevels !== 0,
            obtainableValue: slug.data.bonus,
        },
        {
            name: "Equinox: Equinox Symbols",
            value: inputs.equinoxTalentLevels,
            active: inputs.equinoxTalentLevels !== 0,
            obtainableValue: equinox.upgrades[10].getBonusAtLevel(1),
            basis: "per upgrade level",
        },
        {
            name: "Ninja Mastery",
            value: inputs.ninjaMasteryTalentLevels,
            active: inputs.ninjaMasteryTalentLevels !== 0,
            obtainableValue: sneaking.getMasteryTalentLevels(firstTalentMastery),
            basis: `at ${firstTalentMastery} completed masteries`,
        },
        {
            name: "Grimoire: Skull of Major Talent",
            value: inputs.grimoireTalentLevels,
            active: inputs.grimoireTalentLevels !== 0,
            obtainableValue: grimoire.upgrades[39].data.value,
            basis: "per upgrade level",
        },
        {
            name: "Kattlekruk equipment set",
            value: inputs.equipmentTalentLevels,
            active: inputs.equipmentTalentLevels !== 0,
            obtainableValue: kattlekrukSet.getBonus(),
        },
        {
            name: "Tesseract: Universe Talent",
            value: tesseractLevels,
            active: tesseractLevels !== 0,
            obtainableValue: Math.min(5, tesseract.upgrades[57].data.value),
            basis: "per upgrade level, up to 5 total",
        },
        {
            name: "Gaming Superbit: Timmy Talented",
            value: inputs.gamingTalentLevels,
            active: inputs.gamingTalentLevels !== 0,
            obtainableValue: gaming.getSuperbitTalentLevelsAtClassLevel(player.level),
            basis: "when purchased, at your class level; starts at level 600",
        },
    );

    return {
        points: [
            {
                name: "Class levels (1 every 100 class levels, starting at 500)",
                value: classPoints,
                active: classPoints !== 0,
                obtainableValue: player.getSuperTalentPointsFromClassLevel(500),
                basis: "at class level 500, then every 100 levels",
            },
            {
                name: "Lunarheim Lore Boss in Spelunking",
                value: lunarheimCompleted ? LUNARHEIM_SUPER_TALENT_POINTS : 0,
                active: lunarheimCompleted,
                obtainableValue: LUNARHEIM_SUPER_TALENT_POINTS,
            },
        ],
        superLevels: [
            { name: "Base", value: BASE_SUPER_TALENT_LEVELS, active: true },
            {
                name: "Super Duper Talents in Legend Talents",
                value: legendLevels,
                active: legendLevels !== 0,
                obtainableValue: superDuperTalents.getBonus(1),
                basis: "per talent level",
            },
            {
                name: "SUPER DUPERS in the Zenith Market",
                value: marketLevels,
                active: marketLevels !== 0,
                obtainableValue: Math.floor(superDupers.data.bonusPerLevel),
                basis: "per upgrade level; Doodle Reef, World 7",
            },
        ],
        ordinaryLevels,
    };
};
