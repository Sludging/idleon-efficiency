import { LampWishModel } from '../model/lampWishModel';

export class LampWishBase { constructor(public index: number, public data: LampWishModel) { } }



export const initLampWishRepo = () => {
    return [    
        new LampWishBase(0, <LampWishModel>{
                "name": "More Wishes",
                "x1": 1,
                "x2": 3,
                "x3": 1,
                "desc": "Your wish is my command... wait stop no you can't just wish for more wishes!!"
            }),
        new LampWishBase(1, <LampWishModel>{
                "name": "Another Try",
                "x1": 6,
                "x2": 0,
                "x3": 0,
                "desc": "That sounds like a fair request, what exactly would you like another try at? @"
            }),
        new LampWishBase(2, <LampWishModel>{
                "name": "1000000 Opals",
                "x1": 2,
                "x2": 2,
                "x3": 1,
                "desc": "A million opals??!? M'lord please, lets be reasonable here! I can give to you but one opal..."
            }),
        new LampWishBase(3, <LampWishModel>{
                "name": "Bring Them Back",
                "x1": 2,
                "x2": 0,
                "x3": 0,
                "desc": "I'm sorry, I can't do this... it wouldn't be right. @ But I can grant 12 hours of respect, to whom should it go? @"
            }),
        new LampWishBase(4, <LampWishModel>{
                "name": "World 4 Stuff",
                "x1": 1,
                "x2": 0.2,
                "x3": 1,
                "desc": "Uhh, sure, how about these bonuses: @ +{% Cooking Speed @ +% Shiny Pet LV Up & Breedability Rate @ +~% Lab EXP gain"
            }),
        new LampWishBase(5, <LampWishModel>{
                "name": "A Moderate Discount",
                "x1": 2,
                "x2": 0.5,
                "x3": 1,
                "desc": "A... discount? Just a discount? Thats uh, yea, that is certainly doable m'lord. @ I can grant an additional 15% discount on the next Engineer Schematic creation!"
            }),
        new LampWishBase(6, <LampWishModel>{
                "name": "World 5 Things",
                "x1": 1,
                "x2": 0.2,
                "x3": 1,
                "desc": "Wow very specific! How about: @ +{% Sailing Loot Value @ +% Bits gain @ +~% Divinity Pts gain"
            }),
        new LampWishBase(7, <LampWishModel>{
                "name": "Infinite Resources",
                "x1": 1,
                "x2": 0.05,
                "x3": 1,
                "desc": "Infinite isn't a number, it's more of a concept... and conceptually my existence is impossible. @ Instead, I'll grant a #x bonus to Well and Harp resource gain!"
            }),
        new LampWishBase(8, <LampWishModel>{
                "name": "World 6 Majigers",
                "x1": 1,
                "x2": 0.2,
                "x3": 1,
                "desc": "Yes yes majigers, how about things like: @ +{% Next Crop chance @ +% Stealth for Ninja twins @ +~% All Essence gain"
            }),
        new LampWishBase(9, <LampWishModel>{
                "name": "Knowledge of Future",
                "x1": 999,
                "x2": 999,
                "x3": 1,
                "desc": "If I told you what the future was, it wouldn't really be the future anymore would it m'lord? No, you'll have to wait for the future to be the now."
            }),
        new LampWishBase(10, <LampWishModel>{
                "name": "World 7 Stuff",
                "x1": 999,
                "x2": 999,
                "x3": 1,
                "desc": "Bah, you should start with wishing for World 7 in the first place! We both know it doesn't exist yet!"
            }),
        new LampWishBase(11, <LampWishModel>{
                "name": "World 8 Stuff",
                "x1": 999,
                "x2": 999,
                "x3": 1,
                "desc": "Oh please, World 8? Is this 'World 8' in the room with us right now? M'lord, you waste both our time!"
            })    
]
}
