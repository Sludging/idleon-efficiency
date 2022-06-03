import { ChipModel } from '../model/chipModel';
import { ComponentModel } from '../model/componentModel';
import { MealComponentModel } from '../model/mealComponentModel';
import { SpiceComponentModel } from '../model/spiceComponentModel';

export class ChipBase { constructor(public index: number, public data: ChipModel) { } }



export const initChipRepo = () => {
    return [    
        new ChipBase(0, <ChipModel>{
                "name": "Grounded Nanochip",
                "bonus": "+{% Total Defence",
                "description": "Boosts total defence",
                "requirements": [
                    <ComponentModel>{"item": "Copper", "quantity": 20000},
                    <MealComponentModel>{"mealNo": "0", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "0", "quantity": 100}
                ],
                "bool1": false,
                "stat": "def",
                "baseVal": 10
            }),
        new ChipBase(1, <ChipModel>{
                "name": "Grounded Motherboard",
                "bonus": "+{% Move Speed if total is less than 170%",
                "description": "Boosts total movement speed",
                "requirements": [
                    <ComponentModel>{"item": "OakTree", "quantity": 30000},
                    <MealComponentModel>{"mealNo": "1", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "0", "quantity": 100}
                ],
                "bool1": false,
                "stat": "move",
                "baseVal": 30
            }),
        new ChipBase(2, <ChipModel>{
                "name": "Grounded Software",
                "bonus": "+{% Total Accuracy",
                "description": "Boosts total accuracy",
                "requirements": [
                    <ComponentModel>{"item": "Fish1", "quantity": 20000},
                    <MealComponentModel>{"mealNo": "3", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "1", "quantity": 100}
                ],
                "bool1": false,
                "stat": "acc",
                "baseVal": 10
            }),
        new ChipBase(3, <ChipModel>{
                "name": "Grounded Processor",
                "bonus": "+{% Drop Rate if total is less than 5.00x",
                "description": "Boosts total drop rate",
                "requirements": [
                    <ComponentModel>{"item": "DesertA1", "quantity": 10000},
                    <MealComponentModel>{"mealNo": "4", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "1", "quantity": 100}
                ],
                "bool1": false,
                "stat": "dr",
                "baseVal": 60
            }),
        new ChipBase(4, <ChipModel>{
                "name": "Potato Chip",
                "bonus": "+{% Basic Attack spd. *Can Only Equip 1 per player*",
                "description": "Boosts attack speed",
                "requirements": [
                    <ComponentModel>{"item": "Bug1", "quantity": 20000},
                    <MealComponentModel>{"mealNo": "6", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "2", "quantity": 100}
                ],
                "bool1": true,
                "stat": "atkspd",
                "baseVal": 20
            }),
        new ChipBase(5, <ChipModel>{
                "name": "Conductive Nanochip",
                "bonus": "+{% Lab EXP Gain",
                "description": "Boosts lab exp gain",
                "requirements": [
                    <ComponentModel>{"item": "StumpTree", "quantity": 100000},
                    <MealComponentModel>{"mealNo": "9", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "3", "quantity": 100}
                ],
                "bool1": false,
                "stat": "labexp",
                "baseVal": 30
            }),
        new ChipBase(6, <ChipModel>{
                "name": "Conductive Motherboard",
                "bonus": "+{% Line Width within Mainframe",
                "description": "Boosts mainframe line width",
                "requirements": [
                    <ComponentModel>{"item": "Gold", "quantity": 100000},
                    <MealComponentModel>{"mealNo": "12", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "4", "quantity": 100}
                ],
                "bool1": false,
                "stat": "linewidth",
                "baseVal": 12
            }),
        new ChipBase(7, <ChipModel>{
                "name": "Conductive Software",
                "bonus": "+{% Fighting AFK Gain Rate *Can Only Equip 1 per player*",
                "description": "Boosts Fighting AFK gain rate",
                "requirements": [
                    <ComponentModel>{"item": "Critter2", "quantity": 10000},
                    <MealComponentModel>{"mealNo": "15", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "4", "quantity": 100}
                ],
                "bool1": true,
                "stat": "fafk",
                "baseVal": 15
            }),
        new ChipBase(8, <ChipModel>{
                "name": "Conductive Processor",
                "bonus": "+{% Skilling AFK Gain Rate *Can Only Equip 1 per player*",
                "description": "Boosts Skilling AFK gain Rate",
                "requirements": [
                    <ComponentModel>{"item": "Bug5", "quantity": 100000},
                    <MealComponentModel>{"mealNo": "18", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "5", "quantity": 100}
                ],
                "bool1": true,
                "stat": "safk",
                "baseVal": 15
            }),
        new ChipBase(9, <ChipModel>{
                "name": "Chocolatey Chip",
                "bonus": "{% chance to spawn a crystal mob when one dies. *Can Only Equip 1 per player*",
                "description": "Chance for Crystal Mob revival",
                "requirements": [
                    <ComponentModel>{"item": "CraftMat8", "quantity": 200000},
                    <MealComponentModel>{"mealNo": "21", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "6", "quantity": 100}
                ],
                "bool1": true,
                "stat": "crys",
                "baseVal": 75
            }),
        new ChipBase(10, <ChipModel>{
                "name": "Galvanic Nanochip",
                "bonus": "+{% Monster Respawn Rate",
                "description": "Boosts Mob respawn rate",
                "requirements": [
                    <ComponentModel>{"item": "SnowC1", "quantity": 100000},
                    <MealComponentModel>{"mealNo": "24", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "7", "quantity": 100}
                ],
                "bool1": false,
                "stat": "resp",
                "baseVal": 10
            }),
        new ChipBase(11, <ChipModel>{
                "name": "Galvanic Motherboard",
                "bonus": "+{% Total Skilling Efficiency for all skills",
                "description": "Boosts skilling efficiency",
                "requirements": [
                    <ComponentModel>{"item": "Fish5", "quantity": 250000},
                    <MealComponentModel>{"mealNo": "27", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "8", "quantity": 100}
                ],
                "bool1": false,
                "stat": "toteff",
                "baseVal": 20
            }),
        new ChipBase(12, <ChipModel>{
                "name": "Galvanic Software",
                "bonus": "+{% Total Damage",
                "description": "Boosts total damage",
                "requirements": [
                    <ComponentModel>{"item": "Dementia", "quantity": 300000},
                    <MealComponentModel>{"mealNo": "29", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "9", "quantity": 100}
                ],
                "bool1": false,
                "stat": "dmg",
                "baseVal": 10
            }),
        new ChipBase(13, <ChipModel>{
                "name": "Galvanic Processor",
                "bonus": "+{ Base Efficiency for all skills",
                "description": "Boosts base skilling efficiency",
                "requirements": [
                    <ComponentModel>{"item": "GalaxyB2", "quantity": 100000},
                    <MealComponentModel>{"mealNo": "31", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "10", "quantity": 100}
                ],
                "bool1": false,
                "stat": "eff",
                "baseVal": 250
            }),
        new ChipBase(14, <ChipModel>{
                "name": "Wood Chip",
                "bonus": "+{% Multikill per Damage Tier for all worlds",
                "description": "Boosts multikill",
                "requirements": [
                    <ComponentModel>{"item": "Tree8", "quantity": 250000},
                    <MealComponentModel>{"mealNo": "33", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "11", "quantity": 100}
                ],
                "bool1": false,
                "stat": "mkill",
                "baseVal": 15
            }),
        new ChipBase(15, <ChipModel>{
                "name": "Silkrode Nanochip",
                "bonus": "Doubles the bonuses of all active Star Signs. *Can Only Equip 1 per player*",
                "description": "Bolsters active star signs",
                "requirements": [
                    <ComponentModel>{"item": "CraftMat10", "quantity": 2000000},
                    <MealComponentModel>{"mealNo": "35", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "12", "quantity": 100}
                ],
                "bool1": true,
                "stat": "star",
                "baseVal": 1
            }),
        new ChipBase(16, <ChipModel>{
                "name": "Silkrode Motherboard",
                "bonus": "Doubles MISC bonuses of currently equipped Trophy. *Can Only Equip 1 per player*",
                "description": "Bolsters equipped trophy",
                "requirements": [
                    <ComponentModel>{"item": "Soul5", "quantity": 2000000},
                    <MealComponentModel>{"mealNo": "37", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "13", "quantity": 100}
                ],
                "bool1": true,
                "stat": "troph",
                "baseVal": 1
            }),
        new ChipBase(17, <ChipModel>{
                "name": "Silkrode Software",
                "bonus": "Doubles MISC bonuses of keychain equipped in the upper keychain slot. *Can Only Equip 1 per player*",
                "description": "Bolsters equipped keychain",
                "requirements": [
                    <ComponentModel>{"item": "Bug8", "quantity": 2000000},
                    <MealComponentModel>{"mealNo": "39", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "13", "quantity": 100}
                ],
                "bool1": true,
                "stat": "key1",
                "baseVal": 1
            }),
        new ChipBase(18, <ChipModel>{
                "name": "Silkrode Processor",
                "bonus": "Doubles MISC bonuses of currently equipped Pendant. *Can Only Equip 1 per player*",
                "description": "Bolsters equipped pendant",
                "requirements": [
                    <ComponentModel>{"item": "Critter10", "quantity": 2000000},
                    <MealComponentModel>{"mealNo": "41", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "14", "quantity": 100}
                ],
                "bool1": true,
                "stat": "pend",
                "baseVal": 1
            }),
        new ChipBase(19, <ChipModel>{
                "name": "Poker Chip",
                "bonus": "Your weapon gives 1.{x more Weapon Power. *Can Only Equip 1 per player*",
                "description": "Bolsters equipped Weapon",
                "requirements": [
                    <ComponentModel>{"item": "CraftMat14", "quantity": 2000000},
                    <MealComponentModel>{"mealNo": "43", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "14", "quantity": 100}
                ],
                "bool1": true,
                "stat": "weppow",
                "baseVal": 25
            }),
        new ChipBase(20, <ChipModel>{
                "name": "Omega Nanochip",
                "bonus": "Doubles bonus of card equipped in top left slot. *Can Only Equip 1 per player*",
                "description": "Bolsters an equipped card",
                "requirements": [
                    <ComponentModel>{"item": "Bug8", "quantity": 10000000},
                    <MealComponentModel>{"mealNo": "45", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "15", "quantity": 100}
                ],
                "bool1": true,
                "stat": "card1",
                "baseVal": 1
            }),
        new ChipBase(21, <ChipModel>{
                "name": "Omega Motherboard",
                "bonus": "Doubles bonus of card equipped in bottom right slot. *Can Only Equip 1 per player*",
                "description": "Bolsters an equipped card",
                "requirements": [
                    <ComponentModel>{"item": "Fish8", "quantity": 10000000},
                    <MealComponentModel>{"mealNo": "47", "quantity": 100},
                    <SpiceComponentModel>{"spiceNo": "16", "quantity": 100}
                ],
                "bool1": true,
                "stat": "card2",
                "baseVal": 1
            })    
]
}
