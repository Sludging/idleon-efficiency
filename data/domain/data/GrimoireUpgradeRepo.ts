import { GrimoireUpgradeModel } from '../model/grimoireUpgradeModel';

export class GrimoireUpgradeBase { constructor(public index: number, public data: GrimoireUpgradeModel) { } }



export const initGrimoireUpgradeRepo = () => {
    return [    
        new GrimoireUpgradeBase(0, <GrimoireUpgradeModel>{
                "name": "Wraith Damage",
                "base_cost": 8,
                "scaling_factor": 1.1,
                "x1": 0,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 0,
                "x2": 0,
                "description": "+{ Base Damage in Wraith Form",
                "has_tooltip": true,
                "tooltip_text": "Enter Wraith Form using the other Talent. It lets you get bones from killing monsters! Exit Wraith Form by reusing the talent."
            }),
        new GrimoireUpgradeBase(1, <GrimoireUpgradeModel>{
                "name": "Wraith Accuracy",
                "base_cost": 8,
                "scaling_factor": 1.04,
                "x1": 0,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 1,
                "x2": 0,
                "description": "+{ Base Accuracy in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(2, <GrimoireUpgradeModel>{
                "name": "Wraith Defence",
                "base_cost": 9,
                "scaling_factor": 1.1,
                "x1": 0,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 5,
                "x2": 0,
                "description": "+{ Base Defence in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(3, <GrimoireUpgradeModel>{
                "name": "Wraith Health",
                "base_cost": 10,
                "scaling_factor": 1.07,
                "x1": 0,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 10,
                "x2": 0,
                "description": "+{ Base HP in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(4, <GrimoireUpgradeModel>{
                "name": "Ribbon Shelf",
                "base_cost": 1000,
                "scaling_factor": 1.3,
                "x1": 0,
                "max_level": 1,
                "value": 1,
                "unlock_req": 25,
                "x2": 0,
                "description": "Unlocks Ribbons for Meals, found at Le Menu in W4",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(5, <GrimoireUpgradeModel>{
                "name": "Ribbon Winning",
                "base_cost": 50,
                "scaling_factor": 1.6,
                "x1": 0,
                "max_level": 50,
                "value": 1,
                "unlock_req": 26,
                "x2": 0,
                "description": "Get +1 Daily Ribbon, +{% chance for rare quality",
                "has_tooltip": true,
                "tooltip_text": "You only get ribbons on days you play IdleOn. If your Shelf is full, the new ribbon will try to combine with another."
            }),
        new GrimoireUpgradeBase(6, <GrimoireUpgradeModel>{
                "name": "Wraith Damage II",
                "base_cost": 25,
                "scaling_factor": 1.11,
                "x1": 0,
                "max_level": 999999,
                "value": 3,
                "unlock_req": 80,
                "x2": 0,
                "description": "+{ Base Damage in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(7, <GrimoireUpgradeModel>{
                "name": "Wraith of all Trades",
                "base_cost": 50,
                "scaling_factor": 1.18,
                "x1": 0,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 125,
                "x2": 0,
                "description": "+{% Accuracy, Defence, and HP in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(8, <GrimoireUpgradeModel>{
                "name": "Wraith Destruction",
                "base_cost": 70,
                "scaling_factor": 1.15,
                "x1": 0,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 155,
                "x2": 0,
                "description": "+{% Total Damage in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(9, <GrimoireUpgradeModel>{
                "name": "Land Rank Database Maxim",
                "base_cost": 100,
                "scaling_factor": 10,
                "x1": 0,
                "max_level": 10,
                "value": 1,
                "unlock_req": 190,
                "x2": 0,
                "description": "+{ Max LV for 5th column Land Rank upgrades",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(10, <GrimoireUpgradeModel>{
                "name": "Wraith Crits",
                "base_cost": 150,
                "scaling_factor": 1.25,
                "x1": 0,
                "max_level": 40,
                "value": 1,
                "unlock_req": 220,
                "x2": 0,
                "description": "+{% Crit Chance in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(11, <GrimoireUpgradeModel>{
                "name": "Pure Opals",
                "base_cost": 1500,
                "scaling_factor": 1.8,
                "x1": 1,
                "max_level": 25,
                "value": 1,
                "unlock_req": 255,
                "x2": 0,
                "description": "+{ Opals to give to your Villagers in World 5",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(12, <GrimoireUpgradeModel>{
                "name": "Wraith Accuracy II",
                "base_cost": 200,
                "scaling_factor": 1.06,
                "x1": 0,
                "max_level": 999999,
                "value": 3,
                "unlock_req": 290,
                "x2": 0,
                "description": "+{ Base Accuracy in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(13, <GrimoireUpgradeModel>{
                "name": "Knockout! (#)",
                "base_cost": 450,
                "scaling_factor": 1.45,
                "x1": 1,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 330,
                "x2": 0,
                "description": "+{% Wraith DMG per KO! Target:$",
                "has_tooltip": true,
                "tooltip_text": "A Knockout, or KO, is when you kill the target monster in a single hit using your bare hands, no spears allowed!"
            }),
        new GrimoireUpgradeBase(14, <GrimoireUpgradeModel>{
                "name": "Sacrifice of Harvest",
                "base_cost": 300,
                "scaling_factor": 1.04,
                "x1": 0,
                "max_level": 999999,
                "value": 5,
                "unlock_req": 380,
                "x2": 0,
                "description": "}x higher Crop Evo chance",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(15, <GrimoireUpgradeModel>{
                "name": "Wraith Defence II",
                "base_cost": 500,
                "scaling_factor": 1.12,
                "x1": 1,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 425,
                "x2": 0,
                "description": "+{ Base Defence in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(16, <GrimoireUpgradeModel>{
                "name": "Wraith Damage III",
                "base_cost": 750,
                "scaling_factor": 1.12,
                "x1": 1,
                "max_level": 999999,
                "value": 15,
                "unlock_req": 470,
                "x2": 0,
                "description": "+{ Base Damage in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(17, <GrimoireUpgradeModel>{
                "name": "Grey Tome Book",
                "base_cost": 2000,
                "scaling_factor": 1.25,
                "x1": 1,
                "max_level": 150,
                "value": 1,
                "unlock_req": 500,
                "x2": 0,
                "description": "}x higher bonuses from the Tome",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(18, <GrimoireUpgradeModel>{
                "name": "Femur Hoarding",
                "base_cost": 3500,
                "scaling_factor": 1.15,
                "x1": 1,
                "max_level": 999999,
                "value": 2,
                "unlock_req": 550,
                "x2": 0,
                "description": "+{% Wraith DMG per POW 10 Femurs owned",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(19, <GrimoireUpgradeModel>{
                "name": "Wraith Health II",
                "base_cost": 4000,
                "scaling_factor": 1.07,
                "x1": 1,
                "max_level": 999999,
                "value": 2,
                "unlock_req": 650,
                "x2": 0,
                "description": "+{ Base HP in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(20, <GrimoireUpgradeModel>{
                "name": "Wraith Strikeforce",
                "base_cost": 5800,
                "scaling_factor": 1.15,
                "x1": 1,
                "max_level": 999999,
                "value": 2,
                "unlock_req": 770,
                "x2": 0,
                "description": "+{% Crit DMG in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(21, <GrimoireUpgradeModel>{
                "name": "Elimination! (#)",
                "base_cost": 6250,
                "scaling_factor": 1.45,
                "x1": 1,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 900,
                "x2": 0,
                "description": "+{% Wraith DMG per elim! Target:$",
                "has_tooltip": true,
                "tooltip_text": "An Elimination is when you defeat the entire map of target monsters before any of them respawn!"
            }),
        new GrimoireUpgradeBase(22, <GrimoireUpgradeModel>{
                "name": "Superior Crop Research",
                "base_cost": 7500,
                "scaling_factor": 1.25,
                "x1": 0,
                "max_level": 200,
                "value": 1,
                "unlock_req": 1050,
                "x2": 0,
                "description": "}x higher bonuses from the Crop Scientist",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(23, <GrimoireUpgradeModel>{
                "name": "Bones o' Plenty",
                "base_cost": 8000,
                "scaling_factor": 1.2,
                "x1": 1,
                "max_level": 999999,
                "value": 2,
                "unlock_req": 1250,
                "x2": 0,
                "description": "+{% Extra Bones",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(24, <GrimoireUpgradeModel>{
                "name": "Skull of Major Experience",
                "base_cost": 8500,
                "scaling_factor": 1.03,
                "x1": 1,
                "max_level": 999999,
                "value": 8,
                "unlock_req": 1475,
                "x2": 0,
                "description": "+{% Class EXP bonus for all characters, always!",
                "has_tooltip": true,
                "tooltip_text": "This bonus affects all your players, all the time! It has nothing to do with Wraith Form or your Death Bringer."
            }),
        new GrimoireUpgradeBase(25, <GrimoireUpgradeModel>{
                "name": "Wraith Accuracy III",
                "base_cost": 10500,
                "scaling_factor": 1.07,
                "x1": 2,
                "max_level": 999999,
                "value": 5,
                "unlock_req": 1700,
                "x2": 0,
                "description": "+{ Base Accuracy in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(26, <GrimoireUpgradeModel>{
                "name": "Supreme Head Chef Status",
                "base_cost": 11000,
                "scaling_factor": 1.4,
                "x1": 1,
                "max_level": 20,
                "value": 1,
                "unlock_req": 1900,
                "x2": 0,
                "description": "+{ Max LV for all Meals. Go max them!",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(27, <GrimoireUpgradeModel>{
                "name": "Ribcage Hoarding",
                "base_cost": 12000,
                "scaling_factor": 1.2,
                "x1": 0,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 2150,
                "x2": 0,
                "description": "+{% Wraith DEF per POW 10 Ribcages owned",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(28, <GrimoireUpgradeModel>{
                "name": "Wraith Destruction II",
                "base_cost": 13900,
                "scaling_factor": 1.17,
                "x1": 1,
                "max_level": 999999,
                "value": 3,
                "unlock_req": 2300,
                "x2": 0,
                "description": "+{% Total Damage in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(29, <GrimoireUpgradeModel>{
                "name": "Villager Extraciricular",
                "base_cost": 15000,
                "scaling_factor": 1.15,
                "x1": 2,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 2500,
                "x2": 0,
                "description": "}x Villager EXP gain in World 5",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(30, <GrimoireUpgradeModel>{
                "name": "Wraith Defence III",
                "base_cost": 14500,
                "scaling_factor": 1.11,
                "x1": 2,
                "max_level": 999999,
                "value": 2,
                "unlock_req": 2800,
                "x2": 0,
                "description": "+{ Base Defence in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(31, <GrimoireUpgradeModel>{
                "name": "Annihilation! (#)",
                "base_cost": 16500,
                "scaling_factor": 1.55,
                "x1": 2,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 2900,
                "x2": 0,
                "description": "+{% Wraith DMG per stack! Target:$",
                "has_tooltip": true,
                "tooltip_text": "An Annihilation is when you defeat 200 target monsters within 60 seconds of entering their map!"
            }),
        new GrimoireUpgradeBase(32, <GrimoireUpgradeModel>{
                "name": "Talents for Me, not for Thee",
                "base_cost": 18000,
                "scaling_factor": 1.1,
                "x1": 2,
                "max_level": 200,
                "value": 1,
                "unlock_req": 3150,
                "x2": 0,
                "description": "+{ Talent PTS for the Death Bringer class only",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(33, <GrimoireUpgradeModel>{
                "name": "Wraith Damage IV",
                "base_cost": 19750,
                "scaling_factor": 1.13,
                "x1": 2,
                "max_level": 999999,
                "value": 50,
                "unlock_req": 3300,
                "x2": 0,
                "description": "+{ Base Damage in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(34, <GrimoireUpgradeModel>{
                "name": "Wraith Health III",
                "base_cost": 21500,
                "scaling_factor": 1.07,
                "x1": 2,
                "max_level": 999999,
                "value": 3,
                "unlock_req": 3500,
                "x2": 0,
                "description": "+{ Base HP in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(35, <GrimoireUpgradeModel>{
                "name": "Skull of Major Damage",
                "base_cost": 23000,
                "scaling_factor": 1.04,
                "x1": 2,
                "max_level": 999999,
                "value": 3,
                "unlock_req": 3750,
                "x2": 0,
                "description": "+{% Total DMG bonus for all characters, always!",
                "has_tooltip": true,
                "tooltip_text": "This bonus affects all your players, all the time! It has nothing to do with Wraith Form or your Death Bringer."
            }),
        new GrimoireUpgradeBase(36, <GrimoireUpgradeModel>{
                "name": "Writhing Grimoire",
                "base_cost": 27000,
                "scaling_factor": 1.2,
                "x1": 1,
                "max_level": 50,
                "value": 1,
                "unlock_req": 4100,
                "x2": 0,
                "description": "}x higher bonuses from most Grimoire upgrades",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(37, <GrimoireUpgradeModel>{
                "name": "Wraith Accuracy IV",
                "base_cost": 34000,
                "scaling_factor": 1.08,
                "x1": 2,
                "max_level": 999999,
                "value": 5,
                "unlock_req": 4200,
                "x2": 0,
                "description": "+{ Base Accuracy in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(38, <GrimoireUpgradeModel>{
                "name": "Wraith of all Trades II",
                "base_cost": 42000,
                "scaling_factor": 1.06,
                "x1": 3,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 4500,
                "x2": 0,
                "description": "+{% Accuracy, Defence, and HP in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(39, <GrimoireUpgradeModel>{
                "name": "Skull of Major Talent",
                "base_cost": 50000,
                "scaling_factor": 1.65,
                "x1": 3,
                "max_level": 30,
                "value": 1,
                "unlock_req": 4600,
                "x2": 0,
                "description": "+{ Talent LVs for all characters, always!",
                "has_tooltip": true,
                "tooltip_text": "This bonus affects all your players, all the time! It has nothing to do with Wraith Form or your Death Bringer."
            }),
        new GrimoireUpgradeBase(40, <GrimoireUpgradeModel>{
                "name": "Wraith Defence IV",
                "base_cost": 57000,
                "scaling_factor": 1.13,
                "x1": 3,
                "max_level": 999999,
                "value": 3,
                "unlock_req": 4800,
                "x2": 0,
                "description": "+{ Base Defence in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(41, <GrimoireUpgradeModel>{
                "name": "Cranium Hoarding",
                "base_cost": 63000,
                "scaling_factor": 1.07,
                "x1": 3,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 5000,
                "x2": 0,
                "description": "+{% Wraith Accuracy per POW 10 Craniums owned",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(42, <GrimoireUpgradeModel>{
                "name": "Wraith Health IV",
                "base_cost": 75000,
                "scaling_factor": 1.09,
                "x1": 3,
                "max_level": 999999,
                "value": 5,
                "unlock_req": 5200,
                "x2": 0,
                "description": "+{ Base HP in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(43, <GrimoireUpgradeModel>{
                "name": "Wraith Destruction III",
                "base_cost": 85000,
                "scaling_factor": 1.17,
                "x1": 3,
                "max_level": 999999,
                "value": 5,
                "unlock_req": 5400,
                "x2": 0,
                "description": "+{% Total Damage in Wraith form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(44, <GrimoireUpgradeModel>{
                "name": "Skull of Major Droprate",
                "base_cost": 100000,
                "scaling_factor": 1.08,
                "x1": 3,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 5600,
                "x2": 0,
                "description": "+{% Drop Rate bonus for all characters, always!",
                "has_tooltip": true,
                "tooltip_text": "This bonus affects all your players, all the time! It has nothing to do with Wraith Form or your Death Bringer."
            }),
        new GrimoireUpgradeBase(45, <GrimoireUpgradeModel>{
                "name": "Ok fine, Talents for Thee too",
                "base_cost": 120000,
                "scaling_factor": 1.15,
                "x1": 3,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 5850,
                "x2": 0,
                "description": "+{ Talent PTS for all other Master Classes",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(46, <GrimoireUpgradeModel>{
                "name": "Wraith Damage V",
                "base_cost": 150000,
                "scaling_factor": 1.15,
                "x1": 2,
                "max_level": 999999,
                "value": 80,
                "unlock_req": 6200,
                "x2": 0,
                "description": "+{ Base Damage in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(47, <GrimoireUpgradeModel>{
                "name": "Wraith Accuracy V",
                "base_cost": 200000,
                "scaling_factor": 1.1,
                "x1": 2,
                "max_level": 999999,
                "value": 8,
                "unlock_req": 6500,
                "x2": 0,
                "description": "+{ Base Accuracy in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(48, <GrimoireUpgradeModel>{
                "name": "Bovinae Hoarding",
                "base_cost": 300000,
                "scaling_factor": 1.35,
                "x1": 2,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 6800,
                "x2": 0,
                "description": "+{% Extra Bones per POW 10 Bovinae owned",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(49, <GrimoireUpgradeModel>{
                "name": "Wraith Defence V",
                "base_cost": 500000,
                "scaling_factor": 1.15,
                "x1": 3,
                "max_level": 999999,
                "value": 5,
                "unlock_req": 7100,
                "x2": 0,
                "description": "+{ Base Defence in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(50, <GrimoireUpgradeModel>{
                "name": "Wraith Destruction IV",
                "base_cost": 600000,
                "scaling_factor": 1.18,
                "x1": 3,
                "max_level": 999999,
                "value": 8,
                "unlock_req": 7200,
                "x2": 0,
                "description": "+{% Total Damage in Wraith Form",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(51, <GrimoireUpgradeModel>{
                "name": "Death of the Atom Price",
                "base_cost": 750000,
                "scaling_factor": 1.15,
                "x1": 3,
                "max_level": 999999,
                "value": 1,
                "unlock_req": 7500,
                "x2": 0,
                "description": "All Atoms are +{% cheaper to upgrade",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(52, <GrimoireUpgradeModel>{
                "name": "Ripped Page",
                "base_cost": 1999999999,
                "scaling_factor": 99999,
                "x1": 1,
                "max_level": 1,
                "value": 1,
                "unlock_req": 7600,
                "x2": 0,
                "description": "These pages are missing...",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(53, <GrimoireUpgradeModel>{
                "name": "Ripped Page",
                "base_cost": 1999999999,
                "scaling_factor": 99999,
                "x1": 1,
                "max_level": 1,
                "value": 1,
                "unlock_req": 7700,
                "x2": 0,
                "description": "These pages are missing...",
                "has_tooltip": false,
                "tooltip_text": undefined
            }),
        new GrimoireUpgradeBase(54, <GrimoireUpgradeModel>{
                "name": "Ripped Page",
                "base_cost": 1999999999,
                "scaling_factor": 99999,
                "x1": 1,
                "max_level": 1,
                "value": 1,
                "unlock_req": 7800,
                "x2": 0,
                "description": "These pages are missing...",
                "has_tooltip": false,
                "tooltip_text": undefined
            })    
]
}
