import { HoleBuildingModel } from '../model/holeBuildingModel';
import { SedimentTypeEnum } from '../enum/sedimentTypeEnum';

export class HoleBuildingBase { constructor(public index: number, public data: HoleBuildingModel) { } }



export const initHoleBuildingRepo = () => {
    return [    
        new HoleBuildingBase(0, <HoleBuildingModel>{
                "name": "Opal Dividends",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 6,
                "costCalcType": true,
                "desc": "Each opal invested in a villager now gives them 125 EXP/hr, instead of 100 EXP/hr @ Also worry not, you can reset your opals later at Cavern 7",
                "order": 0
            }),
        new HoleBuildingBase(1, <HoleBuildingModel>{
                "name": "Better Buckets",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 8,
                "costCalcType": true,
                "desc": "Increases the base fill rate of all Well Buckets from 10/hr to 15/hr. IMPORTANT:You can click on the buckets for more info!",
                "order": 1
            }),
        new HoleBuildingBase(2, <HoleBuildingModel>{
                "name": "Cavern 'Porting",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 60,
                "costCalcType": true,
                "desc": "All teleports to this map are free! Also, did you know you can double-click a map instead of pressing the Teleport button?",
                "order": 58
            }),
        new HoleBuildingBase(3, <HoleBuildingModel>{
                "name": "2nd Bucket!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 130,
                "costCalcType": true,
                "desc": "Adds another bucket at the Well! You'll need to expand your Gravel bar to hold the 130 needed to create this!",
                "order": 59
            }),
        new HoleBuildingBase(4, <HoleBuildingModel>{
                "name": "3rd Bucket!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Goldust,
                "baseCost": 850,
                "costCalcType": true,
                "desc": "Adds another bucket at the Well! Remember, click a bucket to change what sediment it collects! That's how you get this gold resource!",
                "order": 2
            }),
        new HoleBuildingBase(5, <HoleBuildingModel>{
                "name": "4th Bucket!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 3000,
                "costCalcType": false,
                "desc": "Adds yet another bucket at the Well!",
                "order": 12
            }),
        new HoleBuildingBase(6, <HoleBuildingModel>{
                "name": "Five Nights at Bucket",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 12500,
                "costCalcType": false,
                "desc": "Adds one more bucket at the Well! Five buckets!!! WOW! That's worth writing home about!",
                "order": 3
            }),
        new HoleBuildingBase(7, <HoleBuildingModel>{
                "name": "6th Bucket!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 75000,
                "costCalcType": false,
                "desc": "Adds another bucket at the Well! I guess 5 wasn't enough for a go getter like yourself!",
                "order": 52
            }),
        new HoleBuildingBase(8, <HoleBuildingModel>{
                "name": "7rth Barckot?!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 1,
                "costCalcType": false,
                "desc": "Adds another bucket at the Well! You DO want more buckets, right?",
                "order": 15
            }),
        new HoleBuildingBase(9, <HoleBuildingModel>{
                "name": "Last Bucket!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 1,
                "costCalcType": false,
                "desc": "Adds another bucket at the Well! And it's the last one too, I hope your bucket lust is satiated!",
                "order": 16
            }),
        new HoleBuildingBase(10, <HoleBuildingModel>{
                "name": "9th Bucket!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 1,
                "costCalcType": false,
                "desc": "Adds another bucket at the Well! Yea apparently there were a few more of these left!",
                "order": 14
            }),
        new HoleBuildingBase(11, <HoleBuildingModel>{
                "name": "Bucket Finale!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 1,
                "costCalcType": false,
                "desc": "Adds another bucket at the Well! And yea this one is actually the last one, I don't think an 11th would fit on screen!",
                "order": 26
            }),
        new HoleBuildingBase(12, <HoleBuildingModel>{
                "name": "Bar Expand-o-rama",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 100,
                "costCalcType": true,
                "desc": "Adds the 'Expand Full Bars' toggle to the Well! Let me explain... when a bar is full of sediment, you lose half of the sediment, but permanently increase the max by 1.50x!",
                "order": 24
            }),
        new HoleBuildingBase(13, <HoleBuildingModel>{
                "name": "UBER Bar Expand-o-rama-hala",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 28000,
                "costCalcType": true,
                "desc": "Allow for UBER Full Bar Expansion, which means you can expand Well Bars beyond the previous limit of 14 times.",
                "order": 4
            }),
        new HoleBuildingBase(14, <HoleBuildingModel>{
                "name": "Expander Extravaganza",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Goldust,
                "baseCost": 350,
                "costCalcType": true,
                "desc": "Gives all your buckets +20% Fill Rate per bar expansion across all sediment types! This includes Uber expansions later! @ Total Bonus: +{%",
                "order": 57
            }),
        new HoleBuildingBase(15, <HoleBuildingModel>{
                "name": "Motherlode ~ Bucket Synergy",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 180,
                "costCalcType": true,
                "desc": "Gives all your buckets 1.10x fill rate per Motherlode Layer you've destroyed! @ Total Bonus: {x",
                "order": 42
            }),
        new HoleBuildingBase(16, <HoleBuildingModel>{
                "name": "Green Amplifier",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Goldust,
                "baseCost": 250,
                "costCalcType": true,
                "desc": "Adds a new Amplifier stone to interact with at the Dawg Den!",
                "order": 17
            }),
        new HoleBuildingBase(17, <HoleBuildingModel>{
                "name": "Pink Amplifier",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 3250,
                "costCalcType": true,
                "desc": "Adds a new Amplifier stone to interact with at the Dawg Den!",
                "order": 56
            }),
        new HoleBuildingBase(18, <HoleBuildingModel>{
                "name": "Yellow Amplifier",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10000,
                "costCalcType": false,
                "desc": "Adds a new Amplifier stone to interact with at the Dawg Den!",
                "order": 49
            }),
        new HoleBuildingBase(19, <HoleBuildingModel>{
                "name": "Cyan Amplifier",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds a new Amplifier stone to interact with at the Dawg Den!",
                "order": 32
            }),
        new HoleBuildingBase(20, <HoleBuildingModel>{
                "name": "Purple Amplifier",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds a new Amplifier stone to interact with at the Dawg Den!",
                "order": 27
            }),
        new HoleBuildingBase(21, <HoleBuildingModel>{
                "name": "White Amplifier",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds a new Amplifier stone to interact with at the Dawg Den!",
                "order": 13
            }),
        new HoleBuildingBase(22, <HoleBuildingModel>{
                "name": "Dark Amplifier",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds a new Amplifier stone to interact with at the Dawg Den!",
                "order": 5
            }),
        new HoleBuildingBase(23, <HoleBuildingModel>{
                "name": "Amplifier Stackin'",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "You now get an additional +0.50x Multiplier at the Dawg Den for every 10 total charge across all amplifiers!",
                "order": 18
            }),
        new HoleBuildingBase(24, <HoleBuildingModel>{
                "name": "The Story Changes Over Time...",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Goldust,
                "baseCost": 600,
                "costCalcType": true,
                "desc": "Bravery Swords get +1 minimum DMG and +10 maximum DMG per 6 HR of AFK time at the Bravery Monument!",
                "order": 55
            }),
        new HoleBuildingBase(25, <HoleBuildingModel>{
                "name": "First Try, I swear!",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "If you throw the LAST bravery sword first, and it kills the monster, you get a +10% Sword Max DMG bonus for the rest of the story. If it doesn't kill, this bonus resets back to 0%",
                "order": 45
            }),
        new HoleBuildingBase(26, <HoleBuildingModel>{
                "name": "Even Better Buckets",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Goldust,
                "baseCost": 25,
                "costCalcType": false,
                "desc": "Increases the base fill rate of all Well Buckets from 15/hr to 20/hr. Try changing your bucket to remove the rocks, once you remove that layer you can collect gold dust!",
                "order": 43
            }),
        new HoleBuildingBase(27, <HoleBuildingModel>{
                "name": "Eee String",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Permanently unlocks a new String Type for the Harp! You can level it up by plucking it, getting +1 EXP per 100% Harp Power!",
                "order": 39
            }),
        new HoleBuildingBase(28, <HoleBuildingModel>{
                "name": "Eff String",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Permanently unlocks a new String Type for the Harp! You can level it up by plucking it, getting +1 EXP per 100% Harp Power!",
                "order": 33
            }),
        new HoleBuildingBase(29, <HoleBuildingModel>{
                "name": "Geez String",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Permanently unlocks a new String Type for the Harp! You can level it up just like any other string, getting +1 EXP per 100% Harp Power!",
                "order": 37
            }),
        new HoleBuildingBase(30, <HoleBuildingModel>{
                "name": "Aye String",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Permanently unlocks a new String Type for the Harp! You can level it up just like any other string!",
                "order": 41
            }),
        new HoleBuildingBase(31, <HoleBuildingModel>{
                "name": "Bee String",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Permanently unlocks a new String Type for the Harp! You can level it up just like any other string!",
                "order": 6
            }),
        new HoleBuildingBase(32, <HoleBuildingModel>{
                "name": "Loaded Harp",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds +1 more string to the Harp, ready to be strummed until the end of (the) time (signature)!",
                "order": 28
            }),
        new HoleBuildingBase(33, <HoleBuildingModel>{
                "name": "Packed Harp",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds +1 more string to the Harp, you'll find it right next to all your other strings!",
                "order": 19
            }),
        new HoleBuildingBase(34, <HoleBuildingModel>{
                "name": "Hefty Harp",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds +1 more string to the Harp, it even makes sound when strummed! The other ones do too, but like, this one does too! Just incase you were worried it wouldn't.",
                "order": 60
            }),
        new HoleBuildingBase(35, <HoleBuildingModel>{
                "name": "Multitudinal Harp",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds +9999 more strings to the Harp! Haha nah just +1 string, figured I'd keep you on your toes! If I tricked you, you must go pluck the F string.",
                "order": 25
            }),
        new HoleBuildingBase(36, <HoleBuildingModel>{
                "name": "Sumptuous Harp",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Adds +1 more string to the Harp... all these strings really remind me of string cheese, I used to love it!",
                "order": 23
            }),
        new HoleBuildingBase(37, <HoleBuildingModel>{
                "name": "Domino Effect",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Strings give +20% more per string plucked during a strum... let me explain. Imagine you have 5 strings, this would mean the final string you pluck would be worth DOUBLE!",
                "order": 29
            }),
        new HoleBuildingBase(38, <HoleBuildingModel>{
                "name": "Variety Effect",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Strings give +30% more for each unique string type on your harp... I see you currently have $ different strings on your harp, so your strings are all worth #% more!",
                "order": 53
            }),
        new HoleBuildingBase(39, <HoleBuildingModel>{
                "name": "Stringy Effect",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Strings give +15% more. @ More what, you ask? More everything! They give more String EXP, more notes, higher chance for opal... so yea, MORE!",
                "order": 50
            }),
        new HoleBuildingBase(40, <HoleBuildingModel>{
                "name": "Reroll Keeper",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Each unused reroll you have in a Bravery Story gives +10% Sword Max DMG. So don't be all loosey goosey with those rerolls!",
                "order": 34
            }),
        new HoleBuildingBase(41, <HoleBuildingModel>{
                "name": "Fractalfly ~ Harp Synergy",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Boosts your Harp Note production by 1.10x per Undying Hive Layer you've destroyed! @ Total Bonus: {x",
                "order": 40
            }),
        new HoleBuildingBase(42, <HoleBuildingModel>{
                "name": "Double Dinger Ringer",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Ringing the Bell now has a +30% chance of giving +2 LV to a bonus, instead of just +1 LV",
                "order": 7
            }),
        new HoleBuildingBase(43, <HoleBuildingModel>{
                "name": "RNG Oxidizing Layer",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "When you Clean the Bell and FAIL to get a new Improvement Method, the success chance for next time goes up by 1.25x. This happens every fail, and resets when you finally succeed!",
                "order": 20
            }),
        new HoleBuildingBase(44, <HoleBuildingModel>{
                "name": "Gloomie Mulch",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Gloomie mushrooms respawn +10% faster! In fact, ALL monsters across all the worlds of IdleOn respawn +10% faster!",
                "order": 46
            }),
        new HoleBuildingBase(45, <HoleBuildingModel>{
                "name": "Improvement Stackin'",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "For every 25 LVs across all Improvement Methods upgrades at the Bell, all your Improvement Method bonuses are 1.10x higher! @ Total bonus: }x",
                "order": 38
            }),
        new HoleBuildingBase(46, <HoleBuildingModel>{
                "name": "Gloomie Lootie",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+5% Drop Rate for each Colony of Gloomie Mushrooms defeated! Drop rate here as in like, the one for stuff outside of the Caverns. @ Total Bonus: +{%",
                "order": 47
            }),
        new HoleBuildingBase(47, <HoleBuildingModel>{
                "name": "Gloomie Expie",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+25% Class EXP gain for each Colony of Gloomie Mushrooms defeated! @ Total Bonus: +{%",
                "order": 48
            }),
        new HoleBuildingBase(48, <HoleBuildingModel>{
                "name": "Gloomie Opie",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+10% Villager EXP gain for each Colony of Gloomie Mushrooms successfully romanced... or defeated, whichever is higher. @ Total Bonus: +{%",
                "order": 54
            }),
        new HoleBuildingBase(49, <HoleBuildingModel>{
                "name": "Motherlode Trickledown",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+15% All Skill Efficiency, and +10% All Skill EXP gain per Motherlode Layer you've destroyed!",
                "order": 44
            }),
        new HoleBuildingBase(50, <HoleBuildingModel>{
                "name": "Fractalfly Trickledown",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+15% All Skill Efficiency, and +10% All Skill EXP gain per Undying Hive Layer you've destroyed!",
                "order": 61
            }),
        new HoleBuildingBase(51, <HoleBuildingModel>{
                "name": "Rift Guy",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Hey bet you weren't expecting to see me here, huh? Well, that's just how it goes with me, it's in my blood. It's how I roll. Go ahead, create me. Or don't, I'll keep being me.",
                "order": 35
            }),
        new HoleBuildingBase(52, <HoleBuildingModel>{
                "name": "DNA Rock Tumbler",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Gives you a +60% chance to get an additional Grey Gene when trashing a pet for every Power of 10 Gravel you have. @ Total Bonus: +{% Chance for extra Gene",
                "order": 8
            }),
        new HoleBuildingBase(53, <HoleBuildingModel>{
                "name": "Final Ballad of the Snail",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Gives you a 1.04x higher success chance when leveling up Snail for every Power of 10 Trebel Notes you have. @ Total Bonus: {x Snail success chance",
                "order": 21
            }),
        new HoleBuildingBase(54, <HoleBuildingModel>{
                "name": "Noise Reduction Therapy",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Gives you a multiplicative 1.20x Stealth bonus for all ninjas for every Power of 10 Quaver Notes you have. @ Total Bonus: {x Stealth",
                "order": 30
            }),
        new HoleBuildingBase(55, <HoleBuildingModel>{
                "name": "Tune of Artifaction",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Gives you +10% Artifact Find Chance for every Power of 10 Natural Notes you have. @ Total Bonus: +{% Artifact Find Chance",
                "order": 9
            }),
        new HoleBuildingBase(56, <HoleBuildingModel>{
                "name": "Heavy Redstone Seasoning",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Gives you a multiplicative 1.30x Cooking Speed bonus for every Power of 10 Redstone you have. @ Total Bonus: {x Cooking Speed",
                "order": 62
            }),
        new HoleBuildingBase(57, <HoleBuildingModel>{
                "name": "True Golden Edge",
                "squareImageType": 0,
                "costType": SedimentTypeEnum.Goldust,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Gives all your players +20% Damage for every Power of 10 Golddust you have. @ Total Bonus: +{% Damage",
                "order": 71
            }),
        new HoleBuildingBase(58, <HoleBuildingModel>{
                "name": "Loadin' some 'Lode",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 12,
                "costCalcType": true,
                "desc": "Gives +5 Bucket Fill Rate per Power of 10 Motherlode Ore mined. You have mined # so far! @ Total Bonus: +{/hr Bucket Fill Rate",
                "order": 80
            }),
        new HoleBuildingBase(59, <HoleBuildingModel>{
                "name": "Hiring the Hounds from Beyond",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 30,
                "costCalcType": true,
                "desc": "Gives +10 B.F.R. per 100 hounds defeated in best runs of each class. 尬  Beginner:!, Warrior:#, Archer:$, Mage:% @ Total Bonus: +{/hr Bucket Fill Rate",
                "order": 69
            }),
        new HoleBuildingBase(60, <HoleBuildingModel>{
                "name": "Triple Tap Tinkle",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Ringing the Bell now has another +30% chance of giving +2 LV to a bonus instead of just +1 LV. Also, there's a new +20% chance of giving +3 LV instead of +2 or +1!",
                "order": 79
            }),
        new HoleBuildingBase(61, <HoleBuildingModel>{
                "name": "Compound Interest",
                "squareImageType": 2,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 600,
                "costCalcType": false,
                "desc": "You start with +1 more Court Coins every Power of 2 HRs of AFK time at the Justice Monument! So 2Hrs you get +1 coin, 4Hrs you get +2 coins, 8Hrs you get +3 coins, and so on!",
                "order": 63
            }),
        new HoleBuildingBase(62, <HoleBuildingModel>{
                "name": "Big Jar Mach II",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": true,
                "desc": "Upgrades the main jar, doubling the base value of every rupie you find. So if you see 2 red rupies, you actually got 4!",
                "order": 85
            }),
        new HoleBuildingBase(63, <HoleBuildingModel>{
                "name": "Big Jar Mach III",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Upgrades the main jar, allowing you to produce 2 jar types at once!",
                "order": 74
            }),
        new HoleBuildingBase(64, <HoleBuildingModel>{
                "name": "Big Jar Mach IV",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Upgrades the main jar, increasing the chance for multiple rupies in a jar by +50%",
                "order": 81
            }),
        new HoleBuildingBase(65, <HoleBuildingModel>{
                "name": "Big Jar Mach V",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Upgrades the main jar, doubling the base value of every rupie you find AGAIN! If 2 red rupies gave you 4 before, now it's 8!!!",
                "order": 36
            }),
        new HoleBuildingBase(66, <HoleBuildingModel>{
                "name": "Big Jar Mach VI",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Upgrades the main jar, allowing you to produce 3 jar types at once!",
                "order": 89
            }),
        new HoleBuildingBase(67, <HoleBuildingModel>{
                "name": "Big Jar Mach VII",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Upgrades the main jar, reducing the production amount required to make jars by 30% so you can make them faster!",
                "order": 64
            }),
        new HoleBuildingBase(68, <HoleBuildingModel>{
                "name": "Big Jar Mach VIII",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Upgrades the main jar, doubling the base value of every rupie you find! This does not stack with the other ones... just kidding it totally does! ANOTHER 2x RUPIES!!!",
                "order": 90
            }),
        new HoleBuildingBase(69, <HoleBuildingModel>{
                "name": "Break All Button",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 200,
                "costCalcType": true,
                "desc": "Adds a new button to the top left of the Jar, allowing you to break all jars at once!",
                "order": 76
            }),
        new HoleBuildingBase(70, <HoleBuildingModel>{
                "name": "Max Monument Rewards",
                "squareImageType": 1,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Monument Reward Multi now increases at the normal rate of +100% daily for 4 full days! Before this upgrade, it was only 2 days...",
                "order": 70
            }),
        new HoleBuildingBase(71, <HoleBuildingModel>{
                "name": "Supergiant Jars",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 25,
                "costCalcType": true,
                "desc": "Jars now COMBINE to save space! 10 Jars becomes 1 large jar, which gives 10x rewards. 10 large jars become 1 giant jar, which gives 100x rewards. This continues forever!",
                "order": 87
            }),
        new HoleBuildingBase(72, <HoleBuildingModel>{
                "name": "Light Speed",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Every POW 10 white rupies you own increases the production rate of jars by +10% @ Total Bonus: +{% Jar Producton Rate",
                "order": 91
            }),
        new HoleBuildingBase(73, <HoleBuildingModel>{
                "name": "Dark Luck",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Every POW 10 dark rupies you own increases the chance of enchanting collectibles from the Enchanted Jar by 1.10x @ Total Bonus: {x Enchantment",
                "order": 65
            }),
        new HoleBuildingBase(74, <HoleBuildingModel>{
                "name": "Jar Production Line",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "The requirement to make a jar is 5% lower per POW 10 jars made of the previous type. For example, making 100 Simple Jars would mean Tall jars are 10% quicker to make!",
                "order": 78
            }),
        new HoleBuildingBase(75, <HoleBuildingModel>{
                "name": "Advanced Collection",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "You can now find new collectible types from jars, found in the new 2nd page of your collection! Go collect 'em all!",
                "order": 72
            }),
        new HoleBuildingBase(76, <HoleBuildingModel>{
                "name": "Collect 'Em All",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Gives a 1.02x chance to find a new collectible for every digit of all the rupies you own. @ Total Bonus: {x Collectible Chance",
                "order": 86
            }),
        new HoleBuildingBase(77, <HoleBuildingModel>{
                "name": "Roaring Flame",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+25% chance to get DOUBLE the Torches from Ancient Golems when picking them up!",
                "order": 66
            }),
        new HoleBuildingBase(78, <HoleBuildingModel>{
                "name": "The Sicilian",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+10% Total Gambit Score",
                "order": 92
            }),
        new HoleBuildingBase(79, <HoleBuildingModel>{
                "name": "Evertree Trickledown",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 400,
                "costCalcType": true,
                "desc": "+15% All Skill Efficiency, and +10% All Skill EXP gain per Evertree Trunk you've whittled!",
                "order": 22
            }),
        new HoleBuildingBase(80, <HoleBuildingModel>{
                "name": "Evertree ~ Rupie Synergy",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 100,
                "costCalcType": true,
                "desc": "Boosts overall Rupie value by 1.10x per Evertree Trunk you've whittled! @ Total Bonus: {x",
                "order": 73
            }),
        new HoleBuildingBase(81, <HoleBuildingModel>{
                "name": "Rock Smart",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "After much thought, this schematic has decided to give +20% Monument AFK gain, and +2 Starting Attempts for the Wisdom Story per POW 10 Wisdom Monument Hours.",
                "order": 82
            }),
        new HoleBuildingBase(82, <HoleBuildingModel>{
                "name": "Sanctum of LOOT",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+20% Drop Rate for each Sanctum of Ancient Golems you've cleared! @ Total Bonus: +{%",
                "order": 67
            }),
        new HoleBuildingBase(83, <HoleBuildingModel>{
                "name": "Sanctum of EXP",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+40% Class EXP for each Sanctum of Ancient Golems you've cleared! @ Total Bonus: +{%",
                "order": 10
            }),
        new HoleBuildingBase(84, <HoleBuildingModel>{
                "name": "Sanctum of DMG",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "+100% Total Damage for each Sanctum of Ancient Golems you've cleared! @ Total Bonus: +{%",
                "order": 75
            }),
        new HoleBuildingBase(85, <HoleBuildingModel>{
                "name": "Peer Reviewed Books",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Bolaia now get +7% Study Rate per LV, instead of the previous +5% per LV!",
                "order": 77
            }),
        new HoleBuildingBase(86, <HoleBuildingModel>{
                "name": "All This Ringing in my Ears",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "When Ringing the Bell, there is now a 25% chance to get 2x more LVs than you otherwise would have gotten!",
                "order": 83
            }),
        new HoleBuildingBase(87, <HoleBuildingModel>{
                "name": "Cutting Edge Research",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Bolaia now get a massive +10% Study Rate per LV, instead of the previous +7% per LV!",
                "order": 93
            }),
        new HoleBuildingBase(88, <HoleBuildingModel>{
                "name": "Billion Dollar Grant",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 1000000000,
                "costCalcType": true,
                "desc": "Bolaia now get a sumptuous +15% Study Rate per LV, instead of the previous +10% per LV!",
                "order": 11
            }),
        new HoleBuildingBase(89, <HoleBuildingModel>{
                "name": "Horsey Gambit",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Unlocks the Horsey challenge in the Gambit cavern.",
                "order": 68
            }),
        new HoleBuildingBase(90, <HoleBuildingModel>{
                "name": "Bishop Gambit",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Unlocks the Bishop challenge in the Gambit cavern.",
                "order": 88
            }),
        new HoleBuildingBase(91, <HoleBuildingModel>{
                "name": "Queen Gambit",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Unlocks the Queen challenge in the Gambit cavern.",
                "order": 84
            }),
        new HoleBuildingBase(92, <HoleBuildingModel>{
                "name": "Castle Gambit",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Unlocks the Castle challenge in the Gambit cavern.",
                "order": 51
            }),
        new HoleBuildingBase(93, <HoleBuildingModel>{
                "name": "Noob Gambit",
                "squareImageType": 3,
                "costType": SedimentTypeEnum.Gravel,
                "baseCost": 10,
                "costCalcType": false,
                "desc": "Unlocks the Noob challenge in the Gambit cavern.",
                "order": 31
            })    
]
}
