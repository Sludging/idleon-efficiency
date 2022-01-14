export const BribeConst = {
    StampBribe: 0
};

export enum BribeStatus {
    Purchased = 1,
    Available = 0,
    Locked = -1
}

export class Bribe {
    public status: BribeStatus = BribeStatus.Locked;

    constructor(public bribeIndex: number, public name: string, public description: string, public cost: number, public type: string, public bonus: string, public value: number) { }
}

const initBribes = () => {
    return [
        new Bribe(0, "Insider Trading", "All stamps cost 5% less coins to upgrade.", 750, "pigbank", "StampCostPct", 8),
        new Bribe(1, "Tracking Chips", "Stamps drop +15% more often from monsters and resources that drop stamps.", 1800, "pigbank", "StampDrop", 15),
        new Bribe(2, "Mandatory Fire Sale", "All shop items cost 7% less coins.", 3200, "shops", "ShopCostPct", 7),
        new Bribe(3, "Sleeping on the Job", "Boosts fighting AFK Gains Rate by +5%", 6000, "pigbank", "FightAfkRate", 5),
        new Bribe(4, "Artificial Demand", "Items sell to shops for +10% more than their normal value.", 9000, "shops", "ShopSellPct", 10),
        new Bribe(5, "The Art of the Deal", "Unlocks the next set of 7 Bribes to be purchased.", 15000, "pigbank", "BribeExpansion", -1),
        new Bribe(6, "Overstock Regulations", "Item Quantity in all shops increased by +20%. Takes effect only after Shops restock.", 20000, "shops", "ShopQtyPct", 20),
        new Bribe(7, "Double Exp Scheme", "Whenever you claim AFK rewards, there is a 2.2% chance to get x2 EXP.", 222222, "afk", "AfkDoubleEXP", 2.2),
        new Bribe(8, "Tagged Indicators", "Stamps drop +20% more often. Stacks with previous bribe of this type.", 30000, "pigbank", "StampDrop", 20),
        new Bribe(9, "Fossil Fuel Legislation", "Oil Barrel consumption chance is reduced to 80% of the original chance.", 55000, "smithing", "OilConsume", 0.2),
        new Bribe(10, "Five Aces in the Deck", "Card drop rate boosted by 1.20x for all areas of the game.", 70000, "afk", "CardDropPct", 20),
        new Bribe(11, "Fake Teleport Tickets", "Get +2 Map Teleport every 24 hours. Caps at 6, so being gone for 4 days only gives 6 tele.", 99000, "pigbank", "FreeTeleport", 3),
        new Bribe(12, "The Art of the Steal", "Unlocks the next set of 7 Bribes to be purchased.", 200000, "pigbank", "BribeExpansion", -1),
        new Bribe(13, "Counterfeit Telepassports", "You now get +4 Map Teleports every 24 hours, and caps at 12 before you need to login.", 300000, "pigbank", "FreeTeleport2", 2),
        new Bribe(14, "Weighted Marbles", "+10% arcade balls recharge rate. You'll be drowning in balls in no time!", 725000, "world3", "ArcadeBallz", 2),
        new Bribe(15, "Changing the Code", "Unlock the 2nd Alchemy Bubble slot for ALL players. Don't go tellin' Lava 'bout this one...", 1500000, "pigbank", "BubbleSlot", 1),
        new Bribe(16, "Taxidermied Cog Pouches", "+4 Cog Inventory slots.", 750000, "world3", "CogInve", 4),
        new Bribe(17, "Guild VIP Fraud", "Logging in each day now contributes 20 GP to your guild, instead of the normal 10.", 400000, "afk", "BonusType", 10),
        new Bribe(18, "Library Double Agent", "+4 minimum Lv for all Talent Books from the library, so you get more of the goood stuff.", 9156348, "world3", "BonusType", 4),
        new Bribe(19, "The Art of the Fail", "Unlocks the next set of 7 Bribes to be purchased.", 25000000, "pigbank", "BribeExpansion", -1),
        new Bribe(20, "Photoshopped Dmg Range", "Boosts Total Damage by +2%.", 100000000, "pigbank", "TotalDmg", 2),
        new Bribe(21, "Glitched Acc Formula", "Boosts Total Accuracy by +2%", 300000000.0, "pigbank", "TotalAcc", 2),
        new Bribe(22, "Firewalled Defence", "Boosts Total Defence by +2%", 700000000.0, "pigbank", "TotalDef", 2),
        new Bribe(23, "Bottomless Bags", "Boosts Carry Capacity by +5%", 1200000000.0, "pigbank", "CarryCap", 5),
        new Bribe(24, "AFKeylogging", "Boosts Skill AFK Gains Rate by +2%.", 20000000000.0, "afk", "SkillAFK", 2),
        new Bribe(25, "Guild GP Hack", "Logging in each day now contributes 30 GP to your guild, instead of 20.", 2500000000.0, "afk", "Guild2", 10),
        new Bribe(26, "The Art of the Bail", "Look, I'm in a bit of a situation right now and need time to clean it up... come back later.", 99999999, "pigbank", "BribeExpansion", -1),
    ];
}

export default function parseBribes(bribesData: number[]) {
    let bribeArray = initBribes();
    bribesData.forEach((bribe, index) => {
        if (index < bribeArray.length) { // ignore future values
            bribeArray[index].status = bribe as BribeStatus;
        }
    })
    return bribeArray;
}