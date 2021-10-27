interface Item {
    item: string;
    quantity: number;
}

export class Bubble {
    name: string;
    x1: number;
    x2: number;
    func: string;
    description: string;
    requirements: Array<Item> = [];

    level: number = 0;
    class_name: string;

    constructor(name: string, icon_prefix: string, bubble_number: string, x1: number, x2: number, func: string, description: string, requirements: Array<Item>) {
        this.class_name = `icons-70 icons-aUpgrades${icon_prefix}${bubble_number}`;
        this.name = name.replace(/_/g, " ");
        this.x1 = x1;
        this.x2 = x2;
        this.func = func;
        this.description = description;
        this.requirements = requirements;
    }
}

export class Cauldron {
    name: string;
    short_name: string;
    bubbles: Array<Bubble> = [];

    constructor(name: string, short_name: string) {
        this.name = name;
        this.short_name = short_name;
    }
}

export class Vial {
    name: string;
    icon: string;
    level: number;

    constructor(name: string, icon_prefix: string, vialNumber: string, level: number) {
        this.level = level;
        this.icon = `/icons/assets/data/aUpgrades${icon_prefix}${vialNumber}.png`;
        this.name = name.replace(/_/g, " ");
    }
}

export class Alchemy {
    cauldrons: Array<Cauldron> = [];
    vials: Array<Vial> = [];
}

