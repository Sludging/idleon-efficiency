import { BubbleModel } from '../model/bubbleModel';
import { ComponentModel } from '../model/componentModel';
import { LiquidComponentModel } from '../model/liquidComponentModel';
import { SpiceComponentModel } from '../model/spiceComponentModel';

export class BubbleBase { constructor(public id: string, public data: BubbleModel) { } }



export const initBubbleRepo = () => {
    return [    
        new BubbleBase("Roid Ragin", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Total STR. 'Total' here means that, for example, a +10% STR bonus from something else wouldn't affect this bonus.",
                "requirements": [<ComponentModel>{"item": "OakTree", "quantity": 25}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}]
            }),
        new BubbleBase("Warriors Rule", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 2,
                "x2": 50,
                "func": "decayMulti",
                "description": "All Orange Passive Bubbles, which are the smaller sized ones, give a {x higher bonus to your warrior-based classes.",
                "requirements": [
                    <ComponentModel>{"item": "Grasslands1", "quantity": 20},
                    <ComponentModel>{"item": "CraftMat1", "quantity": 3},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Hearty Diggy", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "description": "+{% mining efficiency per power of 10 max HP that your character has. The perfect bonus for miners with infinite HP!",
                "requirements": [
                    <ComponentModel>{"item": "JungleTree", "quantity": 40},
                    <ComponentModel>{"item": "CopperBar", "quantity": 18},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Wyoming Blood", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 23.5,
                "x2": 1.5,
                "func": "bigBase",
                "description": "Multi-Ore mining chance is increased by +{%, and your max Multi-Ore chance is 300% instead of 100%.",
                "requirements": [
                    <ComponentModel>{"item": "Bug1", "quantity": 30},
                    <ComponentModel>{"item": "Forest1", "quantity": 50},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}
                ]
            }),
        new BubbleBase("Reely Smart", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 100,
                "x2": 80,
                "func": "decay",
                "description": "+{% Mining and Fishing EXP gain. Y'know what, I'll even DOUBLE that bonus for whichever skill has the lower level!",
                "requirements": [
                    <ComponentModel>{"item": "CraftMat6", "quantity": 25},
                    <ComponentModel>{"item": "DesertA3", "quantity": 40},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}
                ]
            }),
        new BubbleBase("Big Meaty Claws", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 1,
                "x2": 0.02,
                "func": "add",
                "description": "Increases base damage by +$. This bonus increases based on how much Max HP you have above 250.",
                "requirements": [
                    <ComponentModel>{"item": "BirchTree", "quantity": 200},
                    <ComponentModel>{"item": "DesertB2", "quantity": 75},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}
                ]
            }),
        new BubbleBase("Sploosh Sploosh", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 23.5,
                "x2": 1.5,
                "func": "bigBase",
                "description": "Multi-Fish fishing chance is increased by +{%, and your max Multi-Fish chance is 300% instead of 100%.",
                "requirements": [<ComponentModel>{"item": "Fish2", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}]
            }),
        new BubbleBase("Stronk Tools", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 65,
                "x2": 70,
                "func": "decay",
                "description": "The following tools give +{% more skilling Power than normal: $",
                "requirements": [
                    <ComponentModel>{"item": "Plat", "quantity": 60},
                    <ComponentModel>{"item": "Grasslands2", "quantity": 200},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}
                ]
            }),
        new BubbleBase("Fmj", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 0.5,
                "x2": 0,
                "func": "add",
                "description": "+{% more defence from Equipment. Also, +1 base Def per Class LV, up to +{.",
                "requirements": [
                    <ComponentModel>{"item": "Bug4", "quantity": 50},
                    <ComponentModel>{"item": "DesertC2", "quantity": 140},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 5},
                    <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}
                ]
            }),
        new BubbleBase("Bappity Boopity", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 35,
                "x2": 100,
                "func": "decay",
                "description": "+{% critical Damage. Badabing, badaboom! Or in Italian, Babadabinga, babadaboomahh!",
                "requirements": [
                    <ComponentModel>{"item": "CraftMat8", "quantity": 100},
                    <ComponentModel>{"item": "JungleTree", "quantity": 700},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 5},
                    <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}
                ]
            }),
        new BubbleBase("Brittley Spears", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 40,
                "x2": 50,
                "func": "decay",
                "description": "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.",
                "requirements": [<ComponentModel>{"item": "Critter1", "quantity": 10}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Call Me Bob", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 25,
                "x2": 2.5,
                "func": "bigBase",
                "description": "+{% Construction EXP Gain. Also gives +50% Bug-Fixing speed if your username is LavaFlame2. Actually, better make that +500%...",
                "requirements": [<ComponentModel>{"item": "SnowA3", "quantity": 120}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Carpenter", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 2,
                "x2": 50,
                "func": "decay",
                "description": "+{% Build Speed per Construction Level.",
                "requirements": [<ComponentModel>{"item": "Refinery2", "quantity": 3}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}]
            }),
        new BubbleBase("Buff Boi Talent", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 5,
                "x2": 1,
                "func": "bigBase",
                "description": "+{ Talent Points for EACH tab! Yea, it's amazing right? But it's just for warriors, don't tell the other classes!!",
                "requirements": [<ComponentModel>{"item": "Critter4", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}]
            }),
        new BubbleBase("Orange Bargain", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 40,
                "x2": 12,
                "func": "decay",
                "description": "The material costs of ALL orange bubbles are {% lower",
                "requirements": [<ComponentModel>{"item": "Soul4", "quantity": 30}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Penny Of Strength", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 18,
                "x2": 30,
                "func": "decay",
                "description": "+{% Cash from Monsters for every 250 STR. The pennies reflect your strength in themselves, thus making them more valuable!",
                "requirements": [<ComponentModel>{"item": "Fish5", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}]
            }),
        new BubbleBase("Multorange", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 1.4,
                "x2": 30,
                "func": "decayMulti",
                "description": "The following orange bubbles give {x higher bonus than what they display: I, III, IV, VI, XII",
                "requirements": [<ComponentModel>{"item": "GalaxyA3", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}]
            }),
        new BubbleBase("Dream Of Ironfish", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 12,
                "x2": 30,
                "func": "decay",
                "description": "+{% Mining and Fishing AFK GAINS rate. Wow, how bias can you get... giving the warrior's bubble TWO afk gain bonuses.",
                "requirements": [<ComponentModel>{"item": "CraftMat13", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}]
            }),
        new BubbleBase("Shimmeron", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 80,
                "x2": 40,
                "func": "decay",
                "description": "+{% Gold Food Effect. Go on, its ok, I won't be offended. No seriously, go upgrade something else, I know I'm not a good upgrade...",
                "requirements": [<ComponentModel>{"item": "CraftMat14", "quantity": 300}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}]
            }),
        new BubbleBase("Bite But Not Chew", <BubbleModel>{
                "cauldron": "Power Cauldron",
                "x1": 50,
                "x2": 40,
                "func": "decay",
                "description": "+{% Food Non-Consume chance. Also, if your capped Non-Consume chance happens to be 98%, this changes it to 99%!",
                "requirements": [<ComponentModel>{"item": "GalaxyC4", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}]
            }),
        new BubbleBase("Swift Steppin", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Total AGI. Probably the lamest of the five stats... err, I mean four, hehe.",
                "requirements": [<ComponentModel>{"item": "Copper", "quantity": 15}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}]
            }),
        new BubbleBase("Archer Or Bust", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 2,
                "x2": 50,
                "func": "decayMulti",
                "description": "All Green Passive Bonuses, which are the smaller sized ones, give {x more bonuses to your archer-based characters.",
                "requirements": [
                    <ComponentModel>{"item": "Grasslands1", "quantity": 20},
                    <ComponentModel>{"item": "BirchTree", "quantity": 30},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Hammer Hammer", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 23,
                "x2": 2,
                "func": "bigBase",
                "description": "You can now produce +1 more items at once in the anvil, and your production speed is increased by {%.",
                "requirements": [
                    <ComponentModel>{"item": "Iron", "quantity": 30},
                    <ComponentModel>{"item": "Grasslands3", "quantity": 30},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Lil Big Damage", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 20,
                "x2": 100,
                "func": "decay",
                "description": "+{% Mastery. Mastery is your stat that boosts minimum damage. Just like in Maplest... err, just like how I thought it up myself!",
                "requirements": [
                    <ComponentModel>{"item": "Fish1", "quantity": 25},
                    <ComponentModel>{"item": "Jungle3", "quantity": 40},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}
                ]
            }),
        new BubbleBase("Anvilnomics", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "description": "Costs for buying Anvil Production Points is reduced by {%. This is just like a tax cut, so remember me as a hero!",
                "requirements": [
                    <ComponentModel>{"item": "ForestTree", "quantity": 50},
                    <ComponentModel>{"item": "Gold", "quantity": 40},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}
                ]
            }),
        new BubbleBase("Quick Slap", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 1,
                "x2": 0.02,
                "func": "add",
                "description": "Increases base damage by +$. This bonus increases based on how much Movement Speed you have above 110%.",
                "requirements": [
                    <ComponentModel>{"item": "DesertB1", "quantity": 90},
                    <ComponentModel>{"item": "CraftMat6", "quantity": 200},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}
                ]
            }),
        new BubbleBase("Sanic Tools", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 65,
                "x2": 70,
                "func": "decay",
                "description": "The following tools give +{% more skilling Power than normal: $",
                "requirements": [
                    <ComponentModel>{"item": "Jungle1", "quantity": 130},
                    <ComponentModel>{"item": "GoldBar", "quantity": 6},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}
                ]
            }),
        new BubbleBase("Bug]", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 23.5,
                "x2": 1.5,
                "func": "bigBase",
                "description": "Multi-Bug catching chance is increased by +{%, and your max Multi-Bug chance is 300% instead of 100%.",
                "requirements": [<ComponentModel>{"item": "Bug3", "quantity": 70}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}]
            }),
        new BubbleBase("Shaquracy", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "Your secondary stat (WIS for warrior, STR for archer, AGI for mage) gives +{% more Accuracy than normal.",
                "requirements": [
                    <ComponentModel>{"item": "Fish4", "quantity": 65},
                    <ComponentModel>{"item": "PalmTree", "quantity": 250},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 5},
                    <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}
                ]
            }),
        new BubbleBase("Cheap Shot", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 7,
                "x2": 100,
                "func": "decay",
                "description": "+{% critical Chance, as it increases the chance for your attack to hit the monster's privates, and for the monster to be male.",
                "requirements": [
                    <ComponentModel>{"item": "Bug5", "quantity": 35},
                    <ComponentModel>{"item": "DesertC3", "quantity": 150},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 5},
                    <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}
                ]
            }),
        new BubbleBase("Bow Jack", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 40,
                "x2": 50,
                "func": "decay",
                "description": "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.",
                "requirements": [<ComponentModel>{"item": "Soul1", "quantity": 5}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Call Me Ash", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 25,
                "x2": 2,
                "func": "bigBase",
                "description": "+1 Placeable Trap, and +{% Trapping Efficiency.",
                "requirements": [<ComponentModel>{"item": "SaharanFoal", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Cuz I Catch Em All", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 3,
                "x2": 100,
                "func": "decayMulti",
                "description": "{x more likely to catch shiny critters when opening a trap.",
                "requirements": [<ComponentModel>{"item": "Soul3", "quantity": 25}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}]
            }),
        new BubbleBase("Fast Boi Talent", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 5,
                "x2": 1,
                "func": "bigBase",
                "description": "+{ Talent Points for EACH tab, but just for Archers! Well, and 'that' class, you know who you are!",
                "requirements": [<ComponentModel>{"item": "Bug6", "quantity": 120}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}]
            }),
        new BubbleBase("Green Bargain", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 40,
                "x2": 12,
                "func": "decay",
                "description": "The material costs of ALL green bubbles are {% lower",
                "requirements": [<ComponentModel>{"item": "Critter5", "quantity": 200}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Dollar Of Agility", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 18,
                "x2": 30,
                "func": "decay",
                "description": "+{% Cash from Monsters for every 250 AGI. The extra agility allows the dollars to stretch in size and increase in value!",
                "requirements": [<ComponentModel>{"item": "CraftMat11", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}]
            }),
        new BubbleBase("Premigreen", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 1.4,
                "x2": 30,
                "func": "decayMulti",
                "description": "The following green bubbles give {x higher bonus than what they display: I, VI, VIII, X, XII",
                "requirements": [<ComponentModel>{"item": "Critter8", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}]
            }),
        new BubbleBase("Fly In Mind", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 12,
                "x2": 40,
                "func": "decay",
                "description": "+{% Catching AFK Gains Rate. Now you too can dream about bugs in your sleep, just like I do all the time!!!!",
                "requirements": [<ComponentModel>{"item": "Bug7", "quantity": 350}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}]
            }),
        new BubbleBase("Kill Per Kill", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 70,
                "x2": 40,
                "func": "decay",
                "description": "+{% extra Kills for Deathnote and opening portals to new maps. Shoutout to my I.S. players who fondly remember 'Kill Per Kill'!",
                "requirements": [<ComponentModel>{"item": "Refinery4", "quantity": 6}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}]
            }),
        new BubbleBase("Afk Expexp", <BubbleModel>{
                "cauldron": "Quicc Cauldron",
                "x1": 40,
                "x2": 40,
                "func": "decay",
                "description": "+{% chance for Double EXP when claiming AFK gains. You'll know this happens because it literally tells you it happened!",
                "requirements": [<ComponentModel>{"item": "Bug8", "quantity": 300}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}]
            }),
        new BubbleBase("Stable Jenius", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Total WIS. Honesty the greatest bonus in any Idle Game, believe me. Absolutely incredible, everyone says so!",
                "requirements": [<ComponentModel>{"item": "CraftMat1", "quantity": 10}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}]
            }),
        new BubbleBase("Mage Is Best", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 2,
                "x2": 50,
                "func": "decayMulti",
                "description": "All Purple Passive Bonuses, which are the smaller sized ones, give {x more bonuses to your mage-based characters.",
                "requirements": [
                    <ComponentModel>{"item": "Grasslands1", "quantity": 25},
                    <ComponentModel>{"item": "CopperBar", "quantity": 13},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Hocus Choppus", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "description": "+{% choppin efficiency per power of 10 max MP that your character has. Super diaper! Err, duper.",
                "requirements": [
                    <ComponentModel>{"item": "CraftMat5", "quantity": 22},
                    <ComponentModel>{"item": "ForestTree", "quantity": 40},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Molto Loggo", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 23.5,
                "x2": 1.5,
                "func": "bigBase",
                "description": "Multi-Log chop chance is increased by +{%, and your max Multi-Log chance is now 300% instead of 100%.",
                "requirements": [
                    <ComponentModel>{"item": "IronBar", "quantity": 21},
                    <ComponentModel>{"item": "DesertA2", "quantity": 30},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}
                ]
            }),
        new BubbleBase("Noodubble", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 100,
                "x2": 60,
                "func": "decay",
                "description": "+{% Choppin' and Alchemy EXP gain. Y'know what, I'll even... actually, never mind.",
                "requirements": [
                    <ComponentModel>{"item": "CraftMat7", "quantity": 20},
                    <ComponentModel>{"item": "Fish2", "quantity": 30},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}
                ]
            }),
        new BubbleBase("Name I Guess", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 1,
                "x2": 0.02,
                "func": "add",
                "description": "Increases base damage by +$. This bonus increases based on how much Max MP you have above 150.",
                "requirements": [
                    <ComponentModel>{"item": "Jungle2", "quantity": 110},
                    <ComponentModel>{"item": "Gold", "quantity": 40},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}
                ]
            }),
        new BubbleBase("Le Brain Tools", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 65,
                "x2": 70,
                "func": "decay",
                "description": "The following tools give +{% more skilling Power than normal: $",
                "requirements": [
                    <ComponentModel>{"item": "BirchTree", "quantity": 250},
                    <ComponentModel>{"item": "Bug3", "quantity": 55},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}
                ]
            }),
        new BubbleBase("Cookin Roadkill", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 120,
                "x2": 70,
                "func": "decay",
                "description": "Cranium Cooking lasts {% longer, gives {% more progress per kill, and has a {% lower cooldown. Also +{% Alchemy EXP!",
                "requirements": [<ComponentModel>{"item": "ToiletTree", "quantity": 75}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}]
            }),
        new BubbleBase("Brewstachio", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "description": "+{% Brew Speed. This a multiplicative bonus, which means its ultra powerful, all the time! Even on Mondays, the worst day!",
                "requirements": [
                    <ComponentModel>{"item": "DesertC1", "quantity": 150},
                    <ComponentModel>{"item": "Fish4", "quantity": 50},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 5},
                    <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}
                ]
            }),
        new BubbleBase("All For Kill", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "description": "Attack Talents give +{% higher bonuses to Offline Gains than they normally do. So you might as well just AFK forever, bye!",
                "requirements": [
                    <ComponentModel>{"item": "StumpTree", "quantity": 100},
                    <ComponentModel>{"item": "PlatBar", "quantity": 5},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 5},
                    <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}
                ]
            }),
        new BubbleBase("Matty Stafford", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 40,
                "x2": 50,
                "func": "decay",
                "description": "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.",
                "requirements": [<ComponentModel>{"item": "Refinery1", "quantity": 3}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Call Me Pope", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 2.4,
                "x2": 70,
                "func": "decayMulti",
                "description": "{x Worship Charge rate per hour. Also, {x Max Worship Charge! You bouta go super with all that charge... just sayin'",
                "requirements": [<ComponentModel>{"item": "Critter2", "quantity": 25}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Gospel Leader", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 60,
                "x2": 30,
                "func": "decay",
                "description": "+{% Max Charge per 10 Worship levels. I guess you could say this upgrade doesn't come Free of Charge!",
                "requirements": [<ComponentModel>{"item": "Bug5", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}]
            }),
        new BubbleBase("Smart Boi Talent", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 5,
                "x2": 1,
                "func": "bigBase",
                "description": "Sorry, mages don't get anything because you're lame.... Ok fine, you can have +{ Talent Points for each tab, but I'm not happy about it.",
                "requirements": [<ComponentModel>{"item": "SnowC1", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}]
            }),
        new BubbleBase("Purple Bargain", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 40,
                "x2": 12,
                "func": "decay",
                "description": "The material costs of ALL purple bubbles are {% lower",
                "requirements": [<ComponentModel>{"item": "Soul1", "quantity": 500}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Nickel Of Wisdom", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 18,
                "x2": 30,
                "func": "decay",
                "description": "+{% Cash from Monsters for every 250 WIS. Wisdom allows the nickel to trick others into thinking its a Dime, increasing its value!",
                "requirements": [<ComponentModel>{"item": "AlienTree", "quantity": 150}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}]
            }),
        new BubbleBase("Severapurple", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 1.4,
                "x2": 30,
                "func": "decayMulti",
                "description": "The following purple bubbles give {x higher bonus than what they display: I, III, VI, X, XII",
                "requirements": [<ComponentModel>{"item": "Void", "quantity": 175}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}]
            }),
        new BubbleBase("Tree Sleeper", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 12,
                "x2": 40,
                "func": "decay",
                "description": "+{% Choppin' AFK Gains Rate. Ain't nothin' like sittin' down at the ol' tree and havin' a snooze n' a sleep!",
                "requirements": [<ComponentModel>{"item": "Soul5", "quantity": 60}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}]
            }),
        new BubbleBase("Hyperswift", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 30,
                "x2": 30,
                "func": "decay",
                "description": "+{% Basic Attack Speed. Just like all other Basic Attack Speed bonuses, this boosts AFK kills/hr if you do enough dmg!",
                "requirements": [<ComponentModel>{"item": "Fish7", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}]
            }),
        new BubbleBase("Matrix Evolved", <BubbleModel>{
                "cauldron": "High-IQ Cauldron",
                "x1": 60,
                "x2": 40,
                "func": "decay",
                "description": "+{% Lab EXP Gain. Also +{% ineptitude to face the reality of what's REALLY going on behind the scenes...",
                "requirements": [<ComponentModel>{"item": "Tree8", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}]
            }),
        new BubbleBase("Lotto Skills", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ LUK. Also, this will increase your chances of winning the lottery in real life from 0.0% to 0.000%! I'm not even joking, it's true!!",
                "requirements": [
                    <ComponentModel>{"item": "Copper", "quantity": 11},
                    <ComponentModel>{"item": "OakTree", "quantity": 15},
                    <ComponentModel>{"item": "CraftMat1", "quantity": 8},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Droppin Loads", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 40,
                "x2": 70,
                "func": "decay",
                "description": "+{% Drop Rate. Thanks to this upgrade, you can get even MORE angry when you keep not getting that rare pet drop from the boss!",
                "requirements": [
                    <ComponentModel>{"item": "Fish1", "quantity": 20},
                    <ComponentModel>{"item": "Bug1", "quantity": 30},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Startue Exp", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 25,
                "x2": 60,
                "func": "decay",
                "description": "Leveling up a statue resets it's exp bar down to {%, instead of 0%. Staturrific! Yea... the jokes are only gonna go downhill from here lol",
                "requirements": [
                    <ComponentModel>{"item": "DesertA1", "quantity": 30},
                    <ComponentModel>{"item": "Forest2", "quantity": 40},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Level Up Gift", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 100,
                "x2": 30,
                "func": "decay",
                "description": "Whenever you level up anything, {% chance to drop a gift! It could be an EXP balloon, a Gem for the gem shop, or something crazy weird!",
                "requirements": [
                    <ComponentModel>{"item": "Iron", "quantity": 35},
                    <ComponentModel>{"item": "JungleTree", "quantity": 70},
                    <ComponentModel>{"item": "CraftMat5", "quantity": 30},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 2}
                ]
            }),
        new BubbleBase("Prowesessary", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 1.5,
                "x2": 60,
                "func": "decayMulti",
                "description": "The Prowess Bonus for every skill is multiplied by {. Prowess lowers the Efficiency needed to get multiple QTY per drop from resources.",
                "requirements": [
                    <ComponentModel>{"item": "GoldBar", "quantity": 25},
                    <ComponentModel>{"item": "ToiletTree", "quantity": 50},
                    <LiquidComponentModel>{"liquidNo": "1", "quantity": 3}
                ]
            }),
        new BubbleBase("Stamp Tramp", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "Increases the Max Lv of the 'Toilet Paper Postage' Talent to {. You can unlock this talent by typing 'More like Poopy Pete' near Pete.",
                "requirements": [<ComponentModel>{"item": "Bug2", "quantity": 65}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 4}]
            }),
        new BubbleBase("Undeveloped Costs", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 40,
                "x2": 70,
                "func": "decay",
                "description": "Reduces the material costs of all Alchemy Bubbles by {%. They are just bubbles though, how much could they even cost? 10 dollars?",
                "requirements": [<ComponentModel>{"item": "Fish3", "quantity": 75}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 6}]
            }),
        new BubbleBase("Da Daily Drip", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "description": "Increases the Max Cap for every liquid by +$. This bonus increases based on the combined Alchemy LV of all your characters!",
                "requirements": [<ComponentModel>{"item": "CraftMat9", "quantity": 125}, <LiquidComponentModel>{"liquidNo": "1", "quantity": 8}]
            }),
        new BubbleBase("Grind Time", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 9.7,
                "x2": 0.3,
                "func": "bigBase",
                "description": "+{% Class EXP. The go-to active bubble for anyone who wants to reach max level faster and finally start playing the game!",
                "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 25}]
            }),
        new BubbleBase("Laaarrrryyyy", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 120,
                "x2": 100,
                "func": "decay",
                "description": "Every time you upgrade an Alchemy bubble, there's a {% chance it'll upgrade 2 times, for no extra cost! Two fer one, getter dun!",
                "requirements": [
                    <ComponentModel>{"item": "Dementia", "quantity": 50},
                    <ComponentModel>{"item": "DesertC4", "quantity": 130},
                    <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}
                ]
            }),
        new BubbleBase("Cogs For Hands", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 4,
                "x2": 0,
                "func": "add",
                "description": "+{% Cog Production speed. Cogs are great. I really really like cogs. I guess you could say I think they're pretty Coggers...",
                "requirements": [<ComponentModel>{"item": "SnowA2", "quantity": 50}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Sample It", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 12,
                "x2": 40,
                "func": "decay",
                "description": "+{% Sample Size when taking samples for the 3d printer. Finally, your statisitcal analysis will be accurate!",
                "requirements": [<ComponentModel>{"item": "Soul2", "quantity": 15}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Big Game Hunter", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 60,
                "x2": 30,
                "func": "decay",
                "description": "Killing a Giant Monster has a {% chance to not decrease the Giant Mob Spawn Odds, which reset at the end of each week.",
                "requirements": [<ComponentModel>{"item": "Critter3", "quantity": 40}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 4}]
            }),
        new BubbleBase("Ignore Overdues", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 100,
                "x2": 60,
                "func": "decay",
                "description": "+{% Book Checkout speed, all thanks to this one little bubble that librarians do NOT want you to know about!",
                "requirements": [<ComponentModel>{"item": "Tree7", "quantity": 120}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 2}]
            }),
        new BubbleBase("Yellow Bargain", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 40,
                "x2": 12,
                "func": "decay",
                "description": "The material costs of ALL yellow bubbles are {% lower.",
                "requirements": [<ComponentModel>{"item": "Critter6", "quantity": 250}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Mr Massacre", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 90,
                "x2": 50,
                "func": "decay",
                "description": "+{% Multikill per damage tier. Remember, damage tier is shown by the Purple Bar in AFK info, and multikill is bigtime for resources",
                "requirements": [<ComponentModel>{"item": "Refinery3", "quantity": 8}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}]
            }),
        new BubbleBase("Egg Ink", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 40,
                "x2": 40,
                "func": "decay",
                "description": "+{% faster Egg Incubation Time in the Pet Nest. This will be an absolutely VITAL upgrade once you unlock pet egg rarity!",
                "requirements": [<SpiceComponentModel>{"spiceNo": "0", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}]
            }),
        new BubbleBase("Diamond Chef", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 0.3,
                "x2": 13,
                "func": "decayMulti",
                "description": "{x faster Meal and Fire Kitchen Speeds for every Meal at Lv 11+. This is when the meal plate becomes Diamond Blue, just so you know!",
                "requirements": [<SpiceComponentModel>{"spiceNo": "6", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 4}]
            }),
        new BubbleBase("Card Champ", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 100,
                "x2": 40,
                "func": "decay",
                "description": "+{% Card Drop Chance for all card types, even Party Dungeon cards!",
                "requirements": [<SpiceComponentModel>{"spiceNo": "9", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}]
            }),
        new BubbleBase("Petting The Rift", <BubbleModel>{
                "cauldron": "Kazam Cauldron",
                "x1": 1.5,
                "x2": 60,
                "func": "decayMulti",
                "description": "{x New Pet Chance for every gap you traverse in the SpaceTime Rift. The Rift entrance is deep in World 4, far above the 8 armed octodars.",
                "requirements": [<ComponentModel>{"item": "Critter10", "quantity": 100}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 5}]
            }),
        new BubbleBase("Copper Corona", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "Orange bubble cauldron brew speed is increased by +{%",
                "requirements": [<ComponentModel>{"item": "Copper", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Sippy Splinters", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "Green bubble cauldron brew speed is increased by +{%",
                "requirements": [<ComponentModel>{"item": "OakTree", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Mushroom Soup", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "Yellow cauldron brew speed is increased by +{%",
                "requirements": [<ComponentModel>{"item": "Grasslands1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Spool Sprite", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "Purple cauldron brew speed is increased by +{%",
                "requirements": [<ComponentModel>{"item": "CraftMat1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Barium Mixture", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "+{ Water Droplet max capacity. Thats the 1st liquid type in Alchemy, btw.",
                "requirements": [<ComponentModel>{"item": "CopperBar", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Dieter Drink", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "Monsters drop +{% more money.",
                "requirements": [<ComponentModel>{"item": "Grasslands3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Skinny 0 Cal", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 2.5,
                "x2": 0,
                "func": "add",
                "description": "+{% chance to get double points when depositing statues. So like... if you deposit one statue, it might count as one! Or two.",
                "requirements": [<ComponentModel>{"item": "Jungle2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Thumb Pow", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "When converting Skill EXP into Class EXP using the 'EXP CONVERTER' star talent, you'll get {% more Class EXP than you usually do.",
                "requirements": [<ComponentModel>{"item": "CraftMat5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Jungle Juice", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% liquid regen rate for all liquid cauldrons. Yes, even the secret one!",
                "requirements": [<ComponentModel>{"item": "JungleTree", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Barley Brew", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "Alchemy bubble upgrade costs are {% lower for all bubbles! Even the giraffe bubbles that look strangely like elephants!",
                "requirements": [<ComponentModel>{"item": "IronBar", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Anearful", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 2,
                "x2": 0,
                "func": "add",
                "description": "+{% Card drop rate. Even works offline, just like it always has! What do you mean this used to say something different...?",
                "requirements": [<ComponentModel>{"item": "Forest1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Tea With Pea", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "+{ Liquid Nitrogen max capacity. Thats the 2nd liquid type in Alchemy, btw.",
                "requirements": [<ComponentModel>{"item": "ToiletTree", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Gold Guzzle", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Shop sell price.",
                "requirements": [<ComponentModel>{"item": "Gold", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Ramificoction", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Talent Points for Tab 1. Shout out to that 1 person who'll make it this far without knowing what talents are, you're my hero!",
                "requirements": [<ComponentModel>{"item": "Forest3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Seawater", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% chance for 1 kill to count for 2 when trying to open new portals, but only while actively playing. One, two, buckle my shoe.",
                "requirements": [<ComponentModel>{"item": "Fish1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Tail Time", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 0.5,
                "x2": 0,
                "func": "add",
                "description": "+{ Weapon Power. This is gonna be OP in later worlds I can already tell.",
                "requirements": [<ComponentModel>{"item": "Sewers2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Fly In My Drink", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "Eww go get me another one, I can't drink this! ...what, why are you looking at me like that? OH right, uh, this gives +{ base Accuracy.",
                "requirements": [<ComponentModel>{"item": "Bug1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Mimicraught", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% EXP from monsters. Sorry, I know this is a lame bonus. Send me an email if you want me change it to +{% NPC dialogue talking speed.",
                "requirements": [<ComponentModel>{"item": "DesertA2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Blue Flav", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 30,
                "x2": 7,
                "func": "decay",
                "description": "-{% material cost for stamps. You know how it's hard to increase stamps max levels? Well this kinda makes that a bit less factual!",
                "requirements": [<ComponentModel>{"item": "Plat", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Slug Slurp", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 2,
                "x2": 0,
                "func": "add",
                "description": "+{ Post Office Box Points for every character, and easily the best bonus in the game. A box will never abandon you!",
                "requirements": [<ComponentModel>{"item": "Fish2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Pickle Jar", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 50,
                "x2": 0,
                "func": "add",
                "description": "+{% Nothing. Absolutely nothing, now and forever. It's a darn pickle, what were you expecting?",
                "requirements": [<ComponentModel>{"item": "BobJoePickle", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Fur Refresher", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 2,
                "x2": 0,
                "func": "add",
                "description": "+{% higher Shiny Critter chance. This is a multiplier, so +1% from this vial means 1.01x, so 5% shiny chance would go to 5.05%.",
                "requirements": [<ComponentModel>{"item": "SnowA1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Sippy Soul", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Talent Points for Tab 2.",
                "requirements": [<ComponentModel>{"item": "Soul1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Crab Juice", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 4,
                "x2": 0,
                "func": "add",
                "description": "+{ Starting points in Worship Tower Defence. Of course, a true balloon monkey wouldn't accept handouts like this.",
                "requirements": [<ComponentModel>{"item": "Critter2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Void Vial", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Mining Efficiency.",
                "requirements": [<ComponentModel>{"item": "Void", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Red Malt", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Refinery Cycle Speed. I just want to see you squirm a bit more as you decide where to spend your precious salts hahahaha!!",
                "requirements": [<ComponentModel>{"item": "Refinery1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Ew Gross Gross", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Catching Efficiency.",
                "requirements": [<ComponentModel>{"item": "Bug5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("The Spanish Sahara", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Choppin Efficiency.",
                "requirements": [<ComponentModel>{"item": "SaharanFoal", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Poison Tincture", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "Eagle Eye Trap-O-Vision gives +{% more critters. It will always give less than if you manually collected the traps though.",
                "requirements": [<ComponentModel>{"item": "Critter1A", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Etruscan Lager", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Fishing Efficiency.",
                "requirements": [<ComponentModel>{"item": "SnowB2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Chonker Chug", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Talent Book Library checkout speed.",
                "requirements": [<ComponentModel>{"item": "Soul2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "2", "quantity": -1}]
            }),
        new BubbleBase("Bubonic Burp", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Cog Inventory spaces. DONT PANIC!!! I KNOW ITS ALARMING THAT A VIAL FINALLY GIVES A USEFUL BONUS, BUT STAY CALM!",
                "requirements": [<ComponentModel>{"item": "Critter4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Visible Ink", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Construction Exp gain.",
                "requirements": [<ComponentModel>{"item": "SnowB3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Orange Malt", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 5,
                "x2": 0,
                "func": "add",
                "description": "+{% higher Shiny Critter chance. This stacks with the shiny chance from the Fur Refresher vial. You see, they have the same shaped vial.",
                "requirements": [<ComponentModel>{"item": "Refinery2", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Snow Slurry", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 0.5,
                "x2": 0,
                "func": "add",
                "description": "+{% Printer sample size. My my there are a lot of these 'sample size' bonuses in the game... too many...",
                "requirements": [<ComponentModel>{"item": "SnowB5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Slowergy Drink", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Base Multikill per Multikill Tier for all worlds. Stack them skulls!",
                "requirements": [<ComponentModel>{"item": "Soul4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Sippy Cup", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% Cog production speed.",
                "requirements": [<ComponentModel>{"item": "SnowC1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Bunny Brew", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Talent Points for Tab 3.",
                "requirements": [<ComponentModel>{"item": "Critter7", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("40-40 Purity", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Trench Seawater max capacity. Thats the 3rd liquid type in Alchemy, btw.",
                "requirements": [<ComponentModel>{"item": "SnowC4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Shaved Ice", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{% base Giant Monster spawn rate.",
                "requirements": [<ComponentModel>{"item": "Refinery5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Goosey Glug", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ base critter per trap. This is a sHONKingly good bonus, the only one of its kind!",
                "requirements": [<ComponentModel>{"item": "Critter9", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Ball Pickle Jar", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 25,
                "x2": 0,
                "func": "add",
                "description": "+{% arcade ball gain rate, and those are balls blessed by Balljoepickle himself, so you know they're extra lucky!",
                "requirements": [<ComponentModel>{"item": "BallJoePickle", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "1", "quantity": -1}]
            }),
        new BubbleBase("Capachino", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 4,
                "x2": 0,
                "func": "add",
                "description": "+{% Breeding EXP gain",
                "requirements": [<ComponentModel>{"item": "GalaxyA1", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Donut Drink", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 5,
                "x2": 0,
                "func": "add",
                "description": "+{% Chance to breed a new pet. Multiplicative, so +5% here would change a 1 in 100 to 1 in 95 chance.",
                "requirements": [<ComponentModel>{"item": "GalaxyA3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Long Island Tea", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 6,
                "x2": 0,
                "func": "add",
                "description": "+{% Meal Cooking Speed",
                "requirements": [<ComponentModel>{"item": "Fish6", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Spook Pint", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 5,
                "x2": 0,
                "func": "add",
                "description": "+{% New Recipe Cooking Speed",
                "requirements": [<ComponentModel>{"item": "Soul5", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Calcium Carbonate", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 11,
                "x2": 0,
                "func": "add",
                "description": "+{ Starting Worship Pts.",
                "requirements": [<ComponentModel>{"item": "GalaxyB3", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Bloat Draft", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 3,
                "x2": 0,
                "func": "add",
                "description": "+{% Lab EXP gain. Strange, you'd think someone dumb enough to drink a bloated blobfish drink wouldn't get bonus lab exp at all...",
                "requirements": [<ComponentModel>{"item": "Critter10", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Choco Milkshake", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 50,
                "x2": 7,
                "func": "decay",
                "description": "-{% Kitchen Upgrading Cost.",
                "requirements": [<ComponentModel>{"item": "GalaxyB4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Pearl Seltzer", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 0.5,
                "x2": 0,
                "func": "add",
                "description": "+{% All Stats. If you don't know what all stats means by now, you've prolly got bigger problems than not knowing what all stats means.",
                "requirements": [<ComponentModel>{"item": "GalaxyC1b", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Krakenade", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "description": "+{ Weapon Power. Unleash the kraken...",
                "requirements": [<ComponentModel>{"item": "Fish8", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Electrolyte", <BubbleModel>{
                "cauldron": "Vials",
                "x1": 2,
                "x2": 0,
                "func": "add",
                "description": "+{% Pet Team Damage",
                "requirements": [<ComponentModel>{"item": "GalaxyC4", "quantity": -1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": -1}]
            }),
        new BubbleBase("Mediocre Obols", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "1 random low-quality Obol. Sure, it'll probably be a crappy bronze Obol, but that's not bad considering youre paying with water!",
                "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 10}]
            }),
        new BubbleBase("Distilled Water", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "This distilled water was double-purified by running it through thousands of diamonds! So yea, it's just regular water, but more expensive.",
                "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 1}]
            }),
        new BubbleBase("One Measly Gem", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "1 Gem. Perfect for buying things in the Gem Shop! Sponsored by LavaFlame2's Gem Shop; 'Come for the items, leave for the prices!'",
                "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 5}]
            }),
        new BubbleBase("Star Book", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "Gives you a Star-Book! It's always the same one, but it comes with a random Max Lv, so keep buying it until you get one with a 100 Lv Max!",
                "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 50}]
            }),
        new BubbleBase("Exp Balloon", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "A small exp balloon. They give you exp in whatever skill you're currently training! Using them in town will give EXP in the town skill!",
                "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 15}]
            }),
        new BubbleBase("Small Donation", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 0,
                "func": "1",
                "description": "Your donation helps starving orphan monsters. They asked for food, but beggars can't be choosers! You wont get anything for doing this.",
                "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 1}]
            }),
        new BubbleBase("Decent Obols", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "1 random low-quality Obol, except this time the 'low' was rated by someone with higher standards, so it's more like medium quality!",
                "requirements": [<LiquidComponentModel>{"liquidNo": "1", "quantity": 20}, <LiquidComponentModel>{"liquidNo": "2", "quantity": 3}]
            }),
        new BubbleBase("Grand Obols", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "1 random Obol. It could be a super rare gold obol, but it's most likely gonna be a bronze obol.",
                "requirements": [<LiquidComponentModel>{"liquidNo": "2", "quantity": 5}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 3}]
            }),
        new BubbleBase("Bargain Tag", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "Lowers the cost of the next bubble you upgrade by 25%! Can stack multiple times, but max is 90% off.",
                "requirements": [<LiquidComponentModel>{"liquidNo": "2", "quantity": 1}, <LiquidComponentModel>{"liquidNo": "3", "quantity": 1}]
            }),
        new BubbleBase("Dense Water", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 1,
                "func": "0",
                "description": "Sourced from the bottom of the Great Trench, dont drink this or you'll become dummy thicc or whatever!",
                "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 1}]
            }),
        new BubbleBase("A Pair Of Gems", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 2,
                "func": "0",
                "description": "2 Gems. Thats two steps closer to buying everything in Gem Shop! Sure are a lot of steps for that one though...",
                "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 5}]
            }),
        new BubbleBase("Empty Space", <BubbleModel>{
                "cauldron": "Liquid Shop",
                "x1": 1,
                "x2": 0,
                "func": "0",
                "description": "There's nothing here buddy, but that ain't gon stop me from selling it to ya!",
                "requirements": [<LiquidComponentModel>{"liquidNo": "3", "quantity": 1}]
            })    
]
}
