import { LegendaryTalentModel } from "../model/legendaryTalentModel";

export class LegendaryTalentBase { constructor(public index: number, public data: LegendaryTalentModel) { } }


export const initLegendaryTalentsRepo = (): LegendaryTalentBase[] => {
    return [
        new LegendaryTalentBase(0, {
            name: "Coral Restoration",
            maxLevel: 2,
            bonusValue: 30,
            x3: undefined,
            desc: "+{% Daily Coral gain",
            nextLevelPreview: "+{% more Daily Coral gained each and every day!"
        }),
        new LegendaryTalentBase(1, {
            name: "Greatest Drop Party Ever",
            maxLevel: 4,
            bonusValue: 500,
            x3: undefined,
            desc: "+{% Drop Rate",
            nextLevelPreview: "+{% Drop Rate for all players! @ This bonus is additive, not a multiplier."
        }),
        new LegendaryTalentBase(2, {
            name: "Double Aint Enough",
            maxLevel: 3,
            bonusValue: 100,
            x3: undefined,
            desc: "$x Statue and Gold Food drops",
            nextLevelPreview: "''2x Statue and Gold Food drops'' now drop in bundles of $x instead!"
        }),
        new LegendaryTalentBase(3, {
            name: "Extended Database",
            maxLevel: 3,
            bonusValue: 10,
            x3: undefined,
            desc: "+{ Max LV for 5th column",
            nextLevelPreview: "+{ Max LV for 5th column of Farming Land Rank Database"
        }),
        new LegendaryTalentBase(4, {
            name: "Familiar Firesale",
            maxLevel: 2,
            bonusValue: 40,
            x3: undefined,
            desc: "{% chance for no Familiar cost increase",
            nextLevelPreview: "Whenever you buy a Summoning Familiar, there's a {% chance for the cost to not go up at all... almost like it's free!)"
        }),
        new LegendaryTalentBase(5, {
            name: "Kruk be Bubblin'",
            maxLevel: 5,
            bonusValue: 10,
            x3: undefined,
            desc: "+{ LVs per day from Kattlekruk",
            nextLevelPreview: "Kattlekruk gives +{ more Bubble LVs per day for each of his bubbles"
        }),
        new LegendaryTalentBase(6, {
            name: "The Charms got Rizz",
            maxLevel: 2,
            bonusValue: 25,
            x3: undefined,
            desc: "}x higher bonuses",
            nextLevelPreview: "All of your Gold Charms in Sneaking give }x higher bonuses"
        }),
        new LegendaryTalentBase(7, {
            name: "Super Duper Talents",
            maxLevel: 5,
            bonusValue: 10,
            x3: undefined,
            desc: "+{ LVs",
            nextLevelPreview: "Super Talent PTS give +{ more LVs to talents than they normally do"
        }),
        new LegendaryTalentBase(8, {
            name: "Buy One Get One Free",
            maxLevel: 2,
            bonusValue: 100,
            x3: undefined,
            desc: "}x more LVs",
            nextLevelPreview: "Get }x more LVs when buying Exotic Market upgrades"
        }),
        new LegendaryTalentBase(9, {
            name: "Superb Gallerium",
            maxLevel: 2,
            bonusValue: 2,
            x3: undefined,
            desc: "{ showcase slots are 1 grade higher",
            nextLevelPreview: "The first { normal showcase slots in your Gallery are 1 grade higher (i.e. they become Featured, and give 150% bonuses)"
        }),
        new LegendaryTalentBase(10, {
            name: "Picasso Gaming",
            maxLevel: 2,
            bonusValue: 50,
            x3: undefined,
            desc: "}x higher Palette bonuses",
            nextLevelPreview: "All the bonuses from your Gaming Palette colours are }x higher"
        }),
        new LegendaryTalentBase(11, {
            name: "Davey Jones Returns",
            maxLevel: 4,
            bonusValue: 15,
            x3: undefined,
            desc: "}x higher bonuses, and {% less minimum time",
            nextLevelPreview: "}x bonus to all the same stats that 'Davey Jones Training' gives, check it in W5 Gemshop. Also, -{% Minimum Travel Time"
        }),
        new LegendaryTalentBase(12, {
            name: "Opa Opal Style",
            maxLevel: 3,
            bonusValue: 100,
            x3: undefined,
            desc: "}x Villager EXP gains",
            nextLevelPreview: "Villagers at the Hole in World 5 gain }x more EXP"
        }),
        new LegendaryTalentBase(13, {
            name: "Blue Ribbon Certification",
            maxLevel: 4,
            bonusValue: 1,
            x3: undefined,
            desc: "+{ more daily Ribbons",
            nextLevelPreview: "Get +{ more Ribbons every day for your Ribbon Shelf in Cooking"
        }),
        new LegendaryTalentBase(14, {
            name: "Recycled Particle Upgrades",
            maxLevel: 1,
            bonusValue: 100,
            x3: undefined,
            desc: "{% of unspent upgrades are spent",
            nextLevelPreview: "{% of Unspent 'Alternate Particle Upgrades' each day are spent equally across the 1st bubbles of each colour, for free!"
        }),
        new LegendaryTalentBase(15, {
            name: "Reduced Jail Sentence",
            maxLevel: 2,
            bonusValue: 150,
            x3: undefined,
            desc: "}x Lab and Divinity EXP gain",
            nextLevelPreview: "}x higher EXP gain for both Laboratory and Divinity"
        }),
        new LegendaryTalentBase(16, {
            name: "Thanatos's Teachings",
            maxLevel: 2,
            bonusValue: 200,
            x3: undefined,
            desc: "+{% extra kills",
            nextLevelPreview: "+{% extra kills, for opening portals and Deathnote. @ This bonus is additive, not a multiplier."
        }),
        new LegendaryTalentBase(17, {
            name: "Yet Another Printer Multi",
            maxLevel: 2,
            bonusValue: 5,
            x3: undefined,
            desc: "+{% daily printer output, maxed out at 20 days",
            nextLevelPreview: "+{% printer output every day for 20 days, resets when taking a new sample!"
        }),
        new LegendaryTalentBase(18, {
            name: "Cog Lover",
            maxLevel: 2,
            bonusValue: 2,
            x3: undefined,
            desc: "+{ daily Jeweled Cog claims",
            nextLevelPreview: "You can claim +{ more Jeweled Cogs every day, if you have them unlocked..."
        }),
        new LegendaryTalentBase(19, {
            name: "More Soot More Salt",
            maxLevel: 2,
            bonusValue: 75,
            x3: undefined,
            desc: "}x faster Refinery cycles",
            nextLevelPreview: "Refinery cycles are }x faster"
        }),
        new LegendaryTalentBase(20, {
            name: "Skillium Fancyson",
            maxLevel: 4,
            bonusValue: 75,
            x3: undefined,
            desc: "}x Skill EXP gain",
            nextLevelPreview: "}x higher EXP gain for all skills, all of them!"
        }),
        new LegendaryTalentBase(21, {
            name: "Flopping a Full House",
            maxLevel: 5,
            bonusValue: 15,
            x3: undefined,
            desc: "}x Active Card bonuses",
            nextLevelPreview: "Actively equipped cards give }x higher bonuses, and this stacks with Lab chips!"
        }),
        new LegendaryTalentBase(22, {
            name: "Democracy FTW",
            maxLevel: 1,
            bonusValue: 25,
            x3: undefined,
            desc: "+{% higher Ballot Bonus",
            nextLevelPreview: "The Bonus Ballot gives a +{% higher bonus for the winning bonus of the week"
        }),
        new LegendaryTalentBase(23, {
            name: "Daily Shopping Spree",
            maxLevel: 3,
            bonusValue: 8,
            x3: undefined,
            desc: "+{ daily cheap upgrades",
            nextLevelPreview: "The first { upgrades you buy each day for Masterclasses are 80% cheaper"
        }),
        new LegendaryTalentBase(24, {
            name: "May the Best Man Win",
            maxLevel: 1,
            bonusValue: 20,
            x3: undefined,
            desc: "+{% higher Meritocracy Multi",
            nextLevelPreview: "The Multi Meritocracy gives a +{% higher multiplier for the winning bonus of the week"
        }),
        new LegendaryTalentBase(25, {
            name: "Midusian Appetite",
            maxLevel: 3,
            bonusValue: 500,
            x3: undefined,
            desc: "+{% Golden Food bonus",
            nextLevelPreview: "+{% total Golden Food bonus. @ This bonus is additive, not a multiplier."
        }),
        new LegendaryTalentBase(26, {
            name: "Furry Friends Forever",
            maxLevel: 2,
            bonusValue: 200,
            x3: undefined,
            desc: "}x bigger 'rest-of-the-game' bonuses",
            nextLevelPreview: "The 'rest-of-the-game' bonuses from your friends Orion and Poppy are all }x bigger"
        }),
        new LegendaryTalentBase(27, {
            name: "Best Story Ever Told",
            maxLevel: 3,
            bonusValue: 50,
            x3: undefined,
            desc: "}x higher Reward Multi",
            nextLevelPreview: "}x higher Reward Multi for all Monument Stories in the W5 caverns. Also, reward multi's build up for an extra +{ hours!"
        }),
        new LegendaryTalentBase(28, {
            name: "+1 Slab",
            maxLevel: 2,
            bonusValue: 15,
            x3: undefined,
            desc: "}x bigger Slab bonuses",
            nextLevelPreview: "The Slab in World 5 gives }x bigger bonuses"
        }),
        new LegendaryTalentBase(29, {
            name: "Whats in your Jar?",
            maxLevel: 2,
            bonusValue: 20,
            x3: undefined,
            desc: "}x collectible bonuses",
            nextLevelPreview: "}x higher bonuses from all of your Jar Collectibles in Cavern 11"
        }),
        new LegendaryTalentBase(30, {
            name: "Lightning Fast Naps",
            maxLevel: 2,
            bonusValue: 25,
            x3: undefined,
            desc: "}x faster Stamina Regen",
            nextLevelPreview: "}x faster Stamina regeneration for Spelunking"
        }),
        new LegendaryTalentBase(31, {
            name: "Big Sig Fig",
            maxLevel: 3,
            bonusValue: 150,
            x3: undefined,
            desc: "}x Sigil level up speed",
            nextLevelPreview: "All your Sigils in Alchemy level up }x faster than normal"
        }),
        new LegendaryTalentBase(32, {
            name: "Purebred Eggs",
            maxLevel: 1,
            bonusValue: 900,
            x3: undefined,
            desc: "}x Breeding Egg luck",
            nextLevelPreview: "The chance for eggs in Breeding to rank up, which remember gives higher pet power, is }x higher than normal!"
        }),
        new LegendaryTalentBase(33, {
            name: "Inevitable Builder",
            maxLevel: 2,
            bonusValue: 75,
            x3: undefined,
            desc: "}x Trimmed slot build speed",
            nextLevelPreview: "Gives 1 additional Trimmed Construction Slot, and makes them }x faster for a total bonus speed of $x!"
        }),
        new LegendaryTalentBase(34, {
            name: "Blessed Be Thy Luck",
            maxLevel: 2,
            bonusValue: 100,
            x3: undefined,
            desc: "}x better Blessing luck",
            nextLevelPreview: "}x better luck when using Blessings in your Sneaking inventory"
        }),
        new LegendaryTalentBase(35, {
            name: "Obsolete No More",
            maxLevel: 1,
            bonusValue: 1,
            x3: undefined,
            desc: "All them big words above will become true",
            nextLevelPreview: "The Metal Detector bonus from Equinox Valley no longer resets when you find a new best nugget"
        }),
        new LegendaryTalentBase(36, {
            name: "Wowa Woowa",
            maxLevel: 5,
            bonusValue: 3,
            x3: undefined,
            desc: "+{% higher Prisma and Exalted bonuses",
            nextLevelPreview: "The bonus from Prisma Bubbles and Exalted Stamps is +{% higher"
        }),
        new LegendaryTalentBase(37, {
            name: "6 O'Clock Crystals",
            maxLevel: 1,
            bonusValue: 2000,
            x3: undefined,
            desc: "}x more Daily Guaranteed Crystal Mobs",
            nextLevelPreview: "You know how you're guaranteed to spawn $ Crystal Mobs every day? Well that'll be }x higher with this talent!"
        }),
        new LegendaryTalentBase(38, {
            name: "Shrine World Order Bill",
            maxLevel: 1,
            bonusValue: 1,
            x3: undefined,
            desc: "All 7 Worlds will ratify this bill into the IdleOn constitution",
            nextLevelPreview: "Introduces a bill to congress that will make Shrines gain EXP from AFK gains no matter what world you're in!"
        }),
        new LegendaryTalentBase(39, {
            name: "Super Talent Points",
            maxLevel: 1,
            bonusValue: 1,
            x3: undefined,
            desc: "Unlocks this system for all characters!",
            nextLevelPreview: "You get +1 Super Talent Point at Class LV 500, LV 600, LV 700 and so on. Spend these on Talents to give them +$ LV!"
        }),
        new LegendaryTalentBase(40, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(41, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(42, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(43, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(44, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(45, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(46, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(47, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(48, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        }),
        new LegendaryTalentBase(49, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "filler",
            nextLevelPreview: "I have not yet considered this talent..."
        })
    ];
};