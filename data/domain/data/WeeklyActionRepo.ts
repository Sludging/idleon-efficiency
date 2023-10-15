import { ActionTypeEnum } from '../enum/actionTypeEnum';
import { WeeklyActionModel } from '../model/weeklyActionModel';

export class WeeklyActionBase { constructor(public index: number, public data: WeeklyActionModel) { } }



export const initWeeklyActionRepo = () => {
    return [    
        new WeeklyActionBase(0, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "You steady your nerves and strike the boss directly, dealing { damage",
                "scaling": 1,
                "max": 1000,
                "key": "none"
            }),
        new WeeklyActionBase(1, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Buff,
                "desc": "You drop your weapon, drawing attention and allowing the next ATTACK to deal {% more damage",
                "scaling": 1,
                "max": 150,
                "key": "a"
            }),
        new WeeklyActionBase(2, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Buff,
                "desc": "You tell the others of a new technique, so every ATTACK in the future deals {% more damage",
                "scaling": 0.5,
                "max": 60,
                "key": "b"
            }),
        new WeeklyActionBase(3, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Misc,
                "desc": "Tired and slightly agitated, you take a tea drinking break, giving +{% Class EXP for all characters.",
                "scaling": 1,
                "max": 30,
                "key": "c"
            }),
        new WeeklyActionBase(4, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "You burn their skin, dealing { damage. This exact damage re-triggers each time an ATTACK is chosen.",
                "scaling": 1,
                "max": 400,
                "key": "d"
            }),
        new WeeklyActionBase(5, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Buff,
                "desc": "You conjure a friendly spirit, which boosts all damage dealt to boss by %",
                "scaling": 1,
                "max": 40,
                "key": "e"
            }),
        new WeeklyActionBase(6, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "You clamp a cursed ring to their toe, dealing { damage now and each time a BUFF is cast in the future.",
                "scaling": 1,
                "max": 250,
                "key": "k"
            }),
        new WeeklyActionBase(7, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "Dual wielding the next characters weapon, you deal { damage, but the next char can't choose ATTACK.",
                "scaling": 1.5,
                "max": 1500,
                "key": "f"
            }),
        new WeeklyActionBase(8, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Misc,
                "desc": "You add extra chilly cheese to everyone's hotdogs outside the fight, giving +{% DMG to all characters",
                "scaling": 1,
                "max": 10,
                "key": "g"
            }),
        new WeeklyActionBase(9, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "You just start randomly grabbing weapons, dealing { damage, but the next 2 chars can't choose ATTACK.",
                "scaling": 1.5,
                "max": 2500,
                "key": "f"
            }),
        new WeeklyActionBase(10, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Buff,
                "desc": "You cast a gross but effective fog, increasing all damage by %, but the next char can't choose BUFF.",
                "scaling": 1.5,
                "max": 120,
                "key": "h"
            }),
        new WeeklyActionBase(11, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "You trip and fall dealing { damage lmao, but the boss's HP gets set to 30% from laughing so hard.",
                "scaling": 1,
                "max": 0,
                "key": "none"
            }),
        new WeeklyActionBase(12, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Buff,
                "desc": "You align the energy in the air, so that the next BUFF is 2x more powerful, except for this one. No 4x for you.",
                "scaling": 0,
                "max": 1,
                "key": "i"
            }),
        new WeeklyActionBase(13, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Buff,
                "desc": "You create a portal to the 'oof owie' dimension, so that whatever damage hits the boss next is doubled.",
                "scaling": 0,
                "max": 1,
                "key": "j"
            }),
        new WeeklyActionBase(14, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Misc,
                "desc": "You notice a trophy on the ground, and run to pick it up instead of attacking.",
                "scaling": 0,
                "max": 1,
                "key": "none"
            }),
        new WeeklyActionBase(15, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "Deal { damage for each previous ATTACK cast. If 3 or more, rewind a character and reset number of casts",
                "scaling": 1,
                "max": 650,
                "key": "none"
            }),
        new WeeklyActionBase(16, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Buff,
                "desc": "Boost all damage by {% for each previous BUFF cast. If 3 or more, rewind a character and reset number of casts",
                "scaling": 1,
                "max": 25,
                "key": "e"
            }),
        new WeeklyActionBase(17, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Misc,
                "desc": "You reminisce on all the times MISC was cast. If 2 or more, rewind back to 1st character. This only works once.",
                "scaling": 0,
                "max": 1,
                "key": "none"
            }),
        new WeeklyActionBase(18, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Misc,
                "desc": "You tell a really freakin' funny joke to your final character, who gets to select an extra turn!",
                "scaling": 0,
                "max": 1,
                "key": "o"
            }),
        new WeeklyActionBase(19, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "You sense weakness and deal a crushing blow of { damage. If boss is under half HP, damage is dealt twice.",
                "scaling": 1,
                "max": 700,
                "key": "none"
            }),
        new WeeklyActionBase(20, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Attack,
                "desc": "Punch them into yesteryear, dealing { damage. If 9+ ATTACK casted, rewind to 1st character. Only works once.",
                "scaling": 1,
                "max": 500,
                "key": "none"
            }),
        new WeeklyActionBase(21, <WeeklyActionModel>{
                "actionType": ActionTypeEnum.Buff,
                "desc": "Summon a blackhole, boosting all damage by %. If 9+ BUFF casted, rewind to 1st character. Only works once.",
                "scaling": 1,
                "max": 30,
                "key": "e"
            })    
]
}
