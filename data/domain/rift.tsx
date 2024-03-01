import { range } from "../utility";
import { SkillsIndex } from "./SkillsIndex";
import { Domain, RawData } from "./base/domain";
import { initBuildingRepo } from "./data/BuildingRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";


const defaultBonuses = [
    '+25%_{_EXP_GAIN',
    '+10%_{_EFFICIENCY',
    '+5%_TOTAL_DAMAGE',
    '+10%_ALL_SKILL_EXP',
    '+5%_ALL_SKILL_EFFICIENCY',
    '+1%_PRINTER_OUTPUT',
    '+25%_ALL_SKILL_EXP',
];

const specialBonuses: Map<SkillsIndex, string> = new Map([
    [SkillsIndex.Mining, 'ALL_MINING_CARDS_ARE_NOW_PASSIVE'],
    [SkillsIndex.Fishing, 'ALL_FISHING_CARDS_ARE_NOW_PASSIVE'],
    [SkillsIndex.Chopping, 'ALL_CHOPPING_CARDS_ARE_NOW_PASSIVE'],
    [SkillsIndex.Catching, 'ALL_CATCHING_CARDS_ARE_NOW_PASSIVE'],
    [SkillsIndex.Trapping, 'ALL_TRAPPING_CARDS_ARE_NOW_PASSIVE'],
    [SkillsIndex.Smithing, "+25%_FORGE_ORE_CAPACITY"],
    [SkillsIndex.Alchemy, "+5%_ALL_LIQUID_CAP"],
    [SkillsIndex.Construction, "+15%_SHRINE_LV_UP_RATE"],
    [SkillsIndex.Worship, "ALL_WORSHIP_CARDS_ARE_NOW_PASSIVE"],
    [SkillsIndex.Breeding, "+15%_EGG_INCUBATION_SPEED"],
    [SkillsIndex.Sailing, "+15%_BOAT_SAILING_SPEED"],
    [SkillsIndex.Divinity, "+15%_DIVINITY_PTS_GAINED"],
    [SkillsIndex.Gaming, "1.15X_GAMING_BITS_GAINED"],
    [SkillsIndex.Farming, "1.15X_CROP_EVO_CHANCE"],
    [SkillsIndex.Sneaking, "1.10X_JADE_COIN_GAIN"],
    [SkillsIndex.Summoning, "1.10X_ESSENCE_GAIN"],
]);

export class RiftBonus {
    active: boolean = false;
    constructor(public index: number, public name: string, public unlockAt: number, public description: string) { }

    getBonus = () => {
        return 0;
    }

    getImageData = (): ImageData => {
        return {
            location: `RiftBonus${this.index}`,
            height: 50,
            width: 50,
        }
    }
}

export class InfiniteStarsBonus extends RiftBonus {
    shinyBonus: number = 0;

    override getBonus = () => {
        return 5 + this.shinyBonus;
    }
}

// Use a typeguard to prove a skill index is a valid rift mastery skill
const isRiftMasterySkill = (x: SkillsIndex): x is RiftMasterySkills => true;

// Leaving this in case in need of hiding some other skills
type RiftMasterySkills = SkillsIndex
export class SkillMastery extends RiftBonus {

    skillLevels: Record<RiftMasterySkills, number> = {
        [SkillsIndex.Mining]: 0,
        [SkillsIndex.Smithing]: 0,
        [SkillsIndex.Chopping]: 0,
        [SkillsIndex.Fishing]: 0,
        [SkillsIndex.Alchemy]: 0,
        [SkillsIndex.Catching]: 0,
        [SkillsIndex.Trapping]: 0,
        [SkillsIndex.Construction]: 0,
        [SkillsIndex.Worship]: 0,
        [SkillsIndex.Cooking]: 0,
        [SkillsIndex.Breeding]: 0,
        [SkillsIndex.Intellect]: 0,
        [SkillsIndex.Sailing]: 0,
        [SkillsIndex.Divinity]: 0,
        [SkillsIndex.Gaming]: 0,
        [SkillsIndex.Farming]: 0,
        [SkillsIndex.Sneaking]: 0,
        [SkillsIndex.Summoning]: 0
    };

    getSkillRank = (skill: SkillsIndex) => {
        if (isRiftMasterySkill(skill)) {
            const level = this.skillLevels[skill];
            switch (true) {
                case level < 150: return 0;
                case level < 200: return 1;
                case level < 300: return 2;
                case level < 400: return 3;
                case level < 500: return 4;
                case level < 750: return 5;
                case level < 1000: return 6;
                case level >= 1000: return 7;
                default: return -1;
            }
        }

        return -1;
    }

