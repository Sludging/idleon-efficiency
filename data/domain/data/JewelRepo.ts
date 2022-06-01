import { ComponentModel } from '../model/componentModel';
import { JewelModel } from '../model/jewelModel';
import { MealComponentModel } from '../model/mealComponentModel';
import { SpiceComponentModel } from '../model/spiceComponentModel';

export class JewelBase { constructor(public index: number, public data: JewelModel) { } }



export const initJewelRepo = () => {
    return [    
        new JewelBase(0, <JewelModel>{
                "x": 76,
                "y": 134,
                "range": 90,
                "effect": "Meal cooking is }x faster. This bonus is applied TWICE if all 3 purple jewels are active.",
                "description": "Boosts Meal Cooking speed",
                "requirements": [
                    <ComponentModel>{"item": "Quest66", "quantity": 5},
                    <MealComponentModel>{"mealNo": "1", "quantity": 2000},
                    <SpiceComponentModel>{"spiceNo": "0", "quantity": 200}
                ],
                "name": "Amethyst Rhinestone",
                "bonusGiven": 1.5
            }),
        new JewelBase(1, <JewelModel>{
                "x": 164,
                "y": 412,
                "range": 90,
                "effect": "'Animal Farm' mainframe bonus gives an additional +}% per species. If Animal Farm is not active, then this does nothing.",
                "description": "Bolsters 'Animal Farm'",
                "requirements": [
                    <ComponentModel>{"item": "Quest35", "quantity": 5},
                    <MealComponentModel>{"mealNo": "3", "quantity": 2000},
                    <SpiceComponentModel>{"spiceNo": "1", "quantity": 200}
                ],
                "name": "Purple Navette",
                "bonusGiven": 0.5
            }),
        new JewelBase(2, <JewelModel>{
                "x": 163,
                "y": 218,
                "range": 90,
                "effect": "All players get +}% Lab EXP gain.",
                "description": "Boosts Lab EXP gain",
                "requirements": [
                    <ComponentModel>{"item": "Timecandy1", "quantity": 10},
                    <MealComponentModel>{"mealNo": "5", "quantity": 2000},
                    <SpiceComponentModel>{"spiceNo": "2", "quantity": 200}
                ],
                "name": "Purple Rhombol",
                "bonusGiven": 40
            }),
        new JewelBase(3, <JewelModel>{
                "x": 246,
                "y": 110,
                "range": 90,
                "effect": "Construction slot 1 is now trimmed up, and has }x building Speed. Also trims slot 2 if all 4 blue jewels are active.",
                "description": "Trims up a construction slot",
                "requirements": [
                    <ComponentModel>{"item": "Quest15", "quantity": 10},
                    <MealComponentModel>{"mealNo": "7", "quantity": 5000},
                    <SpiceComponentModel>{"spiceNo": "3", "quantity": 400}
                ],
                "name": "Sapphire Rhinestone",
                "bonusGiven": 3
            }),
        new JewelBase(4, <JewelModel>{
                "x": 277,
                "y": 394,
                "range": 90,
                "effect": "All players get +}% All Stat. STR, AGI, WIS, and LUCK to boot.",
                "description": "Boosts all stats",
                "requirements": [
                    <ComponentModel>{"item": "TreeInterior1b", "quantity": 25},
                    <MealComponentModel>{"mealNo": "9", "quantity": 5000},
                    <SpiceComponentModel>{"spiceNo": "4", "quantity": 400}
                ],
                "name": "Sapphire Navette",
                "bonusGiven": 3
            }),
        new JewelBase(5, <JewelModel>{
                "x": 470,
                "y": 294,
                "range": 90,
                "effect": "Even if this jewel is off, all players within a 150px radius of this jewel, shown by the circle, have +25% Line Width. @ Also gives +}% Breeding EXP, but only when active.",
                "description": "Emits a 'Line Width' Aura",
                "requirements": [
                    <ComponentModel>{"item": "Sewers1b", "quantity": 30},
                    <MealComponentModel>{"mealNo": "11", "quantity": 5000},
                    <SpiceComponentModel>{"spiceNo": "5", "quantity": 400}
                ],
                "name": "Sapphire Rhombol",
                "bonusGiven": 25
            }),
        new JewelBase(6, <JewelModel>{
                "x": 490,
                "y": 112,
                "range": 90,
                "effect": "Every 24 hours, the } lowest level Kitchen Upgrades across all owned kitchens gain +1 Lv.",
                "description": "Automatically levels up kitchens",
                "requirements": [
                    <ComponentModel>{"item": "Quest38", "quantity": 2},
                    <MealComponentModel>{"mealNo": "13", "quantity": 5000},
                    <SpiceComponentModel>{"spiceNo": "6", "quantity": 400}
                ],
                "name": "Sapphire Pyramite",
                "bonusGiven": 2
            }),
        new JewelBase(7, <JewelModel>{
                "x": 552,
                "y": 163,
                "range": 90,
                "effect": "'No Bubble Left Behind' mainframe bonus gives +} levels instead of +1, and does so for the lowest 4 bubbles instead of 3.",
                "description": "Bolsters 'No Bubble Left Behind'",
                "requirements": [
                    <ComponentModel>{"item": "DesertA1b", "quantity": 50},
                    <MealComponentModel>{"mealNo": "15", "quantity": 10000},
                    <SpiceComponentModel>{"spiceNo": "7", "quantity": 1500}
                ],
                "name": "Pyrite Rhinestone",
                "bonusGiven": 2
            }),
        new JewelBase(8, <JewelModel>{
                "x": 646,
                "y": 407,
                "range": 90,
                "effect": "All players get }x 'non-consume' chance, and raises the max chance from 90% to 98%, allowing for longer AFK with food.",
                "description": "Boosts 'non-consume' chance",
                "requirements": [
                    <ComponentModel>{"item": "EquipmentPants19", "quantity": 2},
                    <MealComponentModel>{"mealNo": "17", "quantity": 10000},
                    <SpiceComponentModel>{"spiceNo": "8", "quantity": 1500}
                ],
                "name": "Pyrite Navette",
                "bonusGiven": 3
            }),
        new JewelBase(9, <JewelModel>{
                "x": 680,
                "y": 319,
                "range": 90,
                "effect": "All mainframe bonuses and jewels have a }% larger connection range, except for this jewel. This jewel has an 80px connection range no matter what!",
                "description": "Boosts mainframe connection range",
                "requirements": [
                    <ComponentModel>{"item": "DesertA3b", "quantity": 50},
                    <MealComponentModel>{"mealNo": "19", "quantity": 10000},
                    <SpiceComponentModel>{"spiceNo": "9", "quantity": 1500}
                ],
                "name": "Pyrite Rhombol",
                "bonusGiven": 30
            }),
        new JewelBase(10, <JewelModel>{
                "x": 847,
                "y": 105,
                "range": 90,
                "effect": "All players deal 1.}x more damage. This bonus is applied TWICE if all 4 Orange Jewels are active.",
                "description": "Boosts player damage",
                "requirements": [
                    <ComponentModel>{"item": "DesertC2b", "quantity": 50},
                    <MealComponentModel>{"mealNo": "21", "quantity": 10000},
                    <SpiceComponentModel>{"spiceNo": "10", "quantity": 1500}
                ],
                "name": "Pyrite Pyramite",
                "bonusGiven": 10
            }),
        new JewelBase(11, <JewelModel>{
                "x": 998,
                "y": 404,
                "range": 90,
                "effect": "}% reduced incubation egg time. Mo eggs mo problems tho, fo sho.",
                "description": "Reduces egg incubation time",
                "requirements": [
                    <ComponentModel>{"item": "BabaYagaETC", "quantity": 1},
                    <MealComponentModel>{"mealNo": "23", "quantity": 25000},
                    <SpiceComponentModel>{"spiceNo": "11", "quantity": 5000}
                ],
                "name": "Emerald Rhinestone",
                "bonusGiven": 28
            }),
        new JewelBase(12, <JewelModel>{
                "x": 1079,
                "y": 233,
                "range": 90,
                "effect": "All players have } higher base efficiency in all skills, and +10% skill action speed. This bonus is applied TWICE if all 5 Green Jewels are active.",
                "description": "Boosts player efficiency",
                "requirements": [
                    <ComponentModel>{"item": "SnowA2a", "quantity": 80},
                    <MealComponentModel>{"mealNo": "25", "quantity": 25000},
                    <SpiceComponentModel>{"spiceNo": "12", "quantity": 5000}
                ],
                "name": "Emerald Navette",
                "bonusGiven": 200
            }),
        new JewelBase(13, <JewelModel>{
                "x": 1085,
                "y": 121,
                "range": 90,
                "effect": "'Fungi Finger Pocketer' mainframe bonus gives an additional +}% cash bonus per million mushroom kills",
                "description": "Bolsters 'Fungi Finger Pocketer'",
                "requirements": [
                    <ComponentModel>{"item": "SnowB2a", "quantity": 120},
                    <MealComponentModel>{"mealNo": "27", "quantity": 25000},
                    <SpiceComponentModel>{"spiceNo": "13", "quantity": 5000}
                ],
                "name": "Emerald Rhombol",
                "bonusGiven": 1
            }),
        new JewelBase(14, <JewelModel>{
                "x": 1167,
                "y": 390,
                "range": 90,
                "effect": "Meal cooking is }% faster for every 25 total upgrade levels across all kitchens. @ Total Bonus: {% speed",
                "description": "Boosts Meal Cooking speed",
                "requirements": [
                    <ComponentModel>{"item": "SnowC4a", "quantity": 150},
                    <MealComponentModel>{"mealNo": "29", "quantity": 25000},
                    <SpiceComponentModel>{"spiceNo": "14", "quantity": 5000}
                ],
                "name": "Emerald Pyramite",
                "bonusGiven": 1
            }),
        new JewelBase(15, <JewelModel>{
                "x": 1300,
                "y": 208,
                "range": 90,
                "effect": "Special Pets in the Fenceyard level up their Passive Bonuses +}% faster",
                "description": "Boosts Pet Passive level up rate",
                "requirements": [
                    <ComponentModel>{"item": "GalaxyA2b", "quantity": 200},
                    <MealComponentModel>{"mealNo": "31", "quantity": 25000},
                    <SpiceComponentModel>{"spiceNo": "15", "quantity": 5000}
                ],
                "name": "Emerald Ulthurite",
                "bonusGiven": 30
            }),
        new JewelBase(16, <JewelModel>{
                "x": 1365,
                "y": 100,
                "range": 90,
                "effect": "All meal bonuses, as shown in the Dinner Table Menu, actaully give 1.}x higher bonus than what is shown. So if a bonus says +100%, it is actually giving +1}%",
                "description": "Bolsters meals",
                "requirements": [
                    <ComponentModel>{"item": "GalaxyC1b", "quantity": 300},
                    <MealComponentModel>{"mealNo": "33", "quantity": 100000},
                    <SpiceComponentModel>{"spiceNo": "15", "quantity": 10000}
                ],
                "name": "Black Diamond Rhinestone",
                "bonusGiven": 16
            }),
        new JewelBase(17, <JewelModel>{
                "x": 1389,
                "y": 408,
                "range": 90,
                "effect": "'Unadulterated Banking Fury' gives an additional +}% Total Damage per greened stack.",
                "description": "Bolsters 'Unadulterated Banking Fury'",
                "requirements": [
                    <ComponentModel>{"item": "Critter10A", "quantity": 10000},
                    <MealComponentModel>{"mealNo": "35", "quantity": 100000},
                    <SpiceComponentModel>{"spiceNo": "16", "quantity": 10000}
                ],
                "name": "Black Diamond Ulthurite",
                "bonusGiven": 1
            })    
]
}
