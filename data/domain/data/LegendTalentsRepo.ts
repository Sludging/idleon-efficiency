import { LegendTalentModel } from '../model/legendTalentModel';

export class LegendTalentBase { constructor(public index: number, public data: LegendTalentModel) { } }



export const initLegendTalentsRepo = () => {
    return [    
        new LegendTalentBase(0, <LegendTalentModel>{
                "name": "Coral Restoration",
                "maxLevel": 2,
                "bonusValue": 30,
                "x3": "filler",
                "bonus": "+{% Daily Coral gain",
                "description": "+{% more Daily Coral gained each and every day!"
            }),
        new LegendTalentBase(1, <LegendTalentModel>{
                "name": "Greatest Drop Party Ever",
                "maxLevel": 4,
                "bonusValue": 500,
                "x3": "filler",
                "bonus": "+{% Drop Rate",
                "description": "+{% Drop Rate for all players! @ This bonus is additive, not a multiplier."
            }),
        new LegendTalentBase(2, <LegendTalentModel>{
                "name": "Double Aint Enough",
                "maxLevel": 3,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "$x Statue and Gold Food drops",
                "description": "''2x Statue and Gold Food drops'' now drop in bundles of $x instead!"
            }),
        new LegendTalentBase(3, <LegendTalentModel>{
                "name": "Extended Database",
                "maxLevel": 3,
                "bonusValue": 10,
                "x3": "filler",
                "bonus": "+{ Max LV for 5th column",
                "description": "+{ Max LV for 5th column of Farming Land Rank Database"
            }),
        new LegendTalentBase(4, <LegendTalentModel>{
                "name": "Familiar Firesale",
                "maxLevel": 2,
                "bonusValue": 40,
                "x3": "filler",
                "bonus": "{% chance for no Familiar cost increase",
                "description": "Whenever you buy a Summoning Familiar, there's a {% chance for the cost to not go up at all... almost like it's free!)"
            }),
        new LegendTalentBase(5, <LegendTalentModel>{
                "name": "Kruk be Bubblin'",
                "maxLevel": 5,
                "bonusValue": 10,
                "x3": "filler",
                "bonus": "+{ LVs per day from Kattlekruk",
                "description": "Kattlekruk gives +{ more Bubble LVs per day for each of his bubbles"
            }),
        new LegendTalentBase(6, <LegendTalentModel>{
                "name": "The Charms got Rizz",
                "maxLevel": 2,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "}x higher bonuses",
                "description": "All of your Gold Charms in Sneaking give }x higher bonuses"
            }),
        new LegendTalentBase(7, <LegendTalentModel>{
                "name": "Super Duper Talents",
                "maxLevel": 5,
                "bonusValue": 10,
                "x3": "filler",
                "bonus": "+{ LVs",
                "description": "Super Talent PTS give +{ more LVs to talents than they normally do"
            }),
        new LegendTalentBase(8, <LegendTalentModel>{
                "name": "Buy One Get One Free",
                "maxLevel": 2,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "}x more LVs",
                "description": "Get }x more LVs when buying Exotic Market upgrades"
            }),
        new LegendTalentBase(9, <LegendTalentModel>{
                "name": "Superb Gallerium",
                "maxLevel": 2,
                "bonusValue": 2,
                "x3": "filler",
                "bonus": "{ showcase slots are 1 grade higher",
                "description": "The first { normal showcase slots in your Gallery are 1 grade higher (i.e. they become Featured, and give 150% bonuses)"
            }),
        new LegendTalentBase(10, <LegendTalentModel>{
                "name": "Picasso Gaming",
                "maxLevel": 5,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "}x higher Palette bonuses",
                "description": "All the bonuses from your Gaming Palette colours are }x higher"
            }),
        new LegendTalentBase(11, <LegendTalentModel>{
                "name": "Davey Jones Returns",
                "maxLevel": 4,
                "bonusValue": 15,
                "x3": "filler",
                "bonus": "}x higher bonuses, and {% less minimum time",
                "description": "}x bonus to all the same stats that 'Davey Jones Training' gives, check it in W5 Gemshop. Also, -{% Minimum Travel Time"
            }),
        new LegendTalentBase(12, <LegendTalentModel>{
                "name": "Opa Opal Style",
                "maxLevel": 3,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "}x Villager EXP gains",
                "description": "Villagers at the Hole in World 5 gain }x more EXP"
            }),
        new LegendTalentBase(13, <LegendTalentModel>{
                "name": "Blue Ribbon Certification",
                "maxLevel": 4,
                "bonusValue": 1,
                "x3": "filler",
                "bonus": "+{ more daily Ribbons",
                "description": "Get +{ more Ribbons every day for your Ribbon Shelf in Cooking"
            }),
        new LegendTalentBase(14, <LegendTalentModel>{
                "name": "Recycled Particle Upgrades",
                "maxLevel": 1,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "{% of unspent upgrades are spent",
                "description": "{% of Unspent 'Alternate Particle Upgrades' each day are spent equally across the 1st bubbles of each colour, for free!"
            }),
        new LegendTalentBase(15, <LegendTalentModel>{
                "name": "Reduced Jail Sentence",
                "maxLevel": 2,
                "bonusValue": 150,
                "x3": "filler",
                "bonus": "}x Lab and Divinity EXP gain",
                "description": "}x higher EXP gain for both Laboratory and Divinity"
            }),
        new LegendTalentBase(16, <LegendTalentModel>{
                "name": "Thanatos's Teachings",
                "maxLevel": 2,
                "bonusValue": 200,
                "x3": "filler",
                "bonus": "+{% extra kills",
                "description": "+{% extra kills, for opening portals and Deathnote. @ This bonus is additive, not a multiplier."
            }),
        new LegendTalentBase(17, <LegendTalentModel>{
                "name": "Yet Another Printer Multi",
                "maxLevel": 2,
                "bonusValue": 5,
                "x3": "filler",
                "bonus": "+{% daily printer output, maxed out at 20 days",
                "description": "+{% printer output every day for 20 days, resets when taking a new sample!"
            }),
        new LegendTalentBase(18, <LegendTalentModel>{
                "name": "Cog Lover",
                "maxLevel": 2,
                "bonusValue": 2,
                "x3": "filler",
                "bonus": "+{ daily Jeweled Cog claims",
                "description": "You can claim +{ more Jeweled Cogs every day, if you have them unlocked..."
            }),
        new LegendTalentBase(19, <LegendTalentModel>{
                "name": "More Soot More Salt",
                "maxLevel": 2,
                "bonusValue": 75,
                "x3": "filler",
                "bonus": "}x faster Refinery cycles",
                "description": "Refinery cycles are }x faster"
            }),
        new LegendTalentBase(20, <LegendTalentModel>{
                "name": "Skillium Fancyson",
                "maxLevel": 4,
                "bonusValue": 75,
                "x3": "filler",
                "bonus": "}x Skill EXP gain",
                "description": "}x higher EXP gain for all skills, except Research and W7 Skill 3!"
            }),
        new LegendTalentBase(21, <LegendTalentModel>{
                "name": "Flopping a Full House",
                "maxLevel": 5,
                "bonusValue": 15,
                "x3": "filler",
                "bonus": "}x Active Card bonuses",
                "description": "Actively equipped cards give }x higher bonuses, and this stacks with Lab chips!"
            }),
        new LegendTalentBase(22, <LegendTalentModel>{
                "name": "Democracy FTW",
                "maxLevel": 1,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "+{% higher Ballot Bonus",
                "description": "The Bonus Ballot gives a +{% higher bonus for the winning bonus of the week"
            }),
        new LegendTalentBase(23, <LegendTalentModel>{
                "name": "Daily Shopping Spree",
                "maxLevel": 3,
                "bonusValue": 8,
                "x3": "filler",
                "bonus": "+{ daily cheap upgrades",
                "description": "The first { upgrades you buy each day for Masterclasses are 80% cheaper"
            }),
        new LegendTalentBase(24, <LegendTalentModel>{
                "name": "May the Best Man Win",
                "maxLevel": 1,
                "bonusValue": 20,
                "x3": "filler",
                "bonus": "+{% higher Meritocracy Multi",
                "description": "The Multi Meritocracy gives a +{% higher multiplier for the winning bonus of the week"
            }),
        new LegendTalentBase(25, <LegendTalentModel>{
                "name": "Midusian Appetite",
                "maxLevel": 3,
                "bonusValue": 500,
                "x3": "filler",
                "bonus": "+{% Golden Food bonus",
                "description": "+{% total Golden Food bonus. @ This bonus is additive, not a multiplier."
            }),
        new LegendTalentBase(26, <LegendTalentModel>{
                "name": "Furry Friends Forever",
                "maxLevel": 2,
                "bonusValue": 200,
                "x3": "filler",
                "bonus": "}x bigger 'rest-of-the-game' bonuses",
                "description": "The 'rest-of-the-game' bonuses from your friends Orion and Poppy are all }x bigger"
            }),
        new LegendTalentBase(27, <LegendTalentModel>{
                "name": "Best Story Ever Told",
                "maxLevel": 3,
                "bonusValue": 50,
                "x3": "filler",
                "bonus": "}x higher Reward Multi",
                "description": "}x higher Reward Multi for all Monument Stories in the W5 caverns. Also, reward multi's build up for an extra +{ hours!"
            }),
        new LegendTalentBase(28, <LegendTalentModel>{
                "name": "+1 Slab",
                "maxLevel": 2,
                "bonusValue": 15,
                "x3": "filler",
                "bonus": "}x bigger Slab bonuses",
                "description": "The Slab in World 5 gives }x bigger bonuses"
            }),
        new LegendTalentBase(29, <LegendTalentModel>{
                "name": "Whats in your Jar?",
                "maxLevel": 2,
                "bonusValue": 20,
                "x3": "filler",
                "bonus": "}x collectible bonuses",
                "description": "}x higher bonuses from all of your Jar Collectibles in Cavern 11"
            }),
        new LegendTalentBase(30, <LegendTalentModel>{
                "name": "Lightning Fast Naps",
                "maxLevel": 2,
                "bonusValue": 25,
                "x3": "filler",
                "bonus": "}x faster Stamina Regen",
                "description": "}x faster Stamina regeneration for Spelunking"
            }),
        new LegendTalentBase(31, <LegendTalentModel>{
                "name": "Big Sig Fig",
                "maxLevel": 3,
                "bonusValue": 150,
                "x3": "filler",
                "bonus": "}x Sigil level up speed",
                "description": "All your Sigils in Alchemy level up }x faster than normal"
            }),
        new LegendTalentBase(32, <LegendTalentModel>{
                "name": "Purebred Eggs",
                "maxLevel": 1,
                "bonusValue": 900,
                "x3": "filler",
                "bonus": "}x Breeding Egg luck",
                "description": "The chance for eggs in Breeding to rank up, which remember gives higher Mob Power, is }x higher than normal!"
            }),
        new LegendTalentBase(33, <LegendTalentModel>{
                "name": "Inevitable Builder",
                "maxLevel": 2,
                "bonusValue": 75,
                "x3": "filler",
                "bonus": "}x Trimmed slot build speed",
                "description": "Gives 1 additional Trimmed Construction Slot, and makes them }x faster for a total bonus speed of $x!"
            }),
        new LegendTalentBase(34, <LegendTalentModel>{
                "name": "Blessed Be Thy Luck",
                "maxLevel": 2,
                "bonusValue": 100,
                "x3": "filler",
                "bonus": "}x better Blessing luck",
                "description": "}x better luck when using Blessings in your Sneaking inventory"
            }),
        new LegendTalentBase(35, <LegendTalentModel>{
                "name": "Obsolete No More",
                "maxLevel": 1,
                "bonusValue": 1,
                "x3": "filler",
                "bonus": "All them big words above will become true",
                "description": "The Metal Detector bonus from Equinox Valley no longer resets when you find a new best nugget"
            }),
        new LegendTalentBase(36, <LegendTalentModel>{
                "name": "Wowa Woowa",
                "maxLevel": 5,
                "bonusValue": 3,
                "x3": "filler",
                "bonus": "+{% higher Prisma and Exalted bonuses",
                "description": "The bonus from Prisma Bubbles and Exalted Stamps is +{% higher"
            }),
        new LegendTalentBase(37, <LegendTalentModel>{
                "name": "6 O'Clock Crystals",
                "maxLevel": 1,
                "bonusValue": 2000,
                "x3": "filler",
                "bonus": "}x more Daily Guaranteed Crystal Mobs",
                "description": "You know how you're guaranteed to spawn $ Crystal Mobs every day? Well that'll be }x higher with this talent!"
            }),
        new LegendTalentBase(38, <LegendTalentModel>{
                "name": "Shrine World Order Bill",
                "maxLevel": 1,
                "bonusValue": 1,
                "x3": "filler",
                "bonus": "All 7 Worlds will ratify this bill into the IdleOn constitution",
                "description": "Introduces a bill to congress that will make Shrines gain EXP from AFK gains no matter what world you're in!"
            }),
        new LegendTalentBase(39, <LegendTalentModel>{
                "name": "Super Talent Points",
                "maxLevel": 1,
                "bonusValue": 1,
                "x3": "filler",
                "bonus": "Unlocks this system for all characters!",
                "description": "You get +1 Super Talent Point at Class LV 500, LV 600, LV 700 and so on. Spend these on Talents to give them +$ LV!"
            }),
        new LegendTalentBase(40, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(41, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(42, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(43, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(44, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(45, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(46, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(47, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(48, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            }),
        new LegendTalentBase(49, <LegendTalentModel>{
                "name": "filler",
                "maxLevel": 1,
                "bonusValue": -1,
                "x3": "filler",
                "bonus": "filler",
                "description": "I have not yet considered this talent..."
            })    
]
}
