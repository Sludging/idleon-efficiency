import { lavaFunc, round } from "../utility";
import { Domain, RawData } from "./base/domain";
import { Item } from "./items";
import { Player } from "./player";
import { ClassIndex, Talent } from "./talents";



// Copied directly from the game.
export const familyBonusMapping = [
    "NO_FAMILY_BONUS _ _ txt _ _ txt".split(" "),
    "NO_FAMILY_BONUS 0 0 add _ _ txt".split(" "),
    "+{_TOTAL_LUK 1 5 intervalAdd _ _ txt".split(" "),
    "+{%_PRINTER|SAMPLE_SIZE 6 100 decay _ _ txt".split(" "),
    "+{%_FIGHTING|AFK_GAINS 5 250 decay _ _ txt".split(" "),
    "INFINILYTE 1 0 add _ _ txt".split(" "),
    "NO_FAMILY_BONUS 5 250 decay _ _ txt".split(" "),
    "+{_TOTAL_STR 1 5 intervalAdd _ _ txt".split(" "),
    "+{_WEAPON_POWER 25 100 decay _ _ txt".split(" "),
    "+{%_TOTAL_HP 40 100 decay _ _ txt".split(" "),
    "+{%_TOTAL_DAMAGE 20 180 decay _ _ txt".split(" "),
    "NOPE _ _ txt _ _ txt".split(" "),
    "+{%_Refinery_Speed 50 150 decay _ _ txt".split(" "),
    "NOPE _ _ txt _ _ txt".split(" "),
    "+{%_KILL_PER_KILL 60 800 decay _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "+{%_DROP_RATE|MULTIPLIER 10 800 decay _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "NO_FAMILY_BONUS 0 0 add _ _ txt".split(" "),
    "+{_TOTAL_AGI 1 5 intervalAdd _ _ txt".split(" "),
    "+{%_EXP_WHEN_FIGHT|MONSTERS_ACTIVELY 38 100 decay _ _ txt".split(" "),
    "+{%_EFFICIENCY|FOR_ALL_SKILLS 30 100 decay _ _ txt".split(" "),
    "+{%_FASTER_MINIMUM|BOAT_TRAVEL_TIME 20 170 decay _ _ txt".split(" "),
    "MAYHEIM 25 100 decay _ _ txt".split(" "),
    "WIND_WALKER 25 100 decay _ _ txt".split(" "),
    "+{%_ALL_SKILL|AFK_GAINS 5 180 decay _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "{千_COINS|FROM_MOBS 1.4 800 decayMulti _ _ txt".split(" "),
    "NO_FAMILY_BONUS 0 0 add _ _ txt".split(" "),
    "+{_TOTAL_WIS 1 5 intervalAdd _ _ txt".split(" "),
    "+{_STAR_TAB|TALENT_POINTS 1 6 intervalAdd _ _ txt".split(" "),
    "{千@HIGHER_BONUSES|FROM_GOLDEN_FOODS 0.4 100 decayMulti _ _ txt".split(" "),
    "+{_LV_FOR_ALL|TALENTS_ABOVE_LV_1 20 350 decay _ _ txt".split(" "),
    "SPIRITUAL_MONK 25 100 decay _ _ txt".split(" "),
    "+{%_ALL_STAT.|STR,_AGI,_WIS,_LUK. 5 180 decay _ _ txt".split(" "),
    "FILLER 25 100 decay _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "+{%_TOTAL_DMG|MULTIPLIER 12 800 decay _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
];

// Copied directly from the game.
export const classAccountBonus = [
    ["Z", "0"],
    ["_Base_Damage", "0"],
    ["%_Rare_Drop_Chance", "9"],
    ["%_Exp_Gained|Instantly_After_Leveling_Up_a_skill", "29"],
    ["%_bonus_exp|gain_for_all_skills", "69"],
    ["%_bonus_exp|gain_for_Class_level", "129"],
    ["RAGE_BASICS", "0"],
    ["WARRIOR", "9"],
    ["BARBARIAN", "29"],
    ["SQUIRE", "29"],
    ["BLOOD_BERSERKER", "69"],
    ["DEATH_BRINGER", "69"],
    ["DIVINE_KNIGHT", "69"],
    ["ROYAL_GUARDIAN", "69"],
    ["FILLER", "129"],
    ["FILLER", "129"],
    ["FILLER", "129"],
    ["FILLER", "129"],
    ["CALM_BASICS", "0"],
    ["ARCHER", "9"],
    ["BOWMAN", "29"],
    ["HUNTER", "29"],
    ["SIEGE_BREAKER", "69"],
    ["MAYHEIM", "69"],
    ["WIND_WALKER", "69"],
    ["BEAST_MASTER", "69"],
    ["FILLER", "129"],
    ["FILLER", "129"],
    ["FILLER", "129"],
    ["FILLER", "129"],
    ["SAVVY_BASICS", "0"],
    ["WIZARD", "9"],
    ["FILLER", "29"],
    ["FILLER", "29"],
    ["FILLER", "69"],
    ["FILLER", "69"],
    ["FILLER", "69"],
    ["FILLER", "69"],
    ["FILLER", "129"],
    ["FILLER", "129"],
    ["FILLER", "129"],
    ["FILLER", "129"],
];

// For each class, list only the useful ancestor classes in its class lineage.
export const FamilyBonusRelations: Record<ClassIndex, ClassIndex[]> = {
    [ClassIndex.None]: [],
    [ClassIndex.Beginner]: [],
    [ClassIndex.Journeyman]: [ClassIndex.Beginner],
    [ClassIndex.Maestro]: [ClassIndex.Beginner, ClassIndex.Journeyman],
    [ClassIndex.Voidwalker]: [ClassIndex.Beginner, ClassIndex.Journeyman, ClassIndex.Maestro],
    [ClassIndex.Infinilyte]: [ClassIndex.Beginner, ClassIndex.Journeyman, ClassIndex.Maestro, ClassIndex.Voidwalker],
    [ClassIndex.Warrior]: [],
    [ClassIndex.Barbarian]: [ClassIndex.Warrior],
    [ClassIndex.Squire]: [ClassIndex.Warrior],
    [ClassIndex.Blood_Berserker]: [ClassIndex.Warrior, ClassIndex.Barbarian],
    [ClassIndex.Death_Bringer]: [ClassIndex.Warrior, ClassIndex.Barbarian, ClassIndex.Blood_Berserker],
    [ClassIndex.Divine_Knight]: [ClassIndex.Warrior, ClassIndex.Squire],
    [ClassIndex.Royal_Guardian]: [ClassIndex.Warrior, ClassIndex.Squire, ClassIndex.Divine_Knight],
    [ClassIndex.Archer]: [],
    [ClassIndex.Bowman]: [ClassIndex.Archer],
    [ClassIndex.Hunter]: [ClassIndex.Archer],
    [ClassIndex.Siege_Breaker]: [ClassIndex.Archer, ClassIndex.Bowman],
    [ClassIndex.Mayheim]: [ClassIndex.Archer, ClassIndex.Bowman],
    [ClassIndex.Wind_Walker]: [ClassIndex.Archer, ClassIndex.Hunter, ClassIndex.Beast_Master],
    [ClassIndex.Beast_Master]: [ClassIndex.Archer, ClassIndex.Hunter],
    [ClassIndex.Mage]: [],
    [ClassIndex.Shaman]: [ClassIndex.Mage],
    [ClassIndex.Wizard]: [ClassIndex.Mage],
    [ClassIndex.Elemental_Sorcerer]: [ClassIndex.Mage, ClassIndex.Wizard],
    [ClassIndex.Spiritual_Monk]: [ClassIndex.Mage, ClassIndex.Wizard],
    [ClassIndex.Bubonic_Conjuror]: [ClassIndex.Mage, ClassIndex.Shaman],
    [ClassIndex.Arcane_Cultist]: [ClassIndex.Mage, ClassIndex.Shaman, ClassIndex.Bubonic_Conjuror],
}

// Family bonuses are calculated at runtime by the game, we can't do that so we store candidates.
// For each player we store the Family bonus value, the player ID, and that player's Family Guy percentage
// captured during the Family phase.
type FamilyBonusCandidate = {
    value: number;
    playerID: number;
    familyGuyBonus: number;
};

export class FamilyBonus {
    private readonly candidates: FamilyBonusCandidate[] = [];
    // Each player gets its own set of results.
    private readonly results: Map<number | undefined, number> = new Map();

    // highestFamilyGuy is used only by the account-wide multiplier on Divine Knight and Siege Breaker.
    constructor(public classIndex: ClassIndex, public bonus: string, public highestFamilyGuy: number) { }

    getBonusText = (player: Player | undefined = undefined, rounding: boolean = true) => {
        return this.bonus.replace(/_/g, " ").replace("|", " ").replace("#@", "x ").replace(/{/g, this.getBonus(player, rounding).toString());
    }

    getBonus = (player: Player | undefined = undefined, rounding: boolean = false) => {
        const familyBonus = this.results.get(player?.playerID) ?? 0;
        return rounding ? round(familyBonus) : familyBonus;
    }

    addCandidate = (value: number, playerID: number, familyGuyBonus: number) => {
        this.candidates.push({ value, playerID, familyGuyBonus });
    }

    // Pre-calculate the cached results so we don't have to recalculate them every time a we query the bonus.
    calculateResults = (playerIDs: Iterable<number>) => {
        this.results.clear();
        this.results.set(undefined, this.calculateResult(undefined));
        for (const playerID of playerIDs) {
            this.results.set(playerID, this.calculateResult(playerID));
        }
    }

    private calculateResult = (playerID: number | undefined) => {
        let familyBonus = 0;
        const usesAccountWideFamilyGuy = [ClassIndex.Siege_Breaker, ClassIndex.Divine_Knight].includes(this.classIndex);

        // Candidates are considered in game order. Compare each raw candidate to the current stored
        // result; when it wins, write it first, then apply the owner's captured Family Guy value for
        // the requested player context. DK/SB overwrite that owner-specific value with the account-wide
        // Family Guy multiplier, rather than stacking both multipliers.
        this.candidates.forEach(candidate => {
            if (candidate.value > familyBonus) {
                familyBonus = candidate.value;
                if (usesAccountWideFamilyGuy) {
                    familyBonus *= 1 + this.highestFamilyGuy / 100;
                } else if (playerID === candidate.playerID) {
                    familyBonus *= 1 + candidate.familyGuyBonus / 100;
                }
            }
        });

        return familyBonus;
    }
}

export class Family extends Domain {
    classBonus: Map<ClassIndex, FamilyBonus> = new Map()
    getClassBonus = (classIndex: ClassIndex) => this.classBonus.get(classIndex);

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(_data: Map<string, any>): void {
        return;
    }
}

// This function runs in the pre-ES phase to match the game behavior.
export const calculateFamily = (data: Map<string, any>) => {
    const family = data.get("family") as Family;
    const players = data.get("players") as Player[];

    family.classBonus.clear();
    // Use the best recipient's shared modifiers with Super Talent levels before Elemental Sorcerer levels apply.
    let highestFamilyGuy = 0;
    for (const recipient of players) {
        highestFamilyGuy = Math.max(highestFamilyGuy, Talent.getAccountTalentBonus(players, 144, recipient.currentTalentInputs));
    }
    const playerIDs = players.map(player => player.playerID);

    players.forEach(player => {
        // The game uses the pre-ES bonus, so we need to capture it explicitly at this stage.
        const familyGuyBonus = player.getTalentBonus(144);
        // Family considers each useful ancestor lineage before adding the owner's direct class.
        const familyLineage = FamilyBonusRelations[player.classId] ?? [];
        familyLineage.forEach(classId => updateFamilyBonus(family, player, classId, highestFamilyGuy, familyGuyBonus));
        updateFamilyBonus(family, player, player.classId, highestFamilyGuy, familyGuyBonus);
    });

    // Pre-calculate the family bonus for each player based on the candidates collected above.
    family.classBonus.forEach(familyBonus => familyBonus.calculateResults(playerIDs));
    return family;
}

const updateFamilyBonus = (family: Family, player: Player, classId: ClassIndex, highestFamilyGuy: number, familyGuyBonus: number) => {
    const bonusData = familyBonusMapping[classId];
    if (!bonusData) {
        return;
    }

    const familyBonus = lavaFunc(
        bonusData[3],
        Math.max(0, Math.round(player.level - Number(classAccountBonus[classId][1]))),
        Number(bonusData[1]),
        Number(bonusData[2]),
        false
    );
    // First, create a bonus if non exist for this classId yet.
    let familyClassBonus = family.classBonus.get(classId);
    if (!familyClassBonus) {
        familyClassBonus = new FamilyBonus(classId, bonusData[0], highestFamilyGuy);
        family.classBonus.set(classId, familyClassBonus);
    }
    // Then add candidate player to later calculate the final bonus.
    familyClassBonus.addCandidate(familyBonus, player.playerID, familyGuyBonus);
}
