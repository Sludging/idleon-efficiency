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
    icon: string,
    type: CategoryType
    group: CategoryGroup
}

export const TitleMap: Map<string, DisplayInfo> = new Map(Object.entries({
    "TotalMoney": {
        title: "Current Money",
        icon: "icons-2327 icons-Coins10",
        type: CategoryType.Money,
        group: CategoryGroup.Totals
    },
    "HighestLevel": {
        title: "Highest Character Level",
        icon: "icons-3541 icons-Mface46",
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "GrindTime": {
        title: "Grind Time",
        icon: "icons-7070 icons-aUpgradesY8",
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "Alchemy": {
        title: "Total Bubbles",
        icon: "icons-5656 icons-UISkillIcon492",
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "AlchemyLevel": {
        title: "Alchemy Level",
        icon: "icons-3836 icons-ClassIcons46",
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "AnvilSpeed": {
        title: "Combined Anvil Speed",
        icon: "icons-5656 icons-UISkillIcon269",
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "CatchingLevel": {
        title: "Catching Level",
        icon: "icons-3836 icons-ClassIcons47", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "ChoppingLevel": {
        title: "Chopping Level",
        icon: "icons-3836 icons-ClassIcons44", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "ConstLevel": {
        title: "Construction Level",
        icon: "icons-3836 icons-ClassIcons49", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "FishingLevel": {
        title: "Fishing Level",
        icon: "icons-3836 icons-ClassIcons45", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "SmithingLevel": {
        title: "Smithing Level",
        icon: "icons-3836 icons-ClassIcons43", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "MiningLevel": {
        title: "Mining Level",
        icon: "icons-3836 icons-ClassIcons42", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "TrappingLevel": {
        title: "Trapping Level",
        icon: "icons-3836 icons-ClassIcons48", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "WorshipLevel": {
        title: "Worship Level",
        icon: "icons-3836 icons-ClassIcons50", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "CopperSample": {
        title: "Copper Sample",
        icon: "icons-3636 icons-Copper_x1", 
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "FliesSample": {
        title: "Flies Sample",
        icon: "icons-3636 icons-Bug1_x1", 
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "GoldenFishSample": {
        title: "Golden Fish Sample",
        icon: "icons-3636 icons-Fish1_x1", 
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "OakSample": {
        title: "Oak Sample",
        icon: "icons-3636 icons-OakTree_x1", 
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "SporeSample": {
        title: "Spore Sample",
        icon: "icons-3636 icons-Grasslands1_x1", 
        type: CategoryType.Number,
        group: CategoryGroup.Samples
    },
    "TotalPrinted": {
        title: "Total Printed",
        icon: "icons-5656 icons-UISkillIcon32", 
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "LootyCount": {
        title: "Items Lootyed",
        icon: "icons-5656 icons-UISkillIcon305", 
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "HighestDamage": {
        title: "Most Damage (in 1 hit)",
        icon: "icons-3636 icons-FoodG2_x1", 
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "Stamps": {
        title: "Total Stamps Levels",
        icon: "icons-3636 icons-StampA32_x1", 
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "TotalChargeRate": {
        title: "Total Charge Rate",
        icon: "icons-5656 icons-UISkillIcon475", 
        type: CategoryType.Percent,
        group: CategoryGroup.Totals
    },
    "TotalPostOffice": {
        title: "Post Office Orders Completed",
        icon: "icons-3636 icons-SilverPen_x1", 
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "TotalSalts": {
        title: "Salts Refined",
        icon: "icons-5656 icons-UISkillIcon131", 
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
        icon: "icons-7272 icons-TaskSb5", 
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "CurrentDungeonXP": {
        title: "Dungeon XP (and rank)",
        icon: "icons-1620 icons-Dung_Rank61", 
        type: CategoryType.Dungeon,
        group: CategoryGroup.Highscore
    },
    "TotalBuildingLevels": {
        title: "Total Building Levels",
        icon: "icons-4343 icons-TaskAchC31", 
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "TotalStatueLevels": {
        title: "Total Statue Levels",
        icon: "icons-4150 icons-StatueG1", 
        type: CategoryType.Number,
        group: CategoryGroup.Totals
    },
    "ArenaWave": {
        title: "Pet Arena Round",
        icon: "icons-5050 icons-PetBullet11", 
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
    },
    "BreedingLevel": {
        title: "Breeding Level",
        icon: "icons-3836 icons-ClassIcons52", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "CookingLevel": {
        title: "Cooking Level",
        icon: "icons-3836 icons-ClassIcons51", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "LabLevel": {
        title: "Lab Level",
        icon: "icons-3836 icons-ClassIcons53", 
        type: CategoryType.Number,
        group: CategoryGroup.Skills
    },
    "W4Colo": {
        title: "Astro Colosseum - Highscore",
        icon: "icons-colosseums icons-colosseums4", 
        type: CategoryType.Number,
        group: CategoryGroup.Highscore
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