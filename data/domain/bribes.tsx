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

    constructor(public name: string, public description: string, public cost: number, public type: string, public bonus: string, public value: number) { }
}

const initBribes = () => {
    return [
        new Bribe("Insider Trading", "All stamps cost 5% less coins to upgrade.", 750, "pigbank", "StampCostPct", 8),
        new Bribe("Tracking Chips", "Stamps drop +15% more often from monsters and resources that drop stamps.", 1800, "pigbank", "StampDrop", 15),
        new Bribe("Mandatory Fire Sale", "All shop items cost 7% less coins.", 3200, "shops", "ShopCostPct", 7),
        new Bribe("Sleeping on the Job", "Boosts fighting AFK Gains Rate by +5%", 6000, "pigbank", "FightAfkRate", 5),
        new Bribe("Artificial Demand", "Items sell to shops for +10% more than their normal value.", 9000, "shops", "ShopSellPct", 10),
        new Bribe("Overstock Regulations", "Item Quantity in all shops increased by +20%. Takes effect only after Shops restock.", 20000, "shops", "ShopQtyPct", 20),
        new Bribe("Double Exp Scheme", "Whenever you claim AFK rewards, there is a 2.2% chance to get x2 EXP.", 222222, "afk", "AfkDoubleEXP", 2.2),
        new Bribe("Tagged Indicators", "Stamps drop +20% more often. Stacks with previous bribe of this type.", 30000, "pigbank", "StampDrop", 20),
        new Bribe("Fossil Fuel Legislation", "Oil Barrel consumption chance is reduced to 80% of the original chance.", 55000, "smithing", "OilConsume", 0.2),
        new Bribe("Five Aces in the Deck", "Card drop rate boosted by 1.20x for all areas of the game.", 70000, "afk", "CardDropPct", 20),
        new Bribe("Fake Teleport Tickets", "Get +2 Map Teleport every 24 hours. Caps at 6, so being gone for 4 days only gives 6 tele.", 99000, "pigbank", "FreeTeleport", 3),
        new Bribe("Counterfeit Telepassports", "You now get +4 Map Teleports every 24 hours, and caps at 12 before you need to login.", 300000, "pigbank", "FreeTeleport2", 2),
        new Bribe("Weighted Marbles", "+10% arcade balls recharge rate. You'll be drowning in balls in no time!", 725000, "world3", "ArcadeBallz", 2),
        new Bribe("Changing the Code", "Unlock the 2nd Alchemy Bubble slot for ALL players. Don't go tellin' Lava 'bout this one...", 1500000, "pigbank", "BubbleSlot", 1),
        new Bribe("Taxidermied Cog Pouches", "+4 Cog Inventory slots.", 750000, "world3", "CogInve", 4),
        new Bribe("Guild VIP Fraud", "Logging in each day now contributes 20 GP to your guild, instead of the normal 10.", 400000, "afk", "BonusType", 10),
        new Bribe("Library Double Agent", "+4 minimum Lv for all Talent Books from the library, so you get more of the goood stuff.", 9156348, "world3", "BonusType", 4),
        new Bribe("Filler", "You now get +2 Map Teleports every 24 hours, and caps at 6 before you need to login.", 300000, "pigbank", "BonusType", -1),
        new Bribe("Filler", "+2 daily pachinko balls for the Arcade. It's not open yet, consider this a preorder.", 725000, "pigbank", "BonusType", -1),
        new Bribe("Filler", "Unlock the 2nd Alchemy Bubble slot, for ALL players.", 2500000, "pigbank", "BonusType", -1),
        new Bribe("Filler", "+4 Cog Inventory slots.", 1000000, "pigbank", "BonusType", -1),
        new Bribe("Filler", "Logging in each day now contributes 20 GP to your guild, instead of the normal 10.", 400000, "afk", "BonusType", -1),
        new Bribe("Filler", "+4 minimum Lv for all Talent Books from the library, so you get more of the goood stuff.", 9156348, "pigbank", "BonusType", -1),
    ];
}

export default function parseBribes(bribesData: boolean[]) {
    let bribeArray = initBribes();
    bribesData.forEach((bribe, index) => {
        if (index < bribeArray.length) { // ignore future values
            bribeArray[index].status = bribe;
        }
    })

    return bribeArray;
}