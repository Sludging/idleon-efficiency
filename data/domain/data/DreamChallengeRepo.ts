import { DreamChallengeModel } from '../model/dreamChallengeModel';

export class DreamChallengeBase { constructor(public index: number, public data: DreamChallengeModel) { } }



export const initDreamChallengeRepo = () => {
    return [    
        new DreamChallengeBase(0, <DreamChallengeModel>{
                "challenge": "Greenstack 20 different items in your Storage Chest",
                "req": 20,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(1, <DreamChallengeModel>{
                "challenge": "Get 400 kills in a single Killroy run. Why do they keep respawning anyway, are they stupid?",
                "req": 400,
                "reward": "+1 Trophy per Weekly Battle boss kill forever",
                "filler": "Filler"
            }),
        new DreamChallengeBase(2, <DreamChallengeModel>{
                "challenge": "Reach Lv 100 on all of your characters. Single character accounts, it's your time to shine!",
                "req": 1,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(3, <DreamChallengeModel>{
                "challenge": "Reach a total Refinery Rank of 30 across all cycles",
                "req": 30,
                "reward": "+10% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(4, <DreamChallengeModel>{
                "challenge": "Get a single sample of 1 million or more of any item. 7 digit sample club, you in?",
                "req": 1,
                "reward": "New Star Talent",
                "filler": "Filler"
            }),
        new DreamChallengeBase(5, <DreamChallengeModel>{
                "challenge": "Reach wave 50 on first 6 Tower Defence Worship Summons",
                "req": 6,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(6, <DreamChallengeModel>{
                "challenge": "Defeat all 5 difficulties of a Weekly BATTLE boss. RIP!",
                "req": 1,
                "reward": "+3 Max LV for Equinox Upgrade 'Liquidvestment'",
                "filler": "Filler"
            }),
        new DreamChallengeBase(7, <DreamChallengeModel>{
                "challenge": "Max out 5 stat upgrades within the Flurbo Shop of the Dungeon",
                "req": 5,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(8, <DreamChallengeModel>{
                "challenge": "Defeat the Vengeful Grandfrogger, 4th difficulty, in a party with others or alone.",
                "req": 1,
                "reward": "Tick Tock book from alchemy can now go up to Lv.200",
                "filler": "Filler"
            }),
        new DreamChallengeBase(9, <DreamChallengeModel>{
                "challenge": "Reach Lv 300 Construction on any character",
                "req": 300,
                "reward": "+15% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(10, <DreamChallengeModel>{
                "challenge": "Reach Lv 250 on all of your characters, every one of them. Yes, even the bad ones you neglect",
                "req": 1,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(11, <DreamChallengeModel>{
                "challenge": "Greenstack 75 different items in your Storage Chest",
                "req": 75,
                "reward": "+1 Trophy per Weekly Battle boss kill forever",
                "filler": "Filler"
            }),
        new DreamChallengeBase(12, <DreamChallengeModel>{
                "challenge": "Get 100,000 sec of instant progress from a single use of Cranium Cooking talent",
                "req": 100000,
                "reward": "+5 Max LV for 'Matching Scims' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(13, <DreamChallengeModel>{
                "challenge": "Reach a total shrine lv of 140 across all shrines",
                "req": 140,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(14, <DreamChallengeModel>{
                "challenge": "Defeat the Inevitable Snakenhotep in a party with others or alone. That's the 3rd and final W2 Dungeon boss",
                "req": 1,
                "reward": "+20% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(15, <DreamChallengeModel>{
                "challenge": "Fill half of your cog board, at least 48 slots, with Ulti Double Cogs.",
                "req": 48,
                "reward": "+4 Max LV for 'Liquidvestment' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(16, <DreamChallengeModel>{
                "challenge": "Get a Lucky Lad trophy drop on a beginner type character",
                "req": 1,
                "reward": "New Recipe in Anvil III for the 'Luckier Lad' trophy",
                "filler": "Filler"
            }),
        new DreamChallengeBase(17, <DreamChallengeModel>{
                "challenge": "Reach a total Refinery Rank of 60 across all cycles",
                "req": 60,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(18, <DreamChallengeModel>{
                "challenge": "Use a stack of 100,000 cooking Ladles in a single usage",
                "req": 1,
                "reward": "+10 Max LV for 'Matching Scims' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(19, <DreamChallengeModel>{
                "challenge": "Defeat the Caustic Glaciaxus in a party with others or alone. That's the 3rd and final W3 Dungeon boss",
                "req": 1,
                "reward": "+25% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(20, <DreamChallengeModel>{
                "challenge": "Reach round 115 in the Mob Arena, but only using a team of 4 Mobs or less",
                "req": 115,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(21, <DreamChallengeModel>{
                "challenge": "Upgrade the Bobjoepickle vial to Lv 2. It will still do nothing, but one can dream!",
                "req": 2,
                "reward": "+5 Max LV for 'Faux Jewels' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(22, <DreamChallengeModel>{
                "challenge": "Reach Lv 500 on all of your characters. That's over half way to the fabled 9999!",
                "req": 1,
                "reward": "+30% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(23, <DreamChallengeModel>{
                "challenge": "Have 15 chemical plants just chillin' in your Gaming Garden all at once",
                "req": 15,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(24, <DreamChallengeModel>{
                "challenge": "Get 2000 kills in a single Killroy run. Seems like a lot, but compared to your deathnote, it really isn't huh...",
                "req": 2000,
                "reward": "+35% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(25, <DreamChallengeModel>{
                "challenge": "Get a total of 100 BILLION Green Mushroom deathnote kills.",
                "req": 1,
                "reward": "+4 Max LV for 'Food Lust' Equinox Upg",
                "filler": "Filler"
            }),
        new DreamChallengeBase(26, <DreamChallengeModel>{
                "challenge": "Get a single sample of 1 billion or more of any item. 10 digit sample club, you in?",
                "req": 1,
                "reward": "+10 Max LV for 'Faux Jewels' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(27, <DreamChallengeModel>{
                "challenge": "Reach wave 121 on first 6 Tower Defence Worship Summons",
                "req": 6,
                "reward": "+200 Starting Points in Worship TD",
                "filler": "Filler"
            }),
        new DreamChallengeBase(28, <DreamChallengeModel>{
                "challenge": "Greenstack 200 different items in your Storage Chest",
                "req": 200,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(29, <DreamChallengeModel>{
                "challenge": "Successfully take a Red Frisbee sample at Wood Mushrooms. Yeah, it's possible",
                "req": 1,
                "reward": "+40% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(30, <DreamChallengeModel>{
                "challenge": "Get 100 5 star ruby cards. Or, get 1 500 star card. The latter does not exist. Sadly",
                "req": 100,
                "reward": "+4 Max LV for 'Equinox Symbols' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(31, <DreamChallengeModel>{
                "challenge": "Acquire all 10 Megafeathers from Orion the Great Owl, and all 12 Megafish from Poppy the Kangaroo Mouse",
                "req": 22,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(32, <DreamChallengeModel>{
                "challenge": "Unlock 75 or more Portals on a single Voidwalker Speedrun",
                "req": 75,
                "reward": "+6 Max LV for 'Slow Roast Wiz' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(33, <DreamChallengeModel>{
                "challenge": "Reach a total Cooking Meal Upgrade Lv of 4242 across all meals",
                "req": 4242,
                "reward": "'Food Lust' Equinox Upg now reduces cost by -42% per stack",
                "filler": "Filler"
            }),
        new DreamChallengeBase(34, <DreamChallengeModel>{
                "challenge": "Find every type of hat in Sneaking, including the Funky Hat, which is a SUPER rare drop from the lobby floor...",
                "req": 15,
                "reward": "+10 Max LV for 'Matching Scims' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(35, <DreamChallengeModel>{
                "challenge": "Get at least 100 Killroy kills on HALF of monsters in World 1 through 6, as shown in Killroy Prime in Rift",
                "req": 40,
                "reward": "+15 Max LV for 'Voter Rights' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(36, <DreamChallengeModel>{
                "challenge": "Hit a bomb instantly while playing Mr. Minehead's Depth Charge 5 times",
                "req": 5,
                "reward": "Unlock next Equinox upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(37, <DreamChallengeModel>{
                "challenge": "Create a Tier 25 Sushi at the Sushi Station",
                "req": 25,
                "reward": "+5 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(38, <DreamChallengeModel>{
                "challenge": "Reach Worker Class Lv.3 or higher at The Clamworks in World 7",
                "req": 3,
                "reward": "+60% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(39, <DreamChallengeModel>{
                "challenge": "Reach Showdown 100 at the Emperor's Castle in World 6",
                "req": 100,
                "reward": "+10 Max LV for 'Matching Scims' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(40, <DreamChallengeModel>{
                "challenge": "Fill half of your cog board, at least 48 slots, with Jewel Cogs. They're unlocked from Duperbits in Gaming.",
                "req": 48,
                "reward": "+65% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(41, <DreamChallengeModel>{
                "challenge": "Reach Lv 1000 on ALL your characters!",
                "req": 1,
                "reward": "All Minehead opponents have 1 less Depth Charge",
                "filler": "Filler"
            }),
        new DreamChallengeBase(42, <DreamChallengeModel>{
                "challenge": "Reach LV. 30 for any Palette Colour in Gaming",
                "req": 30,
                "reward": "+5 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(43, <DreamChallengeModel>{
                "challenge": "Reclaim at least 50 of the King Rat's missing crowns, as shown in your Gaming Logbook",
                "req": 50,
                "reward": "+5 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(44, <DreamChallengeModel>{
                "challenge": "Complete 300 different Quests. This is the same value used by those Star Talents of yours on the 1st page!",
                "req": 300,
                "reward": "+75% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(45, <DreamChallengeModel>{
                "challenge": "Help Bolaia, Student of Cavern Lore, reach Lv 200 or higher",
                "req": 200,
                "reward": "1.03x Equinox Bar fill rate, MULTI!",
                "filler": "Filler"
            }),
        new DreamChallengeBase(46, <DreamChallengeModel>{
                "challenge": "Level up your C String at The Harp in the Caverns to Lv 150 or higher",
                "req": 150,
                "reward": "+90% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(47, <DreamChallengeModel>{
                "challenge": "Defeat 300 opponents in Endless Summoning",
                "req": 300,
                "reward": "+5 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(48, <DreamChallengeModel>{
                "challenge": "Reach 10,000,000+ Total Points in the Gambit Cavern",
                "req": 10000000,
                "reward": "+100% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(49, <DreamChallengeModel>{
                "challenge": "Reach LV. 60 for any Palette Colour in Gaming",
                "req": 60,
                "reward": "1.05x Equinox Bar fill rate, MULTI!",
                "filler": "Filler"
            }),
        new DreamChallengeBase(50, <DreamChallengeModel>{
                "challenge": "Reach Sanctum 25 in the Temple Cavern",
                "req": 25,
                "reward": "+5 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(51, <DreamChallengeModel>{
                "challenge": "Get a score of 100,000,000 or more in The Dawg Den Cavern",
                "req": 100000000,
                "reward": "+120% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(52, <DreamChallengeModel>{
                "challenge": "Collect 60 Stickers from Harvesting Megacrops in Farming",
                "req": 60,
                "reward": "1.06x Equinox Bar fill rate, MULTI!",
                "filler": "Filler"
            }),
        new DreamChallengeBase(53, <DreamChallengeModel>{
                "challenge": "Get a LV. 7 slot in Sneaking, using Symbols. This is the Green slot that comes after the Lv.6 White slot.",
                "req": 7,
                "reward": "+100 Max possible LV for all Sneaking Charms",
                "filler": "Filler"
            }),
        new DreamChallengeBase(54, <DreamChallengeModel>{
                "challenge": "Have 16 or more Millionmega Gold Foods on the Beanstalk. You must complete Sad Urie's questline first...",
                "req": 16,
                "reward": "+150% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(55, <DreamChallengeModel>{
                "challenge": "Acquire at least 8 Megaflesh from Bubba the Seal",
                "req": 8,
                "reward": "+5 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(56, <DreamChallengeModel>{
                "challenge": "Find at least 1850 items, according to The Slab",
                "req": 1850,
                "reward": "+160% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(57, <DreamChallengeModel>{
                "challenge": "Reach LV. 82 for any Palette Colour in Gaming",
                "req": 82,
                "reward": "+170% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(58, <DreamChallengeModel>{
                "challenge": "Reach a 200,000x or higher multiplier for Extra Bones, or Extra Tachyons. Your choice.",
                "req": 200000,
                "reward": "+6 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(59, <DreamChallengeModel>{
                "challenge": "Find a Nugget worth at least 1000Mx Bits Gain in Gaming. Yes, a BILLIONAIRE golden nugget...",
                "req": 1000000000,
                "reward": "1.07x Equinox Bar fill rate, MULTI!",
                "filler": "Filler"
            }),
        new DreamChallengeBase(60, <DreamChallengeModel>{
                "challenge": "Acquire a Tier 6 Tiny Cog. Yes, a Tier 6 exactly. Tier 7 and up ain't it.",
                "req": 1,
                "reward": "+185% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(61, <DreamChallengeModel>{
                "challenge": "Reach Lv. 1500 on any of your characters, you absolute legend",
                "req": 1,
                "reward": "+6 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(62, <DreamChallengeModel>{
                "challenge": "Add either the Nine Dart Finish Trophy or the Baller Trophy to your Gallery",
                "req": 1,
                "reward": "+190% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(63, <DreamChallengeModel>{
                "challenge": "Press THE BUTTON at least 200 times... actually, better make that 210 times!",
                "req": 210,
                "reward": "+195% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(64, <DreamChallengeModel>{
                "challenge": "Create a Tier 54 Sushi at the Sushi Station",
                "req": 54,
                "reward": "+7 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(65, <DreamChallengeModel>{
                "challenge": "Reclaim at least 70 of the King Rat's missing crowns, as shown in your Gaming Logbook",
                "req": 70,
                "reward": "+200% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(66, <DreamChallengeModel>{
                "challenge": "Reach Worker Class Lv.8 or higher at The Clamworks in World 7",
                "req": 8,
                "reward": "+3 Exotic Market purchases per week",
                "filler": "Filler"
            }),
        new DreamChallengeBase(67, <DreamChallengeModel>{
                "challenge": "Hit a bomb instantly while playing Mr. Minehead's Depth Charge 500 times",
                "req": 500,
                "reward": "1.07x Equinox Bar fill rate, MULTI!",
                "filler": "Filler"
            }),
        new DreamChallengeBase(68, <DreamChallengeModel>{
                "challenge": "Collect 80 Stickers from Harvesting Megacrops in Farming",
                "req": 80,
                "reward": "+220% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(69, <DreamChallengeModel>{
                "challenge": "Acquire at least 10 Megaflesh from Bubba the Seal",
                "req": 10,
                "reward": "1.05x Drop Rate multi",
                "filler": "Filler"
            }),
        new DreamChallengeBase(70, <DreamChallengeModel>{
                "challenge": "Reach LV. 100 for any Palette Colour in Gaming",
                "req": 100,
                "reward": "1.05x Class EXP multi",
                "filler": "Filler"
            }),
        new DreamChallengeBase(71, <DreamChallengeModel>{
                "challenge": "Find all 10 Grand Discoveries in Pebble Cove, the first Spelunking tunnel",
                "req": 10,
                "reward": "All Research Grid bonuses are +1% bigger",
                "filler": "Filler"
            }),
        new DreamChallengeBase(72, <DreamChallengeModel>{
                "challenge": "Deliver the Unstable Reliquarium 7 times",
                "req": 7,
                "reward": "All Research Grid bonuses are +1% bigger",
                "filler": "Filler"
            }),
        new DreamChallengeBase(73, <DreamChallengeModel>{
                "challenge": "Get a Rank 20 Ribbon.",
                "req": 1,
                "reward": "Ribbons give +1% extra multi every 10 Ranks!",
                "filler": "Filler"
            }),
        new DreamChallengeBase(74, <DreamChallengeModel>{
                "challenge": "Discover every object across all Spelunking tunnels. Better do this now before the next tunnel comes out!",
                "req": 90,
                "reward": "+250% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(75, <DreamChallengeModel>{
                "challenge": "Reach Sneaking Mastery VII",
                "req": 7,
                "reward": "+8 Max LV for 'Nonstop Studies' Equinox Upgrade",
                "filler": "Filler"
            }),
        new DreamChallengeBase(76, <DreamChallengeModel>{
                "challenge": "Get at least 100 Killroy kills on ALL monsters in World 1 through 6, as shown in Killroy Prime in Rift",
                "req": 80,
                "reward": "All Research Grid bonuses are +1% bigger",
                "filler": "Filler"
            })    
]
}
