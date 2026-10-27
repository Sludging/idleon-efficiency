import { MapTransitionModel } from '../model/mapTransitionModel';

export class MapTransitionBase { constructor(public index: number, public data: MapTransitionModel) { } }



export const initMapTransitionsRepo = () => {
    return [    
        new MapTransitionBase(0, <MapTransitionModel>{
                "sourceMapId": 0,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "MininggA",
                "destinationMapId": 6,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(1, <MapTransitionModel>{
                "sourceMapId": 0,
                "transitionIndex": 1,
                "transitionCode": "6",
                "destinationScene": "zDesertaTown",
                "destinationMapId": 50,
                "requirementIndex": 0,
                "initialRequirement": 1
            }),
        new MapTransitionBase(2, <MapTransitionModel>{
                "sourceMapId": 0,
                "transitionIndex": 2,
                "transitionCode": "7",
                "destinationScene": "GrasslandsA",
                "destinationMapId": 1,
                "requirementIndex": 1,
                "initialRequirement": 0
            }),
        new MapTransitionBase(3, <MapTransitionModel>{
                "sourceMapId": 1,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "GrasslandaTown",
                "destinationMapId": 0,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(4, <MapTransitionModel>{
                "sourceMapId": 1,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "GrasslandsB",
                "destinationMapId": 2,
                "requirementIndex": 0,
                "initialRequirement": 21
            }),
        new MapTransitionBase(5, <MapTransitionModel>{
                "sourceMapId": 2,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "GrasslandsA",
                "destinationMapId": 1,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(6, <MapTransitionModel>{
                "sourceMapId": 2,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "GrasslandsC",
                "destinationMapId": 14,
                "requirementIndex": 0,
                "initialRequirement": 25
            }),
        new MapTransitionBase(7, <MapTransitionModel>{
                "sourceMapId": 2,
                "transitionIndex": 2,
                "transitionCode": "15",
                "destinationScene": "GrasslandsE",
                "destinationMapId": 39,
                "requirementIndex": 1,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(8, <MapTransitionModel>{
                "sourceMapId": 3,
                "transitionIndex": 0,
                "transitionCode": "10",
                "destinationScene": "GrasslandaTown",
                "destinationMapId": 0,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(9, <MapTransitionModel>{
                "sourceMapId": 3,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "GrasslandaTown",
                "destinationMapId": 0,
                "requirementIndex": 0,
                "initialRequirement": 150
            }),
        new MapTransitionBase(10, <MapTransitionModel>{
                "sourceMapId": 4,
                "transitionIndex": 0,
                "transitionCode": "_",
                "destinationScene": "GrasslandaTown",
                "destinationMapId": 0,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(11, <MapTransitionModel>{
                "sourceMapId": 5,
                "transitionIndex": 0,
                "transitionCode": "_",
                "destinationScene": "GrasslandaTown",
                "destinationMapId": 0,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(12, <MapTransitionModel>{
                "sourceMapId": 6,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "GrasslandaTown",
                "destinationMapId": 0,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(13, <MapTransitionModel>{
                "sourceMapId": 6,
                "transitionIndex": 1,
                "transitionCode": "3",
                "destinationScene": "MininggB",
                "destinationMapId": 7,
                "requirementIndex": 0,
                "initialRequirement": 10
            }),
        new MapTransitionBase(14, <MapTransitionModel>{
                "sourceMapId": 7,
                "transitionIndex": 0,
                "transitionCode": "18",
                "destinationScene": "MininggA",
                "destinationMapId": 6,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(15, <MapTransitionModel>{
                "sourceMapId": 7,
                "transitionIndex": 1,
                "transitionCode": "19",
                "destinationScene": "MininggC",
                "destinationMapId": 10,
                "requirementIndex": 0,
                "initialRequirement": 25
            }),
        new MapTransitionBase(16, <MapTransitionModel>{
                "sourceMapId": 7,
                "transitionIndex": 2,
                "transitionCode": "20",
                "destinationScene": "GrasslandsH",
                "destinationMapId": 43,
                "requirementIndex": 1,
                "initialRequirement": 81
            }),
        new MapTransitionBase(17, <MapTransitionModel>{
                "sourceMapId": 8,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "GrasslandaTown",
                "destinationMapId": 0,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(18, <MapTransitionModel>{
                "sourceMapId": 8,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "SewerB",
                "destinationMapId": 15,
                "requirementIndex": 0,
                "initialRequirement": 20000
            }),
        new MapTransitionBase(19, <MapTransitionModel>{
                "sourceMapId": 9,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "SewerB",
                "destinationMapId": 15,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(20, <MapTransitionModel>{
                "sourceMapId": 9,
                "transitionIndex": 1,
                "transitionCode": "4",
                "destinationScene": "SewerD",
                "destinationMapId": 38,
                "requirementIndex": 0,
                "initialRequirement": 0
            }),
        new MapTransitionBase(21, <MapTransitionModel>{
                "sourceMapId": 10,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "MininggB",
                "destinationMapId": 7,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(22, <MapTransitionModel>{
                "sourceMapId": 10,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "MininggD",
                "destinationMapId": 11,
                "requirementIndex": 0,
                "initialRequirement": 40
            }),
        new MapTransitionBase(23, <MapTransitionModel>{
                "sourceMapId": 11,
                "transitionIndex": 0,
                "transitionCode": "14",
                "destinationScene": "MininggC",
                "destinationMapId": 10,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(24, <MapTransitionModel>{
                "sourceMapId": 11,
                "transitionIndex": 1,
                "transitionCode": "99",
                "destinationScene": "Miningg2",
                "destinationMapId": 35,
                "requirementIndex": 0,
                "initialRequirement": 50
            }),
        new MapTransitionBase(25, <MapTransitionModel>{
                "sourceMapId": 11,
                "transitionIndex": 2,
                "transitionCode": "16",
                "destinationScene": "MininggE",
                "destinationMapId": 12,
                "requirementIndex": 1,
                "initialRequirement": 60
            }),
        new MapTransitionBase(26, <MapTransitionModel>{
                "sourceMapId": 12,
                "transitionIndex": 0,
                "transitionCode": "13",
                "destinationScene": "MininggD",
                "destinationMapId": 11,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(27, <MapTransitionModel>{
                "sourceMapId": 12,
                "transitionIndex": 1,
                "transitionCode": "14",
                "destinationScene": "MininggF",
                "destinationMapId": 32,
                "requirementIndex": 0,
                "initialRequirement": 60
            }),
        new MapTransitionBase(28, <MapTransitionModel>{
                "sourceMapId": 13,
                "transitionIndex": 0,
                "transitionCode": "15",
                "destinationScene": "JungleA",
                "destinationMapId": 16,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(29, <MapTransitionModel>{
                "sourceMapId": 13,
                "transitionIndex": 1,
                "transitionCode": "14",
                "destinationScene": "TreeInteriorB",
                "destinationMapId": 18,
                "requirementIndex": 0,
                "initialRequirement": 2500
            }),
        new MapTransitionBase(30, <MapTransitionModel>{
                "sourceMapId": 13,
                "transitionIndex": 2,
                "transitionCode": "16",
                "destinationScene": "TreeInteriorD",
                "destinationMapId": 30,
                "requirementIndex": 1,
                "initialRequirement": 50000
            }),
        new MapTransitionBase(31, <MapTransitionModel>{
                "sourceMapId": 14,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "GrasslandsB",
                "destinationMapId": 2,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(32, <MapTransitionModel>{
                "sourceMapId": 14,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "JungleA",
                "destinationMapId": 16,
                "requirementIndex": 0,
                "initialRequirement": 50
            }),
        new MapTransitionBase(33, <MapTransitionModel>{
                "sourceMapId": 14,
                "transitionIndex": 2,
                "transitionCode": "10",
                "destinationScene": "GrasslandsD",
                "destinationMapId": 17,
                "requirementIndex": 1,
                "initialRequirement": 2000
            }),
        new MapTransitionBase(34, <MapTransitionModel>{
                "sourceMapId": 15,
                "transitionIndex": 0,
                "transitionCode": "10",
                "destinationScene": "SewerA",
                "destinationMapId": 8,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(35, <MapTransitionModel>{
                "sourceMapId": 15,
                "transitionIndex": 1,
                "transitionCode": "11",
                "destinationScene": "SewerC",
                "destinationMapId": 9,
                "requirementIndex": 0,
                "initialRequirement": 35000
            }),
        new MapTransitionBase(36, <MapTransitionModel>{
                "sourceMapId": 16,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "GrasslandsC",
                "destinationMapId": 14,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(37, <MapTransitionModel>{
                "sourceMapId": 16,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "JungleB",
                "destinationMapId": 19,
                "requirementIndex": 0,
                "initialRequirement": 60
            }),
        new MapTransitionBase(38, <MapTransitionModel>{
                "sourceMapId": 16,
                "transitionIndex": 2,
                "transitionCode": "11",
                "destinationScene": "TreeInteriorA",
                "destinationMapId": 13,
                "requirementIndex": 1,
                "initialRequirement": 3000
            }),
        new MapTransitionBase(39, <MapTransitionModel>{
                "sourceMapId": 17,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "GrasslandsC",
                "destinationMapId": 14,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(40, <MapTransitionModel>{
                "sourceMapId": 18,
                "transitionIndex": 0,
                "transitionCode": "13",
                "destinationScene": "TreeInteriorA",
                "destinationMapId": 13,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(41, <MapTransitionModel>{
                "sourceMapId": 18,
                "transitionIndex": 1,
                "transitionCode": "14",
                "destinationScene": "TreeInteriorC",
                "destinationMapId": 31,
                "requirementIndex": 0,
                "initialRequirement": 5000
            }),
        new MapTransitionBase(42, <MapTransitionModel>{
                "sourceMapId": 19,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "JungleA",
                "destinationMapId": 16,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(43, <MapTransitionModel>{
                "sourceMapId": 19,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "JungleC",
                "destinationMapId": 24,
                "requirementIndex": 0,
                "initialRequirement": 90
            }),
        new MapTransitionBase(44, <MapTransitionModel>{
                "sourceMapId": 20,
                "transitionIndex": 0,
                "transitionCode": "4",
                "destinationScene": "TutorialA",
                "destinationMapId": 20,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(45, <MapTransitionModel>{
                "sourceMapId": 20,
                "transitionIndex": 1,
                "transitionCode": "2",
                "destinationScene": "TutorialB",
                "destinationMapId": 21,
                "requirementIndex": 0,
                "initialRequirement": 7
            }),
        new MapTransitionBase(46, <MapTransitionModel>{
                "sourceMapId": 21,
                "transitionIndex": 0,
                "transitionCode": "4",
                "destinationScene": "TutorialA",
                "destinationMapId": 20,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(47, <MapTransitionModel>{
                "sourceMapId": 21,
                "transitionIndex": 1,
                "transitionCode": "5",
                "destinationScene": "TutorialC",
                "destinationMapId": 22,
                "requirementIndex": 0,
                "initialRequirement": 5
            }),
        new MapTransitionBase(48, <MapTransitionModel>{
                "sourceMapId": 22,
                "transitionIndex": 0,
                "transitionCode": "13",
                "destinationScene": "TreeInteriorA",
                "destinationMapId": 13,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(49, <MapTransitionModel>{
                "sourceMapId": 23,
                "transitionIndex": 0,
                "transitionCode": "Na",
                "destinationScene": "JungleZ",
                "destinationMapId": 3,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(50, <MapTransitionModel>{
                "sourceMapId": 24,
                "transitionIndex": 0,
                "transitionCode": "13",
                "destinationScene": "JungleB",
                "destinationMapId": 19,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(51, <MapTransitionModel>{
                "sourceMapId": 24,
                "transitionIndex": 1,
                "transitionCode": "14",
                "destinationScene": "ForestA",
                "destinationMapId": 26,
                "requirementIndex": 0,
                "initialRequirement": 120
            }),
        new MapTransitionBase(52, <MapTransitionModel>{
                "sourceMapId": 24,
                "transitionIndex": 2,
                "transitionCode": "15",
                "destinationScene": "JungleGAME",
                "destinationMapId": 37,
                "requirementIndex": 1,
                "initialRequirement": 2000
            }),
        new MapTransitionBase(53, <MapTransitionModel>{
                "sourceMapId": 25,
                "transitionIndex": 0,
                "transitionCode": "13",
                "destinationScene": "TreeInteriorA",
                "destinationMapId": 13,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(54, <MapTransitionModel>{
                "sourceMapId": 26,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "JungleC",
                "destinationMapId": 24,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(55, <MapTransitionModel>{
                "sourceMapId": 26,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "ForestB",
                "destinationMapId": 27,
                "requirementIndex": 0,
                "initialRequirement": 130
            }),
        new MapTransitionBase(56, <MapTransitionModel>{
                "sourceMapId": 27,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "ForestA",
                "destinationMapId": 26,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(57, <MapTransitionModel>{
                "sourceMapId": 27,
                "transitionIndex": 1,
                "transitionCode": "16",
                "destinationScene": "JungleGAME",
                "destinationMapId": 37,
                "requirementIndex": 0,
                "initialRequirement": 30
            }),
        new MapTransitionBase(58, <MapTransitionModel>{
                "sourceMapId": 27,
                "transitionIndex": 2,
                "transitionCode": "11",
                "destinationScene": "ForestC",
                "destinationMapId": 28,
                "requirementIndex": 1,
                "initialRequirement": 4200
            }),
        new MapTransitionBase(59, <MapTransitionModel>{
                "sourceMapId": 28,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "ForestB",
                "destinationMapId": 27,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(60, <MapTransitionModel>{
                "sourceMapId": 29,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "ForestB",
                "destinationMapId": 27,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(61, <MapTransitionModel>{
                "sourceMapId": 30,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "TreeInteriorA",
                "destinationMapId": 13,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(62, <MapTransitionModel>{
                "sourceMapId": 31,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "TreeInteriorB",
                "destinationMapId": 18,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(63, <MapTransitionModel>{
                "sourceMapId": 32,
                "transitionIndex": 0,
                "transitionCode": "13",
                "destinationScene": "MininggE",
                "destinationMapId": 12,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(64, <MapTransitionModel>{
                "sourceMapId": 33,
                "transitionIndex": 0,
                "transitionCode": "99",
                "destinationScene": "SewerC",
                "destinationMapId": 9,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(65, <MapTransitionModel>{
                "sourceMapId": 34,
                "transitionIndex": 0,
                "transitionCode": "99",
                "destinationScene": "MininggB",
                "destinationMapId": 7,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(66, <MapTransitionModel>{
                "sourceMapId": 35,
                "transitionIndex": 0,
                "transitionCode": "99",
                "destinationScene": "MininggD",
                "destinationMapId": 11,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(67, <MapTransitionModel>{
                "sourceMapId": 36,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "GrasslandsB",
                "destinationMapId": 2,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(68, <MapTransitionModel>{
                "sourceMapId": 37,
                "transitionIndex": 0,
                "transitionCode": "12",
                "destinationScene": "PREVIOUSMAP",
                "destinationMapId": undefined,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(69, <MapTransitionModel>{
                "sourceMapId": 38,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "SewerC",
                "destinationMapId": 9,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(70, <MapTransitionModel>{
                "sourceMapId": 39,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "GrasslandsB",
                "destinationMapId": 2,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(71, <MapTransitionModel>{
                "sourceMapId": 40,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(72, <MapTransitionModel>{
                "sourceMapId": 41,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(73, <MapTransitionModel>{
                "sourceMapId": 42,
                "transitionIndex": 0,
                "transitionCode": "4",
                "destinationScene": "GrasslandsD",
                "destinationMapId": 17,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(74, <MapTransitionModel>{
                "sourceMapId": 43,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "PREVIOUSMAP",
                "destinationMapId": undefined,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(75, <MapTransitionModel>{
                "sourceMapId": 44,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(76, <MapTransitionModel>{
                "sourceMapId": 45,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(77, <MapTransitionModel>{
                "sourceMapId": 46,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(78, <MapTransitionModel>{
                "sourceMapId": 47,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(79, <MapTransitionModel>{
                "sourceMapId": 48,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(80, <MapTransitionModel>{
                "sourceMapId": 49,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(81, <MapTransitionModel>{
                "sourceMapId": 50,
                "transitionIndex": 0,
                "transitionCode": "4",
                "destinationScene": "zFishingA",
                "destinationMapId": 54,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(82, <MapTransitionModel>{
                "sourceMapId": 50,
                "transitionIndex": 1,
                "transitionCode": "5",
                "destinationScene": "ySnowaTown",
                "destinationMapId": 100,
                "requirementIndex": 0,
                "initialRequirement": 1
            }),
        new MapTransitionBase(83, <MapTransitionModel>{
                "sourceMapId": 50,
                "transitionIndex": 2,
                "transitionCode": "6",
                "destinationScene": "zDesertCalmA",
                "destinationMapId": 51,
                "requirementIndex": 1,
                "initialRequirement": 0
            }),
        new MapTransitionBase(84, <MapTransitionModel>{
                "sourceMapId": 50,
                "transitionIndex": 3,
                "transitionCode": "15",
                "destinationScene": "GrasslandaTown",
                "destinationMapId": 0,
                "requirementIndex": 2,
                "initialRequirement": 0
            }),
        new MapTransitionBase(85, <MapTransitionModel>{
                "sourceMapId": 51,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "zDesertaTown",
                "destinationMapId": 50,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(86, <MapTransitionModel>{
                "sourceMapId": 51,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "zDesertCalmB",
                "destinationMapId": 52,
                "requirementIndex": 0,
                "initialRequirement": 100
            }),
        new MapTransitionBase(87, <MapTransitionModel>{
                "sourceMapId": 52,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "zDesertCalmA",
                "destinationMapId": 51,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(88, <MapTransitionModel>{
                "sourceMapId": 52,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "zDesertCalmC",
                "destinationMapId": 53,
                "requirementIndex": 0,
                "initialRequirement": 120
            }),
        new MapTransitionBase(89, <MapTransitionModel>{
                "sourceMapId": 52,
                "transitionIndex": 2,
                "transitionCode": "10",
                "destinationScene": "zDesertCavernA",
                "destinationMapId": 67,
                "requirementIndex": 1,
                "initialRequirement": 1000
            }),
        new MapTransitionBase(90, <MapTransitionModel>{
                "sourceMapId": 53,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "zDesertCalmB",
                "destinationMapId": 52,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(91, <MapTransitionModel>{
                "sourceMapId": 53,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "zDesertMildA",
                "destinationMapId": 57,
                "requirementIndex": 0,
                "initialRequirement": 150
            }),
        new MapTransitionBase(92, <MapTransitionModel>{
                "sourceMapId": 54,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "zDesertaTown",
                "destinationMapId": 50,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(93, <MapTransitionModel>{
                "sourceMapId": 54,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "zFishingB",
                "destinationMapId": 55,
                "requirementIndex": 0,
                "initialRequirement": 15
            }),
        new MapTransitionBase(94, <MapTransitionModel>{
                "sourceMapId": 55,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "zFishingA",
                "destinationMapId": 54,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(95, <MapTransitionModel>{
                "sourceMapId": 55,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "zFishingC",
                "destinationMapId": 61,
                "requirementIndex": 0,
                "initialRequirement": 30
            }),
        new MapTransitionBase(96, <MapTransitionModel>{
                "sourceMapId": 56,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "zFishingA",
                "destinationMapId": 54,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(97, <MapTransitionModel>{
                "sourceMapId": 56,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "zFishingC",
                "destinationMapId": 61,
                "requirementIndex": 0,
                "initialRequirement": 30
            }),
        new MapTransitionBase(98, <MapTransitionModel>{
                "sourceMapId": 57,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "zDesertCalmC",
                "destinationMapId": 53,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(99, <MapTransitionModel>{
                "sourceMapId": 57,
                "transitionIndex": 1,
                "transitionCode": "6",
                "destinationScene": "zDesertMildB",
                "destinationMapId": 58,
                "requirementIndex": 0,
                "initialRequirement": 200
            }),
        new MapTransitionBase(100, <MapTransitionModel>{
                "sourceMapId": 58,
                "transitionIndex": 0,
                "transitionCode": "4",
                "destinationScene": "zDesertMildA",
                "destinationMapId": 57,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(101, <MapTransitionModel>{
                "sourceMapId": 58,
                "transitionIndex": 1,
                "transitionCode": "5",
                "destinationScene": "zDesertMildC",
                "destinationMapId": 59,
                "requirementIndex": 0,
                "initialRequirement": 250
            }),
        new MapTransitionBase(102, <MapTransitionModel>{
                "sourceMapId": 59,
                "transitionIndex": 0,
                "transitionCode": "12",
                "destinationScene": "zDesertMildB",
                "destinationMapId": 58,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(103, <MapTransitionModel>{
                "sourceMapId": 59,
                "transitionIndex": 1,
                "transitionCode": "13",
                "destinationScene": "zDesertMildD",
                "destinationMapId": 60,
                "requirementIndex": 0,
                "initialRequirement": 300
            }),
        new MapTransitionBase(104, <MapTransitionModel>{
                "sourceMapId": 60,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "zDesertMildC",
                "destinationMapId": 59,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(105, <MapTransitionModel>{
                "sourceMapId": 60,
                "transitionIndex": 1,
                "transitionCode": "6",
                "destinationScene": "zDesertNightA",
                "destinationMapId": 62,
                "requirementIndex": 0,
                "initialRequirement": 500
            }),
        new MapTransitionBase(106, <MapTransitionModel>{
                "sourceMapId": 61,
                "transitionIndex": 0,
                "transitionCode": "1",
                "destinationScene": "zFishingB",
                "destinationMapId": 55,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(107, <MapTransitionModel>{
                "sourceMapId": 62,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "zDesertMildD",
                "destinationMapId": 60,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(108, <MapTransitionModel>{
                "sourceMapId": 62,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "zDesertNightB",
                "destinationMapId": 63,
                "requirementIndex": 0,
                "initialRequirement": 1000
            }),
        new MapTransitionBase(109, <MapTransitionModel>{
                "sourceMapId": 63,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "zDesertNightA",
                "destinationMapId": 62,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(110, <MapTransitionModel>{
                "sourceMapId": 63,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "zDesertNightC",
                "destinationMapId": 64,
                "requirementIndex": 0,
                "initialRequirement": 2000
            }),
        new MapTransitionBase(111, <MapTransitionModel>{
                "sourceMapId": 64,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "zDesertNightB",
                "destinationMapId": 63,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(112, <MapTransitionModel>{
                "sourceMapId": 64,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "zDesertNightD",
                "destinationMapId": 65,
                "requirementIndex": 0,
                "initialRequirement": 3000
            }),
        new MapTransitionBase(113, <MapTransitionModel>{
                "sourceMapId": 64,
                "transitionIndex": 2,
                "transitionCode": "11",
                "destinationScene": "zDesertMummy",
                "destinationMapId": 69,
                "requirementIndex": 1,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(114, <MapTransitionModel>{
                "sourceMapId": 65,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "zDesertNightC",
                "destinationMapId": 64,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(115, <MapTransitionModel>{
                "sourceMapId": 66,
                "transitionIndex": 0,
                "transitionCode": "16",
                "destinationScene": "zDesertNightD",
                "destinationMapId": 65,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(116, <MapTransitionModel>{
                "sourceMapId": 67,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "zDesertCalmB",
                "destinationMapId": 52,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(117, <MapTransitionModel>{
                "sourceMapId": 67,
                "transitionIndex": 1,
                "transitionCode": "6",
                "destinationScene": "zDesertCavernB",
                "destinationMapId": 70,
                "requirementIndex": 0,
                "initialRequirement": 0
            }),
        new MapTransitionBase(118, <MapTransitionModel>{
                "sourceMapId": 68,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "zDesertCalmB",
                "destinationMapId": 52,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(119, <MapTransitionModel>{
                "sourceMapId": 69,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "zDesertNightC",
                "destinationMapId": 64,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(120, <MapTransitionModel>{
                "sourceMapId": 70,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "zDesertCavernA",
                "destinationMapId": 67,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(121, <MapTransitionModel>{
                "sourceMapId": 71,
                "transitionIndex": 0,
                "transitionCode": "99",
                "destinationScene": "zDesertCavernA",
                "destinationMapId": 67,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(122, <MapTransitionModel>{
                "sourceMapId": 72,
                "transitionIndex": 0,
                "transitionCode": "99",
                "destinationScene": "zFishingD",
                "destinationMapId": 72,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(123, <MapTransitionModel>{
                "sourceMapId": 73,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "zDesertCalmC",
                "destinationMapId": 53,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(124, <MapTransitionModel>{
                "sourceMapId": 74,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(125, <MapTransitionModel>{
                "sourceMapId": 75,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(126, <MapTransitionModel>{
                "sourceMapId": 76,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(127, <MapTransitionModel>{
                "sourceMapId": 77,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(128, <MapTransitionModel>{
                "sourceMapId": 78,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(129, <MapTransitionModel>{
                "sourceMapId": 79,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(130, <MapTransitionModel>{
                "sourceMapId": 80,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(131, <MapTransitionModel>{
                "sourceMapId": 81,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(132, <MapTransitionModel>{
                "sourceMapId": 82,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(133, <MapTransitionModel>{
                "sourceMapId": 83,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(134, <MapTransitionModel>{
                "sourceMapId": 84,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(135, <MapTransitionModel>{
                "sourceMapId": 85,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(136, <MapTransitionModel>{
                "sourceMapId": 86,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(137, <MapTransitionModel>{
                "sourceMapId": 87,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(138, <MapTransitionModel>{
                "sourceMapId": 88,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(139, <MapTransitionModel>{
                "sourceMapId": 89,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(140, <MapTransitionModel>{
                "sourceMapId": 90,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(141, <MapTransitionModel>{
                "sourceMapId": 91,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(142, <MapTransitionModel>{
                "sourceMapId": 92,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(143, <MapTransitionModel>{
                "sourceMapId": 93,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(144, <MapTransitionModel>{
                "sourceMapId": 94,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(145, <MapTransitionModel>{
                "sourceMapId": 95,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(146, <MapTransitionModel>{
                "sourceMapId": 96,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(147, <MapTransitionModel>{
                "sourceMapId": 97,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(148, <MapTransitionModel>{
                "sourceMapId": 98,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(149, <MapTransitionModel>{
                "sourceMapId": 99,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(150, <MapTransitionModel>{
                "sourceMapId": 100,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "ySnowA1",
                "destinationMapId": 101,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(151, <MapTransitionModel>{
                "sourceMapId": 100,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "xSpaceaaTown",
                "destinationMapId": 150,
                "requirementIndex": 0,
                "initialRequirement": 1
            }),
        new MapTransitionBase(152, <MapTransitionModel>{
                "sourceMapId": 100,
                "transitionIndex": 2,
                "transitionCode": "8",
                "destinationScene": "ySnowZ1",
                "destinationMapId": 102,
                "requirementIndex": 1,
                "initialRequirement": 0
            }),
        new MapTransitionBase(153, <MapTransitionModel>{
                "sourceMapId": 100,
                "transitionIndex": 3,
                "transitionCode": "10",
                "destinationScene": "zDesertaTown",
                "destinationMapId": 50,
                "requirementIndex": 2,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(154, <MapTransitionModel>{
                "sourceMapId": 100,
                "transitionIndex": 4,
                "transitionCode": "21",
                "destinationScene": "ySnowA4",
                "destinationMapId": 118,
                "requirementIndex": 3,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(155, <MapTransitionModel>{
                "sourceMapId": 101,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "ySnowaTown",
                "destinationMapId": 100,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(156, <MapTransitionModel>{
                "sourceMapId": 101,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "ySnowA2",
                "destinationMapId": 103,
                "requirementIndex": 0,
                "initialRequirement": 1000
            }),
        new MapTransitionBase(157, <MapTransitionModel>{
                "sourceMapId": 102,
                "transitionIndex": 0,
                "transitionCode": "3",
                "destinationScene": "ySnowaTown",
                "destinationMapId": 100,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(158, <MapTransitionModel>{
                "sourceMapId": 103,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "ySnowA1",
                "destinationMapId": 101,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(159, <MapTransitionModel>{
                "sourceMapId": 103,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "ySnowA3",
                "destinationMapId": 104,
                "requirementIndex": 0,
                "initialRequirement": 2000
            }),
        new MapTransitionBase(160, <MapTransitionModel>{
                "sourceMapId": 104,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "ySnowA2",
                "destinationMapId": 103,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(161, <MapTransitionModel>{
                "sourceMapId": 104,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "ySnowB1",
                "destinationMapId": 105,
                "requirementIndex": 0,
                "initialRequirement": 3000
            }),
        new MapTransitionBase(162, <MapTransitionModel>{
                "sourceMapId": 104,
                "transitionIndex": 2,
                "transitionCode": "11",
                "destinationScene": "ySnowD1",
                "destinationMapId": 116,
                "requirementIndex": 1,
                "initialRequirement": 100000
            }),
        new MapTransitionBase(163, <MapTransitionModel>{
                "sourceMapId": 105,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "ySnowA3",
                "destinationMapId": 104,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(164, <MapTransitionModel>{
                "sourceMapId": 105,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "ySnowB2",
                "destinationMapId": 106,
                "requirementIndex": 0,
                "initialRequirement": 4000
            }),
        new MapTransitionBase(165, <MapTransitionModel>{
                "sourceMapId": 106,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "ySnowB1",
                "destinationMapId": 105,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(166, <MapTransitionModel>{
                "sourceMapId": 106,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "ySnowB3",
                "destinationMapId": 107,
                "requirementIndex": 0,
                "initialRequirement": 6000
            }),
        new MapTransitionBase(167, <MapTransitionModel>{
                "sourceMapId": 107,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "ySnowB2",
                "destinationMapId": 106,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(168, <MapTransitionModel>{
                "sourceMapId": 107,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "ySnowB4",
                "destinationMapId": 108,
                "requirementIndex": 0,
                "initialRequirement": 8000
            }),
        new MapTransitionBase(169, <MapTransitionModel>{
                "sourceMapId": 108,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "ySnowB3",
                "destinationMapId": 107,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(170, <MapTransitionModel>{
                "sourceMapId": 108,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "ySnowB5",
                "destinationMapId": 109,
                "requirementIndex": 0,
                "initialRequirement": 11000
            }),
        new MapTransitionBase(171, <MapTransitionModel>{
                "sourceMapId": 109,
                "transitionIndex": 0,
                "transitionCode": "10",
                "destinationScene": "ySnowB4",
                "destinationMapId": 108,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(172, <MapTransitionModel>{
                "sourceMapId": 109,
                "transitionIndex": 1,
                "transitionCode": "11",
                "destinationScene": "ySnowC1",
                "destinationMapId": 110,
                "requirementIndex": 0,
                "initialRequirement": 15000
            }),
        new MapTransitionBase(173, <MapTransitionModel>{
                "sourceMapId": 110,
                "transitionIndex": 0,
                "transitionCode": "10",
                "destinationScene": "ySnowB5",
                "destinationMapId": 109,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(174, <MapTransitionModel>{
                "sourceMapId": 110,
                "transitionIndex": 1,
                "transitionCode": "11",
                "destinationScene": "ySnowC2",
                "destinationMapId": 111,
                "requirementIndex": 0,
                "initialRequirement": 18000
            }),
        new MapTransitionBase(175, <MapTransitionModel>{
                "sourceMapId": 111,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "ySnowC1",
                "destinationMapId": 110,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(176, <MapTransitionModel>{
                "sourceMapId": 111,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "ySnowC3",
                "destinationMapId": 112,
                "requirementIndex": 0,
                "initialRequirement": 22000
            }),
        new MapTransitionBase(177, <MapTransitionModel>{
                "sourceMapId": 112,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "ySnowC2",
                "destinationMapId": 111,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(178, <MapTransitionModel>{
                "sourceMapId": 112,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "ySnowC4",
                "destinationMapId": 113,
                "requirementIndex": 0,
                "initialRequirement": 35000
            }),
        new MapTransitionBase(179, <MapTransitionModel>{
                "sourceMapId": 113,
                "transitionIndex": 0,
                "transitionCode": "10",
                "destinationScene": "ySnowC3",
                "destinationMapId": 112,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(180, <MapTransitionModel>{
                "sourceMapId": 114,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "ySnowC4",
                "destinationMapId": 113,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(181, <MapTransitionModel>{
                "sourceMapId": 115,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "ySnowA2",
                "destinationMapId": 103,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(182, <MapTransitionModel>{
                "sourceMapId": 116,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "ySnowA3",
                "destinationMapId": 104,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(183, <MapTransitionModel>{
                "sourceMapId": 116,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "ySnowD2",
                "destinationMapId": 117,
                "requirementIndex": 0,
                "initialRequirement": 250000
            }),
        new MapTransitionBase(184, <MapTransitionModel>{
                "sourceMapId": 117,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "ySnowD1",
                "destinationMapId": 116,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(185, <MapTransitionModel>{
                "sourceMapId": 118,
                "transitionIndex": 0,
                "transitionCode": "3",
                "destinationScene": "ySnowaTown",
                "destinationMapId": 100,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(186, <MapTransitionModel>{
                "sourceMapId": 119,
                "transitionIndex": 0,
                "transitionCode": "99",
                "destinationScene": "ySnowA4",
                "destinationMapId": 118,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(187, <MapTransitionModel>{
                "sourceMapId": 120,
                "transitionIndex": 0,
                "transitionCode": "3",
                "destinationScene": "ySnowD2",
                "destinationMapId": 117,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(188, <MapTransitionModel>{
                "sourceMapId": 121,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(189, <MapTransitionModel>{
                "sourceMapId": 122,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(190, <MapTransitionModel>{
                "sourceMapId": 123,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(191, <MapTransitionModel>{
                "sourceMapId": 124,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(192, <MapTransitionModel>{
                "sourceMapId": 125,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(193, <MapTransitionModel>{
                "sourceMapId": 126,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(194, <MapTransitionModel>{
                "sourceMapId": 127,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(195, <MapTransitionModel>{
                "sourceMapId": 128,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(196, <MapTransitionModel>{
                "sourceMapId": 129,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(197, <MapTransitionModel>{
                "sourceMapId": 130,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(198, <MapTransitionModel>{
                "sourceMapId": 131,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(199, <MapTransitionModel>{
                "sourceMapId": 132,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(200, <MapTransitionModel>{
                "sourceMapId": 133,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(201, <MapTransitionModel>{
                "sourceMapId": 134,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(202, <MapTransitionModel>{
                "sourceMapId": 135,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(203, <MapTransitionModel>{
                "sourceMapId": 136,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(204, <MapTransitionModel>{
                "sourceMapId": 137,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(205, <MapTransitionModel>{
                "sourceMapId": 138,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(206, <MapTransitionModel>{
                "sourceMapId": 139,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(207, <MapTransitionModel>{
                "sourceMapId": 140,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(208, <MapTransitionModel>{
                "sourceMapId": 141,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(209, <MapTransitionModel>{
                "sourceMapId": 142,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(210, <MapTransitionModel>{
                "sourceMapId": 143,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(211, <MapTransitionModel>{
                "sourceMapId": 144,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(212, <MapTransitionModel>{
                "sourceMapId": 145,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(213, <MapTransitionModel>{
                "sourceMapId": 146,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(214, <MapTransitionModel>{
                "sourceMapId": 147,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(215, <MapTransitionModel>{
                "sourceMapId": 148,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(216, <MapTransitionModel>{
                "sourceMapId": 149,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(217, <MapTransitionModel>{
                "sourceMapId": 150,
                "transitionIndex": 0,
                "transitionCode": "10",
                "destinationScene": "ySnowaTown",
                "destinationMapId": 100,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(218, <MapTransitionModel>{
                "sourceMapId": 150,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "wLavaaTown",
                "destinationMapId": 200,
                "requirementIndex": 0,
                "initialRequirement": 1
            }),
        new MapTransitionBase(219, <MapTransitionModel>{
                "sourceMapId": 150,
                "transitionIndex": 2,
                "transitionCode": "11",
                "destinationScene": "xSpaceA1",
                "destinationMapId": 151,
                "requirementIndex": 1,
                "initialRequirement": 0
            }),
        new MapTransitionBase(220, <MapTransitionModel>{
                "sourceMapId": 151,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "xSpaceaaTown",
                "destinationMapId": 150,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(221, <MapTransitionModel>{
                "sourceMapId": 151,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "xSpaceA2",
                "destinationMapId": 152,
                "requirementIndex": 0,
                "initialRequirement": 5000
            }),
        new MapTransitionBase(222, <MapTransitionModel>{
                "sourceMapId": 152,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "xSpaceA1",
                "destinationMapId": 151,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(223, <MapTransitionModel>{
                "sourceMapId": 152,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "xSpaceA3",
                "destinationMapId": 153,
                "requirementIndex": 0,
                "initialRequirement": 12000
            }),
        new MapTransitionBase(224, <MapTransitionModel>{
                "sourceMapId": 153,
                "transitionIndex": 0,
                "transitionCode": "4",
                "destinationScene": "xSpaceA2",
                "destinationMapId": 152,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(225, <MapTransitionModel>{
                "sourceMapId": 153,
                "transitionIndex": 1,
                "transitionCode": "5",
                "destinationScene": "xSpaceA4",
                "destinationMapId": 154,
                "requirementIndex": 0,
                "initialRequirement": 18000
            }),
        new MapTransitionBase(226, <MapTransitionModel>{
                "sourceMapId": 154,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "xSpaceA3",
                "destinationMapId": 153,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(227, <MapTransitionModel>{
                "sourceMapId": 154,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "xSpaceB1",
                "destinationMapId": 155,
                "requirementIndex": 0,
                "initialRequirement": 25000
            }),
        new MapTransitionBase(228, <MapTransitionModel>{
                "sourceMapId": 155,
                "transitionIndex": 0,
                "transitionCode": "15",
                "destinationScene": "xSpaceA4",
                "destinationMapId": 154,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(229, <MapTransitionModel>{
                "sourceMapId": 155,
                "transitionIndex": 1,
                "transitionCode": "16",
                "destinationScene": "xSpaceB2",
                "destinationMapId": 156,
                "requirementIndex": 0,
                "initialRequirement": 40000
            }),
        new MapTransitionBase(230, <MapTransitionModel>{
                "sourceMapId": 156,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "xSpaceB1",
                "destinationMapId": 155,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(231, <MapTransitionModel>{
                "sourceMapId": 156,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "xSpaceB3",
                "destinationMapId": 157,
                "requirementIndex": 0,
                "initialRequirement": 60000
            }),
        new MapTransitionBase(232, <MapTransitionModel>{
                "sourceMapId": 157,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "xSpaceB2",
                "destinationMapId": 156,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(233, <MapTransitionModel>{
                "sourceMapId": 157,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "xSpaceB4",
                "destinationMapId": 158,
                "requirementIndex": 0,
                "initialRequirement": 90000
            }),
        new MapTransitionBase(234, <MapTransitionModel>{
                "sourceMapId": 158,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "xSpaceB3",
                "destinationMapId": 157,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(235, <MapTransitionModel>{
                "sourceMapId": 158,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "xSpaceB5",
                "destinationMapId": 159,
                "requirementIndex": 0,
                "initialRequirement": 120000
            }),
        new MapTransitionBase(236, <MapTransitionModel>{
                "sourceMapId": 159,
                "transitionIndex": 0,
                "transitionCode": "13",
                "destinationScene": "xSpaceB4",
                "destinationMapId": 158,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(237, <MapTransitionModel>{
                "sourceMapId": 159,
                "transitionIndex": 1,
                "transitionCode": "14",
                "destinationScene": "xSpaceC1",
                "destinationMapId": 160,
                "requirementIndex": 0,
                "initialRequirement": 150000
            }),
        new MapTransitionBase(238, <MapTransitionModel>{
                "sourceMapId": 160,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "xSpaceB5",
                "destinationMapId": 159,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(239, <MapTransitionModel>{
                "sourceMapId": 160,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "xSpaceC2",
                "destinationMapId": 161,
                "requirementIndex": 0,
                "initialRequirement": 190000
            }),
        new MapTransitionBase(240, <MapTransitionModel>{
                "sourceMapId": 161,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "xSpaceC1",
                "destinationMapId": 160,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(241, <MapTransitionModel>{
                "sourceMapId": 161,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "xSpaceC3",
                "destinationMapId": 162,
                "requirementIndex": 0,
                "initialRequirement": 250000
            }),
        new MapTransitionBase(242, <MapTransitionModel>{
                "sourceMapId": 162,
                "transitionIndex": 0,
                "transitionCode": "10",
                "destinationScene": "xSpaceC2",
                "destinationMapId": 161,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(243, <MapTransitionModel>{
                "sourceMapId": 162,
                "transitionIndex": 1,
                "transitionCode": "11",
                "destinationScene": "xSpaceC4",
                "destinationMapId": 163,
                "requirementIndex": 0,
                "initialRequirement": 300000
            }),
        new MapTransitionBase(244, <MapTransitionModel>{
                "sourceMapId": 163,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "xSpaceC3",
                "destinationMapId": 162,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(245, <MapTransitionModel>{
                "sourceMapId": 164,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "xSpaceA2",
                "destinationMapId": 152,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(246, <MapTransitionModel>{
                "sourceMapId": 165,
                "transitionIndex": 0,
                "transitionCode": "12",
                "destinationScene": "xSpaceC4",
                "destinationMapId": 163,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(247, <MapTransitionModel>{
                "sourceMapId": 166,
                "transitionIndex": 0,
                "transitionCode": "15",
                "destinationScene": "xSpaceC2",
                "destinationMapId": 161,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(248, <MapTransitionModel>{
                "sourceMapId": 167,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(249, <MapTransitionModel>{
                "sourceMapId": 168,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(250, <MapTransitionModel>{
                "sourceMapId": 169,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(251, <MapTransitionModel>{
                "sourceMapId": 170,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(252, <MapTransitionModel>{
                "sourceMapId": 171,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(253, <MapTransitionModel>{
                "sourceMapId": 172,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(254, <MapTransitionModel>{
                "sourceMapId": 173,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(255, <MapTransitionModel>{
                "sourceMapId": 174,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(256, <MapTransitionModel>{
                "sourceMapId": 175,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(257, <MapTransitionModel>{
                "sourceMapId": 176,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(258, <MapTransitionModel>{
                "sourceMapId": 177,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(259, <MapTransitionModel>{
                "sourceMapId": 178,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(260, <MapTransitionModel>{
                "sourceMapId": 179,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(261, <MapTransitionModel>{
                "sourceMapId": 180,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(262, <MapTransitionModel>{
                "sourceMapId": 181,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(263, <MapTransitionModel>{
                "sourceMapId": 182,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(264, <MapTransitionModel>{
                "sourceMapId": 183,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(265, <MapTransitionModel>{
                "sourceMapId": 184,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(266, <MapTransitionModel>{
                "sourceMapId": 185,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(267, <MapTransitionModel>{
                "sourceMapId": 186,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(268, <MapTransitionModel>{
                "sourceMapId": 187,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(269, <MapTransitionModel>{
                "sourceMapId": 188,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(270, <MapTransitionModel>{
                "sourceMapId": 189,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(271, <MapTransitionModel>{
                "sourceMapId": 190,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(272, <MapTransitionModel>{
                "sourceMapId": 191,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(273, <MapTransitionModel>{
                "sourceMapId": 192,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(274, <MapTransitionModel>{
                "sourceMapId": 193,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(275, <MapTransitionModel>{
                "sourceMapId": 194,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(276, <MapTransitionModel>{
                "sourceMapId": 195,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(277, <MapTransitionModel>{
                "sourceMapId": 196,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(278, <MapTransitionModel>{
                "sourceMapId": 197,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(279, <MapTransitionModel>{
                "sourceMapId": 198,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(280, <MapTransitionModel>{
                "sourceMapId": 199,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(281, <MapTransitionModel>{
                "sourceMapId": 200,
                "transitionIndex": 0,
                "transitionCode": "12",
                "destinationScene": "xSpaceaaTown",
                "destinationMapId": 150,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(282, <MapTransitionModel>{
                "sourceMapId": 200,
                "transitionIndex": 1,
                "transitionCode": "13",
                "destinationScene": "vSpiritaTown",
                "destinationMapId": 250,
                "requirementIndex": 0,
                "initialRequirement": 1
            }),
        new MapTransitionBase(283, <MapTransitionModel>{
                "sourceMapId": 200,
                "transitionIndex": 2,
                "transitionCode": "14",
                "destinationScene": "wLavaA1",
                "destinationMapId": 201,
                "requirementIndex": 1,
                "initialRequirement": 0
            }),
        new MapTransitionBase(284, <MapTransitionModel>{
                "sourceMapId": 201,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "wLavaaTown",
                "destinationMapId": 200,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(285, <MapTransitionModel>{
                "sourceMapId": 201,
                "transitionIndex": 1,
                "transitionCode": "6",
                "destinationScene": "wLavaA2",
                "destinationMapId": 202,
                "requirementIndex": 0,
                "initialRequirement": 15000
            }),
        new MapTransitionBase(286, <MapTransitionModel>{
                "sourceMapId": 202,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "wLavaA1",
                "destinationMapId": 201,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(287, <MapTransitionModel>{
                "sourceMapId": 202,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "wLavaA3",
                "destinationMapId": 203,
                "requirementIndex": 0,
                "initialRequirement": 25000
            }),
        new MapTransitionBase(288, <MapTransitionModel>{
                "sourceMapId": 203,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "wLavaA2",
                "destinationMapId": 202,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(289, <MapTransitionModel>{
                "sourceMapId": 203,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "wLavaA4",
                "destinationMapId": 204,
                "requirementIndex": 0,
                "initialRequirement": 40000
            }),
        new MapTransitionBase(290, <MapTransitionModel>{
                "sourceMapId": 203,
                "transitionIndex": 2,
                "transitionCode": "12",
                "destinationScene": "wLavaAhole",
                "destinationMapId": 216,
                "requirementIndex": 1,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(291, <MapTransitionModel>{
                "sourceMapId": 204,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "wLavaA3",
                "destinationMapId": 203,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(292, <MapTransitionModel>{
                "sourceMapId": 204,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "wLavaA5",
                "destinationMapId": 205,
                "requirementIndex": 0,
                "initialRequirement": 50000
            }),
        new MapTransitionBase(293, <MapTransitionModel>{
                "sourceMapId": 205,
                "transitionIndex": 0,
                "transitionCode": "16",
                "destinationScene": "wLavaA4",
                "destinationMapId": 204,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(294, <MapTransitionModel>{
                "sourceMapId": 205,
                "transitionIndex": 1,
                "transitionCode": "17",
                "destinationScene": "wLavaB1",
                "destinationMapId": 206,
                "requirementIndex": 0,
                "initialRequirement": 75000
            }),
        new MapTransitionBase(295, <MapTransitionModel>{
                "sourceMapId": 206,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "wLavaA5",
                "destinationMapId": 205,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(296, <MapTransitionModel>{
                "sourceMapId": 206,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "wLavaB2",
                "destinationMapId": 207,
                "requirementIndex": 0,
                "initialRequirement": 100000
            }),
        new MapTransitionBase(297, <MapTransitionModel>{
                "sourceMapId": 207,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "wLavaB1",
                "destinationMapId": 206,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(298, <MapTransitionModel>{
                "sourceMapId": 207,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "wLavaB3",
                "destinationMapId": 208,
                "requirementIndex": 0,
                "initialRequirement": 200000
            }),
        new MapTransitionBase(299, <MapTransitionModel>{
                "sourceMapId": 208,
                "transitionIndex": 0,
                "transitionCode": "4",
                "destinationScene": "wLavaB2",
                "destinationMapId": 207,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(300, <MapTransitionModel>{
                "sourceMapId": 208,
                "transitionIndex": 1,
                "transitionCode": "5",
                "destinationScene": "wLavaB4",
                "destinationMapId": 209,
                "requirementIndex": 0,
                "initialRequirement": 300000
            }),
        new MapTransitionBase(301, <MapTransitionModel>{
                "sourceMapId": 209,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "wLavaB3",
                "destinationMapId": 208,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(302, <MapTransitionModel>{
                "sourceMapId": 209,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "wLavaB5",
                "destinationMapId": 210,
                "requirementIndex": 0,
                "initialRequirement": 450000
            }),
        new MapTransitionBase(303, <MapTransitionModel>{
                "sourceMapId": 210,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "wLavaB4",
                "destinationMapId": 209,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(304, <MapTransitionModel>{
                "sourceMapId": 210,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "wLavaB6",
                "destinationMapId": 211,
                "requirementIndex": 0,
                "initialRequirement": 600000
            }),
        new MapTransitionBase(305, <MapTransitionModel>{
                "sourceMapId": 211,
                "transitionIndex": 0,
                "transitionCode": "10",
                "destinationScene": "wLavaB5",
                "destinationMapId": 210,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(306, <MapTransitionModel>{
                "sourceMapId": 211,
                "transitionIndex": 1,
                "transitionCode": "11",
                "destinationScene": "wLavaC1",
                "destinationMapId": 212,
                "requirementIndex": 0,
                "initialRequirement": 1000000
            }),
        new MapTransitionBase(307, <MapTransitionModel>{
                "sourceMapId": 212,
                "transitionIndex": 0,
                "transitionCode": "13",
                "destinationScene": "wLavaB6",
                "destinationMapId": 211,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(308, <MapTransitionModel>{
                "sourceMapId": 212,
                "transitionIndex": 1,
                "transitionCode": "14",
                "destinationScene": "wLavaC2",
                "destinationMapId": 213,
                "requirementIndex": 0,
                "initialRequirement": 3000000
            }),
        new MapTransitionBase(309, <MapTransitionModel>{
                "sourceMapId": 213,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "wLavaC1",
                "destinationMapId": 212,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(310, <MapTransitionModel>{
                "sourceMapId": 214,
                "transitionIndex": 0,
                "transitionCode": "2",
                "destinationScene": "wLavaB6",
                "destinationMapId": 211,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(311, <MapTransitionModel>{
                "sourceMapId": 215,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "wLavaA2",
                "destinationMapId": 202,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(312, <MapTransitionModel>{
                "sourceMapId": 216,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "wLavaA3",
                "destinationMapId": 203,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(313, <MapTransitionModel>{
                "sourceMapId": 217,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(314, <MapTransitionModel>{
                "sourceMapId": 218,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(315, <MapTransitionModel>{
                "sourceMapId": 219,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(316, <MapTransitionModel>{
                "sourceMapId": 220,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(317, <MapTransitionModel>{
                "sourceMapId": 221,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(318, <MapTransitionModel>{
                "sourceMapId": 222,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(319, <MapTransitionModel>{
                "sourceMapId": 223,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(320, <MapTransitionModel>{
                "sourceMapId": 224,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(321, <MapTransitionModel>{
                "sourceMapId": 225,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(322, <MapTransitionModel>{
                "sourceMapId": 226,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(323, <MapTransitionModel>{
                "sourceMapId": 227,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(324, <MapTransitionModel>{
                "sourceMapId": 228,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(325, <MapTransitionModel>{
                "sourceMapId": 229,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(326, <MapTransitionModel>{
                "sourceMapId": 230,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(327, <MapTransitionModel>{
                "sourceMapId": 231,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(328, <MapTransitionModel>{
                "sourceMapId": 232,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(329, <MapTransitionModel>{
                "sourceMapId": 233,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(330, <MapTransitionModel>{
                "sourceMapId": 234,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(331, <MapTransitionModel>{
                "sourceMapId": 235,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(332, <MapTransitionModel>{
                "sourceMapId": 236,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(333, <MapTransitionModel>{
                "sourceMapId": 237,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(334, <MapTransitionModel>{
                "sourceMapId": 238,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(335, <MapTransitionModel>{
                "sourceMapId": 239,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(336, <MapTransitionModel>{
                "sourceMapId": 240,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(337, <MapTransitionModel>{
                "sourceMapId": 241,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(338, <MapTransitionModel>{
                "sourceMapId": 242,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(339, <MapTransitionModel>{
                "sourceMapId": 243,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(340, <MapTransitionModel>{
                "sourceMapId": 244,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(341, <MapTransitionModel>{
                "sourceMapId": 245,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(342, <MapTransitionModel>{
                "sourceMapId": 246,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(343, <MapTransitionModel>{
                "sourceMapId": 247,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(344, <MapTransitionModel>{
                "sourceMapId": 248,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(345, <MapTransitionModel>{
                "sourceMapId": 249,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(346, <MapTransitionModel>{
                "sourceMapId": 250,
                "transitionIndex": 0,
                "transitionCode": "12",
                "destinationScene": "wLavaaTown",
                "destinationMapId": 200,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(347, <MapTransitionModel>{
                "sourceMapId": 250,
                "transitionIndex": 1,
                "transitionCode": "13",
                "destinationScene": "uAquaaTown",
                "destinationMapId": 300,
                "requirementIndex": 0,
                "initialRequirement": 1
            }),
        new MapTransitionBase(348, <MapTransitionModel>{
                "sourceMapId": 250,
                "transitionIndex": 2,
                "transitionCode": "14",
                "destinationScene": "vSpiritA1",
                "destinationMapId": 251,
                "requirementIndex": 1,
                "initialRequirement": 0
            }),
        new MapTransitionBase(349, <MapTransitionModel>{
                "sourceMapId": 251,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "vSpiritaTown",
                "destinationMapId": 250,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(350, <MapTransitionModel>{
                "sourceMapId": 251,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "vSpiritA2",
                "destinationMapId": 252,
                "requirementIndex": 0,
                "initialRequirement": 30000
            }),
        new MapTransitionBase(351, <MapTransitionModel>{
                "sourceMapId": 252,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "vSpiritA1",
                "destinationMapId": 251,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(352, <MapTransitionModel>{
                "sourceMapId": 252,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "vSpiritA3",
                "destinationMapId": 253,
                "requirementIndex": 0,
                "initialRequirement": 50000
            }),
        new MapTransitionBase(353, <MapTransitionModel>{
                "sourceMapId": 253,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "vSpiritA2",
                "destinationMapId": 252,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(354, <MapTransitionModel>{
                "sourceMapId": 253,
                "transitionIndex": 1,
                "transitionCode": "6",
                "destinationScene": "vSpiritA4",
                "destinationMapId": 254,
                "requirementIndex": 0,
                "initialRequirement": 100000
            }),
        new MapTransitionBase(355, <MapTransitionModel>{
                "sourceMapId": 254,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "vSpiritA3",
                "destinationMapId": 253,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(356, <MapTransitionModel>{
                "sourceMapId": 254,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "vSpiritA5",
                "destinationMapId": 255,
                "requirementIndex": 0,
                "initialRequirement": 250000
            }),
        new MapTransitionBase(357, <MapTransitionModel>{
                "sourceMapId": 255,
                "transitionIndex": 0,
                "transitionCode": "12",
                "destinationScene": "vSpiritA4",
                "destinationMapId": 254,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(358, <MapTransitionModel>{
                "sourceMapId": 255,
                "transitionIndex": 1,
                "transitionCode": "13",
                "destinationScene": "vSpiritB1",
                "destinationMapId": 256,
                "requirementIndex": 0,
                "initialRequirement": 400000
            }),
        new MapTransitionBase(359, <MapTransitionModel>{
                "sourceMapId": 256,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "vSpiritA5",
                "destinationMapId": 255,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(360, <MapTransitionModel>{
                "sourceMapId": 256,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "vSpiritB2",
                "destinationMapId": 257,
                "requirementIndex": 0,
                "initialRequirement": 1100000
            }),
        new MapTransitionBase(361, <MapTransitionModel>{
                "sourceMapId": 257,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "vSpiritB1",
                "destinationMapId": 256,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(362, <MapTransitionModel>{
                "sourceMapId": 257,
                "transitionIndex": 1,
                "transitionCode": "6",
                "destinationScene": "vSpiritB3",
                "destinationMapId": 258,
                "requirementIndex": 0,
                "initialRequirement": 3200000
            }),
        new MapTransitionBase(363, <MapTransitionModel>{
                "sourceMapId": 258,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "vSpiritB2",
                "destinationMapId": 257,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(364, <MapTransitionModel>{
                "sourceMapId": 258,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "vSpiritB4",
                "destinationMapId": 259,
                "requirementIndex": 0,
                "initialRequirement": 8000000
            }),
        new MapTransitionBase(365, <MapTransitionModel>{
                "sourceMapId": 259,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "vSpiritB3",
                "destinationMapId": 258,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(366, <MapTransitionModel>{
                "sourceMapId": 259,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "vSpiritC1",
                "destinationMapId": 260,
                "requirementIndex": 0,
                "initialRequirement": 12000000
            }),
        new MapTransitionBase(367, <MapTransitionModel>{
                "sourceMapId": 260,
                "transitionIndex": 0,
                "transitionCode": "15",
                "destinationScene": "vSpiritB4",
                "destinationMapId": 259,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(368, <MapTransitionModel>{
                "sourceMapId": 260,
                "transitionIndex": 1,
                "transitionCode": "16",
                "destinationScene": "vSpiritC2",
                "destinationMapId": 261,
                "requirementIndex": 0,
                "initialRequirement": 25000000
            }),
        new MapTransitionBase(369, <MapTransitionModel>{
                "sourceMapId": 261,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "vSpiritC1",
                "destinationMapId": 260,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(370, <MapTransitionModel>{
                "sourceMapId": 261,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "vSpiritD1",
                "destinationMapId": 262,
                "requirementIndex": 0,
                "initialRequirement": 70000000
            }),
        new MapTransitionBase(371, <MapTransitionModel>{
                "sourceMapId": 262,
                "transitionIndex": 0,
                "transitionCode": "21",
                "destinationScene": "vSpiritC2",
                "destinationMapId": 261,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(372, <MapTransitionModel>{
                "sourceMapId": 262,
                "transitionIndex": 1,
                "transitionCode": "22",
                "destinationScene": "vSpiritD2",
                "destinationMapId": 263,
                "requirementIndex": 0,
                "initialRequirement": 100000000
            }),
        new MapTransitionBase(373, <MapTransitionModel>{
                "sourceMapId": 263,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "vSpiritD1",
                "destinationMapId": 262,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(374, <MapTransitionModel>{
                "sourceMapId": 263,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "vSpiritD3",
                "destinationMapId": 264,
                "requirementIndex": 0,
                "initialRequirement": 150000000
            }),
        new MapTransitionBase(375, <MapTransitionModel>{
                "sourceMapId": 264,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "vSpiritD2",
                "destinationMapId": 263,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(376, <MapTransitionModel>{
                "sourceMapId": 265,
                "transitionIndex": 0,
                "transitionCode": "4",
                "destinationScene": "vSpiritA2",
                "destinationMapId": 252,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(377, <MapTransitionModel>{
                "sourceMapId": 266,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "vSpiritD3",
                "destinationMapId": 264,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(378, <MapTransitionModel>{
                "sourceMapId": 267,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(379, <MapTransitionModel>{
                "sourceMapId": 268,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(380, <MapTransitionModel>{
                "sourceMapId": 269,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(381, <MapTransitionModel>{
                "sourceMapId": 270,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(382, <MapTransitionModel>{
                "sourceMapId": 271,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(383, <MapTransitionModel>{
                "sourceMapId": 272,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(384, <MapTransitionModel>{
                "sourceMapId": 273,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(385, <MapTransitionModel>{
                "sourceMapId": 274,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(386, <MapTransitionModel>{
                "sourceMapId": 275,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(387, <MapTransitionModel>{
                "sourceMapId": 276,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(388, <MapTransitionModel>{
                "sourceMapId": 277,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(389, <MapTransitionModel>{
                "sourceMapId": 278,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(390, <MapTransitionModel>{
                "sourceMapId": 279,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(391, <MapTransitionModel>{
                "sourceMapId": 280,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(392, <MapTransitionModel>{
                "sourceMapId": 281,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(393, <MapTransitionModel>{
                "sourceMapId": 282,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(394, <MapTransitionModel>{
                "sourceMapId": 283,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(395, <MapTransitionModel>{
                "sourceMapId": 284,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(396, <MapTransitionModel>{
                "sourceMapId": 285,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(397, <MapTransitionModel>{
                "sourceMapId": 286,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(398, <MapTransitionModel>{
                "sourceMapId": 287,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(399, <MapTransitionModel>{
                "sourceMapId": 288,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(400, <MapTransitionModel>{
                "sourceMapId": 289,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(401, <MapTransitionModel>{
                "sourceMapId": 290,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(402, <MapTransitionModel>{
                "sourceMapId": 291,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(403, <MapTransitionModel>{
                "sourceMapId": 292,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(404, <MapTransitionModel>{
                "sourceMapId": 293,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(405, <MapTransitionModel>{
                "sourceMapId": 294,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(406, <MapTransitionModel>{
                "sourceMapId": 295,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(407, <MapTransitionModel>{
                "sourceMapId": 296,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(408, <MapTransitionModel>{
                "sourceMapId": 297,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(409, <MapTransitionModel>{
                "sourceMapId": 298,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(410, <MapTransitionModel>{
                "sourceMapId": 299,
                "transitionIndex": 0,
                "transitionCode": "Z",
                "destinationScene": "Z",
                "destinationMapId": 44,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(411, <MapTransitionModel>{
                "sourceMapId": 300,
                "transitionIndex": 0,
                "transitionCode": "12",
                "destinationScene": "vSpiritaTown",
                "destinationMapId": 250,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(412, <MapTransitionModel>{
                "sourceMapId": 300,
                "transitionIndex": 1,
                "transitionCode": "13",
                "destinationScene": "NEXTWORLD",
                "destinationMapId": undefined,
                "requirementIndex": 0,
                "initialRequirement": 1
            }),
        new MapTransitionBase(413, <MapTransitionModel>{
                "sourceMapId": 300,
                "transitionIndex": 2,
                "transitionCode": "14",
                "destinationScene": "uAquaA1",
                "destinationMapId": 301,
                "requirementIndex": 1,
                "initialRequirement": 0
            }),
        new MapTransitionBase(414, <MapTransitionModel>{
                "sourceMapId": 301,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "uAquaaTown",
                "destinationMapId": 300,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(415, <MapTransitionModel>{
                "sourceMapId": 301,
                "transitionIndex": 1,
                "transitionCode": "7",
                "destinationScene": "uAquaA2",
                "destinationMapId": 302,
                "requirementIndex": 0,
                "initialRequirement": 100000
            }),
        new MapTransitionBase(416, <MapTransitionModel>{
                "sourceMapId": 302,
                "transitionIndex": 0,
                "transitionCode": "15",
                "destinationScene": "uAquaA1",
                "destinationMapId": 301,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(417, <MapTransitionModel>{
                "sourceMapId": 302,
                "transitionIndex": 1,
                "transitionCode": "16",
                "destinationScene": "uAquaA3",
                "destinationMapId": 303,
                "requirementIndex": 0,
                "initialRequirement": 250000
            }),
        new MapTransitionBase(418, <MapTransitionModel>{
                "sourceMapId": 303,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "uAquaA2",
                "destinationMapId": 302,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(419, <MapTransitionModel>{
                "sourceMapId": 303,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "uAquaA7",
                "destinationMapId": 307,
                "requirementIndex": 0,
                "initialRequirement": 10000000
            }),
        new MapTransitionBase(420, <MapTransitionModel>{
                "sourceMapId": 303,
                "transitionIndex": 2,
                "transitionCode": "7",
                "destinationScene": "uAquaA4",
                "destinationMapId": 304,
                "requirementIndex": 1,
                "initialRequirement": 1500000
            }),
        new MapTransitionBase(421, <MapTransitionModel>{
                "sourceMapId": 304,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "uAquaA3",
                "destinationMapId": 303,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(422, <MapTransitionModel>{
                "sourceMapId": 304,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "uAquaA5",
                "destinationMapId": 305,
                "requirementIndex": 0,
                "initialRequirement": 5000000
            }),
        new MapTransitionBase(423, <MapTransitionModel>{
                "sourceMapId": 305,
                "transitionIndex": 0,
                "transitionCode": "27",
                "destinationScene": "uAquaA4",
                "destinationMapId": 304,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(424, <MapTransitionModel>{
                "sourceMapId": 305,
                "transitionIndex": 1,
                "transitionCode": "28",
                "destinationScene": "uAquaB1",
                "destinationMapId": 315,
                "requirementIndex": 0,
                "initialRequirement": 20000000
            }),
        new MapTransitionBase(425, <MapTransitionModel>{
                "sourceMapId": 305,
                "transitionIndex": 2,
                "transitionCode": "29",
                "destinationScene": "uAquaA6",
                "destinationMapId": 306,
                "requirementIndex": 1,
                "initialRequirement": 1000000
            }),
        new MapTransitionBase(426, <MapTransitionModel>{
                "sourceMapId": 306,
                "transitionIndex": 0,
                "transitionCode": "3",
                "destinationScene": "uAquaA5",
                "destinationMapId": 305,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(427, <MapTransitionModel>{
                "sourceMapId": 307,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "uAquaA3",
                "destinationMapId": 303,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(428, <MapTransitionModel>{
                "sourceMapId": 307,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "uAquaA10",
                "destinationMapId": 310,
                "requirementIndex": 0,
                "initialRequirement": 250000000
            }),
        new MapTransitionBase(429, <MapTransitionModel>{
                "sourceMapId": 307,
                "transitionIndex": 2,
                "transitionCode": "13",
                "destinationScene": "uAquaA8",
                "destinationMapId": 308,
                "requirementIndex": 1,
                "initialRequirement": 20000000
            }),
        new MapTransitionBase(430, <MapTransitionModel>{
                "sourceMapId": 308,
                "transitionIndex": 0,
                "transitionCode": "20",
                "destinationScene": "uAquaA7",
                "destinationMapId": 307,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(431, <MapTransitionModel>{
                "sourceMapId": 308,
                "transitionIndex": 1,
                "transitionCode": "21",
                "destinationScene": "uAquaA9",
                "destinationMapId": 309,
                "requirementIndex": 0,
                "initialRequirement": 60000000
            }),
        new MapTransitionBase(432, <MapTransitionModel>{
                "sourceMapId": 309,
                "transitionIndex": 0,
                "transitionCode": "16",
                "destinationScene": "uAquaA8",
                "destinationMapId": 308,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(433, <MapTransitionModel>{
                "sourceMapId": 310,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "uAquaA7",
                "destinationMapId": 307,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(434, <MapTransitionModel>{
                "sourceMapId": 310,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "uAquaA11",
                "destinationMapId": 311,
                "requirementIndex": 0,
                "initialRequirement": 500000000
            }),
        new MapTransitionBase(435, <MapTransitionModel>{
                "sourceMapId": 310,
                "transitionIndex": 2,
                "transitionCode": "10",
                "destinationScene": "uAquaA10",
                "destinationMapId": 310,
                "requirementIndex": 1,
                "initialRequirement": 75000000
            }),
        new MapTransitionBase(436, <MapTransitionModel>{
                "sourceMapId": 311,
                "transitionIndex": 0,
                "transitionCode": "14",
                "destinationScene": "uAquaA10",
                "destinationMapId": 310,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(437, <MapTransitionModel>{
                "sourceMapId": 311,
                "transitionIndex": 1,
                "transitionCode": "15",
                "destinationScene": "uAquaA12",
                "destinationMapId": 312,
                "requirementIndex": 0,
                "initialRequirement": 1000000000
            }),
        new MapTransitionBase(438, <MapTransitionModel>{
                "sourceMapId": 312,
                "transitionIndex": 0,
                "transitionCode": "5",
                "destinationScene": "uAquaA11",
                "destinationMapId": 311,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(439, <MapTransitionModel>{
                "sourceMapId": 313,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "uAquaA10",
                "destinationMapId": 310,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(440, <MapTransitionModel>{
                "sourceMapId": 314,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "uAquaA2",
                "destinationMapId": 302,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(441, <MapTransitionModel>{
                "sourceMapId": 315,
                "transitionIndex": 0,
                "transitionCode": "14",
                "destinationScene": "uAquaA5",
                "destinationMapId": 305,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(442, <MapTransitionModel>{
                "sourceMapId": 315,
                "transitionIndex": 1,
                "transitionCode": "15",
                "destinationScene": "uAquaB2",
                "destinationMapId": 316,
                "requirementIndex": 0,
                "initialRequirement": 2000000
            }),
        new MapTransitionBase(443, <MapTransitionModel>{
                "sourceMapId": 316,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "uAquaB1",
                "destinationMapId": 315,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(444, <MapTransitionModel>{
                "sourceMapId": 316,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "uAquaB3",
                "destinationMapId": 317,
                "requirementIndex": 0,
                "initialRequirement": 6000000
            }),
        new MapTransitionBase(445, <MapTransitionModel>{
                "sourceMapId": 317,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "uAquaB2",
                "destinationMapId": 316,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(446, <MapTransitionModel>{
                "sourceMapId": 317,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "uAquaB11",
                "destinationMapId": 325,
                "requirementIndex": 0,
                "initialRequirement": 1000000000
            }),
        new MapTransitionBase(447, <MapTransitionModel>{
                "sourceMapId": 317,
                "transitionIndex": 2,
                "transitionCode": "13",
                "destinationScene": "uAquaB4",
                "destinationMapId": 318,
                "requirementIndex": 1,
                "initialRequirement": 40000000
            }),
        new MapTransitionBase(448, <MapTransitionModel>{
                "sourceMapId": 318,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "uAquaB3",
                "destinationMapId": 317,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(449, <MapTransitionModel>{
                "sourceMapId": 318,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "uAquaB5",
                "destinationMapId": 319,
                "requirementIndex": 0,
                "initialRequirement": 60000000
            }),
        new MapTransitionBase(450, <MapTransitionModel>{
                "sourceMapId": 319,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "uAquaB4",
                "destinationMapId": 318,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(451, <MapTransitionModel>{
                "sourceMapId": 319,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "uAquaB6",
                "destinationMapId": 320,
                "requirementIndex": 0,
                "initialRequirement": 125000000
            }),
        new MapTransitionBase(452, <MapTransitionModel>{
                "sourceMapId": 320,
                "transitionIndex": 0,
                "transitionCode": "17",
                "destinationScene": "uAquaB5",
                "destinationMapId": 319,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(453, <MapTransitionModel>{
                "sourceMapId": 320,
                "transitionIndex": 1,
                "transitionCode": "18",
                "destinationScene": "uAquaB7",
                "destinationMapId": 321,
                "requirementIndex": 0,
                "initialRequirement": 250000000
            }),
        new MapTransitionBase(454, <MapTransitionModel>{
                "sourceMapId": 321,
                "transitionIndex": 0,
                "transitionCode": "7",
                "destinationScene": "uAquaB6",
                "destinationMapId": 320,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(455, <MapTransitionModel>{
                "sourceMapId": 321,
                "transitionIndex": 1,
                "transitionCode": "8",
                "destinationScene": "uAquaB8",
                "destinationMapId": 322,
                "requirementIndex": 0,
                "initialRequirement": 350000000
            }),
        new MapTransitionBase(456, <MapTransitionModel>{
                "sourceMapId": 322,
                "transitionIndex": 0,
                "transitionCode": "9",
                "destinationScene": "uAquaB7",
                "destinationMapId": 321,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(457, <MapTransitionModel>{
                "sourceMapId": 322,
                "transitionIndex": 1,
                "transitionCode": "10",
                "destinationScene": "uAquaB9",
                "destinationMapId": 323,
                "requirementIndex": 0,
                "initialRequirement": 500000000
            }),
        new MapTransitionBase(458, <MapTransitionModel>{
                "sourceMapId": 323,
                "transitionIndex": 0,
                "transitionCode": "12",
                "destinationScene": "uAquaB8",
                "destinationMapId": 322,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(459, <MapTransitionModel>{
                "sourceMapId": 323,
                "transitionIndex": 1,
                "transitionCode": "13",
                "destinationScene": "uAquaB10",
                "destinationMapId": 324,
                "requirementIndex": 0,
                "initialRequirement": 750000000
            }),
        new MapTransitionBase(460, <MapTransitionModel>{
                "sourceMapId": 324,
                "transitionIndex": 0,
                "transitionCode": "8",
                "destinationScene": "uAquaB9",
                "destinationMapId": 323,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(461, <MapTransitionModel>{
                "sourceMapId": 324,
                "transitionIndex": 1,
                "transitionCode": "9",
                "destinationScene": "uAquaB10",
                "destinationMapId": 324,
                "requirementIndex": 0,
                "initialRequirement": 1000000000
            }),
        new MapTransitionBase(462, <MapTransitionModel>{
                "sourceMapId": 325,
                "transitionIndex": 0,
                "transitionCode": "11",
                "destinationScene": "uAquaB3",
                "destinationMapId": 317,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            }),
        new MapTransitionBase(463, <MapTransitionModel>{
                "sourceMapId": 325,
                "transitionIndex": 1,
                "transitionCode": "12",
                "destinationScene": "uAquaB12",
                "destinationMapId": 326,
                "requirementIndex": 0,
                "initialRequirement": 2000000000
            }),
        new MapTransitionBase(464, <MapTransitionModel>{
                "sourceMapId": 326,
                "transitionIndex": 0,
                "transitionCode": "6",
                "destinationScene": "uAquaB11",
                "destinationMapId": 325,
                "requirementIndex": undefined,
                "initialRequirement": undefined
            })    
]
}
