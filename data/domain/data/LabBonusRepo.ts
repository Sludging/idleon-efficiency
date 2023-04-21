import { LabBonusModel } from '../model/labBonusModel';

export class LabBonusBase { constructor(public index: number, public data: LabBonusModel) { } }



export const initLabBonusRepo = () => {
    return [    
        new LabBonusBase(0, <LabBonusModel>{
                "no": 0,
                "x": 91,
                "y": 353,
                "range": 90,
                "bonusOn": 0,
                "bonusOff": 1,
                "name": "Animal Farm",
                "description": "+1% Total Damage for every different species you have bred within Pet Breeding. You just need to breed the pet type one time for it to count! @ - @ Total Bonus: {%"
            }),
        new LabBonusBase(1, <LabBonusModel>{
                "no": 1,
                "x": 250,
                "y": 310,
                "range": 90,
                "bonusOn": 1,
                "bonusOff": 2,
                "name": "Wired In",
                "description": "All Uploaded Players print 2x more resources from their section of the 3D Printer. The displayed amount will NOT appear doubled, just to avoid confusion as to what your actual base Sampling Rate is, but it will be displayed in blue."
            }),
        new LabBonusBase(2, <LabBonusModel>{
                "no": 2,
                "x": 356,
                "y": 147,
                "range": 90,
                "bonusOn": 1,
                "bonusOff": 3,
                "name": "Gilded Cyclical Tubing",
                "description": "All refinery cycles occur 3x faster. Faster cycles means more salts!"
            }),
        new LabBonusBase(3, <LabBonusModel>{
                "no": 3,
                "x": 450,
                "y": 220,
                "range": 90,
                "bonusOn": 0,
                "bonusOff": 1,
                "name": "No Bubble Left Behind",
                "description": "Every 24 hours, your 3 lowest level Alchemy Bubbles gets +1 Lv. This only applies to bubbles Lv 5 or higher, so it's more like 'your lowest level bubble that is at least level 5'. ALSO, it only works on the first 15 bubbles of each colour! @ Doesn't trigger on days that you don't login."
            }),
        new LabBonusBase(4, <LabBonusModel>{
                "no": 4,
                "x": 538,
                "y": 362,
                "range": 90,
                "bonusOn": 1,
                "bonusOff": 2,
                "name": "Killer's Brightside",
                "description": "All monster kills count for 2x more than normal for things like opening portals and Death Note. Doesn't increase resource drops or exp gain."
            }),
        new LabBonusBase(5, <LabBonusModel>{
                "no": 5,
                "x": 651,
                "y": 200,
                "range": 90,
                "bonusOn": 0,
                "bonusOff": 1,
                "name": "Shrine World Tour",
                "description": "If a shrine is placed within town, instead of in a monster map, it will act as though it is placed in EVERY map in that entire world!"
            }),
        new LabBonusBase(6, <LabBonusModel>{
                "no": 6,
                "x": 753,
                "y": 113,
                "range": 90,
                "bonusOn": 1,
                "bonusOff": 5,
                "name": "Viaduct of the Gods",
                "description": "All alchemy liquids have x5 higher max capacity. However, you regenerate alchemy liquids -30% slower."
            }),
        new LabBonusBase(7, <LabBonusModel>{
                "no": 7,
                "x": 824,
                "y": 377,
                "range": 90,
                "bonusOn": 1,
                "bonusOff": 2,
                "name": "Certified Stamp Book",
                "description": "All Stamps, except for MISC tab stamps, give DOUBLE the bonus."
            }),
        new LabBonusBase(8, <LabBonusModel>{
                "no": 8,
                "x": 945,
                "y": 326,
                "range": 90,
                "bonusOn": 1,
                "bonusOff": 1.5,
                "name": "Spelunker Obol",
                "description": "1.50x higher effects from all active Jewels within the Mainframe, and gives you +50% rememberance of the game Idle Skilling. @ This bonus always has a 80px connection range no matter what!"
            }),
        new LabBonusBase(9, <LabBonusModel>{
                "no": 9,
                "x": 990,
                "y": 148,
                "range": 90,
                "bonusOn": 0,
                "bonusOff": 2,
                "name": "Fungi Finger Pocketer",
                "description": "+2% extra cash from monsters for every 1 million Green Mushroom kills your account has, which can be viewed at Death Note. @ - @ Total Bonus: {%"
            }),
        new LabBonusBase(10, <LabBonusModel>{
                "no": 10,
                "x": 1177,
                "y": 163,
                "range": 90,
                "bonusOn": 1,
                "bonusOff": 2,
                "name": "My 1st Chemistry Set",
                "description": "All Vials in Alchemy give DOUBLE the bonus. The bonus description will reflect this doubling."
            }),
        new LabBonusBase(11, <LabBonusModel>{
                "no": 11,
                "x": 1300,
                "y": 380,
                "range": 90,
                "bonusOn": 0,
                "bonusOff": 2,
                "name": "Unadulterated Banking Fury",
                "description": "+2% Total Damage for each 'green stack' of resources in your bank. A 'green stack' is a stack in your Storage Chest with 10 million or more items, since the number turns Green after 10M! @ - @ Total Bonus: {%"
            }),
        new LabBonusBase(12, <LabBonusModel>{
                "no": 12,
                "x": 400,
                "y": 390,
                "range": 90,
                "bonusOn": 0,
                "bonusOff": 1,
                "name": "Sigils of Olden Alchemy",
                "description": "Allows you to level up Alchemy Sigils by assigning players in alchemy, at a base rate of 1 sigil xp per hour. @ Sigils can be leveled up just twice: Once to unlock their bonus, and once more to boost their bonus. Their bonuses are passive, and apply to all characters always."
            }),
        new LabBonusBase(13, <LabBonusModel>{
                "no": 13,
                "x": 1430,
                "y": 265,
                "range": 90,
                "bonusOn": 0,
                "bonusOff": 50,
                "name": "Viral Connection",
                "description": "All mainframe bonuses and jewels have a 50% larger connection range, unless it states otherwise. @ This bonus always has a 80px connection range no matter what!"
            })    
]
}
