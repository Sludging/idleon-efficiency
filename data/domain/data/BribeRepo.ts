import { BribeModel } from '../model/bribeModel';

export class BribeBase { constructor(public id: string, public data: BribeModel) { } }



export const initBribeRepo = () => {
    return [    
        new BribeBase("Insider Trading", <BribeModel>{
                "name": "Insider Trading",
                "desc": "All stamps cost 5% less coins to upgrade.",
                "cost": 750,
                "type": "pigbank",
                "intName": "StampCostPct",
                "amount": 8
            }),
        new BribeBase("Tracking Chips", <BribeModel>{
                "name": "Tracking Chips",
                "desc": "Stamps drop +15% more often from monsters and resources that drop stamps.",
                "cost": 1800,
                "type": "pigbank",
                "intName": "StampDrop",
                "amount": 15
            }),
        new BribeBase("Mandatory Fire Sale", <BribeModel>{
                "name": "Mandatory Fire Sale",
                "desc": "All shop items cost 7% less coins.",
                "cost": 3200,
                "type": "shops",
                "intName": "ShopCostPct",
                "amount": 7
            }),
        new BribeBase("Sleeping on the Job", <BribeModel>{
                "name": "Sleeping on the Job",
                "desc": "Boosts fighting AFK Gains Rate by +5%",
                "cost": 6000,
                "type": "pigbank",
                "intName": "FightAfkRate",
                "amount": 5
            }),
        new BribeBase("Artificial Demand", <BribeModel>{
                "name": "Artificial Demand",
                "desc": "Items sell to shops for +10% more than their normal value.",
                "cost": 9000,
                "type": "shops",
                "intName": "ShopSellPct",
                "amount": 10
            }),
        new BribeBase("The Art of the Deal", <BribeModel>{
                "name": "The Art of the Deal",
                "desc": "Unlocks the next set of 7 Bribes to be purchased.",
                "cost": 15000,
                "type": "pigbank",
                "intName": "BribeExpansion",
                "amount": -1
            }),
        new BribeBase("Overstock Regulations", <BribeModel>{
                "name": "Overstock Regulations",
                "desc": "Item Quantity in all shops increased by +20%. Takes effect only after Shops restock.",
                "cost": 20000,
                "type": "shops",
                "intName": "ShopQtyPct",
                "amount": 20
            }),
        new BribeBase("Double Exp Scheme", <BribeModel>{
                "name": "Double Exp Scheme",
                "desc": "Whenever you claim AFK rewards, there is a 2.2% chance to get x2 EXP.",
                "cost": 222222,
                "type": "afk",
                "intName": "AfkDoubleEXP",
                "amount": 2.2
            }),
        new BribeBase("Tagged Indicators", <BribeModel>{
                "name": "Tagged Indicators",
                "desc": "Stamps drop +20% more often. Stacks with previous bribe of this type.",
                "cost": 30000,
                "type": "pigbank",
                "intName": "StampDrop",
                "amount": 20
            }),
        new BribeBase("Fossil Fuel Legislation", <BribeModel>{
                "name": "Fossil Fuel Legislation",
                "desc": "Oil Barrel consumption chance is reduced to 80% of the original chance.",
                "cost": 55000,
                "type": "smithing",
                "intName": "OilConsume",
                "amount": 0.2
            }),
        new BribeBase("Five Aces in the Deck", <BribeModel>{
                "name": "Five Aces in the Deck",
                "desc": "Card drop rate boosted by 1.20x for all areas of the game.",
                "cost": 70000,
                "type": "afk",
                "intName": "CardDropPct",
                "amount": 20
            }),
        new BribeBase("Fake Teleport Tickets", <BribeModel>{
                "name": "Fake Teleport Tickets",
                "desc": "Get +2 Map Teleport every 24 hours. Caps at 6, so being gone for 4 days only gives 6 tele.",
                "cost": 99000,
                "type": "pigbank",
                "intName": "FreeTeleport",
                "amount": 3
            }),
        new BribeBase("The Art of the Steal", <BribeModel>{
                "name": "The Art of the Steal",
                "desc": "Unlocks the next set of 7 Bribes to be purchased.",
                "cost": 200000,
                "type": "pigbank",
                "intName": "BribeExpansion",
                "amount": -1
            }),
        new BribeBase("Counterfeit Telepassports", <BribeModel>{
                "name": "Counterfeit Telepassports",
                "desc": "You now get +4 Map Teleports every 24 hours, and caps at 12 before you need to login.",
                "cost": 300000,
                "type": "pigbank",
                "intName": "FreeTeleport2",
                "amount": 2
            }),
        new BribeBase("Weighted Marbles", <BribeModel>{
                "name": "Weighted Marbles",
                "desc": "+10% arcade balls recharge rate. You'll be drowning in balls in no time!",
                "cost": 725000,
                "type": "world3",
                "intName": "ArcadeBallz",
                "amount": 10
            }),
        new BribeBase("Changing the Code", <BribeModel>{
                "name": "Changing the Code",
                "desc": "Unlock the 2nd Alchemy Bubble slot for ALL players. Don't go tellin' Lava 'bout this one...",
                "cost": 1500000,
                "type": "pigbank",
                "intName": "BubbleSlot",
                "amount": 1
            }),
        new BribeBase("Taxidermied Cog Pouches", <BribeModel>{
                "name": "Taxidermied Cog Pouches",
                "desc": "+4 Cog Inventory slots.",
                "cost": 750000,
                "type": "world3",
                "intName": "CogInve",
                "amount": 4
            }),
        new BribeBase("Guild VIP Fraud", <BribeModel>{
                "name": "Guild VIP Fraud",
                "desc": "Logging in each day now contributes 20 GP to your guild, instead of the normal 10.",
                "cost": 400000,
                "type": "afk",
                "intName": "BonusType",
                "amount": 10
            }),
        new BribeBase("Library Double Agent", <BribeModel>{
                "name": "Library Double Agent",
                "desc": "+4 minimum Lv for all Talent Books from the library, so you get more of the goood stuff.",
                "cost": 9156348,
                "type": "world3",
                "intName": "BonusType",
                "amount": 4
            }),
        new BribeBase("The Art of the Fail", <BribeModel>{
                "name": "The Art of the Fail",
                "desc": "Unlocks the next set of 7 Bribes to be purchased.",
                "cost": 25000000,
                "type": "pigbank",
                "intName": "BribeExpansion",
                "amount": -1
            }),
        new BribeBase("Photoshopped Dmg Range", <BribeModel>{
                "name": "Photoshopped Dmg Range",
                "desc": "Boosts Total Damage by +2%.",
                "cost": 100000000,
                "type": "pigbank",
                "intName": "TotalDmg",
                "amount": 2
            }),
        new BribeBase("Glitched Acc Formula", <BribeModel>{
                "name": "Glitched Acc Formula",
                "desc": "Boosts Total Accuracy by +2%",
                "cost": 3e+08,
                "type": "pigbank",
                "intName": "TotalAcc",
                "amount": 2
            }),
        new BribeBase("Firewalled Defence", <BribeModel>{
                "name": "Firewalled Defence",
                "desc": "Boosts Total Defence by +2%",
                "cost": 7e+08,
                "type": "pigbank",
                "intName": "TotalDef",
                "amount": 2
            }),
        new BribeBase("Bottomless Bags", <BribeModel>{
                "name": "Bottomless Bags",
                "desc": "Boosts Carry Capacity by +5%",
                "cost": 1.2e+09,
                "type": "pigbank",
                "intName": "CarryCap",
                "amount": 5
            }),
        new BribeBase("AFKeylogging", <BribeModel>{
                "name": "AFKeylogging",
                "desc": "Boosts Skill AFK Gains Rate by +2%.",
                "cost": 2e+10,
                "type": "afk",
                "intName": "SkillAFK",
                "amount": 2
            }),
        new BribeBase("Guild GP Hack", <BribeModel>{
                "name": "Guild GP Hack",
                "desc": "Logging in each day now contributes 30 GP to your guild, instead of 20.",
                "cost": 2.5e+09,
                "type": "afk",
                "intName": "Guild2",
                "amount": 10
            }),
        new BribeBase("The Art of the Bail", <BribeModel>{
                "name": "The Art of the Bail",
                "desc": "Look, I'm in a bit of a situation right now and need time to clean it up... come back later.",
                "cost": 99999999,
                "type": "pigbank",
                "intName": "BribeExpansion",
                "amount": -1
            })    
]
}
