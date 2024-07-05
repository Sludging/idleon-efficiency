import { SkullShopModel } from '../model/skullShopModel';

export class SkullShopBase { constructor(public index: number, public data: SkullShopModel) { } }



export const initSkullShopRepo = () => {
    return [    
        new SkullShopBase(0, <SkullShopModel>{
                "description": "Get a random time candy! Pick it up off the floor.",
                "baseCost": 5,
                "costInc": 1,
                "rewardId": "Timecandy#",
                "qty": 1
            }),
        new SkullShopBase(1, <SkullShopModel>{
                "description": "Get a black pearl, gives Skill EXP! Pick it up off the floor.",
                "baseCost": 9,
                "costInc": 1,
                "rewardId": "Pearl4",
                "qty": 1
            }),
        new SkullShopBase(2, <SkullShopModel>{
                "description": "Get a white pearl, gives Class EXP! Pick it up off the floor.",
                "baseCost": 10,
                "costInc": 1,
                "rewardId": "Pearl5",
                "qty": 1
            }),
        new SkullShopBase(3, <SkullShopModel>{
                "description": "Your next kill spawns 1 Crystal Mob! Expires at end of day!",
                "baseCost": 3,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 1
            }),
        new SkullShopBase(4, <SkullShopModel>{
                "description": "Get a Dungeon Loot Dice! Pick it up off the floor.",
                "baseCost": 6,
                "costInc": 1,
                "rewardId": "LootDice",
                "qty": 1
            }),
        new SkullShopBase(5, <SkullShopModel>{
                "description": "Get 6 Balls! They're put right into the arcade!",
                "baseCost": 4,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 6
            }),
        new SkullShopBase(6, <SkullShopModel>{
                "description": "Get 2 Library Checkouts! It's put right into the library!",
                "baseCost": 8,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 2
            }),
        new SkullShopBase(7, <SkullShopModel>{
                "description": "Complete 1 Refinery Cycle auto- matically, right here right now!",
                "baseCost": 1,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 1
            }),
        new SkullShopBase(8, <SkullShopModel>{
                "description": "Get 2 Pet Eggs! Pick them up off the floor.",
                "baseCost": 8,
                "costInc": 1,
                "rewardId": "PetEgg",
                "qty": 2
            }),
        new SkullShopBase(9, <SkullShopModel>{
                "description": "Get 3 Kitchen Ladles! Pick them up off the floor.",
                "baseCost": 5,
                "costInc": 1,
                "rewardId": "Ladle",
                "qty": 3
            }),
        new SkullShopBase(10, <SkullShopModel>{
                "description": "1% Chance to permanently unlock the 3rd Killroy Weekly Fight!",
                "baseCost": 4,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 1
            }),
        new SkullShopBase(11, <SkullShopModel>{
                "description": "Permanently boosts Artifact Find Chance! Current bonus is x",
                "baseCost": 9,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 2
            }),
        new SkullShopBase(12, <SkullShopModel>{
                "description": "Adds 1 nugget to your Shovel in Gaming, go dig it up!",
                "baseCost": 5,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 1
            }),
        new SkullShopBase(13, <SkullShopModel>{
                "description": "Permanently boosts Crop Evolution Chance! Current bonus is x",
                "baseCost": 6,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 2
            }),
        new SkullShopBase(14, <SkullShopModel>{
                "description": "Permanently boosts Jade Gain! Current bonus is x",
                "baseCost": 7,
                "costInc": 0,
                "rewardId": "Timecandy1",
                "qty": 3
            })    
]
}
