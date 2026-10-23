import { LegendTalentModel } from '../model/legendTalentModel';

export class LegendTalentBase { constructor(public index: number, public data: LegendTalentModel) { } }



export const initLegendTalentsRepo = () => {
    return [    
        new LegendTalentBase(0, <LegendTalentModel>{
                "talentIndex": 0,
                "name": "Coral Restoration",
                "maxLevel": 2,
                "bonusValue": 30,
                "x3": "filler",
                "bonus": "+{% Daily Coral gain",
                "description": "+{% more Daily Coral gained each and every day!"
            }),
        new LegendTalentBase(1, <LegendTalentModel>{
                "talentIndex": 1,
                "name": "Greatest Drop Party Ever",
                "maxLevel": 4,
                "bonusValue": 500,
                "x3": "filler",
                "bonus": "+{% Drop Rate",
                "description": "+{% Drop Rate for all players! @ This bonus is additive, not a multiplier."
            }),
        new LegendTalentBase(2, <LegendTalentModel>{
                "talentIndex": 2,
                "name": "Double Aint Enough",
                "maxLevel": 3,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "$x Statue and Gold Food drops",
                "description": "''2x Statue and Gold Food drops'' now drop in bundles of $x instead!"
            }),
        new LegendTalentBase(3, <LegendTalentModel>{
                "talentIndex": 3,
                "name": "Extended Database",
                "maxLevel": 3,
                "bonusValue": 10,
                "x3": "filler",
                "bonus": "+{ Max LV for 5th column",
                "description": "+{ Max LV for 5th column of Farming Land Rank Database"
            }),
        new LegendTalentBase(4, <LegendTalentModel>{
                "talentIndex": 4,
                "name": "Familiar Firesale",
                "maxLevel": 2,
                "bonusValue": 40,
                "x3": "filler",
                "bonus": "{% chance for no Familiar cost increase",
                "description": "Whenever you buy a Summoning Familiar, there's a {% chance for the cost to not go up at all... almost like it's free!)"
            }),
        new LegendTalentBase(5, <LegendTalentModel>{
                "talentIndex": 5,
                "name": "Kruk be Bubblin'",
                "maxLevel": 5,
                "bonusValue": 10,
                "x3": "filler",
                "bonus": "+{ LVs per day from Kattlekruk",
                "description": "Kattlekruk gives +{ more Bubble LVs per day for each of his bubbles"
            }),
        new LegendTalentBase(6, <LegendTalentModel>{
                "talentIndex": 6,
                "name": "The Charms got Rizz",
                "maxLevel": 2,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "}x higher bonuses",
                "description": "All of your Gold Charms in Sneaking give }x higher bonuses"
            }),
        new LegendTalentBase(7, <LegendTalentModel>{
                "talentIndex": 7,
                "name": "Super Duper Talents",
                "maxLevel": 5,
                "bonusValue": 10,
                "x3": "filler",
                "bonus": "+{ LVs",
                "description": "Super Talent PTS give +{ more LVs to talents than they normally do"
            }),
        new LegendTalentBase(8, <LegendTalentModel>{
                "talentIndex": 8,
                "name": "Buy One Get One Free",
                "maxLevel": 2,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "}x more LVs",
                "description": "Get }x more LVs when buying Exotic Market upgrades"
            }),
        new LegendTalentBase(9, <LegendTalentModel>{
                "talentIndex": 9,
                "name": "Superb Gallerium",
                "maxLevel": 2,
                "bonusValue": 2,
                "x3": "filler",
                "bonus": "{ showcase slots are 1 grade higher",
                "description": "The first { normal showcase slots in your Gallery are 1 grade higher (i.e. they become Featured, and give 150% bonuses)"
            }),
        new LegendTalentBase(10, <LegendTalentModel>{
                "talentIndex": 10,
                "name": "Picasso Gaming",
                "maxLevel": 5,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "}x higher Palette bonuses",
                "description": "All the bonuses from your Gaming Palette colours are }x higher"
            }),
        new LegendTalentBase(11, <LegendTalentModel>{
                "talentIndex": 11,
                "name": "Davey Jones Returns",
                "maxLevel": 4,
                "bonusValue": 15,
                "x3": "filler",
                "bonus": "}x higher bonuses, and {% less minimum time",
                "description": "}x bonus to all the same stats that 'Davey Jones Training' gives, check it in W5 Gemshop. Also, -{% Minimum Travel Time"
            }),
        new LegendTalentBase(12, <LegendTalentModel>{
                "talentIndex": 12,
                "name": "Opa Opal Style",
                "maxLevel": 3,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "}x Villager EXP gains",
                "description": "Villagers at the Hole in World 5 gain }x more EXP"
            }),
        new LegendTalentBase(13, <LegendTalentModel>{
                "talentIndex": 13,
                "name": "Blue Ribbon Certification",
                "maxLevel": 4,
                "bonusValue": 1,
                "x3": "filler",
                "bonus": "+{ more daily Ribbons",
                "description": "Get +{ more Ribbons every day for your Ribbon Shelf in Cooking"
            }),
        new LegendTalentBase(14, <LegendTalentModel>{
                "talentIndex": 14,
                "name": "Recycled Particle Upgrades",
                "maxLevel": 1,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "{% of unspent upgrades are spent",
                "description": "{% of Unspent 'Alternate Particle Upgrades' each day are spent equally across the 1st bubbles of each colour, for free!"
            }),
        new LegendTalentBase(15, <LegendTalentModel>{
                "talentIndex": 15,
                "name": "Reduced Jail Sentence",
                "maxLevel": 2,
                "bonusValue": 150,
                "x3": "filler",
                "bonus": "}x Lab and Divinity EXP gain",
                "description": "}x higher EXP gain for both Laboratory and Divinity"
            }),
        new LegendTalentBase(16, <LegendTalentModel>{
                "talentIndex": 16,
                "name": "Thanatos's Teachings",
                "maxLevel": 2,
                "bonusValue": 200,
                "x3": "filler",
                "bonus": "+{% extra kills",
                "description": "+{% extra kills, for opening portals and Deathnote. @ This bonus is additive, not a multiplier."
            }),
        new LegendTalentBase(17, <LegendTalentModel>{
                "talentIndex": 17,
                "name": "Yet Another Printer Multi",
                "maxLevel": 2,
                "bonusValue": 5,
                "x3": "filler",
                "bonus": "+{% daily printer output, maxed out at 20 days",
                "description": "+{% printer output every day for 20 days, resets when taking a new sample!"
            }),
        new LegendTalentBase(18, <LegendTalentModel>{
                "talentIndex": 18,
                "name": "Cog Lover",
                "maxLevel": 2,
                "bonusValue": 2,
                "x3": "filler",
                "bonus": "+{ daily Jeweled Cog claims",
                "description": "You can claim +{ more Jeweled Cogs every day, if you have them unlocked..."
            }),
        new LegendTalentBase(19, <LegendTalentModel>{
                "talentIndex": 19,
                "name": "More Soot More Salt",
                "maxLevel": 2,
                "bonusValue": 75,
                "x3": "filler",
                "bonus": "}x faster Refinery cycles",
                "description": "Refinery cycles are }x faster"
            }),
        new LegendTalentBase(20, <LegendTalentModel>{
                "talentIndex": 20,
                "name": "Skillium Fancyson",
                "maxLevel": 4,
                "bonusValue": 75,
                "x3": "filler",
                "bonus": "}x Skill EXP gain",
                "description": "}x higher EXP gain for all skills, except Research and W7 Skill 3!"
            }),
        new LegendTalentBase(21, <LegendTalentModel>{
                "talentIndex": 21,
                "name": "Flopping a Full House",
                "maxLevel": 5,
                "bonusValue": 15,
                "x3": "filler",
                "bonus": "}x Active Card bonuses",
                "description": "Actively equipped cards give }x higher bonuses, and this stacks with Lab chips!"
            }),
        new LegendTalentBase(22, <LegendTalentModel>{
                "talentIndex": 22,
                "name": "Democracy FTW",
                "maxLevel": 1,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "+{% higher Ballot Bonus",
                "description": "The Bonus Ballot gives a +{% higher bonus for the winning bonus of the week"
            }),
        new LegendTalentBase(23, <LegendTalentModel>{
                "talentIndex": 23,
                "name": "Daily Shopping Spree",
                "maxLevel": 3,
                "bonusValue": 8,
                "x3": "filler",
                "bonus": "+{ daily cheap upgrades",
                "description": "The first { upgrades you buy each day for Masterclasses are 80% cheaper"
            }),
        new LegendTalentBase(24, <LegendTalentModel>{
                "talentIndex": 24,
                "name": "May the Best Man Win",
                "maxLevel": 1,
                "bonusValue": 20,
                "x3": "filler",
                "bonus": "+{% higher Meritocracy Multi",
                "description": "The Multi Meritocracy gives a +{% higher multiplier for the winning bonus of the week"
            }),
        new LegendTalentBase(25, <LegendTalentModel>{
                "talentIndex": 25,
                "name": "Midusian Appetite",
                "maxLevel": 3,
                "bonusValue": 500,
                "x3": "filler",
                "bonus": "+{% Golden Food bonus",
                "description": "+{% total Golden Food bonus. @ This bonus is additive, not a multiplier."
            }),
        new LegendTalentBase(26, <LegendTalentModel>{
                "talentIndex": 26,
                "name": "Furry Friends Forever",
                "maxLevel": 2,
                "bonusValue": 200,
                "x3": "filler",
                "bonus": "}x bigger 'rest-of-the-game' bonuses",
                "description": "The 'rest-of-the-game' bonuses from your friends Orion and Poppy are all }x bigger"
            }),
        new LegendTalentBase(27, <LegendTalentModel>{
                "talentIndex": 27,
                "name": "Best Story Ever Told",
                "maxLevel": 3,
                "bonusValue": 50,
                "x3": "filler",
                "bonus": "}x higher Reward Multi",
                "description": "}x higher Reward Multi for all Monument Stories in the W5 caverns. Also, reward multi's build up for an extra +{ hours!"
            }),
        new LegendTalentBase(28, <LegendTalentModel>{
                "talentIndex": 28,
                "name": "+1 Slab",
                "maxLevel": 2,
                "bonusValue": 15,
                "x3": "filler",
                "bonus": "}x bigger Slab bonuses",
                "description": "The Slab in World 5 gives }x bigger bonuses"
            }),
        new LegendTalentBase(29, <LegendTalentModel>{
                "talentIndex": 29,
                "name": "Whats in your Jar?",
                "maxLevel": 2,
                "bonusValue": 20,
                "x3": "filler",
                "bonus": "}x collectible bonuses",
                "description": "}x higher bonuses from all of your Jar Collectibles in Cavern 11"
            }),
        new LegendTalentBase(30, <LegendTalentModel>{
                "talentIndex": 30,
                "name": "Lightning Fast Naps",
                "maxLevel": 2,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "}x faster Stamina Regen",
                "description": "}x faster Stamina regeneration for Spelunking"
            }),
        new LegendTalentBase(31, <LegendTalentModel>{
                "talentIndex": 31,
                "name": "Big Sig Fig",
                "maxLevel": 3,
                "bonusValue": 150,
                "x3": "filler",
                "bonus": "}x Sigil level up speed",
                "description": "All your Sigils in Alchemy level up }x faster than normal"
            }),
        new LegendTalentBase(32, <LegendTalentModel>{
                "talentIndex": 32,
                "name": "Purebred Eggs",
                "maxLevel": 1,
                "bonusValue": 900,
                "x3": "filler",
                "bonus": "}x Breeding Egg luck",
                "description": "The chance for eggs in Breeding to rank up, which remember gives higher Mob Power, is }x higher than normal!"
            }),
        new LegendTalentBase(33, <LegendTalentModel>{
                "talentIndex": 33,
                "name": "Inevitable Builder",
                "maxLevel": 2,
                "bonusValue": 75,
                "x3": "filler",
                "bonus": "}x Trimmed slot build speed",
                "description": "Gives 1 additional Trimmed Construction Slot, and makes them }x faster for a total bonus speed of $x!"
            }),
        new LegendTalentBase(34, <LegendTalentModel>{
                "talentIndex": 34,
                "name": "Blessed Be Thy Luck",
                "maxLevel": 2,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "}x better Blessing luck",
                "description": "}x better luck when using Blessings in your Sneaking inventory"
            }),
        new LegendTalentBase(35, <LegendTalentModel>{
                "talentIndex": 35,
                "name": "Obsolete No More",
                "maxLevel": 1,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "Perma Metal Detector, and }x Equinox Bar Fill Rate",
                "description": "The Metal Detector bonus from Equinox Valley no longer resets when you find a new best nugget. Also, }x Equinox Bar Fill Rate"
            }),
        new LegendTalentBase(36, <LegendTalentModel>{
                "talentIndex": 36,
                "name": "Wowa Woowa",
                "maxLevel": 5,
                "bonusValue": 3,
                "x3": "filler",
                "bonus": "+{% higher Prisma and Exalted bonuses",
                "description": "The bonus from Prisma Bubbles and Exalted Stamps is +{% higher"
            }),
        new LegendTalentBase(37, <LegendTalentModel>{
                "talentIndex": 37,
                "name": "6 O'Clock Crystals",
                "maxLevel": 1,
                "bonusValue": 300,
                "x3": "filler",
                "bonus": "}x more Daily Guaranteed Crystal Mobs",
                "description": "}x more Guaranteed Crystal Mobs every day. You currently get $ daily guaranteed."
            }),
        new LegendTalentBase(38, <LegendTalentModel>{
                "talentIndex": 38,
                "name": "Shrine World Order Bill",
                "maxLevel": 1,
                "bonusValue": 1,
                "x3": "filler",
                "bonus": "All 7 Worlds will ratify this bill into the IdleOn constitution",
                "description": "Introduces a bill to congress that will make Shrines gain EXP from AFK gains no matter what world you're in!"
            }),
        new LegendTalentBase(39, <LegendTalentModel>{
                "talentIndex": 39,
                "name": "Super Talent Points",
                "maxLevel": 1,
                "bonusValue": 1,
                "x3": "filler",
                "bonus": "Unlocks this system for all characters!",
                "description": "You get +1 Super Talent Point at Class LV 500, LV 600, LV 700 and so on. Spend these on Talents to give them +$ LV!"
            }),
        new LegendTalentBase(40, <LegendTalentModel>{
                "talentIndex": 40,
                "name": "filler",
                "maxLevel": 6,
                "bonusValue": 50,
                "x3": "filler",
                "bonus": "}x Minehead Currency and DMG",
                "description": "}x Minehead Currency Gain and Damage. Also, opponent gets -1 Depth Charge the 1st, 3rd, and 5th time you upgrade this!"
            }),
        new LegendTalentBase(41, <LegendTalentModel>{
                "talentIndex": 41,
                "name": "filler",
                "maxLevel": 6,
                "bonusValue": 50,
                "x3": "filler",
                "bonus": "}x Jelly Operator DMG",
                "description": "}x Jelly Operator Damage. Also, you get +1 Slot Unlock to use the 1st, 3rd, and 5th time you upgrade this!"
            }),
        new LegendTalentBase(42, <LegendTalentModel>{
                "talentIndex": 42,
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(43, <LegendTalentModel>{
                "talentIndex": 43,
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(44, <LegendTalentModel>{
                "talentIndex": 44,
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(45, <LegendTalentModel>{
                "talentIndex": 45,
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(46, <LegendTalentModel>{
                "talentIndex": 46,
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(47, <LegendTalentModel>{
                "talentIndex": 47,
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(48, <LegendTalentModel>{
                "talentIndex": 48,
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(49, <LegendTalentModel>{
                "talentIndex": 49,
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            })    
]
}
