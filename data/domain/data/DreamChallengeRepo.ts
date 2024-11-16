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
                "challenge": "Defeat the Vengeful Grandfrogger, 4th difficulty, in a party of just yourself.",
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
                "challenge": "Defeat the Inevitable Snakenhotep in a party by yourself. That's the 3rd and final W2 Dungeon boss",
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
                "challenge": "Defeat the Caustic Glaciaxus in a party of just yourself. That's the 3rd and final W3 Dungeon boss",
                "req": 1,
                "reward": "+25% Equinox Bar fill rate",
                "filler": "Filler"
            }),
        new DreamChallengeBase(20, <DreamChallengeModel>{
                "challenge": "Reach round 115 in the Pet Arena, but only using a team of 4 Pets or less",
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
                "challenge": "Get at least 100 Killroy kills on all monsters in World 1, 2, 3, 4, 5 and 6, as shown in Killroy Prime in Rift",
                "req": 80,
                "reward": "+15 Max LV for 'Voter Rights' Equinox Upgrade",
                "filler": "Filler"
            })    
]
}
