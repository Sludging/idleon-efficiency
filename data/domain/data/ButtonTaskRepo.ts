import { ButtonTaskModel } from '../model/buttonTaskModel';

export class ButtonTaskBase { constructor(public index: number, public data: ButtonTaskModel) { } }



export const initButtonTaskRepo = () => {
    return [    
        new ButtonTaskBase(0, <ButtonTaskModel>{
                "index": 0,
                "description": "Have a total of { STR or more",
                "baseRequirement": 1000,
                "scalingType": "exponent",
                "scalingValue": 1.045,
                "x4": 0,
                "cycleIndexes": [34, 56]
            }),
        new ButtonTaskBase(1, <ButtonTaskModel>{
                "index": 1,
                "description": "Have a total of { AGI or more",
                "baseRequirement": 1000,
                "scalingType": "exponent",
                "scalingValue": 1.045,
                "x4": 0,
                "cycleIndexes": [15, 73]
            }),
        new ButtonTaskBase(2, <ButtonTaskModel>{
                "index": 2,
                "description": "Have a total of { WIS or more",
                "baseRequirement": 1000,
                "scalingType": "exponent",
                "scalingValue": 1.045,
                "x4": 0,
                "cycleIndexes": [16, 48]
            }),
        new ButtonTaskBase(3, <ButtonTaskModel>{
                "index": 3,
                "description": "Have a total of { LUK or more",
                "baseRequirement": 400,
                "scalingType": "exponent",
                "scalingValue": 1.04,
                "x4": 0,
                "cycleIndexes": [6, 86]
            }),
        new ButtonTaskBase(4, <ButtonTaskModel>{
                "index": 4,
                "description": "Have { of the 1st type of Deathbringer Bones in your Grimoire",
                "baseRequirement": 5000,
                "scalingType": "exponent",
                "scalingValue": 1.18,
                "x4": 0,
                "cycleIndexes": [29, 61]
            }),
        new ButtonTaskBase(5, <ButtonTaskModel>{
                "index": 5,
                "description": "Have { of the 2nd type of Windwalker Dust in your Compass",
                "baseRequirement": 3000,
                "scalingType": "exponent",
                "scalingValue": 1.16,
                "x4": 0,
                "cycleIndexes": [26, 69]
            }),
        new ButtonTaskBase(6, <ButtonTaskModel>{
                "index": 6,
                "description": "Have { of the 3rd type of Arcane Cultist Tachyon in your Tesseract",
                "baseRequirement": 1500,
                "scalingType": "exponent",
                "scalingValue": 1.14,
                "x4": 0,
                "cycleIndexes": [3, 55]
            }),
        new ButtonTaskBase(7, <ButtonTaskModel>{
                "index": 7,
                "description": "Have { of the 4rd type of Arcane Cultist Tachyon in your Tesseract",
                "baseRequirement": 1000,
                "scalingType": "exponent",
                "scalingValue": 1.12,
                "x4": 0,
                "cycleIndexes": [41, 81]
            }),
        new ButtonTaskBase(8, <ButtonTaskModel>{
                "index": 8,
                "description": "Level up your DRAGON Statue to at least LV",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 1.5,
                "x4": 1,
                "cycleIndexes": [42, 77]
            }),
        new ButtonTaskBase(9, <ButtonTaskModel>{
                "index": 9,
                "description": "Level up your MINING Statue to at least LV",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 1.5,
                "x4": 1,
                "cycleIndexes": [20, 21]
            }),
        new ButtonTaskBase(10, <ButtonTaskModel>{
                "index": 10,
                "description": "Level up your LUMBERBOB Statue to at least LV",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 1.5,
                "x4": 1,
                "cycleIndexes": [60, 68]
            }),
        new ButtonTaskBase(11, <ButtonTaskModel>{
                "index": 11,
                "description": "Level up your OCEANMAN Statue to at least LV",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 1.5,
                "x4": 1,
                "cycleIndexes": [9, 10]
            }),
        new ButtonTaskBase(12, <ButtonTaskModel>{
                "index": 12,
                "description": "Level up your OL RELIABLE Statue to at least LV",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 1.5,
                "x4": 1,
                "cycleIndexes": [47, 51]
            }),
        new ButtonTaskBase(13, <ButtonTaskModel>{
                "index": 13,
                "description": "Level up your BOX Statue to at least LV",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 1.5,
                "x4": 1,
                "cycleIndexes": [25, 36]
            }),
        new ButtonTaskBase(14, <ButtonTaskModel>{
                "index": 14,
                "description": "Level up your TWOSOUL Statue to at least LV",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 1.5,
                "x4": 1,
                "cycleIndexes": [19, 82]
            }),
        new ButtonTaskBase(15, <ButtonTaskModel>{
                "index": 15,
                "description": "Have a x Class EXP multi or higher",
                "baseRequirement": 100,
                "scalingType": "exponent",
                "scalingValue": 1.15,
                "x4": 0,
                "cycleIndexes": [2, 33]
            }),
        new ButtonTaskBase(16, <ButtonTaskModel>{
                "index": 16,
                "description": "Have a x Drop Rate multi or higher",
                "baseRequirement": 25,
                "scalingType": "exponent",
                "scalingValue": 1.031,
                "x4": 0,
                "cycleIndexes": [18, 76]
            }),
        new ButtonTaskBase(17, <ButtonTaskModel>{
                "index": 17,
                "description": "Level up your Crystallin Stamp to at least LV",
                "baseRequirement": 25,
                "scalingType": "linear",
                "scalingValue": 1.6,
                "x4": 1,
                "cycleIndexes": [46, 65]
            }),
        new ButtonTaskBase(18, <ButtonTaskModel>{
                "index": 18,
                "description": "Level up your Roid Ragin Bubble to at least LV",
                "baseRequirement": 200,
                "scalingType": "exponent",
                "scalingValue": 1.035,
                "x4": 0,
                "cycleIndexes": [30, 92]
            }),
        new ButtonTaskBase(19, <ButtonTaskModel>{
                "index": 19,
                "description": "Level up your Swift Steppin Bubble to at least LV",
                "baseRequirement": 200,
                "scalingType": "exponent",
                "scalingValue": 1.035,
                "x4": 0,
                "cycleIndexes": [7, 64]
            }),
        new ButtonTaskBase(20, <ButtonTaskModel>{
                "index": 20,
                "description": "Level up your Stable Jenius Bubble to at least LV",
                "baseRequirement": 200,
                "scalingType": "exponent",
                "scalingValue": 1.035,
                "x4": 0,
                "cycleIndexes": [39, 85]
            }),
        new ButtonTaskBase(21, <ButtonTaskModel>{
                "index": 21,
                "description": "Have a Construction Build Rate of at least /hr",
                "baseRequirement": 50000000,
                "scalingType": "exponent",
                "scalingValue": 1.13,
                "x4": 0,
                "cycleIndexes": [40, 75]
            }),
        new ButtonTaskBase(22, <ButtonTaskModel>{
                "index": 22,
                "description": "Have a 3d Printer sample of Copper Ore of at least /hr",
                "baseRequirement": 100000,
                "scalingType": "exponent",
                "scalingValue": 1.15,
                "x4": 0,
                "cycleIndexes": [17, 52]
            }),
        new ButtonTaskBase(23, <ButtonTaskModel>{
                "index": 23,
                "description": "Save up { Feathers for your pal Orion",
                "baseRequirement": 1000000000,
                "scalingType": "exponent",
                "scalingValue": 1.5,
                "x4": 0,
                "cycleIndexes": [14, 72]
            }),
        new ButtonTaskBase(24, <ButtonTaskModel>{
                "index": 24,
                "description": "Have a total of { Waves, according to your Miniature Soul Apparatus",
                "baseRequirement": 500,
                "scalingType": "linear",
                "scalingValue": 3.5,
                "x4": 1,
                "cycleIndexes": [11, 58]
            }),
        new ButtonTaskBase(25, <ButtonTaskModel>{
                "index": 25,
                "description": "Have a Breeding Mob with at least { power in your 1st storage slot",
                "baseRequirement": 25000,
                "scalingType": "exponent",
                "scalingValue": 1.023,
                "x4": 0,
                "cycleIndexes": [57, 88]
            }),
        new ButtonTaskBase(26, <ButtonTaskModel>{
                "index": 26,
                "description": "Have a Foraging Speed of at least { in the Desert Oasis Breeding grounds",
                "baseRequirement": 100000,
                "scalingType": "exponent",
                "scalingValue": 1.047,
                "x4": 0,
                "cycleIndexes": [22, 28]
            }),
        new ButtonTaskBase(27, <ButtonTaskModel>{
                "index": 27,
                "description": "Put a Tier { or better Ribbon on Yumi Peachring in Cooking",
                "baseRequirement": 5,
                "scalingType": "step",
                "scalingValue": 20,
                "x4": 1,
                "cycleIndexes": [79, 80]
            }),
        new ButtonTaskBase(28, <ButtonTaskModel>{
                "index": 28,
                "description": "Level up your Sausy Sausage meal to at least LV",
                "baseRequirement": 25,
                "scalingType": "step",
                "scalingValue": 2.5,
                "x4": 1,
                "cycleIndexes": [4, 31]
            }),
        new ButtonTaskBase(29, <ButtonTaskModel>{
                "index": 29,
                "description": "Have a Tome Score of at least { PTS",
                "baseRequirement": 5000,
                "scalingType": "exponent",
                "scalingValue": 1.011,
                "x4": 0,
                "cycleIndexes": [66, 94]
            }),
        new ButtonTaskBase(30, <ButtonTaskModel>{
                "index": 30,
                "description": "Reach Laboratory LV { or higher",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 3,
                "x4": 1,
                "cycleIndexes": [44, 67]
            }),
        new ButtonTaskBase(31, <ButtonTaskModel>{
                "index": 31,
                "description": "Reach Sneaking LV { or higher",
                "baseRequirement": 200,
                "scalingType": "linear",
                "scalingValue": 4.3,
                "x4": 1,
                "cycleIndexes": [23, 49]
            }),
        new ButtonTaskBase(32, <ButtonTaskModel>{
                "index": 32,
                "description": "Reach Spelunking LV { or higher",
                "baseRequirement": 25,
                "scalingType": "linear",
                "scalingValue": 1.3,
                "x4": 1,
                "cycleIndexes": [1, 78]
            }),
        new ButtonTaskBase(33, <ButtonTaskModel>{
                "index": 33,
                "description": "Reach Mining LV { or higher",
                "baseRequirement": 75,
                "scalingType": "step",
                "scalingValue": 2,
                "x4": 1,
                "cycleIndexes": [53, 62]
            }),
        new ButtonTaskBase(34, <ButtonTaskModel>{
                "index": 34,
                "description": "Reach Choppin LV { or higher",
                "baseRequirement": 75,
                "scalingType": "step",
                "scalingValue": 2,
                "x4": 1,
                "cycleIndexes": [5, 32]
            }),
        new ButtonTaskBase(35, <ButtonTaskModel>{
                "index": 35,
                "description": "Reach Divinity LV { or higher",
                "baseRequirement": 100,
                "scalingType": "linear",
                "scalingValue": 2.5,
                "x4": 1,
                "cycleIndexes": [37, 87]
            }),
        new ButtonTaskBase(36, <ButtonTaskModel>{
                "index": 36,
                "description": "Save up { Divinity PTS",
                "baseRequirement": 1000000,
                "scalingType": "exponent",
                "scalingValue": 1.1,
                "x4": 0,
                "cycleIndexes": [70, 84]
            }),
        new ButtonTaskBase(37, <ButtonTaskModel>{
                "index": 37,
                "description": "Save up { bars of gold in Sailing",
                "baseRequirement": 1000000,
                "scalingType": "exponent",
                "scalingValue": 1.13,
                "x4": 0,
                "cycleIndexes": [13, 54]
            }),
        new ButtonTaskBase(38, <ButtonTaskModel>{
                "index": 38,
                "description": "Have a total Artifact Find Chance multi of x or higher in Sailing",
                "baseRequirement": 1000,
                "scalingType": "exponent",
                "scalingValue": 1.037,
                "x4": 0,
                "cycleIndexes": [12, 91]
            }),
        new ButtonTaskBase(39, <ButtonTaskModel>{
                "index": 39,
                "description": "Save up { Gaming Bits",
                "baseRequirement": 1000000000,
                "scalingType": "exponent",
                "scalingValue": 3,
                "x4": 0,
                "cycleIndexes": [59, 71]
            }),
        new ButtonTaskBase(40, <ButtonTaskModel>{
                "index": 40,
                "description": "Evolve a total of { Plants in Gaming, as shown by your Elegant Seashell",
                "baseRequirement": 1000,
                "scalingType": "exponent",
                "scalingValue": 1.042,
                "x4": 0,
                "cycleIndexes": [38, 90]
            }),
        new ButtonTaskBase(41, <ButtonTaskModel>{
                "index": 41,
                "description": "Have a total Palette Multi of x or higher in Gaming",
                "baseRequirement": 10,
                "scalingType": "exponent",
                "scalingValue": 1.021,
                "x4": 0,
                "cycleIndexes": [27, 74]
            }),
        new ButtonTaskBase(42, <ButtonTaskModel>{
                "index": 42,
                "description": "Find at least { items, as shown by the Slab",
                "baseRequirement": 500,
                "scalingType": "linear",
                "scalingValue": 6,
                "x4": 1,
                "cycleIndexes": [0, 43]
            }),
        new ButtonTaskBase(43, <ButtonTaskModel>{
                "index": 43,
                "description": "Save up { White Essence in Summoning",
                "baseRequirement": 1000000000,
                "scalingType": "exponent",
                "scalingValue": 1.3,
                "x4": 0,
                "cycleIndexes": [95]
            }),
        new ButtonTaskBase(44, <ButtonTaskModel>{
                "index": 44,
                "description": "Reach a total of { Total Career Wins in Summoning",
                "baseRequirement": 50,
                "scalingType": "linear",
                "scalingValue": 2,
                "x4": 1,
                "cycleIndexes": [83]
            }),
        new ButtonTaskBase(45, <ButtonTaskModel>{
                "index": 45,
                "description": "Check a Crop Transfer Ticket worth at least { Magic Beans",
                "baseRequirement": 10000,
                "scalingType": "exponent",
                "scalingValue": 1.06,
                "x4": 0,
                "cycleIndexes": [50]
            }),
        new ButtonTaskBase(46, <ButtonTaskModel>{
                "index": 46,
                "description": "Save up { Jade from the Ninja Castle",
                "baseRequirement": 1000000,
                "scalingType": "exponent",
                "scalingValue": 2.5,
                "x4": 0,
                "cycleIndexes": [98]
            }),
        new ButtonTaskBase(47, <ButtonTaskModel>{
                "index": 47,
                "description": "Have a total of {% Golden Food Bonus, as shown by The Beanstalk",
                "baseRequirement": 500,
                "scalingType": "linear",
                "scalingValue": 100,
                "x4": 1,
                "cycleIndexes": [24]
            }),
        new ButtonTaskBase(48, <ButtonTaskModel>{
                "index": 48,
                "description": "Find a total of { Crops, as shown by your Crop Scientist",
                "baseRequirement": 70,
                "scalingType": "linear",
                "scalingValue": 1,
                "x4": 1,
                "cycleIndexes": [89]
            }),
        new ButtonTaskBase(49, <ButtonTaskModel>{
                "index": 49,
                "description": "Have a max damage range of { crystal damage, as shown in Player Info",
                "baseRequirement": 100,
                "scalingType": "exponent",
                "scalingValue": 1.09,
                "x4": 0,
                "cycleIndexes": [97]
            }),
        new ButtonTaskBase(50, <ButtonTaskModel>{
                "index": 50,
                "description": "Have a total Spelunking POW of { or more",
                "baseRequirement": 1000000000,
                "scalingType": "exponent",
                "scalingValue": 1.22,
                "x4": 0,
                "cycleIndexes": [93]
            }),
        new ButtonTaskBase(51, <ButtonTaskModel>{
                "index": 51,
                "description": "Have a Best Depth of at least { in Chucklemire",
                "baseRequirement": 40,
                "scalingType": "step",
                "scalingValue": 2,
                "x4": 1,
                "cycleIndexes": [99]
            }),
        new ButtonTaskBase(52, <ButtonTaskModel>{
                "index": 52,
                "description": "Save up { Coins in your inventory... like, money, those coins",
                "baseRequirement": 1000000000,
                "scalingType": "exponent",
                "scalingValue": 1.55,
                "x4": 0,
                "cycleIndexes": [45]
            }),
        new ButtonTaskBase(53, <ButtonTaskModel>{
                "index": 53,
                "description": "Reach Showdown { or higher at the Emperor's Castle in World 6",
                "baseRequirement": 25,
                "scalingType": "step",
                "scalingValue": 2,
                "x4": 0,
                "cycleIndexes": [63]
            }),
        new ButtonTaskBase(54, <ButtonTaskModel>{
                "index": 54,
                "description": "Save up { Bucks at your Sushi Station",
                "baseRequirement": 1000000,
                "scalingType": "exponent",
                "scalingValue": 1.34,
                "x4": 0,
                "cycleIndexes": [8]
            }),
        new ButtonTaskBase(55, <ButtonTaskModel>{
                "index": 55,
                "description": "Save up { Fish for your pal Poppy",
                "baseRequirement": 1000000000,
                "scalingType": "exponent",
                "scalingValue": 1.28,
                "x4": 0,
                "cycleIndexes": [96]
            }),
        new ButtonTaskBase(56, <ButtonTaskModel>{
                "index": 56,
                "description": "Save up { Meat Slices for best friend Bubba",
                "baseRequirement": 1000000,
                "scalingType": "exponent",
                "scalingValue": 1.15,
                "x4": 0,
                "cycleIndexes": [35]
            })    
]
}
