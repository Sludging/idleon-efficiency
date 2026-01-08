import { HoleJarBonusModel } from "../model/holeJarBonusModel";

export class HoleJarBonusBase { constructor(public index: number, public data: HoleJarBonusModel) { } }


export const initHoleJarBonusRepo = () => {
    return [
        new HoleJarBonusBase(0, <HoleJarBonusModel>{
            name: "ABNORMAL RUPIE",
            bonus: 20,
            filler1: "Filler",
            description: "Rupies found are worth +{% more. @ Current Rupie Value:$"
        }),
        new HoleJarBonusBase(1, <HoleJarBonusModel>{
            name: "SAPPHIRE DROPLET",
            bonus: 10,
            filler1: "Filler",
            description: "Jar production rate is +{% faster."
        }),
        new HoleJarBonusBase(2, <HoleJarBonusModel>{
            name: "EFFERVESCENT DIAMOND",
            bonus: 20,
            filler1: "Filler",
            description: "}x higher chance to find Opals in Tall Jars."
        }),
        new HoleJarBonusBase(3, <HoleJarBonusModel>{
            name: "TORTOLE ROCK",
            bonus: 25,
            filler1: "Filler",
            description: "All rupies found are worth a whopping }x more!"
        }),
        new HoleJarBonusBase(4, <HoleJarBonusModel>{
            name: "NATURAL PEARL",
            bonus: 15,
            filler1: "Filler",
            description: "All villagers gain +{% more EXP."
        }),
        new HoleJarBonusBase(5, <HoleJarBonusModel>{
            name: "AMETHYST HEARTSTONE",
            bonus: 10,
            filler1: "Filler",
            description: "All skilling caverns require {% less Resources to get opals!"
        }),
        new HoleJarBonusBase(6, <HoleJarBonusModel>{
            name: "AMBER SQUARE",
            bonus: 25,
            filler1: "Filler",
            description: "Rupies found are worth +{% more."
        }),
        new HoleJarBonusBase(7, <HoleJarBonusModel>{
            name: "VERDANT THORNS",
            bonus: 25,
            filler1: "Filler",
            description: "}x higher chance to find new Collectibles."
        }),
        new HoleJarBonusBase(8, <HoleJarBonusModel>{
            name: "VIOLENT VIOLETS",
            bonus: 20,
            filler1: "Filler",
            description: "All buckets get }x Bucket Fill Rate!"
        }),
        new HoleJarBonusBase(9, <HoleJarBonusModel>{
            name: "BLUE FABERGE EGG",
            bonus: 15,
            filler1: "Filler",
            description: "}x higher chance to enchant a Collectible"
        }),
        new HoleJarBonusBase(10, <HoleJarBonusModel>{
            name: "SHADOW PRISM",
            bonus: 20,
            filler1: "Filler",
            description: "All villagers gain +{% more EXP."
        }),
        new HoleJarBonusBase(11, <HoleJarBonusModel>{
            name: "BIG BEEF ROCK",
            bonus: 25,
            filler1: "Filler",
            description: "}x faster Bell Ring Rate!"
        }),
        new HoleJarBonusBase(12, <HoleJarBonusModel>{
            name: "EMERALD ORE",
            bonus: 30,
            filler1: "Filler",
            description: "All villagers gain +{% more EXP."
        }),
        new HoleJarBonusBase(13, <HoleJarBonusModel>{
            name: "DAWN PRISM",
            bonus: 30,
            filler1: "Filler",
            description: "Rupies found are worth +{% more."
        }),
        new HoleJarBonusBase(14, <HoleJarBonusModel>{
            name: "SWAMPSTONE",
            bonus: 25,
            filler1: "Filler",
            description: "}x higher chance to find Opals in Tall Jars."
        }),
        new HoleJarBonusBase(15, <HoleJarBonusModel>{
            name: "FROST SPIRESTONE",
            bonus: 12,
            filler1: "Filler",
            description: "Jar production rate is +{% faster."
        }),
        new HoleJarBonusBase(16, <HoleJarBonusModel>{
            name: "ROSEMERALD",
            bonus: 10,
            filler1: "Filler",
            description: "}x Faster study rate for villager Bolaia"
        }),
        new HoleJarBonusBase(17, <HoleJarBonusModel>{
            name: "BLOOD GLASS",
            bonus: 40,
            filler1: "Filler",
            description: "All rupies found are worth a whopping }x more!"
        }),
        new HoleJarBonusBase(18, <HoleJarBonusModel>{
            name: "SUNRISE DIAMOND",
            bonus: 25,
            filler1: "Filler",
            description: "}x higher chance to enchant a Collectible"
        }),
        new HoleJarBonusBase(19, <HoleJarBonusModel>{
            name: "MINCERAFT GEM",
            bonus: 20,
            filler1: "Filler",
            description: "+{% Monument AFK Gain rate."
        }),
        new HoleJarBonusBase(20, <HoleJarBonusModel>{
            name: "CRIMSON SPADE",
            bonus: 20,
            filler1: "Filler",
            description: "The harp produces }x more Notes!"
        }),
        new HoleJarBonusBase(21, <HoleJarBonusModel>{
            name: "STAINED GLASSDROP",
            bonus: 35,
            filler1: "Filler",
            description: "Rupies found are worth +{% more."
        }),
        new HoleJarBonusBase(22, <HoleJarBonusModel>{
            name: "TABULA RASASTONE",
            bonus: 32,
            filler1: "Filler",
            description: "All villagers gain +{% more EXP."
        }),
        new HoleJarBonusBase(23, <HoleJarBonusModel>{
            name: "DEEP BLUE SQUARE",
            bonus: 1,
            filler1: "Filler",
            description: "+{% Gambit PTS"
        }),
        new HoleJarBonusBase(24, <HoleJarBonusModel>{
            name: "EARTHBOUND GEODE",
            bonus: 15,
            filler1: "Filler",
            description: "Jar production rate is +{% faster."
        }),
        new HoleJarBonusBase(25, <HoleJarBonusModel>{
            name: "INFERNO DROPLET",
            bonus: 40,
            filler1: "Filler",
            description: "}x higher chance to find new Collectibles."
        }),
        new HoleJarBonusBase(26, <HoleJarBonusModel>{
            name: "OCTOGONAL GEM",
            bonus: 30,
            filler1: "Filler",
            description: "}x higher chance to enchant a Collectible"
        }),
        new HoleJarBonusBase(27, <HoleJarBonusModel>{
            name: "SOLARFANG",
            bonus: 32,
            filler1: "Filler",
            description: "}x higher chance to find Opals in Tall Jars."
        }),
        new HoleJarBonusBase(28, <HoleJarBonusModel>{
            name: "MYSTIC ORE",
            bonus: 50,
            filler1: "Filler",
            description: "All rupies found are worth a whopping }x more!"
        }),
        new HoleJarBonusBase(29, <HoleJarBonusModel>{
            name: "ARCANE PRISM",
            bonus: 38,
            filler1: "Filler",
            description: "All villagers gain +{% more EXP."
        }),
        new HoleJarBonusBase(30, <HoleJarBonusModel>{
            name: "MURKY FABREGE EGG",
            bonus: 1,
            filler1: "Filler",
            description: "+{% Gambit PTS"
        }),
        new HoleJarBonusBase(31, <HoleJarBonusModel>{
            name: "CORPORE ROCK",
            bonus: 1,
            filler1: "Filler",
            description: "Boosts a future cavern... futuuure..!"
        }),
        new HoleJarBonusBase(32, <HoleJarBonusModel>{
            name: "TWILIGHT PRISM",
            bonus: 1,
            filler1: "Filler",
            description: "Boosts a future cavern... futuuure..!"
        }),
        new HoleJarBonusBase(33, <HoleJarBonusModel>{
            name: "TEWBALL ORBSTONE",
            bonus: 40,
            filler1: "Filler",
            description: "Rupies found are worth +{% more."
        }),
        new HoleJarBonusBase(34, <HoleJarBonusModel>{
            name: "MAD MUSCLE ROCK",
            bonus: 40,
            filler1: "Filler",
            description: "}x higher chance to enchant a Collectible"
        }),
        new HoleJarBonusBase(35, <HoleJarBonusModel>{
            name: "SUNROOT SPLINTERS",
            bonus: 40,
            filler1: "Filler",
            description: "All villagers gain +{% more EXP."
        }),
        new HoleJarBonusBase(36, <HoleJarBonusModel>{
            name: "TWISTED RUPIE",
            bonus: 75,
            filler1: "Filler",
            description: "}x faster Bell Ring Rate!"
        }),
        new HoleJarBonusBase(37, <HoleJarBonusModel>{
            name: "OVERLOADED RELIC",
            bonus: 1,
            filler1: "Filler",
            description: "Boosts a future cavern... futuuure..!"
        }),
        new HoleJarBonusBase(38, <HoleJarBonusModel>{
            name: "SUNBURST PEARL",
            bonus: 1,
            filler1: "Filler",
            description: "Boosts a future cavern... futuuure..!"
        }),
        new HoleJarBonusBase(39, <HoleJarBonusModel>{
            name: "BLOODFANG SPIRES",
            bonus: 1,
            filler1: "Filler",
            description: "Boosts a future cavern... futuuure..!"
        })
    ]
}