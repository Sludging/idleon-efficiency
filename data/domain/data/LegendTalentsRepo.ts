import { LegendTalentModel } from "../model/legendTalentModel";

export class LegendTalentBase { constructor(public index: number, public data: LegendTalentModel) { } }


export const initLegendaryTalentsRepo = (): LegendTalentBase[] => {
    return [
        new LegendTalentBase(0, {
            name: "Coral Restoration",
            maxLevel: 2,
            bonusValue: 30,
            x3: undefined,
            desc: "+{% more Daily Coral gained each and every day!",
            nextLevelPreview: "+{% Daily Coral gain"
        }),
        new LegendTalentBase(1, {
            name: "Greatest Drop Party Ever",
            maxLevel: 4,
            bonusValue: 500,
            x3: undefined,
            desc: "+{% Drop Rate for all players! @ This bonus is additive, not a multiplier.",
            nextLevelPreview: "+{% Drop Rate"
        }),
        new LegendTalentBase(2, {
            name: "Double Aint Enough",
            maxLevel: 3,
            bonusValue: 100,
            x3: undefined,
            desc: "''2x Statue and Gold Food drops'' now drop in bundles of $x instead!",
            nextLevelPreview: "$x Statue and Gold Food drops"
        }),
        new LegendTalentBase(3, {
            name: "Extended Database",
            maxLevel: 3,
            bonusValue: 10,
            x3: undefined,
            desc: "+{ Max LV for 5th column of Farming Land Rank Database",
            nextLevelPreview: "+{ Max LV for 5th column"
        }),
        new LegendTalentBase(4, {
            name: "Familiar Firesale",
            maxLevel: 2,
            bonusValue: 40,
            x3: undefined,
            desc: "Whenever you buy a Summoning Familiar, there's a {% chance for the cost to not go up at all... almost like it's free!)",
            nextLevelPreview: "{% chance for no Familiar cost increase"
        }),
        new LegendTalentBase(5, {
            name: "Kruk be Bubblin'",
            maxLevel: 5,
            bonusValue: 10,
            x3: undefined,
            desc: "Kattlekruk gives +{ more Bubble LVs per day for each of his bubbles",
            nextLevelPreview: "+{ LVs per day from Kattlekruk"
        }),
        new LegendTalentBase(6, {
            name: "The Charms got Rizz",
            maxLevel: 2,
            bonusValue: 25,
            x3: undefined,
            desc: "All of your Gold Charms in Sneaking give }x higher bonuses",
            nextLevelPreview: "}x higher bonuses"
        }),
        new LegendTalentBase(7, {
            name: "Super Duper Talents",
            maxLevel: 5,
            bonusValue: 10,
            x3: undefined,
            desc: "Super Talent PTS give +{ more LVs to talents than they normally do",
            nextLevelPreview: "+{ LVs"
        }),
        new LegendTalentBase(8, {
            name: "Buy One Get One Free",
            maxLevel: 2,
            bonusValue: 100,
            x3: undefined,
            desc: "Get }x more LVs when buying Exotic Market upgrades",
            nextLevelPreview: "}x more LVs"
        }),
        new LegendTalentBase(9, {
            name: "Superb Gallerium",
            maxLevel: 2,
            bonusValue: 2,
            x3: undefined,
            desc: "The first { normal showcase slots in your Gallery are 1 grade higher (i.e. they become Featured, and give 150% bonuses)",
            nextLevelPreview: "{ showcase slots are 1 grade higher"
        }),
        new LegendTalentBase(10, {
            name: "Picasso Gaming",
            maxLevel: 2,
            bonusValue: 50,
            x3: undefined,
            desc: "All the bonuses from your Gaming Palette colours are }x higher",
            nextLevelPreview: "}x higher Palette bonuses"
        }),
        new LegendTalentBase(11, {
            name: "Davey Jones Returns",
            maxLevel: 4,
            bonusValue: 15,
            x3: undefined,
            desc: "}x bonus to all the same stats that 'Davey Jones Training' gives, check it in W5 Gemshop. Also, -{% Minimum Travel Time",
            nextLevelPreview: "}x higher bonuses, and {% less minimum time"
        }),
        new LegendTalentBase(12, {
            name: "Opa Opal Style",
            maxLevel: 3,
            bonusValue: 100,
            x3: undefined,
            desc: "Villagers at the Hole in World 5 gain }x more EXP",
            nextLevelPreview: "}x Villager EXP gains"
        }),
        new LegendTalentBase(13, {
            name: "Blue Ribbon Certification",
            maxLevel: 4,
            bonusValue: 1,
            x3: undefined,
            desc: "Get +{ more Ribbons every day for your Ribbon Shelf in Cooking",
            nextLevelPreview: "+{ more daily Ribbons"
        }),
        new LegendTalentBase(14, {
            name: "Recycled Particle Upgrades",
            maxLevel: 1,
            bonusValue: 100,
            x3: undefined,
            desc: "{% of Unspent 'Alternate Particle Upgrades' each day are spent equally across the 1st bubbles of each colour, for free!",
            nextLevelPreview: "{% of unspent upgrades are spent"
        }),
        new LegendTalentBase(15, {
            name: "Reduced Jail Sentence",
            maxLevel: 2,
            bonusValue: 150,
            x3: undefined,
            desc: "}x higher EXP gain for both Laboratory and Divinity",
            nextLevelPreview: "}x Lab and Divinity EXP gain"
        }),
        new LegendTalentBase(16, {
            name: "Thanatos's Teachings",
            maxLevel: 2,
            bonusValue: 200,
            x3: undefined,
            desc: "+{% extra kills, for opening portals and Deathnote. @ This bonus is additive, not a multiplier.",
            nextLevelPreview: "+{% extra kills"
        }),
        new LegendTalentBase(17, {
            name: "Yet Another Printer Multi",
            maxLevel: 2,
            bonusValue: 5,
            x3: undefined,
            desc: "+{% printer output every day for 20 days, resets when taking a new sample!",
            nextLevelPreview: "+{% daily printer output, maxed out at 20 days"
        }),
        new LegendTalentBase(18, {
            name: "Cog Lover",
            maxLevel: 2,
            bonusValue: 2,
            x3: undefined,
            desc: "You can claim +{ more Jeweled Cogs every day, if you have them unlocked...",
            nextLevelPreview: "+{ daily Jeweled Cog claims"
        }),
        new LegendTalentBase(19, {
            name: "More Soot More Salt",
            maxLevel: 2,
            bonusValue: 75,
            x3: undefined,
            desc: "Refinery cycles are }x faster",
            nextLevelPreview: "}x faster Refinery cycles"
        }),
        new LegendTalentBase(20, {
            name: "Skillium Fancyson",
            maxLevel: 4,
            bonusValue: 75,
            x3: undefined,
            desc: "}x higher EXP gain for all skills, all of them!",
            nextLevelPreview: "}x Skill EXP gain"
        }),
        new LegendTalentBase(21, {
            name: "Flopping a Full House",
            maxLevel: 5,
            bonusValue: 15,
            x3: undefined,
            desc: "Actively equipped cards give }x higher bonuses, and this stacks with Lab chips!",
            nextLevelPreview: "}x Active Card bonuses"
        }),
        new LegendTalentBase(22, {
            name: "Democracy FTW",
            maxLevel: 1,
            bonusValue: 25,
            x3: undefined,
            desc: "The Bonus Ballot gives a +{% higher bonus for the winning bonus of the week",
            nextLevelPreview: "+{% higher Ballot Bonus"
        }),
        new LegendTalentBase(23, {
            name: "Daily Shopping Spree",
            maxLevel: 3,
            bonusValue: 8,
            x3: undefined,
            desc: "The first { upgrades you buy each day for Masterclasses are 80% cheaper",
            nextLevelPreview: "+{ daily cheap upgrades"
        }),
        new LegendTalentBase(24, {
            name: "May the Best Man Win",
            maxLevel: 1,
            bonusValue: 20,
            x3: undefined,
            desc: "The Multi Meritocracy gives a +{% higher multiplier for the winning bonus of the week",
            nextLevelPreview: "+{% higher Meritocracy Multi"
        }),
        new LegendTalentBase(25, {
            name: "Midusian Appetite",
            maxLevel: 3,
            bonusValue: 500,
            x3: undefined,
            desc: "+{% total Golden Food bonus. @ This bonus is additive, not a multiplier.",
            nextLevelPreview: "+{% Golden Food bonus"
        }),
        new LegendTalentBase(26, {
            name: "Furry Friends Forever",
            maxLevel: 2,
            bonusValue: 200,
            x3: undefined,
            desc: "The 'rest-of-the-game' bonuses from your friends Orion and Poppy are all }x bigger",
            nextLevelPreview: "}x bigger 'rest-of-the-game' bonuses"
        }),
        new LegendTalentBase(27, {
            name: "Best Story Ever Told",
            maxLevel: 3,
            bonusValue: 50,
            x3: undefined,
            desc: "}x higher Reward Multi for all Monument Stories in the W5 caverns. Also, reward multi's build up for an extra +{ hours!",
            nextLevelPreview: "}x higher Reward Multi"
        }),
        new LegendTalentBase(28, {
            name: "+1 Slab",
            maxLevel: 2,
            bonusValue: 15,
            x3: undefined,
            desc: "The Slab in World 5 gives }x bigger bonuses",
            nextLevelPreview: "}x bigger Slab bonuses"
        }),
        new LegendTalentBase(29, {
            name: "Whats in your Jar?",
            maxLevel: 2,
            bonusValue: 20,
            x3: undefined,
            desc: "}x higher bonuses from all of your Jar Collectibles in Cavern 11",
            nextLevelPreview: "}x collectible bonuses"
        }),
        new LegendTalentBase(30, {
            name: "Lightning Fast Naps",
            maxLevel: 2,
            bonusValue: 25,
            x3: undefined,
            desc: "}x faster Stamina regeneration for Spelunking",
            nextLevelPreview: "}x faster Stamina Regen"
        }),
        new LegendTalentBase(31, {
            name: "Big Sig Fig",
            maxLevel: 3,
            bonusValue: 150,
            x3: undefined,
            desc: "All your Sigils in Alchemy level up }x faster than normal",
            nextLevelPreview: "}x Sigil level up speed"
        }),
        new LegendTalentBase(32, {
            name: "Purebred Eggs",
            maxLevel: 1,
            bonusValue: 900,
            x3: undefined,
            desc: "The chance for eggs in Breeding to rank up, which remember gives higher pet power, is }x higher than normal!",
            nextLevelPreview: "}x Breeding Egg luck"
        }),
        new LegendTalentBase(33, {
            name: "Inevitable Builder",
            maxLevel: 2,
            bonusValue: 75,
            x3: undefined,
            desc: "Gives 1 additional Trimmed Construction Slot, and makes them }x faster for a total bonus speed of $x!",
            nextLevelPreview: "}x Trimmed slot build speed"
        }),
        new LegendTalentBase(34, {
            name: "Blessed Be Thy Luck",
            maxLevel: 2,
            bonusValue: 100,
            x3: undefined,
            desc: "}x better luck when using Blessings in your Sneaking inventory",
            nextLevelPreview: "}x better Blessing luck"
        }),
        new LegendTalentBase(35, {
            name: "Obsolete No More",
            maxLevel: 1,
            bonusValue: 1,
            x3: undefined,
            desc: "The Metal Detector bonus from Equinox Valley no longer resets when you find a new best nugget",
            nextLevelPreview: "All them big words above will become true"
        }),
        new LegendTalentBase(36, {
            name: "Wowa Woowa",
            maxLevel: 5,
            bonusValue: 3,
            x3: undefined,
            desc: "The bonus from Prisma Bubbles and Exalted Stamps is +{% higher",
            nextLevelPreview: "+{% higher Prisma and Exalted bonuses"
        }),
        new LegendTalentBase(37, {
            name: "6 O'Clock Crystals",
            maxLevel: 1,
            bonusValue: 2000,
            x3: undefined,
            desc: "You know how you're guaranteed to spawn $ Crystal Mobs every day? Well that'll be }x higher with this talent!",
            nextLevelPreview: "}x more Daily Guaranteed Crystal Mobs"
        }),
        new LegendTalentBase(38, {
            name: "Shrine World Order Bill",
            maxLevel: 1,
            bonusValue: 1,
            x3: undefined,
            desc: "Introduces a bill to congress that will make Shrines gain EXP from AFK gains no matter what world you're in!",
            nextLevelPreview: "All 7 Worlds will ratify this bill into the IdleOn constitution"
        }),
        new LegendTalentBase(39, {
            name: "Super Talent Points",
            maxLevel: 1,
            bonusValue: 1,
            x3: undefined,
            desc: "You get +1 Super Talent Point at Class LV 500, LV 600, LV 700 and so on. Spend these on Talents to give them +$ LV!",
            nextLevelPreview: "Unlocks this system for all characters!"
        }),
        new LegendTalentBase(40, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(41, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(42, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(43, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(44, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(45, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(46, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(47, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(48, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        }),
        new LegendTalentBase(49, {
            name: "filler",
            maxLevel: 1,
            bonusValue: 0,
            x3: undefined,
            desc: "I have not yet considered this talent...",
            nextLevelPreview: "filler"
        })
    ];
};