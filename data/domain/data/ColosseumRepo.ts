import { ColEnemyModel } from '../model/colEnemyModel';
import { ColWaveModel } from '../model/colWaveModel';
import { ColosseumModel } from '../model/colosseumModel';

export class ColosseumBase { constructor(public index: number, public data: ColosseumModel) { } }



export const initColosseumRepo = () => {
    return [    
        new ColosseumBase(0, <ColosseumModel>{
                "name": "Dewdrop",
                "map": 2,
                "node": 14,
                "colMap": 36,
                "keyCost": 1,
                "infoX": 1071,
                "infoY": 53,
                "bronzeScore": 10000,
                "silverScore": 10000,
                "goldScore": 50000,
                "bronzeNode": 0,
                "silverNode": 1,
                "goldNode": 2,
                "bronzeX": 665,
                "silverX": 475,
                "goldX": 168,
                "waves": [
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "mushG", "qty": 6, "platform": 4, "baseScore": 250}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "frogG", "qty": 10, "platform": 4, "baseScore": 250}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "mushG", "qty": 6, "platform": 2, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "beanG", "qty": 10, "platform": 4, "baseScore": 250}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "frogG", "qty": 5, "platform": 2, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "beanG", "qty": 6, "platform": 4, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "mushR", "qty": 10, "platform": 4, "baseScore": 250}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "slimeG", "qty": 25, "platform": 4, "baseScore": 250}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "snakeG", "qty": 12, "platform": 4, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "snakeG", "qty": 8, "platform": 2, "baseScore": 200}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "carrotO", "qty": 14, "platform": 4, "baseScore": 200}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "goblinG", "qty": 16, "platform": 4, "baseScore": 200}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "plank", "qty": 18, "platform": 4, "baseScore": 175}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "frogBIG", "qty": 12, "platform": 4, "baseScore": 175},
                            <ColEnemyModel>{"enemy": "frogG", "qty": 10, "platform": 4, "baseScore": 150},
                            <ColEnemyModel>{"enemy": "frogG", "qty": 10, "platform": 2, "baseScore": 480},
                            <ColEnemyModel>{"enemy": "frogG", "qty": 8, "platform": 1, "baseScore": 650}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "branch", "qty": 14, "platform": 4, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "snakeG", "qty": 6, "platform": 4, "baseScore": 200}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "acorn", "qty": 16, "platform": 4, "baseScore": 230}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "poopSmall", "qty": 20, "platform": 4, "baseScore": 250}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "ratB", "qty": 15, "platform": 4, "baseScore": 175},
                            <ColEnemyModel>{"enemy": "poopSmall", "qty": 4, "platform": 4, "baseScore": 200},
                            <ColEnemyModel>{"enemy": "poopSmall", "qty": 7, "platform": 2, "baseScore": 200}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "branch", "qty": 12, "platform": 4, "baseScore": 150},
                            <ColEnemyModel>{"enemy": "plank", "qty": 10, "platform": 2, "baseScore": 480},
                            <ColEnemyModel>{"enemy": "mushR", "qty": 6, "platform": 1, "baseScore": 650},
                            <ColEnemyModel>{"enemy": "babayaga", "qty": 1, "platform": 4, "baseScore": 250}
                        ]
                    }
                ]
            }),
        new ColosseumBase(1, <ColosseumModel>{
                "name": "Sandstone",
                "map": 52,
                "node": 11,
                "colMap": 68,
                "keyCost": 2,
                "infoX": 632,
                "infoY": 86,
                "bronzeScore": 25000,
                "silverScore": 60000,
                "goldScore": 125000,
                "bronzeNode": 0,
                "silverNode": 0,
                "goldNode": 3,
                "bronzeX": 475,
                "silverX": 256,
                "goldX": 190,
                "waves": [
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "jarSand", "qty": 6, "platform": 0, "baseScore": 500}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "mimicA", "qty": 8, "platform": 0, "baseScore": 500}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "jarSand", "qty": 8, "platform": 3, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "mimicA", "qty": 10, "platform": 3, "baseScore": 250}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "jarSand", "qty": 15, "platform": 3, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "jarSand", "qty": 4, "platform": 0, "baseScore": 250}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "crabcake", "qty": 18, "platform": 3, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "mimicA", "qty": 8, "platform": 3, "baseScore": 250}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "coconut", "qty": 12, "platform": 3, "baseScore": 250}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "sandcastle", "qty": 16, "platform": 3, "baseScore": 200},
                            <ColEnemyModel>{"enemy": "coconut", "qty": 8, "platform": 0, "baseScore": 500}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "shovelR", "qty": 17, "platform": 3, "baseScore": 200}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "pincermin", "qty": 18, "platform": 3, "baseScore": 175}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "potato", "qty": 20, "platform": 3, "baseScore": 175},
                            <ColEnemyModel>{"enemy": "pincermin", "qty": 10, "platform": 0, "baseScore": 500},
                            <ColEnemyModel>{"enemy": "sandcastle", "qty": 7, "platform": 0, "baseScore": 500}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "steak", "qty": 14, "platform": 3, "baseScore": 250}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "moonman", "qty": 16, "platform": 3, "baseScore": 230},
                            <ColEnemyModel>{"enemy": "steak", "qty": 7, "platform": 0, "baseScore": 230}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "sandgiant", "qty": 28, "platform": 3, "baseScore": 250}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "snailZ", "qty": 18, "platform": 3, "baseScore": 175},
                            <ColEnemyModel>{"enemy": "moonman", "qty": 6, "platform": 3, "baseScore": 200}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "snailZ", "qty": 12, "platform": 0, "baseScore": 500},
                            <ColEnemyModel>{"enemy": "sandgiant", "qty": 7, "platform": 3, "baseScore": 150},
                            <ColEnemyModel>{"enemy": "moonman", "qty": 5, "platform": 3, "baseScore": 400},
                            <ColEnemyModel>{"enemy": "babaHour", "qty": 1, "platform": 3, "baseScore": 250}
                        ]
                    }
                ]
            }),
        new ColosseumBase(2, <ColosseumModel>{
                "name": "Chillsnap",
                "map": 103,
                "node": 9,
                "colMap": 115,
                "keyCost": 3,
                "infoX": 584,
                "infoY": 355,
                "bronzeScore": 50000,
                "silverScore": 125000,
                "goldScore": 300000,
                "bronzeNode": 0,
                "silverNode": 0,
                "goldNode": 1,
                "bronzeX": 50,
                "silverX": 375,
                "goldX": 708,
                "waves": [
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "sheep", "qty": 8, "platform": 3, "baseScore": 465}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "flake", "qty": 10, "platform": 3, "baseScore": 405}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "sheep", "qty": 8, "platform": 3, "baseScore": 705},
                            <ColEnemyModel>{"enemy": "flake", "qty": 10, "platform": 3, "baseScore": 250},
                            <ColEnemyModel>{"enemy": "rockS", "qty": 1, "platform": 1, "baseScore": 750}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "sheep", "qty": 5, "platform": 4, "baseScore": 500},
                            <ColEnemyModel>{"enemy": "flake", "qty": 4, "platform": 4, "baseScore": 700},
                            <ColEnemyModel>{"enemy": "stache", "qty": 9, "platform": 3, "baseScore": 230}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "bloque", "qty": 25, "platform": 3, "baseScore": 230},
                            <ColEnemyModel>{"enemy": "rockS", "qty": 1, "platform": 1, "baseScore": 750}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "bloque", "qty": 8, "platform": 0, "baseScore": 300},
                            <ColEnemyModel>{"enemy": "mamoth", "qty": 10, "platform": 3, "baseScore": 500}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "snowball", "qty": 14, "platform": 3, "baseScore": 400},
                            <ColEnemyModel>{"enemy": "snowball", "qty": 10, "platform": 4, "baseScore": 500},
                            <ColEnemyModel>{"enemy": "rockS", "qty": 1, "platform": 1, "baseScore": 750}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "penguin", "qty": 17, "platform": 3, "baseScore": 500},
                            <ColEnemyModel>{"enemy": "mamoth", "qty": 10, "platform": 0, "baseScore": 300}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "thermostat", "qty": 20, "platform": 4, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "thermostat", "qty": 14, "platform": 3, "baseScore": 400},
                            <ColEnemyModel>{"enemy": "penguin", "qty": 8, "platform": 3, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "snowball", "qty": 6, "platform": 0, "baseScore": 200},
                            <ColEnemyModel>{"enemy": "rockS", "qty": 1, "platform": 1, "baseScore": 750}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "glass", "qty": 14, "platform": 3, "baseScore": 400},
                            <ColEnemyModel>{"enemy": "rockS", "qty": 1, "platform": 1, "baseScore": 750}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "snakeB", "qty": 11, "platform": 3, "baseScore": 300},
                            <ColEnemyModel>{"enemy": "snakeB", "qty": 8, "platform": 0, "baseScore": 200},
                            <ColEnemyModel>{"enemy": "rockS", "qty": 1, "platform": 1, "baseScore": 750}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "speaker", "qty": 10, "platform": 3, "baseScore": 200},
                            <ColEnemyModel>{"enemy": "speaker", "qty": 10, "platform": 0, "baseScore": 300},
                            <ColEnemyModel>{"enemy": "speaker", "qty": 10, "platform": 3, "baseScore": 700}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "eye", "qty": 20, "platform": 3, "baseScore": 500},
                            <ColEnemyModel>{"enemy": "snakeB", "qty": 5, "platform": 3, "baseScore": 300},
                            <ColEnemyModel>{"enemy": "snakeB", "qty": 5, "platform": 3, "baseScore": 700},
                            <ColEnemyModel>{"enemy": "rockS", "qty": 1, "platform": 1, "baseScore": 750}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "eye", "qty": 4, "platform": 3, "baseScore": 330},
                            <ColEnemyModel>{"enemy": "eye", "qty": 4, "platform": 3, "baseScore": 470},
                            <ColEnemyModel>{"enemy": "speaker", "qty": 4, "platform": 3, "baseScore": 520},
                            <ColEnemyModel>{"enemy": "speaker", "qty": 4, "platform": 3, "baseScore": 280},
                            <ColEnemyModel>{"enemy": "glass", "qty": 5, "platform": 0, "baseScore": 200},
                            <ColEnemyModel>{"enemy": "glass", "qty": 5, "platform": 4, "baseScore": 400},
                            <ColEnemyModel>{"enemy": "mini3a", "qty": 1, "platform": 3, "baseScore": 400}
                        ]
                    }
                ]
            }),
        new ColosseumBase(3, <ColosseumModel>{
                "name": "Astro",
                "map": 152,
                "node": 13,
                "colMap": 164,
                "keyCost": 6,
                "infoX": 662,
                "infoY": 380,
                "bronzeScore": 125000,
                "silverScore": 325000,
                "goldScore": 650000,
                "bronzeNode": 0,
                "silverNode": 0,
                "goldNode": 0,
                "bronzeX": 300,
                "silverX": 700,
                "goldX": 950,
                "waves": [
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "mushP", "qty": 8, "platform": 0, "baseScore": 665}]
                    },
                    <ColWaveModel>{"enemies": [<ColEnemyModel>{"enemy": "w4a2", "qty": 8, "platform": 0, "baseScore": 665}]},
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "mushP", "qty": 4, "platform": 0, "baseScore": 465},
                            <ColEnemyModel>{"enemy": "w4a2", "qty": 8, "platform": 0, "baseScore": 965}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w4a3", "qty": 10, "platform": 0, "baseScore": 665}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w4a2", "qty": 10, "platform": 0, "baseScore": 665},
                            <ColEnemyModel>{"enemy": "w4a3", "qty": 10, "platform": 0, "baseScore": 665},
                            <ColEnemyModel>{"enemy": "demonP", "qty": 15, "platform": 0, "baseScore": 865}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w4b1", "qty": 12, "platform": 0, "baseScore": 665}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w4b2", "qty": 14, "platform": 0, "baseScore": 765},
                            <ColEnemyModel>{"enemy": "w4b1", "qty": 8, "platform": 0, "baseScore": 465}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w4b3", "qty": 16, "platform": 0, "baseScore": 665}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w4b4", "qty": 12, "platform": 0, "baseScore": 665},
                            <ColEnemyModel>{"enemy": "w4b2", "qty": 8, "platform": 0, "baseScore": 665},
                            <ColEnemyModel>{"enemy": "w4b1", "qty": 6, "platform": 0, "baseScore": 665}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w4b5", "qty": 20, "platform": 0, "baseScore": 665}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w4c1", "qty": 10, "platform": 0, "baseScore": 665}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w4c2", "qty": 17, "platform": 0, "baseScore": 665}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w4c3", "qty": 13, "platform": 0, "baseScore": 755},
                            <ColEnemyModel>{"enemy": "w4c1", "qty": 6, "platform": 0, "baseScore": 465}
                        ]
                    },
                    <ColWaveModel>{"enemies": [<ColEnemyModel>{"enemy": "w4c4", "qty": 8, "platform": 0, "baseScore": 665}]},
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w4c3", "qty": 13, "platform": 0, "baseScore": 465},
                            <ColEnemyModel>{"enemy": "w4c2", "qty": 6, "platform": 0, "baseScore": 865},
                            <ColEnemyModel>{"enemy": "w4c4", "qty": 20, "platform": 0, "baseScore": 665},
                            <ColEnemyModel>{"enemy": "mini4a", "qty": 1, "platform": 0, "baseScore": 700}
                        ]
                    }
                ]
            }),
        new ColosseumBase(4, <ColosseumModel>{
                "name": "Molten",
                "map": 202,
                "node": 10,
                "colMap": 215,
                "keyCost": 10,
                "infoX": 103,
                "infoY": 10,
                "bronzeScore": 800000,
                "silverScore": 3000000,
                "goldScore": 7000000,
                "bronzeNode": 1,
                "silverNode": 1,
                "goldNode": 2,
                "bronzeX": 900,
                "silverX": 1020,
                "goldX": 400,
                "waves": [
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 14, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a1", "qty": 13, "platform": 0, "baseScore": 1245}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 10, "platform": 3, "baseScore": 261},
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 15, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a1", "qty": 20, "platform": 2, "baseScore": 592}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 5, "platform": 0, "baseScore": 1245},
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 10, "platform": 2, "baseScore": 592},
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 8, "platform": 3, "baseScore": 261}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 14, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a2", "qty": 20, "platform": 2, "baseScore": 592}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a2", "qty": 13, "platform": 0, "baseScore": 1245}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 10, "platform": 3, "baseScore": 261},
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 15, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 5, "platform": 0, "baseScore": 1245},
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 10, "platform": 2, "baseScore": 592},
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 8, "platform": 3, "baseScore": 261}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 14, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a3", "qty": 13, "platform": 0, "baseScore": 1245}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 10, "platform": 3, "baseScore": 261},
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 15, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a3", "qty": 20, "platform": 2, "baseScore": 592}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 5, "platform": 0, "baseScore": 1245},
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 10, "platform": 2, "baseScore": 592},
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 8, "platform": 3, "baseScore": 261}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 14, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a4", "qty": 13, "platform": 0, "baseScore": 1245}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 10, "platform": 3, "baseScore": 261},
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 15, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a4", "qty": 20, "platform": 2, "baseScore": 592}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 5, "platform": 0, "baseScore": 1245},
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 10, "platform": 2, "baseScore": 592},
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 8, "platform": 3, "baseScore": 261}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a5", "qty": 13, "platform": 0, "baseScore": 1245}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a5", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a5", "qty": 14, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a5", "qty": 10, "platform": 3, "baseScore": 261},
                            <ColEnemyModel>{"enemy": "w5a5", "qty": 15, "platform": 2, "baseScore": 592}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w5a5", "qty": 20, "platform": 2, "baseScore": 592}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w5a1", "qty": 5, "platform": 0, "baseScore": 1245},
                            <ColEnemyModel>{"enemy": "w5a2", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 8, "platform": 1, "baseScore": 973},
                            <ColEnemyModel>{"enemy": "w5a3", "qty": 10, "platform": 2, "baseScore": 592},
                            <ColEnemyModel>{"enemy": "w5a5", "qty": 10, "platform": 2, "baseScore": 592},
                            <ColEnemyModel>{"enemy": "w5a4", "qty": 8, "platform": 3, "baseScore": 261},
                            <ColEnemyModel>{"enemy": "mini5a", "qty": 1, "platform": 2, "baseScore": 592}
                        ]
                    }
                ]
            }),
        new ColosseumBase(5, <ColosseumModel>{
                "name": "Whimsical",
                "map": 252,
                "node": 9,
                "colMap": 265,
                "keyCost": 30,
                "infoX": 139,
                "infoY": 536,
                "bronzeScore": 5000000,
                "silverScore": 20000000,
                "goldScore": 40000000,
                "bronzeNode": 0,
                "silverNode": 1,
                "goldNode": 2,
                "bronzeX": 590,
                "silverX": 470,
                "goldX": 400,
                "waves": [
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 14, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a1", "qty": 13, "platform": 0, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 10, "platform": 2, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 15, "platform": 1, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a1", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 5, "platform": 0, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 10, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 14, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 13, "platform": 0, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 10, "platform": 2, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 15, "platform": 1, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 5, "platform": 0, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 10, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 15, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 13, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a3", "qty": 10, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a3", "qty": 15, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 15, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a1", "qty": 15, "platform": 0, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a1", "qty": 13, "platform": 0, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 10, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 15, "platform": 0, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a1", "qty": 20, "platform": 0, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a1", "qty": 15, "platform": 0, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 15, "platform": 1, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 13, "platform": 1, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 10, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 15, "platform": 1, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 20, "platform": 1, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 20, "platform": 1, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 15, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 13, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a3", "qty": 10, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a3", "qty": 15, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a4", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a4", "qty": 14, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a4", "qty": 13, "platform": 0, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a4", "qty": 10, "platform": 2, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a4", "qty": 15, "platform": 1, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a4", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a4", "qty": 5, "platform": 0, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a4", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a4", "qty": 10, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 14, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 13, "platform": 0, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 10, "platform": 2, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 15, "platform": 1, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 5, "platform": 0, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a2", "qty": 10, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 15, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 13, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a3", "qty": 10, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a3", "qty": 15, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a3", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a5", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a4", "qty": 14, "platform": 2, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a2", "qty": 13, "platform": 1, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "w6a3", "qty": 10, "platform": 2, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a5", "qty": 15, "platform": 1, "baseScore": 600}
                        ]
                    },
                    <ColWaveModel>{
                        "enemies": [<ColEnemyModel>{"enemy": "w6a4", "qty": 20, "platform": 2, "baseScore": 600}]
                    },
                    <ColWaveModel>{
                        "enemies": [
                            <ColEnemyModel>{"enemy": "mini6a", "qty": 1, "platform": 0, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a1", "qty": 8, "platform": 1, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a3", "qty": 10, "platform": 2, "baseScore": 600},
                            <ColEnemyModel>{"enemy": "w6a5", "qty": 10, "platform": 2, "baseScore": 600}
                        ]
                    }
                ]
            })    
]
}
