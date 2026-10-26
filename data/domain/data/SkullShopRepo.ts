import { SkullShopModel } from '../model/skullShopModel';

export class SkullShopBase { constructor(public index: number, public data: SkullShopModel) { } }



export const initSkullShopRepo = () => {
    return [    
        new SkullShopBase(0, <SkullShopModel>{
                "id": 0,
                "descriptionTemplate": "Get a random time candy! Pick it up off the floor.",
                "skullCost": 5,
                "dropsItem": true,
                "itemIdOrPattern": "Timecandy#",
                "rawQuantity": 1
            }),
        new SkullShopBase(1, <SkullShopModel>{
                "id": 1,
                "descriptionTemplate": "Get a black pearl, gives Skill EXP! Pick it up off the floor.",
                "skullCost": 9,
                "dropsItem": true,
                "itemIdOrPattern": "Pearl4",
                "rawQuantity": 1
            }),
        new SkullShopBase(2, <SkullShopModel>{
                "id": 2,
                "descriptionTemplate": "Get a white pearl, gives Class EXP! Pick it up off the floor.",
                "skullCost": 10,
                "dropsItem": true,
                "itemIdOrPattern": "Pearl5",
                "rawQuantity": 1
            }),
        new SkullShopBase(3, <SkullShopModel>{
                "id": 3,
                "descriptionTemplate": "Your next kill spawns 1 Crystal Mob! Expires at end of day!",
                "skullCost": 3,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 1
            }),
        new SkullShopBase(4, <SkullShopModel>{
                "id": 4,
                "descriptionTemplate": "Get a Dungeon Loot Dice! Pick it up off the floor.",
                "skullCost": 6,
                "dropsItem": true,
                "itemIdOrPattern": "LootDice",
                "rawQuantity": 1
            }),
        new SkullShopBase(5, <SkullShopModel>{
                "id": 5,
                "descriptionTemplate": "Get 10 Balls! They're put right into the arcade!",
                "skullCost": 4,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 6
            }),
        new SkullShopBase(6, <SkullShopModel>{
                "id": 6,
                "descriptionTemplate": "Get 2 Library Checkouts! It's put right into the library!",
                "skullCost": 8,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 2
            }),
        new SkullShopBase(7, <SkullShopModel>{
                "id": 7,
                "descriptionTemplate": "Complete 1 Refinery Cycle automatically, right here right now!",
                "skullCost": 1,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 1
            }),
        new SkullShopBase(8, <SkullShopModel>{
                "id": 8,
                "descriptionTemplate": "Get 2 Mob Eggs! Pick them up off the floor.",
                "skullCost": 8,
                "dropsItem": true,
                "itemIdOrPattern": "PetEgg",
                "rawQuantity": 2
            }),
        new SkullShopBase(9, <SkullShopModel>{
                "id": 9,
                "descriptionTemplate": "Get 3 Kitchen Ladles! Pick them up off the floor.",
                "skullCost": 5,
                "dropsItem": true,
                "itemIdOrPattern": "Ladle",
                "rawQuantity": 3
            }),
        new SkullShopBase(10, <SkullShopModel>{
                "id": 10,
                "descriptionTemplate": "1% Chance to permanently unlock the 3rd Killroy Weekly Fight!",
                "skullCost": 4,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 1
            }),
        new SkullShopBase(11, <SkullShopModel>{
                "id": 11,
                "descriptionTemplate": "Permanently boosts Artifact Find Chance! Current bonus is {x",
                "skullCost": 9,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 2
            }),
        new SkullShopBase(12, <SkullShopModel>{
                "id": 12,
                "descriptionTemplate": "Adds 1 nugget to your Shovel in Gaming, go dig it up!",
                "skullCost": 5,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 1
            }),
        new SkullShopBase(13, <SkullShopModel>{
                "id": 13,
                "descriptionTemplate": "Permanently boosts Crop Evolution Chance! Current bonus is {x",
                "skullCost": 6,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 2
            }),
        new SkullShopBase(14, <SkullShopModel>{
                "id": 14,
                "descriptionTemplate": "Permanently boosts Jade Gain! Current bonus is {x",
                "skullCost": 7,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 3
            }),
        new SkullShopBase(15, <SkullShopModel>{
                "id": 15,
                "descriptionTemplate": "5% Chance for +1 Grade for your Gallery in World 7!",
                "skullCost": 15,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 1
            }),
        new SkullShopBase(16, <SkullShopModel>{
                "id": 16,
                "descriptionTemplate": "Permanently boosts the drops of Masterclasses by {x",
                "skullCost": 7,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 2
            }),
        new SkullShopBase(17, <SkullShopModel>{
                "id": 17,
                "descriptionTemplate": "Permanently boosts EXP gain for all World 7 skills by {x",
                "skullCost": 6,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 1
            }),
        new SkullShopBase(18, <SkullShopModel>{
                "id": 18,
                "descriptionTemplate": "Permanently boosts daily coral gain by +{%",
                "skullCost": 10,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 2
            }),
        new SkullShopBase(19, <SkullShopModel>{
                "id": 19,
                "descriptionTemplate": "Permanently boosts something... Current bonus is {x",
                "skullCost": 12,
                "dropsItem": false,
                "itemIdOrPattern": "Timecandy1",
                "rawQuantity": 3
            })    
]
}
