interface GemData {
    itemName: string
    desc: string
    cost: number
    no: number
    maxPurchases: number
    qty: number
    costIncrement: number
}

export class GemPurchase {
    itemName: string
    desc: string
    cost: number
    maxPurchases: number
    qty: number
    costIncrement: number
    no: number

    pucrhased = 0;

    constructor(data: GemData) {
        this.itemName = data.itemName;
        this.desc = data.desc;
        this.cost = data.cost;
        this.maxPurchases = data.maxPurchases;
        this.qty = data.qty;
        this.costIncrement = data.costIncrement;
        this.no = data.no;
    }
}

export class GemStore {
    purchases: GemPurchase[] = initPurchases();

    constructor(rawData: number[]) {
        rawData.forEach((data, index) => {
            if (data > 0) {
                let purchase = this.purchases.find(x => x.no == index);
                if (purchase) {
                    purchase.pucrhased = data;
                }
            }
        })
    }
}

const initPurchases = () => {
    return [
        new GemPurchase(JSON.parse('{"name": "EquipmentHats46", "itemName": "Strawbiggy", "desc": "This is the ACTUAL strawberry from the Buddhist story about the Tiger and the Strawberry. No wonder the dangling man thought it so tasty!", "cost": 250, "no": 3, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats47", "itemName": "Pop Cat", "desc": "\'Ew cringe.\' Said the teenager, in a selfish attempt to diminish the joy others experience from something so they can feel better about not liking it.", "cost": 250, "no": 2, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats48", "itemName": "Dairy Dunk", "desc": "It\'s like getting pied, but instead of pie it\'s ice cream and instead of a basketball and a hoop its this ice cream and your head.", "cost": 250, "no": 1, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Ht", "itemName": "Hat Premumifier", "desc": "Turns any normal hat into a premium hat! Buy this if you have a really cool hat with bad stats, so you can wear that while also wearing a different hat with good stats! NOTE:This will erase all stats, and give it +1 All Stat and 5 Premium Upgrade Slots.", "cost": 250, "no": 0, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats49", "itemName": "The Classic", "desc": "Oh this? Why, this is only the PEAK fashion statement in all of IdleOn! Influenced by trends of the late 2000s, its back and hotter than ever!", "cost": 275, "no": 6, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats50", "itemName": "Green Beanie", "desc": "Lets be honest... this is just the Bored Beanie but less cool", "cost": 250, "no": 5, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats35", "itemName": "Diamond Demon Horns", "desc": "Definitely the coolest hat in the game, lets be real. That\'s why it\'s also the most expensive!", "cost": 3000, "no": 4, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats38", "itemName": "Invisible Hat", "desc": "This hat is invisible, and your normal hat will show up instead. Buy this hat if you want to use some Premium Upgrade Stones, while still seeing your normal hat!", "cost": 200, "no": 7, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentRingsChat1", "itemName": "Lovers Chat Ring", "desc": "", "cost": 300, "no": 24, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentRingsChat2", "itemName": "All Natural Chat Ring", "desc": "", "cost": 250, "no": 25, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentRingsChat4", "itemName": "Bandit Bob Chat Ring", "desc": "", "cost": 350, "no": 26, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentRingsChat5", "itemName": "Bubble Pop Chat Ring", "desc": "", "cost": 325, "no": 27, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentRingsChat6", "itemName": "Eyes Of Cthulu Chat Ring", "desc": "", "cost": 400, "no": 28, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentRingsChat3", "itemName": "Money Talks Chat Ring", "desc": "", "cost": 2500, "no": 31, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentRingsChat9", "itemName": "Honk Ring", "desc": "", "cost": 300, "no": 29, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 30, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 8, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 9, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 10, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 11, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 12, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 13, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 14, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 15, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 16, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 17, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 18, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 19, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 20, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 21, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 22, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 23, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 32, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 33, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 34, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 35, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 36, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 37, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 38, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 39, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 40, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 41, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 42, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 43, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 44, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 45, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 46, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentHats1", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 47, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Timecandy1", "itemName": "Just One, Please", "desc": "Gives you a single 1 Hour Candy. Also, you\'re not a real adventurer in Flapjack\'s eyes. Sorry, just tellin\' ya like it is!", "cost": 40, "no": 47, "maxPurchases": 4, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Timecandy2", "itemName": "Baby\'S First Lolly", "desc": "Gives a random Time Candy. The chances are: 34% for 1 Hr, 33% for 2 Hr, and 33% for 4 Hr.", "cost": 80, "no": 48, "maxPurchases": 4, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Timecandy3", "itemName": "Kid In A Candy Store", "desc": "Gives a random Time Candy. The chances are: 50% for 2 Hr, 25% for 4 Hr, 18% for 12 Hr, and 7% for 24 Hr.", "cost": 150, "no": 49, "maxPurchases": 4, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Timecandy4", "itemName": "Absolute Sugar Maniac", "desc": "Gives a random Time Candy. The chances are: 33% for 4 Hr, 40% for 12 Hr, 22% for 24 Hr, and 4% for 72 Hr.", "cost": 270, "no": 50, "maxPurchases": 4, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 51, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 52, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 53, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Cosmic Candy", "desc": "Gives 1 Cosmic Time Candy, which can give up to 500 HOURS of AFK time! On average, it will give 24 hrs.", "cost": 325, "no": 54, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "InvBag21", "itemName": "Item Backpack Space", "desc": "Gives +4 extra Item Slots for your backpack! Applies to all your characters, even ones you haven\'t made yet!", "cost": 200, "no": 55, "maxPurchases": 6, "qty": 1, "costIncrement": 25}')),
        new GemPurchase(JSON.parse('{"name": "InvStorage31", "itemName": "Storage Chest Space", "desc": "Gives +9 extra Storage Chest Slots! Storage Chests are found in each town, and the items you put in are shared by all your players!", "cost": 175, "no": 56, "maxPurchases": 12, "qty": 1, "costIncrement": 25}')),
        new GemPurchase(JSON.parse('{"name": "GemP2", "itemName": "Carry Capacity", "desc": "Each purchase boosts the carry capacity by +25% for all your characters. This starts working immediately, and applies to every item type!", "cost": 150, "no": 58, "maxPurchases": 10, "qty": 0, "costIncrement": 25}')),
        new GemPurchase(JSON.parse('{"name": "GemP8", "itemName": "Food Slot", "desc": "Gives +1 extra food slot for all characters, forever! Dont worry, 4 food slots will be added FOR FREE in game in later updates, scattered across the game!", "cost": 450, "no": 59, "maxPurchases": 2, "qty": 0, "costIncrement": 300}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 109, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 60, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 61, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 62, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Pdaily0", "itemName": "Daily Teleports", "desc": "Each purchase gives +7 daily teleports every day, forever. You can use these on the Map Screen. You can be gone for up to 4 days and claim them all upon your return!", "cost": 200, "no": 71, "maxPurchases": 7, "qty": 0, "costIncrement": 60}')),
        new GemPurchase(JSON.parse('{"name": "Pdaily1", "itemName": "Daily Minigame Plays", "desc": "Each purchase gives you +4 additional Daily Minigame Plays across your account. These dont stack from day to day, else youd be swimmin\' in them!", "cost": 150, "no": 72, "maxPurchases": 4, "qty": 0, "costIncrement": 50}')),
        new GemPurchase(JSON.parse('{"name": "ResetCompleted", "itemName": "Regular Talent Reset", "desc": "Resets all your talents to Lv 0, and fully refunds all talent points. This does NOT reset any of the                     Star Tab talents.                  This item restocks each week.", "cost": 200, "no": 73, "maxPurchases": 10, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "ResetCompletedS", "itemName": "Star Talent Reset", "desc": "Resets all the talents in the Star Tab to Lv 0, and fully refunds all talent points. This does NOT reset other talents, only ones in the Star Tab. This item restocks each week.", "cost": 300, "no": 74, "maxPurchases": 3, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "ClassSwap", "itemName": "Subclass Swap Token", "desc": "Lets you swap subclass, like going from Barbarian to Squire. HOWEVER, you CANT change between main classes, like going from a Warrior to an Archer. You can only buy 2 every major update.", "cost": 500, "no": 75, "maxPurchases": 2, "qty": 1, "costIncrement": 250}')),
        new GemPurchase(JSON.parse('{"name": "ResetBox", "itemName": "Pandoras Office Box", "desc": "Resets all your post office upgrades, and            refunds all boxes spent. This lets you choose          different post office box upgrades!            This item restocks each week.", "cost": 250, "no": 76, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 77, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 78, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "CardPack1", "itemName": "Newbie Card Pack", "desc": "Contains 3 cards from any set in the game, other than world 3 because it\'s not out yet. Has a 15% chance to give at least one Boss Card. Card Lv Rarities are: 50% for Lv 1, 35% for Lv 2, and 15% for Lv 3.", "cost": 200, "no": 64, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "CardPack2", "itemName": "Ancient Card Pack", "desc": "Contains 4 cards from any set in the game, other than world 3 because it\'s not out yet. Has a 40% chance to give at least one Boss Card. Card Lv Rarities are: 26% for Lv 1, 30% for Lv 2, 27% for Lv 3, and 17% for Lv 4.", "cost": 425, "no": 65, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "CardPack3", "itemName": "Eternal Card Pack", "desc": "Blah", "cost": 600, "no": 65, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "CardPack5", "itemName": "Galaxy Card Pack", "desc": "Blah", "cost": 650, "no": 69, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP3", "itemName": "Extra Card Slot", "desc": "Lets you equip another card, so you can have more card bonuses! This applies to all characters.", "cost": 150, "no": 63, "maxPurchases": 4, "qty": 0, "costIncrement": 40}')),
        new GemPurchase(JSON.parse('{"name": "GemQ9", "itemName": "Card Presets", "desc": "Lets you swap between different card loadouts with ease! No more manually swapping cards around when doing different things! Each purchase gives +1 preset for ALL characters!", "cost": 250, "no": 66, "maxPurchases": 5, "qty": 0, "costIncrement": 160}')),
        new GemPurchase(JSON.parse('{"name": "GemQ17", "itemName": "4 Star Cardifier", "desc": "Use this on a 3 star card to upgrade it to 4 stars! You can use it on any 3 star card you have, it\'s up to you! Each purchase allows for one card of your choice to be upgraded.", "cost": 290, "no": 67, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "CardPack4", "itemName": "Dungeon Card Pack", "desc": "Contains 3 cards from the dungeon set.", "cost": 475, "no": 70, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP11", "itemName": "Smol Arcade Balls", "desc": "30 arcade balls. Use these at the Arcade, found at the clown in World 2 town!", "cost": 100, "no": 79, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP12", "itemName": "Med Arcade Balls", "desc": "100 arcade balls. Use these at the Arcade, found at the clown in World 2 town! +20% better value compared to smol ball pack!", "cost": 275, "no": 80, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP13", "itemName": "Biggy Arcade Balls", "desc": "500 arcade balls. Use these at the Arcade, found at the clown in World 2 town! +33% better value compared to smol ball pack!", "cost": 1250, "no": 81, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 82, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP15", "itemName": "Dungeon Perma Booster", "desc": "Get an additional +3 Dungeon runs every week, FOREVER! I give you 12 per week for free to start with, remember, so buying this one time would mean you get 15 runs every week!", "cost": 275, "no": 84, "maxPurchases": 11, "qty": 0, "costIncrement": 50}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentKeychain0", "itemName": "Tier 1 Keychain", "desc": "Gives you 40 keychain fragments, enough to claim a Tier 1 Keychain! These keychains randomly give the following bonuses: Base Def, Accuracy, Move speed, Base Dmg, Card Drop rate, Money, Base Stat", "cost": 90, "no": 86, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentKeychain8", "itemName": "Tier 2 Keychain", "desc": "Gives you 120 keychain fragments, enough to claim a Tier 2 Keychain! These keychains randomly give the following bonuses: %DEF, Mining XP, Fishing XP, %DMG, Drop chance, Atk speed, Crit chance, Multikill", "cost": 200, "no": 85, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "EquipmentKeychain17", "itemName": "Tier 3 Keychain", "desc": "Gives you 300 keychain fragments, enough to claim a Tier 3 Keychain! These keychains randomly give the following bonuses: %DEF, %Stat, %AFK gain, %DMG, mob respawn, Skilling spd, %All stat", "cost": 340, "no": 83, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 87, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 88, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 89, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 90, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 91, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 92, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 93, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 94, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "StonePremSTR", "itemName": "Str Stone", "desc": "Gives +5 STR to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!", "cost": 200, "no": 95, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "StonePremAGI", "itemName": "Agi Stone", "desc": "Gives +5 AGI to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!", "cost": 200, "no": 96, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "StonePremWIS", "itemName": "Wis Stone", "desc": "Gives +5 WIS to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!", "cost": 200, "no": 97, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "StonePremLUK", "itemName": "Luk Stone", "desc": "Gives +5 LUK to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!", "cost": 175, "no": 98, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 99, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 100, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 101, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "StonePremRestore", "itemName": "Premium Stone Refund", "desc": "Use this on a premium hat to refund all Premium Stones used on it, and reset the hat back to starting stats. No, this does not reset upgrades on regular items lol", "cost": 30, "no": 102, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP1", "itemName": "Infinity Hammer", "desc": "Lets you produce TWO anvil items at once! Applies to all characters you make. Stacks with other bonuses that give +1 anvil hammer.", "cost": 300, "no": 103, "maxPurchases": 1, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP4", "itemName": "Brimstone Forge Slot", "desc": "Brimstone slots smelt bars 50% faster, and have +50% multi-bar chance, meaning you\'ll get extra bars for every ore! These MUTLIPLY with forge upgrades, so they\'re always good!", "cost": 100, "no": 104, "maxPurchases": 16, "qty": 0, "costIncrement": 15}')),
        new GemPurchase(JSON.parse('{"name": "GemP6", "itemName": "Ivory Bubble Cauldrons", "desc": "Can assign +2 extra players to this cauldron. Also has 1.5x faster brewing, and 1.5x higher new bubble chance.", "cost": 300, "no": 105, "maxPurchases": 4, "qty": 0, "costIncrement": 50}')),
        new GemPurchase(JSON.parse('{"name": "GemP7", "itemName": "Bleach Liquid Cauldrons", "desc": "Can assign +1 extra player to this cauldron. Also has 1.5x higher Liquid Cap, and 1.5x faster liquid regeneration rate. Unlike the Bubble Cauldrons, you have to buy these in order.", "cost": 500, "no": 106, "maxPurchases": 3, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP5", "itemName": "Obol Storage Space", "desc": "Every purchase gives +4 Circle Slots. Every 2nd purchase gives +4 Square Slots. Every 3rd purchase gives +4 Hexagon and +4 Sparkle Slots. So buying this 4 times would give +16 Circles, +8 square, and +4 Hexagon and Sparkle", "cost": 250, "no": 57, "maxPurchases": 12, "qty": 0, "costIncrement": 50}')),
        new GemPurchase(JSON.parse('{"name": "GemP9", "itemName": "Quality Obol Stack", "desc": "Gives 3 random obols. Each obol has a 70% chance to be Silver, and 30% chance to be gold. Guaranteed at least 1 Gold obol per stack!", "cost": 250, "no": 107, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP10", "itemName": "Marvelous Obol Stack", "desc": "Gives 3 random obols. Each obol has 65% chance to be Gold, 25% chance to be Platinum, and 10% chance to be Dementia rarity. Guaranteed at least 1 Platinum or Dementia Obol per stack!", "cost": 550, "no": 108, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemP17", "itemName": "Sigil Supercharge", "desc": "Each purchase gives you a permanent bonus of +20% Sigil EXP gain! Remember, you must reach World 4 before you can level up sigils!", "cost": 250, "no": 110, "maxPurchases": 10, "qty": 0, "costIncrement": 30}')),
        new GemPurchase(JSON.parse('{"name": "GemQ1", "itemName": "Crystal 3D Printer", "desc": "Unlocks the 2nd printer chamber to print stuff in, for ALL characters you ever make, forever. This lets you print two things at once, it can even be the same thing twice!", "cost": 875, "no": 111, "maxPurchases": 1, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemQ2", "itemName": "More Sample Spaces", "desc": "Unlocks +1 space to take samples in. These are the tiny blue squares. Buy this if you want to juggle between different samples without having to retake them all the time.", "cost": 275, "no": 112, "maxPurchases": 3, "qty": 0, "costIncrement": 100}')),
        new GemPurchase(JSON.parse('{"name": "GemQ3", "itemName": "Burning Bad Books", "desc": "Raises the minimum level of books from the Talent Book Library by +5. This means it\'s more likely for you to get the highest possible level books!", "cost": 250, "no": 113, "maxPurchases": 4, "qty": 0, "costIncrement": 75}')),
        new GemPurchase(JSON.parse('{"name": "GemQ4", "itemName": "Prayer Slots", "desc": "Lets you equip +1 more Prayer at the same time, on all characters!", "cost": 250, "no": 114, "maxPurchases": 4, "qty": 0, "costIncrement": 75}')),
        new GemPurchase(JSON.parse('{"name": "GemQ5", "itemName": "Zen Cogs", "desc": "These premium cogs are the best in the game! Yin Cogs have the best base stats! Yang Cogs have the best Surround Effects! Each purchase gives 1 of each!", "cost": 500, "no": 115, "maxPurchases": 8, "qty": 0, "costIncrement": 125}')),
        new GemPurchase(JSON.parse('{"name": "GemQ6", "itemName": "Cog Inventory Space", "desc": "Each purchase gives you +4 cog inventory spaces, to store all your cogs in!", "cost": 100, "no": 116, "maxPurchases": 20, "qty": 0, "costIncrement": 40}')),
        new GemPurchase(JSON.parse('{"name": "GemQ7", "itemName": "Tower Building Slots", "desc": "Unlocks +1 more slot to build towers in! Remember, each slot builds at your FULL build rate, so this upgrade helps massively to upgrade all your towers to max level!", "cost": 350, "no": 117, "maxPurchases": 4, "qty": 0, "costIncrement": 100}')),
        new GemPurchase(JSON.parse('{"name": "GemQ8", "itemName": "Fluorescent Flaggies", "desc": "Makes your flaggies unlock spaces faster, opening up your board for more cogs! Each purchase boosts Flaggy rate by +50%", "cost": 250, "no": 118, "maxPurchases": 6, "qty": 0, "costIncrement": 75}')),
        new GemPurchase(JSON.parse('{"name": "GemQ10", "itemName": "Royal Egg Cap", "desc": "Boosts the max number of eggs in your breeding nest by +1. ALSO, as an added bonus, you get 1.10x New Pet Breeding Chance for each time you buy this!", "cost": 350, "no": 119, "maxPurchases": 5, "qty": 0, "costIncrement": 50}')),
        new GemPurchase(JSON.parse('{"name": "GemQ11", "itemName": "Richelin Kitchen", "desc": "Upgrades 1 kitchen, in order from first to last, to a Richelin Kitchen! These have 3x Meal Cooking Speed, 2x New Recipe Speed, and 40% Cheaper Upgrade Costs!", "cost": 250, "no": 120, "maxPurchases": 10, "qty": 0, "costIncrement": 40}')),
        new GemPurchase(JSON.parse('{"name": "GemQ12", "itemName": "Console Chip", "desc": "Gives you a random console chip. There are currently 22 Chips in the game, so you have a 1 in      22 chance of getting any particular chip.      This item restocks each week.", "cost": 385, "no": 121, "maxPurchases": 7, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemQ13", "itemName": "Mainframe Jewel", "desc": "Gives you a random Jewel that you don\'t already    own. No need to worry about duplicate jewels!    This item restocks each week, unless you own all Jewels, then it wont restock.", "cost": 450, "no": 122, "maxPurchases": 2, "qty": 0, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "GemQ14", "itemName": "Souped Up Tube", "desc": "Each purchase soups up 2 lab Tubes. Players in souped-up tubes get 2x Lab EXP gain, and +30% Line Width. Keep in mind, players are placed in tubes in chronological order.", "cost": 480, "no": 123, "maxPurchases": 4, "qty": 0, "costIncrement": 65}')),
        new GemPurchase(JSON.parse('{"name": "GemQ15", "itemName": "Pet Storage", "desc": "Unlocks 12 pet storage spaces, which is an entire row!", "cost": 325, "no": 124, "maxPurchases": 12, "qty": 0, "costIncrement": 55}')),
        new GemPurchase(JSON.parse('{"name": "GemQ16", "itemName": "Fenceyard Space", "desc": "Unlocks 2 Fenceyard slots, which are great for Breedability Pets and Shiny Pets!", "cost": 275, "no": 125, "maxPurchases": 6, "qty": 0, "costIncrement": 45}')),
        new GemPurchase(JSON.parse('{"name": "PetEgg", "itemName": "Carton Of Eggs", "desc": "Each purchase gives anywhere from 3 to 12 eggs in your item inventory! Use these eggs in your          inventory to refill your nest with eggs!              This item restocks each day.", "cost": 270, "no": 126, "maxPurchases": 4, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 127, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 128, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 129, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 130, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 131, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 132, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 133, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 134, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 135, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 136, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 137, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 138, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 139, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 140, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 150, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
        new GemPurchase(JSON.parse('{"name": "Blank", "itemName": "Name Of Item", "desc": "DESCRIPTION OF ITEM", "cost": -1, "no": 151, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
    ];
}

export default function parseGems(gemData: number[]) {
    return new GemStore(gemData);
}