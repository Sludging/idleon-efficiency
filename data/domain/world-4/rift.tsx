import { range } from "../../utility";
import { SkillsIndex } from "../SkillsIndex";
import { Domain, RawData } from "../base/domain";
import { initBuildingRepo } from "../data/BuildingRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";


const skillMasteryBonusIndex = {
    experience: 0,
    efficiency: 1,
    totalDamage: 2,
    allSkillExperience: 3,
    allSkillEfficiency: 4,
    printerOutput: 5,
    largeAllSkillExperience: 6,
} as const;

type SkillMasteryBonusIndex = typeof skillMasteryBonusIndex[keyof typeof skillMasteryBonusIndex];

/**
 * Public Skill Mastery owner slots:
 * 0 +25% skill EXP, 1 +10% skill efficiency, 2 +5% total damage,
 * 3 +10% all-skill EXP, 4 +5% all-skill efficiency, 5 +1% printer output,
 * and 6 +25% all-skill EXP.  Slots 2..6 are also the account-total effects.
 */
const defaultBonuses: Record<SkillMasteryBonusIndex, string> = {
    [skillMasteryBonusIndex.experience]: '+25%_{_EXP_GAIN',
    [skillMasteryBonusIndex.efficiency]: '+10%_{_EFFICIENCY',
    [skillMasteryBonusIndex.totalDamage]: '+5%_TOTAL_DAMAGE',
    [skillMasteryBonusIndex.allSkillExperience]: '+10%_ALL_SKILL_EXP',
    [skillMasteryBonusIndex.allSkillEfficiency]: '+5%_ALL_SKILL_EFFICIENCY',
    [skillMasteryBonusIndex.printerOutput]: '+1%_PRINTER_OUTPUT',
    [skillMasteryBonusIndex.largeAllSkillExperience]: '+25%_ALL_SKILL_EXP',
};

type SkillMasteryDisplayBonuses = Partial<Record<SkillMasteryBonusIndex, string>>;

/**
 * Sparse display overrides for special owner effects. Slot 2 grants passive
 * cards for Mining, Chopping, Fishing, Catching, Trapping, Worship, and
 * Spelunking. The other special effects are Smithing slot 1 +25% forge ore
 * capacity, Alchemy +5% liquid cap, Construction +15% shrine level-up rate,
 * Breeding +15% egg incubation speed, Sailing +15% boat speed, Divinity +15%
 * points gained, Gaming 1.15x bits, Farming 1.15x crop evolution chance,
 * Sneaking 1.10x jade coins, and Summoning 1.10x essence. Spelunking's
 * seven effects are EXP, efficiency, passive cards, max stamina, daily page
 * reads, stamina regeneration, and amber gain across slots 0..6. Omitted
 * skill/slot pairs use the defaults above; Research has no display effect.
 */