    getBonusText = (skill: SkillsIndex, bonusIndex: number) => {
        // Some skills override the 2nd bonus, the others the third one.
        const specialIndex = [
            SkillsIndex.Smithing,
            SkillsIndex.Alchemy,
            SkillsIndex.Construction,
            SkillsIndex.Breeding,
            SkillsIndex.Sailing,
            SkillsIndex.Divinity,
            SkillsIndex.Gaming,
            SkillsIndex.Farming,
            SkillsIndex.Sneaking,
            SkillsIndex.Summoning
        ].includes(skill) ? 1 : 2;
        // If it's the special bonus and we have an override for that skill, get the special text.
        if (bonusIndex == specialIndex && specialBonuses.has(skill)) {
            return specialBonuses.get(skill)!.replace(/_/g, " ");
        }

        return defaultBonuses[bonusIndex].replace(/_/g, " ").replace(/{/, skill == SkillsIndex.Intellect ? "Laboratory" : SkillsIndex[skill]);
    }

    getSkillBonus = (skill: SkillsIndex, bonusIndex: number) => {
        if (!this.active) {
            return 0;
        }

        // Can be less duplicated/smarter but I prefer it readable.
        switch (true) {
            case bonusIndex == 0: return this.getSkillRank(skill) > bonusIndex ? 25 : 0;
            case bonusIndex == 2: return this.getSkillRank(skill) > bonusIndex ? 5 : 0;
            case bonusIndex == 3: return this.getSkillRank(skill) > bonusIndex ? 10 : 0;
            case bonusIndex == 4: return this.getSkillRank(skill) > bonusIndex ? 5 : 0;
            case bonusIndex == 5: return this.getSkillRank(skill) > bonusIndex ? 1 : 0;
            case bonusIndex == 6: return this.getSkillRank(skill) > bonusIndex ? 25 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Smithing: return this.getSkillRank(skill) > bonusIndex ? 25 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Alchemy: return this.getSkillRank(skill) > bonusIndex ? 5 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Construction: return this.getSkillRank(skill) > bonusIndex ? 15 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Breeding: return this.getSkillRank(skill) > bonusIndex ? 15 : 0;
            // Lava says 15 but he gives 17
            case bonusIndex == 1 && skill == SkillsIndex.Sailing: return this.getSkillRank(skill) > bonusIndex ? 17 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Divinity: return this.getSkillRank(skill) > bonusIndex ? 15 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Gaming: return this.getSkillRank(skill) > bonusIndex ? 15 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Farming: return this.getSkillRank(skill) > bonusIndex ? 15 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Sneaking: return this.getSkillRank(skill) > bonusIndex ? 10 : 0;
            case bonusIndex == 1 && skill == SkillsIndex.Summoning: return this.getSkillRank(skill) > bonusIndex ? 10 : 0;
            // This is basically a boolean for the passive cards, 1 = active. Likely won't be used in code but just safer to handle.
            case bonusIndex == 1 && specialBonuses.has(skill): return this.getSkillRank(skill) > bonusIndex ? 1 : 0;
            // Only thing left should be the skill efficiency, so 10%.
            default: return this.getSkillRank(skill) > bonusIndex ? 10 : 0;
        }
    }

    // RiftSkillETC function is used for:
    // 0 -> which translates to 2 -> which is dmg which I don't care about yet.
    // 2 -> which translates to 4 -> which is all skill eff which I don't care about yet.
    // 1,4 -> which translate to 3,6 -> which is all skill xp which I do care about.
    // 3 -> which translates to 5 -> which is printer output which I care about
    //
    // All of the above give a baseline of 7 (even if you haven't unlocked rift), and then sum up their respective bonuses across all skills
    //
    // All other bonuses should just give their respective skill bonus based on their text
    getTotalBonusByIndex = (bonusIndex: number) => {
        // The first 2 bonuses don't make sense as totals, so just for sanity sake return 0 here.
        if ([0, 1].includes(bonusIndex)) {
            return 0;
        }

        const baseBonus = [2, 3, 4, 5, 6].includes(bonusIndex) ? 7 : 0;

        // Yes we get a base bonus of 7 on some things even if rift isn't active
        if (!this.active) {
            return baseBonus;
        }

        return Object.entries(this.skillLevels).reduce((sum, [_, skill]) => sum += this.getSkillBonus(skill, bonusIndex), baseBonus);
    }
}

export class ConstructionMastery extends RiftBonus {
    bonuseText = [
        "+1%_REFINERY_SPD_PER_10_TOT_LV",
        "+35_MAX_LV_FOR_TRAPPER_DRONE",
        "+2%_DMG_PER_10_TOT_LV_OVER_750",
        "+100_MAX_LV_FOR_TALENT_LIBRARY",
        "+5%_BUILD_SPD_PER_10_TOT_LV_OVER_1250",
        "+100_MAX_LV_FOR_ALL_SHRINES",
        "+30_MAX_LV_FOR_ALL_WIZARD_TOWERS"
    ]

    buildingLevels: number = 0;
    getRank = () => {
        switch (true) {
            case this.buildingLevels < 250: return 0;
            case this.buildingLevels < 500: return 1;
            case this.buildingLevels < 750: return 2;
            case this.buildingLevels < 1000: return 3;
            case this.buildingLevels < 1250: return 4;
            case this.buildingLevels < 1500: return 5;
            case this.buildingLevels < 2500: return 6;
            default: return -1;
        }
    }

