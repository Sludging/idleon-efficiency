import { TaskDescriptionModel } from '../model/taskDescriptionModel';

export class TaskDescriptionBase { constructor(public index: number, public data: TaskDescriptionModel) { } }



export const initTaskDescriptionRepo = () => {
    return [    
        new TaskDescriptionBase(0, <TaskDescriptionModel>{
                "name": "Faceless Deathmachine",
                "description": "Defeat a total of { monsters. Thats { }, all thanks to you!",
                "extraStr": "broken homes|more widows|sad children|grieving families|life insurance claims|extra gravestones|bitter memories|steps to extinction|lives cut short|loot rolls",
                "number1": 5,
                "descLine2": "1|0|Was it worth it? All that bloodshed, all for nothi-- oh wow thats some cool loot!",
                "numbers": [
                    2000,
                    10000,
                    20000,
                    100000,
                    500000,
                    2000000,
                    6000000,
                    12000000,
                    25000000,
                    50000000
                ]
            }),
        new TaskDescriptionBase(1, <TaskDescriptionModel>{
                "name": "Just One More Before Bed",
                "description": "Level up { times. This is shared between all characters, as is every other task!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "1|0|Be honest, you just kept playing in bed from your phone didn't you",
                "numbers": [
                    30,
                    70,
                    150,
                    300,
                    600,
                    1200,
                    2500,
                    8000,
                    15000,
                    25000
                ]
            }),
        new TaskDescriptionBase(2, <TaskDescriptionModel>{
                "name": "Super Explosive Gameplay",
                "description": "Claim { hours of AFK gains.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "1|0|The waiiiiiiiting is the hardest parrrt. Well, and the everything else too.",
                "numbers": [
                    10,
                    70,
                    300,
                    1000,
                    2500,
                    8000,
                    20000,
                    60000,
                    140000,
                    250000
                ]
            }),
        new TaskDescriptionBase(3, <TaskDescriptionModel>{
                "name": "Nakedknuckle Boxing",
                "description": "Defeat { }s with no weapon equipped. Must be done actively, ya knob!",
                "extraStr": "Bored Bean|Slime|Carrotman|Gigafrog|Poop|Rat|Nutto|Amarok|Baba Yaga|Dr Defecaus",
                "number1": 5,
                "descLine2": "2|1|This quest really sounds like it'd be about something else, doesn't it.",
                "numbers": [
                    50,
                    50,
                    100,
                    150,
                    200,
                    250,
                    300,
                    5,
                    5,
                    5
                ]
            }),
        new TaskDescriptionBase(4, <TaskDescriptionModel>{
                "name": "Pack Mule Crafter",
                "description": "Craft { different Items. No using Storage Chest, leaving town, or dropping items!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "2|1|Imagine even thinking about possibly using the Storage Chest. Bah, preposterous!",
                "numbers": [
                    3,
                    8,
                    14,
                    24,
                    34,
                    45,
                    55,
                    70,
                    90,
                    110
                ]
            }),
        new TaskDescriptionBase(5, <TaskDescriptionModel>{
                "name": "Stamp Coolection",
                "description": "Upgrade your stamps a total of { times. Dont let them lil piggies steal 'em back!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "2|0|Wow that's a dope collection, you could impress people IRL with it I'm sure!",
                "numbers": [
                    15,
                    40,
                    150,
                    300,
                    500,
                    800,
                    1250,
                    1800,
                    3000,
                    5000
                ]
            }),
        new TaskDescriptionBase(6, <TaskDescriptionModel>{
                "name": "Such Rock Very Dog Wow",
                "description": "}",
                "extraStr": "Defeat Amarock without pooping your pants IRL out of fear!|Defeat Amarock 5 times. That first one didn't count I wasn't looking!|Defeat Amarock with Boxing Gloves equipped from the start of the fight.|Defeat Amarok without taking ANY damage. Not a single hit, not even one!|Defeat Amarok on your 1st, 2nd, 3rd, and 4th player, in that order!|Defeat Amarok on Chaotic mode.|Defeat Amarok on Chaotic mode, without equipping a weapon or helmet!|Kill Amarok on Chaotic mode on 6 players. This must be done in order!|Defeat Amarok on Nightmare. Heh, imagine having a nightmare about pixel art|Defeat Amarok on Nightmare with no Talent Points Spent. Star Talents are fine.",
                "number1": 5,
                "descLine2": "2|1|The Wolf Golem says they were under strict command to steal the gem, but from who..?",
                "numbers": [
                    1,
                    5,
                    1,
                    1,
                    4,
                    1,
                    1,
                    6,
                    1,
                    1
                ]
            }),
        new TaskDescriptionBase(7, <TaskDescriptionModel>{
                "name": "Achievement Hunter",
                "description": "Complete { Blunder Hills achievements, accessed with that button in the top left!",
                "extraStr": "",
                "number1": 5,
                "descLine2": "2|0|Filler lol",
                "numbers": [
                    5,
                    10,
                    15,
                    20,
                    25,
                    30,
                    40,
                    50,
                    60,
                    70
                ]
            }),
        new TaskDescriptionBase(8, <TaskDescriptionModel>{
                "name": "It's a me, Regularigi!",
                "description": "Defeat { Poops. Try to resist your urge to jump on them though...",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    69,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(9, <TaskDescriptionModel>{
                "name": "Sayin' yo to your bro",
                "description": "Say hi to Funguy. Like... literally say hi.",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(10, <TaskDescriptionModel>{
                "name": "Cant stop my Chop A",
                "description": "Chop { oak logs. Minigames will probably make this easier!",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    250,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(11, <TaskDescriptionModel>{
                "name": "Cant stop my Chop B",
                "description": "Chop { bleach logs. Minigames will probably make this easier!",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    200,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(12, <TaskDescriptionModel>{
                "name": "Cant stop my Chop C",
                "description": "Chop { jungle logs. Minigames will probably make this easier!",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    150,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(13, <TaskDescriptionModel>{
                "name": "Cant stop my Chop D",
                "description": "Chop { forest fibre logs. Minigames will probably make this easier!",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    100,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(14, <TaskDescriptionModel>{
                "name": "Cant stop my Chop E",
                "description": "Chop { toilet logs. You can find this tree somewhere smelly!",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    75,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(15, <TaskDescriptionModel>{
                "name": "Cant stop my Chop F",
                "description": "Chop { veiny logs. You can find this tree somewhere tree-y!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    50,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(16, <TaskDescriptionModel>{
                "name": "... so I started swingin A",
                "description": "Mine { copper ores.",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    200,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(17, <TaskDescriptionModel>{
                "name": "... so I started swingin B",
                "description": "Mine { iron ores.",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    125,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(18, <TaskDescriptionModel>{
                "name": "... so I started swingin C",
                "description": "Mine { gold ores.",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    80,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(19, <TaskDescriptionModel>{
                "name": "... so I started swingin D",
                "description": "Mine { platinum ores.",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    50,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(20, <TaskDescriptionModel>{
                "name": "Escapin' the 'laws",
                "description": "Save the Picnic Stowaway from having lunch with his Inlaws",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(21, <TaskDescriptionModel>{
                "name": "Spiketrap Strikeout",
                "description": "Get a score of at least 3 in the Spiketrap Surprise minigame.",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    3,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(22, <TaskDescriptionModel>{
                "name": "Lol get rekt rocco doggo",
                "description": "Say 'sit noob' over the destroyed rubble of a very big bad doggy",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(23, <TaskDescriptionModel>{
                "name": "Oh no, not mikey!",
                "description": "Sell one of your boss keys to the tiki vendor in the Forest Villa town.",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(24, <TaskDescriptionModel>{
                "name": "Baboon Yoda",
                "description": "Gaze upon Bolby Yoga... or is it Baba Yo Gabba Gabba? Just go see the House Boss",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(25, <TaskDescriptionModel>{
                "name": "Pranking the prankster",
                "description": "Drop a green leaf on Stiltzcho.",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(26, <TaskDescriptionModel>{
                "name": "No Purchase Necessary",
                "description": "Wear a Gem Shop hat. Or say in chat 'Gimme a free pass Lava or Ill rate 1 star'.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(27, <TaskDescriptionModel>{
                "name": "Hello Friend!",
                "description": "Send a private message to a friend! Easily done through the Friends Tab in the Codex!",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(28, <TaskDescriptionModel>{
                "name": "Best Friend Forever!",
                "description": "Add someone to your friends list! Make sure to enable '2x tap' in the Options!",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(29, <TaskDescriptionModel>{
                "name": "Look son, a legend!",
                "description": "Double tap on a player who is over Lv. 50! Make sure to enable '2x tap' in the Options!",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(30, <TaskDescriptionModel>{
                "name": "Statue Simp",
                "description": "Deposit a statue because I told you to, you simp! lol... whats a simp btw?",
                "extraStr": "Blank420q",
                "number1": 2,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(31, <TaskDescriptionModel>{
                "name": "Forge Foreman Grillin",
                "description": "Grill some raw iron into a sizzlin stack of 25 Iron Bars! Juicy!",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(32, <TaskDescriptionModel>{
                "name": "The sun burns my eyes!",
                "description": "Craft 5 Farmer Brims.",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    5,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(33, <TaskDescriptionModel>{
                "name": "The grass ticles my feet!",
                "description": "Craft 1 Flip Flops.",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(34, <TaskDescriptionModel>{
                "name": "The thorns cut my ankle!",
                "description": "Craft 3 Torn Jeans. Hopefully it isnt their right ankle being scraped...",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    3,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(35, <TaskDescriptionModel>{
                "name": "The wind chills my body!",
                "description": "Craft 4 Orange Tee's, better make them Extra Large too.",
                "extraStr": "Blank420q",
                "number1": 3,
                "descLine2": "0",
                "numbers": [
                    4,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(36, <TaskDescriptionModel>{
                "name": "Road to Max Damage",
                "description": "Deal { damage in a single attack. Crit damage counts!",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "1|0|The most damage you've ever done in one hit is {!",
                "numbers": [
                    600,
                    2000,
                    6000,
                    25000,
                    50000,
                    100000,
                    200000,
                    400000,
                    750000,
                    999999
                ]
            }),
        new TaskDescriptionBase(37, <TaskDescriptionModel>{
                "name": "Investing in... bubbles?",
                "description": "Reach a total level of { across all your Alchemy Bubbles. No, vials don't count.",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "1|0|Ahahahaha, it's a giraffe!!!",
                "numbers": [
                    15,
                    60,
                    130,
                    300,
                    650,
                    1200,
                    2700,
                    5000,
                    10000,
                    16000
                ]
            }),
        new TaskDescriptionBase(38, <TaskDescriptionModel>{
                "name": "Avast, Bankruptcy Ho!",
                "description": "Buy a total of { Golden Dubloons. Ye can do this across multiple days, arrgh!",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "1|0|Ye thinks ye plundered the store, but ye got plundered by thar store arrgagagaga!",
                "numbers": [
                    5,
                    20,
                    75,
                    200,
                    700,
                    2200,
                    6000,
                    10000,
                    25000,
                    100000
                ]
            }),
        new TaskDescriptionBase(39, <TaskDescriptionModel>{
                "name": "Maximum Efficiency",
                "description": "Have at least } Skill efficiency in { different skills across your account.",
                "extraStr": "500|1500|3000|5000|10000|25000|50000|100000|250000|750000|1000000",
                "number1": 11,
                "descLine2": "2|1|YouresoefficientIbetspacebars wouldbeunnecessaryforyou!",
                "numbers": [
                    2,
                    2,
                    3,
                    3,
                    4,
                    5,
                    6,
                    8,
                    10,
                    12
                ]
            }),
        new TaskDescriptionBase(40, <TaskDescriptionModel>{
                "name": "No Time to Brews!",
                "description": "Have the speed of your 4 Bubble Cauldrons add up to at least {/hr.",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "2|0|So much speed... and yet so few bubbles left to unlock haha!",
                "numbers": [
                    30,
                    100,
                    225,
                    400,
                    800,
                    1500,
                    6000,
                    12000,
                    50000,
                    150000
                ]
            }),
        new TaskDescriptionBase(41, <TaskDescriptionModel>{
                "name": "The Unstoppable USPS",
                "description": "Complete a total of { Post Office Orders across all companies.",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "2|0|Congrats! Postboy Pablob has decided to promote you! But who cares, that doesn't affect gameplay.",
                "numbers": [
                    10,
                    25,
                    50,
                    75,
                    110,
                    180,
                    275,
                    500,
                    750,
                    1111
                ]
            }),
        new TaskDescriptionBase(42, <TaskDescriptionModel>{
                "name": "Twilight Tombstone",
                "description": "}",
                "extraStr": "Defeat Efaunt without playing his ribs like a xylophone, tempting as it may be|Defeat Efaunt 5 times... no, 7 times.|Defeat Efaunt without a Helmet and Shirt.|Defeat Efaunt in under 2 minutes|Defeat Efaunt on 6 players, in order starting with the 1st.|Defeat all arms of Chaotic Efaunt|Defeat Chaotic Efaunt without taking any damage|Defeat Nightmare Efaunt|Defeat Nightmare Efaunt in less than 120 seconds|Defeat Nightmare Efaunt with no helmet or weapon.",
                "number1": 10,
                "descLine2": "2|1|The elephant shakes his head, saying he was just doing as 'the big one' instructed.",
                "numbers": [
                    1,
                    7,
                    1,
                    1,
                    6,
                    1,
                    1,
                    1,
                    1,
                    1
                ]
            }),
        new TaskDescriptionBase(43, <TaskDescriptionModel>{
                "name": "Achievement Cowboy",
                "description": "Complete { Yum-Yum Desert achieves, accessed with that button in the top left!",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "2|0|Filler haha",
                "numbers": [
                    5,
                    10,
                    15,
                    20,
                    25,
                    30,
                    40,
                    50,
                    60,
                    70
                ]
            }),
        new TaskDescriptionBase(44, <TaskDescriptionModel>{
                "name": "Fishin for Fishies A",
                "description": "Reel in { Goldfish. No, theyre not smiling back, why do u ask?",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    150,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(45, <TaskDescriptionModel>{
                "name": "Fishin for Fishies B",
                "description": "Reel in { Hermit Cans. Mhmmmm, oily!",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    80,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(46, <TaskDescriptionModel>{
                "name": "Fishin for Fishies C",
                "description": "Reel in { Jellyfish. Don't use their tentacles as shoelaces!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    50,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(47, <TaskDescriptionModel>{
                "name": "Fishin for Fishies D",
                "description": "Reel in { Bloaches. Go on then, no use reading any longer!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    20,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(48, <TaskDescriptionModel>{
                "name": "Doing the Dev's Job A",
                "description": "Catch { bugs, specifically Flies.",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    200,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(49, <TaskDescriptionModel>{
                "name": "Doing the Dev's Job B",
                "description": "Catch { bugs, specifically Butterflies.",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    150,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(50, <TaskDescriptionModel>{
                "name": "Doing the Dev's Job C",
                "description": "Catch { bugs, specifically Cereal.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    100,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(51, <TaskDescriptionModel>{
                "name": "Doing the Dev's Job D",
                "description": "Catch { bugs, specifically Fruitflies.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    50,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(52, <TaskDescriptionModel>{
                "name": "Obol, More like Garbo!",
                "description": "Turn { Obols into fragments.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    2,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(53, <TaskDescriptionModel>{
                "name": "Well Yes, but Actually No",
                "description": "Say 'Those would be cool crusade bosses' at the Sands of Time",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(54, <TaskDescriptionModel>{
                "name": "Lol Gottem!",
                "description": "Get hit by the desert boss's most deadly attack",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(55, <TaskDescriptionModel>{
                "name": "Into the Mix You Go!",
                "description": "Drop Bobjoepickle into the Cauldron. Good luck!",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(56, <TaskDescriptionModel>{
                "name": "Lift with your Back!",
                "description": "Pick up { Items. Also, don't lift with your back IRL, only in game!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    300,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(57, <TaskDescriptionModel>{
                "name": "I'll Get to Fighting Later",
                "description": "Mine some Plat Ore in the Colosseum",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(58, <TaskDescriptionModel>{
                "name": "Pie is Better!",
                "description": "Defeat { Crabcakes actively.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    69,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(59, <TaskDescriptionModel>{
                "name": "I am the High Tide",
                "description": "Defeat { Sandcastles actively.",
                "extraStr": "Blank420q",
                "number1": 6,
                "descLine2": "0",
                "numbers": [
                    69,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(60, <TaskDescriptionModel>{
                "name": "Boppin' Spuds",
                "description": "Defeat { Mashed Potatos actively.",
                "extraStr": "Blank420q",
                "number1": 6,
                "descLine2": "0",
                "numbers": [
                    69,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(61, <TaskDescriptionModel>{
                "name": "Why so Salty?",
                "description": "Refine a total of { Salts of any type.",
                "extraStr": "Blank420q",
                "number1": 15,
                "descLine2": "1|0|As long as you remember to throw it over your left shoulder you'll be fine.",
                "numbers": [
                    25,
                    150,
                    600,
                    2500,
                    7000,
                    25000,
                    100000,
                    200000,
                    750000,
                    2000000
                ]
            }),
        new TaskDescriptionBase(62, <TaskDescriptionModel>{
                "name": "Poof, Cogone!",
                "description": "Trash a total of { Cogs. Er, I mean crocs... no, I did mean cogs.",
                "extraStr": "Blank420q",
                "number1": 15,
                "descLine2": "1|0|The cogs are gone! At least all the ones you trashed. The rest are still there.",
                "numbers": [
                    10,
                    40,
                    120,
                    250,
                    500,
                    1000,
                    1650,
                    2500,
                    4500,
                    8000
                ]
            }),
        new TaskDescriptionBase(63, <TaskDescriptionModel>{
                "name": "My Shrines, m'lord.",
                "description": "In a single map, have the total lv of all shrines be at least {",
                "extraStr": "Blank420q",
                "number1": 15,
                "descLine2": "1|1|My shrines aren't even half the LV of yours! Please, go teach mine how to be better.",
                "numbers": [
                    4,
                    12,
                    24,
                    35,
                    48,
                    70,
                    86,
                    100,
                    120,
                    150
                ]
            }),
        new TaskDescriptionBase(64, <TaskDescriptionModel>{
                "name": "Printer go Brrrr",
                "description": "Print a total of { resources. If only you could sample gems...",
                "extraStr": "Blank420q",
                "number1": 15,
                "descLine2": "2|0|And brrr it went, all through the night.",
                "numbers": [
                    5000,
                    25000,
                    100000,
                    300000,
                    1000000,
                    2000000,
                    5000000,
                    15000000,
                    40000000,
                    100000000
                ]
            }),
        new TaskDescriptionBase(65, <TaskDescriptionModel>{
                "name": "The True TD Wizard",
                "description": "Have your 'Best Waves' in Worship add up to at least {",
                "extraStr": "Blank420q",
                "number1": 15,
                "descLine2": "2|0|Congratulations!!! What, what are you looking at? I was talking to the wizards...",
                "numbers": [
                    25,
                    40,
                    70,
                    100,
                    130,
                    170,
                    220,
                    280,
                    370,
                    500
                ]
            }),
        new TaskDescriptionBase(66, <TaskDescriptionModel>{
                "name": "Come 'ere Critters!",
                "description": "Collect a total of { Traps. +2% shiny chance each time you complete this! ",
                "extraStr": "Blank420q",
                "number1": 15,
                "descLine2": "2|0|Remember when you naively placed all those 10 minute traps? Haha good times.",
                "numbers": [
                    10,
                    50,
                    200,
                    500,
                    1200,
                    2000,
                    4000,
                    8000,
                    15000,
                    30000
                ]
            }),
        new TaskDescriptionBase(67, <TaskDescriptionModel>{
                "name": "Chill Out Big Boy!",
                "description": "}",
                "extraStr": "Defeat Chizoar without making a pun about how 'cool' they are.|Defeat Chizoar 5 times. Like, for real this time, just 5.|Defeat Chizoar without a helmet, shirt, or pants.|Defeat Chizoar before he spawns ice orbs a 2nd time.|Defeat Chizoar on 8 players, in order starting with the 1st.|Defeat Chaotic Chizoar|Defeat Chaotic Chizoar without taking any damage|Defeat Nightmare Chizoar|Defeat Nightmare Chizoar before he spawns ice orbs a 3rd time.|Defeat Nightmare Chizoar on 4 players, in order starting from the 1st.",
                "number1": 17,
                "descLine2": "2|1|The cloaked figure crumbles, revealing it was posessed by a greater power",
                "numbers": [
                    1,
                    5,
                    1,
                    1,
                    8,
                    1,
                    1,
                    1,
                    1,
                    4
                ]
            }),
        new TaskDescriptionBase(68, <TaskDescriptionModel>{
                "name": "Achievement Inuit",
                "description": "Complete { Frostbite Tundra achieves, accessed with that button in the top left!",
                "extraStr": "Blank420q",
                "number1": 15,
                "descLine2": "2|0|There snow better feeling than an ice fully completed achievement list!",
                "numbers": [
                    5,
                    10,
                    15,
                    20,
                    25,
                    30,
                    40,
                    50,
                    60,
                    70
                ]
            }),
        new TaskDescriptionBase(69, <TaskDescriptionModel>{
                "name": "Critter Collector A",
                "description": "Collect { Froge from a trap. Just don't let it hop away!",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(70, <TaskDescriptionModel>{
                "name": "Critter Collector B",
                "description": "Collect { scorpie trap. Just don't let it sting you in 'that' area!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(71, <TaskDescriptionModel>{
                "name": "Critter Collector C",
                "description": "Collect { Mousey from a trap. Just don't let it gross you out!",
                "extraStr": "Blank420q",
                "number1": 6,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(72, <TaskDescriptionModel>{
                "name": "Critter Collector D",
                "description": "Collect { Pingy from a trap. Just don't let it ping you in discord!",
                "extraStr": "Blank420q",
                "number1": 7,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(73, <TaskDescriptionModel>{
                "name": "Worship my Skill A",
                "description": "Defeat { Glublins in Tower Defence. Good, they're ugly anyway!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    150,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(74, <TaskDescriptionModel>{
                "name": "Worship my Skill B",
                "description": "Defeat { Moonmoons in Tower Defence.",
                "extraStr": "Blank420q",
                "number1": 6,
                "descLine2": "0",
                "numbers": [
                    100,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(75, <TaskDescriptionModel>{
                "name": "Worship my Skill C",
                "description": "Defeat { Nuttos in Tower Defence.",
                "extraStr": "Blank420q",
                "number1": 7,
                "descLine2": "0",
                "numbers": [
                    80,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(76, <TaskDescriptionModel>{
                "name": "Worship my Skill D",
                "description": "Defeat { Snowmen in Tower Defence.",
                "extraStr": "Blank420q",
                "number1": 8,
                "descLine2": "0",
                "numbers": [
                    60,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(77, <TaskDescriptionModel>{
                "name": "Cogs, Crocs, Clocks!",
                "description": "Make { Cogs. You can make them in Quick-ref by the way!!",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    4,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(78, <TaskDescriptionModel>{
                "name": "Star Spangled Bookworm",
                "description": "Checkout 'Star Player' Talent for any class, { times.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(79, <TaskDescriptionModel>{
                "name": "Begone, Skeleton!",
                "description": "Defeat { Xylobones in the Colosseum, summoned from the Skull Rock.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    10,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(80, <TaskDescriptionModel>{
                "name": "Wizard Boom Boom Pow",
                "description": "Defeat { of any monster in Tower Defence.",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    300,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(81, <TaskDescriptionModel>{
                "name": "LMNOP Up in Here",
                "description": "Say 'LMNOP Gang' next to anyone whose name starts with L,M,N,O or P",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(82, <TaskDescriptionModel>{
                "name": "Dying To Refine",
                "description": "Refine any salt. Yep, super painless, right?",
                "extraStr": "Blank420q",
                "number1": 7,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(83, <TaskDescriptionModel>{
                "name": "But they're so Cute!",
                "description": "Defeat { Sheepies actively",
                "extraStr": "Blank420q",
                "number1": 5,
                "descLine2": "0",
                "numbers": [
                    69,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(84, <TaskDescriptionModel>{
                "name": "You're So Hot!",
                "description": "Melt { Bloques actively. You know, like defeat them.",
                "extraStr": "Blank420q",
                "number1": 6,
                "descLine2": "0",
                "numbers": [
                    69,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(85, <TaskDescriptionModel>{
                "name": "You broke my Glasses!",
                "description": "Defeat { Quenchies actively.",
                "extraStr": "Blank420q",
                "number1": 6,
                "descLine2": "0",
                "numbers": [
                    69,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(86, <TaskDescriptionModel>{
                "name": "Firing Up Le Grill",
                "description": "Have { Fire when finishing a recipe in a kitchen.",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "1|1|I may be called LavaFlame2, but you're more Fiery than me!",
                "numbers": [
                    200,
                    1000,
                    6000,
                    40000,
                    200000,
                    1000000,
                    6000000,
                    50000000,
                    200000000,
                    1750000000
                ]
            }),
        new TaskDescriptionBase(87, <TaskDescriptionModel>{
                "name": "Dishin' Out Some Meals",
                "description": "Upgrade Meal } to Lv. { within the Dinner Menu!",
                "extraStr": "Turkey a la Thank|Salad|Garlic Bread|Cabbage|Sawdust|Bunt Cake|Mutton|Massive Fig|Anomaly|BillJackPepper",
                "number1": 10,
                "descLine2": "1|1|All that meal prep and it's still RAW! PATHETIC!",
                "numbers": [
                    2,
                    5,
                    7,
                    10,
                    14,
                    17,
                    20,
                    23,
                    27,
                    30
                ]
            }),
        new TaskDescriptionBase(88, <TaskDescriptionModel>{
                "name": "Cracking Eggs",
                "description": "Breed a } pet { times.",
                "extraStr": "Squirrel|Piggo|Mallay|Wild Boar|Mecho Mouse|Choccie|Cool Bird|Chippy|Panda|Hedgehog",
                "number1": 10,
                "descLine2": "1|1|I tell u hwat that right thers quite the animal farm ya got pardner!",
                "numbers": [
                    5,
                    10,
                    30,
                    50,
                    100,
                    150,
                    200,
                    400,
                    600,
                    1500
                ]
            }),
        new TaskDescriptionBase(89, <TaskDescriptionModel>{
                "name": "Pet Bullet Bursting",
                "description": "Deal { dmg in a Pet Battle within a 5sec timeframe.",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "2|1|Wow that was a KILLER team you used just now!",
                "numbers": [
                    200,
                    1250,
                    4000,
                    15000,
                    80000,
                    400000,
                    2500000,
                    10000000,
                    75000000,
                    300000000
                ]
            }),
        new TaskDescriptionBase(90, <TaskDescriptionModel>{
                "name": "Light 'em Up Up Up",
                "description": "Light up { lab features at the same time. Bonuses and jewels both count!",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "2|0|IM ON FIIIIIIIREEE!!!!",
                "numbers": [
                    4,
                    8,
                    12,
                    16,
                    21,
                    26,
                    32,
                    35,
                    37,
                    42
                ]
            }),
        new TaskDescriptionBase(91, <TaskDescriptionModel>{
                "name": "Consolidating Chips",
                "description": "Equip { chips across all players in the Lab. Gonna need some lab levels for this",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "2|0|So many chips, so little space...",
                "numbers": [
                    4,
                    9,
                    15,
                    20,
                    26,
                    32,
                    40,
                    50,
                    60,
                    70
                ]
            }),
        new TaskDescriptionBase(92, <TaskDescriptionModel>{
                "name": "Begone Troll!",
                "description": "}",
                "extraStr": "Defeat the Massive Troll. He's the one who trolled you a while back...|Succeed at 20 of the Troll's mindgames, aka when he lets you hit him|Defeat the Massive Troll without failing a single Mindgame. He heals when you fail one.|Defeat the Troll on 5 players, in order, starting with the 1st|Kill the Chaotic Massive Troll, or CMT for short, or Chaotical Massiveie Trolle for long|Kill Chaotic Massive Troll on 6 players, starting with the 1st.|Kill Chaotic Massive Troll within the first 10 mindgames|Defeat the Nightmare Massive Troll, or Nightmare Massive T for short|Defeat Nightmare Troll on 10 players, in order from the 1st|Defeat Nightmare Troll within 5 mindgames, equipping the red boxing gloves",
                "number1": 10,
                "descLine2": "2|1|The troll obviously isn't dying despite insisting he is... very suspicious...",
                "numbers": [
                    1,
                    20,
                    1,
                    5,
                    1,
                    6,
                    1,
                    1,
                    10,
                    1
                ]
            }),
        new TaskDescriptionBase(93, <TaskDescriptionModel>{
                "name": "Achievement Astronaut",
                "description": "Complete { Hyperion Nebula achieves, accessed with that button in the top left!",
                "extraStr": "Blank420q",
                "number1": 10,
                "descLine2": "2|0|Filler haha",
                "numbers": [
                    5,
                    10,
                    15,
                    20,
                    25,
                    30,
                    40,
                    50,
                    60,
                    70
                ]
            }),
        new TaskDescriptionBase(94, <TaskDescriptionModel>{
                "name": "Cracked Crystals",
                "description": "Defeat { Crystal monster from any world.",
                "extraStr": "Blank420q",
                "number1": 4,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }),
        new TaskDescriptionBase(95, <TaskDescriptionModel>{
                "name": "Miniboss Masher",
                "description": "Defeat { Miniboss from any world.",
                "extraStr": "Blank420q",
                "number1": 6,
                "descLine2": "0",
                "numbers": [
                    1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1,
                    -1
                ]
            })    
]
}
