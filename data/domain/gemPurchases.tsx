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
        new GemPurchase(JSON.parse('{"itemName": "Strawbiggy", "desc": "This is the ACTUAL strawberry from the Buddhist story about the Tiger and the Strawberry. No wonder the dangling man thought it so tasty!", "cost": 250, "no": 3, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Pop Cat", "desc": "\'Ew cringe.\' Said the teenager, in a selfish attempt to diminish the joy others experience from something so they can feel better about not liking it.", "cost": 250, "no": 2, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Dairy Dunk", "desc": "It\'s like getting pied, but instead of pie it\'s ice cream and instead of a basketball and a hoop its this ice cream and your head.", "cost": 250, "no": 1, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Hat Premumifier", "desc": "Turns any normal hat into a premium hat! Buy this if you have a really cool hat with bad stats, so you can wear that while also wearing a different hat with good stats! NOTE:This will erase all stats, and give it +1 All Stat and 5 Premium Upgrade Slots.", "cost": 250, "no": 0, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "The Classic", "desc": "Oh this? Why, this is only the PEAK fashion statement in all of IdleOn! Influenced by trends of the late 2000s, its back and hotter than ever!", "cost": 275, "no": 6, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Green Beanie", "desc": "Lets be honest... this is just the Bored Beanie but less cool", "cost": 250, "no": 5, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Diamond Demon Horns", "desc": "Definitely the coolest hat in the game, lets be real. That\'s why it\'s also the most expensive!", "cost": 3000, "no": 4, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Invisible Hat", "desc": "This hat is invisible, and your normal hat will show up instead. Buy this hat if you want to use some Premium Upgrade Stones, while still seeing your normal hat!", "cost": 200, "no": 7, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Lovers Chat Ring", "desc": "", "cost": 300, "no": 24, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "All Natural Chat Ring", "desc": "", "cost": 250, "no": 25, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Bandit Bob Chat Ring", "desc": "", "cost": 350, "no": 26, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Bubble Pop Chat Ring", "desc": "", "cost": 325, "no": 27, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Eyes Of Cthulu Chat Ring", "desc": "", "cost": 400, "no": 28, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Money Talks Chat Ring", "desc": "", "cost": 2500, "no": 31, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Honk Ring", "desc": "", "cost": 300, "no": 29, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Just One, Please", "desc": "Gives you a single 1 Hour Candy. Also, you\'re not a real adventurer in Flapjack\'s eyes. Sorry, just tellin\' ya like it is!", "cost": 40, "no": 47, "maxPurchases": 5, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Baby\'S First Lolly", "desc": "Gives a random Time Candy. The chances are: 34% for 1 Hr, 33% for 2 Hr, and 33% for 4 Hr.", "cost": 80, "no": 48, "maxPurchases": 5, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Kid In A Candy Store", "desc": "Gives a random Time Candy. The chances are: 50% for 2 Hr, 25% for 4 Hr, 18% for 12 Hr, and 7% for 24 Hr.", "cost": 150, "no": 49, "maxPurchases": 5, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Absolute Sugar Maniac", "desc": "Gives a random Time Candy. The chances are: 33% for 4 Hr, 40% for 12 Hr, 22% for 24 Hr, and 4% for 72 Hr.", "cost": 270, "no": 50, "maxPurchases": 5, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Cosmic Candy", "desc": "Gives 1 Cosmic Time Candy, which can give up to 500 HOURS of AFK time! On average, it will give 24 hrs.", "cost": 325, "no": 54, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Item Backpack Space", "desc": "Gives +4 extra Item Slots for your backpack. Applies to all your characters, even ones you haven\'t made yet!", "cost": 200, "no": 55, "maxPurchases": 6, "qty": 1, "costIncrement": 25}')),
