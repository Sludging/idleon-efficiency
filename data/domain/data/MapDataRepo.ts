import { MapDataModel } from '../model/mapDataModel';
import { MapNameModel } from '../model/mapNameModel';

export class MapDataBase { constructor(public index: number, public data: MapDataModel) { } }



export const initMapDataRepo = () => {
    return [    
        new MapDataBase(0, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "GrasslandaTown", "name": "Blunder Hills", "id": 0},
                "portalRequirements": [1, 0]
            }),
        new MapDataBase(1, <MapDataModel>{
                "enemy": "mushG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "GrasslandsA", "name": "Spore Meadows", "id": 1},
                "portalRequirements": [20]
            }),
        new MapDataBase(2, <MapDataModel>{
                "enemy": "frogG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "GrasslandsB", "name": "Froggy Fields", "id": 2},
                "portalRequirements": [30]
            }),
        new MapDataBase(3, <MapDataModel>{
                "enemy": "JungleZ",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "JungleZ", "name": "JungleZ", "id": 3},
                "portalRequirements": [150, 10]
            }),
        new MapDataBase(4, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "PlayerSelect", "name": "PlayerSelect", "id": 4},
                "portalRequirements": [150]
            }),
        new MapDataBase(5, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "PlayerSelect", "name": "PlayerSelect", "id": 5},
                "portalRequirements": [150]
            }),
        new MapDataBase(6, <MapDataModel>{
                "enemy": "Copper",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "MininggA", "name": "Tunnels Entrance", "id": 6},
                "portalRequirements": [10]
            }),
        new MapDataBase(7, <MapDataModel>{
                "enemy": "Iron",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "MininggB", "name": "Freefall Caverns", "id": 7},
                "portalRequirements": [25, 81]
            }),
        new MapDataBase(8, <MapDataModel>{
                "enemy": "poopSmall",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "SewerA", "name": "Poopy Sewers", "id": 8},
                "portalRequirements": [20000]
            }),
        new MapDataBase(9, <MapDataModel>{
                "enemy": "poopSmall",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "SewerC", "name": "The Office", "id": 9},
                "portalRequirements": [0]
            }),
        new MapDataBase(10, <MapDataModel>{
                "enemy": "Plat",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "MininggC", "name": "The Ol' Straightaway", "id": 10},
                "portalRequirements": [40]
            }),
        new MapDataBase(11, <MapDataModel>{
                "enemy": "Void",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "MininggD", "name": "Echoing Egress", "id": 11},
                "portalRequirements": [50, 60]
            }),
        new MapDataBase(12, <MapDataModel>{
                "enemy": "Starfire",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "MininggE", "name": "Slip Slidy Ledges", "id": 12},
                "portalRequirements": [60]
            }),
        new MapDataBase(13, <MapDataModel>{
                "enemy": "branch",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "TreeInteriorA", "name": "The Base Of The Bark", "id": 13},
                "portalRequirements": [2500, 50000]
            }),
        new MapDataBase(14, <MapDataModel>{
                "enemy": "beanG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "GrasslandsC", "name": "Valley Of The Beans", "id": 14},
                "portalRequirements": [80, 1500]
            }),
        new MapDataBase(15, <MapDataModel>{
                "enemy": "ratB",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "SewerB", "name": "Rats Nest", "id": 15},
                "portalRequirements": [35000]
            }),
        new MapDataBase(16, <MapDataModel>{
                "enemy": "slimeG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "JungleA", "name": "Jungle Perimeter", "id": 16},
                "portalRequirements": [200, 3000]
            }),
        new MapDataBase(17, <MapDataModel>{
                "enemy": "mushR",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "GrasslandsD", "name": "Birch Enclave", "id": 17},
                "portalRequirements": [0]
            }),
        new MapDataBase(18, <MapDataModel>{
                "enemy": "acorn",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "TreeInteriorB", "name": "Hollowed Trunk", "id": 18},
                "portalRequirements": [5000]
            }),
        new MapDataBase(19, <MapDataModel>{
                "enemy": "snakeG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "JungleB", "name": "Winding Willows", "id": 19},
                "portalRequirements": [250]
            }),
        new MapDataBase(20, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "TutorialA", "name": "TutorialA", "id": 20},
                "portalRequirements": [7]
            }),
        new MapDataBase(21, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "TutorialB", "name": "TutorialB", "id": 21},
                "portalRequirements": [5]
            }),
        new MapDataBase(22, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "TutorialC", "name": "TutorialC", "id": 22},
                "portalRequirements": [0]
            }),
        new MapDataBase(23, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "TutorialD", "name": "TutorialD", "id": 23},
                "portalRequirements": [0]
            }),
        new MapDataBase(24, <MapDataModel>{
                "enemy": "carrotO",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "JungleC", "name": "Vegetable Patch", "id": 24},
                "portalRequirements": [300, 2000]
            }),
        new MapDataBase(25, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "JungleX", "name": "JungleX", "id": 25},
                "portalRequirements": [0]
            }),
        new MapDataBase(26, <MapDataModel>{
                "enemy": "goblinG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "ForestA", "name": "Forest Outskirts", "id": 26},
                "portalRequirements": [350]
            }),
        new MapDataBase(27, <MapDataModel>{
                "enemy": "plank",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "ForestB", "name": "Encroaching Forest Villas", "id": 27},
                "portalRequirements": [30, 4200]
            }),
        new MapDataBase(28, <MapDataModel>{
                "enemy": "frogBIG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "ForestC", "name": "Tucked Away", "id": 28},
                "portalRequirements": [0]
            }),
        new MapDataBase(29, <MapDataModel>{
                "enemy": "plank",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "ForestBOSS", "name": "End Of The Road", "id": 29},
                "portalRequirements": [0]
            }),
        new MapDataBase(30, <MapDataModel>{
                "enemy": "acorn",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "TreeInteriorD", "name": "The Roots", "id": 30},
                "portalRequirements": [0]
            }),
        new MapDataBase(31, <MapDataModel>{
                "enemy": "mushW",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "TreeInteriorC", "name": "Where the Branches End", "id": 31},
                "portalRequirements": [0]
            }),
        new MapDataBase(32, <MapDataModel>{
                "enemy": "map32",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "MininggF", "name": "MininggF", "id": 32},
                "portalRequirements": [0]
            }),
        new MapDataBase(33, <MapDataModel>{
                "enemy": "map33",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "NOTHINGLOL", "name": "How Did u get here", "id": 33},
                "portalRequirements": [0]
            }),
        new MapDataBase(34, <MapDataModel>{
                "enemy": "map34",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Miningg1", "name": "Miningg1", "id": 34},
                "portalRequirements": [0]
            }),
        new MapDataBase(35, <MapDataModel>{
                "enemy": "map35",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Miningg2", "name": "Miningg2", "id": 35},
                "portalRequirements": [0]
            }),
        new MapDataBase(36, <MapDataModel>{
                "enemy": "frogG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "ColosseumA", "name": "Dewdrop Colosseum", "id": 36},
                "portalRequirements": [0]
            }),
        new MapDataBase(37, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "JungleGAME", "name": "Spike Surprise", "id": 37},
                "portalRequirements": [0]
            }),
        new MapDataBase(38, <MapDataModel>{
                "enemy": "poopD",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "SewerD", "name": "Meel's Crypt", "id": 38},
                "portalRequirements": [0]
            }),
        new MapDataBase(39, <MapDataModel>{
                "enemy": "frogG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "GrasslandsE", "name": "Grandfrog's Backyard", "id": 39},
                "portalRequirements": [0]
            }),
        new MapDataBase(40, <MapDataModel>{
                "enemy": "frogG",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Dungeon1", "name": "Grandfrog's Gazebo", "id": 40},
                "portalRequirements": [0]
            }),
        new MapDataBase(41, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 41},
                "portalRequirements": [0]
            }),
        new MapDataBase(42, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 42},
                "portalRequirements": [0]
            }),
        new MapDataBase(43, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 43},
                "portalRequirements": [0]
            }),
        new MapDataBase(44, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 44},
                "portalRequirements": [0]
            }),
        new MapDataBase(45, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 45},
                "portalRequirements": [0]
            }),
        new MapDataBase(46, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 46},
                "portalRequirements": [0]
            }),
        new MapDataBase(47, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 47},
                "portalRequirements": [0]
            }),
        new MapDataBase(48, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 48},
                "portalRequirements": [0]
            }),
        new MapDataBase(49, <MapDataModel>{
                "enemy": "Z",
                "world": "Blunder Hills",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 49},
                "portalRequirements": [0]
            }),
        new MapDataBase(50, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertaTown", "name": "YumYum Grotto", "id": 50},
                "portalRequirements": [1, 0, 0]
            }),
        new MapDataBase(51, <MapDataModel>{
                "enemy": "jarSand",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertCalmA", "name": "Jar Bridge", "id": 51},
                "portalRequirements": [250]
            }),
        new MapDataBase(52, <MapDataModel>{
                "enemy": "mimicA",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertCalmB", "name": "The Mimic Hole", "id": 52},
                "portalRequirements": [600, 1000]
            }),
        new MapDataBase(53, <MapDataModel>{
                "enemy": "crabcake",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertCalmC", "name": "Dessert Dunes", "id": 53},
                "portalRequirements": [1000]
            }),
        new MapDataBase(54, <MapDataModel>{
                "enemy": "FishSmall",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zFishingA", "name": "Salty Shores", "id": 54},
                "portalRequirements": [15]
            }),
        new MapDataBase(55, <MapDataModel>{
                "enemy": "FishSmall",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zFishingB", "name": "Faraway Piers", "id": 55},
                "portalRequirements": [30]
            }),
        new MapDataBase(56, <MapDataModel>{
                "enemy": "Filler",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Filler", "name": "Filler", "id": 56},
                "portalRequirements": [30]
            }),
        new MapDataBase(57, <MapDataModel>{
                "enemy": "coconut",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertMildA", "name": "The Grandioso Canyon", "id": 57},
                "portalRequirements": [1200]
            }),
        new MapDataBase(58, <MapDataModel>{
                "enemy": "sandcastle",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertMildB", "name": "Shifty Sandbox", "id": 58},
                "portalRequirements": [1600]
            }),
        new MapDataBase(59, <MapDataModel>{
                "enemy": "pincermin",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertMildC", "name": "Pincer Plateau", "id": 59},
                "portalRequirements": [2000]
            }),
        new MapDataBase(60, <MapDataModel>{
                "enemy": "potato",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertMildD", "name": "Slamabam Straightaway", "id": 60},
                "portalRequirements": [2500, 0]
            }),
        new MapDataBase(61, <MapDataModel>{
                "enemy": "FishMed",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zFishingC", "name": "Deepwater Docks", "id": 61},
                "portalRequirements": [30]
            }),
        new MapDataBase(62, <MapDataModel>{
                "enemy": "steak",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertNightA", "name": "The Ring", "id": 62},
                "portalRequirements": [3000]
            }),
        new MapDataBase(63, <MapDataModel>{
                "enemy": "moonman",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertNightB", "name": "Up Up Down Down", "id": 63},
                "portalRequirements": [4000]
            }),
        new MapDataBase(64, <MapDataModel>{
                "enemy": "sandgiant",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertNightC", "name": "Sands of Time", "id": 64},
                "portalRequirements": [5000]
            }),
        new MapDataBase(65, <MapDataModel>{
                "enemy": "snailZ",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertNightD", "name": "Djonnuttown", "id": 65},
                "portalRequirements": [1]
            }),
        new MapDataBase(66, <MapDataModel>{
                "enemy": "snailZ",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertNightZboss", "name": "Efaunt's Tomb", "id": 66},
                "portalRequirements": [0]
            }),
        new MapDataBase(67, <MapDataModel>{
                "enemy": "Bug2",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertCavernA", "name": "Bandit Bob's Hideout", "id": 67},
                "portalRequirements": [0]
            }),
        new MapDataBase(68, <MapDataModel>{
                "enemy": "mimicA",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "ColosseumB", "name": "Sandstone Colosseum", "id": 68},
                "portalRequirements": [0]
            }),
        new MapDataBase(69, <MapDataModel>{
                "enemy": "sandgiant",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertMummy", "name": "Mummy Memorial", "id": 69},
                "portalRequirements": [0]
            }),
        new MapDataBase(70, <MapDataModel>{
                "enemy": "mimicA",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "zDesertCavernB", "name": "Heaty Hole", "id": 70},
                "portalRequirements": [0]
            }),
        new MapDataBase(71, <MapDataModel>{
                "enemy": "mimicA",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Dungeon2", "name": "Gravel Tomb", "id": 71},
                "portalRequirements": [0]
            }),
        new MapDataBase(72, <MapDataModel>{
                "enemy": "mimicA",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 72},
                "portalRequirements": [0]
            }),
        new MapDataBase(73, <MapDataModel>{
                "enemy": "mimicA",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 73},
                "portalRequirements": [0]
            }),
        new MapDataBase(74, <MapDataModel>{
                "enemy": "mimicA",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 74},
                "portalRequirements": [0]
            }),
        new MapDataBase(75, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 75},
                "portalRequirements": [0]
            }),
        new MapDataBase(76, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 76},
                "portalRequirements": [0]
            }),
        new MapDataBase(77, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 77},
                "portalRequirements": [0]
            }),
        new MapDataBase(78, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 78},
                "portalRequirements": [0]
            }),
        new MapDataBase(79, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 79},
                "portalRequirements": [0]
            }),
        new MapDataBase(80, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 80},
                "portalRequirements": [0]
            }),
        new MapDataBase(81, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 81},
                "portalRequirements": [0]
            }),
        new MapDataBase(82, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 82},
                "portalRequirements": [0]
            }),
        new MapDataBase(83, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 83},
                "portalRequirements": [0]
            }),
        new MapDataBase(84, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 84},
                "portalRequirements": [0]
            }),
        new MapDataBase(85, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 85},
                "portalRequirements": [0]
            }),
        new MapDataBase(86, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 86},
                "portalRequirements": [0]
            }),
        new MapDataBase(87, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 87},
                "portalRequirements": [0]
            }),
        new MapDataBase(88, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 88},
                "portalRequirements": [0]
            }),
        new MapDataBase(89, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 89},
                "portalRequirements": [0]
            }),
        new MapDataBase(90, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 90},
                "portalRequirements": [0]
            }),
        new MapDataBase(91, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 91},
                "portalRequirements": [0]
            }),
        new MapDataBase(92, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 92},
                "portalRequirements": [0]
            }),
        new MapDataBase(93, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 93},
                "portalRequirements": [0]
            }),
        new MapDataBase(94, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 94},
                "portalRequirements": [0]
            }),
        new MapDataBase(95, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 95},
                "portalRequirements": [0]
            }),
        new MapDataBase(96, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 96},
                "portalRequirements": [0]
            }),
        new MapDataBase(97, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 97},
                "portalRequirements": [0]
            }),
        new MapDataBase(98, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 98},
                "portalRequirements": [0]
            }),
        new MapDataBase(99, <MapDataModel>{
                "enemy": "Z",
                "world": "Yum Yum Desert",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 99},
                "portalRequirements": [0]
            }),
        new MapDataBase(100, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowaTown", "name": "Frostbite Towndra", "id": 100},
                "portalRequirements": [1, 0]
            }),
        new MapDataBase(101, <MapDataModel>{
                "enemy": "sheep",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowA1", "name": "Steep Sheep Ledge", "id": 101},
                "portalRequirements": [1000]
            }),
        new MapDataBase(102, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowZ1", "name": "Trappers Folley", "id": 102},
                "portalRequirements": [4000]
            }),
        new MapDataBase(103, <MapDataModel>{
                "enemy": "flake",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowA2", "name": "Snowfield Outskirts", "id": 103},
                "portalRequirements": [2000]
            }),
        new MapDataBase(104, <MapDataModel>{
                "enemy": "stache",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowA3", "name": "The Stache Split", "id": 104},
                "portalRequirements": [3000, 100000]
            }),
        new MapDataBase(105, <MapDataModel>{
                "enemy": "bloque",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowB1", "name": "Refrigeration Station", "id": 105},
                "portalRequirements": [4000]
            }),
        new MapDataBase(106, <MapDataModel>{
                "enemy": "mamoth",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowB2", "name": "Mamooooth Mountain", "id": 106},
                "portalRequirements": [6000]
            }),
        new MapDataBase(107, <MapDataModel>{
                "enemy": "snowball",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowB3", "name": "Rollin' Tundra", "id": 107},
                "portalRequirements": [8000]
            }),
        new MapDataBase(108, <MapDataModel>{
                "enemy": "penguin",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowB4", "name": "Signature Slopes", "id": 108},
                "portalRequirements": [11000]
            }),
        new MapDataBase(109, <MapDataModel>{
                "enemy": "thermostat",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowB5", "name": "Thermonuclear Climb", "id": 109},
                "portalRequirements": [15000]
            }),
        new MapDataBase(110, <MapDataModel>{
                "enemy": "glass",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowC1", "name": "Waterlogged Entrance", "id": 110},
                "portalRequirements": [18000]
            }),
        new MapDataBase(111, <MapDataModel>{
                "enemy": "snakeB",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowC2", "name": "Cryo Catacombs", "id": 111},
                "portalRequirements": [22000]
            }),
        new MapDataBase(112, <MapDataModel>{
                "enemy": "speaker",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowC3", "name": "Overpass of Sound", "id": 112},
                "portalRequirements": [35000]
            }),
        new MapDataBase(113, <MapDataModel>{
                "enemy": "eye",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowC4", "name": "Crystal Basecamp", "id": 113},
                "portalRequirements": [120000]
            }),
        new MapDataBase(114, <MapDataModel>{
                "enemy": "eye",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowCBOSS", "name": "Eycicles's Nest", "id": 114},
                "portalRequirements": [1000]
            }),
        new MapDataBase(115, <MapDataModel>{
                "enemy": "flake",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ColosseumC", "name": "Coldsnap Colosseum", "id": 115},
                "portalRequirements": [1000]
            }),
        new MapDataBase(116, <MapDataModel>{
                "enemy": "ram",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowD1", "name": "Wam Wonderland", "id": 116},
                "portalRequirements": [250000]
            }),
        new MapDataBase(117, <MapDataModel>{
                "enemy": "skele2",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowD2", "name": "Hell Hath Frozen Over", "id": 117},
                "portalRequirements": [0]
            }),
        new MapDataBase(118, <MapDataModel>{
                "enemy": "sheep",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "ySnowA4", "name": "Inside the Igloo", "id": 118},
                "portalRequirements": [0]
            }),
        new MapDataBase(119, <MapDataModel>{
                "enemy": "sheep",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Dungeon3", "name": "Igloo's Basement", "id": 119},
                "portalRequirements": [0]
            }),
        new MapDataBase(120, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 120},
                "portalRequirements": [0]
            }),
        new MapDataBase(121, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 121},
                "portalRequirements": [0]
            }),
        new MapDataBase(122, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 122},
                "portalRequirements": [0]
            }),
        new MapDataBase(123, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 123},
                "portalRequirements": [0]
            }),
        new MapDataBase(124, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 124},
                "portalRequirements": [0]
            }),
        new MapDataBase(125, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 125},
                "portalRequirements": [0]
            }),
        new MapDataBase(126, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 126},
                "portalRequirements": [0]
            }),
        new MapDataBase(127, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 127},
                "portalRequirements": [0]
            }),
        new MapDataBase(128, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 128},
                "portalRequirements": [0]
            }),
        new MapDataBase(129, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 129},
                "portalRequirements": [0]
            }),
        new MapDataBase(130, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 130},
                "portalRequirements": [0]
            }),
        new MapDataBase(131, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 131},
                "portalRequirements": [0]
            }),
        new MapDataBase(132, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 132},
                "portalRequirements": [0]
            }),
        new MapDataBase(133, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 133},
                "portalRequirements": [0]
            }),
        new MapDataBase(134, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 134},
                "portalRequirements": [0]
            }),
        new MapDataBase(135, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 135},
                "portalRequirements": [0]
            }),
        new MapDataBase(136, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 136},
                "portalRequirements": [0]
            }),
        new MapDataBase(137, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 137},
                "portalRequirements": [0]
            }),
        new MapDataBase(138, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 138},
                "portalRequirements": [0]
            }),
        new MapDataBase(139, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 139},
                "portalRequirements": [0]
            }),
        new MapDataBase(140, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 140},
                "portalRequirements": [0]
            }),
        new MapDataBase(141, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 141},
                "portalRequirements": [0]
            }),
        new MapDataBase(142, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 142},
                "portalRequirements": [0]
            }),
        new MapDataBase(143, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 143},
                "portalRequirements": [0]
            }),
        new MapDataBase(144, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 144},
                "portalRequirements": [0]
            }),
        new MapDataBase(145, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 145},
                "portalRequirements": [0]
            }),
        new MapDataBase(146, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 146},
                "portalRequirements": [0]
            }),
        new MapDataBase(147, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 147},
                "portalRequirements": [0]
            }),
        new MapDataBase(148, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 148},
                "portalRequirements": [0]
            }),
        new MapDataBase(149, <MapDataModel>{
                "enemy": "Z",
                "world": "Frostbite Tundra",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 149},
                "portalRequirements": [0]
            }),
        new MapDataBase(150, <MapDataModel>{
                "enemy": "Nothing",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceaaTown", "name": "Outer World Town", "id": 150},
                "portalRequirements": [1, 0]
            }),
        new MapDataBase(151, <MapDataModel>{
                "enemy": "mushP",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceA1", "name": "Spaceway Raceway", "id": 151},
                "portalRequirements": [20000]
            }),
        new MapDataBase(152, <MapDataModel>{
                "enemy": "w4a2",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceA2", "name": "TV Outpost", "id": 152},
                "portalRequirements": [30000]
            }),
        new MapDataBase(153, <MapDataModel>{
                "enemy": "w4a3",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceA3", "name": "Donut Drive-In", "id": 153},
                "portalRequirements": [50000]
            }),
        new MapDataBase(154, <MapDataModel>{
                "enemy": "demonP",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceA4", "name": "Outskirts of Fallstar Isle", "id": 154},
                "portalRequirements": [70000]
            }),
        new MapDataBase(155, <MapDataModel>{
                "enemy": "w4b2",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceB1", "name": "Mountainous Deugh", "id": 155},
                "portalRequirements": [100000]
            }),
        new MapDataBase(156, <MapDataModel>{
                "enemy": "w4b1",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceB2", "name": "Wurm Highway", "id": 156},
                "portalRequirements": [150000]
            }),
        new MapDataBase(157, <MapDataModel>{
                "enemy": "w4b3",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceB3", "name": "Jelly Cube Bridge", "id": 157},
                "portalRequirements": [250000]
            }),
        new MapDataBase(158, <MapDataModel>{
                "enemy": "w4b4",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceB4", "name": "Cocoa Tunnel", "id": 158},
                "portalRequirements": [500000]
            }),
        new MapDataBase(159, <MapDataModel>{
                "enemy": "w4b5",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceB5", "name": "Standstill Plains", "id": 159},
                "portalRequirements": [700000]
            }),
        new MapDataBase(160, <MapDataModel>{
                "enemy": "w4c1",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceC1", "name": "Shelled Shores", "id": 160},
                "portalRequirements": [1000000]
            }),
        new MapDataBase(161, <MapDataModel>{
                "enemy": "w4c2",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceC2", "name": "The Untraveled Octopath", "id": 161},
                "portalRequirements": [2000000]
            }),
        new MapDataBase(162, <MapDataModel>{
                "enemy": "w4c3",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceC3", "name": "Flamboyant Bayou", "id": 162},
                "portalRequirements": [3000000]
            }),
        new MapDataBase(163, <MapDataModel>{
                "enemy": "w4c4",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceC4", "name": "Enclave of Eyes", "id": 163},
                "portalRequirements": [4000000]
            }),
        new MapDataBase(164, <MapDataModel>{
                "enemy": "mushP",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "ColosseumD", "name": "Astro Colosseum", "id": 164},
                "portalRequirements": [250]
            }),
        new MapDataBase(165, <MapDataModel>{
                "enemy": "w4c4",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "xSpaceCBOSS", "name": "Enclave a la Troll", "id": 165},
                "portalRequirements": [700]
            }),
        new MapDataBase(166, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 166},
                "portalRequirements": [0]
            }),
        new MapDataBase(167, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 167},
                "portalRequirements": [0]
            }),
        new MapDataBase(168, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 168},
                "portalRequirements": [0]
            }),
        new MapDataBase(169, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 169},
                "portalRequirements": [0]
            }),
        new MapDataBase(170, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 170},
                "portalRequirements": [0]
            }),
        new MapDataBase(171, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 171},
                "portalRequirements": [0]
            }),
        new MapDataBase(172, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 172},
                "portalRequirements": [0]
            }),
        new MapDataBase(173, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 173},
                "portalRequirements": [0]
            }),
        new MapDataBase(174, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 174},
                "portalRequirements": [0]
            }),
        new MapDataBase(175, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 175},
                "portalRequirements": [0]
            }),
        new MapDataBase(176, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 176},
                "portalRequirements": [0]
            }),
        new MapDataBase(177, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 177},
                "portalRequirements": [0]
            }),
        new MapDataBase(178, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 178},
                "portalRequirements": [0]
            }),
        new MapDataBase(179, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 179},
                "portalRequirements": [0]
            }),
        new MapDataBase(180, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 180},
                "portalRequirements": [0]
            }),
        new MapDataBase(181, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 181},
                "portalRequirements": [0]
            }),
        new MapDataBase(182, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 182},
                "portalRequirements": [0]
            }),
        new MapDataBase(183, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 183},
                "portalRequirements": [0]
            }),
        new MapDataBase(184, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 184},
                "portalRequirements": [0]
            }),
        new MapDataBase(185, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 185},
                "portalRequirements": [0]
            }),
        new MapDataBase(186, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 186},
                "portalRequirements": [0]
            }),
        new MapDataBase(187, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 187},
                "portalRequirements": [0]
            }),
        new MapDataBase(188, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 188},
                "portalRequirements": [0]
            }),
        new MapDataBase(189, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 189},
                "portalRequirements": [0]
            }),
        new MapDataBase(190, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 190},
                "portalRequirements": [0]
            }),
        new MapDataBase(191, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 191},
                "portalRequirements": [0]
            }),
        new MapDataBase(192, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 192},
                "portalRequirements": [0]
            }),
        new MapDataBase(193, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 193},
                "portalRequirements": [0]
            }),
        new MapDataBase(194, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 194},
                "portalRequirements": [0]
            }),
        new MapDataBase(195, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 195},
                "portalRequirements": [0]
            }),
        new MapDataBase(196, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 196},
                "portalRequirements": [0]
            }),
        new MapDataBase(197, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 197},
                "portalRequirements": [0]
            }),
        new MapDataBase(198, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 198},
                "portalRequirements": [0]
            }),
        new MapDataBase(199, <MapDataModel>{
                "enemy": "Z",
                "world": "Hyperion Nebula",
                "map": <MapNameModel>{"intName": "Z", "name": "Z", "id": 199},
                "portalRequirements": [0]
            })    
]
}
