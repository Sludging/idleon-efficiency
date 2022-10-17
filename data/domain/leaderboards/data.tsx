import { ImageData } from "../imageData";

export enum CategoryType {
    Number,
    Money,
    Percent,
    Dungeon
}

export enum CategoryGroup {
    Skills,
    Samples,
    Totals,
    Highscore
}

interface DisplayInfo {
    title: string,
    icon?: string,
    imageData?: ImageData,
    type: CategoryType
    group: CategoryGroup
}

export const TitleMap: Map<string, DisplayInfo> = new Map(Object.entries({
    "TotalMoney": {
        title: "Current Money",
        imageData: {
            location: "Coins10",
            height: 32,
            width: 32
        },
        type: CategoryType.Money,
        group: CategoryGroup.Totals
    },
    "HighestLevel": {
        title: "Highest Character Level",
        imageData: {
            location: "Mface46",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "GrindTime": {
        title: "Grind Time",
        imageData: {
            location: "aUpgradesY8",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "Alchemy": {
        title: "Total Bubbles",
        imageData: {
            location: "UISkillIcon492",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "AlchemyLevel": {
        title: "Alchemy Level",
        imageData: {
            location: "ClassIcons46",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "AnvilSpeed": {
        title: "Combined Anvil Speed",
        imageData: {
            location: "UISkillIcon269",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "CatchingLevel": {
        title: "Catching Level",
        imageData: {
            location: "ClassIcons47",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "ChoppingLevel": {
        title: "Chopping Level",
        imageData: {
            location: "ClassIcons44",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "ConstLevel": {
        title: "Construction Level",
        imageData: {
            location: "ClassIcons49",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "FishingLevel": {
        title: "Fishing Level",
        imageData: {
            location: "ClassIcons45",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "SmithingLevel": {
        title: "Smithing Level",
        imageData: {
            location: "ClassIcons43",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "MiningLevel": {
        title: "Mining Level",
        imageData: {
            location: "ClassIcons42",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "TrappingLevel": {
        title: "Trapping Level",
        imageData: {
            location: "ClassIcons48",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "WorshipLevel": {
        title: "Worship Level",
        imageData: {
            location: "ClassIcons50",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "CopperSample": {
        title: "Copper Sample",
        imageData: {
            location: "Copper",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "FliesSample": {
        title: "Flies Sample",
        imageData: {
            location: "Bug1",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "GoldenFishSample": {
        title: "Golden Fish Sample",
        imageData: {
            location: "Fish1",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "OakSample": {
        title: "Oak Sample",
        imageData: {
            location: "OakTree",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "SporeSample": {
        title: "Spore Sample",
        imageData: {
            location: "Grasslands1",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "TotalPrinted": {
        title: "Total Printed",
        imageData: {
            location: "UISkillIcon32",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "LootyCount": {
        title: "Items Lootyed",
        imageData: {
            location: "UISkillIcon305",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "HighestDamage": {
        title: "Most Damage (in 1 hit)",
        imageData: {
            location: "FoodG2",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "Stamps": {
        title: "Total Stamps Levels",
        imageData: {
            location: "StampA32",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "TotalChargeRate": {
        title: "Total Charge Rate",
        imageData: {
            location: "UISkillIcon475",
            height: 32,
            width: 32
        },
        type: CategoryType.Percent,
        group: CategoryGroup.Totals
    },
    "TotalPostOffice": {
        title: "Post Office Orders Completed",
        imageData: {
            location: "SilverPen",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "TotalSalts": {
        title: "Salts Refined",
        imageData: {
            location: "UISkillIcon131",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },

    "W1Colo": {
        title: "Dewdrop Colosseum - Highscore",
        icon: "icons-colosseums icons-colosseums1",
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "W2Colo": {
        title: "Sandstone Colosseum - Highscore",
        icon: "icons-colosseums icons-colosseums2",
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "W3Colo": {
        title: "Chillsnap Colosseum - Highscore",
        icon: "icons-colosseums icons-colosseums3", 
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "Family": {
        title: "Family Level",
        imageData: {
            location: "TaskSb5",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "CurrentDungeonXP": {
        title: "Dungeon XP (and rank)",
        imageData: {
            location: "Dung_Rank61",
            height: 32,
            width: 32
        },
        type: CategoryType.Dungeon,
        group: CategoryGroup.Highscore
    },
    "TotalBuildingLevels": {
        title: "Total Building Levels",
        imageData: {
            location: "TaskAchC31",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "TotalStatueLevels": {
        title: "Total Statue Levels",
        imageData: {
            location: "StatueG1",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "ArenaWave": {
        title: "Pet Arena Round",
        imageData: {
            location: "PetBullet11",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "BreedingLevel": {
        title: "Breeding Level",
        imageData: {
            location: "ClassIcons52",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "CookingLevel": {
        title: "Cooking Level",
        imageData: {
            location: "ClassIcons51",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "LabLevel": {
        title: "Lab Level",
        imageData: {
            location: "ClassIcons53",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "W4Colo": {
        title: "Astro Colosseum - Highscore",
        icon: "icons-colosseums icons-colosseums4", 
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "TotalCookingSpeed": {
        title: "Combined Cooking Speed",
        imageData: {
            location: "Ladle_x1",
            height: 32,
            width: 32
        },
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
}));

export interface Metadata {
    TotalProfiles: number
    UpdatedRecently: number
}

export interface LeaderboardsData {
    data: CategoryData[]
    metadata: Metadata
}

export interface CategoryData {
    Category: string
    Entries: Map<string, number>
    UpdatedAt: number
}