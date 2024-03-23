import { BubbleModel } from '../model/bubbleModel';
import { CauldronModel } from '../model/cauldronModel';
import { ComponentModel } from '../model/componentModel';
import { CropComponentModel } from '../model/cropComponentModel';
import { JadeComponentModel } from '../model/jadeComponentModel';
import { LiquidComponentModel } from '../model/liquidComponentModel';
import { SailTreasureComponentModel } from '../model/sailTreasureComponentModel';
import { SpiceComponentModel } from '../model/spiceComponentModel';
import { SummonComponentModel } from '../model/summonComponentModel';

export class CauldronBase { constructor(public id: string, public data: CauldronModel) { } }



export const initBubbleRepo = () => {
    return [    
        new CauldronBase("Power Cauldron", <CauldronModel>{
                "bubbles": [
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Roid Ragin",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Total STR. 'Total' here means that, for example, a +10% STR bonus from something else wouldn't affect this bonus.",
                        "requirements": [<ComponentModel>{"item": "OakTree", "quantity": 25}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "TotalSTR"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Warriors Rule",
                        "x1": 2,
                        "x2": 50,
                        "func": "decayMulti",
                        "description": "All Orange Passive Bubbles, which are the smaller sized ones, give a {x higher bonus to your warrior-based classes.",
                        "requirements": [<ComponentModel>{"item": "Grasslands1", "quantity": 20}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "Opassz"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Hearty Diggy",
                        "x1": 50,
                        "x2": 100,
                        "func": "decay",
                        "description": "+{% mining efficiency per power of 10 max HP that your character has. The perfect bonus for miners with infinite HP!",
                        "requirements": [<ComponentModel>{"item": "JungleTree", "quantity": 40}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "MinEff"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Wyoming Blood",
                        "x1": 23.5,
                        "x2": 1.5,
                        "func": "bigBase",
                        "description": "Multi-Ore mining chance is increased by +{%, and your max Multi-Ore chance is 300% instead of 100%.",
                        "requirements": [<ComponentModel>{"item": "Bug1", "quantity": 30}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}],
                        "bonusKey": "MiningACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Reely Smart",
                        "x1": 100,
                        "x2": 80,
                        "func": "decay",
                        "description": "+{% Mining and Fishing EXP gain. Y'know what, I'll even DOUBLE that bonus for whichever skill has the lower level!",
                        "requirements": [<ComponentModel>{"item": "CraftMat6", "quantity": 25}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}],
                        "bonusKey": "MinFishEXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Big Meaty Claws",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "Increases base damage by +$. This bonus increases based on how much Max HP you have above 250.",
                        "requirements": [<ComponentModel>{"item": "DesertB2", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "bdmgHP"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Sploosh Sploosh",
                        "x1": 23.5,
                        "x2": 1.5,
                        "func": "bigBase",
                        "description": "Multi-Fish fishing chance is increased by +{%, and your max Multi-Fish chance is 300% instead of 100%.",
                        "requirements": [<ComponentModel>{"item": "Fish2", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "FishingACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Stronk Tools",
                        "x1": 65,
                        "x2": 70,
                        "func": "decay",
                        "description": "The following tools give +{% more skilling Power than normal: $",
                        "requirements": [<ComponentModel>{"item": "Plat", "quantity": 60}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "ToolW"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Fmj",
                        "x1": 0.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% more defence from Equipment. Also, +1 base Def per Class LV, up to +{.",
                        "requirements": [<ComponentModel>{"item": "Bug4", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 5}],
                        "bonusKey": "DefPct"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Bappity Boopity",
                        "x1": 35,
                        "x2": 100,
                        "func": "decay",
                        "description": "+{% critical Damage. Badabing, badaboom! Or in Italian, Babadabinga, babadaboomahh!",
                        "requirements": [<ComponentModel>{"item": "CraftMat8", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 5}],
                        "bonusKey": "critDMG"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Brittley Spears",
                        "x1": 40,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.",
                        "requirements": [<ComponentModel>{"item": "Critter1", "quantity": 10}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "pctDmg1"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Call Me Bob",
                        "x1": 25,
                        "x2": 2.5,
                        "func": "bigBase",
                        "description": "+{% Construction EXP Gain. Also gives +50% Bug-Fixing speed if your username is LavaFlame2.",
                        "requirements": [<ComponentModel>{"item": "SnowA3", "quantity": 120}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "conEXPACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Carpenter",
                        "x1": 5,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Build Speed per Construction Level. Not affected by 'Warriors Rule' bubble.",
                        "requirements": [<ComponentModel>{"item": "Refinery2", "quantity": 3}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}],
                        "bonusKey": "Construction"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Buff Boi Talent",
                        "x1": 5,
                        "x2": 1,
                        "func": "bigBase",
                        "description": "+{ Talent Points for EACH tab! Yea, it's amazing right? But it's just for warriors, don't tell the other classes!!",
                        "requirements": [<ComponentModel>{"item": "Critter4", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}],
                        "bonusKey": "TalWarrior"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Orange Bargain",
                        "x1": 40,
                        "x2": 12,
                        "func": "decay",
                        "description": "The material costs of ALL orange bubbles are {% lower",
                        "requirements": [<ComponentModel>{"item": "Soul4", "quantity": 30}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "BubbleCostOr"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Penny Of Strength",
                        "x1": 18,
                        "x2": 30,
                        "func": "decay",
                        "description": "+{% Cash from Monsters for every 250 STR. The pennies reflect your strength in themselves, thus making them more valuable!",
                        "requirements": [<ComponentModel>{"item": "Fish5", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "CashSTR"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Multorange",
                        "x1": 1.4,
                        "x2": 30,
                        "func": "decayMulti",
                        "description": "The following orange bubbles give {x higher bonus than displayed: 1st, 3rd, 5th, 8th, 15th",
                        "requirements": [<ComponentModel>{"item": "GalaxyA3", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "MultiOr"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Dream Of Ironfish",
                        "x1": 12,
                        "x2": 30,
                        "func": "decay",
                        "description": "+{% Mining and Fishing AFK GAINS rate. Wow, how bias can you get... giving the warrior's bubble TWO afk gain bonuses.",
                        "requirements": [<ComponentModel>{"item": "CraftMat13", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}],
                        "bonusKey": "MinFshAFK"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Shimmeron",
                        "x1": 80,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% Gold Food Effect. Go on, its ok, I won't be offended. No seriously, go upgrade something else, I know I'm not a good upgrade...",
                        "requirements": [<ComponentModel>{"item": "CraftMat14", "quantity": 300}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}],
                        "bonusKey": "GFoodz"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Bite But Not Chew",
                        "x1": 50,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% Food Non-Consume chance. Also, if your capped Non-Consume chance happens to be 98%, this changes it to 99%!",
                        "requirements": [<ComponentModel>{"item": "GalaxyC4", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "nonFoodACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Spear Powah",
                        "x1": 40,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% more Weapon Power from your weapon, but only if its a Spear!",
                        "requirements": [<ComponentModel>{"item": "Bits", "quantity": 10000}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "W1"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Slabi Orefish",
                        "x1": 3,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Mining and Fishing Power per 100 items found, shown on The Slab!",
                        "requirements": [<ComponentModel>{"item": "Soul6", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "W2"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Gamer At Heart",
                        "x1": 20,
                        "x2": 60,
                        "func": "decay",
                        "description": "When claiming AFK Gains, +{% chance to gain an equal amount of time for Gaming progress!",
                        "requirements": [
                            <SailTreasureComponentModel>{"sailTreasureNo": "9", "quantity": 100},
                            <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}
                        ],
                        "bonusKey": "W3ACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Slabi Strength",
                        "x1": 25,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Base STR per 100 items found, shown on The Slab!",
                        "requirements": [<ComponentModel>{"item": "LavaB3b", "quantity": 2}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}],
                        "bonusKey": "W4"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Power Trione",
                        "x1": 23,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Total Damage per 250 STR, but only for warriors! No triple dipping into AGI and WIS! Also this, but for beginners with LUK!",
                        "requirements": [
                            <SailTreasureComponentModel>{"sailTreasureNo": "20", "quantity": 150},
                            <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}
                        ],
                        "bonusKey": "W5"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Farquad Force",
                        "x1": 30,
                        "x2": 60,
                        "func": "decay",
                        "description": "The effect STR has on Damage is increased by +{%",
                        "requirements": [<CropComponentModel>{"cropId": "3", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "W6"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Endgame Eff I",
                        "x1": 3,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Mining and Fishing Power. This bonus increases based on every 10 Class LVs you are above 500.",
                        "requirements": [<ComponentModel>{"item": "SpiA2b", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "W7"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Tome Strength",
                        "x1": 2.5,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% STR for every 2000 Tome Completion Points over 5000. So you'd get one stack of this at 7000 pts, two at 9000, etc",
                        "requirements": [<SummonComponentModel>{"summonId": "0", "quantity": 500}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "W8"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Essence Boost",
                        "x1": 50,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% Red Essence Gain, this bonus increases based on the total level of ALL your warriors!",
                        "requirements": [<ComponentModel>{"item": "Tree13", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "W9AllCharz"
                    },
                    <BubbleModel>{
                        "cauldron": "Power Cauldron",
                        "name": "Crop Chapter",
                        "x1": 12,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Crop Evolution chance for every 2000 Tome Completion Points above 5000.",
                        "requirements": [<SummonComponentModel>{"summonId": "0", "quantity": 1500}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "W10AllCharz"
                    }
                ]
            }),
        new CauldronBase("Quicc Cauldron", <CauldronModel>{
                "bubbles": [
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Swift Steppin",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Total AGI. Probably the lamest of the five stats... err, I mean four, hehe.",
                        "requirements": [<ComponentModel>{"item": "Copper", "quantity": 15}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "TotalAGI"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Archer Or Bust",
                        "x1": 2,
                        "x2": 50,
                        "func": "decayMulti",
                        "description": "All Green Passive Bonuses, which are the smaller sized ones, give {x more bonuses to your archer-based characters.",
                        "requirements": [<ComponentModel>{"item": "Grasslands1", "quantity": 20}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "Gpassz"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Hammer Hammer",
                        "x1": 23,
                        "x2": 2,
                        "func": "bigBase",
                        "description": "You can now produce +1 more items at once in the anvil, and your production speed is increased by {%.",
                        "requirements": [<ComponentModel>{"item": "Iron", "quantity": 30}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "AnvilACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Lil Big Damage",
                        "x1": 20,
                        "x2": 100,
                        "func": "decay",
                        "description": "+{% Mastery. Mastery is your stat that boosts minimum damage. Just like in Maplest... err, just like how I thought it up myself!",
                        "requirements": [<ComponentModel>{"item": "Fish1", "quantity": 25}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}],
                        "bonusKey": "Mastery"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Anvilnomics",
                        "x1": 40,
                        "x2": 100,
                        "func": "decay",
                        "description": "Costs for buying Anvil Production Points is reduced by {%. This is just like a tax cut, so remember me as a hero!",
                        "requirements": [<ComponentModel>{"item": "ForestTree", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}],
                        "bonusKey": "AnvilProdCost"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Quick Slap",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "Increases base damage by +$. This bonus increases based on how much Movement Speed you have above 110%.",
                        "requirements": [<ComponentModel>{"item": "DesertB1", "quantity": 90}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "bdmgSPD"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Sanic Tools",
                        "x1": 65,
                        "x2": 70,
                        "func": "decay",
                        "description": "The following tools give +{% more skilling Power than normal: $",
                        "requirements": [<ComponentModel>{"item": "Jungle1", "quantity": 130}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "ToolA"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Bug]",
                        "x1": 23.5,
                        "x2": 1.5,
                        "func": "bigBase",
                        "description": "Multi-Bug catching chance is increased by +{%, and your max Multi-Bug chance is 300% instead of 100%.",
                        "requirements": [<ComponentModel>{"item": "Bug3", "quantity": 70}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "CatchingACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Shaquracy",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "Your secondary stat (WIS for warrior, STR for archer, AGI for mage) gives +{% more Accuracy than normal.",
                        "requirements": [<ComponentModel>{"item": "Fish4", "quantity": 65}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 5}],
                        "bonusKey": "AccPct"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Cheap Shot",
                        "x1": 7,
                        "x2": 100,
                        "func": "decay",
                        "description": "+{% critical Chance, as it increases the chance for your attack to hit the monster's privates, and for the monster to be male.",
                        "requirements": [<ComponentModel>{"item": "Bug5", "quantity": 35}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 5}],
                        "bonusKey": "CritChance"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Bow Jack",
                        "x1": 40,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.",
                        "requirements": [<ComponentModel>{"item": "Soul1", "quantity": 5}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "pctDmg2"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Call Me Ash",
                        "x1": 25,
                        "x2": 2,
                        "func": "bigBase",
                        "description": "+{% Trapping Efficiency when this bubble is equipped. Also, +1 Placeable Trap ALWAYS, even when this isn't equipped!",
                        "requirements": [<ComponentModel>{"item": "SaharanFoal", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "TrapACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Cuz I Catch Em All",
                        "x1": 3,
                        "x2": 100,
                        "func": "decayMulti",
                        "description": "{x more likely to catch shiny critters when opening a trap.",
                        "requirements": [<ComponentModel>{"item": "Soul3", "quantity": 25}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}],
                        "bonusKey": "CritShiny"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Fast Boi Talent",
                        "x1": 5,
                        "x2": 1,
                        "func": "bigBase",
                        "description": "+{ Talent Points for EACH tab, but just for Archers! Well, and 'that' class, you know who you are!",
                        "requirements": [<ComponentModel>{"item": "Bug6", "quantity": 120}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}],
                        "bonusKey": "TalArchers"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Green Bargain",
                        "x1": 40,
                        "x2": 12,
                        "func": "decay",
                        "description": "The material costs of ALL green bubbles are {% lower",
                        "requirements": [<ComponentModel>{"item": "Critter5", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "BubbleCostGr"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Dollar Of Agility",
                        "x1": 18,
                        "x2": 30,
                        "func": "decay",
                        "description": "+{% Cash from Monsters for every 250 AGI. The extra agility allows the dollars to stretch in size and increase in value!",
                        "requirements": [<ComponentModel>{"item": "CraftMat11", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "CashAGI"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Premigreen",
                        "x1": 1.4,
                        "x2": 30,
                        "func": "decayMulti",
                        "description": "The following green bubbles give {x higher bonus than displayed: 1st, 7th, 10th, 13th, 15th",
                        "requirements": [<ComponentModel>{"item": "Critter8", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "MultiGr"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Fly In Mind",
                        "x1": 12,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% Catching AFK Gains Rate. Now you too can dream about bugs in your sleep, just like I do all the time!!!!",
                        "requirements": [<ComponentModel>{"item": "Bug7", "quantity": 350}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}],
                        "bonusKey": "CatchinAFK"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Kill Per Kill",
                        "x1": 70,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% extra Kills for Deathnote and opening portals to new maps. Shoutout to my I.S. players who fondly remember 'Kill Per Kill'!",
                        "requirements": [<ComponentModel>{"item": "Refinery4", "quantity": 6}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}],
                        "bonusKey": "kpkACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Afk Expexp",
                        "x1": 40,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% chance for Double EXP when claiming AFK gains. You'll know this happens because it literally tells you it happened!",
                        "requirements": [<ComponentModel>{"item": "Bug8", "quantity": 300}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "DubEXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Bow Power",
                        "x1": 40,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% more Weapon Power from your weapon, but only if its a Bow!",
                        "requirements": [<ComponentModel>{"item": "Bits", "quantity": 10000}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "A1"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Slabo Critterbug",
                        "x1": 3,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Catching and Trapping Power per 100 items found, shown on The Slab!",
                        "requirements": [<ComponentModel>{"item": "Tree9", "quantity": 500}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "A2"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Sailor At Heart",
                        "x1": 16,
                        "x2": 60,
                        "func": "decay",
                        "description": "When claiming AFK Gains, +{% chance to gain an equal amount of time for Sailing progress!",
                        "requirements": [
                            <SailTreasureComponentModel>{"sailTreasureNo": "11", "quantity": 100},
                            <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}
                        ],
                        "bonusKey": "A3ACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Slabo Agility",
                        "x1": 25,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Base AGI and LUK per 100 items found, shown on The Slab! Woah cool this is like a Archer Beginner crossover bubble!",
                        "requirements": [<ComponentModel>{"item": "LavaB6", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}],
                        "bonusKey": "A4"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Power Tritwo",
                        "x1": 23,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Total Damage per 250 AGI, but only for archers! No triple dipping into STR and WIS!",
                        "requirements": [
                            <SailTreasureComponentModel>{"sailTreasureNo": "24", "quantity": 150},
                            <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}
                        ],
                        "bonusKey": "A5"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Quickdraw Quiver",
                        "x1": 40,
                        "x2": 60,
                        "func": "decay",
                        "description": "The effect AGI has on Damage is increased by +{%",
                        "requirements": [<JadeComponentModel>{"quantity": 25000}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "A6"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Essence Boost",
                        "x1": 50,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% Green Essence Gain, this bonus increases based on the total level of ALL your archers!",
                        "requirements": [<ComponentModel>{"item": "Tree12", "quantity": 500}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "A7AllCharz"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Endgame Eff Ii",
                        "x1": 3,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Catching and Trapping Power. This bonus increases based on every 10 Class LVs you are above 500.",
                        "requirements": [<CropComponentModel>{"cropId": "46", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "A8"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Tome Agility",
                        "x1": 2.5,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% AGI for every 2000 Tome Completion Points over 5000. So you'd get one stack of this at 7000 pts, two at 9000, etc",
                        "requirements": [<ComponentModel>{"item": "Bug13", "quantity": 750}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "A9"
                    },
                    <BubbleModel>{
                        "cauldron": "Quicc Cauldron",
                        "name": "Stealth Chapter",
                        "x1": 10,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Stealth (the stat that lowers detection rate in Sneaking) for every 2000 Tome Completion Points above 5000.",
                        "requirements": [<CropComponentModel>{"cropId": "99", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "A10AllCharz"
                    }
                ]
            }),
        new CauldronBase("High-IQ Cauldron", <CauldronModel>{
                "bubbles": [
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Stable Jenius",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Total WIS. Honesty the greatest bonus in any Idle Game, believe me. Absolutely incredible, everyone says so!",
                        "requirements": [<ComponentModel>{"item": "BirchTree", "quantity": 16}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "TotalWIS"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Mage Is Best",
                        "x1": 2,
                        "x2": 50,
                        "func": "decayMulti",
                        "description": "All Purple Passive Bonuses, which are the smaller sized ones, give {x more bonuses to your mage-based characters.",
                        "requirements": [<ComponentModel>{"item": "Grasslands1", "quantity": 20}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "Ppassz"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Hocus Choppus",
                        "x1": 50,
                        "x2": 100,
                        "func": "decay",
                        "description": "+{% choppin efficiency per power of 10 max MP that your character has. Super diaper! Err, duper.",
                        "requirements": [<ComponentModel>{"item": "CraftMat5", "quantity": 22}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "ChopEff"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Molto Loggo",
                        "x1": 23.5,
                        "x2": 1.5,
                        "func": "bigBase",
                        "description": "Multi-Log chop chance is increased by +{%, and your max Multi-Log chance is now 300% instead of 100%.",
                        "requirements": [<ComponentModel>{"item": "IronBar", "quantity": 21}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}],
                        "bonusKey": "MultiLogACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Noodubble",
                        "x1": 100,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% Choppin' and Alchemy EXP gain. Y'know what, I'll even... actually, never mind.",
                        "requirements": [<ComponentModel>{"item": "CraftMat7", "quantity": 20}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}],
                        "bonusKey": "ChopAlchEXP"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Name I Guess",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "Increases base damage by +$. This bonus increases based on how much Max MP you have above 150.",
                        "requirements": [<ComponentModel>{"item": "Gold", "quantity": 40}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "bdmgMP"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Le Brain Tools",
                        "x1": 65,
                        "x2": 70,
                        "func": "decay",
                        "description": "The following tools give +{% more skilling Power than normal: $",
                        "requirements": [<ComponentModel>{"item": "Bug3", "quantity": 55}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "ToolM"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Cookin Roadkill",
                        "x1": 120,
                        "x2": 70,
                        "func": "decay",
                        "description": "Cranium Cooking lasts {% longer, gives {% more progress per kill, and has a {% lower cooldown. Also +{% Alchemy EXP!",
                        "requirements": [<ComponentModel>{"item": "ToiletTree", "quantity": 75}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "AlchemyACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Brewstachio",
                        "x1": 50,
                        "x2": 100,
                        "func": "decay",
                        "description": "+{% Brew Speed. This a multiplicative bonus, which means its ultra powerful, all the time! Even on Mondays, the worst day!",
                        "requirements": [<ComponentModel>{"item": "DesertC1", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 5}],
                        "bonusKey": "BrewSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "All For Kill",
                        "x1": 40,
                        "x2": 100,
                        "func": "decay",
                        "description": "Attack Talents give +{% higher bonuses to Offline Gains than they normally do. So you might as well just AFK forever, bye!",
                        "requirements": [<ComponentModel>{"item": "StumpTree", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 5}],
                        "bonusKey": "AttackAfk"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Matty Stafford",
                        "x1": 40,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.",
                        "requirements": [<ComponentModel>{"item": "Refinery1", "quantity": 3}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "pctDmg3"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Call Me Pope",
                        "x1": 2.4,
                        "x2": 70,
                        "func": "decayMulti",
                        "description": "{x Worship Charge rate per hour. Also, {x Max Worship Charge! You bouta go super with all that charge... just sayin'",
                        "requirements": [<ComponentModel>{"item": "Critter2", "quantity": 25}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "worshipACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Gospel Leader",
                        "x1": 60,
                        "x2": 30,
                        "func": "decay",
                        "description": "+{% Max Charge per 10 Worship levels. I guess you could say this upgrade doesn't come Free of Charge!",
                        "requirements": [<ComponentModel>{"item": "Bug5", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}],
                        "bonusKey": "maxCharge"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Smart Boi Talent",
                        "x1": 5,
                        "x2": 1,
                        "func": "bigBase",
                        "description": "Sorry, mages don't get anything because you're lame.... Ok fine, you can have +{ Talent Points for each tab, but I'm not happy about it.",
                        "requirements": [<ComponentModel>{"item": "SnowC1", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}],
                        "bonusKey": "TalWiz"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Purple Bargain",
                        "x1": 40,
                        "x2": 12,
                        "func": "decay",
                        "description": "The material costs of ALL purple bubbles are {% lower",
                        "requirements": [<ComponentModel>{"item": "Soul1", "quantity": 500}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "BubbleCostPu"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Nickel Of Wisdom",
                        "x1": 18,
                        "x2": 30,
                        "func": "decay",
                        "description": "+{% Cash from Monsters for every 250 WIS. Wisdom allows the nickel to trick others into thinking its a Dime, increasing its value!",
                        "requirements": [<ComponentModel>{"item": "AlienTree", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "CashWIS"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Severapurple",
                        "x1": 1.4,
                        "x2": 30,
                        "func": "decayMulti",
                        "description": "The following purple bubbles give {x higher bonus than displayed: 1st, 3rd, 5th, 13th, 15th",
                        "requirements": [<ComponentModel>{"item": "Void", "quantity": 175}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "MultiPu"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Tree Sleeper",
                        "x1": 12,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% Choppin' AFK Gains Rate. Ain't nothin' like sittin' down at the ol' tree and havin' a snooze n' a sleep!",
                        "requirements": [<ComponentModel>{"item": "Soul5", "quantity": 60}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}],
                        "bonusKey": "ChoppinAFK"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Hyperswift",
                        "x1": 30,
                        "x2": 30,
                        "func": "decay",
                        "description": "+{% Basic Attack Speed. Just like all other Basic Attack Speed bonuses, this boosts AFK kills/hr if you do enough dmg!",
                        "requirements": [<ComponentModel>{"item": "Fish7", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}],
                        "bonusKey": "BAspd"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Matrix Evolved",
                        "x1": 60,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% Lab EXP Gain. Also +{% ineptitude to face the reality of what's REALLY going on behind the scenes...",
                        "requirements": [<ComponentModel>{"item": "Tree8", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "LabXpACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Wand Pawur",
                        "x1": 40,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% more Weapon Power from your weapon, but only if its a Wand! Or a fisticuff I guess...",
                        "requirements": [<ComponentModel>{"item": "Bits", "quantity": 10000}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "M1"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Slabe Logsoul",
                        "x1": 3,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Choppin and Worship Power per 100 items found, shown on The Slab!",
                        "requirements": [<ComponentModel>{"item": "Bug9", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "M2"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Pious At Heart",
                        "x1": 300,
                        "x2": 100,
                        "func": "decay",
                        "description": "+{% Divinity EXP Gain",
                        "requirements": [
                            <SailTreasureComponentModel>{"sailTreasureNo": "13", "quantity": 15},
                            <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}
                        ],
                        "bonusKey": "M3ACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Slabe Wisdom",
                        "x1": 25,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Base WIS per 100 items found, shown on The Slab!",
                        "requirements": [<ComponentModel>{"item": "LavaC1", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}],
                        "bonusKey": "M4"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Power Trithree",
                        "x1": 23,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Total Damage per 250 WIS, but only for mages! No triple dipping into STR and AGI!",
                        "requirements": [
                            <SailTreasureComponentModel>{"sailTreasureNo": "28", "quantity": 200},
                            <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}
                        ],
                        "bonusKey": "M5"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Smarter Spells",
                        "x1": 25,
                        "x2": 60,
                        "func": "decay",
                        "description": "The effect WIS has on Damage is increased by +{%",
                        "requirements": [<SummonComponentModel>{"summonId": "0", "quantity": 500}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "M6"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Endgame Eff Iii",
                        "x1": 3,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{ Choppin and Worship Power. This bonus increases based on every 10 Class LVs you are above 500.",
                        "requirements": [<SummonComponentModel>{"summonId": "0", "quantity": 950}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "M7"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Essence Boost",
                        "x1": 50,
                        "x2": 100,
                        "func": "decay",
                        "description": "+{% Purple Essence Gain, this bonus increases based on the total level of ALL your mages!",
                        "requirements": [<ComponentModel>{"item": "Soul7", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "M8AllCharz"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Tome Wisdom",
                        "x1": 2.5,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% WIS for every 2000 Tome Completion Points over 5000. So you'd get one stack of this at 7000 pts, two at 9000, etc",
                        "requirements": [<CropComponentModel>{"cropId": "72", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "M9"
                    },
                    <BubbleModel>{
                        "cauldron": "High-IQ Cauldron",
                        "name": "Essence Chapter",
                        "x1": 15,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% All Essence Gain for every 2000 Tome Completion Points above 5000.",
                        "requirements": [<JadeComponentModel>{"quantity": 250000}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "M10AllCharz"
                    }
                ]
            }),
        new CauldronBase("Kazam Cauldron", <CauldronModel>{
                "bubbles": [
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Lotto Skills",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ LUK. Also, this will increase your chances of winning the lottery in real life from 0.0% to 0.000%! I'm not even joking, it's true!!",
                        "requirements": [<ComponentModel>{"item": "CraftMat1", "quantity": 9}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "TotalLUK"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Droppin Loads",
                        "x1": 40,
                        "x2": 70,
                        "func": "decay",
                        "description": "+{% Drop Rate. Thanks to this upgrade, you can get even MORE angry when you keep not getting that rare item you're grinding for!",
                        "requirements": [<ComponentModel>{"item": "Fish1", "quantity": 20}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "DropRate"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Startue Exp",
                        "x1": 25,
                        "x2": 60,
                        "func": "decay",
                        "description": "Leveling up a statue resets it's exp bar down to {%, instead of 0%. Staturrific! Yea... the jokes are only gonna go downhill from here lol",
                        "requirements": [<ComponentModel>{"item": "DesertA1", "quantity": 30}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "StatueStartEXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Level Up Gift",
                        "x1": 100,
                        "x2": 30,
                        "func": "decay",
                        "description": "Whenever you level up anything, {% chance to drop a gift! It could be an EXP balloon, a Gem for the gem shop, or something crazy weird!",
                        "requirements": [<ComponentModel>{"item": "DesertA3", "quantity": 30}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}],
                        "bonusKey": "LevelUpACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Prowesessary",
                        "x1": 1.5,
                        "x2": 60,
                        "func": "decayMulti",
                        "description": "The Prowess Bonus for every skill is multiplied by {. Prowess lowers the Efficiency needed to get multiple QTY per drop from resources.",
                        "requirements": [<ComponentModel>{"item": "ToiletTree", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}],
                        "bonusKey": "ProwessMulti"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Stamp Tramp",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "Increases the Max Lv of the 'Toilet Paper Postage' Talent to {. You unlock this talent by typing 'More like Poopy Pete' near Pete.",
                        "requirements": [<ComponentModel>{"item": "Bug2", "quantity": 65}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}],
                        "bonusKey": "TPpostage"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Undeveloped Costs",
                        "x1": 40,
                        "x2": 70,
                        "func": "decay",
                        "description": "Reduces the material costs of all Alchemy Bubbles by {%. They are just bubbles though, how much could they even cost? 10 dollars?",
                        "requirements": [<ComponentModel>{"item": "Fish3", "quantity": 75}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 6}],
                        "bonusKey": "BubbleCost"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Da Daily Drip",
                        "x1": 30,
                        "x2": 100,
                        "func": "decay",
                        "description": "Increases the Max Cap for every liquid by +$. This bonus increases based on the combined Alchemy LV of all your characters!",
                        "requirements": [<ComponentModel>{"item": "CraftMat9", "quantity": 125}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 8}],
                        "bonusKey": "LqdCap"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Grind Time",
                        "x1": 9.7,
                        "x2": 0.3,
                        "func": "bigBase",
                        "description": "+{% Class EXP. The go-to active bubble for anyone who wants to reach max level faster and finally start playing the game!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 25}],
                        "bonusKey": "expACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Laaarrrryyyy",
                        "x1": 120,
                        "x2": 100,
                        "func": "decay",
                        "description": "Every time you upgrade an Alchemy bubble, there's a {% chance it'll upgrade 2 times, for no extra cost! Two fer one, getter dun!",
                        "requirements": [<ComponentModel>{"item": "Dementia", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}],
                        "bonusKey": "DoubleBubbleUpg"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Cogs For Hands",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Cog Production speed. Cogs are great. I really really like cogs. I guess you could say I think they're pretty Coggers...",
                        "requirements": [<ComponentModel>{"item": "SnowA2", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "CogMakeSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Sample It",
                        "x1": 12,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% Sample Size when taking samples for the 3d printer. Finally, your statisitcal analysis will be accurate!",
                        "requirements": [<ComponentModel>{"item": "Soul2", "quantity": 15}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "SampleSize"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Big Game Hunter",
                        "x1": 60,
                        "x2": 30,
                        "func": "decay",
                        "description": "Killing a Giant Monster has a {% chance to not decrease the Giant Mob Spawn Odds, which reset at the end of each week.",
                        "requirements": [<ComponentModel>{"item": "Critter3", "quantity": 40}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}],
                        "bonusKey": "GiantsACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Ignore Overdues",
                        "x1": 100,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% Book Checkout speed, all thanks to this one little bubble that librarians do NOT want you to know about!",
                        "requirements": [<ComponentModel>{"item": "Tree7", "quantity": 120}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}],
                        "bonusKey": "booksSpeed"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Yellow Bargain",
                        "x1": 40,
                        "x2": 12,
                        "func": "decay",
                        "description": "The material costs of ALL yellow bubbles are {% lower.",
                        "requirements": [<ComponentModel>{"item": "Critter6", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "BubbleCostYe"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Mr Massacre",
                        "x1": 90,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Multikill per damage tier. Remember, damage tier is shown by the Purple Bar in AFK info, and multikill is bigtime for resources",
                        "requirements": [<ComponentModel>{"item": "Refinery3", "quantity": 8}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "MKtierACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Egg Ink",
                        "x1": 40,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% faster Egg Incubation Time in the Pet Nest. This will be an absolutely VITAL upgrade once you unlock pet egg rarity!",
                        "requirements": [<SpiceComponentModel>{"spiceNo": "0", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}],
                        "bonusKey": "EggInc"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Diamond Chef",
                        "x1": 0.3,
                        "x2": 13,
                        "func": "decayMulti",
                        "description": "{x faster Meal and Fire Kitchen Speeds for every Meal at Lv 11+. This is when the meal plate becomes Diamond Blue, just so you know!",
                        "requirements": [<SpiceComponentModel>{"spiceNo": "6", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}],
                        "bonusKey": "MealSpdz"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Card Champ",
                        "x1": 100,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% Card Drop Chance for all card types, even Party Dungeon cards!",
                        "requirements": [<SpiceComponentModel>{"spiceNo": "9", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "CardDropz"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Petting The Rift",
                        "x1": 15,
                        "x2": 50,
                        "func": "decay",
                        "description": "+{% Shiny Pet Chance for every new Rift level you reach. Go find the Rift Ripper, above the Octodars in World 4.",
                        "requirements": [<ComponentModel>{"item": "Critter10", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "NewPetRift"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Boaty Bubble",
                        "x1": 135,
                        "x2": 70,
                        "func": "decay",
                        "description": "+{% Sailing Speed for all boats",
                        "requirements": [<ComponentModel>{"item": "Bits", "quantity": 5000}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "Y1"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Big P",
                        "x1": 0.5,
                        "x2": 60,
                        "func": "decayMulti",
                        "description": "{x higher bonus than displayed from the Minor Link bonus of the deity you're linked to in Divinity. AKA bigger god passive!",
                        "requirements": [
                            <SailTreasureComponentModel>{"sailTreasureNo": "1", "quantity": 50},
                            <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}
                        ],
                        "bonusKey": "Y2ACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Bit By Bit",
                        "x1": 50,
                        "x2": 70,
                        "func": "decay",
                        "description": "+{% more bits earned in gaming per plant found, as shown in the Log Book found in the top right of the gaming garden!",
                        "requirements": [<ComponentModel>{"item": "Tree10", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "Y3"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Gifts Abound",
                        "x1": 40,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% chance to not use up Divinity points when offering a gift!",
                        "requirements": [<ComponentModel>{"item": "Bug10", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}],
                        "bonusKey": "Y4"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Atom Split",
                        "x1": 14,
                        "x2": 40,
                        "func": "decay",
                        "description": "+{% lower particle cost for upgrading all atoms",
                        "requirements": [<ComponentModel>{"item": "LavaC2", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 6}],
                        "bonusKey": "Y5"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Cropius Mapper",
                        "x1": 5,
                        "x2": 70,
                        "func": "decay",
                        "description": "+{% Crop Evolution chance for EVERY map you unlock in world 6, across all characters! Total bonus: $",
                        "requirements": [<ComponentModel>{"item": "SpiA5", "quantity": 1000}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "Y6"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Essence Boost",
                        "x1": 50,
                        "x2": 60,
                        "func": "decay",
                        "description": "+{% Yellow Essence Gain. This bonus doesn't increase based on anything!",
                        "requirements": [<ComponentModel>{"item": "Bug12", "quantity": 1500}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "Y7"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Hinge Buster",
                        "x1": 100,
                        "x2": 70,
                        "func": "decay",
                        "description": "Your ninja twins do +{% more damage to doors! Knock knock, let 'em in, let 'em in!",
                        "requirements": [<CropComponentModel>{"cropId": "60", "quantity": 120}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 5}],
                        "bonusKey": "Y8"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Ninja Looter",
                        "x1": 0.5,
                        "x2": 60,
                        "func": "decayMulti",
                        "description": "{x Item Find chance for your ninja twin while sneaking!",
                        "requirements": [<SummonComponentModel>{"summonId": "0", "quantity": 1200}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "Y9ACTIVE"
                    },
                    <BubbleModel>{
                        "cauldron": "Kazam Cauldron",
                        "name": "Lo Cost Mo Jade",
                        "x1": 99,
                        "x2": 40,
                        "func": "decay",
                        "description": "The Jade Cost of 'Currency Conduit' scales {% slower, making it cheaper, allowing you to buy it more and get more JADE!",
                        "requirements": [<ComponentModel>{"item": "SpiD1", "quantity": 2500}, <LiquidComponentModel>{"liquidNo": "4", "quantity": 6}],
                        "bonusKey": "Y10"
                    }
                ]
            }),
        new CauldronBase("Vials", <CauldronModel>{
                "bubbles": [
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Copper Corona",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "Orange bubble cauldron brew speed is increased by +{%",
                        "requirements": [<ComponentModel>{"item": "Copper", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "OrangeBrew"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Sippy Splinters",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "Green bubble cauldron brew speed is increased by +{%",
                        "requirements": [<ComponentModel>{"item": "OakTree", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "GreenBrew"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Mushroom Soup",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "Yellow cauldron brew speed is increased by +{%",
                        "requirements": [<ComponentModel>{"item": "Grasslands1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "YellowBrew"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Spool Sprite",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "Purple cauldron brew speed is increased by +{%",
                        "requirements": [<ComponentModel>{"item": "CraftMat1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "PurpleBrew"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Barium Mixture",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Water Droplet max capacity. Thats the 1st liquid type in Alchemy, btw.",
                        "requirements": [<ComponentModel>{"item": "CopperBar", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "Liquid1Cap"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Dieter Drink",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "Monsters drop +{% more money.",
                        "requirements": [<ComponentModel>{"item": "Grasslands3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "MonsterCash"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Skinny 0 Cal",
                        "x1": 2.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% chance to get double points when depositing statues. So like... if you deposit one statue, it might count as one! Or two.",
                        "requirements": [<ComponentModel>{"item": "Jungle2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "StatueDouble"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Thumb Pow",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "When converting Skill EXP into Class EXP using the 'EXP CONVERTER' star talent, you'll get {% more Class EXP than you usually do.",
                        "requirements": [<ComponentModel>{"item": "CraftMat5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "ClassEXPconvert"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Jungle Juice",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% liquid regen rate for all liquid cauldrons. Yes, even the secret one!",
                        "requirements": [<ComponentModel>{"item": "JungleTree", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "LiquidRegen"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Barley Brew",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "Alchemy bubble upgrade costs are {% lower for all bubbles! Even the giraffe bubbles that look strangely like elephants!",
                        "requirements": [<ComponentModel>{"item": "IronBar", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "AlchBubbleCost"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Anearful",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Card drop rate. Even works offline, just like it always has! What do you mean this used to say something different...?",
                        "requirements": [<ComponentModel>{"item": "Forest1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "CardDrop"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Tea With Pea",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Liquid Nitrogen max capacity. Thats the 2nd liquid type in Alchemy, btw.",
                        "requirements": [<ComponentModel>{"item": "ToiletTree", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "Liquid2Cap"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Gold Guzzle",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Shop sell price.",
                        "requirements": [<ComponentModel>{"item": "Gold", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "ShopSell"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Ramificoction",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Talent Points for Tab 1. Shout out to that 1 person who'll make it this far without knowing what talents are, you're my hero!",
                        "requirements": [<ComponentModel>{"item": "Forest3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "Tab1Pts"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Seawater",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% chance for 1 kill to count for 2 when trying to open new portals, but only while actively playing. One, two, buckle my shoe.",
                        "requirements": [<ComponentModel>{"item": "Fish1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "MultiKillPlay"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Tail Time",
                        "x1": 0.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Weapon Power. This is gonna be OP in later worlds I can already tell.",
                        "requirements": [<ComponentModel>{"item": "Sewers2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "WeaponPOW"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Fly In My Drink",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "Eww go get me another one, I can't drink this! ...what, why are you looking at me like that? OH right, uh, this gives +{ base Accuracy.",
                        "requirements": [<ComponentModel>{"item": "Bug1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "baseACC"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Mimicraught",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% EXP from monsters. Sorry, I know this is a lame bonus. Send me an email if you want me change it to +{% NPC dialogue talking speed.",
                        "requirements": [<ComponentModel>{"item": "DesertA2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "MonsterEXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Blue Flav",
                        "x1": 30,
                        "x2": 7,
                        "func": "decay",
                        "description": "-{% material cost for stamps. You know how it's hard to increase stamps max levels? Well this kinda makes that a bit less factual!",
                        "requirements": [<ComponentModel>{"item": "Plat", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "MatCostStamp"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Slug Slurp",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Post Office Box Points for every character, and easily the best bonus in the game. A box will never abandon you!",
                        "requirements": [<ComponentModel>{"item": "Fish2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "BoxPoints"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Pickle Jar",
                        "x1": 50,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Nothing. Absolutely nothing, now and forever. It's a darn pickle, what were you expecting?",
                        "requirements": [<ComponentModel>{"item": "BobJoePickle", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "Nothing"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Fur Refresher",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% higher Shiny Critter chance. This is a multiplier, so +1% from this vial means 1.01x, so 5% shiny chance would go to 5.05%.",
                        "requirements": [<ComponentModel>{"item": "SnowA1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "Shiny1"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Sippy Soul",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Talent Points for Tab 2.",
                        "requirements": [<ComponentModel>{"item": "Soul1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "Tab2Pts"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Crab Juice",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Starting points in Worship Tower Defence. Of course, a true balloon monkey wouldn't accept handouts like this.",
                        "requirements": [<ComponentModel>{"item": "Critter2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "TDpts"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Void Vial",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Mining Efficiency.",
                        "requirements": [<ComponentModel>{"item": "Void", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "MinEff"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Red Malt",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Refinery Cycle Speed. I just want to see you squirm a bit more as you decide where to spend your precious salts hahahaha!!",
                        "requirements": [<ComponentModel>{"item": "Refinery1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "RefSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Ew Gross Gross",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Catching Efficiency.",
                        "requirements": [<ComponentModel>{"item": "Bug5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "CatchEff"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "The Spanish Sahara",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Choppin Efficiency.",
                        "requirements": [<ComponentModel>{"item": "SaharanFoal", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "ChopEff"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Poison Tincture",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "Eagle Eye Trap-O-Vision gives +{% more critters.",
                        "requirements": [<ComponentModel>{"item": "Critter1A", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "TrapOvision"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Etruscan Lager",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Fishing Efficiency.",
                        "requirements": [<ComponentModel>{"item": "SnowB2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "FishEff"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Chonker Chug",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Talent Book Library checkout speed.",
                        "requirements": [<ComponentModel>{"item": "Soul2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}],
                        "bonusKey": "TalBookSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Bubonic Burp",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Cog Inventory spaces. DONT PANIC!!! I KNOW ITS ALARMING THAT A VIAL FINALLY GIVES A USEFUL BONUS, BUT STAY CALM!",
                        "requirements": [<ComponentModel>{"item": "Critter4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "CogInv"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Visible Ink",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Construction Exp gain.",
                        "requirements": [<ComponentModel>{"item": "SnowB3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "ConsExp"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Orange Malt",
                        "x1": 5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% higher Shiny Critter chance. This stacks with the shiny chance from the Fur Refresher vial. You see, they have the same shaped vial.",
                        "requirements": [<ComponentModel>{"item": "Refinery2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "Shiny2"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Snow Slurry",
                        "x1": 0.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Printer sample size. My my there are a lot of these 'sample size' bonuses in the game... too many...",
                        "requirements": [<ComponentModel>{"item": "SnowB5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "SampleSize"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Slowergy Drink",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Base Multikill per Multikill Tier for all worlds. Stack them skulls!",
                        "requirements": [<ComponentModel>{"item": "Soul4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "Overkill"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Sippy Cup",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Cog production speed.",
                        "requirements": [<ComponentModel>{"item": "SnowC1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "CogSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Bunny Brew",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Talent Points for Tab 3.",
                        "requirements": [<ComponentModel>{"item": "Critter7", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "Tab3Pts"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "40-40 Purity",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Trench Seawater max capacity. Thats the 3rd liquid type in Alchemy, btw.",
                        "requirements": [<ComponentModel>{"item": "SnowC4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "Liquid3Cap"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Shaved Ice",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% base Giant Monster spawn rate.",
                        "requirements": [<ComponentModel>{"item": "Refinery5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "GiantMob"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Goosey Glug",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ base critter per trap. This is a sHONKingly good bonus, the aren't many others of its kind!",
                        "requirements": [<ComponentModel>{"item": "Critter9", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "CritterBASED"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Ball Pickle Jar",
                        "x1": 25,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% arcade ball gain rate, and those are balls blessed by Balljoepickle himself, so you know they're extra lucky!",
                        "requirements": [<ComponentModel>{"item": "BallJoePickle", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}],
                        "bonusKey": "arcadeBALLZ"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Capachino",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Breeding EXP gain",
                        "requirements": [<ComponentModel>{"item": "GalaxyA1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "BreedXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Donut Drink",
                        "x1": 5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Chance to breed a new pet. Multiplicative, so +5% here would change a 1 in 100 to 1 in 95 chance.",
                        "requirements": [<ComponentModel>{"item": "GalaxyA3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "NewPet"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Long Island Tea",
                        "x1": 6,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Meal Cooking Speed",
                        "requirements": [<ComponentModel>{"item": "Fish6", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "MealCook"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Spook Pint",
                        "x1": 5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% New Recipe Cooking Speed",
                        "requirements": [<ComponentModel>{"item": "Soul5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "RecCook"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Calcium Carbonate",
                        "x1": 11,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Starting Worship Pts.",
                        "requirements": [<ComponentModel>{"item": "GalaxyB3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "TDpts"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Bloat Draft",
                        "x1": 3,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Lab EXP gain. Strange, you'd think someone dumb enough to drink a bloated blobfish drink wouldn't get bonus lab exp at all...",
                        "requirements": [<ComponentModel>{"item": "Critter10", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "LabXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Choco Milkshake",
                        "x1": 50,
                        "x2": 7,
                        "func": "decay",
                        "description": "-{% Kitchen Upgrading Cost.",
                        "requirements": [<ComponentModel>{"item": "GalaxyB4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "Kcosts"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Pearl Seltzer",
                        "x1": 0.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% All Stats. If you don't know what all stats means by now, you've prolly got bigger problems than not knowing what all stats means.",
                        "requirements": [<ComponentModel>{"item": "GalaxyC1b", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "AllStatPCT"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Krakenade",
                        "x1": 1,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Weapon Power. Unleash the kraken...",
                        "requirements": [<ComponentModel>{"item": "Fish8", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "WeaponPOW"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Electrolyte",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Pet Team Damage",
                        "requirements": [<ComponentModel>{"item": "GalaxyC4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "PetDmg"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Ash Agua",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{ Talent Points for Tab 4",
                        "requirements": [<ComponentModel>{"item": "LavaA1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "Tab4Pts"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Maple Syrup",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Divinity EXP. Maple syrup helps you keep calm and meditate with the divine... No wonder those Canadians are so nice!",
                        "requirements": [<ComponentModel>{"item": "Tree9", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "DivXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Hampter Drippy",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Sailing EXP gain. Doesn't help level up captains, only yourself. So yea, I'm basically saying you're a crappy captain lol",
                        "requirements": [<ComponentModel>{"item": "LavaA5b", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "SailXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Dreadnog",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Cooking Speed for meals. No, MEALS, not meel, dont cook him!! Stop!! STOP!!!!",
                        "requirements": [<ComponentModel>{"item": "DreadloBar", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "MealCook"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Dusted Drink",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Gaming EXP. Cool.",
                        "requirements": [<ComponentModel>{"item": "Bug10", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "GameXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Oj Jooce",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Sailing Speed. If only there was a way to also lower the minimum sailing time... I'm sure you'll find it eventually...",
                        "requirements": [<ComponentModel>{"item": "LavaB3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "SailSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Oozie Ooblek",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Bits gained in Gaming. Cool.",
                        "requirements": [<ComponentModel>{"item": "Soul6", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "GameBits"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Venison Malt",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "-{% material cost for stamps. Have at it endgamers!",
                        "requirements": [<ComponentModel>{"item": "LavaC2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "MatCostStamp"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Marble Mocha",
                        "x1": 5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Faster Equinox Bar Fill Rate",
                        "requirements": [<ComponentModel>{"item": "Marble", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "EqBar"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Willow Sippy",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Faster Sigil Charge Rate",
                        "requirements": [<ComponentModel>{"item": "Tree11", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "SigSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Shinyfin Stew",
                        "x1": 7,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Construction Build Rate, so you can hit all those boosted max levels you keep unlocking",
                        "requirements": [<ComponentModel>{"item": "Fish13", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "Contspd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Dreamy Drink",
                        "x1": 3.5,
                        "x2": 0,
                        "func": "add",
                        "description": "Shrines charge +{% faster, so this way they charge faster, compared to like if bonus this wasn't oven you of out hot eat the food.",
                        "requirements": [<ComponentModel>{"item": "Bug11", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}],
                        "bonusKey": "ShrineSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Ricecakorade",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Farming Speed, so the plants grow faster. Makes sense, plants do get energy from the dumbest things...",
                        "requirements": [<ComponentModel>{"item": "SpiA2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6FarmSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Ladybug Serum",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% White Essence gain, and before you make an angry rant, male ladybugs were also used to flavor this vial!",
                        "requirements": [<ComponentModel>{"item": "Bug12", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6WhiteEss"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Flavorgil",
                        "x1": 7,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Farming Crop Evolution chance. I guess like, the fishbits mutate with the crops? Idk I'm not a planterman.",
                        "requirements": [<ComponentModel>{"item": "Fish12", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6FarmEvo"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Greenleaf Tea",
                        "x1": 1.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Ninja Untying rate. I wonder if bomb diffusers drink tea before going to work?",
                        "requirements": [<ComponentModel>{"item": "SpiB1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6Untie"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Firefly Grog",
                        "x1": 5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Cooking Speed, but multiplicative so it stacks big time with the other 892,314 cooking bonuses you have!",
                        "requirements": [<ComponentModel>{"item": "Bug13", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6CookSpd"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Dabar Special",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Total Skill efficiency, but not multiplicative so that it drowns in the sea of bonuses you already have.",
                        "requirements": [<ComponentModel>{"item": "GodshardBar", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6SkillEff"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Refreshment",
                        "x1": 2,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Sneaking EXP gain. Something about it makes you feel light on your feet, as if u just wanna fly...",
                        "requirements": [<ComponentModel>{"item": "Soul7", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6SneakEXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Gibbed Drink",
                        "x1": 3.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Summoning EXP gain. No, the horn doesn't contribute to the flavor, just the fleshy bits inside.",
                        "requirements": [<ComponentModel>{"item": "SpiC2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6SummEXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Ded Sap",
                        "x1": 3.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Farming EXP gain, but dont drink too much since Eucalyptus oil is toxic IRL no joke fr fr search it or just take my word.",
                        "requirements": [<ComponentModel>{"item": "Tree13", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6FarmEXP"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Royale Cola",
                        "x1": 3.5,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Jade Gain in Sneaking. Congratulations btw on trekking through World 6 like that what a journey!",
                        "requirements": [<ComponentModel>{"item": "SpiD3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6Jade"
                    },
                    <BubbleModel>{
                        "cauldron": "Vials",
                        "name": "Turtle Tisane",
                        "x1": 4,
                        "x2": 0,
                        "func": "add",
                        "description": "+{% Artifact find chance, Sigil SPD, Cooking SPD, and Construction Build rate. All MULTIPLICATIVE! A very special vial indeed...",
                        "requirements": [<ComponentModel>{"item": "Critter11", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "4", "quantity": -1}],
                        "bonusKey": "6turtle"
                    }
                ]
            }),
        new CauldronBase("Liquid Shop", <CauldronModel>{
                "bubbles": [
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Mediocre Obols",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "1 random low-quality Obol. Sure, it'll probably be a crappy bronze Obol, but that's not bad considering youre paying with water!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 10}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Distilled Water",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "This distilled water was double-purified by running it through thousands of diamonds! So yea, it's just regular water, but more expensive.",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 1}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "One Measly Gem",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "1 Gem. Perfect for buying things in the Gem Shop! Sponsored by LavaFlame2's Gem Shop!'",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 5}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Star Book",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "Gives you a Star-Book! It's always the same one, but it comes with a random Max Lv, so keep buying it until you get one with a 100 Lv Max!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 50}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Exp Balloon",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "A small exp balloon. They give you exp in whatever skill you're currently training! Using them in town will give EXP in the town skill!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 15}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Small Donation",
                        "x1": 1,
                        "x2": 0,
                        "func": "1",
                        "description": "Your donation helps starving orphan monsters. They asked for food, but beggars can't be choosers! You wont get anything for doing this.",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 1}],
                        "bonusKey": "0"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Decent Obols",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "1 random low-quality Obol, except this time the 'low' was rated by someone with higher standards, so it's more like medium quality!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 20}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Talent Point",
                        "x1": 1,
                        "x2": 1,
                        "func": "1",
                        "description": "Gives a redeemable talent point for the 2nd Talent Tab. Applies to all characters. Also, this item's cost will never reset, never ever ever!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 3}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 1}],
                        "bonusKey": "0"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Grand Obols",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "1 random Obol. It could be a super rare gold obol, but it's most likely gonna be a bronze obol.",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "2", "quantity": 5}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Bargain Tag",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "Lowers the cost of the next bubble you upgrade by 25%! Can stack multiple times, but max is 90% off.",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "2", "quantity": 1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 1}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Dense Water",
                        "x1": 1,
                        "x2": 1,
                        "func": "0",
                        "description": "Sourced from the bottom of the Great Trench, dont drink this or you'll become dummy thicc or whatever!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 1}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "A Pair Of Gems",
                        "x1": 1,
                        "x2": 2,
                        "func": "0",
                        "description": "2 Gems. Thats two steps closer to buying everything in Gem Shop! Sure are a lot of steps for that one though...",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 5}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Empty Space",
                        "x1": 1,
                        "x2": 0,
                        "func": "0",
                        "description": "There's nothing here buddy, but that ain't gon stop me from selling it to ya!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 1}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Empty Space",
                        "x1": 1,
                        "x2": 0,
                        "func": "0",
                        "description": "This is EXTRA rare nothing, sure ain't going for cheap!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 10}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Empty Space",
                        "x1": 1,
                        "x2": 0,
                        "func": "0",
                        "description": "There's nothing here buddy, but that ain't gon stop me from selling it to ya!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 1}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Empty Space",
                        "x1": 1,
                        "x2": 0,
                        "func": "0",
                        "description": "There's nothing here buddy, but that ain't gon stop me from selling it to ya!",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 1}],
                        "bonusKey": "1"
                    },
                    <BubbleModel>{
                        "cauldron": "Liquid Shop",
                        "name": "Talent Point",
                        "x1": 1,
                        "x2": 1,
                        "func": "1",
                        "description": "Gives a redeemable talent point for the 3rd Talent Tab. Applies to all characters. This item's cost will reset every 50,000,000 years.",
                        "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 3}],
                        "bonusKey": "0"
                    }
                ]
            })    
]
}
