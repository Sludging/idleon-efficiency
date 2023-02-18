import { GroupBy, lavaFunc, round } from "../utility";
import { Player } from "./player";
import { ClassIndex } from "./talents";



export const familyBonusMapping = [
    "NO_FAMILY_BONUS _ _ txt _ _ txt".split(" "),
    "NO_FAMILY_BONUS 0 0 add _ _ txt".split(" "),
    "+{_TOTAL_LUK 1 5 intervalAdd _ _ txt".split(" "),
    "+{%_PRINTER|SAMPLE_SIZE 6 100 decay _ _ txt".split(" "),
    "VIRTUOSO 1 0 add _ _ txt".split(" "),
    "INFINILYTE 1 0 add _ _ txt".split(" "),
    "NO_FAMILY_BONUS 73 2 bigBase _ _ txt".split(" "),
    "+{_TOTAL_STR 1 5 intervalAdd _ _ txt".split(" "),
    "+{_WEAPON_POWER 25 100 decay _ _ txt".split(" "),
    "+{%_TOTAL_HP 40 100 decay _ _ txt".split(" "),
    "+{%_TOTAL_DAMAGE 20 180 decay _ _ txt".split(" "),
    "DEATH_BRINGER _ _ txt _ _ txt".split(" "),
    "+{%_Refinery_Speed 50 150 decay _ _ txt".split(" "),
    "ROYAL_GUARDIAN _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
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
    "FILLER _ _ txt _ _ txt".split(" "),
    "NO_FAMILY_BONUS 0 0 add _ _ txt".split(" "),
    "+{_TOTAL_WIS 1 5 intervalAdd _ _ txt".split(" "),
    "+{_STAR_TAB|TALENT_POINTS 1 6 intervalAdd _ _ txt".split(" "),
    "{#@HIGHER_BONUSES|FROM_GOLDEN_FOODS 0.4 100 decayMulti _ _ txt".split(" "),
    "+{%_WORLD_5_STUFF 25 100 decay _ _ txt".split(" "),
    "SPIRITUAL_MONK 25 100 decay _ _ txt".split(" "),
    "+{%_ALL_STAT.|STR,_AGI,_WIS,_LUK. 5 180 decay _ _ txt".split(" "),
    "ARCANE_CULTIST 25 100 decay _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
    "FILLER _ _ txt _ _ txt".split(" "),
];

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

export const FamilyBonusRelations: Record<ClassIndex, ClassIndex[]> = {
    [ClassIndex.Beginner]: [],
    [ClassIndex.Journeyman]: [],
    [ClassIndex.Maestro]: [ClassIndex.Journeyman],
    [ClassIndex.Virtuoso]: [],
    [ClassIndex.Infinilyte]: [],
    [ClassIndex.Warrior]: [],
    [ClassIndex.Barbarian]: [ClassIndex.Warrior],
    [ClassIndex.Squire]: [ClassIndex.Warrior],
    [ClassIndex.Blood_Berserker]: [ClassIndex.Warrior, ClassIndex.Barbarian],
    [ClassIndex.Death_Bringer]: [],
    [ClassIndex.Divine_Knight]: [ClassIndex.Warrior, ClassIndex.Squire],
    [ClassIndex.Royal_Guardian]: [],
    [ClassIndex.Archer]: [],
    [ClassIndex.Bowman]: [ClassIndex.Archer],
    [ClassIndex.Hunter]: [ClassIndex.Archer],
    [ClassIndex.Siege_Breaker]: [ClassIndex.Archer, ClassIndex.Bowman],
    [ClassIndex.Mayheim]: [],
    [ClassIndex.Wind_Walker]: [],
    [ClassIndex.Beast_Master]: [ClassIndex.Archer, ClassIndex.Hunter],
    [ClassIndex.Mage]: [],
    [ClassIndex.Shaman]: [ClassIndex.Mage],
    [ClassIndex.Wizard]: [ClassIndex.Mage],
    [ClassIndex.Elemental_Sorcerer]: [ClassIndex.Mage, ClassIndex.Wizard],
    [ClassIndex.Spiritual_Monk]: [],
    [ClassIndex.Bubonic_Conjuror]: [ClassIndex.Mage, ClassIndex.Shaman],
    [ClassIndex.Arcane_Cultist]: [],
}

export class FamilyBonus {
    constructor(public classIndex: ClassIndex, public bonus: string, public value: number, public playerID: number) { }

    getBonusText = (player: Player | undefined = undefined, rounding: boolean = true) => {
        return this.bonus.replace(/_/g, " ").replace("|", " ").replace("#@", "x ").replace(/{/g, this.getBonus(player, rounding).toString());
    }

    getBonus = (player: Player | undefined = undefined, rounding: boolean = false) => {
        let familyManBoost = 1;
        // Only the highest player of a class gets boosted by family guy, so check if same class and if highest level of that class.
        if (player && player.classId == this.classIndex && player.playerID == this.playerID) {
            familyManBoost += player.getTalentBonus(144) / 100;
        }

        return rounding ? round(this.value * familyManBoost) : this.value * familyManBoost;
    }
}

export class Family {
    classBonus: Map<ClassIndex, FamilyBonus> = new Map()
}

export const calculateFamily = (players: Player[]) => {
    const family = new Family();

    const highestFamilyGuy = players.sort((player1, player2) => player1.getTalentBonus(144) > player2.getTalentBonus(144) ? -1 : 1)[0];

    GroupBy(players, "classId").forEach(classPlayers => {
        const highestLevel = classPlayers.sort((player1, player2) => player1.level > player2.level ? -1 : 1)[0];
        const bonusData = familyBonusMapping[highestLevel.classId];
        let familyManBoost = 1;
        // For siege breaker and divine knight bonus, the highest family guy bonus (across all players, not just dk/sb) boosts the family bonus.
        if ([ClassIndex.Siege_Breaker, ClassIndex.Divine_Knight].includes(highestLevel.classId)) {
            familyManBoost += highestFamilyGuy.getTalentBonus(144) / 100;
        }
        const familyBonus = lavaFunc(bonusData[3], highestLevel.level - Number(classAccountBonus[highestLevel.classId][1]), Number(bonusData[1]), Number(bonusData[2]), false);
        family.classBonus.set(highestLevel.classId, new FamilyBonus(highestLevel.classId, bonusData[0], familyBonus * familyManBoost, highestLevel.classId));
        FamilyBonusRelations[highestLevel.classId].forEach((subClass) => {
            const bonusData = familyBonusMapping[subClass];
            const subClassFamilyBonus = lavaFunc(bonusData[3], highestLevel.level - Number(classAccountBonus[subClass][1]), Number(bonusData[1]), Number(bonusData[2]), false)
            // if we never seen this subclass or the value is higher, set a new family bonus.
            const currentBonus = family.classBonus.get(subClass);
            if (subClassFamilyBonus > (currentBonus?.getBonus() ?? 0)) {
                family.classBonus.set(subClass, new FamilyBonus(highestLevel.classId, bonusData[0], subClassFamilyBonus, highestLevel.playerID));
            }
        })
    })
    return family;
}