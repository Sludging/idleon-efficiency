import { StudyModel } from '../model/studyModel';

export class StudyBase { constructor(public index: number, public data: StudyModel) { } }



export const initStudyRepo = () => {
    return [    
        new StudyBase(0, <StudyModel>{
                "index": 0,
                "name": "THE WELL",
                "description": "You only lose 25% sediment when bar expanding instead of 50% Also, +{% Bucket Fill Rate per Bar Expansion",
                "multiplier": 10
            }),
        new StudyBase(1, <StudyModel>{
                "index": 1,
                "name": "MOTHERLODE",
                "description": "Every layer destroyed lowers the resources needed to destroy other skilling caverns by {%",
                "multiplier": 2
            }),
        new StudyBase(2, <StudyModel>{
                "index": 2,
                "name": "THE DEN",
                "description": "Defeating the Golden Hound gives a }x score multi and spawns another Golden Hound!",
                "multiplier": 5
            }),
        new StudyBase(3, <StudyModel>{
                "index": 3,
                "name": "BRAVERY",
                "description": "Minimum DMG is at least {% of Max, and you now skip trivial fights!",
                "multiplier": 3
            }),
        new StudyBase(4, <StudyModel>{
                "index": 4,
                "name": "THE BELL",
                "description": "Every 20th Bell Ring gives a random bonus +{ LVs. Biiig Ring baby!",
                "multiplier": 20
            }),
        new StudyBase(5, <StudyModel>{
                "index": 5,
                "name": "THE HARP",
                "description": "All strings give 2x EXP, and have a 1% chance of getting a massive {x EXP multi",
                "multiplier": 100
            }),
        new StudyBase(6, <StudyModel>{
                "index": 6,
                "name": "THE LAMP",
                "description": "Get { more lamp wishes every day. No, you can't wish to change this!",
                "multiplier": 1
            }),
        new StudyBase(7, <StudyModel>{
                "index": 7,
                "name": "THE HIVE",
                "description": "Every hive harvested lowers the resources needed to destroy other skilling caverns by {%",
                "multiplier": 5
            }),
        new StudyBase(8, <StudyModel>{
                "index": 8,
                "name": "GROTTO",
                "description": "Each Gloomie kill counts for }x more toward challenging the Monarch",
                "multiplier": 1
            }),
        new StudyBase(9, <StudyModel>{
                "index": 9,
                "name": "JUSTICE",
                "description": "Justice Reward Multi goes up 100% every day for +14 more days! Also, }x chance for opal reward!",
                "multiplier": 50
            }),
        new StudyBase(10, <StudyModel>{
                "index": 10,
                "name": "THE JARS",
                "description": "Double click to choose a collectible to be most likely enchanted! Also, }x Enchantment Chance!",
                "multiplier": 25
            }),
        new StudyBase(11, <StudyModel>{
                "index": 11,
                "name": "EVERTREE",
                "description": "Every trunk whittled lowers the resources needed to destroy other skilling caverns by {%",
                "multiplier": 5
            }),
        new StudyBase(12, <StudyModel>{
                "index": 12,
                "name": "WISDOM",
                "description": "If you end a round with no instamatches, you get one! Also, start with { more attempts!",
                "multiplier": 1
            }),
        new StudyBase(13, <StudyModel>{
                "index": 13,
                "name": "GAMBIT",
                "description": "+{% Total Gambit Points. Also, 50% chance to not use up your daily Gambit attempt when starting a Gambit!",
                "multiplier": 5
            }),
        new StudyBase(14, <StudyModel>{
                "index": 14,
                "name": "TEMPLE",
                "description": "There is an extra +{% chance to get double torches when picking them up!",
                "multiplier": 30
            })    
]
}
