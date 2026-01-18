import { VoteBonusModel } from '../model/voteBonusModel';

export class MeritocratyBonusBase { constructor(public index: number, public data: VoteBonusModel) { } }



export const initMeritocratyBonusRepo = () => {
    return [
        new MeritocratyBonusBase(0, <VoteBonusModel>{
            "text": "Multiplies everything in the game by 1.00x",
            "bonus": 0,
            "value": 0
        }),
        new MeritocratyBonusBase(1, <VoteBonusModel>{
            "text": "Multiplies all Gaming Bits gained by }x",
            "bonus": 700,
            "value": 0
        }),
        new MeritocratyBonusBase(2, <VoteBonusModel>{
            "text": "Multiplies your chance to get Double Snail Mail each day by }x",
            "bonus": 150,
            "value": 0
        }),
        new MeritocratyBonusBase(3, <VoteBonusModel>{
            "text": "Kattlekruk gives }x more Bubble LVs than normal each day",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(4, <VoteBonusModel>{
            "text": "Multiplies how many Shiny Critters you get from Trapping by }x",
            "bonus": 400,
            "value": 0
        }),
        new MeritocratyBonusBase(5, <VoteBonusModel>{
            "text": "Multiplies your Total Damage dealt to monsters by }x",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(6, <VoteBonusModel>{
            "text": "Multiplies all the Jade your ninja twins find by }x",
            "bonus": 900,
            "value": 0
        }),
        new MeritocratyBonusBase(7, <VoteBonusModel>{
            "text": "Multiplies your Monument Reward Multi by }x",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(8, <VoteBonusModel>{
            "text": "Multiplies your total Palette Luck in Gaming by }x",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(9, <VoteBonusModel>{
            "text": "The Bonus Ballo... ugh, THAT guy... the Bonus Ballot's stuff is like }x more or whatever...",
            "bonus": 100,
            "value": 0
        }),
        new MeritocratyBonusBase(10, <VoteBonusModel>{
            "text": "Multiplies Skill EXP gain by }x",
            "bonus": 125,
            "value": 0
        }),
        new MeritocratyBonusBase(11, <VoteBonusModel>{
            "text": "You get }x more Ribbons added to your Ribbon Shelf every day",
            "bonus": 100,
            "value": 0
        }),
        new MeritocratyBonusBase(12, <VoteBonusModel>{
            "text": "Multiplies Feather and Fish production Rate by }x for your friends Orion and Poppy",
            "bonus": 9900,
            "value": 0
        }),
        new MeritocratyBonusBase(13, <VoteBonusModel>{
            "text": "Your Beryllium atom creates }x more PO Boxes each day while still using up just 1 Silver Pen",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(14, <VoteBonusModel>{
            "text": "All material costs for upgrading Stamp Max LV are }x lower",
            "bonus": 100,
            "value": 0
        }),
        new MeritocratyBonusBase(15, <VoteBonusModel>{
            "text": "You're guaranteed }x more Crystal Mobs than normal to start each day",
            "bonus": 900,
            "value": 0
        }),
        new MeritocratyBonusBase(16, <VoteBonusModel>{
            "text": "Get }x more Worship PTS while playing Tower Defence",
            "bonus": 100,
            "value": 0
        }),
        new MeritocratyBonusBase(17, <VoteBonusModel>{
            "text": "Stamina Regeneration Rate in Spelunking is }x faster",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(18, <VoteBonusModel>{
            "text": "Multiplies the chance for Killroy Skulls to drop by }x",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(19, <VoteBonusModel>{
            "text": "When you claim 48hrs or less of AFK gains on a Masterclass, you get }x more AFK items",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(20, <VoteBonusModel>{
            "text": "All of your Vials give }x higher bonuses than normal",
            "bonus": 50,
            "value": 0
        }),
        new MeritocratyBonusBase(21, <VoteBonusModel>{
            "text": "All of your Sigils give }x higher bonuses than normal",
            "bonus": 40,
            "value": 0
        }),
        new MeritocratyBonusBase(22, <VoteBonusModel>{
            "text": "All of your Starsigns give }x higher bonuses than normal",
            "bonus": 60,
            "value": 0
        }),
        new MeritocratyBonusBase(23, <VoteBonusModel>{
            "text": "All of your Slab give }x higher bonuses than normal",
            "bonus": 30,
            "value": 0
        }),
        new MeritocratyBonusBase(24, <VoteBonusModel>{
            "text": "Your Brain Coral gives }x more daily LVs for your Grind Time bubble",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(25, <VoteBonusModel>{
            "text": "All masterclasses find }x more Bones, Dust, and Tachyons",
            "bonus": 200,
            "value": 0
        }),
        new MeritocratyBonusBase(26, <VoteBonusModel>{
            "text": "All of your Statue give }x higher bonuses than normal",
            "bonus": 50,
            "value": 0
        }),
        new MeritocratyBonusBase(27, <VoteBonusModel>{
            "text": "Multiplies Class EXP gain by }x",
            "bonus": 150,
            "value": 0
        })
    ];
}