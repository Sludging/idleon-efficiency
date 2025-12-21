import { TomeModel } from '../model/tomeModel';
import { TomeScalingEnum } from '../enum/tomeScalingEnum';

export class TomeBase { constructor(public index: number, public data: TomeModel) { } }



export const initTomeRepo = () => {
    return [    
        new TomeBase(0, <TomeModel>{
                "name": "Statue Total LV",
                "keyQty": 2300,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 600,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(1, <TomeModel>{
                "name": "Cards Total LV",
                "keyQty": 1344,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 1000,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(2, <TomeModel>{
                "name": "Total Talent Max LV 膛 (Tap for more info)",
                "keyQty": 12000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 600,
                "decimalDisplay": undefined,
                "desc": "For each talent, the tome counts the highest Max LV out of all your players."
            }),
        new TomeBase(3, <TomeModel>{
                "name": "Unique Quests Completed 膛",
                "keyQty": 323,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 500,
                "decimalDisplay": undefined,
                "desc": "Doing the same quest on multiple players doesn't count for this."
            }),
        new TomeBase(4, <TomeModel>{
                "name": "Account LV",
                "keyQty": 7000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 1500,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(5, <TomeModel>{
                "name": "Total Tasks Completed",
                "keyQty": 470,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 470,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(6, <TomeModel>{
                "name": "Total Achievements Completed",
                "keyQty": 266,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 850,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(7, <TomeModel>{
                "name": "Most Money held in Storage",
                "keyQty": 25,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 500,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(8, <TomeModel>{
                "name": "Most Spore Caps held in Inventory at once",
                "keyQty": 9,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(9, <TomeModel>{
                "name": "Trophies Found",
                "keyQty": 22,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 700,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(10, <TomeModel>{
                "name": "Account Skills LV",
                "keyQty": 18000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 1200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(11, <TomeModel>{
                "name": "Best Spiketrap Surprise round",
                "keyQty": 13,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 100,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(12, <TomeModel>{
                "name": "Total AFK Hours claimed",
                "keyQty": 2000000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 350,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(13, <TomeModel>{
                "name": "DPS Record on Shimmer Island",
                "keyQty": 20,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 350,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(14, <TomeModel>{
                "name": "Star Talent Points Owned",
                "keyQty": 2500,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(15, <TomeModel>{
                "name": "Average kills for a Crystal Spawn 膛",
                "keyQty": 30,
                "scalingType": TomeScalingEnum.inverseDecay,
                "totalVal": 350,
                "decimalDisplay": undefined,
                "desc": "This tracks your Crystal Mob spawn chance! While this is capped at 1 in 100, you get BONUS Exp and Drops if your Crystal Spawn is better! For example, if your average kills is 20, you're getting 5x Exp and Drops from Crystals!"
            }),
        new TomeBase(16, <TomeModel>{
                "name": "Dungeon Rank",
                "keyQty": 30,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(17, <TomeModel>{
                "name": "Highest Drop Rarity Multi",
                "keyQty": 40,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 350,
                "decimalDisplay": 1,
                "desc": undefined
            }),
        new TomeBase(18, <TomeModel>{
                "name": "Constellations Completed",
                "keyQty": 49,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(19, <TomeModel>{
                "name": "Most DMG Dealt to Gravestone in a Weekly Battle 膛",
                "keyQty": 300000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": "Gravestone appears when you defeat all weekly bosses. This is the negative number shown after."
            }),
        new TomeBase(20, <TomeModel>{
                "name": "Unique Obols Found",
                "keyQty": 107,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(21, <TomeModel>{
                "name": "Total Bubble LV",
                "keyQty": 1000000,
                "scalingType": TomeScalingEnum.boundedDecay,
                "totalVal": 1750,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(22, <TomeModel>{
                "name": "Total Vial LV",
                "keyQty": 962,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 500,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(23, <TomeModel>{
                "name": "Total Sigil LV",
                "keyQty": 72,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(24, <TomeModel>{
                "name": "Jackpots Hit in Arcade",
                "keyQty": 1,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 50,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(25, <TomeModel>{
                "name": "Post Office PO Boxes Earned",
                "keyQty": 20000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(26, <TomeModel>{
                "name": "Highest Killroy Score on a Warrior",
                "keyQty": 3000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(27, <TomeModel>{
                "name": "Highest Killroy Score on an Archer",
                "keyQty": 3000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(28, <TomeModel>{
                "name": "Highest Killroy Score on a Mage",
                "keyQty": 3000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(29, <TomeModel>{
                "name": "Fastest Time to kill Chaotic Efaunt (in Seconds)",
                "keyQty": 10,
                "scalingType": TomeScalingEnum.inverseDecay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(30, <TomeModel>{
                "name": "Largest Oak Log Printer Sample",
                "keyQty": 9,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(31, <TomeModel>{
                "name": "Largest Copper Ore Printer Sample",
                "keyQty": 9,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(32, <TomeModel>{
                "name": "Largest Spore Cap Printer Sample",
                "keyQty": 9,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(33, <TomeModel>{
                "name": "Largest Goldfish Printer Sample",
                "keyQty": 9,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(34, <TomeModel>{
                "name": "Largest Fly Printer Sample",
                "keyQty": 9,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(35, <TomeModel>{
                "name": "Best Non Duplicate Goblin Gorefest Wave 膛",
                "keyQty": 120,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": "Non Duplicate means you can only place 1 of each Wizard Type, 2 or more invalidates the attempt."
            }),
        new TomeBase(36, <TomeModel>{
                "name": "Total Best Wave in Worship",
                "keyQty": 1000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(37, <TomeModel>{
                "name": "Total Digits of all Deathnote Kills 膛",
                "keyQty": 700,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 600,
                "decimalDisplay": undefined,
                "desc": "For example, 1,520 kills would be 4 digits, and this is for all monster types."
            }),
        new TomeBase(38, <TomeModel>{
                "name": "Equinox Clouds Completed",
                "keyQty": 31,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 750,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(39, <TomeModel>{
                "name": "Total Refinery Rank",
                "keyQty": 120,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 450,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(40, <TomeModel>{
                "name": "Total Atom Upgrade LV",
                "keyQty": 150,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(41, <TomeModel>{
                "name": "Total Construct Buildings LV",
                "keyQty": 4000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 900,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(42, <TomeModel>{
                "name": "Most Tottoise in Storage 膛",
                "keyQty": 5,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 150,
                "decimalDisplay": undefined,
                "desc": "Tottoise is the 11th Shiny Critter unlocked from the Jade Emporium in World 6"
            }),
        new TomeBase(43, <TomeModel>{
                "name": "Most Greenstacks in Storage 膛",
                "keyQty": 150,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 600,
                "decimalDisplay": undefined,
                "desc": "Greenstack is when you have 10,000,000 or more of a single item in your Storage Chest."
            }),
        new TomeBase(44, <TomeModel>{
                "name": "Rift Levels Completed",
                "keyQty": 49,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 500,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(45, <TomeModel>{
                "name": "Highest Power Pet",
                "keyQty": 5,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 150,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(46, <TomeModel>{
                "name": "Fastest Time reaching Round 100 Arena (in Seconds)",
                "keyQty": 50,
                "scalingType": TomeScalingEnum.inverseDecay,
                "totalVal": 180,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(47, <TomeModel>{
                "name": "Total Kitchen Upgrade LV",
                "keyQty": 8000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(48, <TomeModel>{
                "name": "Total Shiny Pet LV",
                "keyQty": 750,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(49, <TomeModel>{
                "name": "Total Cooking Meals LV",
                "keyQty": 5400,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 750,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(50, <TomeModel>{
                "name": "Total Pet Breedability LV",
                "keyQty": 500,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(51, <TomeModel>{
                "name": "Total Lab Chips Owned",
                "keyQty": 100,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 150,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(52, <TomeModel>{
                "name": "Total Colosseum Score",
                "keyQty": 10,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(53, <TomeModel>{
                "name": "Most Giants Killed in a Single Week",
                "keyQty": 25,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(54, <TomeModel>{
                "name": "Total Onyx Statues",
                "keyQty": 28,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 450,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(55, <TomeModel>{
                "name": "Fastest Time to Kill 200 Tremor Wurms (in Seconds)",
                "keyQty": 30,
                "scalingType": TomeScalingEnum.inverseDecay,
                "totalVal": 150,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(56, <TomeModel>{
                "name": "Total Boat Upgrade LV",
                "keyQty": 10000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(57, <TomeModel>{
                "name": "God Rank in Divinity",
                "keyQty": 10,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(58, <TomeModel>{
                "name": "Total Gaming Plants Evolved",
                "keyQty": 100000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(59, <TomeModel>{
                "name": "Total Artifacts Found 膛",
                "keyQty": 185,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 1000,
                "decimalDisplay": undefined,
                "desc": "Rarer versions of an artifact count for more, so Ancient would count as 2 Artifacts."
            }),
        new TomeBase(60, <TomeModel>{
                "name": "Gold Bar Sailing Treasure Owned",
                "keyQty": 14,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(61, <TomeModel>{
                "name": "Highest Captain LV",
                "keyQty": 25,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 150,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(62, <TomeModel>{
                "name": "Highest Immortal Snail LV",
                "keyQty": 50,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(63, <TomeModel>{
                "name": "Best Gold Nugget",
                "keyQty": 9,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(64, <TomeModel>{
                "name": "Items Found",
                "keyQty": 1800,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 1300,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(65, <TomeModel>{
                "name": "Most Gaming Bits Owned",
                "keyQty": 80,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(66, <TomeModel>{
                "name": "Highest Crop OG",
                "keyQty": 6,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(67, <TomeModel>{
                "name": "Total Crops Discovered",
                "keyQty": 120,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 350,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(68, <TomeModel>{
                "name": "Total Golden Food Beanstacks 膛",
                "keyQty": 30,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": "Supersized Gold Food Beanstacks count as 2 Beanstacks!"
            }),
        new TomeBase(69, <TomeModel>{
                "name": "Total Summoning Upgrades LV",
                "keyQty": 10000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(70, <TomeModel>{
                "name": "Total Career Summoning Wins 膛",
                "keyQty": 160,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 500,
                "decimalDisplay": undefined,
                "desc": "Rack up those wins! Endless Summoning wins count for this too, of course!"
            }),
        new TomeBase(71, <TomeModel>{
                "name": "Ninja Floors Unlocked",
                "keyQty": 12,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(72, <TomeModel>{
                "name": "Familiars Owned in Summoning 膛",
                "keyQty": 600,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 150,
                "decimalDisplay": undefined,
                "desc": "Measured in terms of Grey Slime, so a Vrumbi would count as 3, Bloomy as 12, and so on."
            }),
        new TomeBase(73, <TomeModel>{
                "name": "Jade Emporium Upgrades Purchased",
                "keyQty": 50,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 700,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(74, <TomeModel>{
                "name": "Total Minigame Highscore 膛",
                "keyQty": 450,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 100,
                "decimalDisplay": undefined,
                "desc": "This is Choppin game, Mining Cart game, Fishing game, Catching Hoops game, and Trapping game"
            }),
        new TomeBase(75, <TomeModel>{
                "name": "Total Prayer Upgrade LV",
                "keyQty": 673,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(76, <TomeModel>{
                "name": "Total Land Rank 膛",
                "keyQty": 5000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": "Land Ranks are from the Farming skill, in World 6. Unlocked from the Night Market!"
            }),
        new TomeBase(77, <TomeModel>{
                "name": "Largest Magic Bean Trade",
                "keyQty": 1000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(78, <TomeModel>{
                "name": "Most Balls earned from LBoFaF 膛",
                "keyQty": 1000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 150,
                "decimalDisplay": undefined,
                "desc": "LBoFaF means Lava's Ballpit of Fire and Fury, the bonus round in Arcade"
            }),
        new TomeBase(79, <TomeModel>{
                "name": "Total Arcade Gold Ball Shop Upgrade LV",
                "keyQty": 3800,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 800,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(80, <TomeModel>{
                "name": "Vault Upgrade bonus LV",
                "keyQty": 500,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 500,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(81, <TomeModel>{
                "name": "Total Gambit Time (in Seconds) 膛",
                "keyQty": 3600,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": "Gambit is the 14th Cavern in The Hole."
            }),
        new TomeBase(82, <TomeModel>{
                "name": "Total Digits of all Cavern Resources 膛",
                "keyQty": 500,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 750,
                "decimalDisplay": undefined,
                "desc": "For example, if you had 1273 gravel and 422 gold dust, thats 7 Digits. If you then got 23 quaver notes from harp, thats another 2 digits, making your total 9 Digits."
            }),
        new TomeBase(83, <TomeModel>{
                "name": "Total LV of Cavern Villagers",
                "keyQty": 200,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 350,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(84, <TomeModel>{
                "name": "Megafeathers Earned from Orion",
                "keyQty": 12,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(85, <TomeModel>{
                "name": "Megafish Earned from Poppy",
                "keyQty": 12,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(86, <TomeModel>{
                "name": "Best Bravery Monument Round 膛",
                "keyQty": 50,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": "Bravery Monument is the 4th Cavern in The Hole. The Hole is found in World 5."
            }),
        new TomeBase(87, <TomeModel>{
                "name": "Best Justice Monument Round 膛",
                "keyQty": 200,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": "Justice Monument is the 10th Cavern in The Hole. 'Best Round' here means your highest Court Case reached in a run."
            }),
        new TomeBase(88, <TomeModel>{
                "name": "Best Wisdom Monument Round 膛",
                "keyQty": 18,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": "Wisdom Monument is the 13th Cavern in The Hole."
            }),
        new TomeBase(89, <TomeModel>{
                "name": "Best Deathbringer Max Damage in Wraith Mode 膛",
                "keyQty": 10,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": "Deathbringer is the Blood Berserker's Master Class, given by Masterius NPC in World 6. You need to open your grimoire to register damage."
            }),
        new TomeBase(90, <TomeModel>{
                "name": "Best Dawg Den score 膛",
                "keyQty": 7,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": "The Dawg Den is the 3rd Cavern in The Hole. The Hole is found in World 5."
            }),
        new TomeBase(91, <TomeModel>{
                "name": "Total Resource Layers Destroyed 膛",
                "keyQty": 150,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 350,
                "decimalDisplay": undefined,
                "desc": "Destroying Layers includes the following caverns... Motherlode, Eternal Hive, and Evertree Cavern, with more added later!"
            }),
        new TomeBase(92, <TomeModel>{
                "name": "Total Opals Found",
                "keyQty": 500,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(93, <TomeModel>{
                "name": "Best Pure Memory Round Reached 膛",
                "keyQty": 13,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 50,
                "decimalDisplay": undefined,
                "desc": "Yea nah, I aint snitchin'. This is a SECRET mode."
            }),
        new TomeBase(94, <TomeModel>{
                "name": "Spirited Valley Emperor Boss Kills 膛",
                "keyQty": 100,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": "This counts your current Showdown for the Emperor boss in World 6, not the total amount of kills."
            }),
        new TomeBase(95, <TomeModel>{
                "name": "Total Summoning Boss Stone victories 膛",
                "keyQty": 28,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": "This is the TOTAL wins you have against all Summoning Bosses combined. These are the bossfights from the stones, like the one next to Tribal Shaman NPC!"
            }),
        new TomeBase(96, <TomeModel>{
                "name": "Total Coral Reef upgrades 膛",
                "keyQty": 37,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": "The Coral Reef is a feature in World 7 town, unlocked by rescuing Humble Hugh's missing Fishies!"
            }),
        new TomeBase(97, <TomeModel>{
                "name": "Deepest Depth reached in a single Delve 膛",
                "keyQty": 100,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": "This is for the Spelunking skill, it's just the deepest you've gone in a single attempt."
            }),
        new TomeBase(98, <TomeModel>{
                "name": "Total Ninja Knowledge Upgrades LV 膛",
                "keyQty": 5000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 500,
                "decimalDisplay": undefined,
                "desc": "Ninja Knowledge is the upgrade tree accessed within Sneaking. This includes mini knowledge upgrades, but you'll unlock those later..."
            }),
        new TomeBase(99, <TomeModel>{
                "name": "Best Windwalker Max Damage in Tempest Mode 膛",
                "keyQty": 10,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": "Windwalker is the Beast Masters's Master Class, given by Masterius NPC in World 6. You need to open your Compass to register damage."
            }),
        new TomeBase(100, <TomeModel>{
                "name": "Best Arcane Cultist Max Damage in Arcanist Mode 膛",
                "keyQty": 10,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 400,
                "decimalDisplay": undefined,
                "desc": "Arcane Cultist is the Bubonic Conjuror's Master Class, given by Masterius NPC in World 6. You need to open your Tesseract to register damage."
            }),
        new TomeBase(101, <TomeModel>{
                "name": "Biggest Haul in a single Delve 膛",
                "keyQty": 25,
                "scalingType": TomeScalingEnum.decayLog,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": "This is for the Spelunking skill, it's just the most amount of Amber you've gotten in a single attempt."
            }),
        new TomeBase(102, <TomeModel>{
                "name": "Total Spelunk Shop Upgrades LV",
                "keyQty": 2000,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 500,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(103, <TomeModel>{
                "name": "Total Spelunk Discoveries made 膛",
                "keyQty": 76,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 300,
                "decimalDisplay": undefined,
                "desc": "A Discovery is when you destroy a rock for the first time in a cave. It's basically how many unique 'things' you've encountered while spelunking!"
            }),
        new TomeBase(104, <TomeModel>{
                "name": "Highest leveled Spelunker 膛",
                "keyQty": 200,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 200,
                "decimalDisplay": undefined,
                "desc": "In other words, this is the Spelunking LV of the highest leveled spelunker in your account."
            }),
        new TomeBase(105, <TomeModel>{
                "name": "Lava Dev Streams watched 膛",
                "keyQty": 10,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": "Hey this one's about me! In order to get credit for watching one of my streams, you need to get a gem drop from me while I'm live on twitch at     Twitch.tv/ lava贫flame2"
            }),
        new TomeBase(106, <TomeModel>{
                "name": "Nametags Found 膛",
                "keyQty": 20,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 700,
                "decimalDisplay": undefined,
                "desc": "This only counts the amount of unique nametags you found... but don't throw away your duplicate nametags! You'll need them for The Gallery in World 7!"
            }),
        new TomeBase(107, <TomeModel>{
                "name": "Megaflesh Earned from Bubba",
                "keyQty": 12,
                "scalingType": TomeScalingEnum.decay,
                "totalVal": 250,
                "decimalDisplay": undefined,
                "desc": undefined
            }),
        new TomeBase(108, <TomeModel>{
                "name": "Premium Hats Found 膛",
                "keyQty": 75,
                "scalingType": TomeScalingEnum.linearToMax,
                "totalVal": 700,
                "decimalDisplay": undefined,
                "desc": "This metric is based on the total hats you've deposited to the Hat Rack in World 3!"
            })    
]
}