const skillMasteryDisplayOverrides: Partial<Record<SkillsIndex, SkillMasteryDisplayBonuses>> = {
    [SkillsIndex.Mining]: { [skillMasteryBonusIndex.totalDamage]: 'ALL_MINING_CARDS_ARE_NOW_PASSIVE' },
    [SkillsIndex.Smithing]: { [skillMasteryBonusIndex.efficiency]: '+25%_FORGE_ORE_CAPACITY' },
    [SkillsIndex.Chopping]: { [skillMasteryBonusIndex.totalDamage]: 'ALL_CHOPPING_CARDS_ARE_NOW_PASSIVE' },
    [SkillsIndex.Fishing]: { [skillMasteryBonusIndex.totalDamage]: 'ALL_FISHING_CARDS_ARE_NOW_PASSIVE' },
    [SkillsIndex.Alchemy]: { [skillMasteryBonusIndex.efficiency]: '+5%_ALL_LIQUID_CAP' },
    [SkillsIndex.Catching]: { [skillMasteryBonusIndex.totalDamage]: 'ALL_CATCHING_CARDS_ARE_NOW_PASSIVE' },
    [SkillsIndex.Trapping]: { [skillMasteryBonusIndex.totalDamage]: 'ALL_TRAPPING_CARDS_ARE_NOW_PASSIVE' },
    [SkillsIndex.Construction]: { [skillMasteryBonusIndex.efficiency]: '+15%_SHRINE_LV_UP_RATE' },
    [SkillsIndex.Worship]: { [skillMasteryBonusIndex.totalDamage]: 'ALL_WORSHIP_CARDS_ARE_NOW_PASSIVE' },
    [SkillsIndex.Breeding]: { [skillMasteryBonusIndex.efficiency]: '+15%_EGG_INCUBATION_SPEED' },
    [SkillsIndex.Sailing]: { [skillMasteryBonusIndex.efficiency]: '+15%_BOAT_SAILING_SPEED' },
    [SkillsIndex.Divinity]: { [skillMasteryBonusIndex.efficiency]: '+15%_DIVINITY_PTS_GAINED' },
    [SkillsIndex.Gaming]: { [skillMasteryBonusIndex.efficiency]: '1.15X_GAMING_BITS_GAINED' },
    [SkillsIndex.Farming]: { [skillMasteryBonusIndex.efficiency]: '1.15X_CROP_EVO_CHANCE' },
    [SkillsIndex.Sneaking]: { [skillMasteryBonusIndex.efficiency]: '1.10X_JADE_COIN_GAIN' },
    [SkillsIndex.Summoning]: { [skillMasteryBonusIndex.efficiency]: '1.10X_ESSENCE_GAIN' },
    [SkillsIndex.Spelunking]: {
        [skillMasteryBonusIndex.experience]: '+25%_SPELUNKING_EXP',
        [skillMasteryBonusIndex.efficiency]: '+30%_SPELUNKING_EFFICIENCY',
        [skillMasteryBonusIndex.totalDamage]: 'ALL_SPELUNKING_CARDS_ARE_NOW_PASSIVE',
        [skillMasteryBonusIndex.allSkillExperience]: '+15_MAX_STAMINA_FOR_EVERYONE',
        [skillMasteryBonusIndex.allSkillEfficiency]: '+3_DAILY_PAGE_READS',
        [skillMasteryBonusIndex.printerOutput]: '+10%_STAMINA_REGEN_RATE',
        [skillMasteryBonusIndex.largeAllSkillExperience]: '1.50x_ALL_AMBER_GAIN',
    },
};

type SkillMasteryNumericOverrides = Partial<Record<SkillMasteryBonusIndex, number>>;

/**
 * Sparse live numeric overrides. The special values are Smithing 25,
 * Alchemy 5, Construction 15, Breeding 15, Sailing 17 (despite its +15%
 * display), Divinity 15, Gaming 15, Farming 15, Sneaking 10, and Summoning
 * 10 in owner slot 1. Spelunking's seven values are 25, 30, default 5, 15,
 * 3, 10, and 50 in slots 0..6; slot 2 remains the default numeric effect
 * while its public label is the passive-card effect above.
 */
const skillMasteryNumericOverrides: Partial<Record<SkillsIndex, SkillMasteryNumericOverrides>> = {
    [SkillsIndex.Smithing]: { [skillMasteryBonusIndex.efficiency]: 25 },
    [SkillsIndex.Alchemy]: { [skillMasteryBonusIndex.efficiency]: 5 },
    [SkillsIndex.Construction]: { [skillMasteryBonusIndex.efficiency]: 15 },
    [SkillsIndex.Breeding]: { [skillMasteryBonusIndex.efficiency]: 15 },
    [SkillsIndex.Sailing]: { [skillMasteryBonusIndex.efficiency]: 17 },
    [SkillsIndex.Divinity]: { [skillMasteryBonusIndex.efficiency]: 15 },
    [SkillsIndex.Gaming]: { [skillMasteryBonusIndex.efficiency]: 15 },
    [SkillsIndex.Farming]: { [skillMasteryBonusIndex.efficiency]: 15 },
    [SkillsIndex.Sneaking]: { [skillMasteryBonusIndex.efficiency]: 10 },
    [SkillsIndex.Summoning]: { [skillMasteryBonusIndex.efficiency]: 10 },
    [SkillsIndex.Spelunking]: {
        [skillMasteryBonusIndex.experience]: 25,
        [skillMasteryBonusIndex.efficiency]: 30,
        [skillMasteryBonusIndex.allSkillExperience]: 15,
        [skillMasteryBonusIndex.allSkillEfficiency]: 3,
        [skillMasteryBonusIndex.printerOutput]: 10,
        [skillMasteryBonusIndex.largeAllSkillExperience]: 50,
    },
};

