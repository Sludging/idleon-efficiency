import { ResearchObservationModel } from '../model/researchObservationModel';

export class ResearchObservationBase { constructor(public index: number, public data: ResearchObservationModel) { } }



export const initResearchObservationRepo = () => {
    return [    
        new ResearchObservationBase(0, <ResearchObservationModel>{
                "index": 0,
                "name": "Bored Tree",
                "requiredResearchLevel": 1,
                "mapId": 14,
                "x": 553,
                "y": 484,
                "x5": 1,
                "discoveryRollRequirement": 1,
                "hint": "Found in World 1, where boredom meets bean"
            }),
        new ResearchObservationBase(1, <ResearchObservationModel>{
                "index": 1,
                "name": "Shopping Oyseter",
                "requiredResearchLevel": 3,
                "mapId": 300,
                "x": 1462,
                "y": 795,
                "x5": 2,
                "discoveryRollRequirement": 30,
                "hint": "Found in World 7 town, inscribed with a four letter word"
            }),
        new ResearchObservationBase(2, <ResearchObservationModel>{
                "index": 2,
                "name": "Bridge Plank",
                "requiredResearchLevel": 5,
                "mapId": 51,
                "x": 658,
                "y": 342,
                "x5": 3,
                "discoveryRollRequirement": 50,
                "hint": "Found in World 2, the only wood pieces east of the Town"
            }),
        new ResearchObservationBase(3, <ResearchObservationModel>{
                "index": 3,
                "name": "Carrot Patch",
                "requiredResearchLevel": 6,
                "mapId": 24,
                "x": 1173,
                "y": 355,
                "x5": 4,
                "discoveryRollRequirement": 60,
                "hint": "Found in World 1, they grow long and orange with a tuft of green"
            }),
        new ResearchObservationBase(4, <ResearchObservationModel>{
                "index": 4,
                "name": "Salty Seawebs",
                "requiredResearchLevel": 8,
                "mapId": 301,
                "x": 993,
                "y": 708,
                "x5": 5,
                "discoveryRollRequirement": 70,
                "hint": "Found in World 7, spun in a cave by a spider you'll never see"
            }),
        new ResearchObservationBase(5, <ResearchObservationModel>{
                "index": 5,
                "name": "Dogbone Tombstone",
                "requiredResearchLevel": 10,
                "mapId": 27,
                "x": 551,
                "y": 337,
                "x5": 6,
                "discoveryRollRequirement": 75,
                "hint": "Found in World 1, the final resting place of a poor villager"
            }),
        new ResearchObservationBase(6, <ResearchObservationModel>{
                "index": 6,
                "name": "Ominous Signage",
                "requiredResearchLevel": 11,
                "mapId": 19,
                "x": 46,
                "y": 632,
                "x5": 8,
                "discoveryRollRequirement": 80,
                "hint": "Found in World 1, pointing you in the right direction to find Amarok"
            }),
        new ResearchObservationBase(7, <ResearchObservationModel>{
                "index": 7,
                "name": "Canyon Pointerino",
                "requiredResearchLevel": 13,
                "mapId": 59,
                "x": 611,
                "y": 458,
                "x5": 5,
                "discoveryRollRequirement": 82,
                "hint": "Found in World 2, one of many arrows leading you to a secret platform"
            }),
        new ResearchObservationBase(8, <ResearchObservationModel>{
                "index": 8,
                "name": "Corange Coral",
                "requiredResearchLevel": 15,
                "mapId": 302,
                "x": 1325,
                "y": 406,
                "x5": 5,
                "discoveryRollRequirement": 85,
                "hint": "Found in World 7, growing among the doodlefish"
            }),
        new ResearchObservationBase(9, <ResearchObservationModel>{
                "index": 9,
                "name": "Oasis Erosion",
                "requiredResearchLevel": 17,
                "mapId": 73,
                "x": 585,
                "y": 415,
                "x5": 5,
                "discoveryRollRequirement": 90,
                "hint": "Found in World 2, these waters are home of the much beloved Poppy"
            }),
        new ResearchObservationBase(10, <ResearchObservationModel>{
                "index": 10,
                "name": "Barnacle Brothers",
                "requiredResearchLevel": 20,
                "mapId": 304,
                "x": 298,
                "y": 581,
                "x5": 5,
                "discoveryRollRequirement": 92,
                "hint": "Found in World 7, covered in a sludge of either snail or slug origin"
            }),
        new ResearchObservationBase(11, <ResearchObservationModel>{
                "index": 11,
                "name": "Green Shallowrock",
                "requiredResearchLevel": 22,
                "mapId": 303,
                "x": 278,
                "y": 661,
                "x5": 5,
                "discoveryRollRequirement": 93,
                "hint": "Found in World 7, growing among the seaweed and stubble of the shallow waters"
            }),
        new ResearchObservationBase(12, <ResearchObservationModel>{
                "index": 12,
                "name": "Broken Spacerocks",
                "requiredResearchLevel": 24,
                "mapId": 154,
                "x": 450,
                "y": 199,
                "x5": 5,
                "discoveryRollRequirement": 93,
                "hint": "Found in World 4, the only broken platform among many walkable ones"
            }),
        new ResearchObservationBase(13, <ResearchObservationModel>{
                "index": 13,
                "name": "Meenie Cactus",
                "requiredResearchLevel": 27,
                "mapId": 69,
                "x": 102,
                "y": 335,
                "x5": 5,
                "discoveryRollRequirement": 94,
                "hint": "Found in World 2, next to the tomb of the late great King"
            }),
        new ResearchObservationBase(14, <ResearchObservationModel>{
                "index": 14,
                "name": "Coraltree Branch",
                "requiredResearchLevel": 30,
                "mapId": 305,
                "x": 155,
                "y": 345,
                "x5": 5,
                "discoveryRollRequirement": 95,
                "hint": "Found in World 7, growing unbelieveably larger than any other coral"
            }),
        new ResearchObservationBase(15, <ResearchObservationModel>{
                "index": 15,
                "name": "Useless Anchor",
                "requiredResearchLevel": 31,
                "mapId": 61,
                "x": 590,
                "y": 169,
                "x5": 5,
                "discoveryRollRequirement": 95,
                "hint": "Found in World 2, sitting atop the board while yearning to be below the waves"
            }),
        new ResearchObservationBase(16, <ResearchObservationModel>{
                "index": 16,
                "name": "Oboe Coral Trio",
                "requiredResearchLevel": 34,
                "mapId": 308,
                "x": 1117,
                "y": 744,
                "x5": 5,
                "discoveryRollRequirement": 96,
                "hint": "Found in World 7, half way up your climb to Pinpoint Summit"
            }),
        new ResearchObservationBase(17, <ResearchObservationModel>{
                "index": 17,
                "name": "Spadespire",
                "requiredResearchLevel": 37,
                "mapId": 70,
                "x": 670,
                "y": 563,
                "x5": 5,
                "discoveryRollRequirement": 96,
                "hint": "Found in World 2, at the enterance of Snakenhotep's Crypt"
            }),
        new ResearchObservationBase(18, <ResearchObservationModel>{
                "index": 18,
                "name": "Seaswept Ruins",
                "requiredResearchLevel": 40,
                "mapId": 307,
                "x": 316,
                "y": 173,
                "x5": 5,
                "discoveryRollRequirement": 97,
                "hint": "Found in World 7, sitting crumbled and defeated under the watchful gaze of Billroy"
            }),
        new ResearchObservationBase(19, <ResearchObservationModel>{
                "index": 19,
                "name": "Tetrino Stones",
                "requiredResearchLevel": 42,
                "mapId": 65,
                "x": 1061,
                "y": 200,
                "x5": 5,
                "discoveryRollRequirement": 97,
                "hint": "Found in World 2, gaming scholars still debate these which sit atop the pyramid"
            }),
        new ResearchObservationBase(20, <ResearchObservationModel>{
                "index": 20,
                "name": "Stalagtite",
                "requiredResearchLevel": 45,
                "mapId": 118,
                "x": 696,
                "y": 159,
                "x5": 5,
                "discoveryRollRequirement": 97,
                "hint": "Found in World 3, tucked away in an igloo where nobody goes no more"
            }),
        new ResearchObservationBase(21, <ResearchObservationModel>{
                "index": 21,
                "name": "OG Secret Rock",
                "requiredResearchLevel": 48,
                "mapId": 64,
                "x": 222,
                "y": 577,
                "x5": 5,
                "discoveryRollRequirement": 98,
                "hint": "Found in World 2, it's the only rock that just feels out of place"
            }),
        new ResearchObservationBase(22, <ResearchObservationModel>{
                "index": 22,
                "name": "Happy Piggy",
                "requiredResearchLevel": 50,
                "mapId": 157,
                "x": 476,
                "y": 249,
                "x5": 5,
                "discoveryRollRequirement": 98,
                "hint": "Found in World 4, where the party never ends"
            }),
        new ResearchObservationBase(23, <ResearchObservationModel>{
                "index": 23,
                "name": "Treeception",
                "requiredResearchLevel": 52,
                "mapId": 18,
                "x": 327,
                "y": 508,
                "x5": 5,
                "discoveryRollRequirement": 99,
                "hint": "Found in World 1, you'll find this tree within, well, another tree"
            }),
        new ResearchObservationBase(24, <ResearchObservationModel>{
                "index": 24,
                "name": "Keymaster",
                "requiredResearchLevel": 55,
                "mapId": 12,
                "x": 729,
                "y": 797,
                "x5": 5,
                "discoveryRollRequirement": 100,
                "hint": "Found in World 1, they're the long forgotten character of a long forgotten game"
            }),
        new ResearchObservationBase(25, <ResearchObservationModel>{
                "index": 25,
                "name": "Space Drip",
                "requiredResearchLevel": 57,
                "mapId": 159,
                "x": 1297,
                "y": 267,
                "x5": 5,
                "discoveryRollRequirement": 100,
                "hint": "Found in World 4, flowing from one region into another"
            }),
        new ResearchObservationBase(26, <ResearchObservationModel>{
                "index": 26,
                "name": "Coralcave Coral",
                "requiredResearchLevel": 60,
                "mapId": 311,
                "x": 1278,
                "y": 447,
                "x5": 5,
                "discoveryRollRequirement": 100,
                "hint": "Found in World 7, at the outskirts of a crustacean kingdom"
            }),
        new ResearchObservationBase(27, <ResearchObservationModel>{
                "index": 27,
                "name": "Unblinking Eye",
                "requiredResearchLevel": 63,
                "mapId": 163,
                "x": 453,
                "y": 410,
                "x5": 5,
                "discoveryRollRequirement": 100,
                "hint": "Found in World 4, with a gaze that's unbreakable and unmistakable"
            }),
        new ResearchObservationBase(28, <ResearchObservationModel>{
                "index": 28,
                "name": "Monster Decoy",
                "requiredResearchLevel": 66,
                "mapId": 315,
                "x": 604,
                "y": 365,
                "x5": 5,
                "discoveryRollRequirement": 101,
                "hint": "Found in World 7, it looks like a monster but aint no monster of mine"
            }),
        new ResearchObservationBase(29, <ResearchObservationModel>{
                "index": 29,
                "name": "Standard Stump",
                "requiredResearchLevel": 70,
                "mapId": 16,
                "x": 271,
                "y": 366,
                "x5": 5,
                "discoveryRollRequirement": 101,
                "hint": "Found in World 1, surrounded by sludge and slime"
            }),
        new ResearchObservationBase(30, <ResearchObservationModel>{
                "index": 30,
                "name": "Big Ol Reef",
                "requiredResearchLevel": 72,
                "mapId": 309,
                "x": 320,
                "y": 892,
                "x5": 5,
                "discoveryRollRequirement": 101,
                "hint": "Found in World 7, sitting off to the left on your final steps to the Summit"
            }),
        new ResearchObservationBase(31, <ResearchObservationModel>{
                "index": 31,
                "name": "Oasis Palm",
                "requiredResearchLevel": 74,
                "mapId": 53,
                "x": 500,
                "y": 222,
                "x5": 5,
                "discoveryRollRequirement": 101,
                "hint": "Found in World 2, the oasis sitting just beyond it's palmy leaves"
            }),
        new ResearchObservationBase(32, <ResearchObservationModel>{
                "index": 32,
                "name": "Stalagmite",
                "requiredResearchLevel": 76,
                "mapId": 110,
                "x": 749,
                "y": 570,
                "x5": 5,
                "discoveryRollRequirement": 102,
                "hint": "Found in World 3, clear as glass and cold as ice"
            }),
        new ResearchObservationBase(33, <ResearchObservationModel>{
                "index": 33,
                "name": "Rope Lamp",
                "requiredResearchLevel": 78,
                "mapId": 62,
                "x": 233,
                "y": 256,
                "x5": 5,
                "discoveryRollRequirement": 102,
                "hint": "Found in World 2, lighting the way and holding the path further into the desert"
            }),
        new ResearchObservationBase(34, <ResearchObservationModel>{
                "index": 34,
                "name": "Unremarkable Rock",
                "requiredResearchLevel": 80,
                "mapId": 312,
                "x": 500,
                "y": 783,
                "x5": 5,
                "discoveryRollRequirement": 102,
                "hint": "Found in World 7, surrounded by what was once the most fearsome foe in the ocean"
            }),
        new ResearchObservationBase(35, <ResearchObservationModel>{
                "index": 35,
                "name": "Standard Mine",
                "requiredResearchLevel": 82,
                "mapId": 316,
                "x": 439,
                "y": 481,
                "x5": 5,
                "discoveryRollRequirement": 103,
                "hint": "Found in World 7, just one floating disaster waiting to happen"
            }),
        new ResearchObservationBase(36, <ResearchObservationModel>{
                "index": 36,
                "name": "Ancient Chainrope",
                "requiredResearchLevel": 84,
                "mapId": 11,
                "x": 544,
                "y": 543,
                "x5": 5,
                "discoveryRollRequirement": 103,
                "hint": "Found in World 1, it leads down to a path that never existed"
            }),
        new ResearchObservationBase(37, <ResearchObservationModel>{
                "index": 37,
                "name": "Birchtree Bitty",
                "requiredResearchLevel": 87,
                "mapId": 17,
                "x": 496,
                "y": 260,
                "x5": 5,
                "discoveryRollRequirement": 104,
                "hint": "Found in World 1, where houses walk"
            }),
        new ResearchObservationBase(38, <ResearchObservationModel>{
                "index": 38,
                "name": "Unreachable Grate",
                "requiredResearchLevel": 90,
                "mapId": 15,
                "x": 843,
                "y": 966,
                "x5": 5,
                "discoveryRollRequirement": 104,
                "hint": "Found in World 1, just a few dirty bars that'll never be broken"
            }),
        new ResearchObservationBase(39, <ResearchObservationModel>{
                "index": 39,
                "name": "Genuine Deadwood",
                "requiredResearchLevel": 92,
                "mapId": 26,
                "x": 223,
                "y": 341,
                "x5": 5,
                "discoveryRollRequirement": 104,
                "hint": "Found in World 1, it twists and turns looking for even a slimmer of sunlight"
            }),
        new ResearchObservationBase(40, <ResearchObservationModel>{
                "index": 40,
                "name": "Rifty Crystals",
                "requiredResearchLevel": 94,
                "mapId": 166,
                "x": 643,
                "y": 378,
                "x5": 5,
                "discoveryRollRequirement": 105,
                "hint": "Found in World 4, just waiting to change colour once again"
            }),
        new ResearchObservationBase(41, <ResearchObservationModel>{
                "index": 41,
                "name": "Pirate Flag",
                "requiredResearchLevel": 97,
                "mapId": 316,
                "x": 1744,
                "y": 287,
                "x5": 5,
                "discoveryRollRequirement": 105,
                "hint": "Found in World 7, a sign to many that their sailing days are about to end"
            }),
        new ResearchObservationBase(42, <ResearchObservationModel>{
                "index": 42,
                "name": "Happy Tree",
                "requiredResearchLevel": 100,
                "mapId": 1,
                "x": 763,
                "y": 274,
                "x5": 5,
                "discoveryRollRequirement": 105,
                "hint": "Found in World 1, where the adventure began all those years ago"
            })    
]
}
