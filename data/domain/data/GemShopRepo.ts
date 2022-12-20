import { GemShopItemModel } from '../model/gemShopItemModel';

export class GemShopItemBase { constructor(public index: number, public data: GemShopItemModel) { } }



export const initGemShopRepo = () => {
    return [    
        new GemShopItemBase(0, <GemShopItemModel>{
                "name": "EquipmentHats46",
                "itemName": "Strawbiggy",
                "desc": "This is the ACTUAL strawberry from the Buddhist story about the Tiger and the Strawberry. No wonder the dangling man thought it so tasty!",
                "cost": 250,
                "no": 3,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(1, <GemShopItemModel>{
                "name": "EquipmentHats47",
                "itemName": "Pop Cat",
                "desc": "'Ew cringe.' Said the teenager, in a selfish attempt to diminish the joy others experience from something so they can feel better about not liking it.",
                "cost": 250,
                "no": 2,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(2, <GemShopItemModel>{
                "name": "EquipmentHats48",
                "itemName": "Dairy Dunk",
                "desc": "It's like getting pied, but instead of pie it's ice cream and instead of a basketball and a hoop its this ice cream and your head.",
                "cost": 250,
                "no": 1,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(3, <GemShopItemModel>{
                "name": "Ht",
                "itemName": "Hat Premumifier",
                "desc": "Turns any normal hat into a premium hat! Buy this if you have a really cool hat with bad stats, so you can wear that while also wearing a different hat with good stats! NOTE:This will erase all stats, and give it +1 All Stat and 5 Premium Upgrade Slots.",
                "cost": 250,
                "no": 0,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(4, <GemShopItemModel>{
                "name": "EquipmentHats49",
                "itemName": "The Classic",
                "desc": "Oh this? Why, this is only the PEAK fashion statement in all of IdleOn! Influenced by trends of the late 2000s, its back and hotter than ever!",
                "cost": 275,
                "no": 6,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(5, <GemShopItemModel>{
                "name": "EquipmentHats50",
                "itemName": "Green Beanie",
                "desc": "Lets be honest... this is just the Bored Beanie but less cool",
                "cost": 250,
                "no": 5,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(6, <GemShopItemModel>{
                "name": "EquipmentHats35",
                "itemName": "Diamond Demon Horns",
                "desc": "Definitely the coolest hat in the game, lets be real. That's why it's also the most expensive!",
                "cost": 3000,
                "no": 4,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(7, <GemShopItemModel>{
                "name": "EquipmentHats38",
                "itemName": "Invisible Hat",
                "desc": "This hat is invisible, and your normal hat will show up instead. Buy this hat if you want to use some Premium Upgrade Stones, while still seeing your normal hat!",
                "cost": 200,
                "no": 7,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(8, <GemShopItemModel>{
                "name": "EquipmentRingsChat1",
                "itemName": "Lovers Chat Ring",
                "desc": "",
                "cost": 300,
                "no": 24,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(9, <GemShopItemModel>{
                "name": "EquipmentRingsChat2",
                "itemName": "All Natural Chat Ring",
                "desc": "",
                "cost": 250,
                "no": 25,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(10, <GemShopItemModel>{
                "name": "EquipmentRingsChat4",
                "itemName": "Bandit Bob Chat Ring",
                "desc": "",
                "cost": 350,
                "no": 26,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(11, <GemShopItemModel>{
                "name": "EquipmentRingsChat5",
                "itemName": "Bubble Pop Chat Ring",
                "desc": "",
                "cost": 325,
                "no": 27,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(12, <GemShopItemModel>{
                "name": "EquipmentRingsChat6",
                "itemName": "Eyes Of Cthulu Chat Ring",
                "desc": "",
                "cost": 400,
                "no": 28,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(13, <GemShopItemModel>{
                "name": "EquipmentRingsChat3",
                "itemName": "Money Talks Chat Ring",
                "desc": "",
                "cost": 2500,
                "no": 31,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(14, <GemShopItemModel>{
                "name": "EquipmentRingsChat9",
                "itemName": "Honk Ring",
                "desc": "",
                "cost": 300,
                "no": 29,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(15, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 30,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(16, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 8,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(17, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 9,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(18, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 10,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(19, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 11,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(20, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 12,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(21, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 13,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(22, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 14,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(23, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 15,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(24, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 16,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(25, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 17,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(26, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 18,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(27, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 19,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(28, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 20,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(29, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 21,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(30, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 22,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(31, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 23,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(32, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 32,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(33, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 33,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(34, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 34,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(35, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 35,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(36, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 36,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(37, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 37,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(38, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 38,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(39, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 39,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(40, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 40,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(41, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 41,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(42, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 42,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(43, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 43,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(44, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 44,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(45, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 45,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(46, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 46,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(47, <GemShopItemModel>{
                "name": "EquipmentHats1",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 47,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(48, <GemShopItemModel>{
                "name": "Timecandy1",
                "itemName": "Just One, Please",
                "desc": "Gives you a single 1 Hour Candy. Also, you're not a real adventurer in Flapjack's eyes. Sorry, just tellin' ya like it is!",
                "cost": 40,
                "no": 47,
                "maxPurchases": 4,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(49, <GemShopItemModel>{
                "name": "Timecandy2",
                "itemName": "Baby'S First Lolly",
                "desc": "Gives a random Time Candy. The chances are: 34% for 1 Hr, 33% for 2 Hr, and 33% for 4 Hr.",
                "cost": 80,
                "no": 48,
                "maxPurchases": 4,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(50, <GemShopItemModel>{
                "name": "Timecandy3",
                "itemName": "Kid In A Candy Store",
                "desc": "Gives a random Time Candy. The chances are: 50% for 2 Hr, 25% for 4 Hr, 18% for 12 Hr, and 7% for 24 Hr.",
                "cost": 150,
                "no": 49,
                "maxPurchases": 4,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(51, <GemShopItemModel>{
                "name": "Timecandy4",
                "itemName": "Absolute Sugar Maniac",
                "desc": "Gives a random Time Candy. The chances are: 33% for 4 Hr, 40% for 12 Hr, 22% for 24 Hr, and 4% for 72 Hr.",
                "cost": 270,
                "no": 50,
                "maxPurchases": 4,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(52, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 51,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(53, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 52,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(54, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 53,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(55, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Cosmic Candy",
                "desc": "Gives 1 Cosmic Time Candy, which can give up to 500 HOURS of AFK time! On average, it will give 24 hrs.",
                "cost": 325,
                "no": 54,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(56, <GemShopItemModel>{
                "name": "InvBag21",
                "itemName": "Item Backpack Space",
                "desc": "Gives +4 extra Item Slots for your backpack! Applies to all your characters, even ones you haven't made yet!",
                "cost": 200,
                "no": 55,
                "maxPurchases": 6,
                "qty": 1,
                "costIncrement": 25
            }),
        new GemShopItemBase(57, <GemShopItemModel>{
                "name": "InvStorage31",
                "itemName": "Storage Chest Space",
                "desc": "Gives +9 extra Storage Chest Slots! Storage Chests are found in each town, and the items you put in are shared by all your players!",
                "cost": 175,
                "no": 56,
                "maxPurchases": 12,
                "qty": 1,
                "costIncrement": 25
            }),
        new GemShopItemBase(58, <GemShopItemModel>{
                "name": "GemP2",
                "itemName": "Carry Capacity",
                "desc": "Each purchase boosts the carry capacity by +25% for all your characters. This starts working immediately, and applies to every item type!",
                "cost": 150,
                "no": 58,
                "maxPurchases": 10,
                "qty": 0,
                "costIncrement": 25
            }),
        new GemShopItemBase(59, <GemShopItemModel>{
                "name": "GemP8",
                "itemName": "Food Slot",
                "desc": "Gives +1 extra food slot for all characters, forever! Dont worry, 4 food slots will be added FOR FREE in game in later updates, scattered across the game!",
                "cost": 450,
                "no": 59,
                "maxPurchases": 2,
                "qty": 0,
                "costIncrement": 300
            }),
        new GemShopItemBase(60, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 60,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(61, <GemShopItemModel>{
                "name": "InvStorage99",
                "itemName": "More Storage Space",
                "desc": "Gives +9 extra Storage Chest Slots! Perfect for any hoarding tendencies you may have!",
                "cost": 450,
                "no": 109,
                "maxPurchases": 10,
                "qty": 1,
                "costIncrement": 12
            }),
        new GemShopItemBase(62, <GemShopItemModel>{
                "name": "GemQ9",
                "itemName": "Card Presets",
                "desc": "Lets you swap between different card loadouts with ease! No more manually swapping cards around when doing different things! Each purchase gives +1 preset for ALL characters!",
                "cost": 250,
                "no": 66,
                "maxPurchases": 5,
                "qty": 0,
                "costIncrement": 160
            }),
        new GemShopItemBase(63, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 62,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(64, <GemShopItemModel>{
                "name": "Pdaily0",
                "itemName": "Daily Teleports",
                "desc": "Each purchase gives +7 daily teleports every day, forever. You can use these on the Map Screen. You can be gone for up to 4 days and claim them all upon your return!",
                "cost": 200,
                "no": 71,
                "maxPurchases": 7,
                "qty": 0,
                "costIncrement": 60
            }),
        new GemShopItemBase(65, <GemShopItemModel>{
                "name": "Pdaily1",
                "itemName": "Daily Minigame Plays",
                "desc": "Each purchase gives you +4 additional Daily Minigame Plays across your account. These dont stack from day to day, else youd be swimmin' in them!",
                "cost": 150,
                "no": 72,
                "maxPurchases": 4,
                "qty": 0,
                "costIncrement": 50
            }),
        new GemShopItemBase(66, <GemShopItemModel>{
                "name": "ResetCompleted",
                "itemName": "Regular Talent Reset",
                "desc": "Resets all your talents to Lv 0, and fully refunds all talent points. This does NOT reset any of the                     Star Tab talents.                  This item restocks each week.",
                "cost": 200,
                "no": 73,
                "maxPurchases": 10,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(67, <GemShopItemModel>{
                "name": "ResetCompletedS",
                "itemName": "Star Talent Reset",
                "desc": "Resets all the talents in the Star Tab to Lv 0, and fully refunds all talent points. This does NOT reset other talents, only ones in the Star Tab. This item restocks each week.",
                "cost": 300,
                "no": 74,
                "maxPurchases": 3,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(68, <GemShopItemModel>{
                "name": "ClassSwap",
                "itemName": "Subclass Swap Token",
                "desc": "Lets you swap subclass, like going from Barbarian to Squire. HOWEVER, you CANT change between main classes, like Warrior or Archer, or change Elite Classes like Blood Berserker. Stock refreshes after each major update.",
                "cost": 500,
                "no": 75,
                "maxPurchases": 2,
                "qty": 1,
                "costIncrement": 250
            }),
        new GemShopItemBase(69, <GemShopItemModel>{
                "name": "ResetBox",
                "itemName": "Pandoras Office Box",
                "desc": "Resets all your post office upgrades, and            refunds all boxes spent. This lets you choose          different post office box upgrades!            This item restocks each week.",
                "cost": 250,
                "no": 76,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(70, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 77,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(71, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 78,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(72, <GemShopItemModel>{
                "name": "CardPack1",
                "itemName": "Newbie Card Pack",
                "desc": "Contains 3 cards from any set in the game, other than world 3 because it's not out yet. Has a 15% chance to give at least one Boss Card. Card Lv Rarities are: 50% for Lv 1, 35% for Lv 2, and 15% for Lv 3.",
                "cost": 200,
                "no": 64,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(73, <GemShopItemModel>{
                "name": "CardPack2",
                "itemName": "Ancient Card Pack",
                "desc": "Contains 4 cards from any set in the game, other than world 3 because it's not out yet. Has a 40% chance to give at least one Boss Card. Card Lv Rarities are: 26% for Lv 1, 30% for Lv 2, 27% for Lv 3, and 17% for Lv 4.",
                "cost": 425,
                "no": 65,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(74, <GemShopItemModel>{
                "name": "CardPack3",
                "itemName": "Eternal Card Pack",
                "desc": "Blah",
                "cost": 600,
                "no": 65,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(75, <GemShopItemModel>{
                "name": "CardPack5",
                "itemName": "Galaxy Card Pack",
                "desc": "Blah",
                "cost": 650,
                "no": 69,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(76, <GemShopItemModel>{
                "name": "GemP3",
                "itemName": "Extra Card Slot",
                "desc": "Lets you equip another card, so you can have more card bonuses! This applies to all characters, and is recommended before buying card packs!",
                "cost": 150,
                "no": 63,
                "maxPurchases": 4,
                "qty": 0,
                "costIncrement": 40
            }),
        new GemShopItemBase(77, <GemShopItemModel>{
                "name": "CardPack4",
                "itemName": "Dungeon Card Pack",
                "desc": "Contains 3 cards from the dungeon set.",
                "cost": 475,
                "no": 70,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(78, <GemShopItemModel>{
                "name": "GemQ17",
                "itemName": "4 Star Cardifier",
                "desc": "Use this on a 3 star card to upgrade it to 4 stars! You can use it on any 3 star card you have, it's up to you! Each purchase allows for one card of your choice to be upgraded.",
                "cost": 290,
                "no": 67,
                "maxPurchases": 100000,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(79, <GemShopItemModel>{
                "name": "CardPack6",
                "itemName": "Smolderin Card Pack",
                "desc": "Blah",
                "cost": 690,
                "no": 61,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(80, <GemShopItemModel>{
                "name": "GemP11",
                "itemName": "Smol Arcade Balls",
                "desc": "30 arcade balls. Use these at the Arcade, found at the clown in World 2 town!",
                "cost": 100,
                "no": 79,
                "maxPurchases": 100000,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(81, <GemShopItemModel>{
                "name": "GemP12",
                "itemName": "Med Arcade Balls",
                "desc": "100 arcade balls. Use these at the Arcade, found at the clown in World 2 town! +20% better value compared to smol ball pack!",
                "cost": 275,
                "no": 80,
                "maxPurchases": 100000,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(82, <GemShopItemModel>{
                "name": "GemP13",
                "itemName": "Biggy Arcade Balls",
                "desc": "500 arcade balls. Use these at the Arcade, found at the clown in World 2 town! +33% better value compared to smol ball pack!",
                "cost": 1250,
                "no": 81,
                "maxPurchases": 100000,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(83, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 82,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(84, <GemShopItemModel>{
                "name": "GemP15",
                "itemName": "Weekly Dungeon Boosters",
                "desc": "Get an additional +3 Dungeon runs every week, FOREVER! I give you 12 per week for free, so buying this once, for example, would get you 15 runs every week!",
                "cost": 275,
                "no": 84,
                "maxPurchases": 11,
                "qty": 0,
                "costIncrement": 40
            }),
        new GemShopItemBase(85, <GemShopItemModel>{
                "name": "EquipmentKeychain0",
                "itemName": "Tier 1 Keychain",
                "desc": "Gives you 40 keychain fragments, enough to claim a Tier 1 Keychain from the Frog Dungeon Lobby! These keychains randomly give the following bonuses: Base Def, Accuracy, Move speed, Base Dmg, Card Drop rate, Money, Base Stat",
                "cost": 90,
                "no": 86,
                "maxPurchases": 100000,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(86, <GemShopItemModel>{
                "name": "EquipmentKeychain8",
                "itemName": "Tier 2 Keychain",
                "desc": "Gives you 120 keychain fragments, enough to claim a Tier 2 Keychain from the Frog Dungeon Lobby! These keychains randomly give the following bonuses: %DEF, Mining XP, Fishing XP, %DMG, Drop chance, Atk speed, Crit chance, Multikill",
                "cost": 200,
                "no": 85,
                "maxPurchases": 100000,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(87, <GemShopItemModel>{
                "name": "EquipmentKeychain17",
                "itemName": "Tier 3 Keychain",
                "desc": "Gives you 300 keychain fragments, enough to claim a Tier 3 Keychain from the Frog Dungeon Lobby! These keychains randomly give the following bonuses: %DEF, %Stat, %AFK gain, %DMG, mob respawn, Skilling spd, %All stat",
                "cost": 340,
                "no": 83,
                "maxPurchases": 100000,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(88, <GemShopItemModel>{
                "name": "GemP19",
                "itemName": "Random Boss Obol",
                "desc": "Gives you one of the following obols: Amarok Obol (+4% Defence), Efaunt Obol (+5% Boss Damage), Slush Obol (+3% Skill Effic), Chizoar Obol (+4% Total Damage), or Troll Obol (+3% All Stats)",
                "cost": 600,
                "no": 87,
                "maxPurchases": 3,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(89, <GemShopItemModel>{
                "name": "GemP18",
                "itemName": "Dragonic Liquid Cauldron",
                "desc": "Turns your 1st liquid cauldron into a dragonic cauldron, giving it 2x Liquid Capacity. (Note: The cauldron will only change visually if you have the bleach one. The 2x cap will apply regardless)",
                "cost": 969,
                "no": 88,
                "maxPurchases": 1,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(90, <GemShopItemModel>{
                "name": "EquipmentKeychain26",
                "itemName": "Idle Skilling Keychain",
                "desc": "Gives you a random Idle Skilling keychain with up to +12% AFK Gain! Keychains are equipped on the 2nd equipment page!",
                "cost": 750,
                "no": 89,
                "maxPurchases": 3,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(91, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 90,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(92, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 91,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(93, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 92,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(94, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 93,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(95, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 94,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(96, <GemShopItemModel>{
                "name": "StonePremSTR",
                "itemName": "Str Stone",
                "desc": "Gives +5 STR to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!",
                "cost": 200,
                "no": 95,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(97, <GemShopItemModel>{
                "name": "StonePremAGI",
                "itemName": "Agi Stone",
                "desc": "Gives +5 AGI to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!",
                "cost": 200,
                "no": 96,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(98, <GemShopItemModel>{
                "name": "StonePremWIS",
                "itemName": "Wis Stone",
                "desc": "Gives +5 WIS to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!",
                "cost": 200,
                "no": 97,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(99, <GemShopItemModel>{
                "name": "StonePremLUK",
                "itemName": "Luk Stone",
                "desc": "Gives +5 LUK to the applied item, and has a 100% Success Rate. Can ONLY be used on Premium Equipment bought in the Gem Shop!",
                "cost": 175,
                "no": 98,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(100, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 99,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(101, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 100,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(102, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 101,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(103, <GemShopItemModel>{
                "name": "StonePremRestore",
                "itemName": "Premium Stone Refund",
                "desc": "Use this on a premium hat to refund all Premium Stones used on it, and reset the hat back to starting stats. No, this does not reset upgrades on regular items lol",
                "cost": 30,
                "no": 102,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(104, <GemShopItemModel>{
                "name": "GemP1",
                "itemName": "Infinity Hammer",
                "desc": "Lets you produce TWO anvil items at once! Applies to all characters you make. Stacks with other bonuses that give +1 anvil hammer.",
                "cost": 300,
                "no": 103,
                "maxPurchases": 1,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(105, <GemShopItemModel>{
                "name": "GemP4",
                "itemName": "Brimstone Forge Slot",
                "desc": "Brimstone slots smelt bars 50% faster, and have +50% multi-bar chance, meaning you'll get extra bars for every ore! These MUTLIPLY with forge upgrades, so they're always good!",
                "cost": 100,
                "no": 104,
                "maxPurchases": 16,
                "qty": 0,
                "costIncrement": 15
            }),
        new GemShopItemBase(106, <GemShopItemModel>{
                "name": "GemP6",
                "itemName": "Ivory Bubble Cauldrons",
                "desc": "Can assign +2 extra players to this cauldron. Also has 1.5x faster brewing, and 1.5x higher new bubble chance.",
                "cost": 300,
                "no": 105,
                "maxPurchases": 4,
                "qty": 0,
                "costIncrement": 50
            }),
        new GemShopItemBase(107, <GemShopItemModel>{
                "name": "GemP7",
                "itemName": "Bleach Liquid Cauldrons",
                "desc": "Can assign +1 extra player to this cauldron. Also has 1.5x higher Liquid Cap, and 1.5x faster liquid regeneration rate. Unlike the Bubble Cauldrons, you have to buy these in order.",
                "cost": 500,
                "no": 106,
                "maxPurchases": 3,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(108, <GemShopItemModel>{
                "name": "GemP5",
                "itemName": "Obol Storage Space",
                "desc": "Every purchase gives +4 Circle Slots. Every 2nd purchase gives +4 Square Slots. Every 3rd purchase gives +4 Hexagon and +4 Sparkle Slots. So buying this 4 times would give +16 Circles, +8 square, and +4 Hexagon and Sparkle",
                "cost": 250,
                "no": 57,
                "maxPurchases": 12,
                "qty": 0,
                "costIncrement": 50
            }),
        new GemShopItemBase(109, <GemShopItemModel>{
                "name": "GemP9",
                "itemName": "Quality Obol Stack",
                "desc": "Gives 3 random obols. Each obol has a 70% chance to be Silver, and 30% chance to be gold. Guaranteed at least 1 Gold obol per stack!",
                "cost": 250,
                "no": 107,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(110, <GemShopItemModel>{
                "name": "GemP10",
                "itemName": "Marvelous Obol Stack",
                "desc": "Gives 3 random obols. Each obol has 65% chance to be Gold, 25% chance to be Platinum, and 10% chance to be Dementia rarity. Guaranteed at least 1 Platinum or Dementia Obol per stack!",
                "cost": 550,
                "no": 108,
                "maxPurchases": 100000,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(111, <GemShopItemModel>{
                "name": "GemP17",
                "itemName": "Sigil Supercharge",
                "desc": "Each purchase gives you a permanent bonus of +20% Sigil EXP gain! Remember, you must reach World 4 before you can level up sigils!",
                "cost": 250,
                "no": 110,
                "maxPurchases": 10,
                "qty": 0,
                "costIncrement": 30
            }),
        new GemShopItemBase(112, <GemShopItemModel>{
                "name": "GemQ1",
                "itemName": "Crystal 3D Printer",
                "desc": "Unlocks the 2nd printer chamber to print stuff in, for ALL characters you ever make, forever. This lets you print two things at once, it can even be the same thing twice!",
                "cost": 875,
                "no": 111,
                "maxPurchases": 1,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(113, <GemShopItemModel>{
                "name": "GemQ2",
                "itemName": "More Sample Spaces",
                "desc": "Unlocks +1 space to take samples in. These are the tiny blue squares. Buy this if you want to juggle between different samples without having to retake them all the time.",
                "cost": 275,
                "no": 112,
                "maxPurchases": 3,
                "qty": 0,
                "costIncrement": 100
            }),
        new GemShopItemBase(114, <GemShopItemModel>{
                "name": "GemQ3",
                "itemName": "Burning Bad Books",
                "desc": "Raises the minimum level of books from the Talent Book Library by +5. This means it's more likely for you to get the highest possible level books!",
                "cost": 250,
                "no": 113,
                "maxPurchases": 4,
                "qty": 0,
                "costIncrement": 75
            }),
        new GemShopItemBase(115, <GemShopItemModel>{
                "name": "GemQ4",
                "itemName": "Prayer Slots",
                "desc": "Lets you equip +1 more Prayer at the same time, on all characters!",
                "cost": 250,
                "no": 114,
                "maxPurchases": 4,
                "qty": 0,
                "costIncrement": 75
            }),
        new GemShopItemBase(116, <GemShopItemModel>{
                "name": "GemQ5",
                "itemName": "Zen Cogs",
                "desc": "These premium cogs are the best in the game! Yin Cogs have the best base stats! Yang Cogs have the best Surround Effects! Each purchase gives 1 of each!",
                "cost": 500,
                "no": 115,
                "maxPurchases": 8,
                "qty": 0,
                "costIncrement": 125
            }),
        new GemShopItemBase(117, <GemShopItemModel>{
                "name": "GemQ6",
                "itemName": "Cog Inventory Space",
                "desc": "Each purchase gives you +4 cog inventory spaces, to store all your cogs in!",
                "cost": 100,
                "no": 116,
                "maxPurchases": 20,
                "qty": 0,
                "costIncrement": 40
            }),
        new GemShopItemBase(118, <GemShopItemModel>{
                "name": "GemQ7",
                "itemName": "Tower Building Slots",
                "desc": "Unlocks +1 more slot to build towers in! Remember, each slot builds at your FULL build rate, so this upgrade helps massively to upgrade all your towers to max level!",
                "cost": 350,
                "no": 117,
                "maxPurchases": 4,
                "qty": 0,
                "costIncrement": 100
            }),
        new GemShopItemBase(119, <GemShopItemModel>{
                "name": "GemQ8",
                "itemName": "Fluorescent Flaggies",
                "desc": "Makes your flaggies unlock spaces faster, opening up your board for more cogs! Each purchase boosts Flaggy rate by +50%",
                "cost": 250,
                "no": 118,
                "maxPurchases": 6,
                "qty": 0,
                "costIncrement": 75
            }),
        new GemShopItemBase(120, <GemShopItemModel>{
                "name": "GemQ10",
                "itemName": "Royal Egg Cap",
                "desc": "Boosts the max number of eggs in your breeding nest by +1. ALSO, as an added bonus, you get 1.10x New Pet Breeding Chance for each time you buy this!",
                "cost": 350,
                "no": 119,
                "maxPurchases": 5,
                "qty": 0,
                "costIncrement": 50
            }),
        new GemShopItemBase(121, <GemShopItemModel>{
                "name": "GemQ11",
                "itemName": "Richelin Kitchen",
                "desc": "Upgrades 1 kitchen, in order from first to last, to a Richelin Kitchen! These have 3x Meal Cooking Speed, 2x New Recipe Speed, and 40% Cheaper Upgrade Costs!",
                "cost": 250,
                "no": 120,
                "maxPurchases": 10,
                "qty": 0,
                "costIncrement": 40
            }),
        new GemShopItemBase(122, <GemShopItemModel>{
                "name": "GemQ12",
                "itemName": "Console Chip",
                "desc": "Gives you a random console chip. There are currently 22 Chips in the game, so you have a 1 in      22 chance of getting any particular chip.      This item restocks each week.",
                "cost": 385,
                "no": 121,
                "maxPurchases": 7,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(123, <GemShopItemModel>{
                "name": "GemQ13",
                "itemName": "Mainframe Jewel",
                "desc": "Gives you a random Jewel that you don't already    own. No need to worry about duplicate jewels!    This item restocks each week, unless you own all Jewels, then it wont restock.",
                "cost": 450,
                "no": 122,
                "maxPurchases": 2,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(124, <GemShopItemModel>{
                "name": "GemQ14",
                "itemName": "Souped Up Tube",
                "desc": "Each purchase soups up 2 lab Tubes. Players in souped-up tubes get 2x Lab EXP gain, and +30% Line Width. Keep in mind, players are placed in tubes in chronological order.",
                "cost": 480,
                "no": 123,
                "maxPurchases": 5,
                "qty": 0,
                "costIncrement": 65
            }),
        new GemShopItemBase(125, <GemShopItemModel>{
                "name": "GemQ15",
                "itemName": "Pet Storage",
                "desc": "Unlocks 12 pet storage spaces, which is an entire row!",
                "cost": 325,
                "no": 124,
                "maxPurchases": 12,
                "qty": 0,
                "costIncrement": 55
            }),
        new GemShopItemBase(126, <GemShopItemModel>{
                "name": "GemQ16",
                "itemName": "Fenceyard Space",
                "desc": "Unlocks 2 Fenceyard slots, which are great for Breedability Pets and Shiny Pets!",
                "cost": 275,
                "no": 125,
                "maxPurchases": 6,
                "qty": 0,
                "costIncrement": 45
            }),
        new GemShopItemBase(127, <GemShopItemModel>{
                "name": "PetEgg",
                "itemName": "Carton Of Eggs",
                "desc": "Each purchase gives anywhere from 3 to 12 eggs in your item inventory! Use these eggs in your          inventory to refill your nest with eggs!              This item restocks each day.",
                "cost": 270,
                "no": 126,
                "maxPurchases": 4,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(128, <GemShopItemModel>{
                "name": "GemP20",
                "itemName": "Miracle Chest",
                "desc": "Gives you 1 Miracle Chest from a random island! These have 20x more treasure and 30x higher     Artifact chance, including Ancient Artifacts!              This item restocks each day.",
                "cost": 345,
                "no": 127,
                "maxPurchases": 3,
                "qty": 0,
                "costIncrement": 0
            }),
        new GemShopItemBase(129, <GemShopItemModel>{
                "name": "Quest72",
                "itemName": "Bottled Wind",
                "desc": "Gives you a bottled wind item. Use it in your       player inventory to instantly get 6 hours of                           sailing progress!                       This item restocks each day.",
                "cost": 190,
                "no": 128,
                "maxPurchases": 4,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(130, <GemShopItemModel>{
                "name": "GemP21",
                "itemName": "Chest Sluggo",
                "desc": "Increases the maximum number of chests your sailing Loot Pile can hold by +1! Also adds a Chest Sluggo to roam around your dock! (Note:Not every purchase will visually add another slug, it'd be too chaotic!)",
                "cost": 250,
                "no": 129,
                "maxPurchases": 8,
                "qty": 0,
                "costIncrement": 40
            }),
        new GemShopItemBase(131, <GemShopItemModel>{
                "name": "GemP22",
                "itemName": "Divinity Sparkie",
                "desc": "Boosts the amount of Divinity Points and Divinity EXP gained by +25% for all of your players! Also adds a divinity sparkie that wanders around the deity volcanos, pondering its existence.",
                "cost": 250,
                "no": 130,
                "maxPurchases": 6,
                "qty": 0,
                "costIncrement": 50
            }),
        new GemShopItemBase(132, <GemShopItemModel>{
                "name": "GemP23",
                "itemName": "Golden Sprinkler",
                "desc": "The Sprinkler in the garden, which instantly regrows sprouts, now has a 30% chance to not use up its charge! Each additional purchase boosts this chance by 1.5x! Instantly unlocks Sprinkler if not unlocked yet!",
                "cost": 400,
                "no": 131,
                "maxPurchases": 4,
                "qty": 0,
                "costIncrement": 75
            }),
        new GemShopItemBase(133, <GemShopItemModel>{
                "name": "Quest73",
                "itemName": "Gaming Fertilizer",
                "desc": "Gives you a gaming fertilizer item. Use it in your    player inventory to instantly get 8 hours of                         gaming progress!                     This item restocks each day.",
                "cost": 230,
                "no": 132,
                "maxPurchases": 4,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(134, <GemShopItemModel>{
                "name": "GemP24",
                "itemName": "Lava Sprouts",
                "desc": "Increases the maximum number of sprouts your garden can hold by +1! Also adds a small lava sprout to your underground gamer lair, which complements the dankness of the ground walls!",
                "cost": 310,
                "no": 133,
                "maxPurchases": 6,
                "qty": 0,
                "costIncrement": 70
            }),
        new GemShopItemBase(135, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 134,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(136, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 135,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(137, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 136,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(138, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 137,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(139, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 138,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(140, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 139,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(141, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 140,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(142, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 150,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            }),
        new GemShopItemBase(143, <GemShopItemModel>{
                "name": "Blank",
                "itemName": "Name Of Item",
                "desc": "DESCRIPTION OF ITEM",
                "cost": -1,
                "no": 151,
                "maxPurchases": 1,
                "qty": 1,
                "costIncrement": 0
            })    
]
}