const initAlchemy = () => {
    const alchemy = new Alchemy();
    let power_cauldron = new Cauldron("Power Cauldron", "O")
    power_cauldron.bubbles.push(new Bubble("Roid Ragin", "O", "0", 1, 0, "add", "+{ Total STR. 'Total' here means that, for example, a +10% STR bonus from something else wouldn't affect this bonus.", JSON.parse('[{"item": "OakTree", "quantity": 25}, {"item": "Liquid1", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Warriors Rule", "O", "1", 2, 50, "decayMulti", "All Orange Passive Bubbles, which are the smaller sized ones, give a {x higher bonus to your warrior-based classes.", JSON.parse('[{"item": "Grasslands1", "quantity": 20}, {"item": "CraftMat1", "quantity": 3}, {"item": "Liquid1", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Hearty Diggy", "O", "2", 50, 100, "decay", "+{% mining efficiency per power of 10 max HP that your character has. The perfect bonus for miners with infinite HP!", JSON.parse('[{"item": "JungleTree", "quantity": 40}, {"item": "CopperBar", "quantity": 18}, {"item": "Liquid1", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Wyoming Blood", "O", "3", 23.5, 1.5, "bigBase", "Multi-Ore mining chance is increased by +{%, and your max Multi-Ore chance is 300% instead of 100%.", JSON.parse('[{"item": "Bug1", "quantity": 30}, {"item": "Forest1", "quantity": 50}, {"item": "Liquid1", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Reely Smart", "O", "4", 100, 80, "decay", "+{% Mining and Fishing EXP gain. Y'know what, I'll even DOUBLE that bonus for whichever skill has the lower level!", JSON.parse('[{"item": "CraftMat6", "quantity": 25}, {"item": "DesertA3", "quantity": 40}, {"item": "Liquid1", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Big Meaty Claws", "O", "5", 1, 0.02, "add", "Increases base damage by +$. This bonus increases based on how much Max HP you have above 250.", JSON.parse('[{"item": "BirchTree", "quantity": 200}, {"item": "DesertB2", "quantity": 75}, {"item": "Liquid1", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Sploosh Sploosh", "O", "6", 23.5, 1.5, "bigBase", "Multi-Fish fishing chance is increased by +{%, and your max Multi-Fish chance is 300% instead of 100%.", JSON.parse('[{"item": "Fish2", "quantity": 100}, {"item": "Liquid1", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Stronk Tools", "O", "7", 65, 70, "decay", "The following tools give +{% more skilling Power than normal: $", JSON.parse('[{"item": "Plat", "quantity": 60}, {"item": "Grasslands2", "quantity": 200}, {"item": "Liquid1", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Fmj", "O", "8", 0.5, 0, "add", "+{% more defence from Equipment. Also, +1 base Def per Class LV, up to +{.", JSON.parse('[{"item": "Bug4", "quantity": 50}, {"item": "DesertC2", "quantity": 140}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Bappity Boopity", "O", "9", 35, 100, "decay", "+{% critical Damage. Badabing, badaboom! Or in Italian, Babadabinga, babadaboomahh!", JSON.parse('[{"item": "CraftMat8", "quantity": 100}, {"item": "JungleTree", "quantity": 700}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Brittley Spears", "O", "10", 40, 50, "decay", "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.", JSON.parse('[{"item": "Critter1", "quantity": 10}, {"item": "Liquid2", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Call Me Bob", "O", "11", 25, 2.5, "bigBase", "+{% Construction EXP Gain. Also gives +50% Bug-Fixing speed if your username is LavaFlame2. Actually, better make that +500%...", JSON.parse('[{"item": "SnowA3", "quantity": 120}, {"item": "Liquid2", "quantity": 3}]')))
    power_cauldron.bubbles.push(new Bubble("Carpenter", "O", "12", 2, 50, "decay", "+{% Build Speed per Construction Level.", JSON.parse('[{"item": "Refinery2", "quantity": 3}, {"item": "Liquid2", "quantity": 4}]')))
    power_cauldron.bubbles.push(new Bubble("Buff Boi Talent", "O", "13", 5, 1, "bigBase", "+{ Talent Points for EACH tab! Yea, it's amazing right? But it's just for warriors, don't tell the other classes!!", JSON.parse('[{"item": "Critter4", "quantity": 50}, {"item": "Liquid3", "quantity": 2}]')))
    power_cauldron.bubbles.push(new Bubble("Orange Bargain", "O", "14", 40, 12, "decay", "The material costs of ALL orange bubbles are {% lower", JSON.parse('[{"item": "Soul4", "quantity": 30}, {"item": "Liquid3", "quantity": 3}]')))
    let quicc_cauldron = new Cauldron("Quicc Cauldron", "G")
    quicc_cauldron.bubbles.push(new Bubble("Swift Steppin", "G", "0", 1, 0, "add", "+{ Total AGI. Probably the lamest of the five stats... err, I mean four, hehe.", JSON.parse('[{"item": "Copper", "quantity": 15}, {"item": "Liquid1", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Archer Or Bust", "G", "1", 2, 50, "decayMulti", "All Green Passive Bonuses, which are the smaller sized ones, give {x more bonuses to your archer-based characters.", JSON.parse('[{"item": "Grasslands1", "quantity": 20}, {"item": "BirchTree", "quantity": 30}, {"item": "Liquid1", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Hammer Hammer", "G", "2", 23, 2, "bigBase", "You can now produce +1 more items at once in the anvil, and your production speed is increased by {%.", JSON.parse('[{"item": "Iron", "quantity": 30}, {"item": "Grasslands3", "quantity": 30}, {"item": "Liquid1", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Lil Big Damage", "G", "3", 20, 100, "decay", "+{% Mastery. Mastery is your stat that boosts minimum damage. Just like in Maplest... err, just like how I thought it up myself!", JSON.parse('[{"item": "Fish1", "quantity": 25}, {"item": "Jungle3", "quantity": 40}, {"item": "Liquid1", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Anvilnomics", "G", "4", 40, 100, "decay", "Costs for buying Anvil Production Points is reduced by {%. This is just like a tax cut, so remember me as a hero!", JSON.parse('[{"item": "ForestTree", "quantity": 50}, {"item": "Gold", "quantity": 40}, {"item": "Liquid1", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Quick Slap", "G", "5", 1, 0.02, "add", "Increases base damage by +$. This bonus increases based on how much Movement Speed you have above 110%.", JSON.parse('[{"item": "DesertB1", "quantity": 90}, {"item": "CraftMat6", "quantity": 200}, {"item": "Liquid1", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Sanic Tools", "G", "6", 65, 70, "decay", "The following tools give +{% more skilling Power than normal: $", JSON.parse('[{"item": "Jungle1", "quantity": 130}, {"item": "GoldBar", "quantity": 6}, {"item": "Liquid1", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Bug]", "G", "7", 23.5, 1.5, "bigBase", "Multi-Bug catching chance is increased by +{%, and your max Multi-Bug chance is 300% instead of 100%.", JSON.parse('[{"item": "Bug3", "quantity": 70}, {"item": "Liquid1", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Shaquracy", "G", "8", 1, 0, "add", "Your secondary stat (WIS for warrior, STR for archer, AGI for mage) gives +{% more Accuracy than normal.", JSON.parse('[{"item": "Fish4", "quantity": 65}, {"item": "PalmTree", "quantity": 250}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Cheap Shot", "G", "9", 7, 100, "decay", "+{% critical Chance, as it increases the chance for your attack to hit the monster's privates, and for the monster to be male.", JSON.parse('[{"item": "Bug5", "quantity": 35}, {"item": "DesertC3", "quantity": 150}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Bow Jack", "G", "10", 40, 50, "decay", "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.", JSON.parse('[{"item": "Soul1", "quantity": 5}, {"item": "Liquid2", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Call Me Ash", "G", "11", 25, 2, "bigBase", "+1 Placeable Trap, and +{% Trapping Efficiency.", JSON.parse('[{"item": "SaharanFoal", "quantity": 100}, {"item": "Liquid2", "quantity": 3}]')))
    quicc_cauldron.bubbles.push(new Bubble("Cuz I Catch Em All", "G", "12", 3, 100, "decayMulti", "{x more likely to catch shiny critters when opening a trap.", JSON.parse('[{"item": "Soul3", "quantity": 25}, {"item": "Liquid2", "quantity": 4}]')))
    quicc_cauldron.bubbles.push(new Bubble("Fast Boi Talent", "G", "13", 5, 1, "bigBase", "+{ Talent Points for EACH tab, but just for Archers! Well, and 'that' class, you know who you are!", JSON.parse('[{"item": "Bug6", "quantity": 120}, {"item": "Liquid3", "quantity": 2}]')))
    quicc_cauldron.bubbles.push(new Bubble("Green Bargain", "G", "14", 40, 12, "decay", "The material costs of ALL green bubbles are {% lower", JSON.parse('[{"item": "Critter5", "quantity": 200}, {"item": "Liquid3", "quantity": 3}]')))
    let high_iq_cauldron = new Cauldron("High-IQ Cauldron", "P")
    high_iq_cauldron.bubbles.push(new Bubble("Stable Jenius", "P", "0", 1, 0, "add", "+{ Total WIS. Honesty the greatest bonus in any Idle Game, believe me. Absolutely incredible, everyone says so!", JSON.parse('[{"item": "CraftMat1", "quantity": 10}, {"item": "Liquid1", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Mage Is Best", "P", "1", 2, 50, "decayMulti", "All Purple Passive Bonuses, which are the smaller sized ones, give {x more bonuses to your mage-based characters.", JSON.parse('[{"item": "Grasslands1", "quantity": 25}, {"item": "CopperBar", "quantity": 13}, {"item": "Liquid1", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Hocus Choppus", "P", "2", 50, 100, "decay", "+{% choppin efficiency per power of 10 max MP that your character has. Super diaper! Err, duper.", JSON.parse('[{"item": "CraftMat5", "quantity": 22}, {"item": "ForestTree", "quantity": 40}, {"item": "Liquid1", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Molto Loggo", "P", "3", 23.5, 1.5, "bigBase", "Multi-Log chop chance is increased by +{%, and your max Multi-Log chance is now 300% instead of 100%.", JSON.parse('[{"item": "IronBar", "quantity": 21}, {"item": "DesertA2", "quantity": 30}, {"item": "Liquid1", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Noodubble", "P", "4", 100, 60, "decay", "+{% Choppin' and Alchemy EXP gain. Y'know what, I'll even... actually, never mind.", JSON.parse('[{"item": "CraftMat7", "quantity": 20}, {"item": "Fish2", "quantity": 30}, {"item": "Liquid1", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Name I Guess", "P", "5", 1, 0.02, "add", "Increases base damage by +$. This bonus increases based on how much Max MP you have above 150.", JSON.parse('[{"item": "Jungle2", "quantity": 110}, {"item": "Gold", "quantity": 40}, {"item": "Liquid1", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Le Brain Tools", "P", "6", 65, 70, "decay", "The following tools give +{% more skilling Power than normal: $", JSON.parse('[{"item": "BirchTree", "quantity": 250}, {"item": "Bug3", "quantity": 55}, {"item": "Liquid1", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Cookin Roadkill", "P", "7", 120, 70, "decay", "Cranium Cooking lasts {% longer, gives {% more progress per kill, and has a {% lower cooldown. Also +{% Alchemy EXP!", JSON.parse('[{"item": "ToiletTree", "quantity": 75}, {"item": "Liquid1", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Brewstachio", "P", "8", 50, 100, "decay", "+{% Brew Speed. This a multiplicative bonus, which means its ultra powerful, all the time! Even on Mondays, the worst day!", JSON.parse('[{"item": "DesertC1", "quantity": 150}, {"item": "Fish4", "quantity": 50}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("All For Kill", "P", "9", 40, 100, "decay", "Attack Talents give +{% higher bonuses to Offline Gains than they normally do. So you might as well just AFK forever, bye!", JSON.parse('[{"item": "StumpTree", "quantity": 100}, {"item": "PlatBar", "quantity": 5}, {"item": "Liquid1", "quantity": 5}, {"item": "Liquid2", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Matty Stafford", "P", "10", 40, 50, "decay", "+{% Total damage. This multiplies with other damage bonuses, but adds with the other '+% Total Damage' bubbles.", JSON.parse('[{"item": "Refinery1", "quantity": 3}, {"item": "Liquid2", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Call Me Pope", "P", "11", 2.4, 70, "decayMulti", "{x Worship Charge rate per hour. Also, {x Max Worship Charge! You bouta go super with all that charge... just sayin'", JSON.parse('[{"item": "Critter2", "quantity": 25}, {"item": "Liquid2", "quantity": 3}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Gospel Leader", "P", "12", 60, 30, "decay", "+{% Max Charge per 10 Worship levels. I guess you could say this upgrade doesn't come Free of Charge!", JSON.parse('[{"item": "Bug5", "quantity": 150}, {"item": "Liquid2", "quantity": 4}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Smart Boi Talent", "P", "13", 5, 1, "bigBase", "Sorry, mages don't get anything because you're lame.... Ok fine, you can have +{ Talent Points for each tab, but I'm not happy about it.", JSON.parse('[{"item": "SnowC1", "quantity": 150}, {"item": "Liquid3", "quantity": 2}]')))
    high_iq_cauldron.bubbles.push(new Bubble("Purple Bargain", "P", "14", 40, 12, "decay", "The material costs of ALL purple bubbles are {% lower", JSON.parse('[{"item": "Soul1", "quantity": 800}, {"item": "Liquid3", "quantity": 3}]')))
    let kazam_cauldron = new Cauldron("Kazam Cauldron", "Y")
    kazam_cauldron.bubbles.push(new Bubble("Lotto Skills", "Y", "0", 1, 0, "add", "+{ LUK. Also, this will increase your chances of winning the lottery in real life from 0.0% to 0.000%! I'm not even joking, it's true!!", JSON.parse('[{"item": "Copper", "quantity": 11}, {"item": "OakTree", "quantity": 15}, {"item": "CraftMat1", "quantity": 8}, {"item": "Liquid1", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Droppin Loads", "Y", "1", 40, 70, "decay", "+{% Drop Rate. Thanks to this upgrade, you can get even MORE angry when you keep not getting that rare pet drop from the boss!", JSON.parse('[{"item": "Fish1", "quantity": 20}, {"item": "Bug1", "quantity": 30}, {"item": "Liquid1", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Startue Exp", "Y", "2", 25, 60, "decay", "Leveling up a statue resets it's exp bar down to {%, instead of 0%. Staturrific! Yea... the jokes are only gonna go downhill from here lol", JSON.parse('[{"item": "DesertA1", "quantity": 30}, {"item": "Forest2", "quantity": 40}, {"item": "Liquid1", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Level Up Gift", "Y", "3", 100, 30, "decay", "Whenever you level up anything, {% chance to drop a gift! It could be an EXP balloon, a Gem for the gem shop, or something crazy weird!", JSON.parse('[{"item": "Iron", "quantity": 35}, {"item": "JungleTree", "quantity": 70}, {"item": "CraftMat5", "quantity": 30}, {"item": "Liquid1", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Prowesessary", "Y", "4", 1.5, 60, "decayMulti", "The Prowess Bonus for every skill is multiplied by {. Prowess lowers the Efficiency needed to get multiple QTY per drop from resources.", JSON.parse('[{"item": "GoldBar", "quantity": 25}, {"item": "ToiletTree", "quantity": 50}, {"item": "Liquid1", "quantity": 3}]')))
    kazam_cauldron.bubbles.push(new Bubble("Stamp Tramp", "Y", "5", 1, 0, "add", "Increases the Max Lv of the 'Toilet Paper Postage' Talent to {. You can unlock this talent by typing 'More like Poopy Pete' near Pete.", JSON.parse('[{"item": "Bug2", "quantity": 65}, {"item": "Liquid1", "quantity": 4}]')))
    kazam_cauldron.bubbles.push(new Bubble("Undeveloped Costs", "Y", "6", 40, 70, "decay", "Reduces the material costs of all Alchemy Bubbles by {%. They are just bubbles though, how much could they even cost? 10 dollars?", JSON.parse('[{"item": "Fish3", "quantity": 75}, {"item": "Liquid1", "quantity": 6}]')))
    kazam_cauldron.bubbles.push(new Bubble("Da Daily Drip", "Y", "7", 30, 100, "decay", "Increases the Max Cap for every liquid by +$. This bonus increases based on the combined Alchemy LV of all your characters!", JSON.parse('[{"item": "CraftMat9", "quantity": 125}, {"item": "Liquid1", "quantity": 8}]')))
    kazam_cauldron.bubbles.push(new Bubble("Grind Time", "Y", "8", 9.7, 0.3, "bigBase", "+{% Class EXP. The go-to active bubble for anyone who wants to reach max level faster and finally start playing the game!", JSON.parse('[{"item": "Liquid1", "quantity": 50}, {"item": "Liquid2", "quantity": 25}]')))
    kazam_cauldron.bubbles.push(new Bubble("Laaarrrryyyy", "Y", "9", 120, 100, "decay", "Every time you upgrade an Alchemy bubble, there's a {% chance it'll upgrade 2 times, for no extra cost! Two fer one, getter dun!", JSON.parse('[{"item": "Dementia", "quantity": 50}, {"item": "DesertC4", "quantity": 130}, {"item": "Liquid2", "quantity": 4}]')))
    kazam_cauldron.bubbles.push(new Bubble("Cogs For Hands", "Y", "10", 4, 0, "add", "+{% Cog Production speed. Cogs are great. I really really like cogs. I guess you could say I think they're pretty Coggers...", JSON.parse('[{"item": "SnowA2", "quantity": 50}, {"item": "Liquid2", "quantity": 3}]')))
    kazam_cauldron.bubbles.push(new Bubble("Sample It", "Y", "11", 12, 40, "decay", "+{% Sample Size when taking samples for the 3d printer. Finally, your statisitcal analysis will be accurate!", JSON.parse('[{"item": "Soul2", "quantity": 15}, {"item": "Liquid2", "quantity": 3}]')))
    kazam_cauldron.bubbles.push(new Bubble("Big Game Hunter", "Y", "12", 70, 50, "decay", "Each time a Giant Monster spawns, the chance for another Giant Monster in that same week goes down by {% less than normal.", JSON.parse('[{"item": "Critter3", "quantity": 40}, {"item": "Liquid2", "quantity": 4}]')))
    kazam_cauldron.bubbles.push(new Bubble("Ignore Overdues", "Y", "13", 100, 60, "decay", "+{% Book Checkout speed, thanks to this one little bubble that librarians do NOT want you to know about!", JSON.parse('[{"item": "Tree7", "quantity": 120}, {"item": "Liquid3", "quantity": 2}]')))
    kazam_cauldron.bubbles.push(new Bubble("Yellow Bargain", "Y", "14", 40, 12, "decay", "The material costs of ALL yellow bubbles are {% lower.", JSON.parse('[{"item": "Critter6", "quantity": 250}, {"item": "Liquid3", "quantity": 3}]')))
    alchemy.cauldrons.push(power_cauldron);
    alchemy.cauldrons.push(quicc_cauldron);
    alchemy.cauldrons.push(high_iq_cauldron);
    alchemy.cauldrons.push(kazam_cauldron);
    return alchemy;
}

export default function parseAlchemy(cauldronData: Array<Map<string, number>>) {
    var alchemy = initAlchemy();
    cauldronData.forEach((rawData, index) => {
        if (index < 4) {
            Object.entries(rawData).forEach(([bubble_number, level], _) => {
                if (bubble_number !== "length" && parseInt(bubble_number) < alchemy.cauldrons[index].bubbles.length) {
                    try {
                        alchemy.cauldrons[index].bubbles[parseInt(bubble_number)].level = level;
                    }
                    catch (e) {
                        console.log(`Failed on ${bubble_number} / ${index}`, e)
                    }
                }
            });
        }
    })
    return alchemy;
}