    getBonusText = (bonusIndex: number) => {
        return this.bonuseText[bonusIndex].replace(/_/g, " ");
    }

    getBonusByIndex = (bonusIndex: number) => {
        if (!this.active) {
            return 0;
        }

        // Can be less duplicated/smarter but I prefer it readable.
        // This also doesn't align with Lava's code because he uses different indexes for different bonuses
        switch (true) {
            case bonusIndex == 0: return this.getRank() > bonusIndex ? Math.floor(this.buildingLevels / 10) : 0;
            case bonusIndex == 1: return this.getRank() > bonusIndex ? 35 : 0;
            case bonusIndex == 2: return this.getRank() > bonusIndex ? 2 * ((this.buildingLevels - 750) / 10) : 0;
            case bonusIndex == 3: return this.getRank() > bonusIndex ? 100 : 0;
            case bonusIndex == 4: return this.getRank() > bonusIndex ? 5 * ((this.buildingLevels - 1250) / 10) : 0;
            case bonusIndex == 5: return this.getRank() > bonusIndex ? 100 : 0;
            case bonusIndex == 6: return this.getRank() > bonusIndex ? 30 : 0;
            default: return 0;
        }
    }
}


export class Rift extends Domain {
    level: number = 0;
    taskProgress: number = 0;

    bonuses: RiftBonus[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "Rift", perPlayer: false, default: [] },
            { key: "Tower", perPlayer: false, default: [] },
            { key: "Lv0_", perPlayer: true, default: [] },
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.bonuses = [];
        this.bonuses.push(new RiftBonus(0, "Trap Box Vacuum", 6, "The trapper drone in World 3 will automatically collect traps every 24 hours, and will deposit the critters into your Storage Chest if there is space. @ The EXP from the Traps goes to the one who placed the traps."))
        this.bonuses.push(new InfiniteStarsBonus(1, "Infinite Stars", 11, "Permanently transforms Star Signs into Infinite Star Signs, which always give their bonus AND don't give the negatives. Infinite Star Signs are indicated by a little infinity icon, and are transformed in a specific order, so you don't get to choose. Get more from Shiny Pets in Breeding..."))
        this.bonuses.push(new SkillMastery(2, "Skill Mastery", 16, "Lava didn't bother with a description for this one. Get bonuses based on total level of your skills across all characters."))
        this.bonuses.push(new RiftBonus(3, "Eclipse Skulls", 21, "You can now get Eclipse Skulls in Deathnote, unlocked at 1,000,000,000 kills. Eclipse Skulls are worth 20 points, and you also get +5% Multiplicative Damage."))
        this.bonuses.push(new RiftBonus(4, "Stamp Mastery", 26, "Every 100 total levels of all your stamps, you get a 1% chance to get a 'Gilded Stamp' 95% Reduction in Stamp Upgrade costs. This chance happens every day you log in, and they stack for whenever you want to use them!"))
        this.bonuses.push(new RiftBonus(5, "Eldritch Artifact", 31, "You can now get Eldritch Artifacts from sailing, but only if you've found the Ancient form first."))
        this.bonuses.push(new RiftBonus(6, "Vial Mastery", 36, "Each Gold Crown Vial you have, which is the 13th and final vial you upgrade to for 1 Billion Resource, now gives you a 1.02x boost to ALL Vial Bonuses!"))
        this.bonuses.push(new ConstructionMastery(7, "Construct Mastery", 41, "Lava didn't bother with a description for this one. Get bonuses based on total level of your buildings in construction."))
        this.bonuses.push(new RiftBonus(8, "Ruby Cards", 46, "You can now level up your cards to Lv 6. Yea, you'd think it would be Lv 5 but remember, 0 stars is actually Lv 1. So yea, Ruby Cards are 5 star cards, which means they are technically lv 6!"))

        return this;
    }

    parse(data: Map<string, any>): void {
        const rift = data.get(this.getDataKey()) as Rift;

        // init again to reset the data set;
        // TODO: This is very ugly, need to do better.
        rift.init([], 0);

        const charCount = data.get("charCount") as number;

        const riftData = data.get("Rift") as number[];
        const playerSkillLevels = range(0, charCount).map((_, i) => { return data.get(`Lv0_${i}`) }) as number[][];
        const towerData = data.get("Tower") as number[];

        rift.level = riftData[0];
        rift.taskProgress = riftData[1];

        rift.bonuses.forEach(bonus => {
            bonus.active = rift.level >= (bonus.unlockAt - 1);
        })

        const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;

        playerSkillLevels.forEach(playerSkills => {
            playerSkills.forEach((skillLevel, skillIndex) => {
                // Only get the indexes we care about
                if (skillIndex in skillMastery.skillLevels) {
                    skillMastery.skillLevels[skillIndex as RiftMasterySkills] += skillLevel;
                }
            })
        });

        const allBuildings = initBuildingRepo();
        const constMastery = rift.bonuses.find(bonus => bonus.name == "Construct Mastery") as ConstructionMastery;
        constMastery.buildingLevels = towerData.slice(0, allBuildings.length).reduce((sum, building) => sum += building, 0);
    }
}