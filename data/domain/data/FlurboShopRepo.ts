import { FlurboShopModel } from '../model/flurboShopModel';

export class FlurboShopBase { constructor(public id: string, public data: FlurboShopModel) { } }



export const initFlurboShopRepo = () => {
    return [    
        new FlurboShopBase("Key0", <FlurboShopModel>{
                "intId": "Key0",
                "cost": 50,
                "noPurchases": 0,
                "displayName": "Mini Keychain",
                "description": "Gives you a random Tier 1 Keychain, equipped in the Specials tab. Click the arrow below your equipment!"
            }),
        new FlurboShopBase("Key1", <FlurboShopModel>{
                "intId": "Key1",
                "cost": 500,
                "noPurchases": 0,
                "displayName": "Average Keychain",
                "description": "Gives you a random Tier 2 Keychain. The balloon animal keychain is my favorite!"
            }),
        new FlurboShopBase("Key2", <FlurboShopModel>{
                "intId": "Key2",
                "cost": 3000,
                "noPurchases": 0,
                "displayName": "Deluxe Keychain",
                "description": "Gives you a random Tier 3 Keychain. Good luck, hope you get the one you want!"
            }),
        new FlurboShopBase("Key3", <FlurboShopModel>{
                "intId": "Key3",
                "cost": 1000000,
                "noPurchases": 0,
                "displayName": "No Keychain",
                "description": "There's nothing here, and won't be for many many months. Don't buy this, you'll get no keychain!"
            }),
        new FlurboShopBase("TalentBook1", <FlurboShopModel>{
                "intId": "TalentBook1",
                "cost": 400,
                "noPurchases": 1,
                "displayName": "Mega Crit Talent",
                "description": "Gives you this star talent book with random Max Lv between 1 and 100."
            }),
        new FlurboShopBase("EquipmentPendant19", <FlurboShopModel>{
                "intId": "EquipmentPendant19",
                "cost": 30,
                "noPurchases": 0,
                "displayName": "Cedar Pendant",
                "description": "This pendant requires Class lv. 20 to equip, and provides good accuracy."
            }),
        new FlurboShopBase("EquipmentPendant20", <FlurboShopModel>{
                "intId": "EquipmentPendant20",
                "cost": 125,
                "noPurchases": 1,
                "displayName": "Fishhead Pendant",
                "description": "This pendant requires Class lv. 40 to equip, and draws in fish like no other."
            }),
        new FlurboShopBase("EquipmentPendant21", <FlurboShopModel>{
                "intId": "EquipmentPendant21",
                "cost": 600,
                "noPurchases": 1,
                "displayName": "Deathly Cluster Pendant",
                "description": "This pendant requires Class lv. 80 to equip, and it reeks of both life and death."
            }),
        new FlurboShopBase("EquipmentPendant22", <FlurboShopModel>{
                "intId": "EquipmentPendant22",
                "cost": 2500,
                "noPurchases": 1,
                "displayName": "Hallowed Tail Pendant",
                "description": "This pendant requires Class lv. 110 to equip, and monsters nearby shudder at the sight of it."
            }),
        new FlurboShopBase("EquipmentPendant23", <FlurboShopModel>{
                "intId": "EquipmentPendant23",
                "cost": 12500,
                "noPurchases": 1,
                "displayName": "Persephone's Bouquet",
                "description": "This pendant requires Class lv. 140 to equip, and makes you at one with nature and all its splendor."
            }),
        new FlurboShopBase("EquipmentRings21", <FlurboShopModel>{
                "intId": "EquipmentRings21",
                "cost": 20,
                "noPurchases": 0,
                "displayName": "Elf Twist Ring",
                "description": "This ring requires Class Lv. 15 to equip, and provides good defence."
            }),
        new FlurboShopBase("EquipmentRings20", <FlurboShopModel>{
                "intId": "EquipmentRings20",
                "cost": 80,
                "noPurchases": 1,
                "displayName": "Rex Ring",
                "description": "This ring requires Class Lv. 40 to equip, and boosts skill efficiency."
            }),
        new FlurboShopBase("EquipmentRings19", <FlurboShopModel>{
                "intId": "EquipmentRings19",
                "cost": 400,
                "noPurchases": 1,
                "displayName": "Bejeweled Ring",
                "description": "This ring requires Class Lv. 70 to equip, and gives bonus experience."
            }),
        new FlurboShopBase("EquipmentRings22", <FlurboShopModel>{
                "intId": "EquipmentRings22",
                "cost": 2000,
                "noPurchases": 1,
                "displayName": "Tenacity Ring",
                "description": "This ring requires Class Lv. 120 to equip, and has great damage stats."
            }),
        new FlurboShopBase("EquipmentRings18", <FlurboShopModel>{
                "intId": "EquipmentRings18",
                "cost": 10000,
                "noPurchases": 1,
                "displayName": "The Emperor King's Black Opal",
                "description": "This ring requires Class Lv. 150 to equip, and has the greatest stats."
            })    
]
}