const defaultSkillBonusValues: Record<SkillMasteryBonusIndex, number> = {
    [skillMasteryBonusIndex.experience]: 25,
    [skillMasteryBonusIndex.efficiency]: 10,
    [skillMasteryBonusIndex.totalDamage]: 5,
    [skillMasteryBonusIndex.allSkillExperience]: 10,
    [skillMasteryBonusIndex.allSkillEfficiency]: 5,
    [skillMasteryBonusIndex.printerOutput]: 1,
    [skillMasteryBonusIndex.largeAllSkillExperience]: 25,
};

/**
 * The delivered RiftSkillETC source argument 0..4 maps to owner slots 2..6.
 * Every account total starts at baseline 7, including while Skill Mastery is
 * locked. The loop then visits its 18 source categories (s=0..17), which map
 * to owner SkillsIndex values s+1; Spelunking and Research are not in it.
 */
const riftSkillEtcTotalBonusIndexes: Record<number, true> = {
    [skillMasteryBonusIndex.totalDamage]: true,
    [skillMasteryBonusIndex.allSkillExperience]: true,
    [skillMasteryBonusIndex.allSkillEfficiency]: true,
    [skillMasteryBonusIndex.printerOutput]: true,
    [skillMasteryBonusIndex.largeAllSkillExperience]: true,
};
const riftSkillEtcBaselineBonus = 7;

/**
 * RiftSkillETC's source totals 0 and 2 (owner slots 2 and 4) skip these six
 * card-passive categories: s=0 Mining, 2 Chopping, 3 Fishing, 5 Catching,
 * 6 Trapping, and 8 Worship.
 */
const riftSkillEtcExcludedGameIndexes: Record<number, true> = {
    0: true,
    2: true,
    3: true,
    5: true,
    6: true,
    8: true,
};
const riftSkillEtcGameSkillCount = 18;

const smithingForgeCapacitySourceThreshold = 0;

export class RiftBonus {
    active: boolean = false;
    constructor(public index: number, public name: string, public unlockAt: number, public description: string) { }

    getBonus = () => {
        return 0;
    }

