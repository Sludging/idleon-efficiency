import { lavaFunc, lavaLog } from "../utility";
import { initTalentTreeRepo } from "./data/TalentTreeRepo";
import { ImageData } from "./imageData";
import { TalentModel } from "./model/talentModel";
import type { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";

export const TalentConst = {
    NearbyOutletIndex: 478,
    ChargeSiphonIndex: 475,
    CrystalSpawnIndex: 26,
    CrystalForDaysIndex: 619,
    ArenaSpiritIndex: 370
}


export interface TalentLevelInputs {
    eliteTalentLevels: number;
    achievementTalentLevels: number;
    familyTalentLevels: number;
    companionTalentLevels: number;
    minorLinkTalentLevels: number;
    equinoxTalentLevels: number;
    ninjaMasteryTalentLevels: number;
    grimoireTalentLevels: number;
    equipmentTalentLevels: number;
    tesseractTalentLevels: number;
    gamingTalentLevels: number;
    superTalentLevels: number;
    allTalentCap: number;
}

export class Talent {
    public description: string;
    public x1: number;
    public x2: number;
    public funcX: string;
    public y1: number;
    public y2: number;
    public funcY: string;
    public lvlUpText: string;
    public skillIndex: number

    // Represent the level of talent, including all boost possibles
    level: number = 0;
    // Represent how many talent points have been spent in this talent, so not changed by bonuses affecting talent levels
    pointsSpent: number = 0;
    // Represent the max level that can be reached, including all boost possibles
    maxLevel: number = 0;
    // Represent the max level of a talent as it is displayed in-game, so not including any bonus that could affect talent levels
    bookMaxLevel: number = 0;
    // Represent whether this talent has an active Super Talent membership.
    isSupered: boolean = false;

    constructor(public name: string, public data: TalentModel) {
        this.description = data.description;
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.funcX = data.funcX;
        this.y1 = data.y1;
        this.y2 = data.y2;
        this.funcY = data.funcY;
        this.lvlUpText = data.lvlUpText;
        this.skillIndex = data.skillIndex;
    }

    resetAccountBonusInputs(): void {}


    /** Select the highest candidate bonus using candidate allocations and presets with the recipient's shared modifiers. */
    static getAccountTalentBonus(players: readonly Player[], skillIndex: number, recipientInputs: TalentLevelInputs): number {
        let maximum = 0;
        for (const owner of players) {
            const talent = owner.getTalent(skillIndex);
            if (!talent) {
                continue;
            }
            // Candidates keep their allocation and both presets, but share the recipient's modifiers.
            const extraLevels = talent.pointsSpent > 0.5
                ? talent.getExtraLevels(recipientInputs, owner.allPresetSuperTalentIndexes.has(skillIndex))
                : 0;
            maximum = Math.max(maximum, talent.getBonusAtLevel(talent.pointsSpent + extraLevels));
        }
        return maximum;
    }

    static getArchlordOfThePiratesMultiplier(
        players: readonly Player[],
        recipientInputs: TalentLevelInputs,
        plunderousMobKills: number,
    ): number {
        // Plunderous Mob kill decades scale the best candidate bonus for this recipient.
        const talentBonus = Talent.getAccountTalentBonus(players, 328, recipientInputs);
        return 1 + talentBonus * lavaLog(plunderousMobKills) / 100;
    }


    static getClassLevelAttributeBonus(player: Player): number {
        const talent = player.talents.find((talent): talent is WillOfTheEldestTalent => {
            if (talent.skillIndex !== 620) {
                return false;
            }
            if (!(talent instanceof WillOfTheEldestTalent)) {
                throw new Error("Will Of The Eldest must use its specialized talent factory.");
            }
            return true;
        });
        return talent ? talent.getAttributeBonus() : 0;
    }

    static getBeginnerWeaponPowerBonus(player: Player): number {
        const talent = player.getTalent(616);
        if (!talent) {
            return 0;
        }
        if (!(talent instanceof BeginnerBestClassTalent)) {
            throw new Error("Beginner Best Class must use its specialized talent factory.");
        }
        return talent.getWeaponPowerBonus();
    }

    static getSkillWeaponPowerBonus(player: Player): Readonly<{ progression: number; intellect: number }> {
        const inputs = player.finalTalentInputs;
        // These talents grant weapon power for each complete decade of their linked skill level.
        const progression = player.getTalentBonusAtInputs(140, inputs) * Math.floor(player.skills.get(SkillsIndex.Cooking)!.level / 10)
            + (player.getTalentBonusAtInputs(170, inputs) * Math.floor(player.skills.get(SkillsIndex.Gaming)!.level / 10)
                + (player.getTalentBonusAtInputs(320, inputs) * Math.floor(player.skills.get(SkillsIndex.Sailing)!.level / 10)
                    + player.getTalentBonusAtInputs(500, inputs) * Math.floor(player.skills.get(SkillsIndex.Divinity)!.level / 10)));
        // Intellect enters the weapon-power sum after the pet effect, not inside the progression subtree.
        const intellect = player.getTalentBonusAtInputs(530, inputs) * Math.floor(player.skills.get(SkillsIndex.Intellect)!.level / 10);
        return { progression, intellect };
    }

    static getPetWeaponPowerBonus(player: Player, firstStoredPetPower: number): number {
        // Animalistic Ferocity uses powers of ten of the first stored pet's power, not its level.
        return player.getTalentBonusAtInputs(365, player.finalTalentInputs) * lavaLog(firstStoredPetPower);
    }

    static getDummyTargetAllStatBonus(player: Player, bestDPS: number): number {
        // Dummy Thicc Stats grants all-stat percentage per power of ten in the Shimmer Island record, capped at 15.
        // Keep fractional points until rounding the complete attribute composition.
        return Math.min(15, lavaLog(bestDPS) * player.getTalentBonusAtInputs(653, player.finalTalentInputs));
    }

    getBonusAtLevel(level: number, round: boolean = false, yBonus: boolean = false) {
        if (yBonus) {
            return lavaFunc(this.funcY, level, this.y1, this.y2, round);
        }
        return lavaFunc(this.funcX, level, this.x1, this.x2, round);
    }

    getBonus = (round: boolean = false, yBonus: boolean = false, maxBonus: boolean = false) => {
        return this.getBonusAtLevel(maxBonus ? this.maxLevel : this.level, round, yBonus);
    }


    getExtraLevels(inputs: TalentLevelInputs, superTalentMember: boolean): number {
        if (this.skillIndex === 149 || this.skillIndex === 374 || this.skillIndex === 539
            || this.skillIndex === 505 || this.skillIndex > 614
            || (this.skillIndex >= 49 && this.skillIndex <= 59)) {
            return 0;
        }

        const sharedLevels = inputs.eliteTalentLevels + inputs.achievementTalentLevels
            + Math.floor(inputs.familyTalentLevels) + inputs.companionTalentLevels
            + Math.ceil(inputs.minorLinkTalentLevels) + inputs.equinoxTalentLevels
            + inputs.ninjaMasteryTalentLevels + inputs.grimoireTalentLevels
            + inputs.equipmentTalentLevels + Math.min(5, inputs.tesseractTalentLevels)
            + inputs.gamingTalentLevels;
        const cap = this.skillIndex >= 225 && this.skillIndex <= 239 ? inputs.allTalentCap : 9999;
        // Royal Guardian caps shared levels before Super Talent levels enter the rounded total.
        return Math.floor(Math.min(cap, sharedLevels) + (superTalentMember ? inputs.superTalentLevels : 0));
    }

    getBonusText = (): string => {
        const xBonus = this.getBonus(true);
        const yBonus = this.getBonus(true, true);
        if (this.description.includes("}")) {
            return this.description.replace("{", xBonus.toString()).replace("}", yBonus.toString());
        }

        return this.description.replace("{", xBonus.toString());
    }

    getImageData = (): ImageData => {
        return {
            location: `UISkillIcon${this.skillIndex}`,
            width: 56,
            height: 56
        }
    }

    canBook = (): boolean => {
        return ![10,
            11,
            12,
            23,
            75,
            86,
            87,
            266,
            267,
            446,
            447,
            79].includes(this.skillIndex);
    }

    getEnhancedBonus = (): number => {
        return 0;
    }

    static fromBase = (talentName: string, talentInfo: TalentModel) => {
        switch (talentInfo.skillIndex) {
            case 43:
                return new RightHandOfActionTalent(talentName, talentInfo);
            case 59:
                return new BloodMarrowTalent(talentName, talentInfo);
            case 131:
                return new RedoxRatesTalent(talentName, talentInfo);
            case 146:
                return new ApocalypseChowTalent(talentName, talentInfo);
            case 616:
                return new BeginnerBestClassTalent(talentName, talentInfo);
            case 620:
                return new WillOfTheEldestTalent(talentName, talentInfo);
            default:
                return new Talent(talentName, talentInfo);
        }
    }
}

class BeginnerBestClassTalent extends Talent {
    private highestBeginnerLevel: number = 0;

    static preparePowerBonuses(players: readonly Player[]): void {
        let highestBeginnerLevel = 0;
        // Beginner Best Class includes every class below 6, including the numeric zero class.
        for (const player of players) {
            if (player.classId < 6) {
                highestBeginnerLevel = Math.max(highestBeginnerLevel, player.level);
            }
        }

        for (const player of players) {
            const talent = player.getTalent(616);
            if (!talent) {
                continue;
            }
            if (!(talent instanceof BeginnerBestClassTalent)) {
                throw new Error("Beginner Best Class must use its specialized talent factory.");
            }
            talent.highestBeginnerLevel = highestBeginnerLevel;
        }
    }

    getWeaponPowerBonus(): number {
        // Cap the settled talent curve at one weapon power per ten levels of the highest eligible character.
        return Math.min(this.getBonus(), Math.floor(this.highestBeginnerLevel / 10));
    }

    override resetAccountBonusInputs(): void {
        this.highestBeginnerLevel = 0;
    }

}

class WillOfTheEldestTalent extends Talent {
    private highestCharacterLevel: number = 0;

    static prepareAttributeBonuses(players: readonly Player[]): void {
        let highestCharacterLevel = 0;
        // Will Of The Eldest uses the highest character level across every class.
        for (const player of players) {
            highestCharacterLevel = Math.max(highestCharacterLevel, player.level);
        }

        for (const player of players) {
            const talent = player.getTalent(620);
            if (!talent) {
                continue;
            }
            if (!(talent instanceof WillOfTheEldestTalent)) {
                throw new Error("Will Of The Eldest must use its specialized talent factory.");
            }
            talent.highestCharacterLevel = highestCharacterLevel;
        }
    }

    getAttributeBonus(): number {
        // The attribute effect caps the ordinary talent curve at one point per ten character levels.
        return Math.min(this.getBonus(), Math.floor(this.highestCharacterLevel / 10));
    }

    override resetAccountBonusInputs(): void {
        this.highestCharacterLevel = 0;
    }
}

export const updateAttributeTalents = (accountData: Map<string, any>): void => {
    const players = accountData.get("players") as Player[];
    WillOfTheEldestTalent.prepareAttributeBonuses(players);
}

export const updatePowerTalents = (accountData: Map<string, any>): void => {
    const players = accountData.get("players") as Player[];
    BeginnerBestClassTalent.preparePowerBonuses(players);
}

export class BloodMarrowTalent extends Talent {
    totalMeals: number = 0;

    override getBonusAtLevel(level: number, round: boolean = false, yBonus: boolean = false) {
        const baselineBonus = super.getBonusAtLevel(level, round, yBonus);

        // Actual special calculation for Blood Marrow.
        return Math.pow(Math.min(1.012, 1 + (baselineBonus / 100)), this.totalMeals);
    }

    override getBonusText = (): string => {
        return `${this.getBonus()}% - ${this.totalMeals} Meals`;
    }
}

// Other potential talents with this logic are: 42, 78, 132, 281, 491,493
export class RedoxRatesTalent extends Talent {
    // Redox Rates uses allocated points in both ordinary and prepared-level evaluations.
    override getBonusAtLevel(_level: number, round: boolean = false, yBonus: boolean = false) {
        return super.getBonusAtLevel(this.pointsSpent, round, yBonus);
    }

}

export class EnhancedTalent extends Talent {
    isEnhanced: boolean = false;
}

export class RightHandOfActionTalent extends EnhancedTalent {
    getActionBonus(): number {
        // Cross-character efficiency uses allocated points, not boosted talent levels.
        return this.getBonusAtLevel(this.pointsSpent);
    }

    getRecipientBonus(source: Player, recipient: Player, skill: SkillsIndex): number {
        // Right Hand covers the nine skills from Mining through Worship.
        if (skill < SkillsIndex.Mining || skill > SkillsIndex.Worship) {
            return 0;
        }

        // Enhancement gives only the selected source twice its ordinary action bonus.
        if (source.playerID === recipient.playerID) {
            return this.isEnhanced ? 2 * this.getActionBonus() : 0;
        }

        if (recipient.skills.get(skill)!.level >= source.skills.get(skill)!.level) {
            return 0;
        }

        return this.getActionBonus();
    }
}

export const getRightHandOfActionBonus = (players: readonly Player[], recipient: Player, skill: SkillsIndex): number => {
    let source: Player | undefined;
    // Account character order selects the last Maestro or its advanced classes.
    for (const player of players) {
        if (player.classId === ClassIndex.Maestro || player.classId === ClassIndex.Voidwalker || player.classId === ClassIndex.Infinilyte) {
            source = player;
        }
    }

    if (!source) {
        return 0;
    }

    const talent = source.getTalent(43) as RightHandOfActionTalent;
    return talent.getRecipientBonus(source, recipient, skill);
}

export const updateRightHandOfActionBonuses = (accountData: Map<string, any>): void => {
    const players = accountData.get("players") as Player[];
    let enhancementBonus = 0;
    for (const player of players) {
        enhancementBonus = Math.max(enhancementBonus, player.getTalentBonus(49));
    }

    // Enhancement Eclipse unlocks Right Hand's self bonus account-wide at 175.
    for (const player of players) {
        const talent = player.getTalent(43);
        if (talent instanceof RightHandOfActionTalent) {
            talent.isEnhanced = enhancementBonus >= 175;
        }
    }
}

export class ApocalypseChowTalent extends EnhancedTalent {
    killsOver1M: number = 0;
    killsOver100M: number = 0;
    getEnhancedBonus = (): number => {
        if (!this.isEnhanced) {
            return 0;
        }

        return Math.pow(1.1, this.killsOver100M);
    }


    override getBonusText = (): string => {
        return `Enhanced: ${Math.floor(this.getEnhancedBonus())}x - ${this.killsOver100M} Apocalypses Chowed`;
    }
}

export enum ClassIndex {
    None = -1,
    Beginner = 1,
    Journeyman = 2,
    Maestro = 3,
    Voidwalker = 4,
    Infinilyte = 5,
    Warrior = 7,
    Barbarian = 8,
    Squire = 9,
    Blood_Berserker = 10,
    Divine_Knight = 12,
    Death_Bringer = 14,
    Royal_Guardian = 16,
    Archer = 19,
    Bowman = 20,
    Hunter = 21,
    Siege_Breaker = 22,
    Mayheim = 23,
    Wind_Walker = 29,
    Beast_Master = 25,
    Mage = 31,
    Wizard = 32,
    Shaman = 33,
    Elemental_Sorcerer = 34,
    Spiritual_Monk = 35,
    Bubonic_Conjuror = 36,
    Arcane_Cultist = 40
}

export const ClassTalentMap: Record<ClassIndex, string[]> = {
    [ClassIndex.None]: [],
    [ClassIndex.Beginner]: ["Beginner"],
    [ClassIndex.Journeyman]: ["Beginner", "Journeyman"],
    [ClassIndex.Maestro]: ["Beginner", "Journeyman", "Maestro"],
    [ClassIndex.Voidwalker]: ["Beginner", "Journeyman", "Maestro", "Voidwalker"],
    [ClassIndex.Infinilyte]: [],
    [ClassIndex.Warrior]: ["Rage Basics", "Warrior"],
    [ClassIndex.Barbarian]: ["Rage Basics", "Warrior", "Barbarian"],
    [ClassIndex.Squire]: ["Rage Basics", "Warrior", "Squire"],
    [ClassIndex.Blood_Berserker]: ["Rage Basics", "Warrior", "Barbarian", "Blood Berserker"],
    [ClassIndex.Death_Bringer]: ["Rage Basics", "Warrior", "Barbarian", "Blood Berserker", "Death Bringer"],
    [ClassIndex.Divine_Knight]: ["Rage Basics", "Warrior", "Squire", "Divine Knight"],
    [ClassIndex.Royal_Guardian]: ["Rage Basics", "Warrior", "Squire", "Divine Knight", "Royal Guardian"],
    [ClassIndex.Archer]: ["Calm Basics", "Archer"],
    [ClassIndex.Bowman]: ["Calm Basics", "Archer", "Bowman"],
    [ClassIndex.Hunter]: ["Calm Basics", "Archer", "Hunter"],
    [ClassIndex.Siege_Breaker]: ["Calm Basics", "Archer", "Bowman", "Siege Breaker"],
    [ClassIndex.Mayheim]: [],
    [ClassIndex.Wind_Walker]: ["Calm Basics", "Archer", "Hunter", "Beast Master", "Wind Walker"],
    [ClassIndex.Beast_Master]: ["Calm Basics", "Archer", "Hunter", "Beast Master"],
    [ClassIndex.Mage]: ["Savvy Basics", "Mage"],
    [ClassIndex.Shaman]: ["Savvy Basics", "Mage", "Shaman"],
    [ClassIndex.Wizard]: ["Savvy Basics", "Mage", "Wizard"],
    [ClassIndex.Elemental_Sorcerer]: ["Savvy Basics", "Mage", "Wizard", "Elemental Sorcerer"],
    [ClassIndex.Spiritual_Monk]: [],
    [ClassIndex.Bubonic_Conjuror]: ["Savvy Basics", "Mage", "Shaman", "Bubonic Conjuror"],
    [ClassIndex.Arcane_Cultist]: ["Savvy Basics", "Mage", "Shaman", "Bubonic Conjuror", "Arcane Cultist"],
}

const allTalents = initTalentTreeRepo();

export const GetTalentArray = (page: string): Talent[] => {
    const relevantPage = allTalents.find(talentPage => talentPage.id == page);
    if (!relevantPage) {
        return [];
    }

    return Object.entries(relevantPage?.data.talents).map(([talentName, talentInfo]) => {
        return Talent.fromBase(talentName, talentInfo);
    });
}
