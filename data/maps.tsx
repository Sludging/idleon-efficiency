interface NumberMap { [key: number]: string; }

const IDforETCbonus: NumberMap = {
        1:"%_MOVEMENT_SPEED",
        2:"%_DROP_CHANCE",
        3:"%_MONEY",
        4:"%_XP_FROM_MONSTERS",
        5:"%_BOSS_DAMAGE",
        6:"%_MULTI-LOG_CHANCE",
        7:"%_DEFENCE",
        8:"%_GOLD_FOOD_EFFECT",
        9:"%_FOOD_EFFECT",
        10:"%_MINING_EFFICINCY",
        11:"%_CHOP_EFFICIENCY",
        12:"_YELLOW_DEPTH",
        13:"_RED_DEPTH",
        14:"_PURPLE_DEPTH",
        15:"%_MAX_HP",
        16:"_BASE_DAMAGE",
        17:"%_LUK",
        18:"%_CATCH_EFFICINCY",
        19:"%_FISHIN_EFFICINCY",
        20:"%_FIGHT_AFK_GAIN",
        21:"%_MASTERY",
        22:"%_CRIT_DAMAGE",
        23:"%_CRIT_CHANCE",
        24:"%_SKILL_AFK_GAIN",
        25:"%_AGI",
        26:"%_CARD_DROP_CHANCE",
        27:"%_SKILL_EXP",
        28:"_ACCURACY",
        29:"%_MULTIKILL",
        30:"%_BUILD_SPD",
        45:"%_TOTAL_DAMAGE",
        46:"%_ALL_STATS",
        47:"%_MOB_RESPAWN",
        48:"%_SKILL_EFFICIENCY",
        49:"%_FISHING_XP_GAIN",
        50:"_BASE_DEFENCE",
        51:"_STR",
        52:"_AGI",
        53:"_WIS",
        54:"_LUK",
        55:"%_MINING_XP_GAIN",
        56:"%_BASIC_ATK_SPEED",
        57:"%_STR",
        58:"%_WIS",
        59:"%_ALL_AFK_GAIN",
        60:"%_SAMPLE_SIZE",
        61:"%_ALL_SKILL_SPEED",
        31:"%_CRIT_CHANCE_",
        32:"%_TOTAL_DAMAGE_",
        33:"%_BOSS_DAMAGE_",
        34:"%_MASTERY_",
        35:"%_CRIT_DMG_",
        36:"%_MOVE_SPEED_",
        37:"%_TOTAL_HP_",
        38:"%_TOTAL_MP_",
        39:"%_BLOCK_CHANCE",
        40:"%_CASH_FROM_MOBS",
        41:"%_DROP_CHANCE",
        42:"%_RNG_ITEM_LUCK",
};

const IDforCardBonus: NumberMap = {
        1: "+{_Base_HP",
        2: "+{_Base_LUK",
        3: "+{_Base_MP",
        4: "+{_Base_Damage",
        5: "+{_Base_WIS",
        6: "+{_Move_Spd",
        7: "+{_Base_AGI",
        8: "+{%_Total_HP",
        9: "+{_Base_STR",
        10: "+{%_Total_Drop_Rate",
        11: "+{%_Money_from_Monsters",
        12: "+{%_Card_Drop_Chance",
        13: "+{%_Critical_Chance",
        14: "+{%_Crystal_Mob_Spawn_Chance",
        15: "+{%_Defence_from_Equipment",
        16: "+{%_To_not_consume_Food",
        17: "+{%_Total_Accuracy",
        18: "+{_Weapon_Power",
        19: "+{%_Critical_Damage",
        20: "+{%_Monster_EXP_While_Active",
        21: "+{%_Minimum_Damage",
        22: "+{%_EXP_Conversion_from_Talent",
        23: "+{_Base_accuracy",
        24: "+{%_Total_Mining_Efficiency",
        25: "+{%_Mining_EXP",
        26: "+{_Base_Defence",
        27: "+{%_Total_Choppin_Efficiency",
        28: "+{%_Choppin_EXP",
        29: "+{%_Total_MP",
        30: "+{%_Total_Fishing_Efficiency",
        31: "+{%_Fishing_EXP",
        32: "+{%_Total_Catching_Efficiency",
        33: "+{%_Mining_Away_Gains",
        34: "+{%_Mining_Speed",
        35: "+{%_NOTHING",
        36: "+{%_Choppin_Away_Gains",
        37: "+{%_Choppin_Speed",
        38: "+Blank",
        39: "+{%_Fishing_Away_Gains",
        40: "+{%_Catching_EXP",
        41: "+{%_Catching_Away_Gains",
        42: "+{%_Total_Damage",
        43: "+{%_Fighting_AFK_gain_rate",
        44: "+{%_EXP_from_monsters",
        45: "+{%_Fishing_Speed",
        46: "+{%_Skill_AFK_gain_rate",
        47: "+{%_Double_AFK_claim_chance",
        48: "+{%_Boost_Food_Effect",
        49: "+{%_Smithing_EXP",
        50: "+{%_Skill_EXP",
        51: "+{%_MP_regen_rate",
        52: "+{%_Max_Charge",
        53: "+{%_Shiny_Critter_Chance",
        54: "+{%_Charge_Rate",
        55: "+{_Starting_Pts_in_Worship",
        56: "+{%_Base_HP",
        57: "+{%_Trapping_Efficiency",
        58: "+{%_Trapping_EXP",
        59: "+{%_Shrine_Effects",
        60: "+{%_Cog_Build_Spd_(Passive)",
        61: "+{_Base_Dungeon_MP",
        62: "+{%_Block_Chance",
        63: "+{_Base_Dungeon_Damage",
        64: "+{%_Dungeon_Card_Chance",
        65: "+{%_Dungeon_Credits",
        66: "{%_to_start_with_RNG_item",
        67: "+{%_Dungeon_Flurbos",
        68: "+{_Base_Dungeon_HP",
        69: "+{%_Dungeon_Money",
        70: "+{%_RNG_item_rarity",
        71: "+{%_Dungeon_Boss_Dmg",
        72: "+{%_Total_Dungeon_Dmg",
        73: "+{%_Dungeon_MP_regen",
        74: "+{%_Dungeon_Drop_Rate",
        75: "+{%_Catching_Speed",
        76: "+{%_Breeding_EXP_(Passive)",
        77: "+{%_Kitchen_Speed_(Passive)",
        78: "+{_Star_Talent_Pts_(Passive)",
        79: "+{%_Lab_EXP_gain",
        80: "+{%_Multikill_per_tier",
        81: "+{%_Critical_Chance_(Passive)",
        82: "+{%_All_Stat",
        83: "+{px_Line_Width_(Passive)",
        84: "+{%_All_Skill_Efficiency",
        85: "+{%_Cooking_EXP_gain",
        86: "+{%_Dungeon_Move_Speed",
        87: "+{%_Sailing_Speed_(Passive)",
        88: "+{%_Skill_EXP_(Passive)",
        89: "+{%_Divinity_EXP_(Passive)",
        90: "+{%_Money_from_mobs_(Passive)",
        91: "+{_Weapon_Power_(Passive)",
        92: "+{%_Sailing_Speed_(Passive)",
        93: "+{%_Skill_Efficncy_(Passive)",
        94: "+{%_Class_EXP_(Passive)",
        95: "+{%_All_Skill_EXP_(Passive)"
}

const IDforCardSETbonus: NumberMap = {
        0: "{%_EXP_if_below_Lv_50",
        1: "{%_All_Food_Effect",
        2: "{%_Skill_Efficiency",
        3: "{%_Skill_EXP_Gain",
        4: "{%_DEF_and_ACC",
        5: "{%_Dmg,_Drop,_and_EXP",
        6: "{%_Drop_Rate",
        7: "{%_Skill_AFK_Gain_Rate",
        8: "{%_more_Dungeon_Credits",
        9: "{%_Crit_Chance",
        10: "{%_Fight_AFK_Gain_Rate",
}

const classMap = new Map(Object.entries({
    1: "Beginner",
    2: "Journeyman",
    3: "Maestro",
    4: "Virtuoso",
    5: "Infinilyte",
    6: "Rage Basics",
    7: "Warrior",
    8: "Barbarian",
    9: "Squire",
    10: "Blood Berserker",
    11: "Death Bringer",
    12: "Divine Knight",
    13: "Royal Guardian",
    14: "Filler",
    15: "Filler",
    16: "Filler",
    17: "Filler",
    18: "Calm Basics",
    19: "Archer",
    20: "Bowman",
    21: "Hunter",
    22: "Siege Breaker",
    23: "Mayheim",
    24: "Wind Walker",
    25: "Beast Master",
    26: "Filler",
    27: "Filler",
    28: "Filler",
    29: "Filler",
    30: "Savvy Basics",
    31: "Mage",
    32: "Wizard",
    33: "Shaman",
    34: "Elemental Sorcerer",
    35: "Spiritual Monk",
    36: "Bubonic Conjuror",
    37: "Arcane Cultist",
    38: "Filler",
    39: "Filler",
    40: "Filler",
    41: "Filler",
}));

const mapsMap = new Map(Object.entries({
    0: "Blunder_Hills",
    1: "Spore_Meadows",
    2: "Froggy_Fields",
    3: "JungleZ",
    4: "PlayerSelect",
    5: "PlayerSelect",
    6: "Tunnels_Entrance",
    7: "Freefall_Caverns",
    8: "Poopy_Sewers",
    9: "The_Office",
    10: "The_Ol'_Straightaway",
    11: "Echoing_Egress",
    12: "Slip_Slidy_Ledges",
    13: "The_Base_Of_The_Bark",
    14: "Valley_Of_The_Beans",
    15: "Rats_Nest",
    16: "Jungle_Perimeter",
    17: "Birch_Enclave",
    18: "Hollowed_Trunk",
    19: "Winding_Willows",
    20: "TutorialA",
    21: "TutorialB",
    22: "TutorialC",
    23: "TutorialD",
    24: "Vegetable_Patch",
    25: "JungleX",
    26: "Forest_Outskirts",
    27: "Encroaching_Forest_Villas",
    28: "Tucked_Away",
    29: "End_Of_The_Road",
    30: "The_Roots",
    31: "Where_the_Branches_End",
    32: "MininggF",
    33: "How_Did_u_get_here",
    34: "Miningg1",
    35: "Miningg2",
    36: "Dewdrop_Colosseum",
    37: "Spike_Surprise",
    38: "Meel's_Crypt",
    39: "Grandfrog's_Backyard",
    40: "Z",
    41: "Z",
    42: "Z",
    43: "Z",
    44: "Z",
    45: "Z",
    46: "Z",
    47: "Z",
    48: "Z",
    49: "Z",
    50: "YumYum_Grotto",
    51: "Jar_Bridge",
    52: "The_Mimic_Hole",
    53: "Dessert_Dunes",
    54: "Salty_Shores",
    55: "Faraway_Piers",
    56: "Filler",
    57: "The_Grandioso_Canyon",
    58: "Shifty_Sandbox",
    59: "Pincer_Plateau",
    60: "Slamabam_Straightaway",
    61: "Deepwater_Docks",
    62: "The_Ring",
    63: "Up_Up_Down_Down",
    64: "Sands_of_Time",
    65: "Djonnuttown",
    66: "Efaunt's_Tomb",
    67: "Bandit_Bob's_Hideout",
    68: "Sandstone_Colosseum",
    69: "Mummy_Memorial",
    70: "Z",
    71: "Z",
    72: "Z",
    73: "Z",
    74: "Z",
    75: "Z",
    76: "Z",
    77: "Z",
    78: "Z",
    79: "Z",
    80: "Z",
    81: "Z",
    82: "Z",
    83: "Z",
    84: "Z",
    85: "Z",
    86: "Z",
    87: "Z",
    88: "Z",
    89: "Z",
    90: "Z",
    91: "Z",
    92: "Z",
    93: "Z",
    94: "Z",
    95: "Z",
    96: "Z",
    97: "Z",
    98: "Z",
    99: "Z",
    100: "Frostbite_Towndra",
    101: "Steep_Sheep_Ledge",
    102: "Trappers_Folley",
    103: "Snowfield_Outskirts",
    104: "The_Stache_Split",
    105: "Refrigeration_Station",
    106: "Mamooooth_Mountain",
    107: "Rollin'_Tundra",
    108: "Signature_Slopes",
    109: "Thermonuclear_Climb",
    110: "Waterlogged_Entrance",
    111: "Cryo_Catacombs",
    112: "Overpass_of_Sound",
    113: "Crystal_Basecamp",
    114: "Eycicles's_Nest",
    115: "Coldsnap_Colosseum",
    116: "Wam_Wonderland",
    117: "Hell_Hath_Frozen_Over",
    118: "filler",
    119: "filler",
}));

const bubblesMap = {
    _11: "Call_Me_Bob",
    _6: "Sploosh_Sploosh",
    _3: "Wyoming_Blood",
    a11: "Call_Me_Ash",
    a7: "Sanic_Tools",
    a2: "Hammer_Hammer",
    b11: "Call_Me_Pope",
    b7: "Cookin_Roadkill",
    b3: "Molto_Loggo",
    c12: "Big_Game_Hunter",
    c8: "Grind_Time",
    c3: "Level_Up_Gift",
};

const starSignMap = new Map(Object.entries({
    0: {
        name: "The_Buff_Guy",
        description: "+1%_Total_Damage +3_STR",
    },
    1: {
        name: "Flexo_Bendo",
        description: "+2%_Movement_Speed +3_AGI",
    },
    2: {
        name: "The_Book_Worm",
        description: "+1%_Class_EXP_Gain +3_WIS",
    },
    3: {
        name: "The_Fuzzy_Dice",
        description: "+3_Talent_Points +3_LUK",
    },
    4: {
        name: "Dwarfo_Beardus",
        description: "+5%_Mining_Efficency +20%_Multi-Ore_Chance",
    },
    5: {
        name: "Hipster_Logger",
        description: "+5%_Chop_Efficiency +20%_Multi-Log_Chance",
    },
    6: {
        name: "Pie_Seas",
        description: "+5%_Fishin_Efficency +20%_Multi-Fish_Odds",
    },
    7: {
        name: "Shoe_Fly",
        description: "+5%_Catch_Efficiency +20%_Multi-Bug_Chance",
    },
    8: {
        name: "Blue_Hedgehog",
        description: "+4%_Movement_Speed +0.0001%_Ring_Drop",
    },
    9: {
        name: "Gum_Drop",
        description: "+15%_to_get_a_Time Candy_when_claiming 8+_Hour_AFK_gains",
    },
    10: {
        name: "Activelius",
        description: "+15%_Class_EXP_when fighting_actively",
    },
    11: {
        name: "Pack_Mule",
        description: "+10%_Carry_Cap",
    },
    12: {
        name: "Ned_Kelly",
        description: "+6%_Defence +2_Weapon_Power",
    },
    13: {
        name: "Robinhood",
        description: "+4%_Accuracy +2%_Movement_Speed +1_Cant_Trade_GME",
    },
    14: {
        name: "Pirate_Booty",
        description: "+5%_Drop_Rate",
    },
    15: {
        name: "Muscle_Man",
        description: "+8_STR",
    },
    16: {
        name: "Fast_Frog",
        description: "+8_AGI",
    },
    17: {
        name: "Smart_Stooge",
        description: "+8_WIS",
    },
    18: {
        name: "Lucky_Larry",
        description: "+8_LUK",
    },
    19: {
        name: "Silly_Snoozer",
        description: "+2%_Fight_AFK_Gain",
    },
    20: {
        name: "The_Big_Comatose",
        description: "+2%_Skill_AFK_Gain",
    },
    21: {
        name: "Miniature_Game",
        description: "+30%_minigame_reward",
    },
    22: {
        name: "Mount_Eaterest",
        description: "+10%_chance_to_not consume_food +15%_All_Food_Effect",
    },
    23: {
        name: "Bob_Build_Guy",
        description: "+10%_Speed_in_Town Skills",
    },
    24: {
        name: "The_Big_Brain",
        description: "+3%_Class_EXP_gain",
    },
    25: {
        name: "The_OG_Skiller",
        description: "+5%_Carry_Cap +1%_Skill_AFK_gain +2%_All_Skill_Prowess",
    },
    26: {
        name: "Grim_Reaper",
        description: "+2%_Mob_Respawn_rate",
    },
    27: {
        name: "The_Fallen_Titan",
        description: "+3%_Boss_Damage +4%_Crit_Chance",
    },
    28: {
        name: "The_Forsaken",
        description: "-80%_Total_HP -50%_Defence +6%_Fight_AFK_Gain",
    },
    29: {
        name: "Mr_No_Sleep",
        description: "-6%_AFK_Gain +30%_Carry_Cap",
    },
    30: {
        name: "Sir_Savvy",
        description: "+3%_Skill_EXP_gain",
    },
    31: {
        name: "All_Rounder",
        description: "+4_All_Stats",
    },
    32: {
        name: "Fatty_Doodoo",
        description: "-3%_Movement_Speed +5%_Defence +2%_Total_Damage",
    },
    33: {
        name: "Chronus_Cosmos",
        description: "All_characters_can now_align_with_2 Star_Signs_at_once",
    },
}));

const cardSetMap = {
    None: "None",
    "{%_EXP_if_below_Lv_50": { name: "Blunder_Hills", rawName: 'CardSet0', base: 8 },
    "{%_All_Food_Effect": { name: "Yum-Yum_Desert", rawName: 'CardSet1', base: 10 },
    "{%_Skill_Efficiency": { name: "Easy_Resources", rawName: 'CardSet2', base: 8 },
    "{%_Skill_EXP_Gain": { name: "Medium_Resources", rawName: 'CardSet3', base: 5 },
    "{%_DEF_and_ACC": { name: "Frostbite_Tundra", rawName: 'CardSet4', base: 5 },
    "{%_Skill_AFK_Gain_Rate": { name: "Hard_Resources", rawName: 'CardSet5', base: 4 },
    "{%_Dmg,_Drop,_and_EXP": { name: "Bosses_n_Nightmares", rawName: 'CardSet26', base: 6 },
    "{%_Drop_Rate": { name: "Events", rawName: 'CardSet25', base: 5 },
};

const cardEquipMap = {
    B: "None",
    mushG: "Green Mushroom (+ Base HP)",
    mushR: "Red Mushroom (+ Base LUK)",
    frogG: "Frog (+ Base MP)",
    beanG: "Bored Bean (+ Base Damage)",
    slimeG: "Slime (+ Base WIS)",
    snakeG: "Baby Boa (+ Move Spd)",
    carrotO: "Carrotman (+ Base AGI)",
    goblinG: "Glublin (+% Total HP)",
    plank: "Wode Board (+ Base STR)",
    frogBIG: "Gigafrog (+% Card Drop Chance)",
    poopSmall: "Poop (+% Crystal Mob Spawn Chance)",
    ratB: "Rat (+% Critical Chance)",
    branch: "Walking Stick (+ Base WIS)",
    acorn: "Nutto (+% Money from Monsters)",
    Crystal0: "Crystal Carrot (+% Total Drop Rate)",
    mushW: "Wood Mushroom (+% Total Accuracy)",
    jarSand: "Sandy Pot (+% EXP Conversion from Talent)",
    mimicA: "Mimic (+% Total Drop Rate)",
    crabcake: "Crabcake (+% To not consume Food)",
    coconut: "Mafioso (+ Base AGI)",
    sandcastle: "Sand Castle (+% Total Accuracy)",
    pincermin: "Pincermin (+ Weapon Power)",
    potato: "Mashed Potato (+% Critical Damage)",
    steak: "Tyson (+ Base STR)",
    moonman: "Moonmoon (+% Monster EXP While Active)",
    sandgiant: "Sand Giant (+% Minimum Damage)",
    snailZ: "Snelbie (+% Card Drop Chance)",
    shovelR: "Dig Doug (+ Base LUK)",
    Crystal1: "Crystal Crabal (+% EXP from monsters)",
    Bandit_Bob: "Bandit Bob (+% Money from Monsters)",
    Copper: "Copper Ore (+ Base accuracy)",
    Iron: "Iron Ore (+% Total Mining Efficiency)",
    Gold: "Gold Ore (+% Mining EXP)",
    ForgeA: "Fire Forge (+% Smithing EXP)",
    OakTree: "Oak Tree (+ Base Defence)",
    BirchTree: "Bleach Logs (+% Total Choppin Efficiency)",
    JungleTree: "Jungle Logs (+% Choppin EXP)",
    ForestTree: "Forest Fibres (+% EXP Conversion from Talent)",
    Fish1: "Goldfish (+% Total MP)",
    Fish2: "Hermit Can (+% Total Fishing Efficiency)",
    Fish3: "Jellyfish (+% Fishing EXP)",
    Bug1: "Fly (+% Monster EXP While Active)",
    Bug2: "Butterfly (+% Total Catching Efficiency)",
    Plat: "Platinum Ore (+% Mining Away Gains)",
    Dementia: "Dementia Ore (+% Mining Speed)",
    Void: "Void Ore (+% Card Drop Chance)",
    ForgeB: "Cinder Forge (+% Smithing EXP)",
    PalmTree: "Tropilogs (+% Choppin Away Gains)",
    ToiletTree: "Potty Rolls (+% Choppin Speed)",
    StumpTree: "Veiny Logs (+% Total Accuracy)",
    Fish4: "Bloach (+% Fishing Away Gains)",
    Bug3: "Sentient Cereal (+% Catching EXP)",
    Bug4: "Fruitfly (+% Catching Away Gains)",
    SoulCard1: "Forest Soul (+% Defence from Equipment)",
    SoulCard2: "Dune Soul (+% Max Charge)",
    CritterCard1: "Froge (+% Shiny Critter Chance)",
    CritterCard2: "Crabbo (+% Trapping Efficiency)",
    CritterCard3: "Scorpie (+% Trapping EXP)",
    sheep: "Sheepie (+% Defence from Equipment)",
    flake: "Frost Flake (+ Base STR)",
    stache: "Sir Stache (+% Card Drop Chance)",
    bloque: "Bloque (+ Base AGI)",
    mamoth: "Mamooth (+% Total HP)",
    snowball: "Snowman (+% Total Damage)",
    penguin: "Penguin (+ Base WIS)",
    thermostat: "Thermister (+% Critical Damage)",
    glass: "Quenchie (+ Base LUK)",
    snakeB: "Cryosnake (+% MP regen rate)",
    speaker: "Bop Box (+% Total Drop Rate)",
    eye: "Neyeptune (+% Total Accuracy)",
    ram: "Dedotated Ram (+ Weapon Power)",
    skele: "Xylobone (+% Critical Chance)",
    skele2: "Bloodbone (+% Total Damage)",
    Crystal2: "Crystal Cattle (+% EXP from monsters)",
    Tree7: "Wispy Lumber (+% Choppin Speed)",
    SoulCard3: "Rooted Soul (+ Starting Pts in Worship)",
    SoulCard4: "Frigid Soul (+% Max Charge)",
    SoulCard5: "Squiddy Soul (+% Charge Rate)",
    CritterCard4: "Mousey (+% Shiny Critter Chance)",
    CritterCard5: "Owlio (+% EXP from monsters)",
    CritterCard6: "Pingy (+% Shiny Critter Chance)",
    CritterCard7: "Bunny (+% Skill AFK gain rate)",
    Lustre: "Lustre Ore (+ Base LUK)",
    SaharanFoal: "Tundra Logs (+% Choppin Away Gains)",
    Bug5: "Mosquisnow (+% Total Catching Efficiency)",
    Bug6: "Flycicle (+% Catching Away Gains)",
    babayaga: "Baba Yaga (+% Money from Monsters)",
    poopBig: "Dr Defecaus (+% Total Damage)",
    poopD: "Boop (+% Fighting AFK gain rate)",
    wolfA: "Amarok (+% Skill AFK gain rate)",
    wolfB: "Chaotic Amarok (+% Fighting AFK gain rate)",
    babaHour: "Biggie Hours (+% Double AFK claim chance)",
    babaMummy: "King Doot (+% Total Drop Rate)",
    Boss2A: "Efaunt (+% EXP from monsters)",
    Boss2B: "Chaotic Efaunt (+% Skill EXP)",
    Boss3A: "Chizoar (+% Cog Build Spd (Passive))",
    Boss3B: "Chaotic Chizoar (+% Shrine Effects)",
    ghost: "Ghost (+% Monster EXP While Active)",
    xmasEvent: "Giftmas Blobulyte (+% Total Drop Rate)",
    xmasEvent2: "Meaning of Giftmas (+% Money from Monsters)",
    slimeR: "Valentslime (+% Defence from Equipment)",
    loveEvent: "Loveulyte (+% Total HP)",
    loveEvent2: "Chocco Box (+% Boost Food Effect)",
    sheepB: "Floofie (+% MP regen rate)",
    snakeY: "Shell Snake (+ Base LUK)",
    EasterEvent1: "Egggulyte (+% Card Drop Chance)",
    EasterEvent2: "Egg Capsule (+% Critical Damage)",
    SummerEvent1: "Coastiolyte (+% Fishing Away Gains)",
    SummerEvent2: "Summer Spirit (+% Catching EXP)",
    shovelY: "Plasti Doug (+ Base Defence)",
    crabcakeB: "Mr Blueberry (+% Total Drop Rate)",
};