new GemPurchase(JSON.parse('{"itemName": "Storage Chest Space", "desc": "Gives +6 extra Storage Chest Slots. Storage Chests are found in each town, and the items you put in can be access by all your players!", "cost": 175, "no": 56, "maxPurchases": 12, "qty": 1, "costIncrement": 25}')),
new GemPurchase(JSON.parse('{"itemName": "Carry Capacity", "desc": "Each purchase boosts the carry capacity by +25% for all your characters. This starts working immediately, and applies to every item type!", "cost": 150, "no": 58, "maxPurchases": 10, "qty": 0, "costIncrement": 25}')),
new GemPurchase(JSON.parse('{"itemName": "Food Slot", "desc": "Gives +1 extra food slot for all characters, forever! Dont worry, 4 food slots will be added FOR FREE in game in later updates, scattered across the game!", "cost": 450, "no": 59, "maxPurchases": 2, "qty": 0, "costIncrement": 300}')),
new GemPurchase(JSON.parse('{"itemName": "Daily Teleports", "desc": "Each purchase gives +7 daily teleports every day, forever. You can use these on the Map Screen. You can be gone for up to 4 days and claim them all upon your return!", "cost": 200, "no": 71, "maxPurchases": 7, "qty": 0, "costIncrement": 60}')),
new GemPurchase(JSON.parse('{"itemName": "Daily Minigame Plays", "desc": "Each purchase gives you +4 additional Daily Minigame Plays across your account. These dont stack from day to day, else youd be swimmin\' in them!", "cost": 150, "no": 72, "maxPurchases": 4, "qty": 0, "costIncrement": 50}')),
new GemPurchase(JSON.parse('{"itemName": "Regular Talent Reset", "desc": "Resets all your talents to Lv 0, and fully refunds all talent points. This does NOT reset any of the                     Star Tab talents.                  This item restocks each week.", "cost": 200, "no": 73, "maxPurchases": 10, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Star Talent Reset", "desc": "Resets all the talents in the Star Tab to Lv 0, and fully refunds all talent points. This does NOT reset other talents, only ones in the Star Tab. This item restocks each week.", "cost": 300, "no": 74, "maxPurchases": 3, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Subclass Swap Token", "desc": "Lets you swap subclass, like going from Barbarian to Squire. HOWEVER, you CANT change between main classes, like going from a Warrior to an Archer. You can only buy 2 every major update.", "cost": 500, "no": 75, "maxPurchases": 2, "qty": 1, "costIncrement": 250}')),
new GemPurchase(JSON.parse('{"itemName": "Pandoras Office Box", "desc": "Resets all your post office upgrades, and            refunds all boxes spent. This lets you choose          different post office box upgrades!            This item restocks each week.", "cost": 250, "no": 76, "maxPurchases": 1, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Extra Card Slot", "desc": "Lets you equip another card, so you can have more card bonuses! This applies to all characters.", "cost": 150, "no": 63, "maxPurchases": 4, "qty": 0, "costIncrement": 40}')),
new GemPurchase(JSON.parse('{"itemName": "Newbie Card Pack", "desc": "Contains 3 cards from any set in the game, other than world 3 because it\'s not out yet. Has a 15% chance to give at least one Boss Card. Card Lv Rarities are: 50% for Lv 1, 35% for Lv 2, and 15% for Lv 3.", "cost": 200, "no": 64, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Ancient Card Pack", "desc": "Contains 4 cards from any set in the game, other than world 3 because it\'s not out yet. Has a 40% chance to give at least one Boss Card. Card Lv Rarities are: 26% for Lv 1, 30% for Lv 2, 27% for Lv 3, and 17% for Lv 4.", "cost": 450, "no": 65, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Eternal Card Pack", "desc": "Blah", "cost": 650, "no": 65, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Card Presets", "desc": "Lets you swap between different card loadouts with ease! No more manually swapping cards around when doing different things! Each purchase gives +1 preset for ALL characters!", "cost": 250, "no": 66, "maxPurchases": 5, "qty": 0, "costIncrement": 160}')),
new GemPurchase(JSON.parse('{"itemName": "Dungeon Card Pack", "desc": "Contains 3 cards from the dungeon set.", "cost": 475, "no": 70, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Smol Arcade Balls", "desc": "30 arcade balls. Use these at the Arcade, found at the clown in World 2 town!", "cost": 100, "no": 79, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Med Arcade Balls", "desc": "100 arcade balls. Use these at the Arcade, found at the clown in World 2 town! +20% better value compared to smol ball pack!", "cost": 275, "no": 80, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Biggy Arcade Balls", "desc": "500 arcade balls. Use these at the Arcade, found at the clown in World 2 town! +33% better value compared to smol ball pack!", "cost": 1250, "no": 81, "maxPurchases": 100000, "qty": 0, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Dungeon Perma Booster", "desc": "Get an additional +3 Dungeon runs every week, FOREVER! I give you 12 per week for free to start with, remember, so buying this one time would mean you get 15 runs every week!", "cost": 275, "no": 84, "maxPurchases": 11, "qty": 0, "costIncrement": 50}')),
new GemPurchase(JSON.parse('{"itemName": "Dungeon Loot Dice", "desc": "Gives you 2 dungeon loot roll dice! Yep, 2 of them! These are exactly the same as the dice you get from dungeons. IMPORTANT: You need to be Dungeon Rank 10+ for Tier 2 Keychains, and Rank 20+ for Tier 3 keychains.", "cost": 225, "no": 85, "maxPurchases": 100000, "qty": 2, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Weekend Dungeon Pass", "desc": "For 3 days after purchase, EVERY dungeon run you do will be boosted, meaning you get +2 Loot Dice and flurbos and all that good stuff!", "cost": 875, "no": 83, "maxPurchases": 1, "qty": 0, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Str Stone", "desc": "Gives +5 STR to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!", "cost": 200, "no": 95, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Agi Stone", "desc": "Gives +5 AGI to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!", "cost": 200, "no": 96, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Wis Stone", "desc": "Gives +5 WIS to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!", "cost": 200, "no": 97, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Luk Stone", "desc": "Gives +5 LUK to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!", "cost": 175, "no": 98, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Premium Stone Refund", "desc": "Use this on a premium hat to refund all Premium Stones used on it, and reset the hat back to starting stats. No, this does not reset upgrades on regular items lol", "cost": 30, "no": 102, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Infinity Hammer", "desc": "Lets you produce TWO anvil items at once! Applies to all characters you make. Stacks with other bonuses that give +1 anvil hammer.", "cost": 300, "no": 103, "maxPurchases": 1, "qty": 0, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Brimstone Forge Slot", "desc": "Brimstone slots smelt bars 50% faster, and have +50% multi-bar chance, meaning you\'ll get extra bars for every ore! These MUTLIPLY with forge upgrades, so they\'re always good!", "cost": 100, "no": 104, "maxPurchases": 16, "qty": 0, "costIncrement": 15}')),
new GemPurchase(JSON.parse('{"itemName": "Ivory Bubble Cauldrons", "desc": "Can assign +2 extra players to this cauldron. Also has 1.5x faster brewing, and 1.5x higher new bubble chance.", "cost": 300, "no": 105, "maxPurchases": 4, "qty": 0, "costIncrement": 50}')),
new GemPurchase(JSON.parse('{"itemName": "Bleach Liquid Cauldrons", "desc": "Can assign +1 extra player to this cauldron. Also has 1.5x higher Liquid Cap, and 1.5x faster liquid regeneration rate. Unlike the Bubble Cauldrons, you have to buy these in order.", "cost": 500, "no": 106, "maxPurchases": 3, "qty": 0, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Obol Storage Space", "desc": "Every purchase gives +4 Circle Slots. Every 2nd purchase gives +4 Square Slots. Every 3rd purchase gives +4 Hexagon and +4 Sparkle Slots. So buying this 4 times would give +16 Circles, +8 square, and +4 Hexagon and Sparkle", "cost": 250, "no": 57, "maxPurchases": 12, "qty": 0, "costIncrement": 50}')),
new GemPurchase(JSON.parse('{"itemName": "Quality Obol Stack", "desc": "Gives 3 random obols. Each obol has a 70% chance to be Silver, and 30% chance to be gold. Guaranteed at least 1 Gold obol per stack!", "cost": 250, "no": 107, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Marvelous Obol Stack", "desc": "Gives 3 random obols. Each obol has 65% chance to be Gold, 25% chance to be Platinum, and 10% chance to be Dementia rarity. Guaranteed at least 1 Platinum or Dementia Obol per stack!", "cost": 550, "no": 108, "maxPurchases": 100000, "qty": 1, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "Crystal 3D Printer", "desc": "Unlocks the 2nd printer chamber to print stuff in, for ALL characters you ever make, forever. This lets you print two things at once, it can even be the same thing twice!", "cost": 875, "no": 111, "maxPurchases": 1, "qty": 0, "costIncrement": 0}')),
new GemPurchase(JSON.parse('{"itemName": "More Sample Spaces", "desc": "Unlocks +1 space to take samples in. These are the tiny blue squares. Buy this if you want to juggle between different samples without having to retake them all the time.", "cost": 200, "no": 112, "maxPurchases": 2, "qty": 0, "costIncrement": 100}')),
new GemPurchase(JSON.parse('{"itemName": "Burning Bad Books", "desc": "Raises the minimum level of books from the Talent Book Library by +5. This means it\'s more likely for you to get the highest possible level books!", "cost": 250, "no": 113, "maxPurchases": 4, "qty": 0, "costIncrement": 75}')),
new GemPurchase(JSON.parse('{"itemName": "Prayer Slots", "desc": "Lets you equip +1 more Prayer at the same time, on all characters!", "cost": 250, "no": 114, "maxPurchases": 4, "qty": 0, "costIncrement": 75}')),
new GemPurchase(JSON.parse('{"itemName": "Zen Cogs", "desc": "These premium cogs are the best in the game! Yin Cogs have the best base stats! Yang Cogs have the best Surround Effects! Each purchase gives 1 of each!", "cost": 500, "no": 115, "maxPurchases": 8, "qty": 0, "costIncrement": 125}')),
new GemPurchase(JSON.parse('{"itemName": "Cog Inventory Space", "desc": "Each purchase gives you +4 cog inventory spaces, to store all your cogs in!", "cost": 100, "no": 116, "maxPurchases": 20, "qty": 0, "costIncrement": 40}')),
new GemPurchase(JSON.parse('{"itemName": "Tower Building Slots", "desc": "Unlocks +1 more slot to build towers in! Remember, each slot builds at your FULL build rate, so this upgrade helps massively to upgrade all your towers to max level!", "cost": 350, "no": 117, "maxPurchases": 4, "qty": 0, "costIncrement": 100}')),
new GemPurchase(JSON.parse('{"itemName": "Fluorescent Flaggies", "desc": "Makes your flaggies unlock spaces faster, opening up your board for more cogs! Each purchase boosts Flaggy rate by +50%", "cost": 250, "no": 118, "maxPurchases": 6, "qty": 0, "costIncrement": 75}')),
    ];
}

export default function parseGems(gemData: number[]) {
    return new GemStore(gemData);
}