import { lavaFunc } from "../utility";
import { initTalentTreeRepo } from "./data/TalentTreeRepo";
import { ImageData } from "./imageData";
import { TalentModel } from "./model/talentModel";

export const TalentConst = {
    NearbyOutletIndex: 478,
    ChargeSiphonIndex: 475,
    CrystalSpawnIndex: 26,
    CrystalForDaysIndex: 619,
    ArenaSpiritIndex: 370
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

    getBonus = (round: boolean = false, yBonus: boolean = false, maxBonus: boolean = false) => {
        const level = maxBonus ? this.maxLevel : this.level
        if (yBonus) {
            return lavaFunc(this.funcY, level, this.y1, this.y2, round);
        }
        return lavaFunc(this.funcX, level, this.x1, this.x2, round);
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

    static fromBase = (talentName: string, talentInfo: TalentModel) => {
        return new Talent(talentName, talentInfo);
    }
}

export enum ClassIndex {
    Beginner = 1,
    Journeyman = 2,
    Maestro = 3,
    Voidwalker = 4,
    Infinilyte = 5,
    Warrior = 7,
    Barbarian = 8,
    Squire = 9,
    Blood_Berserker = 10,
    Death_Bringer = 11,
    Divine_Knight = 12,
    Royal_Guardian = 13,
    Archer = 19,
    Bowman = 20,
    Hunter = 21,
    Siege_Breaker = 22,
    Mayheim = 23,
    Wind_Walker = 24,
    Beast_Master = 25,
    Mage = 31,
    Wizard = 32,
    Shaman = 33,
    Elemental_Sorcerer = 34,
    Spiritual_Monk = 35,
    Bubonic_Conjuror = 36,
    Arcane_Cultist = 37
}

export const ClassTalentMap: Record<ClassIndex, string[]> = {
    [ClassIndex.Beginner]: ["Beginner"],
    [ClassIndex.Journeyman]: ["Beginner", "Journeyman"],
    [ClassIndex.Maestro]: ["Beginner", "Journeyman", "Maestro"],
    [ClassIndex.Voidwalker]: ["Beginner", "Journeyman", "Maestro", "Voidwalker"],
    [ClassIndex.Infinilyte]: [],
    [ClassIndex.Warrior]: ["Rage Basics", "Warrior"],
    [ClassIndex.Barbarian]: ["Rage Basics", "Warrior", "Barbarian"],
    [ClassIndex.Squire]: ["Rage Basics", "Warrior", "Squire"],
    [ClassIndex.Blood_Berserker]: ["Rage Basics", "Warrior", "Barbarian", "Blood Berserker"],
    [ClassIndex.Death_Bringer]: [],
    [ClassIndex.Divine_Knight]: ["Rage Basics", "Warrior", "Squire", "Divine Knight"],
    [ClassIndex.Royal_Guardian]: [],
    [ClassIndex.Archer]: ["Calm Basics", "Archer"],
    [ClassIndex.Bowman]: ["Calm Basics", "Archer", "Bowman"],
    [ClassIndex.Hunter]: ["Calm Basics", "Archer", "Hunter"],
    [ClassIndex.Siege_Breaker]: ["Calm Basics", "Archer", "Bowman", "Siege Breaker"],
    [ClassIndex.Mayheim]: [],
    [ClassIndex.Wind_Walker]: [],
    [ClassIndex.Beast_Master]: ["Calm Basics", "Archer", "Hunter", "Beast Master"],
    [ClassIndex.Mage]: ["Savvy Basics", "Mage"],
    [ClassIndex.Shaman]: ["Savvy Basics", "Mage", "Shaman"],
    [ClassIndex.Wizard]: ["Savvy Basics", "Mage", "Wizard"],
    [ClassIndex.Elemental_Sorcerer]: ["Savvy Basics", "Mage", "Wizard", "Elemental Sorcerer"],
    [ClassIndex.Spiritual_Monk]: [],
    [ClassIndex.Bubonic_Conjuror]: ["Savvy Basics", "Mage", "Shaman", "Bubonic Conjuror"],
    [ClassIndex.Arcane_Cultist]: [],
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

