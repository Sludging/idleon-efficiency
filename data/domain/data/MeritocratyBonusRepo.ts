import { MeritocratyBonusModel } from '../model/meritocratyBonusModel';

export class MeritocratyBonusBase { constructor(public index: number, public data: MeritocratyBonusModel) { } }



export const initMeritocratyBonusRepo = () => {
    return [    
        new MeritocratyBonusBase(0, <MeritocratyBonusModel>{"text": "Multiplies everything in the game by 1.00x", "bonus": 0, "value": 0}),
        new MeritocratyBonusBase(1, <MeritocratyBonusModel>{"text": "Multiplies all Gaming Bits gained by }x", "bonus": 700, "value": 0}),
        new MeritocratyBonusBase(2, <MeritocratyBonusModel>{
                "text": "Multiplies your chance to get Double Snail Mail each day by }x",
                "bonus": 150,
                "value": 0
            }),
        new MeritocratyBonusBase(3, <MeritocratyBonusModel>{
                "text": "Kattlekruk gives }x more Bubble LVs than normal each day",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(4, <MeritocratyBonusModel>{
                "text": "Multiplies how many Shiny Critters you get from Trapping by }x",
                "bonus": 400,
                "value": 0
            }),
        new MeritocratyBonusBase(5, <MeritocratyBonusModel>{
                "text": "Multiplies your Total Damage dealt to monsters by }x",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(6, <MeritocratyBonusModel>{
                "text": "Multiplies all the Jade your ninja twins find by }x",
                "bonus": 900,
                "value": 0
            }),
        new MeritocratyBonusBase(7, <MeritocratyBonusModel>{"text": "Multiplies your Monument Reward Multi by }x", "bonus": 200, "value": 0}),
        new MeritocratyBonusBase(8, <MeritocratyBonusModel>{
                "text": "Multiplies your total Palette Luck in Gaming by }x",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(9, <MeritocratyBonusModel>{
                "text": "The Bonus Ballo... ugh, THAT guy... the Bonus Ballot's stuff is like }x more or whatever...",
                "bonus": 100,
                "value": 0
            }),
        new MeritocratyBonusBase(10, <MeritocratyBonusModel>{"text": "Multiplies Skill EXP gain by }x", "bonus": 125, "value": 0}),
        new MeritocratyBonusBase(11, <MeritocratyBonusModel>{
                "text": "You get }x more Ribbons added to your Ribbon Shelf every day",
                "bonus": 100,
                "value": 0
            }),
        new MeritocratyBonusBase(12, <MeritocratyBonusModel>{
                "text": "Multiplies Feather and Fish production Rate by }x for your friends Orion and Poppy",
                "bonus": 9900,
                "value": 0
            }),
        new MeritocratyBonusBase(13, <MeritocratyBonusModel>{
                "text": "Your Beryllium atom creates }x more PO Boxes each day while still using up just 1 Silver Pen",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(14, <MeritocratyBonusModel>{
                "text": "All material costs for upgrading Stamp Max LV are }x lower",
                "bonus": 100,
                "value": 0
            }),
        new MeritocratyBonusBase(15, <MeritocratyBonusModel>{
                "text": "You're guaranteed }x more Crystal Mobs than normal to start each day",
                "bonus": 900,
                "value": 0
            }),
        new MeritocratyBonusBase(16, <MeritocratyBonusModel>{
                "text": "Get }x more Worship PTS while playing Tower Defence",
                "bonus": 100,
                "value": 0
            }),
        new MeritocratyBonusBase(17, <MeritocratyBonusModel>{
                "text": "Stamina Regeneration Rate in Spelunking is }x faster",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(18, <MeritocratyBonusModel>{
                "text": "Multiplies the chance for Killroy Skulls to drop by }x",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(19, <MeritocratyBonusModel>{
                "text": "When you claim 48hrs or less of AFK gains on a Masterclass, you get }x more AFK items",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(20, <MeritocratyBonusModel>{
                "text": "All of your Vials give }x higher bonuses than normal",
                "bonus": 50,
                "value": 0
            }),
        new MeritocratyBonusBase(21, <MeritocratyBonusModel>{
                "text": "All of your Sigils give }x higher bonuses than normal",
                "bonus": 40,
                "value": 0
            }),
        new MeritocratyBonusBase(22, <MeritocratyBonusModel>{
                "text": "All of your Starsigns give }x higher bonuses than normal",
                "bonus": 60,
                "value": 0
            }),
        new MeritocratyBonusBase(23, <MeritocratyBonusModel>{
                "text": "All of your Slab give }x higher bonuses than normal",
                "bonus": 30,
                "value": 0
            }),
        new MeritocratyBonusBase(24, <MeritocratyBonusModel>{
                "text": "Your Brain Coral gives }x more daily LVs for your Grind Time bubble",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(25, <MeritocratyBonusModel>{
                "text": "All masterclasses find }x more Bones, Dust, and Tachyons",
                "bonus": 200,
                "value": 0
            }),
        new MeritocratyBonusBase(26, <MeritocratyBonusModel>{
                "text": "All of your Statues give }x higher bonuses than normal",
                "bonus": 50,
                "value": 0
            }),
        new MeritocratyBonusBase(27, <MeritocratyBonusModel>{"text": "Multiplies Class EXP gain by }x", "bonus": 150, "value": 0})    
]
}
