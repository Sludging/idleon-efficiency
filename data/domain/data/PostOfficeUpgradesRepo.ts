import { PostOfficeUpgradeModel } from '../model/postOfficeUpgradeModel';
import { PostOfficeUpgradesModel } from '../model/postOfficeUpgradesModel';

export class PostOfficeUpgradesBase { constructor(public id: string, public data: PostOfficeUpgradesModel) { } }



export const initPostOfficeUpgradesRepo = () => {
    return [    
        new PostOfficeUpgradesBase("Civil War Memory Box", <PostOfficeUpgradesModel>{
                "name": "Civil War Memory Box",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "Base Damage", "x1": 1, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Fight AFK Gains", "x1": 13, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Critical Chance", "x1": 10, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Locally Sourced Organs", <PostOfficeUpgradesModel>{
                "name": "Locally Sourced Organs",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "Base Max HP", "x1": 1, "x2": 2, "func": "intervalAdd"},
                    <PostOfficeUpgradeModel>{"bonus": "% Max HP", "x1": 0.1, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Faster Respawns", "x1": 30, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Magician Starterpack", <PostOfficeUpgradesModel>{
                "name": "Magician Starterpack",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "Base Max MP", "x1": 1, "x2": 3, "func": "intervalAdd"},
                    <PostOfficeUpgradeModel>{"bonus": "% Max MP", "x1": 0.1, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Faster Cooldowns", "x1": 17, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Box of Unwanted Stats", <PostOfficeUpgradesModel>{
                "name": "Box of Unwanted Stats",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "Base Accuracy", "x1": 0.25, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "Base Defence", "x1": 0.3, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Monster EXP", "x1": 29, "x2": 170, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Dwarven Supplies", <PostOfficeUpgradesModel>{
                "name": "Dwarven Supplies",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Mining Efficiency", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Prowess Effect", "x1": 40, "x2": 150, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Mining AFK Gain", "x1": 15, "x2": 175, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Blacksmith Box", <PostOfficeUpgradesModel>{
                "name": "Blacksmith Box",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Smithing EXP", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Production Speed", "x1": 75, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% to Craft +1 Slot", "x1": 30, "x2": 150, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Taped Up Timber", <PostOfficeUpgradesModel>{
                "name": "Taped Up Timber",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Choppin Efficiency", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Prowess Effect", "x1": 40, "x2": 150, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Choppin AFK Gain", "x1": 15, "x2": 175, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Carepack From Mum", <PostOfficeUpgradesModel>{
                "name": "Carepack From Mum",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Not Consume Food", "x1": 23, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Health Food Effect", "x1": 30, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Power Food Effect", "x1": 30, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Sealed Fishheads", <PostOfficeUpgradesModel>{
                "name": "Sealed Fishheads",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Fishin Efficiency", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Prowess Effect", "x1": 40, "x2": 150, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Fishin AFK Gain", "x1": 15, "x2": 175, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Potion Package", <PostOfficeUpgradesModel>{
                "name": "Potion Package",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Brewing Speed", "x1": 70, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Alchemy EXP", "x1": 60, "x2": 150, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "Cranium Cook Time", "x1": 0.1, "x2": 0, "func": "add"}
                ]
            }),
        new PostOfficeUpgradesBase("Bug Hunting Supplies", <PostOfficeUpgradesModel>{
                "name": "Bug Hunting Supplies",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Catchin Efficiency", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Prowess Effect", "x1": 40, "x2": 150, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Catchin AFK Gain", "x1": 15, "x2": 175, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Non Predatory Loot Box", <PostOfficeUpgradesModel>{
                "name": "Non Predatory Loot Box",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Drop Rarity", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "LUK", "x1": 0.25, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Crystal Mob Spawn", "x1": 65, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Deaths Storage Unit", <PostOfficeUpgradesModel>{
                "name": "Deaths Storage Unit",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "Weapon Power", "x1": 22, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Basic Atk Speed", "x1": 15, "x2": 150, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Total Damage", "x1": 15, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Utilitarian Capsule", <PostOfficeUpgradesModel>{
                "name": "Utilitarian Capsule",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Printer Sample Size", "x1": 5, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Multikill per Tier", "x1": 15, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Cash from Mobs", "x1": 39, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Lazzzy Lootcrate", <PostOfficeUpgradesModel>{
                "name": "Lazzzy Lootcrate",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% 2X AFK XP chance", "x1": 30, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% AFK exp if 36hr+", "x1": 35, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% AFK Cash if 36hr+", "x1": 35, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Science Spare Parts", <PostOfficeUpgradesModel>{
                "name": "Science Spare Parts",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "Lab Efficiency", "x1": 4, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Lab EXP gain", "x1": 40, "x2": 150, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "Base LUK", "x1": 30, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Trapping Lockbox", <PostOfficeUpgradesModel>{
                "name": "Trapping Lockbox",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Trapping Efficiency", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Trapping EXP", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Critters Trapped", "x1": 45, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Construction Container", <PostOfficeUpgradesModel>{
                "name": "Construction Container",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Base Build Rate", "x1": 0.25, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Shrine Charge Rate", "x1": 75, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Construction EXP", "x1": 0.5, "x2": 0, "func": "add"}
                ]
            }),
        new PostOfficeUpgradesBase("Crate of the Creator", <PostOfficeUpgradesModel>{
                "name": "Crate of the Creator",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Worship Efficiency", "x1": 50, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% Max Charge", "x1": 200, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "Starting Worship Pts", "x1": 90, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Chefs Essentials", <PostOfficeUpgradesModel>{
                "name": "Chefs Essentials",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "Cooking Efficiency", "x1": 4, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Cooking EXP gain", "x1": 60, "x2": 200, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% for 2x Ladle Drop", "x1": 88, "x2": 200, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Myriad Crate", <PostOfficeUpgradesModel>{
                "name": "Myriad Crate",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "Base All Stat", "x1": 400, "x2": 20000, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "Base All Efficiency", "x1": 1000, "x2": 20000, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "% All Skills exp", "x1": 100, "x2": 20000, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Scurvy C'arr'ate", <PostOfficeUpgradesModel>{
                "name": "Scurvy C'arr'ate",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% afk counts for sailing", "x1": 8, "x2": 400, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "AGI", "x1": 0.2, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Total Damage", "x1": 25, "x2": 400, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Box of Gosh", <PostOfficeUpgradesModel>{
                "name": "Box of Gosh",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% Divinity EXP", "x1": 75, "x2": 400, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "WIS", "x1": 0.2, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Divinity Gain", "x1": 30, "x2": 400, "func": "decay"}
                ]
            }),
        new PostOfficeUpgradesBase("Gaming Lootcrate", <PostOfficeUpgradesModel>{
                "name": "Gaming Lootcrate",
                "bonuses": [
                    <PostOfficeUpgradeModel>{"bonus": "% afk counts for gaming", "x1": 14, "x2": 400, "func": "decay"},
                    <PostOfficeUpgradeModel>{"bonus": "STR", "x1": 0.2, "x2": 0, "func": "add"},
                    <PostOfficeUpgradeModel>{"bonus": "% Total Damage", "x1": 25, "x2": 400, "func": "decay"}
                ]
            })    
]
}