const cardLevelMap = {
    mushG: 5,
    mushR: 10,
    frogG: 6,
    beanG: 7,
    slimeG: 8,
    snakeG: 9,
    carrotO: 10,
    goblinG: 10,
    plank: 10,
    frogBIG: 10,
    poopSmall: 10,
    ratB: 10,
    branch: 10,
    acorn: 10,
    Crystal0: 3,
    mushW: 10,
    jarSand: 10,
    mimicA: 10,
    crabcake: 10,
    coconut: 10,
    sandcastle: 10,
    pincermin: 10,
    potato: 10,
    steak: 10,
    moonman: 10,
    sandgiant: 10,
    snailZ: 10,
    shovelR: 10,
    Crystal1: 3,
    Bandit_Bob: 1,
    Copper: 10,
    Iron: 10,
    Gold: 10,
    ForgeA: 10,
    OakTree: 10,
    BirchTree: 10,
    JungleTree: 10,
    ForestTree: 10,
    Fish1: 10,
    Fish2: 10,
    Fish3: 10,
    Bug1: 10,
    Bug2: 10,
    Plat: 10,
    Dementia: 10,
    Void: 10,
    ForgeB: 10,
    PalmTree: 10,
    ToiletTree: 10,
    StumpTree: 10,
    Fish4: 10,
    Bug3: 10,
    Bug4: 10,
    SoulCard1: 3,
    SoulCard2: 3,
    CritterCard1: 4,
    CritterCard2: 4,
    CritterCard3: 4,
    sheep: 11,
    flake: 12,
    stache: 13,
    bloque: 14,
    mamoth: 15,
    snowball: 15,
    penguin: 15,
    thermostat: 15,
    glass: 17,
    snakeB: 17,
    speaker: 17,
    eye: 17,
    ram: 20,
    skele: 15,
    skele2: 15,
    Crystal2: 10,
    Tree7: 10,
    SoulCard3: 3,
    SoulCard4: 4,
    SoulCard5: 5,
    CritterCard4: 4,
    CritterCard5: 4,
    CritterCard6: 5,
    CritterCard7: 6,
    Lustre: 10,
    SaharanFoal: 10,
    Bug5: 10,
    Bug6: 10,
    babayaga: 1.5,
    poopBig: 1.5,
    poopD: 1,
    wolfA: 1.5,
    wolfB: 1.5,
    babaHour: 1.5,
    babaMummy: 1.5,
    Boss2A: 1.5,
    Boss2B: 1.5,
    Boss3A: 1.5,
    Boss3B: 1.5,
    ghost: 2,
    xmasEvent: 1.5,
    xmasEvent2: 1.5,
    slimeR: 2,
    loveEvent: 1.5,
    loveEvent2: 1.5,
    sheepB: 3,
    snakeY: 3,
    EasterEvent1: 1.5,
    EasterEvent2: 1.5,

    Blank: 0,
};

const skillIndexMap = {
    0: "character",
    1: "mining",
    2: "smithing",
    3: "chopping",
    4: "fishing",
    5: "alchemy",
    6: "catching",
    7: "trapping",
    8: "construction",
    9: "worship",
};

const anvilProductionItems = {
    0: "Thread",
    1: "Trusty_Nails",
    2: "Boring_Brick",
    3: "Chain_Link",
    4: "Leather_Hide",
    5: "Pinion_Spur",
    6: "Lugi_Bracket"
}

const guildBonusesMap = {
    0: "Guild_Gifts",
    1: "Stat_Runes",
    2: "Rucksack",
    3: "Power_of_Pow",
    4: "REM_Fighting",
    5: "Make_or_Break",
    6: "Multi_Tool",
    7: "Sleepy_Skiller",
    8: "Wait_A_Minute",
    9: "Bonus_GP_for_small_guilds",
    10: "Gold_Charm",
    11: "Star_Dazzle",
    12: "C2_Card_Spotter",
    13: "Bestone",
    14: "Wait_A_Minute",
    15: "Craps",
    16: "Anotha_One",
    17: "Wait_A_Minute",
};

const obolMap = {
    "ObolLocked1": "Locked",
    "ObolLocked2": "Locked",
    "ObolLocked3": "Locked",
    "ObolLocked4": "Locked",
    "Blank": "Empty",
    "ObolAmarokA": "Granite_Obol_of_Amarok's_Stare",
    "ObolBronze0": "Bronze_STR_Obol",
    "ObolBronze1": "Bronze_AGI_Obol",
    "ObolBronze2": "Bronze_WIS_Obol",
    "ObolBronze3": "Bronze_LUK_Obol",
    "ObolBronzeCard": "Bronze_Obol_of_Cards",
    "ObolBronzeCatching": "Bronze_Obol_of_Few_Flies",
    "ObolBronzeChoppin": "Bronze_Obol_of_Chippin_Chops",
    "ObolBronzeCons": "Bronze_Obol_of_Construction",
    "ObolBronzeDamage": "Bronze_Obol_of_Puny_Damage",
    "ObolBronzeDef": "Bronze_Obol_of_Defence",
    "ObolBronzeEXP": "Bronze_Obol_of_Experience",
    "ObolBronzeFishing": "Bronze_Obol_of_Finite_Fish",
    "ObolBronzeKill": "Bronze_Obol_of_Multikill",
    "ObolBronzeMining": "Bronze_Obol_of_Small_Swings",
    "ObolBronzePop": "Bronze_Obol_of_Pop",
    "ObolBronzeTrapping": "Bronze_Obol_of_Trapping",
    "ObolBronzeWorship": "Bronze_Obol_of_Worship",
    "ObolEfauntA": "Skeletal_Obol_of_Efaunt's_Gaze",
    "ObolGold0": "Gold_STR_Obol",
    "ObolGold1": "Gold_AGI_Obol",
    "ObolGold2": "Gold_WIS_Obol",
    "ObolGold3": "Gold_LUK_Obol",
    "ObolGoldCard": "Golden_Obol_of_Cards",
    "ObolGoldCatching": "Golden_Obol_of_Insane_Insects",
    "ObolGoldChoppin": "Golden_Obol_of_Huge_Hackin",
    "ObolGoldCons": "Golden_Obol_of_Construction",
    "ObolGoldDamage": "Golden_Obol_of_Big_Boy_Damage",
    "ObolGoldDef": "Golden_Obol_of_Defence",
    "ObolGoldEXP": "Golden_Obol_of_Experience",
    "ObolGoldFishing": "Golden_Obol_of_Crazy_Carp",
    "ObolGoldKill": "Golden_Obol_of_Ultrakill",
    "ObolGoldLuck": "Golden_Obol_of_Triple_Sixes",
    "ObolGoldMining": "Golden_Obol_of_Diligent_Digging",
    "ObolGoldMoney": "Golden_Obol_of_Plentiful_Riches",
    "ObolGoldPop": "Golden_Obol_of_Poppity_Pop",
    "ObolGoldTrapping": "Golden_Obol_of_Trapping",
    "ObolGoldWorship": "Golden_Obol_of_Worship",
    "ObolPink0": "Dementia_STR_Obol",
    "ObolPink1": "Dementia_AGI_Obol",
    "ObolPink2": "Dementia_WIS_Obol",
    "ObolPink3": "Dementia_LUK_Obol",
    "ObolPinkCard": "Dementia_Obol_of_Cards",
    "ObolPinkCatching": "Dementia_Obol_of_Idk_Yet",
    "ObolPinkChoppin": "Dementia_Obol_of_WOWOWOWWO",
    "ObolPinkCons": "Dementia_Obol_of_Construction",
    "ObolPinkDamage": "Dementia_Obol_of_Infinite_Damage",
    "ObolPinkDef": "Dementia_Obol_of_Defence",
    "ObolPinkEXP": "Dementia_Obol_of_Experience",
    "ObolPinkFishing": "Dementia_Obol_of_Monument_Marlins",
    "ObolPinkKill": "Dementia_Obol_of_Killionaire",
    "ObolPinkLuck": "Dementia_Obol_of_Infinisixes",
    "ObolPinkMining": "Dementia_Obol_of_Magisterial_Metals",
    "ObolPinkPop": "Dementia_Obol_of_Pop_Pop_Pop_Pop",
    "ObolPinkTrapping": "Dementia_Obol_of_Trapping",
    "ObolPinkWorship": "Dementia_Obol_of_Worship",
    "ObolPlatinum0": "Platinum_STR_Obol",
    "ObolPlatinum1": "Platinum_AGI_Obol",
    "ObolPlatinum2": "Platinum_WIS_Obol",
    "ObolPlatinum3": "Platinum_LUK_Obol",
    "ObolPlatinumCard": "Platinum_Obol_of_Cards",
    "ObolPlatinumCatching": "Platinum_Obol_of_Idk_Yet",
    "ObolPlatinumChoppin": "Platinum_Obol_of_Lumby_Loggo",
    "ObolPlatinumCons": "Platinum_Obol_of_Construction",
    "ObolPlatinumDamage": "Platinum_Obol_of_Lethal_Damage",
    "ObolPlatinumDef": "Platinum_Obol_of_Defense_with_an_S",
    "ObolPlatinumEXP": "Platinum_Obol_of_Experience",
    "ObolPlatinumFishing": "Platinum_Obol_of_Tremendous_Trout",
    "ObolPlatinumKill": "Platinum_Obol_of_Killimanjaro",
    "ObolPlatinumLuck": "Platinum_Obol_of_Yahtzee_Sixes",
    "ObolPlatinumMining": "Platinum_Obol_of_Dwarven_Delving",
    "ObolPlatinumPop": "Platinum_Obol_of_Poppity_Poppy",
    "ObolPlatinumSpeed": "Platinum_Obol_of_Blinding_Speed",
    "ObolPlatinumTrapping": "Platinum_Obol_of_Trapping",
    "ObolPlatinumWorship": "Platinum_Obol_of_Worship",
    "ObolSilver0": "Silver_STR_Obol",
    "ObolSilver1": "Silver_AGI_Obol",
    "ObolSilver2": "Silver_WIS_Obol",
    "ObolSilver3": "Silver_LUK_Obol",
    "ObolSilverCard": "Silver_Obol_of_Cards",
    "ObolSilverCatching": "Silver_Obol_of_Big_Bugs",
    "ObolSilverChoppin": "Silver_Obol_of_Big_Bark",
    "ObolSilverCons": "Silver_Obol_of_Construction",
    "ObolSilverDamage": "Silver_Obol_of_Little_Damage",
    "ObolSilverDef": "Silver_Obol_of_Defence",
    "ObolSilverEXP": "Silver_Obol_of_Experience",
    "ObolSilverFishing": "Silver_Obol_of_Puny_Pikes",
    "ObolSilverKill": "Silver_Obol_of_Megakill",
    "ObolSilverLuck": "Silver_Obol_of_Double_Sixes",
    "ObolSilverMining": "Silver_Obol_of_Moderate_Mining",
    "ObolSilverMoney": "Silver_Obol_of_Pocket_Change",
    "ObolSilverPop": "Silver_Obol_of_Pop_Pop",
    "ObolSilverTrapping": "Silver_Obol_of_Trapping",
    "ObolSilverWorship": "Silver_Obol_of_Worship"
}

const obolFamilyShapeMap = {
    0: 'Circle',
    1: 'Circle',
    2: 'Square',
    3: 'Circle',
    4: 'Circle',
    5: 'Circle',
    6: 'Hexagon',
    7: 'Sparkle',
    8: 'Hexagon',
    9: 'Circle',
    10: 'Square',
    11: 'Sparkle',
    12: 'Sparkle',
    13: 'Square',
    14: 'Circle',
    15: 'Hexagon',
    16: 'Sparkle',
    17: 'Hexagon',
    18: 'Circle',
    19: 'Circle',
    20: 'Circle',
    21: 'Square',
    22: 'Circle',
    23: 'Circle',
};

const obolCharacterShapeMap = {
    0: 'Square',
    1: 'Circle',
    2: 'Hexagon',
    3: 'Circle',
    4: 'Square',
    5: 'Circle',
    6: 'Circle',
    7: 'Circle',
    8: 'Circle',
    9: 'Square',
    10: 'Sparkle',
    11: 'Square',
    12: 'Circle',
    13: 'Circle',
    14: 'Circle',
    15: 'Circle',
    16: 'Square',
    17: 'Circle',
    18: 'Hexagon',
    19: 'Circle',
    20: 'Square',
};

const filteredLootyItems = {
    'EquipmentShirts4': true,
    'EquipmentShirts6': true,
    'EquipmentShirts8': true,
    'EquipmentShirts9': true,
    'EquipmentShoes2': true,
    'EquipmentShoes6': true,
    'EquipmentShoes8': true,
    'EquipmentShoes10': true,
    'EquipmentShoes13': true,
    'EquipmentShoes11': true,
    'EquipmentShoes12': true,
    'EquipmentShoes14': true,
    "EquipmentPendant1": true,
    "EquipmentPendant2": true,
    "EquipmentPendant3": true,
    "EquipmentPendant4": true,
    "EquipmentPendant5": true,
    "EquipmentPendant6": true,
    "EquipmentPendant7": true,
    "EquipmentPendant8": true,
    "EquipmentPendant13": true,
    "EquipmentPendant15": true,
    "EquipmentPendant18": true,
    "EquipmentRings1": true,
    "EquipmentRings4": true,
    "EquipmentRings5": true,
    "EquipmentRings8": true,
    "EquipmentRings9": true,
    "EquipmentRings10": true,
    "EquipmentRingsFishing1": true,
    "EquipmentRingsFishing2": true,
    "EquipmentRingsFishing3": true,
    "EquipmentHatsBeg1": true,
    "EquipmentHats10": true,
    "EquipmentHats23": true,
    "EquipmentHats24": true,
    "EquipmentHats27": true,
    "TestObj14": true,
    "TestObj15": true,
    "TestObj16": true,
    "EquipmentWeapons1": true,
    "EquipmentWeapons2": true,
    "EquipmentWands3": true,
    "EquipmentWands4": true,
    "TestObj2": true,
    "TestObj4": true,
    "TestObj5": true,
    "EquipmentPants7": true,
    "EquipmentPants8": true,
    "EquipmentPants9": true,
    "EquipmentPants11": true,
    "EquipmentPants12": true,
    "EquipmentPants13": true,
    "EquipmentPants14": true,
    'Blank': true,
    'LockedInvSpace': true,
    'FillerMaterial': true,
    'Fish5': true,
    'Fish6': true,
    'Fish7': true,
    'Fish8': true,
    'EquipmentSmithingTabs5': true,
    'EquipmentSmithingTabs6': true,
    'EquipmentSmithingTabs7': true,
    'EquipmentSmithingTabs8': true,
    'StampA29': true,
    'StampA30': true,
    'StampA31': true,
    'StampA32': true,
    'StampA33': true,
    'StampA34': true,
    'StampA35': true,
    'CraftMat11': true,
    'CraftMat12': true,
    'CraftMat13': true,
    'CraftMat14': true,
    'CraftMat15': true,
    'CraftMat16': true,
    'CraftMat17': true,
    'GemQ1': true,
    'GemQ2': true,
    'GemQ3': true,
    'GemQ4': true,
    'GemQ5': true,
    'GemQ6': true,
    'GemQ7': true,
    'GemQ8': true,
    'EquipmentHats35': true,
    'EquipmentHats38': true,
    'EquipmentHats46': true,
    'EquipmentHats47': true,
    'EquipmentHats48': true,
    'EquipmentHats49': true,
    'EquipmentHats50': true,
    'CardPack1': true,
    'CardPack2': true,
    'CardPack3': true,
    'InvBag21': true,
    'InvBag22': true,
    'InvBag23': true,
    'InvBag24': true,
    'InvBag25': true,
    'InvBag26': true,
    'InvStorage31': true,
    'InvStorage32': true,
    'InvStorage33': true,
    'InvStorage34': true,
    'InvStorage35': true,
    'InvStorage36': true,
    'InvStorage37': true,
    'InvStorage38': true,
    'InvStorage39': true,
    'InvStorage40': true,
    'InvStorage41': true,
    'InvStorage42': true,
    "COIN": true,
    "EXP": true
};

const stampsMap = new Map(Object.entries({
    "combat": new Map(Object.entries({
        "0": {
            "name": "Sword_Stamp",
            "rawName": "StampA1"
        },
        "1": {
            "name": "Heart_Stamp",
            "rawName": "StampA2"
        },
        "2": {
            "name": "Mana_Stamp",
            "rawName": "StampA3"
        },
        "3": {
            "name": "Tomahawk_Stamp",
            "rawName": "StampA4"
        },
        "4": {
            "name": "Target_Stamp",
            "rawName": "StampA5"
        },
        "5": {
            "name": "Shield_Stamp",
            "rawName": "StampA6"
        },
        "6": {
            "name": "Longsword_Stamp",
            "rawName": "StampA7"
        },
        "7": {
            "name": "Kapow_Stamp",
            "rawName": "StampA8"
        },
        "8": {
            "name": "Fist_Stamp",
            "rawName": "StampA9"
        },
        "9": {
            "name": "Battleaxe_Stamp",
            "rawName": "StampA10"
        },
        "10": {
            "name": "Agile_Stamp",
            "rawName": "StampA11"
        },
        "11": {
            "name": "Vitality_Stamp",
            "rawName": "StampA12"
        },
        "12": {
            "name": "Book_Stamp",
            "rawName": "StampA13"
        },
        "13": {
            "name": "Manamoar_Stamp",
            "rawName": "StampA14"
        },
        "14": {
            "name": "Clover_Stamp",
            "rawName": "StampA15"
        },
        "15": {
            "name": "Scimitar_Stamp",
            "rawName": "StampA16"
        },
        "16": {
            "name": "Bullseye_Stamp",
            "rawName": "StampA17"
        },
        "17": {
            "name": "Feather_Stamp",
            "rawName": "StampA18"
        },
        "18": {
            "name": "Polearm_Stamp",
            "rawName": "StampA19"
        },
        "19": {
            "name": "Violence_Stamp",
            "rawName": "StampA20"
        },
        "20": {
            "name": "Buckler_Stamp",
            "rawName": "StampA21"
        },
        "21": {
            "name": "FILLER",
            "rawName": "StampA22"
        },
        "22": {
            "name": "Sukka_Foo",
            "rawName": "StampA23"
        },
        "23": {
            "name": "Arcane_Stamp",
            "rawName": "StampA24"
        },
        "24": {
            "name": "FILLER",
            "rawName": "StampA25"
        },
        "25": {
            "name": "Steve_Sword",
            "rawName": "StampA26"
        },
        "26": {
            "name": "Blover_Stamp",
            "rawName": "StampA27"
        },
        "27": {
            "name": "Stat_Graph_Stamp",
            "rawName": "StampA28"
        },
        "28": {
            "name": "FILLER",
            "rawName": "StampA29"
        },
        "29": {
            "name": "FILLER",
            "rawName": "StampA30"
        },
        "30": {
            "name": "FILLER",
            "rawName": "StampA31"
        },
        "31": {
            "name": "FILLER",
            "rawName": "StampA32"
        },
        "32": {
            "name": "FILLER",
            "rawName": "StampA33"
        },
        "33": {
            "name": "FILLER",
            "rawName": "StampA34"
        },
        "34": {
            "name": "FILLER",
            "rawName": "StampA35"
        }
    })),
    "skills": new Map(Object.entries({
        "0": {
            "name": "Pickaxe_Stamp",
            "rawName": "StampB1"
        },
        "1": {
            "name": "Hatchet_Stamp",
            "rawName": "StampB2"
        },
        "2": {
            "name": "Anvil_Zoomer_Stamp",
            "rawName": "StampB3"
        },
        "3": {
            "name": "Lil' Mining_Baggy_Stamp",
            "rawName": "StampB4"
        },
        "4": {
            "name": "Twin_Ores_Stamp",
            "rawName": "StampB5"
        },
        "5": {
            "name": "Choppin' Bag_Stamp",
            "rawName": "StampB6"
        },
        "6": {
            "name": "Duplogs_Stamp",
            "rawName": "StampB7"
        },
        "7": {
            "name": "Matty_Bag_Stamp",
            "rawName": "StampB8"
        },
        "8": {
            "name": "Smart_Dirt_Stamp",
            "rawName": "StampB9"
        },
        "9": {
            "name": "Cool_Diggy_Tool_Stamp",
            "rawName": "StampB10"
        },
        "10": {
            "name": "High_IQ_Lumber_Stamp",
            "rawName": "StampB11"
        },
        "11": {
            "name": "Swag_Swingy_Tool_Stamp",
            "rawName": "StampB12"
        },
        "12": {
            "name": "Alch_Go_Brrr_Stamp",
            "rawName": "StampB13"
        },
        "13": {
            "name": "Brainstew_Stamps",
            "rawName": "StampB14"
        },
        "14": {
            "name": "Drippy_Drop_Stamp",
            "rawName": "StampB15"
        },
        "15": {
            "name": "Droplots_Stamp",
            "rawName": "StampB16"
        },
        "16": {
            "name": "Fishing_Rod_Stamp",
            "rawName": "StampB17"
        },
        "17": {
            "name": "Fishhead_Stamp",
            "rawName": "StampB18"
        },
        "18": {
            "name": "Catch_Net_Stamp",
            "rawName": "StampB19"
        },
        "19": {
            "name": "Fly_Intel_Stamp",
            "rawName": "StampB20"
        },
        "20": {
            "name": "Bag_o_Heads_Stamp",
            "rawName": "StampB21"
        },
        "21": {
            "name": "Holy_Mackerel_Stamp",
            "rawName": "StampB22"
        },
        "22": {
            "name": "Bugsack_Stamp",
            "rawName": "StampB23"
        },
        "23": {
            "name": "Buzz_Buzz_Stamp",
            "rawName": "StampB24"
        },
        "24": {
            "name": "Hidey_Box_Stamp",
            "rawName": "StampB25"
        },
        "25": {
            "name": "Purp_Froge_Stamp",
            "rawName": "StampB26"
        },
        "26": {
            "name": "Spikemouth_Stamp",
            "rawName": "StampB27"
        },
        "27": {
            "name": "Shiny_Crab_Stamp",
            "rawName": "StampB28"
        },
        "28": {
            "name": "Gear_Stamp",
            "rawName": "StampB29"
        },
        "29": {
            "name": "Sample_Stamp",
            "rawName": "StampB30"
        },
        "30": {
            "name": "Saw_Stamp",
            "rawName": "StampB31"
        },
        "31": {
            "name": "Amplesample_Stamp",
            "rawName": "StampB32"
        },
        "32": {
            "name": "SpoOoky_Stamp",
            "rawName": "StampB33"
        },
        "33": {
            "name": "Flowin_Stamp",
            "rawName": "StampB34"
        },
        "34": {
            "name": "Prayday_Stamp",
            "rawName": "StampB35"
        },
        "35": {
            "name": "Banked_Pts_Stamp",
            "rawName": "StampB36"
        }
    })),
    "misc": new Map(Object.entries({
        "0": {
            "name": "Questin_Stamp",
            "rawName": "StampC1"
        },
        "1": {
            "name": "Mason_Jar_Stamp",
            "rawName": "StampC2"
        },
        "2": {
            "name": "Crystallin",
            "rawName": "StampC3"
        },
        "3": {
            "name": "Blank",
            "rawName": "StampC4"
        },
        "4": {
            "name": "Apple_Stamp",
            "rawName": "StampC5"
        },
        "5": {
            "name": "Potion_Stamp",
            "rawName": "StampC6"
        },
        "6": {
            "name": "Golden_Apple_Stamp",
            "rawName": "StampC7"
        },
        "7": {
            "name": "Blank",
            "rawName": "StampC8"
        },
        "8": {
            "name": "Card_Stamp",
            "rawName": "StampC9"
        },
        "9": {
            "name": "Blank",
            "rawName": "StampC10"
        },
        "10": {
            "name": "Blank",
            "rawName": "StampC11"
        },
        "11": {
            "name": "Blank",
            "rawName": "StampC12"
        },
        "12": {
            "name": "Talent_I_Stamp",
            "rawName": "StampC13"
        },
        "13": {
            "name": "Talent_II_Stamp",
            "rawName": "StampC14"
        },
        "14": {
            "name": "Talent_III_Stamp",
            "rawName": "StampC15"
        },
        "15": {
            "name": "Talent_IV_Stamp",
            "rawName": "StampC16"
        },
        "16": {
            "name": "Talent_V_Stamp",
            "rawName": "StampC17"
        },
        "17": {
            "name": "Talent_S_Stamp",
            "rawName": "StampC18"
        },
        "18": {
            "name": "Multikill_Stamp",
            "rawName": "StampC19"
        },
        "19": {
            "name": "Biblio_Stamp",
            "rawName": "StampC20"
        }
    }))
}));

