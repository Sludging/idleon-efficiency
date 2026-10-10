import { GamingSuperbitModel } from '../model/gamingSuperbitModel';

export class GamingSuperbitBase { constructor(public index: number, public data: GamingSuperbitModel) { } }



export const initGamingSuperbitsRepo = () => {
    return [    
        new GamingSuperbitBase(0, <GamingSuperbitModel>{
                "description": "x1.03₣ per Achievement you've unlocked ().   Total bonus: x₣",
                "x1": 1,
                "x2": 9,
                "name": "Bits Per Achievement",
                "superbitId": 0
            }),
        new GamingSuperbitBase(1, <GamingSuperbitModel>{
                "description": "+1 Max Evolution for all plants. This is 20x rarer than normal evolutions",
                "x1": 3,
                "x2": 10,
                "name": "Plant evo",
                "superbitId": 1
            }),
        new GamingSuperbitBase(2, <GamingSuperbitModel>{
                "description": "All obols give +40% more STR/AGI/WIS/LUK than what they say they do!",
                "x1": 2,
                "x2": 12,
                "name": "obol stat booster",
                "superbitId": 2
            }),
        new GamingSuperbitBase(3, <GamingSuperbitModel>{
                "description": "MSA now gives +1% bonus Sailing Speed per 10 total Waves",
                "x1": 5,
                "x2": 16,
                "name": "MSA Sailing",
                "superbitId": 3
            }),
        new GamingSuperbitBase(4, <GamingSuperbitModel>{
                "description": "+20% chance for +1 more bubble boosted by No Bubble Left Behind",
                "x1": 1,
                "x2": 22,
                "name": "Moar Bubbles",
                "superbitId": 4
            }),
        new GamingSuperbitBase(5, <GamingSuperbitModel>{
                "description": "+1 Max Evolution for all plants. This one is 5000x rarer than normal",
                "x1": 3,
                "x2": 44,
                "name": "Plant evo",
                "superbitId": 5
            }),
        new GamingSuperbitBase(6, <GamingSuperbitModel>{
                "description": "+5 Max HP for Worship Totem during Tower Defence summon battle",
                "x1": 2,
                "x2": 11,
                "name": "Worship Totem HP",
                "superbitId": 6
            }),
        new GamingSuperbitBase(7, <GamingSuperbitModel>{
                "description": "Unlock the Totalizer for the Miniature Soul Apparatus (MSA) in World 3",
                "x1": 5,
                "x2": 13,
                "name": "MSA Totalizer",
                "superbitId": 7
            }),
        new GamingSuperbitBase(8, <GamingSuperbitModel>{
                "description": "All shrines level up +50% faster than normal",
                "x1": 5,
                "x2": 14,
                "name": "Shrine Speed",
                "superbitId": 8
            }),
        new GamingSuperbitBase(9, <GamingSuperbitModel>{
                "description": "If no Prayers equipped, get 1/5th bonus of all prayers, and no curses",
                "x1": 3,
                "x2": 17,
                "name": "No more Praying",
                "superbitId": 9
            }),
        new GamingSuperbitBase(10, <GamingSuperbitModel>{
                "description": "+15% chance for Double Exp whenever claiming AFK gains",
                "x1": 2,
                "x2": 23,
                "name": "Double Exp",
                "superbitId": 10
            }),
        new GamingSuperbitBase(11, <GamingSuperbitModel>{
                "description": "MSA now gives +1% bonus Class EXP per 10 total Waves",
                "x1": 4,
                "x2": 38,
                "name": "MSA Class EXP",
                "superbitId": 11
            }),
        new GamingSuperbitBase(12, <GamingSuperbitModel>{
                "description": "+1% Library Checkout Speed per Gaming Lv.   Total Bonus: +{% Spd",
                "x1": 4,
                "x2": 19,
                "name": "Library Checkouts",
                "superbitId": 12
            }),
        new GamingSuperbitBase(13, <GamingSuperbitModel>{
                "description": "MSA now gives +10% bonus Meal Cooking speed per 10 total Waves",
                "x1": 2,
                "x2": 20,
                "name": "MSA Mealing",
                "superbitId": 13
            }),
        new GamingSuperbitBase(14, <GamingSuperbitModel>{
                "description": "All spice claimed, either manually or automatically, is worth 1.5x more.",
                "x1": 4,
                "x2": 25,
                "name": "Spice Is Nice",
                "superbitId": 14
            }),
        new GamingSuperbitBase(15, <GamingSuperbitModel>{
                "description": "+10 Max HP for Worship Totem during Tower Defence summon battle",
                "x1": 4,
                "x2": 31,
                "name": "Worship Totem HPr",
                "superbitId": 15
            }),
        new GamingSuperbitBase(16, <GamingSuperbitModel>{
                "description": "MSA now gives +1% bonus Skill Exp per 10 total Waves",
                "x1": 4,
                "x2": 41,
                "name": "MSA Skill EXP",
                "superbitId": 16
            }),
        new GamingSuperbitBase(17, <GamingSuperbitModel>{
                "description": "All spice claimed, either manually or automatically, is worth 2x more.",
                "x1": 5,
                "x2": 47,
                "name": "Spice Is Nicer",
                "superbitId": 17
            }),
        new GamingSuperbitBase(18, <GamingSuperbitModel>{
                "description": "+1 Max Evolution for all plants. This one is 250x rarer than normal",
                "x1": 2,
                "x2": 27,
                "name": "Plant evo",
                "superbitId": 18
            }),
        new GamingSuperbitBase(19, <GamingSuperbitModel>{
                "description": "Your lowest Leveled character gets 1.5x Class EXP",
                "x1": 4,
                "x2": 29,
                "name": "Noobie Gains",
                "superbitId": 19
            }),
        new GamingSuperbitBase(20, <GamingSuperbitModel>{
                "description": "MSA now gives +50% Bits for Gaming per 10 total Waves",
                "x1": 5,
                "x2": 33,
                "name": "MSA Big Bits",
                "superbitId": 20
            }),
        new GamingSuperbitBase(21, <GamingSuperbitModel>{
                "description": "All atom upgrading is now 10% cheaper",
                "x1": 2,
                "x2": 36,
                "name": "Atom Redux",
                "superbitId": 21
            }),
        new GamingSuperbitBase(22, <GamingSuperbitModel>{
                "description": "+30% chance for +1 more bubble boosted by No Bubble Left Behind",
                "x1": 4,
                "x2": 45,
                "name": "Even Moar Bubbles",
                "superbitId": 22
            }),
        new GamingSuperbitBase(23, <GamingSuperbitModel>{
                "description": "All atoms now have +10 Max LV",
                "x1": 2,
                "x2": 50,
                "name": "Isotope Discovery",
                "superbitId": 23
            }),
        new GamingSuperbitBase(24, <GamingSuperbitModel>{
                "description": "1.01x Class EXP per Spelunk Discovery.           Total Bonus: x EXP",
                "x1": 5,
                "x2": 51,
                "name": "Classy Discoveries",
                "superbitId": 24
            }),
        new GamingSuperbitBase(25, <GamingSuperbitModel>{
                "description": "Adds a new bonus to The Slab: +% Total Spelunking POW",
                "x1": 2,
                "x2": 53,
                "name": "Slabby Spelunking",
                "superbitId": 25
            }),
        new GamingSuperbitBase(26, <GamingSuperbitModel>{
                "description": "1.02x Artifact chance per Spelunk Discovery.          Total Bonus: x",
                "x1": 6,
                "x2": 55,
                "name": "Artifacto Discoveries",
                "superbitId": 26
            }),
        new GamingSuperbitBase(27, <GamingSuperbitModel>{
                "description": "MSA now gives +2.5% Spelunking POW per 10 Waves over 300",
                "x1": 6,
                "x2": 58,
                "name": "MSA Spelunking",
                "superbitId": 27
            }),
        new GamingSuperbitBase(28, <GamingSuperbitModel>{
                "description": "+20% Palette Luck per Snail LV over 25.        Total Bonus: +{% Luck",
                "x1": 6,
                "x2": 65,
                "name": "Lucky Snail",
                "superbitId": 28
            }),
        new GamingSuperbitBase(29, <GamingSuperbitModel>{
                "description": "The Immortal Snail now has +10 Max LV",
                "x1": 5,
                "x2": 71,
                "name": "Snail Genesis",
                "superbitId": 29
            }),
        new GamingSuperbitBase(30, <GamingSuperbitModel>{
                "description": "The Immortal Snail now has +5 Max LV",
                "x1": 3,
                "x2": 52,
                "name": "Snail Omega",
                "superbitId": 30
            }),
        new GamingSuperbitBase(31, <GamingSuperbitModel>{
                "description": "Monument reward multi increases normally for +10 more days",
                "x1": 9,
                "x2": 54,
                "name": "Monument Infimulti",
                "superbitId": 31
            }),
        new GamingSuperbitBase(32, <GamingSuperbitModel>{
                "description": "1.05x Collectible chance per Spelunk Discovery.       Total Bonus: x",
                "x1": 8,
                "x2": 57,
                "name": "Jar Jar Collectible",
                "superbitId": 32
            }),
        new GamingSuperbitBase(33, <GamingSuperbitModel>{
                "description": "Collect Ultimate Cogs while there are 5+ left to get a Jewel Cog (1/day)",
                "x1": 2,
                "x2": 59,
                "name": "Jewel Cogs",
                "superbitId": 33
            }),
        new GamingSuperbitBase(34, <GamingSuperbitModel>{
                "description": "Adds a new bonus to The Slab: +% Research EXP gain",
                "x1": 3,
                "x2": 67,
                "name": "Slabby Research",
                "superbitId": 34
            }),
        new GamingSuperbitBase(35, <GamingSuperbitModel>{
                "description": "+10 Max LV for Equinox upgrades",
                "x1": 4,
                "x2": 73,
                "name": "Equinox Unending",
                "superbitId": 35
            }),
        new GamingSuperbitBase(36, <GamingSuperbitModel>{
                "description": "Can use Spelunking tools you don't have enough stamina for",
                "x1": 6,
                "x2": 58,
                "name": "Any tool Any time",
                "superbitId": 36
            }),
        new GamingSuperbitBase(37, <GamingSuperbitModel>{
                "description": "The Squirrel now has a new 3rd upgrade to spend acorns on",
                "x1": 7,
                "x2": 61,
                "name": "Squirrel Triad",
                "superbitId": 37
            }),
        new GamingSuperbitBase(38, <GamingSuperbitModel>{
                "description": "+1% Palette Luck per Total Colour LVs.        Total Bonus: +{% Luck",
                "x1": 6,
                "x2": 64,
                "name": "Colourful Luck",
                "superbitId": 38
            }),
        new GamingSuperbitBase(39, <GamingSuperbitModel>{
                "description": "If no Prayers equipped, get 2/5th bonus of all prayers, and no curses",
                "x1": 2,
                "x2": 69,
                "name": "Prayers Begone",
                "superbitId": 39
            }),
        new GamingSuperbitBase(40, <GamingSuperbitModel>{
                "description": "The Immortal Snail now has +10 Max LV",
                "x1": 5,
                "x2": 70,
                "name": "Snail Zenith",
                "superbitId": 40
            }),
        new GamingSuperbitBase(41, <GamingSuperbitModel>{
                "description": "Adds a new bonus to slab when W7 Skill 3 comes out",
                "x1": 7,
                "x2": 76,
                "name": "Slabby Something",
                "superbitId": 41
            }),
        new GamingSuperbitBase(42, <GamingSuperbitModel>{
                "description": "+1 Palette Colour Slot, and 2x total Palette Luck!",
                "x1": 3,
                "x2": 60,
                "name": "Bigger Palette",
                "superbitId": 42
            }),
        new GamingSuperbitBase(43, <GamingSuperbitModel>{
                "description": "Bolaia studies ALSO adjacent caverns, not just the selected one!",
                "x1": 6,
                "x2": 63,
                "name": "Peripheral Vision",
                "superbitId": 43
            }),
        new GamingSuperbitBase(44, <GamingSuperbitModel>{
                "description": "MSA now gives +0.3% Research EXP per 10 Waves over 300",
                "x1": 1,
                "x2": 68,
                "name": "MSA Research",
                "superbitId": 44
            }),
        new GamingSuperbitBase(45, <GamingSuperbitModel>{
                "description": "+3% Palette Luck per Gaming LV over 200.       Total Bonus: +{% Luck",
                "x1": 3,
                "x2": 72,
                "name": "Gamer Luck",
                "superbitId": 45
            }),
        new GamingSuperbitBase(46, <GamingSuperbitModel>{
                "description": "MSA will give a bonus for W7 skill 3 when released...",
                "x1": 6,
                "x2": 74,
                "name": "MSA Something",
                "superbitId": 46
            }),
        new GamingSuperbitBase(47, <GamingSuperbitModel>{
                "description": "+1 LV for all Talents per 100 Class LV over 500.      Total Bonus: +{ LV",
                "x1": 8,
                "x2": 78,
                "name": "Timmy Talented",
                "superbitId": 47
            }),
        new GamingSuperbitBase(48, <GamingSuperbitModel>{
                "description": "+1 Max Evolution for all plants. This is 250Kx rarer than normal evolutions",
                "x1": 1,
                "x2": 70,
                "name": "Plant evo",
                "superbitId": 48
            }),
        new GamingSuperbitBase(49, <GamingSuperbitModel>{
                "description": "The Palette bonus from 'Peachy Pink' is 2x bigger now",
                "x1": 3,
                "x2": 73,
                "name": "Peachier Peach",
                "superbitId": 49
            }),
        new GamingSuperbitBase(50, <GamingSuperbitModel>{
                "description": "Earn 1.50x more King Tokens to spend on King Rat's upgrades",
                "x1": 5,
                "x2": 76,
                "name": "A Kings Ransom",
                "superbitId": 50
            }),
        new GamingSuperbitBase(51, <GamingSuperbitModel>{
                "description": "The Palette bonus from 'Ocean Blue' is 2x bigger now",
                "x1": 6,
                "x2": 79,
                "name": "Bluer Ocean",
                "superbitId": 51
            }),
        new GamingSuperbitBase(52, <GamingSuperbitModel>{
                "description": "The Palette bonus from 'Red Orange' is 2x bigger now",
                "x1": 8,
                "x2": 83,
                "name": "Redder Orange",
                "superbitId": 52
            }),
        new GamingSuperbitBase(53, <GamingSuperbitModel>{
                "description": "If no Prayers equipped, get 3/5th bonus of all prayers, and no curses",
                "x1": 4,
                "x2": 87,
                "name": "Prayers Aint Meta",
                "superbitId": 53
            }),
        new GamingSuperbitBase(54, <GamingSuperbitModel>{
                "description": "The Palette bonus from 'Offwhite' is 2x bigger now",
                "x1": 2,
                "x2": 72,
                "name": "Further Offcolour",
                "superbitId": 54
            }),
        new GamingSuperbitBase(55, <GamingSuperbitModel>{
                "description": "+2% Megacrop chance per Farming LV over 300  Total Bonus: x Chance",
                "x1": 6,
                "x2": 77,
                "name": "Mo Stickers Mo Bonusers",
                "superbitId": 55
            }),
        new GamingSuperbitBase(56, <GamingSuperbitModel>{
                "description": "Adds a new Bits Gain multi based on best Log Minigame highscore",
                "x1": 1,
                "x2": 84,
                "name": "Pro Log Flipper",
                "superbitId": 56
            }),
        new GamingSuperbitBase(57, <GamingSuperbitModel>{
                "description": "+1 Max Evolution for all plants. This is 10Mx rarer than normal evolutions",
                "x1": 8,
                "x2": 86,
                "name": "Plant evo",
                "superbitId": 57
            }),
        new GamingSuperbitBase(58, <GamingSuperbitModel>{
                "description": "The Palette bonus from 'Neon Tree' is 2x bigger now",
                "x1": 5,
                "x2": 90,
                "name": "Everybody Talks",
                "superbitId": 58
            }),
        new GamingSuperbitBase(59, <GamingSuperbitModel>{
                "description": "All the '2x Palette bonus from specific colours' upgrades now give 2.5x",
                "x1": 4,
                "x2": 93,
                "name": "Colourier Colours",
                "superbitId": 59
            }),
        new GamingSuperbitBase(60, <GamingSuperbitModel>{
                "description": "Boosts odds of finding one of King Rat's Crowns by 1.50x",
                "x1": 9,
                "x2": 75,
                "name": "Royal Flora",
                "superbitId": 60
            }),
        new GamingSuperbitBase(61, <GamingSuperbitModel>{
                "description": "The Palette bonus from 'Babby Blue' is 2x bigger now",
                "x1": 1,
                "x2": 86,
                "name": "Babbiest Blue",
                "superbitId": 61
            }),
        new GamingSuperbitBase(62, <GamingSuperbitModel>{
                "description": "All Farming Stickers give 1.20x higher bonuses now and forever",
                "x1": 1,
                "x2": 92,
                "name": "Bettah Stickahs",
                "superbitId": 62
            }),
        new GamingSuperbitBase(63, <GamingSuperbitModel>{
                "description": "1.10x Class EXP for all players",
                "x1": 3,
                "x2": 96,
                "name": "Experienced Gamer",
                "superbitId": 63
            }),
        new GamingSuperbitBase(64, <GamingSuperbitModel>{
                "description": "1.10x Damage Multi for all players, unaffected by DMG scaling",
                "x1": 7,
                "x2": 98,
                "name": "Destructive Gamer",
                "superbitId": 64
            }),
        new GamingSuperbitBase(65, <GamingSuperbitModel>{
                "description": "1.30x Palette Luck, straight up multiplier for your colouring needs",
                "x1": 1,
                "x2": 100,
                "name": "Artistic Gamer",
                "superbitId": 65
            }),
        new GamingSuperbitBase(66, <GamingSuperbitModel>{
                "description": "Opponents in Mr. Minehead's Depth Charge always have 1 less mine.",
                "x1": 1,
                "x2": 80,
                "name": "Less Charge",
                "superbitId": 66
            }),
        new GamingSuperbitBase(67, <GamingSuperbitModel>{
                "description": "Your sushi generate +100% more Bucks at the Sushi Station!",
                "x1": 2,
                "x2": 89,
                "name": "Small Gratuity",
                "superbitId": 67
            }),
        new GamingSuperbitBase(68, <GamingSuperbitModel>{
                "description": "Boosts your Cooking Mastery EXP gain rate by 1.40x",
                "x1": 4,
                "x2": 100,
                "name": "Cooking Master",
                "superbitId": 68
            }),
        new GamingSuperbitBase(69, <GamingSuperbitModel>{
                "description": "You? Buying THIS?? YOU'RE BROOOOKE!!!",
                "x1": 2,
                "x2": 150,
                "name": "Not Happening",
                "superbitId": 69
            }),
        new GamingSuperbitBase(70, <GamingSuperbitModel>{
                "description": "Aint no way I'm lettin' ya buy this here upgrade, no way no how.",
                "x1": 2,
                "x2": 150,
                "name": "No Way",
                "superbitId": 70
            }),
        new GamingSuperbitBase(71, <GamingSuperbitModel>{
                "description": "Yea, what he said.",
                "x1": 2,
                "x2": 150,
                "name": "No How",
                "superbitId": 71
            })    
]
}
