import { BubbaUpgradeModel } from '../model/bubbaUpgradeModel';

export class BubbaUpgradeBase { constructor(public index: number, public data: BubbaUpgradeModel) { } }



export const initBubbaUpgradeRepo = () => {
    return [    
        new BubbaUpgradeBase(0, <BubbaUpgradeModel>{
                "name": "1st Slice",
                "x0": 1,
                "costExponent": 1.07,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Produce +{ Meat Slices per second. @ Click the upgrade again to upgrade it! @ Or, Hold Down on an upgrade to upgrade fast!"
            }),
        new BubbaUpgradeBase(1, <BubbaUpgradeModel>{
                "name": "Happi Boi",
                "x0": 1,
                "costExponent": 1.3,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Unlocks the Happiness Meter, multiplying Meat Slice production! @ You can pat Bubba $ times per hour, giving +{ Happiness each time. @ Your next pats come in ~"
            }),
        new BubbaUpgradeBase(2, <BubbaUpgradeModel>{
                "name": "Good Meat",
                "x0": 0.6,
                "costExponent": 1.07,
                "bonus": 2,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Boosts Meat Slice production by +{%"
            }),
        new BubbaUpgradeBase(3, <BubbaUpgradeModel>{
                "name": "Bubba Boon",
                "x0": 1,
                "costExponent": 10,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Gain a permanent bonus for the rest of IdleOn! @ This upgrade never resets, so those bonuses at the bottom are permanent!"
            }),
        new BubbaUpgradeBase(4, <BubbaUpgradeModel>{
                "name": "Bargain",
                "x0": 1,
                "costExponent": 1.12,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "All upgrades are $% cheaper"
            }),
        new BubbaUpgradeBase(5, <BubbaUpgradeModel>{
                "name": "Buyer Grin",
                "x0": 1.3,
                "costExponent": 1.5,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Bubba gains +$ Happiness for every upgrade you purchase!"
            }),
        new BubbaUpgradeBase(6, <BubbaUpgradeModel>{
                "name": "Charisma",
                "x0": 1,
                "costExponent": 1.1,
                "bonus": 5,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Unlocks the Charisma Chart, boosting stats as you level up attributes! @ Click the (?) Icon to get started! @ This upgrade boosts attribute Lv Up speed by +{%"
            }),
        new BubbaUpgradeBase(7, <BubbaUpgradeModel>{
                "name": "2nd Slice",
                "x0": 1,
                "costExponent": 1.1,
                "bonus": 6,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Produce an extra +{ Meat Slices per second"
            }),
        new BubbaUpgradeBase(8, <BubbaUpgradeModel>{
                "name": "Megaflesh",
                "x0": 1.6,
                "costExponent": 125,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Reset it all. Get a permanent Megaflesh."
            }),
        new BubbaUpgradeBase(9, <BubbaUpgradeModel>{
                "name": "Fun Gifts",
                "x0": 0.4,
                "costExponent": 3000,
                "bonus": 1,
                "maxLevel": 6,
                "x2": 0,
                "x3": 0,
                "description": "Start each run with a new gift. You can choose from { different options!"
            }),
        new BubbaUpgradeBase(10, <BubbaUpgradeModel>{
                "name": "Open Gift",
                "x0": 1,
                "costExponent": 3,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Trigger the effect of your gifts! Remember, each one has a unique effect!"
            }),
        new BubbaUpgradeBase(11, <BubbaUpgradeModel>{
                "name": "Great Meat",
                "x0": 1,
                "costExponent": 1.1,
                "bonus": 8,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Boosts Meat Slice production by +{%"
            }),
        new BubbaUpgradeBase(12, <BubbaUpgradeModel>{
                "name": "Dice Roll",
                "x0": 1,
                "costExponent": 25,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Unlocks the Frozen Dice, which boost Meat Slice production by the sum of their rolls. Each upgrade here rerolls dice. @ Price resets in ~"
            }),
        new BubbaUpgradeBase(13, <BubbaUpgradeModel>{
                "name": "Super Chart",
                "x0": 1,
                "costExponent": 1.8,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "All Attributes from Bubba's Charisma Chart give a }x higher bonus!"
            }),
        new BubbaUpgradeBase(14, <BubbaUpgradeModel>{
                "name": "More Dice",
                "x0": 1,
                "costExponent": 75000,
                "bonus": 1,
                "maxLevel": 6,
                "x2": 0,
                "x3": 0,
                "description": "Increase the number of Dice you roll by +{"
            }),
        new BubbaUpgradeBase(15, <BubbaUpgradeModel>{
                "name": "Smoker",
                "x0": 1,
                "costExponent": 1.2,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Unlock the Smoker, making Smoked Meats that multiply Meat Slice production! @ Each upgrade makes a Smoked Meat based on how long you wait! @ Your smoker has been smoking for ~"
            }),
        new BubbaUpgradeBase(16, <BubbaUpgradeModel>{
                "name": "More Sides",
                "x0": 1,
                "costExponent": 1000,
                "bonus": 1,
                "maxLevel": 9,
                "x2": 0,
                "x3": 0,
                "description": "Increase the number of sides of each Dice by +{, so your highest possible dice roll is now $!"
            }),
        new BubbaUpgradeBase(17, <BubbaUpgradeModel>{
                "name": "Uber Gifts",
                "x0": 1,
                "costExponent": 1.6,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "The passive bonus of your gifts is }x higher!"
            }),
        new BubbaUpgradeBase(18, <BubbaUpgradeModel>{
                "name": "Cost Saver",
                "x0": 1,
                "costExponent": 1.23,
                "bonus": 2,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "All upgrades are $% cheaper"
            }),
        new BubbaUpgradeBase(19, <BubbaUpgradeModel>{
                "name": "Best Meat",
                "x0": 1,
                "costExponent": 1.12,
                "bonus": 25,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Boosts Meat Slice production by +{%"
            }),
        new BubbaUpgradeBase(20, <BubbaUpgradeModel>{
                "name": "Real Love",
                "x0": 1,
                "costExponent": 1.5,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "All happiness gained for Bubba from all sources is now }x higher!"
            }),
        new BubbaUpgradeBase(21, <BubbaUpgradeModel>{
                "name": "Spare Coins",
                "x0": 1,
                "costExponent": 1.8,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "{% chance to find a random coin when upgrading, each one multiplying Meat Slice production. Better coins are rarer..."
            }),
        new BubbaUpgradeBase(22, <BubbaUpgradeModel>{
                "name": "Loaded Dice",
                "x0": 1,
                "costExponent": 1.3,
                "bonus": 1,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Your dice are all {% luckier. This will make low rolls rarer, and big rolls more common!"
            }),
        new BubbaUpgradeBase(23, <BubbaUpgradeModel>{
                "name": "3rd Slice",
                "x0": 1,
                "costExponent": 1.22,
                "bonus": 50,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "Produce and extra +{ Meat Slices per second"
            }),
        new BubbaUpgradeBase(24, <BubbaUpgradeModel>{
                "name": "Crossover",
                "x0": 1,
                "costExponent": 1.75,
                "bonus": 5,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "+{% Meat Slice production per POW 10 fish you own over at Poppy's Fish Pond!"
            }),
        new BubbaUpgradeBase(25, <BubbaUpgradeModel>{
                "name": "2X Smoke",
                "x0": 1,
                "costExponent": 1.12,
                "bonus": 2,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "You now get double Smoked Meat when curing! Not every time, but {% of the time!"
            }),
        new BubbaUpgradeBase(26, <BubbaUpgradeModel>{
                "name": "Perma Sale",
                "x0": 1,
                "costExponent": 1.3,
                "bonus": 4,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "All upgrades are $% cheaper"
            }),
        new BubbaUpgradeBase(27, <BubbaUpgradeModel>{
                "name": "Big Ol Coin",
                "x0": 1,
                "costExponent": 1.5,
                "bonus": 2,
                "maxLevel": 999,
                "x2": 0,
                "x3": 0,
                "description": "{% chance to find two coins instead of one when finding Spare Coins!"
            })    
]
}
