// (b.engine.getGameAttribute("Tasks")[0] = D.getLoadJsonList("TaskZZ0")), [[60474006,4761,40796.511388888764,2,0,1610,0,45,0],[4147190.066356501,2711,90,4,218851.49605092796,535,0,37,0],[109913,1345,32,205965691,254,19354,1,26,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
// (b.engine.getGameAttribute("Tasks")[1] = D.getLoadJsonList("TaskZZ1")),
// (b.engine.getGameAttribute("Tasks")[2] = D.getLoadJsonList("TaskZZ2")),
// (b.engine.getGameAttribute("Tasks")[3] = D.getLoadJsonList("TaskZZ3")),
// (b.engine.getGameAttribute("Tasks")[4] = D.getLoadJsonList("TaskZZ4")),
// (b.engine.getGameAttribute("Tasks")[5] = D.getLoadJsonList("TaskZZ5"));

import { GroupBy, nFormatter } from "../utility"
import { ImageData } from "./imageData"

interface TaskInfo {
    name: string
    description: string
    extraStr: string
    number1: number
    descLine2: string
    numbers: number[]
    world: number
}

export class Task {
    name: string
    description: string
    extraStr: string
    number1: number
    descLine2: string
    numbers: number[]
    world: number

    level: number = 0
    count: number = 0

    constructor(data: TaskInfo) {
        this.name = data.name;
        this.description = data.description;
        this.extraStr = data.extraStr;
        this.number1 = data.number1;
        this.descLine2 = data.descLine2;
        this.numbers = data.numbers;
        this.world = data.world;
    }

    isDaily = () => {
        return this.descLine2 == "0";
    }

