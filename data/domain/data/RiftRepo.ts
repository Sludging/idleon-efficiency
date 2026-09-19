import { RiftChallengeModel } from '../model/riftChallengeModel';
import { RiftMilestoneModel } from '../model/riftMilestoneModel';
import { RiftModel } from '../model/riftModel';
import { RiftTargetModel } from '../model/riftTargetModel';
import { RiftTaskModel } from '../model/riftTaskModel';

export class RiftBase { constructor(public index: number, public data: RiftModel) { } }



export const initRiftRepo = () => {
    return [    
        new RiftBase(0, <RiftModel>{
                "challenges": [
                    <RiftChallengeModel>{
                        "index": 0,
                        "requirement": "DEFEAT_500_MONSTERS_WITHIN_5_MIN._@_YOU'VE_DEFEATED_{_SO_FAR...",
                        "threshold": 500
                    },
                    <RiftChallengeModel>{
                        "index": 1,
                        "requirement": "KILL_200000_MONSTERS_WHILE_AFK._YOU'VE_KILLED_{_SO_FAR...",
                        "threshold": 200000
                    },
                    <RiftChallengeModel>{
                        "index": 2,
                        "requirement": "COLLECT_3_RIFT_TEAR_DROPS_FROM_MOBS_WITHIN_60_MINUTES._YOU_HAVE_{_SO_FAR...",
                        "threshold": 3
                    },
                    <RiftChallengeModel>{
                        "index": 3,
                        "requirement": "DEFEAT_THE_MEGA_MONSTER,_WHO_CAN_SELF_HEAL,_ON_4_CHARS._YOU'VE_DONE_{_SO_FAR...",
                        "threshold": 4
                    },
                    <RiftChallengeModel>{
                        "index": 4,
                        "requirement": "DEFEAT_ALL_MOBS_BEFORE_THEY_RESPAWN_ON_3_CHARACTERS._YOU'VE_DONE_{_SO_FAR...",
                        "threshold": 3
                    },
                    <RiftChallengeModel>{
                        "index": 5,
                        "requirement": "KILL_A_LAVA_SKULL_MONSTER_ON_2_CHARS._SKULLS_SPREAD_HALF_THE_TIME._YOU_HAVE_{_SO_FAR...",
                        "threshold": 2
                    },
                    <RiftChallengeModel>{
                        "index": 6,
                        "requirement": "GET_AN_ORB_SCORE_OF_180_ON_YOUR_DIVINE_KNIGHT._YOUR_BEST_IS_{_SO_FAR...",
                        "threshold": 180
                    },
                    <RiftChallengeModel>{
                        "index": 7,
                        "requirement": "GET_A_PIRATE_FLAG_SCORE_OF_75_ON_YOUR_SIEGE_BREAKER._YOUR_BEST_IS_{_SO_FAR...",
                        "threshold": 75
                    },
                    <RiftChallengeModel>{
                        "index": 8,
                        "requirement": "GET_A_WORMHOLE_SCORE_OF_60_ON_YOUR_ELEMENTAL_SORCERER._YOUR_BEST_IS_{_SO_FAR...",
                        "threshold": 60
                    },
                    <RiftChallengeModel>{
                        "index": 9,
                        "requirement": "YOU_CANNOT_PROGRESS_FURTHER._BUT_THERE_WILL_BE_MORE...",
                        "threshold": 1
                    },
                    <RiftChallengeModel>{
                        "index": 10,
                        "requirement": "KILL_1000000_MONSTERS_WHILE_AFK._YOU'VE_KILLED_{_SO_FAR...",
                        "threshold": 1000000
                    },
                    <RiftChallengeModel>{
                        "index": 11,
                        "requirement": "KILL_5000000_MONSTERS_WHILE_AFK._YOU'VE_KILLED_{_SO_FAR...",
                        "threshold": 5000000
                    },
                    <RiftChallengeModel>{
                        "index": 12,
                        "requirement": "GET_5000_SKULL_POINTS._BETTER_SKULLS_ARE_WORTH_MORE._YOU_HAVE_{_SO_FAR...",
                        "threshold": 5000
                    },
                    <RiftChallengeModel>{
                        "index": 13,
                        "requirement": "GET_1000_SKULL_POINTS._BETTER_SKULLS_ARE_WORTH_MORE._YOU_HAVE_{_SO_FAR...",
                        "threshold": 1000
                    },
                    <RiftChallengeModel>{
                        "index": 14,
                        "requirement": "DEFEAT_ANY_MONSTER_HERE_ON_11_CHARS._YOU'VE_DONE_{_SO_FAR...",
                        "threshold": 11
                    },
                    <RiftChallengeModel>{
                        "index": 15,
                        "requirement": "DEFEAT_ANY_MONSTER_HERE_ON_12_CHARS._YOU'VE_DONE_{_SO_FAR...",
                        "threshold": 12
                    }
                ],
                "milestones": [
                    <RiftMilestoneModel>{"index": 0, "bonus": "Trap_Box_Vacuum"},
                    <RiftMilestoneModel>{"index": 1, "bonus": "Infinite_Stars"},
                    <RiftMilestoneModel>{"index": 2, "bonus": "Skill_Mastery"},
                    <RiftMilestoneModel>{"index": 3, "bonus": "Eclipse_Skulls"},
                    <RiftMilestoneModel>{"index": 4, "bonus": "Stamp_Mastery"},
                    <RiftMilestoneModel>{"index": 5, "bonus": "Eldritch_Artifact"},
                    <RiftMilestoneModel>{"index": 6, "bonus": "Vial_Mastery"},
                    <RiftMilestoneModel>{"index": 7, "bonus": "Construct_Mastery"},
                    <RiftMilestoneModel>{"index": 8, "bonus": "Ruby_Cards"},
                    <RiftMilestoneModel>{"index": 9, "bonus": "Killroy_Prime"},
                    <RiftMilestoneModel>{"index": 10, "bonus": "Sneak_Mastery"},
                    <RiftMilestoneModel>{"index": 11, "bonus": "Cooking_Mastery"},
                    <RiftMilestoneModel>{"index": 12, "bonus": "Rift_Guy"}
                ],
                "targets": [
                    <RiftTargetModel>{"index": 0, "target": "slimeG"},
                    <RiftTargetModel>{"index": 1, "target": "frogG"},
                    <RiftTargetModel>{"index": 2, "target": "crabcakeB"},
                    <RiftTargetModel>{"index": 3, "target": "potato"},
                    <RiftTargetModel>{"index": 4, "target": "rift1"},
                    <RiftTargetModel>{"index": 5, "target": "bloque"},
                    <RiftTargetModel>{"index": 6, "target": "glass"},
                    <RiftTargetModel>{"index": 7, "target": "snakeG"},
                    <RiftTargetModel>{"index": 8, "target": "w4b2"},
                    <RiftTargetModel>{"index": 9, "target": "rift2"},
                    <RiftTargetModel>{"index": 10, "target": "mamoth"},
                    <RiftTargetModel>{"index": 11, "target": "w5a1"},
                    <RiftTargetModel>{"index": 12, "target": "sandcastle"},
                    <RiftTargetModel>{"index": 13, "target": "frogBIG"},
                    <RiftTargetModel>{"index": 14, "target": "rift1"},
                    <RiftTargetModel>{"index": 15, "target": "jarSand"},
                    <RiftTargetModel>{"index": 16, "target": "flake"},
                    <RiftTargetModel>{"index": 17, "target": "w4c2"},
                    <RiftTargetModel>{"index": 18, "target": "eye"},
                    <RiftTargetModel>{"index": 19, "target": "rift3"},
                    <RiftTargetModel>{"index": 20, "target": "w5b1"},
                    <RiftTargetModel>{"index": 21, "target": "sheepB"},
                    <RiftTargetModel>{"index": 22, "target": "moonman"},
                    <RiftTargetModel>{"index": 23, "target": "carrotO"},
                    <RiftTargetModel>{"index": 24, "target": "rift2"},
                    <RiftTargetModel>{"index": 25, "target": "w4c1"},
                    <RiftTargetModel>{"index": 26, "target": "beanG"},
                    <RiftTargetModel>{"index": 27, "target": "snowball"},
                    <RiftTargetModel>{"index": 28, "target": "sandgiant"},
                    <RiftTargetModel>{"index": 29, "target": "rift4"},
                    <RiftTargetModel>{"index": 30, "target": "mushG"},
                    <RiftTargetModel>{"index": 31, "target": "snakeB"},
                    <RiftTargetModel>{"index": 32, "target": "ram"},
                    <RiftTargetModel>{"index": 33, "target": "w4b3"},
                    <RiftTargetModel>{"index": 34, "target": "rift1"},
                    <RiftTargetModel>{"index": 35, "target": "coconut"},
                    <RiftTargetModel>{"index": 36, "target": "w5a4"},
                    <RiftTargetModel>{"index": 37, "target": "w4b1"},
                    <RiftTargetModel>{"index": 38, "target": "w5b5"},
                    <RiftTargetModel>{"index": 39, "target": "rift3"},
                    <RiftTargetModel>{"index": 40, "target": "ghost"},
                    <RiftTargetModel>{"index": 41, "target": "potatoB"},
                    <RiftTargetModel>{"index": 42, "target": "penguin"},
                    <RiftTargetModel>{"index": 43, "target": "w5c2"},
                    <RiftTargetModel>{"index": 44, "target": "rift5"},
                    <RiftTargetModel>{"index": 45, "target": "w5b4"},
                    <RiftTargetModel>{"index": 46, "target": "w5a5"},
                    <RiftTargetModel>{"index": 47, "target": "w4b4"},
                    <RiftTargetModel>{"index": 48, "target": "w4c4"},
                    <RiftTargetModel>{"index": 49, "target": "rift4"},
                    <RiftTargetModel>{"index": 50, "target": "w6a1"},
                    <RiftTargetModel>{"index": 51, "target": "w5a2"},
                    <RiftTargetModel>{"index": 52, "target": "ratB"},
                    <RiftTargetModel>{"index": 53, "target": "frogG"},
                    <RiftTargetModel>{"index": 54, "target": "rift2"},
                    <RiftTargetModel>{"index": 55, "target": "w4a3"},
                    <RiftTargetModel>{"index": 56, "target": "w6a4"},
                    <RiftTargetModel>{"index": 57, "target": "w6a2"},
                    <RiftTargetModel>{"index": 58, "target": "w4c3"},
                    <RiftTargetModel>{"index": 59, "target": "rift1"},
                    <RiftTargetModel>{"index": 60, "target": "w6a3"},
                    <RiftTargetModel>{"index": 61, "target": "w5b2"},
                    <RiftTargetModel>{"index": 62, "target": "w6b2"},
                    <RiftTargetModel>{"index": 63, "target": "w6b3"},
                    <RiftTargetModel>{"index": 64, "target": "rift3"},
                    <RiftTargetModel>{"index": 65, "target": "w6b4"},
                    <RiftTargetModel>{"index": 66, "target": "w6c1"},
                    <RiftTargetModel>{"index": 67, "target": "w6c2"},
                    <RiftTargetModel>{"index": 68, "target": "w6d3"},
                    <RiftTargetModel>{"index": 69, "target": "rift5"}
                ],
                "taskOrder": [
                    <RiftTaskModel>{"index": 0, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 1, "challengeIndex": 2},
                    <RiftTaskModel>{"index": 2, "challengeIndex": 4},
                    <RiftTaskModel>{"index": 3, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 4, "challengeIndex": 3},
                    <RiftTaskModel>{"index": 5, "challengeIndex": 13},
                    <RiftTaskModel>{"index": 6, "challengeIndex": 3},
                    <RiftTaskModel>{"index": 7, "challengeIndex": 6},
                    <RiftTaskModel>{"index": 8, "challengeIndex": 8},
                    <RiftTaskModel>{"index": 9, "challengeIndex": 1},
                    <RiftTaskModel>{"index": 10, "challengeIndex": 2},
                    <RiftTaskModel>{"index": 11, "challengeIndex": 12},
                    <RiftTaskModel>{"index": 12, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 13, "challengeIndex": 4},
                    <RiftTaskModel>{"index": 14, "challengeIndex": 10},
                    <RiftTaskModel>{"index": 15, "challengeIndex": 7},
                    <RiftTaskModel>{"index": 16, "challengeIndex": 12},
                    <RiftTaskModel>{"index": 17, "challengeIndex": 6},
                    <RiftTaskModel>{"index": 18, "challengeIndex": 3},
                    <RiftTaskModel>{"index": 19, "challengeIndex": 10},
                    <RiftTaskModel>{"index": 20, "challengeIndex": 4},
                    <RiftTaskModel>{"index": 21, "challengeIndex": 7},
                    <RiftTaskModel>{"index": 22, "challengeIndex": 12},
                    <RiftTaskModel>{"index": 23, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 24, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 25, "challengeIndex": 2},
                    <RiftTaskModel>{"index": 26, "challengeIndex": 8},
                    <RiftTaskModel>{"index": 27, "challengeIndex": 3},
                    <RiftTaskModel>{"index": 28, "challengeIndex": 6},
                    <RiftTaskModel>{"index": 29, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 30, "challengeIndex": 13},
                    <RiftTaskModel>{"index": 31, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 32, "challengeIndex": 1},
                    <RiftTaskModel>{"index": 33, "challengeIndex": 4},
                    <RiftTaskModel>{"index": 34, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 35, "challengeIndex": 7},
                    <RiftTaskModel>{"index": 36, "challengeIndex": 2},
                    <RiftTaskModel>{"index": 37, "challengeIndex": 3},
                    <RiftTaskModel>{"index": 38, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 39, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 40, "challengeIndex": 4},
                    <RiftTaskModel>{"index": 41, "challengeIndex": 12},
                    <RiftTaskModel>{"index": 42, "challengeIndex": 6},
                    <RiftTaskModel>{"index": 43, "challengeIndex": 8},
                    <RiftTaskModel>{"index": 44, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 45, "challengeIndex": 10},
                    <RiftTaskModel>{"index": 46, "challengeIndex": 3},
                    <RiftTaskModel>{"index": 47, "challengeIndex": 2},
                    <RiftTaskModel>{"index": 48, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 49, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 50, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 51, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 52, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 53, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 54, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 55, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 56, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 57, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 58, "challengeIndex": 11},
                    <RiftTaskModel>{"index": 59, "challengeIndex": 14},
                    <RiftTaskModel>{"index": 60, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 61, "challengeIndex": 12},
                    <RiftTaskModel>{"index": 62, "challengeIndex": 3},
                    <RiftTaskModel>{"index": 63, "challengeIndex": 14},
                    <RiftTaskModel>{"index": 64, "challengeIndex": 7},
                    <RiftTaskModel>{"index": 65, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 66, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 67, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 68, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 69, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 70, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 71, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 72, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 73, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 74, "challengeIndex": 9},
                    <RiftTaskModel>{"index": 75, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 76, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 77, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 78, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 79, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 80, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 81, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 82, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 83, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 84, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 85, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 86, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 87, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 88, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 89, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 90, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 91, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 92, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 93, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 94, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 95, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 96, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 97, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 98, "challengeIndex": 0},
                    <RiftTaskModel>{"index": 99, "challengeIndex": 0}
                ]
            })    
]
}