const maxCarryCap = {
    "Mining": {
        25: {
            name: 'Miniature_Mining_Pouch',
            rawName: 'MaxCapBagT2'
        },
        50: {
            name: 'Cramped_Mining_Pouch',
            rawName: 'MaxCapBag1'
        },
        100: {
            name: 'Small_Mining_Pouch',
            rawName: 'MaxCapBag2'
        },
        250: {
            name: 'Average_Mining_Pouch',
            rawName: 'MaxCapBag3'
        },
        500: {
            name: 'Sizable_Mining_Pouch',
            rawName: 'MaxCapBag4'
        },
        1000: {
            name: 'Big_Mining_Pouch',
            rawName: 'MaxCapBag5'
        },
        2000: {
            name: 'Large_Mining_Pouch',
            rawName: 'MaxCapBagMi6'
        }
    },
    "Chopping": {
        25: {
            name: 'Miniature_Choppin_Pouch',
            rawName: 'MaxCapBagT1'
        },
        50: {
            name: 'Cramped_Choppin_Pouch',
            rawName: 'MaxCapBag7'
        },
        100: {
            name: 'Small_Choppin_Pouch',
            rawName: 'MaxCapBag9'
        },
        250: {
            name: 'Average_Choppin_Pouch',
            rawName: 'MaxCapBagT3'
        },
        500: {
            name: 'Sizable_Choppin_Pouch',
            rawName: 'MaxCapBagT4'
        },
        1000: {
            name: 'Big_Choppin_Pouch',
            rawName: 'MaxCapBagT5'
        },
        2000: {
            name: 'Large_Choppin_Pouch',
            rawName: 'MaxCapBagT6'
        }
    },
    "Foods": {
        25: {
            name: 'Miniscule_Food_Pouch',
            rawName: 'MaxCapBag6'
        },
        50: {
            name: 'Cramped_Food_Pouch',
            rawName: 'MaxCapBag8'
        },
        100: {
            name: 'Small_Food_Pouch',
            rawName: 'MaxCapBag10'
        },
        250: {
            name: 'Average_Food_Pouch',
            rawName: 'MaxCapBagF3'
        },
        500: {
            name: 'Sizable_Food_Pouch',
            rawName: 'MaxCapBagF4'
        },
        1000: {
            name: 'Big_Food_Pouch',
            rawName: 'MaxCapBagF5'
        },
        2000: {
            name: 'Large_Food_Pouch',
            rawName: 'MaxCapBagF6'
        }
    },
    "bCraft": {
        25: {
            name: 'Mini_Materials_Pouch',
            rawName: 'MaxCapBagM1'
        },
        50: {
            name: 'Cramped_Material_Pouch',
            rawName: 'MaxCapBagM2'
        },
        100: {
            name: 'Small_Material_Pouch',
            rawName: 'MaxCapBagM3'
        },
        250: {
            name: 'Average_Material_Pouch',
            rawName: 'MaxCapBagM4'
        },
        500: {
            name: 'Sizable_Materials_Pouch',
            rawName: 'MaxCapBagM5'
        },
        1000: {
            name: 'Big_Materials_Pouch',
            rawName: 'MaxCapBagM6'
        },
        2000: {
            name: 'Large_Materials_Pouch',
            rawName: 'MaxCapBagM7'
        }
    },
    "Fishing": {
        25: {
            name: 'Miniature_Fish_Pouch',
            rawName: 'MaxCapBagFi0'
        },
        50: {
            name: 'Cramped_Fish_Pouch',
            rawName: 'MaxCapBagFi1'
        },
        100: {
            name: 'Small_Fish_Pouch',
            rawName: 'MaxCapBagFi2'
        },
        250: {
            name: 'Average_Fish_Pouch',
            rawName: 'MaxCapBagFi3'
        },
        500: {
            name: 'Sizable_Fish_Pouch',
            rawName: 'MaxCapBagFi4'
        },
        1000: {
            name: 'Big_Fish_Pouch',
            rawName: 'MaxCapBagFi5'
        },
        2000: {
            name: 'Large_Fish_Pouch',
            rawName: 'MaxCapBagFi6'
        }
    },
    "Bugs": {
        25: {
            name: 'Miniature_Bug_Pouch',
            rawName: 'MaxCapBagB0'
        },
        50: {
            name: 'Cramped_Bug_Pouch',
            rawName: 'MaxCapBagB1'
        },
        100: {
            name: 'Small_Bug_Pouch',
            rawName: 'MaxCapBagB2'
        },
        250: {
            name: 'Average_Bug_Pouch',
            rawName: 'MaxCapBagB3'
        },
        500: {
            name: 'Sizable_Bug_Pouch',
            rawName: 'MaxCapBagB4'
        },
        1000: {
            name: 'Big_Bug_Pouch',
            rawName: 'MaxCapBagB5'
        },
        2000: {
            name: 'Large_Bug_Pouch',
            rawName: 'MaxCapBagB6'
        }
    },
    "Critters": {
        50: {
            name: 'Cramped_Critter_Pouch',
            rawName: 'MaxCapBagTr0'
        },
        100: {
            name: 'Small_Critter_Pouch',
            rawName: 'MaxCapBagTr1'
        },
        250: {
            name: 'Average_Critter_Pouch',
            rawName: 'MaxCapBagTr2'
        },
        500: {
            name: 'Sizable_Critter_Pouch',
            rawName: 'MaxCapBagTr3'
        },
        1000: {
            name: 'Big_Critter_Pouch',
            rawName: 'MaxCapBagTr4'
        },
        2000: {
            name: 'Large_Critter_Pouch',
            rawName: 'MaxCapBagTr5'
        }
    },
    "Souls": {
        50: {
            name: 'Cramped_Soul_Pouch',
            rawName: 'MaxCapBagS0'
        },
        100: {
            name: 'Small_Soul_Pouch',
            rawName: 'MaxCapBagS1'
        },
        250: {
            name: 'Average_Soul_Pouch',
            rawName: 'MaxCapBagS2'
        },
        500: {
            name: 'Sizable_Soul_Pouch',
            rawName: 'MaxCapBagS3'
        },
        1000: {
            name: 'Big_Soul_Pouch',
            rawName: 'MaxCapBagS4'
        },
        2000: {
            name: 'Large_Soul_Pouch',
            rawName: 'MaxCapBagS5'
        }
    }
};

const statuesMap = {
    0: { name: "Power_Statue", rawName: "Statue1" },
    1: { name: "Speed_Statue", rawName: "Statue2" },
    2: { name: "Mining_Statue", rawName: "Statue3" },
    3: { name: "Feasty_Statue", rawName: "Statue4" },
    4: { name: "Health_Statue", rawName: "Statue5" },
    5: { name: "Kachow_Statue", rawName: "Statue6" },
    6: { name: "Lumberbob_Statue", rawName: "Statue7" },
    7: { name: "Thicc_Skin_Statue", rawName: "Statue8" },
    8: { name: "Oceanman_Statue", rawName: "Statue9" },
    9: { name: "Ol_Reliable_Statue", rawName: "Statue10" },
    10: { name: "Exp_Book_Statue", rawName: "Statue11" },
    11: { name: "Anvil_Statue", rawName: "Statue12" },
    12: { name: "Cauldron_Statue", rawName: "Statue13" },
    13: { name: "Beholder_Statue", rawName: "Statue14" },
    14: { name: "Bullseye_Statue", rawName: "Statue15" },
    15: { name: "Box_Statue", rawName: "Statue16" },
    16: { name: "Twosoul_Statue", rawName: "Statue17" },
    17: { name: "EhExPee_Statue", rawName: "Statue18" }
}