    getDescription = () => {
        let numbersIndex = this.level;
        // This only happens to the first world achievement hunter task, so we need to adjust the index matching by 1.
        if (this.extraStr == "") {
            numbersIndex += 1;
        }
        let toReturn = this.description;
        let keyValue = this.numbers[numbersIndex] ?? -1;
        if (this.level == this.numbers.length) {
            toReturn = this.descLine2.split("|").slice(-1)[0];
            keyValue = this.count;
        }
        if (toReturn.includes("{")) {
            toReturn = toReturn.replace(/{/g, nFormatter(keyValue))
        }
        if (toReturn.includes("}")) {
            toReturn = toReturn.replace("}", this.extraStr.split("|")[this.level]);
        }
        return toReturn;
    }

    getLevelClass = () => {
        return `icons-6040 icons-TaskRank${this.level}`;
    }
}

const initTasks = (): Task[] => {
    return [
        new Task({ "name": "Faceless Deathmachine", "description": "Defeat a total of { monsters. Thats { }, all thanks to you!", "extraStr": "broken homes|more widows|sad children|grieving families|life insurance claims|extra gravestones|bitter memories|steps to extinction|lives cut short|loot rolls", "number1": 5, "descLine2": "1|0|Was it worth it? All that bloodshed, all for nothi-- oh wow thats some cool loot!", "numbers": [2000, 10000, 20000, 100000, 500000, 2000000, 6000000, 12000000, 25000000, 50000000], "world": 1 }),
        new Task({ "name": "Just One More Before Bed", "description": "Level up { times. This is shared between all characters, as is every other task!", "extraStr": "Blank420q", "number1": 5, "descLine2": "1|0|Be honest, you just kept playing in bed from your phone didn't you", "numbers": [30, 70, 150, 300, 600, 1200, 2500, 8000, 15000, 25000], "world": 1 }),
        new Task({ "name": "Super Explosive Gameplay", "description": "Claim { hours of AFK gains.", "extraStr": "Blank420q", "number1": 5, "descLine2": "1|0|The waiiiiiiiting is the hardest parrrt. Well, and the everything else too.", "numbers": [10, 70, 300, 1000, 2500, 8000, 20000, 60000, 140000, 250000], "world": 1 }),
        new Task({ "name": "Nakedknuckle Boxing", "description": "Defeat { }s with no weapon equipped. Must be done actively, ya knob!", "extraStr": "Bored Bean|Slime|Carrotman|Gigafrog|Poop|Rat|Nutto|Amarok|Baba Yaga|Dr Defecaus", "number1": 5, "descLine2": "2|1|This quest really sounds like it'd be about something else, doesn't it.", "numbers": [50, 50, 100, 150, 200, 250, 300, 5, 5, 5], "world": 1 }),
        new Task({ "name": "Pack Mule Crafter", "description": "Craft { different Items. No using Storage Chest, leaving town, or dropping items!", "extraStr": "Blank420q", "number1": 5, "descLine2": "2|1|Imagine even thinking about possibly using the Storage Chest. Bah, preposterous!", "numbers": [3, 8, 14, 24, 34, 45, 55, 70, 90, 110], "world": 1 }),
        new Task({ "name": "Stamp Coolection", "description": "Upgrade your stamps a total of { times. Dont let them lil piggies steal 'em back!", "extraStr": "Blank420q", "number1": 5, "descLine2": "2|0|Wow that's a dope collection, you could impress people IRL with it I'm sure!", "numbers": [15, 40, 150, 300, 500, 800, 1250, 1800, 3000, 5000], "world": 1 }),
        new Task({ "name": "Such Rock Very Dog Wow", "description": "}", "extraStr": "Defeat Amarock without pooping your pants IRL out of fear!|Defeat Amarock 5 times. That first one didn't count I wasn't looking!|Defeat Amarock with Boxing Gloves equipped from the start of the fight.|Defeat Amarok without taking ANY damage. Not a single hit, not even one!|Defeat Amarok on your 1st, 2nd, 3rd, and 4th player, in that order!|Defeat Amarok on Chaotic mode.|Defeat Amarok on Chaotic mode, without equipping a weapon or helmet!|Kill Amarok on Chaotic mode on 6 players. This must be done in order!|Defeat Amarok on Nightmare. Heh, imagine having a nightmare about pixel art|Defeat Amarok on Nightmare with no Talent Points Spent. Yea, uh, good luck? lol", "number1": 5, "descLine2": "2|1|Filler lol", "numbers": [1, 5, 1, 1, 4, 1, 1, 6, 1, 1], "world": 1 }),
        new Task({ "name": "Achievement Hunter", "description": "Complete { Blunder Hills achievements, accessed with that button in the top left!", "extraStr": "", "number1": 5, "descLine2": "2|0|Filler lol", "numbers": [5, 10, 15, 20, 25, 30, 40, 50, 60, 70], "world": 1 }),
        new Task({ "name": "It's a me, Regularigi!", "description": "Defeat { Poops. Try to resist your urge to jump on them though...", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [69, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Sayin' yo to your bro", "description": "Say hi to Funguy. Like... literally say hi.", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Cant stop my Chop A", "description": "Chop { oak logs. Minigames will probably make this easier!", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [250, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Cant stop my Chop B", "description": "Chop { bleach logs. Minigames will probably make this easier!", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [200, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Cant stop my Chop C", "description": "Chop { jungle logs. Minigames will probably make this easier!", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [150, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Cant stop my Chop D", "description": "Chop { forest fibre logs. Minigames will probably make this easier!", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [100, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Cant stop my Chop E", "description": "Chop { toilet logs. You can find this tree somewhere smelly!", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [75, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Cant stop my Chop F", "description": "Chop { veiny logs. You can find this tree somewhere tree-y!", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [50, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "... so I started swingin A", "description": "Mine { copper ores.", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [200, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "... so I started swingin B", "description": "Mine { iron ores.", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [125, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "... so I started swingin C", "description": "Mine { gold ores.", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [80, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "... so I started swingin D", "description": "Mine { platinum ores.", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [50, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Escapin' the 'laws", "description": "Save the Picnic Stowaway from having lunch with his Inlaws", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Spiketrap Strikeout", "description": "Get a score of at least 3 in the Spiketrap Surprise minigame.", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [3, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Lol get rekt rocco doggo", "description": "Say 'sit noob' over the destroyed rubble of a very big bad doggy", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Oh no, not mikey!", "description": "Sell one of your boss keys to the tiki vendor in the Forest Villa town.", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Baboon Yoda", "description": "Gaze upon Bolby Yoga... or is it Baba Yo Gabba Gabba? Just go see the House Boss", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Pranking the prankster", "description": "Drop a green leaf on Stiltzcho.", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "No Purchase Necessary", "description": "Wear a Gem Shop hat. Or say in chat 'Gimme a free pass Lava or Ill rate 1 star'.", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Hello Friend!", "description": "Send a private message to a friend! Easily done through the Friends Tab in the Codex!", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Best Friend Forever!", "description": "Add someone to your friends list! Make sure to enable '2x tap' in the Options!", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Look son, a legend!", "description": "Double tap on a player who is over Lv. 50! Make sure to enable '2x tap' in the Options!", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Statue Simp", "description": "Deposit a statue because I told you to, you simp! lol... whats a simp btw?", "extraStr": "Blank420q", "number1": 2, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Forge Foreman Grillin", "description": "Grill some raw iron into a sizzlin stack of 25 Iron Bars! Juicy!", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "The sun burns my eyes!", "description": "Craft 5 Farmer Brims.", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [5, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "The grass ticles my feet!", "description": "Craft 1 Flip Flops.", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "The thorns cut my ankle!", "description": "Craft 3 Torn Jeans. Hopefully it isnt their right ankle being scraped...", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [3, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "The wind chills my body!", "description": "Craft 4 Orange Tee's, better make them Extra Large too.", "extraStr": "Blank420q", "number1": 3, "descLine2": "0", "numbers": [4, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 1 }),
        new Task({ "name": "Road to Max Damage", "description": "Deal { damage in a single attack. Crit damage counts!", "extraStr": "Blank420q", "number1": 10, "descLine2": "1|0|The most damage you've ever done in one hit is {!", "numbers": [600, 2000, 6000, 25000, 50000, 100000, 200000, 400000, 750000, 999999], "world": 2 }),
        new Task({ "name": "Investing in... bubbles?", "description": "Reach a total level of { across all your Alchemy Bubbles. No, vials don't count.", "extraStr": "Blank420q", "number1": 10, "descLine2": "1|0|Ahahahaha, it's a giraffe!!!", "numbers": [15, 60, 130, 300, 650, 1200, 2700, 5000, 10000, 16000], "world": 2 }),
        new Task({ "name": "Avast, Bankruptcy Ho!", "description": "Buy a total of { Golden Dubloons. Ye can do this across multiple days, arrgh!", "extraStr": "Blank420q", "number1": 10, "descLine2": "1|0|Ye thinks ye plundered the store, but ye got plundered by thar store arrgagagaga!", "numbers": [5, 20, 75, 200, 700, 2200, 6000, 10000, 25000, 100000], "world": 2 }),
        new Task({ "name": "Maximum Efficiency", "description": "Have at least } Skill efficiency in { different skills across your account.", "extraStr": "500|1500|3000|5000|10000|25000|50000|100000|250000|750000|1000000", "number1": 11, "descLine2": "2|1|YouresoefficientIbetspacebars wouldbeunnecessaryforyou!", "numbers": [2, 2, 3, 3, 4, 5, 6, 8, 10, 12], "world": 2 }),
        new Task({ "name": "No Time to Brews!", "description": "Have the speed of your 4 Bubble Cauldrons add up to at least {/hr.", "extraStr": "Blank420q", "number1": 10, "descLine2": "2|0|So much speed... and yet so few bubbles left to unlock haha!", "numbers": [30, 100, 225, 400, 800, 1500, 6000, 12000, 50000, 150000], "world": 2 }),
        new Task({ "name": "The Unstoppable USPS", "description": "Complete a total of { Post Office Orders across all companies.", "extraStr": "Blank420q", "number1": 10, "descLine2": "2|0|Congrats! Postboy Pablob has decided to promote you! But who cares, that doesn't affect gameplay.", "numbers": [10, 25, 50, 75, 110, 180, 275, 500, 750, 1111], "world": 2 }),
        new Task({ "name": "Twilight Tombstone", "description": "}", "extraStr": "Defeat Efaunt without playing his ribs like a xylophone, tempting as it may be|Defeat Efaunt 5 times... no, 7 times.|Defeat Efaunt without a Helmet and Shirt.|Defeat Efaunt in under 2 minutes|Defeat Efaunt on 6 players, in order starting with the 1st.|Defeat all arms of Chaotic Efaunt|Defeat Chaotic Efaunt without taking any damage|Defeat Nightmare Efaunt|Defeat Nightmare Efaunt in less than 120 seconds|Defeat Nightmare Efaunt with no weapon or armor", "number1": 10, "descLine2": "2|1|Filler", "numbers": [1, 7, 1, 1, 6, 1, 1, 1, 1, 1], "world": 2 }),
        new Task({ "name": "Achievement Cowboy", "description": "Complete { Yum-Yum Desert achieves, accessed with that button in the top left!", "extraStr": "Blank420q", "number1": 10, "descLine2": "2|0|Filler haha", "numbers": [5, 10, 15, 20, 25, 30, 40, 50, 60, 70], "world": 2 }),
        new Task({ "name": "Fishin for Fishies A", "description": "Reel in { Goldfish. No, theyre not smiling back, why do u ask?", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [150, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Fishin for Fishies B", "description": "Reel in { Hermit Cans. Mhmmmm, oily!", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [80, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Fishin for Fishies C", "description": "Reel in { Jellyfish. Don't use their tentacles as shoelaces!", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [50, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Fishin for Fishies D", "description": "Reel in { Bloaches. Go on then, no use reading any longer!", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [20, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Doing the Dev's Job A", "description": "Catch { bugs, specifically Flies.", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [200, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Doing the Dev's Job B", "description": "Catch { bugs, specifically Butterflies.", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [150, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Doing the Dev's Job C", "description": "Catch { bugs, specifically Cereal.", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [100, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Doing the Dev's Job D", "description": "Catch { bugs, specifically Fruitflies.", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [50, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Obol, More like Garbo!", "description": "Turn { Obols into fragments.", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [2, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Well Yes, but Actually No", "description": "Say 'Those would be cool crusade bosses' at the Sands of Time", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Lol Gottem!", "description": "Get hit by the desert boss's most deadly attack", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Into the Mix You Go!", "description": "Drop Bobjoepickle into the Cauldron. Good luck!", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Lift with your Back!", "description": "Pick up { Items. Also, don't lift with your back IRL, only in game!", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [300, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "I'll Get to Fighting Later", "description": "Mine some Plat Ore in the Colosseum", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Pie is Better!", "description": "Defeat { Crabcakes actively.", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [69, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "I am the High Tide", "description": "Defeat { Sandcastles actively.", "extraStr": "Blank420q", "number1": 6, "descLine2": "0", "numbers": [69, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Boppin' Spuds", "description": "Defeat { Mashed Potatos actively.", "extraStr": "Blank420q", "number1": 6, "descLine2": "0", "numbers": [69, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 2 }),
        new Task({ "name": "Why so Salty?", "description": "Refine a total of { Salts of any type.", "extraStr": "Blank420q", "number1": 15, "descLine2": "1|0|Filler", "numbers": [25, 150, 600, 2500, 7000, 25000, 100000, 200000, 750000, 2000000], "world": 3 }),
        new Task({ "name": "Poof, Cogone!", "description": "Trash a total of { Cogs. Er, I mean crocs... no, I did mean cogs.", "extraStr": "Blank420q", "number1": 15, "descLine2": "1|0|Filler", "numbers": [10, 40, 120, 250, 500, 1000, 1650, 2500, 4500, 8000], "world": 3 }),
        new Task({ "name": "My Shrines, m'lord.", "description": "In a single map, have the total lv of all shrines be at least {", "extraStr": "Blank420q", "number1": 15, "descLine2": "1|1|Filler", "numbers": [4, 12, 24, 35, 48, 70, 86, 100, 120, 150], "world": 3 }),
        new Task({ "name": "Printer go Brrrr", "description": "Print a total of { resources. If only you could sample gems...", "extraStr": "Blank420q", "number1": 15, "descLine2": "2|0|Filler", "numbers": [5000, 25000, 100000, 300000, 1000000, 2000000, 5000000, 15000000, 40000000, 100000000], "world": 3 }),
        new Task({ "name": "The True TD Wizard", "description": "Have your 'Best Waves' in Worship add up to at least {", "extraStr": "Blank420q", "number1": 15, "descLine2": "2|0|Filler", "numbers": [25, 40, 70, 100, 130, 170, 220, 280, 370, 500], "world": 3 }),
        new Task({ "name": "Come 'ere Critters!", "description": "Collect a total of { Traps. +2% shiny chance each time you complete this! ", "extraStr": "Blank420q", "number1": 15, "descLine2": "2|0|Filler", "numbers": [10, 50, 200, 500, 1200, 2000, 4000, 8000, 15000, 30000], "world": 3 }),
        new Task({ "name": "Chill Out Big Boy!", "description": "}", "extraStr": "Defeat Chizoar without making a pun about how 'cool' they are.|Defeat Chizoar 5 times. Like, for real this time, just 5.|Defeat Chizoar without a helmet, shirt, or pants.|Defeat Chizoar before he spawns ice orbs a 2nd time.|Defeat Chizoar on 8 players, in order starting with the 1st.|Defeat Chaotic Chizoar|Defeat Chaotic Chizoar without taking any damage|Defeat Nightmare Chizoar|Defeat Nightmare Chizoar before he spawns ice orbs a 3rd time.|Defeat Nightmare Chizoar with no equipment on at all. None.", "number1": 17, "descLine2": "2|1|Filler", "numbers": [1, 5, 1, 1, 8, 1, 1, 1, 1, 1], "world": 3 }),
        new Task({ "name": "Achievement Inuit", "description": "Complete { Frostbite Tundra achieves, accessed with that button in the top left!", "extraStr": "Blank420q", "number1": 15, "descLine2": "2|0|Filler", "numbers": [5, 10, 15, 20, 25, 30, 40, 50, 60, 70], "world": 3 }),
        new Task({ "name": "Critter Collector A", "description": "Collect { Froge from a trap. Just don't let it hop away!", "extraStr": "Blank420q", "number1": 4, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Critter Collector B", "description": "Collect { scorpie trap. Just don't let it sting you in 'that' area!", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Critter Collector C", "description": "Collect { Mousey from a trap. Just don't let it gross you out!", "extraStr": "Blank420q", "number1": 6, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Critter Collector D", "description": "Collect { Pingy from a trap. Just don't let it ping you in discord!", "extraStr": "Blank420q", "number1": 7, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Worship my Skill A", "description": "Defeat { Glublins in Tower Defence. Good, they're ugly anyway!", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [150, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Worship my Skill B", "description": "Defeat { Moonmoons in Tower Defence.", "extraStr": "Blank420q", "number1": 6, "descLine2": "0", "numbers": [100, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Worship my Skill C", "description": "Defeat { Nuttos in Tower Defence.", "extraStr": "Blank420q", "number1": 7, "descLine2": "0", "numbers": [80, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Worship my Skill D", "description": "Defeat { Snowmen in Tower Defence.", "extraStr": "Blank420q", "number1": 8, "descLine2": "0", "numbers": [60, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Cogs, Crocs, Clocks!", "description": "Make { Cogs. You can make them in Quick-ref by the way!!", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [4, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Star Spangled Bookworm", "description": "Checkout 'Star Player' Talent for any class, { times.", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Begone, Skeleton!", "description": "Defeat { Xylobones in the Colosseum, summoned from the Skull Rock.", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [10, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Wizard Boom Boom Pow", "description": "Defeat { of any monster in Tower Defence.", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [300, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "LMNOP Up in Here", "description": "Say 'LMNOP Gang' next to anyone whose name starts with L,M,N,O or P", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "Dying To Refine", "description": "Refine any salt. Yep, super painless, right?", "extraStr": "Blank420q", "number1": 7, "descLine2": "0", "numbers": [1, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "But they're so Cute!", "description": "Defeat { Sheepies actively", "extraStr": "Blank420q", "number1": 5, "descLine2": "0", "numbers": [69, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "You're So Hot!", "description": "Melt { Bloques actively. You know, like defeat them.", "extraStr": "Blank420q", "number1": 6, "descLine2": "0", "numbers": [69, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
        new Task({ "name": "You broke my Glasses!", "description": "Defeat { Quenchies actively.", "extraStr": "Blank420q", "number1": 6, "descLine2": "0", "numbers": [69, -1, -1, -1, -1, -1, -1, -1, -1, -1], "world": 3 }),
    ]
}

interface MeritInfo {
    descLine1: string
    descLine2: string
    number1: number
    number2: number
    number3: number
    totalLevels: number
    meritCost: number
    text1: string
    text2: string
    extraStr: string
    icon: string
    bonusPerLevel: number
    world: number
}

export class Merit {
    descLine1: string
    descLine2: string
    number1: number
    number2: number
    number3: number
    totalLevels: number
    meritCost: number
    text1: string
    text2: string
    extraStr: string
    icon: string
    bonusPerLevel: number
    world: number

    level: number = 0

    constructor(data: MeritInfo) {
        this.descLine1 = data.descLine1;
        this.descLine2 = data.descLine2;
        this.number1 = data.number1;
        this.number2 = data.number2;
        this.number3 = data.number3;
        this.totalLevels = data.totalLevels;
        this.meritCost = data.meritCost;
        this.text1 = data.text1;
        this.text2 = data.text2;
        this.extraStr = data.extraStr;
        this.icon = data.icon;
        this.bonusPerLevel = data.bonusPerLevel;
        this.world = data.world;
    }

    getDescription = () => {
        let toReplace = this.descLine1;
        if (this.extraStr != "Blank420q") {
            toReplace = toReplace.replace("}", this.extraStr.split(" ")[this.level]);
        }
        else if (toReplace.includes("{")) {
            toReplace = toReplace.replace("{", (this.bonusPerLevel * this.level).toString());
        }
        return `${toReplace} ${this.descLine2 != "Descline2" ? this.descLine2 : ""}`
    }

    getImageData = (): ImageData => {
        return {
            location: this.icon,
            width: 72,
            height: 72
        }
    }
}

const initMerits = (): Merit[] => {
    return [
        new Merit({ "descLine1": "Inventory Bag } is applied to everyone,", "descLine2": "but only if your 1st character has it.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 5, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "B C E F H BCEFH", "icon": "TaskSa1", "bonusPerLevel": 0, "world": 1 }),
        new Merit({ "descLine1": "All Blunder Hills Monsters respawn +{%", "descLine2": "faster. This boosts AFK kills per hour!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 10, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSa2", "bonusPerLevel": 2, "world": 1 }),
        new Merit({ "descLine1": "+{% EXP Gain for the lowest leveled", "descLine2": "character in your family.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 12, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSb5", "bonusPerLevel": 4, "world": 1 }),
        new Merit({ "descLine1": "Sets the Max Lv. to { For the 'Goblet", "descLine2": "of Hemoglobin' Talent. Helps survivability!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 10, "meritCost": 2, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSbb1", "bonusPerLevel": 5, "world": 1 }),
        new Merit({ "descLine1": "Bosses can now drop Boss Keys. 4%", "descLine2": "higher key drop chance per purchase!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 10, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSb4", "bonusPerLevel": 7, "world": 1 }),
        new Merit({ "descLine1": "Unlocks recipe to craft Amarok }.", "descLine2": "Descline2", "number1": 1, "number2": 6, "number3": 2, "totalLevels": 5, "meritCost": 2, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Shoes Pants Torso Helmet Pendant SoldOut", "icon": "SmithingRecipes1", "bonusPerLevel": 0, "world": 1 }),
        new Merit({ "descLine1": "+{% higher chance for Minibosses in", "descLine2": "world 1 to drop new Star Talents.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 6, "meritCost": 3, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TalentBook1", "bonusPerLevel": 30, "world": 1 }),
        new Merit({ "descLine1": "IDK YET", "descLine2": "Descline2", "number1": 1, "number2": 3, "number3": 6, "totalLevels": 5, "meritCost": -1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "Blank", "bonusPerLevel": 0, "world": 1 }),
        new Merit({ "descLine1": "Monsters now drop Obols. +5% drop", "descLine2": "rate per purchase!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 7, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "A B C E F H", "icon": "TaskSb3", "bonusPerLevel": 5, "world": 2 }),
        new Merit({ "descLine1": "All Yum-Yum Desert Mobs respawn +{%", "descLine2": "faster. This boosts AFK kills per hour!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 10, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSb2", "bonusPerLevel": 2, "world": 2 }),
        new Merit({ "descLine1": "+2% AFK Gains for your first {", "descLine2": "characters in your family.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 9, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSa3", "bonusPerLevel": 1, "world": 2 }),
        new Merit({ "descLine1": "Boosts Max Lv. to { for 'Convert Better", "descLine2": "Darnit' Talent. Probs still stinks...", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 10, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSb1", "bonusPerLevel": 5, "world": 2 }),
        new Merit({ "descLine1": "World bosses can now drop gems. +7%", "descLine2": "gem drop rate per purchase!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 8, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSa4", "bonusPerLevel": 7, "world": 2 }),
        new Merit({ "descLine1": "Unlocks recipe to craft Efaunt }.", "descLine2": "Descline2", "number1": 1, "number2": 6, "number3": 2, "totalLevels": 5, "meritCost": 2, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Shoes Pants Torso Helmet Ring SoldOut", "icon": "SmithingRecipes2", "bonusPerLevel": 0, "world": 2 }),
        new Merit({ "descLine1": "+{% higher chance for Minibosses in", "descLine2": "world 2 to drop new Star Talents.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 8, "meritCost": 3, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TalentBook1", "bonusPerLevel": 30, "world": 2 }),
        new Merit({ "descLine1": "+{% arcade ball gain rate, so you", "descLine2": "can get them balls launchin!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 5, "meritCost": 2, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSbb2", "bonusPerLevel": 5, "world": 2 }),
        new Merit({ "descLine1": "1st, 3rd purchase give +1 Build Slot,", "descLine2": "2nd, 4th purchase give +1 Food Slot.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 4, "meritCost": 3, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "A B C E F H", "icon": "TaskSc1", "bonusPerLevel": 5, "world": 3 }),
        new Merit({ "descLine1": "All Frostbite Tundra Mobs respawn +{%", "descLine2": "faster. This boosts AFK kills per hour!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 10, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSc2", "bonusPerLevel": 2, "world": 3 }),
        new Merit({ "descLine1": "+{ Max possible Lv of Talent books", "descLine2": "from the Talent Book Library.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 5, "meritCost": 2, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSc3", "bonusPerLevel": 2, "world": 3 }),
        new Merit({ "descLine1": "Boosts Max Lv. to { for 'Telekinetic", "descLine2": "Storage' Talent. Easy item depositing!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 10, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSc5", "bonusPerLevel": 5, "world": 3 }),
        new Merit({ "descLine1": "+0.5% Printer Sample Size per purchase.", "descLine2": "Make the Federal Reserve jealous!", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 10, "meritCost": 1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSc4", "bonusPerLevel": 0.5, "world": 3 }),
        new Merit({ "descLine1": "Unlocks recipe to craft Chizoar }.", "descLine2": "Descline2", "number1": 1, "number2": 6, "number3": 2, "totalLevels": 5, "meritCost": 2, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Shoes Pants Torso Helmet Pendant SoldOut", "icon": "SmithingRecipes3", "bonusPerLevel": 0, "world": 3 }),
        new Merit({ "descLine1": "Refinery Salt Costs don't scale beyond", "descLine2": "power output. +1 Salt Type Per Purchase.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 5, "meritCost": 2, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "TaskSc6", "bonusPerLevel": 1, "world": 3 }),
        new Merit({ "descLine1": "+{% higher chance for Minibosses in", "descLine2": "world 3 to drop new Star Talents.", "number1": 0, "number2": 0, "number3": 0, "totalLevels": 5, "meritCost": -1, "text1": "bonusGiven", "text2": "BonusPerLv", "extraStr": "Blank420q", "icon": "Blank", "bonusPerLevel": 0, "world": 3 }),
    ];
}

export class TaskBoard {
    tasks: Task[] = initTasks()
    merits: Merit[] = initMerits()
}

export default function parseTaskboard(taskInfo0: number[][], taskInfo1: number[][], taskInfo2: number[][], taskInfo3: number[][], taskInfo4: number[], taskInfo5: number[]) {
    const taskBoard = new TaskBoard()

    const tasksByWorld = GroupBy(taskBoard.tasks, "world");
    const meritsByWorld = GroupBy(taskBoard.merits, "world");

    tasksByWorld.forEach((world, worldIndex) => {
        world.forEach((task, taskIndex) => {
            if (!task.isDaily()) {
                task.count = taskInfo0[worldIndex - 1][taskIndex];
                task.level = taskInfo1[worldIndex - 1][taskIndex];
            }
        })
    })

    meritsByWorld.forEach((world, worldIndex) => {
        world.forEach((merit, meritIndex) => {
            merit.level = taskInfo2[worldIndex - 1][meritIndex];
        })
    })
    return taskBoard;
}