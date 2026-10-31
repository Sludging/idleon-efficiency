import { lavaFunc, round } from "../utility";
import { Domain, RawData } from "./base/domain";
import { Item } from "./items";
import { Player } from "./player";
import { ClassIndex, Talent } from "./talents";
import type { TalentLevelInputs } from "./talents";



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

type FamilyBonusCandidate = {
    classIndex: ClassIndex;
    value: number;
    owner: Player;
    inputs: Readonly<TalentLevelInputs>;
};

export class FamilyBonus {
    private readonly results: Map<number | undefined, number> = new Map();

    constructor(public classIndex: ClassIndex, public bonus: string) { }

    getBonusText = (player: Player | undefined = undefined, rounding: boolean = true) => {
        return this.bonus.replace(/_/g, " ").replace("|", " ").replace("#@", "x ").replace(/{/g, this.getBonus(player, rounding).toString());
    }

    getBonus = (player: Player | undefined = undefined, rounding: boolean = false) => {
        const familyBonus = this.results.get(player?.playerID) ?? 0;
        return rounding ? round(familyBonus) : familyBonus;
    }

    setResult(playerID: number | undefined, value: number): void {
        this.results.set(playerID, value);
    }
}

export class Family extends Domain {
    classBonus: Map<ClassIndex, FamilyBonus> = new Map()
    getClassBonus = (classIndex: ClassIndex) => this.classBonus.get(classIndex);

    calculate(players: Player[]): void {
        this.classBonus.clear();
        const candidates: FamilyBonusCandidate[] = [];
        const capturedInputs = new Map<Player, Readonly<TalentLevelInputs>>();
        for (const player of players) {
            const inputs = { ...player.currentTalentInputs };
            capturedInputs.set(player, inputs);
            const familyLineage = FamilyBonusRelations[player.classId] ?? [];
            for (const classIndex of familyLineage) {
                this.collectCandidate(candidates, player, inputs, classIndex);
            }
            this.collectCandidate(candidates, player, inputs, player.classId);
        }

        for (const recipient of players) {
            this.calculateResults(players, candidates, capturedInputs, recipient);
        }
        this.calculateResults(players, candidates, capturedInputs, undefined);
    }

    private collectCandidate(
        candidates: FamilyBonusCandidate[], owner: Player, inputs: Readonly<TalentLevelInputs>, classIndex: ClassIndex,
    ): void {
        const bonusData = familyBonusMapping[classIndex];
        if (!bonusData) {
            return;
        }

        const value = lavaFunc(
            bonusData[3],
            Math.max(0, Math.round(owner.level - Number(classAccountBonus[classIndex][1]))),
            Number(bonusData[1]),
            Number(bonusData[2]),
            false
        );
        if (!this.classBonus.has(classIndex)) {
            this.classBonus.set(classIndex, new FamilyBonus(classIndex, bonusData[0]));
        }
        candidates.push({ classIndex, value, owner, inputs });
    }

    private calculateResults(
        players: Player[], candidates: FamilyBonusCandidate[],
        capturedInputs: ReadonlyMap<Player, Readonly<TalentLevelInputs>>, recipient: Player | undefined,
    ): void {
        const results = new Map<ClassIndex, number>();
        const projectedInputs = new Map<Readonly<TalentLevelInputs>, TalentLevelInputs>();
        if (recipient === undefined) {
            for (const inputs of capturedInputs.values()) {
                projectedInputs.set(inputs, { ...inputs });
            }
        } else {
            const inputs = capturedInputs.get(recipient)!;
            projectedInputs.set(inputs, { ...inputs });
        }

        for (const candidate of candidates) {
            if (candidate.value <= (results.get(candidate.classIndex) ?? 0)) {
                continue;
            }

            // Family Guy uses the unamplified Elemental Sorcerer bonus for that class.
            // Later classes use the amplified Elemental Sorcerer bonus.
            results.set(candidate.classIndex, candidate.value);
            const familyTalentLevels = results.get(ClassIndex.Elemental_Sorcerer) ?? 0;
            let familyGuyBonus = 0;
            if (candidate.classIndex === ClassIndex.Divine_Knight || candidate.classIndex === ClassIndex.Siege_Breaker) {
                for (const inputs of projectedInputs.values()) {
                    inputs.familyTalentLevels = familyTalentLevels;
                    familyGuyBonus = Math.max(familyGuyBonus, Talent.getAccountTalentBonus(players, 144, inputs));
                }
            } else if (candidate.owner === recipient) {
                const inputs = projectedInputs.get(candidate.inputs)!;
                inputs.familyTalentLevels = familyTalentLevels;
                familyGuyBonus = candidate.owner.getTalentBonusAtInputs(144, inputs);
            }
            results.set(candidate.classIndex, candidate.value * (1 + familyGuyBonus / 100));
        }

        for (const [classIndex, bonus] of this.classBonus) {
            bonus.setResult(recipient?.playerID, results.get(classIndex) ?? 0);
        }
    }

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

export const calculateFamily = (data: Map<string, any>) => {
    const family = data.get("family") as Family;
    const players = data.get("players") as Player[];
    family.calculate(players);
    return family;
}
