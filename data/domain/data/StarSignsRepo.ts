import { StarSignModel } from '../model/starSignModel';

export class StarSignBase { constructor(public index: number, public data: StarSignModel) { } }



export const initStarSignsRepo = () => {
    return [    
        new StarSignBase(0, <StarSignModel>{
                "name": "The Buff Guy",
                "text": "+1% Total Damage +3 STR ",
                "x": 48,
                "y": 82,
                "prevReq": 0,
                "cost": 0
            }),
        new StarSignBase(1, <StarSignModel>{
                "name": "Flexo Bendo",
                "text": "+2% Movement Speed +3 AGI ",
                "x": 177,
                "y": 114,
                "prevReq": 0,
                "cost": 0
            }),
        new StarSignBase(2, <StarSignModel>{
                "name": "The Book Worm",
                "text": "+1% Class EXP Gain +3 WIS ",
                "x": 56,
                "y": 162,
                "prevReq": 0,
                "cost": 0
            }),
        new StarSignBase(3, <StarSignModel>{
                "name": "The Fuzzy Dice",
                "text": "+3 Talent Points +3 LUK ",
                "x": 135,
                "y": 161,
                "prevReq": 0,
                "cost": 0
            }),
        new StarSignBase(4, <StarSignModel>{
                "name": "Dwarfo Beardus",
                "text": "+5% Mining Efficency +20% Multi-Ore Chance ",
                "x": 289,
                "y": 155,
                "prevReq": 0,
                "cost": 2
            }),
        new StarSignBase(5, <StarSignModel>{
                "name": "Hipster Logger",
                "text": "+5% Chop Efficiency +20% Multi-Log Chance ",
                "x": 413,
                "y": 104,
                "prevReq": 4,
                "cost": 2
            }),
        new StarSignBase(6, <StarSignModel>{
                "name": "Pie Seas",
                "text": "+5% Fishin Efficency +20% Multi-Fish Odds ",
                "x": 386,
                "y": 185,
                "prevReq": 5,
                "cost": 2
            }),
        new StarSignBase(7, <StarSignModel>{
                "name": "Shoe Fly",
                "text": "+5% Catch Efficiency +20% Multi-Bug Chance ",
                "x": 465,
                "y": 160,
                "prevReq": 5,
                "cost": 2
            }),
        new StarSignBase(8, <StarSignModel>{
                "name": "Blue Hedgehog",
                "text": "+4% Movement Speed +0.0001% Ring Drop ",
                "x": 749,
                "y": 302,
                "prevReq": 17,
                "cost": 3
            }),
        new StarSignBase(9, <StarSignModel>{
                "name": "Gum Drop",
                "text": "+15% to get a Time Candy when claiming 8+ Hour AFK gains",
                "x": 556,
                "y": 379,
                "prevReq": 22,
                "cost": 2
            }),
        new StarSignBase(10, <StarSignModel>{
                "name": "Activelius",
                "text": "+15% Class EXP when fighting actively ",
                "x": 642,
                "y": 276,
                "prevReq": 21,
                "cost": 2
            }),
        new StarSignBase(11, <StarSignModel>{
                "name": "Pack Mule",
                "text": "+10% Carry Cap  ",
                "x": 539,
                "y": 132,
                "prevReq": 5,
                "cost": 2
            }),
        new StarSignBase(12, <StarSignModel>{
                "name": "Ned Kelly",
                "text": "+6% Defence +2 Weapon Power ",
                "x": 873,
                "y": 376,
                "prevReq": 17,
                "cost": 2
            }),
        new StarSignBase(13, <StarSignModel>{
                "name": "Robinhood",
                "text": "+4% Accuracy +2% Movement Speed +1 Cant Trade GME",
                "x": 867,
                "y": 266,
                "prevReq": 16,
                "cost": 2
            }),
        new StarSignBase(14, <StarSignModel>{
                "name": "Pirate Booty",
                "text": "+5% Drop Rate  ",
                "x": 655,
                "y": 190,
                "prevReq": 9,
                "cost": 2
            }),
        new StarSignBase(15, <StarSignModel>{
                "name": "Muscle Man",
                "text": "+8 STR  ",
                "x": 652,
                "y": 72,
                "prevReq": 11,
                "cost": 1
            }),
        new StarSignBase(16, <StarSignModel>{
                "name": "Fast Frog",
                "text": "+8 AGI  ",
                "x": 746,
                "y": 104,
                "prevReq": 11,
                "cost": 1
            }),
        new StarSignBase(17, <StarSignModel>{
                "name": "Smart Stooge",
                "text": "+8 WIS  ",
                "x": 835,
                "y": 69,
                "prevReq": 11,
                "cost": 1
            }),
        new StarSignBase(18, <StarSignModel>{
                "name": "Lucky Larry",
                "text": "+8 LUK  ",
                "x": 877,
                "y": 143,
                "prevReq": 11,
                "cost": 1
            }),
        new StarSignBase(19, <StarSignModel>{
                "name": "Silly Snoozer",
                "text": "+2% Fight AFK Gain  ",
                "x": 371,
                "y": 362,
                "prevReq": 26,
                "cost": 3
            }),
        new StarSignBase(20, <StarSignModel>{
                "name": "The Big Comatose",
                "text": "+2% Skill AFK Gain  ",
                "x": 375,
                "y": 243,
                "prevReq": 25,
                "cost": 3
            }),
        new StarSignBase(21, <StarSignModel>{
                "name": "Miniature Game",
                "text": "+30% minigame reward  ",
                "x": 322,
                "y": 76,
                "prevReq": 7,
                "cost": 2
            }),
        new StarSignBase(22, <StarSignModel>{
                "name": "Mount Eaterest",
                "text": "+10% chance to not consume food +15% All Food Effect",
                "x": 498,
                "y": 288,
                "prevReq": 22,
                "cost": 2
            }),
        new StarSignBase(23, <StarSignModel>{
                "name": "Bob Build Guy",
                "text": "+10% Speed in Town Skills ",
                "x": 563,
                "y": 200,
                "prevReq": 24,
                "cost": 3
            }),
        new StarSignBase(24, <StarSignModel>{
                "name": "The Big Brain",
                "text": "+3% Class EXP gain  ",
                "x": 146,
                "y": 374,
                "prevReq": 28,
                "cost": 3
            }),
        new StarSignBase(25, <StarSignModel>{
                "name": "The OG Skiller",
                "text": "+5% Carry Cap +1% Skill AFK gain +2% All Skill Prowess",
                "x": 163,
                "y": 326,
                "prevReq": 30,
                "cost": 4
            }),
        new StarSignBase(26, <StarSignModel>{
                "name": "Grim Reaper",
                "text": "+2% Mob Respawn rate  ",
                "x": 261,
                "y": 276,
                "prevReq": 28,
                "cost": 4
            }),
        new StarSignBase(27, <StarSignModel>{
                "name": "The Fallen Titan",
                "text": "+3% Boss Damage +4% Crit Chance ",
                "x": 780,
                "y": 248,
                "prevReq": 19,
                "cost": 2
            }),
        new StarSignBase(28, <StarSignModel>{
                "name": "The Forsaken",
                "text": "-80% Total HP -50% Defence +6% Fight AFK Gain",
                "x": 223,
                "y": 200,
                "prevReq": 30,
                "cost": 4
            }),
        new StarSignBase(29, <StarSignModel>{
                "name": "Mr No Sleep",
                "text": "-6% AFK Gain +30% Carry Cap ",
                "x": 67,
                "y": 266,
                "prevReq": 32,
                "cost": 4
            }),
        new StarSignBase(30, <StarSignModel>{
                "name": "Sir Savvy",
                "text": "+3% Skill EXP gain  ",
                "x": 441,
                "y": 342,
                "prevReq": 26,
                "cost": 3
            }),
        new StarSignBase(31, <StarSignModel>{
                "name": "All Rounder",
                "text": "+4 All Stats  ",
                "x": 738,
                "y": 178,
                "prevReq": 10,
                "cost": 2
            }),
        new StarSignBase(32, <StarSignModel>{
                "name": "Fatty Doodoo",
                "text": "-3% Movement Speed +5% Defence +2% Total Damage",
                "x": 818,
                "y": 206,
                "prevReq": 11,
                "cost": 2
            }),
        new StarSignBase(33, <StarSignModel>{
                "name": "Chronus Cosmos",
                "text": "All characters can now align with 2 Star Signs at once",
                "x": 707,
                "y": 356,
                "prevReq": 19,
                "cost": 3
            }),
        new StarSignBase(34, <StarSignModel>{
                "name": "All Rounderi",
                "text": "+1% All Stat i.e. STR/AGI/WIS/LUK ",
                "x": 445,
                "y": 384,
                "prevReq": 0,
                "cost": 1
            }),
        new StarSignBase(35, <StarSignModel>{
                "name": "Centaurii",
                "text": "+10% Accuracy  ",
                "x": 258,
                "y": 374,
                "prevReq": 34,
                "cost": 1
            }),
        new StarSignBase(36, <StarSignModel>{
                "name": "Murmollio",
                "text": "+10% Defence  ",
                "x": 129,
                "y": 307,
                "prevReq": 35,
                "cost": 2
            }),
        new StarSignBase(37, <StarSignModel>{
                "name": "Strandissi",
                "text": "+3% STR  ",
                "x": 71,
                "y": 220,
                "prevReq": 36,
                "cost": 2
            }),
        new StarSignBase(38, <StarSignModel>{
                "name": "Agitagi",
                "text": "+3% AGI  ",
                "x": 50,
                "y": 93,
                "prevReq": 37,
                "cost": 2
            }),
        new StarSignBase(39, <StarSignModel>{
                "name": "Wispommo",
                "text": "+3% WIS  ",
                "x": 97,
                "y": 136,
                "prevReq": 37,
                "cost": 2
            }),
        new StarSignBase(40, <StarSignModel>{
                "name": "Lukiris",
                "text": "+3% LUK  ",
                "x": 121,
                "y": 89,
                "prevReq": 39,
                "cost": 2
            }),
        new StarSignBase(41, <StarSignModel>{
                "name": "Pokaminni",
                "text": "+15% Card Drop (Outside of Dungeons) ",
                "x": 213,
                "y": 82,
                "prevReq": 39,
                "cost": 2
            }),
        new StarSignBase(42, <StarSignModel>{
                "name": "Gor Bowzor",
                "text": "+12% Boss Damage  ",
                "x": 582,
                "y": 58,
                "prevReq": 41,
                "cost": 2
            }),
        new StarSignBase(43, <StarSignModel>{
                "name": "Hydron Cosmos",
                "text": "All characters can now align with 3 Star Signs at once",
                "x": 748,
                "y": 70,
                "prevReq": 42,
                "cost": 2
            }),
        new StarSignBase(44, <StarSignModel>{
                "name": "Trapezoidburg",
                "text": "+20% Critters/Trap +10% Trap Efficiency ",
                "x": 868,
                "y": 94,
                "prevReq": 43,
                "cost": 3
            }),
        new StarSignBase(45, <StarSignModel>{
                "name": "Sawsaw Salala",
                "text": "+25% Construct Exp  ",
                "x": 818,
                "y": 140,
                "prevReq": 43,
                "cost": 3
            }),
        new StarSignBase(46, <StarSignModel>{
                "name": "Preys Bea",
                "text": "+15% Worship Efficiency +15% Worship EXP ",
                "x": 879,
                "y": 190,
                "prevReq": 45,
                "cost": 3
            }),
        new StarSignBase(47, <StarSignModel>{
                "name": "Cullingo",
                "text": "+15% Total Multikill  ",
                "x": 835,
                "y": 231,
                "prevReq": 45,
                "cost": 3
            }),
        new StarSignBase(48, <StarSignModel>{
                "name": "Gum Drop Major",
                "text": "+40% to get a Time Candy when claiming 40+ Hour AFK gains",
                "x": 834,
                "y": 367,
                "prevReq": 47,
                "cost": 3
            }),
        new StarSignBase(49, <StarSignModel>{
                "name": "Grim Reaper Major",
                "text": "+4% Mob Respawn rate (If Lv&60) ",
                "x": 805,
                "y": 322,
                "prevReq": 47,
                "cost": 3
            }),
        new StarSignBase(50, <StarSignModel>{
                "name": "Sir Savvy Major",
                "text": "+6% Skill EXP gain (If Lv&70) ",
                "x": 709,
                "y": 343,
                "prevReq": 49,
                "cost": 4
            }),
        new StarSignBase(51, <StarSignModel>{
                "name": "The Bulwark",
                "text": "+20% Total Damage -12% Movement Speed ",
                "x": 529,
                "y": 334,
                "prevReq": 50,
                "cost": 4
            }),
        new StarSignBase(52, <StarSignModel>{
                "name": "Big Brain Major",
                "text": "+6% Class EXP gain (If Lv&80) ",
                "x": 287,
                "y": 286,
                "prevReq": 51,
                "cost": 4
            }),
        new StarSignBase(53, <StarSignModel>{
                "name": "The Fiesty",
                "text": "+6% Total Damage  ",
                "x": 217,
                "y": 238,
                "prevReq": 52,
                "cost": 5
            }),
        new StarSignBase(54, <StarSignModel>{
                "name": "The Overachiever",
                "text": "+15% Total Damage -7% Fight AFK Gain ",
                "x": 159,
                "y": 177,
                "prevReq": 53,
                "cost": 5
            }),
        new StarSignBase(55, <StarSignModel>{
                "name": "Comatose Major",
                "text": "+4% Skill AFK Gain (If Lv&90) ",
                "x": 212,
                "y": 155,
                "prevReq": 53,
                "cost": 5
            }),
        new StarSignBase(56, <StarSignModel>{
                "name": "S. Snoozer Major",
                "text": "+4% Fight AFK Gain (If Lv&100) ",
                "x": 347,
                "y": 105,
                "prevReq": 55,
                "cost": 5
            }),
        new StarSignBase(57, <StarSignModel>{
                "name": "Breedabilli",
                "text": "+35% Breedable Spd +15% Shiny Pet LV spd ",
                "x": 623,
                "y": 135,
                "prevReq": 56,
                "cost": 4
            }),
        new StarSignBase(58, <StarSignModel>{
                "name": "Gordonius Major",
                "text": "+15% Cooking SPD (Multiplicative!) ",
                "x": 721,
                "y": 214,
                "prevReq": 57,
                "cost": 4
            }),
        new StarSignBase(59, <StarSignModel>{
                "name": "Power Bowower",
                "text": "+30% Pet DMG for Breeding Skill ",
                "x": 748,
                "y": 271,
                "prevReq": 58,
                "cost": 4
            }),
        new StarSignBase(60, <StarSignModel>{
                "name": "Scienscion",
                "text": "+20% Lab EXP Gain  ",
                "x": 685,
                "y": 297,
                "prevReq": 58,
                "cost": 4
            }),
        new StarSignBase(61, <StarSignModel>{
                "name": "Artifosho",
                "text": "+15% Artifact Find Chance (Multiplicative)",
                "x": 523,
                "y": 285,
                "prevReq": 60,
                "cost": 4
            }),
        new StarSignBase(62, <StarSignModel>{
                "name": "Divividov",
                "text": "+30% Divinity EXP  ",
                "x": 349,
                "y": 208,
                "prevReq": 61,
                "cost": 4
            }),
        new StarSignBase(63, <StarSignModel>{
                "name": "C. Shanti Minor",
                "text": "+20% Sailing SPD  ",
                "x": 443,
                "y": 173,
                "prevReq": 62,
                "cost": 4
            }),
        new StarSignBase(64, <StarSignModel>{
                "name": "Muscle Magnus",
                "text": "+50 STR  ",
                "x": 459,
                "y": 392,
                "prevReq": 0,
                "cost": 1
            }),
        new StarSignBase(65, <StarSignModel>{
                "name": "Cropiovo Minor",
                "text": "+3% Crop Evo chance per Farming LV ",
                "x": 347,
                "y": 338,
                "prevReq": 64,
                "cost": 2
            }),
        new StarSignBase(66, <StarSignModel>{
                "name": "Fabarmi",
                "text": "+20% Farming EXP  ",
                "x": 308,
                "y": 364,
                "prevReq": 65,
                "cost": 2
            }),
        new StarSignBase(67, <StarSignModel>{
                "name": "O.G. Signalais",
                "text": "+15% OG Chance  ",
                "x": 183,
                "y": 353,
                "prevReq": 66,
                "cost": 2
            }),
        new StarSignBase(68, <StarSignModel>{
                "name": "Lightspeed Frog",
                "text": "+50 AGI  ",
                "x": 127,
                "y": 292,
                "prevReq": 67,
                "cost": 3
            }),
        new StarSignBase(69, <StarSignModel>{
                "name": "Beanbie Major",
                "text": "+20% Golden Food bonuses ",
                "x": 145,
                "y": 233,
                "prevReq": 68,
                "cost": 3
            }),
        new StarSignBase(70, <StarSignModel>{
                "name": "Damarian Major",
                "text": "+25% Total Damage  ",
                "x": 26,
                "y": 180,
                "prevReq": 69,
                "cost": 4
            }),
        new StarSignBase(71, <StarSignModel>{
                "name": "Lotto Larrinald",
                "text": "+50 LUK  ",
                "x": 109,
                "y": 107,
                "prevReq": 70,
                "cost": 5
            }),
        new StarSignBase(72, <StarSignModel>{
                "name": "Intellostooge",
                "text": "+50 WIS  ",
                "x": 190,
                "y": 194,
                "prevReq": 69,
                "cost": 4
            }),
        new StarSignBase(73, <StarSignModel>{
                "name": "S. Tealio",
                "text": "+12% Ninja Twin Stealth ",
                "x": 250,
                "y": 322,
                "prevReq": 65,
                "cost": 3
            }),
        new StarSignBase(74, <StarSignModel>{
                "name": "Sneekee E. X.",
                "text": "+15% Sneaking EXP  ",
                "x": 293,
                "y": 269,
                "prevReq": 73,
                "cost": 3
            }),
        new StarSignBase(75, <StarSignModel>{
                "name": "Jadaciussi",
                "text": "+10% Jade Gain (Multiplicative!) ",
                "x": 385,
                "y": 233,
                "prevReq": 74,
                "cost": 3
            }),
        new StarSignBase(76, <StarSignModel>{
                "name": "Druipi Major",
                "text": "+12% Drop Rarity  ",
                "x": 283,
                "y": 207,
                "prevReq": 75,
                "cost": 4
            }),
        new StarSignBase(77, <StarSignModel>{
                "name": "Sumo Magno",
                "text": "+20% Summoning EXP  ",
                "x": 227,
                "y": 137,
                "prevReq": 76,
                "cost": 4
            }),
        new StarSignBase(78, <StarSignModel>{
                "name": "Killian Maximus",
                "text": "+3% Multikill Per Tier  ",
                "x": 305,
                "y": 87,
                "prevReq": 77,
                "cost": 5
            }),
        new StarSignBase(79, <StarSignModel>{
                "name": "Seraph Cosmos",
                "text": "All characters now get 1.10x Star Sign bonuses per 20 Summoning LV",
                "x": 474,
                "y": 188,
                "prevReq": 75,
                "cost": 11
            }),
        new StarSignBase(80, <StarSignModel>{
                "name": "Glimmer of Beyond",
                "text": "This star sign is unreachable for now... ",
                "x": 679,
                "y": 344,
                "prevReq": 64,
                "cost": 999
            }),
        new StarSignBase(81, <StarSignModel>{
                "name": "Fillerz48",
                "text": "  ",
                "x": 859,
                "y": 386,
                "prevReq": 80,
                "cost": 999
            }),
        new StarSignBase(82, <StarSignModel>{
                "name": "Fillerz49",
                "text": "  ",
                "x": 891,
                "y": 290,
                "prevReq": 81,
                "cost": 999
            }),
        new StarSignBase(83, <StarSignModel>{
                "name": "Fillerz50",
                "text": "  ",
                "x": 813,
                "y": 321,
                "prevReq": 84,
                "cost": 999
            }),
        new StarSignBase(84, <StarSignModel>{
                "name": "Fillerz51",
                "text": "  ",
                "x": 749,
                "y": 276,
                "prevReq": 80,
                "cost": 999
            }),
        new StarSignBase(85, <StarSignModel>{
                "name": "Fillerz52",
                "text": "  ",
                "x": 855,
                "y": 234,
                "prevReq": 84,
                "cost": 999
            }),
        new StarSignBase(86, <StarSignModel>{
                "name": "Fillerz53",
                "text": "  ",
                "x": 898,
                "y": 133,
                "prevReq": 85,
                "cost": 999
            }),
        new StarSignBase(87, <StarSignModel>{
                "name": "Fillerz54",
                "text": "  ",
                "x": 879,
                "y": 77,
                "prevReq": 86,
                "cost": 999
            }),
        new StarSignBase(88, <StarSignModel>{
                "name": "Fillerz55",
                "text": "  ",
                "x": 813,
                "y": 108,
                "prevReq": 85,
                "cost": 999
            }),
        new StarSignBase(89, <StarSignModel>{
                "name": "Fillerz56",
                "text": "  ",
                "x": 751,
                "y": 79,
                "prevReq": 88,
                "cost": 999
            }),
        new StarSignBase(90, <StarSignModel>{
                "name": "Fillerz57",
                "text": "  ",
                "x": 709,
                "y": 160,
                "prevReq": 88,
                "cost": 999
            }),
        new StarSignBase(91, <StarSignModel>{
                "name": "Fillerz58",
                "text": "  ",
                "x": 657,
                "y": 104,
                "prevReq": 90,
                "cost": 999
            }),
        new StarSignBase(92, <StarSignModel>{
                "name": "Fillerz59",
                "text": "  ",
                "x": 701,
                "y": 235,
                "prevReq": 90,
                "cost": 999
            }),
        new StarSignBase(93, <StarSignModel>{
                "name": "Fillerz32",
                "text": "  ",
                "x": 618,
                "y": 247,
                "prevReq": 92,
                "cost": 999
            })    
]
}
