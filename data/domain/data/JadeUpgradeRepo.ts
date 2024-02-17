import { JadeUpgradeModel } from '../model/jadeUpgradeModel';

export class JadeUpgradeBase { constructor(public index: number, public data: JadeUpgradeModel) { } }



export const initJadeUpgradeRepo = () => {
    return [    
        new JadeUpgradeBase(0, <JadeUpgradeModel>{
                "name": "Quick Ref Access",
                "x1": 500,
                "x2": 1,
                "x3": 0,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds the Sneaking skill to your QuickRef menu! Manage your Ninja Twins from anywhere!"
            }),
        new JadeUpgradeBase(1, <JadeUpgradeModel>{
                "name": "Gold Food Beanstalk",
                "x1": 500,
                "x2": 1,
                "x3": 1,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Grows a giant beanstalk behind the ninja castle! Drop a stack of 10,000 Gold Food to add it with the beanstalk and permanently gain its bonus!"
            }),
        new JadeUpgradeBase(2, <JadeUpgradeModel>{
                "name": "Supersized Gold Beanstacking",
                "x1": 500,
                "x2": 1,
                "x3": 2,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "You can now drop a stack of 100,000 Gold Food to supersize it! This will obviously give a bigger bonus, and will even enlargen the food on the stalk!"
            }),
        new JadeUpgradeBase(3, <JadeUpgradeModel>{
                "name": "Charmed, I'm Sure",
                "x1": 500,
                "x2": 1,
                "x3": 3,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "All your Ninja Twins can now equip two of the same charm at once!"
            }),
        new JadeUpgradeBase(4, <JadeUpgradeModel>{
                "name": "Mob Cosplay Craze",
                "x1": 500,
                "x2": 1,
                "x3": 4,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Certain monsters in World 6 will now have a rare chance to drop Ninja Hats, but only the hats that your Ninja Twins have equipped."
            }),
        new JadeUpgradeBase(5, <JadeUpgradeModel>{
                "name": "Level Exemption",
                "x1": 500,
                "x2": 1,
                "x3": 5,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Completely and utterly removes the UNDER-LEVELED bonus reduction of all stamps in your collection, now and forever. Amen."
            }),
        new JadeUpgradeBase(6, <JadeUpgradeModel>{
                "name": "Gaming to the MAX",
                "x1": 500,
                "x2": 1,
                "x3": 6,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "All plant types in Gaming have +1 Max Evolution, but this one is 50,000x rarer than normal and will make you wonder if evolution is even real (it is)"
            }),
        new JadeUpgradeBase(7, <JadeUpgradeModel>{
                "name": "Revenge of the Pickle",
                "x1": 500,
                "x2": 1,
                "x3": 7,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new boss page to the left of World 1 in Deathnote. Each BoneJoePickle in your inventory counts as +1 Boss Deathnote Kill!"
            }),
        new JadeUpgradeBase(8, <JadeUpgradeModel>{
                "name": "The Artifact Matrix",
                "x1": 500,
                "x2": 1,
                "x3": 8,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Extends the Laboratory Event Horizon, adding another bonus to connect to! In particular, a boost to Artifact Find Chance!"
            }),
        new JadeUpgradeBase(9, <JadeUpgradeModel>{
                "name": "The Slab Matrix",
                "x1": 500,
                "x2": 1,
                "x3": 9,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Further extends the Laboratory Event Horizon, adding another bonus to connect to! In particular, a boost to all bonuses from the Slab!"
            }),
        new JadeUpgradeBase(10, <JadeUpgradeModel>{
                "name": "The Spirit Matrix",
                "x1": 500,
                "x2": 1,
                "x3": 10,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Even further extends the Laboratory Event Horizon, adding another bonus to connect to! In particular, a boost to W6 Skill exp gain!"
            }),
        new JadeUpgradeBase(11, <JadeUpgradeModel>{
                "name": "The Crop Matrix",
                "x1": 500,
                "x2": 1,
                "x3": 11,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Yet again even further extends the Laboratory Event Horizon, adding another bonus to connect to! In particular, a boost to Crop Depot!"
            }),
        new JadeUpgradeBase(12, <JadeUpgradeModel>{
                "name": "MSA Expander I",
                "x1": 500,
                "x2": 1,
                "x3": 12,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to the Miniature Soul Apparatus in World 3, specifically Farming EXP!"
            }),
        new JadeUpgradeBase(13, <JadeUpgradeModel>{
                "name": "MSA Expander II",
                "x1": 500,
                "x2": 1,
                "x3": 13,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to the Miniature Soul Apparatus in World 3, specifically Jade Coin Gain!"
            }),
        new JadeUpgradeBase(14, <JadeUpgradeModel>{
                "name": "MSA Expander III",
                "x1": 500,
                "x2": 1,
                "x3": 14,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to the Miniature Soul Apparatus in World 3, specifically All Essence Gain!"
            }),
        new JadeUpgradeBase(15, <JadeUpgradeModel>{
                "name": "Deal Sweetening",
                "x1": 500,
                "x2": 1,
                "x3": 15,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Earn +25% more Magic Beans from the mysterious Legumulyte bean merchant found in the Troll Broodnest map."
            }),
        new JadeUpgradeBase(16, <JadeUpgradeModel>{
                "name": "No Meal Left Behind",
                "x1": 500,
                "x2": 1,
                "x3": 16,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Every 24 hours, your lowest level Meal gets +1 Lv. This only works on Meals Lv 5 or higher, and doesn't trigger on days you don't play."
            }),
        new JadeUpgradeBase(17, <JadeUpgradeModel>{
                "name": "Jade Coin Magnetism",
                "x1": 500,
                "x2": 1,
                "x3": 17,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus of +5% Jade Coin Gain per 10 items found after 1000 items, as shown at The Slab in World 5."
            }),
        new JadeUpgradeBase(18, <JadeUpgradeModel>{
                "name": "Essence Confetti",
                "x1": 500,
                "x2": 1,
                "x3": 18,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus of +3% All Essence Gain per 10 items found after 1000 items, as shown at The Slab in World 5."
            }),
        new JadeUpgradeBase(19, <JadeUpgradeModel>{
                "name": "Shrine Collective Bargaining Agreement",
                "x1": 500,
                "x2": 1,
                "x3": 19,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Shrines no longer lose EXP when moved around, so you can finally bring those baddies out of retirement!"
            }),
        new JadeUpgradeBase(20, <JadeUpgradeModel>{
                "name": "Papa Blob's Quality Guarantee",
                "x1": 500,
                "x2": 1,
                "x3": 20,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Increases the Max Level of all cooking meals by +10. Better meals, better levels, Papa Blob's."
            }),
        new JadeUpgradeBase(21, <JadeUpgradeModel>{
                "name": "Chef Geustloaf's Cutting Edge Philosophy",
                "x1": 500,
                "x2": 1,
                "x3": 21,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Increases the Max Level of all cooking meals by +10 again! But oh hoho, you sir are no Chef Geustloaf! Good luck cooking to these LVs!"
            }),
        new JadeUpgradeBase(22, <JadeUpgradeModel>{
                "name": "Crop Depot Scientist",
                "x1": 500,
                "x2": 1,
                "x3": 22,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Employs a friendly scientist blobulyte to keep a Data Sheet of all the crops you've ever found!"
            }),
        new JadeUpgradeBase(23, <JadeUpgradeModel>{
                "name": "Science Environmentally Sourced Pencil",
                "x1": 500,
                "x2": 1,
                "x3": 23,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+15% Cash from Mobs' per crop found!"
            }),
        new JadeUpgradeBase(24, <JadeUpgradeModel>{
                "name": "Science Pen",
                "x1": 500,
                "x2": 1,
                "x3": 24,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '1.02x Plant Evolution Chance in Gaming (multiplicative)' per Crop!"
            }),
        new JadeUpgradeBase(25, <JadeUpgradeModel>{
                "name": "Science Marker",
                "x1": 500,
                "x2": 1,
                "x3": 25,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+8% Jade Coin Gain' per Crop!"
            }),
        new JadeUpgradeBase(26, <JadeUpgradeModel>{
                "name": "Science Featherpen",
                "x1": 500,
                "x2": 1,
                "x3": 26,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '1.10x Cooking Speed (multiplicative)' per Crop!"
            }),
        new JadeUpgradeBase(27, <JadeUpgradeModel>{
                "name": "Reinforced Science Pencil",
                "x1": 500,
                "x2": 1,
                "x3": 27,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+20% Total Damage' per Crop!"
            }),
        new JadeUpgradeBase(28, <JadeUpgradeModel>{
                "name": "Science Crayon",
                "x1": 500,
                "x2": 1,
                "x3": 28,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Adds a new bonus type to your crop scientist's Data Sheet! Specifically '+7% Shiny Pet Lv Up Rate and Pet Breeding Rate' per Crop!"
            }),
        new JadeUpgradeBase(29, <JadeUpgradeModel>{
                "name": "UNDER CONSTRUCTION",
                "x1": 500,
                "x2": 1,
                "x3": 29,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "This bonus isn't out yet, so you cant buy it! Please come back in a few updates there'll be more floors to sneak up to as well!"
            }),
        new JadeUpgradeBase(30, <JadeUpgradeModel>{
                "name": "UNDER CONSTRUCTION",
                "x1": 500,
                "x2": 1,
                "x3": 30,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "This bonus isn't out yet, so you cant buy it! Please come back in a few updates, specifically the sneaking related updates!"
            }),
        new JadeUpgradeBase(31, <JadeUpgradeModel>{
                "name": "UNDER CONSTRUCTION",
                "x1": 500,
                "x2": 1,
                "x3": 31,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "This bonus isn't out yet, so you cant buy it! Please come back in a few updates, I made myself clear before!"
            }),
        new JadeUpgradeBase(32, <JadeUpgradeModel>{
                "name": "UNDER CONSTRUCTION",
                "x1": 500,
                "x2": 1,
                "x3": 32,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "This bonus isn't out yet, so you cant buy it! Please come back in a few updates!"
            }),
        new JadeUpgradeBase(33, <JadeUpgradeModel>{
                "name": "NAME NEEDED",
                "x1": 500,
                "x2": 1,
                "x3": 33,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "All Divinity Gods give 1.05x higher Blessing bonus (the passive bonus that affects all characters always) per God Rank."
            }),
        new JadeUpgradeBase(34, <JadeUpgradeModel>{
                "name": "NAME NEEDED",
                "x1": 500,
                "x2": 1,
                "x3": 34,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "idk"
            }),
        new JadeUpgradeBase(35, <JadeUpgradeModel>{
                "name": "Sovereign Artifacts",
                "x1": 500,
                "x2": 1,
                "x3": 35,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "idk"
            }),
        new JadeUpgradeBase(36, <JadeUpgradeModel>{
                "name": "INSERT SUMMONING 3",
                "x1": 500,
                "x2": 1,
                "x3": 36,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(37, <JadeUpgradeModel>{
                "name": "INSERT SUMMONING 4",
                "x1": 500,
                "x2": 1,
                "x3": 37,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(38, <JadeUpgradeModel>{
                "name": "IDK YET",
                "x1": 500,
                "x2": 1,
                "x3": 38,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            }),
        new JadeUpgradeBase(39, <JadeUpgradeModel>{
                "name": "IDK YET",
                "x1": 500,
                "x2": 1,
                "x3": 39,
                "filler1": "filler",
                "filler2": "filler",
                "bonus": "Idk yet"
            })    
]
}
