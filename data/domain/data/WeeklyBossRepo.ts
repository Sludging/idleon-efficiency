import { WeeklyBossModel } from '../model/weeklyBossModel';
import { WeeklyTaskModel } from '../model/weeklyTaskModel';

export class WeeklyBossBase { constructor(public index: number, public data: WeeklyBossModel) { } }



export const initWeeklyBossRepo = () => {
    return [    
        new WeeklyBossBase(0, <WeeklyBossModel>{
                "name": "Eclectic Lazlo",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "It looks like the boss is literally made of wood... fortunately your hatchet is on hand.",
                        "reqFor50": 60,
                        "requirement": "Choppin LV of",
                        "icon": "c"
                    },
                    <WeeklyTaskModel>{
                        "desc": "The air feels electric, as though there are spirits abound. Maybe they could be of assistance...",
                        "reqFor50": 50,
                        "requirement": "Worship LV of",
                        "icon": "d"
                    },
                    <WeeklyTaskModel>{
                        "desc": "You lean on the vast amount of experience you've accumulated to drive your decision...",
                        "reqFor50": 175,
                        "requirement": "Class LV of",
                        "icon": "s"
                    }
                ],
                "health": 200,
                "healthMult": 2.6,
                "x": 440,
                "y": 90,
                "xOff": 0
            }),
        new WeeklyBossBase(1, <WeeklyBossModel>{
                "name": "Decibop Box",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "A small hole on the speaker glistens in the light, just large enough to fit a fishing hook in...",
                        "reqFor50": 50,
                        "requirement": "Fishing LV of",
                        "icon": "b"
                    },
                    <WeeklyTaskModel>{
                        "desc": "The hours you've spent learning to fight with a height disadvantage are sure to pay off here...",
                        "reqFor50": 5,
                        "requirement": "{ Digits of Stiltmole Kills",
                        "icon": "v"
                    },
                    <WeeklyTaskModel>{
                        "desc": "It looks like the boss is literally made of wood... fortunately your hatchet is on hand.",
                        "reqFor50": 60,
                        "requirement": "Choppin LV of",
                        "icon": "c"
                    }
                ],
                "health": 250,
                "healthMult": 2.8,
                "x": 442,
                "y": 95,
                "xOff": -5
            }),
        new WeeklyBossBase(2, <WeeklyBossModel>{
                "name": "Mutalius Cuboid",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "Perhaps a bone could be dislodged by engrossing it with the end of your net...",
                        "reqFor50": 50,
                        "requirement": "Catching LV of",
                        "icon": "f"
                    },
                    <WeeklyTaskModel>{
                        "desc": "Even something as trivial as defeating the weakest opponent can be helpful if done endlessly...",
                        "reqFor50": 5,
                        "requirement": "{ Digits of Green Mushroom Kills",
                        "icon": "t"
                    },
                    <WeeklyTaskModel>{
                        "desc": "Knowing which toxins will be most effective will aid in your next move...",
                        "reqFor50": 50,
                        "requirement": "Alchemy LV of",
                        "icon": "e"
                    }
                ],
                "health": 300,
                "healthMult": 2.7,
                "x": 434,
                "y": 105,
                "xOff": -15
            }),
        new WeeklyBossBase(3, <WeeklyBossModel>{
                "name": "Jupiteye Major",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "Trapping critters has given you a keen sense of where best to strike...",
                        "reqFor50": 40,
                        "requirement": "Trapping LV of",
                        "icon": "g"
                    },
                    <WeeklyTaskModel>{
                        "desc": "Construction is a lot more than just building, it's also about breaking stuff...",
                        "reqFor50": 50,
                        "requirement": "Construction LV of",
                        "icon": "z"
                    },
                    <WeeklyTaskModel>{
                        "desc": "You lean on the vast amount of experience you've accumulated to drive your decision...",
                        "reqFor50": 175,
                        "requirement": "Class LV of",
                        "icon": "s"
                    }
                ],
                "health": 400,
                "healthMult": 2.5,
                "x": 443,
                "y": 100,
                "xOff": -10
            }),
        new WeeklyBossBase(4, <WeeklyBossModel>{
                "name": "The Nugenator",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "Cake by cake has fallen before you, and how different could a massive boss really be from a cake?",
                        "reqFor50": 5,
                        "requirement": "{ Digits of Crabcake Kills",
                        "icon": "r"
                    },
                    <WeeklyTaskModel>{
                        "desc": "You don't quite know why, but your ability to cook various meals fills you with confidence!",
                        "reqFor50": 35,
                        "requirement": "Cooking LV of",
                        "icon": "h"
                    },
                    <WeeklyTaskModel>{
                        "desc": "You notice a weakspot that could be further exposed with a swing of your pickaxe...",
                        "reqFor50": 60,
                        "requirement": "Mining LV of",
                        "icon": "a"
                    }
                ],
                "health": 100,
                "healthMult": 3.7,
                "x": 440,
                "y": 95,
                "xOff": -5
            }),
        new WeeklyBossBase(5, <WeeklyBossModel>{
                "name": "Fat Eggplonk",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "Knowing which toxins will be most effective will aid in your next move...",
                        "reqFor50": 50,
                        "requirement": "Alchemy LV of",
                        "icon": "e"
                    },
                    <WeeklyTaskModel>{
                        "desc": "You lean on the vast amount of experience you've accumulated to drive your decision...",
                        "reqFor50": 175,
                        "requirement": "Class LV of",
                        "icon": "s"
                    },
                    <WeeklyTaskModel>{
                        "desc": "Even something as trivial as defeating the weakest opponent can be helpful if done endlessly...",
                        "reqFor50": 5,
                        "requirement": "{ Digits of Green Mushroom Kills",
                        "icon": "t"
                    }
                ],
                "health": 600,
                "healthMult": 2.3,
                "x": 441,
                "y": 91,
                "xOff": -1
            }),
        new WeeklyBossBase(6, <WeeklyBossModel>{
                "name": "Mollo Gomm",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "You notice a weakspot that could be further exposed with a swing of your pickaxe...",
                        "reqFor50": 60,
                        "requirement": "Mining LV of",
                        "icon": "a"
                    },
                    <WeeklyTaskModel>{
                        "desc": "There's got to be something useful in that massive inventory of yours...",
                        "reqFor50": 10000,
                        "requirement": "Material Carry Cap of",
                        "icon": "p"
                    },
                    <WeeklyTaskModel>{
                        "desc": "You lean on the vast amount of experience you've accumulated to drive your decision...",
                        "reqFor50": 175,
                        "requirement": "Class LV of",
                        "icon": "s"
                    }
                ],
                "health": 1000,
                "healthMult": 1.9,
                "x": 440,
                "y": 101,
                "xOff": -11
            }),
        new WeeklyBossBase(7, <WeeklyBossModel>{
                "name": "Unit T-31",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "All that time spent in the tube has got to be useful for something, right? Maybe this situation?",
                        "reqFor50": 60,
                        "requirement": "Laboratory LV of",
                        "icon": "i"
                    },
                    <WeeklyTaskModel>{
                        "desc": "You notice the divine signaling to you from their volcanos with what is likely helpful advice...",
                        "reqFor50": 50,
                        "requirement": "Divinity LV of",
                        "icon": "j"
                    },
                    <WeeklyTaskModel>{
                        "desc": "Standing firm against charging mobs has given you determination in situations like this...",
                        "reqFor50": 5,
                        "requirement": "{ Digits of Ram Kills",
                        "icon": "u"
                    }
                ],
                "health": 200,
                "healthMult": 3,
                "x": 438,
                "y": 93,
                "xOff": -3
            }),
        new WeeklyBossBase(8, <WeeklyBossModel>{
                "name": "SWR Containment",
                "possibleTasks": [
                    <WeeklyTaskModel>{
                        "desc": "You don't quite know why, but your ability to cook various meals fills you with confidence!",
                        "reqFor50": 35,
                        "requirement": "Cooking LV of",
                        "icon": "h"
                    },
                    <WeeklyTaskModel>{
                        "desc": "Dissecting the choccie monsters gives a deep understanding of... wait how does this help?",
                        "reqFor50": 5,
                        "requirement": "{ Digits of Choccie Kills",
                        "icon": "y"
                    },
                    <WeeklyTaskModel>{
                        "desc": "Construction is a lot more than just building, it's also about breaking stuff...",
                        "reqFor50": 50,
                        "requirement": "Construction LV of",
                        "icon": "z"
                    }
                ],
                "health": 350,
                "healthMult": 2.6,
                "x": 439,
                "y": 105,
                "xOff": -15
            })    
]
}