    getDescription = () => {
        return this.description;
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

// Keep all 20 SkillsIndex values in skillLevels so every category reports a
// rank. Research is the one category with no Rift Skill Mastery effects.
export class SkillMastery extends RiftBonus {

    skillLevels: Record<SkillsIndex, number> = {
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
        [SkillsIndex.Summoning]: 0,
        [SkillsIndex.Spelunking]: 0,
        [SkillsIndex.Research]: 0,
    };

    getSkillRank = (skill: SkillsIndex) => {
        if (!Object.prototype.hasOwnProperty.call(this.skillLevels, skill)) {
            return -1;
        }

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

    getBonusText = (skill: SkillsIndex, bonusIndex: number) => {
        // Research keeps its rank but has no numeric or display mastery effect.
        if (skill === SkillsIndex.Research || !Object.prototype.hasOwnProperty.call(this.skillLevels, skill)) {
            return "";
        }

        const specialBonus = skillMasteryDisplayOverrides[skill]?.[bonusIndex as SkillMasteryBonusIndex];

        if (specialBonus !== undefined) {
            return specialBonus.replace(/_/g, " ");
        }

        const defaultBonus = defaultBonuses[bonusIndex as SkillMasteryBonusIndex];
        if (defaultBonus === undefined) {
            return "";
        }

        return defaultBonus.replace(/_/g, " ").replace(/{/, skill === SkillsIndex.Intellect ? "Laboratory" : SkillsIndex[skill]);
    }

    getSkillBonus = (skill: SkillsIndex, bonusIndex: number) => {
        // Research keeps its rank but has no numeric or display mastery effect.
        if (!this.active || skill === SkillsIndex.Research || !Object.prototype.hasOwnProperty.call(this.skillLevels, skill)) {
            return 0;
        }

        const rank = this.getSkillRank(skill);
        const bonusValue = skillMasteryNumericOverrides[skill]?.[bonusIndex as SkillMasteryBonusIndex]
            ?? defaultSkillBonusValues[bonusIndex as SkillMasteryBonusIndex]
            ?? 0;

        // RiftSkillBonus returns a value when rank is above its source
        // threshold. The owner slot is normally that threshold; the live
        // SmithingEXPmulti call uses source threshold 0 for owner slot 1,
        // which is also the slot passed by the anvil consumer.
        const rankThreshold = skill === SkillsIndex.Smithing
            && bonusIndex === skillMasteryBonusIndex.efficiency
            ? smithingForgeCapacitySourceThreshold
            : bonusIndex;
        return rank > rankThreshold ? bonusValue : 0;
    }

    // RiftSkillETC's source argument 0..4 maps to owner slots 2..6 above.
    // It calls RiftSkillBonus with source thresholds 2..6 and adds each
    // rank-gated result using the corresponding default multiplier.
    getTotalBonusByIndex = (bonusIndex: number) => {
        const baseBonus = riftSkillEtcTotalBonusIndexes[bonusIndex] ? riftSkillEtcBaselineBonus : 0;

        // The delivered source keeps the baseline 7 even while Rift is locked.
        if (!this.active || baseBonus === 0) {
            return baseBonus;
        }

        const usesCardPassiveExclusions = bonusIndex === skillMasteryBonusIndex.totalDamage
            || bonusIndex === skillMasteryBonusIndex.allSkillEfficiency;
        let totalBonus = baseBonus;

        for (let gameSkillIndex = 0; gameSkillIndex < riftSkillEtcGameSkillCount; gameSkillIndex++) {
            if (usesCardPassiveExclusions && riftSkillEtcExcludedGameIndexes[gameSkillIndex]) {
                continue;
            }

            const skillIndex = (gameSkillIndex + 1) as SkillsIndex;
            totalBonus += this.getSkillBonus(skillIndex, bonusIndex);
        }

        return totalBonus;
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
            case this.buildingLevels >= 2500: return 7;
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
            case bonusIndex == 2: return this.getRank() > bonusIndex ? 2 * Math.floor((this.buildingLevels - 750) / 10) : 0;
            case bonusIndex == 3: return this.getRank() > bonusIndex ? 100 : 0;
            case bonusIndex == 4: return this.getRank() > bonusIndex ? 5 * Math.floor((this.buildingLevels - 1250) / 10) : 0;
            case bonusIndex == 5: return this.getRank() > bonusIndex ? 100 : 0;
            case bonusIndex == 6: return this.getRank() > bonusIndex ? 30 : 0;
            default: return 0;
        }
    }
}

export class KillroyPrime extends RiftBonus {
    totalKills: number = 0;
    KRBest: Record<string, number> = {}

    override getBonus = () => {
        return Math.floor(Math.pow(this.totalKills, 0.4));
    }

    getBonusText = () => {
        return `1.${this.getBonus()}x`
    }
}

export class SneakMastery extends RiftBonus {
    masteryBonuses = [
        "Gemstone Ninja Knowledge & +30% DROP RARITY",
        "New Gold Charms added & +10% ALL STAT",
        "Bargain Ninja Knowledge & +5 All Talent LV",
        "+30 Max LV for Sneaking Items & 1.10x DMG MULTI",
        "Haha yea there's no bonus here yet",
        // Mo idea why we there are more then 5 but .. guess for now I'll ignore it.
        // "Haha yea there's no bonus here yet.",
        // "Haha yea there's no bonus here yet.",
        // "Haha yea there's no bonus here yet.",
    ]
    currentMastery: number = 0;
    highestMastery: number = 0;

    getBonusByIndex = (bonusIndex: number) => {
        if (!this.active) {
            return 0;
        }

        // Can be less duplicated/smarter but I prefer it readable.
        switch (true) {
            case bonusIndex == 0: return this.currentMastery >= 1 ? 30 : 0; // Drop Rate
            case bonusIndex == 1: return this.currentMastery >= 2 ? 10 : 0; // All stat %
            case bonusIndex == 2: return this.currentMastery >= 3 ? 5 : 0; // All Talent Levels
            case bonusIndex == 3: return this.currentMastery >= 4 ? 10 : 0; // DMG Multi
            case bonusIndex == 4: return this.currentMastery >= 5 ? 0 : 0; // Nothing
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
            { key: "KRbest", perPlayer: false, default: [] },
            { key: "Lv0_", perPlayer: true, default: [] },
        ]
    }

    init(_allItems: Item[], _charCount: number) {
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
        this.bonuses.push(new KillroyPrime(9, "Killroy Prime", 51, "The most kills you have on each monster type in Killroy's Slaughterhouse is added up, resulting in your TOTAL KILLS score. The higher this is, the higher your Damage Multiplier bonus is, which applies to all characters all the time!"))
        this.bonuses.push(new SneakMastery(10, "Sneak Mastery", 56, "Once you reach the top floor of the Ninja Castle, you can restart from the bottom on a higher difficulty for increased Jade and Sneaking EXP gain, as well as a new Mastery Bonus tier! You can change which Mastery Difficulty you're on whenever you want with no penalty, don't worry."))

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
        const killroyData = data.get("KRbest") as Record<string, number>;
        const optionList = data.get("OptLacc") as number[];

        rift.level = riftData[0];
        rift.taskProgress = riftData[1];

        // General
        rift.bonuses.forEach(bonus => {
            bonus.active = rift.level >= (bonus.unlockAt - 1);
        })

        // Skill mastery
        const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;

        playerSkillLevels.forEach(playerSkills => {
            playerSkills.forEach((skillLevel, skillIndex) => {
                // Only get the indexes we care about
                if (skillIndex in skillMastery.skillLevels) {
                    skillMastery.skillLevels[skillIndex as SkillsIndex] += skillLevel;
                }
            })
        });

        // Construction Mastery
        const allBuildings = initBuildingRepo();
        const constMastery = rift.bonuses.find(bonus => bonus.name == "Construct Mastery") as ConstructionMastery;
        constMastery.buildingLevels = towerData.slice(0, allBuildings.length).reduce((sum, building) => sum += building, 0);

        // Killroy Prime
        if (killroyData) {
            const killroyPrime = rift.bonuses.find(bonus => bonus.name == "Killroy Prime") as KillroyPrime;
            killroyPrime.KRBest = killroyData;
            killroyPrime.totalKills = Object.values(killroyData).reduce((sum, killCount) => sum += killCount, 0);
        }

        // Sneak Mastery
        if (optionList.length > 232) {
            const sneakMastery = rift.bonuses.find(bonus => bonus.name == "Sneak Mastery") as SneakMastery;
            sneakMastery.currentMastery = optionList[231];
            sneakMastery.highestMastery = optionList[232];
        }
    }
}

// Need this in sneaking
//   "{}%_Stealth_@_for_all_Ninjas {}%_Jade_@_Gain {}%_Damage_@_to_Doors +}%_Gold_@_Charm_Bonus {}%_Sneak_@_EXP_Gain {}%_Bonuses_@_from_Gemstones Hi Hi".split(
//     " "
// NjGem0 - new mastery gem images
