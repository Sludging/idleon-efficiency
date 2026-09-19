import { JellyObstructionModel } from '../model/jellyObstructionModel';

export class JellyObstructionBase { constructor(public index: number, public data: JellyObstructionModel) { } }



export const initJellyObstructionRepo = () => {
    return [    
        new JellyObstructionBase(0, <JellyObstructionModel>{
                "index": 0,
                "name": "Longbone",
                "description": "}x multiplier to Research EXP gain @ Also, +2 Jelly Operator slots!",
                "bonusValue": 50
            }),
        new JellyObstructionBase(1, <JellyObstructionModel>{
                "index": 1,
                "name": "Jawbone",
                "description": "All Rank EXP gain is }x higher for all of your Royal Guardian's Outposts @ Also, +2 Jelly Operator slots!",
                "bonusValue": 35
            }),
        new JellyObstructionBase(2, <JellyObstructionModel>{
                "index": 2,
                "name": "Spine",
                "description": "All forms of Clearing Mobs in order to build Outposts on your Royal Guardian is }x higher",
                "bonusValue": 25
            }),
        new JellyObstructionBase(3, <JellyObstructionModel>{
                "index": 3,
                "name": "Antler",
                "description": "All Royal Guardian Outposts in World 1 get +{ PTS",
                "bonusValue": 5
            }),
        new JellyObstructionBase(4, <JellyObstructionModel>{
                "index": 4,
                "name": "Vertebrae",
                "description": "+{ Research Point",
                "bonusValue": 1
            }),
        new JellyObstructionBase(5, <JellyObstructionModel>{
                "index": 5,
                "name": "Skull",
                "description": "+{ Yellow PTS for Cooking Mastery",
                "bonusValue": 1
            }),
        new JellyObstructionBase(6, <JellyObstructionModel>{
                "index": 6,
                "name": "Mawbone",
                "description": "+{ Talent PTS specifically for the Royal Guardian Masterclass",
                "bonusValue": 15
            }),
        new JellyObstructionBase(7, <JellyObstructionModel>{
                "index": 7,
                "name": "Reintler",
                "description": "All Optical Monocles generate }x more Insight for your Research Observations!",
                "bonusValue": 40
            }),
        new JellyObstructionBase(8, <JellyObstructionModel>{
                "index": 8,
                "name": "Fatbone",
                "description": "+{% Crystal Monster spawn chance @ Also, }x Minehead Currency gain",
                "bonusValue": 25
            }),
        new JellyObstructionBase(9, <JellyObstructionModel>{
                "index": 9,
                "name": "Invertedbrae",
                "description": "Boost your Damage dealt during Mr. Minehead's Depth Charge by }x",
                "bonusValue": 30
            }),
        new JellyObstructionBase(10, <JellyObstructionModel>{
                "index": 10,
                "name": "Spinine",
                "description": "+{% total Golden Food bonus",
                "bonusValue": 100
            }),
        new JellyObstructionBase(11, <JellyObstructionModel>{
                "index": 11,
                "name": "Demonicle",
                "description": "The first 5 upgrades in the Royal Armory are {% cheaper",
                "bonusValue": 50
            }),
        new JellyObstructionBase(12, <JellyObstructionModel>{
                "index": 12,
                "name": "Ruby Ring",
                "description": "+{ maximum possible roll when rolling for new Observations",
                "bonusValue": 1
            }),
        new JellyObstructionBase(13, <JellyObstructionModel>{
                "index": 13,
                "name": "Starry Bling",
                "description": "+{ Purple PTS for Cooking Mastery",
                "bonusValue": 1
            }),
        new JellyObstructionBase(14, <JellyObstructionModel>{"index": 14, "name": "Gold Bangle", "description": "}x Drop Rate", "bonusValue": 5}),
        new JellyObstructionBase(15, <JellyObstructionModel>{
                "index": 15,
                "name": "Emerald Broach",
                "description": "All Royal Guardian Outposts in World 2 get +{ PTS",
                "bonusValue": 4
            }),
        new JellyObstructionBase(16, <JellyObstructionModel>{
                "index": 16,
                "name": "Gildrose",
                "description": "}x more Stealth for all your Ninja Twins in Sneaking",
                "bonusValue": 200
            }),
        new JellyObstructionBase(17, <JellyObstructionModel>{
                "index": 17,
                "name": "Opal Pendant",
                "description": "Unlocks a new Atom, which boosts Bloodcell gain",
                "bonusValue": 1
            }),
        new JellyObstructionBase(18, <JellyObstructionModel>{
                "index": 18,
                "name": "Crescent Bling",
                "description": "All Sushi upgrades are {% cheaper",
                "bonusValue": 25
            }),
        new JellyObstructionBase(19, <JellyObstructionModel>{
                "index": 19,
                "name": "Sapphire Ring",
                "description": "}x artifact find chance",
                "bonusValue": 20
            }),
        new JellyObstructionBase(20, <JellyObstructionModel>{
                "index": 20,
                "name": "Stud Pendant",
                "description": "}x Bluefin Fish gains from Poppy",
                "bonusValue": 150
            }),
        new JellyObstructionBase(21, <JellyObstructionModel>{
                "index": 21,
                "name": "Wiltrose",
                "description": "}x Spelunking POW",
                "bonusValue": 30
            }),
        new JellyObstructionBase(22, <JellyObstructionModel>{
                "index": 22,
                "name": "Morning Glory",
                "description": "All Spelunk Shop upgrades are permanently {% off",
                "bonusValue": 10
            }),
        new JellyObstructionBase(23, <JellyObstructionModel>{
                "index": 23,
                "name": "Tiger Eye",
                "description": "}x multiplier to Research EXP gain",
                "bonusValue": 40
            }),
        new JellyObstructionBase(24, <JellyObstructionModel>{
                "index": 24,
                "name": "Apol",
                "description": "Multiplies Bloodcell gain by }x",
                "bonusValue": 30
            }),
        new JellyObstructionBase(25, <JellyObstructionModel>{
                "index": 25,
                "name": "Blubbury",
                "description": "All your Kaleidoscopes multiply surrounding Magnifiers and Monocles by +{% more than before",
                "bonusValue": 1
            }),
        new JellyObstructionBase(26, <JellyObstructionModel>{
                "index": 26,
                "name": "Pair",
                "description": "The first 10 upgrades in the Royal Armory are an extra {% cheaper",
                "bonusValue": 30
            }),
        new JellyObstructionBase(27, <JellyObstructionModel>{
                "index": 27,
                "name": "Mongo",
                "description": "All Summoning upgrades are {% cheaper",
                "bonusValue": 200
            }),
        new JellyObstructionBase(28, <JellyObstructionModel>{
                "index": 28,
                "name": "Strabbury",
                "description": "All earned Emperor Bonuses are }x bigger than before!",
                "bonusValue": 2
            }),
        new JellyObstructionBase(29, <JellyObstructionModel>{
                "index": 29,
                "name": "Cosmico",
                "description": "When getting a new Tiny Cog, there's a {% chance it'll be +1 Tier higher, up to T10.",
                "bonusValue": 20
            }),
        new JellyObstructionBase(30, <JellyObstructionModel>{
                "index": 30,
                "name": "Surrage",
                "description": "}x Class EXP gain",
                "bonusValue": 20
            }),
        new JellyObstructionBase(31, <JellyObstructionModel>{
                "index": 31,
                "name": "Big Nut",
                "description": "}x Grand Discovery Chance in Spelunking",
                "bonusValue": 25
            }),
        new JellyObstructionBase(32, <JellyObstructionModel>{
                "index": 32,
                "name": "Splega",
                "description": "All Royal Guardian Outposts in World 3 get +{ PTS",
                "bonusValue": 3
            }),
        new JellyObstructionBase(33, <JellyObstructionModel>{
                "index": 33,
                "name": "Onyx Apple",
                "description": "+{% higher Multi Meritocracy bonus",
                "bonusValue": 1
            }),
        new JellyObstructionBase(34, <JellyObstructionModel>{
                "index": 34,
                "name": "Rassbury",
                "description": "+{ more weekly Exotic Market purchases for Farming",
                "bonusValue": 1
            }),
        new JellyObstructionBase(35, <JellyObstructionModel>{
                "index": 35,
                "name": "Diamapair",
                "description": "+{ Regal Mob spawned from your Royal Guardian's 'Regal Intervention' effect!",
                "bonusValue": 1
            }),
        new JellyObstructionBase(36, <JellyObstructionModel>{
                "index": 36,
                "name": "Bowling Pin",
                "description": "All your Prisma Bubbles give a 0.01x higher bonus than before",
                "bonusValue": 1
            }),
        new JellyObstructionBase(37, <JellyObstructionModel>{
                "index": 37,
                "name": "Broken Ball",
                "description": "}x Total DMG",
                "bonusValue": 10
            }),
        new JellyObstructionBase(38, <JellyObstructionModel>{
                "index": 38,
                "name": "Sody Can",
                "description": "}x Spelunking POW",
                "bonusValue": 35
            }),
        new JellyObstructionBase(39, <JellyObstructionModel>{
                "index": 39,
                "name": "Balloon",
                "description": "}x Tartar Fish gains from Poppy",
                "bonusValue": 75
            }),
        new JellyObstructionBase(40, <JellyObstructionModel>{
                "index": 40,
                "name": "Arcade Ticket",
                "description": "Verminous rats in the Royal Castle have a +{% higher chance to drop Parchments of Enchantment",
                "bonusValue": 15
            }),
        new JellyObstructionBase(41, <JellyObstructionModel>{
                "index": 41,
                "name": "Proball",
                "description": "Your Royal Guardian's Support Camps provide +{% higher bonuses to connected Outposts",
                "bonusValue": 5
            }),
        new JellyObstructionBase(42, <JellyObstructionModel>{
                "index": 42,
                "name": "Empty Can",
                "description": "}x higher odds of getting new crowns for the Rat King in Gaming",
                "bonusValue": 25
            }),
        new JellyObstructionBase(43, <JellyObstructionModel>{
                "index": 43,
                "name": "Ceramic Ball",
                "description": "All Royal Guardian Outposts in World 4 get +{ PTS",
                "bonusValue": 3
            }),
        new JellyObstructionBase(44, <JellyObstructionModel>{
                "index": 44,
                "name": "Loveloon",
                "description": "+{ slot unlock to use right here in Jelly Operator",
                "bonusValue": 1
            }),
        new JellyObstructionBase(45, <JellyObstructionModel>{
                "index": 45,
                "name": "Mangled Ball",
                "description": "+{ Golden Tile for Mr. Minehead's Depth Charge game",
                "bonusValue": 1
            }),
        new JellyObstructionBase(46, <JellyObstructionModel>{
                "index": 46,
                "name": "Golden Ticket",
                "description": "}x multiplier to Research EXP gain",
                "bonusValue": 30
            }),
        new JellyObstructionBase(47, <JellyObstructionModel>{
                "index": 47,
                "name": "Angelpin",
                "description": "+{% Multi Page Drop Chance while Spelunking for all characters",
                "bonusValue": 6
            }),
        new JellyObstructionBase(48, <JellyObstructionModel>{
                "index": 48,
                "name": "Cool Gem",
                "description": "All Royal Guardian Outposts in World 5 get +{ PTS",
                "bonusValue": 3
            }),
        new JellyObstructionBase(49, <JellyObstructionModel>{
                "index": 49,
                "name": "Pointed Prism",
                "description": "+{ Max LV for all Divinity Blessings",
                "bonusValue": 25
            }),
        new JellyObstructionBase(50, <JellyObstructionModel>{
                "index": 50,
                "name": "Fancy Facet",
                "description": "All your Exalted Stamps give a 0.01x higher bonus than before",
                "bonusValue": 1
            }),
        new JellyObstructionBase(51, <JellyObstructionModel>{
                "index": 51,
                "name": "Smooth Stone",
                "description": "+{% total Golden Food bonus",
                "bonusValue": 200
            }),
        new JellyObstructionBase(52, <JellyObstructionModel>{
                "index": 52,
                "name": "Funky Rock",
                "description": "All Royal Guardian Outposts in World 6 get +{ PTS",
                "bonusValue": 3
            }),
        new JellyObstructionBase(53, <JellyObstructionModel>{
                "index": 53,
                "name": "Quirky Quartz",
                "description": "All Symbols in Sneaking have a }x higher chance of being successful",
                "bonusValue": 20
            }),
        new JellyObstructionBase(54, <JellyObstructionModel>{
                "index": 54,
                "name": "Janky Jewel",
                "description": "}x multiplier to Research EXP gain",
                "bonusValue": 60
            }),
        new JellyObstructionBase(55, <JellyObstructionModel>{"index": 55, "name": "Jaguar Shard", "description": "+{% Burger", "bonusValue": 5}),
        new JellyObstructionBase(56, <JellyObstructionModel>{
                "index": 56,
                "name": "Slick Sphere",
                "description": "+0.1% Chance for Royal Guardian 'Royal Intervention' effect to trigger",
                "bonusValue": 1
            }),
        new JellyObstructionBase(57, <JellyObstructionModel>{
                "index": 57,
                "name": "Barbed Ball",
                "description": "+{ Research Point",
                "bonusValue": 1
            }),
        new JellyObstructionBase(58, <JellyObstructionModel>{
                "index": 58,
                "name": "Jagged Mineral",
                "description": "Bubba now produces }x more Meat Slices",
                "bonusValue": 150
            }),
        new JellyObstructionBase(59, <JellyObstructionModel>{
                "index": 59,
                "name": "Conical Crystal",
                "description": "+{ Talent PTS specifically for the Royal Guardian Masterclass",
                "bonusValue": 20
            }),
        new JellyObstructionBase(60, <JellyObstructionModel>{
                "index": 60,
                "name": "Soldier Shiv",
                "description": "Ribbons that are Tier 20 or above now give a +{% higher multiplier to meal bonus!",
                "bonusValue": 5
            }),
        new JellyObstructionBase(61, <JellyObstructionModel>{
                "index": 61,
                "name": "Knightly Rapier",
                "description": "All Royal Guardian Outposts in World 7 get +{ PTS",
                "bonusValue": 3
            }),
        new JellyObstructionBase(62, <JellyObstructionModel>{
                "index": 62,
                "name": "Tribunal Helmet",
                "description": "}x Class EXP gain",
                "bonusValue": 25
            }),
        new JellyObstructionBase(63, <JellyObstructionModel>{
                "index": 63,
                "name": "Sharpened Axe",
                "description": "+{ Max LV for all Divinity Blessings",
                "bonusValue": 25
            }),
        new JellyObstructionBase(64, <JellyObstructionModel>{
                "index": 64,
                "name": "Hotforge Mace",
                "description": "Nothing yet...",
                "bonusValue": 1
            }),
        new JellyObstructionBase(65, <JellyObstructionModel>{
                "index": 65,
                "name": "Lord Shield",
                "description": "Nothing yet...",
                "bonusValue": 1
            }),
        new JellyObstructionBase(66, <JellyObstructionModel>{
                "index": 66,
                "name": "Molten Shiv",
                "description": "Nothing yet...",
                "bonusValue": 1
            }),
        new JellyObstructionBase(67, <JellyObstructionModel>{
                "index": 67,
                "name": "Damascus Axe",
                "description": "Nothing yet...",
                "bonusValue": 1
            }),
        new JellyObstructionBase(68, <JellyObstructionModel>{
                "index": 68,
                "name": "Coldsteel Mace",
                "description": "Nothing yet...",
                "bonusValue": 1
            }),
        new JellyObstructionBase(69, <JellyObstructionModel>{
                "index": 69,
                "name": "Radiant Shield",
                "description": "Nothing yet...",
                "bonusValue": 1
            }),
        new JellyObstructionBase(70, <JellyObstructionModel>{
                "index": 70,
                "name": "Eloquent Rapier",
                "description": "Nothing yet...",
                "bonusValue": 1
            }),
        new JellyObstructionBase(71, <JellyObstructionModel>{
                "index": 71,
                "name": "Centurion Helmet",
                "description": "Nothing yet...",
                "bonusValue": 1
            })    
]
}
