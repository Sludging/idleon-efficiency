export enum CategoryType {
    Number,
    Money,
    Percent
}

interface DisplayInfo {
    title: string,
    icon: string,
    type: CategoryType
}

export const TitleMap: Map<string, DisplayInfo> = new Map(Object.entries({
    "TotalMoney": {
        title: "Current Money",
        icon: "icons-2327 icons-Coins10",
        type: CategoryType.Money
    },
    "HighestLevel": {
        title: "Highest Character Level",
        icon: "icons-3541 icons-Mface46",
        type: CategoryType.Number
    },
    "GrindTime": {
        title: "Grind Time",
        icon: "icons-7070 icons-aUpgradesY8",
        type: CategoryType.Number
    },
    "Alchemy": {
        title: "Total Bubbles",
        icon: "icons-5656 icons-UISkillIcon492",
        type: CategoryType.Number
    },
    "AlchemyLevel": {
        title: "Alchemy Level",
        icon: "icons-3836 icons-ClassIcons46",
        type: CategoryType.Number
    },
    "AnvilSpeed": {
        title: "Combined Anvil Speed",
        icon: "icons-5656 icons-UISkillIcon269",
        type: CategoryType.Number
    },
    "CatchingLevel": {
        title: "Catching Level",
        icon: "icons-3836 icons-ClassIcons47", 
        type: CategoryType.Number
    },
    "ChoppingLevel": {
        title: "Chopping Level",
        icon: "icons-3836 icons-ClassIcons44", 
        type: CategoryType.Number
    },
    "ConstLevel": {
        title: "Construction Level",
        icon: "icons-3836 icons-ClassIcons49", 
        type: CategoryType.Number
    },
    "FishingLevel": {
        title: "Fishing Level",
        icon: "icons-3836 icons-ClassIcons45", 
        type: CategoryType.Number
    },
    "SmithingLevel": {
        title: "Smithing Level",
        icon: "icons-3836 icons-ClassIcons43", 
        type: CategoryType.Number
    },
    "MiningLevel": {
        title: "Mining Level",
        icon: "icons-3836 icons-ClassIcons42", 
        type: CategoryType.Number
    },
    "TrappingLevel": {
        title: "Trapping Level",
        icon: "icons-3836 icons-ClassIcons48", 
        type: CategoryType.Number
    },
    "WorshipLevel": {
        title: "Worship Level",
        icon: "icons-3836 icons-ClassIcons50", 
        type: CategoryType.Number
    },
    "CopperSample": {
        title: "Copper Sample",
        icon: "icons-3636 icons-Copper_x1", 
        type: CategoryType.Number
    },
    "FliesSample": {
        title: "Flies Sample",
        icon: "icons-3636 icons-Bug1_x1", 
        type: CategoryType.Number
    },
    "GoldenFishSample": {
        title: "Golden Fish Sample",
        icon: "icons-3636 icons-Fish1_x1", 
        type: CategoryType.Number
    },
    "OakSample": {
        title: "Oak Sample",
        icon: "icons-3636 icons-OakTree_x1", 
        type: CategoryType.Number
    },
    "SporeSample": {
        title: "Spore Sample",
        icon: "icons-3636 icons-Grasslands1_x1", 
        type: CategoryType.Number
    },
    "TotalPrinted": {
        title: "Total Printed",
        icon: "icons-5656 icons-UISkillIcon32", 
        type: CategoryType.Number
    },
    "LootyCount": {
        title: "Items Lootyed",
        icon: "icons-5656 icons-UISkillIcon305", 
        type: CategoryType.Number
    },
    "HighestDamage": {
        title: "Most Damage (in 1 hit)",
        icon: "icons-3636 icons-FoodG2_x1", 
        type: CategoryType.Number
    },
    "Stamps": {
        title: "Total Stamps Levels",
        icon: "icons-3636 icons-StampA34_x1", 
        type: CategoryType.Number
    },
    "TotalChargeRate": {
        title: "Total Charge Rate",
        icon: "icons-5656 icons-UISkillIcon475", 
        type: CategoryType.Percent
    },
    "TotalPostOffice": {
        title: "Post Office Orders Completed",
        icon: "icons-3636 icons-SilverPen_x1", 
        type: CategoryType.Number
    },
    "TotalSalts": {
        title: "Salts Refined",
        icon: "icons-5656 icons-UISkillIcon131", 
        type: CategoryType.Number
    },

    "W1Colo": {
        title: "Dewdrop Colosseum - Highscore",
        icon: "icons-colosseums icons-colosseums1", 
        type: CategoryType.Number
    },
    "W2Colo": {
        title: "Sandstone Colosseum - Highscore",
        icon: "icons-colosseums icons-colosseums2", 
        type: CategoryType.Number
    },
    "W3Colo": {
        title: "Chillsnap Colosseum - Highscore",
        icon: "icons-colosseums icons-colosseums3", 
        type: CategoryType.Number
    },
    "Family": {
        title: "Family Level",
        icon: "icons-7272 icons-TaskSb5", 
        type: CategoryType.Number
    },
}));

export interface LeaderboardsData {
    data: CategoryData[]
}

export interface CategoryData {
    Category: string
    Entries: Map<string, number>
}