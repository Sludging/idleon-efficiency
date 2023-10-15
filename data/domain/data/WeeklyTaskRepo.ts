import { WeeklyTaskModel } from '../model/weeklyTaskModel';

export class WeeklyTaskBase { constructor(public index: number, public data: WeeklyTaskModel) { } }



export const initWeeklyTaskRepo = () => {
    return [    
        new WeeklyTaskBase(0, <WeeklyTaskModel>{
                "desc": "You notice a weakspot that could be further exposed with a swing of your pickaxe...",
                "reqFor50": 60,
                "requirement": "Mining LV of",
                "icon": "a"
            }),
        new WeeklyTaskBase(1, <WeeklyTaskModel>{
                "desc": "A small hole on the speaker glistens in the light, just large enough to fit a fishing hook in...",
                "reqFor50": 50,
                "requirement": "Fishing LV of",
                "icon": "b"
            }),
        new WeeklyTaskBase(2, <WeeklyTaskModel>{
                "desc": "It looks like the boss is literally made of wood... fortunately your hatchet is on hand.",
                "reqFor50": 60,
                "requirement": "Choppin LV of",
                "icon": "c"
            }),
        new WeeklyTaskBase(3, <WeeklyTaskModel>{
                "desc": "The air feels electric, as though there are spirits abound. Maybe they could be of assistance...",
                "reqFor50": 50,
                "requirement": "Worship LV of",
                "icon": "d"
            }),
        new WeeklyTaskBase(4, <WeeklyTaskModel>{
                "desc": "Knowing which toxins will be most effective will aid in your next move...",
                "reqFor50": 50,
                "requirement": "Alchemy LV of",
                "icon": "e"
            }),
        new WeeklyTaskBase(5, <WeeklyTaskModel>{
                "desc": "Perhaps a bone could be dislodged by engrossing it with the end of your net...",
                "reqFor50": 50,
                "requirement": "Catching LV of",
                "icon": "f"
            }),
        new WeeklyTaskBase(6, <WeeklyTaskModel>{
                "desc": "Trapping critters has given you a keen sense of where best to strike...",
                "reqFor50": 40,
                "requirement": "Trapping LV of",
                "icon": "g"
            }),
        new WeeklyTaskBase(7, <WeeklyTaskModel>{
                "desc": "You don't quite know why, but your ability to cook various meals fills you with confidence!",
                "reqFor50": 35,
                "requirement": "Cooking LV of",
                "icon": "h"
            }),
        new WeeklyTaskBase(8, <WeeklyTaskModel>{
                "desc": "All that time spent in the tube has got to be useful for something, right? Maybe this situation?",
                "reqFor50": 60,
                "requirement": "Laboratory LV of",
                "icon": "i"
            }),
        new WeeklyTaskBase(9, <WeeklyTaskModel>{
                "desc": "You notice the divine signaling to you from their volcanos with what is likely helpful advice...",
                "reqFor50": 50,
                "requirement": "Divinity LV of",
                "icon": "j"
            }),
        new WeeklyTaskBase(10, <WeeklyTaskModel>{
                "desc": "A good bill of health can help turn any fight around, regardless of the opponent.",
                "reqFor50": 50000,
                "requirement": "Max HP of",
                "icon": "k"
            }),
        new WeeklyTaskBase(11, <WeeklyTaskModel>{
                "desc": "The wisdom that comes with large mana reserves will make your moves that more effective...",
                "reqFor50": 50000,
                "requirement": "Max MP of",
                "icon": "l"
            }),
        new WeeklyTaskBase(12, <WeeklyTaskModel>{
                "desc": "You take a moment to pinpoint the small areas of weakness to aim for...",
                "reqFor50": 200000,
                "requirement": "Accuracy of",
                "icon": "m"
            }),
        new WeeklyTaskBase(13, <WeeklyTaskModel>{
                "desc": "You've heard that great defence is the best offence, and are hoping it holds true here...",
                "reqFor50": 100000,
                "requirement": "Defence of",
                "icon": "n"
            }),
        new WeeklyTaskBase(14, <WeeklyTaskModel>{
                "desc": "With a spring in your step, you consider how best to use your agile frame to your advantage...",
                "reqFor50": 220,
                "requirement": "Movement Speed of",
                "icon": "o"
            }),
        new WeeklyTaskBase(15, <WeeklyTaskModel>{
                "desc": "There's got to be something useful in that massive inventory of yours...",
                "reqFor50": 10000,
                "requirement": "Material Carry Cap of",
                "icon": "p"
            }),
        new WeeklyTaskBase(16, <WeeklyTaskModel>{
                "desc": "You've learned a thing or two from all your past endeavors, making your next move all the better...",
                "reqFor50": 100,
                "requirement": "{ Completed Quests",
                "icon": "q"
            }),
        new WeeklyTaskBase(17, <WeeklyTaskModel>{
                "desc": "Cake by cake has fallen before you, and how different could a massive boss really be from a cake?",
                "reqFor50": 5,
                "requirement": "{ Digits of Crabcake Kills",
                "icon": "r"
            }),
        new WeeklyTaskBase(18, <WeeklyTaskModel>{
                "desc": "You lean on the vast amount of experience you've accumulated to drive your decision...",
                "reqFor50": 175,
                "requirement": "Class LV of",
                "icon": "s"
            }),
        new WeeklyTaskBase(19, <WeeklyTaskModel>{
                "desc": "Even something as trivial as defeating the weakest opponent can be helpful if done endlessly...",
                "reqFor50": 5,
                "requirement": "{ Digits of Green Mushroom Kills",
                "icon": "t"
            }),
        new WeeklyTaskBase(20, <WeeklyTaskModel>{
                "desc": "Standing firm against charging mobs has given you determination in situations like this...",
                "reqFor50": 5,
                "requirement": "{ Digits of Ram Kills",
                "icon": "u"
            }),
        new WeeklyTaskBase(21, <WeeklyTaskModel>{
                "desc": "The hours you've spent learning to fight with a height disadvantage are sure to pay off here...",
                "reqFor50": 5,
                "requirement": "{ Digits of Stiltmole Kills",
                "icon": "v"
            }),
        new WeeklyTaskBase(22, <WeeklyTaskModel>{
                "desc": "Knowledge and skills can only get you so far, but THIS is something you can always rely on...",
                "reqFor50": 7,
                "requirement": "{ Digits of Max Damage",
                "icon": "w"
            }),
        new WeeklyTaskBase(23, <WeeklyTaskModel>{
                "desc": "Dissecting the choccie monsters gives a deep understanding of... wait how does this help?",
                "reqFor50": 5,
                "requirement": "{ Digits of Choccie Kills",
                "icon": "y"
            }),
        new WeeklyTaskBase(24, <WeeklyTaskModel>{
                "desc": "Construction is a lot more than just building, it's also about breaking stuff...",
                "reqFor50": 50,
                "requirement": "Construction LV of",
                "icon": "z"
            })    
]
}
