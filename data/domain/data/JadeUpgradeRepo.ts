import { JadeUpgradeModel } from '../model/jadeUpgradeModel';

export class JadeUpgradeBase { constructor(public index: number, public data: JadeUpgradeModel) { } }



export const initJadeUpgradeRepo = () => {
    return [    
        new JadeUpgradeBase(0, <JadeUpgradeModel>{
                "name": "Quick Ref Access",
                "costA": 500,
                "costB": 1,
                "imageId": 0,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds the Sneaking skill to your QuickRef menu! Manage your Ninja Twins from anywhere!"
            }),
        new JadeUpgradeBase(1, <JadeUpgradeModel>{
                "name": "Gold Food Beanstalk",
                "costA": 500,
                "costB": 1,
                "imageId": 1,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Grows a giant beanstalk behind the ninja castle! Drop a stack of 10,000 Gold Food to add it with the beanstalk and permanently gain its bonus!"
            }),
        new JadeUpgradeBase(2, <JadeUpgradeModel>{
                "name": "Supersized Gold Beanstacking",
                "costA": 500,
                "costB": 1,
                "imageId": 2,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "You can now drop a stack of 100,000 Gold Food to supersize it! This will obviously give a bigger bonus, and will even enlargen the food on the stalk!"
            }),
        new JadeUpgradeBase(3, <JadeUpgradeModel>{
                "name": "Charmed, I'm Sure",
                "costA": 500,
                "costB": 1,
                "imageId": 3,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "All your Ninja Twins can now equip two of the same charm at once!"
            }),
        new JadeUpgradeBase(4, <JadeUpgradeModel>{
                "name": "Mob Cosplay Craze",
                "costA": 500,
                "costB": 1,
                "imageId": 4,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Certain monsters in World 6 will now have a rare chance to drop Ninja Hats, but only the ones you've found already from the Ninja Castle!"
            }),
        new JadeUpgradeBase(5, <JadeUpgradeModel>{
                "name": "Level Exemption",
                "costA": 500,
                "costB": 1,
                "imageId": 5,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Completely and utterly removes the UNDER-LEVELED bonus reduction of all stamps in your collection, now and forever. Amen."
            }),
        new JadeUpgradeBase(6, <JadeUpgradeModel>{
                "name": "Gaming to the MAX",
                "costA": 500,
                "costB": 1,
                "imageId": 6,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "All plant types in Gaming have +1 Max Evolution, but this one is 50,000x rarer than normal and will make you wonder if evolution is even real (it is)"
            }),
        new JadeUpgradeBase(7, <JadeUpgradeModel>{
                "name": "Revenge of the Pickle",
                "costA": 500,
                "costB": 1,
                "imageId": 7,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new boss page to the left of World 1 in Deathnote. Each BoneJoePickle in your inventory counts as +1 Boss Deathnote Kill!"
            }),
        new JadeUpgradeBase(8, <JadeUpgradeModel>{
                "name": "The Artifact Matrix",
                "costA": 500,
                "costB": 1,
                "imageId": 8,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Extends the Laboratory Event Horizon, adding another bonus to connect to! In particular, a boost to Artifact Find Chance!"
            }),
        new JadeUpgradeBase(9, <JadeUpgradeModel>{
                "name": "The Slab Matrix",
                "costA": 500,
                "costB": 1,
                "imageId": 9,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Further extends the Laboratory Event Horizon, adding another bonus to connect to! In particular, a boost to all bonuses from the Slab!"
            }),
        new JadeUpgradeBase(10, <JadeUpgradeModel>{
                "name": "The Spirit Matrix",
                "costA": 500,
                "costB": 1,
                "imageId": 10,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Even further extends the Laboratory Event Horizon, adding another bonus to connect to! In particular, a boost to W6 Skill exp gain!"
            }),
        new JadeUpgradeBase(11, <JadeUpgradeModel>{
                "name": "The Crop Matrix",
                "costA": 500,
                "costB": 1,
                "imageId": 11,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Yet again even further extends the Laboratory Event Horizon, adding another bonus to connect to! In particular, a boost to Crop Depot!"
            }),
        new JadeUpgradeBase(12, <JadeUpgradeModel>{
                "name": "MSA Expander I",
                "costA": 500,
                "costB": 1,
                "imageId": 12,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to the Miniature Soul Apparatus in World 3, specifically Farming EXP!"
            }),
        new JadeUpgradeBase(13, <JadeUpgradeModel>{
                "name": "MSA Expander II",
                "costA": 500,
                "costB": 1,
                "imageId": 13,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to the Miniature Soul Apparatus in World 3, specifically Jade Coin Gain!"
            }),
        new JadeUpgradeBase(14, <JadeUpgradeModel>{
                "name": "MSA Expander III",
                "costA": 500,
                "costB": 1,
                "imageId": 14,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to the Miniature Soul Apparatus in World 3, specifically All Essence Gain!"
            }),
        new JadeUpgradeBase(15, <JadeUpgradeModel>{
                "name": "Deal Sweetening",
                "costA": 500,
                "costB": 1,
                "imageId": 15,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Earn +25% more Magic Beans from the mysterious Legumulyte bean merchant found in the Troll Broodnest map."
            }),
        new JadeUpgradeBase(16, <JadeUpgradeModel>{
                "name": "No Meal Left Behind",
                "costA": 500,
                "costB": 1,
                "imageId": 16,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Every 24 hours, your lowest level Meal gets +1 Lv. This only works on Meals Lv 2 or higher, and doesn't trigger on days you don't play."
            }),
        new JadeUpgradeBase(17, <JadeUpgradeModel>{
                "name": "Jade Coin Magnetism",
                "costA": 500,
                "costB": 1,
                "imageId": 17,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus of +5% Jade Coin Gain per 10 items found after 1000 items, as shown at The Slab in World 5."
            }),
        new JadeUpgradeBase(18, <JadeUpgradeModel>{
                "name": "Essence Confetti",
                "costA": 500,
                "costB": 1,
                "imageId": 18,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus of +3% All Essence Gain per 10 items found after 1000 items, as shown at The Slab in World 5."
            }),
        new JadeUpgradeBase(19, <JadeUpgradeModel>{
                "name": "Shrine Collective Bargaining Agreement",
                "costA": 500,
                "costB": 1,
                "imageId": 19,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Shrines no longer lose EXP when moved around, so you can finally bring those baddies out of retirement!"
            }),
        new JadeUpgradeBase(20, <JadeUpgradeModel>{
                "name": "Papa Blob's Quality Guarantee",
                "costA": 500,
                "costB": 1,
                "imageId": 20,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Increases the Max Level of all cooking meals by +10. Better meals, better levels, Papa Blob's."
            }),
        new JadeUpgradeBase(21, <JadeUpgradeModel>{
                "name": "Chef Geustloaf's Cutting Edge Philosophy",
                "costA": 500,
                "costB": 1,
                "imageId": 21,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Increases the Max Level of all cooking meals by +10 again! But oh hoho, you sir are no Chef Geustloaf! Good luck cooking to these LVs!"
            }),
        new JadeUpgradeBase(22, <JadeUpgradeModel>{
                "name": "Crop Depot Scientist",
                "costA": 500,
                "costB": 1,
                "imageId": 22,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Employs a friendly scientist blobulyte to keep a Data Sheet of all the crops you've ever found!"
            }),
        new JadeUpgradeBase(23, <JadeUpgradeModel>{
                "name": "Science Environmentally Sourced Pencil",
                "costA": 500,
                "costB": 1,
                "imageId": 23,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+15% Cash from Mobs' per crop found!"
            }),
        new JadeUpgradeBase(24, <JadeUpgradeModel>{
                "name": "Science Pen",
                "costA": 500,
                "costB": 1,
                "imageId": 24,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '1.02x Plant Evolution Chance in Gaming (multiplicative)' per Crop!"
            }),
        new JadeUpgradeBase(25, <JadeUpgradeModel>{
                "name": "Science Marker",
                "costA": 500,
                "costB": 1,
                "imageId": 25,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+8% Jade Coin Gain' per Crop!"
            }),
        new JadeUpgradeBase(26, <JadeUpgradeModel>{
                "name": "Science Featherpen",
                "costA": 500,
                "costB": 1,
                "imageId": 26,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '1.10x Cooking Speed (multiplicative)' per Crop!"
            }),
        new JadeUpgradeBase(27, <JadeUpgradeModel>{
                "name": "Reinforced Science Pencil",
                "costA": 500,
                "costB": 1,
                "imageId": 27,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+20% Total Damage' per Crop!"
            }),
        new JadeUpgradeBase(28, <JadeUpgradeModel>{
                "name": "Science Crayon",
                "costA": 500,
                "costB": 1,
                "imageId": 28,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+7% Shiny Pet Lv Up Rate and Pet Breeding Rate' per Crop!"
            }),
        new JadeUpgradeBase(29, <JadeUpgradeModel>{
                "name": "Science Paintbrush",
                "costA": 500,
                "costB": 1,
                "imageId": 29,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+0.1 Base Critter caught in Trapping' per Crop!"
            }),
        new JadeUpgradeBase(30, <JadeUpgradeModel>{
                "name": "New Critter",
                "costA": 500,
                "costB": 1,
                "imageId": 30,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Unlocks a new critter type to capture! These have their own very special vial in Alchemy."
            }),
        new JadeUpgradeBase(31, <JadeUpgradeModel>{
                "name": "Ionized Sigils",
                "costA": 500,
                "costB": 1,
                "imageId": 31,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Sigils can now be upgraded a 3rd time. Push past lame ol' yellow, and further increasing those sigil boosts!"
            }),
        new JadeUpgradeBase(32, <JadeUpgradeModel>{
                "name": "The Endercaptain",
                "costA": 500,
                "costB": 1,
                "imageId": 32,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds the Endercaptain to Recruitment pool. They're very rare, and have a hidden account-wide +25% Loot Multi and Artifact Find."
            }),
        new JadeUpgradeBase(33, <JadeUpgradeModel>{
                "name": "True Godly Blessings",
                "costA": 500,
                "costB": 1,
                "imageId": 33,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "All Divinity Gods give 1.05x higher Blessing bonus per God Rank. Whats a Blessing bonus? Select a god, it's the one on the bottom, go look."
            }),
        new JadeUpgradeBase(34, <JadeUpgradeModel>{
                "name": "Brighter Lighthouse Bulb",
                "costA": 500,
                "costB": 1,
                "imageId": 34,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "You can now find 3 additional Artifacts from The Edge island."
            }),
        new JadeUpgradeBase(35, <JadeUpgradeModel>{
                "name": "Sovereign Artifacts",
                "costA": 500,
                "costB": 1,
                "imageId": 35,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "You can now find Sovereign Artifacts from sailing, but only if you've found the Eldritch form first."
            }),
        new JadeUpgradeBase(36, <JadeUpgradeModel>{
                "name": "New Bribes",
                "costA": 500,
                "costB": 1,
                "imageId": 36,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Mr. Pigibank is up to no good once again, and he's looking to get some funding from his favorite patron... you. Well, your wallet specifically."
            }),
        new JadeUpgradeBase(37, <JadeUpgradeModel>{
                "name": "Laboratory Bling",
                "costA": 500,
                "costB": 1,
                "imageId": 37,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds 3 new Jewels to unlock at the Jewel Spinner in W4 Town. Or, get one for free every 700 total Lab LV as shown in Rift Skill Mastery."
            }),
        new JadeUpgradeBase(38, <JadeUpgradeModel>{
                "name": "IDK YET",
                "costA": 500,
                "costB": 1,
                "imageId": 38,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(39, <JadeUpgradeModel>{
                "name": "UNDER CONSTRUCTION",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "This bonus isn't out yet, so you cant buy it! Please come back in a few updates there'll be more floors to sneak up to as well!"
            }),
        new JadeUpgradeBase(40, <JadeUpgradeModel>{
                "name": "UNDER CONSTRUCTION",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "This bonus isn't out yet, so you cant buy it! Please come back in a few updates, specifically the sneaking related updates!"
            }),
        new JadeUpgradeBase(41, <JadeUpgradeModel>{
                "name": "UNDER CONSTRUCTION",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "This bonus isn't out yet, so you cant buy it! Please come back in a few updates, I made myself clear before!"
            }),
        new JadeUpgradeBase(42, <JadeUpgradeModel>{
                "name": "UNDER CONSTRUCTION",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "This bonus isn't out yet. 'nuff said."
            }),
        new JadeUpgradeBase(43, <JadeUpgradeModel>{
                "name": "IDK YET",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(44, <JadeUpgradeModel>{
                "name": "IDK YET",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(45, <JadeUpgradeModel>{
                "name": "IDK YET",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(46, <JadeUpgradeModel>{
                "name": "IDK YET",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(47, <JadeUpgradeModel>{
                "name": "IDK YET",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(48, <JadeUpgradeModel>{
                "name": "IDK YET",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(49, <JadeUpgradeModel>{
                "name": "IDK YET",
                "costA": 500,
                "costB": 1,
                "imageId": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            })    
]
}
