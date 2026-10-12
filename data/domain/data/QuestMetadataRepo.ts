import { AccountWideQuestModel } from '../model/accountWideQuestModel';
import { MainQuestModel } from '../model/mainQuestModel';
import { QuestMetadataModel } from '../model/questMetadataModel';

export class QuestMetadataBase { constructor(public index: number, public data: QuestMetadataModel) { } }



export const initQuestMetadataRepo = () => {
    return [    
        new QuestMetadataBase(0, <QuestMetadataModel>{
                "mainQuests": [
                    <MainQuestModel>{
                        "npc": "Scripticus",
                        "map": [0, 0],
                        "scene": [
                            6,
                            9,
                            13,
                            17,
                            20,
                            23,
                            25,
                            33,
                            39,
                            42
                        ],
                        "index": [99999]
                    },
                    <MainQuestModel>{"npc": "Glumlee", "map": [0, 0], "scene": [3, 6], "index": [99999]},
                    <MainQuestModel>{"npc": "Picnic Stowaway", "map": [0, 0], "scene": [-7, -5], "index": [20]},
                    <MainQuestModel>{"npc": "Stiltzcho", "map": [9, -3], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Town Marble", "map": [-16, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Woodsman", "map": [18, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "TP Pete", "map": [-8, -4], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Promotheus", "map": [-10, 0], "scene": [2, 10], "index": [99999]},
                    <MainQuestModel>{"npc": "Speccius", "map": [36, 27], "scene": [1, 8], "index": [99999]},
                    <MainQuestModel>{"npc": "Whattso", "map": [-17, -21], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Scubidew", "map": [-7, -7], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Fishpaste97", "map": [-7, -10], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Loveulyte", "map": [-15, 14], "scene": [-7, -5], "index": [1]},
                    <MainQuestModel>{
                        "npc": "Cowbo Jones",
                        "map": [0, 0],
                        "scene": [
                            1,
                            4,
                            7,
                            12,
                            19,
                            22,
                            24,
                            27,
                            33,
                            38,
                            44,
                            47,
                            50,
                            54
                        ],
                        "index": [99999]
                    },
                    <MainQuestModel>{"npc": "Giftmas Blobulyte", "map": [0, 0], "scene": [-7, -5], "index": [1]},
                    <MainQuestModel>{
                        "npc": "Hoggindaz",
                        "map": [-8, 15],
                        "scene": [
                            3,
                            7,
                            10,
                            15,
                            19,
                            25,
                            28,
                            31,
                            36,
                            39
                        ],
                        "index": [99999]
                    },
                    <MainQuestModel>{"npc": "Carpetiem", "map": [0, 0], "scene": [5, 9, 13, 17], "index": [99999]},
                    <MainQuestModel>{"npc": "Coastiolyte", "map": [0, 0], "scene": [-7, -5], "index": [1]},
                    <MainQuestModel>{"npc": "Gangster Gus", "map": [50, -15], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Shuvelle", "map": [0, 0], "scene": [3, 6, 9, 12], "index": [99999]},
                    <MainQuestModel>{"npc": "Yondergreen", "map": [0, 0], "scene": [3, 6, 9, 12], "index": [99999]},
                    <MainQuestModel>{"npc": "Bill Brr", "map": [0, 0], "scene": [2, 5, 9, 12], "index": [99999]},
                    <MainQuestModel>{"npc": "Gobo", "map": [65, -34], "scene": [3, 6, 9, 12, 16], "index": [99999]},
                    <MainQuestModel>{"npc": "Nebula Neddy", "map": [-7, -6], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Lava Larry", "map": [-7, -6], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Eliteus", "map": [-7, 0], "scene": [2, 4], "index": [99999]},
                    <MainQuestModel>{"npc": "Slargon", "map": [16, 7], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Pirate Porkchop", "map": [-10, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Poigu", "map": [-10, -3], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Muhmuguh", "map": [12, -45], "scene": [2, 6, 10], "index": [99999]},
                    <MainQuestModel>{"npc": "Nebulyte", "map": [15, -28], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Monolith", "map": [-25, -10], "scene": [1, 4, 7], "index": [99999]},
                    <MainQuestModel>{
                        "npc": "Lafu Shi",
                        "map": [63, 0],
                        "scene": [
                            2,
                            5,
                            8,
                            11,
                            14,
                            17
                        ],
                        "index": [99999]
                    },
                    <MainQuestModel>{"npc": "Spirit Sungmin", "map": [20, -6], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Masterius", "map": [0, 0], "scene": [2, 4], "index": [99999]},
                    <MainQuestModel>{"npc": "Snootie", "map": [-20, -325], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Bloo Radley", "map": [1000, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{
                        "npc": "Toobus Goobus",
                        "map": [-9, -20],
                        "scene": [4, 7, 10, 13],
                        "index": [99999]
                    },
                    <MainQuestModel>{"npc": "Zenelith", "map": [-17, -8], "scene": [1], "index": [99999]},
                    <MainQuestModel>{"npc": "Wavey Wayne", "map": [-6, 20], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Coral Kid", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Musselini", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Forest Soul", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Dune Soul", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Root Soul", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Frigid Soul", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Squish Soul", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Oozie Soul", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Brezy Soul", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Deeps Soul", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Keymaster", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Pet Dog", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Minehead", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "D. Coral", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Glimbo", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Sushi Station", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "The Button", "map": [0, 0], "scene": [-7, -5], "index": [99999]},
                    <MainQuestModel>{"npc": "Jelly", "map": [0, 0], "scene": [-7, -5], "index": [99999]}
                ],
                "accountWideQuests": [
                    <AccountWideQuestModel>{"key": "Obol_Altar1", "npc": "Obol Altar", "index": 1, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Mr_Pigibank5", "npc": "Mr Pigibank", "index": 5, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Desert_Davey4", "npc": "Desert Davey", "index": 4, "accountWide": false},
                    <AccountWideQuestModel>{
                        "key": "Postboy_Pablob2",
                        "npc": "Postboy Pablob",
                        "index": 2,
                        "accountWide": false
                    },
                    <AccountWideQuestModel>{"key": "Builder_Bird1", "npc": "Builder Bird", "index": 1, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Telescope4", "npc": "Telescope", "index": 4, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Loveulyte2", "npc": "Loveulyte", "index": 2, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Loveulyte5", "npc": "Loveulyte", "index": 5, "accountWide": true},
                    <AccountWideQuestModel>{
                        "key": "Constructor_Crow2",
                        "npc": "Constructor Crow",
                        "index": 2,
                        "accountWide": false
                    },
                    <AccountWideQuestModel>{"key": "Iceland_Irwin2", "npc": "Iceland Irwin", "index": 2, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Egggulyte3", "npc": "Egggulyte", "index": 3, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Egggulyte7", "npc": "Egggulyte", "index": 7, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Coastiolyte2", "npc": "Coastiolyte", "index": 2, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Coastiolyte5", "npc": "Coastiolyte", "index": 5, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Walupiggy1", "npc": "Walupiggy", "index": 1, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Walupiggy4", "npc": "Walupiggy", "index": 4, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Walupiggy7", "npc": "Walupiggy", "index": 7, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Walupiggy10", "npc": "Walupiggy", "index": 10, "accountWide": true},
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt3",
                        "npc": "Lord of the Hunt",
                        "index": 3,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt7",
                        "npc": "Lord of the Hunt",
                        "index": 7,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt10",
                        "npc": "Lord of the Hunt",
                        "index": 10,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt13",
                        "npc": "Lord of the Hunt",
                        "index": 13,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt16",
                        "npc": "Lord of the Hunt",
                        "index": 16,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt19",
                        "npc": "Lord of the Hunt",
                        "index": 19,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt22",
                        "npc": "Lord of the Hunt",
                        "index": 22,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt25",
                        "npc": "Lord of the Hunt",
                        "index": 25,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt28",
                        "npc": "Lord of the Hunt",
                        "index": 28,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Lord_of_the_Hunt31",
                        "npc": "Lord of the Hunt",
                        "index": 31,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{"key": "Toadstall4", "npc": "Toadstall", "index": 4, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Toadstall7", "npc": "Toadstall", "index": 7, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Toadstall10", "npc": "Toadstall", "index": 10, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Gangster_Gus2", "npc": "Gangster Gus", "index": 2, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Gangster_Gus5", "npc": "Gangster Gus", "index": 5, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Gangster_Gus10", "npc": "Gangster Gus", "index": 10, "accountWide": true},
                    <AccountWideQuestModel>{
                        "key": "Falloween_Pumpkin3",
                        "npc": "Falloween Pumpkin",
                        "index": 3,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Falloween_Pumpkin6",
                        "npc": "Falloween Pumpkin",
                        "index": 6,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Falloween_Pumpkin9",
                        "npc": "Falloween Pumpkin",
                        "index": 9,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Falloween_Pumpkin12",
                        "npc": "Falloween Pumpkin",
                        "index": 12,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Falloween_Pumpkin15",
                        "npc": "Falloween Pumpkin",
                        "index": 15,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{"key": "Worldo4", "npc": "Worldo", "index": 4, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Worldo7", "npc": "Worldo", "index": 7, "accountWide": true},
                    <AccountWideQuestModel>{
                        "key": "Giftmas_Blobulyte11",
                        "npc": "Giftmas Blobulyte",
                        "index": 11,
                        "accountWide": true
                    },
                    <AccountWideQuestModel>{
                        "key": "Carpenter_Cardinal1",
                        "npc": "Carpenter Cardinal",
                        "index": 1,
                        "accountWide": false
                    },
                    <AccountWideQuestModel>{"key": "Gobo3", "npc": "Gobo", "index": 3, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Gobo6", "npc": "Gobo", "index": 6, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Gobo9", "npc": "Gobo", "index": 9, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Gobo12", "npc": "Gobo", "index": 12, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Gobo16", "npc": "Gobo", "index": 16, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Blobbo1", "npc": "Blobbo", "index": 1, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Blobbo4", "npc": "Blobbo", "index": 4, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Nebula_Neddy2", "npc": "Nebula Neddy", "index": 2, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Lava_Larry2", "npc": "Lava Larry", "index": 2, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Rift_Ripper4", "npc": "Rift Ripper", "index": 4, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Muhmuguh2", "npc": "Muhmuguh", "index": 2, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Muhmuguh6", "npc": "Muhmuguh", "index": 6, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Muhmuguh10", "npc": "Muhmuguh", "index": 10, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Bubbulyte2", "npc": "Bubbulyte", "index": 2, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Omar_Da_Ogar2", "npc": "Omar Da Ogar", "index": 2, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Omar_Da_Ogar5", "npc": "Omar Da Ogar", "index": 5, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Omar_Da_Ogar8", "npc": "Omar Da Ogar", "index": 8, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Omar_Da_Ogar11", "npc": "Omar Da Ogar", "index": 11, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Omar_Da_Ogar14", "npc": "Omar Da Ogar", "index": 14, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Omar_Da_Ogar17", "npc": "Omar Da Ogar", "index": 17, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Lafu_Shi2", "npc": "Lafu Shi", "index": 2, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Lafu_Shi5", "npc": "Lafu Shi", "index": 5, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Lafu_Shi8", "npc": "Lafu Shi", "index": 8, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Lafu_Shi11", "npc": "Lafu Shi", "index": 11, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Lafu_Shi14", "npc": "Lafu Shi", "index": 14, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Lafu_Shi17", "npc": "Lafu Shi", "index": 17, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Woodlin_Elder2", "npc": "Woodlin Elder", "index": 2, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Woodlin_Elder5", "npc": "Woodlin Elder", "index": 5, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Woodlin_Elder8", "npc": "Woodlin Elder", "index": 8, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Woodlin_Elder11", "npc": "Woodlin Elder", "index": 11, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Woodlin_Elder14", "npc": "Woodlin Elder", "index": 14, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Sussy_Gene3", "npc": "Sussy Gene", "index": 3, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Sussy_Gene6", "npc": "Sussy Gene", "index": 6, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Sussy_Gene9", "npc": "Sussy Gene", "index": 9, "accountWide": true},
                    <AccountWideQuestModel>{
                        "key": "Spirit_Sungmin2",
                        "npc": "Spirit Sungmin",
                        "index": 2,
                        "accountWide": false
                    },
                    <AccountWideQuestModel>{"key": "Wavey_Wayne2", "npc": "Wavey Wayne", "index": 2, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Potti1", "npc": "Potti", "index": 3, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Potti2", "npc": "Potti", "index": 6, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Potti3", "npc": "Potti", "index": 9, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Potti4", "npc": "Potti", "index": 12, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Potti5", "npc": "Potti", "index": 15, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Potti6", "npc": "Potti", "index": 18, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Sad_Urie4", "npc": "Sad Urie", "index": 4, "accountWide": false},
                    <AccountWideQuestModel>{"key": "Snootie2", "npc": "Snootie", "index": 2, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Snootie5", "npc": "Snootie", "index": 5, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Snootie8", "npc": "Snootie", "index": 8, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Bloo_Radley1", "npc": "Bloo Radley", "index": 1, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Bloo_Radley4", "npc": "Bloo Radley", "index": 4, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Toobus_Goobus4", "npc": "Toobus Goobus", "index": 4, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Toobus_Goobus7", "npc": "Toobus Goobus", "index": 7, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Toobus_Goobus10", "npc": "Toobus Goobus", "index": 10, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Toobus_Goobus13", "npc": "Toobus Goobus", "index": 13, "accountWide": true},
                    <AccountWideQuestModel>{"key": "Zenelith1", "npc": "Zenelith", "index": 1, "accountWide": false}
                ]
            })    
]
}