const talentsMap = {
    "Beginner": ["0", "1", "8", "9", "5", "10", "11", "12", "13", "6", "75", "76", "77", "78", "79"],
    "Journeyman": ["15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"],
    "Maestro": ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"],
    "Virtuoso": ["45", "45", "45", "45", "45", "48", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Infinilyte": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Rage Basics": ["0", "1", "8", "9", "5", "10", "11", "12", "13", "6", "85", "86", "87", "88", "89"],
    "Warrior": ["90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104"],
    "Barbarian": ["105", "106", "107", "108", "109", "110", "111", "112", "81", "114", "115", "116", "117", "118", "119"],
    "Squire": ["120", "121", "122", "123", "124", "125", "111", "127", "81", "129", "130", "131", "132", "133", "119"],
    "Blood Berserker": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Death Bringer": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Diving Knight": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Royal Guardian": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Calm Basics": ["0", "1", "8", "9", "5", "10", "11", "12", "13", "6", "263", "266", "267", "268", "269"],
    "Archer": ["270", "271", "272", "273", "274", "284", "276", "277", "278", "279", "280", "281", "282", "283", "265"],
    "Bowman": ["285", "286", "287", "288", "289", "290", "291", "292", "293", "294", "295", "296", "297", "298", "299"],
    "Hunter": ["300", "301", "302", "303", "304", "305", "291", "307", "293", "309", "310", "311", "312", "313", "299"],
    "Siege Breaker": ["315", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Mayheim": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Wind Walker": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Beast Master": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Savvy Basics": ["0", "1", "8", "9", "5", "10", "11", "12", "13", "6", "445", "446", "447", "448", "449"],
    "Mage": ["450", "451", "452", "453", "454", "455", "456", "457", "458", "459", "460", "461", "462", "464", "463"],
    "Wizard": ["465", "466", "467", "468", "469", "470", "486", "472", "488", "474", "475", "476", "477", "478", "494"],
    "Shaman": ["480", "481", "482", "483", "484", "485", "486", "487", "488", "489", "490", "491", "492", "493", "494"],
    "Elemental Sorcerer": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Spiritual Monk": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Bubonic Conjuror": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Arcane Cultist": ["45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45", "45"],
    "Star Talents": ["84", "616", "84", "618", "619", "620", "621", "622", "623", "624", "Blank", "625", "626", "627", "Blank", "632", "631", "630", "84", "628", "84", "634", "635", "84", "84", "Blank", "84", "639", "84", "Blank"]
};

const talentPagesMap = {
    "Beginner": ["Beginner"],
    "Journeyman": ["Beginner", "Journeyman"],
    "Maestro": ["Beginner", "Journeyman", "Maestro"],
    "Warrior": ["Rage Basics", "Warrior"],
    "Barbarian": ["Rage Basics", "Warrior", "Barbarian"],
    "Squire": ["Rage Basics", "Warrior", "Squire"],
    "Archer": ["Calm Basics", "Archer"],
    "Bowman": ["Calm Basics", "Archer", "Bowman"],
    "Hunter": ["Calm Basics", "Archer", "Hunter"],
    "Mage": ["Savvy Basics", "Mage"],
    "Shaman": ["Savvy Basics", "Mage", "Shaman"],
    "Wizard": ["Savvy Basics", "Mage", "Wizard"]
};

const keysMap = {
    0: { name: "Forest_Villa_Key", rawName: 'Key1' },
    1: { name: "Efaunt's_Tomb_Key", rawName: 'Key2' },
    2: { name: "Chizoar's_Cavern_Key", rawName: 'Key3' }
}

const monstersMap = new Map(Object.entries({
    "Blank": "Blank",
    "ForgeA": "Fire_Forge",
    "ForgeB": "Cinder_Forge",
    "Bandit_Bob": "Bandit_Bob",
    "SoulCard1": "Forest_Soul",
    "SoulCard2": "Dune_Soul",
    "SoulCard3": "Rooted_Soul",
    "SoulCard4": "Frigid_Soul",
    "SoulCard5": "Squiddy_Soul",
    "SoulCard6": "Bandit_Bob",
    "CritterCard1": "Froge",
    "CritterCard2": "Crabbo",
    "CritterCard3": "Scorpie",
    "CritterCard4": "Mousey",
    "CritterCard5": "Owlio",
    "CritterCard6": "Pingy",
    "CritterCard7": "Bunny",
    "CritterCard8": "Dung_Beat",
    "CritterCard9": "Honker",
    "Crystal0": "Crystal_Carrot",
    "Crystal1": "Crystal_Crabal",
    "Crystal2": "Crystal_Cattle",
    "mushG": "Green_Mushroom",
    "frogG": "Frog",
    "beanG": "Bored_Bean",
    "slimeG": "Slime",
    "snakeG": "Baby_Boa",
    "carrotO": "Carrotman",
    "goblinG": "Glublin",
    "plank": "Wode_Board",
    "frogBIG": "Gigafrog",
    "branch": "Walking_Stick",
    "acorn": "Nutto",
    "mushW": "Wood_Mushroom",
    "poopSmall": "Poop",
    "ratB": "Rat",
    "poopD": "Boop",
    "rockG": "Healing_Rune",
    "rockB": "Shielding_Rune",
    "rockS": "Skeleton_Rune",
    "jarSand": "Sandy_Pot",
    "mimicA": "Mimic",
    "crabcake": "Crabcake",
    "coconut": "Mafioso",
    "sandcastle": "Sand_Castle",
    "pincermin": "Pincermin",
    "potato": "Mashed_Potato",
    "steak": "Tyson",
    "moonman": "Moonmoon",
    "sandgiant": "Sand_Giant",
    "snailZ": "Snelbie",
    "sheep": "Sheepie",
    "flake": "Frost_Flake",
    "stache": "Sir_Stache",
    "ram": "Dedotated_Ram",
    "bloque": "Bloque",
    "mamoth": "Mamooth",
    "snowball": "Snowman",
    "penguin": "Penguin",
    "thermostat": "Thermister",
    "glass": "Quenchie",
    "snakeB": "Cryosnake",
    "speaker": "Bop_Box",
    "eye": "Neyeptune",
    "mushR": "Red_Mushroom",
    "shovelR": "Dig_Doug",
    "skele": "Xylobone",
    "skele2": "Bloodbone",
    "wolfA": "Amarok",
    "wolfB": "Chaotic_Amarok",
    "wolfC": "Nightmare_Amarok",
    "Boss2A": "Efaunt",
    "Boss2B": "Chaotic_Efaunt",
    "Boss2C": "Nightmare_Amarok",
    "Boss3A": "Chizoar",
    "Boss3B": "Chaotic_Chizoar",
    "Boss3C": "Nightmare_Chizoar",
    "poopBig": "Dr_Defecaus",
    "babayaga": "Baba_Yaga",
    "babaHour": "Biggie_Hours",
    "babaMummy": "King_Doot",
    "xmasEvent": "Giftmas_Blobulyte",
    "xmasEvent2": "Meaning_of_Giftmas",
    "loveEvent": "Loveulyte",
    "loveEvent2": "Chocco_Box",
    "EasterEvent1": "Egggulyte",
    "EasterEvent2": "Egg_Capsule",
    "Blank0ramaFiller": "Nightmare_Amarok",
    "ghost": "Ghost",
    "slimeR": "Valentslime",
    "sheepB": "Floofie",
    "snakeY": "Shell_Snake",
    "Copper": "Copper",
    "Iron": "Iron",
    "Gold": "Gold",
    "Plat": "Plat",
    "Dementia": "Dementia",
    "Void": "Void",
    "Lustre": "Lustre",
    "Starfire": "Starfire",
    "Dreadlo": "Dreadlo",
    "Godshard": "Godshard",
    "OakTree": "Oak_Tree",
    "BirchTree": "Birch_Tree",
    "JungleTree": "Jungle_Tree",
    "ForestTree": "Forest_Tree",
    "PalmTree": "Palm_Tree",
    "ToiletTree": "Toilet_Tree",
    "StumpTree": "Stump_Tree",
    "SaharanFoal": "Saharan_Foal",
    "Tree7": "Wispy_Tree",
    "AlienTree": "Alien_Tree",
    "FishSmall": "Small_Fish",
    "Fish1": "Goldfish",
    "Fish2": "Hermit_Can",
    "Fish3": "Jellyfish",
    "Fish4": "Bloach",
    "BugNest1": "Fly_Nest",
    "BugNest2": "Butterfly_Bar",
    "BugNest3": "Sentient_Bowl",
    "BugNest4": "Grocery_Bag",
    "BugNest5": "Snowden",
    "BugNest6": "Icicle_Nest",
    "Bug1": "Flies",
    "Bug2": "Butterflies",
    "Bug3": "Sentient_Cereal",
    "Bug4": "Fruitflies",
    "Bug5": "Mosquisnow",
    "Bug6": "Flycicle",
    "BossPart": "Error",
    "EfauntArm": "Error",
    "ChestA1": "Bronze_Chest",
    "ChestB1": "Silver_Chest",
    "ChestC1": "Golden_Chest",
    "ChestD1": "Legendary_Chest",
    "ChestA2": "Bronze_Chest",
    "ChestB2": "Silver_Chest",
    "ChestC2": "Golden_Chest",
    "ChestD2": "Legendary_Chest",
    "ChestA3": "Bronze_Chest",
    "ChestB3": "Silver_Chest",
    "ChestC3": "Golden_Chest",
    "ChestD3": "Legendary_Chest",
    "ChestA4": "Bronze_Chest",
    "ChestB4": "Silver_Chest",
    "ChestC4": "Golden_Chest",
    "ChestD4": "Legendary_Chest",
    "ChestA5": "Bronze_Chest",
    "ChestB5": "Silver_Chest",
    "ChestC5": "Golden_Chest",
    "ChestD5": "Legendary_Chest",
    "ChestA6": "Bronze_Chest",
    "ChestB6": "Silver_Chest",
    "ChestC6": "Golden_Chest",
    "ChestD6": "Legendary_Chest",
    "ChestA7": "Bronze_Chest",
    "ChestB7": "Silver_Chest",
    "ChestC7": "Golden_Chest",
    "ChestD7": "Legendary_Chest",
    "ChestA8": "Bronze_Chest",
    "ChestB8": "Silver_Chest",
    "ChestC8": "Golden_Chest",
    "ChestD8": "Legendary_Chest",
    "mushPtutorial": "Error",
    "demonPtutorial": "Error",
    "AlienTreetutorial": "Error",
    "Starlight": "Error",
    "behemoth": "Error",
    "SummerEvent1": "Coastiolyte",
    "SummerEvent2": "Summer_Spirit",
    "shovelY": "Plasti_Doug",
    "crabcakeB": "Mr_Blueberry"
}));

const prayersMap = {
    0: { name: 'Big_Brain_Time', rawName: 'Prayer0' },
    1: { name: 'Skilled_Dimwit', rawName: 'Prayer1' },
    2: { name: 'Unending_Energy', rawName: 'Prayer2' },
    3: { name: 'Shiny_Snitch', rawName: 'Prayer3' },
    4: { name: 'Zerg_Rushogen', rawName: 'Prayer4' },
    5: { name: 'Tachion_of_the_Titans', rawName: 'Prayer5' },
    6: { name: 'Balance_of_Precision', rawName: 'Prayer6' },
    7: { name: 'Midas_Minded', rawName: 'Prayer7' },
    8: { name: 'Jawbreaker', rawName: 'Prayer8' },
    9: { name: 'The_Royal_Sampler', rawName: 'Prayer9' },
    10: { name: 'Antifun_Spirit', rawName: 'Prayer10' },
    11: { name: 'Distillarge', rawName: 'Prayer11' },
    12: { name: 'Ruck_Sack', rawName: 'Prayer12' },
    13: { name: 'Balance_of_Pain', rawName: 'Prayer13' },
    14: { name: 'Balance_of_Aggression', rawName: 'Prayer14' },
    15: { name: 'Unknown', rawName: 'Prayer15' },
    16: { name: 'Unknown', rawName: 'Prayer16' },
    17: { name: 'Unknown', rawName: 'Prayer17' },
    18: { name: 'Unknown', rawName: 'Prayer18' },
    19: { name: 'Unknown', rawName: 'Prayer19' },
    20: { name: 'Unknown', rawName: 'Prayer20' },
    21: { name: 'Unknown', rawName: 'Prayer21' },
    22: { name: 'Unknown', rawName: 'Prayer22' },
    23: { name: 'Unknown', rawName: 'Prayer23' },
    24: { name: 'Unknown', rawName: 'Prayer24' },
}

const itemMap = new Map(Object.entries({
    "Blank": {
        "displayName": "Blank",
        "Class": "ALL",
        "Speed": 3,
        "Reach": 55,
        "Power": 2,
        "Weapon_Power": 2
    },
    "LockedInvSpace": {
        "displayName": "LockedInvSpace",
        "Class": "ALL",
        "Speed": 3,
        "Reach": 55,
        "Power": 2,
        "Weapon_Power": 2
    },
    "COIN": {
        "displayName": "Coins",
        "Class": "ALL",
        "Speed": 3,
        "Reach": 55,
        "Power": 2,
        "Weapon_Power": 2
    },
    "EXP": {
        "displayName": "Exp",
        "Class": "ALL",
        "Speed": 3,
        "Reach": 55,
        "Power": 2,
        "Weapon_Power": 2
    },
    "Copper": {
        "displayName": "Copper_Ore"
    },
    "Iron": {
        "displayName": "Iron_Ore"
    },
    "Gold": {
        "displayName": "Gold_Ore"
    },
    "Plat": {
        "displayName": "Platinum_Ore"
    },
    "Dementia": {
        "displayName": "Dementia_Ore"
    },
    "Void": {
        "displayName": "Void_Ore"
    },
    "Lustre": {
        "displayName": "Lustre_Ore"
    },
    "Starfire": {
        "displayName": "Starfire_Ore"
    },
    "Dreadlo": {
        "displayName": "Dreadlo_Ore"
    },
    "Godshard": {
        "displayName": "Godshard_Ore"
    },
    "CopperBar": {
        "displayName": "Copper_Bar"
    },
    "IronBar": {
        "displayName": "Iron_Bar"
    },
    "GoldBar": {
        "displayName": "Gold_Bar"
    },
    "PlatBar": {
        "displayName": "Platinum_Bar"
    },
    "DementiaBar": {
        "displayName": "Dementia_Bar"
    },
    "VoidBar": {
        "displayName": "Void_Bar"
    },
    "LustreBar": {
        "displayName": "Lustre_Bar"
    },
    "StarfireBar": {
        "displayName": "Starfire_Bar"
    },
    "DreadloBar": {
        "displayName": "Dreadlo_Bar"
    },
    "GodshardBar": {
        "displayName": "Godshard_Bar"
    },
    "OilBarrel1": {
        "displayName": "Crude_Oil"
    },
    "OilBarrel2": {
        "displayName": "Toxic_Sludge"
    },
    "OilBarrel3": {
        "displayName": "Radioactive_Waste"
    },
    "OilBarrel4": {
        "displayName": "Glumlee's_Special_Tutorial_Oil"
    },
    "OilBarrel5": {
        "displayName": "Eco_Friendly_Oil"
    },
    "OakTree": {
        "displayName": "Oak_Logs"
    },
    "BirchTree": {
        "displayName": "Bleach_Logs"
    },
    "JungleTree": {
        "displayName": "Jungle_Logs"
    },
    "ForestTree": {
        "displayName": "Forest_Fibres"
    },
    "ToiletTree": {
        "displayName": "Potty_Rolls"
    },
    "PalmTree": {
        "displayName": "Tropilogs"
    },
    "StumpTree": {
        "displayName": "Veiny_Logs"
    },
    "SaharanFoal": {
        "displayName": "Tundra_Logs"
    },
    "Tree7": {
        "displayName": "Wispy_Lumber"
    },
    "AlienTree": {
        "displayName": "Alien_Hive_Chunk"
    },
    "Leaf1": {
        "displayName": "Grass_Leaf"
    },
    "Leaf2": {
        "displayName": "Twisty_Leaf"
    },
    "Leaf3": {
        "displayName": "Arctic_Leaf"
    },
    "FillerMaterial": {
        "displayName": "Not_Yet"
    },
    "Fish1": {
        "displayName": "Goldfish"
    },
    "Fish2": {
        "displayName": "Hermit_Can"
    },
    "Fish3": {
        "displayName": "Jellyfish"
    },
    "Fish4": {
        "displayName": "Bloach"
    },
    "Fish5": {
        "displayName": "Filler"
    },
    "Fish6": {
        "displayName": "Filler"
    },
    "Fish7": {
        "displayName": "Filler"
    },
    "Fish8": {
        "displayName": "Filler"
    },
    "Bug1": {
        "displayName": "Fly"
    },
    "Bug2": {
        "displayName": "Butterfly"
    },
    "Bug3": {
        "displayName": "Sentient_Cereal"
    },
    "Bug4": {
        "displayName": "Fruitfly"
    },
    "Bug5": {
        "displayName": "Mosquisnow"
    },
    "Bug6": {
        "displayName": "Flycicle"
    },
    "Critter1": {
        "displayName": "Froge"
    },
    "Critter1A": {
        "displayName": "Poison_Froge"
    },
    "Critter2": {
        "displayName": "Crabbo"
    },
    "Critter2A": {
        "displayName": "Mutant_Crabbo"
    },
    "Critter3": {
        "displayName": "Scorpie"
    },
    "Critter3A": {
        "displayName": "Crescent_Scorpie"
    },
    "Critter4": {
        "displayName": "Mousey"
    },
    "Critter4A": {
        "displayName": "Nakeo_Moleo"
    },
    "Critter5": {
        "displayName": "Owlio"
    },
    "Critter5A": {
        "displayName": "Minervowl"
    },
    "Critter6": {
        "displayName": "Pingy"
    },
    "Critter6A": {
        "displayName": "Eternal_Lord_of__The_Undying_Ember"
    },
    "Critter7": {
        "displayName": "Bunny"
    },
    "Critter7A": {
        "displayName": "Purbunni"
    },
    "Critter8": {
        "displayName": "Dung_Beat"
    },
    "Critter8A": {
        "displayName": "Jade_Scarab"
    },
    "Critter9": {
        "displayName": "Honker"
    },
    "Critter9A": {
        "displayName": "Diamond_Duck"
    },
    "Soul1": {
        "displayName": "Forest_Soul"
    },
    "Soul2": {
        "displayName": "Dune_Soul"
    },
    "Soul3": {
        "displayName": "Rooted_Soul"
    },
    "Soul4": {
        "displayName": "Frigid_Soul"
    },
    "Soul5": {
        "displayName": "Squiddy_Soul"
    },
    "Soul6": {
        "displayName": "Cryo_Soul"
    },
    "EquipmentHats1": {
        "displayName": "Farmer_Brim",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "Defence": 2
    },
    "TestObj15": {
        "displayName": "Slime_Cap",
        "lvReqToEquip": 15,
        "Class": "BEGINNER",
        "AGI": 4,
        "LUK": 2
    },
    "EquipmentHatsBeg1": {
        "displayName": "Ice_Cream_Sunday",
        "lvReqToEquip": 30,
        "Class": "BEGINNER",
        "WIS": 6,
        "Defence": 5,
        "UQ1txt": "%_GOLD_FOOD_EFFECT",
        "UQ1val": 10
    },
    "EquipmentHats61": {
        "displayName": "Mark_of_Member",
        "lvReqToEquip": 80,
        "Class": "BEGINNER",
        "LUK": 20,
        "Defence": 50,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 15
    },
    "EquipmentHats15": {
        "displayName": "Leather_Cap",
        "lvReqToEquip": 6,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "Defence": 4
    },
    "EquipmentHats5": {
        "displayName": "White_Headband",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats6": {
        "displayName": "Green_Headband",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2,
        "AGI": 4,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats7": {
        "displayName": "Red_Headband",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2,
        "AGI": 1
    },
    "EquipmentHats8": {
        "displayName": "Purple_Tupacband",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 2,
        "WIS": 5
    },
    "EquipmentHats9": {
        "displayName": "Yellow_Headband",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 2,
        "WIS": 3,
        "LUK": 8
    },
    "EquipmentHats10": {
        "displayName": "Pink_Headband",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 4,
        "AGI": 4,
        "WIS": 4,
        "LUK": 4
    },
    "EquipmentHats11": {
        "displayName": "Grey_Beret",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 1
    },
    "EquipmentHats12": {
        "displayName": "Traffic_Cone",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 1
    },
    "EquipmentHats13": {
        "displayName": "Propeller_Cap",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "WIS": 1
    },
    "EquipmentHats14": {
        "displayName": "Baseball_Hat",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1
    },
    "TestObj14": {
        "displayName": "Trojan_Helmet",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2
    },
    "TestObj16": {
        "displayName": "Demon_Horns",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Power": 50,
        "Weapon_Power": 50,
        "STR": 3,
        "AGI": 3,
        "LUK": 3,
        "Defence": 1
    },
    "EquipmentHats4Choppin": {
        "displayName": "Stump_Prop",
        "lvReqToEquip": 4,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "AGI": 3,
        "LUK": 4,
        "Defence": 2,
        "UQ1txt": "%_CHOP_EFFICIENCY",
        "UQ1val": 5
    },
    "EquipmentHats17": {
        "displayName": "Copper_Helmet",
        "lvReqToEquip": 8,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "Defence": 5
    },
    "EquipmentHats18": {
        "displayName": "Iron_Helmet",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "Defence": 9
    },
    "EquipmentHats28": {
        "displayName": "Gold_Helmet",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "STR": 7,
        "AGI": 7,
        "WIS": 7,
        "Defence": 15,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 3
    },
    "EquipmentHats22": {
        "displayName": "Amarok_Helmet",
        "lvReqToEquip": 38,
        "Class": "ALL",
        "STR": 4,
        "AGI": 4,
        "WIS": 4,
        "LUK": 4,
        "Defence": 20
    },
    "EquipmentHats19": {
        "displayName": "Platinum_Helmet",
        "lvReqToEquip": 55,
        "Class": "ALL",
        "STR": 9,
        "AGI": 9,
        "WIS": 9,
        "Defence": 25,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 5
    },
    "EquipmentHats53": {
        "displayName": "Dementia_Helmet",
        "lvReqToEquip": 70,
        "Class": "ALL",
        "STR": 12,
        "AGI": 12,
        "WIS": 12,
        "LUK": 12,
        "Defence": 34,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 6
    },
    "EquipmentHats52": {
        "displayName": "Efaunt_Helmet",
        "lvReqToEquip": 80,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 8,
        "AGI": 8,
        "WIS": 8,
        "LUK": 8,
        "Defence": 38,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 5
    },
    "EquipmentHats54": {
        "displayName": "Void_Imperium_Helmet",
        "lvReqToEquip": 90,
        "Class": "ALL",
        "STR": 15,
        "AGI": 15,
        "WIS": 15,
        "LUK": 15,
        "Defence": 46,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 8
    },
    "EquipmentHats21": {
        "displayName": "Party_Hat",
        "lvReqToEquip": 10,
        "Class": "BEGINNER",
        "LUK": 5,
        "Defence": 10,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 5
    },
    "EquipmentHats23": {
        "displayName": "Farmer_Brimer",
        "lvReqToEquip": 3,
        "Class": "ALL",
        "AGI": 4,
        "WIS": 2,
        "Defence": 4
    },
    "EquipmentHats24": {
        "displayName": "Farmer_Brimest",
        "lvReqToEquip": 5,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "LUK": 3,
        "Defence": 6
    },
    "EquipmentHats25": {
        "displayName": "Bored_Beanie",
        "lvReqToEquip": 8,
        "Class": "ALL",
        "AGI": 7,
        "LUK": 3,
        "Defence": 5
    },
    "EquipmentHats2": {
        "displayName": "Royal_Turban",
        "lvReqToEquip": 70,
        "Class": "ALL",
        "AGI": 15,
        "Defence": 7,
        "UQ1txt": "%_GOLD_FOOD_EFFECT",
        "UQ1val": 15
    },
    "EquipmentHats27": {
        "displayName": "Paper_Boat",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "STR": 4,
        "WIS": 10,
        "Defence": 12,
        "UQ1txt": "%_FISHIN_EFFICINCY",
        "UQ1val": 5
    },
    "EquipmentHats29": {
        "displayName": "Alien_Headband",
        "lvReqToEquip": 13,
        "Class": "ALL",
        "AGI": 3,
        "WIS": 11,
        "Defence": 4,
        "UQ1txt": "%_MANA_REGEN",
        "UQ1val": 10
    },
    "EquipmentHats30": {
        "displayName": "Cowbo_Galloneer",
        "lvReqToEquip": 6,
        "Class": "ALL",
        "STR": 2,
        "Defence": 3,
        "UQ1txt": "_BASE_DAMAGE",
        "UQ1val": 25
    },
    "EquipmentHats39": {
        "displayName": "Grandma_Disguise",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "WIS": 15,
        "Defence": 5,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 7
    },
    "EquipmentHats42": {
        "displayName": "Santa_Hat",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 5
    },
    "EquipmentHats44": {
        "displayName": "Jar",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "Defence": 25
    },
    "EquipmentHats51": {
        "displayName": "Big_Pretty_Bow",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 5
    },
    "EquipmentHats55": {
        "displayName": "Steam_Cap",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 3
    },
    "EquipmentHats56": {
        "displayName": "Bunny_Ears",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 4,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 4
    },
    "EquipmentHats63": {
        "displayName": "Summer_Shell",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 4,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 4
    },
    "EquipmentHats20": {
        "displayName": "Militia_Helm",
        "lvReqToEquip": 10,
        "Class": "WARRIOR",
        "STR": 7,
        "AGI": 2,
        "Defence": 11
    },
    "TestObj13": {
        "displayName": "Viking_Cap",
        "lvReqToEquip": 40,
        "Class": "WARRIOR",
        "STR": 13,
        "WIS": 3,
        "Defence": 21,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 10
    },
    "EquipmentHats58": {
        "displayName": "Murmillo_Helm",
        "lvReqToEquip": 100,
        "Class": "WARRIOR",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 20,
        "WIS": 10,
        "Defence": 55,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 10
    },
    "EquipmentHats3": {
        "displayName": "Thief_Hood",
        "lvReqToEquip": 10,
        "Class": "ARCHER",
        "STR": 3,
        "AGI": 6,
        "Defence": 9
    },
    "EquipmentHats41": {
        "displayName": "Sleek_Coif",
        "lvReqToEquip": 40,
        "Class": "ARCHER",
        "STR": 4,
        "AGI": 12,
        "Defence": 18
    },
    "EquipmentHats59": {
        "displayName": "Conquistador_Plume",
        "lvReqToEquip": 100,
        "Class": "ARCHER",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 7,
        "AGI": 23,
        "Defence": 47,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 6
    },
    "EquipmentHats16": {
        "displayName": "Top_Hat",
        "lvReqToEquip": 10,
        "Class": "MAGE",
        "WIS": 8,
        "LUK": 1,
        "Defence": 7
    },
    "EquipmentHats26": {
        "displayName": "Witch_Hat",
        "lvReqToEquip": 40,
        "Class": "MAGE",
        "AGI": 1,
        "WIS": 16,
        "Defence": 15
    },
    "EquipmentHats60": {
        "displayName": "Adornment_of_the_High_Priest",
        "lvReqToEquip": 100,
        "Class": "MAGE",
        "Power": 1,
        "Weapon_Power": 1,
        "AGI": 5,
        "WIS": 25,
        "Defence": 40,
        "UQ1txt": "%_CRIT_DAMAGE",
        "UQ1val": 30
    },
    "EquipmentPunching1": {
        "displayName": "Boxing_Gloves",
        "lvReqToEquip": 2,
        "Class": "ALL",
        "Speed": 5,
        "Reach": 55,
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 2,
        "LUK": 2
    },
    "EquipmentPunching2": {
        "displayName": "The_Stingers",
        "lvReqToEquip": 6,
        "Class": "ALL",
        "Speed": 5,
        "Reach": 60,
        "Power": 11,
        "Weapon_Power": 11,
        "STR": 5,
        "LUK": 5
    },
    "EquipmentPunching3": {
        "displayName": "Bandage_Wraps",
        "lvReqToEquip": 25,
        "Class": "BEGINNER",
        "Speed": 7,
        "Reach": 65,
        "Power": 20,
        "Weapon_Power": 20,
        "STR": 6,
        "LUK": 10
    },
    "EquipmentPunching4": {
        "displayName": "Uninflated_Glove",
        "lvReqToEquip": 50,
        "Class": "BEGINNER",
        "Speed": 8,
        "Reach": 65,
        "Power": 27,
        "Weapon_Power": 27,
        "LUK": 13
    },
    "EquipmentPunching5": {
        "displayName": "Eclectic_Ordeal",
        "lvReqToEquip": 85,
        "Class": "BEGINNER",
        "Speed": 9,
        "Reach": 85,
        "Power": 32,
        "Weapon_Power": 32,
        "LUK": 17,
        "UQ1txt": "%_CRIT_CHANCE",
        "UQ1val": 5
    },
    "TestObj1": {
        "displayName": "Wooden_Spear",
        "lvReqToEquip": 4,
        "Class": "ALL",
        "Speed": 5,
        "Reach": 70,
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 3,
        "WIS": 1
    },
    "TestObj7": {
        "displayName": "Steel_Axe",
        "lvReqToEquip": 11,
        "Class": "WARRIOR",
        "Speed": 5,
        "Reach": 62,
        "Power": 14,
        "Weapon_Power": 14,
        "STR": 7,
        "WIS": 3
    },
    "TestObj3": {
        "displayName": "Royal_Bayonet",
        "lvReqToEquip": 30,
        "Class": "WARRIOR",
        "Speed": 5,
        "Reach": 95,
        "Power": 20,
        "Weapon_Power": 20,
        "STR": 10,
        "WIS": 2
    },
    "EquipmentSword1": {
        "displayName": "Enforced_Slasher",
        "lvReqToEquip": 50,
        "Class": "WARRIOR",
        "Speed": 5,
        "Reach": 80,
        "Power": 26,
        "Weapon_Power": 26,
        "STR": 11,
        "WIS": 4
    },
    "EquipmentSword2": {
        "displayName": "The_Ice_Breaker",
        "lvReqToEquip": 75,
        "Class": "WARRIOR",
        "Speed": 5,
        "Reach": 76,
        "Power": 33,
        "Weapon_Power": 33,
        "STR": 13,
        "WIS": 6,
        "UQ1txt": "%_CRIT_DAMAGE",
        "UQ1val": 5
    },
    "EquipmentSword3": {
        "displayName": "Deuscythe",
        "lvReqToEquip": 90,
        "Class": "WARRIOR",
        "Speed": 6,
        "Reach": 88,
        "Power": 40,
        "Weapon_Power": 40,
        "STR": 20,
        "UQ1txt": "%_CRIT_DAMAGE",
        "UQ1val": 5
    },
    "TestObj4": {
        "displayName": "Frozen_Impaler",
        "lvReqToEquip": 45,
        "Class": "WARRIOR",
        "Speed": 3,
        "Reach": 100,
        "Power": 66,
        "Weapon_Power": 66,
        "STR": 4,
        "AGI": 2,
        "WIS": 9,
        "LUK": 2
    },
    "TestObj5": {
        "displayName": "Blood_Screamer",
        "lvReqToEquip": 55,
        "Class": "WARRIOR",
        "Speed": 4,
        "Reach": 84,
        "Power": 87,
        "Weapon_Power": 87,
        "STR": 5,
        "AGI": 15,
        "WIS": 5,
        "LUK": 5
    },
    "TestObj8": {
        "displayName": "Flaming_Katana",
        "lvReqToEquip": 85,
        "Class": "WARRIOR",
        "Speed": 7,
        "Reach": 74,
        "Power": 36,
        "Weapon_Power": 36,
        "WIS": 6,
        "LUK": 8
    },
    "TestObj9": {
        "displayName": "Emerald_Eizon",
        "lvReqToEquip": 95,
        "Class": "WARRIOR",
        "Speed": 7,
        "Reach": 76,
        "Power": 45,
        "Weapon_Power": 45,
        "WIS": 3,
        "LUK": 2
    },
    "TestObj10": {
        "displayName": "Stalagmite",
        "lvReqToEquip": 155,
        "Class": "WARRIOR",
        "Speed": 8,
        "Reach": 78,
        "Power": 55,
        "Weapon_Power": 55,
        "STR": 10,
        "AGI": 5,
        "WIS": 6
    },
    "EquipmentWeapons1": {
        "displayName": "Iron_Sword",
        "lvReqToEquip": 1,
        "Class": "WARRIOR",
        "Speed": 9,
        "Reach": 78,
        "Power": 25,
        "Weapon_Power": 25,
        "STR": 3,
        "LUK": 1
    },
    "TestObj2": {
        "displayName": "Steel_Spear",
        "lvReqToEquip": 25,
        "Class": "WARRIOR",
        "Speed": 2,
        "Reach": 90,
        "Power": 40,
        "Weapon_Power": 40,
        "STR": 2,
        "WIS": 3,
        "LUK": 1
    },
    "EquipmentBows1": {
        "displayName": "Wooden_Bow",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 5,
        "Reach": 150,
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 2,
        "AGI": 3
    },
    "EquipmentBows3": {
        "displayName": "Birch_Longbow",
        "lvReqToEquip": 12,
        "Class": "ARCHER",
        "Speed": 6,
        "Reach": 170,
        "Power": 12,
        "Weapon_Power": 12,
        "STR": 4,
        "AGI": 5
    },
    "EquipmentBows4": {
        "displayName": "Carrot_Launcher",
        "lvReqToEquip": 18,
        "Class": "ARCHER",
        "Speed": 2,
        "Reach": 225,
        "Power": 22,
        "Weapon_Power": 22,
        "AGI": 8
    },
    "EquipmentBows5": {
        "displayName": "Spiked_Menace",
        "lvReqToEquip": 30,
        "Class": "ARCHER",
        "Speed": 6,
        "Reach": 175,
        "Power": 17,
        "Weapon_Power": 17,
        "STR": 5,
        "AGI": 8,
        "LUK": 3
    },
    "EquipmentBows6": {
        "displayName": "Pharoah_Bow",
        "lvReqToEquip": 50,
        "Class": "ARCHER",
        "Speed": 6,
        "Reach": 200,
        "Power": 23,
        "Weapon_Power": 23,
        "STR": 1,
        "AGI": 13
    },
    "EquipmentBows7": {
        "displayName": "Blizzard_Bow",
        "lvReqToEquip": 75,
        "Class": "ARCHER",
        "Speed": 6,
        "Reach": 205,
        "Power": 30,
        "Weapon_Power": 30,
        "AGI": 15,
        "UQ1txt": "%_CRIT_DAMAGE",
        "UQ1val": 5
    },
    "EquipmentBows8": {
        "displayName": "Blackhole_Bow",
        "lvReqToEquip": 90,
        "Class": "ARCHER",
        "Speed": 7,
        "Reach": 230,
        "Power": 36,
        "Weapon_Power": 36,
        "STR": 10,
        "AGI": 13,
        "UQ1txt": "%_CRIT_DAMAGE",
        "UQ1val": 5
    },
    "EquipmentWands1": {
        "displayName": "Gnarled_Wand",
        "lvReqToEquip": 4,
        "Class": "ALL",
        "Speed": 5,
        "Reach": 115,
        "Power": 7,
        "Weapon_Power": 7,
        "WIS": 4
    },
    "EquipmentWands2": {
        "displayName": "Quarterstaff",
        "lvReqToEquip": 12,
        "Class": "MAGE",
        "Speed": 4,
        "Reach": 120,
        "Power": 16,
        "Weapon_Power": 16,
        "WIS": 9
    },
    "EquipmentWands5": {
        "displayName": "Starlight",
        "lvReqToEquip": 30,
        "Class": "MAGE",
        "Speed": 4,
        "Reach": 145,
        "Power": 23,
        "Weapon_Power": 23,
        "AGI": 1,
        "WIS": 11
    },
    "EquipmentWands6": {
        "displayName": "Crows_Nest",
        "lvReqToEquip": 50,
        "Class": "MAGE",
        "Speed": 5,
        "Reach": 160,
        "Power": 30,
        "Weapon_Power": 30,
        "AGI": 5,
        "WIS": 9,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 5
    },
    "EquipmentWands3": {
        "displayName": "Spriggly_Storm",
        "lvReqToEquip": 75,
        "Class": "MAGE",
        "Speed": 5,
        "Reach": 155,
        "Power": 36,
        "Weapon_Power": 36,
        "WIS": 15,
        "LUK": 1,
        "UQ1txt": "%_CRIT_DAMAGE",
        "UQ1val": 5
    },
    "EquipmentWands7": {
        "displayName": "Grey_Gatsby",
        "lvReqToEquip": 90,
        "Class": "MAGE",
        "Speed": 6,
        "Reach": 170,
        "Power": 43,
        "Weapon_Power": 43,
        "AGI": 10,
        "WIS": 13,
        "LUK": 1,
        "UQ1txt": "%_CRIT_DAMAGE",
        "UQ1val": 5
    },
    "EquipmentWands4": {
        "displayName": "Microphone",
        "lvReqToEquip": 1,
        "Class": "MAGE",
        "Speed": 8,
        "Reach": 160,
        "Power": 13,
        "Weapon_Power": 13,
        "AGI": 5,
        "WIS": 9,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 5
    },
    "EquipmentShirts1": {
        "displayName": "Orange_Tee",
        "lvReqToEquip": 2,
        "Class": "ALL",
        "STR": 2,
        "AGI": 1,
        "Defence": 3
    },
    "EquipmentShirts2": {
        "displayName": "Blue_Tee",
        "lvReqToEquip": 4,
        "Class": "ALL",
        "AGI": 1,
        "WIS": 2,
        "Defence": 3
    },
    "EquipmentShirts16": {
        "displayName": "Spore_Tee",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 3,
        "Defence": 3
    },
    "EquipmentShirts3": {
        "displayName": "Black_Tee",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Defence": 5
    },
    "EquipmentShirts4": {
        "displayName": "Tanned_Hide",
        "lvReqToEquip": 15,
        "Class": "ARCHER",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentShirts6": {
        "displayName": "Paralax_Chest",
        "lvReqToEquip": 15,
        "Class": "WARRIOR",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentShirts7": {
        "displayName": "Molten_Chest",
        "lvReqToEquip": 15,
        "Class": "WARRIOR",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentShirts8": {
        "displayName": "REPLACE_ME",
        "lvReqToEquip": 15,
        "Class": "BEGINNER",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentShirts9": {
        "displayName": "REPLACE_ME",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentShirts21": {
        "displayName": "Tattered_Cloth",
        "lvReqToEquip": 15,
        "Class": "MAGE",
        "WIS": 8,
        "LUK": 3
    },
    "EquipmentShirts10": {
        "displayName": "Fur_Shirt",
        "lvReqToEquip": 18,
        "Class": "ARCHER",
        "STR": 5,
        "AGI": 9,
        "Defence": 13
    },
    "EquipmentShirts11": {
        "displayName": "Copper_Platebody",
        "lvReqToEquip": 8,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "Defence": 7
    },
    "EquipmentShirts12": {
        "displayName": "Iron_Platebody",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "Defence": 12,
        "UQ1val": 5
    },
    "EquipmentShirts13": {
        "displayName": "Gold_Platebody",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "Defence": 18
    },
    "EquipmentShirts18": {
        "displayName": "Amarok_Bodyplate",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "Defence": 22
    },
    "EquipmentShirts14": {
        "displayName": "Platinum_Platbody",
        "lvReqToEquip": 50,
        "Class": "ALL",
        "STR": 8,
        "AGI": 8,
        "WIS": 8,
        "Defence": 25
    },
    "EquipmentShirts15": {
        "displayName": "Dementia_Body",
        "lvReqToEquip": 70,
        "Class": "ALL",
        "STR": 10,
        "AGI": 10,
        "WIS": 10,
        "Defence": 35
    },
    "EquipmentShirts26": {
        "displayName": "Efaunt_Ribcage",
        "lvReqToEquip": 80,
        "Class": "ALL",
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "Defence": 30,
        "UQ1txt": "%_MASTERY",
        "UQ1val": 4
    },
    "EquipmentShirts27": {
        "displayName": "Void_Imperium_Platebody",
        "lvReqToEquip": 90,
        "Class": "ALL",
        "STR": 13,
        "AGI": 13,
        "WIS": 13,
        "Defence": 45
    },
    "EquipmentShirts17": {
        "displayName": "MCR_Tshirt",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "AGI": 8,
        "Defence": 1
    },
    "EquipmentShirts19": {
        "displayName": "Planktop",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "STR": 6,
        "Defence": 4
    },
    "EquipmentShirts20": {
        "displayName": "Hide_Shirt",
        "lvReqToEquip": 15,
        "Class": "WARRIOR",
        "STR": 6,
        "Defence": 4
    },
    "EquipmentShirts24": {
        "displayName": "Green_Tee",
        "lvReqToEquip": 2,
        "Class": "ALL",
        "LUK": 3,
        "Defence": 4
    },
    "EquipmentShirts25": {
        "displayName": "Purple_Tee",
        "lvReqToEquip": 2,
        "Class": "ALL",
        "WIS": 3,
        "Defence": 3
    },
    "EquipmentShirts31": {
        "displayName": "Member_Hoodie",
        "lvReqToEquip": 80,
        "Class": "BEGINNER",
        "LUK": 25,
        "Defence": 40,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 15
    },
    "EquipmentShirts5": {
        "displayName": "Studded_Hide",
        "lvReqToEquip": 40,
        "Class": "WARRIOR",
        "STR": 10,
        "WIS": 4,
        "Defence": 22,
        "UQ1txt": "%_FISHIN_EFFICINCY",
        "UQ1val": 10
    },
    "EquipmentShirts23": {
        "displayName": "Feral_Leathering",
        "lvReqToEquip": 40,
        "Class": "ARCHER",
        "STR": 2,
        "AGI": 12,
        "Defence": 18,
        "UQ1txt": "%_CATCH_EFFICINCY",
        "UQ1val": 10
    },
    "EquipmentShirts22": {
        "displayName": "Furled_Robes",
        "lvReqToEquip": 40,
        "Class": "MAGE",
        "AGI": 1,
        "WIS": 13,
        "Defence": 14,
        "UQ1txt": "%_CHOP_EFFICIENCY",
        "UQ1val": 10
    },
    "EquipmentShirts28": {
        "displayName": "Damascus_Plates",
        "lvReqToEquip": 95,
        "Class": "WARRIOR",
        "STR": 17,
        "WIS": 5,
        "Defence": 52
    },
    "EquipmentShirts29": {
        "displayName": "Evergreen_Wraps",
        "lvReqToEquip": 95,
        "Class": "ARCHER",
        "STR": 4,
        "AGI": 19,
        "Defence": 49
    },
    "EquipmentShirts30": {
        "displayName": "Elegantine_Robes",
        "lvReqToEquip": 95,
        "Class": "MAGE",
        "AGI": 1,
        "WIS": 23,
        "Defence": 47
    },
    "EquipmentPants1": {
        "displayName": "Torn_Jeans",
        "lvReqToEquip": 4,
        "Class": "ALL",
        "AGI": 2,
        "WIS": 1,
        "Defence": 4
    },
    "EquipmentPants2": {
        "displayName": "Copper_Platelegs",
        "lvReqToEquip": 8,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "Defence": 6
    },
    "EquipmentPants3": {
        "displayName": "Iron_Platelegs",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "Defence": 11
    },
    "EquipmentPants4": {
        "displayName": "Gold_Platelegs",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "STR": 4,
        "AGI": 4,
        "WIS": 4,
        "Defence": 16
    },
    "EquipmentPants17": {
        "displayName": "Amarok_Hinds",
        "lvReqToEquip": 40,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "Defence": 18
    },
    "EquipmentPants5": {
        "displayName": "Platinum_Shins",
        "lvReqToEquip": 50,
        "Class": "ALL",
        "STR": 6,
        "AGI": 6,
        "WIS": 6,
        "Defence": 23
    },
    "EquipmentPants6": {
        "displayName": "Dementia_Shins",
        "lvReqToEquip": 70,
        "Class": "ALL",
        "STR": 7,
        "AGI": 7,
        "WIS": 7,
        "Defence": 28,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 3
    },
    "EquipmentPants20": {
        "displayName": "Efaunt_Hipilium",
        "lvReqToEquip": 75,
        "Class": "ALL",
        "STR": 4,
        "AGI": 4,
        "WIS": 4,
        "Defence": 32,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 5
    },
    "EquipmentPants21": {
        "displayName": "Void_Imperium_Shardshins",
        "lvReqToEquip": 90,
        "Class": "ALL",
        "STR": 9,
        "AGI": 9,
        "WIS": 9,
        "Defence": 38,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 7
    },
    "EquipmentPants7": {
        "displayName": "Gilded_Pilates",
        "lvReqToEquip": 15,
        "Class": "WARRIOR",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentPants8": {
        "displayName": "Twisted_Scales",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentPants9": {
        "displayName": "Crystallax_Shins",
        "lvReqToEquip": 15,
        "Class": "WARRIOR",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentPants10": {
        "displayName": "Give_Up_On_Life_Pants",
        "lvReqToEquip": 7,
        "Class": "ALL",
        "WIS": 6,
        "Defence": 3
    },
    "EquipmentPants11": {
        "displayName": "Yellow_Belt_Ninja_Pants",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentPants12": {
        "displayName": "Merchantile_Pants",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentPants13": {
        "displayName": "Ancient_Leggings",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentPants14": {
        "displayName": "Forensic_Leggings",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentPants15": {
        "displayName": "Bleached_Designer_Wode_Patch_Pants",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "AGI": 3,
        "WIS": 7,
        "Defence": 11,
        "UQ1txt": "%_CHOP_EFFICIENCY",
        "UQ1val": 5
    },
    "EquipmentPants16": {
        "displayName": "Adam's_Leaf",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 4,
        "WIS": 13,
        "Defence": 2
    },
    "EquipmentPants18": {
        "displayName": "Dirty_Coal_Miner_Baggy_Soot_Pants",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "STR": 7,
        "Defence": 12,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 5
    },
    "EquipmentPants19": {
        "displayName": "Trimmed_Rune_Platelegs",
        "lvReqToEquip": 82,
        "Class": "ALL",
        "STR": 4,
        "AGI": 2,
        "Defence": 20,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 10
    },
    "EquipmentPants22": {
        "displayName": "Fishing_Overalls",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "STR": 8,
        "Defence": 15,
        "UQ1txt": "%_FISHIN_EFFICINCY",
        "UQ1val": 12
    },
    "EquipmentPants23": {
        "displayName": "Bandito_Pantaloon",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "AGI": 9,
        "Defence": 14,
        "UQ1txt": "%_CATCH_EFFICINCY",
        "UQ1val": 12
    },
    "EquipmentShoes1": {
        "displayName": "Copper_Boots",
        "lvReqToEquip": 8,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 2,
        "Defence": 2
    },
    "EquipmentShoes15": {
        "displayName": "Iron_Boots",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "Defence": 4
    },
    "EquipmentShoes3": {
        "displayName": "Gold_Boots",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "LUK": 3,
        "Defence": 8
    },
    "EquipmentShoes20": {
        "displayName": "Amarok_Paws",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "Defence": 10,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 3
    },
    "EquipmentShoes4": {
        "displayName": "Platinum_Boots",
        "lvReqToEquip": 50,
        "Class": "ALL",
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "LUK": 5,
        "Defence": 15,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 5
    },
    "EquipmentShoes5": {
        "displayName": "Dementia_Boots",
        "lvReqToEquip": 65,
        "Class": "ALL",
        "STR": 7,
        "AGI": 7,
        "WIS": 7,
        "LUK": 7,
        "Defence": 22,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 7
    },
    "EquipmentShoes21": {
        "displayName": "Efaunts_Broken_Ankles",
        "lvReqToEquip": 75,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "Defence": 18,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 2
    },
    "EquipmentShoes22": {
        "displayName": "Void_Imperium_Kicks",
        "lvReqToEquip": 85,
        "Class": "ALL",
        "STR": 9,
        "AGI": 9,
        "WIS": 9,
        "LUK": 9,
        "Defence": 30,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 8
    },
    "EquipmentShoes6": {
        "displayName": "Hermes_Boots",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentShoes7": {
        "displayName": "Goo_Galoshes",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 2,
        "UQ1txt": "%_MONEY",
        "UQ1val": 5
    },
    "EquipmentShoes8": {
        "displayName": "Yeti_Walkers",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentShoes9": {
        "displayName": "Flip_Flops",
        "lvReqToEquip": 4,
        "Class": "ALL",
        "AGI": 3,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 2
    },
    "EquipmentShoes10": {
        "displayName": "Flap_Flops",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "LUK": 3,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 3
    },
    "EquipmentShoes11": {
        "displayName": "Floop_Flops",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "LUK": 3,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 4
    },
    "EquipmentShoes12": {
        "displayName": "Flux_Flops",
        "lvReqToEquip": 50,
        "Class": "ALL",
        "STR": 5,
        "AGI": 3,
        "LUK": 8,
        "Defence": 40,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 5
    },
    "EquipmentShoes13": {
        "displayName": "Gaia_Shoes",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 2,
        "AGI": 6,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 2
    },
    "EquipmentShoes14": {
        "displayName": "Cauldrunners",
        "lvReqToEquip": 30,
        "Class": "MAGE",
        "WIS": 9,
        "Defence": 4,
        "UQ1txt": "%_BREW_SPEED",
        "UQ1val": 4
    },
    "EquipmentShoes16": {
        "displayName": "Cavern_Trekkers",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "STR": 5,
        "WIS": 1,
        "Defence": 10,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 20
    },
    "EquipmentShoes17": {
        "displayName": "Logger_Heels",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "WIS": 7,
        "Defence": 6,
        "UQ1txt": "%_CHOP_EFFICIENCY",
        "UQ1val": 20
    },
    "EquipmentShoes18": {
        "displayName": "Angler_Boots",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "STR": 6,
        "Defence": 8,
        "UQ1txt": "%_FISHIN_EFFICINCY",
        "UQ1val": 20
    },
    "EquipmentShoes19": {
        "displayName": "Bandito_Boots",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "AGI": 6,
        "Defence": 8,
        "UQ1txt": "%_CATCH_EFFICINCY",
        "UQ1val": 20
    },
    "EquipmentShoes2": {
        "displayName": "Eyern_Boots",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Defence": 1,
        "UQ1txt": "%_NOVELTY",
        "UQ1val": 100
    },
    "EquipmentPendant1": {
        "displayName": "Mint_Icey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 1
    },
    "EquipmentPendant2": {
        "displayName": "Strawbu_Icey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 2
    },
    "EquipmentPendant3": {
        "displayName": "Rok_Road_Icey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "LUK": 2,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 3
    },
    "EquipmentPendant4": {
        "displayName": "Rainbo_Icey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "LUK": 2,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 4
    },
    "EquipmentPendant5": {
        "displayName": "Chocotastic_Icey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "LUK": 3,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 5
    },
    "EquipmentPendant6": {
        "displayName": "Blubbery_Icey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 10,
        "Weapon_Power": 10,
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "LUK": 3,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 6
    },
    "EquipmentPendant7": {
        "displayName": "Lava_Icey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 12,
        "Weapon_Power": 12,
        "STR": 4,
        "AGI": 4,
        "WIS": 4,
        "LUK": 4,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 8
    },
    "EquipmentPendant8": {
        "displayName": "Legends_Icey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 15,
        "Weapon_Power": 15,
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "LUK": 5,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 10
    },
    "EquipmentPendant9": {
        "displayName": "Little_Wooden_Katana",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2,
        "AGI": 1
    },
    "EquipmentPendant10": {
        "displayName": "Sleek_Shank",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "Defence": 4
    },
    "EquipmentPendant11": {
        "displayName": "Carrot_Horror",
        "lvReqToEquip": 14,
        "Class": "ALL",
        "AGI": 2,
        "WIS": 5,
        "LUK": 2
    },
    "EquipmentPendant12": {
        "displayName": "Tarantulight",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "LUK": 5
    },
    "EquipmentPendant13": {
        "displayName": "Quartz_Pendant",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "LUK": 5
    },
    "EquipmentPendant14": {
        "displayName": "Fuscismatia",
        "lvReqToEquip": 70,
        "Class": "ALL",
        "WIS": 10,
        "Defence": 5,
        "UQ1txt": "_PURPLE_DEPTH",
        "UQ1val": 30
    },
    "EquipmentPendant15": {
        "displayName": "Lucky_Fish_Head",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "LUK": 5
    },
    "EquipmentPendant16": {
        "displayName": "Strung_Bludgeon",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "Power": 4,
        "Weapon_Power": 4
    },
    "EquipmentPendant17": {
        "displayName": "Chaotic_Amarok_Pendant",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "WIS": 12
    },
    "EquipmentPendant18": {
        "displayName": "Strung_Steamy",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 3,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 3
    },
    "EquipmentRings1": {
        "displayName": "Gold_Ring",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentRings2": {
        "displayName": "Copper_Band",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 3
    },
    "EquipmentRings3": {
        "displayName": "Steel_Band",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 4,
        "Defence": 1
    },
    "EquipmentRings4": {
        "displayName": "Molden_Crust",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentRings5": {
        "displayName": "Toxic_Bubbles_Band",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3,
        "AGI": 3,
        "LUK": 3
    },
    "EquipmentRings6": {
        "displayName": "Death_Wish",
        "lvReqToEquip": 55,
        "Class": "ALL",
        "Power": 4,
        "Weapon_Power": 4,
        "Defence": 6,
        "UQ1txt": "%_BOSS_DAMAGE",
        "UQ1val": 5
    },
    "EquipmentRings7": {
        "displayName": "Pugilist_Demise",
        "lvReqToEquip": 9,
        "Class": "ALL",
        "STR": 3,
        "UQ1txt": "%_BOSS_DAMAGE",
        "UQ1val": 4
    },
    "EquipmentRings8": {
        "displayName": "The_Used_Bandaid",
        "lvReqToEquip": 9,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 6,
        "AGI": 4,
        "LUK": 1,
        "UQ1txt": "%_BOSS_DAMAGE"
    },
    "EquipmentRings9": {
        "displayName": "Chat_Ring",
        "lvReqToEquip": 12,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 6,
        "AGI": 2,
        "UQ1txt": "%_BOSS_DAMAGE"
    },
    "EquipmentRings10": {
        "displayName": "Spikeweed_Ring",
        "lvReqToEquip": 9,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 6,
        "AGI": 2
    },
    "EquipmentRings11": {
        "displayName": "Defenders_Dignity",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "Defence": 15
    },
    "EquipmentRingsFishing1": {
        "displayName": "Shallow_Watering",
        "lvReqToEquip": 9,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 6,
        "AGI": 2,
        "UQ1txt": "_YELLOW_DEPTH",
        "UQ1val": 20
    },
    "EquipmentRingsFishing2": {
        "displayName": "Oceanic_Ring",
        "lvReqToEquip": 9,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 6,
        "AGI": 2,
        "UQ1txt": "_RED_DEPTH",
        "UQ1val": 30
    },
    "EquipmentRingsFishing3": {
        "displayName": "Deepwater_Trench_Ring",
        "lvReqToEquip": 9,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 6,
        "AGI": 2,
        "UQ1txt": "_PURPLE_DEPTH",
        "UQ1val": 40
    },
    "EquipmentRings12": {
        "displayName": "Frisbee_Ring",
        "lvReqToEquip": 45,
        "Class": "ALL",
        "STR": 12,
        "UQ1txt": "_ACCURACY",
        "UQ1val": 20
    },
    "EquipmentRings13": {
        "displayName": "Silver_Stopwatch",
        "lvReqToEquip": 17,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_FIGHT_AFK_GAIN",
        "UQ1val": 2
    },
    "EquipmentRings14": {
        "displayName": "Dooble_Goopi",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "LUK": 1,
        "Defence": 2,
        "UQ1txt": "%_MONEY",
        "UQ1val": 5
    },
    "EquipmentRings15": {
        "displayName": "Sanic_Ring",
        "lvReqToEquip": 60,
        "Class": "ALL",
        "AGI": 8,
        "LUK": 4,
        "Defence": 5,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 1
    },
    "EquipmentRings16": {
        "displayName": "Efaunt_Trunculus",
        "lvReqToEquip": 85,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "AGI": 10,
        "Defence": 8,
        "UQ1txt": "%_CRIT_CHANCE",
        "UQ1val": 2
    },
    "EquipmentRingsChat1": {
        "displayName": "Love_Ring",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_LOVE",
        "UQ1val": 69
    },
    "EquipmentRingsChat2": {
        "displayName": "Leafy_Ring",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_ALL_NATURAL",
        "UQ1val": 100
    },
    "EquipmentRingsChat3": {
        "displayName": "Wealth_Ring",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "LUK": 3,
        "UQ1txt": "%_COOLNESS",
        "UQ1val": 777
    },
    "EquipmentRingsChat4": {
        "displayName": "Bob_Ring",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_BOB",
        "UQ1val": 808
    },
    "EquipmentRingsChat5": {
        "displayName": "Bubble_Ring",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_POP_CHANCE"
    },
    "EquipmentRingsChat6": {
        "displayName": "Cthulu's_Ring",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_PURE_EVIL",
        "UQ1val": 666
    },
    "EquipmentRingsChat8": {
        "displayName": "Lava_Sez_Buy_More_Gems",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_SELF_ESTEEM",
        "UQ1val": 1
    },
    "EquipmentRingsChat9": {
        "displayName": "HONK_Ring",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_HONK",
        "UQ1val": 100
    },
    "EquipmentTools1": {
        "displayName": "Junk_Pickaxe",
        "lvReqToEquip": 2,
        "Class": "ALL",
        "Speed": 3,
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 1
    },
    "EquipmentTools2": {
        "displayName": "Copper_Pickaxe",
        "lvReqToEquip": 5,
        "Class": "ALL",
        "Speed": 3,
        "Power": 6,
        "Weapon_Power": 6,
        "STR": 3
    },
    "EquipmentTools3": {
        "displayName": "Iron_Pickaxe",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "Speed": 4,
        "Power": 10,
        "Weapon_Power": 10,
        "STR": 5,
        "AGI": 2
    },
    "EquipmentTools5": {
        "displayName": "Gold_Pickaxe",
        "lvReqToEquip": 17,
        "Class": "ALL",
        "Speed": 4,
        "Power": 13,
        "Weapon_Power": 13,
        "STR": 8,
        "AGI": 3
    },
    "EquipmentTools6": {
        "displayName": "Platinum_Pickaxe",
        "lvReqToEquip": 27,
        "Class": "ALL",
        "Speed": 4,
        "Power": 16,
        "Weapon_Power": 16,
        "STR": 11,
        "AGI": 4,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 1
    },
    "EquipmentTools7": {
        "displayName": "Dementia_Pickaxe",
        "lvReqToEquip": 37,
        "Class": "ALL",
        "Speed": 4,
        "Power": 19,
        "Weapon_Power": 19,
        "STR": 15,
        "AGI": 5,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 2
    },
    "EquipmentTools11": {
        "displayName": "Void_Imperium_Pik",
        "lvReqToEquip": 47,
        "Class": "ALL",
        "Speed": 5,
        "Power": 24,
        "Weapon_Power": 24,
        "STR": 18,
        "AGI": 6,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 8
    },
    "EquipmentTools8": {
        "displayName": "Lustre_Pickaxe",
        "lvReqToEquip": 60,
        "Class": "ALL",
        "Speed": 5,
        "Power": 28,
        "Weapon_Power": 28,
        "STR": 22,
        "AGI": 7,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 5
    },
    "EquipmentTools9": {
        "displayName": "Dreadlo_Pickolo",
        "lvReqToEquip": 70,
        "Class": "ALL",
        "Speed": 5,
        "Power": 35,
        "Weapon_Power": 35,
        "STR": 26,
        "AGI": 9,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 8
    },
    "EquipmentTools10": {
        "displayName": "Poopy_Pickaxe",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Speed": 2,
        "Power": 18,
        "Weapon_Power": 18,
        "Defence": 3,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 2
    },
    "EquipmentToolsHatchet0": {
        "displayName": "Old_Hatchet",
        "lvReqToEquip": 2,
        "Class": "ALL",
        "Speed": 3,
        "Power": 3,
        "Weapon_Power": 3,
        "WIS": 1
    },
    "EquipmentToolsHatchet3": {
        "displayName": "Copper_Chopper",
        "lvReqToEquip": 5,
        "Class": "ALL",
        "Speed": 3,
        "Power": 7,
        "Weapon_Power": 7,
        "AGI": 1,
        "WIS": 3
    },
    "EquipmentToolsHatchet1": {
        "displayName": "Iron_Hatchet",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "Speed": 3,
        "Power": 10,
        "Weapon_Power": 10,
        "STR": 2,
        "WIS": 5
    },
    "EquipmentToolsHatchet2b": {
        "displayName": "Stinky_Axe",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Speed": 2,
        "Power": 18,
        "Weapon_Power": 18,
        "WIS": 8,
        "LUK": 4
    },
    "EquipmentToolsHatchet2": {
        "displayName": "Golden_Axe",
        "lvReqToEquip": 17,
        "Class": "ALL",
        "Speed": 4,
        "Power": 14,
        "Weapon_Power": 14,
        "WIS": 8,
        "LUK": 4
    },
    "EquipmentToolsHatchet4": {
        "displayName": "Plat_Hatchet",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "Speed": 4,
        "Power": 18,
        "Weapon_Power": 18,
        "AGI": 5,
        "WIS": 14
    },
    "EquipmentToolsHatchet5": {
        "displayName": "Dementia_Dicer",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "Speed": 4,
        "Power": 23,
        "Weapon_Power": 23,
        "AGI": 6,
        "WIS": 17
    },
    "EquipmentToolsHatchet7": {
        "displayName": "Void_Imperium_Axe",
        "lvReqToEquip": 45,
        "Class": "ALL",
        "Speed": 5,
        "Power": 26,
        "Weapon_Power": 26,
        "AGI": 7,
        "WIS": 20
    },
    "EquipmentToolsHatchet6": {
        "displayName": "Lustre_Logger",
        "lvReqToEquip": 65,
        "Class": "ALL",
        "Speed": 5,
        "Power": 29,
        "Weapon_Power": 29,
        "WIS": 24,
        "LUK": 8
    },
    "EquipmentToolsHatchet8": {
        "displayName": "Starfire_Hatchet",
        "lvReqToEquip": 80,
        "Class": "ALL",
        "Speed": 5,
        "Power": 35,
        "Weapon_Power": 35,
        "AGI": 9,
        "WIS": 28,
        "LUK": 3
    },
    "EquipmentToolsHatchet9": {
        "displayName": "Dreadlo_Eviscerator",
        "lvReqToEquip": 90,
        "Class": "ALL",
        "Speed": 5,
        "Power": 40,
        "Weapon_Power": 40,
        "STR": 4,
        "AGI": 4,
        "WIS": 32,
        "LUK": 4
    },
    "EquipmentToolsHatchet10": {
        "displayName": "Annihilator_of_the_Yggdrasil",
        "lvReqToEquip": 100,
        "Class": "ALL",
        "Speed": 6,
        "Power": 50,
        "Weapon_Power": 50,
        "STR": 5,
        "AGI": 5,
        "WIS": 40,
        "LUK": 5
    },
    "FishingRod1": {
        "displayName": "Wood_Fishing_Rod",
        "lvReqToEquip": 2,
        "Class": "ALL",
        "Speed": 3,
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 1
    },
    "FishingRod2": {
        "displayName": "Copper_Fish_Rod",
        "lvReqToEquip": 5,
        "Class": "ALL",
        "Speed": 3,
        "Power": 8,
        "Weapon_Power": 8,
        "STR": 2
    },
    "FishingRod3": {
        "displayName": "Iron_Fishing_Rod",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "Speed": 4,
        "Power": 13,
        "Weapon_Power": 13,
        "STR": 4,
        "WIS": 1
    },
    "FishingRod4": {
        "displayName": "Gold_Fishing_Rod",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Speed": 4,
        "Power": 19,
        "Weapon_Power": 19,
        "STR": 6,
        "LUK": 4
    },
    "FishingRod5": {
        "displayName": "Plat_Fishing_Rod",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "Speed": 5,
        "Power": 25,
        "Weapon_Power": 25,
        "STR": 9
    },
    "FishingRod6": {
        "displayName": "Dementia_Rod_for_Fishing",
        "lvReqToEquip": 33,
        "Class": "ALL",
        "Speed": 5,
        "Power": 30,
        "Weapon_Power": 30,
        "STR": 12
    },
    "FishingRod7": {
        "displayName": "Void_Imperium_Rod",
        "lvReqToEquip": 40,
        "Class": "ALL",
        "Speed": 5,
        "Power": 36,
        "Weapon_Power": 36,
        "STR": 15
    },
    "CatchingNet1": {
        "displayName": "Bug_Net",
        "lvReqToEquip": 2,
        "Class": "ALL",
        "Speed": 4,
        "Power": 4,
        "Weapon_Power": 4,
        "AGI": 2
    },
    "CatchingNet2": {
        "displayName": "Copper_Netted_Net",
        "lvReqToEquip": 5,
        "Class": "ALL",
        "Speed": 4,
        "Power": 9,
        "Weapon_Power": 9,
        "STR": 1,
        "AGI": 3
    },
    "CatchingNet3": {
        "displayName": "Reinforced_Net",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "Speed": 4,
        "Power": 14,
        "Weapon_Power": 14,
        "STR": 2,
        "AGI": 4
    },
    "CatchingNet4": {
        "displayName": "Gilded_Net",
        "lvReqToEquip": 17,
        "Class": "ALL",
        "Speed": 5,
        "Power": 20,
        "Weapon_Power": 20,
        "STR": 2,
        "AGI": 6
    },
    "CatchingNet5": {
        "displayName": "Platinet",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "Speed": 5,
        "Power": 26,
        "Weapon_Power": 26,
        "STR": 3,
        "AGI": 7
    },
    "CatchingNet6": {
        "displayName": "Dementia_Net",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "Speed": 5,
        "Power": 31,
        "Weapon_Power": 31,
        "STR": 4,
        "AGI": 9
    },
    "CatchingNet7": {
        "displayName": "Void_Imperium_Net",
        "lvReqToEquip": 45,
        "Class": "ALL",
        "Speed": 5,
        "Power": 37,
        "Weapon_Power": 37,
        "STR": 6,
        "AGI": 12
    },
    "TrapBoxSet1": {
        "displayName": "Cardboard_Traps",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 4,
        "Power": 4,
        "Weapon_Power": 4,
        "AGI": 2
    },
    "TrapBoxSet2": {
        "displayName": "Silkskin_Traps",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "Speed": 4,
        "Power": 8,
        "Weapon_Power": 8,
        "AGI": 4
    },
    "TrapBoxSet3": {
        "displayName": "Wooden_Traps",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "Speed": 4,
        "Power": 13,
        "Weapon_Power": 13,
        "AGI": 7
    },
    "TrapBoxSet4": {
        "displayName": "Natural_Traps",
        "lvReqToEquip": 30,
        "Class": "ALL",
        "Speed": 4,
        "Power": 20,
        "Weapon_Power": 20,
        "AGI": 10
    },
    "TrapBoxSet5": {
        "displayName": "Steel_Traps",
        "lvReqToEquip": 40,
        "Class": "ALL",
        "Speed": 4,
        "Power": 26,
        "Weapon_Power": 26,
        "AGI": 12
    },
    "TrapBoxSet6": {
        "displayName": "Royal_Traps",
        "lvReqToEquip": 50,
        "Class": "ALL",
        "Speed": 4,
        "Power": 34,
        "Weapon_Power": 34,
        "AGI": 15
    },
    "WorshipSkull1": {
        "displayName": "Wax_Skull",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 4,
        "Power": 4,
        "Weapon_Power": 4,
        "WIS": 2
    },
    "WorshipSkull2": {
        "displayName": "Ceramic_Skull",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "Speed": 5,
        "Power": 8,
        "Weapon_Power": 8,
        "WIS": 4
    },
    "WorshipSkull3": {
        "displayName": "Horned_Skull",
        "lvReqToEquip": 25,
        "Class": "ALL",
        "Speed": 5,
        "Power": 13,
        "Weapon_Power": 13,
        "WIS": 7
    },
    "WorshipSkull4": {
        "displayName": "Prickle_Skull",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "Speed": 6,
        "Power": 20,
        "Weapon_Power": 20,
        "WIS": 10
    },
    "WorshipSkull5": {
        "displayName": "Manifested_Skull",
        "lvReqToEquip": 55,
        "Class": "ALL",
        "Speed": 7,
        "Power": 26,
        "Weapon_Power": 26,
        "WIS": 12
    },
    "WorshipSkull6": {
        "displayName": "Wax_Skull",
        "lvReqToEquip": 70,
        "Class": "ALL",
        "Speed": 4,
        "Power": 34,
        "Weapon_Power": 34,
        "WIS": 15
    },
    "FoodHealth1": {
        "displayName": "Nomwich"
    },
    "FoodHealth3": {
        "displayName": "Hot_Dog"
    },
    "FoodHealth2": {
        "displayName": "Cheezy_Pizza"
    },
    "Peanut": {
        "displayName": "Peanut"
    },
    "FoodHealth4": {
        "displayName": "Saucy_Weiner"
    },
    "FoodHealth6": {
        "displayName": "Kebab_Sticks"
    },
    "FoodHealth7": {
        "displayName": "Meat_Pie"
    },
    "FoodHealth10": {
        "displayName": "Mountain_Bread"
    },
    "FoodHealth9": {
        "displayName": "Yeti_Ham"
    },
    "FoodHealth11": {
        "displayName": "Sheepie_Dairy"
    },
    "FoodHealth5": {
        "displayName": "Cranberry_Jam"
    },
    "FoodHealth8": {
        "displayName": "Crabby_Cake_Supreme"
    },
    "FoodEvent8": {
        "displayName": "Milk_Choco"
    },
    "Meatloaf": {
        "displayName": "Magic_Meatloaf"
    },
    "FoodPotOr1": {
        "displayName": "Small_Strength_Potion"
    },
    "FoodPotOr2": {
        "displayName": "Average_Strength_Potion"
    },
    "FoodPotOr3": {
        "displayName": "Decent_Strength_Potion"
    },
    "FoodPotRe1": {
        "displayName": "Small_Life_Potion"
    },
    "FoodPotRe2": {
        "displayName": "Average_Life_Potion"
    },
    "FoodPotRe3": {
        "displayName": "Decent_Life_Potion"
    },
    "FoodPotGr1": {
        "displayName": "Small_Speed_Potion"
    },
    "FoodPotGr2": {
        "displayName": "Average_Speed_Potion"
    },
    "FoodPotGr3": {
        "displayName": "Decent_Speed_Potion"
    },
    "FoodEvent7": {
        "displayName": "Minto_Choco"
    },
    "FoodPotMana1": {
        "displayName": "Small_Mana_Potion"
    },
    "FoodPotMana2": {
        "displayName": "Average_Mana_Potion"
    },
    "FoodPotMana3": {
        "displayName": "Decent_Mana_Potion"
    },
    "FoodPotYe1": {
        "displayName": "Small_EXP_Potion",
        "Class": "ClassEXP"
    },
    "FoodPotYe2": {
        "displayName": "Average_EXP_Potion",
        "Class": "ClassEXP"
    },
    "FoodPotYe3": {
        "displayName": "Decent_EXP_Potion",
        "Class": "ClassEXP"
    },
    "FoodEvent6": {
        "displayName": "Lemony_Choco",
        "Class": "ClassEXP"
    },
    "Pearl3": {
        "displayName": "Shiny_Pearl",
        "Class": "ClassEXP"
    },
    "FoodMining1": {
        "displayName": "Icing_Ironbite"
    },
    "FoodEvent1": {
        "displayName": "Giftybread_Man"
    },
    "Pearl2": {
        "displayName": "Stained_Pearl"
    },
    "FoodChoppin1": {
        "displayName": "Saucy_Logfries"
    },
    "FoodEvent2": {
        "displayName": "Chogg_Nog"
    },
    "FoodFish1": {
        "displayName": "Slurpin_Herm"
    },
    "FoodEvent3": {
        "displayName": "Candy_Canes"
    },
    "Pearl1": {
        "displayName": "Aqua_Pearl"
    },
    "FoodCatch1": {
        "displayName": "Buttered_Toasted_Butter"
    },
    "FoodEvent4": {
        "displayName": "Mistleberries"
    },
    "FoodTrapping1": {
        "displayName": "Critter_Numnums"
    },
    "FoodWorship1": {
        "displayName": "Soulble_Gum"
    },
    "Bullet": {
        "displayName": "Bullet"
    },
    "BulletB": {
        "displayName": "FMJ_Bullet"
    },
    "MidnightCookie": {
        "displayName": "Midnight_Cookie"
    },
    "FoodEvent5": {
        "displayName": "Cherry_Choco"
    },
    "PeanutG": {
        "displayName": "Golden_Peanut"
    },
    "FoodG1": {
        "displayName": "Golden_Jam"
    },
    "FoodG2": {
        "displayName": "Golden_Kebabs"
    },
    "FoodG3": {
        "displayName": "Golden_Meat_Pie"
    },
    "FoodG4": {
        "displayName": "Golden_Nomwich"
    },
    "FoodG5": {
        "displayName": "Golden_Ham"
    },
    "FoodG6": {
        "displayName": "Golden_Bread"
    },
    "ButterBar": {
        "displayName": "Butter_Bar"
    },
    "rtt0": {
        "displayName": "Bottled_Town_Teleport"
    },
    "ResetFrag": {
        "displayName": "Talent_Point_Reset_Fragment"
    },
    "ResetCompleted": {
        "displayName": "Talent_Point_Reset_Potion"
    },
    "ResetCompletedS": {
        "displayName": "Star_Talent_Reset_Potion"
    },
    "ClassSwap": {
        "displayName": "Sub_Class_Swap_Token"
    },
    "ResetBox": {
        "displayName": "Post_Office_Box_Reseto_Magnifico"
    },
    "Ht": {
        "displayName": "Hat_Premiumifier"
    },
    "StonePremRestore": {
        "displayName": "Premium_Stone_Refunder"
    },
    "ExpBalloon1": {
        "displayName": "Small_Experience_Balloon"
    },
    "ExpBalloon2": {
        "displayName": "Medium_Experience_Balloon"
    },
    "ExpBalloon3": {
        "displayName": "Large_Experience_Balloon"
    },
    "JobApplication": {
        "displayName": "Job_Application"
    },
    "SmithingHammerChisel": {
        "displayName": "Sculpting_Tools"
    },
    "SmithingHammerChisel2": {
        "displayName": "Guilding_Tools"
    },
    "BobJoePickle": {
        "displayName": "BobJoePickle"
    },
    "Quest1": {
        "displayName": "Mining_Certificate"
    },
    "Crystal1": {
        "displayName": "Desert_Topaz"
    },
    "Crystal2": {
        "displayName": "Glacier_Quartz"
    },
    "Crystal3": {
        "displayName": "Galaxial_Amethyst"
    },
    "Quest2": {
        "displayName": "Mining_Certificate"
    },
    "PeanutS": {
        "displayName": "Stone_Peanut"
    },
    "Quest3": {
        "displayName": "Ketchup_Bottle"
    },
    "Quest4": {
        "displayName": "Mustard_Bottle"
    },
    "Mayo": {
        "displayName": "Mayonnaise_Bottle"
    },
    "Trash": {
        "displayName": "Broken_Weapon"
    },
    "Trash2": {
        "displayName": "Dried_Paint_Blob"
    },
    "Trash3": {
        "displayName": "Engraved_Bullet"
    },
    "Quest5": {
        "displayName": "Golden_Jam"
    },
    "Quest6": {
        "displayName": "Scouting_Report"
    },
    "Quest7": {
        "displayName": "Strange_Rock"
    },
    "Quest8": {
        "displayName": "Filler_bc_I_messed_up"
    },
    "Quest10": {
        "displayName": "Green_Tea"
    },
    "Quest11": {
        "displayName": "Forest_Villas_Flyer_Thingy"
    },
    "Quest12": {
        "displayName": "Dog_Bone"
    },
    "Quest13": {
        "displayName": "Empty_Box"
    },
    "Quest14": {
        "displayName": "Employment_Statistics"
    },
    "Quest15": {
        "displayName": "Red_Frisbee"
    },
    "Quest16": {
        "displayName": "Broken_Mic"
    },
    "Quest17": {
        "displayName": "Amarok_Slab"
    },
    "Quest18": {
        "displayName": "Loomi's_Room_Key"
    },
    "Quest19": {
        "displayName": "Golden_Dubloon"
    },
    "Quest20": {
        "displayName": "Signed_Arrest_Warrant"
    },
    "Quest21": {
        "displayName": "Time_Thingy"
    },
    "Quest22": {
        "displayName": "Corporatube_Sub"
    },
    "Quest23": {
        "displayName": "Instablab_Follower"
    },
    "Quest24": {
        "displayName": "Cloudsound_Follower"
    },
    "Quest25": {
        "displayName": "Birthday_Card"
    },
    "Quest26": {
        "displayName": "Pre_Crime_Box"
    },
    "Quest27": {
        "displayName": "Bag_o_Nuts"
    },
    "Quest28": {
        "displayName": "IOU_One_Blue_Crystal"
    },
    "Quest29": {
        "displayName": "Chaotic_Amarok_Slab"
    },
    "GoldricP1": {
        "displayName": "Casual_Confidante"
    },
    "GoldricP2": {
        "displayName": "Triumphant_Treason"
    },
    "GoldricP3": {
        "displayName": "Claiming_Cashe"
    },
    "Quest30": {
        "displayName": "Giftmas_Box"
    },
    "Quest31": {
        "displayName": "Gem_Note"
    },
    "Cutter": {
        "displayName": "Bolt_Cutters"
    },
    "Quest32": {
        "displayName": "Monster_Rating"
    },
    "Quest33": {
        "displayName": "Player_Rating_With_Letter_P"
    },
    "Quest34": {
        "displayName": "Player_Rating_With_Letter_S"
    },
    "Quest35": {
        "displayName": "Googley_Eyes"
    },
    "Quest36": {
        "displayName": "Dootjat_Eye"
    },
    "Quest37": {
        "displayName": "Silver_Antique"
    },
    "Quest38": {
        "displayName": "Guild_Giftbox"
    },
    "Quest39": {
        "displayName": "Lovey_Dovey_Letter"
    },
    "Quest40": {
        "displayName": "Choco_Box"
    },
    "Quest41": {
        "displayName": "Flowies"
    },
    "Quest42": {
        "displayName": "Egg_Capsule"
    },
    "Quest43": {
        "displayName": "Gummy_Bunny"
    },
    "Quest44": {
        "displayName": "Goldegg_Capsule"
    },
    "Quest45": {
        "displayName": "Sesame_Seed"
    },
    "Quest46": {
        "displayName": "The_Bobber_Challenge_Scroll"
    },
    "Quest47": {
        "displayName": "Elderly_Peanut"
    },
    "Quest48": {
        "displayName": "Pete_the_Peanut"
    },
    "Quest49": {
        "displayName": "Summer_Cooler"
    },
    "Quest50": {
        "displayName": "Beach_Oyster"
    },
    "Pearl4": {
        "displayName": "Black_Pearl"
    },
    "NPCtoken8": {
        "displayName": "FILLER"
    },
    "BadgeG1": {
        "displayName": "Blunderhills_NPC_Completion_Token"
    },
    "BadgeG2": {
        "displayName": "Blunder_Skills_Completion_Token"
    },
    "BadgeG3": {
        "displayName": "Blunderhills_Misc_Completion_Token"
    },
    "BadgeD1": {
        "displayName": "Yumyum_Desert_NPC_Completion_Token"
    },
    "BadgeD2": {
        "displayName": "Yumyum_Skills_Completion_Token"
    },
    "BadgeD3": {
        "displayName": "Yumyum_Misc_Completion_Token"
    },
    "NPCtoken1": {
        "displayName": "Easy_Blunderhills_NPC_Token"
    },
    "NPCtoken2": {
        "displayName": "Med_Blunderhills_NPC_Token"
    },
    "NPCtoken3": {
        "displayName": "Hard_Blunderhills_NPC_Token"
    },
    "NPCtoken5": {
        "displayName": "Woodsman_Token"
    },
    "NPCtoken6": {
        "displayName": "Glumlee_Token"
    },
    "NPCtoken4": {
        "displayName": "Stiltzcho_Token"
    },
    "NPCtoken9": {
        "displayName": "Funguy_Token"
    },
    "NPCtoken10": {
        "displayName": "Krunk_Token"
    },
    "NPCtoken11": {
        "displayName": "Tiki_Chief_Token"
    },
    "NPCtoken13": {
        "displayName": "Dog_Bone_Token"
    },
    "NPCtoken7": {
        "displayName": "Papua_Piggea_Token"
    },
    "Quest9": {
        "displayName": "Picnic_Token"
    },
    "NPCtoken15": {
        "displayName": "TP_Pete_Token"
    },
    "NPCtoken12": {
        "displayName": "Sproutinald_Token"
    },
    "NPCtoken14": {
        "displayName": "Dazey_Token"
    },
    "NPCtoken16": {
        "displayName": "Bandit_Bob_Token"
    },
    "NPCtoken17": {
        "displayName": "Snake_Jar_Token"
    },
    "NPCtoken18": {
        "displayName": "Whattso_Token"
    },
    "NPCtoken19": {
        "displayName": "Cowbo_Jones_Token"
    },
    "NPCtoken20": {
        "displayName": "Carpetiem_Token"
    },
    "NPCtoken21": {
        "displayName": "Goldric_Token"
    },
    "NPCtoken27": {
        "displayName": "Cattleprod_Token"
    },
    "NPCtoken22": {
        "displayName": "Fishpaste_Token"
    },
    "NPCtoken24": {
        "displayName": "Loominadi_Token"
    },
    "NPCtoken25": {
        "displayName": "Djonnut_Token"
    },
    "NPCtoken26": {
        "displayName": "Scubidew_Token"
    },
    "NPCtoken23": {
        "displayName": "Wellington_Token"
    },
    "NPCtoken28": {
        "displayName": "Easy_Yumyum_Dez_NPC_Token"
    },
    "NPCtoken29": {
        "displayName": "Med_Yumyum_Dez_NPC_Token"
    },
    "NPCtoken30": {
        "displayName": "Hard_Yumyum_Dez_NPC_Token"
    },
    "EquipmentSmithingTabs2": {
        "displayName": "Anvil_Tab_2"
    },
    "EquipmentSmithingTabs3": {
        "displayName": "Anvil_Tab_3"
    },
    "EquipmentSmithingTabs4": {
        "displayName": "Anvil_Tab_4"
    },
    "EquipmentSmithingTabs5": {
        "displayName": "Anvil_Tab_5"
    },
    "EquipmentSmithingTabs6": {
        "displayName": "Anvil_Tab_6"
    },
    "EquipmentSmithingTabs7": {
        "displayName": "Anvil_Tab_7"
    },
    "EquipmentSmithingTabs8": {
        "displayName": "Anvil_Tab_8"
    },
    "EquipmentStatues1": {
        "displayName": "Power_Statue"
    },
    "EquipmentStatues2": {
        "displayName": "Speed_Statue"
    },
    "EquipmentStatues3": {
        "displayName": "Mining_Statue"
    },
    "EquipmentStatues4": {
        "displayName": "Feasty_Statue"
    },
    "EquipmentStatues5": {
        "displayName": "Health_Statue"
    },
    "EquipmentStatues6": {
        "displayName": "Kachow_Statue"
    },
    "EquipmentStatues7": {
        "displayName": "Lumberbob_Statue"
    },
    "EquipmentStatues8": {
        "displayName": "Thicc_Skin_Statue"
    },
    "EquipmentStatues9": {
        "displayName": "Oceanman_Statue"
    },
    "EquipmentStatues10": {
        "displayName": "Ol_Reliable_Statue"
    },
    "EquipmentStatues11": {
        "displayName": "Exp_Book_Statue"
    },
    "EquipmentStatues12": {
        "displayName": "Anvil_Statue"
    },
    "EquipmentStatues13": {
        "displayName": "Cauldron_Statue"
    },
    "EquipmentStatues14": {
        "displayName": "Beholder_Statue"
    },
    "EquipmentStatues15": {
        "displayName": "Bullseye_Statue"
    },
    "EquipmentStatues16": {
        "displayName": "Box_Statue"
    },
    "EquipmentStatues17": {
        "displayName": "Twosoul_Statue"
    },
    "EquipmentStatues18": {
        "displayName": "EhExPee_Statue"
    },
    "EquipmentStatues19": {
        "displayName": "Seesaw_Statue"
    },
    "SmithingRecipes1": {
        "displayName": "Beginner_Recipe",
        "lvReqToEquip": 999,
        "Class": "ALL"
    },
    "SmithingRecipes2": {
        "displayName": "Novice_Recipe",
        "lvReqToEquip": 999,
        "Class": "ALL"
    },
    "SmithingRecipes3": {
        "displayName": "Apprentice_Recipe",
        "lvReqToEquip": 999,
        "Class": "ALL"
    },
    "SmithingRecipes4": {
        "displayName": "Journeyman_Recipe",
        "lvReqToEquip": 999,
        "Class": "ALL"
    },
    "TalentBook1": {
        "displayName": "Special_Talent_Book",
        "lvReqToEquip": 999,
        "Class": "ALL"
    },
    "TalentBook2": {
        "displayName": "Beginner_Talent_Book",
        "lvReqToEquip": 999,
        "Class": "BEGINNER"
    },
    "TalentBook3": {
        "displayName": "Warrior_Talent_Book",
        "lvReqToEquip": 999,
        "Class": "WARRIOR",
        "STR": 3
    },
    "TalentBook4": {
        "displayName": "Archer_Talent_Book",
        "lvReqToEquip": 999,
        "Class": "ARCHER",
        "STR": 3
    },
    "TalentBook5": {
        "displayName": "Wizard_Talent_Book",
        "lvReqToEquip": 999,
        "Class": "MAGE",
        "STR": 3
    },
    "MaxCapBagT2": {
        "displayName": "Miniature_Mining_Pouch",
        "lvReqToEquip": 25,
        "Class": "Mining",
        "Speed": 5,
        "Reach": 10,
        "STR": 3
    },
    "MaxCapBag1": {
        "displayName": "Cramped_Mining_Pouch",
        "lvReqToEquip": 50,
        "Class": "Mining",
        "Speed": 25,
        "Reach": 10,
        "STR": 3
    },
    "MaxCapBag2": {
        "displayName": "Small_Mining_Pouch",
        "lvReqToEquip": 100,
        "Class": "Mining",
        "Speed": 118,
        "Reach": 10,
        "STR": 3
    },
    "MaxCapBag3": {
        "displayName": "Average_Mining_Pouch",
        "lvReqToEquip": 250,
        "Class": "Mining",
        "Speed": 5,
        "Reach": 10,
        "STR": 3
    },
    "MaxCapBag4": {
        "displayName": "Sizable_Mining_Pouch",
        "lvReqToEquip": 500,
        "Class": "Mining",
        "Speed": 170,
        "Reach": 10,
        "STR": 3
    },
    "MaxCapBag5": {
        "displayName": "Big_Mining_Pouch",
        "lvReqToEquip": 1,
        "Class": "Mining",
        "Speed": 240,
        "Reach": 10,
        "STR": 3
    },
    "MaxCapBagMi6": {
        "displayName": "Large_Mining_Pouch",
        "lvReqToEquip": 2,
        "Class": "Mining",
        "Speed": 240,
        "Reach": 10,
        "STR": 3
    },
    "MaxCapBagT1": {
        "displayName": "Miniature_Choppin_Pouch",
        "lvReqToEquip": 25,
        "Class": "Chopping",
        "Speed": 5,
        "Reach": 10,
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 3
    },
    "MaxCapBag7": {
        "displayName": "Cramped_Choppin_Pouch",
        "lvReqToEquip": 50,
        "Class": "Chopping",
        "Speed": 25,
        "Reach": 10,
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 3
    },
    "MaxCapBag9": {
        "displayName": "Small_Choppin_Pouch",
        "lvReqToEquip": 100,
        "Class": "Chopping",
        "Speed": 118,
        "Reach": 10,
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 3
    },
    "MaxCapBagT3": {
        "displayName": "Average_Choppin_Pouch",
        "lvReqToEquip": 250,
        "Class": "Chopping",
        "Speed": 5,
        "Reach": 10,
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 3
    },
    "MaxCapBagT4": {
        "displayName": "Sizable_Choppin_Pouch",
        "lvReqToEquip": 500,
        "Class": "Chopping",
        "Speed": 170,
        "Reach": 10,
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 3
    },
    "MaxCapBagT5": {
        "displayName": "Big_Choppin_Pouch",
        "lvReqToEquip": 1,
        "Class": "Chopping",
        "Speed": 240,
        "Reach": 10,
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 3
    },
    "MaxCapBagT6": {
        "displayName": "Large_Choppin_Pouch",
        "lvReqToEquip": 2,
        "Class": "Chopping",
        "Speed": 240,
        "Reach": 10,
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 3
    },
    "MaxCapBag6": {
        "displayName": "Miniscule_Food_Pouch",
        "lvReqToEquip": 25,
        "Class": "Foods",
        "Speed": 5,
        "Reach": 10,
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 3
    },
    "MaxCapBag8": {
        "displayName": "Cramped_Food_Pouch",
        "lvReqToEquip": 50,
        "Class": "Foods",
        "Speed": 25,
        "Reach": 10,
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 3
    },
    "MaxCapBag10": {
        "displayName": "Small_Food_Pouch",
        "lvReqToEquip": 100,
        "Class": "Foods",
        "Speed": 118,
        "Reach": 10,
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 3
    },
    "MaxCapBagF3": {
        "displayName": "Average_Food_Pouch",
        "lvReqToEquip": 250,
        "Class": "Foods",
        "Speed": 5,
        "Reach": 10,
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 3
    },
    "MaxCapBagF4": {
        "displayName": "Sizable_Food_Pouch",
        "lvReqToEquip": 500,
        "Class": "Foods",
        "Speed": 170,
        "Reach": 10,
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 3
    },
    "MaxCapBagF5": {
        "displayName": "Big_Food_Pouch",
        "lvReqToEquip": 1,
        "Class": "Foods",
        "Speed": 240,
        "Reach": 10,
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 3
    },
    "MaxCapBagF6": {
        "displayName": "Large_Food_Pouch",
        "lvReqToEquip": 2,
        "Class": "Foods",
        "Speed": 240,
        "Reach": 10,
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 3
    },
    "MaxCapBagM1": {
        "displayName": "Mini_Materials_Pouch",
        "lvReqToEquip": 25,
        "Class": "bCraft",
        "Speed": 10,
        "Reach": 10,
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 3
    },
    "MaxCapBagM2": {
        "displayName": "Cramped_Material_Pouch",
        "lvReqToEquip": 50,
        "Class": "bCraft",
        "Speed": 15,
        "Reach": 10,
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 3
    },
    "MaxCapBagM3": {
        "displayName": "Small_Material_Pouch",
        "lvReqToEquip": 100,
        "Class": "bCraft",
        "Speed": 118,
        "Reach": 10,
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 3
    },
    "MaxCapBagM4": {
        "displayName": "Average_Material_Pouch",
        "lvReqToEquip": 250,
        "Class": "bCraft",
        "Speed": 5,
        "Reach": 10,
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 3
    },
    "MaxCapBagM5": {
        "displayName": "Sizable_Materials_Pouch",
        "lvReqToEquip": 500,
        "Class": "bCraft",
        "Speed": 170,
        "Reach": 10,
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 3
    },
    "MaxCapBagM6": {
        "displayName": "Big_Materials_Pouch",
        "lvReqToEquip": 1,
        "Class": "bCraft",
        "Speed": 240,
        "Reach": 10,
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 3
    },
    "MaxCapBagM7": {
        "displayName": "Large_Materials_Pouch",
        "lvReqToEquip": 2,
        "Class": "bCraft",
        "Speed": 240,
        "Reach": 10,
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 3
    },
    "MaxCapBagFi0": {
        "displayName": "Miniature_Fish_Pouch",
        "lvReqToEquip": 25,
        "Class": "Fishing",
        "Speed": 10,
        "Reach": 10,
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3
    },
    "MaxCapBagFi1": {
        "displayName": "Cramped_Fish_Pouch",
        "lvReqToEquip": 50,
        "Class": "Fishing",
        "Speed": 25,
        "Reach": 10,
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3
    },
    "MaxCapBagFi2": {
        "displayName": "Small_Fish_Pouch",
        "lvReqToEquip": 100,
        "Class": "Fishing",
        "Speed": 118,
        "Reach": 10,
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3
    },
    "MaxCapBagFi3": {
        "displayName": "Average_Fish_Pouch",
        "lvReqToEquip": 250,
        "Class": "Fishing",
        "Speed": 5,
        "Reach": 10,
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3
    },
    "MaxCapBagFi4": {
        "displayName": "Sizable_Fish_Pouch",
        "lvReqToEquip": 500,
        "Class": "Fishing",
        "Speed": 170,
        "Reach": 10,
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3
    },
    "MaxCapBagFi5": {
        "displayName": "Big_Fish_Pouch",
        "lvReqToEquip": 1,
        "Class": "Fishing",
        "Speed": 240,
        "Reach": 10,
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3
    },
    "MaxCapBagFi6": {
        "displayName": "Large_Fish_Pouch",
        "lvReqToEquip": 2,
        "Class": "Fishing",
        "Speed": 240,
        "Reach": 10,
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3
    },
    "MaxCapBagB0": {
        "displayName": "Miniature_Bug_Pouch",
        "lvReqToEquip": 25,
        "Class": "Bugs",
        "Speed": 5,
        "Reach": 10,
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3
    },
    "MaxCapBagB1": {
        "displayName": "Cramped_Bug_Pouch",
        "lvReqToEquip": 50,
        "Class": "Bugs",
        "Speed": 250,
        "Reach": 10,
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3
    },
    "MaxCapBagB2": {
        "displayName": "Small_Bug_Pouch",
        "lvReqToEquip": 100,
        "Class": "Bugs",
        "Speed": 118,
        "Reach": 10,
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3
    },
    "MaxCapBagB3": {
        "displayName": "Average_Bug_Pouch",
        "lvReqToEquip": 250,
        "Class": "Bugs",
        "Speed": 5,
        "Reach": 10,
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3
    },
    "MaxCapBagB4": {
        "displayName": "Sizable_Bug_Pouch",
        "lvReqToEquip": 500,
        "Class": "Bugs",
        "Speed": 170,
        "Reach": 10,
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3
    },
    "MaxCapBagB5": {
        "displayName": "Big_Bug_Pouch",
        "lvReqToEquip": 1,
        "Class": "Bugs",
        "Speed": 240,
        "Reach": 10,
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3
    },
    "MaxCapBagB6": {
        "displayName": "Large_Bug_Pouch",
        "lvReqToEquip": 2,
        "Class": "Bugs",
        "Speed": 240,
        "Reach": 10,
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 3
    },
    "MaxCapBagTr0": {
        "displayName": "Cramped_Critter_Pouch",
        "lvReqToEquip": 50,
        "Class": "Critters",
        "Speed": 250,
        "Reach": 10,
        "Power": 6,
        "Weapon_Power": 6,
        "STR": 3
    },
    "MaxCapBagTr1": {
        "displayName": "Small_Critter_Pouch",
        "lvReqToEquip": 100,
        "Class": "Critters",
        "Speed": 118,
        "Reach": 10,
        "Power": 6,
        "Weapon_Power": 6,
        "STR": 3
    },
    "MaxCapBagTr2": {
        "displayName": "Average_Critter_Pouch",
        "lvReqToEquip": 250,
        "Class": "Critters",
        "Speed": 5,
        "Reach": 10,
        "Power": 6,
        "Weapon_Power": 6,
        "STR": 3
    },
    "MaxCapBagTr3": {
        "displayName": "Sizable_Critter_Pouch",
        "lvReqToEquip": 500,
        "Class": "Critters",
        "Speed": 170,
        "Reach": 10,
        "Power": 6,
        "Weapon_Power": 6,
        "STR": 3
    },
    "MaxCapBagTr4": {
        "displayName": "Big_Critter_Pouch",
        "lvReqToEquip": 1,
        "Class": "Critters",
        "Speed": 240,
        "Reach": 10,
        "Power": 6,
        "Weapon_Power": 6,
        "STR": 3
    },
    "MaxCapBagTr5": {
        "displayName": "Large_Critter_Pouch",
        "lvReqToEquip": 2,
        "Class": "Critters",
        "Speed": 240,
        "Reach": 10,
        "Power": 6,
        "Weapon_Power": 6,
        "STR": 3
    },
    "MaxCapBagS0": {
        "displayName": "Cramped_Soul_Pouch",
        "lvReqToEquip": 50,
        "Class": "Souls",
        "Speed": 250,
        "Reach": 10,
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 3
    },
    "MaxCapBagS1": {
        "displayName": "Small_Soul_Pouch",
        "lvReqToEquip": 100,
        "Class": "Souls",
        "Speed": 118,
        "Reach": 10,
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 3
    },
    "MaxCapBagS2": {
        "displayName": "Average_Soul_Pouch",
        "lvReqToEquip": 250,
        "Class": "Souls",
        "Speed": 5,
        "Reach": 10,
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 3
    },
    "MaxCapBagS3": {
        "displayName": "Sizable_Soul_Pouch",
        "lvReqToEquip": 500,
        "Class": "Souls",
        "Speed": 170,
        "Reach": 10,
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 3
    },
    "MaxCapBagS4": {
        "displayName": "Big_Soul_Pouch",
        "lvReqToEquip": 1,
        "Class": "Souls",
        "Speed": 240,
        "Reach": 10,
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 3
    },
    "MaxCapBagS5": {
        "displayName": "Large_Soul_Pouch",
        "lvReqToEquip": 2,
        "Class": "Souls",
        "Speed": 240,
        "Reach": 10,
        "Power": 7,
        "Weapon_Power": 7,
        "STR": 3
    },
    "ObolBronze0": {
        "displayName": "Bronze_STR_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1
    },
    "ObolBronze1": {
        "displayName": "Bronze_AGI_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 1
    },
    "ObolBronze2": {
        "displayName": "Bronze_WIS_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "WIS": 1
    },
    "ObolBronze3": {
        "displayName": "Bronze_LUK_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 1
    },
    "ObolSilver0": {
        "displayName": "Silver_STR_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2
    },
    "ObolSilver1": {
        "displayName": "Silver_AGI_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 2
    },
    "ObolSilver2": {
        "displayName": "Silver_WIS_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "WIS": 2
    },
    "ObolSilver3": {
        "displayName": "Silver_LUK_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 2
    },
    "ObolGold0": {
        "displayName": "Gold_STR_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 4
    },
    "ObolGold1": {
        "displayName": "Gold_AGI_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 4
    },
    "ObolGold2": {
        "displayName": "Gold_WIS_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "WIS": 4
    },
    "ObolGold3": {
        "displayName": "Gold_LUK_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 4
    },
    "ObolPlatinum0": {
        "displayName": "Platinum_STR_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 7
    },
    "ObolPlatinum1": {
        "displayName": "Platinum_AGI_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 7
    },
    "ObolPlatinum2": {
        "displayName": "Platinum_WIS_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "WIS": 7
    },
    "ObolPlatinum3": {
        "displayName": "Platinum_LUK_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 7
    },
    "ObolPink0": {
        "displayName": "Dementia_STR_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 12
    },
    "ObolPink1": {
        "displayName": "Dementia_AGI_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "AGI": 12
    },
    "ObolPink2": {
        "displayName": "Dementia_WIS_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "WIS": 12
    },
    "ObolPink3": {
        "displayName": "Dementia_LUK_Obol",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "LUK": 12
    },
    "ObolBronzeDamage": {
        "displayName": "Bronze_Obol_of_Puny_Damage",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "UQ1txt": "_BASE_DAMAGE",
        "UQ1val": 5
    },
    "ObolSilverDamage": {
        "displayName": "Silver_Obol_of_Little_Damage",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "UQ1txt": "_BASE_DAMAGE",
        "UQ1val": 10
    },
    "ObolGoldDamage": {
        "displayName": "Golden_Obol_of_Big_Boy_Damage",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "UQ1txt": "_BASE_DAMAGE",
        "UQ1val": 20
    },
    "ObolPlatinumDamage": {
        "displayName": "Platinum_Obol_of_Lethal_Damage",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 2,
        "AGI": 3,
        "WIS": 3,
        "LUK": 3,
        "UQ1txt": "_BASE_DAMAGE",
        "UQ1val": 50
    },
    "ObolPinkDamage": {
        "displayName": "Dementia_Obol_of_Infinite_Damage",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "LUK": 5,
        "UQ1txt": "_BASE_DAMAGE",
        "UQ1val": 100
    },
    "ObolPlatinumSpeed": {
        "displayName": "Platinum_Obol_of_Blinding_Speed",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 4,
        "UQ1txt": "%_MOVEMENT_SPEED",
        "UQ1val": 2
    },
    "ObolSilverMoney": {
        "displayName": "Silver_Obol_of_Pocket_Change",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "UQ1txt": "%_MONEY",
        "UQ1val": 6
    },
    "ObolGoldMoney": {
        "displayName": "Golden_Obol_of_Plentiful_Riches",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "UQ1txt": "%_MONEY",
        "UQ1val": 10
    },
    "ObolBronzeMining": {
        "displayName": "Bronze_Obol_of_Small_Swings",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1
    },
    "ObolSilverMining": {
        "displayName": "Silver_Obol_of_Moderate_Mining",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 1
    },
    "ObolGoldMining": {
        "displayName": "Golden_Obol_of_Diligent_Digging",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 2
    },
    "ObolPlatinumMining": {
        "displayName": "Platinum_Obol_of_Dwarven_Delving",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 2
    },
    "ObolPinkMining": {
        "displayName": "Dementia_Obol_of_Magisterial_Metals",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 5,
        "UQ1txt": "%_MINING_EFFICINCY",
        "UQ1val": 8
    },
    "ObolBronzeChoppin": {
        "displayName": "Bronze_Obol_of_Chippin_Chops",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1
    },
    "ObolSilverChoppin": {
        "displayName": "Silver_Obol_of_Big_Bark",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "WIS": 1
    },
    "ObolGoldChoppin": {
        "displayName": "Golden_Obol_of_Huge_Hackin",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "WIS": 2
    },
    "ObolPlatinumChoppin": {
        "displayName": "Platinum_Obol_of_Lumby_Loggo",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 4,
        "Weapon_Power": 4,
        "WIS": 3,
        "UQ1txt": "%_CHOP_EFFICIENCY",
        "UQ1val": 2
    },
    "ObolPinkChoppin": {
        "displayName": "Dementia_Obol_of_WOWOWOWWO",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "WIS": 5,
        "UQ1txt": "%_CHOP_EFFICIENCY",
        "UQ1val": 8
    },
    "ObolBronzeFishing": {
        "displayName": "Bronze_Obol_of_Finite_Fish",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1
    },
    "ObolSilverFishing": {
        "displayName": "Silver_Obol_of_Puny_Pikes",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 1
    },
    "ObolGoldFishing": {
        "displayName": "Golden_Obol_of_Crazy_Carp",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 2
    },
    "ObolPlatinumFishing": {
        "displayName": "Platinum_Obol_of_Tremendous_Trout",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3,
        "UQ1txt": "%_FISHIN_EFFICINCY",
        "UQ1val": 2
    },
    "ObolPinkFishing": {
        "displayName": "Dementia_Obol_of_Monument_Marlins",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 5,
        "UQ1txt": "%_FISHIN_EFFICINCY",
        "UQ1val": 8
    },
    "ObolBronzeCatching": {
        "displayName": "Bronze_Obol_of_Few_Flies",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1
    },
    "ObolSilverCatching": {
        "displayName": "Silver_Obol_of_Big_Bugs",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "AGI": 1
    },
    "ObolGoldCatching": {
        "displayName": "Golden_Obol_of_Insane_Insects",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "AGI": 2
    },
    "ObolPlatinumCatching": {
        "displayName": "Platinum_Obol_of_Idk_Yet",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 4,
        "Weapon_Power": 4,
        "AGI": 3,
        "UQ1txt": "%_CATCH_EFFICINCY",
        "UQ1val": 2
    },
    "ObolPinkCatching": {
        "displayName": "Dementia_Obol_of_Idk_Yet",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "AGI": 5,
        "UQ1txt": "%_CATCH_EFFICINCY",
        "UQ1val": 8
    },
    "ObolSilverLuck": {
        "displayName": "Silver_Obol_of_Double_Sixes",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 2,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 5
    },
    "ObolGoldLuck": {
        "displayName": "Golden_Obol_of_Triple_Sixes",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 3,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 7
    },
    "ObolPlatinumLuck": {
        "displayName": "Platinum_Obol_of_Yahtzee_Sixes",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 5,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 10
    },
    "ObolPinkLuck": {
        "displayName": "Dementia_Obol_of_Infinisixes",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 7,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 15
    },
    "ObolBronzePop": {
        "displayName": "Bronze_Obol_of_Pop",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 1,
        "Defence": 1,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 2
    },
    "ObolSilverPop": {
        "displayName": "Silver_Obol_of_Pop_Pop",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 3,
        "Defence": 2,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 3
    },
    "ObolGoldPop": {
        "displayName": "Golden_Obol_of_Poppity_Pop",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 6,
        "Defence": 3,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 4
    },
    "ObolPlatinumPop": {
        "displayName": "Platinum_Obol_of_Poppity_Poppy",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 9,
        "Defence": 4,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 6
    },
    "ObolPinkPop": {
        "displayName": "Dementia_Obol_of_Pop_Pop_Pop_Pop",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 12,
        "Defence": 5,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 9
    },
    "ObolEfauntA": {
        "displayName": "Skeletal_Obol_of_Efaunt's_Gaze",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "LUK": 5,
        "UQ1txt": "%_BOSS_DAMAGE",
        "UQ1val": 5
    },
    "ObolAmarokA": {
        "displayName": "Granite_Obol_of_Amarok's_Stare",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "LUK": 2,
        "Defence": 5,
        "UQ1txt": "%_DEFENCE",
        "UQ1val": 4
    },
    "ObolBronzeKill": {
        "displayName": "Bronze_Obol_of_Multikill",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "UQ1txt": "%_MULTIKILL",
        "UQ1val": 1
    },
    "ObolSilverKill": {
        "displayName": "Silver_Obol_of_Megakill",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "UQ1txt": "%_MULTIKILL",
        "UQ1val": 2
    },
    "ObolGoldKill": {
        "displayName": "Golden_Obol_of_Ultrakill",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "UQ1txt": "%_MULTIKILL",
        "UQ1val": 3
    },
    "ObolPlatinumKill": {
        "displayName": "Platinum_Obol_of_Killimanjaro",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "UQ1txt": "%_MULTIKILL",
        "UQ1val": 5
    },
    "ObolPinkKill": {
        "displayName": "Dementia_Obol_of_Killionaire",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "UQ1txt": "%_MULTIKILL",
        "UQ1val": 10
    },
    "ObolBronzeEXP": {
        "displayName": "Bronze_Obol_of_Experience",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 1
    },
    "ObolSilverEXP": {
        "displayName": "Silver_Obol_of_Experience",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 1
    },
    "ObolGoldEXP": {
        "displayName": "Golden_Obol_of_Experience",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 2
    },
    "ObolPlatinumEXP": {
        "displayName": "Platinum_Obol_of_Experience",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 3
    },
    "ObolPinkEXP": {
        "displayName": "Dementia_Obol_of_Experience",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 4
    },
    "ObolBronzeCard": {
        "displayName": "Bronze_Obol_of_Cards",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "UQ1txt": "%_CARD_DROP_CHANCE",
        "UQ1val": 1
    },
    "ObolSilverCard": {
        "displayName": "Silver_Obol_of_Cards",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "UQ1txt": "%_CARD_DROP_CHANCE",
        "UQ1val": 3
    },
    "ObolGoldCard": {
        "displayName": "Golden_Obol_of_Cards",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "UQ1txt": "%_CARD_DROP_CHANCE",
        "UQ1val": 5
    },
    "ObolPlatinumCard": {
        "displayName": "Platinum_Obol_of_Cards",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "UQ1txt": "%_CARD_DROP_CHANCE",
        "UQ1val": 7
    },
    "ObolPinkCard": {
        "displayName": "Dementia_Obol_of_Cards",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "UQ1txt": "%_CARD_DROP_CHANCE",
        "UQ1val": 10
    },
    "ObolBronzeDef": {
        "displayName": "Bronze_Obol_of_Defence",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Defence": 1
    },
    "ObolSilverDef": {
        "displayName": "Silver_Obol_of_Defence",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Defence": 3
    },
    "ObolGoldDef": {
        "displayName": "Golden_Obol_of_Defence",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Defence": 6
    },
    "ObolPlatinumDef": {
        "displayName": "Platinum_Obol_of_Defense_with_an_S",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Defence": 15
    },
    "ObolPinkDef": {
        "displayName": "Dementia_Obol_of_Defence",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Defence": 25
    },
    "ObolBronzeTrapping": {
        "displayName": "Bronze_Obol_of_Trapping",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1
    },
    "ObolSilverTrapping": {
        "displayName": "Silver_Obol_of_Trapping",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "AGI": 1
    },
    "ObolGoldTrapping": {
        "displayName": "Golden_Obol_of_Trapping",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "AGI": 2
    },
    "ObolPlatinumTrapping": {
        "displayName": "Platinum_Obol_of_Trapping",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "AGI": 3
    },
    "ObolPinkTrapping": {
        "displayName": "Dementia_Obol_of_Trapping",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 7,
        "Weapon_Power": 7,
        "AGI": 5
    },
    "ObolBronzeCons": {
        "displayName": "Bronze_Obol_of_Construction",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "UQ1txt": "%_BUILD_SPD",
        "UQ1val": 1
    },
    "ObolSilverCons": {
        "displayName": "Silver_Obol_of_Construction",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "UQ1txt": "%_BUILD_SPD",
        "UQ1val": 2
    },
    "ObolGoldCons": {
        "displayName": "Golden_Obol_of_Construction",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2,
        "UQ1txt": "%_BUILD_SPD",
        "UQ1val": 5
    },
    "ObolPlatinumCons": {
        "displayName": "Platinum_Obol_of_Construction",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 3,
        "UQ1txt": "%_BUILD_SPD",
        "UQ1val": 12
    },
    "ObolPinkCons": {
        "displayName": "Dementia_Obol_of_Construction",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 5,
        "UQ1txt": "%_BUILD_SPD",
        "UQ1val": 20
    },
    "ObolBronzeWorship": {
        "displayName": "Bronze_Obol_of_Worship",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1
    },
    "ObolSilverWorship": {
        "displayName": "Silver_Obol_of_Worship",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "WIS": 1
    },
    "ObolGoldWorship": {
        "displayName": "Golden_Obol_of_Worship",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "WIS": 2
    },
    "ObolPlatinumWorship": {
        "displayName": "Platinum_Obol_of_Worship",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "WIS": 3
    },
    "ObolPinkWorship": {
        "displayName": "Dementia_Obol_of_Worship",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 7,
        "Weapon_Power": 7,
        "WIS": 5
    },
    "ExpSmith1": {
        "displayName": "Smithing_Exp"
    },
    "StampA1": {
        "displayName": "Sword_Stamp"
    },
    "StampA2": {
        "displayName": "Heart_Stamp"
    },
    "StampA3": {
        "displayName": "Mana_Stamp"
    },
    "StampA4": {
        "displayName": "Tomahawk_Stamp"
    },
    "StampA5": {
        "displayName": "Target_Stamp"
    },
    "StampA6": {
        "displayName": "Shield_Stamp",
        "Defence": 1
    },
    "StampA7": {
        "displayName": "Longsword_Stamp"
    },
    "StampA8": {
        "displayName": "Kapow_Stamp"
    },
    "StampA9": {
        "displayName": "Fist_Stamp",
        "STR": 1
    },
    "StampA10": {
        "displayName": "Battleaxe_Stamp"
    },
    "StampA11": {
        "displayName": "Agile_Stamp",
        "AGI": 1
    },
    "StampA12": {
        "displayName": "Vitality_Stamp"
    },
    "StampA13": {
        "displayName": "Book_Stamp",
        "WIS": 1
    },
    "StampA14": {
        "displayName": "Manamoar_Stamp"
    },
    "StampA15": {
        "displayName": "Clover_Stamp",
        "LUK": 1
    },
    "StampA16": {
        "displayName": "Scimitar_Stamp"
    },
    "StampA17": {
        "displayName": "Bullseye_Stamp"
    },
    "StampA18": {
        "displayName": "Feather_Stamp",
        "Speed": 5
    },
    "StampA19": {
        "displayName": "Polearm_Stamp"
    },
    "StampA20": {
        "displayName": "Violence_Stamp",
        "STR": 1
    },
    "StampA21": {
        "displayName": "Buckler_Stamp",
        "Defence": 1
    },
    "StampA22": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampA23": {
        "displayName": "Sukka_Foo"
    },
    "StampA24": {
        "displayName": "Arcane_Stamp",
        "WIS": 1
    },
    "StampA25": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampA26": {
        "displayName": "Steve_Sword"
    },
    "StampA27": {
        "displayName": "Blover_Stamp",
        "LUK": 1
    },
    "StampA28": {
        "displayName": "Stat_Graph_Stamp"
    },
    "StampA29": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampA30": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampA31": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampA32": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampA33": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampA34": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampA35": {
        "displayName": "FILLER",
        "Defence": 30
    },
    "StampB1": {
        "displayName": "Pickaxe_Stamp"
    },
    "StampB2": {
        "displayName": "Hatchet_Stamp"
    },
    "StampB3": {
        "displayName": "Anvil_Zoomer_Stamp"
    },
    "StampB4": {
        "displayName": "Lil'_Mining_Baggy_Stamp"
    },
    "StampB5": {
        "displayName": "Twin_Ores_Stamp"
    },
    "StampB6": {
        "displayName": "Choppin'_Bag_Stamp"
    },
    "StampB7": {
        "displayName": "Duplogs_Stamp"
    },
    "StampB8": {
        "displayName": "Matty_Bag_Stamp"
    },
    "StampB9": {
        "displayName": "Smart_Dirt_Stamp"
    },
    "StampB10": {
        "displayName": "Cool_Diggy_Tool_Stamp"
    },
    "StampB11": {
        "displayName": "High_IQ_Lumber_Stamp"
    },
    "StampB12": {
        "displayName": "Swag_Swingy_Tool_Stamp"
    },
    "StampB13": {
        "displayName": "Alch_Go_Brrr_Stamp",
        "Speed": 1
    },
    "StampB14": {
        "displayName": "Brainstew_Stamps"
    },
    "StampB15": {
        "displayName": "Drippy_Drop_Stamp"
    },
    "StampB16": {
        "displayName": "Droplots_Stamp"
    },
    "StampB17": {
        "displayName": "Fishing_Rod_Stamp"
    },
    "StampB18": {
        "displayName": "Fishhead_Stamp"
    },
    "StampB19": {
        "displayName": "Catch_Net_Stamp"
    },
    "StampB20": {
        "displayName": "Fly_Intel_Stamp"
    },
    "StampB21": {
        "displayName": "Bag_o_Heads_Stamp"
    },
    "StampB22": {
        "displayName": "Holy_Mackerel_Stamp"
    },
    "StampB23": {
        "displayName": "Bugsack_Stamp"
    },
    "StampB24": {
        "displayName": "Buzz_Buzz_Stamp"
    },
    "StampB25": {
        "displayName": "Hidey_Box_Stamp"
    },
    "StampB26": {
        "displayName": "Purp_Froge_Stamp"
    },
    "StampB27": {
        "displayName": "Spikemouth_Stamp"
    },
    "StampB28": {
        "displayName": "Shiny_Crab_Stamp"
    },
    "StampB29": {
        "displayName": "Gear_Stamp"
    },
    "StampB30": {
        "displayName": "Stample_Stamp"
    },
    "StampB31": {
        "displayName": "Saw_Stamp"
    },
    "StampB32": {
        "displayName": "Amplestample_Stamp"
    },
    "StampB33": {
        "displayName": "SpoOoky_Stamp"
    },
    "StampB34": {
        "displayName": "Flowin_Stamp",
        "Speed": 1
    },
    "StampB35": {
        "displayName": "Prayday_Stamp"
    },
    "StampB36": {
        "displayName": "Banked_Pts_Stamp"
    },
    "StampC1": {
        "displayName": "Questin_Stamp"
    },
    "StampC2": {
        "displayName": "Mason_Jar_Stamp"
    },
    "StampC3": {
        "displayName": "Crystallin"
    },
    "StampC4": {
        "displayName": "Blank"
    },
    "StampC5": {
        "displayName": "Apple_Stamp"
    },
    "StampC6": {
        "displayName": "Potion_Stamp"
    },
    "StampC7": {
        "displayName": "Golden_Apple_Stamp"
    },
    "StampC8": {
        "displayName": "Blank"
    },
    "StampC9": {
        "displayName": "Card_Stamp"
    },
    "StampC10": {
        "displayName": "Blank"
    },
    "StampC11": {
        "displayName": "Blank"
    },
    "StampC12": {
        "displayName": "Blank"
    },
    "StampC13": {
        "displayName": "Talent_I_Stamp"
    },
    "StampC14": {
        "displayName": "Talent_II_Stamp"
    },
    "StampC15": {
        "displayName": "Talent_III_Stamp"
    },
    "StampC16": {
        "displayName": "Talent_IV_Stamp"
    },
    "StampC17": {
        "displayName": "Talent_V_Stamp"
    },
    "StampC18": {
        "displayName": "Talent_S_Stamp"
    },
    "StampC19": {
        "displayName": "Multikill_Stamp"
    },
    "StampC20": {
        "displayName": "Biblio_Stamp"
    },
    "StoneWe": {
        "displayName": "Easter_Weapon_Stone",
        "Power": 1,
        "Defence": 1,
        "Weapon_Power": 1
    },
    "StoneWeb": {
        "displayName": "Summer_Weapon_Stone",
        "Defence": 1
    },
    "StoneW1": {
        "displayName": "Weapon_Upgrade_Stone_I",
        "Power": 1,
        "Weapon_Power": 1
    },
    "StoneW2": {
        "displayName": "Weapon_Upgrade_Stone_II",
        "Power": 1,
        "Weapon_Power": 1
    },
    "StoneW3": {
        "displayName": "Weapon_Upgrade_Stone_III",
        "Power": 2,
        "Weapon_Power": 2
    },
    "StoneW6": {
        "displayName": "Warped_Weapon_Upgrade_Stone",
        "Power": 3,
        "Weapon_Power": 3
    },
    "StoneAe": {
        "displayName": "Easter_Armor_Stone",
        "Defence": 1
    },
    "StoneAeB": {
        "displayName": "Summer_Armor_Stone",
        "Defence": 3
    },
    "StoneA1": {
        "displayName": "Armor_Upgrade_Stone_I",
        "Defence": 2
    },
    "StoneA1b": {
        "displayName": "Armor_Upgrade_Stone_G"
    },
    "StoneA2": {
        "displayName": "Armor_Upgrade_Stone_II",
        "Defence": 2
    },
    "StoneA2b": {
        "displayName": "Armor_Upgrade_Stone_B",
        "Defence": 5
    },
    "StoneA3": {
        "displayName": "Armor_Upgrade_Stone_III",
        "Defence": 3
    },
    "StoneA3b": {
        "displayName": "Armor_Upgrade_Stone_C",
        "Power": 1,
        "Weapon_Power": 1
    },
    "StoneTe": {
        "displayName": "Easter_Tool_Upgrade_Stone"
    },
    "StoneT1": {
        "displayName": "Tool_Upgrade_Stone_I",
        "Power": 1,
        "Weapon_Power": 1
    },
    "StoneT1e": {
        "displayName": "Giftmas_Tool_Upgrade_Stone"
    },
    "StoneT1eb": {
        "displayName": "Summer_Tool_Upgrade_Stone",
        "Defence": 3
    },
    "StoneT2": {
        "displayName": "Tool_Upgrade_Stone_II",
        "Power": 2,
        "Weapon_Power": 2
    },
    "StoneT3": {
        "displayName": "Tool_Upgrade_Stone_III",
        "Power": 3,
        "Weapon_Power": 3
    },
    "StoneHelm1": {
        "displayName": "Helmet_Upgrade_Stone_I"
    },
    "StoneHelm6": {
        "displayName": "Warped_Helmet_Upgrade_Stone"
    },
    "StoneHelm1b": {
        "displayName": "Giftmas_Helmet_Upgrade_Stone"
    },
    "StoneZ1": {
        "displayName": "Mystery_Upgrade_Stone_I"
    },
    "StoneZ2": {
        "displayName": "Mystery_Upgrade_Stone_II"
    },
    "StonePremSTR": {
        "displayName": "Premium_STR_Stone",
        "STR": 5
    },
    "StonePremAGI": {
        "displayName": "Premium_AGI_Stone",
        "AGI": 5
    },
    "StonePremWIS": {
        "displayName": "Premium_WIS_Stone",
        "WIS": 5
    },
    "StonePremLUK": {
        "displayName": "Premium_LUK_Stone",
        "LUK": 5
    },
    "Refinery1": {
        "displayName": "Redox_Salts"
    },
    "Refinery2": {
        "displayName": "Explosive_Salts"
    },
    "Refinery3": {
        "displayName": "Spontaneity_Salts"
    },
    "Refinery4": {
        "displayName": "Dioxide_Synthesis"
    },
    "Refinery5": {
        "displayName": "Red_Salt"
    },
    "Refinery6": {
        "displayName": "Red_Salt"
    },
    "CraftMat1": {
        "displayName": "Thread"
    },
    "CraftMat2": {
        "displayName": "Crimson_String"
    },
    "CraftMat3": {
        "displayName": "Cue_Tape"
    },
    "CraftMat5": {
        "displayName": "Trusty_Nails"
    },
    "CraftMat6": {
        "displayName": "Boring_Brick"
    },
    "CraftMat7": {
        "displayName": "Chain_Link"
    },
    "CraftMat9": {
        "displayName": "Leather_Hide"
    },
    "CraftMat8": {
        "displayName": "Pinion_Spur"
    },
    "CraftMat10": {
        "displayName": "Lugi_Bracket"
    },
    "CraftMat11": {
        "displayName": "Filler"
    },
    "CraftMat12": {
        "displayName": "Filler"
    },
    "CraftMat13": {
        "displayName": "Filler"
    },
    "CraftMat14": {
        "displayName": "Filler"
    },
    "CraftMat15": {
        "displayName": "Filler"
    },
    "CraftMat16": {
        "displayName": "Filler"
    },
    "CraftMat17": {
        "displayName": "Filler"
    },
    "PureWater": {
        "displayName": "Distilled_Water"
    },
    "PureWater2": {
        "displayName": "Dense_Water"
    },
    "Grasslands1": {
        "displayName": "Spore_Cap"
    },
    "Grasslands2": {
        "displayName": "Frog_Leg"
    },
    "Grasslands3": {
        "displayName": "Bean_Slices"
    },
    "Grasslands4": {
        "displayName": "Red_Spore_Cap"
    },
    "Jungle1": {
        "displayName": "Slime_Sludge"
    },
    "Jungle2": {
        "displayName": "Snake_Skin"
    },
    "Jungle3": {
        "displayName": "Carrot_Cube"
    },
    "Forest1": {
        "displayName": "Glublin_Ear"
    },
    "Forest2": {
        "displayName": "Plank"
    },
    "Forest3": {
        "displayName": "Bullfrog_Horn"
    },
    "Sewers1": {
        "displayName": "Corn_Kernels"
    },
    "Sewers1b": {
        "displayName": "Golden_Plop"
    },
    "Sewers2": {
        "displayName": "Rats_Tail"
    },
    "Sewers3": {
        "displayName": "Bonemeal"
    },
    "TreeInterior1": {
        "displayName": "Stick"
    },
    "TreeInterior1b": {
        "displayName": "Woodular_Circle"
    },
    "TreeInterior2": {
        "displayName": "Acorn"
    },
    "BabaYagaETC": {
        "displayName": "Baba_Yaga_Baby_Eggs"
    },
    "DesertA1": {
        "displayName": "Pocket_Sand"
    },
    "DesertA1b": {
        "displayName": "Glass_Shard"
    },
    "DesertA2": {
        "displayName": "Megalodon_Tooth"
    },
    "DesertA3": {
        "displayName": "Crabby_Cakey"
    },
    "DesertA3b": {
        "displayName": "Nuget_Cake"
    },
    "DesertB1": {
        "displayName": "Coconotnotto"
    },
    "DesertB2": {
        "displayName": "Furled_Flag"
    },
    "DesertB3": {
        "displayName": "Pincer_Arm"
    },
    "DesertB4": {
        "displayName": "Potato_Remains"
    },
    "DesertC1": {
        "displayName": "High_Steaks"
    },
    "DesertC2": {
        "displayName": "Wakka_Cherry"
    },
    "DesertC2b": {
        "displayName": "Ghost"
    },
    "DesertC3": {
        "displayName": "Singlecle"
    },
    "DesertC4": {
        "displayName": "Shrapshell"
    },
    "SnowA1": {
        "displayName": "Floof_Ploof"
    },
    "SnowA2": {
        "displayName": "Melty_Cube"
    },
    "SnowA2a": {
        "displayName": "Yellow_Snowflake"
    },
    "SnowA3": {
        "displayName": "Moustache_Comb"
    },
    "SnowA4": {
        "displayName": "Ram_Wool"
    },
    "SnowB1": {
        "displayName": "Sticky_Stick"
    },
    "SnowB2": {
        "displayName": "Mamooth_Tusk"
    },
    "SnowB2a": {
        "displayName": "Ice_Age_3"
    },
    "SnowB5": {
        "displayName": "Snow_Ball"
    },
    "SnowB3": {
        "displayName": "Pen"
    },
    "SnowB4": {
        "displayName": "Cracked_Glass"
    },
    "SnowC1": {
        "displayName": "Sippy_Straw"
    },
    "SnowC2": {
        "displayName": "Cryosnake_Skin"
    },
    "SnowC3": {
        "displayName": "Audio_Cord"
    },
    "SnowC4": {
        "displayName": "Contact_Lense"
    },
    "SnowC4a": {
        "displayName": "Black_Lense"
    },
    "IceMountains2": {
        "displayName": "Ice_A_La_Crem"
    },
    "Hgg": {
        "displayName": "Minuteglass"
    },
    "EfauntDrop1": {
        "displayName": "Ripped_Tunic"
    },
    "EfauntDrop2": {
        "displayName": "Ribbed_Tunic"
    },
    "Trophy1": {
        "displayName": "King_of_Food",
        "lvReqToEquip": 65,
        "Class": "ALL",
        "Power": 3,
        "Weapon_Power": 3,
        "STR": 10,
        "AGI": 10,
        "WIS": 10,
        "LUK": 10,
        "Defence": 25,
        "UQ1txt": "%_FOOD_EFFECT",
        "UQ1val": 20
    },
    "Trophy2": {
        "displayName": "Lucky_Lad",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "LUK": 7,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 7
    },
    "Trophy3": {
        "displayName": "Club_Member",
        "lvReqToEquip": 1,
        "Class": "BEGINNER",
        "LUK": 5,
        "Defence": 5,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 3
    },
    "Trophy4": {
        "displayName": "I_Made_This_Game",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "UQ1txt": "%_PLAYER_HEIGHT",
        "UQ1val": 100,
        "UQ2txt": "%_RED_COLOURING"
    },
    "Trophy5": {
        "displayName": "Dice_Dynamo",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 1,
        "Weapon_Power": 1,
        "LUK": 5,
        "UQ1txt": "%_LUK",
        "UQ1val": 2
    },
    "Trophy6": {
        "displayName": "Blunder_Hero",
        "lvReqToEquip": 50,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "LUK": 5,
        "Defence": 15,
        "UQ1txt": "%_SKILL_AFK_GAIN",
        "UQ1val": 3
    },
    "Trophy7": {
        "displayName": "Original_Gamer",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 2,
        "AGI": 2,
        "WIS": 2,
        "LUK": 2,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 2
    },
    "Trophy8": {
        "displayName": "Trailblazer",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 4,
        "Weapon_Power": 4,
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "LUK": 3,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 20
    },
    "Trophy9": {
        "displayName": "Ultra_Unboxer",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 3,
        "AGI": 3,
        "WIS": 3,
        "LUK": 3,
        "Defence": 3,
        "UQ1txt": "%_DROP_CHANCE",
        "UQ1val": 3
    },
    "Trophy10": {
        "displayName": "Critter_Baron",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "AGI": 10,
        "UQ1txt": "%_AGI",
        "UQ1val": 3
    },
    "Trophy11": {
        "displayName": "YumYum_Sheriff",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 8,
        "AGI": 8,
        "WIS": 8,
        "LUK": 8,
        "Defence": 25,
        "UQ1txt": "%_BOSS_DAMAGE",
        "UQ1val": 8
    },
    "Trophy12": {
        "displayName": "Megalodon",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 5,
        "Weapon_Power": 5,
        "STR": 15,
        "Defence": 30,
        "UQ1txt": "%_CRIT_CHANCE",
        "UQ1val": 9
    },
    "Trophy13": {
        "displayName": "Club_Maestro",
        "lvReqToEquip": 70,
        "Class": "BEGINNER",
        "Power": 1,
        "Weapon_Power": 1,
        "LUK": 20,
        "Defence": 20,
        "UQ1txt": "%_SKILL_EXP",
        "UQ1val": 35
    },
    "Trophy14": {
        "displayName": "Beach_Bro",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Power": 2,
        "Weapon_Power": 2,
        "STR": 5,
        "AGI": 5,
        "WIS": 5,
        "LUK": 5,
        "UQ1txt": "%_MONEY",
        "UQ1val": 50
    },
    "Starlight": {
        "displayName": "Starlight_Ore"
    },
    "AlienTreetutorial": {
        "displayName": "Alien_Logs"
    },
    "EquipmentWeapons2": {
        "displayName": "Flesh_Reaper",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 5,
        "Reach": 70,
        "Power": 690,
        "Weapon_Power": 690,
        "AGI": 80,
        "LUK": 420
    },
    "Secretstone": {
        "displayName": "Secretstone"
    },
    "Timecandy1": {
        "displayName": "1_HR_Time_Candy"
    },
    "Timecandy2": {
        "displayName": "2_HR_Time_Candy"
    },
    "Timecandy3": {
        "displayName": "4_HR_Time_Candy"
    },
    "Timecandy4": {
        "displayName": "12_HR_Time_Candy"
    },
    "Timecandy5": {
        "displayName": "24_HR_Time_Candy"
    },
    "Timecandy6": {
        "displayName": "72_HR_Time_Candy"
    },
    "Timecandy7": {
        "displayName": "Steamy_Time_Candy"
    },
    "InvBag1": {
        "displayName": "Inventory_Bag_A",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 20,
        "Reach": 10
    },
    "InvBag2": {
        "displayName": "Inventory_Bag_B",
        "lvReqToEquip": 3,
        "Class": "ALL",
        "Speed": 20,
        "Reach": 10
    },
    "InvBag3": {
        "displayName": "Inventory_Bag_C",
        "lvReqToEquip": 5,
        "Class": "ALL",
        "Speed": 20,
        "Reach": 10
    },
    "InvBag4": {
        "displayName": "Inventory_Bag_D",
        "lvReqToEquip": 10,
        "Class": "ALL",
        "Speed": 165,
        "Reach": 10
    },
    "InvBag5": {
        "displayName": "Inventory_Bag_E",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Speed": 165,
        "Reach": 10
    },
    "InvBag6": {
        "displayName": "Inventory_Bag_F",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "Speed": 165,
        "Reach": 10
    },
    "InvBag7": {
        "displayName": "Inventory_Bag_G",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "Speed": 165,
        "Reach": 10
    },
    "InvBag8": {
        "displayName": "Inventory_Bag_H",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "Speed": 165,
        "Reach": 10
    },
    "InvBag9": {
        "displayName": "Inventory_Bag_I",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "Speed": 165,
        "Reach": 10
    },
    "InvBag21": {
        "displayName": "Inventory_Bag_U",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvBag22": {
        "displayName": "Inventory_Bag_V",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvBag23": {
        "displayName": "Inventory_Bag_W",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvBag24": {
        "displayName": "Inventory_Bag_X",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvBag25": {
        "displayName": "Inventory_Bag_Y",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvBag26": {
        "displayName": "Inventory_Bag_Z",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvBag100": {
        "displayName": "Snakeskinventory_Bag",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 120,
        "Reach": 10
    },
    "InvBag101": {
        "displayName": "Totally_Normal_and_not_fake_Bag",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 20,
        "Reach": 10
    },
    "InvBag102": {
        "displayName": "Blunderbag",
        "lvReqToEquip": 5,
        "Class": "ALL",
        "Speed": 20,
        "Reach": 10
    },
    "InvBag103": {
        "displayName": "Sandy_Satchel",
        "lvReqToEquip": 20,
        "Class": "ALL",
        "Reach": 10
    },
    "InvBag104": {
        "displayName": "Bummo_Bag",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Reach": 10
    },
    "InvBag105": {
        "displayName": "Capitalist_Case",
        "lvReqToEquip": 15,
        "Class": "ALL",
        "Reach": 10
    },
    "InvBag106": {
        "displayName": "Wealthy_Wallet",
        "lvReqToEquip": 35,
        "Class": "ALL",
        "Reach": 10
    },
    "InvBag107": {
        "displayName": "Prosperous_Pouch",
        "lvReqToEquip": 70,
        "Class": "ALL",
        "Reach": 10
    },
    "InvBag108": {
        "displayName": "Sack_of_Success",
        "lvReqToEquip": 120,
        "Class": "ALL",
        "Reach": 10
    },
    "InvBag109": {
        "displayName": "Shivering_Sack",
        "lvReqToEquip": 65,
        "Class": "ALL",
        "Reach": 10
    },
    "InvBag110": {
        "displayName": "Mamooth_Hide_Bag",
        "lvReqToEquip": 55,
        "Class": "ALL",
        "Reach": 10
    },
    "InvStorage1": {
        "displayName": "Storage_Chest_1",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 330,
        "Reach": 10
    },
    "InvStorage2": {
        "displayName": "Storage_Chest_2",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 330,
        "Reach": 10
    },
    "InvStorage3": {
        "displayName": "Storage_Chest_3",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 330,
        "Reach": 10
    },
    "InvStorage4": {
        "displayName": "Storage_Chest_4",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 330,
        "Reach": 10
    },
    "InvStorage5": {
        "displayName": "Storage_Chest_5",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 330,
        "Reach": 10
    },
    "InvStorage6": {
        "displayName": "Storage_Chest_6",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 170,
        "Reach": 10
    },
    "InvStorage7": {
        "displayName": "Storage_Chest_7",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 170,
        "Reach": 10
    },
    "InvStorage8": {
        "displayName": "Storage_Chest_8",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 170,
        "Reach": 10
    },
    "InvStorage9": {
        "displayName": "Storage_Chest_9",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 170,
        "Reach": 10
    },
    "InvStorage10": {
        "displayName": "Storage_Chest_10",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Reach": 10
    },
    "InvStorage11": {
        "displayName": "Storage_Chest_11",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Reach": 10
    },
    "InvStorage12": {
        "displayName": "Storage_Chest_12",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Reach": 10
    },
    "InvStorage13": {
        "displayName": "Storage_Chest_13",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Reach": 10
    },
    "InvStorage14": {
        "displayName": "Storage_Chest_14",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Reach": 10
    },
    "InvStorage15": {
        "displayName": "Storage_Chest_15",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 290,
        "Reach": 10
    },
    "InvStorage16": {
        "displayName": "Storage_Chest_16",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 290,
        "Reach": 10
    },
    "InvStorage17": {
        "displayName": "Storage_Chest_17",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 290,
        "Reach": 10
    },
    "InvStorage18": {
        "displayName": "Storage_Chest_18",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 290,
        "Reach": 10
    },
    "InvStorage19": {
        "displayName": "Storage_Chest_19",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 290,
        "Reach": 10
    },
    "InvStorage20": {
        "displayName": "Storage_Chest_20",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 290,
        "Reach": 10
    },
    "InvStorage21": {
        "displayName": "Storage_Chest_21",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 290,
        "Reach": 10
    },
    "InvStorage31": {
        "displayName": "Storage_Chest_90",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage32": {
        "displayName": "Storage_Chest_91",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage33": {
        "displayName": "Storage_Chest_92",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage34": {
        "displayName": "Storage_Chest_93",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage35": {
        "displayName": "Storage_Chest_94",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage36": {
        "displayName": "Storage_Chest_95",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage37": {
        "displayName": "Storage_Chest_96",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage38": {
        "displayName": "Storage_Chest_97",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage39": {
        "displayName": "Storage_Chest_98",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage40": {
        "displayName": "Storage_Chest_99",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage41": {
        "displayName": "Storage_Chest_99B",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorage42": {
        "displayName": "Storage_Chest_99C",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Speed": 150,
        "Reach": 10
    },
    "InvStorageF": {
        "displayName": "Dank_Paypay_Chest",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "Reach": 10
    },
    "Key1": {
        "displayName": "Forest_Villa_Key"
    },
    "Key2": {
        "displayName": "Efaunt's_Tomb_Key"
    },
    "Key3": {
        "displayName": "Chizoar's_Cavern_Key"
    },
    "ObolFrag": {
        "displayName": "Obol_Fragment"
    },
    "DoubleAFKtix": {
        "displayName": "Double_AFK_Gain_Ticket"
    },
    "TixCol": {
        "displayName": "Colosseum_Ticket"
    },
    "DeliveryBox": {
        "displayName": "Delivery_Box"
    },
    "SilverPen": {
        "displayName": "Silver_Pen"
    },
    "PremiumGem": {
        "displayName": "Gem"
    },
    "TalentPoint1": {
        "displayName": "Talent_Point_Tab_1"
    },
    "TalentPoint2": {
        "displayName": "Talent_Point_Tab_2"
    },
    "TalentPoint3": {
        "displayName": "Talent_Point_Tab_3"
    },
    "TalentPoint4": {
        "displayName": "Talent_Point_Tab_4"
    },
    "TalentPoint5": {
        "displayName": "Talent_Point_Tab_4"
    },
    "TalentPoint6": {
        "displayName": "Talent_Point_Special_Tab"
    },
    "Line1": {
        "displayName": "Copper_Twine"
    },
    "Line2": {
        "displayName": "Silver_Twine"
    },
    "Line3": {
        "displayName": "Gold_Twine"
    },
    "Line4": {
        "displayName": "Platinum_Twine"
    },
    "Line5": {
        "displayName": "Leafy_Vines"
    },
    "Line6": {
        "displayName": "Fun_Flags"
    },
    "Line7": {
        "displayName": "Electrical_Wiring"
    },
    "Line8": {
        "displayName": "Wiener_Links"
    },
    "Line9": {
        "displayName": "Zeus_Gon_Fishin"
    },
    "Line10": {
        "displayName": "Needledrop"
    },
    "Line11": {
        "displayName": "Spoons_Lol"
    },
    "Line12": {
        "displayName": "Its_a_Boy_Celebration"
    },
    "Line13": {
        "displayName": "Its_a_Girl_Celebration"
    },
    "Line14": {
        "displayName": "Its_Alright_Celebration"
    },
    "Weight1": {
        "displayName": "Wormie_Weight"
    },
    "Weight2": {
        "displayName": "Iron_Hook"
    },
    "Weight3": {
        "displayName": "Basic_Bobber"
    },
    "Weight4": {
        "displayName": "Dualhook_Prongs"
    },
    "Weight5": {
        "displayName": "One_Pound_of_Steel"
    },
    "Weight6": {
        "displayName": "One_Pound_of_Feathers"
    },
    "Weight7": {
        "displayName": "Massless_Unit_for_Physics_Questions"
    },
    "Weight8": {
        "displayName": "Literal_Elephant"
    },
    "Weight9": {
        "displayName": "Valve_Patented_Circle_Thingies"
    },
    "Weight10": {
        "displayName": "Dynamite"
    },
    "Weight11": {
        "displayName": "Not_Dynamite"
    },
    "Weight12": {
        "displayName": "Triple_Threat"
    },
    "Weight13": {
        "displayName": "Crash_Box"
    },
    "Weight14": {
        "displayName": "Fat_Albert"
    },
    "CardsA0": {
        "displayName": "CardsA0"
    },
    "CardsA1": {
        "displayName": "CardsA1"
    },
    "CardsA2": {
        "displayName": "DONTFILL"
    },
    "CardsA3": {
        "displayName": "DONTFILL"
    },
    "CardsA4": {
        "displayName": "DONTFILL"
    },
    "CardsA5": {
        "displayName": "DONTFILL"
    },
    "CardsA6": {
        "displayName": "DONTFILL"
    },
    "CardsA7": {
        "displayName": "DONTFILL"
    },
    "CardsA8": {
        "displayName": "DONTFILL"
    },
    "CardsA9": {
        "displayName": "DONTFILL"
    },
    "CardsA10": {
        "displayName": "DONTFILL"
    },
    "CardsA11": {
        "displayName": "DONTFILL"
    },
    "CardsA12": {
        "displayName": "DONTFILL"
    },
    "CardsA13": {
        "displayName": "DONTFILL"
    },
    "CardsA14": {
        "displayName": "DONTFILL"
    },
    "CardsA15": {
        "displayName": "DONTFILL"
    },
    "CardsA16": {
        "displayName": "DONTFILL"
    },
    "CardsB1": {
        "displayName": "DONTFILL"
    },
    "CardsB2": {
        "displayName": "DONTFILL"
    },
    "CardsB3": {
        "displayName": "DONTFILL"
    },
    "CardsB4": {
        "displayName": "DONTFILL"
    },
    "CardsB5": {
        "displayName": "DONTFILL"
    },
    "CardsB6": {
        "displayName": "DONTFILL"
    },
    "CardsB7": {
        "displayName": "DONTFILL"
    },
    "CardsB8": {
        "displayName": "DONTFILL"
    },
    "CardsB9": {
        "displayName": "DONTFILL"
    },
    "CardsB10": {
        "displayName": "DONTFILL"
    },
    "CardsB11": {
        "displayName": "DONTFILL"
    },
    "CardsB12": {
        "displayName": "DONTFILL"
    },
    "CardsB13": {
        "displayName": "DONTFILL"
    },
    "CardsB14": {
        "displayName": "DONTFILL"
    },
    "CardsC1": {
        "displayName": "DONTFILL"
    },
    "CardsC2": {
        "displayName": "DONTFILL"
    },
    "CardsC3": {
        "displayName": "DONTFILL"
    },
    "CardsC4": {
        "displayName": "DONTFILL"
    },
    "CardsC5": {
        "displayName": "DONTFILL"
    },
    "CardsC6": {
        "displayName": "DONTFILL"
    },
    "CardsC7": {
        "displayName": "DONTFILL"
    },
    "CardsC8": {
        "displayName": "DONTFILL"
    },
    "CardsC9": {
        "displayName": "DONTFILL"
    },
    "CardsC10": {
        "displayName": "DONTFILL"
    },
    "CardsC11": {
        "displayName": "DONTFILL"
    },
    "CardsC12": {
        "displayName": "DONTFILL"
    },
    "CardsC13": {
        "displayName": "DONTFILL"
    },
    "CardsC14": {
        "displayName": "DONTFILL"
    },
    "CardsC15": {
        "displayName": "DONTFILL"
    },
    "CardsC16": {
        "displayName": "DONTFILL"
    },
    "CardsD1": {
        "displayName": "DONTFILL"
    },
    "CardsD2": {
        "displayName": "DONTFILL"
    },
    "CardsD3": {
        "displayName": "DONTFILL"
    },
    "CardsD4": {
        "displayName": "DONTFILL"
    },
    "CardsD5": {
        "displayName": "DONTFILL"
    },
    "CardsD6": {
        "displayName": "DONTFILL"
    },
    "CardsD7": {
        "displayName": "DONTFILL"
    },
    "CardsD8": {
        "displayName": "DONTFILL"
    },
    "CardsD9": {
        "displayName": "DONTFILL"
    },
    "CardsD10": {
        "displayName": "DONTFILL"
    },
    "CardsD11": {
        "displayName": "DONTFILL"
    },
    "CardsD12": {
        "displayName": "DONTFILL"
    },
    "CardsD13": {
        "displayName": "DONTFILL"
    },
    "CardsD16": {
        "displayName": "DONTFILL"
    },
    "CardsD17": {
        "displayName": "DONTFILL"
    },
    "CardsD18": {
        "displayName": "DONTFILL"
    },
    "CardsD19": {
        "displayName": "DONTFILL"
    },
    "CardsD20": {
        "displayName": "DONTFILL"
    },
    "CardsD21": {
        "displayName": "DONTFILL"
    },
    "CardsE0": {
        "displayName": "DONTFILL"
    },
    "CardsE1": {
        "displayName": "DONTFILL"
    },
    "CardsE2": {
        "displayName": "DONTFILL"
    },
    "CardsE3": {
        "displayName": "DONTFILL"
    },
    "CardsE4": {
        "displayName": "DONTFILL"
    },
    "CardsE5": {
        "displayName": "DONTFILL"
    },
    "CardsE6": {
        "displayName": "DONTFILL"
    },
    "CardsE7": {
        "displayName": "DONTFILL"
    },
    "CardsE8": {
        "displayName": "DONTFILL"
    },
    "CardsE9": {
        "displayName": "DONTFILL"
    },
    "CardsE10": {
        "displayName": "DONTFILL"
    },
    "CardsE11": {
        "displayName": "DONTFILL"
    },
    "CardsE12": {
        "displayName": "DONTFILL"
    },
    "CardsE13": {
        "displayName": "DONTFILL"
    },
    "CardsE14": {
        "displayName": "DONTFILL"
    },
    "CardsE15": {
        "displayName": "DONTFILL"
    },
    "CardsF1": {
        "displayName": "DONTFILL"
    },
    "CardsF2": {
        "displayName": "DONTFILL"
    },
    "CardsF3": {
        "displayName": "DONTFILL"
    },
    "CardsF4": {
        "displayName": "DONTFILL"
    },
    "CardsF5": {
        "displayName": "DONTFILL"
    },
    "CardsF6": {
        "displayName": "DONTFILL"
    },
    "CardsF7": {
        "displayName": "DONTFILL"
    },
    "CardsF8": {
        "displayName": "DONTFILL"
    },
    "CardsF9": {
        "displayName": "DONTFILL"
    },
    "CardsF10": {
        "displayName": "DONTFILL"
    },
    "CardsF11": {
        "displayName": "DONTFILL"
    },
    "CardsY0": {
        "displayName": "DONTFILL"
    },
    "CardsY1": {
        "displayName": "DONTFILL"
    },
    "CardsY2": {
        "displayName": "DONTFILL"
    },
    "CardsY3": {
        "displayName": "DONTFILL"
    },
    "CardsY4": {
        "displayName": "DONTFILL"
    },
    "CardsY5": {
        "displayName": "DONTFILL"
    },
    "CardsY6": {
        "displayName": "DONTFILL"
    },
    "CardsY7": {
        "displayName": "DONTFILL"
    },
    "CardsY8": {
        "displayName": "DONTFILL"
    },
    "CardsY9": {
        "displayName": "DONTFILL"
    },
    "CardsY10": {
        "displayName": "DONTFILL"
    },
    "CardsY11": {
        "displayName": "DONTFILL"
    },
    "CardsY12": {
        "displayName": "DONTFILL"
    },
    "CardsY13": {
        "displayName": "DONTFILL"
    },
    "CardsZ0": {
        "displayName": "DONTFILL"
    },
    "CardsZ1": {
        "displayName": "DONTFILL"
    },
    "CardsZ2": {
        "displayName": "DONTFILL"
    },
    "CardsZ3": {
        "displayName": "DONTFILL"
    },
    "CardsZ4": {
        "displayName": "DONTFILL"
    },
    "CardsZ5": {
        "displayName": "DONTFILL"
    },
    "CardsZ6": {
        "displayName": "DONTFILL"
    },
    "CardsZ7": {
        "displayName": "DONTFILL"
    },
    "CardsZ8": {
        "displayName": "DONTFILL"
    },
    "CardsZ9": {
        "displayName": "DONTFILL"
    },
    "CardPack1": {
        "displayName": "Newbie_Card_Pack"
    },
    "CardPack2": {
        "displayName": "Ancient_Card_Pack"
    },
    "CardPack3": {
        "displayName": "Eternal_Card_Pack"
    },
    "EquipmentHats31": {
        "displayName": "Smitty's_Bubble_Blowing_Hat",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats32": {
        "displayName": "Bandit_Bob_Mask",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats33": {
        "displayName": "Paper_Bag",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats34": {
        "displayName": "Parasite",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats35": {
        "displayName": "Diamon_Horns",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats36": {
        "displayName": "Halloween_Pumpkin",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats40": {
        "displayName": "Pardoned_Turkey",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats37": {
        "displayName": "Hotdog_Hero",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats38": {
        "displayName": "Invisible_Hat",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats46": {
        "displayName": "Strawbiggy",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats47": {
        "displayName": "Pop_Cat",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats48": {
        "displayName": "Dairy_Dunk",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats49": {
        "displayName": "The_Classic",
        "Class": "ALL",
        "lvReqToEquip": 1,
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats50": {
        "displayName": "Green_Beanie",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats43": {
        "displayName": "Snowman",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "EquipmentHats45": {
        "displayName": "Giftmas_Tree",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 10
    },
    "EquipmentHats57": {
        "displayName": "Big_Bunny",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 11
    },
    "EquipmentHats62": {
        "displayName": "Fluffy_Ramsy",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1,
        "UQ1txt": "%_XP_FROM_MONSTERS",
        "UQ1val": 11
    },
    "GemP1": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemP9": {
        "displayName": "Quality_Obol_Stack"
    },
    "GemP10": {
        "displayName": "Marvelous_Obol_Stack"
    },
    "GemQ1": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemQ2": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemQ3": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemQ4": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemQ5": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemQ6": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemQ7": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemQ8": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    },
    "GemQ9": {
        "displayName": "Infinite_Forge",
        "lvReqToEquip": 1,
        "Class": "ALL",
        "STR": 1,
        "AGI": 1,
        "WIS": 1,
        "LUK": 1
    }
}));

export {
    prayersMap,
    monstersMap,
    keysMap,
    talentPagesMap,
    talentsMap,
    starSignMap,
    classMap,
    mapsMap,
    itemMap,
    bubblesMap,
    cardSetMap,
    cardEquipMap,
    cardLevelMap,
    skillIndexMap,
    guildBonusesMap,
    obolMap,
    obolFamilyShapeMap,
    obolCharacterShapeMap,
    filteredLootyItems,
    anvilProductionItems,
    stampsMap,
    maxCarryCap,
    statuesMap,
    IDforETCbonus,
    IDforCardBonus,
    IDforCardSETbonus
};