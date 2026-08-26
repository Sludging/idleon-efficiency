import { SushiModel } from '../model/sushiModel';

export class SushiBase { constructor(public index: number, public data: SushiModel) { } }



export const initSushiRepo = () => {
    return [    
        new SushiBase(0, <SushiModel>{
                "index": 0,
                "name": "Fish Eggs",
                "unlockDescription": "}x multiplier to Research EXP gain",
                "unlockBonus": 100,
                "knowledgeBonusCategory": "+{% more Bucks generated",
                "knowledgeBonusBase": 20
            }),
        new SushiBase(1, <SushiModel>{
                "index": 1,
                "name": "Eggroll",
                "unlockDescription": "All Minehead upgrades are {% cheaper",
                "unlockBonus": 30,
                "knowledgeBonusCategory": "+{% bonus Knowledge XP",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(2, <SushiModel>{
                "index": 2,
                "name": "Egg Maki",
                "unlockDescription": "+{ daily rolls for getting new Observations in Research",
                "unlockBonus": 2,
                "knowledgeBonusCategory": "+^% chance for +1 Tier for cooked sushi",
                "knowledgeBonusBase": 0.1
            }),
        new SushiBase(3, <SushiModel>{
                "index": 3,
                "name": "Sashimi",
                "unlockDescription": "+{ Research Points to buy upgrades with",
                "unlockBonus": 2,
                "knowledgeBonusCategory": "+{% more Bucks generated",
                "knowledgeBonusBase": 20
            }),
        new SushiBase(4, <SushiModel>{
                "index": 4,
                "name": "Tuna Maki",
                "unlockDescription": "+{% Research AFK gains... if you're at 100%, I have good news and bad news...",
                "unlockBonus": 2,
                "knowledgeBonusCategory": "+^% chance for +1 Tier for cooked sushi",
                "knowledgeBonusBase": 0.1
            }),
        new SushiBase(5, <SushiModel>{
                "index": 5,
                "name": "Salmon Uramaki",
                "unlockDescription": "Every new event, you get +{ play at the event game, FOREVER!",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "}x higher Fuel Capacity",
                "knowledgeBonusBase": 10
            }),
        new SushiBase(6, <SushiModel>{
                "index": 6,
                "name": "Salmon Maki",
                "unlockDescription": "All Spelunk Shop upgrades are {% cheaper",
                "unlockBonus": 30,
                "knowledgeBonusCategory": "+{% bonus Knowledge XP",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(7, <SushiModel>{
                "index": 7,
                "name": "Cucumber Uramaki",
                "unlockDescription": "}x artifact find chance",
                "unlockBonus": 30,
                "knowledgeBonusCategory": "+{% more Bucks generated",
                "knowledgeBonusBase": 20
            }),
        new SushiBase(8, <SushiModel>{
                "index": 8,
                "name": "Cucumber Maki",
                "unlockDescription": "+{ new magnifier to study your observations with",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "+^% chance for +1 Tier for cooked sushi",
                "knowledgeBonusBase": 0.1
            }),
        new SushiBase(9, <SushiModel>{
                "index": 9,
                "name": "Onigiri",
                "unlockDescription": "All Summoning upgrades are {% cheaper",
                "unlockBonus": 30,
                "knowledgeBonusCategory": "+{% faster Fuel generation",
                "knowledgeBonusBase": 3
            }),
        new SushiBase(10, <SushiModel>{
                "index": 10,
                "name": "Toro Slice",
                "unlockDescription": "All your breeding Mobs deal }x damage when fighting",
                "unlockBonus": 100,
                "knowledgeBonusCategory": "}x higher Fuel Capacity",
                "knowledgeBonusBase": 10
            }),
        new SushiBase(11, <SushiModel>{
                "index": 11,
                "name": "Toro Nigiri",
                "unlockDescription": "}x Stamina Regen Multi so you can get back to delving asap",
                "unlockBonus": 25,
                "knowledgeBonusCategory": "+{% more Bucks generated",
                "knowledgeBonusBase": 20
            }),
        new SushiBase(12, <SushiModel>{
                "index": 12,
                "name": "Beef Nigiri",
                "unlockDescription": "}x multiplier to Minehead currency gain",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "+{% bonus Knowledge XP",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(13, <SushiModel>{
                "index": 13,
                "name": "Beef Tobo Nigiri",
                "unlockDescription": "+{ Research Point to buy upgrades",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "+^% chance for free shaker usage",
                "knowledgeBonusBase": 0.05
            }),
        new SushiBase(14, <SushiModel>{
                "index": 14,
                "name": "Tobiko Maki",
                "unlockDescription": "Whenever you get a new ribbon, theres a {% chance it's 1 tier higher",
                "unlockBonus": 20,
                "knowledgeBonusCategory": "+^% chance for +1 Tier for cooked sushi",
                "knowledgeBonusBase": 0.1
            }),
        new SushiBase(15, <SushiModel>{
                "index": 15,
                "name": "Tobiko Temaki",
                "unlockDescription": "}x Class EXP gain",
                "unlockBonus": 25,
                "knowledgeBonusCategory": "+{% faster Fuel generation",
                "knowledgeBonusBase": 3
            }),
        new SushiBase(16, <SushiModel>{
                "index": 16,
                "name": "Tobiko Cluster",
                "unlockDescription": "All Minehead upgrades are now {% cheaper instead of just 25%",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "}x higher Fuel Capacity",
                "knowledgeBonusBase": 10
            }),
        new SushiBase(17, <SushiModel>{
                "index": 17,
                "name": "Tobo Sardine",
                "unlockDescription": "All your Exalted Stamps give a 0.01x higher bonus than before",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "+{% more Bucks generated",
                "knowledgeBonusBase": 20
            }),
        new SushiBase(18, <SushiModel>{
                "index": 18,
                "name": "Tobo Twins",
                "unlockDescription": "}x extra coins dropped by monsters",
                "unlockBonus": 20,
                "knowledgeBonusCategory": "+{% cheaper upgrades",
                "knowledgeBonusBase": 1
            }),
        new SushiBase(19, <SushiModel>{
                "index": 19,
                "name": "Live Squid",
                "unlockDescription": "+{ Legend Talent Point. Sponsored by Whallamus.",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "}x higher Fuel Capacity",
                "knowledgeBonusBase": 10
            }),
        new SushiBase(20, <SushiModel>{
                "index": 20,
                "name": "Live Octopus",
                "unlockDescription": "}x Spelunking POW",
                "unlockBonus": 200,
                "knowledgeBonusCategory": "+^% chance for +1 Tier for cooked sushi",
                "knowledgeBonusBase": 0.1
            }),
        new SushiBase(21, <SushiModel>{
                "index": 21,
                "name": "Calamari Ring",
                "unlockDescription": "+{% grand discovery chance per Spelunking LV",
                "unlockBonus": 3,
                "knowledgeBonusCategory": "+^% chance for free shaker usage",
                "knowledgeBonusBase": 0.05
            }),
        new SushiBase(22, <SushiModel>{
                "index": 22,
                "name": "Bluefin Ring",
                "unlockDescription": "Unlocks a new Atom, which boosts Bucks gained",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "+{% bonus Knowledge XP",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(23, <SushiModel>{
                "index": 23,
                "name": "Tobo Tamago",
                "unlockDescription": "All your Prisma Bubbles give a 0.01x higher bonus than before",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "+{% faster Fuel generation",
                "knowledgeBonusBase": 3
            }),
        new SushiBase(24, <SushiModel>{
                "index": 24,
                "name": "Tako Sashimi",
                "unlockDescription": "+{% Research AFK gains",
                "unlockBonus": 2,
                "knowledgeBonusCategory": "+{% more Bucks generated",
                "knowledgeBonusBase": 20
            }),
        new SushiBase(25, <SushiModel>{
                "index": 25,
                "name": "Hamachi Sashimi",
                "unlockDescription": "}x Burger.",
                "unlockBonus": 30,
                "knowledgeBonusCategory": "+{% cheaper upgrades",
                "knowledgeBonusBase": 1
            }),
        new SushiBase(26, <SushiModel>{
                "index": 26,
                "name": "Fat Tuna Sashimi",
                "unlockDescription": "All Sushi Station upgrades are {% cheaper",
                "unlockBonus": 25,
                "knowledgeBonusCategory": "+^% chance for +1 Tier for cooked sushi",
                "knowledgeBonusBase": 0.1
            }),
        new SushiBase(27, <SushiModel>{
                "index": 27,
                "name": "King Beef Sashimi",
                "unlockDescription": "All Spelunk Shop upgrades are now {% cheaper instead of just 25%",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "}x faster Fuel generation",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(28, <SushiModel>{
                "index": 28,
                "name": "Salmon Sashimi",
                "unlockDescription": "}x more Amber gained from Spelunking, time for new Biggest Hauls!",
                "unlockBonus": 100,
                "knowledgeBonusCategory": "}x higher Fuel Capacity",
                "knowledgeBonusBase": 10
            }),
        new SushiBase(29, <SushiModel>{
                "index": 29,
                "name": "Salmon Nigiri",
                "unlockDescription": "}x bits gained from Gaming",
                "unlockBonus": 100,
                "knowledgeBonusCategory": "+^% chance for free shaker usage",
                "knowledgeBonusBase": 0.05
            }),
        new SushiBase(30, <SushiModel>{
                "index": 30,
                "name": "Fried Bass Nigiri",
                "unlockDescription": "+{ maximum possible roll when rolling for new Observations",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "+{% bonus Knowledge XP",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(31, <SushiModel>{
                "index": 31,
                "name": "Seasoned Bass Nigiri",
                "unlockDescription": "}x higher odds of getting new crowns for the Rat King in Gaming",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "+{% cheaper upgrades",
                "knowledgeBonusBase": 1
            }),
        new SushiBase(32, <SushiModel>{
                "index": 32,
                "name": "Jumbo Shrimp",
                "unlockDescription": "}x more Stealth for all your Ninja Twins in Sneaking",
                "unlockBonus": 100,
                "knowledgeBonusCategory": "+{% more Bucks generated",
                "knowledgeBonusBase": 20
            }),
        new SushiBase(33, <SushiModel>{
                "index": 33,
                "name": "Aged Shrimp Nigiri",
                "unlockDescription": "Get +{ more Exotic Market purchases at the start of each week",
                "unlockBonus": 3,
                "knowledgeBonusCategory": "+{% faster Fuel generation",
                "knowledgeBonusBase": 3
            }),
        new SushiBase(34, <SushiModel>{
                "index": 34,
                "name": "Tempura Shrimp",
                "unlockDescription": "All Summoning upgrades are now {% cheaper instead of just 25%",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "+^% bigger effects from Slots",
                "knowledgeBonusBase": 0.2
            }),
        new SushiBase(35, <SushiModel>{
                "index": 35,
                "name": "Ika Sashimi",
                "unlockDescription": "}x higher farming Evo chance, to get new crop types with",
                "unlockBonus": 100,
                "knowledgeBonusCategory": "+^% chance for +1 Tier for cooked sushi",
                "knowledgeBonusBase": 0.1
            }),
        new SushiBase(36, <SushiModel>{
                "index": 36,
                "name": "Abalone Sashimi",
                "unlockDescription": "+{% Hat Rack multi",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "}x faster Fuel generation",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(37, <SushiModel>{
                "index": 37,
                "name": "Aji Sashimi",
                "unlockDescription": "}x extra coins dropped by monsters",
                "unlockBonus": 40,
                "knowledgeBonusCategory": "+^% chance for free shaker usage",
                "knowledgeBonusBase": 0.05
            }),
        new SushiBase(38, <SushiModel>{
                "index": 38,
                "name": "Aji Aji Sashimi",
                "unlockDescription": "All Upgrade Vault upgrades are {% cheaper",
                "unlockBonus": 25,
                "knowledgeBonusCategory": "+{% cheaper upgrades",
                "knowledgeBonusBase": 1
            }),
        new SushiBase(39, <SushiModel>{
                "index": 39,
                "name": "Bubba Grand Salmon",
                "unlockDescription": "Bubba now produced }x more Meat Slice. Business is BOOMING!",
                "unlockBonus": 100,
                "knowledgeBonusCategory": "}x higher Fuel Capacity",
                "knowledgeBonusBase": 10
            }),
        new SushiBase(40, <SushiModel>{
                "index": 40,
                "name": "Tobiko Roll",
                "unlockDescription": "Get +{ more Tiny Cogs every day. You do have them unlocked by now right?",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "+{% bonus Knowledge XP",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(41, <SushiModel>{
                "index": 41,
                "name": "Spicy Tuna Roll",
                "unlockDescription": "}x multiplier to all Sigil EXP gains",
                "unlockBonus": 100,
                "knowledgeBonusCategory": "+^% bigger effects from Slots",
                "knowledgeBonusBase": 0.2
            }),
        new SushiBase(42, <SushiModel>{
                "index": 42,
                "name": "Salmon Uramajor",
                "unlockDescription": "}x higher Palette Luck in Gaming",
                "unlockBonus": 20,
                "knowledgeBonusCategory": "+{% faster Fuel generation",
                "knowledgeBonusBase": 3
            }),
        new SushiBase(43, <SushiModel>{
                "index": 43,
                "name": "Sesame Salmon Muramajor",
                "unlockDescription": "}x Lab EXP gain",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "+^% bigger effects from Fireplaces",
                "knowledgeBonusBase": 0.2
            }),
        new SushiBase(44, <SushiModel>{
                "index": 44,
                "name": "Dragon Roll",
                "unlockDescription": "All Sushi Station upgrades are now {% cheaper instead of just 25%",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "+^% chance for +1 Tier for cooked sushi",
                "knowledgeBonusBase": 0.1
            }),
        new SushiBase(45, <SushiModel>{
                "index": 45,
                "name": "Imaginei Dragonroll",
                "unlockDescription": "All your Sailing Captains earn }x more personal EXP than before",
                "unlockBonus": 25,
                "knowledgeBonusCategory": "}x faster Fuel generation",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(46, <SushiModel>{
                "index": 46,
                "name": "Dragon Nigiri",
                "unlockDescription": "Generate }x more Divinity PTS for Divinity",
                "unlockBonus": 30,
                "knowledgeBonusCategory": "+^% chance for free shaker usage",
                "knowledgeBonusBase": 0.05
            }),
        new SushiBase(47, <SushiModel>{
                "index": 47,
                "name": "Tamago Nigiri",
                "unlockDescription": "All Upgrade Vault upgrades are now {% cheaper instead of just 25%",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "+^% bigger effects from Slots",
                "knowledgeBonusBase": 0.2
            }),
        new SushiBase(48, <SushiModel>{
                "index": 48,
                "name": "Unagi Nigiri",
                "unlockDescription": "}x Drop Rate",
                "unlockBonus": 10,
                "knowledgeBonusCategory": "}x higher Fuel Capacity",
                "knowledgeBonusBase": 10
            }),
        new SushiBase(49, <SushiModel>{
                "index": 49,
                "name": "Soylent Nigiri",
                "unlockDescription": "}x Total DMG",
                "unlockBonus": 10,
                "knowledgeBonusCategory": "}x higher chance to Perfecto all sushi",
                "knowledgeBonusBase": 100
            }),
        new SushiBase(50, <SushiModel>{
                "index": 50,
                "name": "Masago",
                "unlockDescription": "+{% Bonus Ballot Multiplier",
                "unlockBonus": 10,
                "knowledgeBonusCategory": "+{% cheaper upgrades",
                "knowledgeBonusBase": 1
            }),
        new SushiBase(51, <SushiModel>{
                "index": 51,
                "name": "Masago Temaki",
                "unlockDescription": "+{% Meritocracy Bonus Multi",
                "unlockBonus": 10,
                "knowledgeBonusCategory": "+^% bigger effects from Fireplaces",
                "knowledgeBonusBase": 0.2
            }),
        new SushiBase(52, <SushiModel>{
                "index": 52,
                "name": "Masagoroll",
                "unlockDescription": "}x chance for 'Blue Chest' Monument Rewards",
                "unlockBonus": 50,
                "knowledgeBonusCategory": "+^% bigger effects from Slots",
                "knowledgeBonusBase": 0.2
            }),
        new SushiBase(53, <SushiModel>{
                "index": 53,
                "name": "Caviar Supreme",
                "unlockDescription": "}x bonuses from ALL Research upgrades",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "}x higher chance to Perfecto all sushi",
                "knowledgeBonusBase": 100
            }),
        new SushiBase(54, <SushiModel>{
                "index": 54,
                "name": "Dulce Vitiri",
                "unlockDescription": "+{% Gallery Bonus Multi",
                "unlockBonus": 1,
                "knowledgeBonusCategory": "}x higher Fuel Capacity",
                "knowledgeBonusBase": 10
            }),
        new SushiBase(55, <SushiModel>{
                "index": 55,
                "name": "Wasabaisamarama",
                "unlockDescription": "}x Megacrop Growth Chance for getting more Farming Stickers",
                "unlockBonus": 25,
                "knowledgeBonusCategory": "+^% chance for free shaker usage",
                "knowledgeBonusBase": 0.05
            }),
        new SushiBase(56, <SushiModel>{
                "index": 56,
                "name": "Kraken Roll",
                "unlockDescription": "+{ Opals for your Villagers",
                "unlockBonus": 2,
                "knowledgeBonusCategory": "+^% bigger effects from Slots",
                "knowledgeBonusBase": 0.2
            }),
        new SushiBase(57, <SushiModel>{
                "index": 57,
                "name": "Leviathan Roll",
                "unlockDescription": "}x extra Treasure found from opening Sailing Chests",
                "unlockBonus": 30,
                "knowledgeBonusCategory": "}x faster Fuel generation",
                "knowledgeBonusBase": 2
            }),
        new SushiBase(58, <SushiModel>{
                "index": 58,
                "name": "Golthulu Roll",
                "unlockDescription": "+{ Max Build LVs for all Shrines in Construction",
                "unlockBonus": 10,
                "knowledgeBonusCategory": undefined,
                "knowledgeBonusBase": undefined
            }),
        new SushiBase(59, <SushiModel>{
                "index": 59,
                "name": "Wasomber Nigiri",
                "unlockDescription": "+{% chance for an additional Orblet stack to drop on Royal Guardians!",
                "unlockBonus": 10,
                "knowledgeBonusCategory": undefined,
                "knowledgeBonusBase": undefined
            }),
        new SushiBase(60, <SushiModel>{
                "index": 60,
                "name": "Leek Nigiri",
                "unlockDescription": "+{% Resource Collection Rate for all your Royal Guardian outposts!",
                "unlockBonus": 30,
                "knowledgeBonusCategory": undefined,
                "knowledgeBonusBase": undefined
            }),
        new SushiBase(61, <SushiModel>{
                "index": 61,
                "name": "Atomiroll",
                "unlockDescription": "Regal Intervention spawns +{ more Regal Mobs than normal when triggered",
                "unlockBonus": 2,
                "knowledgeBonusCategory": undefined,
                "knowledgeBonusBase": undefined
            }),
        new SushiBase(62, <SushiModel>{
                "index": 62,
                "name": "Octolingo",
                "unlockDescription": "+{% drop chance for Marble for your Royal Guardian",
                "unlockBonus": 10,
                "knowledgeBonusCategory": undefined,
                "knowledgeBonusBase": undefined
            })    
]
}
